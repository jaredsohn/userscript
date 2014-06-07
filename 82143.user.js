// ==UserScript==
// @name           Highlight Linden Responses
// @namespace      madgeekonline.com
// @include        http://jira.secondlife.com/browse/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var SHOW_LINDEN_ONLY = false;

if (SHOW_LINDEN_ONLY)
{
	$('#issue_actions_container br').remove();
	$('.action-body').append('<br />');
}

$('div .action-details a').each(function()
{
	var cur_id = $(this).attr('id');
	if (cur_id)
	{
		var user_name = $(this).html().toLowerCase();
		if (~user_name.search(/linden/))
		{
			$(this).parent().css('background-color', '#ffaaaa');
		}
		else if (SHOW_LINDEN_ONLY)
		{
			$(this).parent().parent().parent().hide();
		}
	}
})