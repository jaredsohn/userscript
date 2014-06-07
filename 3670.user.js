// ==UserScript==
// @name         vBulletin - Show Postnumber
// @namespace    https://userscripts.org/people/5587
// @description  Shows [post=n]title[/post] near # postnumber, so internal links to single posts in vBulletin-forums could be done easy. Works in linear and hybrid mode only! Zeigt [post=n]Titel[/post] neben # Beitragnummer - erleichtert somit das Verlinken auf einzelne Beitraege in vBulletin-Foren. Funktioniert nur in Linear- und Hybriddarstellung!
// @downloadURL  https://userscripts.org/scripts/source/3670.user.js
// @grant        none
// @include      */showthread.php*
// @include      http://www.vbseo.com/f*
// @include      http://www.apfeltalk.de/forum/*
// @updateURL    https://userscripts.org/scripts/source/3670.meta.js
// @version      1.0.1
// @date         2013-03-20
// @creator      Arne Dieckmann (aka "Mithrandir")
// ==/UserScript==

(function () {
// Anfang der moeglichen Anpassungen - Stil der anzuzeigenden Strings:
// Fuer Postlinks:
var p_postcolor = '#f9f9f9';           // moeglich waere auch 'inherit' - dann wird die Standardfarbe eingesetzt
var p_postbackground = 'transparent';  // Hintergrundfarbe/art - fuer rot: '#f00'
var p_postfontsize = '0.8em';          // Schriftgroesse (mit 0.8em wird sie kleiner)
// Hover-Text des anzuzeigenden Strings (title-Attribut):
var p_posthover = 'Kopieren Sie die Zeichenfolge, um auf diesen Beitrag zu verweisen';
// Fuer Threadlink:
var p_threadlink = 1;                  // 1= auch [thread=n]Titel[/thread] in Navbar anzeigen
var p_threadfontsize = '0.7em';        // Schriftgroesse
var p_threadhover = 'Kopieren Sie die Zeichenfolge, um auf dieses Thema zu verweisen';
// Maximale Laenge fuer Titel (0 fuer keine Aenderung):
var p_titlelen = 55;
// Ende der moeglichen Anpassungen


// Ab hier nichts mehr aendern!

var v_title='';                        // Fuer Titel

// Titelnode ermitteln (vBulletin 4 und vBulletin 3.6x)
var titlenode = document.evaluate(
	"//div[@id='pagetitle']/h1/span|//td[@class='navbar']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

// Titelstring ermitteln
if (titlenode.snapshotItem(0) != null) {
	v_title= fcttitle(titlenode.snapshotItem(0).textContent);
	// Threadlink setzen, falls gewuenscht
	if (p_threadlink == 1){
		var link_node = document.evaluate(
		"//a[contains(@href,'sendmessage.php?do=sendtofriend')]",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
		var tnr=fctgivenumber(link_node.snapshotItem(0).href,'t');
		titlenode.snapshotItem(0).innerHTML = "<span style='cursor:help' id=gmvbspn_t" + tnr + " title='"+p_threadhover+"'><span style='font-size:"+p_threadfontsize +"'>[thread=" + tnr +"]</span>"+v_title+"<span style='font-size:"+p_threadfontsize +"'>[/thread]</span></span>";
		var tlink=document.getElementById("gmvbspn_t"+tnr);
		tlink.addEventListener('click', selectID("gmvbspn_t"+tnr), false);
		}
	// Ende Threadlink setzen, falls gewuenscht
	} else {
	// falls kein Titelnode gefunden, auf document.title ausweichen
	v_title=fcttitle(document.title);
}
// Ende Titelstring ermitteln

//Postnodes ermitteln
var postnodes = document.evaluate(
	"//a[starts-with(@id,'postcount')]",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);


//Postlinks in vorher ermittelten Postnodes setzen
for(var i=0; i<postnodes.snapshotLength; i++) {
	thisnode = postnodes.snapshotItem(i);
	var postspan = document.createElement("span");
	var postid= fctgivenumber(thisnode.id,"p");
	postspan.id = "gmvbspn_p"+postid;
	postspan.innerHTML="[post="+postid+"]"+v_title+"[/post] ";
	postspan.style.backgroundColor = p_postbackground;
	postspan.style.color = p_postcolor;
	postspan.style.cursor = 'help';
	postspan.style.fontSize= p_postfontsize;
	postspan.title = p_posthover;
	postspan.addEventListener('click', selectID(postspan.id), false);
	thisnode.parentNode.insertBefore(postspan, thisnode.previousSibling);	
}
// Ende Postlinks setzen


// Hilfsfunktionen

// Markierung per Klick auf Element mit ID:
function selectID(sId){
	return (function(event) {
	var myElement = document.getElementById(sId);
	var selection = window.getSelection();
	var range = document.createRange();	
	range.selectNodeContents(myElement);
	selection.removeAllRanges();
	selection.addRange(range);
	});
}


// kuerzt den Titel auf x Zeichen - s. p_titlelen (es wird nicht im Wort gekuerzt):
function fcttitle(a_str){
	a_str = a_str.replace(/ +/g, ' ').replace(/^\s+/g, '').replace(/\s+$/g, '');
	if(a_str.length > p_titlelen && p_titlelen > 0) {
		wordWrap = a_str.slice(0,a_str.lastIndexOf(' ',p_titlelen));
		if (wordWrap.length<a_str.length){wordWrap += '&nbsp;&#133';}
	}
	else {
		wordWrap = a_str;
	}
	return wordWrap.replace(/</g,'&lt;').replace(/'/g,'&apos;').replace(/"/g,'&quot;');;
}


// extrahiert die Post- bzw. Threadnummer:
function fctgivenumber(a_str,a_type) {
	var b_return='';
	if (a_type == 'p') {
		// alle Zahlen ab '...postcount':
		b_return=a_str.match(/postcount\d+/)[0].match(/\d+/);
		}
	else {
		// einige Browser veraendern leider innerHTML, deshalb innerHTML sicherheitshalber auf einen Stand bringen:
		var c_tlinkextr = 'sendmessage.php?do=sendtofriend&amp;t=';
		var c_tlinkrepl = 'sendmessage.php?do=sendtofriend&t=';
		a_str=a_str.replace(c_tlinkrepl,c_tlinkextr);
		// alle Zahlen ab '...sendmessage.php?do=sendtofriend&amp;t=' (? maskiert!):
		b_return=a_str.match(/sendmessage.php\?do=sendtofriend&amp;t=\d+/)[0].match(/\d+/);
	}
	return b_return;
}
// Ende Hilfsfunktionen

})();
