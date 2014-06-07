//The following is 99% written by Dan°. I have simply taken what he has and made (what I think are) a few improvements to the script... let me know what you think!

// ==UserScript==
// @name          CS Profile Informer+
// @author        Daniele Binaghi / Dan° (http://userscripts.org/users/126144)
// @upgradesby    leafsfan85 (http://userscripts.org/users/151396)
// @version       1.3
// @releasedate   18/04/2010
// @copyright     Released under the GPL license (http://www.gnu.org/copyleft/gpl.html)
// @description   Fixes neutral references and provides statistics on CouchSurfing members' profile with some upgrades to the orignal
// @include       http://www.couchsurfing.org/profile*
// @include       http://www.couchsurfing.org/people*
// @include       http://www.couchsurfing.org/mapsurf*
// @include       https://www.couchsurfing.com/profile*
// @include       https://www.couchsurfing.com/people*
// @include       https://www.couchsurfing.com/mapsurf*
// ==/UserScript==
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script for Firefox web-browser!
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "CS Profile Informer", and click Uninstall.
//
// To activate/deactivate tool functions, go to menu Tools/GreaseMonkey/
// User script commands
//
// --------------------------------------------------------------------
// Ideas, hints and help for this script (and hence, many thanks to):
// * Reference Stats (http://userscripts.org/scripts/show/38652), by Carlos Martin
// * Neutral References (http://userscripts.org/scripts/show/38618), by Carlos Martin
// * Enhanced CouchSurfing (http://userscripts.org/scripts/show/64779), by starstuffharvestingstarlight
// * various coding, by Daniele Ferro (http://www.couchsurfing.org/people/magikozio)
// * Spanish language localization, by Damian Maseda (http://www.couchsurfing.org/people/sandman76/)
// * German language localization, by Matthias Haldimann (http://www.couchsurfing.org/profile.html?id=2CF4CQP)
// * French language localization, by Boris Morel (http://www.couchsurfing.org/profile.html?id=3QGOYUF)
// * Version checker, by Arxleol (http://www.axino.net/tutorial/2009/11/how-to-write-script-updater-for-greasemonkey-scripts)
//
// See http://userscripts.org/scripts/show/66264 and http://userscripts.org/scripts/show/74597 for instructions.
// Please help me improve this tool, reporting any comment/bug/suggestion 
// through the forementioned webpage!
// Thanks.


// VARIABLES SECTION
var ref_tot = 0;
var hosted = 0;
var surfed_with = 0;
var hosted_surfed_with = 0;
var traveled_with = 0;
var met_in_person = 0;
var not_met_in_person = 0;
var refmutual = 0;
var refpos = 0;
var refpos_received = 0;
var refpos_left = 0;
var refneg = 0;
var refneg_received = 0;
var refneg_left = 0;
var refneg_percent = 0;
var refinap = 0;
var refinap_received = 0;
var refinap_left = 0;
var refneu = 0;
var refneu_received = 0;
var refneu_left = 0;
var days_surfed = 0;
var days_hosted = 0;
var days_traveled = 0;
var header;
var iconbox;
var language;
var div_classname;
var div_html;
var hospitalityPercentage = 0;
var friends_tot = 0;
var friends_reftot = 0;
var mutualcheck_matchingtot = 0;
var d_ref;
var d_ref_c;
var d_ref_ps;
var refIsLastSection = false;
var s_ScriptTitle = 'CS Profile Informer';
var visitedcountries = [];
var visitedcountries_num = 0;
var lds = 1.1;
lds = lds.toLocaleString().substring(1, 2); // Extracts Local Decimal Separator
// end of VARIABLES SECTION


// FUNCTIONS SECTIONS
// Gets DOM previous sibling, ignoring texts and blanks
// Hints on http://v3.thewatchmakerproject.com/journal/329/finding-html-elements-using-javascript-nextsibling-and-previoussibling
function getPreviousSibling(n) {
	do n = n.previousSibling;
	while (n && n.nodeType != 1);
	return n;
}

// Filters out duplicates from array
// Copied from http://www.martienus.com/code/javascript-remove-duplicates-from-array.html
function unique_array(a) {
	if (a.length > 1) {
		a.sort();
		for (var i = 1; i < a.length;) {
			if (a[i-1] == a[i]){
				a.splice(i, 1);
			} else{
				i++;
			}
		}
	}
	return a;
}

// Checks whether a newer version of the script is available 
function checkScriptVersion(version, msg) {
	var tmp = new Date().getTime(); // Obtains time in milliseconds 
	var tm = GM_getValue('tcv', 0); // Obtains value when last check was performed, default value is 0
	var risultato;
	if (tm == 0) { // Checks whether check was performed before
		GM_setValue('tcv', parseInt(tmp/1000)); // If check was not performed this means that user just installed latest version of script, and we therefore save time in seconds when check was performed
		GM_setValue('icon', 'actual');
	} else {
		if (tmp/1000 - parseInt(tm) >= 3600) { // This part checks whether check was performed in last hour. Value is in seconds.
			GM_setValue('tcv', parseInt(tmp/1000)); // Now we save time so that it was checked for new version.
         // This part connects to userscripts meta site and checks values for your script
			GM_xmlhttpRequest({
				method: 'GET',
			   url: 'http://userscripts.org/scripts/source/74597.meta.js', // Here you will change number 74597 to number of your script
			   headers: {
			   	'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			      'Accept': 'application/html,application/xml,text/xml',
			   },
			   onload: function(responseDetails) {
 			   	var text = responseDetails.responseText; // We obtain contents of the site
					if (text.match("version[ \t]+([0-9\.]*)")) {
						vers = RegExp.$1;
						if (version != vers) { // Check whether a new version is available
			         	alert(msg);
							GM_setValue('icon', 'new');
	 			    	} else {
							GM_setValue('icon', 'actual');
						}
					}
 			   }
			});		
 		}
 	}
}

function cleanPercentage(number) {
	number = number.toFixed(1);
	if (parseInt(number) == number) {
		// Deletes useless .00 in percentages
		number = parseInt(number);
	} else {
		if (lds != '.') {
			// Changes decimal separator
			number = number.replace(/\./g, lds);
		}
	}
	return number;
}
// end of FUNCTIONS SECTIONS


// HANDLERS SECTION
// Retrieving header handler
d_ref = document.getElementsByTagName('h1');
for (var i = 0; i < d_ref.length; i++) {
	if (d_ref[i].getAttribute('class') == 'profile') {
   	// Handler to the title
		header = d_ref[i].parentNode;
		break;
	} 
}

