// ==UserScript==
// @name          Better Amazon Wishlist Spoilers
// @namespace     http://stj.me
// @description   Prevents Amazon Wishlist Spoilers
// @include       http://www.amazon.com/gp/registry/wishlist/*
// @version       1.0
// @author        St. John Johnson <st.john.johnson@gmail.com>
// ==/UserScript==

(function() {
  var fields, w = unsafeWindow,
      nodes = w.document.getElementsByClassName('notesInlineAlert');
  // No Notes, No Hiding
  if (nodes.length == 0) {
    return;
  }

  // Validate is right message
  if (nodes[0].innerHTML.match(/not revealing your Quantity Received/) === null) {
    return;
  }

  // Find all fields to hide
  fields = ['notesInlineAlert','purchasedField','purchasedQuantityDisplay'];
  for (var j = 0; j < fields.length; j++) {
    nodes = w.document.getElementsByClassName(fields[j]);
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].style.display = 'none'; // This may be overridden
      nodes[i].style.visibility = 'hidden'; // Make it invisible
      nodes[i].style.position = 'absolute'; // Don't let it block anything
    }
  }

  console.log('This Wishlist is Spoiler Free!');
})();
