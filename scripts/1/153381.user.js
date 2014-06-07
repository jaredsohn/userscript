// ==UserScript==
// @name        Celibest Zoom Pictures in search
// @namespace   F4rf3lu
// @include     http://www.celibest.com/search*
// @version     1
// ==/UserScript==

(function () {
var img = document.getElementsByTagName('img'),
imgclass = ['photo', 'photo2'],
bigurl = 'http://www.celibest.com/media/photos/photos/',
zoom = document.createElement('div');
zoom.style.cssText = 'display:none;position:fixed;z-index:9999;margin:100px 0 0 500px;width:400px;height:400px;background-color:#FFF;';
document.body.appendChild(zoom);
for (var i in img) {
	if (img[i].className && img[i].className.indexOf(imgclass)) {
		img[i].onmouseover = function () {
			zoom.innerHTML = '<img src="'+bigurl+this.src.slice((this.src.lastIndexOf('/'))+1)+'" />'; zoom.style.display = 'block';	
		};
		img[i].onmouseout = function () {
			zoom.innerHTML = ''; zoom.style.display = 'none';
		};
	}
}
})();
