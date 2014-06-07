// ==UserScript==
// @name        OKC Match Search Range
// @namespace   sms
// @include     http://www.okcupid.com/match?timekey=1&matchOrderBy=SPECIAL_BLEND&use_prefs=1&discard_prefs=1
// @version     1
// @grant       none
// ==/UserScript==

var radius_options = document.getElementById("radius").innerHTML;
document.getElementById("radius").innerHTML = '<option value="5">5 miles</option>' +
'<option value="10">10 miles</option>' +
'<option value="15">15 miles</option>' +
'<option value="20">20 miles</option>' +  radius_options;
