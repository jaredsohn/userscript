// ==UserScript==
// @name Fychan Script
// @author FyberOptic
// @email fyberoptic@gmail.com
// @namespace http://fychan.fybertech.com
// @version 1.1.1b
// @description Adds additional functionality to 4chan imageboards.
// @include http://*.4chan.org/*
// @ujs:category site: enhancements
// @ujs:published 2006-05-31 21:45
// @ujs:modified 2010-02-04 19:35
// @ujs:download http://fychan.fybertech.com/fychan.js
// ==/UserScript==


/*
 * FEATURES LIST
 *
 * - Inline thread expansion
 * - Inline image expansion
 * - "All Images" feature to open all images in a thread automatically
 * - Automatic return to topic after posting
 * - Quick Reply
 * - Clickable URLs in posts
 * - Extra page selection bar added to top
 * - Thread watcher
 * - Hide threads you don't want to see
 *
 */


/*
 * INSTALLATION INFO
 *
 * If you don't already know how to install Opera UserJS scripts, it's fairly
 * simple to do.  First, you want to make sure your Opera is configured to
 * look in a particular directory for them.  So go to Tools -> Advanced tab ->
 * Content -> Javascript Options.  At the bottom you'll see "User Javascript
 * files".  Set this to wherever you plan to store your scripts; c:\userjs
 * for example.  Once you set the directory to put them in, just copy the
 * fychan.js script to this location, and you should be all set!
 *
 */


/*
 * SCRIPT INFO
 *
 * When using this script, an "Enable Fychan" or "Disable Fychan" button
 * will appear below the message posting form.  This allows you to toggle 
 * the functionality of the script on and off, in the event it ever causes
 * a problem with viewing the site.
 *
 * When activated (which it will be by default), all threads in the page are
 * parsed and placed inside bordered objects, with a function bar along the 
 * top.  The color/style of the border will differ depending on the thread's
 * current state.  The different states are:  
 *
 * Solid black - Normal thread, no posts omitted
 * Dashed black - Normal thread, posts omitted
 * Solid green - Expanded thread
 * Dashed green - Expanded thread loaded, but shortened thread being displayed
 *
 * If a thread is surrounded by a dashed black border, you should be able to 
 * click the Expand button in the features bar to dynamically expand the full 
 * thread inside its container.  Once the full thread is retrieved and displayed, 
 * the border will change to solid green to signify that thread is now expanded.
 *
 * When a thread is expanded, you can click the button again (which should now
 * say Collapse) to shrink it back to the original version.  The border will 
 * change to being dashed, but remain green.  This indicates the thread has 
 * already been loaded, and clicking on the button again will pop the expanded 
 * version right back up without reloading from the server.
 * 
 * Some people have expressed a dislike for the borders, so they can be 
 * toggled off with the "config_ThreadBorders" option below.
 *
 * * *
 * 
 * Clicking the "All Images" link in the function bar will load all images in
 * that thread in new tabs/windows.  The number of images it loads depends on
 * whether you've expanded the thread already or not.  
 *
 * PLEASE NOTE that this function WILL NOT WORK if you have popup blocking 
 * enabled on 4chan.  You can disable this specifically for 4chan by right-
 * clicking the page and picking "Edit site preferences", then preferably 
 * selecting "Open pop-ups in background".  You may have to do this for each
 * of 4chan's servers that you visit (zip, img, orz, etc).  You'll know if you
 * need to do it, because Opera will warn about having blocked popups when you
 * try to use the feature.
 *
 * By default, a confirmation box will display if you try to use the feature
 * on a thread of more than 15 images.  To change this limit, modify the 
 * "config_AllImagesWarning" variable below to whatever number you desire.
 * Be careful of such changes though, because it will open dozens or even 
 * hundreds of images if you allow it to do so.  Opera can handle this, but
 * it may not be something you wanted!
 *
 * PROTIP: For easy keyboard navigation when using this feature, you can go
 * into the Opera preferences, in the Advanced tab, then in the Tabs section, 
 * and select "Cycle without showing list" in the tab cycle setting.  You can
 * now more easily jump between many open images with a few keyboard combos.  
 * Pressing Control-Tab moves forward a tab, Control-Shift-Tab goes back one, 
 * Control-W closes a tab, and Control-S saves the image currently displayed.
 * 
 * * *
 *
 * Clicking on an image thumbnail in a thread will expand it inline in the page,
 * allowing you to view it without opening it in a new window.  You can still
 * click on the filename to open it as you always would have, or middle-click
 * the thumbnail to open in a new tab just the same.  
 *
 * This feature can be disabled in the SETTINGS area below, by changing the
 * "config_ExpandImages" setting to "false".
 *
 * * *
 *
 * Fychan will automatically return you to the topic you just posted in, and
 * even jump down to the post you just made.  If you would prefer, you can set
 * the script to prompt you before returning to the topic after posting by 
 * changing the "config_ReturnToTopicPrompt" variable for it below.  It can 
 * be disabled altogether, as well.
 *
 * * *
 *
 * Quick Reply pops a box up in the top left corner to allow for more 
 * convenient posting.  It works just like the standard posting form, and 
 * will still return to the thread you just quick-replied to (based on your
 * settings for that feature of course).
 *
 * Clicking on a post number to reply to it via a main thread index will now
 * automatically pop up the Quick Reply dialog and fill in the post number,
 * instead of the classic behavior of loading the thread in its own page
 * first.
 *
 * * *
 *
 * URL replacement automatically converts HTTP/HTTPS/FTP URLs into clickable
 * versions.  This can be a handy feature, but it should be pointed out that
 * clicking URLs in the page will show the site you visit where you came from
 * (aka, 4chan).  If you'd rather not pass that info along to a particular 
 * site, just paste the URL into your address bar like before.  
 *
 * Note that URL replacement is not always perfect!  4chan sometimes breaks
 * the url up across multiple lines, making it impossible for the detection
 * process to determine the true ending of the URL.  If this happens, just
 * paste the URL in.
 *
 * This functionality can also be disabled altogether with the 
 * "config_expandurls" option below.
 *
 * * *
 *
 * There is now a rudimentary thread watcher.  To watch a thread, press the
 * button in the function bar for a particular thread.  The bar will then
 * turn a reddish color, to indicate it is being watched.  It will stay
 * that color forever until you either click the Watch button again, or 
 * delete the thread from the watch list window.
 *
 * The watch list window can be viewed by clicking the button at the top, 
 * below the posting form.  It will overlay the thread watch list over top
 * of the page, where you can then visit or delete watched threads.  Closing
 * the watch list will instantly return you to the page you were at.
 *
 * * *
 *
 * For my own debugging purposes, and possibly for your curiosity's sake too, 
 * there's some status info between the Watch List and Disable Fychan buttons
 * which displays Fychan page rendering times and cookie sizes.  This may be 
 * removed eventually if people don't want it, or perhaps an option to toggle 
 * it.  But for now, I thought it warranted an explanation before people were 
 * all "OMGWTF" about it.
 *
 * * *
 *
 * You can hide threads you do not wish to see by simply clicking the Hide 
 * button in the function bar.  This collapses it for the duration of your
 * browsing session.  Usually this is until you close the browser window.
 *
 * If a thread is hidden, using the Next/Prev buttons on other posts will 
 * automatically skip it and move to the next thread above or below it.
 * 
 * NOTE: Hidden threads are stored in a cookie, which is not infinite in
 * size.  If you leave your browser open for long periods, you could
 * theoretically have a problem if you hide very many things throughout the
 * day.  If this occurs, and newer threads will no longer stay hidden, just 
 * restart the browser (or delete the 'hiddenlist' cookie via the Site 
 * Preferences dialog if you'd rather).  If people actually begin having this 
 * problem often and tell me about it, I'll see about writing in a safeguard.  
 * But so far, I haven't personally encountered it.
 *
 */


