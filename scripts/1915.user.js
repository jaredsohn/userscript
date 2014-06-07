// --------------------------------------------------------------------
//
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Blogdex Display Title", and click Uninstall.
//
// ==UserScript==
// @name            Netflix Rent Now
// @namespace       http://youkai.org
// @description     Adds buttons to Netflix to put movies at head of queue.
// @include         http://netflix.com/*
// @include         http://www.netflix.com/*
// ==/UserScript==

(function() {

  var rentLinks;
  // Find all the "Add to queue links"
  rentLinks = document.evaluate(
                                "//A[contains(@href,'/AddToQueue?')]",
                                document,
                                null,
                                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                                null);

  for (var i = 0; i < rentLinks.snapshotLength; i++) {

    var elm = rentLinks.snapshotItem(i);

    // Create a similar link that adds the movie to the 
    // front of the queue, by adding the 'add to top' parameter
    // to the URL.

    var rentFirst = document.createElement('a');
    rentFirst.setAttribute('href', elm.getAttribute('href').replace('AddToQueue?', 'AddToQueue?addtotop=Y&'));

    // Add the 'add to top' button image.

    var img = document.createElement('IMG');
    img.src="http://image.netflix.com/NetFlix_Assets/email/buttons/rent_add_top.gif";
    img.border=0;
    rentFirst.appendChild(img);
    rentFirst.appendChild(document.createElement('BR'));

    // Put the new link right before the existing "add to end" link
    elm.parentNode.insertBefore(rentFirst, elm);
  }
})();


