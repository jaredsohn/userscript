// ==UserScript==
// @name	人人RP
// @author	fffonion
// @description	自动刷新，自动攒人品
// @license	GPL version 3
// @encoding	utf-8
// @include	http://www.renren.com/*
// @exclude http://www.renren.com/*/*
// @updateURL   http://userscripts.org/scripts/source/184550.meta.js
// @downloadURL    http://userscripts.org/scripts/source/184550.user.js
// @run-at	document-end
// @version	1.1
// @grant       GM_xmlhttpRequest
// ==/UserScript==

//var reg = /(\d*)分(\d*)秒/;
//var rpdiv=document.getElementById("forBarHover").innerHTML;
//var result =  reg.exec(rpdiv);
//var sleep_time=(result[1]*60+result[2]*1)*1000;
//
var sleep_time=parseInt(document.getElementById("interval").value);
console.log("人人RP:下次刷新 "+Math.floor(sleep_time / 60000)+"分"+Math.floor((sleep_time % 60000)/1000)+"秒");
sleep_time+=1000;//for delay
console.log(sleep_time);
setInterval("window.location.reload()",sleep_time);

var rpget=document.getElementById("bTodayRpNum").innerHTML;
if (rpget==null){
	GM_xmlhttpRequest({
	  method: "POST",
	  url: "http://renpin.renren.com/action/collectrp",
	  data: "requestToken="+XN.get_check+"&_rtk="+XN.get_check_x,
	  headers: {
		"Content-Type": "application/x-www-form-urlencoded",
		"Host":"renpin.renren.com", 
		"Referer":"http://renpin.renren.com/ajaxproxy.htm",
		"Origin":"http://renpin.renren.com"
	  },
	  onload: function(response) {
		console.log("requestToken="+XN.get_check+"&_rtk="+XN.get_check_x);
		console.log(response.responseText);
		if (response.responseText.indexOf("msg:ok") > -1) {
		  alert("done");
		}
	  }
	});
}