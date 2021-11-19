let formulario = document.getElementById("formulario")

let error = document.getElementById("messageerror");

let verUsuario = document.getElementById("guardar")

verUsuario.addEventListener('click', e =>{
    let emailUsuario = document.getElementById("email").value;
    let passwordUsuario = document.getElementById("password").value;

    let usuario = JSON.parse(localStorage.getItem("Usuario"))
    usuario.forEach(element => {
        if(element.emailUsuario === emailUsuario && element.passwordUsuario === passwordUsuario){
            verUsuario.href="./citas.html"
        }
        else{
            error.innerHTML= `
            <p class="error">Email o contraseña incorrectos</p>`
        }
    })
})