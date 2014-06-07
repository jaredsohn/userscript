// ==UserScript==
// @name           Youku HTML5 Player
// @namespace  http://twitter.com/minjun
// @include        http://v.youku.com/v_show/id_*.html
// ==/UserScript==
var videoCss = ['', 'width:610px', 'height:458px', 'top:-500px', 'left:50%', 'border:1px solid #999', 'z-index:1000000000000', 'background:#000', 'box-shadow:0 0 5px #333', '-webkit-transition:top 1s ease;', '-moz-transition:top 1s ease;', '-o-transition:top 1s ease;', 'transition:top 1s ease;', ''];

var url = document.URL;
var video_id = url.substring(29, url.length - 5);
var video_html5_url = 'http://3g.youku.com/pvs?id=' + video_id + '&format=3gphd';
//alert(video_id);
var video = document.createElement('video');
video.setAttribute('height', '458');
video.setAttribute('width', '610');
video.setAttribute('controls', 'true');
video.style.cssText += videoCss.join(';');
video.src = video_html5_url;

document.getElementById('player').innerHTML='';
document.getElementById('player').appendChild(video);