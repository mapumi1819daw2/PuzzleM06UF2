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