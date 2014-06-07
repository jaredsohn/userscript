// ==UserScript==
// @name           twitter-cyclops
// @namespace      mahemoff.com
// @description    Unfollow anyone who's twitter homepage you open. Yes, it's lethal - use it to quickly zap people from a list of links you open.
// @include        *twitter.com*
// ==/UserScript==

// This script is useful in conjunction with services like 
// http://www.tweepler.com/friends and http://friendorfollow .
// Use those services to locate people you want to unfollow, shift-click to 
// open up their page, and they are automatically unfollowed. 
// JUST REMEMBER TO KEEP IT DISABLED UNLESS YOU'RE ACTIVELY CULLING.

// http://joanpiedra.com/jquery/greasemonkey/ compressed
var GM_JQ=document.createElement('script');GM_JQ.src='http://jquery.com/src/jquery-latest.js';GM_JQ.type='text/javascript';document.getElementsByTagName('head')[0].appendChild(GM_JQ);function GM_wait(){if(typeof unsafeWindow.jQuery=='undefined'){window.setTimeout(GM_wait,100)}else{$=unsafeWindow.jQuery;run()}}GM_wait();

function run() {
  setTimeout(function() {
    $.post("http://twitter.com/friendships/destroy/"
          +$("meta[name=page-user-screen_name]").attr("content"),
          {authenticity_token: $("input[name=authenticity_token]").val(),
           twttr: true
          },
          function(data,status) { 
              var message = (status="success") ? "Unfollowed :)":"Error: Still following :(";
              $("<div>"+message+"</div>")
              .css({fontWeight: "bold", padding: "3px", margin: "3px", background: "#fff2d9" })
              .insertAfter($(".profile-controls"));
            $(".is-relationship").fadeOut();
          }
          );
  }, 1000);
}
