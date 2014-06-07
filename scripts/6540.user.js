// Clear Radio Button
// version 0.1 BETA!
// 2006-11-28
// by Jim Biancolo
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Show Cell Headers", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Clear Radio Button
// @namespace     http://www.biancolo.com
// @description   When clicking on a selected radio button, this script will clear it
// @include       *
// ==/UserScript==

(function() {

  var currRadioRef = null;
  var currRadioVal = null;

  function clearRadio(event) {
    var t = event.target;

    if (isRadio(t)) {
      if ((currRadioRef==t) && currRadioVal) {
        t.checked = false;
        currRadioRef = null;
      }
    }
  }

  function getRadioState(event) {
    var t = event.target;
    
    if (isRadio(t)) {
      currRadioRef = t;
      currRadioVal = t.checked;
    }
  }

  function isRadio(ctrl) {
    return (ctrl.tagName.toUpperCase() == "INPUT" && ctrl.type == "radio");
  }

  document.documentElement.addEventListener("mousedown", getRadioState, true);
  document.documentElement.addEventListener("click", clearRadio, true);

})();

