// ==UserScript==
// @name           Remove Actiontec Password Mask
// @namespace      http://code406.com
// @description    Removes the password masking 'feature' on Actiontec routers
// @include        http://192.168.1.1/
// @include        http://192.168.1.1/index.cgi
// @include        http://192.168.1.1/index.cgi?active_page=9074*
// @include        https://192.168.1.1/
// @include        https://192.168.1.1/index.cgi
// @include        https://192.168.1.1/index.cgi?active_page=9074*
// ==/UserScript==

/*
Copyright (c) 2010, Josh Snyder

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

(function () {
    pass1 = document.getElementById("pass1");
    pass2 = document.getElementById("pass2");

    if(pass1 && pass2) {
      pass1.type = "PASSWORD";
      pass1.style["width"] = "150px";

      pass2.parentNode.removeChild(pass2);
    }
})();