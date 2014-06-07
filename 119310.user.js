// ==UserScript==
// @name        Facebook Wall Auto Expander
// @version     1.0
// @namespace   gpo
// @include     http://*.facebook.com/*
// @include     https://*.facebook.com/*
// @require     http://code.jquery.com/jquery-1.3.2.min.js
//
// ==/UserScript==

//NOTE: This was adapted from the clear recent activity code, I just updated this to suit my needs.
//      The original can be found at http://userscripts.org/scripts/show/92664

// This is not my script, just copied it from Toms to adjust a few lines so it would work again with the new FB Layout.

/**
 * Defaulting to jQuery 1.3.2 because of a change in browser sniffing code in jQuery 1.4
 *
 * To get it to work with jQuery-1.4.1 and comment out the appropriate sections.
 * jquery-1.4.1.min.js: 
 *    [old]  36: var o=r.createElement("div");n="on"+n;var m=n in o;
 *    [new]  36: var o=r.createElement("div");n="on"+n;var m=true;
 *
 * jquery-1.4.1.js
 *    [old] 934: var isSupported = (eventName in el);
 *    [old] 934: var isSupported = true;
 */
$ = $.noConflict(); // prevent conflicts with other libraries

// Recent activity story ids:
//  69 - Likes
//  21 - Added a friend
//  47 - Became a fan of..
//  20 - Wrote on someone elses wall
//  63 - Game posts
//
// new Array(0, digit) should be used if for only one value, since
// new Array(int) creates an empty array
var whitelist   = new Array(0);
var button;




var expandTimerID = 0;
var expandingPosts = false;
function expandOlderPosts(init){
	if(init){
		expandingPosts=true;
		$('#expand_all_older_posts_button').html('Expanding Older Posts... Click here to stop.');
		$('#expand_all_older_posts_button').unbind('click');
		$('#expand_all_older_posts_button').click(function()
		{
			stopExpandingOlderPosts();
		});
	}
	clearTimeout(expandTimerID);
	if(!expandingPosts){ return false; }

	var expandJS = $('a.uiMorePagerPrimary').attr('onClick');
	if(expandJS.length>0){
		var d=unsafeWindow.document;
		var s=d.createElement('script');
		s.setAttribute('type','application/javascript');
		s.textContent = "function evalCode(){"+expandJS+"}evalCode();";
		(d.body||d.head||d.documentElement).appendChild(s);
		s.parentNode.removeChild(s);
	}

	var expandJS2 = $('li.showAll');
	var expandJS22='';
	if(expandJS2.length>0)
		expandJS22 = expandJS2.attr('onClick');
	console.log(expandJS22);
	if(expandJS22.length>0){
		var d2=unsafeWindow.document;
		var s2=d2.createElement('script');
		s2.setAttribute('type','application/javascript');
		s2.textContent = "function evalCode(){"+expandJS22+"}evalCode();";
		(d2.body||d2.head||d2.documentElement).appendChild(s2);
		s2.parentNode.removeChild(s2);
		
		expandJS2[0].className = expandJS2[0].className.replace( /(?:^|\s)showAll(?!\S)/ , '' );
		expandJS2[0].style.visibility = "hidden";
	}

	expandTimerID = setTimeout ( function(){expandOlderPosts();}, 3000 );
}

function stopExpandingOlderPosts(){
	expandingPosts = false;
	clearTimeout(expandTimerID);
	// Third button
	$('#expand_all_older_posts_button').html('Expand ALL Older Posts');
	$('#expand_all_older_posts_button').unbind('click');
	$('#expand_all_older_posts_button').click(function()
	{
		expandOlderPosts(true);
	});
}

/**
 * Buttons for on demand deleting.
 */
function createButtons()
{
    if (!button)
    {
        button = document.createElement("div");
        button.innerHTML = "<center><div id='remove_activity_buttons'> \
		<span id=\"expand_all_older_posts_button\" style='margin-bottom: 10px; margin-left:10px; padding:3px 8px' class='uiButton uiButtonDefault uiButtonMedium'>Wall Auto Expander</span>";
        var a;
		a = $('#profile_stream_blankstate');
		if (a.length)
			$(button).insertBefore($('#profile_stream_blankstate'));
		a = $('#pagelet_event_wall');
		if (a.length)
			$(button).insertBefore($('#pagelet_event_wall'));
		a = $('#MessagingMainContent');
		if (a.length)
			$(button).insertBefore($('#MessagingMainContent'));
		// Third button
        $('#expand_all_older_posts_button').click(function()
        {
            expandOlderPosts(true);
        });
    }
}

// Wait for the content to be loaded
if (!unsafeWindow.frameElement)
{
	GM_registerMenuCommand("Start", function() { expandOlderPosts(true); });
	GM_registerMenuCommand("Stop", function() { stopExpandingOlderPosts(); });
    var contentCheck = setInterval(
        function()
        {
            // '==' lacks transivity, use '===' for 0 or null checks
            if (typeof unsafeWindow === 'undefined')
            {
                unsafeWindow = window;
            }
            
            if ($('#content').get(0))
            {
                clearInterval(contentCheck);
            }
            createButtons();
        }, 200); // Check every 200ms
} // end frame check
