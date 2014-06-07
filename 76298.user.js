// ==UserScript==
// @name           Facebook Wall Flooder
// @namespace      Vinayak
// @description    Floods Faccebook User's Wall :|
// @include        http://lite.facebook.com/*
// ==/UserScript==

var username="posterboi";
var userid="";
var message="Galli Galli Mein Shor Hain Vikrant Ek Number ka whore hain :|";

if(document.location=="http://lite.facebook.com/" + username)
{
	document.location="javascript:document.forms[1].elements[0].value='" + message + "';document.forms[1].submit();void(0);";
}
else if(document.location.href.split("/")[5]==userid)
{
	document.location="javascript:document.forms[1].elements[0].value='" + message + "';document.forms[1].submit();void(0);";
}