// ==UserScript==
// @name IMDB - Message Board Search (using Google)
// @namespace http://userscripts.org/users/27225
// @Description	Adds a search box and button to the Messasge board page and opens up a new tab with google search on that baord.
// @include http://www.imdb.com/title/*/board*
// @include www.imdb.com/title/*/board*
// @include http://imdb.com/title/*/board*
// @include imdb.com/title/*/board*
// @include http://www.imdb.com/name/*/board*
// @include www.imdb.com/name/*/board*
// @include http://imdb.com/name/*/board*
// @include imdb.com/name/*/board*
// @exclude 
// ==/UserScript==

//FOR DEBUGGING
// if(unsafeWindow.console){
   // var GM_log = unsafeWindow.console.log;
// }

var boardUrl=window.location.href;
var elm,searchTxt,searchBtn, boardType, regexImdbNum;

// parse imdb ID
if(boardUrl.search('title') != -1){
	boardType = 'title';
	regexImdbNum = /\/title\/(tt\d{7})\//;
}
else if(boardUrl.search('name') != -1){
	boardType = 'name';
	regexImdbNum = /\/name\/(nm\d{7})\//;
}
var id = regexImdbNum.exec(boardUrl);

// search for "Start New Topic" element.
var result=xpath("//a[@href='/"+boardType+"/"+id[1]+"/board/post/"+id[1]+"']");
elm=result.snapshotItem(0);

//Create the Search text field
searchTxt=document.createElement('input');
searchTxt.type="text";
searchTxt.id="searchTxt";
searchTxt.addEventListener('keydown', search, true);

//Create the "Search" button
searchBtn=document.createElement('button');
searchBtn.appendChild(document.createTextNode("Search"));
searchBtn.addEventListener('click', search, true);

//Add elements below the "Start New Topic" element
elm.parentNode.insertBefore(searchBtn, elm.nextSibling);
elm.parentNode.insertBefore(searchTxt, elm.nextSibling);
elm.parentNode.insertBefore(document.createElement('br'), elm.nextSibling);
elm.parentNode.insertBefore(document.createTextNode('Enter a keyword to search:'), elm.nextSibling);
elm.parentNode.insertBefore(document.createElement('br'), elm.nextSibling);
elm.parentNode.insertBefore(document.createElement('br'), elm.nextSibling);

/**
*	FUNCTIONS
**/
function xpath(query) {
return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

//Search
function search(event){
	var key = event.keyCode;
	if(typeof key == 'undefined' || key == 13){ // if search button clicked or ENTER key pressed
		var googleURL = "http://google.com/#hl=en&q=site%3A"+escape(boardUrl+" "+searchTxt.value);
		GM_openInTab(googleURL);
	}
}