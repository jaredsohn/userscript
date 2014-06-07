// ==UserScript==
// @name           ASCIImation Downloader
// @namespace      http://userscripts.org/users/92331
// @description    Adds a button that allows you to download ASCIImations as .js files to your computer.
// @include        http://asciimator.darudar.org/asciimation/*
// @include        http://asciimator.net/asciimation/*
// ==/UserScript==

pathArray=window.location.pathname.split('/'); 
tag_value=pathArray[2]; 
jsdownloadlink="http://www.asciimator.net/ascii.files/"+tag_value+".js"; 
favs = document.getElementById('favs');
link = document.createElement('div');
link.innerHTML = '<a class="links_web system" href="'+jsdownloadlink+'">Download ASCIImation!</a>';

favs.parentNode.insertBefore(link, favs);