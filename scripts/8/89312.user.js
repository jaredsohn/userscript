// ==UserScript==
// @name           weed_thema_links
// @namespace      http://sptools
// @description    weeds useless links on sueddeutsche.de that
//                 reference to internal "thema" sites
// @include        http://sueddeutsche.de/*
// ==/UserScript==

(function() {
     var allLinks;
     allLinks = document.evaluate(
         '//a[@href]',
         document,
         null,
         XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
         null);
     
     for (var i = 0; i < allLinks.snapshotLength; i++) {
         var a = allLinks.snapshotItem(i);
         if(a.href.match(/http:\/\/sueddeutsche.de\/thema\//)){
             var txt_replacement = document.createTextNode(a.textContent);
             a.parentNode.replaceChild(txt_replacement, a);
         }
     }     
})();
