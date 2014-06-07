// ==UserScript==
// @name           Lepra Libre
// @namespace      ru.lepra.yedrill
// @author         yedrill & Prontiol1
// @description    Hide posts and comments rating
// @include        http://*leprosorium.ru/*
// @include        http://*leprosorium.ru/comments/*
// @exclude        http://*leprosorium.ru/users/*
// @exclude        http://*leprosorium.ru/my/*
// ==/UserScript==

GM_addStyle(".vote div span.rating em { display:none }");
GM_addStyle(".comments #content .mine .vote div span em { display:block }"); // comment out this line if you don't want to see the rating of your own comments by default
var __votePostOnLoad = unsafeWindow.votePostOnLoad;
unsafeWindow.votePostOnLoad = function(ajaxObj, params) {
	__votePostOnLoad(ajaxObj, params);
	params.r.style.display = 'block';
};
var __voteOnLoad = unsafeWindow.voteOnLoad;
unsafeWindow.voteOnLoad = function(ajaxObj, params) {
	__voteOnLoad(ajaxObj, params);
	params.r.style.display = 'block';	
}
var spans = document.getElementsByTagName("span");
var l = spans.length;
for (var i = 0; i < l; i++) {
	if(spans[i].className.indexOf("rating") != -1) {
		spans[i].addEventListener("click",  function(event) { this.childNodes[0].style.display='block'; }, false);
	}
}




