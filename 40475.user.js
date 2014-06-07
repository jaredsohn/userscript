// ==UserScript==
// @author Sirhc - based on code by Wipeer and Flake
// @name BaseBogScript 1.0
// @description BaseBogScript v.1.0 per DarkPirates - Versione Italiana
// @include       http://s*.darkpirates.it/*
// ==/UserScript==
//
// --------------------------------------------------------------------
//

/*Questo script contiene:
Menu aggiuntivo plus con scorciatoie di comodo alle varie funzioni del gioco
Menu' aggiuntivo per link immediato per la fusione dei materiali ++
Suggerimento prezzi del mercato
Mappa galassia migliorata
Correzione traduzioni
v.1.0
corretti nomi, aggiustamento colori mappa galassia
corretto posizionamento scritte prezzi minerali in mappa galassia
aggiunto link diretto per munizioni
aggiunto link diretto per mercato nero
inseriti pezzi per confronti in mercato nero


*/
// ******* Impostazione per Minerali Speciali *******

indirizzo = new Array(	'Meg++', 'index.php?mod=labor&lab=1&reiter=1&rez=3', 'Duran:40 + Phosarit:75 + Helenium:1',
			'Que++', 'index.php?mod=labor&lab=1&reiter=1&rez=6', 'Polenium:100 + Phosarit:50 + Melanit:50 + Lab',
			'Flo++', 'index.php?mod=labor&lab=1&reiter=1&rez=9', 'Ferro:500 + Polenium:400 + Helenium:30 + Lab',
			'War++', 'index.php?mod=labor&lab=1&reiter=1&rez=12','Duran:400 + Quadrinium:80 + Melanit:4 + Lab',
			'Cry++', 'index.php?mod=labor&lab=1&reiter=1&rez=15','Duran:32 + Phosarit:25 + Querell:7 + Lab',
			'Nic++', 'index.php?mod=labor&lab=1&reiter=1&rez=18','Quadrinium:60 + Megatan:26 + Warium:7 + Lab',
			'Ipo++', 'index.php?mod=labor&lab=1&reiter=1&rez=21','Florisar:4 + Niciltar:12 + Lab',
			'Ein++', 'index.php?mod=labor&lab=1&reiter=1&rez=24','Crysolit:3 + Niciltar:2 + Ipolio:6 + Lab'
			);


// ******* Ricerca *******
var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;		// Constant that gives back the first element by XPath
var XPList  = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;		// Constant that gives back a list of elements by XPath
var XPIter  = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;		// Constant that it gives back a iterator of elements by XPath

/*
 * It makes a search in the document using XPath
 * 
 * Params:
 *	xpath Expression of search
 *	xpres Type of search
 *
 * Returns:
 *	Reference to an element result of XPath
 */
 
function find(xpath, xpres){
	var ret = document.evaluate(xpath, document, null, xpres, null);
	return  xpres == XPFirst ? ret.singleNodeValue : ret;
}


// ******* Indirizzo *******
var url = window.location.href;

// ******* Preparazione nomi e prezzi: Minerali, Armi, Scudi, Propulsori, Extra *******
var replacements, regex, key, textnodes, node, s;

