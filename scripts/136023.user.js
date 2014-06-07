// ==UserScript==
// @name MsgBox Fix
// @description Message Box position fixed
// @version 1.000
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @author      Glibnes <glibnes@gmail.com>
// @include     http://*ogame.*
// @exclude     http://board.ogame.*

// ==/UserScript==

$(document).ready(function()
{
	var ThisScreen = $(document);
	
	setInterval(function(){
		var ThisElement = $('#TB_window');
		if(ThisElement.is(':visible'))
		{
			ThisElement.css('margin-top', '20px').css('top', ThisScreen.scrollTop());
		}
	}, 250);
});
