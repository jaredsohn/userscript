// ==UserScript==
// @name           ePost login
// @include        https://www.epost.ca/edms/en/sign_in.shtml*
// ==/UserScript==

unsafeWindow.escEncode = function escEncode(obj) {
    return escape(obj);
}