// ==UserScript==
// @name           Kill SL Wiki Sidebar
// @namespace      http://userscripts.org/users/36671
// @include        http://wiki.secondlife.com/*
// ==/UserScript==

(function() {
document.getElementById('column-one').style.display='none';  
document.getElementById('content').style.left='-150px'; 
document.getElementById('content').style.top='-25px';
})();