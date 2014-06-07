// ==UserScript==
// @name          Bloglines LightBox
// @version       1.0
// @description	  This script displays target website in iframe with lightbox effect instead of opening a new window
// @namespace     http://webdev.yuan.cc/
// @include       http://www.bloglines.com/myblogs_display*

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

function lightBox(url) {

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
    imgZone.style.position = 'fixed';
    imgZone.style.zIndex = 10001;
    imgZone.style.top = '55px';
    imgZone.style.background = '#ffffff';
    imgZone.style.height = '80%';
//    imgZone.style.left = (document.body.clientWidth-875)/2 + 'px';
    imgZone.style.left = '50px';
    var w = document.body.clientWidth -100;
    var h = document.body.clientHeight-200;
    imgZone.innerHTML = '<div style="color:#1393c0;width:'+w+'px;overflow:hidden;text-align:left;padding:4px 0px 4px 0px;background:#ddd;font-size:12px">&nbsp;&nbsp;<b>'+url+'</b></div>';
    imgZone.innerHTML += '<iframe src="'+url+'" width="'+w+'" height="100%" frameborder="0"></iframe>';
    imgZone.innerHTML += '<br /><div style="text-align:right;padding:4px;background:#ddd;font-size:12px"><span style="float:left"><a href="'+url+'" target="_blank"><b>Open in new window</b></a> | <a href="'+url+'"><b>Open in current window</b></a></span><a href="http://webdev.yuan.cc/greasemonkey/lightbox.html" target="_blank">Powered by Yuan.CC</a></div>';
    document.body.appendChild(imgZone);
}

var re = /^siteItem\.\d+\.\d+$/;
var str ='';
var bookmarks = _gt('div');
for(var i=0; i<bookmarks.length; i++) {
    var m = re.exec(bookmarks[i].id);
    if( !m || m.length == 0 ) continue;
    var id = m[1];
    var links = bookmarks[i].getElementsByTagName('a');
    for(var j=0; j<links.length; j++) {
	if( links[j].className != 'bl_itemtitle' ) continue;
	url = links[j].href;
	links[j].href = 'javascript:;';
	links[j].target = '';
	links[j].title = url;
	links[j].addEventListener('click', function() { 
	    lightBox(this.title);
	}, true);
    }
}


})();

