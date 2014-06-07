// ==UserScript==
// @name           mods - Stile
// @namespace      Kambfhase
// @description    Ändert das Aussehen des Forums.
// @include        http://forum.mods.de/*
// ==/UserScript==

var stile = {
		"Grün" : { url: "http://kampfhase2005.funpic.de/uploads/green.css", descr: "Wie Standard, nur in grün, statt blau."},
		"Rot" : { url: "http://kampfhase2005.funpic.de/uploads/red.css", descr: "Wie Standard, nur rot, statt blau."}
		};





var head = document.evaluate("//head", document, null, 8, null).singleNodeValue;
if( GM_getValue('standard_stil') == undefined || GM_getValue('standard_stil') == "" ){
	for( var [key, wert] in Iterator(stile))
		head.innerHTML += '<link rel="alternate stylesheet" href="'+wert.url+'" type="text/css" title="'+key+'" media="screen, projection" />';
	alert("Du hast noch keinen Stil gewählt. Zum Rumprobieren drücke im folgenden Dialog einfach 'Abbrechen'.");
	var text = "Keinen Stil gewählt.\n\nZur Auswahl steht:\n- Standard     Der Standardskin halt.\n";
	for( var [key, wert] in Iterator(stile)){
		text += "- "+key+"     "+wert.descr+"\n";
	}
	var neu_standard = prompt(  text + "\nBitte den Namen hier eintragen:","");
	GM_setValue('standard_stil', neu_standard);
	alert("Dein neuer Stil ist nach neuladen der Seite aktiv.");
}
else {
	var standard = GM_getValue('standard_stil');
	
	var link = document.evaluate("//link", document, null, 8, null).singleNodeValue;
	
	if( standard == "Standard") 
		link.disabled = false;
	else{
		link.disabled = true;
		link.rel = "alternate stylesheet";
	}
	for( var [key, wert] in Iterator(stile)){
		head.innerHTML += '<link rel="alternate stylesheet" href="'+wert.url+'" type="text/css" title="'+key+'" media="screen, projection" disabled="disabled" />';
		if( standard == key){
			GM_xmlhttpRequest({
			  method:"GET",
			  url: wert.url,
			  headers:{
			    "User-Agent":"Mozilla/5.0", 
			    "Accept":"text/xml"
			  },
			  onload:function(response) {
			    GM_addStyle( response.responseText);
			  }
			});
		}
	}
}

GM_registerMenuCommand( "Setze gewählten Stil zurück.", back2basics );

function back2basics(){
	GM_setValue('standard_stil', "");
	alert("Du kannst den Stil nach dem neuladen der Seite erneut wählen.");
}