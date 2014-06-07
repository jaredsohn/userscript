// ==UserScript==
// @name           MailerMailer.com Unsubscribe Without Javascript
// @namespace      http://google_is_evil.com
// @description    Unsubscribe from mailermailer.com e-mail unsubscribe links without having to enable javascript.
// @include        http://*.mailermailer.com/x*
// @include        http://mailermailer.com/x*
// ==/UserScript==

var a = document.getElementsByTagName("form");
var c = document.createElement("input");
c.setAttribute("type", "submit");
c.setAttribute("value", "Submit");
for (b=0;b<a.length;b++) {
	a[b].appendChild(c);
}
