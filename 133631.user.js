// ==UserScript==
// @name                Youtube Remove Recommended Videos
// @description	        Remove recommended videos in sidebar.  Does NOT remove suggested videos.
// @include				http://www.youtube.com/*
// @include             http://youtube.com/*
// ==/UserScript==


/**  This script is designed to remove the recommend videos from the front page of youtube and also from
	 individual video pages.  It does not remove the suggested videos, which I find useful  **/
	
// First we want to set the event listener. 

window.addEventListener("load", removeElements, true);

function removeElements(event) {    // Event Handler

// Remove element depending on whether the script is being run on the main page or not

if (window.location.href.length < 26) {                       // the script is being executed on the main page
	var sidebar = document.getElementById("video-sidebar");   // recommended videos on main page
	sidebar.parentNode.removeChild(sidebar);
	}
else {                                                        // script is not being executed on main page
	var watchvideo = document.getElementById("branded-playlist-module");  // recommended videos on video pages
	watchvideo.parentNode.removeChild(watchvideo);
	};

}

/*  Copyright 2012.  My email: bigeprogramming@gmail.com
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
*/
