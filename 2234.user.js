// Fixes forms on the web admin for the DLink DSL-302G (and possibly
// other DLink ADSL modems too) so that they all work on Firefox.
// 2005-11-28
// Copyright (c) 2005, Phillip Bradbury, <phlipping@yahoo.com>
// http://phlip.lxhost.com/
//
// Released under the terms of the GNU General Public Licence (GPL)
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name DLink Fixer
// @description Changes POST to GET on DLink webmin pages, to avoid 501 errors
// @namespace http://phlip.lxhost.com/
// @include http://10.1.1.1/*
// @include http://10.1.1.2/*
// ==/UserScript==

for (i = 0; i < document.forms.length; i++)
{
	if (document.forms[i].method)
		document.forms[i].method = 'get';
}
