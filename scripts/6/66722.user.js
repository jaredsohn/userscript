// shenkar meida net fixer
// version 0.1.1
// 2010-01-18
// Copyright (c) 2010, Eran Chetzroni
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// http://www.gnu.org/licenses/gpl.html
//
// ==UserScript==
// @name           Shenkar InfoNet
// @namespace      org.chetz
// @description    Fix Shenkar Meida Net
// @include        http://webacd.shenkar.ac.il/*
// ==/UserScript==

unsafeWindow.navigator.__defineGetter__("appName", function() { return "Microsoft Internet Explorer";})
if (window.location.href == "http://webacd.shenkar.ac.il/michlol2000/errors/err.asp?error=120"){
	window.location.href = "http://webacd.shenkar.ac.il/michlol2000/asp/mida_login_unified.asp?type=login";
}



