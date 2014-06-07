// ==UserScript==
// @name          One.lv | Remove picture gifts
// @namespace     http://www.one.lv
// @description	  Disables inline gifts pictures from one.lv popup photo window.
// @version 8.0
// @include       http://*one.lv*
// ==/UserScript==

var adSidebar = document.getElementById('middle_present_category1');
if (adSidebar) {
    adSidebar.parentNode.removeChild(adSidebar);
}
var adSidebar = document.getElementById('middle_present_category2');
if (adSidebar) {
    adSidebar.parentNode.removeChild(adSidebar);
}
var adSidebar = document.getElementById('middle_present_category3');
if (adSidebar) {
    adSidebar.parentNode.removeChild(adSidebar);
}
var adSidebar = document.getElementById('middle_present_category4');
if (adSidebar) {
    adSidebar.parentNode.removeChild(adSidebar);
}
var adSidebar = document.getElementById('middle_present_category5');
if (adSidebar) {
    adSidebar.parentNode.removeChild(adSidebar);
}
var adSidebar = document.getElementById('middle_present_category6');
if (adSidebar) {
    adSidebar.parentNode.removeChild(adSidebar);
}