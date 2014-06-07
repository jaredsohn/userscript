// ==UserScript==
// @name       LU E-studijas kursi
// @version    0.2
// @description  maina kursu kodu uz kursa nosaukumu kursu sarakstā
// @include      http://estudijas.lu.lv/*
// @copyright  2012+, Matīss Lulle
// ==/UserScript==

(function(){
    var callback = function(){
        var list = document.getElementsByClassName("type_course depth_3");
        var count = 0;
        while(list.length != count){
            var next = list.item(count).firstChild.firstChild;
            var atr = next.getAttribute("title");
            var arr = atr.split(":");
            next.innerHTML=arr[1]; 
            count++;
        }
    };
    
    if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', callback, false);
    }
    /* Safari, iCab, Konqueror */
    if (/KHTML|WebKit|iCab/i.test(navigator.userAgent)) {
        var DOMLoadTimer = setInterval(function () {
            if (/loaded|complete/i.test(document.readyState)) {
                callback();
                clearInterval(DOMLoadTimer);
            }
        }, 10);
    }
    
})();