replacements = {
       "Quadrinium": "Quadrinium (med 9,5)",
       "Ferro": "Ferro (med 4,5)",
       "Helenium": "Helenium (med 247)",
       "Polenium": "Polenium (med 29,7)",
       "Phosarit": "Phosarit (med 87)",
       "Melanit": "Melanit (med 132)",
       "Duran": "Duran (med 20)",
	   "Megatan": "Megatan (max 4.995)",
	   "Querell": "Querell (max 6.300)",
	   "Florisar": "Florisar (max 8.167)",
	   "Wario": "Wario (max 3.132)",
	   "Crysolit": "Crysolit (max 19.863)",
	   "Niciltar": "Niciltar (max 55.782)",
	   "Ipolio": "Ipolio (max 240.723)",
	   "Einsteinium": "Einsteinium (max 606.744)",
"Munizioni standard": "Munizioni Standard P:1cr",
"Munizioni PAP": "Munizioni PAP P:1neut",
"ASR 5": "ASR 5 P:100cr",
"FDR 13": "FDR 13 P:300cr",
"Ares II": "Ares ll P:20neut",
"Ares I": "Ares l P:10neut",
"Calltroop": "Calltroop P:150cr",
"Smecker": "Smecker P:600cr",
"Starclasher": "Starclasher P:3neut",
"WarpNuker": "WarpNuker P:15neut",
	"Azojal": "Azojal P:5.000cr",
	"Jajawil": "Jajawil P:40.000cr",
	"Biqaj": "Biqaj P:5.000neut",
"Marat": "Marat P:5.000cr",
"Senofle": "Senofle P:5.000cr",
"Undassa": "Undassa P:10.000cr",
"Nenofith": "Nenofith P:15.000cr",
"Chamim": "Chamim P:5.000neut",
"Calenan": "Calenan P:10.000neut",
"CTX 11": "CTX 11 P:20.000cr",
"Fenesyn": "Fenesyn P:35.000cr",
"Sondast": "Sondast P:10.000neut",
"Estenin": "Estenin P:50.000cr",
"Lassathe": "Lassathe P:50.000cr",
"Nensor": "Nensor P:20.000neut",
"Iladar": "Iladar P:25.000neut",
	"Repair-Bot IV": "Repair-Bot lV P:20.000neut",
	"Repair-Bot III": "Repair-Bot lll P:5.000neut",
	"Repair-Bot II": "Repair-Bot ll P:40.000cr",
	"Repair-Bot I": "Repair-Bot l P:10.000cr",
	"Nano-kit": "Nano-kit P:5.000neut"
};

correzioni = {
       "Personaggi": "Caratteri",
       "acceso": "su",
       "Hai trovato ancora": "Devi ancora trovare",
	"è tuo dovere tenerti informato":"è mio dovere tenerti informato"
};





if ( url.match('mod=') ) {
// ******* Preparazione elementi Comuni *******
	var target = find("//div[@id='logo']", XPFirst);
	var target_menu = find("//div[@id='navi-rand']", XPFirst);
	
	var map_caption = document.createElement("div");
	var map_legend = document.createElement("div");
	var map_minerals = document.createElement("div");
	var map_nominerals = document.createElement("div");
	
	var map_style = document.createElement("style");
	var map_menuplus = document.createElement("div");
	
	att = document.createAttribute('style');
	att.value = 'position: relative;';
	
	map_caption.setAttributeNode(att.cloneNode(true));
	map_legend.setAttributeNode(att.cloneNode(true));
	map_minerals.setAttributeNode(att.cloneNode(true));
	map_nominerals.setAttributeNode(att.cloneNode(true));
	
	map_menuplus.setAttributeNode(att.cloneNode(true));
	
	zlivello = ' z-index: 3;';
	pr = 'position: relative; ';
	pa = 'position: absolute; ';
	
	fnormale = ' color: #8CA4AE;';
	flab = ' color: #1B99DF;';
	fminerali = ' color: #1B99DF;';
	fmercato = ' color: #1BDF23;';
	fquartgen = ' color: #9E1BDF; font-weight: bold;';
	fnominerali = ' color: #AE0808;';
	flegenda = ' color: #F6FF00;';
	
	fb = ' font-weight: bold;';
	
	//bgc = 'background-color: gray; ';
	bgc = 'background-color: transparent; ';
	
	imga = ' width="16" heigth="16" border="0" align="top"';

// ******* Correzione Traduzioni ******* 
	recor = {};
	for (key in correzioni) {
		recor[key] = new RegExp(key, 'g');
	}
	
	textcorrnodes = document.evaluate(
		"//text()",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < textcorrnodes.snapshotLength; i++) {
		nodec = textcorrnodes.snapshotItem(i);
		s = nodec.data;
		for (key in correzioni) {
		s = s.replace(recor[key], correzioni[key]);
		}
		nodec.data = s;
	}
}


