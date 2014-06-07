// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// ==UserScript==
// @name           Delicious Autofocus Notes-Field 
// @namespace      http://userscripts.org
// @version        v1.0
// @date           2008-08-07
// @description    Automatically set focus on the "notes" input field 
// @author         WCityMike
// @include        http*://*delicious.com/save*
// ==/UserScript==
//
// Changelog:
// v1.0:    - initial release 
// 
// Self-admitted ripoff of Delicious Autofocus Tags-Field.

document.getElementById("notes").focus();