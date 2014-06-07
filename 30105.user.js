// ==UserScript==
// @name           Tourisme Montreal, disables flash background the blocks navigation on firefox
// @description    This simple script is used to remove a flash background that prevents correct navigation.
// @namespace      muanis.org/montrealtourism
// @include        http://www.tourisme-montreal.org/
// ==/UserScript==
//alert('aaaa');

var flashpanel = document.getElementById('panel_flash');
if (flashpanel) {
    flashpanel.parentNode.removeChild(flashpanel);
}
