// lfm_top_fanizer v 0.2
//
// ==UserScript==
// @name           Last Fanatic
// @namespace      http://eldar.cz/myf/pub/firefox/
// @description    displays users "fan position" along links to artists in charts (there are far better versions made by better scripters; this is just  my nostalgia)
// @include        http://www.last.fm/*
// ==/UserScript==
//
// http://www.last.fm/music/[artist]/+fans
//  <span class="userIcon"><a href="/user/[nick]/"
// <a href="/user/[mynick]/" class="textlink"> [0]

function lfm_ta() {
 // I decided to restrict it for chart pages only
 if ( window.location.href.search(/charts/) == -1 ) {
  return;
 }
 GM_log('"Last Fanatic" greasemonkey script is gonna rock :]');
 // two nodelists; will be kept for further comparsion ...
 var AllArtistLinks = new Array();
 var UniqueArtistLinks =  new Array();
 // array; will be clear array of artist names
 var UniqueArtists = new Array();
 // fixme; promt is annoing, some fancy run/stop button in page would be better
 var maxArtists = prompt("max (0-'all'):", "all");
 if (maxArtists == 'all') {
  maxArtists = document.links.length;
 } else if ( !maxArtists || maxArtists.search(/\D/) > -1 ) {
  GM_log('Weird limit set. Terminating.');
  return;
 }
 GM_log('Looking for (url presentation of) nickname...');
 // from upper right box?
 // var myNick = document.getElementById('badgeTop').getElementsByTagName('a')[0].href.match(/\/user\/([^\/]+)\/$/)[1];
 // or from URL
 var myNick = document.location.href.match(/\/user\/([^\/]+)/)[1];
 // Or you can force someones nickname instead
 // var myNick = 'olga_erdeli';
 if ( !myNick ) {
  GM_log('... failed. Terminating.');
  return;
 }
 GM_log('... found. Regards, "' + myNick + '" :]');
 GM_log('Fetching artists...');
 for (var i=0; i < document.links.length; i++) {
  if ( UniqueArtists.length >= maxArtists  ) {
   GM_log('... limit reached.');
   break
  }
  curlink = document.links[i];
  if (curlink.href.search(/http:\/\/www\.last\.fm\/music\/[^\/]+$/) != -1) {
   AllArtistLinks.push(curlink);
   if (UniqueArtistLinks.indexOf(curlink.href) == -1) {
    UniqueArtistLinks.push(curlink);
    UniqueArtists.push(curlink.href.match(/\/([^\/]+)$/)[1]);
    // GM_log('...adding ' + UniqueArtists[UniqueArtists.length-1]);
   } else {
    // GM_log('artist already in list');
   }
  }
 }
 GM_log(AllArtistLinks.length + ' ' + AllArtistLinks.length);
 if ( !UniqueArtists.length ) {
  GM_log('No artist found. Terminating.');
  return;
 }
 GM_log('...done. Got ' + UniqueArtists.length + ' unique artists.');

 GM_log('Lets go!');
 getTFpos('0');

 // will recursively call itself
 function getTFpos(nr) {
  if ( nr >= UniqueArtists.length || nr >= maxArtists ) {
   GM_log('And thats all, folks.');
   return;
  }
  GM_xmlhttpRequest(
   {
    method: 'GET',
    // url: 'http://www.last.fm/music/yndi+halda',
    // url: http://ws.audioscrobbler.com/1.0/artist/yndi+halda/fans.xml
    url: 'http:\/\/ws.audioscrobbler.com\/1.0\/artist\/' + UniqueArtists[nr] + '\/fans.xml',
    onload: function(xmlhttp) {
     tmpSrc = xmlhttp.responseText;
     if (tmpSrc.search(/http:\/\/www.last.fm\/user\/[^\/]+/) > -1 ) {
      GM_log('Building array od fans of' + UniqueArtists[nr]);
      tmpFans = tmpSrc.match(/http:\/\/www.last.fm\/user\/[^\/]+/g);
      GM_log('...cleaning...');
      for (i=0; i<tmpFans.length; i++) {
       tmpFans[i] = tmpFans[i].match(/\/user\/([^\/]+)/)[1];
      }
      myPos = tmpFans.indexOf(myNick)+1;
      GM_log(myNick + ' is the ' + myPos + 'th fan.');
      if (myPos == 0) {
       myPos = '--';
      } else if (myPos == 1) {
       myPos = '#1!';
      }
      // HTML updating brutality, don't try it at home
      for (i=0; i<AllArtistLinks.length; i++) {
       if ( AllArtistLinks[i].href == UniqueArtistLinks[nr].href ) {
        AllArtistLinks[i].parentNode.innerHTML += '<strong><a href="http:\/\/www.last.fm\/music\/' + UniqueArtists[nr] + '\/+fans">&nbsp;[' + myPos + ']</a></strong>';
       }
      }
     } else {
      GM_log('This artist page contained no fans : ( possibly was some strange error');
     }
     nr++;
     getTFpos(nr);
    }
   }
  )
 }
}

lfm_ta();
