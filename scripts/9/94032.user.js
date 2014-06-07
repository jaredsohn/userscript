// ==UserScript==
// @name           CHH水区直达通道
// @namespace      CHH Water
// @include        http://www.chiphell.com/*
// @description    让CHHer们更方便地直达最常用的『水区』！
// @version        1.1
// @author         xiamubobby
// @homepage       http://xiamubobby.appspot.com
// @run-at         document-start
// ==/UserScript==
//
// Copyright (C) 2008-2010 Xu Zhen
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
(function(){			
			var x = document.getElementById("nv");
			var l = document.createElement("li")
			var a = document.createElement("a"); 				
				a.href="/forum-18-1.html";                                 
				a.innerHTML="水区";                                 
				a.hidefocus=true;                                 
				a.style.fontWeight = 'bold';                                      		
			x.childNodes[3].insertBefore(l,x.childNodes[3].childNodes[0]);
			l.insertBefore(a,l.childNodes[0]);
			})
			();