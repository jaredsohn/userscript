// ==UserScript==
// @name        Youtube Small Fixes
// @namespace   ytsfixes_rpinheiro
// @description Small fixes for the youtube layout
// @include     http://www.youtube.com/*
// @include     https://www.youtube.com/*
// @version     1.1.5
// @author      Rui Pinheiro
// @license     GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @grant       GM_addStyle
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_log
// @grant       GM_registerMenuCommand
// @require     https://code.jquery.com/jquery-2.0.3.min.js
// @require     https://raw.github.com/sizzlemctwizzle/GM_config/master/gm_config.js
// @downloadURL https://userscripts.org/scripts/source/154122.user.js
// @updateURL   https://userscripts.org/scripts/source/154122.meta.js

// ==/UserScript==

/*
 *  ==== Youtube Small Fixes ====
 *    ==   by Rui Pinheiro   ==
 *  
 *  Fixes some annoying stuff with the December 2012 Youtube layout:
 *
 *  - Enlarges Youtube to the browser window's width (except for the search results page)
 *  - Automatically scrolls to the Video Player
 *  - Makes the Youtube Masthead (where the search is) not scroll with the page when watching a video.
 *  - Automatically sets the Large Player by default
 *
 *  These are all configurable through Greasemonkey's Userscript Commands Menu.
 *
 *  Does NOT automatically choose the highest quality. While that feature is planned, I don't know when I'll be able to find time for it.
 *  If you want that, use the YousableTubeFix or Youtube Center script.
 *
 *  NOTE: Only tested in Firefox 27.0.1 with Greasemonkey 1.15.
 *        I am posting this to help other people, but I do not have time to test it anywhere else.
 *        If something doesn't work right post on the discussions on userscripts.org, I'll look into it.
 */
 
