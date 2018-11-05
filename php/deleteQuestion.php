<?php 	

	$p = $_GET['p'];

	/*
	$file = fopen('../sources/questions.txt','w');
	$i = PHP_EOL . $p;
	fwrite($file, $i);
	$i = PHP_EOL . strtoupper($q);
	fwrite($file, $i);
	fclose($file);
	*/

	$lines = array();
	$handle = fopen('../sources/questions.txt', "r");
	if ($handle) {
    	while (($line = fgets($handle)) !== false) {
        // process the line read.
    		array_push($lines, $line);
    	}

    	fclose($handle);
	} else {
    	// error opening the file.
	}

	$p = (int)$p;

	$file = fopen('../sources/questions.txt','w');
	for ($i=0; $i < sizeof($lines); $i++) { 
		# code...
		if ($i != ($p * 2)) {
			if ($i != ($p * 2) + 1) {
				# code...
				fwrite($file, $lines[$i]);
			}
		}
		echo ($p * 2);
	}
	fclose($file);
	

 ?>