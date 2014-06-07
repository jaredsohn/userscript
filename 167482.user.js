// ==UserScript==
// @name            Adds the green layout back on yahoo
// @description	    yahoo green background back
// @namespace       JamesTodd
// @include         http://answers.yahoo.*/*
// @include         http://*.answers.yahoo.com/
// ==/UserScript==
(function() {
var css = "body{background: #90EE90}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
	}
})();