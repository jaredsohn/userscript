// ==UserScript==
// @name           LoopAutoXP
// @namespace      *
// @include        http://apps.facebook.com/streetracinggame/jobs.php*
// ==/UserScript==

var urlStr = window.location.href + '';
var idStr = urlStr.substring(urlStr.length - 2, urlStr.length);

if (parseInt(idStr))
{
   idStr = (parseInt(idStr) - 1) + ''
   urlStr = urlStr.substring(0, urlStr.length - 2) + idStr;
   window.location.href = urlStr;
}
else
{
   window.location.href = "http://apps.facebook.com/streetracinggame/fight.php"
}