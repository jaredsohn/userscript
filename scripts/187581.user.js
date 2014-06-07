// ==UserScript==
// @name        Nikwax AutoQuiz
// @namespace   StScripts
// @include     http://www.nikwax.com/en-gb/webquiz/quiz/questions.php
// @version     1
// ==/UserScript==

var a = document.createElement("a");
a.setAttribute("style", "margin-bottom: 7px; display: block;  background: orange; height: 20px; padding-top: 4px; text-align: center; color: blue; cursor: pointer");a.textContent = "AutoQuiz - answer the quiz";
var table = document.getElementsByClassName("bgd_light_grey")[0];
table.rows[table.rows.length - 1].cells[1].appendChild(a);

a.onclick = function()
{
	var boxes = document.getElementsByClassName("bgd_white")
	for(var i = 0; i < boxes.length; i++)
	{
		var tables = boxes[i].getElementsByTagName("table");
		if(tables.length == 2)
		{
			var table = tables[1];
			var inputs = table.getElementsByTagName("input");
			var ca=(caa[i]/(i+1))-1;
			inputs[ca].checked = true;
		}
	}
}