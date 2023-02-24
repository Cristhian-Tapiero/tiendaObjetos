import { addData, addDataP,  queryData, deleteData, updateData} from "./firebase.js" //--> Importamos las funciones que definimos con firebase
import {irSeccion, validarCorreo, validarVacio} from './functions.js'
import {clientForm, productForm, factuForm, queryForm, editForm,deleteForm, textoDelete, goCliente,goProduct,goFactu,goEdit,goDelete, botonDelete} from './constantes.js' // --> Importamos las funciones para limpiar codigo DOM
//DOM
let esProducto = false
let idObjetivo, objetivoDelete;
//Llamamos a todos nuestros elementos del DOM
clientForm.addEventListener('submit', (e)=>{ //Escuchamos cuando el user envie el formulario de registro de cliente, enviamos a la BD y desocupamos los campos
    e.preventDefault()
    if(validarVacio(clientForm['id-cliente']) && validarVacio(clientForm['nom-cliente']) && validarVacio(clientForm['tel-cliente']) && validarVacio(clientForm['correo-cliente'])){
        if(validarCorreo(clientForm['correo-cliente'])){
            addData('Clients',clientForm['id-cliente'].value,clientForm['nom-cliente'].value, clientForm['correo-cliente'].value, clientForm['tel-cliente'].value)
            clientForm.reset()
        }else{
            console.log('Esto no es un correo');
        }
    }else{
        console.log("Campos vacios");
    }
})
productForm.addEventListener('submit', (e)=>{ //Escuchamos cuando el user envie el formulario de registro de productos, enviamos a la BD y desocupamos todos los campos
    e.preventDefault()
    if(validarVacio(productForm['id-product']) && validarVacio(productForm['nom-product']) && validarVacio(productForm['price-product']) && validarVacio(productForm['cant-product'])){
        addDataP('Products', productForm['id-product'].value, productForm['nom-product'].value, productForm['cant-product'].value, productForm['price-product'].value)
        productForm.reset()
    }else{
        console.log("Campos vacios");
    }  
})
factuForm.addEventListener('submit', (e)=>{ //NOTA v1.0.0: Para futuras versiones, agregar una pantalla de impresion para conectar con una impresora y que permita visualizar los datos relevantes de la compra
    e.preventDefault()
    console.log('Proximamente');
    //Simula los datos que va a traer de la factura de compra
})
queryForm.addEventListener('submit', e=>{
    e.preventDefault()
    if(document.getElementById('option-select').value == 'cliente'){
        editForm.innerHTML = `
        <input type="number" class="input-area" placeholder="Identificacion del cliente" id="id-cliente-edit">
        <input type="text" class="input-area" placeholder="Nombre del cliente" id="nom-cliente-edit">
        <input type="number" class="input-area" placeholder="Telefono del cliente" id="tel-cliente-edit">
        <input type="text" class="input-area" placeholder="Correo del cliente" id="correo-cliente-edit">
        <button class="submit-button">Editar</button>`
        queryData('Clients', querySnapshot =>{
            querySnapshot.forEach((doc) =>{
                if(doc.data().id == queryForm['query-id'].value){
                    idObjetivo = doc.id
                    editForm['id-cliente-edit'].value = doc.data().id
                    editForm['nom-cliente-edit'].value = doc.data().nombre
                    editForm['tel-cliente-edit'].value = doc.data().telefono
                    editForm['correo-cliente-edit'].value = doc.data().correo
                }
            })
        })
        esProducto = false
    }else{
        editForm.innerHTML = `
        <input type="number" class="input-area" placeholder="Codigo del producto" id="id-product-edit">
        <input type="text" class="input-area" placeholder="Nombre del producto" id="nom-product-edit">
        <input type="number" class="input-area" placeholder="Precio del producto" id="price-product-edit">
        <input type="number" class="input-area" placeholder="Cantidad del producto" id="cant-product-edit">
        <button class="submit-button">Editar</button>`
        queryData('Products', querySnapshot =>{
            querySnapshot.forEach((doc) =>{
                if(doc.data().id == queryForm['query-id'].value){
                    idObjetivo = doc.id
                    editForm['id-product-edit'].value = doc.data().id
                    editForm['nom-product-edit'].value = doc.data().nombre
                    editForm['price-product-edit'].value = doc.data().precio
                    editForm['cant-product-edit'].value = doc.data().cantidad
                }
            })
        })
        esProducto = true
    }
})
editForm.addEventListener('submit', e=>{
    e.preventDefault()
    if(esProducto){
        updateData('Products', idObjetivo, { id: editForm['id-product-edit'].value, nombre: editForm['nom-product-edit'].value, precio: editForm['price-product-edit'].value,cantidad: editForm['cant-product-edit'].value})
    }else{
        updateData('Clients', idObjetivo, { id: editForm['id-cliente-edit'].value, nombre: editForm['nom-cliente-edit'].value, correo: editForm['correo-cliente-edit'].value,telefono: editForm['tel-cliente-edit'].value})
    }
    editForm.reset()
    queryForm.reset()
})
deleteForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    if(document.getElementById('option-select-delete').value == 'cliente'){
        queryData('Clients', querySnapshot =>{
            querySnapshot.forEach((doc) =>{
                if(doc.data().id == deleteForm['seek-and-destroy'].value){
                    objetivoDelete = doc.id
                    textoDelete.innerHTML = `<h1>Id del cliente: ${doc.data().id}</h1>
                    <h1>Nombre del cliente: ${doc.data().nombre}</h1>
                    <h1>Correo del cliente: ${doc.data().correo}</h1>
                    <h1>Telefono del cliente: ${doc.data().telefono}</h1>`
                    botonDelete.disabled = false
                }
            })
        })
        esProducto = false
    }else{
        queryData('Products', querySnapshot =>{
            querySnapshot.forEach((doc) =>{
                if(doc.data().id == deleteForm['seek-and-destroy'].value){
                    objetivoDelete = doc.id
                    textoDelete.innerHTML = `<h1>Id del producto: ${doc.data().id}</h1>
                    <h1>Nombre del producto: ${doc.data().nombre}</h1>
                    <h1>Cantidad del producto: ${doc.data().cantidad}</h1>
                    <h1>Precio del producto: ${doc.data().precio}</h1>`
                    botonDelete.disabled = false
                }
            })
        })
        esProducto = true
    }
})
botonDelete.addEventListener('click', ()=>{
    if(esProducto){
        deleteData('Products', objetivoDelete)
        alert('Producto borrado exitosamente')
    }else{
        deleteData('Clients', objetivoDelete)
        alert('Cliente borrado exitosamente')
    }
    deleteForm.reset()
    botonDelete.disabled = true
    textoDelete.innerHTML = ''
})
//Escucha de eventos para cambiar las paginas sin lazy-load
goCliente.addEventListener('click', () => irSeccion(document.getElementById('client-form-area'),document.getElementById('product-form-area'),document.getElementById('factu-form-area'), document.getElementById('query-form-area'), document.getElementById('delete-form-area')))
goProduct.addEventListener('click', () => irSeccion(document.getElementById('product-form-area'),document.getElementById('client-form-area'),document.getElementById('factu-form-area'), document.getElementById('query-form-area'), document.getElementById('delete-form-area')))
goFactu.addEventListener('click', () => irSeccion(document.getElementById('factu-form-area'),document.getElementById('client-form-area'),document.getElementById('product-form-area'), document.getElementById('query-form-area'), document.getElementById('delete-form-area')))
goEdit.addEventListener('click', () => irSeccion(document.getElementById('query-form-area'), document.getElementById('client-form-area'),document.getElementById('product-form-area'),document.getElementById('factu-form-area'), document.getElementById('delete-form-area')))
goDelete.addEventListener('click', () => irSeccion(document.getElementById('delete-form-area'),document.getElementById('query-form-area'), document.getElementById('client-form-area'),document.getElementById('product-form-area'), document.getElementById('factu-form-area')))