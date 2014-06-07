// ==UserScript==
// @name        BSE Auto District Check
// @namespace   http://localhost
// @description Auto check the users in the districts as soon as you traveled.
// @include     http://bleachsoulevolution.com/travel.php*
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

    if (ContainsString(td.innerHTML, "You are now in District 1 of Karakura Town.")) {
        window.location.href = "http://bleachsoulevolution.com/findplayer.php";
    }
    else if (ContainsString(td.innerHTML, "You are now in District 2 of Karakura Town.")) {
        window.location.href = "http://bleachsoulevolution.com/findplayer2.php";
    }
    else if (ContainsString(td.innerHTML, "You are now in District 3 of Karakura Town.")) {
        window.location.href = "http://bleachsoulevolution.com/findplayer3.php";
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