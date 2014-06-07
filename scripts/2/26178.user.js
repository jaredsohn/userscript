// ==UserScript==
// @name           Hahlo
// @namespace      http://hahlo.com/
// @description    Notify new tweets by Growl for fluidapp
// @include        http://hahlo.com/*
// @author         YungSang
// @version        1.6.1
// ==/UserScript==
// v0.1 : 2008.05.04 : First Release
// v0.2 : 2008.05.05 : Notify new tweets for you, even when you see any pages.
// v0.3 : 2008.05.05 : Nofity with a sound. The sound file must be 'nofity.aiff'.
// v0.4 : 2008.05.05 : Fix some original bugs.
// v0.5 : 2008.05.05 : Fix a bug, two timers exist at the same time somehow.
// v0.6 : 2008.05.05 : Reduce a waiting time at the first.
// v0.7 : 2008.05.06 : Notify a tweet text itself only.
// v0.8 : 2008.05.06 : Add an avatar in notifications
// v0.9 : 2008.05.08 : Strip &amp; to & for notifications
// v1.0 : 2008.05.08 : Add a badge for new tweets on the dock icon, and fix a bug with updateTweet
// v1.1 : 2008.05.08 : Ignore the reload request to the server on your own Friends Timeline
// v1.2 : 2008.05.11 : Update the time of past tweets and hold new tweets untill clearing the badge
// v1.3 : 2008.05.12 : Fix the top navi bar and some panels in its position
// v1.4 : 2008.05.14 : Set the Reload icon back to default on fatal error. Fix Last checked @ time.
// v1.5 : 2008.05.28 : Add shortcuts to clear the badge and to toggle the menu and tweet panels.
// v1.6 : 2008.05.30 : Add the number of new tweets to the window title.

