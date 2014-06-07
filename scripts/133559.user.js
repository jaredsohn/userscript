// ==UserScript==
// @name        Flickr: Date Hack
// @namespace   Jason Tank/Druidic
// @description Shows the date/time of the photo.
// @version     1.5.1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @match       *://*.flickr.com/photos/*
// ==/UserScript==

// Summary: Date and time info is fetched in the background and the printed on the photo page.
// If the info is not available (because of the photographer's preferences), the old info will remain.

// Based (somewhat) on http://userscripts.org/scripts/show/89507

// v1.0   - Initial script.
// v1.1   - Extra documentation.
//        - Changed fading (buggy under Chrome when tab not in focus) to a color change.
//        - Remove "(edit)" from date info on pages you control.
//        - Strip whitespace.
// v1.2   - Change from jQuery 1.6.2 to 1.7.2.
//        - Changed back to opacity fading, as it seems to be fixed in 1.7.2.
// v1.3   - Added a check for jQuery, so we don't have to load a second instance if it's already installed.
//        - Added support for secure (https) pages.
//        - @namespace added.
// v1.4   - Now also updates the tooltip showing when the photo was uploaded, too.
//           (Note that it's currently impossible to determine an exact time a photo was replaced.)
//        - @require added.
// v1.5   - Bumped up to jQuery 1.8.2
//        - Condensed @match lines down into one @match.
// v1.5.1 - Fixed issue with secure pages.

// a function that loads jQuery and calls a callback function when jQuery has finished loading
//    (This is necessary for Chromium, which doesn't support @require)
function addJQuery(mainScript) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js");
  script.setAttribute('type', 'text/javascript');
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + mainScript.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function flickrDateHackMain() {

  if($("div#main div#primary-column div#meta").length <= 0) {
    return;   // Not a photo page. No need to run.
  }



  // Split the current page's URL into manageable chunks.
  var Url = window.location + '';
  var mm = Url.split('/');
  var domain = mm[2];
  var user = mm[4];
  var photo = mm[5];

  // Find the "meta" page.
  url = '//' + domain + '/photos/' + user + '/' + photo + '/meta/';

  // Hold onto the original date HTML block in a variable.
  var DATE = $("#photo-story-story a.ywa-track:first");
  
  // Store the original info, in case we need it.
  var hold = DATE.text();
  
  // "Fade out" the old info, just to indicate the fetch is in progress.
  DATE.fadeTo(100, 0.3);

  // Use .load() to replace the info with the time/date info from the meta page.
                    // Only grab the meta info we need.
  DATE.load(url + " div.photo-data table", function(response, status, xhr) {
      if (status == "error" || !$(this).text()) {
        $(this).text(hold);                 // Error? No info? Replace with the old, saved info.
      } else {
        var taken = $(this).find("tr:first td:first").text();          // Get photo-taken info (text only)
        var posted = $(this).find("tr:nth-child(2) td:first").text();    // Get photo-posted info (text only)
        mm = taken.replace("(edit)", "");                              // Delete "(edit)" link
        taken = $.trim(mm);                                            // Delete leading and trailing whitespace (jQuery method)
        $(this).html(taken);                                           // Put the info on the page (HTML stripped out)
        mm = posted.replace("(edit)", "");                               // Delete "(edit)" link
        posted = $.trim(mm);                                             // Delete leading and trailing whitespace (jQuery method)
        var oldTitle = $(this).prop("title");
        var repPos = oldTitle.indexOf(". Replaced");                     // Check for a replacement time, save that info.
        var newTitle = "";
        if(repPos != -1) {
          newTitle = posted + oldTitle.substr(repPos);
        } else {
          newTitle = posted + ".";
        }
        $(this).prop("title", "Uploaded " + newTitle);                   // Put the info in the tooltip
      }
      // Unfade the info (whether it's new or not).
      $(this).fadeTo(100, 1.0);
  });


// In case of script breakage, check out a photo page and its meta page to see if the info moved.
//
// The current Flickr date info is stored in (jQuery ref)
//                          #photo-story-story a.ywa-track:first
// The current Flickr date/time meta info is stored in (jQuery ref)
//                          div.photo-data table tr:first td:first          <- Photo Taken
//                          div.photo-data table tr:nth-child(2) td:first   <- Photo Posted


}

// load jQuery and execute the main function
if(typeof jQuery == 'undefined') {
  addJQuery(flickrDateHackMain);
} else {
  flickrDateHackMain();
}
