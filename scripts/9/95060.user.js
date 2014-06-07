// ==UserScript==
// @name           youtube.com tweak
// @include        http://*.youtube.com/*
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

var spam_div, spam_names = new Array ('ASO', 'FEA', 'PRO');
for (var x = 0; x < spam_names.length; x ++)
{
	spam_div = document.getElementById('hp-sidebar-' + spam_names [x]);
	if (spam_div)
	{
		spam_div = spam_div.parentNode;
		spam_div.parentNode.removeChild (spam_div);
	}
}

if (document.getElementById ('homepage-whats-new'))
{
	mainDiv = document.getElementById ('homepage-main-content');
	if (mainDiv)
		mainDiv.innerHTML = mainDiv.innerHTML.replace ('Welcome to the new YouTube homepage.', 'Welcome to the <s>new</s> YouTube homepage <b>as it was meant to be!</b>');
	var base = 'http://www.youtube.com/inbox?folder=messages&action_message=1#';
	GM_xmlhttpRequest ({
		method: 'get',
		url: base,
		onload: function (e) {
			GM_xmlhttpRequest ({
				method: 'post',
				url: 'http://www.youtube.com/inbox?action_ajax=1&folder=messages',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				data: 'session_token=' + getToken (e.responseText) + '&messages=[{"type":"display_messages","request":{"folder":"messages","start":0,"num":20,"messages_deleted":[],"messages_read":[]}}]',
				onload: function (f) {
					var counts = f.responseText;
					var cur_count;
					var wdiv = document.getElementById ('homepage-whats-new');
					cur_count = count (counts, 'inbox');
					wdiv.innerHTML = '<div class="module-title">Inbox' + (cur_count ? ' <b>(' + cur_count + ')</b>' : '') + '</div>';
					wdiv.innerHTML += '<br />';
					cur_count = count (counts, 'messages');
					wdiv.innerHTML += (cur_count ? '<b>' : '') + '<a href="' + base + 'messages">Personal Messages (' + cur_count + ')</a>' + (cur_count ? '</b>' : '');
					wdiv.innerHTML += '<br />';
					cur_count = count (counts, 'videos');
					wdiv.innerHTML += (cur_count ? '<b>' : '') + '<a href="' + base + 'videos">Shared With You (' + cur_count + ')</a>' + (cur_count ? '</b>' : '');
					wdiv.innerHTML += '<br />';
					cur_count = count (counts, 'comments');
					wdiv.innerHTML += (cur_count ? '<b>' : '') + '<a href="' + base + 'comments">Comments (' + cur_count + ')</a>' + (cur_count ? '</b>' : '');
					wdiv.innerHTML += '<br />';
					cur_count = count (counts, 'invites');
					wdiv.innerHTML += (cur_count ? '<b>' : '') + '<a href="' + base + 'invites">Friend Invites (' + cur_count + ')</a>' + (cur_count ? '</b>' : '');
					wdiv.innerHTML += '<br />';
					cur_count = count (counts, 'responses');
					wdiv.innerHTML += (cur_count ? '<b>' : '') + '<a href="' + base + 'responses">Video Responses (' + cur_count + ')</a>' + (cur_count ? '</b>' : '');
				}
			});}
	});
}