(function () {
	var DEBUG = 0;

	if (typeof fluid == 'undefined') return;
	if (typeof getTweets != 'function') return;

log('start');

	var updateTimer    = null;
	var updateInterval = 60000;
	var is2ndTweetSent = true;
	var defaultTitle   = document.title;

	fluid.dockBadge = '';

	var showPageByHref = window.iui.showPageByHref;

	window.iui.showPageByHref = function(a, b, c, d, e, f) {
log('showPageByHref is called');
		if (d.getAttribute("href") == 'friends_timeline.php') {
			if (d.getAttribute("type") == 'topLink') {
				if (document.getElementById('time')) {
					clearNewTweets();
					return f();
				}
			}
			var org_f = f;
			f = function() {
				org_f();
				setNewTweets();
			};
		}
		if ((d.getAttribute("type") == 'updateTweet') && document.getElementById('time')) {
			clearTimeout(updateTimer);
			updateTimer = null;
		}
		showPageByHref(a, b, c, d, e, f);
	}

	window.getTweets = function(action, method, id, target, callback) {
log('getTweets is called');
		if (arguments.callee.caller != update) {
			if (is2ndTweetSent = !is2ndTweetSent) {
warn('On tweeting it\'s called twice from tweetSent()! So I just ignore the second.');
				return;
			}
		}

		var http = new XMLHttpRequest();
		http.onerror = function() {
			if (typeof callback == 'function') {
				callback(false);
			}
			setTimer(updateInterval);
		};
		http.onreadystatechange = function() {
			if (http.readyState == 4) {
				if (id) {
					if (document.getElementById('time'))	{
						holdNewTweets();
						try {
							updateContent(id, http.responseText, target);
						}
						catch(e) {
warn('Error occurred inside the hahlo script and/or the server.');
error(e);
							var time = document.getElementById('time');
							if (time) removeElement(time);
						}
						// Replace the Last checked time to Local time
						toLocalTime();
					}
					notifyNewTweet(http.responseText);
				}
				if (typeof callback == 'function') {
					setTimeout(callback, 1000, true);
				}
				setTimer(updateInterval);
			}
		};
		http.open(method || "GET", action, true);
		http.send(null);
	};

	var newTime = '';

	function notifyNewTweet(content) {
		var newTweetBox = document.createElement('ul');
		newTweetBox.style.display = 'none';
		document.body.appendChild(newTweetBox);

		newTweetBox.innerHTML = content;

		var newTweets = getElementsByClassName('newTweet', 'li', newTweetBox);
log(newTweets.length)

		if (newTweets.length) {
			fluid.playSoundNamed("notify");
			fluid.dockBadge = (fluid.dockBadge ? parseInt(fluid.dockBadge) : 0) + newTweets.length;
			document.title = defaultTitle + ' (' + fluid.dockBadge + ')'; 
		}

		for (var i = 0, len = newTweets.length ; i < len ; i++) {
			var tweet = newTweets[i];

			var nameBox = getElementsByClassName('name', 'div', tweet)[0];
			var name = trim(nameBox.getElementsByTagName('span')[0].firstChild.nodeValue);
log(name);

			var textBox = getElementsByClassName('tweettext', 'div', tweet)[0];
			var infoBox = textBox.getElementsByTagName('span')[0];
			removeElement(infoBox);
			var text = trim(textBox.innerHTML);
log(text);

			var notification = {
				title: name,
				description: text.replace('&amp;','&'),
				priority: 3,
				sticky: false,
				identifier: name,
				onclick: function(){}
			};

			var avatarBox = getElementsByClassName('proimg|medimg|bigimg', 'div', tweet)[0];
			if (avatarBox && avatarBox.style && avatarBox.style.backgroundImage &&
				avatarBox.style.backgroundImage.match(/url\((.*)\)/)) {
				notification.icon = RegExp.$1;
			}

			fluid.showGrowlNotification(notification);
		}
		if (document.getElementById('newTime')) newTime = document.getElementById('newTime').innerHTML;

		removeElement(newTweetBox);
	}

	function trim(text) {
		text = text.replace(/^\s+|\s+$/g, '');
		return text.replace(/<[^>]*>/g, '');
	}

	function update() {
		updateTimer = null;
		if (document.getElementById('time')) {
			var since_time = document.getElementById('time').innerHTML;
			getTweets('friends_timeline.php?ajax&since='+since_time+'',"get",
				'friends_timeline.php?ajax&since='+since_time+'','replaceBox');
		}
		else if (newTime) {
			getTweets('friends_timeline.php?ajax&since='+newTime+'',"get",
				'friends_timeline.php?ajax&since='+newTime+'','replaceBox');
		}
		else {
			setTimer(1000);
		}
	}

	function setTimer(updateInterval) {
		if (typeof window.updateInterval != 'undefined') clearInterval(window.updateInterval);
		if (updateTimer) clearTimeout(updateTimer);
		updateTimer = setTimeout(update, updateInterval);
	}

	setTimer(1000);

	function holdNewTweets() {
		var tweets = getElementsByClassName('newTweet', 'li');
		for (var i = 0, len = tweets.length ; i < len ; i++) {
			var tweet = tweets[i];
			if (tweet.className == "tweet first newTweet") {
				tweet.className = "tweet first smlavatar newTweet";
			}
			if (tweet.className == "tweet newTweet") {
				tweet.className = "tweet smlavatar newTweet";
			}
		}
	}

	function clearNewTweets() {
		fluid.dockBadge = '';
		document.title = defaultTitle; 
		var tweets = getElementsByClassName('newTweet', 'li');
		for (var i = 0, len = tweets.length ; i < len ; i++) {
			var tweet = tweets[i];
			if (tweet.className == "tweet first newTweet") {
				tweet.className = "tweet first";
			}
			if (tweet.className == "tweet newTweet") {
				tweet.className = "tweet";
			}
			if (tweet.className == "tweet first smlavatar newTweet") {
				tweet.className = "tweet first smlavatar";
			}
			if (tweet.className == "tweet smlavatar newTweet") {
				tweet.className = "tweet smlavatar";
			}
			if (tweet.className == "tweet first medavatar newTweet") {
				tweet.className = "tweet first medavatar";
			}
			if (tweet.className == "tweet medavatar newTweet") {
				tweet.className = "tweet medavatar";
			}
			if (tweet.className == "tweet first bigavatar newTweet") {
				tweet.className = "tweet first bigavatar";
			}
			if (tweet.className == "tweet bigavatar newTweet") {
				tweet.className = "tweet bigavatar";
			}
			if (tweet.className == "tweet first noavatar newTweet") {
				tweet.className = "tweet first noavatar";
			}
			if (tweet.className == "tweet noavatar newTweet") {
				tweet.className = "tweet noavatar";
			}
		}
	}

	function setNewTweets() {
log('setNewTweets is called');
		var num = fluid.dockBadge ? parseInt(fluid.dockBadge) : 0;
		if (!num) return;
log(num);
		var tweets = getElementsByClassName('tweet', 'li');
		for (var i = 0, len = tweets.length ; i < len && i < num ; i++) {
			var tweet = tweets[i];
			tweet.className += ' newTweet';
		}		
	}

	setInterval(function() {
log('updatePastTweets is called');
		if (!document.getElementById('time')) return;

		var infoBoxes = getElementsByClassName('updated', 'span');
		for (var i = 0, len = infoBoxes.length ; i < len ; i++) {
			var infoBox = infoBoxes[i];
			var info = infoBox.innerHTML;
			info = info.replace(/([0-9]+) minutes ago/, function(text, min) {
				return (parseInt(min) + 1) + ' minutes ago';
			});
			info = info.replace('about a minute ago', '2 minutes ago');
			info = info.replace('less than a minute ago', 'about a minute ago');
			infoBox.innerHTML = info;
		}
	}, updateInterval);

	function addRule(selector, style) {
log(selector + ' { ' + style + ' }');

		try {
			var sheet = document.styleSheets[document.styleSheets.length - 1];

			if (sheet && (typeof sheet.addRule != 'undefined')) {
				sheet.addRule(selector, style, sheet.rules.length);
			}
			else if (sheet && (typeof sheet.insertRule != 'undefined')) {				
				var rule = selector + ' { ' + style + '; }';
				sheet.insertRule(rule, 0);
			}
			else {
warn("Should not be here.");
			}
		} catch (e){
error(e);
		}
	}

	addEventListener("load", function() {
		addRule('body > div.titleBar',
			'position: fixed; z-index: 5000; width: 100%; top: 0; left: 0; padding: 0;');
		addRule('body div.refreshButton', 'position: fixed; z-index: 5000;');
		addRule('body > div.menuBox', 'position: fixed; left: auto !important; right: 20px;');
		addRule('body > div#menuLoad', 'position: fixed;');
		document.getElementById('content').style.marginTop = '37px';

		addRule('.pageTitleBar', 'overflow: hidden; white-space: nowrap; text-overflow: ellipsis;');
	});

	function toLocalTime() {
		var title = getElementsByClassName('pageTitleBar', 'li');
		if (title.length) {
			var info = title[0].innerHTML;
			title[0].innerHTML = info.replace(/Last (updated|checked) @ (.*)/, function(text, str, time) {
				var now  = new Date();
				var hour = now.getHours();
				var min  = now.getMinutes(); min = (min < 10) ? '0' + min : min;
				var sec  = now.getSeconds(); sec = (sec < 10) ? '0' + sec : sec;
				var last = 'Last ' + str + ' @ ' + hour + ':' + min + ':' + sec;
				if (DEBUG) last += ' (' + time + ')';
				return last;
			});
		}
	}
	
	window.addEventListener('keydown', function(e) {
		if (e.metaKey && e.shiftKey && (e.keyCode == 67)) { // Cmd+Shift+C
			e.preventDefault();
			clearNewTweets();
		}
		if (e.metaKey && e.shiftKey && (e.keyCode == 77)) { // Cmd+Shift+M
			e.preventDefault();
			menuToggle();
		}
		if (e.metaKey && e.shiftKey && (e.keyCode == 84)) { // Cmd+Shift+T
			e.preventDefault();
			updateToggle();
		}
	});


//--============================================================================
//-- Logger
//--============================================================================
	function log(str) {
		if (!DEBUG) return;
		if ((typeof console != 'undefined') && (typeof console.log == 'function')) console.log(str);
	}
	function error(str) {
		if ((typeof console != 'undefined') && (typeof console.error == 'function')) console.error(str);
	}
	function warn(str) {
		if ((typeof console != 'undefined') && (typeof console.warn == 'function')) console.warn(str);
	}
})();