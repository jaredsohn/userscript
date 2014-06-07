// ==UserScript==
// @name            GoogleNanoView
// @namespace       http://google.com/
// @description     Make nano view on Google main page // Hello RusNanoTech!
// @include         http://*google*
// @include         https://*google*
// ==/UserScript==


var ge = function(id) {
    return document.getElementById(id);
}
var gec = function(className) {
	return document.getElementsByClassName(className);
}
var get = function(tagName) {
	return document.getElementsByTagName(tagName);
}
ge('ghead').style.display = 'none';
ge('footer').style.display = 'none';
gec('lsb')[0].style.display = 'none';
gec('lsb')[1].style.display = 'none';
get('font')[0].style.display = 'none';
ge('all').parentNode.innerHTML='';

