// ==UserScript==
// @name Page Reloader
// @namespace https://www.poddery.com/stream
// @include http*://poddery.com/stream
// @description simple page reloader
// @grant none
// @version 0.8.15
// @license Free 4 all
// @created by an anonymous stranger
// ==/UserScript==

	// main settings
		var timeRange = '900';  // set timerange in seconds, 15mins = 900secs

    // reload
    if (timeRange > 0) 
          setTimeout("location.reload(true);",timeRange*1000);