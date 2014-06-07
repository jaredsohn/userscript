// ==UserScript==
// @name        What.cd new request auto-subscription
// @namespace   funeral_meat
// @include     https://*what.cd/requests.php?action=view&id=*
// @version     1
// ==/UserScript==

/* This should automatically subscribe to your new request once the request is submitted and the resulting page has loaded */
var usernum = document.documentElement.innerHTML.match(/user\.php\?id\=[0-9]+/)[0].split("?")[1];
var pageid = document.URL.split("=")[2];
var page = 'requests';

var subscribeLink = $("#subscribelink_" + page + pageid).raw();
var JustNowTest = RegExp("\>([0-3] min(s)* ago|Just now)\<\/span\> by \<strong\>\<a href\=\"user.php\\?" + usernum);
	
if( document.documentElement.innerHTML.match(JustNowTest) != null && subscribeLink.firstChild.nodeValue.charAt(0) == 'S') {
  SubscribeComments(page, pageid)
  }