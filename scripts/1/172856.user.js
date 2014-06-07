// ==UserScript==
// @name         E(x)-Hentai One-Click DL
// @namespace    https://github.com/DakuTree/various/blob/master/experiments/eh_uscripts
// @author       Daku (admin@codeanimu.net)
// @description  Enables one-click DL archive downloading.
// @include      /^http[s]?:\/\/(g\.e-|ex)hentai\.org\/g\/.*$/
// @updated      2013-07-29
// @version      1.0.2
// ==/UserScript==

var a = document.getElementsByClassName('g2')[0].getElementsByTagName('a')[0];
var xs = a.getAttributeNode('onclick').nodeValue.split('?')[1].split("'")[0];
a.removeAttribute('onclick');


a.addEventListener('click', function() {
	var http = new XMLHttpRequest();
	var params = "dlcheck=Download Archive";
	http.open("POST", location.origin+'/archiver.php?'+xs, true); //TODO: Check if location.origin is correct
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	http.onreadystatechange = function() {
		if(http.readyState == 4 && http.status == 200) {
			if(http.responseText.indexOf("Please wait...") !== -1){ //Check if pop-up opened.
				var match = /<a href="(http.*?)"/g.exec(http.responseText);
				window.location.href = match[1] + "?start=1";
			}
		}
	}
	http.send(params);

	return false
}, false);
