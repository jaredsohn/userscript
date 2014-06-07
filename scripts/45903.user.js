// ==UserScript==
// @name          Youtube Popout & Download links
// @description   Add Popout function and MP4/FLV download links to YouTube videos.
// @copyright     userscripts.org
// @include       http://*youtube.com/watch*
// ==/UserScript==

var id, url, mp, src, fv, t, l, wpd, mp4, flv, using_PreventAutoPlay;
l = location.href.replace(/#/g, '');
mp = document.getElementById('movie_player');
src = mp.getAttribute('src');
fv = mp.getAttribute('flashvars');

using_PreventAutoPlay=(fv.indexOf('t=') !== -1) ? false : true;

// Getting t
t=(using_PreventAutoPlay) ? src.split('t=')[1].split('&')[0] : fv.split('t=')[1].split('&')[0];

// Getting video id
id=(l.indexOf('&') == -1) ? l.split('v=')[1] : l.split('v=')[1].split('&')[0];

url = 'http://youtube.com/get_video?video_id='+id+'&t='+t;

function getEl(w) {return document.getElementById(w);}


function kill_str() {
unsafeWindow._gel('movie_player').stopVideo();
}

// Popout and Kill main player stream
function popout() {
window.open('http://youtube.com/swf/l.swf?video_id='+id+'&autoplay=1', 'youtube', 'menubar=0,width=640,height=385,scrollbars=0');
return kill_str();
}

mp4 = document.createElement('a');
mp4.innerHTML = '<font style="font-weight:bold; font-size:8pt">Save As MP4 file </font><img src="http://www.ferrovial.com/img/comunes/documentostipos/flv.gif" />';
mp4.setAttribute('rel', 'nofollow');
mp4.setAttribute('class', 'hLink');
mp4.href = url + '&fmt=18';

flv = document.createElement('a');
flv.innerHTML = '<font style="font-weight:bold; font-size:8pt">FLV file </font><img src="http://www.franke-all-in-one.com/img/flv.gif" />';
flv.setAttribute('rel', 'nofollow');
flv.setAttribute('class', 'hLink');
flv.href = url;

wpop = document.createElement('a');
wpop.innerHTML = '<font style="font-weight:bold; font-size:12pt">Popout <img src="http://www.google.com/reader/ui/2317887107-module-new-window-icon.gif" /></font>';
wpop.setAttribute('rel', 'nofollow');
wpop.setAttribute('class', 'hLink');
wpop.href = "javascript:void(0);";
wpop.addEventListener('click', popout, false);

kill = document.createElement('a');
kill.innerHTML = '<font style="font-weight:bold; font-size:12pt">Stop Stream</font>';
kill.setAttribute('rel', 'nofollow');
kill.setAttribute('class', 'hLink');
kill.href = "javascript:void(0);";
kill.addEventListener('click',kill_str, false);

wpd = getEl('watch-rating-div');
wpd.appendChild(wpop);
wpd.appendChild(document.createTextNode(' , '));
wpd.appendChild(kill);
wpd.appendChild(document.createTextNode(' , '));
wpd.appendChild(mp4);
wpd.appendChild(document.createTextNode(' , '));
wpd.appendChild(flv);