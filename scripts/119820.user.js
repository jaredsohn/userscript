// ==UserScript==
// @name        Facebook Scrubber (Deletes all Wall Activity)
// @version     1.1
// @namespace   tomwsmf
// @include     http://*.facebook.com/*
// @include     https://*.facebook.com/*
// @require     http://code.jquery.com/jquery-1.3.2.min.js
//
// ==/UserScript==
// This will wormt hru your Facebook Wall activity and send those old posts to thier good night. If you want to keep any of the 
// old critters make sure to grab a Download of your Facebook account. 
// NOTE: This was adapted from http://userscripts.org/scripts/review/106713
//       which adapted from http://userscripts.org/scripts/review/98626
//       which adapted from http://userscripts.org/scripts/show/92664

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
    if (!$('a.edit_profilepicture'))
    {
        return;
    }
	
	var use_blacklist = false;
	if (blacklist) { use_blacklist = true };
					
    $(".mainWrapper a.uiSelectorButton").each(function() {
        removePost($(this));
    });
    $(".uiStreamStory a.uiCloseButton").each(function() {
        removePost($(this));
    });
} // removeActivities

function removePost(post)
{
    var url         = post.attr("ajaxify");
    var story_key   = url.match(/ministory_key=(\d+)&/i)[1];
    var story_id    = url.match(/story_id=(\w+)&?/i)[1];
    var story_type  = url.match(/story_type=(\d+)&/i)[1];
    // Delete everything we don't want to keep
	$.ajax(
	{
		 type    : "POST"
		,url     : "/ajax/minifeed.php"
		// Bare minimum parameters for the request.
		// - DOM environment variables via Firebug
		,data    : { '__a'                   : 1
					,'__user'                : unsafeWindow.Env.user
                    ,'action_key'            : "remove_content"
					,'confirmed'             : 1
					,'dialog'                : 1
					,'fb_dtsg'               : unsafeWindow.Env.fb_dtsg
					,'feedback'              : 1
					,'ministory_key'         : story_key
					,'post_form_id'          : unsafeWindow.Env.post_form_id
					,'post_form_id_source'   : "AsyncRequest"
					,'profile_fbid'          : unsafeWindow.Env.user
					,'story_id'              : story_id
					,'story_type'            : story_type
				   }
	});     
	post.closest('li.uiStreamStory').remove();						
}


var expandTimerID = 0;
var expandingPosts = false;
function expandOlderPosts(init){
	if(init){
		expandingPosts=true;
		$('#expand_all_older_posts_button').html('Removing ALL Older Posts... Click here to stop.');
		$('#expand_all_older_posts_button').unbind('click');
		$('#expand_all_older_posts_button').click(function()
		{
			stopExpandingOlderPosts();
		});
	}
	clearTimeout(expandTimerID);
	if(!expandingPosts){ return false; }

	var expandJS = $('a.uiMorePagerPrimary').attr('onClick');
	if(expandJS && expandJS.length>0){
		var d=unsafeWindow.document;
		var s=d.createElement('script');
		s.setAttribute('type','application/javascript');
		s.textContent = "function evalCode(){"+expandJS+"}evalCode();";
		(d.body||d.head||d.documentElement).appendChild(s);
		s.parentNode.removeChild(s);
	}
	expandTimerID = setTimeout ( function(){expandOlderPosts();}, 1000 );
	removeActivities();
}

function stopExpandingOlderPosts(){
	expandingPosts = false;
	clearTimeout(expandTimerID);
	$('#expand_all_older_posts_button').html('Delete ALL Older Posts');
	$('#expand_all_older_posts_button').unbind('click');
	$('#expand_all_older_posts_button').click(function()
	{
		expandOlderPosts(true);
	});
}

function createButtons()
{
    if (!button)
    {
        button = document.createElement("div");
        button.innerHTML = "<center><div id='remove_activity_buttons'> \
        <span id=\"expand_all_older_posts_button\" style='margin-bottom: 10px; margin-left:10px; padding:3px 8px' class='uiButton uiButtonDefault uiButtonMedium'>Delete ALL Older Posts</span></div></center>";
        $(button).insertBefore($('#profile_stream_blankstate'));
        $('#expand_all_older_posts_button').click(function()
        {
			if (confirm("Are you absolutely sure that you want to delete All old and new Activity? It will be no more...it will join the choir invisble...etc etc. All of your wise posts and witty banter will vanish into that good night never to be seen again...so be very sure this is what you want...think it over...and then...click OK..else click Cancel ")){
            			expandOlderPosts(true);
			}
        });
    }
}

// Wait for the content to be loaded
if (!unsafeWindow.frameElement)
{
	GM_registerMenuCommand("Delete ALL Wall Activity", function() { expandOlderPosts(); });
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
