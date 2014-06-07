// ==UserScript==
// @name        BSE better block
// @namespace   http://localhost
// @description fix the shitty block function
// @include     http://bleachsoulevolution.com/forum/*
// @version     3
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
        var container = document.getElementById("shoutbox-shouts-table");
    var items = container.getElementsByTagName("tr");
    for (var j = 0; j < items.length; j++) {
        var blocked = items[j].getElementsByTagName("span");
        for (var k =0; k<blocked.length; k++) {
            if (blocked[k].className == "desc") {
                items[j].style.display = "none";
            }
        }
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
    GM_addStyle ( (<><![CDATA[
        .post_ignore {
        display: none;
        }
        ]]></>).toString () );