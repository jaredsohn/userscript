// ==UserScript==
// @name           FRANCIS Extender
// @description    Adds admin links to FRANCIS for exporting records to the website.
// @include        http://francis.williams.edu/search*
// ==/UserScript==

// Updates:
//
// none yet
// 
// The latest version of this script is always available at 
// http://userscripts.org/scripts/show/9584



var field = document.evaluate("//table//tr", 
	document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);

var todo = new Array();
var cell = field.iterateNext();
var i = 0;

var mTitle = '';
var mAuthor = '';
var mPublisher = '';
var mISBN = '';
var mRec = '';

while(cell && i < 10) {
	// Check each field
	//theField = whichFieldIsThis(cell.textContent);
	
	// If it matches one of ours, add it to the todo list
	//if(theField) todo.push(new Array(cell, theField));
	
	var text = cell.textContent.replace(/(\n|\s|\&nbsp\;)/g, " ");
	text = text.replace(/^\s*(.+\S)\s*$/, "$1");
	
	if(text.match(/^Author \/ Name/) && !text.match(/Title/) && !text.match(/Publisher/)) {
		mAuthor = text.replace(/^Author \/ Name\s+(.+)$/, "$1");
		//document.write('<p style="color:red">Author: "' + mAuthor + '"</p>');
		
	} else if(text.match(/^Title/)) {
		mTitle = text.replace(/^Title\s+(.+)$/, "$1");
		if(mTitle.match(/\//)) {
			mAuthor = mTitle.replace(/^.+\/\s*(.+)$/, "$1");
			mTitle = mTitle.replace(/^(.+\S)\s*\/.+$/, "$1");
			//document.write('<p style="color:red">Author: "' + mAuthor + '"</p>');
		}
		//document.write('<p style="color:red">Title: "' + mTitle + '"</p>');
		
	} else if(text.match(/^Publisher/)) {
		mPublisher = text.replace(/^Publisher\s+(.+)$/, "$1");
		//document.write('<p style="color:red">Publisher: "' + mPublisher + '"</p>');
		
	} else {
		//document.write('<p>"' + text + '"</p>');
	}
	
	if(mTitle && mAuthor && mPublisher) break;
	
	// Move to the next field
	cell = field.iterateNext();
 	//i++;
}

if(document.links) {
	for(var i=0; i<document.links.length; i++) {
		url = document.links[i].href;
		
		// ISBN
		if(url.match(/contentcafe/) && url.match(/Value=/)) {
			mISBN = url.replace(/^.+Value=(.+)$/, "$1");
			GM_log(mISBN + ' - ' + url);
			if(mRec) { break; }
			//break;
		}
	
		// Record Number
		if(url.match(/\?save=/) && url.match(/frameset/)) {
			mRec = url.replace(/^.+?save=(\w+)$/, "$1");
			GM_log(mRec + ' - ' + url);
			if(mISBN) { break; }
			//break;
		}
	}
}

if(mTitle && mAuthor && mPublisher && mISBN) {
	
	var footer = document.evaluate("//div[@id='botnav']//ul[@class='botmenuLinks']", 
		document, null, XPathResult.ANY_TYPE, null).iterateNext();

	if(footer) {

		var breaker = document.createElement("li");
		footer.appendChild(breaker);
		breaker.innerHTML = '|';
		breaker.className = "breaker";

		var facpub = document.createElement("li");
		footer.appendChild(facpub);
		facpub.innerHTML = 
			'<a href="http://library.williams.edu/admin/features/add.php?' +
			't=' + escape(mTitle) + '&a=' + escape(mAuthor) + '&p=' + escape(mPublisher) +
			'&i=' + escape(mISBN) + '&r=' + escape(mRec) + '" target="_blank">Export</a>';

	}

}

