// ==UserScript==
// @name        BJ2
// @namespace   BJ2
// @version     2014.03.16
// @homepage    https://userscripts.org/scripts/show/410156
// @description Melhora título das páginas
// @include     http://www.bj2.me/*
// @grant       none
// @run-at      document-start
// ==/UserScript==

String.prototype.stripHTML = function() {
	return this.replace(/.:: BJ ::. Semeando amizades ::/g, '');
};
document.title = document.title.stripHTML();
document.title += ' :: BJ2';
String.prototype.stripHTML = function() {
	return this.replace(/Tópico: /g, '');
};
document.title = document.title.stripHTML();
String.prototype.stripHTML = function() {
	return this.replace(/Detalhes do torrent /g, '');
};
document.title = document.title.stripHTML();
String.prototype.stripHTML = function() {
	return this.replace(/BJ2 :: /g, '');
};
document.title = document.title.stripHTML();
String.prototype.stripHTML = function() {
	return this.replace(/.:: BJ2.ME ::. /g, '');
};
document.title = document.title.stripHTML();
String.prototype.stripHTML = function() {
	return this.replace(/Mensagens Privadas - /g, '');
};
document.title = document.title.stripHTML();
if (document.title == '.:: BJ ::. Semeando amizades :: BJ2') {
	document.title = 'BJ2';
} else if (document.title == ':: BJ2') {
	document.title = 'BJ2';
}