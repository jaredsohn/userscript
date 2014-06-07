// ==UserScript==
// @name           Google Auto Login
// @namespace      cavingdeep
// @description    Automatically fills the login form and submit.
// @include        https://www.google.com/accounts/ServiceLogin*
// @include        https://www.google.com/accounts/Login*
// @include        https://www.google.com/groups/signin*
// ==/UserScript==

function letsLogin() {
    document.getElementById("Email").value = 'YOUR_ACCOUNT_NAME';
    document.getElementById("Passwd").value = 'YOUR_PASSWORD';
    document.getElementById("Email").form.submit();
}

letsLogin();
