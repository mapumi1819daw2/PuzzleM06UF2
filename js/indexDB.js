var a = "";
const DB_VERSION = 19;

window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {
    READ_WRITE: "readwrite"
};
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

//la petició d'obertura no crea la DB, retorna de manera asíncrona un IDBOpenDBRequest, amb un objecte exit o error.
var peticioObertura = window.indexedDB.open("puzzle", DB_VERSION);

var db;

const jugadors = [
    { nom: "Marc", temps: 40 },
 ];

peticioObertura.onerror = function(event) {
    console.log("error: ");
 };
 
 peticioObertura.onsuccess = function(event) {
    db = peticioObertura.result;
    console.log("success: "+ db);
 };
 
 peticioObertura.onupgradeneeded = function(event) {
     console.log("Onupgraded")
    var db = event.target.result;
    var objectStore = db.createObjectStore("jugadors", {keyPath: "nom"});
    objectStore.add(jugadors[0]);
   
 }  


function desar(){
    var magatzemObjsAlumnes = db.transaction(["jugadors"], "readwrite").objectStore("jugadors").
    add({nom: a, temps: 20});

    magatzemObjsAlumnes.onsuccess = function(event) {
        /* db = magatzemObjsAlumnes.result; */
        alert("Fet!.");
     };
     
     magatzemObjsAlumnes.onerror = function(event) {
        alert("Nooooo! ");
     }
}


$(function(){
    $("#Submit").on("click", function (){
        a = document.getElementById('nom').value;
        desar();
    });
});

/* 
function consulta(){

    emmagatzematge.desar();
    
} */