function verMensaje(msj){
				mensaje = document.getElementById('mensaje');
				mensaje2 = document.getElementById('mensaje2');

				mensaje2.style.top="-80px";	
				
				mensaje2.style.background= "#e74c3c";

				mensaje.style.background= "#e74c3c";	
				mensaje.innerHTML=msj;
				mensaje.style.transition=".5s all";
				mensaje.style.top="0px";	
																		
				//DESAPARECER
				setTimeout(function(){
					mensaje.style.top="-80px";
				},5000);
			}

			function verMensaje2(msj){
				mensaje = document.getElementById('mensaje2');
				mensaje2 = document.getElementById('mensaje');

				mensaje2.style.top="-80px";		
				

				mensaje.style.background="green";
				mensaje.innerHTML=msj;
				mensaje.style.transition=".5s all";
				mensaje.style.top="0px";				
													
				//DESAPARECER
				setTimeout(function(){
					mensaje.style.top="-80px";					
				},5000);
			}

			function verMensaje4(msj){
				mensaje = document.getElementById('mensaje2');
				mensaje2 = document.getElementById('mensaje');

				mensaje2.style.top="-80px";		
				

				mensaje.style.background="blue";
				mensaje.innerHTML=msj;
				mensaje.style.transition=".5s all";
				mensaje.style.top="0px";				
													
				//DESAPARECER
				setTimeout(function(){
					mensaje.style.top="-80px";					
				},5000);
			}

			function verMensaje3(mensaje){
				ventana = document.getElementById('ventana');
				ventana.style.transition=".5s all";			
				ventana.style.left="10%";
				ventana.innerHTML="<h3>"+mensaje+"</h3>"																						
			}

			window.addEventListener('offline', desconectado, true);
			window.addEventListener('online', conectado, true);
			var desconectadoInternet = false;

			function desconectado(){
				verMensaje('Por favor revisa tu conexion a internet');
				desconectadoInternet = true;
			}
			function conectado(){
				verMensaje2('Ya hay internet!');
				desconectadoInternet = false;
			}


function openPop(idAbrir, idCerrar){
	abrir = document.getElementById(idAbrir);
	cerrar = document.getElementById(idCerrar);

	abrir.style.opacity="1";
	abrir.style.zIndex="9999";
	abrir.style.display="initial";

	cerrar.style.opacity="0";
	cerrar.style.zIndex="0";
	cerrar.style.display="none";

}

function ir(direccion){
	location.assign(direccion);
}

function salir(){
	ir('index.html');	
	localStorage.clear();
}

function curso(){
	tipo = document.getElementById('tipo').value;
	ir(tipo+".html");
}

function editarPerfil(){
	nombre = document.getElementById('name');
	edad = document.getElementById('edad');
	correo = document.getElementById('correo');
	imgPerfil = document.getElementById('imgPerfil');
	btnImg = document.getElementById('btnImg');
	file = document.getElementById('file');

	file.disabled=false;
	nombre.disabled=false;
	nombre.style.borderBottom="1px solid white";
	edad.disabled=false;
	edad.style.borderBottom="1px solid white";

	imgPerfil.style.cursor="pointer";

	btnImg.style.display="block";
	btnImg.style.textAlign="center";
}

function guardarPerfil(){
	nombre = document.getElementById('name');
	edad = document.getElementById('edad');
	correo = document.getElementById('correo');
	imgPerfil = document.getElementById('imgPerfil');
	btnImg = document.getElementById('btnImg');
	file = document.getElementById('file');

	file.disabled=true;
	nombre.disabled=true;
	nombre.style.borderBottom="none";
	edad.disabled=true;
	edad.style.borderBottom="none";

	imgPerfil.style.cursor="default";

	btnImg.style.display="none";

	guardarPerfilBD();

}

function cambiarImg(){
	imgPerfil = document.getElementById('imgPerfil');
	photo = document.getElementById("file");
	files = photo.files;
		file = files[0];

		 var reader = new FileReader();
             
                    reader.onload = (function(theFile) {
                        return function(e) {
                          // Insertamos la imagen
                         imgPerfil.src =  e.target.result;
                        };
                    })(file);
             
                    reader.readAsDataURL(file);                  
}

function guardarPerfilBD(){
		idUser = localStorage.getItem('id');
		imgPerfil = localStorage.getItem('imgPerfil');
		photo = document.getElementById("file");
		nombre = document.getElementById("name").value;
		edad = document.getElementById("edad").value;
		correo = document.getElementById("correo").value;

		files = photo.files;
		file = files[0];
		if ( file == null) {
			file = imgPerfil;
		}else{
			imgPerfil = "imgs/"+idUser+correo+".jpg";
		}

		if (nombre == "" || edad == "" || idUser == "" || correo == "") {
			verMensaje('Llena todos los campos');
		}else{
			formData = new FormData();
			formData.append('foto', file);
			formData.append('nombre', nombre);
			formData.append('edad', edad);
			formData.append('correo', correo);
			formData.append('idUser', idUser);

			editarPerfilBD = new XMLHttpRequest();
			editarPerfilBD.open('POST', 'php/editarPerfil.php');

			

			editarPerfilBD.send(formData);

			editarPerfilBD.onreadystatechange = function() {

				if (editarPerfilBD.readyState == 4 && editarPerfilBD.status == 200) {

						resultado = editarPerfilBD.responseText;

						// console.log(resultado);
						if (resultado == "ok") {
							verMensaje4('Se editó exitosamente!');
							localStorage.setItem('edad',edad);
							localStorage.setItem('imgPerfil',imgPerfil);
							localStorage.setItem('user',nombre);
							
						}
						else{
							verMensaje('Ocurrió un error');
						}
		   
				}
			}
		}
}

function siguiente(cerrar, abrir){
	cerrar = document.getElementById(cerrar);
	abrir = document.getElementById(abrir);

	cerrar.style.display="none";
	abrir.style.display="inherit";
}