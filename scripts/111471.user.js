// ==UserScript==
// @name           PTP Hide Ratings
// @include        http*://*passthepopcorn.me/torrents.php*
// @author         coptersoi
// ==/UserScript==

if(document.title.substr(0,15) == "Browse Torrents"
   || document.title.match(/((seed|leech)ing|uploaded) torrents/))
{ 
  var elements = document.getElementsByClassName("browserating");
  for (var i=0; i<elements.length; i++) {
    elements[i].style.display = "none";
  }
}
else
{
  var elements = document.getElementsByClassName("box");
  for (var i=0; i<elements.length; i++) {
    if(elements[i].innerHTML.match(/<strong>Ratings<\/strong>/))
    {
      elements = document.getElementsByClassName("noborder");
      for (var i=1; i<elements.length-2; i++) {
        elements[i].style.display = "none";
      }
    }
  }

}