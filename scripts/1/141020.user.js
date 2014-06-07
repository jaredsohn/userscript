// ==UserScript==
// @name        Wiktionary Cross-Referencer
// @namespace   http://userscripts.org/scripts/show/141020
// @description Adds an icon to the Merriam-Webster dictionary following the word being defined on Wiktionary (English).
// @include     http://en.wiktionary.org/wiki/*
// @version     1.2.0
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

// define the variables
var wikthead, wiktword, merricon, merrpath, dicticon, dictpath, oxfdicon, oxfdpath;
wikthead = document.getElementById('firstHeading');
wiktword = wikthead.textContent;
merricon = 'http://www.merriam-webster.com/favicon.ico';
merrpath = 'http://www.merriam-webster.com/dictionary/';
dicticon = 'http://dictionary.reference.com/favicon.ico';
dictpath = 'http://dictionary.reference.com/browse/';
oxfdicon = 'http://oxforddictionaries.com/favicon.ico';
oxfdpath = 'http://oxforddictionaries.com/definition/english/';

// append the linkified icon to firstHeading
$("#firstHeading").append(" <a href='" + merrpath + wiktword + "' title='View &quot;" + wiktword + "&quot; at merriam-webster.com'><img src='" + merricon + "'></a> <a href='" + dictpath + wiktword + "' title='View &quot;" + wiktword + "&quot; at dictionary.com'><img src='" + dicticon + "'></a> <a href='" + oxfdpath + wiktword + "' title='View &quot;" + wiktword + "&quot; at oxforddictionaries.com'><img src='" + oxfdicon + "'></a>");



// simply add the following between the double quotes after defining the icon and path for new dictionaries
//  <a href='" + ____path + wiktword + "' title='View &quot;" + wiktword + "&quot; at ____'><img src='" + ____icon + "'></a>
