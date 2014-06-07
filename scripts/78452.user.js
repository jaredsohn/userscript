// ==UserScript==
// @name           EBIMON - Contador
// @namespace      http://www.edicomonline.com/EBIMON
// @description    Muestra en la barra de titulo el numero de alarmas por bandeja del EBIMON
// @include        http://accesosedes:8080/
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==

function setTitle(str) {
	document.title = str;
}

function getNumMensPorBandeja() {
	var regex = /\d+/;
	var bandejas = [];
	$('span:contains(No tratadas)').each(function(i, elem) {
		test = regex.exec($(elem).text());
		bandejas.push(test? parseInt(test[0]):0);
	});
	setTitle('[' + bandejas.join('-') + ']');
}

setTimeout(getNumMensPorBandeja, 1000);
setInterval(getNumMensPorBandeja, 5000);