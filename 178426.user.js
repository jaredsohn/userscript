// ==UserScript==
// @name       Index w/o Vevlet
// @namespace  http://net.csik
// @version    0.1
// @description  Removes the Velvet block
// @match      http://index.hu/
// ==/UserScript==

$(document).ready(function(){
    $('#top_velvet').css('display', 'none');
    $('#top_velvet').nextAll().css('display', 'none');
});
