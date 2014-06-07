// ==UserScript==
// @name           Thewest Raport Opener
// @description		The west raport opener by gondek222
// @namespace      raporty
// @include http://*.the-west.*
// @exclude http://forum.the-west.*
// ==/UserScript==
function aKeyIsPressed(e) 
{
	var key = e.keyCode;

	if (key == 13)	// Enter
	{

    var str = document.getElementById('textbox').value
    var str1 = str.substr(8,8);
    var str2 = str.substr(16,10);
    var wynik = "javascript:Reports.show("+str1 + ", '" + str2 + "');"
    document.location.href = wynik;
	}
}


var raporty = document.createElement("li");
raporty.innerHTML = '<nobr><input id="textbox" type="text" style="width: 120px; height: 19px; border:2px solid rgb(59, 36, 11); padding-left: 5px; " class="input_layout" value="Tutaj wklej raport" onclick="select();"/></nobr>';
raporty.addEventListener('keydown', aKeyIsPressed, true);


var menu_ranking = document.getElementById('menu_ranking');
menu_ranking.parentNode.insertBefore(raporty, menu_ranking.previousSibling);


var top =  document.getElementById('workbar_right').offsetTop + 27 + "px";
document.getElementById('workbar_right').style.top = top;
