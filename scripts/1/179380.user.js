// ==UserScript==
// @name        minutestohours
// @namespace   cn.edu.zjut.gd
// @include     http://211.140.25.246:7080/wlan/index.wlan*
// @version     1
// @grant       GM_registerMenuCommand
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==

//alert('work');
//alert($(".timer").text());
/*
try{
  $("#aa").val("0");
  window.document.submitForm.submit();
}
catch{}
*/
var timetext=$("form > table > tbody> tr").eq(4).children("td").eq(1).html();
var time=timetext.split("分钟",1)[0];
var hour=time/60;
var d=new Date();
var day=d.getDate();
var month=d.getMonth();
//alert(day);
var info="已用"+hour+"小时，还有"+(250-hour)+"小时。\n今天是"+month+"月"+day+"号。";
//alert(info);
$("#two_h").before("<div style='font-size:large;color:red;padding:5px 5px 20px 5px;'>"+info+"<div>");

GM_registerMenuCommand("runtest", test);
function test(){
    $("form>table>tbody>tr a").cick(function (){return true;});
}