<?php
/*
 * MikoPBX - free phone system for small business
 * Copyright (C) 2017-2020 Alexey Portnov and Nikolay Beketov
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

namespace MikoPBX\Common\Models;

use MikoPBX\Modules\Config\ConfigClass;
use Phalcon\Mvc\Model\Relation;

/**
 * Class FirewallRules
 *
 * @method static mixed findByCategory(string $category)
 *
 * @package MikoPBX\Common\Models
 */
class FirewallRules extends ModelsBase
{
    /**
     * @Primary
     * @Identity
     * @Column(type="integer", nullable=false)
     */
    public $id;

    /**
     * @Column(type="string", nullable=true){'udp','tcp','icmp'}
     */
    public ?string $protocol = '';

    /**
     * @Column(type="integer", nullable=true)
     */
    public ?string $portfrom = '';

    /**
     * @Column(type="integer", nullable=true)
     */
    public ?string $portto = '';

    /**
     * @Column(type="integer", nullable=true)
     */
    public ?string $networkfilterid = '';

    /**
     * @Column(type="string", nullable=true){'allow','block'}
     */
    public ?string $action = 'allow';

    /**
     * @Column(type="string", nullable=true){'SIP','WEB','SSH','AMI','CTI','ICMP'}
     */
    public ?string $category = '';

    /**
     * @Column(type="string", nullable=true)
     */
    public ?string $description = '';

    public static function getDefaultRules(): array
    {
        $defaultRTPFrom  = PbxSettings::getValueByKey('RTPPortFrom');
        $defaultRTPTo    = PbxSettings::getValueByKey('RTPPortTo');
        $defaultSIP      = PbxSettings::getValueByKey('SIPPort');
        $defaultAMI      = PbxSettings::getValueByKey('AMIPort');
        $defaultAJAM     = PbxSettings::getValueByKey('AJAMPort');
        $defaultAJAMTLS  = PbxSettings::getValueByKey('AJAMPortTLS');
        $defaultWeb      = PbxSettings::getValueByKey('WEBPort');
        $defaultWebHttps = PbxSettings::getValueByKey('WEBHTTPSPort');
        $defaultSSH      = PbxSettings::getValueByKey('SSHPort');


        $template = [
            'SIP'  => [
                'rules'     => [
                    ['portfrom' => $defaultSIP, 'portto' => $defaultSIP, 'protocol' => 'udp'],
                    ['portfrom' => $defaultSIP, 'portto' => $defaultSIP, 'protocol' => 'tcp'],
                    ['portfrom' => $defaultRTPFrom, 'portto' => $defaultRTPTo, 'protocol' => 'udp'],
                ],
                'action'    => 'allow',
                'shortName' => 'SIP & RTP',
            ],
            'WEB'  => [
                'rules'     => [
                    ['portfrom' => $defaultWeb, 'portto' => $defaultWeb, 'protocol' => 'tcp'],
                    ['portfrom' => $defaultWebHttps, 'portto' => $defaultWebHttps, 'protocol' => 'tcp'],
                ],
                'action'    => 'allow',
                'shortName' => 'WEB',

            ],
            'SSH'  => [
                'rules'     => [
                    ['portfrom' => $defaultSSH, 'portto' => $defaultSSH, 'protocol' => 'tcp'],
                ],
                'action'    => 'allow',
                'shortName' => 'SSH',
            ],
            'AMI'  => [
                'rules'     => [
                    ['portfrom' => $defaultAMI, 'portto' => $defaultAMI, 'protocol' => 'tcp'],
                ],
                'action'    => 'allow',
                'shortName' => 'AMI',
            ],
            'AJAM' => [
                'rules'     => [
                    ['portfrom' => $defaultAJAM, 'portto' => $defaultAJAM, 'protocol' => 'tcp'],
                    ['portfrom' => $defaultAJAMTLS, 'portto' => $defaultAJAMTLS, 'protocol' => 'tcp'],
                ],
                'action'    => 'allow',
                'shortName' => 'AJAM',
            ],
            'ICMP' => [
                'rules'     => [
                    ['portfrom' => 0, 'portto' => 0, 'protocol' => 'icmp'],
                ],
                'action'    => 'allow',
                'shortName' => 'ICMP',
            ],
        ];


        //Add modules firewall rules
        $configClassObj = new ConfigClass();
        $additionalRules = $configClassObj->hookModulesMethodWithArrayResult(ConfigClass::GET_DEFAULT_FIREWALL_RULES);
        foreach ($additionalRules as $additionalRuleFromModule){
            if ($additionalRuleFromModule!==[]){
                $additionalRuleFromModule = array_change_key_case($additionalRuleFromModule, CASE_UPPER);
                foreach ($additionalRuleFromModule as $key=>$rule){
                    $template[$key]=$rule;
                }
            }
        }
        return $template;
    }

