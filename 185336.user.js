// ==UserScript==
// @name        KalóriaBázis side by side
// @namespace   http://kaloriabazis.hu/
// @description Egymás mellé teszi a mit ettél és a mit sportoltált valamint megtisztítja a fejlécet
// @match		http://kaloriabazis.hu/fooldal
// @match   	http://kaloriabazis.hu/index.php
// @match   	http://kaloriabazis.hu/bejelentkezes
// @match  		http://kaloriabazis.hu/kijelentkezes
// @match   	http://kaloriabazis.hu
// @version     0.1
// ==/UserScript==

$(document).ready(function() {
    var originalWidth = 981;
    var newWidth = 1631;
    var a = new Array();
    a[0] = $("div.facebook");
    a[1] = $("div.headtext1");
    a[2] = $("div.headtext2");
    a[3] = $("div.stat");
    a[4] = $("div.comment");
    for (var i in a) {
        a[i].remove(); // fejléc megtisztítása
    }
    // almák eltüntetése és újraformázás 
    if (navigator.userAgent.indexOf("Chrome") > -1){
        GM_addStyle( "div.pageMain div.head { background: none; width: '+newWidth+'px; height: 0px; }");  
    }else{ // firefox -- ez a script jelenleg nem működik firefox alatt, ez csak a jövőre tekintettel van itt
        document.getElementsByClassName('head')[0].style = 'background: none; width: '+newWidth+'px; height: 0px;'; // 0 mert csak az elso "head" et valtoztassa meg
    }
    
    $("div.siteContainer").attr('style', 'width: '+newWidth+'px; left: 30%;'); // az oldal kitágítása
    $("div.siteHead").attr('style', 'width: '+newWidth+'px; background-size: 100% 100%;'); // a fejléc kitágítása
    $("div.loginText").attr('style', 'left: 443px;'); // bejelentkező szöveg jobbra mozgatása hogy a háttéren kb ugyan ott legyen ahol volt
    $("div.siteMenu").attr('style', 'top: 112px;'); // menu lejjebb tolása hogy a sötét zöld térben maradjon
  
    var progress = parseFloat($("div.target")[0].style.cssText.slice($("div.target")[0].style.cssText.search("[0-9]"), $("div.target")[0].style.cssText.search("px")));
    $("div.target").attr('style','margin-left: '+progress*newWidth/originalWidth+'px;'); // a kis emberke pozíciójának frissítése
    
    var datesOriginalLeft = 373
    $("div.dates").attr('style', 'left: '+(datesOriginalLeft+(newWidth-originalWidth)/2)+'px; top: -35px;'); // a nap váltó új középe    
    $("div.siteFoot").attr('style', 'width: '+newWidth+'px; background-size: 100% 100%;'); // láb kitágítása
});