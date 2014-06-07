// ==UserScript==
// @name          Popup, Popunder Stopper
// @namespace     localhost
// @description   Disable popunder and popup windows.
// ==/UserScript==

unsafeWindow.open = function () {};

return;