// ==UserScript==
// @name           randomit!
// @author         Lanulus
// @namespace      lanulus@gmail.com
// @description	   Gets a random subreddit and adds a few of its links to Reddit's front page.
// @include        http://reddit.com/*
// @include        http://www.reddit.com/*
// ==/UserScript==

/****************************************/
/************ Preferences ***************/

const randomLinks = 5;  // How many links from the random reddit do you want on your front page?
const appearEvery = 4;  // Put a link from the random reddit after every x links.
					    // 0 will clump them at the top. If it goes over the number of links on
						// the main page, the rest will cluster at the bottom.

					  

/* Bolt on compatibility if the GM API is not supported */
if (!GM_xmlhttpRequest) {
	function GM_xmlhttpRequest(params) {
		req = new XMLHttpRequest();
		req.open(
			params['method'],
			params['url'],
			false
		);
		req.send();
		if(req.status == 200) {
			params['onload'](req);	
		}
	}
}

if (!GM_addStyle) {
	function GM_addStyle(css) {
		var head = document.getElementsByTagName('head')[0];
		var ss = document.createElement('link');
		ss.setAttribute('rel','stylesheet');
		ss.setAttribute('type','text/css');
		ss.setAttribute('href','data:text/css,'+css);
		head.appendChild(ss);
	}
}
/* Hooray, things should work! Sometimes. */


function xpath(param) {
	return document.evaluate(param,
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
}


function init() {
	const titleText = 'randomit!';
	var side, t, iDiv;
	
	side = xpath('//div[@class="side"]');
	side = side.snapshotItem(0);
	iDiv = document.createElement('div');
	iDiv.innerHTML = '<br/>Loading a random subreddit...';
	side.insertBefore(iDiv, side.childNodes[3]);
	t = document.createElement('h3');
	t.id = 'randomit';
	t.innerHTML = titleText;
	side.insertBefore(t, iDiv);

	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://www.reddit.com/r/random',
		onload: function(responseDetails) {
			if (responseDetails.status ==  200) {			
				var fI, lI, marker1, marker2, r, n, siteTable, info;
				
				/* Gather the links */
				marker1 = '<div id="siteTable" class="sitetable linklisting">';
				marker2 = '<div class="clearleft"><!--IE6sux--></div>';
				fI = responseDetails.responseText.indexOf(marker1);
				fI = fI + marker1.length;
				lI = responseDetails.responseText.lastIndexOf(marker2);
				lI = lI + marker2.length;
				r = responseDetails.responseText.substring(fI, lI);
				r = r.split('<div class="clearleft"><!--IE6sux--></div></div><div class="clearleft"><!--IE6sux--></div>');

				siteTable = xpath('//div[@id="siteTable"]/div'); 
				n = appearEvery * 2; // For every link there is a div inbetween, so we need *2 or two rand links will
									 // appear in a row.

				 /* Create a div, put a link in it, then insert it on the page. Repeat until done. */
				 var limit = randomLinks;
				 if (randomLinks > r.length) { // In case randomLinks is set higher than the number of links for some reason.
					limit = r.length;
				 }
				for (i=0; i<limit; i++) {
					var div, c;
					if (n >= siteTable.snapshotLength) { // This will make them cluster at the bottom if it goes over the total number of links.
						n = siteTable.snapshotLength - 1;
					}
					c = siteTable.snapshotItem(n);
					if ( (r[i] != "") && (r[i]) && (r[i].length < 3000) ) { // Half-assed fix for when there are no posts
						div = document.createElement('div');				// or less posts than the upper limit.
						div.setAttribute('class', 'rand');
						div.innerHTML = r[i] + '<div class="clearleft"><!--IE6sux--></div></div><div class="clearleft"><!--IE6sux--></div>';
						c.parentNode.insertBefore(div, c);
						n = n + (appearEvery*2);
					}
				}
				
				/* Now we'll get the info text and put it on the front page */
				marker1 = '<div class="titlebox">';
				marker2 = '<div class="clear"></div>';
				fI = responseDetails.responseText.indexOf(marker1);
				lI = responseDetails.responseText.indexOf(marker2, fI);
				info = responseDetails.responseText.substring(fI, lI);
				
				iDiv.innerHTML = info + '</div>';
				
				/* Link the title text to the subreddit */
				if (iDiv.firstChild.firstChild.tagName == 'H1') {
					var title = iDiv.firstChild.firstChild.innerHTML;
					iDiv.firstChild.firstChild.innerHTML = '<a href="http://www.reddit.com/r/' + title + '">' + title + '</a>';
				}	
			}
		}
	});
	
	if (GM_addStyle) {
		GM_addStyle(
			'#randomit {' 					+
			'	text-align: center;' 		+
			'}' 							+
			'.rand {' 						+ 
			'	border-width: 1px;' 		+
			'	border-left-style: dashed;'	+
			'	border-color: #ccc;' 		+
			'	margin-left: 45px;' 		+
			'}' 							+
			'.rand .title {' 				+
			'	font-size: 12px;' 			+
			'}' 							+
			'.rand .rank {' 				+
			'	display: none;' 			+
			'}'
		);
	}
}



var re = /^http:\/\/(?:www\.|)reddit.com(?:\/$|\/\?count)/;
if (re.test(location.href) == 1 ) {
	window.addEventListener("load", init, false);
}
