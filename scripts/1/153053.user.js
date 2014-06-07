// ==UserScript==
// @name			tapuz all jobs popup blocker
// @namespace		tapuz_blocker
// @include			http://www.tapuz.co.il/*
// @grant			none
// ==/UserScript==

function setCookie(c_name,value,expiredays)
{
	var exdate=new Date();
	exdate.setDate(exdate.getDate()+expiredays);
	document.cookie = c_name + "=" + escape(value) + ((expiredays==null) ? "" : ";expires="+exdate.toUTCString());
}
if (window.top != window.self)  //don't run on frames or iframes
{
	var cookie_names = Array('showDrushimPopUnderUserClick',
			  	 'showDrushimPopUnder308',
				 'maavaronNewBlog2',
				 'maavaronNewBlog');

	for(var i in cookie_names) {
		setCookie(cookie_names[i], 1, null);
	}
        setCookie('tapuzMavaron',123,null);
}