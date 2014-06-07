// ==UserScript==
// @name        stiddari.de (French Version)
// @namespace   http://userscripts.org/users/513921
// @author Spar7acus
// @description Translates the game from German to French
// @include     http://test.de.stiddari.com*
// @include     http://ravengames.de*
// @version     1
// ==/UserScript==
//


(function() {

// HOME
if (location.pathname.search('index.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(spielername)\b/g, 'Nom d´utilisateur');
document.body.innerHTML = document.body.innerHTML.replace(/\b(passwort)\b/g, 'Mot de passe');
document.body.innerHTML = document.body.innerHTML.replace(/\b(anmelden)\b/g, 'registre');
document.body.innerHTML = document.body.innerHTML.replace(/\b(vergessen)\b/g, 'perdu?');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Willkommen bei)\b/g, 'Bienvenue à');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Was erwartet dich)\b/g, 'Qu´attendez-vous?');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Platz für)\b/g, 'Place pour');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einheiten)\b/g, 'Unités d´attaque');
document.body.innerHTML = document.body.innerHTML.replace(/\b(defensive Jungs)\b/g, 'Unités défensives');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ausbildungen)\b/g, 'Formations');
document.body.innerHTML = document.body.innerHTML.replace(/\b(informationen)\b/g, 'Information');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler)\b/g, 'Joueurs');
document.body.innerHTML = document.body.innerHTML.replace(/\b(pranger)\b/g, 'Ban List');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Grund)\b/g, 'Raison');
document.body.innerHTML = document.body.innerHTML.replace(/\b(gesperrt)\b/g, 'Banni');
document.body.innerHTML = document.body.innerHTML.replace(/\b(bis)\b/g, 'Jusqu´à');
document.body.innerHTML = document.body.innerHTML.replace(/\b(registrieren)\b/g, 'inscription');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Wenn Du bereits einen Account bei einem der Spiele unter)\b/g, 'Si vous avez déjà une compte dans l´un des suivants');
document.body.innerHTML = document.body.innerHTML.replace(/\b(hast oder hattest, dann brauchst Du dir keinen neuen erstellen)\b/g, 'alors vous n´avez pas besoin de créer une nouveau');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Auch kannst Du dich mit deinem globalen Account im Forum)\b/g, 'Vous pouvez aussi vous connecter avec ce même');
document.body.innerHTML = document.body.innerHTML.replace(/\b(und brauchst dich dort nicht mehr)\b/g, 'de compte dans le Forum, sans avoir besoin de faire autre');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Dein Account ist global und in allen dieser Spiele zu erreichen)\b/g, 'Votre compte est global et vous donne accès instantané à tous ces jeux');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Globale Accountverwaltung)\b/g, 'Global Account Management');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Loginname)\b/g, 'Nom d´utilisateur');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Passwort)\b/g, 'Mot de passe');
document.body.innerHTML = document.body.innerHTML.replace(/\b(wiederholen)\b/g, 'Répétez le mot de passe');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Hiermit akzeptiere ich die)\b/g, 'J´accepte les termes et conditions dans');
document.body.innerHTML = document.body.innerHTML.replace(/\b(oder)\b/g, 'ou');
document.body.innerHTML = document.body.innerHTML.replace(/\b(senden)\b/g, 'envoyer');
document.body.innerHTML = document.body.innerHTML.replace(/\b(im)\b/g, 'dans');
document.body.innerHTML = document.body.innerHTML.replace(/\b(registrierte)\b/g, 'enregistré');
document.body.innerHTML = document.body.innerHTML.replace(/\b(spieler)\b/g, 'joueurs');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tage)\b/g, 'Jours');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tag)\b/g, 'Jour');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Planeten)\b/g, 'Planètes');
document.body.innerHTML = document.body.innerHTML.replace(/\b(E-Mailadresse)\b/g, 'Adresse email');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Hier kannst du dir ein neues Mot de passe für deinen Account zuschicken lassen)\b/g, 'Ici vous pouvez envoyer un nouveau mot de passe pour votre compte');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Dieses gilt für die Spiel, Foren und für die Globale Spielerverwaltung)\b/g, 'Ceci est applicable à les jeux, forums et pour le Global Account Management');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Um die Passwörter in den Foren zu den Spielen zu ändern)\b/g, 'Pour changer les mots de passe pour les jeux et les forums');
document.body.innerHTML = document.body.innerHTML.replace(/\b(logg dich bitte mit deinem Mot de passe in die Globale Spielerverwaltung ein)\b/g, 's´il vous plaît connectez-vous avec votre mot de passe dans le Global Account Management');
}


// Menu
document.body.innerHTML = document.body.innerHTML.replace(/Übersicht/g, 'Vue d´ensemble');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Räume im Ausbau)\b/g, 'Salles en construction');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Räume)\b/g, 'Salles');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Trainingslager)\b/g, 'Camp d´entrainement');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Objektschutz)\b/g, 'Protection d´objets');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ausbildung)\b/g, 'Formation');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gebäude)\b/g, 'Bâtiments');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Suche)\b/g, 'Recherche');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Zielliste)\b/g, 'Farm liste');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kopfgeld)\b/g, 'Prime');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Technik)\b/g, 'Techniques');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianzen)\b/g, 'Alliances');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Rohstoffe)\b/g, 'Ressources');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einsätze)\b/g, 'Missions');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Stadtkarte)\b/g, 'Plan de la Ville');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Nachrichten)\b/g, 'Messages');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Highscore)\b/g, 'Classement');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Freunde)\b/g, 'Amis');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Statistiken)\b/g, 'Statistiques');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Regeln)\b/g, 'Réglement');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einstellungen)\b/g, 'Options');
document.body.innerHTML = document.body.innerHTML.replace(/Bilder Upload/g, 'Image Upload');
document.body.innerHTML = document.body.innerHTML.replace(/\b(spenden)\b/g, 'Contribution');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Logout)\b/g, 'Déconnexion');
document.body.innerHTML = document.body.innerHTML.replace(/Schläger/g, 'Casseur');
document.body.innerHTML = document.body.innerHTML.replace(/Türsteher/g, 'Videur');
document.body.innerHTML = document.body.innerHTML.replace(/Messerstecher/g, 'Bandit');
document.body.innerHTML = document.body.innerHTML.replace(/Revolverheld/g, 'Héro de la gâchette');
document.body.innerHTML = document.body.innerHTML.replace(/Besetzungstruppe/g, 'Troupe d´occupation');
document.body.innerHTML = document.body.innerHTML.replace(/Spion/g, 'Espion');
document.body.innerHTML = document.body.innerHTML.replace(/Möbelpacker/g, 'Emballeur');
document.body.innerHTML = document.body.innerHTML.replace(/CIA Agent/g, 'Agent CIA');
document.body.innerHTML = document.body.innerHTML.replace(/FBI Agent/g, 'Agent FBI');
document.body.innerHTML = document.body.innerHTML.replace(/Scharfschütze/g, 'Tireur d´élite');
document.body.innerHTML = document.body.innerHTML.replace(/Transporteur/g, 'Transporteur');
document.body.innerHTML = document.body.innerHTML.replace(/Problemlöser/g, 'Débloqueur de situation');
document.body.innerHTML = document.body.innerHTML.replace(/Profikiller/g, 'Tueur professionnel');
document.body.innerHTML = document.body.innerHTML.replace(/Bombenleger/g, 'Déposeur de bombes');
document.body.innerHTML = document.body.innerHTML.replace(/Söldner/g, 'Mercenaire');
document.body.innerHTML = document.body.innerHTML.replace(/Attentäter/g, 'Éclaireur');
document.body.innerHTML = document.body.innerHTML.replace(/Schwarzgeldarbeiter/g, 'Travailleur Clandestin');
document.body.innerHTML = document.body.innerHTML.replace(/Objektwache/g, 'Garde d´objets');
document.body.innerHTML = document.body.innerHTML.replace(/Bodyguard/g, 'Garde du corps');
document.body.innerHTML = document.body.innerHTML.replace(/Gardiene/g, 'Gardien');
document.body.innerHTML = document.body.innerHTML.replace(/Polizist/g, 'Policier');

