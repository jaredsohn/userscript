// ==UserScript==
// @name       Resize Google Drive fonts.
// @namespace  http://profiles.google.com/mmmattos
// @version    0.1
// @description  To improve browsing readability of google drive  
// @match      https://drive.google.com/*
// @require   https://gist.github.com/mmmattos/6264214/raw/755d33de2038afe4d82fef4bf41b3824ee25effa/jsLib.js
// @copyright  2013, Miguel Mattos
// ==/UserScript==

addCustomStyle('.doclist-name-wrapper { font-weight: bold;font-size: 10px ! important; }');
addCustomStyle('.treedoclistview-node-name { font-weight: bold;font-size: 11px ! important; }');