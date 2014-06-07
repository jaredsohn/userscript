// ==UserScript==
// @name        Facebook Wall: Clear ALL Activity from Facebook Apps/Games (also, Clear ALL Activity)
// @version     1.4
// @namespace   oneduality
// @include     http://*.facebook.com/*
// @include     https://*.facebook.com/*
// @require     http://www.tomchapin.me/auto-updater.php?id=98626
// @require     http://code.jquery.com/jquery-1.3.2.min.js
//
// ==/UserScript==

//NOTE: This was adapted from the clear recent activity code, I just updated this to suit my needs.
//      The original can be found at http://userscripts.org/scripts/show/92664

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

/**
 * Removes all non-whitelisted activities from minifeed.
 * blacklist (array) - optional parameter. If defined, script will only delete posts matching specified types.
 */
function removeActivities(blacklist)
{
    // Minifeed only exists on your profile page.
    //
    // This uses your ability to change your profile image to determine
    // if you're on the profile page. This is more reliable than parsing
    // the URL since it Facebook does some mangling of the URLs.
    if (!$('div#profileimage[class~=can_edit]'))
    {
        return;
    }
	
	var use_blacklist = false;
	if (blacklist) { use_blacklist = true };
					
    $('li[class~="uiStreamStory"]').each(    
        function()
        {
            var activity = $(this).find('a[class~=uiCloseButton]').each(
            function()
            {
                var entry = $(this);
                if (entry)
                {
                    var url         = entry.attr("ajaxify");
                    var story_key   = url.match(/ministory_key=(\d+)&/i)[1];
                    var story_type  = url.match(/story_type=(\d+)&/i)[1];
                    var target_id   = url.match(/profile_fbid=(\d+)&/i)[1];
                    // Delete everything we don't want to keep
					if (($.inArray(parseInt(story_type), whitelist) < 0 && !use_blacklist) || (use_blacklist && $.inArray(parseInt(story_type), blacklist) > -1))
					{
						$.ajax(
						{
							 type    : "POST"
							,url     : "http://www.facebook.com/ajax/minifeed.php"
							// Bare minimum parameters for the request.
							// - DOM environment variables via Firebug
							,data    : { '__a'                   : 1
										,'profile_fbid'          : unsafeWindow.Env.user
										,'post_form_id'          : unsafeWindow.Env.post_form_id
										,'post_form_id_source'   : "AsyncRequest"
										,'ministory_key'         : story_key
										,'story_type'            : story_type
										,'fb_dtsg'               : unsafeWindow.Env.fb_dtsg
									   }
						});     
						$(this).closest('li').remove();						
					}
                }
            });
	}); // end each
} // removeActivities


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
	expandTimerID = setTimeout ( function(){expandOlderPosts();}, 1000 );
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
        <span id=\"remove_all_activity_button\" style='margin-bottom: 10px;padding:3px 8px' class='uiButton uiButtonDefault uiButtonMedium'>Remove ALL Activity</span> <span id=\"remove_all_facebook_game_activity_button\" style='margin-bottom: 10px; margin-left:10px; padding:3px 8px' class='uiButton uiButtonDefault uiButtonMedium'>Remove ALL Activity from Facebook Apps/Games</span> <span id=\"expand_all_older_posts_button\" style='margin-bottom: 10px; margin-left:10px; padding:3px 8px' class='uiButton uiButtonDefault uiButtonMedium'>Expand ALL Older Posts</span></div></center>";
        $(button).insertBefore($('#profile_stream_blankstate'));
		// First button
        $('#remove_all_activity_button').click(function()
        {
			if (confirm("Are you absolutely sure that you want to delete ALL activity?")){
				 removeActivities();
			}
        });
		// Second button
        $('#remove_all_facebook_game_activity_button').click(function()
        {
			if (confirm("Are you absolutely sure that you want to delete ALL facebook app and game activity?")){
				var blacklist = new Array(0, 63);
				removeActivities(blacklist);
			}
        });
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
    GM_registerMenuCommand("Remove ALL Activity", function() { removeActivities(); });
	GM_registerMenuCommand("Remove ALL Activity from Facebook Apps/Games", function() { var blacklist = new Array(0, 63); removeActivities(blacklist); });
	GM_registerMenuCommand("Expand ALL Older Posts", function() { expandOlderPosts(); });
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