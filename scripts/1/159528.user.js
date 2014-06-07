// ==UserScript==
// @name               IRCTC Right Click Enable By Mandy
// @description 		Remove Right Click Error
// @namespace   IRCTC
// @include             http://*irctc.co.in/*
// @include             https://*irctc.co.in/*
// @version     1.0
// @author              Mandy
// ==/UserScript==


///////////////// Remove Right Click Error message : "Sorry you donot have the permission to Right Click"
with (document.wrappedJSObject || document)
{
        onmouseup = null;
        onmousedown = null;
        oncontextmenu = null;
}