import { initializeApp} from 'https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js'
import { getFirestore, collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js"

const firebaseConfig = {
  apiKey: "AIzaSyDyddSabQ2RRRVLfiB9payipTqj1tQaf_g",
  authDomain: "artes-y-cosas.firebaseapp.com",
  projectId: "artes-y-cosas",
  storageBucket: "artes-y-cosas.appspot.com",
  messagingSenderId: "37871471430",
  appId: "1:37871471430:web:4b8894d122e065caeb7347",
  measurementId: "G-GYR4MK3P6B"
};
const app = initializeApp(firebaseConfig);
//Call the data base with the function getFirestore
const db = getFirestore()
//Function to add clients 
export const addData = (table, id, nombre, correo, telefono) =>{
  addDoc(collection(db, table), {id,nombre,correo,telefono})
}
export const addDataP = (table, id, nombre, cantidad, precio) =>{
  addDoc(collection(db, table), {id,nombre,cantidad,precio})
}
export const queryData = (table, callback) =>{
   return onSnapshot(collection(db, table), callback)
}
export const deleteData = (table, id) =>{
  deleteDoc(doc (db,table, id))
}
export const updateData = (table, id, newFields) =>{
updateDoc(doc(db, table, id), newFields)
}