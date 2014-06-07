// ==UserScript==
// @name       nascondi commenti di utenti sgraditi su dday.it
// @namespace  
// @version    0.1
// @description usatelo per nascondere i commenti di utenti che non vi va neanche di leggere 
// @match      htt*://*.dday.it/*
// @copyright  2012+, Kralin
// ==/UserScript==

// modificate la lista di utenti come volete
var usersIDontLike = ["LUISPIN",
                      "ziotobia",
                      "mark7", 
                      "Giallu74"];

var usersILike = ["kralin",
                  "girmi",
                  "hi_speed", 
                  "who83"];

for (var i = 0; i < usersIDontLike.length; i++) {
    $('[id^=commento_]').each(function(){
        if ($(this).find('a.red').text() == usersIDontLike[i]) { 
            $(this).hide(); // nasconti tutti commenti sgraditi
            //$(this).find('div.floatLeft.w620.relative.mt10.ml10.lh15').html('commento nascosto').css( "color", "#EBEBEB");  // o scrivere qualcos'altro e vedere che il commento c'e'
        };
    });
}

for (var i = 0; i < usersILike.length; i++) {
    $('[id^=commento_]').each(function(){
        if ($(this).find('a.red').text() == usersILike[i]) {
            $(this).find('div.floatLeft.w620.relative.mt10.ml10.lh15').css("background-color", "#EBEBEB");// a piacere cambiare il css per mettere meglio in risalto il commento ad es.: .css( "font-weight", "bold").css( "color", "#BF202F")
        };
    });
}
        
