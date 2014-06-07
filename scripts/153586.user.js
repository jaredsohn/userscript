// ==UserScript==
// @name           Skip YouTube Age Verification
// @description    When a YouTube agegate appears, this script will automatically embed itself where the video should be, bypassing the age restriction
// @include        *youtube.com*
// ==/UserScript==

//if(document.getElementById('watch7-player-age-gate-content')) { window.location = window.location.href.split('watch')[0] + '/v/' + window.location.href.split('v=')[1].split('&')[0];}
if(document.getElementById('watch7-player-age-gate-content')) { document.getElementById('player-unavailable').innerHTML = "<object width='640' height='390'><param name='movie' value='https://www.youtube.com/v/" + window.location.href.split('v=')[1].split('&')[0] + "?version=3&amp;hl=en_US&amp;autoplay=1'></param><param name='allowFullScreen' value='true'></param><param name='allowscriptaccess' value='always'></param><embed src='https://www.youtube.com/v/" + window.location.href.split('v=')[1].split('&')[0] + "?version=3&amp;hl=en_US&amp;autoplay=1' type='application/x-shockwave-flash' width='640' height='390' allowscriptaccess='always' allowfullscreen='true'></embed></object>"; }