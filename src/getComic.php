<?php
if(!isset($_GET["number"]))
{
    echo json_encode(["error"=>"You didn't give a number for the comic, fool!"]);
}
else
{
    $out = array();
    $url = "http://www.asofterworld.com/index.php?id=" . $_GET["number"];
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
}
