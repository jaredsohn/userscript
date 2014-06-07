// W3Schools Butler
// version 0.2
// 2005-10-19
// Copyright (c) 2005, Michael Jervis
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// Based on Julien Couvreur's BoingBoing butler which was
// Inspired by Mark Pilgrim's Butler (via BoingBoing)
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
// select "W3Schools Butler", and click Uninstall.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            W3Schools Butler
// @namespace       http://fuckingbrit.com/greasmonkey
// @description     Remove un-useful sections from W3Schools
// @include         http://www.w3schools.com/*
// @include         http://w3schools.net/*
// ==/UserScript==

(function() {

    var W3SchoolsButler = {

	// add CSS style directives to page
	addGlobalStyle: function(css) {
            style = document.createElement("style");
	        style.type = "text/css";
            style.innerHTML = css;
            document.getElementsByTagName('head')[0].appendChild(style);
        },

	// remove sponsors sidebars
	removeChuff: function() {
			// Get rid of the right pane.
			this.addGlobalStyle('table.right {display: none ! important }');
			this.addGlobalStyle('.maincontent {width: 100% ! important }');

			// Seek and destroy the chuff at the end of main:
			spotlightnodes = document.evaluate(
        "//body//h2[string(.)='Product Spotlight']",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
      spotlightnode = spotlightnodes.snapshotItem(0);
      dieNode = spotlightnodes.snapshotItem(0).nextSibling
      while ((dieNode) && (dieNode != 'undefined'))
      {
      	spotlightnode.parentNode.removeChild(dieNode);
      	dieNode = spotlightnode.nextSibling;
      }
      spotlightnode.parentNode.removeChild(spotlightnode);

      middlenodes = document.evaluate(
      	"//td[@class='content']",
      	document,
      	null,
      	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
      	null);

      // The first of middlenodes should be the top left:
      topLeft = middlenodes.snapshotItem(0);

      // Grab the search box
			searchNodes = document.evaluate(
        "//body//th[string(.)='SITE SEARCH']",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
			searchNode = searchNodes.snapshotItem(0).parentNode.parentNode;
			searchNode.className='content'; // make it reappear.
      topLeft.appendChild(searchNode);

      middlenode = middlenodes.snapshotItem(0).nextSibling.nextSibling;
      if (middlenode)
      {
      	middlenode.className = 'maincontent';
      	// rip right fully out ;-)
      	middlenode.parentNode.removeChild(middlenode.nextSibling.nextSibling);
      }
  }
}


    var href = window.location.href;

    // Google web search
    if (href.match(/^http:\/\/www\.w3schools\.com/i) ||
            href.match(/^http:\/\/w3schools\.com/i))
    {
	    W3SchoolsButler.removeChuff();
    }

})();
