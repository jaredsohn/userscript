/*
	Authored by John Tokash, Gordon McNaughton and Craig Olrich.
	
	On a google search page, hit ALT-MINUS to exclude the 
	currently selected text from future searches.  Hit ALT-PLUS 
	to add the selected text to future searches.

*/

// ==UserScript==
// @name		Google Search Refiner
// @namespace	http://blog.ronin64.com/
// @description	Add or Exclude selected text in future searches on a google search page using ALT-PLUS and ALT-MINUS.
// @include	http://*.google.*
// ==/UserScript==

(

function() {

	
	function trim(str){
		return str.replace(/^\s*|\s*$/g,"");
	}
	
	function addToSearchQuery(stringToInsert)
	{
		var chunks = location.href.split(/&/);
		var i;
		for(i=0;i<chunks.length;i++)
		{
			var otherchunks = chunks[i].split(/=/);
			if(otherchunks[0]== 'q')
			{
				chunks[i] += stringToInsert;
			}
		}
		var result = chunks.join("&");
		location.href=result;	
	}
	
	document.onkeydown = function(e)
	{
		var code;
		if (!e) e = window.event;
		if (e.keyCode) code = e.keyCode;
		else if (e.which) code = e.which;
		var character = String.fromCharCode(code);
		if ((e.modifiers && (e.modifiers & Event.ALT_MASK)) || e.altKey)
			
		{

			var stringToInsert;
			var selection = window.getSelection().toString();
			if(selection)
			{
				// TODO: For some reason character becomes 'm'.  Must be something wrong with fromCharCode.
				if(character == 'm' || character == '-' || character == '_')
				{
					addToSearchQuery("+-%22"+trim(selection)+"%22");
				}
				else if(character == '+' || character == '=')
				{
					addToSearchQuery("+%22"+trim(selection)+"%22");			
				}
			}
		}
	}
}
)();
