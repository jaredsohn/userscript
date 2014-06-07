// ==UserScript==
// @name           gamrConnect forum tweaks
// @namespace      GCFT
// @description    Ignore obnoxious users. Know when you've been quoted.
// @downloadURL    https://userscripts.org/scripts/source/468943.user.js
// @include        http://vgchartz.com/*
// @include        http://*.vgchartz.com/*
// @grant          GM_addStyle
// @updateURL      http://userscripts.org/scripts/source/468943.user.js
// @version        0.1.7
// ==/UserScript==


// Fix drop-down menu topography
GM_addStyle ('#header { z-index: 200 !important; }');


////////////////////
// Fix Page Title //
////////////////////
/*
Having the name of the site appear in every tab can be pretty unintuitive when working with multiple tabs. This swaps the site name and the page's actual title around, so that tab labels make more sense.
*/

var title	= document.title;
var index	= title.indexOf (' - ');
var split	= [title.slice (0, index), title.slice(index + 3)];

document.title	= split[1] + ' - ' + split[0];


////////////////////////
// Forum Buddy Tweaks //
////////////////////////
/*
This re-colours forum buddy thread links when there are replies to a thread you have posted in.
New replies = orange, quoted post = royal blue
*/

GM_addStyle ('.buddy_link.new_reply { display: block; font-weight: bold; color: #FB8137 !important; }');
GM_addStyle ('.buddy_link.new_quote { display: block; font-weight: bold; color: #4254FF !important; }');
GM_addStyle ('.buddy_link.new_post { display: block; opacity: 0.5 !important; }');

var newposts		= {"1":"reply", "3":"quote", "4":"post"};

