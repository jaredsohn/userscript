// ==UserScript==
// @name           Mass SDB Item Remover
// @namespace      Made by heya on neofriends.net (hey3423 on userscripts.org)
// @description    Adds a button to remove all items from your SDB
// @include        http://www.neopets.com/safetydeposit.phtml*
// ==/UserScript==

javascript: obj = document.createElement('div'); void(obj.innerHTML ='<a href="./safetydeposit.phtml/selectall" />Select All</a>'); void(document.getElementsByClassName('content')[0].getElementsByTagName('td')[13].appendChild(obj));

if (document.location.href.indexOf('http://www.neopets.com/safetydeposit.phtml/selectall') > -1)
{
javascript: void(document.getElementsByClassName('content')[0].getElementsByTagName('input')[5].value = '1');

javascript: void(document.getElementsByClassName('content')[0].getElementsByTagName('input')[6].value = '1');

javascript: void(document.getElementsByClassName('content')[0].getElementsByTagName('input')[7].value = '1');

javascript: void(document.getElementsByClassName('content')[0].getElementsByTagName('input')[8].value = '1');

javascript: void(document.getElementsByClassName('content')[0].getElementsByTagName('input')[9].value = '1');

javascript: void(document.getElementsByClassName('content')[0].getElementsByTagName('input')[10].value = '1');

javascript: void(document.getElementsByClassName('content')[0].getElementsByTagName('input')[11].value = '1');

javascript: void(document.getElementsByClassName('content')[0].getElementsByTagName('input')[12].value = '1');

javascript: void(document.getElementsByClassName('content')[0].getElementsByTagName('input')[13].value = '1');

javascript: void(document.getElementsByClassName('content')[0].getElementsByTagName('input')[14].value = '1');

javascript: void(document.getElementsByClassName('content')[0].getElementsByTagName('input')[15].value = '1');

javascript: void(document.getElementsByClassName('content')[0].getElementsByTagName('input')[16].value = '1');

javascript: void(document.getElementsByClassName('content')[0].getElementsByTagName('input')[17].value = '1');

javascript: void(document.getElementsByClassName('content')[0].getElementsByTagName('input')[18].value = '1');

javascript: void(document.getElementsByClassName('content')[0].getElementsByTagName('input')[19].value = '1');

javascript: void(document.getElementsByClassName('content')[0].getElementsByTagName('input')[20].value = '1');

javascript: void(document.getElementsByClassName('content')[0].getElementsByTagName('input')[21].value = '1');

javascript: void(document.getElementsByClassName('content')[0].getElementsByTagName('input')[22].value = '1');

javascript: void(document.getElementsByClassName('content')[0].getElementsByTagName('input')[23].value = '1');

javascript: void(document.getElementsByClassName('content')[0].getElementsByTagName('input')[24].value = '1');

javascript: void(document.getElementsByClassName('content')[0].getElementsByTagName('input')[25].value = '1');

javascript: void(document.getElementsByClassName('content')[0].getElementsByTagName('input')[26].value = '1');

javascript: void(document.getElementsByClassName('content')[0].getElementsByTagName('input')[27].value = '1');

javascript: void(document.getElementsByClassName('content')[0].getElementsByTagName('input')[28].value = '1');

javascript: void(document.getElementsByClassName('content')[0].getElementsByTagName('input')[29].value = '1');

javascript: void(document.getElementsByClassName('content')[0].getElementsByTagName('input')[30].value = '1');

javascript: void(document.getElementsByClassName('content')[0].getElementsByTagName('input')[31].value = '1');

javascript: void(document.getElementsByClassName('content')[0].getElementsByTagName('input')[32].value = '1');

javascript: void(document.getElementsByClassName('content')[0].getElementsByTagName('input')[33].value = '1');

javascript: void(document.getElementsByClassName('content')[0].getElementsByTagName('input')[34].value = '1');
}