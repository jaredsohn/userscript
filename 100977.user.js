// ==UserScript==
// @name           HackemUp
// @namespace      Mister Speaker
// @namespace      Aditya V. Mukherjee
// @description    Shows changes that happened on Hacker News' front page while you weren't looking.
// @include        http://news.ycombinator.com/
// @include	   http://news.ycombinator.com/news
// ==/UserScript==

(function(window){
    window.addEventListener('load', function(){
	    window.hnuBase = 'https://github.com/adityavm/HackemUp/raw/master/';
	    var a = document.getElementsByTagName('head')[0],
		b = document.createElement('script');
	    b.type = 'text/javascript';
	    b.src = hnuBase + 'hackem.js?' + Math.floor(Math.random() * 99999);
	    a.appendChild(b);
	}, true);
})(window);
