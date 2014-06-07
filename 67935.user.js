// ==UserScript==
// @name          skunk.nu
// @include       http://skunk.spray.se/*
// ==/UserScript==

//fixar enctype-buggen:
var forms = document.getElementsByTagName("form");
for ( i = 0; i<forms.length; i++) {
	if (forms[i].enctype != "" ) {
		forms[i].enctype = "";
	}
}

//tar bort lite reklam:
document.getElementById("lea_728x90").innerHTML="";
document.getElementById("lea_468x60").innerHTML="";
document.getElementById("lea_120x60").innerHTML="";
document.getElementById("lea_nothing").innerHTML="";