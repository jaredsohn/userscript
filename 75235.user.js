// ==UserScript==
// @name           GoogleMapsLinker
// @namespace      http://userscripts.org/users/142804
// @description    seeName
// @include        *
// ==/UserScript==
var city='Washington';
var allTds=document.getElementsByTagName('td');

for (var i = 0; i < allTds.length; i++)     
    {
    var address='';
    if(address=allTds[i].innerHTML.match(/\d{1,5} [0-9A-Z \.,]{4,}?\d{1,4},/gi))
        {
        var mapLink='<a href="http://maps.google.com/?q='+city+','+ address + '">' + address + '</a>';
        allTds[i].innerHTML=allTds[i].innerHTML.replace(address,mapLink);
        }
    }