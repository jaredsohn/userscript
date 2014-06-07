// ==UserScript==
// @name            My fave Group Menu
// @namespace       
// @description     Adds link to the Group drop-down menu to the Utata flickr group.
// @include         http://*.flickr.*/*
// ==/UserScript==

// add links to your favorite challenge groups to group menu
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

addLinkToGroupsMenu('*Games', 'http://www.flickr.com/groups/yes_or_no/discuss/');
addLinkToGroupsMenu('Factory', 'http://www.flickr.com/groups/challengefactory/discuss/');
addLinkToGroupsMenu('Friendly', 'http://www.flickr.com/groups/_friendly_challenges/discuss/');
addLinkToGroupsMenu('CY', 'http://www.flickr.com/groups/challenge_you/discuss/');
addLinkToGroupsMenu('You Rock', 'http://www.flickr.com/groups/you_rock/discuss/');
addLinkToGroupsMenu('3Way', 'http://www.flickr.com/groups/3way_challenge/discuss/');
addLinkToGroupsMenu('motifd', 'http://www.flickr.com/groups/motifdchallenges/discuss/');
addLinkToGroupsMenu('thumbs up', 'http://www.flickr.com/groups/thumbsup_challenges/discuss/');
addLinkToGroupsMenu('A3B', 'http://www.flickr.com/groups/a3b/discuss/');
addLinkToGroupsMenu('storybook', 'http://www.flickr.com/groups/the-storybook-challenge-group/discuss/');
addLinkToGroupsMenu('poison', 'http://www.flickr.com/groups/pickyourpoison/discuss/');
addLinkToGroupsMenu('super hero', 'http://www.flickr.com/groups/superchallenge/discuss/');