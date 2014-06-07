// ==UserScript==
// @name           ugotfile++
// @namespace      #aVg
// @description    Time attack for ugotfile.
// @include        http://ugotfile.com/file/*
// @version        0.1
// @license        CC by Attribution-Noncommercial-No Derivative Works 3.0 Unported (http://creativecommons.org/licenses/by-nc-nd/3.0/)
// ==/UserScript==
(function() {
function $(A) {return document.getElementById(A)}
function single(A, B) {return document.evaluate("." + A, B || document.body, null, 9, null).singleNodeValue}
function remove(A) {if(A) A.parentNode.removeChild(A);return remove}
remove($("headerUpgrade"))(single("/../..", $("codo")))(single("//span[@class='boldGreen']/.."))(single("//a[@href='/user/upgrade']/.."));
var cp = $("ugfCaptchaKey"), jq = unsafeWindow.$;
cp.setAttribute("style", "border: 2px solid black; font-size: 36px; margin-top: -16px; font-weight: bold;");
cp.addEventListener("keyup", function() {
	this.value = this.value.toUpperCase().replace(/[^0-9A-Z]/g, "");
	if(this.value.length != 4) return;
	jq.get("/captcha?key=" + cp.value, function (data) {
		if(data=="valid") {
			jq(".ugfCaptcha").addClass("hidden");
			jq("h1.ugfCountDown").countdown({
				seconds: 16,
				callback: "getFile()"
			});
			jq("tr.ugfCountDown").removeClass("hidden");
			return;
		}
		unsafeWindow.captchaReload();
		jq(".ugfCaptchaError").removeClass("hidden");
		cp.value = "";
	});
}, false);
})();