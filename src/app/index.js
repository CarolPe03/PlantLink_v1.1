
function saveContacto() {
    const form = document.querySelector('.formulario');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
    const form = document.querySelector('.formulario');
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita que se envíe el formulario de forma predeterminada
        // Agrega los datos del formulario a Firebase Firestore
        db.collection('contactos').add({
            name: form.name.value,
            email: form.email.value,
            phone: form.phone.value,
            message: form.message.value
        })
        .then(() => {
            // Muestra la alerta de confirmación
            Swal.fire({
                title: '¡Gracias por contactarnos!',
                imageUrl: 'public/index_estilos/img/core-img/plantlink_logo33.png',
                imageHeight: 200
            });
            form.reset(); // Limpia los campos del formulario
        })
        .catch((error) => {
            // Muestra la alerta de error
            Swal.fire({
                icon: 'error',
                title: 'Ocurrió un error al enviar tu mensaje. Por favor, intenta de nuevo más tarde.',
                text: 'PlantLink',
            });
            console.error('Error al agregar los datos a Firestore: ', error);
        });
    });
    });
  }
  document.addEventListener('DOMContentLoaded', () => {
    saveContacto();
  });

  function resetPassword(email) {
    var db = firebase.firestore();
    
    firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        // El correo electrónico para restablecer la contraseña se ha enviado correctamente
        console.log("El correo electrónico para restablecer la contraseña se ha enviado correctamente.");
        // Muestra un mensaje al usuario indicando que se ha enviado un correo electrónico para restablecer la contraseña
        document.getElementById("mensaje").textContent = "Se ha enviado un correo electrónico para restablecer la contraseña.\nNO OLVIDES VERIFICAR EN SPAM";
        document.getElementById("mensaje").style.color = "green";
      })
      .catch((error) => {
        // Ha ocurrido un error al enviar el correo electrónico para restablecer la contraseña
        console.error("Ha ocurrido un error al enviar el correo electrónico para restablecer la contraseña:", error);
        // Muestra un mensaje al usuario indicando que ha ocurrido un error al enviar el correo electrónico para restablecer la contraseña
        document.getElementById("mensaje").textContent = "Ha ocurrido un error al enviar el correo electrónico para restablecer la contraseña. Por favor, comprueba que la dirección de correo electrónico es válida e inténtalo de nuevo.";
        document.getElementById("mensaje").style.color = "red";
      });
  }