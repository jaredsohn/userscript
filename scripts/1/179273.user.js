// ==UserScript==
// @name         Allow ABP @ Needrom
// @namespace    http://jixun.org/
// @version      1.0
// @description  Get rid off the ABP detected notification.
// @include      *://*.needrom.com/*
// @include      *://needrom.com/*
// @copyright    2013+, Jixun[d0t]Moe[A.T]gmail[d0t]c0m
// @run-at       document-start
// ==/UserScript==

;(function(){
    var check = setInterval (function(){
        // Check if document's ready.
        if (!document.body || document.readyState == 'loading')
            return;
        var tId = document.body.innerHTML.match(/=([a-z0-9]{4})=new n/i)[1];
        
        // There's no error! Log it and disable further checking.
        console.log ('[AA@N] Ready to inject style sheet. Target ->', tId);
        clearInterval (check);
        
        // Forece hidden div
        var nCss = document.createElement ('style');
        nCss.innerHTML = '#' + tId + '{display:none !important}';
        document.body.appendChild(nCss);
        
        // Fix other effected display style.
        var domList = document.querySelectorAll('.container style');
        (function(t){
            t.parentNode.removeChild(t);
        })(domList[domList.length-1]);
    }, 100);
})();
