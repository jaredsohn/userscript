// ==UserScript==
// @name          ReduceLnk Bypass Timer Only
// @namespace     erosman
// @description   Bypass ReduceLnk Timer Only
// @updateURL     https://userscripts.org/scripts/source/173253.meta.js
// @downloadURL   https://userscripts.org/scripts/source/173253.user.js
// @include       http://rdlnk.co/*
// @grant         none
// @author        erosman
// @version       1.0
// ==/UserScript==


/* --------- Note ---------
  Script made for ReduceLnk (rdlnk.co) per request


  --------- History ---------


  1.0 Initial release

*/


(function() { // anonymous function wrapper, used for error checking to end execution
'use strict';

if (window.self !== window.top) { return; } // end execution if in a frame

var div = document.getElementById('skipBtn');
div.style.display = 'none';

document.body.innerHTML = document.body.innerHTML.replace(
  /<!--(<div id="skipBtn">)-->[\s\S]+?(<a id='linkurl' href="http[\s\S]+?<\/a>)[\s\S]+?(<\/div>)-->/m,'$1$2$3');

})(); // end of anonymous function