// ==UserScript==
// @name 		Gmail, Disable Alerts
// @namespace 	http://userscripts.org/users/yokhannan
// @description This will disable the "Are you sure..." alert/confirm boxes within Gmail. Specifically designed to remove the message: "Moving conversations from All Mail to the Trash..."
// @author		Yokhannan
// @homepage	
// @timestamp   1365007781
// @version     1.0.0
// @date 		2013-04-03
// @include		http*://mail.google.com/*
// ==/UserScript==

addJS_Node (null, null, overrideConfirmAlert);

function overrideConfirmAlert () {
    window.confirm = function alert (message) {
        return true;
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