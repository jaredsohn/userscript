// ==UserScript==
// @name           Junodownload add useful links
// @namespace      mikecupcake
// @include        http*://*.junodownload.com/products/*
// @version        1.2
// ==/UserScript==

// set variables
var ytURL = '<a href="http://www.youtube.com/results?search_query=';
var ttURL = '<a style="color: #000; font-weight: normal;" href="http://www.torrentech.org/index.php?act=Search&CODE=01&forums=1&searchsubs=1&keywords=';
var ttURLend = '" target="_blank">[TT]</a> ';

// get artist and release name from relevant DIVs
var artistName = fixString(document.getElementById('product_heading_artist').textContent);
var albumName = fixString(document.getElementById('product_heading_title').textContent);


// add youtube links to tracks
var trackDivs = document.evaluate("//*[@class='product_tracklist_heading_records_title'] | //*[@class='product_tracklist_heading_records_title product_tracklist_highlighted']",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = trackDivs.snapshotLength -1; i >= 0; i--) {
	var elm = trackDivs.snapshotItem(i);
	var trackName = elm.innerHTML.replace(/^\s+/, '');
	var ytString =  trackName + ' ' + artistName;
	var ytLink = ytURL + ytString + '" target="_blank">[Y]</a> ';
	elm.innerHTML = elm.innerHTML + ytLink;	
	}

// add torrentech links
var elm = document.getElementById('product_heading_title');
var ttLink = ttURL + (killShorts(albumName)).replace(/\s+/g,"%20%2B") + ttURLend;
elm.innerHTML = elm.innerHTML + ttLink;

var elm = document.getElementById('product_heading_artist');
var ttLink = ttURL + (killShorts(artistName)).replace(/\s+/g,"%20%2B") + ttURLend;
elm.innerHTML = elm.innerHTML + ttLink;

// functions

function killShorts(string) {
// torrentech doesn't let you use search terms of less than 3 characters
	array = string.split(' ');
	for (var i = 0; i < array.length; i++) {
		if (array[i].length < 3) { array.splice(i,1) } ;
	}
string = array.join(' ');
string = string.replace(/\s+$/, '');
//alert (string + '#');
return string;
}

function fixString(string) {
// remove some undesired characters 
	string = string.replace(/&amp;/g," ");
	string = string.replace(/&/g," ");
	string = string.replace(/:/g," ");
	//string = string.replace(/ /g,"+");
	string = string.replace(/\//g," ");
return string;
}