// ==UserScript==
// @name [HFR] Nombre de pages en retard
// @version 1.3
// @namespace http://forum.hardware.fr
// @description Affiche le nombre de pages en retard dans la liste des sujets
// @include http://forum.hardware.fr/forum1f.php*
// @include http://forum.hardware.fr/forum1.php*
// @include http://forum.hardware.fr/*liste_sujet*
// @require	http://code.jquery.com/jquery-1.8.2.min.js
// ==/UserScript==

/*
	Authors : Fred82 && cytrouille
	Creation date : 12/09/2010
*/

// 1.3 : Correction sur l'obtention des couleurs, pour que cela marche quel que soit le thème choisi par le forumeur.

/*
	Get an HTML element by his XPath notation (see google for documentation)
*/
var getElementByXpath = function(path, element) {
	var arr = Array(), xpr = document.evaluate(path, element, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
	for (; item = xpr.iterateNext(); ) arr.push(item);
	return arr;
}
 
// Number of maximal pages to display the end of the gradient
var getMaxPages = function() {
	return GM_getValue("hfr_pnl_pages", 10);
}
var setMaxPages = function() {
	var maxPages = prompt("Nombre de pages en retard pour atteindre la fin du dégradé", getMaxPages());
	if (isNaN(maxPages) || maxPages.length > 5) {
		alert("Valeur incorrecte, la valeur précédente est conservée" );
		maxPages = getMaxPages();
	}
	GM_setValue("hfr_pnl_pages", maxPages);
}
GM_registerMenuCommand("[HFR] Pages en retard -> Nombre de pages de retard pour atteindre la fin du dégradé", function() { setMaxPages() });
 
// Colors of the gradient : "#123456 > #123456" or "auto"
var getGradient = function() {
	return GM_getValue("hfr_pnl_gradient", "auto" );
}
var setGradient = function() {
	var gradient = prompt("Couleurs du dégradé : \"#ff0000 > #ff00ff\" ou \"auto\"", getGradient());
	var degradeRegexp = new RegExp("^#[\\da-fA-F]{6} > #[\\da-fA-F]{6}$" );
	if ((!gradient.match(degradeRegexp) && gradient != "auto" )) {
		alert("Valeur incorrecte, la valeur précédente est conservée" );
		gradient = getGradient();
	}
	GM_setValue("hfr_pnl_gradient", gradient);
}
GM_registerMenuCommand("[HFR] Pages en retard -> Dégradé de couleurs", function() { setGradient() });
 
/*
	Get URL parameter from query string
*/
function gup(query_string, name )
{
	name = name.replace(/[\[]/,"\\\[" ).replace(/[\]]/,"\\\]" );
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(query_string);
	if (results == null)
		return "";
	else
		return results[1];
}
 
// Get root
var root = document.getElementById("mesdiscussions" );
 
// Get list of topic rows
var res = getElementByXpath('//table[@class="main"]/tbody/tr', root);
 
 // Get user colors
var colors = $('link[href*="the_style1\\.php"]')[0].href.split(new RegExp("/" ));
 
// Compute colors
var startColors, endColors;
if (getGradient() == "auto" ) {
	startColors = colors[15];
	endColors = colors[8];
} else {
	startColors = getGradient().substring(1, 7);
	endColors = getGradient().substring(11, 17);
}
// Red
var startRed = parseInt(startColors.substring(0, 2), 16);
var endRed = parseInt(endColors.substring(0, 2), 16);
// Green
var startGreen = parseInt(startColors.substring(2, 4), 16);
var endGreen = parseInt(endColors.substring(2, 4), 16);
// Blue
var startBlue = parseInt(startColors.substring(4, 6), 16);
var endBlue = parseInt(endColors.substring(4, 6), 16);
// Gradients
var redGradient = Math.abs((endRed - startRed) / getMaxPages());
var greenGradient = Math.abs((endGreen - startGreen) / getMaxPages());
var blueGradient = Math.abs((endBlue - startBlue) / getMaxPages());
 
// For each row of topic
for each(var item in res) {
	// Get the last page data
	var last_page_container = getElementByXpath('td[@class="sujetCase4"]', item)[0];
 
	if (last_page_container != undefined) {
		var last_page_a = last_page_container.childNodes[0];
		var last_page = 0;
 
		if(last_page_a.nodeName != "A" ) {
			last_page = 1;
		} else {
			last_page = last_page_a.innerHTML;
		}
 
		// Get the current page data
		var current_page_container = last_page_container.nextSibling;
		var current_page_a = current_page_container.childNodes[0];
		if(current_page_a.nodeName != "A" ) {
			// No flag found
			continue;
		}
		var current_page = 0;
 
		// Extract the current page data
		if(current_page_a.href.indexOf(".htm" ) != -1) {
			// HFR textual notation for url
 
			var begin = current_page_a.href.lastIndexOf("_" );
			var end = current_page_a.href.indexOf(".htm" );
			current_page = current_page_a.href.substring(begin + 1, end);
		} else {
			// HFR parameters notation for url
			current_page = gup(current_page_a.href, 'page');
		}
 
		// Difference betwwen last page and current page
		var diff = last_page - current_page;
 
		// Background color of the cell
		var red, green, blue;
		if (diff < getMaxPages()) {
			red = Math.abs(Math.round(startRed - redGradient * diff));
			green = Math.abs(Math.round(startGreen - greenGradient * diff));
			blue = Math.abs(Math.round(startBlue - blueGradient * diff));
		} else {
			red = endRed;
			green = endGreen;
			blue = endBlue;
		}
		current_page_container.style.backgroundColor = "rgb(" + red + ", " + green + ", " + blue + " )";
 
		// Displays number of pages
		if (diff > 0) {
			var span = document.createElement("span" );
			span.style.fontSize = "xx-small";
			span.style.color = "#" + colors[14];
			span.innerHTML = "/" + diff;
			last_page_container.appendChild(span);
		}
	}
}

