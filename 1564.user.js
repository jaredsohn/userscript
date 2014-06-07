// ==UserScript==
// @name           Helgon.net fat borders fix
// @namespace      http://henrik.nyh.se
// @description    Displays thin top and bottom borders instead of thick ones on Helgon.net diary entries and in mails, as in IE.
// @include        http://*helgon.net/Diary/diary_read.asp?*
// @include        http://*helgon.net/Mail/mail_read.asp?*
// ==/UserScript==

var trs = document.getElementsByTagName("tr");

for (var i = 0; i < trs.length; i++)
	if (trs[i].className == 'line')
		trs[i].firstChild.style.padding = 0;