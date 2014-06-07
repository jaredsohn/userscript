// ==UserScript==
// @name        v4c/InstaSynch Additional Features
// @namespace   v4c
// @description gives many additional features on instasynch, details on script installation page. created by biggles, unless otherwise noted in script source.
// @include     *://*.instasynch.com/rooms/*
// @include     *://instasynch.com/rooms/*
// @match       *://*.instasynch.com/rooms/*
// @match       *://instasynch.com/rooms/*
// @version     1.12
// @grant       none
// @filename    v4c_script.js
// @downloadURL http://userscripts.org/scripts/source/182167.user.js
// @updateURL   http://userscripts.org/scripts/source/182167.meta.js
// @author      biggles
// ==/UserScript==
/*
    <InstaSynch - Watch Videos with friends.>
    Copyright (C) 2013, 2014  InstaSynch

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
    
    http://opensource.org/licenses/GPL-3.0
*/

var oldOnload = window.onload;
window.onload=function onload(){
    if(oldOnload){
           oldOnload();
    }
    $.ajax({
      	url:"https://googledrive.com/host/0B2hdmKDeA0HDSFhGQjRFVjA5elU", 
      	scriptCharset:"UTF-8", 
      	dataType:"script"
	});
};