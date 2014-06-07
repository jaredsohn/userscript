// ==UserScript==
// @name          fav.tweets
// @namespace      http://userscripts.org
// @include        http*://twitter.com/*
// @description    Show 2 links: fav.tweets * noReplies
// ==/UserScript==

function GM_wait(){if(typeof unsafeWindow.jQuery=='undefined'){window.setTimeout(GM_wait,100)}else{$=unsafeWindow.jQuery;run()}}GM_wait();

function run() {

  $.fn.attach = function(html) { return this.append(html).children(":last"); };
  var them=$("meta[name=page-user-screen_name]").attr("content");

  $("<li id='noreplies' />")
    .append("<a class='reply' href='http://search.twitter.com/search?q=%40"+them+"'>replies</a> | <a href='http://www.sixteenseven.com/noreplies/"+them+"' target='_blank'>noReplies</a> | <a href='http://www.sixteenseven.com/fav.tweets/index.php?user="+them+"&zFriends=&items=100&x=27&y=20' target='_blank'>fav.tweets</a></li>")
    .insertAfter($("span.bio").parent());

}