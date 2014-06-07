// ==UserScript==
// @name           vkontakte.ru loginform email autofill
// @namespace      http://userscripts.org/
// @description    automatically fills email into login form at vkontakte.ru
// @include        http://vkontakte.ru/*
// @include        http://*.vkontakte.ru/*
// @include        http://vk.com/*
// @include        http://*.vk.com/*
// ==/UserScript==


function main() {
	var email = "email@email.com";

	var isLoginForm = document.getElementById("quick_login_form") || document.getElementById("login");
	if (isLoginForm) {
		var emailBox = document.getElementById("quick_email");
		if (emailBox) {
			emailBox.value = email;
		}
		document.login.pass.focus();
//		document.getElementById("quick_pass").focus();
	}
}
main();
