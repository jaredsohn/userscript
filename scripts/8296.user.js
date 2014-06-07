// Bloglines Beautifier user script
// version 0.6
// 2007-08-27
// Copyright (c) 2006-2007, Aleksandar Djuric
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// Inspired by Gina Trapani's "Bloglines Teal Killer" user script and Mark Pilgrim's "Dive into Greasemonkey" book
//
//-----------------------------------------------------------------
// To use this script you need to have Firefox (http://www.mozilla.org) and 
// Greasemonkey (http://greasemonkey.mozdev.org/) installed.
//-----------------------------------------------------------------
//
// ==UserScript==
// @name			Bloglines Beautifier
// @namespace		http://delfuturo.org/projects/greasemonkey/
// @description	Redefine Bloglines look and feel.
// @version		0.6
// @include     	http://*bloglines.com/*
// @exclude     	http://beta.bloglines.com/*
// ==/UserScript==
//
// ==RevisionHistory==
// v0.6 2007-08-27 Change background color on selected article, improves image floats, excludes script from beta.bloglines.com
// v0.5 2007-06-26 Improved side navigation, del.ico.us integration, JavaScript cleanup.
// v0.4 2007-05-07 Added "updated" text next to updated article title. Minor CSS updates.
// v0.3 2007-04-02 Released to public
// v0.2 2007-01-12 Move Additional Features under Extras (simplify show/hide)
// v0.1 2006-12-06 Initial development: Redefine overall look and feel (page elements, default colors, link styles and logo).
// ==/RevisionHistory==

// Global colors
LINK_COLOR			=	'#24170C';	// Global - Link color
LINKVISITED_COLOR	=	'#97427D';	// Articles - Visited link color
TITLELINK_COLOR		=	'#24170C';	// Feed info title color
CHANNEL_COLOR		=	'#FFF';		// Feed info background color
HEADERBG_COLOR		=	'#4C93D4';	// Header background color
TABS_COLOR			=	'#881004';	// Tabs color
TABCURRENT_COLOR	= 	'#BD1C0C';	// Active tab color
TABSLINK_COLOR		=	'#FAFAFA';	// Tabs link color
TABSLINK_OVERCOLOR	=	'#CCC';		// Tabs mouse-over color
SUBSCR_COLOR		=	'#F7F7F7';	// Subscriptions column background
CURRENTFEEDBG_COLOR	=	'#EAEAEA';	// Selected feed background color
UNREAD_COLOR		=	'#333';		// Number of unread items color
DIVIDER_COLOR		=	'#666';		// Dividers color
SUBDIVIDER_COLOR	=	'#CCC';		// Subdividers color
SAVED_COLOR			=	'#EDEFF7'; 	// Saved item background color
ALT_COLOR			=	'#FFF';		// Alternate row background color
ITEMTITLE_COLOR		=	'#24170C';	// Item title color
ITEMUPDATED_COLOR	=	'#4C93D5';	// "updated" text color

// Additional Images
HEADER_BGIMAGE		=	'data:image/jpeg,%FF%D8%FF%E0%00%10JFIF%00%01%02%00%00d%00d%00%00%FF%EC%00%11Ducky%00%01%00%04%00%00%00d%00%00%FF%EE%00%26Adobe%00d%C0%00%00%00%01%03%00%15%04%03%06%0A%0D%00%00%01%CB%00%00%01%ED%00%00%024%00%00%02%81%FF%DB%00%84%00%01%01%01%01%01%01%01%01%01%01%01%01%01%01%01%01%01%01%01%01%01%01%01%01%01%01%01%01%01%01%01%01%01%01%01%01%01%01%01%01%01%01%01%02%02%02%02%02%02%02%02%02%02%02%03%03%03%03%03%03%03%03%03%03%01%01%01%01%01%01%01%02%01%01%02%02%02%01%02%02%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%FF%C2%00%11%08%002%00%13%03%01%11%00%02%11%01%03%11%01%FF%C4%00%8E%00%01%00%03%00%00%00%00%00%00%00%00%00%00%00%00%00%00%02%06%07%01%01%00%03%01%00%00%00%00%00%00%00%00%00%00%00%00%00%01%04%08%03%10%01%01%00%02%03%01%00%00%00%00%00%00%00%00%00%00%00%11%01%12%40%13%140%11%00%03%00%00%00%00%00%00%00%00%00%00%00%00%00%00%20%401%12%01%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%40%13%00%01%02%06%01%04%03%00%00%00%00%00%00%00%00%00%00%11a0%01Qq%91%D1%10%20%F0%81%A1%40!1%FF%DA%00%0C%03%01%00%02%11%03%11%00%00%01%C7%F4%FEl%24h%16%AA%81q%B1%C0%09%C8%00%00%00%01%FF%DA%00%08%01%01%00%01%05%02%E8t%3A%1Eg%99%E6k%86%B8k%8F%AF%FF%DA%00%08%01%02%00%01%05%02%88%88%89%C0%FF%DA%00%08%01%03%00%01%05%02%AA%AA%AB%C0%FF%DA%00%08%01%02%02%06%3F%02%2F%FF%DA%00%08%01%03%02%06%3F%02%2F%FF%DA%00%08%01%01%01%06%3F%02%18%87%FF%DA%00%08%01%01%03%01%3F!%5D%05%D0%5D%0BKx%99%19%19%8B%FF%DA%00%08%01%02%03%01%3F!%EA%1D%04%12%2F%FF%DA%00%08%01%03%03%01%3F!%F8%A2%7F%FF%DA%00%0C%03%01%00%02%11%03%11%00%00%10iYI%12I%24%92I%FF%DA%00%08%01%01%03%01%3F%10%7Fd%9DG%B8%1Ec%BF%B15%E2%7B%3B%D3%C1%7B%13%DF%E0%D7%12%D0%D7%D6%86%9E%B5%17%FF%DA%00%08%01%02%03%01%3F%10%E2%F3-%2C-%10%20D_%FF%DA%00%08%01%03%03%01%3F%10%40%81%1C%1B%C5f%2C%C5%9C_%FF%D9';

