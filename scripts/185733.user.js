// ==UserScript==
// @name       Tender Public/Private
// @match      *://help.tenderapp.com/*
// @match      *://help.lighthouseapp.com/*
// ==/UserScript==

(function($) {

  var elem = $("#private-or-public");
  if (elem.length == 1) { 

    var checkPrivacy = function() {
      if (elem.hasClass("public")) {
        $("body").css("background", "red");
      } else {
        $("body").css("background", "green");
      }
    }

    // Monitor changes
    elem.bind("DOMSubtreeModified", checkPrivacy);

    // Run it
    checkPrivacy();
  }

})(jQuery);
