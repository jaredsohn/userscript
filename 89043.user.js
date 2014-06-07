// ==UserScript==
// @name           Do teilmenge
// @namespace      do
// @include        http://de.desert-operations.com/*
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
    new (Ajax.Request)("Webservices/getCaptcha.php", {parameters: {splitCount: splitCount, tid: tid, buy: "OK", qs: qs, imgPrfx: "images/classic", top: top}, method: "post", onSuccess: function (transport) {elements = $$("body");elements[0].insert(transport.responseText);new (Effect.Grow)("captchaForm", {duration: 0.0, direction: "top-left"});}});
}
*/
try {
	var amount = document.getElementsByClassName("odd")[1].innerHTML.match(/\d[\.,0-9]{1,}\d/)[0].replace(/\./g, "").replace(/,/, ".");
	var resStr = document.getElementsByClassName("odd")[1].innerHTML;

	if (resStr.indexOf("M Gold") != -1 || resStr.indexOf("M Öl") != -1 || resStr.indexOf("M Munition") != -1) {
		amount = amount * 1000000;
	};
} catch(er) {

}

window.location = 'javascript: function captcha(eForm,res) {    if ($("captchaForm") != null) {        $("captchaForm").remove();    }    var scrOff = getScrollY();    var top = posy - 195 + scrOff;    var splitCount = 0;    if (eForm.splitted_count != undefined && eForm.splitted_count != null) {        if(true) {splitCount = (eForm.splitted_count.value * 2);} else {splitCount = ('+amount+')}    } if (res > 0) {splitCount = res}    var tid = eForm.tid.value;    var qs = eForm.queryString.value;    new (Ajax.Request)("Webservices/getCaptcha.php", {parameters: {splitCount: splitCount, tid: tid, buy: "OK", qs: qs, imgPrfx: "images/classic", top: top}, method: "post", onSuccess: function (transport) {elements = $$("body");elements[0].insert(transport.responseText);new (Effect.Grow)("captchaForm", {duration: 0.0, direction: "top-left"});}});}; captcha(document.forms[2], 0); void 0';

document.getElementsByClassName("res_text_points")[0].innerHTML = "<a href=\"http://game.desert-operations.de/world1/handel.php?mode=1&object_id=r_2&search_goods=Angebote+suchen">Gold</a>		<a href=\"http://game.desert-operations.de/world1/handel.php?mode=1&object_id=r_3&search_goods=Angebote+suchen">Öl</a>		<a href=\"http://game.desert-operations.de/world1/handel.php?mode=1&object_id=r_4&search_goods=Angebote+suchen">Munition</a>";