// ==UserScript==
// @name           Google "Searches Related To" on the Top
// @namespace      http://d.hatena.ne.jp/blooo/
// @include        http://www.google.tld/search?*
// @version        1.1
// ==/UserScript==

/* move to top */
var searchesRelated = document.evaluate('//div[@id="res"]//div[@class="e"]',document,null,7,null).snapshotItem(0);
var res = document.evaluate('//div[@id="res"]',document,null,7,null).snapshotItem(0);
var h2 = document.evaluate('//div[@id="res"]/h2',document,null,7,null).snapshotItem(0);
res.insertBefore(searchesRelated,h2);

GM_addStyle(<><![CDATA[
 div#trev{
  display:none;
 }
 /* for thouse who want further simpleness */
 /*
 div.e caption{
  display:none;
 }
 */
]]></>);


