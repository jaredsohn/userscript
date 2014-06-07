// ==UserScript==
// @name       Codeforces New Message Notifier
// @include    http://codeforces.*
// @exclude    http://codeforces.*/usertalk
// @include    http://*.codeforces.*
// @exclude    http://*.codeforces.*/usertalk
// @version    0.1
// @copyright  2013+, AlienInvaders
// ==/UserScript==

myFirstScript = function()
{
    var talks = document.evaluate("//a[contains(@href,'/usertalk')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for(i=0; i<talks.snapshotLength; i++) {
        var link=talks.snapshotItem(i);
        if((link.innerHTML.substr(link.innerHTML.length-11,link.innerHTML.length)=="new message" || link.innerHTML.substr(link.innerHTML.length-11,link.innerHTML.length)=="ew messages") && confirm("You have "+link.innerHTML+"!"))
        {
            location.href=link.href;
            break;
        }
    }
}

window.onload = myFirstScript;