// ==UserScript==
// @name          Multiline statuses for Vkontakte.ru
// @namespace     http://fonzi.posterous.com
// @description   Allows you to leave multiline statuses on Vkontakte.ru
// @include       http://vkontakte.ru/*
// ==/UserScript==

var right_column = document.getElementById("rightColumn"); // we don't want to affect the entire page

var original_html = /(<input style="background-position: center center;" class="inputtext")([\s\S]*)(<a id="edit_activity_toggle")/;
var new_html = "<textarea rows=\"4\" cols=\"25\" style=\"width: 156px; position: relative; top: -1px; float: left;\" id=\"edit_activity_text\" name=\"edit_activity_text\" onblur=\"return activity_editor.blur();\"></textarea><a id=\"edit_activity_toggle\"";

try {
  right_column.innerHTML = right_column.innerHTML.replace(original_html, new_html);
  right_column.innerHTML = right_column.innerHTML.replace(/<a id="edit_activity_toggle"/, "<a id=\"edit_activity_toggle\" style=\"position: relative; left: -1px;\"");
  right_column.innerHTML = right_column.innerHTML.replace(/<div id="edit_activity_select" style="display: none;">/, "<div id=\"edit_activity_select\" style=\"display: none; top: -2px;\">");
} catch(err) {
  // ahaaaaa!
}