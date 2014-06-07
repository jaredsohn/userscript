// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// ==UserScript==
// @name           Delicious Autofocus Tag-Field 
// @namespace      http://userscripts.org
// @version        v1.0
// @date           2008-08-07
// @description    Automatically set focus on the "tags" input field 
// @author         IchBins
// @include        http*://*delicious.com/save*
// ==/UserScript==
//
// Changelog:
// v1.0:    - initial release 
//
document.getElementById("tags").focus();