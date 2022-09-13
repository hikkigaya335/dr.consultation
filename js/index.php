<?php
$contents = file_get_contents('php://input', true);
file_put_contents('../json/data.json', $contents);
?>