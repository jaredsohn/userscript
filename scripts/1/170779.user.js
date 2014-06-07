// ==UserScript==
// @name        stiddari.de (English Version)
// @namespace   http://userscripts.org/users/513921
// @author Spar7acus
// @description Translates the game from German to English
// @include     http://test.de.stiddari.com*
// @include     http://ravengames.de*
// @include     http://www.ravengames.de*
// @version     1
// ==/UserScript==
//



(function() {

// HOME
if (location.pathname.search('index.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(spielername)\b/g, 'Username');
document.body.innerHTML = document.body.innerHTML.replace(/\b(passwort)\b/g, 'Password');
document.body.innerHTML = document.body.innerHTML.replace(/\b(anmelden)\b/g, 'Register');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Password vergessen)\b/g, 'Forgot your Password?');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Willkommen bei)\b/g, 'Welcome to');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Was erwartet dich)\b/g, 'What are you waiting for');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Platz für)\b/g, 'Place for');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einheiten)\b/g, 'Attack Units');
document.body.innerHTML = document.body.innerHTML.replace(/\b(defensive Jungs)\b/g, 'Defensive Units');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ausbildungen)\b/g, 'Trainings');
document.body.innerHTML = document.body.innerHTML.replace(/\b(informationen)\b/g, 'Information');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler)\b/g, 'Players');
document.body.innerHTML = document.body.innerHTML.replace(/\b(pranger)\b/g, 'Ban List');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Grund)\b/g, 'Reason');
document.body.innerHTML = document.body.innerHTML.replace(/\b(gesperrt)\b/g, 'Banned');
document.body.innerHTML = document.body.innerHTML.replace(/\b(bis)\b/g, 'Until');
document.body.innerHTML = document.body.innerHTML.replace(/\b(registrieren)\b/g, 'Register');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Wenn Du bereits einen Account bei einem der Spiele unter)\b/g, 'If you already have an account in one of the following');
document.body.innerHTML = document.body.innerHTML.replace(/\b(hast oder hattest, dann brauchst Du dir keinen neuen erstellen)\b/g, 'then you do not need to create a new one');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Auch kannst Du dich mit deinem globalen Account)\b/g, 'You also can login with this same account register in the forum,');
document.body.innerHTML = document.body.innerHTML.replace(/\b(im Forum Register und brauchst dich dort nicht mehr Register)\b/g, 'not needing to make any other register');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Dein Account ist global und in allen dieser Spiele zu erreichen)\b/g, 'Your account is global and it gives you instant access to all of these games');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Globale Accountverwaltung)\b/g, 'Global Account Management');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Loginname)\b/g, 'Username');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Passwort)\b/g, 'Password');
document.body.innerHTML = document.body.innerHTML.replace(/\b(wiederholen)\b/g, 'Confirm Password');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Hiermit akzeptiere ich die)\b/g, 'I accept the terms and conditions in');
document.body.innerHTML = document.body.innerHTML.replace(/\b(oder)\b/g, 'or');
document.body.innerHTML = document.body.innerHTML.replace(/\b(senden)\b/g, 'send');
document.body.innerHTML = document.body.innerHTML.replace(/\b(im)\b/g, 'in');
document.body.innerHTML = document.body.innerHTML.replace(/\b(registrierte)\b/g, 'registered');
document.body.innerHTML = document.body.innerHTML.replace(/\b(spieler)\b/g, 'players');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tage)\b/g, 'Days');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tag)\b/g, 'Day');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Planeten)\b/g, 'Planets');
document.body.innerHTML = document.body.innerHTML.replace(/\b(E-Mailadresse)\b/g, 'Email');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Hier kannst du dir ein neues Password für deinen Account zuschicken lassen)\b/g, 'Here you can send a new password for your account');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Dieses gilt für die Spiel, Foren und für die Globale Spielerverwaltung)\b/g, 'This applies to the games, forums and for the Global Account Management');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Um die Passwörter in den Foren zu den Spielen zu ändern)\b/g, 'To change the passwords for the games and forums');
document.body.innerHTML = document.body.innerHTML.replace(/\b(logg dich bitte mit deinem Password in die Globale Spielerverwaltung ein)\b/g, 'please login with your password in the Global Account Management');

document.body.innerHTML = document.body.innerHTML.replace(/\b(einstellungen)\b/g, 'settings');
document.body.innerHTML = document.body.innerHTML.replace(/\b(bewerbung)\b/g, 'application form');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Accountdaten)\b/g, 'Account Data');
document.body.innerHTML = document.body.innerHTML.replace(/\b(UserID)\b/g, 'User ID');
document.body.innerHTML = document.body.innerHTML.replace(/\b(LoginName)\b/g, 'Username');
document.body.innerHTML = document.body.innerHTML.replace(/\b(E-Mail)\b/g, 'Email');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Premium Punkte)\b/g, 'Premium Points');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Password ändern)\b/g, 'Change Password');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Aktuelles)\b/g, 'Current Password');
document.body.innerHTML = document.body.innerHTML.replace(/\b(neues)\b/g, 'New Password');
document.body.innerHTML = document.body.innerHTML.replace(/ändern/g, 'Change');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Das neue Password stimmt nicht mit der Wiederholung überein)\b/g, 'The passwords entered do not match');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Das aktuelle Password wurde falsch eingegeben)\b/g, 'The current password was entered incorrectly');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Das Password wurde erfolgreich geändert)\b/g, 'The password has been changed successfully');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Du hast dich erfolgreich ausgeloggt)\b/g, 'You have successfully logged out');
document.body.innerHTML = document.body.innerHTML.replace(/\b(weiter)\b/g, 'further');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Es wurde dir ein Link zum bestätigen an deine eingetragene Email Adresse gesendet)\b/g, 'It has been sent an email to you with a confirmation link that allows you to request a new password');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Hier kannst du dein neuen Passwort eingeben)\b/g, 'Here you can enter your new password');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kein gültiger Auftrag zum ändern des Passwortes gefunden)\b/g, 'Invalid data entered');
document.body.innerHTML = document.body.innerHTML.replace(/\b(New Password Password)\b/g, 'New Password');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Password Confirm Password)\b/g, 'Confirm Password');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Hier kannst du dein neuen Password eingeben)\b/g, 'Here you can enter your new password');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Es muss mindestens 6 Zeichen haben und ist sofort gültig)\b/g, 'The Password must be composed by at least 6 characters');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Das Password muss mindestens 6 Zeichen lang sein)\b/g, 'The password must be at least 6 characters long');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Die Passwörter stimmen nicht überein)\b/g, 'The entered passwords do not match');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spiel)\b/g, 'Game');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Wohnort)\b/g, 'Address');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Land)\b/g, 'Country');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Geburtsdatum)\b/g, 'Date of birth');
document.body.innerHTML = document.body.innerHTML.replace(/\b(TT-MM-JJJJ)\b/g, 'DD-MM-YYYY');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Personalausweis)\b/g, 'ID card number');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spiele seit ca)\b/g, 'Other games played');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bewerbung)\b/g, 'Application');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Absenden)\b/g, 'Submit');
}


