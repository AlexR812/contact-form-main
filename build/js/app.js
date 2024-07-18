const opciones_radio = document.querySelectorAll(".opcion");
const radiomarks = document.querySelectorAll(".radiomark");

const nombre =  document.querySelector("#nombre");
const apellido = document.querySelector("#apellido");
const email = document.querySelector("#email");
const textA = document.querySelector("#areatexto");
const check = document.querySelector("#check");
const formulario = document.querySelector(".formulario");

opciones_radio.forEach(opcion => opcion.addEventListener("click", seleccion));
radiomarks.forEach(radiom => radiom.addEventListener("click", seleccion));

const datos = {
    nombre: "",
    apellido: "",
    email: "",
    opSeleccionado: false,
    areatexto: "",
    check: false
}

nombre.addEventListener("input", leerCampos);
apellido.addEventListener("input", leerCampos);
email.addEventListener("input", leerCampos);
textA.addEventListener("input", leerCampos);
check.addEventListener("click", leerCheck);
formulario.addEventListener("submit", validarCampos);

function leerCampos(e) {
    e.preventDefault();
    console.log(e);
    datos[e.target.id] = e.target.value;
}

function leerCheck(e) {
    datos[e.target.id] = e.target.checked;
}

function seleccion(e) {
    e.preventDefault();
    console.log(e);
    activar(e.target.innerText);
}

function activar(opcion) {
    const opciones = document.querySelectorAll(".opcion");
    const radio = document.querySelector(`input[value][type="radio"]:is([value="${opcion}"])`);

    opciones.forEach(opcionAct => {
        if(opcionAct.innerText == opcion) {
            if(!opcionAct.classList.contains("activo")) {
                opcionAct.classList.add("activo")
                radio.checked=true;
                datos["opSeleccionado"] = radio.checked;
            } 
        } else {
            opcionAct.classList.remove("activo")
        }
    })
}

function validarCampos(e) {
    e.preventDefault();
    click = true
    const {nombre, apellido, email, opSeleccionado, areatexto, check} = datos;
    console.log(check);
    if(nombre != "" && apellido != "" && email != "" && opSeleccionado == true && areatexto != "" && check == true) {
        eliminarError("todos");
        validarEmail(email);
    } else {
        if (nombre == "") {
            mostrarError("This field is required.", "nombre");
        } else {
            eliminarError("nombre")
        }

        if (apellido == "") {
            mostrarError("This field is required.", "apellido");
        } else {
            eliminarError("apellido")
        }

        if (email == "") {
            mostrarError("This field is required.", "email");
        } else {
            eliminarError("email")
            validarEmail(email);
        }

        if(opSeleccionado == false) {
            mostrarError("Please select a query type.", "query");
        }

        if(areatexto == "") {
            mostrarError("This field is required.", "area")
        }

        if (check == false) {
            mostrarError("To submit this form, please consent to being contacted.", "check");
        } else {
            eliminarError("password")
        }
    }
}

function mostrarError(mensaje, campo) {  
    const boton = document.querySelector(".submit");
    boton.disabled = true;
    const texto = document.createElement("P");
    const espacioMsj = document.querySelector(`.mensaje-${campo}`);

    texto.textContent = mensaje;
    texto.classList.add("error");
    texto.contains(texto);
    espacioMsj.appendChild(texto);

    nombre.classList.add("fade-out");
    apellido.classList.add("fade-out");
    email.classList.add("fade-out");

    if (campo == "nombre") {
    
        nombre.classList.add("campo-error");
        nombre.classList.remove("campo-validado");
        
    }

    if (campo == "apellido") {
        
        apellido.classList.add("campo-error");
        apellido.classList.remove("campo-validado");
        
    }

    if (campo == "email") {

        email.classList.add("campo-error");
        email.classList.remove("campo-validado");
        
        
    }

    if(campo == "area") {
        textA.classList.add("campo-error");
        textA.classList.remove("campo-validado");
    }

    //Elimina el mensaje despues de 4 segundos
    setTimeout(() => {

        texto?.remove();

        boton.disabled = false;

    }, 4000);
}

function eliminarError(campo) {
    
    if (campo == "nombre") {
        nombre.classList.remove("campo-error");
        nombre.classList.add("campo-validado");
    }
    
    if (campo == "apellido") {
        apellido.classList.remove("campo-error");
        apellido.classList.add("campo-validado");
    }
    
    if (campo == "email") {
        email.classList.remove("campo-error");
        email.classList.add("campo-validado");
        
    }

    if (campo == "area") {
        textA.classList.remove("campo-error");
        textA.classList.add("campo-validado");
        
    }

    if(campo == "todos") {
        nombre.classList.remove("campo-error");
        nombre.classList.add("campo-validado");
        apellido.classList.remove("campo-error");
        apellido.classList.add("campo-validado");
        email.classList.remove("campo-error");
        email.classList.add("campo-validado");
        textA.classList.remove("campo-error");
        textA.classList.add("campo-validado");
    }

}

function validarEmail(email) {
    const re = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    let bandera = re.exec(email);
    if(!bandera) {
        mostrarError("Please enter a valid email address.", "email");
    } else {
        eliminarError("email")
    }
}