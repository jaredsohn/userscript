// ==UserScript==
// @name           Youtube video replacement
// @namespace      meh
// @description    Do you hate your sister? Redirect all her videos to "Im on a Boat!" or whatever video you want that allows embeding.
// @include        http://www.youtube.com/watch?*
// ==/UserScript==

//Replace string below with video id of desired replacement.
var video='R7yfISlGLNU';
document.getElementById('watch-player-div').innerHTML = '<object width="100%" height="100%"><param name="movie" value="http://www.youtube.com/v/' + video + '&hl=en&fs=1&autoplay=1&rel=0"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/' + video + '&hl=en&fs=1&autoplay=1&rel=0" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="100%" height="400"></embed></object>';
