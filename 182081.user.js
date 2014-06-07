// ==UserScript==
// @name        Google Unchecked "Stay Signed in" (MBB6x6lRMLPlVIdo)
// @namespace   https://userscripts.org/scripts/182081
// @description Nov 2013 Unchecks Google login "Stay Signed in" for use with multiple accounts, Gmail, or whatever.
// @include     https://accounts.google.com/ServiceLogin*
// @version     1
// @grant       none
// ==/UserScript==

function killPersistents(element){
    var ePersist = document.getElementById(element);
    if(ePersist.tagName.toLowerCase() == "input" && ePersist.checked == true)
    {
        ePersist.checked = false;
        ePersist.value = "no";
        ePersist = null;
        return;
    }
    ePersist = null;
    return; 
}
window.setTimeout(killPersistents("PersistentCookie"),1*1000);