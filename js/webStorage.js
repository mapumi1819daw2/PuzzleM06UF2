var nom = "";
var trobat = false;

var emmagatzematge = {
    desar : function(){
        localStorage.setItem(nom, 0);
    },

    verfica : function (){
        for(var i = 0; i< localStorage.length; i++){
            console.log(localStorage.key(i));
            if(localStorage.key(i)==nom){
                trobat = true;
            }
        }
    }
};



function mostrar(){
    var taula = document.getElementById("taula");
    for (var i = 0; i < localStorage.length; i++) {
        var fila = taula.insertRow(0);
        fila.insertCell(0).innerHTML = localStorage.key(i);
        fila.insertCell(1).innerHTML = localStorage.getItem(localStorage.key(i));
    };
}




function anarDesar(){
    nom = document.getElementById("nom").value;
    
    emmagatzematge.verfica();


    console.log(trobat);
    
    
    if(trobat){
        alert(nom + " ja existeix!");
    }
    else{
        emmagatzematge.desar();
    }

    trobat = false;
} 