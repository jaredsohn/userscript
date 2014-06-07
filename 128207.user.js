1.
// ==UserScript==
// @name Xwars FeaR DE to FR
// @author Wirder
// @description Trad DE to FR / MaJ Regulière
// @license GPL
// @version 1.1
// @include http://uni1.de.x-wars.net/* 
// @released 2012-07-02
// @updated 2012-14-03
// @compatible Greasemonkey
// ==/UserScript==
    
var words = {
// Syntax: 'Search word' : 'Replace word',
'Achtung: Es wird ein weiteres Hauptquartier benötigt' : 'Attention : Il vous faut un niveau suplémentaire du Quartier Général',
'Handelsgilde' : 'GDC',
'Dein Handelsangebot an' : 'Votre Offre de Commerce en' ,
'wurde abgelehnt' : 'a été annulé' ,
'Antimaterie-Torpedo' : 'Torpille Antimatière' ,
'Antimaterie Detonator' : 'Détonateur Antimatière' ,
'-Klasse' : '' ,
'Erweiterte Spionage' : 'Espionnage avancé' ,
'nicht verfügbar' : 'Indisponible' ,
'Grundwerte' : 'Valeur de base' ,
'Boden' : ' Planétaire' ,
'Alliance Hangar' : 'Hangar d\'Alliance' ,
'Forschung nicht weit genug fortgeschritten' : 'Recherches insuffisantes' ,
'Startbasis' : 'Base de l\'attaquant' ,
'Recycling' : 'Recyclage' ,
'ein' : 'un' ,
'neue Ereignisse vor' : 'nouveaux événements' ,
'neue Nachricht vor' : 'nouveau message' ,
'neues Ereignis vor' : 'nouvel événement' ,
'neue Nachrichten vor' : 'nouveaux messages' ,
'Es liegen' : 'Vous avez ' ,
'Es liegt' : 'Vous avez ' ,
'Planetar' : 'Planétaire' ,
'abstimmen' : 'Voter' ,
'Galaxieansicht' : 'Vue de la Galaxie' ,
'Taktische Kriegsführung' : 'Guerre Tactique' ,
'Zielbasis' : 'Base de la Cible' ,
'eine' : 'un' ,
'Planeten Klasse' : 'Classe de la planète' , //Planeten passe avant
'Planet aufgeben' : 'Abandonner' , //Planet passe avant
'Neue Nachricht' : 'Nouveau message' , //Nachricht passe avant
'Allianz verlassen' : 'Quitter l\'alliance' , //Allianz passe avant
'an alle' : 'à tous' , //An passe avant
'Allianz löschen' : 'Supprimer l\'alliance' , //Allianz et Iöschen passe avant
'Roheisen Mine' : 'Mine de métal brut' , //Rohersen passe avant
'Roheisen Lager' : 'Dépôts de métal brut' , //Roheisen passe avant
'Gold Lager' : 'Dépôts d\'or' , //Gold passe avant
'Antimatière-Torpedo' : 'Torpille antimatière' , //Antimatière passe avant
'Es wird gebaut' : 'Construction en Cours :' ,
'Es wird geforscht' : 'Recherche en Cours :' ,

// ***** Ressource
'Roheisen' : 'Métal' ,
'Kristalle' : 'Cristal' ,
'Gold' : 'Or' ,


// ***** Menu
'&#220;bersicht' : 'Aperçu' , //n'aime pas les Ü et ü
'Konstruktion' : 'Construction' ,
'Forschung' : 'Recherches' ,
'Verteidigung' : 'Défense' ,
'Produktion' : 'Production' ,
'Flotten' : 'Flottes' ,
'Handel' : 'Commerce' ,
'Rohstoffe' : 'Ressources' ,
'Planeten' : 'Planètes' ,
'Technik' : 'Technologies',
'Highscore' : 'Classement' ,
'Allianz' : 'Alliance' ,
'Nachrichten' : 'Messagerie' ,
'Account' : 'Compte' ,
//'Board' : 'Forum' ,
'Logout' : 'Déconnexion', 


// ***** Aperçu
'Planet' : 'Planète' ,
'Hauptplanet' : 'Planète principale' ,
'Rasse' : 'Race' ,
'Fraktion' : 'Faction' ,
'Planeten Klasse' : 'Planète de classe' ,
'Energie' : 'Energie' ,
'Gebäudestatus' : 'Statut du bâtiment' ,
'Temperatur' : 'Températures' ,
'Punkte' : 'Points' ,

'Text ändern' : 'Modifier la devise de la planète' ,
'Planetenbild ändern' : 'Modifier l\'image de la planète' ,

'Konstruktionspunkte' : 'Points de construction' ,
'Forschungspunkte' : 'Points de recherche' ,
'Militärpunkte' : 'Points militaires' ,
'Gesamtpunkte' : 'Total des points' ,
'frei' : 'libre(s)' ,
'&#220;berschuss' : 'libre(s)' ,

// ***** Production
'Aufträge' : 'Ordres' ,
'Schiffsdesign' : 'Conception de vaisseau' ,
'Bitte wählen Sie einen Rumpf' : 'Sélectionner un fuselage' ,
'Bitte wählen Sie einen Antrieb' : 'Sélectionner un propulseur' ,
'speichern' : 'Sauvegarder' ,

// ***** Flotte
'Flottenbewegungen' : 'Mouvements de flotte' ,
'Raumdock' : 'Dock' ,
'Flottenkommando' : 'Commandement de flotte' ,

// ***** Commerce
'Transaktionen' : 'Transactions' ,
'Schiffskauf' : 'Poste de Commerce' ,
'Handelsangebot stellen' : 'Faire une ODC' ,
'Kredit' : 'Crédits' ,

// ***** Planète
'Namen ändern' : 'Renommer' ,
'wechseln' : 'Changer' ,

// ***** Classement
'Top 100 Spieler' : 'Top 100 des joueurs' ,
'Top 100 Allianzen' : 'Top 100 des alliances' ,

// ***** Messagerie
'Neu' : 'Nouveau' ,
'Eingang' : 'Boîte de réception' ,
'Ausgang' : 'Messages envoyés' ,
'zurück' : 'Précédent' ,
'anzeigen' : 'Montrer' ,
'absenden' : 'Envoyer' ,
'Bitte gebe den Grund deiner Meldung an' : 'Indiquer la raison de la plainte' ,
'An alle Mitglieder' : 'À tous les membres' ,
'An' : 'à' ,
'alle löschen' : 'Supprimer tout' ,
'löschen' : 'Supprimer' ,
'vorherige' : 'Précédent' ,
'nächste' : 'Suivant' ,
'Von' : 'Sur' , //conflit avec le "von" de l'aperçu
'Nachricht' : 'Message' ,
'Datum' : 'Date' ,
'antworten' : 'Répondre' ,
'weiter' : 'Suivant' ,
'melden' : 'Signaler' ,

// ***** Alliance
'Mitglieder' : 'Membres' ,
'Ihr Rang' : 'Votre rang' ,
'Politik' : 'Politique' ,
'Alliance suchen' : 'Recherche d\'alliance' ,
'Allianzen' : 'Alliance' ,
'Allianz-Nachricht an ausgewählte Empfänger schicken' : 'Messagerie de l\'alliance (sélectionner des destinataires)' ,
'editieren' : 'Éditer' ,

// ***** Technologies (regroupe beaucoup des noms)
'Konstruktionen' : 'Constructions' ,
'Verteidigung' : 'Défense' ,
'Forschungsinstitut' : 'Recherches' ,
'Schiffe' : 'Vaisseaux' ,

// Construction
'Planet:' : 'planète' ,
'Hauptgebäude' : 'Bâtiments principaux' ,
'Hauptquartier' : 'Quartier Général' ,
'Bauzentrale' : 'Centrale de Construction' ,
'Forschungszentrale' : 'Centre de Recherche' ,
'Spionagestation' : 'Station d\'espionnage' ,

'Rohstoffgebäude' : 'Production de ressources' ,
'Kristall Förderungsanlage' : 'Mine de Cristal' ,
'Frubin Sammler' : 'Mine de Frubin' ,
'Orizin Gewinnungsanlage' : 'Mine d\'Orizin' ,
'Frurozin Herstellung' : 'Mine de Frurozin' ,

'Lagergebäude' : 'Dépôts' ,
'Kristall Lager' : 'Dépôts de Cristal' ,
'Frubin Lager' : 'Dépôts de Frubin' ,
'Orizin Lager' : 'Dépôts d\'Orizin' ,
'Frurozin Lager' : 'Dépôts de Frurozin' ,

'Energiegebäude' : 'Bâtiments d\'énergie' ,
'Kernkraftwerk' : 'Centrale Nuk' ,
'Fusionskraftwerk' : 'Centrale à fusion' ,

'Raumschiff- und Verteidigungs-Gebäude' : 'Bâtiments Militaires' ,
'Raumschiff Fabrik' : 'Fabrique de Vaisseaux' ,
'Verteidigungsstation' : 'Station de Défense' ,
'Spionageabwehr' : 'Défense contre l\'espionnage' ,
'Frühwarnanlage' : 'Installation d\'Alerte Anticipée' ,
'Geheimdienstzentrum' : 'Centre des Services Secrets' ,
'Hohe Akademie' : 'Grande Académie' ,
'Allianz Hangar' : 'Hangar d\'alliance' ,

'Handelsgebäude' : 'Bâtiments de Commerce' ,
'Handelsposten' : 'Poste de commerce' ,
'Handelszentrum' : 'Centre de commerce' ,
'X-Wars Bank' : 'Banque' ,
'X-Wars Kreditinstitut' : 'Institut de Crédit' ,

//Recherche
'Basis Forschungen' : 'Recherches de base' ,
'Espionnage' : 'Espionnage' ,
'Signalübertragung' : 'Transmission de Signal' ,
'Multiples Bauen' : 'Constructions Multiples' ,
'Interstellarer Commerce' : 'Commerce Interstellaire' ,
'Schiffskonstruktion' : 'Construction des Vaisseaux' ,
'Takt. Kriegsführung' : 'Guerre Tactique' ,
'Tarntechnologie' : 'Technologie de camouflage' ,

'Schiffs- und Waffenforschung' : 'Recherche sur les vaisseaux et les armes' ,
'Ionisation' : 'Ionisation' ,
'Verbrennungstechnik' : 'Technique de combustion' ,
'Metallurgie' : 'Métallurgie' ,
'Energiebündelung' : 'Rassemblement d\'énergie' ,
'Ladedocks' : 'Chargeur de dock' ,
'Nanotechnologie' : 'Nanotechnologie' ,
'Plasmaforschung' : 'Recherche sur le plasma' ,
'Hochexpl. Substanzen' : 'Substance très explosive' ,  
'Hochexplosive Substanzen' : 'Substance très explosive' ,
'Schildforschung' : 'Recherche sur les boucliers' ,
'Erweiterte Legierungen' : 'Alliages développés' ,
'Biotechnologie' : 'Biotechnologie' ,
'Strahlenforschung' : 'Recherche sur le rayonnement' ,
'Hochtechnologie' : 'Technologie de pointe' ,
'Raketenforschung' : 'Recherche sur les fusées' ,
'Nano Synthese' : 'Nano-synthése' ,
'Antimaterietechnologie' : 'Technologie de l\'antimatière' ,
'Teleporttechnologie' : 'Technologie de téléporation' ,

'Antriebsforschung' : 'Recherches sur la propulsion' ,
'Nuklear-thermische Triebwerke' : 'Réacteur thermonucléaire' ,
'Nukleartriebwerke' : 'Réacteur thermonucléaire' ,
'Ionentriebwerke' : 'Réacteur ionique' ,
'Hyperraumantrieb' : 'Propulseur hyperspatial' ,
'Gravitationsantrieb' : 'Propulsion gravitationnelle' ,

'Administrative Forschung' : 'Recherche administrative' ,
'Kolonieverwaltung' : 'Administration des colonies' ,

//Défense
'Perimeter-Verteidigung' : 'Défense du périmètre' ,
'Planetares Minenfeld' : 'Quadrant de mines' ,
'Abwehrschilde' : 'Bouclier de Défense' ,

'Orbitale Verteidigungsstation' : 'Station orbitale de Défense' ,
'Leichte Laserbatterie' : 'Batterie légère de laser' ,
'mittlere Laserbatterie' : 'Batterie moyenne de laser' ,
'schwere Laserbatterie' : 'Batterie lourde' ,
'Raketensilo' : 'Silo de missiles' ,
'HE-Raketenstartrampe' : 'Rampe de lancement de fusées HE' ,

'Oberflächen-Verteidigung' : 'Défense planétaire' ,
'Plasmaturm' : 'Tourelle à plasma' ,
'Antimaterieraketen' : 'Fusées antimatières' ,

//Production
'Rumpfoptionen' : 'Fuselage' ,
'Rumpf Drohne' : 'Fuselage de drone' ,
'Rumpf Taktische Waffe' : 'Fuselage d\'arme tactique' ,
'Schiffsrumpf' : 'Fuselage de vaisseau' ,
'Taktisch' : 'Tactique' ,
'leicht' : 'Léger' ,
'mittel' : 'Moyen' ,
'schwer' : 'Lourd' ,

'Antriebsoptionen' : 'Propulseur' ,
'Nuklearthermischer Antrieb' : 'Propulseur thermonucléaire' ,
'Ionenbooster' : 'Boosteur ionique' ,
'Ionenantrieb' : 'Propulsion ionique' ,

'Panzerungsoptionen' : 'Blindage' ,
'Leichtmetallpanzer M1' : 'Blindage d\'alliage M1' ,
'Spezialgehärtete Titanlegierung' : 'Alliage spécial de titane' ,
'Thryacithpanzer' : 'Blindage en Thryacith' ,
'Carbonschirm' : 'Isolation en carbone' ,
'Carbonmantel' : 'Gaine de carbone' ,
'Diamantpanzer' : 'Blindage en diamant' ,

'Schildoptionen' : 'Bouclier' ,
'Leichter Energieschild' : 'Bouclier d\'énergie léger' ,
'Mittlerer Energieschild' : 'Bouclier d\'énergie moyen' ,
'Schwerer Energieschild' : 'Bouclier d\'énergie lourd' ,

'Defensiv-Waffen Optionen' : 'Armes de défense' ,
'Defensiv-Teleporter T1' : 'Téléporteur défensif T1' ,
'Defensiv-Teleporter T2' : 'Téléporteur défensif T2' ,
'Defensiv-Teleporter T3' : 'Téléporteur défensif T3' ,

'Waffenoptionen' : 'Armement' ,
'Anfrage starten' : 'Confirmer l\'ODC' ,
'Alle Flottenbasen' : 'Flotte de toutes les planètes' ,
'Befehl erteilen' : 'Lancer l\'ordre' ,
'Keine Langstrecken-Comunication' : 'L-Com non disponible' ,
'Flottenbasis' : 'Flotte de' ,
'Impulskanone' : 'Canon à impulsion' ,
'Leichte Strahlenkanone' : 'Canon laser léger' ,
'abbrechen' : 'Annuler' ,
'Lieferung' : 'Recevoir' ,
'Besitzer' : 'Destinataire' ,
'Annehmen' : 'Accepter' ,
'Ablehnen' : 'Refuser' ,
//'Fusées' : 'Fusées' , //pas nécessaire
'Plasmakanone' : 'Canon à plasma' ,
'Mittlere Strahlenkanone' : 'Canon laser moyen' ,
'HE-Rakete' : 'Fusées HE' ,
'Plasmageschütz' : 'Artillerie à plasma' ,
'Präzisionsrakete' : 'Fusées de précision' ,
'HE-Torpedo' : 'Torpille HE' ,
'Torpedo' : 'Torpille' ,
'Schwere Strahlenkanone' : 'Canon laser lourd' ,
'Plasmabatterie' : 'Batterie de plasma' ,

'Taktische Sprengkörper' : 'Explosifs tactiques' ,
'konventionelle Sprengladung' : 'Charge explosive conventionelle' ,
'HE-Detonator' : 'Détonateur HE' ,
'Plasma Detonator' : 'Détonateur de plasma' ,
'Bio-Detonator' : 'Bio-détonateur' ,
'Antimatière Detonator' : 'Détonateur d\'antimatière' ,

'Ladeerweiterung' : 'Composants de fret' ,
'Ladebox' : 'Box de charge' ,
'Ladedock' : 'Dock de charge' ,
'Frachtcontainer' : 'Container de fret' ,
'Frachtdeck' : 'Pont de fret' ,
'Trägerdeck' : 'Pont de support' ,

'Spionageoptionen' : 'Modules d\'espionnage' ,
'Systemaufklärung' : 'Découverte de système' ,
'Planetenscanner' : 'Scanner de planète' ,
'Observerationseinheit' : 'Unité d\'observation' ,

'Tarnung' : 'Camouflage' ,
'Tarnvorrichtung' : 'Dispositif de camouflage' ,

'Kolonisationsoptionen' : 'Colonisation' ,
'Kolonisationsmodul' : 'Module de colonisation' ,

'Kommunikation' : 'Comunication' ,
'Langstrecken-Kommunikationsmodul' : 'Module de communication pour les longs trajets' ,
'Ereignisse' : 'Evenements' ,
'Flottes Kommando' : 'Flotte' ,
'Planetare Centrale de Construction' : 'Batiments' ,
'Kampfbericht' : 'Rapport de Lutte' ,
//Vaisseaux
'Flugkörper' : 'Drones' ,
'Aufklärungsdrohnen' : 'Sonde d\'exploration' ,
'Spionagesonden' : 'Sonde d\'espionnage' ,
'Observerdrohnen' : 'Sonde d\'observation' ,

'Keine Abhängigkeiten' : 'Pas de prérequis' ,
'Gebäude Abhängigkeiten' : 'Batiments Recquis ' ,
'Forschungs Abhängigkeiten' : 'Recherches Recquises ' ,
'Stufe' : 'Niveau' ,
'Konstruktion' : 'Construction' , //fonctionne pas
'Forschung' : 'Recherche' , //fonctionne pas
'Schiffskomponenten' : 'Composants de vaisseau' ,
'Schiffs-Klassen' : 'Classes des vaisseaux' , 
'Benötigt' : 'Prérequis' ,
'Voraussetzungen erfüllt' : 'Condition satisfaite' ,
'Voraussetzungen nicht erfüllt' : 'Condition non-satisfaite' ,
'Technologie verfügbar' : 'Technologie disponible' ,
'Technologie nicht verfügbar' : 'Technologie non-disponible' ,


// ***** Matières premières
'Lagerkapazität' : 'Capacité de stockage' ,
'Kredit Rückzahlung' : 'Paiement des crédits' ,
'Konstruktionsstufe' : 'Niveau de construction' ,


// ***** Spécialisation
'Spezialisierungen' : 'Specialisations',

'Angriff' : 'Attaque' ,
'Projektil' : 'Projectile' ,
'Strahlen' : 'Rayons' ,
'Raketen' : 'Fusées' ,
'Plasma' : 'Plasma' ,
'Hochexplosiv' : 'Très Explosif' ,
'Biologisch' : 'Biologique' ,
'Antimaterie' : 'Antimatière' ,

'Finanzen' : 'Finances' ,
'Handel' : 'Commerce' ,
'Finanz' : 'Finance' ,
'Fracht' : 'Fret' ,
'bauen' : 'Construire' ,

'Abwehr' : 'Défense' ,
'Roheisen' : 'Métal' ,
'Schilde' : 'Bouclier' ,
'Carbon' : 'Carbone' ,
'Teleport' : 'Téléportation' ,
'Handelskonsortium' : 'Commerce' ,

'Sonstiges' : 'Autres' ,
'Spionage' : 'Espionnage' ,
'Spionageabwehr' : 'Défense contre l\'espionnage' ,
'Sabotage' : 'Sabotage' ,
'Sabotageabwehr' : 'Défense contre le sabotage' ,

'Gesamt' : 'Total' ,
'netto' : 'net' ,
'Achtung' : 'Attention' ,
'Planètes Observation' : 'Observations' ,
'Planètes suchen' : 'Recherche de Joueur' ,
'Observation sur' : 'Vous êtes observé par' ,
'à tous Membres' : ' ' ,
'[FeaR] The Ferocious Army - à tous Membres ' : '[FeaR] Message d\'alliance' ,
'Dein Handelsangebot' : 'Votre Offre de Commerce' ,
'Es wird un Centre de Recherche zum Erforschen neuer Technologien Prérequis' : 'Il vous faut un Centre de Recherche pour accéder aux recherches' ,
'Du benötigst un Raumwerft zur Production Sur Schiffen' : 'Il vous faut une Fabrique de vaisseaux spatiaux pour accéder à la production de vaisseaux' ,
'Transportkosten' : 'Taxe de Commerce' ,
'Ziel' : 'Destination' ,
'Versenden' : 'Envoyer' ,
'Forderung' : 'Recevoir' ,
'Speed' : 'Vitesse' ,
'Rumpf' : 'Planche à' , 	
'Antrieb' : 'dessin' ,
'Bezeichnung der Schiffsklasse' : 'Nom du vaisseau' ,
'Keine Nutzungsanforderungen' : 'Pas de pré-requis nécessaires' , 

///////////////////////////////////////////////////////
'':''};

