// ==UserScript==
// @name        IT
// @namespace   Mana
// @description Prevent smileys to be posted on jeuxvideo.com
// @include     http://www.jeuxvideo.com/forums/0-*
// @include     http://www.jeuxvideo.com/forums/3-*
// @version     1
// ==/UserScript==

function post() {
	var form, message, control, submit;
	form = document.getElementById("post");
	message = document.getElementById("newmessage");
	if (form && message) {
		control = String.fromCharCode(31);
		form.addEventListener("submit", function () {
			message.value = message.value.split(":" + control).join(":");
			message.value = message.value.split(":").join(":" + control);
		}, false);
	}
}
post();
