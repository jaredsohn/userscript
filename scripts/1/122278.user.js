// ==UserScript==
// @name                Auto Login
// @description 		Auto Login 
// @include             http://*irctc.co.in/*
// @include             https://*irctc.co.in/*
// @version     2.0
// @author              harish
// ==/UserScript==


 

location.href = "https://www.irctc.co.in/";
AutoLogin();
}
if (document.location.href.match('home.do'))
{
location.href = "https://www.irctc.co.in/";
AutoLogin();
}

if(document.location.href.match('repassword.do'))
{
location.href = "https://www.irctc.co.in/cgi-bin/bv60.dll/irctc/services/home.do";
//"https://www.irctc.co.in/";
AutoLogin();
}
}

///////////////// Remove Right Click Error message : "Sorry you donot have the permission to Right Click"
with (document.wrappedJSObject || document)
{
        onmouseup = null;
        onmousedown = null;
        oncontextmenu = null;
}