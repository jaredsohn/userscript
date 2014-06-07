// ==UserScript==
// @name					City of Palo Alto Alternative
// @namespace			http://www.outshine.com/
// @description		On Palo Alto's site, this makes it more accessible.
// @include				http://www.city.palo-alto.ca.us/*
// @include				http://www.cityofpaloalto.org/*
// @include				http://www.cpau.com/*
// @include				http://www.paenjoy.org/*
// ==/UserScript==

/*
Script by Tony Boyd.
Authored on 2007-09-07.
Updated on 2008-08-21.
Version: 1.0.1
*/

var css = document.createElement('style');
css.setAttribute('id', 'palo_alto_alternative');
document.getElementsByTagName('head')[0].appendChild(css);
var copa = document.getElementById('palo_alto_alternative');
/*
Make the orange highlight color more prevalent & consistent.
*/
copa.sheet.insertRule('a.headerLinks:hover, a.hpHeaders:hover, a.hpMore:hover, a.more:hover, a.newsheader:hover, a.fbFolderName:hover, a.deptHead:hover, a.ftLinks:hover {color: #F5D161 !important;}', 0);
/*
Fix the header & footer menus to be readable.
*/
copa.sheet.insertRule('.hpInfoLabel, .dtsrchDisplayHits, #podmenu a, a.ftLinks:link, a.ftLinks:visited, a.ftLinks:active {color: white !important; font-family: Arial,Helvetica,sans-serif !important; font-size: 11px !important;}', 0);
/*
The new text above the icons in the header will be a bright off-white color.
*/
copa.sheet.insertRule('.headerLinks, a.headerLinks:link, a.headerLinks:visited, a.headerLinks:active {color: #E2E0E0 !important;}', 0);
/*
Fix the dull green headers to be more readable.  The brighter green matches the
green in the logo, too -- bonus!
*/
copa.sheet.insertRule('.fqstyle4AnswerHead, .hpHeaders, a.hpHeaders:link, a.hpHeaders:visited, a.hpHeaders:active, .newsheader, a.newsheader:link, a.newsheader:visited, a.newsheader:active, .fbFolderName, a.fbFolderName:link, a.fbFolderName:visited, a.fbFolderName:active, .deptHead, a.deptHead:link, a.deptHead:visited, a.deptHead:active, .fbFolderDescription, .srchSubHeader {color: #6C9E2F !important;}', 0);
/*
The police FAQ needs an extra nudge to be readable.
*/
copa.sheet.insertRule('.fqstyle4AnswerHead {font-weight: bold !important;}', 0);
/*
Fix the "more" links to be readable.
*/
copa.sheet.insertRule('a.hpMore:link, a.hpMore:visited, a.hpMore:active, a.more:link, a.more:visited, a.more:active {color: white !important; font-size: 12px !important;}', 0);
/*
Add PDF icons to PDF links.  Not 100% accurate -- 1% of these links appear to
actually be .xls or .doc files.  But 99% is pretty good!
*/
copa.sheet.insertRule('a[href*="blobdload.asp"]:after {content: " " url(http://www.outshine.com/aw/pdf_16x16.gif)}', 0);
/*
Why do they have a link to a "bot trap" hidden under the "more" link on the home
page?  Let's remove that for us human beings.  We don't want to accidentally click it!
*/
copa.sheet.insertRule('a[href="/bot-trap/"] {display: none !important;}', 0);

