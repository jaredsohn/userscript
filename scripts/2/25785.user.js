// ==UserScript==
// @name           ignorador
// @namespace      *pandrosito.com/foro
// @description    Ignora personas en el foro Pandrosito.com
// @include        *pandrosito.com/foro/viewtopic.php*
// @author         Moris
// @license        GPL v.3
// @version        0.1
// @date           29/04/2008
// ==/UserScript==
/*modificar el contenido de esta variable separando por comas los nicks de gente que se quiere ignorar
ejemplo:
var ignora = ["PpFaYuKa","Chuck Norris"];
*/
var ignora = ["Am Cool"];
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
			if(tds[i].className=="row3 one"){
				//nick de quien escribe
				var nick=tds[i].lastChild.nodeValue;
				//nick que nos interesa ignorar
				if(ignora[j]==nick){
					//se agrega a eliminables nota se elimina despues para evitar errores
					cont.push(tds[i].parentNode);
				}
			}
		}
	}
	for(var k=0;k<cont.length;k++){
		//se borra el contenido
		cont[k].parentNode.removeChild(cont[k].nextSibling.nextSibling);
		//se borra la barra inferior
		cont[k].parentNode.removeChild(cont[k].nextSibling.nextSibling.nextSibling);
		//se borra el nick
		cont[k].parentNode.removeChild(cont[k]);
	}
}
ignorar();