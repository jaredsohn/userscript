// ==UserScript==
// @name BiteFight Ad Remover
// @description Only removes premium ads, as yet
// @include http://s*.bitefight.*/bite/*
// ==/UserScript==

(function() {

document.getElementsByTagName('img')[0].src = '';
document.getElementsByTagName('img')[0].width = 0;
document.getElementsByTagName('img')[0].height = 0;
document.getElementById('container').style.paddingTop = 0;

	var p = document.getElementsByTagName('p');
	for (var i = 0; i < p.length; i++) {
		if (p[i].innerHTML.indexOf('<a href="premium.php"') != -1) {
			p[i].parentNode.removeChild(p[i]);
		}
	}
	// remueve el gigante logo

})();


//bitefightadremover