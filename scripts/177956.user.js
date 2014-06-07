// ==UserScript==
// @name        quora auto forward
// @namespace   http://userscripts.org/users/anon
// @include     http://www.quora.com/*
// @version     1
// ==/UserScript==
if(
	//If we have not yet redirected (this prevents redirect loops in case Quora changes something)
	location.href.indexOf("share=1") <1
	&& (
		//If we find the infamous signup overlay or a blurred answer
		document.getElementsByClassName("modal_signup_dialog").length > 0
		|| document.getElementsByClassName("blurred_answer").length > 0)
	) {
	//we initiate a redirect after the dust has settled
	setInterval(function(){
		//Our new location shall be the old one, but all parameters shall be removed, and a new one shall be added, indicating that we come from some social page or tell-a-friend mail.
		location.href = location.href.replace(/\?.*$/,"") + "?share=1";
	}, 1500);
}