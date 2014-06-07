// ==UserScript==
// @name           Khoj - The Search
// @namespace      erfanonline
// @description    Adds a little spice to the Google search page
// @include        http://www.google.*
// @version: 0.1.1
// @author: Sarwar Erfan
// @email: erfanonline@gmail.com
// ==/UserScript==

var buttons = document.getElementsByName('btnG');
if(buttons && buttons.length > 0)
{
	buttons[0].value = "খোঁজ - The Search";
}
