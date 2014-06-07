// ==UserScript==
// @name           mounenasai
// @namespace      http://ada.tumblr.com/
// @include        *
// ==/UserScript==

var defaultLimit = 1;
var imgURL = 'http://26.media.tumblr.com/tumblr_kwrg33a9eC1qzd8axo1_500.jpg';

var limit = GM_getValue('limit') - 0;
if( typeof limit == 'undefined' ) limit = defaultLimit;

var d = new Date();
var now = d.getHours();

if (now < 12) now = now + 24;
if (limit < 12) limit = limit + 24;

if (now >= limit) {
	var div = document.createElement('div');
	document.body.appendChild(div);
	div.setAttribute('id', 'nenasai');
	div.setAttribute('style', 'position:absolute; top:40px; width:100%; z-index:250; text-align:center;');
	div.innerHTML = '<img src="' + imgURL + '" style="border:1px solid #aaa">';
	div.addEventListener('click', function(){
		this.setAttribute('style', 'display:none;');
	}, false)
}

GM_registerMenuCommand('mounenasai', function(){
	var currentLimit = (limit > 23) ? limit - 24 : limit;
	var newLimit = prompt('何時に寝ますか？（0～23で入力）', currentLimit);
	GM_setValue('limit', newLimit);
})