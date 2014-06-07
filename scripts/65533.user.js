// ==UserScript==
// @name           Pardus Forum Banner.
// @namespace      pardus.at
// @description    Blocks access to the pardus forum.
// @include        http://forum.pardus.at/
// @include		   http://*.pardus.at/menu.php
// @version        0.12
// @author         Beigeman
// ==/UserScript==

if (window.location.href == 'http://forum.pardus.at/')
{
forum = document.getElementsByTagName('html')[0];
forum.innerHTML = " ";
}

var forumButton = document.getElementsByTagName('td')[17];
if (forumButton) {
    forumButton.parentNode.removeChild(forumButton);
}

var prettyfy = document.getElementsByTagName('td')[16];
if (prettyfy) {
    prettyfy.parentNode.removeChild(prettyfy);
}