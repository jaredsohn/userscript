//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Facebook tab height fixer    
// @namespace      http://roderickhodgson.com/facebook-greasemonkey-script/
// @description    Fixes the recent bug in tab padding in facebook's nav menu (What? You haven't noticed?)
// @include        http://www.facebook.com/*
// @author         Roderick Hodgson http://roderickhodgson.com
// ==/UserScript==
//
// --------------------------------------------------------------------
//
// version 1.0
// 2009-04-27 
// Copyright 2009 Roderick Hodgson
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details <http://www.gnu.org/licenses/>.
//
// --------------------------------------------------------------------
//

var head, style;
head = document.getElementsByTagName('head')[0];
style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '#fb_menubar .fb_menu .fb_menu_title a {padding-bottom:6px}';
head.appendChild(style);

