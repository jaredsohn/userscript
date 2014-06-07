// ==UserScript==
// @name           Facebook Secure
// @namespace      Facebook Secure
// @description    Forces the Facebook logon to use the much more secure encrypted SSL.
// @include        http://www.facebook.com/*
// ==/UserScript==
//
/* BEGIN LICENSE BLOCK
Copyright (c) 2008 Austin Lawrence
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
END LICENSE BLOCK */
//

location.href = location.href.replace(/^http:/, 'https:');

//
//ChangeLog
// 0.1 - 01/16/2008 - First Version
// 0.1.2 - 02/06/2008 - Broadened the pages to be encrypted
// 0.1.3 - 02/08/2008 - Fixed crash after login
