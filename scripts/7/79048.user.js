// ==UserScript==
// @name           Pochta Rossii
// @namespace      http://info.russianpost.ru/servlet/post_item
// @include        http://info.russianpost.ru/servlet/post_item
// ==/UserScript==

if (document.getElementsByTagName("input")[3].value == "")
{
	document.getElementsByTagName("input")[3].value = "63020127171994";
	document.getElementsByTagName("form")[0].submit();
}