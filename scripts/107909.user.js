// ==UserScript==
// @name           Cam4 Highlighter Improved
// @description    Updated script to highlights users from defined countries on cam4.com
// @include        http://*cam4.*
// ==/UserScript==
// USERSCRIPT SETTINGS, YOU CAN CHANGE SETTINGS IN THIS SECTION

// Highlighted countries
var hlCountries = "UK";
var hlSexes = "gay";

// Highlighting color
var hlColor = "blue";
var hlSexColor = "magenta";
var hlBothColor = "green"

// USERSCRIPT SETTINGS END

var allUsers, allSexes, thisUser, thisSex, arrCountries, arrSexes, box, foo;

hlCountries = hlCountries.replace(" ","");
arrCountries = hlCountries.split(",");
hlSexes = hlSexes.replace(" ","");
arrSexes = hlSexes.split(",");
allUsers = document.getElementsByClassName('country');
allSexes = document.getElementsByClassName('sexnorientation');

for (var i = 0; i < allUsers.length; i++) {
	foo = false;
	thisUser = allUsers[i];
	thisSex = allSexes[i];
	box = getUserBox(thisUser);	
    	for (var j = 0; j < arrCountries.length; j++)
        	if (thisUser.innerHTML.search(arrCountries[j]) != -1) {
			box.style.backgroundColor = hlColor;
			foo = true;
		}
	for (var j = 0; j < arrSexes.length; j++)
		if (thisSex.innerHTML.search(arrSexes[j]) != -1) {
			if (foo == false) box.style.backgroundColor = hlSexColor;
			else box.style.backgroundColor = hlBothColor;
		}		
}

function getUserBox(user) {
	for (var i = 0; i < 4; i++) user = user.parentNode;
	return user;
}