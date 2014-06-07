// ==UserScript==
// @name           HackForums Disable Avatar Resizing
// @namespace      https://userscripts.org/scripts/show/130272
// @description    Disable the client-side resizing of avatars.
// @match          *://*.hackforums.net/showthread.php*
// @match          *://*.hackforums.net/private.php*
// @match          *://*.hackforums.net/usercp.php*
// @version        1.0.1
// @downloadURL    https://userscripts.org/scripts/source/130272.user.js
// @updateURL      https://userscripts.org/scripts/source/130272.meta.js
// ==/UserScript==
// Copyright 2012 PyroStorm
// This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. For a copy, see <http://www.gnu.org/licenses/>. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
(function(){var e,d,f;e=document.getElementsByClassName("post_avatar");for(d in e){f=e[d].firstElementChild.firstElementChild;if((f.width!==f.naturalWidth)||(f.height!==f.naturalHeight)){f.width=f.naturalWidth;f.height=f.naturalHeight}}}());