// ==UserScript==
// @name        LinuxJournalArticles
// @description Removes unwanted stuff from Linux Journal online articles
// @include     http://www.linuxjournal.com/article/*
// ==/UserScript==

//console.log("Start...");

// Remove the right content pane
var _right = document.getElementById("content_right");
if ( _right ) {
	( console ) && ( console.log ) && console.log("Removing 'content_right' pane");
	_right.parentNode.removeChild( _right );
}

// xpath tutorial: www.zvon.org/xxl/XPathTutorial/General/examples.html

// Find the content div so we can:
//   1. remove the 'clear' divs, 
//   2. fix the CSS to focus on the article
var content = document.getElementById("content");

// find the clear
var allclear = document.evaluate(
	"//div[@class='clear']", content, null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );

for ( var i = 0; i < allclear.snapshotLength; i++ ) {
  thisdiv = allclear.snapshotItem( i );
  ( console ) && ( console.log ) && console.log(" Removing 'clear' div: " + thisdiv );
  thisdiv.parentNode.removeChild( thisdiv );
}

// Add a style entry to remove the padding on the right, and to center the text.
head = document.getElementsByTagName('head')[0];
if (!head) { ( console ) && ( console.log ) && console.log("ERR: couldn't find the head element."); return; }

( console ) && ( console.log ) && console.log("Overriding CSS to center text..");

var newstyle = document.createElement('style');
newstyle.type = 'text/css';
newstyle.innerHTML = "#content { " +
           " padding-right: 0px ! important; " +  // override old padding-right
           " padding-left: 0px ! important; " +  // just in case this exists
           " margin-left: auto; " +
           " margin-right: auto; " +
           " width: 45em; " +
           " font-size: 14pt ! important; " + // override
           " line-height: 1.5em; " +
	   "}";
head.appendChild( newstyle );

// console.log("... done.");
