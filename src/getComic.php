<?php
if(!isset($_GET["number"]))
{
    echo json_encode(["error"=>"You didn't give a number for the comic, fool!");
}
else
{
    $out = array();
    $url = "asofterworld.com/index.php?id=" . $_GET["number"];
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
}
