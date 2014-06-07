// ==UserScript==
// @name           ImageShack (for Bloggers)
// @namespace      imageshack
// @include        http://img*.imageshack.us/gal.php?g=*
// @description    Clean URLS when you upload multiple pics
// @version        0.1
// @copyright      © Layane
// @license        Creative Commons Attribution-Noncommercial-Share Alike 3.0 Spanish License
// ==/UserScript==

var DIRECT_URLS = 0;
var HTML_THUMBS = 1;
var BBCODE = 2;

function init() {
	var imgsurls = unsafeWindow.thecontents[DIRECT_URLS].split('\n');
        var thumbsurls = unsafeWindow.thecontents[HTML_THUMBS].split('\n');

        //eliminamos el ultimo elemento que es nulo
        thumbsurls.pop();
        imgsurls.pop();

        //obtenemos las urls de las miniaturas
        for (var i = 0; i < thumbsurls.length; i++) {
            thumbsurls[i] = /<img src="(.*?)" border="0"\/>/.exec(thumbsurls[i])[1];
        }

        //limpiamos los elementos a modificar
        for (var i = 1; i < 3; i++)
            unsafeWindow.thecontents[i] = '';

        //modificamos el array generando el nuevo codigo bbcode y html
	for (var i = 0; i < imgsurls.length; i++) {
            unsafeWindow.thecontents[HTML_THUMBS] += '<a target="_blank" href="' + imgsurls[i] +'"><img src="' + thumbsurls[i] + '" border="0"/></a><br>\n';
            unsafeWindow.thecontents[BBCODE] += '[URL=' + imgsurls[i] + '/][IMG]' + thumbsurls[i] + '[/IMG][/URL]\n';
	}

        //actualizamos el elemento inicial
        document.getElementById('textarea').value = unsafeWindow.thecontents[document.getElementsByName('selectbox')[0].selectedIndex];
}

document.addEventListener( "DOMContentLoaded", init, false );