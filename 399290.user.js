// ==UserScript==
// @name       批量试用
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  试客联盟自动提交一般试用，暂时没用vip试用。
// @include	   http://www.shikee.com/ViewTryPlatinumVip/*
// @include    http://www.shikee.com/tryshowvip/*
// @include    http://list.shikee.com/try/*
// @copyright  2014+, Duke Wang
// ==/UserScript==

 hrefValue = window.location.href; //获取当前页面的地址
 if(hrefValue.match(/list.shikee.com.+page=\d+.*&style=sl/)){
 tb=document.getElementsByClassName("item clearfix");
 for(i=0;i<tb.length;i++){
 tec=tb[i].getElementsByTagName("a")[1];
if(tec.innerText.match('茶')){
 tec.click()
}
}
setTimeout('x=document.getElementById("formpage");y=x.getElementsByTagName("a");y[y.length-1].click();',3000)
}
else if(hrefValue.match(/www.shikee.com.ViewTryPlatinumVip.+/)!=null){
ta=document.getElementsByClassName("joinBtn")[0];
ta.click();
setTimeout("window.close()",3000);
}
else if(hrefValue.match(/www.shikee.com.tryshowvip.+/)!=null){
window.close();
}