// CSS overrides and additions
GM_addStyle(
	'/* Fonts */ \n' +
			'body, input, select {font-family: "Lucida Grande", Verdana, Arial, sans-serif;} \n' +
	'/* Logo */ \n' +
			'.header-list {height: 50px;}\n' +
			'.header-list img {padding: 15px 0 0 7px;}' +
			'td#logo img {padding: 2px 0 0 7px;}\n' +
	'/* Global Header */ \n' +
			'.header-list, .header-content, #logo, .post .header {background: '+HEADERBG_COLOR+' url('+HEADER_BGIMAGE+') repeat-x top left;}\n' +
			'.post .header #logo {background: none;} \n' +
			'#welcomeBar {display: none;}\n' +
			'.tabs {background-image: none; background-color: '+TABS_COLOR+';}\n' +
			'.tabs ul li a {color: '+TABSLINK_COLOR+' !important;}\n' +
			'.tabs ul li a:hover {color: '+TABSLINK_OVERCOLOR+' !important;}\n' +
			'.tabs ul {margin: 0; padding: 0;}\n' +
			'.tabs li {border-bottom: none; margin: 0; padding: 2px 4px 2px 5px;}\n' +
			'.tabs li, .tabs li a {background: none;}\n' +
			'.tabs li.current {background-color: '+TABCURRENT_COLOR+';}\n' +
			'.tabs li.current a {color: '+TABSLINK_COLOR+' !important;}\n' +
			'.blog .tabs li {padding-bottom: 3px;}\n' +
			'.logbar {border: none;}\n' +
			'.logbar #actionBar a {color: #FFF; text-decoration: none; font-size: .9em;}\n' +
			'.logbar #actionBar {padding-top: 8px; color: '+DIVIDER_COLOR+';}\n' +
	'/* Search */ \n' +
			'.searchbar {position: absolute; top: 52px; margin: 0; right: 0; width: 400px;}\n' +
			'#sform * {font-size: 10px !important;}\n' +
			'#sform a {display: none;}\n' +
	'/* Feed browser */ \n' +
			'#subscriptions {background-color: '+SUBSCR_COLOR+';}\n' +
			'#main_window .hnav {padding: 0 0 5px 0;}\n' +
			'#main_window .clear {display: none;}\n' +
			'#main_window .hnav {font-size: .9em;}\n' +
			'#main_window .hnav_navbar a, #main_window .hnav a {font-weight: normal; color: '+LINK_COLOR+'}\n' +
			'#main_window .hnav_navbar {width: 95%; margin-top: -2px; margin-bottom: 3px !important;}\n' +
			'#treeContainer {margin: 0 !important; padding-right: 9px;} \n' +
			'#treeContainer a {color: '+LINK_COLOR+'; text-decoration: none; font-size: .9em !important;}\n'	+
			'#treeContainer a#aMarkRead {padding: 3px 8px 0 0;}\n' +
			'#treeltreeRoot a {font-size: .9em !important;}\n' +
			'#treeutreeRoot {padding: 8px 0 30px 0;}\n' +
			'#treeutreeRoot li.sub {margin-left: -14px;}\n' +
			'#treeutreeRoot li.sub a {margin-top: 1px; padding-left: 20px;}\n' +
			'#treeutreeRoot li {border: none; margin-bottom: 1px;}\n' +
			'#treeutreeRoot li.folder div {margin-left: -35px; padding: 0;}\n' +
			'.rootList {margin-top: 3px;}\n' +			
			'.treeList li a {display: block; padding: 2px 0;}\n' +
			'.treeList li a:hover {background-color: '+CURRENTFEEDBG_COLOR+';}\n' +
			'.treeList li div a.bl_toggle {float: left; padding: 0;}\n' +
			'.treeList li div a.bl_toggle img {padding: 7px 7px 7px 9px;}\n' +
			'.treeList li div a.bl_toggle:hover {background-color: transparent;}\n' +
			'.treeList li div a.bl_folderName {display: block; padding-left: 15px !important;}\n' +
			'.treeList .folderList li {border: 1px solid red;}\n' +
			'.treeList .urb {color: '+UNREAD_COLOR+'; font-weight: normal;}\n' +	
			'.folderList li.sub {margin-left: -5px !important;}\n' +
			'.folderList li.sub a {margin-top: 0 !important;}\n' +			
			'.treeView li {text-indent: 0;}\n' +
			'.treeView li.closed, .treeView li.open {background: none;}\n' +
			'.treeView .bl_folder_header a {padding-left: 9px; padding-right: 1px;}\n' +
			'.treeView .bl_folder_header ul {margin-left: 10px;}\n' +
			'.treeView li.selected, .treeView div.selected {padding-right: 5px; background-color: '+CURRENTFEEDBG_COLOR+'; border-right: 4px solid #BD1C0C !important;}\n' +
			'.item td.selected {background-color: '+CURRENTFEEDBG_COLOR+'; border-left: 3px solid '+CURRENTFEEDBG_COLOR+';}\n' +			
			'#tree .bl_root_header {width: 96%; background: none; padding-left: 6px; border-top: 1px solid '+SUBDIVIDER_COLOR+'; border-bottom: 1px solid '+SUBDIVIDER_COLOR+';}\n' +
			'#tree a {font-size: 1em !important;}\n' +
			'#tree .bl_actionLink {display: block;}\n' +
	'/* Feed browser -- Extras Section */ \n' +
			'#extras {margin: -7px 13px 15px 5px;}\n' +
			'#extras h2 {position: relative; margin: 0; padding: 2px 5px; font-size: 1em;}\n' +
			'#extras h2 a {position: absolute; right: 5px; font-weight: normal; text-decoration: none;}\n' +			
			'#extras .boxcontent {padding: 7px 0 0 0 !important;}\n' +
			'#extras #featuresContainer {display: block !important; height: inherit !important;}\n' +
			'#extras ul.extras a {text-decoration: none; font-weight: normal; font-size: .9em;}\n' +	
	'/* Right Frame */ \n' +
	'		.content-main {} \n' +
	'/* Items: Feed metadata */ \n' +
			'.channel {background-color: '+CHANNEL_COLOR+' !important;}\n' +
			'.channel h1, .channel h2 {padding: 0 4px;}\n' +
			'.channel h2 {margin: -6px 0 0 4px !important; padding-left: 4px; font-size: .9em;}\n' +
			'.channel h1 a {color: '+TITLELINK_COLOR+' !important; font-size: .65em !important; text-decoration: none !important;}\n' +
	'/* Items: Feed Navigation */ \n' +	
			'.channel_nav {background-color: '+CHANNEL_COLOR+' !important; border-top: 1px solid '+DIVIDER_COLOR+'; border-bottom: 1px dotted #666;}\n' +
			'.channel_nav li a {font-size: .9em; background-color: '+CHANNEL_COLOR+' !important; color: #000 !important; text-decoration: underline !important;}\n' +
			'.channel_nav li a strong {font-weight: normal !important;}\n' +
			'.header_nav ul {font-size: .9em; background-color: '+CHANNEL_COLOR+' !important; padding: 2px 5px; border-bottom: 2px solid '+DIVIDER_COLOR+'; text-align: right;}\n' +
			'.header_nav .hnonlink {font-weight: bold;}\n' +
	'/* Items: Headings, links and navigation elements */ \n' +
			'.item a {color: '+LINK_COLOR+' !important;}\n' +
			'.item h3 {font-size: 1.1em; line-height: 1.5em; margin: .7em 0 0 0 !important; padding: 0 .3em; color: '+ITEMUPDATED_COLOR+'; font-style: italic;}\n' +
			'.item h3 * {display: inline;}\n' +
			'.item h3 a {font-size: 1.15em; text-decoration: none; margin-right: 9px; border-bottom: 1px dotted #222; font-style: normal;}\n' +
			'.item .author {margin: 0 0 .5em 0 !important; padding: 0 0 0 5px !important; font-size: .9em;}\n' +
			'.item .bl_itemtitle {color: '+ITEMTITLE_COLOR+' !important;}\n' +
			'.article {line-height: 1.6em !important;}\n' +
			'.article p {margin-bottom: 1em;}\n' +
			'.article font {color: inherit !important; font: inherit !important;}\n' +
			'.article u {text-decoration: none;}\n' +
			'.article hr {background-color: #DDD; border: none; height: 1px; clear: both;}\n' +
			'.article a {text-decoration: none !important; border-bottom: 1px solid '+LINK_COLOR+';}\n' +
			'.article a:visited {text-decoration: none !important; border-bottom: 1px solid '+LINKVISITED_COLOR+';}\n' +
			'.article a:visited {color: '+LINKVISITED_COLOR+' !important;}\n' +
			'.article h1, .article h2, .article h3 {margin: 0 !important; padding: 1em 0 !important;}\n' +
			'.article h1 a, .article h2 a, .article h3 a {text-decoration: underline;}\n' +
			'.article h1 {font-size: 1.25em;}\n' +
			'.article h2 {font-size: 1.2em;}\n'+
			'.article h3 {font-size: 1.2em !important; margin: 0 0 -.8em 0 !important; color: #555;}\n' +			
			'.item_links {margin-bottom: 1em;}\n' +
			'ul.item_nav {font-size: .95em !important; padding: 5px 0 5px 0 !important;}\n' +
			'ul.item_nav li a {padding: 0 3px 0 5px !important; border-left: 1px solid #666;}\n' +
			'.item_nav input {margin: 5px 5px 2px 5px;}\n' +
			'.itemControls * {font-size: .95em;}\n' +
			'.itemControls {width: 98%; margin: -15px auto 0 auto; padding: 0; border-bottom: 2px solid '+DIVIDER_COLOR+';}\n' +
			'.itemControls form {padding: 20px 4px 10px 0;}\n' +
			'a.blines1 {display: none;}\n' +
	'/* Items: Web Services (Technorati, FeedBurner, Del.icio.us) */ \n' +
			'.article ul.tags {margin: 0 0 1em 0; padding: 0;} /* Technorati tags */  \n' +			
			'.article ul.tags li {display: inline; margin-right: 7px; font-size: .9em;} \n' +
			'.article ul.tags li a img {margin-right: 3px !important; border: none;} \n' +				
			'.article .delicious li {padding-bottom: .7em;}\n' +
			'.article .feedflare {width: 100%; float: left; clear: both;}\n' +		
			'.article .feedflare a {float: left; border: none !important;}\n ' +
			'.article .feedflare a img {border: none; margin: 0 !important; padding: 0 !important;}\n ' +
	'/* Items: Saved items (Keep new) */ \n' +
			'.saved {padding-left: 4px; border-bottom: 1px solid '+DIVIDER_COLOR+'; background-color: '+SAVED_COLOR+';}\n' +
	'/* Items: Alternate rows */ \n' +
			'.alt {background-color: '+ALT_COLOR+' !important; border-top: 1px solid '+DIVIDER_COLOR+'; border-bottom: 1px solid '+DIVIDER_COLOR+';}\n' +
			'.alt, .normal {padding-left: 4px;}\n' +
			'.normal {border-bottom: none; border-left: none;}\n' +
 	'/* Items: Article images (Tested on Flickr, HotLinks, Notcot, Lifehacker, etc.) */ \n' +		
			'.article img {float: left; clear: left; margin: 8px 1em 1em 0 !important;}\n' +
			'.article p {clear: right;}\n' +
			'.article p img {float: left; margin: 8px 1em 1em 0 !important;}\n' +
			'.article a img {padding: 5px !important; border: 1px solid '+LINK_COLOR+';}\n' +			
			'.article li a img {float: none; margin: 0 !important; padding: 0 !important;}\n' +
			'.article li img {float: none; margin: 10px 0 !important; padding: 0 !important;}\n' +		
	'/* Shortcuts */ \n' +
			'.rbox {margin-top: 20px !important;}\n' +
			'.rbox .shortcuts {width: 96%; padding: 3px 3px 3px 10px; line-height: 2em;  background-color: #F6F6F6;}\n' +
			'.rbox .shortcuts .key {background-color: #EFEFEF; border-right: 1px solid #CCC; border-bottom: 1px solid #CCC; padding: 2px 4px;}\n' +
	'/* Footer */ \n' +
			'.homefooter {font-size: .8em; margin-bottom: 5px;}\n' +
			'.bl_partner {display: none;}\n'
	);

