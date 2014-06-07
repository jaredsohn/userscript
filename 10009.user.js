// ==UserScript==
// @name           MU Webmail Autologin
// @namespace      webmail.um.umsystem.edu
// @description    Logs into MU Webmail
// @include        https://webmail.um.umsystem.edu/*
// @include        http://webmail.um.umsystem.edu/*
// ==/UserScript==

your_username = 'myid56'
your_password = 'MyPassword56'

username = document.getElementById('username');
password = document.getElementById('password');
login = document.getElementById('SubmitCreds');

if (login == null) {
	login = document.getElementById('usertxtTable');
}

if (login && username && password) {
	username.value = your_username;
	password.value = your_password;
	login.click()	
}
