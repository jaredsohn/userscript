// ==UserScript==
// @name           4chan_captcha_prefill
// @namespace      4chan
// @include        http://boards.4chan.org/*
// @version		1.0
// @description	Captcha prefiller for 4chan prefills the fake word of the captcha with a certain word so you only need to append/prepend the 'check' word.
// ==/UserScript==

document.getElementById("recaptcha_response_field").value="nigger";
document.getElementById("recaptcha_reload_btn").href = document.getElementById("recaptcha_reload_btn").href + "setTimeout(\"document.getElementById(\\\"recaptcha_response_field\\\").value = \\\"nigger\\\"\", 300); void 0";
