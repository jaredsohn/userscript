// ==UserScript==
// @name           Ubuntu Fr Login
// @namespace      http://userscripts.org/users/civo2000
// @description    Facilite la connexion au forum
// @include        http://forum.ubuntu-fr.org/
// ==/UserScript==

(function() {

login = document.getElementsByName("req_username")[0];
login.value="";
login.focus();
login.mousedown();
})();