//////////////////////////////////////////////////////////////////////////////
// This is where the real code is
// Don't edit below this
//////////////////////////////////////////////////////////////////////////////

// prepareRegex by JoeSimmons
// Used to take a string and ready it for use in new RegExp()
String.prototype.prepareRegex = function() {
return this.replace(/([\[\]\^\$\.\:\(\)\?\/\\\+\{\}\|])/g, "\\$1");
};

function isOkTag(tag) {
return (",pre,blockquote,code,input,button,textarea".indexOf(","+tag) == -1);
}

var regexs=new Array(),
	replacements=new Array();
for(var word in words) {
if(word != "") {
regexs.push(new RegExp("\\b"+word.prepareRegex().replace(/\*/g,'[^ ]*')+"\\b", 'gi'));
replacements.push(words[word]);
}
}

var texts = document.evaluate(".//text()[normalize-space(.)!='']",document.body,null,6,null), text="";
for(var i=0,l=texts.snapshotLength; (this_text=texts.snapshotItem(i)); i++) {
	if(isOkTag(this_text.parentNode.tagName.toLowerCase()) && (text=this_text.textContent)) {
	for(var x=0,l=regexs.length; x<l; x++) {
	text = text.replace(regexs[x], replacements[x]);
	this_text.textContent = text;
	}
	}
}	