/*
 *	This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/*
 *  === Changelog ===
 *
 *  1.1.5 (26 April 2014)
 *  - Some layout changes broke the full-window player. Has now been fixed.
 *
 *  1.1.4 (3 April 2014)
 *  - Youtube changed the 'wide' cookie (which remembers if you are using the wide player or not) to a session cookie recently.
 *    Added a button to the options menu which, if clicked, sets this cookie to have a value of '1' and to be kept for 500 days.
 *    Note: If you manually change to the small player, you'll have to click this button again (Youtube will override the cookie duration)
 *
 *  1.1.3 (10 March 2014)
 *  - For some reason, the script stopped detecting page transitions. When I added a debug line to the onTransitionEnd event,
 *    it started working again. Removing that line breaks it, so I'm leaving it in (with debugging disabled so it's not actually doing anything)
 *    as I can't find anything else wrong with it. If it breaks again in the future, I'll try and figure out what's up.
 *
 *  1.1.2 (24 February 2014)
 *  - "Default to Large Player" functionality remained broken even after the v1.1.1 fix. Since it is sort of
 *    unnecessary (Youtube does remember the last player-size you use through a cookie) and it was a huge pain
 *    to get working correctly, I ended up removing the feature.
 *
 *  1.1.1 (24 February 2014)
 *  - Sometimes the script wasn't able to force the large player correctly, this has now been fixed.
 *
 *  1.1.0 (22 February 2014)
 *  - Relicensed under the GPLv3.
 *  - Credited my real name instead of my nickname, alongside a similar change to my userscripts.org profile.
 *  - Script re-factored/re-written in a much cleaner/faster/modern way.
 *  - Added auto-update support (thanks to userscripts.org).
 *  - Now detects when the Youtube page transitions without a reload (now requires jQuery).
 *  - Scroll-to-video now animates the scrolling
 *  - Full-window Player now only activates when the Youtube Player is set to "Big Mode" (so it is easily toggleable).
 *  - Can disable the floating "Masthead" containing the search and the menu.
 *  - Can force Youtube to default to the Large Player.
 *  - Contains a (very ugly) configuration screen, accessible through the Greasemonkey Userscript Commands Menu.
 *
 *  1.0.22 (21 February 2014)
 *  - Version 1.0.21 broke the comments. Fixed. Sorry about that!
 *
 *  1.0.21 (21 February 2014)
 *  - Small bugfix for the previous update, it wasn't scrolling to the video correctly.
 *
 *  1.0.20 (21 February 2014)
 *  - Youtube changed the layout slightly, video now resizes correctly again. The "Youtube Masthead" (where search is) no longer scrolls down with the page, as before the update.
 *
 *  1.0.19 (14 October 2013)
 *  - Increased the size of the playlist controls, fixed its position.
 *
 *  1.0.18 (2 September 2013)
 *  - Another Youtube update made it so that there is a "player" element on every Youtube page, and the script broke thinking everything was a video page. Fixed!
 *
 *  1.0.17 (23 August 2013)
 *  - Another Youtube update broke more stuff, fixed. Thanks to userscripts.org user puff for his contributed fix.
 *
 *  1.0.16 (16 August 2013)
 *  - Youtube update broke a lot of stuff, fixed.
 *
 *  1.0.15 (8 August 2013)
 *  - Auto scroll to video was slightly off due to a Youtube update, fixed.
 *
 *  1.0.14 (28 July 2013)
 *  - Now forces playlists to have a collapsable playlist, since the non-collapsable playlist will appear on top of the video.
 *    Thanks to ghoofy007 for his help tracking down the (obvious) reason for the non-collapsable playlist to be used instead.
 *
 *  1.0.13 (24 July 2013)
 *  - Small change in Youtube code broke the script somewhat. Fixed.
 *
 *  1.0.12 (13 July 2013)
 *  - Stuff works fine, and Youtube unnecessarily updates it a few hours later, breaking the video page. Story of my life! Should now work fine again (for how long?)
 *
 *  1.0.11 (12 July 2013)
 *  - Fixed the channel pages, they weren't displaying correctly at full width in some cases due to a Youtube update.
 *  - Fixed video pages containing playlists, especially at lower window sizes, since they were acting rather weird.
 *
 *  1.0.10 (26 June 2013)
 *  - To be consistent, now enlarges all pages to the full screen width (except for the search page due to Youtube limitations).
 *
 *  1.0.9 (24 June 2013)
 *  - A slight change in the Youtube layout made it so that it wouldn't always fill the whole browser width, especially at smaller resolutions. That should now be fixed.
 *
 *  1.0.8 (15 June 2013)
 *  - Youtube updated the way playlists are shown (but this time, there actually is a noticeable change - and it's actually a good one).
 *    Anyways, compatibility was broken, so videos with playlists now work correctly again.
 *
 *  1.0.7 (22 May 2013)
 *  - Prevent the script from turning on when inside an iframe, in order to prevent auto-scrolling to a movie outside of Youtube (when there are embedded movies for example).
 *
 *  1.0.6 (11 May 2013)
 *  - Playlist layout was changed by Google (again without any real visible change) and so the script broke, it's now fixed.
 *    Note that now the playlist always shows the scrollbar. This is to make the behaviour consistent, since google broke
 *    the scrollwheel when resizing and so if you moused over the playlist it'd change the margins thinking there was a scrollwheel
 *    and look bad until you moved your mouse away.
 *
 *  1.0.5.3 (5 May 2013)
 *  - Come on Google, is it really required to slightly change the Youtube layout every single week?
 *    I mean, while you're at it, you should actually FIX stuff, instead of just annoying people who maintain user scripts.
 *
 *  1.0.5.2 (29 April 2013)
 *  - AGAIN with another small Youtube layout change that broke the automatic resizing. It's fixed now.
 *  
 *  1.0.5.1 (26 April 2013)
 *  - Small fix, to make the enlarged comments more consistent. Now the video description is also enlarged!
 *
 *  1.0.5 (26 April 2013)
 *  - Youtube changed the layout, with no changes for the end-user... AGAIN. The script broke, so I had to fix it.
 *  - While attempting to center the video page, accidentally got it to enlarge to the full screen width. Since I like it, this is now a new feature!
 *  - Fixed some behaviour when showing playlists alongside the video with the "new" layout.
 *
 *  1.0.4 (26 March 2013)
 *  - Fixed the automatic resizig to consider the horizontal scrollbar and not having it overlap the video.
 *  - Automatic resizing now works with Flashblock (and probably other similar addons that only load the flash player when you click it)
 *  - Removed previous fix (1.0.3.1) since it seems it's no longer required due to yet another layout update (and actually slightly breaks the current layout)
 *
 *  1.0.3.1 (21 March 2013)
 *  - Small tweak to 1.0.3, in order for the video Description/Title/Comments to not slightly overlap the player.
 *
 *  1.0.3 (20 March 2013)
 *  - Youtube updated the video page source code (without any layout changes). Updated to work correctly with it.
 *  - Centered and resized the new channel pages, so that they use the entire screen instead of being limited to a maximum width of about 1200px
 *
 *  1.0.2
 *  - Improved the 1.0.1 fix, since it still wouldn't work on some youtube pages.
 *  - Fixed playlist sidebar sometimes overlapping the video
 *
 *  1.0.1
 *  - Fixed the "centers the whole page" feature, which had been broken again by Youtube in some specific cases.
 */

