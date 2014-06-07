// ==UserScript==
// @name        Facebook Wall Scrubber BETA
// @version     20120222a
// @include     htt*://*.facebook.com/*
// @include     htt*://www.facebook.com/*/allactivity*
// @include     htt*://www.facebook.com/profile.php?id=*&sk=allactivity*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
//
// ==/UserScript==

//NOTE: This was adapted from the clear recent activity code. It was updated by someone else to suit his needs.
//		Then adapted by me to suit mine and all my KoC buddies. 


//		Scripts I've come across that are mostly in this one. (Not sure who all they belong too)
//      http://userscripts.org/scripts/show/67751


// 		I CAN'T GET THIS SCRIPT TO WORK CORRECTLY, I'M STILL TRYING THOUGH.








// Using jQuery 1.7.1 as of 2011-12-31
$ = $.noConflict(); // prevent conflicts with other libraries

/******* Recent activity story ids **********
20 - Wrote on someone elses wall
21 - Added a friend
47 - Became a fan of..
63 - Game posts
69 - Likes

Game Ids
130402594779 - Kingdoms of Camelot
********************************************/


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

	// Searches old timeline for profile page
    if (!$('div#profileimage[class~=can_edit]'))
    {
		return;
    }
	
	//Searches new timeline for profile cover
	if (!$('div#fbProfileCover[class~=can_edit]'))
{
		return;
}
	// Searches for Activity Log page
	if (!$('div#pagelet_timeline_main_column[class~=can_edit]'))
{
		return;
}
	
	var use_blacklist = false;
	if (blacklist) { use_blacklist = true };
					
    $('li[class~="uiStreamStory"]').each,  //not sure if this will work
	$('li[class~="fbTimelineUnit"]').each(    
        function()
        {
            var activity = $(this).find('a[class~=uiCloseButton]').each(
            function()
            {
                var entry = $(this);
                if (entry)
                {
                    var url             = entry.attr("ajaxify");
                    var story_key       = url.match(/ministory_key=(\d+)&/i)[1];
                    var story_type      = url.match(/story_type=(\d+)&/i)[1];
                    var target_id       = url.match(/profile_fbid=(\d+)&/i)[1];
					var story_fbid      = url.match(/story_fbid=(\d+)&/i)[1];  // added
					var story_dom_id    = url.match(/story_dom_id=(\d+)&/i)[1];  // added
					var story_row_time  = url.match(/story_row_time=(\d+)&/i)[1];  // added
					
					
                    // Delete everything we don't want to keep
					if (($.inArray(parseInt(story_type), whitelist) < 0 && !use_blacklist) || (use_blacklist && $.inArray(parseInt(story_type), blacklist) > -1))
					{
						$.ajax(
						{
							 type    : "POST"
							,url     : "http://www.facebook.com/ajax/minifeed.php"
							,url     : "https://www.facebook.com/ajax/minifeed.php"
							// Bare minimum parameters for the request.
							// - DOM environment variables via Firebug
							,data    : { '__a'                   : 1
										,'profile_fbid'          : unsafeWindow.Env.user
										,'post_form_id'          : unsafeWindow.Env.post_form_id
										,'post_form_id_source'   : "AsyncRequest"
										,'ministory_key'         : story_key
										,'story_type'            : story_type
										,'fb_dtsg'               : unsafeWindow.Env.fb_dtsg
										,'story_fbid'            : story_fbid   //added
										,'story_dom_id'          : story_dom_id   //added
										,'story_row_time'        : story_row_time   //added
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
		$('#expand_all_older_posts_button').html('Expanding Posts... Click stop.');
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
	$('#expand_all_older_posts_button').html('Expand More Posts');
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
        button.innerHTML = "<center><div id='pagelet_timeline_profile_actions'><span class='uiButtonGroup mtm mlm actionsContents uiButtonGroupOverlay'> <div id='remove_activity_buttons'><span class='uiButtonGroupItem firstItem buttonItem'><span class='uiButton uiButtonOverlay uiButtonLarge'><span id=\"remove_all_activity_button\" class='uiButtonText'>Scrub ALL Wall Activity</span></span></span><span class='uiButtonGroupItem buttonItem'><span class='uiButton uiButtonOverlay uiButtonLarge'><span id=\"remove_all_facebook_game_activity_button\" class='uiButtonText'>Scrub ALL  Game Activity</span></span></span><span class='uiButtonGroupItem buttonItem'><span class='uiButton uiButtonOverlay uiButtonLarge'><span id=\"expand_all_older_posts_button\" class='uiButtonText'>Expand More Posts</span></span></span></div></span></div></center>";
        $(button).insertBefore($('#timeline_tab_content')); //position for new timeline
		$(button).insertBefore($('#profile_stream_blankstate')); //position for old facebook
		// First button
        $('#remove_all_activity_button').click(function()
        {
			if (confirm("Are you sure you want to scrub ALL your activity? NOTE: This does not work with the new timeline... yet.")){
				 removeActivities();
			}
        });
		// Second button
        $('#remove_all_facebook_game_activity_button').click(function()
        {
			if (confirm("Are you sure you want to scrub app and game activity? NOTE: This does not work with the new timeline... yet.")){
				var blacklist = new Array(0, 63);
				removeActivities(blacklist);
			}
        });
		// Third button
        $('#expand_all_older_posts_button').click(function()
        {
			if (confirm("Click okay to expand more posts, if duplicate posts appear just refresh.")){
				 expandOlderPosts(true);
			}
            
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