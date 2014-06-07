// ==UserScript==
// @name        支付宝页面自动刷新
// @namespace   5601
// @include     https://lab.alipay.com/consume/record/items.htm*
// @require     http://code.jquery.com/jquery-1.6.4.js
// @version     1
// @grant       none
// ==/UserScript==

window.myrefresh = function(){ 
    window.location.reload();
} 
var beginTime = $("input[name='beginTime']").eq(0).attr('value');
var endTime = $("input[name='endTime']").eq(0).attr('value');

if( beginTime == endTime ){
    window.setTimeout('myrefresh()',1000*60); //每60秒刷新一次     
}else{
    $("input[name='beginTime']").eq(0).attr('value',endTime);
    $("input[name='time']").eq(0).attr('value','chooseDate');
    $("input[class='detailSearch']").eq(0).click();
}