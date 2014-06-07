// ==UserScript==
// @name Windows Live Sign In
// @description Automatically sign in to Windows Live Mail cause Firefox can't
// @include http://login.live.com/*
// @include https://login.live.com/*
// @include http://msnia.login.live.com/*
// @include https://msnia.login.live.com/*
// @version 0.5
// ==/UserScript==
//add event listener to call my anonymous function after the page loads
window.addEventListener('load',
function()
{
	var USERNAME = "PUT_YOUR_USERNAME_HERE";
	var PASSWORD = "PUT_YOUR_PASSWORD_HERE";

	var thingscalled_f1 = document.getElementsByName("f1");	//Find everything called "fl" and hope it's the form we want.
	var oLoginField = document.getElementById("i0116");		//Find username box.
	var oPasswordField = document.getElementById("i0118");	//Find password box.

	if(!thingscalled_f1[0]) //If the form does not exists... 
	{
		//Screw WLM, we'll make our own form.
		user_oLoginForm = document.createElement("form");
		user_oLoginForm.setAttribute('name', 'f1');
		user_oLoginForm.setAttribute('id', 'user_of1'); //Unlike MS, we'll give our form an id so we know what it is.
		user_oLoginForm.setAttribute('action', 'https://login.live.com/ppsecure/post.srf?rru=inbox&id=64855');
		user_oLoginForm.setAttribute('method', 'post');
		before_iUser0 = document.getElementById('iUser0');
		before_iUser0.parentNode.insertBefore(user_oLoginForm, before_iUser0);
		thingscalled_f1[0] = document.getElementById("user_of1"); //Reset.
	}

	if(oLoginField) //Make sure field exists before filling it in.
		oLoginField.value = USERNAME;
	else //If it doesn't exit, we'll make our own.
	{
		var user_oLoginField = document.createElement('input');
			user_oLoginField.setAttribute('id', 'i0116');
			user_oLoginField.setAttribute('type', 'hidden');
			user_oLoginField.setAttribute('name', 'login');
			user_oLoginField.setAttribute('value', USERNAME);
			thingscalled_f1[0].appendChild(user_oLoginField); //Attach to form.
	}

	if(oPasswordField) //Make sure field exists before filling it in.
		oPasswordField.value = PASSWORD;
	else //If it doesn't exit, we'll make our own.
	{
		var user_oPasswordField = document.createElement('input');
			user_oPasswordField.setAttribute('id', 'i0118');
			user_oPasswordField.setAttribute('type', 'hidden');
			user_oPasswordField.setAttribute('name', 'passwd');
			user_oPasswordField.setAttribute('value', PASSWORD);
			thingscalled_f1[0].appendChild(user_oLoginField); //Attach to form.
	}

	thingscalled_f1[0].submit(); //submit.
}
, true);