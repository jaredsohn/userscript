// JavaScript Document
// ==UserScript==
// @author Sirhc [BaseBog] - tradus in romaneste de Paul Cojocaru
// @name BaseBogScript 3.0.2
// @description BaseBogScript with advanced menu, galaxy map, browser title timer
// @include http://s*.darkpirates.ro/*
// ==/UserScript==
//
// --------------------------------------------------------------------
//

/* ******* Log modifiche:
v.3.0.2
-aggiunto menù alleanza
-aggiunto menù info
-possibilità di personalizzare la visualizzazione del menù, nuova funzione nascondi/mostra
-tolti collegamenti su voci "Menù Plus" e "Minerali Speciali"
-correzione prezzi minerali speciali
-aggiunte correzioni traduzioni
-fissato tipo carattere in mappa galassia e ritoccato layout
v.2.0
-correzione prezzi minerali speciali
-minimo e massimo su minerali normali
-nuovi link(scorciatoie) nel menuplus
-gestione dinamica del menuplus in base ai settori
-gestione dinamica del menu minerali speciali in base ai settori
-aggiunta colori in scritte menù permanenti
-aggiunto contatore alla rovescia su barra titolo
v.1.0
-corretti nomi, aggiustamento colori mappa galassia
-corretto posizionamento scritte prezzi minerali in mappa galassia
-aggiunto link diretto per munizioni
-aggiunto link diretto per mercato nero
-inseriti prezzi per confronti in mercato nero
0.9beta
-Menu aggiuntivo plus con scorciatoie di comodo alle varie funzioni del gioco
-Menu' aggiuntivo per link immediato per la fusione dei materiali ++
-Suggerimento prezzi del mercato
-Mappa galassia migliorata
-Correzione traduzioni
0.8beta
-MenuPlus
-MappaGalassia
*/

var Versione = '3.0.2'

if (!GM_xmlhttpRequest) {
    alert('Please upgrade to the latest version of Greasemonkey.');
    return;
}
// ******* Impostazione per Minerali Speciali *******
//	abbreviazione	link					ricetta						quando
minerali = new Array(	
	'Meg++', 'index.php?mod=labor&lab=1&reiter=1&rez=3', 'Duran:40 + Phosarit:75 + Helenium:1',		'X',
	'Que++', 'index.php?mod=labor&lab=1&reiter=1&rez=6', 'Polenium:100 + Phosarit:50 + Melanit:50 + Lab',	'L',
	'Flo++', 'index.php?mod=labor&lab=1&reiter=1&rez=9', 'Iron:500 + Polenium:400 + Helenium:30 + Lab',	'L',
	'War++', 'index.php?mod=labor&lab=1&reiter=1&rez=12','Duran:400 + Quadrinium:80 + Melanit:4 + Lab',	'L',
	'Cry++', 'index.php?mod=labor&lab=1&reiter=1&rez=15','Duran:32 + Phosarit:25 + Querell:7 + Lab',	'L',
	'Nic++', 'index.php?mod=labor&lab=1&reiter=1&rez=18','Quadrinium:60 + Megatan:26 + Warium:7 + Lab',	'L',
	'Ipo++', 'index.php?mod=labor&lab=1&reiter=1&rez=21','Florisar:4 + Niciltar:12 + Lab',			'L',
	'Ein++', 'index.php?mod=labor&lab=1&reiter=1&rez=24','Crysolit:3 + Niciltar:2 + Ipolio:6 + Lab',	'L'
);

// ******* Impostazione collegamenti veloci
//quando	URL						titolo				classe		testo		stile
m_p = new Array(
'X',	'javascript:findenemy();',			'Cauta adversari egali (10 credite)','mplus_m','Ric.Nemico', 	'',
'X',	'index.php?mod=hangar&reiter=2',		'Munitie',			'mplus_m',	'Munizioni', 		'',
'S',	'index.php?mod=shop',				'Piata',			'mplus_z',	'Mercato', 		'',
'B',	'index.php?mod=market',				'Piata neagra',			'mplus_m',	'Mercato Nero',		'',
'T',	'index.php?mod=training',			'Antrenament',			'mplus_m',	'Allenamento',		'',
'O',	'index.php?mod=office',				'Ordin','mplus_m',	'Burocrate',		'',
'J',	'index.php?mod=job',				'Munca',			'mplus_m',	'Lavoro',		'',
'P',	'index.php?mod=packages',			'Hangar',			'mplus_m',	'Magazzino',		'',
'A',	'index.php?mod=auction',			'Licitatie',				'mplus_m',	'Asta',			'',
'L',	'index.php?mod=laborshop',			'Laborator',			'mplus_m',	'Laboratorio',		''
);

