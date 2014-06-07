// ==UserScript==
// @name          readerForUpdownArrows
// @author        charseer
// @description   for daisy
// @match         http://www.google.com/reader/*
// @match         https://www.google.com/reader/*
// @version       1.10
// ==/UserScript==



var readerForD= {
	init: function() {
				  var ele, loc = window.location.href;
				  if (loc.match("reader")) {

						  var updownSpan=document.getElementById("item-up-down-buttons");

						 // var nav=document.getElementById("lhn-recommendations");
						 // nav.appendChild(updownSpan);
                                                  updownSpan.style.zIndex=4;
						  updownSpan.style.position="fixed";
						  updownSpan.style.top="90%";
                                                   
                                                   updownSpan.style.left="250px";

				  }
		  }
};
if (document.body) {
	setTimeout(function() {
		readerForD.init();
	}, 3000);
} else {
	window.addEventListener("load", function() {
		readerForD.init();
	}, false);
}
var overrideCSS = " \
#top-bar { height:45px !important; } \
#search { padding:8px 0 !important; } \
#scrollable-sections {max-width:230px !important;}\
.link lhn-section-primary tree-link-selected {padding-bottom:6px !important;}\
#viewer-header { height:45px !important; } \
#lhn-add-subscription-section { height:45px !important; } \
#lhn-add-subscription, #viewer-top-controls-container \
{ margin-top:-15px !important; } \
#entries { padding:0 !important; margin-left:-33px !important; } \
#title-and-status-holder {margin-left:-33px !important;}\
#title-and-status-holder { padding:0.3ex 0 0 0.5em !important; } \
#entries.list .entry .collapsed {padding: 3px 0 5px !important; line-height: 2.8ex !important;}\
.entry-icons { top:0 !important } \
.entry-source-title { top:2px !important } \
.entry-secondary { top:2px !important } \
.entry-main .entry-original { top:4px !important } \
.section-minimize { left: 0px !important } \
#overview-selector, #lhn-selectors .selector, .folder .name.name-d-0, \
#sub-tree-header \
{ padding-left: 15px !important; } \
.folder .folder .folder-toggle { margin-left:13px !important } \
.folder .sub-icon, .folder .folder>a>.icon { margin-left:27px !important } \
.folder .folder>ul .icon { margin-left:34px !important } \
.folder .folder .name-text { max-width:160px; !important } \
#reading-list-selector .label { display:inline !important } \
";
GM_addStyle(overrideCSS);
