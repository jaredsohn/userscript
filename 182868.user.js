// ==UserScript==
// @name		timer tooltip
// @author	CennoxX
// @description	Shows the countdown as title of the page.
// @include	http://time-in.info/timer.asp*
// @include	http://www.time-in.info/timer.asp*
// ==/UserScript==
setInterval(function() {
var count = document.getElementById("cntdwn");
if(count){
	var number1 = count.getElementsByTagName("b")[0];
	var number2 = count.getElementsByTagName("b")[1];
	var number3 = count.getElementsByTagName("b")[2];
	var number4 = count.getElementsByTagName("b")[3];
}
if(document.URL.split("=")[1].split("&")[0]=="0"){
	if((document.URL.split("=")[2].split("&")[0]=="0") && (document.URL.split("=")[3].split("&")[0]<60)){
		var zeit = number1.innerHTML + ":" + number2.innerHTML + " // Online Countdown Timer";
	}else{
		var zeit = number1.innerHTML + ":" + number2.innerHTML + ":" + number3.innerHTML + " // Online Countdown Timer";
	}
}else{
	var zeit = number1.innerHTML + ":" + number2.innerHTML + ":" + number3.innerHTML + ":" + number4.innerHTML + " // Online Countdown Timer";
}
if(top.document.title != zeit) {
	top.document.title = zeit;
}
}, 50);