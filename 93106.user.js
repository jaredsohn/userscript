// ==UserScript==
// @name           Do away with ok / cancel
// @namespace      salmantravels@ymail.com
// @description    Stop all those annoying confirmation windows with ok/cancel...
// @include        https://www.itzcash.com says:
// ==/UserScript==


unsafeWindow.confirm = function(ok){return true;};
unsafeWindow.alert=function(ok){}