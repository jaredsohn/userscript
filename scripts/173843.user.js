// ==UserScript==
// @name         Automatically Bypass Steam Age Verification
// @description  Sets your birthday to 1950 and submits the form.
// @version      1.0.1
// @license      Public Domain
// @include      http://store.steampowered.com/agecheck/*
// @grant        none
// ==/UserScript==

(function(form) {
    form.ageYear.value = 1950;
    form.submit();
}(document.querySelector('#agegate_box form')));
