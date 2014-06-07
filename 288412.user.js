// ==UserScript==
// @name        booby emotes
// @namespace   BOOOOOOOOBY
// @include     *://*.instasynch.com/rooms/*
// @include     *://instasynch.com/rooms/*
// @match       *://*.instasynch.com/rooms/*
// @match       *://instasynch.com/rooms/*
// @version     3.14
// @grant       none
// @filename    NIGGERSCRYPT.js
// ==/UserScript==
/*
    <InstaSynch - Watch Videos with friends.>
    Copyright (C) 2013  InstaSynch

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
      	url:"https://googledrive.com/host/0B95JoW1APtyIU2Y2MkZKNDFVclU/booby.js", 
      	scriptCharset:"UTF-8", 
      	dataType:"script"
	});
};