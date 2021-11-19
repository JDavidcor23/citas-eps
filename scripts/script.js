let form = document.querySelector('form');
let listarCitas = document.getElementById("listarCitas")
let citas = []
let buscar = document.getElementById("btnBuscar")
let busqueda = document.getElementById("busqueda")
if (localStorage.getItem('Citas')) {
    citas = JSON.parse(localStorage.getItem('Citas'));
}


const capturarDatos = () =>{
    let nombre = document.getElementById("nombre").value
    let fecha = document.getElementById("fecha").value
    let hora= document.getElementById("hora").value
    let sintomas = document.getElementById("sintomas").value
    let registro = {
        nombre,
        fecha,
        hora,
        sintomas
    }
    swal.fire({
        title: '¿Quieres guardar cambios?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        denyButtonText: `No guardar`,
    }).then((result) => {
    if (result.isConfirmed) {
        swal.fire('Agenda guardada!', '', 'success')
        citas.unshift(registro)
        localStorage.setItem('Citas', JSON.stringify(citas))
        pintarDatos();
    } else if (result.isDenied) {
        swal.fire('No se guardaron', '', 'info')
    }
    })
    form.reset()
}

form.addEventListener('submit', e =>{
    e.preventDefault()
    capturarDatos()
})

const pintarDatos = () =>{
    let citasLocalStorage = JSON.parse(localStorage.getItem('Citas'))

    listarCitas.innerHTML = ""
    citasLocalStorage.map((cita) =>{
        const {nombre, fecha, hora, sintomas} = cita;
        listarCitas.innerHTML+=`
        <tr>
            <td>${nombre}</td>
            <td>${fecha}</td>
            <td>${hora}</td>
            <td>${sintomas}</td>
        </tr>
        `
    })
}
document.addEventListener('DOMContentLoaded', pintarDatos())

buscar.addEventListener('click', e =>{
    e.preventDefault()
    let input = document.getElementById('inputBuscar').value;
    let data = JSON.parse(localStorage.getItem('Citas'))
    let filtro = data.filter(cita => cita.nombre.toLowerCase() === input.toLowerCase())
    filtro.length === 0 
    ?
        busqueda.innerText += `
            <div style="color: white;">El nombre ${input} no existe</div>
        `
    :
    filtro.map((cita)=>{
        const {nombre, fecha, hora, sintomas} = cita
        busqueda.innerHTML = `
        <table class="table" style="background-color: white;">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Sintomas</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <td>${nombre}</td>
                    <td>${fecha}</td>
                    <td>${hora}</td>
                    <td>${sintomas}</td>
                    <td>
                    <button id="borrar"class="btn btn-danger">Borrar</button>
                    </td>
                </tr>
                </tbody>
            </table>
            `
            let borrar = document.getElementById("borrar")
            borrar.addEventListener('click', e =>{
                e.preventDefault()
                let elemento = JSON.parse(localStorage.getItem('Citas'))
                let borarElemento = elemento.findIndex(element =>element.nombre === input)
                
                 elemento.splice(borarElemento, 1)
                 localStorage.setItem('Citas', JSON.stringify(elemento))
                 pintarDatos();
                 swal.fire({
                     position: 'top-center',
                     icon: 'success',
                     title: 'Se ha borrado exitosamente',
                     showConfirmButton: false,
                     timer: 1500
                   })

            })
            
        })
    })