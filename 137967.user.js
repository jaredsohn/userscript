// ==UserScript==
// @name       YouTube full subscription list
// @namespace  dikamilo.net
// @version    0.1
// @description  Displays full subscription list on main page.
// @match          http://www.youtube.com/
// @match          http://www.youtube.com/?*
// @match          https://www.youtube.com/
// @match          https://www.youtube.com/?*
// @include        http://www.youtube.com/
// @include        http://www.youtube.com/?*
// @include        https://www.youtube.com/
// @include        https://www.youtube.com/?*
// @copyright  2012, dikamilo
// ==/UserScript==

(function(){
  if (typeof unsafeWindow.jQuery == 'undefined') {
    var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
      GM_JQ = document.createElement('script');

    GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
    GM_JQ.type = 'text/javascript';
    GM_JQ.async = true;

    GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
  }
  GM_wait();
})();

function GM_wait() {
  if (typeof unsafeWindow.jQuery == 'undefined') {
    window.setTimeout(GM_wait, 100);
  } else {
    $ = unsafeWindow.jQuery.noConflict(true);
    runScript();
  }
}

function runScript() {
  $.get("subscription_manager?feature=foot", function(data) {
    $("div#channel + div > ul > li").each(function(index) {
      $(this).remove();
    });
    
    $(data).find("ul#subscription-manager-list > li").each(function(index) {
      title = $(this).find("span.subscription-title").html();
      link = $(this).find("h3 img").attr("data-thumb");
      id = link.split("/")[4];
      $("div#channel + div > ul").append("<li class=\"guide-item-container \"><a class=\"guide-item\" data-feed-name=\""+ id +"\" data-feed-type=\"user\"><span class=\"thumb\"><span class=\"video-thumb ux-thumb yt-thumb-square-28 \"><span class=\"yt-thumb-clip\"><span class=\"yt-thumb-clip-inner\"><img src=\""+ link +"\" alt=\"Miniatura\" data-thumb=\""+ link +"\" width=\"28\" data-group-key=\"thumb-group-0\"><span class=\"vertical-align\"></span></span></span></span></span><span class=\"display-name\">"+ title +"</span></a></li>");
    });
  });
}