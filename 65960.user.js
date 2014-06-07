// ==UserScript==
// @name           Try2Link Captcha Solver
// @namespace      #aVg
// @description    Solves captchas for try2link.
// @include        http://*try2link.com/*
// @license        CC by Attribution-Noncommercial-No Derivative Works 3.0 Unported (http://creativecommons.org/licenses/by-nc-nd/3.0/)
// @version        0.1.2
// ==/UserScript==
(function() {
function $(A, B) {document.getElementById(A).value = B;return $;}
$("confirm_image", "BhU")("hid_code", "876b64");
document.forms[0].submit();
})();