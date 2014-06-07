// ==UserScript==
// @name           All in one auto login
// @namespace      malav.bhavsar@gmail.com	
// @version        1.0
// @include        https://www.google.com/accounts/ServiceLogin*
// @include        https://www.google.com/accounts/Login*
// @include        https://www.google.com/groups/signin*
// @include        https://twitter.com/*
// @include        http://twitter.com/*
// @include        http://www.facebook.com/*
// @include        https://webmail.daiict.ac.in/*  
// @include        https://*.yahoo.*
// @include        https://220.225.53.36:8843/*
// @include        http://10.100.56.55:8090/*
// @include        http://courses.daiict.ac.in/*
// @include        https://intranet.daiict.ac.in/intranet/index.html
// @include        http://intranet.daiict.ac.in/intranet/index.html
// ==/UserScript==
function googleLogin()
{
	document.getElementById("Email").value="";/*Your google ID in the quotes*/
	document.getElementById("Passwd").value=""/*Your google Password in the quotes*/;
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

function webmailLogin(i)
{
	document.getElementsByTagName("input")[2+i].value="";/*Your daiict webmail Id in the quotes*/
	document.getElementsByTagName("input")[3+i].value="";/*Your webmail password in the quotes*/
	document.getElementsByTagName("input")[2+i].form.submit();
	
}

function ecampusLogin()//to be edited!!!
{
	document.getElementsByTagName("input")[0].value="";/*Your daiict ID in the quotes*/
	document.getElementsByTagName("input")[1].value="";/*Your ecampus password in the quotes*/
	document.getElementsByTagName("form")[0].submit();
}

function cyberoamLogin()
{
	document.getElementsByName("username")[0].value="";/*Your cyberoam ID in the quotes*/
	document.getElementsByName("password")[0].value="";/*Your cyberoam password in the quotes*/
	document.getElementsByName("username")[0].form.submit();	
}
function moodleLogin()
{
	alert("1");
	document.getElementById("username").value="";/*Your moodle ID in the quotes*/
	document.getElementById("password").value="";/*Your moodle password in the quotes*/
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
if(document.domain=="webmail.daiict.ac.in")
{
	webmailLogin(0);
}
if(document.domain=="intranet.daiict.ac.in")
{
	webmailLogin(1);
}
if(document.domain=="220.225.53.36")
{
	ecampusLogin();
}
if(document.domain=="10.100.56.55")
{
	cyberoamLogin();
}
if(document.domain=="courses.daiict.ac.in")
{
	if(document.URL=="http://courses.daiict.ac.in//")
	{
		window.location.assign("http://courses.daiict.ac.in//login/index.php"); 
	}
	moodleLogin();
}



