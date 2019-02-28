var nom = "";
var trobat = false;

var emmagatzematge = {
    desar : function(){
        localStorage.setItem(document.getElementById("nom").value, 0);
    },

    verfica : function(){
        for(var i = 0; i< localStorage.length; i++){
            console.log(localStorage.key(i));
            if(localStorage.key(i)==nom){
                trobat = true;
            }
        }
    },
};



function anarDesar(){
    nom = document.getElementById("nom").value;
    emmagatzematge.desar();
    emmagatzematge.verifica();
    alert(trobat);
} 