// ==UserScript==
// @name          PrEmail
// @namespace     http://menno.b10m.net/greasemonkey/
// @description   Pre-fill 'email' fields with user+domain@yourdoma.in addresses
// @include       http://https://www.paypal.com/cgi-bin/webscr

// ==/UserScript==
//
// Idea gracefully stolen from:
//    "Dont Require Email" <http://userscripts.org/scripts/show/563>
// Thanks Adam!
//
// See http://menno.b10m.net/greasemonkey/premail.html for configuration
// and installation!

// Configure
var user   = 'jim';
var domain = 'gmail.com';
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
    if(thisField.name == 'first_name' && thisField.value == '') {
      thisField.value = Jim;
    }
for (var i = 0; i < allFields.snapshotLength; i++) {
    thisField = allFields.snapshotItem(i);
    if(thisField.name == 'last_name' && thisField.value == '') {
      thisField.value = bean;
    }
for (var i = 0; i < allFields.snapshotLength; i++) {
    thisField = allFields.snapshotItem(i);
    if(thisField.name == 'credit_card_type' && thisField.value == ' ') {
      thisField.value = M;
    }

for (var i = 0; i < allFields.snapshotLength; i++) {
    thisField = allFields.snapshotItem(i);
    if(thisField.name == 'email' && thisField.value == '') {
      thisField.value = user+'+'+d+'@'+domain;
    }
}
for (var i = 0; i < allFields.snapshotLength; i++) {
    thisField = allFields.snapshotItem(i);
    if(thisField.name == 'cc_number' && thisField.value == '') {
      thisField.value = 123456789;
    }
}
for (var i = 0; i < allFields.snapshotLength; i++) {
    thisField = allFields.snapshotItem(i);
    if(thisField.name == 'expdate_month' && thisField.value == '3') {
      thisField.value = user+'+'+d+'@'+domain;
    }
}


})();