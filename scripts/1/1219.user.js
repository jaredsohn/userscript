// ==UserScript==
// @name           eBay Item Reloader
// @namespace      http://www.arantius.com/misc/greasemonkey/
// @description    Provide a link to quickly reload ebay items.
// @include        *
//http://cgi.ebay.com/ws/eBayISAPI.dll*ViewItem
// ==/UserScript==

(function(){
//find where to put it
var place=document.getElementById('watching');
if (!place) return;

//make it
var span=document.createElement('span');
span.style.textAlign='right';
span.style.paddingRight='2em';
span.appendChild(document.createTextNode(' | '));
var a=document.createElement('a');
a.setAttribute('href', 'javascript:location.replace(location.href);');
a.appendChild(document.createTextNode('Reload This Item'));
span.appendChild(a);

//put it in
//place.insertBefore(span, place.firstChild);
place.appendChild(span);
})();
