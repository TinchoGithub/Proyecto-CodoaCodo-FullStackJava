const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const errorPassword = 'La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una letra minúscula, un número y un carácter especial';

const registro = document.getElementById('registro');

registro.addEventListener('submit', function (evento) {
  evento.preventDefault();

  const nombre = document.getElementById('username').value;
  const nombreError = document.getElementById('userError');
  const email = document.getElementById('email').value;
  const emailError = document.getElementById('emailError');
  const password = document.getElementById('password').value;
  const passwordError = document.getElementById('passwordError');
  const fechaNacimiento = document.getElementById('date').value;
  const fechaNacimientoError = document.getElementById('fechaNacimientoError');
  const nacionalidad = document.getElementById('country').value;
  const nacionalidadError = document.getElementById('nacionalidadError');

  nombreError.textContent = '';
  emailError.textContent = '';
  passwordError.textContent = '';
  fechaNacimientoError.textContent = '';
  nacionalidadError.textContent = '';

  let formValid = true;

  if (nombre === '') {
    nombreError.textContent = 'El campo nombre es obligatorio';
    formValid = false;
    return;
  }

  if (email === '') {
    emailError.textContent = 'El campo email es obligatorio';
    formValid = false;
    return;
  } else if (!regexEmail.test(email)) {
    emailError.textContent = 'El formato del email es incorrecto';
    formValid = false;
    return;
  }

  if (password === '') {
    passwordError.textContent = 'El campo password es obligatorio';
    formValid = false;
    return;
  } else if (!regexPassword.test(password)) {
    passwordError.textContent = errorPassword;
    formValid = false;
    return;
  }

  if (fechaNacimiento === '') {
    fechaNacimientoError.textContent = 'El campo fecha de nacimiento es obligatorio';
    formValid = false;
    return;
  }

  if (nacionalidad === '') {
    nacionalidadError.textContent = 'El campo país es obligatorio';
    formValid = false;
    return;
  }

  if (formValid) {
    register();
  }
});




function register() {
  Swal.fire({

    title: "¡Felicidades! Te has registrado satisfactoriamente",
    width: 600,
    padding: "3em",
    color: "#0d6efd",
    background: "#fff url()",
    backdrop: `
          rgba(0,0,123,0.4)
          url("../assets/img/papelitos.gif")
          left top
        `,

  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "../index.html";
    }
  });
}

const crearUsuario = (nombre, email, password, fecha, pais) => {

  return fetch('', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nombre, email, password, fecha, pais, }),
  });
};