// Overview
if (location.pathname.search('overview.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Truppen)\b/g, 'Troupes');
document.body.innerHTML = document.body.innerHTML.replace(/\b(der Einheiten)\b/g, 'de les Unités');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Keine Einheiten)\b/g, 'Aucune Unité');
document.body.innerHTML = document.body.innerHTML.replace(/ändern/g, 'Modifier');
document.body.innerHTML = document.body.innerHTML.replace(/Truppe/g, 'Troupes');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Verteidigung)\b/g, 'Défense');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Punkte)\b/g, 'Points');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Anzahl)\b/g, 'Nombre');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kampfstärke)\b/g, 'Puissance de combat');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einheiten)\b/g, 'Troupes');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gesamtübersicht)\b/g, 'Aperçu global');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Details)\b/g, 'Détails');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Transportieren)\b/g, 'Transporter');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Troupes stationieren)\b/g, 'Baser');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Chefbüro)\b/g, 'Bureau du Chef');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ausbildungsraum)\b/g, 'Formation');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Waffenkammer)\b/g, 'Fabrique d´armes');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Munitionskammer)\b/g, 'Fabrique de munitions');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Brauerei)\b/g, 'Brasserie');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kneipe)\b/g, 'Bar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schmuggel)\b/g, 'Contrebande');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Waffenlager)\b/g, 'Dépot d´armes');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Munitionsdepot)\b/g, 'Depot de munitions');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Alkohollager)\b/g, 'Depot d´alcool');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tresorraum)\b/g, 'Coffre fort');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Formationslager)\b/g, 'Camp d´entrainement');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Selbstschussanlagen)\b/g, 'Tir automatique');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Versteckte Minen)\b/g, 'Mines cachées ');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ehre)\b/g, 'Honneur');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Chemische Formation)\b/g, 'Formation chimique');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Psychisches Training)\b/g, 'Entrainement psychique');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Guerillaausbildung)\b/g, 'Formation guerilla');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bombenbau)\b/g, 'Construction de bombes');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schusstraining)\b/g, 'Entrainement au tir');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kurzwaffenkampf)\b/g, 'Combat à l´arme blanche');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Nahkampf)\b/g, 'Combat au corps a corps');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gruppenschutz)\b/g, 'Protection de groupe');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Objektbewachung)\b/g, 'Surveillance d´objet');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Informationsbeschaffung)\b/g, 'Obtention d´information');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schmuggel)\b/g, 'Contrebande');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Basisverwaltung)\b/g, 'Gestion de la base');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schutzgeldeintreibung)\b/g, 'Recouvrement d´argent racket');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Auftragsplanung)\b/g, 'Planification de mission');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Routenplanung)\b/g, 'Planification de route');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Rückkehr)\b/g, 'Retour');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Camp gründen)\b/g, 'Occuper bâtiment');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Angreifen)\b/g, 'Attaquer');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tag)\b/g, 'Jour');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tage)\b/g, 'Jours');
}

// Général Overview
if (location.pathname.search('empire.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Chefbüro)\b/g, 'Bureau du Chef');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ausbildungsraum)\b/g, 'Formation');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Waffenkammer)\b/g, 'Fabrique d´armes');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Munitionskammer)\b/g, 'Fabrique de munitions');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Brauerei)\b/g, 'Brasserie');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kneipe)\b/g, 'Bar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schmuggel)\b/g, 'Contrebande');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Waffenlager)\b/g, 'Dépot d´armes');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Munitionsdepot)\b/g, 'Depot de munitions');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Alkohollager)\b/g, 'Depot d´alcool');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tresorraum)\b/g, 'Coffre fort');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Formationslager)\b/g, 'Camp d´entrainement');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Selbstschussanlagen)\b/g, 'Tir automatique');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Versteckte Minen)\b/g, 'Mines cachées');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Raum)\b/g, 'Salle');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Punkte)\b/g, 'Points');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tag)\b/g, 'Jour');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tage)\b/g, 'Jours');
}

// Details
if (location.pathname.search('kampftab.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kampfstärke)\b/g, 'Puissance de combat');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ehre)\b/g, 'Honneur');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Anzahl)\b/g, 'Nombre de');
}

// Unit Overview
if (location.pathname.search('unitview.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Transportieren)\b/g, 'Transporter');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einheiten stationieren)\b/g, 'Baser');
document.body.innerHTML = document.body.innerHTML.replace(/\b(abbrechen)\b/g, 'Annuler');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Truppen)\b/g, 'Troupes');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Startgebäude)\b/g, 'Origine');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Zielgebäude)\b/g, 'Destination');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Start)\b/g, 'Départ');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ankunft)\b/g, 'Arrivée');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Restdauer)\b/g, 'Temps Restant');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Anzahl)\b/g, 'Nombre');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Auftrag)\b/g, 'Mission');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einheiten)\b/g, 'Unités');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Rückkehr)\b/g, 'Retour');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Camp gründen)\b/g, 'Occuper Bâtiment');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Keine)\b/g, 'Aucun');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Angreifen)\b/g, 'Attaquer');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tag)\b/g, 'Jour');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tage)\b/g, 'Jours');
}

// Salles
if ((location.pathname.search('konst.php') != -1) || (location.pathname.search('stats.php') != -1)) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Chefbüro)\b/g, 'Bureau du Chef');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ausbildungsraum)\b/g, 'Formation');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Waffenkammer)\b/g, 'Fabrique d´armes');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Munitionskammer)\b/g, 'Fabrique de munitions');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Brauerei)\b/g, 'Brasserie');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kneipe)\b/g, 'Bar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schmuggel)\b/g, 'Contrebande');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Waffenlager)\b/g, 'Dépot d´armes');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Munitionsdepot)\b/g, 'Depot de munitions');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Alkohollager)\b/g, 'Depot d´alcool');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tresorraum)\b/g, 'Coffre fort');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Formationslager)\b/g, 'Camp d´entrainement');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Selbstschussanlagen)\b/g, 'Tir automatique');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Versteckte Minen)\b/g, 'Mines cachées ');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ausbau)\b/g, 'Construction du');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Stufe)\b/g, 'Niveau');
document.body.innerHTML = document.body.innerHTML.replace(/\b(abbrechen)\b/g, 'annuler');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Raum)\b/g, 'Salles');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Dauer)\b/g, 'Temps');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tag)\b/g, 'Jour');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tage)\b/g, 'Jours');
}

