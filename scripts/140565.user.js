// ==UserScript==
// @name 		CP Better Ignore
// @namespace	http://fourohfour.info/greasescripts/
// @description	Ignores threads started by ignored users, hides ignored posts entirely, and hides replies to ignored posts.
//
// @include 	http://chiefsplanet.com/BB/forumdisplay.php*
// @include 	http://www.chiefsplanet.com/BB/forumdisplay.php*
// @include		http://chiefsplanet.com/BB/showthread.php?*
// @include		http://www.chiefsplanet.com/BB/showthread.php?*
// @include		http://chiefsplanet.com/BB/profile.php?do=editlist
// @include		http://www.chiefsplanet.com/BB/profile.php?do=editlist
// @include		http://chiefsplanet.com/BB/profile.php?do=addlist&userlist=ignore*
// @include		http://www.chiefsplanet.com/BB/profile.php?do=addlist&userlist=ignore*
// ==/UserScript==

// INSTRUCTIONS:
//      Firefox: Greasemonkey should have asked you to install when you viewed this
//               file. If you don't have Greasemonkey, get it from
//               https://addons.mozilla.org/en-us/firefox/addon/greasemonkey/
//      Chrome: Chrome should have asked you to install when you viewed this file.
//      Opera: Create a folder somewhere for user javascripts and save this file there.
//             Then, go to O menu -> Settings -> Preferences -> Advanced -> Content
//             -> JavaScript Options and set the User JavaScript folder to the folder
//             you saved this file in.
//      Safari: NinjaKit should have asked you to install when you viewed this file.
//              If you don't have NinjaKit, get it from 
//              http://d.hatena.ne.jp/os0x/20100612/1276330696
//
//      After you have done that, visit your ignore list 

// I place this into the public domain. Enjoy!



