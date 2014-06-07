    // ==UserScript==
    // @name          CV-2
    // @description   ELIMINAR FIRMAS DE CV
    // @include       http://*elotrolado.net*
    // ==/UserScript==


var evaluation;
var contador = "0";
    
    
 evaluation = document.getElementById('rightcontent').getElementsByTagName("a")[2];
 

    
if (evaluation.innerHTML == "Consolas Actuales"
    | evaluation.innerHTML =="Consolas Modernas" 
    | evaluation.innerHTML =="Consolas Clásicas" 
    | evaluation.innerHTML =="Informática "
    | evaluation.innerHTML =="Otros"
    | evaluation.innerHTML =="Problemas con transacciones "
    | evaluation.innerHTML =="Censo de tratos positivos "
    | evaluation.innerHTML =="Infracciones y expulsiones "
    | evaluation.innerHTML =="Feedback CV")
{




	var mensaje = document.getElementsByClassName("signature");

        for (contador = 0; contador < mensaje.length; contador++)
        {


        	if (mensaje[contador].innerHTML.match(/<img/gi))
        	{


        		var sinfirmas = mensaje[contador].innerHTML;

        		sinfirmas = sinfirmas.replace(/<img.*>/gi,"---IMAGEN---");

        		mensaje[contador].innerHTML = sinfirmas;

		}


    	}
 }