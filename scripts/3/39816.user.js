// ==UserScript==
// @name Liens explicites pour HFR
// @version 0.0.1
// @namespace http://blabla.info
// @description Insère un texte explicite dans les liens à la place de celui créé automatiquement par le forum
// @include http://forum.hardware.fr/*
// @exclude http://forum.hardware.fr/message.php*
// ==/UserScript==

/* ====================== Listes de cats et souscats ======================== */

var id2nomcat = {
 1 : "Hardware",
 2 : "Overclocking",
 3 : "Video & Son",
16 : "Périphériques",
15 : "PC Portables",
23 : "Mobiles",
14 : "Photo Numérique",
 5 : "Jeux Video",
 4 : "Windows",
22 : "Réseaux Perso",
21 : "Réseaux Pro",
11 : "OS Alternatifs",
10 : "Programmation",
12 : "Graphisme",
 6 : "Achats & Ventes",
 8 : "Emploi & Études",
 9 : "SETI",
13 : "Discussions"
};

var id2cat = {
 1 : "Hardware",
 2 : "OverclockingCoolingTuning",
 3 : "VideoSon",
16 : "HardwarePeripheriques",
15 : "OrdinateursPortables",
23 : "gsmgpspda",
14 : "Photonumerique",
 5 : "JeuxVideo",
 4 : "WindowsSoftware",
22 : "reseauxpersosoho",
21 : "systemereseauxpro",
11 : "OSAlternatifs",
10 : "Programmation",
12 : "Graphisme",
 6 : "AchatsVentes",
 8 : "EmploiEtudes",
 9 : "Setietprojetsdistribues",
13 : "Discussions"
};
 
var id2subcat = {
// Hardware
108 : "CPU-Mobo-Ram",
466 : "Boitiers-alims",
109 : "2D-3D",
110 : "HDD",
467 : "CD-DVD",
507 : "minipc",
252 : "Benchs",
253 : "Materiels-problemes-divers",
481 : "conseilsachats",

// Hardware - Periphs
451 : "Ecrans",
452 : "Imprimantes",
453 : "Scanners",
462 : "Webcams",
454 : "Claviers-Souris",
455 : "Joys",
456 : "Divers",

// Ordis portables
448 : "portables",
512 : "Ultraportables",
516 : "Transportables",
520 : "Netbooks",
511 : "Mac",
515 : "Composants",
517 : "Accessoires",
513 : "Conseils-d-achat",
479 : "SAV",

// Technos mobiles
509 : "GPS",
510 : "GSM",
508 : "PDA",
514 : "SAV",

// Overclocking & co
458 : "CPU",
119 : "GPU",
117 : "Air-Cooling",
118 : "Water-Xtreme-Cooling",
400 : "Silence",
461 : "Tuning",
120 : "Mod-elec",
121 : "Divers-8",

// Video & Son
130 : "HiFi-HomeCinema",
129 : "Materiel",
131 : "Traitement-Audio",
134 : "Traitement-Video",

// Photo numérique
442 : "Appareils",
519 : "Objectifs",
443 : "Accessoires",
444 : "Photos",
445 : "Technique",
446 : "Logiciels-Retouche",
447 : "Argentique",
476 : "Concours",
478 : "Galerie-Perso",
457 : "Divers-7",

// JV
249 : "PC",
250 : "Consoles",
251 : "Achat-Ventes",
412 : "Teams-LAN",
413 : "Tips-Depannage",

// Windows et software
504 : "Win-9x-Me",
406 : "Windows",
505 : "Vista",
437 : "Securite",
506 : "Virus-Spywares",
435 : "Stockage-Sauvegarde",
407 : "Logiciels",
438 : "Tutoriels",

// Réseaux grand public / SoHo
496 : "FAI",
503 : "Reseaux",
497 : "Routage-et-securite",
498 : "WiFi-et-CPL",
499 : "Hebergement",
500 : "Tel-TV-sur-IP",
501 : "Chat-visio-et-voix",
502 : "Tutoriels",

// Systèmes & Réseaux Pro
485 : "Connectivite",
486 : "Commutation",
487 : "Reseaux-L4",
488 : "Securite",
489 : "Telecom",
490 : "Operateurs-hebergeurs",
491 : "OS-et-Annuaires",
492 : "Stockage-et-sauvegarde",
495 : "Materiel",
493 : "Progiciels",
494 : "Tutoriels",

// OSA
209 : "Codes-scripts",
205 : "Debats",
420 : "Divers-2",
472 : "Hardware-2",
204 : "Installation",
208 : "Logiciels-2",
207 : "Multimedia",
206 : "reseaux-securite",

// Prog
388 : "Divers-6",
381 : "ADA",
382 : "Algo",
518 : "API-Win32",
384 : "ASM",
383 : "ASP",
385 : "BiblioLinks",
440 : "C",
386 : "C-2",
405 : "CNET-managed",
391 : "Delphi-Pascal",
473 : "Flash-ActionScript",
389 : "HTML-CSS-Javascript",
390 : "Java",
484 : "Langages-fonctionnels",
468 : "PDA",
392 : "Perl",
393 : "PHP",
394 : "Python",
483 : "Ruby",
395 : "SGBD-SQL",
404 : "Shell-Batch",
396 : "VB-VBA-VBS",
439 : "XML-XSL",

// Graphisme
475 : "Cours",
469 : "Galerie-Perso-2",
227 : "Infographie-2D",
470 : "PAO-Desktop-Publishing",
228 : "Infographie-3D",
402 : "Webdesign",
441 : "Arts-traditionnels",
229 : "Concours-2",
230 : "Ressources",
231 : "Divers-5",

// HA/V
169 : "Hardware",
170 : "Softs-livres",
171 : "Photo-Audio-Video",
173 : "Telephonie",
174 : "Divers-4",
398 : "Avis-estimations",
416 : "Feedback",
399: "Regles-coutumes",

// E & E
233 : "Marche-emploi",
235 : "Etudes-Orientation",
234 : "Annonces-emplois",
464 : "Feedback-entreprises",
465 : "Aide-devoirs",

// Seti
477 : "BOINC",
184 : "SETI",
185 : "projets-distribues",
401 : "Divers-3",

// Discu
422 : "Actualite",
482 : "politique",
423 : "Societe",
424 : "Cinema",
425 : "Musique",
426 : "Arts-Lecture",
427 : "TV-Radio",
428 : "Sciences",
429 : "Sante",
430 : "Sports",
431 : "Auto-Moto",
433 : "Cuisine",
434 : "Loisirs",
432 : "Viepratique"
};

