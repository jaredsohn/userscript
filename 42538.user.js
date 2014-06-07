// ==UserScript==
// @name        FriendFeed Badge And Growl
// @namespace   http://fluidapp.com
// @description Provides badge update and growl support for FriendFeed in the embedded mini window
// @include     *friendfeed.com/*realtime?embed=1
// @author      Rui Miguel <ravage@fragmentized.net>
// @required	jQuery - FriendFeed already includes it
// @web			http://www.fragmentized.net
// ==/UserScript==

(function () {
	//5 seconds timeout should be enough to keep notifications from bumping into each other
	//The real-time update from FriendFeed inserts new messages sequencially, not in a pack.
	var timeout = 5000;
	//unseen message count
	var msgCount = 0;
	//growl priority
	var growlPriority = 1;
	//growl sticky
	var growlSticky = false;
	//entries array
	var entries = new Array();
	//window state
	var windowActive = true;
	//max notifications
	var maxNotifications = 3;
//--------------------------------------------------------------------------------------------------//

	//main update function, runs every 'n' seconds defined in 'timeout'
	function update() {
		//only iterate through each entry if there are new ones
		if(!$('.rtentry:eq(0)').is('.visited')) {
			//find all '.rtentry' class and iterate them
			$('.rtentry').each(function(i) {
				//only notify only unvisited entries
				if(!$(this).is('.visited')) {
					//mark current entry as visited
					markVisited($(this));
					//is it a like post. call 'likes' method and pass it the current element
					if($(this).is('.likes')) {
						//push entry into the array for later notification
						entries.push(likes($(this)));
					}
					//is it a comment post. call 'comment' method and pass it the current element
					else if($(this).is('.rtcomment')) {
						entries.push(comment($(this)));
					}
					//is it a entry post. call 'entry' method and pass it the current element
					else {
						entries.push(entry($(this)));
					}
				}
				//if 'currentEntry' is the same as 'lastEntry' means we hit the last update entry
				//no need continuing, break out of the iteration 
				else { 
					//in jQuery if we return false from within the 'each' iteration
					//it will behave like a 'break' in a normal cycle
					return false;
				}
			});
			//start notifying about new entries
			notify();
		}
	}
	
	//set badge value
	function setBadge(value) {
		//number value or empty string
		window.fluid.dockBadge = value || '';
	}
	
	//parse 'like' entry (this may change over time)
	function likes(elem) {
		var name = elem.find('a:eq(1)').text() + ' (Liked) ';
		var desc = elem.find('a:eq(2)').text();
		var id = elem.attr('sid');
		return new Entry(name, desc, '');
	}
	
	//parse 'comment' entry (this may change over time)
	function comment(elem) {
		var name = elem.find('.title').find('a:eq(0)').text() + ' (Commented) ';
		var original = removeLineBreaks(elem.find('.cre').text());
		var desc = original + '\n' + elem.find('.title').text();
		var img = elem.find('img:eq(0)').attr('src');
		var id = elem.attr('sid');
		return new Entry(name, desc, img);
	}
	
	//parse 'simple' entry (this may change over time)
	function entry(elem) {
		var name = elem.find('.title').find('a:eq(0)').text() + ' (Entry) ';
		var desc = elem.find('.title').text();
		var img = elem.find('img:eq(0)').attr('src');
		var id = elem.attr('sid');
		return new Entry(name, desc, img);
	}
	
	//Notify Growl
	function growl(entry) {
		window.fluid.showGrowlNotification({
		    title: entry.name, 
		    description: entry.desc, 
		    priority: growlPriority, 
		    sticky: growlSticky,
		    icon: entry.img
		});
	}
	
	//remove tabs, line feeds and carriage returns
	function removeLineBreaks(str) {
		return str.replace(/[\n\r\t]/g, ''); 
	}
	
	function notify() {
		//notify only when focus is out FriendFeed window
		if(windowActive) {
			entries = [];
			return;
		}
		for (var i=0; i < entries.length; i++) {
			//notify only 'maxNotifications' times
			if(i < maxNotifications)
				growl(entries[i]);
			//update unread messages
			msgCount++;
		}
		//update the badge
		setBadge(msgCount);
		//clear the entries array
		entries = [];
	}
	
	function markVisited(elem) {
		elem.addClass('visited');
	}
	
	//encapsulate the entry
	function Entry(name, desc, img) {
		this.name = name;
		this.desc = desc;
		this.img = img;
	}
	
    if (window.fluid) {
		//bing onfocus event
		window.onfocus = function() {
			//clear badge
			setBadge(0);
			//reset unread messages
			msgCount = 0;
			//FriendFeed windows is now active
			windowActive = true;
		};
		
		//bing lostfocus event
		window.onblur = function() {
			//FriendFeed windows is now in the background
			windowActive = false;
		};
		
		//mark first entry as visited
		markVisited($('.rtentry:eq(0)'));
		//run update every 'timeout' seconds
		setInterval(update, timeout);
    };
	
})();