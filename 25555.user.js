// ==UserScript==
// @name           pt
// @namespace      pt
// @include        http://forums.profiletracker.us/*
// ==/UserScript==

//number of pages to show. use and odd number to properly center the current page.
var navSize = 17;

var allDIVs, thisDiv, newDiv, newDiv2, fullURL, page;
fullURL = window.parent.location.href;
if (fullURL.indexOf('&page=') > 0) {
	page = (fullURL.substring(fullURL.indexOf('&page=') + 6)) - 1;
} else page = 0;
allSpans = document.evaluate(
    "//span[@id='pg']",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allSpans.snapshotLength; i++) {
    newDiv = document.createElement('div');
    newDiv.style.display="none";
    newDiv.id = 'hiddenNav';
    newDiv2 = document.createElement('div');
    newDiv2.id = 'navigator';
    thisSpan = allSpans.snapshotItem(i);
    //thisTable = thisTD.parentNode.parentNode.parentNode;
	thisDiv = thisSpan.parentNode;
    navHTML = thisDiv.innerHTML.replace('rgb(0, 0, 0)','black').match(/(<a|<b><).+<\/a>/)[0].replace(/ </g,',<').replace(/> /g,'>,');
	//GM_log (navHTML);
    newDiv.innerHTML = newDiv.innerHTML.substring(0, newDiv.innerHTML.length - 158);
	thisDiv.parentNode.insertBefore(newDiv2,thisDiv);
    // thisTable.parentNode.insertBefore(newDiv,thisTable);
    // thisTable.parentNode.removeChild(thisTable);
	var arrLink = navHTML.split(',');
	document.getElementById('navigator').innerHTML = '<br><table><tr><td><b>' +
		'<b><a id="navFirst" href="javascript:void(0)">&lt;&lt;FIRST</a> ' +
		'<a id="navPrevious" href="javascript:void(0)">&lt;PREVIOUS</a> </b></td><td align="center" width="630" id="navContent"></td><td>' +
		'<b> <a id="navNext" href="javascript:void(0)">NEXT&gt;</a> ' +
		'<a id="navLast" href="javascript:void(0)">LAST&gt;&gt;</a></b></td></tr></table><br>';
	
	//GM_log(arrLink.length);
	//setup the First link
	var navFirstLink = document.getElementById('navFirst');
	navFirstLink.addEventListener("click", 
	function(event) {
		page = 0;
		window.setTimeout(function() { populateNav(page);}, 0);
	}, true);	
	
	//Setup the Previous Link
	var navPrevLink = document.getElementById('navPrevious');
	navPrevLink.addEventListener("click", 
	function(event) {
		if (page > arrLink.length - Math.ceil(navSize / 2)){page = (arrLink.length - navSize - Math.ceil(navSize / 2));
		} else if (page <= 0){page = 0;
		} else page = page - navSize;
		window.setTimeout(function() { populateNav(page);}, 0);
	}, true);
	
	//setup the Next link
	var navNextLink = document.getElementById('navNext');
	navNextLink.addEventListener("click", 
	function(event) {
		if (page < Math.floor(navSize / 2)){page = page + navSize + (Math.ceil(navSize / 2) - page - 1);
		} else if (page > arrLink.length){page = arrLink.length;
		} else page = page + navSize;
		window.setTimeout(function() { populateNav(page);}, 0);
	}, true);
	
	//setup the Last link
	var navLastLink = document.getElementById('navLast');
	navLastLink.addEventListener("click", 
	function(event) {
		page = arrLink.length;
		window.setTimeout(function() { populateNav(page);}, 0);
	}, true);
	
	populateNav(page);
}
function populateNav(page){
	//GM_log(page);
	var navContent = "";
	var navStart = Math.floor(navSize / 2);
	var navEnd = 0;
	//this makes sure we don't go past the last page.
	if (page + Math.ceil(navSize / 2) > arrLink.length){
		navStart = 0;
		navEnd = navSize - (arrLink.length - page);}
	//this populates the new navigation
	for(var i=0; i< navSize; i++){
		//this makes sure we don't go past the first page
		if (page < Math.floor(navSize / 2)){
			navStart = page;
		}
		//get the current page
		thisPage = page + i - navStart - navEnd;
		//this is the stuff to convert to page numbers and tool tips.
		if (arrLink[thisPage].indexOf('<a') == 0) {
			var getText = arrLink[thisPage]
			getText = getText.substring(getText.indexOf('>') + 1, getText.indexOf('<', getText.indexOf('>')));
			arrLink[thisPage] = arrLink[thisPage].replace('>' + getText, ' title="Entries: ' + (thisPage * 50 + 1) + ' to ' + (thisPage * 50 + 51) + '">' + (thisPage + 1));
		}
		navContent = navContent + arrLink[thisPage] + ' ';	
	}
	document.getElementById('navContent').innerHTML = navContent;
}