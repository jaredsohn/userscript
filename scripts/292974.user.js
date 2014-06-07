// ==UserScript==
// @name        Fonic - SCRIPT - Beta
// @description Contador de megas consumidos para Fonic CallMobile
// @include     https://www.fonic.callmobile.de/selfcare/index.php*
// @copyright 	shinsgo
// @version	    0.6
// @license	http://creativecommons.org/licenses/by-nc-sa/3.0/es/
// ==/UserScript==

//Cambios
//first version

//VERSION DEL SCRIPT
var version = "0.6";	//Version of the script. For checking for updates
var SCRIPTName = "SCRIPT BETA";
var update;
var avisarActualizacion = true;

var gprs = document.getElementById('level1_0_a').innerHTML.substring(0, 4);

var myEls = document.getElementsByClassName('hd_desc');

var suma = 0;
/*var contador = 0;*/

for ( i=0;i<myEls.length;i++ ) {
	var megas = myEls[i].innerHTML.substring(0, 6);
	if(megas.charAt(0) <= 9 && megas.charAt(0) >= 0){
		if(megas.charAt(5) == "M"){
			megas = megas.substring(0, 5);	
		}
		megas = replaceAll(megas, ",", ".");
		/*console.log(megas)*/
		suma += parseFloat(megas);
		/*contador++;*/
	}
}

suma = roundToTwo(suma);
/*console.log(suma)*/


if(gprs == "GPRS"){
    var navbar, newElement;
    navbar = document.getElementById('fonicpage');

    if (navbar) {
        newElement = document.createElement('div');
        newElement.innerHTML = '<p>'+suma+' MB CONSUMIDOS</p>';
        newElement.setAttribute ('id', 'idMegas');
        navbar.parentNode.insertBefore(newElement, navbar.nextSibling);
    }
}



function replaceAll(text, busca, reemplaza ){
	  while (text.toString().indexOf(busca) != -1)
	      text = text.toString().replace(busca,reemplaza);
	  return text;	
}

function roundToTwo(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
}



GM_addStyle
(
   '#idMegas                         \
    {                                               \
        position:               absolute;           \
        top:                    0;                  \
        left:                   915px;              \
                                                    \
        background:             rgb(0, 176, 224);   \
        margin:                 5px;                \
        opacity:                0.9;                \
        z-index:                222;                \
                                                    \
        min-height:             10px;               \
        min-width:              20px;               \
        padding:                5px 20px;           \
    }                                               \
   '
);