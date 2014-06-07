// ==UserScript==
// @name		FTD Mobile NZB knoppen
// @description	Plaatst NZB knoppen op FTDMobile.nl
// @include		*ftdmobile.nl*
// ==/UserScript==

document.addEventListener("DOMNodeInserted", documentChanged, false);

function documentChanged(event) {
	unsafeWindow.$('p.filename').each(function(i) {
		unsafeWindow.$(this).removeClass('filename');

		var bestandsnaam = unsafeWindow.$(this).text().substr(10);
		var hash = window.location.hash;
		var bin = "http://www.binsearch.info?max=250&adv_age=365&q=";
		var yab = "http://www.yabsearch.nl/search/";
		var nzbi = "http://www.nzbindex.nl/search/?max=250&age=350&q=";
		
		unsafeWindow.$(this).append('\n\n<br/><b>NZB knoppen (<span style="cursor:pointer;text-decoration:underline;" onclick="alert(\'Zoeken op bestandsnaam:\\nKlik op de NZB-knop van de engine naar keuze om te zoeken op bestandsnaam.\\n\\nZoeken op tekstselectie:\\nSelecteer eerst een stuk tekst in de pagina en klik vervolgens op de NZB-knop van de engine naar keuze om de tekstselectie als zoekterm te gebruiken.\');">uitleg</span>):</b><br/>\n\n');
		
		unsafeWindow.$(this).append('<a class="button_blue" onclick="javascript:q=document.getSelection();if(q){window.open(\''+bin+'\'+q)}else{window.open(\''+bin+bestandsnaam+'\')}" href="'+hash+'"><span>Binsearch</span></a>\n\n');
		
		unsafeWindow.$(this).append('<a class="button_blue" onclick="javascript:q=document.getSelection();if(q){window.open(\''+yab+'\'+q)}else{window.open(\''+yab+bestandsnaam+'\')}" href="'+hash+'"><span>YabSearch</span></a>\n\n');
		
		unsafeWindow.$(this).append('<a class="button_blue" onclick="javascript:q=document.getSelection();if(q){window.open(\''+nzbi+'\'+q)}else{window.open(\''+nzbi+bestandsnaam+'\')}" href="'+hash+'"><span>NZBIndex</span></a>\n<br/>\n<br/>\n<br/>\n\n');
	});
}