var id2nomsubcat = {
	// Hardware 
	108 : "CPU,Mobo,Ram",
	466 : "Boitiers & Alims",
	109 : "2D-3D",
	110 : "HDD",
	467 : "CD-DVD",
	507 : "Mini PC",
	252 : "Benchs",
	253 : "Matériels & problèmes divers",
	481 : "Conseils d'achats",

	// Hardware - Periphs
	451 : "Écrans",
	452 : "Imprimantes",
	453 : "Scanners",
	462 : "Webcams",
	454 : "Claviers & Souris",
	455 : "Joysticks",
	456 : "Divers",

	// Ordis portables
	448 : "Portables",
	512 : "Ultraportables",
	516 : "Transportables",
	520 : "Netbooks",
	511 : "Mac",
	515 : "Composants",
	517 : "Accessoires",
	513 : "Conseils d'achat",
	479 : "SAV",

	// Technos mobiles
	509 : "GPS",
	510 : "GSM",
	508 : "PDA",
	514 : "SAV",

	// Overclocking & co
	458 : "CPU",
	119 : "GPU",
	117 : "Air Cooling",
	118 : "Water & Xtreme Cooling",
	400 : "Silence",
	461 : "Tuning",
	120 : "Mod élec",
	121 : "Divers",

	// Video & Son
	130 : "HiFi & Home Cinéma",
	129 : "Matériel",
	131 : "Traitement Audio",
	134 : "Traitement Vidéo",

	// Photo numérique
	442 : "Appareils",
	519 : "Objectifs",
	443 : "Accessoires",
	444 : "Photos",
	445 : "Technique",
	446 : "Logiciels & Retouche",
	447 : "Argentique",
	476 : "Concours",
	478 : "Galeries Perso",
	457 : "Divers",

	// JV
	249 : "PC", 
	250 : "Consoles",
	251 : "Achat & Ventes",
	412 : "Teams & LAN",
	413 : "Tips & Dépannage",

	// Windows et software
	504 : "9x/Me",
	406 : "NT/2K/XP",
	505 : "Vista",
	437 : "Sécurité",
	506 : "Virus & Spywares",
	435 : "Stockage & Sauvegarde",
	407 : "Logiciels",
	438 : "Tutoriels",

	// Réseaux grand public / SoHo
	496 : "FAI",
	503 : "Réseaux",
	497 : "Routage & Sécurité",
	498 : "WiFi & CPL",
	499 : "Hébergement",
	500 : "Tel, TV sur IP",
	501 : "Chat, Visio & Voix",
	502 : "Tutoriels",

	//	Systèmes & Réseaux Pro
	485 : "Connectivité",
	486 : "Commutation",
	487 : "Réseaux > L4",
	488 : "Sécurité",
	489 : "Télécom",
	490 : "Opérateurs & Hébergeurs",
	491 : "OS/Annuaires",
	492 : "Stockage & Sauvegarde",
	495 : "Matériel",
	493 : "Progiciels",
	494 : "Tutoriels",

	// OSA
	209 : "Codes et scripts",
	205 : "Débats",
	420 : "Divers",
	472 : "Hardware",
	204 : "Installation",
	208 : "Logiciels",
	207 : "Multimédia",
	206 : "Réseaux & Sécurité",

	// Prog
	388 : "Divers",
	381 : "ADA",
	382 : "Algo",
	518 : "API Win32",
	384 : "ASM",
	383 : "ASP",
	385 : "Biblio Links",
	440 : "C",
	386 : "C++",
	405 : "C#/.NET managed",
	391 : "Delphi/Pascal",
	473 : "Flash/ActionScript",
	389 : "HTML/CSS/Javascript",
	390 : "Java",
	484 : "Langages fonctionnels",
	468 : "PDA",
	392 : "Perl",
	393 : "PHP",
	394 : "Python",
	483 : "Ruby/Rails",
	395 : "SQL & SGBD",
	404 : "Shell/Batch",
	396 : "VB/VBA/VBS",
	439 : "XML/XSL",

	// Graphisme
	475 : "Cours",
	469 : "Galeries Perso",
	227 : "Infographie 2D",
	470 : "PAO & Desktop Publishing",
	228 : "Infographie 3D",
	402 : "Webdesign",
	441 : "Arts traditionnels",
	229 : "Concours",
	230 : "Ressources",
	231 : "Divers",

	// HA/V
	169 : "Hardware",
	170 : "Softs & Livres",
	171 : "Photo, Audio, Vidéo",
	173 : "Téléphonie",
	174 : "Divers",
	398 : "Avis & Estims",
	416 : "Feedback",
	399 : "Règles & Coutumes",

	// E & E
	233 : "Marché de l'emploi",
	235 : "Études & Orientation",
	234 : "Annonces d'emplois",
	464 : "Feedback sur les entreprises",
	465 : "Aide aux devoirs",

	// Seti
	477 : "BOINC",
	184 : "SETI",
	185 : "Autres Projets distribués",
	401 : "Divers",

	// Discu
	422 : "Actualité",
	482 : "Politique",
	423 : "Société",
	424 : "Cinéma",
	425 : "Musique",
	426 : "Arts & Lecture",
	427 : "TV & Radio",
	428 : "Sciences",
	429 : "Santé",
	430 : "Sports",
	431 : "Auto/Moto",
	433 : "Cuisine",
	434 : "Loisirs",
	432 : "Vie Pratique",
};


