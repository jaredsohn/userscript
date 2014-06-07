// ==UserScript==
// @name           Myspace ad-page remover
// @namespace      ads
// @description    Removes the ad-page after loggin into myspace
// @include        http://login.myspace.com/index.cfm?fuseaction=ad&*
// ==/UserScript==

var goto = "";
function isIt(i) {
    goto = document.getElementsByTagName("a")[i].href;
    if (goto.match("home.myspace.com") != null) {
        window.location = goto;
    } else {
        isIt(i + 1);
    }
}

isIt(1);