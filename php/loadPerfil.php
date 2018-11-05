<?php 


# Mandamos llamar al archivo de conexión
	require_once('conex.php');

   	 # Creamos la conexión con la BD
	$funciones=new Funciones();
	$con=$funciones->conectar();

 # Recuperamos las variabes
		$idUser=$_POST['idUser'];
		// $user='s';
		// $pass='s';
		$respuesta = "";

        # Buscamos al usuario en la BD
		$buscar="SELECT COUNT(*) AS total 
		FROM users 
		WHERE idUsuario='{$idUser}';";

		$resultado= $con->query($buscar);
		$total=$resultado->fetch_assoc();

		if($total['total']==0)
		{
			$respuesta = "mal";
			$arreglo = array(
			'logueado' => $respuesta
	 		);
		}
		else
		{
            # Mandamos la consulta a la BD
			#echo "<script>alert ('Puedes iniciar sesion');</script>";
			$buscarUser="SELECT * FROM users WHERE idUsuario='{$idUser}';";

			$resBucarUser=$con->query($buscarUser);

			$res = $resBucarUser->fetch_assoc();

			$respuesta= "ok";

			$arreglo = array(
			'logueado' => $respuesta,
			'username' => $res['username'],
			'correo' => $res['correo'],
			'edad' => $res['edad'],
			'imgPerfil' => $res['imgPerfil'],
			'id' => $res['idUsuario']
	 		);
		}


	echo json_encode($arreglo);


 ?>