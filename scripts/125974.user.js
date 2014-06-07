// ==UserScript==
// @name           confirm
// @namespace      *
// @include        http://prodgame*.lordofultima.com/*/index.aspx*
// ==/UserScript==
setTimeout('eval("window.confirm = function() {return false;}")', 2000);
setTimeout('eval("window.onbeforeunload = function() {return true;}")', 2000);