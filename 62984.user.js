// ==UserScript==
// @name           tab renamer
// @namespace      http://userscripts.org/users/33073/scripts?sort=installs
// @description    lets you rename your tabs so you can organize your work better
// @include        *
// ==/UserScript==

GM_registerMenuCommand("Rename this tab", function() {
	var name = prompt("Enter a new name for this tab");
	if (name) document.title = name;
});
