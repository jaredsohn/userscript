// ==UserScript==
// @name           Google Reader
// @namespace      google
// @include        http://www.google.fr/reader/*
// @include        http://www.google.*/reader/*
// @include       https://www.google.*/reader/*
// ==/UserScript==
var styleText='';

/* BACKGROUNDS AND COLORS
-------------------------------------------------------------------------------------------------------- */
	/* grey background and color */
	styleText+='.selectors-footer, .lhn-section-footer, #recent-activity .recent, #chrome.search-stream #entries.search .entry, #sections-header, #home, body, #viewer-header , #sub-tree-header, #viewer-container , #entries .entry, #entries.list .entry-container, .card-common, .lhn-section, .scroll-tree .lhn-section-primary, .scroll-tree li, #overview-selector, #lhn-selectors .selector, .lhn-section-secondary li a , #entries.list .entry .collapsed, .lhn-section-secondary li.folder.tree-selected a.tree-link-selected, #viewer-header-container, #lhn-add-subscription-section, #entries , .card, #current-entry .card, #entries.list .read .collapsed, #entries.list .entry, .entry-main, .entry-container, #entries.list .entry .entry-container, #entries.list .entry .collapsed  {background:grey !important;color:#999 !important;border-color:grey}';
	
	/* Lighter background and color */
	styleText+='.jfk-button-action, #entries.list #current-entry .collapsed, .goog-menu, .goog-menuseparator {background:#222;color:#888;border-color:#222}';
	
	/* light background and color */
	styleText+=' .goog-flat-menu-button , .goog-button-base, .goog-button-base, .jfk-button-standard, .goog-button-base-inner-box , .selector:hover, #lnh-selectors .selector:hover, .scroll-tree li a:hover, #lhn-add-subscription, .goog-menuitem-highlight, a:hover .tree-item-action-container {background-image: -moz-linear-gradient(center top , #333333, #222222);background-image: -webkit-linear-gradient(top, rgb(51,51,51) 17%, rgb(34,34,34) 59%);background-image: -ms-linear-gradient(top, rgb(51,51,51) 17%, rgb(34,34,34) 59%);background-image: -o-linear-gradient(center top , #333333, #222222);color: #999999 !important;border-color:#222}';
	
	/* selected menu item */
	styleText+='.lhn-section-secondary li a.tree-link-selected, #overview-selector.selected, #lhn-selectors .selector.selected {border-color:#888888}';

	/*red message */
	styleText+='#no-entries-msg {background: none repeat scroll 0 0 #220000;border: 2px solid #440000;}';
	
	/* interuption */
	styleText+='.interruption {background: none repeat scroll 0 0 #333333 !important;border: 1px solid #444444 !important;}';
	
	/* folder icon */
	styleText+='  .scroll-tree .folder-icon {background: none repeat scroll 0 0 #888888;margin-right: 8px;}';
	styleText+='.folder .folder .folder-toggle {height: 8px; margin-left: 33px;top: 6px; width: 8px;}';
		styleText+=".collapsed.folder > .folder-toggle {background:#222222}";
		styleText+=".expanded.folder > .folder-toggle {background:#888888}";
	/* buttons */
	styleText+='  .goog-button-base-outer-box {border:none}'
	+'  .goog-button-base-inner-box {margin: -1px;}';
	
	/* button background highlighted */
	styleText +='.jfk-button-standard.jfk-button-clear-outline,  .jfk-button-action.jfk-button-hover,  .jfk-button-standard.jfk-button-checked, .jfk-button-standard.jfk-button-clear-outline.jfk-button-checked, .goog-flat-menu-button.goog-flat-menu-button-hover, .jfk-button-standard.jfk-button-hover, .jfk-button-standard.jfk-button-clear-outline.jfk-button-hover, .goog-button-base:hover .goog-button-base-outer-box, .goog-button-base:hover .goog-button-base-inner-box {background-color: #EEEEEE; background-image: -o-linear-gradient(center top , #444444, #555555);background-image: -webkit-linear-gradient(top, #555555 17%, #444444 59%);background-image: -ms-linear-gradient(top, #555555 17%, #444444 59%);background-image: -moz-linear-gradient(center top , #444444, #555555); border-color:#666; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) inset; color: #999;}';

	/* actions */
	styleText +='.card-common .card-actions {background:none !important;border:none !important}'
	styleText +='.entry .entry-actions, #entries.list #current-entry.expanded .entry-actions, .entry-actions, .card-actions {display:block; background: none repeat scroll 0 0 #111;border-color: #222; border-width: 1px;padding: 2px 0;border-style:solid;}';
	styleText +='#current-entry .user-tags-list li a, .entry .entry-actions .read-state-unread, .entry .entry-actions .read-state-not-kept-unread,.entry .link unselectable, .entry-tagging-action-title,  .entry .entry-actions .email , .entry .entry-actions a, .entry .entry-actions .link  {color:#555 !important; background:none}'
