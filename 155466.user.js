// ==UserScript==
// @description Switch from the mobile to the desktop version.
// @include     http://m.*.france3.fr/*
// @include     http://mobile.lepoint.fr/*
// @include     http://mobile.twitter.com/*
// @include     http://touch.metronews.fr/*
// @include     https://mobile.twitter.com/*
// @name        Unmobile
// @namespace   http://userscripts.org/users/nescafe
// @run-at      document-start
// @version     4
// ==/UserScript==

if (('http://m.' === document.location.href.substr(0, 9)) && ('.france3.fr' === document.location.host.substr(-11)))
{
	document.location.href = 'http://' + document.location.href.substr(9);
}
else if ('http://mobile.lepoint.fr/' === document.location.href.substr(0, 25))
{
	document.location.href = 'http://www.lepoint.fr/' + document.location.href.substr(25);
}
else if ('http://mobile.twitter.com/' === document.location.href.substr(0, 26))
{
	document.location.href = 'http://twitter.com/' + document.location.href.substr(26);
}
else if ('http://touch.metronews.fr/' === document.location.href.substr(0, 26))
{
	document.location.href = 'http://www.metronews.fr/' + document.location.href.substr(26);
}
else if ('https://mobile.twitter.com/' === document.location.href.substr(0, 27))
{
	document.location.href = 'https://twitter.com/' + document.location.href.substr(27);
}