/* ================================= Main ================================== */

var tmp= new Date();
var currentURL = parseHFR(document.URL);
var root = document.getElementById('mesdiscussions');
var liens = 
 getElementByXpath('.//table//td[@class="messCase2"]//a[@class="cLink"][not(ancestor::span[@class="signature"])][not(parent::div[@class="edited"])]', root); 


boucleliens: for ( var i=0 ; i<liens.length; i++) {
	var lien = liens[i];

	if	(lien.hostname == "forum.hardware.fr") {
		//lien.style.backgroundColor = "pink";
		if (!testText(lien)) continue;
	
		var linkURL = parseHFR(lien.href);
		if (linkURL.type == "!topic") continue;
		
		// Gestion des liens intratopic
		if	(linkURL.topic == currentURL.topic ) {
			if (linkURL.type == "search") {
				lien.innerHTML = 'Recherche dans ce topic sur le mot "'
					+ linkURL.mot + '"';
				continue;
			} 
			else if (linkURL.type == "psearch") {
				lien.innerHTML = 'Recherche dans ce topic sur le pseudo "'
					+ linkURL.pseudo + '"';
				continue;
			}

 			if (linkURL.type == "native" || linkURL.type == "rewrite") {
				if (linkURL.page == currentURL.page) 
					lien.innerHTML = "Lien intratopic sur cette page";
				else	lien.innerHTML = "Lien intratopic vers la page " + linkURL.page;
			}
		}

		// Liens intertopics
		else {
			switch (linkURL.type) {
				case "rewrite":	
					lien.innerHTML ='Topic "' +linkURL.nomtopic+ '", page ' +linkURL.page;
					break;

				case "native":
					lien.innerHTML = 
						"Lien intertopics (cat " + id2nomcat[linkURL.cat] + 
						(linkURL.souscat ? " / " + id2nomsubcat[linkURL.souscat] : "") +
						"), page " + linkURL.page;
					break;

				case "search":
					lien.innerHTML = 'Recherche intertopic (cat '+ id2nomcat[linkURL.cat]
						+ (linkURL.souscat ? " / " + id2nomsubcat[linkURL.souscat] : "") +
						') sur le mot "' + linkURL.mot + '"';
					continue boucleliens;

				case "psearch":
					lien.innerHTML = 'Recherche intertopic (cat '+ id2nomcat[linkURL.cat]
						+ (linkURL.souscat ? " / " + id2nomsubcat[linkURL.souscat] : "") +
						') sur le pseudo "' + linkURL.pseudo + '"';
					continue boucleliens;

				case "liste":
					lien.innerHTML = 'Liste de sujets (cat '+ id2nomcat[linkURL.cat]
						+ (linkURL.souscat ? " / " + id2nomsubcat[linkURL.souscat] : "") +
						')';
					continue boucleliens;
			}

			lien.setAttribute('rewriteUrl', linkURL.rewrite);
			lien.setAttribute('rewritePage', linkURL.page);
			lien.addEventListener('mouseover', 
					function(event)	 { 
						this.style.textDecoration = "overline underline";
						
						if ($id('fetchtitle')) return;
						cancel = false;
						
						this.setAttribute('id',"fetchtitle");
						url = this.getAttribute('rewriteUrl');
						page = this.getAttribute('rewritePage')

						setTimeout( 
							function() {
								el = $id('fetchtitle');
								el.removeAttribute('id');
																if (cancel) {cancel = false; GM_log("Action cancelled ["+url+"]");return};
								GM_log("Fetching "+ url);
								toyoAjaxLib.loadDoc(url, "GET", null, 
									// Fonction qui recupere le titre du topic
									function (pageContent) {
										el.innerHTML = 'Topic "' +
											pageContent.match(/<head><title>(.*?) (?:- [^-]+)+ - FORUM HardWare.fr<\/title>/).pop() 
											+'", page ' + page;
										}
									);
							}
							, 1000);

					} 
					, false);

			lien.addEventListener( 'mouseout',
					function(event) {
						this.style.textDecoration = "none";
						cancel = true;},
					false );
				}
		}	 
	
}

