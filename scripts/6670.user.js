// ==UserScript==
// @name           NarenLayer24
// @description    dummy one
// @include http://manchala-dt.bangalore.corp.yahoo.com/test.php*
// ==/UserScript==

function add()
{
 alert('hiiii');
}

add();

function showlayer(lay)
{
 document.getElementById([lay]).style.display = 'block';
}

showlayer('usernotes');
