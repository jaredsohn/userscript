// ==UserScript==
// @name        Kick every member of a Steam Community Group
// @namespace   http://userscripts.org/scripts/show/152944
// @description Starts kicking every member of a Steam Community Group as soon as the 'Manage group members' page is loaded
// @include     http://steamcommunity.com/groups/*/membersManage*
// @version     1
// @grant       none
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// ==/UserScript==

$(window).load(function() {
	var strArray = $('img[onclick^="ManageMembers_Kick("]:first').attr('onclick').split("'", 2);
	if (strArray != null) {
		var form = document.forms['kick_form'];
		form.elements['memberId'].value = strArray[1];
		form.submit();
	}
});