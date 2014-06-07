// ==UserScript==
// @name           Newzbin in Amazon V3
// @namespace      http://mywebsite.com/myscripts
// @description    Puts links to search newzbin in amazon
// @include        *amazon.co*
// ==/UserScript==


var results =
   document.evaluate("//b[@class='sans']",
                     document, null,
                     XPathResult.FIRST_ORDERED_NODE_TYPE,
                     null);
var divnode = results.singleNodeValue;
var productname = divnode.innerHTML;
var space = document.createTextNode(' ');
divnode.insertBefore(space,
                     divnode.lastChild.nextSibling);
var newzbinlink = document.createElement('a');
newzbinlink.innerHTML = '(Newzbin search)';
divnode.insertBefore(newzbinlink,
                     divnode.lastChild.nextSibling);
newzbinlink.href = "http://v3.newzbin.com/search/?fpn=p&q="+productname+"&emu_subcat=-1&searchaction=Go&emu_subcat_done=-1";


