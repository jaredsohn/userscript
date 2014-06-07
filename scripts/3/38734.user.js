// ==UserScript==
// @name           Remover Publicidad en Foros joomlaspanish
// @namespace      Remover Publicidad en Foros joomlaspanish
// @include        http://www.joomlaspanish.org/*
// ==/UserScript==

/*
Creado por DartLord
Es mi primer script, es una modificación de 'Replace Google/Yahoo Ads', es solo una prueba
15-12-2008
*/


function addGlobalStyle(css) {
var head, style;
head = document.getElementsByTagName('head')[0];
if (!head) { return; }
style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = css;
head.appendChild(style);
}

var scripts = document.getElementsByTagName('body')[0];
if (!scripts) return; 
scripts = scripts.getElementsByTagName('img');
if (!scripts) return;

var imagen_url = 'http://www.joomlaspanish.org/images/stories/webempresa700.jpg';

var len = scripts.length;

for (var i = len-1; i >= 0; i--) {
	var f = scripts[i];
	var replace_text = '';

	if (f.src == imagen_url) {
		replace_text = 'Publicidad Removida';
	} 
	if (replace_text != '')
	{
		var ad_notice = document.createElement("div");
		f.parentNode.insertBefore(ad_notice, f);
		ad_notice.innerHTML = replace_text;
		ad_notice.className = 'removed-publicidad';
		f.parentNode.removeChild(f);
	}
}

addGlobalStyle("div.removed-publicidad, " +
			   " a.ad_origin[href='http://www.joomlaspanish.org/images/stories/webempresa700.jpg']:active { width: 100%; border: 0px solid black; text-align: center; color: black; background-color: transparent; font-weight: bold; text-decoration: none ! important; }");
