// ==UserScript==
// @name Auto-Down MegaUpload By: Mack
// @include *.megaupload.*
// ==/UserScript==
if(document.getElementById("captchafield")) {
prompt=prompt('Digite o Captcha');
document.getElementById("captchafield").value=prompt;
window.location="javascript:checkcaptcha();";
}
if (document.getElementById("downloadcounter")) {
confirm = confirm("Fazer download ?");
if (confirm == true) {
var download = document.getElementsByTagName("a")[13].href;
window.location=download;
} else {
window.setTimeout("count = 1;", 500);
}
}