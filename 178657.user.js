// ==UserScript==
// @name        WoEChatDiceLoader
// @namespace   WoEDiceLoader
// @include     http://worldofequestria.pl/*
// @version     2
// @downloadURL https://raw.github.com/chiredan/WorldOfEquestriaDice/MainBranch/wodeDiceloader.js
// @updateURL https://raw.github.com/chiredan/WorldOfEquestriaDice/MainBranch/wodeDiceloader.js
// @author Chiredan&Vienes
// ==/UserScript==


// Add woeDiceScript
    (function(){
        if (typeof unsafeWindow.woeDiceScript == 'undefined') {
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');
    
            GM_JQ.src = 'https://raw.github.com/chiredan/WorldOfEquestriaDice/MainBranch/woeDice.js';
            GM_JQ.type = 'text/javascript';
            GM_JQ.async = true;
    
            GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
        }
    })();
