// ==UserScript==
// @name           Old YouTube homepage without sponsered ads and stuff
// @namespace      http://halext.org/
// @description    Remove the annoying YouTube spamvertised videos (Trends, Spotlight Videos) and brings the inbox overview back to the home page!
// @include        http://*.youtube.com/*
// @include        https://*.youtube.com/*
// ==/UserScript==

function count (responseString, folder)
{
	var match = responseString.match (new RegExp ('"' + folder + '": ([0-9]*)')) [1];
	return parseInt (match, 10);
}

function getToken (responseString)
{
	var match = responseString.match (/'XSRF_TOKEN': '([^']*)/) [1];
	return match;
}

spam_div = document.getElementById ('feedmodule-TOP');
if (spam_div)
	spam_div.parentNode.removeChild (spam_div);

if (document.getElementById ('homepage-side-content'))
{
	var secure = false;
	if (window.location.href.substr (0, 5) == "https")
		secure = true;
	var wdivp = document.getElementById ('homepage-side-content');
	wdivp.innerHTML = 'Loading inbox...';
	var base = 'http' + (secure ? 's' : '') + '://www.youtube.com/inbox?folder=messages&action_message=1#';
	var req1 = new XMLHttpRequest ();
	var req2 = new XMLHttpRequest ();
	req1.onreadystatechange = function ()
	{
		req2.onreadystatechange = function ()
		{
			var counts = req2.responseText;
			var cur_count;
			var wdiv = document.getElementById ('homepage-side-content');
			cur_count = count (counts, 'inbox');
			wdiv.innerHTML = '<div style="border-bottom: 1px solid #cccccc; color: #000000; font-size: 16px; font-weight: normal; padding-bottom: 4px">Inbox' + (cur_count ? ' <b>(' + cur_count + ')</b>' : '') + '</div>';
			wdiv.innerHTML += '<br />';
			cur_count = count (counts, 'messages');
			wdiv.innerHTML += (cur_count ? '<b>' : '') + '<a href="' + base + 'messages/1">Personal Messages (' + cur_count + ')</a>' + (cur_count ? '</b>' : '');
			wdiv.innerHTML += '<br />';
			cur_count = count (counts, 'videos');
			wdiv.innerHTML += (cur_count ? '<b>' : '') + '<a href="' + base + 'videos/1">Shared With You (' + cur_count + ')</a>' + (cur_count ? '</b>' : '');
			wdiv.innerHTML += '<br />';
			cur_count = count (counts, 'comments');
			wdiv.innerHTML += (cur_count ? '<b>' : '') + '<a href="' + base + 'comments/1">Comments (' + cur_count + ')</a>' + (cur_count ? '</b>' : '');
			wdiv.innerHTML += '<br />';
			cur_count = count (counts, 'invites');
			wdiv.innerHTML += (cur_count ? '<b>' : '') + '<a href="' + base + 'invites/1">Friend Invites (' + cur_count + ')</a>' + (cur_count ? '</b>' : '');
			wdiv.innerHTML += '<br />';
			cur_count = count (counts, 'responses');
			wdiv.innerHTML += (cur_count ? '<b>' : '') + '<a href="' + base + 'responses/1">Video Responses (' + cur_count + ')</a>' + (cur_count ? '</b>' : '');
		}
		req2.open ('POST', 'http' + (secure ? 's' : '') + '://www.youtube.com/inbox?action_ajax=1&folder=messages', true);
		req2.setRequestHeader ('Content-Type', 'application/x-www-form-urlencoded');
		req2.send ('session_token=' + getToken (req1.responseText) + '&messages=[{"type":"display_messages","request":{"folder":"messages","start":0,"num":20,"messages_deleted":[],"messages_read":[]}}]');
	}
	req1.open ('GET', base, true);
	req1.send ();
}
