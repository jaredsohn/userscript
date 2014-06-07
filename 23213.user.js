// ==UserScript==
// @name           Unpaginate Yahoo search results (microformat producer)
// @namespace      http://code.google.com/p/ecmanaut/
// @url            http://userscripts.org/scripts/source/23213.user.js
// @description    Marks up Yahoo search results with the pagination microformat.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/addmetainfo.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/unpaginate.js
// @include        http://search.yahoo.com/search*
// @include        http://images.search.yahoo.com/search*
// @include        http://video.search.yahoo.com/search*
// ==/UserScript==

var host = location.hostname.toLowerCase();

if ("search.yahoo.com" == host)
  unpaginate('id("web")/ol/li', 'id("pg-next")', 'id("pg")');
else if("images.search.yahoo.com" == host)
  unpaginate('id("yschimg")/tbody/tr', 'id("yschnxtb")//a', 'id("yschpg")');
else if("video.search.yahoo.com" == host)
  unpaginate(['id("yvsrtab")/tbody/tr', 'id("yvsrlv")/li'],
             'id("pg-next")', 'id("pg_srp")');

/* not such a good idea (doesn't integrate with the map pane):
// @include        http://local.yahoo.com/results*
else if("local.yahoo.com" == host)
  unpaginate('id("yls-rs-res")/tbody', '//a[@class="yls-gl-pagarrow"]',
             'id("yls-rs-pagination")');
*/
