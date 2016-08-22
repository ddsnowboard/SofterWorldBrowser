<?php
// This page returns the newest comic. Since they are no longer
// publishing, it should pretty much always return the same thing, but 
// I thought I should have it to be safe instead of just hard-coding a number
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
