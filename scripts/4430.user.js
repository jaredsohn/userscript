// ==UserScript==
// @name           Digg comment box on top
// @namespace      http://pile0nades.wordpress.com/
// @description    Moves the Digg comment box to the top
// @include        http://digg.com/*
// @include        http://*.digg.com/*
// ==/UserScript==

(function() {

  // make sure this is a comment page with comments on it
  if (!document.getElementById("creplyform")) return;
  if(get("//div[@class='comment-tray']").snapshotLength == 0) return;
  

  // get the stuff
  var commentForm = get("//div[@class='comment'][2]").snapshotItem(0);
  var commentTray = get("//div[@class='comment-tray']").snapshotItem(0);
  var addCommentText = document.getElementById("creplyform");
  
  // move the form up to the top
  commentTray.parentNode.insertBefore(commentForm, commentTray);

  // make text smaller and stretch box
  addCommentText.style.fontSize = "1.5em";
  commentForm.style.width = "auto";
  
  // xpath function
  function get(query) {
    return document.evaluate(
      query,
      document,
      null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null
    );
  }

})();