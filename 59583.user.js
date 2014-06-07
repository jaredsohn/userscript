// ==UserScript==
// @name           memme
// @namespace      http://www.crealabs.it
// @description    Double click on a word to add to memme
// @include        *
// ==/UserScript==

(function () {
	document.addEventListener('dblclick',function(){
	    var word = document.getSelection().toString();
	    if (word) {
             window.open('http://www.crealabs.it/memme/home.php?word=' + word);
	    }
	},true);
})();

