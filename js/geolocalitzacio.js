var ubi = null;

function aRadians(graus) {
    return graus * Math.PI / 180;
}

function distancia(latitud1, longitud1, latitud2, longitud2) {
    // R radi en km de la terra
    var R = 6371;
    var deltaLatitud = aRadians(latitud2 - latitud1);
    var deltaLongitud = aRadians(longitud2 - longitud1);
    latitud1 = aRadians(latitud1);
    latitud2 = aRadians(latitud2);
    var a = Math.sin(deltaLatitud / 2) * Math.sin(deltaLatitud / 2) +
        Math.cos(latitud1) * Math.cos(latitud2) *
        Math.sin(deltaLongitud / 2) *
        Math.sin(deltaLongitud / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
}

var NY = [40.7143528, -74.0059731];
var Paris = [48.856614, 2.3522219];
var Tokio = [35.6894875, 139.6917064];


/* Calculca la posició actual */
navigator.geolocation.getCurrentPosition(function (posicio) {
    mostraUbiMesPropera(posicio.coords.latitude, posicio.coords.longitude);
});



function error(err) {
    alert("problemes amb geolocalització"

        +
        err.message);

}


/* Ens mostra la ubicació */
function mostraUbiMesPropera(lat, lon){
    console.log("Lat "+lat);
    console.log("Lon "+lon);



    var d = distancia(lat, lon, NY[0], NY[1]);
    console.log("Distancia 1 "+d);
    var d1 = distancia(lat, lon, Paris[0], Paris[1]);
    console.log("Distancia 2 "+d1);
    var d2 = distancia(lat, lon, Tokio[0], Tokio[1]);
    console.log("Distancia 3 "+d2);


  
    if(d < d1){
        ubi = d;
        if(d<d2){
            ubi = "NY";
        }
        else{
            ubi = "Tokio";
        }
    }
    else if (d1<d2){

        ubi = "Paris";
        
    }

    else{
        ubi = "Tokio";
    }


    return ubi;
    
}