// ==UserScript==
// @name           Ignore 1.0
// @description    Ignorar posts dos usuarios cujo uid voce informar.
// @include        http://www.orkut.com*/*CommMsgs*
// ==/UserScript==

//informar uids a serem ignoradas logo abaixo.
//colocar somente o final das UIDs, por questão de melhorar o desempenho do script
//sempre colocar as uids entre aspas, separando-as entre vírgulas. 
//NÃO colocar vírgula após a última UID
var uids = new Array(
"1234"
);

var contador = 0;
var divs = document.getElementsByTagName("div");
for (i = 0; i < divs.length; i++) {
	if (divs[i].className == "listitem") {
		var a = divs[i].getElementsByTagName("a")[0];
		for (j = 0; j < uids.length; j++) {
			if (a.href.indexOf(uids[j]) != -1) {
                                contador++;
                                var texto = divs[i].innerHTML;
				divs[i].innerHTML = "<b>POST IGNORADO. <span style=\"cursor: pointer;color:blue; text-decoration: underline;\" onclick=\"document.getElementById('span" + contador + "').style.display = 'inline';\">Exibir</span>/<span style=\"cursor: pointer;color:blue; text-decoration: underline;\" onclick=\"document.getElementById('span" + contador + "').style.display = 'none';\">Ocultar</span></b> <span id='span" + contador + "' style='display: none'>" + texto + "</span>";
				break;
			}			
		}


	}
	
}