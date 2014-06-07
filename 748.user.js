// No Middle Man
// version 0.8 BETA!
// 2006-03-20
// Copyright (c) 2006, Albert Bachand
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ----------------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "No Middle Man", and click Uninstall.
//
// ----------------------------------------------------------------------------
//
// ==UserScript==
// @name        No Middle Man
// @namespace   http://fivethreenine.blogspot.com/2006/03/no-middle-man.html
// @description Rewrites URLs to remove redirection scripts
// @include     *
// @exclude     http://del.icio.us/*
// @exclude     http://*bloglines.com/*
// @exclude     http://web.archive.org/*
// @exclude     http://*wists.com/*
// @exclude     http://www.google.*/*
// ==/UserScript==

for (var i=0; i<document.links.length; i++) {
  link = document.links[i];

  temp = link.href.toLowerCase();

  // ignore javascript links and GeoURL
  if (temp.indexOf('javascript:') == 0 ||
      temp.indexOf('geourl.org') != -1) {
    continue;
  }

  // find the start of the (last) real url
  start = Math.max(temp.lastIndexOf('http%3a'),
      temp.lastIndexOf('http%253a'),
      temp.lastIndexOf('http:'));

  if (start <= 0) {
    // special case: handle redirect url without a 'http:' part
    start = link.href.lastIndexOf('www.');
    if (start < 10) {
      start = 0;
    } else {
      link.href = link.href.substring(0, start) +
        'http://' + link.href.substring(start);
    }
  }

  // we are most likely looking at a redirection link
  if (start > 0) {
    url = link.href.substring(start);

    // check whether the real url is a parameter
    qindex = link.href.indexOf('?');
    if (qindex > -1 && qindex < start) {
      // it's a parameter, extract only the url
      end = url.indexOf('&');
      if (end > -1) {
        url = url.substring(0, end);
      }
    }
    // handle Yahoo's chained redirections
    var temp = url;
    url = unescape(url);
    while (temp != url) {
      temp = url;
      url = unescape(url);
    }
    // and we're done
    link.href = url.replace(/&amp;/g, '&');
  }
}

// Changelog:
//  0.1 Initial version
//  0.2 Added unescape
//  0.3 Ignore javascript links (contributed by superchaes at gmail dot com)
//  0.4 Unescape before looking for http: (contributed by www.arantius.com)
//  0.5 Cleanup and integration of some contributed code
//  0.6 Handle chained redirections and those missing the http part
//  0.7 Improved Yahoo support, quick fix for GeoURL
//  0.8 Cleanup and update
