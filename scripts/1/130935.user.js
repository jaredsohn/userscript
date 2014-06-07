/*

Following code belongs to Wall of Avatars for Google+.
Copyright (C) 2012 Jackson Tan
Copyright (C) 2012 Keita Kagurazaka
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>.

*/

// ==UserScript==
// @id             WallofAvatars
// @name          Wall of Avatars for Google+
// @version        1.0.1
// @namespace      gplus.wallofAvatars
// @author         Jackson Tan
// @description    Display a wall of avatars as the background image on your Google+.
// @include        https://plus.google.com/*
// @run-at         document-end
// ==/UserScript==

if (document.URL.match(/https:\/\/plus\.google\.com(\/u\/\d)?/)) {
    GM_xmlhttpRequest({
        method: 'GET',
        url: document.URL.match(/https:\/\/plus\.google\.com(\/u\/\d)?/)[0] + '/_/socialgraph/lookup/circles/?ct=2&m=true&tag=fg&_reqid=' + (new Date().getTime() % 1000000) + '&rt=j',
        onload: function (response) {
            var arr = eval('//' + response.responseText);
            var userptr = arr[0][1][2];
            var container = document.querySelector('div[class="k-YB-nb k-Qf-YB-nb k-YB-nb-sUUURc k-YB-nb-Zg"]');
                var html = '';
                for (var i = 0; i < Math.min(userptr.length, 880) ; i++) {
                    var userid = userptr[i][0][2];
                    var username = userptr[i][2][0];
                    var userimg = userptr[i][2][8];
                    userimg = userimg.replace('/photo.jpg', '/s48-c-k/photo.jpg');
                    var tmp1 = '<img src="' + userimg + '" width="48px" height="48px" alt="' + username + '" class="aVKJCc w6iMxb" oid="' + userid + '">';
                    html += tmp1;
                }
                html += '';
                var nav_wrap = document.createElement('div');
	nav_wrap.id = "wall";
                nav_wrap.innerHTML += html;
	container.insertBefore(nav_wrap, container.childNodes[0]);
        }
    });
}

document.addEventListener("click", function(_event) {
	var o = document.querySelector('div[class="aVKJCc w6iMxb"]');
	setTimeout(function() {
	if (typeof(o) == 'undefined') {
		container.insertBefore(nav_wrap, container.childNodes[0]);
		}
	}, 1000);
}, false);

var css_wall = "#wall {\nmargin-top: 102px;\nmargin-left: 102px;\nopacity: 0.2;\n}\n}";

GM_addStyle(css_wall);