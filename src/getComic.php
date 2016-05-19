<?php
if(!isset($_GET["number"]))
{
    echo json_encode(["error"=>"You didn't give a number for the comic, fool!");
}
