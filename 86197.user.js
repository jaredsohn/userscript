// ==UserScript==
// @name          Google Reader Absolutely Compact
// @namespace     http://userstyles.org
// @description	  Maximizes the area for displaying articles by removing all the stuff that you probably never use anyway.  Be ready to learn your keyboard shortcuts though because this is a really stripped down interface.
// @author        DJBullwinkle
// @homepage      http://userstyles.org/styles/12691
// @include       http://www.google.com/reader*
// @include       https://www.google.com/reader*
// @include       http://google.com/reader*
// @include       https://google.com/reader*
// ==/UserScript==
(function() {
var css = "#entries .entry-body, .entry .entry-title {     max-width: none !important; }    #logo-container, #gbar, #global-info, .gbh, #lhn-add-subscription-section, #chrome-view-links {     display: none !important; }  #main, #settings-frame, #settings {     top:0 !important;     margin: 0 !important; }   #loading-area, #message-area-outer {     width: auto !important;     left: auto !important;     right: 0 !important;     top: 26px !important; }   #search {     left: auto !important;     right: 10px !important;     top: 1px !important;     width: 210px !important;     height:23px !important;     \\overflow: hidden !important; } #search:hover {     \\width: 403px !important;     \\height:323px !important;     \\overflow: visible !important; } #search-restrict-button .goog-menu {     left: auto !important;     right: 0 !important; } #chrome.search-stream #viewer-search-parent {     text-align: left !important; }    \\#lhn-selectors { \\    display: none !important; }    \\#your-items-tree-container, \\#lhn-friends, \\.entry-likers, \\.like, \\.broadcast, \\.broadcast-with-note { \\    display: none !important; }    \\ #lhn-recommendations { \\    display: none !important; }    a:hover .tree-item-action-container, .menu-open .tree-item-action-container { \\    display: none !important; }    #viewer-footer {     display: none !important; }    #nav, #nav * {     max-width: 230px !important; } #nav {     width: 230px !important; } #chrome {     margin-left: 230px !important; } .lhn-hidden #chrome {     margin-left: 0px !important; }    \\.scroll-tree .icon { \\    display: none !important; } .scroll-tree .expanded .toggle {     background-position: 3px -58px !important; } .scroll-tree .collapsed .toggle {     background-position: -20px -58px !important; } #lhn-subscriptions .scroll-tree li a {     padding-left: 10px !important; } #lhn-subscriptions #sub-tree ul ul li a {     padding-left: 10px !important; } #lhn-subscriptions .scroll-tree .toggle {     width: 16px !important; }    .entry .entry-title .entry-title-go-to, #entries.list .collapsed .entry-main .entry-original, #chrome-title .chevron {     display: none !important; }  #entries.list .collapsed .entry-secondary {     margin-right: 0 !important;     margin-right: 7em !important; }  #entries .collapsed .entry-date {     margin: 0 2px 0 0 !important; }    .card-common .card-actions, #entries.list .entry .entry-actions { \\    height: 0 !important; }  #entries.list #current-entry.expanded {     border-bottom-width: 2px !important; }    #chrome-lhn-toggle {  \\   display: none !important; }    #viewer-top-controls, #chrome-header {     padding: 2px 0 2px 5px !important; }  #viewer-footer {     padding: 2px 0 2px 0 !important; } #entries-status {     top: auto !important; }  \\.entry .entry-title { \\    font-size: 100% !important; } \\.entry .entry-title .entry-title-link { \\    text-decoration: underline !important; }   #entries .entry {     padding: 10 !important;     margin: 0 !important; } #entries .card-content {     padding: 2px !important; } #entries #current-entry .card-content {     padding: 1px !important; } #entries .card-common {     padding: 0 !important;     margin: 0 !important;     }  #entries.list .collapsed {     padding: 0 !important;      } \\#entries.list .collapsed .entry-icons, #entries.list .collapsed .entry-main .entry-original {     top: 1px !important; } #entries.list .collapsed .entry-secondary {     top: 0px !important; } #entries.list .collapsed .entry-source-title {     top: 0px !important; } \\#entries.list .collapsed .entry-title { \\    text-decoration: none !important; }  #entries.list #current-entry.expanded .entry-container .entry-title, #entries.list #current-entry.expanded .entry-secondary-snippet {     display: none !important; }     .entry .card, .card .card-bottom {     -moz-border-radius: 0 !important; }";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();
