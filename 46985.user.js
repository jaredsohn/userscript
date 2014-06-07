// ==UserScript==
// @name           Subreddit Size Show
// @namespace      general
// @include        http://www.reddit.com/submit
// ==/UserScript==

var DISPLAY_FUNC = function(n){ return n; }; // could use log or some other function
var REQUEST_INTERVAL = 5000; // 5s
var UPDATE_INTERVAL = 24*60*60*1000; // 1day
//var X = unsafeWindow.console.info;
var X = function(){};


var sr = document.getElementById('sr'), subreddits = [];
// sorter
var sorter = document.createElement('A');
sorter.appendChild(document.createTextNode('sort'));
sorter.style.cursor = 'pointer';
sorter.addEventListener('click', function(){
	X('sorting...');
	for (var i=0; i<sr.options.length; i++)
		sr.removeChild(sr.options[i]);
	subreddits.sort(function(a,b){ return b.count-a.count; });
	for (var i=0; i<subreddits.length; i++)
		sr.appendChild(subreddits[i].obj);
}, false);
sr.parentNode.appendChild(sorter);
// start
X('sr.options.length: '+sr.options.length);
for (var i=0; i<sr.options.length; i++) {
	var op = sr.options[i], n = op.value;
	var nsr = {obj:op, name:n, count:parseInt(GM_getValue('c-'+n))||0, lastupdate:parseInt(GM_getValue('u-'+n))||0};
	subreddits.push(nsr);
	updatebar(nsr);
}
update();

function updatebar(subreddit) {
	for (var max=0, i=0; i<subreddits.length; i++)
		max = Math.max(max, DISPLAY_FUNC(subreddits[i].count || 1));
	var v = subreddit.obj.offsetWidth*DISPLAY_FUNC(subreddit.count)/max;
	X('  +  '+subreddit.name+': '+v);
	subreddit.obj.title = subreddit.count;
	subreddit.obj.style.background = 'url(http://imgur.com/2C2MQ.jpg) no-repeat '+Math.round(-200+v)+'px';
}
function update() {
	subreddits.sort(function(a,b){ return a.lastupdate-b.lastupdate; });
	
	var subreddit = subreddits[0];
	subreddit.lastupdate = subreddit.lastupdate || 0;
	if (prepupdate(subreddit)) {
		X('updating '+subreddit.name+'...');
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://www.reddit.com/r/'+subreddit.name+'/',
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'text/plain,text/html',
			},
			onload: function(data) {
				subreddit.lastupdate = new Date().getTime();
				subreddit.count = parseInt((/\((\d+) subscribers?\)/.exec(data.responseText)||[0,0])[1]);
				GM_setValue('u-'+subreddit.name, ''+subreddit.lastupdate); // seems to throw an error for numerical values
				GM_setValue('c-'+subreddit.name, ''+subreddit.count);
				updatebar(subreddit);
				setTimeout(update, REQUEST_INTERVAL);
			},
			onerror: function(data) {
				unsafeWindow.console.error('error fetching: '+subreddit.name);
				setTimeout(update, REQUEST_INTERVAL);
			}
		});
	}
}
function prepupdate(subreddit) {
	var td = new Date().getTime() - subreddit.lastupdate;
	X('td('+td+') < UPDATE_INTERVAL('+UPDATE_INTERVAL+') --- '+subreddit.lastupdate);
	if (td < UPDATE_INTERVAL) {
		X('update in... '+(UPDATE_INTERVAL - td));
		setTimeout(update, UPDATE_INTERVAL - td);
		return false;
	}
	return true;
}

