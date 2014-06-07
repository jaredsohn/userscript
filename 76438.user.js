// ==UserScript==
// @name          VisualMathCaptcha Solver
// @description   Solves math equations in VisualMathCaptcha-protected wiki pages, like Miranda-IM.de
// @include       *wiki*
// ==/UserScript==

function XPath(Params) { return document.evaluate(Params, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); }

var captcha = XPath("//label[@for='wpCaptchaWord']");
if (captcha.snapshotItem(0)) {
    var theMath = XPath("//input[@id='wpCaptchaWord']");
    if (theMath.snapshotItem(0) && !isNaN(eval(captcha.snapshotItem(0).innerHTML))) {
        theMath.snapshotItem(0).value = eval(captcha.snapshotItem(0).innerHTML);
		window.document.getElementsByName("wpSave")[0].click();
	}
}