// Menu
document.body.innerHTML = document.body.innerHTML.replace(/Übersicht/g, 'Overview');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Räume im Ausbau)\b/g, 'Rooms under construction');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Räume)\b/g, 'Rooms');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Trainingslager)\b/g, 'Boot Camp');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Objektschutz)\b/g, 'Security');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ausbildung)\b/g, 'Training');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gebäude)\b/g, 'Buildings');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Suche)\b/g, 'Search');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Zielliste)\b/g, 'Farm List');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kopfgeld)\b/g, 'Bounty');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Technik)\b/g, 'Technologies');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianzen)\b/g, 'Alliances');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Rohstoffe)\b/g, 'Resources');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einsätze)\b/g, 'Missions');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Stadtkarte)\b/g, 'City Map');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Nachrichten)\b/g, 'Messages');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Highscore)\b/g, 'Highscore');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Freunde)\b/g, 'Friends');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Statistiken)\b/g, 'Statistics');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Regeln)\b/g, 'Rules');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einstellungen)\b/g, 'Options');
document.body.innerHTML = document.body.innerHTML.replace(/Bilder Upload/g, 'Image Upload');
document.body.innerHTML = document.body.innerHTML.replace(/\b(spenden)\b/g, 'Donate');
document.body.innerHTML = document.body.innerHTML.replace(/Schläger/g, 'Rowdy');
document.body.innerHTML = document.body.innerHTML.replace(/Türsteher/g, 'Bouncer');
document.body.innerHTML = document.body.innerHTML.replace(/Messerstecher/g, 'Knifer');
document.body.innerHTML = document.body.innerHTML.replace(/Revolverheld/g, 'Gunman');
document.body.innerHTML = document.body.innerHTML.replace(/Besetzungstruppe/g, 'Occupation Troop');
document.body.innerHTML = document.body.innerHTML.replace(/Spion/g, 'Spy');
document.body.innerHTML = document.body.innerHTML.replace(/Möbelpacker/g, 'Mover');
document.body.innerHTML = document.body.innerHTML.replace(/CIA Agent/g, 'CIA Agent');
document.body.innerHTML = document.body.innerHTML.replace(/FBI Agent/g, 'FBI Agent');
document.body.innerHTML = document.body.innerHTML.replace(/Scharfschütze/g, 'Sniper');
document.body.innerHTML = document.body.innerHTML.replace(/Transporteur/g, 'Carrier');
document.body.innerHTML = document.body.innerHTML.replace(/Problemlöser/g, 'Tactical Expert');
document.body.innerHTML = document.body.innerHTML.replace(/Profikiller/g, 'Hitman');
document.body.innerHTML = document.body.innerHTML.replace(/Bombenleger/g, 'Demolition Expert');
document.body.innerHTML = document.body.innerHTML.replace(/Söldner/g, 'Mercenary');
document.body.innerHTML = document.body.innerHTML.replace(/Attentäter/g, 'Scout');
document.body.innerHTML = document.body.innerHTML.replace(/Schwarzgeldarbeiter/g, 'Clandestine Worker');
document.body.innerHTML = document.body.innerHTML.replace(/Objektwache/g, 'Safeguard');
document.body.innerHTML = document.body.innerHTML.replace(/Bodyguard/g, 'Bodyguard');
document.body.innerHTML = document.body.innerHTML.replace(/Guarde/g, 'Guard');
document.body.innerHTML = document.body.innerHTML.replace(/Polizist/g, 'Policeman');

// Overview
if (location.pathname.search('overview.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Truppen)\b/g, 'Troops');
document.body.innerHTML = document.body.innerHTML.replace(/\b(der Einheiten)\b/g, 'of the Units');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Keine Einheiten)\b/g, 'No units');
document.body.innerHTML = document.body.innerHTML.replace(/ändern/g, 'Modify');
document.body.innerHTML = document.body.innerHTML.replace(/Truppe/g, 'Troops');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Verteidigung)\b/g, 'Defense');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Punkte)\b/g, 'Points');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Anzahl)\b/g, 'Number');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kampfstärke)\b/g, 'Combat Strength');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einheiten)\b/g, 'Troops');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gesamtübersicht)\b/g, 'General Overview');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Details)\b/g, 'Details');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Transportieren)\b/g, 'Transportation');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Troops stationieren)\b/g, 'Troops Station');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Chefbüro)\b/g, 'Boss Office');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ausbildungsraum)\b/g, 'Training');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Waffenkammer)\b/g, 'Weapons Armoury');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Munitionskammer)\b/g, 'Ammunition Depot');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Brauerei)\b/g, 'Brewery');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kneipe)\b/g, 'Bar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schmuggel)\b/g, 'Smuggle');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Waffenlager)\b/g, 'Weapon Storage');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Munitionsdepot)\b/g, 'Ammunition Storage');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Alkohollager)\b/g, 'Alcohol Storage');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tresorraum)\b/g, 'Safe Room');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Trainingslager)\b/g, 'Boot Camp');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Selbstschussanlagen)\b/g, 'Spring Gun');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Versteckte Minen)\b/g, 'Hidden Mines ');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ehre)\b/g, 'Honor');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Chemische Ausbildung)\b/g, 'Chemical Training');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Psychisches Training)\b/g, 'Psychological Training');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Guerillaasubildung)\b/g, 'Guerilla Training');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bombenbau)\b/g, 'Bomb Construction');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schusstraining)\b/g, 'Firearms Training');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kurzwaffenkampf)\b/g, 'Short-Ranged Weapon Training');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Nahkampf)\b/g, 'Close Combat');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gruppenschutz)\b/g, 'Gang Protection');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Objektbewachung)\b/g, 'Security Patrol');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Informationsbeschaffung)\b/g, 'Information Procurement');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schmuggel)\b/g, 'Smuggling');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Basisverwaltung)\b/g, 'Base Administration');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schutzgeldeintreibung)\b/g, 'Protection Money Encashment');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Auftragsplanung)\b/g, 'Strategies');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Routenplanung)\b/g, 'Routing');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Rückkehr)\b/g, 'Return');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Camp gründen)\b/g, 'Building Occupation');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Angreifen)\b/g, 'Attack');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tag)\b/g, 'Day');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tage)\b/g, 'Days');
}

// General Overview
if (location.pathname.search('empire.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Chefbüro)\b/g, 'Boss Office');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ausbildungsraum)\b/g, 'Training');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Waffenkammer)\b/g, 'Weapons Armoury');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Munitionskammer)\b/g, 'Ammunition Depot');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Brauerei)\b/g, 'Brewery');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kneipe)\b/g, 'Bar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schmuggel)\b/g, 'Smuggle');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Waffenlager)\b/g, 'Weapon Storage');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Munitionsdepot)\b/g, 'Ammunition Storage');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Alkohollager)\b/g, 'Alcohol Storage');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tresorraum)\b/g, 'Safe Room');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Trainingslager)\b/g, 'Boot Camp');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Selbstschussanlagen)\b/g, 'Spring Gun');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Versteckte Minen)\b/g, 'Hidden Mines');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Raum)\b/g, 'Room');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Punkte)\b/g, 'Points');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tag)\b/g, 'Day');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tage)\b/g, 'Days');
}

// Details
if (location.pathname.search('kampftab.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kampfstärke)\b/g, 'Combat Strength');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ehre)\b/g, 'Honor');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Anzahl)\b/g, 'Number of');
}

// Unit Overview
if (location.pathname.search('unitview.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Transportieren)\b/g, 'Transportation');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einheiten stationieren)\b/g, 'Troops Station');
document.body.innerHTML = document.body.innerHTML.replace(/\b(abbrechen)\b/g, 'Cancel');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Truppen)\b/g, 'Troops');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Startgebäude)\b/g, 'Origin');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Zielgebäude)\b/g, 'Destination');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Start)\b/g, 'Departure');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ankunft)\b/g, 'Arrival');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Restdauer)\b/g, 'Remaining Time');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Anzahl)\b/g, 'Number');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Auftrag)\b/g, 'Mission');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einheiten)\b/g, 'Units');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Rückkehr)\b/g, 'Return');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Camp gründen)\b/g, 'Building Occupation');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Keine)\b/g, 'No');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Angreifen)\b/g, 'Attack');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tag)\b/g, 'Day');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tage)\b/g, 'Days');
}

