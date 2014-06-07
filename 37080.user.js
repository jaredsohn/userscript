// ==UserScript==
// @name           Kill Countdown
// @description    Kill Countdown Time
// @include        *
// ==/UserScript==
(function() {
        var num=setTimeout("0");
        for(var i=num;i>=1;i--){
                clearTimeout(i-1);                               
        }
        unsafeWindow.timer();
})();