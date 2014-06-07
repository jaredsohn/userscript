// ==UserScript==
// @name           Functions_Libraries
// @namespace      *
// @include        *
// @run-at			document-end
// @grant			none
// @require			http://code.jquery.com/jquery-1.8.3.min.js
// @version			1
// ==/UserScript==

//Retourne un nombre entier entre min et max (inclus)
function Int_Random(val_min, val_max)
{
	return parseInt(val_min + (Math.random() * (val_max - val_min)));
	
}

//Retourne vrai si search_val est dans tab, faux sinon
function In_Array(search_val, tab)
{
	for (current_index_tab in tab)
		if (tab[current_index_tab] == search_val)
			return true;
	return false;
}

function Array_Keys(tab)
{
	var c_returns = [];
	for (current_index_tab in tab)
		c_returns[c_returns.length] = current_index_tab;
	return c_returns;
}

function First_Key(tab)
{
	for (current_index_tab in tab)
		return current_index_tab;
	return false;
}