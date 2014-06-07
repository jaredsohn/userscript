// ==UserScript==
// @name        ProjectPlanbordStandupHelper
// @namespace   ppb
// @description ProjectPlanbordStandupHelper
// @include     https://yourhosting.projectplanbord.nl/account/team_overview?show_users=*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require     http://jp.yhdev.nl/jumptest/jquery.mapkey.js
// @require     http://demos.flesler.com/jquery/scrollTo/js/jquery.scrollTo-min.js
// @version     1
// ==/UserScript==

$(document).ready(function()
{
	var itemJumps = $(".row_seperator,#footer");
	var index = 0;
	$(function(){
	  $.mapKey(".", nextItem, {direction: "down"});
	  $.mapKey("pgdown", nextItem, {direction: "down"});
	  $.mapKey("pgup", prevItem, {direction: "down"});
	  $.mapKey(",", prevItem, {direction: "down"});
	});
	function nextItem()
	{
		if(index < (itemJumps.length-1))
		{
			index += 1;
			$.scrollTo(itemJumps[index], {speed:1100, easing:'swing', offset:-30});
		}
		else
		{
			index = -1;
			nextItem();
		}
	}
	function prevItem()
	{
		if(index > 0)
		{
			index -= 1;
			$.scrollTo(itemJumps[index], {speed:1100, easing:'swing', offset:-30});
		}
		else
		{
			index = itemJumps.length-1;
			$.scrollTo(itemJumps[index], {speed:1100, easing:'swing', offset:-30});
		}
	}
});
