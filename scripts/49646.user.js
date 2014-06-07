// ==UserScript==
// @name          Return to old BS!
// @namespace     Made for you Bitsoupers!
// @description   Return torrents to "Show Details" by default
// @include       http://bitsoup.org/browse.php*
// @exclude      
// ==/UserScript==


(function()
{
// load up all the links
var hyperlinks = document.getElementsByTagName("a");

for (var i = 0; i < hyperlinks.length; ++i)
{
// Get each link
var node = hyperlinks[i];
// read in the href
var href = node.getAttribute("href");

// if details.php is in there - then we want to change it
                                          if (href.match(/details.php*/)  )
                                         {
   // remove hit and replace with tdesc
   var newlink = href.replace('&hit', '&tdesc');
                                              node.setAttribute("href", newlink );
                                         }
                     }
})();