// Retrieving ICONBOX handler
d_ref = document.getElementsByTagName('div');
for (var i = 0; i < d_ref.length; i++) {
	if (d_ref[i].getAttribute('class') == 'iconbox') {
   	// Handler to the iconbox
		iconbox = d_ref[i];
		break;
	} 
}
// end of HANDLERS SECTION


// LANGUAGES SECTION
// Determining language
d_ref = document.getElementById('fire_lang_menu');
if (d_ref != '') {
	if (d_ref.innerHTML == 'Lingua: Italiano') {
		language = 'it-IT';
	} else if (d_ref.innerHTML == 'Language: English' || d_ref.innerHTML == 'Language: Language') {
		language = 'en-GB';
	} else if (d_ref.innerHTML == 'Idioma: Español') {
		language = 'es-ES';
	} else if (d_ref.innerHTML == 'Sprache: Deutsch') {
		language = 'de-DE';
	} else if (d_ref.innerHTML == 'Langue: Français') {
		language = 'fr-FR';
	}
}
// Checks in case there's any problem with the language cookie
// and page language is back default English
if (document.getElementById('couchinfo').innerHTML == 'Couch Information') {
	language = 'en-GB';
}

// Setting locale
switch (language) {
	case 'it-IT':
		s_RE_From = '</div><strong>Da '; // reg exp to be searched for
		s_RE_To = '</div><strong>A '; // reg exp to be searched for
		s_RE_Inappropriate = 'Questa referenza non è appropriata.<br'; // reg exp to be searched for
		s_RE_Positive = '>Positiva<'; // reg exp to be searched for
		s_RE_Negative = '>Negativa<'; // reg exp to be searched for
		s_RE_LivedIn = 'HO VISSUTO:'; // reg exp to be searched for
		s_RE_WantsToGo = 'VORREI VISITARE:'; // reg exp to be searched for
		s_RE_IsGoingTo = 'IN PARTENZA PER:'; // reg exp to be searched for
		s_DivTitle1 = 'Statistiche su ';	
		s_DivTitle2 = ' referenze';	
		s_Hosted = 'Ospitato';
		s_Surfed = 'Visitato';
		s_Total = 'Totale';
		s_Positives = 'Referenze positive';
		s_Neutral = 'Neutrale';
		s_Neutrals = 'Referenze neutrali';
		s_Negatives = 'Referenze negative';
		s_Inappropriates = 'Referenze inappropriate';			
		s_Left = 'Lasciate';
		s_Received = 'Ricevute';
		s_Days = 'giorni';
		s_ShortLeft = 'L';
		s_ShortReceived = 'R';
		s_ShortDays = 'g';
		s_RefMutual = 'Contraccambiate'; 
		s_RefLeft = 'Solo lasciate';
		s_RefReceived = 'Solo ricevute';
		s_Traveled = 'Viaggiato assieme';
		s_MetInPerson = 'Incontrate';
		s_NotMetInPerson = 'Conosciute online';
		s_CustomRatio = 'Rapporto personalizzato';
		s_ActivateCustomRatio = 'Attiva rapporto personalizzato';
		s_DeactivateCustomRatio = 'Disattiva rapporto personalizzato';
		s_ActivateNeutralFix = 'Attiva correzione referenze neutrali';
		s_DeactivateNeutralFix = 'Disattiva correzione referenze neutrali';
		s_ActivateLVTcounting = 'Attiva conteggio lingue e nazioni visitate';
		s_DeactivateLVTcounting = 'Disattiva conteggio lingue e nazioni visitate';
		s_GraphLTitle = 'Grafico referenze lasciate';
		s_GraphRTitle = 'Grafico referenze ricevute';
		s_LinkTitle = 'Come modificare il rapporto personalizzato'; 
		s_Languages = 'Lingue conosciute';
		s_Countries = 'Paesi visitati';
		s_NewerVersion = 'Una nuova versione dello script CS Profile Informer è disponibile!';
		s_Short_NewerVersion = 'Nuova versione disponibile';
		s_HospitalityPercentage = "<span title='Percentuale delle persone incontrate come ospite o ospitante'>Esperienze d'ospitalità</span>";
		s_RefReliability = "<span title='Basata sulla corrispondenza delle referenze contraccambiate'>Affidabilità referenze</span>";
		break;
	case 'en-GB':
		s_RE_From = '</div><strong>From '; // reg exp to be searched for
		s_RE_To = '</div><strong>For '; // reg exp to be searched for
		s_RE_Inappropriate = 'This reference is not appropriate.<br'; // reg exp to be searched for
		s_RE_Positive = '>Positive<'; // reg exp to be searched for
		s_RE_Negative = '>Negative<'; // reg exp to be searched for
		s_RE_LivedIn = 'LIVED:'; // reg exp to be searched for
		s_RE_WantsToGo = 'WANTS TO GO:'; // reg exp to be searched for
		s_RE_IsGoingTo = 'IS GOING TO:'; // reg exp to be searched for
		s_DivTitle1 = 'Statistics on ';	
		s_DivTitle2 = ' references';	
		s_Hosted = 'Hosted';
		s_Surfed = 'Surfed';
		s_Total = 'Total';
		s_Positives = 'Positive References';
		s_Neutral = 'Neutral';
		s_Neutrals = 'Neutral References';
		s_Negatives = '*NO NEGATIVE REFERENCES*';
		s_Negatives1 = 'NEGATIVE REFERENCES';
		s_Trustworthy = 'This user is probably trustworthy (at least 8 positive references with no negatives)';
		s_Inappropriates = 'Inappropriate References';			
		s_Left = 'Left';
		s_Received = 'Received';
		s_Days = 'days';
		s_ShortLeft = 'L';
		s_ShortReceived = 'R';
		s_ShortDays = 'd';
		s_RefMutual = 'Mutual'; 
		s_RefLeft = 'Left only';
		s_RefReceived = 'Received only';
		s_Traveled = 'Traveled with';
		s_MetInPerson = 'Met in person';
		s_NotMetInPerson = 'Met online';
		s_CustomRatio = 'Custom ratio';
		s_ActivateCustomRatio = 'Activate custom ratio';
		s_DeactivateCustomRatio = 'Deactivate custom ratio';
		s_ActivateNeutralFix = 'Activate neutral references fix';
		s_DeactivateNeutralFix = 'Deactivate neutral references fix';
		s_ActivateLVTcounting = 'Activate languages and visited coutries counting';
		s_DeactivateLVTcounting = 'Deactivate languages and visited coutries counting';
		s_GraphLTitle = 'Left references graph';
		s_GraphRTitle = 'Received references graph';
		s_LinkTitle = 'How to edit custom ratio'; 
		s_Languages = 'Known languages';
		s_Countries = 'Visited countries';
		s_NewerVersion = 'A newer version of the CS Profile Informer script is available!';
		s_Short_NewerVersion = 'Newer version available';
		s_HospitalityPercentage = "<span title='Percentage of people met because of hosting or surfing'>Hospitality Experiences</span>";
		s_RefReliability = "<span title='Based on matching of mutual references' hosting, surfing and travelling experiences'>References Reliability</span>";
		break;
	case 'es-ES':
		s_RE_From = '</div><strong>De '; // reg exp to be searched for
		s_RE_To = '</div><strong>Para '; // reg exp to be searched for
		s_RE_Inappropriate = 'Esta referencia no es apropiada.<br'; // reg exp to be searched for
		s_RE_Positive = '>Positivo/a<'; // reg exp to be searched for
		s_RE_Negative = '>Negativo/a<'; // reg exp to be searched for
		s_RE_LivedIn = 'HA VIVIDO EN:'; // reg exp to be searched for
		s_RE_WantsToGo = 'QUIERE IR A:'; // reg exp to be searched for
		s_RE_IsGoingTo = 'VA A VIAJAR A:'; // reg exp to be searched for
		s_DivTitle1 = 'Estadísticas sobre ';	
		s_DivTitle2 = ' referencias';	
		s_Hosted = 'Hospedado';
		s_Surfed = 'Surfeado';
		s_Total = 'Total';
		s_Positives = 'Referencias positivas';
		s_Neutral = 'Neutral';
		s_Neutrals = 'Referencias neutrales';
		s_Negatives = 'Referencias negativas';
		s_Inappropriates = 'Referencias inapropiadas';			
		s_Left = 'Dejadas';
		s_Received = 'Recibidas';
		s_Days = 'dias';
		s_ShortLeft = 'D';
		s_ShortReceived = 'R';
		s_ShortDays = 'd';
		s_RefMutual = 'Reciprocadas'; 
		s_RefLeft = 'Solamente dejadas';
		s_RefReceived = 'Solamente recibidas';
		s_Traveled = 'Viajado con';
		s_MetInPerson = 'Encontradas';
		s_NotMetInPerson = 'Conocidas online';
		s_CustomRatio = 'Reporte personalizado';
		s_ActivateCustomRatio = 'Attiva rapporto personalizzato';
		s_DeactivateCustomRatio = 'Disattiva rapporto personalizzato';
		s_ActivateNeutralFix = 'Activar arreglo de referencias neutrales';
		s_DeactivateNeutralFix = 'Desactivar arreglo de referencias neutrales';
		s_ActivateLVTcounting = 'Activar cuenta de lenguajes y países visitadose';
		s_DeactivateLVTcounting = 'Desactivar cuenta de lenguajes y países visitados';
		s_GraphLTitle = 'Gráfico de referencias dejadas';
		s_GraphRTitle = 'Gráfico de referencias recibidas';
		s_LinkTitle = 'Como editar el reporte personalizado'; 
		s_Languages = 'Lenguajes conocidos';
		s_Countries = 'Paises visitados';
		s_NewerVersion = '¡Una nueva versión de lo script CS Profile Informer está disponible!';
		s_Short_NewerVersion = 'Nueva versión disponible';
		s_HospitalityPercentage = "<span title='Porcentaje de personas encontradas a través de hospedaje o surfeo'>Experiencias de hospitalidad</span>";
		s_RefReliability = "<span title='Basado en referencias mutuas coincidentes de hospedaje, surfeo y experiencias de viaje'>Fiabilidad de las referencias</span>";
		break;
	case 'de-DE':
		s_RE_From = '</div><strong>Von '; // reg exp to be searched for
		s_RE_To = '</div><strong>Für '; // reg exp to be searched for
		s_RE_Inappropriate = 'Diese Referenz ist nicht angemessen.'; // reg exp to be searched for
		s_RE_Positive = '>Positiv<'; // reg exp to be searched for
		s_RE_Negative = '>Negativ<'; // reg exp to be searched for
		s_RE_LivedIn = 'LEBTE IN:'; // reg exp to be searched for
		s_RE_WantsToGo = 'MÖCHTE REISEN NACH:'; // reg exp to be searched for
		s_RE_IsGoingTo = 'REIST BALD NACH:'; // reg exp to be searched for
		s_DivTitle1 = 'Statistik der ';	
		s_DivTitle2 = '-Referenzen';	
		s_Hosted = 'Beherbergt';
		s_Surfed = 'Übernachtet';
		s_Total = 'Summe';
		s_Positives = 'Positive Referenzen';
		s_Neutral = 'Neutral';
		s_Neutrals = 'Neutrale Referenzen';
		s_Negatives = 'Negative Referenzen';
		s_Inappropriates = 'Unangemessene Referenzen';
		s_Left = 'Geschrieben';
		s_Received = 'Erhalten';
		s_Days = 'tag';
		s_ShortLeft = 'g';
		s_ShortReceived = 'e';
		s_ShortDays = 't';
		s_RefMutual = 'Erwidert';
		s_RefLeft = "Nur geschrieben";
		s_RefReceived = "Nur erhalten";
		s_Traveled = 'Gereist';
		s_MetInPerson = 'Persl. getroffen';
		s_NotMetInPerson = 'Online getroffen';
		s_CustomRatio = 'Benutzerdefinierte Statistik';
		s_ActivateCustomRatio = 'Benutzerdefiniertes Statistik ein';
		s_DeactivateCustomRatio = 'Benutzerdefiniertes Statistik aus';
		s_ActivateNeutralFix = 'Neutrale Referenzen zeigen ein';
		s_DeactivateNeutralFix = 'Neutrale Referenzen zeigen aus';
		s_ActivateLVTcounting = 'Zähler Sprachen und bereiste Länder ein';
		s_DeactivateLVTcounting = ' Zähler Sprachen und bereiste Länder aus';
		s_GraphLTitle = 'Grafik geschriebene Referenzen';
		s_GraphRTitle = 'Grafik erhaltene Referenzen';
		s_LinkTitle = 'Benutzerdefinierte Statistik bearbeiten';
		s_Languages = 'Spricht folgende Sprachen';
		s_Countries = 'Bereiste Länder';
		s_NewerVersion = 'Eine neue Version von CS Profile Informer ist verfügbar!';
		s_Short_NewerVersion = 'Neue version verfügbar';
		s_HospitalityPercentage = "<span title='Prozentsatz der beim Hosten oder Surfen kennengelernten Menschen'>Erfahrungen von Gastfreundschaft</span>";
		s_RefReliability = "<span title='Auf Übereinstimmung der Host-, Surf- und Reiseerfahrung auf gegenseitigen Referenzen basierend'>Reliabilität der Referenzen</span>";
		break;
	case 'fr-FR':
		s_RE_From = '</div><strong>De '; // reg exp to be searched for
		s_RE_To = '</div><strong>A '; // reg exp to be searched for
		s_RE_Inappropriate = 'Cette eCSpérience n\'est pas appropriée.' // reg exp to be searched for
		s_RE_Positive = '>Positive<'; // reg exp to be searched for
		s_RE_Negative = '>Négative<'; // reg exp to be searched for
		s_RE_LivedIn = 'Pays où j\'ai vécu :'; // reg exp to be searched for
		s_RE_WantsToGo = 'Pays que je souhaite explorer :'; // reg exp to be searched for
		s_RE_IsGoingTo = 'Pays où je vais prochainement :'; // reg exp to be searched for
		s_DivTitle1 = 'Statistiques sur ';	
		s_DivTitle2 = ' références';	
		s_Hosted = 'Hébergé';
		s_Surfed = 'Surfé';
		s_Total = 'Total';
		s_Positives = 'ECSpériences positives';
		s_Neutral = 'Neutre';
		s_Neutrals = 'ECSpériences neutres';
		s_Negatives = 'ECSpériences négatives';
		s_Inappropriates = 'ECSpériences inappropriées';
		s_Left = 'Laissées';
		s_Received = 'Reçues';
		s_Days = 'jours';
		s_ShortLeft = 'L';
		s_ShortReceived = 'R';
		s_ShortDays = 'j';
		s_RefMutual = "Réciproques";
		s_RefLeft = "Laissées uniquement";
		s_RefReceived = "Reçues uniquement";
		s_Traveled = 'Voyagé avec';
		s_MetInPerson = 'Rencontrées en personne';
		s_NotMetInPerson = 'Rencontrées sur internet';
		s_CustomRatio = 'Ratio personnalisé';
		s_ActivateCustomRatio = 'Activer le ratio personnalisé';
		s_DeactivateCustomRatio = 'Désactiver le ratio personnalisé';
		s_ActivateNeutralFix = 'Activer la réparation des eCSpériences neutres';
		s_DeactivateNeutralFix = 'Désactiver la réparation des eCSpériences neutres';
		s_ActivateLVTcounting = 'Activer les compteurs de langages et de pays visités';
		s_DeactivateLVTcounting = 'Désactiver les compteurs de langages et de pays visités';
		s_GraphLTitle = 'Graphe des eCSpériences laissées';
		s_GraphRTitle = 'Graphe des eCSpériences reçues';
		s_LinkTitle = 'Comment modifier le ratio personnalisé';
		s_Languages = "Nombre de langues parlées";
		s_Countries = "Nombre de pays visités";
		s_NewerVersion = 'Une nouvelle version du script CS Profile Informer est disponible!';
		s_Short_NewerVersion = 'Nouvelle version disponible';
		s_HospitalityPercentage = "<span title='Pourcentage de personnes rencontrées en les hébergeant ou en surfant chez elles'>Expérience de l'hospitalité</span>";
		s_RefReliability = "<span title='Basé sur le recoupement d’expériences d’hébergement, de surf ou de voyage dans des références mutuelles'>Fiabilité des références</span>";
		break;
	default: // using English, but harder to search with regular expressions 
		s_RE_From = ' class="userlink"';
		s_RE_To = '';
		s_RE_Inappropriate = '<p style="color: red;">';
		s_RE_Positive = '<div style="color: green; font-weight: bold;">';
		s_RE_Negative = '<div style="color: red; font-weight: bold;">';
		s_RE_LivedIn = ''; // reg exp to be searched for
		s_RE_WantsToGo = ''; // reg exp to be searched for
		s_RE_IsGoingTo = ''; // reg exp to be searched for
		s_DivTitle1 = 'Statistics on ';	
		s_DivTitle2 = ' references';	
		s_Hosted = 'Hosted';
		s_Surfed = 'Surfed';
		s_Total = 'Total';
		s_Positives = 'Positive References';
		s_Neutral = 'Neutral';
		s_Neutrals = 'Neutral references';
		s_Negatives = '*NO NEGATIVE REFERENCES*';
		s_Negatives1 = 'NEGATIVE REFERENCES';
		s_Trustworthy = 'This user is probably trustworthy (at least 8 positive references with no negatives)';
		s_Inappropriates = 'Inappropriate References';			
		s_Left = 'Left';
		s_Received = 'Received';
		s_Days = 'days';
		s_ShortLeft = 'L';
		s_ShortReceived = 'R';
		s_ShortDays = 'd';
		s_RefMutual = 'Mutual'; 
		s_RefLeft = 'Left only';
		s_RefReceived = 'Received only';
		s_Traveled = 'Travelled with';
		s_MetInPerson = 'Met in person';
		s_NotMetInPerson = 'Met online';
		s_CustomRatio = 'Custom ratio';
		s_ActivateCustomRatio = 'Activate custom ratio';
		s_DeactivateCustomRatio = 'Deactivate custom ratio';
		s_ActivateNeutralFix = 'Activate neutral references fix';
		s_DeactivateNeutralFix = 'Deactivate neutral references fix';
		s_ActivateDoubleGraph = 'Show double graph';
		s_DeactivateDoubleGraph = 'Show single graph';
		s_ActivateLVTcounting = 'Activate languages and visited coutries counting';
		s_DeactivateLVTcounting = 'Deactivate languages and visited coutries counting';
		s_GraphLTitle = 'Left references graph';
		s_GraphRTitle = 'Received references graph';
		s_LinkTitle = 'How to edit custom ratio'; 
		s_Languages = 'Known languages';
		s_Countries = 'Visited countries';
		s_NewerVersion = 'A newer version of the CS Profile Informer script is available!';
		s_Short_NewerVersion = 'Newer version available';
		s_HospitalityPercentage = "<span title='Percentage of people met because of hosting or surfing'>Hospitality Experiences</span>";
		s_RefReliability = "<span title='Based on matching of mutual references'>References Reliability</span>";
		break;
}
// end of LANGUAGES SECTION


