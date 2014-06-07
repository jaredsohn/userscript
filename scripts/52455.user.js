// ==UserScript==
// @name           Kings Age - Réduire la taille des coordonnées des villages
// @namespace       
// @include        http://s5.kingsage.fr/*
// ==/UserScript==


document.getElementsByTagName('head')[0].innerHTML += '<style type="text/css">' 														+ 
										' .ressilist tr td b {font-size:10px} ' 											+
										' .ressilist tr td a{font-size:12px} ' 											+
									'</style>';