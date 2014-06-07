// ==UserScript==
// @name           Grooveshark Ad Remover
// @version        1.0
// @include        http://listen.grooveshark.com/
// ==/UserScript==

var sidebar = document.getElementById('sidebar');
sidebar.style.display = 'none';

var mainContentWrapper = document.getElementById('mainContentWrapper');
mainContentWrapper.style.margin-right = "0px";