// ==UserScript==
// @name           4chan CAPTCHA reminder
// @namespace      4chan
// @description    Reminds you to fill in the CAPTCHA when you leave it blank.
// @match          *://boards.4chan.org/*
// @include        http://boards.4chan.org/*
// @include        https://boards.4chan.org/*
// @grant          none
// @version        0.2
// ==/UserScript==

var form = document.forms.namedItem("post");
if (form) {
	var captcha = document.getElementById("recaptcha_response_field");
	if (captcha) {
		form.addEventListener("submit", function(evt) {
			if (captcha.value !== "") {
				return true;
			} else {
				captcha.style.backgroundColor = "#FF6347";
				captcha.focus();

				evt.preventDefault();
				return false;
			}
		});
	}
}
