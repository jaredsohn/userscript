// ==UserScript==
// version 0.1 - 08/09/2007
// @name           OGame - Color de misiones
// @namespace      http://*ogame*/*
// @include        http://*ogame*/*
// ==/UserScript==

const	lng_rownattack = 'return ownattack';
const	lng_rownespionage = 'return ownespionage';
const	lng_owntransport = 'flight owntransport';
const	lng_rowntransport = 'return owntransport';
const	lng_ftransport = 'flight transport';
const	lng_fownharvest = 'flight ownharvest';
const	lng_rownharvest = 'return ownharvest';

(function(){

	if (location.href.search('overview') != -1 ) {
		//alert('ok');
		//coloreado vision general
		var publi = document.getElementsByTagName ('span');
		for (var i = publi.length - 1; i >= 0; i--) {
			if( publi[i].className == lng_rownattack) {
				publi[i].style.color="rgb(0,136,0)";
			}
			if( publi[i].className == lng_rownespionage) {
				publi[i].style.color="rgb(176,138,0)";
			}
			if( publi[i].className == lng_owntransport) {
				publi[i].style.color="rgb(71,163,237)";
			}
			if( publi[i].className == lng_rowntransport) {
				publi[i].style.color="rgb(18,114,192)";
			}
			if( publi[i].className == lng_ftransport) {
				publi[i].style.color="rgb(9,187,116)";
			}
			if( publi[i].className == lng_fownharvest) {
				publi[i].style.color="rgb(2,202,151)";
			}
			if( publi[i].className == lng_rownharvest) {
				publi[i].style.color="rgb(5,165,131)";
			}
		}
	}

})();
