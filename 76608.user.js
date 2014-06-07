// ==UserScript==
// @name                    Last Nova Song Search
// @namespace               http://www.maisdisdonc.com/ | http://userscripts.org/scripts/show/76608
// @description             Search what is playing from Nova on Deezer,... and remove useless stuffs.
// @version                 1.2.1
// @date                    01:54 26/07/2010
// @author                  Merimac
// @include                 http://www.novaplanet.com/radionova/player*
// @license                 Creative Commons Attribution-NonCommercial-ShareAlike 2.0 France
// ==/UserScript==

// Correction du lien Spotify



/*
 * Variables globales
 */
var version = '1.2.1';
var tempo = 1000;
var artist, song, newDivContent = '';

// Simple Debug flag ("1" to turn on)
var SDMyDebug = 0;


/*
 * Traductions
 * n.b. : Feel free to ask me to add your traduction here.
 */
// This function will be add as soon as possible.


/*
 * Functions
 */

// getElementById Helper : http://wiki.greasespot.net/GetElementById_Helper
function $() {
  if (arguments.length == 1) {
    return document.getElementById(arguments[0]);
  }

  var result = [], i = 0, el;
  while(el = document.getElementById(arguments[i++])) {
    result.push(el);
  }
  return result;
}

// Remove boxe by giving it's Id
function removeElementById() {
  var result, i = 0;
  while (result = $(arguments[i++])) {
    result.setAttribute('style', 'display: none !important;');
  }
}

// Get current artist
function getArtist() {
  artist = $('artiste') ? $('artiste').textContent.toLowerCase() : '';
  if(SDMyDebug) { console.log('Artiste = ' + artist); }
  return artist;
}

// Get current song
function getSong() {
  song = $('titre') ? $('titre').textContent.toLowerCase() : '';
  if(SDMyDebug) { console.log('Chanson = ' + song); }
  return song;
}

// Merge artist and song
function mergeArtistAndSong(separator) {
  return artist + separator + song;
}

