import { signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js"
import { auth } from "./firebase.js";

// Obtén una referencia al botón de cerrar sesión
const btnLogout = document.getElementById('btnLogout');

// Maneja el evento click del botón de cerrar sesión
btnLogout.addEventListener('click', e => {
  // Cierra la sesión del usuario con Firebase Authentication
  signOut(auth).then(() => {
    // Redirige al usuario a la página de inicio
    window.location.href = 'index.html';
  });
});