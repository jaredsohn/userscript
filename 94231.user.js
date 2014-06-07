// ==UserScript==
// @name			SAplusplus
// @namespace		SA
// @description		Improves the Something Awful forums in various ways.
// @downloadURL		http://userscripts.org/scripts/source/94231.user.js
// @include			http://forums.somethingawful.com/*
// @version			1.0.17
// @grant			GM_openInTab
// @grant			GM_setValue
// @grant			GM_getValue
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @require			http://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.min.js
// @icon			http://forums.somethingawful.com/favicon.ico
// ==/UserScript==

/**
 * =========================
 * SAplusplus by minato
 * =========================
 * If you want to contact me, send me a PM on the forums.
 *
 * =========================
 * Changelog
 * =========================
 *
 * V 1.0.17: 2014-04-29
 * - Restored use of GM_set/getValue because Firefox 29 was complaining about localStorage being insecure
 *
 * V 1.0.16: 2014-04-05
 * - Fixed unsafeWindow bug that stopped the script from working, by including jQuery/jQuery-UI directly.
 * - Changed 'like' icon to a non-animated one.
 *
 * V 1.0.15: 2013-02-01
 * - Show the number of times a post has been quoted within the page underneath the post.
 * - Slightly less hideous color for the highlighted post
 * - Fixed bug where "Streamline page" mode could not be disabled
 *
 * V 1.0.14: 2013-01-31
 * - Partially converted to use the forum's jQuery, and other modernizations
 * - Added Smiley finder
 * - Removed code to move "Watch Thread", as the forums now do this themselves
 * - Highlight posts referred to in the anchor, fixed bug when scrolling.
 *
 * V 1.0.13: 2013-01-03
 * - General code cleanup
 * - Preferences are collapsed until the Edit button is pressed.
 *
 * V 1.0.12: 2013-01-03
 * - "Open unread in tabs" now works on the Bookmarked threads page
 *
 * V 1.0.11: 2013-01-02
 * - Removed ugly dropshadow on "Open in tabs" button (due to new forums redesign)
 * - Larger click target for "Next page"/"Previous page" buttons
 *
 * V 1.0.10: 2012-12-07
 * - Fixed bug where spammed images weren't being removed and trimmed whitespace wasn't working.
 *
 * V 1.0.9: 2012-06-21
 * - No longer use GM_* api except for GM_openInTab. Storage now uses Firefox's localStorage.
 * - Use JSON API to store/retrieve preferences instead of eval()
 * - Added @grant for GreaseMonkey 1.0+ compatibility
 *
 * V 1.0.8: 2012-02-13
 * - Updated code to handle some cases where low-content posts were not being correctly detected.
 *
 * V 1.0.7: 2011-10-29
 * - Added thread ID exception to the "hide posts with only quotes" thread because it hides
 *   many posts in the "PYF Favorite SA Quotes" thread.
 *
 * V 1.0.6: 2011-05-29
 * - Fixed bug where an SA Support Robot stickied psuedo-thread messed up the parsing.
 *
 * V 1.0.5: 2011-04-23
 * - Fixed bug where posts with attachment images were considered to have no images.
 * - When filtering "Image only" threads, also allow posts that contain links since they tend to be Youtube links.
 *
 * V 1.0.4: 2011-02-22
 * - Fixed problems when viewing threads in the goldmine
 *
 * V 1.0.3: 2011-01-26
 * - Better checking for Emoticons
 * - Fixed processing people with forums cancer
 * - Fixed bug where stripped page mode wouldn't work when moving to another page
 *
 * V 1.0.2: 2011-01-08
 * - After removing images, trims whitespace from posts.
 * - Reanchors page after load if any posts were removed.
 * - Fixed bug where stripped hellbanned users would cause an image-only post to be hidden.
 * - Fixed restriping bug when hiding low content posts.
 * 
 * V 1.0.1: 2011-01-05
 * - Fixed bug removing quoted hellbanned users
 *
 * V 1.0: 2011-01-04
 * - First release
 *
 * =========================
 * DESCRIPTION
 * =========================
 * Implements various enhancements to Something Awful forums browsing. Enhancements include:
 *
 * User Control Panel:
 * - Button that will open all unread threads in new tabs.
 *
 * Thread List:
 * - Move ratings next to thread title, to more easily scan for gold threads.
 * - Hide threads by hellbanned users
 * - Only show ratings for threads if a minimum number of people have voted (useful for FYAD where the threshold is very low)
 *
 * Thread View:
 * - Hellban users. A hellbanned user is effectively erased from your browsing experience. Their posts will be removed,
 *   including responses to their posts by non-hellbanned users.
 * - Hide posts that don't contain images. Useful for image threads where too many people just comment without posting content.
 * - Prevent image spamming. Any more than 3 images in a quote are removed, to prevent the case where people quote a large
 *   post full of images and just add a one line comment.
 * - Filter low content posts. Hides post that are just empty quotes or single-emoticon posts.
 * - Streamline view. For quickly skimming a long thread. Strips the page of any extraneous content, showing more posts per-page.
 * - Hide avatars. Client-side preference for scrubbing avatars/custom-titles, so you can (for example) show avatars at home but not at work.
 *
 * =========================
 * USING THIS SCRIPT
 * =========================
 * After installation, each page will have a small bar near the bottom "SA++ preferences". Click the "Edit" button to alter
 * preferences. Some preferences are site-wide (e.g. "Hide Avatars"), some are thread-specific (e.g. "Hide posts with no text or images").
 *
 * -------------------------
 * Hellbanning
 * -------------------------
 * Hellbanning a user will erase them from your browsing experience. All their posts, threads, and even their quotes in other posts, will
 * be removed.
 * - To hellban a user, click "Hellban" under one of their posts.
 * - To unhellban a user, click "Edit" in the preferences bar at the bottom of the page, click "View Hellbanned users"
 *		and then click "Unhellban" next to the name of the user.
 *
 * =========================
 * USAGE NOTES
 * =========================
 * Known issues:
 * - The preference state is stored in RAM on each page, so if you (say) hellban a user in one tab, then
 *   move to another tab and hellban another, the prefs will be completely overwritten and you'll lose the first pref.
 *   This can be fixed by reloading the prefs before tweaking and saving them but I haven't gotten around to it.
 *
 * IMPORTANT: This code depends on the following environment:
 * - SA Last Read FF extension (SALR) is installed. 
 * - Adblock is installed
 * - SA user configuration is set up in a particular way.
 *
 * For me, this script works when each of the above has the following settings. Failure to follow this configuration MAY
 * mean that the script doesn't work at all, but as far as I know there isn't any conflict with ANY settings. I
 * haven't tested user sigs though.
 * 
 * SALR config:
 * - General options:
 *   Hide forum header/footer [UNCHECKED]
 * - Forums:
 *   All features [UNCHECKED]
 * 
 * Adblock config:
 *  |http://forums.somethingawful.com/css/rfa.css
 *  |http://forums.somethingawful.com/css/fyad.css
 * These shouldn't affect the script, but failing to block these may have unexpected results when streamlining.
 *
 * SA user options: http://forums.somethingawful.com/member.php?action=editoptions
 * - Mark posts on pages I've already seen in a different color: YES
 * - Show user's signatures in their posts? : NO
 * - Show member ad banners? : NO - I have "No Ads", so I don't know if this script works when Ads are enabled.
 *
 * =========================
 * DEVELOPMENT NOTES
 * =========================
 * Class overview:
 * - Page: The page controller. This determines the page type from the URL, bootstraps each page type's
 *   handler and passes control over to it in the handle() method. It also contains some page-related utility functions.
 *
 * Page handlers:
 * - ThreadList:			The page that displays a list of threads to view
 * - ThreadView				A page of posts
 * - UserControlPanel		The User Control Panel or Bookmarked Threads page
 * - NewThread				Form for posting a new thread
 * - ThreadReply			Form for replying to an existing thread
 * - PrivateMessageEntry	Form for posting a new private message, or replying to one
 *
 * Each handler has a method "handle()" which is run once when the page loads. This is where it will do its per-page
 * manipulations.
 *
 * Other classes:
 * - User:					A SA User
 * - Users:					The list of Users from the preferences
 * - Thread:				A single Thread in the ThreadList
 * - Post:					A single Post in the ThreadView
 * - Smilies:				Emoticon search functionality
 * - LocalStorage:			Utility class that encapsulates persisting data to Firefox's local store
 * - Util:					Utility class, mostly DOM manipulation.
 * - Prefs:					Utility class for persisting user preferences.
 */

/**
 * =================
 * CLASS DEFINITIONS
 * =================
 */

/**
 * Class definition for a SA User
 */
function User(id, name) {
	this.id = id;					// Integer - User ID
	this.name = name;				// String - this user's name
	this.isHellbanned = false;		// Boolean - true if the user is Hellbanned.
}

/**
 * Class definition for a thread listed in the Thread List page or the User Control Panel.
 */
Thread = function(id, row, author_name, author_id, vote_img, num_votes, rating) {
	var obj = {
		id: id							// Integer - Unique ID that identifies this Thread
		, row: row						// DOM "TR" object - Points to the table row in the DOM for this thread
		, author_name: author_name		// String - User name who made this thread
		, author_id: author_id			// Integer - User ID of the user who made this thread
		, visible: true					// Boolean - is this Thread currently visible?
		, vote_img: vote_img			// null | DOM "IMG" object that contains the 1-5 voting image.
		, num_votes: num_votes			// Integer - number of people that have voted on this thread
		, rating: rating				// Integer - average vote value (between 1 and 5)

		/**
		* Shows or hides a Thread, and marks it as such.
		* @param Boolean showHide - true to show, false to hide
		* @return Boolean - whether this changed the actual visiblity or not
		*/
		, showHide: function(showHide) {
			if(showHide != this.visible) {
				$(this.row).toggle(showHide);
				this.visible = showHide;
				return true;
			}
			return false;
		}
	};
	return obj;
};

/**
 * Within the ThreadView page, contains information about a single post
 */
Post = function(table, postbody, post_id, author_name, author_id) {
	var obj = {
		table: table				// DOM "TABLE" object - Points to the Table object in the DOM that contains this post.
		, postbody: postbody		// DOM "TD" object - Points to the TD object containing the actual post.
		, post_id: post_id			// Unique ID for each post (assigned by SA server)
		, author_name: author_name	// String - The name of the user who made this post
		, author_id: author_id		// Integer - The user ID of the user who made this post
		, visible: true				// Boolean - is this Post visible?
		
		/**
		 * Shows or hides a Post, and marks it as such.
		 * @param Boolean showHide - true to show, false to hide
		 * @return Boolean - whether this changed the actual visiblity or not
		 */
		, showHide: function(showHide) {
			if(showHide != this.visible) {
				$(this.table).toggle(showHide);
				this.visible = showHide;
				return true;
			}
			return false;
		}
		/**
		 * Returns true if the Post has an image attachment
		 * @return Boolean
		 */
		, hasImageAttachment: function() {
			return (Util.getNodes('./p[@class="attachment"]/img', this.postbody).length > 0);
		}

		/**
		 * Returns true if the Post contains images (not counting emoticons, not within quoted sections)
		 * or links.
		 * @return Boolean
		 */
		, containsImagesOrLinks: function() {
			var images = Util.getNodes('./img', this.postbody);
			var i = images.length;
			while(i--) {
				if(!Util.isEmoticon(images[i])) {
					return true;
				}
			}
			if(this.hasImageAttachment()) {
				return true;
			}
			var links = Util.getNodes('./a', this.postbody);
			return (links.length > 0);
		}

		/**
		 * Returns true if the Post is "low content", meaning that it doesn't contain any images or text (i.e. just quotes/emoticons)
		 * @return Boolean
		 */
		, isLowContent: function() {
			var cn = this.postbody.childNodes;
			var i = cn.length;
			while(i--) {
				var node_type = Util.getNodeType(cn[i]);
				switch(node_type) {
				case 'image':
				case 'link':
				case 'text':
					return false;
				}
			}
			// Couldn't find any content.
			return !this.hasImageAttachment();
		}

		, trimWhitespace: function() {
			Util.trimWhitespace(this.postbody);

			// Trim all sub quotes
			var quotes = this.getQuotes();
			var i = quotes.length;
			while(i--) {
				Util.trimWhitespace(quotes[i]);
			}
		}

		, getQuotes: function() {
			return Util.getNodes('.//div[contains(@class, "bbc-block")]/blockquote', this.postbody);
		}

		/**
		 * Highlights/De-highlights a post
		 */
		, highlight: function(is_enable) {
			var td = Util.getNodes('.//td', this.table);
			$(td).attr('style', is_enable ? 'background-color:#EE0' : '');
		}
		
		/**
		 * @param boolean is_image_thread - true if this Post is in an Image Thread
		 * @param boolean is_quotes_thread - true if this Post is in the PYF Quotes thread
		 * @return boolean - true if the post should be visible, false otherwise
		 */ 
		, isVisible: function(is_image_thread, is_quotes_thread) {
			// Don't hide posts in the PYF SA Quotes thread
			if(Prefs.lowcontentposts_filtering_enabled && !is_quotes_thread && this.isLowContent()) {
				return false;
			}
			// In "Image Threads", hide any posts that don't contain images.
			if(is_image_thread && !this.containsImagesOrLinks()) {
				return false;
			}

			// Check for hellbanning here
			if(Prefs.is_hellbanning_enabled) {
				if(Users.isHellbanned(this.author_id)) {
					return false;
				}

				// If a non-hellbanned user quoted a hellbanned post, then their post MAY be empty now. If so, hide that post.
				if(/^\s*$/.test(this.postbody.textContent) && !this.containsImagesOrLinks()) {
					return false;
				}
			}
			return true;
		}
		
		/**
		 * If a post contains a quote from a Hellbanned user, then strip the quote and any text underneath it (until the end or the next quote).
		 *
		 * Note: Because this actually removes content permanently, this is somewhat incompatible with
		 * the notion that you can toggle showing/hiding hellbanned content with a mouseclick. A better but
		 * more complex solution would be to shuffle all this content into a DIV, which we can then just show/hide.
		 *
		 * @return boolean - true if any changes were made to the post
		 */
		, stripHellbannedQuotes: function() {
			var posted_by_re = new RegExp('^(.+) posted:$');
			var post_nodes = this.postbody.childNodes;
			var under_banned_quote = false;
			var element_ids_to_remove = [];
			var i;
			for(i = 0; i < post_nodes.length; i++) {
				// Is this a quote?
				var node_type = Util.getNodeType(post_nodes[i]);
				if(node_type === 'edit') {
					// There's no text after a "Edited by..." section so end here.
					break;
				} else if(node_type === 'quote') {
					// Is this a quote made by a hellbanned User?
					var res = post_nodes[i].firstElementChild.textContent.match(posted_by_re); // Determine quotee
					under_banned_quote = res && Users.isHellbanned(res[1]);
				}
				if(under_banned_quote) {
					element_ids_to_remove.push(i);
				}
			}
			// Remove any quotes and the text underneath it.
			if(element_ids_to_remove.length) {
				while(element_ids_to_remove.length) {
					Util.removeElement(post_nodes[element_ids_to_remove.pop()]);
				}
				return true;
			}
			return false;
		}
	};
	return obj;
};


/**
 * =================
 * CONTAINER OBJECTS
 * =================
 *
 * The following objects act as namespaces/singletons.
 */

/**
 * ----------------------------------
 * LocalStorage
 * ----------------------------------
 * Various utility functions
 */
LocalStorage = {
	/**
	 * Adds a prefix to any localStorage key name so that we don't stomp on other app's localStorage items.
	 * @param <string> key - a localStorage key name
	 * @return <string> the key to use when accessing localStorage
	 */
	getKey: function(key) {
		return '***SA***SAplusplus***' + key;
	}

	/**
	 * Returns the string from Firefox's local storage.
	 *
	 * @param String key - the name of the value to return
	 * @param <mixed> def - the default value to return if the key isn't present in the local store. Defaults to null.
	 * @return - the value of the key in the local store, or default if it isn't present.
	 */
	, get: function(key, def) {
		var value = GM_getValue(this.getKey(key), null);
		if (null !== value && typeof(value) === 'string') { // Was set in localStorage and looks like it might be JSON.parse-able
			try {
				return JSON.parse(value);
			} catch(err) {
				// do nothing, drop through to pass back the default.
			}
		}
		// Return the default
		return (typeof(def) === 'undefined') ? null : def;
	}

	/**
	 * Sets the given string into Firefox's local storage.
	 *
	 * @param <string> key - the name of the key to store this under
	 * @param Array|String|Integer|Boolean value - the value of the string to store. NOTE: This MUST be JSON'izeable, i.e. Objects that don't
	 *                  have toString methods are not supported.
	 * @return void
	 */
	, set: function(key, value) {
		GM_setValue(this.getKey(key), JSON.stringify(value));
	}

	/**
	 * Removes a locally stored string from Firefox's local storage
	 *
	 * @param <string> key - the name of the key to remove
	 * @return void
	 */
	, remove: function(key, value) {
		GM_setValue(this.getKey(key), null);
	}
};

/**
 * ----------------------------------
 * Util
 * ----------------------------------
 * Various utility functions related to the DOM and manipulating elements
 */
Util = {
	/**
	 * @param DOM img - DOM IMG element
	 * @return Boolean - true if this IMG element is an emoticon.
	 */
	isEmoticon: function(img) {
		var re = new RegExp('(/forumsystem/emoticons/|/images/smilies/|/safs/smilies/)');
		return img.src && re.test(img.src);
	}

	/**
	 * Returns an array of DOM elements that match a given XPath expression.
	 *
	 * @param path string - Xpath expression to search for
	 * @param from DOM Element - DOM element to search under. If not specified, document is used
	 * @return Array - Array of selected nodes (if any)
	 */
	, getNodes: function(path, from) {
		from = from || document;
		var item, ret = [];
		var iterator = document.evaluate(path, from, null, XPathResult.ANY_TYPE, null);
		while(item = iterator.iterateNext()) {
			ret.push(item);
		}
		return ret;
	}

	/**
	 * Deletes a DOM element
	 * @param DOM element - DOM element to remove
	 * @return DOM element - the removed element
	 */
	, removeElement: function(element) {
		return element.parentNode.removeChild(element);
	}

	/**
	 * Binds an event handler function to an object context, so that the handler can be executed as if it
	 * was called using "this.<methodname>(event)", i.e. it can use "this.foo" inside it.
	 *
	 * @param function method - a function to execute as an event handler
	 * @param Object context - the object that will be used as context for the function, as if the function had been
	 *          called as context.method(event);
	 * @return function - the function to pass to addEventListener
	 */
	, bindAsEventHandler: function(method, context) {
		var __method = method;
		return function (event) {
			return __method.apply(context, [event]);
		}
	}

	/**
	 * Examines a childnode of an object and returns its "type". This type is used to determine whether it's
	 * whitespace or another type that requires different processing. "Whitespace" means:
	 * - TextContent that is just whitespace (\n, \t, space, etc)
	 * - A comment node or other non-tag
	 * - <BR> tag
	 *
	 * The return string will be one of:
	 * - 'whitespace' (whitespace TextNode, comment node)
	 * - 'text' (text content, etc)
	 * - 'quote' (means a DIV containing a blockquote)
	 * - 'edit' (The <P> "edited by..." at the end of a post)
	 * - 'link' (<A>)
	 * - 'image' (<IMG> (not an emoticon))
	 * - 'emoticon' (<IMG>)
	 * - 'br' (<br>)
	 * @param Object node - the child node to check
	 * @return string - the node type (see above).
	 */
	, getNodeType: function(node, debug) {
		if(typeof(node.isElementContentWhitespace) !== "undefined") {
			// This is a TextContent Node
			if(node.isElementContentWhitespace) {
				return 'whitespace';
			}
			return 'text';
		}

		if(typeof(node.tagName) !== "undefined") {
			switch(node.tagName) {
			case 'P':
				return 'edit';  // This is the "Edited by" paragraph.

			case 'DIV':
				// Probably a block quote
				if(node.firstElementChild
						&& node.firstElementChild.nextElementSibling
						&& node.firstElementChild.nextElementSibling.tagName === 'BLOCKQUOTE') {
					return 'quote';
				}
				return 'text2';

			case 'BR':
				return 'br';

			case 'IMG':
				return Util.isEmoticon(node) ? 'emoticon' : 'image';

			case 'A':
				return 'link';
			}
		} else if(node.nodeName && (node.nodeName === '#comment' || (node.nodeName == "#text" && /^\s*$/.test(node.textContent)))) {
			return 'whitespace';
		}
		return 'text'; // Unknown node type or tagName, assume it's text.
	}

	/**
	 * removes leading and trailing whitespace from a post.
	 * @param element - a postbody or blockquote inside a quote
	 * @return boolean - true if any part of the post was altered
	 */
	, trimWhitespace: function (el) {
		var cn = el.childNodes;
		var j, i = cn.length;
		var all_whitespace_re = /^\s+$/;
		var node_type, remove_ids = [];
		var post_altered = false;

		// First trim the end
		while(i--) {
			node_type = this.getNodeType(cn[i]);
			if(node_type === 'br' || node_type === 'whitespace') {
				remove_ids.unshift(i);
			} else if(node_type === 'edit') {
				//ignore
			} else {
				// Text or some other type.
				break;
			}
		}

		// Now trim from the beginning
		for(j = 0; j < i && j < cn.length; j++) {
			node_type = this.getNodeType(cn[i]);
			if(node_type === 'br' || node_type === 'whitespace') {
				remove_ids.unshift(j);
			} else if(node_type === 'edit') {
				//ignore
			} else {
				// Text or some other type.
				break;
			}
		}

		if(remove_ids.length) {
			post_altered = true;
		}
		while(remove_ids.length) {
			this.removeElement(cn[remove_ids.pop()]);
		}

		// Now we look for too many <br> tags in a row. Max allowed is 3.
		i = cn.length;
		var cnt = 0;
		var in_br = false;
		remove_ids = [];
		while(i--) {
			node_type = Util.getNodeType(cn[i]);
			if(node_type === 'br') {
				cnt++;
				in_br = true;
			}
			if(in_br) {
				if(node_type === 'whitespace' || node_type === 'br') {
					if(cnt >= 3) {
						remove_ids.push(i);
					}
				} else {
					in_br = false;
					cnt = 0;
				}
			}
		}

		if(remove_ids.length) {
			post_altered = true;
		}
		while(remove_ids.length) {
			Util.removeElement(cn[remove_ids.shift()]);
		}
		return post_altered;
	}
};

