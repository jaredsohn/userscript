// ==UserScript==
// @name           Override onsubmit
// @description    Overrides onsubmit attributes from forms, overwriting their values by "return true;"
// @include        *

// ==/UserScript==
var forms = document.evaluate("//form[@onsubmit]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < forms.snapshotLength; i++) forms.snapshotItem(i).setAttribute("onsubmit", "return true;");
