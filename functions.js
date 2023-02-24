export const validarVacio = (campo) => { //--> Funcion para validar que los campos del formulario no esten vacios
    if (campo.value != "" && campo.value != null){
        return true
    }else{
        campo.classList.add('objeto-no-existe')
        setTimeout(()=>{
            campo.classList.remove('objeto-no-existe')
        }, 2000)
        return false
    }
}
export const validarCorreo = (campo) =>{ //--> Funcion para validar que el correo contenga los caracteres que conforman un dominio de correo
    if (campo.value.includes('@') && campo.value.includes('.com' || campo.value.includes('.es') || campo.value.includes('.co'))){
        return true
    }else{
        return false
    }
}
export const irSeccion = (seccion, add1, add2, add3, add4) =>{ //--> funcion para agregar atributos de estilo
    seccion.classList.remove('invisible')
    add1.classList.add('invisible')
    add2.classList.add('invisible')
    add3.classList.add('invisible')
    add4.classList.add('invisible')
}