// Rooms
if ((location.pathname.search('konst.php') != -1) || (location.pathname.search('stats.php') != -1)) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Chefbüro)\b/g, 'Boss Office');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ausbildungsraum)\b/g, 'Training');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Waffenkammer)\b/g, 'Weapons Armoury');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Munitionskammer)\b/g, 'Ammunition Depot');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Brauerei)\b/g, 'Brewery');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kneipe)\b/g, 'Bar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schmuggel)\b/g, 'Smuggle');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Waffenlager)\b/g, 'Weapon Storage');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Munitionsdepot)\b/g, 'Ammunition Storage');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Alkohollager)\b/g, 'Alcohol Storage');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tresorraum)\b/g, 'Safe Room');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Trainingslager)\b/g, 'Boot Camp');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Selbstschussanlagen)\b/g, 'Spring Gun');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Versteckte Minen)\b/g, 'Hidden Mines ');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ausbau)\b/g, 'Expansion');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Stufe)\b/g, 'Level');
document.body.innerHTML = document.body.innerHTML.replace(/\b(abbrechen)\b/g, 'cancel');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Raum)\b/g, 'Rooms');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Dauer)\b/g, 'Duration');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tag)\b/g, 'Day');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tage)\b/g, 'Days');
}

// Boot Camp
if ((location.pathname.search('off.php') != -1) || (location.pathname.search('stats.php') != -1)) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schläger)\b/g, 'Rowdy');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Türsteher)\b/g, 'Bouncer');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Messerstecher)\b/g, 'Knifer');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Revolverheld)\b/g, 'Gunman');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Besetzungstruppe)\b/g, 'Occupation Troop');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spion)\b/g, 'Spy');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Möbelpacker)\b/g, 'Mover');
document.body.innerHTML = document.body.innerHTML.replace(/\b(CIA Agent)\b/g, 'CIA Agent');
document.body.innerHTML = document.body.innerHTML.replace(/\b(FBI Agent)\b/g, 'FBI Agent');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Trasporteur)\b/g, 'Carrier');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Problemlöser)\b/g, 'Tactical Expert');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Scharfschütze)\b/g, 'Sniper');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Profikiller)\b/g, 'Hitman');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bombenleger)\b/g, 'Demolition Expert');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Söldner)\b/g, 'Mercenary');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Attentäter)\b/g, 'Scout');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Produktion)\b/g, 'Production');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bauschleife)\b/g, 'Training Queue');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Keine Einheiten)\b/g, 'No orders right now');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Dauer)\b/g, 'Duration');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Los)\b/g, 'Go');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tag)\b/g, 'Day');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tage)\b/g, 'Days');
}

// Security
if (location.pathname.search('deff.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schwarzgeldarbeiter)\b/g, 'Clandestine Worker');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Objektwache)\b/g, 'Safeguard');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bodyguard)\b/g, 'Bodyguard');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Guarde)\b/g, 'Guard');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Polizist)\b/g, 'Policeman');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Verteidigung)\b/g, 'Defense');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bauschleife)\b/g, 'Training Queue');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Keine Einheiten)\b/g, 'No orders right now');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Dauer)\b/g, 'Duration');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Los)\b/g, 'Go');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tag)\b/g, 'Day');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tage)\b/g, 'Days');
}

// Trainings
if (location.pathname.search('forsch.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ehre)\b/g, 'Honor');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Chemische Ausbildung)\b/g, 'Chemical Training');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Psychisches Training)\b/g, 'Psychological Training');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Guerillaausbildung)\b/g, 'Guerilla Training');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bombenbau)\b/g, 'Bomb Construction');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schusstraining)\b/g, 'Firearms Training');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kurzwaffenkampf)\b/g, 'Short-Ranged Weapon Training');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Nahkampf)\b/g, 'Close Combat');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gruppenschutz)\b/g, 'Gang Protection');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Objektbewachung)\b/g, 'Security Patrol');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Informationsbeschaffung)\b/g, 'Information Procurement');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schmuggel)\b/g, 'Smuggling');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Basisverwaltung)\b/g, 'Base Administration');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schutzgeldeintreibung)\b/g, 'Protection Money Encashment');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Auftragsplanung)\b/g, 'Strategies');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Routenplanung)\b/g, 'Routing');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ausbau)\b/g, 'Expansion');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Stufe)\b/g, 'Level');
document.body.innerHTML = document.body.innerHTML.replace(/\b(abbrechen)\b/g, 'cancel');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Dauer)\b/g, 'Duration');
document.body.innerHTML = document.body.innerHTML.replace(/Ausbildungsraum/g, 'Training Room');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tag)\b/g, 'Day');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tage)\b/g, 'Days');
}

// Technologies
if (location.pathname.search('techtree.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Verteidigung)\b/g, 'Defense');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Produktion)\b/g, 'Production');
document.body.innerHTML = document.body.innerHTML.replace(/Chefbüro/g, 'Boss Office');
document.body.innerHTML = document.body.innerHTML.replace(/Ausbildungsraum/g, 'Training');
document.body.innerHTML = document.body.innerHTML.replace(/Waffenkammer/g, 'Weapons Armoury');
document.body.innerHTML = document.body.innerHTML.replace(/Munitionskammer/g, 'Ammunition Depot');
document.body.innerHTML = document.body.innerHTML.replace(/Brauerei/g, 'Brewery');
document.body.innerHTML = document.body.innerHTML.replace(/Kneipe/g, 'Bar');
document.body.innerHTML = document.body.innerHTML.replace(/Schmuggel/g, 'Smuggle');
document.body.innerHTML = document.body.innerHTML.replace(/Waffenlager/g, 'Weapon Storage');
document.body.innerHTML = document.body.innerHTML.replace(/Munitionsdepot/g, 'Ammunition Storage');
document.body.innerHTML = document.body.innerHTML.replace(/Alkohollager/g, 'Alcohol Storage');
document.body.innerHTML = document.body.innerHTML.replace(/Tresorraum/g, 'Safe Room');
document.body.innerHTML = document.body.innerHTML.replace(/Trainingslager/g, 'Boot Camp');
document.body.innerHTML = document.body.innerHTML.replace(/Selbstschussanlagen/g, 'Spring Gun');
document.body.innerHTML = document.body.innerHTML.replace(/Versteckte Minen/g, 'Hidden Mines ');
document.body.innerHTML = document.body.innerHTML.replace(/Ehre/g, 'Honor');
document.body.innerHTML = document.body.innerHTML.replace(/Chemische Ausbildung/g, 'Chemical Training');
document.body.innerHTML = document.body.innerHTML.replace(/Psychisches Training/g, 'Psychological Training');
document.body.innerHTML = document.body.innerHTML.replace(/Guerillaausbildung/g, 'Guerilla Training');
document.body.innerHTML = document.body.innerHTML.replace(/Bombenbau/g, 'Bomb Construction');
document.body.innerHTML = document.body.innerHTML.replace(/Schusstraining/g, 'Firearms Training');
document.body.innerHTML = document.body.innerHTML.replace(/Kurzwaffenkampf/g, 'Short-Ranged Weapon Training');
document.body.innerHTML = document.body.innerHTML.replace(/Nahkampf/g, 'Close Combat');
document.body.innerHTML = document.body.innerHTML.replace(/Gruppenschutz/g, 'Gang Protection');
document.body.innerHTML = document.body.innerHTML.replace(/Objektbewachung/g, 'Security Patrol');
document.body.innerHTML = document.body.innerHTML.replace(/Informationsbeschaffung/g, 'Information Procurement');
document.body.innerHTML = document.body.innerHTML.replace(/Schmuggel/g, 'Smuggling');
document.body.innerHTML = document.body.innerHTML.replace(/Basisverwaltung/g, 'Base Administration');
document.body.innerHTML = document.body.innerHTML.replace(/Schutzgeldeintreibung/g, 'Protection Money Encashment');
document.body.innerHTML = document.body.innerHTML.replace(/Auftragsplanung/g, 'Strategies');
document.body.innerHTML = document.body.innerHTML.replace(/Routenplanung/g, 'Routing');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Raum)\b/g, 'Rooms');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Stufe)\b/g, 'Level');   
}

