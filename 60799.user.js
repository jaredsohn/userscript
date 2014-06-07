// ==UserScript==
// @name            Escolardeprisa
// @namespace       http://jotarp.org/2009/06/proyectos/userscript-para-escolarnet.html
// @description     Script para filtrar comentarios por puntuación en http://escolar.net
// @include         http://escolar.net/MT/archives/*
// @include         http://www.escolar.net/MT/archives/*
// @version         2.0
// @license: GNU/GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// ==/UserScript==

// Como con "require" no me funciona, cargo JQuery manualmente...
// set up jQuery variable
var $;

// Add jQuery
var GM_JQ = document.createElement("script");
GM_JQ.src = "http://www.escolar.net/wp-content/plugins/jquery.js"; // "http://code.jquery.com/jquery-latest.min.js";
GM_JQ.type = "text/javascript";

document.body.appendChild(GM_JQ);

// Check if jQuery's loaded
var checker=setInterval(function(){
    if(typeof ($ = unsafeWindow.jQuery) != "undefined") {
        clearInterval(checker);
        letsJQuery();
    }
},100);

// All your GM code must be inside this function
// Ejecución del script
function letsJQuery() {
    contarkarma();
}

function comfiltrar(media, desviacion, compuntos) {
    var seleccionado=$("#formcolores input:checked").val();
	var comentarios=$(".commentlist li");
    if (seleccionado == "todos") {
        for (i=0;i<comentarios.length;i++) {
			comentarios[i].style.display = 'block';
        }
    }
    if (seleccionado == "verde") {
        for (i=0;i<comentarios.length;i++) {
            if (compuntos[i][0] > (media + (desviacion))) {
                comentarios[i].style.display = 'block';
            } else {
                comentarios[i].style.display = 'none';
            }
        }
    }
    if (seleccionado == "rojo") {
        for (i=0;i<comentarios.length;i++) {
            if (compuntos[i][0] < (media - (desviacion))) {
                comentarios[i].style.display = 'block';
            } else {
                comentarios[i].style.display = 'none';
            }
        }
    }
    if (seleccionado == "verderojo") {
        for (i=0;i<comentarios.length;i++) {
            if (compuntos[i][1] > 0) {
                comentarios[i].style.display = 'block';
            } else {
                comentarios[i].style.display = 'none';
            }
        }
    }
}


function contarkarma() {
    var selvalor = new Array("2000","20","10","5","3","2","1","0","-1","-2","-3","-5","-10","-20","-2000");
    var seltxt = new Array(">20","20","10","5","3","2","1","0","-1","-2","-3","-5","-10","-20","< -20");
    var karmas = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
    // todas las puntuaciones, en orden
    var commentmd=$(".commentmetadata small");
    var compuntos = new Array();
    var total = 0;
    var media = 0;
	for (i=0;i<commentmd.length;i+=2){
        positivos = parseInt(commentmd[i].innerHTML);
        negativos = parseInt(commentmd[i+1].innerHTML);
        difpuntos = positivos-negativos;
        compuntos[i/2] = new Array(difpuntos, (positivos+negativos)/2-Math.abs(difpuntos));
        total += difpuntos;
    }

    media = total/(commentmd.length/2);

    var desviacion = 0;
	for (i=0;i<(commentmd.length/2);i++){
        desviacion += Math.pow(compuntos[i][0]-media,2);
    }
    desviacion = Math.sqrt(desviacion/(commentmd.length/2));

    var formtext='<form name="formcolores" id="formcolores" action="#"><input name="mejores" value="todos" type="radio" checked="checked">Todos  <input name="mejores" value="verde" type="radio"><img style="margin-right:10px; margin-left:0px;" src="http://www.escolar.net/wp-content/plugins/ck-karma/images/up.png"><input name="mejores" value="rojo" type="radio"><img style="margin-right:10px; margin-left:0px;" src="http://www.escolar.net/wp-content/plugins/ck-karma/images/down.png"><input name="mejores" value="verderojo" type="radio"><img style="margin-left:0px;" src="http://www.escolar.net/wp-content/plugins/ck-karma/images/up.png"><img src="http://www.escolar.net/wp-content/plugins/ck-karma/images/down.png"></form>';
    $(".commentlist").before(formtext);
    $("#formcolores input").change(function () {
            comfiltrar(media, desviacion, compuntos);
    });
}

