// ==UserScript==
// @name ahtung
// @description оповещает об атаке
// @author nnnm382
// @license MIT
// @version 1.0
// @include http://sp2.looki.*/index.php?*
// ==/UserScript==

var isAtak = false;

function CheckAtak()
{
	if(isAtak == true)
		return;
		
	var avatar = document.getElementById("gui_page_userinfo_avatar");
	avatar.click();
	
	var alertTags = document.getElementsByTagName("td");
	for (var i = 0, l = alertTags.length; i < l; i++)
	{
		if (alertTags[i].className == "akt_atk")//mazer faker. hardcod detected bla
		{
			window.open("http://spascors.h16.ru/atak.html",'');
			alert("Ataka!!!");
			isAtak = true;
			break;
		}
	}
}

//CheckAtak()
window.setInterval(CheckAtak, 120000);