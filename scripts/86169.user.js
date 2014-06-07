// ==UserScript==
// @name           NFL Hide Scores
// @description    Intended to hide scores classes on NFL.com gamerewind pages.
// @include        http://*nfl.com/*
// @include        https://*google.com/*
// ==/UserScript==

(function(){

var elem = document.getElementsByClassName('score');
for (var i = 0; i < elem.length; i++) {
	elem[i].style.visibility = 'hidden';
}

})();