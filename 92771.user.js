// ==UserScript==
// @name           Reddit Login Focus
// @namespace      http://www.reddit.com/user/KeyboardGunner/
// @include        http://www.reddit.com/*
// ==/UserScript==

$(document).ready(function() {
	if ($("input[name='user']").length > 0){
		$("input[name='user']").focus();
	}
});