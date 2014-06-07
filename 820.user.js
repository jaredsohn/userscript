
// Reloogle
// version 0.1 ALPHA
// 2005-04-20
// Copyright (c) 2005, Patrice Levesque
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// IF YOU ARE UPGRADING FROM A PREVIOUS VERSION OF RELOOGLE, go to
// Tools/Manage User Scripts and manually uninstall the previous
// version before installing this one.  Sorry, this is a limitation
// of Greasemonkey.
// 
// To uninstall, go to Tools/Manage User Scripts,
// select "Butler", and click Uninstall.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
//
// Adds <link rel="prev" /> and <link rel="next" /> to Google results
// in web search, images, groups, news and froogle.  Numbers results
// in web search.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            Reloogle
// @namespace       http://ptaff.ca/firefox/reloogle/
// @description     Show navigation links on web search, images, groups, news and froogle results; number results in web search.
// @include         http://*.google.*/*
// ==/UserScript==
	
(function() {

    var Reloogle = {

    // show numbered results
    numberResults: function() { /* {{{ */
    var i;
    var result_fragment;
    var all_td = document.getElementsByTagName('td');
    for (i = 0; i < all_td.length; i++) {
        if (all_td[i].align == 'right') {
            result_fragment = all_td[i].firstChild;
            break;
        };
    };
    var pos = result_fragment.childNodes[1].firstChild.nodeValue;
    var links = document.getElementsByTagName('p');
    var el;
    for (i = 0; i < links.length; i++) {
        if (links[i].className == 'g') {
            el = document.createElement('span');
            t = document.createTextNode("[" + pos + "] ");
            el.appendChild(t);
            links[i].insertBefore(el, links[i].firstChild);
            pos++;
        };
    }; /* }}} */
   },

   // next/prev links
   relPrevNext: function() { /* {{{ */
       var all_img = document.getElementsByTagName('img');
       var prev_uri = "";
       var next_uri = "";
       var i;
       for (i = 0; i < all_img.length; i++) {
           if (all_img[i].src.indexOf("/nav_previous.gif") > 0) {
               prev_uri = all_img[i].parentNode.href;
           }
           else if (all_img[i].src.indexOf("/nav_next.gif") > 0) {
               next_uri = all_img[i].parentNode.href;
           };
        };
        var h = document.getElementsByTagName('head')[0];
        if (prev_uri != "") {
            var prev_link = document.createElement('link');
            prev_link.setAttribute('rel', 'prev');
            prev_link.setAttribute('href', prev_uri);
            h.appendChild(prev_link);
        };
        if (next_uri != "") {
            var next_link = document.createElement('link');
            next_link.setAttribute('rel', 'next');
            next_link.setAttribute('href', next_uri);
            h.appendChild(next_link);
        };

    }, /* }}} */
    relHomeUpHelp: function(site) { /* {{{ */
        var home_uri;
        switch (site) {
            case "web":
                home_uri = "http://google.com/";
                break;
            case "images":
                home_uri = "http://images.google.com/";
                break;
            case "groups":
                home_uri = "http://groups.google.com/";
                break;
            case "news":
                home_uri = "http://news.google.com/";
                break;
            case "froogle":
                home_uri = "http://froogle.google.com/";
                break;
        };
        var head = document.getElementsByTagName('head')[0];
        var help = document.createElement('link'); 
        help.setAttribute('rel', 'help');
        help.setAttribute('href', 'http://google.com/help/');
        head.appendChild(help);
        var home = document.createElement('link');
        home.setAttribute('rel', 'Home');
        home.setAttribute('href', home_uri);
        head.appendChild(home);
        var up = document.createElement('link');
        up.setAttribute('rel', 'Up');
        up.setAttribute('href', home_uri);
        head.appendChild(up);
        var top = document.createElement('link');
        top.setAttribute('rel', 'Top');
        top.setAttribute('href', home_uri);
        head.appendChild(top);
        var parent = document.createElement('link');
        parent.setAttribute('rel', 'Parent');
        parent.setAttribute('href', home_uri);
        head.appendChild(parent);
    } /* }}} */
    
    }

    var href = window.location.href;

    // Google web search
    if (href.match(/^http:\/\/www\.google\.[\w\.]+\/search/i)) {
        Reloogle.relHomeUpHelp('web');
        Reloogle.relPrevNext();
        Reloogle.numberResults();
    }

    // Google image search
    if (href.match(/^http:\/\/images\.google\.[\w\.]+\/images/i)) {
        Reloogle.relHomeUpHelp('images');
        Reloogle.relPrevNext();
    }

    // Google Groups
    if ((href.match(/^http:\/\/groups-beta\.google\.com\/groups?/i)) ||
	(href.match(/^http:\/\/groups\.google\.com\/groups?/i))) {
        Reloogle.relHomeUpHelp('groups');
        Reloogle.relPrevNext();
    }

    // Google News
    if (href.match(/^http:\/\/news\.google\.[\w\.]+\/news/i)) {
        Reloogle.relHomeUpHelp('news');
        Reloogle.relPrevNext();
    }

    // Froogle
    if (href.match(/^http:\/\/froogle\.google\.com\/froogle/i)) {
        Reloogle.relHomeUpHelp('froogle');
        Reloogle.relPrevNext();
    }
    

})();

/*
CHANGELOG:
0.1 - 2005-04-20 - initial release
*/

// END FILE
