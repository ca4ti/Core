<?php
/*
 * Copyright © MIKO LLC - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Alexey Portnov, 10 2020
 */

use MikoPBX\Common\Models\Sip;
use MikoPBX\Core\System\Util;
require_once 'Globals.php';

$testName = basename(__DIR__);
echo "\033[01;35mStart test {$testName}\033[39m \n";

$db_data = Sip::find("type = 'peer' AND ( disabled <> '1')");

$enpointPattern = file_get_contents(__DIR__.'/configs/pjsip-pattern-endpoint.conf');
$config         = file_get_contents(__DIR__.'/configs/pjsip-pattern.conf');
/** @var Sip $peer */
foreach ($db_data as $peer){
    $conf = str_replace('<ENDPOINT>', $peer->extension, $enpointPattern);
    $conf = str_replace('<PASSWORD>', $peer->secret, $conf);

    $config .= "\n$conf \n";
}

$dirName = getenv('dirName');
$astConf = getenv('astConf');

$cmdAsterisk = Util::which('asterisk');
file_put_contents("$dirName/asterisk/pjsip.conf", $config);
Util::mwExec("{$cmdAsterisk} -C '$astConf' -rx 'module reload res_pjsip.so'");

sleep(2);
$result = Util::mwExec($cmdAsterisk.' -rx"core show hints" | grep PJSIP/ | grep -v Idle', $out);
if($result !== 1){
    file_put_contents('php://stderr', "\033[01;31m-> ".'Not all endpoint are registered: '. implode($out)."\033[39m \n");
}else{

    echo "\033[01;32m-> \033[39mEndpoints connected successfully \n";
}
echo "\033[01;32m-> \033[39mEnd test \n\n";