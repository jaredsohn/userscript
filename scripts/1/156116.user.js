// ==UserScript==
// @name           Old youtube youtube.com/pacik19
// @description    Add cokies and backup theme 
// @include        http://*.youtube.com/*
// @include        https://*.youtube.com/*
// @version        1.1
// ==/UserScript==
document.cookie="VISITOR_INFO1_LIVE=qDpUsBNO0FY; expires=Thu, 2 Aug 3025 20:47:11 UTC;path=/;domain=.youtube.com";
unsafeWindow._items = new Array ();
unsafeWindow._items ['messages'] = 'Personal Messages';
unsafeWindow._items ['comments'] = 'Comments';
unsafeWindow._items ['invites'] = 'Friend Requests';
unsafeWindow._items ['responses'] = 'Video Responses';
unsafeWindow._counts = '';
unsafeWindow._total = -1;

function hideMenuItem (menuItem)
{
	return function () {GM_setValue ('hide/' + menuItem, '1'); document.getElementById ('span-' + menuItem).style.display = 'none'; refreshTotal ();};
}

function restoreAll ()
{
	for (item in unsafeWindow._items)
	{
		GM_setValue ('hide/' + item, '');
		document.getElementById ('span-' + item).style.display= '';
	}
	refreshTotal ();
}

function toggleElement (el, refresh)
{
	return function () {var hidden = itemHidden (el); if (refresh) hidden = hidden ? '' : '1'; GM_setValue ('hide/' + el, hidden ? '' : '1'); document.getElementById (el).style.display = hidden ? '' : 'none'; var link = document.getElementById ('toggle-' + el); if (link) link.textContent = hidden ? '-' : '+';};
}

function count (responseString, folder)
{
	var match = responseString.match (new RegExp ('"' + folder + '": ([0-9]*)')) [1];
	return parseInt (match, 10);
}

function refreshTotal ()
{
	var shown = 0;
	for (var item in unsafeWindow._items) if (! itemHidden (item)) shown += count (unsafeWindow._counts, item);
	total = unsafeWindow._total;
	document.getElementById ('span-inbox-count').innerHTML = (total ? (' (<span style="color: #999999">' + ((shown ? ('<span style="color: #000000"><b>' + shown + '</b></span>' + ((total - shown) ? ' + ' : '')) : '') + ((total - shown) ? (total - shown) + ' hidden' : '')) + '</span>)') : '');
}

function getToken (responseString)
{
//	var match = responseString.match (/'XSRF_TOKEN': '([^']*)/) [1];
//	var match = responseString.match (/inbox.initialize[^']*'session_token=([^']*)/) [1];
	var match = responseString.match (/ *'session_token=([^']*).*initEllipsis/) [1];
	return match;
}

function itemHidden (menuItem)
{
	return GM_getValue ('hide/' + menuItem, false);
}

function spanSmall ()
{
	var small = document.createElement ('span');
	small.style.fontSize = '75%';
	small.style.position = 'relative';
	small.style.bottom = '0.15em';
	return small;
}

spam_div = document.getElementById ('feedmodule-TOP');
if (spam_div)
	spam_div.parentNode.removeChild (spam_div);

spam_div = document.getElementById ('homepage-sidebar-ads');
if (spam_div)
	spam_div.parentNode.removeChild (spam_div);

var divs = document.getElementsByTagName ('div');
for (var i = 0; i < divs.length; i++)
{
	if (divs [i].className == 'top-videos-module ytg-box')
		divs [i].style.display = 'none';
}

inbox_container = document.getElementById ('video-sidebar');
if (inbox_container.parentNode.style.display == 'none')
{
	new_pos = inbox_container.parentNode.parentNode;
	inbox_container = document.createElement ('div');
	inbox_container.style.cssFloat = 'right';
	new_pos.insertBefore (inbox_container, new_pos.firstChild);
}

var parent = document.getElementById ('recommended-videos');
if (parent)
parent = parent.previousSibling;
if (parent)
parent = parent.previousSibling;
if (parent)
{
	var small = spanSmall ();
	var link = document.createElement ('a');
	link.id = 'toggle-recommended-videos';
	link.href = '#';
	link.textContent = 'x';
	link.addEventListener ('click', toggleElement ('recommended-videos'), false);
	small.appendChild (document.createTextNode ('['));
	small.appendChild (link);
	small.appendChild (document.createTextNode (']'));
	parent.appendChild (small);
}
toggleElement ('recommended-videos', true) ();

