// ==UserScript==
// @name           AVR Freaks print view to topic view
// @namespace      http://world3.net
// @description    Automatically move from print view to topic view
// @include        http://www.avrfreaks.net/
// ==/UserScript==

s = location.href;
if (s.search("printview") != -1)
{
	s = s.replace(/printview/g,"viewtopic");
//	alert(s);
	location.replace(s);
}