if( !( url.match('mod=login') || url.match('mod=stuff') || url.match('mod=signup') || url.match('mod=logout') ) ){
	// ******* Gestione Menu Plus *******
	style = 'a.mplus_z{color: #8CA4AE;} a:hover.mplus_z{color: #1BDF23;}';
	style += 'a.mplus_m{color: #8CA4AE;} a:hover.mplus_m{color: #1B99DF;}';
	
	map_style.innerHTML = style;
	
	menuplus = '<div id="klammer-links"><ul><li style="position:relative"><img class="k-links" alt="" src="img/mk-links-klammer.jpg" /><a href="#">Menu Plus</a></li></ul></div>';
	menuplus += '<div id="heimatwelten"><ul>';
	menuplus += '<li><a href="index.php?mod=shop" title="Mercato" class="mplus_z">Mercato</a></li>';
	menuplus += '<li><a href="index.php?mod=laborshop" title="Mercato Laboratorio" class="mplus_m">Mercato Lab.</a></il>';
	menuplus += '<li><a href="http://s1.darkpirates.it/game/index.php?mod=market" title="Mercato Nero" class="mplus_m">Mercato Nero</a></il>';
	menuplus += '<li><a href="index.php?mod=auction" title="Asta Tosta" class="mplus_m">Asta</a></li>';
	
	menuplus += '<li><a href="index.php?mod=hangar&reiter=2" title="Munizioni" class="mplus_m">Munizioni</a></li>';
	menuplus += '<form name="formfindenemy" action="index.php?mod=adventure" method="POST"><input type="hidden" name="mission[3]" value="1"></form>';
	menuplus += '<script>function findenemy() { self.document.forms.formfindenemy.submit() }</script>';
	menuplus += '<li><a href="javascript:findenemy();" title="Ricerca avversari uguali (10 crediti)" class="mplus_m">Ric.Nemico</a></li>';

	menuplus += '<li><a href="index.php?mod=job" title="Lavoro" class="mplus_m">Lavoro</a></li>';
	menuplus += '<li><a href="index.php?mod=training" title="Allenamento" class="mplus_m">Allenamento</a></li>';
	
	menuplus += '<li><a href="index.php?mod=ally&submod=allyrecht" title="Messaggio Circolare Alleanza" class="mplus_m">Msg. Circolare</a></li>';
	menuplus += '<li><a href="index.php?mod=ally&submod=allymembers" title="Membri Alleanza" class="mplus_m">Membri Ally</a></li>';
	
	menuplus += '</div></ul>';
	
	// ******* Gestione Menu Minerali *******
	menuplus += '<div id="klammer-rechts"><ul><li style="position:relative"><img class="k-rechts" alt="" src="img/mk-rechts-klammer.jpg" /><a href="#">Minerali Speciali</a></li></ul></div>';
	menuplus += '<div id="navcontainer2"><ul>';
	for(i=0;i<indirizzo.length;i=i+3){
		if(indirizzo[i+1] != "" && indirizzo[i] != "") {
			menuplus += '<li><a href="';
			menuplus += indirizzo[i+1];
			menuplus += '" title="';
			menuplus += indirizzo[i+2];
			menuplus += '" class="mplus_z">';
			menuplus += indirizzo[i];
			menuplus += '</a></li>';
		}
	}
	menuplus += '</ul></div>';
	
	map_menuplus.innerHTML = menuplus;
	
	target_menu.appendChild(map_style);
	target_menu.appendChild(map_menuplus);
}
// ******* Mappa *******
if(url.match('mod=map')) {
	caption =  '<p style="'+bgc+pa+'width: 100px; left: 189px; top: 400px;'+zlivello+fnormale+ '">Space Singularity</p>';
	caption += '<p style="'+bgc+pa+'width: 90px; left: 269px; top: 326px;' +zlivello+flab+     '">Viking Anomaly</p>';
	caption += '<p style="'+bgc+pa+'width: 110px; left: 283px; top: 428px;'+zlivello+fmercato+ '">SandStorm Nebula</p>';
	caption += '<p style="'+bgc+pa+'width: 70px; left: 167px; top: 290px;' +zlivello+fquartgen+'">Atlanticans</p>';
	caption += '<p style="'+bgc+pa+'width: 90px; left: 233px; top: 216px;' +zlivello+fnormale+ '">Heero Ma Tahh</p>';
	caption += '<p style="'+bgc+pa+'width: 70px; left: 167px; top: 636px;' +zlivello+fquartgen+'">Carminians</p>';
	caption += '<p style="'+bgc+pa+'width: 80px; left: 199px; top: 525px;' +zlivello+fmercato+ '">Avalon Sector</p>';
	caption += '<p style="'+bgc+pa+'width: 140px; left: 63px; top: 363px;' +zlivello+fnormale+ '">Ancient Alien Remmants</p>';
	caption += '<p style="'+bgc+pa+'width: 60px; left: 103px; top: 562px;' +zlivello+fnormale+ '">Dwarf Sun</p>';
	caption += '<p style="'+bgc+pa+'width: 90px; left: 233px; top: 710px;' +zlivello+fnormale+ '">Rubine Nebula</p>';
	caption += '<p style="'+bgc+pa+'width: 110px; left: 261px; top: 599px;'+zlivello+fnormale+ '">Azure Star Cluster</p>';
	caption += '<p style="'+bgc+pa+'width: 70px; left: 305px; top: 497px;' +zlivello+flab+     '">Lotus Flairs</p>';
	caption += '<p style="'+bgc+pa+'width: 140px; left: 445px; top: 215px;'+zlivello+fnormale+ '">Gargantos Asteroid Field</p>';
	caption += '<p style="'+bgc+pa+'width: 100px; left: 429px; top: 326px;'+zlivello+fnormale+ '">Mammoth Nebula</p>';
	caption += '<p style="'+bgc+pa+'width: 80px; left: 551px; top: 289px;' +zlivello+fquartgen+'">Djem Al Dhir</p>';
	caption += '<p style="'+bgc+pa+'width: 80px; left: 623px; top: 364px;' +zlivello+fnormale+ '">Cobalt Rings</p>';
	caption += '<p style="'+bgc+pa+'width: 100px; left: 509px; top: 401px;'+zlivello+flab+     '">Crystalin Planet</p>';
	caption += '<p style="'+bgc+pa+'width: 125px; left: 389px; top: 428px;'+zlivello+fnormale+ '">Giant Crystals of Djefhar</p>';
	caption += '<p style="'+bgc+pa+'width: 70px; left: 419px; top: 497px;' +zlivello+fmercato+ '">Limes Alter</p>';
	caption += '<p style="'+bgc+pa+'width: 90px; left: 511px; top: 526px;' +zlivello+fnormale+ '">Hades System</p>';
	caption += '<p style="'+bgc+pa+'width: 110px; left: 611px; top: 562px;'+zlivello+fnormale+ '">Ancient Battlefield</p>';
	caption += '<p style="'+bgc+pa+'width: 130px; left: 415px; top: 599px;'+zlivello+flab+     '">Tolgay Asteroid Field</p>';
	caption += '<p style="'+bgc+pa+'width: 70px; left: 557px; top: 637px;' +zlivello+fquartgen+'">Terill Tkarr</p>';
	caption += '<p style="'+bgc+pa+'width: 70px; left: 483px; top: 710px;' +zlivello+fnormale+ '">Green Hell</p>';
	
	legend =  '<p style="'+bgc+pa+'width: 110px; left: 355px; top: 700px;'+zlivello+flegenda+   '">Legenda:</p>';
	legend += '<p style="'+bgc+pa+'width: 110px; left: 360px; top: 715px;'+zlivello+fnormale+   '">Normale</p>';
	legend += '<p style="'+bgc+pa+'width: 110px; left: 360px; top: 730px;'+zlivello+flab+       '">Laboratorio</p>';
	legend += '<p style="'+bgc+pa+'width: 110px; left: 360px; top: 745px;'+zlivello+fmercato+   '">Mercato</p>';
	legend += '<p style="'+bgc+pa+'width: 110px; left: 360px; top: 760px;'+zlivello+fquartgen+  '">Quartier Generale</p>';
	legend += '<p style="'+bgc+pa+'width: 110px; left: 360px; top: 775px;'+zlivello+fnominerali+'">Mancanza Minerali</p>';	
	

	minerals =  '<span style="'+bgc+pa+'width: 140px; left: 35px; top: 460px;' +zlivello+flegenda+'">Minerali Spec.:</span>';

	minerals += '<span style="'+bgc+pa+'width: 140px; left: 40px; top: 475px;' +zlivello+'"><img src="img/item/6_8k.gif"' +imga+'><span style="'+pr+fminerali+fb+'">Megatan</span> <span style="'+pr+fnormale+' left: 37px;">4.995</span></span>';

	minerals += '<span style="'+bgc+pa+'width: 140px; left: 40px; top: 490px;' +zlivello+'"><img src="img/item/6_9k.gif"' +imga+'><span style="'+pr+fminerali+fb+'">Querell</span> <span style="'+pr+fnormale+' left: 43px;">6.300</span></span>';

	minerals += '<span style="'+bgc+pa+'width: 140px; left: 40px; top: 505px;' +zlivello+'"><img src="img/item/6_10k.gif"'+imga+'><span style="'+pr+fminerali+fb+'">Florisar</span> <span style="'+pr+fnormale+' left: 41px;">8.167</span></span>';

	minerals += '<span style="'+bgc+pa+'width: 140px; left: 40px; top: 520px;' +zlivello+'"><img src="img/item/6_11k.gif"'+imga+'><span style="'+pr+fminerali+fb+'">Warium</span> <span style="'+pr+fnormale+' left: 41px;">3.132</span></span>';


	minerals += '<span style="'+bgc+pa+'width: 140px; left: 605px; top: 460px;'+zlivello+flegenda+'">Minerali Spec.:</span>';

	minerals += '<span style="'+bgc+pa+'width: 140px; left: 610px; top: 475px;'+zlivello+'"><img src="img/item/6_12k.gif"'+imga+'><span style="'+pr+fminerali+fb+'">Crysolit</span> <span style="'+pr+fnormale+' left: 33px;">19.863</span></span>';

	minerals += '<span style="'+bgc+pa+'width: 140px; left: 610px; top: 490px;'+zlivello+'"><img src="img/item/6_13k.gif"'+imga+'><span style="'+pr+fminerali+fb+'">Niciltar</span> <span style="'+pr+fnormale+' left: 35px;">55.782</span></span>';

	minerals += '<span style="'+bgc+pa+'width: 140px; left: 610px; top: 505px;'+zlivello+'"><img src="img/item/6_14k.gif"'+imga+'><span style="'+pr+fminerali+fb+'">Ipolio</span> <span style="'+pr+fnormale+' left: 37px;">233.500</span></span>';

	minerals += '<span style="'+bgc+pa+'width: 140px; left: 610px; top: 520px;'+zlivello+'"><img src="img/item/6_15k.gif"'+imga+'><span style="'+pr+fminerali+fb+'">Einsteinium</span> <span style="'+pr+fnormale+' left: 6px;">650.000</span></span>';


	nominerals =  '<span style="'+bgc+pa+'width: 70px; left: 170px; top: 700px;'+zlivello+'"><img src="img/item/6_1k.gif"'+imga+'><span style="'+pr+fnominerali+'">Ferro</span></span>';
	
	nominerals += '<span style="'+bgc+pa+'width: 70px; left: 555px; top: 700px;'+zlivello+'"><img src="img/item/6_7k.gif"'+imga+'><span style="'+pr+fnominerali+'">Melanit</span></span>';

	nominerals += '<span style="'+bgc+pa+'width: 70px; left: 170px; top: 353px;'+zlivello+'"><img src="img/item/6_6k.gif"'+imga+'><span style="'+pr+fnominerali+'">Phosarit</span></span>';

	nominerals += '<span style="'+bgc+pa+'width: 70px; left: 560px; top: 353px;'+zlivello+'"><img src="img/item/6_5k.gif"'+imga+'><span style="'+pr+fnominerali+'">Helenium</span></span>';

	
	map_caption.innerHTML = caption;
	map_legend.innerHTML = legend;
	map_minerals.innerHTML = minerals;
	map_nominerals.innerHTML = nominerals;
	
	target.appendChild(map_caption);
	target.appendChild(map_legend);
	target.appendChild(map_minerals);
	target.appendChild(map_nominerals);
}


// ******* Mercato ******* 
if(url.match('mod=shop') || url.match('mod=market') ) {

	regex = {};
	for (key in replacements) {
	    regex[key] = new RegExp(key, 'g');
	}

	textnodes = document.evaluate(
	    "//text()",
	    document,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);
	for (var i = 0; i < textnodes.snapshotLength; i++) {
	    node = textnodes.snapshotItem(i);
	    s = node.data;
	    for (key in replacements) {
		s = s.replace(regex[key], replacements[key]);
	    }
	    node.data = s;
	}

}






