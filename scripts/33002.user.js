// goodreads_exploder.user.js
// version 1.0 
// 2008-09-01
// Copyright (c) 2008, Giacomo Lacava <g.lacava@gmail.com>
// Released under the GPL license v.2
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name          Goodreads Exploder
// @description   Open in tabs all books on a shelf
// @include       http://www.goodreads.com/review/list/*
// @include       http://goodreads.com/review/list/*
// ==/UserScript==


// check that we have everything we need
if(!(GM_setValue && GM_getValue && GM_registerMenuCommand && GM_openInTab)){
	alert("Please update your Greasemonkey to the latest version before using this script.");
	return;
}

// global vars
OPTION_NAG = 'nag';
OPTION_NAG_DEFAULT = true;
OPTION_MAX_BOOKS = 'maxbooks';
OPTION_MAX_BOOKS_DEFAULT = 10;

// options
/* this is a complete bypass of nagging screen, dangerous
function toggleNag(){
	currVal = GM_getValue(OPTION_NAG,OPTION_NAG_DEFAULT);
	var msg;
	if(currVal){
		msg = "If you click OK, the system WILL NOT ask you to confirm when you explode a shelf wih more than "+String(GM_getValue(OPTION_MAX_BOOKS,OPTION_MAX_BOOKS_DEFAULT))+" books. " +
			"This might result in your browser and/or your system slowing down and/or crashing. " +
			"Are you sure you want to turn off this alert?"; 
	} else {
		msg = "If you click OK, the system WILL ask you to confirm when you explode a shelf wih more than 10 books. ";
	}
	
	if(confirm(msg)){
		GM_setValue(OPTION_NAG,!currVal);
	}
}
GM_registerMenuCommand("Toggle nagging for GR Exploder ",toggleNag);
*/
function changeMaxBooks(){
	msg = "If you try to explode a shelf with more books than the number set here, the system will warn you.";
	var number;
	number = parseInt(window.prompt(msg,GM_getValue(OPTION_MAX_BOOKS, OPTION_MAX_BOOKS_DEFAULT)));
	GM_setValue(OPTION_MAX_BOOKS,number);
}
GM_registerMenuCommand("Change max books for GR Exploder ",changeMaxBooks);

// functions
function grexp(event){
	var allBooks;
	// get all listed books
	allBooks = document.evaluate(
		"//a[@class='bookTitleRegular']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	// nag if lots of books
	if((allBooks.snapshotLength > GM_getValue(OPTION_MAX_BOOKS, OPTION_MAX_BOOKS_DEFAULT)) && GM_getValue(OPTION_NAG,OPTION_NAG_DEFAULT)){
		if(!confirm("WARNING: This will open " + String(allBooks.snapshotLength) + 
			" tabs, and might slow down your browser and/or your system. " +
			"Are you sure you want to continue?")) return false;
	}
	// get URLs and open tabs
	for (var i = 0; i < allBooks.snapshotLength; i++) {
		aBook = allBooks.snapshotItem(i);
		url = aBook.getAttribute('href');
		if(url.substring(0,4) != "http"){
			url = "http://www.goodreads.com" + url;
		}
		GM_openInTab(url);
	}
	// don't do anything more with this click
	event.preventDefault();
}

// start working on page
insdiv = document.getElementById('myBooks');
newLink = document.createElement('a');
newLink.setAttribute('href','#');
newLink.setAttribute('class','actionLink nobold');
newLink.appendChild(document.createTextNode('Explode this shelf'));
newLink.addEventListener('click', grexp, false);
insdiv.parentNode.insertBefore(newLink,insdiv);


