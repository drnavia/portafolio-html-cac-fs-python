// Obtener el formulario de contacto
const formulario = document.getElementById('form');

// Obtener todos los inputs que están dentro del formulario
const inputs = document.querySelectorAll('#form input');

// Almacenar expresiones regulares
const expReg = {
	nombre:   /^[a-zA-ZÀ-ÿ\s]{4,16}$/,      // Letras y espacios, pueden llevar acentos.
    apellido: /^[a-zA-ZÀ-ÿ\s]{4,20}$/,      // Letras y espacios, pueden llevar acentos.
	correo:   /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,  // Formato para correo
	telefono: /^\d{7,10}$/                  // De 7 a 14 numeros.
}

const campos = {
    nombre:   false,
    apellido: false,
    correo:   false,
    telefono: false
}

// Funcion para validar el formulario
const validarFormulario = (e) => {
    switch (e.target.name) {
        case "nombre":
            validarCampo(expReg.nombre, e.target, 'nombre');
        break;

        case "apellido":
            validarCampo(expReg.apellido, e.target, 'apellido');
        break;

        case "correo":
            validarCampo(expReg.correo, e.target, 'correo');
        break;
        
        case "telefono":
            validarCampo(expReg.telefono, e.target, 'telefono');
        break;
    }
}

// Funcion para validadr los campos
const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`grupo__${campo}`).classList.remove('form__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('form__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__${campo} .form__input-error`).classList.remove('form__input-error-activo');
        campos[campo] = true;
    } else {
        document.getElementById(`grupo__${campo}`).classList.add('form__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('form__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__${campo} .form__input-error`).classList.add('form__input-error-activo');
        campos[campo] = false;
    }
}

// Ejecutar por cada input
inputs.forEach( (input) => {
    // 1) Escuchar cuando el usuario presiona y suelta una tecla, y valida el formulario
    input.addEventListener('keyup', validarFormulario);
    // 2) Escuchar cuando el usuario sale de foco, y valida el formulario
    input.addEventListener('blur', validarFormulario);
    // 3) Configuramos como pasivo el evento "touchstart" para mejorar el rendimiento del desplazamiento.
    input.addEventListener('touchstart', validarFormulario, {passive: true});
})

// Escuchar cuando el usuario presiona el boton [enviar]
formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const terminos = document.getElementById('terminos');

    if (campos.nombre && campos.apellido && campos.correo && campos.telefono && terminos.checked) {
        formulario.reset();

        document.getElementById('form__mensaje-exito').classList.add('form__mensaje-exito-activo');
        setTimeout(() =>{
            document.getElementById('form__mensaje-exito').classList.remove('form__mensaje-exito-activo');
        }, 5000)

        document.querySelectorAll('.form__grupo-correcto').forEach((icono) => {
            icono.classList.remove('form__grupo-correcto')
        })
    } else {
        document.getElementById('form__mensaje').classList.add('form__mensaje-activo');
        setTimeout(() =>{
            document.getElementById('form__mensaje').classList.remove('form__mensaje-activo');
        }, 3000)
    }
})

// Escuchar cuando el usuario presiona el boton [borrar]
formulario.addEventListener('reset', (e) => {
    
    document.querySelectorAll('.form__grupo-correcto').forEach((icono) => {
        icono.classList.remove('form__grupo-correcto')
    })
    document.querySelectorAll('.form__grupo-incorrecto').forEach((icono) => {
        icono.classList.remove('form__grupo-incorrecto')
    })
    document.querySelector(`#grupo__nombre .form__input-error`).classList.remove('form__input-error-activo');
    document.querySelector(`#grupo__apellido .form__input-error`).classList.remove('form__input-error-activo');
    document.querySelector(`#grupo__correo .form__input-error`).classList.remove('form__input-error-activo');
    document.querySelector(`#grupo__telefono .form__input-error`).classList.remove('form__input-error-activo');
})