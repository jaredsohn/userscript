// ==UserScript==
// @name           MD Clicker
// @namespace      Scripts for Wise
// @include        http://wise-md.med.nyu.edu/GoToModule.action*
// @include        http://wise-md.med.nyu.edu/ModuleClick.action*
// ==/UserScript==
var GM_JQ;

(function(){
    GM_log("Init!");
    GM_wait();
})();

function GM_monitorVideo() { 
    if( GM_JQ('.buttonHighlight').length ) {
        GM_JQ('.buttonHighlight').click();
    } else {
        if( GM_JQ('.buttonhighlight').length ) {
            GM_JQ('.buttonhighlight').click();
        } else {
            GM_log('Not finished');
            setTimeout(GM_monitorVideo, 5000);
        }
    }
};

function GM_run() {
    // GM_log("GM_run");
    setTimeout(GM_monitorVideo, 5000);
}

function GM_wait() {
    // GM_log("GM_wait");
    
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait, 100);
    } else {
        GM_JQ = unsafeWindow.jQuery;
        GM_run();
    }
}

