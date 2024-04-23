

function register(){
    Swal.fire({
        title: "¡Felicidades! Te has registrado con éxito",
        width: 600,
        padding: "3em",
        color: "#0d6efd",
        background: "#fff url()",
        backdrop: `
          rgba(0,0,123,0.4)
          url("../assets/img/papelitos.gif")
          left top
          
        `
    }).then((result) => {
           if (result.isConfirmed) {
            window.location.href = "../index.html";
        }
    });
}

function login() {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "¡Bienvenido!",
      showConfirmButton: false,
      timer: 1500
    }).then((result) => {
      // Después de cerrar el mensaje, redirigir
      window.location.href = "./pages/home.html";
    });
  }
  