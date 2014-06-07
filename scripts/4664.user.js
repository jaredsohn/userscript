// Digg Reply to Reply
// version 2.01
// 2006-07-13
// Copyright (c) 2006, David Bendit
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Digg Reply to Reply", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Digg Reply to Reply
// @namespace     http://www.ibendit.com/diggReplytoReply.user.js
// @description   Adds reply links to subcomments (only works in Digg v3)
// @include       http://digg.com/*
// @include       http://www.digg.com/*
// ==/UserScript==

var replyComments = document.getElementsByTagName('ol')[0].getElementsByTagName('ol');
var parentIDs = [];
var parentLinkCounter = 0;
var parentLinks = [];
var replyLinks = [];
var userNames = [];
var replies = [];
var repliesCounter = 0;
var parentComments = [];
for (var i = 0; i < replyComments.length; i++)
{
	parentIDs[i] = replyComments[i].parentNode.id;
	for (var j = 0; j < replyComments[i].parentNode.childNodes.length; j++)
	{
		if (replyComments[i].parentNode.childNodes[j].id == 'cbody' + parentIDs[i].substr(1))
		{
			for (var k = 0; k < replyComments[i].parentNode.childNodes[j].childNodes.length; k++)
			{
				if (replyComments[i].parentNode.childNodes[j].childNodes[k].id == 'cbody-inside-' + parentIDs[i].substr(1))
				{
					for (var m = 0; m < replyComments[i].parentNode.childNodes[j].childNodes[k].childNodes.length; m++)
					{
						if (replyComments[i].parentNode.childNodes[j].childNodes[k].childNodes[m].id == 'c-reply-wrapper')	
						{
							parentLinks[parentLinkCounter] = replyComments[i].parentNode.childNodes[j].childNodes[k].childNodes[m].firstChild;
							parentLinkCounter++;
						}
					}
				}
			}
		}
	}
}
if (typeof parentLinks == 'undefined')
{
	return;
}
for (var i = 0; i < replyComments.length; i++)
{
	for (var j = 0; j < replyComments[i].getElementsByTagName('li').length; j++)
	{
		replies[repliesCounter] = replyComments[i].getElementsByTagName('li')[j];
		userNames[repliesCounter] = replies[repliesCounter].firstChild.firstChild.firstChild.getAttribute('alt');
		replyLinks[repliesCounter] = parentLinks[i].cloneNode(true);
		parentComments[repliesCounter] = document.createElement('a');
		parentComments[repliesCounter].href = document.URL.split('#')[0] + '#' + parentIDs[i];
		parentComments[repliesCounter].textContent = '[Parent Comment]';
		parentComments[repliesCounter].id = 'reply-reply';
		parentComments[repliesCounter] = document.createElement('p').appendChild(parentComments[repliesCounter]);
		parentComments[repliesCounter].setAttribute('class', 'c-reply-info');
		repliesCounter++;
	}
}
for (var i = 0; i < replies.length; i++)
{
	replyLinks[i].setAttribute('onclick', "document.getElementById('comment').value = '@' + '"+userNames[i]+"' + ':\\n\\n';" + replyLinks[i].getAttribute('onclick').replace(/\, '.*\'\)/,", '" + userNames[i] + "')"));
	var tempVar = parentComments[i];
	replyLinks[i].addEventListener('click', addParentLink, false);
	replies[i].appendChild(replyLinks[i]);
}

function addParentLink()
{
	if (document.getElementById('reply-reply'))
		document.getElementById('cforminfo').parentNode.removeChild(document.getElementById('reply-reply'));
	var i;
	for (i = 0; i < replies.length; i++)
	{
		if (this == replyLinks[i])
		{
			break;
		}
	}
	document.getElementById('cforminfo').parentNode.insertBefore(parentComments[i], document.getElementById('cforminfo').parentNode.childNodes[2].nextSibling);
}
