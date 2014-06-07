// ==UserScript==
// @name           NarenLayer24882488
// @description    dummy one
// @include file:///C:/Documents%20and%20Settings/manchala/Desktop/bug.html*
// ==/UserScript==

function add()
{
 alert('hiiii');
}

add();

function showlayer(lay)
{
	alert('layer');
 document.getElementById([lay]).style.display = 'block';
}

showlayer('usernotes');