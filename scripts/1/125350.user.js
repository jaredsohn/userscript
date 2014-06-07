// ==UserScript==
// @name           YouTube: Extended Video Manager
// @namespace      http://www.youtube.com/
// @version        0.5
// @copyright      2012, DerET
// @include        *.youtube.com/my_videos*
// @include        *.youtube.com/view_all_playlists*
// @include        *.youtube.com/my_history*
// @include        *.youtube.com/my_search_history*
// @include        *.youtube.com/my_favorites*
// @include        *.youtube.com/my_liked_videos*
// @exclude        *.youtube.com/my_videos_*
// ==/UserScript==

loadlightstyle = 1;		// Enable light style
highresthumbs = 1;		// Enable high resolution thumbnails
vm_colouredthumbs = 0;		// Enable coloured thumbs
updatecheck = 1;		// Automatically check for updates

version = '0.5';		// Do not change this

// Dynamic style
if (loadlightstyle == 1) {
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = 'http://deret.square7.ch/userscripts/YouTube_ExtendedVideoManager/video-manager.css';
  document.getElementsByTagName("HEAD")[0].appendChild(link);
}

// Coloured thumbs
if (vm_colouredthumbs == 1) {
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = 'http://deret.square7.ch/userscripts/YouTube_ExtendedVideoManager/vm_colouredthumbs.css';
  document.getElementsByTagName("HEAD")[0].appendChild(link);
}

// High resolution thumbnails
if (highresthumbs == 1) {
  imgtags = document.getElementsByTagName('img');
  imgcount = imgtags.length;

  for (i=0; i < imgcount; i++) {
    var thumb = document.getElementsByTagName('img')[i].src;
    hqthumb = thumb.replace('/default.jpg', '/hqdefault.jpg');
    document.getElementsByTagName("img")[i].src = hqthumb;
  }
}

// Check periodically for vm-history-more
if (highresthumbs == 1 && window.location.pathname.substring(0, 11) == '/my_history') {
  oldimgcount = imgcount;
  
  function highreshistory() {
    imgtags = document.getElementsByTagName('img');
    imgcount = imgtags.length;
	
    if (imgcount != oldimgcount) {
      for (i = oldimgcount - 50; i < imgcount; i++) {
        var thumb = document.getElementsByTagName('img')[i].src;
        hqthumb = thumb.replace('/default.jpg', '/hqdefault.jpg');
        document.getElementsByTagName("img")[i].src = hqthumb;
      }
    }

    oldimgcount = imgcount;

    setTimeout(highreshistory, 2500);
  }
  
  highreshistory();
}

// Place 'Extended Video Manager by DerET' below all videos
var credits = document.createElement('div');
credits.style.textAlign = 'center';
credits.style.fontSize = '80%';
credits.innerHTML = 'Extended Video Manager by DerET';
document.getElementById('vm-pagination').appendChild(credits);

// Correct footer width and position
var footercontainer = document.createElement('div');
footercontainer.style.width = '788px';
footercontainer.style.margin = 'auto';
document.getElementById('footer').appendChild(footercontainer);
footercontainer.appendChild(document.getElementById('footer-logo'));
footercontainer.appendChild(document.getElementById('footer-main'));

// Check for updates
if (updatecheck == 1) {
  GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://deret.square7.ch/userscripts/YouTube_ExtendedVideoManager/version.txt',
    onload: function(responseDetails) {
      updateav(responseDetails.responseText);
    }
  });
    
  function updateav(newversion) {
    if (version != newversion) {
      alert('A new update is available!');
      window.location.href = 'http://userscripts.org/scripts/source/125350.user.js';
    }
  }
}
