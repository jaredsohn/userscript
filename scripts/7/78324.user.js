// ==UserScript==
// @name           niconico_auto_login
// @namespace      http://hecomi.com/
// @include        http://www.nicovideo.jp/watch/*
// @include        https://secure.nicovideo.jp/secure/login_form*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

$(function(){
	/* setting */
	var mail   = "";  // e-mail
	var password = "";       // password

	/* pattern */
	var first  = $("#PAGEBODY table:first a:first");
	var second = $("#login");
	
	/* autologin */
	if (mail != "" && password != "") {
		if (first.size()) {
			var url = first.attr("href");
			if (url != "#") location.href = url;
		}
		else if (second.size()) {
			$("#mail").val(mail);
			$("#password").val(password);
			second.submit();
		}
	}
})();
