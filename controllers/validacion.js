document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("registroForm");
    const botonRegistro = document.getElementById("registroBtn");

    botonRegistro.addEventListener("click", (event) => {
        event.preventDefault();
        validarFormulario();
    });

    function validarFormulario() {
        const username = document.getElementById("username");
        const email = document.getElementById("email");
        const password = document.getElementById("password");
        const date = document.getElementById("date");
        const country = document.getElementById("country");
        const terms = document.getElementById("terms");

        let valid = true;

        if (username.value.trim() === "") {
            username.classList.add("is-invalid");
            valid = false;
        } else {
            username.classList.remove("is-invalid");
        }

        if (!validarEmail(email.value)) {
            email.classList.add("is-invalid");
            valid = false;
        } else {
            email.classList.remove("is-invalid");
        }

        if (password.value.trim() === "") {
            password.classList.add("is-invalid");
            valid = false;
        } else {
            password.classList.remove("is-invalid");
        }

        if (date.value === "") {
            date.classList.add("is-invalid");
            valid = false;
        } else {
            date.classList.remove("is-invalid");
        }

        if (country.value === "") {
            country.classList.add("is-invalid");
            valid = false;
        } else {
            country.classList.remove("is-invalid");
        }

        if (!terms.checked) {
            terms.classList.add("is-invalid");
            valid = false;
        } else {
            terms.classList.remove("is-invalid");
        }

        if (valid) {
            Swal.fire("¡Registro exitoso!", "Tu formulario ha sido enviado.", "success");
            formulario.reset();
        } else {
            Swal.fire("Error", "Por favor completa todos los campos correctamente.", "error");
        }
    }

    function validarEmail(email) {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexEmail.test(email);
    }
});
