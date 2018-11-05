function per(){
	handleUpdate();
}

function handleUpdate(e){	
	var x = Math.floor((Math.random() * 3) + 1);
	if (x==1) {
		conjunto1();
	}
	if (x==2) {
		conjunto2();
	}
	if (x==3) {
		conjunto3();
	}
	
}

function conjunto1(){
	body = document.body;
	fondo = document.querySelector('.imgFondo');
	
	body.style.setProperty('--color-fuerte', "#000");
	body.style.setProperty('--color-medio', "#555");
	body.style.setProperty('--color-contraste', "#fbc531");
	body.style.setProperty('--color-contraste2', "#e84118");
	fondo.src="media/fondo1.jpg";
}
function conjunto2(){
	body = document.body;
	fondo = document.querySelector('.imgFondo');
	
	body.style.setProperty('--color-fuerte', "#2f3640");
	body.style.setProperty('--color-medio', "#40739e");
	body.style.setProperty('--color-contraste', "#e1b12c");
	body.style.setProperty('--color-contraste2', "#e84393");
	fondo.src="media/fondo.jpg";
}

function conjunto3(){
	body = document.body;
	fondo = document.querySelector('.imgFondo');
	
	body.style.setProperty('--color-fuerte', "#4F1E51");
	body.style.setProperty('--color-medio', "#D980FA");
	body.style.setProperty('--color-contraste', "#C4E538");
	body.style.setProperty('--color-contraste2', "#12CBC4");
	fondo.src="media/fondo2.jpg";
}

function loadPerfil(){
	namee = localStorage.getItem('user');
	correoo = localStorage.getItem('correo');
	edadd = localStorage.getItem('edad');
	imgPerfill = localStorage.getItem('imgPerfil');

	nombre = document.getElementById('name');
	edad = document.getElementById('edad');
	correo = document.getElementById('correo');
	imgPerfil = document.getElementById('imgPerfil');

	nombre.value=namee;
	edad.value=edadd;
	correo.value=correoo;
	imgPerfil.src=imgPerfill;
}

function variables(){
	idUser = localStorage.getItem('id');

	if (idUser == "" || idUser == " " || idUser == null) {
		salir();
	}else{

		formData = new FormData();
			formData.append('idUser', idUser);

			loadPerfilBD = new XMLHttpRequest();
			loadPerfilBD.open('POST', 'php/loadPerfil.php');

			

			loadPerfilBD.send(formData);

			loadPerfilBD.onreadystatechange = function() {

				if (loadPerfilBD.readyState == 4 && loadPerfilBD.status == 200) {

						respuesta = JSON.parse(loadPerfilBD.responseText);						

						resultado = respuesta.logueado;

						// console.log(resultado);
						if (resultado == "ok") {							
							localStorage.setItem('user', respuesta.username);
							localStorage.setItem('correo', respuesta.correo);							
							localStorage.setItem('id', respuesta.id);
							localStorage.setItem('edad', respuesta.edad);							
							localStorage.setItem('imgPerfil', respuesta.imgPerfil);
							verMensaje4('Bienvenido');						
						}
						else{
							salir();
						}
		   
				}
			}

			// console.log(idUser);
	}

}

function load(){
	per();
	variables();
	loadPerfil();
	loadPage();
}

function loadPage(){
	body = document.body;

	body.style.opacity="1";
}