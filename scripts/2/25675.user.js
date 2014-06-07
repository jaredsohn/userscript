// ==UserScript==
// @name           Wowhead Wide
// @namespace      wowhead
// @include        http://www.wowhead.com/?*
// ==/UserScript==

var layout = document.getElementById('layout');

layout.style.maxWidth='20000px';

var wrapper = document.getElementById('wrapper');

wrapper.style.margin='0px';

var sidebar = document.getElementById('sidebar');

sidebar.style.visibility='hidden';