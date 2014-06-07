// ==UserScript==
// @name        colorDealRecord
// @namespace   1O24
// @description color mark the passed three days DealRecords in taobao.com / tmall.com
// @include     http://detail.tmall.com/item.htm*
// @include     http://item.taobao.com/item.htm*
// @version     1.0
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js
// ==/UserScript==

function fix(n)
{
if(n<10) return "0"+n;
return n.toString();
}

//windows对象上双击激发上色
$(window).dblclick(function(){

    var now = new Date();
    var Y=now.getFullYear();
    var M=1+now.getMonth();
    var D=now.getDate();
    var strToday=fix(Y)+"-"+fix(M)+"-"+fix(D);
     now.setDate(now.getDate()-1);
    var strZuo=fix(Y)+"-"+fix(M)+"-"+fix(now.getDate());
    now.setDate(now.getDate()-1);
    var strQian=fix(Y)+"-"+fix(M)+"-"+fix(now.getDate());
    
    var currURL = window.location.href;
    var selecter_taobao="table.tb-list > tbody > tr";
    var selecterStr="table.table-deal-record > tbody > tr";
    if (currURL.indexOf("item.taobao")>0) selecterStr=selecter_taobao;
  $(selecterStr).each(function(){

    if( $(this).text().indexOf(strToday)>0) $(this).css("background-color","#94f608");
    else if( $(this).text().indexOf(strZuo)>0) $(this).css("background-color","#5F9737");
    else if( $(this).text().indexOf(strQian)>0) $(this).css("background-color","#42bff1");
    
      });

}); 