/**
 * ----------------------------------
 * Prefs
 * ----------------------------------
 * Handles preference information
 */
Prefs = {
	// boolean - Is hellbanning currently enabled?
	is_hellbanning_enabled: false

	// array - list of thread_ids that are considered image threads
	, image_threads: []

	// Boolean - are lowcontent posts filtered?
	, lowcontentposts_filtering_enabled: false

	// Boolean - are avatars enabled?
	, avatars_enabled: true

	// Boolean - Is the ThreadView streamlined?
	, streamline_enabled: false

	/**
	 * Adds a thread to the list of those considered "Image threads" (primarily about images)
	 * @param integer thread_id
	 */
	, addImageThread: function(thread_id) {
		this.image_threads.push(thread_id);
	}

	/**
	 * Removes a thread from the list of those considered "Image threads"
	 * @param integer thread_id
	 */
	, removeImageThread: function(thread_id) {
		var i = this.image_threads.length;
		while(i--) {
			if(this.image_threads[i] === thread_id) {
				this.image_threads.splice(i, 1);
				break;
			}
		}
	}

	/**
	 * @param integer thread_id - The ID of the thread
	 * @return Boolean - true if the given thread_id is considered an image thread (primarily for the posting of images)
	 */
	, isImageThread: function(thread_id) {
		var i = this.image_threads.length;
		while(i--) {
			if(Prefs.image_threads[i] === thread_id) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Loads the preferences for this page type into a global variable.
	 */
	, loadPrefs: function() {
		Users.initialize(LocalStorage.get('users', []));

		this.is_hellbanning_enabled = LocalStorage.get('hellbanning_enabled', false);
		this.lowcontentposts_filtering_enabled = LocalStorage.get('lowcontentposts_filtered', false);
		this.avatars_enabled = LocalStorage.get('avatars_enabled', true);
		this.streamline_enabled =  LocalStorage.get('streamline_enabled', false);
		this.image_threads = LocalStorage.get('image_threads', []);
	}

	/**
	 * Serializes and persists the global prefs
	 */
	, saveHellbanPrefs: function () {
		LocalStorage.set('users', Users.users);
		LocalStorage.set('hellbanning_enabled', this.is_hellbanning_enabled);
	}
	, saveLowContentPostsPrefs: function() {
		LocalStorage.set('lowcontentposts_filtered', this.lowcontentposts_filtering_enabled);
	}
	, saveAvatarPrefs: function() {
		LocalStorage.set('avatars_enabled', this.avatars_enabled);
	}
	, saveStreamlinePrefs: function() {
		LocalStorage.set('streamline_enabled', this.streamline_enabled);
	}
	, saveImageThreadPrefs: function() {
		LocalStorage.set('image_threads', this.image_threads);
	}
};

/**
 * Methods related to the current page, regardless of the page's function.
 * E.g. which forum we're in, determining the page handler, etc.
 */
Page = {
	// string - the handler for the type of page we're looking at. Refers to one of the ThreadList, ThreadView objects.
	page_handler: null

	// integer - forum_id we're currently looking at
	, forum_id: null

	// string - the name of the forum we're currently looking at
	, forum_name: null

	/**
	* Is the current Forum we're looking at Ask/Tell?
	*/
	, forumIsAskTell: function() {
		return (this.forum_id === 158);
	}

	/**
	* Is the current Forum we're looking at FYAD?
	*/
	, forumIsFyad: function() {
		return (this.forum_id === 26);
	}

	/**
	* Is the current Forum we're looking at the FYAD Goldmine?
	*/
	, forumIsFyadGoldmine: function() {
		return (this.forum_id === 115);
	}

	/**
	* Called at the beginning of the page. Loads global preferences and initializes various attributes
	*/
	, init: function() {
		Prefs.loadPrefs();

		// Determine the page type
		var url = window.location.href;
		if(/forumdisplay\.php/.test(url)) {
			this.page_handler = ThreadList;
		} else if(/showthread\.php/.test(url)) {
			this.page_handler = ThreadView;
		} else if(/(usercp|bookmarkthreads)\.php/.test(url)) {
			this.page_handler = UserControlPanel;
		} else if(/newreply\.php/.test(url)) {
			this.page_handler = ThreadReply;
		} else if(/private\.php.*action=newmessage/.test(url)) {
			this.page_handler = PrivateMessageEntry;
		} else if(/newthread\.php/.test(url)) {
			this.page_handler = NewThread;
		}
	
		if(this.page_handler === null) {
			return;
		}
   
		this.determineForum();
		this.page_handler.handle();
	}

	/**
	* parses the page to determine the ID/Name of the forum we're looking at
	*/
	, determineForum: function() {
		var links = Util.getNodes('.//div[@class="breadcrumbs"]//a');
		for(var i = 0; i < links.length; i++) {
			var r = links[i].href.match(/forumid=([0-9]+)/);
			if(r !== null) {
				this.forum_id = parseInt(r[1]);
				this.forum_name = links[i].textContent;
			}
		}
	}

	/**
	* Builds the configuration UI.
	*/
	, addConfigUi: function (rows, show_hidden_count) {
		rows = rows || [];
		var div = document.createElement('div');
		div.id = "SAplusplus_config";

		// add global rows
		rows.unshift('<input type="checkbox" id="hellban_enabled"> Hide threads, posts and quotes from hellbanned users.' +
			' <a href="javascript:void(0);" id="view_hb_users">View hellbanned users</a>');
    
		// Render rows
		var out = '';
		for(var i = 0; i < rows.length; i++) {
			out += '<tr style="display:none"><td colspan="2">' + rows[i] + '</td></tr>';
		}
		div.innerHTML = '<table class="standard" id="SApp_prefs_table" style="min-width:600px"><tbody>' +
			'<tr>' +
			'<th style="width:50%">SA++ preferences <a href="javascript:void(0);" id="SApp_prefs" style="color:white">Edit</a></th>' +
			'<th>' + (show_hidden_count ? 'Currently hiding <span id="num_blocked_elements">x</span>' : '') + '</th>' +
			'</tr>' +
			out +
			'</tbody></table>';
		document.getElementById('container').insertBefore(div, document.getElementById('copyright'));

		// initialize the global preferences
		document.getElementById('SApp_prefs').addEventListener('click', Util.bindAsEventHandler(this.showPrefsHandler, this), false);

		var checkbox = document.getElementById('hellban_enabled');
		checkbox.checked = Prefs.is_hellbanning_enabled;
		checkbox.addEventListener('click', Util.bindAsEventHandler(this.hellbanToggleHandler, this), false);
		document.getElementById('view_hb_users').addEventListener('click', Util.bindAsEventHandler(this.manageHellbanUsersHandler, this), false);
	}

	/**
	* Handler called when the user clicks the "Edit prefs" button.
	* Shows the preferences and removes the edit link
	*/
	, showPrefsHandler: function(e) {
		Util.removeElement(document.getElementById('SApp_prefs')); // Remove link so the user can't click it again.
		var rows = Util.getNodes('.//tr', document.getElementById('SApp_prefs_table'));
		var i = rows.length;
		while(i--) {
			rows[i].style.display = "";
		}
	}

	/**
	* Change the "<" / ">" buttons to "Prev" / "Next" to give a bigger click target
	*/
	, fixPrevNextButtons: function(class_name) {
		var n = Util.getNodes('.//div[@class="' + class_name + '"]');
		if(n.length === 0 || !n[0].firstElementChild) {
			return;
		}
		n = n[0];
		n.firstElementChild.innerHTML = "« First";
		n.firstElementChild.nextElementSibling.innerHTML = "‹ Prev";
		n.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML = "Next ›";
		var last = n.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling;
		var pagenumber = last.textContent.match(/\d+/)[0];
		last.innerHTML = "Last (" + pagenumber + ") »";
	}

	/**
	* Event handler for when user clicks the Hellban enable checkbox.
	*/
	, hellbanToggleHandler: function(e) {
		var new_hbe = e.target.checked;
		if(new_hbe != Prefs.is_hellbanning_enabled) {
			Prefs.is_hellbanning_enabled = new_hbe;
			Prefs.saveHellbanPrefs();
			this.page_handler.refresh();
		}
	}

	/**
	* Event handler for when user clicks the "View Hellban Users" link
	*/
	, manageHellbanUsersHandler: function(e) {
		var link = document.getElementById('view_hb_users');
		// Build the table listing all the currently hellbanned users    
		var div = document.createElement('div');
		div.style.paddingLeft = "4em";
		div.style.paddingTop = "1em";

		var out = '', cnt = 0, i = Users.users.length;
		while(i--) {
			u = Users.users[i];
			if(u.isHellbanned) {
				out += '<tr id="unhellbanrow' + u.id + '">' +
					'<td><a href="http://forums.somethingawful.com/member.php?action=getinfo&userid=' + u.id + '">' + u.name + '</a></td>' +
					'<td>' + u.id + '</td>' +
					'<td><a href="javascript:void(0);" id="unhellban' + u.id + '">Unhellban</a></td>' +
					'</tr>';
				cnt++;
			}
		}
		if(cnt === 0) {
			out = '<tr><td colspan="3">No users are hellbanned.</td></tr>';
		}
		div.innerHTML = '<table class="standard"><tbody>' +
			'<tr><th>User name</th><th>User ID</th><th></th>' +
			out +
			'</tbody></table>';

		link.parentNode.insertBefore(div, link);
		// Remove the link so they can't click it again
		Util.removeElement(link);

		// Now that the elements have been created, add handlers for all those links
		i = Users.users.length;
		while(i--) {
			u = Users.users[i];
			if(u.isHellbanned) {
				document.getElementById('unhellban' + u.id).addEventListener('click', Util.bindAsEventHandler(this.unbanUser, this), false);
			}
		}
	}

	/**
	* Called when the user clicks the "unban" link
	*/
	, unbanUser: function(e) {
		var user_id = parseInt(e.target.id.substr(9));
		Util.removeElement(document.getElementById('unhellbanrow' + user_id));
		if(Users.isHellbanned(user_id)) {
			var u = Users.getUser(user_id);
			u.isHellbanned = false;
			Prefs.saveHellbanPrefs();
		}
	}
};

/**
 * ----------------------------------
 * Users
 * ----------------------------------
 * Stores the list of User objects, and provides functions to manipulate them
 */
Users = {
	/**
	* Array - list of allowed preference names for users
	*/
	pref_names: ['isHellbanned']

	/**
	* Array - array of User objects, from preferences
	*/
	, users: []

	/**
	* Initializes the array of users, using the serialized value from the preferences.
	*/
	, initialize: function (prefs) {
		this.users = [];
		var user_array = prefs;
		var i = user_array.length;
		while(i--) {
			var user_obj = user_array[i];
			var user = new User(user_obj.id, user_obj.name);

			// Only copy over properties we know about
			var j = this.pref_names.length;
			while(j--) {
				var name = this.pref_names[j];
				if(typeof(user_obj[name]) !== "undefined") {
					user[name] = user_obj[name];
				}
			}
			this.users.push(user);
		}
	}

	/**
	* @param integer|String id - the User ID or the User Name of the author to check
	* @return Boolean - true if the given author ID is currently listed as "hellbanned".
	*/
	, isHellbanned: function(id) {
		var u = this.getUser(id);
		if(u === null) {
			return false;
		}
		return u.isHellbanned;
	}

	/**
	* @param integer|string user_id - The user ID or user name to search for
	* @return User|null - Returns a User object for the given author_id. Null if it doesn't exist;
	*/
	, getUser: function (id) {
		var i = this.users.length;
		while(i--) {
			var u = this.users[i];
			if((typeof(id) === "number" && u.id == id) || (typeof(id) === "string" && u.name == id)) {
				return u;
			}
		}
		return null;
	}

	/**
	* Returns a User object for the given author_id. Creates it if it doesn't already exist;
	* @param integer user_id - The user ID to search for
	* @param string name - The name of the user to get. Used when creating the User.
	* @return User
	*/
	, getOrCreateUser: function (user_id, name) {
		var user = this.getUser(user_id);
		if(user === null) {
			user = new User(user_id, name);
			this.users.push(user);
		}
		return user;
	}
};

/**
 * ----------------------------------
 * ThreadList
 * ----------------------------------
 * Contains function that deal with the Thread List page (the one that shows a list of threads)
 */
ThreadList= {
	threads: []                      // List of Thread objects in the Thread List page

	/**
	* Parses the Thread List page to build the array of Threads, so that they can be more easily manipulated.
	*/
	, buildThreadList: function() {
		this.threads = [];
		var thread_re = /^thread([0-9]+)$/;
		var author_id_re = /userid=([0-9]+)/;
		var vote_re = new RegExp('^(\\d+) votes - ([.\\d]+) average$');

		var rows = Util.getNodes('.//table[@id="forum"]/tbody/tr');
		for(var i = 0; i < rows.length; i++) {
			row = rows[i];
			var id = (row.id) ? parseInt(row.id.match(thread_re)[1]) : null;
			var author_node = Util.getNodes('.//td[@class="author"]', row)[0];
			if(!author_node.firstChild) {
				continue;
			}
			var author_name = author_node.firstChild.textContent;
			var author_id = parseInt(author_node.firstChild.href.match(author_id_re)[1]);

			// Determine this thread's rating
			var num_votes = 0;
			var rating = 0;
			var rating_img = Util.getNodes('.//td[@class="rating"]//img', row)[0];
			if(rating_img) {
				var res = rating_img.title.match(vote_re);
				num_votes = parseInt(res[1]);
				rating = parseFloat(res[2]);
			}

			var thread = new Thread(id, row, author_name, author_id, rating_img, num_votes, rating);
			this.threads.push(thread);
		}
	}

	/**
	* Called whenever the hellban preference changes.
	* Shows/hides each thread depending on hellbanned status
	* @return Boolean - true if refreshing caused any threads to be hidden
	*/
	, refresh: function() {
		var num_hidden_threads = 0;
		var i = this.threads.length;
		while(i--) {
			var thread = this.threads[i];
			if(!Prefs.is_hellbanning_enabled) {
				thread.showHide(true);
				continue;
			}
			if(Users.isHellbanned(thread.author_id)) {
				num_hidden_threads++;
			}
			thread.showHide(!Users.isHellbanned(thread.author_id));
		}
		document.getElementById('num_blocked_elements').innerHTML = num_hidden_threads + " threads";
		return (num_hidden_threads > 0);
	}

	/**
	* In forums such as FYAD, the minimum number of ratings required to show the ratings image is very low which
	* makes it hard to find worthwhile threads. This function will hide the ratings image in threads that don't
	* have enough votes.
	*/
	, fixUpRatings: function() {
		var i = this.threads.length;
		while(i--) {
			var t = this.threads[i];
			if(t.num_votes <= 5 && t.vote_img) {
				t.vote_img.style.display = "none";
			}
		}
	}

	/**
	* Moves the ratings column over to the left of the thread title, to make it easier to see a thread's rating.
	*/
	, moveRatings: function() {
		var forum_table = document.getElementById('forum');

		var title_idx = 2;
		var rating_idx = 6;
		if(Page.forumIsAskTell()) { // Ask/Tell has an extra column
			title_idx++;
			rating_idx++;
		}

		// Move the header
		var tr = Util.getNodes('.//tr', forum_table)[0];
		title = tr.children[title_idx];
		rating = tr.children[rating_idx];
		title.parentNode.insertBefore(Util.removeElement(rating), title);

		// Move the thread columns
		var i = this.threads.length;
		while(i--) {
			var t = this.threads[i];
			title = t.row.children[title_idx];
			rating = t.row.children[rating_idx];
			title.parentNode.insertBefore(Util.removeElement(rating), title);
		}
	}

	/**
	* Run from main. This is where the page is adjusted as it sees fit.
	*/
	, handle: function () {
		this.buildThreadList();
  
		Page.fixPrevNextButtons("pages");
		Page.fixPrevNextButtons("pages bottom");
		this.fixUpRatings();
		this.moveRatings();

		Page.addConfigUi([], true);

		this.refresh();
	}
};

/**
 * ----------------------------------
 * ThreadView
 * ----------------------------------
 * Deals with the Thread View page (the one that shows posts)
 */
ThreadView = {
	/**
	 * List of Post objects in the Thread View page
	 */
	posts: []

	/**
	 * integer - this thread's ID
	 */
	, thread_id: null

	/**
	 * integer - Thread ID of the "PYF SA Quotes"
	 */
	, quotes_thread_id: 3538112
	
	/**
	* Adds the UI to each post that allows the user to manipulate this post/poster
	*/
	, addPerPostUi: function() {
		var i = this.posts.length;
		while(i--) {
			var p = this.posts[i];
			$('<li></li>')
				.html('<a id="postindex' + i + '" href="javascript:void(0)">'
					+ (Users.isHellbanned(p.author_id) ? "<b>Unhellban</b>" : "Hellban")
					+ '</a>')
				.on('click', Util.bindAsEventHandler(this.toggleHellbanHandler, this))
				.appendTo($('ul.profilelinks', p.table));
		}  
	}

	/**
	* Event handler for when the user clicks on the link to ban/unban someone
	* @param Event e - the click target
	*/
	, toggleHellbanHandler: function (e) {
		var p = this.posts[parseInt(e.target.id.substr(9))];
		var ok;
		var hb = Users.isHellbanned(p.author_id);
		if(hb) {
			ok = confirm("Unban '" + p.author_name + "'?");
		} else {
			ok = confirm("Hide all posts and quotes by " + p.author_name + "?");
		}
		if(!ok) {
			return;
		}
		var u = Users.getOrCreateUser(p.author_id, p.author_name);
		u.isHellbanned = !hb;
		Prefs.saveHellbanPrefs();
		this.refresh();
	}

	/**
	 * Parses the Thread View page to build the array of Posts, so that they can be more easily manipulated.
	 */
	, buildPostList: function() {
		this.posts = [];
		var post_tables = Util.getNodes('.//div[@id="thread"]/table');
		for(var i = 0; i < post_tables.length; i++) {
			this.posts.push(this.parsePost(post_tables[i]));
		}
	}

	/**
	 * @param table - the DOM <table> element that contains a post
	 * @return Post - a new Post object that contains information about that post
	 */
	, parsePost: function(table) {
		var author_id, postbody, author_name, name_node;
		var post_id_re = /^post(\d+)$/;
		var user_id_re = /userid-(\d+)/;
		var post_id = (table.id && post_id_re.test(table.id)) ? parseInt(table.id.match(post_id_re)[1]) : '';

		var td = Util.getNodes('.//td', table)[0];
			// Find author ID, author_name node and postbody
		if(Page.forumIsFyad() || Page.forumIsFyadGoldmine()) {
			var uinfo = td.firstElementChild.nextElementSibling;
			author_id = parseInt(uinfo.className.match(user_id_re)[1]);
			postbody = td.firstElementChild;
			name_node = uinfo.firstElementChild.firstElementChild.nextElementSibling;
		} else {
			author_id = parseInt(td.className.match(user_id_re)[1]);
			postbody = td.nextElementSibling;
			if(postbody.firstElementChild
				&& postbody.firstElementChild.tagName === "DIV"
				&& postbody.firstElementChild.className === "cancerous") {
					postbody = postbody.firstElementChild;
			}
			name_node = td.firstElementChild.firstElementChild;
		}
		
		// Parse author name
		if(name_node.firstChild && name_node.firstChild.tagName === "IMG") { // Deal with Moderator stars
			author_name = name_node.childNodes[1].textContent.replace(/^\s+/, "");
		} else {
			author_name = name_node.firstChild.textContent;
		}
		return new Post(table, postbody, post_id, author_name, author_id);
	}

	/**
	 * Called whenever the hellban preference changes
	 * Examines each post and decide whether to show/hide it.
	 * @return Boolean - true if refreshing caused any posts to be hidden
	 */
	, refresh: function() {
		var num_hidden_posts = 0;
		var posts_changed = false;
		var is_image_thread = Prefs.isImageThread(this.thread_id);
		var is_quotes_thread = (this.thread_id === this.quotes_thread_id);
		for(var i = 0; i < this.posts.length; i++) {
			var is_visible = this.posts[i].isVisible(is_image_thread, is_quotes_thread);
			posts_changed |= this.posts[i].showHide(is_visible);
			if(!is_visible) {
				num_hidden_posts++;
			}
		}
		if(posts_changed) {
			this.restripePosts();
		}
		$('#num_blocked_elements').html(num_hidden_posts + " posts");
		return (posts_changed);
	}

	/**
	* Re-adjust the seen/unseen CSS so that the alternating post coloring isn't affected by invisible posts
	*/
	, restripePosts: function () {
		var toggle = 1;
		var base_class_name = 'seen';

		for(var i = 0, j = this.posts.length; i < j ; i++) {
			if(!this.posts[i].visible) {
				continue;
			}
			var post = this.posts[i].table;
			var tr = post.firstElementChild.firstElementChild;
			if(tr.className.indexOf('altcolor') === 0) {
				base_class_name = 'altcolor';
			}
			var new_class_name = base_class_name + toggle;
			if(tr.className != new_class_name) {
				tr.className = new_class_name;
				if(tr.nextElementSibling) {
					tr.nextElementSibling.className = new_class_name;
				}
			}
			toggle ^= 3; // Toggle between 1 and 2
		}
	}

	/**
	* Adds the image filename to the images title so that it can be easily viewed by mousing over it.
	* This is useful for when a punchline or other useful info is
	* hidden within the filename.
	*/
	, showImageFilename: function() {
		var imgs = Util.getNodes('.//img');
		var re = new RegExp('/([^/]+)$'); // Get the characters after the last forward slash
		var i = imgs.length;
		while(i--) {
			if(!imgs[i].title) {
				imgs[i].title = imgs[i].src.match(re)[1];
			}
		}
	}

	/**
	* Strips images from quotes.
	* @param integer max_num - The maximum number of images allowed in a quote (removes from the end of the post)
	*/
	, removeImagesFromQuotes: function(max_num) {
		var p, i, j, k, nodes, skip, images, images_removed;
		i = this.posts.length;
		while(i--) {
			p = this.posts[i];
			nodes = p.getQuotes();
			j = nodes.length;
			while(j--) {
				skip = max_num;
				images = Util.getNodes('.//img', nodes[j]);
				images_removed = false;
				for(k = 0; k < images.length; k++) {
					if(!Util.isEmoticon(images[k])) {
						if(skip) {
							skip--;
						} else {
							Util.removeElement(images[k]);
							images_removed = true;
						}
					}
				}
			}
			if(images_removed) {
				p.trimWhitespace();
			}
		}
	}

	/**
	* Strips a page of the information/links line beneath each post, and the User's regdate
	*/
	, removePostInfo: function() {
		var nodes = Util.getNodes('.//td[@class="postdate"]');
		var i = nodes.length;
		while(i--) {
			Util.removeElement(nodes[i].parentNode);
		}

		nodes = Util.getNodes('.//dl[@class="userinfo"]/dd[@class="registered"]');
		i = nodes.length;
		while(i--) {
			Util.removeElement(nodes[i]);
		}
	}

	/**
	* Strips each post of the "Edited by..." paragraph
	*/
	, removeEditedBy: function() {
		var nodes = Util.getNodes('.//p[@class="editedby"]');
		var i = nodes.length;
		while(i--) {
			Util.removeElement(nodes[i]);
		}
	}

	/**
	* Strips a page of custom titles.
	*/
	, removeAvatars: function() {
		var nodes = Util.getNodes('.//dl[@class="userinfo"]/dd[@class="title"]');
		var i = nodes.length;
		while(i--) {
			Util.removeElement(nodes[i]);
		}
	}

	/**
	* Removes many elements from the page in an effort to make it easier to skimread the thread.
	* TODO: collapse large quotes.
	*/
	, streamlinePage: function() {
		this.removeAvatars();
		this.removePostInfo();
		this.removeEditedBy();
		this.removeImagesFromQuotes(0);
		var i = this.posts.length;
		while(i--) {
			this.posts[i].trimWhitespace();
		}
	}

	/**
	* Add title/body rows to the configuration UI.
	* @param rows Array - Array of config rows that will be on every page
	*/
	, getUiRows: function () {
		return [
			'<input type="checkbox" id="image_thread"> Hide non-image posts in this thread (preference is stored per-thread).'

			, '<input type="checkbox" id="low_content_posts"> Hide posts with no text or images.'

			, '<input type="checkbox" id="hide_avatars"> Hide avatars and custom titles. ' +
				'<span id="avatars_warning" style="color:red; display:none">Refresh the page to see avatars</span>'

			, '<input type="checkbox" id="streamline_enabled"> Strip out extraneous content for quick thread skimming. ' +
				'<span id="streamline_warning" style="color:red; display:none">Refresh the page to re-display content</span>'
		];
	}

	/**
	* Called from Page.buildConfigUi once the UI has been displayed. This is where we initialize the
	* widget values and attach event handlers.
	*/
	, initConfigUi: function() {
		var cb = document.getElementById('image_thread');
		cb.checked = Prefs.isImageThread(this.thread_id);
		cb.addEventListener('click', Util.bindAsEventHandler(this.imageThreadHandler, this), false);

		cb = document.getElementById('low_content_posts');
		cb.checked = Prefs.lowcontentposts_filtering_enabled;
		cb.addEventListener('click', Util.bindAsEventHandler(this.lowContentPostsHandler, this), false);

		cb = document.getElementById('hide_avatars');
		cb.checked = !Prefs.avatars_enabled;
		cb.addEventListener('click', Util.bindAsEventHandler(this.hideAvatarsHandler, this), false);

		cb = document.getElementById('streamline_enabled');
		cb.checked = Prefs.streamline_enabled;
		cb.addEventListener('click', Util.bindAsEventHandler(this.streamlineHandler, this), false);
	}

	/**
	* Event handler for when user clicks the Image Thread enable checkbox.
	*/
	, imageThreadHandler: function(e) {
		var new_value = e.target.checked;
		var in_list = Prefs.isImageThread(this.thread_id);
		if(new_value && !in_list) {
			Prefs.addImageThread(this.thread_id);
		} else if(!new_value && in_list) {
			Prefs.removeImageThread(this.thread_id);
		}
		if(new_value != in_list) {
			Prefs.saveImageThreadPrefs();
			this.refresh();
		}
	}

	/**
	* Event handler for when user clicks the Low Content Posts filter checkbox.
	*/
	, lowContentPostsHandler: function(e) {
		Prefs.lowcontentposts_filtering_enabled = e.target.checked;
		Prefs.saveLowContentPostsPrefs();
		this.refresh();
	}

	/**
	* Event handler for when user clicks the "Hide Avatars" filter checkbox.
	*/
	, hideAvatarsHandler: function(e) {
		Prefs.avatars_enabled = !e.target.checked;
		if(Prefs.avatars_enabled) {
			// It was previously disabled, which means avatars were stripped. They won't see the avatars until they refresh
			// so warn them.
			$('#avatars_warning').show();
		} else {
			this.removeAvatars();
		}
		Prefs.saveAvatarPrefs();
	}

	/**
	* Event handler for when user clicks the "Streamline page" filter checkbox.
	*/
	, streamlineHandler: function(e) {
		Prefs.streamline_enabled = e.target.checked;
		if(Prefs.streamline_enabled) {
			this.streamlinePage();
		} else {
			// It was previously enabled, which means posts were streamlined. They won't see the stripped content until they refresh
			// so warn them.
			$('#streamline_warning').show();
		}
		Prefs.saveStreamlinePrefs();
	}
	
	/**
	* The currently highlighted Post
	*/
	, highlightedPost: null
	/**
	* Event handler for when the window URL's hash function changes
	* Note: This is also called once when the page inits, so don't use the 'event' parameter.
	*/
	, hashChangeHandler: function(event) {
	    var hash = window.location.hash;
		if(!(/#post\d+/.test(hash))) {
			return;
		}
		var post_id = parseInt(hash.substr(5));
		if(this.highlightedPost !== null) {
			this.highlightedPost.highlight(false);
		}
		for(var i = 0, l = this.posts.length; i < l; i++) {
			if(this.posts[i].post_id === post_id) {
				this.highlightedPost = this.posts[i];
				this.highlightedPost.highlight(true);
				break;
			}
		}
	}
	
	, calculateQuoteCount: function() {
		var post_re = /#post(\d+)$/;
		var post_id_counts = {}; // map of post_id -> number of times quoted

		for(var i = 0; i < this.posts.length; i++) {
			var nodes = this.posts[i].postbody.childNodes;
			for(var j = 0, len = nodes.length; j < len; j++) {
				if(Util.getNodeType(nodes[j]) === 'quote') {
					// Once we've found a quote, attempt to find the ID of the post it's quoting
					var a = $('a', nodes[j]);
					if(a.length) {
						var res = a.attr('href').match(post_re);
						if(res) {
							// Increment the count for that post_id
							var post_id = res[1];
							if(post_id_counts[post_id] === undefined) {
								post_id_counts[post_id] = 0;
							}
							post_id_counts[post_id]++;
						}
					}
				}
			}
		}
		
		for(var i = 0; i < this.posts.length; i++) {
			var p = this.posts[i];
			var count = post_id_counts[p.post_id.toString()];
			if(count > 1) {	// Needs at least 2 quotes for this to be useful.
				$('<li></li>')
					.html('<img src="http://i.somethingawful.com/forumsystem/emoticons/emot-h.png"> ' + count)
					.appendTo($('ul.profilelinks', p.table));
			}
		}
	}

	/**
	* Run by Page once, immediately after the page loads.
	*/
	, handle: function () {
		this.thread_id = parseInt(/threadid=([0-9]+)/.exec(window.location)[1]);
		this.buildPostList();

		Page.addConfigUi(this.getUiRows(), true);
		this.initConfigUi();

		var page_changed = false;
		this.showImageFilename();
		Page.fixPrevNextButtons("pages top");
		Page.fixPrevNextButtons("pages bottom");
		page_changed |= this.removeImagesFromQuotes(3);

		this.addPerPostUi(); // i.e. add Hellban button
		
		this.calculateQuoteCount();
		
		if(Prefs.is_hellbanning_enabled) {
			for(var i = 0; i < this.posts.length; i++) {
				page_changed |= this.posts[i].stripHellbannedQuotes();
			}
		}

		if(!Prefs.avatars_enabled) {
			this.removeAvatars();
			page_changed = true;
		}

		if(Prefs.streamline_enabled) {
			this.streamlinePage();
		}

		page_changed |= this.refresh();
		
		$(window).on('hashchange', $.proxy(this.hashChangeHandler, this));
		this.hashChangeHandler(); // highlight the anchored post, if there is one.

		if(page_changed) {
			//re-anchor to the hash since the page will have jiggled about with all this element removing.
	        if(window.location.hash) {
				var post = $(window.location.hash);
				if(post.length) {
					var coords = post.offset();
					$("html,body").animate({
						scrollTop: coords.top,
						scrollLeft: coords.left
					});
				}
			}
		}
	}
};

/**
 * ----------------------------------
 * UserControlPanel
 * ----------------------------------
 * Contain functions that handle the forum's User Control Panel page
 */
UserControlPanel = {
	/**
	* Adds a button to the control panel that will open all threads in new tabs when clicked
	*/
	initOpenAllUnread: function() {
		var title = Util.getNodes('.//th[@class="title"]')[0];
		var e = document.createElement('a');
		e.href = "javascript:void(0)";
		e.id = "openall";
		e.style.cssFloat = "right";
		e.style.fontSize = '12px';
		e.style.background = '#F7F7F7';
		e.style.padding = '2px';
		e.style.border = '1px solid #D5D5D5';
		e.style.textShadow = '0px 0px 0px';
		e.style.color = '#555';
		e.style.cursor = 'pointer';
		e.style.textDecoration = "none";
		e.innerHTML = 'Open unread threads into new tabs';

		title.insertBefore(e, title.firstChild);
		e.addEventListener('click', Util.bindAsEventHandler(this.handleOpenAllClick, this), false);
	}

	/**
	* Handler for the Open All Unread In New Tabs button. Removes the button and opens the threads.
	*/
	, handleOpenAllClick: function(e) {
		Util.removeElement(document.getElementById("openall"));

		var links = Util.getNodes('.//a[@class="count"]');
		var i = links.length;
		while(i--) {
			GM_openInTab(links[i].href);
		}
	}

	/**
	* Called whenever a preference changes
	*/
	, refresh: function() {
		// Nothing to do
	}

	/**
	* Run from main. This is where the page is adjusted as it sees fit.
	*/
	, handle: function() {
		this.initOpenAllUnread();
		Page.addConfigUi([], false);
	}
};

/**
* ----------------------------------
* NewThread
* ----------------------------------
* For the Reply To Thread page
*/
NewThread = {
	handle: function() {
		Smilies.init();
	}
};

/**
 * ----------------------------------
 * ThreadReply
 * ----------------------------------
 * For the Reply To Thread page
 */
ThreadReply = {
	handle: function() {
		Smilies.init();
	}
};

/**
 * ----------------------------------
 * PrivateMessageEntry
 * ----------------------------------
 * For the New/Reply To Private Message page
 */
PrivateMessageEntry = {
	handle: function() {
		Smilies.init();
	}
};


Smilies = {
	search: function(request, response) {
		var terms = [];
		$(request.term.split(' ')).each(function (x, term) {
			if(term.length) {
				terms.unshift({
					term: term.toLowerCase()
					, regex: new RegExp('^' + $.ui.autocomplete.escapeRegex(term), 'i')
				});
			}
		});
		var results = this.findSmilies(terms);
		results.sort(function(a, b) {
			return (b.relevancy - a.relevancy);
		});

		var resp = [];
		for(var i = 0; i < Math.min(results.length, 12); i++) {
			var item = results[i];
			resp.push({
				label: '<img src="' + item.smiley.url + '">'
				, value: (item.smiley.macro || (':'+item.name+':'))
				});
		};
		if(resp.length === 0) {
			resp.push({
				label: '<i>No results found</i>'
				, value: null
				});
		}
		response(resp);
	}
	, findSmilies: function(terms) {
		var resp = [];
		if(!terms.length) {
			return resp;
		}

		$.each(SmilyData, function (name, data) {
			var relevancy = 0;
			for(var i = 0; i < terms.length; i++) {
				var term = terms[i];
				for(var j = 0; j < data.keys.length; j++) {
					if(term.term === data.keys[j]) {
						relevancy += 5; // An exact match is worth more than a partial match
					} else if(term.regex.test(data.keys[j])) {
						relevancy++;
					}
				}
			}
			if(relevancy) {
				resp.push({
					relevancy: relevancy
					, name: name
					, smiley: data
				});
			}
		});
		return resp;
	}
  
	, init: function() {
		$('a[class="show_bbcode"]')
			.after($('<input style="margin-left: 1em" type="text" name="smiley_ac" id="smiley_ac" value="" placeholder="Enter smiley search terms" size="25">'))
		this.$textarea = $('textarea[name="message"]');
		this.$textarea.blur($.proxy(this.textareaBlur, this));

		this.$searchbox = $("#smiley_ac");
		this.$searchbox
			.on('focus', $.proxy(Smilies.searchFocus, this))
			.autocomplete({
				source: $.proxy(Smilies.search, this)
				, html: true
				, select: $.proxy(Smilies.select,this)
				, close: $.proxy(Smilies.close,this)
			});
	}
	, $textarea: null
	, $searchbox: null
	, selectionStart: null
	, selectionEnd: null
	// Called when the text area receives the blur event
	, textareaBlur: function(event) {
		var ele = this.$textarea[0];
		this.selectionStart = ele.selectionStart;
		this.selectionEnd = ele.selectionEnd;
	}
	// called when the user focuses on the Smiley search box
	, searchFocus: function(event) {
	  this.$searchbox.attr('value', '');
	}
	, select : function(event, item) {
		if(item.item.value === null) {
			return;	// No results found, so ignore this event.
		}
		if(this.selectionStart === null) {
			this.selectionStart = this.selectionEnd = 0;
		}
		// insert the text
		var t = this.$textarea.val();
		var start = t.slice(0, this.selectionStart);
		var end = t.slice(this.selectionEnd);
		this.$textarea.val(start + item.item.value + end);
		this.$textarea[0].selectionStart = this.$textarea[0].selectionEnd = start.length + item.item.value.length;
	}
	, close: function(event) {
		this.$searchbox.attr('value', '');
		if(this.selectionStart === null) {
			return;
		}
		this.$textarea.trigger('focus');
	}
};


// Execution begins here

try {

/*
* jQuery UI Autocomplete HTML Extension
*
* Copyright 2010, Scott González (http://scottgonzalez.com)
* Dual licensed under the MIT or GPL Version 2 licenses.
*
* http://github.com/scottgonzalez/jquery-ui-extensions
*/

(function($) {
var proto = $.ui.autocomplete.prototype,
  initSource = proto._initSource;
  function filter( array, term ) {
    var matcher = new RegExp( $.ui.autocomplete.escapeRegex(term), "i" );
    return $.grep( array, function(value) {
      return matcher.test( $( "<div>" ).html( value.label || value.value || value ).text() );
    });
  }

  $.extend( proto, {
    _initSource: function() {
      if ( this.options.html && $.isArray(this.options.source) ) {
        this.source = function( request, response ) {
          response( filter( this.options.source, request.term ) );
        };
      } else {
        initSource.call( this );
      }
    },

    _renderItem: function( ul, item) {
      return $( "<li></li>" )
        .data( "item.autocomplete", item )
        .append( $( "<a></a>" )[ this.options.html ? "html" : "text" ]( item.label ) )
        .appendTo( ul );
      }
    });
    })( $ );
// -- End autocomplete extension

  Page.init();
} catch (e) {
  console.log(e);
}

SmilyData = {
'frown': {
  keys: ['frown', ':(', 'sad', 'face', 'unhappy']
  , url: 'http://fi.somethingawful.com/images/smilies/frown.gif'
  , macro: ':('
}, 'smile': {
  keys: ['smile', ':)', 'happy', 'face']
  , url: 'http://fi.somethingawful.com/images/smilies/smile.gif'
  , macro: ':)'
}, '3': {
  keys: ['kitty face', '3', 'cute', 'cat', 'face']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-3.gif'
}, 'aaa': {
  keys: ['my mouth is opening oh no', 'aaa', 'what', 'scream', 'amazed', 'gape', 'gaping', 'jawdrop', 'mind', 'blown']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-aaa.gif'
}, 'aaaaa': {
  keys: ['AAAAAAHHHHHHHHH!', 'aaaaa', 'aaa', 'what', 'scream', 'amazed', 'gape', 'gaping', 'jawdrop', 'mind', 'blown']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-aaaaa.gif'
}, 'airquote': {
  keys: ['metaironysarcasm quoting', 'airquote', 'scare', 'quote', 'fingers']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-airquote.gif'
}, 'allears': {
  keys: ['All Ears', 'allears', 'listen', 'adore', 'adoration', 'like', 'love']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-allears.gif'
}, 'angel': {
  keys: ['sop babys', 'angel', 'wings', 'halo', 'face', 'happy', 'innocent']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-angel.gif'
}, 'argh': {
  keys: ['Argh!', 'argh', 'angry', 'mad', 'shake', 'fist', 'red', 'face']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-argh.gif'
}, 'arghfist': {
  keys: ['SO ANGRY', 'arghfist', 'mad', 'angry', 'shake', 'fist']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-arghfist.gif'
}, 'bang': {
  keys: ['Banging head against the wall', 'bang', 'head', 'wall', 'against', 'brick']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-bang.gif'
}, 'banjo': {
  keys: ['Some banjo thing somebody bought for some great reason I suppose', 'banjo', 'south', 'face', 'happy', 'redneck', 'guitar']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-banjo.gif'
}, 'black101': {
  keys: ['Grimm and frostbitten', 'black101', 'metal', 'axe', 'death', 'mad', 'angry', 'face']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-black101.gif'
}, 'blush': {
  keys: ['Oh... heh, I was just...', 'blush', 'pink', 'face', 'sheepish', 'embarrassed', 'embarassed', 'embarrased']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-blush.gif'
}, 'bravo2': {
  keys: ['wordjo', 'bravo2', 'words', 'banjo', 'face', 'guitar']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-bravo2.gif'
}, 'butt': {
  keys: ['butt', 'butt', 'ass', 'arse', 'behind', 'bottom']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-butt.gif'
}, 'catholic': {
  keys: ['A Pope culture icon.', 'catholic', 'pope', 'hat', 'face', 'religion', 'book']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-catholic.gif'
}, 'cawg': {
  keys: ['Cackling Aloud With Gusto', 'cawg', 'laugh', 'face', 'point', 'up']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-cawg.gif'
}, 'cb': {
  keys: ['Clownballoon is coming...!', 'cb', 'clown', 'balloon', 'baloon', 'banned']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-clownballoon.gif'
}, 'cheeky': {
  keys: ['smilie with a protruding tongue', 'cheeky', 'tongue', 'stick', 'out', 'face', 'happy']
  , url: 'http://fi.somethingawful.com/safs/smilies/0/d/cheeky.001.gif'
}, 'cheers': {
  keys: ['Here\'s to us!', 'cheers', 'beer', 'sunglasses', 'drink', 'alcohol', 'face', 'happy']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-cheers.gif'
}, 'chef': {
  keys: ['I am the chef!', 'chef', 'cook', 'knife', 'stab', 'face']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-chef.gif'
}, 'choco': {
  keys: ['Choo!', 'choco', 'ghost', 'bubble', 'bobble', 'hurry', 'up']
  , url: 'http://fi.somethingawful.com/images/smilies/choco.gif'
}, 'clint': {
  keys: ['i\'m a cowboy baby', 'clint', 'cowboy', 'cigar', 'smoke', 'hat', 'face']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-clint.gif'
}, 'coffee': {
  keys: ['best part of waking up!', 'coffee', 'cup', 'mug', 'steaming', 'tea']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-coffee.gif'
}, 'colbert': {
  keys: ['crossarms', 'colbert', 'arms', 'crossed']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-colbert.gif'
}, 'comeback': {
  keys: ['They\'re coming back!', 'comeback', 'mad', 'angry', 'bipolar', 'bi-polar', 'cry']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-comeback.gif'
}, 'commissar': {
  keys: ['Summary Execution', 'commissar', 'bison', 'murder', 'kill', 'shoot', 'execute', 'gun']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-commissar.gif'
}, 'confused': {
  keys: ['confused', 'confused', 'puzzled', 'strange', '???', 'huh?', 'face']
  , url: 'http://fi.somethingawful.com/images/smilies/confused.gif'
}, 'cool': {
  keys: ['cool', 'cool', 'shades', 'sunglasses', 'face']
  , url: 'http://fi.somethingawful.com/images/smilies/cool.gif'
}, 'cop': {
  keys: ['I\'m a cop you idiot!', 'cop', 'policeman', 'nightstick', 'stick', 'waggle', 'face']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-cop.gif'
}, 'crossarms': {
  keys: ['colbert', 'crossarms', 'glasses', 'eyeglasses', 'eyebrow', 'raise']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-crossarms.gif'
}, 'cry': {
  keys: ['Some kind of zombie chewing tobacco and crying I guess', 'cry', 'zombie', 'bawl', 'green', 'face', 'tears']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-crying.gif'
}, 'cthulhu': {
  keys: ['Cthulhu', 'cthulhu', 'cuthulu', 'octopus', 'sunglasses', 'shades', 'tentacles', 'squid']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-cthulhu.gif'
}, 'biggrin': {
  keys: ['big grin', ':D', 'happy', 'face', 'grin', 'cheesy']
  , url: 'http://fi.somethingawful.com/images/smilies/biggrin.gif'
  , macro: ':D'
}, 'dance': {
  keys: ['Dance', 'dance', 'boogie', 'happy', 'face', 'fists']
  , url: 'http://i.somethingawful.com/images/emot-dance.gif'
}, 'devil': {
  keys: ['Demonology 101', 'devil', 'lucifer', 'pitchfork', 'fork', 'religion', 'satan']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-devil.gif'
}, 'dings': {
  keys: ['Dings', 'dings', 'little', 'angel']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-dings.gif'
}, 'doh': {
  keys: ['D\'oh!', 'doh', 'homer', 'stupid', 'facepalm']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-doh.gif'
}, 'downs': {
  keys: ['Yaaaay!  Happy happy yay!', 'downs', 'retard', 'idiot', 'baka']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-downs.gif'
}, 'downsgun': {
  keys: ['Downs botches suicide', 'downsgun', 'suicide', 'gun', 'shoot', 'retard']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-downsgun.gif'
}, 'downswords': {
  keys: ['listen to me :(', 'downswords', 'words', 'retard', 'hurr']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-downswords.gif'
}, 'drac': {
  keys: ['Dracula is coming', 'drac', 'vampire', 'teeth']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-drac.gif'
}, 'eek': {
  keys: ['Eek', 'eek', 'scream', 'scary', 'frightened']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-eek.gif'
}, 'emo': {
  keys: ['Emo', 'emo', 'cut', 'wrist', 'razor', 'blade', 'blood', 'sad']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-emo.gif'
}, 'eng101': {
  keys: ['I don\'t know', 'eng101', 'science', 'teacher', 'knowledge', 'learn', 'professor']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-eng101.gif'
}, 'eng99': {
  keys: ['Sad eng101', 'eng99', 'science', 'teacher', 'knowledge', 'learn', 'professor', 'sad', 'depressed']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-eng99.gif'
}, 'engleft': {
  keys: ['Eng Left', 'engleft', 'science', 'teacher', 'knowledge', 'learn', 'professor', 'square']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-engleft.gif'
}, 'eyepop': {
  keys: [':eyepop:', 'eyepop', 'pop', 'wow', 'eyes', 'amazed', 'look', 'see']
  , url: 'http://fi.somethingawful.com/safs/smilies/0/a/eyepop.001.gif'
}, 'f5': {
  keys: ['pres butan to go', 'f5', 'press', 'refresh', 'button', 'push']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-f5.gif'
}, 'f5h': {
  keys: ['F5 Hand', 'f5h', 'refresh', 'hand', 'button', 'press']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-f5h.gif'
}, 'fap': {
  keys: ['Fapping off', 'fap', 'wank', 'jerkoff', 'masturbate', 'onanism', 'tug']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-fappery.gif'
}, 'fh': {
  keys: ['JERK JERK JERK JERK', 'fh', 'wank', 'jerkoff', 'masturbate', 'onanism', 'tug', 'hand']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-fh.gif'
}, 'flame': {
  keys: ['Mr. V gets roasted', 'flame', 'thrower', 'blast', 'fire', 'kill', 'roast', 'dead']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-flame.gif'
}, 'gay': {
  keys: ['not straight', 'gay', 'homosexual', 'fag', 'turning', 'becoming']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-gay.gif'
}, 'geno': {
  keys: ['The Path is Grey', 'geno', 'grey', 'gray', 'neutral', 'face', 'stoic']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-geno.gif'
}, 'ghost': {
  keys: ['Boo', 'ghost', 'float', 'happy', 'phantom']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-ghost.gif'
}, 'gibs': {
  keys: ['Gibs', 'gibs', 'face', 'cut', 'blood', 'dead']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-gibs.gif'
}, 'glomp': {
  keys: ['BLATANTLY STOLEN FROM DEVIANTART', 'glomp', 'hugs', 'sympathy', 'cuddle', 'happy', 'jump']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-glomp.gif'
}, 'golfclap': {
  keys: ['nice job my nigga', 'golfclap', 'clap', 'good']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-golfclap.gif'
}, 'gonk': {
  keys: ['GONK', 'gonk', 'nms', 'awful', 'painful', 'face', 'sad', 'cry', 'traumatize', 'cringe', 'tears']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-gonk.gif'
}, 'greatgift': {
  keys: ['great gifts for dads and grads', 'greatgift', 'present', 'box', 'blue', 'wrapping']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-greatgift.gif'
}, 'haw': {
  keys: ['Haw haw haw', 'haw', 'joke', 'happy', 'face', 'grin', 'teeth']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-haw.gif'
}, 'hawaaaafap': {
  keys: ['tha lowride bitch', 'hawaaaafap', 'joke', 'happy', 'face', 'grin', 'teeth', 'fap', 'wank', 'masturbate', 'jerkoff']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-hawaaaafap.gif'
}, 'hehe': {
  keys: ['Heh.', 'hehe', 'cool', 'sunglasses', 'shades']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-hehe.gif'
}, 'heysexy': {
  keys: ['Hey sexy', 'heysexy', 'giggity', 'eyebrows', 'waggle', 'sexy', 'know', 'what']
  , url: 'http://fi.somethingawful.com/safs/smilies/2/6/heysexy.001.gif'
}, 'hf': {
  keys: ['You can hi-five stuff now', 'hf', 'highfive', '5', 'five', 'hands', 'slap', 'hifive', 'hands']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-hf.gif'
}, 'hfive': {
  keys: ['Hi five it up nigga', 'hfive', 'hf', 'highfive', '5', 'five', 'hands', 'slap', 'hifive', 'hands']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-hfive.gif'
}, 'hist101': {
  keys: ['S P Q R', 'hist101', 'roman', 'gladiator', 'sword', 'red', 'stab', 'fighter', 'soldier']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-hist101.gif'
}, 'holy': {
  keys: ['holy dance', 'holy', 'dance', 'tongue', 'giggle', 'happy', 'face']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-holy.gif'
}, 'huh': {
  keys: ['huh', 'huh', 'hump', 'fuck', 'doggystyle', 'style']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-huh.gif'
}, 'hydrogen': {
  keys: ['Hydrogen', 'hydrogen', 'revolve', 'atom', 'electron', 'selfcentered', 'centered', 'face', 'happy']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-hydrogen.gif'
}, 'j': {
  keys: ['j is for Jansie', 'j', 'girl', 'woman', 'female', 'lady', 'red', 'bow', 'smile', 'happy']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-j.gif'
}, 'jerkbag': {
  keys: ['god damn your post sucks', 'jerkbag', 'jerkoff', 'wank', 'masturbate', 'bullshit', 'pretentious']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-jerkbag.gif'
}, 'jewish': {
  keys: ['Orthodox Jew with Torah', 'jewish', 'hebe', 'kike', 'semite', 'scrolls', 'religion', 'israel']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-jewish.gif'
}, 'jihad': {
  keys: ['ALLAH ACKBAR!!!1', 'jihad', 'terrorist', 'gun', 'ak47', 'ak-47', 'muslim', 'islam', 'ninja', 'black', 'face']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-jihad.gif'
}, 'keke': {
  keys: ['kekekekekekeke', 'keke', 'cute', 'funny', 'japanese', 'kiki', 'laugh', 'giggle', 'girl', 'kawaii', 'face']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-keke.gif'
}, 'kimchi': {
  keys: ['Kimchi', 'kimchi', 'steam', 'hot', 'smoke', 'red', 'face', 'happy', 'smile', 'sauce']
  , url: 'http://fi.somethingawful.com/images/smilies/kimchi.gif'
}, 'mad': {
  keys: ['mad', 'mad', 'angry', 'annoyed', 'furious', 'irritated', 'offended', 'rage', 'face']
  , url: 'http://fi.somethingawful.com/images/smilies/mad.gif'
}, 'mmmhmm': {
  keys: ['MMMM HMM...', 'mmmhmm', 'laugh', 'face', 'giggle', 'grin', 'happy']
  , url: 'http://fi.somethingawful.com/smilies/mmmhmm.gif'
}, 'monocle': {
  keys: ['Oh my!  What a saucy lad!', 'monocle', 'pop', 'wow', 'amazed']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-monocle.gif'
}, 'morning': {
  keys: ['morning coffee', 'morning', 'coffee', 'stimulant', 'joe', 'awake', 'asleep', 'drink', 'mug']
  , url: 'http://fi.somethingawful.com/images/smilies/coffee.gif'
}, 'munch': {
  keys: ['this is gonna be good', 'munch', 'popcorn', 'eat', 'drink', 'can', 'soda', 'watch']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-munch.gif'
}, 'neckbeard': {
  keys: ['neckbeard emot u say?', 'neckbeard', 'happy', 'face', 'smile', 'laugh', 'clap', 'glee']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-neckbeard.gif'
}, 'newfap': {
  keys: ['Fap fap fap fap fap fap fap!', 'newfap', 'green', 'face', 'fap', 'wank', 'masturbate', 'jerkoff', 'tongue', 'eyeroll']
  , url: 'http://fi.somethingawful.com/safs/smilies/e/d/newfap.001.gif'
}, 'newlol': {
  keys: ['LOL', 'newlol', 'happy', 'face', 'red', 'grin', 'laugh', 'bounce']
  , url: 'http://fi.somethingawful.com/safs/smilies/e/d/newlol.001.gif'
}, 'niggly': {
  keys: ['Nigglypuff rules.', 'niggly', 'face', 'rotate', 'turn', 'twist', 'smile']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-niggly.gif'
}, 'ninja': {
  keys: ['Ninja', 'ninja', 'eyes', 'black']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-ninja.gif'
}, 'nyd': {
  keys: ['Oh no you didn\'t', 'nyd', 'no', 'you', 'didn\'t', 'didnt', 'waggle', 'face', 'head', 'hand', 'talk', 'to']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-nyd.gif'
}, 'o': {
  keys: ['embarrasment', 'o', 'embarassed', 'embarrased', 'sheepish']
  , url: 'http://fi.somethingawful.com/images/smilies/redface.gif'
}, 'ohdear': {
  keys: ['oh no lidge', 'ohdear', 'fear', 'worry', 'hands', 'face', 'anxious']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-ohdear.png'
}, 'ohdearsass': {
  keys: ['Worried Santa', 'ohdearsass', 'fear', 'worry', 'hands', 'face', 'anxious', 'hat']
  , url: 'http://fi.somethingawful.com/safs/smilies/c/3/ohdearsass.001.png'
}, 'pedo': {
  keys: ['Come here little kiddie', 'pedo', 'paedofile', 'pedofile', 'paedophile', 'pedophile', 'kiddie', 'fiddler', 'teddy', 'bear', 'little', 'kid', 'lure', 'shake']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-pedo.gif'
}, 'pervert': {
  keys: ['Comin\' to get ya', 'pervert', 'giggity', 'sex', 'innuendo', 'double', 'entendre']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-pervert.gif'
}, 'pirate': {
  keys: ['Pirate', 'pirate', 'monocle', 'pop', 'beard', 'hat']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-pirate.gif'
}, 'pray': {
  keys: ['all old folks go 2 heaven', 'pray', 'religion', 'heaven', 'god']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-pray.gif'
}, 'pseudo': {
  keys: ['Pseudo science', 'pseudo', 'science', 'teacher', 'bent', 'stick', 'professor']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-pseudo.gif'
}, 'raise': {
  keys: ['Raising Eyebrow', 'raise', 'eyebrow', 'eyes', 'question', 'bullshit', 'skeptic']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-raise.gif'
}, 'rant': {
  keys: ['angry smiley ranting GRRR', 'rant', 'angry', 'words', 'long', 'mad', 'rage', 'fists', 'threaten', 'explode', 'unhappy', 'furious']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-rant.gif'
}, 'reject': {
  keys: ['Disapproving obese smiley', 'reject', 'glasses', 'mad', 'unhappy']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-reject.gif'
}, 'respek': {
  keys: ['Respek', 'respek', 'fistbump', 'bump', 'fists', 'respect', 'greeting', 'handshake']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-respek.gif'
}, 'rimshot': {
  keys: ['Rimshot', 'rimshot', 'drumset', 'badoomtish', 'tish', 'shot', 'comedy', 'sound']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-rimshot.gif'
}, 'roboluv': {
  keys: ['miss u Dono', 'roboluv', 'robot', 'hug', 'cylon', 'love', 'machine']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-roboluv.gif'
}, 'rock': {
  keys: ['Rock', 'rock', 'hands', 'sign', 'metal', 'horns', 'devil', 'headbang', 'bang']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-rock.gif'
}, 'roflolmao': {
  keys: ['roflolmao', 'roflolmao', 'rolling', 'lmao', 'lol', 'roflmao', 'laugh', 'funny']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-roflolmao.gif'
}, 'rolleye': {
  keys: ['Rolleye', 'rolleye', 'eyes', 'sarcastic', 'sarcasm']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-rolleye.gif'
}, 'rolleyes': {
  keys: ['roll eyes (sarcastic)', 'rolleyes', 'eyes', 'sarcastic', 'sarcasm']
  , url: 'http://fi.somethingawful.com/images/smilies/rolleyes.gif'
}, 'saddowns': {
  keys: ['Awww. Booo.', 'saddowns', 'downs', 'unhappy', 'retard', 'face']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-saddowns.gif'
}, 'sassargh': {
  keys: ['coal again?!', 'sassargh', 'santa', 'claus', 'angry', 'rage', 'hat', 'red', 'face', 'shake', 'fist']
  , url: 'http://fi.somethingawful.com/safs/smilies/0/7/sassargh.001.gif'
}, 'science': {
  keys: ['For Science!', 'science', 'goggles', 'sparks', 'lightning', 'electricity', 'zap', 'teacher', 'professor', 'hat']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-science.gif'
}, 'shlick': {
  keys: ['shlick', 'shlick', 'girl', 'woman', 'female', 'fap', 'wank', 'jerkoff', 'masturbate', 'schlick']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-shlick.gif'
}, 'shobon': {
  keys: ['Shobon... (deflated)', 'shobon', 'eyebrows', 'happy', 'face', 'sheepish']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-shobon.gif'
}, 'shrug': {
  keys: ['shrug', 'shrug', 'dunno', 'idea', 'no']
  , url: 'http://fi.somethingawful.com/safs/smilies/4/1/shrug.001.gif'
}, 'sigh': {
  keys: ['oh sigh', 'sigh', 'unhappy', 'depressed', 'purple', 'face', 'sad']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-sigh.gif'
}, 'silent': {
  keys: ['Nothing clever to say', 'silent', 'blank', 'face']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-silent.gif'
}, 'siren': {
  keys: ['Breaking News Developing...', 'siren', 'alarm', 'warning', 'police', 'ambulance', 'fire', 'emergency', 'news']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-siren.gif'
}, 'smuggo': {
  keys: ['Smuggo', 'smuggo', 'eyebrows']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-smuggo.gif'
}, 'ssh': {
  keys: ['aardvarko', 'ssh', 'shush', 'quiet', 'finger', 'lips', 'pink']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-ssh.gif'
}, 'ssj': {
  keys: ['ssj', 'ssj', 'super', 'saiyan', 'sayan']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-ssj.gif'
}, 'stare': {
  keys: ['Astonished stare', 'stare', 'scary', 'afraid', 'amazed', 'horrified', 'shocked']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-stare.gif'
}, 'stonk': {
  keys: ['oh fuck no!', 'stonk', 'gasp', 'disgusted', 'horrified', 'shocked']
  , url: 'http://fi.somethingawful.com/safs/smilies/1/9/stonk.001.gif'
}, 'suicide': {
  keys: ['Suicide is the best side.', 'suicide', 'gun', 'self', 'shoot']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-suicide.gif'
}, 'sun': {
  keys: ['A beaming sun', 'sun', 'flower']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-sun.gif'
}, 'supaburn': {
  keys: ['o snap that burn was fire', 'supaburn', 'burn', 'super', 'mad', 'angry', 'enraged', 'rage', 'fire']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-supaburn.gif'
}, 'sweatdrop': {
  keys: ['oh my i am embarassed', 'sweatdrop', 'embarrassed', 'embarrased', 'embarassed', 'drop']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-sweatdrop.gif'
}, 'swoon': {
  keys: ['Love eyes', 'swoon', 'eyes', 'goggle', 'love', 'infatuated', 'heart', 'tongue']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-swoon.gif'
}, 'sympathy': {
  keys: ['It\'ll be ok :(', 'sympathy', 'hug', 'sad', 'cuddle', 'purple']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-sympathy.gif'
}, 'tinfoil': {
  keys: ['Tinfoil hat', 'tinfoil', 'paranoid', 'conspiracy', 'hat']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-tinfoil.gif'
}, 'tipshat': {
  keys: ['Tip of the Hat', 'tipshat', 'hat', 'greeting']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-tiphat.gif'
}, 'tizzy': {
  keys: ['twistmaster tizz', 'tizzy', 'mad', 'angry', 'rage']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-tizzy.gif'
}, 'toot': {
  keys: ['Toots', 'toot', 'party', 'blow', 'hat', 'note', 'musical']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-toot.gif'
}, 'twisted': {
  keys: ['Twisted', 'twisted', 'devil', 'horns', 'evil', 'naughty']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-twisted.gif'
}, 'v': {
  keys: ['v', 'v', 'happy', 'face']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-v.gif'
}, 'what': {
  keys: ['what', 'what', 'huh?']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-what.gif'
}, 'whip': {
  keys: ['Whip it good', 'whip', 'devo', 'hat', 'red']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-whip.gif'
}, 'witch': {
  keys: ['Witch Hunt!!!', 'witch', 'hat']
  , url: 'http://i.somethingawful.com/images/emot-witch.gif'
}, 'woop': {
  keys: ['citizen slang bro', 'woop', 'happy', 'dance']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-woop.gif'
}, 'words': {
  keys: ['a shovel (for digging)', 'words', 'too', 'many', 'talk']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-words.gif'
}, 'worship': {
  keys: ['bow', 'worship', 'not', 'worthy', 'bow', 'prostrate', 'pray', 'religion']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-worship.gif'
}, 'wth': {
  keys: ['what the hell?', 'wth', 'hell', 'amazed', 'bewildered', 'shocked']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-wth.gif'
}, 'xd': {
  keys: ['XD', 'xd', 'happy', 'ecstatic', 'face', 'smile']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-xd.gif'
}, 'yarr': {
  keys: ['Yarr!', 'yarr', 'pirate', 'knife', 'sword', 'teeth']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-yarr.gif'
}, 'yotj': {
  keys: ['YOTJ', 'yotj', 'party', 'blow', 'hat', 'note', 'musical']
  , url: 'http://fi.somethingawful.com/safs/smilies/b/6/yotj.001.gif'
}, 'yum': {
  keys: ['cereal!', 'yum', 'bowl', 'eat', 'dish', 'spoon']
  , url: 'http://fi.somethingawful.com/safs/smilies/0/9/yum.001.gif'
}, 'zombie': {
  keys: ['Zombie', 'zombie', 'undead']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-zombie.gif'
}, 'zoro': {
  keys: ['Zoro\'s Badass moment', 'zoro', 'bleed', 'blood', 'arms', 'cross']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-zoro.gif'
}, 'wink': {
  keys: ['wink', ';)', 'face']
  , url: 'http://fi.somethingawful.com/images/smilies/wink.gif'
  , macro: ';)'
}, 'livestock~01-14-04-whore': {
  keys: ['Oh you lustful devil you', ';-*', 'kiss', 'smooch', ';*', 'lips', 'girl', 'lady', 'female', 'woman']
  , url: 'http://i.somethingawful.com/mjolnir/images/livestock~01-14-04-whore.gif'
  , macro: ';-*'
}, '10bux': {
  keys: ['Hope u got 10 bux', '10bux', 'cash', 'dollar', '$10', 'money', 'bill']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-10bux.gif'
}, '20bux': {
  keys: ['This cost 20 bux', '20bux', 'cash', 'dollar', '$20', 'money', 'bill']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-20bux.gif'
}, '69snypa': {
  keys: ['Pg 69 Snypa', '69snypa', 'sniper', 'rifle', 'gun', 'borat', 'vary', 'naice', 'page']
  , url: 'http://fi.somethingawful.com/images/smilies/69snypa.gif'
}, 'banme': {
  keys: ['banme', 'banme', 'banned']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-banme.gif'
}, 'bunt': {
  keys: ['Bunt', 'bunt', 'frog', 'purple']
  , url: 'http://fi.somethingawful.com/safs/smilies/8/9/bunt.001.gif'
}, 'byewhore': {
  keys: ['Bye bye, whore!', 'byewhore', 'whore', 'wave', 'hand', 'fist']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-byewhore.gif'
}, 'byob': {
  keys: ['BYOB Bitches', 'byob', 'duck', 'button', 'press', 'push']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-byob.gif'
}, 'cadfan': {
  keys: ['We are the CAD [Fans]', 'cadfan', 'fan']
  , url: 'http://fi.somethingawful.com/safs/smilies/f/f/cadfan.001.gif'
}, 'clegg': {
  keys: ['UK Deputy PM\'s belief system.', 'clegg', 'lies', 'politician', 'nick']
  , url: 'http://fi.somethingawful.com/safs/smilies/2/7/clegg.001.gif'
}, 'cmon': {
  keys: ['C\'mon Son!', 'cmon', 'son', 'black', 'face']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-cmon.gif'
}, 'coupons': {
  keys: ['How to crash the forums', 'coupons', 'ignore', 'button', 'press', 'push']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-coupons.gif'
}, 'damn': {
  keys: ['......DAMN!', 'damn', 'black', 'face']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-damn.gif'
}, 'darksouls': {
  keys: ['fucking dark souls', 'darksouls', 'game', 'knight', 'souls']
  , url: 'http://fi.somethingawful.com/safs/smilies/b/c/darksouls.001.gif'
}, 'dealwithit': {
  keys: ['Don\'t be a drama queen', 'dealwithit', 'dwi', 'with', 'it', 'sunglasses', 'shades']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-dealwithit.jpg'
}, 'dice': {
  keys: ['Battlefield more like Bugfilled!', 'dice', 'bugs', 'collapse']
  , url: 'http://fi.somethingawful.com/safs/smilies/2/e/dice.001.gif'
}, 'downsowned': {
  keys: ['Downs owned', 'downsowned', 'owned', 'retard', 'press', 'push', 'button', 'miss']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-downsowned.gif'
}, 'effort': {
  keys: ['Ugh, that button...', 'effort', 'press', 'push', 'button', 'apathy', 'tired']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-effort.gif'
}, 'feelsgood': {
  keys: ['Feels Good Man', 'feelsgood', 'good', 'man', 'frog']
  , url: 'http://fi.somethingawful.com/safs/smilies/3/1/feelsgood.001.png'
}, 'filez': {
  keys: ['FLIEZ', 'filez', 'files', 'fly', 'folder', 'wings']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-filez.gif'
}, 'firstpost': {
  keys: ['First Post', 'firstpost', 'post', 'shades', 'sunglasses', 'cool']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-firstpost.gif'
}, 'frogout': {
  keys: ['a frog saying &quot;get out&quot;', 'frogout', 'out', 'get']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-frogout.gif'
}, 'ftbrg': {
  keys: ['Fuck that butt real good', 'ftbrg', 'you', 'suck', 'u']
  , url: 'http://fi.somethingawful.com/customtitles/emot-ftbrg.gif'
}, 'gb2byob': {
  keys: ['go bakc 2 huuurrrrrr', 'gb2byob', 'go', 'back', 'to', 'byob', 'get', 'out']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-gb2byob.gif'
}, 'gb2fyad': {
  keys: ['Go back to FYAD', 'gb2fyad', 'go', 'back', 'to', 'fyad', 'get', 'out']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-gb2fyad.gif'
}, 'gb2gbs': {
  keys: ['Go back to GBS', 'gb2gbs', 'go', 'back', 'to', 'gbs', 'get', 'out']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-gb2gbs.gif'
}, 'gb2hd2k': {
  keys: ['Damn you, Helldump!', 'gb2hd2k', 'go', 'back', 'to', 'helldump', 'get', 'out']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-gb2hd2k.gif'
}, 'getout': {
  keys: ['GET OUT', 'getout', 'out', 'norton']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-getout.png'
}, 'godwin': {
  keys: ['Hitler Reference!', 'godwin', 'press', 'push', 'button', 'nazi']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-godwin.gif'
}, 'goof': {
  keys: ['Get out of FYAD', 'goof', 'out', 'of', 'fyad']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-goof.gif'
}, 'hurr': {
  keys: ['what does this do?', 'hurr', 'giggle', 'dance', 'press', 'push', 'button']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-hurr.gif'
}, 'iceburn': {
  keys: ['damn you just told son', 'iceburn', 'burn', 'riposte', 'comeback']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-iceburn.gif'
}, 'iia': {
  keys: ['It it awesome!', 'iia', 'awesome', 'ghost', 'yellow']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-iia.png'
}, 'iiam': {
  keys: ['Mysterious happenings!', 'iiam', 'mystery', 'ghost', 'puzzle']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-iiam.gif'
}, 'laffo': {
  keys: ['LAFFO', 'laffo', 'lol']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-laffo.gif'
}, 'lol': {
  keys: ['lolololerlerlslzollin\'', 'lol']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-lol.gif'
}, 'm10': {
  keys: ['it says mac-10, cool', 'm10', 'mac', '10', 'apple', 'gun', 'firearm', 'rifle']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-m10.gif'
}, 'master': {
  keys: ['masterstroke', 'master', 'stroke', 'riposte', 'comeback', 'burn']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-master.gif'
}, 'milkie': {
  keys: ['da Moose is loose', 'milkie', 'moose', 'dog', 'corgi', 'terrible', 'poster']
  , url: 'http://fi.somethingawful.com/safs/smilies/4/f/milkie.001.gif'
}, 'mitt': {
  keys: ['Run pander.exe', 'mitt', 'romney', 'love', 'robot']
  , url: 'http://fi.somethingawful.com/safs/smilies/7/3/mitt.001.gif'
}, 'mordin': {
  keys: ['A Scientist Salarian', 'mordin', 'words', 'salarian', 'mass', 'effect', 'alien']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-mordin.gif'
}, 'moreevil': {
  keys: ['evil for evil\'s sake', 'moreevil', 'evil', 'press', 'button', 'push']
  , url: 'http://fi.somethingawful.com/safs/smilies/0/f/moreevil.001.gif'
}, 'ms': {
  keys: ['Mystery Solved', 'ms', 'solved', 'ghost']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-ms.gif'
}, 'nattyburn': {
  keys: ['NATTY ICE BURN fbgm', 'nattyburn', 'natural', 'ice', 'beer']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-nattyburn.gif'
}, 'nms': {
  keys: ['Not mind safe or worksafe', 'nms', 'mind', 'safe', 'trauma']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-nms.gif'
}, 'nws': {
  keys: ['OMG SO NOT WORK SAFE', 'nws', 'not', 'work', 'safe']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-nws.gif'
}, 'owned': {
  keys: ['PWNED THE AS$ OF A N00B', 'owned', 'pwned']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-owned.gif'
}, 'pedophiles': {
  keys: ['But what about the pedos?!', 'pedophiles', 'free', 'speech', 'paedophiles', 'paedofiles', 'pedofiles']
  , url: 'http://fi.somethingawful.com/safs/smilies/a/7/pedophiles.001.gif'
}, 'protarget': {
  keys: ['Pro Target', 'protarget', 'push', 'press', 'button', 'post']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-protarget.gif'
}, 'regd04': {
  keys: ['Fucking 04\'s', 'regd04', 'regdate', 'register', 'date', '2004', '04', 'rolleyes', 'eyes']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-04.gif'
}, 'regd05': {
  keys: ['05 baby!', 'regd05', 'regdate', 'register', 'date', '2005', '05', 'fellate', 'blowjob', 'suck', 'dick']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-05.gif'
}, 'regd06': {
  keys: ['06 HURR!', 'regd06', 'regdate', 'register', 'date', '2006', '06', 'green', 'barf', 'vomit', 'puke', 'spew']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-06.gif'
}, 'regd07': {
  keys: ['2007', 'regd07', 'regdate', 'register', 'date', '2007', '07', 'slap', 'fight']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-07.gif'
}, 'regd08': {
  keys: ['into the ground!', 'regd08', 'regdate', 'register', 'date', '2008', '08', 'lets', 'let\'s', 'run', 'this', 'shit', 'into', 'the', 'ground']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-regd08.gif'
}, 'regd10': {
  keys: ['Holy Diver', 'regd10', 'ronnie', 'james', 'dio', 'metal', 'sign', 'satan', 'horns']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-regd10.png'
}, 'rms': {
  keys: ['wget and emailed', 'rms', 'frog', 'grin', 'get', 'in', 'richard', 'stallman', 'evil']
  , url: 'http://fi.somethingawful.com/safs/smilies/c/e/rms.001.png'
}, 'sbahj': {
  keys: ['Shit got too reel for me.', 'sbahj', 'damn', 'shake', 'god']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-sbahj.gif'
}, 'sicknasty': {
  keys: ['Space Bro Garrus', 'sicknasty', 'nasty', 'gun', 'snype', 'sniper', 'rifle', 'mass', 'effect']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-sicknasty.gif'
}, 'speculate': {
  keys: ['LOTS OF SPECULATION', 'speculate', 'press', 'push', 'button']
  , url: 'http://fi.somethingawful.com/safs/smilies/c/a/speculate.001.gif'
}, 'stoke': {
  keys: ['Stoke Tactical Mastery', 'stoke', 'masterstoke', 'burn', 'tactical']
  , url: 'http://fi.somethingawful.com/safs/smilies/2/c/stoke.001.gif'
}, 'tetten': {
  keys: ['Tetten, the best thing ever', 'tetten']
  , url: 'http://fi.somethingawful.com/safs/smilies/3/c/tetten.001.gif'
}, 'their': {
  keys: ['Grammer Queen Magnet', 'their', 'grammer', 'there', 'theyre', 'they\'re']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-their.gif'
}, 'vd': {
  keys: ['violetdragon', 'vd', 'dragon', 'purple', 'smoke', 'get', 'murdered', 'puff']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-vd.gif'
}, 'w00t': {
  keys: ['w00t', 'w00t', 'press', 'push', 'button', 'woot']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-w00t.gif'
}, 'w2byob': {
  keys: ['Welcome to BYOB!', 'w2byob', 'welcome', 'byob']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-w2byob.gif'
}, 'waycool': {
  keys: ['Way Cool (this smilie is gay as hell)', 'waycool', 'cool', 'thumbs', 'up', 'smile']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-waycool.gif'
}, 'whoptc': {
  keys: ['whopkins', 'whoptc', 'duck', 'goose', 'geese', 'what', 'christ']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-whoptc.gif'
}, 'wrongful': {
  keys: ['STFU', 'wrongful', 'shut', 'up']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-wrongful.gif'
}, 'wtc': {
  keys: ['#1 grandpa', 'wtc', 'what', 'christ', 'riker', 'number', 'one', 'grandpa']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-wtc.gif'
}, 'wtf': {
  keys: ['wtf', 'wtf', 'what', 'fuck']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-wtf.gif'
}, 'yohoho': {
  keys: ['SKULL JOKE!', 'yohoho', 'joke', 'pirate', 'it', 'is']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-yohoho.gif'
}, 'anime': {
  keys: ['Ego Orb', 'anime', '3d', 'face']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-anime.png'
}, 'aslol': {
  keys: ['LOL for the deaf', 'aslol', 'hand', 'deaf', 'lol']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-aslol.gif'
}, 'awesome': {
  keys: ['uh its AWESOME', 'awesome', 'boner', 'erection', 'dick', 'geek', 'nerd', 'dweeb', 'glasses', 'adjust']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-awesome.gif'
}, 'baby': {
  keys: ['Gotta love me', 'baby', 'not', 'mama', 'dinosaurs']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-baby.png'
}, 'backtowork': {
  keys: ['Responsibility Scallop', 'backtowork', 'clam', 'scallop', 'work']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-backtowork.gif'
}, 'barf': {
  keys: ['Look at that guy puke', 'barf', 'vomit', 'puke', 'green']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-barf.gif'
}, 'boonie': {
  keys: ['David Boon', 'boonie', 'cricket', 'bat', 'beer', 'australia', 'sports', 'waggle']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-boonie.gif'
}, 'bravo': {
  keys: ['bravo', 'bravo', 'clap', 'hands', 'sarcasm', 'sarcastic']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-bravo.gif'
}, 'buddy': {
  keys: ['for realzzies', 'buddy', 'white', 'face', 'smile', 'byob']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-buddy.gif'
}, 'byodame': {
  keys: ['Worst emoticonette ever.', 'byodame', 'byob', 'girl', 'female', 'woman', 'lady', 'bow', 'shocked']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-byodame.gif'
}, 'byodood': {
  keys: ['Worst emoticon ever', 'byodood', 'shocked', 'byob']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-byodood.gif'
}, 'c00l': {
  keys: ['l33t li3k j3ff k', 'c00l', 'cool', 'shades', 'sunglasses']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-c00l.gif'
}, 'c00lbert': {
  keys: ['TAKE THAT MOTHERFUCKERS', 'c00lbert', 'cool', 'shades', 'sunglasses', 'colbert', 'arms', 'crossed']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-c00lbert.gif'
}, 'can': {
  keys: ['You Opened a Can of Worms', 'can', 'worms', 'tentacles']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-can.gif'
}, 'catstare': {
  keys: ['I\'m hitler IRL', 'catstare', 'stare', 'ears', 'mad', 'annoyed', 'irritated']
  , url: 'http://fi.somethingawful.com/safs/smilies/2/4/catstare.001.gif'
}, 'chord': {
  keys: ['pipe dog', 'chord', 'dog', 'pipe', 'smoke', 'smug']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-chord.gif'
}, 'corsair': {
  keys: ['Corsair is old.', 'corsair', 'old', 'rich', 'pool', 'wheelchair', 'chair', 'beard']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-corsair.gif'
}, 'cripes': {
  keys: ['Cripes', 'cripes', 'facepalm', 'cover', 'eyes']
  , url: 'http://fi.somethingawful.com/safs/smilies/d/0/cripes.001.gif'
}, 'crow': {
  keys: ['caw caw', 'crow', 'hat']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-crow.gif'
}, 'dawkins101': {
  keys: ['Pope Gives Up', 'dawkins101', 'pope', 'religion', 'darwin', 'evolution', 'sad', 'toss', 'throw', 'book']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-Dawkins102.gif'
}, 'dogout': {
  keys: ['out with the frog', 'dogout', 'out', 'smug']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-dogout.gif'
}, 'douche': {
  keys: ['egg hating renegger. also douche', 'douche', 'head', 'shake', 'refuse', 'renege', 'smashmouth', 'eat', 'eggs']
  , url: 'http://fi.somethingawful.com/safs/smilies/0/d/douche.001.gif'
}, 'downsbravo': {
  keys: ['Bravo', 'downsbravo', 'retard', 'clap', 'hands']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-downsbravo.gif'
}, 'downsrim': {
  keys: ['downs rimshot', 'downsrim', 'drumset', 'fail', 'retard', 'rimshot', 'stupid']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-downsrim.gif'
}, 'dukedog': {
  keys: ['Duke Nukem is Forever', 'dukedog', 'nukem', 'dog', 'cigar', 'smoke']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-dukedog.png'
}, 'faggot': {
  keys: ['Smug Jecht', 'faggot', 'pirate', 'bandana']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-faggot.gif'
}, 'fella': {
  keys: ['TOO MANY LIMES! TOO MANY LIMES!', 'fella', 'beard']
  , url: 'http://fi.somethingawful.com/safs/smilies/1/f/fella.001.gif'
}, 'fiesta': {
  keys: ['fiesta gbs', 'fiesta', 'cat', 'gbs', 'hat', 'jester', 'pipe', '3d', 'glasses']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-fiesta.gif'
}, 'forkbomb': {
  keys: ['hey there pretty lady', 'forkbomb', 'wink', 'ugly', 'eyes', 'asian']
  , url: 'http://fi.somethingawful.com/safs/smilies/c/0/forkbomb.001.gif'
}, 'frog': {
  keys: ['Frog Eyes', 'frog']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-frog.gif'
}, 'frogbon': {
  keys: ['R-r-r-ribbit?', 'frogbon']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-frogbon.gif'
}, 'frogc00l': {
  keys: ['cooler than being cool', 'frogc00l', 'cool', 'sunglasses', 'shades']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-frogc00l.gif'
}, 'froggonk': {
  keys: ['Frog Gonk', 'froggonk', 'unhappy', 'sad', 'anguish']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-froggonk.gif'
}, 'frogsiren': {
  keys: ['Frogsiren', 'frogsiren', 'unhappy', 'sad', 'anguish', 'siren', 'alarm']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-frogsiren.gif'
}, 'fuckoff': {
  keys: ['Fuck off.', 'fuckoff', 'off', 'hammer', 'smash']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-fuckoff.gif'
}, 'fyadride': {
  keys: ['Hello, fags. -TA', 'fyadride', 'sunglasses', 'shades']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-fyadride.gif'
}, 'gbsmith': {
  keys: ['a goon\'s life', 'gbsmith', 'smith', 'happy', 'sad', 'unhappy', 'face', 'white']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-gbsmith.gif'
}, 'getin': {
  keys: ['get in not go out', 'getin', 'frog', 'in']
  , url: 'http://fi.somethingawful.com/safs/smilies/f/0/getin.001.gif'
}, 'gifttank': {
  keys: ['Gifttank', 'gifttank', 'nyan', 'tank', 'rainbow']
  , url: 'http://fi.somethingawful.com/safs/smilies/e/f/gifttank.001.gif'
}, 'goatsecx': {
  keys: ['Goatse.cx', 'goatsecx', 'asshole', 'gaping']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-goatse.gif'
}, 'goonsay': {
  keys: ['goon says', 'goonsay', 'say', 'fat', 'glasses', 'neckbeard']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-goonsay.gif'
}, 'hampants': {
  keys: ['Pants of ham sing joyous!', 'hampants', 'pants', 'meat', 'bone']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-hampants.gif'
}, 'iamafag': {
  keys: ['Seriously I\'m a big fucking faggot, look at me, I\'m King Fag, and here\'s the smiley to prove it', 'iamafag', 'awesome', 'eyes', 'happy', ':D']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-fuckyou.gif'
}, 'jiggled': {
  keys: ['jiggled again', 'jiggled', 'kermit', 'frog']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-jiggled.gif'
}, 'mmmsmug': {
  keys: ['holy fuck check out this', 'mmmsmug', 'smug', 'laugh', 'giggle']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-mmmsmug.gif'
}, 'mrapig': {
  keys: ['The Pigman Cometh', 'mrapig', 'pigman']
  , url: 'http://fi.somethingawful.com/safs/smilies/b/2/mrapig.001.png'
}, 'mump': {
  keys: ['Mumptruck Mike', 'mump', 'mike']
  , url: 'http://fi.somethingawful.com/safs/smilies/9/b/mump.001.png'
}, 'parrot': {
  keys: ['That fucking bird', 'parrot', 'head', 'rotate', 'spin', 'bird']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-parrot.gif'
}, 'psyboom': {
  keys: ['Psyduck head explosion', 'psyboom', 'head', 'explode']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-psyboom.gif'
}, 'pwm': {
  keys: ['PWM mascot', 'pwm']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-pwm.gif'
}, 'pwn': {
  keys: ['fukken pwned nub', 'pwn', 'owned', 'big', 'eyes']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-pwn.gif'
}, 'qq': {
  keys: ['QQ', 'qq', 'cry', 'water', 'tears']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-qq.gif'
}, 'qqsay': {
  keys: ['get rid of :confused:', 'qqsay', 'cry', 'water', 'tears', 'goonsay', 'say']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-qqsay.gif'
}, 'razz': {
  keys: ['ba ba ba baa im razzin it', 'razz', 'reverse', 'awesome', 'happy', ':D']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-razz.gif'
}, 'reddit': {
  keys: ['Feeding on pedophile tears', 'reddit', 'teddy', 'bear', 'cry', 'tears', 'sperg']
  , url: 'http://fi.somethingawful.com/safs/smilies/0/4/reddit.001.gif'
}, 'regd09': {
  keys: ['regdog', 'regd09', 'regdate', 'dog', '09', '2009']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-regd09.gif'
}, 'regd11': {
  keys: ['Registry &amp; DLL sitting in a tree', 'regd11', 'dll']
  , url: 'http://fi.somethingawful.com/safs/smilies/8/0/regd11.001.gif'
}, 'rodimus': {
  keys: ['Evil toy scalper w/child', 'rodimus', 'robot', 'lure', 'tempt']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-rodimus.gif'
}, 'rubshands': {
  keys: ['rubshandstogetherandgrinsevilly', 'rubshands', 'beer', 'spill', 'guiness', 'guinness', 'lick', 'lips', 'hands', 'mad', 'angry']
  , url: 'http://fi.somethingawful.com/images/smilies/rubshandstogetherandgrinsevilly.gif'
}, 'shivdurf': {
  keys: ['Shivadas is king of byob.', 'shivdurf', 'byob', 'eye', 'hat']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-shivdurf.gif'
}, 'smith': {
  keys: ['everyman smith', 'smith', 'sad', 'unhappy', 'depressed', 'malaise', 'face']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-smith.gif'
}, 'smithfrog': {
  keys: ['A sad old frog', 'smithfrog', 'frog', 'sad', 'unhappy', 'depressed']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-smithfrog.png'
}, 'smithicide': {
  keys: ['smith considering suicide', 'smithicide', 'suicide', 'gun', 'sad', 'unhappy', 'depressed']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-smithicide.gif'
}, 'smithmouth': {
  keys: ['10/10/11 - never forgegg', 'smithmouth', 'smashmouth', 'eat', 'eggs', 'sad', 'unhappy']
  , url: 'http://fi.somethingawful.com/safs/smilies/9/7/smithmouth.001.gif'
}, 'smug': {
  keys: ['Smug', 'smug', 'face']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-smug.gif'
}, 'smugbert': {
  keys: ['Smug Colbert', 'smugbert', 'colbert', 'arms', 'crossed']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-smugbert.gif'
}, 'smugdog': {
  keys: ['a smug dog', 'smugdog', 'dog']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-smugdog.gif'
}, 'smugissar': {
  keys: ['die you smug sonofabitch', 'smugissar', 'commissar', 'bison', 'shoot', 'gun', 'kill', 'murder']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-smugissar.gif'
}, 'smugspike': {
  keys: ['Spike Witwicky being smug', 'smugspike', 'witwicky']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-smugspike.png'
}, 'staredog': {
  keys: ['staredog', 'dog', 'shocked']
  , url: 'http://fi.somethingawful.com/safs/smilies/4/6/staredog.001.gif'
}, 'stoat': {
  keys: ['Stoat Box\'s Emotion', 'stoatbox', 'ferret', 'weasel']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-stoat.gif'
}, 'suspense': {
  keys: ['Absolutely riveting.', 'suspense', 'popcorn', 'soda', 'drink', 'eat', 'riveting', 'engrossed']
  , url: 'http://fi.somethingawful.com/safs/smilies/6/d/suspense.001.gif'
}, 'sweep': {
  keys: ['Spring Cleaning', 'sweep', 'broomstick', 'brush', 'clean']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-sweep.gif'
}, 'thejoke': {
  keys: ['That\'s The Joke', 'thejoke', 'simpsons', 'mcgarnagle', 'arnold', 'arnie', 'thats', 'joke', 'standup', 'funny']
  , url: 'http://fi.somethingawful.com/safs/smilies/e/e/thejoke.001.png'
}, 'thumbsup': {
  keys: ['hell yeah man', 'thumbsup', 'up', 'sarcasm', 'sarcastic']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-thumbsup.gif'
}, 'ughh': {
  keys: ['Picard Ughh', 'ughh', 'facepalm', 'palm', 'star', 'trek', 'stupid', 'idiot']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-ughh.gif'
}, 'unsmigghh': {
  keys: ['unsmigghh', 'unsmigghh', 'blood', 'evil', 'grin', 'smith', 'tongue', 'happy']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-unsmigghh.gif'
}, 'unsmith': {
  keys: ['keep hope alive', 'unsmith', 'happy', 'face', 'smith', 'hopeful']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-unsmith.gif'
}, 'wotwot': {
  keys: ['it is a duck emoticon', 'wotwot', 'duck', 'tophat', 'posh', 'tips']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-wotwot.gif'
}, '911': {
  keys: ['NEVER FORGET!', '911', 'flag', 'eagle', 'crying', 'tears', 'usa', 'america', 'united', 'states', 'patriotism']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-911.gif'
}, 'australia': {
  keys: ['Australia', 'australia', 'ozzie', 'flag', 'kangaroo', 'crying', 'tears']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-australia.gif'
}, 'beck': {
  keys: ['tinfoil-chalkboard-smug', 'beck', 'blackboard', 'teacher', 'glenn', 'paranoid', 'tinfoil', 'crazy', 'smug', 'flag']
  , url: 'http://fi.somethingawful.com/safs/smilies/9/0/beck.001.gif'
}, 'belarus': {
  keys: ['I don\'t know what the fuck this is or why somebody would buy it but hey, that\'s just me', 'belarus', 'flag', 'crying', 'tractor']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-belarus.gif'
}, 'britain': {
  keys: ['Britain', 'britain', 'bulldog', 'crying', 'flag', 'england', 'uk', 'u.k.', 'great', 'dog', 'union', 'jack']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-britain.gif'
}, 'ca': {
  keys: ['california :\'(', 'ca', 'bear', 'republic', 'crying', 'flag']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-ca.gif'
}, 'canada': {
  keys: ['Canada', 'canada', 'flag', 'crying', 'beaver', 'maple', 'leaf']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-canada.gif'
}, 'cheat': {
  keys: ['And also there\'s the Cheat!', 'cheat']
  , url: 'http://fi.somethingawful.com/safs/smilies/5/e/cheat.001.gif'
}, 'china': {
  keys: ['China', 'china', 'crying', 'panda', 'bear', 'flag']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-china.gif'
}, 'denmark': {
  keys: ['Denmark', 'denmark', 'crying', 'legos', 'legoes']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-denmark.gif'
}, 'ese': {
  keys: ['i cut you', 'ese', 'mexico', 'stab', 'mexican', 'knife', 'cut', 'hat', 'sombrero']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-ese.gif'
}, 'eurovision': {
  keys: ['Eurovision', 'eurovision', 'song', 'contest', 'flag']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-eurovision.png'
}, 'france': {
  keys: ['France', 'france', 'crying', 'frog', 'flag', 'french']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-france.gif'
}, 'fsmug': {
  keys: ['smug with flag', 'fsmug', 'smug', 'flag', 'america', 'united', 'states', 'usa']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-fsmug.gif'
}, 'geert': {
  keys: ['Geert doe er wat aan!', 'geert', 'dutch', 'holland', 'netherlands', 'flag', 'crying']
  , url: 'http://fi.somethingawful.com/safs/smilies/2/2/geert.001.gif'
}, 'godwinning': {
  keys: ['Everything\'s coming up F&Atilde;&frac14;hrer', 'godwinning', 'hitler', 'flag', 'nazi', 'dance']
  , url: 'http://fi.somethingawful.com/safs/smilies/2/f/godwinning.001.gif'
}, 'helladid': {
  keys: ['CreteLP Smilie', 'helladid', 'flag']
  , url: 'http://fi.somethingawful.com/safs/smilies/b/3/helladid.001.gif'
}, 'hitler': {
  keys: ['Hitler', 'hitler', 'nazi', 'adolf', 'adolph']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-hitler.gif'
}, 'italy': {
  keys: ['ital. flag with mussolini', 'italy', 'italian', 'flag', 'mussolini', 'crying']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-italy.gif'
}, 'japan': {
  keys: ['Japan', 'japan', 'nihon', 'crying', 'pikachu']
  , url: 'http://fi.somethingawful.com/safs/smilies/9/e/japan.001.gif'
}, 'mexico': {
  keys: ['Mexico', 'mexico', 'mexican', 'flag', 'sleeping', 'sombrero', 'hat']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-mexico.gif'
}, 'norway': {
  keys: ['Norway/Norge/Noreg', 'norway', 'crying', 'moose', 'elk', 'flag']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-norway.gif'
}, 'patriot': {
  keys: ['Who the hell paid money for this stupid shit', 'patriot', 'salute', 'flag', 'america', 'usa', 'united', 'states', 'proud']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-patriot.gif'
}, 'poland': {
  keys: ['polish joke', 'poland', 'crying', 'bottle', 'flag']
  , url: 'http://fi.somethingawful.com/safs/smilies/9/8/poland.001.gif'
}, 'quebec': {
  keys: ['Francophone pride', 'quebec', 'crying', 'poutin', 'flag', 'french']
  , url: 'http://fi.somethingawful.com/safs/smilies/3/d/quebec.001.gif'
}, 'scotland': {
  keys: ['Bonny Bonny Scotland', 'scotland', 'flag', 'crying', 'sheep']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-scotland.gif'
}, 'spain': {
  keys: ['Bulls cry in Spain', 'spain', 'crying', 'bull', 'flag']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-spain.gif'
}, 'sweden': {
  keys: ['Sweden', 'sweden', 'crying', 'bear', 'polar', 'ikea', 'flag', 'sverige']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-sweden.gif'
}, 'tf': {
  keys: ['TF: 1/5/09: NEVER FORGET', 'tf', 'flag', 'gravestone', 'crying']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-tf.gif'
}, 'tito': {
  keys: ['tito', 'tito', 'yugoslavia', 'dictator', 'crying', 'flag']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-tito.gif'
}, 'ussr': {
  keys: ['USSR', 'ussr', 'russia', 'stalin', 'lenin', 'crying', 'flag']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-ussr.gif'
}, '?': {
  keys: ['Question box', '?', 'mario', 'super', 'block', 'mystery']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-question.gif'
}, 'asoiaf': {
  keys: ['hbo\'s game of thrones', 'asoiaf', 'game', 'thrones', 'tv', 'holky', 'fuck', 'holy', 'chair', 'wow']
  , url: 'http://fi.somethingawful.com/safs/smilies/9/7/asoiaf.001.gif'
}, 'axe': {
  keys: ['Axe Maniac', 'axe', 'maniac', 'running', 'game']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-axe.gif'
}, 'bsg': {
  keys: ['So say we all.', 'bsg', 'battlestar', 'galactica', 'tv']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-bsg.gif'
}, 'bubblewoop': {
  keys: ['Bubble Bobble', 'bubblewoop', 'bobble', 'spring', 'woop']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-bubblewoop.gif'
}, 'c': {
  keys: ['poker club', 'c', 'club', 'card', 'deck']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-c.png'
}, 'd': {
  keys: ['poker diamond', 'd', 'diamond', 'card', 'deck']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-d.png'
}, 'doink': {
  keys: ['Doink', 'doink', 'law', 'order', 'tv']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-doink.gif'
}, 'doom': {
  keys: ['RRRRRICHARDS!', 'doom', 'dr', 'doctor', 'marvel', 'comic']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-doom.gif'
}, 'dota101': {
  keys: ['Playing DOTA 101', 'dota101', 'axe', 'game']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-dota101.gif'
}, 'flashfact': {
  keys: ['Flash fact', 'flashfact', 'fact', 'blur', 'teacher', 'stick', 'comic']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-flashfact.gif'
}, 'flashfap': {
  keys: ['Flash loves the ladies', 'flashfap', 'fap', 'wank', 'masturbate', 'jerkoff', 'comic']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-flashfap.gif'
}, 'foxnews': {
  keys: ['LOL Fox News LOL', 'foxnews', 'news']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-foxnews.gif'
}, 'fry': {
  keys: ['Fry saying &quot;Oh Snap!&quot;', 'fry', 'futurama', 'snap', 'oh']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-fry.gif'
}, 'gaben': {
  keys: ['Look at the money you\'re saving.', 'gaben', 'steam', 'valve', 'newell', 'flag', 'crying']
  , url: 'http://fi.somethingawful.com/safs/smilies/6/9/gaben.001.gif'
}, 'golgo': {
  keys: ['Duke Togo Sniper', 'golgo', 'sniper', 'snypa', 'rifle', 'gun', 'comic', 'anime']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-golgo.gif'
}, 'h': {
  keys: ['poker heart', 'h', 'hearts', 'deck', 'card']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-h.png'
}, 'itjb': {
  keys: ['I\'m the juggernaut bitch', 'itjb', 'comic', 'juggernaut', 'helmet']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-itjb.gif'
}, 'jp': {
  keys: ['John Phillipe', 'jp', 'phillipe', 'crab']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-jp.gif'
}, 'kakashi': {
  keys: ['kakashi', 'kakashi']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-kakashi.gif'
}, 'kratos': {
  keys: ['I AM THE GOD OF WAR', 'kratos', 'god', 'war', 'shake', 'fist']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-kratos.gif'
}, 'laugh': {
  keys: ['Laugh', 'laugh', 'dog', 'giggle', 'duck', 'hunt']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-laugh.gif'
}, 'legion': {
  keys: ['Consensus: Death by Gunshot', 'legion', 'mass', 'effect', 'robot', 'rifle', 'sniper', 'sniper', 'gun']
  , url: 'http://fi.somethingawful.com/safs/smilies/e/a/legion.001.gif'
}, 'liara': {
  keys: ['This takes me back...', 'liara', 'mass', 'effect', 'wink', 'eyes']
  , url: 'http://fi.somethingawful.com/safs/smilies/9/9/liara.001.gif'
}, 'lost': {
  keys: ['LOST', 'lost', 'tv']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-lost.gif'
}, 'lovewcc': {
  keys: ['We love Companion Cubes', 'lovewcc', 'portal', 'glomp', 'cube', 'companion', 'hug', 'cuddle']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-lovewcc.gif'
}, 'lron': {
  keys: ['Pyarmid cult Hypno', 'lron', 'scientology', 'l', 'ron', 'hubbard', 'pyramid', 'money', 'scam', '$', 'hypnotize']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-lron.gif'
}, 'mario': {
  keys: ['Mario', 'mario', 'super']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-mario.gif'
}, 'mcnabb': {
  keys: ['Happy Donovan', 'mcnabb', 'donovan']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-mcnabb.png'
}, 'megaman': {
  keys: ['Megaman', 'megaman', 'game', 'rotating']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-megaman.gif'
}, 'nixon': {
  keys: ['Nixon\'s back!', 'nixon', 'crook', 'futurama', 'richard', 'president']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-nixon.gif'
}, 'nolan': {
  keys: ['Let\'s Talk Batman Guys', 'nolan', 'christopher', 'batman', 'director', 'press', 'button', 'push', 'film', 'movie']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-nolan.gif'
}, 'nyan': {
  keys: ['nyan cat', 'nyan', 'cat', 'kitten']
  , url: 'http://fi.somethingawful.com/safs/smilies/0/e/nyan.001.gif'
}, 'orks': {
  keys: ['DAKKA DAKKA DAKKA', 'orks', 'orcs', 'lotr', 'fantasy']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-orks.gif'
}, 'pcgaming1': {
  keys: ['PC Gaming Filez Frog', 'pcgaming1', 'filez', 'files', 'frog', 'tongue', 'gaming', 'download']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-pcgaming1.gif'
}, 'pcgaming': {
  keys: ['HOLY SHIT PC GAMING!', 'pcgaming', 'frog', 'stars', 'eyes', 'dance']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-pcgaming.gif'
}, 'psydwarf': {
  keys: ['Dwarves are maddeningly stupid.', 'psydwarf', 'dwarf', 'dwarves', 'fantasy']
  , url: 'http://fi.somethingawful.com/safs/smilies/f/5/psydwarf.001.png'
}, 'punto': {
  keys: ['buntbuntbunt', 'punto', 'baseball', 'hit', 'bat', 'run']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-punto.gif'
}, 'qfg': {
  keys: ['QFG Hero Dance', 'qfg', 'quest', 'glory', 'dance', 'hero']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-qfg.gif'
}, 'quagmire': {
  keys: ['Quagmire', 'quagmire', 'family', 'guy', 'giggity', 'innuendo', 'sex', 'double', 'entendre']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-quagmire.gif'
}, 'ramsay': {
  keys: ['Gordon Ramsay', 'ramsay', 'cook', 'chef', 'mad', 'angry', 'tv', 'donkey', 'you']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-ramsay.gif'
}, 'retrogames': {
  keys: ['Retro Gooning (Spending Money)', 'retrogames', 'games', 'burning', 'money', 'cash', 'bill']
  , url: 'http://fi.somethingawful.com/safs/smilies/4/a/retrogames.001.gif'
}, 'riot': {
  keys: ['Best online technical', 'riot']
  , url: 'http://fi.somethingawful.com/safs/smilies/f/d/riot.001.gif'
}, 'rolldice': {
  keys: ['totally having fun', 'rolldice', 'dice', 'mad', 'angry', 'shake', 'fist', 'die']
  , url: 'http://fi.somethingawful.com/safs/smilies/5/1/rolldice.001.gif'
}, 's': {
  keys: ['poker spade', 's', 'card', 'deck', 'spade']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-s.png'
}, 'sg': {
  keys: ['Shyguy', 'sg', 'guy', 'game']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-sg.gif'
}, 'shepface': {
  keys: ['Sexing aliens, you say?', 'shepface', 'shepherd', 'mass', 'effect']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-shepface.gif'
}, 'shepicide': {
  keys: ['I have no idea...', 'shepicide', 'shepherd', 'mass', 'effect', 'suicide']
  , url: 'http://fi.somethingawful.com/safs/smilies/8/2/shepicide.001.gif'
}, 'smaug': {
  keys: ['Smaug Smug', 'smaug', 'dragon', 'smug', 'hobbit']
  , url: 'http://fi.somethingawful.com/safs/smilies/a/9/smaug.001.gif'
}, 'spidey': {
  keys: ['My Spidey Sense is tingling', 'spidey', 'spiderman', 'sense', 'tingling', 'comic']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-spidey.gif'
}, 'stat': {
  keys: ['Statler', 'stat', 'muppets', 'puppets', 'old', 'man', 'hector', 'heckle']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-stat.gif'
}, 'steam': {
  keys: ['Steam', 'steam', 'gaben', 'valve', 'games', 'download', 'newell']
  , url: 'http://fi.somethingawful.com/safs/smilies/1/e/steam.001.gif'
}, 'tali': {
  keys: ['Incoming sperg in 5...4...', 'tali', 'mass', 'effect', 'game', 'mystery']
  , url: 'http://fi.somethingawful.com/safs/smilies/f/1/tali.001.gif'
}, 'todd': {
  keys: ['Plagiarism ahoy!', 'todd', 'cat', 'copy']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-todd.gif'
}, 'turianass': {
  keys: ['Turian Airqoute', 'turianass', 'mass', 'effect', 'quote', 'airquote']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-turianass.gif'
}, 'tviv': {
  keys: ['Shit just got real on TV', 'tviv', 'oh', 'holy', 'holky', 'fuck', 'sofa', 'couch', 'knock', 'over']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-tviv.gif'
}, 'tvtropes': {
  keys: ['Unironic boob charts everyday', 'tvtropes', 'tropers', 'tv', 'rape', 'hat']
  , url: 'http://fi.somethingawful.com/safs/smilies/4/d/tvtropes.001.gif'
}, 'twentyfour': {
  keys: ['24 icon for TVIV', 'twentyfour', 'jack', 'bauer']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-twentyfour.gif'
}, 'wal': {
  keys: ['Waldorf', 'wal', 'muppets', 'puppets', 'old', 'man', 'hector', 'heckle']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-wal.gif'
}, 'wcc': {
  keys: ['Weighted Compion Cube', 'wcc', 'cube', 'companion', 'portal']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-wcc.gif'
}, 'wcw': {
  keys: ['Vince makes Sting cry', 'wcw', 'mcmahon', 'wrestling']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-wcw.gif'
}, 'wookie': {
  keys: ['Chewbacca', 'wookie', 'chewie', 'star', 'wars']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-wookie.gif'
}, 'yoshi': {
  keys: ['Yoshi', 'yoshi', 'mario', 'super', 'dinosaur', 'green']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-yoshi.gif'
}, 'zaeed': {
  keys: ['Guddamn terrorists I said.', 'zaeed', 'mass', 'effect', 'sniper', 'rifle', 'gun', 'shoot', 'kill']
  , url: 'http://fi.somethingawful.com/safs/smilies/6/7/zaeed.001.gif'
}, 'zoid': {
  keys: ['Zoidberg', 'zoid', 'futurama', 'octopus', 'tentacles', 'crustacean']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-zoid.gif'
}, '11tea': {
  keys: ['11:00 drink tea every day', '11tea', 'tea', 'kettle', 'coffee']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-11tea.gif'
}, 'a2m': {
  keys: ['Ass to Mouth', 'a2m', 'mouth', 'sex', 'anal', 'fuck']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-a2m.gif'
}, 'am': {
  keys: ['Atomic Monkey', 'am', 'alien', 'ship', 'monkey']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-am.gif'
}, 'awesomelon': {
  keys: ['Awesome Cylon', 'awesomelon', 'cylon', 'battlestar', 'galactica', 'bsg', 'happy']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-awesomelon.gif'
}, 'bahgawd': {
  keys: ['Bah Gawd King!', 'bahgawd', 'by', 'god', 'king', 'shake', 'fist']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-bahgawd.gif'
}, 'bandwagon': {
  keys: ['All Aboard the Bandwagon', 'bandwagon', 'all', 'aboard', 'wagon']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-bandwagon.gif'
}, 'bick': {
  keys: ['aw shit its your boy bick', 'bick', 'pen', 'head', 'gun', 'suicide']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-bick.gif'
}, 'bigtran': {
  keys: ['Bigtran!', 'bigtran', 'lipstick', 'kiss', 'pout', 'tranny', 'transvestite']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-bigtran.gif'
}, 'biotruths': {
  keys: ['because berries', 'biotruths', 'truths', 'berries', 'gmo', 'genetic', 'modified', 'organisms']
  , url: 'http://fi.somethingawful.com/safs/smilies/2/0/biotruths.001.gif'
}, 'btroll': {
  keys: ['Butter Troll', 'btroll', 'troll', 'butter', 'hambeast', 'fatty']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-buttertroll.gif'
}, 'burger': {
  keys: ['have a burger', 'burger', 'cheeseburger']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-burger.gif'
}, 'bustem': {
  keys: ['Chris Costa\'s Bust\'em', 'bustem', 'costa']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-bustem.png'
}, 'byobear': {
  keys: ['Trashcanbear XP SP2', 'byobear', 'bear', 'trashcan', 'tip']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-byobear.gif'
}, 'c00lbutt': {
  keys: ['a star is born', 'c00lbutt', 'colbert', 'coolbutt', 'butt', 'sunglasses', 'shades']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-c00lbutt.gif'
}, 'camera6': {
  keys: ['Worst Case Scenario', 'camera6', '6', 'news', 'channel']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-camera6.gif'
}, 'ccb': {
  keys: ['clown balloon cock', 'ccb', 'balloon', 'baloon', 'cock', 'ejaculate']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-ccb.gif'
}, 'cedric': {
  keys: ['Graham, watch out!', 'cedric', 'kings', 'king\'s', 'quest', 'owl', 'wise', 'advice']
  , url: 'http://fi.somethingawful.com/safs/smilies/e/4/cedric.001.png'
}, 'cenobite': {
  keys: ['We have eternity to know your flesh', 'cenobite', 'bite']
  , url: 'http://fi.somethingawful.com/customtitles/emot-chatter.gif'
}, 'chiefsay': {
  keys: ['Earned them Khaki\'s', 'chiefsay']
  , url: 'http://fi.somethingawful.com/safs/smilies/1/c/chiefsay.001.gif'
}, 'chiyo': {
  keys: ['Some creepy ADTRW thing', 'chiyo', 'rush', 'adtrw', 'anime', 'omg']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-chio.gif'
}, 'circlefap': {
  keys: ['Circle Fap', 'circlefap', 'circlejerk', 'jerkoff', 'fap', 'masturbate', 'wank']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-circlefap.gif'
}, 'coal': {
  keys: ['coal', 'coal', 'cool', 'charcoal']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-coal.gif'
}, 'confuoot': {
  keys: ['why am i tooting', 'confuoot', 'confused', 'party', 'hat', 'toot', '???']
  , url: 'http://fi.somethingawful.com/safs/smilies/0/d/confuoot.001.gif'
}, 'coolfish': {
  keys: ['coolfish', 'coolfish', 'fish', 'sunglasses', 'shades']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-coolfish.gif'
}, 'derp': {
  keys: ['deepa derpa doo', 'derp', 'panic', 'man']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-derp.gif'
}, 'derptiel': {
  keys: ['aka downsparrot', 'derptiel']
  , url: 'http://fi.somethingawful.com/safs/smilies/0/b/derptiel.001.gif'
}, 'dong': {
  keys: ['Dongs', 'dong', 'cock', 'dick', 'waggle', 'penis']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-dong.gif'
}, 'drum': {
  keys: ['Get a move on', 'drum', 'scruff', 'mr']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-drum.gif'
}, 'ducksiren': {
  keys: ['Half the duck, all the sass.', 'ducksiren', 'siren', 'alarm']
  , url: 'http://fi.somethingawful.com/safs/smilies/b/3/ducksiren.001.gif'
}, 'edi': {
  keys: ['That is a joke.', 'edi', 'mass', 'effect', 'joke', 'computer']
  , url: 'http://fi.somethingawful.com/safs/smilies/1/b/edi.001.gif'
}, 'emoticon': {
  keys: ['Hey guys, adbot\'s cool!', 'emoticon', 'byob', 'sucks', 'circlejerk', 'jerk', 'now', 'ahoy']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-emoticon.gif'
}, 'evil': {
  keys: ['It\'s catching on!', 'evil', 'evol', 'love', 'ron', 'paul', 'revolution', 'libertarian']
  , url: 'http://fi.somethingawful.com/customtitles/evol-anim.gif'
}, 'fireman': {
  keys: ['Not worth dying for', 'fireman', 'better', 'worse', 'worth', 'dying', 'for', 'some', 'things']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-fireman.gif'
}, 'flaccid': {
  keys: ['This never happens to me', 'flaccid', 'impotent', 'ed', 'cock', 'penis', 'dick']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-flaccid.gif'
}, 'flag': {
  keys: ['Penalty flag', 'flag']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-flag.gif'
}, 'fork': {
  keys: ['Fork', 'fork']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-fork.png'
}, 'frogdowns': {
  keys: ['Downs Frog', 'frogdowns', 'downs', 'retard', 'stupid']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-frogdowns.png'
}, 'fsn': {
  keys: ['Tribute to LP', 'fsn', 'chef', 'cook', 'knife', 'stab']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-fsn.gif'
}, 'furcry': {
  keys: ['Fursecution is a myth', 'furcry', 'cry', 'flag', 'furry', 'oppression']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-furcry.gif'
}, 'fut': {
  keys: ['Fuck you TROLLS!', 'fut', 'you', 'trolls', 'sonic', 'hedgehog', 'finger', 'bird']
  , url: 'http://fi.somethingawful.com/safs/smilies/f/c/fut.001.gif'
}, 'FYH': {
  keys: ['Fuck You Hannah', 'FYH', 'hannah', 'bacon', 'throwing', 'stop', 'repent', 'you']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-FYH.gif'
}, 'george': {
  keys: ['Gorgeous George', 'george', 'flush', 'toilet', 'tv']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-george.gif'
}, 'gizz': {
  keys: ['Gizz', 'gizz', 'jizz', 'sperm', 'spunk', 'cock', 'penis', 'dick', 'cumshot']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-gizz.gif'
}, 'goleft': {
  keys: ['this ones for microwave', 'goleft', 'square', 'face']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-goleft.gif'
}, 'gonchar': {
  keys: ['he looks like a puffy cow', 'gonchar', 'cow', 'siren', 'spherical']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-gonchar.gif'
}, 'google': {
  keys: ['Google', 'google', 'search']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-google.gif'
}, 'goon': {
  keys: ['This smilie is gay as hell but oh well', 'goon', 'rush', 'grenade', 'omg']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-goon.gif'
}, 'goonboot': {
  keys: ['March of the GoonBoots', 'goonboot', 'boot']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-goonboot.gif'
}, 'gooncamp': {
  keys: ['gooncamp', 'gooncamp', 'camping', 'tent', 'sex', 'private', 'privacy', 'gonk', 'fuck', 'meet', 'goonmeet']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-gooncamp.gif'
}, 'gtfoycs': {
  keys: ['Get the fuck out of YCS', 'gtfoycs', 'get', 'out', 'ycs']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-gtfoycs.gif'
}, 'guitar': {
  keys: ['Jammin\'', 'guitar', 'mr', 'scruff', 'music']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-guitar.gif'
}, 'gurf': {
  keys: ['gurf', 'gurf', 'cat']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-gurf.gif'
}, 'happyelf': {
  keys: ['Warning: Israel-Palestine', 'happyelf', 'terrorism', 'middle', 'east', 'suicide', 'bomber', 'jews', 'israel', 'palestine', 'islam', 'judaism']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-happyelf.gif'
}, 'havlat': {
  keys: ['Martin Havlat for Jesus', 'havlat', 'dance', 'siren']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-havlat.gif'
}, 'hb': {
  keys: ['Henrich Von Bastard', 'hb', 'hellbastard', 'bastard', 'skull', 'green', 'eyes', 'jaw']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-hb.gif'
}, 'hchatter': {
  keys: ['Welcome to FYAD, we fucken loooooove to drink', 'hchatter', 'fyad', 'computer', 'drink', 'chat', 'wine', 'post']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-hchatter.gif'
}, 'hellyeah': {
  keys: ['hell yeah', 'hellyeah', 'unreal', 'railgun', 'yeah']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-hellyeah.gif'
}, 'holymoley': {
  keys: ['Holy Moley!', 'holymoley', 'wink', 'bowtie', 'spin', 'eyes']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-holymoley.gif'
}, 'horse': {
  keys: ['horse gif A+ barbaro RIP', 'horse', 'pony', 'running']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-horse.gif'
}, 'hr': {
  keys: ['Haibane Renmei', 'hr', 'angel', 'wings']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-hr.gif'
}, 'iiaca': {
  keys: ['It is a car analogy', 'iiaca', 'car', 'analogy']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-iiaca.gif'
}, 'ironicat': {
  keys: ['It\'s an ironic cat', 'ironicat', 'cat', 'irony', 'ironic', 'game', 'egyptian']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-ironicat.gif'
}, 'irony': {
  keys: ['Irony Meter', 'irony', 'ironic', 'meter', 'explode']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-irony.gif'
}, 'iw': {
  keys: ['Infinity Ward Robert Bowling', 'iw', 'ward', 'robert', 'bowling', 'dlc', 'spawns']
  , url: 'http://fi.somethingawful.com/safs/smilies/5/d/iw.001.gif'
}, 'jeb': {
  keys: ['Jeb Kerman: Thrillmaster', 'jeb', 'kernman', 'thrillmaster', 'green']
  , url: 'http://fi.somethingawful.com/safs/smilies/a/b/jeb.001.gif'
}, 'joel': {
  keys: ['It\'s Joel de Bunchastu', 'joel', 'de', 'bunchastu']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-joel.gif'
}, 'kamina': {
  keys: ['KYODAI GATTAI!', 'kamina']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-kamina.gif'
}, 'kiddo': {
  keys: ['Innocent youth', 'kiddo', 'big', 'eyes', 'face']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-kiddo.gif'
}, 'killdozer': {
  keys: ['legends never die', 'killdozer', 'bulldozer', 'wall', 'crush']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-killdozer.gif'
}, 'krad': {
  keys: ['Kickin\' Rad (Oldschool)', 'krad', 'radical']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-krad2.gif'
}, 'krakken': {
  keys: ['The Krakken', 'krakken', 'monster', 'sea', 'waves']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-kraken.gif'
}, 'love': {
  keys: ['Love heart', 'love', 'heart']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-love.gif'
}, 'madmax': {
  keys: ['Mad Max', 'madmax', 'bandana', 'grin', 'face']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-madmax.gif'
}, 'manning': {
  keys: ['Santana Moss and Jabar Gaffney?', 'manning']
  , url: 'http://fi.somethingawful.com/safs/smilies/2/3/manning.001.gif'
}, 'mason': {
  keys: ['Masonic', 'mason', 'conspiracy', 'freemasons', 'illuminati']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-mason.gif'
}, 'milk': {
  keys: ['YOU DUMBASS!', 'milk', 'dumbass']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-milk.gif'
}, 'monar': {
  keys: ['MONAR?!?!', 'monar', 'cat', 'dance']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-monar.gif'
}, 'moustache': {
  keys: ['It is a moustache', 'moustache', 'mustache', 'ghost']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-moustache.gif'
}, 'mufasa': {
  keys: ['Mufasa', 'mufasa', 'lion', 'king', 'simba']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-mufasa.png'
}, 'negative': {
  keys: ['NegativeMan', 'negative', 'golden', 'yellow', 'block', 'man', 'knees', 'sad', 'hands']
  , url: 'http://fi.somethingawful.com/images/smilies/negativeman-55f.png'
}, 'notfunny': {
  keys: ['DocEvil', 'notfunny', 'evil', 'dr', 'doctor']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-notfunny.gif'
}, 'nyoron': {
  keys: ['smoked cheese', 'nyoron', 'cute', 'anime', 'girl', 'green', 'hair']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-nyoron.gif'
}, 'objection': {
  keys: ['That was.. objectionable!', 'objection', 'phoenix', 'wright', 'ace', 'attorney', 'game']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-objection.gif'
}, 'ovr': {
  keys: ['YOSPOS, BITCH', 'ovr', 'cursor', 'blink', 'green', 'command', 'prompt', 'yospos']
  , url: 'http://fi.somethingawful.com/safs/smilies/c/e/ovr.001.gif'
}, 'page3': {
  keys: ['page 3 conspiracy', 'page3', '3', 'conspiracy', 'second', 'gunman', 'snypa', 'sniper', 'gun', 'rifle']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-page3.gif'
}, 'phone': {
  keys: ['i wanna talk to my daddy', 'phone', 'call', 'ring', 'talk', 'telephone', 'chat']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-phone.gif'
}, 'phoneb': {
  keys: ['hello have a nice day', 'phoneb', 'call', 'ring', 'talk', 'telephone', 'chat']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-phoneb.gif'
}, 'phoneline': {
  keys: ['Reach out &amp; touch someone', 'phoneline', 'line']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-phoneline.gif'
}, 'pipe': {
  keys: ['Sophistication!', 'pipe', 'smoke', 'puff']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-pipe.gif'
}, 'pluto': {
  keys: ['Still a planet to us', 'pluto', 'planet', 'dog', 'disney', 'crying', 'astrology', 'cosmology', 'solar', 'system']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-pluto.gif'
}, 'pranke': {
  keys: ['Prankeapple', 'pranke', 'apple']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-pranke.gif'
}, 'psyberger': {
  keys: ['AAAAAAAAAAGGGG', 'psyberger', 'asberger', 'aspberger', 'bewildered', 'confused', 'comprehend']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-psyberger.gif'
}, 'psyduck': {
  keys: ['Psy-yi-yi', 'psyduck', 'bewildered', 'confused', 'comprehend', 'duck']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-psyduck.gif'
}, 'psylon': {
  keys: ['This fracking show!', 'psylon', 'bsg', 'battlestar', 'galactica', 'cylon', 'show', 'fracking']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-psylon.gif'
}, 'psypop': {
  keys: ['PSY EXPLOSION', 'psypop', 'psyduck', 'eyes', 'pop', 'confused', 'comprehend', 'bewildered']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-psypop.gif'
}, 'pt': {
  keys: ['Only option', 'pt', 'install', 'linux', 'cd', '16', 'weight', 'reinstall', 'pc', 'computer']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-onlyoption.gif'
}, 'q': {
  keys: ['Q', 'q', 'creepy', 'grin', 'face', 'smile']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-q.gif'
}, 'qirex': {
  keys: ['Qirex', 'qirex']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-qirex.gif'
}, 'ranbowdash': {
  keys: ['It\'s gonna be SO Awesome!', 'ranbowdash', 'rainbowdash', 'brony', 'mlp', 'pony', 'my', 'little', 'bronies', 'horse']
  , url: 'http://fi.somethingawful.com/safs/smilies/7/e/ranbowdash.001.png'
}, 'redhammer': {
  keys: ['The Red Hammer (another waste of money)', 'redhammer', 'hammer', 'banhammer']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-redhammer.gif'
}, 'rice': {
  keys: ['Ricer', 'ricers', 'cars', 'race', '2', '2fast2furious', 'furious', 'fast']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-rice.gif'
}, 'riker': {
  keys: ['Riker leads the away team', 'riker', 'star', 'trek', 'commander', 'grin', 'smile']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-riker.gif'
}, 'rudebox': {
  keys: ['Shake ya Rudebox!', 'rudebox', 'robbie', 'williams', 'shake', 'box']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-rudebox.gif'
}, 'russbus': {
  keys: ['the russ buss', 'russbus', 'bus', 'all', 'aboard', 'byob']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-russbus.gif'
}, 'sax': {
  keys: ['Something so monumentally lame that I can\'t even comprehend it', 'saxophone', 'yakkity', 'mr', 'scruff', 'saxaphone']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-sax.gif'
}, 'sharpton': {
  keys: ['Reverend Alfred \'Al\' Sharpton', 'sharpton', 'black', 'man', 'guy', 'albert']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-sharpton.gif'
}, 'shibaz': {
  keys: ['shibaz 101', 'shibaz']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-shibaz.png'
}, 'shopkeeper': {
  keys: ['Hello THIEF!', 'shopkeeper']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-shopkeeper.gif'
}, 'signings': {
  keys: ['Psynings', 'signings', 'psyduck', 'money', 'cash', 'eyes']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-signings.gif'
}, 'sissies': {
  keys: ['D&amp;D at it\'s best', 'sissies', 'gay', 'touch', 'pussy', 'sissy']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-sissies.gif'
}, 'slick': {
  keys: ['You gotta', 'slick', 'dance', 'dancing', 'guy', 'man']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-slick.gif'
}, 'smugbird': {
  keys: ['Smug Orioles Bird', 'smugbird', 'bird', 'orioles']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-smugbird.gif'
}, 'smugdroid': {
  keys: ['the definition of open', 'smugdroid', 'droid', 'android', 'smartphone', 'phone', 'open', 'source']
  , url: 'http://fi.somethingawful.com/safs/smilies/5/9/smugdroid.001.png'
}, 'smugndar': {
  keys: ['larasndar', 'smugndar', 'ndar']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-smugndar.gif'
}, 'smugteddie': {
  keys: ['Teddie from Persona 4', 'smugteddie', 'persona', 'teddie']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-smugteddie.gif'
}, 'snoop': {
  keys: ['snoop.gif', 'snoop', 'dance', 'drop', 'hot', 'dogg']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-snoop.gif" title="snoop.gif'
}, 'solanadumb': {
  keys: ['are u a bark bark', 'solanadumb', 'dog']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-solanadumb.png'
}, 'sonia': {
  keys: ['Sonia from DPPH', 'sonia', 'boobs', 'tits', 'shirt', 'tshirt', 't-shirt', 'reveal', 'expose']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-sonia.gif'
}, 'sotw': {
  keys: ['Smilie of the Week', 'sotw', 'two', 'heads', 'slapping', 'hands']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-sotw.gif'
}, 'spergin': {
  keys: ['Asperger Syndrome', 'spergin', 'aspergers', 'aspbergers', 'white', 'face']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-spergin.png'
}, 'spooky': {
  keys: ['Spooky', 'spooky', 'pumpkin', 'spinning', 'scary', 'halloween', 'haloween']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-spooky.gif'
}, 'stalker': {
  keys: ['creepy stalker thing', 'stalker', 'bush', 'binoculars', 'spy', 'girls']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-stalker.gif'
}, 'sugartits': {
  keys: ['Censored', 'sugartits', 'party', 'toot']
  , url: 'http://fi.somethingawful.com/safs/smilies/a/c/sugartits.001.png'
}, 'synpa': {
  keys: ['first post on page 2!!!!', 'synpa', 'page', '2', 'sniper', 'gun', 'rifle']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-synpa.gif'
}, 'syoon': {
  keys: ['Syo Swooning', 'syoon', 'swoon', 'eyes', 'love', 'infatuated', 'tongue']
  , url: 'http://fi.somethingawful.com/safs/smilies/d/2/syoon.001.gif'
}, 'taco': {
  keys: ['Taco', 'taco', 'food']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-taco.gif'
}, 'tastykake': {
  keys: ['PHILLY WHAT', 'tastykake', 'kake', 'cake']
  , url: 'http://fi.somethingawful.com/safs/smilies/5/c/tastykake.001.gif'
}, 'tbear': {
  keys: ['Trashbear', 'tbear', 'trash', 'bear', 'tip', 'rubbish', 'bin', 'garbage']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-trashbear.gif'
}, 'techno': {
  keys: ['technobabble', 'techno', 'words', 'babble', 'star', 'trek', 'geordi', 'la', 'forge']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-techno.gif'
}, 'thurman': {
  keys: ['Thurman football dude', 'thurman', 'football', 'ball']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-thurman.gif'
}, 'toughguy': {
  keys: ['Internet Tough Guy', 'toughguy', 'bat', 'whack', 'hit', 'thump', 'threaten']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-toughguy.gif'
}, 'toxx': {
  keys: ['Toxx Clause', 'toxx', 'clause', 'radioactive', 'goo', 'slime']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-toxx.gif'
}, 'tubular': {
  keys: ['Tubular, Dude.', 'tubular', 'surf', 'green', 'wave']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-tubular.gif'
}, 'uhaul': {
  keys: ['Uhaul for leaving TFR', 'uhaul', 'tfr', 'guns', 'suicide', 'redneck', 'cowboy', 'truck', 'u-haul']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-uhaul.gif'
}, 'vick': {
  keys: ['kicks a touchdown', 'vick', 'michael', 'football']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-vick.gif'
}, 'viconia': {
  keys: ['bad moon rising', 'viconia', 'moon', 'crescent']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-viconia.gif'
}, 'viggo': {
  keys: ['Smug scholar', 'viggo', 'teacher', 'professor', 'stick']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-viggo.gif'
}, 'whatup': {
  keys: ['sup', 'whatup', 'up', 'black', 'gold', 'grin', 'guy', 'man']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-whatup.gif'
}, 'wink': {
  keys: ['wink', 'wink', 'eyes']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-wink.gif'
}, 'wmwink': {
  keys: ['The mouth to wink', 'wmwink', 'mouth', 'wink', 'alfred', 'neuman', 'tooth', 'gap']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-wmwink.png'
}, 'wom': {
  keys: ['WOM WOM WOM WOM', 'wom']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-wom.gif'
}, 'woof': {
  keys: ['God Woof! Woof! is a Fag', 'woof', 'dog', 'bark']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-woof.gif'
}, 'wooper': {
  keys: ['woopaaaah woopaaaaah', 'wooper']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-wooper.gif'
}, 'xie': {
  keys: ['Yanks postseason troubles', 'xie', 'new', 'york', 'yankees', 'baseball']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-xie.gif'
}, 'zerg': {
  keys: ['ZERG RUSH!!!', 'zerg', 'omg', 'rush']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-zerg.gif'
}, '2bong': {
  keys: ['TWO BONGS AT ONCE', '2bong', 'weed', 'marijuana', 'thc', 'bongs', 'drugs', 'high', '420']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-2bong.png'
}, '350': {
  keys: ['shivadas', '350', 'smoke', 'weed', 'meth', 'toke', 'marijuana', 'thc', 'crack', 'drugs', 'heroin', 'pipe', 'high']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-350.gif'
}, '420': {
  keys: ['Some horrible drug thing!', '420', 'weed', 'marijuana', 'cannabis', 'ganja', 'thc', 'leaves', 'leaf']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-weed.gif'
}, 'catdrugs': {
  keys: ['CAT DRUGS', 'catdrugs', 'catnip', 'drugs', 'kitten']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-catdrugs.gif'
}, 'chillpill': {
  keys: ['Chill your pill dude', 'chillpill', 'pill', 'relax']
  , url: 'http://fi.somethingawful.com/safs/smilies/3/2/chillpill.001.gif'
}, 'dominic': {
  keys: ['repurchase Dominic', 'dominic', 'gay', 'rainbow', 'dude', 'guy']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-dominic.gif'
}, 'drugnerd': {
  keys: ['Good nerds got the hookup', 'drugnerd', 'nerd', 'chemicals', 'chemist', 'scientist', 'beaker', 'drugs', 'science']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-drugnerd.gif'
}, 'lsd': {
  keys: ['Ingestion of LSD', 'lsd', 'acid', 'tripping', 'lysergic', 'psychedelic']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-lsd.gif'
}, 'obama': {
  keys: ['Obama is 44th', 'obama', 'barack', 'president', '44', 'potusa']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-obama.gif'
}, 'okpos': {
  keys: ['stare with a bong', 'okpos', 'eyes', 'bong', 'high', 'smoke', 'toke', 'pipe']
  , url: 'http://fi.somethingawful.com/safs/smilies/1/b/okpos.001.gif'
}, 'shroom': {
  keys: ['Flashing Mushroom', 'shroom', 'mushroom', 'high', 'psylocibin', 'psychedelic']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-shroom.gif'
}, 'tinsley': {
  keys: ['Glug glug glug, time to write a strip', 'tinsley', 'bruce', 'mallard', 'fillmore', 'duck', 'drunk', 'drink', 'beer', 'comic', 'political', 'quack']
  , url: 'http://fi.somethingawful.com/customtitles/eris/classic_fillmore.gif'
}, 'weed': {
  keys: ['A ball of weed', 'weed']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-weed.gif'
}, 'agesilaus': {
  keys: ['Smug about Sparta', 'agesilaus', 'sparta', 'wreath', 'face', 'laurels']
  , url: 'http://fi.somethingawful.com/safs/smilies/7/2/agesilaus.001.png'
}, 'catbert': {
  keys: ['Catstare. Bert.', 'catbert', 'bert', 'stare', 'arms', 'crossed']
  , url: 'http://fi.somethingawful.com/safs/smilies/2/3/catbert.001.gif'
}, 'corrupt': {
  keys: ['what\'s wrong?', 'corrupt', 'wink', 'eyes']
  , url: 'http://fi.somethingawful.com/safs/smilies/9/e/corrupt.001.gif'
}, 'cult': {
  keys: ['wearepedostate', 'cult']
  , url: 'http://fi.somethingawful.com/safs/smilies/5/2/cult.001.jpg'
}, 'devilchild': {
  keys: ['Israel-Palestine Discussion', 'devilchild', 'wall', 'jewish', 'judaism', 'build', 'repair', 'palestine']
  , url: 'http://fi.somethingawful.com/safs/smilies/8/7/devilchild.001.gif'
}, 'freep': {
  keys: ['All the worst parts of the Right', 'freep', 'free', 'republic', 'right', 'wing', 'eagle', 'shake', 'fist']
  , url: 'http://fi.somethingawful.com/safs/smilies/9/e/freep.001.gif'
}, 'frogon': {
  keys: ['please vacate the premises', 'frogon', 'go', 'on']
  , url: 'http://fi.somethingawful.com/safs/smilies/a/e/frogon.001.png'
}, 'guinness': {
  keys: ['Drink up!', 'guinness', 'beer', 'drink', 'guiness']
  , url: 'http://fi.somethingawful.com/safs/smilies/2/0/guinness.001.gif'
}, 'hirez': {
  keys: ['hirez  game studios', 'hirez', 'push', 'press', 'button', 'game']
  , url: 'http://fi.somethingawful.com/safs/smilies/8/7/hirez.001.gif'
}, 'ins': {
  keys: ['Insert', 'ins', 'cursor', 'blink', 'green', 'command', 'prompt', 'yospos', 'line']
  , url: 'http://fi.somethingawful.com/safs/smilies/1/5/ins.001.gif'
}, 'justpost': {
  keys: ['Just fucking post it already!', 'justpost', 'post']
  , url: 'http://fi.somethingawful.com/safs/smilies/9/e/justpost.001.gif'
}, 'krakentoot': {
  keys: ['Beat like a red headed stepchild', 'krakentoot', 'party', 'toot', 'note', 'musical']
  , url: 'http://fi.somethingawful.com/safs/smilies/d/f/krakentoot.001.gif'
}, 'mensch': {
  keys: ['Iraqi Information Minister', 'mensch']
  , url: 'http://fi.somethingawful.com/safs/smilies/8/e/mensch.001.gif'
}, 'mil101': {
  keys: ['Goddam civilians don\'t know shit', 'mil101', 'military', 'gip', 'soldier', 'teach', 'stick', 'knowledge']
  , url: 'http://fi.somethingawful.com/safs/smilies/5/9/mil101.001.gif'
}, 'newt': {
  keys: ['Smug Newt (Gingrich)', 'newt', 'smug', 'gingrich']
  , url: 'http://fi.somethingawful.com/images/smilies/emot-newt.png'
}, 'notch': {
  keys: ['Notch of Minecraft fame', 'notch', 'minecraft', 'game', 'cross', 'burn']
  , url: 'http://fi.somethingawful.com/safs/smilies/e/1/notch.001.png'
}, 'ocelot': {
  keys: ['You\'re pretty good!', 'ocelot', 'hands', 'mgs', 'metal', 'gear', 'revolver', 'point', 'good']
  , url: 'http://i.somethingawful.com/forumsystem/emoticons/emot-ocelot.gif'
}, 'patssay': {
  keys: ['Average Patriots fan', 'patssay', 'patriots', 'fan', 'football']
  , url: 'http://fi.somethingawful.com/safs/smilies/c/8/patssay.001.gif'
}, 'pgi': {
  keys: ['Cause PGI!', 'pgi']
  , url: 'http://fi.somethingawful.com/safs/smilies/a/2/pgi.001.gif'
}, 'radcat': {
  keys: ['oh no oh no i am a rad cat', 'radcat', 'cat', 'sunglasses', 'shades', 'radical', 'cool']
  , url: 'http://fi.somethingawful.com/safs/smilies/a/0/radcat.001.png'
}, 'rms2': {
  keys: ['Free as in Freedom', 'rms2', 'richard', 'stallman', 'gnu', 'halo']
  , url: 'http://fi.somethingawful.com/safs/smilies/2/2/rms2.001.png'
}, 'rory': {
  keys: ['rainbow', 'rory']
  , url: 'http://fi.somethingawful.com/images/smilies/rainbow.gif'
}, 'russo': {
  keys: ['Vince Russo', 'russo', 'type', 'computer']
  , url: 'http://fi.somethingawful.com/safs/smilies/2/e/russo.001.gif'
}, 'shibewow': {
  keys: ['so text', 'shibewow', 'funy', 'funny', 'laghs', 'laughs', 'all', 'wow']
  , url: 'http://fi.somethingawful.com/safs/smilies/a/5/shibewow.001.gif'
}, 'smithcloud': {
  keys: ['iCloud icon with :smith:', 'smithcloud', 'cloud', 'unhappy']
  , url: 'http://fi.somethingawful.com/safs/smilies/8/9/smithcloud.001.gif'
}, 'smugwizard': {
  keys: ['Smug Wizard', 'smugwizard', 'wizard']
  , url: 'http://fi.somethingawful.com/safs/smilies/2/b/smugwizard.001.png'
}, 'tfrxmas': {
  keys: ['self explanatory', 'tfrxmas', 'xmas', 'mad', 'angry', 'santa', 'hat', 'gun', 'rifle', 'firearm']
  , url: 'http://fi.somethingawful.com/safs/smilies/a/6/tfrxmas.001.gif'
}, 'thx': {
  keys: ['bwaaaaa-eeeeeerrrrrrrrrrrrrrr', 'thx', 'sound']
  , url: 'http://fi.somethingawful.com/safs/smilies/3/3/thx.001.gif'
}, 'wiggle': {
  keys: ['doin the wily', 'wiggle', 'eyebrows']
  , url: 'http://fi.somethingawful.com/safs/smilies/3/3/wiggle.001.gif'
}, 'wow': {
  keys: ['Wolf Blitzer', 'wow', 'blitzer', 'cnn']
  , url: 'http://fi.somethingawful.com/safs/smilies/b/0/wow.001.gif'
}, 'woz': {
  keys: ['the Woz rules', 'woz', 'apple', 'flag', 'crying', 'wozniak', 'steve']
  , url: 'http://fi.somethingawful.com/safs/smilies/8/b/woz.001.gif'
}, 'xcom': {
  keys: ['baby', 'xcom']
  , url: 'http://fi.somethingawful.com/safs/smilies/e/a/xcom.001.gif'
}, 'yayclod': {
  keys: ['Some kind of happy cloud thing', 'yayclod', 'happy', 'cloud']
  , url: 'http://fi.somethingawful.com/safs/smilies/0/7/yayclod.001.png'
}, 'yaycloud': {
  keys: ['The cloud touches us everywhere', 'yaycloud', 'happy', 'cloud']
  , url: 'http://fi.somethingawful.com/safs/smilies/a/4/yaycloud.001.gif'
}, 'yosbutt': {
  keys: ['i drop jorts+shake my neg ass @u', 'yosbutt', 'yospos', 'butt', 'ass', 'arse', 'wiggle']
  , url: 'http://fi.somethingawful.com/safs/smilies/5/8/yosbutt.001.gif'
}, 'zpatriot': {
  keys: ['Zombie Patriot', 'zpatriot', 'patriot', 'salute', 'flag']
  , url: 'http://fi.somethingawful.com/safs/smilies/5/d/zpatriot.001.gif'
}
};