// ******* Impostazione collegamenti ally
m_a = new Array(
'W',	'index.php?mod=ally&submod=allyrecht',		'Mesaj in alianta',	'mplus_m',	'Msg. Circolare', 	'',
'W',	'index.php?mod=ally&submod=allymembers',	'Membri Alianta',		'mplus_m',	'Membri', 		'',
'W',	'index.php?mod=ally&submod=allyfights',		'Lupte ale aliantei',		'mplus_m',	'Battaglie',		'',
'W',	'index.php?mod=ally&submod=allycastle',		'Mesajul de imbunatatire a aliantei',	'mplus_m',	'Ampliamento',		''
);
// ******* Impostazione collegamenti Info
m_i = new Array(
'W',	'http://userscripts.org/scripts/search?q=basebogscript',		'clicca per cercare gli aggiornamenti',	'mplus_m',	'Versiune '+Versione, 	'color:#884444'
);

/* Anagrafica settori
cosa:
S=Mercato (S)hop
B=Mercato Nero (B)lack Market
T=Allenamento (T)raining
O=Ufficio Reclutameto o Burocrate (O)ffice
J=Lavoro (J)ob
P=Magazzino (P)ackages
A=Asta (A)uction
L=Mercato Laboratorio (L)aborShop


D=Deruba Trasporti
R=Raccogli Risorse
*/
//	nome settore			warp		cosa
sektor_anag = new Array(
	'Green Hell',			'24',		'',
	'Rubine Nebula',		'23',		'',
	'Tol. Asteroid Field',		'22',		'L',
	'Azure Star Cluster',		'21',		'',
	'Ancient Battlefield',		'20',		'',
	'Dwarf Sun',			'19',		'',
	'Hades System',			'18',		'T',
	'Avalon Sector',		'17',		'SJ',
	'Limes Ater',			'16',		'S',
	'Lotus Flairs',			'15',		'L',
	'Giant Crystals',		'14',		'J',
	'Sandstorm Nebula',		'13',		'S',
	'Crystalin Planet',		'12',		'L',
	'Space Singularity',		'11',		'',
	'Cobalt Rings',			'10',		'',
	'Ancient Alien Rem.',		'9',		'',
	'Mammoth Nebula',		'8',		'',
	'Viking Anomaly',		'7',		'L',
	'Gar. Asteroid Field',		'6',		'',
	'Heero Ma Tahh',		'5',		'T',
	'HQ Teril Tkarr',		'4',		'SBTOJPA',
	'HQ Carminians',		'3',		'SBTOJPA',
	'HQ Djem Al Dhir',		'2',		'SBTOJPA',
	'HQ Atlanticans',		'1',		'SBTOJPA'
);

// ******* funzione conto alla rovescia per inserimento su barra titolo *******
var titolo='#';
var contatore='---';
var app='';
var elemento='';

function ContoRovescia()
{

	try
	{
	if (titolo=='#')
	{
		titolo=document.title;
		elemento = document.getElementById('bx0');
		if (elemento) 
			{
			contatore = elemento.innerHTML;
			document.title=contatore+" - "+titolo;
			app = window.setTimeout(ContoRovescia,100);
			}
		
		}
	else{
		elemento = document.getElementById('bx0');
		if (elemento) 
			{
			contatore = elemento.innerHTML;
			document.title=contatore+" - "+titolo;
			app = window.setTimeout(ContoRovescia,111);
			}
		}
	}
	catch(err)
	{
		clearTimeout(app);
		//alert(err.description);
	}


}


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

 
function find(xpath, xpres)
{
	var ret = document.evaluate(xpath, document, null, xpres, null);
	return  xpres == XPFirst ? ret.singleNodeValue : ret;
}

// ******* Ricerca modificata per restituzione nome settore *******
function RicercaSettore()
{
	var n_settore ="N.D.";
	try {
		var ret = document.evaluate("//a[@href='index.php?mod=sektormap']", document, null, XPFirst, null);
		var hnd_settore = ret.singleNodeValue;
		n_settore = hnd_settore.text;	
	}
	catch (e){
		n_settore="N.D.";
	}
	finally{ 
		return n_settore;
	}
}


