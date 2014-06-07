// ==UserScript==
// @name           Become a fan
// @namespace      become_a_fan
// @description    Revert to become a fan!
// @include        *facebook*
// ==/UserScript==

var button = document.getElementById('profile_connect');
var inner = button.getElementsByTagName('*').item(1);
inner.innerHTML = '<i class="UIButton_Icon img spritemap_icons sx_icons_fbpage_add"></i>Become A Fan';