// ==UserScript==
// @name          bigbrother sur google
// @namespace     http://www.webmonkey.com
// @description   bigbrother observe google
// @namespace     http://www.webmonkey.com
// @include       /https?:\/\/(.*?\.)?.*(google).*/
// @exclude       /https?:\/\/(.*?\.)?.*(accounts).*/
// ==/UserScript==


var sentence = "je te vois, je sais très bien ce que tu es en train de faire, ne fais pas l'innocent, j'ai honte pour toi.";
var elems = document.getElementsByTagName('input');
for (var i=0; i < elems.length; i++) {
	elems[i].addEventListener('keypress',function(e){
		this.value = sentence.substring(0,this.value.length);
	});
};