// ==UserScript== 
// @name          JAYHAWK and KYou Portal Auto-login 
// @namespace     http://userscripts.org/users/87160
// @description   Auto-login the JAYHAWK wireless and KYou Portal 
// @include       https://access.aims.ku.edu/*
// @exclude       https://wifiauth.net.ku.edu/*
// ==/UserScript== 


//for JAYHAWK wireless
if(document.forms.namedItem("cisco"))
{
	document.forms.namedItem("cisco").elements.namedItem("username").value = "username";
	document.forms.namedItem("cisco").elements.namedItem("password").value = "password";
	document.forms.namedItem("cisco").submit();
}

//for KYou Portal
if(document.forms.namedItem("arguslogin_form"))
{
	document.forms.namedItem("arguslogin_form").elements.namedItem("UserID").value = "username";
	document.forms.namedItem("arguslogin_form").elements.namedItem("Password").value = "password";
	document.forms.namedItem("arguslogin_form").submit();
}