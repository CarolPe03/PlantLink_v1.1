window.onload=function(){
    verAutenticacion();
}
function iniciarSesion(){
    var email=document.getElementById("login-email").value;
    var password=document.getElementById("login-password").value;
    firebase.auth().signInWithEmailAndPassword(email,password).then(res=>{
        
        document.location.href="./perfil.html";
        //IMAGEN
        if(res.user.photoURL!=null){
            document.getElementById("imgFotoUsuario").src=res.user.photoURL;
        }else{
            document.getElementById("imgFotoUsuario").src="img/noFoto.jpg";
        }

    }).catch(err=>{
        document.getElementById("alertErrorLogueo").style.display="block";
        document.getElementById("alertErrorLogueo").innerHTML=err;
    });

}

function createUser() {
    var displayName = document.getElementById("signup-name").value;
    var email = document.getElementById("signup-email").value;
    var password = document.getElementById("signup-password").value;
  
    if (displayName == "") {
      document.getElementById("alertaErrorRegistro").style.display = "block";
      document.getElementById("alertaErrorRegistro").innerHTML =
        "Debe ingresar un nombre de usuario";
      return;
    }
  
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        var usuario = res.user;
  
        return res.user
          .updateProfile({
            displayName: displayName
          })
          .then(profile => {
            Swal.fire({
              title: '¡Bienvenido a PlantLink! ' + usuario.email,
              imageUrl: 'public/index_estilos/img/core-img/plantlink_logo33.png',
              imageHeight: 200
            });
  
            setTimeout(() => {
              window.location.href = "perfil.html";
            }, 2000);
  
            document.getElementById("btnCancelar").click();
            firebase.auth().signOut();
  
            return firebase
              .firestore()
              .collection("datosUsuario")
              .doc(usuario.uid)
              .set({
                nombre: "",
                apellido: "",
                email: email,
                displayName: usuario.displayName,
                photoURL: usuario.photoURL,
                provider: res.additionalUserInfo.providerId,
                phoneNumber: usuario.phoneNumber == null ? "" : usuario.phoneNumber,
                descripcion: ""
              })
              .then(res => {
                document.location.href = "./index.html";
              })
              .catch(err => {
                alert(err);
              });
          })
          .catch(err => {
            alert(err);
          });
      })
      .catch(err => {
        alert(err);
      });
  }
  
function authGoogle(){
    const providerGoogle= new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(providerGoogle).then(res=>{
        //saco todo el objeto
        var user= res.user;
        return firebase.firestore().collection("datosUsuario").doc(user.uid)
        .get().then(el=>{
            var inf= el.data();
            //Es su primera vez
            if(inf==null || inf==undefined){
                //Insercion
                return firebase.firestore().collection("datosUsuario").doc(user.uid).set({
                    nombre: res.additionalUserInfo.profile.given_name,
                    apellido:  res.additionalUserInfo.profile.family_name,
                    email:user.email,
                    displayName: user.displayName,
                    photoURL:user.photoURL,
                    provider:res.additionalUserInfo.providerId,
                    phoneNumber: user.phoneNumber==null ? "": user.phoneNumber,
                    descripcion:""
                }).then(respuesta=>{
                    document.location.href="./perfil.html";
                }).catch(err=>{
                    Swal.fire({
                        title: 'Ocurrió un error al registrarse ',
                        icon: 'error', 
                        imageHeight: 200
                      });
                    
                })
                //Ya existe (no registro bd el usuario)
            }else{
                document.location.href="./perfil.html";
            }
        })
        //console.log(res);
    }).catch(err=>{
        alert(err);
    });
}
function authFacebook(){
    const providerFacebook= new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(providerFacebook).then(res=>{
        var user= res.user;
        return firebase.firestore().collection("datosUsuario").doc(user.uid)
        .get().then(el=>{
            var inf= el.data();
            var userName= res.additionalUserInfo.username;
            if(inf==null || inf==undefined){
                //registrar
                return firebase.firestore().collection("datosUsuario").doc(user.uid).set({
                    nombre: "",
                    apellido:  "",
                    email:user.email,
                    displayName: userName==undefined ?"" : userName,
                    photoURL:user.photoURL,
                    provider:res.additionalUserInfo.providerId,
                    phoneNumber: user.phoneNumber==null ? "": user.phoneNumber,
                    descripcion:""
                }).then(respuesta=>{
                    document.location.href="./perfil.html";
                }).catch(err=>{
                    Swal.fire({
                        title: 'Ocurrió un error al registrarlo ',
                        icon: 'error', 
                        imageHeight: 200
                      });
                })
            }else{
                //que ingrese
                document.location.href="./perfil.html";
            }
        })
    }).catch(err=>{
        alert(err);
    })
}

