// ==UserScript==
// @name           alimama remove
// @namespace      thenow.yo2.cn
// @description    移除阿里妈妈广告
// ==/UserScript==
var frame;
var allFrames = document.getElementsByTagName('iframe');

for(var i = 0; i<allFrames.length; i++){
	frame = allFrames[i];
	if(frame.getAttribute('src').indexOf('alimama.com') != -1){
		frame.setAttribute('src','');
		frame.style.display ='none';
	}
}