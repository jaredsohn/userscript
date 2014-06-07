// ==UserScript==
// @name           ProjectLocker Email Focus
// @namespace      Dan Sapala
// @description    Sets the focus to the Email textbox on projectlocker portal login.
// @include        http*://*
// ==/UserScript==

var emailsBoxes = document.getElementsByName("email");
emailsBoxes[0].focus();