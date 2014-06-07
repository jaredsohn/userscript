// ==UserScript==
// @name        FACEBOOK Right Bar Remover
// @namespace   ffbm
// @description Removes nasty & boring right bar on facebook's start-page.
// @version     0.1
// @grant       none
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

$(document).ready(function(){
    $('#rightCol').each(function(){
        $(this).remove();
        
    });
});