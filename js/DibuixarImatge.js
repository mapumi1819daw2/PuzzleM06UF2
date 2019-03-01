var foto = {
    width: 0,
    height: 0,
};


var ordre = [];

var enBlanc = 0;

var cont = 0;

// 3 -> 3 x 3
// 4 -> 4 x 4
var dimensionsPuzzle = 3;

var qFitxes = dimensionsPuzzle*dimensionsPuzzle;

var img = [];


var fragment = {
    width: 0,
    height: 0,
};

var dataInicial = {
    horaInicial: 0,
    minutsInicial: 0,
    segonsInicial: 0,
};


var minuts = 0;
var moviments = 0;

$(function () {


    /* Obtenim l'hora inicial */
    var date = new Date();
    dataInicial.horaInicial = date.getHours();
    dataInicial.minutsInicial = date.getMinutes();
    dataInicial.segonsInicial = date.getSeconds();

    console.log("Hora inicial " + dataInicial.horaInicial + ":" + dataInicial.minutsInicial);

    function DND() {


        /* DND */
        var canves = document.querySelectorAll("canvas");

        [].forEach.call(canves, function (item) {
            item.addEventListener('dragstart', gestionaIniciDrag, false);
            item.addEventListener('dragover', gestionaSobreDrag, false);
            item.addEventListener('drop', gestionarDrop, false);
            item.addEventListener('dragend', gestionarDragEnd, false);
        });



        /* Conta les fitxes a la seva posició */

        function verificaPuzzle() {
            ordre.forEach(myFunction);
            function myFunction(value, index, array) {
                if (index == value) {
                    cont++;
                }
            }

            console.log("cont " + cont);

            if (cont == qFitxes ) {

                $( "canvas" ).each(function( index ) {
                    var pos = $( this ).attr("pos");
                    if(pos==enBlanc){
                        var id = $(this).attr("id");
                        console.log("id : "+id);
                        var canvas = document.getElementById(id);

                        var ctx = canvas.getContext("2d");
                        var lloc = ordre.indexOf(enBlanc);
                        ctx.putImageData(img[lloc], 0, 0);
                    }
                    
                  });

                calculaTemps();

            }

            cont = 0;
        }

        /* Funció que desa la posició de les fitxes a l'array ordre[] */
        function desaPosicioDeFitxaA_Array(idA, idB, canvasA, canvasB) {

            /* Agafem la posicio de cada fitxa */
            
            var posA = ordre.indexOf(canvasA*1);

            var posB = ordre.indexOf(canvasB*1);

            /* Invertim l'ordre */
            ordre[posA] = canvasB*1;
            console.log("[posA] " + posA);
            console.log("ordre[posA] " + ordre[posA]);
            ordre[posB] = canvasA*1;
            console.log(ordre);
        }


        /* Funció que calcula el temps trigat a completar el puzzle */
        function calculaTemps() {

            var novaData = new Date();
            var horaFinal = novaData.getHours();
            var minutFinal = novaData.getMinutes();
            var segonsFinal = novaData.getSeconds();

            minuts = minutFinal - dataInicial.minutsInicial;
            segons = segonsFinal - dataInicial.segonsInicial;

            if (minuts == 0) {
                $("#temps").text(segons + " segons");
            }
            else {
                $("#temps").text(minuts + " minuts i " + segons);
            }

            $("#final").text("Partida acabada!");

        }

        /* Mostra la quantitat de moviments */
        function gestorMarcador() {
            moviments++;

            $("#mov").text(moviments);
        }

        function getDocument(id) {
            return document.getElementById(id);
        }

        function getContext(canvas) {
            return canvas.getContext("2d");
        }

        function getImage(ctx) {
            return ctx.getImageData(0, 0, fragment.width, fragment.height);
        }

        /* Funció que canvia les imatges entre dos canvas */
        function swipeCanvas(imageA, ctxA, imageB, ctxB) {
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
            var ctxB = getContext(canvasB);
            var imatgeB = getImage(ctxB);


            swipeCanvas(imatgeA, ctxA, imatgeB, ctxB);

            var idA = data * 1;
            var idB = event.target.id * 1;

           
            /* Anem assignant els valors de les noves posicions */
            var posA = $("#"+idA).attr("pos");
            var posB = $("#"+idB).attr("pos");


            $("#"+idA).attr("pos", posB);
            $("#"+idB).attr("pos", posA);


            

            desaPosicioDeFitxaA_Array(idA, idB, posA, posB);



        }

        function gestionarDragEnd(event) {
            gestorMarcador();
            verificaPuzzle();


        }
    }



    /* Funció que pinta cada canvas */
    function DibuixaNousCanvas(id) {

        var canvas = document.createElement("canvas");
        canvas.setAttribute("id", ordre[id]);
        canvas.setAttribute("pos", ordre[id]);
        canvas.setAttribute("draggable", "true");
        canvas.setAttribute("width", fragment.width);
        canvas.setAttribute("height", fragment.height);
        canvas.style.border = "1px solid black";

        /* $("#puzzle").after(canvas); */

        var ctx = canvas.getContext("2d");
        if(ordre[id]!=enBlanc){
            ctx.putImageData(img[ordre[id]], 0, 0);
        }
        


        document.getElementById("puzzle").appendChild(canvas);
    }


    /* Funció que mostra les peces del puzle */
    function dibuixaPuzzle() {



        var cont = 0;

        $("#puzzle").css("width", foto.width + 20);

    
        
        var trobat = false;

        var cont = 0;
        var voltes = 0;
        do {
            var aleatori = Math.floor((Math.random() * qFitxes)+0);

            console.log("aleatori "+aleatori);
            
            

            ordre.forEach(myFunction);

            function myFunction(value, index, array) {
                console.log("Funcio "+value);

                if (value == aleatori) {
                    trobat = true;
                    console.log("if "+value);
                }

            }

            if (trobat == false) {                
                ordre.push(aleatori);
                voltes++;
                cont++;
                console.log("If trobat false");
                console.log("Aleatori "+aleatori);
                console.log(ordre);   
            }

            trobat = false;

            

            console.log("cont "+voltes);

            if (cont == 3) {
                var br = document.createElement("BR");
                document.body.appendChild(br);
                cont = 0;
            }




        } while (voltes != qFitxes);

        console.log("Llista");
        console.log(ordre);



        for (var i = 0; i < qFitxes; i++) {
            DibuixaNousCanvas(i);
        }

    

        DND();

    }

    /* Funció que esborra el canvas inicial */
    function esborraCanvasInicial() {
        $("#foto").attr("hidden", true);
    }


    function retallaFoto(c) {
        var widthActual = 0;
        var heightActual = 0;

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

        /* c.putImageData(img[6], 0, 700); */

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
        imatge.src = "img/" + ciutat + ".jpg";
        imatge.crossOrigin = "Anonymous";

        imatge.onload = function () {
            dibuixa(imatge);
        }
    }

    carregaImatge();


});