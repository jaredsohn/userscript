// ==UserScript==
// @name        Manicomio Share
// @namespace   Manicomio Share
// @version     2014.03.16
// @homepage    https://userscripts.org/scripts/show/410146
// @description Melhora título das páginas
// @include     http://www.manicomio-share.com/*
// @include     https://www.manicomio-share.com/*
// @grant       none
// @run-at      document-start
// ==/UserScript==

String.prototype.stripHTML = function() {
	return this.replace(/: :: Manicomio Share - A comunidade do Brasil ::/g, '');
};
document.title = document.title.stripHTML();
document.title += ' :: Manicomio Share';
String.prototype.stripHTML = function() {
	return this.replace(/MS-->/g, '');
};
document.title = document.title.stripHTML();
String.prototype.stripHTML = function() {
	return this.replace(/Ver Tópico: /g, '');
};
document.title = document.title.stripHTML();
if (document.title == ':: Manicomio Share - A comunidade do Brasil :: :: Manicomio Share') {
	document.title = 'Manicomio Share';
} else if (document.title == ':: Manicomio Share') {
	document.title = 'Manicomio Share';
}