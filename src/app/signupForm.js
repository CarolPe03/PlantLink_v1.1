import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js"
import { auth } from "./firebase.js";
import { showMessage } from "./showMessage.js";
import { loginCheck } from "./loginCheck.js";

const signUpForm = document.querySelector("#signup-form");

signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = signUpForm["signup-email"].value;
  const password = signUpForm["signup-password"].value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    console.log(userCredential)

    // Send email verification
    await userCredential.user.sendEmailVerification();

    // Close the signup modal
    const signupModal = document.querySelector('#signupModal');
    const modal = bootstrap.Modal.getInstance(signupModal);
    modal.hide();

    // reset the form
    signUpForm.reset();

    // show message to verify email
    showMessage("Por favor, verifica tu dirección de correo electrónico antes de iniciar sesión");

    // Update UI based on user's new authentication state
    loginCheck(userCredential.user);

  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      showMessage("Este correo ya está registrado", "error")
    } else if (error.code === 'auth/invalid-email') {
      showMessage("Correo incorrecto", "error")
    } else if (error.code === 'auth/weak-password') {
      showMessage("Contraseña incorrecta", "error")
    } else if (error.code) {
      showMessage("Algo salió mal", "error")
    }
  }

});



