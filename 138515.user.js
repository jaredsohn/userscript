// ==UserScript==
// @name           carma.com.ua and autocarma.org comment form credentials autofill
// @namespace      http://userscripts.org/
// @description    automatically fills name and email into comment form at carma.com.ua and autocarma.org
// @include        http://carma.com.ua/*
// @include        http://www.carma.com.ua/*
// @include        http://autocarma.org/*
// @include        http://www.autocarma.org/*
// ==/UserScript==


function main() {
	var name = "Пользователь";
	var email = "email@email.com";

//	var isCommentForm = document.getElementById("_contacts");
//	if (isCommentForm) {
		var nameBox = document.getElementById("answer_name");
		if (nameBox) {
			nameBox.value = name;
		}

		var emailBox = document.getElementById("answer_email");
		if (emailBox) {
			emailBox.value = email;
		}
//	}
}
main();