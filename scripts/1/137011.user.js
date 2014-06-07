// ==UserScript==
// @name Youtube Support
// @author Tommy Smith
// @version 1.1
// @include http://www.youtube.com/watch*
// @include https://www.youtube.com/watch*
// ==/UserScript==
{
var ytidend = window.location.href.indexOf("&");
if (ytidend == -1) {
ytidend = window.location.href.length;
}
var ytid = window.location.href.substring(window.location.href.indexOf("/watch?v=")+9, ytidend);
document.getElementById('watch-video').innerHTML = '<object width="640" height="360"><param name="movie" value="http://www.youtube.com/v/'+ytid+'&hl=en&feature=player_embedded&version=2"></param><param name="allowFullScreen" value="true"></param><embed src="http://www.youtube.com/v/' + ytid +'&hl=en&feature=player_embedded&version=2&autoplay=1&loop=0&fs=1" type="application/x-shockwave-flash" allowfullscreen="true" width="640" height="360"></embed></object>';
}