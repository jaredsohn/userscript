// ==UserScript==
// @name           ignorador-TUE
// @namespace      *theunderexposed.com/foro
// @description    Ignora personas en el foro Pandrosito.com
// @include        *theunderexposed.com/foro/viewtopic.php*
// @author         Moris
// @license        GPL v.3
// @version        0.2
// @date           05/11/2008
// ==/UserScript==
/*modificar el contenido de esta variable separando por comas los nicks de gente que se quiere ignorar
ejemplo:
var ignora = ["PpFaYuKa","Chuck Norris"];
*/
var ignora = [""];
function ignorar(){
	//contenedor de 
	var cont=[];
	//colexion de nodos td
	var tds=document.getElementsByTagName("TD");
	//ciclo de ignorados
	for(var j=0;j<ignora.length;j++){
		//ciclo de tds
		for(var i=0;i<tds.length;i++){
			//td que nos interesa segun template actual
			if(tds[i].className=="row2" || tds[i].className=="row1"){
			if (tds[i].firstChild.className=="name"){
				//nick de quien escribe
				var nick=tds[i].firstChild.lastChild.innerHTML;
			}
								
				if(ignora[j]==nick){
					// eliminara despues para evitar errores
					cont.push(tds[i].parentNode);
				}
			}
		}
	}
	for(var k=0;k<cont.length;k++){
		//se borra el contenido
		cont[k].innerHTML="";
	}
}
ignorar();