// ==UserScript==

// @name           VarnishFail

// @namespace      Shadark Vi Britannia

// @description    Muestra la verdadera identidad del mensaje de Varnish
// @include        http://www.erepublik.com/*
// @include        http://erepublikspain.superforos.com/*

// ==/UserScript==


// Reemplazar texto
function textReplace (rin, text, replace) {
	while (rin.indexOf(text) > -1) {
		rin =	rin.substring(0, rin.indexOf(text)) +
			replace +
			rin.substring(rin.indexOf(text) + text.length);
	}
	return rin;
}

// Lo que nos atañe:
document.body.innerHTML = textReplace(document.body.innerHTML, 'Error 503 Service Unavailable', 'Soy un failer spammer aburrido, ');
document.body.innerHTML = textReplace(document.body.innerHTML, 'Service Unavailable', 'que como no soy capaz de pensar por mí mismo');
document.body.innerHTML = textReplace(document.body.innerHTML, 'Guru Meditation:', 'tengo que seguir como un borrego el rebaño, ');
document.body.innerHTML = textReplace(document.body.innerHTML, 'XID: 460679933', 'y dedicarme a adorar a una cosa que failea por existir: ');
document.body.innerHTML = textReplace(document.body.innerHTML, 'http://img200.imageshack.us/img200/1162/mantram.jpg', 'http://i38.tinypic.com/2hph8v7.jpg');
document.body.innerHTML = textReplace(document.body.innerHTML, 'http://www.erepublik.com/es/party/secta-del-guru-varnish-2720/1', 'http://www.erepublik.com/es/citizen/profile/1573893');