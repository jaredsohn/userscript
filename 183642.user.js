// ==UserScript==
// @name        Dobrochan Reply Links Lite
// @namespace   dc_replies_lite
// @description Show replies at the bottom of every post.
// @include     *dobrochan.*
// @homepage    https://github.com/Unknowny/dobroscript
// @updateURL   https://github.com/Unknowny/dobroscript/raw/master/Dobrochan Reply Links Lite.user.js
// @downloadURL https://github.com/Unknowny/dobroscript/raw/master/Dobrochan Reply Links Lite.user.js
// @version     1.0.2
// ==/UserScript==

ParseUrl = function(url){//Hanabira's ParseUrl() is broken
    m = (url || document.location.href).match( /https?:\/\/([^\/]+)\/([^\/]+)\/((\d+)|res\/(\d+)|\w+)(\.x?html)?(#i?(\d+))?/)
    return m?{host:m[1], board:m[2], page:m[4], thread:m[5], pointer:m[8]}:{};
};
Hanabira.URL = ParseUrl();

var refs = $('.message a').filter(function (){
		return /\>\>\d\d/.test( $(this).text() );
	});
refs.each( function(){
	var el = $(this),
		idTo = el.text().substr(2),
		idFrom = el.parents()[2].id.substr(5),
		href = el.attr('href');
	$('#post_' + idTo +  ' .abbrev').append('<a ' +
			'onclick="Highlight(event, '+idFrom+')" ' +
			'onmouseover="ShowRefPost(event, \''+ Hanabira.URL.board +'\', '+(Hanabira.URL.thread || idTo/*hack*/)+', '+idFrom+')" ' +
			'href="'+href+'" '+
			'style="font-size:70%;text-decoration:none;opacity:.8;font-style:italic;"'+
			'>&gt;&gt;'+idFrom+'</a> '
	);
});