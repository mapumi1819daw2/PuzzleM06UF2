const DB_VERSION = 19;

window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {
    READ_WRITE: "readwrite"
};
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

//la petició d'obertura no crea la DB, retorna de manera asíncrona un IDBOpenDBRequest, amb un objecte exit o error.
var peticioObertura = window.indexedDB.open("puzzle", DB_VERSION);

var db;

peticioObertura.onerror = function(event) {
    console.log("error: ");
 };
 
 peticioObertura.onsuccess = function(event) {
    db = peticioObertura.result;
    console.log("success: "+ db);
 };
 
 peticioObertura.onupgradeneeded = function(event) {
    var db = event.target.result;
    var objectStore = db.createObjectStore("jugadors", {keyPath: "id"});
    
   
 }

var emmagatzematge = {
    
    desar: function () {
        var magatzemObjsAlumnes = db.transaction("jugadors", "readwrite").objectStore("jugadors");
        var jugador = {
            nom: document.getElementById('nom').value
        };

        magatzemObjsAlumnes.add(jugador);

        magatzemObjsAlumnes.onsuccess = function(event) {
            db = request.result;
            alert("Fet!.");
         };
         
         magatzemObjsAlumnes.onerror = function(event) {
            alert("Nooooo! ");
         }
        

    },
    mostrar: function (magatzemObjsAlumnes) {
        /* magatzemObjsAlumnes.openCursor().onsuccess = function (event) {
            var cursor = event.target.result;
            if (cursor) {
                var fila = taula.insertRow(0);
                fila.insertCell(0).innerHTML = cursor.key;
                fila.insertCell(1).innerHTML = cursor.value.nota;
                cursor.continue();
            }
        }; */

    },
    
    
}





function consulta(){

    emmagatzematge.desar();
    
}