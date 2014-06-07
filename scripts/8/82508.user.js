// ==UserScript==
// @name           Muare
// @include        http://muare.vn/*
// ==/UserScript==

var login = document.getElementById('ctlHeader_lnkImgLogin');
var evt = document.createEvent("HTMLEvents");
evt.initEvent('click', true, true ); 
login.dispatchEvent(evt);

var user = document.getElementById('navbar_username');
var pass = document.getElementById('navbar_password');

user.value = 'tuandien1308';
pass.value = '123456';

var button = document.getElementById('login_form').getElementsByTagName('input');
for(var i = 0; i < button.length; i++){
	if(button[i].value == 'Đăng nhập'){
		var evt = document.createEvent("HTMLEvents");
		evt.initEvent('click', true, true ); 
		button[i].value = 'VL';
		button[i].dispatchEvent(evt);
		break;
	}
}
var subm = document.getElementById('login_form');
subm.submit();
