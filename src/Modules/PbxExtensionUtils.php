<?php
/*
 * Copyright © MIKO LLC - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Alexey Portnov, 9 2020
 */

namespace MikoPBX\Modules;


use MikoPBX\Common\Models\PbxExtensionModules;
use MikoPBX\Core\System\Util;
use Phalcon\Di;

use function MikoPBX\Common\Config\appPath;

class PbxExtensionUtils
{
    /**
     * Checks module state by UniqueID
     * @param string $moduleUniqueID
     *
     * @return bool
     */
    public static function isEnabled(string $moduleUniqueID):bool
    {
        $result        = PbxExtensionModules::findFirstByUniqid($moduleUniqueID);
        return ($result!==false && $result->disabled !== '1');
    }

    /**
     * Returns module dir by UniqueID
     * @param string $moduleUniqueID
     *
     * @return string
     *
     */
    public static function getModuleDir(string $moduleUniqueID):string
    {
        $di      = Di::getDefault();
        if ($di === null){
            return "/tmp/{$moduleUniqueID}";
        }
        $config  = $di->getShared('config');
        $modulesDir    = $config->path('core.modulesDir');

        return"{$modulesDir}/{$moduleUniqueID}";
    }

    /**
     * Creates JS, CSS, IMG cache folders and links for module by UniqueID
     *
     * @param string $moduleUniqueID
     */
    public static function  createAssetsSymlinks (string $moduleUniqueID):void
    {
        $moduleDir = self::getModuleDir($moduleUniqueID);

        // IMG
        $moduleImageDir      = "{$moduleDir}/public/assets/img";
        $imgCacheDir = appPath('sites/admin-cabinet/assets/img/cache');
        $moduleImageCacheDir = "{$imgCacheDir}/{$moduleUniqueID}";
        if (file_exists($moduleImageCacheDir)){
            unlink($moduleImageCacheDir);
        }
        if (file_exists($moduleImageDir)) {
            symlink($moduleImageDir, $moduleImageCacheDir);
        }
        // CSS
        $moduleCSSDir      = "{$moduleDir}/public/assets/css";
        $cssCacheDir = appPath('sites/admin-cabinet/assets/css/cache');
        $moduleCSSCacheDir = "{$cssCacheDir}/{$moduleUniqueID}";
        if (file_exists($moduleCSSCacheDir)){
            unlink($moduleCSSCacheDir);
        }
        if (file_exists($moduleCSSDir)) {
            symlink($moduleCSSDir, $moduleCSSCacheDir);
        }
        // JS
        $moduleJSDir      = "{$moduleDir}/public/assets/js";
        $jsCacheDir = appPath('sites/admin-cabinet/assets/js/cache');
        $moduleJSCacheDir = "{$jsCacheDir}/{$moduleUniqueID}";
        if (file_exists($moduleJSCacheDir)){
            unlink($moduleJSCacheDir);
        }
        if (file_exists($moduleJSDir)) {
            symlink($moduleJSDir, $moduleJSCacheDir);
        }
    }

    /**
     * Creates links to agi-bin files for module by UniqueID
     *
     * @param string $moduleUniqueID
     */
    public static function createAgiBinSymlinks(string $moduleUniqueID):void
    {
        $moduleDir = self::getModuleDir($moduleUniqueID);

        $di = Di::getDefault();
        if ($di === null) {
            return;
        }
        $config = $di->getShared('config');

        // Create symlinks to AGI-BIN
        $agiBinDir       = $config->path('asterisk.astagidir');
        $moduleAgiBinDir = "{$moduleDir}/agi-bin";
        $files           = glob("$moduleAgiBinDir/*.{php}", GLOB_BRACE);
        foreach ($files as $file) {
            $newFilename = $agiBinDir . '/' . pathinfo($file)['filename'];
            Util::createUpdateSymlink($file, $newFilename);
        }
    }

    /**
     * To grant permissions to files ./bin/* ./agi-bin/*
     * @param string $moduleUniqueID
     */
    public static function grantPermissionsToFiles(string $moduleUniqueID):void{
        $moduleDir = self::getModuleDir($moduleUniqueID);
        $dirs = [
            "{$moduleDir}/agi-bin",
            "{$moduleDir}/bin"
        ];
        $pathChmod = Util::which('chmod');
        foreach ($dirs as $dir){
            if(file_exists($dir) && is_dir($dir)){
                Util::mwExec("{$pathChmod} +x {$dir}/*");
            }
        }
    }

}