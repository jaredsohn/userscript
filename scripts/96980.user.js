// ==UserScript==
// @name           Old Youtube Player
// @namespace      CdN
// @include        http://*youtube.com/watch*
// @include        https://*youtube.com/watch*
// @author         Fedexx2
// @description	Utilizza il vecchio player flash su youtube
// ==/UserScript==

var cont = document.getElementById('watch-player');
cont.innerHTML = "";


var url = new String(window.location);
url = url.slice(url.indexOf('v=')+2);

var end = url.indexOf('&');
if(end > 0)
{
    url = url.substr(0,end);  
}


var oldcode = "<object width='640' height='385'> \
                  <param name='movie' value='http://www.youtube.com/v/" + url + "?fs=1&amp;hl=it_IT&autoplay=1'></param>\
                  <param name='allowFullScreen' value='true'></param>\
                  <param name='allowscriptaccess' value='always'></param>\
                  <embed src='http://www.youtube.com/v/"+url+"?fs=1&amp;hl=it_IT&autoplay=1' type='application/x-shockwave-flash' \
                  allowscriptaccess='always' allowfullscreen='true' width='480' height='385'></embed>\
              </object>";

cont.innerHTML = oldcode;
