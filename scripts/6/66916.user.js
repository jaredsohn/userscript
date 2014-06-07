// ==UserScript==
// @name           BasilMarket Auto Login
// @namespace      http://www.vuii.co.uk
// @description    Automatically signs you into BasilMarket
// @include        http://www.basilmarket.com/*
// ==/UserScript==

function set_username(){
	var username =  prompt('Set your username',GM_getValue("bm_username"));
	GM_setValue("bm_username", username);
	if(GM_getValue("disabled") == 1 && GM_getValue("bm_password") != ''){
		reenable();
	}
}
function set_password(){
	var password =  prompt('Set your password',GM_getValue("bm_password"));
	GM_setValue("bm_password", password);
	if(GM_getValue("disabled") == 1 && GM_getValue("bm_username") != ''){
		reenable();
	}
}
function reenable(){
	GM_setValue("disabled", 0);
	alert('The script has been re-enabled.');
}
// function deleteall(){
	// GM_deleteValue("disabled");
	// GM_deleteValue("bm_username");
	// GM_deleteValue("bm_password");
	// alert('Values deleted. The script will act as if it\'s on its first run again.');
// }

GM_registerMenuCommand("BM Auto Login > Set username", set_username);
GM_registerMenuCommand("BM Auto Login > Set password", set_password);
GM_registerMenuCommand("BM Auto Login > Enable", reenable);
// GM_registerMenuCommand("BM Auto Login > Delete values", deleteall);


if(GM_getValue("disabled") != 0 && GM_getValue("disabled") != 1){
	GM_setValue("disabled", 1);
	GM_setValue("bm_username", '');
	GM_setValue("bm_password", '');
	alert('This is this script\'s first run. This message won\'t appear again.\n\nYou need to enter account details in order to use this script by right clicking the greasemonkey icon and navigating to User Script Commands.');
} 

if(GM_getValue("disabled") == 0){

	if(window.location != 'http://www.basilmarket.com/submit/login'){

		if(document.body.innerHTML.indexOf('Signup and start selling your MapleStory items!') != -1){
			window.location = 'http://www.basilmarket.com/submit/login';
		}
	}else{
		if(document.body.innerHTML.indexOf('The password you entered is incorrect, try again or request a new password.') != -1){
			alert('The account info you have entered is incorrect. The script has disabled itself to prevent an endless loop. Make sure you\'ve entered a valid login and refresh the page to try again.');
			GM_setValue("disabled", "1");
		}else{
			document.getElementsByName('pre_name')[0].value = GM_getValue("bm_username");
			document.getElementsByName('pre_pwd')[0].value = GM_getValue("bm_password");
			document.getElementsByName('submit_login')[0].submit();
		}
	}
}