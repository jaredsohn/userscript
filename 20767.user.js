// ==UserScript==
// @name        Digg - Top Upcoming Sites
// @namespace   archeorbiter@gmail.com
// @description Version 1.0 - Displays the top ten currently popular sites by submit count in the sidebar on the Digg upcoming pages. Great for finding spam or duplicate stories.
// @include     http://digg.com/*/upcoming*
// ==/UserScript==


// add global css style
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.topsites { margin-bottom: 10px !important } .siteCount, .siteCount:hover { padding: 0 10px; color: #333 !important; font-weight: bold !important; text-decoration: none !important } .siteLink { text-decoration: none !important }');


// get sidebar
wrapper = document.getElementById('wrapper');
sidebar = wrapper.childNodes[1];
topten = document.getElementById('toptenlist');

// create main container
container = document.createElement('div');
container.className = 'side-container';
sidebar.insertBefore(container, topten.nextSibling);

// create main title
title = document.createElement('h2');
title.className = 'topsites';
title.innerHTML = 'Top Upcoming Sites';
container.appendChild(title);

// create container for listing
topSites = document.createElement('div');
topSites.className = 'topsites-list';
container.appendChild(topSites);

// get top sites and display them
var url = location.href
var media = url.match(/digg.com\/(.*)\/upcoming/)[1]; // only get the stories for the selected media type
var appKey = escape('http://archeorbiter.googlepages.com');
apiLink = 'http://services.digg.com/stories/upcoming?count=100&media=' + media + '&appkey=' + appKey + '&type=json';

GM_xmlhttpRequest ({
method: 'GET',
url: apiLink,

	onload: function(responseDetails) {
	var response = eval('(' + responseDetails.responseText + ')');
	sitesArray = new Array();

		for (var i = 0; i < response.stories.length; i++) {
		url = response.stories[i].link;

		// got the RegExp from www.web-wise-wizard.com
		url = url.replace(new RegExp(/\\/g),"/");
		url = url.replace(new RegExp(/^http\:\/\/|^https\:\/\/|^ftp\:\/\//i),"");
		url = url.replace(new RegExp(/^www\./i),"");
		url = url.replace(new RegExp(/\/(.*)/),"");

		sitesArray[sitesArray.length] = url;
		}

	// frequency counter by Jon Hanlon from www.htmlforums.com
	var counter = new Object();
	var keyMap = new Array();

		for (var j = 0; j < sitesArray.length; j++) {
		var key = sitesArray[j].toString();  // make it an associative array

			if (!counter[key]) {
			counter[key] = 1;
			keyMap[keyMap.length] = key;
			}

			else {
			counter[key] = counter[key] + 1;
			}
		}

		// sort function for associative arrays by Lasse Reichstein Nielsen from www.thescripts.com
		function sortByValue(keyArray, valueMap) {
		return keyArray.sort (function (a,b) { return valueMap[b] - valueMap[a] });
		}

	sorted = sortByValue(keyMap, counter);

		for (var i = 0, site; site = sorted[i]; i++) {
		count = counter[sorted[i]];

		line = document.createElement('div');
		line.innerHTML =
		'<a class=\"siteCount\" href=\"http://digg.com/search?s=' + site + '&submit=Search&section=' + media + '&type=url&area=dig&sort=new\">' + count + '</a>' +
		'<a class=\"siteLink\" href=\"http://' + site + '\">' + site + '</a>';
		topSites.appendChild(line);

		if (i > 8) break;
		}
	}
})
