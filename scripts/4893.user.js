// ==UserScript==
// @name          PrEmail
// @namespace     http://menno.b10m.net/greasemonkey/
// @description   Pre-fill 'email' fields with user+domain@yourdoma.in addresses
// @include       http://*
// @include       https://*
// ==/UserScript==
//
// Idea gracefully stolen from:
//    "Dont Require Email" <http://userscripts.org/scripts/show/563>
// Thanks Adam!
//
// See http://menno.b10m.net/greasemonkey/premail.html for configuration
// and installation!

// Configure
var user   = 'your username';
var domain = 'your domainname';
////////////////////////////////////////////////////////////////////////////////

(function(){
   
var allFields, thisField;
allFields = document.evaluate(
    "//input[@type='text']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

var d = document.domain;
    d = d.replace(/^www\./,'');

for (var i = 0; i < allFields.snapshotLength; i++) {
    thisField = allFields.snapshotItem(i);
    if(thisField.name == 'email' && thisField.value == '') {
      thisField.value = user+'+'+d+'@'+domain;
    }
}

})();
