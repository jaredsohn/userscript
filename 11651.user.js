// ==UserScript==
// @name        Facebook Remove Quiz
// @version     1.2
// @author      Andreas Ringdal
// @namespace   no.ringdal.andreas.facebook
// @description Removes posted items with links to quiz.start.no
// @include     http://facebook.com/home.php*
// @include     http://*.facebook.com/home.php*
// ==/UserScript==

  (function() {

var ignoreurl = new Array();
ignoreurl[0] = "quiz.start.no";
ignoreurl[1] = "testorama";
ignoreurl[2] = "testdegselv";
ignoreurl[3] = "www.quizgalaxy.com";


     for (var j = 0; j < 2; j++) {
         var links = document.links;
         for (var i = 0; i < links.length; i++) {
         	for(var k=0;k < ignoreurl.length; k++)
         	{
             if (links[i].title.indexOf(ignoreurl[k]) > -1) {
                var outer = links[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
               	outer.parentNode.removeChild(outer);
             }
             else if (links[i].href.indexOf(ignoreurl[k]) > -1) {
                var outer = links[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
               	outer.parentNode.removeChild(outer);
             }
             
         	
         	}
         }
     }
 })();
 