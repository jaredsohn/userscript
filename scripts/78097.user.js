// ==UserScript==
// @name           Mystery Seeker Auto Search
// @namespace      http://www.mysteryseeker.com/
// @include        http://www.mysteryseeker.com/
// @include        http://www.google.com/*
// ==/UserScript==


document.getElementById('SearchQuery').value = 'YOUR SEARCH HERE';
document.getElementById('SearchAddForm').submit();
function yourfunction() {
location.replace("http://www.mysteryseeker.com/");
}
window.setTimeout(yourfunction, 5);

