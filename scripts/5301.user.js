// ==UserScript==
// @name          HEMiDEMi LightBox
// @version       1.0
// @description	  This script displays target website in iframe with lightbox effect instead of opening a new window
// @namespace     http://webdev.yuan.cc/
// @include       http://*.hemidemi.com/*

// v1.0	08/22/06	initial release
//
// Author: .CK ( http://www.flickr.com/photos/ckyuan/ )
// Web site: http://webdev.yuan.cc/
//           http://flickr.tw/
//
// ==/UserScript==

(function() {


if(unsafeWindow) w = unsafeWindow;
else w = window;
var global_photos = w.global_photos;

function _gt(e) { return document.getElementsByTagName(e); }
function _gi(e) { return document.getElementById(e); }
function _ce(e) { return document.createElement(e); }
function _ct(e) { return document.createTextNode(e); }
w._gi = _gi;

function lightBox(url) {

//  GM_log(document.body.clientHeight + ', ' + window.pageYOffset);
    var disabledZone = _ce('div');
    disabledZone.id = 'disabledZone';
    disabledZone.setAttribute('style', 'background-color: #000000; -moz-opacity: 0.75');
    disabledZone.style.position = 'absolute';
    disabledZone.style.zIndex = 10000;
    disabledZone.style.left = '0px';
    disabledZone.style.top = '0px';
    disabledZone.style.width = '100%';
    disabledZone.style.height = document.body.clientHeight + 'px';
    disabledZone.addEventListener('click', function() {
        delete document.body.removeChild(_gi('imgZone'));
        delete document.body.removeChild(this);
    }, true);
    document.body.appendChild(disabledZone);

    var imgZone = _ce('div');
    imgZone.id = 'imgZone';
//    imgZone.style.position = 'absolute';
    imgZone.style.position = 'fixed';
    imgZone.style.zIndex = 10001;
    imgZone.style.top = '55px';
    imgZone.style.background = '#ffffff';
    imgZone.style.height = '85%';
    imgZone.style.left = (document.body.clientWidth-875)/2 + 'px';
    var h = document.body.clientHeight-200;
//    imgZone.innerHTML = '<iframe src="'+url+'" width="875" height="'+h+'" frameborder="0"></iframe>';
    imgZone.innerHTML = '<iframe src="'+url+'" width="875" height="100%" frameborder="0"></iframe>';
    imgZone.innerHTML += '<br /><div style="text-align:right;padding:4px;background:#ddd;font-size:12px"><span style="float:left"><a href="'+url+'" target="_blank"><b>Open in new window</b></a> | <a href="'+url+'"><b>Open in current window</b></a></span><a href="http://webdev.yuan.cc/greasemonkey/lightbox.html" target="_blank">Powered by Yuan.CC</a></div>';
    document.body.appendChild(imgZone);
}

var re = /^b_(\d+)$/;
var bookmarks = _gt('div');
for(var i=0; i<bookmarks.length; i++) {
    var m = re.exec(bookmarks[i].id);
    if( !m || m.length == 0 ) continue;
    var id = m[1];
    var links = bookmarks[i].getElementsByTagName('a');
    for(var j=0; j<links.length; j++) {
	if( links[j].className != 'title' ) continue;
	event = links[j].getAttribute('onmouseover');
	re2 = /[^']+'([^']+)'/;
	m2 = re2.exec(event);
	if(!m2) continue;
	url = m2[1];
	links[j].href = 'javascript:;';
	links[j].target = '';
	links[j].title = url;
	links[j].addEventListener('click', function() { 
	    lightBox(this.title);
	}, true);
    }
}


})();

