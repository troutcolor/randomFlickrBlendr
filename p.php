<?php
$i=$_GET['i'];

if (!getimagesize($i)){
	
}else{
	$contents = file_get_contents($i);
	        header('Content-type: image/jpg');
	        echo $contents;
	
}
	
?>