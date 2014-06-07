// ==UserScript==
// @name           Change To Google
// @description    Google Buttom On Baidu
// @author         GongT
// @include        http://www.baidu.com/s
// @version        1.0
// ==/UserScript==

$(document).ready(function (){
	$("form.fm").append($("span.btn_wr"));
	$($("input.btn")[1]).val("改用Google").click(function (){
		var url = "http://www.google.com.hk/#q=" + $("#kw").val();
		window.location.href = url;
		return false;
	});
});