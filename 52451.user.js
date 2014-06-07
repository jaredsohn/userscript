// ==UserScript==
// @name           King Age - Centrage du texte dans la caserne
// @namespace       
// @include        http://s5.kingsage.fr/game.php?village=32054&s=build_barracks
// ==/UserScript==

document.getElementsByTagName('head')[0].innerHTML += '<style type="text/css">' + 
										' .borderlist tr td, .borderlist tr th {text-align:center}'	+
									'</style>';