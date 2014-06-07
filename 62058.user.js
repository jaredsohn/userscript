// ==UserScript==
// @name           GMail - Parse Eudora-imported X-HTML bodies
// @namespace      http://khopis.com/scripts
// @description    Render HTML code otherwise displayed as raw in GMail.
// @include        https://mail.google.com/mail/*
// @include        http://mail.google.com/mail/*
// @include        file:///*/Gmail*@gmail.com_files/*
// @author         Adam Katz <scriptsATkhopiscom>
// @version        0.3
// @lastupdated    2009-11-15
// @copyright      2009+ by Adam Katz
// @license        AGPL v3
// @licstart       The following is the entire license notice for this script.
/* 
 * Copyright (C) 2009  Adam Katz
 *
 * This program is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or (at your
 * option) any later version.  This program is distributed in the hope that
 * it will be useful, but WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License at <http://www.gnu.org/licenses>.
 */ 
// @licend         The above is the entire license notice for this script.
// ==/UserScript==

/**********************************************************************
 ***  NOTE - I do not use GMail; this was made for my girlfriend.
 ***         That means updates won't be common.
 ***         See also http://epic.org/privacy/gmail/faq.html
 ***
 *** BUG:  The bottom buttons (Reply, Reply to all, Forward) don't work
 ***       I don't care because this is for really old imported data.
 **********************************************************************/

function renderHTML(div) {
  if (! div.innerHTML) { return; }
  tagStart = div.innerHTML.indexOf("&lt;x-html&gt;");
  tagEnd   = div.innerHTML.indexOf("&lt;/x-html&gt;");
  if (tagStart < 0 || tagStart > tagEnd) { return; }

  var pre = div.innerHTML.substring(0, tagStart);
  var code = div.innerHTML.substring(tagStart, tagEnd+14);
  var post = div.innerHTML.substring(tagEnd+15);

  code = code
    .replace(/\n|\r/g, " ")	// to one line
    .replace(/<[^>]*>/g, "")	// remove gmail's HTML
    .replace(/&amp;/g, "&")	// un-escape ampersands (fixes char escapes)
    .replace(/&lt;/g, "<")	// render HTML tag starts as HTML
    .replace(/&gt;/g, ">")	// render HTML tag ends as HTML
    .replace(/(<[^>]*)&nbsp;/g, "$1 ") // un-escape spaces inside HTML tags
    .replace( // remove potentially dangerous code
     /<[^<]\son\w{4,20}=("([^">]*\\")*[^">]*"|'([^'>]*\\')*[^'>]*'|[^>]*)/gi,"")
    .replace(/<script[^>]*>.*<.script>/gi,"") // scripts are also dangerous

  div.innerHTML = pre + code + post;
}

// This is here for completeness ... I'm almost certain it never fires.
var emailBody = document.getElementsByClassName("ii");
for (var b=0, bl=emailBody.length; b<bl; b++) {
  renderHTML(emailBody[b]);
}

function onNodeInsert(event) {
  if (event && event.target) {
    renderHTML(event.target);
  }
}

// TODO - change scope so as to improve efficiency
document.body.addEventListener('DOMNodeInserted',onNodeInsert, false);
