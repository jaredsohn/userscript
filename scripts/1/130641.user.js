// ==UserScript==
// @name           Google Reader Style by Sisco
// @description    Some tweaks to the new Google Reader design! 
// @version        1.0
// @include        http://www.google.*/reader/view/*
// @include        https://www.google.*/reader/view/*
// ==/UserScript==

function GM_addStyle(css) {
	var parent = document.getElementsByTagName("head")[0];
	if (!parent) {
		parent = document.documentElement;
	}
	var style = document.createElement("style");
	style.type = "text/css";
	var textNode = document.createTextNode(css);
	style.appendChild(textNode);
	parent.appendChild(style);
}

GM_addStyle(" \
#main {font-family: Calibri  !important;} \
div.item-body {background-color: transparent; color: rgb(0, 0, 0); font-family: Calibri; font-size: 15px; line-height: 25px;} \
.entry-title {font-size: 19px !important; font-weight: bold !important; line-height: 25px;} \
.entry-title, .entry-title-link {color: #2244bb !important;} \
div#main div#nav, #lhn-add-subscription-section, #viewer-header {height: 50px !important;} \
div#home div#sections-header {height: 50px !important;} \
#current-entry .card { border-color: transparent !important; box-shadow: 0 0 5px #498AF3 !important;} \
.lhn-section-secondary li a.tree-link-selected {background: #EBEFF9 !important; font-weight: bold !important;} \
.unread-count{font-family: Calibri !important; font-size: 12px !important; color: gray !important; text-shadow: 0px 0px 0.5px silver;} \
.sharebox.link {display: none !important;} \
#entries{padding-left: 8px !important; padding-right: 8px !important;} \
#entries.cards .entry {margin: 8px 0 !important;} \
#title-and-status-holder {display: none;} \
.item-plusone {display: none !important;} \
.card-actions {background: white  !important;} \
#logo-link  {font-size: 175% !important; text-shadow: 0px 1px 1px black; color: Silver !important;} \
.name-text.sub-name-text {background-color: transparent; font-size: 100%;} \
.entry-date { text-shadow: 1px 1px 2px black; font-weight: bold !important; color: white !important;} \
.name-text.sub-name-text {font-weight: bold !important;} \
.name-text.folder-name-text {background-color: transparent; font-size: 100%; font-weight: bold !important;} \
#sub-tree-header {background-color: transparent; font-size: 125%; font-weight: bold !important;} \
span.text{ background-color: transparent; font-size: 100%; font-weight: bold !important;} \
#reading-list-unread-count {background-color: transparent; font-size: 115%; font-weight: bold !important;} \
.entry-title-go-to {display: none !important;} \
#viewer-container {border-left:1px solid #EBEBEB} \
.scroll-tree .icon.folder-icon {background: url(http://i.imgur.com/GKbqj.png) no-repeat !important; opacity:1 !important;} \
.sub-icon {background: url(http://i.imgur.com/6Fsu0.png?1) no-repeat !important; opacity:1 !important;} \
");



