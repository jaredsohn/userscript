// ==UserScript==
// @name          YouTube - Disable Red Bar aka SPF
// @namespace     http://userscripts.org/users/23652
// @description   Disables the Red Bar feature on YouTube so some user-scripts work
// @include       http://*.youtube.com/*
// @include       https://*.youtube.com/*
// @include       http://youtube.com/*
// @include       https://youtube.com/*
// @copyright     JoeSimmons
// @version       1.0.0
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @downloadURL   http://userscripts.org/scripts/source/419926.user.js
// @updateURL     http://userscripts.org/scripts/source/419926.meta.js
// @grant         GM_addStyle
// ==/UserScript==

(function () {
    function disableRedBar() {
        var uw;

        // unwraps the element so we can use its methods freely
        function unwrap(elem) {
            if (elem) {
                if ( typeof XPCNativeWrapper === 'function' && typeof XPCNativeWrapper.unwrap === 'function' ) {
                    return XPCNativeWrapper.unwrap(elem);
                } else if (elem.wrappedJSObject) {
                    return elem.wrappedJSObject;
                }
            }

            return elem;
        }

        // get the raw window object of the YouTube page
        uw = typeof unsafeWindow !== 'undefined' ? unsafeWindow : unwrap(window);

        // disable Red Bar aka SPF
        if (uw._spf_state && uw._spf_state.config) {
            uw._spf_state.config['navigate-limit'] = 0;
            uw._spf_state.config['navigate-part-received-callback'] = function (targetUrl) {
                location.href = targetUrl;
            };
        }
    }

    // run it, then set it to run every second
    disableRedBar();
    window.setInterval(disableRedBar, 502);
}());