// ==UserScript==
// @name           Link Gaia Item's While Selling
// @description    Links the item's name to the item in the sell item page.
// @include        http://www.gaiaonline.com/marketplace/mystore/sell/?item_id=*
// @include        http://gaiaonline.com/marketplace/mystore/sell/?item_id=*
// ==/UserScript==
var get = document.getElementById('vend_detail').getElementsByTagName('h1')[0];
var url =document.location.href;
var start = url.indexOf('=')+1;
var stop = url.indexOf('&');
var id= url.substring(start,stop);
get.innerHTML='<table width="98%"><tr><td><a target="_blank" href="/marketplace/itemdetail/'+id+'">'+get.innerHTML+'</a></td>'+'<td align="right">Search for <a href="http://www.tektek.org/gaia/item_search.php?s='+get.innerHTML.replace(/ /,'&#32;')+'" target="_blank">'+get.innerHTML+'</a> on <a target="_blank" href="http://tektek.org">Tektek.org</a></td></tr></table>';