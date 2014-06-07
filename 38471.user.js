// ==UserScript==
// @name           Filmtipset Hotkeys
// @namespace      DScripts
// @include        http://www.filmtipset.se/forum.cgi*
// ==/UserScript==

var items;
var cursor;
var isactive;
var repliesToSelf;

function start()
{
	items = document.getElementsByClassName('headnew');
	cursor = -1;
	isactive = true;
	repliesToSelf = [];

	markupRepliesToSelf();
	checkFocus((document.forms[0].wrappedJSObject || document.forms[0])['search_value']);

	window.addEventListener('keydown', keydn, false);
}

function markupRepliesToSelf()
{
	var user = getUsername();
	if(user)
	{
		for(i = 0; i < items.length; i++)
		{
			if(isReplyToUser(items[i], user))
			{
				repliesToSelf.push(i);
			}
		}
	}
}

function isReplyToUser(item, username)
{
	var ml = unsafeWindow.messList
	item = item.wrappedJSObject || item;

	var ownId;
	for(x = 0; x < ml.length; x++)
	{
		if(ml[x].id == parseInt(item.id.substring(4)))
		{
			ownId = x;
			break;
		}
	}

	if(!ownId || ml[ownId].depth == 0)
		return false;

	depth = ml[ownId].depth - 1;

	var prevItem;
	for(x = ownId-1; x >= 0; x--)
	{
		if(ml[x].depth == depth)
		{
			prevItem = ml[x];
			break;
		}
	}

	if(!prevItem)
		return false;

	var h = document.getElementById('head'+prevItem.id);
	if(!h)
		return false;

	var members = h.getElementsByClassName('member');
	if(!members || !members[0])
		return false;

	return members[0].innerHTML == username;	
}

function getUsername()
{
	var f = document.forms[0];
	var it = f.nextSibling;
	while(it)
	{
		if(it.nodeType == 1 && it.tagName == "DIV" && it.style.marginTop == '125px' && it.innerHTML.toLowerCase().indexOf('inloggad som') >= 0)
		{
			break;
		}
		it = it.nextSibling;
	}

	if(it)
		return it.getElementsByTagName('div')[0].getElementsByTagName('div')[0].innerHTML;
}

function checkFocus(el)
{
	el.addEventListener('focus', function() { isactive = false; }, false);
	el.addEventListener('blur', function() { isactive = true; }, false);
}

function keydn(event)
{
	if(isactive && document.getElementById('text') == null && cursor < items.length - 1)
	{
		if(event.keyCode == 32)
		{
			cursor++;

			if(event.shiftKey)
			{
				for(cx = 0; cx < repliesToSelf.length; cx++)
				{
					if(repliesToSelf[cx] >= cursor)
					{
						cursor = repliesToSelf[cx];
						break;
					}
				}
			}

			var e = items[cursor];
			e = e.wrappedJSObject || e;
			e.scrollIntoView();

			event.preventDefault();
			event.stopPropagation();
		}

	}
}

start();