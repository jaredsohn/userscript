// ==UserScript==
// @name          RemoveHTTPFromForms
// @namespace     http://www.timeblog.net/
// @description   Whereever there is a text field in a form prefilled with "http://", that string is removed. Makes Copy+Paste easier!
// @include       http://*
// @include       https://*
// ==/UserScript==
//
// Joerg Rings
//
// Basis of this script taken from <http://userscripts.org/scripts/show/4893>

(function(){
   
var allFields, thisField;
allFields = document.evaluate(
    "//input[@type='text']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allFields.snapshotLength; i++) {
    thisField = allFields.snapshotItem(i);
    if(thisField.value == 'http://' || thisField.value == 'http:') {
      thisField.value = '';
    }
}

})();