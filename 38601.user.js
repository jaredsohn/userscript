// ==UserScript==
// @name          quiestlemoinscher.com - tri des prix relevés
// @description   Permet de trier le tableau des prix relevés pour un produit (par exemple http://www.quiestlemoinscher.com/Epicerie+sucrée~Petit+déjeuner~Nutella+-+Pâte+à+tartiner+chocolat+noisette%2C++220g) ; du magasin le moins au plus cher, etc.
// @description   Se base sur tablesorter.com
// @author        http://userscripts.org/users/73911
// @version       1.0
// @include       http://*quiestlemoinscher.com*
// @require	  http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js
// @require       http://autobahn.tablesorter.com/jquery.tablesorter.min.js
// ==/UserScript==

$(document).ready(function() {
	if($('#tableReleve') != null) $('#tableReleve').tablesorter();
    } 
    );