// ==UserScript==
// @name           mo.hu google search
// @namespace      tewe
// @include        https://*magyarorszag.hu/*
// @version			1.0
// ==/UserScript==

var newdropdown = document.createElement("option");
newdropdown.id = "googledd";
newdropdown.text = "Google keresés";
document.getElementById("findWhere").appendChild(newdropdown);

var Ginput = document.createElement("input");
Ginput.type = "hidden";
Ginput.name = "q";
document.getElementById("findWhere").appendChild(Ginput);

var holnemkeres = ["edemokracia", "forum", "kozlony", "hirdetmeny"];
holnemkeres.unshift(" ");
var holnemkeres = holnemkeres.join(" -");

function GG() {
	if(newdropdown.selected == true) {
		var googlebutton = document.getElementById("frmMain_0");
		googlebutton.value = "Google";
		
		function GGsearch() {
			var searchtext = document.getElementById("findWhat").value;
			Ginput.value = searchtext+holnemkeres+" site:magyarorszag.hu";
			document.getElementById("frmMain").method="get";
			document.getElementById("frmMain").action="https://www.google.com/search";
			}
		googlebutton.addEventListener("click", GGsearch ,false)
		}
	}

document.getElementById("findWhere").addEventListener("change", GG, false);