// ==UserScript==
// @author         Andreas Jung (sd-daken.deviantart.com)
// @name           avoid window close on pixiv
// @namespace      http://www.w3.org/1999/xhtml 
// @description    Avoids the closing of the window/tab when clicking on a full-sized image...
// @include        http://www.pixiv.net/member_illust.php?mode=big&*
// ==/UserScript==

// This file is licensed under Creative Commons Attribution License
//
// http://creativecommons.org/licenses/by/3.0/
//
// Initial Developer:
// Andreas Jung (sd-daken.deviantart.com)
//
// Contributor(s):
//

a = document.getElementsByTagName("a");
for (i = 0; i < a.length; i++) {
	if(a[i].getAttribute("onclick").indexOf("close()") != -1) {
		a[i].removeAttribute("onclick");
	}
	if(a[i].getAttribute("href") == "javascript:void(0);") {
		a[i].removeAttribute("href");
	}
}