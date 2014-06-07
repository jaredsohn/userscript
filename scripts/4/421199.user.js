// ==UserScript==
// @name          Scnlog.eu - Disable Popups
// @namespace     http://userscripts.org/users/23652
// @description   Disables popups on Scnlog.eu
// @include       http://scnlog.eu/*
// @include       https://scnlog.eu/*
// @copyright     JoeSimmons
// @version       1.0.0
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @grant         GM_addStyle
// ==/UserScript==

(function () {
    var script = '_gunggo.pop.open = _gunggo.pop.clkPop = function () {};',
        uw, intv;

    // unwraps the element so we can use its methods freely
    function unwrap(elem) {
        if (elem) {
            if ( typeof XPCNativeWrapper === 'function' && typeof XPCNativeWrapper.unwrap === 'function' && elem === XPCNativeWrapper(elem) ) {
                return XPCNativeWrapper.unwrap(elem);
            } else if (elem.wrappedJSObject) {
                return elem.wrappedJSObject;
            }
        }

        return elem;
    }

    // run by JoeSimmons
    function run(t) {
        var s = document.createElement('script'),
            body = document.body;

        s.type = 'text/javascript';
        s.innerHTML = t;

        body.appendChild(s);
        body.removeChild(s);
    }

    // get the raw window object of the page
    uw = typeof unsafeWindow !== 'undefined' ? unsafeWindow : unwrap(window);

    intv = window.setInterval(function () {
        if (uw._gunggo) {
            run(script);
        }
    }, 250);
}());