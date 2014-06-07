// ==UserScript==
// @name		BvS Zombja Quickmove
// @namespace		Authority2
// @description		Quickmove hotkeys for BvS Zombjas
// @history		1.0 Initial version
// @include		http://*animecubed.com/billy/bvs/zombjas.html
// ==/UserScript==

window.addEventListener("keydown", key_press, false);				//When a key is released, run function key_press and provide it with keyID.

function key_press(event)
{
    if (document.forms.namedItem("theworldends"))	//Player Pin
	{
	   	window.removeEventListener("keydown", key_press, false);	//Remove keypress listener
	   	location.assign('javascript:theworldends.submit()');		//Move
	}
    if (event.keyCode==82||event.keyCode==84||event.keyCode==89||event.keyCode==70||event.keyCode==71||event.keyCode==72||event.keyCode==86||event.keyCode==66||event.keyCode==78){
        if (event.keyCode==82 && document.forms.namedItem("moveul"))	//keypress R, upleft. Check if there is an upleft button
	   {
	   		window.removeEventListener("keydown", key_press, false);	//Remove keypress listener
	   		location.assign('javascript:moveul.submit()');		//Move
	   } else if (event.keyCode==84 && document.forms.namedItem("moveu"))	//keypress T, up. Check if there is an up button
	   {
			window.removeEventListener("keydown", key_press, false);	//Remove keypress listener
			location.assign('javascript:moveu.submit()');		//Move
	   } else if (event.keyCode==89 && document.forms.namedItem("moveur"))	//keypress Y, upright. Check if there is an upright button
	   {
			window.removeEventListener("keydown", key_press, false);	//Remove keypress listener
			location.assign('javascript:moveur.submit()');		//Move
	   } else if (event.keyCode==70 && document.forms.namedItem("movel"))	//keypress F, left. Check if there is an left button
	   {
			window.removeEventListener("keydown", key_press, false);	//Remove keypress listener
	   		location.assign('javascript:movel.submit()');		//Move
	   } else if (event.keyCode==72 && document.forms.namedItem("mover"))	//keypress H, right. Check if there is an right button
	   {
			window.removeEventListener("keydown", key_press, false);	//Remove keypress listener
			location.assign('javascript:mover.submit()');		//Move
	   } else if (event.keyCode==86 && document.forms.namedItem("movedl"))	//keypress V, downleft. Check if there is an downleft button
	   {
			window.removeEventListener("keydown", key_press, false);	//Remove keypress listener
			location.assign('javascript:movedl.submit()');		//Move
	   } else if (event.keyCode==66 && document.forms.namedItem("moved"))	//keypress B, down. Check if there is an down button
	   {
			window.removeEventListener("keydown", key_press, false);	//Remove keypress listener
			location.assign('javascript:moved.submit()');		//Move
	   } else if (event.keyCode==78 && document.forms.namedItem("movedr"))	//keypress N, downright. Check if there is an downright button
	   {
			window.removeEventListener("keydown", key_press, false);	//Remove keypress listener
			location.assign('javascript:movedr.submit()');		//Move
	   } else if (document.forms.namedItem("thrillers"))	//Thriller. Check if there is an fight thrillers button
	   {
			window.removeEventListener("keydown", key_press, false);	//Remove keypress listener
			location.assign('javascript:thrillers.submit()');		//Fight
	   } else if (document.forms.namedItem("barglers"))	//Bargler. Check if there is an fight barglers button
	   {
			window.removeEventListener("keydown", key_press, false);	//Remove keypress listener
			location.assign('javascript:barglers.submit()');		//Fight
	   } else if (document.forms.namedItem("thumpers"))	//Thumper. Check if there is an fight thumpers button
	   {
			window.removeEventListener("keydown", key_press, false);	//Remove keypress listener
			location.assign('javascript:thumpers.submit()');		//Fight
	   } else if (document.forms.namedItem("zfight"))	//Zombja. Check if there is an fight zombjas button
	   {
			window.removeEventListener("keydown", key_press, false);	//Remove keypress listener
			location.assign('javascript:zfight.submit()');		//Fight
	   } else if (document.forms.namedItem("noms"))	//Nom. Check if there is an fight noms button
	   {
			window.removeEventListener("keydown", key_press, false);	//Remove keypress listener
			location.assign('javascript:noms.submit()');		//Fight
	   }
	}
}
	var div=document.createElement("div");
	div.innerHTML="<font color=#FFFFFF face=Verdana><b>Zombjas Hotkeys</b> <br/> RTY FH VBN to move <br/> Attacks zombjas in your way automatically, in the order Thriller>Bargler>Thumper>Z>Nom</font>";
	document.evaluate("//table[@width=910]/tbody/tr/td/table/tbody/tr/td",
			document, null, XPathResult.ANY_TYPE, null ).iterateNext().appendChild(div);