// NEWER SCRIPT VERSION SECTION
// Compares current script version to check for updates
checkScriptVersion('1.4',s_NewerVersion);
if (GM_getValue('icon') == 'actual') {
	s_Colophon = "<a href='http://userscripts.org/scripts/show/74597' title='info' target='_blank'><img src='http://s3.amazonaws.com/uso_ss/5523/medium.png?1264513113' alt='info' border='0' width='16px' height='16px' style='position: absolute; bottom:5px; right:5px; z-index:1'></a>"; 
} else {
	s_Colophon = "<a href='http://userscripts.org/scripts/show/74597' title='" + s_NewerVersion + "' target='_blank'><img src='http://s3.amazonaws.com/uso_ss/5524/medium.png?1264513137' alt='" + s_NewerVersion + "' border='0' width='16px' height='16px' style='position: absolute; bottom:5px; right:5px; z-index:1'></a>"; 
}


// STATISTICS SECTION
// Counting languages
d_ref = document.getElementsByTagName('UL');
for (var i = 0; i < d_ref.length; i++) {
	if (d_ref[i].getAttribute('class') == 'languages') {
		var languages = d_ref[i].innerHTML.toLowerCase().split('<li>');
		var languages_num = languages.length - 1;
	}
}

// Counting visited countries
// Considering just TRAVELED and LIVED IN, and assuming that their total
// is the right number + 1 (since for stats sake we don't want to consider
// country you've been born as a foreign visited country)
if (s_RE_WantsToGo != '') {
	var str = document.getElementsByTagName('STRONG');
	var node_comparison;
	var docmp = false;
	var doexist_livedin = false;
	var s_RE_Country = "/statistics.html\?country_name=(.+?)";
	for (var j = 0; j < str.length; j++) {
		if (!doexist_livedin && str[j].innerHTML.indexOf(s_RE_LivedIn) > -1) {
	   	doexist_livedin = true;
	  	} else if (str[j].innerHTML.indexOf(s_RE_IsGoingTo) > -1) {
	   	node_comparison = str[j];
	    	docmp = true;
	    	break;
	  	}
	  	if (str[j].innerHTML.indexOf(s_RE_WantsToGo) > -1) {
	   	node_comparison = str[j];
	    	docmp = true;
	    	break;
	  	}
	}
	d_ref = document.getElementsByTagName('A');
	for (var i = 0; i < d_ref.length; i++) {
	  if (d_ref[i].href.match(/statistics.html\?country_name=(.+)/g)) {
	    if (docmp) {
	    	if (d_ref[i].compareDocumentPosition(node_comparison) & node_comparison.DOCUMENT_POSITION_PRECEDING) break;
	    }
	    visitedcountries.push(RegExp.$1);
	  }
	}
	if (visitedcountries.length > 0) {
		visitedcountries = unique_array(visitedcountries);
		visitedcountries_num = visitedcountries.length;
	}
}

