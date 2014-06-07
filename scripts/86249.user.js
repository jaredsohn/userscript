// ==UserScript==
// @name           ICD.nuff
// @namespace      http://icd.internetmedicin.se/
// @description    Removes commercials from icd.nu
// @include        http://icd.internetmedicin.se/
// ==/UserScript==

var adSidebar = document.getElementById('tdS3');
if (adSidebar) {
    adSidebar.parentNode.removeChild(adSidebar);
}