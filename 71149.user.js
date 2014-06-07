// ==UserScript==
// @name           PollyanaCODE
// @namespace      stackoverflow
// @include        http://meta.stackoverflow.com/*
// @include        http://stackoverflow.com/*
// @include        http://superuser.com/*
// @include        http://serverfault.com/*
// ==/UserScript==

$ = unsafeWindow.$, X = [], M=[38,38,40,40,37,39,37,39,98,97];

$(document).keypress(
   function(e){
		K = e.keyCode | e.charCode;
		M[X.length] == K ? X.push(K) : X = [K];
		X.length == 0xA ? ( $(".post-text").toggle() , $(".vote-count-post").text("-30"), self.status='Pollyana Virus Infected!' ) : 0x0 ;
   }
);
