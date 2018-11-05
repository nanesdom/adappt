<?php 	

	$p = $_POST['p'];
	$q = $_POST['q'];

	$file = fopen('../sources/questions.txt','a');
	$i = PHP_EOL . $p;
	fwrite($file, $i);
	$i = PHP_EOL . strtoupper($q);
	fwrite($file, $i);
	fclose($file);
 ?>