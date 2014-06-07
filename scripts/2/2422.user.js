// ==UserScript==// @name           MozillaZine Forums Topic Page Jumper// @namespace      http://zoolcar9.lhukie.net/mozilla/userscripts/// @description    Allows you to jump to a specific topic page// @include        http://forums.mozillazine.org/viewtopic.php?*// ==/UserScript==
// Changelog:// - 20051223: initial release// - 20060209: added topicIDvar topicID = document.evaluate('//td/a[@class="maintitle"]',
  document, null, 0, null).iterateNext().href.match(/\?t\=\d+/);
var main = document.getElementById('main');var tables = main.getElementsByTagName('table');var navs = [  main.getElementsByTagName('table')[0]
    .getElementsByTagName('tr')[1].getElementsByTagName('td')[1],  tables[tables.length-1].getElementsByTagName('tr')[0]    .getElementsByTagName('td')[1]];
if(!navs[0].firstChild || (navs[0].firstChild.value != navs[1].firstChild.value)) return;if(navs[0].lastChild.firstChild.nodeValue.match(/\d+/))
  var maxPage = navs[0].lastChild.firstChild.nodeValue;
else
  var maxPage = navs[0].lastChild.previousSibling.previousSibling.firstChild.nodeValue;

for(var i = 0; i < navs.length; i++) {  var nav = navs[i];  var jumper = document.createElement('a');
  jumper.name = 'jumper';
  jumper.style.cursor = 'pointer';
  jumper.style.color = '#066';
  jumper.addEventListener('click', function() {
    var page = prompt('Please enter a page number between 1 and ' + maxPage);
    if(!page) return;
    if(page && (page.match(/\d+/)) && (page != 0) && page < (maxPage + 1)) {
      var n = (page - 1) * 15;
      location.href = location.href.substring(0,43) + topicID + '&postdays=0&postperpage=15&start=' + n;
    }
  }, false);

  jumper.appendChild(nav.firstChild);
  nav.insertBefore(jumper, nav.firstChild);
}