// Camp d´entrainement
if ((location.pathname.search('off.php') != -1) || (location.pathname.search('stats.php') != -1)) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schläger)\b/g, 'Casseur');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Türsteher)\b/g, 'Videur');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Messerstecher)\b/g, 'Bandit');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Revolverheld)\b/g, 'Héro de la gâchette');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Besetzungstruppe)\b/g, 'Troupe d´occupation');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spion)\b/g, 'Espion');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Möbelpacker)\b/g, 'Emballeur');
document.body.innerHTML = document.body.innerHTML.replace(/CIA Agent/g, 'Agent CIA');
document.body.innerHTML = document.body.innerHTML.replace(/FBI Agent/g, 'Agent FBI');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Trasporteur)\b/g, 'Transporteur');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Problemlöser)\b/g, 'Débloqueur de situation');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Scharfschütze)\b/g, 'Tireur d´élite');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Profikiller)\b/g, 'Tueur professionnel');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bombenleger)\b/g, 'Déposeur de bombes');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Söldner)\b/g, 'Mercenaire');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Attentäter)\b/g, 'Éclaireur');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Produktion)\b/g, 'Production');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bauschleife)\b/g, 'Liste de Construction');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Keine Einheiten)\b/g, 'Aucun ordre en ce moment');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Dauer)\b/g, 'Temps');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Los)\b/g, 'Aller');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tag)\b/g, 'Jour');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tage)\b/g, 'Jours');
}

// Protection d´objets
if (location.pathname.search('deff.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schwarzgeldarbeiter)\b/g, 'Travailleur Clandestin');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Objektwache)\b/g, 'Garde d´objets');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bodyguard)\b/g, 'Garde du corps');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gardiene)\b/g, 'Gardien');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Polizist)\b/g, 'Policier');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Verteidigung)\b/g, 'Défense');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bauschleife)\b/g, 'Liste de Construction');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Keine Einheiten)\b/g, 'Aucun ordre en ce moment');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Dauer)\b/g, 'Temps');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Los)\b/g, 'Aller');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tag)\b/g, 'Jour');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tage)\b/g, 'Jours');
}

// Formations
if (location.pathname.search('forsch.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ehre)\b/g, 'Honneur');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Chemische Formation)\b/g, 'Formation chimique');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Psychisches Training)\b/g, 'Entrainement psychique');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Guerillaausbildung)\b/g, 'Formation guerilla');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bombenbau)\b/g, 'Construction de bombes');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schusstraining)\b/g, 'Entrainement au tir');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kurzwaffenkampf)\b/g, 'Combat à l´arme blanche');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Nahkampf)\b/g, 'Combat au corps a corps');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gruppenschutz)\b/g, 'Protection de groupe');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Objektbewachung)\b/g, 'Surveillance d´objet');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Informationsbeschaffung)\b/g, 'Obtention d´information');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schmuggel)\b/g, 'Contrebande');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Basisverwaltung)\b/g, 'Gestion de la base');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schutzgeldeintreibung)\b/g, 'Recouvrement d´argent racket');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Auftragsplanung)\b/g, 'Planification de mission');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Routenplanung)\b/g, 'Planification de route');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ausbau)\b/g, 'Construction du');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Stufe)\b/g, 'Niveau');
document.body.innerHTML = document.body.innerHTML.replace(/\b(abbrechen)\b/g, 'annuler');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Dauer)\b/g, 'Temps');
document.body.innerHTML = document.body.innerHTML.replace(/Ausbildungsraum/g, 'Formations');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tag)\b/g, 'Jour');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tage)\b/g, 'Jours');
}

// Technologies
if (location.pathname.search('techtree.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Verteidigung)\b/g, 'Défense');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Produktion)\b/g, 'Production');
document.body.innerHTML = document.body.innerHTML.replace(/Chefbüro/g, 'Bureau du Chef');
document.body.innerHTML = document.body.innerHTML.replace(/Ausbildungsraum/g, 'Formation');
document.body.innerHTML = document.body.innerHTML.replace(/Waffenkammer/g, 'Fabrique d´armes');
document.body.innerHTML = document.body.innerHTML.replace(/Munitionskammer/g, 'Fabrique de munitions');
document.body.innerHTML = document.body.innerHTML.replace(/Brauerei/g, 'Brasserie');
document.body.innerHTML = document.body.innerHTML.replace(/Kneipe/g, 'Bar');
document.body.innerHTML = document.body.innerHTML.replace(/Schmuggel/g, 'Contrebande');
document.body.innerHTML = document.body.innerHTML.replace(/Waffenlager/g, 'Dépot d´armes');
document.body.innerHTML = document.body.innerHTML.replace(/Munitionsdepot/g, 'Depot de munitions');
document.body.innerHTML = document.body.innerHTML.replace(/Alkohollager/g, 'Depot d´alcool');
document.body.innerHTML = document.body.innerHTML.replace(/Tresorraum/g, 'Coffre fort');
document.body.innerHTML = document.body.innerHTML.replace(/Formationslager/g, 'Boot Camp');
document.body.innerHTML = document.body.innerHTML.replace(/Selbstschussanlagen/g, 'Tir automatique');
document.body.innerHTML = document.body.innerHTML.replace(/Versteckte Minen/g, 'Mines cachées ');
document.body.innerHTML = document.body.innerHTML.replace(/Ehre/g, 'Honneur');
document.body.innerHTML = document.body.innerHTML.replace(/Chemische Formation/g, 'Formation chimique');
document.body.innerHTML = document.body.innerHTML.replace(/Psychisches Training/g, 'Entrainement psychique');
document.body.innerHTML = document.body.innerHTML.replace(/Guerillaausbildung/g, 'Formation guerilla');
document.body.innerHTML = document.body.innerHTML.replace(/Bombenbau/g, 'Construction de bombes');
document.body.innerHTML = document.body.innerHTML.replace(/Schusstraining/g, 'Entrainement au tir');
document.body.innerHTML = document.body.innerHTML.replace(/Kurzwaffenkampf/g, 'Combat à l´arme blanche');
document.body.innerHTML = document.body.innerHTML.replace(/Nahkampf/g, 'Combat au corps a corps');
document.body.innerHTML = document.body.innerHTML.replace(/Gruppenschutz/g, 'Protection de groupe');
document.body.innerHTML = document.body.innerHTML.replace(/Objektbewachung/g, 'Surveillance d´objet');
document.body.innerHTML = document.body.innerHTML.replace(/Informationsbeschaffung/g, 'Obtention d´information');
document.body.innerHTML = document.body.innerHTML.replace(/Schmuggel/g, 'Contrebande');
document.body.innerHTML = document.body.innerHTML.replace(/Basisverwaltung/g, 'Gestion de la base');
document.body.innerHTML = document.body.innerHTML.replace(/Schutzgeldeintreibung/g, 'Recouvrement d´argent racket');
document.body.innerHTML = document.body.innerHTML.replace(/Auftragsplanung/g, 'Planification de mission');
document.body.innerHTML = document.body.innerHTML.replace(/Routenplanung/g, 'Planification de route');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Raum)\b/g, 'Salles');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Stufe)\b/g, 'Niveau');   
}

