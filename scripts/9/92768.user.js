// ==UserScript==
// @name         	Parse Invalid Text
// @description		Removes invalid characters
// @version	 		3.0
// @include			http://*.bungie.net*createpost.aspx*
// @author	  		dazarobbo
// @copyright		2010, dazarobbo
// @license 		(CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// ==/UserScript==
var btn;

function addButton(){
	btn=document.createElement("input");
	btn.type="button";
	btn.value="Parse Text";
	btn.style.backgroundColor="#1B1D1F";
	btn.style.color="#BBBBBB";
	btn.style.border="1px solid #414547";
	btn.style.height="23px";
	
	btn.addEventListener("click",function(){
		parseText();
	},false);
	
	var list=document.getElementsByClassName("right_actions")[0];
	list.appendChild(btn);
}

function parseText(){
	var elem=document.getElementById("ctl00_mainContent_postForm_skin_body");
	var str=elem.value;

	str = str.replace(/[^\x00-\xFF]/g, "")
	
	elem.value=str;
	alert("Done!");
}

function main(){
	addButton();
}

main();