// ==UserScript==
// @name       vote wjb
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  for wjb
// @match      http://*/ds/playerinfo.aspx?fldID=1044
// @copyright  2012+, Dachie
// ==/UserScript==
jQuery = $ =unsafeWindow.$;
$(function(){
    setInterval(function(){jQuery.get("","",function(x){jQuery.post("",$(x).filter("form").serialize()+"&_ctl0%3AContentPlaceHolder1%3AButton1=Button",function(y){console.log(y.split(';')[0]);});})},3000);
});