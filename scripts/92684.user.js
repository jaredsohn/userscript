// ==UserScript==
// @name           WebAssign auto-login
// @namespace      http://freecog.net/2010/
// @description    Automatically log into WebAssign.net
// @include        http://webassign.net/
// @include        https://webassign.net/
// @include        http://www.webassign.net/
// @include        https://www.webassign.net/
// @include        http://webassign.net/login.html*
// @include        https://webassign.net/login.html*
// @include        http://www.webassign.net/login.html*
// @include        https://www.webassign.net/login.html*
// ==/UserScript==

if ((/login\.html/).test(document.location)) {
    if (document.body.innerHTML.match(/Invalid Login/)) {
        GM_setValue('lastLoginFailed', true);
    }
} else {
    var username = GM_getValue('username', '');
    var lastLoginFailed = GM_getValue('lastLoginFailed', false);
    GM_setValue('lastLoginFailed', false);

    var usernameField = document.getElementsByName('WebAssignUsername')[0];
    var institutionField = document.getElementsByName('WebAssignInstitution')[0];
    var passwordField = document.getElementsByName('WebAssignPassword')[0];
    var form = document.getElementsByName('loginForm')[0];

    // Wait for Firefox's autocomplete to fill in the password
    window.setTimeout(function() {
        if (!usernameField.value && username) {
            usernameField.value = username;
        }
        if (!lastLoginFailed && usernameField.value &&
                institutionField.value && passwordField.value) {
            form.submit();
        } else {
            form.addEventListener('submit', function() {
                GM_setValue('username', usernameField.value);
            }, false);
        }
    }, 300);
}
