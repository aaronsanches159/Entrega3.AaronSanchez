// Inicio de sesion

document.getElementById('userForm').addEventListener('submit', function(event) {
	event.preventDefault(); 
	if (validarFormulario()) {
		// valores del formulario
		var nombre = document.getElementById('nombre').value;
		var apellido = document.getElementById('apellido').value;
		var localidad = document.getElementById('localidad').value;
		var direccion = document.getElementById('direccion').value;
		var departamento = document.getElementById('departamento').value;
		var mail = document.getElementById('mail').value;
		var celular = document.getElementById('celular').value;

		// datos en el almacenamiento local
		localStorage.setItem('nombre', nombre);
		localStorage.setItem('apellido', apellido);
		localStorage.setItem('localidad', localidad);
		localStorage.setItem('direccion', direccion);
		localStorage.setItem('departamento', departamento);
		localStorage.setItem('mail', mail);
		localStorage.setItem('celular', celular);

		// Continuar con el loader solo si la validación del formulario es exitosa
		document.getElementById('loader').classList.remove('hidden');

		setTimeout(function() {
			window.location.href = 'main.html';
		}, 1000); 
	}
});

function validarFormulario() {
	var campos = document.querySelectorAll('#userForm input[type="text"], #userForm input[type="email"], #userForm input[type="password"]');
	for (var i = 0; i < campos.length; i++) {
		if (campos[i].value.trim() === '') {
			mostrarAviso('Por favor, complete todos los campos.');
			return false;
		}
	}
	return true;
}

function mostrarAviso(mensaje) {
	var avisoElement = document.createElement('div');
	avisoElement.className = 'aviso';
	avisoElement.textContent = mensaje;

	var avisoContainer = document.getElementById('avisoContainer');

	avisoContainer.innerHTML = '';

	avisoContainer.appendChild(avisoElement);
}