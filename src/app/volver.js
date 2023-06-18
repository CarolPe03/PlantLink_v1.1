import { signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js"
import { auth } from "./firebase.js";

// Obtén una referencia al botón de cerrar sesión
const btnVolver = document.getElementById('btnVolver');


// Maneja el evento click del botón de cerrar sesión
btnVolver.addEventListener('click', e => {
  // Cierra la sesión del usuario con Firebase Authentication
  signOut(auth).then(() => {
    // Redirige al usuario a la página de inicio
    window.location.href = 'perfil.html';
  });
});