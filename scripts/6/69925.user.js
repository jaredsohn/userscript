// ==UserScript==
// @version 1.0
// @name           IOL Linkify
// @date           20010-2-26
// @namespace      http://userscripts.org/scripts/show/69925
// @description    Works gloablly accross all the pages. Affects only the URL within iol.co.za
// Whenever it encounters any link to an article, will append singlepage=1 to it to avoid pesky pagination.
// @include        *
// ==/UserScript==

/*
Works gloablly accross all the pages. Affects only the URLs within iol.co.za
Whenever it encounters any link to an article, it will append singlepage=1 to it to avoid pesky pagination
*/

/*
Based on  this script (http://userscripts.org/scripts/show/40456)  created by Niraj Prasad (np1@nirajp.8k.com)

*/

var currpage = window.location.href;
var referr = document.referrer;
var allurls = document.getElementsByTagName('A');
var Max = allurls.length;

if(currpage.search(/iol\.co\.za\/index\.php/) == -1)
for(var i = 0; i < Max; i++)
if (allurls[i].href.search(/iol\.co\.za\/index\.php\//) != -1)
{
   allurls[i].href = allurls[i].href.replace(/iol\.co\.za\/index\.php\//, 'iol\.co\.za\/index\.php?singlepage=1&art_id=');
   allurls[i].href = allurls[i].href.replace(/\/[^\/]*$/,'');
};


// Original script
// if(currpage.search(/gigapedia\.com\/items/) == -1)
// for(var i = 0; i < Max; i++)
// if (allurls[i].href.search(/gigapedia\.com\/items\//) != -1)
// {
//   allurls[i].href = allurls[i].href.replace(/gigapedia\.com\/items\//, 'gigapedia\.com\/items:links?id=');
//   allurls[i].href = allurls[i].href.replace(/\/[^\/]*$/,'');
// };
