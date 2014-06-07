// ==UserScript==
// @name        LiveJournal: Clickable comment button
// @include   http://*.livejournal.com/*
// @namespace http://fiddlingfrog.livejournal.com
// @description Adds a working submit comment button to entries in the new default commenting system.
// @version     1
// ==/UserScript==


(function() {
  // are we on the new comment scheme?
  if (document.getElementsByClassName("b-watering")) {
    // yes, we are.
    var submitbutton = document.getElementById("postform").getElementsByClassName("b-watering-submit").item(0);
    var commentbutton = document.createElement("div");
    commentbutton.innerHTML = "<div class=\"b-ljbutton b-ljbutton-submit\"><button type=\"submit\" name=\"submitpost\" tabindex=\"80\">Click to comment</button></div>";
    commentbutton.style.cssFloat = "left";
    commentbutton.style.marginRight = "1em";
    submitbutton.parentNode.insertBefore(commentbutton, submitbutton);
  }
})();