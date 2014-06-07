// ==UserScript==
// @name           freesms auto login
// @namespace      by mr mundi
// @description    pta ni
// @include        http://www.freesms8.in/*
// ==/UserScript==

var username=0000;
var pass=00001;

if(document.location=="http://www.freesms8.in/Unlimited-Free-SMS-To-India.aspx")
{

document.getElementById('ctl00_Body_UserName').value=username;

document.getElementById('ctl00_Body_Password').value=pass;
void(0);
document.getElementById('ctl00_Body_LoginButton').click();
}

if(document.location=="http://www.freesms8.in/Features/alljokespage.aspx")
{
setTimeout('document.location="http://www.freesms8.in/QuickSMS.aspx"',0);
}