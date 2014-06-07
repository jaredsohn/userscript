// ==UserScript==
// @name 		SalsaFrance Forum : remplacer le titre
// @namespace	http://xandrex.free.fr/salsa/
// @description	Le titre de chaque page devient "SSF"
// @include		http://www.forumsalsa.net/yabbse2/*
// ==/UserScript==

document.getElementsByTagName('title').item(0).text = 'SSF';
