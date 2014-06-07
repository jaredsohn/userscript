// ==UserScript==
// @name           Truewifi Auto Login/Logout
// @version        4.0.5
// @author         Modified by Gusto_R (mrgill created in http://imrgill.com/)
// @namespace      http://www.facebook.com/pages/True-WiFi-Auto-Login/213510638776036
// @description    True Wifi automatic login/re-login script when time is exceed.
// @include        http*://portal.trueinternet.co.th/*
// ==/UserScript==

//================ Credential =================

var username = "0863233396";  // username โดยไม่ต้องใส่ @ อะไรเลย
var password = "5958";  //5958
var minute = 90;    // เวลาในการใช้งานของคุณ เช่น 90 หรือ 180

//================ Credential =================

//================ Variables =================

var url_success = "wifi-login-success.php"; // login success url
var url_success_7 = "7-login-success.php"; // login success  7-11 url
var url_fail = "wifi-logout-fail.php"; // logout fail url
var url_fail_7 = "7-logout-fail.php"; // logout fail 7-11 url
var url_login = "wifi-login.php"; // login url
var url_login_7 = "7-login.php"; // login 7-11 url
var url_logout_success = "wifi-logout-success.php"; // logout success url
var url_logout_success_7 = "7-logout-success.php"; // logout success 7-11 url
var url_to_redirect = "http://www.facebook.com/?ver="; // redirect to this url
var url_logout = "https://portal.trueinternet.co.th/wifiauthen/logout_result.php"; // logout url
var url_true = "https://portal.trueinternet.co.th/wifiauthen/web/"; // url of truewifi

//================ Timer =================

var tosec = (minute-2) * 60 * 1000;  // convert minute to millisecond
var cooldown = (minute-2) * 60; // convert millisecond to second

//================ Variables =================

//================ Show Time =================

if (document.location.href.substring(49,71) == url_success || document.location.href.substring(49,68) == url_success_7) // Check url success
{
	setInterval(
			function()
			{
				var h = parseInt(cooldown / (60 * 60));
				var m = parseInt((cooldown / 60) % 60);
				var s = parseInt(cooldown % 60);
				document.getElementById('wifi_bottom_bg').innerHTML = "<br><br><div style='text-align:center;'><span style='text-align:center;font-weight:bold;color:orange;font-size:x-large;'>Time left  " + h + ":" + m + ":" + s + "</span></div>";
				document.title = "TrueWiFi " + h + ":" + m + ":" + s;
				cooldown--;
			}
			,1000
	);
}
else if (document.location.href.substring(49,72) == url_logout_success || document.location.href.substring(49,69) == url_logout_success_7) // Check url Logout success
{
	document.location = url_to_redirect+Math.floor((Math.random()*100000)+1);
}
else if (document.location.href.substring(49,69) == url_fail || document.location.href.substring(49,66) == url_fail_7) // Check url Logout fail
{
	document.location = url_login;
}
else if (document.location.href.substring(49,63) == url_login || document.location.href.substring(49,60) == url_login_7) // Check url Login
{
	document.getElementById('username').value = username;
	document.getElementsByName("password")[0].value = password;
	document.forms[0].submit();
}

//================ Show Time =================

//================ Timer to redirect =========

window.setTimeout(
	function()
	{
		if (document.location.href.substring(49,71) == url_success) { // Check url Login success
		document.location = url_logout;
		} else if (document.location.href.substring(49,68) == url_success_7) { // Check url Login 7-11 success
		document.location = url_logout;
		}
	},
  tosec
);

//================ Timer to redirect =========
