// ==UserScript==
// @name           18P2P_autothanks
// @description    18P2P自动感谢
// @include        http://111.92.236.50/*
// @include        http://18p2p.com/*
// @include        http://*.18p2p.com/*
// @author         congxz6688
// @version        2012.11.4
// ==/UserScript==

if(window.location.href.indexOf("forumdisplay.php")!=-1){
	var fid=window.location.href.split("fid=")[1].match(/\d+/)[0];
	function playthanks(e){
		theAnchor=e.target;
		var formhash=document.querySelector('[name="formhash"]').value;
		var wwe=theAnchor.href;
		var tid=wwe.split("tid=")[1].match(/\d+/)[0];
		var urll=wwe.match(/htt.*?(?=(viewthread|redirect))/)[0] + "thankyou.php?fid=" + fid +"&tid="+tid+ "&thankyousubmit=1&formhash="+formhash+"&reason=Thanks";
		GM_xmlhttpRequest({
			method: 'POST',
			synchronous:true,
			url: urll,
			onload: function(){
				GM_log("自动感谢 ok!");
				window.location=wwe;
			}
		})
	}
	var allTabLink=document.querySelectorAll('[href*="viewthread.php"],[href*="redirect.php"]');
	for (sd=0;sd<allTabLink.length;sd++){
		allTabLink[sd].addEventListener("click",playthanks,false);
		allTabLink[sd].innerHTML = allTabLink[sd].innerHTML.replace(/<.*?>/g,"")
	}
}