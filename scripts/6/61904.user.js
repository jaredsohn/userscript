// ==UserScript==
// @name           [PG]InputTextFieldMaximizer hamburg berlin 
// @namespace      enter
// @include        http://*pennergame.de/gang/admin/
// @include        http://*pennergame.de/settings/*
// ==/UserScript==


if(((self.location.toString()).indexOf("pennergame.de/gang/admin/",1)) > 1)
{
	var f_modt = document.getElementById("f_motd");
	f_modt.setAttribute('cols', '92');
	f_modt.setAttribute('rows', '30');

	var f_desc = document.getElementById("f_desc");
	f_desc.setAttribute('cols', '92');
	f_desc.setAttribute('rows', '30');
}

if(((self.location.toString()).indexOf("pennergame.de/settings/",1)) > 1)
{
	document.getElementsByName("homepage")[0].setAttribute("size", 100);
	document.getElementsByName("fav_drink")[0].setAttribute("size", 100);
	document.getElementsByName("play")[0].setAttribute("size", 100);
	
	
	var _description = document.getElementsByName("description")[0];
	_description.setAttribute('cols', '95');
	_description.setAttribute('rows', '30');

}