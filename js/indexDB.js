const DB_VERSION = 19;

window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {
    READ_WRITE: "readwrite"
};
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

//la petició d'obertura no crea la DB, retorna de manera asíncrona un IDBOpenDBRequest, amb un objecte exit o error.
var peticioObertura = window.indexedDB.open("puzzle", DB_VERSION);

var db;

var emmagatzematge = {
    
    desar: function () {
        var magatzemObjsAlumnes = db.transaction("jugadors", "readwrite").objectStore("jugadors");
        var jugador = {
            'nom': document.getElementById('nom').value
        };

        magatzemObjsAlumnes.add(jugador);
        emmagatzematge.esborrarTaula();
        emmagatzematge.mostrar(magatzemObjsAlumnes);

    },
    mostrar: function (magatzemObjsAlumnes) {
        magatzemObjsAlumnes.openCursor().onsuccess = function (event) {
            var cursor = event.target.result;
            if (cursor) {
                var fila = taula.insertRow(0);
                fila.insertCell(0).innerHTML = cursor.key;
                fila.insertCell(1).innerHTML = cursor.value.nota;
                cursor.continue();
            }
        };

    },
    esborrarTaula: function () {
        while (taula.rows.length > 0) {
            taula.deleteRow(0);
        }
    },
    esborrarItem: function () {
        magatzemObjsAlumnes = db.transaction("alumnes", "readwrite").objectStore("alumnes");
        magatzemObjsAlumnes.delete(document.getElementById('nom').value);
        emmagatzematge.esborrarTaula();
        emmagatzematge.mostrar(magatzemObjsAlumnes);
    },
    netejar: function () {
        emmagatzematge.esborrarTaula();
    }
}


peticioObertura.onerror = function (event) {
    alert("Problema!");
};
peticioObertura.onsuccess = function (event) {
    db = event.target.result;
};
peticioObertura.onupgradeneeded = function (event) {
    var db = event.target.result;
    try {
        db.deleteObjectStore("clients");
        db.deleteObjectStore("noms");
        db.deleteObjectStore("alumnes");

    }
    catch (e) {

    }
    // ObjectStore conté la informació sobre els nostres clients. El codi
    // "SSN" es la ruta de la clau perquè es garanteix que sigui única
    var magatzemObjsClients = db.createObjectStore("clients", {
        keyPath: "ssn"
    });

    // un altre magatzem amb autoIncrement com a key generator
    var magatzemObjsNoms = db.createObjectStore("noms", {
        autoIncrement: true
    });

    //  magatzem amb autoIncrement com a key generator per a les notes dels alumnes
    var magatzemObjsAlumnes = db.createObjectStore("alumnes", {
        keyPath: "nom"
    });

    for (var i in dadesClients) {
        magatzemObjsNoms.add(dadesClients[i].nom);
    }

    // Crear un índex per buscar clients pel seu nom. Podem tenir duplicats
    // Així que no podem utilitzar un índex únic.
    magatzemObjsClients.createIndex("nom", "nom", {
        únic: false
    });

    // Crear un índex per buscar clients per correu electrònic. Volem assegurar-nos que
    // No hi ha dos clients tenen el mateix correu electrònic, per tal d'utilitzar un índex únic.
    magatzemObjsClients.createIndex("email", "email", {
        únic: true
    });

    // Utilitzeu la transacció OnComplete per assegurar-se que la creació és ObjectStore
    // Acabat abans d'afegir dades en ell.
    magatzemObjsClients.transaction.oncomplete = function (event) {
        // Emmagatzemar els valors de la magatzemObjsClients acabat de crear.
        var magatzemObjsClients = db.transaction("clients", "readwrite").objectStore("clients");
        for (var i in dadesClients) {
            console.log(dadesClients[i]);
            var peticio = magatzemObjsClients.add(dadesClients[i]);
        }

        var peticio = magatzemObjsClients.get("123");
        peticio.onerror = function (event) {

        };
        peticio.onsuccess = function (event) {
            console.log("client " + peticio.result.nom);
        };

        magatzemObjsClients.openCursor().onsuccess = function (event) {
            var cursor = event.target.result;
            if (cursor) {
                console.log(cursor.key + " es " + cursor.value.nom);
                cursor.continue();
            }
        };


    };
};


function consulta(){

    emmagatzematge.desar;
    
}