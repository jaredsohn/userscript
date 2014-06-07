// ==UserScript==
// @name          zhihu better SNR
// @namespace     http://metaphox.name/zhihubettersnr/
// @description   it is simply RUDE to show every freaking new answer in every freaking topic.
// @include       http://*.zhihu.com/*
// @version       0.1.4
// ==/UserScript==

(function(){var rud3n3ssl3ssn3ss = function(){
	var foo = document.querySelectorAll('h2+div');
	for(var i=0, j=foo.length; i<j; i++){
		if(foo[i] && foo[i].innerText.indexOf('添加了一个回答') != -1){
			foo[i].parentNode.style.display = 'none';
		}
	}
}
rud3n3ssl3ssn3ss();
document.onscroll = rud3n3ssl3ssn3ss;})();
