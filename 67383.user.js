// ==UserScript==
// @name        anony.es redirector
// @namespace   http://uploading.com/
// @description Auto click, redirect
// @include     http://anony.es/*
// @include     http://www.anony.es/*
// @copyright   2010, Perberos (perberos@gmail.com)
// @license     (CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @version     1.0
// @author      German Perugorria (Perberos)
// @homepage    http://matsusoft.com.ar/
// ==/UserScript==

var stringmatch = 'http://anony.es/?';

if (location.href.indexOf(stringmatch) != -1)
{
	top.location.href = location.href.substr(location.href.indexOf(stringmatch) +
		stringmatch.length);
}

