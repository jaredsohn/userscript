// ==UserScript==
// @name			Legendas.tv - detalhes de download em frame
// @namespace		http://legendas.tv
// @description		Ignora a popup dos detalhes e abre em um iframe na mesma página dos resultados.
// @icon			http://i.minus.com/iIxH6Avl7kS4d.png
// @author			TinyButStrong
// @version			0.1
// @homepage		http://userscripts.org/scripts/show/121249
// @include			http://*legendas.tv*
// ==/UserScript==

document.body.innerHTML += '<div id="divlegenda">';

if (typeof contentWindow != 'undefined') {
	unsafeWindow = contentWindow; // google chrome
} else if (typeof unsafeWindow != 'undefined') {
	// firefox
} else {
	unsafeWindow = window; // opera + safari?
}

unsafeWindow.abredown = function abredown(download) {
	document.getElementById('divlegenda').innerHTML = '<iframe src="info.php?d='+download+'" width="598" height="100%" frameborder="0" marginwidth"0" id="framelegenda"></iframe>';
	window.scrollTo(0,0);
}