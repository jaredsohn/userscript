// ==UserScript==
// @name           freesms8 auto reload
// @namespace      by mr mundi
// @description    kuch ni
// @include        http://www.freesms8.in/*
// ==/UserScript==

if(document.location=="http://www.freesms8.in/QuickSent.aspx")
{
setTimeout('document.location="http://www.freesms8.in/quickSMS.aspx"',0);
}