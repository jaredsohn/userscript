// ==UserScript==
// @name        AllowPageClose
// @namespace   http://userscripts.org/users/132107
// @description because I'd rather hit ctrl+shift+t and re-enter shit
// @version     1
// @grant       none
// ==/UserScript==

var closeDisableIterations = 0;
var tamperingDetected = false;
function disableCloseInterception()
{
    if(unsafeWindow.onbeforeunload != null)
        tamperingDetected = true;
    unsafeWindow.onbeforeunload=null; //because FUCK YOU i want to close the fucking window
    if(tamperingDetected)
    {
        setTimeout(disableCloseInterception, 1000);
        return;
    }
    if(closeDisableIterations < 10)
    {
        closeDisableIterations++;
        setTimeout(disableCloseInterception, closeDisableIterations * 100);
    }
    //otherwise, it's probably ok.
}
disableCloseInterception();