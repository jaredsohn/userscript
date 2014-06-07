// ==UserScript==
// @name           Kings Age - Amélioration visuelle des citations
// @namespace       
// @include        http://s5.kingsage.fr/forum.php*
// ==/UserScript==


document.getElementsByTagName('head')[0].innerHTML += '<style type="text/css">' 														+ 
										' .quote { font-size:1.1em; margin-bottom:5px;} '									+
'.quote_text {display:block;background-color:transparent;font-style:italic;border:1px solid black;padding-bottom:10px;padding-left:10px;padding-top:10px;margin-top:5px;}'	+
									'</style>';