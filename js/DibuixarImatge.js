var foto = {
    width: 0,
    height: 0,
};

// 3 -> 3 x 3
// 4 -> 4 x 4
var dimensionsPuzzle = 3;

var img = [];

$(function () {

    /* DND */
    var canves= document.querySelectorAll("canvas");

    [].forEach.call(canves, function (item){
        item.addEventListener('dragstart', gestionaIniciDrag, false);
    });

    function gestionaIniciDrag (d){
        d.dataTransfer.setData("c", d.target.id);
    }

    /* Funció que pinta cada canvas */
    function DibuixaNousCanvas(id) {

        var canvas = document.createElement("canvas");
        canvas.setAttribute("id", id);
        canvas.setAttribute("draggable", "true");
        canvas.style.border = "1px solid black";
        document.body.appendChild(canvas);

        var ctx = canvas.getContext("2d");
        ctx.putImageData(img[id], 0, 0);


    }


    /* Funció que mostra les peces del puzle */
    function dibuixaPuzzle() {

        var cont = 0;
        for (var i = 0; i < dimensionsPuzzle * dimensionsPuzzle; i++) {
            DibuixaNousCanvas(i);

            cont++;

            console.log(cont);

            if(cont==3){
                var br = document.createElement("BR");
                document.body.appendChild(br);
                cont = 0;
            }

        }

    }

    /* Funció que esborra el canvas inicial */
    function esborraCanvasInicial() {
        $("#foto").attr("hidden", true);
    }


    function retallaFoto(c) {

        var fragment = {
            width: foto.width / dimensionsPuzzle,
            height: foto.height / dimensionsPuzzle,
        };

        var widthActual = 0;
        var heightActual = 0;


        /*  var cont = 0; */

        var ample = fragment.width;
        var alt = fragment.height;
        console.log("foto " + foto.width);

        for (var i = 0; i < dimensionsPuzzle * dimensionsPuzzle; i++) {

            img.push(c.getImageData(widthActual, heightActual, ample, alt));

            console.log("widthActual " + widthActual);
            console.log("heightActual " + heightActual);
            console.log("ample " + ample);
            console.log("alt " + alt);
            console.log("Salt  ");

            widthActual += ample;
            /*  ample+= fragment.width; */

            if (widthActual >= foto.width) {
                ample = fragment.width;
                alt += fragment.height;
                widthActual = 0;
                heightActual += fragment.height;

            }

        }

        c.putImageData(img[6], 0, 700);

        esborraCanvasInicial();

        dibuixaPuzzle();



        console.log(img);


    }


    function dibuixa(imatge) {
        var canvas = document.getElementById("foto");
        canvas.style.border = "1px solid black";
        var ctx = canvas.getContext("2d");
        ctx.drawImage(imatge, 0, 0);

        foto.width = imatge.width;
        foto.height = imatge.height;

        retallaFoto(ctx);

        console.log(foto);
    }

    function carregaImatge() {
        var imatge = new Image();
        imatge.src = "img/NY.jpg";
        imatge.crossOrigin = "Anonymous";

        imatge.onload = function () {
            dibuixa(imatge);
        }
    }

    carregaImatge();


});