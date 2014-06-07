// ==UserScript==
// @name            MirrorUpload link displayer FoxySpeed
// @description     Automatically displays the MirrorUpload links 
// @version        1.0
// updateURL       http://userscripts.org/scripts/source/399655.meta.js
// @updateURL      http://userscripts.org/scripts/source/399655.meta.js
// @downloadURL    http://userscripts.org/scripts/source/399655.user.js
// @author         Ismail Iddakuo
// @Original-s-    1.0 http://userscripts.org/scripts/show/170544
// @include     *mirrorupload.net/file/*
// @grant none
// ==/UserScript==

accessForm = document.getElementsByName('form_upload')[0]; // Find the access links form
if (accessForm != null) {
    input = document.createElement('input'); // Server doesn't accept if there is no the access field
    input.type = 'hidden';
    input.name = 'access';
    input.value = Math.random(); // All numbers or strings work
    accessForm.appendChild(input);

    accessForm.submit(); // Go to links page
} else { // No need to check if it's a download page because getElementById("table-page-download") will cause an error and stop the script if it's not
    fileName = '<h1>' + document.getElementsByTagName('h1')[0].innerHTML + '</h1>'; // Get the title of the download
    document.body.innerHTML = fileName + document.getElementById("table-page-download").innerHTML; // Change the page to the title + links
}

