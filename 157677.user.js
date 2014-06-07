// ==UserScript==
// @namespace http://userscripts.org/users/311626
// @name Filmovizija
// @version 1.0.0.1
// @description Improves user experience at http://www.filmovizija.com/ and http://www.filmovionline.org/.
// @match http://www.filmovizija.com/*/*-video_*.html
// @match http://www.filmovionline.org/*x*/*-video_*.html
// ==/UserScript==

var VIDFETCH_ROOT = 'http://vidfetch.com/demos/jwplayer';
var VIP_LINK = 'http://www.filmovizija.com/pages/vip-clan.html';

/* Set the video to be streamed from another site, thus avoiding in-video advertisements */
var player = document.getElementById('VideoPlayer');
// Matches a top-level domain, eg.: http://www.example.com/
var regExp = new RegExp('http://www\\..+?\\..+?/');
player.setAttribute('src', player.getAttribute('src').replace(regExp, VIDFETCH_ROOT + '/'));

/* Dismiss advertisements, allowing the video to start right away. */
// 'showReal' is a CSS value that hides the container
document.getElementById('adContainer').className = 'showReal';

/* Remove the reminder that VIP members need not wait for the video to load, */
/* as we already have that privilege. */
var detailPage = document.getElementById('detail_page');
// The notice exists only on some domains
if(detailPage !== null)
{
  var detailPageSpans = detailPage.getElementsByTagName('span');

  for(var i = 0; i < detailPageSpans.length; ++i)
  {
    // The notice contains a link to the VIP registration page
    // If the link is detected in this <span> ...
    if(detailPageSpans[i].innerHTML.indexOf(VIP_LINK) !== -1)
    {
      // ... remove it
      detailPageSpans[i].style.display = 'none';
      // Additionally, remove the succeeding break line
      detailPage.getElementsByTagName('br')[i].style.display = 'none';
    }
  }
}