// Return search url with artist and song as parameters
function makeSearchUrl(site) {
  switch (site) {
    case 'Beezik':
      // E.g. : http://www.beezik.com/beezik/anonymousMemberMusicAllResults.htm?keyword=madonna%20frozen
      var searchUrl = 'http://www.beezik.com/beezik/anonymousMemberMusicAllResults.htm?keyword=' + mergeArtistAndSong('%20');
      break;
    case 'Copier-Coller':
      //var searchUrl = 'javascript:copyToClipboard("uouo");';
      //var searchUrl = '# onclick=\'javascript:window.clipboardData.setData("Text", mergeArtistAndSong(' '));alert("Texte copié dans le Presse-Papier.");';
      var searchUrl = 'javascript:document.getElementById(\"last_nova_song_search\").reload;';
      break;
    case 'Dailymotion':
      // E.g. : http://www.dailymotion.com/relevance/search/madonna+frozen
      var searchUrl = 'http://www.dailymotion.com/relevance/search/' + mergeArtistAndSong('+');
      break;
    case 'Deezer':
      // E.g. : http://www.deezer.com/fr/#music/result/all/madonna frozen
      var searchUrl = 'http://www.deezer.com/' + unsafeWindow.navigator.language + '/#music/result/all/' + mergeArtistAndSong(' ');
      break;
    case 'Dilandau':
      // E.g. : http://dilandau.com/telecharger_musique/madonna%20frozen-1.html
      var searchUrl = 'http://dilandau.com/telecharger_musique/' + mergeArtistAndSong('%20') + '-1.html';
      break;
    case 'Google Song Search':
      // E.g. : http://www.google.fr/search?q=madonna+frozen&q=intitle:%22music%22+(mp3|aac|flac|wav)+%22Parent+Directory%22+-htm+-html+-asp+-php+-listen77+-idmusic+-airmp3+-shexy+-vmp3
      var searchUrl = 'http://www.google.fr/search?q=' + mergeArtistAndSong('+') + '&q=intitle:%22music%22+(mp3|aac|flac|wav)+%22Parent+Directory%22+-htm+-html+-asp+-php+-listen77+-idmusic+-airmp3+-shexy+-vmp3';
      break;
    case 'Google Videos':
      // E.g. : http://www.google.com/search?q=madonna+frozen&tbs=vid:1
      var searchUrl = 'http://www.google.com/search?q=' + mergeArtistAndSong('+') + '&tbs=vid:1';
      break;
    case 'Jiwa':
      // E.g. : http://www.jiwa.fr/#search/track/%7B%22q%22%3A%22madonna%20frozen
      var searchUrl = 'http://www.jiwa.fr/#search/track/%7B%22q%22%3A%22' + mergeArtistAndSong(' ') + '%22%7D';
      break;
    case 'Last.fm':
      // E.g. : http://www.lastfm.fr/search?q=madonna+frozen
      var searchUrl = 'http://www.lastfm.fr/search?q=' + mergeArtistAndSong('+');
      break;
    case 'musicMe':
      // E.g. : http://www.musicme.com/search.php?ambsearch=madonna+frozen
      var searchUrl = 'http://www.musicme.com/search.php?ambsearch=' + mergeArtistAndSong('+');
      break;
    case 'RuTube':
      // E.g. : http://rutube.ru/search.html?page=index&search=madonna+frozen
      var searchUrl = 'http://rutube.ru/search.html?search=' + mergeArtistAndSong('+');
      break;
    case 'ShareTheMusic':
      // E.g. : http://www.sharethemusic.com/search/simple/q/madonna+frozen/t/artists
      var searchUrl = 'http://www.sharethemusic.com/search/simple/q/' + mergeArtistAndSong('+');
      break;
    case 'Spotify':
      // E.g. : http://open.spotify.com/search/madonna+frozen
      var searchUrl = 'http://open.spotify.com/search/' + mergeArtistAndSong('+');
      break;
    case 'WorMee':
      // E.g. : http://www.wormee.com/#/search/madonna frozen
      var searchUrl = 'http://www.wormee.com/#/search/' + mergeArtistAndSong(' ');
      break;
    case 'YouTube':
      // E.g. : http://www.youtube.com/results?search_query=madonna+frozen
      var searchUrl = 'http://www.youtube.com/results?search_query=' + mergeArtistAndSong('+');
      break;

    default:
      var searchUrl = '#'
      break;
  }
  if(SDMyDebug) { console.log('Site = ' + site + '\n' + 'URL = ' + searchUrl); }
  return searchUrl;
}

// Insert the main Last Nova Song Search div
function insertLastNovaSongSearchDiv() {
  var placeToAddLink = $('main_droite_player');
  if (placeToAddLink) {
    // Make new zone for search header
    var newDivHead = document.createElement('div');
    newDivHead.setAttribute('id', 'last_nova_song_search');
    newDivHead.setAttribute('style', 'width: 282px; height: 241px; margin: 8px 0px 0px 10px; padding: 5px 10px; float: left;');
    newDivHead.innerHTML = '<a href="http://userscripts.org/scripts/show/76608" title="Last Nova Song Search" target="_blank"><img style="height: 31px; float: left;" src="http://s3.amazonaws.com/uso_ss/icon/76608/large.png?1273778146" /></a>';
    newDivHead.innerHTML += '<h2 style="text-align: center; cursor: default;"><a href="http://userscripts.org/scripts/show/76608" title="Last Nova Song Search" target="_blank">Last Nova Song Search</a></h2>';
    newDivHead.innerHTML += '<span id="maj" style="font-size: xx-small; font-weight: bold; float: right;"><a href="http://userscripts.org/scripts/source/76608.user.js" title="Mettre à jour Last Nova Song Search" target="_blank" onmouseout="this.style.color=\'#090\';" onmouseover="this.style.color=\'#f00\';" style="color: #090; text-decoration: underline;">Mise à jour</a></span>';
    newDivHead.innerHTML += '<span style="font-size: xx-small; font-weight: bold; float: left; padding-left: 6px;">v.' + version  + ' by Merimac</span>';

    // Make new zone for search content
    newDivContent = document.createElement('div');
    newDivContent.setAttribute('id', 'last_nova_song_search_content');
    newDivContent.innerHTML = '<p>TEST</p>';
//      insertLastNovaSongSearchContent('Copier-Coller');
    insertLastNovaSongSearchContent('Beezik', 'Dailymotion', 'Deezer', 'Dilandau', 'Google Song Search', 'Google Videos', 'Jiwa', 'Last.fm', 'musicMe', 'RuTube', 'ShareTheMusic', 'Spotify', 'WorMee', 'YouTube')

    newDivHead.appendChild(newDivContent);
    placeToAddLink.parentNode.insertBefore(newDivHead, placeToAddLink);
  }
}

