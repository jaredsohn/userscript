//
// Copyright (c) Dec 2007 Laurie Poon. All rights reserved.
// Adapted       Jun 2010 Sean Flanigan
//
// ==UserScript==
// @name           Google Code Issues TextArea Enlarger
// @namespace      http://code.google.com
// @description    Make text area larger in issue editor
// @include        http://code.google.com/p/octgn/issues/detail*
// @version 0.1
// ==/UserScript==

var new_width = '1200px';
var textareas = document.getElementsByTagName("textarea");
for (var i = 0; i < textareas.length; i++) 
{
   textareas[i].style.width = new_width;
}
