<?php
// This gets the url of the image of a certain comic, 
// given by the HTTP GET parameter "number"
if(!isset($_GET["number"]))
{
    echo json_encode(["error"=>"You didn't give a number for the comic, fool!"]);
}
else
{
    $out = array();
    $url = "http://www.asofterworld.com/index.php?id=" . $_GET["number"];
    $shell = shell_exec("python3 get.py \"$url\"");
    $download = json_decode($shell);
    if(isset($download->error))
        echo $download->error;
    else
        echo $shell;
}
