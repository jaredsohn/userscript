// ==UserScript==
// @name          Redirector Killer
// @namespace     
// @description   changes http://anonym.to/?http://whatever to http://whatever
// @include       http://anonym.to/?*
// @include       http://anonymz.com/?*
// @include       http://www.anonymz.com/?*
// @include       http://www.anonym.to/?*
// @include		  *redirect.php*
// ==/UserScript==

/* BEGIN LICENSE BLOCK

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You can download a copy of the GNU General Public License at
http://www.gnu.org/licenses/gpl.html or get a free printed copy 
by writing to the 
Free Software Foundation, Inc., 51 Franklin Street, Fifth Floor, 
Boston, MA 02110-1301, USA.
END LICENSE BLOCK */


location.href = location.href.replace(/^http:\/\/.*?\/.*?(?:\?url=|\?)http:\/\//, 'http://');

//OLDER VERSION
//location.href = location.href.replace(/^http:\/\/anonym\.to\/\?/, '');
//location.href = location.href.replace(/^http:\/\/(|www\.)anonymz\.com\/\?/, '');
//location.href = location.href.replace(/^http:\/\/www\.anonym\.to\/\?/, '');

//test
//http://xxx.usde.ru/engine/redirect.php?url=http://www.pixhost.org/show/2....
//http://anonym.to/?http://www.topix.com/forum/world/macedonia/TAAAAFN23PMGMJ147
//http://anonymz.com/?http://www.microsoft.com
