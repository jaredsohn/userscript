// ==UserScript==
// @name        Desire2Learn, Block javascript alerts
// @match       https://learn.uwaterloo.ca/*
// @match       https://jobmine.ccol.uwaterloo.ca/*
// @run-at      document-start
// ==/UserScript==
 
addJS_Node (null, null, overrideSelectNativeJS_Functions);
 
function overrideSelectNativeJS_Functions () {
    window.alert = function alert (message) {
        console.log (message);
    }
}
 
function addJS_Node (text, s_URL, funcToRun) {
    var D                                   = document;
    var scriptNode                          = D.createElement ('script');
    scriptNode.type                         = "text/javascript";
    if (text)       scriptNode.textContent  = text;
    if (s_URL)      scriptNode.src          = s_URL;
    if (funcToRun)  scriptNode.textContent  = '(' + funcToRun.toString() + ')()';
 
    var targ = D.getElementsByTagName ('head')[0] || D.body || D.documentElement;
    targ.appendChild (scriptNode);
}