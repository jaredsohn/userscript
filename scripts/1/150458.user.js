// ==UserScript==
// @name           FB Timestamp
// @namespace      http://userscripts.org/users/296491
// @include        https://www.facebook.com/
// @include        http://www.facebook.com/
// ==/UserScript==

var timestamp={
	_tickerHolderID: "pagelet_ticker",
	_tickerItemClassName: "data-ticker-timestamp",
	
	_processNewStory:function(event){
		var id=event.target;
		if(id.className.indexOf("fbFeedTickerStory")!=-1){			
			timestamp._processStory(id);
		}
	},
	_getAtLoad:function(){
		var stories = document.body.getElementsByClassName(timestamp._tickerItemClassName);
		if(stories.length>0){
			for(i=0;i<stories.length;i++){
				timestamp._processStory(stories[i]);
			}
		}
		
	},
	_processStory:function(story){
		var time = story.getAttribute(timestamp._tickerItemClassName);
		time = parseInt(time);
		var d = new Date();
		var utc = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(),d.getUTCDate(), d.getUTCHours(),d.getUTCMinutes(), d.getUTCSeconds()) / 1000;
		var seconds, minutes, hours, days, weeks, aa;
		seconds = utc - time;
		minutes = seconds/60;
		hours = minutes/60;
		
		aa = hours%1;
		aa= aa.toString();
		aa = aa.substr(aa.indexOf(".")+1,2);
		aa = parseInt(aa);
		aa = Math.floor((aa/100)*60);
		days = Math.floor(hours) + " hours " + aa + " minutes";
		timestamp._setTitle(story,days);
	},
	_setTitle: function(element, val){
		element.title = val;
	},
	init: function(){
		//window.addEventListener("load", timestamp._getAtLoad, false);
		document.body.addEventListener("DOMNodeInserted", timestamp._processNewStory, false);
	}
}

timestamp.init();