/* 
 * GENERAL NOTE
 *
 * Since I implement features these days which aren't (or sometimes can't be)
 * thoroughly tested across all of 4chan by myself, it's up to you to tell me 
 * when something is broken.  Sometimes people will find or see things which
 * in my normal 4chan use I would never come across.  You're also welcome to 
 * request or suggest features that you'd like to see in upcoming versions.  
 *
 * You can email at: 
 * 		fyberoptic@gmail.com
 *
 * Or post in the not-updated-enough forum thread: 
 *		http://www.fybertech.com/forums/index.php?topic=390.0
 *
 */


/*
 * SCRIPT LICENSE
 *
 * You are free to use and distribute this script, but if you make any
 * alterations with the intention to redistribute, you must visibly credit 
 * the original script and author.  Violation of such terms forfeits use
 * of your rectum to Pedobear, possibly resulting in eternal damnation 
 * for sodomy.  Way to go.
 *
 * And I'll just leave this here:
 *
 * Copyright (c) 2006-2009 Fybertech
 *
 */


/*
 * TODO
 *
 * - Some type of quoted post preview
 * - Fix bold text when email addresses entered (Note: It happens seemingly at random.  I can't find a specific cause yet.)
 * - Fix wrapping on certain converted URLs (Note: Presently unfixable.)
 *
 */


/*
 * VERSION HISTORY (incomplete)
 * 
 * 1.1.1b - 2010-02-04
 	- Fixed the return-to-thread feature, after 4chan recently changed its URL scheme
 * 1.1.1a - 2009-12-24
 	- Removed a couple of debug alerts
 * 1.1.1 - 2009-12-22
 	- Fixed page navigation bar after 4chan updated its code
	- Fixed return-to-thread functionality after 4chan updated its code 	
 * 1.1 - 2009-12-08
 	- Updated script to work in newest Chrome
 * 1.0.9 - 2009-10-04
 	- Modified the script to be compatible with Firefox and Chrome in Greasemonkey mode
 	- Updated to work properly with Opera 10 (page bar was broken)
 * 1.0.8 - 2009-03-18
 	- Standard saving of preferred stylesheet functionality restored
 	- Clicking a post number to reply to it now intelligently activates Quick Reply when appropriate
 	- Made "Expand/Contract" link dynamically switch between saying only "Expand" or "Contract"
 	- Threads can be hidden
 	- Prettied up thread buttons + loading status + thread frames
 	- Made the Quick Reply window fill in your name/email/password
 	- Next/Prev buttons skip hidden threads
 	- Hidden threads are saved throughout browsing session (see above info for an important note)
 	- Added watch and hidden list cookie sizes to status info
 	- Updated various bits of the instructions, cleaned up code, comments, etc etc
 * 1.0.7 - 2009-03-07
 	- Thread watcher, at long last.  Read above description for info.
 	- Fychan rendering time info (probably temporary, read above for more)
 	- Minor tweaks to the code, making way for more to come
 	- Updated config option to disable URL replacement
 	- Updated config option for auto-topic-return, to fully turn it off if desired 	
 	- More comments
 	- Probably other stuff, but it's been so damn long I forgot it all
 * 1.0.6.2 - 2008-07-14
 	- Merged all global functions into single global myFychan object (wanted it to look pretty for the UserJS competition!)
 	- Fixed configuration option for disabling thread borders
 	- Added a config option to enable/disable prompting to return to topic after posting
 	- Minor code cleanups, added some comments, etc
 * 1.0.6.1 - 2008-06-12
 	- Removed use of "goto" command, which broke script in Opera 9.5
 	- Fixed next/previous page buttons, due to 4chan code change 
 * 1.0.6 beta - 2007-01-16
 	- Integrated topic-return functionality from a separate testbed script
 	- Added Quick Reply
 	- Made function descriptions more user-friendly
 	- Fixed inline image expansion to work with new address scheme (cb-nws)
 * 1.0.5 - 2007-04-30
 	- Added Next/Prev buttons to jump between threads quickly
 * 1.0.4.4 - 2007-04-24
 	- Added inline image expansion
 	- Added "All Images" function to open all images in a thread
 	- Added code to load default stylesheet, since it wasn't happening for some reason in Opera
 * 1.0.4.3 - 2006-12-21
    - Minor fix for another 4chan code change (for new ads), so that next/previous bar would work properly, 
      as well as the topic expansions, which were broken and displaying the entire page footer
 * 1.0.4.2 - 2006-10-31
 	- Minor fix for a 4chan code change, so that page select bar next/previous buttons work properly again
 * 1.0.4.1 - 2006-07-17
 	- Clickable urls now direct HTTP urls instead of Javascript links
 	- BeforeEvent.load replaced with AfterEvent.DOMContentLoaded
 * 1.0.4 - 2006-07-16
 	- Visual fixes for Opera 9
 	- Update to fix minor code change at 4chan
 * 1.0.3 - 2006-06-02
 	- ???
 */





