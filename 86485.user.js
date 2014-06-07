// ==UserScript==
// @name            BalLeT_PantipSweetener
// @namespace       http://userscripts.org/users/223152
// @description     Taking care of your eyes and your boss by changing theme of Pantip.com forum to Sweet Theme.
// @author          BalLeT
// @include         http://www.pantip.com/cafe/*/topic/*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @run-at          document-end
// @version         2.1
// ==/UserScript==

$(document).ready(BalLeTPantipSweetner());

function BalLeTPantipSweetner()
{	
alert("BalLeTPantipSweetner");
	var fromColors = ["ffffff", "403e68", "000000", "204080", "222244", "224422", "224444", "442244", "444422", "c0c080", "c0d3f3", "E0E0E0", "f0f000"];
	var toColors = ["5e5e5e", "ffffff", "eeeeee", "d9d9d9", "EBD0E8", "c2d6fd", "EEC399", "EDE9A5", "ACD38A", "AF4600", "054A00", "0e0e0e", "cc0000"];
	allColors = fromColors.length;
	for(var i=0; i<allColors; i++)
	{
		var from = fromColors[i];
		var to = toColors[i];
		jQuery('*[bgcolor='+from+']').attr('bgcolor','#'+to);
		jQuery('*[bgcolor=#'+from+']').attr('bgcolor','#'+to);
		jQuery('*[bgcolor=##'+from+']').attr('bgcolor','#'+to);
		jQuery('*[color=#'+from+']').css('color','#'+to);
	}
	
	var bgcolor = jQuery('body').attr('bgcolor');
        jQuery('body').attr('bgcolor','#fff');
        jQuery('td[bgcolor='+bgcolor+']').attr('bgcolor','#ffffff');
	jQuery('td[width=15]').attr('bgcolor','#ffffff');
}