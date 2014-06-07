// ==UserScript==
// @name           Search Links on Schedule
// @namespace      broadcasthe.net
// @description    Adds search links to the tv schedule
// @include        http*://broadcasthe.net/tvschedule.php?*
//
// By mcnellis
//
// ==/UserScript==

var table = document.getElementsByTagName('table')[0];
var rows = table.getElementsByTagName('tr');
for ( i in rows )
{
  var searchTD = document.createElement('td');
  searchTD.setAttribute('width','30');
  if ( i==0 )
  {
    searchTD.appendChild(document.createTextNode('Search'));
    searchTD.setAttribute('class','colhead');
  }
  else
  {
    searchA = document.createElement('a');
    searchA.appendChild(document.createTextNode('Search'));
    var episode = rows[i].getElementsByTagName('td')[1].getElementsByTagName('a')[0].childNodes[0].nodeValue;
    var searchTerm = episode.substr(2,episode.indexOf('(')-3).replace(/ /g, '+' );
    searchA.href = window.location.protocol+'//'+window.location.host+'/torrents.php?searchstr='+searchTerm;
    searchTD.appendChild(searchA);
  }

  rows[i].insertBefore( searchTD, rows[i].getElementsByTagName('td')[1] );
}
