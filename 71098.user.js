// ==UserScript==
// @name           twibclean
// @namespace      mry
// @include        http://twib.jp/*
// ==/UserScript==

function twibclean(){
	var
		posts = document.getElementsByClassName('post'),
		i = 0,l = posts.length,
		re = /shindanmaker\.com|king\-soukutu\.com|ったー/;
	
	for(;i<l;i++){
		if(re.test(posts[i].innerHTML)){
			posts[i].style.display = 'none';
		}
	}
}
(function(){
	twibclean();
	
	//pagerize
	var f = 0;
	document.addEventListener('DOMNodeInserted',function(){
		if(f < 19){ f++; return false;}
		twibclean();f = 0;
	},false);
})();