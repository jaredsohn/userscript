// ==UserScript==
// @name        MirrorUpload link displayer
// @description Automatically displays the MirrorUpload links 
// @include     *mirrorupload.net/file/*
// @version     1.0
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