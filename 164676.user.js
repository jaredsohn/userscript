// ==UserScript==
// @name Taobao Auto Buy item Tool
// @namespace willwang@yeah.net
// @description Buy Item Automaticly
// @include http://item.taobao.com/item.htm?id=*
// @include https://cashier.alipay.com/standard/payment/cashier.htm?orderId=*
// @include http://buy.taobao.com/auction/buy_now.jhtml

// ==/UserScript==
//测试下所用的 Greasemonkey 函数是否存在
if (!GM_xmlhttpRequest) {
alert("请升级到最新版本的 Greasemonkey.");
return;
}

/* ========================= Definition ============================ */

/* ======================== 修改区域 STARTS ======================== */
var TaobaoItemLink = "http://item.taobao.com/item.htm?id=16028018987";
/* ======================== 修改区域 *ENDS!* ======================== */

function step1() {
//alert("step1′);
document.getElementById("J_LinkBuy").focus();
document.getElementById("J_LinkBuy").click();
}

function step2() {
document.getElementById("verify-code").focus();
}

function step3() {
window.location.href = TaobaoItemLink;
}

window.addEventListener(
“load”, function () {
var href = window.location.href;
//alert(href.substr(0,66));
if (href.substr(0,35) == "http://item.taobao.com/item.htm?id="){
//alert(“step1″);
setTimeout(step1, 0);
}
else if (href == "http://buy.taobao.com/auction/buy_now.jhtml"){
setTimeout(step2, 0);
}
else if (href.substr(0,64) == "https://cashier.alipay.com/standard/payment/cashier.htm?orderId="){
setTimeout(step3, 0);
}

},
false);