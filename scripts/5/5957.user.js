// SomethingAwful registration panel remover
// version 0.1
// 14-10-2006
// Copyright (c) 2006, Simon Potter
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select this script, and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          SomethingAwful Registration Panel Remover
// @namespace     http://hazexp.googlepages.com/greasemonkey
// @description   Removes the annoying registration panel on every SomethingAwful Forums Page
// @include       http://forums.somethingawful.com/*
// @include       http://forum.somethingawful.com/*
// ==/UserScript==

var elements = ['notregistered', 'globalmenu', 'searchboxes', 'navigation', 'unreg_img_br', 'unreg_img_bl'];

for (i = 0; i < elements.length; ++i)
    {
    var element = document.getElementById(elements[i]);
    if (element) {
        element.parentNode.removeChild(element);
        }
    }

var sidemargin = document.getElementById('content');
sidemargin.style.marginLeft = '0px';