/* SPECIFIC TEXTS
-------------------------------------------------------------------------------------------------------- */
	/* average darker text color */
	styleText+='#entries.list .collapsed .entry-secondary  {color:#555 !important}';
	
	/* average lighter text color */
	styleText+='.entry .search-result .entry-date,  #recent-activity .recent-stream-title,  #entries.list .read .collapsed .entry-secondary .entry-title, .scroll-tree li a .name, .goog-menuitem, .goog-tristatemenuitem, .goog-filterobsmenuitem   {color:#777 !important}';
	
	/* medium Lighter text color */
	styleText+=' a, a:visited, .link,  #chrome-title a , #nav a, #nav a .text, #nav .link, .entry-title , .entry-container .entry-title a, .entry-container .entry-body a, .goog-option-selected .goog-menuitem-content, .goog-option-selected .goog-menuitem-content, .goog-menuitem-highlight .goog-menuitem-content, .goog-menuitem-hover .goog-menuitem-content {color: #BBB !important;}';
	
	/* Light text color */
	styleText+=' .goog-button-base:hover .goog-button-base-outer-box  .goog-button-body, .goog-button-base:hover .goog-button-base-inner-box  .goog-button-body, #entries.list .collapsed .entry-secondary .entry-title , .sub.unread  .name-text , .folder .folder .name-text.folder-name-text {color:#AAA !important}';
	
	/* white text color */
	styleText+='.scroll-tree li a.tree-link-selected .name, .scroll-tree li a.tree-link-selected:hover .name, .tree-selected .tree-link-selected .name-text.folder-name-text , #lhn-selectors .selected a span, #lhn-selectors .selected a:hover span, #nav .selected a, #nav .selected a .text{color:#EEE !important}'
	
	/* editText */
	styleText+='  #current-entry.read .entry-container .entry-body , #current-entry .entry-container .entry-title a, #current-entry .entry-container a.entry-source-title, #current-entry .entry-container .entry-body a, #current-entry .entry-container a.entry-post-author-name, .read .entry-container .entry-body {color:#888;line-height: 160%;}';
        /* unread count (change if needed) */
	styleText+=' .unread-count {color: #AAAAAA !important;}';

/* LAYOUT
-------------------------------------------------------------------------------------------------------- */
	/* hide unwanted elements */
	styleText+='#tips, #logo-container,   iframe,  #logo-section {display:none}';
	styleText+='#top-bar {height: 40px;border-color: #222222;}';
	styleText+='#search {padding: 5px 0;}';
	styleText+="#search-input {background:grey;border-color:#222}";
	styleText+="#search-input:focus {background:#222;border-color:#333;color:white}";
	/* Resize useless big space elements */
	styleText+='   #lhn-add-subscription-section, #viewer-header {height:40px !important}';

/* Write down the style
-------------------------------------------------------------------------------------------------------- */

var head = document.getElementsByTagName('head')[0],
    style = document.createElement('style'),
    rules = document.createTextNode(styleText);

style.type = 'text/css';
if(style.styleSheet)  style.styleSheet.cssText = rules.nodeValue;
else style.appendChild(rules);
head.appendChild(style);