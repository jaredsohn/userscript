// ==UserScript==
// @name          FORTEST
// @author        charseer
// @description   for me
// @match         http://ccb.handpay.cn/wap/*
// @match         https://ccb.handpay.cn/wap*
// @version       1.19
// ==/UserScript==



var readerForD= {
	init: function() {
	 var loc = window.location.href;
	 if (loc.match("wap")) {
		var iWant=document.getElementsByName("verificationCode");
		var iWant2=document.getElementsByName("pic");	 
                if (iWant.length !=0){
                     iWant[0].value="83598";
                 }
                
                if (iWant2.length !=0){
                     iWant2[0].focus();
                 }                               
				  }
		  }
};
if (document.body) {
	setTimeout(function() {
		readerForD.init();
	}, 30);
} else {
	window.addEventListener("load", function() {
		readerForD.init();
	}, false);
}