// ==UserScript==
// @name          Google - Change "Videos" tab to "YouTube"
// @namespace     http://userscripts.org/users/23652
// @description   Replaces the "Videos" navigation tab with "YouTube" so you can easily go to YouTube with your Google search query
// @include       http://www.google.com/search?*q=*
// @include       https://www.google.com/search?*q=*
// @copyright     JoeSimmons
// @version       1.0.0
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @downloadURL   http://userscripts.org/scripts/source/486950.user.js
// @updateURL     http://userscripts.org/scripts/source/486950.meta.js
// @grant         GM_addStyle
// ==/UserScript==

+function () {
    var videosLink = document.querySelector('#hdtb_msb .hdtb_mitem a[href*="&tbm=vid"]');

    // make sure the page is not in a frame
    // and if there is a "Videos" link
    if (window.frameElement || window !== window.top || !videosLink) { return; }

    // change the link's text
    videosLink.firstChild.data = 'YouTube';

    // change the link's url
    videosLink.href = 'https://www.youtube.com/results?search_query=' + location.href.match(/[?&]?q=([^&]*)/)[1];
}();