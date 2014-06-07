// ==UserScript==
// @name           Do teilmenge
// @namespace      do
// @include        http://de.desert-operations.com/world1//handel.php?*
// ==/UserScript==
/*
function captcha(eForm) {
    if ($("captchaForm") != null) {
        $("captchaForm").remove();
    }
    var scrOff = getScrollY();
    var top = posy - 195 + scrOff;
    var splitCount = 0;
    if (eForm.splitted_count != undefined && eForm.splitted_count != null) {
        splitCount = eForm.splitted_count.value * 2;
    }
    var tid = eForm.tid.value;
    var qs = eForm.queryString.value;
    new (Ajax.Request)("Webservices/getCaptcha.php", {parameters: {splitCount: splitCount, tid: tid, buy: "OK", qs: qs, imgPrfx: "images/classic", top: top}, method: "post", onSuccess: function (transport) {elements = $$("body");elements[0].insert(transport.responseText);new (Effect.Grow)("captchaForm", {duration: 0.2, direction: "top-left"});}});
}
*/
window.location = 'javascript: function captcha(eForm) {    if ($("captchaForm") != null) {        $("captchaForm").remove();    }    var scrOff = getScrollY();    var top = posy - 195 + scrOff;    var splitCount = 0;    if (eForm.splitted_count != undefined && eForm.splitted_count != null) {        splitCount = eForm.splitted_count.value * 2;    }    var tid = eForm.tid.value;    var qs = eForm.queryString.value;    new (Ajax.Request)("Webservices/getCaptcha.php", {parameters: {splitCount: splitCount, tid: tid, buy: "OK", qs: qs, imgPrfx: "images/classic", top: top}, method: "post", onSuccess: function (transport) {elements = $$("body");elements[0].insert(transport.responseText);new (Effect.Grow)("captchaForm", {duration: 0.2, direction: "top-left"});}});}; void 0';