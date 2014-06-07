// ==UserScript==
// @name           Botw Agree
// @version        0.1
// @namespace      http://denbuzze.com/
// @description    Automatically agree on the terms of Brands of the World and download the file (without having to click it)
// @match          http://*.brandsoftheworld.com/logo/*
// @include        http://*brandsoftheworld.com/logo/*
// ==/UserScript==

(function(){

    // Select the agree checkbox
    var agree_checkbox = document.getElementById('edit-agree');
    var download_button = document.getElementById('edit-download');

    // Check if the box was selected (will not be the case if you're not logged in)
    if(agree_checkbox) {
        // Check the box
        agree_checkbox.checked = true;
        
        // Trigger a click so the download starts automatically
        download_button.click();
    }

})();