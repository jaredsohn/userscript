// ==UserScript==
// @name Reddit Minus Reddit (Chrome Version)
// @description Removes the Reddit community from Reddit.
// @include http://www.reddit.com/*
// @include http://www.redditmedia.com/*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @author signedlongint
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}
function main() {
  $('link[title="applied_subreddit_stylesheet"]').remove();
	$('ul.buttons,div.expando-button,div.child,div.arrow,div.score,#header-bottom-right,p.tagline,div.organic-listing').remove();
  $('form#login_login-main,div.submit,form.usertext,div.sidecontentbox,span.fancy-toggle-button,div#adlink').remove();
  $('div.promotedlink').parent().remove();
	$('span.rank').css('margin-right', '1em');
  $('span.rank').css('margin-top', '0');
  $('span.rank').text('•');
  $('div.thing').css('margin-bottom','15px');
  $('div.number').css('margin-left', '0');
  $('a[href^="/r"].title').parent().parent().parent().remove()
}
addJQuery(main);