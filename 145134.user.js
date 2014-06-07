
// ==UserScript==
// @name           Login Berkeley
// @namespace      http://matthewfl.com
// @description    Automatically login to berkeley auth system
// @include        http://auth.berkeley.edu/*
// @include        https://auth.berkeley.edu/*
// @grant          GM_setValue
// @grant          GM_getValue
// @version        2
// ==/UserScript==

// stuff to make it work in chrome
if (typeof GM_setValue == 'undefined') {

    function GM_addStyle(css) {
	var style = document.createElement('style');
	style.textContent = css;
	document.getElementsByTagName('head')[0].appendChild(style);
    }

    function GM_deleteValue(name) {
	localStorage.removeItem(name);
    }

    function GM_getValue(name, defaultValue) {
	return localStorage.getItem(name) || defaultValue;
    }

    function GM_log(message) {
	console.log(message);
    }

    function GM_setValue(name, value) {
	localStorage.setItem(name, value);
    }
}

var unsafeWindow = this['unsafeWindow'] || window;

var user = GM_getValue("user", "");
var password =  GM_getValue("password", "");


try {

if(user != "") {
    if(document.body.innerHTML.indexOf("incorrect") != -1) {
	password = "";
	GM_setValue("password", "");
    }
    if(document.getElementById("username")) {
	document.getElementById("username").value = user; // set the user name
	document.getElementById("password").value = password; // set the password
	if(user != "" && password != "")
	    setTimeout(function () {
		document.getElementById('loginForm').submit();
	    }, 250);
    }else{
	if(location.href.indexOf("logout") != -1) {
	    GM_setValue("password", "");
	}
    }
}

// get the username and password on login
if(document.getElementById("username")) {
    window.addEventListener('submit', function () {
	var u = document.getElementById("username").value;
	var p = document.getElementById("password").value;
	GM_setValue("user", u);
	GM_setValue("password", p);
    } , true);
}

}catch(e) {
    console.log(e);
}
