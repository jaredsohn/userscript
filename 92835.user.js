// ==UserScript==
// @name           Angel quiz fix
// @namespace      http://www.google.com/
// @include        https://tc3.sln.suny.edu/*
// ==/UserScript==

var arr = document.getElementsByTagName("div");
var s = "";
for (i = 0; i < arr.length; i++) {
   if (arr[i].className == "questionContainer") {
		if (s = arr[i].innerHTML.match(/<a[^>]*onclick=.*<.a>/i)) {
			s=s[0];
			s=s.replace(/href="[^"]*"/i, "");
			s=s.replace(/<a/i, "<b");
			s=s.replace(/a>/i, "b>");
			arr[i].innerHTML = arr[i].innerHTML.replace(/<a[^>]*onclick=.*<.a>/i, s);
		}
	}
	else if (arr[i].id == "buttons") {
		if (s=arr[i].innerHTML.match(/<input[^>]*id="SubmitButton"[^>]*>/i)) {
			s=s[0];
			s=s.replace("onclick=\"", "onclick=\"this.form.target='_blank';");
			arr[i].innerHTML = arr[i].innerHTML.replace(/<input[^>]*id="SubmitButton"[^>]*>/i, s);
		}
	}
}
var arr = document.getElementsByTagName("form");
var s = "";
for (i = 0; i < arr.length; i++) {
	if (s=arr[i].innerHTML.match(/<input[^>]*id="btnContinue"[^>]*>/i)) {
		s=s[0];
		s=s.replace("onclick=\"", "onclick=\"this.form.target='_blank';");
		arr[i].innerHTML = arr[i].innerHTML.replace(/<input[^>]*id="btnContinue"[^>]*>/i, s);
	}
}
