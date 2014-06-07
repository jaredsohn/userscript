// ==UserScript==
// @name           ASCIImation Downloader
// @description    Adds a button that allows you to download ASCIImations as .js files to your computer.
// @include        http://asciimator.darudar.org/asciimation/*
// @include        http://asciimator.darudar.org/*
// @include        http://asciimator.net/asciimation/*
// @include        http://asciimator.net/*
// ==/UserScript==

tag_value=String(document.getElementById('clip_id').value);
jsdownloadlink="http://www.asciimator.net/ascii.files/"+String(tag_value)+".js"; 
favs = document.getElementById('favs');
link = document.createElement('div');
link.innerHTML = '<a class="links_web system" href="'+jsdownloadlink+'">[V] Download ASCIImation</a>';

favs.parentNode.insertBefore(link, favs);