// ==UserScript==
// @name           Add keyboard shortcut - change title & favicon
// @version        1.0.0
// @namespace      http://www.google.co.jp
// @author         Suiren
// @description    Add keyboard shortcut to ALL web pages. This GM_script can change web page's title and favicon to Bing's one when you keydown 'Shift' + 'T'.
// @include        *
// @require        http://www.openjs.com/scripts/events/keyboard_shortcuts/shortcut.js
// @license        MIT License
//
// !! LICENSE !!
// Released under the Mit license
//  http://www.opensource.org/licenses/mit-license.php
//
//
// !! NOTICE !!
// This GM_script uses "shortcut.js".
// It can add/remove keyboard shortcuts.
// I think it is very very useful and powerful.
// Thank you Binny V A. Thank you for good script.
// http://www.openjs.com/scripts/events/keyboard_shortcuts/
//
// ver 1.0.0 @ 2011-06-03
//  Release !!
//
// ==/UserScript==

var KEY_MAP = 'Shift+T';

// Bing
var TITLE   = 'Bing';
var ICON    = 'http://www.bing.com/s/wlflag.ico';

var modify = function() {

    document.title = TITLE;
    
    var page_links = document.getElementsByTagName("link");
    for (var i = 0; i < page_links.length; i++) {
        if (page_links[i].rel == "shortcut icon" || page_links[i].rel == "icon") {
            page_links[i].parentNode.removeChild(page_links[i]);
        }
    }
    
    var link  = document.createElement('link');
    link.id   = "GM_FAVICON_ICON";
    link.rel  = "icon";
    link.href = ICON;
    
    var shortcut  = document.createElement('link');
    shortcut.id   = "GM_FAVICON_SHORTCUT";
    shortcut.rel  = "shortcut icon";
    shortcut.href = ICON;
    
    document.getElementsByTagName('head')[0].appendChild(link);
    document.getElementsByTagName('head')[0].appendChild(shortcut);
}

shortcut.add(KEY_MAP, function() {
    modify()
},{
    'disable_in_input':true
});