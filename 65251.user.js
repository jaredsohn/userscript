// ==UserScript==
// @name          Reddit Highlight
// @namespace     http://www.reddit.com/user/jogger19
// @description   This script will highlight all the unread comment on a page. It will not highlight them on your first visit.
// @include       http://*.reddit.com/*comments/*
// ==/UserScript==
var redditHighlight = {
	init: function() {
		this.cookieContent = this.cookie.readCookie("redditHighlight");
		if(this.cookieContent != null) {
			var ids = this.cookieContent.split("|");
			for(var i = 0; i < ids.length; i++)
			{
				if(ids[i].indexOf(this.rId) != -1)
				{
					var id = ids[i].split(".");
					for(var ii = 0; ii < $(".tagline").length; ii++)
					{
						var t = $($(".tagline")[ii]).text();
						if(t != "")
						{
							var ago = /\s+\d+.+?ago/.exec(t)[0].replace("  ","");
							var num = parseInt(/\d+/.exec(ago)[0]);
							var millSub = 0;

							if(ago.indexOf("millisecond") != -1) {
								millSub = num;
							} else if (ago.indexOf("second") != -1) {
								millSub = num * 1000;
							} else if (ago.indexOf("minute") != -1) {
								millSub = num * 60000;
							} else if (ago.indexOf("hour") != -1) {
								millSub = num * 3600000;
							} else if (ago.indexOf("day") != -1) {
								millSub = num * 86400000;
							} else if (ago.indexOf("month") != -1) {
								millSub = num * 2592000000;
							} else if (ago.indexOf("year") != -1) {
								millSub = num * 31104000000;
							}
						
							if((new Date((new Date).getTime() - millSub)).getTime() < id[1])
							{
								$($(".tagline")[ii]).css("background-color", "#eeeeee");
							}
						}
					}
					
					break;
				}
			}
		}
		
		$(window).bind("beforeunload", function(){redditHighlight.setCookie();});
	},
	setCookie: function() {
		if(this.cookieContent == null)
		{
			this.cookie.createCookie("redditHighlight", this.rId + "." + (new Date).getTime(), 365);
		} else if (this.cookieContent.indexOf(this.rId) != -1) {
			var ids = this.cookieContent.split("|");
			for(var i = 0; i < ids.length; i++)
			{
				if(ids[i].indexOf(this.rId) != -1)
				{
					ids[i] = this.rId + "." + (new Date).getTime();
				}
			}
			ids = ids.join("|");

			this.cookie.createCookie("redditHighlight", ids, 365);
		} else {
			this.cookie.createCookie("redditHighlight", this.cookieContent + "|" + this.rId + "." + (new Date).getTime(), 365);
		}
	},
	cookie: {
			//Thanks quirks mode
			createCookie: function(name,value,days) {
				if (days) {
					var date = new Date();
					date.setTime(date.getTime()+(days*24*60*60*1000));
					var expires = "; expires="+date.toGMTString();
				}
				else var expires = "";
				document.cookie = name+"="+value+expires+"; path=/";
			},
			readCookie: function(name) {
				var nameEQ = name + "=";
				var ca = document.cookie.split(';');
				for(var i=0;i < ca.length;i++) {
					var c = ca[i];
					while (c.charAt(0)==' ') c = c.substring(1,c.length);
					if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
				}
				return null;
			}
		},
	rId: /\/comments\/(.+?)\//.exec(window.location)[1]
}

redditHighlight.init();