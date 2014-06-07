// ==UserScript==
// @name           LandGrab messages links
// @namespace      lg_messlinks
// @description    Changing links to messages from JS based to normal (allowing middle-clicking etc.)
// @include        http://landgrab.net/landgrab/Home
// ==/UserScript==

FixMessageLinks();

function FixMessageLinks(){
  var ar = document.querySelectorAll('span.AttnColor'),el,a,link;
  for(var i=0; i<ar.length; i++){
    el = ar[i];
    link = el.parentNode.parentNode.previousSibling.previousSibling.childNodes[1].childNodes[1].childNodes[1].href.replace('Home?g','Messages?gn');
    a = document.createElement('a');
    a.href = link;
    a.style.color = '#EBE155';
    a.style.textDecoration = 'none';
    a.innerHTML = el.innerHTML.trim();
    el.parentNode.insertBefore(a, el);
    el.parentNode.removeChild(el);
  }
}