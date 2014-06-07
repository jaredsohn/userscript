// ==UserScript==
// @name           dizi.mynet.com - cinema mode
// @description    add cinema mode to dizi.mynet.com
// @version        2.0
// @date           09.04.2012
// @author         Volkan KIRIK
// @namespace      http://userscripts.org/users/volkan
// @include        http://dizi.mynet.com/*
// @include        http://sebastiyan.mynet.com/*
// ==/UserScript==

var vucut = document.getElementsByTagName('BODY')[0];
var cinemascript = document.createElement("script");
cinemascript.setAttribute('id', 'bizim_script');
cinemascript.type = "text/javascript";
cinemascript.textContent = 
			    "<!--" + "\r\n"
+ "function getDocHeight() {" + "\r\n"
+ "	var D = document;" + "\r\n"
+ "	return Math.max(" + "\r\n"
+ "		Math.max(D.body.scrollHeight, D.documentElement.scrollHeight)," + "\r\n"
+ "		Math.max(D.body.offsetHeight, D.documentElement.offsetHeight)," + "\r\n"
+ "		Math.max(D.body.clientHeight, D.documentElement.clientHeight)" + "\r\n"
+ "	);" + "\r\n"
+ "}" + "\r\n"
+ "" + "\r\n"
+ "function getCinemeMode(status)" + "\r\n"
+ "{" + "\r\n"
+ "	if (status==1){" + "\r\n"
+ "		var z= 9001;" + "\r\n"
+ "		jQuery('.ekran_karart').css({'display':'inline'});" + "\r\n"
+ "		jQuery('.ekran_karart').css({'position':'fixed','top':'0'});" + "\r\n"
+ "		jQuery('.ekran_karart').css({'height':'' + getDocHeight() + 'px'});" + "\r\n"
+ "		jQuery('.ekran_karart').css({'z-index':'150'});" + "\r\n"
+ "		jQuery('.dContainAll').addClass('fixOverlay');" + "\r\n"
+ "		document.getElementById('jsddm').style.zIndex = z;" + "\r\n"
+ "		document.getElementById('playerDiv2').style.zIndex = 19999;" + "\r\n"
+ "		document.getElementById('playerDiv2').style.setProperty('z-index', 19999, 'important')" + "\r\n"
+ "		jQuery('body').css({'background-color':'#292929'});" + "\r\n"
+ "	} else {" + "\r\n"
+ "		cinemeModeClose();" + "\r\n"
+ "		jQuery('body').css({'background-color':'#FFFFFF'});" + "\r\n"
+ "		jQuery('.ekran_karart').css({'height':'100%'});" + "\r\n"
+ "	}" + "\r\n"
+ "}" + "\r\n"
//			  + "alert('bzzztt');" + "\r\n" // for testing
			  + "// -->" + "\r\n";
			vucut.appendChild(cinemascript);
