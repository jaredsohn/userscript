// ==UserScript==
// @name           Twitter last read
// @namespace      http://armeagle.nl
// @description    Keep track of your read tweets.
// @include        http*://twitter.com*
// @updateURL      http://userscripts.org/scripts/source/59111.meta.js
// @version        2.3.1
// @grant          none
// ==/UserScript==

// This work is licensed under a Creative Commons Attribution-Noncommercial-Share Alike 3.0 Unported License by Alex Haan (http://creativecommons.org/licenses/by-nc-sa/3.0/)

/*
Adds buttons to the top tab list (with the Home and Connect buttons). Clicking the icon on the left that mark all (visible) tweets as read and stores that. Upon clicking the second icon the right the page will scroll down until the last read tweet is found (or stops at the 100th tweet).

Whenever read tweets are loaded and displayed they will be marked (background color changed). Also works separately on the comments tab.

If you like the script, or not ... please leave a comment.

* Only tested on Firefox. 
 */


function DOM_script() {
	var script = document.getElementsByTagName('head')[0].appendChild(document.createElement('script'));
	script.setAttribute('type', 'text/javascript');
	return script.textContent=DOM_script.toString().replace(/[\s\S]*"\$1"\);([\s\S]*)}/,"$1");
	
	// create container Object to prevent variables and function from going global
	var AEG = {};
	// Whether to show the confirm dialog when marking tweets read (for when the last-read tweet isn't loaded).
	AEG.markTweetsUseConfirm = true;
	
	AEG.debug = false;
	// is scrolling
	AEG.isScrolling = false;
	// prevent (near) infinite loops when scrolling to last read tweet
	AEG.maxScrollInjects = 100;
	// counter for above
	AEG.countScrollInjects = -1;
	// timeout, so not calling scrollintoview too often, reset on new inject and start new timer
	AEG.scrollInjectTimer = null;
	
	AEG.streamItemCount = -1;
	
	/* Hook on nodeinsert events for the timeline
	 *  Do it a few steps up, cause switching 'tabs' causes it to rebuild the tree.
	 *  Checking for the actualy tweet elements anyway.
	 */
	//document.querySelector('.stream-manager')
	//alert(document.getElementsByTagName("body")[0]);
	document.getElementsByTagName("body")[0].addEventListener("DOMNodeInserted", function(event) {AEG.tweetInsertHandler(event)}, false);

	AEG.addButtonBar = function() {
		// add "Mark All Read" to the top of the timeline, next to the Tweets header
		var buttonbar = document.querySelector('#global-actions');
		
		var li_buttonbar = document.createElement('li');
		li_buttonbar.setAttribute('id', 'AEG-button-bar');

		var li_buttonbar_box = document.createElement('div');
		li_buttonbar_box.className = 'box';
		
		var li_markall = document.createElement('i');
		li_markall.className = 'button';
		li_markall.setAttribute('id', 'mark-all');
		li_markall.setAttribute('title', 'Mark all tweets read');
		li_buttonbar_box.appendChild(li_markall);
		var li_scrolltolast = document.createElement('i');
		li_scrolltolast.className = 'button';
		li_scrolltolast.setAttribute('id', 'scroll-to-last');
		li_scrolltolast.setAttribute('title', 'Scroll to last read tweet');
		li_buttonbar_box.appendChild(li_scrolltolast);
		
		li_buttonbar.appendChild(li_buttonbar_box);
		
		buttonbar.appendChild(li_buttonbar);
		
		li_scrolltolast.addEventListener('click', function(event) {AEG.scrollToLastReadHandler(event)}, false);
		li_markall.addEventListener('click', function(event) {AEG.setLastRead(event)}, false);
	}
	
	AEG.addButtonBarOrig = function() {
		// add "Mark All Read" to the top of the timeline, next to the Tweets header
		var buttonbar = document.querySelector('#global-actions');
		
		var li_buttonbar = document.createElement('li');
		li_buttonbar.setAttribute('id', 'AEG-button-bar');

		var li_buttonbar_box = document.createElement('div');
		li_buttonbar_box.className = 'box';
		
		var li_markall = document.createElement('i');
		li_markall.className = 'button';
		li_markall.setAttribute('id', 'mark-all');
		li_markall.setAttribute('title', 'Mark all tweets read');
		li_buttonbar_box.appendChild(li_markall);
		var li_scrolltolast = document.createElement('i');
		li_scrolltolast.className = 'button';
		li_scrolltolast.setAttribute('id', 'scroll-to-last');
		li_scrolltolast.setAttribute('title', 'Scroll to last read tweet');
		li_buttonbar_box.appendChild(li_scrolltolast);
		
		li_buttonbar.appendChild(li_buttonbar_box);
		
		buttonbar.appendChild(li_buttonbar);
		
		li_scrolltolast.addEventListener('click', function(event) {AEG.scrollToLastReadHandler(event)}, false);
		li_markall.addEventListener('click', function(event) {AEG.setLastRead(event)}, false);
	}
	
	AEG.tweetInsertHandler = function(event) {
		// mark if old
		var lastReadID = AEG.getLastUrlReadID();
		if ( lastReadID != null && event.target.className && event.target.className.indexOf("stream-item") >= 0 ) {
			AEG.testAndMarkTweet(event.target, MyBigNumber(lastReadID));
			//console.log('post');
		} else {
			//console.log(['post', event.target, event.target.className.indexOf("stream-item")]);
		}
	}
	
	// lookup the last tweet and store that ID in a cookie, then color all those tweets as read
	AEG.setLastRead = function(event) {
		try {
			// check whether the last read tweet is loaded, to prevent marking by accident
			var lastChild = document.querySelector('.stream > .stream-items > .stream-item:last-child');
			var oldestTweetID = AEG.getTweetIDFromElement(lastChild);
			if ( oldestTweetID <= AEG.getLastUrlReadID() || !AEG.markTweetsUseConfirm || confirm('Are you sure you want to mark all tweets read? \nThe last read tweet is not loaded.') ) {
				var firstChild = document.querySelector('.stream > .stream-items > .stream-item:first-child');
				while (firstChild.querySelector('div.tweet').hasAttribute('data-promoted')) {
					firstChild = firstChild.nextElementSibling;
				}
				var lastTweetID = AEG.getTweetIDFromElement(firstChild);
				
				AEG.setLastUrlReadID(lastTweetID);
				AEG.markRead(lastTweetID, true);
			}
		} catch (exc) {
			AEG.debugHandleException('AEG.setLastRead', exc);
		}
		event.stopPropagation();
	}
	
	// mark tweets with ID equal or lower than 'id' as read. If 'true' is passed as second parameter, promoted tweets will be marked also
	AEG.markRead = function(id, all) {
	    if (arguments.length < 2) {
			all = false;
		}

		try {
			var tweets = document.querySelectorAll('.stream > .stream-items > .stream-item');
			for ( var ind = tweets.length-1; ind >= 0; ind-- ) {
				var tweet = tweets[ind];
				if (all || ! tweet.querySelector('div.tweet').hasAttribute('data-promoted')) {
					AEG.testAndMarkTweet(tweets[ind], id);
				}
			}
		} catch (exc) {
			AEG.debugHandleException('AEG.markAllRead', exc);
		}
	}
	// mark the tweet if its ID is lower or equal to id	
	// @element : the insterted DOM element
	// @id : lastReadID
	AEG.testAndMarkTweet = function(element, id) {
		try {
			var tweetID = AEG.getTweetIDFromElement(element);
			if (tweetID == 0) {
				// happens with newly injected tweets. Since they're new, they don't have to be marked anyway.
				return;
			}
			
			// mark tweet if it's old
			if ( tweetID <= id ) {
				try {
					element.classList.add('is-read');
				} catch ( e2 ) {
					return; // error for some reason // TODO ignore instead of return? doesn't seem to happen anymore anyway
				}
			}
			if ( AEG.isScrolling ) {
				if ( element.querySelector('div.tweet').hasAttribute('data-promoted') || tweetID >= id ) {
					// Scroll this element into view, would automatically stop when the tweet we're looking for is found.
					// But just limit it to prevent an endless run
					if ( AEG.countScrollInjects++ < AEG.maxScrollInjects ) {
						window.clearTimeout(AEG.scrollInjectTimer);
						AEG.scrollInjectTimer = window.setTimeout(function(elem) {
							elem.scrollIntoView(false);
						}, 100, element);
					} else {
						window.clearTimeout(AEG.scrollInjectTimer);
						// didn't find the torrent in time, add a notice in the timeline
						AEG.isScrolling = false;
						var d = document.createElement('div');
						d.setAttribute('style', 'color: red; padding-left: 5px; font-weight: bold; border-bottom: 1px solid #EBEBEB');
						d.appendChild(document.createTextNode('max amount of repeats ('+ AEG.maxScrollInjects +') exceeded, tweet not found'));
						document.querySelector('.stream-items').insertBefore(d, element.nextSibling);
						d.scrollIntoView(false);
					}
				} else {
					AEG.isScrolling = false;
					// scroll this one into view
					window.clearTimeout(AEG.scrollInjectTimer);
					element.scrollIntoView(false);
				}
			}
		} catch (exc) {
			AEG.debugHandleException('AEG.testAndMarkTweet', exc);
		}
	}
	/*
	 * Keep scrolling down till the last read tweet is in view (or should be, scrolling till we find
	 *	a tweet with ID smaller or equal to the stored one.
	 *
	 * Use the 'dom-inserted-handler in a few ways:
	 * - checking for 'old' tweet(s) and marking that, also stopping the search
	 * - when scrolling we scroll to the last tweet in the timeline, then wait for tweets to be injected;
	 *   - we scroll every new tweet into view, until we hit a max (to prevent endless loop), or find
	 *     an 'old' tweet and then stop scrolling them into view.
	 *
	 * Using the following 'global' settings:
	 *  AEG.maxScrollInjects : (int) sets the max amount of tweets we allow to be loaded before we stop to scroll 
	 */
	AEG.scrollToLastReadHandler = function(event) {
		var lastReadID = AEG.getLastUrlReadID();
		if ( lastReadID === undefined ) {
			return;
		}

		// Only initiate if the last read tweet isn't already in the list (last tweet is newer (larger ID than) lastTweet(ID)).
		var lastChild = document.querySelector('.stream > .stream-items > .stream-item:last-child');

		//var tweetChild = lastChild.querySelector('div.js-stream-tweet');
		var tweetID = AEG.getTweetIDFromElement(lastChild, false); // 3 Nov 2012, before this used to use tweetChild

		if ( tweetID > lastReadID ) {
			AEG.countScrollInjects = 0;
			AEG.isScrolling = true;

			lastChild.scrollIntoView(false);
		} else {
			// the last-read tweet is on the current page already, find it and scroll to it
			var lastReadTweet = document.querySelector('.stream > .stream-items > .stream-item.is-read:not([data-component-context="follow_activity"])');
			lastReadTweet.scrollIntoView(false);
		}
		
		// stop the other click listener (on parent 'a' element) from being called
		event.stopPropagation();
	}
	AEG.createCookie = function(name,value,days) {
		try {
			var expires = "";
			if (days) {
				var date = new Date();
				date.setTime(date.getTime()+(days*24*60*60*1000));
				expires = "; expires="+date.toGMTString();
			}
			document.cookie = name+"="+value.replace(/"/g,'\'')+expires+"; path=/"; // replace the JSON double quotes with single ones
		} catch (exc) {
			AEG.debugHandleException('AEG.createCookie', exc);
		}
	};
	AEG.readCookie = function(name) {
		try {
			var nameEQ = name + "=";
			var ca = document.cookie.split(';');
			for( var i=0; i < ca.length; i++ ) {
				var c = ca[i];
				while ( c.charAt(0) == ' ' ) {
					c = c.substring(1,c.length);
				}
				if ( c.indexOf(nameEQ) === 0 ) {
					return c.substring(nameEQ.length,c.length).replace(/'/g, '"');
				}
			}
			return null;
		} catch (exc) {
			AEG.debugHandleException('AEG.readCookie', exc);
		}
	};
	AEG.eraseCookie = function(name) {
		try {
			createCookie(name,"",-1);
		} catch (exc) {
			AEG.debugHandleException('AEG.eraseCookie', exc);
		}
	};
	AEG.debugHandleException = function(title, message) {
		if ( AEG.debug ) {
			alert(title +'\n\n'+ message);
		}
	}
	AEG.log = function(log) {
		try {
			if ( AEG.debug && console != null ) {
				console.log(log);
			}
		} catch (e) {
			// silent
		}
	}
	// get the last read Tweet ID based on the URL (to support lists)
	AEG.getLastUrlReadID = function() {
		try {
			var lastRead = AEG.getLastReadID();
			return lastRead[AEG.getPageKey()];
		} catch (e) {
			AEG.log(e);
		}
	}
	// set the last read Tweet ID based on the URL (to support lists)
	AEG.setLastUrlReadID = function(id) {
		try {
			var lastRead = AEG.getLastReadID();
			lastRead[AEG.getPageKey()] = id;			
			AEG.createCookie('AEG_lastReadID', JSON.stringify(lastRead), 365);
		} catch (e) {
			AEG.log(e);
		}
	}
	// returns the object from a cookie, used by both get and set
	AEG.getLastReadID = function() {
		try {
			// if this is just a number, convert it to the new structure
			var lastRead = AEG.readCookie('AEG_lastReadID');
			if (null == lastRead) {
				return {};
			} else if ( !isNaN(MyBigNumber(lastRead)) ) {
				lastRead = {'twitter.com/': lastRead};
				AEG.createCookie('AEG_lastReadID', JSON.stringify(lastRead), 365);
				return lastRead;
			} else {
				return JSON.parse(lastRead);
			}
		} catch (e) {
			AEG.log(e);
		}
		return {};
	}
	// get key of lastRead by 'page'
	AEG.getPageKey = function() {
		var key = location.href.replace('http://','').replace('https://','').replace('#', '').replace('!/', '');
		return key;
	}
	
	// get the correct tweet ID from a tweet div
	/**
	 * param element DOM_Element : to get the ID from
	 * param use_base boolean    : return the 'data-item-id' even when this element is a retweet. This is needed for checking whether the last-read tweet is in view, because the retweet-id will be lower than the data-item-id
	 */
	AEG.getTweetIDFromElement = function(element, use_base) {
		var child = element.querySelector('div.tweet');
		if ( ! child || ! child.hasAttribute('data-item-id')) {
			return 0;
		}
		var tweetID = child.getAttribute('data-item-id').replace('-promoted', ''); //default value
		if ( tweetID.indexOf('_') > 0 ) {
			tweetID = tweetID.split('_')[3]; //@todo don't know what this is for anymore
		} else if ( !use_base ) {
			// try to see whether this is a retweet, if so set this tweet's id to the original ID
			var retweetChild = element.querySelector('div[data-retweet-id]');
			if ( child.hasAttribute('data-retweet-id') ) {
				tweetID = child.getAttribute('data-retweet-id').replace('-promoted', '');
			}
		}
		return MyBigNumber(tweetID);
	}

	// mark all read tweets (static content loaded with the page itself)
	var lastReadID = AEG.getLastUrlReadID();
	if ( lastReadID != null ) {
		AEG.markRead(MyBigNumber(lastReadID), false);
	}
	
	function MyBigNumber(value) {	
		function BigNumber(value) {
			var valueSize = 24; // number of 'digits' to use so we can always do string comparison of tweet id's by prepending zero's
			var value = String(value);

			this.padzeros = function(val) {
				while (val.length < valueSize) {
					val = '0' + val;
				}			
				return val;
			}
			this.toJSON = this.toString = this.valueOf = function() {
				return this.padzeros(value);
			}
		}
		return new BigNumber(value);
	}

	AEG.addButtonBar();
}

function CSS_script() {
	var style = document.getElementsByTagName('head')[0].appendChild(document.createElement('style'));
	style.textContent = "\
	.stream-item.is-read {\
		opacity: 0.5;\
		border-top: 1px solid #e8e8e8;\
		margin-top: 20px !important;\
	}\
	.stream-item.is-read:hover {\
		opacity: 1.0;\
	}\
	.stream-item:first-child,\
	.stream-item.is-read ~ .stream-item.is-read {\
		border-top: 0;\
		margin-top: 0 !important;\
	}\
	.stream-item.is-read.open {\
		opacity: 0.9;\
	}\
	.stream-item.open > .expansion-container > .original-tweet {\
		border-left: 3px solid;\
		border-right: 3px solid;\
		border-radius: 0;\
	}\
	#AEG-button-bar .box {\
		padding: 3px 12px 15px;\
	}\
	#AEG-button-bar .button {\
		display: inline-block;\
		margin: 10px 5px;\
		width: 24px;\
		height: 24px;\
		cursor: pointer;\
	}\
	#AEG-button-bar .button:hover {\
		opacity:0.7;\
	}\
	#AEG-button-bar #scroll-to-last {\
		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAC9UlEQVRIid2VQYgcRRSGv38RCSGEJeSwrMsyIHhTNBACXgQxRBYRYsSjojCNIqLiNBEXu+mRGEJPQDCg1EDQmwbjIYgYIupNYyQQyEEwyBDWJSyyhCUMewj5PUz3TO3MhA3etKCp5tX//v+9V/Wq4L8+tB2g2cp3STwF7Lc9D0JixXBR8EMoi/6/EkjSfDewbPtVYLcE9gTspqRTwIlQFrfuWaDZyvZJOgs0MJuGc4gLgh4wAzSMDwk9A9wPXLN9uNtpX91WIEmzfTY/DqLW1zZvdDvF6vQss0XMJ0hLwLrNE91OsUVEWx3yWdtXgEVJH4KXQ9mexh2LzNg6CX4LuCb0WOiMynXfGD6XtAicAZZD2abZyh6V9Mg0ctuXQ9m+mqT5O6CHgCXgKPD+RAZV9H9JwvaD3U77RmVfsH1F0h7bVOtIWgMeDmWxVpfL5g9JfeCB+nTNRNE8Dey0/VVNDhDKYkXweoSrf5s1+QDXvg58Y3vW9pO1fSgg6YAkEOcnSoG+AM5IovpOh7I4N46TdL5aPzAhACzYRqY37tjtFBi/BqwCf9p+exxTZdcbzCzUti2bLAngTmxrptmc0GxFcALoS5pP0nzeeL1bttcigjuDaeQfC6xWm9cAfhn6oAXbP4OG2GofNoX2A2sjLI2KY9g3cYkuVc4H4wxCWfwGfFBHpVF4y2GsqcAHq/VL0wS+lbQp6YWkle2N3QZNx681uaSfJH0UY5ppNg96FtgAvp8QCGWxDpy22QWcTNIszuI28JLtvu0NzMuhLIZ7laQ5mI9t77D9aXzxxRkA5BI3DC+C3k3SPBb5HTgqeDN0it6IPAM4Juk5oCfpWEy4RSCUxd+2j1TdeBz4PC6XpFNIn0VlmQN9CbxXleZIKIuNmHPqdZ2k+eO2z4LmwLcYNNmF6pzPSGrYPgQ8D+wErks6HMri8jjX3R+cVr4XUdh+BdgR3UGjGfqCABShLG5O49n+yUzzPbKXkKonEyStABeB7+5G/P8Z/wACzV4hetnLFgAAAABJRU5ErkJggg==);\
	}\
	#AEG-button-bar #mark-all {\
		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAC5ElEQVRIidWVT2gdVRTGf18IEksIQbqQUMpDshEqSKAUuhRDpahQKll2EXiDoKLiuypG5jJTqi3zCm8p80AQ3RjUIkqwRBQ3QikIUtyIiyAlZFFKCSGELPK5ePPa92doirseuByY+53vO+fMuffC4246DJCEOAt+CXTK9jEkBJuGm4K1ssju/i+BHjHRdgIckcAeg+0Bnwti2c7vPLJAs5UuSLoGHMfsGn+DdF2wARwYGphFiSVgGtiyfb7bzn8/VCAJccH2r8CMpFXbb3fb+VZtla30KOIq6AKwa3txVGRIIAlxxvafQAP4RNJKWWR13IPVIvGhzafAFvBcd6BdkyP4FUkN4DvwSllkJCHO256qI5e0XxbZ30krvQx6VuICkAFv9DET9zMJcdr268CezVtlkQNg/D1wS9KtGr8OULZzhN+zvQMsJyE+NVaB7BcNM7ZXu+1880EPFcCz1QA9Y/tJ0F+V+k4fV7bzO0krXbW9DJwFvhpukXRSAPb6YBvKIlsDSFrpJNJvwBSQlUW2X9OzdcEycLIvMDGwPWcb90Zx3KSW7dPAAhDrILY3Kj/X/zYogCQkTYzEkYT4PJBJ94fu/STE02M50IsdwA0J3HbvqDYGg5ohTtn+0uYJ21Rr0vYXzVY6PaLQqDhu1wncqMo7MxzDReBEP6l+dpLmQcVIEWeq/Rt1Ar9Iuifp5WYrPQ6QhHTG9gTQ6S/bHUkd2x3wXhLi0Qr7NPAasAv8NJDgA0tCvGjzsfAa4pWyyA94BEtCxPbXwBLQ6bbzd+sqALgi8Y/hrNHVJMSxH15HDlyStAT8K2nobhkiKItsB/ucpLuCd4AfmqHXrnrydA74FvgI2AbOlUV2bxBTf12HeAL7GmgevA/8KOl6NecHkhq2F4FX6R28DUnnyyL7Y5TrYQ/ONPCB7TeBWUnYZsjDtuAz4FJZZNt1PIc+mc0QjwheAE7ZHAMjaRO4CfxcFtnOIRSPuf0HkqRKoOco5hIAAAAASUVORK5CYII=);\
	}\
	";
}
CSS_script();
	
// delay launching script till the sidebar is loaded; to prevent error and inject after the right element is found (as alternative to too many @includes)
var delayInterval = window.setInterval(function() {
	trigger = document.querySelector('.stream > .stream-items > .stream-item:first-child div.tweet')
	if ( trigger != null ) {
		window.clearInterval(delayInterval);
//	if (document.querySelector('.stream > .stream-items > .stream-item:first-child div.tweet')) {
		try {
			DOM_script();
		} catch(e) {
			console.log(e);
		}
//	}
	} else {
		//console.log('delay');
	}
}, 1000);