<?php
$out = array();
$url = "asofterworld.com";
$download = json_decode(shell_exec("python get.py $url"));
if(isset($download->error))
    echo $download->error;
else
{
    $output = array();
    $output["title"] = $download["title"];
    $output["url"] = $download["url"];
    $output["number"] = $download["number"];
    echo json_encode($output);
}