    /**
     * Обновляет порты в записях, эта функция вызывается при записи PBXSettings
     *
     * @param \MikoPBX\Common\Models\PbxSettings $enity
     */
    public static function updatePorts(PbxSettings $enity): void
    {
        switch ($enity->key) {
            case 'RTPPortFrom':
                $defaultSIP = PbxSettings::getValueByKey('SIPPort');
                $rules      = self::findByCategory('SIP');
                foreach ($rules as $rule) {
                    if ($rule->portfrom === $defaultSIP) {
                        continue;
                    }
                    $rule->portfrom = $enity->value;
                    $rule->update();
                }
                break;
            case 'RTPPortTo':
                $defaultSIP = PbxSettings::getValueByKey('SIPPort');
                $rules      = self::findByCategory('SIP');
                foreach ($rules as $rule) {
                    if ($rule->portfrom === $defaultSIP) {
                        continue;
                    }
                    $rule->portto = $enity->value;
                    $rule->update();
                }
                break;
            case 'SIPPort':
                $defaultRTP = PbxSettings::getValueByKey('RTPPortFrom');
                $rules      = self::findByCategory('SIP');
                foreach ($rules as $rule) {
                    if ($rule->portfrom === $defaultRTP) {
                        continue;
                    }
                    $rule->portfrom = $enity->value;
                    $rule->portto   = $enity->value;
                    $rule->update();
                }
                break;
            case 'AMIPort':
            case 'AJAMPort':
                $rules = self::findByCategory('AMI');
                foreach ($rules as $rule) {
                    $rule->portfrom = $enity->value;
                    $rule->portto   = $enity->value;
                    $rule->update();
                }
                break;
            case 'WEBPort':
                $defaultWEBHTTPSPort = PbxSettings::getValueByKey('WEBHTTPSPort');
                $rules               = self::findByCategory('WEB');
                foreach ($rules as $rule) {
                    if ($rule->portfrom === $defaultWEBHTTPSPort) {
                        continue;
                    }
                    $rule->portfrom = $enity->value;
                    $rule->portto   = $enity->value;
                    $rule->update();
                }
                break;
            case 'WEBHTTPSPort':
                $defaultWEBPort = PbxSettings::getValueByKey('WEBPort');
                $rules          = self::findByCategory('WEB');
                foreach ($rules as $rule) {
                    if ($rule->portfrom === $defaultWEBPort) {
                        continue;
                    }
                    $rule->portfrom = $enity->value;
                    $rule->portto   = $enity->value;
                    $rule->update();
                }
                break;
            case 'SSHPort':
                $rules = self::findByCategory('SSH');
                foreach ($rules as $rule) {
                    $rule->portfrom = $enity->value;
                    $rule->portto   = $enity->value;
                    $rule->update();
                }
                break;
        }
    }

    public function initialize(): void
    {
        $this->setSource('m_FirewallRules');
        parent::initialize();
        $this->belongsTo(
            'networkfilterid',
            NetworkFilters::class,
            'id',
            [
                'alias'      => 'NetworkFilters',
                'foreignKey' => [
                    'allowNulls' => false,
                    'action'     => Relation::NO_ACTION,
                ],
            ]
        );
    }
}

