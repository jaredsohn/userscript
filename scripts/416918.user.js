// ==UserScript==
// @name          What.CD Dynamic Range DB Lookup
// @description   Looks up the current artist / album's Dynamic Range on dr.loudness-war.info
// @version       1.8
// @author        phracker <phracker@privatdemail.net>
//
// @require		  http://code.jquery.com/jquery-2.1.0.min.js
//
// @include       https://what.cd/torrents.php?id=*
// @include       https://what.cd/artist.php?id=*
// @include       https://ssl.what.cd/torrents.php?id=*
// @include       https://ssl.what.cd/artist.php?id=*
// ==/UserScript==

(function() {
  if(document.URL.search('torrents.php') != -1) {  
    var artist = document.getElementsByClassName('header').item(0).getElementsByTagName('h2').item(0).getElementsByTagName('a').item(0).innerText;
    var album = document.getElementsByClassName('header').item(0).getElementsByTagName('h2').item(0).getElementsByTagName('span').item(0).innerText;
    var a = document.createElement('a');
    var linkurl = "http://dr.loudness-war.info/album/list?artist=" + artist.replace(/\ /g,'+') + "&album=" + album.replace(/\ /g,'+');
    a.href = linkurl;
    a.target = "_blank";
    a.innerText = "DR Database";
    a.className = "brackets";
    document.getElementsByClassName('header').item(0).getElementsByClassName('linkbox').item(0).appendChild(a);
  } else {
    var artist = document.getElementsByClassName('header').item(0).getElementsByTagName('h2').item(0).innerText;
    var a = document.createElement('a');
    var linkurl = "http://dr.loudness-war.info/album/list?artist=" + artist.replace(/\ /g,'+');
    a.href = linkurl;
    a.target = "_blank";
    a.innerText = "DR Database";
    a.className = "brackets";
    document.getElementsByClassName('header').item(0).getElementsByClassName('linkbox').item(0).appendChild(a);
    var albumlist = document.getElementById('torrents_album').getElementsByClassName('group_info');
    for(var x = 0; x < albumlist.length; x++){ 
        var albumx = albumlist.item(x).getElementsByTagName('a').item(0).innerText;
        var albumxlink = document.createElement('a');
    	//albumxlink.className = "brackets";
      	albumxlink.innerHTML = "<img src='https://whatimg.com/i/Fr5gP9.png' style='border:none !important; height:6px;'/> DR";
      	albumxlink.target = "_blank";
	    albumxlink.setAttribute('style','margin-left: 1em; font-size: 6pt');
    	albumxlink.href = "http://dr.loudness-war.info/album/list?artist=" + artist.replace(/\ /g,'+') + "&album=" + albumx.replace(/\ /g,'+').replace(/\%20/g,'+');
    	albumlist[x].getElementsByTagName('strong')[0].appendChild(albumxlink);
  	}
  }
}
)();