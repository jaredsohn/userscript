//
// By: Lior Zur, 2006
// Released under the GPL license (http://www.gnu.org/copyleft/gpl.html)
//
// ==UserScript==
// @name           Philosopher's Index Enhancer
// @namespace      http://mywebsite.com/myscripts
// @description    Improves Philosopher's Index in various ways. Highly experimental.
// @include        http://www-*.csa.com/*
// ==/UserScript==


var allElements, thisElement, anotherElement, newElement, f, txtTemp, txtTitle, txtDate, txtAuthor;
reIsRecord = /view_record.php/;
var currentURL = location.href;

/*==============================
==============================*/


/*==============================
  Fix the italics tag inside descriptions. (from <d> to </i>)
==============================*/
allElements = document.evaluate("//td[@class='data_content']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (f = 0; f < allElements.snapshotLength; f++) {
	thisElement = allElements.snapshotItem(f);
	txtTemp = thisElement.innerHTML;
	txtTemp = txtTemp.replace(/\<D\>/gi,"</i>");
	thisElement.innerHTML = txtTemp;
}



/*==============================
  Fix each record (bookmarking & display correct title)
==============================*/
if (reIsRecord.test(currentURL)){
allElements = document.evaluate("//td[contains(@class,'data_emphasis')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (f = 0; f < allElements.snapshotLength; f++) {
	thisElement = allElements.snapshotItem(f);
	txtTitle = thisElement.innerHTML;
	txtTitle = txtTitle.replace(/\<[^\>]*\>/gi,"");
}
allElements = document.evaluate("//td[contains(text(),'Publication Year')]/parent::tr/td[contains(@class,'data_content')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (f = 0; f < allElements.snapshotLength; f++) {
	thisElement = allElements.snapshotItem(f);
	txtDate = thisElement.innerHTML;
	txtDate = txtDate.replace(/\<[^\>]*\>/gi,"");
}


allElements = document.evaluate("//td[contains(text(),'Author') and not(contains(text(),'Review')) and contains(@class,'data_heading')]/parent::tr/td[contains(@class,'data_content')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (f = 0; f < allElements.snapshotLength; f++) {
	thisElement = allElements.snapshotItem(f);
	txtAuthor = thisElement.innerHTML;
	txtAuthor = txtAuthor.replace(/\<[^\>]*\>/gi,"");
	txtAuthor = txtAuthor.replace(/\,[^\$]*/gi,"");
}


var txtNumber;
allElements = document.evaluate("//td[contains(text(),'Accession Number')]/parent::tr/td[contains(@class,'data_content')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (f = 0; f < allElements.snapshotLength; f++) {
	thisElement = allElements.snapshotItem(f);
	txtNumber = thisElement.innerHTML;
	txtNumber = txtNumber.replace(/\<[^\>]*\>/gi,"");
}

//document.title = "(" + txtDate + ") " + txtTitle;

if ((txtDate) && ((txtAuthor) && (txtTitle))){
	var newTitle = "(" + txtDate + ", " + txtAuthor + ") " + txtTitle;
	document.title = newTitle;
	
	//http://www-md1.csa.com/ids70/p_search_form.php?SID=yyyyyyyyyyyyyyyyyyyyy&search_form=quick_search&query=2077258&Go_Search=Search&collection_id=999&dbtype=&quick_range=0
	
	var searchQuery = "http://DOMAIN/ids70/p_search_form.php?SID=CURRENTID&search_form=quick_search&query=ACCESSIONNUMBER&Go_Search=Search&collection_id=999&dbtype=&quick_range=0"
	searchQuery = searchQuery.replace(/ACCESSIONNUMBER/gi, txtNumber);
	
	var javascriptBookmark;
	javascriptBookmark = "javascript:(function(){"+
	"var curURL=location.href; " +
	"var sID=curURL.match(/SID=(\\w+)/)[1]; " + //test: a = "?SID=yyyyyyyyyyyyyyyyyyyyy&".match(/\?SID=(\w*)\&/)[1]; //NOTE: backslashes should be doubled.
	"var myDomain=location.host; " +
	//"alert (myDomain); "+
	"var searchQuery='" + searchQuery +"'; " +
	//"alert (searchQuery); "+
	"searchQuery = searchQuery.replace(/DOMAIN/, myDomain); "+
	//"alert (searchQuery); "+
	"searchQuery = searchQuery.replace(/CURRENTID/gi, sID); "+
	//"alert (searchQuery); "+
	"location.href = searchQuery; "+
	"})()";
	newElement = document.createElement('div');
	newElement.innerHTML = '<div style="align: center; width: 750px; font-size: 10px;">Bookmark this page. Drag this: <a href="' + javascriptBookmark +'">' + newTitle + '</a></div>';
	newElement.align = "center";
	
	var firstElement = document.body.firstChild;
	document.body.insertBefore(newElement, firstElement);
	//document.body.appendChild(newElement);
	
}

}