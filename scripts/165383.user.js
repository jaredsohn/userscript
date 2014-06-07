// ==UserScript==
// @name           Luminant plug.dj TEST Script
// @namespace      Moky
// @include        http://plug.dj/*
// @version        0.1.1
// ==/UserScript==

//test version alert
setTimeout(function(){
alert("This is TEST version. Please install full version http://userscripts.org/scripts/show/161092 Thank You.")
},5000);
//
 
//plug enhanced
 
hhb_debugging = 0; //1 for debugging..
hhb_d = null; //for document.
hhb_all_loaded = false;
hhb_init_ID = null;
 
hhb_auto = false;
hhb_mehlist_on = true;
hhb_wootlist_on = true;
hhb_undecidedlist_on = false;
 
 
function hhb_debug(a, b, c) {
    if (hhb_debugging && typeof (console) !== 'undefined' && typeof (console.log) !== 'undefined') {
        if (typeof (a) !== 'undefined') console.log('a:' + a);
        if (typeof (b) !== 'undefined') console.log('b:' + b);
        if (typeof (c) !== 'undefined') console.log('c:' + c);
    }
}
 
function hhb_init() {
    //if(hhb_debug)alert("started hhb_init.");
    if (hhb_all_loaded === true) {
        hhb_debug("already init.");
        return;
    }
 
    if (document.getElementById('audience-canvas') === null) {
        hhb_debug("hhb_init not ready1");
        return; /*not ready yet*/
    }
    if (typeof (unsafeWindow) !== 'undefined' && (typeof (unsafeWindow.API) === 'undefined' || typeof (unsafeWindow.API.getSelf) === 'undefined' || typeof (unsafeWindow.API.getSelf()) === 'undefined')) {
        hhb_debug("hhb_init not ready2");
        return; /*not ready yet*/
    }
    if (typeof (unsafeWindow) === 'undefined' && (typeof (API) === 'undefined' || typeof (API.getSelf) === 'undefined' || typeof (API.getSelf()) === 'undefined')) {
        hhb_debug("hhb_init not ready3");
        return; /*not ready yet. chrome-specific.*/
    }
    //ready.
    clearInterval(hhb_init_ID);
 
    hhb_debug("hhb_init running...");
    document.getElementById('audience').style.zIndex = "7";
    document.getElementById('audience-canvas').style.zIndex = "8";
};

 ////////////////////
 
//github.
 
javascript: (function () {
var jsCode = document.createElement('script');
jsCode.setAttribute('id', 'plugbot-js');
jsCode.setAttribute('src', 'http://dl.dropbox.com/u/79625725/Luminant%20script/Script.js');
document.body.appendChild(jsCode); }());