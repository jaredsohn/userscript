// ==UserScript==
// @name           Turn on autocomplete for mbspot.aut.ac.ir
// @namespace      http://userscripts.org/users/508239
// @description    Sets the autocomplete attribute of 'login', 'username' and 'password'-named elements to on
// @include        https://mbspot.aut.ac.ir/*
// @grant          none
// ==/UserScript==
function turnOnAC(namesArr) {	// arr contains the names to search for and change their autocomplete attributes
	var fElems;	// found elements array
	for (var i = 0; i < namesArr.length; i++) {
		//	search for namesArr[i] in document
		fElems = document.getElementsByName(namesArr[i]);
		for (var j = 0; j < fElems.length; j++) {
			fElems[j].autocomplete = "on";
		}
	}
}
turnOnAC(["login","username","password"]);