// Insert the music search links
function insertLastNovaSongSearchContent() {
  if ((artist == '') || (artist == null)) {
      newDivContent.innerHTML = '<p style="line-height: 15px; margin-top: 11px; text-align: center; padding-top: 100px;"><span class="vote_musique" style="font-variant: small-caps; cursor: default; ">Il n\'y a pas de chanson pour le moment.</span></p>';
    } else {
      newDivContent.innerHTML = '<p style="line-height: 15px; margin-top: 18px;"><span style="font-weight: bold; font-variant: small-caps; cursor: default;">Rechercher :</span></p>';
      newDivContent.innerHTML += '<p style="line-height: 15px; text-align: center;"><span id="last_nova_song_search_title" class="vote_musique" style="font-style: italic; cursor: default; ">' + mergeArtistAndSong(' - ') + '</span></p>';
      newDivContent.innerHTML += '<p style="line-height: 15px; margin-top: 8px; margin-bottom: 8px;"><span style="font-weight: bold; font-variant: small-caps; cursor: default;">sur :</span></p>';

	  // Make new zone for search link
      var links = document.createElement('div');
      links.setAttribute('id', 'last_nova_song_search_links');
      links.setAttribute('style', 'text-align: center;');

      var site, i = 0;
      while (site = arguments[i++]) {
        if (site == 'Copier-Coller') {
            links.innerHTML += '<span id="' + site + '" class="vote_musique" style="margin: 2px 2px; display: inline-block;"><a title="Copier dans le presse-papier" "href="' + makeSearchUrl(site) + '">' + site + '</a></span>';
          } else {
            links.innerHTML += '<span id="' + site + '" class="vote_musique" style="margin: 2px 3px; display: inline-block;"><a title="Rechercher &quot;' + mergeArtistAndSong(' - ') +'&quot; sur ' + site +'" href="' + makeSearchUrl(site) + '" target="_blank">' + site + '</a></span>';
          }
        if(SDMyDebug) { console.log('Code HTML de ' + site + ' :\n' + links.innerHTML); }
      }
    }
      newDivContent.appendChild(links);
    return newDivContent.innerHTML;
}

// Reload some element
function setReload() {
    getArtist();
    getSong();
    $('last_nova_song_search_content').innerHTML = insertLastNovaSongSearchContent('Beezik', 'Dailymotion', 'Deezer', 'Dilandau', 'Google Song Search', 'Google Videos', 'Jiwa', 'Last.fm', 'musicMe', 'RuTube', 'ShareTheMusic', 'Spotify', 'WorMee', 'YouTube');
    removeElementById('fnac', 'podcasts', 'bientot', 'colonne_player_droite', 'main_droite_player')
}



window.addEventListener(
  'load',
  function() {
    if(SDMyDebug) { console.log('Langue du nagigateur = ' + window.navigator.language); }
    getArtist()
    getSong()
    insertLastNovaSongSearchDiv()
    removeElementById('fnac', 'podcasts', 'bientot', 'colonne_player_droite', 'main_droite_player')
    setInterval(setReload, tempo);
  },
  true
);
