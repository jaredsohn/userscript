// ==UserScript==
// @name           club & ilchon drop-down menu script for Nate & Cyworld
// @description    this script enables club & ilchon drop down menu in Nate & Cyworld
// @author         Sungmin Kim
// @include        http://*.cyworld.com/*
// @include	  	   http://*.nate.com/*
// @version        1.0
// ==/UserScript==


if((document.getElementById('btnQuickLauncher') || document.getElementById('btnQuickLauncher_club')) && typeof cyQuickLauncher == "undefined"){

	var d = new Date();

	year 	= d.getFullYear();
	month 	= d.getMonth() < 10 ? '0'+d.getMonth() : d.getMonth(); 
	date 	= d.getDate() < 10 ? '0'+d.getDate() : d.getDate(); 
	hours 	= d.getHours() < 10 ? '0'+d.getHours() : d.getHours();
	minutes = d.getMinutes() < 10 ? '0'+d.getMinutes() : d.getMinutes();

	var script1 = document.createElement('script');
	var script2 = document.createElement('script');
	var script3 = document.createElement('script');
	var script4 = document.createElement('script');

	script1.charset = script3.charset = script4.charset = "euc-kr";
	script2.charset = "utf-8"

	
	script1.src = "http://common.nate.com/nameUI/Common_kr.js?ver="+year+month+date+hours+minutes;
	script2.src = "http://common.nate.com/js/CommonTextGNB.js?ver="+year+month+date+hours+minutes;
	script3.src = "http://common.nate.com/nameUI/CommonNameUI_kr.js?ver="+year+month+date+hours+minutes;
	script4.src = "http://loginsvc.cyworld.com/js/quick/cyQuick.js?ver="+year+month+date+hours+minutes;

	document.getElementsByTagName('head')[0].appendChild(script1);
	document.getElementsByTagName('head')[0].appendChild(script2);
	document.getElementsByTagName('head')[0].appendChild(script3);
	document.getElementsByTagName('head')[0].appendChild(script4);

}
