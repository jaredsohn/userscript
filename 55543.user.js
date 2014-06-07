// ==UserScript==
// @name           Google Login
// @namespace      diamethuel
// @description    Auto filler
// @include        https://www.google.com/accounts/ServiceLogin*
// @include        https://www.google.com/accounts/Login*
// @include        https://www.google.com/groups/signin*
// ==/UserScript==

function letsLogin() {
    document.getElementById("Email").value = 'constipatedcow';
    document.getElementById("Passwd").value = 'password';
    document.getElementById("Email").form.submit();
}

letsLogin();
