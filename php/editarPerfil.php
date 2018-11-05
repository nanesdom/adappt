<?php 

require_once('conex.php');

    # Creamos la conexión con la BD
	$funciones=new Funciones();
	$con=$funciones->conectar();

    $nombre = $_POST['nombre'];
    $edad = $_POST['edad'];
    $correo = $_POST['correo'];
    $idUser = $_POST['idUser'];

    $respuesta = "";

    if (isset($_FILES['foto'])) {
        # code...
        $currentDir = getcwd();
        $uploadDirectory = "imgs/";
        $fileTmpName  = $_FILES['foto']['tmp_name'];
        $fileName = $idUser.$correo;
        $uploadPath = "../". $uploadDirectory . $fileName.".jpg"; 
        $uploadPath2 = $uploadDirectory . $fileName.".jpg"; 
        $didUpload = move_uploaded_file($fileTmpName, $uploadPath);

        if ($didUpload) {
                    #Mandamos el Update
                 $editar="UPDATE `users` SET `username` = '{$nombre}', `edad` = '{$edad}', `imgPerfil` = '{$uploadPath2}' WHERE `users`.`idUsuario` = '{$idUser}';";

            if($con->query($editar))
            {
                $respuesta="ok";
            }
                 echo $respuesta;
        }
    }else{
        $foto = $_POST['foto'];
        #Mandamos el Update
             $editar="UPDATE `users` SET `username` = '{$nombre}', `edad` = '{$edad}', `imgPerfil` = '{$foto}' WHERE `users`.`idUsuario` = '{$idUser}';";

        if($con->query($editar))
        {
            $respuesta="ok";
        }
             echo $respuesta;
    }

    
    
 ?>