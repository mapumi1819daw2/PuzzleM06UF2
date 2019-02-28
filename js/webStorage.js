console.log("web storage ss");
var emmagatzematge = {
    desar : function(){
        alert("a");
        localStorage.setItem(document.getElementById(nom).value);
    }
};

console.log("web storage");
document.getElementById("Submit").addEventListener("click", emmagatzematge.desar, false);