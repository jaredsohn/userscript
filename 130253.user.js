// ==UserScript==
// @name           HackForums Group Members List
// @namespace      https://userscripts.org/scripts/show/130253
// @description    Get a list of an official group's members.
// @match          *://*.hackforums.net/managegroup.php*
// @version        1.0.4
// @downloadURL    https://userscripts.org/scripts/source/130253.user.js
// @updateURL      https://userscripts.org/scripts/source/130253.meta.js
// ==/UserScript==
// Copyright 2012 PyroStorm
// This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. For a copy, see <http://www.gnu.org/licenses/>. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
var a,b,c,d,e,f,g,h,i,j,k,l,m,o,p;f=document.getElementsByTagName("form")[0];a=f.getElementsByTagName("tr");a.slice=Array.prototype.slice;b=a.slice(2,a.length);c=[];h=[]; for(i in b){d=b[i].firstElementChild.firstElementChild;m=d.firstElementChild;if(null!==m){n=m.style.color;if(""!==n&&null!==n){var q,r=n,s=void 0;"#"===r.substr(0,1)?q=r:(s=/(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(r),q="#"+(16777216+(parseInt(s[2],10)<<16)+(parseInt(s[3],10)<<8)+parseInt(s[4],10)).toString(16).slice(1));o="[color="+q+"]";p="[/color]"}else p=o="";g=m.innerHTML}else p=o="",g=d.innerHTML;c.push(g);h.push("[url="+d.getAttribute("href")+"]"+o+g+p+"[/url]")}e=document.createElement("textarea"); j=document.createElement("textarea");e.setAttribute("columns",20);j.setAttribute("columns",40);l=[e,j];for(i in l)k=l[i],k.setAttribute("readonly","readonly"),k.setAttribute("rows",15);e.innerHTML=c.join("\n");j.innerHTML=h.join("\n");for(i in l)f.appendChild(l[i]);