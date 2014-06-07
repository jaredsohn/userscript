// ==UserScript==
// @name twitter Search v2
// @namespace http://z3c.info/
// @description Adds a search field to the Twitter interface
// @include http://twitter.com/home
// ==/UserScript==
 
// Twitter Search script
// version 0.3
// 2009-01-31
// Copyright (c) 2008, Dash Labs
// Author David Stone - http://twitter.com/builtbydave
// Author Josh Russell - http://twitter.com/joshr
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// Last modification by Damir Zekic:
// - Rewritten the script to use jQuery
// - Added class 'last' to the main div (to display top border)
// - Increased the size of search box by shrinking the "Search" (now "Go")
// button
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
// To uninstall, go to Tools/Manage User Scripts,
// select "Twitter Search", and click Uninstall.
//
// --------------------------------------------------------------------
//
 
$ = unsafeWindow.jQuery;
 
$('div.section.last').eq(0)
  .before(
    $('<div/>')
      .addClass('section')
      .addClass('last')
      .append(
        $('<div/>')
          .addClass('section-header')
          .append(
            $('<a/>')
              .attr('href', 'http://search.twitter.com/advanced')
              .addClass('section-links')
              .text('advanced'))
          .append(
            $('<h1/>')
              .text('Search')))
      .append(
        $('<form/>')
          .attr('action', 'http://search.twitter.com/search')
          .attr('id', 'searchForm')
          .attr('method', 'get')
          .attr('name', 'searchForm')
          .append(
            $('<div/>')
              .attr('id', 'searchEntry')
              .append(
                $('<input/>')
                  .attr('id', 'searchBox')
                  .attr('name', 'q')
                  .attr('autosave', 'com.twitter.search')
                  .attr('size', 14)
                  .attr('placeholder', 'Enter your query')
                  .attr('results', 10)
                  .attr('type', 'search'))
              .append(
                $('<input/>')
                  .attr('type', 'submit')
                  .attr('value', 'Go')
                  .css('margin', '0 0 0 13px')
                  .css('vertical-align', 'middle')))));
 