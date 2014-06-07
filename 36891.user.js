// ==UserScript==
// @name           Twitter Link Patch
// @namespace      Twitter
// @include        http://twitter.com/*
// ==/UserScript==

(function(){
document.body.innerHTML=document.body.innerHTML.replace(
	/(@<a href="\/)([0-9A-Z_a-z]+)([^\"#0-9A-Z_a-z][^\"]+)">([^<]+)<\/a>/ig,
	function(str,m1,m2,m3,m4){
		var m3_=decodeURI(m3);
		if(m2+m3_==m4) return m1+m2+"\">"+m2+"</a>"+m3_;
		return str;
	})
})();
