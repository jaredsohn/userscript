// ==UserScript==
// @name           The-West Arama Çubuğu
// @description    Menü üzerine oyuncuları daha kolay bulabilmen için arama çubuğu ekler. 
// @namespace      http://www.the-west.org
// @include        http://*.the-west.*
// @exclude        http://forum.the-west.*
// @author         forestking
// @version        1.0
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
searchtext.innerHTML = '<nobr><img src="http://i649.photobucket.com/albums/uu217/JohnCooperED/searchicon.jpg"/><input id="textbox" type="text" style="width: 95px; height: 19px; border:2px solid rgb(59, 36, 11); padding-left: 5px; " class="input_layout" value="Oyuncu Adı" onclick="select();"/></nobr>';
searchtext.addEventListener('keydown', aKeyIsPressed, true);


var menu_ranking = document.getElementById('menu_ranking');
menu_ranking.parentNode.insertBefore(searchtext, menu_ranking.previousSibling);



var top =  document.getElementById('workbar_right').offsetTop + 27 + "px";
document.getElementById('workbar_right').style.top = top;