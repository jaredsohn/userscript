// ==UserScript==
// @name           Coursera EXT - auto countdown, retake quiz
// @description    Coursera Extension -- When one tries to reteke the quiz too quickly, this script counts down and automatically refreshes the page when the time-limit elapses. The quiz is not automatically started!
// @version        0.01
// @copyright      2012, Damian Sepczuk
// @namespace      http://sepczuk.com
// @include        https://class.coursera.org/*/quiz/start*
// @match          https://class.coursera.org/*/quiz/start*
// @downloadURL    https://userscripts.org/scripts/source/140100.user.js
// @updateURL      https://userscripts.org/scripts/source/140100.meta.js
// ==/UserScript==

function mainWrapper(){
// ------------------------------------------------------------------------------------------------------------------------------------------------------------
    function pluralSadder(num) {
        return num==1?'':'s';
    }

    function secToMMSS(seconds) {
        var sec = seconds%60,
            min = (seconds-sec)/60;
        return ((min>0)?(min + ' minute' + pluralSadder(min)):'') + ' ' + sec + ' second' + pluralSadder(sec);
    }
    
    function main() {
        try{
            var waitMsg = $('.alert-message p').text();
            
            if (waitMsg.indexOf('before you can retry the quiz')===-1) return;
            
            var secondsToWait = (+(waitMsg.match(/(\d+)\s+minute/)||[,0])[1])*60 + 
                                (+(waitMsg.match(/(\d+)\s+second/)||[,0])[1]);
            
            var inter = setInterval(
                function(){
                    --secondsToWait;
                    if (secondsToWait <= 0) {
                        $('.alert-message p').text('Refreshing...');
                        clearInterval(inter);
                        window.location.reload();
                    } else {
                        $('.alert-message p').html('<strong>Notice:</strong> You must wait another ' + secToMMSS(secondsToWait) + ' before you can retry the quiz.');
                    }
                }, 1000);
        }catch(e){}
    }
// ------------------------------------------------------------------------------------------------------------------------------------------------------------
    main();
};


if (!document.xmlVersion) {
    var script = document.createElement('script');
    script.appendChild(document.createTextNode('('+ mainWrapper +')();'));
    document.documentElement.appendChild(script);
}