// Retrieving friends total
var str = document.getElementById('friends');
if (str.innerHTML.match(/(.+) \(([0-9]+)\)/)) {
	var s_FriendsLabel = RegExp.$1;
	friends_tot = RegExp.$2*1;
}

// Browsing references
var s_RE_Hosted = /<img src=['"]\/images\/icon_hosted.gif['"] alt=['"].+?(&nbsp;|\s)([0-9]+)(&nbsp;|\s).+?['"] [^>]+>/i;
var s_RE_Surfed = /<img src=['"]\/images\/icon_surfed_with.gif['"] alt=['"].+?(&nbsp;|\s)([0-9]+)(&nbsp;|\s).+?['"] [^>]+>/i;
var s_RE_Traveled = /<img src=['\"]\/images\/icon_traveled_with.gif['"] alt=['"].+?(&nbsp;|\s)([0-9]+)(&nbsp;|\s).+?['"] [^>]+>/i;
var s_RE_FriendLink = /<img src=['"]\/images\/links\/[0-9].gif['"]/i;
var references_section;

d_ref = document.getElementsByTagName('DIV');

for (var i = 0; i < d_ref.length; i++) {
	d_ref_c = d_ref[i];
	div_classname = d_ref_c.getAttribute('class');
	
	if (!references_section && div_classname == 'reference_count') {
		// Found references section - to avoid fake references
		references_section = true;
		div_referencessection = d_ref_c;
	}
	
	if (references_section) {
		div_html = d_ref_c.innerHTML;
	   if (div_classname == 'reference_from_to_box') {
			// Increase the mutual references counter
			refmutual++;
		} else if (div_classname == "reference_from" || div_classname == "reference_to" || div_classname == "refnotIRL") {
			// Searches for references without description and add 'neutral' tag
			if (div_html.match(/(&nbsp;|\s)<p>/i)) { 
				d_ref_c.innerHTML = div_html.replace (/(&nbsp;|\s)<p>/gi,"<div style='color:black;font-weight:bold;'>" + s_Neutral + "</div><p>");
			}
					
			// Increases the references total counter
			ref_tot++;  
	
	      // Checks if node is in the last references section, where CS bug gives wrong answers
	      if (!refIsLastSection && (div_classname == "reference_from" || div_classname == "refnotIRL")) {
				d_ref_ps = getPreviousSibling(d_ref_c);
				if (d_ref_ps != null && d_ref_ps.nodeName == 'H2') {
					refIsLastSection = true;
				}
			}
			
			// Relevance
	      var refLeft = false;
			if (div_html.indexOf(s_RE_Positive) > -1) {
				if (div_classname == "reference_from") {
					if (refIsLastSection) {
						refpos_left++;
						refLeft = true;
					} else {
						refpos_received++;
					}
				} else if (div_classname == "reference_to") {
					refpos_left++;
					refLeft = true;
				} else if (div_classname == "refnotIRL") {
					if (div_html.indexOf(s_RE_From) > -1) {
						if (refIsLastSection) {
							refpos_left++;
							refLeft = true;
						} else {
							refpos_received++;
						}
					} else if (div_html.indexOf(s_RE_To) > -1) {
						refpos_left++;
						refLeft = true;
					}
				}
				refpos++;
			} else if (div_html.indexOf(s_RE_Negative) > -1) {
				if (div_classname == "reference_from") {
					if (refIsLastSection) {
						refneg_left++;
						refLeft = true;
					} else {
						refneg_received++;
					}
				} else if (div_classname == "reference_to") {
					refneg_left++;
					refLeft = true;
				} else if (div_classname == "refnotIRL") {
					if (div_html.indexOf(s_RE_From) > -1) {
						if (refIsLastSection) {
							refneg_left++;
							refLeft = true;
						} else {
							refneg_received++;
						}
					} else if (div_html.indexOf(s_RE_To) > -1) {
						refneg_left++;
						refLeft = true;
					}
				}
				refneg++;
			} else if (div_html.indexOf(s_RE_Inappropriate) > -1) {
				if (div_classname == "reference_from") {
					if (refIsLastSection) {
						refinap_left++;
						refLeft = true;
					} else {
						refinap_received++;
					}
				} else if (div_classname == "reference_to") {
					refinap_left++;
					refLeft = true;
				} else if (div_classname == "refnotIRL") {
					if (div_html.indexOf(s_RE_From) > -1) {
						if (refIsLastSection) {
							refinap_left++;
							refLeft = true;
						} else {
							refinap_received++;
						}
					} else if (div_html.indexOf(s_RE_To) > -1) {
						refinap_left++;
						refLeft = true;
					}
				}			
				refinap++;
			} else {
				if (div_classname == "reference_from") {
					if (refIsLastSection) {
						refneu_left++;
						refLeft = true;
					} else {
						refneu_received++;
					}
				} else if (div_classname == "reference_to") {
					refneu_left++;
					refLeft = true;
				} else if (div_classname == "refnotIRL") {
					if (div_html.indexOf(s_RE_From) > -1) {
						if (refIsLastSection) {
							refneu_left++;
							refLeft = true;
						} else {
							refneu_received++;
						}
					} else if (div_html.indexOf(s_RE_To) > -1) {
						refneu_left++;
						refLeft = true;
					}
				}
				refneu++;
			}

			// As for days stats, only references left by the profile's owner count,
			// except for "received only" references, where we trust the author;
			// besides, in these last, surfed and hosted are swapped, to be correctly accounted for
			var parentdiv_class = d_ref_c.parentNode.getAttribute('class');
			var already_counted = false;
			var mutualcheck_matchingref = false;
			if ((parentdiv_class == 'reference_from_to_box' && refLeft) || parentdiv_class != 'reference_from_to_box') {
		   	if (parentdiv_class == 'reference_from_to_box' && refLeft) {
					mutualcheck_matchingref = true;
				}
				// surfed with icon
				if (div_html.match(s_RE_Surfed)) {
					if (refLeft) {
						surfed_with++;
						days_surfed = days_surfed + RegExp.$2*1;
						if (parentdiv_class == 'reference_from_to_box' && mutualcheck_surfeddays != RegExp.$2*1) {
							mutualcheck_matchingref = false;
						}
					} else {
						hosted++;
						days_hosted = days_hosted + RegExp.$2*1;
					}
					already_counted = true;
					hosted_surfed_with++;
				} else if (mutualcheck_surfeddays > 0 && refLeft) {
					mutualcheck_matchingref = false;
				}
				// hosted icon
				if (div_html.match(s_RE_Hosted)) {
					if (refLeft) {
						hosted++;
						days_hosted = days_hosted + RegExp.$2*1;
						if (parentdiv_class == 'reference_from_to_box' && mutualcheck_hosteddays != RegExp.$2*1) {
							mutualcheck_matchingref = false;
						}
					} else {
						surfed_with++;
						days_surfed = days_surfed + RegExp.$2*1;
					}
					if (!already_counted) {
						hosted_surfed_with++;
					}
				} else if (mutualcheck_hosteddays > 0 && refLeft) {
					mutualcheck_matchingref = false;
				}
				// traveled with icon
		      if (div_html.match(s_RE_Traveled)) {
					traveled_with++;
					days_traveled = days_traveled + RegExp.$2*1;
					if (parentdiv_class == 'reference_from_to_box' && mutualcheck_traveleddays != RegExp.$2*1) {
						mutualcheck_matchingref = false;
					}
				} else if (mutualcheck_traveleddays > 0 && refLeft) {
					mutualcheck_matchingref = false;
				}
				if (mutualcheck_matchingref == true) {
					mutualcheck_matchingtot++;
				}
				// met in person/online icon
				if (div_classname != "refnotIRL") {
					met_in_person++;
				} else {
					not_met_in_person++;
				}
				if (div_html.match(s_RE_FriendLink)) {
					friends_reftot++;
				}
		   } else if (parentdiv_class == 'reference_from_to_box') {
		   	// ref received in reciprocated references couple
				var mutualcheck_hosteddays = 0;
				var mutualcheck_surfeddays = 0;
				var mutualcheck_traveleddays = 0;
				if (div_html.match(s_RE_Surfed)) {
					mutualcheck_hosteddays = RegExp.$2*1;
				}
				if (div_html.match(s_RE_Hosted)) {
					mutualcheck_surfeddays = RegExp.$2*1;
				}
				if (div_html.match(s_RE_Traveled)) {
					mutualcheck_traveleddays = RegExp.$2*1;
				}
			}
		}
	}
}

var ref_mutualandonly_tot = ref_tot - refmutual;
if (ref_mutualandonly_tot > 0) {
	hospitalityPercentage = hosted_surfed_with * 100 / ref_mutualandonly_tot;
}
var ref_left_tot = refpos_left + refneu_left + refneg_left + refinap_left;
var ref_received_tot = refpos_received + refneu_received + refneg_received + refinap_received;
if (ref_received_tot > 0) {
	refneg_percent = refneg_received * 100 / ref_received_tot;
}
// end of STATISTICS SECTION


// OUTPUT SECTION
// Preparing additional text
var txt = "<div style='border: 1px solid #AAAAAA; background-color:#FCFABB; padding: 5px; font-size: smaller; width: 630px; margin-bottom: 10px; position: relative'>" + s_Colophon;
if (ref_tot == 0) { txt = txt + "<div style='color:red;font-weight:bold;font-size:17px;'>" + "THIS USER HAS NO REFERENCES" + "</div>" }

else if (ref_tot > 0) {
	//txt = txt + "<font style='font-weight:bold; font-size:larger'>" + s_DivTitle + " = " + ref_tot + "</font><br>"; // (" + ref_received_tot + "<sup><span title='" + s_Received + "'>" + s_ShortReceived + "</span></sup> + " + ref_left_tot + "<sup><span title='" + s_Left + "'>" + s_ShortLeft + "</span></sup>)<br>";
	txt = txt + "<font style='font-weight:bold; font-size:larger'>" + s_DivTitle1 + "</font>" + "<font style='color:darkblue; font-weight:bold; font-size:larger'>" + ref_tot + "</font>" + "<font style='font-weight:bold; font-size:larger'>" + s_DivTitle2 + "</font><br>";
	txt = txt + "<div style='float:left; margin:2px 0 0 0'><div style='float:left; margin-top:-10px; left:7px; position:absolute'>" + ref_received_tot + " " + s_Received.toLowerCase() + "</div>";
	txt = txt + "<div id='ref_graphcontainer_received' style='float:right; border: 1px solid #ccc; width: 305px; height: 12px; padding: 1px; background: white; margin-top:3px' title='" + s_GraphRTitle + "'>";
	var sqrt_receivedtot = Math.round(Math.sqrt(refpos_received)) + Math.round(Math.sqrt(refinap_received)) + Math.round(Math.sqrt(refneg_received)) + Math.round(Math.sqrt(refneu_received));
	var percentage = Math.round(Math.sqrt(refpos_received)) * 100 / sqrt_receivedtot;
	txt = txt + "<div style='float:left; width: " + percentage + "%; background-color: #008000; height: 12px; text-align:center; color:white' title='" + refpos_received + " " + s_Positives.toLowerCase() + " received" + "'>" + ((percentage > 2) ? refpos_received : "") + "</div>";
	percentage = Math.round(Math.sqrt(refinap_received)) * 100 / sqrt_receivedtot;
	txt = txt + "<div style='float:right; width: " + percentage + "%; background-color: purple; height: 12px; text-align:center; color:white' title='" + refinap_received + " " + s_Inappropriates.toLowerCase() + " received"  + "'>" + ((percentage > 2) ? refinap_received : "") + "</div>";
	percentage = Math.round(Math.sqrt(refneg_received)) * 100 / sqrt_receivedtot;
	txt = txt + "<div style='float:right; width: " + percentage + "%; height: 12px; background-color: red; text-align:center; color:black; title='" + refneg_received + " " + s_Negatives.toLowerCase() + " received"  + "'>" + ((percentage > 2) ? refneg_received : "") + "</div>";
	percentage = Math.round(Math.sqrt(refneu_received)) * 100 / sqrt_receivedtot;
	txt = txt + "<div style='float:right; width: " + percentage + "%; background-color: #cccccc; height: 12px; text-align:center; color:black' title='" + refneu_received + " " + s_Neutrals.toLowerCase() + " received" + "'>" + ((percentage > 2) ? refneu_received : "") + "</div></div></div>";
	txt = txt + "<div style='float:right; margin:2px 0 0 0'><div id='ref_graphcontainer_left' style='float:left; border: 1px solid #ccc; width: 305px; height: 12px; padding: 1px; background: white; margin-top:3px' title='" + s_GraphLTitle + "'>";
	var sqrt_lefttot = Math.round(Math.sqrt(refpos_left)) + Math.round(Math.sqrt(refinap_left)) + Math.round(Math.sqrt(refneg_left)) + Math.round(Math.sqrt(refneu_left));
	percentage = Math.round(Math.sqrt(refpos_left)) * 100 / sqrt_lefttot;
	txt = txt + "<div style='float:left; width: " + percentage + "%; background-color: #008000; height: 12px; text-align:center; color:white' title='" + refpos_left + " " + s_Positives.toLowerCase() + " left" + "'>" + ((percentage > 2) ? refpos_left : "") + "</div>";
	percentage = Math.round(Math.sqrt(refinap_left)) * 100 / sqrt_lefttot;
	txt = txt + "<div style='float:right; width: " + percentage + "%; background-color: purple; height: 12px; text-align:center; color:white' title='" + refinap_left + " " + s_Inappropriates.toLowerCase() + " left" + "'>" + ((percentage > 2) ? refinap_left : "") + "</div>";
	percentage = Math.round(Math.sqrt(refneg_left)) * 100 / sqrt_lefttot;
	txt = txt + "<div style='float:right; width: " + percentage + "%; background-color: red; height: 12px; text-align:center; color:black' title='" + refneg_left + " " + s_Negatives.toLowerCase() + " left" + "'>" + ((percentage > 2) ? refneg_left : "") + "</div>";
	percentage = Math.round(Math.sqrt(refneu_left)) * 100 / sqrt_lefttot;
	txt = txt + "<div style='float:right; width: " + percentage + "%; background-color: #cccccc; height: 12px; text-align:center; color:black' title='" + refneu_left + " " + s_Neutrals.toLowerCase() + " left" + "'>" + ((percentage > 2) ? refneu_left : "") + "</div>";
	txt = txt + "</div><div style='float:right; margin-top:-10px; right:7px; position:absolute'>" + + ref_left_tot + " " + s_Left.toLowerCase() + "</div></div><br style='clear:both'>";
			
	var refleft_percentage = ((ref_left_tot - refmutual) / ref_mutualandonly_tot) * 100;
	if (refleft_percentage == 0) {refleft_percentage = '';} else {refleft_percentage =  " (" + cleanPercentage(refleft_percentage) + "%)";}
	var refmutual_percentage = (refmutual / ref_mutualandonly_tot) * 100;
	if (refmutual_percentage == 0) {refmutual_percentage = '';} else {refmutual_percentage =  " (" + cleanPercentage(refmutual_percentage) + "%)";}
	var refreceived_percentage = (ref_received_tot - refmutual) * 100 / ref_mutualandonly_tot;
	if (refreceived_percentage == 0) {refreceived_percentage = '';} else {refreceived_percentage =  " (" + cleanPercentage(refreceived_percentage) + "%)";}
	txt = txt + "<div style='margin:4px 0 0 0'><img src='http://upload.wikimedia.org/wikipedia/commons/9/9e/Fairytale_undo.png' alt='" + s_RefReceived + "' title='" + s_RefReceived + "' style='width:20px; height:20px; margin:0 1px -2px 0'> = <b>" + (ref_received_tot - refmutual) + "</b>" + refreceived_percentage + " | ";
	txt = txt + "<img src='http://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/View-refresh.svg/48px-View-refresh.svg.png' alt='" + s_RefMutual + "' title='" + s_RefMutual + "' style='width:20px; height:20px; margin:0 1px -2px 0'> = <b>" + refmutual + "</b>" + refmutual_percentage + " | ";
	txt = txt + "<img src='http://upload.wikimedia.org/wikipedia/commons/f/fc/Fairytale_redo.png' alt='" + s_RefLeft + "' title='" + s_RefLeft + "' style='width:20px; height:20px; margin:0 1px -2px 0'> = <b>" + (ref_left_tot - refmutual) + "</b>" + refleft_percentage + "</div>";

	txt = txt + "<div style='margin:2px 0 0 0'><img src='http://www.couchsurfing.org/images/icon_hosted.gif' alt='" + s_Hosted + "' title='" + s_Hosted + "' style='width:14px; height:14px; margin:0 1px -2px 0'> = <b>" + hosted + "</b>";
	if (days_hosted > 0) {txt = txt + " (" + days_hosted + "<sup><span title='" + s_Days + "'>" + s_ShortDays + "</span></sup>)"};
	txt = txt + " | <img src='http://www.couchsurfing.org/images/icon_surfed_with.gif' alt='" + s_Surfed + "' title='" + s_Surfed + "' style='width:14px; height:14px; margin:0 0 -2px 0'> = <b>" + surfed_with + "</b>";
	if (days_surfed > 0) {txt = txt + " (" + days_surfed + "<sup><span title='" + s_Days + "'>" + s_ShortDays + "</span></sup>)"};
	txt = txt + " | <img src='http://www.couchsurfing.org/images/icon_traveled_with.gif' alt='" + s_Traveled + "' title='" + s_Traveled + "' style='width:14px; height:14px; margin:0 0 -2px 0'> = <b>" + traveled_with + "</b>";
	if (days_traveled > 0) {txt = txt + " (" + days_traveled + "<sup><span title='" + s_Days + "'>" + s_ShortDays + "</span></sup>)"};
	txt = txt + " | <img src='http://www.couchsurfing.org/images/icon_in_person.gif' alt='" + s_MetInPerson + "' title='" + s_MetInPerson + "' style='width:14px; height:14px; margin:0 1px -2px 0'> = <b>" + met_in_person + "</b> | ";
	txt = txt + "<img src='http://www.couchsurfing.org/images/icon_via_internet.gif' alt='" + s_NotMetInPerson + "' title='" + s_NotMetInPerson + "' style='width:14px; height:14px; margin:0 1px -2px 0'> = <b>" + not_met_in_person + "</b> | ";
	var friends_percentage = (friends_reftot / ref_mutualandonly_tot) * 100;
	if (friends_percentage > 0) {friends_percentage = " (" + cleanPercentage(friends_percentage) + "%)";} else {friends_percentage = "";}
	txt = txt + "<img src='http://s3.amazonaws.com/uso_ss/5995/medium.png?1265922720' alt='" + s_FriendsLabel + "' title='" + s_FriendsLabel + "' style='width:14px; height:14px; margin:0 1px -2px 0'> = <b>" + friends_reftot + "</b>" + friends_percentage + "</div>";
   if (refmutual > 0) {
		var percentage = (mutualcheck_matchingtot / refmutual) * 100;
		percentage = ((percentage == 0) ? "<span style='background-color:red; padding:1px 3px 1px 3px; border:1px solid #ccc; height:12px' title='&gt; 5%'>" : "<span>") + "<b>" + cleanPercentage(percentage) + "</b>%</span>";
	} else {
		var percentage = '<b>?</b>';
	}
	txt = txt + "<div style='margin:2px 0 0 0'>" + s_HospitalityPercentage + " = " + ((hospitalityPercentage == 0) ? "<span style='color:red; font-weight:bold' title='&gt; 5%'>" : "<span>") + "<b>" + cleanPercentage(hospitalityPercentage) + "</b>%</span> | ";
	
if (refneg_percent == 0 && refpos_received >= 8) {
    txt = txt + "<img src='http://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Art%C3%ADculo_bueno.svg/180px-Art%C3%ADculo_bueno.svg.png' alt='" + s_Trustworthy + "' title='" + s_Trustworthy + "' style='width:35px; height:35px'> | ";
    }  
else if (refneg_percent == 0) {
	txt = txt + "<span style=color:#2BCC1D;font-weight:bold>" + s_Negatives + "</span> | ";
	}  
else if (refneg_percent > 0 && refneg_percent < 5 ) {
	txt = txt + "<span style=color:red;font-weight:bold>" + s_Negatives1 + "</span><sup><span title='" + s_Received + "'>" + s_ShortReceived + "</span></sup> = " + ((refneg_percent > 0) ? "<span style='background-color:yellow; color:blue; padding:1px 3px 1px 3px; border:1px solid black; height:12px' title='&gt; 5%'>" : "<span>") + "<b>" + cleanPercentage(refneg_percent) + "</b>%</span> | ";
	}
else {
	txt = txt + "<span style=color:red;font-weight:bold>" + s_Negatives1 + "</span><sup><span title='" + s_Received + "'>" + s_ShortReceived + "</span></sup> = " + ((refneg_percent > 0) ? "<span style='background-color:yellow; color:#910322; font-size:13px; padding:1px 3px 1px 3px; border:1px solid darkblue; height:12px' title='&gt; 5%'>" : "<span>") + "<b>" + cleanPercentage(refneg_percent) + "</b>%</span> | ";
	}
	
	txt = txt + s_RefReliability + " = " + percentage + "</div>";
} else {
	txt = txt + "<b>" + s_DivTitle + " = 0</b>";
}
txt = txt + "</div>";

// Adds additional text to the page
header.innerHTML = txt + header.innerHTML;

// Adds icons and info
txt = " <img src='http://s3.amazonaws.com/uso_ss/5110/medium.png?1263309382' alt='" + s_Languages + "' title='" + s_Languages + "' width='32' height='32' hspace='1' border='0'><sub>" + languages_num + "</sub>";
if (visitedcountries_num > 0) {
	txt = txt + " <img src='http://s3.amazonaws.com/uso_ss/5109/medium.png?1263309350' alt='" + s_Countries + "' title='" + s_Countries + "' width='32' height='32' hspace='1' border='0'><sub>" + visitedcountries_num + "</sub>";
} 
iconbox.innerHTML = iconbox.innerHTML + txt;
// end of OUTPUT SECTION
