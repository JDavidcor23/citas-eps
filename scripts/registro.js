 let formulario = document.getElementById("formulario")

 let guardarUsuario = document.getElementById("guardar")
 let usuarios = []

 if (localStorage.getItem('Citas')) {
    usuarios = JSON.parse(localStorage.getItem('Usuario'));
}
 guardarUsuario.addEventListener('click', e =>{
     // e.preventDefault()
     let nombreUsuario = document.getElementById("nombre").value;
     let emailUsuario = document.getElementById("email").value;
     let passwordUsuario = document.getElementById("password").value;

     let usuario = {
         nombreUsuario,
         emailUsuario,
         passwordUsuario
     }
     usuarios.push(usuario)
     localStorage.setItem("Usuario", JSON.stringify(usuarios))
 })