var tmp2 =new Date();
GM_log( liens.length +" liens en " + (tmp2.getTime()-tmp.getTime()) + " ms, ");


/* ========================= Fonctions auxiliaires ========================== */

// Processes HFR URLs (uses parseURI), returns an object with props:
// type -> "native" or "rewrite" or "liste" or "search" or "psearch" or "!topic"
// cat -> int															page -> int		 
// souscat -> int (if avail)							topic -> int
function parseHFR(str) {
 var parsed = parseUri (str);

 if (parsed.host != "forum.hardware.fr" || parsed.protocol != "http") 
	{	 parsed.type = "!topic"; return parsed; }
 
 if (parsed.file == "forum2.php") {
	 if ( (parsed.cat = parsed.queryKey.cat) != undefined &&
				(parsed.topic = parsed.queryKey.post) != undefined 
			) {
			if (parsed.queryKey.subcat)
				parsed.souscat = parsed.queryKey.subcat;
			parsed.page = parsed.queryKey.page ?	parsed.queryKey.page : 1; 
			parsed.rewrite = "http://forum.hardware.fr/hfr/" + id2cat[parsed.cat] + 
				 (parsed.souscat ? "/" + id2subcat[parsed.souscat] : "") + 
				"/sujet_" + parsed.topic + "_" + parsed.page + ".htm" + 
				(parsed.anchor ? "#" + parsed.anchor : "") ;
			if (parsed.queryKey.word) {
				parsed.type = "search";
				parsed.mot = parsed.queryKey.word;
			}
			else	if (parsed.queryKey.spseudo) {
				parsed.type = "psearch";
				parsed.pseudo = parsed.queryKey.spseudo.replace(/\+/g," ");
			}
			else
			parsed.type = "native";
	 }
	 else
		 { parsed.type = "!topic"; 
			//GM_log("Caught weird forum2.php URL: "+str);
			}
 }
 else { 
	 try {
		 var dir = parsed.directory.match(/^\/hfr\/(\w+)\/(([\w-]+)\/)?$/);
			//logObj(dir);
		 parsed.cat = indexObj(id2cat, dir[1]);
		if (dir.length == 4) 
			parsed.souscat = indexObj(id2subcat, dir[3]);
	
		 var topic = parsed.file.match(/^([\w-]*)[_-]sujet[_-]([0-9]+)(_([0-9]+))?.htm$/);
		 parsed.nomtopic = topic[1].replace(/-/g," ");
		 parsed.topic = topic[2];
		if (topic.length == 5)
			parsed.page = topic[4];
		else
			parsed.page = 1;
		parsed.rewrite = parsed.source;
		parsed.type = parsed.topic == 1 ? "liste" :"rewrite";
	 } catch (e) {
		 parsed.type = "!topic";	
		 //GM_log("Caught weird.htm URL: "+str);
	 }
 } 

// GM_log("parseHFR : parsed " + str);
// GM_log("parseHFR : as " + parsed.type +"|"+ parsed.cat +"|"+ parsed.souscat
// + "|" + parsed.topic + "|"+ parsed.page+" => "+parsed.rewrite);

 return parsed;
}

