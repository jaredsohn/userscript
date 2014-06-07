// ==UserScript==
// @name           Juno - add useful links
// @namespace      mikecupcake
// @include        http*://*juno.co.uk/ppps/*
// @include        http*://*juno.co.uk/products/*
// @grant	   none
// @version        1.7
// ==/UserScript==

// set variables
var ytURL = '<a href="http://www.youtube.com/results?search_query=';
var ytURLend = '" target="_blank">[Y]</a> ';
var ttURL = '<a style="color: #000; font-weight: normal;" href="http://www.torrentech.org/index.php?act=Search&CODE=01&forums=1&searchsubs=1&keywords=%2B';
var ttURLend = '" target="_blank">[TT]</a> ';
var discogsURL = '<a href="http://www.discogs.com/search?btn=&type=all&q=';
var discogsURLend = '" target="_blank">[D]</a> ';
var whatURL = '<a href="https://what.cd/torrents.php?searchstr=';
var whatURLend = '" target="_blank">[W]</a> ';

// get artist and release names
var release = fixString(document.querySelector('div.product-title').textContent);
release += " " + fixString(document.querySelector('div.product-artist').textContent);

// add youtube links to tracks
var trackNums = document.querySelectorAll("td.tl-track-number");
for (var i = trackNums.length -1; i >= 0; i--) {
	var elm = trackNums[i].nextElementSibling;
	var trackName = elm.textContent.trim();
	// GM_log(trackName);
	var ytLink = ytURL + fixString(trackName) + ' ' + release + ytURLend;
	elm.innerHTML = elm.innerHTML + ' ' + ytLink;	
}
 
// add torrentech, discogs etc. links
var elm = document.querySelector('div.product-title h2');
var ttLink = ttURL + (killShorts(release)).replace(/\s+/g,"%20%2B") + ttURLend;
var discogsLink = discogsURL + release + discogsURLend;
var whatLink = whatURL + release + whatURLend;
elm.innerHTML = elm.innerHTML + '<span style="font-size: 70%;">' + ttLink + discogsLink + whatLink + '</span>';
//elm.firstChild.style.display = "inline";


// functions
function killShorts(string) {
// torrentech doesn't let you use search terms of less than 3 characters
	array = string.split(' ');
	for (var i = 0; i < array.length; i++) {
		if (array[i].length < 3) { array.splice(i,1) } ;
	}
	string = array.join(' ');
	string = string.trim();
	return string;
}

function fixString(string) {
	string = string.replace(/(&amp;|reissue|\W|_)/gi," ");
	string = string.trim();
	return string;
}