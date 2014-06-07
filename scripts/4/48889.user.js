// ==UserScript==
// @name          Whirlpool Plus
// @namespace     WhirlpoolPlus
// @description   Adds a suite of extra optional features to the Whirlpool forums.
// @version       3.9.6
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @require       http://google-code-prettify.googlecode.com/svn/trunk/src/prettify.js
// @require       http://google-code-prettify.googlecode.com/svn/trunk/src/lang-css.js
// @require       http://google-code-prettify.googlecode.com/svn/trunk/src/lang-sql.js
// @require		  http://wp.tristanroberts.name/jqDnR.js.php?version=396.01
// @include       http://forums.whirlpool.net.au/*
// @include       http://bc.whirlpool.net.au/*
// @include       http://whirlpool.net.au/*
// @exclude       http://forums.whirlpool.net.au/whim-send*
// @exclude       http://forums.whirlpool.net.au/forum-replies.cfm*p=-2*
// @exclude       http://forums.whirlpool.net.au/forum-replies.cfm*&ux* 
// @exclude       http://forums.whirlpool.net.au/forum-replies-print.cfm*
// @exclude       http://forums.whirlpool.net.au/forum-replies-archive.cfm*
// @resource	  emoticon_angry	http://wp.tristanroberts.name/images/3.9/emoticons/Angry.png
// @resource	  emoticon_blushing	http://wp.tristanroberts.name/images/3.9/emoticons/Blushing.png
// @resource	  emoticon_confused	http://wp.tristanroberts.name/images/3.9/emoticons/Confused.png
// @resource	  emoticon_cool		http://wp.tristanroberts.name/images/3.9/emoticons/Cool.png
// @resource	  emoticon_cry		http://wp.tristanroberts.name/images/3.9/emoticons/Crying.png
// @resource	  emoticon_frown	http://wp.tristanroberts.name/images/3.9/emoticons/Frown.png
// @resource	  emoticon_gasp		http://wp.tristanroberts.name/images/3.9/emoticons/Gasp.png
// @resource	  emoticon_grin		http://wp.tristanroberts.name/images/3.9/emoticons/Grin.png
// @resource	  emoticon_kiss		http://wp.tristanroberts.name/images/3.9/emoticons/Kiss.png
// @resource	  emoticon_lips		http://wp.tristanroberts.name/images/3.9/emoticons/Lips-Are-Sealed.png
// @resource	  emoticon_shout	http://wp.tristanroberts.name/images/3.9/emoticons/Shouting.png
// @resource	  emoticon_sleep	http://wp.tristanroberts.name/images/3.9/emoticons/Sleeping.png
// @resource	  emoticon_smile	http://wp.tristanroberts.name/images/3.9/emoticons/Smile.png
// @resource	  emoticon_smirk	http://wp.tristanroberts.name/images/3.9/emoticons/Smirk.png
// @resource	  emoticon_straight	http://wp.tristanroberts.name/images/3.9/emoticons/Straight.png
// @resource	  emoticon_tongue	http://wp.tristanroberts.name/images/3.9/emoticons/Tongue.png
// @resource	  emoticon_wink		http://wp.tristanroberts.name/images/3.9/emoticons/Wink.png
// @resource	  emoticon_star		http://wp.tristanroberts.name/images/3.9/emoticons/star.png
// ==/UserScript==
// Some icons from http://www.pinvoke.com/
// For information on bugs, see http://code.google.com/p/whirlpool-plus/issues/list
// ==Changes==
/***************
changes - 3.0.4 - fixed bug where clicking the "i" link next to a users name multiple times opened multiple boxes. Fixed a bug with the auto update.
changes - 3.0.5 - fixed an issue with the userpage/no of days feature.
changes - 3.0.6 - fixed an issue with the userpage/no of days feature (2nd go). Fixed an issue with 'mark as read' feature. Added avatars to whims.
changes - 3.0.7 - fixed tracking issue (i think). Fixed animated avatars issue (i think). Added smileys. Fixed Rep, Mod, Print View, Thread Archive links. 
Fixed too many Your Links problem (overflow scroll). Fixed glitch when your own post is deleted. Fixed a glitch when the last post was deleted. Fixed a problem with the auto-update.
changes - 3.0.8 - Fixed problem with settings box and small resolution. Added small resolution toggle feature to user page. Added whirlcode buttons to reply page.
changes - 3.0.9 - Fixed user ignore.
changes - 3.1.0 - Full size inline images are now shown on the same page when clicked. Spinner menu positioned just to the right of the left page menu.
changes - 3.1.1 - Fixed a problem with external links.
changes - 3.1.2 - Tweaked full size inline images feature. Fixed glitch with spinner menu.
changes - 3.1.3 - Fixed spinner (2nd go).
changes - 3.1.4 - Fixed avatars in whims.
changes - 3.1.5 - Fixed problem with too many links in Your Links section (i think).
changes - 3.1.6 - Fixed spinner (3rd go).
changes - 3.1.7 - Post align option. Chatbox rules link. Mark as read fixed (i think)
changes - 3.1.8 - Fixed userpage days glitch.
changes - 3.1.9 - Update for Simon's changes http://forums.whirlpool.net.au/forum-replies.cfm?t=530906&p=37#r733.
changes - 3.2.0 - Update 2 for Simon's changes http://forums.whirlpool.net.au/forum-replies.cfm?t=530906&p=37#r733.
changes - 3.2.1 - Fixed edit in place second edit error. Made user notes text box larger and added different icon if usernote available for user. 
Added a debug mode. Added static iced whirlcode. Fixed default userdays number. Added focused thread reminder.
changes - 3.2.2 - Fixed Your Links glitch.
changes - 3.2.3 - Removed some mark as read code that was causing problems.
changes - 3.2.4 - Added an option to import user notes from older script (pre 3.0).
changes - 3.2.5 - Fixed userpage back button issue.
changes - 3.2.6 - Fixed mark as read feature.
changes - 3.2.7 - Fixed users online page glitch.
changes - 3.2.8 - Removed the shock smiley.
changes - 3.2.9 - Focused thread opacity thingo.
changes - 3.3.0 - Updated for Simon's url changes.
changes - 3.4.0 - Now maintained by Troberto, Chatbox removed
changes - 3.4.1 - Chatbox setting removed
changes - 3.4.2 - Fixed smilies, hosted images, Spelling
changes - 3.4.3 - Fixed Your Votes page & Dynamic Menu links.
changes - 3.5.0 - New Features: Floating Sidebar, Sidebar Notes, Numerous bug fixes
changes - 3.5.1 - Wide Whirlpool support w/ floating sidebar
changes - 3.5.2 - WP Green (by Polish Dude) added, Typo fixed
changes - 3.5.3 - Whim Whirlcode removed, Whim preview removed
changes - 3.5.4 - Completely removed Your Links (which is now dead)
changes - 3.5.5 - Update for Somon's (minor) URL change.  Enhanced deletedThreadCacheLink()
changes - 3.5.6 - OK, let's try that again. Rewrote deletedThreadCacheLink() function.
changes - 3.6.0 - Fixed overflow bug with wide whirlpool & images, fixed cursor, fixed flickR links, fixed Wikipedia links, fixed image links, enhanced Vimeo links (minor), added Long Thread link
changes - 3.6.1 - Improved IRC links, Fixed themes, Enhanced updater
changes - 3.6.5 - Added average posts per day. Added Watched Thread redirect. Added No Text Shadow.
changes - 3.6.6 - Added Hide Deleted Posts. Added purple theme (by polish dude). Fixed bug with editInPlace (not rewritten).
changes - 3.6.7 - Enhanced code prettifier (improved language support).  Improved Posts per day.
changes - 3.6.8 - Fixed posts per day.
changes - 3.7.0 - Added chatbox.
changes - 3.7.1 - Added setting for the chatbox.
changes - 3.7.2 - Fixed the lockups (due to syntax highlighting).
changes - 3.8.0 - Added My Links. Added another option for avatars.  Improved updater.
changes - 3.8.5 - Patched rep posts bug, Fixed Watched Threads redirect, Added notifications.
changes - 3.8.6 - Fixed My Links
changes - 3.8.7 - Made My Links go under chatbox (if enabled).
changes - 3.8.8 - Fixed errors.
changes - 3.8.9 - Fixed floating sidebar.
changes - 3.9.0 - Increased performance, rewrote updater, fixed typos, fixed floating sidebar bugs, new emoticons, added Whim Archive sorter (by Yansky), fixed poll bug, fixed video bug, fixed avatar bug, fixed wikipedia bug, added inline pages, added simple backup.
changes - 3.9.1 - Emoticons show on reply pages, syntax highlighting works on reply pages (improved aswell), improved emoticons (not showing in lists,etc), added Unanswered threads, added OP Only View.
changes - 3.9.2 - Added second avatar server, removed Sidebar Notes and My Links, cleaned up settings HTML, minor code cleanups.
changes - 3.9.3 - Added wrppaers for easier porting in the future, fixed avatar bug (thanks Micah), fixed bug with page titles (thanks Yansky), added warning regarding sidebar (thanks Nukkels).
changes - 3.9.4 - Rewrote some code for better performance, fixed floating sidebar bug, improved posts per day
changes - 3.9.5 - Fixed major bug with emoticons, floating sidebar, posts per day and more. Fixed floating sidebar and non-widescreen, improved settings.
changes - 3.9.6 - Updated some settings text, fixed URLs
changes - 3.9.6 - SZ: (Anywho) Patched for off-by-one issue and "1 posts" unread being shown as "0 posts" unread
***************/
// ==/Changes==

