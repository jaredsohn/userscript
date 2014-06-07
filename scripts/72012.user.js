// ==UserScript==
// @name         Auto Add To Google Reader
// @namespace    greaderAutoAdd
// @include      /^http:\/\/www\.google\.com\/ig\/add\?feedurl=/i
// @include      http://www.google.com/ig/add?feedurl=*
// @include      https://www.google.com/ig/add?feedurl=*
// @match        http://www.google.com/ig/add?feedurl=*
// @match        https://www.google.com/ig/add?feedurl=*
// @datecreated  2010-03-20
// @lastupdated  2010-03-21
// @version      0.1
// @author       Erik Vergobbi Vold
// @license      GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description  Bypasses the "Add to Google homepage"/"Add to Google Reader" choice, automatically adding to Google Reader.
// ==/UserScript==

(function(loc,links){
  if(links[3].innerHTML=="Add to Google Reader"){
    return loc.replace(links[3].href);
  }

  for(var i=links.length-1;i>=0;i--){
    if(links[i].innerHTML=="Add to Google Reader"){
      loc.replace(links[i].href);
      break;
    }
  }
})(document.location,document.links);
