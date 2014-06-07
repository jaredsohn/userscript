// ==UserScript==
// @name           Megaupload Login
// @namespace      diamethuel
// @description    login filler
// @include        *.megaupload.*
// ==/UserScript==

function letsLogin() {
    document.getElementById("username").value = 'username';
    document.getElementById("password").value = 'password';
    
}

letsLogin();
