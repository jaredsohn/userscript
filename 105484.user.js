// ==UserScript==
// @name           LulzCheck
// @namespace      brainbran.tk
// @include        *
// @description    Checks your logins against login names compromised by Lulz Security      
// @resource lulzDB http://www.fileden.com/files/2011/6/25/3158121//complete
// ==/UserScript==
function newsubmit(event) {
    var target = event ? event.target : this;

 var thingsToCheck = document.getElementsByTagName('input');
armed=warn=false;
for (var i=0;i<thingsToCheck.length;i++) {
	if (thingsToCheck[i].type == 'text' || thingsToCheck[i].type == 'email') { //the user has entered some sort of text data, so let's try and find it in the database
		submission=thingsToCheck[i].value;
		if (checkDB(submission) == true) {
			warn=true;
		}
	}
	if (thingsToCheck[i].type == 'password') {
		armed=true;
	}
}
if (warn && armed) {
	alert("This login was found in a database of usernames compromised by LulzSec. You should change your password on this site, as well as any other sites that use this login name.");
}

this.submit();
}


	window.addEventListener('submit', newsubmit, true);



function checkDB(thing) {
vulnerable=getLulzDB();
if (vulnerable.indexOf(thing) == -1 || thing.length < 1) {
	return false;
}
else {
	return true;
}
}


function getLulzDB() {
wholePage=GM_getResourceText("lulzDB");
return wholePage.substring(wholePage.indexOf("BEGINDB"),wholePage.indexOf("ENDDB"))
}

