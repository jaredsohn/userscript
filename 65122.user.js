// ==UserScript==
// @name           aamaker2unicodemoticon
// @namespace      http://twitter.com/rokudenashi
// @include        http://amachang.sakura.ne.jp/misc/aamaker/
// ==/UserScript==
// using http://fuba.moaningnerds.org/unicodemoticon/?⺌•‿•⺌ by fuba

(function(){
var w = this.unsafeWindow || window

const emoticon_api_url = 'http://fuba.moaningnerds.org/unicodemoticon/?';

var img = document.createElement('img');
img.src = emoticon_api_url + w.elm.textContent;
document.body.appendChild(img);
var originGenarate = w.generate;
w.generate = function(){
	originGenarate();
	img.src = emoticon_api_url + encodeURIComponent(w.elm.textContent);
}

})()
