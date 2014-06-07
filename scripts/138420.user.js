// ==UserScript==
// @name          Anti-Mastertoons-Adblock-Blocker
// @namespace http://userstyles.org
// @description Makes Adblock useable on Mastertoons
// @author        Bendley
// @include       http://*.mastertoons.com/*
// @include       http://mastertoons.com/*
// @run-at        document-end
// ==/UserScript==

(function(){

    window.addEventListener('DOMNodeInserted', function(event){
        var ele = event.target;
        if(ele.id && ele.id.length==4 && ele.innerText.indexOf("Please disable your ad blocker to continue viewing Master Toons.") != -1){
            ele.parentNode.removeChild(ele);
        }
     });

})();