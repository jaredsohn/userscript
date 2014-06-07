// ==UserScript==
// @name			Facepunch OIFY Remover
// @description		Makes Facepunch A Better Place
// @include			http://facepunch.com/forum.php*
// @version			2.0
// ==/UserScript==

//Making processors run at optimal speed
var oify = document.getElementById('forum56');

//Injecting advanced code into the webpage
oify.parentNode.removeChild(oify);