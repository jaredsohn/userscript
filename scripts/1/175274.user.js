// ==UserScript==
// @name        京东提交订单确认
// @namespace   jd.com
// @include     http://trade.jd.com/order/getOrderInfo.action?rid=*
// @version     1.0
// @copyright  2013+, 284515036
// @description 京东提交订单时通常需要将页面拉到最下，有了这个后，如果进入到订单提交页面时，会自动弹出对话框提示是否提交
// ==/UserScript==
//
//
//


function show()
{
var aa= window.confirm("单击＂确定＂提交订单。单击＂取消＂离开。");
if(aa){
document.body.style.overflow="auto"
document.getElementById('order-submit').click();
}
else{
window.opener=null;
window.location();
}
}
