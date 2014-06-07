// ==UserScript==
// @name        BSE Profile Monitor
// @namespace   http://localhost
// @description Monitor a user's profile page and auto travel to their district.
// @include     http://bleachsoulevolution.com/profile.php*
// @version     1
// @grant	none
// ==/UserScript==
var zGbl_DOM_ChangeTimer = '';
var bGbl_ChangeEventListenerInstalled = false;
window.addEventListener("load", MainAction, false);
function MainAction() {
    if (!bGbl_ChangeEventListenerInstalled) {
        bGbl_ChangeEventListenerInstalled = true;
        /*--- Notes:
        (1) If the ajax loads to a specific node, add this
        listener to that, instead of the whole body.
        (2) iFrames may require different handling.
        */
        document.addEventListener("DOMSubtreeModified", HandleDOM_ChangeWithDelay, false);
    }

    var td = document.getElementById("main");

    if (ContainsString(td.innerHTML, "Current Location: Karakura Town - District 1")) {
        window.location.href = "http://bleachsoulevolution.com/travel.php?travel=Karakura%20Town%20-%20District%201";
    }
    else if (ContainsString(td.innerHTML, "Current Location: Karakura Town - District 2")) {
        window.location.href = "http://bleachsoulevolution.com/travel.php?travel=Karakura%20Town%20-%20District%202";
    }
    else if (ContainsString(td.innerHTML, "Current Location: Karakura Town - District 3")) {
        window.location.href = "http://bleachsoulevolution.com/travel.php?travel=Karakura%20Town%20-%20District%203";
    }
    else {
        window.location.href = window.location.href;
    }
}

function HandleDOM_ChangeWithDelay(zEvent) {
    /*--- DOM changes will come hundreds at a time, we wait a fraction
    of a second after the LAST change in a batch.
    */
    if (typeof zGbl_DOM_ChangeTimer == "number") {
        clearTimeout(zGbl_DOM_ChangeTimer);
        zGbl_DOM_ChangeTimer = '';
    }
    zGbl_DOM_ChangeTimer = setTimeout(function () { MainAction(); }, 100);
}

function ContainsString(text, containsString) {
    if (text.indexOf(containsString) != -1) {
        return true;
    }
    else {
        return false;
    }
}