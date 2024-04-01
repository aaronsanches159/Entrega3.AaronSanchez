// Inicio de sesion

document.getElementById('userForm').addEventListener('submit', function(event) {
	event.preventDefault(); 

	// valores del formulario
	var nombre = document.getElementById('nombre').value;
	var apellido = document.getElementById('apellido').value;
	var localidad = document.getElementById('localidad').value;
	var direccion = document.getElementById('direccion').value;
	var departamento = document.getElementById('departamento').value;
	var mail = document.getElementById('mail').value;
	var contraseña = document.getElementById('contraseña').value;
	var celular = document.getElementById('celular').value;

	// datos en el almacenamiento local
	localStorage.setItem('nombre', nombre);
	localStorage.setItem('apellido', apellido);
	localStorage.setItem('localidad', localidad);
	localStorage.setItem('direccion', direccion);
	localStorage.setItem('departamento', departamento);
	localStorage.setItem('mail', mail);
	localStorage.setItem('contraseña', contraseña);
	localStorage.setItem('celular', celular);
});


document.getElementById('userForm').addEventListener('submit', function(event) {
	event.preventDefault();

	document.getElementById('loader').classList.remove('hidden');

	setTimeout(function() {
		window.location.href = 'main.html';
	}, 1000); 
});