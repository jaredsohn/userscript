// ==UserScript==
// @name           Wikispaces - land floating editor
// @namespace      http://khopis.com/scripts
// @description    Embed that annoying "Editor" floating window on the page
// @include        http://*.wikispaces.com/page/edit/*
// @include        https://*.wikispaces.com/page/edit/*
// @author         Adam Katz <scriptsATkhopiscom>
// @copyright      2008 by Adam Katz
// @license        AGPL v3+
// @version        0.4
// @lastupdated    2008-10-01
// ==/UserScript==
/*
 * This breaks the floating "Editor" window into formatting buttons, which get
 * placed above the text area, and control buttons (now including cancel),
 * which are kept in the original floating toolbar, which is moved to the side.
 * This works for Text Editor, Visual Editor, and it even survives Preview mode.
 * 
 * Note - be careful tweaking this, as Wikispaces's JS is tough to mess with;
 * I could not completely remove the floating panel and still have preview work.
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License at <http://www.gnu.org/licenses>.
 */

var newEdit, editPanel, floating, titlebars, toolbarPopup;

newEdit = document.createElement("div");
newEdit.id = "newEdit";

editPanel = document.getElementById("Buttons1_WikispacesEditorContent");

// copy old panel into new panel, removing id attributes as they must be unique
newEdit.innerHTML = editPanel.innerHTML.replace(/id="[^"]*./,'');

floating = document.getElementById("Buttons1_container");
floating.parentNode.insertBefore(newEdit, floating);

titlebars = document.getElementsByClassName("wikispaces_n");
for (var i=0; i<titlebars.length; i++) {
  var thisTitle = titlebars[i].childNodes[0];
  thisTitle.innerHTML = thisTitle.innerHTML.replace(/Editor/,"Edit Controls");
}

toolbarPopup = document.getElementById("toolbarPopup");
toolbarPopup.style.width = "300px";
if (window.innerWidth > 1024) {
  toolbarPopup.style.margin = "2em 0 -1em";
  toolbarPopup.style.left = '';
  toolbarPopup.style.right = 0;
  toolbarPopup.style.top = 0;
  try { toolbarPopup.style.opacity = "0.75"; } catch(e) {  }
} else {
  toolbarPopup.style.position = "inherit";
  toolbarPopup.style.cssFloat = "right";
  toolbarPopup.style.margin = "2em 0 -2.5em";
}

function GMcss(style) // make important easier to enter here, wrap better
  { GM_addStyle( style.replace(/!;/g, "!important;").replace(/}/g, "}\n") ); }

GMcss("\n"
 + "#toolbarPopup_content { height:inherit!; width:inherit!; }"
 + "#newEdit              { background-color:#eee; }"
 + "#newEdit > *          { vertical-align:middle; }"
 // hide control buttons from newEdit and formatting buttons from old editPanel
 + '#newEdit > input, #newEdit > a[onclick="return cancelEdit(this);"],\n'
 + "  #Buttons1_WikispacesEditorContent .rteButton\n"
 + "                      { display:none; }"
 + 'a[onclick="return cancelEdit(this);"]\n'  // make "cancel" a button
 + "   { background-color:#dbb; color:#000; padding:3px 6px; \n"
 + "     text-decoration:none; border:1px solid;\n"
 + "     border-color:#ddd #777 #777 #ddd; }"
 + 'a[onclick="return cancelEdit(this);"]:hover { background-color:#fdd; }'
);
