// ==UserScript==
// @name           vgChartz Ignore Users
// @namespace      vgChartz
// @description    Removes chosen users from threads, replies, walls, profiles, and news.  Now compatible with vgChartz 3.0.
// @author         Unsight
// @include        http://vgchartz.com/*
// @include        http://www.vgchartz.com/*
// @include        http://news.vgchartz.com/*
// @include        http://gamrconnect.vgchartz.com/*
// ==/UserScript==

var blocked = "blocked";

// Choose users to ignore by adding more names to this list
var ignoredUsers = {
//   "Name"                 :       blocked
}


function ignoreUsers() 
{
	//make sure there is no conflict between jQuery and other libraries
	//$.noConflict();
	
    // Check to see if we are ignoring people already
    refreshListOfIgnoredUsersFromCookie()
    
    // Ignore users
    ignoreInAll();
}


//-----------------------------------------------------------------------------
// Ignore functions per area
//-----------------------------------------------------------------------------

function ignoreInAll()
{
    refreshListOfIgnoredUsersFromCookie()
	ignoreInThread();
}

function ignoreInThread()
{
	var url = new String(window.location);
	var isThread  = url.indexOf('thread.php')  != -1;	
	
	// Remove comments in threads
	if(isThread) {
		// Find each table row (posts are stored in table rows)
		$(".forum_post_wrap").each(function() 
		{	
			// Get the user name of the post (or null if there isn't one)
			var currentUser = trim($(this).find(".forum_username_flag").text());
            var buttonHolder = $(this).find("div.forumbuttons");
			var userIsFound = currentUser != '';
			var userIsBlocked = ignoredUsers[currentUser] == blocked;
			var ignoreButtonExists = $(this).find("a.ignore").text();
			var unIgnoreButtonExists = $(this).find("div.unIgnore").text();
			
            // Add ignore button
            if(userIsFound && !ignoreButtonExists)
            {
                buttonHolder.prepend("<a class=\"ignore thread_bottom_button\" style=\"cursor: pointer; width: auto; padding: 0 5px; color: #FFFFFF; text-decoration: none; background: -moz-linear-gradient(#FF6400, #D52500) repeat scroll 0 0 transparent; \">Ignore " + currentUser + "</a> ");              
    			buttonHolder.children("a.ignore").click(function () { 
    				ignoreUser(currentUser);
    			});
            }
            
            // Add un-ignore button
            if(userIsFound && userIsBlocked && !unIgnoreButtonExists)
            {
            	$(this).prepend("<div class=\"thread_text_wrap unIgnore\" style=\"width: 96%; text-align: center; padding: 10px; float: right;\"><a class=\"thread_bottom_button\" style=\"cursor: pointer; width: auto; padding: 0 5px; float: none; color: #FFFFFF; text-decoration: none; background: -moz-linear-gradient(#FF6400, #D52500) repeat scroll 0 0 transparent; \">View " + currentUser + "'s posts</a>");
                $(this).find("div.unIgnore a").click(function () {
					unIgnoreUser(currentUser);
				});
            }
            
			// If the current user is on the ignored list, remove the post
			if(userIsFound && userIsBlocked)
				$(this).children('table').css("display", "none"); 
            
            // If the user is visible, remove the unignore button
            if(userIsFound && !userIsBlocked)
                $(this).find("div.unIgnore").html("");
		});
	}
}

//-----------------------------------------------------------------------------
// Dynamic ignore functions
//-----------------------------------------------------------------------------

function refreshListOfIgnoredUsersFromCookie()
{
    // www.vgchartz.com
	var stringOfIgnoredUsers = getCookie("myIgnoredUsers");
	var arrayOfIgnoredUsers = stringOfIgnoredUsers.split(",");
	for (user in arrayOfIgnoredUsers)
		if(user != "")
			ignoredUsers[arrayOfIgnoredUsers[user]] = blocked;
    
    // news.vgchartz.com
	var stringOfIgnoredUsers = getCookie("myIgnoredUsers2");
	var arrayOfIgnoredUsers = stringOfIgnoredUsers.split(",");
	for (user in arrayOfIgnoredUsers)
		if(user != "")
			ignoredUsers[arrayOfIgnoredUsers[user]] = blocked;
}