// Extras (Additional Features)

	// Create "extras" link inside navbar
		var extrasLink, extrasLinkText, extrasDivider, extrasDividerText, allDivs, subnavDiv, extras;
		extras = document.getElementById("extras");
		extrasDivider = document.createElement("span");
		extrasDividerText = document.createTextNode("| ");
		extrasDivider.appendChild(extrasDividerText);
		extrasLink = document.createElement("a");
		extrasLinkText = document.createTextNode("Extras");
		extrasLink.appendChild(extrasLinkText);
		extrasLink.setAttribute("href", "#");
		extrasLink.setAttribute("onclick", "document.getElementById('extras').style.display = 'block';");
		allDivs = document.evaluate(
		"//div[@class='hnav_navbar']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
		for (var i = 0; i < allDivs.snapshotLength; i++) {
			subnavDiv = allDivs.snapshotItem(i);
			if (subnavDiv) {
				subnavDiv.appendChild(extrasDivider);
				subnavDiv.appendChild(extrasLink);
			}	
		}

	// Move "Additional Features" box above subscriptions, rename it to "Extras", hide it and add close button
		var allDivs2, extrasBox, extrasContainer, extrasTitle, extrasTitleText, extrasHeader, extrasCloseLink, extrasCloseLinkText, mainContainer;
		allDivs2 = document.evaluate(
		"//div[@class='bl_box']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
		for (var i = 0; i < allDivs2.snapshotLength; i++) {
			extrasBox = allDivs2.snapshotItem(i);
			if (extrasBox) {
				extrasBox.setAttribute("id", "extras");
				extrasBox.setAttribute("style", "display: none;");
				extrasHeader = extrasBox.childNodes[1];
				extrasHeader.parentNode.removeChild(extrasHeader);
				extrasContainer = document.getElementById('featuresContainer');			
				extrasTitle = document.createElement("h2");
				extrasTitleText = document.createTextNode("Extras");
				extrasTitle.appendChild(extrasTitleText);
				extrasContainer.parentNode.insertBefore(extrasTitle, extrasContainer);
				extrasCloseLink = document.createElement("a");
				extrasCloseLinkText = document.createTextNode("[x]");
				extrasCloseLink.setAttribute("href", "#");
				extrasCloseLink.setAttribute("title", "close extras");
				extrasCloseLink.setAttribute("onclick", "document.getElementById('extras').style.display = 'none';");
				extrasCloseLink.appendChild(extrasCloseLinkText);
				extrasTitle.appendChild(extrasCloseLink);
				mainContainer = parent.frames[0].document.getElementById("main_window");
				subTree = parent.frames[0].document.getElementById("treeContainer");
				mainContainer.insertBefore(extrasBox,subTree);
			}	
		}

// Alternate rows - Replace inline color with external style
	var allCells, thisCell;
	allCells = document.evaluate(
	    "//td[@bgcolor='#efefef']",
	    document,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);
	for (var i = 0; i < allCells.snapshotLength; i++) {
	    thisCell = allCells.snapshotItem(i);
		if (thisCell) {
			thisCell.setAttribute("class", "alt");			
		}	
	}
	
// Kept item - Replace inline color with external style
	var allSavedItems, thisSavedItem;
	allSavedItems = document.evaluate(
	    "//td[@bgcolor='#ebf5f8']",
	    document,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);
	for (var i = 0; i < allSavedItems.snapshotLength; i++) {
	    thisSavedItem = allSavedItems.snapshotItem(i);
		if (thisSavedItem) {
			thisSavedItem.setAttribute("class", "saved")
		}	
	}

// Updated articles: Add "updated" text next to article title
	var allLists, thisList, articleItem, updatedTitleText;
	allListst = document.evaluate(
	    "//li[@class='itemupdate']",
	    document,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);
	for (var i = 0; i < allListst.snapshotLength; i++) {
	    thisList = allListst.snapshotItem(i);
		if (thisList) {
			parentArticleTitle = thisList.parentNode.parentNode.parentNode.getElementsByTagName('h3')[0];
			updatedTitleText = document.createTextNode("updated");
			parentArticleTitle.appendChild(updatedTitleText);
		}	
	}	

// Replace Bloglines logo - Use smaller version of the logo
	var firstTable = document.getElementsByTagName("table")[0];
	if (firstTable) {
		var logo = firstTable.getElementsByTagName("img")[0];
		logo.setAttribute("src", "http://bloglines.com/images/blogo22x81.gif");
		logo.setAttribute("width", "81");
		logo.setAttribute("height", "22");
	}
	
// Replace Ask logo - Use image with transparecy to support global header's background image
	var actionBar, thisBar, logoImage;
	actionBar = document.evaluate(
	    "//td[@id='actionBar']",
	    document,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);
	for (var i = 0; i < actionBar.snapshotLength; i++) {
	    thisBar = actionBar.snapshotItem(i);
		logoImage = thisBar.childNodes[1].firstChild;	
		logoImage.setAttribute("src","data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%20%00%00%00%15%08%06%00%00%00'%CD%EC%EA%00%00%00%09pHYs%00%00%0B%12%00%00%0B%12%01%D2%DD~%FC%00%00%0AMiCCPPhotoshop%20ICC%20profile%00%00x%DA%9DSwX%93%F7%16%3E%DF%F7e%0FVB%D8%F0%B1%97l%81%00%22%23%AC%08%C8%10Y%A2%10%92%00a%84%10%12%40%C5%85%88%0AV%14%15%11%9CHU%C4%82%D5%0AH%9D%88%E2%A0(%B8gA%8A%88Z%8BU%5C8%EE%1F%DC%A7%B5%7Dz%EF%ED%ED%FB%D7%FB%BC%E7%9C%E7%FC%CEy%CF%0F%80%11%12%26%91%E6%A2j%009R%85%3C%3A%D8%1F%8FOH%C4%C9%BD%80%02%15H%E0%04%20%10%E6%CB%C2g%05%C5%00%00%F0%03yx~t%B0%3F%FC%01%AFo%00%02%00p%D5.%24%12%C7%E1%FF%83%BAP%26W%00%20%91%00%E0%22%12%E7%0B%01%90R%00%C8.T%C8%14%00%C8%18%00%B0S%B3d%0A%00%94%00%00ly%7CB%22%00%AA%0D%00%EC%F4I%3E%05%00%D8%A9%93%DC%17%00%D8%A2%1C%A9%08%00%8D%01%00%99(G%24%02%40%BB%00%60U%81R%2C%02%C0%C2%00%A0%AC%40%22.%04%C0%AE%01%80Y%B62G%02%80%BD%05%00v%8EX%90%0F%40%60%00%80%99B%2C%CC%00%208%02%00C%1E%13%CD%03%20L%03%A00%D2%BF%E0%A9_p%85%B8H%01%00%C0%CB%95%CD%97K%D23%14%B8%95%D0%1Aw%F2%F0%E0%E2!%E2%C2l%B1Ba%17)%10f%09%E4%22%9C%97%9B%23%13H%E7%03L%CE%0C%00%00%1A%F9%D1%C1%FE8%3F%90%E7%E6%E4%E1%E6f%E7l%EF%F4%C5%A2%FEk%F0o%22%3E!%F1%DF%FE%BC%8C%02%04%00%10N%CF%EF%DA_%E5%E5%D6%03p%C7%01%B0u%BFk%A9%5B%00%DAV%00h%DF%F9%5D3%DB%09%A0Z%0A%D0z%F9%8By8%FC%40%1E%9E%A1P%C8%3C%1D%1C%0A%0B%0B%ED%25b%A1%BD0%E3%8B%3E%FF3%E1o%E0%8B~%F6%FC%40%1E%FE%DBz%F0%00q%9A%40%99%AD%C0%A3%83%FDqanv%AER%8E%E7%CB%04B1n%F7%E7%23%FE%C7%85%7F%FD%8E)%D1%E24%B1%5C%2C%15%8A%F1X%89%B8P%22M%C7y%B9R%91D!%C9%95%E2%12%E9%7F2%F1%1F%96%FD%09%93w%0D%00%AC%86O%C0N%B6%07%B5%CBl%C0~%EE%01%02%8B%0EX%D2v%00%40~%F3-%8C%1A%0B%91%00%10g42y%F7%00%00%93%BF%F9%8F%40%2B%01%00%CD%97%A4%E3%00%00%BC%E8%18%5C%A8%94%17L%C6%08%00%00D%A0%81*%B0A%07%0C%C1%14%AC%C0%0E%9C%C1%1D%BC%C0%17%02a%06D%40%0C%24%C0%3C%10B%06%E4%80%1C%0A%A1%18%96A%19T%C0%3A%D8%04%B5%B0%03%1A%A0%11%9A%E1%10%B4%C118%0D%E7%E0%12%5C%81%EBp%17%06%60%18%9E%C2%18%BC%86%09%04A%C8%08%13a!%3A%88%11b%8E%D8%22%CE%08%17%99%8E%04%22aH4%92%80%A4%20%E9%88%14Q%22%C5%C8r%A4%02%A9Bj%91%5DH%23%F2-r%149%8D%5C%40%FA%90%DB%C8%202%8A%FC%8A%BCG1%94%81%B2Q%03%D4%02u%40%B9%A8%1F%1A%8A%C6%A0s%D1t4%0F%5D%80%96%A2k%D1%1A%B4%1E%3D%80%B6%A2%A7%D1K%E8ut%00%7D%8A%8Ec%80%D11%0Ef%8C%D9a%5C%8C%87E%60%89X%1A%26%C7%16c%E5X5V%8F5c%1DX7v%15%1B%C0%9Ea%EF%08%24%02%8B%80%13%EC%08%5E%84%10%C2l%82%90%90GXLXC%A8%25%EC%23%B4%12%BA%08W%09%83%841%C2'%22%93%A8O%B4%25z%12%F9%C4xb%3A%B1%90XF%AC%26%EE!%1E!%9E%25%5E'%0E%13_%93H%24%0E%C9%92%E4N%0A!%25%902I%0BIkH%DBH-%A4S%A4%3E%D2%10i%9CL%26%EB%90m%C9%DE%E4%08%B2%80%AC%20%97%91%B7%90%0F%90O%92%FB%C9%C3%E4%B7%14%3A%C5%88%E2L%09%A2%24R%A4%94%12J5e%3F%E5%04%A5%9F2B%99%A0%AAQ%CD%A9%9E%D4%08%AA%88%3A%9FZIm%A0vP%2FS%87%A9%134u%9A%25%CD%9B%16C%CB%A4-%A3%D5%D0%9Aigi%F7h%2F%E9t%BA%09%DD%83%1EE%97%D0%97%D2k%E8%07%E9%E7%E9%83%F4w%0C%0D%86%0D%83%C7Hb(%19k%19%7B%19%A7%18%B7%19%2F%99L%A6%05%D3%97%99%C8T0%D72%1B%99g%98%0F%98oUX*%F6*%7C%15%91%CA%12%95%3A%95V%95~%95%E7%AATUsU%3F%D5y%AA%0BT%ABU%0F%AB%5EV%7D%A6FU%B3P%E3%A9%09%D4%16%AB%D5%A9%1DU%BB%A96%AE%CERwR%8FP%CFQ_%A3%BE_%FD%82%FAc%0D%B2%86%85F%A0%86H%A3Tc%B7%C6%19%8D!%16%C62e%F1XB%D6rV%03%EB%2Ck%98Mb%5B%B2%F9%ECLv%05%FB%1Bv%2F%7BLSCs%AAf%ACf%91f%9D%E6q%CD%01%0E%C6%B1%E0%F09%D9%9CJ%CE!%CE%0D%CE%7B-%03-%3F-%B1%D6j%ADf%AD~%AD7%DAz%DA%BE%DAb%EDr%ED%16%ED%EB%DA%EFup%9D%40%9D%2C%9D%F5%3Am%3A%F7u%09%BA6%BAQ%BA%85%BA%DBu%CF%EA%3E%D3c%EBy%E9%09%F5%CA%F5%0E%E9%DD%D1G%F5m%F4%A3%F5%17%EA%EF%D6%EF%D1%1F704%086%90%19l18c%F0%CC%90c%E8k%98i%B8%D1%F0%84%E1%A8%11%CBh%BA%91%C4h%A3%D1I%A3'%B8%26%EE%87g%E35x%17%3Ef%ACo%1Cb%AC4%DEe%DCk%3Cabi2%DB%A4%C4%A4%C5%E4%BE)%CD%94k%9Af%BA%D1%B4%D3t%CC%CC%C8%2C%DC%AC%D8%AC%C9%EC%8E9%D5%9Ck%9Ea%BE%D9%BC%DB%FC%8D%85%A5E%9C%C5J%8B6%8B%C7%96%DA%96%7C%CB%05%96M%96%F7%AC%98V%3EVyV%F5V%D7%ACI%D6%5C%EB%2C%EBm%D6WlP%1BW%9B%0C%9B%3A%9B%CB%B6%A8%AD%9B%AD%C4v%9Bm%DF%14%E2%14%8F)%D2)%F5Sn%DA1%EC%FC%EC%0A%EC%9A%EC%06%ED9%F6a%F6%25%F6m%F6%CF%1D%CC%1C%12%1D%D6%3Bt%3B%7Crtu%CCvlp%BC%EB%A4%E14%C3%A9%C4%A9%C3%E9Wg%1Bg%A1s%9D%F35%17%A6K%90%CB%12%97v%97%17Sm%A7%8A%A7n%9Fz%CB%95%E5%1A%EE%BA%D2%B5%D3%F5%A3%9B%BB%9B%DC%AD%D9m%D4%DD%CC%3D%C5%7D%AB%FBM.%9B%1B%C9%5D%C3%3D%EFA%F4%F0%F7X%E2q%CC%E3%9D%A7%9B%A7%C2%F3%90%E7%2F%5Ev%5EY%5E%FB%BD%1EO%B3%9C%26%9E%D60m%C8%DB%C4%5B%E0%BD%CB%7B%60%3A%3E%3De%FA%CE%E9%03%3E%C6%3E%02%9Fz%9F%87%BE%A6%BE%22%DF%3D%BE%23~%D6~%99~%07%FC%9E%FB%3B%FA%CB%FD%8F%F8%BF%E1y%F2%16%F1N%05%60%01%C1%01%E5%01%BD%81%1A%81%B3%03k%03%1F%04%99%04%A5%075%05%8D%05%BB%06%2F%0C%3E%15B%0C%09%0DY%1Fr%93o%C0%17%F2%1B%F9c3%DCg%2C%9A%D1%15%CA%08%9D%15Z%1B%FA0%CC%26L%1E%D6%11%8E%86%CF%08%DF%10~o%A6%F9L%E9%CC%B6%08%88%E0Gl%88%B8%1Fi%19%99%17%F9%7D%14)*2%AA.%EAQ%B4Stqt%F7%2C%D6%AC%E4Y%FBg%BD%8E%F1%8F%A9%8C%B9%3B%DBj%B6rvg%ACjlRlc%EC%9B%B8%80%B8%AA%B8%81x%87%F8E%F1%97%12t%13%24%09%ED%89%E4%C4%D8%C4%3D%89%E3s%02%E7l%9A3%9C%E4%9AT%96tc%AE%E5%DC%A2%B9%17%E6%E9%CE%CB%9Ew%3CY5Y%90%7C8%85%98%12%97%B2%3F%E5%83%20BP%2F%18O%E5%A7nM%1D%13%F2%84%9B%85OE%BE%A2%8D%A2Q%B1%B7%B8J%3C%92%E6%9DV%95%F68%DD%3B%7DC%FAh%86OFu%C63%09OR%2By%91%19%92%B9%23%F3MVD%D6%DE%AC%CF%D9q%D9-9%94%9C%94%9C%A3R%0Di%96%B4%2B%D70%B7(%B7Of%2B%2B%93%0D%E4y%E6m%CA%1B%93%87%CA%F7%E4%23%F9s%F3%DB%15l%85L%D1%A3%B4R%AEP%0E%16L%2F%A8%2Bx%5B%18%5Bx%B8H%BDHZ%D43%DFf%FE%EA%F9%23%0B%82%16%7C%BD%90%B0P%B8%B0%B3%D8%B8xY%F1%E0%22%BFE%BB%16%23%8BS%17w.1%5DR%BAdxi%F0%D2%7D%CBh%CB%B2%96%FDP%E2XRU%F2jy%DC%F2%8ER%83%D2%A5%A5C%2B%82W4%95%A9%94%C9%CBn%AE%F4Z%B9c%15a%95dU%EFj%97%D5%5BV%7F*%17%95_%ACp%AC%A8%AE%F8%B0F%B8%E6%E2WN_%D5%7C%F5ym%DA%DA%DEJ%B7%CA%ED%EBH%EB%A4%EBn%AC%F7Y%BF%AFJ%BDjA%D5%D0%86%F0%0D%AD%1B%F1%8D%E5%1B_mJ%DEt%A1zj%F5%8E%CD%B4%CD%CA%CD%035a5%ED%5B%CC%B6%AC%DB%F2%A16%A3%F6z%9D%7F%5D%CBV%FD%AD%AB%B7%BE%D9%26%DA%D6%BF%DDw%7B%F3%0E%83%1D%15%3B%DE%EF%94%EC%BC%B5%2BxWk%BDE%7D%F5n%D2%EE%82%DD%8F%1Ab%1B%BA%BF%E6~%DD%B8GwO%C5%9E%8F%7B%A5%7B%07%F6E%EF%EBjtol%DC%AF%BF%BF%B2%09mR6%8D%1EH%3Ap%E5%9B%80o%DA%9B%ED%9Aw%B5pZ*%0E%C2A%E5%C1'%DF%A6%7C%7B%E3P%E8%A1%CE%C3%DC%C3%CD%DF%99%7F%B7%F5%08%EBHy%2B%D2%3A%BFu%AC-%A3m%A0%3D%A1%BD%EF%E8%8C%A3%9D%1D%5E%1DG%BE%B7%FF~%EF1%E3cu%C75%8FW%9E%A0%9D(%3D%F1%F9%E4%82%93%E3%A7d%A7%9E%9DN%3F%3D%D4%99%DCy%F7L%FC%99k%5DQ%5D%BDgC%CF%9E%3F%17t%EEL%B7_%F7%C9%F3%DE%E7%8F%5D%F0%BCp%F4%22%F7b%DB%25%B7K%AD%3D%AE%3DG~p%FD%E1H%AF%5Bo%EBe%F7%CB%EDW%3C%AEt%F4M%EB%3B%D1%EF%D3%7F%FAj%C0%D5s%D7%F8%D7.%5D%9Fy%BD%EF%C6%EC%1B%B7n%26%DD%1C%B8%25%BA%F5%F8v%F6%ED%17w%0A%EEL%DC%5Dz%8Fx%AF%FC%BE%DA%FD%EA%07%FA%0F%EA%7F%B4%FE%B1e%C0m%E0%F8%60%C0%60%CF%C3Y%0F%EF%0E%09%87%9E%FE%94%FF%D3%87%E1%D2G%CCG%D5%23F%23%8D%8F%9D%1F%1F%1B%0D%1A%BD%F2d%CE%93%E1%A7%B2%A7%13%CF%CA~V%FFy%EBs%AB%E7%DF%FD%E2%FBK%CFX%FC%D8%F0%0B%F9%8B%CF%BF%AEy%A9%F3r%EF%AB%A9%AF%3A%C7%23%C7%1F%BC%CEy%3D%F1%A6%FC%AD%CE%DB%7D%EF%B8%EF%BA%DF%C7%BD%1F%99(%FC%40%FEP%F3%D1%FAc%C7%A7%D0O%F7%3E%E7%7C%FE%FC%2F%F7%84%F3%FB%25%D2%9F3%00%00%00%04gAMA%00%00%B1%8E%7C%FBQ%93%00%00%00%20cHRM%00%00z%25%00%00%80%83%00%00%F9%FF%00%00%80%E9%00%00u0%00%00%EA%60%00%00%3A%98%00%00%17o%92_%C5F%00%00%07uIDATx%DA%8C%96ip%95%D5%19%C7%7F%E7%BC%E7%7D%EF%92%7B%93%5C%12.%5B%12%92%C0eIX%83%95%16QP%3BmU%06%EB%D0%05%DB%EA%E8X%24%A00Lg%A4%1D%EDt%C1e%A6%E3t%18u%04%94%FA%A1v%84q%D4%8AB%8BE%05%B5%08%16%83%06%02%06%BC!%2CA%B3%90%95%BB%BC%F7%DEw9%FD%90%ABCgh%A7g%CE%87%F3%E9%FC%7F%CF%F3%FC%9F%F3%1C%F1%C7G%1E%C3%93%92%CA%A1a%26%0F%F41R%F0)%CB%E5%18%AC%88%11%EB%1F%C0%1DN%E1%97G8%7B%CD%02%86%95A%FC%C8%A7%8C%D5%9A%CB%01I%26%3E%BEfj%7F_E%E7%98q%0B3%85%ACl%F8%F2K%A7%F2%86E%E3g%3F%BC%F1%BA%0F%0F%1E%E4%95-%DB%9E%BA%BF%A3oo%F4%C2%17%F4%97%86%98%E8AWS%23%137%3FNmu5%80T%FC%1F%CB%93%82%90%E7%1B%97C%D6%B3%0C%0E~%3A%CE%B6%1BkF%06%AF%8F%A4%3Fj0%ED%8C%D5%98%B6%91%DA%A5%80M%B4!%81%25%04m%A7%DA%A9%7C%F9%B5%EFVUV%BF%3B%E2%8B%1D%08%B1WK%D9-%04%0C%0C%0C~%05%10%FE%9F%00ZH%3C%A5P%A9%CC%D2EC%03%EB%0F%25%E6%DE%1E%3E%B4O6%60%91C%E3%01%20%D1%08%3C%40%00%81%F9%F3%00ho%3D%CER%9DG%5D%BAps%08us%3C%DD%9FRec7%8BP%E8%89%D3%C9%8E%7C%D04illH%CB%AB%0B%0B%3C%D3D9%CE%8D%93%3A%3B%F77%BE%FF%D6%81%E9%0B%E7%DFQ%5EW%2B%D3%80%87%81%83B%A3%D0%18h%24%1A%10%040%1B%1A%00%E8%3F%D9N-P%C0%40%E3%13%C8%DBQ%A3%AF%F37%E5-G%92%11%C7Y%FA%E9%89%93%B4%B4%B4p%05%80%1E%DD%86%81%10rrM%EB%F1%DDS%DE%3F%B0%3F~%B1%FD%C6%C0%8CF%B8%EBg%84%AC%00%83(DQN%A3%D18%80%0B%B8%C8%F88%D4%D4zz%B2Y%9C3g%88%03%3Ey%C2%C2%00%04.%26%B1%F6%D6%EA%A9%5B%9F%DFm%9A%E6%B7%DBN%9E%E4%3F2%E0%2B%03%95%2F%2C%9F%F2%C1%07%87%EB%8E%1EZf%E4m%5C%20%FC%C0Z%10%82XY)v%20%04h4y%B4%E1AE%25%22ZJ%10%17U_%0F%E5%E5%24%3F%3FM%B4%AF%97%BA%C7%FF%40x%EF%5Bl%AD%AF%C6%A6%80D%E0%12%24v%F0%FD%C8%F8%CF%DA%B7%C7%26N*%FD%1A%C0%B5%2C%A2%7D%FD%AB%E7%EE%7B%EB%0Dk%A4w%82%87%89%C6A%25%1A%08%DF%7D%17%00%D1h%94%5C0%88O%1Es%E6l%C6%BE%FB.%93%FA%BA%18%D3y%8A%5D%93jaJ%DDh%FD%3Fna%FA%F2e%F0%F0F%B6uw%B1%EF%CC)%22X%00%08%24%02%9F%D2%23Gk5%F2N5%1A%B9%22%D2%D7%BF%A6%EA%BD%FD%5Bd!%87%8F%85%40%E3%E1S%BE%FEA2%D10%C7%3F%3CD%ED%ACF2%96E%01%83%CA%E7%B7%C0%E2o%F1%F8%93O%12%08%04x%B3%E7%22%3F%5E%B8%00%80%C1%81A~%B0i%13%5D%3D%3D%BC%F0%AB%87%F93%0A%85%20W%2C%1D%80%95%1A%22%97%B5%13J%99%26%A5C%C3%D7~s%CF%9B%9B%8D%82%8DW%24%D5%E41%EB%A7Q%B2z%15%7F%DB%F76'%8F%1D%E7%9A%EB%16%91%8B%96P%C8%8DA%CD%9EI%9Fmst%DB6%1E%E8%ECd%01%92%F0%9C9%F8%C0%ED%CB%973c%E6L%BE%7F%E7J~%D2%D7%CB%2C%C2%8C%A0%8B%19%D0%08%A0PV%81%B4dF%9A%97S%F1%C6C%87%1E%8D%0C%F7%06%3C%CCQ3%02%1A%9F%C8%83k%C0T%BC%B8u%1B5%E9%14%01%40UV%E0%A4.%E1%1Cm%25%1E%0A%F1%C2%DF%F7%92%98%5C%C7%FC%60%08%7FJ%3D%1A%981s%06%03%B6M%F8h%2B%AB%90%A4%AE%88%1C%C0G%92j%9A%8B%D4%B2%20%E3%17%BAVL8%D1%F6%1D%17%F3%0A%3B%E60%EA%13D%D66s%AC%A3%83%AE%DD%7B%B8%B5%7C%CC%A8W%22%11r%C0%D0%BD%F7%E3%9EN%12%9B%3E%8D%FEg%9E%A151%0DU5%89c%AD%AD%FCu%D7.*B!%96%2C%BB%8D%11%FC%A2%F8(%84%20G%261%83%CB%F3%E6%D8%96%EF%BE.%13%AD%AD%8B-%3B%8B%C6%B8%82%D0%A7%A4%B9%19%02A%E2%D1(%3B%DA%8EQ%BA~%1D%00f%E5%182%80%7B!%C9%40%F3%EAQs%CE%9E%C5%FE%A5%8B%018%DE%D6%C6G%DB%B6%030%FD%CE%95%9C%20%40%A0%08!%F0%D0%CA%E2%C2%FD%F7%A1KJ%5E%B4%A4%F8LUtt%A0%11%C5%DE%06%C8c%D6N!%F2%F3%7B%01%08G%22t%A7S8%3D%DD%24%AA%AA()%2B%C5%FF%E1O%89%1A%02%BFn%D4%F5%9D%C9%24%81%9A%9A%D1%0E%E8HR%BD%EF%1F8%ED%A7%11%E3%E2%1C%9EZ%CB%92%8E%0E%24%06%82%02gW%ADg%A4i%DE9%99%CA%3E%E2%08%81%ECn%9C%E5%20%F8%BAJ%3E%3E%E15%AB%91%B1%18%3B_%7D%85%EBk%26%F3%DB%A9%09%92%2F%ED%00%202~%02%F9%FB%EE%26%BA%F3%2F%94%3D%B1%89%F6%F3%E7xh%E3C%98%DD%3D%3C%B5%7D%3B%EF%BC%FC*Mh%3EXr%13%CF%CD%9E%CF%C4%B3%17%F1%8B7%9Fm%5EG%FF%8F%EE%E8%95%A9%EC%8A%5C%DE%19%C8%E5%0B(%7B%7C%FC%25%F7%7C%E4%16%2B%3D%1C%F7%F0%08%D6%25(m%5E%8D%06%9E%7D%FA%19~98%C0%0A%60%E4%F2e%0E%9E%3BK%DB%85%F3X%3Bvr%B8%A9%89d*M%F2%C8%BF%B8gp%90%9BZOp%18%97%A7Q%D4%11%C2%B8%D4%C7%B3%08%0C%1C%86b%E38%B7a%1DC%8B%17%F5%04%ED%FC-yt%AB%10%02!%40%BCw%DB%0A%C6%5C%1Ah%1E%FB%F1%87%5B%D1%0EC%EB6%90%BC%E7.%0E%EC%D9%C3G%BF%7F%8C%D7%7D%03%03A%97e%B1%D3%B5%99%E0%7B%7C%0FM%10%9F%0C%10%C3%A2%04%85%03%98h%5C%C0A%23%C9%E1%0B%93%FE%9Bn%E6%8B%FB%EE%26%3F.%FE2%C3%A9%0D%A1%60%A8'%E7%14%C8%17%BCQ%80%DD%F7%ACB%9A%26%B5%5D_l%89%BF%F3%F6%9A%93%BE%CBn%DF%A1%06%CDbBLB%E0%16GN%B88%FD%B2h%7C%40%16%BD%ED%17%3D%24p%90%B8%B82%C4%F05%D7%D2%BB%F2%0ER%F3f%7Fb%14%DCG)%E4w%B9%8EG(%18%E2J%00%25%7C%1F%23%9F'%D54g%ED%F9%85%DFH'%5E%7B%E3%17%BF%3B%D1jh%1C%F2%E4(%A0%10H%7C%04%E9%E2%FB%20%8A%B2%A3g%0F%03%F0%09%90%A9%AEe%F8%BA%85%0C.%B9%01%7BJ%DDi%A1%D9%A4%B2%F6%0E%F4%E8%84%BD%DAR%08%01Zc%D89.54n%CCo%FA%F5%9F%CEv%9CY%1B%FF%E4%93%C5%A1S%A7%17%04%BA%7BQ%23%23%08%D7%01%CF%07)%F0%95%89%1B%8A%E0U%C6%C8UU%91%999%8Dl%C3%8CL%A6%AE%B6%C3%0DGv%F9%D9%EC%3FU.%FF%1EZ%7B%18%92%AF4%AE%0E%F0%F5%1F%00T%A1%00%DA%FF%7Chl%E5%86%A1e%CB%CD%C2%ADr%AEJ%A7%A7%9BNfe%08%BF%DE2%84%83a%E0%5B%16%85pD%14%0C%CBM%B9%EE%5E%2B%18%3C%E0f%B3I3%95%BE%E8%8F%8C%F8h%08%87%C3(%A5%90%D2%40k%8D%FF%DF%002cc%00%A4%0D%03y%AE%83%9C%EB%82%96d*j%1COx-%862ZT0%F8%AA%17%0C%06%C3%96%D2%D2%10%F8%86%C2%D3%1A7%97%D7%3A%9B%CD8%E9%ACo%DB9!M%81'%3Ca%E7lmH%83%40%20%400%18%A4%AC%AC%1C%A5%8C%AB%02%FC%7B%00%C6%A8Hy%E0%22%E4%00%00%00%00%00IEND%AEB%60%82");
	}
	
// Add "Save to del.icio.us" link to each article
	var allLists, itemNavList, deliciousLink, deliciousLinkText;
	allLists = top[1].document.getElementsByTagName("ul");
	for (var i = 0; i < allLists.length; i++) {
		if (allLists[i].className=="item_nav") {
			itemNavList = document.createElement("li");	
			deliciousLink = document.createElement("a");
			deliciousLinkText = document.createTextNode("Save to del.icio.us");
			deliciousLink.appendChild(deliciousLinkText);
			deliciousLink.setAttribute("href", "http://del.icio.us/post");
			deliciousLink.setAttribute("onclick", getTitleLink(allLists[i]));
			itemNavList.appendChild(deliciousLink);				
			allLists[i].appendChild(itemNavList);				
		}
	}
	
	// Generate del.icio.us link
	function getTitleLink(node) {
		var headers, allLinks, deliciousUrl;
		headers = node.parentNode.parentNode.getElementsByTagName('h3');
		for (var j = 0; j < headers.length; j++) {		
			allLinks = headers[j].getElementsByTagName("a");
			for (var i = 0; i < allLinks.length; i++) {
				if (allLinks[i].className=="bl_itemtitle") {
					deliciousUrl = "window.open('http://del.icio.us/post?v=4&noui&jump=close";
					deliciousUrl += "&url=" + encodeURIComponent(allLinks[i].getAttribute("href"));
					deliciousUrl += "&title=" + encodeURIComponent(allLinks[i].text);
					deliciousUrl += "','delicious'," + "'toolbar=no,width=700,height=400'); return false;";
					break;
				}
			}
		} 			
		return(deliciousUrl);
	}
