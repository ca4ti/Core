<?php
/*
 * MikoPBX - free phone system for small business
 * Copyright © 2017-2023 Alexey Portnov and Nikolay Beketov
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with this program.
 * If not, see <https://www.gnu.org/licenses/>.
 */

namespace MikoPBX\AdminCabinet\Controllers;

use MikoPBX\AdminCabinet\Forms\GeneralSettingsEditForm;
use MikoPBX\Common\Models\Codecs;
use MikoPBX\Common\Models\PbxSettings;
use MikoPBX\Common\Models\PbxSettingsConstants;
use MikoPBX\Core\System\Util;

class GeneralSettingsController extends BaseController
{
    /**
     * Builds the general settings form.
     *
     * This action is responsible for preparing the data required to populate the general settings form.
     * It retrieves the audio and video codecs from the database, sorts them by priority, and assigns them to the view.
     * It also retrieves all PBX settings and creates an instance of the GeneralSettingsEditForm.
     *
     * @return void
     */
    public function modifyAction(): void
    {
        // Retrieve and sort the audio codecs
        $audioCodecs = Codecs::find(['conditions' => 'type="audio"'])->toArray();
        usort($audioCodecs, [__CLASS__, 'sortArrayByPriority']);
        $this->view->audioCodecs = $audioCodecs;

        // Retrieve and sort the video codecs
        $videoCodecs = Codecs::find(['conditions' => 'type="video"'])->toArray();
        usort($videoCodecs, [__CLASS__, 'sortArrayByPriority']);
        $this->view->videoCodecs = $videoCodecs;

        // Retrieve all PBX settings
        $pbxSettings = PbxSettings::getAllPbxSettings();

        // Retrieve and assign the simple passwords data to the view
        $this->view->simplePasswords = $this->getSimplePasswords($pbxSettings);

        // Create an instance of the GeneralSettingsEditForm
        $this->view->form = new GeneralSettingsEditForm(null, $pbxSettings);
        $this->view->submitMode = null;

    }

    /**
     * Retrieves a list of simple passwords from the given data.
     *
     * This function checks if the SSHPassword and WebAdminPassword in the data array are simple passwords.
     * It also checks if the CloudInstanceId matches any of these passwords.
     * If a simple password or a matching CloudInstanceId is found, the corresponding password key is added to the list.
     *
     * @param array $data The data array containing the passwords and CloudInstanceId.
     * @return array The list of password keys that failed the simple password check.
     */
    private function getSimplePasswords(array $data): array
    {
        $passwordCheckFail = [];
        $cloudInstanceId = $data['CloudInstanceId'] ?? '';
        $checkPasswordFields =[PbxSettingsConstants::SSH_PASSWORD, 'WebAdminPassword'];
        if ($data[PbxSettingsConstants::SSH_DISABLE_SSH_PASSWORD] === 'on'){
            unset($checkPasswordFields[PbxSettingsConstants::SSH_PASSWORD]);
        }
        foreach ($checkPasswordFields as $value) {
            if (!isset($data[$value]) || $data[$value] === GeneralSettingsEditForm::HIDDEN_PASSWORD) {
                continue;
            }
            if ($cloudInstanceId === $data[$value] || Util::isSimplePassword($data[$value])) {
                $passwordCheckFail[] = $value;
            }
        }
        return $passwordCheckFail;
    }

    /**
     * Saves the general settings form data.
     *
     */
    public function saveAction(): void
    {
        if (!$this->request->isPost()) {
            return;
        }
        $data = $this->request->getPost();

        $passwordCheckFail = $this->getSimplePasswords($data);
        if (!empty($passwordCheckFail)) {
           foreach ($passwordCheckFail as $settingsKey){
               $this->flash->error($this->translation->_('gs_SetPasswordError', ['password'=>$data[$settingsKey]]));
           }
            $this->view->success = false;
            $this->view->passwordCheckFail = $passwordCheckFail;
            return;
        }

        $pbxSettings = PbxSettings::getDefaultArrayValues();

        // Process SSHPassword and set SSHPasswordHash accordingly
        if (isset($data[PbxSettingsConstants::SSH_PASSWORD])) {
            if ($data[PbxSettingsConstants::SSH_PASSWORD] === $pbxSettings[PbxSettingsConstants::SSH_PASSWORD]
                || $data[PbxSettingsConstants::SSH_PASSWORD] === GeneralSettingsEditForm::HIDDEN_PASSWORD) {
                $data[PbxSettingsConstants::SSH_PASSWORD_HASH_STRING] = md5($data['WebAdminPassword']);
            } else {
                $data[PbxSettingsConstants::SSH_PASSWORD_HASH_STRING] = md5($data[PbxSettingsConstants::SSH_PASSWORD]);
            }
        }
        $this->db->begin();
        // Update PBX settings
        foreach ($pbxSettings as $key => $value) {
            switch ($key) {
                case 'PBXRecordCalls':
                case 'PBXRecordCallsInner':
                case 'AJAMEnabled':
                case 'AMIEnabled':
                case 'RestartEveryNight':
                case 'RedirectToHttps':
                case 'PBXSplitAudioThread':
                case 'UseWebRTC':
                case PbxSettingsConstants::SSH_DISABLE_SSH_PASSWORD:
                case 'PBXAllowGuestCalls':
                case '***ALL CHECK BOXES ABOVE***':
                    $newValue = ($data[$key] === 'on') ? '1' : '0';
                    break;
                case PbxSettingsConstants::SSH_PASSWORD:
                    // Set newValue as WebAdminPassword if SSHPassword is the same as the default value
                    if ($data[$key] === $value) {
                        $newValue = $data['WebAdminPassword'];
                    } elseif ($data[$key] !== GeneralSettingsEditForm::HIDDEN_PASSWORD) {
                        $newValue = $data[$key];
                    } else {
                        continue 2;
                    }
                    break;
                case 'SendMetrics':
                    $newValue = ($data[$key] === 'on') ? '1' : '0';
                    $this->session->set('SendMetrics', $newValue);
                    break;
                case 'PBXFeatureTransferDigitTimeout':
                    $newValue = ceil((int)$data['PBXFeatureDigitTimeout'] / 1000);
                    break;
                case 'WebAdminPassword':
                    if ($data[$key] !== GeneralSettingsEditForm::HIDDEN_PASSWORD) {
                        $newValue = $this->security->hash($data[$key]);
                    } else {
                        continue 2;
                    }
                    break;
                default:
                    $newValue = $data[$key];
            }

            if (array_key_exists($key, $data)) {
                $record = PbxSettings::findFirstByKey($key);
                if ($record === null) {
                    $record = new PbxSettings();
                    $record->key = $key;
                } elseif ($record->key === $key
                    && $record->value === $newValue) {
                    continue;
                }
                $record->value = $newValue;

                if ($record->save() === false) {
                    $errors = $record->getMessages();
                    $this->flash->warning(implode('<br>', $errors));
                    $this->view->success = false;
                    $this->db->rollback();

                    return;
                }
            }
        }

        $codecs = json_decode($data['codecs'], true);
        foreach ($codecs as $codec) {
            $record = Codecs::findFirstById($codec['codecId']);
            $record->priority = $codec['priority'];
            $record->disabled = $codec['disabled'] === true ? '1' : '0';
            $record->update();
        }

        $this->flash->success($this->translation->_('ms_SuccessfulSaved'));
        $this->view->success = true;
        $this->db->commit();
    }

}