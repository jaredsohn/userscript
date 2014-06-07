// Copyright (c) 2008, Hao Chen
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// Version 0.1 - 2008.06.29
// - adds favicons to Rooms
//
// Contact: detect [at] hotmail [dot] com
//
// ==UserScript==
// @name           Add Favicons to FriendFeed Rooms links
// @namespace      http://userscripts.org/users/44035
// @description    Adds favicons to FriendFeed Rooms sub nav links
// @include        http://friendfeed.com/rooms/*
// ==/UserScript==

var friendfeedUID = null;
var friendfeedMyRooms = null;

function GM_wait() 
{
	if(typeof unsafeWindow.jQuery == 'undefined') 
	{ 
		window.setTimeout(GM_wait,100); 
	}
	else 
	{ 
		$ = unsafeWindow.jQuery; letsJQuery(); 
	}
}
GM_wait();

function getUID()
{
	return $('.body a:contains("me")').attr('href').substr(22);
}

function checkRooms()
{
	if(friendfeedMyRooms == null)
	{
		$.getJSON('http://friendfeed.com/api/user/' + friendfeedUID + '/profile',
			function(json){
				friendfeedMyRooms = json.rooms;
				checkRooms();
			});
	}
	else
	{
		$.each(friendfeedMyRooms, function( n , m ) {
			m.img = "<img src='http://friendfeed.s3.amazonaws.com/pictures-" + m.id.replace(/-/g,'') + "-small.jpg?v=2' border='0' width='18' height='18' onerror='this.src=\"http://friendfeed.com/static/images/group-small.png\"'/>";
		});
		$.each($('#subtabs .l_tab a'), function( n , m ) {
			displayFavicon(m);
		});
	}
}

function displayFavicon(a)
{
	a = $(a);
	for(var i in friendfeedMyRooms)
	{
		if(friendfeedMyRooms[i].url == a.attr('href'))
		{
			a.before(a.clone().css('margin-right','3px').html(friendfeedMyRooms[i].img));
			friendfeedMyRooms.splice(i,1);
			break;
		}
	}
}

function letsJQuery() 
{
	friendfeedUID = getUID();
	checkRooms();
}
