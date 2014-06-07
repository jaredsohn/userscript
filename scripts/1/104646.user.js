// ==UserScript==
// @name           Zvyrazneni pro kecy.roumen.cz
// @description    Zvyraznuje obrazky z vice nez n kladnym hodnocenim na Romenovi
// @version	    2.1
// @include       http://kecy.roumen.cz/*
// @include       http://www.rouming.cz/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js
// ==/UserScript==

$(function(){
    
    var n=19;
    var like, color, pom;

  $('div.roumingList tr').each(function() {
      like = $('td:eq(3)', this ).text();

      if ( n < like ) {
         pom = 255 - 2 * $.trim(like);
         pom = Math.max( pom  , 10 );
         color = "#7C" + pom.toString(16) + "00";
          $('td:eq(7) a', this ).css({"background-color" : color});
      }
    });
 
});