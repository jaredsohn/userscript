// ==UserScript==
// @name           Hide tags from day-to-day view of explore/interesting
// @namespace      http://www.panix.com/~eli/      
// @description    On Flickr explore/interesting/YYYY/MM/DD/ hide the image tags, based on a request written for GM practice.
// @author         Eli the Bearded 
// @include        http://www.flickr.com/explore/interesting/*/*/*/
// @include        http://flickr.com/explore/interesting/*/*/*/
// ==/UserScript==


(function() {

ps=document.getElementsByTagName('p');

for (i=0;i<ps.length;i++)
 if (ps[i].innerHTML.match(/Tagged with/)) {
   ps[i].innerHTML = "{tags surpressed by greasemonkey}";
 }


})();
