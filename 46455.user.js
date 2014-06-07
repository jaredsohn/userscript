// ==UserScript==
// @name        Auto-focus on first textbox
// @namespace   http://userscripts.org/users/23652
// @description Auto-focuses on the first/main textbox of a site
// @include     *
//@exclude     http://*.facebook.com/*
//@exclude     https://*.facebook.com/*
//@exclude     http://*.google.com/*
//@exclude     https://*.google.com/*
// @copyright   JoeSimmons
// @version     1.0.2
// @license     http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @require     https://raw.github.com/joesimmons/jsl/master/jsl.user.js
// @downloadURL http://userscripts.org/scripts/source/46455.user.js
// @updateURL   http://userscripts.org/scripts/source/46455.meta.js
// ==/UserScript==

+function () {

    // Make sure the page is not in a frame
    if (window.self !== window.top) { return; }

    JSL.runAt('interactive', function() {

        var domain = window.document.domain,
            regex = /([a-z0-9]+\.)?([a-z0-9-]+(\.[a-z0-9]+)+)$/,
            site = '',
            e = JSL('input[type="text"], input[type="search"], textarea'),
            elem, len;
        
        if ( regex.test(domain) ) {
            site = domain.match(regex)[2];
        }
        
        switch (site) {
            case 'youtube.com': {
                e = JSL('#masthead-search-term');
                break;
            }
            case 'userscripts.org': case 'google.com': {
                e = JSL('input[name="q"]');
                break;
            }
            case 'facebook.com': {
                e = JSL('textarea[name="xhpc_message_text"], textarea[name="xhpc_message"]');
                break;
            }
        }

        if ( e.exists /*&& e.visible*/ ) {
            elem = e[0];
            len = elem.value.length;

            if (typeof elem.focus === 'function') {
                elem.focus();
            }

            if (len > 0 && typeof elem.setSelectionRange === 'function') {
                elem.setSelectionRange(0, len);
            }
        }

    });

}();