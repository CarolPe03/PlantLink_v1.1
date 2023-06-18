const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");

export const loginCheck = (user) => {
  if (user) {
    loggedInLinks.forEach((link) => (link.style.display = "block"));
    loggedOutLinks.forEach((link) => (link.style.display = "none"));
    Swal.fire({
      title: '¡Bienvenido a PlantLink! ' + user.email,
      imageUrl: 'public/index_estilos/img/core-img/plantlink_logo33.png',
      imageHeight: 200
    });
    setTimeout(() => {
      window.location.href = "perfil.html"; 
    }, 2000); // 15 segundos (15000 ms)
  } else {
    loggedInLinks.forEach((link) => (link.style.display = "none"));
    loggedOutLinks.forEach((link) => (link.style.display = "block"));
  }
};