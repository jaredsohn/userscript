// ==UserScript==
// @name          Bei-uns.de ?nb=1 Klick
// @description   Profile aufrufen ohne gesehen zu werden
// @include       *bei-uns.de*
// ==/UserScript==

//
// By Madboy 2008
//

for(i=0;i<document.links.length;i++)
{
  var all_link = document.links[i].href;
  var link_laenge1 = all_link.length;
  var link_laenge_neu = all_link.length - 12;
  var nur_bei_link = all_link.slice(link_laenge_neu, link_laenge1);
  if(nur_bei_link=='.bei-uns.de/') {
    if((all_link == 'http://www.bei-uns.de/') || (all_link == 'http://zufall.bei-uns.de/')) {
    }
    else{
      document.links[i].href = document.links[i].href + '?nb=1';
    }
  }
}
