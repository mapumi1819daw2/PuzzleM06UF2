var foto = {
    width: 0,
    height: 0,
};


var ordre =  [];

// 3 -> 3 x 3
// 4 -> 4 x 4
var dimensionsPuzzle = 3;

var img = [];


var fragment = {
    width: 0,
    height: 0,
};


$(function () {

    function DND() {

        var inici = 0;
        var fi = 0;
        /* DND */
        var canves = document.querySelectorAll("canvas");

        [].forEach.call(canves, function (item) {
            item.addEventListener('dragstart', gestionaIniciDrag, false);
            item.addEventListener('dragover', gestionaSobreDrag, false);
            item.addEventListener('drop', gestionarDrop, false);
        });


        function getDocument(id){
            return document.getElementById(id);
        }

        function getContext(canvas){
            return canvas.getContext("2d");
        }

        function getImage(ctx){
            return ctx.getImageData(0, 0, fragment.width, fragment.height);
        }

        /* Funció que canvia les imatges entre dos canvas */
        function swipeCanvas(imageA, ctxA, imageB, ctxB){
            ctxB.putImageData(imageA, 0, 0);
            ctxA.putImageData(imageB, 0, 0);
        }



        /* Funció que permet a tots els canvas rebre altres canvas amb DND */
        function gestionaSobreDrag(event) {
            event.preventDefault();
        }

        function gestionaIniciDrag(event) {
            //tipus i valor
            event.dataTransfer.setData("image", event.target.id);

            /* c. */

            console.log("Inici: " + event.target.id);
        }

        function gestionarDrop(event) {
            event.preventDefault();


            //La imatge arrossegada
            var data = event.dataTransfer.getData("image");

            
            var canvasA = getDocument(data);
            var ctxA = getContext(canvasA);
            var imatgeA = getImage(ctxA);



            /* Agafem la imatge del canvas B */
           
            var canvasB = getDocument(event.target.id);
            var ctxB =  getContext(canvasB);
            var imatgeB = getImage(ctxB);


            swipeCanvas(imatgeA, ctxA, imatgeB, ctxB);

            var idA = data*1;
            var idB = event.target.id*1;

            ordre[data] = event.target.id;
            ordre[event.target.id] = data;

            console.log(ordre);

        }
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

            /* Establim l'ordre inicial dels canvas */
            ordre[i] = i;

            cont++;

            console.log(cont);

            if (cont == 3) {
                var br = document.createElement("BR");
                document.body.appendChild(br);
                cont = 0;
            }


            

        }

        console.log("ordre :"+ordre);

        DND();

    }

    /* Funció que esborra el canvas inicial */
    function esborraCanvasInicial() {
        $("#foto").attr("hidden", true);
    }


    function retallaFoto(c) {


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


        /* Calculem les dimensions de cada retall d'imatge */
        fragment.width = foto.width / dimensionsPuzzle;
        fragment.height = foto.height / dimensionsPuzzle;

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