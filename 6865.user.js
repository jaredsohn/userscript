// ==UserScript==
// @name        digg - Digg this on all articles
// @version     1.1
// @author      Amar Raja
// @description See if the page is a redirection from digg. if so, put a Digg This icon at the top right.
// ==/UserScript==


/*
 If you use digg like i do (click loads of links with the middle button into tabs, read, then digg), it can be a pain to find
 the article again, especially if they dont put the "diggthis" link on their page. This script adds a "digg this" to all articles
 you read from digg and puts a fixed "digg this" at the top right of the article. This is my first userscript so any sugestions/improvements are more than welcome.

 Amar
*/

function getElementsByClass(searchClass,node,tag) {

	var classElements = new Array();
	if (node == null)
		node = document;
	if (tag == null)
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	var j = 0;
	for (i = 0; i < elsLen; i++) {
		if (pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}


var thisPage = window.location.href.toString();
var isDigg = (thisPage.indexOf("http://www.digg.com") == 0) || (thisPage.indexOf("http://digg.com") == 0)

if (document.referrer.indexOf('digg.com') > 0 && !isDigg){

	//Get the "diggurl" passed in the querystring

	var queryString = window.location.search;
	var diggUrl = '';
	if(queryString.length > 1) {
		queryString = queryString.substring(1, queryString.length);
		queryStringList = queryString.split("&");
		for(i = 0; i < queryStringList.length; i++) {
			var keyValue = queryStringList[i].split("=");
			if (keyValue[0] == "diggurl"){
				diggUrl = keyValue[1].toString();
				break;
			}
		}
	}

	if (diggUrl.length > 0){

		var diggdiv = document.createElement("div");

		diggdiv.setAttribute("id", "amarsdiggdiv");

		diggdiv.innerHTML = "<iframe src='http://digg.com/api/diggthis.php?u=" + escape(diggUrl) + "' height='82' width='55' frameborder='0' scrolling='no'></iframe>"

		diggdiv.setAttribute("style", "position: fixed;right: 10px; top: 10px; font-family: Arial, sans; text-align: left; filter: alpha(opacity=70); opacity: 0.70; -moz-opacity: 0.70; border: thin solid black; ");

		diggdiv.addEventListener('mouseover',
							 function(ev) {
								 diggdiv.style.filter = "alpha(opacity=100)";
								 diggdiv.style.opacity = '1';
								 diggdiv.style['-moz-opacity'] = '1';
								 ev.stopPropagation();
								 ev.preventDefault();
							 }, false);

		diggdiv.addEventListener('mouseout',
							 function(ev) {
								 diggdiv.style.filter = "alpha(opacity=70)";
								 diggdiv.style.opacity = '0.7';
								 diggdiv.style['-moz-opacity'] = '0.7';
								 ev.stopPropagation();
								 ev.preventDefault();
							 }, false);

		document.body.appendChild( diggdiv );
	}
} else if (isDigg){
	var mainDiv = getElementsByClass("main", null, "div")[0];
    var newsArticles = getElementsByClass("news-summary", mainDiv, "div");

	for ( x = 0; x < newsArticles.length; x++){
		var innerDiv = newsArticles[x].getElementsByTagName("div")[0]; //Div holding article info
		var topLink = innerDiv.getElementsByTagName("a")[0]; //Link straight to the article
		var bottomLink = innerDiv.getElementsByTagName("div")[0].getElementsByTagName("a")[0]; //"xxx comments" link, use this to get the diggurl that the diggit api needs

		//Add diggurl=digg.com/category/foo onto the querystring if there is one, otherwise make one
		topLink.href += (topLink.href.indexOf("?") == -1? "?": "&") + 'diggurl=' + bottomLink.href;
    }
}




