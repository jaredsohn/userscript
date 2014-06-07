// ==UserScript==
// @name Auto Pilot [EMWI]
// @version 0.1
// @description Auto Pilot ~ Member Tim Riset EMWI.
// @include        http://apps.facebook.com/inthemafia/*
// @include        https://apps.facebook.com/inthemafia/*
// @match          http://apps.facebook.com/inthemafia/*
// @match          https://apps.facebook.com/inthemafia/*
// ==/UserScript==

if((navigator.appName)== 'Microsoft Internet Explorer')
{
alert('This Bookmarklet Will Not Work in IE . Please Switch to Firefox or Chrome \n Thanks ');
return;
}
else if(/apps.facebook.com/.test(document.location))
{
for(var i=0;i<document.forms.length;i++){if(/^canvas_iframe_post/.test(document.forms[i].id)){document.forms[i].target='';document.forms[i].submit();return;}};
}
else if (document.getElementById('some_mwiframe')) {
		window.location.href = document.getElementById('some_mwiframe').src;
		return;
	}
else
{
alert('Please Try Again');
}


