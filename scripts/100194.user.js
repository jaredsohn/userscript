// ==UserScript==
// @name           Ubuntu Doc FR
// @namespace      http://userscripts.org/users/civo2000
// @description    Facilite la connexion à la doc ubuntu
// @include        http://doc.ubuntu-fr.org/*
// ==/UserScript==

(function() {

login = document.getElementsByName("u")[0];
login.value="";
login.focus();
})();