// Tests if the text in a link has been autofilled
function testText (el) {
	try {
		var link = el.href.replace(/&/g,"&amp;");	 // the url
		var bouts = el.innerHTML.split(" [...] "); // the 2 parts of the link text
		if (	(link.indexOf(bouts[0]) == 0) &&
					(link.indexOf(bouts[1]) + bouts[1].length == link.length ) &&
					(bouts.length == 2) )
			return true;
	} catch (e) {}

	return false;
}

/* parseUri 1.2.1 (c) 2007 Steven Levithan <stevenlevithan.com> */
function parseUri (str) {
 var	o = {
 strictMode:true,
 key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
 q: {
	 name:	 "queryKey",
	 parser: /(?:^|&)([^&=]*)=?([^&]*)/g
	 },
 parser: {
	 strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
	 loose:	 /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
 }
 };
 
 var	m		= o.parser[o.strictMode ? "strict" : "loose"].exec(str),
	 uri = {},
	 i	 = 14;

 while (i--) uri[o.key[i]] = m[i] || "";

 uri[o.q.name] = {};
 uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
	 if ($1) uri[o.q.name][$1] = $2;
 });

 return uri;
};

// Returns the property in object o containing str (if any)
function indexObj(o,str){
for ( var prop in o )
 {if (o[prop] == str) return prop; }
return null;
}

function logObj(o) {
 for ( var prop in o ) GM_log(prop + " => " + o[prop]);
}

function getElementByXpath(path, element) {
	var arr = Array();
 	var xpr = document.evaluate(path, 
					 	element, 
					 	null, 
					 	XPathResult.UNORDERED_NODE_ITERATOR_TYPE, 
					 	null);

 	for (;item = xpr.iterateNext();) arr.push(item);
 	return arr;
}

function $id (s_id) { return document.getElementById(s_id) };


/* ============================= Librairie Ajax ============================= */
var toyoAjaxLib = (function() {

		// Private members
		function loadPage(url, method, arguments, responseHandler) {
			var req;
			method = method.toUpperCase();
			if (method == 'GET' && arguments != null) url += '?' + arguments;

			// branch for native XMLHttpRequest object
			if (window.XMLHttpRequest) {
	req = new XMLHttpRequest();
	req.onreadystatechange = processReqChange(req, responseHandler);
	req.open(method, url, true);
	if (method == 'POST') 
		req.setRequestHeader("Content-Type", 
						 "application/x-www-form-urlencoded");
	arguments = method == 'POST' ? arguments : null;
	req.send(arguments);
			}

			// branch for IE/Windows ActiveX version
			else if (window.ActiveXObject) {
	req = new ActiveXObject("Microsoft.XMLHTTP");
	if (req) {
		req.onreadystatechange = processReqChange(req, responseHandler);
		req.open(method, url, true);
		if (method == 'POST') 
			req.setRequestHeader("Content-Type", 
				 "application/x-www-form-urlencoded");
		if (method == 'POST') req.send(arguments);
		else	req.send();
	}
			}
		}

		function processReqChange(req, responseHandler) {
			return function () {
				try {
					// only if req shows "loaded"
					if (req.readyState == 4) {
						// only if "OK"
						if (req.status == 200) {
							var content = req.responseXML != null && 
							req.responseXML.documentElement != null	 ? 
							req.responseXML.documentElement : req.responseText;
							if (responseHandler != null) responseHandler(content);
						}
						else {
							alert("There was a problem retrieving the XML data:\n" +
							req.statusText);
						}
					}
				}
				catch(e){}
				}
		}

		// Public members
		return {
			"loadDoc" : 
				function(url, method, arguments, responseHandler) {
					try {
						loadPage(url, method, arguments, responseHandler);
					}
					catch(e) {
						var msg = (typeof e == "string") ?	
							e : ((e.message) ? e.message : "Unknown Error");
						alert("Unable to get data:\n" + msg);
						return;
					}
				}
		};
	
})();




