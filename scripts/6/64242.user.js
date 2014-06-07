// ==UserScript==
// @name           TheWest Searchbar
// @description	   Includes a searchbar for finding a player on the main TW window
// @namespace      forestking
// @include http://*.the-west.*
// @exclude http://forum.the-west.*
// ==/UserScript==


function search()
{
	if(document.getElementById('player') != null)
	{
		var text = document.getElementById('textbox').value;
		document.getElementById('player').value = text;
		document.location.href = "javascript:Ranking.rank_choose();";		
	}
}

function aKeyIsPressed(e) 
{
	var key = e.keyCode;

	if (key == 13)	// Enter
	{

		if (document.getElementById('window_ranking') == null)
		{
			document.location.href = "javascript:AjaxWindow.show(\'ranking\');";			
		}
		setTimeout(search, 1000);

	}
}


var searchtext = document.createElement("li");
searchtext.innerHTML = '<nobr><img src="http://i513.photobucket.com/albums/t333/tyrazz/pllayername3.jpg"/><input id="textbox" type="text" style="width: 95px; height: 19px; border:2px solid rgb(59, 36, 11); padding-left: 5px; " class="input_layout" value="Zoek speler" onclick="select();"/></nobr>';
searchtext.addEventListener('keydown', aKeyIsPressed, true);


var menu_ranking = document.getElementById('menu_ranking');
menu_ranking.parentNode.insertBefore(searchtext, menu_ranking.previousSibling);


document.getElementById('abdorment_right').style.zIndex = 5;
document.getElementById('abdorment_right').style.top = "250px";