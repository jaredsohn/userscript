// ==UserScript==
// @name            Setlink.us skipper FoxySpeed
// @description     Automatically redirects to the link or show the links
// @version        1.0
// updateURL       http://userscripts.org/scripts/source/399648.meta.js
// @updateURL      http://userscripts.org/scripts/source/399648.meta.js
// @downloadURL    http://userscripts.org/scripts/source/399648.user.js
// @author         Ismail Iddakuo
// @Original-s-    1.0 http://userscripts.org/scripts/show/170542
// ==/UserScript==

lnkType = window.location.pathname.split("/")[1]; // Get the path of the website

if (lnkType == "t") { // BBCode type link
    usrCode = document.getElementsByClassName("tdlinks")[0].innerHTML; // Get the BB code
    document.body.innerHTML = usrCode; // Only display it
}

if (lnkType == "p") { // Protected link
    usrLnk = document.getElementsByClassName("dlinks");
    if (usrLnk.length == 2) { // If there is only one link (first dlinks is the protected link)
        document.location.href = usrLnk[1].getElementsByTagName("a")[0].href;
    } else {
        usrLnks = document.getElementsByClassName("links-container")[1].innerHTML; // First one is protected link
        document.body.innerHTML = usrLnks;
    }
}

if (lnkType == "d") { // Auto-redirect link
    unsafeWindow.time_out = 1; // The script sets it to -1 and then skips if == 0
}

