// ==UserScript==
// @name          Rally yesman
// @namespace     http://code.leadmediapartners.com/
// @description   Say goodbye to annoying "would you like to extend your session?" confirmations in rally.  Just say yes for me.
// @author        Tim Harper
// @homepage      http://code.leadmediapartners.com/
// @include       *community.rallydev.com*

// ==/UserScript==

confirm_without_rally_auto_confirm_hook = confirm;
confirm = function(msg) {
  if (msg == "Your session is about to expire, would you like to extend your session?")
    return true;
  else
    return confirm_without_rally_auto_confirm_hook(msg);
}