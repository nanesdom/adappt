<?php 

require_once('conex.php');

// $hola="nanes2";
// $hola1="";
// $hola2="";
// $hola3="";
     # Creamos la conexión con la BD
    $funciones=new Funciones();
    $con=$funciones->conectar();

$usuario = $_POST['usuario'];
$password = $_POST['password'];
$password2 = $_POST['password2'];
$nombre = $_POST['nombre'];

//     $usuario = 'usuario';
// $password = 'password';
// $password2 = 'password2';
// $nombre = 'nombre';

$respuesta = "";



    $contarUsers="SELECT COUNT(*) AS users FROM users WHERE correo='{$nombre}'";
        $resUsers = $con->query($contarUsers);

        $users=$resUsers->fetch_object();
        if($users->users==0)
        {
            if($password==$password2)
            {
                # Mandamos el INSERT
                $insert="INSERT INTO users(username, password, correo)
                         VALUES('{$usuario}',md5('{$password}'), '{$nombre}');";

                if($con->query($insert))
                {
                    $respuesta = "ok";
                }
                else
                {
                    $respuesta = "error";
                }
            }
            else
            {
                $respuesta = "contraseña";
            }
        }
        else
        {
            $respuesta = "existe";
        }

        $arreglo = array(
            'logueado' => $respuesta            
            );
    echo json_encode($arreglo);

 ?>