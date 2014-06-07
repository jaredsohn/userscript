// ==UserScript==
// @name           AppBlade Recent Feedback
// @namespace      http://userscripts.org/users/192956
// @description    Hides feedback from more than 5 days ago
// @include        https://appblade.com/projects/*/feedbacks
// ==/UserScript==

var turnOff = function(e)
{
	var rows = document.getElementsByTagName('tr');
	var i = 0;
	for(; i < rows.length; i++)
	{
    	var cols = rows[i].getElementsByTagName('td');
    	when = cols[6];
    	if(when && parseInt(when.innerHTML) > 5)
    	{
        	break;
    	}
	}
	for(; i < rows.length; i++)
	{
    	rows[i].style.display = "none";
	}
	e.innerHTML = "Show All";
	e..setAttribute("onclick", "turnOn(this)");
}
var turnOn = function(e)
{
	var rows = document.getElementsByTagName('tr');
    for(var i = 0; i < rows.length; i++)
    {
        rows[i].style.display = "";
    }
    e.innerHTML = "Hide Older";
    e.setAttribute("onclick", "turnOff(this)");
}
var createButton = function
{
	var button = document.createElement('div');
	button.style.borderRadius = "10px";
	button.style.width = "100px";
	button.style.height = "50px";
	button.style.lineHeight = "50px";
	button.style.textAlign = "center";
	button.style.background = "#589442";
	var table = document.getElementsByTagName('table')[1];
	table.parentNode.insertBefore(button, table);
	return button;
}
turnOff(createButton());