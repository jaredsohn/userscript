// ==UserScript==
// @name       Indian Railway PNR Enquiry Skip Captcha
// @namespace  http://saneef.com/
// @version    0.1
// @description  Indian Railway uses a bad captcha implementation. Can be skipped by scripts.
// @match      http://www.indianrail.gov.in/pnr_Enq.html
// @copyright  2014, Saneef Ansari
// ==/UserScript==

var gzIntervalId, gzCaptchaText, gzTxtField, gzFnCheckAndCopy;

gzFnCheckAndCopy = function() {
    gzCaptchaText = document.getElementById("txtCaptchaDiv");
    gzTxtField = document.getElementById("txtInput");
    
    if (gzCaptchaText.textContent != "") {
		clearInterval(gzIntervalId);
        
        gzTxtField.value = gzCaptchaText.textContent;
    }
}

document.addEventListener("DOMContentLoaded", function(event) {
    gzIntervalId = setInterval(gzFnCheckAndCopy, 500);
});