// ==UserScript==
// @name        Remove Facebook Wall Ads and Suggested Posts
// @namespace   https://userscripts.org/users/3102
// @description Remove sponsored stories from your news feed
// @include     http://www.facebook.com/*
// @include     http://apps.facebook.com/*
// @include     https://www.facebook.com/*
// @include     https://www.facebook.com
// @include     http://www.facebook.com
// @include     http://facebook.com/*
// @include     https://facebook.com/*
// @grant       GM_addStyle
// @grant       unsafeWindow
// @version     0.4
// ==/UserScript==

// --------------------------------------------------------------------
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Remove Facebook Wall Ads and Suggested Posts", and click Uninstall.
//
// --------------------------------------------------------------------
//
    GM_addStyle('.ego_section { display: none}');
    GM_addStyle('.rightColumnWrapper { display: none}');
    GM_addStyle('.removeSuggestedItemsHidden { height:5px;overflow:hidden;cursor:pointer; }');
    GM_addStyle('.removeSuggestedItemsNoticed { background-color:#ffffff; }');
//
    if(unsafeWindow.top) {
        unsafeWindow.addEventListener("DOMSubtreeModified", setHomeStreamListener, false);
    }
//    
    function setHomeStreamListener(){
    	var homeStream = this.wrappedJSObject.document.getElementById('contentArea');
    	if(homeStream) {
            if(homeStream && homeStream.wrappedJSObject) homeStream=homeStream.wrappedJSObject;
            if (homeStream && !(homeStream.getAttribute("dom_event"))) {
                homeStream.setAttribute("dom_event", "1");
                homeStream.addEventListener("DOMSubtreeModified", homeStreamUpdated, false); 
            }
        }
    }
//
    function homeStreamUpdated() {
    	var homeStream = document.getElementById('contentArea').wrappedJSObject;
    	var children=homeStream.children;
        if(children&&children.length) {
            for (var i = 0, len = children.length; i < len; i++) {
                var nextLI = children[i];
                if (!(nextLI.getAttribute("fb_checked"))) {
                    var inHtml = nextLI.innerHTML;
                    if (inHtml.indexOf('Suggested Post') > 0 ||
                        inHtml.indexOf('>Upcoming Events<') > 0 ||
                        inHtml.indexOf('>RELATED POST<') > 0
                        ) 
                    {
                      nextLI.innerHTML = '';
                    } else nextLI.setAttribute("fb_checked", "1");
                }
            }
        }
    }
//