// Buildings
if (location.pathname.search('camps.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gebäude)\b/g, 'Buildings');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Raum)\b/g, 'Rooms');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Punkte)\b/g, 'Points');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Restdauer)\b/g, 'Remaining time');
document.body.innerHTML = document.body.innerHTML.replace(/\b(auflösen)\b/g, 'Delete');
document.body.innerHTML = document.body.innerHTML.replace(/Änderungen/g, 'Save'); 
document.body.innerHTML = document.body.innerHTML.replace(/\b(speichern)\b/g, 'changes');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Name)\b/g, 'Name');
document.body.innerHTML = document.body.innerHTML.replace(/Chefbüro/g, 'Boss Office');
document.body.innerHTML = document.body.innerHTML.replace(/Ausbildungsraum/g, 'Training');
document.body.innerHTML = document.body.innerHTML.replace(/Waffenkammer/g, 'Weapons Armoury');
document.body.innerHTML = document.body.innerHTML.replace(/Munitionskammer/g, 'Ammunition Depot');
document.body.innerHTML = document.body.innerHTML.replace(/Brauerei/g, 'Brewery');
document.body.innerHTML = document.body.innerHTML.replace(/Kneipe/g, 'Bar');
document.body.innerHTML = document.body.innerHTML.replace(/Schmuggel/g, 'Smuggle');
document.body.innerHTML = document.body.innerHTML.replace(/Waffenlager/g, 'Weapon Storage');
document.body.innerHTML = document.body.innerHTML.replace(/Munitionsdepot/g, 'Ammunition Storage');
document.body.innerHTML = document.body.innerHTML.replace(/Alkohollager/g, 'Alcohol Storage');
document.body.innerHTML = document.body.innerHTML.replace(/Tresorraum/g, 'Safe Room');
document.body.innerHTML = document.body.innerHTML.replace(/Trainingslager/g, 'Boot Camp');
document.body.innerHTML = document.body.innerHTML.replace(/Selbstschussanlagen/g, 'Spring Gun');
document.body.innerHTML = document.body.innerHTML.replace(/Versteckte Minen/g, 'Hidden Mines ');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tag)\b/g, 'Day');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tage)\b/g, 'Days');
}

// Search
if (location.pathname.search('suche.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Suche)\b/g, 'Search');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gebäude)\b/g, 'Building');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler)\b/g, 'Player');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianz)\b/g, 'Alliance');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Punkte)\b/g, 'Points');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Suchen)\b/g, 'Search');
document.body.innerHTML = document.body.innerHTML.replace(/\b(kein Treffer)\b/g, 'No match found!');
}

// Unitinfo
if (location.pathname.search('info.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einheiten)\b/g, 'Unit');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Name)\b/g, 'Name');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Angriffswert)\b/g, 'Attack index');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Verteidigungswert)\b/g, 'Defense incex');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Basis)\b/g, 'Basic');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Aktuell)\b/g, 'Current');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Beschreibung)\b/g, 'Description');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Punkte)\b/g, 'Points');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Voraussetzung)\b/g, 'Requirements');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Angriffsbonus)\b/g, 'Attack bonus');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Verteidigungsbonus)\b/g, 'Defense bonus');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Verbrauch)\b/g, 'Salary');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Geschwindigkeit)\b/g, 'Speed');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ladekapazität)\b/g, 'Cargo capacity');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Stufe)\b/g, 'Level');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ehre)\b/g, 'Honor');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Chemische Ausbildung)\b/g, 'Chemical Training');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Psychisches Training)\b/g, 'Psychological Training');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Guerillaausbildung)\b/g, 'Guerilla Training');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bombenbau)\b/g, 'Bomb Construction');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schusstraining)\b/g, 'Firearms Training');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kurzwaffenkampf)\b/g, 'Short-Ranged Weapon Training');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Nahkampf)\b/g, 'Close Combat');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gruppenschutz)\b/g, 'Gang Protection');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Objektbewachung)\b/g, 'Security Patrol');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Informationsbeschaffung)\b/g, 'Information Procurement');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schmuggel)\b/g, 'Smuggling');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Basisverwaltung)\b/g, 'Base Administration');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schutzgeldeintreibung)\b/g, 'Protection Money Encashment');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Auftragsplanung)\b/g, 'Strategies');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Routenplanung)\b/g, 'Routing');
}

// Map
if (location.pathname.search('map.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Stadt)\b/g, 'City');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Stadtteil)\b/g, 'District');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Infos)\b/g, 'Infos');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gebäude)\b/g, 'Buildings');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler)\b/g, 'Player');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Punkte)\b/g, 'Points');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianz)\b/g, 'Alliance');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Aktualisieren)\b/g, 'Update');
}

// Statistiche
if (location.pathname.search('stats.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(in einem Camp)\b/g, 'in a building');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Höchste)\b/g, 'Highest');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Raum)\b/g, 'Rooms');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ausbildung)\b/g, 'Training');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Die meisten Einheiten)\b/g, 'Bigger amount of Units');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Anzahl)\b/g, 'Number');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ehre)\b/g, 'Honor');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Chemische Ausbildung)\b/g, 'Chemical Training');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Psychisches Training)\b/g, 'Psychological Training');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Guerillaausbildung)\b/g, 'Guerilla Training');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bombenbau)\b/g, 'Bomb Construction');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schusstraining)\b/g, 'Firearms Training');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kurzwaffenkampf)\b/g, 'Short-Ranged Weapon Training');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Nahkampf)\b/g, 'Close Combat');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gruppenschutz)\b/g, 'Gang Protection');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Objektbewachung)\b/g, 'Security Patrol');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Informationsbeschaffung)\b/g, 'Information Procurement');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schmuggel)\b/g, 'Smuggling');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Basisverwaltung)\b/g, 'Base Administration');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schutzgeldeintreibung)\b/g, 'Protection Money Encashment');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Auftragsplanung)\b/g, 'Strategies');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Routenplanung)\b/g, 'Routing');
}

// Target List - Lista farm
if (location.pathname.search('targetlist.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Los)\b/g, 'Go');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gebäude)\b/g, 'Building');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Zielname)\b/g, 'Name of the Target');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler)\b/g, 'Player');
document.body.innerHTML = document.body.innerHTML.replace(/\b(löschen)\b/g, 'Delete');
}

// Bounty
if (location.pathname.search('bounty*') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(vergeben)\b/g, '(place reward)');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Top 50 Kopfgelder)\b/g, 'Rewards - Top 50');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Rohstoff)\b/g, 'Resources');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Pott)\b/g, 'Prize Money');
document.body.innerHTML = document.body.innerHTML.replace(/\b(auszahlen)\b/g, 'Pay off');
document.body.innerHTML = document.body.innerHTML.replace(/\b(erarbeitetes Kopfgeld)\b/g, 'Reward Won');
document.body.innerHTML = document.body.innerHTML.replace(/\b(zahl mich aus)\b/g, 'Give me the reward');
document.body.innerHTML = document.body.innerHTML.replace(/suchen/g, 'Search');
document.body.innerHTML = document.body.innerHTML.replace(/\b(für)\b/g, 'for');
document.body.innerHTML = document.body.innerHTML.replace(/\b(aktuell)\b/g, 'current');
document.body.innerHTML = document.body.innerHTML.replace(/\b(hinzugeben)\b/g, 'add');
document.body.innerHTML = document.body.innerHTML.replace(/\b(maximal)\b/g, 'maximum');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einheitenpunkte)\b/g, 'Points of Units');
document.body.innerHTML = document.body.innerHTML.replace(/\b(aussetzen)\b/g, '(place)');
document.body.innerHTML = document.body.innerHTML.replace(/\b(erarbeitetes)\b/g, 'Earned');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Topf ausbezahlen)\b/g, 'Reward collection');
}

