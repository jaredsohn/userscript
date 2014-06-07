// ==UserScript==
// @name           AUTO Click OK
// @namespace      UserScripts
// @description    Auto Click on all Alert Messages.
// @include        https://*.irctc.co.in/*
// ==/UserScript==

unsafeWindow.confirm = function(ok){return true;};
unsafeWindow.alert=function(ok){}