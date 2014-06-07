// ==UserScript==
// @name           Metroplexity Menu Additions
// @namespace      http://userscripts.org/users/32630
// @include        http://*metroplexity.com/header.php
// @description    Version 1
// ==/UserScript==

	var elmNewMetroMenu = document.createElement('div');
    elmNewMetroMenu.innerHTML = '<div style="text-align:center;"><a href="/inventory.php?switch=equipment" target="main">Equipment</a> - <a href="/inventory.php?switch=data" target="main">Data</a> - <a href="/inventory.php?switch=usable" target="main">Usable</a> - <a href="/inventory.php?switch=other items" target="main">Other</a> - <a href="/inventory.php?switch=salvage" target="main">Salvage</a> - <a href="/inventory.php?switch=gangstash" target="main">Gang Stash</a> &nbsp&nbsp&nbsp * &nbsp&nbsp&nbsp <a href="/crafting.php?craft=armory" target="main">Armory</a> - <a href="/crafting.php?craft=chemistry" target="main">Chemistry</a> - <a href="/crafting.php?craft=coding" target="main">Coding</a> - <a href="/crafting.php?craft=electronics" target="main">Electronics</a> - <a href="/crafting.php?craft=sushi" target="main">Sushi</a> </div>';
	document.body.appendChild(elmNewMetroMenu)