// Alliance
if (location.pathname.search('ally.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Diplomatie)\b/g, 'Diplomacy');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Mitglied)\b/g, 'Member');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Mitglieder)\b/g, 'Members');
document.body.innerHTML = document.body.innerHTML.replace(/\b(senden)\b/g, 'Send');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Nachricht schreiben)\b/g, 'New Message');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianz verlassen)\b/g, 'Leave the Alliance');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianz)\b/g, 'Alliance');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianzbeschreibung)\b/g, 'Alliance Description');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Keine Beschreibung)\b/g, 'No description');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Es liegen keine Bewerbungen vor)\b/g, 'There are no new applications');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianzeinstellungen)\b/g, 'Alliance settings');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Members verwalten)\b/g, 'Manage Members');
document.body.innerHTML = document.body.innerHTML.replace(/\b(von)\b/g, 'from');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Nachricht)\b/g, 'Message');
document.body.innerHTML = document.body.innerHTML.replace(/\b(auflösen)\b/g, 'dissolution');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Keine Homepage)\b/g, 'No Homepage');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Alliance wirklich dissolution)\b/g, 'Do you really want to dissolve the Alliance');
document.body.innerHTML = document.body.innerHTML.replace(/\b(gründen)\b/g, 'foundation');
document.body.innerHTML = document.body.innerHTML.replace(/\b(suchen)\b/g, 'search');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bewerbung)\b/g, 'Application');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bewerbungstext)\b/g, 'Text of the Application');
document.body.innerHTML = document.body.innerHTML.replace(/\b(zurück ziehen)\b/g, 'cancel');
document.body.innerHTML = document.body.innerHTML.replace(/\b(zurück gezogen)\b/g, 'canceled');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Es liegen Bewerbungen vor)\b/g, 'There are new applications');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler)\b/g, 'Player');
document.body.innerHTML = document.body.innerHTML.replace(/\b(annehmen)\b/g, 'Accept');
document.body.innerHTML = document.body.innerHTML.replace(/\b(ablehnen)\b/g, 'Refuse');
}

// Alliance Foundation
if (location.pathname.search('ally_new.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianz gründen)\b/g, 'Alliance foundation');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianz-Tag)\b/g, 'Alliance Tag');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianz-Name)\b/g, 'Alliance Name');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Zeichen)\b/g, 'characters');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gründen)\b/g, 'Create');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Die Allianz wurde erfolgreich gegründet)\b/g, 'The Alliance was created successfully');
}

// Alliance Members
if (location.pathname.search('ally_member.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Mitglieder)\b/g, 'Members');
document.body.innerHTML = document.body.innerHTML.replace(/\b(rauswerfen)\b/g, 'Expulsion');
}

// Alliance settings
if (location.pathname.search('ally_config.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianzeinstellungen)\b/g, 'Alliance Settings');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianzbild)\b/g, 'Alliance Image');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianzbeschreibung)\b/g, 'Alliance Description');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Aktualisieren)\b/g, 'Update');
}

// Alliance Diplomacy
if (location.pathname.search('ally_diplo.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianz)\b/g, 'Alliance');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Diplomatie)\b/g, 'Diplomacy');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bestätigung)\b/g, 'Confirmation');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bündnis)\b/g, 'Alliance');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schutzbündnis)\b/g, 'Defensive Alliance');
document.body.innerHTML = document.body.innerHTML.replace(/Nicht/g, 'Non-');
document.body.innerHTML = document.body.innerHTML.replace(/angriffs/g, 'Aggression');
document.body.innerHTML = document.body.innerHTML.replace(/packt/g, ' Pact');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Geheimbund)\b/g, 'Secret Society');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Krieg)\b/g, 'War');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Begründung)\b/g, 'Reason');
document.body.innerHTML = document.body.innerHTML.replace(/\b(senden)\b/g, 'Send');
document.body.innerHTML = document.body.innerHTML.replace(/\b(unbestätigt)\b/g, 'unconfirmed');
document.body.innerHTML = document.body.innerHTML.replace(/\b(bestätigt)\b/g, 'confirmed');
document.body.innerHTML = document.body.innerHTML.replace(/\b(kündigen)\b/g, 'cancel');
document.body.innerHTML = document.body.innerHTML.replace(/\b(kapitulieren)\b/g, 'surrender')
}

// Alliance View
if (location.pathname.search('ally_view.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianz)\b/g, 'Alliance');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Diplomatie)\b/g, 'Diplomacy');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bestätigung)\b/g, 'Confirmation');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bündnis)\b/g, 'Alliance');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schutzbündnis)\b/g, 'Defensive Alliance');
document.body.innerHTML = document.body.innerHTML.replace(/Nicht/g, 'Non-');
document.body.innerHTML = document.body.innerHTML.replace(/angriffs/g, 'Aggression');
document.body.innerHTML = document.body.innerHTML.replace(/packt/g, ' Pact');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Geheimbund)\b/g, 'Secret Society');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Krieg)\b/g, 'War');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Begründung)\b/g, 'Reason');
document.body.innerHTML = document.body.innerHTML.replace(/\b(senden)\b/g, 'Send');
document.body.innerHTML = document.body.innerHTML.replace(/\b(unbestätigt)\b/g, 'unconfirmed');
document.body.innerHTML = document.body.innerHTML.replace(/\b(bestätigt)\b/g, 'confirmed');
document.body.innerHTML = document.body.innerHTML.replace(/\b(kündigen)\b/g, 'cancel');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Mitglieder)\b/g, 'Members');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianzbeschreibung)\b/g, 'Alliance Description');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Keine Homepage)\b/g, 'No Homepage');
document.body.innerHTML = document.body.innerHTML.replace(/\b(bewerben)\b/g, 'Apply');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Mitglied)\b/g, 'Member');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Keine Beschreibung)\b/g, 'No description');
}

// Logout
if (location.pathname.search('logout.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/Zur Startseite wechseln/g, 'Go to Home');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Sie sind jetzt erfolgreich augeloggt)\b/g, 'You are now successfully logged out');
}

// Ally join
if (location.pathname.search('ally_join.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bewerbung)\b/g, 'Application');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bewerbungstext)\b/g, 'Text of the Application');
document.body.innerHTML = document.body.innerHTML.replace(/\b(bewerben)\b/g, 'Apply');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Du hast dich Erfolgreich bei der Allianz beworben)\b/g, 'Your application was successfully sent');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Jetzt müssen sie nur noch zustimmen)\b/g, 'Now you just have to wait that it will be accepted');
}

