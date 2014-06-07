// ==UserScript==
// @name           Login Schoolloop
// @namespace      http://matthewfl.com
// @description    Set the username and password on school after session timeout
// @include        http://*.schoolloop.com/*
// @include        https://*.schoolloop.com/*
// ==/UserScript==

// stuff to make it work in chrome
if (typeof GM_log == 'undefined') {

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

var href = window.location.host;

var user = GM_getValue(href+"_user", "random");
var password =  GM_getValue(href+"_password", "");

if(user != "") {
		if(document.getElementsByName("login_name").length > 0) {
				document.getElementsByName("login_name")[0].value = user; // set the user name
				document.getElementsByName("password")[0].value = password; // set the password
    if(user != "" && password != "")
     setTimeout(function () {
	if(unsafeWindow.$) {
		unsafeWindow.$("[name=event.login]").click();
	} else {
		document.getElementById('form').event_override.value='login';
		document.getElementById('form').submit();
	}
     }, 250);
		}else{
				var a = document.getElementsByTagName('a'); 
				for (var i = 0; i < a.length; i++) { 
						if(a[i].innerHTML.indexOf("Logout") != -1) {
								a[i].addEventListener('click', function () {
										GM_setValue(href+"_password", ""); // on logout clear the password 
								}, true);
						}
				}
		}
}

// get the username and password on login
if(document.getElementsByName("login_name").length > 0) {
		
		window.addEventListener('submit', function () {
		var u = document.getElementsByName("login_name")[0].value;
		var p = document.getElementsByName("password")[0].value;
				GM_setValue(href+"_user", u); 
				GM_setValue(href+"_password", p); 
		} , true); 
		
}

