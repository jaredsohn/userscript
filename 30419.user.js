// ==UserScript==
// @name           Twitter Enhancements: Press Enter to Send Update
// @namespace      http://eden.com
// @description    Add keyboard shortcut, Enter, to send out update
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @author         Ziru
// ==/UserScript==

var statusElem = document.getElementById('status');
if (statusElem) {
  document.addEventListener('keydown', function(evt) {
    if ((evt.keyIdentifier == 'Enter' || evt.keyCode == evt.DOM_VK_RETURN) && !evt.shiftKey) { // Hold shift to put in a new line
      if(statusElem.value != "") // Refuse to submit empty text
        statusElem.form.submit();
      evt.preventDefault(); // Don't insert new line
    }
  }, false);
}