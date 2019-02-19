

$(function () {



    const DB_VERSION = 19;

    /* Es crea una transacció amb permisos de lectura i escriptura */
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {
        READ_WRITE: "readwrite"
    };
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;


    /* Petició d'obertura: ens retorna un  IDBOpenDBRequest amb exit o error */

    var peticioObertura = window.indexedDB.open("DAW2", DB_VERSION);
    var db;

    /* Objecte per gestinar la BD */
    var magatzem = {
        /* Desem un jugador */
        desar: function () {
            var magatzemUsuari = db.transaction("usuaris", "readwrite").objectStore("usuaris");
            var usuari = {
                'nom': document.getElementById('nom').value
            };

            magatzemUsuari.add(usuari);


        },

    }


    peticioObertura.onerror = function (event) {
        alert("Problema!");
    };
    peticioObertura.onsuccess = function (event) {
        db = event.target.result;
    };


    $("#Submit").on("click", function () {
       
        magatzem.desar;
    });
});