function storeListOfIgnoredUsersInCookie()
{
	var cookieInfo = "";
	for(user in ignoredUsers)
		if(ignoredUsers[user] == blocked && user != "")
			cookieInfo = user + ',' + cookieInfo;
    cookieInfo = cookieInfo.slice(0, -1);
	setCookie("myIgnoredUsers", cookieInfo, 365);
}

function unIgnoreUser(userName)
{
	ignoredUsers[userName] = '';
	storeListOfIgnoredUsersInCookie();
	restoreIgnoredUserPosts(userName);
}

function ignoreUser(userName)
{
	ignoredUsers[userName] = blocked;
	storeListOfIgnoredUsersInCookie();
	ignoreInThread();
}

function restoreIgnoredUserPosts(userName)
{
	// Find each table row (posts are stored in table rows)
	$(".forum_post_wrap").each(function() 
	{	
		// Get the user name of the post (or null if there isn't one)
		var currentUser = trim($(this).find(".forum_username_flag").text());
		var buttonHolder = $(this).find("div.forumbuttons");
		
		// If the current user is the user we're bringing back, display the posts
		if( currentUser == userName ) 
		{
			// Display the post
			$(this).children('table').css("display", "table"); 
		
			// Remove the unIgnore button
            $(this).find("div.unIgnore").remove();
		}
	});
}

//-----------------------------------------------------------------------------
// Utility functions
//-----------------------------------------------------------------------------

function setCookie(cookieName, value, expireDays)
{
	var expireDate = new Date();
	expireDate.setDate( expireDate.getDate() + expireDays );
	document.cookie = 
		cookieName + "=" + escape(value) +
		((expireDays==null) ? "" : ";expires=" + expireDate.toGMTString()) +
        ";path=/";
	document.cookie = 
		cookieName + "2=" + escape(value) +
		((expireDays==null) ? "" : ";expires=" + expireDate.toGMTString()) +
        ";path=/;domain=news.vgchartz.com";
}

function getCookie(cookieName)
{
	// Do we have cookies?
	if ( document.cookie.length > 0 )
	{
		// Find our cookie
		myCookieStart = document.cookie.indexOf( cookieName + "=" );
		
		// Did we find it?
		if( myCookieStart != -1 )
		{
			// Start just after our cookie's '=' 
			myCookieStart = myCookieStart + cookieName.length + 1;
			
			// End at the first ';' found
			myCookieEnd   = document.cookie.indexOf( ";", myCookieStart );
			
			// Did we find the end?
			if( myCookieEnd == -1 ) 
				myCookieEnd = document.cookie.length;
				
			// Return all the text beteween '=' and ';'
			return unescape( document.cookie.substring( myCookieStart, myCookieEnd ) );
		}
	}
	
	// We found no cookie value
	return "";
}


//-----------------------------------------------------------------------------
// JQuery Helper Functions
//-----------------------------------------------------------------------------

// Check if jQuery's loaded
function GM_wait() 
{
	if( typeof unsafeWindow.jQuery == 'undefined' ) 
	{
		window.setTimeout( GM_wait, 100 );
	}
	else 
	{
		$ = unsafeWindow.jQuery; 
		ignoreUsers(); 
	}
}

function trim( stringToTrim ) 
{
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}

//-----------------------------------------------------------------------------
// Begin running script
//-----------------------------------------------------------------------------

var url = new String(window.location);
var isIM  = url.indexOf('ajaxim')  != -1;

if(!isIM)
{
    //var GM_JQ = document.createElement('script');
    //GM_JQ.src = 'http://jquery.com/src/jquery-latest.min.js';
    //GM_JQ.type = 'text/javascript';
    //document.getElementsByTagName('head')[0].appendChild(GM_JQ);

    // Run script
    GM_wait();
}