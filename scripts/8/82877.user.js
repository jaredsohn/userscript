// ==UserScript==
// @name           SearchThesameinYandex
// @namespace      *
// @description    Easy searching the same string in yandex.ru
// @include        http://www.google.ru/
// ==/UserScript==

function loadQueryAll() {
			var parts=document.location.search.substr(1).split("&");
			var GET={}, gettex="", curr;
					for (i=0; i<parts.length; i++) {
					 curr = parts[i].split('=');
					 GET[curr[0]] = curr[1];
					}
				if(GET['q']) {
					gettex = GET['q'];
					
					  var queryline = document.createElement("div");
						queryline.innerHTML = '<div style="position: absolute; left:75%; top: 90px">' +
						'<img src="http://yandex.st/lego/_/pDu9OWAQKB0s2J9IojKpiS_Eho.ico"/>&nbsp;' +
						'<a href="http://yandex.ru/yandsearch?text=' + gettex + '" target="_blank">' + gettex + '</a></div>';
						document.body.insertBefore(queryline, document.body.firstChild);
				}
}

window.addEventListener(
    'load', 
    loadQueryAll(),
    true);