/*
Remove the "back" links in each section's submenu.  (The link back may have 
nothing to do with that department and so should not be categorized as such.
Besides, we're not dumb -- we know perfectly well how to use a back button!)
*/
var myTable, thisTable, bad;
myTable = document.evaluate(
	"//table[@id='submenu']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null
);
for (var i = 0; i < myTable.snapshotLength; i++) {
	thisTable = myTable.snapshotItem(i);
	bad = thisTable.getElementsByTagName('td')[1];
	bad.parentNode.removeChild(bad);
}
/*
//Fix the ugly text on the navigation icons in the header.
//THIS IS COMMENTED OUT BECAUSE THEY FIXED IT!
var myImage, thisImage;
myImage = document.evaluate(
	"//img[contains(@src,'/img/navbuts/')]",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null
);
var linkText = new Array();
var myArray;
linkText[1] = 'Living<br />in Palo Alto';
linkText[2] = 'Business<br />in Palo Alto';
linkText[3] = 'Visiting<br />Palo Alto';
linkText[4] = 'Environment<br />in Palo Alto';
linkText[5] = 'Recreation<br />in Palo Alto';
linkText[6] = 'Know<br />Zone';
linkText[7] = 'City<br />Departments';
linkText[8] = 'Emergency<br />Information';
for (var i = 0; i < myImage.snapshotLength; i++) {
	thisImage = myImage.snapshotItem(i);
	if (myArray = thisImage.name.match(/^b([1-8])$/)) {
		thisImage.parentNode.setAttribute('style', 'display: block; height: 75px !important; width: 74px !important; overflow: hidden !important;');
		thisImage.setAttribute('style', 'position: relative; top: -20px !important;');
		var newDiv = document.createElement("div");
		newDiv.innerHTML = '<a href="' + thisImage.parentNode.href + '" onmouseout="off(' + myArray[1] + ');" onmouseover="on(' + myArray[1] + ');" class="headerLinks" style="font-size: 10px !important; text-align: center !important; font-family: Arial,Helvetica,sans-serif !important;">' + linkText[myArray[1]] + '</a>';
		thisImage.parentNode.parentNode.insertBefore(newDiv,thisImage.parentNode);
	}
}
*/

/*
Fix the chaotic menu colors in the department area.
*/
var myMenu, thisMenu;
myMenu = document.evaluate(
	"//div[@class='m7']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null
);
for (var i = 0; i < myMenu.snapshotLength; i++) {
	thisMenu = myMenu.snapshotItem(i);
}
if (thisMenu){
	var disaster = document.getElementById('submenu');
	disaster.parentNode.parentNode.parentNode.parentNode.style.backgroundColor = '#657732';
	disaster.parentNode.parentNode.parentNode.parentNode.style.borderColor = '#6e982a';
}
/*
Fix a broken link on the site map.
*/
var myLink, thisLink;
myLink = document.evaluate(
	"//a[@href='/home/web_site_help/default.asp']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null
);
for (var i = 0; i < myLink.snapshotLength; i++) {
	thisLink = myLink.snapshotItem(i);
	thisLink.setAttribute('href', '/knowzone/web_site_help/default.asp');
}
/*
Add dates to the links on the home page.
*/
var mySidebar, thisSidebar;
mySidebar = document.evaluate(
	"//a[@class='calLL6']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null
);
var myMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
for (var i = 0; i < mySidebar.snapshotLength; i++) {
	thisSidebar = mySidebar.snapshotItem(i);
	var h = thisSidebar.getAttribute('href');
	var month = h.substr(h.indexOf('CalDate=') + 8, 2);
	month = (month * 1) - 1;
	var day = h.substr(h.indexOf('CalDate=') + 11, 2);
	var thisDate = myMonths[month] + ' ' + day + ': ';
	var newT = document.createTextNode(thisDate);
	thisSidebar.insertBefore(newT, thisSidebar.firstChild);
}

/*
//GIVE THE SITE A "LIQUID LAYOUT" THAT FITS ON SMALL SCREENS.  NOT YET READY!
copa.sheet.insertRule('table, tr, td, th {width: inherit !important;}', 0);
var t_array = document.getElementsByTagName('table');
for (var i = 0; i < t_array.length; i++) {
	if ((t_array[i].id == 'menutable') || (t_array[i].id == 'submenu') || (i == t_array.length - 1)) {
		t_array[i].setAttribute('width', '100%');
		t_array[i].setAttribute('style', 'width: 100% !important;');
	}
	else {
		t_array[i].setAttribute('width', '*');
	}
}
var td_array = document.getElementsByTagName('td');
for (var i = 0; i < td_array.length; i++) {
	td_array[i].setAttribute('width', '*');
}
*/

/*
//THIS FIXES THE BLANK PAGES THAT APPEAR WHEN IT AUTO-SEARCHES FOR YOU.  NOT YET
//READY!  (TECHNICALLY, THIS CODE SHOULD WORK BUT IT WON'T ATTACH.  ANY IDEAS?)
var bodyfound = document.getElementsByTagName('body');
if (!bodyfound) {
	if (document.getElementsByTagName('input')[0].name = 'SearchQuery') {
		getElementById('frmSearch').submit();
	}
}
*/
