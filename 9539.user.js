// ==UserScript==
// @name           bloggerkeys
// @namespace      http://www.physics.cornell.edu/~shicks/
// @description    Removes the Ctrl+D->Save Draft keybinding in Blogger.
// @include        http://www.blogger.com/post-edit.g*
// ==/UserScript==

var oldSetKeysetByEvent = unsafeWindow.setKeysetByEvent;
unsafeWindow.setKeysetByEvent = function (e) {
  oldSetKeysetByEvent(e);
  unsafeWindow.CTRL_D = null;
}