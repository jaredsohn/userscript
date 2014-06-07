// ==UserScript==
// @name           Twitter Tweaks 0.2
// @description    Updates the twitter home page UI to indicate which messages are replies and which is the last message you read.
// @namespace      http://cmorrell.com
// @include        http://twitter.com/home
// ==/UserScript==

var TwitterTweaks = {
	cookieName: 'tt_lastMsgId',
	
	init: function()
	{
		// Show last read
		var timeline = document.getElementById('timeline');
		var latestEntries = timeline.getElementsByTagName('li');
		var replies = this.getReplies(latestEntries);
		
		var css = '';
		css += '#' + this.getLastRead() + ' { background-color: #efe; } ';
		
		var i = replies.length;
		while (i--) { css += '#' + replies[i] + ' { background-color: #ffa; } '; }
				
		this.addCss(css);
		
		if ('http://twitter.com/home' == window.location) {
			this.setLastRead(latestEntries[0].id);
		}
	},
	getLastRead: function()
	{
		var cookies = document.cookie.split('; ');
		for(var i = 0; i < cookies.length; i++)
		{
			var cookie = cookies[i];
			var pos = cookie.indexOf(this.cookieName + '=');
			if (pos != -1)
			{
				return cookie.substring(pos + this.cookieName.length + 1, cookie.length);
			}
		}
		return null;
	},
	setLastRead: function(msgId)
	{
		// Expiration Date
		var date = new Date();
		date.setTime(date.getTime() + 31556926000);
		document.cookie = this.cookieName + "=" + msgId + "; expires=" + date.toGMTString() + "; path=/";
	},
	getProfileLink: function()
	{
		var profile = document.getElementById('profile');
		var userIcon = profile.getElementsByTagName('div')[0];
		return userIcon.getElementsByTagName('a')[0].href;
	},
	getReplies: function(latestEntries)
	{
		var targetUrl = this.getProfileLink();
		var r = new Array();
	
		var content, entryContent, a;
		var i = latestEntries.length;
		while (i--)
		{
			content = latestEntries[i].getElementsByTagName('span')[1];
			entryContent = content.getElementsByTagName('span')[0];
			a = entryContent.getElementsByTagName('a');
			
			var j = a.length;
			while (j--)
			{
				if (a[j].href == targetUrl) r[r.length] = latestEntries[i].id;
			}
		}
		
		return r;
	},
	addCss: function(css)
	{
		// Create CSS
		var style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;

		// Add CSS
		var head = document.getElementsByTagName('head')[0];
		head.appendChild(style);
	}
}
TwitterTweaks.init();