// Bâtiments
if (location.pathname.search('camps.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gebäude)\b/g, 'Bâtiments');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Raum)\b/g, 'Salles');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Punkte)\b/g, 'Points');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Restdauer)\b/g, 'Temps Restant');
document.body.innerHTML = document.body.innerHTML.replace(/\b(auflösen)\b/g, 'Supprimer');
document.body.innerHTML = document.body.innerHTML.replace(/Änderungen/g, 'Valider'); 
document.body.innerHTML = document.body.innerHTML.replace(/\b(speichern)\b/g, 'changements');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Name)\b/g, 'Nom');
document.body.innerHTML = document.body.innerHTML.replace(/Chefbüro/g, 'Bureau du Chef');
document.body.innerHTML = document.body.innerHTML.replace(/Ausbildungsraum/g, 'Formation');
document.body.innerHTML = document.body.innerHTML.replace(/Waffenkammer/g, 'Fabrique d´armes');
document.body.innerHTML = document.body.innerHTML.replace(/Munitionskammer/g, 'Fabrique de munitions');
document.body.innerHTML = document.body.innerHTML.replace(/Brauerei/g, 'Brasserie');
document.body.innerHTML = document.body.innerHTML.replace(/Kneipe/g, 'Bar');
document.body.innerHTML = document.body.innerHTML.replace(/Schmuggel/g, 'Contrebande');
document.body.innerHTML = document.body.innerHTML.replace(/Waffenlager/g, 'Dépot d´armes');
document.body.innerHTML = document.body.innerHTML.replace(/Munitionsdepot/g, 'Depot de munitions');
document.body.innerHTML = document.body.innerHTML.replace(/Alkohollager/g, 'Depot d´alcool');
document.body.innerHTML = document.body.innerHTML.replace(/Tresorraum/g, 'Coffre fort');
document.body.innerHTML = document.body.innerHTML.replace(/Formationslager/g, 'Camp d´entrainement');
document.body.innerHTML = document.body.innerHTML.replace(/Selbstschussanlagen/g, 'Tir automatique');
document.body.innerHTML = document.body.innerHTML.replace(/Versteckte Minen/g, 'Mines cachées ');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tag)\b/g, 'Jour');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tage)\b/g, 'Jours');
}

// Recherche
if (location.pathname.search('suche.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Suche)\b/g, 'Recherche');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gebäude)\b/g, 'Bâtiment');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler)\b/g, 'Joueur');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianz)\b/g, 'Alliance');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Punkte)\b/g, 'Points');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Suchen)\b/g, 'Recherche');
document.body.innerHTML = document.body.innerHTML.replace(/\b(kein Treffer)\b/g, 'Aucun résultat trouvé!');
}

// Unitinfo
if (location.pathname.search('info.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einheiten)\b/g, 'Unité');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Name)\b/g, 'Nom');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Angriffswert)\b/g, 'Valeur d´attaque');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Verteidigungswert)\b/g, 'Valeur de défense');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Basis)\b/g, 'Base');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Aktuell)\b/g, 'Actuel');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Beschreibung)\b/g, 'Description');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Punkte)\b/g, 'Points');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Voraussetzung)\b/g, 'Pré-requis');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Angriffsbonus)\b/g, 'Bonus d´attaque');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Verteidigungsbonus)\b/g, 'Bonus de défense');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Verbrauch)\b/g, 'Salaire');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Geschwindigkeit)\b/g, 'Vitesse');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ladekapazität)\b/g, 'Cargo capacité');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Stufe)\b/g, 'Niveau');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ehre)\b/g, 'Honneur');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Chemische Formation)\b/g, 'Formation chimique');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Psychisches Training)\b/g, 'Entrainement psychique');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Guerillaausbildung)\b/g, 'Formation guerilla');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bombenbau)\b/g, 'Construction de bombes');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schusstraining)\b/g, 'Entrainement au tir');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kurzwaffenkampf)\b/g, 'Combat à l´arme blanche');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Nahkampf)\b/g, 'Combat au corps a corps');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gruppenschutz)\b/g, 'Protection de groupe');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Objektbewachung)\b/g, 'Surveillance d´objet');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Informationsbeschaffung)\b/g, 'Obtention d´information');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schmuggel)\b/g, 'Contrebande');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Basisverwaltung)\b/g, 'Gestion de la base');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schutzgeldeintreibung)\b/g, 'Recouvrement d´argent racket');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Auftragsplanung)\b/g, 'Planification de mission');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Routenplanung)\b/g, 'Planification de route');
}

// Map
if (location.pathname.search('map.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Stadt)\b/g, 'Ville');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Stadtteil)\b/g, 'Quartier');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Infos)\b/g, 'Infos');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gebäude)\b/g, 'Bâtiments');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler)\b/g, 'Joueur');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Punkte)\b/g, 'Points');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianz)\b/g, 'Alliance');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Aktualisieren)\b/g, 'Valider');
}

// Statistiche
if (location.pathname.search('stats.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(in einem Camp)\b/g, 'dans un bâtiment');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Höchste)\b/g, 'Plus haut');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Raum)\b/g, 'Salles');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ausbildung)\b/g, 'Formation');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Die meisten Einheiten)\b/g, 'Plus grande quantité d´unités');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Anzahl)\b/g, 'Nombre');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ehre)\b/g, 'Honneur');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Chemische Formation)\b/g, 'Formation chimique');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Psychisches Training)\b/g, 'Entrainement psychique');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Guerillaausbildung)\b/g, 'Formation guerilla');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bombenbau)\b/g, 'Construction de bombes');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schusstraining)\b/g, 'Entrainement au tir');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kurzwaffenkampf)\b/g, 'Combat à l´arme blanche');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Nahkampf)\b/g, 'Combat au corps a corps');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gruppenschutz)\b/g, 'Protection de groupe');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Objektbewachung)\b/g, 'Surveillance d´objet');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Informationsbeschaffung)\b/g, 'Obtention d´information');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schmuggel)\b/g, 'Contrebande');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Basisverwaltung)\b/g, 'Gestion de la base');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schutzgeldeintreibung)\b/g, 'Recouvrement d´argent racket');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Auftragsplanung)\b/g, 'Planification de mission');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Routenplanung)\b/g, 'Planification de route');
}

// Target List - Lista farm
if (location.pathname.search('targetlist.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Los)\b/g, 'Aller');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gebäude)\b/g, 'Bâtiment');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Zielname)\b/g, 'Nom de la cible');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler)\b/g, 'Joueur');
document.body.innerHTML = document.body.innerHTML.replace(/\b(löschen)\b/g, 'Supprimer');
}

// Bounty
if (location.pathname.search('bounty*') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(vergeben)\b/g, '(offrir prime)');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Top 50 Kopfgelder)\b/g, 'Primes - Top 50');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Rohstoff)\b/g, 'Ressources');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Pott)\b/g, 'Prix');
document.body.innerHTML = document.body.innerHTML.replace(/\b(auszahlen)\b/g, 'Payer');
document.body.innerHTML = document.body.innerHTML.replace(/\b(erarbeitetes Kopfgeld)\b/g, 'Récompense Gagné');
document.body.innerHTML = document.body.innerHTML.replace(/\b(zahl mich aus)\b/g, 'Donnez-moi la récompense');
document.body.innerHTML = document.body.innerHTML.replace(/suchen/g, 'Recherche');
document.body.innerHTML = document.body.innerHTML.replace(/\b(für)\b/g, 'pour');
document.body.innerHTML = document.body.innerHTML.replace(/\b(aktuell)\b/g, 'current');
document.body.innerHTML = document.body.innerHTML.replace(/\b(hinzugeben)\b/g, 'additionner');
document.body.innerHTML = document.body.innerHTML.replace(/\b(maximal)\b/g, 'maximum');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einheitenpunkte)\b/g, 'Points d´Unités');
document.body.innerHTML = document.body.innerHTML.replace(/\b(aussetzen)\b/g, '(établir)');
document.body.innerHTML = document.body.innerHTML.replace(/\b(erarbeitetes)\b/g, 'Gagné');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Topf ausbezahlen)\b/g, 'Collection de la Récompense');
}

