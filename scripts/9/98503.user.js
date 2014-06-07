// ==UserScript==
// @name           Bots4 Notifier
// @namespace      Bots4 Notifier
// @description    Bots4 Notifier
// @include        http://bots4.net/*
// @author         Alan
// @version        2011-3-12
// ==/UserScript==

function is_numeric(val) { if (isNaN((val))) { return false; } return true; }
function get_notes() {
var allLinks = document.links;
var total = 0;
var forum = 0;
var post = 0;
for (var i=0; i<allLinks.length; i++) {
	if(allLinks[i].href == 'http://bots4.net/forum') {
	  var one = allLinks[i].innerHTML.charAt(52); forum = one;
	  var two = allLinks[i].innerHTML.charAt(53); if(two != '<') { forum = one+two; }
          var three = allLinks[i].innerHTML.charAt(54); if(three != '<') { forum = one+two+three; }
	}
	else if(allLinks[i].href == 'http://bots4.net/post-office') { 
          var one = allLinks[i].innerHTML.charAt(52);
	  var two = allLinks[i].innerHTML.charAt(53); if(two != '<') { var post = one+(two); } else { var post = parseInt(one); }
	}
}
total += parseInt(forum + post);
if(!is_numeric(post)) { post = 0; } 
if(!is_numeric(forum)) { forum = 0; }
if(total > 0) { document.title += ' [P:'+parseInt(post)+',F:'+parseInt(forum)+']'; }
}
get_notes();