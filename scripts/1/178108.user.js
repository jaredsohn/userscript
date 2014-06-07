// ==UserScript==
// @name Watchever advanced
// @description missed some functions as resize and change quality…resize was simple, quality was lucky…
// @include http://*.watchever.de/player/*
// @version 0.1.7
// ==/UserScript==

$(document).ready(function() {
function andAction() {  
    var wz_toolbar = $("#subMenu_close .closeBt");  
    wz_toolbar.prepend("<div class=\"select zoomMinus\"><div id=\"wz_zoomMinus\">-</div><ul><img class=\"tic social\" src=\"http://static.watchever.de/visuals/web/sub_arrow_profil/master.png?ver=201309031432\"><li>Player verkleinern</li></ul></div>");  
    wz_toolbar.prepend("<div class=\"sep\"></div>");  
    wz_toolbar.prepend("<div class=\"select zoomPlus\"><div id=\"wz_zoomPlus\">+</div><ul><img class=\"tic social\" src=\"http://static.watchever.de/visuals/web/sub_arrow_profil/master.png?ver=201309031432\"><li>Player vergrößern</li></ul></div>");  
    wz_toolbar.prepend("<div class=\"sep\"></div>");  
    wz_toolbar.prepend("<div class=\"select zoomHD\"><div id=\"wz_zoomHD\">&frac12;&nbsp;HD</div><ul><img class=\"tic social\" src=\"http://static.watchever.de/visuals/web/sub_arrow_profil/master.png?ver=201309031432\"><li>Player auf die hälfte der Auflösung von HD Ready setzen.</li></ul></div>");  
    wz_toolbar.prepend("<div class=\"sep\"></div>");  
    wz_toolbar.prepend("<div class=\"select zoomFull\"><div id=\"wz_zoomFull\">FULL</div><ul><img class=\"tic social\" src=\"http://static.watchever.de/visuals/web/sub_arrow_profil/master.png?ver=201309031432\"><li>Player auf Browsergröße anpassen.</li></ul></div>");  
    wz_toolbar.prepend("<div class=\"sep\"></div>");  
    wz_toolbar.append("<style type=\"text/css\">#subMenu_close .closeBt { width: 500px; } #subMenu_close .zoomPlus, #subMenu_close .zoomMinus { padding: 0 3px; vertical-align: top; width: 15px; text-align: center; } #subMenu_close .zoomPlus:hover, #subMenu_close .zoomMinus:hover { background: #fff; } #subMenu_close .zoomPlus:hover div, #subMenu_close .zoomMinus:hover div { color: #333; }</style>");  
    var wz_plus = $("#wz_zoomPlus");  
    var wz_minus = $("#wz_zoomMinus");  
    var wz_hd = $("#wz_zoomHD");  
    var wz_full = $("#wz_zoomFull");  

    var wz_playerFrame = $("object");  
    var wz_playerParent = wz_playerFrame.parent().html();  
    var repRegEx = new RegExp("value=\"Service", 'g');  
    wz_playerParent = wz_playerParent.replace(repRegEx, "value=\"isDebugMode=true, Service");  
    wz_playerFrame.parent().html(wz_playerParent);  
    wz_playerFrame = $("object"); // removed the array selector  

    wz_plus.click( function() {  
        wz_playerFrame.width(wz_playerFrame.width() * 1.1);  
        wz_playerFrame.height(wz_playerFrame.height() * 1.1);  
    });  

    wz_minus.click( function() {  
        wz_playerFrame.width(wz_playerFrame.width() / 1.1);  
        wz_playerFrame.height(wz_playerFrame.height() / 1.1);  
    });

    wz_hd.click( function() {  
        wz_playerFrame.width(854); // 1280  
        wz_playerFrame.height(480); // 720  
    });

    wz_full.click( function() {  
        wz_playerFrame.width("100%");  
        wz_playerFrame.height($(window).height() - $("#silverlightControlHost").offset().top - 2);  
    });  
}  
var checkExist = setInterval(function() {  
    if ($("object").length) {  
        console.log("Exists!");  
        clearInterval(checkExist);  
        andAction();  
    }  
}, 100);
});