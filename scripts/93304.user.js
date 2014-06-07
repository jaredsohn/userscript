// ==UserScript==
// @name          DepthHub Tagger
// @namespace 	  http://reddit.honestbleeps.com/
// @description	  Tool to tag DepthHub
// @author        cbattlegear
// @include       http://reddit.honestbleeps.com/*
// @include       http://reddit.com/*
// @include       https://reddit.com/*
// @include       http://*.reddit.com/*
// @include       https://*.reddit.com/*
// ==/UserScript==

/* Special thanks to honestbleeps for Reddit Enhancement Suite
I just modified the code to handle this specific instance
*/

function hasClass(ele,cls) {
	if ((typeof(ele) == 'undefined') || (ele == null)) {
		console.log(arguments.callee.caller);
		return false;
	}
	return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}
function addClass(ele,cls) {
	if (!hasClass(ele,cls)) ele.className += " "+cls;
}
function removeClass(ele,cls) {
	if (hasClass(ele,cls)) {
		var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
		ele.className=ele.className.replace(reg,' ');
	}
}
subreddittagger = {
	moduleID: 'subRedditTagger',
	moduleName: 'Subreddit Tagger',
	options: {
		subReddits: {
			type: 'table',
			fields: [
				{ name: 'subreddit', type: 'text' },
				{ name: 'doesntContain', type: 'text' },
				{ name: 'tag', type: 'text' }
			],
			value: [
				/*
				['somebodymakethis','SMT','[SMT]'],
				['pics','pic','[pic]']
				*/
			],
			description: 'Set your subreddits below. For that subreddit, if the title of the post doesn\'t contain what you place in the "doesn\'t contain" field, the subreddit will be tagged with whatever you specify.'
		}
	},
	description: 'Adds tags to posts on subreddits (i.e. [SMT] on SomebodyMakeThis when the user leaves it out)',
	isEnabled: function() {
		return RESConsole.getModulePrefs(this.moduleID);
	},
	include: new Array(
		/http:\/\/([a-z]+).reddit.com\/[\?]*/i
	),
	isMatchURL: function() {
		return RESUtils.isMatchURL(this.moduleID);
	},
	go: function() {
		
			// get this module's options...
			// RESUtils.getOptions(this.moduleID);
			// do stuff now!
			// this is where your code goes...
			this.SRTDoesntContain = new Array();
			this.SRTTagWith = new Array();
			//this.loadSRTRules();
			
			document.body.addEventListener('DOMNodeInserted', function(event) {
				if ((event.target.tagName == 'DIV') && (event.target.getAttribute('id') == 'siteTable')) {
					subreddittagger.scanTitles();
				}
			}, true);
			this.scanTitles();
			
		
	},
	/* loadSRTRules: function () {
		var subReddits=new Array();
		var subReddits[0] = 'AskReddit';
		for (var i=0, len=subReddits.length; i<len; i++) {
			thisGetArray = subReddits[i];
			if (thisGetArray) {
				this.SRTDoesntContain['dh'] = thisGetArray[1];
				this.SRTTagWith['dh'] = thisGetArray[2];
			}
		}
	}, */
	scanTitles: function() {
		var ourSubReddit = 'depthhub';
		var entries = document.querySelectorAll('#siteTable > .thing > DIV.entry');
		for (var i=0, len=entries.length; i<len;i++) {
			// bug in chrome, barfs on for i in loops with queryselectorall...
			if (i == 'length') break;
			subRedditUrl = null;
			thisSubRedditEle = entries[i].querySelector('A.subreddit');
			pathArray = window.location.pathname.split( '/' );
			if (typeof(pathArray[2]) != 'undefined'){
				subRedditUrl = pathArray[2].toLowerCase();
			}
			if(thisSubRedditEle == null) {
				thisSubRedditEle = subRedditUrl;
			}
			if ((typeof(thisSubRedditEle) != 'undefined') && (thisSubRedditEle != null)) {
				
				if (subRedditUrl == null){
					thisSubReddit = thisSubRedditEle.innerHTML.toLowerCase();
				} else {
					thisSubReddit = subRedditUrl;
				}
				
				if(thisSubReddit == ourSubReddit || subRedditUrl == ourSubReddit) {
					thedomain = entries[i].querySelector('p.title').querySelector('span.domain').querySelector('a').innerHTML;
					thisTitle = entries[i].querySelector('A.title');
					if (!(hasClass(thisTitle, 'srTagged'))) {
						addClass(thisTitle, 'srTagged');
						thisRegEx = 'DH';
						thisTagWith = '[DH - ' + thedomain + ']';
						if (thisTitle.text.search(thisRegEx) == -1) {
							thisTitle.innerHTML = thisTagWith + ' ' + thisTitle.innerHTML;
						}
					}
				}
			}
		}
	}

};
subreddittagger.go();