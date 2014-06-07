// ==UserScript==
// @name           Flickr Add Your Groups Menu
// @namespace      http://endflow.net/
// @description    Add "Your Groups" menu item into "You" menu on Flickr.
// @include        http://www.flickr.com/*
// @include        http://flickr.com/*
// ==/UserScript==
// @author         Yuki KODAMA (twitter:kuy, skype:netkuy)
// @version        0.1.0 [2008-07-04]
// @history        [2008-07-04] 0.1.0 first release

(function(){
var yourGroups = $X('id("candy_nav_menu_groups")/a[@href="/groups/"]').cloneNode(true);
var borderLine = $X('id("candy_nav_menu_you")/a[@class="menu_item_line_above"]');
borderLine.parentNode.insertBefore(yourGroups, borderLine);
function $X(x,c){c=c||document;var res=document.evaluate(x,c,null,XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null);
return res.iterateNext()}
})();
