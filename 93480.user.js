// ==UserScript==
// @name           ING Direct - Auto Hide Typing
// @namespace      http://ing.direct.auto.select.hide.typing/kepp
// @description    Auto-sets the checkboxes on ING Direct to hide typing during login
// @include        https://secure.ingdirect.com/myaccount/INGDirect.html?command=displayLogin
// @include        https://secure.ingdirect.com/myaccount/INGDirect/login.vm*
// @include        https://secure.ingdirect.com/myaccount/INGDirect/security_questions.vm
// ==/UserScript==

(function() {

  function $id(id) {
    return document.getElementById(id);
  }

  function simulateClick(element) {
    var event = document.createEvent("MouseEvents");
    event.initMouseEvent("click", true, true, null, 0, 0, 0, 0, 0,
                         false, false, false, false, 0, null);
    element.dispatchEvent(event);
  }

  var hideChk = $id("hideMyTyping") || $id("hidecheckbox");
  if (hideChk) {
    simulateClick(hideChk);
  }
  
}());