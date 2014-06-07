// ==UserScript==
// @name           Do away with ok / cancel
// @namespace      
// @description    Stop all those annoying confirmation windows with ok/cancel...
// @include        *
// ==/UserScript==


unsafeWindow.confirm = function(){return true;};
unsafeWindow.alert=function(){}
