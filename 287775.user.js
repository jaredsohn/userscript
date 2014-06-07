// ==UserScript==
// @name        Block Plurk Users (Tampermonkey edition)
// @namespace   http://www.plurk.com/
// @description Hides replies by plurkers you don't like, as defined by picking from the menu item added by this script.
// @include     http://www.plurk.com/*
// @author      Katharine Berry, Mist Poryvaev
// @version     1.12
// @grant       none
// ==/UserScript==

// v1.1 : 2014.01.16 : Updated for Tampermonkey compatibility
// v1.11: 2014.01.16 : Firefox bugfixes
// v1.12: 2014.01.17 : Images loading fixed (it was jQuery conflict lol)

(function () {
	// We need to use the unsafeWindow to bypass GreaseMonkey security measures.
	// Said measures are unnecessary here.
	// To make GreaseKit happy as well, we use the standard 'window' object if unsafeWindow doesn't exist.
	var win = window;
	if(typeof(unsafeWindow) != 'undefined') win = unsafeWindow;
    
    // Check that we're on the right page.
    if (typeof(AJS) == 'undefined' || !AJS) return;
    if (typeof(Plurks) == 'undefined' || !Plurks) return;
   
	// Utility functions

	var addUserCommentBlock = function(user) {
		if(isUserCommentBlocked(user)) return;
		var uid = getPlurker(user);
		var date = new Date();
		date.setTime(date.getTime() + 63072000000); // Two years from now.
		var blocked = getAllUserCommentBlocked();
		blocked.push(uid);
		document.cookie = "plurk_block_users="+blocked.join(' ')+"; expires="+date.toGMTString()+"; path=/";
	}
	
	var removeUserCommentBlock = function(user) {
		var uid = getPlurker(user).toString();
		var blocks = getAllUserCommentBlocked();
		var pos = blocks.indexOf(uid);
		if(pos == -1) return;
		blocks.splice(pos, 1);
		
		var date = new Date();
		date.setTime(date.getTime() + 63072000000); // Two years from now.
		document.cookie = "plurk_block_users="+blocks.join(' ')+"; expires="+date.toGMTString()+"; path=/";
	}
	
	var getAllUserCommentBlocked = function() {
		var cookies = document.cookie.split(';');
		for(var i = 0; i < cookies.length; ++i)
		{
			var cookie = cookies[i];
			while(cookie.charAt(0) == ' ') cookie = cookie.substring(1, cookie.length);
			if(cookie.indexOf("plurk_block_users=") == 0) // We've got it.
			{
				var blocks = cookie.substring(18, cookie.length) || '';
				blocks = blocks.split(' ');
				return blocks;
			}
		}
		return [];
	}
	
	var isUserCommentBlocked = function(plurk) {
		var uid = getPlurker(plurk).toString();
		var blocks = getAllUserCommentBlocked();
		return (blocks.indexOf(uid) != -1);
	}
	
	var getPlurker = function(plurk) {
		return plurk.user_id || plurk.owner_id || plurk.uid;	
	}
    
   
	// Override the Plurk renderer.
	Plurks.baseRenderPlurk = Plurks.renderPlurk;
	Plurks.renderPlurk = function(plurkData, isReply) {
		var render = !isReply || !isUserCommentBlocked(plurkData);
		var plurk = Plurks.baseRenderPlurk(plurkData, isReply);
		if(!render)
		{
			plurk.style.display = 'none';
		}
		return plurk;
	}
	
	// Override the InfoOverlay renderer.
    InfoOverlay.baseRenderInfo = InfoOverlay.renderInfo;
    InfoOverlay.renderInfo = function(b) {
        createBlockMenuItem(this.user);
        var rc = InfoOverlay.baseRenderInfo(b);
        return rc;
    }
    
	// Handle clicks on the menu item created below.
	var blockRepliesClicked = function() {
		if(!isUserCommentBlocked(this.user))
		{
			if(confirm("Are you sure you want to block "+this.user.nick_name+" from replies?"))
			{
				addUserCommentBlock(this.user);
                Plurks.removeCurrentOpen();
			}
		}
		else
		{
			if(confirm("Are you sure you want to unblock "+this.user.nick_name+" from replies?"))
			{
				removeUserCommentBlock(this.user);
                Plurks.removeCurrentOpen();
            }
		}
        InfoOverlay.hideInfoOverlay(true);
	}
	
	// Create new menu item.
    var createBlockMenuItem = function(user) {
        InfoOverlay.init();
        var blockRepliesItem = 
            !isUserCommentBlocked(user)
            ?
            win.createItem("<div><span> Block from replies </span></div>", AJS.bind(blockRepliesClicked, InfoOverlay), {cls: "block"})
            :
            win.createItem("<div><span> Unblock from replies </span></div>", AJS.bind(blockRepliesClicked, InfoOverlay), {cls: "none"});
        
        InfoOverlay.menu.addItem(blockRepliesItem);
    }   

})();

/* Useful plurk thingies:
 * Plurks.renderPlurk(plurkData, isReply)
 * - Renders a plurk
 *
 * createItem(text, callback, extras) 
 * - Creates a menu item labelled text which calls callback when clicked.
 *   "extras" is an object with extra settings:
 *   - cls - a class to add.
 *
 * $b(function, context)
 * - Binds function to context (i.e. changes the value of 'this' in function.  
 * 
 * InfoOverlay.menu.addItem(menuItem)
 * - Add a menu item to the menu shown when clicking on someone's name.
 *   The menu item should be created with createItem.
 *
 * InfoOverlay.user
 * - Information on the user whose menu is being (or was last) displayed.
 *
 * InfoOverlay.only_non_user_n_logged
 * - Any menuItem in this array will not be shown on the user's own menu.
 */