// ==UserScript==
// @name        FredMiranda Search Box Usability Fix
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @namespace   http://www.toddmoon.com
// @include     http://www.fredmiranda.com/*
// @version     1
// @grant       none
// ==/UserScript==

(function()
{	
	var textBoxes = $("input[type=text]");	

	for (var i = 0; i < textBoxes.length; i++)
	{
		var textBox = textBoxes[i];
		
		if ( typeof( textBox.onfocus ) == "function" )	
		{
			textBox.onfocus = function(){
				if( this.value === "Enter camera gear" || this.value === "Enter keyword" )
				{
					this.value = "";
				}
			};	
		}
	}
})();