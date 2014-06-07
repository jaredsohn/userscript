// ==UserScript==
// @name           All in one auto login with Google for Domains
// @namespace      http://www.isaiahfranco.com	
// @version        1.0
// @include        https://www.google.com/accounts/ServiceLogin*
// @include        https://www.google.com/accounts/Login*
// @include        https://www.google.com/groups/signin*
// @include        https://www.google.com/a/*
// @include        https://twitter.com/*
// @include        http://twitter.com/*
// @include        http://www.facebook.com/* 
// @include        https://*.yahoo.*
// ==/UserScript==
function googleLogin()
{

	var logins=new Array();
	logins["gmail"]="USERNAME|PASSWORD"; // Standard Gmail login information
	logins["GOOGLEDOMAIN.COM"]="USERNAME|PASSWORD"; // Copy/paste this onto a new line for every Google Domain you want to log into
	
	var url=document.URL;
	var GoogleDomain=url.substr(25,(url.indexOf("/",26)-25));

	if(logins[GoogleDomain]==undefined)
	{
		GoogleDomain="gmail";
	}

	var LoginInfo=logins[GoogleDomain].split("|");
	document.getElementById("Email").value=LoginInfo[0];/*Your google ID in the quotes*/
	document.getElementById("Passwd").value=LoginInfo[1]/*Your google Password in the quotes*/;
	document.getElementById("Email").form.submit();
}

function facebookLogin()
{
		document.getElementById("email").value="";/*Your facebook email ID in the quotes*/
		document.getElementById("pass").value="";/*Your facebook Password in the quotes*/
		document.getElementById("email").form.submit();
}

function twitterLogin()
{
	if(document.URL.indexOf("login")==-1)
	{
		document.getElementById("username").value="";/*Your twitter email ID in the quotes*/
		document.getElementById("password").value="";/*Your twitter password in the quotes*/
		document.getElementById("username").form.submit();
	}
	else
	{
		document.getElementById("username_or_email").value="";/*Your twitter email ID in the quotes*/
		document.getElementById("session[password]").value="";/*Your twitter password in the quotes*/
		document.getElementById("username_or_email").form.submit();
	}
}


function yahooLogin()
{
	document.getElementById("username").value="";/*Your yahoo ID in the quotes*/
	document.getElementById("passwd").value="";/*Your yahoo password in the quotes*/
	document.getElementById("username").form.submit();	
}



if(document.domain=="www.google.com")
{
	googleLogin();
}

if(document.domain=="facebook.com")
{
	facebookLogin();
}

if(document.domain=="twitter.com")
{
	twitterLogin();
}

if(document.domain=="login.yahoo.com")
{
	yahooLogin();
}