/*
 * Debug Settings
 */
var debugLogEnabled = true;
var scriptShortName = "YTSF";

scriptLog = debugLogEnabled ? function(msg) { if(typeof msg === 'string'){ console.log(scriptShortName + ": " + msg); }else{ console.log(msg); } } : function() {};

/*
 * Helper Functions
 */
function isFrame() {
	// Check if inside an iframe (for example, in the case of an embedded Youtube video)
	if (window.top !== window) {
		return true;
	}
	
	return false;
}

function isVideoPage() {	
	return !( $('#player').hasClass("off-screen") );
}

function scrollToElement(selector) {   
	var offset = $(selector).offset().top;
	
	if(settings_isFloatingMastheadEnabled())
		offset -= $('#masthead-positioner').outerHeight();
	
    $('html, body').animate({ scrollTop: offset }, 1000);
}

function setCookie(cname,cvalue,exdays)
{
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+d.toGMTString();
	document.cookie = cname + "=" + cvalue + "; " + expires + "; domain=youtube.com; path=/";
} 

/*
 * Disable Floating Masthead
 */
function disableFloatingMasthead()
{
	GM_addStyle("#masthead-positioner { position: relative !important }");
	GM_addStyle("#masthead-positioner-height-offset { display: none } ");
	GM_addStyle("#appbar-guide-menu { position: absolute !important; margin-top: 0px !important }");
	GM_addStyle("#footer-container { margin-top: 0px !important }");
	GM_addStyle("#body-container { padding-bottom: 0px !important }");
}

/*
 * Resize Video Player
 */
function enableFullWindowPlayer()
{
	GM_addStyle("#player.watch-medium, #player.watch-large { width: 100% !important; height: "
	    + (settings_isFloatingMastheadEnabled() ? "calc(100vh - " + $('#masthead-positioner').outerHeight() + "px)"
	                                 : "100vh")
	    + " !important }");
	
	GM_addStyle(".watch-medium > #player-api { width: 100% !important; height: 100% !important }");
	
	GM_addStyle(".player-height { height: 100% !important }");
	GM_addStyle(".player-width { width: 100% !important }");
}

/*
 * Enable Full Widescreen
 */
function enableFullWidescreen()
{
	//Non-video pages
	GM_addStyle("#page, #content { width: auto !important; max-width: none !important };");
	GM_addStyle(".branded-page-v2-primary-col > .yt-card { margin: 0 !important }");
	GM_addStyle(".feed-container { padding: 30px; }");
	
	//Video pages
	/* Fix Youtube Sidebar and comments, in order for it not to overlap with the video player, and to center them */
	GM_addStyle("#watch7-main-container { padding-left: 0 !important }");
	GM_addStyle("#watch7-content { width: calc(100% - 400px) !important; margin-right: 0 !important }");
	GM_addStyle("#watch7-sidebar { margin-top: 20px !important }");
	
	/* Resize Youtube Video Details */
	GM_addStyle(".action-panel-content, #watch-description-clip { width: auto !important }");
	GM_addStyle("#watch-description-extra-info { float: right; width: auto }");
	
	/* Resize Comments */
	GM_addStyle("#watch-discussion > .comments-iframe-container { margin: 0 auto; position: relative; max-width: none !important }");
	GM_addStyle("#comments-test-iframe { width: 100% !important }");
	GM_addStyle("#comments-test-iframe > iframe { width: 100% !important }");
	
	/* Fix Guide */
	GM_addStyle("#guide { width: auto !important; position: static !important }");
}
 
