// ==UserScript==
// @name            Google Reader Maximize Plus
// @namespace       http://fxthunder.com
// @description     Maximize Google Reader
// @updateURL       https://userscripts.org/scripts/source/125931.meta.js
// @downloadURL     https://userscripts.org/scripts/source/125931.user.js
// @version         3.1
// @icon            https://www.google.com/reader/ui/352024653-app-icon-32.png
// @icon64          https://www.google.com/reader/ui/3068170011-app-icon-64.png
// @author          agunchan
// @include         http://www.google.com/reader/*
// @include         https://www.google.com/reader/*
// ==/UserScript==

var style = 
"#gb {height: 0px;z-index: -100;}"+
	"#gbx1, #gbx2, #gbx3, #gbx4 {background-color:transparent !important;border-bottom:none !important;z-index: -100 !important;}"+
	"#gbd4 {right: 0px !important;top: 2px;}"+
	"#gbg5 {position: absolute;right: 0px;}"+
	"#gbg4 {position: absolute;right: 25px;top: -48px;}"+
		".gbzt, .gbgt {background-color: #CCC;}"+
		".gbzt-hvr, .gbzt:focus, .gbgt-hvr, .gbgt:focus {background-color: #4C4C4C;}"+
   
"#top-bar {border-bottom: 0px ;height: 0px;}"+
	"#logo-section,#gbq1,#logo,#gbz,#gbi4t,#gbgs1,#gbg3 {display: none !important;}"+
	"#search{padding: 0;position: absolute;top: 2px;left: -265px;z-index: 100;border-bottom: 1px solid #EBEBEB;padding-bottom: 1px;padding-left: 3%;min-width: 0px;}"+
		"#search .search-restrict {margin: 0 12px;width: 100px;}"+
		"#search-input{width: 200px}" +
		"#gbqf {position: absolute; top: -28px; left: -180px; width: 350px}" + 
"#lhn-add-subscription-section {border-bottom: 1px solid #EBEBEB;margin-top: 20px;}"+
	"#sections-header,#lhn-add-subscription-section,#viewer-header{height: 32px;overflow:visible;}"+

"#overview-selector.selected,#lhn-selectors .selector.selected,.lhn-section-primary.tree-link-selected,.lhn-section-secondary li a.tree-link-selected {background-color: #E0E0E0;}"+
 	".scroll-tree li a:hover {background-color: #EEE;}"+
".ie8 #scrollable-sections, .webkit #scrollable-sections {overflow-y: auto;}"+
    
".lhn-menu #nav {left: 490px;}"+
	"#viewer-top-controls-container {margin-top: -20px;}"+
		"#viewer-top-controls {padding: 6px 0px 3px 5px;float: right;min-width: 750px;border-left: 1px solid #EBEBEB;top: 10px;}"+
			"#chrome-view-links {float: none;}"+
			"#item-up-down-buttons {display: none;}"+
			"#settings-button-container {position: absolute;right: 0px;}"+
		"#entries-status {position: absolute;top: 8px;left: 80%;font-size: 150%;font-weight: bold;}"+

"#viewer-container {border-left: 1px solid #EBEBEB;}"+
	"#activity-indicator {top: 40px;right:10px;}"+
	"#title-and-status-holder {background-color: white;}"+
	"#chrome-title, #chrome-title a {font-size: 18px;color:#d14836;}"+
	".entry-body {max-width: none !important;}" + 
	"#entries {padding-right: 0px;}";
    
GM_addStyle(style);