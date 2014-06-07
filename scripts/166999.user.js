// ==UserScript==
// @name           Replace onsubmit
// @description    Replaces onsubmit attributes from forms
// @include        *

// ==/UserScript==
var forms = document.evaluate("//form[@onsubmit]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var formname = null;
var formid = null;
var formaction = null;
var formmethod = null;
var formonsubmit = null;

for (var i = 0; i < forms.snapshotLength; i++) {
    formname = forms.snapshotItem(i).name;
    formid = forms.snapshotItem(i).id;
    formaction = forms.snapshotItem(i).action;
    formmethod = forms.snapshotItem(i).method;
    formonsubmit = forms.snapshotItem(i).onsubmit;

    formonsubmit = prompt("Please, input the onsubmit attribute for the form with the following attributes:\r\nname = " + formname + "\r\nid = " + formid + "\r\naction = " + formaction + "\r\nmethod = " + formmethod + "\r\nonsubmit = " + formonsubmit + "\r\nor Cancel to remove it:", forms.snapshotItem(i).getAttribute("onsubmit"));
    if (formonsubmit != null) {
        forms.snapshotItem(i).setAttribute("onsubmit", formonsubmit);
    } else {
        forms.snapshotItem(i).removeAttribute("onsubmit");
    }
}
