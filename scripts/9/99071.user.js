// ==UserScript==
// @name           Musicxray.com MP3 downloader
// @namespace      MxRD
// @description    Download Mp3 from Musicxray.com
// @include        http://www.musicxray.com/focus_group_allocations
// ==/UserScript==
      

var songs = document.getElementsByTagName("audio");       
      
for(var i=0; i<songs.length; i++)
{
  var url = songs[i].getAttribute("data-mp3");
  var myLink = document.createElement('a');
  myLink.innerHTML = "<a href='" + url + "'>-DOWNLOAD-</a>";
  songs[i].parentNode.appendChild(myLink);
}


