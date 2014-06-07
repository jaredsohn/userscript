// ==UserScript==
// @name       SP Auto login
// @namespace  http://sptricks.blogspot.in/
// @version    0.1
// @description  This script Autologn your fav. site as facebook, gmail... Note:-Please replace "UserName" to your user id for diff. sites. as: Facebook, Gmail, IRCTC, Freerecharge.in e.t.c. Code written by Shivesh96
// @match      http://*/*
// @copyright  2012+, Shivesh96
// @include    http//*
// @include    https://*
// ==/UserScript==
if(location.host=="accounts.google.com")
{
	var user = document.getElementsByName("Email");
	var pass = document.getElementsByName("Passwd");
	if (user)
	{
	user[0].value = "UserName"; 
	pass[0].value = prompt("Emter Pass");
	var capatcha = document.getElementById("logincaptcha");
	 if (capatcha)
	 {
	 capatcha.value = prompt("Please enter Capatacha Image Shown Below");
	 }
        if (pass[0].value!="")
        {
	document.forms["gaia_loginform"].submit();
        }
	}
};
/*
if (location.host=="mail.google.com" || "www.google.co.in" || "plus.google.com" || "www.google.com" || "maps.google.com" || "www.youtube.com" || "news.google.co.in" || "drive.google.com" || "www.orkut.com" || "www.blogger.com" || "picasaweb.google.com" || "play.google.com" )
{
	var log = document.getElementById('gb_71');
	if (log)
	{
	log.click();
	}
};
*/
if (location.host=="www.facebook.com")
{
	var u=document.getElementsByName("email");
	var p=document.getElementsByName("pass");
    /*
	var log = document.forms["logout_form"];
	if (log)
	{
	log.submit();
	};
    */
	if(u)
	{
		u[0].value="UserName";	
		if(p)
		{
			p[0].value=prompt("Enter Pass");
		};
        if (p[0].value!="")
        {
		document.forms["login_form"].submit();
        }
	};
	
};

if (location.host=="www.freecharge.in")
{
document.getElementById('email').value="UserName@gmail.com";
document.getElementById('password').value= prompt("Enter Pass");
    if (document.getElementById('password').value != "")
    {
        if (document.getElementById('password').value != "password")
        {
        document.forms["frmLogin"].submit();
        }
    }
    /*
    window.open ("javascript:set_session();","_self");
*/
};


if (location.host=="")
{
window.open ("http://1.254.254.254","_self");
};

if (location.host=="login.tikona.in")
{
	var u=document.getElementsByName("username");
	var p=document.getElementsByName("password");
	if (u)
	{
		u[0].value = "UserName";
		p[0].value = prompt("Enter Pass");
		savesettings();
	};
	/*document.forms["form1"].submit();*/
    /*
	window.open("https://login.tikona.in/userportal/logout.do?svccat=1","_self");
*/
};

if (location.host=="www.irctc.co.in")
{
	document.getElementsByName("userName")[0].value = "UserName"; 
	document.getElementsByName("password")[0].value = prompt("Enter Pass"); 
    if (document.getElementsByName("password")[0].value!="")
    {
	document.forms["LoginForm"].submit();
    }
};