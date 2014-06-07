// ==UserScript==
// @name        Improved Reddit Tabmenu
// @namespace   improvedreddittabmenu
// @description A script that makes sure that tabs like 'new' and 'top' are in the tabmenu on all subreddit pages, like the comment section, and reducing the amount of clicks needed to navigate a subreddit. License: Mozilla Public License v2.0.
// @include     /^https?://(www\.)?reddit\.com/.*$/
// @version     2
// @grant       none
// ==/UserScript==

// Copyright (C) 2013 Mattias Ugelvik <uglemat@gmail.com>
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */


var tabs = ['new', 'rising', 'top', 'wiki'];
/* Just change the list above to change which tabs are
 * created, if you don't care about 'rising', just remove
 * it from the list and it will disappear. If you'd like
 * 'hot' or 'controversial', put them in the list. 
 * 'saved' also seems to work, but that's actually a little
 * bit surprising, because the link this script generates
 * is kind of incorrect (or I thought so), but reddit does 
 * the right thing with it.
 *
 * These are all the tabs which are supposed to work:
 *    hot, new, rising, controversial, top, saved, wiki
 */


var compact = window.location.pathname.match(/\.compact$/);
// I added some support for the compact version of reddit,
// albeit limited, because tabs like 'wiki' doesn't seem
// to work on the compact site. Trying to fix that is just
// too much of a hack, better to keep things elegant.


var maketab = function (tabname, subreddit) {
    var baseurl = '//reddit.com/r/'+subreddit+'/',
        link = document.createElement('a'),
        li = document.createElement('li');
    
    link.href = baseurl + tabname + (compact ? '/.compact' : '/');
    link.textContent = tabname;
    
    li.appendChild(link);
    return li;
};

var subredditlink = document.querySelector('.redditname a'),
    subreddit     = subredditlink && subredditlink.textContent;

if (subreddit) {
    var tabmenu = document.querySelector('ul.tabmenu'),
        tabnames = [].map.call(tabmenu ? tabmenu.children : [], function (tab) { return tab.textContent; });

    if (!tabmenu) {
        tabmenu = document.createElement('ul');
        tabmenu.className = 'tabmenu';

        var tabmenu_container = compact ?
                document.querySelector('#topbar .subtoolbar') :
                document.querySelector('#header #header-bottom-left');

        tabmenu_container.appendChild(tabmenu);
    }

    tabs.reverse();
    tabs.forEach(function (tabname) {
        if (tabnames.indexOf(tabname) === -1) {
            tabmenu.insertBefore(maketab(tabname, subreddit), tabmenu.firstChild);
        }
    });
}