// Alliance
if (location.pathname.search('ally.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Diplomatie)\b/g, 'Diplomatie');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Mitglied)\b/g, 'Membre');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Mitglieder)\b/g, 'Membres');
document.body.innerHTML = document.body.innerHTML.replace(/\b(senden)\b/g, 'Envoyer');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Nachricht schreiben)\b/g, 'Nouveau Message');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianz verlassen)\b/g, 'Abandonner l´Alliance');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianz)\b/g, 'Alliance');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianzbeschreibung)\b/g, 'Description de l´Alliance');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Keine Beschreibung)\b/g, 'Aucune Description');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Es liegen keine Bewerbungen vor)\b/g, 'Il n´y a pas de nouvelles candidatures');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianzeinstellungen)\b/g, 'Définitions de l´Alliance');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Membres verwalten)\b/g, 'Gérer Membres');
document.body.innerHTML = document.body.innerHTML.replace(/\b(von)\b/g, 'de');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Nachricht)\b/g, 'Message');
document.body.innerHTML = document.body.innerHTML.replace(/\b(auflösen)\b/g, 'dissolution');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Keine Homepage)\b/g, 'Aucune Homepage');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Alliance wirklich dissolution)\b/g, 'Voulez-vous vraiment de dissoudre l´Alliance');
document.body.innerHTML = document.body.innerHTML.replace(/\b(gründen)\b/g, 'créer');
document.body.innerHTML = document.body.innerHTML.replace(/\b(suchen)\b/g, 'rechercher');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bewerbung)\b/g, 'Candidature');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bewerbungstext)\b/g, 'Texte de la Candidature');
document.body.innerHTML = document.body.innerHTML.replace(/\b(zurück ziehen)\b/g, 'annuler');
document.body.innerHTML = document.body.innerHTML.replace(/\b(zurück gezogen)\b/g, 'annulé');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Es liegen Bewerbungen vor)\b/g, 'Nouvelles Candidatures');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler)\b/g, 'Joueur');
document.body.innerHTML = document.body.innerHTML.replace(/\b(annehmen)\b/g, 'Accepter');
document.body.innerHTML = document.body.innerHTML.replace(/\b(ablehnen)\b/g, 'Refuser');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Jour)\b/g, 'Tag');
}

// Alliance Foundation
if (location.pathname.search('ally_new.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianz gründen)\b/g, 'Créer Alliance');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianz-Tag)\b/g, 'Tag de l´Alliance');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianz-Name)\b/g, 'Nom de l´Alliance');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Zeichen)\b/g, 'caractères');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gründen)\b/g, 'Créer');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Die Allianz wurde erfolgreich gegründet)\b/g, 'L´Alliance a été créé avec succès');
}

// Alliance Membres
if (location.pathname.search('ally_member.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Mitglieder)\b/g, 'Membres');
document.body.innerHTML = document.body.innerHTML.replace(/\b(rauswerfen)\b/g, 'Expulsion');
}

// Alliance settings
if (location.pathname.search('ally_config.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianzeinstellungen)\b/g, 'Gestion de l´Alliance');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianzbild)\b/g, 'Logo de l´Alliance');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianzbeschreibung)\b/g, 'Description de l´Alliance');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Aktualisieren)\b/g, 'Mettre à jour');
}

// Alliance Diplomatie
if (location.pathname.search('ally_diplo.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianz)\b/g, 'Alliance');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Diplomatie)\b/g, 'Diplomatie');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bestätigung)\b/g, 'Confirmation');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bündnis)\b/g, 'Alliance');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schutzbündnis)\b/g, 'Défensif Alliance');
document.body.innerHTML = document.body.innerHTML.replace(/Nicht/g, 'Non-');
document.body.innerHTML = document.body.innerHTML.replace(/angriffs/g, 'Aggression');
document.body.innerHTML = document.body.innerHTML.replace(/packt/g, ' Pacte');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Geheimbund)\b/g, 'Société Secrète');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Krieg)\b/g, 'Guerre');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Begründung)\b/g, 'Raison');
document.body.innerHTML = document.body.innerHTML.replace(/\b(senden)\b/g, 'Envoyer');
document.body.innerHTML = document.body.innerHTML.replace(/\b(unbestätigt)\b/g, 'non confirmé');
document.body.innerHTML = document.body.innerHTML.replace(/\b(bestätigt)\b/g, 'confirmé');
document.body.innerHTML = document.body.innerHTML.replace(/\b(kündigen)\b/g, 'annuler');
}

// Alliance View
if (location.pathname.search('ally_view.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianz)\b/g, 'Alliance');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Diplomatie)\b/g, 'Diplomatie');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bestätigung)\b/g, 'Confirmation');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bündnis)\b/g, 'Alliance');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schutzbündnis)\b/g, 'Défensif Alliance');
document.body.innerHTML = document.body.innerHTML.replace(/Nicht/g, 'Non-');
document.body.innerHTML = document.body.innerHTML.replace(/angriffs/g, 'Aggression');
document.body.innerHTML = document.body.innerHTML.replace(/packt/g, ' Pacte');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Geheimbund)\b/g, 'Société Secrète');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Krieg)\b/g, 'Guerre');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Begründung)\b/g, 'Raison');
document.body.innerHTML = document.body.innerHTML.replace(/\b(senden)\b/g, 'Envoyer');
document.body.innerHTML = document.body.innerHTML.replace(/\b(unbestätigt)\b/g, 'non confirmé');
document.body.innerHTML = document.body.innerHTML.replace(/\b(bestätigt)\b/g, 'confirmé');
document.body.innerHTML = document.body.innerHTML.replace(/\b(kündigen)\b/g, 'annuler');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Mitglieder)\b/g, 'Membres');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianzbeschreibung)\b/g, 'Description de l´Alliance');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Keine Homepage)\b/g, 'Aucune Homepage');
document.body.innerHTML = document.body.innerHTML.replace(/\b(bewerben)\b/g, 'Appliquer');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Mitglied)\b/g, 'Membre');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Keine Beschreibung)\b/g, 'Aucune Description');
}

// Logout
if (location.pathname.search('logout.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/Zur Startseite wechseln/g, 'Aller à la page d´Accueil');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Sie sind jetzt erfolgreich augeloggt)\b/g, 'Vous êtes maintenant déconnecté avec succès');
}

// Ally join
if (location.pathname.search('ally_join.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bewerbung)\b/g, 'Candidature');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bewerbungstext)\b/g, 'Texte de la Candidature');
document.body.innerHTML = document.body.innerHTML.replace(/\b(bewerben)\b/g, 'Appliquer');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Du hast dich Erfolgreich bei der Allianz beworben)\b/g, 'Votre Candidature a été envoyée avec succès');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Jetzt müssen sie nur noch zustimmen)\b/g, 'Maintenant, vous avez qu´a attendre l´acceptation');
}

// Ressources
if (location.pathname.search('res.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Grundeinkommen)\b/g, 'Salaire de Base');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Lagerkapazität)\b/g, 'Capacité de Stockage');
document.body.innerHTML = document.body.innerHTML.replace(/\b(davon sicher untergebracht)\b/g, 'stockées en sécurité');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Waffenkammer)\b/g, 'Fabrique d´armes');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Munitionskammer)\b/g, 'Fabrique de munitions');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Brauerei)\b/g, 'Brasserie');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kneipe)\b/g, 'Bar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schmuggel)\b/g, 'Contrebande');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Stunde)\b/g, '(Heure)');
}

