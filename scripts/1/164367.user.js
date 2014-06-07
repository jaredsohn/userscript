// ==UserScript==
// @name        autoLogin
// @namespace   YT
// @include     http://www.grease.yoricktoma.nl/*
// @include		https://wireless.de-eindhovenseschool.nl/login.html
// JQuery word geinclude voor de OnClick functie, voor de rest was JQuery niet veel korter
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     1
// ==/UserScript==

function login(){
	var user = GM_getValue('user', '');
	var pass = GM_getValue('pass', '');
	var userfield =  document.getElementsByName("username")[0];//document.getElementsById("username");
	var passfield =  document.getElementsByName("password")[0];////document.getElementsById("password");
	if(user == ''){
		storeuser();
	}
	if(pass == ''){
		storepass();
	}
	userfield.value = user;
	passfield.value = pass;
	var button = document.getElementsByName("Submit")[0];
	setInterval(function(){
		button.click();
	}, 500);//document.forms['login'].submit();
}
function storeuser(){
	var user = prompt('Leerlingnummer [ sintlucas/ niet nodig ! ]');
	if(user!=''){
		GM_setValue('user', 'sintlucas\\'+ user);
	}
	login();
}

function storepass(){
	var pass = prompt('Enter Password');
	if(pass!=''){
		GM_setValue('pass', pass);
	}
	login();
}



/*
$('#reset').click(function(){
	window.location = 'http://www.grease.yoricktoma.nl';
	GM_deleteValue("pass");	
	GM_deleteValue("user");
});
*/

	
login();