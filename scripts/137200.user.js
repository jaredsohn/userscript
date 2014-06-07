// ==UserScript==
// @name        JamaycaHotelAutoLogin
// @namespace   frenky.nn@gmail.com
// @include     http://192.168.1.1:8090/
// @include     http://192.168.1.1:8090/httpclient.html
// @version     1
// ==/UserScript==

var kfTimestamp=0;
var TIMEOUT_SEC=60;
function KF_showCountdown()
{
    var now = new Date().getTime();
	var countdown = TIMEOUT_SEC - Math.round((now-kfTimestamp)/1000);
	document.getElementById('msgDiv').childNodes[0].innerHTML=countdown;
}

function KF_setInputBoxData(username, password){
    var kf_username = document.getElementsByName('username');
	var kf_password = document.getElementsByName('password');
	var kf_submit = document.getElementsByName('btnSubmit');
	var childNodeArray = document.getElementById('msgDiv').childNodes;

	kf_username[0].value=username;
	kf_password[0].value=password;

	GM_log("->" + childNodeArray[0].innerHTML + "<-");
    if ( childNodeArray[0].innerHTML == '' && kf_submit[0].value == "Login"){
        GM_log("**GO for submit**");
		GM_log(kf_username[0].value);
		GM_log(kf_password[0].value);
		kf_submit[0].click();
	}else if ( childNodeArray[0].innerHTML == "You have successfully logged in" || kf_submit[0].value == "Logout"){
        GM_log("**GO for reload in 5 min #1**");
		setTimeout(function(){location.href = "http://192.168.1.1:8090/";},1000*TIMEOUT_SEC);
		kfTimestamp=new Date().getTime();
		setInterval(function(){KF_showCountdown();},1000);
	}else{
        GM_log("**GO for reload in 5 min #2**");
		setTimeout(function(){location.href = "http://192.168.1.1:8090/";},1000*30); //30 sec
	}
}

(function(){
	setTimeout(function(){KF_setInputBoxData("CHANGEME","CHANGEME");},1000);
})(); 
