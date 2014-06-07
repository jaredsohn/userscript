// ==UserScript==
// @name          Whim Big
// @namespace     wp
// @description   Make WHIM text box bigger
// @include       http://forums.whirlpool.net.au/forum-user.cfm?id=*
// ==/UserScript==

 $ = unsafeWindow.jQuery; 
$("/html/body//table/tbody/tr/td/div/table/tbody/tr/td").width("26em");
$("textarea").width("33em").attr("rows","10");
$("input").width("30em");	
