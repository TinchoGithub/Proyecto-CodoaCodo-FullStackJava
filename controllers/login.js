
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// USUARIO Y CONTRASEÑA HARDCODEADOS
const user = 'user@email.com';
const userPassword = 'User_123';

const formulario = document.getElementById('miFormulario');

formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    emailError.textContent = '';
    passwordError.textContent = '';

    let valido = true;
    if (email === '') {
        emailError.textContent = 'El campo email es obligatorio';
        valido = false;
        return;
    } else if (!regexEmail.test(email)) {
        emailError.textContent = 'El email no es correcto, introduce un correo electrónico válido';
        valido = false;
        return;
    } else if (password === '') {
        passwordError.textContent = 'El campo password es obligatorio';
        valido = false;
    }

    if(valido){
        if (email === user) {
            if (password === userPassword) {
                login();
            } else {
                passwordError.textContent = '¡Password Incorrecta!'
            }
        } else {
            emailError.textContent = '¡Email Incorrecto!'
        }
    }
});

function login() {
    Swal.fire({
        position: "center",
        icon: "success",
        title: "¡Bienvenido! "+user,
        showConfirmButton: false,
        timer: 1500
    }).then((result) => {
        window.location.href = "./pages/home.html";
    });
}