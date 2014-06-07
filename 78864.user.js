// ==UserScript==
// @name AutoContinue WebSense Block Page
// @description This simple script will automacly submit the form in the WebSense warning block page. 
// @namespace keymon
// @include http://*:15871/*
// ==/UserScript==
//javascript:window.parent.frames[1].document.ContinueForm.submit();
window.parent.frames[1].document.ContinueForm.submit();
//javascript:content.document.ContinueForm.submit();
content.document.ContinueForm.submit();