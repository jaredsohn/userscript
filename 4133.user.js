// ==UserScript==
// @name            Utata in Group Menu
// @namespace       http://www.michaelsarver.com/
// @description     Adds link to the Group drop-down menu to the Utata flickr group.
// @include         http://*.flickr.*/*
// ==/UserScript==

// add links to specific groups to group menu
var groupMenu = false;
var groupMenuCount = 0;
var addLinkToGroupsMenu = function(name, link)
{
if (!groupMenu) groupMenu = document.getElementById('candy_nav_menu_groups');
if (!groupMenu) return false;
var someGroupLink = document.createElement('a');
someGroupLink.href = link;
if (groupMenuCount == 0) {
someGroupLink.className = 'menu_item_line_above';
groupMenuCount++;
}
someGroupLink.appendChild(document.createTextNode(name));
groupMenu.appendChild(someGroupLink);
}

addLinkToGroupsMenu('Utata', 'http://www.flickr.com/groups/utata/'); 