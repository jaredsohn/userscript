// ==UserScript==
// @name        Steam 绿光/创意工坊图片修复
// @author      Deparsoul
// @namespace   http://userscripts.org/users/deparsoul
// @description 缓解部分地区因为网络问题导致的 Steam 绿光/创意工坊图片无法浏览的问题
// @include     http*://steamcommunity.com/sharedfiles/filedetails/*
// @version     2014.01.16
// @icon        http://store.steampowered.com/favicon.ico
// @license     GPL version 3 or any later version
// @run-at      document-end
// @grant       none
// ==/UserScript==

/*
 *This program is free software: you can redistribute it and/or modify
 *it under the terms of the GNU General Public License as published by
 *the Free Software Foundation, either version 3 of the License, or
 *(at your option) any later version.
 *
 *This program is distributed in the hope that it will be useful,
 *but WITHOUT ANY WARRANTY; without even the implied warranty of
 *MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *GNU General Public License for more details.
 *
 *You should have received a copy of the GNU General Public License
 *along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

if(typeof onYouTubeIframeAPIReady == 'function')
    onYouTubeIframeAPIReady();