// Missions
if (location.pathname.search('unit.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Geschwindigkeit)\b/g, 'Vitesse');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Neuen Einsatz planen)\b/g, 'Planification d´une nouvelle mission');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Zielcamp)\b/g, 'Bâtiment Cible');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Auftrag)\b/g, 'Mission');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Angreifen)\b/g, 'Attaquer');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einheiten stationieren)\b/g, 'Baser');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ressources Transportieren)\b/g, 'Transporter');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bâtiments besetzen)\b/g, 'Occuper');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Nur bei Transport und Stationieren)\b/g, 'Seulement pour Transporter et Baser');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Aktualisieren)\b/g, 'Actualiser');
document.body.innerHTML = document.body.innerHTML.replace(/\b(senden)\b/g, 'Envoyer');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Entfernung)\b/g, 'Distance');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einsatzkosten)\b/g, 'Coûts');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ladekapazität)\b/g, 'Cargo capacité');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einsatzzeit)\b/g, 'Duration de la Mission');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ankunft)\b/g, 'Arrivée');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einsatzdaten)\b/g, 'Sommaire de la Mission');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Keine Einheiten)\b/g, 'Aucune Unité');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einheiten)\b/g, 'Unités');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Anzahl)\b/g, 'Nombre');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gebäude)\b/g, 'Bâtiment');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Angriffswert)\b/g, 'Valeur d´attaque');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Verteidigungswert)\b/g, 'Valeur de défense');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler)\b/g, 'Joueur');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Deine Unités machen sich auf den Weg)\b/g, 'Vos unités sont en route');
}

// Messages
if (location.pathname.search('msg.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bauabschluss)\b/g, 'Constructions terminées');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spielernachrichten)\b/g, 'Messages de Joueurs');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kampfberichte)\b/g, 'Rapports de Combat');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Nachricht schreiben)\b/g, 'Ecrire un Message');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einsatzberichte)\b/g, 'Rapports d´Utilisation');
}

// Messages box
if (location.pathname.search('msg_read.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/Chefbüro/g, 'Bureau du Chef');
document.body.innerHTML = document.body.innerHTML.replace(/Ausbildungsraum/g, 'Formation');
document.body.innerHTML = document.body.innerHTML.replace(/Waffenkammer/g, 'Fabrique d´armes');
document.body.innerHTML = document.body.innerHTML.replace(/Munitionskammer/g, 'Fabrique de munitions');
document.body.innerHTML = document.body.innerHTML.replace(/Brauerei/g, 'Brasserie');
document.body.innerHTML = document.body.innerHTML.replace(/Kneipe/g, 'Bar');
document.body.innerHTML = document.body.innerHTML.replace(/Schmuggel/g, 'Contrebande');
document.body.innerHTML = document.body.innerHTML.replace(/Waffenlager/g, 'Dépot d´armes');
document.body.innerHTML = document.body.innerHTML.replace(/Munitionsdepot/g, 'Depot de munitions');
document.body.innerHTML = document.body.innerHTML.replace(/Alkohollager/g, 'Depot d´alcool');
document.body.innerHTML = document.body.innerHTML.replace(/Tresorraum/g, 'Coffre fort');
document.body.innerHTML = document.body.innerHTML.replace(/Formationslager/g, 'Boot Camp');
document.body.innerHTML = document.body.innerHTML.replace(/Selbstschussanlagen/g, 'Tir automatique');
document.body.innerHTML = document.body.innerHTML.replace(/Versteckte Minen/g, 'Mines cachées ');
document.body.innerHTML = document.body.innerHTML.replace(/Ehre/g, 'Honneur');
document.body.innerHTML = document.body.innerHTML.replace(/Chemische Formation/g, 'Formation chimique');
document.body.innerHTML = document.body.innerHTML.replace(/Psychisches Training/g, 'Entrainement psychique');
document.body.innerHTML = document.body.innerHTML.replace(/Guerillaausbildung/g, 'Formation guerilla');
document.body.innerHTML = document.body.innerHTML.replace(/Bombenbau/g, 'Construction de bombes');
document.body.innerHTML = document.body.innerHTML.replace(/Schusstraining/g, 'Entrainement au tir');
document.body.innerHTML = document.body.innerHTML.replace(/Kurzwaffenkampf/g, 'Combat à l´arme blanche');
document.body.innerHTML = document.body.innerHTML.replace(/Nahkampf/g, 'Combat au corps a corps');
document.body.innerHTML = document.body.innerHTML.replace(/Gruppenschutz/g, 'Protection de groupe');
document.body.innerHTML = document.body.innerHTML.replace(/Objektbewachung/g, 'Surveillance d´objet');
document.body.innerHTML = document.body.innerHTML.replace(/Informationsbeschaffung/g, 'Obtention d´information');
document.body.innerHTML = document.body.innerHTML.replace(/Schmuggel/g, 'Contrebande');
document.body.innerHTML = document.body.innerHTML.replace(/Basisverwaltung/g, 'Gestion de la base');
document.body.innerHTML = document.body.innerHTML.replace(/Schutzgeldeintreibung/g, 'Recouvrement d´argent racket');
document.body.innerHTML = document.body.innerHTML.replace(/Auftragsplanung/g, 'Planification de mission');
document.body.innerHTML = document.body.innerHTML.replace(/Routenplanung/g, 'Planification de route');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Chefbüro)\b/g, 'Bureau du Chef');
document.body.innerHTML = document.body.innerHTML.replace(/Ausbildungsraum/g, 'Formation');
document.body.innerHTML = document.body.innerHTML.replace(/Waffenkammer/g, 'Fabrique d´armes');
document.body.innerHTML = document.body.innerHTML.replace(/Munitionskammer/g, 'Fabrique de munitions');
document.body.innerHTML = document.body.innerHTML.replace(/Brauerei/g, 'Brasserie');
document.body.innerHTML = document.body.innerHTML.replace(/Kneipe/g, 'Bar');
document.body.innerHTML = document.body.innerHTML.replace(/Schmuggel/g, 'Contrebande');
document.body.innerHTML = document.body.innerHTML.replace(/Waffenlager/g, 'Dépot d´armes');
document.body.innerHTML = document.body.innerHTML.replace(/Munitionsdepot/g, 'Depot de munitions');
document.body.innerHTML = document.body.innerHTML.replace(/Alkohollager/g, 'Depot d´alcool');
document.body.innerHTML = document.body.innerHTML.replace(/Tresorraum/g, 'Coffre fort');
document.body.innerHTML = document.body.innerHTML.replace(/Formationslager/g, 'Boot Camp');
document.body.innerHTML = document.body.innerHTML.replace(/Selbstschussanlagen/g, 'Tir automatique');
document.body.innerHTML = document.body.innerHTML.replace(/Versteckte Minen/g, 'Mines cachées ');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ausbau)\b/g, ': expansion');
document.body.innerHTML = document.body.innerHTML.replace(/\b(erfolgreich)\b/g, 'enfin'); 
document.body.innerHTML = document.body.innerHTML.replace(/\b(abgeschlossen)\b/g, 'construit');  
document.body.innerHTML = document.body.innerHTML.replace(/\b(ausgebildet)\b/g, 'formés');
document.body.innerHTML = document.body.innerHTML.replace(/\b(mal)\b/g, 'unités de');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Betreff)\b/g, 'Sujet');
document.body.innerHTML = document.body.innerHTML.replace(/\b(von)\b/g, 'De');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Datum)\b/g, 'Date');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Markierte)\b/g, 'Supprimer');
document.body.innerHTML = document.body.innerHTML.replace(/\b(löschen)\b/g, 'Sélectionné');
document.body.innerHTML = document.body.innerHTML.replace(/\b(kein)\b/g, 'No');
document.body.innerHTML = document.body.innerHTML.replace(/\b(erforscht)\b/g, 'terminé');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kampfbericht)\b/g, 'Rapport de Combat');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kampfrunde)\b/g, 'Tour de Combat');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einheiten)\b/g, 'Troupes');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Anzahl)\b/g, 'Nombre');
document.body.innerHTML = document.body.innerHTML.replace(/\b(vernichtet)\b/g, 'Détruit');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Angriffswert)\b/g, 'Valeur d´attaque');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Verteidigungswert)\b/g, 'Valeur de défense');
document.body.innerHTML = document.body.innerHTML.replace(/\b(erbeutete)\b/g, 'Capturé');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Siegchance)\b/g, 'Chances de Gagner');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Espionagechance)\b/g, 'Chances d´Espionnage');
document.body.innerHTML = document.body.innerHTML.replace(/\b(im Forum speichern)\b/g, 'Enregistrer (sur le forum)');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Neu)\b/g, 'Nouveau');
document.body.innerHTML = document.body.innerHTML.replace(/\b(AW)\b/g, 'Citer');
document.body.innerHTML = document.body.innerHTML.replace(/\b(in)\b/g, 'dans');
}

