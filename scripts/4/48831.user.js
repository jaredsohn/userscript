// ==UserScript==
// @name           YouPorn Enter Skipper
// @namespace      yourpon.tools
// @description    Skip the enterpage of youporn
// @include        http://youporn.com/
// ==/UserScript==

function setCookie(name, value, expires, path, domain, secure) {
    document.cookie= name + "=" + escape(value) +
        ((expires) ? "; expires=" + expires.toGMTString() : "") +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure" : "");
}

function getScreenWidth() {
	var width = '-';

	var n=navigator;
	if (self.screen) {
		width = screen.width
	} else if (self.java) {
		var j=java.awt.Toolkit.getDefaultToolkit();
		var s=j.getScreenSize();
		width = s.width;
	}	
	
	return width;
}

if (document.getElementById('choices'))
{
	var expDate = new Date();
	expDate.setTime(expDate.getTime()+(1*24*3600*1000));
	setCookie("age_check", 1, expDate, '/', ".youporn.com");
	setCookie("screen_width", getScreenWidth(), expDate, '/', ".youporn.com");

	location.reload();
}