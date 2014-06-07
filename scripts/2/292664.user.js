// ==UserScript==
// @name       Auto timing
// @namespace  http://use.i.E.your.homepage/
// @version    1.0
// @description  Oh my village,never die again！QAQ
// @include		http://diam.ngct.net/*
// @copyright  2014+, Chao Bao Zi
// ==/UserScript==



//建立Date物件讀取本地時間
	var d=new Date();
//開始程式時執行一次
//將對話框輸入現在時間
    var h=d.getHours();
if(h<10){
h="0"+h.toString();
}
else{
h=h.toString();
}
var m=d.getMinutes();
if(m<10){
m="0"+m.toString();
}
else{
m=m.toString();
}

    document.getElementById("say").value=h+m;
//點送出
    document.getElementById("submit").click();

//以下每600秒循環執行
setInterval(function(){

	var d=new Date();
    var h=d.getHours();
if(h<10){
h="0"+h.toString();
}
else{
h=h.toString();
}
var m=d.getMinutes();
if(m<10){
m="0"+m.toString();
}
else{
m=m.toString();
}
    document.getElementById("say").value=h+m;
    document.getElementById("submit").click();


},600000)