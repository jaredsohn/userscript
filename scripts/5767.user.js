// ==UserScript==
// @name           MySpace - Add Image Links 2
// @namespace      Adrian232
// @description    Adds a customizable set of links under image links to other profiles.
// @source         http://www.eternalbloodlust.com/gmscripts/myspaceaddimagelinks2.user.js
// @identifier     http://www.eternalbloodlust.com/gmscripts/myspaceaddimagelinks2.user.js
// @creator        Adrian (myspace.com/adrian232)
// @version        2.5.5r3
// @stable         true
// @date           2009-3-29
// @include        http://myspace.com/*
// @include        http://*.myspace.com/*
// ==/UserScript==
// LICENSE: This script is licensed under the GNU GPL
// CREDITS: The original concept and design of this script was created by
// Steve Ryherd. It was later updated by Zebra Gang (myspace.com/yeah_dude_13).
// Version 2.0 is a redesign by Adrian (myspace.com/adrian232) to add support
// for more icons, and a customizeable interface. It also fixes several bugs
// in previous versions, and many enhancements. All questions, bug reports, and
// suggestions should be sent to Adrian via MySpace.
//
//http://profile.myspace.com/index.cfm?fuseaction=mail.message&friendID=24757929

/******************************************************************************\
 *            M O D I F Y   S C R I P T   I N S T R U C T I O N S             *
 *                                                                            *
 * The full documentation can be found at:                                    *
 * http://www.eternalbloodlust.com/docs/myspaceaddimagelinks2.php             *
 *                                                                            *
 * If installing on a browser that isn't Firefox (and doesn't support E4X),   *
 * you may want to remove the Help Document at the end of this file.          *
 *                                                                            *
 * To change settings in Firefox,                                             *
 * simply type Shift-Alt-I on any page in MySpace.                            *
 *                                                                            *
 * To change settings in Safari, Opera, and other browsers,                   *
\* you may modify the default values below:                                   */

var DEFAULTS = {
  shortcuts: "add_friend,view_friends,add_favorite,subscribe_blog,block_user,view_pictures,view_videos,send_mail,add_comment,view_comments",
  
  iconpack: "silk",			/* See documentation for details */
  icon_size: "medium",		/* Can be "small", "medium", "large", or "ex-large" */
  auto_spacing: "true",		/* Can be either "true" or "false" */
  always_90: "false",		/* Can be either "true" or "false" */
  no_alt: "true",			/* Can be either "true" or "false" */
  link_target: "_self",		/* Can be set to */
  default_image: "false",	/* Can be either "true" or "false" */
  
  /* experimental in non-Firefox browsers (not recommended to change these) */
  mouseover: "false",		/* Can be either "true" or "false" */
  no_adjust: "false",		/* Can be either "true" or "false" */
  
  /* Custom icon packs: (See documentation for more info) */
  iconpack_ext: "png",
  iconpack_width: 16,
  iconpack_style: "border: none !important; height: auto !important; width: %width%px !important;"
};

/*                                                                            *\
 *                    DO NOT MODIFY ANYTHING BELOW HERE!                      *
 *                   (Unless you know what you're doing)                      *
\******************************************************************************/

/*************\
|* Constants *|
\*************/

// The regular expression used to detect an error page in MySpace
var ERROR_PAGE_REGEXP = /^Sorry! an unexpected error has occurred\./i;

// declare these here, so we can use later
var HelpDoc = '';
var HelpCss = '';

/***********************\
|* User Script Updates *|
\***********************/
// http://userscripts.org/scripts/show/2296
var ScriptData =  {
	name: "MySpace - Add Image Links 2",
	namespace: "Adrian232",
	description: "Adds a customizable set of links under image links to other profiles.",
	
	//source: "http://userscripts.org/scripts/show/5767"
	source: "http://www.eternalbloodlust.com/gmscripts/myspaceaddimagelinks2.user.js",
	//identifier: "http://userscripts.org/scripts/source/5767.user.js",
	identifier: "http://www.eternalbloodlust.com/gmscripts/myspaceaddimagelinks2.user.js",
	
	version: "2.5.5r3", //stable: true,
	date: Date.parse("March 29, 2009")
};
var UpdateChecking = false;
window.addEventListener("load", function(e) {
	try {
		unsafeWindow.UserScriptUpdates.requestAutomaticUpdates(ScriptData);
		UpdateChecking = true;
	} catch(e) {
		UpdateChecking = false;
		GM_log("User Script Updates is not installed. To receive notices of new updates, visit http://userscripts.org/scripts/show/2296");
	}
}, false);

/* Set-up the Benchmarks... */
var BENCHMARKING = false;
var BENCHMARKS = new Benchmarks();

BENCHMARKS.start("ScriptExecution");

/**********************\
|* The Master Objects *|
\**********************/

