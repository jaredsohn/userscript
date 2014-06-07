// ==UserScript==
// @name Auto-Unframe <Mafia Wars>
// @version 1.1
// @description Auto-Unframe ~ When you login into FB App.
// @include        http://apps.facebook.com/inthemafia/*
// @include        https://apps.facebook.com/inthemafia/*
// @match          http://apps.facebook.com/inthemafia/*
// @match          https://apps.facebook.com/inthemafia/*
// ==/UserScript==

if (navigator.appName ===  'Microsoft Internet Explorer') {
	alert('You are using Internet Explorer\nPlease use Firefox or Chrome');
	}
else
{
if (/m.mafiawars.com/.test(document.location))
{
location.href = document.location+'?iframe=1';
}
else if (/apps.facebook.com/.test(document.location))
{
for (i=0;i<document.forms.length;i++)
{
if (/canvas_iframe_post(.*)/.test(document.forms[i].id))
{
document.forms[i].target = '';
document.forms[i].submit();
}
}
}
else if (document.getElementById('some_mwiframe')) {
		window.location.href = document.getElementById('some_mwiframe').src;
		}
};