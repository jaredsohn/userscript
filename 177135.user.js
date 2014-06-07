// ==UserScript==
// @name		fire gestures
// @author		Van De Ripper
// ==/UserScript==

//1.https
const URL = window.content.location.href.replace('http://','https://');
const IN_NEW_TAB = false;
const IN_BACKGROUND = false;

if (IN_NEW_TAB)
  gBrowser.loadOneTab(URL, null, null, null, IN_BACKGROUND, false);
else
  gBrowser.loadURI(URL);



//2.baidu in current page
const URL = "http://www.baidu.com/";
const IN_NEW_TAB = false;
const IN_BACKGROUND = false;

if (IN_NEW_TAB)
  gBrowser.loadOneTab(URL, null, null, null, IN_BACKGROUND, false);
else
  gBrowser.loadURI(URL);



//3.google in new page
const URL = "https://www.google.com/";
const IN_NEW_TAB = true;
const IN_BACKGROUND = false;

if (IN_NEW_TAB)
  gBrowser.loadOneTab(URL, null, null, null, IN_BACKGROUND, false);
else
  gBrowser.loadURI(URL);