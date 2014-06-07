// ==UserScript==
// @name           hideorshow_youtube_title
// @namespace      http://userscripts.org/users/304720
// @description    adds a link so you can hide or show the title of the current youtube video. my first posted userscript - Stephen Stringfellow.
// @include        http://*.youtube.com/watch*
// @include        http://youtube.com/watch*
// ==/UserScript==

var elementArea = document.getElementById('watch-discussion');
var placeHolder = document.createElement('n');
var currentState = 0;
var displaytxt = "dfsdf";


placeHolder.innerHTML = "<a style='float:right;margin-top:15px;font-size:1.5em;' id='titleLink' href='Javascript:'>Hide Title</a>"
elementArea.parentNode.insertBefore(placeHolder.firstChild, elementArea);
document.getElementById('titleLink').addEventListener('click', showorhideTitle, false);

function showorhideTitle() {
if (currentState == 0) 	{
currentState++;
document.getElementById("eow-title").style.display = "none";
this.firstChild.nodeValue = "Show Title";
return false;
} else {
currentState--;
document.getElementById("eow-title").style.display = "block";
this.firstChild.nodeValue = "Hide Title";
return false;
	}
}