// ==UserScript==
// @name           BSNL Submit Form fix
// @namespace      http://balajin.net/
// @description    Fixes the SubmitForm function to use correct variables
// @include        http://portal.bsnl.in/portal/aspxfiles/circle.aspx
// @include        http://portal.bsnl.in/portal/aspxfiles/celloneoutstandingbills.aspx
// @include        http://portal.bsnl.in/MobilePayments/aspxfiles/circle.aspx
// @include        http://portal.bsnl.in/MobilePayments/aspxfiles/celloneoutstandingbills.aspx
// ==/UserScript==

(function() {
window.addEventListener("load", function(e) {
var currentElement = document.getElementById("hdnBID");
currentElement.setAttribute("id", "hdnBId");
var currentElement = document.getElementById("hdnCID");
currentElement.setAttribute("id", "hdnCid");
}, false);
})();