// Messages Writing
if (location.pathname.search('msg_write.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ursprüngliche Nachricht)\b/g, 'Message Original');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Von)\b/g, 'De');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gesendet)\b/g, 'Reçu le');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Los)\b/g, 'Envoyer');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Datum)\b/g, 'Date');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Betreff)\b/g, 'Sujet');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Empfänger)\b/g, 'Pour');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Nachricht)\b/g, 'Message');
document.body.innerHTML = document.body.innerHTML.replace(/\b(schreiben)\b/g, 'Éditeur');
document.body.innerHTML = document.body.innerHTML.replace(/\b(erfolgreich)\b/g, 'envoyé');
document.body.innerHTML = document.body.innerHTML.replace(/eingetragen/g, 'avec succès');
}

// Highscore
if (location.pathname.search('score.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Punkte)\b/g, 'Points');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ausbildung)\b/g, 'Formation');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gebäude)\b/g, 'Bâtiments');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einheiten)\b/g, 'Unités');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianzen)\b/g, 'Alliance');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Titel)\b/g, 'Titre');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler 7 Tage inaktiv)\b/g, 'Joueur inactif 7 jours');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler 14 Tage inaktiv)\b/g, 'Joueur inactif 14 jours');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler im Urlaub)\b/g, 'Joueur en mode vacances');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler gesperrt)\b/g, 'Joueur banni');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler)\b/g, 'Joueur');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Anzahl)\b/g, 'Nombre');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianz)\b/g, 'Alliance');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Mitglieder)\b/g, 'Membres');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Durchschnitt)\b/g, 'Moyenne');
}

// Friends
if (location.pathname.search('buddy.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler hinzufügen)\b/g, 'Additionner Joueur');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Anfragen von Spielern)\b/g, 'Demandes provenant d´autres Joueurs');
document.body.innerHTML = document.body.innerHTML.replace(/\b(löschen)\b/g, 'Supprimer');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Als Online werden alle Amis angezeigt)\b/g, 'Sont affichés les amis en ligne');
document.body.innerHTML = document.body.innerHTML.replace(/\b(welche in den letzten 15 Minuten)\b/g, 'qui avait effectué au moins une action ');
document.body.innerHTML = document.body.innerHTML.replace(/\b(mindestens eine Aktion durchgeführt hatten)\b/g, 'dans les 15 dernières minutes');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Du hast noch keine bestätigten Friends)\b/g, 'Vous n´avez pas d´amis confirmés actuellement');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Als Freund einladen)\b/g, 'Invite as a Friend');
document.body.innerHTML = document.body.innerHTML.replace(/\b(unbestätigt)\b/g, 'non confirmée');
document.body.innerHTML = document.body.innerHTML.replace(/\b(bestätigen)\b/g, 'accepter');
document.body.innerHTML = document.body.innerHTML.replace(/\b(ablehnen)\b/g, 'refuser');
}

// Chat
if (location.pathname.search('chat.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Flüstern)\b/g, 'Murmurer');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Nachricht)\b/g, 'Message');
document.body.innerHTML = document.body.innerHTML.replace(/Sagen/g, 'Envoyer');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Unsichtbare)\b/g, 'Invisible');
document.body.innerHTML = document.body.innerHTML.replace(/\b(online Anzeige)\b/g, 'Annonce en ligne');
document.body.innerHTML = document.body.innerHTML.replace(/\b(in den Chat schreiben)\b/g, 'taper dans le chat');
}

// OPTIONS (Settings)
if (location.pathname.search('config.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Du kannst erst wieder in)\b/g, 'Vous devez attendre');
document.body.innerHTML = document.body.innerHTML.replace(/\b(deinen Namen ändern)\b/g, 'pour être autorisé à changer votre Pseudo');
document.body.innerHTML = document.body.innerHTML.replace(/\b(senden)\b/g, 'Sauvegarder');
document.body.innerHTML = document.body.innerHTML.replace(/\b(weitere)\b/g, ' ');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allgemeine)\b/g, 'Général');
document.body.innerHTML = document.body.innerHTML.replace(/allgemeine/g, 'Général');
document.body.innerHTML = document.body.innerHTML.replace(/\b(IP-Sharing melden)\b/g, 'Signaler IP-sharing');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spielername)\b/g, 'Pseudo');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Accountsicherheit)\b/g, ': sécurité de la compte');
document.body.innerHTML = document.body.innerHTML.replace(/\b(IP-Bindung)\b/g, 'Bloquer IP');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Cookie-Bindung)\b/g, 'Bloquer Cookies');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Autologout)\b/g, 'Déconnexion Automatique');
document.body.innerHTML = document.body.innerHTML.replace(/\b(aus)\b/g, 'Off');
document.body.innerHTML = document.body.innerHTML.replace(/\b(an)\b/g, 'On');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Nachricht)\b/g, 'Message');
document.body.innerHTML = document.body.innerHTML.replace(/\b(bei Angriff)\b/g, 'D´attaques');
document.body.innerHTML = document.body.innerHTML.replace(/\b(bei Stationieren)\b/g, 'Des stations');
document.body.innerHTML = document.body.innerHTML.replace(/\b(bei Transport)\b/g, 'Des Transports');
document.body.innerHTML = document.body.innerHTML.replace(/\b(bei Campgründung)\b/g, 'Des occupations');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Sichtbar in Useronlineliste)\b/g, 'Visible sur la liste de Users-en-ligne');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Sortierung der Camps)\b/g, 'Ordre des Bâtiments');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Sortiermethode)\b/g, 'Ordre par');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gründung)\b/g, 'Occupation');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Koordinaten)\b/g, 'Coordonnées');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Aufsteigend)\b/g, 'Ordre ascendant');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Absteigend)\b/g, 'Ordre descendant');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Urlaubsmodus)\b/g, 'Mode vacances');
document.body.innerHTML = document.body.innerHTML.replace(/\b(aktivieren)\b/g, 'activation');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Empfohlen)\b/g, 'Recommandé');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Alle Options auf)\b/g, 'Choisissez l´option');
document.body.innerHTML = document.body.innerHTML.replace(/\b(lassen)\b/g, 'pour tous');
document.body.innerHTML = document.body.innerHTML.replace(/\b(In der Zeit in dem du im Urlaub bist kannst du nicht angegriffen werden und es können auch keine anderen Missions zu dir gestartet werden)\b/g, 'Pendant le temps que vous êtes en vacances, vous ne pouvez pas être attaqué et il n´est pas possible aussi lancer quelqu´autre mission par vous');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Du produzierst in dieser Zeit keine Ressources und die Bauarbeiten On Einheiten, Gebäuden und Forschungen werden ebenfalls eingestellt)\b/g, 'Pendant ce temps, vous ne produisez pas des ressources et l´expansion de les Bâtiments, des Formations ou construction de Troupes n´est pas possible');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Den Mode vacances kannst du erst)\b/g, 'Vous pouvez seulement activer le mode de vacances autre fois');
document.body.innerHTML = document.body.innerHTML.replace(/\b(nach dem activation wieder beenden)\b/g, 'après qu´il se termine');
document.body.innerHTML = document.body.innerHTML.replace(/\b(wirklich)\b/g, 'SÉRIEUX');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tag)\b/g, 'Jour');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tage)\b/g, 'Jours');
}

