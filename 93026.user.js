// ==UserScript==
// @name           Bookworm Keyboard Enhancer
// @version        0.1
// @namespace      http://denbuzze.com/
// @description    Ad keyboard shortcuts for the O'Reilly Bookworm Reader
// @match          http://bookworm.oreilly.com/view/*
// @match          https://bookworm.oreilly.com/view/*
// @include        http://bookworm.oreilly.com/view/*
// @include        https://bookworm.oreilly.com/view/*
// ==/UserScript==

(function(){

    var keyhandler = function(e){

        if(e.keyCode == 37 || e.keyCode == 39){

            var prevnext = e.keyCode == 37 ? "previous" : "next";

            var element = document.querySelectorAll("span.bw-" + prevnext + " a");
            
            if(element && element[0] && element[0].href){
                document.location = element[0].href;
            }

        };
    }
    window.addEventListener('keydown', keyhandler, false);
	
})();