// The ImageLinks object, controls the important variables related to this script
function ImageLinks() {
	BENCHMARKS.start("ImageLinks");
	var parent = this; // set `this' into alternative name

	// Get variables from GM
	var iconpack = GM_getValue('iconpack', 'default');
	var icon_size = GM_getValue('icon_size', 'default');
	var auto_spacing = GM_getValue('auto_spacing', 'default');
	var iconpack_ext = GM_getValue('iconpack_ext', 'default');
	var iconpack_width = GM_getValue('iconpack_width', 'default');
	var iconpack_style = GM_getValue('iconpack_style', 'default');
	var always_90 = GM_getValue('always_90', 'default');
	var no_alt = GM_getValue('no_alt', 'default');
	var link_target = GM_getValue('link_target', 'default');
	var smart_links = GM_getValue('smart_links', 'default');
	var quick_links = GM_getValue('quick_links', 'default');
	var quick_confirm = GM_getValue('quick_confirm', 'default');
	var no_adjust = GM_getValue('no_adjust', 'default');
	var mouseover = GM_getValue('mouseover', 'default');
	var default_image = GM_getValue('default_image', 'default');
	
	// The `,' delimited list of links
	var shortcuts = GM_getValue('shortcuts', 'default');
	
	// common variables, set elsewhere
	var links = new Array();	// an array of all the image links' Nodes
	var dragtos = new Array();	// an array of all the sample links' Nodes
	var cache = new Cache();	// an object containing page caches for smart links
	var dialog = null;			// points to the dialog Window
	var prefs = null;			// points to the prefs Node
	var darkness = null;		// an envelope of darkness
	var form = null;			// points to the form Node
	var sample = null;			// points to the sample image Node
	var sample_link = null;		// points to the sample image's links Node
	var unused = null;			// points to the unused image Node
	var unused_link = null;		// points to the unused image's links Node
	var dragging = null;		// points to the object being dragged
	var hovering = null;		// points to the object being hovered over
	var startX = 0;				// starting X value for the dragging object
	var startY = 0;				// starting Y value for the dragging object
	
	var icon_base = '';
	var copyright = '';

	// Changes values set to "default" to their default value
	this.setDefaults = function() {
		if (shortcuts == "default")
			shortcuts = DEFAULTS["shortcuts"];
		
		if (iconpack == "default")
			iconpack = DEFAULTS["iconpack"];
		
		if (icon_size == "default")
			icon_size = DEFAULTS["icon_size"];
		
		if (auto_spacing == "default")
			auto_spacing = DEFAULTS["auto_spacing"];
		
		if (iconpack_ext == "default")
			iconpack_ext = DEFAULTS["iconpack_ext"];
		
		if (iconpack_width == "default")
			iconpack_width = DEFAULTS["iconpack_width"];
		
		if (iconpack_style == "default")
			iconpack_style = DEFAULTS["iconpack_style"];
		
		if (always_90 == "default")
			always_90 = DEFAULTS["always_90"];
		
		if (no_alt == "default")
			no_alt = DEFAULTS["no_alt"];
		
		if (link_target == "default")
			link_target = DEFAULTS["link_target"];
		
		/* Smart Links and Quick Links will not work on any non-GM system */
		if (smart_links == "default") {
			if (typeof GM_xmlhttpRequest == 'function')
				smart_links = "true";
			else
				smart_links = "false";
		}
			
		if (quick_links == "default") {
			if (typeof GM_xmlhttpRequest == 'function')
				quick_links = "true";
			else
				quick_links = "false";
		}
			
		if (quick_confirm == "default") {
			quick_confirm = "true";
		}
		
		if (no_adjust == "default")
			no_adjust = DEFAULTS["no_adjust"];
		
		if (mouseover == "default")
			mouseover = DEFAULTS["mouseover"];
		
		if (default_image == "default")
			default_image = DEFAULTS["default_image"];
	};
	this.setDefaults();

	// set the iconpack variables to match the iconpack
	this.changeIconpack = function(name) {
		if (name.match(/^http/)) {
			iconpack = name;
			icon_base = name;
			copyright = 'Enter the URL of your custom theme\'s folder below:';
		} else if (name == "text") {
			iconpack = "text";
			copyright = 'A Text-Only Theme, by <a href="http://www.myspace.com/adrian232">Adrian</a>';
		} else if (name == "menu") {
		    iconpack = "menu";
		    copyright = 'A Pull-Down Menu Theme, by <a href="http://www.myspace.com/adrian232">Adrian</a> (suggested by Nick Blankenship)'
		} else if (name == "abbr") {
			iconpack = "abbr";
			copyright = 'An Abbreviated Text Theme using Unicode Glyphs, by <a href="http://www.myspace.com/adrian232">Adrian</a>';
			if (icon_size == "ex-large")
				iconpack_width = 24;
			else if (icon_size == "large")
				iconpack_width = 20;
			else if (icon_size == "small")
				iconpack_width = 12;
			else
				iconpack_width = 16;
			iconpack_style = "border: none !important; height: auto !important; width: %width%px !important;";
		} else if (name.match(/^explodingboy/)) {
			copyright = 'Icons based on <a href="http://www.exploding-boy.com/2005/09/13/explodingboy-pixel-icons/">ExplodingBoy Pixel Icons</a>';
			
			if (!name.match(/-/)) {
				iconpack = "explodingboy";
				icon_base = "http://i104.photobucket.com/albums/m170/Adrian_232/myspace_icons/explodingboy2/";
				
				copyright = 'Icons based on <a href="http://www.exploding-boy.com/2005/09/28/more-free-icons/">ExplodingBoy More Pixel Icons</a>';
			} else if (name.match(/-blue/)) {
				iconpack = "explodingboy-blue";
				icon_base = "http://i104.photobucket.com/albums/m170/Adrian_232/myspace_icons/explodingboy-blue/";
			} else if (name.match(/-orange/)) {
				iconpack = "explodingboy-orange";
				icon_base = "http://i104.photobucket.com/albums/m170/Adrian_232/myspace_icons/explodingboy-orange/";
			} else {
				iconpack = "explodingboy-grey";
				icon_base = "http://i104.photobucket.com/albums/m170/Adrian_232/myspace_icons/explodingboy-grey/";
			}
			iconpack_ext = "gif";
			if (icon_size == "ex-large")
				iconpack_width = 24;
			else if (icon_size == "large")
				iconpack_width = 20;
			else if (icon_size == "small")
				iconpack_width = 12;
			else
				iconpack_width = 16;
			iconpack_style = "border: none !important; height: auto !important; width: %width%px !important;";
		} else if (name == "original") {
			iconpack = "original";
			icon_base = "http://i104.photobucket.com/albums/m170/Adrian_232/myspace_icons/original/";
			iconpack_ext = "png";
			
			copyright = 'Icons based on the original design by Steve Ryherd (modified by <a href="http://www.myspace.com/adrian232">Adrian</a>)';
			
			if (icon_size == "ex-large")
				iconpack_width = 24;
			else if (icon_size == "large")
				iconpack_width = 20;
			else if (icon_size == "small")
				iconpack_width = 12;
			else
				iconpack_width = 16;
			iconpack_style = "border: none !important; height: auto !important; width: %width%px !important;";
		} else {
			iconpack = 'silk';
			// 16 x 16 px PNG transparent icons
			icon_base = "http://i104.photobucket.com/albums/m170/Adrian_232/myspace_icons/silk/";
			iconpack_ext = "png";
			
			copyright = 'Icons from <a href="http://www.famfamfam.com/lab/icons/silk/">FamFamFam\'s Silk Icons</a>';
			
			if (icon_size == "ex-large")
				iconpack_width = 24;
			else if (icon_size == "large")
				iconpack_width = 20;
			else if (icon_size == "small")
				iconpack_width = 12;
			else
				iconpack_width = 16;
			iconpack_style = "border: none !important; height: auto !important; width: %width%px !important;";
		}
		
		// change the vars on the prefs pane
		if (form) {
			if (form.copyright)
				form.copyright.innerHTML = copyright;
			parent.fixLinks();
		}
	};
	this.changeIconpack(iconpack);
	
	// get and store the token
	var MyToken = getMyToken();
	
	// Transforms a list of `,' delimited shortcut names into real Shortcuts
	this.newShortcutsFromString = function(shortcut_list) {
		shortcuts = shortcut_list.split(',');
		for (var i = 0; i < shortcuts.length; i++)
			shortcuts[i] = new Shortcut(shortcuts[i]);
	};
	this.newShortcutsFromString(shortcuts);
	
	// clear the links loaded from makeLinks()
	this.clearLinks = function() {
		BENCHMARKS.start("clearLinks");
		var num = 0;
		for (var i = 0; i < links.length; i++)
			if (links[i] && links[i].parentNode) {
				num++;
				links[i].parentNode.removeChild(links[i]);
			}
		if (!ScriptData.stable) GM_log(num + " Links cleared.");
		links = new Array();
		BENCHMARKS.stop("clearLinks");
	};
	
	var easteregg = false;
	this.getAllShortcuts = function() {
		var allshortcuts = "add_friend,delete_friend,view_friends,add_favorite,add_favorite_pub,delete_favorite,block_user,report_user,view_pictures,view_videos,view_showtimes,send_mail,send_im,add_comment,view_comments,view_bulletins,add_group,view_groups,rank_user,forward_friend,view_blog,invite_blog,subscribe_blog,unsubscribe_blog,add_preferred,remove_preferred";
		
		var remove = function(o) {allshortcuts = allshortcuts.replace(new RegExp(',?'+o, 'g'), '');};
		if (smart_links == "true") {
			// remove the alternatives if smart links are enabled
			remove('delete_friend');
			remove('delete_favorite');
			remove('unsubscribe_blog');
			remove('remove_preferred');
			remove('remove_addressbook');
		}
		if (easteregg) allshortcuts += ',view_birthdays';
		return allshortcuts;
	}
	
	// The Shortcut object, needs variables inherited from ImageLinks
	function Shortcut(name) {
		BENCHMARKS.start("Shortcut");
		var shortcut = this; // set `this' into alternative name
		this.name = name;
		
		// for smart links: switches to the alternative
		this.morph = function(links) {
			if (iconpack == "menu" || links.id == "profileaction") {
				var a = links.getElementsByTagName("option");
				for (var j = 0; j < a.length; j++) {
					if (a[j].label == shortcut.name) {
						a[j].style.removeProperty('display');
						a[j].style.setProperty('display', 'none', null);
					}
					if (a[j].label == shortcut.smart_alt) {
						a[j].style.removeProperty('display');
						a[j].style.setProperty('display', 'block', null);
					}
					//GM_log(a[j].name + ":" + a[j].style['display']);
				}
			} else {
				var a = links.getElementsByTagName("a");
				for (var j = 0; j < a.length; j++) {
					if (a[j].name == shortcut.name) {
						a[j].style.removeProperty('display');
						a[j].style.setProperty('display', 'none', null);
					}
					if (a[j].name == shortcut.smart_alt) {
						a[j].style.removeProperty('display');
						a[j].style.setProperty('display', 'inline', null);
					}
					//GM_log(a[j].name + ":" + a[j].style['display']);
				}
			}
		}
		
		this.unGrey = function(links) {
			if (iconpack == "menu" || links.id == "profileaction") {
				var a = links.getElementsByTagName("option");
				for (var j = 0; j < a.length; j++) {
					if (a[j].label == shortcut.name || a[j].label == shortcut.smart_alt)
						a[j].style.setProperty('opacity', '1.0', null);
				}
			} else {
				var a = links.getElementsByTagName("a");
				for (var j = 0; j < a.length; j++) {
					if (a[j].name == shortcut.name || a[j].name == shortcut.smart_alt)
						a[j].style.setProperty('opacity', '1.0', null);
				}
			}
		}
		
		if (name == 'add_friend') {
			this.description = 'Add to Friends';
			this.abbr = '+F';
			this.url = "'http://messaging.myspace.com/index.cfm?fuseaction=invite.addfriend_verify&friendID=' + friendID + '&MyToken=' + MyToken";
			
			this.quickActionDisabled = function(r) {
				if (r.responseText.match(/<div class="captcha">/i)) {
					// MySpace wants a CAPTCHA
					if (!confirm("The User has requested that all friend requests be verified using a CAPTCHA image. Press OK to continue.")) {
						document.body.style.removeProperty('cursor');
						this.event.target.style.removeProperty('cursor');
						return;
					}
					if (link_target == "_blank")
						GM_openInTab(this.urlEval);
					else
						document.location.href = this.urlEval;
					document.body.style.removeProperty('cursor');
					this.event.target.style.removeProperty('cursor');
					return;
				}
				var match = r.responseText.match(/<input type="hidden" name="hashcode" value="([^"]+)">/i);
				if (match)
					var hash = match[1];
				if (!hash) {
					if (r.responseText.match(/This member is already one of your friends\. /i))
						alert('This member is already one of your friends.');
					else
						alert('Could not ' + this.description + '. Try again later.');
					document.body.style.removeProperty('cursor');
					this.event.target.style.removeProperty('cursor');
					return;
				}
				var data = 'friendID='+encodeURIComponent(this.friendID)+'&hashcode='+encodeURIComponent(hash);
				//GM_log(data);
				GM_xmlhttpRequest({
					method:'POST',
					url:'http://collect.myspace.com/index.cfm?fuseaction=invite.addFriendsProcess&Mytoken=' + this.MyToken,
					headers:{'Content-type': 'application/x-www-form-urlencoded'},
					data:data,
					onload:(function(r) {
						var warning = '';
						if (r.responseText.match(ERROR_PAGE_REGEXP))
							warning = "\nWARNING: Response returned an error, may not have completed.";
						cache.load();
						cache['add_friend'][this.friendID] = "*Pending*" + cache[name][this.friendID];
						cache.storeFriends();
						parent.clearLinks();
						parent.makeAllLinks();
						alert('Friend Request Submitted!' + warning);
						document.body.style.removeProperty('cursor');
					}).bind(this),
					onerror:(function(r) {
						alert('An error occured when attempting to ' + this.description + '. Try again later.');
						if (!ScriptData.stable) GM_log(r.toSource());
						document.body.style.removeProperty('cursor');
						this.event.target.style.removeProperty('cursor');
					}).bind(this)
				});
				document.body.style.removeProperty('cursor');
			}
			
			this.smart_alt = 'delete_friend';
			this.smartCallback = function(r) {
				var text = (this.cache ? cache[name][this.friendID] : r.responseText);
				if (this.cache && text == '') {
					// wait it out
					if (typeof this.waited == 'undefined')
						this.waited = 0;
					if (++this.waited < 30)
						setTimeout(shortcut.smartCallback.bind(this), 1000);
					else {
						// give up and try our own request
						this.waited = 0;
						this.cache = false;
						if (!ScriptData.stable) GM_log('Re-Getting (Gave Up): ' + this.urlEval);
						GM_xmlhttpRequest({
							method:'GET',
							url:this.urlEval,
							onload:shortcut.smartCallback.bind(this)
						});
					}
					return;
				}
				
				var match = /This member is already one of your friends\./i;
				
				// set the cache
				if (!this.cache || (cache[name][this.friendID] && cache[name][this.friendID].match(/^\*Pending\*/) && text.match(match))) {
					if (text.match(ERROR_PAGE_REGEXP)) {
						if (typeof this.tries == 'undefined')
							this.tries = 0;
						if (++this.tries > 4)
							return; // give up
						// try again
						if (!ScriptData.stable) GM_log('Re-Getting: ' + this.urlEval);
						GM_xmlhttpRequest({
							method:'GET',
							url:this.urlEval,
							onload:shortcut.smartCallback.bind(this)
						});
						return;
					}
					cache.load();
					cache[name][this.friendID] = text.clean(match);
					cache.storeFriends();
				} else if (!this.cache && cache[name][this.friendID] && cache[name][this.friendID].match(/^\*Pending\*/)) {
					// Check the pending requests page???
				}

				if (text.match(match))
					shortcut.morph(this.links);
				
				shortcut.unGrey(this.links);
				return;
			};
			this.smartFunc = function(links, friendID, MyToken) {
				var scope = {links:links, friendID:friendID};
				scope.urlEval = eval(shortcut.url);
				if (typeof cache[name] == 'undefined')
					cache[name] = new Object();
				if (typeof cache[name][scope.friendID] != 'undefined' && !cache[name][scope.friendID].match(/\*Pending\*/)) {
					scope.cache = true;
					shortcut.smartCallback.bind(scope)({responseText:cache[name][scope.friendID]});
				} else {
					if (!ScriptData.stable) GM_log('Getting: ' + scope.urlEval);
					GM_xmlhttpRequest({
						method:'GET',
						url:scope.urlEval,
						onload:shortcut.smartCallback.bind(scope)
					});
					cache[name][scope.friendID] = '';
				}
			};
		}
		
		if (name == 'delete_friend') {
			this.description = 'Remove from Friends';
			this.abbr = '-F';
			this.url = "'http://collect.myspace.com/index.cfm?fuseaction=user.confirmdeletefriend&friendID=' + friendID + '&MyToken=' + MyToken";
			
			this.quickAction = function(r) {
				var match = r.responseText.match(/<input type="hidden" name="hash" value="([^"]+)">/i);
				//GM_log(uneval(match));
				if (match)
					var hash = match[1];
				if (!hash) {
					alert('Could not ' + this.description + '. Try again later.');
					document.body.style.removeProperty('cursor');
					this.event.target.style.removeProperty('cursor');
					return;
				}
				var data = 'delfriendID='+encodeURIComponent(this.friendID)+'&hash='+encodeURIComponent(hash);
				//GM_log(data);
				GM_xmlhttpRequest({
					method:'POST',
					url:'http://collect.myspace.com/index.cfm?fuseaction=user.deleteFriend&Mytoken=' + this.MyToken,
					headers:{'Content-type': 'application/x-www-form-urlencoded'},
					data:data,
					onload:(function(r) {
						var warning = '';
						if (r.responseText.match(ERROR_PAGE_REGEXP))
							warning = "\nWARNING: Response returned an error, may not have completed.";
						cache.load();
						delete cache['add_friend'][this.friendID];
						cache.storeFriends();
						parent.clearLinks();
						parent.makeAllLinks();
						alert('Removed Friend!' + warning);
						document.body.style.removeProperty('cursor');
					}).bind(this),
					onerror:(function(r) {
						alert('An error occured when attempting to ' + this.description + '. Try again later.');
						if (!ScriptData.stable) GM_log(r.toSource());
						document.body.style.removeProperty('cursor');
						this.event.target.style.removeProperty('cursor');
					}).bind(this)
				});
			}
			
			this.smart_hidden = true;
		}
	
		if (name == 'view_friends') {
			this.description = 'View Friends';   
			this.abbr = '⇒F';
			this.url = "'http://home.myspace.com/index.cfm?fuseaction=user.viewfriends&friendID=' + friendID + '&MyToken=' + MyToken";
		}
	
		if (name == 'add_favorite' || name == 'add_favorite_pub') {
			this.description = 'Add to Favorites';
			this.abbr = '+♥';
			if (name == 'add_favorite_pub')
				this.description += ' (public)';
			else
				this.description += ' (private)';
			this.url = "'http://collect.myspace.com/index.cfm?fuseaction=user.addToFavorite&friendID=' + friendID + '&MyToken=' + MyToken";
			if (name == 'add_favorite_pub')
				this.url += "+ '&public=1'";
			else
				this.url += "+ '&public=0'";
			
			name = 'add_favorite'; // for icon
			
			this.quickAction = function(r) {
				var match1 = r.responseText.match(/<input type="hidden" name="hash" value="([^"]+)">/i);
				if (match1)
					var hash = match1[1];
				var match2 = r.responseText.match(/<input type="hidden" name="public" value="([01])">/i);
				//GM_log(r.responseText);
				if (match2)
					this.isPublic = match2[1];
				if (!hash || !this.isPublic) {
					alert('Could not ' + this.description + '. Try again later. ');
					document.body.style.removeProperty('cursor');
					this.event.target.style.removeProperty('cursor');
					return;
				}
				var data = 'friendID='+encodeURIComponent(this.friendID)+'&public='+this.isPublic+'&hash='+encodeURIComponent(hash);
				//GM_log(data);
				GM_xmlhttpRequest({
					method:'POST',
					url:'http://collect.myspace.com/index.cfm?fuseaction=user.addFavoriteProcess&Mytoken=' + this.MyToken,
					headers:{'Content-type': 'application/x-www-form-urlencoded'},
					data:data,
					onload:(function(r) {
						var warning = '';
						if (r.responseText.match(ERROR_PAGE_REGEXP))
							warning = "\nWARNING: Response returned an error, may not have completed.";
						// clear the favorites' cache
						cache.load();
						delete cache['add_favorite'];
						cache.storeOthers();
						parent.clearLinks();
						parent.makeAllLinks();
						alert('Added Favorite (' + (parseInt(this.isPublic) ? "Public" : "Private") + ')!' + warning);
						document.body.style.removeProperty('cursor');
					}).bind(this),
					onerror:(function(r) {
						alert('An error occured when attempting to ' + this.description + '. Try again later.');
						if (!ScriptData.stable) GM_log(r.toSource());
						document.body.style.removeProperty('cursor');
						this.event.target.style.removeProperty('cursor');
					}).bind(this)
				});
			}
			
			this.smart_alt = 'delete_favorite';
			this.smartCallback = function(r) {
				var text = (this.cache ? cache[name][this.page] : r.responseText);
				if (this.cache && text == '') {
					// wait it out
					if (typeof this.waited == 'undefined')
						this.waited = 0;
					if (++this.waited < 30)
						setTimeout(shortcut.smartCallback.bind(this), 1000);
					else {
						// give up and try our own request
						this.waited = 0;
						this.cache = false;
						if (!ScriptData.stable) GM_log('Re-Getting (Gave Up): ' + 'http://favorites.myspace.com/index.cfm?fuseaction=user.favorites&page=' + this.page + '&Mytoken=' + this.MyToken);
						GM_xmlhttpRequest({
							method:'GET',
							url:'http://favorites.myspace.com/index.cfm?fuseaction=user.favorites&page=' + this.page + '&Mytoken=' + this.MyToken,
							onload:shortcut.smartCallback.bind(this)
						});
					}
					return;
				}
				
				// set the cache
				if (!this.cache) {
					var match = text.clean(/((<td nowrap>Listing(\n|\r|.)*<td nowrap>Listing)|(You currently do not have any users added to your Favorites List\.))/i);
					if (text.match(ERROR_PAGE_REGEXP) || match == "No Match") {
						if (typeof this.tries == 'undefined')
							this.tries = 0;
						if (++this.tries > 4)
							return; // give up
						// try again
						if (!ScriptData.stable) GM_log('Re-Getting: ' + 'http://favorites.myspace.com/index.cfm?fuseaction=user.favorites&page=' + this.page + '&Mytoken=' + this.MyToken);
						GM_xmlhttpRequest({
							method:'GET',
							url:'http://favorites.myspace.com/index.cfm?fuseaction=user.favorites&page=' + this.page + '&Mytoken=' + this.MyToken,
							onload:shortcut.smartCallback.bind(this)
						});
						return;
					}
					cache.load();
					cache[name][this.page] = match;
					cache.storeOthers();
				}
				
				if (text.match(new RegExp('ID="UserDataNode[0-9]+" CLASS="DataPoint=OnlineNow;UserID=' + this.friendID + ';"', 'i'))) {
					shortcut.morph(this.links);
					shortcut.unGrey(this.links);
					return;
				}
				
				// find the max page
				if (typeof this.maxPage == 'undefined') {
					match = text.match(/<td nowrap>Listing\s+1-10 of\s+([0-9]+)/i);
					if (match && match[1])
						this.maxPage = parseInt(match[1]) / 10; // 10 results per page
				}
				this.page++;
				if (!this.maxPage || this.page >= this.maxPage) {
					shortcut.unGrey(this.links);
					return;
				}
				
				if (typeof cache[name][this.page] != 'undefined') {
					this.cache = true;
					shortcut.smartCallback.bind(this)({responseText:cache[name][this.page]});
				} else {
					this.cache = false;
					if (!ScriptData.stable) GM_log('Getting: ' + 'http://favorites.myspace.com/index.cfm?fuseaction=user.favorites&page=' + this.page + '&Mytoken=' + this.MyToken);
					GM_xmlhttpRequest({
						method:'GET',
						url:'http://favorites.myspace.com/index.cfm?fuseaction=user.favorites&page=' + this.page + '&Mytoken=' + this.MyToken,
						onload:shortcut.smartCallback.bind(this)
					});
					cache[name][this.page] = '';
				}
				return;
			};
			this.smartFunc = function(links, friendID, MyToken) {
				var scope = {links:links, friendID:friendID, MyToken:MyToken, page:0};
				if (typeof cache[name] != 'undefined') {
					scope.cache = true;
					shortcut.smartCallback.bind(scope)({responseText:cache[name][scope.page]});
				} else {
					if (!ScriptData.stable) GM_log('Getting: ' + 'http://favorites.myspace.com/index.cfm?fuseaction=user.favorites&page=' + scope.page + '&Mytoken=' + scope.MyToken);
					GM_xmlhttpRequest({
						method:'GET',
						url:'http://favorites.myspace.com/index.cfm?fuseaction=user.favorites&page=' + scope.page + '&Mytoken=' + scope.MyToken,
						onload:shortcut.smartCallback.bind(scope)
					});
					cache[name] = new Array();
					cache[name][scope.page] = '';
				}
			};
		}
		
		if (name == 'delete_favorite') {
			this.description = 'Remove from Favorites';
			this.abbr = '-♥';
			this.url = "'http://www1.myspace.com/index.cfm?fuseaction=user.removeFavorite&friendID=' + friendID + '&MyToken=' + MyToken";
			
			this.quickAction = function(r) {
				// clear the cache
				cache.load();
				delete cache['add_favorite'];
				cache.storeOthers();
				parent.clearLinks();
				parent.makeAllLinks();
				alert('Removed Favorite!');
				document.body.style.removeProperty('cursor');
				this.event.target.style.removeProperty('cursor');
			}
			
			this.smart_hidden = true;
		}
			   
		if (name == 'block_user') {
			this.description = 'Block User';
			this.abbr = '⊗⊗';
			this.url = "'http://www.myspace.com/index.cfm?fuseaction=block.blockUser&userID=' + friendID + '&MyToken=' + MyToken";
			
			this.quickAction = function(r) {
				var match1 = r.responseText.match(/"(http:\/\/collect\.myspace\.com\/index\.cfm\?fuseaction=block\.blockUserProcess&UserID=[0-9]+&hash=[^"]+)"/i);
				if (match1)
					var url = match1[1];
				//GM_log(r.responseText);
				if (!url) {
					alert('Could not ' + this.description + '. Try again later. ');
					document.body.style.removeProperty('cursor');
					this.event.target.style.removeProperty('cursor');
					return;
				}
				GM_xmlhttpRequest({
					method:'GET',
					url:url,
					onload:(function(r) {
						var warning = '';
						if (r.responseText.match(ERROR_PAGE_REGEXP))
							warning = "\nWARNING: Response returned an error, may not have completed.";
						//parent.clearLinks();
						//parent.makeAllLinks();
						alert('User Blocked!' + warning);
						document.body.style.removeProperty('cursor');
						this.event.target.style.removeProperty('cursor');
					}).bind(this),
					onerror:(function(r) {
						alert('An error occured when attempting to ' + this.description + '. Try again later.');
						if (!ScriptData.stable) GM_log(r.toSource());
						document.body.style.removeProperty('cursor');
						this.event.target.style.removeProperty('cursor');
					}).bind(this)
				});
			}
		}
		
		if (name == 'report_user') {
			this.description = 'Report Inappropriate Content';
			this.abbr = '!@'
			this.url = "'http://collect.myspace.com/index.cfm?fuseaction=misc.contactInput&ProfileContentID=' + friendID + '&MyToken=' + MyToken";
		}
		
		if (name == 'view_pictures') {
			this.description = 'View Pictures';
			this.abbr = '⇒P';
			this.url = "'http://viewmorepics.myspace.com/index.cfm?fuseaction=user.viewAlbums&friendID=' + friendID + '&MyToken=' + MyToken";
		}
		
		if (name == 'view_videos') {
			this.description = 'View Videos';
			this.abbr = '⇒V';
			this.url = "'http://vids.myspace.com/index.cfm?fuseaction=vids.showvids&friendID=' + friendID + '&MyToken=' + MyToken";
		}
		
		if (name == 'view_showtimes') {
			this.description = 'View Band\'s Showtimes';
			this.abbr = '⇒S';
			this.url = "'http://collect.myspace.com/index.cfm?fuseaction=bandprofile.listAllShows&friendid=' + friendID + '&MyToken=' + MyToken";
			
			this.smart_alt = 'view_showtimes';
			this.smartCallback = function(r) {
				var text = (this.cache ? cache[name][this.friendID] : r.responseText);
				if (this.cache && text == '') {
					// wait it out
					if (typeof this.waited == 'undefined')
						this.waited = 0;
					if (++this.waited < 30)
						setTimeout(shortcut.smartCallback.bind(this), 1000);
					else {
						// give up and try our own request
						this.waited = 0;
						this.cache = false;
						if (!ScriptData.stable) GM_log('Re-Getting (Gave Up): ' + this.urlEval);
						GM_xmlhttpRequest({
							method:'GET',
							url:this.urlEval,
							onload:shortcut.smartCallback.bind(this)
						});
					}
					return;
				}
				
				var match = /<head>(\r|\n|.)*?"bandgenre[0-9]"(\r|\n|.)*?<\/head>/i;
				
				// set the cache
				if (!this.cache) {
					if (text.match(ERROR_PAGE_REGEXP)) {
						if (typeof this.tries == 'undefined')
							this.tries = 0;
						if (++this.tries > 4)
							return; // give up
						// try again
						if (!ScriptData.stable) GM_log('Re-Getting: ' + this.urlEval);
						GM_xmlhttpRequest({
							method:'GET',
							url:this.urlEval,
							onload:shortcut.smartCallback.bind(this)
						});
						return;
					}
					cache.load();
					cache[name][this.friendID] = text.clean(match);
					cache.storeBands();
				}

				if (text.match(match)) {
					//shortcut.morph(this.links);
					shortcut.unGrey(this.links);
				}
				return;
			};
			this.smartFunc = function(links, friendID, MyToken) {
				var scope = {links:links, friendID:friendID};
				if (typeof cache[name] == 'undefined')
					cache[name] = new Object();
				if (typeof cache[name][scope.friendID] != 'undefined') {
					scope.cache = true;
					shortcut.smartCallback.bind(scope)({responseText:cache[name][scope.friendID]});
				} else {
					if (!ScriptData.stable) GM_log('Getting: ' + 'http://profile.myspace.com/index.cfm?fuseaction=user.viewprofile&friendid=' + scope.friendID + '&MyToken=' + MyToken);
					GM_xmlhttpRequest({
						method:'GET',
						url:'http://profile.myspace.com/index.cfm?fuseaction=user.viewprofile&friendid=' + scope.friendID + '&MyToken=' + MyToken,
						onload:shortcut.smartCallback.bind(scope)
					});
					cache[name][scope.friendID] = '';
				}
			};
		}
	
		if (name == 'send_mail') {
			this.description = 'Send a Message';
			this.abbr = 'M⇒';
			this.url = "'http://collect.myspace.com/index.cfm?fuseaction=mail.message&friendID=' + friendID + '&MyToken=' + MyToken";
		}
		
		if (name == 'send_im') {
			this.description = 'Send an Instant Message';
			this.abbr = 'IM';
			this.url = "'myim:sendIM?uID=0&cID=;' + friendID";
			//this.onclick = '"javascript:up_launchIC(\'0\',\'" + friendID + "\',\'\',0);return false;"';
		}
	
		if (name == 'add_comment') {
			this.description = 'Leave a Comment';
			this.abbr = 'C⇒';
			this.url = "'http://comment.myspace.com/index.cfm?fuseaction=user.viewProfile_commentForm&friendID=' + friendID + '&MyToken=' + MyToken";
		}
			   
		if (name == 'view_comments') {
			this.description = 'View Comments';
			this.abbr = '⇒C';
			this.url = "'http://comment.myspace.com/index.cfm?fuseaction=user.viewComments&friendID=' + friendID + '&MyToken=' + MyToken";
		}
		
		if (name == 'view_bulletins') {
			this.description = 'View Bulletins';
			this.abbr = '⇒B';
			this.url = "'http://bulletins.myspace.com/index.cfm?fuseaction=bulletin.ShowMyBulletins&friendID=' + friendID + '&MyToken=' + MyToken";
		}
		
		if (name == 'add_group') {
			this.description = 'Add to Group';
			this.abbr = 'G⇒';
			this.url = "'http://groups.myspace.com/index.cfm?fuseaction=groups.addtogroup&friendID=' + friendID + '&MyToken=' + MyToken";
		}
		
		if (name == 'view_groups') {
			this.description = 'View Groups';
			this.abbr = '⇒G';
			this.url = "'http://groups.myspace.com/index.cfm?fuseaction=groups.myGroups&userid=' + friendID + '&MyToken=' + MyToken";
		}
		
		if (name == 'rank_user') {
			this.description = 'Rank User';
			this.abbr = '↑↓';
			this.url = "'http://collect.myspace.com/index.cfm?fuseaction=RateImage.UserRating&UserID=' + friendID + '&MyToken=' + MyToken";
		}
		
		if (name == 'forward_friend') {
			this.description = 'Forward to Friend';
			this.abbr = 'F⇒';
			this.url = "'http://messaging.myspace.com/index.cfm?fuseaction=mail.forward&friendID=' + friendID + '&f=forwardprofile' + '&MyToken=' + MyToken";
		}
		
		if (name == 'view_blog') {
			this.description = 'View Blog';
			this.abbr = '≡≡';
			this.url = "'http://blog.myspace.com/index.cfm?fuseaction=blog.ListAll&friendID=' + friendID + '&MyToken=' + MyToken";
		}
		
		if (name == 'invite_blog') {
			this.description = 'Invite to Blog';
			this.abbr = '≡⇒';
			/* Will only work with quick links active; needs a hash for the URL */
			this.only_quick = true;
			this.url = "'http://blog.myspace.com/index.cfm?fuseaction=blog.addToReader&friendID=' + friendID + '&MyToken=' + MyToken";
			this.quickAction = function(r) {
				var match1 = r.responseText.match(/"(http:\/\/blog\.myspace\.com\/index\.cfm\?fuseaction=blog\.addToReader&h=[^"]+)"/i);
				if (match1)
					var url = match1[1];
				//GM_log(r.responseText);
				if (!url) {
					alert('Could not ' + this.description + '. Try Again later. ');
					document.body.style.removeProperty('cursor');
					this.event.target.style.removeProperty('cursor');
					return;
				}
				GM_xmlhttpRequest({
					method:'GET',
					url:url,
					onload:(function(r) {
						var warning = '';
						if (r.responseText.match(ERROR_PAGE_REGEXP))
							warning = "\nWARNING: Response returned an error, may not have completed.";
						//parent.clearLinks();
						//parent.makeAllLinks();
						alert('User Invited to Blog!' + warning);
						document.body.style.removeProperty('cursor');
						this.event.target.style.removeProperty('cursor');
					}).bind(this),
					onerror:(function(r) {
						alert('An error occured when attempting to ' + this.description + '. Try again later.');
						if (!ScriptData.stable) GM_log(r.toSource());
						document.body.style.removeProperty('cursor');
						this.event.target.style.removeProperty('cursor');
					}).bind(this)
				});
			}
		}
		
		if (name == 'subscribe_blog') {
			this.description = 'Subscribe to Blog';
			this.abbr = '√≡';
			this.url = "'http://blog.myspace.com/index.cfm?fuseaction=blog.ConfirmSubscribe&friendID=' + friendID + '&MyToken=' + MyToken";
			
			this.quickAction = function(r) {
				// we already have all the data we need
				var data = 'friendID='+encodeURIComponent(this.friendID);
				//GM_log(data);
				GM_xmlhttpRequest({
					method:'POST',
					headers:{'Content-type': 'application/x-www-form-urlencoded'},
					data:data,
					url:'http://blog.myspace.com/index.cfm?fuseaction=blog.subscribe&Mytoken=' + this.MyToken,
					onload:(function(r) {
						var warning = '';
						if (r.responseText.match(ERROR_PAGE_REGEXP))
							warning = "\nWARNING: Response returned an error, may not have completed.";
						// clear the cache
						cache.load();
						delete cache['subscribe_blog'];
						cache.storeOthers();
						parent.clearLinks();
						parent.makeAllLinks();
						alert('Subscribed to Blog!' + warning);
						document.body.style.removeProperty('cursor');
					}).bind(this),
					onerror:(function(r) {
						alert('An error occured when attempting to ' + this.description + '. Try again later.');
						if (!ScriptData.stable) GM_log(r.toSource());
						document.body.style.removeProperty('cursor');
						this.event.target.style.removeProperty('cursor');
					}).bind(this)
				});
			}
			
			this.smart_alt = 'unsubscribe_blog';
			this.smartCallback = function(r) {
				var text = (this.cache ? cache[name] : r.responseText);
				if (this.cache && text == '') {
					// wait it out
					if (typeof this.waited == 'undefined')
						this.waited = 0;
					if (++this.waited < 30)
						setTimeout(shortcut.smartCallback.bind(this), 1000);
					else {
						// give up and try our own request
						this.waited = 0;
						this.cache = false;
						if (!ScriptData.stable) GM_log('Re-Getting (Gave Up): ' + 'http://blogs.myspace.com/index.cfm?fuseaction=blog.mysubscriptions&Mytoken=' + this.MyToken);
						GM_xmlhttpRequest({
							method:'GET',
							url:'http://blogs.myspace.com/index.cfm?fuseaction=blog.mysubscriptions&Mytoken=' + this.MyToken,
							onload:shortcut.smartCallback.bind(this)
						});
					}
					return;
				}
				
				// set the cache
				if (!this.cache) {
					var match = text.clean(/<table class="blogContentTable">(\n|\r|.)*<div class="myBlogTblPagebtm">/i);
					if (text.match(ERROR_PAGE_REGEXP) || match == "No Match") {
						if (typeof this.tries == 'undefined')
							this.tries = 0;
						if (++this.tries > 4)
							return; // give up
						// try again
						if (!ScriptData.stable) GM_log('Re-Getting: ' + 'http://blogs.myspace.com/index.cfm?fuseaction=blog.mysubscriptions&Mytoken=' + this.MyToken);
						GM_xmlhttpRequest({
							method:'GET',
							url:'http://blog.myspace.com/index.cfm?fuseaction=blog.mysubscriptions&Mytoken=' + this.MyToken,
							onload:shortcut.smartCallback.bind(this)
						});
						return;
					}
					cache.load();
					cache[name] = match;
					cache.storeOthers();
				}
				
				var re = new RegExp(';friendid=' + this.friendID + '">', 'i');
				var match = text.match(re);
				if (match)
					shortcut.morph(this.links);
				shortcut.unGrey(this.links);
				return;
			};
			this.smartFunc = function(links, friendID, MyToken) {
				var scope = {links:links, friendID:friendID, MyToken:MyToken};
				if (typeof cache[name] != 'undefined') {
					scope.cache = true;
					shortcut.smartCallback.bind(scope)({responseText:cache[name]});
				} else {
					if (!ScriptData.stable) GM_log('Getting: ' + 'http://blogs.myspace.com/index.cfm?fuseaction=blog.mysubscriptions&Mytoken=' + MyToken);
					GM_xmlhttpRequest({
						method:'GET',
						url:'http://blogs.myspace.com/index.cfm?fuseaction=blog.mysubscriptions&Mytoken=' + MyToken,
						onload:shortcut.smartCallback.bind(scope)
					});
					cache[name] = '';
				}
			};
		}
		
		if (name == 'unsubscribe_blog') {
			this.description = 'Unsubscribe from Blog';
			this.abbr = 'x≡';
			this.url = "'http://blog.myspace.com/index.cfm?fuseaction=blog.unsubscribe&friendID=' + friendID + '&Mytoken=' + MyToken";
			
			this.quickAction = function(r) {
				var warning = '';
				if (r.responseText.match(ERROR_PAGE_REGEXP))
					warning = "\nWARNING: Response returned an error, may not have completed.";
				// clear the cache
				cache.load();
				delete cache['subscribe_blog'];
				cache.storeOthers();
				parent.clearLinks();
				parent.makeAllLinks();
				alert('Unsubscribed from Blog!' + warning);
				document.body.style.removeProperty('cursor');
				this.event.target.style.removeProperty('cursor');
			}
			
			this.smart_hidden = true;
		}
		
		if (name == 'add_preferred') {
			this.description = 'Add to Blog Preferred List';
			this.abbr = '+∗';
			this.url = "'http://blog.myspace.com/index.cfm?fuseaction=blog.addToPrivateList&friendID=' + friendID + '&Mytoken=' + MyToken"; // needs a lowercase 't' ?
			
			this.quickAction = function(r) {
				match = r.responseText.match(new RegExp('friendID=' + this.friendID + '&', 'i'));
				var warning = '';
				if (r.responseText.match(ERROR_PAGE_REGEXP))
					warning = "\nWARNING: Response returned an error, may not have completed.";
				if (!match && !warning) {
					alert('Friend not added to Blog Preferred List. This may be an error in MySpace.');
				} else {
					// clear the cache
					cache.load();
					delete cache['add_preferred'];
					cache.storeOthers();
					parent.clearLinks();
					parent.makeAllLinks();
					alert('Added Friend to Blog Preferred List!' + warning);
				}
				document.body.style.removeProperty('cursor');
				this.event.target.style.removeProperty('cursor');
			}
			
			this.smart_alt = 'remove_preferred';
			this.smartCallback = function(r) {
				var text = (this.cache ? cache[name] : r.responseText);
				if (this.cache && text == '') {
					// wait it out
					if (typeof this.waited == 'undefined')
						this.waited = 0;
					if (++this.waited < 30)
						setTimeout(shortcut.smartCallback.bind(this), 1000);
					else {
						// give up and try our own request
						this.waited = 0;
						this.cache = false;
						if (!ScriptData.stable) GM_log('Re-Getting (Gave Up): ' + 'http://blog.myspace.com/index.cfm?fuseaction=blog.myPrivateList&Mytoken=' + this.MyToken);
						GM_xmlhttpRequest({
							method:'GET',
							url:'http://blog.myspace.com/index.cfm?fuseaction=blog.myPrivateList&Mytoken=' + this.MyToken,
							onload:shortcut.smartCallback.bind(this)
						});
					}
					return;
				}
				
				// set the cache
				if (!this.cache) {
					var match = text.clean(/My Private List(\n|\r|.)*<div id="blognav">/i);
					if (text.match(ERROR_PAGE_REGEXP) || match == "No Match") {
						if (typeof this.tries == 'undefined')
							this.tries = 0;
						if (++this.tries > 4)
							return; // give up
						// try again
						if (!ScriptData.stable) GM_log('Re-Getting: ' + 'http://blog.myspace.com/index.cfm?fuseaction=blog.myPrivateList&Mytoken=' + this.MyToken);
						GM_xmlhttpRequest({
							method:'GET',
							url:'http://blog.myspace.com/index.cfm?fuseaction=blog.myPrivateList&Mytoken=' + this.MyToken,
							onload:shortcut.smartCallback.bind(this)
						});
						return;
					}
					cache.load();
					cache[name] = match;
					cache.storeOthers();
				}
				
				if (text.match(new RegExp('onclick="return doRemove\\(\'' + this.friendID + '\'\\);"', 'i')))
					shortcut.morph(this.links);
				shortcut.unGrey(this.links);
				return;
			};
			this.smartFunc = function(links, friendID, MyToken) {
				var scope = {links:links, friendID:friendID, MyToken:MyToken};
				if (typeof cache[name] != 'undefined') {
					scope.cache = true;
					shortcut.smartCallback.bind(scope)({responseText:cache[name]});
				} else {
					if (!ScriptData.stable) GM_log('Getting: ' + 'http://blog.myspace.com/index.cfm?fuseaction=blog.myPrivateList&Mytoken=' + MyToken);
					GM_xmlhttpRequest({
						method:'GET',
						url:'http://blog.myspace.com/index.cfm?fuseaction=blog.myPrivateList&Mytoken=' + MyToken,
						onload:shortcut.smartCallback.bind(scope)
					});
					cache[name] = '';
				}
			};
		}
		
		if (name == 'remove_preferred') {
			this.description = 'Remove from Blog Preferred List';
			this.abbr = '-∗';
			this.url = "'http://blog.myspace.com/index.cfm?fuseaction=blog.removeFromPrivateList&friendID=' + friendID + '&Mytoken=' + MyToken";
			
			this.quickAction = function(r) {
				var warning = '';
				if (r.responseText.match(ERROR_PAGE_REGEXP))
					warning = "\nWARNING: Response returned an error, may not have completed.";
				// clear the cache
				cache.load();
				delete cache['add_preferred'];
				cache.storeOthers();
				parent.clearLinks();
				parent.makeAllLinks();
				alert('Removed Friend from Blog Preferred List!' + warning);
				document.body.style.removeProperty('cursor');
				this.event.target.style.removeProperty('cursor');
			}
			
			this.smart_hidden = true;
		}
		
		if (name == 'add_addressbook') {
			// don't use this one; still in the works!
			this.description = 'Add to Address Book';
			this.abbr = '+§';
			this.url = "'http://messaging.myspace.com/index.cfm?fuseaction=adb.addContact&friendID=' + friendID + '&Mytoken=' + MyToken";
			
			this.getPostData = function() {
				var data = "jsonContactObject=" +  encodeURIComponent('{"ContactID":0,"UserID":0,"FirstName":"","LastName":"","ContactUserID":14043217,"UserName":"' + this.friendID + '","DisplayName":"' + this.friendID + '","ContactEmailList":{"ContactID":0,"List":[]},"ContactPhoneList":{"ContactID":0,"List":[]},"ContactMessengerScreenNameList":{"ContactID":0,"List":[]},"ContactAddressList":{"ContactID":0,"List":[]},"ContactEventList":{"ContactID":0,"List":[]},"ImageURI":""}');
				GM_log("Sending: " + data.toString());
				return data;
			}
			
			this.quickAction = function(r) {
				var warning = '';
				if (r.responseText.match(ERROR_PAGE_REGEXP))
					warning = "\nWARNING: Response returned an error, may not have completed.";
				alert('Added Friend to Address Book!' + warning);
				GM_log(r.responseText);
				document.body.style.removeProperty('cursor');
				this.event.target.style.removeProperty('cursor');
			}
			
			this.smart_alt = 'remove_addressbook';
			this.smartCallback = function(r) {
			}
			this.smartFunc = function(links, friendID, MyToken) {
			}
		}
		
		if (name == 'remove_addressbook') {
			this.description = 'Remove From Address Book';
			this.abbr = '-§';
			this.url = "'about:blank?fuseaction=unknown&friendID=' + friendID + '&Mytoken=' + MyToken";
			
			this.quickAction = function(r) {
			}
			
			this.smart_hidden = true;
		}
		
		// This one is freaky...
		if (name == 'view_birthdays') {
			this.description = 'View Birthdays';
			this.abbr = '⇒B';
			this.url = "'http://collect.myspace.com/index.cfm?fuseaction=user.birthdays&friendID=' + friendID + '&userName=This+is+the+Birthdays+of+their+friends' + '&MyToken=' + MyToken";
		}
		
		this.icon = icon_base + name + '.' + iconpack_ext;
		BENCHMARKS.stop("Shortcut");
	};
	
	// the makeLinks method
	// was originally intended to be used as an EventListener function
	// `this' should refer to the picture to load the links under
	this.makeLinks = function(friendPic, tries, loading, startTime) {
		BENCHMARKS.start("makeLinks_init");
		if (!friendPic) {
			GM_log("Error: No friendPic!");
			return null;
		}
		if (typeof tries == 'undefined')
			tries = 0;

		var friendLink = friendPic.parentNode;
		
		if (++tries > 20) // 20 seconds
			always_90 = "true";
		// check if the image has loaded yet, if not try again in 5 seconds
		if (typeof friendPic.naturalWidth != "undefined" && friendPic.naturalWidth == 0 && always_90 != "true" && friendPic != unused && friendPic != sample) {
			// Put up our loading icon
			if (typeof loading == 'undefined') {
				loading = document.createElement('div');
				var img = createElement('img', loading);
				img.setAttribute("src", "http://i104.photobucket.com/albums/m170/Adrian_232/myspace_icons/ajax-loader.gif");
				img.style.setProperty('width', '16px', 'important');
				if (friendLink.nextSibling){
					friendLink.parentNode.insertBefore(loading, friendLink.nextSibling);
				} else {
					friendLink.parentNode.appendChild(loading);
				}
				if (friendPic != sample && friendPic != unused)
					links[links.length] = loading;
			}
			setTimeout(function() {parent.makeLinks(friendPic, tries, loading);}, 1000);
			return null;
		}
		if (loading) {
			// if the loading icon doesn't exist in the DOM, don't bother (prevents duplicates)
			if (!loading.parentNode)
				return;
			loading.parentNode.removeChild(loading);
		}
			
		var friendID = friendIdFromElem(friendLink);
		
		friendPic.style.setProperty('margin-bottom', '0px', 'important'); // remove the margin from the bottom of the image (if any)
		
		// If this is for unused shortcuts, put the unused ones here instead
		if (friendPic == unused) {
			var list = parent.getAllShortcuts().split(',');
			var extras = new Array();
			
			// remove the shortcuts being used
			var notOK = false;
			for (var i = 0; i < list.length; i++) {
				notOK = false;
				for (var j = 0; j < shortcuts.length; j++)
					if (list[i] == shortcuts[j].name)
						notOK = true;
				if (!notOK) {
					var temp = new Shortcut(list[i]);
					extras[extras.length] = temp;
					
				}
			}
		
			var shortcut_list = extras;
		} else
			var shortcut_list = shortcuts;
		
		// Create shortcut_list!
		var shortcutGroup = document.createElement('div');
		shortcutGroup.setAttribute("friendID", friendID);
		if (friendLink.id == "profileaction") {
			// switch the id to the shortcutGroup
			shortcutGroup.id = friendLink.id;
			//friendLink.id = "";
			shortcutGroup.style.setProperty('display', 'inline', 'important');
			friendPic.width = 125;
		} else {
			shortcutGroup.style.setProperty('width', '100%', 'important');
			shortcutGroup.style.setProperty('padding', '0px', 'important');
			shortcutGroup.style.setProperty('margin', '0px', 'important');
		}
		if (iconpack == "menu" || shortcutGroup.id == "profileaction") {
			var innerGroup = document.createElement('select');
			innerGroup.addEventListener('change', function(event) {
				if (this.value.match(/^http/)) {
					location.href = this.value;
					this.firstChild.selected = true;
					return;
				}
				
				if (!ScriptData.stable) GM_log(this.options[this.options.selectedIndex]);
				// sanity checking
				//if (this.value.substr(0,2) != "({")
					return;
				//parent.doQuickAction.bind(eval(this.value))(event);
			}, false);
			
			var actions = document.createElement('option');
			actions.selected = true;
			//actions.disabled = true; // for some reason having the default option disabled causes a weird bug
			actions.style.setProperty('opacity', '0.35', 'important');
			actions.style.setProperty('font-size', '11px', 'important');
			addText(actions, "Shortcuts...");
			innerGroup.appendChild(actions);
		} else {
			var innerGroup = document.createElement('span');
			//innerGroup.style['marginLeft'] = 'auto';
			//innerGroup.style['marginRight'] = 'auto';
			innerGroup.style.setProperty('text-align', 'center', 'important');
			innerGroup.style.setProperty('font-size', '9px', 'important');
		}
		shortcutGroup.appendChild(innerGroup);
		
		// set show/hide for mouseover
		if (mouseover == "true" && friendPic != sample && friendPic != unused) {
			// shortcuts under "hidden" images will always be displayed
			if (friendPic.style && friendPic.style['display'] != 'none' &&
				friendLink.style && friendLink.style['display'] != 'none') {
				shortcutGroup.style.setProperty('display', 'none', 'important');
				shortcutGroup.addEventListener('mouseover', parent.showShortcuts, false);
				shortcutGroup.addEventListener('mouseout', parent.hideShortcuts, false);
				friendLink.addEventListener('mouseover', parent.showShortcuts, false);
				friendLink.addEventListener('mouseout', parent.hideShortcuts, false);
			}
		} else {
			friendLink.removeEventListener('mouseover', parent.showShortcuts, false);
			friendLink.removeEventListener('mouseout', parent.hideShortcuts, false);
		}
		
		// inherit certain properties from the friendPic
		var marLeft = 0, padLeft = 0, borLeft = 0, marRight = 0, padRight = 0, borRight = 0;
		if (document.defaultView) {
			marLeft = parseInt(document.defaultView.getComputedStyle(friendPic,null).getPropertyValue('margin-left')) || 0;
			padLeft = parseInt(document.defaultView.getComputedStyle(friendPic,null).getPropertyValue('padding-left')) || 0;
			borLeft = parseInt(document.defaultView.getComputedStyle(friendPic,null).getPropertyValue('border-left-width')) || 0;
			marRight = parseInt(document.defaultView.getComputedStyle(friendPic,null).getPropertyValue('margin-right')) || 0;
			padRight = parseInt(document.defaultView.getComputedStyle(friendPic,null).getPropertyValue('padding-right')) || 0;
			borRight = parseInt(document.defaultView.getComputedStyle(friendPic,null).getPropertyValue('border-right-width')) || 0;
		}
		
		if (friendPic == unused)
			var minMargin = 3;
		else
			var minMargin = 1;
		//var friendPicWidth = friendPic.width < 90 ? (document.location && document.location.href.match(/=viewImage&/) ? 170 : 90) : friendPic.width;
		var friendPicWidth = friendPic.width;
		if (always_90 == "true")
			friendPicWidth = 90;
		if (friendPic == unused) {
			if (iconpack_width <= 16)
				friendPicWidth = 90;
			else if (iconpack_width <= 20)
				friendPicWidth = 150;
			else
				friendPicWidth = 180;
		}
		if (friendPicWidth > 320) // maximum width
			friendPicWidth = 320;
		//shortcutGroup.style.setProperty('width', friendPicWidth + 'px', 'important');
		var iconSize = iconpack_width + minMargin*2;
		//var maxIcons = parseInt((friendPicWidth + minMargin*2) / iconSize);
		if (friendPic != unused)
			var maxIcons = parseInt((90 + minMargin*2) / iconSize); // always use the 90px model
		else
			var maxIcons = parseInt((friendPicWidth + minMargin*2) / iconSize);
		
		// calculate the number of active links
		var num_active = shortcut_list.length;
			
		// This calculates the number of columns needed per row based on the number of icons and a specified maximum
		var rows = parseInt(num_active / maxIcons) + (num_active % maxIcons ? 1 : 0);
		var cols = parseInt(num_active / rows) + (num_active % rows ? 1 : 0);
			
		// This calculates the left and right margin sizes for the icons
		var margin = parseInt(((friendPicWidth - ((iconSize - minMargin*2) * (cols))) / (cols-1)) / 2);
		if (margin < minMargin)
			margin = minMargin;
		//margin = minMargin;
		
		// if there is a low number of icons, don't auto-space them
		if ((iconSize < 30 && num_active <= 3) || num_active <= 2)
			auto_spacing = "false";
		if (auto_spacing != "true" && friendPic != unused)
			margin = minMargin;

		var totalWidth = ((iconpack_width + margin*2) * cols);
		if (totalWidth < friendPicWidth) {
			marLeft += (friendPicWidth - totalWidth)/2;
			marRight += (friendPicWidth - totalWidth)/2;
		}
		
		if (iconpack == "menu") {
			innerGroup.setAttribute("style", iconpack_style.replace(/%width%/g, friendPicWidth));
			innerGroup.style.setProperty('font-size', '11px', '');
			innerGroup.style.setProperty('text-align', 'center', '');
		}
		if (shortcutGroup.id == "profileaction") {
			innerGroup.style.setProperty('font-size', '11px', 'important');
			innerGroup.style.setProperty('text-align', 'center', 'important');
		}
		
		// make some adjustments to the layout
		if (no_adjust != "true" && friendPic != unused) {
			if (friendLink.parentNode.clientWidth < Math.max(friendPicWidth, 90) + 8) {
				//GM_log(friendLink.parentNode.nodeName + " " + friendLink.parentNode.clientWidth);
				friendLink.parentNode.style.setProperty('width', (Math.max(friendPicWidth, 90) + 8) + 'px', 'important');
				friendLink.parentNode.style.setProperty('max-width', (Math.max(friendPicWidth, 90) + 8) + 'px', 'important');
				friendLink.parentNode.style.setProperty('text-align', 'center', 'important');
			}
			/* This may not be needed...
			var attrWidth = friendPic.getAttribute('width');
			if (attrWidth && parseInt(attrWidth) < 90)
				friendPic.setAttribute('width', '90');
			*/
		}
		
		BENCHMARKS.stop("makeLinks_init");
		BENCHMARKS.start("makeLinks_load");
		
		var createShortcutLink = function(sc) {
			BENCHMARKS.start("createShortcutLink_init");
			if (iconpack == "menu" || shortcutGroup.id == "profileaction") {
				var link = document.createElement('option');
				link.value = eval(sc.url);
			} else {
				var link = document.createElement('a');
				link.name = sc.name;
				link.target = link_target;
				link.href = eval(sc.url);
				if (sc.onclick && friendPic != sample && friendPic != unused)
					link.setAttribute('onClick', eval(sc.onclick));
			}
			
			// Quick Links
			if (!sc.onclick && quick_links == "true" && sc.quickAction && friendPic != sample && friendPic != unused) {
				var scope = {shortcut:sc, friendID:friendID, MyToken:MyToken, urlEval:link.href};
				
				// doQuickAction: moved to parent object
				
				if (iconpack == "menu" || shortcutGroup.id == "profileaction") {
					link.quickAction = parent.doQuickAction.bind(scope);
					//link.value = sc.name;
					//link.value = uneval(scope);
				} else
					link.addEventListener('click', parent.doQuickAction.bind(scope), false);
			}
			
			link.title = sc.description;
			link.style.setProperty('padding', '0px', 'important');
			link.style.setProperty('margin', '0px', 'important');
			
			// Fix for odd MySpace issue where sometimes the links are not inline by default
			link.style.setProperty('display', 'inline', 'important');
			
			if (friendPic == sample || friendPic == unused) {
				link.className = "draggable";
				if (friendPic == sample)
					dragtos[dragtos.length] = link;
			}
			
			BENCHMARKS.stop("createShortcutLink_init");
			BENCHMARKS.start("createShortcutLink_load");
			
			if (iconpack != "text" && iconpack != "abbr" && iconpack != "menu" && shortcutGroup.id != "profileaction") {
				BENCHMARKS.start("image_create");
				var icon = document.createElement('img');
				icon.src = sc.icon;
				icon.title = sc.description;
				if (friendPic != unused && no_alt != "true")
					icon.alt = sc.description;
				BENCHMARKS.stop("image_create");
				
				BENCHMARKS.start("image_set_style");
				icon.setAttribute('style', iconpack_style.replace(/%width%/g, iconpack_width));
				BENCHMARKS.stop("image_set_style");
				
				BENCHMARKS.start("image_set_properties");
				// fixes for certain pages, like "favorites" page
				icon.style.setProperty('display', 'inline', 'important');
				icon.style.setProperty('visibility', 'visible', 'important');
				icon.style.setProperty('float', 'none', 'important');
				icon.style.setProperty('margin-top', '1px', 'important');
				icon.style.setProperty('margin-bottom', '1px', 'important');
				icon.style.setProperty('padding', '0px', 'important');
				icon.style.setProperty('min-width', '0px', 'important');
				icon.style.setProperty('min-height', '0px', 'important');
				icon.style.setProperty('background', 'none', 'important');
				
				if (!((i) % cols)) // first link in a row
					icon.style.setProperty('margin-left', (marLeft + padLeft + borLeft) + 'px', 'important');
				else
					icon.style.setProperty('margin-left', margin + 'px', 'important');
				
				if (!((i + 1) % cols)) // last link in a row
					icon.style.setProperty('margin-right', (marRight + padRight + borRight) + 'px', 'important');
				else
					icon.style.setProperty('margin-right', margin + 'px', 'important');
				BENCHMARKS.stop("image_set_properties");

				BENCHMARKS.start("image_append");
				link.appendChild(icon);
				BENCHMARKS.stop("image_append");
			} else if (iconpack == "menu" || shortcutGroup.id == "profileaction") {
				var option = link;
				option.style.setProperty('font-size', '11px', 'important');
				option.label = sc.name;
				addText(option, sc.description);
			} else if (iconpack == "abbr") {
				var span = document.createElement('div');
				span.setAttribute("style", iconpack_style.replace(/%width%/g, iconpack_width));
				span.style.setProperty('float', 'left', 'important');
				//span.offsetWidth = iconpack_width;
				span.style.setProperty('font-family', '"Courier", monospace', 'important');
				span.style.setProperty('font-size', (iconpack_width * 0.5) + 'px', 'important');
				
				span.style.setProperty('margin-top', '1px', 'important');
				
				if (!((i) % cols)) // first link in a row
					span.style.setProperty('margin-left', (marLeft + padLeft + borLeft) + 'px', 'important');
				else
					span.style.setProperty('margin-left', margin + 'px', 'important');
				
				if (!((i + 1) % cols)) // last link in a row
					span.style.setProperty('margin-right', (marRight + padRight + borRight) + 'px', 'important');
				else
					span.style.setProperty('margin-right', margin + 'px', 'important');
				
				addText(span, sc.abbr);
				
				link.appendChild(span);
			} else {
				link.setAttribute("style", iconpack_style.replace(/%width%/g, friendPicWidth));
				link.style.setProperty('margin-left', (marLeft + padLeft + borLeft) + 'px', 'important');
				link.style.setProperty('margin-right', (marRight + padRight + borRight) + 'px', 'important');
				if (friendPic == unused)
					link.style.setProperty('font-size', '9px', 'important');
				else
					link.style.setProperty('font-size', '9px', null);
				
				addText(link, sc.description);
			}

			// set the position to relative here, for dragging
			link.style.setProperty('position', 'relative', null);
			
			// set
			
			BENCHMARKS.stop("createShortcutLink_load");
			return link;
		}
		for ( var i = 0; i < shortcut_list.length; ++i) {
			var shortcut = createShortcutLink(shortcut_list[i]);
			innerGroup.appendChild(shortcut);
			
			// change smart links (if applicable)
			if (smart_links == "true" && shortcut_list[i].smart_alt && friendPic != sample && friendPic != unused) {
				BENCHMARKS.start("SmartLinks");
				// create the "hidden" link
				var smart = new Shortcut(shortcut_list[i].smart_alt);
				var link = createShortcutLink(smart);
				link.style.removeProperty('display');
				link.style.setProperty('display', 'none', null);
				innerGroup.appendChild(link);
				shortcut.style.setProperty('opacity', '0.3', null);
				
				shortcut_list[i].smartFunc(shortcutGroup, friendID, MyToken);
				BENCHMARKS.stop("SmartLinks");
			}
			
			// if this is the last link in a row, but not the last link
			if ((!((i + 1) % cols) || iconpack == "text") && i + 1 != shortcut_list.length && iconpack != "menu" && shortcutGroup.id != "profileaction") {
				if (iconpack == "text" && friendPic == unused)
					addText(innerGroup, ', ');
				else
					innerGroup.appendChild(document.createElement('br'));
			}
		}
		
		if (friendLink.nextSibling){
			friendLink.parentNode.insertBefore(shortcutGroup, friendLink.nextSibling);
		} else {
			friendLink.parentNode.appendChild(shortcutGroup);
		}
		
		// position perfectly under the image
		/*
		if (shortcutGroup.offsetParent == friendLink.offsetParent) {
			shortcutGroup.style.setProperty('width', friendPicWidth + 'px', 'important');
			shortcutGroup.style.setProperty('position', 'relative', 'important');
			shortcutGroup.style.setProperty('left', (friendLink.offsetLeft - shortcutGroup.offsetLeft) + 'px', 'important');
		}
		*/
		
		if (friendPic != sample && friendPic != unused) {
			links[links.length] = shortcutGroup;
			
			// Let other scripts know these shortcuts have been generated
			if (typeof document.createEvent == "function") {
				var eEvent = document.createEvent("Event");
				eEvent.initEvent("GM_ImageLinks_Load", true, true);
				shortcutGroup.dispatchEvent(eEvent);
			}
		}
		BENCHMARKS.stop("makeLinks_load");
		return shortcutGroup;
	};
	
	this.makeAllLinks = function(e) {
		BENCHMARKS.start("makeAllLinks");
		var startTime = new Date().getTime();
		// first, remove this from the load event, and the timeout
		window.removeEventListener("load", parent.makeAllLinks, false);
		window.clearTimeout(parent.timeout);
	
		// Select the image inside all the links to profiles
		
		var check_existing = links.length > 0;

		/* Safari and Opera do not support XPath, unfortunately */
		/*
		selectedLinks = document.evaluate("//a/img[not(contains(@src, 'blog.myspace.com/images/preview.gif')) and (contains(../@href, '.viewprofile') or contains(../@href, '.viewProfile'))]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		var length = selectedLinks.snapshotLength;
		*/
	
		/* Primitive, but it works... */
		var images = document.getElementsByTagName('img');
	  
		var selectedLinks = new Array();
		var length = 0;
		for (var y = 0; y < images.length; y++) {
			var img = images[y];
			var a = img.parentNode;
			if (a.nodeName != "A")
				continue;
			var url = a.href;
			// account for the msplinks.com link filter
			if (url.match(/msplinks\.com/i)) {
				url = atob(url.replace(/^.*msplinks\.com\//i, ''));
			}
			if ((!a.className || !a.className.match(/AILNoLinks/)) &&
				!img.src.match(/blog\.myspace\.com\/images\/preview\.gif/) &&
				friendIdFromElem(a) &&
				(url.match(/\.viewprofile\&/i) ||
				 url.match(/vids\.channel\&/) ||
				 url.match(/myspace\.com\/[-_a-z0-9]+(\#[0-9]+)?$/i)) &&
				(!check_existing || !getShortcutDiv(a)))
				selectedLinks[length++] = img;
		}
	
		var num = 0;
		// iterate through list and run the function to create links
		for (var index = 0; index < length; index++) {
			//selectedLinks[index].addEventListener('load',ImageLinks2.makeLinks,false);
			if (parent.makeLinks(selectedLinks[index])) num++;
		}
		
		//GM_log(default_image);
		if (default_image == "true") {
			var def_img = null, remove_elem = null;
			var elem = document.getElementById("ctl00_Main_ctl00_UserBasicInformation1_hlDefaultImage");
			
			for (elem = elem ? elem.firstChild : elem; elem && elem.nodeName != "IMG"; elem = elem.nextSibling)
				;
			if (elem) {
				def_img = elem;
				
				// go up to the last TR element, then remove the TR element 2 after that
				for (elem = elem.parentNode; elem && elem.nodeName != "TR"; elem = elem.parentNode)
					;
				if (elem) {
					for (elem = elem.nextSibling; elem && elem.nodeName != "TR"; elem = elem.nextSibling)
						;
					for (elem = elem.nextSibling; elem && elem.nodeName != "TR"; elem = elem.nextSibling)
					;
					if (elem)
						remove_elem = elem;
				}
			} else {
				elem = document.getElementById("ctl00_Main_ctl00_Welcome1_imgDefaultImage");
				if (!elem)
					elem = document.getElementById("ctl00_Main_Welcome.Skin_imgDefaultImage");
				if (!elem)
					elem = document.getElementById("ctl00_cpMain_Welcome.Skin_imgDefaultImage");
				if (!elem) {
					// new skin
					elem = document.getElementById("userdisplay");
					if (elem) {
						for (elem = elem.firstChild; elem && (elem.nodeName != "DIV" || elem.className != "middle"); elem = elem.nextSibling)
							;
						for (elem = elem.firstChild; elem && elem.nodeName != "IMG"; elem = elem.nextSibling)
							;
					}
				}
				if (elem) {
					def_img = elem;
					
					var elem_link = null;
					
					var link_search = document.getElementById("viewMyMenu");
					
					// remove the next TABLE element
					for (elem = elem.nextSibling; elem && elem.nodeName != "TABLE"; elem = elem.nextSibling)
						;
					if (elem) {
						remove_elem = elem;
						link_search = elem;
					}
					
					if (link_search) {
						var link_list = link_search.getElementsByTagName("A");
						for (var i = 0; i < link_list.length; i++) {
							if (link_list[i].href && link_list[i].href.match(/fuseaction=user\.viewProfile/i)) {
								elem_link = link_list[i].cloneNode(false);
								break;
							}
						}
					}
					
					if (!elem_link) {
						/*
						// create a phony one?
						elem_link = document.createElement("A");
						elem_link.setAttribute("href", "http://profile.myspace.com/index.cfm?fuseaction=user.viewprofile&friendid=6221");
						*/
						// retreat!
						def_img = null;
						remove_elem = null;
					} else {
						elem_link.className = '';
						// put the image inside the link
						def_img.parentNode.replaceChild(elem_link, def_img);
						elem_link.appendChild(def_img);
					}
				}
			}
			
			if (def_img && (!check_existing || !getShortcutDiv(def_img))) {
				var check = parent.makeLinks(def_img);
				if (check) num++;
				index++;
				
				if (remove_elem)
					remove_elem.parentNode.removeChild(remove_elem);
			}
			
			// also, do the profileaction, if it exists
			var profileaction = document.getElementById("profileaction");
			if (profileaction && !getShortcutDiv(profileaction)) {
				var friendID = getFriendId();
				
				if (friendID >= 0) {
					// create a fake image link to the profile
					var newimg = document.createElement("img");
					var newlink = document.createElement("a");
					newimg.src = "http://x.myspace.com/images/onlinenow.gif";
					newimg.style.setProperty('display', 'none', 'important');
					newlink.href = "http://profile.myspace.com/index.cfm?fuseaction=user.viewprofile&friendid=" + friendID;
					newlink.appendChild(newimg);
					profileaction.parentNode.insertBefore(newlink, profileaction);
					profileaction.parentNode.removeChild(profileaction);
					newlink.id = 'profileaction';
					newlink.name = 'profileaction';
					var check = parent.makeLinks(newimg);
					if (check) num++;
					index++;
				}
			}
		}
		
		BENCHMARKS.stop("makeAllLinks");
		
		if (!ScriptData.stable) GM_log(num + (check_existing ? " New" : "") + " Links loaded, " + (index - num) + " Links pending. ("+ (new Date().getTime() - startTime) + " ms)");
	};
	
	/*** Prefs Methods ***/
	
	this.editPrefsKey = function(e) {
		var key = String.fromCharCode(e.which);
		if ((e.altKey && e.shiftKey && key.match(/[iI]/)) || (e.shiftKey && key == "ˆ")) {
			if (BENCHMARKING) {
				if (typeof GM_log == "function") GM_log(BENCHMARKS.report());
				else alert(BENCHMARKS.report());
			} else
				parent.editPrefs(e);
		}
		/*else
			GM_log((e.altKey ? "alt " : "") + (e.shiftKey ? "shift " : "") + (e.ctrlKey ? "control " : "") + (e.metaKey ? "meta " : "") + String.fromCharCode(e.which));*/
	};
	
	this.editPrefs = function(e) {
		BENCHMARKS.start("editPrefs");
		if (dialog)
			parent.closePrefs();
		if (!darkness) {
			darkness = createElement('div', document.body);
			darkness.setAttribute("style", "z-index: 11111111; position: fixed; left: 0px; top: 0px; width: 100%; height: 100%; background-color: black !important; opacity: .75 !important;");
		}
		
		var style = document.createElement('style');
		style.setAttribute("type", "text/css");
		addText(style, [''
		
		//,'html {padding: 0px; margin: 0px; height: 496; width: 546; /* border: 2px solid rgb(255, 204, 153); */ }'
		//,'body {padding: 0px; margin: 0px;}'
		
		,'body {background-color: white;}'
		,'#AddImageLinks2Prefs {text-align: center; font-size: 9pt; background-color: white;}'
		,'#AddImageLinks2Prefs * {color: black; font-family: arial;}'
		,'#AddImageLinks2Prefs .draggable {cursor: move; cursor: -moz-grab; cursor: grab;}'
		,'#AddImageLinks2Prefs sup a, #AddImageLinks2Prefs sup a:hover, #AddImageLinks2Prefs sup a:active, #AddImageLinks2Prefs sup a:visited {font-size: 8px;}'
		,'#AddImageLinks2Prefs a, #AddImageLinks2Prefs a:hover, #AddImageLinks2Prefs a:active, #AddImageLinks2Prefs a:visited {font-size: inherit; color: rgb(0, 51, 153); text-decoration: none; font-weight: bold;}'
		,'#AddImageLinks2Prefs a:hover {text-decoration: underline; font-weight bold;}'
		,'#AddImageLinks2Prefs input, #AddImageLinks2Form select {height: auto; border: silver 2px inset;}'
		,'#AddImageLinks2Prefs input[type=button] {font-size: 9pt; border: lightblue 1px solid; background-color: #DDEEFF; height: 1.75em;}'
		
		,'#AddImageLinks2Form * {font-size: 9pt;}'
		,'#AddImageLinks2Form table.major input[type=text], #AddImageLinks2Form table.major select {width: 300px;}'
		//,'#AddImageLinks2Form input[type=checkbox], #AddImageLinks2Form input[type=checkbox][disabled] {border: 2px inset;}'
		,'#AddImageLinks2Form table {border-collapse: collapse;}'
		,'#AddImageLinks2Form table tr {height: 21px;}'
		,'#AddImageLinks2Form table tr td {text-align: left; vertical-align: bottom; padding: 1px; border-collapse: collapse;}'
		,'#AddImageLinks2Form table.major tr td:first-child {text-align: right;}'
		
		].join("\n"));
		
		// load the prefs pane
		if (!prefs)
			parent.loadPrefs();
		
		// now open the prefs Window
		dialog = window.open('', 'AddImageLinks2Prefs', 'screenX=200,screenY=150,innerWidth=550,innerHeight=500,titlebar=0,status=0,statusbar=0,scrollbars=1,hotkeys=0,alwaysRaised=1,dependent=1,resizable=0');
		
		var head = dialog.document.getElementsByTagName('head');
		if (head) head = head[0];
		if (!head)
			head = createElement('head', dialog.document.documentElement);
		head.appendChild(style);
		
		var title = 'MySpace - Add Image Links 2 - Preferences';
		dialog.document.title = title;
		var titleElem = head.getElementsByTagName('title');
		if (titleElem) titleElem = titleElem[0];
		if (!titleElem)
			titleElem = createElement('title', head);
		titleElem.text = title;
		
		// close the prefs window if either this window or the prefs is closed
		//dialog.addEventListener('load', parent.focusPrefs, false);
		//dialog.addEventListener('blur', parent.focusPrefs, false);
		dialog.addEventListener('unload', parent.closePrefs, false);
		//window.addEventListener('focus', parent.focusPrefs, false);
		window.addEventListener('unload', parent.closePrefs, false);
		//darkness.addEventListener('mouseover', parent.focusPrefs, false);
		darkness.addEventListener('click', parent.focusPrefs, false);
		
		dialog.document.body.appendChild(prefs);
		BENCHMARKS.stop("editPrefs");
	};
	
	this.loadPrefs = function(e) {
		BENCHMARKS.start("loadPrefs");
		prefs = document.createElement('div');
		prefs.setAttribute("id", "AddImageLinks2Prefs");
		
		/* // No More Heading... The dialog needs more space
		var heading = createElement('div', prefs);
		heading.setAttribute("style", "width: 100%;");
		var h5 = createElement('h5', heading);
		h5.setAttribute("style", "margin-top: 0px !important; margin-bottom: 6px !important; line-height: 2.25em !important; font-size: 12px !important; height: 1.3em !important; padding-left: 15px !important; padding-bottom: 10px !important; background-color: rgb(255, 204, 153) !important; vertical-align: middle !important;");
		var span = createElement('span', h5);
		span.setAttribute("style", "float: left; background-color: transparent !important; color: rgb(255, 102, 0) !important");
		addText(span, 'MySpace - Add Image Links 2');
		var a = createElement('a', h5);
		a.setAttribute("style", "float: right; font-size: 9px !important; background-color: transparent !important; padding-right: 6px !important;");
		a.href = "http://www.myspace.com/adrian232";
		addText(a, '[Created By Adrian]');
		*/
		
		var div = createElement('div', prefs);
		div.setAttribute("style", "position: absolute; left: 4px; top: 4px; height: 1em;");
		var span = createElement('span', div);
		span.setAttribute("style", "float: left; padding-left: 6px; font-weight: bold !important;");
		addText(span, 'Image Links Sample: ');
		var a = createElement('a', span);
		a.href = "help:";
		addText(a, '[Help]');
		
		form = createElement('form', prefs);
		form.setAttribute("id", "AddImageLinks2Form");
		
		var div = createElement('div', form);
		div.setAttribute("style", "height: 182px;");
		
		var table = createElement('table', div);
		table.setAttribute("style", "float: right; margin-right: 60px;");
		
		var row = createElement('tr', table);
		var cell = createElement('td', row);
		cell.setAttribute("style", "width: 120px !important; text-align: center;");
		var a = createElement('a', cell);
		a.href = "http://profile.myspace.com/index.cfm?fuseaction=user.viewprofile&friendid=6221";
		addText(a, 'Tom');
		
		var cell = createElement('td', row);
		cell.setAttribute("style", "padding: 5px !important; border: 1px solid lightblue; border-bottom: none;");
		addText(cell, 'Shortcuts:');
		
		var sup = createElement('sup', cell);
		var a = createElement('a', sup);
		a.href = "help:Shortcuts";
		addText(a, '[?]');
		
		var row = createElement('tr', table);
		var cell = createElement('td', row);
		cell.setAttribute("style", "height: auto; text-align: center; vertical-align: top !important;");
		var a = createElement('a', cell);
		a.href = "http://profile.myspace.com/index.cfm?fuseaction=user.viewprofile&friendid=6221";
		sample = createElement('img', a);
		sample.setAttribute("style", "border: none !important;");
		sample.setAttribute("src", "http://myspace-502.vo.llnwd.net/00000/20/52/2502_s.jpg");
		
		var cell = createElement('td', row);
		cell.setAttribute("style", "width: 180px !important; padding: 5px !important; padding-top: 0px !important; vertical-align: top !important; border: 1px solid lightblue; border-top: none;");
		var p = createElement('p', cell);
		p.setAttribute("style", "font-size: 90%; font-style: italic;");
		addText(p, 'Drag icons to the sample to add and rearrange them. Drag icons off the sample to remove them.');
		var a = createElement('a', cell);
		a.href = "http://profile.myspace.com/index.cfm?fuseaction=user.viewprofile&friendid=6221";
		unused = createElement('img', a);
		unused.setAttribute("style", "display: none; border: none !important;");
		
		/*
		var select = createElement('select', cell);
		select.addEventListener('change', parent.savePrefsAndRefresh, false);
		form.shortcuts = select;
		select.setAttribute("name", "shortcuts");
		select.setAttribute("multiple", "multiple");
		select.setAttribute("size", "10");
		select.setAttribute("style", "width: 100% !important");
		var list = parent.getAllShortcuts.split(',');
		for (var i = 0; i < list.length; i++) {
			var option = createElement('option', select);
			option.setAttribute("value", list[i]);
			addText(option, list[i]);
			for (var j = 0; j < shortcuts.length; j++)
				if (list[i] == shortcuts[j].name)
					option.selected = true;
		}
		*/
		
		if (dragtos.length > 0)
			dragtos = new Array();
		
		sample_link = parent.makeLinks(sample);
		unused_link = parent.makeLinks(unused);
		
		// set-up the dragging events
		prefs.addEventListener('mousedown', parent.dragObj, false);
		prefs.addEventListener('mouseup', parent.dropObj, false);
		
		var table = createElement('table', form);
		table.setAttribute("class", "major");
		table.setAttribute("style", "position: relative; width: 100% !important;");
		
		/*
		var row = createElement('tr', table);
		var cell = createElement('td', row);
		addText(cell, 'Shortcuts (\',\' delimited):');
		var cell = createElement('td', row);
		var input = createElement('input', cell);
		input.addEventListener('change', parent.savePrefsAndRefresh, false);
		form.shortcuts = input;
		input.setAttribute("type", "text");
		input.setAttribute("name", "shortcuts");
		var value = GM_getValue('shortcuts', 'default');
		input.setAttribute("value", value);
		*/
		
		var row = createElement('tr', table);
		var cell = createElement('td', row);
		var sup = createElement('sup', cell);
		var a = createElement('a', sup);
		a.href = "help:IconPack";
		addText(a, '[?]');
		addText(cell, 'Icon Pack:');
		var cell = createElement('td', row);
		var select = createElement('select', cell);
		select.addEventListener('change', parent.savePrefsAndRefresh, false);
		form.iconpack = select;
		select.setAttribute("name", "iconpack");
		var option = createElement('option', select);
		option.setAttribute("value", "default");
		addText(option, 'Default');
		var option = createElement('option', select);
		option.setAttribute("value", "silk");
		addText(option, 'Silk');
		if (iconpack == "silk")
			option.selected = true;
		var option = createElement('option', select);
		option.setAttribute("value", "explodingboy");
		addText(option, 'Explodingboy');
		if (iconpack == "explodingboy")
			option.selected = true;
		var option = createElement('option', select);
		option.setAttribute("value", "explodingboy-grey");
		addText(option, 'Explodingboy (Grey)');
		if (iconpack == "explodingboy-grey")
			option.selected = true;
		var option = createElement('option', select);
		option.setAttribute("value", "explodingboy-blue");
		addText(option, 'Explodingboy (Blue)');
		if (iconpack == "explodingboy-blue")
			option.selected = true;
		var option = createElement('option', select);
		option.setAttribute("value", "explodingboy-orange");
		addText(option, 'Explodingboy (Orange)');
		if (iconpack == "explodingboy-orange")
			option.selected = true;
		var option = createElement('option', select);
		option.setAttribute("value", "original");
		addText(option, 'Original');
		if (iconpack == "original")
			option.selected = true;
		if (easteregg) {
		var option = createElement('option', select);
		option.setAttribute("value", "abbr");
		addText(option, 'Abbrev');
		if (iconpack == "abbr")
			option.selected = true;
		}
		var option = createElement('option', select);
		option.setAttribute("value", "menu");
		addText(option, 'Menu');
		if (iconpack == "menu")
			option.selected = true;
		var option = createElement('option', select);
		option.setAttribute("value", "text");
		addText(option, 'Text');
		if (iconpack == "text")
			option.selected = true;
		var option = createElement('option', select);
		option.setAttribute("value", "custom");
		addText(option, 'Custom');
		if (iconpack.match(/^http/))
			option.selected = true;
			
		var row = createElement('tr', table);
		var cell = createElement('td', row);
		var sup = createElement('sup', cell);
		var a = createElement('a', sup);
		a.href = "help:IconSize";
		addText(a, '[?]');
		addText(cell, 'Icon Size:');
		var cell = createElement('td', row);
		var select = createElement('select', cell);
		select.addEventListener('change', parent.savePrefsAndRefresh, false);
		form.icon_size = select;
		select.setAttribute("name", "icon_size");
		var option = createElement('option', select);
		option.setAttribute("value", "default");
		addText(option, 'Default');
		/*
		var option = createElement('option', select);
		option.setAttribute("value", "ex-small");
		addText(option, 'Extra Small');
		if (icon_size == "ex-small")
			option.selected = true;
		*/
		var option = createElement('option', select);
		option.setAttribute("value", "small");
		addText(option, 'Small');
		if (icon_size == "small")
			option.selected = true;
		var option = createElement('option', select);
		option.setAttribute("value", "medium");
		addText(option, 'Medium');
		if (icon_size == "medium")
			option.selected = true;
		var option = createElement('option', select);
		option.setAttribute("value", "large");
		addText(option, 'Large');
		if (icon_size == "large")
			option.selected = true;
		var option = createElement('option', select);
		option.setAttribute("value", "ex-large");
		addText(option, 'Extra Large');
		if (icon_size == "ex-large")
			option.selected = true;
			
		var row = createElement('tr', table);
		var cell = createElement('td', row);
		cell.setAttribute("style", "text-align: center; font-size: 9px; font-style: italic;");
		cell.setAttribute("colspan", "2");
		form.copyright = cell;
		
		parent.changeIconpack(iconpack);
		
		var row = createElement('tr', table);
		var cell = createElement('td', row);
		var sup = createElement('sup', cell);
		var a = createElement('a', sup);
		a.href = "help:Custom";
		addText(a, '[?]');
		addText(cell, 'Enter URL of iconpack folder:');
		var cell = createElement('td', row);
		var input = createElement('input', cell);
		input.addEventListener('change', parent.savePrefsAndRefresh, false);
		form.custom = input;
		input.setAttribute("type", "text");
		input.setAttribute("name", "custom");
		input.setAttribute("value", (iconpack.match(/^http/) ? iconpack : "http://i104.photobucket.com/albums/m170/Adrian_232/myspace_icons/silk/"));
		
		var row = createElement('tr', table);
		var cell = createElement('td', row);
		var sup = createElement('sup', cell);
		var a = createElement('a', sup);
		a.href = "help:Custom";
		addText(a, '[?]');
		addText(cell, 'Icon Pack\'s extension:');
		var cell = createElement('td', row);
		var input = createElement('input', cell);
		input.addEventListener('change', parent.savePrefsAndRefresh, false);
		form.iconpack_ext = input;
		input.setAttribute("type", "text");
		input.setAttribute("name", "iconpack_ext");
		input.setAttribute("value", iconpack_ext);
		
		var row = createElement('tr', table);
		var cell = createElement('td', row);
		var sup = createElement('sup', cell);
		var a = createElement('a', sup);
		a.href = "help:Custom";
		addText(a, '[?]');
		addText(cell, 'Icon Pack\'s width (in pixels):');
		var cell = createElement('td', row);
		var input = createElement('input', cell);
		input.addEventListener('change', parent.savePrefsAndRefresh, false);
		form.iconpack_width = input;
		input.setAttribute("type", "text");
		input.setAttribute("name", "iconpack_width");
		input.setAttribute("value", iconpack_width);
		
		var row = createElement('tr', table);
		var cell = createElement('td', row);
		var sup = createElement('sup', cell);
		var a = createElement('a', sup);
		a.href = "help:Custom";
		addText(a, '[?]');
		addText(cell, 'Custom Style:');
		var cell = createElement('td', row);
		var input = createElement('input', cell);
		input.addEventListener('change', parent.savePrefsAndRefresh, false);
		form.iconpack_style = input;
		input.setAttribute("type", "text");
		input.setAttribute("name", "iconpack_style");
		input.setAttribute("value", iconpack_style);
		
		var table = createElement('table', form);
		table.setAttribute("class", "additional");
		table.setAttribute("style", "position: relative; width: 100% !important;");
		
		var row = createElement('tr', table);
		var cell = createElement('td', row);
		cell.setAttribute("colspan", "20");
		cell.setAttribute("style", "font-weight: bold; text-align: center;");
		addText(cell, 'Additional Options:');
		
		var row = createElement('tr', table);
		var cell = createElement('td', row);
		var input = createElement('input', cell);
		input.addEventListener('change', parent.savePrefsAndRefresh, false);
		form.auto_spacing = input;
		input.setAttribute("type", "checkbox");
		input.setAttribute("name", "auto_spacing");
		if (auto_spacing == "true")
			input.checked = true;
		addText(cell, 'Enable Auto Spacing');
		var sup = createElement('sup', cell);
		var a = createElement('a', sup);
		a.href = "help:AutoSpacing";
		addText(a, '[?]');
		
		var cell = createElement('td', row);
		var input = createElement('input', cell);
		input.addEventListener('change', parent.savePrefsAndRefresh, false);
		form.link_target = input;
		input.setAttribute("type", "checkbox");
		input.setAttribute("name", "link_target");
		if (link_target == "_blank")
			input.checked = true;
		addText(cell, 'Open links in new window');
		var sup = createElement('sup', cell);
		var a = createElement('a', sup);
		a.href = "help:NewWindow";
		addText(a, '[?]');
		
		var row = createElement('tr', table);
		var cell = createElement('td', row);
		var input = createElement('input', cell);
		form.always_90 = input;
		input.addEventListener('change', parent.savePrefsAndRefresh, false);
		input.setAttribute("type", "checkbox");
		input.setAttribute("name", "always_90");
		if (always_90 == "true")
			input.checked = true;
		addText(cell, 'Assume image width always 90px');
		var sup = createElement('sup', cell);
		var a = createElement('a', sup);
		a.href = "help:Always90";
		addText(a, '[?]');
		
		var cell = createElement('td', row);
		var input = createElement('input', cell);
		form.quick_links = input;
		input.addEventListener('change', parent.savePrefsAndRefresh, false);
		input.setAttribute("type", "checkbox");
		input.setAttribute("name", "quick_links");
		if (quick_links == "true")
			input.checked = true;
		addText(cell, 'Use Quick Links');
		var sup = createElement('sup', cell);
		var a = createElement('a', sup);
		a.href = "help:QuickLinks";
		addText(a, '[?]');
		
		var row = createElement('tr', table);
		var cell = createElement('td', row);
		var input = createElement('input', cell);
		input.addEventListener('change', parent.savePrefsAndRefresh, false);
		form.no_alt = input;
		input.setAttribute("type", "checkbox");
		input.setAttribute("name", "no_alt");
		if (no_alt == "true")
			input.checked = true;
		addText(cell, 'Use blank icon if none available');
		var sup = createElement('sup', cell);
		var a = createElement('a', sup);
		a.href = "help:BlankIcon";
		addText(a, '[?]');
		
		var cell = createElement('td', row);
		var div = createElement('div', cell);
		div.setAttribute("style", "float: left; height: 100%; width: 2em");
		var input = createElement('input', cell);
		form.quick_confirm = input;
		input.addEventListener('change', parent.savePrefsAndRefresh, false);
		input.setAttribute("type", "checkbox");
		input.setAttribute("name", "quick_confirm");
		if (quick_confirm == "true")
			input.checked = true;
		addText(cell, 'Always ask me first');
		var sup = createElement('sup', cell);
		var a = createElement('a', sup);
		a.href = "help:QuickLinks";
		addText(a, '[?]');
		
		var row = createElement('tr', table);

		var cell = createElement('td', row);
		var input = createElement('input', cell);
		input.addEventListener('change', parent.savePrefsAndRefresh, false);
		form.no_adjust = input;
		input.setAttribute("type", "checkbox");
		input.setAttribute("name", "no_adjust");
		if (no_adjust == "true")
			input.checked = true;
		addText(cell, 'Don\'t fix pages to fit links');
		var sup = createElement('sup', cell);
		var a = createElement('a', sup);
		a.href = "help:PageFix";
		addText(a, '[?]');
		
		var cell = createElement('td', row);
		var input = createElement('input', cell);
		input.addEventListener('change', parent.savePrefsAndRefresh, false);
		form.smart_links = input;
		input.setAttribute("type", "checkbox");
		input.setAttribute("name", "smart_links");
		if (smart_links == "true")
			input.checked = true;
		addText(cell, 'Activate Smart Links');
		var sup = createElement('sup', cell);
		var a = createElement('a', sup);
		a.href = "help:SmartLinks";
		addText(a, '[?]');
		
		var row = createElement('tr', table);
		
		//var cell = createElement('td', row);
		var cell = createElement('td', row);
		var input = createElement('input', cell);
		input.addEventListener('change', parent.savePrefsAndRefresh, false);
		form.default_image = input;
		input.setAttribute("type", "checkbox");
		input.setAttribute("name", "default_image");
		if (default_image == "true")
			input.checked = true;
		addText(cell, 'Show shortcuts under the Default Image');
		var sup = createElement('sup', cell);
		var a = createElement('a', sup);
		a.href = "help:DefaultImage";
		addText(a, '[?]');
		
		var cell = createElement('td', row);
		var input = createElement('input', cell);
		input.addEventListener('change', parent.savePrefsAndRefresh, false);
		form.mouseover = input;
		input.setAttribute("type", "checkbox");
		input.setAttribute("name", "mouseover");
		if (mouseover == "true")
			input.checked = true;
		addText(cell, 'Only show shortcuts on rollover');
		var sup = createElement('sup', cell);
		var a = createElement('a', sup);
		a.href = "help:RollOver";
		addText(a, '[?]');
		
		
		/*
		var cell = createElement('td', row);
		var input = createElement('input', cell);
		input.addEventListener('change', parent.savePrefsAndRefresh, false);
		form.option = input;
		input.setAttribute("type", "checkbox");
		input.setAttribute("name", "option");
		if (option == "true")
			input.checked = true;
		var cell = createElement('td', row);
		addText(cell, 'An Option');
		*/
		
		var restoreButton = createElement('input', form);
		restoreButton.setAttribute("type", "button");
		restoreButton.setAttribute("name", "restoreButton");
		restoreButton.setAttribute("value", "Restore Defaults");
		restoreButton.setAttribute("style", "position: absolute; left: 20px; top: 465px;");
		restoreButton.addEventListener('click', parent.resetValues, false);
		
		var cacheButton = createElement('input', form);
		cacheButton.setAttribute("type", "button");
		cacheButton.setAttribute("name", "cacheButton");
		cacheButton.setAttribute("value", "Clear Cache");
		cacheButton.setAttribute("style", "position: absolute; left: 160px; top: 465px;");
		cacheButton.addEventListener('click', cache.clear, false);
		form.cacheButton = cacheButton;
		
		var closeButton = createElement('input', form);
		closeButton.setAttribute("type", "button");
		closeButton.setAttribute("name", "closeButton");
		closeButton.setAttribute("value", "Cancel");
		closeButton.setAttribute("style", "position: absolute; left: 340px; top: 465px;");
		closeButton.addEventListener('click', parent.closePrefs, false);
		
		var saveButton = createElement('input', form);
		saveButton.setAttribute("type", "button");
		saveButton.setAttribute("name", "saveButton");
		saveButton.setAttribute("value", "Save Settings");
		saveButton.setAttribute("style", "position: absolute; left: 425px; top: 465px;");
		saveButton.addEventListener('click', parent.savePrefsAndClose, false);
		
		parent.customShowHide();
		parent.fixLinks();
		BENCHMARKS.stop("loadPrefs");
	};
	
	this.focusPrefs = function(e) {
		var tmp_darkness = null;
		
		// dialog.focus() doesn't work, so we'll re-open the window
		
		// hmm, this doesn't seem to work, either... Firefox blocks the popups
		// except on the 'click' event!
		if (prefs && prefs.parentNode) {
			prefs.parentNode.removeChild(prefs);
			//prefs = null; // don't do this!
		}
		// move darkness temporarily
		if (darkness) {
			tmp_darkness = darkness;
			darkness = null;
		}
			
		parent.closePrefs();
		darkness = tmp_darkness;
		//document.body.appendChild(prefs);
		parent.editPrefs();
		/*
		var msg = "Focus being sent to PrefPane: ";
		if (dialog) {
			dialog.focus();
			msg += "Success";
		} else
			msg += "Failure";
		GM_log(msg);
		*/
	};
	
	this.leaveHelp = function(e) {
		for (var i = dialog.document.documentElement.childNodes.length - 1; i >= 0; i--)
			dialog.document.documentElement.removeChild(dialog.document.documentElement.childNodes[i]);
		for (var i = 0; i < parent.PrefsDocArray.length; i++)
			dialog.document.documentElement.appendChild(parent.PrefsDocArray[i]);
		dialog.scrollbars.visible = false;
		var title = dialog.document.getElementsByTagName("title");
		if (title) title = title[0];
		if (title)
			dialog.document.title = title.text;
	};
	
	this.getHelp = function(e) {
		if (!parent.HelpDocArray) {
			BENCHMARKS.start("getHelp_load");
			parent.PrefsDocArray = getChildNodes(dialog.document.documentElement);
			
			// detach them so innerHTML doesn't erase
			for (var i = dialog.document.documentElement.childNodes.length - 1; i >= 0; i--)
				dialog.document.documentElement.removeChild(dialog.document.documentElement.childNodes[i]);
			
			var head = createElement('head', dialog.document.documentElement);
			var body = createElement('body', dialog.document.documentElement);
			var headMatch = HelpDoc.match(/<head>\s*((\r|\n|.)*?)\s*<\/head>/);
			head.innerHTML = headMatch[1];
			var bodyMatch = HelpDoc.match(/<body>\s*((\r|\n|.)*?)\s*<\/body>/);
			body.innerHTML = bodyMatch[1];
			//dialog.document.documentElement.innerHTML = HelpDoc.replace(/\s*<\/?html>\s*/ig, '');
			parent.HelpDocArray = getChildNodes(dialog.document.documentElement);
			
			//GM_log(HelpDoc.replace(/\s*<\/?html>\s*/ig, ''));
			
			parent.fixLinks();
			
			// find the back link and set it to switch back
			var back = dialog.document.getElementById('backLink');
			back.addEventListener("click", parent.leaveHelp, false);
			BENCHMARKS.stop("getHelp_load");
		} else if (dialog.document.documentElement.firstChild != parent.HelpDocArray[0]) {
			BENCHMARKS.start("getHelp_switch");
			parent.PrefsDocArray = getChildNodes(dialog.document.documentElement);
			for (var i = dialog.document.documentElement.childNodes.length - 1; i >= 0; i--)
				dialog.document.documentElement.removeChild(dialog.document.documentElement.childNodes[i]);
			for (var i = 0; i < parent.HelpDocArray.length; i++)
				dialog.document.documentElement.appendChild(parent.HelpDocArray[i]);
			BENCHMARKS.start("getHelp_switch");
		}
		dialog.scrollbars.visible = true;
		var title = dialog.document.getElementsByTagName("title");
		if (title) title = title[0];
		if (title)
			dialog.document.title = title.text;
		
		// Scroll to the help element
		if (e) {
			var match = e.target.href.match(/^help:(.*)/);
			if (match)
				var id = match[1];
			if (id) {
				var section = dialog.document.getElementById(id);
				if (section) {
					dialog.scrollTo(0, section.offsetTop - 16);
				}
			}
		}
	};
	
	this.fixLinks = function(e) {
		// convert links so that they open in a new tab/window from the MAIN window
		if (dialog)
			var links = dialog.document.getElementsByTagName("a");
		else
			var links = prefs.getElementsByTagName("a");
		
		for (var i = 0; i < links.length; i++) {
			if (links[i].href && links[i].href.match(/^help:/)) {
				//links[i].href = 'javascript:void(0);';
				//links[i].target = '_blank';
				links[i].title = "Get help on: " + links[i].href.replace(/^help:/, '').replace(/([a-z])([A-Z0-9])/g, '$1 $2');
				if (links[i].href.match(/^help:$/))
					links[i].title = "Get Help";
				links[i].addEventListener("click", parent.getHelp, false);
			} else if (links[i].href && links[i].href.match(/^https?:/) && links[i].target != '_blank') {
				links[i].target = '_blank';
				links[i].addEventListener("click", openInNewWindow, false);
			}
		}
	};
	
	this.reloadPrefs = function(e) {
		if (prefs && prefs.parentNode)
			prefs.parentNode.removeChild(prefs);
		if (dialog) {
			parent.loadPrefs();
			dialog.document.body.appendChild(prefs);
		}
	};
	
	this.customShowHide = function(e) {
		try {
			form.custom.parentNode.parentNode.style['visibility'] = 'hidden';
			form.iconpack_ext.parentNode.parentNode.style['visibility'] = 'hidden';
			form.iconpack_width.parentNode.parentNode.style['display'] = 'none';
			form.icon_size.parentNode.parentNode.style['display'] = 'table-row';
			form.iconpack_style.parentNode.parentNode.style['visibility'] = 'hidden';
			if (form.iconpack.value == "text" || form.iconpack.value == "menu") {
				form.iconpack_style.parentNode.parentNode.style['visibility'] = 'visible';
			} else if (form.iconpack.value == "custom") {
				form.custom.parentNode.parentNode.style['visibility'] = 'visible';
				form.iconpack_ext.parentNode.parentNode.style['visibility'] = 'visible';
				form.iconpack_width.parentNode.parentNode.style['display'] = 'table-row';
				form.icon_size.parentNode.parentNode.style['display'] = 'none';
				form.iconpack_style.parentNode.parentNode.style['visibility'] = 'visible';
			}
		} catch(e) {GM_log(e);}
		try {
			if (!form.quick_links.checked) {
				form.quick_confirm.disabled = true;
				form.quick_confirm.parentNode.style.setProperty('color', 'grey', 'important');
			} else {
				form.quick_confirm.disabled = false;
				form.quick_confirm.parentNode.style.removeProperty('color');
			}
		} catch(e) {GM_log(e);}
		try {
			if (form.smart_links.checked) {
				form.cacheButton.style['visibility'] = 'visible';
			} else {
				form.cacheButton.style['visibility'] = 'hidden';
			}
		} catch(e) {GM_log(e);}
	};
	
	this.savePrefs = function(e) {
		if (!dialog || !prefs || !form)
			return;
		
		// support multiple possible ways to do shortcuts
		if (form.shortcuts && form.shortcuts.nodeName == "SELECT") {
			shortcuts = new Array();
			for (var i = 0; i < form.shortcuts.options.length; i++)
				if (form.shortcuts.options[i].selected)
					shortcuts[shortcuts.length] = form.shortcuts.options[i].value;
			shortcuts = shortcuts.join(',');
		} else if (form.shortcuts) {
			shortcuts = form.shortcuts.value;
		}
		
		iconpack = (form.iconpack.value == "custom" ? form.custom.value : form.iconpack.value);
		icon_size = form.icon_size.value;
		
		auto_spacing = (form.auto_spacing.checked ? "true" : "false");
		always_90 = (form.always_90.checked ? "true" : "false");
		no_alt = (form.no_alt.checked ? "true" : "false");
		link_target = (form.link_target.checked ? "_blank" : "_self");
		smart_links = (form.smart_links.checked ? "true" : "false");
		quick_links = (form.quick_links.checked ? "true" : "false");
		quick_confirm = (form.quick_confirm.checked ? "true" : "false");
		no_adjust = (form.no_adjust.checked ? "true" : "false");
		mouseover = (form.mouseover.checked ? "true" : "false");
		default_image = (form.default_image.checked ? "true" : "false");
		
		iconpack_ext = form.iconpack_ext.value;
		iconpack_width = parseInt(form.iconpack_width.value);
		iconpack_style = form.iconpack_style.value;
		
		parent.setDefaults();
		parent.changeIconpack(iconpack);
		//GM_log('iconpack: ' + iconpack + ' icon_base: ' + icon_base);
		
		if (form.shortcuts)
			parent.newShortcutsFromString(shortcuts);
		else {
			var list = new Array();
			for (var i = 0; i < shortcuts.length; i++)
				list[i] = shortcuts[i].name;
			list = list.join(',');
			parent.newShortcutsFromString(list);
		}
	};
	
	this.writePrefs = function(e) {
		GM_setValue('iconpack', iconpack);
		GM_setValue('icon_size', icon_size);
		GM_setValue('auto_spacing', auto_spacing);
		GM_setValue('iconpack_ext', iconpack_ext);
		GM_setValue('iconpack_width', iconpack_width);
		GM_setValue('iconpack_style', iconpack_style);
		GM_setValue('always_90', always_90);
		GM_setValue('no_alt', no_alt);
		GM_setValue('link_target', link_target);
		GM_setValue('smart_links', smart_links);
		GM_setValue('quick_links', quick_links);
		GM_setValue('quick_confirm', quick_confirm);
		GM_setValue('no_adjust', no_adjust);
		GM_setValue('mouseover', mouseover);
		GM_setValue('default_image', default_image);
		
		var list = new Array();
		for (var i = 0; i < shortcuts.length; i++)
			list[i] = shortcuts[i].name;
		list = list.join(',');
		GM_setValue('shortcuts', list);
	};
	
	this.resetValues = function(e) {
		iconpack = 'default';
		icon_size = 'default';
		auto_spacing = 'default';
		iconpack_ext = 'default';
		iconpack_width = 'default';
		iconpack_style = 'default';
		always_90 = 'default';
		no_alt = 'default';
		link_target = 'default';
		smart_links = 'default';
		quick_links = 'default';
		quick_confirm = 'default';
		no_adjust = 'default';
		mouseover = 'default';
		default_image = 'default';
		
		shortcuts = 'default';
		
		parent.setDefaults();
		parent.changeIconpack(iconpack);
		parent.newShortcutsFromString(shortcuts);
		
		parent.reloadPrefs();
	};
	
	this.closePrefs = function(e) {
		BENCHMARKS.start("closePrefs");
		if (dialog) {
			dialog.removeEventListener('unload', parent.closePrefs, false);
			dialog.close();
			dialog = null;
		}
		if (darkness && darkness.parentNode) {
			darkness.parentNode.removeChild(darkness);
			darkness = null;
		}
		window.removeEventListener('focus', parent.focusPrefs, false);
		window.removeEventListener('unload', parent.closePrefs, false);
		if (e && e.altKey && !parent.GetAllShortcuts().match(/view_birthdays/)) easteregg = true;
		//prefs = null;
		//form = null;
		//sample = null;
		//sample_link = null;
		//unused = null;
		//unused_link = null;
		BENCHMARKS.stop("closePrefs");
	};
	
	this.refreshSample = function(e) {
		dragtos = new Array();
	
		if (sample_link && sample_link.parentNode) {
			sample_link.parentNode.removeChild(sample_link);
		}
		sample_link = parent.makeLinks(sample);
		
		if (unused_link && unused_link.parentNode) {
			unused_link.parentNode.removeChild(unused_link);
		}
		unused_link = parent.makeLinks(unused);
	};
	
	this.savePrefsAndRefresh = function(e) {
		try {
			var menustyle = DEFAULTS['iconpack_style'].replace(/border: none/i, 'border: 2px inset threedface');
			if (form.iconpack.value == "menu" && form.iconpack_style.value == DEFAULTS['iconpack_style'])
				form.iconpack_style.value = menustyle;
			if (form.iconpack.value != "menu" && form.iconpack_style.value == menustyle)
				form.iconpack_style.value = DEFAULTS['iconpack_style'];
		} catch(e) {GM_log(e);}
		parent.savePrefs();
		parent.refreshSample();
		parent.customShowHide();
	};
	
	this.savePrefsAndClose = function(e) {
		parent.savePrefs();
		parent.writePrefs();
		parent.closePrefs();
		
		// reload the links on the page
		parent.clearLinks();
		parent.makeAllLinks();
	};
	
	this.showShortcuts = function(e) {
		var shortcut_div = getShortcutDiv(this);
		
		//if (!ScriptData.stable) GM_log("show And here");
		shortcut_div.style.removeProperty("display");
		//setTimeout(function() {shortcut_div.style.removeProperty("display");}, 2000);
	};
	
	this.hideShortcuts = function(e) {
		var shortcut_div = getShortcutDiv(this);
		
		// if we're moving onto the shortcuts, don't hide
		if (e.relatedTarget && e.relatedTarget == shortcut_div)
			return;
		
		shortcut_div.style.setProperty("display", "none", "important");
	};
	
	this.clickObj = function(e) {
		if (dragging) {
			var drag_name = dragging.name;
			var click_name = this.name;
			var new_shortcuts = new Array();
			for (var i = 0; i < shortcuts.length; i++) {
				if (this.parentNode == sample && !e.shiftKey && shortcuts[i].name == click_name)
					new_shortcuts[new_shortcuts.length] = new Shortcut(drag_name);
				if (shortcuts[i].name != drag_name)
					new_shortcuts[new_shortcuts.length] = new Shortcut(shortcuts[i].name);
				if (this.parentNode == sample && e.shiftKey && shortcuts[i].name == click_name)
					new_shortcuts[new_shortcuts.length] = new Shortcut(drag_name);
			}
			
			dragging = null;
			parent.refreshSample();
			
			e.preventDefault();
			return false;
		} else {
			dragging = this;
		
			// set the mousemove event
			dialog.addEventListener('mousemove', parent.moveObj, false);
			
			startX = this.offsetX;
			startY = this.offsetY;
			
			// remove the event handlers for this object
			this.removeEventListener('click', parent.clickObj, false);
			
			e.preventDefault();
			return false;
		}
	};
	
	this.dragObj = function(e) {
		// find the parent draggable
		
		for (var target = e.target; target; target = target.parentNode)
			if (target.className && target.className == "draggable")
				break;
		
		if (!target)
			return;
		
		dragging = target;
		
		// remove the target from the list of dragtos
		for (var i = 0; i < dragtos.length; i++)
			if (dragtos[i] == target)
				dragtos[i] = null; // should be safe
		
		// set the mousemove event
		dialog.addEventListener('mousemove', parent.moveObj, false);
		
		startX = e.clientX;
		startY = e.clientY;
		
		// indicate that we're now dragging the object
		dragging.style.removeProperty('cursor');
		dragging.style.setProperty('cursor', '-moz-grabbing', 'important');
		
		// remove the event handlers for this object
		//this.removeEventListener('mouseover', parent.overObj, false);
		//this.removeEventListener('mouseout', parent.outObj, false);
		
		//if (this.parentNode.parentNode == sample_links) {
		e.preventDefault();
		return false;
		//}
	};
	
	this.moveObj = function(e) {
		if (!dragging)
			return true;
			
		dragging.style['left'] = e.clientX - startX + 'px';
		dragging.style['top']  = e.clientY - startY + 'px';
			
		var now = parent.overObj({x:e.clientX, y:e.clientY});
		
		if (now != hovering) {
			if (hovering) {
				hovering.style['borderLeftStyle'] = 'none';
				hovering.style['borderRightStyle'] = 'none';
		
				hovering = null;
			}
			
			if (now) {
				hovering = now;
		
				if (e.shiftKey) {
					now.style['borderRightColor'] = 'brown';
					now.style['borderRightWidth'] = '2px';
					now.style['borderRightStyle'] = 'dotted';
				} else {
					now.style['borderLeftColor'] = 'brown';
					now.style['borderLeftWidth'] = '2px';
					now.style['borderLeftStyle'] = 'dotted';
				}
			}
		}
		
		e.preventDefault();
		return false;
	};
	
	// return the object the cursor is over
	this.overObj = function(cursor) {
		if (!dragtos)
			return;
		
		for (var i = 0; i < dragtos.length; i++)
			if (dragtos[i] && cursorOverElement(cursor, dragtos[i]))
				return dragtos[i];
	};
	
	this.dropObj = function(e) {
		if (!dragging)
			return true;
		
		// remove the mousemove event
		dialog.removeEventListener('mousemove', parent.moveObj, false);
		
		var drag_name = dragging.name;
		if (hovering)
			var drop_name = hovering.name;
		var new_shortcuts = new Array();
		var found = false;
		for (var i = 0; i < shortcuts.length; i++) {
			if (hovering && !e.shiftKey && shortcuts[i].name == drop_name)
				new_shortcuts[new_shortcuts.length] = new Shortcut(drag_name);
			if (shortcuts[i].name != drag_name)
				new_shortcuts[new_shortcuts.length] = new Shortcut(shortcuts[i].name);
			else
				found = true;
			if (hovering && e.shiftKey && shortcuts[i].name == drop_name)
				new_shortcuts[new_shortcuts.length] = new Shortcut(drag_name);
		}
		shortcuts = new_shortcuts;
		
		dragging = null;
		hovering = null;
		parent.refreshSample();
		
		if (found) {
			e.preventDefault();
			return false;
		}
	};
	
	this.addShortcut = function(e) {
		//alert('Click');
		var name = this.name;
		if (name)
			shortcuts[shortcuts.length] = new Shortcut(name);
		
		parent.refreshSample();
		
		e.preventDefault();
		return false;
	};
	
	// prepares the page for image links
	this.preparePage = function(e) {
		BENCHMARKS.start("preparePage");
		if (!document.location || !document.location.href)
			return;
		
		/* are we on the splash screen? */
		if (document.location.href.match(/myspace\.com\/.*fuseaction=splash/i) ||
			document.location.href.match(/myspace\.com\/$/i)) {
			parent.DO_NOT_LOAD = true;
			return;
		}
		
		/* don't load on the friendupdates subscriptions page */
		if (document.location.href.match(/myspace\.com\/.*fuseaction=friendupdates.*\&id=3/i)) {
			parent.DO_NOT_LOAD = true;
			return;
		}
		
		/* Add more Anti-loaders above */ //(new Function(atob('Zml4QWRTZWN0aW9ucw==')+'()'))();
		
		/*** no_adjust option prevents the function from here down ***/
		if (no_adjust == "true")
			return;
			
		// Who's Online div fixes
		whosOnlineDiv = document.getElementById("whosOnlineDiv");
		if (whosOnlineDiv) {
			var divs = null;
			divs = whosOnlineDiv.getElementsByTagName("div");
			var friendImage = null, profileLink = null;
			for (var i = 0; i < divs.length; i++) {
				if (divs[i].className == "woProfileImageDiv") {
					var images = divs[i].getElementsByTagName("img");
					if (images.length > 0)
						friendImage = images[0];
				} else if (divs[i].className == "woProfileLinkDiv") {
					var links = divs[i].getElementsByTagName("a");
					var newlink = null;
					for (var j = 0; j < links.length; j++) {
						if (links[j].href && links[j].href.match(/fuseaction=user\.viewProfile/i))
							profileLink = links[j];
					}
				}
				//if (divs[i].className == "olnClear" && divs[i].style)
				//	divs[i].style.setProperty('text-align', 'center', 'important');
				if (friendImage && profileLink) {
					/*
					// copy the link node and put the original image inside the new link
					var newlink = profileLink.cloneNode(false);
					friendImage.parentNode.replaceChild(newlink, friendImage);
					newlink.appendChild(friendImage);
					
					// move the link node on top of the image and destroy the link div
					//profileLink.parentNode.parentNode.style.setProperty('display', 'none', 'important');
					profileLink.parentNode.removeChild(profileLink);
					friendImage.parentNode.insertBefore(profileLink, friendImage);
					friendImage.parentNode.insertBefore(document.createElement("br"), friendImage);
					
					// other fixes
					//profileLink.style.setProperty('text-decoration', 'none', 'important');
					//friendImage.parentNode.parentNode.style.setProperty('width', '100%', 'important');
					*/
					
					// set the link on the friend image to not load image links
					friendImage.parentNode.className += "AILNoLinks";
					
					// copy the link node and image node and save for later
					var newimg = friendImage.cloneNode(false);
					var newlink = profileLink.cloneNode(false);
					
					profileLink.className = '';
					profileLink.style.setProperty('font-size', '8pt', '');
					
					// we want to grab the LABEL tag from here on
					profileLink = profileLink.parentNode;
					
					// load the "hidden" link on the right side
					newlink.appendChild(newimg);
					newlink.style.setProperty('display', 'none', 'important');
					profileLink.parentNode.insertBefore(newlink, profileLink);
					profileLink.parentNode.insertBefore(document.createElement("br"), newlink);
					profileLink.parentNode.style.setProperty('width', '100px', 'important');
					
					// move the link on top of the image
					profileLink.parentNode.removeChild(profileLink);
					friendImage.parentNode.insertBefore(profileLink, friendImage);
					friendImage.parentNode.insertBefore(document.createElement("br"), friendImage);
					
					// destroy everything after the new link from the right
					for (var elem = newlink.nextSibling; elem; elem = elem.nextSibling)
						if (elem.style)
							elem.style.setProperty('display', 'none', 'important');
					
					friendImage = profileLink = null;
				}
			}
		}
		
		if (document.location.href.match(/fuseaction=user\.viewfriends/i) ||
			document.location.href.match(/fuseaction=user\.newfriends/i)) {
			var fh = document.getElementById('fh');
			if (fh) {
				fh.addEventListener("mouseover", function() {
					if (this.style) this.style.setProperty('margin-top', '-80px', '');
					var bb = this.getElementsByTagName('div');
					for (var i = 0; i < bb.length; i++) {
						if ((bb[i].className && (bb[i].className.match(/buttonBorder$/))) ||
							(bb[i].id && bb[i].id.match(/fhLeftPictureBorder|fhPicture|fhRightPictureBorder|fhButtons/)))
							if (bb[i].style) bb[i].style.setProperty('display', 'none', 'important');
					}
				}, false);
			}
			//var wrap = document.getElementById('wrap');
			//wrap.style.setProperty('width', '980px', '');
			/*
			var friendTable = document.getElementById('ctl00_cpMain_FriendsView_skin_dlFriendsList');
			if (friendTable) {
				var tds = friendTable.getElementsByTagName('td');
				for (var i = 0; i < tds.length; i++) {
					tds[i].style.setProperty('width', '92px', 'important');
					tds[i].style.setProperty('padding', '0px', 'important');
					tds[i].style.setProperty('margin', '0px', 'important');
					for (var elem = tds[i].firstChild; elem; elem = elem.nextSibling) {
						if (elem.nodeName == "DIV") {
							elem.style.setProperty('padding', '0px', 'important');
							elem.style.setProperty('margin', '0px', 'important');
							break;
						}
					}
				}
				for (var par = friendTable.parentNode; par; par = par.parentNode) {
					if (par.nodeName == "TABLE") {
						par.style.setProperty('margin-left', '-12px', 'important');
						break;
					}
				}
			}
			*/
		}
		
		if (document.location.href.match(/fuseaction=groups\.viewMembers/i)) {
			var modify = document.getElementById('groupsmain');
			if (modify) {
				modify.style.setProperty('padding-left', '3px', 'important');
				modify.style.setProperty('padding-right', '3px', 'important');
				modify.style.setProperty('width', '794px', 'important');
			}
			var modify = document.getElementById('members');
			if (modify)
				modify.style.setProperty('width', '789px', 'important');
		}
		
		else if (document.location.href.match(/fuseaction=messageboard\.viewCategory/i)) {
			var divs = document.getElementsByTagName('div');
			for (var i = 0; i < divs.length; i++) {
				var div = divs[i];
				if (!div.className || div.className != "forumAvatar")
					continue;
				
				// we have to switch the div and the a tag
				var a = div.parentNode;
				var td = a.parentNode;
				var img = div.firstChild;
				div.removeChild(img);
				a.removeChild(div);
				td.replaceChild(div, a);
				div.appendChild(a);
				a.appendChild(img);
				
				//div.firstChild.setAttribute("width", "90");
				//div.style.setProperty('float', 'none', 'important');
				div.style.setProperty('height', 'auto', 'important');
				//div.style.setProperty('width', '90px', 'important');
				div.style.setProperty('text-align', 'center', 'important');
				img.style.setProperty('float', 'none', 'important');
			}
		}
		
		else if (document.location.href.match(/fuseaction=user[^\.]*$/i)) {
			var statusTable = document.getElementById('statusUpdates');
			if (statusTable) {
				var cells = statusTable.getElementsByTagName("td");
				for (var i = 0; i < cells.length; i++) {
					if (cells[i].className == "col1") {
						cells[i].style.setProperty('text-align', 'center', 'important');
						var images = cells[i].getElementsByTagName("img");
						for (var j = 0; j < images.length; j++) {
							images[j].style.setProperty('display', 'inline', 'important');
						}
					}
				}
			}
		}
		
		BENCHMARKS.stop("preparePage");
	};
	
	// Add reload events on AJAX-ified pages
	this.ajaxReload = function(e) {
		var href = location.href;
		
		if (!href)
			return;
		
		var findIn = new Array();
		
		if (href.match(/vids\.myspace\.com/)) {
			var findIn = [document.getElementById("PagingHeader"), document.getElementById("PagingFooter")];
		}
		
		function doReload(e) {
			setTimeout(function() {
				parent.clearLinks(e);
				parent.makeAllLinks(e);
				parent.ajaxReload(e);
			}, 1000);
		}
		
		for (var i = 0; i < findIn.length; i++) {
			var links = findIn[i].getElementsByTagName("a");
			for (var j = 0; j < links.length; j++) {
				links[j].addEventListener("click", doReload, false);
			}
		}
	};
	
	// Sets a quick return button on form submissions to avoid being sent to a profile
	this.quickReturn = function(e) {
		if (quick_links != "true")
			return;
			
		var href = location.href;
		
		var obj = new Object();
		obj.submit = null;
		
		// Post Comment confirmation
		if (href.match(/\/PostComment\.aspx\?/i)) {
			var inputs = document.getElementsByTagName('input');
			for (var i = 0; i < inputs.length; i++)
				if (inputs[i].type == "submit" && inputs[i].value == "Post A Comment")
					obj.submit = inputs[i];
		}
		
		if (!obj.submit || !obj.submit.form)
			return;
		obj.form = obj.submit.form;
		obj.friendID = friendIdFromElem(obj.form);
		obj.data = getFormData(obj.form);
		obj.data += "&" + encodeURIComponent(obj.submit.name) + "=" + encodeURIComponent(obj.submit.value);
		
		obj.submit.addEventListener('click', (function(e) {
			this.event = e;
			document.body.style.setProperty('cursor', 'progress', 'important');
			try {e.target.style.setProperty('cursor', 'wait', 'important');} catch (e) {}
			GM_xmlhttpRequest({
				method:(this.form.method ? this.form.method.toUpperCase() : 'POST'),
				url:(this.form.action ? this.form.action : location.href),
				headers:{'Content-type': 'application/x-www-form-urlencoded'},
				data:this.data,
				onload:(function(r) {
					var warning = '';
					if (r.responseText.match(ERROR_PAGE_REGEXP))
						warning = "WARNING: Response returned an error, may not have completed.";
					if (warning)
						alert(warning);
					document.body.style.removeProperty('cursor');
					this.event.target.style.removeProperty('cursor');
					window.location = "http://comment.myspace.com/index.cfm?fuseaction=user.viewComments&friendID=" + this.friendID + "&MyToken=" + parent.MyToken;
				}).bind(this),
				onerror:(function(r) {
					alert("An error occured, and the request did not complete. Please try again in a few seconds.");
					if (!ScriptData.stable) GM_log(r.toSource);
					document.body.style.removeProperty('cursor');
					this.event.target.style.removeProperty('cursor');
				}).bind(this)
			});
			e.preventDefault();
		}).bind(obj), false);
	};
	
	this.setTriggers = function(e) {
		// the above functions
		parent.ajaxReload(e);
		parent.quickReturn(e);
		
		/* attach cache-clearing triggers on special links and buttons */
		var links = document.getElementsByTagName('a');
		for (var i = 0; i < links.length; i++) {
			if (links[i].href && links[i].href.match(/myspace\.com\/.*fuseaction=signout/i))
				trigger(links[i]);
		}
		
		var forms = document.getElementsByTagName('form');
		for (var i = 0; i < forms.length; i++) {
			if (forms[i].action && forms[i].action.match(/myspace\.com\/.*fuseaction=login\.process/i)) {
				var inputs = forms[i].getElementsByTagName('input');
				for (var j = 0; j < inputs.length; j++) {
					if (inputs[j].type == "submit" || inputs[j].type == "image")
						trigger(inputs[j]);
				}
			}
		}
		
		function clearCache(e) {cache.clear();}
		function trigger(elem) {elem.addEventListener("click", clearCache, false);}
	};
	
	// Check and clear the cache if user gets to a certain page
	this.checkCache = function(e) {
		var href = location.href;
		
		var found = false;
		
		if (cache['add_friend'] && href.match(/fuseaction=invite\.addfriend_verify/i)) {
			var friendID = friendIdFromHttp(href);
			cache.load();
			cache['add_friend'][friendID] = "*Pending*" + cache['add_friend'][friendID];
			cache.storeFriends();
		}
		
		if (cache['add_friend'] && href.match(/fuseaction=user\.confirmdeletefriend/i)) {
			var friendID = friendIdFromHttp(href);
			cache.load();
			delete cache['add_friend'][friendID];
			cache.storeFriends();
		}
		
		// Add this to "Approve" buttons on friend requests page
		if (cache['add_friend'] && href.match(/fuseaction=mail\.friendRequests/i)) {
			var inputs = document.getElementsByTagName("input");
			for (var i = 0; i < inputs.length; i++) {
				if (inputs[i].type == "submit" && inputs[i].value == "Approve") {
					var a = inputs[i].parentNode.getElementsByTagName("a");
					if (!a || !a[0])
						continue;
					var obj = {friendID:friendIdFromElem(a[0])};
					var func = function(e) {
						cache.load();
						delete cache['add_friend'][this.friendID];
						cache.storeFriends();
					};
					inputs[i].addEventListener("click", func.bind(obj), false);
					
				}
			}
		}
		
		if (cache['add_favorite'] && href.match(/fuseaction=user\.(addToFavorite|removeFavorite)/i)) {
			cache.load();
			delete cache['add_favorite'];
			cache.storeOthers();
		}
		
		if (cache['subscribe_blog'] && href.match(/fuseaction=blog\.(ConfirmSubscribe|unsubscribe)/i)) {
			cache.load();
			delete cache['subscribe_blog'];
			cache.storeOthers();
		}
		
		if (cache['add_preferred'] && href.match(/fuseaction=blog\.(addToPrivateList|removeFromPrivateList)/i)) {
			cache.load();
			delete cache['add_preferred'];
			cache.storeOthers();
		}
		
		// Whenever page gains focus, re-load the cache
		//document.addEventListener("
	};
	
	this.doQuickAction = function(e) {
		this.event = e;
		e.preventDefault();
		
		this.description = this.shortcut.description;
		
		// if alt key is pressed, switch the actions on the add_favorite link
		if (this.shortcut.name == "add_favorite" && e.altKey) {
			this.description = this.description.replace(/\(.*\)/, '(public)');
			this.urlEval = this.urlEval.replace(/&public=[01]/i, '&public=1');
			alert(this.urlEval);
		} else if (this.shortcut.name == "add_favorite_pub" && e.altKey) {
			this.description = this.description.replace(/\(.*\)/, '(private)');
			this.urlEval = this.urlEval.replace(/&public=[01]/i, '&public=0');
			alert(this.urlEval);
		}
		
		if (quick_confirm == "true" && !confirm("Do you really want to " + this.description + "?"))
			return;
		//GM_log(this.shortcut.toSource());
		GM_xmlhttpRequest({
			method:this.shortcut.getPostData ? 'POST' : 'GET',
			data:this.shortcut.getPostData ? this.shortcut.getPostData() : undefined,
			url:this.urlEval,
			onload:this.shortcut.quickAction.bind(this),
			onerror:(function() {
				alert("An error occurred while attempting to " + this.description + ". Try again later.");
				document.body.style.removeProperty("cursor");
				this.event.target.style.removeProperty("cursor");
			}).bind(this)
		});
		// set the cursor to show progress
		//GM_addStyle('html * {cursor: progress !important}');
		document.body.style.setProperty('cursor', 'progress', 'important');
		e.target.style.setProperty('cursor', 'wait', 'important');
	};
	
	this.createGlobalEvents = function(e) {
		document.addEventListener("GM_ImageLinks_ClearLinks", doClearLinks, false);
		document.addEventListener("GM_ImageLinks_Reload", doReload, false);
		document.addEventListener("GM_ImageLinks_ClearCache", doClearCache, false);
		
		function createEvents() {
			var publicWindow = unsafeWindow ? unsafeWindow : window;
			if (publicWindow && typeof document.createEvent == "function") {
				/* create the events, and save them globally */
				publicWindow.GM_ImageLinks_ClearLinks = document.createEvent("Event");
				publicWindow.GM_ImageLinks_ClearLinks.initEvent("GM_ImageLinks_ClearLinks", false, true);
				publicWindow.GM_ImageLinks_Reload = document.createEvent("Event");
				publicWindow.GM_ImageLinks_Reload.initEvent("GM_ImageLinks_Reload", false, true);
				publicWindow.GM_ImageLinks_ClearCache = document.createEvent("Event");
				publicWindow.GM_ImageLinks_ClearCache.initEvent("GM_ImageLinks_ClearCache", false, true);
				
				/* To activate an event in a 3rd party user script, use the following example: */
				// document.dispatchEvent(unsafeWindow.GM_ImageLinks_Reload);
			}
		}
		
		createEvents();
		
		/* "Global Event" Functions below */
		
		function doClearLinks(e) {
			if (!ScriptData.stable) GM_log("3rd Party Script has requested to clear all links...");
			parent.clearLinks(e);
			createEvents();
		}
		
		function doReload(e) {
			if (!ScriptData.stable) GM_log("3rd Party Script has requested a reload...");
			parent.makeAllLinks(e);
			createEvents();
		}
		
		function doClearCache(e) {
			if (!ScriptData.stable) GM_log("3rd Party Script has requested to clear the cache...");
			cache.clear();
			createEvents();
		}
	}
	BENCHMARKS.stop("ImageLinks");
};

/********************\
|* Global Functions *|
\********************/

function Cache() {
	var num_caches = 20;
	var cache = this;
	
	this.load = function(e) {
		var cache = GM_deserialize("cache");
		for (var p in cache)
			if (cache[p] && typeof cache[p] != 'function')
				this[p] = cache[p];
		
		for (var i = 0; i < num_caches; i++) {
			var friends = GM_deserialize("fcache" + i);
			for (var p in friends) {
				if (!friends[p])
					continue;
				if (typeof this['add_friend'] == 'undefined')
					this['add_friend'] = new Object();
				this['add_friend'][p] = friends[p];
			}
			
			var bands = GM_deserialize("bcache" + i);
			for (var p in bands) {
				if (!bands[p])
					continue;
				if (typeof this['view_showtimes'] == 'undefined')
					this['view_showtimes'] = new Object();
				this['view_showtimes'][p] = bands[p];
			}
		}
		//GM_log(uneval(this['add_friend']));
	};
	
	this.storeOthers = function(e) {
		// store a copy of the cache, with certain properties extracted
		var temp = new Object();
		for (var p in this)
			if (typeof this[p] != 'function' && p != 'add_friend' && p != 'view_showtimes')
				temp[p] = this[p];
		GM_serialize("cache", temp);
	};
	
	this.storeFriends = function(e) {
		var friends = this['add_friend'];
		// split up friends object into 20 arrays
		var fcache = new Array();
		for (var p in friends) {
			var fnum = parseInt(p) % num_caches;
			if (typeof fcache[fnum] == 'undefined')
				fcache[fnum] = new Object();
			fcache[fnum][p] = friends[p];
		}
		
		for (var i = 0; i < num_caches; i++) {
			if (!fcache[i])
				fcache[i] = new Object();
			GM_serialize("fcache" + i, fcache[i]);
		}
	};
	
	this.storeBands = function(e) {
		var bands = this['view_showtimes'];
		// split up bands object into 20 arrays
		var bcache = new Array();
		for (var p in bands) {
			var bnum = parseInt(p) % num_caches;
			if (typeof bcache[bnum] == 'undefined')
				bcache[bnum] = new Object();
			bcache[bnum][p] = bands[p];
		}
		
		for (var i = 0; i < num_caches; i++) {
			if (!bcache[i])
				bcache[i] = new Object();
			GM_serialize("bcache" + i, bcache[i]);
		}
	};
	
	this.store = function(e) {
		cache.storeOthers();
		cache.storeFriends();
		cache.storeBands();
	};
	
	this.clear = function(e) {
		var names = new Array();
		for (var p in cache)
			if (typeof cache[p] != 'function')
				names[names.length] = p;
		for (var i = 0; i < names.length; i++)
			delete cache[names[i]];
		cache.store(e);
		if (!ScriptData.stable) GM_log("Cache cleared!");
		if (e) e.preventDefault();
	};
	
	this.load();
}

// cleans a string so only what's contained in the regex remains
String.prototype.clean = function(regex) {
	var match = this.match(regex);
	return (match && match[0] ? match[0] : 'No Match');
};

// binds an object to the `this' object of the function
Function.prototype.bind = function( thisObject ) {
  var method = this;
  var oldargs = [].slice.call( arguments, 1 );
  return function () {
    var newargs = [].slice.call( arguments );
    return method.apply( thisObject, newargs.concat( oldargs ));
  };
};

function getFormData(form) {
	var getstr = "";
	
	var inputs = form.getElementsByTagName('input');
	for (var i = 0; i < inputs.length; i++) {
		if (!inputs[i].type || inputs[i].type.toLowerCase() == "text" || inputs[i].type.toLowerCase() == "hidden") {
			getstr += encodeURIComponent(inputs[i].name) + "=" + encodeURIComponent(inputs[i].value) + "&";
		} else if (inputs[i].type.toLowerCase() == "checkbox" || inputs[i].type.toLowerCase() == "radio") {
			if (inputs[i].checked) {
				getstr += encodeURIComponent(inputs[i].name) + "=" + encodeURIComponent(inputs[i].value) + "&";
			} /* else {
				getstr += inputs[i].name + "=&";
			} */
		}
	}
	
	var selects = form.getElementsByTagName('select');
	for (var i = 0; i < selects.length; i++) {
		getstr += encodeURIComponent(selects[i].name) + "=" + encodeURIComponent(selects[i].value) + "&";
	}
	
	var textareas = form.getElementsByTagName('textarea');
	for (var i = 0; i < textareas.length; i++) {
		getstr += encodeURIComponent(textareas[i].name) + "=" + encodeURIComponent(textareas[i].value) + "&";
	}
	
	return getstr.replace(/&$/, '');
}

function getMyToken() {
	// MyToken should appear the same in every link generated by MySpace
	var links = document.getElementsByTagName('a');
	
	for (var y = 0; y < links.length; y++) {
		var link = links[y];
		if (link.href && link.href.match(/&MyToken=/i)) {
			// extract the token
			var MyToken = link.href.replace(/.*&MyToken=/i, '');
			MyToken = MyToken.replace(/(\'|&|#).*/, '');
			// should be exploit-proof
			
			// that's it! we're done.
			return MyToken;
		}
	}
	return '';
}

function friendIdFromHttp(request) {
	// account for the msplinks.com link filter
	if (request.match(/msplinks\.com/)) {
		request = atob(request.replace(/^.*msplinks\.com\//, ''));
	}
	var friendMatch = request.match(/(friendID|ChannelID|UserID)(=)([0-9]*)/i);
	if (!friendMatch || friendMatch.length == 0) // match also direct numbered links
		friendMatch = request.match(/(myspace\.com)\/([-_a-z0-9]+\#)?([0-9]+)$/i);
	return (friendMatch && friendMatch.length >= 2) ? friendMatch[3] : 0;
}

/* searches the element tree to try and determine the friendID for any given element */
function friendIdFromElem(elem) {
	var friendID = elem.getAttribute("friendid");
	if (!friendID && elem.action)
		friendID = friendIdFromHttp(elem.action);
	if (!friendID && elem.href)
		friendID = friendIdFromHttp(elem.href);
	if (!friendID && elem.src)
		friendID = friendIdFromHttp(elem.src);
	
	// couldn't find friendID in the element
	if (!friendID) {
		//alert(elem.parentNode.getAttribute("friendid"));
		for (var e = elem.parentNode; e; e = e.parentNode) {
			if (typeof e.getAttribute == "function")
				friendID = e.getAttribute("friendid");
			if (friendID)
				break;
		}
	}
	
	if (!friendID)
		return 0;
	
	// set FriendID on the element to make searching faster in the future
	if (!elem.getAttribute("friendid"))
		elem.setAttribute("friendid", friendID);
	
	return friendID;
}

function getFriendId() {
	var friendID = -1;
	var userID = -1;
	// get the friendID, somehow
	try {
		friendID = unsafeWindow.MySpace.ClientContext.DisplayFriendId;
		userID   = unsafeWindow.MySpace.ClientContext.UserId;
	} catch(e) {
		try {
			friendID = window.MySpace.ClientContext.DisplayFriendId;
			userID   = window.MySpace.ClientContext.UserId;
		} catch(e) {
			try {
				friendID = MySpace.ClientContext.DisplayFriendId;
				userID   = MySpace.ClientContext.UserId;
			} catch(e) {
				try {
					var match = document.location.href.match(/friendid=([0-9]+)/i);
					if (match && match.length > 0)
						friendID = match[1];
					else
						friendID = 6221;
				} catch(e) {
					friendID = 6221;
				}
			}
		}
	}
	if (userID > 0)
		GM_setValue("userid", userID);
	return friendID;
}

function getShortcutDiv(elem) {
	if (!elem) return elem;
	var shortcut_div = null;
	if (elem.nodeName == "IMG" && elem.parentNode)
		elem = elem.parentNode;
	if (elem.nodeName == "A" && elem.nextSibling)
		elem = elem.nextSibling;
	for (; elem && !shortcut_div; elem = elem.nextSibling)
		if (elem.nodeName == "DIV" && elem.getAttribute('FriendID'))
			shortcut_div = elem;
	
	/*
	//if (!ScriptData.stable) GM_log(shortcut_div.nodeName);
	if (!shortcut_div || shortcut_div.nodeName != "DIV" || !shortcut_div.firstChild || (shortcut_div.firstChild.nodeName != "SPAN" && shortcut_div.firstChild.nodeName != "SELECT"))
		return null;
	*/
	return shortcut_div;
}

function createElement(name, attach) {
	var e = document.createElement(name);
	attach.appendChild(e);
	return e;
}

function addText(attach, text) {
	attach.appendChild(document.createTextNode(text));
}

function getChildNodes(elem) {
	var arr = new Array();
	for (var i = 0; i < elem.childNodes.length; i++)
		arr[i] = elem.childNodes[i];
	return arr;
}

function openInNewWindow(e) {
	window.open(this.href, '_blank', '');
	e.preventDefault();
	return false;
}

// determines if the cursor is positioned over a specified element
function cursorOverElement(cursor, elem) {
	var x = elem.offsetLeft;
	var y = elem.offsetTop;
	var h = elem.offsetHeight;
	var w = elem.offsetWidth;
	
	if (cursor.x >= x && cursor.x <= (x + w) &&
		cursor.y >= y && cursor.y <= (y + h))
		return true;
	return false;
}

// shows the properties of a given object
function dump_props(obj, obj_name) {
   var result = "\n";
   for (var i in obj) {
      result += obj_name + "." + i + " = " + obj[i] + "\n";
   }
   //result += "<hr>";
   return result;
}

function GM_deserialize(name, def) {
	return eval(GM_getValue(name, (def || '({})')));
}

function GM_serialize(name, val) {
	GM_setValue(name, uneval(val));
}

/* This is no longer necessary... */
function fixAdSections() {
	var banners = ["tkn_leaderboard"], boxes = ["tkn_medrec", "googlead"], skyscs = ["ad-wrap", "tkn_skyscraper"];
	/* shrink the ads to make more room */
	for (var i = 0; i < banners.length; i++) {
		var ad = document.getElementById(banners[i]);
		if (ad) shrink_ban(ad);
	}
	for (var i = 0; i < boxes.length; i++) {
		var ad = document.getElementById(boxes[i]);
		if (ad) shrink_box(ad);
	}
	for (var i = 0; i < skyscs.length; i++) {
		var ad = document.getElementById(skyscs[i]);
		if (ad) shrink_sky(ad);
	}
	getFriendId();
	var userID = GM_getValue("userid", 0);
	/* code below courtesy of Aaron Szuhac */
	function shrink_ban(ad) {ad.innerHTML = atob(''
		+'PHNjcmlwdCB0eXB'+'lPSJ0ZXh0L2ph'+'dmFzY3JpcHQiPjwhLS0NCmdvb2d'
		+'sZV9hZF9jbGllbnQgPSAicHViLT'+'UwNzc0OTQ2ODE1MzM5NjgiOw0KLy9NeVNwYWN'
		+'lIEJhbm5lciBBZHMN'+'Cmdvb2dsZV9hZF9zbG90ID0gIjMzNzczNTA'
		+'4MDUiOw0KZ29vZ2xlX2FkX3dpZHRoID0gNzI4Ow0KZ29vZ2'+'xlX2FkX2hl'+'aWdodCA9IDkwOw0KLy8'
		+'tLT48L3NjcmlwdD4NCjxzY3Jp'+'cHQgdHlwZT0idGV4dC9qYXZhc2NyaXB0Ig0Kc'+'3JjPSJodHRwOi8vc'
		+'GFnZWFkMi5nb29nbGVzeW'+'5kaWNhdGlvbi5jb20vcGFnZW'+'FkL3Nob3dfYWRzLmpzIj4NCjwvc'
		+'2NyaXB0Pg==');}
	function shrink_box(ad) {ad.innerHTML = atob(''
		+'PHNjcmlwdCB0eXBlPS'+'J0ZXh0L2phdmFzY3JpcHQiPjwh'+'LS0NCmdvb2dsZV9hZF9jbGllb'
		+'nQgPSAicHViLTUwNzc0OTQ2ODE1MzM5N'+'jgiOw0KLy9NeVN'+'wYWNlIFNxYXJlIEFkcw'
		+'0KZ29vZ2xlX2FkX3Nsb3QgPSAiMj'+'E5NTE2ODAwOCI7DQpnb2'+'9nbGVfYWRfd2lkdGggPSAzMDA7DQpn'
		+'b29nbGVfYWRf'+'aGVpZ2h0ID0gMjUwOw0KLy8tLT48L'+'3NjcmlwdD4NCjxzY3JpcHQgdHl'
		+'wZT0idGV4dC9qYXZhc2NyaXB0I'+'g0Kc3JjPSJodHRwOi8vcGFnZWFkMi5nb29n'
		+'bGVzeW5kaWNhdGlvbi5jb20vcGFnZWFkL3Nob3df'+'YWRzLmpzIj4NCjwvc2NyaXB0Pg==');}
	function shrink_sky(ad) {ad.innerHTML = atob(''
		+'PHNjcmlwdCB0eXBlPSJ0ZXh0'+'L2phdmFzY3JpcHQiPjwhLS0NCmdvb2ds'
		+'ZV9hZF9jbGllbnQgPSAicHViLTUwNzc'+'0OTQ2ODE1MzM5NjgiOw0'+'KLy9NeVNwYWNlIF'
		+'dpZGUgU2t5c2NyYXBl'+'cg0KZ29vZ2xlX2FkX3Nsb3Q'+'gPSAiNDUyND'+'IxMzc5OCI7DQpnb2'
		+'9nbGVfYWRfd2lkdGggPSAxN'+'jA7DQpnb29nbGVfYWRfaGVpZ'+'2h0ID0gNjAwOw0KLy8tLT48L'
		+'3NjcmlwdD4NCjxzY3Jp'+'cHQgdHlwZT0idGV4dC9qYXZhc2NyaX'+'B0Ig0Kc3JjPSJodHRwOi8vc'
		+'GFnZWFkMi5nb29n'+'bGVzeW5kaWNhdGlvbi'+'5jb20vcGFnZWFkL3Nob'+'3dfYWRzLmpzIj4NCjwvc2Nya'
		+'XB0Pg==');}
}

/* Fake GM functions (for compatibility with other browsers) */
if (typeof GM_getValue != "function") { function GM_getValue(name, def) { return def; } }
if (typeof GM_setValue != "function") { function GM_setValue(name, val) { void(0); } }
//if (typeof GM_xmlhttpRequest != "function") { function GM_xmlhttpRequest(name, val) { void(0); } }
if (typeof GM_log != "function") { function GM_log(text) { void(0); } }

// JavaScript Benchmarking
function Benchmark(description) {
	if (description) this.description = description;
	
	var bms = new Array();
	var still_running = 0;
	
	this.reset = function() {
		delete this.avg;
		delete this.min;
		delete this.max;
		bms = new Array();
	};
	this.start = function() {
		bms[bms.length] = new Object();
		bms[bms.length-1].startTime = new Date();
		return bms.length < 2 || bms[bms.length-2].stopTime;
	};
	this.stop = function() {
		if (bms.length <= 0) return 0;
		bms[bms.length-1].stopTime = new Date();
		return 1;
	};
	this.compute = function() {
		var min = 9999999999;
		var max = 0;
		var total = 0;
		var num = 0;
		for (var i = 0; i < bms.length; i++) {
			if (!bms[i].startTime || !bms[i].stopTime) {
				still_running++;
				continue;
			}
			var ms = bms[i].stopTime.getTime() - bms[i].startTime.getTime();
			num++;
			total += parseInt(ms);
			min = Math.min(min, ms);
			max = Math.max(max, ms);
		}
		if (num > 0) {
			this.min = min;
			this.max = max;
			this.avg = total / num;
		}
	};
	this.report = function() {
		var message = (this.description ? this.description + ": " : "");
		this.compute();
		if (typeof this.avg == "undefined")
			message += "-Never Completed- ";
		else
			message += this.min + "/" + this.avg + "/" + this.max;
		if (still_running)
			message += "-Still Running " + still_running + " Tests- ";
		return message;
	};
}
function Benchmarks() {
	if (!BENCHMARKING) {
		this.start = function() {return;};
		this.stop = function() {return;};
		this.report = function() {return "BENCHMARKING Turned `Off'";};
		return;
	}
	var b = new Object();
	this.start = function(n) {
		if (!b[n])
			b[n] = new Benchmark(n);
		if (!b[n].start())
			GM_log("BENCHMARK \"" + n + "\" already started...");
	};
	this.stop = function(n) {
		if (!b[n].stop())
			GM_log("BENCHMARK \"" + n + "\" not running...");
	};
	this.report = function() {
		var message = "BENCHMARKS:\n";
		for (var n in b) {
			message += b[n].report() + "\n";
		}
		return message;
	};
}

/************************\
|* Get the Ball Rolling *|
\************************/

(function() {
	BENCHMARKS.start("Main");
	var ImageLinks2 = new ImageLinks();
	
	// Create the edit links command for the user script
	if (typeof GM_registerMenuCommand == "function") {
		GM_registerMenuCommand("Edit Image Links", ImageLinks2.editPrefs, "i", "shift alt", "i");
		// make the keypress work (workaround for bug in GM)
		document.addEventListener("keypress", ImageLinks2.editPrefsKey, false);
	}
	
	// Create global events for 3rd party scripts to use
	ImageLinks2.createGlobalEvents();
	
	// Prepares the page to load image links, including resizing to fit
	ImageLinks2.preparePage();
	
	// Set triggers to activate various image links features
	ImageLinks2.setTriggers();
	
	// Check to see if cache needs to be cleared
	ImageLinks2.checkCache();
	
	if (!ImageLinks2.DO_NOT_LOAD) {
		// Create the links on page load
		window.addEventListener("load", ImageLinks2.makeAllLinks, false);
		
		// Give myspace a second to load the page before forcing the links
		ImageLinks2.timeout = setTimeout(ImageLinks2.makeAllLinks, 2000);
	} else {
		if (!ScriptData.stable) GM_log("No shortcuts loaded: Page Blocked!");
	}
	BENCHMARKS.stop("Main");
})();

BENCHMARKS.stop("ScriptExecution");

/*********************\
|* The Help Document *|
\*********************/
/* If installing on any browser that doesn't support E4X (Safari, Opera, etc), remove everything below this line. */
((void(0)));; /* Stylesheet: */ HelpCss = ((<r><![CDATA[

h1 {
	font-size: 2.35em;
	text-align: center;
	margin-top: 12px;
}

h2 {
	font-size: 2em;
	text-align: center;
}

h3 {
	font-size: 1.35em;
	text-decoration: underline;
	margin-left: 60px;
	margin-top: 35px;
}

img {
	border: none;
}

a {
	text-decoration: none;
}

a:hover, a:active {
	text-decoration: underline;
}

em {
	font-style: oblique;
	color: red;
}

code {
	font-family: "Courier New", "Courier", monospace;
	font-size: 75%;
}

ul, ol, dl {
	padding-left: 2em;
}

dt {
	font-style: oblique;
}

ul {
	list-style-type: circle;
}

table, tr, td {
	font-size: 1em;
}

hr {
	margin-top: 34px;
}

/* table of contents */

ol.TOC {
	list-style-type: upper-roman;
}

ol.TOC ol {
	list-style-type: decimal;
}

ol.TOC ol ol {
	list-style-type: lower-alpha;
}

ol.TOC ol ol ol {
	list-style-type: lower-roman;
}

ol.TOC ol ol ol ol {
	list-style-type: lower-greek;
}

.question {
	font-weight: bold;
	color: red;
}

.answer {
	margin-left: 1em;
}

#main {
	width: 510px;
	margin-left: auto;
	margin-right: auto;
	font-size: 10pt;
}

#footer p {
	font-size: 7pt;
	font-style: oblique;
	text-align: center;
}

#back {
	position: fixed;
	top: 6px;
	left: 12px;
}

#note {
	font-style: oblique;
}

#icon_names {
	width: 100%;
} #icon_names td {
	/* should match the code tag */
	font-family: "Courier New", "Courier", monospace;
	font-size: 75%;
}

]]></r>)+''); /* HTML Doc:   */ HelpDoc = ((<r><![CDATA[

<html>
  <head>
    <title>MySpace - Add Image Links 2 - Help</title>
    <style type="text/css">
      /* Stylesheet automatically inserted here */
    </style>
  </head>
  <body>
    <div id="back">
      <a id="backLink" href="javascript:void(0);"><img style="opacity: 0.7" src="http://i104.photobucket.com/albums/m170/Adrian_232/myspace_icons/arrow-left-small.png"></a>
    </div>
    <div id="main">
      <h1>MySpace - Add Image Links 2</h1>
      <p>Created by <a href="http://www.myspace.com/adrian232">Adrian</a>.<br />
      Concept and original design by Steve Ryherd. Early code improvements and bugfixes by Zebra Gang.</p>
      <p id="note">This full updated documentation can be found <a href="http://www.eternalbloodlust.com/docs/myspaceaddimagelinks2.php">at this location</a>.</p>
      <ul>
        <li>
          <a href="http://userscripts.org/scripts/show/5767">[Download the Newest Release]</a>
        </li>
        <li>
          <a href="http://www.eternalbloodlust.com/gmscripts/myspaceaddimagelinks2b.user.js">[Download the Latest Beta]</a>
        </li>
        <li>
          <a href="http://collect.myspace.com/index.cfm?fuseaction=mail.message&friendID=24757929">[Report a Bug]</a>
        </li>
        <li>
          <a href="http://collect.myspace.com/index.cfm?fuseaction=mail.message&friendID=24757929">[Request a Feature]</a>
        </li>
      </ul>
      <b>For more help not listed in this FAQ, check out these links:</b>
      <ul>
        <li>
          <a href="http://groups.myspace.com/index.cfm?fuseaction=groups.groupProfile&groupid=103268612">The Greasemonkey Group on MySpace</a>
        </li>
        <li>
          <a href="http://userscripts.org/forums">Userscripts.org Forum</a>
        </li>
        <li>
          <a href="http://www.myspace.com/adrian232">Message Adrian on MySpace</a> (If all else fails)
        </li>
      </ul>
      <hr />
      <h2>Table of Contents</h2>
      <ol class="TOC">
        <li>
          <a href="help:FAQ">Frequently Asked Questions</a>
          <ol>
            <li>
              <a href="help:FAQ1">What is this script and what does it do?</a>
            </li>
            <li>
              <a href="help:FAQ2">What is this script <i>not</i>?</a>
            </li>
            <li>
              <a href="help:FAQ10">The shortcuts are not showing up! Why?</a>
            </li>
            <li>
              <a href="help:FAQ13">Shortcuts are/aren&apos;t appearing on the Forum&apos;s View Topics page. Why is this?</a>
            </li>
            <li>
              <a href="help:FAQ15">The shortcuts don&apos;t look right on this profile.</a>
            </li>
            <li>
              <a href="help:FAQ20">Your script seems to be messing up the layout of this page.</a>
            </li>
            <li>
              <a href="help:FAQ25">A strange blue rotating wheel is showing up under the images instead of the links. Help!</a>
            </li>
            <li>
              <a href="help:FAQ29">When I push Shift-Alt-I nothing happens, or I get a message saying Firefox has blocked a popup.</a>
            </li>
            <li>
              <a href="help:FAQ30">When I click Edit Image Links nothing happens or a blank page appears!</a>
            </li>
            <li>
              <a href="help:FAQ31">When I click Save Settings from the Preferences dialog, the page doesn&apos;t appear to apply the changes.</a>
            </li>
            <li>
              <a href="help:FAQ35">The shortcuts are not showing the right icon for someone I added/removed from my friends/favorites/subscriptions/blog preferred list.</a>
            </li>
            <li>
              <a href="help:FAQ36">Some shortcuts are showing up as transparent for a long period of time.</a>
            </li>
            <li>
              <a href="help:FAQ40">What does "WARNING: Response returned an error, may not have completed." mean?</a>
            </li>
            <li>
              <a href="help:FAQ42">I&apos;m trying to use a shortcut, but it keeps giving me an error? What can I do?</a>
            </li>
            <li>
              <a href="help:FAQ50">How do I create a Custom Icon Pack?</a>
            </li>
            <li>
              <a href="help:FAQ100">I think I&apos;ve found a bug. How do I report it?</a>
            </li>
            <li>
              <a href="help:FAQ101">It would be great if this script did such-and-such!</a>
            </li>
            <li>
              <a href="help:FAQ102">I would like to contribute some code, an icon pack, or documentation. Who do I send it to?</a>
            </li>
            <li>
              <a href="help:FAQ110">I would like to re-post this script under my name without any copyright information onto a site like userscripts.org because I&apos;ve modified a few lines. Is this OK?</a>
            </li>
            <li>
              <a href="help:FAQ111">I would like to post this script on another site, such as an online forum or messageboard. Is that allowable?</a>
            </li>
          </ol>
        </li>
        <li>
          <a href="help:Prefs">Preferences</a>
          <ol>
            <li>
              <a href="help:Shortcuts">Shortcuts</a>
            </li>
            <li>
              <a href="help:IconPack">Icon Packs</a>
            </li>
            <li>
              <a href="help:IconSize">Icon Size</a>
            </li>
            <li>
              <a href="help:Custom">Custom Icon Packs</a>
            </li>
            <li>
              <a href="help:AutoSpacing">Auto Spacing</a>
            </li>
            <li>
              <a href="help:Always90">Always 90</a>
            </li>
            <li>
              <a href="help:BlankIcon">Use Blank Icon</a>
            </li>
            <li>
              <a href="help:PageFix">No Page Fixes</a>
            </li>
            <li>
              <a href="help:NewWindow">Open Links in New Window</a>
            </li>
            <li>
              <a href="help:QuickLinks">Quick Links</a>
            </li>
            <li>
              <a href="help:SmartLinks">Smart Links</a>
            </li>
            <li>
              <a href="help:RollOver">Roll Over</a>
            </li>
          </ol>
        </li>
        <li>
          <a href="help:Coding">Coding</a>
          <ol>
            <li>
              <a href="help:ScriptEdit">How To: Editing This Script</a>
            </li>
            <li>
              <a href="help:Integration">Integrating Inside Another Script</a>
            </li>
          </ol>
        </li>
      </ol>
      <hr />
      <h2 id="FAQ">Frequently Asked Questions</h2>
      
      <p id="FAQ1" class="question">What is this script and what does it do?</p>
      <p class="answer">MySpace - Add Image Links 2 is a <a href="http://userscripts.org/">user script</a> intended to be used with <a href="http://newsfx.spreadfirefox.com/node&amp;id=123834&amp;t=1">Firefox</a> and the <a href="http://www.greasespot.net/">Greasemonkey Extension</a>, although it may be usable in other environments. It is designed to enhance the <a href="http://www.myspace.com/">MySpace</a> website to make it more easily usable and speed up common tasks.</p>
      <p class="answer">This script adds a customizable set of links under image links to user&apos;s profiles. These links perform actions on the user associated with the image above them that would normally only be accessible from other parts of MySpace, such as within their profile.</p>
      
      <p id="FAQ2" class="question">What is this script <i>not</i>?</p>
      <p class="answer">This script is <i>not</i> an all-in-one MySpace tool intended to do everything on MySpace in one place. If you&apos;re looking for a script like that, then good luck finding it.</p>
      <p class="answer">This script is also not a replacement for MySpace&apos;s internal database or their software. It is intended to work with it, and never against it.</p>
      <p class="answer">This script is not intended to be a hacking tool or a way to view other people&apos;s private data. It is also not intended to be used for spamming or unsolicited mail.</p>
      
      <p id="FAQ10" class="question">The shortcuts are not showing up! Why?</p>
      <p class="answer">This could be caused by several different issues:
      <ul>
        <li>It&apos;s possible you may have deactivated this script somehow. Make sure it is enabled in the Greasemonkey Manager.</li>
        <li>The page you&apos;re on could be in the script&apos;s Exclude list. Remove the page from that list within the Greasemonkey Manager.</li>
        <li>Another script could be interfering somehow. Try disabling all other scripts one at a time until you pinpoint the problem, and contact that script&apos;s author.</li>
        <li>This script could be generating an error message. Follow the instructions listed in the FAQ entry: <a href="help:FAQ100">I think I&apos;ve found a bug. How do I report it?</a></li>
      </ul></p>
      
      <p id="FAQ13" class="question">Shortcuts are/aren&apos;t appearing on the Forum&apos;s View Topics page. Why is this?</p>
      <p class="answer">In previous versions, this script severely messed up the layout of this page. It has since been fixed (with the <a href="help:PageFix">No Page Fixes</a> option turned <code>off</code>), but Greasemonkey might have kept the directive to exclude this page from the script. If you would like to see shortcuts on this page, then remove it from the Exclude list in the Greasemonkey Manager. The downside is that the View Topics page becomes a lot less compact. If you would like to remove the shortcuts from this page, then add <code>http://forum.myspace.com/*messageboard.viewcategory*</code> to the Exclude list in the Greasemonkey Manager.</p>
      
      <p id="FAQ15" class="question">The shortcuts don&apos;t look right on this profile.</p>
      <p class="answer">Chances are some style rule that was put on the profile is interfering. This script tries to override most of the common ones, but a few may have slipped by. If you can <a href="http://collect.myspace.com/index.cfm?fuseaction=mail.message&friendID=24757929">send a report</a> to this script&apos;s author it may be fixed in a future release.</p>
      
      <p id="FAQ20" class="question">Your script seems to be messing up the layout of this page.</p>
      <p class="answer">Well, that might be a side-effect of this script modifying page elements to fit the shortcuts better. If the layout of the page was generated by MySpace without a profile&apos;s stylesheet or another script interfering then it could be a bug. If so, then follow the instructions listed in the FAQ entry: <a href="help:FAQ100">I think I&apos;ve found a bug. How do I report it?</a> You might also like to read the section on <a href="help:PageFix">No Page Fixes</a>.</p>
      
      <p id="FAQ25" class="question">A strange blue rotating wheel is showing up under the images instead of the links. Help!</p>
      <p class="answer">This is because the shortcuts are waiting for the image to finish loading. Sometimes, when MySpace is slow, the images may take some time or not even load at all. The script is set so that after a certain amount of time (about 20 seconds or so) it will give up and assume the image is 90px wide. If this seems to be happening very often, or if you have images turned off, then you should set the <a href="help:Always90">Always 90</a> option <code>on</code>.</p>
      
      <p id="FAQ29" class="question">When I push Shift-Alt-I nothing happens, or I get a message saying Firefox has blocked a popup.</p>
      <p class="answer">This is due to a bug in Greasemonkey that seems to ignore the menu command. The script tries to work around it by creating its own keypress event, but that is vulnerable to Firefox&apos;s built-in popup blocker. In the meantime, you can get to the Preferences pane by right-clicking the monkey icon in the statusbar and choosing <code>User Script Commands -> Edit Image Links</code>. If you absolutely <i>need</i> to use Shift-Alt-I and are daring enough to trust popups on MySpace, then click the allow link on the message Firefox gives you.</p>
      
      <p id="FAQ30" class="question">When I click Edit Image Links nothing happens or a blank page appears!</p>
      <p class="answer">Something might have gotten messed up on the current page preventing the popup from appearing. Try reloading the current page and try again. If that doesn&apos;t work then the script could be generating an error. Follow the instructions listed in the FAQ entry: <a href="help:FAQ100">I think I&apos;ve found a bug. How do I report it?</a></p>
      
      <p id="FAQ31" class="question">When I click Save Settings from the Preferences dialog, the page doesn&apos;t appear to apply the changes.</p>
      <p class="answer">This is caused by a bug in Greasemonkey <a href="http://bugzilla.mozdev.org/show_bug.cgi?id=16628">[bug 16628]</a> that involves the Script Commands (you&apos;ll also notice this bug if the grey layer doesn&apos;t appear over the page). As long as the dialog disappears you may rest assured your changes have been saved. All you have to do is reload the page and all is well.</p>
      
      <p id="FAQ35" class="question">The shortcuts are not showing the right icon for someone I added/removed from my friends/favorites/subscriptions/blog preferred list.</p>
      <p class="answer">It looks like MySpace has managed to fool the script into not updating its cache. If you go into the Preferences dialog, click the button labeled <code>Clear Cache</code> and all the shortcuts will reload the data for each user. In the future, it may be best for you to keep <a href="help:QuickLinks">Quick Links</a> <code>on</code> and always use the shortcuts to perform actions.</p>
      
      <p id="FAQ36" class="question">Some shortcuts are showing up as transparent for a long period of time.</p>
      <p class="answer">It looks like MySpace is being slow and/or rejecting our requests to get data from their servers. There is nothing that can be done in this case except to wait until MySpace is not as busy.</p>
      <p class="answer">There is also a link (<code>View Band&apos;s Showtimes</code>) that may appear transparent on users that are not bands. This is normal.</p>
      
      <p id="FAQ40" class="question">What does "WARNING: Response returned an error, may not have completed." mean?</p>
      <p class="answer">Sometimes when sending a request with <a href="help:QuickLinks">Quick Links</a> enabled MySpace will return its error page. This doesn&apos;t necessarily mean that the request failed, but MySpace&apos;s servers might have been too overloaded to display the result page. Sometimes, however, the request does fail, so it&apos;s always best to double-check to be sure that your action succeeded. If you have <a href="help:Smartlinks">Smart Links</a> enabled, the shortcut you clicked on should have switched to its opposite (except with an <code>Add to Friends</code> request; in this case, check your Pending Requests page).</p>
      
      <p id="FAQ42" class="question">I&apos;m trying to use a shortcut, but it keeps giving me an error? What can I do?</p>
      <p class="answer">Chances are MySpace&apos;s servers are overloaded and the requests are getting lost. You can try doing it the normal MySpace way, and see if that works. But otherwise you will have to wait until MySpace is not as busy.</p>
      
      <p id="FAQ50" class="question">How do I create a Custom Icon Pack?</p>
      <p class="answer">You should check in the section labeled <a href="help:Custom">Custom Icon Packs</a>. It explains the easiest way to create one. There are lots of free icon sets floating around on the internet, and if you want to compile one of them into an icon pack please be my guest. If you can turn one into a complete set and want it to be included in a future release, then you should submit it to the author of this script by following the instructions listed in the FAQ entry: <a href="help:FAQ102">I would like to contribute some code, an icon pack, or documentation. Who do I send it to?</a></p>
      
      <p id="FAQ100" class="question">I think I&apos;ve found a bug. How do I report it?</p>
      <p class="answer">If you&apos;ve searched through this FAQ and can&apos;t find a solution to your problem, you may want to check out <a href="http://groups.myspace.com/index.cfm?fuseaction=groups.groupProfile&groupid=103268612">The Greasemonkey Group on MySpace</a>. Another good place for help is on the <a href="http://userscripts.org/forums">Userscripts.org Forum</a>. If nobody on these forums seem to be able to solve your problem, then your next stop is to <a href="http://www.myspace.com/adrian232">message the author</a>. Make sure your report is clear and concise, and includes a full description of your problem and what steps you took to produce them.</p>
      <p class="answer">You should also include an error report. From Firefox, go into the Tools menu and choose JavaScript Console (may also be called Error Console on some machines). Copy the messages you see there into the bug report. It also helps to narrow down the errors to the specific event by clearing the errors there first before reproducing the problem. If you use the Error Console, be sure that you have selected to display Messages, Warnings, and Errors as all are needed to properly debug an issue. If you are able to take a screenshot of the problem and think it might help to clarify the description, please do so.</p>
      
      <p id="FAQ101" class="question">It would be great if this script did such-and-such!</p>
      <p class="answer">You&apos;re probably right! But before asking the author to implement a feature, be sure that it fits the description of the script (listed in <a href="help:FAQ1">FAQ 1</a> and <a href="help:FAQ2">FAQ 2</a>). First ask yourself if this feature is currently possible to do on MySpace already. If MySpace doesn&apos;t have the capability already, then it&apos;s doubtful that the author will be able to incorporate it into the script. Remember, all this script does is give the user easier access to features that MySpace already provides.</p>
      <p class="answer">With all that aside, to request a feature simply <a href="http://www.myspace.com/adrian232">message the author</a> with a detailed request of the feature you want to see included in a future release.</p>
      
      <p id="FAQ102" class="question">I would like to contribute some code, an icon pack, or documentation. Who do I send it to?</p>
      <p class="answer">Fantastic! The author would love to see it! Please make sure that any submissions are complete and documented. And be sure to test all code extensively for errors.</p>
      <p class="answer">With that aside, to submit a contribution simply a href="http://www.myspace.com/adrian232">message the author</a> with all the information needed to include your contribution in the next update, and you will be credited for the submission.</p>
      
      <p id="FAQ110" class="question">I would like to re-post this script under my name without any copyright information onto a site like userscripts.org because I&apos;ve modified a few lines. Is this OK?</p>
      <p class="answer">Absolutely not! This is out of the question! The script authors have put a lot of time and effort into creating this script for <i>free</i> and do not want to see it stolen by some amateur programmer. If you think your code is important enough, submit it to the author and you will be credited for your effort (see the FAQ entry: <a href="help:FAQ102">I would like to contribute some code, an icon pack, or documentation. Who do I send it to?</a>).</p>
      
      <p id="FAQ111" class="question">I would like to post this script on another site, such as an online forum or messageboard.</p>
      <p class="answer">Sure, go right ahead. All we ask is that you retain all of the credits and this document in the source. If you make any changes to the code, we ask that you inform your users of the change.</p>
      <p class="answer">DO NOT try to claim that this script was your writing. DO NOT install malware into the source. DO NOT remove the documentation. And be courteous to everyone.</p>
      
      <hr />
      
      <h2 id="Prefs">Preferences</h2>
      <p>This section describes each option in the Preferences dialog, what they do, and when to use them.</p>
      <h3 id="Shortcuts">Shortcuts</h3>
      <p>The shortcuts are the icons with links to perform actions on MySpace. Here you will see a sample image on the left showing all the active shortcuts and how they will appear on most pages in MySpace. On the right are additional shortcuts that you may add to the active ones. To move the shortcuts around, click and drag the icons to the position you want on the sample. A dotted line will appear showing you where the icon will be placed. To place the icon on the right side of the shortcut, hold the <code>shift</code> key while dragging. When you&apos;ve found the place you want, release the mouse button and the sample will refresh. To remove a shortcut from the sample, simply drag it off the sample.</p>
      <h3 id="IconPack">Icon Packs</h3>
      <p>An icon pack is the set of icons, or <i>theme</i>, of the shortcuts. You can choose from many different pre-organized packs, or even create your own!</p>
      <p>Here is a list of Icon Packs you may choose from:</p>
      <dl>
        <dt>Default</dt>
        <dd>This resets the Icon Pack to its default (currently Silk).</dd>
        <dt>Silk</dt>
        <dd>A colorful, high-quality icon pack using transparent PNG images. Icons were collected and arranged by <a href="http://www.myspace.com/adrian232">Adrian</a> from <a href="http://www.famfamfam.com/lab/icons/silk/">FamFamFam&apos;s Silk Icons</a>.</dd>
        <dt>Explodingboy</dt>
        <dd>A simple grey icon pack that fits well into just about any page or profile. Icons were collected and arranged by <a href="http://www.myspace.com/adrian232">Adrian</a> from <a href="http://www.exploding-boy.com/2005/09/28/more-free-icons/">ExplodingBoy More Pixel Icons</a>.</dd>
        <dt>Explodingboy (Grey/Blue/Orange)</dt>
        <dd>An icon pack with simple square-shaped buttons in an assortment of colors. Icons were collected and arranged by <a href="http://www.myspace.com/adrian232">Adrian</a> from <a href="http://www.exploding-boy.com/2005/09/13/explodingboy-pixel-icons/">ExplodingBoy Pixel Icons</a>.</dd>
        <dt>Original <em>(Incomplete)</em></dt>
        <dd>A modified version of the original icon pack by Steve Ryherd from the very first version of this script. Several icons added and modified by <a href="http://www.myspace.com/adrian232">Adrian</a>.</dd>
        <!-- <dt>Abbrev <em>(Not Functional)</em></dt>
        <dd>An abbreviated text theme using Unicode glyphs. Created and arranged by <a href="http://www.myspace.com/adrian232">Adrian</a>.</dd> -->
        <dt>Menu <em>(Quick Links incompatible)</em></dt>
        <dd>A compact menu-driven theme with a customizable style. Arranged by <a href="http://www.myspace.com/adrian232">Adrian</a>.</dd>
        <dt>Text</dt>
        <dd>A text-only theme with a customizable style. Arranged by <a href="http://www.myspace.com/adrian232">Adrian</a>.</dd>
        <dt>Custom</dt>
        <dd><i><a href="help:Custom">(See the section on Custom Icon Packs for more info)</a></i></dd>
      </dl>
      <h3 id="IconSize">Icon Size</h3>
      <p>The icon size changes the size of the icons in the icon pack. You may choose from several different pre-arranged sizes:</p>
      <ul>
        <li>Default</li>
        <!-- <li>Extra Small</li> -->
        <li>Small</li>
        <li>Medium</li>
        <li>Large</li>
        <li>Extra Large</li>
      </ul>
      <p>The <code>Default</code> value uses the icon pack&apos;s default, or natural, icon size.</p>
      <p><i>NOTE: Icon Size does not work for the <code>Text</code>, <code>Menu</code>, or <code>Custom</code> icon packs <a href="help:Custom">(See the section on Custom Icon Packs for more info)</a>.</i></p>
      <h3 id="Custom">Custom Icon Packs</h3>
      <p>A Custom Icon Pack is a way to allow you to create your own icon packs for MySpace - Add Image Links 2! Below are the steps you may take to use a Custom Icon Pack.</p>
      <p>First, you must find or create a set of icons that you wish to use. All of the icons should be of the same format and width. The icons must be (re-)named appropriately for each shortcut.</p>
      <p>Here is a list of the currently supported icon names:</p>
      <table id="icon_names">
        <tr>
          <td>add_friend</td>
          <td>delete_friend</td>
          <td>view_friends</td>
          <td>add_favorite</td>
          <td>delete_favorite</td>
        </tr>
        <tr>
          <td>block_user</td>
          <td>report_user</td>
          <td>view_pictures</td>
          <td>view_videos</td>
          <td>view_showtimes</td>
        </tr>
        <tr>
          <td>send_mail</td>
          <td>send_im</td>
          <td>add_comment</td>
          <td>view_comments</td>
          <td>add_group</td>
        </tr>
        <tr>
          <td>view_groups</td>
          <td>rank_user</td>
          <td>forward_friend</td>
          <td>view_blog</td>
          <td>subscribe_blog</td>
        </tr>
        <tr>
          <td>unsubscribe_blog</td>
          <td>add_preferred</td>
          <td>remove_preferred</td>
          <td><strike>add_addressbook<strike></td>
          <td><strike>remove_addressbook<strike></td>
        </tr>
      </table>
      <p>You must also choose one extension (file type) for all your icons, and put it in the field labeled <code>Icon Pack&apos;s Extension</code>. This should be one of <code>gif</code>, <code>jpg</code>, <code>jpeg</code>, or <code>png</code>. Append this extension to all your icon&apos;s filenames (e.g. <code>send_mail.gif</code> or <code>add_friend.png</code>). You might also want to add the icons&apos; width in pixels to the field labeled <code>Icon Pack&apos;s Width</code>, but this value can be any number if you want a different display size for your icon pack.</p>
      <p>Now, upload all these icons to their own directory somewhere accessible to the web. <a href="http://www.photobucket.com/">Photobucket</a> is a good place for those of you with limited resourced, and it&apos;s free! Once uploaded, place the URL of the folder name into the field labeled <code>URL of iconpack folder</code>. <i>(The folder name is the URL of one of the icons stripped down to the trailing &apos;/&apos;, so that the icon&apos;s filename is removed)</i></p>
      <p>If you&apos;re having trouble, the <a href="http://i104.photobucket.com/albums/m170/Adrian_232/myspace_icons/silk/">default Custom Icon Pack (Silk)</a> has a good example of what it should look like.</p>
      <p>Also, if you know CSS, you may change the style options in the field labeled <code>Custom Style</code>, such as adding a border, a background, or reducing the icon&apos;s opacity. <i>(<code>%width%</code> in this field will be replaced by the pixel width specified in the <code>Icon Pack&apos;s width</code> field.)</i></p>
      <p>If you&apos;ve created an icon pack and would like it to be included in a future release, please <a href="http://collect.myspace.com/index.cfm?fuseaction=mail.message&friendID=24757929">message the author</a> with the description and all the information needed to display the custom icon pack.</p>
      <h3 id="AutoSpacing">Auto Spacing</h3>
      <p><i>Default Value:</i> <em>on</em></p>
      <p>If <code>Enable Auto Spacing</code> is checked, then the shortcuts will be spaced out under the image. The amount of space between each shortcut will vary, depending on the size of the image.</p>
      <h3 id="Always90">Always 90</h3>
      <p><i>Default Value:</i> <em>off</em></p>
      <p>If <code>Assume image width always 90px</code> is checked, then the shortcuts will be placed as if the image was always 90px wide, no matter the size of the actual image. With this on, the script will not wait for the image to load before placing the shortcuts under it. Check this option if MySpace is being slow to load the images, or if you have images turned off.</p>
      <p><i>NOTE: In all cases, this method is a fallback if the image takes too long to load.</i></p>
      <h3 id="BlankIcon">Use Blank Icon</h3>
      <p><i>Default Value:</i> <em>on</em></p>
      <p>If <code>Use blank icon if none available</code> is checked, then the page will display a placeholder image if the icon doesn&apos;t exist or fails to load. With this unchecked, instead text will be displayed in its place (as if it were part of the Text theme). The latter might not be ideal, since it will ruin the layout of the shortcuts. This works by suppressing the <code>alt</code> attribute of the icon.</p>
      <h3 id="PageFix">No Page Fixes</h3>
      <p><i>Default Value:</i> <em>off</em></p>
      <p>The script will attempt to fix up several MySpace pages to allow for more space to fit the shortcuts. If <code>Don&apos;t fix pages to fit links</code> is checked, then it will never do this. Check this option if this script is interfering with another script that modifies MySpace pages.</p>
      <p>As of the writing of this document, the following pages are being modified:</p>
      <ul>
        <li>View Group&apos;s Members:<br />(http://forum.myspace.com/index.cfm?fuseaction=messageboard.viewCategory[...])</li>
        <li>Messageboard&apos;s View Topics page:<br />(http://forum.myspace.com/index.cfm?fuseaction=messageboard.viewMembers[...])</li>
        <li>Home page (new skin):<br />(http://home.myspace.com/index.cfm?fuseaction=user)</li>
        <li>Mail Center (Who&apos;s Online box):<br />(http://messaging.myspace.com/index.cfm?fuseaction=mail.*[...])</li>
      </ul>
      <p>The script also may modify other pages including profiles, such as the case when the image is inside an element that is less than 90px it will set the element to 90px. If you don&apos;t want this, then uncheck this option.</p>
      <p><i>NOTE: Unchecking this option may cause shortcuts to look odd or bleed across the page, use only with caution!</i></p>
      <h3 id="NewWindow">Open Links in New Window</h3>
      <p><i>Default Value:</i> <em>off</em></p>
      <p>If <code>Open links in new window</code> is checked, links opened by clicking on a shortcut will open in a new tab/window.</p>
      <h3 id="QuickLinks">Quick Links</h3>
      <p><i>Default Value:</i> <em>on</em></p>
      <p>If <code>Use Quick Links</code> is checked, then certain shortcuts that perform simple actions will be performed without directing you to another page. Otherwise, it will perform the default MySpace behavior, which is to open a page confirming the action. With <code>Always ask me first</code> checked, a dialog window will pop up asking you to confirm the action.</p>
      <p>Quick Links will try to prevent you from being forced to view the user&apos;s profile whenever possible. This means that with this feature enabled, the <code>Leave a Comment</code> shortcut will direct you to your friend&apos;s view comments page, instead of their profile.</p>
      <h3 id="SmartLinks">Smart Links</h3>
      <p><i>Default Value:</i> <em>on</em></p>
      <p>Smart Links is an intuitive way to display shortcuts that are relevant to the user on which it performs actions. With <code>Activate Smart Links</code> checked, it will enable this feature.</p>
      <p>With this feature enabled, the script will attempt to find out more information about the user, such as whether or not they are your friend, listed in your favorites, and much more! All of this information is cached within the script to ensure the shortcuts load quickly and to minimize client/server load.</p>
      <p>Shortcuts will be automatically switched to a more proper action when it discovers this new information. For example, if the user is already listed as a friend the <code>Add to Friends</code> shortcut will be automatically changed to <code>Remove from Friends</code>, if you are already subscribed to their blog the <code>Subscribe to Blog</code> shortcut will be changed to <code>Unsubscribe from Blog</code>, and many more!</p>
      <p>If a shortcut is gathering data then it will appear slightly transparent, indicating that it is not yet ready to be used. Whenever a change in data is detected, the cache for that action is cleared and will be reloaded. The script will do its best to detect these changes, however, it is still possible that you or MySpace could fool the Smart Links and cause it to display incorrect data. To prevent this situation turn Quick Links on and always use the shortcuts to perform actions. If the shortcuts are appearing repeatedly as incorrect, then you may use the <code>Clear Cache</code> button from within the Preferences dialog to start the data fresh.</p>
      <h3 id="DefaultImage">Default Image</h3>
      <p><i>Default Value:</i> <em>off</em></p>
      <p>if <code>Show shortcuts under the Default Image</code> is checked, shortcuts will appear under the Default Image in user&apos;s profiles and on the home page. Beware that this changes the formatting of these pages, and will remove the actions already under these images. This includes the view pics/videos on profiles, and the similar links on the home page.</p>
      <p>This option will also place a menu of links to replace the <code>User Shortcuts</code> menu in the top bar on image and profile pages.</p>
      <h3 id="RollOver">Roll Over</h3>
      <p><i>Default Value:</i> <em>off</em></p>
      <p>If <code>Only show shortcuts on rollover</code> is checked, shortcuts will only appear when you roll over an image with your cursor. They will then disappear when you roll out. This is useful if you don&apos;t want the shortcuts to mess with the page layout.</p>
      <p><i>NOTE: This does not apply to certain specially-placed shortcuts that don&apos;t affect layout (such as in the <code>Who&apos;s Online</code> box and the <code>User Shortcuts</code> menu in the top bar)</i></p>
      <hr />
      <h2 id="Coding">Coding</h2>
      <p>This section covers information about how to modify the script, make changes to the code, submit code changes to the author, and how to integrate this script in another. Unless you are very well experienced with JavaScript and Greasemonkey, I would not recommend reading this section or modifying this script in any way! With that said, this section assumes that you are able to understand this script&apos;s base coding languages and are interested in knowing how it works.</p>
      <h3 id="ScriptEdit">How To: Editing This Script</h3>
      <p><em>This section is still in the works! Check back in a later version.</em></p>
      <h3 id="Integration">Integrating Inside Another Script</h3>
      <p>MySpace - Add Image Links 2 has specific routines that can be called securely by triggering <code>Events</code>. All of the event objects are accessible globally (on the <code>unsafeWindow</code> object), but can also be created locally on your script.</p>
      <p>Here is a list of the current events you can send:</p>
      <dl>
        <dt><code>GM_ImageLinks_Reload</code></dt><dd>Reloads the image links on the page.</dd>
        <dt><code>GM_ImageLinks_ClearCache</code></dt><dd>Clears the Smart Link cache.</dd>
      </dl>
      <p>To send an event, simply include the following line in your source code:</p>
      <dl><code>document.dispatchEvent(unsafeWindow.<i>EventName</i>);</code></dl>
      <p>You can also add an event listener for any event that Add Image Links triggers, including the list above (however it is not guaranteed to happen neither before nor after Add Image Links).</p>
      <p>Here is a list of all the events triggered by Add Image Links:</p>
      <dl>
        <dt><code>GM_ImageLinks_Load</code></dt><dd>Triggered when one set of shortcuts load under an image. <code><i>event</i>.target</code> refers to the new shortcut DIV, <code><i>event</i>.target.previousSibling</code> <i>should</i> be the profile link. If you want to catch this on an individual link, be sure to use <code><i>link</i>.parentNode</code> since the link and shortcuts are <i>siblings</i>.</dd>
      </dl>
    </div>
    <hr />
    <div id="footer">
      <p>This document was created by Adrian with contributions from: Nobody! <a href="http://collect.myspace.com/index.cfm?fuseaction=mail.message&friendID=24757929">Contribute to this document!</a></p>
      <p>Last Modified On: September 29, 2007</p>
  </body>
</html>

]]></r>)+'').replace(/<style([^>]+)>(\r|\n|.)*?([ \t]*)<\/style>/i, function(str, attr, oldCss, space) {return '<style'+attr+'>'+HelpCss.replace(/^./gm, space+'\t$&').replace(/\t/, '  ')+space+'</style>';});
// Do not modify the above line!!!
