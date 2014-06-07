// ==UserScript==
// @name           SI - correcteur BUG langue FR
// @namespace      SpaceInvasion
// @description    Correction Bug Langue (univ FR)
// @version        1
// @date           05-03-2010
// @include        *.spaceinvasion.*/indexInternal.es?action=internal*
// @include        http://spaceinvasion.*/indexInternal.es?action=internal*
// @exclude        *.spaceinvasion.*/indexInternal.es?action=internalBattleReport*
// @exclude        *.spaceinvasion.*/indexInternal.es?action=internalSearch*
// @exclude        *.spaceinvasion.*/indexInternal.es?action=internalGalaxy*
// @exclude        *.spaceinvasion.*/indexInternal.es?action=internalToplist*
// @exclude        *.spaceinvasion.*/indexInternal.es?action=internalMenu*
// ==/UserScript==


(function () {

  var replacements, regex, key, textnodes, node, s;

function setAttributeOfElement(attributeName,attributeValue,ElementXpath)
    {
        var alltags = document.evaluate(ElementXpath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
        for (i=0; i<alltags.snapshotLength; i++)
            alltags.snapshotItem(i).setAttribute(attributeName, attributeValue)
    }    
        setAttributeOfElement('value','Calculer',"//input[@value='Calculate']");
        setAttributeOfElement('value','Quitter la coalition',"//input[@value='Austreten']");
        setAttributeOfElement('value','Envoyer la demande',"//input[@value='Antrag stellen']");
        setAttributeOfElement('value','Sauvegarder',"//input[@value='Speichern']");
        setAttributeOfElement('value','Activer',"//input[@value='Aktivieren']");


replacements = {
  "Eine Deiner Flotten " : "Une de vos flottes ",
  "Eine deiner Flotten " : "Une de vos flottes ",
  " wurde erfolgreich von " : " en départ de " ,
  " kehrt vom Einsatz bei " : " à destination de ",
  " zum Heimatplaneten " : " est de retour sur votre planète ",
  " hat ihr Ziel, ein Trümmerfeld bei " : " a atteint son objectif. Elle a recyclée les débris de ",
  " nach " : " vers ",
  "  umstationiert. Sie liefert " : " est bien arrivée à destination. Elle livre ",
  " zurück. Der Auftrag lautete" : ". Vous aviez donné l'ordre",
  ". Es wurden " : ". Elle décharge ",
  ". entladen." : "." ,
  "Du wurdest ausspioniert! Eine Fremde Flotte vom Planeten " : "Vous avez été espionné! Une flotte ennemie de la planète ",
  " wurde auf Ihrem Planeten " : " a été aperçue à proximité de votre planète ",
  " gesichtet." : ".",
  " Die feindliche Flotte wurde abgeschossen!" : " La flotte de l'ennemi a été abattu!",
  " Chance auf Spionageabwehr: " : " Probabilité de destruction de la flotte d'espionnage: ",
  " Roheisen" : " Fonte",
  " Metall" : " Métal",
  " Kryptonit" : " Kryptonite",
  "Spice" : " Epice",
  "Energy" : "Energie",
  "Planet": "Planète",
  "Größe" : "Taille",
  "Zeit"  : "Temps",
  "im Bau" : "Construction en cours",
  "Gebäude" : "Bâtiment",
  "Forschung" : "Recherche",
  "Inaktivität:" : "Inactivité:",
  "Beitritt:" : "Inscription:",
  "Platz" : "Place",
  "Rang auswählen" : "Sélectionnez le rang",
  "message non lumessages non lus!" : "messages non lus!",
  "Planèteenbeschreibung" : "Description de votre planète",
  "Flottenbewegungen" : "Flottes en mouvements",
  "Transportbericht" : "Livraison",
  "Angriff" : "Attaquer",
  "Typ" : "Type",
  "Typee de vaisseau" : "Type de vaisseau",
  "Punkte" : "Points",
  "Pig iron mine" : "Mine de fer",
  "Blast furnace" : "Haut fourneau",
  "Kryptonite mine" : "Mine de kryptonite",
  "Epice mine" : "Mine d'épice",
  "Production factor" : "Facteur de production" ,
  "Ressourcenübersicht von" : "Vue d'ensemble des ressources produite par la" ,
  "available" : "disponible" ,
  "Ships" : "Vaisseaux", 
  " von " : " sur ",
  "Schließen" : "Fermer",
  "Bauzeit" : "Délais de construction",
  "Research time" : "Délais de recherche",
  "Fehlende Rohstoffe" : "Ressources manquantes",
  "Missing raw materials:" : "Ressources manquantes",
  "Zu wenig Ressourcen" : "Ressources nécessaires",
  "benötigt" : "Nécessite",
  "Required" : "Nécessite",
  "n bebaut." : ".",
  "Kryptonitee" : "Kryptonite",
  "Construction time" : "Délais de construction",
  "Original construction time" : "Temps de construction original",
  "Original research time" : "Temps de recherche original",
  "In die Bauliste" : "Améliorer au" ,
  "aufnehmen" : "niveau suivant" ,
  "Auslastung" : "Utilisation" ,
  "Scanreichweite:" : "Portée de détection" ,
  "Sonnensysteme" : "systèmes solaires" ,
  "Allianz" : "Alliance" ,
  " bearbeiten" : " | modifier",
  "Bau möglich!" : "Construction possible!" ,
  "Technologiebonus" : "Bonus technologie",
  "Technology bonus" : "Bonus technologie",
  "Total construction time" : "Durée de construction",
  "Total research time" : "Durée de recherche",
  "Möglich am:" : "Recherche possible le:",
  "Effizienz" : "Efficacité",
  "ursprünglich" : "originaux",
  "gesamt" : "totaux",
  "Produktion pro Stunde" : "Production par heure",
  "Geschwindigkeitsbonus" : "Bonus de vitesse",
  "Partikelspeicher" : "Charge de Particules",
  "Aktivieren" : "Activer",
  "Ausbau auf" : "Améliorer au",
  "Stufe" : "Niveau",
  "Basic income" : "Production de base",
  "Active research" : "Recherche active",
  " auf " : " sur ",
  "Current highest upgrade in Univers" : "Plus haut niveau atteint dans cet Univers",
  "Bau möglich am" : "Construction possible le",
  "Feindliche Flotten" : "Flottes ennemies",
  "Note: Only 70% of the production costs will be reimbursed if a construction assignment is cancelled." : "Note: Seulement 70% des coûts de production seront remboursés si une construction est annulée." ,
  "Achtung! Es werden lediglich 70% der Baukosten zurückerstattet bei Abbruch eines Bâtimentausbaus." : "Attention! Il sera remboursé que 70% des coûts de construction si une construction est annulée.",
  "Note: Only 70% of the research costs will be reimbursed if research is cancelled." : "Note: Seulement 70% des coûts de recherche seront remboursés si celle-ci est annulée.",
  "Fusion plant" : "Réacteur à fusion" ,
  "Storage capacity" : "Capacité de stockage" ,
  "Thermosolar plant" : "Réacteur thermo" ,
  "Energie technology" : "Tech énergétiques" ,
  "Mining technology" : "Tech d'extraction" ,
  "Production per hour" : "Production par heure" ,
  "Not enough resources" : "ressources insuffisantes",
  "Production per day" : "Production par jour" ,
  "Particle cannon" : "Canon à particules" ,
  "Particle shield" : "Bouclier anti-particules" ,
  "Felder" : "Champs",
  "Teleporter" : "Téléporteur" ,
  "Pig iron" : "Fonte" ,
  "Zeit" :  "Temps" ,
  "Auftrag" : "Ordre" ,
  "Flotte" :  "Flotte" , 
  "Güter" :  "Marchandises",
  "Startplanet" : "Départ" ,	
  "Zielplanet" :  "Destination" , 
  "Spieler"  : "Joueur",
  "Eigene Flotten" : "Flottes en départ",
  "Wiederkehrende Flotten" : "Flottes en retour",
  "Stationieren" : "Stationner",
  "Saveflug" : "Vol de retraite",
  "Recyclen" : "Recycler",
  "Angreifen" : "Attaquer",
  "Spionage" : "Espionnage",
  "Recyclingbericht" : "- Rapport de Recyclage",
  "Kampfbericht" : "- Rapport de Bataille",
  "Flottenrückkehr" : "Retour de flotte",
  "Espionnagebericht" : "Activité d'espionnage",
  "Stationieren" : "Arrivée sur une planète",
  "News vom " : "Information du ",
  "Alliance-Tag" : "Abréviation coalition",
  " Tage " : " Jour ",
  " Tag " : " Jour " ,
  "auflösen" : "dissoudre",
  "abtreten/übernehmen" : "quitter/reprendre",
  "Name" : "Nom",
  "Beschreibung" : "Description",
  "Bewerbungen nicht möglich" : "Recrutement OFF",
  "Bewerbungen möglich" : "Recrutement ON" ,
  "Kriege:" : "Guerre:" ,
  "Bündnisse:" : "Alliances:" ,
  "Nicht-Angriffspakte:" : "Pactes de non-agression:",
  "Main/Wing:" : "Fusion/Wing:" ,
  "verwalten" : "gérer" ,
  "Mitglieder" : "Membres",
  " vom Planèteen " : "  en départ de la planète ",
  ", erreicht. Sie hat dort " : ". Votre flotte a minée ",
  " abgebaut." : ".",
  "Verwalten" : "Gestion coalition",
  "Membresliste" : "Liste de membres",
  "Rundschreiben" : "Message collectif",
  "Verfassen" : "Rédiger un message",
  "Bewerbungen/Anträge" : "Diplomatie/Candidature",
  "Homepage" : "Page d'accueil",
  "Einsehen" : "voir le message",
  "Zurück" : "Retour",
  "Allianceverwaltung" : "Retour",
  "Rechte" : "Droits",
  "Message collectif verfassen" : "Autoriser les messages collectif",
  "Liste de membres einsehen" : "Voir la liste de membres",
  "Online Status einsehen" : "Voir le status online",
  "Koordinaten einsehen" : "Voir les coordonnées",
  "User kicken" : "Virer des membres",
  "Verteidigung anfordern" : "Demande de défense" ,
  "sortieren." : "",
  "Placeierung" : " Rang/Place",
  "Joueurnamen" : "Nom de joueur",
  "Beitrittsdatum" : "Date inscription",
  "Alliance-Rang" : "Rang Alliance",
  "Neuen Rang anlegen" : "Création d'un nouveau rang",
  "Gespeichert" : "Enregistrée",
  "Droits/Ränge" : "Droits des Rangs" ,
  "Liste de membres vers" : "Liste de membres - classer par",
  "Trümmerfeld" : "Débris",
  "Kleiner Transporter" : "Cargo léger",
  "Großer Transporter" : "Cargo lourd",
  "Kleiner Jäger" : "Chasseur léger",
  "Kriegsschiff" : "Chasseur de combat",
  "Sternenkreuzer" : "Croiseur interstellaire",
  "Phoenix" : "Phénix",
  "Kolonieschiff" : "Colonisateur",
  "Transmitter" : "Transmetteur",
  "Espionnagesonde" : "Sonde d'espionnage",
  "Recycler" : "Recycleur",
  "Schlachtschiff" : "Croiseur de combat",
  "Tarnkappenbomber" : "Bombardier furtif",
  "Zerstörer" : "Destroyer",
  "Imperiale Sternenbasis" : "Base Spatiale Impériale",
  "total time:" : "temps total:",
  " lieferte folgende Rohstoffe beim Planèteen " : " et à destination de la planète ",
  " ab. Elle décharge dort " : " a atteint son objectif. Elle décharge ",
  " ausgeladen. Der Ordre lautete: " : ". vous aviez donné l'ordre: ",
  "Vous aviez donné l'ordre: Recycleur. " : "Vous aviez donné l'ordre: Recyclage. ",
  " umstationiert. Sie liefert " : " est arrivée à destination. Elle livre ",
  "You don't have a research lab!" : "Vous n'avez pas de labo de recherche!",
  "No need to build an economy on an asteroid; nothing can be produced there!" : "Vous n'avez pas besoin de gérer les ressources produites sur un astéroïde, car rien ne peut être produit là-bas!",
  "You don't have a weapons factory!" : "Vous n'avez pas d'usine d'armement!",
  "Bauliste" : "Liste de construction" ,
  "Friedliche Flotten" : "Flottes Pacifique",
  "Eine fremde Flotte " : "Une flotte étrangère ",
  " lieferte Dir folgende Rohstoffe zum Planèteen " : " Elle vous a laissé des Matières premières sur votre Planète " ,
  " ausgeladen." : "." ,
  };
regex = {};
for ( key in replacements ) {
  regex[key] = new RegExp(key, 'g');
}

textnodes = document.evaluate( "//text()" , document , null , XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE , null );
for ( var i=0 ; i<textnodes.snapshotLength ; i++ ) {
  node = textnodes.snapshotItem(i);
  s = node.data;
  for ( key in replacements ) {
    s = s.replace( regex[key] , replacements[key] );
  }
  node.data = s;
}

})();