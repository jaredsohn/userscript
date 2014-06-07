// ==UserScript==
// @name           TheWest Keyboard shortcuts
// @namespace      Taubda
// @include http://*.the-west.*
// @include http://zz1w1.tw.innogames.net/* 
// @exclude http://*.the-west.de/forum*
// @exclude http://forum.the-west.*
// ==/UserScript==

var actual_world = window.location.host.substr(0,3);
var actual_region = window.location.host.substr(0,2);

var twhelp_link = document.createElement("li");
twhelp_link.id="twhelp_link";
switch(actual_region){
case "ru":
language="ru";
break;
case "en":
language="en";
break;
case "ru":
language="ru";
break;
default:
language="en";
break;
}

var weststats_link = document.createElement("li");
weststats_link.id="weststats_link";
if(actual_region=="en"){
weststats_link.innerHTML = '<a style="background:url(http://g.imagehost.org/0301/weststats.jpg) no-repeat" href="http://www.weststats.com/?change_world='+actual_world+'" target="_blank"></a>';
}
else
{
weststats_link.innerHTML = '<a style="background:url(http://g.imagehost.org/0301/weststats.jpg) no-repeat" href="http://'+actual_region+'.weststats.com/?change_world='+actual_world+'" target="_blank"></a>';
}






function aKeyIsPressed(e) 
{
	var key = e.keyCode;

	if (key == 77)
	{
		for (var i=0; i<document.getElementById('windows').childNodes.length; i++)
		{
			if (document.getElementById('windows').childNodes[i].style.display != "none") 
			{
				var str = document.getElementById('windows').childNodes[i].id;
				document.location.href = "javascript:AjaxWindow.toggleSize(\'" + str.substr(7) + "\', \'"+ str.substr(7)+ "\');"
			}
		}
	}
}	


document.addEventListener('keydown', aKeyIsPressed, true);