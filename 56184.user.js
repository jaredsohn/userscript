// ==UserScript==
// @name           Justin.TV Firefox 3 popout CSS fix
// @description    Added a CSS rule for popouts from Justin.TV. Fixes the scroll bars that appear when you mouseover the video player.
// @source         http://userscripts.org/scripts/show/56184
// @include        http://*.justin.tv/*/popout
// @namespace      http://userscripts.org/users/66815
// @copyright      2009+, Art Clark
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html 
// @browser        FF3
// @version        0.0.4
// @uso:script     56184
// ==/UserScript==

// addStyle() sourced from code written by Vaughan Chandler ( http://userscripts.org/people/14536 )
function addStyle(css) {
    if (typeof GM_addStyle !== 'undefined') {
        return GM_addStyle(css);
    } else if (heads = document.getElementsByTagName('head')) {
        var style = document.createElement('style');
        try {
            style.innerHTML = css;
        }
        catch(x) {
            style.innerText = css;
        }
        style.type = 'text/css';
        heads[0].appendChild(style);
    }
}
addStyle('#standard_holder { overflow: hidden }');