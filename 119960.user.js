// ==UserScript==
// @name           Wykopalisko Cleaner
// @namespace      userscripts.org
// @description    Czysci wykopalisko z wykopow sponsorowanych
// @include        http://www.wykop.pl/wykopalisko/
// ==/UserScript==

(function() {

var items = document.evaluate("/html/body/div[2]/div/section/div/div[2]/div/article", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

var regex = /^http\:\/\/www\.wykop\.pl\/dodaj\/partner\/.*$/;
var j = 0;
var elem = new Array();

for (var i=0; i<=items.snapshotLength; i++)
{
   if (items.snapshotItem(i) != null)
   {
      if (regex.exec(items.snapshotItem(i).children[0].children[0].children[0].href)) elem[j++] = i; 
   }
}

for (j=0; j<=elem.length; j++)
{
   items.snapshotItem(elem[j]).parentNode.removeChild(items.snapshotItem(elem[j]));
}

})();
