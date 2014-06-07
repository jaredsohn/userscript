// ==UserScript==
// @name           YazarOku Minibar
// @namespace      yazaroku
// @description    YazarOku.com'da üstteki barı küçültür, siteye doğrudan gitmek için barı kapat düğmesi ekler.
// @author         sanilunlu
// @include        *yazaroku.com/*/*
// @include        *yazaroku.com/Reklam.aspx*
// @version        1.6
// ==/UserScript==

document.body.onload = function() {
	if (document.forms.length > 0 && document.forms[0].action.indexOf('Reklam.aspx') != -1) {
		var str = '/';
		for(var i = 0; i < document.links.length; i++) {
			if (document.links[i].innerHTML.indexOf('Reklam') != -1) {
				str = document.links[i].href;
				break;
			}
		}
		window.location = str;
	}
}

if (window.location.hostname.indexOf('www.') == -1) {
	window.location = window.location.href.replace('://', '://www.');
}

var el = document.createElement('a');
el.name = 'kapa';
el.onclick = function(event) {
	window.location = document.getElementsByTagName('frameset')[0].getElementsByTagName('frame')[1].src;
}
el.style.top = '6px';
el.style.right = '10px';
el.style.position = 'absolute';
el.style.display = 'block';
el.style.zIndex = '100';
el.style.fontSize = '20pt';
el.style.fontWeight = 'bold';
el.style.width = '25pt';
el.style.height = '25pt';
el.style.cursor = 'pointer';
el.style.textDecoration = 'none';
el.style.color = 'white';
el.fontFamily = 'sans-serif !important';
el.innerHTML = 'X';

document.getElementsByTagName('frameset')[1].rows = "55px, *";
document.getElementsByTagName('frameset')[0].getElementsByTagName('frame')[0].onload = function() {
	document.getElementsByTagName('frameset')[0].getElementsByTagName('frame')[0].contentWindow.document.body.style.marginTop = "-15px";
	document.getElementsByTagName('frameset')[0].getElementsByTagName('frame')[0].contentWindow.document.body.appendChild(el);
	document.getElementsByTagName('frameset')[0].getElementsByTagName('frame')[0].contentWindow.document.getElementsByClassName('select-wrap')[0].style.width = '250px';
	document.getElementsByTagName('frameset')[0].getElementsByTagName('frame')[0].contentWindow.document.getElementById('logo').getElementsByTagName('img')[0].style.height = '32px';
	document.getElementsByTagName('frameset')[0].getElementsByTagName('frame')[0].contentWindow.document.getElementById('logo').getElementsByTagName('img')[0].style.marginTop = '10px';

document.getElementsByTagName('frameset')[0].getElementsByTagName('frame')[0].contentWindow.document.getElementsByClassName('topbanner')[0].style.marginTop='-7px';
}

setTimeout(document.getElementsByTagName('frameset')[0].getElementsByTagName('frame')[0].onload, 10000);