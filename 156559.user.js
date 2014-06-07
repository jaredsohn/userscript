// ==UserScript==
// @name        arkAll
// @description Attention : appelé sur toutes les pages (à n'activer que lorsque c'est vraiment utile)
// @namespace   chooz
// @author      chooz
// @version     1.1.201309
// @updateURL   http://userscripts.org/scripts/source/156559.user.js
// @include     *
// ==/UserScript==

// ajoute un liens vers les mantis listées
document.body.innerHTML = document.body.innerHTML.replace(/\b(\d{5})\b/g, "<a href='http://gktest.gicm.net:8080/mantis/view.php?id=$1'>m#$1</a>");
