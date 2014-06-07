// ==UserScript==
// @name MyEpisodes Custom View
// @description MyEpisodes Custom View
// @namespace
// @include http://*.myepisodes.com/*
// @author WankaUSR
// @version 1.1
// @date 2012-12-14
// ==/UserScript==

(function () {


var wnk_cal_bg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAjCAIAAABgsH+DAAAACXBIWXMAAAsSAAALEgHS3X78AAAANElEQVR42u3OQQ0AAAgEIPPYP4p9NMb5YCMAtdNxFR9ISEhISEhISEhISEhISEhIpAdfEgcbP/aavyh2zwAAAABJRU5ErkJggg==';
small_header();
change_calendar_bg('cal_today', wnk_cal_bg)

})();


function small_header()
{
	var poze = document.getElementsByTagName("img");
	for (var i=0;i<poze.length;i++)
		{
			if( poze.item(i).src == "http://www.myepisodes.com/img/myepisodes_logo.jpg" && poze.item(i).parentNode.nodeName =="A")
				{
					poze.item(i).setAttribute("style", "width:120px; height:64px");
				}
		}		
}

function change_calendar_bg(today_class,value) {

var tds = document.getElementsByTagName("td");

	for (var i = 0; i < tds.length; i++) {
		if (tds.item(i).className == today_class) {
			tds.item(i).setAttribute("id", "cal_today_moded");
			document.getElementById("cal_today_moded").setAttribute("class", "Cocolino");
			document.getElementById("cal_today_moded").setAttribute("background",value);			
			}
	}
}