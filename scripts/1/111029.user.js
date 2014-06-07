// ==UserScript==
// @name          free liberation
// @namespace     http://userscripts.org/users/benaud
// @description   Remove "register" top bar of liberation.fr website
// @version       0.1
// @include       http://*.liberation.fr/*
// ==/UserScript==

(function() {
var removeComments = document.getElementById('bar-liberation');
if (removeComments) {
    removeComments.parentNode.removeChild(removeComments);
}

})();

