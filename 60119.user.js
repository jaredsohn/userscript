// ==UserScript==
// @name          Alternativa Teatral | Imagenes que no se cierran
// @namespace     http://www.lanchon.com.ar/lanchon/gmscripts
// @description   Pop-ups con imagenes simples que no se cierran solas.
// @include       http://alternativateatral.com/*
// @include       http://*.alternativateatral.com/*
// @copyright     2009-2010, Lanchon (http://www.lanchon.com.ar)
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

//unsafeWindow.popImage = function(...) {
//	var url = ...;
//	window.open(url);
//};

var script = document.createElement('script');
script.innerHTML =
	'function popImage(path, name, title) {\n' +
	'  var url = path + "original/" + name;\n' +
	'  window.open(url);\n' +
	'}\n';
document.getElementsByTagName('head')[0].appendChild(script);
