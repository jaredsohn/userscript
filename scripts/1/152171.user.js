// ==UserScript==
// @name           Stormchan gif animator
// @namespace      http://stormchan.org/
// @description    makes the gifs on Stormchan animate
// @include        http://stormchan.org/*   
// ==/UserScript==
// ==/Authors==
//      Anonymous
// ==/Edits by==
//      Dixieland

var links=document.getElementsByTagName('a');
for(index = 0; index < links.length; index++) {
  var current_link = links[index];
  var link_href = current_link.href;
  if(current_link.target=='_blank' &&
     link_href.match(/gif$/)) {
    var thumbnail = current_link.childNodes[0];
    // makes the thumbnail use the gif in the link for its source.
    thumbnail.src = link_href;
  }
}
