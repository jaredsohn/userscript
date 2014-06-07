// ==UserScript==
// @name           TheWest Searchbar
// @description		Includes a searchbar for finding players on the main TW window
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
searchtext.innerHTML = '<nobr><img src="http://img5.imagebanana.com/img/xndtlqef/suchleiste_2spieler.jpg"/><input id="textbox" type="text" style="width: 95px; height: 19px; border:2px solid rgb(59, 36, 11); padding-left: 5px; " class="input_layout" value="Spielername" onclick="select();"/></nobr>';
searchtext.addEventListener('keydown', aKeyIsPressed, true);


var menu_ranking = document.getElementById('menu_ranking');
menu_ranking.parentNode.insertBefore(searchtext, menu_ranking.previousSibling);



var top =  document.getElementById('workbar_right').offsetTop + 27 + "px";
document.getElementById('workbar_right').style.top = top;