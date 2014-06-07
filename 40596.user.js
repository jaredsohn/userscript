// ==UserScript==
// @name           Ruins of Chaos cTool v0.2
// @author         Cogent
// @namespace      http://mlfmp.com/
// @description    A tool for Ruins of Chaos
// @include        http://ruinsofchaos.com/*
// @include        http://www.ruinsofchaos.com/*
// ==/UserScript==
var username, email, password;

username = "[username]"; // Your RoC username.
email    = "[email]"; // Your RoC email.
password = "[password]"; // Your RoC password.

// Do not edit below this line unless you know what you are doing.

var u = document.getElementsByName('usrname');
var e = document.getElementsByName('uemail');
var p = document.getElementsByName('peeword');
if(u[0]) {
	u[0].value = username;
	e[0].value = email;
	p[0].value = password;
	document.forms[0].submit();
} else {
	var header;
	header = document.getElementById('header');
	if(header) {
		header.innerHTML = "<p width='100%' style='background-color:#ffffff;' align='center'><font color='#000000'>[<strong>Gold</strong>: <a href='http://ruinsofchaos.com/armory.php' style='color: #000000'>"+document.getElementById('s_gold').innerHTML+"</a>] [<strong>Turns</strong>: <a href='http://ruinsofchaos.com/battlefield.php?do=mypage' style='color: #000000'>"+document.getElementById('s_turns').innerHTML+"</a>] [<strong>Rank</strong>: <a href='http://ruinsofchaos.com/base.php' style='color: #000000'>"+document.getElementById('s_rank').innerHTML+"</a>] [<strong>Hit</strong>: <a href='http://ruinsofchaos.com/attacklog.php' style='color: #000000'>"+document.getElementById('s_hit').innerHTML+"</a>]</font></p>" + header.innerHTML;
	} else {
		alert('Error 1 - Unable to find header.');
	}
}