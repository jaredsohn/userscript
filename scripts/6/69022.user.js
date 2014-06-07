// ==UserScript==
// @name            Freundschaftslisten-Erweiterung
// @namespace       http://www.brainhacker.de
// @description     Erweitert die Freundschaftsliste um ein paar wichtige Punkte.
// @author          Lukas Heblik
// @date            2009-4-19
// @include         http://www.schuelervz.net*
// @include         http://schuelervz.net*
// @include         https://www.schuelervz.net*
// @include         https://schuelervz.net*
// @include         https://secure.schuelervz.net*
// @include         http://www.studivz.net*
// @include         http://studivz.net*
// @include         https://www.studivz.net*
// @include         https://studivz.net*
// @include         https://secure.studivz.net*
// @include         http://www.meinvz.net*
// @include         http://meinvz.net*
// @include         https://www.meinvz.net*
// @include         https://meinvz.net*
// @include         https://secure.meinvz.net*
// ==/UserScript==

// Copyright by Lukas Heblik
// http://www.brainhacker.de

//Finds the VZ-Network
if (location.href.indexOf("studivz.net") > -1) {
  var NETWORK = "studivz";
} else if (location.href.indexOf("meinvz.net") > -1) {
  var NETWORK = "meinvz";
} else if (location.href.indexOf("schuelervz.net") > -1) {
  var NETWORK = "schuelervz";
}
const SERVER = "http://www." + NETWORK + ".net/";


//Puts extra Points in the Menu
if(document.URL.indexOf("Friends")!=-1) {
    var tbody = document.getElementsByTagName("tbody")[0];
	var tr = tbody.getElementsByTagName("tr");
	var tr2 = tbody.getElementsByTagName("tr")[0];
	for(var i=0;i<tr.length;i++){
		function init(site, linkname, siteend) {
			var id = tr2.getElementsByTagName("td")[0].getElementsByTagName("a")[0].getAttribute("href").match(/Profile\/([-\w]+)/i)[1];
			//var nickname = tr2.getElementsByTagName("td")[2].innerHTML.match(/((\w+))\ Freunde<\/a>/i)[1];
			var ul = tr2.getElementsByTagName("td")[2].getElementsByTagName("ul")[0];
			var li = document.createElement("li");
			var a = document.createElement("a");
			a.href =site + id + siteend;
			a.innerHTML=linkname;  /*nickname + */
			li.appendChild(a);
			ul.insertBefore(li, ul.getElementsByTagName("li")[1]);
			//ul.appendChild(li);
		}
		tr2 = tbody.getElementsByTagName("tr")[i];
		init(SERVER + "Pinboard/", "Pinnwand", "/p/1");
		init(SERVER + "Photos/Tags/", "Verlinkungen", "");
		init(SERVER + "Photos/Album/", "Fotos", "");
	}
}