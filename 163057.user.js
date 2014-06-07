// ==UserScript==
// @name        Gmail show "From" and "To" when writing an email
// @description Automaticaly shows the "From" and "To" fields when replying to a message or writing a new one on Gmail.
// @namespace   rAthur's space
// @downloadURL https://userscripts.org/scripts/source/163057.user.js
// @updateURL   https://userscripts.org/scripts/source/163057.meta.js
// @include     https://mail.google.com/mail/*
// @version     1.4
// ==/UserScript==
setInterval(function()
{
	var class_fX = document.getElementsByClassName('fX');
	for (i=0; i<class_fX.length; i++)
		class_fX[i].style.display = 'block';
	var class_hl = document.getElementsByClassName('hl');
	for (i=0; i<class_hl.length; i++)
		class_hl[i].style.display = 'none';
	var class_aX = document.getElementsByClassName('aX');
	for (i=0; i<class_aX.length; i++)
		class_aX[i].style.display = 'block';
	var class_aA4 = document.getElementsByClassName('aA4');
	for (i=0; i<class_aA4.length; i++)
		class_aA4[i].style.display = 'none';
},100);