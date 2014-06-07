{\rtf1\ansi\ansicpg1252\deff0\deflang1033{\fonttbl{\f0\fswiss\fcharset0 Arial;}}
{\*\generator Msftedit 5.41.15.1507;}\viewkind4\uc1\pard\f0\fs20 // Portraits\par
// version 0.12 beta\par
// This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 3 of the License, or (at your option) any later version.\par
// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.\par
// You should have received a copy of the GNU General Public License along with this program; if not, see <http://www.gnu.org/licenses/>.\par
//\par
// --------------------------------------------------------------------\par
\par
// ==UserScript==\par
// @name           Portraits\par
// @namespace      www.tw-help.net\par
// @description    Script that changes ingame portraits\par
// @include        http://*.the-west.*/game.php*\par
// @include        http://*.innogames.*/game.php*\par
// ==/UserScript==\par
\par
\par
var Greenhorn=\{\par
changeAvatar:function(div)\{\par
var img=div.getElementsByTagName('img');\par
var r1=new RegExp("images\\/avatars\\/greenhorn_woman\\.jpg", "i");\par
var r2=new RegExp("images\\/avatars\\/greenhorn_woman_small\\.png", "i");\par
for(var i in img)\{\par
if(r1.test(img[i].src))\par
img[i].src="http://dump.ninjapirat.org/files/greenhorn_woman.jpg";\par
if(r2.test(img[i].src))\{\par
img[i].src="http://dump.ninjapirat.org/files/greenhorn_woman_small.jpg";\par
\}\par
\}\par
var img=div.getElementsByTagName('img');\par
var r1=new RegExp("images\\/avatars\\/cowboy\\.jpg", "i");\par
var r2=new RegExp("images\\/avatars\\/cowboy_small\\.png", "i");\par
for(var i in img)\{\par
if(r1.test(img[i].src))\par
img[i].src="http://dump.ninjapirat.org/files/cowboy.jpg";\par
if(r2.test(img[i].src))\{\par
img[i].src="http://dump.ninjapirat.org/files/cowboy_small.jpg";\par
\}\par
\}\par
var r1=new RegExp("images\\/avatars\\/indian\\.jpg", "i");\par
var r2=new RegExp("images\\/avatars\\/indian_small\\.png", "i");\par
for(var i in img)\{\par
if(r1.test(img[i].src))\par
img[i].src="http://dump.ninjapirat.org/files/indian.jpg";\par
if(r2.test(img[i].src))\{\par
img[i].src="http://dump.ninjapirat.org/files/indian_small.jpg";\par
\}\par
\}\par
var r1=new RegExp("images\\/avatars\\/worker\\.jpg", "i");\par
var r2=new RegExp("images\\/avatars\\/worker_small\\.png", "i");\par
for(var i in img)\{\par
if(r1.test(img[i].src))\par
img[i].src="http://dump.ninjapirat.org/files/worker.jpg";\par
if(r2.test(img[i].src))\{\par
img[i].src="http://dump.ninjapirat.org/files/worker_small.jpg";\par
\}\par
\}\par
var r1=new RegExp("images\\/avatars\\/mercenary\\.jpg", "i");\par
var r2=new RegExp("images\\/avatars\\/mercenary_small\\.png", "i");\par
for(var i in img)\{\par
if(r1.test(img[i].src))\par
img[i].src="http://i626.photobucket.com/albums/tt345/bushidoka/mercenary.jpg";\par
if(r2.test(img[i].src))\{\par
img[i].src="http://i626.photobucket.com/albums/tt345/bushidoka/mercenary_small.jpg";\par
\}\par
\}\par
var r1=new RegExp("images\\/avatars\\/gunslinger\\.jpg", "i");\par
var r2=new RegExp("images\\/avatars\\/gunslinger_small\\.png", "i");\par
for(var i in img)\{\par
if(r1.test(img[i].src))\par
img[i].src="http://dump.ninjapirat.org/files/gunslinger.jpg";\par
if(r2.test(img[i].src))\{\par
img[i].src="http://dump.ninjapirat.org/files/gunslinger_small.jpg";\par
\}\par
\}\par
var r1=new RegExp("images\\/avatars\\/bountyhunter\\.jpg", "i");\par
var r2=new RegExp("images\\/avatars\\/bountyhunter_small\\.png", "i");\par
for(var i in img)\{\par
if(r1.test(img[i].src))\par
img[i].src="http://dump.ninjapirat.org/files/bountyhunter.jpg";\par
if(r2.test(img[i].src))\{\par
img[i].src="http://dump.ninjapirat.org/files/bountyhunter_small.jpg";\par
\}\par
\}\par
var r1=new RegExp("images\\/avatars\\/Iroquois\\.jpg", "i");\par
var r2=new RegExp("images\\/avatars\\/Iroquois_small\\.png", "i");\par
for(var i in img)\{\par
if(r1.test(img[i].src))\par
img[i].src="http://dump.ninjapirat.org/files/Iroquois.jpg";\par
if(r2.test(img[i].src))\{\par
img[i].src="http://dump.ninjapirat.org/files/Iroquois_small.jpg";\par
\}\par
\}\par
var r1=new RegExp("images\\/avatars\\/vagabond_woman\\.jpg", "i");\par
var r2=new RegExp("images\\/avatars\\/vagabond_woman_small\\.png", "i");\par
for(var i in img)\{\par
if(r1.test(img[i].src))\par
img[i].src="http://dump.ninjapirat.org/files/vagabond_woman.jpg";\par
if(r2.test(img[i].src))\{\par
img[i].src="http://dump.ninjapirat.org/files/vagabond_woman_small.jpg";\par
\}\par
\}\par
var r1=new RegExp("images\\/avatars\\/vagabond\\.jpg", "i");\par
var r2=new RegExp("images\\/avatars\\/vagabond_small\\.png", "i");\par
for(var i in img)\{\par
if(r1.test(img[i].src))\par
img[i].src="http://dump.ninjapirat.org/files/wanderer.jpg";\par
if(r2.test(img[i].src))\{\par
img[i].src="http://dump.ninjapirat.org/files/wanderer_small.jpg";\par
\}\par
\}\par
\par
\},\par
\par
\par
changeWestFunction:function()\{\par
  var loc = document.location;\par
\tab var o_show = unsafeWindow.AjaxWindow.setJSHTML;\par
\tab var f = function(div, content) \{\par
\tab\tab if (!div) return;\par
\tab\tab var ret = o_show(div, content);\par
\tab\tab Greenhorn.changeAvatar(div);\par
\tab\tab return(ret);\par
\tab\};\par
\tab for(var o in o_show) \{\par
\tab\tab f[o] = o_show[o];\par
\tab\}\par
  unsafeWindow.AjaxWindow.setJSHTML = f;\par
  \},\par
  changePlayerAvatar:function()\{\par
   \par
var r=new RegExp("images\\/avatars\\/greenhorn_woman_small\\.png", "i");\par
   av=document.getElementById('avatar').getElementsByTagName('img')[0];\par
   if(r.test(av.src))\{\par
   av.src="http://dump.ninjapirat.org/files/greenhorn_woman_small.jpg";\par
   \}  \par
var r=new RegExp("images\\/avatars\\/cowboy_small\\.png", "i");\par
   av=document.getElementById('avatar').getElementsByTagName('img')[0];\par
   if(r.test(av.src))\{\par
   av.src="http://dump.ninjapirat.org/files/cowboy_small.jpg";\par
   \}  \par
var r=new RegExp("images\\/avatars\\/indian_small\\.png", "i");\par
   av=document.getElementById('avatar').getElementsByTagName('img')[0];\par
   if(r.test(av.src))\{\par
   av.src="http://dump.ninjapirat.org/files/indian_small.jpg";\par
   \}\par
var r=new RegExp("images\\/avatars\\/gunslinger_small\\.png", "i");\par
   av=document.getElementById('avatar').getElementsByTagName('img')[0];\par
   if(r.test(av.src))\{\par
   av.src="http://dump.ninjapirat.org/files/gunslinger_small.jpg";\par
   \}\par
var r=new RegExp("images\\/avatars\\/bountyhunter_small\\.png", "i");\par
   av=document.getElementById('avatar').getElementsByTagName('img')[0];\par
   if(r.test(av.src))\{\par
   av.src="http://dump.ninjapirat.org/files/bountyhunter_small.jpg";\par
   \}    \par
var r=new RegExp("images\\/avatars\\/Iroquois_small\\.png", "i");\par
   av=document.getElementById('avatar').getElementsByTagName('img')[0];\par
   if(r.test(av.src))\{\par
   av.src="http://dump.ninjapirat.org/files/Iroquois_small.jpg";\par
   \}  \par
\par
var r=new RegExp("images\\/avatars\\/worker_small\\.png", "i");\par
   av=document.getElementById('avatar').getElementsByTagName('img')[0];\par
   if(r.test(av.src))\{\par
   av.src="http://dump.ninjapirat.org/files/worker_small.jpg";\par
   \}  \par
var r=new RegExp("images\\/avatars\\/mercenary_small\\.png", "i");\par
   av=document.getElementById('avatar').getElementsByTagName('img')[0];\par
   if(r.test(av.src))\{\par
   av.src="http://i626.photobucket.com/albums/tt345/bushidoka/mercenary_small.jpg";\par
   \}  \par
var r=new RegExp("images\\/avatars\\/vagabond_woman_small\\.png", "i");\par
   av=document.getElementById('avatar').getElementsByTagName('img')[0];\par
   if(r.test(av.src))\{\par
   av.src="http://dump.ninjapirat.org/files/vagabond_woman_small.jpg";\par
   \} \par
var r=new RegExp("images\\/avatars\\/vagabond_small\\.png", "i");\par
   av=document.getElementById('avatar').getElementsByTagName('img')[0];\par
   if(r.test(av.src))\{\par
   av.src="http://dump.ninjapirat.org/files/wanderer_small.jpg";\par
   \}  \par
\par
\par
\}\par
\};\par
\par
\par
\par
Greenhorn.changeWestFunction();\par
Greenhorn.changePlayerAvatar();\par
}
