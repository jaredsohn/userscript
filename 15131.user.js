// ==UserScript==
// @name           wp-hidecomment
// @namespace      wp-hidecomment
// @description    no more anoying dump comments :o)
// @include        *
// ==/UserScript==

/*
add comma seperated usernames of annoying comentators below
If special characters are in use, copy the username directly from source
*/
dumps = new Array('example Users nick');
// altText = "<span style='font-weight:normal;'>[Kommentar von <i>&rsaquo;{dumpie}&lsaquo;</i> ausgeblendet]</span>";
altText = "<span style='font-weight:normal;'>[<i>&rsaquo;{dumpie}'s&lsaquo;</i> comment killed]</span>";

// commentlists
ols = document.getElementsByTagName('ol');
for (i=0; i<ols.length; i++) {
	for (k=0; k<ols[i].attributes.length; k++){
		if (ols[i].attributes[k].value ==  'commentlist'){
			lis = ols[i].getElementsByTagName('li');
			dumpdel(lis, dumps);
		}
	}
}

function dumpdel(lis, dumps){
	for (i=0; i<lis.length; i++){
		for (k=0; k<dumps.length; k++){
			// check for dumpie
			if((lis[i].getElementsByTagName('cite')[0].innerHTML.match(new RegExp(">?" + dumps[k] + "<?"))) != null){
				ihtml = altText.replace( /{dumpie}/, dumps[k]);
				lis[i].innerHTML = ihtml;
			}
		}
	}
}
