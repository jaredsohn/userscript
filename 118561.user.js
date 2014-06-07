// ==UserScript==
// @name           Stanford classes: confirm submission
// @description    Displays a confirm box after clicking on Submit or Save buttons
// @namespace      http://sepczuk.com
// @include        http://www.db-class.org/*
// @include        http://www.ml-class.org/*
// @downloadURL     https://userscripts.org/scripts/source/118561.user.js
// @updateURL       https://userscripts.org/scripts/source/118561.meta.js
// ==/UserScript==

(function(){
try{
	// support Opera & Firefox
	var $ = (typeof unsafeWindow !== "undefined")?unsafeWindow.jQuery:jQuery;
	
	$('#save_and_submit').click(function(e){if(!confirm("Are you sure to SUBMIT?")) e.preventDefault();})
	$('#save_and_continue').click(function(e){if(!confirm("Are you sure to SAVE?")) e.preventDefault();})
}catch(e){}
})();