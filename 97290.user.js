// ==UserScript==
// @name           DS - Shortkeys
// @namespace      *
// @description    Macht es möglich, Seiten über Shortkeys anzusteuern. Tasten und Seiten selbst einstellbar.
// @author         Ulrich-Matthias Schäfer
// @include        http://*.die-staemme*
// ==/UserScript==

if(window.location.href.indexOf('die-staemme') == -1)
    return;
    
if(window.location.href.indexOf('forum.php') != -1 && top.location != self.location){
    return;
}



/* 
    ----------------- HIER KANN GEÄNDERT WERDEN ----------------------
    Wenn bestimmtes Dorf, dann in der Form:      1:{screen:'overview',village:123546}
    Wenn bestimmter mode (z.B. bei screen=ally): 1:{screen:'ally',mode:'forum'}
    Oder beides:                                 1:{screen:'ally',village:123546,mode:'forum'}
*/
var keys = {
    1:{screen:'overview'},
    2:{screen:'train'},
    3:{screen:'place'},
    4:{screen:'main'},
    5:{screen:'report'},
    6:{screen:'mail'},
    7:{screen:'ally'},
    8:{screen:'memo'},
    9:{screen:'map'},
    0:{screen:'overview_villages',mode:'combined'},
    'q':{screen:'ranking'},
    'f':{screen:'ally',mode:'forum'}
    // usw...
}

// --------------- AB HIER NICHTS MEHR ÄNDERN -----------------------





window.addEventListener('keypress',function(e){
    if(e.altKey && keys[String.fromCharCode(e.charCode)] != null)
    {
        var prefix = window.location.href.substr(0,window.location.href.indexOf('die-staemme.')+11)+window.location.href.substr(window.location.href.indexOf('die-staemme.')+11).substr(0,window.location.href.substr(window.location.href.indexOf('die-staemme.')+11).indexOf('/'))+'/game.php';

        var location = 
            prefix+
            '?screen='+keys[String.fromCharCode(e.charCode)].screen+
            ((keys[String.fromCharCode(e.charCode)].village != null) ? '&village='+keys[String.fromCharCode(e.charCode)].village : '')+
            ((keys[String.fromCharCode(e.charCode)].mode != null) ? '&mode='+keys[String.fromCharCode(e.charCode)].mode : '');

        window.location = location;
    }
},false);