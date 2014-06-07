// ==UserScript==
// @name           Kigard - Save my skin !
// @namespace      none
// @include        http://www.kigard.fr*
// ==/UserScript==



if (document.location.href == "http://www.kigard.fr/index.php?s=1&p=options&sm=skin"){
	var my_id = document.getElementsByTagName('strong')[1].innerHTML.split('(')[1].split(')')[0];
	var my_name = document.getElementsByTagName('strong')[1].innerHTML.split('(')[0];
	for (i=0;i<document.getElementsByTagName('img').length;i++){
		var	img_name = document.getElementsByTagName('img')[i].src;
			img_name = img_name.replace('http://www.kigard.fr/images/vue/','');
		if (img_name.indexOf('pj')!=-1){
			document.getElementsByTagName('img')[i].setAttribute('onclick',"window.open('http://kodamas.net76.net/kigard/skin.php?action=save&id="+my_id+"&skin="+img_name+"&pseudo="+my_name+"')");
		}
	}
}
var tableau;

if (document.location.href.indexOf("http://www.kigard.fr/index.php?s=1&p=vue")!=-1){
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://kodamas.net76.net/kigard/skin.php?action=recup',
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
						document.getElementsByTagName('td')[i].getElementsByTagName('img')[0].src = "http://www.kigard.fr/images/vue/"+tableau[case_skin];
					}
				}
			}
		}
	});
}