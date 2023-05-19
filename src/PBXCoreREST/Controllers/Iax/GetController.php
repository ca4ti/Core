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

namespace MikoPBX\PBXCoreREST\Controllers\Iax;

use MikoPBX\PBXCoreREST\Controllers\BaseController;


/**
 * Handles the GET request for IAX registrations at /api/iax/{name}.
 *
 * @example
 * curl http://172.16.156.212/pbxcore/api/iax/getRegistry;
 */
class GetController extends BaseController
{

    /**
     * Calls the corresponding action for IAX registrations based on the provided $actionName.
     *
     * @param string $actionName The name of the action.
     * @return void
     */
    public function callAction(string $actionName): void
    {
        $this->sendRequestToBackendWorker('iax', $actionName);
    }
}