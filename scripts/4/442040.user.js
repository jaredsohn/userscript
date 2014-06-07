// ==UserScript==
// @name       BugZilla Enhancements
// @namespace  http://chrisalbrecht.me
// @version    0.1
// @description  Make the BugZilla interface easier to use.
// @match      http://bugzilla.wavecloud.com/*
// @require    https://code.jquery.com/jquery-2.1.0.min.js
// @copyright  2012+, You
// ==/UserScript==

(function ($) {
    betterBZ = {
        // Initialize
        init: function() {
            var d = new Date();
                        
            // Load external stylesheet
            $('<link>', {'rel': 'stylesheet', 'type': 'text/css', 'media': 'screen', 'href': 'http://cdn.162unlimited.net/betterBZ/styles.css?' + d.getTime()}).appendTo('head');
        },
        
        // Dock the saved searches to the side of the screen
        searchDock: function() {
          // Put the page elements into a single wrapper
          var wrapper = $('<div id="page-wrapper" />');
          wrapper.prependTo('body');
          
          $('#header').appendTo(wrapper);
          $('#bugzilla-body').appendTo(wrapper);
        }
    };
    
    
  $(document).ready(function() {
	betterBZ.init();
    betterBZ.searchDock();
  });
})(jQuery);