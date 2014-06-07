// ZDNet Blogs Butler
// version 0.1
// 2005-11-29
// Copyright (c) 2005, Michael Jervis
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
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
// select "ZDNet Blogs Butler", and click Uninstall.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           ZDNet Blog Butler
// @namespace      http://fuckingbrit.com/greasemonkey
// @description    A script for ripping uncontent out of the ZDNET blogs
// @include        http://blogs.zdnet.com/*
// ==/UserScript==

(function() {
	var junk = '';
	var junkItem = '';
	var dieNode = '';

	// Seek and destroy the chuff at the end of main:
	junk = document.evaluate(
        "//body//h5[string(.)='Popular white papers, webcasts, and case studies']",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
  if (junk.snapshotLength >= 1)
  {
  	junk = junk.snapshotItem(0);
  	dieNode = junk.nextSibling
  	junk.parentNode.removeChild(junk);
  	dieNode.parentNode.removeChild(dieNode);
  }

  junk = document.evaluate(
        "//body//h5[string(.)='The Bloggers']",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
  if (junk.snapshotLength >= 1)
  {
	  junk = junk.snapshotItem(0);
	  dieNode = junk.nextSibling
	  junk.parentNode.removeChild(junk);
	  dieNode.parentNode.removeChild(dieNode);
	}

 junk = document.evaluate(
        "//body//ul[@id='rubics']",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
  if (junk.snapshotLength >= 1)
  {
  	junkItem = junk.snapshotItem(0);
  	junkItem.parentNode.removeChild(junkItem);
  }

  junk = document.evaluate(
        "//body//h5[contains(string(.),'Recent Entries in ')]",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
  for (i = 0; i < junk.snapshotLength; i++) {
   	junkItem = junk.snapshotItem(i);
	  dieNode = junkItem.nextSibling;
  	junkItem.parentNode.removeChild(junkItem);
   	dieNode.parentNode.removeChild(dieNode);
  }

	junk = document.evaluate(
			"//div[@class = 'blurb']",
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
	for (i = 0; i < junk.snapshotLength; i++) {
        junkItem = junk.snapshotItem(i);
        dieNode = junkItem.previousSibling;
        dieNode.parentNode.removeChild(dieNode);
        junkItem.parentNode.removeChild(junkItem);
  }

  junk = document.evaluate(
			"//div[@class = 'macad']",
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
  for (i = 0; i < junk.snapshotLength; i++) {
      junkItem = junk.snapshotItem(i);
      junkItem.parentNode.removeChild(junkItem);
  }

  junk = document.evaluate(
			"//iframe",
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
    for (i = 0; i < junk.snapshotLength; i++) {
        junkItem = junk.snapshotItem(i);
        junkItem.parentNode.removeChild(junkItem);
    }
    junk = document.evaluate(
			"//img[@alt = 'advertisement']",
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
    for (i = 0; i < junk.snapshotLength; i++) {
        junkItem = junk.snapshotItem(i);
        junkItem.parentNode.removeChild(junkItem);
    }

		    // CSS Hide some other chuff:
    junk = document.getElementById('hs-cont');
	if (junk)
		junk.style.display = 'none';
	junk = document.getElementById('hs-box');
	if (junk)
		junk.style.display = 'none';
	junk = document.getElementById('bwbox');
	if (junk)
		junk.style.display = 'none';
	junk = document.getElementById('bwhead');
	if (junk)
		junk.style.display = 'none';
	junk = document.getElementById('bwlist');
	if (junk)
		junk.style.display = 'none';
	junk = document.getElementById('dirm');
	if (junk)
		junk.style.display = 'none';
	junk = document.getElementById('blog_spbg');
	if (junk)
		junk.style.display = 'none';
	junk = document.getElementById('pctbg');
	if (junk)
		junk.style.display = 'none';
	junk = document.getElementById('pct');
	if (junk)
		junk.style.display = 'none';
})();