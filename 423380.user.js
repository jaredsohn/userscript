// ==UserScript==
// @name        SSC Subscriptions
// @namespace   http://www.skyscrapercity.com/
// @description Button for opening all threads with new posts
// @include     http://www.skyscrapercity.com/subscription.php*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @grant       GM_addStyle
// @grant		GM_openInTab
// @version     1.06
// ==/UserScript==

var newNode = document.createElement('td');
var elCount  = $("img[src$='firstnew.gif']").size();
if(elCount > 0) {
	newNode.innerHTML = '<button class="unreadButton" type="button">Open unread (<strong>' + elCount +'</strong>)</button>';
} else {
	newNode.innerHTML = '<p>No new posts.</p>';
}
newNode.setAttribute ('class', 'unreadContainer');

$("div.pagenav").parent().parent().prepend(newNode);

$(".unreadButton").click(function(e) {
	e.preventDefault();
	$(".unreadButton").parent().html("<p>Threads with new posts have been opened in new tabs.</p>");
	$("img[src$='firstnew.gif']").each(function(idx, el) {
		GM_openInTab($(el).parent().prop("href"));
		$(el).parent().next().css("font-weight","normal");
		$(el).parent().parent().parent().css("background-color","#ddffaa")
		$(el).parent().remove();
	});
});

GM_addStyle(".unreadButton { margin: 0 2px; cursor: pointer; text-align: center; text-decoration: none; font: 14px/100% Arial, Helvetica, sans-serif; padding: .5em 2em .55em; text-shadow: 0 1px 1px rgba(0,0,0,.3); -webkit-border-radius: .5em;  -moz-border-radius: .5em; border-radius: .5em;-webkit-box-shadow: 0 1px 2px rgba(0,0,0,.2);-moz-box-shadow: 0 1px 2px rgba(0,0,0,.2);box-shadow: 0 1px 2px rgba(0,0,0,.2);color: #e8f0de;border: solid 1px #538312;background: #64991e;background: -webkit-gradient(linear, left top, left bottom, from(#7db72f), to(#4e7d0e));background: -moz-linear-gradient(top,  #7db72f,  #4e7d0e);filter:  progid:DXImageTransform.Microsoft.gradient(startColorstr='#7db72f', endColorstr='#4e7d0e');} .unreadButton:hover { text-decoration: none;background: #538018;background: -webkit-gradient(linear, left top, left bottom, from(#6b9d28), to(#436b0c));background: -moz-linear-gradient(top,  #6b9d28,  #436b0c);filter:  progid:DXImageTransform.Microsoft.gradient(startColorstr='#6b9d28', endColorstr='#436b0c'); } .unreadButton:active { position: relative;top: 1px;color: #a9c08c;background: -webkit-gradient(linear, left top, left bottom, from(#4e7d0e), to(#7db72f));background: -moz-linear-gradient(top,  #4e7d0e,  #7db72f);filter:  progid:DXImageTransform.Microsoft.gradient(startColorstr='#4e7d0e', endColorstr='#7db72f'); }");
