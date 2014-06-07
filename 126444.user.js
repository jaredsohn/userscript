// ==UserScript==
// @name                right click disable
// @description 		 Remove Right Click Error
// @namespace   IRCTC
// @include             http://*irctc.co.in/*
// @include             https://*irctc.co.in/*
// @version     2.0
// @author              harish choudhary
// ==/UserScript==



///////////////// Remove Right Click Error message : "Sorry you donot have the permission to Right Click"
with (document.wrappedJSObject || document)
{
        onmouseup = null;
        onmousedown = null;
        oncontextmenu = null;
}

