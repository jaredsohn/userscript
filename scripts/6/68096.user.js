// ==UserScript==
// @name           Google CAPTCHA Auto Fill In
// @namespace      xiang
// @description    Automatically fill in google account and password
// @include        https://www.google.com/accounts/DisplayUnlockCaptcha
// @include        https://www.google.com/accounts/UnlockCaptcha?
// @author			Xiang Chen
// @version			0.03
// ==/UserScript==

//------------------------ Config -------------------------------------------

var google_id = "idontcaremyid";
var google_pw = "norwouldicarepw";

document.getElementsByName("Email")[0].value = google_id;
document.getElementsByName("Passwd")[0].value = google_pw;
document.getElementsByName("unlockcaptchacaptcha")[0].focus();
