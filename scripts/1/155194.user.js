// ==UserScript==
// @name        carrefour-banque_autocomplete
// @namespace   sputnick
// @description autocompletion pour le login carrefour-banque
// @include     https://www.carrefour-banque.fr/espace-client/connexion*
// @version     1
// @grant       none
// ==/UserScript==

document.getElementById("edit-name").setAttribute("autocomplete", "on");
