// ==UserScript==
// @name        GrooveShark Ads Remover
// @namespace   http://elbleg.com
// @description Simple script that removes advertising sidebar... Sorry guys I love GrooveShark but those weight loss ads were driving me nuts. 
// @include     http://listen.grooveshark.com/*
// @author      Yëco <pobreyeco@gmail.com>
// ==/UserScript==

(function () {
    a = window.document.getElementById("adBar");
    w = window.document.getElementById("mainContentWrapper");
    rm = function() {
           if (w && a) {
               w.style.marginRight = "0";
                a.style.display = "none";}
               $(a).remove(); // Lazy ass jQuery remove method           
       }

    if (window.fluid) {  rm(); } 
    
    w.addEventListener("DOMSubtreeModified", rm, true);// now works on greasemonkey too
    rm();
    
    var r = function() {
        var v = setInterval("rm()",1000);
        setTimeout("clearInterval("+v+")",15000);
    };
    
   r();
    
})();
