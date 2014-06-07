// ==UserScript==
// @name           Neopets : Shops : Restock Timer
// @namespace      http://www.gamingire.com/
// @author         Backslash
// @description    Adds a timer to see how fast you can restock on Neopets
// @include        http://www.neopets.com*
// ==/UserScript==
if(location.href == 'http://www.neopets.com/haggle.phtml' && document.body.innerHTML.match('has been added to your inventory'))
{
var time1 = new Date();
var timePassed = Math.floor(time1.getTime() - GM_getValue('shopTime'));
document.body.innerHTML = document.body.innerHTML.replace('has been added to your inventory', 'has been added to your inventory<br><br>You bought this item in <b>'+timePassed+'</b> milliseconds');
}
else if(document.body.innerHTML.match('Neopian Inflation is currently at'))
{
var time = new Date();
GM_setValue('shopTime', time.getTime().toString());
}