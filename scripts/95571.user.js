// ==UserScript==
// @name           Google Reader tiny (maximum content space)
// @namespace      Haluk ilhan
// @description    minimalistic theme for google reader
// @icon           https://www.google.com/reader/ui/352024653-app-icon-32.png
// @icon64         https://www.google.com/reader/ui/3068170011-app-icon-64.png
// @version        2.6.3
// @updateURL      https://userscripts.org/scripts/source/95571.meta.js
// @downloadURL    https://userscripts.org/scripts/source/95571.user.js
// @include        http://*.google.tld/reader/view/*
// @include        https://*.google.tld/reader/view/*
// @require        http://code.jquery.com/jquery-1.8.3.min.js
// ==/UserScript==

$(document).ready(function(){
     $(window).mousemove(function(e) {
   var now = e.pageX;
   var past =  $(window).width()-2;
   if(now > past) {   $("#nav").css( "display","none" ); $("#chrome").css( "margin-left","0" ); 
  }
});
     $(window).mousemove(function(e) {
   var now = e.pageX;
   if(2 > now) {   $("#nav").css( "display","block" ); $("#chrome").css( "margin-left","230px" ); 
  }
});
});

// Fix the image enclosure not displayed by Google Reader
        (function () {
            //object constructor
            function GoogleReaderFixer() {
                this.fixEnclosures();
            };
            GoogleReaderFixer.prototype.fixEnclosures = function () {
                var nodes, o, img, src;
                nodes = document.evaluate("//a[span[@class='view-enclosure']]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                //alert('count='+nodes.snapshotLength);
                if (nodes) {
                    for (var i = 0; i < nodes.snapshotLength; i++) {
                        o = nodes.snapshotItem(i);
                        div = document.createElement('div');
                        div.className = "item-pict";
                        img = document.createElement('img');
                        div.appendChild(img);
                        img.src = o.href;
                        var p = o.parentNode.parentNode;
                        p.parentNode.replaceChild(div, p);
                    }
                }
            }
            //instantiate and run 
            document.getElementById('entries').addEventListener('DOMNodeInserted', function () {
                new GoogleReaderFixer();
            }, true);
        })();

document.getElementById("top-bar").className += " display-none";
document.getElementById("gb").className += " display-none";
document.getElementById("title-and-status-holder").className += " display-none";
document.getElementById("viewer-header-container").className += " display-none";
document.getElementById("lhn-add-subscription-section").className += " display-none";              
document.getElementById("lhn-recommendations").className += " display-none";
document.getElementById("home-section").className += " display-none";
document.getElementById("logo-section").className += " display-none";
              
//Fix Unread Count to show actual unread instead of 1000+
(function () {
	var isChrome = false;
	var isSafari = false;
	// features switch
	var hasDOMSubtreeModified = false;
	var unreadCountElement = null;
	function init() {
		if (navigator.userAgent.match(/Chrome/)) {
			isChrome = true;
		} else if (navigator.userAgent.match(/Safari/)) {
			isSafari = true;
		}
		hasDOMSubtreeModified = !isChrome && !isSafari;
		if (document.body) waitForReady();
	}
	// Wait for the dom ready
	function waitForReady() {
		if (unreadCountElement = document.getElementById('reading-list-unread-count')) {
			if (hasDOMSubtreeModified) {
				var res = document.evaluate("//span[contains(@class, 'unread-count') and contains(@class, 'sub-unread-count') and not(contains(@class, 'folder-unread-count'))]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
				for (var i = 0; i < res.snapshotLength; i++) {
					res.snapshotItem(i).parentNode.addEventListener('DOMSubtreeModified', modifySubtree, false);
				}
				window.addEventListener("DOMTitleChanged", calcUnread, false);
			} else {
				window.setInterval(calcUnread, 3000);
			}
			calcUnread();
		} else {
			window.setTimeout(waitForReady, 500);
		}
	}
	function modifySubtree() {
		if (unreadCountElement.textContent.match(/\d{4}\+?/)) {
			calcUnread();
		}
	}
	function findItemUnread(checkDuplicated, item) {
		var hasplus = false;
		var count = 0;
		var alreadyCounted = false;
		var countres = item.innerHTML.match(/\((\d*)\+?\)/);
		if (countres) {
			count = parseInt(countres[1], 10);
			if (item.innerHTML.match(/\(1000\+\)/)) {
				hasplus = true;
			}
			var nodeTitle = item.parentNode.getAttribute('title');
			if (nodeTitle) {
				if (checkDuplicated.indexOf(nodeTitle) < 0) {
					checkDuplicated.push(nodeTitle);
				} else {
					alreadyCounted = true;
				}
			}
		}
		return {
			count: count,
			hasplus: hasplus,
			alreadyCounted: alreadyCounted
		};
	}
	function calcUnread() {
		var checkDuplicated = [];
		var total = 0;
		var totalplus = false;
		var res = document.evaluate("//li[contains(@class, 'folder')]//li[contains(@class, 'folder')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; i < res.snapshotLength; i++) {
			var res2 = document.evaluate(".//li[contains(@class, 'unread')]/a/div[contains(@class, 'unread-count')]", res.snapshotItem(i), null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			var subtotal = 0;
			var subtotalplus = false;
			for (var j = 0; j < res2.snapshotLength; j++) {
				var result = findItemUnread(checkDuplicated, res2.snapshotItem(j));
				if (result.hasplus) {
					totalplus = true;
					subtotalplus = true;
				}
				subtotal += result.count;
				if (!result.alreadyCounted) {
					total += result.count;
				}
			}
			if (subtotal > 0) {
				var resfolder = document.evaluate(".//a/div[contains(@class, 'unread-count')]", res.snapshotItem(i), null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				if (resfolder) {
					resfolder.innerHTML = '(' + subtotal + (subtotalplus ? '+' : '') + ')';
				}
			}
		}
		// untagged items
		var res2 = document.evaluate("//ul[@id='sub-tree']/li/ul/li[not(contains(@class, 'folder')) and contains(@class, 'unread')]/a/div[contains(@class, 'unread-count')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var j = 0; j < res2.snapshotLength; j++) {
			var result = findItemUnread(checkDuplicated, res2.snapshotItem(j));
			if (result.hasplus) {
				totalplus = true;
			}
			if (!result.alreadyCounted) {
				total += result.count;
			}
		}
		if (total > 0) {
			var totaltext = total + (totalplus ? '+' : '');
			unreadCountElement.innerHTML = ' (' + totaltext + ')';
			// update windows title as well
			if (totaltext) {
				var newTitle = '(' + totaltext + ') ' + document.title.replace(/\s*\(\d+\+?\)$/, '').replace(/^\(\d+\+?\)\s*/, '');;
				if (document.title != newTitle) {
					document.title = newTitle;
				}
			}
		}
	}
	init();
})();
// Fix the image enclosure not displayed by Google Reader
(function () {
	//object constructor
	function GoogleReaderFixer() {
		this.fixEnclosures();
	};
	GoogleReaderFixer.prototype.fixEnclosures = function () {
		var nodes, o, img, src;
		nodes = document.evaluate("//a[span[@class='view-enclosure']]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		//alert('count='+nodes.snapshotLength);
		if (nodes) {
			for (var i = 0; i < nodes.snapshotLength; i++) {
				o = nodes.snapshotItem(i);
				div = document.createElement('div');
				div.className = "item-pict";
				img = document.createElement('img');
				div.appendChild(img);
				img.src = o.href;
				var p = o.parentNode.parentNode;
				p.parentNode.replaceChild(div, p);
			}
		}
	}
	//instantiate and run 
/*window.addEventListener("load", function() { 
window.setTimeout(function(){ new GoogleReaderFixer(); }, 500);
}, false);*/
	document.getElementById('entries').addEventListener('DOMNodeInserted', function () {
		new GoogleReaderFixer();
	}, true);
})();
              
// Initiate custom CSS function
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
// Custom CSS interface styling
GM_addStyle(" \
.entry-title { max-width: none !important;  } \
.goog-flat-menu-button { height: 27px !important; } \
.entry-secondary-snippet { margin: 1em 0; } \
.entry-title-go-to { margin-left: 6px !important; } \
.search .search-result { padding: 4px; } \
.search-result .entry-main a.entry-original { float: left !important; } \
.jfk-button-primary, .jfk-button-action { background: #3b5998; border-color: #3b5998; } \
#nav { width: 230px; } \
#entries {margin-top: 4px; padding: 0 0px 0 0px; !important } \
.lhn-hidden #entries { padding-right: 0px; padding-left:1px !important; } \
#chrome {margin-left: 230px; } \
#chrome-title { padding-left: 5px; color: black; font-size: 20px; } \
#chrome-title a { color: #0000CC; font-size: 20px; } \
#current-entry .card, .card, .search .search-result { border: 2px solid #3b5998; } \
.card, .card, .search .search-result { border: 1px solid #bbb; } \
#current-entry .entry-title-link { color: #D61123 !important; } \
.read a.entry-title-link { color: #D61123 !important; } \
a.entry-title-link { color: #D61123 !important; } \
a.tree-link-selected .name { color: red !important; } \
.tree-link-selected { border-left: 3px solid red !important; background-color: #eee !important; }\
.entry-body a { color: #D61123 !important; } \
#scrollable-sections { overflow: auto !important; } \
.sub-icon { margin-left: 23px !important; } \
.lhn-section-primary { padding-bottom: 0; !important; line-height: 16px; } \
#lhn-selectors .selector, #overview-selector, #sub-tree-header, #recommendations-tree .name-text { padding-left: 20px !important; } \
.folder .name-text, #reading-list-selector .label { max-width: 160px !important; } \
.display-none { display:none !important; } \
.folder .folder .name-text { max-width: 152px !important; } \
.folder .folder .name-text.folder-name-text { max-width: 170px !important; } \
.folder .folder > ul .icon { padding-right: 1px; margin-left: 25px !important; width: 17px !important; height: 17px !important; } \
.folder .folder > a > .icon { margin-left: 18px !important; margin-top: 4px !important; } \
.folder .folder .folder-toggle { margin-left: 5px !important; margin-top: 4px !important; } \
.expanded .folder-icon { background-position: -47px -15px !important; width: 17px !important; height: 17px !important; } \
.collapsed .folder-icon { background-position: -47px 0 !important; width: 17px !important; height: 17px !important;  } \
.folder-icon { -moz-opacity: 1 !important; filter: alpha(opacity=50) !important; opacity: 1 !important; } \
.read .card, .read .search-result { border: #ccc solid 2px; background: transparent; } \
.card, .search-result { margin-left: 5px; padding-right: 8px; -webkit-border-radius: 6px; -moz-border-radius: 6px; border-radius: 6px; } \
#viewer-header, #lhn-add-subscription-section { height: 40px; } \
#lhn-add-subscription-section { width: 230px; } \
#reading-list-unread-count { margin-top: 1px; line-height: 15px; } \
.section-minimize { top: 0; left: 5px !important  } \
#scrollable-sections-holder { border-right: #EBEBEB solid 0px; } \
#search { padding: 5px 0; } \
#recommendations-tree .lhn-section-primary { height: auto !important; } \
#recommendations-tree .sub-name, #recommendations-tree .lhn-section-secondary .folder-name-text { padding: 0 !important; } \
#top-bar { height: auto !important;} \
.card-common .card-actions { margin-left: -7px; margin-right: -6px; } \
.entry .star { height: 12px; margin-right: -3px; } \
::-webkit-scrollbar { width: 6px; } \
::-webkit-scrollbar-thumb {border-width: 1px 1px 1px 2px;}\
.cards .entry-0 { padding-top: 0px; }  \
#entries.cards .card-content { padding: 3px 0 2px; } \
.card-common .card-actions { font-size: 82%; height: 15px; } \
.entry .card { overflow: visible !important; } \
.lhn-section-secondary li a { border-left: 0px; } \
.scroll-tree li.folder .link, .scroll-tree li.sub { height: 17px; } \
.lhn-section { font-size: 11px; } \
.scroll-tree { font-size: 11px; } \
.entry-date { font-size:88% !important; } \
.entry-title a { color: #D61123 !important; } \
.entry-title { font-size: 116% !important; } \
.entry-author { font-size:88%; float:right !important; } \
.entry .star { height: 10px !important; } \
.entry .entry-icons .star { height: 0px; width:0px !important; } \
#title-and-status-holder {display: none;} \
.card {padding-left: 0.7em;} \
.card, .search-result { margin-left: 0px;} \
.fullscreen #chrome-fullscreen-top-toggle {display: none;} \
.fullscreen .entry-actions {display: block;} \
.entry .entry-actions {padding: 0px 0px;} \
.fullscreen .cards .entry-0 {padding-top: 0px;} \
.cards .entry, .search-result {padding-bottom: 0px;} \
.cards .entry {padding: 0px 0;} \
.cards .entry {padding-right: 2px;} \
.entry .entry-body {padding-top: 0.3em; } \
.entry .entry-container {padding-bottom: 0em;} \
#home-section {padding: 0 0;} \
.entry .entry-body, .entry .entry-title, .entry .entry-likers {max-width: none !important;} \
.previewLink { background: transparent url(/reader/ui/3904077461-entry-action-icons.png) no-repeat !important; background-position: -208px -416px !important; padding: 2px 0px 0px 15px !important; margin-right: 8px !important; white-space: nowrap !important; text-decoration: none !important;} \
.tree-link-selected .unread-count { color: white !important; } \
a.tree-link-selected .name { color: white !important; } \
.tree-link-selected { background-color: #627AAD !important; } \
#viewer-entries-container { padding-bottom: 12px !important; margin-top: -4px;} \
#scrollable-sections { padding-bottom: 12px !important; } \
#entries.cards .entry {margin: 0px 0;} \
.samedir #entries.single-source .collapsed .entry-secondary {margin-left: 1.2em!important;} \
#entries.list .entry .collapsed {height: 23px;} \
#entries.list .collapsed .entry-main .entry-source-title {width: 9em;}\
.samedir #entries.list .collapsed .entry-secondary { margin: 0 9em 0 13em; }\
\ ");



//$('.goog-menuitem').appendTo($('.entry-actions'));
// Google is trying to include the +1 experience into all their services, the reality is that the +1 calls that are made
// by the current Google Reader interface are excessive and degrade user experience, especially speed and smooth scrolling.
// It is disabled by default but if you wish to enable it, you can comment out ' // ' the line below.
GM_addStyle(".item-plusone {display: none !important;}");
// Get rid of white spaces under 'Feed settings...' menu, default enable
GM_addStyle(".goog-menuitem { border: none; padding: 2px 15px 2px 25px !important; }");
// Remove the giant red "G+ Share" button, default enable
GM_addStyle(".sharebox { display: none; }")
    
    
// Call the JQuery library for the post preview and slide out tab (coming soon)
function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js");
	script.addEventListener('load', function () {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}
// Main function to enable collapsable element keypress events
function keypress() {
	jQuery.noConflict();
	jQuery(document).bind('keydown', function (e) {
		// pressing 'w' will open and close the search bar
		if (e.target.nodeName.toLowerCase() != 'input' && e.keyCode == 87) {
			jQuery("#top-bar, #gb, #viewer-header-container, #lhn-add-subscription-section, #lhn-recommendations, #home-section").toggleClass("display-none");
		}
		// pressing 'shift q' will open and close the Google bar
		if (e.target.nodeName.toLowerCase() != 'input' && e.keyCode == 88) {
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
// Custom CSS interface styling
GM_addStyle(" \
.selectors-footer, .lhn-section-footer, #recent-activity .recent, #chrome.search-stream #entries.search .entry, #sections-header, #home, body, #viewer-header , #sub-tree-header, #viewer-container , #entries .entry, #entries.list .entry-container, .card-common, .lhn-section, .scroll-tree .lhn-section-primary, .scroll-tree li, #overview-selector, #lhn-selectors .selector, .lhn-section-secondary li a , #entries.list .entry .collapsed, .lhn-section-secondary li.folder.tree-selected a.tree-link-selected, #viewer-header-container, #lhn-add-subscription-section, #entries , .card, #current-entry .card, #entries.list .read .collapsed, #entries.list .entry, .entry-main, .entry-container, #entries.list .entry .entry-container, #entries.list .entry .collapsed  {background:#111 !important;color:#999 !important; border:black;} \
#current-entry .card, .card, .search .search-result { border: 2px solid #333 !important; } \
.card, .card, .search .search-result { border: 1px solid #bbb; } \
.jfk-button-action, #entries.list #current-entry .collapsed, .goog-menu, .goog-menuseparator {background:#222;color:#888;border-color:#222; } \
.goog-flat-menu-button , .goog-button-base, .goog-button-base, .jfk-button-standard, .goog-button-base-inner-box , .selector:hover, #lnh-selectors .selector:hover, .scroll-tree li a:hover, #lhn-add-subscription, .goog-menuitem-highlight, a:hover .tree-item-action-container {background-image: -moz-linear-gradient(center top , #33entry33, #222222);background-image: -webkit-linear-gradient(top, rgb(51,51,51) 17%, rgb(34,34,34) 59%);background-image: -ms-linear-gradient(top, rgb(51,51,51) 17%, rgb(34,34,34) 59%);background-image: -o-linear-gradient(center top , #333333, #222222);color: #999999 !important;border-color:#222; } \
.lhn-section-secondary li a.tree-link-selected, #overview-selector.selected, #lhn-selectors .selector.selected {border-color:#888888; } \
#no-entries-msg {background: none repeat scroll 0 0 #220000;border: 2px solid #440000; } \
.interruption {background: #333333 !important;border: 1px solid #444444 !important; } \
.scroll-tree .folder-icon {background: none repeat scroll 0 0 #888888;margin-right: 8px; } \
.folder .folder .folder-toggle {height: 8px; margin-left: 8px;top: 6px; width: 8px; } \
.collapsed.folder > .folder-toggle {background:#222222; } \
.expanded.folder > .folder-toggle {background:#888888; } \
.goog-button-base-outer-box {border:none; } \
.goog-button-base-inner-box {margin: -1px; } \
.jfk-button-standard.jfk-button-clear-outline,  .jfk-button-action.jfk-button-hover,  .jfk-button-standard.jfk-button-checked, .jfk-button-standard.jfk-button-clear-outline.jfk-button-checked, .goog-flat-menu-button.goog-flat-menu-button-hover, .jfk-button-standard.jfk-button-hover, .jfk-button-standard.jfk-button-clear-outline.jfk-button-hover, .goog-button-base:hover .goog-button-base-outer-box, .goog-button-base:hover .goog-button-base-inner-box {background-color: #EEEEEE; background-image: -o-linear-gradient(center top , #444444, #555555);background-image: -webkit-linear-gradient(top, #555555 17%, #444444 59%);background-image: -ms-linear-gradient(top, #555555 17%, #444444 59%);background-image: -moz-linear-gradient(center top , #444444, #555555); border-color:#666; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) inset; color: #999; } \
.card-common .card-actions {background:none !important;border:none !important; } \
.entry .entry-actions, #entries.list #current-entry.expanded .entry-actions, .entry-actions, .card-actions {display:block; background: none repeat scroll 0 0 #111;border-color: #222; border-width: 1px;padding: 2px 0;border-style:solid; } \
#current-entry .user-tags-list li a, .entry .entry-actions .read-state-unread, .entry .entry-actions .read-state-not-kept-unread,.entry .link unselectable, .entry-tagging-action-title,  .entry .entry-actions .email , .entry .entry-actions a, .entry .entry-actions .link  {color:#555 !important; } \
#entries.list .collapsed .entry-secondary  {color:#555 !important; } \
.entry .search-result .entry-date,  #recent-activity .recent-stream-title,  #entries.list .read .collapsed .entry-secondary .entry-title, .scroll-tree li a .name, .goog-menuitem, .goog-tristatemenuitem, .goog-filterobsmenuitem   {color:#777 !important; } \
a, a:visited, .link,  #chrome-title a , #nav a, #nav a .text, #nav .link, .entry-title , .entry-container .entry-title a, .entry-container .entry-body a, .goog-option-selected .goog-menuitem-content, .goog-option-selected .goog-menuitem-content, .goog-menuitem-highlight .goog-menuitem-content, .goog-menuitem-hover .goog-menuitem-content {color: #BBB !important; } \
.goog-button-base:hover .goog-button-base-outer-box  .goog-button-body, .goog-button-base:hover .goog-button-base-inner-box  .goog-button-body, #entries.list .collapsed .entry-secondary .entry-title , .sub.unread  .name-text , .folder .folder .name-text.folder-name-text {color:#AAA !important; } \
.scroll-tree li a.tree-link-selected .name, .scroll-tree li a.tree-link-selected:hover .name, .tree-selected .tree-link-selected .name-text.folder-name-text , #lhn-selectors .selected a span, #lhn-selectors .selected a:hover span, #nav .selected a, #nav .selected a .text{color:#EEE !important; } \
#current-entry.read .entry-container .entry-body , #current-entry .entry-container .entry-title a, #current-entry .entry-container a.entry-source-title, #current-entry .entry-container .entry-body a, #current-entry .entry-container a.entry-post-author-name, .read .entry-container .entry-body {color:#888 } \
.unread-count {color: #AAAAAA !important; } \
\ ");

		}
	});
}
addJQuery(keypress);
// Setup and enable previews
function getFirstElementMatchingClassName(root, tag, classN) {
	var elements = root.getElementsByTagName(tag);
	var i = 0;
	while (elements[i] && !elements[i].className.match(classN)) {
		i++;
	}
	return ((!elements[i]) ? null : (elements[i]));
}
function getElementsByClassName(root, tag, classN) {
	var elements = root.getElementsByTagName(tag);
	var results = new Array();
	for (var i = 0; i < elements.length; i++) {
		if (elements[i].className.indexOf(classN) > -1) {
			results.push(elements[i]);
		}
	}
	return (results);
}
function findParentNode(el, tag, classN) {
	el = el.parentNode;
	if (arguments.length == 3) {
		// Find first element's parent node matching tag and className
		while (el.nodeName.toLowerCase() != 'body' && (el.nodeName.toLowerCase() != tag || (el.className != classN && el.className.indexOf(classN + ' ') == -1))) {
			el = el.parentNode;
		}
		return ((el.nodeName.toLowerCase() != 'body') ? el : false);
	} else {
		// Find first element's parent node matching tag
		while (el.nodeName.toLowerCase() != 'body' && el.nodeName.toLowerCase() != tag) {
			el = el.parentNode;
		}
		return ((el.nodeName.toLowerCase() != 'body') ? el : false);
	}
}
function addStyles(css) {
	var head = document.getElementsByTagName('head')[0];
	if (head) {
		var style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}
}
function catchEntryAdded(e) {
	var el = e.target;
	if (el.nodeName == 'DIV' && el.className.indexOf('entry') > -1) {
		if (el.className.indexOf('entry-actions') > -1) {
			// Expanding article in list view
			addPreviewButton(el);
		} else if (getFirstElementMatchingClassName(el, 'div', 'card-bottom')) {
			// Adding article in expanded view
			addPreviewButton(getFirstElementMatchingClassName(el, 'div', 'entry-actions'));
		}
	}
}
function addPreviewButton(el) {
	// Top link
	//var entry = findParentNode(el, 'div', 'entry');
	//var link = getFirstElementMatchingClassName(entry, 'a', 'entry-title-link');
	//link.addEventListener('click', previewMouseClick, false);
	//link.addEventListener('click', function (e) {
	//	if (!e.ctrlKey) {
	//		previewMouseClick(e);
	//	}
	//}, false);
	// Bottom button
	var preview = document.createElement('span');
	preview.className = 'item-preview preview link';
	preview.innerHTML = 'Preview';
	el.appendChild(preview);
	preview.addEventListener('click', previewMouseClick, false);
}
function calcEntryIndex(e) {
	var index = 0;
	while (e.previousSibling) {
		index++;
		e = e.previousSibling;
	}
	return index;
}
function previewMouseClick(e) {
	var el = e.target;
	var entry = findParentNode(el, 'div', 'entry');
	var index = calcEntryIndex(entry);
	preview(entry, index);
	e.preventDefault();
}
function previewShortcut() {
	preview(document.getElementById('current-entry'))
}
function preview(entry) {
	var preview;
	// Update entry with preview mode, need to do it before scrolling, because scrolling will repaint preview button (list view only)
	if (entry.className.indexOf('preview') == -1) {
		entry.className = entry.className + ' preview';
		preview = true;
	} else {
		entry.className = entry.className.replace('preview', '');
		preview = false;
	}
	// Need to scroll before changing entry-body, because scrolling repaints article from scratch (list view only)
	scrollTo(entry);
	var body = getFirstElementMatchingClassName(entry, 'div', 'entry-body');
	var entryBody = getFirstElementMatchingClassName(body, 'div', 'item-body');
	if (preview) {
		// classic mode-> preview mode
		// hide rss item
		entryBody.style.display = 'none';
		// iframe creation/display
		var iframe = getFirstElementMatchingClassName(entry, 'iframe', 'preview');
		if (iframe) {
			// iframe already in document, display it
			iframe.style.display = 'block';
		} else {
			// iframe not in document, create it
			iframe = document.createElement('iframe');
			iframe.setAttribute('width', '100%');
			iframe.setAttribute('height', '500px');
			iframe.setAttribute('src', getFirstElementMatchingClassName(entry, 'a', 'entry-title-link'));
			iframe.className = 'preview';
			body.appendChild(iframe);
		}
		// Scale article container to fullwidth
		body.setAttribute('style', 'max-width: 98%');
	} else {
		// preview mode -> classic mode
		// hide iframe
		var iframe = getFirstElementMatchingClassName(entry, 'iframe', 'preview');
		if (iframe) iframe.style.display = 'none';
		// show rss item
		entryBody.style.display = 'block';
		// Go back to initial width
		body.removeAttribute('style', '');
	}
}
function handleKeypress(e) {
	// Handle a Shift-V keypress
	if (e.target.nodeName.toLowerCase() != 'input' && e.keyCode == 86) {
		previewShortcut();
		e.preventDefault();
	}
}
function getEntryDOMObject(index) {
	// Because of repaint, entry doesn't point to correct DOM object, we need to find entry using index
	var entries = document.getElementById('entries');
	var i = 0;
	entry = entries.firstChild;
	while ((i++) < index) {
		entry = entry.nextSibling;
	}
	return entry;
}
function scrollTo(entry) {
	// Force scrolling to top of article
	try {
		// Navigate through DOM until reaching "entries" item, in order to compute current entry's top coordinate relative to entries' main container
		var top = 0;
		while (entry.id != 'entries') {
			top += entry.offsetTop;
			entry = entry.parentNode;
		}
		document.getElementById('entries').scrollTop = top;
	} catch (err) {}
}
function restyle() {
	// Overwrites Better GReader extension css modifications regarding entry-actions class.
	// Indeed, entry-actions was set to "float : right", thus div was not in document flow.
	// Then, clicking on preview button let entry actions div in place instead of going down automatically when iframe was added.
	// That's why I use here text-align: right. That has the same effect, but keeps div in document flow.
	// restyle() is called after document load, in order to ensure that Better GReader has already added its styles modifications
	var styles = document.getElementsByTagName('head')[0].getElementsByTagName('style');
	var i = 0;
	while (i < styles.length) {
		if (styles[i].innerHTML.indexOf('.entry-actions { float:right !important; }') > -1) {
			styles[i].innerHTML = styles[i].innerHTML.replace('.entry-actions { float:right !important; }', '.entry-actions { text-align: right; !important; }');
		}
		i++;
	}
}
function init() {
	restyle();
	addStyles('span.item-preview { background: url("data:image/gif,GIF89a%10%00%10%00%D5%13%00%D8%D8%D8%FA%FA%FA%CB%CB%CB%C8%C8%C8%D2%D2%D2%BA%BA%BA%C6%C6%C6%A1%A1%A1%9C%9C%9C%BD%BD%BD%C9%C9%C9%AB%AB%AB%F4%F4%F4%BF%BF%BF%FC%FC%FC%DB%DB%DB%AD%AD%AD%FF%FF%FF%CC%CC%CC%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00%13%00%2C%00%00%00%00%10%00%10%00%00%06I%C0%89pH%2C%1A%8F%C8d%F1!i%3A%9F%8F%E1%03B%ADZ%A9%D1%89%04%12%E9z%BF%10%89p%FB-G%C2c%AE%D9%8B%D6%AA%03_%F8Y%EC%8E%C8%E3%F3%F4%9AM\'%7B%1D%0E%60t%00W%85%10%00RO%8A%12YJ%8E%8EA%00%3B") no-repeat; padding-left: 16px; } div.entry.preview span.item-preview { background: url("data:image/gif,GIF89a%10%00%10%00%A2%05%00%D8%D8%D8%DB%DB%DB%AD%AD%AD%CC%CC%CC%FE%9A%20%FF%FF%FF%00%00%00%00%00%00!%F9%04%01%00%00%05%00%2C%00%00%00%00%10%00%10%00%00%03%3BX%BA%DC%FE0%B60%AA%BDa%05%C1%BB%E7Y1%08Di%9E%C2%A0%8C%A6%D7%AA%22Y%CA2%91%AE%B5%3B%C3%EC%7C%EE%B8%D6%CF%C6%AB%0D%89%0A%C0g)%00h.%D0AHB%A5%26%00%00%3B") no-repeat; padding-left: 16px; }');
}
document.body.addEventListener('DOMNodeInserted', catchEntryAdded, false);
document.addEventListener('keydown', handleKeypress, false);
window.addEventListener('load', init, false);


// Regularly purge elements from memory to speed up browsing experience
        var intPurgeTimeout = 5000; // set the timeout in ms to run the check for elements to purge
        function purgeRead() {
            var intPastRead = 5; // how many old elements to keep
            var objCurrent = document.getElementById('current-entry');
            if (objCurrent != undefined) {
                var intPast = 0;
                var objP = objCurrent;
                while (intPast <= intPastRead && objP != undefined) {
                    objP = objP.previousSibling;
                    intPast++;
                }
                while (objP != undefined) {
                    var arrClasses = objP.className.split(' ');
                    var intClasses = arrClasses.length;
                    var boolPurged = false;
                    var boolRead = false;
                    for (var i = 0; i < intClasses; i++) {
                        if (arrClasses[i] == 'read') {
                            boolRead = true;
                        }
                        if (arrClasses[i] == 'purged') {
                            boolPurged = true;
                        }
                    }
                    if (boolRead == true && boolPurged == false) {
                        console.log('Google Reader Skim Purge: Removing item with class of "' + objP.className + '"');
                        objP.className = objP.className + ' purged';
                        //var objRemoves = objP.childNodes;
                        var objRemoves = objP.getElementsByClassName('entry-body');
                        for (var i = objRemoves.length; i > 0; i--) {
                            objRemoves[i - 1].parentNode.style.height = objRemoves[i - 1].parentNode.clientHeight + 'px';
                            objRemoves[i - 1].innerHTML = 'Entry body removed by Google Reader Skim Purge';
                            objRemoves[i - 1].parentNode.removeChild(objRemoves[i - 1]);
                        }
                    }
                    objP = objP.previousSibling;
                }
            }
        }
        console.log('Google Reader Skim Purge: Initilizing purger to ' + intPurgeTimeout + ' millisecond interval.');
        setInterval(purgeRead, intPurgeTimeout);