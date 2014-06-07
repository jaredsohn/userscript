// ==UserScript==
// @name           JvEasySearch
// @namespace       
// @description    Permet une double recherche sur Jv
// @include        http://www.jeuxvideo.com/forums/0-*
// ==/UserScript==

function main () {
	var obj = document.getElementById("recherche_forum");
	obj.innerHTML = obj.innerHTML.replace("<select name=\"type\">", "<select name=\"type\" id=\"mon_choix\">");
	obj.getElementsByTagName("select")[0].style.display = "none";
	var inputs = "<input type='text' id='search_sujet' value='Sujet' style='width: 120px;' onfocus='clearText(this)' onchange='document.getElementById(\"textfield_forum\").value = this.value; document.getElementById(\"mon_choix\").value = 2' onblur='initText(this)'>";
	inputs += "<input type='text' style='width: 3px; visibility: hidden;'>";
	inputs += "<input type='text' id='search_auteur' value='Auteur' style='width: 120px;' onfocus='clearText(this);' onchange='document.getElementById(\"textfield_forum\").value = this.value; document.getElementById(\"mon_choix\").value = 1' onblur='initText(this)'>";
	obj.getElementsByTagName("p")[0].innerHTML = inputs + obj.getElementsByTagName("p")[0].innerHTML;
	document.getElementById("textfield_forum").style.display = "none";
}

main();