// OPTIONS (IP-Sharing)
if (location.pathname.search('config_sharing.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(weitere)\b/g, ' ');
document.body.innerHTML = document.body.innerHTML.replace(/allgemeine/g, 'Général');
document.body.innerHTML = document.body.innerHTML.replace(/\b(IP-Sharing melden)\b/g, 'Signaler IP-sharing');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Neues Sharing hinzufügen)\b/g, 'Ajouter un nouveau IP-Sharing');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Aktuelle Sharings)\b/g, 'Sharings Actuelles');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ende)\b/g, 'Terminant en');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Begründung)\b/g, 'Raison');
document.body.innerHTML = document.body.innerHTML.replace(/\b(senden)\b/g, 'Envoyer');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Von)\b/g, 'De');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Mit)\b/g, 'Pour');
document.body.innerHTML = document.body.innerHTML.replace(/\b(erfolgreich gemeldet)\b/g, 'signalé avec succès');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Januar)\b/g, 'Janvier');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Februar)\b/g, 'Février');
document.body.innerHTML = document.body.innerHTML.replace(/\b(März)\b/g, 'Mars');
document.body.innerHTML = document.body.innerHTML.replace(/\b(April)\b/g, 'Avril');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Mai)\b/g, 'Mai');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Juni)\b/g, 'Juin');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Juli)\b/g, 'Juillet');
document.body.innerHTML = document.body.innerHTML.replace(/\b(August)\b/g, 'Août');
document.body.innerHTML = document.body.innerHTML.replace(/\b(September)\b/g, 'Septembre');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Oktober)\b/g, 'Octobre');
document.body.innerHTML = document.body.innerHTML.replace(/\b(November)\b/g, 'Novembre');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Dezember)\b/g, 'Décembre');
}

// Immages
if (location.pathname.search('img.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Image Upload)\b/g, 'Image Upload');
document.body.innerHTML = document.body.innerHTML.replace(/\b(von)\b/g, 'de');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bildern)\b/g, 'Images');
document.body.innerHTML = document.body.innerHTML.replace(/\b(hochladen)\b/g, 'télécharger');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Hochgeladene Bilder)\b/g, 'Images Téléchargées');
document.body.innerHTML = document.body.innerHTML.replace(/\b(löschen)\b/g, 'supprimer');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Das Bild was du télécharger)\b/g, 'Les images pour être téléchargées');
document.body.innerHTML = document.body.innerHTML.replace(/\b(möchtest darf Maximal)\b/g, 'ne peut pas excéder');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Pixel)\b/g, 'Pixels');
document.body.innerHTML = document.body.innerHTML.replace(/\b(groß sein)\b/g, '(dimensions maximales)');
document.body.innerHTML = document.body.innerHTML.replace(/\b(ein Maximale Dateigröße)\b/g, 'et une taille de fichier maximale');
document.body.innerHTML = document.body.innerHTML.replace(/\b(haben und im Format)\b/g, '(formats autorisés:');
document.body.innerHTML = document.body.innerHTML.replace(/\b(oder)\b/g, 'ou');
document.body.innerHTML = document.body.innerHTML.replace(/\b( vorliegen)\b/g, ')');
}

// Giocatore - info click su player
if (location.pathname.search('player.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gebäude)\b/g, 'Bâtiments');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler)\b/g, 'Joueur');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Punkte)\b/g, 'Points');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Camps)\b/g, 'de Bâtiments');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Forschung)\b/g, 'de Formations');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einheiten)\b/g, 'de Unités');
document.body.innerHTML = document.body.innerHTML.replace(/\b(aussetzen)\b/g, '(montrer)');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Nachricht schreiben)\b/g, 'Envoyer Message');
}

// Menu other resources
document.body.innerHTML = document.body.innerHTML.replace(/\b(Name)\b/g, 'Nom');    
document.body.innerHTML = document.body.innerHTML.replace(/\b(Serverzeit)\b/g, 'Heure (Server)');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Waffen)\b/g, 'Armes');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Munition)\b/g, 'Munitions');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Alkohol)\b/g, 'Alcool');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Dollar)\b/g, 'Dollars');

// Others and Eventual
document.body.innerHTML = document.body.innerHTML.replace(/Fehler!/g, 'Erreur!');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Seitenaufbau in)\b/g, 'Page loaded in');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Sekunden)\b/g, 'Seconds');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Du hast hier kein)\b/g, 'Vous n´avez pas:');
document.body.innerHTML = document.body.innerHTML.replace(/Erfolgreich!/g, 'Fait!');
document.body.innerHTML = document.body.innerHTML.replace(/\b(registrieren)\b/g, 'S´inscrire');
document.body.innerHTML = document.body.innerHTML.replace(/\b(passwort vergessen)\b/g, 'Mot de passe perdu?');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Globale Accountverwaltung)\b/g, 'Global Account Management');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler)\b/g, 'Joueurs');
document.body.innerHTML = document.body.innerHTML.replace(/\b(registriert)\b/g, 'enregistré');
document.body.innerHTML = document.body.innerHTML.replace(/\b(spielername)\b/g, 'Nom d´utilisateur');
document.body.innerHTML = document.body.innerHTML.replace(/\b(passwort)\b/g, 'Mot de passe');
document.body.innerHTML = document.body.innerHTML.replace(/\b(anmelden)\b/g, 'registre');
document.body.innerHTML = document.body.innerHTML.replace(/\b(vergessen)\b/g, 'perdu?');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Willkommen bei)\b/g, 'Bienvenue à');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Was erwartet dich)\b/g, 'Qu´attendez-vous?');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Platz für)\b/g, 'Place pour');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einheiten)\b/g, 'Unités d´attaque');
document.body.innerHTML = document.body.innerHTML.replace(/\b(defensive Jungs)\b/g, 'Unités défensives');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ausbildungen)\b/g, 'Formations');
document.body.innerHTML = document.body.innerHTML.replace(/\b(informationen)\b/g, 'Information');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler)\b/g, 'Joueurs');
document.body.innerHTML = document.body.innerHTML.replace(/\b(pranger)\b/g, 'Ban Liste');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Grund)\b/g, 'Raison');
document.body.innerHTML = document.body.innerHTML.replace(/\b(gesperrt)\b/g, 'Banni');
document.body.innerHTML = document.body.innerHTML.replace(/\b(bis)\b/g, 'Jusqu´à');
document.body.innerHTML = document.body.innerHTML.replace(/\b(registrieren)\b/g, 'inscription');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Urlaubsmodus)\b/g, 'Mode Vacances');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Du befindest dich zur Zeit noch im Urlaub)\b/g, 'Vous êtes encore en vacances dans ce moment');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Du musst noch)\b/g, 'Vous devez encore attendre');
document.body.innerHTML = document.body.innerHTML.replace(/\b(warten Jusqu´à du den Urlaub beenden kannst)\b/g, 'jusqu´à la fin de vos vacances');

})();
