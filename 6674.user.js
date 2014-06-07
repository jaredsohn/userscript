// ==UserScript==
// @name           NarenLayer2488248824
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
  return function() {
	alert('layer');
 document.getElementById([lay]).style.display = 'block';
  }
}

