// ==UserScript==
// @name           Grab.By sidebar remover
// @namespace      http://userscripts.org/users/193235
// @description    Removes annoying Sidebar on the grab.by website on free accounts
// @include        http://grab.by/*
// ==/UserScript==


var sidebar= document.getElementById('sidebar');
if(sidebar) {
	sidebar.parentNode.removeChild(sidebar); 
            }
	
