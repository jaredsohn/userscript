// ==UserScript==
// @name           Google Reader - Open entry in background
// @namespace      at.mooware.google-reader
// @include        https://*.google.com/reader/view/*
// @include        http://*.google.com/reader/view/*
// @include        htt*://*.google.*/reader/view*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==

var background_key = 66; // the 'b'-key

jQuery.noConflict();

(function() {
  var orig_button = jQuery('#entries-down:first');
  var new_button = orig_button.clone();
  
  // init new button
  new_button.attr('id', 'open-in-background')
            .find('.goog-button-body')
            .text('Open in background');

  // insert new button
  orig_button.after(new_button);
  
  // create function
  var open_entry = function() {
    var cur = jQuery('#current-entry');
    if (cur.length) {
      GM_openInTab(cur.find('a.entry-title-link').attr('href'));
    }
  };

  // bind click-handler
  new_button.click(open_entry);

  // bind key-handler
  jQuery(document).keydown(function(e) {
    if ( ! (e.altKey || e.ctrlKey || e.metaKey) && e.which == background_key ) {
      open_entry();
    }
  });

})();
