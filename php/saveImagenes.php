<?php 

	$l = $_POST['l'];

	$charac = explode("xEOLx", $l);

	$i = "";
	$file = fopen('../sources/imagenesTxt.txt','w+');
	for ($x = 0; $x < sizeof($charac); $x++)
	{
		$i = $i . $charac[$x] . PHP_EOL;
	}

	fwrite($file, $i);
	fclose($file);
	
 ?>