if (inbox_container)
{
	var secure = false;
	if (window.location.href.substr (0, 5) == "https")
		secure = true;
	var wdivp = document.getElementById ('video-sidebar');
	var deleteTo = document.getElementById ('recommended-videos');
	for (var spam = wdivp.lastChild; spam != deleteTo; spam = wdivp.lastChild)
		wdivp.removeChild (spam);
	var wdiv = document.createElement ('div');
	wdiv.innerHTML = 'Loading inbox...';
	inbox_container.insertBefore (wdiv, inbox_container.firstChild);
	inbox_container.insertBefore (document.createElement ('hr'), wdiv.nextSibling);
	var base = 'http' + (secure ? 's' : '') + '://www.youtube.com/inbox?folder=messages&action_message=1#';
	var req1 = new XMLHttpRequest ();
	var req2 = new XMLHttpRequest ();
	req1.onreadystatechange = function ()
	{
		if (req1.readyState == 4 && req1.status == 200)
		{
			req2.onreadystatechange = function ()
			{
				if (req2.readyState == 4 && req2.status == 200)
				{
					var counts = req2.responseText;
					unsafeWindow._counts = counts;
					var cur_count, total, shown = 0;
					total = count (counts, 'inbox');
					var content = document.getElementById ('content');
					var div2 = content.getElementsByTagName ('div') [0];
					if (div2.style.display == 'block')
						wdiv.innerHTML = '<div style="border-bottom: 1px solid #cccccc; color: #000000; font-size: 16px; font-weight: normal; padding-bottom: 4px">Inbox <span id="span-inbox-count"></span></div>';
					else
					{
						wdiv.innerHTML = '';
						var hdrInboxText = '<div style="font-size: 16px; font-weight: normal; padding-bottom: 4px">| Inbox <span id="span-inbox-count"></span></div>';
						try
						{
							var div1 = document.getElementById ('feed-main-all').getElementsByClassName ('feed-header') [0];
							div1.parentNode.removeChild (div1);
							div2.insertBefore (div1, div2.firstChild);
							div1.style.paddingLeft = '206px';
							div1.style.marginBottom = '8px';
							content.getElementsByClassName ('guide-container') [0].style.marginTop = '-58px';
							div3 = div2.getElementsByClassName ('feed-header') [0].getElementsByClassName ('feed-header-subscribe') [0];
							div3.innerHTML = '<div style="float: left">' + div3.innerHTML + '</div>';
							hdrInbox = document.createElement ('div');
							hdrInbox.id = 'inbox-header';
							hdrInbox.style.cssFloat = 'right';
							hdrInbox.style.marginLeft = '4px';
							hdrInbox.style.paddingLeft = '4px';
							hdrInbox.style.marginRight = '250px';
							hdrInbox.innerHTML = hdrInboxText;
							div3.appendChild(hdrInbox);
						}
						catch (ex)
						{
							wdiv.innerHTML = hdrInboxText;
						}
					}
					var items = unsafeWindow._items;
					for (var item in items)
					{
						var lspan = document.createElement ('span');
						lspan.id = 'span-' + item;
						var small = spanSmall ();
						var link = document.createElement ('a');
						link.href = '#';
						link.textContent = 'x';
						link.addEventListener ('click', hideMenuItem (item), false);
						small.appendChild (document.createTextNode ('['));
						small.appendChild (link);
						small.appendChild (document.createTextNode ('] '));
						lspan.appendChild (small);
						cur_count = count (counts, item);
						if (itemHidden (item)) lspan.style.display = 'none'; else shown += cur_count;
						var link = document.createElement ('a');
						link.href = base + item + '/1';
						link.innerHTML = (cur_count ? '<b>' : '') + items [item] + ' (' + cur_count + ')' + (cur_count ? '</b>' : '');
						lspan.appendChild (link);
						lspan.appendChild (document.createElement ('br'));
						wdiv.appendChild (lspan);
					}
					unsafeWindow._total = total;
					refreshTotal ();
					var align = document.createElement ('div');
					align.align = 'right';
					var small = document.createElement ('span');
					small.style.fontSize = '75%';
					small.style.position = 'relative';
					small.style.bottom = '0.15em';
					var link = document.createElement ('a');
					link.href = '#';
					link.textContent = 'reset';
					link.addEventListener ('click', restoreAll, false);
					small.appendChild (document.createTextNode ('['));
					small.appendChild (link);
					small.appendChild (document.createTextNode (']'));
					align.appendChild (small);
					wdiv.appendChild (align);
				}
			}
			req2.open ('POST', 'http' + (secure ? 's' : '') + '://www.youtube.com/inbox_ajax?action_ajax=1&type=display_messages&folder=messages', true);
			req2.setRequestHeader ('Content-Type', 'application/x-www-form-urlencoded');
			req2.send ('session_token=' + getToken (req1.responseText) + '&messages=[{"type":"display_messages","request":{"folder":"messages","start":0,"num":20,"messages_deleted":[],"messages_read":[]}}]');
		}
	}
	req1.open ('GET', base, true);
	req1.send ();
}