<?php
$out = array();
$url = "http://www.asofterworld.com/";
$shell = shell_exec("python get.py $url");
$download = json_decode($shell);
if(isset($download->error))
    echo $download->error;
else
{
    $output = array();
    $output["title"] = $download->title;
    $output["url"] = $download->url;
    $output["number"] = $download->number;
    echo json_encode($output);
}
