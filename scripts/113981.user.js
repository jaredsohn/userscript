// ==UserScript==
// @name            The West - SearchBar
// @namespace       http://userscripts.org/scripts/show/113981
// @description	    Includes a searchbar for finding players on the main TW window
// @icon            http://img854.imageshack.us/img854/4797/iconcwalter.jpg
// @license         GNU Lesser General Public License (LGPL)
// @copyright       2011, Claudiney Walter (The-West BR8,BR10)
// @author          [forestking]
// @release         CWalter
// @include         http://*.the-west.*
// @exclude         http://forum.the-west.*
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
searchtext.innerHTML = '<nobr><img src="data:image/png;base64,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"/><input id="textbox" type="text" style="width: 95px; height: 19px; border:2px solid rgb(59, 36, 11); padding-left: 5px; " class="input_layout" value="Player Name" onclick="select();"/></nobr>';
searchtext.addEventListener('keydown', aKeyIsPressed, true);


var menu_ranking = document.getElementById('menu_ranking');
menu_ranking.parentNode.insertBefore(searchtext, menu_ranking.previousSibling);



var top =  document.getElementById('workbar_right').offsetTop + 27 + "px";
document.getElementById('workbar_right').style.top = top;