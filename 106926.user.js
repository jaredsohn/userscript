// ==UserScript==
// @name           PopUp Smiley Indowebster
// @namespace      http://www.indowebster.web.id
// @description    Hanya pop up smiley di forum IDWS
// @include        http://www.indowebster.web.id/*
// @include        http://www.indowebster.web.id/showthread.php?t=*
// @version        v1.02
// ==/UserScript==
//
//      IDWS Smiley Pop-Up Released
//      
//      Copyright 2011 ttopengg <ttopengg@facebook.com>
//      
//      This program is free software; you can redistribute it and/or modify
//      it under the terms of the GNU General Public License as published by
//      the Free Software Foundation; either version 2 of the License, or
//      (at your option) any later version.
//      
//      This program is distributed in the hope that it will be useful,
//      but WITHOUT ANY WARRANTY; without even the implied warranty of
//      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//      GNU General Public License for more details.
//      
//      You should have received a copy of the GNU General Public License
//      along with this program; if not, write to the Free Software
//      Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
//      MA 02110-1301, USA.
//
//      This program is free software; you can redistribute it and/or modify
//      it under the terms of the GNU General Public License as published by
//      the Free Software Foundation; either version 2 of the License, or
//      (at your option) any later version.
//      
//      This program is distributed in the hope that it will be useful,
//      but WITHOUT ANY WARRANTY; without even the implied warranty of
//      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//      GNU General Public License for more details.
//      
//      You should have received a copy of the GNU General Public License
//      along with this program; if not, write to the Free Software
//      Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
//      MA 02110-1301, USA.

var viewLogButton = document.createElement("div");viewLogButton.innerHTML="<a href=\"#\" onclick=\"window.open('http://www.indowebster.web.id/misc.php?do=getsmilies&editorid=vB_Editor_001','popup','width=500,height=500,scrollbars=yes,resizable=no,toolbar=no,directories=no,location=no,menubar=no,status=no,left=100,top=60'); return false\"><img src=\"http://www.indowebster.web.id/images/smilies/Om-gatot-peace.gif\" border=\"0\"/></a>";viewLogButton.setAttribute("style", "position: fixed; left: 0px; bottom: -2px; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;");document.body.appendChild(viewLogButton);window=unsafeWindow;document=window.document;
replaceElement(document, yemo);
function listen(evt){
var node = evt.target;if (node.nodeType == document.ELEMENT_NODE) replaceElement(node, yemo); if (node.nodeType == document.TEXT_NODE) {var parent = node.parentNode;var span = replaceTextNode(node, yemo);if (span) parent.replaceChild(span, node);}}document.body.addEventListener('DOMNodeInserted', listen, true);
