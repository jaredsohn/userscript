// ==UserScript==
// @name           Kigard - Save my custom skin
// @namespace      none
// @include        http://www.kigard.fr*
// ==/UserScript==

var tableau;

if (document.location.href.indexOf("http://www.kigard.fr/index.php?s=1&p=vue")!=-1){
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://kodamas.net76.net/kigard/skin2.php?action=recup',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
			'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
			'Content-Language' :'fr',
		},
		onload:function(msg){
			tableau = msg.responseText.split(';');
			nb_inscrits = (tableau.length-1)/3;
			for (k = 1 ; k <= nb_inscrits ; k++ ) {
				case_pseudo = (k*3)-1;
				case_skin = (k*3)-2;
				for (i=0;i<document.getElementsByTagName('td').length;i++){
					if (document.getElementsByTagName('td')[i].getElementsByTagName('span')[0] 
						&&
						document.getElementsByTagName('td')[i].getElementsByTagName('span')[0].innerHTML.indexOf(tableau[case_pseudo])
						!=-1
						){
						document.getElementsByTagName('td')[i].getElementsByTagName('img')[0].src = tableau[case_skin];
					}
				}
			}
		}
	});
}