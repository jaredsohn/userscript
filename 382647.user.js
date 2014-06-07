// ==UserScript==
// @name        Simple Save
// @namespace   gaiaonline
// @include     http://www.gaiaonline.com/profiles/*/*/?mode=edit
// @version     1
// @grant       none
// ==/UserScript==

document.querySelector('#header_left').innerHTML += '<a href="http://www.gaiaonline.com/profiles/?mode=edit" class="control" id="save_button" value="Save" onclick="gap.serializeProfile(); return false;" style="background:none;">Save Button</a>'