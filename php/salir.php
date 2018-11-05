<?php 


	function salir($sesion){
		// $sesion = $_POST['usuario'];
	$resultado = "";

	if (isset($_SESSION['user'])) {
		# code...
		if ($_SESSION['user'] == $sesion)
	    {
	    	session_unset();
	        $resultado = "ok";
	    }
	    else
	    {
	    	session_unset();
	    	$resultado = "noiniciada";
	    }
	}
	else{
		session_unset();
		$resultado = "noiniciada";
	}

	session_destroy();
	echo $resultado;
	}

 ?>