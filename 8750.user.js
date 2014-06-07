// ==UserScript==
// @name           Twitter Preview
// @namespace      http://www.3greeneggs.com
// @description    Preview your contact's last twitter when you mouseover their image.
// @include        http://twitter.com/*
// ==/UserScript==

window.addEventListener("load", function(e) { // so that we don't manipulate the document before it's loaded

  var friends = document.getElementById('friends');
  status_regexp = new RegExp('<p>(.*)</p>', "im"); // status is the first paragraph in the target page

  if (friends.hasChildNodes()) { // there are friends here
    for (var i = 0; i < friends.childNodes.length; i+=2) {
      if (friends.childNodes[i+1]) { // make sure we're not undefined
        get_twitterstatus(String(friends.childNodes[i+1]),friends.childNodes[i+1]);
      } 
    }
  }
}, false);

//get_twitterstatus: Uses xmlHTTPRequest to load your friend's page, rips the status, then updates your link titles.
function get_twitterstatus(friend_url,friend_node) {
  GM_xmlhttpRequest({
    headers: [{'User-Agent': '3greeneggs; http://www.3greeneggs.com'}], // Am I officially a secret agent yet?
    method:'GET',
    url:friend_url,
    onload: function(details) {
      var match = status_regexp(details.responseText);
      if (match) {
	friend_node.title += ": "+match[1]; // when the status is returned, update the title attribute
      } 
    }
  });
}

