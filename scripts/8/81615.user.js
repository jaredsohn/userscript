// ==UserScript==
// @name           Vusys' Delounger
// @description    Redirects subreddits with obnoxious CSS to a '+null' URL that reverts it to the default style
// @include        http://www.reddit.com/r/*
// ==/UserScript==

var badCSS = ["lounge", "circlejerk"];

for (var i=0; i < badCSS.length; i++) {
	if( location.href.indexOf('/r/' + badCSS[i]) != -1 && location.href.indexOf('/r/'+badCSS[i]+'+null') == -1 ){
		window.location = location.href.replace('/r/' +badCSS[i] , '/r/'+badCSS[i]+'+null');
		break;
	}
}
