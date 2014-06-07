// ==UserScript==
// @name        Feedback 163 BBS
// @namespace   net.robaggio
// @description 
// @include     http://bbs.news.163.com/bbs/*.html
// @include    http://bbs.news.163.com/*/article.jsp*
// @include		http://bbs.news.163.com/bbs/list.jsp?boardid=newsfeedback*
// ==/UserScript==

javascript:(function()
{
	"use strict";
	var cb = document.getElementById("copytoweibo");
	if(cb){cb.checked = "";}
	var links = document.getElementsByClassName('articleUrl');
	if(links){
	var ii=0;
	for(ii=0;ii<links.length;ii++){
		var aid = links[ii].href.split('.html')[0].split('/').slice(-1)[0];
		links[ii].href = "http://bbs.news.163.com/bbs/article.jsp?boardid=newsfeedback&articleid=" + aid;
	}}
})();