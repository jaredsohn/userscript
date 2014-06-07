//
// Copyright (c) Dec 2007 Laurie Poon. All rights reserved.
//
// ==UserScript==
// @name           YMail Compose TextArea Enlarger
// @namespace      http://mail.yahoo.com
// @description    Make text area larger in composing mail
// @include        http://*mail.yahoo.com/mc/compose*
// @include        http://*mail.yahoo.com/ym/Compose*
// @version 0.1
// ==/UserScript==

var new_width = '1000px';
var textareas = document.getElementsByTagName("textarea");
for (var i = 0; i < textareas.length; i++) 
{
   textareas[i].style.width = new_width;
}
document.getElementById('Subj').style.width = new_width;
document.getElementById('compose_editorArea').style.width = new_width;