// Resources
if (location.pathname.search('res.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Grundeinkommen)\b/g, 'Base income');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Lagerkapazität)\b/g, 'Storage Capacity');
document.body.innerHTML = document.body.innerHTML.replace(/\b(davon sicher untergebracht)\b/g, 'stored safely');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Waffenkammer)\b/g, 'Weapons Armoury');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Munitionskammer)\b/g, 'Ammunition Depot');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Brauerei)\b/g, 'Brewery');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kneipe)\b/g, 'Bar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schmuggel)\b/g, 'Smuggle');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Stunde)\b/g, '(Hour)');
}

// Missions
if (location.pathname.search('unit.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Geschwindigkeit)\b/g, 'Speed');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Neuen Einsatz planen)\b/g, 'Planning new mission');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Zielcamp)\b/g, 'Target Building');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Auftrag)\b/g, 'Mission');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Angreifen)\b/g, 'Attack');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einheiten stationieren)\b/g, 'Station');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Transportieren)\b/g, 'Transportation');
document.body.innerHTML = document.body.innerHTML.replace(/\b(besetzen)\b/g, 'Occupation');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Nur bei Transport und Stationieren)\b/g, 'Only for Transport and Occupation');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Aktualisieren)\b/g, 'Update');
document.body.innerHTML = document.body.innerHTML.replace(/\b(senden)\b/g, 'Send');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Entfernung)\b/g, 'Distance');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einsatzkosten)\b/g, 'Salary');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ladekapazität)\b/g, 'Cargo capacity');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einsatzzeit)\b/g, 'Mission Duration');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ankunft)\b/g, 'Arrival');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einsatzdaten)\b/g, 'Mission Summary');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Keine Einheiten)\b/g, 'No Units');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einheiten)\b/g, 'Units');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Anzahl)\b/g, 'Number');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gebäude)\b/g, 'Building');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Angriffswert)\b/g, 'Attack index');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Verteidigungswert)\b/g, 'Defense incex');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler)\b/g, 'Player');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Deine Units machen sich auf den Weg)\b/g, 'Your units are on their way');
}

// Messages
if (location.pathname.search('msg.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bauabschluss)\b/g, 'Construction completion');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spielernachrichten)\b/g, 'Messages from Players');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kampfberichte)\b/g, 'Combat Reports');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Nachricht schreiben)\b/g, 'Write Message');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einsatzberichte)\b/g, 'Use Reports');
}

// Messages box
if (location.pathname.search('msg_read.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/Chefbüro/g, 'Boss Office');
document.body.innerHTML = document.body.innerHTML.replace(/Ausbildungsraum/g, 'Training');
document.body.innerHTML = document.body.innerHTML.replace(/Waffenkammer/g, 'Weapons Armoury');
document.body.innerHTML = document.body.innerHTML.replace(/Munitionskammer/g, 'Ammunition Depot');
document.body.innerHTML = document.body.innerHTML.replace(/Brauerei/g, 'Brewery');
document.body.innerHTML = document.body.innerHTML.replace(/Kneipe/g, 'Bar');
document.body.innerHTML = document.body.innerHTML.replace(/Schmuggel/g, 'Smuggle');
document.body.innerHTML = document.body.innerHTML.replace(/Waffenlager/g, 'Weapon Storage');
document.body.innerHTML = document.body.innerHTML.replace(/Munitionsdepot/g, 'Ammunition Storage');
document.body.innerHTML = document.body.innerHTML.replace(/Alkohollager/g, 'Alcohol Storage');
document.body.innerHTML = document.body.innerHTML.replace(/Tresorraum/g, 'Safe Room');
document.body.innerHTML = document.body.innerHTML.replace(/Trainingslager/g, 'Boot Camp');
document.body.innerHTML = document.body.innerHTML.replace(/Selbstschussanlagen/g, 'Spring Gun');
document.body.innerHTML = document.body.innerHTML.replace(/Versteckte Minen/g, 'Hidden Mines ');
document.body.innerHTML = document.body.innerHTML.replace(/Ehre/g, 'Honor');
document.body.innerHTML = document.body.innerHTML.replace(/Chemische Ausbildung/g, 'Chemical Training');
document.body.innerHTML = document.body.innerHTML.replace(/Psychisches Training/g, 'Psychological Training');
document.body.innerHTML = document.body.innerHTML.replace(/Guerillaausbildung/g, 'Guerilla Training');
document.body.innerHTML = document.body.innerHTML.replace(/Bombenbau/g, 'Bomb Construction');
document.body.innerHTML = document.body.innerHTML.replace(/Schusstraining/g, 'Firearms Training');
document.body.innerHTML = document.body.innerHTML.replace(/Kurzwaffenkampf/g, 'Short-Ranged Weapon Training');
document.body.innerHTML = document.body.innerHTML.replace(/Nahkampf/g, 'Close Combat');
document.body.innerHTML = document.body.innerHTML.replace(/Gruppenschutz/g, 'Gang Protection');
document.body.innerHTML = document.body.innerHTML.replace(/Objektbewachung/g, 'Security Patrol');
document.body.innerHTML = document.body.innerHTML.replace(/Informationsbeschaffung/g, 'Information Procurement');
document.body.innerHTML = document.body.innerHTML.replace(/Schmuggel/g, 'Smuggling');
document.body.innerHTML = document.body.innerHTML.replace(/Basisverwaltung/g, 'Base Administration');
document.body.innerHTML = document.body.innerHTML.replace(/Schutzgeldeintreibung/g, 'Protection Money Encashment');
document.body.innerHTML = document.body.innerHTML.replace(/Auftragsplanung/g, 'Strategies');
document.body.innerHTML = document.body.innerHTML.replace(/Routenplanung/g, 'Routing');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Chefbüro)\b/g, 'Boss Office');
document.body.innerHTML = document.body.innerHTML.replace(/Ausbildungsraum/g, 'Training');
document.body.innerHTML = document.body.innerHTML.replace(/Waffenkammer/g, 'Weapons Armoury');
document.body.innerHTML = document.body.innerHTML.replace(/Munitionskammer/g, 'Ammunition Depot');
document.body.innerHTML = document.body.innerHTML.replace(/Brauerei/g, 'Brewery');
document.body.innerHTML = document.body.innerHTML.replace(/Kneipe/g, 'Bar');
document.body.innerHTML = document.body.innerHTML.replace(/Schmuggel/g, 'Smuggle');
document.body.innerHTML = document.body.innerHTML.replace(/Waffenlager/g, 'Weapon Storage');
document.body.innerHTML = document.body.innerHTML.replace(/Munitionsdepot/g, 'Ammunition Storage');
document.body.innerHTML = document.body.innerHTML.replace(/Alkohollager/g, 'Alcohol Storage');
document.body.innerHTML = document.body.innerHTML.replace(/Tresorraum/g, 'Safe Room');
document.body.innerHTML = document.body.innerHTML.replace(/Trainingslager/g, 'Boot Camp');
document.body.innerHTML = document.body.innerHTML.replace(/Selbstschussanlagen/g, 'Spring Gun');
document.body.innerHTML = document.body.innerHTML.replace(/Versteckte Minen/g, 'Hidden Mines ');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ausbau)\b/g, 'expansion');
document.body.innerHTML = document.body.innerHTML.replace(/\b(erfolgreich)\b/g, 'successfully'); 
document.body.innerHTML = document.body.innerHTML.replace(/\b(abgeschlossen)\b/g, 'built');  
document.body.innerHTML = document.body.innerHTML.replace(/\b(ausgebildet)\b/g, 'trained');
document.body.innerHTML = document.body.innerHTML.replace(/\b(mal)\b/g, 'units of');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Betreff)\b/g, 'Subject');
document.body.innerHTML = document.body.innerHTML.replace(/\b(von)\b/g, 'From');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Datum)\b/g, 'Date');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Markierte)\b/g, 'Delete');
document.body.innerHTML = document.body.innerHTML.replace(/\b(löschen)\b/g, 'Selected');
document.body.innerHTML = document.body.innerHTML.replace(/\b(kein)\b/g, 'No');
document.body.innerHTML = document.body.innerHTML.replace(/\b(erforscht)\b/g, 'completed');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kampfbericht)\b/g, 'Combat Report');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kampfrunde)\b/g, 'Battle round');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einheiten)\b/g, 'Troops');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Anzahl)\b/g, 'Sum');
document.body.innerHTML = document.body.innerHTML.replace(/\b(vernichtet)\b/g, 'Destroyed');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Angriffswert)\b/g, 'Attack index');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Verteidigungswert)\b/g, 'Defense incex');
document.body.innerHTML = document.body.innerHTML.replace(/\b(erbeutete)\b/g, 'Captured');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Siegchance)\b/g, 'Chances of Winning');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spyagechance)\b/g, 'Chances of Espionage');
document.body.innerHTML = document.body.innerHTML.replace(/\b(im Forum speichern)\b/g, 'Save (on forum)');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Neu)\b/g, 'New');
document.body.innerHTML = document.body.innerHTML.replace(/\b(AW)\b/g, 'Quote');
}

