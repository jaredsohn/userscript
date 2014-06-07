// ==UserScript==
// @name           NAVER ISMS REWRITER4
// @namespace      BerrkeSY
// @description    Refresh URL Mobile-only to ISMS at Korea NAVER.COM
// @include        https://nid.naver.com/user/join_auth.nhn?a=mobile&m=begin&token_join=*
// ==/UserScript==

function generateLink() {
	var now = window.location.href;
	//alert(now);
	var link = now.replace('nhn?a=mobile&m', 'nhn?a=isms&m');
	location.href = link;
}
window.addEventListener("load", function(e) {
	alert("네이버 국내전용 인증을 우회합니다. 잠시 기다려주세요.");
	generateLink();
}, false);