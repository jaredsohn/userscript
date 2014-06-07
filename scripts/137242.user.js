// ==UserScript==
// @name           YouTube.com - Permalink Comments
// @namespace      spafic/youtube-permalink
// @description    Adds a link onto each comment that easily allows the viewer to permalink to a specific comment.
// @author         Spafic
// @copyright      Spafic 2012 (http://userscripts.org/users/Spafic)
// @licence        GNU General Public License
// This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. For a copy, see <http://www.gnu.org/licenses/>. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.use
//
// @match          *://*.youtube.com/watch?*
// @version        
// @downloadURL    https://userscripts.org/scripts/source/137242.user.js
// @updateURL      https://userscripts.org/scripts/source/137242.meta.js
//
// @icon           http://s.ytimg.com/yt/favicon-vfldLzJxy.ico
// @icon64         http://s.ytimg.com/yt/favicon-vfldLzJxy.ico
// @history        1.0.0 - Script created
// ==/UserScript==

(function(){var b,d,e,c,a;b=document.getElementsByClassName("comment yt-tile-default");videoid=document.getElementById("watch-container").getElementsByTagName("link")[0].getAttribute("href").split(/v\=/gim)[1];for(a=0;a<b.length;a++)d=b[a].getAttribute("data-id"),e=b[a].getElementsByClassName("metadata")[0],c=document.createElement("span"),c.innerHTML='<a href="http://www.youtube.com/watch?v='+videoid+"&lc="+d+'" target="_BLANK">Permalink</a>',e.appendChild(c)})();