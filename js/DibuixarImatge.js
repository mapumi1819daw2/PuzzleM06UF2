
var foto = {
    width: 0,
    height : 0,
};

// 3 -> 3 x 3
// 4 -> 4 x 4
var dimensionsPuzzle  = 3;

var img = [];

function retallaFoto(c){

    var fragment = {
        width : foto.width/dimensionsPuzzle,
        height : foto.height/dimensionsPuzzle,
    };

    var widthActual = 0;
    var heightActual = 0;
   

   /*  var cont = 0; */
    
    var ample = fragment.width;
    var alt = fragment.height;
    console.log("foto "+foto.width);

    for(var i =0; i < dimensionsPuzzle*dimensionsPuzzle; i++){
  
        img.push(c.getImageData(widthActual, heightActual, ample, alt));
          
        console.log("widthActual "+widthActual);
        console.log("heightActual "+heightActual);
        console.log("ample "+ample);
        console.log("alt "+alt);
        console.log("Salt  ");

            widthActual+= ample;
           /*  ample+= fragment.width; */
            
            if(widthActual >= foto.width){
                ample = fragment.width;
                alt+= fragment.height;
                widthActual = 0;
                heightActual += fragment.height;

            }          
      
    }

    c.putImageData(img[6], 0, 700);

    console.log(img);
    

}


function dibuixa(imatge){
    var canvas = document.getElementById("foto");
    canvas.style.border = "1px solid black";
    var ctx = canvas.getContext("2d");
    ctx.drawImage(imatge, 0,0);
   
    foto.width = imatge.width;
    foto.height = imatge.height;

    retallaFoto(ctx);

    console.log(foto);
}

function carregaImatge(){
    var imatge = new Image();
    imatge.src="img/NY.jpg";
    imatge.crossOrigin = "Anonymous";
    
    imatge.onload = function (){
        dibuixa(imatge);
    }
}

carregaImatge();
