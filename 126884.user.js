// ==UserScript==
// @name       Microsoft Academic Search
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @include    http*://academic.research.microsoft.com*
// @copyright  2011+, You
// ==/UserScript==


//$('a.conference-name').each (function() {
//    this.lastChild.textContent = this.lastChild.textContent.replace('-','').replace( /([^ ])([^ ]+)($|\s)/g , function(m,p1,p2,p3){ return p1+p2.toLowerCase()+"."+p3; } );       //toLowerCase().replace('-','').replace(/([])([^ ]+)/g,'$1.');
//});
// //$("a.conference-name").css("text-transform", "capitalize")


var links = document.querySelectorAll('a.conference-name'), len = links.length; 
for (var i = 0; i < len; i++) {
    ISOAbbr(links[i]);
}

function ISOAbbr(link) {
    link.textContent = link.textContent.replace(/([A-Z])([A-Z\-]*)($|\s)/g , function(m,p1,p2,p3){ return p1+p2.toLowerCase()+"."+p3; } ); 
}