try{

	var version = '3.9.6';
	
	var Whirlpool = {
		/**
			The current page URL.
			@var	(string)
		*/
		'url'		:	document.location.toString(),
		/**
			Returns the stored value.
			@param	name	(string) The name of the stored value.
			@return	(mixed) The stored value or, on error, (default) false.
			@see	Whirlpool.set()
		*/
		'get'		:	function(name) {
			var value	= GM_getValue(name, false);
			return(value);
		},
		'set'		:	function(name, value) {
			GM_setValue(name, value);
		},
		/**
			Returns a list of stored values.
			@return	(bool) true on success, false on error.
		*/
		'list'		:	function( ) {
			return GM_listValues( );
		},
		/**
			Adds CSS styles to the HEAD of the document.
			@param	styles	(string) The CSS to insert.
		*/
		'css'		:	function(styles) {
			GM_addStyle( styles );
		},
		/**
			@todo	document
		*/
		'image'		:	function(resource) {
			return(GM_getResourceURL(resource));
		},
		/**
			Sends and XML HTTP Request with the desired configuration.
			@param	config	(array) The configuration, see @api.
			@api	http://wiki.greasespot.net/GM_xmlhttpRequest
			@return	(object) The XML HTTP Request.
		*/
		'ajax'		:	function( config ) {
			return GM_xmlhttpRequest( config );
		},
		/**
			Sends, and receives a simple XML HTTP Request.
			@param	url		(string) The URL to send the request to.
			@param	action	(function) The callback function.  The request data is available as a function parameter.
			@status	DEPRECATED
		*/
		'HttpRequest'		:	function(url, action) {
			Whirlpool.ajax({
				method: 'GET',
				url: url,
				headers: {
					'User-Agent': 'Mozilla/5.0',
					'Accept': 'text/xml'
				},
				onload: action
			});
		},
		/** 
			Whether a notification has already been displayed.
			@var	(bool)
			@type	private
		*/
		'_notified'	:	false,
		/**
			Sends a notification to the user in a universal style.  Two display options are available depending on importance.
			@param	message		(string) The message to display. Note: " (close)" will be appended to the message.
			@param	important	(bool) Whether the message is important.  true = orange, false = black
			@param	duration	(int) The duration, in seconds, to display the message for.  Note:  The user can also click the message to hide it.
		*/
		'notify'	:	function(message, important, duration) {
			if (important == true) {
				var color		= 'black';
				var background	= 'orange';
				var opacity		= '0.9';
			} else {
				var color		= 'white';
				var background	= 'black';
				var opacity		= '0.9';
			}
			if (!Wp._notified) {
				$('head').append('<style type="text/css">.wpplus_notify{ width: 85%; height: 20px; background-color: ' + background + '; opacity: ' + opacity + '; position: fixed; top: 25px; left: 7.5%; z-index: 500; -moz-border-radius: 10px; padding-top: 7px; text-align: center; color: ' + color + '} .wpplus_notify:hover{ cursor: pointer; }</style>');
				Wp._notified = true;
			}
			$('body').prepend('<div class="wpplus_notify">' + message + ' (close)</div>');
			$('.wpplus_notify').click(function(e) {
				$(this).fadeOut();
			});
			setTimeout(function(){
				$('.wpplus_notify').fadeOut();
			}, duration);
		}
	};
	
	var user = {
		'name'	:	'',
		'id'	:	0
	};
	
	if (!Whirlpool.url.match('alert')) {
		user.name = $('.userinfo dt:first').text();
		user.id	  = user.name.split('#')[1];
	}
	
	var Wp		 = Whirlpool;
	
	/*! Posts Per Day */
	/**
		Calculates a posts per day statistic on a user page.
		@author		Troberto
		@date		2009-12-23
		@version	3.9.4
		@runson		User pages
	*/
	if ( Whirlpool.get( "postsPerDay" ) == "true" && !Whirlpool.url.match('action=') && Whirlpool.url.match( "user" ) ) {
		var posts	= $('td:contains("Post count")').next('td').text();
		
		var split		= $('td:contains("Joined")').next('td').text().split(' ');
		var months		= {
			'January'	:	0,
			'February'	:	1,
			'March'		:	2,
			'April'		:	3,
			'May'		:	4,
			'June'		:	5,
			'July'		:	6,
			'August'	:	7,
			'September'	:	8,
			'October'	:	9,
			'November'	:	10,
			'December'	:	11
		};
		var user_date	= {
			'day'		:	split[1],
			'month'		:	months[split[2]],
			'year'		:	split[3]
		};
		
		var join_date = new Date();
			join_date.setYear(user_date.year);
			join_date.setMonth(user_date.month);
			join_date.setDate(user_date.day);
		
		var current = new Date( );
		var difference	= Math.abs(join_date.getTime() - current.getTime());
		var days = Math.round(difference / (1000 * 60 * 60 * 24) );	

		$('tr:contains("Post"):first').after('<tr><td align="right"><b>Posts per Day:</b></td><td>' + ( Math.round($('td:contains("Post count")').next('td').text() / days * 100) / 100 ) + '</td></tr>');

	}

	/*! Floating Sidebar */
	/**
		Floats the sidebar as you scroll.
		@author		Troberto
		@date		2009-12-23
		@version	3.9.4
		@runson		ALL
	*/
	if ( Whirlpool.get( "floatSidebar" ) == "true" ) {	
		var body = $('body').css('width').toString().replace('px', '');
		var root = $('#root').css('width').toString().replace('px', '');
		
		var left = ( Whirlpool.get( "enableWideWhirlpool" ) == "true" ? 0 : ( (body - root) / 2 ) );
		
		$('#left').css({
			'position' : 'fixed',
			'left'	   : left + 'px',
		});
		
		$('#logo').css({
			'position' : 'absolute',
			'left'	   : '0',
		});
		$('.selected ul').append('<li id="wpplus_undock"><a href="javascript:;"> Unfloat Sidebar (temp)</a></li>');
		$('#wpplus_undock a').click(function(){
			$('#left').css({
				'position' : 'absolute',
				'left'	   : '0'
			});
		});
		$(window).scroll(function(){ 
			$('#left').css('top', ( (201 - window.scrollY) >= 1 ? 201 - window.scrollY : 0 ) + 'px');
		});
		$(window).load(function(){ 
			$('#left').css('top', ( (201 - window.scrollY) >= 1 ? 201 - window.scrollY : 0 ) + 'px');
		});

	}
	
	/*! Inline Pages */
	/**
		Shows the page in an iFrame for easy viewing.
		@author		Troberto
		@date		2009-09-24
		@version	3.9.0
		@runson		Forum Reply pages
	*/
	
	if ( Whirlpool.get( "inlinePages" ) == "true" && Whirlpool.url.match( "forum-replies.cfm" ) ) {	
		$('.external').after('<sup style="cursor:pointer;" class="quick">(preview)</sup>');
		$('.quick').live('click', function(e) {
			var class = ($(this).attr('id') != '') ? $(this).attr('id') : 'quick' + Math.floor(Math.random()*101);
			if($('.' + class).hasClass(class)) {
				$(this).text('(preview)');
				$('.' + class).parent().parent().remove();
			} else {
				$(this).text('(hide)');
				$(this).attr('id', class);
				var link = $(this).prev('a');
				var post = $(this).closest('tr');
				$(post).after('<tr><td colspan="3" style="padding:0;height:400px;" class="tr' + class + '"><iframe src="' + link.attr('href') + '" style="margin:0;display:block;border:none;width: 100%;height: 100%;" class="' + class + '"></iframe><div class="handle" style="width: 100px;float:right;cursor:s-resize;">Resize</div></td></tr>');
				$('.tr' + class).jqResize('.handle');
			}

		});
	}

	/*! Smart Updater */
	/**
		Automatically updates WP+.
		@author		Troberto
		@date		2009-12-23
		@version	3.9.4
		@runson		ALL
	*/
	
	if ( Whirlpool.get( "smartUpdater" ) == "true" && ( Whirlpool.url.match( "user" ) || Whirlpool.url.match( "/forum/" ) ) ) { 
		
		var date = new Date(); 
		var time = (date.getTime() - date.getMilliseconds()) / 1000;
		
		if (Whirlpool.get('updaterInterval') === false) {
			Whirlpool.set('updaterInterval', 30);
		}
		
		var next = Whirlpool.get('updaterInterval');
		
		if (Whirlpool.get('updaterChecked') === false) {
			Whirlpool.set('updaterChecked', time);
		}
		
		var last = Whirlpool.get('updaterChecked');
		
		var next_seconds = next * 60;
		
		if (time > last + next_seconds) {
			var url = 'http://wp.tristanroberts.name/updater.txt';
			var mine = version.replace(/\./g, '');
			
			Whirlpool.HttpRequest(url, function(data) {
				var data = data.responseText;
				
				if (mine < data) {
					Whirlpool.set('updaterInterval', 30);
					Whirlpool.notify('A new version of WP+ is available.', true, 50000);
					Whirlpool.set('updaterChecked', time);
					document.location = 'http://userscripts.org/scripts/source/50796.user.js';
				} else if (next * 2 < 7690){
					Whirlpool.set('updaterInterval', next * 2);
					Whirlpool.set('updaterChecked', time);
				}
				
			});
			
		}	
	}

	
	/*! Chatbox */
	/**
		Adds a chatbox to the sidebar.
		@author		Troberto
		@date		2009-12-23
		@version	3.9.4
		@runson		ALL
	*/
	if ( Whirlpool.get( "chatbox" ) == "true" ) {
		$('.userinfo').after('<div id="chatbox"><iframe name="cboxmain" src="http://chat.onlinelife.com/box/?boxid=2818612&boxtag=1700&sec=main" id="cboxmain"></iframe><iframe name="cboxform" src="http://chat.onlinelife.com/box/?boxid=2818612&boxtag=1700&sec=form" id="cboxform"></iframe></div>');
		$('#chatbox iframe').css({
			'border'		:	'none',
			'margin-left'	:	'10px',
			'width'			:	'190px'
		});
		
		$('#chatbox iframe:first').css({
			'height'		:	'300px'
		});
		
		$('#chatbox iframe:last').css({
			'height'		:	'95px',
			'overflow'		:	'hidden'
		});
		
		$('#root').css({
			'min-height'	:	'1600px'
		});
	}
	
	/*! Syntax Highlighting */
	/**
		Provides easy to read syntax highlighting on pre tags.
		@author		Troberto
		@date		2009-12-23
		@version	3.9.4
		@runson		Forum Replies and Edit page
	*/

	
	if ( Whirlpool.get( "syntaxHighlight" ) == "true" ) {
		$( 'pre' ).addClass( "prettyprint" );
		$('head').append('<link rel="stylesheet" type="text/css" media="screen" href="http://google-code-prettify.googlecode.com/svn/trunk/src/prettify.css">');
		prettyPrint();
	}
	
	/*! Show Unanswered Threads */
	/**
		Provides a link to see unanswered threads.
		@author		Troberto
		@date		2009-12-23
		@version	3.9.4
		@runson		Forum Section Index
	*/
	if ( Whirlpool.get( "unanswered_threads" ) == "true" && Whirlpool.url.match("/forum/") ) {
		var url = document.location.toString();
		if ( url.match('nr=1') ) {
			var old_url = url.replace('?nr=1', '').old_url.replace('&nr=1', '');
			$('#breadcrumb li:last').html('<a href="' + old_url + '">' + $('#breadcrumb li:last').text() + '</a>');
		} else {
			var new_url = url + (url.indexOf('?') > -1) ? '&nr=1' : '?nr=1';
			$('#breadcrumb li:last').append(' <a href="' + new_url + '">(unread)</a> ');
		}
	}

	
	/*! Emoticons */
	/**
		Replaces emoticon text with a graphic.
		@author		Troberto
		@date		2009-09-24
		@version	3.9.4
		@runson		Forum Replies and Edit pages
	*/
	
	if ( Whirlpool.get( "emoticons" ) == "true" && Whirlpool.url.match( "forum-repl" ) ) {
		var icons = {
			':angry:'	:	Whirlpool.image('emoticon_angry'),
			':glad:'	:	Whirlpool.image('emoticon_blushing'),
			':confused:':	Whirlpool.image('emoticon_confused'),
			':cool:'	:	Whirlpool.image('emoticon_cool'),
			':cry:'		:	Whirlpool.image('emoticon_cry'),
			':('		:	Whirlpool.image('emoticon_frown'),
			':-('		:	Whirlpool.image('emoticon_frown'),
			':gasp:'	:	Whirlpool.image('emoticon_gasp'),
			':D'		:	Whirlpool.image('emoticon_grin'),
			':-D'		:	Whirlpool.image('emoticon_grin'),
			'<3'		:	Whirlpool.image('emoticon_kiss'),
			':X'		:	Whirlpool.image('emoticon_lips'),
			':-X'		:	Whirlpool.image('emoticon_lips'),
			':shout'	:	Whirlpool.image('emoticon_shout'),
			':snore:'	:	Whirlpool.image('emoticon_sleep'),
			':)'		:	Whirlpool.image('emoticon_smile'),
			':-)'		:	Whirlpool.image('emoticon_smile'),
			':\\\\'		:	Whirlpool.image('emoticon_smirk'),
			':|'		:	Whirlpool.image('emoticon_straight'),
			':-|'		:	Whirlpool.image('emoticon_straight'),
			':P'		:	Whirlpool.image('emoticon_tongue'),
			':-P'		:	Whirlpool.image('emoticon_tongue'),
			';)'		:	Whirlpool.image('emoticon_wink'),
			';-)'		:	Whirlpool.image('emoticon_wink'),
			':;'		:	Whirlpool.image('emoticon_wink'),
			':-;'		:	Whirlpool.image('emoticon_wink'),
			':star:'	:	Whirlpool.image('emoticon_star'),
		};	

		var regex = {};
		var endLine = {};
		var startLine='<img src ="';
		for ( icon in icons ) {
			var regkey = icon;
			regkey = regkey.replace(/</g, "&lt;");
			regkey = regkey.replace(/>/g, "&gt;");
			regkey = regkey.replace(/\(/g, "\\(");
			regkey = regkey.replace(/\)/g, "\\)");
			regkey = regkey.replace(/\[/g, "\\[");
			regkey = regkey.replace(/\]/g, "\\]");
			regkey = regkey.replace(/\|/g, "\\|");
			
			var fixkey = icon.replace(/\\/g, '');
			
			regex[ icon ] = new RegExp(regkey, 'g');
			endLine[ icon ] = '" align="baseline" />';
		}
		textnodes = document.evaluate("//td[@class = 'bodytext']//text()",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		
		for (var i = 0; i < textnodes.snapshotLength; i++) {
			node = textnodes.snapshotItem(i);
			var node_value = node.nodeValue;
			node_value = node_value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
			var smiley = node_value;
			for ( icon in icons ) {
				smiley = smiley.replace(regex[icon], startLine + icons[icon] + endLine[icon]);
			}
			if(smiley.length > 1 && smiley != node_value) {
				var span = document.createElement("span");
				span.innerHTML = smiley;
				node.parentNode.replaceChild(span, node); 
			}
		}

	}
	
	
	/*! Whim Archive Sorter */
	/**
		Sorts archived whims in alphabetical order.
		@author		Yansky (main), Troberto (plugin)
		@date		2009-09-03
		@version	3.9.0
		@runson		Whim Archive page
	*/
	
	if ( Whirlpool.get( 'whim_archive_sort' ) == "true" && Whirlpool.url.match( "action=archive" ) ) {
		
		var whimTRsParent = document.querySelector('#content>table>tbody');
		var whimTRs 	  = whimTRsParent.querySelectorAll('tr:not([bgcolor="##5566AA"])');
		
		var plainArr 	  = [];
		
		for each (var item in whimTRs) {
			if(typeof item == "object"){
				var Name  = { real: item.querySelector('b').textContent };
				Name.Sort = Name.real.toLowerCase().replace(/[^a-z,0-9]/gm, '');
				Name.tr   = item;
				plainArr.push(Name);
			}
		}
		
		plainArr.sort(function(a,b) { return a.Sort < b.Sort ? -1 : 1; });
		
		for each (var item in plainArr) {
			whimTRsParent.appendChild(item.tr);
		}

	}
	
	/*! Simple Backup */
	/**
		Backs up any input with the #body ID.
		@author		Yansky (main), Troberto (plugin)
		@date		2009-12-23
		@version	3.9.4
		@runson		Post Reply, Edit, Whims
	*/
	if ( Whirlpool.get( "simple_backup" ) == "true" && $('#body').attr('id') == 'body') {
		var existing_data = Whirlpool.get('simple_backup_data');
		$('#body').before('<span style="cursor:pointer;" id="revert_data">Revert</span><br>');
		$('#revert_data').live('click', function(e) {
			$('#body').val(existing_data);
		});
		$('#body').keyup(function(e) {
			Whirlpool.set('simple_backup_data', $('#body').val() );
		});
	}

	/*! No Text Shadow */
	/**
		Backs up any input with the #body ID.
		@author		Troberto
		@date		2009-12-23
		@version	3.9.4
		@runson		Post Reply, Edit, Whims
	*/
	if ( Whirlpool.get( "noTextShadow" ) == "true" ) {
		$('*').css('text-shadow', 'none');
	}

// ! Glug (Legacy JS)
/******************************************************* GLUG ***************************************************************************************************/


	var gmDefaults, docs = {
			d:document,
			dUrl:document.URL,
			dTitle:document.title,
			win:window,
			bt:null,
			saveOriginalHTML:null,
			lmtr:null,
			pTd3:null,
			q:null,
			eh:null,
			menuForum:$('#menu_forum ul'),
			uinfo:$('#left .userinfo'),
			checkIfSignedIn:$('#left #sign_in')[0],
			futer:$('#footer'),
			threadNumber:null,
			avatarCSS:false
		};
		
	function setGM(){

			gmDefaults = {	
					'debugMode':'false',
					'autoUpdateWPplus':'43200000',
					'smartUpdater':'true',
					'installedScriptVersion':version,
					'lastScriptVersionCheck':'1232062510821',
					'dynamicMenuSystem':'spinner',
					'quickReplybox':'true',
					'quickReplyboxCols':'100',
					'quickReplyboxRows':'10',
					'autoPreview':'true',
					'threadArchiveView':'true',
					'threadPrintView':'true',
					'longThreadView':'true',
					'moderatorPostView':'true',
					'representativePostView':'true',
					'autoSubscribe':'false',
					'staticAvatars':'true',
					'animatedAvatars':'false',
					'editInPlace':'true',
					'whirlcodeinWikiWhimNewThread':'true',
					'noGluteusMaximus':'false',
					'recentActivityDays':'7',
					'whIMMessageTextAreaCols':'45',
					'whIMMessageTextAreaRows':'10',
					'smilies':'true',
					'inlineImages':'true',
					'inlineVideos':'true',
					'ignoreUser':'false',
					'customWPTheme':'default',
					'whirlpoolBreadcrumbFont':'default font',
					'whirlpoolSidemenuFont':'default font',
					'showWhirlpoolFooterLinks':'true',
					'enableWideWhirlpool':'false',
					'penaltyBoxBackground':'false',
					'userNotes':'true',
					'hiddenUsersArr':'',
					'userNotesArr':'{}',
					'hideDRThreads':'false',
					'hideMVThreads':'false',
					'textareraSave':'',
					'lastReadTracker':'true',
					'numThreads2Track':'1000',
					'trackerPostBackgroundColour':'#CFCBBC',
					'disableTrackerPostBackgroundColour':'false',
					'readTheRulesYet':'false',
					'newPostBackgroundColour':'#95b0cb',
					'disableNewPostBackgroundColour':'false',
					'noNewPostBackgroundColour':'#cbc095',
					'disableNoNewPostBackgroundColour':'false',
					'onlyEndSquare':'false',
					'styleFlip':'false',
					'dontTrackStickyThreads':'false',
					'noColourEndSquare':'false',
					'wlrSettingsScrollTo':'false',
					'lastPost':'false',
					'CSStextBox':' ',
					'WLRfirstRun':'true',
					'whimAlertNotice':'false',
					'userpageInfoToggle':'false',
					'postAlign':'middle',
					'floatSidebar':'true',
					'superBar':'false',
					'ssHtml':'Enter your notes here, even try dragging images and widgets!',
					'watchedThreadsAlert':'default',
					'postsPerDay':'true',
					'noTextShadow':'false',
					'hideDelPosts':'false',
					'syntaxHighlight':'true',
					'chatbox':'false',
					'my_links':'false',
					'my_links_password':'',
					'emoticons':'true',
					'inlinePages':'true',
					'simple_backup':'true',
					'unanswered_threads':'true',
					'opOnlyView':'false',
					'whim_archive_sort':true
					};
		
		for(var k in gmDefaults){
		
			if(!Whirlpool.get(k)){
			
				Whirlpool.set(k, gmDefaults[k]);
				docs[k]=gmDefaults[k];

			}
			else{
			
				docs[k]=Whirlpool.get(k);
			
			}
		
		}
		
		if(Whirlpool.get('installedScriptVersion') != version) {
			Whirlpool.set('installedScriptVersion', version);
		}

	}
	
	function avatars() {
		if(docs.staticAvatars == 'true') {
			$( 'head' ).append( '<link rel="stylesheet" type="text/css" href="http://wp.tristanroberts.name/cached/avatars/server2-static.css">' );
			$( 'head' ).append( '<link rel="stylesheet" type="text/css" href="http://goodbyepolar.com/wpavatars/avatar.css">' );
		}

		if(docs.animatedAvatars == 'true') {
			$( 'head' ).append( '<link rel="stylesheet" type="text/css" href="http://wp.tristanroberts.name/cached/avatars/server2-animated.css">' );
			$( 'head' ).append( '<link rel="stylesheet" type="text/css" href="http://goodbyepolar.com/wpavatars/animatedavatar.css">' );
		}
	}
	
	function hideDelPosts(){
		$('.bodymore').parent().hide();
	}

	function time(){

		var xDate = new Date();	
		var gF = xDate.getFullYear();
		var gM = xDate.getMonth()+1;
		var dArr = [''+gM+'', ''+xDate.getDate()+'', ''+xDate.getHours()+'', ''+xDate.getMinutes()+'', ''+xDate.getSeconds()+''];

		for(var i=0;i<dArr.length;i++){

			if(dArr[i].length == 1){

				dArr[i] = '0'+dArr[i];

			}

		}
		return escape(gF+"-"+dArr[0]+"-"+dArr[1]+"+"+dArr[2]+":"+dArr[3]+":"+dArr[4]);
	}
	var wcPrev={
		
		showPreview:function(){
		
			if(docs.lmtr && !docs.pTd3){

				$(docs.lmtr).after('<tr height="100" id="previewTR"><td class="bodyuser" style="vertical-align: middle;"><p style="opacity:0.3;font:2em bold Verdana">'+
													'Preview</p></td><td class="bodytext"/><td class="bodypost" style="vertical-align: middle;"><p style="opacity:0.3;font:2em bold '+
													'Verdana">Preview</p></td></tr>');
				docs.pTd3 = $('#previewTR td:eq(1)');
			
			}

			/*** preview code by Simon Wright - http://forums.whirlpool.net.au/user/10 ***/
	
			var previewTimer;
			var previewWait = false;

			if (!previewWait) {

				previewWait = true;
				previewTimer = setTimeout(function(){
				
					docs.pTd3.html(unsafeWindow.whirlcode2(docs.q.val(), docs.eh));
					
					previewWait = false;
					
				}, 600);
			}
			
		}
	}	
	var whirlC={

		generalStyle:function(){
	
			Whirlpool.css('#qQuote{margin-top:20px;} #qqTextArea{background:#E5E5E5 none no-repeat scroll 50% 50%;border:1px solid gray;color:black;}'+
						'#qqpost{width: 150px; font-family: Arial; font-style: normal; font-variant: normal; font-weight: normal; font-size: 16px; '+
						'line-height: normal; font-size-adjust: none; font-stretch: normal; -x-system-font: none;} '+
						'#qqpostclear{width: 150px; font-family: Arial; font-style: normal; font-variant: normal; font-weight: normal; font-size: 16px; '+
						'line-height: normal; font-size-adjust: none; font-stretch: normal; -x-system-font: none;} '+				
						'#opInputs p{float:left;margin-left:5px;}'+
						'#qqWCPreview{border:solid 1px grey;cursor:default;float:left;height:18px;margin-right:-80px;padding:2px;width:80px;} '+
						'#qqPreview{display:none;text-align:left;padding:5px;background:#EEEEEE url(http://forums.whirlpool.net.au/img/forum/reply-eeeeee.gif) '+
						'repeat-x scroll center bottom;border:2px solid grey;margin-bottom:10px;width:60%;} '+
						'#qqTooManyWords{display:none;background-color:#E8B760;height:250px;position:absolute;width:100%;font-weight:bold;z-index:6;} '+
						'#aloader{display:none;}.qqwcodeButtons{font-size:0.9em;}');

		},
		code:function(){
		
				return {
						wc_whirlBold :			{ encloseLeft : "[*", encloseRight  : "*]"},
						wc_whirlItalic :		{ encloseLeft : "[/", encloseRight  : "/]"},
						wc_whirlSingleQuote :	{ encloseLeft : "['", encloseRight  : "']"},
						wc_whirlDoubleQuote :	{ encloseLeft : "[\"", encloseRight  : "\"]"},
						wc_whirlQuote :			{ encloseLeft : "[+", encloseRight  : "+]"},
						wc_whirlSuperscript :	{ encloseLeft : "[^", encloseRight  : "^]"},
						wc_whirlSubscript :		{ encloseLeft : "[\\", encloseRight  : "\\]"},
						wc_whirlStrike :		{ encloseLeft : "[-", encloseRight  : "-]"},
						wc_whirlCourier :		{ encloseLeft : "[#", encloseRight  : "#]"},
						wc_whirlSmall :			{ encloseLeft : "[(", encloseRight  : ")]"},
						wc_whirlGrey :			{ encloseLeft : "[`", encloseRight  : "`]"},
						wc_whirlSerif :			{ encloseLeft : "[~", encloseRight  : "~]"},
						wc_whirlGoogle :		{ encloseLeft : "[?", encloseRight  : "?]"},
						wc_whirlEscape :		{ encloseLeft : "[.", encloseRight  : ".]"},
						wc_whirlWiki :			{ encloseLeft : "[[", encloseRight  : "]]"},
						wc_whirlSpoil :			{ encloseLeft : "[_", encloseRight  : "_]"}						
					}
		},
		buttons:function(id, w, c){
		
			return '<div id="'+id+'" style="text-align:center;padding-bottom:10px;width:'+w+'">'+
						'<button type="button" class="'+c+'" title="Bold WhirlCode" accesskey="b" id="wc_whirlBold" >Bold</button>' +
						'<button type="button" class="'+c+'" title="Italic WhirlCode" accesskey="i" id="wc_whirlItalic" >Italic</button>' +
						'<button type="button" class="'+c+'" title="SingleQuote WhirlCode" accesskey="t" id="wc_whirlSingleQuote" >\'quote\'</button>' +
						'<button type="button" class="'+c+'" title="DoubleQuote WhirlCode" accesskey="q" id="wc_whirlDoubleQuote" >"quote"</button>' +
						'<button type="button" class="'+c+'" title="Quote WhirlCode" accesskey="h" id="wc_whirlQuote" >who</button>' +
						'<button type="button" class="'+c+'" title="Superscript WhirlCode" accesskey="p" id="wc_whirlSuperscript" >Super</button>' +
						'<button type="button" class="'+c+'" title="Subscript WhirlCode" accesskey="\\" id="wc_whirlSubscript" >Sub</button>' +
						'<button type="button" class="'+c+'" title="Strike WhirlCode" accesskey="k" id="wc_whirlStrike" >Strike</button>' +
						'<button type="button" class="'+c+'" title="Courier WhirlCode" accesskey="c" id="wc_whirlCourier" >Courier</button>' +
						'<button type="button" class="'+c+'" title="Small WhirlCode" accesskey="m" id="wc_whirlSmall" >Small</button>' +
						'<button type="button" class="'+c+'" title="Grey WhirlCode" accesskey="r" id="wc_whirlGrey" >Grey</button>' +
						'<button type="button" class="'+c+'" title="Serif WhirlCode" accesskey="s" id="wc_whirlSerif" >Serif</button>' +
						'<button type="button" class="'+c+'" title="Google WhirlCode" accesskey="g" id="wc_whirlGoogle" >Google</button>' +
						'<button type="button" class="'+c+'" title="Escape WhirlCode" accesskey="e" id="wc_whirlEscape" >Esc</button>' +
						'<button type="button" class="'+c+'" title="Wiki WhirlCode" accesskey="w" id="wc_whirlWiki" >Wiki</button>' +
						'<button type="button" class="'+c+'" title="Spoiler WhirlCode" accesskey="o" id="wc_whirlSpoil" >Spoiler</button>' +
						'<button type="button" class="'+c+'" title="URL Link" accesskey="u" id="wc_whirlurl" >URL</button>' +
						'<button type="button" class="'+c+'" title="Link" accesskey="l" id="wc_whirllink" >Link</button>' +
						'</div>';

		},									
		buttonEvents:function(c, tAr, whirlCode){		

			$('.'+c).bind('mouseup', function(evt){

				var qqbuttonID = $(this).attr('id');		
				tAr.focus(function(){}); //I don't understand it either, but tAr.focus(); without an anonymous function produces a weird error.
				var qqcurrentValue = tAr.val();
				var qqtheSelection = tAr.val().substring(tAr[0].selectionStart, tAr[0].selectionEnd);

				function insertAtCursor(qqmyField, qqmyValue) {

					if (qqmyField.selectionStart || qqmyField.selectionStart == '0') {
					
						var qqstartPos = qqmyField.selectionStart;
						var qqendPos = qqmyField.selectionEnd;
						qqmyField.value = qqmyField.value.substring(0, qqstartPos)+qqmyValue+qqmyField.value.substring(qqendPos, qqmyField.value.length);
						
					} 
					else {
					
						qqmyField.value += qqmyValue;
						
					}

				}

				if(qqtheSelection === ""){
				
					if(((qqcurrentValue.split(whirlCode[qqbuttonID].encloseLeft).length+qqcurrentValue.split(whirlCode[qqbuttonID].encloseRight).length)  % 2) === 0){
						
						insertAtCursor(tAr[0], whirlCode[qqbuttonID].encloseLeft);
						
					}
					else{
						
						insertAtCursor(tAr[0], whirlCode[qqbuttonID].encloseRight);
							
					}
	
				}
				else if(qqbuttonID == "wc_whirlurl"){
				
					var uPrompt = window.prompt("Enter URL:", "http://"); 
					
					if ((uPrompt !== "http://") && (uPrompt !== "") & (uPrompt !== null)) {

						insertAtCursor(tAr[0], '<a href="'+uPrompt+'">'+qqtheSelection+'</a>');
					
					}

				}
				else if(qqbuttonID == "wc_whirllink"){
				
					var uPrompt = window.prompt("Enter Text:", ""); 
					
					if ((uPrompt !== "") & (uPrompt !== null)) {
					
						if(qqtheSelection.indexOf('http://')<0){
						
							qqtheSelection = 'http://'+qqtheSelection;
						
						}

						insertAtCursor(tAr[0], '<a href="'+qqtheSelection+'">'+uPrompt+'</a>');
					
					}
					
				}		
				else{
				
					if(qqtheSelection.indexOf('\n')>-1 || qqtheSelection.indexOf('\r')>-1){
					
						var tSel = qqtheSelection.replace(/^(.+)$/mg, whirlCode[qqbuttonID].encloseLeft+"$1"+whirlCode[qqbuttonID].encloseRight);
					
						tAr.val(tAr.val().replace(qqtheSelection, tSel));					
					
					}
					else{
					
						insertAtCursor(tAr[0], whirlCode[qqbuttonID].encloseLeft+qqtheSelection+whirlCode[qqbuttonID].encloseRight);
					
					}

				}	
				
				if(docs.pTd3){
				
					wcPrev.showPreview();
				
				}
				
			});			
		
			
		
		}

	}
	var wlrSettings ={
		set:function (){
		
			var l = $('<li>');
			var la = $('<a id="wPPSettingsLink" href="#">WP+ Settings</a>');
			l.append(la);
			var settingmenu = '<li id="menu_wpplus" class="even "><a class="xx" href="#" id="wpsettingslink"><span>WP+ Settings</span></a><span class="shim1"></span></li>';
			$('#menu_industry').after(settingmenu);

			if(docs.futer.text().match('The Pool Room')){
				var uinfoName=docs.uinfo.children('dt:first').text();
				var newDDforA = $('<DD>');	
				var aforDD = $('<a href="irc://au.austnet.org/tpr" target="_blank">TPR IRC Chat</a> <span style="font-size:0.7em;">(<a href="http://widget.mibbit.com/?settings=6c09163b5ce1890c08a31a91cb300b34&server=au.austnet.org&channel=%23tpr&nick='+uinfoName+'" target="_blank">mibbit</a>)</span>');
				newDDforA.append(aforDD);
				docs.uinfo.append(newDDforA);
			}
			if(docs.futer.text().match('Lifestyle')){
				var uinfoName=docs.uinfo.children('dt:first').text();
				var newDDforA = $('<DD>');	
				var aforDD = $('<a href="irc://au.austnet.org/whirlpool" target="_blank">Whirlpool IRC</a> <span style="font-size:0.7em;">(<a href="http://widget.mibbit.com/?settings=6c09163b5ce1890c08a31a91cb300b34&server=au.austnet.org&channel=%23whirlpool&nick='+uinfoName+'" target="_blank">mibbit</a>)</span>');
				newDDforA.append(aforDD);
				docs.uinfo.append(newDDforA);
			}
		
			if(docs.CSStextBox !==' '){
				Whirlpool.css(decodeURIComponent(docs.CSStextBox));
			}

			var updateGearsCheck = 'block';
			
			if(window.google){
				updateGearsCheck = 'none';
			}
			
			var infoIcon = 'http://wp.tristanroberts.name/static/images/script-01.png';
			var arrowDown = 'http://wp.tristanroberts.name/static/images/script-02.png';
			var arrowUp = 'http://wp.tristanroberts.name/static/images/script-03.png';
			
			Whirlpool.css('#wlrSettingsDiv {'+
				'background-color:#D3DAED;'+
				'height:400px;'+
				'left:50px;'+
				'overflow-x:scroll;'+
				'overflow-y:scroll;'+
				'position:absolute;'+
				'top:20px;'+
				'width:500px;'+
				'z-index:50;'+
			'}'+
			'#autoUpdateWPplus{'+
			'	display:'+updateGearsCheck+';'+
			'}'		+
			'#wlrSettingsDiv ul#wlrtabmenu li{'+
				'border:3px solid #777;'+
				'border-width:3px 3px 1px;'+
				'float:left;'+
				'height:20px;'+
				'margin-right:10px;'+
				'padding:5px;'+
				'width:140px;'+
				'text-align:center;'+
				'	color:white;'+
			'}'+
			'#wlrSettingsDiv #wlrtabmenu li.active{'+
			'	background-color:orange;'+
			'	border:3px solid #555;'+
			'	border-width:3px 3px 1px;'+
			'}'+
			'#wlrSettingsDiv #wlrtabmenu li:hover{'+
				'cursor:pointer;'+
				'border:3px solid #555;'+
				'border-width:3px 3px 1px;'+
			'}'+	
			'#wlrSettingsDiv .wlrsetbutDown{'+
				'background:transparent url("'+arrowDown+'") no-repeat;'+
				'height:21px;'+
				'padding:0;'+
				'width:21px;	'+		
				'position:relative;'+
				'top:-5px;'+
				'left:4px;'+
			'}'+				
			'#wlrSettingsDiv .wlrsetbutUp{'+
				'background:transparent url("'+arrowUp+'") no-repeat;'+
				'height:21px;'+
				'padding:0;'+
				'width:21px;	'+		
				'position:relative;'+
				'top:-5px;'+
				'left:4px;'+				
			'}'+				
			'#wlrSettingsDiv p{'+
			'	border-bottom:1px dashed grey;'+
			'	margin-left:15px;'+
			'	padding-bottom:15px;'+
			'}'+
			'#prevContainer>*{'+	//just chucking these here so can save an extra Whirlpool.css()
				'margin-left:10px;'+
				'margin-right:12px;}'+
			'.maximumWidthImage{'+
				'max-width:999999999999px !important;'+
			'}#wlrSettingsDiv label:hover{cursor:pointer;}');

					//smiling
			docs.smlHappy = "http://wp.tristanroberts.name/static/images/script-20.png";
			
			var wlrSettingsDivTop;
			(window.innerHeight>560)?wlrSettingsDivTop='6%':wlrSettingsDivTop='0';
			// ! Settings HTML
			var settingsHTML = '<div id="wlrSettingsDiv" style="background-color:#999999;border:1px solid black;color:#333333;display:none;'+
									'left:50%;margin-left:-400px;padding:0 12px;position:fixed;top:'+wlrSettingsDivTop+';width:800px;overflow:hidden;height:540px;'+
									'display:block;z-index:3000;">'+
									'<ul id="wlrtabmenu" style="list-style:none;float:left;margin:14px 0px 0px 32px">'+
										'<li class="active wlrtabmenuTabs">General Settings</li>'+
										'<li class="wlrtabmenuTabs">Custom CSS</li>'+
										'<li class="wlrtabmenuTabs">Hidden Users</li>'+
									'</ul>		'+							
									'<div id="setContainer" class="wlrtabmenuDivs" style="float:left;border:3px solid #555;background-color:#EEEEEE;height:440px;margin-bottom:5px;overflow-x:hidden;overflow-y:scroll;">'+
									  '<button id="resetWLR" style="margin: 10px 10px 5px 250px;">Reset All Settings To Default Values</button>'+ 
									  '<div style="margin: 10px 10px 5px 290px;opacity:0.4;">Installed Script Version: '+docs.installedScriptVersion+'</div>'+
									  '<hr />'+
									  '<span style="float:right;margin-right:10px;font-size:12px;font-weight:900;">Scroll down for more settings.</span>'+									  
									  '<p id="debugMode">'+
										'<input type="checkbox" name="enabledebugmode" id="enabledebugmode">'+
										'<label for="enabledebugmode">Enable Debug Mode</label>'+
										
									  '</p>    '+										  
									  '<p id="smartUpdater">'+
										'<input type="checkbox" name="updater" id="updater">'+
										'<label for="updater">Enable automatic updater.</label>'+
										
										'<a href="http://userscripts.org/scripts/source/50796.user.js" id="force_update">Force Update</a> '+
										'<label for="force_update">Automatically updates to the latest version</label>'+
										
									  '</p>'+							  	  
									  '<p id="dynamicMenuSystem">'+
										'<select name="dynamicMen" id="dynamicMen">'+
										  '<option value="none">none</option>'+
										  '<option value="rightClick">Right click</option>'+
										  '<option value="spinner">Spinner</option>'+
										'</select>     '+
										'<label for="dynamicMen">Dynamic Menu System</label>'+
									  '</p>    '+
									  '<p id="quickReplybox">'+
										'<input type="checkbox" name="quickRepb" id="quickRepb">'+
										'<label for="quickRepb">Enable a Quick Reply Box at the bottom of threads and Quick Quote links next to posts.</label>'+
										
									  '</p>     '+
									  '<p id="quickReplyboxCols">'+
										'<input type="text" readonly="readonly" name="quickReplyboxC" id="quickReplyboxC">'+
										'<button class="wlrsetbutDown" type="button"></button> '+
										'<button class="wlrsetbutUp" type="button"></button> '+
										'<label for="quickReplyboxC">Change the number of cols(width) of the Quick Reply Box.</label>'+
										
									  '</p>     '+
									  '<p id="quickReplyboxRows">'+
										'<input type="text" readonly="readonly" name="quickReplyboxR" id="quickReplyboxR">'+
										'<button class="wlrsetbutDown" type="button"></button> '+
										'<button class="wlrsetbutUp" type="button"></button> '+
										'<label for="quickReplyboxR">Change the number of rows(height) of the Quick Reply Box.</label>'+
										
									  '</p> '+
									   '<p id="autoPreview">'+
										'<input type="checkbox" name="autoPr" id="autoPr">'+
										'<label for="autoPr">Show a preview of what you are typing in the quick quote box</label>'+
										
									  '</p>     '+
										'<p id="unanswered_threads">'+
										'<input type="checkbox" name="unansweredThreads" id="unansweredThreads">'+
										'<label for="unansweredThreads">Provides a link to unanswered threads (threads with no replies).</label>'+
										
									  '</p> '+
									  '<p id="opOnlyView">'+
										'<input type="checkbox" name="onlyOp" id="onlyOp">'+
										'<label for="onlyOp">Show only OP posts view link at top of thread.</label>'+
										
									  '</p>       '+
										'<p id="threadArchiveView">'+
										'<input type="checkbox" name="threadArchiveV" id="threadArchiveV">'+
										'<label for="threadArchiveV">Show all posts in Thread Archive View Link at top of thread.</label>'+
										
									  '</p> '+
									  '<p id="longThreadView">'+
										'<input type="checkbox" name="longThreadV" id="longThreadV">'+
										'<label for="longThreadV">Show all Posts in Long Thread View Link at top of thread.</label>'+
										
									  '</p> '+
									  '</p>     '+
										'<p id="threadPrintView">'+
										'<input type="checkbox" name="threadPrintV" id="threadPrintV">'+
										'<label for="threadPrintV">Show all Posts in Thread Print View Link at top of thread.</label>'+
										
									  '</p>       '+
									   '</p>     '+
										'<p id="moderatorPostView">'+
										'<input type="checkbox" name="moderatorPostV" id="moderatorPostV">'+
										'<label for="moderatorPostV">Show a link to view only moderator posts.</label>'+
										
									  '</p> '+
									   '</p>  '+   
										'<p id="representativePostView">'+
										'<input type="checkbox" name="representativePostV" id="representativePostV">'+
										'<label for="representativePostV">Show a link to view only representative posts.</label>'+
										
									  '</p>       '+
									   '</p>     '+
										'<p id="autoSubscribe">'+
										'<input type="checkbox" name="autoSubs" id="autoSubs">'+
										'<label for="autoSubs">Automatically subscribe to a thread when you make a post.</label>'+
										
									  '</p>'+
										'</p>     '+
										'<p id="staticAvatars">'+
										'<input type="checkbox" name="staticAv" id="staticAv">'+
										'<label for="staticAv">Display static avatars (non-animatied).</label>'+
										
									  '</p>     '+
										'</p>     '+
										'<p id="animatedAvatars">'+
										'<input type="checkbox" name="animatedAv" id="animatedAv">'+
										'<label for="animatedAv">Display animated avatars.</label>'+
										
									  '</p> '+								  
										'<p id="editInPlace">'+
										'<input type="checkbox" name="editInP" id="editInP">'+
										'<label for="editInP">Turn on ability to edit post in thread using Ajax.</label>'+
										
									  '</p>       '+
									  '</p>     '+
										'<p id="simple_backup">'+
										'<input type="checkbox" name="simple_backup" id="simple_backup">'+
										'<label for="simple_backup">Stores a backup of whatever you write in a reply/whim and allows for quickly reverting back to the last version.</label>'+
										
									  '</p> '+
										'<p id="whirlcodeinWikiWhimNewThread">'+
										'<input type="checkbox" name="whirlcodeinWikiWhimNewT" id="whirlcodeinWikiWhimNewT">'+
										'<label for="whirlcodeinWikiWhimNewT">Turn this on to use Whirlcode in Wiki and New Page Thread.</label>'+
										
									  '</p> '+
									  '<p id="whim_archive_sort">'+
										'<input type="checkbox" name="archive_sor" id="archive_sor">'+
										'<label for="archive_sor">Sorts the Whim Archive page into alphabetical order.</label>'+
									  '</p> '+
									  '</p>       '+
										'<p id="noGluteusMaximus">'+
										'<input type="checkbox" name="noGluteusM" id="noGluteusM">'+
										'<label for="noGluteusM">Removes the &p=-1#bottom from thread links on the main index page on Whirlpool</label>'+
										
									  '</p> '+
									  '</p>       '+
										'<p id="my_links">'+
										'<input type="checkbox" name="my_links" id="my_links">'+
										'<label for="my_links">Enable My Links. My Links requires a free account.  Click "Sign Up" to get one.</label>'+
									  '</p> '+
									  '<p id="my_links_password">'+
										'<input type="password" name="my_links_pswd">'+
										'<label for="my_links_pswd">If My Links (above) is enabled, enter your password here. Sign Up if you don\'t have one.</label>'+
									  '</p> '+
										'<p id="chatbox">'+
										'<input type="checkbox" name="cBox" id="cBox">'+
										'<label for="cBox">Turn on the Whirlpool Plus chatbox.  To use, you MUST agree with the <a href="http://whirlpool.net.au/wiki/?tag=wpplus_chatbox_rules" target="_blank">rules</a> of the chatbox.</label>'+
									  '</p> '+
										'<p id="syntaxHighlight">'+
										'<input type="checkbox" name="syntaxHighlight" id="syntaxHighlight">'+
										'<label for="syntaxHighlight">Turn on code syntax highlighting (supports most languages).</label>'+
									  '</p> '+									  
									  '</p>       '+
										'<p id="recentActivityDays">'+
										'<select name="recentActivityD" id="recentActivityD">'+
										  '<option value="1">1</option>'+								  
										  '<option value="3">3</option>'+
										  '<option value="7">7</option>'+
										  '<option value="14">14</option>'+
										  '<option value="30">30</option>'+
										  '<option value="60">60</option>'+
										  '<option value="120">120</option>'+										  
										'</select>     '+										
										'<label for="recentActivityD">Set your default Recent Activity Days on your user page. Default is 7 - set it to 7 to disable this custom function.</label>'+
										
									  '</p> '+
									  '</p>       '+
									  '<p id="whIMMessageTextAreaCols">'+
										'<input type="text" readonly="readonly" name="whIMMessageTextAreaC" id="whIMMessageTextAreaC">'+
										'<button class="wlrsetbutDown" type="button"></button> '+
										'<button class="wlrsetbutUp" type="button"></button> '+
										'<label for="whIMMessageTextAreaC">Increase/Decrease the number of columns (width) of the WhIM Message Area.</label>'+
										
									  '</p> '+
									  '<p id="whIMMessageTextAreaRows">'+
										'<input type="text" readonly="readonly" name="whIMMessageTextAreaR" id="whIMMessageTextAreaR">'+
										'<button class="wlrsetbutDown" type="button"></button> '+
										'<button class="wlrsetbutUp" type="button"></button> '+
										'<label for="whIMMessageTextAreaR">Increase/Decrease the number of rows (height) of the WhIM Message Area.</label>'+
										
									  '</p> '+
									  '</p>       '+
										'<p id="emoticons">'+
										'<input type="checkbox" name="smile" id="smile">'+
										'<label for="smile">With smilies on, script will automatically change text emoticons (eg. :D) into their respective images.</label>'+
										
									  '</p>       '+
										'<p id="inlineImages">'+
										'<input type="checkbox" name="inlineI" id="inlineI">'+
										'<label for="inlineI">Turns image links into images.</label>'+
										
									  '</p>             '+
										'<p id="inlineVideos">'+
										'<input type="checkbox" name="inlineV" id="inlineV">'+
										'<label for="inlineV">Turn on ability to change YouTube and google video links to embedded videos with title.</label>'+
										
									  '</p>  '+
									  '<p id="inlinePages">'+
										'<input type="checkbox" name="inlinePages" id="inlinePages">'+
										'<label for="inlinePages">Adds the ability to see links inline of WP.</label>'+
										
									  '</p> '+
									  '</p>             '+
										'<p id="ignoreUser">'+
										'<input type="checkbox" name="ignoreUserB" id="ignoreUserB">'+
										'<label for="ignoreUserB">Adds a button next to each user\'s aura vote smilies, which when activated will prevent you from '+
										'seeing that user. <strong>WARNING: Ignoring a user will cause ALL of their posts not to appear for you any more. If you want to remove someone from '+
										'being ignored, click on the "Hidden Users" tab above.</strong></label>'+
										
									  '</p> '+
									  '</p>             '+
										'<p id="userNotes">'+
										'<input type="checkbox" name="ignoreUserB" id="ignoreUserB">'+
										'<label for="ignoreUserB">User Notes</label>'+
										
									  '</p> '+		
									  '<p id="watchedThreadsAlert">'+
										'<select name="s_threadalert" id="s_threadAlert">'+
										  '<option value="default">None</option>'+
										  '<option value="watched">Go to watched threads</option>'+
										  '<option value="thread">Return to the thread</option>'+
										'</select>     '+
										'<label for="s_threadAlert">Choose what action to do on the "watching thread" alert.</label>'+
										
									  '</p> '+						  
									  '<p id="customWPTheme">'+
										'<select name="s_customtheme" id="s_customtheme">'+
										  '<option value="">Default (by Simon Wright)</option>'+
										  '<option value="http://www.members.optusnet.com.au/kev.nat/Whirlpool%20Noir/1/WP%20BLACK.css">WP Black (by ═CHRIS═)</option>'+
										  '<option value="@import url(http://members.optusnet.com.au/foonly/wpblue/1/css/core.css);">WP Blue (by Foonly)</option>'+
										  '<option value="@import url(http://members.optusnet.com.au/whirlpoolian/classic/css/core.css);">WP Classic</option>'+
										  '<option value="http://www.systemadmins.info/whirlpool/themes/green/wp_mint.css">WP Green (by polish dude)</option>'+
										  '<option value="@import url(http://members.optusnet.com.au/whirlpoolian/greyscale/css/core.css);" selected="selected">WP Grey</option>'+
										  '<option value="http://www.systemadmins.info/whirlpool/themes/purple/purple.css">WP Purple (by polish dude)</option>'+
										  '<option value="@import url(http://members.optusnet.com.au/whirlpoolian/steelyellow/css/core.css);">WP Steel Yellow</option>'+
										'</select>     '+
										'<label for="s_cutomtheme">Choose a WP Theme to Use</label>'+
										
									  '</p> '+
										'<p id="noTextShadow">'+
										'<input type="checkbox" name="textShadow" id="textShadow">'+
										'<label for="textShadow">Disable all <tt>text-shadow</tt> CSS attributes (FF 3.5+ only).</label>'+
										
									  '</p>'+
										'<p id="whirlpoolBreadcrumbFont">'+
										'<select name="whirlpoolBreadcrumbF" id="whirlpoolBreadcrumbF">'+
										  '<option value="default font">default font</option>'+								  
										  '<option value="Verdana">Verdana</option>'+
										  '<option value="Arial">Arial</option>'+
										  '<option value="Georgia">Georgia</option>'+
										  '<option value="Tahoma">Tahoma</option>'+
										  '<option value="Trebuchet MS">Trebuchet MS</option>'+
										'</select>     '+										
										'<label for="whirlpoolBreadcrumbF">Change the Breadcrumb Font.</label>'+
										
									  '</p>'+
										'<p id="whirlpoolSidemenuFont">'+
										'<select name="whirlpoolSidemenuF" id="whirlpoolSidemenuF">'+
										  '<option value="default font">default font</option>'+								  
										  '<option value="Verdana">Verdana</option>'+
										  '<option value="Arial">Arial</option>'+
										  '<option value="Georgia">Georgia</option>'+
										  '<option value="Tahoma">Tahoma</option>'+
										  '<option value="Trebuchet MS">Trebuchet MS</option>'+
										'</select>     '+											
										'<label for="whirlpoolSidemenuF">Change the Sidemenu Font.</label>'+
										
									  '</p>'+
										'<p id="showWhirlpoolFooterLinks">'+
										'<input type="checkbox" name="showWhirlpoolFooterL" id="showWhirlpoolFooterL">'+
										'<label for="showWhirlpoolFooterL">Show Whirlpool Footer Links.</label>'+
										
									  '</p>      '+
									  '</p>'+
										'<p id="enableWideWhirlpool">'+
										'<input type="checkbox" name="enableWideWh" id="enableWideWh">'+
										'<label for="enableWideWh">Make Whirlpool Forums Wide to fit widescreen.</label>'+
										
									  '</p>             '+
									  '</p>'+
										'<p id="penaltyBoxBackground">'+
										'<input type="checkbox" name="penaltyBoxB" id="penaltyBoxB">'+
										'<label for="penaltyBoxB">Highlight when a user is in the penalty box.</label>'+
										
									  '</p> '+
									  '</p>'+
										'<p id="whimAlertNotice">'+
										'<input type="checkbox" name="wAlertNotice" id="wAlertNotice">'+
										'<label for="wAlertNotice">Show an alert notice at the top of the page when you have received a new WHIM</label>'+
										
									  '</p> '+	
									  '</p>'+
										'<p id="userpageInfoToggle">'+
										'<input type="checkbox" name="upageInfoToggle" id="upageInfoToggle">'+
										'<label for="upageInfoToggle">Hide/Toggle user info on user pages.</label>'+
										
									  '</p> '+											  
										'<p id="hideDRThreads">'+
										'<input type="checkbox" name="hideDRT" id="hideDRT">'+
										'<label for="hideDRT">Hide Deleted/Removed Threads in forum view</label>'+
										
									  '</p>     '+
										'<p id="hideMVThreads">'+
										'<input type="checkbox" name="hideMVT" id="hideMVT">'+
										'<label for="hideMVT">Hide Moved Threads in forum view</label>'+
										
									  '</p>     '+
									  '<p id="hideDelPosts">'+
										'<input type="checkbox" name="hideDelPost" id="hideDelPost">'+
										'<label for="hideDelPost">Hide deleted posts in threads.</label>'+
										
									  '</p>     '+
									   '<p id="floatSidebar">'+
										'<input type="checkbox" name="enablefloatBar" id="enablefloatBar">'+
										'<label for="enablefloatBar">Floats the sidebar as you scroll. <em>Note: May not work correctly with some screen resolutions without using Widescreen Mode.</em></label>'+
										
									  '</p>    '+
									  '<p id="superBar">'+
										'<input type="checkbox" name="enablesuperBar" id="enablesuperBar">'+
										'<label for="enablesuperBar">Adds a Sticky notes section to the sidebar (may be buggy).</label>'+
										
									  '</p>    '+
									  '<p id="postsPerDay">'+
										'<input type="checkbox" name="enablesuperBar" id="enablesuperBar">'+
										'<label for="enablesuperBar">Enable "Posts per day" statistic on user pages.</label>'+
										
									  '</p>    '+
									  '<p id="postAlign">'+
										'<select name="postAl" id="postAl">'+
										  '<option value="middle">middle</option>'+								  
										  '<option value="top">top</option>'+
										'</select>     '+
										'<label for="postAl">Aligns the text in a post to the top or middle.</label>'+
										
									  '</p>'+									  
										'<p id="lastReadTracker">'+
										'<input type="checkbox" name="lastReadT" id="lastReadT">'+
										'<label for="lastReadT">Turns WLR Last Read Tracker on or off.</label>'+
										
									  '</p>       '+
									  '<p id="numThreads2Track">'+
										'<select name="s_numThreads2Track" id="s_numThreads2Track">'+
										  '<option value="300">300</option>'+
										  '<option value="500">500</option>'+
										  '<option value="1000">1000</option>'+
										  '<option value="2000">2000</option>'+
										  '<option value="5000">5000</option>'+
										'</select>     '+
										'<label for="s_numThreads2Track">Number Of Threads To Track:</label>'+
										
									  '</p>     '+
									  '<p id="trackerPostBackgroundColour" class="needCpicker">'+
										'<input type="text" name="trackerPostBackgroundC" id="trackerPostBackgroundC">'+
										'<label for="trackerPostBackgroundC">Highlighted Posts Colour:</label>'+
									  '</p>     '+
									  '<p id="disableTrackerPostBackgroundColour">'+
										'<input type="checkbox" name="disableTrackerPostBackgroundC" id="disableTrackerPostBackgroundC">'+
										'<label for="disableTrackerPostBackgroundC">Disable Highlighted Posts colouring</label>'+
										
									  '</p>     '+
									  '<p id="newPostBackgroundColour" class="needCpicker">'+
										'<input type="text" name="newPostBackgroundC" id="newPostBackgroundC">'+
										'<label for="newPostBackgroundC">New Posts Thread Colour: </label>'+
									  '</p>     '+
									  '<p id="disableNewPostBackgroundColour">'+
										'<input type="checkbox" name="disableNewPostBackgroundC" id="disableNewPostBackgroundC">'+
										'<label for="disableNewPostBackgroundC">Disable New Posts Thread colouring</label>'+
										
									  '</p> '+
									  '<p id="noNewPostBackgroundColour" class="needCpicker">'+
										'<input type="text" name="noNewPostBackgroundC" id="noNewPostBackgroundC">'+
										'<label for="noNewPostBackgroundC">No New Posts Thread Colour: </label>'+
									  '</p>       '+
									  '<p id="disableNoNewPostBackgroundColour">'+
										'<input type="checkbox" name="disableNoNewPostBackgroundC" id="disableNoNewPostBackgroundC">'+
										'<label for="disableNoNewPostBackgroundC">Disable No New Posts Thread colouring</label>'+
										
									  '</p>      '+ 
									  '<p id="onlyEndSquare">'+
										'<input type="checkbox" name="onlyEndSq" id="onlyEndSq">'+
										'<label for="onlyEndSq">Only colour end square </label>'+
										
									  '</p> '+
									  '<p id="styleFlip">'+
										'<input type="checkbox" name="styleFl" id="styleFl">'+
										'<label for="styleFl">Style flip - Colours unread posts in threads rather than read posts</label>'+
										
									  '</p>       '+
									  '<p id="dontTrackStickyThreads">'+
										'<input type="checkbox" name="dontTrackStickyT" id="dontTrackStickyT">'+
										'<label for="dontTrackStickyT">Don\'t track sticky threads</label>'+
										
									  '</p>       '+
									  '<p id="noColourEndSquare">'+
										'<input type="checkbox" name="noColourEndSq" id="noColourEndSq">'+
										'<label for="noColourEndSq">Don\'t colour end square</label>'+
										
									  '</p> '+
									  '<p id="wlrSettingsScrollTo">'+
										'<input type="checkbox" name="wlrSettingsScroll2" id="wlrSettingsScroll2">'+
										'<label for="wlrSettingsScroll2">Scroll to anchor after page load</label>'+
										
									  '</p>   '+    
									  '<p id="lastPost">'+
										'<input type="checkbox" name="lastPos" id="lastPos">'+
										'<label for="lastPos">Go to the last post in the thread after posting</label>'+
										
									  '</p>   '+ 									  
									'<br/>'+
									'</div>'+
									'<div id="customCSSTab" style="display:none;float:left;border:3px solid #333;background-color:#EEEEEE;height:440px;width:795px;margin-bottom:5px;overflow:hidden;" class="wlrtabmenuDivs">'+
									  '<p id="customCSS" style="width:100%;height:100%;float:left;overflow-x:hidden;overflow-y:scroll;">'+
											'<textarea id="cusCSS" style="width:760px;height:408px;float:left;"></textarea>'+
									  '</p>   '+ 	
									'</div>'+
									'<div id="hiddenUsersTab" style="display:none;float:left;border:3px solid #333;background-color:#EEEEEE;height:440px;width:795px;margin-bottom:5px;overflow-x:hidden;overflow-y:scroll;" class="wlrtabmenuDivs">'+
									'</div>'+	
									'<button id="saveWLR" style="float:right;margin-top:6px;">Save</button>'+    
								  '<button href="#" id="closeWlrSettingsModal" style="float:right;margin-top:6px;" title="close">Cancel</button>'+				
								   '<br />'+
								'</div>';
		
			$('#wpsettingslink').click(function(){
					/*
Whirlpool.ajax({
						method: 'GET',
						url: 'http://wp.tristanroberts.name/static/pages/settings.html',
						headers: {
							'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
							'Accept': 'application/atom+xml,application/xml,text/xml',
						},
						onload: function(response){
							document.getElementById('content').innerHTML = response.responseText;
							$('.selected').removeClass('selected');
							$('.beforeselected').removeClass('beforeselected');
							$('#menu_wpplus').addClass('selected');
							$('#menu_industry').addClass('beforeselected');
						}
					});
				});
*/
				
$('body').append('<div id="wlrsettingsoverlay" style="height: 100%; width: 100%; position: fixed; left: 0pt; top: 0pt; z-index: 2999; opacity: 0.5; background-color:#000000;"/>')
						.append(settingsHTML);
				
				var custCSS = $('#cusCSS');
				var newP = $('<p id="hiddenUsersArr">');
				var newUl = $('<ul>');
				newP.append(newUl);
				$('#hiddenUsersTab').append(newP);

				$('#wlrWikiLink').mouseup(function(){
					GM_openInTab('http://whirlpool.net.au/wiki/?tag=whirlpool_plus');
				});
				
				var wmT = $('.wlrtabmenuTabs');
				var wmD = $('.wlrtabmenuDivs');
				wmT.click(function(){
				
					wmT.removeClass('active');
					$(this).addClass('active');
					wmD.hide();
					wmD.eq(wmT.index(this)).show();
					return false;
				
				});


				$('#closeWlrSettingsModal').mouseup(function(){
					$('#wlrSettingsDiv, #wlrsettingsoverlay').remove();
				});
				$('.wlrInfo').click(function(){ //info ...
					return false;
				});
				function iterOverSettings(getOrSet){
				
					$('#wlrSettingsDiv p').each(function(i){
					
						var spaThis = $(this);
						
						var inp = spaThis.children().eq(0);
						var spID = spaThis.attr('id');
						var getG = Whirlpool.get(spID);
	
						if(inp[0].nodeName === "INPUT"){
						
							if(inp[0].type === "checkbox"){
							
								if(getOrSet==='get'){
									if(getG ==='true'){
									
										inp.attr('checked','checked');
									
									}
								}
								else{
								
									if(inp.attr('checked')){
										docs[spID] ='true';
									}	
									else{
										docs[spID] ='false';
									}
									Whirlpool.set(spID, docs[spID]);	
								
								}
							
							}
							else if(inp[0].type === "password" || inp[0].type === "text"){
							
								if(getOrSet==='get'){
									inp.val(decodeURIComponent(getG));
								}
								else{
								
									docs[spID]=encodeURIComponent(inp.val());
									Whirlpool.set(spID, docs[spID]);								
								}
							
							}
						
						}
						else if(inp[0].nodeName === "SELECT"){
							inp.children('option').each(function(){
								var optThis = $(this);

								if(getOrSet==='get'){	
									if(getG===optThis.attr('value')){
									
										optThis.attr('selected','selected');
									}
									else if(optThis.attr('selected')){
										optThis.removeAttr( 'selected' );
									}								
								}
								else{
									if(optThis.attr('selected')){
										docs[spID]=optThis.attr('value');
										Whirlpool.set(spID, docs[spID]);	
									}
								}
							});
						
						}
						else if(inp[0].nodeName === "UL"){
							
							if(docs.hiddenUsersArr.length){
								var hiddUsersArr1 = docs.hiddenUsersArr.split('#');
								hiddUsersArr1.shift();   
								if(getOrSet==='get'){
									$(hiddUsersArr1).each(function(){
											inp.append('<li>User: <a href="http://forums.whirlpool.net.au/forum-user.cfm?id='+this+'">#'+this+'</a>\'s posts are currently hidden.&nbsp;&nbsp;<input type="checkbox" '+
																	'uNumNoHide="'+this+'" name="noHide" class="noHide" value="noHide">&nbsp;&nbsp; - '+
																	'Unhide User</li>');
									
									});                                                                
								}
								else{
								
									inp.find("input:checked").each(function(){
										var toReplace = '#'+$(this).attr('uNumNoHide');
										docs.hiddenUsersArr=docs.hiddenUsersArr.replace(toReplace,'');
										Whirlpool.set('hiddenUsersArr', docs.hiddenUsersArr);
									
									});
								}                                                   
							}
						}
					
					});
					if(getOrSet==='get'){
						custCSS.val(decodeURIComponent(docs.CSStextBox));
					}
					else{
						docs.CSStextBox=encodeURIComponent(custCSS.val());
						Whirlpool.set('CSStextBox', docs.CSStextBox);
						$('#wlrSettingsDiv, #wlrsettingsoverlay').remove();
					}
				}
				iterOverSettings('get');
				$('#forceUpdate').mouseup(function(){
					autoUpdate.xhrCheck('force');
				});
				$('.wlrsetbutUp').mouseup(function(){
					var tBox1 = $(this).prev().prev();
					tBox1.val((Number(tBox1.val())+1).toString());
				});	
				$('.wlrsetbutDown').mouseup(function(){
					var tBox2 = $(this).prev();
					var currentVal = Number(tBox2.val());
					if(currentVal>0){
						tBox2.val((currentVal-1).toString());
					}
				});					  
				$('#resetWLR').mouseup(function(){
				
					for(var l in gmDefaults){
						
						Whirlpool.set(l, gmDefaults[l]);
						docs[l]=gmDefaults[l];

					
					}	
					iterOverSettings('get');

				});	
				
				$('#saveWLR').mouseup(function(){
					iterOverSettings('set');
				});					
				return false;
			
			});


		},
		firstRun:function(){
		
			var ohHaiHTML = '<div id="ohHaiDiv" style="background-color:#EEEEEE;border:1px solid black;color:#333333;display:none;'+
									'left:50%;margin-left:-300px;padding:12px;position:fixed;top:17%;width:600px;overflow:hidden;height:430px;'+
									'display:block;z-index:3000;">'+
									'<a href="#" id="closeohHaiModal" style="float:right;font-weight:bold;font-size:2em;clear:both;color:black;">X</a><br /><br/>'+
									'<img src="http://wp.tristanroberts.name/static/images/script-21.png" alt="default.aspx2.jpg" />'+
								'</div>';	
			$('body').append('<div id="ohHaioverlay" style="height: 100%; width: 100%; position: fixed; left: 0pt; top: 0pt; z-index: 2999; opacity: 0.5; background-color:#000000;"/>')
						.append(ohHaiHTML);								

			docs.WLRfirstRun='false';
			Whirlpool.set('WLRfirstRun', 'false');	
			
			$('#closeohHaiModal').click(function(){
			
				$('#ohHaiDiv, #ohHaioverlay').remove(); 
				return false;
				
			});
		}
	}
	var scriptIdUrl = '50796'; //First change by Troberto :)
	
	var autoUpdate = {

		aUpRegular:function(rdt, currentVersion, getChanges){

			if(Number(currentVersion.replace('.','')) < Number(rdt.replace('.',''))){

				var upDate = confirm ('The latest version of Whirlpool Plus is version '+rdt+' - you have version '+currentVersion+' installed. Changes:'+
										'\r\n\r\n'+getChanges+
										'\r\n\r\n Do you want to update now?');
				if (upDate) {
					Whirlpool.set('installedScriptVersion', rdt);
					window.location.href="http://userscripts.org/scripts/source/" + scriptIdUrl + ".user.js";
				}
				else {
					var tym = '~';
					if(docs.autoUpdateWPplus==="3600000"){
						tym='1 hour';
					}
					else if(docs.autoUpdateWPplus==="21600000"){
						tym='6 hours';
					}
					else if(docs.autoUpdateWPplus==="43200000"){
						tym='12 hours';
					}
					else if(docs.autoUpdateWPplus==="86400000"){
						tym='24 hours';
					}					
					Wp.notify('You will not received this notification again until ' + tym + ' later.', false, 5000);
				}	
				
			}
				
					
		},
		aUpForce:function(rdt, currentVersion, getChanges){
			
				var upDate = confirm ('The latest version of Whirlpool Plus is version '+rdt+' - you have version '+currentVersion+' installed. '+
										'\r\n\r\n changes - '+getChanges+
										'\r\n\r\n Do you want to update now?');
			if (upDate) {
				Whirlpool.set('installedScriptVersion', rdt);
				window.location.href="http://userscripts.org/scripts/source/" + scriptIdUrl + ".user.js";
			}
		
		},
		xhrCheck:function(regOrForce){

				Whirlpool.ajax({
					method: 'GET',
					url: 'http://userscripts.org/scripts/review/' + scriptIdUrl,
					headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Accept': 'text/plain'},
					onload: function(responseDetails){
						var getSNum = $.trim(responseDetails.responseText.split('==UserScript==')[1].split('// @require')[0].split('@version')[1].split('//')[0]);
						var spliterrific = responseDetails.responseText.split('==Changes==')[1].split('// ==/Changes==')[0].split('changes - ');
						var getChanges = spliterrific[spliterrific.length-1].replace('***************/', '');
						var currentVersion = Whirlpool.get('installedScriptVersion');
						if(regOrForce==='force'){
							autoUpdate.aUpForce(getSNum, currentVersion, getChanges);
						}
						else{
							autoUpdate.aUpRegular(getSNum, currentVersion, getChanges);
						}
						
					}
				})		
		},	
		regularUpdateCheck:function(){

			var lastCheck = Number(Whirlpool.get('lastScriptVersionCheck'));
			var currentTime = Date.now();	

			if (currentTime > (lastCheck + Number(docs.autoUpdateWPplus))) {
				Whirlpool.set('lastScriptVersionCheck', ''+currentTime+'');
				autoUpdate.xhrCheck('regular');
			}	
		}

	}
		
	var tracker={
		
		checkIfPrev:function(tn){

			var ofTheMac, checkForAmp;
			var cLR = Whirlpool.get('lastRead0');

			if(cLR){

				if(cLR.match(tn) ){

					var clrThis = cLR.split(',');
					clrThis.pop();

					for(var u=0;u<clrThis.length;u++){

						checkForAmp = clrThis[u].split('t=')[1].split('&')[0].split('#')[0];

						if( checkForAmp == tn ){

							ofTheMac = clrThis[u];
							break;

						}	

					}

				}
				else{
				
					ofTheMac = 'newThread';
				
				}
						
			}
			else{
			
				ofTheMac = 'newCookie';
			
			}

			return ofTheMac;

		},
		threadsAndUserPage:function(durM){

			var stupidimages, stupidAtags, lazyFuckers = 'newread', lazyFuckers2 = "nonewread";
			//var durM = docs.dUrl.match('user');
			var userLink = $('#left .userinfo dt a span').text();
			
			if(	docs.disableNewPostBackgroundColour == 'true'){
				lazyFuckers = 'lazyFuckers';
			}
			if(docs.disableNoNewPostBackgroundColour == 'true'){
				lazyFuckers2 = 'lazyFuckers';
			}			
			if(durM==='user'){
				stupidimages = $("#threads a[href$='#bottom']");
			}
			else{
				stupidimages = $("a[title='Jump to last post']"); 
			}
			var ttttntd = 'http://wp.tristanroberts.name/static/images/script-04.png';
			
			Whirlpool.css("#threads table tbody tr.newread td{background:" + decodeURIComponent(docs.newPostBackgroundColour) + " url(" + ttttntd + ") !important}"+
						"#threads table tbody tr.nonewread td{background:" + decodeURIComponent(docs.noNewPostBackgroundColour) + " url(" + ttttntd + ") !important}"+
						".stopTrack{"+
							"border-bottom-color:grey;"+
							"border-bottom-style:dashed;"+
							"border-bottom-width:1px;"+
							"float:left;"+
							"margin-top:-5px;"+
							"margin-left:-14px;"+
							"opacity:0.3;"+			
						"}			"+	
						".markRead{"+
							"float:right;"+
							"opacity:0.3;"+
							"border-bottom-color:grey;"+
							"border-bottom-style:dashed;"+
							"border-bottom-width:1px;"+	
							"margin-top:-5px;"+					
						"}"+
						".wlrx{"+
						"	position:absolute;"+
						"	font-size:9px !important;"+
						"	width:95px;		"+		
						"}");
			$('tr.closed td').css({
				'background'			:	'#DDDDDD url(/img/forum/grad-ltgrey.gif)',
				'border-bottom-color'	:	'#CCCCCC'
			});
			$('tr.closed a.title').css({
				'color'					:	'#555555'
			});
			
			$('tr.sticky td').css({
				'background'			:	'#CCCCCC url(/img/forum/grad-grey.gif)',
				'border-bottom-color'	:	'#BBBBBB'
			});
			$('tr.sticky a.title').css({
				'color'					:	'#773300'
			});
			

			for(var z=0;z<stupidimages.length;z++){
			
				var jThis = $(stupidimages[z]);
				var checkClass = jThis.parent().parent()[0].className.match('sticky');
				
				if(docs.dontTrackStickyThreads == 'true' && checkClass){

					continue;
				
				}
				else{

					var jumpThreadNum = stupidimages[z].href.split('t=')[1].split('&')[0].split('#')[0];
					var tCheck = tracker.checkIfPrev(jumpThreadNum);
					var lastPoster, postedInColour;
					var postedin = false, jThisParent = jThis.parent();
				
					if(tCheck != 'newCookie' && tCheck != 'newThread'){
					
						var cookArrThreadNum = tCheck.split('t=')[1].split('&')[0].split('#')[0];
						
						if(durM==='user'){
						
							stupidAtags = Number(jThis.parent().prev().prev().text());
							lastPoster = jThis.parent().prev().find('b').text();
							
							if(jThisParent[0].style.backgroundColor == "rgb(226, 208, 187)"){
							
								postedin = true;
								postedInColour = "background-image: url(http://forums.whirlpool.net.au/img/forum/grad-morange.gif) !important; background-color: #E2C6A8 !important;";
							
							}					

						}
						else{
						
							stupidAtags = Number(jThis.parent().prev().prev().prev().prev().text()); 
							lastPoster = jThis.parent().prev().find('a').text();
							
							if(jThisParent[0].style.backgroundColor == "rgb(192, 180, 167)"){
							
								postedin = true;
								postedInColour = "background-color: #C2B7AA !important;";
							
							}					
						
						}

						if( jumpThreadNum == cookArrThreadNum ){
						
							var tholdpare = jThisParent.parent();
							var tCSp = tCheck.split('#r');
							var tCheckSpl = tCSp[1];

							if( (tCheckSpl < (stupidAtags+1)) && (stupidAtags !==0) && (lastPoster != userLink)){ //stupidAtags+1 cause the OP is not counted as a reply
							
								if( docs.onlyEndSquare == 'true' && docs.disableNewPostBackgroundColour == 'false' ){
								
									lazyFuckers = 'lazyFuckers';
									jThisParent.attr("style", "background:"+decodeURIComponent(docs.newPostBackgroundColour)+" url("+ttttntd+") !important");
									
								}
								// SZ:  Added '+1' to get New Posts Count correct							
								var newpostsTitle = stupidAtags - tCheckSpl+1+' new posts';
								jThis.attr('href', '/forum-replies.cfm?'+tCSp[0]+'#r'+(Number(tCheckSpl))).attr('title', 'Jump to last read post');
								//jThis.attr('href', '/forum-replies.cfm?'+tCheck).attr('title', 'Jump to last read post');
								var sPrep = $('<span>');
								var attC = jumpThreadNum+','+tCheck+','+stupidAtags;
								sPrep.attr('attcheat',attC);
								sPrep.attr('class','small wlrx');
								sPrep.html('<a href="#" title="Stop Tracking Thread" class="stopTrack">S</a>');
								sPrep.append('<a href="#" title="Mark All Posts As Read" class="markRead">M</a>');	
																	
								tholdpare.attr("class", lazyFuckers).children('td.reps:first').attr('title', newpostsTitle).prepend(sPrep);
							
							}
							else{
								if(!tholdpare.hasClass("pointer") ){
								
									if( docs.onlyEndSquare == 'true' && docs.disableNoNewPostBackgroundColour == 'false' ){
									
										lazyFuckers2 = 'lazyFuckers2';
										jThisParent.attr("style", "background:"+decodeURIComponent(docs.noNewPostBackgroundColour)+" url("+ttttntd+") !important");
										
									}					
								
									tholdpare.attr("class", lazyFuckers2).children('td.reps:first').prepend('<span attcheat="'+jumpThreadNum+','+stupidAtags+'" class="small wlrx">'+
									'<a href="#" title="Stop Tracking Thread" class="stopTrack">S</a>'+	
										'</span>');
								
								}
								
							}
							if(docs.onlyEndSquare == 'false' && docs.noColourEndSquare == 'true' && postedin){
							
								jThisParent.attr('style', postedInColour+' !important;');
								
							}					
						
						}
					
					}
				
				}

			}
			
			/***stop tracking thread***/
			
			var awhof = $('.stopTrack, .markRead');
			
			for(var d=0;d<awhof.length;d++){	
			
				awhof[d].addEventListener('click', function(e){
				
					e.preventDefault();
			
					var mehThis = $(this);
					var mehThisParent = mehThis.parent();
					var aSP = mehThisParent.attr('attcheat').split(',');
					var stRem = Whirlpool.get("lastRead0");
					var wholeThreadNum = stRem.slice( stRem.indexOf(aSP[0]), stRem.indexOf( ',', stRem.indexOf(aSP[0])) );
					var getLastTD = mehThisParent.parent().parent().children('td:last');
					var wholeReplace, setReadAll;		
					var mehParent = mehThisParent.parent();
					var pppA = mehParent.parent().find('a:last');
					pppA.attr('href','/forum-replies.cfm?t='+aSP[0]+'&p=-1#bottom').attr('title','Jump to last post');

					if(mehThis.hasClass("stopTrack")){
					
						wholeReplace = stRem.replace("t="+wholeThreadNum+",","");
						Whirlpool.set("lastRead0", wholeReplace);	
						getLastTD.removeAttr("style");
						mehThisParent.parent().parent().removeClass("newread nonewread");
						var grabMark = mehThis.next();
						if(grabMark[0]){
							grabMark.remove();
						}
					
					}
					else{
					
						var pageNo = '&p=1';
						var getLastPage = mehParent.prev().prev().children('span.small').children('a:last');
						//unsafeWindow.console.log('getLastPage[0]   '+getLastPage[0]);
						if(getLastPage[0]){
						//unsafeWindow.console.log('if(getLastPage[0])   ');
							pageNo = '&p='+getLastPage[0].href.split('&p=')[1]; 
						}
						//unsafeWindow.console.log('pageNo   '+pageNo);
						setReadAll = wholeThreadNum.split('&')[0].split('#r')[0]+pageNo+'#r'+((Number(aSP[2])+1).toString());	//+1 cause the OP is not counted as a reply (loose type FTL!)
						//unsafeWindow.console.log('setReadAll   '+setReadAll);
						wholeReplace = stRem.replace(wholeThreadNum, setReadAll);
						//unsafeWindow.console.log('wholeReplace   '+wholeReplace);
						Whirlpool.set("lastRead0", wholeReplace);	
						getLastTD.attr("style", "background:"+decodeURIComponent(docs.noNewPostBackgroundColour)+" url("+ttttntd+") !important");
						mehThisParent.parent().parent().removeClass("newread").attr("class", lazyFuckers2);

					}

					mehThis.remove();

					return false;

				}, false);
			
			}
			
			
		},
		forumReplies:function(){
			var lastReadLink;
			var yOff = (docs.win.pageYOffset+docs.win.innerHeight);
			var threadNumber = docs.threadNumber;
			var nam = document.evaluate( '//td[@class = "bodyuser"]/a[contains(@name, "r")][1][last()]' ,document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

			var anchorSP= 0;
			
			if(docs.dUrl.indexOf('#r')>-1 && docs.dUrl.indexOf('r=')<0){
				anchorSP=docs.dUrl.split('#r')[1].split('&')[0];
			}


			var pagLiLast =  $('#top_pagination li.last').prev().prev().attr('class');
					
					
			if(Number(anchorSP)>Number(nam.snapshotItem(nam.snapshotLength-1).name.split('r')[1]) && pagLiLast == 'current'){
				window.location = nextpage.href+'#r'+anchorSP;
			}
			
			
			function hazRead(rN, eType){

				if(Number(docs.repliesA[docs.repliesA.length-1].href.split('#r')[1]) <= Number(rN) && (eType != 'new') && (docs.disableTrackerPostBackgroundColour == 'false')&&(docs.styleFlip == 'false')){

					Whirlpool.css(".bodypost{background:"+decodeURIComponent(docs.trackerPostBackgroundColour)+" !important}");
					return 'noNew';
				
				}
				else{
		
					docs.repliesA.each(function(i){	
					
						var t = $(this);
						var h = t.attr('href');
						var curtop = t.offset().top;
						
						if(i === 0){ 
						
							lastReadLink = h;

						}
						//SZ: Changed 	"< Number(rN)" to "<= Number(rN)" to fix Highlighted read posts being off by one
						if( (docs.styleFlip == 'false') && ((Number(h.slice(h.lastIndexOf('#r')+2))) <= Number(rN)) && (eType == 'load') && (docs.disableTrackerPostBackgroundColour == 'false')){

							$(this).parent().parent().css('background', decodeURIComponent(docs.trackerPostBackgroundColour));

						}		
						else if( (docs.styleFlip == 'true') && ((Number(h.slice(h.lastIndexOf('#r')+2))) > Number(rN)) && (eType == 'load') && (docs.disableTrackerPostBackgroundColour == 'false')){

							$(this).parent().parent().css('background', decodeURIComponent(docs.trackerPostBackgroundColour));
						
						}				
						if( curtop < yOff ){

							lastReadLink = h;
							
							if(docs.repliesA.index(t[0])==(docs.repliesA.length-1)){  //check if the last post is a deleted one
							
								var containerTR = t.parent().parent().parent();
								var rSplitArr = h.split('#r');
								var currentAnchor = Number(rSplitArr[1]);
								while(containerTR.next()[0] && !containerTR.next().attr('id') && !$('#top_pagination a[href*="&p="]')[0]){
									currentAnchor++;
									containerTR=containerTR.next();
								}

								lastReadLink = rSplitArr[0]+'#r'+(currentAnchor.toString());
						
							}
							
						}

					});

					return 't='+lastReadLink.split('t=')[1];
				
				}

			}
			
			docs.win.addEventListener('scroll', function() {

				if((docs.win.pageYOffset+docs.win.innerHeight) > yOff){

					yOff = (docs.win.pageYOffset+docs.win.innerHeight);

				}

			}, false);	
			
			docs.win.addEventListener('load', function(){

				var loadCheck = tracker.checkIfPrev(threadNumber);

				if(loadCheck != 'newThread' && loadCheck != 'newCookie'){

					hazRead(loadCheck.slice(loadCheck.lastIndexOf('#r')+2), 'load');
				
				}

			}, false);	
			
			
			docs.win.addEventListener('beforeunload', function(){

					var cP = tracker.checkIfPrev(threadNumber);
					var returnedLink;
					
					if( cP == 'newThread') {
					
						returnedLink = hazRead(0, 'beforeunload');
						var getLR2splitCheck = Whirlpool.get("lastRead0").split(',');
					
						if(getLR2splitCheck.length < Number(docs.numThreads2Track)) {
						
							Whirlpool.set("lastRead0", Whirlpool.get('lastRead0')+returnedLink+",");
						
						}
						else{
						
							var sliceFirstTrack = Whirlpool.get("lastRead0");
							var sliceFirstTrack2 = sliceFirstTrack.substr(sliceFirstTrack.indexOf(',')+1)+returnedLink+",";
							Whirlpool.set("lastRead0", sliceFirstTrack2);				
						
						}

					}			
					else if(cP == 'newCookie'){
					
							returnedLink = hazRead(0, 'beforeunload');
							Whirlpool.set("lastRead0", returnedLink+",");
					
					}
					else{
					
						var checkSplit = cP.slice(cP.lastIndexOf('#r')+2);
						returnedLink = hazRead(checkSplit, 'beforeunload');

						if( (returnedLink !='noNew')&& ( Number(returnedLink.slice(returnedLink.lastIndexOf('#r')+2)) > Number(checkSplit) ) ){

							var repREturned = Whirlpool.get("lastRead0").replace(cP,returnedLink);
							Whirlpool.set("lastRead0", repREturned);

						}

					}
					
			}, false);

			if(docs.dUrl.indexOf('#')>-1 && docs.wlrSettingsScrollTo == 'true' && !docs.dUrl.match('bottom')){
				
				docs.win.setTimeout(function(){

					var an = '#'+docs.dUrl.split('#')[1];
					var a = $('a[href$='+an+']');
					var avatarCheck = a.parent().parent().prev().prev().find('a:first').height();

					if(avatarCheck>30){

						$.scrollTo(a, 500, {offset:-150});
						
					}

				}, 1000);

			}
			
		}
				
			
	}

	function quickQuote(){
	
		var gottaPee, backImg, pReply = $('.foot_reply a');

		whirlC.generalStyle();

		if(pReply[0]){
			$.get(pReply[0].href, function(data){

				gottaPee = data.split('name="tinkle" value="')[1].split('">')[0];
			
			});
			if(document.title.match(' - Focused - The Pool Room - Whirlpool Forums')){

				backImg = 'http://wp.tristanroberts.name/static/images/script-05.png';
				Whirlpool.css('#qqTextArea{background-image:url('+backImg+');}');				
			
			}
		}
		else{
			backImg = 'http://wp.tristanroberts.name/static/images/script-06.png';
			Whirlpool.css('#opInputs, #qqpost{display:none !important;} #qqTextArea{background-image:url('+backImg+');}');
		}
		
		var currTime = time();
		docs.lmtr = docs.repliesTR.eq(docs.repliesTR.length-1);

		function postPost(textArtex, textOptions){

			$.ajax({
				type: "POST",
				url: pReply[0].href,
				data: "version=2&post2=post&form=too+right&tinkle="+gottaPee+"&"+ 		
				"poll_enabled=false&poll_choice_size=0&pasteheader=true&timestart=%7Bts+%27"+currTime+"%27%7D&"+
				"body="+encodeURIComponent(textArtex)+"&"+textOptions+
				"cliptemp=Paste+external+quotes+here",
				success: function(msg){
			

					if( (msg.indexOf('<th><a name="preview"></a>ERROR</th>') > -1) && (msg.indexOf('You are quoting significantly more words than you have written.') > -1)){

						$('#qqTooManyWords').css('display','block');
						
						$('#wordsOK').mouseup(function(){

							$('#qqTooManyWords').css('display','none');						
						
						});
						docs.q.css('background','#E5E5E5 none no-repeat scroll 50% 50%');

					}
					else{
					
						if($('#lastPost').attr('checked') && docs.dUrl.indexOf("&p=-1#bottom")<0){
						
							docs.d.location = "http://forums.whirlpool.net.au/forum-replies.cfm?t="+docs.dUrl.split('t=')[1].split('&')[0]+"&p=-1#bottom";
						
						}
						else{
					
							docs.q.css('background','#E5E5E5 none no-repeat scroll 50% 50%').val('');
							var removeS = msg.slice(msg.lastIndexOf('<tr id="'));
							$('#previewTR').remove();	
							var newTR = $(removeS.split('</tr>')[0]+'</tr>');
							$('#replies tr[id^="r"]:last').after(newTR);
							if(docs.editInPlace=== 'true'){
								newTR.children('.bodypost:first').children('div').eq(1).after('<div style="margin: 5px;"><a class="eip" href="#">(edit in place)</a></div>');
							}
						}
						Whirlpool.set('textareraSave', '');
					}

				},
				error: function(XMLHttpRequest, textStatus, errorThrown){

					alert('something broke!  ==>'+XMLHttpRequest+textStatus+errorThrown);		
					docs.q.val(Whirlpool.get('textareraSave'));	
					
				}


			});	

		}
		
		var wcButtons = whirlC.buttons("qqbuttonsDiv", "auto;", "qqwcodeButtons");
					
		$('#replies').append('<div id="qQuote" align="center">'+wcButtons+'<div id="qqPreview"></div><div id="qqTooManyWords">'+
						'<p style="margin:0 auto;margin-top:10px;">ZOMG! You are quoting significantly more words than you have written.<br /><br />'+
						'<img src="http://i27.tinypic.com/142zdi8.jpg" /></p><button type="button" id="wordsOK">OK</button>'+
						'</div><textarea id="qqTextArea" cols="'+docs.quickReplyboxCols+'" rows="'+docs.quickReplyboxRows+'"></textarea><br />'+
						'<button type="button" style="" id="qqpostclear" name="qqpost">Clear</button><button type="button" style="" id="qqpost" name="qqpost">Post Reply</button>'+
						'<img src="http://i28.tinypic.com/jzbn0n.gif" id="aloader" />'+
						'<div id="opInputs" style="height:30px;width:650px;">'+
						'<p><input type="checkbox" checked="checked" style="cursor: pointer;" value="true" wc2="w" id="modewc" name="modewc"/>'+
						'<label style="cursor: pointer;font-size:10px;" for="modewc"> Use WhirlCode</label></p>'+
						'<p><input type="checkbox" checked="checked" style="cursor: pointer;" value="true" wc2="b" id="modeht" name="modeht"/>'+
						'<label style="cursor: pointer;font-size:10px;" for="modeht"> Allow HTML</label></p>'+
						'<p><input type="checkbox" checked="checked" style="cursor: pointer;" value="true" id="modest" wc2="e" name="modest"/>'+
						'<label style="cursor: pointer;font-size:10px;" for="modest"> Auto entities </label></p>'+
						'<p><input checked="checked" type="checkbox" style="cursor: pointer;" value="true" id="modewl" wc2="a" name="modewl"/>'+
						'<label style="cursor: pointer;font-size:10px;" for="modewl"> Make links clickable</label></p>'+
						'<p>'+
						'	<input type="checkbox" name="modesu" id="autoSubscribe" wc2="t" value="true" style="cursor: pointer;"/>'+
						'	<label for="modesu" style="cursor: pointer; font-size: 10px;"> Watch</label>'+
						'</p>		'+					
						'<p><input type="checkbox" style="cursor: pointer;" id="autoPreview" name="autoPreview"/>'+
						'<label style="cursor: pointer;font-size:10px;">Auto Preview</label></p>'+		
						'<p><input type="checkbox" style="cursor: pointer;" id="lastPost" name="lastPost"/>'+
						'<label style="cursor: pointer;font-size:10px;">Go To Last Post</label></p>'+									
						'</div></div>');
							
		docs.q = $('#qqTextArea');
		whirlC.buttonEvents("qqwcodeButtons", docs.q, whirlC.code());
		var oInpArr = $('#opInputs input');				
		
		function getOptions(t){

			var textOptions = "&";
			var settingStr = "pfl";
			var ret;
		
			oInpArr.each(function(i){
			
				var opThis = $(this);

				if(opThis.attr('checked')){

					settingStr += ''+opThis.attr('wc2');

					if(opThis.attr('name').match('mode')){
					
						textOptions+= ''+opThis.attr('name')+'=true&';
						
					}

				}
			
			});

			(t == 'preview')? ret = settingStr: ret = textOptions;

			return ret;
		
		}
	
		docs.q.bind("focus keyup", function() {
		
			if(docs.autoPreview==='true'){

				wcPrev.showPreview();
		
			}
			Whirlpool.set('textareraSave', $(this).val());
		});
		
		$('#qqpostclear').mouseup(function(){
		
			docs.q.val('');

			Whirlpool.set('textareraSave', '');

			if(docs.autoPreview==='true'){
			
				wcPrev.showPreview();
		
			}
		

		});

		docs.eh=getOptions('preview');
		if(docs.autoPreview==='true'){
		
			$('#autoPreview').attr('checked', 'checked');
		
		}
		if(docs.lastPost==='true'){
		
			$('#lastPost').attr('checked', 'checked');
		
		}	
		if(docs.autoSubscribe==='true'){
		
			$('#autoSubscribe').attr('checked', 'checked');
		
		}				
		oInpArr.click(function(){
		
			var oIthis = $(this);
			docs.eh=getOptions('preview');
			var w, oIid=oIthis.attr("id");
			
			if(oIid==='autoPreview'){
			
				if(oIthis.attr('checked')){

					Whirlpool.set('autoPreview','true');
					docs.autoPreview='true';
					wcPrev.showPreview();
				
				}
				else{

					Whirlpool.set('autoPreview','false');
					docs.autoPreview='false';
					$('#previewTR').remove();			
					docs.pTd3=null;
					
				}
			
			}
			else if(oIid==='lastPost'||oIid==='autoSubscribe'){
			
				($(this).attr('checked'))? w='true':w='false';

				Whirlpool.set(oIid, w);		
				docs[oIid]=w;
			
			}
			
		});
		
		docs.repliesA.each(function(i){
		
			var tParent = this.parentNode;
			
			var spanBar = document.createElement('span');
			spanBar.className='bar';
			spanBar.textContent=' | ';
			
			var noJQqqLink = document.createElement('a');
			noJQqqLink.setAttribute('class','qqlink greylink');
			noJQqqLink.textContent='q-quote';
			noJQqqLink.href='#';
			
			tParent.insertBefore( spanBar, this );
			tParent.insertBefore( noJQqqLink, spanBar );
		
			$(noJQqqLink).bind("click", function(){
		
				docs.q=$('#qqTextArea'); /***gotta fix this***/
		
				if(docs.autoPreview==='true'){

					wcPrev.showPreview();

				}
				
				var qqtrParent = docs.repliesTR.eq(i);
				var qqpre = qqtrParent.attr('id').split('r')[1];
				var qquNam;
				
				qqtrParent.find('span').each(function(){

					if($(this).attr('class') == 'bu_name'){

						qquNam = $(this).text();

					}

				});
				var qqtSel = window.getSelection().toString().replace(/^(.+)$/mg, '["$1"]');

				if(docs.q.val().length > 0){

					docs.q.val(docs.q.val()+'\r@'+qqpre+' '+qquNam+' writes... \n'+qqtSel+'\n\n');
				
				}
				else{
				
					docs.q.val(docs.q.val()+'@'+qqpre+' '+qquNam+' writes... \n'+qqtSel+'\n\n');
				
				}
			
				docs.q[0].focus();

				Whirlpool.set('textareraSave', docs.q.val());
			
				return false;

			});

		});

		function pfft(){
		
			Whirlpool.set('textareraSave', docs.q.val());
			
			if(docs.checkIfSignedIn){
			
				alert('You Are Not Currently Signed Into Whirlpool');
			
			}
			else{
			
				docs.q.css('background','#E5E5E5 url(http://i28.tinypic.com/jzbn0n.gif) no-repeat scroll 50% 50%');
				
				postPost(docs.q.val(), getOptions('post'));		
				
			}
		
		}
		
		$('#qqpost').mouseup(function(){
		
			if(!gottaPee){
			
				$.get(pReply[0].href, function(data){

					gottaPee = data.split('name="tinkle" value="')[1].split('">')[0];

				});
			
			}
		
			pfft();
			
		});
		$(docs.d).keydown(function(event) {
		
			if(event.ctrlKey==1 && event.keyCode==13 ){
			
				if(!gottaPee){
				
					$.get(pReply[0].href, function(data){

						gottaPee = data.split('name="tinkle" value="')[1].split('">')[0];

					});
				
				}
		
				pfft();
				
			}
				
		});	

		if(docs.q.val()===''){
		
			docs.q.val(Whirlpool.get('textareraSave'));
			
		}	
		

	}
	var wcWikiWhimNewThread={

		wwcButtons: whirlC.buttons("qqbuttonsDiv", "auto;", "qqwcodeButtons"),
	
		sendShitToPreview:function(){
		
			docs.q=$('#body');
			docs.q.parent().before(wcWikiWhimNewThread.wwcButtons);
			$('#wc_whirlurl, #wc_whirllink, #wc_siSearch').attr('disabled','disabled');
			whirlC.buttonEvents("qqwcodeButtons", docs.q, whirlC.code());
			docs.eh='pflwae';
			docs.q.bind("focus keyup", function() {

				wcPrev.showPreview();

			});				
			if(docs.dUrl.indexOf('rt=')>-1){
			
				var whimQuoteLink = document.createElement('a');
				whimQuoteLink.innerHTML='Quote Whim';
				whimQuoteLink.setAttribute('style','float:right;');
				whimQuoteLink.href="#";

				$('td[bgcolor="#c3c9de"]').prepend(whimQuoteLink);
				$(whimQuoteLink).click(function(){
				
					var qqtSel = window.getSelection().toString().replace(/^(.+)$/mg, '["$1"]');
					docs.q.val(docs.q.val()+qqtSel);
					wcPrev.showPreview();
					return false;
					
				});				
			
			}
		},
		whimReply:function(){

			docs.pTd3 = $('blockquote~div');
			docs.pTd3.attr('style', 'background:#EEEEEE url(/img/forum/reply-eeeeee.gif) repeat-x scroll center bottom;'+
			'border-bottom:1px solid #BBBBBB;'+
			'border-top:2px solid #F2F2F2;'+
			'padding:8px 12px 10px;'+
			'vertical-align:middle;');
			wcWikiWhimNewThread.sendShitToPreview();

		},
		uPageWhim:function(){

			var containerTable = document.evaluate('/html/body/div/div[3]/div/div[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			var prevContainer = document.createElement('div');
			prevContainer.id='prevContainer';
			prevContainer.setAttribute('style', 'background:#EEEEEE url(/img/forum/reply-eeeeee.gif) repeat-x scroll center bottom;'+
			'border-bottom:1px solid #BBBBBB;'+
			'border-top:2px solid #F2F2F2;'+
			'padding:8px 0px;'+
			'float: left; width: 100%;'+
			'vertical-align:middle;');	
			containerTable.appendChild(prevContainer);
			docs.pTd3 = $(prevContainer);
			
			wcWikiWhimNewThread.sendShitToPreview();
		},
		wikiNewThread:function(b){
			docs.q=$(b);
			docs.q.before(wcWikiWhimNewThread.wwcButtons);
			whirlC.buttonEvents("qqwcodeButtons", docs.q, whirlC.code());	
		}		

	}
	var wlrMenu={
	
		generateMenu:function(){

			var lForLeft = $('#left');
			var whereMenu = lForLeft.offset().left+lForLeft.width()-4+"px";

			if(docs.enableWideWhirlpool==='true'){
				window.setTimeout(function(){	//need to wait for the css/theme to load
					whereMenu = lForLeft.offset().left+lForLeft.width()-4+"px";
					$('#pmenu')[0].style.left=whereMenu;
				}, 500);
			}

			Whirlpool.css("#pmenu {padding:0;list-style-type: none; position:fixed;z-index:50;height:19px;overflow:hidden;width:18px;left:"+whereMenu+";}"+
						"#pmenu img{margin;0;padding:0;border:none;background:transparent;width:16px;}"+
						"#pmenu:hover {height:auto;overflow:visible;}"+
						"#pmenu ul {padding:0; margin:0; list-style-type: none; width:101px;}"+
						"#pmenu li {position:relative;z-index:51;}"+
						"#pmenu a{display:block;width:110px;font-weight:bold;font-size:12px; color:#FFFFFF; height:26px; line-height:26px; "+
							"text-decoration:none; text-indent:5px; background:#616CA3; border:1px solid orange;white-space: nowrap; }"+
						"#pmenu>li>ul>li>a{background:#EDEDED;color:#000;}"+
						"#pmenu li:hover > a {background:#dfd7ca; color:#c00;}"+
						"#pmenu li ul {display: none;} "+
						"#pmenu li:hover > ul {display:block; position:absolute; top:0; z-index:52;margin-left:111px;}");			
				
				

			var spinner = 'http://wp.tristanroberts.name/static/images/script-30.png';

			var gfx = 'http://forums.whirlpool.net.au/skin/web/img/favicon.gif';	
			var uNumber = docs.uinfo.find('a')[0].href.split('/user/')[1];		
			var newUL2, unLi = $('<ul id="pmenu">');

			unLi.html('<img id="menuSpinner" src="'+spinner+'" />'+
				'<li><a href="#">WP User</a>'+
					'<ul> ' +
						'<li><a href="http://forums.whirlpool.net.au/user/'+uNumber+'">Your Posts</a></li> ' +
						'<li><a href="http://forums.whirlpool.net.au/user/?action=online">People Online</a></li> ' +
						'<li><a href="http://forums.whirlpool.net.au/whim/?action=inbox">Inbox</a></li> ' +
						'<li><a href="http://forums.whirlpool.net.au/whim/?action=outbox">Outbox</a></li> ' +
						'<li><a href="http://forums.whirlpool.net.au/whim/?action=contacts">Contacts</a></li> ' +
						'<li><a href="http://forums.whirlpool.net.au/forum/?action=watched">Watched Threads</a></li> ' +
						'<li><a href="http://forums.whirlpool.net.au/forum/?action=threads_search">Thread Search</a></li> ' +
						'<li><a href="http://forums.whirlpool.net.au/profile/">Account Settings</a></li> ' +
						'<li><a href="http://forums.whirlpool.net.au/profile/?a=logout&logout='+uNumber+'">Log out</a></li> ' +
					'</ul> ' +
				'</li> ');
			
			$('.forumlist').each(function(){

			  $(this).children().each(function(){
			
					if(this.tagName=='DT'){
						var newLI1 = $('<li>');
						var newA1 = $('<a href="#">');
						newUL2 = $('<ul>');
						newA1.text($(this).text());
						newLI1.append(newA1);
						newLI1.append(newUL2);
						unLi.append(newLI1);
					}
					else{
						var newLI2 = $('<li>');
						newLI2.html($(this).html());
						newUL2.append(newLI2);
					}
					
				});
			});		
			unLi.find('*').addClass('notarget');
			wlrMenu.unLi=unLi;
						
		},	
		rightClickMen:function(){
			
			wlrMenu.generateMenu();
				
			document.addEventListener('mouseup', function(e) {

				if(e.which==3 && e.target.tagName != 'A' && e.target.tagName != 'TEXTAREA'){
				
					wlrMenu.unLi.remove();
					$('body').prepend(wlrMenu.unLi);
					$('#menuSpinner').remove();
					wlrMenu.unLi[0].style.position = 'absolute';
					wlrMenu.unLi[0].style.left = ''+e.pageX-250+'px';
					wlrMenu.unLi[0].style.top = ''+e.pageY+'px';
					wlrMenu.unLi[0].style.overflow='visible';

				}
				if(e.which==1 && $('#pmenu')[0] && e.target.className != 'notarget'){
				
					wlrMenu.unLi.remove();
				
				}

						
			}, false);
		},
		spinnerMen:function(){
		
			wlrMenu.generateMenu();				
				
			$('body').prepend(wlrMenu.unLi);
			wlrMenu.unLi.css('margin', '25px 0 50px 5px');

		}
						
	}
	function noBottom(){
		
		$('.threads a').each( function(){

				this.href = this.href.replace("&p=-1#bottom", "");

		});				
		
	}
	var imVidImg = {

		imVidImgGrabAs: null,
		inlineVideos:function(tH, jThis, tableRow){
		
			var vidnum;	
			if(tH.indexOf("youtube.com/watch")>-1){
			
				vidnum = tH.split('v=')[1].split('&')[0];
				jThis.after('<embed src="http://www.youtube.com/v/'+vidnum+'&hl=en&fs=1" type="application/x-shockwave-flash" allowscriptaccess="always" '+
								'allowfullscreen="true" width="425" height="344"></embed>');

			}
			else if(tH.indexOf("google.com/videoplay")>-1){
			
				vidnum = tH.split('docid=')[1].split('&')[0];
				jThis.after('<embed id="VideoPlayback" src="http://video.google.com/googleplayer.swf?docid='+vidnum+'&hl=en&fs=true" '+
								'style="width:400px;height:326px" allowFullScreen="true" allowScriptAccess="always" type="application/x-shockwave-flash"> </embed>');

			}
			else if(tH.indexOf("vimeo.com/") > -1){
			
				vidnum = tH.split('vimeo.com/')[1];
				if(!isNaN(vidnum)){
					jThis.after('<embed id="VideoPlayback" src="http://vimeo.com/moogaloop.swf?clip_id=' + vidnum + '&server=vimeo.com&show_title=1&show_byline=1&show_portrait=0&color=&fullscreen=1" '+
								'style="width:400px;height:326px" allowFullScreen="true" allowScriptAccess="always" type="application/x-shockwave-flash"></embed>');
				}

			}

		},
		openImageOnPage:function(t){
			t.next('img').click(function(){
				$(this).toggleClass('maximumWidthImage');
				if(docs.enableWideWhirlpool == 'true'){
					$('body, html').css({
						'overflow-x' : 'visible'
					});
				}
				
			});		
		},
		inlineImages:function(tH, jThis, tableRow){

			var tHlc=tH.toLowerCase();
			var extensions = '.jpeg.jpg.gif.png.bmp.tiff';
			var dot=tHlc.lastIndexOf(".");
			if(dot >= 0 && extensions.indexOf(tHlc.substr(dot)) > -1 && tHlc.indexOf('?') < 0 && tHlc.indexOf('File:') < 0 && tHlc.substr(dot) != '.tiff') {
				var closestP = tableRow.width()-40;
				var jHtml = jThis.html();
				jThis.after('<img src="'+tH+'" style="max-width:'+closestP+'px;display:block !important;border:none;cursor: pointer;" />');
				imVidImg.openImageOnPage(jThis);
				
			}
			else if(dot >= 0 && extensions.indexOf(tHlc.substr(dot)) >-1 && tHlc.indexOf('?')<0 && tHlc.substr(dot) == '.tiff'){
				var closestP = tableRow.width()-40;
				var jHtml = jThis.html();
				jThis.html(jHtml+'<embed src="'+tH+'" style="max-width:'+closestP+'px;display:block !important;border:none;cursor: pointer;" type="image/tiff" negative="yes"></embed>');
				imVidImg.openImageOnPage(jThis);
			}
			else if(tH.indexOf('redbubble.com')>-1){
				
				var hrs = tH.split('/');  
				var lasthr = hrs[hrs.length-1];					
				if(!lasthr.length){
					lasthr=hrs[hrs.length-2];
				}
				var closestP = tableRow.width()-40;
				var jHtml = jThis.html();
				jThis.html(jHtml+'<img src="http://images-0.redbubble.net/img/art/size:xlarge/view:main/'+lasthr+'.jpg" '+
				'style="max-width:'+closestP+'px;display:block !important;border:none;cursor: move;" />');					
				imVidImg.openImageOnPage(jThis);
			}
						
		}
	
	}
	function avatar(dreThis){

		var bfirst = dreThis.children('td:first');
		var cDiv = bfirst.children('div');
		var uNumClass = cDiv.eq(1).children('a:first').attr('href').split('/user/')[1];
		var uClassClass = cDiv.eq(2).text().replace(/ /g,'_');
		dreThis.addClass("wlr_"+uNumClass+" "+uClassClass);
		bfirst.prepend('<div><a href="/user/'+uNumClass+'"/></div>');

		if(!docs.avatarCSS){
			Whirlpool.css('td.bodyuser > div:first-child > a:first-child { margin:0 auto; } #replies tr .bodyuser div div:last-child:before { padding:5px 0 0; }');
//			Whirlpool.css('@import "http://goodbyepolar.com/wpavatars/avatar.css";');
			if(docs.penaltyBoxBackground==='true'){
				Whirlpool.css('tr.In_the_penalty_box > td.bodyuser {background-image:url(http://wp.tristanroberts.name/static/images/script-22.png)!important;background-repeat:repeat !important;');
			}
			if(docs.animatedAvatars==='true'){
//				Whirlpool.css('@import "http://goodbyepolar.com/wpavatars/animatedavatar.css";');
			}		
			docs.avatarCSS=true;
		}
	
	}
	function userNotes(trParent, i){
	
		var firstDiv = trParent.children('td:first').children('a:last').next();
		var uNum = firstDiv.text().split('User ')[1].split(' ')[0];
		var usrNtsPic = 'http://wp.tristanroberts.name/static/images/script-08.png';
		var uNJa=eval('('+docs.userNotesArr+')');
		if(uNJa!=='{}' && uNJa[uNum]){
			usrNtsPic = 'http://wp.tristanroberts.name/static/images/script-09.png';		
		}

		
		$('<img src="'+usrNtsPic+'"/>').attr({uNum: uNum,title:'User Note',parentNum: 'parentNum'+trParent.attr('id')})
			.css({'padding':'0 5px','cursor':'pointer'}).appendTo(firstDiv[0]).bind('mouseup',function(e){

			if(!docs.d.getElementById("uS"+uNum.split('#')[1])){
				var modalBackground = $('<div id="wlrsettingsoverlay" style="height: 100%; width: 100%; position: fixed; left: 0pt; top: 0pt; z-index: 2999; opacity: 0.5; background-color:#000000;"/>');
				$('body').append(modalBackground);
				var key, uNJ, ithis = $(this),unThis = ithis.attr("uNum"),uN = Whirlpool.get('userNotesArr');
				
				if(uN!=='{}'){

					uNJ=eval('('+uN+')');
					key = uNJ[unThis];

				}
				else{
				
					uNJ={};
				
				}

				var closer = docs.d.createElement('a');
				closer.setAttribute('style','left:230px;position:relative;color:grey;font-weight:bold;font-size:1.5em;text-decoration:none;');
				closer.href="#";
				closer.innerHTML=' X ';
				
				var diag = docs.d.createElement('div');
				diag.setAttribute("clickerID",ithis.attr('parentNum'));
				diag.setAttribute('title','User Note');
				diag.setAttribute('style','background-color:#FFD27D;position:absolute;top:'+e.pageY+'px;left:'+e.pageX+'px;width: 250px; height: 150px;z-index: 3000;');
				
				var diagBR = docs.d.createElement('br');
				var diagTa = docs.d.createElement('textarea');
				diagTa.setAttribute('style','border: none ; margin: 0pt 0pt 0pt 5px; height: 120px; width: 240px;');
				if(key && key!==''){
				
					diagTa.value=key;
				
				}
				
				diag.appendChild(closer);
				diag.appendChild(diagBR);
				diag.appendChild(diagTa);
				docs.d.body.appendChild(diag);


				$(closer).bind('click', function(){

					var texValar=diagTa.value;

					if(key && texValar===''){
					
						delete uNJ[unThis];
						Whirlpool.set('userNotesArr', uNJ.toSource().toString());
						$('').attr('src', 'http://wp.tristanroberts.name/static/images/script-08.png');
						
						
					}
					else if(texValar!==''){

						uNJ[unThis]=texValar;
						Whirlpool.set('userNotesArr', uNJ.toSource().toString());
						$('').attr('src', 'http://wp.tristanroberts.name/static/images/script-09.png');
				
					}
					
					docs.d.body.removeChild(diag);
					$('#wlrsettingsoverlay').remove();
					return false;
				
				});
				
				
			}
			return false;
		}); 		

	}	
	function userIgnore(trParent){
		var tdFirst = trParent.children('td:first');
		var firstDiv = tdFirst.children('a:last').next();
		var uNum = firstDiv.text().split('User ')[1].split(' ')[0];
		
		if(docs.hiddenUsersArr.length){
			var hiddUsersArr = docs.hiddenUsersArr.split('#');
			hiddUsersArr.shift();
			for(var i=0;i<hiddUsersArr.length;i++){
			
				var uNumWithoutHash = uNum.split('#')[1];
				var numwithHash = '#'+hiddUsersArr[i];
			
				if(numwithHash==uNum){
					var user_number = numwithHash;
					var user_name	= trParent.find('.bu_name').text();
					var post_date	= trParent.find('.bodypost div:last').text().replace('posted ', '');
					trParent.text('');
					trParent.append('<td class="bodymore small" bgcolor="#e5e5e5">  User #' + user_number + ' &nbsp; <a href="/user/' + user_number + '" style="color: black;"><b>' + user_name + '</b></a> </td> <td class="bodymore small" bgcolor="#eeeeee"> <i>This post was hidden by you. (Whirlpool Plus).</i> </td> <td class="bodymore small" bgcolor="#e5e5e5">' + post_date + '</td> ');
				
				}
			}
		}
			
		var lastDiv = tdFirst.children('div:last');
		var hideU = $('<span title="hide user" style="margin-right:5px;" class="voteitem"> X </span>');
	
		if(lastDiv.attr('class')){

			lastDiv.prepend(hideU);
		
		}
		else{
			var itnX = $('<div class="voteblock">')
			itnX.append(hideU);
			lastDiv.after(itnX);
		
		}
		
		hideU.click(function(){
		
			var uNum2 = firstDiv.text().split('User ')[1].split(' ')[0];
			var uNumWithoutHash2 = uNum2.split('#')[1];
			if(!docs.hiddenUsersArr.match(uNum2)){
			
				Whirlpool.set('hiddenUsersArr', Whirlpool.get('hiddenUsersArr')+uNum2);
				docs.hiddenUsersArr+=uNum2;
				
				docs.repliesTR.each(function(){
					var repParent = $(this);
					
					if(repParent.children('td:first').find('a[href$="forum-user.cfm?id='+uNumWithoutHash2+'"]')[0]){

						repParent.hide();
					
					}
				
				});
				
			}
			
			return false;
			
		});

	}
	var toggleSections = {
		links:function(){
			var ts_sections = document.getElementsByTagName('h3');
			var ts_i = 0;
			var ts_id;
			while(ts_i < ts_sections.length){
				ts_id = 'ts_section' + ts_i;
				ts_sections[ts_i].innerHTML += ' - (<a href="#" id="' + ts_id + '">hide</a>)';
				document.getElementById(ts_id).addEventListener('click', function(e){
					alert(ts_i);
					var id = ts_i;
					alert(id);
					document.getElementsByTagName('table')[id].style.display = 'none';
				}, true);
				
				ts_i++;
			}
		}
	}
	var hideDelMov={
			delRem:function(){
				Whirlpool.css('.threadP0, .threadP1, .threadP2, .threadP3, .deleted{display:none;}');
			},
			mv:function(){
				Whirlpool.css('.threadP0, .threadP1, .threadP2, .threadP3, .pointer{display:none;}');
			}				
	
	}

	function editInPlaceNew(){
		var editlinks = $('.bodypost a[href^="/forum/index.cfm?action=edit&amp;e="]');
		editlinks.each(function(){
			$(this).after(' <small>(<a href="javascript:;" class="editinplace">in place</a>)</small>');
		});
		$('.editinplace').click(function(e){
			if($(this).text() == 'cancel'){
				alert('cancelling');
			}
			else{
				var link   = $(this);
				var backup = $(this).parent().parent().parent().prev().text();
				var url	   = 'http://forums.whirlpool.net.au' + $(this).parent().prev().attr('href');
				var height = $(this).parent().parent().parent().prev().height();
				Whirlpool.ajax({
					method: 'GET',
					url: url,
					headers: {
						'User-agent'	:	'Mozilla/5.0'
					},
					onload: function(response) {
						var data = response.responseText.split('<text')[1].split('</text')[0];
						var data = '<text' + data + '</textarea>';
						link.parent().parent().parent().prev().text('');
						link.parent().parent().parent().prev().append(data);
						$('#body').css({
							'width'	:	'100%',
							'height':	height + 40 + 'px',
							'border':	'none'
						});
						$('#body').after('<br><a href="javascript:;" id="wp-editinplacesave">Save</a><div id="wp-editinplaceoptions"><input type="checkbox" name=""></div>');
						$('#wp-editinplacesave').click(function(e){
							data = $('#body').val();
							Whirlpool.ajax({
								method: 'POST',
								url: url,
								data: 'version=3&post2=post&form=too+right&' + 		
								'timestart=%7Bts+%27' + time() + '%27%7D&' +
								'body=' + encodeURIComponent(data) + textOptions +
								'cliptemp=Paste+external+quotes+here',
								headers: {
									'User-agent'	:	'Mozilla/5.0',
									'Content-Type'	:	'application/x-www-form-urlencoded'
								},
								onload: function(response) {
									alert('done');
								}
							});
						});
					}	
				});
				
				$(this).text('cancel');
			}
		});
	}
	function editInPlace(){

		if(docs.dUrl.match('forum-replies')){

			var ajaxloaderimgsrc = "http://wp.tristanroberts.name/static/images/script-28.png";

			var editLink = $(".bodypost a[href^='/forum/index.cfm?action=edit&amp;e=']");
			
			editLink.each(function(){
			
				if($(this).parent().next().text() != '(edit in place)'){
				
					$(this).parent().after('<div style="margin: 5px;"><a class="eip" href="#">(edit in place)</a></div>');
				
				}
				
			});
			
			$('.eip').live("click", function(){

				var clicker = $(this);

				if(clicker.text() == '(cancel edit)'){
				
					clicker.text('(edit in place)');
					
					$('#opInputs, #options, #savEdit, #eipTexta, #buttonsDiv').remove();
					
					docs.bt.html(docs.saveOriginalHTML);
					
					$('.meh, .mehbar').remove();

				}
				else{
					
					var btextHtml;
					docs.bt = clicker.parent().parent().prev();
					docs.saveOriginalHTML = docs.bt.html();
					clicker.text('(cancel edit)');

					var bth = docs.bt.height()-8;
					var btw = docs.bt.width()-25;		
					
					var loaderHeight = bth+5;
					var loaderWidth = btw+5;		
					
					var olt = '';
					var ult = '';
					docs.bt.children('*').each(function(){

						//should change this to regex some day
						
						var iGottaP = $(this);
						var tagN = iGottaP.attr('tagName');

						if(tagN == "HR"){
							iGottaP.remove();			
							(btextHtml)? btextHtml += '-----\n\n': btextHtml = '-----\n\n';
						
						}
						else if(tagN == "PRE"){
							var tPreRep = iGottaP.html().replace(RegExp('<br>', 'gim'), '</icanhazbreak>')
											.replace(RegExp('</?span>', 'gim'), '');	//WLR compatibility

							(btextHtml)? btextHtml += '$ '+tPreRep: btextHtml = '$ '+tPreRep;
						}		
						else if(tagN == "UL"){
							function ulLI(ut){
							
								ult += '*';
								var addspaceu = ult+' ';		
								ut.find('br').each(function(){
								
									$(this).after('<icanhazbreak>');
									$(this).remove();
					
								});						
								ut.children('li').each(function(){
								
									$(this).after(addspaceu+$(this).html());
									$(this).remove();
								
								});
								//$(this).after($(this).html());
								$(this).remove();

								//ut.after('<icanhazbreak>');
								//ut.remove();
								
							}
							ulLI(iGottaP);
							iGottaP.find('ul').each(function(){
							
								ulLI($(this));
							
							});
							var ulht = iGottaP.html().replace(RegExp('</?ul>', 'gi'), '');	

							(btextHtml)? btextHtml += ulht: btextHtml = ulht;
							//(btextHtml)? btextHtml += iGottaP.html(): btextHtml = iGottaP.html();				

						}	
						else if(tagN == "OL"){
							function olLI(ot){
							
								olt += '#';
								var addspaceo = olt+' ';				
								ot.children('li').each(function(){

									$(this).after(addspaceo+$(this).html());
									$(this).remove();
								
								});
							}
							olLI(iGottaP);
							iGottaP.find('ol').each(function(){

								olLI($(this));
							
							});
							var olht = iGottaP.html().replace(RegExp('</?ol>', 'gim'), '');	

							(btextHtml)? btextHtml += olht: btextHtml = olht;			
							
						}					
						else if(tagN == "P"){
							iGottaP.find('embed').remove();
							iGottaP.find('br').each(function(){
							
								$(this).after('<icanhazbreak>');
								$(this).remove();
				
							});
							iGottaP.find('img').each(function(){
								var iThis = $(this);
								if(this.hasAttribute('title')){
									iThis.after(iThis.attr('title').replace("\\", ""));
								}
								var imgParent = iThis.parent();
								iThis.remove();
								if(imgParent.attr('tagName') == 'DIV'){
									imgParent.after(imgParent.html());
									imgParent.remove();
								}
							
							});
							if(iGottaP.attr('class') == 'reference'){

								var refF = iGottaP[0].getElementsByTagName('a')[0];
								var referenceNum = refF.getAttribute('onclick').split('(')[1].split(')')[0];
								iGottaP[0].innerHTML = '@'+referenceNum+' '+refF.textContent;

							}		
							if(iGottaP.attr('class') == 'wcauth'){
									var oldOne = iGottaP.children('a:first');
									var replyNum = oldOne.attr('onclick').split('(')[1].split(')')[0];
									oldOne.after('<wcauth>'+replyNum+oldOne.text()+'</wcauth>');
									oldOne.remove();
							   
							}					

							iGottaP.find('span').each(function(){
							
								var sThis = $(this);
							
								var spanClass = sThis.attr('class');
								
								if(!spanClass){  //WLR compatibility

									sThis.children( 'img' ).each(function(){
									
										$(this).after($(this).attr( 'alt' ).replace(/\\/gm,  ''));
										
										$(this).remove( );
										
									});

									sThis.after($(this).text());						
								}					
								else{
								
									sThis.after('<'+spanClass+'>'+sThis.text()+'</'+spanClass+'>');
									
								}
							
								sThis.remove();
							
							});
							iGottaP.find('a').each(function(){
							
								var aThis = $(this);

								var hr = aThis.attr('href');
								var tx = aThis.text();
								var aClass = aThis.attr('class');

								if(aClass == 'wiki'){

									aThis.after('[['+tx+']]');
									
								}
								else if( (aThis.attr('class') == 'internal') || (aThis.text().indexOf('http://') > -1)){

									aThis.after(hr);
									
								}
								else{
								
									aThis.after('<a href="'+hr+'">'+tx+'</a>');
								
								}

								aThis.remove();	

							});

							if(iGottaP.attr('class') != 'reference'){
								
									iGottaP.prepend('<endparagraph>').append('<endparagraph>');							
								
							}
							
							(btextHtml)? btextHtml += iGottaP.html(): btextHtml = iGottaP.html();				
							
						}

						iGottaP.remove();
						

					});
					
					//urge to kill rising
					btextHtml = btextHtml.replace(RegExp('</wcrep2>', 'gim'), "']")
					.replace(RegExp('<wcrep2>', 'gim'), "['")	
					.replace(RegExp('</wcrep1>', 'gim'), '"]')
					.replace(RegExp('<wcrep1>', 'gim'), '["')
					//.replace(RegExp('<hr/?>', 'gim'), '-----')
					.replace(RegExp('<endparagraph>', 'gim'), "")	
					.replace(RegExp('</endparagraph>', 'gim'), "\n")
					.replace(RegExp('<wbr/?>', 'gim'), '')
					.replace(RegExp('</wcauth>', 'gim'), "+]\n")
					.replace(RegExp('<wcauth>', 'gim'), "[+")	
					.replace(RegExp('<icanhazbreak>', 'gim'), "")		
					.replace(RegExp('</icanhazbreak>', 'gim'), "\n")
					//.replace(RegExp('</reference>', 'gim'), "")
					//.replace(RegExp('<reference>', 'gim'), "\n")
					.replace(RegExp('</wcsml>', 'gim'), ")]")
					.replace(RegExp('<wcsml>', 'gim'), "[(")
					.replace(RegExp('</wcspoil>', 'gim'), "_]")
					.replace(RegExp('<wcspoil>', 'gim'), "[_")			
					.replace(RegExp('</wcgrey>', 'gim'), "`]")
					.replace(RegExp('<wcgrey>', 'gim'), "[`")
					.replace(RegExp('</wcserif>', 'gim'), "~]")
					.replace(RegExp('<wcserif>', 'gim'), "[~")
					.replace(RegExp("<a class=\"wiki\" href=\"http://.*(whirlpool.*?wiki)", "gim"), '[[')
					.replace(RegExp("<a class=\"wiki\" href=\"http://.*(whirlpool.*?wiki) ", "gim"), ']]')		
					//.replace(RegExp("<br>", "gim"), "\r")
					//.replace(RegExp("<br/>", "gim"), "\r")
					.replace(RegExp("<tt>", "gim"), "[#")
					.replace(RegExp("</tt>", "gim"), "#]")
					.replace(RegExp("<b>", "gim"), "[*")
					.replace(RegExp("</b>", "gim"), "*]")
					.replace(RegExp("<i>", "gim"), "[/")
					.replace(RegExp("</i>", "gim"), "/]")
					.replace(RegExp("<sup>", "gim"), "[^")
					.replace(RegExp("</sup>", "gim"), "^]")
					.replace(RegExp("<sub>", "gim"), "[\\")
					.replace(RegExp("</sub>", "gim"), "\\]")
					.replace(RegExp("<strong>", "gim"), "[*")
					.replace(RegExp("</strong>", "gim"), "*]")		
					.replace(RegExp("<strike>", "gim"), "[-")
					.replace(RegExp("</strike>", "gim"), "-]");
					
					docs.bt.children().hide();

					docs.bt.append('<textarea id="eipTexta" class="ui-widget-content ui-resizable" style="background:#EEEEEE url(/img/forum/reply-eeeeee.gif) repeat-x scroll center bottom;'+
							'border:1px solid #BBBBBB;width:'+btw+'px;height:'+bth+'px;">'+btextHtml+'</textarea>'+
							'<div id="tresize" style="height:10px;width:10px;background-color:orange;float:right;cursor:se-resize;"></div>');
					
					var tArea = $('#eipTexta');
					var tRes = $('#tresize');


					var wcButtons = whirlC.buttons("buttonsDiv", tArea.width()+"px;background-color: #666666;position:absolute;z-index:6;", "wcodeButtons");
					docs.bt.prepend(wcButtons);
					var buttonDiv = $("#buttonsDiv");
					whirlC.buttonEvents("wcodeButtons", tArea, whirlC.code());
					Whirlpool.css('.wcodeButtons{font-size:0.8em;}');		
					var dragger = $('<div style="background:#444 none repeat scroll 0%; height:20px; margin-bottom:10px;cursor:move;text-align:'+
								'center;font-size:13px;color:grey;line-height:18px;" class="jqHandle jqDrag">=== Drag Here ===</div>')
					buttonDiv.prepend(dragger);
					var butTop = Math.ceil(docs.bt.offset().top-(buttonDiv.height()*2)-20);

					buttonDiv[0].style.top = butTop+"px";					
					buttonDiv.jqDrag(dragger);
					tArea.jqResize(tRes);
					tArea.focus(function(){});
					clicker.parent().after('<div id="eipopInputs" style="position: absolute; display:none; margin:-163px 0 0 -125px;text-align: left; width: 150px; '+
											'background-color: orange; height: 180px;border:2px solid">'+
											'<p><input type="checkbox" checked="checked" style="cursor: pointer;" value="true" wc2="w" id="modewc" name="modewc"/>'+
											'<label style="cursor: pointer;font-size:10px;" for="modewc"> Use WhirlCode</label></p>'+
											'<p><input type="checkbox" checked="checked" style="cursor: pointer;" value="true" wc2="b" id="modeht" name="modeht"/>'+
											'<label style="cursor: pointer;font-size:10px;" for="modeht"> Allow HTML</label></p>'+
											'<p><input type="checkbox" checked="checked" style="cursor: pointer;" value="true" id="modest" wc2="e" name="modest"/>'+
											'<label style="cursor: pointer;font-size:10px;" for="modest"> Auto entities </label></p>'+
											'<p><input checked="checked" type="checkbox" style="cursor: pointer;" value="true" id="modewl" wc2="a" name="modewl"/>'+
											'<label style="cursor: pointer;font-size:10px;" for="modewl"> Make links clickable</label></p>'+
											'</div>'+
											'<button id="options" type="button">Options</button>'+
											'<input type="submit" value="Save Edit" style="" id="savEdit" name="post"/>');	

					$('#options').bind("mouseup", function() { 
					
						$('#eipopInputs').toggle();
					
					});

					function mUp(){
					
						if(!$('#loader')[0]){
					
							var textOptions = "&";
							var settingStr = "pfl";
						
							$('#eipopInputs :checkbox').each(function(i){

								var opThis = $(this);
							
								if($(this).attr('checked')){
								
									settingStr += ''+opThis.attr('wc2');

									textOptions+= ''+opThis.attr('name')+'=true&';
								
								}

							});		

							var textArtex = $('#eipTexta').val();	
							var saveBTH = docs.bt.html();					
							var forPostSuccess = textArtex;
							tArea.remove();
							tRes.remove();
							buttonDiv.remove();

							var previewStr = unsafeWindow.whirlcode2(forPostSuccess, settingStr);				
							
							if($('#loader')[0]){
					
									$('#loader').html('<img src="'+ajaxloaderimgsrc+'" style="relative: absolute; z-index: 5; top: 40%; left: 45%;"/>');
								
								}
							else{

									docs.bt.prepend('<div id="loader" style="position: relative; z-index: 5; background:#EEEEEE url(/img/forum/reply-eeeeee.gif) repeat-x scroll center bottom; height: '+
									loaderHeight+'px; width: '+loaderWidth+'px;"><img src="'+ajaxloaderimgsrc+'" style="position: absolute; z-index: 5; top: 40%; left: 45%;"/></div>');

								}
								
							}

							var currTime = time();
							$.ajax({
								type: "POST",
								url: clicker.parent().prev().children('a:last')[0].href,
								data: "version=2&post2=post&form=too+right&"+ 		
								"timestart=%7Bts+%27"+currTime+"%27%7D&"+
								"body="+encodeURIComponent(textArtex)+textOptions+
								"cliptemp=Paste+external+quotes+here",
								cache: false,
								success: function(msg){
									
									if( (msg.indexOf('Post edited.') > -1) || (msg.indexOf('You pressed submit more than once') > -1)){
										
										$('#savEdit, #options, #eipopInputs').remove();
										
										$('#loader').remove();
										
										docs.bt.children().show();
										
										clicker.text('(edit in place)');
				
										docs.bt.append(previewStr);
										
										$('.meh, .mehbar').remove();

									}
									else{
									
										$('#loader').html('<p>Server Timeout. Click the "Save Edit" button to try again.</p>');
									
									}
									
								},
								error: function(XMLHttpRequest, textStatus, errorThrown){

									clicker.remove();
									$('.meh, .mehbar, #loader, #savEdit, #options, #eipopInputs').remove();
									var runSrc = "http://wp.tristanroberts.name/static/images/script-27.png";
								
									docs.bt.html('<p><img src="'+runSrc+'" alt="runaway.gif" /></p><p>Something Broke!</p><p id="broked">'+
									'You should try editing your post again from the regular edit page. Click on the button below to show your edit.'+
									'<br /><br /><button id="copPost">Show Edit</button></p>');
									
									$('#copPost').one('mouseup', function(){

										docs.bt.html(saveBTH);
										$('#buttonsDiv').remove();
										$('#eipTexta').val(textArtex);

									});	
									
								}
							
							
						 });	
					
						return false; 

					}		
					
					tArea.live("keydown", function(event){
					
						if(event.ctrlKey==1 && event.keyCode==13 ){
						
							mUp();
							
						}
							
					});


					
					$('#savEdit').mouseup(function() { 
						
						mUp();
					
					});
					
					//quick-quote to inline edit
					if($('#eipTexta')[0]){

						$('.bodypost').each(function(){
						
							$(this).children('div:first').after('<a class="meh greylink" href="">eip-quote</a>');

						});

						$('.meh').bind("click", function(){
						
							var trParent = $(this).parent().parent();
						
							var pre = trParent.attr('id').split('r')[1];
							
							var uNam;
							
							$(trParent[0].getElementsByTagName('span')).each(function(){

								if($(this).attr('class') == 'bu_name'){

									uNam = $(this).text();

								}

							});
							var tSel = window.getSelection().toString().replace(/^(.+)$/mg, '["$1"]');
							
							if(tArea.val().length > 0){
							
								tArea.val(tArea.val()+'\n\n@'+pre+' '+uNam+' writes... \n'+tSel);
							
							}
							else{
							
								tArea.val(tArea.val()+'@'+pre+' '+uNam+' writes... \n'+tSel);
							
							}

							tArea[0].focus();		
							
							return false;

						});

					}		
						
				}

				return false; 
				
			});
		
		}
	}

	function extraThreadLinks(){
	
		var wBP = $('#watch_button').parent();
		var futSub = $('.foot_subs:first');
		var repl = $('#replies');
		if(docs.threadArchiveView=='true'){
			wBP.append('<a class="bwatch" href="http://forums.whirlpool.net.au/forum-replies-archive.cfm/'+docs.threadNumber+'.html">Thread Archive</a>');
			futSub.append('&nbsp;&nbsp;<a href="http://forums.whirlpool.net.au/forum-replies-archive.cfm/'+docs.threadNumber+'.html">Thread Archive</a>');
			if(repl[0].style.marginTop!=='10px'){
				repl.attr('style','margin-Top:10px');
			}
			
		}
		if(docs.longThreadView == 'true'){
			wBP.append('<a class="bwatch" href="http://forums.whirlpool.net.au/forum-replies.cfm?t='+docs.threadNumber+'&p=-2">Long Thread View</a>');
			futSub.append('&nbsp;&nbsp;<a href="http://forums.whirlpool.net.au/forum-replies.cfm?t='+docs.threadNumber+'&p=-2">Long Thread View</a>');
			if(repl[0].style.marginTop!=='10px'){
				repl.attr('style','margin-Top:10px');
			}
			
		}
		if(docs.opOnlyView == 'true'){
			try {
				var oppost = $('.op:first').parent().parent();
				var opid   = oppost.find('.bu_name').parent().attr('href').toString().replace('/user/', '');
				wBP.append('<a class="bwatch oponly" href="http://forums.whirlpool.net.au/forum-replies.cfm?t='+docs.threadNumber+'&ux=' + opid + '">OP Only</a>');
				futSub.append('&nbsp;&nbsp;<a href="http://forums.whirlpool.net.au/forum-replies.cfm?t='+docs.threadNumber+'&ux=' + opid + '">OP Only</a>');
				if(repl[0].style.marginTop!=='10px'){
					repl.attr('style','margin-Top:10px');
				}
			} catch (e) {
				
			}

		}
		if(docs.threadPrintView=='true'){
			wBP.append('<a class="bwatch" href="http://forums.whirlpool.net.au/forum-replies-print.cfm?t='+docs.threadNumber+'">Print View</a>');
			futSub.append('&nbsp;&nbsp;<a href="http://forums.whirlpool.net.au/forum-replies-print.cfm?t='+docs.threadNumber+'">Print View</a>');
			if(repl[0].style.marginTop!=='10px'){
				repl.attr('style','margin-Top:10px');
			}						
		}		
		if(docs.moderatorPostView=='true'){
			wBP.append('<a class="bwatch" href="http://forums.whirlpool.net.au/forum-replies.cfm?um=1&amp;t='+docs.threadNumber+'">Mod Posts</a>');
			futSub.append('&nbsp;&nbsp;<a href="http://forums.whirlpool.net.au/forum-replies.cfm?um=1&amp;t='+docs.threadNumber+'">View moderator posts</a>');
			if(repl[0].style.marginTop!=='10px'){
				repl.attr('style','margin-Top:10px');
			}						
		}		
		if(docs.representativePostView=='true'){
			wBP.append('<a class="bwatch" href="http://forums.whirlpool.net.au/forum-replies.cfm?ur=1&amp;t='+docs.threadNumber+'">Rep Posts</a>');
			futSub.append('&nbsp;&nbsp;<a href="http://forums.whirlpool.net.au/forum-replies.cfm?ur=1&amp;t='+docs.threadNumber+'">View representative posts</a>');
			if(repl[0].style.marginTop!=='10px'){
				repl.attr('style','margin-Top:10px');
			}						
		}		
	
	}
	function whimSize(){
	
		if (!docs.q) {
			docs.q = $('#body');
		}
		docs.q.css('width','auto').attr('rows', docs.whIMMessageTextAreaRows).attr('cols', docs.whIMMessageTextAreaCols);
	
	}
	function loadTheme(){
		if(docs.customWPTheme !== 'default' && docs.customWPTheme.indexOf('import') > -1){
			Whirlpool.css(docs.customWPTheme);
		}
		else if(docs.customWPTheme !== 'default' && docs.customWPTheme.indexOf('import') < 0){
			$('head').append('<link rel="stylesheet" type="text/css" media="screen" href="' + docs.customWPTheme + '">');
			setTimeout('100', function(){
				$('style:first').text('');
			});
		}
	}
	function whimAlertNotice(){
	
		if($('#menu_whim').text()){
			Wp.notify('You have an unread <a href="http://whirlpool.net.au/whim/">whim</a>.', true, 15000);
		}		
	
	}
	function openwatchedThreadsInTabs(){

		$('a[href="/forum/?action=watched&showall=1"]').before('<a href="#" id="openInTabs">open in tabs</a>&nbsp;&nbsp;|&nbsp;&nbsp;');
		$('#openInTabs').click(function(){
			var readAs = $('.reads a');
			if(readAs.length){
				readAs.each(function(){

					GM_openInTab(this.href);

				});	
			}
			return false;
		});
	
	}
	function deletedThreadsCacheLink(){
		var deletedThreadNumber = docs.dUrl.split('t=')[1].split('&')[0];
		$('h2:last').append(' <a href="http://google.com/search?q=cache:forums.whirlpool.net.au/forum-replies-archive.cfm/' + deletedThreadNumber + '.html">(Google Cache)');
	}

	function userpageInfoToggle() {
	
		var h2s = $('#userprofile h2:lt(2)');
		h2s.css('cursor','pointer').next('table').hide();
		h2s.click(function(){
			$(this).next('table').slideToggle();
		});
		
		h2 = $('#userprofile h2:last');
		h2.css('cursor','pointer').click(function(){
			$('#threads').toggle();
		});
	
	}

	function userpageDays(){

		if(!docs.dUrl.match('days') && !docs.dUrl.match('action') && (!unsafeWindow.sessionStorage.userpageDaysRedirectedWindowHistoryLength 
										|| window.history.length != unsafeWindow.sessionStorage.userpageDaysRedirectedWindowHistoryLength) ){
		
			var userNumber = docs.dUrl.split('/user/')[1].split('?')[0];
			docs.d.location= 'http://forums.whirlpool.net.au/user/' + userNumber + '?days=' + docs.recentActivityDays;	

		}
		else if(docs.dUrl.indexOf('?days='+docs.recentActivityDays) > -1){
			unsafeWindow.sessionStorage.userpageDaysRedirectedWindowHistoryLength = window.history.length;
	
		}
	
	}	
	/********
		stuff that runs on every page ('cept for the first 2 if()s - no point running everything below on an alert page )
	********/	
	
	setGM();
	if(docs.dUrl.indexOf('?a=subs-') >-1){
		if(docs.watchedThreadsAlert == 'watched'){
			docs.d.location = 'http://forums.whirlpool.net.au/forum/?action=watched';
		}
		if(docs.watchedThreadsAlert == 'thread'){
			history.go(-1);
		}	
	}
	if(docs.dUrl.indexOf('?a=priv-deleted') >-1){
		deletedThreadsCacheLink();
	}
	else if (!docs.dUrl.match('alert')){
		wlrSettings.set();	
		loadTheme();
		if(docs.WLRfirstRun==='true'){
			wlrSettings.firstRun();
		}
		if(docs.autoUpdateWPplus!=='disable' && !window.google){
			autoUpdate.regularUpdateCheck();
		}	
		if(docs.whirlpoolSidemenuFont!=="default font"){
			$('#menu').css('font-family', docs.whirlpoolSidemenuFont+' !important');
		}
		if(docs.whirlpoolBreadcrumbFont!=="default font"){
			$('#breadcrumb').css('font-family', docs.whirlpoolBreadcrumbFont+' !important');
		}
		if(docs.dynamicMenuSystem=='spinner'){
			wlrMenu.spinnerMen();
		}
		else if(docs.dynamicMenuSystem=='rightClick'){
			wlrMenu.rightClickMen();
		}
		if(docs.showWhirlpoolFooterLinks==="false"){
			$('#footer').hide();
		}
			
		if(docs.enableWideWhirlpool==="true"){
			Whirlpool.css('#root, #footer {width: 100% !important;max-width: none !important;}'
				+'#content > span.shim2 {display: none !important;}html,body{overflow-x:hidden;}'); 
		}	
		if(docs.penaltyBoxBackground==="true"){
			Whirlpool.css('tr.In_the_penalty_box > td.bodyuser {background-image:url(http://wp.tristanroberts.name/static/images/script-22.png)!important;background-repeat:repeat !important;');
		}
		
		if(docs.whimAlertNotice==="true"){
			whimAlertNotice();
		}
	}
	var fSecText = docs.dUrl.match('whirlpool.net.au/forum/');

	if(docs.dUrl == 'http://forums.whirlpool.net.au/' || docs.dUrl == 'http://forums.whirlpool.net.au/index.cfm' || docs.dUrl == 'http://forums.whirlpool.net.au/forum/'){
		if(docs.noGluteusMaximus==='true'){
			noBottom();
		}
	}		
	if(docs.dUrl.match('forum-replies')){
		docs.repliesTR=$('#replies tr[id^="r"]:not([id^="review"])');
		docs.repliesA=docs.repliesTR.find('a[title="a link to this specific post"]');	
		if(docs.dUrl.match('t=')){
			docs.threadNumber= docs.dUrl.split('t=')[1].split('&')[0].split('#')[0];
		}
		else{
			docs.threadNumber= docs.repliesA[0].href.split('t=')[1].split('&')[0].split('#')[0];
		}		
		if(docs.quickReplybox=== 'true'){
			quickQuote();
		}
		if(docs.hideDelPosts=== 'true'){
			hideDelPosts();
		}
		if(docs.editInPlace=== 'true'){
			editInPlace();
		}
		avatars();
		
		docs.repliesTR.each(function(i){

			var tdThis = $(this).children('td:eq(1)');
		
			if(docs.inlineVideos==='true'){
			
				imVidImg.imVidImgGrabAs=tdThis.find('a');
				imVidImg.imVidImgGrabAs.each(function(){
				
					imVidImg.inlineVideos(this.href, $(this));

				});
			
			}
			if(docs.inlineImages==='true'){
			
				if(!imVidImg.imVidImgGrabAs){
					imVidImg.imVidImgGrabAs=tdThis.find('a');
				}
				imVidImg.imVidImgGrabAs.each(function(){

					imVidImg.inlineImages(this.href, $(this), tdThis);	
				
				});				
			
			}
			imVidImg.imVidImgGrabAs=null;
			if(docs.staticAvatars=== 'true'){
				avatar($(this));
			}		
			if(docs.ignoreUser=== 'true'){
				userIgnore($(this));
			}		
			if(docs.userNotes=== 'true'){
				userNotes($(this), i);
			}
		});
				
		
		extraThreadLinks();
	
	}
	else if(fSecText && docs.dUrl.split(fSecText[0])[1].length){
		if(docs.lastReadTracker==='true'){
			tracker.threadsAndUserPage('threads');
		}	
		if (docs.hideDRThreads=== 'true') {
			hideDelMov.delRem();
		}
		if (docs.hideMVThreads=== 'true') {
			hideDelMov.mv();
		}
	}	
	else if(docs.dUrl.indexOf('/user/') > -1){	
		if(docs.recentActivityDays != '7'){
			userpageDays();
		}
		if(docs.lastReadTracker === 'true'){
			tracker.threadsAndUserPage('user');
		}	
		whimSize();
		if(docs.userpageInfoToggle === 'true'){
			userpageInfoToggle();
		}
	}
	if(docs.dUrl.indexOf('whirlpool.net.au/whim/?action=read') > -1){
		avatars();
		if(docs.staticAvatars=== 'true'){
			avatar($('tr:first'));
		}	
	}	


	if(docs.whirlcodeinWikiWhimNewThread==='true'){ 
		if(docs.dUrl.indexOf('whirlpool.net.au/wiki/?action=edit&tag=')>-1){	
			wcWikiWhimNewThread.wikiNewThread('#f_body');
		}
		else if(docs.dUrl.indexOf('/forum/index.cfm?action=newthread')>-1){
			wcWikiWhimNewThread.wikiNewThread('#body');
		}	
		else if(docs.dUrl.indexOf('/forum/index.cfm?action=reply')>-1){
			wcWikiWhimNewThread.wikiNewThread('#body');
		}	
		else if(docs.dUrl.indexOf('/forum/index.cfm?action=edit&amp;e=')>-1){
			wcWikiWhimNewThread.wikiNewThread('#body');
		}		
	}
	if(docs.dUrl==='http://forums.whirlpool.net.au/forum/?action=watched'){
		openwatchedThreadsInTabs();
	}
	if(docs.dUrl.indexOf('/forum/index.cfm?action=reply')>-1 && $('#breadcrumb').text().match('Greasemonkey')){
		Wp.notify('Found a bug? Report it using the <a href="http://code.google.com/p/whirlpool-plus/issues/list">issue tracker</a> as well as posting it.', false, 9000);
	}	
	if(docs.dUrl.match('forum-replies')){
		if(docs.lastReadTracker==='true'){
			tracker.forumReplies();
		}
	}

}
catch(error) {
	if (Whirlpool.get('debugMode') == 'true') {
		var message		= 'An error (' + error.name + ') occurred. Information: ' + error.message + '.  Please <a href="">report it</a>.';
		var color		= 'black';
		var background	= 'orange';
		var opacity		= '0.9';
		
		$('head').append('<style type="text/css">.wpplus_notify{ width: 85%; height: 20px; background-color: ' + background + '; opacity: ' + opacity + '; position: fixed; top: 25px; left: 7.5%; z-index: 500; -moz-border-radius: 10px; padding-top: 7px; text-align: center; color: ' + color + '} .wpplus_notify:hover{ cursor: pointer; }</style>');
		
		$('body').prepend('<div class="wpplus_notify">' + message + ' (close)</div>');
		$('.wpplus_notify').click(function(e) {
			$(this).fadeOut();
		});
		setTimeout(function(){
			$('.wpplus_notify').fadeOut();
		}, 5000);
	}
}