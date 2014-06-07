(function () {

// ==UserScript==
// @name          Diskusie sme.sk
// @namespace     http://branchman/
// @description   Enables disabled sme.sk discussions
// @copyright     2013, branchman
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @version       0.5
//
// @include   http://*.sme.sk/c/*
// @include   http://*.korzar.sme.sk/c/*
//
// ==/UserScript==


if (document.getElementsByClassName("art-diskusia-ext").length == 0 &&
	document.getElementsByClassName("comments").length == 0) {

	var artDomain = document.location.hostname;
	var artId = document.location.pathname.replace(/\/c\/([0-9]*)\/.*/,"$1");
	
	var artBox = document.getElementsByClassName("art-box-nextart-sme")[0];
	
	artBox.insertAdjacentHTML('afterEnd', 'Blokovaná diskusia <div class="art-diskusia-ext"></div>');

	var diskusiaExt = document.getElementsByClassName("art-diskusia-ext")[0];
	document.write=function(x) { diskusiaExt.insertAdjacentHTML('beforeEnd', x); }

	xmlhttp=new XMLHttpRequest();
    var theUrl = "http://" + artDomain + "/diskusie/extern_action.php?action=get&id_extern_theme=" + artId + "&extern_type=sme-clanok&limit=5&domain=" + artDomain;
    xmlhttp.open("GET", theUrl, false );
    xmlhttp.send(null);    
    
	if (xmlhttp.status === 200) {
		var discCode = xmlhttp.responseText;
		if (discCode.match(/id_reaction=&/)) {
			document.write('<b><a href="http://www.sme.sk/disk_add.asp?sek=clanok&id='+artId+'">Vynútiť založenie diskusie</a></b>');
		} else {
			eval(discCode);
		}
	}
}




})();