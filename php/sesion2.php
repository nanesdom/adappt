<?php 

// session_start();
// 	$hola='nanes';
// 	$hola2='1';
// 	sesion($hola, $hola2);

	function sesion2($sesion, $sesion2){ 
	// 	$sesion = $_POST['usuario'];
	// $sesion2 = $_POST['id'];
	$resultado = "";

	if (isset($_SESSION['user'])) {
		# code...
		if ($_SESSION['user'] == $sesion)
	    {
	        $resultado = "ok";
	    }
	    else
	    {
	    	$resultado = "noiniciada";
	    }
	}
	else{
		$resultado = "noiniciada";
	}

	if (isset($_SESSION['id'])) {
		# code...
		if ($_SESSION['id'] == $sesion2)
	    {
	        $resultado = "ok";
	    }
	    else
	    {
	    	$resultado = "noiniciada";
	    }
	}
	else{
		$resultado = "noiniciada";
	}

	$arreglo = array(
			'logueado' => $resultado			
	 		);
	echo json_encode($arreglo);
	}

	// $user=$_SESSION['user'];
	// echo $user;

	

 ?>