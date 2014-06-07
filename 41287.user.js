// ==UserScript==
// @name           LiveMocha Show Submissions
// @namespace      livemochashowsubmissions
// @description    Shows a link to view all user submissions. Displays submissions with comments by default.
// @include        http://*.livemocha.com/profiles/*
// @include        http://livemocha.com/profiles/*
// ==/UserScript==
var cdiv = document.getElementsByTagName('h3');
for (var i = 0; i < cdiv.length; i++) {
	var element = cdiv[i];
	if (/Submissions/.test(element.innerHTML) || /Envíos/.test(element.innerHTML) || /Envios/.test(element.innerHTML) || /提交内容/.test(element.innerHTML) || /제출물/.test(element.innerHTML) || /提出物/.test(element.innerHTML)) {
		var splitstring = location.pathname.split("/");
		var userid = splitstring[splitstring.length - 1].split("?");
		var newHTML = '&nbsp;<a href="/submissions/list_user_submissions/user_id:' + userid[0] + '?data[Filter][comments]=1" style="font-size:10px;">View all</a>';
		element.innerHTML += newHTML;
	}
}