var myFychan = {

	/*************************************************
	* USER SETTINGS                                  *
	*                                                *
	* Note: Make sure all options end with a comma!  *
	*************************************************/
	
	// Enables inline image expansion
	config_ExpandImages : true,  	
	
	// Sets number of images allowed in a thread before All Images gives a warning dialog
	config_AllImagesWarning : 15,  	
	
	// Enables borders on threads
	config_ThreadBorders : true,  	
	
	// Prompts about returning to topic after submitting post
	// 0 = Never return to topic
	// 1 = Always return to topic
	// 2 = Prompt for action
	config_ReturnToTopic : 1,
	
	// Automatically converts URLs into being clickable
	config_expandurls : true,
	
	/***********************
	* END OF USER SETTINGS *
	***********************/
		
	
	
	// Background color of thread button bar
	config_id_bgcolor : 'gray',
	// Background color of bar when thread is watched
	config_id_bgcolor_watch : '#aa4444',
	
	// Background color of thread bar when thread is hidden
	config_id_bgcolor_hidden : '#444444',
	// Border/background color of thread when hidden
	config_id_bdcolor_hidden : '#666666',
	
	
	// Array for thread IDs, needed by multiple functions
	threadIDarray : [],
	threadInfoArray : [],
	
	boardname : '',
	watchlist : '',
	hiddenlist : '',
	
	
	/* CLASS FUNCTIONS */
	
	
	// Not used anymore
	Fychan_Open : function(url) 
	{
		var fychanwin = window.open(url);
	},
	
	
	// If Quick Reply box is open, quote post numbers to there instead
	quote : function(quoteid)
	{		
		var qc = document.getElementById('fychanquickcomment');
		if (qc) 
		{			
			qc.focus();
			document.selection.createRange().text = ">>" + quoteid;			
		}
		else quote(quoteid);		
	},
	
	
	// Modifies 4chan's quote urls for Fychan's own use
	Fychan_FixQuotes : function(threadid,rows)
	{		
		if (document.location.href.match(/\/res\/\d+\.html/)) return;
		var regex1 = new RegExp(/^javascript\:quote\((\'.*?\')\)$/);
		var regex2 = new RegExp(/^http.*?\#q(\d+)$/);
		for( var i = 0, row; row = rows[i]; i++ )
		{
			//if (row.href.match(/^javascript/))
			row.href = row.href.replace(regex1,"javascript:myFychan.expandedQuote\('" + threadid + "',$1\)");
			row.href = row.href.replace(regex2,"javascript:myFychan.expandedQuote\('" + threadid + "',$1\)");			
		}
	},
	
	
	// Opens Quick Reply window if appropriate when clicking on a comment number to reply to it
	expandedQuote : function(threadid,quoteid)
	{
		if (!document.getElementById('fychanquickcomment')) myFychan.showQuickReply(threadid);
		myFychan.quote(quoteid);
	},
	
	
	// Makes text URLs clickable
	Fychan_FixUrls : function(rows)	
	{
   		// If user doesn't want urls converted, return
   		if (!myFychan.config_expandurls) return;
   		
	   	var regex1 = new RegExp(/(ftp|http|https):\/\/[\S]+(\b|$)/gim);
	   	//var regex2 = new RegExp(/([^\/])(www[\S]+(\b|$))/gim);
	   	
	   	for( var i = 0, row; row = rows[i]; i++ )
	   	{   			
   			var innerrows = row.childNodes;
   			
   			for (var j = 0, innerrow = null; innerrow = innerrows[j]; j++)
   			{
   				if (innerrow.nodeType != 3) continue;
   				
   				var nodevalue = innerrow.nodeValue;
   				if (nodevalue.indexOf('http') != -1)
   				{
   					nodevalue = nodevalue.replace(regex1, '<a href="$&" target="_blank">$&</a>');
   					//nodevalue = nodevalue.replace(regex2, '$1<a href="http://$2" target="_blank">$2</a>');
					var newnode = document.createElement('span');
					newnode.innerHTML = nodevalue;					
					row.replaceChild(newnode,innerrow);					
   				}
   			}
   		}
	},
	
	
	// Fixes problem of posts being bold when tripcode and email are used together
	// (bad 4chan HTML results in DOM problems when separating threads later)
	// UPDATE: Thread separation procedure changed, this no longer needed
	fixTripcodes : function (rows)
	{		
		// Go through all 'commentpostername' classed spans passed
		for( var i = 0, row; row = rows[i]; i++ )
		{
			var innerrows = row.childNodes;
			var innerrow = innerrows[0];
			
			// Look just for posts where a tripcode was used (.childNodes.length will be 1 if just a sage)
			if (innerrow && innerrow.nodeName == 'A' && innerrow.childNodes.length > 1)
			{				
				// Move everything from inside the 'commentpostername' to after it
				while (innerrow.nextSibling)
				{
					var innerrow2 = innerrow.nextSibling;
					row.parentNode.insertBefore(innerrow2, row.nextSibling);
				}
				
				// Move everything inside the tripcoded href to after it
				var innerrow2;
				var nextsibling = innerrow.parentNode.nextSibling;				
				while (innerrow2 = innerrow.childNodes[1]) row.parentNode.insertBefore(innerrow2, nextsibling);
			}
		}		
	},
	
	
	// Main button function to toggle Fychan on/off
	ToggleFychan : function()
	{
		// Get cookie
  		var nofychan = 'false';
  		var fychancookie = document.cookie.match(/nofychan\=(true|false)/i);
  		if (fychancookie) nofychan = fychancookie[1];  	
	
		// Toggle cookie setting accordingly
		if (nofychan == 'true')
		{
			document.cookie = "nofychan=false; expires=Fri, 01-Jan-2010 00:00:01 GMT; path=/; domain=.4chan.org";		
		}
		else
		{
			document.cookie = "nofychan=true; expires=Fri, 01-Jan-2010 00:00:01 GMT; path=/; domain=.4chan.org";		
		}
		
		// Reload page~~~
		document.location.reload();
	},
	
	
	// Opens all images from thread in new tabs
	showAllImages : function(id)
	{
		var currentelement;
		var imagearray = new Array();
		
		// Get images from entire body if thread is loaded separately
		if (id == 'all')
		{
			currentelement = document.body;
		}
		// Otherwise get images from specific thread
		else
		{	
			var fychan_element = document.getElementById('fychan' + id);
			var fychan_innerelement = document.getElementById('fychaninner' + id);
			var fychan_secondinnerelement = document.getElementById('fychansecondinner' + id);
					
			currentelement = fychan_innerelement;
			if (fychan_innerelement.style.display == 'none') currentelement = fychan_secondinnerelement;
		}	
		
		// Set up some regular expressions to speed things up
		var cgiregex = new RegExp(/\.cgi/);
		var cbregex = new RegExp(/cb-.?ws\//);
		var srccgiregex = new RegExp(/\/src(?:\.cgi)?\//);
		
		// Find images, push to imagearray
		var imagelist = currentelement.getElementsByTagName('A');	
		for( var i = 0, row, lastrow = null; row = imagelist[i]; i++ )
	  	{
  			row.href = row.href.replace(cgiregex, "");  // Added temporarily due to problem with advertising system
  			row.href = row.href.replace(cbregex, "");  // Added temporarily due to problem with advertising system
  			if (row.href.match(srccgiregex) != null && row.firstChild.nodeName == 'IMG')
  			{
	  			imagearray.push(row.href);
  			}
  		}
	
	  	// Prompt if too many images according to user setting
	  	if (imagearray.length >= myFychan.config_AllImagesWarning)
	  	{
  			if (!confirm("There are " + imagearray.length + " images in this thread, are you sure you want to open them all?")) return;
  		}
	  	
	  	// Open sesame!
	  	for (var i = 0; i < imagearray.length; i++)
	  	{
  			window.open(imagearray[i]);
  		}
  		
  		delete imagearray;
	},

	
	// Toggles expansion of a thread
	toggleExpansion : function(id)
	{
		var fychan_element = document.getElementById('fychan' + id);
		var fychan_innerelement = document.getElementById('fychaninner' + id);
		var fychan_secondinnerelement = document.getElementById('fychansecondinner' + id);
		var fychan_loadelement = document.getElementById('fychanload' + id);
		if (!fychan_element) return;
						
		myFychan.watchlist = myFychan.getCookie('watchlist');
		var boardid = myFychan.boardname + "_" + id;
		var watching = (myFychan.watchlist.search(boardid) == -1 ? false : true);		
		
		// Check if switching back to short version
		if (fychan_innerelement.style.display == 'none')
		{
			// Toggle which DIVs are displayed
			fychan_innerelement.style.display = 'block';
			fychan_secondinnerelement.style.display = 'none';
			
			// Update thread border
			if (myFychan.config_ThreadBorders) fychan_element.style.borderStyle = 'dashed';		
	
			document.getElementById('ExpandContractAnchor' + id).innerHTML = "Expand";
			
			myFychan.threadInfoArray[id].expanded = false;
	
			return;
		}
		// Check if already loaded expanded content before doing so again
		else if (fychan_secondinnerelement.innerHTML.length > 0)
		{		
			// Toggle which DIVs are displayed
			fychan_innerelement.style.display = 'none';
			fychan_secondinnerelement.style.display = 'block';
			
			// Update thread border
			if (myFychan.config_ThreadBorders) fychan_element.style.borderStyle = 'solid';
			
			document.getElementById('ExpandContractAnchor' + id).innerHTML = "Contract";
			
			myFychan.threadInfoArray[id].expanded = true;
			
			return;
		}
	
		//var newurl = document.location.href.replace(/^http\:\/\/(.+?)\.4chan\.org\/(.+?)\/.*?$/,'http://$1.4chan.org/$2/res/' + id + '.html');
		var newurl = document.location.href.replace(/^(.+)\/.*?$/,'$1') + '/res/' + id + '.html';
		
		// Set up socket for transferring thread page
		var r = false;
		if (window.XMLHttpRequest) r = new XMLHttpRequest();
		if (!r) { alert('XMLHttpRequest Not Supported');  return; }
		
		// Update ID bar with current status
		fychan_loadelement.innerHTML = "<span style='font-weight:bold; font-style:italic; color:yellow'>Loading...</span>";
		
		// Set up what to do when page retrieved
		r.onreadystatechange = function()
		{
			if (r.readyState == 3)
			{
				//responseStream.length
				//responseText.length
				//[[XMLHttpRequest]].getResponseHeader("Content-Length")
				//alert(r.responseText.length);
				//alert(r.getResponseHeader("Content-Length"));
				//alert(r.responseText.length);
				
			}
						
			if (r.readyState == 4)
			{				
				// Chop headers and footers from fetched page to only leave topic data
				var responsetext = r.responseText.replace(/[\r\n]/g,'').replace(/^.+?\<form name\=\"delform\" action\=\".*?\/imgboard\.php\" method\=POST\>/g,'').replace(/\<br clear\=left\>\<hr\>.+?$/g,'');
				// Add [Reply] button
				responsetext = responsetext.replace(/class=\"quotejs\"\>(\d+)\<\/A\>/i,'class="quotejs">$1</A> &nbsp; [<a href="' + newurl + '">Reply</a>]');
				// Replace abbreviated thread with long one
				fychan_secondinnerelement.innerHTML = responsetext; // + "<br clear='all'>";
				
				// Hide short version of thread, show longer version
				fychan_innerelement.style.display = 'none';
				fychan_secondinnerelement.style.display = 'block';
				
				// Update thread info array with current status
				myFychan.threadInfoArray[id].expanded = true;
				
				// Restore ID bar
				// Used to display "ID: ######" in thread title bar, changing to "Expand Thread"
				fychan_loadelement.innerHTML = myFychan.BuildFychanBarInner(id);
				
				// Re-add thread jump buttons
				document.getElementById('fychannavs' + id).innerHTML = myFychan.createJumpButtons(id);
				
				// Update border to solid green
				if (myFychan.config_ThreadBorders) 
				{
					fychan_element.style.borderStyle = 'inset';
					fychan_element.style.borderColor = '#00aa00';
				}
				
				myFychan.Fychan_FixUrls(fychan_secondinnerelement.getElementsByTagName('blockquote'));
				myFychan.ImageExpandScan(fychan_secondinnerelement.getElementsByTagName('A'));
				myFychan.Fychan_FixQuotes(id,fychan_secondinnerelement.getElementsByClassName('quotejs'));				
				
  				//myFychan.fixTripcodes(fychan_secondinnerelement.getElementsByClassName('commentpostername'));			
			}		
		}
		// Fetch!
		r.open('GET', newurl, true);
		r.send(null);
	},
	
	
	// Sets up inline image expansion
	ImageExpandScan : function(imagelinks)
	{
   		// Don't bother if user doesn't want inline image expansion
   		if (!myFychan.config_ExpandImages) return;   		
   		
   		// Create regular expression to speed loop up
   		var srccgiregex = new RegExp(/\/src(?:\.cgi)?\//);
		
	  	// Look for image thumbnails, then set their onclick attribute
	  	for( var i = 0, row, lastrow = null; row = imagelinks[i]; i++ )
	  	{			
			if (row.href.match(srccgiregex) != null && row.firstChild.nodeName == 'IMG')
			{
				row.firstChild.setAttribute('onclick',"myFychan.ToggleThumbnail(this); return false;");
			}
		}
	},
	
	
	// Switches thumbnail to full-size image
	ToggleThumbnail : function(thumb)
	{		
		var newimage = document.createElement('img');
		newimage.src = thumb.parentNode.href.replace(/\/src\.cgi\//,"\/src\/").replace(/cb-.?ws\//,"");
		newimage.setAttribute('onclick',"myFychan.ToggleThumbnailOff(this); return false;");	
		thumb.parentNode.appendChild(newimage);
		thumb.style.display = 'none';	
	},
	
	
	// Restores thumbnail
	ToggleThumbnailOff : function(thumb)
	{
		thumb.parentNode.firstChild.style.display = 'block';
		thumb.parentNode.removeChild(thumb);
	},
	
	
	// Generates appropriate Next/Prev buttons
	createJumpButtons : function(threadID)
	{			
		var jumpbuttons = 'N/A';
				
		for (var tID in myFychan.threadIDarray)
		{
			if (myFychan.threadIDarray[tID] == threadID)
			{				
				var threadPrev = myFychan.threadIDarray[parseInt(tID)-1];
				var threadNext = myFychan.threadIDarray[parseInt(tID)+1];
				if (tID <= 0) threadPrev = 'top';
				if (tID >= myFychan.threadIDarray.length-1) threadNext = 'bottom';
			
				jumpbuttons = "<a href=\"javascript:myFychan.jumpThread('" + threadPrev + "',0);\" style='font-family:verdana; font-size:inherit'>Prev</a>";
				jumpbuttons += " &nbsp;-&nbsp; <a href=\"javascript:myFychan.jumpThread('" + threadNext + "',1);\" style='font-family:verdana; font-size:inherit'>Next</a>";				
			}			
		}
		return "<div style='float:right; margin-right:0.5em'>" + jumpbuttons + "</div>";
	},
	
	
	// Scrolls browser between threads
	jumpThread : function(threadID, threadDIR)
	{
		// Check if target thread is hidden, and skip it accordingly
		if (threadID != 'bottom' && threadID != 'top')
		{				
			while (myFychan.threadInfoArray[threadID].hidden)
			{			
				threadID = (threadDIR == 0 ? myFychan.threadInfoArray[threadID].prevThread : myFychan.threadInfoArray[threadID].nextThread);
				if (threadID == 'top' || threadID == 'bottom') break;
			}
		}

		if (threadID == 'bottom') { window.scrollTo(0,9999999); }
		else if (threadID == 'top') { window.scrollTo(0,0); }
		else
		{
			var threadholder = document.getElementById("fychanload" + threadID);
			window.scrollTo(0,threadholder.offsetTop-5);	
		}
	},

	
	// Pops up Quick Reply box
	showQuickReply : function(threadID)
	{
		var divElement = document.getElementById('FychanReply');
		var imgboardurl = document.forms[0].action;
		if (!divElement) 
		{
			divElement = document.createElement('div');
			divElement.id = 'FychanReply';
			divElement.style.cssText = 'position:fixed; left:0; top:0; background-color:inherit; border: 1px solid black;';
			document.body.appendChild(divElement);	
		}
	  	
	  	divElement.innerHTML = " \
<form name=\"post\" action=\"" + imgboardurl + "\" method=\"POST\" enctype=\"multipart/form-data\"> \
<input type=\"hidden\" name=\"resto\" value=\"" + threadID + "\"> \
<table cellpadding=1 cellspacing=1> \
<tr><td></td><td class=\"postblock\" align=\"left\"><b>Thread</b></td><td><input type=text name=\"resto\" value=\"" + threadID + "\" size=\"28\" disabled><span id=\"tdresto\"></span></td></tr> \
<tr><td></td><td class=\"postblock\" align=\"left\"><b>Name</b></td><td><input type=text name=\"name\" size=\"28\" id=\"fychanquickname\"></td></tr> \
<tr><td></td><td class=\"postblock\" align=\"left\"><b>E-mail</b></td><td><input type=text name=\"email\" size=\"28\" id=\"fychanquickemail\"></td></tr> \
<tr><td></td><td class=\"postblock\" align=\"left\"><b>Subject</b></td><td><input type=text name=sub size=\"35\"><input type=submit value=\"Submit\"></td></tr> \
<tr><td></td><td class=\"postblock\" align=\"left\"><b>Comment</b></td><td><textarea name=com cols=\"48\" rows=\"4\" wrap=\"soft\" id=\"fychanquickcomment\"></textarea></td></tr> \
<tr><td></td><td class=\"postblock\" align=\"left\"><b>File</b></td><td><input type=file name=upfile size=\"35\"></td></tr><tr><td></td><td class=\"postblock\" align=\"left\"><b>Password</b></td><td><input type=password name=\"pwd\" size=8 maxlength=8 value=\"\" id=\"fychanquickpass\"><small>(Password used for file deletion)</small><input type=hidden name=mode value=\"regist\"></td></tr> \
</table> \
</form> \
<center><div style='font-size:9pt; padding-bottom:3px;'><a href=\"javascript:myFychan.CloseFychanReply()\">(close)</a></div></center>";

		document.getElementById('fychanquickname').value = get_cookie("4chan_name");
		document.getElementById('fychanquickemail').value = get_cookie("4chan_email");
		document.getElementById('fychanquickpass').value = get_pass("4chan_pass"); 
	},
	
	
	// Closes Quick Reply box
	CloseFychanReply : function()
	{
		var divElement = document.getElementById('FychanReply');
		divElement.parentNode.removeChild(divElement);
	},
	
	
	// Restores a hidden thread to its previous state
	unhideThread : function(threadID)
	{
		
		if (myFychan.threadInfoArray[threadID].previousFychanInnerDisplay == 'block') 
			document.getElementById('fychaninner' + threadID).style.display = 'block';
		else 
			document.getElementById('fychansecondinner' + threadID).style.display = 'block';
		
		var fychan_loadelement = document.getElementById('fychanload' + threadID);
		fychan_loadelement.innerHTML = myFychan.BuildFychanBarInner(threadID);
		fychan_loadelement.style.backgroundColor = myFychan.threadInfoArray[threadID].previousBackgroundColor;
		
		var fychan_element = document.getElementById('fychan' + threadID);
		fychan_element.style.borderColor = myFychan.threadInfoArray[threadID].previousBorderColor;
		fychan_element.style.borderStyle = myFychan.threadInfoArray[threadID].previousBorderStyle;		
		fychan_element.style.backgroundColor = 'transparent';
		
		//fychan_loadelement.innerHTML += myFychan.createJumpButtons(threadID);
		document.getElementById('fychannavs' + threadID).innerHTML = myFychan.createJumpButtons(threadID);
		
		myFychan.threadInfoArray[threadID].hidden = false;
		
		// Handle hidden list cookie
		var board_id = myFychan.boardname + "_" + threadID;
		var tmpcookies = myFychan.getCookies();
		var newwatchlist = (tmpcookies['hiddenlist'] ? tmpcookies['hiddenlist'] : '');
		if (newwatchlist.search(board_id) != -1)
		{
			newwatchlist = newwatchlist.replace(board_id + ':','');
			document.cookie = 'hiddenlist=' + newwatchlist + '; path=/; domain=.4chan.org';
			myFychan.hiddenlist = newwatchlist;			
		}
	},

	
	// Temporarily hides a thread
	hideThread : function(threadID)
	{		
		myFychan.threadInfoArray[threadID].previousFychanInnerDisplay = document.getElementById('fychaninner' + threadID).style.display;		
		
		document.getElementById('fychaninner' + threadID).style.display = 'none';
		
		if (myFychan.threadInfoArray[threadID].expandable) document.getElementById('fychansecondinner' + threadID).style.display = 'none';
		
		document.getElementById('fychanload' + threadID).innerHTML = "<a href='javascript:myFychan.unhideThread(" + threadID + ")' style='color:inherit'>Thread #" + threadID + " hidden.  Click to re-display.</a>";
		
		myFychan.threadInfoArray[threadID].previousBackgroundColor = document.getElementById('fychanload' + threadID).style.backgroundColor;
		document.getElementById('fychanload' + threadID).style.backgroundColor = myFychan.config_id_bgcolor_hidden;
		
		var fychan_element = document.getElementById('fychan' + threadID);
		
		myFychan.threadInfoArray[threadID].previousBorderColor = fychan_element.style.borderColor;
		myFychan.threadInfoArray[threadID].previousBorderStyle = fychan_element.style.borderStyle;
		
		fychan_element.style.borderColor = myFychan.config_id_bdcolor_hidden;
		fychan_element.style.borderStyle = 'solid';
		//fychan_element.style.borderWidth = '2px';
		fychan_element.style.backgroundColor = myFychan.config_id_bdcolor_hidden;
		
		myFychan.threadInfoArray[threadID].hidden = true;
		
		
		// Handle hidden list cookie
		var board_id = myFychan.boardname + "_" + threadID;
		var tmpcookies = myFychan.getCookies();
		var newwatchlist = (tmpcookies['hiddenlist'] ? tmpcookies['hiddenlist'] : '');
		if (newwatchlist.search(board_id) == -1)
		{
			newwatchlist += board_id + ":";
			document.cookie = 'hiddenlist=' + newwatchlist + '; path=/; domain=.4chan.org';
			myFychan.hiddenlist = newwatchlist;			
		}
	},
	
	
	// Constructs innermost part of bar displayed at top of threads
	BuildFychanBarInner : function(div_id)
	{
		//var divstring = "<div style='background-color:gray; padding:5px; margin-bottom:5px; text-align:center; color:white; font-size:9pt; font-family:verdana' id='fychanload" + div_id + "'>";
		
		var expandtoggle = myFychan.threadInfoArray[div_id].expandable;
		var expanded = myFychan.threadInfoArray[div_id].expanded;
		
		var divstring = '';	
		var expandstring = (expanded == 0 ? 'Expand' : 'Contract');
		
	
		if (expandtoggle) divstring += "<a href=\"javascript:myFychan.toggleExpansion('" + div_id + "')\" style='font-family:verdana; font-size:inherit' id='ExpandContractAnchor" + div_id + "'>" + expandstring + "</a> &nbsp;-&nbsp; ";
		
		divstring += "<a href='javascript:myFychan.hideThread(" + div_id + ")' style='font-family:verdana; font-size:inherit' id='HideThreadAnchor" + div_id + "'>Hide</a>";
		divstring += " &nbsp;-&nbsp; <a href=\"javascript:myFychan.showAllImages('" + div_id + "')\" style='font-family:verdana; font-size:inherit'>All Images</a>";
		if (!document.location.href.match(/\/res\/\d+\.html/)) divstring += " &nbsp;-&nbsp; <a href=\"javascript:myFychan.showQuickReply('" + div_id + "')\" style='font-family:verdana; font-size:inherit'>Quick Reply</a>";
		//divstring += "</div>";
		divstring += " &nbsp;-&nbsp; <a href=\"javascript:myFychan.addWatchlist('" + div_id + "')\" style='font-family:verdana; font-size:inherit'>Watch</a>";
			
		return "<div id='fychannavs" + div_id + "'></div><div>" + divstring + "</div>";
	},
	
	
	
	
	// Adds a thread to the watch list
	addWatchlist : function(div_id)
	{
		//alert(myFychan.boardname + "|" + div_id);
		
		var board_id = myFychan.boardname + "_" + div_id;
					
		var tmpcookies = myFychan.getCookies();
		var newwatchlist = (tmpcookies['watchlist'] ? tmpcookies['watchlist'] : '');
					
		if (newwatchlist.search(board_id) != -1) 
		{ 
			newwatchlist = newwatchlist.replace(board_id + ':','');
			document.cookie = 'watchlist=' + newwatchlist + '; expires=Fri, 31-Dec-2099 23:59:59 GMT; path=/; domain=.4chan.org';			
			document.getElementById('fychanload' + div_id).style.backgroundColor = myFychan.config_id_bgcolor;
		}
		else
		{					
			newwatchlist += board_id + ":";
			document.cookie = 'watchlist=' + newwatchlist + '; expires=Fri, 31-Dec-2099 23:59:59 GMT; path=/; domain=.4chan.org';
			myFychan.watchlist = newwatchlist;			
			document.getElementById('fychanload' + div_id).style.backgroundColor = myFychan.config_id_bgcolor_watch;
		}		
	},
	
	
	getCookies : function()
	{
		var cookiearray = document.cookie.split(";");
		var cookies = {};
		for (cnum in cookiearray)
		{				
			var cookieparts = cookiearray[cnum].split('=');
			var cookiename = cookieparts[0].replace(/^ */,'');				
			cookies[cookiename] = cookieparts[1];
		}
		return cookies;
	},
	
	getCookie : function(cookiename)
	{
		var cookiearray = document.cookie.split(";");		
		for (cnum in cookiearray)
		{				
			var cookieparts = cookiearray[cnum].split('=');			
			if (cookiename == cookieparts[0].replace(/^ */,'')) return cookieparts[1];			
		}
		return '';
	},
	
	viewWatchList : function()
	{
		//alert("WATCH LIST: " + myFychan.getCookie('watchlist'));
		
		var watchdiv = document.createElement('div');
		watchdiv.setAttribute('id','fychan_watchlist');
		document.body.style.overflow = 'hidden';
		watchdiv.style.cssText = "border:0px solid black; padding:1em; position: fixed; left:0%; right:0%; top:0%; bottom:0%; background-color:gray; text-align:center";
		
		var closebutton = "<button onClick='var watchdiv = document.getElementById(\"fychan_watchlist\"); watchdiv.parentNode.removeChild(watchdiv); document.body.style.overflow = \"scroll\";'>Close</button>";
			
		var watchtable = "<br><br><table align='center'><tr><td>Board</td><td>Thread ID</td><td></td></tr>";
		
		var watches = myFychan.getCookie('watchlist').split("\:");
		for (var watchnum in watches)
		{			
			var watchsplit = watches[watchnum].split('_');
			if (!watchsplit[0] || !watchsplit[1]) continue;
			
			watchtable += "<tr><td><a href='http://zip.4chan.org/" + watchsplit[0] + "'>" + watchsplit[0] + "</a></td><td><a href='http://zip.4chan.org/" + watchsplit[0] + "/res/" + watchsplit[1] + ".html'>" + watchsplit[1] + "</a></td><td style='border:0; background-color:#222222'><button style='color:red; font-weight: bold; background-color:black' onClick='myFychan.deleteWatch(\"" + watches[watchnum] + "\")'>X</button></td></tr>";
			
		}
		watchtable += "</table>";
		
		watchdiv.innerHTML = closebutton + watchtable + "<br>" + closebutton;
		
		document.body.appendChild(watchdiv);
		
	},
	
	deleteWatch : function(watchID)
	{
		var watchsplit = watchID.split('_');		
		
		// Delete item from watch list
		var newwatchlist = myFychan.getCookie('watchlist');
		newwatchlist = newwatchlist.replace(watchID + ':','');
		document.cookie = 'watchlist=' + newwatchlist + '; expires=Fri, 31-Dec-2099 23:59:59 GMT; path=/; domain=.4chan.org';			
		
		// Reload watch list
		var watchdiv = document.getElementById('fychan_watchlist');
		watchdiv.parentNode.removeChild(watchdiv);
		myFychan.viewWatchList();		
		
		// Remove red from thread ID bars if they're in current page
		if (myFychan.boardname == watchsplit[0])
		{			
			var watchbar = document.getElementById('fychanload' + watchsplit[1]);			
			if (watchbar) watchbar.style.backgroundColor = myFychan.config_id_bgcolor;
		}
	},
	
	
	initFychan : function()
	{
		
		//alert(myFychan.toString());

		// Save head element for later use
		var headID = document.getElementsByTagName('head')[0];
	
	// Check if user just submitted a comment to attempt redirecting to same topic
	if (document.location.href.match("/post"))
	{
		
		var metaID = headID.getElementsByTagName('meta')[0];	
		////headID.innerHTML = '';
		//metaID.parentNode.removeChild(metaID);
		//alert(headID.outerHTML);
		var blrnt = new Array();
		//alert(document.body.outerHTML);
		blrnt = document.body.innerHTML.match(/Post successful.*?thread\:(\d+?)\,no\:(\d*)/);
		
		// Check if 'Updating page' among other things is present
		if (blrnt[0])
		{
			// Also check if there's a thread ID
			if (blrnt[1])
			{				
				// Rip the url we'd normally redirect to from the META tag, and alter it with the thread ID instead
				//var redirectURL = metaID.getAttribute('CONTENT').match(/http.+?imgboard\.html/i).toString();
				var redirectURL = metaID.getAttribute('CONTENT').match(/http.*?$/i).toString();
				//alert(redirectURL);
				var originalredirectURL = redirectURL;
				if (blrnt[1] == 0) blrnt[1] = blrnt[2];
				//redirectURL = redirectURL.replace('imgboard.html',"res/" + blrnt[1] + ".html#" + blrnt[2]);
				redirectURL = redirectURL.replace('./',"res/" + blrnt[1] + ".html#" + blrnt[2]);
				//alert(redirectURL);
				document.write(' ');

				// Prompt to return to topic only if user setting says to
				switch (myFychan.config_ReturnToTopic)
				{
					case 0:
						document.location.replace(originalredirectURL); 
						break;
					case 1:
						document.location.replace(redirectURL); 
						break;
					case 2:
						if (confirm('Return to topic? ' + redirectURL)) document.location.replace(redirectURL);
						else document.location.replace(originalredirectURL);
						break;				
				}				
			}
		}
		//return;
	}

	// Additional checks to make sure page is an imageboard
	if (!document.forms[1]) return;
	if (document.forms[1].name != 'delform') return;

	
	var cssNode = document.createElement('style');
	cssNode.type = 'text/css';	
	cssNode.appendChild(document.createTextNode(' \
		#fychan_watchlist { color:white; overflow:auto} \
		#fychan_watchlist table { border:2px solid black; border-collapse: collapse } \
		#fychan_watchlist td { background-color: #aaaaaa; color: #4444ff; border:1px solid black; padding:0.5em; text-align: center; font-size:1.1em} \
		#fychan_watchlist a { color: #3333ee; } \
		#fychan_watchlist tr:first-child td { color: yellow; background-color: #222222; font-weight: bold; font-size:1.2em; } \
		.threadIDbarclass { border:2px solid transparent; border-right-color: #333333; border-bottom-color: #333333; padding:5px; margin-bottom:0px; text-align:center; color:white; font-size:9pt; font-family:verdana; } \
		.threadIDbarclass a { color:white; text-decoration: none; text-shadow: #000000 2px 2px 5px; } \
	'));
	//.fychan_thread div > a 
	headID.appendChild(cssNode);

	// Get current board name for later use
	myFychan.boardname = document.location.href.match(/^http:\/\/.*?\/(.*?)\//)[1];	


	// Time for tracking script speed
	var initialStartTime = new Date();
	
	// Set proper stylesheet
	//var theme_cookie = myFychan.getCookie(style_group);	
	//setActiveStyleSheet(theme_cookie? theme_cookie : getPreferredStyleSheet());	
	//javascript:createCookie(style_group, getActiveStyleSheet(),365,".4chan.org")
	
	// First form is for posting, so ignore it and use the second
  	var mainform = document.forms[1];
  	
  	// Get fychan cookie
  	var nofychan = 'false';
  	var fychancookie = document.cookie.match(/nofychan\=(true|false)/i);
  	if (fychancookie) nofychan = fychancookie[1];   	
  	
  	
  	// Load watchlist
  	myFychan.watchlist = myFychan.getCookie('watchlist'); 
  	
  	// Load hidden threads list
  	myFychan.hiddenlist = myFychan.getCookie('hiddenlist');
  	
  	
  	// Create container for watch list and Fychan enable buttons
  	var divElement = document.createElement('div');
  	divElement.setAttribute('align','center');
  	divElement.setAttribute('id','fychan_buttons');

  	// Create watch list button if Fychan enabled
  	if (nofychan != 'true')
  	{  		
  		var watchbutton = document.createElement('button');
  		watchbutton.innerHTML = "Watch List";
  		watchbutton.style.cssText = 'font-size:8pt; font-family:verdana; margin-top:10px';
  		watchbutton.setAttribute('onclick','myFychan.viewWatchList()');
  		divElement.appendChild(watchbutton);
  		divElement.appendChild(document.createElement('br'));  		
  	}

  	// Create toggle button to enable/disable script
  	var buttonElement = document.createElement('button');
  	if (nofychan == 'true') buttonElement.innerHTML = 'Enable Fychan';
  	else buttonElement.innerHTML = "Disable Fychan";
  	buttonElement.style.cssText = 'font-size:8pt; font-family:verdana; margin-top:10px';
  	buttonElement.setAttribute('onclick','myFychan.ToggleFychan()');
  	divElement.appendChild(buttonElement);
  	document.body.insertBefore(divElement,mainform.previousSibling.previousSibling);
  	
  	// If script disabled, quit
  	if (nofychan == 'true') return;
  	  	  	
  	
  	// Do inline image expansion
  	myFychan.ImageExpandScan(document.getElementsByTagName('A'));
  	
  	// Make urls clickable;
  	myFychan.Fychan_FixUrls(document.getElementsByTagName('blockquote'));

	var startTime = new Date();  	
  	
  		
  	// This array stores the innards of the currently parsed thread
  	var postarray = new Array();
  	// This array stores all the new div'd threads
  	var addarray = new Array();
  	// This array stores what's left inside the main form after all threads are parsed
  	var restarray = new Array();  	
  	  	
  	
  	// Indicates if all threads have been found, making everything else found normal page content
  	var gatherrest = false;  	
  	// Temporary storage of whether currently parsed thread has omitted posts
  	var omittedposts = false;  	
  	// Temporary storage of currently parsed thread ID
  	var div_id = '';
  	// If no thread IDs are found during parsing, must not be a normal board (i.e. /i/ - Oekaki)
  	var no_ids = true;
  	 
   	
   	var threadfrag = document.createDocumentFragment();
   	
   	// Start looping through elements inside mainform, separate threads
	var rows = mainform.childNodes;	
	for( var i = 0, row, lastrow = null; row = rows[i]; i++ )
	{		
		// Check if table under threads is found yet to know when to stop parsing for threads
		if (row.nodeName == 'TABLE' && row.getAttribute('align') == 'right') gatherrest = true;
		
		// Check if "<br clear=left><hr>" tags are found, indicating the end of a thread
		if (row.nodeName == 'HR' && lastrow && lastrow.nodeName == 'BR' && !gatherrest) 
		{			
			// Dump the <br> just gathered
			postarray.pop();
			
			// Create a new div to house thread
			var newElement = document.createElement('div');
			
			// Assign div id			
			if (div_id) 
			{ 
				newElement.id = 'fychan' + div_id; 
				no_ids = false; 
				myFychan.threadIDarray.push(div_id); 
				
				// Save info about this thread for later reference
				myFychan.threadInfoArray[div_id] = new Object;				
				myFychan.threadInfoArray[div_id].expandable = (omittedposts ? true : false);
				myFychan.threadInfoArray[div_id].expanded = false;
				myFychan.threadInfoArray[div_id].hidden = false;
				myFychan.threadInfoArray[div_id].watched = false;
			}
			else alert("NO THREAD ID");
			
			// Set border style depending on whether there are omitted posts
			var borderstyle;
			if (omittedposts) borderstyle = "dashed"; else borderstyle = "inset";
			if (myFychan.config_ThreadBorders) newElement.style.cssText = "border:2px " + borderstyle + " black;";
			newElement.style.borderTopWidth = "0px";
			newElement.style.marginLeft = newElement.style.marginRight = "5px";
			newElement.style.marginBottom = "2em";
			newElement.style.padding = "5px";
			//newElement.style.backgroundImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAALHRFWHRDcmVhdGlvbiBUaW1lAFdlZCAxOCBNYXIgMjAwOSAwMDoyMzowMiAtMDUwMOP0D7kAAAAHdElNRQfZAxIEHCiQnl/4AAAACXBIWXMAAB7CAAAewgFu0HU+AAAABGdBTUEAALGPC/xhBQAAAA1JREFUeNpjaGho4AEABJEBjcpl7m8AAAAASUVORK5CYII%3D)";
			
			newElement.setAttribute('class',"fychan_thread");
			
			// Prepare board/thread number in ABC_##### format, which cookie uses
			var board_id = myFychan.boardname + "_" + div_id;
			// Are we watching this thread?
			var watching_thread = (myFychan.watchlist.search(board_id) == -1 ? false : true);
			
			// Set thread ID bar background depending on watch status
			var id_bgcolor = (watching_thread ? myFychan.config_id_bgcolor_watch : myFychan.config_id_bgcolor);			
			
			// Construct thread ID bar
			//var divstring = '';			
			//divstring += "<div style='border:1px solid transparent; border-right-color: #333333; border-bottom-color: #333333; background-color:" + id_bgcolor + "; padding:5px; margin-bottom:5px; text-align:center; color:white; font-size:9pt; font-family:verdana' id='fychanload" + div_id + "'>";
			//divstring += myFychan.BuildFychanBarInner(div_id);
			//divstring += "</div>";			
			//newElement.innerHTML = divstring;
			
			threadIDbar = document.createElement('div');
			threadIDbar.setAttribute('id','fychanload' + div_id);
			threadIDbar.setAttribute('class','threadIDbarclass');			
			threadIDbar.style.backgroundColor = id_bgcolor;
			threadIDbar.innerHTML = myFychan.BuildFychanBarInner(div_id);
			//addarray.push(threadIDbar);
			
			
			// Create inner container div for actual thread content
			var newElement2 = document.createElement('div');
			if (div_id) newElement2.id = 'fychaninner' + div_id;
			newElement2.style.display = 'block';
			// Dump all thread elements inside
			for (blrnt in postarray)
			{
				newElement2.appendChild(postarray[blrnt]);
			}
			var newbr = document.createElement('br');
			newbr.setAttribute('clear','all');
			newElement2.appendChild(newbr);
						
			// Append initial thread to overall thread enclosure
			newElement.appendChild(newElement2);
			
			// Fix 4chan's HTML errors from bad HTML with tripcodes
			//myFychan.fixTripcodes(newElement2.getElementsByClassName('commentpostername'));	
			
			if (omittedposts)
			{
				// Add extra container for expanding thread later
				var newElement3 = document.createElement('div');
				if (div_id) newElement3.id = 'fychansecondinner' + div_id;									
				newElement.appendChild(newElement3);
			}			
			
			myFychan.Fychan_FixQuotes(div_id,newElement.getElementsByTagName('a'));
			
			// Push entire object into array, to add to page later
			//addarray.push(newElement);
			
			
			threadfrag.appendChild(threadIDbar);
			threadfrag.appendChild(newElement);

			// Code change no longer clones elements, so we have to modify the counter as elements are arrayed
			//i -= postarray.length;

			// Reset some stuff for next thread
			delete postarray;
			postarray = new Array();
			lastrow = null;
			omittedposts = false;
			div_id = '';
		}
		
		// If not end of thread, check if element is a child of mainform
		else if (row.parentNode == mainform)
		{
			// Duplicate element			
			var cloned = row.cloneNode(true);			
			//var cloned = row;

			// If working with a thread, push element into thread array,
			if (!gatherrest) postarray.push(cloned);
			// otherwise, push it to restarray for now.
			else restarray.push(cloned);
			
			// Set lastrow to current row, in order to check for "<br clear=left><hr>" in above "IF" later
			lastrow = row;
			
			// We only want ELEMENT nodes
			if (row.nodeType != 1) continue;
			
			// Check if current thread has omitted posts
			if (row.className == 'omittedposts') omittedposts = true;
			
			// Find thread ID
			if (row.id.indexOf('nothread') == 0) { div_id = row.id.substr(8); }			
			
			//if (row.className == 'filetitle' || row.className == 'postername') cloned.innerHTML += '&nbsp;';			
		
		}		
	}  	 

  	// If no elements to add, or no thread IDs found, we ignore this section
  	if (!no_ids)
  	//if (addarray.length > 0 && !no_ids)
  	{
  	
  		var docfrag = threadfrag;
  		//document.createDocumentFragment();
  	
  		// Totally wipe form contents  		
  		mainform.innerHTML = '';
  		
 		// Append thread divs 		
 		//for (blrnt in addarray) docfrag.appendChild(addarray[blrnt]);  	
	  	
	  	
	  	// Stores where to currently append rest of page elements
	  	var appendto = docfrag; 
	  	// Start adding rest of page back by looping through array
	  	for (blrnt in restarray)
	  	{
  			// Test for presence of page navigation bar
  			//if (restarray[blrnt].nodeType == 1 && restarray[blrnt].innerHTML.indexOf('Previous') > 0)
  			if (restarray[blrnt].nodeType == 1 && restarray[blrnt].className == "pages")
  			{
	  			mainform.appendChild(docfrag);
	  			docfrag = document.createDocumentFragment();
	  			appendto = docfrag;
	  			// Change where all future tags are appended (now outside of main form)
  				//appendto = document.body;  			
	  			
  				// Repair Previous/Next bar, due to bad coding of page
  				//var buttontext = restarray[blrnt].outerHTML;
  				//buttontext = buttontext.replace(/<FORM action=\"(.*?html)\" .*? method=\"get\"><\/FORM><TD><INPUT type=\"submit\" value=\"(Next|Previous)\" accesskey=\"(.)\"\><\/TD>/gi,'<TD><BUTTON onClick="javascript:document.location=\'$1\'; return true;" accesskey="$3">$2</BUTTON> </TD>');
				//buttontext = buttontext.replace(/<TD>Previous/,'<TD><button disabled>Previous</button>').replace(/<TD>Next/,'<TD><button disabled>Next</button>');
				//restarray[blrnt].innerHTML = buttontext.replace(/\<TABLE.*?\>/,'');
				
				//<table class=pages align=left border=1><tr><td>Previous</td><td>[<b>0</b>] [<a href="1">1</a>] [<a href="2">2</a>] [<a href="3">3</a>] [<a href="4">4</a>] [<a href="5">5</a>] [<a href="6">6</a>] [<a href="7">7</a>] [<a href="8">8</a>] [<a href="9">9</a>] [<a href="10">10</a>] </td>
				//<form action="1" onsubmit='location=this.action;return false' method=get><td><input type=submit value="Next" accesskey="x"></td></form></tr></table>
				
				var buttontext = restarray[blrnt].innerHTML;
  				buttontext = buttontext.replace(/<FORM action=\"(.*?)\" .*? method=\"get\"><\/FORM><TD><INPUT type=\"submit\" value=\"(Next|Previous)\" accesskey=\"(.)\"\><\/TD>/gi,'<TD><BUTTON onClick="javascript:document.location=\'$1\'; return true;" accesskey="$3">$2</BUTTON> </TD>');				
				buttontext = buttontext.replace(/<TD>Previous/,'<TD><button disabled>Previous</button>').replace(/<TD>Next/,'<TD><button disabled>Next</button>');								
				restarray[blrnt].innerHTML = buttontext;
								
				// Add extra page nav bar to top of page
				var extranav = restarray[blrnt].cloneNode(true);
				extranav.setAttribute('align','center');
				extranav.style.marginBottom = '1em';				
				document.body.insertBefore(extranav, mainform);			  			
  			}  		
  			// Append page element
  			appendto.appendChild(restarray[blrnt]);
  		}  	
	  	document.body.appendChild(docfrag);
	  	
  		// Now that we have all the thread IDs, add Next/Prev buttons to thread bars.
  		// Also fill in next/prev links in threadInfoArray (added to skip hidden threads).
  		// Lastly, hide a thread if it was previously marked as hidden.
  		{
  			var prevthread = 'top';  			
  			for (var threadID in myFychan.threadIDarray)
  			{			
				var tID = myFychan.threadIDarray[threadID];
									
				if (prevthread > 0) myFychan.threadInfoArray[prevthread].nextThread = tID;
			
				//var cthread = document.getElementById('fychanload' + tID);
				//cthread.innerHTML += myFychan.createJumpButtons(tID);
				
				var cthread = document.getElementById('fychannavs' + tID);
				if (cthread) cthread.innerHTML = myFychan.createJumpButtons(tID);				
			
				myFychan.threadInfoArray[tID].prevThread = prevthread;
				prevthread = tID;
				
				// Hide hidden threads
				var board_id = myFychan.boardname + "_" + tID;
				if (myFychan.hiddenlist.search(board_id) >= 0) myFychan.hideThread(tID);
  			}
  			if (prevthread > 0) myFychan.threadInfoArray[prevthread].nextThread = 'bottom';
  		}
	}
	
	// LATER, ARRAYS   	
   	delete addarray;
   	delete restarray;
   	delete postarray;
  	
  	

	var finishTime = new Date();
	
	var speeddiv = document.createElement('div');
	speeddiv.style.cssText = 'font-size:8pt; font-family:verdana; text-align:center';
	speeddiv.appendChild(document.createElement('br'));
	speeddiv.appendChild(document.createTextNode("HEADER RENDER TIME: " + (startTime - initialStartTime) + "ms"));
	speeddiv.appendChild(document.createElement('br'));
	speeddiv.appendChild(document.createTextNode("THREAD RENDER TIME: " + (finishTime - startTime) + "ms"));
	speeddiv.appendChild(document.createElement('br'));
	speeddiv.appendChild(document.createTextNode("PAGE RENDER TIME: " + (finishTime - initialStartTime) + "ms"));	
	speeddiv.appendChild(document.createElement('br'));
	speeddiv.appendChild(document.createTextNode("WATCH LIST SIZE: " + (myFychan.watchlist.length / 1000) + "kb"));	
	speeddiv.appendChild(document.createElement('br'));
	speeddiv.appendChild(document.createTextNode("HIDDEN THREAD LIST SIZE: " + (myFychan.hiddenlist.length / 1000) + "kb"));	
	speeddiv.appendChild(document.createElement('br'));
	document.getElementById('fychan_buttons').insertBefore(speeddiv,document.getElementById('fychan_buttons').lastChild);
	}
};




//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
//----------------------------- End myFychan Object ---------------------------
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------

(function(){


	if (window.opera)
	{
		document.addEventListener('DOMContentLoaded', function(e) {
			myFychan.initFychan();
		}, false);
	}
	else 
	{
		
		/*if (document.location.href.match("imgboard.php"))
		{
			//var dochead = document.getElementsByTagName('head')[0];
			//alert(dochead.innerHTML);
			myFychan.initFychan();
		}*/
		if (document.getElementById('fychanscript') == null)
		{
			
			var mystring = '';
			for (property in myFychan)
			{	
				//alert("Name: " + property + " Type: " + typeof(myFychan[property]) + " Source: " + myFychan[property].toString());
				
				var thistype = typeof(myFychan[property]);
				var thisstring = myFychan[property].toString();
				
				if (thistype == "boolean" || thistype == "number") mystring += property + " : " + thisstring + ",\n";
				else if (thistype == "string") mystring += property + " : '" + thisstring + "',\n";
				else if (thistype == "object") mystring += property + " : [" + thisstring + "],\n";
				else if (thistype == "function") mystring += property + " : " + thisstring + ",\n";
				else alert("UNKNOWN TYPE: " + thistype);
				
			}
			//alert("var myFychan = {\n" + mystring + "endvar : true\n};");
			var chanscript = document.createElement('script');
			chanscript.setAttribute("type", "text/javascript");
			chanscript.setAttribute("id","fychanscript");
			chanscript.appendChild(document.createTextNode("myFychan = {\n" + mystring + "endvar : true\n};\n myFychan.initFychan();"));		
			
			//document.body.appendChild(chanscript);
			var dochead = document.getElementsByTagName('head')[0];
			if (dochead) dochead.appendChild(chanscript);			
			
		}
		
		
		
	}

})();