(function() {
	if(typeof(unsafeWindow)=='undefined') { unsafeWindow = window; }
	if(typeof(GM_log)=='undefined') { GM_log=function(msg) { if((typeof(unsafeWindow.console)!='undefined') && (typeof(unsafeWindow.console.log)!='undefined')) { unsafeWindow.console.log(msg); } }; }
	if(typeof(window.opera)!='undefined') { GM_log=window.opera.postError; }
	
	var tcfbi_ignorelist = new Array;
	var tcfbi_ignoredposts = new Array;
	
	if(window.location.pathname == "/BB/profile.php") {
		// we're looking at the ignore list; grab a local copy
		var xpathResult = document.evaluate('//input[starts-with(@id, "listitemignorelist")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		
		var r = /^listitemignorelist(\d+)$/;
		var rx;
		
		for(var i=0; i<xpathResult.snapshotLength; i++) {
			var thisItem = xpathResult.snapshotItem(i);
		
			if(rx = r.exec(thisItem.id)) {
				tcfbi_ignorelist.push(rx[1]);
			}
		}
		localStorage.setItem("tcfbi_ignorelist", tcfbi_ignorelist.join());
		GM_log(tcfbi_ignorelist.join());
		
		// add a link for clearing the ignored posts cache after userfield_ignore_div
		var insertAfter, newElement;
		insertAfter = document.getElementById('userfield_ignore_div');
		newElement = document.createElement('button');
		newElement.innerHTML = "clear TCF Better Ignore cache";
		newElement.onclick = function() {
			var len = localStorage.length;
			for(var i=len - 1; i>=0; i--) {
				var key = localStorage.key(i);
				GM_log( i + " " + key + " " + key.indexOf('tcfbi_ignoredposts.'));
				if(key.indexOf('tcfbi_ignoredposts.') == 0) {
					localStorage.removeItem(key);
				}
			}
			window.alert("TCF Better Ignore cache cleared.");
		}
		insertAfter.parentNode.insertBefore(newElement, insertAfter.nextSibling);
		
	} else {
		// load the ignore list
		try {
			var tcfbi_ignorelist_a = localStorage.getItem("tcfbi_ignorelist").split(',');
			for(var i in tcfbi_ignorelist_a) {
				tcfbi_ignorelist[tcfbi_ignorelist_a[i]] = true;
			}
		} catch(e) {
		}
		
		if(window.location.pathname == "/BB/forumdisplay.php") {
			// looking at the thread list, hide threads from ignored posters
			// TODO: In the background, ask the server to ignore these threads too
			// 		this way, we'll still get the right number of visible threads
			//		per page.
			
			var xpathResult = document.evaluate('//td[starts-with(@id, "td_threadtitle")]/div[@class="smallfont"]/span', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			
			var r = /member\.php\?u=(\d+)/;
			var rx;
			
			for(var i=0; i<xpathResult.snapshotLength; i++) {
				var thisItem = xpathResult.snapshotItem(i);
				rx = r.exec(thisItem.onclick);
				
				if(rx && tcfbi_ignorelist[rx[1]]) {
					thisItem.parentNode.parentNode.parentNode.style.display = "none";
				}
			}
		} else if(window.location.pathname == "/BB/showthread.php") {
			// looking at a thread. We should
			//  - find ignored posts
			//		- hide them
			//		- TODO: add their posters to the ignore list (if missing)
			//		- add the post ID to the ignored post history
			//	- find replies to posts in the ignored post history
			//		- hide them
			//  - for all posts
			//		- todo: add "ignore user" to the user dropdown
			//		- todo: add a description field and edit link
			//		- todo: add a highlight user checkbox
			//		- todo: highlight marked posts
			
			var ignored_posts = new Array();
			var ignored_posts_a;
			var thread_id = 0;
			
			// get thread ID
//			thread_id = (window.location.search.split(/=|&/))[1];
			thread_id = document.getElementById('qr_threadid').value;
			GM_log("thread id " + thread_id);
			
			// load ignore history for this thread
			try {
				ignored_posts_a = localStorage.getItem("tcfbi_ignoredposts." + thread_id).split(',');
				for(var i in ignored_posts_a) {
					ignored_posts[ignored_posts_a[i]] = true;
				}
			} catch(e) {
			
			}
			
			// Find ignored posts
			var postTables = document.evaluate('//table[starts-with(@id,"post")][tbody/tr/td/div/a[contains(@href,"removelist")]]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

			// and nuke 'em
			for(var i=0; i<postTables.snapshotLength;i++) {
				var thisPost = postTables.snapshotItem(i);
				thisPost.className += " tcfbi_ignored";
				thisPost.style.display = "none"; // FIXME: remove when css for tcfbi_ignored is inserted

				ignored_posts[thisPost.id] = true;
			}
			
			// 
			
			postTables = document.evaluate('//table[starts-with(@id,"post")][tbody/tr[@valign="top"]]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
			for(var i=0; i<postTables.snapshotLength;i++) {
				var thisPost = postTables.snapshotItem(i);
				
				// this post isn't ignored, so remove it from the ignore history if it's there
				delete ignored_posts[thisPost.id];
				
				// does this post quote something ignored?
				var quote_backlink = document.evaluate('./tbody/tr/td/div/div/table/tbody/tr/td/div/a', thisPost, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
				if(quote_backlink) { GM_log(quote_backlink.href); }
				if(quote_backlink && ignored_posts[quote_backlink.href.split('#')[1]]) {
					thisPost.className += " tcfbi_ignored";
					thisPost.style.display = "none"; // FIXME: remove when css for tcfbi_ignored is inserted
				}
			}
			
			// save ignored posts
			ignored_posts_a = "";
			for (var i in ignored_posts) {
				ignored_posts_a += i + ",";
			}
			if(ignored_posts_a.length > 2) {
				localStorage.setItem("tcfbi_ignoredposts." + thread_id, ignored_posts_a);
			}
		}
	}
})();