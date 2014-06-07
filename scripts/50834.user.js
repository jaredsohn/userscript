// ==UserScript==
// @name           CopyStoryId
// @namespace      http://userscripts.org
// @include        http://www.pivotaltracker.com/projects/*
// ==/UserScript==
var $ = unsafeWindow.jQuery;
var jQuery = $;

// All your GM code must be inside this function
function letsJQuery() {
  jQuery(document).ready(function() {
    $(".storyItem").live("click", function() {
      var story = $(this);
      if(story.find("embed").length == 0) {
        var storyId = story.attr("id").replace("current_itemList_story", "").replace("_content", "");
        var clippy = $('<embed height="14" width="110" wmode="opaque" bgcolor="#F0F0F0" flashvars="text=' + storyId + '" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" allowscriptaccess="always" quality="high" name="clippy" src="http://github.com/flash/clippy.swf"/>');
        console.debug("#current_itemList_story" + storyId + "_content_buttons");
        $("#current_itemList_story" + storyId + "_content_buttons").prepend(clippy); 
      }
      return false;
    });
  });

}

if(!$) {
  // Add jQuery
  var GM_JQ = document.createElement('script');
  GM_JQ.src = 'http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js';
  GM_JQ.type = 'text/javascript';
  var head = document.getElementsByTagName('head')[0];
  head.appendChild(GM_JQ);
//  document.write("<script src='http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js' type='text/javascript'></script>");
//  head.innerHTML += "<script src='http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js' type='text/javascript'></script>";
  
  // Check if jQuery's loaded
  function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = jQuery = unsafeWindow.jQuery; letsJQuery(); }
  }
  GM_wait();
} else {
  letsJQuery();
}