function setta_MenuPlus()
{
	setta_ParametroBool("menuplus");
	return true;
}

function setta_MenuMinerali()
{
	setta_ParametroBool("menuminerali");
	return true;
}

function setta_MenuAlleanza()
{
	setta_ParametroBool("menually");
	return true;
}

function setta_ParametroBool(pParametro)
{
	var stato_parametro = false;
	stato_parametro = GM_getValue(pParametro);
	if(stato_parametro)
		{
			GM_setValue(pParametro,false);
		}
	else
		{
			GM_setValue(pParametro,true);
		}
	return true;

}


// ******* Indirizzo *******
var url = window.location.href;

// ******* Preparazione nomi e prezzi: Minerali, Minerali Speciali, Munizioni, Armi, Scudi, Propulsori, Extra *******
var replacements, regex, key, textnodes, node, s;

replacements = {
       "Iron": "Iron (a3 v5 m4)",
       "Duran": "Duran (a11 v22 m18)",
       "Polenium": "Polenium (a19 v35 m28)",
       "Quadrinium": "Quadrinium (a6 v9 m7)",
       "Helenium": "Helenium (a148 v292 m232)",
       "Phosarit": "Phosarit (a60 v107 m90)",
       "Melanit": "Melanit (a95 v163 m133)",
	   "Megatan": "Megatan (max 4.995)",
	   "Querell": "Querell (max 6.300)",
	   "Florisar": "Florisar (max 8.167)",
	   "Warium": "Warium (max 3.132)",
	   "Crysolit": "Crysolit (max 19.863)",
	   "Niciltar": "Niciltar (max 55.782)",
	   "Hypolit": "Hypolit (max 240.723)",
	   "Einsteinium": "Einsteinium (max 612.873)",
"Munitie standard": "Munitie Standard P:1cr",
"Munitie PAP": "Munitie PAP P:1neut",
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

// ******* Dizionario DarkPirates->Italiano ;) *******
//correzioni = {
//	'(Personaggi)': '(Caratteri)',
//	'acceso': 'a',
//	'Hai trovato ancora': 'Devi ancora trovare',
//	'Razziato ancora': 'Devi ancora razziare',
//	'è tuo dovere tenerti informato':'è mio dovere tenerti informato',
//	'pochi Nave da trasporto':'poche Navi da trasporto',
//	'degli ultimi 7 giorni':'delle ultime 12 ore',
//        'allanza':'alleanza',
//        'Informazione salvata.!':'Informazione salvata!',
//        'imposta Hompage':'imposta Homepage',
//        'Statistiche dello scontro':'Statistiche degli scontri',
//        'bannato dal server.;':'bannato dal server.',
//        'rifoernimenti':'rifornimenti'
//};



if ( url.match('mod=') ) 
{
// ******* Preparazione elementi Comuni *******
	var target = find("//div[@id='logo']", XPFirst);
	var target_menu = find("//div[@id='navi-rand']", XPFirst);
	
	//******* Recupero nome settore *******
	var nome_settore=RicercaSettore();

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
	ft =' font-family: arial; font-size: 7pt;';
	fb = ' font-weight: bold;';
	
	//bgc = 'background-color: gray; ';
	bgc = 'background-color: transparent; ';
	
	imga = ' width="16" heigth="16" border="0" align="top"';

// ******* Correzione Traduzioni ******* 
	recor = {};
	for (key in correzioni) 
	{
		recor[key] = new RegExp(key, 'g');
	}
	
	textcorrnodes = document.evaluate(
		"//text()",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < textcorrnodes.snapshotLength; i++) 
	{
		nodec = textcorrnodes.snapshotItem(i);
		s = nodec.data;
		for (key in correzioni) 
		{
		s = s.replace(recor[key], correzioni[key]);
		}
		nodec.data = s;
	}
}


if( !( url.match('mod=login') || url.match('mod=stuff') || url.match('mod=signup') || url.match('mod=logout') ) ) 
{
	var stato_menuplus = false;
	var stato_menually = false;
	var stato_menuminerali = false;

var titolo_menuplus = 'mostrare';
var titolo_menually = 'mostrare';
var titolo_menuminerali = 'mostrare';

var stileMenuAttivo = ' color: #90c1bd;';
var stileMenuDisattivo = ' color: #555e5d;';

var stile_menuplus = stileMenuDisattivo;
var stile_menually = stileMenuDisattivo;
var stile_menuminerali = stileMenuDisattivo;


var swarp="";
var caratteristiche = "";

	stato_menuplus = GM_getValue("menuplus");
	stato_menually = GM_getValue("menually");
	stato_menuminerali = GM_getValue("menuminerali");

	if (stato_menuplus)
		{
		titolo_menuplus = 'nascondere';
		stile_menuplus = stileMenuAttivo;	
		}
	if (stato_menually)
		{
		titolo_menually = 'nascondere';
		stile_menually = stileMenuAttivo;	
		}
	if (stato_menuminerali)
		{
		titolo_menuminerali = 'nascondere';
		stile_menuminerali = stileMenuAttivo;	
		}
	// ******* Gestione Menu Plus *******
	style = 'a.mplus_z{color: #8CA4AE;} a:hover.mplus_z{color: #1BDF23;}';
	style += 'a.mplus_m{color: #8CA4AE;} a:hover.mplus_m{color: #1B99DF;}';
	
	map_style.innerHTML = style;


	menuplus = ''

//******* se nome settore é definito bisogna seguire un comportamento *******
if (nome_settore!="N.D.") 
{


	menuplus = '<div id="klammer-links"><ul><li style="position:relative"><img class="k-links" alt="" src="img/mk-links-klammer.jpg" /><a href="#" title="clicca per '+titolo_menuplus+' MenuPlus" id="menuplus" style="'+stile_menuplus+'">Menu Plus</a></li></ul></div>';

	if (stato_menuplus)
		{
		menuplus += '<div id="heimatwelten"><ul>';

		menuplus += '<form name="formfindenemy" action="index.php?mod=adventure" method="POST"><input type="hidden" name="mission[3]" value="1"></form>';
		menuplus += '<script>function findenemy() { self.document.forms.formfindenemy.submit() }</script>';
	
	//	quando	URL						titolo				classe		testo
		for(i=0;i<m_p.length;i=i+6)
		{
			//******* Inserimento elementi permanenti *******
			if(m_p[i+1] != "" && (m_p[i] == "X" || m_p[i] == "W")) //||m_p[i] == "W" aventuali elementi permanenti in fase warp
			{
				menuplus += '<li><a href="';
				menuplus += m_p[i+1];
				menuplus += '" title="';
				menuplus += m_p[i+2];
				menuplus += '" class="';
				menuplus += m_p[i+3];
				if(m_p[i+5]!="")
				{
					menuplus += '" style="';
					menuplus += m_p[i+5];
				}
				menuplus += '">';
				menuplus += m_p[i+4];
				menuplus += '</a></li>';
			}
		}
		//******* ricerca caratteristiche
		for (j=0;j<sektor_anag.length;j=j+3)
		{
			if(sektor_anag[j]==nome_settore)
			{
				caratteristiche=sektor_anag[j+2];
				j=sektor_anag.length;
			}
		}
	
	//******* Selezione elementi variabili *******
	
		//******* Scorro la stringa e confronto con vettore link *******
		for(k=0;k<caratteristiche.length;k++)
		{
			cosa=caratteristiche.substr(k,1);
			for(i=0;i<m_p.length;i=i+6)
			{
				//******* Inserimento elementi variabili *******
				if(m_p[i+1] != "" && m_p[i] == cosa) 
				{
					menuplus += '<li><a href="';
					menuplus += m_p[i+1];
					menuplus += '" title="';
					menuplus += m_p[i+2];
					menuplus += '" class="';
					menuplus += m_p[i+3];
				if(m_p[i+5]!="")
				{
					menuplus += '" style="';
					menuplus += m_p[i+5];
				}
					menuplus += '">';
					menuplus += m_p[i+4];
					menuplus += '</a></li>';
				}
			}
		}
		menuplus += '</ul></div>';	

	}



	// ******* Gestione Menu Ally *******
	menuplus += '<div id="klammer-rechts"><ul><li style="position:relative;z-index:100"><img class="k-rechts" alt="" src="img/mk-rechts-klammer.jpg" /><a href="#" title="da click pe '+titolo_menually+' Meniul aliantei" id="menually" style="'+stile_menually+'">Meniu alianta</a></li></ul></div>';

	if (stato_menually)
	{
	menuplus += '<div id="navcontainer"><ul>';

	//	quando	URL						titolo				classe		testo
		for(i=0;i<m_a.length;i=i+6)
		{
			//******* Inserimento elementi permanenti *******
			if(m_a[i+1] != "" && m_a[i] == "W") //W = permanente anche in fase Warp
			{
				menuplus += '<li><a href="';
				menuplus += m_a[i+1];
				menuplus += '" title="';
				menuplus += m_a[i+2];
				menuplus += '" class="';
				menuplus += m_a[i+3];
				if(m_a[i+5]!="")
				{
					menuplus += '" style="';
					menuplus += m_a[i+5];
				}
				menuplus += '">';
				menuplus += m_a[i+4];
				menuplus += '</a></li>';
			}
		}
	menuplus += '</ul></div>';	
	}


	// ******* Gestione Menu Minerali *******
	menuplus += '<div id="klammer-links"><ul><li style="position:relative"><img class="k-links" alt="" src="img/mk-links-klammer.jpg" /><a href="#" title="da click pe '+titolo_menuminerali+' Minerale speciale" id="menuminerali" style="'+stile_menuminerali+'">Minerale Speciale</a></li></ul></div>';


	if(stato_menuminerali)//attiva/disattiva menu minerali
	{
	menuplus += '<div id="heimatwelten"><ul>';
		for(i=0;i<minerali.length;i=i+4)
		{
			if(minerali[i+1] != "" && minerali[i] != "") 
			{
				if(minerali[i+3]=="X" || caratteristiche.search(minerali[i+3])>-1)
				{
				menuplus += '<li><a href="';
				menuplus += minerali[i+1];
				menuplus += '" title="';
				menuplus += minerali[i+2];
				menuplus += '" class="mplus_z">';
				menuplus += minerali[i];
				menuplus += '</a></li>';
				}
			}
		}
	menuplus += '</ul></div>';
	}


	// ******* Gestione Menu Info *******
	menuplus += '<div id="klammer-rechts"><ul><li style="position:relative"><img class="k-rechts" alt="" src="img/mk-rechts-klammer.jpg" /><a href="#" title="Informatii despre Bog script" id="menuinfo" style="'+stileMenuAttivo+'">Info</a></li></ul></div>';
	
	menuplus += '<div id="navcontainer2"><ul>';

	//	quando	URL						titolo				classe		testo
	for(i=0;i<m_i.length;i=i+6)
		{
			//******* Inserimento elementi permanenti *******
			if(m_i[i+1] != "" && (m_i[i] == "X" || m_i[i] == "W")) //||m_i[i] == "W" eventuali elementi permanenti in fase warp
			{
				menuplus += '<li><a href="';
				menuplus += m_i[i+1];
				menuplus += '" title="';
				menuplus += m_i[i+2];
				menuplus += '" class="';
				menuplus += m_i[i+3];
				if(m_i[i+5]!="")
				{
					menuplus += '" style="';
					menuplus += m_i[i+5];
				}
				menuplus += '" target="_blank">';
				menuplus += m_i[i+4];
				menuplus += '</a></li>';
			}
		}


	menuplus += '</ul></div>';
}
else
	{
		//******* Nome Settore non definito Gestione Fase Warp *******
	menuplus = '<div id="klammer-links"><ul><li style="position:relative"><img class="k-links" alt="" src="img/mk-links-klammer.jpg" /><a href="#" title="clicca per '+titolo_menuplus+' MenuPlus" id="menuplus" style="'+stile_menuplus+'">Menu Plus</a></li></ul></div>';

/* //non vi sono elementi permanenti, ma nel caso ci fossero e' già implementato
		if (stato_menuplus)
		{
			menuplus += '<div id="heimatwelten"><ul>';
			for(i=0;i<m_p.length;i=i+6){
				//******* Inserimento elementi permanenti *******
				if(m_p[i+1] != "" && m_p[i] == "W") {
					menuplus += '<li><a href="';
					menuplus += m_p[i+1];
					menuplus += '" title="';
					menuplus += m_p[i+2];
					menuplus += '" class="';
					menuplus += m_p[i+3];
					if(m_p[i+5]!=""){
						menuplus += '" style="';
						menuplus += m_p[i+5];
					}
					menuplus += '">';
					menuplus += m_p[i+4];
					menuplus += '</a></li>';
				}
			}
			menuplus += '</ul></div>';	
		}	

*/
	
		// ******* Gestione Menu Ally *******
		menuplus += '<div id="klammer-rechts"><ul><li style="position:relative;z-index:100"><img class="k-rechts" alt="" src="img/mk-rechts-klammer.jpg" /><a href="#" title="Click pe '+titolo_menually+' Meniul aliantei" id="menually" style="'+stile_menually+'">Meniul aliantei</a></li></ul></div>';
		
		if (stato_menually)
		{
			menuplus += '<div id="navcontainer"><ul>';
			for(i=0;i<m_a.length;i=i+6){
				//******* Inserimento elementi permanenti *******
				if(m_a[i+1] != "" && m_a[i] == "W") {
					menuplus += '<li><a href="';
					menuplus += m_a[i+1];
					menuplus += '" title="';
					menuplus += m_a[i+2];
					menuplus += '" class="';
					menuplus += m_a[i+3];
					if(m_a[i+5]!=""){
						menuplus += '" style="';
						menuplus += m_a[i+5];
					}
					menuplus += '">';
					menuplus += m_a[i+4];
					menuplus += '</a></li>';
				}
			}
			menuplus += '</ul></div>';	
		}	

		// ******* Gestione Menu Minerali *******
		menuplus += '<div id="klammer-links"><ul><li style="position:relative"><img class="k-links" alt="" src="img/mk-links-klammer.jpg" /><a href="#" title="Click pe '+titolo_menuminerali+' Minerale speciale" id="menuminerali" style="'+stile_menuminerali+'">Minerale Speciale</a></li></ul></div>';

		if(stato_menuminerali)//attiva/disattiva menu minerali
		{		
	
			menuplus += '<div id="heimatwelten"><ul>';
	
			for(k=0;k<sektor_anag.length;k=k+3)
			{
				swarp='warp='+sektor_anag[k+1];
				if (url.match( swarp ) ) 
				{
					caratteristiche=sektor_anag[k+2];
						for(i=0;i<minerali.length;i=i+4)
						{
							if(minerali[i+1] != "" && minerali[i] != "")
							{
								if(minerali[i+3]=="X" || caratteristiche.search(minerali[i+3])>-1)
								{
								menuplus += '<li><a href="';
								menuplus += minerali[i+1];
								menuplus += '" title="';
								menuplus += minerali[i+2];
								menuplus += '" class="mplus_z">';
								menuplus += minerali[i];
								menuplus += '</a></li>';
								}
							}
						}
	
				k=sektor_anag.length;
				}
			}
	
			menuplus += '</ul></div>';
		}//	if(stato_menuminerali)

		// ******* Gestione Menu Info *******
		menuplus += '<div id="klammer-rechts"><ul><li style="position:relative"><img class="k-rechts" alt="" src="img/mk-rechts-klammer.jpg" /><a href="#" title="Info" id="menuinfo" style="'+stileMenuAttivo+'">Info</a></li></ul></div>';

		menuplus += '<div id="navcontainer2"><ul>';
		//	quando	URL						titolo				classe		testo
			for(i=0;i<m_i.length;i=i+6)
			{
				//******* Inserimento elementi permanenti *******
				if(m_i[i+1] != "" && m_i[i] == "W") //||"W"= fase warp
				{
					menuplus += '<li><a href="';
					menuplus += m_i[i+1];
					menuplus += '" title="';
					menuplus += m_i[i+2];
					menuplus += '" class="';
					menuplus += m_i[i+3];
					if(m_i[i+5]!="")
					{
						menuplus += '" style="';
						menuplus += m_i[i+5];
					}
					menuplus += '" target="_blank">';
					menuplus += m_i[i+4];
					menuplus += '</a></li>';
				}
			}
		menuplus += '</ul></div>';

	}



map_menuplus.innerHTML = menuplus;

target_menu.appendChild(map_style);
target_menu.appendChild(map_menuplus);

var objMenuPlus = document.getElementById("menuplus");
var objMenuAlly = document.getElementById("menually");
var objMenuMinerali = document.getElementById("menuminerali");

objMenuPlus.addEventListener("click", setta_MenuPlus, true);
objMenuAlly.addEventListener("click", setta_MenuAlleanza, true);
objMenuMinerali.addEventListener("click", setta_MenuMinerali, true);
}//if( !( url.match('mod=login' .....

// ******* Mappa *******
if(url.match('mod=map')) {
	caption  = '<p style="'+ft+bgc+pa+'width: 70px; left: 167px; top: 290px;' +zlivello+fquartgen+'">Atlanticans</p>';
	caption += '<p style="'+ft+bgc+pa+'width: 80px; left: 557px; top: 290px;' +zlivello+fquartgen+'">Djem Al Dhir</p>';
	caption += '<p style="'+ft+bgc+pa+'width: 70px; left: 167px; top: 637px;' +zlivello+fquartgen+'">Carminians</p>';
	caption += '<p style="'+ft+bgc+pa+'width: 70px; left: 557px; top: 637px;' +zlivello+fquartgen+'">Teril Tkarr</p>';

	caption += '<p style="'+ft+bgc+pa+'width: 90px; left: 237px; top: 216px;' +zlivello+fnormale+ '">Heero Ma Tahh</p>';
	caption += '<p style="'+ft+bgc+pa+'width: 140px; left: 465px; top: 216px;'+zlivello+fnormale+ '">Gargantos Asteroid Field</p>';

	caption += '<p style="'+ft+bgc+pa+'width: 90px; left: 270px; top: 326px;' +zlivello+flab+     '">Viking Anomaly</p>';

	caption += '<p style="'+ft+bgc+pa+'width: 100px; left: 440px; top: 326px;'+zlivello+fnormale+ '">Mammoth Nebula</p>';
	caption += '<p style="'+ft+bgc+pa+'width: 140px; left: 63px; top: 364px;' +zlivello+fnormale+ '">Ancient Alien Remmants</p>';
	caption += '<p style="'+ft+bgc+pa+'width: 80px; left: 625px; top: 364px;' +zlivello+fnormale+ '">Cobalt Rings</p>';
	caption += '<p style="'+ft+bgc+pa+'width: 100px; left: 200px; top: 400px;'+zlivello+fnormale+ '">Space Singularity</p>';

	caption += '<p style="'+ft+bgc+pa+'width: 100px; left: 515px; top: 400px;'+zlivello+flab+     '">Crystalin Planet</p>';

	caption += '<p style="'+ft+bgc+pa+'width: 110px; left: 295px; top: 428px;'+zlivello+fmercato+ '">SandStorm Nebula</p>';

	caption += '<p style="'+ft+bgc+pa+'width: 125px; left: 395px; top: 428px;'+zlivello+fnormale+ '">Giant Crystals of Djefhar</p>';


	caption += '<p style="'+ft+bgc+pa+'width: 70px; left: 305px; top: 497px;' +zlivello+flab+     '">Lotus Flairs</p>';

	caption += '<p style="'+ft+bgc+pa+'width: 70px; left: 419px; top: 497px;' +zlivello+fmercato+ '">Limes Ater</p>';
	caption += '<p style="'+ft+bgc+pa+'width: 80px; left: 200px; top: 525px;' +zlivello+fmercato+ '">Avalon Sector</p>';

	caption += '<p style="'+ft+bgc+pa+'width: 90px; left: 515px; top: 525px;' +zlivello+fnormale+ '">Hades System</p>';
	caption += '<p style="'+ft+bgc+pa+'width: 60px; left: 90px; top: 562px;' +zlivello+fnormale+ '">Dwarf Sun</p>';
	caption += '<p style="'+ft+bgc+pa+'width: 110px; left: 625px; top: 562px;'+zlivello+fnormale+ '">Ancient Battlefield</p>';
	caption += '<p style="'+ft+bgc+pa+'width: 110px; left: 270px; top: 599px;'+zlivello+fnormale+ '">Azure Star Cluster</p>';

	caption += '<p style="'+ft+bgc+pa+'width: 130px; left: 440px; top: 599px;'+zlivello+flab+     '">Tolgay Asteroid Field</p>';

	caption += '<p style="'+ft+bgc+pa+'width: 90px; left: 237px; top: 710px;' +zlivello+fnormale+ '">Rubine Nebula</p>';
	caption += '<p style="'+ft+bgc+pa+'width: 70px; left: 475px; top: 710px;' +zlivello+fnormale+ '">Green Hell</p>';
	
	legend =  '<p style="'+ft+bgc+pa+'width: 110px; left: 355px; top: 700px;'+zlivello+flegenda+   '">Legenda:</p>';
	legend += '<p style="'+ft+bgc+pa+'width: 110px; left: 360px; top: 715px;'+zlivello+fnormale+   '">Normal</p>';
	legend += '<p style="'+ft+bgc+pa+'width: 110px; left: 360px; top: 730px;'+zlivello+flab+       '">Laborator</p>';
	legend += '<p style="'+ft+bgc+pa+'width: 110px; left: 360px; top: 745px;'+zlivello+fmercato+   '">Piata</p>';
	legend += '<p style="'+ft+bgc+pa+'width: 110px; left: 360px; top: 760px;'+zlivello+fquartgen+  '">Quartier Generale</p>';
	legend += '<p style="'+ft+bgc+pa+'width: 110px; left: 360px; top: 775px;'+zlivello+fnominerali+'">Piata de Minerale</p>';	
	

	minerals =  '<span style="'+ft+bgc+pa+'width: 140px; left: 35px; top: 460px;' +zlivello+flegenda+'">Minerali Spec.:</span>';

	minerals += '<span style="'+ft+bgc+pa+'width: 140px; left: 40px; top: 475px;' +zlivello+'"><img src="img/item/6_8k.gif"' +imga+'><span style="'+pr+fminerali+fb+'">Megatan</span> <span style="'+pr+fnormale+' left: 37px;">4.995</span></span>';

	minerals += '<span style="'+ft+bgc+pa+'width: 140px; left: 40px; top: 490px;' +zlivello+'"><img src="img/item/6_9k.gif"' +imga+'><span style="'+pr+fminerali+fb+'">Querell</span> <span style="'+pr+fnormale+' left: 42px;">6.300</span></span>';

	minerals += '<span style="'+ft+bgc+pa+'width: 140px; left: 40px; top: 505px;' +zlivello+'"><img src="img/item/6_10k.gif"'+imga+'><span style="'+pr+fminerali+fb+'">Florisar</span> <span style="'+pr+fnormale+' left: 39px;">8.167</span></span>';

	minerals += '<span style="'+ft+bgc+pa+'width: 140px; left: 40px; top: 520px;' +zlivello+'"><img src="img/item/6_11k.gif"'+imga+'><span style="'+pr+fminerali+fb+'">Warium</span> <span style="'+pr+fnormale+' left: 39px;">3.132</span></span>';


	minerals += '<span style="'+ft+bgc+pa+'width: 140px; left: 605px; top: 460px;'+zlivello+flegenda+'">Minerali Spec.:</span>';

	minerals += '<span style="'+ft+bgc+pa+'width: 140px; left: 610px; top: 475px;'+zlivello+'"><img src="img/item/6_12k.gif"'+imga+'><span style="'+pr+fminerali+fb+'">Crysolit</span> <span style="'+pr+fnormale+' left: 33px;">19.863</span></span>';

	minerals += '<span style="'+ft+bgc+pa+'width: 140px; left: 610px; top: 490px;'+zlivello+'"><img src="img/item/6_13k.gif"'+imga+'><span style="'+pr+fminerali+fb+'">Niciltar</span> <span style="'+pr+fnormale+' left: 36px;">55.782</span></span>';

	minerals += '<span style="'+ft+bgc+pa+'width: 140px; left: 610px; top: 505px;'+zlivello+'"><img src="img/item/6_14k.gif"'+imga+'><span style="'+pr+fminerali+fb+'">Hypolium</span> <span style="'+pr+fnormale+' left: 37px;">240.723</span></span>';

	minerals += '<span style="'+ft+bgc+pa+'width: 140px; left: 610px; top: 520px;'+zlivello+'"><img src="img/item/6_15k.gif"'+imga+'><span style="'+pr+fminerali+fb+'">Einsteinium</span> <span style="'+pr+fnormale+' left: 18px;">612.873</span></span>';


	nominerals =  '<span style="'+ft+bgc+pa+'width: 70px; left: 170px; top: 700px;'+zlivello+'"><img src="img/item/6_1k.gif"'+imga+'><span style="'+pr+fnominerali+'">Iron</span></span>';
	
	nominerals += '<span style="'+ft+bgc+pa+'width: 70px; left: 560px; top: 700px;'+zlivello+'"><img src="img/item/6_7k.gif"'+imga+'><span style="'+pr+fnominerali+'">Melanit</span></span>';

	nominerals += '<span style="'+ft+bgc+pa+'width: 70px; left: 170px; top: 353px;'+zlivello+'"><img src="img/item/6_6k.gif"'+imga+'><span style="'+pr+fnominerali+'">Phosarit</span></span>';

	nominerals += '<span style="'+ft+bgc+pa+'width: 70px; left: 560px; top: 353px;'+zlivello+'"><img src="img/item/6_5k.gif"'+imga+'><span style="'+pr+fnominerali+'">Helenium</span></span>';

	
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


// ******* Lancio Timer per conto alla rovescia su barra titolo *******
ContoRovescia();
