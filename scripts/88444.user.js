// ==UserScript==
// @name           VA artist role changer
// @namespace      http://userscript.org
// @description    VA artist role changer
// @include        http*://*what.cd/torrents.php?id=*
// ==/UserScript==


function getSubmit() {
	var inputs = document.getElementsByTagName("input");
	for (var e in inputs) {
		if (inputs[e].className == "convert") {
			return inputs[e];
		}
	}
}
function getDrop() {
	return document.getElementsByClassName("convertDrop")[0];
}
function validate(checkbox) {
	return checkbox.checked;
}

var j = 0;
function addCheckBox() {
	var addArtists = document.getElementById("AddArtists");
	var el = document.createElement('input');
	el.type = 'checkbox';
	el.name = j++;
	el.className = 'addcheck';
	addArtists.appendChild(document.createTextNode(' ')); // Adding a space cause I'm pedantic
	addArtists.appendChild(el);
}

function convertAll() {
	var checks = document.getElementsByClassName("addcheck");
	for (var e in checks) {
		if (validate(checks[e]) == true) {
			var dropDowns = document.getElementsByTagName("select");
			dropDowns[e].value = getDrop().value;
		}
	}
}
var addConvert = "| <select class=\"convertDrop\">";
addConvert += "<option value=\"1\">Main</option>";
addConvert += "<option value=\"2\">Guest</option>";
addConvert += "<option value=\"3\">Remixer</option>";
addConvert += "</select><input type=\"button\" value=\"Convert\" class=\"convert\">";

var plusSign = document.getElementById('AddArtists').parentNode.parentNode.parentNode.children[0].children[1].children[0];
//ugly but shh

var addArtists = document.getElementById('AddArtists');

addArtists.parentNode.innerHTML += addConvert;
getSubmit().addEventListener('click',convertAll,true);
plusSign.addEventListener("click", addCheckBox, true);
addCheckBox();