// ==UserScript==
// @name           twitter-follow
// @namespace      mahemoff.com
// @include        http://twitter.com/*
// @description    Updates each user's Twitter homepage (e.g. http://twitter.com/mahemoff to show if they're following you. Appears top right, under their name.
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==

$.fn.attach = function(html) { return this.append(html).children(":last"); };

var me=$("meta[name=session-user-screen_name]").attr("content");
var them=$("meta[name=page-user-screen_name]").attr("content");
if (!me || !them) return;

$("<li id='followsMe' />")
  .append("<span class='label'>Follows Me?</span> ")
  .append("<span class='value'>...</span>")
  .insertAfter($("span.fn").parent());

// timeout gets over GM XHR permission weirdness
if (me==them)
  $("#followsMe .value").html("of&nbsp;course!");
else
  setTimeout(function() { updateRelationship(them,me); }, 0);


function updateRelationship(them,me) {
  GM_xmlhttpRequest({
     method: "GET",
     url: "http://twitter.com/friendships/show.json?source_screen_name="+them+"&target_screen_name="+me,
     onload: function(xhr) {
      var response = eval("(" + xhr.responseText + ")");
      $("#followsMe .value").html(response.relationship.source.following ? "Yes :)" : "No :(");
    }
  });
}