// ==UserScript==
// @name          Headache
// @namespace     http://infinivue.com/
// @description	  My test script - gives you a heacache.
// @include       *
// ==/UserScript==

(function(){var a=0,d=document.body.style;function f(){r='rotate('+(a>0?a-=.1:a+=.1)+'deg)';d['-webkit-transform']=d['MozTransform']=r;};setInterval(f,50);})();