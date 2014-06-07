// ==UserScript==
// @name        get iTunes cover
// @namespace   get_iTunes_cover
// @author	ttph1oc
// @description 更方便地获取iTunes中的1200*1200的大封面。 
// @downloadURL	https://userscripts.org/scripts/source/175011.user.js
// @include     *itunes.apple.com/*
// @include     *.mzstatic.com/*
// @version     0.1
// @grant	none
// @run-at document-end
// ==/UserScript==
var getUrl = function(url) {
	var false_reg = /\d{3}x\d{3}/;
	var true_reg = /1200x1200/;
	if (false_reg.test(url) && !true_reg.test(url)) {
		url = url.replace(false_reg, '1200x1200');
		return url;
	}
};

var zoomed_url = getUrl(location.href);
if (zoomed_url) {
	location.href = zoomed_url;
}

var origin_targets = document.getElementsByClassName('artwork');
var cover_container = document.createElement('div');
cover_container.id = 'cover_container';
cover_container.style.cssText = 'display:none;position:fixed;top:0;left:0;z-index:9999;width:100%;height:100%;background:rgba(0,0,0,.8);';
cover_container.onclick = function(e){
	if(e.target.tagName === 'DIV'){
		this.style.display = 'none';
	}
}
document.body.appendChild(cover_container);
onkeydown = function(e){
	if(e.keyCode === 27){
		cover_container.click();
	}
}

for (var i = 0; i < origin_targets.length; i++) {
	(function(i) {
		var item = origin_targets.item(i);
		if (item.tagName === 'IMG') {
			item.addEventListener('click', function() {
				cover_container.style.display = 'block';
				cover_container.innerHTML = '<img src="' + getUrl(item.src) + '" style="box-shadow:0 0 10px #000;width:500px;height:500px;margin:-250px 0 0 -250px;position:fixed;top:50%;left:50%;"/>';
				return !1;
			}, !1);
		} else if (item.tagName === 'DIV') {
			item.parentNode.href = getUrl(item.firstChild.src);
			item.parentNode.onclick = function() {
				return !1;
			};
		}
	})(i);
}