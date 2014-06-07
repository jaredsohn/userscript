// ==UserScript==
// @name           Kill TD reload
// @namespace      Namespace
// @description    Remove reload on Torrent Damage
// @include        http://www.torrent-damage.net/*
// ==/UserScript==

/*
var allScripts;
allScripts = document.getElementsByTagName('script');
for (var i = 0; i < allScripts.length; i++)
{
  thisScript = allScripts[i];
  if(thisScript.innerHTML.match(/reload()/i))
  {
    thisScript.innerHTML = '';
  }
}
*/


for (var i = 0; i < 1000; i++)
{
  clearInterval(i);
}
