// ==UserScript==
// @name           Right Click Foot Massage
// @namespace      http://userscripts.org/users/66698
// @description    Adds the option to give a player a flavored foot massage in the right click menu
// @include        *kingdomofloathing.com*
// ==/UserScript==

var contextmenu = document.getElementById("menu");

var elem = document;
document.addEventListener("contextmenu",massage,false);

function massage() { 
	var menuHTML = contextmenu.innerHTML;
	if (menuHTML.indexOf("<!-- massage -->") != -1)
		menuHTML = menuHTML.substring(0,menuHTML.indexOf("<!-- massage -->"));

	if (menuHTML.indexOf("launch(") != -1) {
		var position = menuHTML.indexOf("launch(");
		menuHTML = menuHTML.substring(position+7);
		position = menuHTML.indexOf(");");
		menuHTML = menuHTML.substring(0,position);      
		
		var aryMenu = menuHTML.split(",");      
		var player_id = aryMenu[1].substring(2,aryMenu[1].length-1);
		var player_name = aryMenu[2].substring(2,aryMenu[2].length-1);
	} else if (menuHTML.indexOf("ascensionhistory.php?back=other&amp;who=") != -1) {
		var position = menuHTML.indexOf("ascensionhistory.php?back=other&amp;who=") + 40;
		menuHTML = menuHTML.substring(position);		
		position = menuHTML.indexOf(");") - 1;
		menuHTML = menuHTML.substring(0,position);      
		
		var player_id = menuHTML;
	}
	
	contextmenu.innerHTML += "<!-- massage --><form method=post name=massage action=curse.php target=mainpane style=\"margin: 0px;\"><input type=hidden name=action value=\"use\"><input type=hidden name=whichitem value=3274><input type=hidden name=targetplayer value="+player_id+"></form><p class=\"rcm\" onclick=\"document.forms.massage.submit();\">Give Foot Massage</p>";
}