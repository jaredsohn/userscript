// ==UserScript==

// @name          What.CD view perfect FLAC's.

// @description   What.CD view perfect FLAC's.

// @namespace     http://what.cd

// @include       *what.cd/user.php?id=*

// @author        Amareus

// ==/UserScript==
var userid = window.location.href.split('=')[1];


function getClass(name) {

  var allPageTags=document.getElementsByTagName("*");

  for (i=0; i<allPageTags.length; i++) {

    if (allPageTags[i].className == name) return allPageTags[i];

  }

}


var sidebar = getClass('sidebar').getElementsByTagName('div');

var sidebar = sidebar[sidebar.length-2].getElementsByTagName('li')[6];

sidebar.innerHTML += "<a href=\"https://ssl.what.cd/torrents.php?type=uploaded&userid=" +userid+ "&bitrate=Lossless&format=FLAC&log=100&cue=1&order=Time&way=ASC\">[View]</a>";