// Messages Writing
if (location.pathname.search('msg_write.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ursprüngliche Nachricht)\b/g, 'Original Message');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Von)\b/g, 'From');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gesendet)\b/g, 'Received on');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Los)\b/g, 'Send');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Datum)\b/g, 'Date');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Betreff)\b/g, 'Subject');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Empfänger)\b/g, 'To');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Nachricht)\b/g, 'Message');
document.body.innerHTML = document.body.innerHTML.replace(/\b(schreiben)\b/g, 'Editor');
document.body.innerHTML = document.body.innerHTML.replace(/\b(erfolgreich)\b/g, 'successfully');
document.body.innerHTML = document.body.innerHTML.replace(/eingetragen/g, 'sent');
}

// Highscore
if (location.pathname.search('score.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Punkte)\b/g, 'Points');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ausbildung)\b/g, 'Training');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gebäude)\b/g, 'Buildings');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einheiten)\b/g, 'Units');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianzen)\b/g, 'Alliance');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Titel)\b/g, 'Title');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler 7 Tage inaktiv)\b/g, 'Player inactive 7 days');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler 14 Tage inaktiv)\b/g, 'Player inactive 14 days');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler im Urlaub)\b/g, 'Player on vacation mode');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler gesperrt)\b/g, 'Player banned');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler)\b/g, 'Player');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Anzahl)\b/g, 'Number');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianz)\b/g, 'Alliance');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Mitglieder)\b/g, 'Members');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Durchschnitt)\b/g, 'Average');
}

// Friends
if (location.pathname.search('buddy.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler hinzufügen)\b/g, 'Add Player');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Anfragen von Spielern)\b/g, 'Requests from other Players');
document.body.innerHTML = document.body.innerHTML.replace(/\b(löschen)\b/g, 'Delete');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Als Online werden alle Friends angezeigt)\b/g, 'Are displayed the Online friends');
document.body.innerHTML = document.body.innerHTML.replace(/\b(welche in den letzten 15 Minuten)\b/g, 'who had performed at least one action ');
document.body.innerHTML = document.body.innerHTML.replace(/\b(mindestens eine Aktion durchgeführt hatten)\b/g, 'in the last 15 minutes');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Du hast noch keine bestätigten Friends)\b/g, 'You have no confirmed Friends currently');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Als Freund einladen)\b/g, 'Invite as a Friend');
document.body.innerHTML = document.body.innerHTML.replace(/\b(unbestätigt)\b/g, 'unconfirmed');
document.body.innerHTML = document.body.innerHTML.replace(/\b(bestätigen)\b/g, 'accept');
document.body.innerHTML = document.body.innerHTML.replace(/\b(ablehnen)\b/g, 'decline');
}

// Chat
if (location.pathname.search('chat.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Flüstern)\b/g, 'Whisper');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Nachricht)\b/g, 'Message');
document.body.innerHTML = document.body.innerHTML.replace(/Sagen/g, 'Send');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Unsichtbare)\b/g, 'Invisible');
document.body.innerHTML = document.body.innerHTML.replace(/\b(online Anzeige)\b/g, 'Online Announcement');
document.body.innerHTML = document.body.innerHTML.replace(/\b(in den Chat schreiben)\b/g, 'type it in the chat');
}

// OPTIONS (Settings)
if (location.pathname.search('config.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Du kannst erst wieder in)\b/g, 'You must wait');
document.body.innerHTML = document.body.innerHTML.replace(/\b(deinen Namen ändern)\b/g, 'to be allowed to change your Nickname again');
document.body.innerHTML = document.body.innerHTML.replace(/\b(senden)\b/g, 'Save');
document.body.innerHTML = document.body.innerHTML.replace(/\b(weitere)\b/g, ' ');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allgemeine)\b/g, 'General');
document.body.innerHTML = document.body.innerHTML.replace(/allgemeine/g, 'General');
document.body.innerHTML = document.body.innerHTML.replace(/\b(IP-Sharing melden)\b/g, 'Report IP-sharing');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spielername)\b/g, 'Nickname');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Accountsicherheit)\b/g, ': account Security');
document.body.innerHTML = document.body.innerHTML.replace(/\b(IP-Bindung)\b/g, 'Block IP');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Cookie-Bindung)\b/g, 'Block Cookies');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Autologout)\b/g, 'Logout Automatically');
document.body.innerHTML = document.body.innerHTML.replace(/\b(aus)\b/g, 'Off');
document.body.innerHTML = document.body.innerHTML.replace(/\b(an)\b/g, 'On');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Nachricht)\b/g, 'Message');
document.body.innerHTML = document.body.innerHTML.replace(/\b(bei Angriff)\b/g, 'from Attacks');
document.body.innerHTML = document.body.innerHTML.replace(/\b(bei Stationieren)\b/g, 'from Stations');
document.body.innerHTML = document.body.innerHTML.replace(/\b(bei Transport)\b/g, 'from Transportations');
document.body.innerHTML = document.body.innerHTML.replace(/\b(bei Campgründung)\b/g, 'from Occupations');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Sichtbar in Useronlineliste)\b/g, 'Visible on Users-Online list');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Sortierung der Camps)\b/g, 'Buidlings Order');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Sortiermethode)\b/g, 'Order by');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gründung)\b/g, 'Occupation');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Koordinaten)\b/g, 'Coordinates');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Aufsteigend)\b/g, 'Ascending Order');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Absteigend)\b/g, 'Descending Order');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Urlaubsmodus)\b/g, 'Vacation Mode');
document.body.innerHTML = document.body.innerHTML.replace(/\b(aktivieren)\b/g, 'activation');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Empfohlen)\b/g, 'Recommended');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Alle Options auf)\b/g, 'Choose the option');
document.body.innerHTML = document.body.innerHTML.replace(/\b(lassen)\b/g, 'for all');
document.body.innerHTML = document.body.innerHTML.replace(/\b(In der Zeit in dem du im Urlaub bist kannst du nicht angegriffen werden und es können auch keine anderen Missions zu dir gestartet werden)\b/g, 'During the time you are on vacation you can not be attacked and it also can not be started any other mission by you');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Du produzierst in dieser Zeit keine Resources und die Bauarbeiten On Einheiten, Gebäuden und Forschungen werden ebenfalls eingestellt)\b/g, 'During this time you do not produce any resources and the building expansion, trainings improvement or Troops construction is not possible');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Den Vacation Mode kannst du erst)\b/g, 'You can only activate the vacation mode AGAIN');
document.body.innerHTML = document.body.innerHTML.replace(/\b(nach dem activation wieder beenden)\b/g, 'after it ends');
document.body.innerHTML = document.body.innerHTML.replace(/\b(wirklich)\b/g, 'SERIOUS');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tag)\b/g, 'Day');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tage)\b/g, 'Days');
}

