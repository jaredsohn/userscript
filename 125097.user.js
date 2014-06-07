// ==UserScript==
// @name           moviepilot.de include SERIE in series links
// @namespace      maeki.org
// @include        http://www.moviepilot.de*
// @include        http://*.google.*/reader/*
// ==/UserScript==

function changeLinks() {
  var alllinks = document.getElementsByTagName('a');
  for (var i=0;i<alllinks.length;i++) {
    var currentLink = alllinks[i];
    if(currentLink.href.match("/serie/.*[^#]$") && !currentLink.textContent.match('(SERIE)')) {
      var newText = document.createTextNode(" (SERIE)");
      currentLink.appendChild(newText);
    }
  }
if(document.location.href.match('google')) {
     window.setTimeout(arguments.callee, 3000);
   }
}

if(document.location.href.match('google')) {
     window.setTimeout(changeLinks, 3000);
   }
else
  changeLinks();
