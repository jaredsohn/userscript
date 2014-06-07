// ==UserScript==
// @name           Twurl Link Info
// @namespace      http://userscripts.org/users/56976
// @description    Shows information about all Twurls found on Twitter.
// @include        http://twitter.com/*
// @author         thefluffanutta
// ==/UserScript==

var links = document.getElementsByTagName('a');
var domParser = new DOMParser();

// find all twurls on the page
for (var i=0,j=links.length; i<j; i++) {
  if (links[i].href.indexOf('http://twurl.nl/') == 0) {
    var code = links[i].href.substring(16);
    getInfo(links[i],code);
  }
}

function getInfo(link, code)
{
  GM_xmlhttpRequest({
   method:"GET",
   url:"http://tweetburner.com/links/"+code+".json",
   headers:{
     "Accept":"text/xml"
   },
   onload:function(response) {
     if (response.status == 200) {
       var json = eval('(' + response.responseText + ')');

       // add target URL as link tooltip
       link.title = "Goes to "+json.url;

       // create a link to the stats page for twurl
       var stats = document.createElement('a');
       stats.setAttribute("href", "http://tweetburner.com/links/"+code);
       stats.setAttribute("title", "Stats for "+json.url);
       stats.appendChild(document.createTextNode(json.clicks));

       // stuff the new link into the tweet
       var nextNode = link.nextSibling;
       link.parentNode.insertBefore(document.createTextNode(' ['), nextNode);
       link.parentNode.insertBefore(stats, nextNode);
       link.parentNode.insertBefore(document.createTextNode(']'), nextNode);
     }
   }
 });
}
