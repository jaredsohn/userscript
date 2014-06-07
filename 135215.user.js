// ==UserScript==
// @name           autogive_lama
// @namespace      autogive_lama
// @include        https://www.deviantart.com/modal/badge/*
// ==/UserScript==
var $=unsafeWindow.jQuery,holder,query,offset,fPage,pPage,lPage;
if($("#givebadgeModal .smbutton").length>0){
$("#tos").attr("checked","true");
$("#givebadgeModal .smbutton").click();
}
if($(".secure.ultracompact.gruze").length!=0&&$("#givebadgeModal .smbutton").html()=="Done"){
window.open('','_parent','');
window.close();
}