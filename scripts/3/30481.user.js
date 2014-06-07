// ==UserScript==
// @name           Bitly Link Info
// @namespace      http://userscripts.org/users/60534
// @description    Shows information about all bit.ly urls found on Twitter and other sites.
// @include        http://twitter.com/*
// @include        http://friendfeed.com/*
// @include        http://identi.ca/*
// @include        http://www.flickr.com/*
// @include        http://www.facebook.com/*
// @author         jauderho (orignial script from thefluffanutta) v0.5
// ==/UserScript==

var links = document.getElementsByTagName('a');
var domParser = new DOMParser();

var user = "jauderho";
var key = "R_c2c7c55a4c2cd22c6cefefc4d186492d";

// find all bitly urls on the page
for (var i=0,j=links.length; i<j; i++) {
  if (links[i].href.indexOf('http://bit.ly/') == 0) {
    var code = links[i].href.substring(14);
    getInfo(links[i],code);
  }
}

function getInfo(link, code)
{
  GM_xmlhttpRequest({
   method:"GET",
   url:"http://api.bit.ly/stats?version=2.0.1&shortUrl=http://bit.ly/"+code+"&login="+user+"&apiKey="+key,
   headers:{
     "Accept":"text/xml"
   },
   onload:function(response) {
     if (response.status == 200) {
       var json = eval('(' + response.responseText + ')');

       // add target URL as link tooltip
       link.title = "Goes to "+json.results.userHash;

       // create a link to the stats page for bitly
       var stats = document.createElement('a');
       stats.setAttribute("href", "http://bit.ly/info/"+code);
       stats.setAttribute("title", "Stats for "+json.results.userHash);
       stats.setAttribute("target", "_blank");
       stats.appendChild(document.createTextNode(json.results.clicks));

       // stuff the new link into the tweet
       var nextNode = link.nextSibling;
       link.parentNode.insertBefore(document.createTextNode(' ['), nextNode);
       link.parentNode.insertBefore(stats, nextNode);
       link.parentNode.insertBefore(document.createTextNode(']'), nextNode);
     }
   }
 });
}
