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

declare(strict_types=1);

namespace MikoPBX\Common\Providers;


use MikoPBX\Modules\Config\WebUIConfigInterface;
use MikoPBX\Modules\PbxExtensionUtils;
use Phalcon\Di\DiInterface;
use Phalcon\Di\ServiceProviderInterface;
use Phalcon\Mvc\Router;

/**
 * Register Router service
 */
class RouterProvider implements ServiceProviderInterface
{
    public const SERVICE_NAME = 'router';

    /**
     * Register router service provider
     *
     * @param \Phalcon\Di\DiInterface $di
     */
    public function register(DiInterface $di): void
    {
        $di->set(
            self::SERVICE_NAME,
            function () {
                $router = new Router();

                $router->setDefaultModule("admin-cabinet");
                $router->setDefaultNamespace('MikoPBX\AdminCabinet\Controllers');
                $router->setDefaultController('extensions');
                $router->setDefaultAction('index');

                $router->add('/admin-cabinet/:controller/:action/:params', [
                        'module'     => 'admin-cabinet',
                        'controller' => 1,
                        'action'     => 2,
                        'params'     => 3
                ]);

                // Add route for external modules which integrate its views into admin web ui
                $route = $router->add('/admin-cabinet/{namespace:module.*}/:controller/:action/:params', [
                    'module'     => 'admin-cabinet',
                    'namespace'  => 1,
                    'controller' => 2,
                    'action'     => 3,
                    'params'     => 4,
                ]);

                $route->convert(
                    'namespace',
                    function ($namespace) {
                        $camelizedNameSpace = \Phalcon\Text::Camelize($namespace);
                        return "\\Modules\\{$camelizedNameSpace}\\App\\Controllers";
                    }
                );

                // Register additional app modules from external enabled modules
                PbxExtensionUtils::registerEnabledModulesInRouter($router);

                // Register additional routes from external enabled modules
                PBXConfModulesProvider::hookModulesProcedure(WebUIConfigInterface::ON_AFTER_ROUTES_PREPARED,[&$router]);

                return $router;
            }
        );
    }
}