/*
 * New Page Loaded Event
 */
function newPageLoaded()
{
	try {
		scriptLog("new page loaded: " + window.location );
		
		if(isVideoPage()) {
			scriptLog("video page");
			
			if(settings_isFullWindowPlayerEnabled())
				enableFullWindowPlayer();
			
			if(settings_isScrollToPlayerEnabled())
				scrollToElement('#movie_player');
		}
	}
	catch(err) { logError(err); }
}

/*
 * Initialize Script
 */
function scriptInit() {
	try {
		scriptLog("Script loaded.");
		
		/* Setup Configuration Library */
		GM_config.init(
		{
			'id': 'GM_config', // The id used for this instance of GM_config
			'fields': // Fields object
			{
				'bEnableFullWindowPlayer': // This is the id of the field
				{
					'label': 'Enable Full-Window Video Player', // Appears next to field
					'type': 'checkbox', // Makes this setting a text field
					'default': true // Default value if user doesn't change it
				},
				
				'bEnableFullWidescreen': // This is the id of the field
				{
					'label': 'Enable Full Widescreen Youtube (pages fill the screen width when possible)', // Appears next to field
					'type': 'checkbox', // Makes this setting a text field
					'default': true // Default value if user doesn't change it
				},
				
				'bEnableFloatingMasthead': // This is the id of the field
				{
					'label': 'Enable Floating Masthead (the menu and search bar)', // Appears next to field
					'type': 'checkbox', // Makes this setting a text field
					'default': false // Default value if user doesn't change it
				},
				
				'bScrollToPlayer': // This is the id of the field
				{
					'label': 'Automatically Scroll to Video Player', // Appears next to field
					'type': 'checkbox', // Makes this setting a text field
					'default': true // Default value if user doesn't change it
				},
				
				'btnRememberWide':
				{
					'label': 'Make "Wide player" the default.',
					'type': 'button',
					'size': 100,
					'click': function() {
						setCookie("wide", "1", 500);
					}
				}
			}
		});
		
		GM_registerMenuCommand("'Youtube Small Fixes' Settings", function() { GM_config.open();}, null )
		
		/* Init Script */
		if(isFrame()) {
			scriptLog("frame, do nothing");
			return;
		}
		
		GM_addStyle("#player { margin-top: 0 !important } ");
		
		if(!settings_isFloatingMastheadEnabled())
			disableFloatingMasthead();

		if(settings_isFullWidescreenEnabled())
			enableFullWidescreen();
		
		//Setup transition hook and then run it once.
		$('body').on('transitionend', function(event) {
			
			scriptLog("transition: " + event.target.id);
			
			if (event.target.id == 'progress')
				newPageLoaded();
			
			return false;
			
		});
		
		setCookie("wide", "1", 200);
		
		newPageLoaded();
	}
	catch(err) { logError(err); }
}

(function(){
    // Your base, I'm in it!
    var originalAddClassMethod = jQuery.fn.addClass;

    jQuery.fn.addClass = function(){
        // Execute the original method.
        var result = originalAddClassMethod.apply( this, arguments );

        // trigger a custom event
        jQuery(this).trigger('cssClassChanged');

        // return the original result
        return result;
    }
})();

/*
 * Settings
 */
function settings_isFullWindowPlayerEnabled() {
	return GM_config.get("bEnableFullWindowPlayer");
};
function settings_isFullWidescreenEnabled() {
	return GM_config.get("bEnableFullWidescreen");
}
function settings_isFloatingMastheadEnabled() {
	return GM_config.get("bEnableFloatingMasthead");
}
function settings_isScrollToPlayerEnabled() {
	return GM_config.get("bScrollToPlayer");
}

/*
 * Error handling
 * Can use 'error.stack', not cross-browser (though it should work on Firefox and Chrome)
 */
function logError(error) {
	var stackMessage = "";
	if("stack" in error)
		stackMessage = "\n\tStack: " + error.stack;
		
	console.error(scriptShortName + " (location: '" + window.location + "')" + " Error: " + error.name + "\n\tMessage: " + error.message + stackMessage);
}

/*
 * Actually start the script
 */
scriptInit();