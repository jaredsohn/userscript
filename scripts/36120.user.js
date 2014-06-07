// ==UserScript==
// @name           Userscript Metadata Update Helper
// @namespace   http://hergonan.blogspot.com/
// @description    Enhances the Update Metadata page of any script.
// @copyright     2008, Firtina Ozbalikci
// @license         GPL 3 or later
// @version        1.02
// @include        http://userscripts.org/scripts/edit/*
// ==/UserScript==


//---------------------------------------------------------------------------------------------------
//    Copyright (C) 2008  Firtina Ozbalikci
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.
//
//    This program is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    For a copy of the latest GNU General Public License, see <http://www.gnu.org/licenses/gpl.html>.

// If you distribute a modified version of Videoembed, you are encouraged to use
// my name in the credits, and a copy of the license above.
//---------------------------------------------------------------------------------------------------

function update()
{
	var nw = textarea.value
	if (old != nw)
	{
		prev.innerHTML = nw;
		old = nw;
	}
}

if(window==window.top){
	old = '';
	textarea = document.getElementById("script_description_extended");
	prev = document.createElement("div");
	textarea.parentNode.insertBefore(prev,textarea);
	prev.setAttribute("style","width:100%;height:"+(textarea.offsetHeight-30)+"px;border:2px solid black;padding:5px;overflow:auto");
	prev.style.display = "none";
	button = document.createElement("input");
	button.setAttribute("type","button");
	button.value = "Show Preview";
	savebutton = document.getElementsByName("commit")[0];
	savebutton.parentNode.insertBefore(button,savebutton);
	button.addEventListener('click',prevtoggle,false);
}

function prevtoggle(){
	if(textarea.style.display == "none"){
		textarea.style.display = "";
		prev.style.display = "none";
		button.value = "Show Preview";
	}
	else{
		update();
		textarea.style.display = "none";
		prev.style.display = "";
		button.value = "Hide Preview";
	}
		
}
