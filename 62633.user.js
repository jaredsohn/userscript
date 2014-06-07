// ==UserScript==
// @name           Geocaching non-US search
// @namespace      maeki.org
// @description    Hide search field that are useless to geocachers outside of the US
// @include        http://www.geocaching.com/seek/
// @include        http://www.geocaching.com/seek/default.aspx
// ==/UserScript==

var zipsearch = document.getElementById('zip');
zipsearch.parentNode.parentNode.style.display='none';
var statesearch = document.getElementById('form2');
console.log(statesearch);
statesearch.parentNode.style.display='none';
statesearch.parentNode.previousElementSibling.style.display='none';
var localsearch = document.getElementById('form5');
localsearch.parentNode.style.display='none';
localsearch.parentNode.previousElementSibling.style.display='none';
var acsearch = document.getElementById('Form9');
acsearch.parentNode.style.display='none';
acsearch.parentNode.previousElementSibling.style.display='none';