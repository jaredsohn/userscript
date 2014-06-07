// ==UserScript==
// @name           AMVNewsBans      
// @description    This script removes comments of undesirable users on amvnews.ru. Be sure to adjust the keywords below.
// @include        http://amvnews.ru/index.php?go=*
// ==/UserScript==
var keywords = [
	'IgnoredUser',
   ];
var allBs, thisB;

allBs = document.getElementsByTagName("b");

for (var i = 0; i <allBs.length; i++)
   {
    
     thisB = allBs[i];
     var bastard = thisB.textContent;
     if  ((keywords.indexOf(bastard) > -1) && (thisB.parentNode.parentNode.getAttribute("bgColor") == "#bababa") )
     {
	   thisB.parentNode.parentNode.parentNode.removeChild(thisB.parentNode.parentNode.nextSibling.nextSibling); 
     }
   }  