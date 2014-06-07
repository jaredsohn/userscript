// ==UserScript==
// @name        Block Plurk Users
// @namespace   http://kathar.in
// @description Hides replies by plurkers you don't like, as defined by picking from the menu item added by this script.
// @include     http://www.plurk.com/*
// @author      Katharine Berry
// ==/UserScript==

(function () {
	// We need to use the unsafeWindow to bypass GreaseMonkey security measures.
	// Said measures are unnecessary here.
	// To make GreaseKit happy as well, we use the standard 'window' object if unsafeWindow doesn't exist.
	var win = window;
	if(typeof(unsafeWindow) != 'undefined') win = unsafeWindow;
	
    // Check that we're on the right page.
    if(!win.Plurks) return;
    
	// Override the Plurk renderer.
	win.Plurks.A_Team_renderPlurk = win.Plurks.renderPlurk;
	win.Plurks.renderPlurk = function(plurkData, isReply) {
		var render = !isReply || !isBlocked(plurkData);
		var plurk = win.Plurks.A_Team_renderPlurk(plurkData, isReply);
		if(!render)
		{
			plurk.style.display = 'none';
		}
		return plurk;
	};
	
	// Handle clicks on the menu item created below.
	var blockRepliesClicked = function() {
		if(!isBlocked(this.user))
		{
			if(confirm("Are you sure you want to block "+this.user.nick_name+" from replies?"))
			{
				addBlock(this.user);
			}
		}
		else
		{
			if(confirm("Are you sure you want to unblock "+this.user.nick_name+" from replies?"))
			{
				removeBlock(this.user);
			}
		}
	}
	
	// Create new menu item.
	var blockRepliesItem = win.createItem("Block from replies", win.$b(blockRepliesClicked, win.InfoOverlay), {cls: "block"});
	//win.InfoOverlay.only_non_user_n_logged.push(blockRepliesItem); // Don't show it on our own menu.
	win.InfoOverlay.menu.addItem(blockRepliesItem);
	
	// Utility functions
	var addBlock = function() { alert("Plurk Block Users: Missing function addBlock."); }
	var isBlocked = function() { alert("Plurk Block Users: Missing function isBlocked."); }
	var getAllBlocked = function() { alert("Plurk Block Users: Missing function getAllBlocked."); }
	var removeBlock = function() { alert("Plurk Block Users: Missing function removeBlock."); }
	
	addBlock = function(user) {
		if(isBlocked(user)) return;
		var uid = getPlurker(user);
		var date = new Date();
		date.setTime(date.getTime() + 63072000000); // Two years from now.
		var blocked = getAllBlocked();
		blocked.push(uid);
		document.cookie = "plurk_block_users="+blocked.join(' ')+"; expires="+date.toGMTString()+"; path=/";
	};
	
	removeBlock = function(user) {
		user = getPlurker(user).toString();
		var blocks = getAllBlocked();
		var pos = blocks.indexOf(user);
		if(pos == -1) return;
		blocks.splice(pos, 1);
		
		var date = new Date();
		date.setTime(date.getTime() + 63072000000); // Two years from now.
		document.cookie = "plurk_block_users="+blocks.join(' ')+"; expires="+date.toGMTString()+"; path=/";
	};
	
	getAllBlocked = function() {
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
	};
	
	isBlocked = function(plurk) {
		var uid = getPlurker(plurk).toString();
		var blocks = getAllBlocked();
		return (blocks.indexOf(uid) != -1);
	};
	
	var getPlurker = function(plurk) {
		return plurk.user_id || plurk.owner_id || plurk.uid;	
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