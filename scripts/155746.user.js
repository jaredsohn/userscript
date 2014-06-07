/* 
 * Simplified version of script from Guile93 "Liens moteurs ng sur BinnewZ"
 * - Use only binsearch
 * - Remove image, use hyperlink instead
 * - Fix coding style
 */

// ==UserScript==
// @name BinHelper
// @namespace www.binnews.in
// @description Ajoute un lien vers binsearch sur le site BinnewZ.
// @include http://*binnews.in/_bin/liste.php*
// @include http://*binnews.in/_bin/lastrefs.php*
// @include http://*binnews.in/_bin/search.php*
// @include http://*binnews.in/_bin/search2.php*
// @include https://*binnews.in/_bin/liste.php*
// @include https://*binnews.in/_bin/lastrefs.php*
// @include https://*binnews.in/_bin/search.php*
// @include https://*binnews.in/_bin/search2.php*
// @author tramber30
// @version 0.03
// ==/UserScript==
function make_link(elem, target, title)
{
	var newLink = document.createElement("a");
	newLink.href = target;
	newLink.name = "title";
	newLink.target = "_blank";
	var text = document.createTextNode(title);
	newLink.appendChild(text);
	elem.appendChild(newLink);
}

function add_link()
{
	var search_array = document.getElementsByTagName("TD");
	for (var n = 0; n < search_array.length; ++n)
	{
		var Td = search_array[n];
		if (Td.innerHTML.match(/flag/))
		{
			var z = 1;
			do {
				++z;
			} while (search_array[n+z].innerHTML.match(/ng_id/));
			
			var newElem = search_array[n+z];
			var div = document.createElement("div");
			var cont = newElem.innerHTML;
			var req = cont.replace(/ /g,"+").split("*")
								.join(" ")
								.replace(/&lt;/,"<")
								.replace(/&gt;/,">")
								.replace(/#/,"%23")
								.replace(/&amp;/,"&");
			make_link(div, "http://www.binsearch.info/?max=250&adv_age=&server=1&q=" + req,
								"Binsearch");
			div.style.display = "none";
			newElem.addEventListener("mouseover",
								make_visible,
								false);
			newElem.appendChild(div);
		}
	}
}

function make_visible(e)
{
	var div = e.target.getElementsByTagName("div")[0];
	if (div)
	{
		if (oldDiv) 
		{
			oldDiv.style.display = "none";
		}
		oldDiv = div;
		div.style.display = "block";
	}
}
var page = window.location.href;
var oldDiv;
add_link();
