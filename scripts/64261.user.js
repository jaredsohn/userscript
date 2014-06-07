// ==UserScript==
// @name           Facebook Ignore All Requests
// @namespace      IgnoreAllRequests
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @include        http://www.facebook.com/reqs.php
// @version        1.0
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// ==/UserScript==

$(document).ready(function() {
	if($("input[name=IgnoreAllUsersRequests]").length==0) {
		$(".UIRequestBox").before('<div><input type="button" name="IgnoreAllUsersRequests" id="IgnoreAllUsersRequests" value="Ignore All Requests" /></div>');
		
		$("#IgnoreAllUsersRequests").click(function() {
			$("input[name=actions[reject]]").click();
		});
	}
});