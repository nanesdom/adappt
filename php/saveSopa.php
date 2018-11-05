<?php 	

	$l = $_POST['l'];
	$q = $_POST['q'];
	$k = $_POST['k'];

	$charac = explode(" ", $l);

	$i = "";
	$file = fopen('../sources/sopa.txt','w+');
	for ($x = 0; $x < sizeof($charac); $x++)
	{
		$i = $i . $charac[$x] . PHP_EOL;
	}

	$i = $i . ".EOT." .PHP_EOL;

	fwrite($file, $i);
	
	$charac2 = explode("/", $q);

	$i = "";
	for ($x = 0; $x < sizeof($charac2); $x++)
	{
		$i = $i . $charac2[$x] . PHP_EOL;
	}

	$i = $i . ".EOT." . PHP_EOL;

	fwrite($file, $i);

	$charac3 = explode(" ", $k);

	$i = "";
	for ($x = 0; $x < sizeof($charac3) - 1; $x++)
	{
		$i = $i . $charac3[$x] . PHP_EOL;
	}

	$i = $i . $charac3[sizeof($charac3) - 1];

	fwrite($file, $i);

	fclose($file);
 ?>