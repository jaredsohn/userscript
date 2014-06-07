// ==UserScript==
// @name       Selfbank Script
// @namespace  http://userscripts.org/users/516920
// @version    0.1
// @description  Disable virtual keyboard on Selfbank
// @match      https://www.selfbank.es/login.phtml*
// @grant    GM_addStyle
// @copyright      2013, Carlos Garces
// ==/UserScript==
/*- The @grant directive is needed to work around a design change
    introduced in GM 1.0.   It restores the sandbox.
*/

var password = document.getElementById('inputPassword');
password.readOnly = false;
password.setAttribute("autocomplete","on");

//-- addJS_Node is a standard(ish) function
function addJS_Node (text, s_URL, funcToRun, runOnLoad) {
    var D                                   = document;
    var scriptNode                          = D.createElement ('script');
    if (runOnLoad) {
        scriptNode.addEventListener ("load", runOnLoad, false);
    }
    scriptNode.type                         = "text/javascript";
    if (text)       scriptNode.textContent  = text;
    if (s_URL)      scriptNode.src          = s_URL;
    if (funcToRun)  scriptNode.textContent  = '(' + funcToRun.toString() + ')()';

    var targ = D.getElementsByTagName ('head')[0] || D.body || D.documentElement;
    targ.appendChild (scriptNode);
}

window.addEventListener ("load", function (e) {
    addJS_Node ("$('inputPassword').removeEvents('keypress');");
}, false);

