// ==UserScript==
// @name           18P2P thanks by one_click
// @description    18P2P一键感谢
// @include        *
// @require        http://code.jquery.com/jquery-latest.min.js
// @author         congxz6688
// @version        2012.8.25
// @grant          GM_log
// ==/UserScript==


if(document.title.indexOf("18P2P -")!=-1 && (window.location.href.indexOf("viewthread.php")!=-1|| window.location.href.indexOf("redirect.php")!=-1)){
	var formhash=$('[name="formhash"]').val();
	var mainurl=$('[href*="thankyou.php"]')[0].href;
	$('[href*="thankyou.php"]:has(img)').attr({"href":""}).click(function(){
		GM_log("开始运行一键感谢程序……")
		var urll = mainurl + "&thankyousubmit=1&formhash="+formhash+"&reason=Thanks";
		var autothank = new XMLHttpRequest();
		autothank.open('POST', urll, false);
		autothank.onreadystatechange = callback;
		autothank.send(null);
		function callback(){
			GM_log("一键感谢 ok!")
			window.location.reload();
		}
	})
}