// OPTIONS (IP-Sharing)
if (location.pathname.search('config_sharing.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(weitere)\b/g, ' ');
document.body.innerHTML = document.body.innerHTML.replace(/allgemeine/g, 'General');
document.body.innerHTML = document.body.innerHTML.replace(/\b(IP-Sharing melden)\b/g, 'Report IP-sharing');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Neues Sharing hinzufügen)\b/g, 'Add New Sharing');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Aktuelle Sharings)\b/g, 'Current Sharings');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ende)\b/g, 'Finishing at');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Begründung)\b/g, 'Reason');
document.body.innerHTML = document.body.innerHTML.replace(/\b(senden)\b/g, 'Send');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Von)\b/g, 'From');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Mit)\b/g, 'To');
document.body.innerHTML = document.body.innerHTML.replace(/\b(erfolgreich gemeldet)\b/g, 'reported successfully');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Januar)\b/g, 'January');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Februar)\b/g, 'February');
document.body.innerHTML = document.body.innerHTML.replace(/\b(März)\b/g, 'March');
document.body.innerHTML = document.body.innerHTML.replace(/\b(April)\b/g, 'April');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Mai)\b/g, 'May');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Juni)\b/g, 'June');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Juli)\b/g, 'July');
document.body.innerHTML = document.body.innerHTML.replace(/\b(August)\b/g, 'August');
document.body.innerHTML = document.body.innerHTML.replace(/\b(September)\b/g, 'September');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Oktober)\b/g, 'October');
document.body.innerHTML = document.body.innerHTML.replace(/\b(November)\b/g, 'November');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Dezember)\b/g, 'December');
}

// Immages
if (location.pathname.search('img.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Image Upload)\b/g, 'Image Upload');
document.body.innerHTML = document.body.innerHTML.replace(/\b(von)\b/g, 'of');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bildern)\b/g, 'Images');
document.body.innerHTML = document.body.innerHTML.replace(/\b(hochladen)\b/g, 'upload');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Hochgeladene Bilder)\b/g, 'Uploaded Images');
document.body.innerHTML = document.body.innerHTML.replace(/\b(löschen)\b/g, 'delete');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Das Bild was du upload)\b/g, 'The images to be uploaded');
document.body.innerHTML = document.body.innerHTML.replace(/\b(möchtest darf Maximal)\b/g, 'can  not exceed');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Pixel)\b/g, 'Pixels');
document.body.innerHTML = document.body.innerHTML.replace(/\b(groß sein)\b/g, '(maximum dimensions)');
document.body.innerHTML = document.body.innerHTML.replace(/\b(ein Maximale Dateigröße)\b/g, 'and a maximum file size');
document.body.innerHTML = document.body.innerHTML.replace(/\b(haben und im Format)\b/g, '(formats permitted:');
document.body.innerHTML = document.body.innerHTML.replace(/\b(oder)\b/g, 'or');
document.body.innerHTML = document.body.innerHTML.replace(/\b( vorliegen)\b/g, ')');
}

// Giocatore - info click su player
if (location.pathname.search('player.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gebäude)\b/g, 'Buildings');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler)\b/g, 'Player');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Punkte)\b/g, 'Points');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Camps)\b/g, 'of Buildings');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Forschung)\b/g, 'of Trainings');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einheiten)\b/g, 'of Units');
document.body.innerHTML = document.body.innerHTML.replace(/\b(aussetzen)\b/g, '(Show)');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Nachricht schreiben)\b/g, 'Send Message');
}

// Menu other resources
document.body.innerHTML = document.body.innerHTML.replace(/\b(Serverzeit)\b/g, 'Server Time');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Waffen)\b/g, 'Weapons');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Munition)\b/g, 'Ammunition');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Alkohol)\b/g, 'Alcohol');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Dollar)\b/g, 'Dollar');

// Others and Eventual
document.body.innerHTML = document.body.innerHTML.replace(/Fehler!/g, 'Error!');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Seitenaufbau in)\b/g, 'Page loaded in');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Sekunden)\b/g, 'Seconds');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Du hast hier kein)\b/g, 'You do not have:');
document.body.innerHTML = document.body.innerHTML.replace(/Erfolgreich!/g, 'Done!');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Deine Unita machen sich auf den Weg)\b/g, 'Your Units are on their way');
document.body.innerHTML = document.body.innerHTML.replace(/\b(registrieren)\b/g, 'Register');
document.body.innerHTML = document.body.innerHTML.replace(/\b(passwort vergessen)\b/g, 'Forgot your password?');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Globale Accountverwaltung)\b/g, 'Global Account Management');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler)\b/g, 'Players');
document.body.innerHTML = document.body.innerHTML.replace(/\b(registriert)\b/g, 'registered');
document.body.innerHTML = document.body.innerHTML.replace(/\b(spielername)\b/g, 'Username');
document.body.innerHTML = document.body.innerHTML.replace(/\b(passwort)\b/g, 'Password');
document.body.innerHTML = document.body.innerHTML.replace(/\b(anmelden)\b/g, 'Register');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Password vergessen)\b/g, 'Forgot your Password?');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Willkommen bei)\b/g, 'Welcome to');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Was erwartet dich)\b/g, 'What are you waiting for');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Platz für)\b/g, 'Place for');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einheiten)\b/g, 'Attack Units');
document.body.innerHTML = document.body.innerHTML.replace(/\b(defensive Jungs)\b/g, 'Defensive Units');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ausbildungen)\b/g, 'Trainings');
document.body.innerHTML = document.body.innerHTML.replace(/\b(informationen)\b/g, 'Information');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler)\b/g, 'Players');
document.body.innerHTML = document.body.innerHTML.replace(/\b(pranger)\b/g, 'Ban List');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Grund)\b/g, 'Reason');
document.body.innerHTML = document.body.innerHTML.replace(/\b(gesperrt)\b/g, 'Banned');
document.body.innerHTML = document.body.innerHTML.replace(/\b(bis)\b/g, 'Until');
document.body.innerHTML = document.body.innerHTML.replace(/\b(registrieren)\b/g, 'Register');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Urlaubsmodus)\b/g, 'Vacation Mode');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Du befindest dich zur Zeit noch im Urlaub)\b/g, 'You still on vacation at the moment');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Du musst noch)\b/g, 'You still need to wait');
document.body.innerHTML = document.body.innerHTML.replace(/\b(warten Until du den Urlaub beenden kannst)\b/g, 'until you finish your vacation');

})();