for (var n in newposts)
{
	var xpath_buddy	= document.evaluate ('//div[@class="forum_buddy_icon" and .//img[contains(@src, "' + n + '-sml")]]/following-sibling::div[@class="forum_buddy_item"]/a', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	for (var i = 0; i < xpath_buddy.snapshotLength; i ++)
	{
		var thread	= xpath_buddy.snapshotItem (i);
		var title	= thread.title;

		// Apply CSS and display thread name in tooltip
		// Because UGH fixed-width layout
		thread.className	= 'buddy_link new_' + newposts[n];
		thread.title		= thread.innerHTML;

		// Append tooltip with new posts count
		if (title) thread.title	+= " - " + title;

		if (newposts[n] == 'quote') thread.title	+= " - You've been quoted";
	}
}


/////////////////////////////
// Fix Links to Old Domain //
/////////////////////////////
/*
Once upon a time, you could access gamrConnect via "http://gamrconnect.com/". At some point, the domain got parked, and a few rare links got broken. This sniffs them out and replaces them.
*/

var oldplace		= 'http://gamrconnect.com/';
var xpath_domain	= document.evaluate ('//a[contains(@href, "' + oldplace + '")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < xpath_domain.snapshotLength; i ++)
{
	var link	= xpath_domain.snapshotItem (i);
	var href	= link.href;

	link.href	= href.replace (oldplace, 'http://gamrconnect.vgchartz.com/');
}


//////////////////
// Ignore Users //
//////////////////
/*
Credit for this bit goes to Unsight, a.k.a Words of Wisdom.
I just updated it to work on the newest gamrConnect.
*/

GM_addStyle ('.ignore, .unIgnore a { cursor: pointer; }');
GM_addStyle ('.unIgnore { color: #999999; text-align: left; }');
GM_addStyle ('.unIgnore a { float: right; }');

var blocked = 'blocked';

// Choose users to ignore by adding more names to this list
var ignoredUsers = {
//   'Name'				 :	   blocked
}


function ignoreUsers ()
{
	//make sure there is no conflict between jQuery and other libraries
	//$.noConflict ();

	// Check to see if we are ignoring people already
	refreshListOfIgnoredUsersFromCookie ()

	// Ignore users
	ignoreInAll ();
}


//-----------------------------------------------------------------------------
// Ignore functions per area
//-----------------------------------------------------------------------------

function ignoreInAll ()
{
	refreshListOfIgnoredUsersFromCookie ()
	ignoreInThread ();
}

function ignoreInThread ()
{
	var url = new String (window.location);
	var isThread = url.indexOf ('thread.php') != -1;

	// Remove comments in threads
	if (isThread)
	{
		// Find each table row (posts are stored in table rows)
		$('div.forum_post_wrap').each (function ()
		{
			// Get the user name of the post (or null if there isn't one)
			var currentUser = trim ($(this).find ('.username-info-link').text ());
			var buttonHolder = $(this).find ('div.forum_post_tools ul');
			var userIsFound = currentUser != '';
			var userIsBlocked = ignoredUsers[currentUser] == blocked;
			var ignoreButtonExists = $(this).find ('a.ignore').text ();
			var unIgnoreButtonExists = $(this).find ('div.unIgnore a').text ();

			// Add ignore button
			if (userIsFound && !ignoreButtonExists)
			{
				buttonHolder.prepend ('<li><a class="ignore">Ignore ' + currentUser + '</a></li> ');
				buttonHolder.find ('a.ignore').click (function () {
					ignoreUser (currentUser);
				});
			}

			// Add un-ignore button
			if (userIsFound && userIsBlocked && !unIgnoreButtonExists)
			{
				$(this).prepend ('<div class="unIgnore reply-buttons">You are ignoring <strong>' + currentUser + '</strong>. <a>undo</a></div>');
				$(this).find ('div.unIgnore a').click (function () {
					unIgnoreUser (currentUser);
				});
			}

			// If the current user is on the ignored list, remove the post
			if (userIsFound && userIsBlocked)
			{
				$(this).find ('div.forum_user_info').css ('display', 'none');
				$(this).find ('div.forum_post_content').css ('display', 'none');
				$(this).find ('div.forum_post_tools').css ('display', 'none');
			}

			// If the user is visible, remove the unignore button
			if (userIsFound && !userIsBlocked)
			{
				$(this).find ('div.unIgnore').html ('');
			}
		});
	}
}

//-----------------------------------------------------------------------------
// Dynamic ignore functions
//-----------------------------------------------------------------------------

function refreshListOfIgnoredUsersFromCookie ()
{
	// www.vgchartz.com
	var stringOfIgnoredUsers = getCookie ('myIgnoredUsers');
	var arrayOfIgnoredUsers = stringOfIgnoredUsers.split (',');
	for (user in arrayOfIgnoredUsers)
		if (user != '')
			ignoredUsers[arrayOfIgnoredUsers[user]] = blocked;

	// news.vgchartz.com
	var stringOfIgnoredUsers = getCookie ('myIgnoredUsers2');
	var arrayOfIgnoredUsers = stringOfIgnoredUsers.split (',');
	for (user in arrayOfIgnoredUsers)
		if (user != '')
			ignoredUsers[arrayOfIgnoredUsers[user]] = blocked;
}

function storeListOfIgnoredUsersInCookie ()
{
	var cookieInfo = '';
	for (user in ignoredUsers)
		if (ignoredUsers[user] == blocked && user != '')
			cookieInfo = user + ',' + cookieInfo;
	cookieInfo = cookieInfo.slice (0, -1);
	setCookie ('myIgnoredUsers', cookieInfo, 365);
}

function unIgnoreUser (userName)
{
	ignoredUsers[userName] = '';
	storeListOfIgnoredUsersInCookie ();
	restoreIgnoredUserPosts (userName);
}

function ignoreUser (userName)
{
	ignoredUsers[userName] = blocked;
	storeListOfIgnoredUsersInCookie ();
	ignoreInThread ();
}

function restoreIgnoredUserPosts (userName)
{
	// Find each table row (posts are stored in table rows)
	$('.forum_post_wrap').each (function ()
	{
		// Get the user name of the post (or null if there isn't one)
		var currentUser = trim ($(this).find ('.username-info-link').text ());
		var buttonHolder = $(this).find ('div.forumbuttons');

		// If the current user is the user we're bringing back, display the posts
		if ( currentUser == userName )
		{
			// Display the post
			$(this).children ('div').css ('display', 'block');

			// Remove the unIgnore button
			$(this).find ('div.unIgnore').remove ();
		}
	});
}

//-----------------------------------------------------------------------------
// Utility functions
//-----------------------------------------------------------------------------

function setCookie (cookieName, value, expireDays)
{
	var expireDate = new Date ();
	expireDate.setDate ( expireDate.getDate () + expireDays );
	document.cookie =
		cookieName + '=' + escape (value) +
		 ( (expireDays==null) ? '' : ';expires=' + expireDate.toGMTString ()) +
		';path=/';
	document.cookie =
		cookieName + '2=' + escape (value) +
		 ( (expireDays==null) ? '' : ';expires=' + expireDate.toGMTString ()) +
		';path=/;domain=news.vgchartz.com';
}

function getCookie (cookieName)
{
	// Do we have cookies?
	if ( document.cookie.length > 0 )
	{
		// Find our cookie
		myCookieStart = document.cookie.indexOf ( cookieName + '=' );

		// Did we find it?
		if ( myCookieStart != -1 )
		{
			// Start just after our cookie's '='
			myCookieStart = myCookieStart + cookieName.length + 1;

			// End at the first ';' found
			myCookieEnd   = document.cookie.indexOf ( ';', myCookieStart );

			// Did we find the end?
			if ( myCookieEnd == -1 )
				myCookieEnd = document.cookie.length;

			// Return all the text beteween '=' and ';'
			return unescape ( document.cookie.substring ( myCookieStart, myCookieEnd ) );
		}
	}

	// We found no cookie value
	return '';
}


//-----------------------------------------------------------------------------
// JQuery Helper Functions
//-----------------------------------------------------------------------------

// Check if jQuery's loaded
function GM_wait ()
{
	if ( typeof unsafeWindow.jQuery == 'undefined' )
	{
		window.setTimeout ( GM_wait, 100 );
	}
	else
	{
		$ = unsafeWindow.jQuery;
		ignoreUsers ();
	}
}

function trim ( stringToTrim )
{
	return stringToTrim.replace (/^\s+|\s+$/g,'');
}

//-----------------------------------------------------------------------------
// Begin running script
//-----------------------------------------------------------------------------

var url = new String (window.location);
var isIM  = url.indexOf ('ajaxim') != -1;

if (!isIM)
{
	//var GM_JQ = document.createElement ('script');
	//GM_JQ.src = 'http://jquery.com/src/jquery-latest.min.js';
	//GM_JQ.type = 'text/javascript';
	//document.getElementsByTagName ('head')[0].appendChild (GM_JQ);

	// Run script
	GM_wait ();
}
