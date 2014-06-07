// ==UserScript==
// @name           Filter Schedule
// @namespace      broadcasthe.net
// @description    Filters the TV Schedule
// @include        http*://broadcasthe.net/tvschedule.php
// ==/UserScript==

var tvShows = [ /Daily\ Show/,/Colbert\ Report/,/Spartacus/,/Community/ ];

function dump ( arg )
{
  var container = document.createElement('div');
  container.style.background = '#fff';
  container.style.border = '2px #000 solid';
  container.style.fontSize = '10px;'
  container.style.color = '#000';
  container.style.width = '600px;'
  for ( i in arg )
  {
    var span = document.createElement('span');
    span.style.display = 'block';
    span.innerHTML = i+' => '+arg[i];
    container.appendChild(span);
  }
  var appendTo = document.getElementById('extra6');
  appendTo.appendChild(container);
  return;
}

var filterLink = document.createElement('a');
filterLink.href = '#';
var filterURL = document.location.toString()+'#showFavorites';
var filterValue = document.createTextNode('[Show Favorites]');

var episodesTable = document.getElementsByTagName('table')[0];
if ( document.location.hash == '#showFavorites' )
{
  filterValue.nodeValue = '[Hide Favorites]';
  filterURL = document.location.toString().replace('#showFavorites','');
  var episodesTR = episodesTable.getElementsByTagName('tr');
  var episodes = new Array();
  var favShows = new Array();
  var searchTerms = new Array();
  var episode = '';
  var i; var j;
  for ( i in episodesTR )
  {
    if ( i == 0 ) continue; // Skip heading

    var link = episodesTR[i].getElementsByTagName('td')[1].getElementsByTagName('a')[0];
    if ( link != null )
      episodes.push(episodesTR[i]);

    episode = link.childNodes[0].nodeValue; // Get episode name
    for ( j in tvShows )
    {
      if ( episode.search(tvShows[j]) > 0 )
      {
        favShows.push(episodesTR[i]);
        searchTerms.push(tvShows[j]);
        alert(tvShows[j]);
        break;
      }
    }
  }

  //dump(episodes);

  var favoritesTable = episodesTable.cloneNode(false);
  favoritesTable.style.marginBottom = '10px';
  var favoritesTableBody = document.createElement('tbody');
  var favoritesTableHeading = episodesTable.childNodes[1].childNodes[0].cloneNode(true);
  favoritesTableBody.appendChild(favoritesTableHeading);

  var favoriteShow;
  var searchLink;
  var searchValue;
  for ( i in favShows )
  {
    var showName = episodesTR[i].getElementsByTagName('td')[1].getElementsByTagName('a')[0];
    searchLink = document.createElement('a');
    searchLink.href = window.location.protocol+'//'+window.location.host+'/torrents.php?searchstr='+searchTerms[i].toString().replace(/ /g,'+').replace(/\//g,'').replace(/\\/g,'');
    searchValue = document.createTextNode(' Search!');
    searchLink.appendChild(searchValue);
    favoriteShowTR = favShows[i].cloneNode(true);
    favoriteShowTR.getElementsByTagName('td')[1].appendChild(searchLink);
    favoritesTableBody.appendChild(favoriteShowTR);
  }

  favoritesTable.appendChild(favoritesTableBody);
  //episodesTable.parentNode.insertBefore( favoritesTable, episodesTable);
  episodesTable.parentNode.insertBefore( favoritesTable, episodesTable);

}

filterLink.addEventListener('click', function(){ window.location.href = filterURL; return false; }, false ); 
filterLink.appendChild(filterValue);
episodesTable.parentNode.childNodes[1].removeChild(episodesTable.parentNode.childNodes[1].childNodes[1]); // remove second <br/>
episodesTable.parentNode.childNodes[1].appendChild(filterLink);
var br1 = document.createElement('br');
var br2 = document.createElement('br');
episodesTable.parentNode.childNodes[1].appendChild(br1);
episodesTable.parentNode.childNodes[1].appendChild(br2);
