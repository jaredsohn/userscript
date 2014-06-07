// ==UserScript==
// @name           Erweiterte Threadübersicht
// @namespace      Kambfhase
// @description    fügt mehr Threads in die Threadübersicht ein.
// @include        http://forum.mods.de/bb/board.php?BID=*
// @require        http://kampfhase2005.ka.funpic.de/uploads/GM_jquery.js
// ==/UserScript==

var seiten = 1; // Anzahl der zuSätzlichen Seiten die geladen werden sollen.


// ===== Bitte nichts unterhalbd dieser Linie verändern! =====


(function(){
    var s = unsafeWindow.location.search.substring(1).split('&');
    if(!s.length) return;
    unsafeWindow.$_GET = {};
    for(var i  = 0; i < s.length; i++) {
        var parts = s[i].split('=');
        unsafeWindow.$_GET[unescape(parts[0])] = unescape(parts[1]);
    }
}())

var jqTBody = (document.evaluate("//table[2]/tbody/tr/td/table/tbody/tr[33]", document, null, 8, null).singleNodeValue);
var bid = unsafeWindow.$_GET["BID"];
var $=unsafeWindow.jQuery;
var aktuelleSeite= (unsafeWindow.$_GET["page"] || 1)*1;

for( var i=aktuelleSeite +1; i<= seiten+aktuelleSeite; ++i){
    unsafeWindow.jQuery.ajax({
        contentType: "text/html; charset=ISO-8859-1",
        dataType:"html",
        url:"http://forum.mods.de/bb/board.php",
        type:"GET",
        data:{
            BID:bid,
            page:i
        },
        success:function(data){
            $(jqTBody).before( $('tr[bgcolor="#222e3a"]',data));
        }
    });
}