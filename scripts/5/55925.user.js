// ==UserScript==
// @name           GC Deutsch
// @namespace      Basique
// @description    Übersetzt Teile von Geocaching.com ins Deutsche
// @include        http://www.geocaching.com/*
// @include        https://www.geocaching.com/*
// @require        http://usocheckup.dune.net/55925.js?maxage=7&trim=de&id=usoCheckup
// @require        http://userscripts.org/scripts/source/67771.user.js
// ==/UserScript==

// Version 14

/* Ünterstützt von:
 * Gecko-1 (G-e-c-k-o-s)
 * DunkleAura
 * Ruhrcacher
 * fabibr
 * flopp
 * huzzel
 * -jha-
 * lordmacabre
 * bender2004
 * surfer_md
 * feuermahr
 * derHaake
 * Wawa666
 * MukiausdemZauberwald
 * Sushi_bb
 */
 
if (typeof usoCheckup != "undefined") {
	usoCheckup.strings();
	usoCheckup.widgets("query");   // Activate the default query widget.
	usoCheckup.widgets("toggle");  // Activate the default toggle widget.
}

String.prototype.normalize = function() {
	return this.replace(/\s{2,}/g, ' ');
};

var css = 'a.NavigationStarted,a.NavigationHide,a.NavigationBenchmark,a.NavigationTrackable,a.NavigationMembership,a.NavigationProfile,a.NavigationAccount,a.NavigationResources,a.NavigationForums,a.NavigationReviews,a.NavigationShop{background:url(http://www.scrupp.de/greasemonkey/sprite_navigation_de-v12.gif) no-repeat;}';
var head = document.getElementsByTagName('head')[0];
var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = css;
head.appendChild(style);

// das spezielle &nbsp; Zeichen
var sp = '\u00A0';

var key, en_str, de_str;
// direkte Übersetzungen vom Englischen ins Deutsche
var t = new Object();
// Teile von Texten, die per RegExp gesucht und ersetzt werden
var r = new Object();
// Übersetzungen von Button-Beschriftungen
var b = new Object();

// Datumsangaben ins deutsche Format bringen
r['(\\d\\d?)/(\\d\\d?)/(\\d{4})'] = '$2.$1.$3';


//**********************************************************************************


// Übersetzung von Elementen, die sich auf jeder Seite befinden
t[' Geocaching - The Official Global GPS Cache Hunt Site '] = ' Geocaching ';
t['Advertise with Us'] = 'Werben Sie mit uns';
t[' Geocaching, a '] = ' Geocaching, ein Projekt von ';
t[' Project.'] = ' '; // mit Absicht
t[' Geocaching, a Groundspeak Project.'] = ' Geocaching, ein Projekt von Groundspeak.';
t['About Groundspeak'] = 'Über Groundspeak';
t['Contact Us'] = 'Kontakt';
t[' - The Official Global GPS Cache Hunt Site'] = ' - Die offizielle globale GPS-Cache-Jagd-Seite';
t['Create a Membership!'] = 'Erstelle eine Mitgliedschaft!';
t['Forgot Your Password?'] = 'Passwort vergessen?';

t['Give the gift of Geocaching! Purchase a '] = 'Gib das Geschenk von Geocaching! Erwerbe ein ';
t['Groundspeak Membership Gift Certificate'] = 'Groundspeak Mitgliedschafts Geschenk Zertifikat';


//t['Happy Holidays From Groundspeak! Click '] = 'Schöne Ferien wünscht Groundspeak! Klicke ';
//t['here'] = 'hier';
//t[' to view the flash version of the 2009 greeting card.'] = ', um die Flashversion der 2009 Grußkarte anzusehen.";



//**********************************************************************************



// Übersetzen von "Getting Started"
//http://www.geocaching.com/about/default.aspx*

t['Getting Started with Geocaching'] = 'Einstieg ins Geocaching';
t[' Getting Started with Geocaching'] = 'Einstieg ins Geocaching';

//Erster Absatz funktioniert nicht!


t[' Easy Steps to Geocaching'] = 'Einfache Schritte zum Geocachen';
t['Register for a free '] = 'Registrier dich für eine kostenlose ';
t['Basic Membership'] = 'Basis-Mitgliedschaft';
t['Click "Hide & Seek a Cache."'] = 'Klicke auf "Einen Cache verstecken und suchen".';
t['Enter your postal code and click "search."'] = 'Gib deine Postleitzahl ein und klick auf "suchen".';
t['Choose any geocache from the list and click on its name.'] = 'Wähle einen Cache aus der Liste und klick auf dessen Namen.';
t['Enter the coordinates of the geocache into your GPS Device.'] = 'Gib die Koordinaten des Caches in dein GPS ein.';
t['Use your GPS device to assist you in finding the hidden geocache.'] = 'Benutze dein GPS, um dich zum versteckten Cache zu leiten.';
t['Sign the logbook and return the geocache to its original location.'] = 'Schreib dich ins Logbuch und verstecke den Cache, wie vorgefunden';
t['Share your geocaching stories and photos online.'] = 'Teile deine Geocaching-Geschichten und Fotos online.';

t[' Before You Go'] = 'Bevor du gehst';
t['Find a '] = 'Finde einen ';
t[' that will meet your immediate goals. Are you looking for a difficult hike or an easy adventure? '] = ', der deine unmittelbaren Ziele trifft. Suchst du nach einer schwierigen Wanderung oder einem einfachen Abenteuer? ';
t['Learn How to Find a Geocache'] = 'Lerne einen Geocache zu finden';
t['If you\'re headed out on the trail, pack any needed supplies such as water, food and extra clothing. Bring both a map and a compass. Check geocache terrain and difficulty ratings.'] = 'Wenn du die Wanderung ansteuerst, packe das nötige Zubehör ein, wie Wasser, Essen und zusätzliche Klamotten. Nimm eine Karte und einen Kompass mit. Prüfe die Gelände- und Schwierigkeitswertungen des Caches.';

t['For safety, let someone know where you are going. '] = 'Lass zur Sicherheit jemanden wissen, wo du hingehst.';
t['Do not forget your GPS and extra batteries.'] = 'Vergiss dein GPS und zusätzliche Batterien nicht.';
t['Need a GPS? Read '] = 'Du brauchst ein GPS? Lies die ';
t['GPS Device Reviews'] = 'GPS Rezensionen';
t[' and our '] = ' und unsere ';
t[' Guide to Buying a GPS Device'] = 'Anleitung zum GPS-Kauf';
t[' Get Out and Play'] = 'Komm raus und spiel';
t['Mark your car as a waypoint to ensure your safe return.'] = 'Markiere dein Auto als Wegpunkt, um sicher wieder zurückkehren zu können.';
t['Be mindful of the environment, practice '] = 'Nimm acht auf die Natur, betreibe ';
t['Bring friends and family with you; sharing the experience can be very rewarding. Pets are usually welcome, too! '] = 'Bringe Freunde und Familie mit; die Erfahrungen zu teilen kann sehr lohnend sein. Haustiere sind generell willkommen!';
t['Remember that distances can be deceiving. A geocache can take longer to find depending on trails, rivers and other obstacles. '] = 'Denke daran, dass Entfernungen trügen können. Manchmal kann man länger brauchen, um einen Cache zu finden, abhängig von Wegen, Flüssen und anderen Hindernissen.';
t[' Share Your Experience'] = 'Teile deine Erfahrungen';

t['If you take something from the geocache, leave something of equal or greater value.'] = 'Wenn du etwas aus dem Cache nimmst, hinterlasse etwas von gleichem Wert oder Höherwertiges.';

t['Write about your experience in the geocache logbook.'] = 'Schreibe deine Erfahrungen in dem Geocache-Logbuch.';

t['Place your geocaching stories and photos online. '] = 'Stelle deine Geocaching-Geschichten und Fotos online. ';
t[' Learn How to Log Your Find'] = 'Lerne deinen Besuch zu loggen';
t['Want to learn more?'] = 'Willst du mehr lernen?';


//**********************************************************************************


// Übersetzung der Anmeldeseite
// http://www.geocaching.com/
// Login

t['Login to Geocaching.com'] = 'Anmeldung auf Geocaching.com';
t['Geocaching.com Login'] = 'Geocaching.com Anmeldung';
r['Username:'] = 'Name:';
r['Password:'] = 'Passwort:';
b['Go'] = 'Los';
t['Remember Me (Requires Cookies)'] = 'Dauerhaft anmelden (benötigt Cookies)';
t[' Or'] = 'Oder';
t[' Create a membership!'] = ' Registriere Dich!';
t['Create a new membership'] = 'Registriere Dich';
t[' - It\'s free!'] = ' - Es ist kostenlos!';
t['Forget your password?'] = 'Passwort vergessen?';
t['Forgot your password?'] = 'Passwort vergessen?';
t[' - Click here.'] = ' - Hier klicken.';

// Text 1

t[' Geocaching is a high-tech treasure hunting game played throughout the world by adventure seekers equipped with GPS devices. The basic idea is to locate hidden containers, called geocaches, outdoors and then share your experiences online. Geocaching is enjoyed by people from all age groups, with a strong sense of community and support for the environment.']
	= 'Geocaching ist eine weltweite High-Tech Schatzsuche. Mit GPS-Geräten ausgestattete Geocacher jeden Alters begeben sich auf die Suche nach versteckten Behältern, den sogenannten Caches. Die Gemeinschaft der Geocacher zeichnet sich nicht nur durch ihren Zusammanhalt aus, sondern auch durch ein verstärktes Umweltbewusstsein. Grundsätzlich geht es beim Geocaching jedoch um das Aufspüren von kleinen und großen Dosen in der Natur und den Austausch von Erfahrungen mit anderen Cachern.';
t[' There are '] = 'Weltweit gibt es ';
t[' active geocaches around the world. Enter your postal code or address and click "go" to explore the geocaches near you.']
	= ' aktive Geocaches. Gib deine Postleitzahl oder deinen Wohnort an und klicke auf "Los" um Caches in deiner Nähe zu entdecken.';
b['Go...'] = 'Los...';
t[' Alternatively, you may search by GC Code, if you know the code of a specific geocache.']
	= 'Alternativ kannst Du auch nach einem GC-Code suchen, falls du den genauen Code eines Caches kennst.';
t[' Once you have found a geocache, sign the logbook and return the geocache to its original location. Afterward, share your geocaching stories and photos online!']
	= 'Wenn du einen Geocache gefunden hast, trage dich ins Logbuch ein und lege ihn dann zurück an den Fundort. Danach kannst du deine Geschichten und Fotos online mitteilen.';
b['Learn More'] = 'Mehr erfahren';

// Iphone App

t['Provides real-time, direct access to Geocaching.com’s database of worldwide geocaches.']
	= 'Ermöglicht Echtzeitzugriff auf die Datenbank der weltweiten Geocaches von Geocaching.com.';
t[' Available in English, Dutch, French, German and Japanese language versions.']
	= 'Verfügbar in englischer, niederländischer, französischer, deutscher und japanischer Sprachversion.';
t['View Application Screenshots and Features']
	= 'Zeige Bildschirmfotos und Funktionen';

// Events
	
t[' Visit the '] = ' Besuche die ';
t['exhibit'] = 'Ausstellung';
t[' to log a unique cache type and come see us at the '] = ' um einen einzigartigen Cachtyp zu loggen und uns auf dem ';
t['opening event.'] = 'Eröffnungsevent zu sehen.';
t['View the Event Calendar'] = 'Betrachte den Eventkalender';
t['View All News Articles'] = 'Betrachte alle neuen Artikel';

//Statistics

t['There are '] = 'Es gibt ';
t[' active caches and an estimated '] = ' aktive Caches und geschätzte ';
t[' million'] = ' Millionen';
t[' geocachers worldwide. In the last 30 days, there have been '] = ' Geocacher weltweit. In den letzten 30 Tagen wurden ';
t[' new logs written by '] = ' neue Logeinträge von ';
t[' new logs submitted. Check out the recent '] = ' neue Logeinträge geschrieben. Betrachte die neuesten '; 
t['logs'] = 'Logeinträge';
t['or'] = ' oder';
t['photos'] = 'Fotos';


//**********************************************************************************



//Resources
//http://www.geocaching.com/resources/default.aspx

t['Resources'] = 'Ressourcen';
t['Learn the Basics'] = 'Lerne die Grundlagen';
t['History'] = 'Geschichte';
t[' of Geocaching'] = ' vom Geocaching';
t['Learn how the worldwide treasure hunting phenomenon began.'] = 'Erfahre, wie die weltweite SChatzsuche begann.';
t['Learn about Geocache '] = 'Erfahre mehr über ';
t['Types'] = 'Geocachetypen';
t['Distinguish types of geocaches.'] = 'Unterscheide die Typen von Geocaches.';
t['Review the '] = 'Schau in das ';
t['Glossary of Terms'] = 'Glossary of Terms';
t['Understand all of the terms and acronyms you see on geocache logs.'] = 'Verstehe alle Begriffe und Abkürzungen, die du in den Geocache Logs siehst.';
t['Browse the '] = 'Stöber in den ';
t['Frequently Asked Questions'] = 'Oft gestellten Fragen';
t['Familiarize yourself with the activity.'] = 'Mach dich mit der Aktivität vertraut.';
t['Dig deeper by searching our '] = 'Vertiefe dich in der ';
t['Organized into categories and easily searchable.'] = 'Organisiert in Kategorien und einfach durchsuchbar.';
t['Purchase '] = 'Erwerbe ';
t['Contribute to Our Community'] = 'Trage zur Gemeinschaft bei';
t['Attend'] = 'Besuche';
t['Host'] = 'Leite';
t[' an Event'] = ' ein Event';
t['Connect with other geocachers.'] = 'Verbinde dich mit anderen Geocachern.';
t['Join a Local Organization'] = 'Trete einer lokalen Organisation bei';
t['Get involved by joining a geocaching organization.'] = 'Beteilige dich durch den Beitritt in eine Geocaching-Organisation.';
t['Learn How to Hide a Geocache'] = 'Erfahre, wie man einen Cache versteckt';
t['Review considerations for hiding your first cache.'] = 'Erfahre mehr, um deinen ersten Cache zu verstecken.';
t['A Guide To Geocaching'] = 'Eine Anleitung zum Geocachen';
t['Download the guide in PDF format to share geocaching in your community.'] = 'Lade die Anleitung im PDF-Format herunter und teile Geocaching in deiner Gemeinschaft.';
t['For At Home Printing (Color)'] = 'Zu Hause ausdrucken (Farbe)';
t['For At Home Printing (Black & White)'] = 'Zu Hause ausdrucken (Schwarz/Weiß)';
t['For Professional Printing*'] = 'Für professionelles Ausdrucken*';
t['*If you have a large event and are interested in printing the Professional version, please contact '] = 'Wenn du ein großes Event planst und in professionelle Drucke interessiert bist, kontaktiere bitte ';

t['Tools and Downloads'] = 'Tools und Downloads';
t['Guide to Buying a GPS Device'] = 'Anleitung, um ein GPS zu kaufen';
t['Determine what kind of GPS device will provide the best geocaching experience.'] = 'Bestimme, welche Art von GPS die die beste Geocachin-Erfahrung bietet.';
t['Read GPS device ratings and reviews by geocachers.'] = 'Lies die GPS Rezensionen und Bewertungen von anderen Geocachern.';
t['Software applications that serve as a companion to your GPS device.'] = 'Softwareanwendungen, die deinen GPS unterstützen.';
t['Groundspeak Goodies'] = 'Groundspeak\'s tolle Sachen';
t['Monthly desktop wallpapers and other goodies from Groundspeak.'] = 'Monatliche Dektophintergründe und andere Sachen von Groundspeak.';
t['Third Party Resources'] = 'Drittanbieter Angebote';
t['Helpful Links'] = 'Hilfreiche Links';
t['A list of resources and web sites that you might find useful or interesting.'] = 'Eine Liste von Mitteln und Internetseiten, die du möglicherweise nützlich und interresant findest.';
t['Related Activities'] = 'Ähnliche Aktivitäten';
t['You may enjoy other similar activities such as orienteering, letterboxing, and more.'] = 'Du findest vielleicht ähnliche Aktivitäten gut, wie Orientierungslauf, Letterboxing und mehr.';
t['Team Building'] = 'Teamaufbau';
t['Geocaching for corporate events and team building exercises through our partners.'] = 'Geocaching für Firmenevents und Teambildungsaufgaben durch unsere Partner.';


//**********************************************************************************


//History
//http://www.geocaching.com/about/history.aspx

t['The History of Geocaching'] = 'Die Geschichte des Geocaching';
t['GPS Users get an Instant Upgrade'] = 'GPS Benutzer bekommen ein Sofortaufrüstung';
t['On May 2, 2000, at approximately midnight, eastern savings time, the great blue switch* controlling '] = 'Am 2.Mai 2000, um ungefähr Mitternacht, östliche Zeitrechnung: Der große blaue Schalter*,der die ';
t['selective availability'] = 'punktuelle Nutzbarkeit';
t['was pressed. Twenty-four satellites around the globe processed their new orders, and instantly the accuracy of GPS technology improved tenfold. Tens of thousands of GPS receivers around the world had an instant upgrade.'] = 'kontrollierte, wurde gedrückt. 24 Satelliten rund um den Planeten verarbeiteten ihre neuen Aufträge und sofort wurde die Genauigkeit der GPS Technologie ums zehnfache verbessert. Zehntausende GPS-Empfängern in der Welt hatten eine sofortige Verbesserung.'; 

t['The announcement a day before came as a welcome surprise to everyone who worked with GPS technology. The government had planned to remove selective availability - but had until 2006 to do so. Now, said the White House, anyone could "precisely pinpoint their location or the location of items (such as game) left behind for later recovery." How right they were.'] = 'Die Ankündigung vom Tag zuvor kam als eine willkommene Überraschung für jeden, der mit GPS Technologie arbeitete. Die Regierung hatte die Entfernung des künstlichen Rauschens geplant - aber erst für 2006. Jetzt, sagte das Weiße Haus, könnte jeder "präzise seinen Standpunkt oder den eines Gegendstandes indentifiziern für einen späteren Wiederanlauf." Wie recht sie hatten.';

t['For GPS enthusiasts, this was definitely a cause for celebration. Internet newsgroups suddenly teemed with ideas about how the technology could be used.'] = 'Für GPS Enthusiasten war dies definitiv ein Grund zu Feiern. Internet Nachtichtenforen wimmelten plötzlich von Ideen, wie man diese Technologie nutzen könnte.';
 

t['On May 3, one such enthusiast, Dave Ulmer, a computer consultant, wanted to test the accuracy by hiding a navigational target in the woods. He called the idea the "Great American GPS Stash Hunt" and posted it in an internet GPS users\' group. The idea was simple: Hide a container out in the woods and note the coordinates with a GPS unit.'] = 'Am 3. Mai, wollte ein solcher Enthusiast, Dave Ulmer, ein Datenverarbeitungsberater, die Genauigkeit testen, indem er ein Navigationsziel im Wald versteckte. Er nannte die Idee "Die Große Amerikanische GPS Versteck Jagd" und veröffentlichte es in einer Internet Benutzergruppe. Die Idee war einfach: Verstecke einen Behälter draußen im Wald und notiere die Koordinaten mit einem GPS.';

t['The finder would then have to locate the container with only the use of his or her GPS receiver. The rules for the finder were simple: "Take some stuff, leave some stuff."'] = 'Der Finder sollte dann den Behälter nur mit Hilfe seines oder ihres GPS-Empfängers lokalisieren. Die Regeln für den Finder waren einfach: "Nimm etwas heraus, lass etwas da."';
 
t['On May 3rd he placed his own container, a black bucket, in the woods near Beaver Creek, Oregon, near Portland. Along with a logbook and pencil, he left various prize items including videos, books, software, and a slingshot. He shared the waypoint of his "stash" with the online community on sci.geo.satellite-nav:'] = 'Am 3. Mai platzierte er seinen eigenen Behälter, einen schwarzen Eimer, im Wald in der Nähe von Beaver Creek, Oregon, nahe Portland. Er enthielt ein Logbuch und Bleistift, sowie verschiedenwertige Gegenstände, wie Videos, Bücher, Software und eine Steinschleuder. Er teilte den Wegpunkt seines "Verstecks" in der Onlinegemeinschaft sci.geo.sattelite-nav mit:';

t['Within three days, two different readers read about his stash on the Internet, used their own GPS receivers to find the container, and shared their experiences online. Throughout the next week, others excited by the prospect of hiding and finding stashes began hiding their own containers and posting coordinates. Like many new and innovative ideas on the Internet, the concept spread quickly - but this one required '] = 'Innerhalb von 3 Tagen, lasen 2 verschiedene Leser über sein Versteck im Internet, nutzten ihr eigenes GPS, um den Behälter zu finden und teilten ihre Erfahrungen online mit. Während der nächsten Wochen begannden Andere, begeistert vom Verstecken und Finden, ihre eigenen Behälter zu verstecken und die Koordinaten zu veröffentlichen. Ähnlich wie viele neue und innovative Ideen im Internet, verbreitete sich das Konzept sehr schnell - aber dieses Konzept erforderte einen Computer um teilzunehmen.';
  
t['leaving your computer'] = ' ';
t[' to participate.'] = ' ';
t['Within the first month, Mike Teague, the first person to find Ulmer\'s stash, began gathering the online posts of coordinates around the world and documenting them on his personal home page. The "GPS Stash Hunt" mailing list was created to discuss the emerging activity. Names were even tossed about to replace the name "stash" due to the negative connotations of that name. One such name was "geocaching."'] = 'Innerhalb des ersten Monats begann Mike Teague, der Erstfinde von Ulmers Versteck, die Onlinebeträge mit Koordinaten rund um die Welt zu sammeln und dokumentierte diese auf seiner eigenen Internetseite. Die "GPS Versteck Jagd" Adressliste wurde erschafft, um die aufkommende Aktivität zu diskutieren. Namen wurden ausgeknobelt um den Namen "Versteck" (engl. "stash" = Versteck, Bunker) wegen der negativen besetzung des Wortes zu ersetzen. Einer dieser Namen war "geocaching".';
 
t['The Origins of Geocaching'] = 'Die Ursprünge des Geocaching';
t['Geocaching, first coined by Matt Stum on the "GPS Stash Hunt" mailing list on May 30, 2000, was the joining of two familiar words. The prefix '] = 'Geocaching, zuerst von Matt Stum in der "GPS Versteck Jagd" Adressliste am 30.Mai 200 geprägt, war die Vereinigung von zwei ähnlichen Wörtern. Das Präfix "geo", für Erde, wurde zur Beschreibung der globalen Natur der Aktivität genutzt, aber auch für den Gebrauch im GPS-Bereich, wie Geografie.';
 
t['geo'] = ' ';
t[', for Earth, was used to describe the global nature of the activity, but also for its use in familiar topics in gps such as geography.'] = ' ';
t['Caching, from the word '] = 'Caching, von dem Wort ';
  
t['cache'] = '"Cache"';
t[', has two different meanings, which makes it very appropriate for the activity. A french word invented in 1797, the original definition referred to a hiding place someone would use to temporarily store items. The word '] = ', hat zwei verschiedene Bedeutungen, was bei dieser Aktivität dazugehört. Es ist ein französisches Wort, dass in 1797 erfunden wurde, die eigentliche Definition bezieht sich auf ein Versteck, das von jemandem zeitweise genutzt wird, um Gegenstände zu lagern. Das Wort ';
t[' stirs up visions of pioneers, gold miners, and even pirates. Today the word is still even used in the news to describe hidden weapons locations.'] = ' schürt die Visionen von Pionieren, Goldschürfern und Piraten. Heute ist das Wort immernoch genutzt, um verstecke Waffendepots zu beschreiben.';
t['The second use of '] = 'Die zweite Verwendung von ';
t[' has more recently been used in technology. '] = ' wird eher in Technologie verwendet. ';
t['Memory cache'] = 'Cache-Speicher';
t[' is computer storage that is used to quickly retrieve frequently used information. Your web browser, for example, stores images on disk so you don\'t have to retrieve the same image every time you visit similar pages.'] = ' ist der Speicher vom Computer, der genutzt wird, um schnell häufig gebrauchte Infotmationen abzufragen. Dein Webbrowser, zum Beispiel, speichert Bilder auf der Festplatte, sodass du nicht dieselben Bilder jedes Mal neu laden musst, wenn du die gleiche Seite besuchst.';
t['The combination of Earth, hiding, and technology made '] = 'Die Kombination von Erde, Verstecken und Technologie machte ';
t['geocaching'] = 'geocaching';
t[' an excellent term for the activity. However the "GPS Stash Hunt" was the original and most widely used term until Mike Teague passed the torch to Jeremy Irish in September 2000.'] = ' zu einem exzellentem Begriff für die Aktivität. Allerdings war die "GPS Versteck Jagd", das Original, am weitesten verbreitet bis Mike Teague die Fackel zu Jeremy Irish im September 2000 übergab.';
 
t['The Birth of Geocaching.com'] = 'Die Geburt von geocaching.com';
t['For the first few months, geocaching was confined to existing experienced GPS users who already used the technology for outdoor activities such as backpacking and boating. Most users had an existing knowledge of GPS and a firm grasp of obscure lingo like datums and '] = 'In den ersten wenigen Monaten war Geocaching begrenzt auf erfahrene GPS Nutzer, die diese Technologie schon für Outdooraktivitäten, wie Wandern und Bootfahren, nutzten. Die meisten Nutzer hatten schon Wissen über GPS und Verstand für unklares Fachjargon, wie Formate und ';
 
t['. Due to both the player base and the newness of the activity, players had a steep learning curve before going out on their first cache hunt. Tools were scarce for determining whether a cache was nearby, if one existed at all.'] = 'Wegen des Spielerfundaments und der Neuheit der Aktivität, hatten Spieler eine steile Lernkurve, bevor sie zu ihrer ersten Cachejagd hinausgingen. Tools waren knapp um bestimmen zu können, ob ein Cache in der Nähe ist, wenn überhaupt einer existierte.';
 
t['As with most participants, Jeremy Irish, a web developer for a Seattle company, stumbled upon Mike Teague\'s web site in July while doing research on GPS technology. The idea of treasure hunting and using tech-gadgets represented the marriage of two of his biggest interests. Discovering one was hidden nearby, Jeremy purchased his first GPS unit and went on his first hunt the following weekend.'] = 'Wie bei vielen Teilnehmern, stolperte Jeremy Irish, ein Internetentwickler von einer Seattler Firma, während einer Nachforschung in GPS Technologie im Juli über Mike Teagues Internetseite. Die Idee der Schatzsuche und Nutzung von technischen Apparaten repräsentiert die Hochzeit von zwei seiner größten Interessen. Als Jeremy entdeckte, dass ein Cache in der Nähe versteckt war, erwarb er sein erstes GPS und ging auf seine erste Jagd am folgendem Wochenende.';

t['After experiencing the thrill of finding his first cache, Irish decided to start a hobby site for the activity. Adopting the term geocaching, he created Geocaching.com and applied his professional web skills to create tools to improve the cache-hunting experience. The cache listings were still added by hand, but a database helped to standardize the listings. Additional features, like searching for caches around zip codes, made it easier for new players to find listings for nearby caches.'] = 'Nach dem Nervenkitzel seinen ersten Cache zu finden, entschied sich Irish eine Hobbyinternetseite für die Aktivität zu starten. Den Begriff "geocaching" annehmend, schuf er geocaching.com und benutze seine Webfähigkeiten, um Tools zu erstellen, die die Cachejagd zu verbessern. Die Caches wurden noch per Hand hinzugefügt, aber eine Datenbank standardisierte die Einträge. Zusätliche Funktionen, wie Cachesuche durch Postleitzahlen, machten es für neue Spieler einfacher nahegelegene Caches zu finden.';

t['With Mike Teague\'s valuable input, the new site was completed and announced to the stash-hunting community on September 2, 2000. At the time the site was launched there were 75 known caches in the world.'] = 'Mit Mike Teagues wertvollem Beitrag wurde die neue Seite vervollständigt und bei der Versteckjägergemeinschaft am 2. September 2000 bekannt gemacht. Zu der Zeit, als die Seite gestartet wurde, waren 75 bekannte Caches in der Welt.';
  
t['If You Hide It, They Will Come'] = 'Wenn du es versteckst, werden sie kommen'; 
t['Slashdot, a popular online magazine for techies, reported the new activity on September 25, 2000, introducing a larger group of technology professionals to the activity. '] = 'Slashdot, ein populäres Onlinemagazin für Technikfreaks, berichtete über diese neue Aktivität am 25.September 2000 und führte eine größere Gruppe von professionellen Technikern in die Aktivität ein. ';
 
t['The New York Times'] = 'The New York Times';
t[' picked up the story and featured it in its "Circuits" section in October, starting a domino effect of articles written in magazines, newspapers, and other media outlets around the world. CNN even did a segment in December 2000 to profile the new hobby.'] = ' nahm die Story auf und zeigte sie in dem "Circuits"-Teil im October und startete damit einen Dominoeffekt von Artikeln, die in Magazinen, Zeitungen und anderen Medien in der ganzen Welt veröffentlicht wurden. CNN strahlte im Dezember 2000 einen Beitrag aus, um das neue Hobby vorzustellen.';

t['However, because there were so few caches in the world, many would-be participants discovered they didn\'t have a cache listed nearby. Many wondered whether anyone would bother looking for a cache if they hid one in their area. The growing community chanted the mantra "If you hide it, they will come" to the newer players. After some reassurances, pioneers of the hobby started placing caches just to see whether people would go find them. They did.'] = 'Allerdings enteckten viele willige Teilnehmer, dass kein Cache in ihrer Nähe ist, weil es nur so wenige Caches gab. Viele fragten sich, ob jemand bei einem Cache vorbeischauen würde, wenn sie einen in ihrer Region verstecken würden. Die wachsende Gemeinschaft verbreitete das Motto "Wenn du es versteckst, werden sie kommen" bei neuen Spielern. Nach einigen Zusicherungen begannen die Pioniere des Hobbys Caches zu platzieren, nur um zu sehen, ob andere Personen herauszogen, um ihn zu finden. Sie taten es.';

t['Through word of mouth, press articles, and even accidental cache discoveries, more and more people have become involved in geocaching. First started by technology and GPS enthusiasts, the ranks of geocachers now include couples, families, and groups from all walks of life. The excitement of the hunt appeals to both the inner (and outer) child. Today you can do a search on just about anywhere in the world and be able to walk, bike, or drive to a nearby hidden cache.'] = 'Durch Mundpropaganda, Zeitungsartikel und sogar ungewollten Cachefunden wurden immer mehr Leute beim Geocachen beteiligt. Zuerst durch Technologie und GPS Enthusiasten gestartet umfassen nun die Reihen der Geocacher Pärchen, Familien und Gruppen aus allen Berufen und Schichten. Die Begeisterung der Jagd appelliert an das innere (und äußere) Kind. Heutzutage kannst du überall in der Welt auf Suche gehen und hast die Möglichkeit zu einem nahegelegenem Cache zu gehen oder mit dem Fahrrad/dem Auto hinzufahren.';
 
t['The Creation of Groundspeak'] = 'Die Schöpfung von Groundspeak';
t['After the increased traffic from Slashdot, Irish realized that the ongoing management of the web site would quickly grow out of the lone computer on his home DSL line. So in late 2000, he partnered with Elias Alvord and Bryan Roth, two coworkers at Sunrise Identity, to start a new company called '] = 'Nach dem erhöhtem Datenverkehr von Slashdot realisierte Irish, dass das laufende Management der Internetseite schnell über den einsamen Computer an seinem Heim-DSL hinauswächst. Ende 2000 schuf er zusammen mit Elis Alvord und Bryan Roth, zwei Mitarbeitern der Sunrise Identity, eine neue Firma, genannt ';

t[' (originally "Grounded Inc."). With the proceeds from sales of 144 geocaching t-shirts, they moved the machines into a hosted environment in downtown Seattle. The founders continued to work for Sunrise Identity while managing the new company and the web site in their off hours.'] = ' (ursprünglich "Grounded Inc."). Mit dem Erlös von Verkäufen von 144 Geocaching T-Shirts verlagerten sie ihre Maschienen in eine gehostete Umgebung in Seattler Stadzentrum. Die Gründer fuhren mit der Arbeit für Sunrise Identity fort, während sie die neue Firma und die Internetseite in ihrer Freizeit managten.';

t['After several years of working on the web site, Jeremy and Elias were able to raise enough through Premium Memberships to make Groundspeak a full time job. In late 2005, Bryan Roth finally became a full time employee at the company.'] = 'Nach einigen Jahren Arbeit an der Internetseite waren Jeremy und Elias fähig durch Premium-Mitgliedschaften aus Groundspeak ein Vollzeitjob zu machen. Ende 2005 wurde Bryan Roth schließlich ein Vollzeitangestellter der Firma.';

t['Jeremy Irish, Elias Alvord and Bryan Roth continue to own and operate the web site today. They are supported by a small team of Groundspeak Lackeys and almost 100 geocaching volunteers worldwide.'] = 'Jeremy Irish, Elias Alvord und Bryan Roth besitzen und arbeiten weiterhin an der Internetseite. Sie werden von einem kleinen Team aus Groundspeak Lakaien und fast 100 Geocaching-Freiwilligen weltweit unterstützt.';
  
t['Special Thanks...'] = 'Spezielle Danksagung...';
t['Special thanks goes out to '] = 'Spezieller Dank geht an die ';
t[' who was gracious enough to support the Shop Groundspeak site in the early years, and '] = ', die gnädig genug waren den Groundspeak Shop in frühen Jahren zu unterstützen, und ';
t[', who continues to help us with network operations, bandwidth needs, and security on the web site.'] = ', der uns weiterhin mit unseren Netzweroperationen, Bandbreitenbedürfnissen und der Sicherheit auf der Internetseite hilft.';
t['Special, special, thanks go to the unsung heroes who maintain and review the ever-growing list of caches listed on the web site. Additional thanks goes to Moun10bike (Jon Stanley), for donating various Microsoft software licenses that help run the web site. Thanks Jon!'] = 'Ein sehr spezielles Dankeschön geht an die unbesungenden Helden, die die immerwachsende Liste von Caches aufrechterhalten und überprüfen. Zusätzlicher Dank geht an Moun10bike (Jon Stanley) für die Spende verschiedener Microsoft Software Lizenzen, die der Internetseite helfen zu funktionieren. Danke Jon!';

t['*there is no actual blue switch'] = '*es gibt eigentlich keinen blauen Schalter';

//**********************************************************************************

//CacheTypen
//http://www.geocaching.com/about/cache_types.aspx

t['Geocache Types'] = 'Geocache Typen';

//Tradi

t['This is the original cache type consisting, at a bare minimum, a container and a log book. Normally you\'ll find a tupperware container, ammo box, or bucket filled with goodies, or smaller container ("micro cache") too small to contain items except for a log book. The coordinates listed on the traditional cache page are the exact location for the cache.'] = 'Dies ist der ursprüngliche Cachetyp, der mindestens aus einem Behälter und einem Logbuch besteht. Normalerweise wirst du eine Tupperdose, Munitionskiste oder Eimer mit tollen Sachen gefüllt finden oder keinere Behälter ("Mikrocache"), die zu klein für Gegenstände, ausser dem Logbuch, sind. Die gelisteten Koordinaten auf der Cacheseite beschreiben die exakte Lage des Caches.';
t['The general rule of thumb is, "If you take an item, leave an item, and write in the logbook." Some caches are themed, so make sure to read the description before going on a hunt.'] = 'Die generelle Faustregel ist "Wenn du ein Gegenstand nimmst, lass einen Gegenstand dort und schreib ins Logbuch." Einige Caches sind thematisch ausgerichtet, also lies die Beschreibung, bevor du auf die Jagd gehst.';

//Multi

t['Multi-Cache (Offset Cache)'] = 'Multi-Cache';
t['A multi-cache ("multiple") involves two or more locations, the final location being a physical container. There are many variations, but most multi-caches have a hint to find the second cache, and the second cache has hints to the third, and so on. An offset cache (where you go to a location and get hints to the actual cache) is considered a multi-cache.'] = 'Ein Multi-Cache beinhaltet zwei oder mehrere Orte, wobei die finale Position ein physischer Behälter sein muss. Es gibt viele Variationen, aber die meisten Multi-Caches haben einen Hinweis auf den zweiten Cache und der zweite für den dritten, usw.';

//A.P.E.

t['Project A.P.E. Cache'] = 'Projekt A.P.E. Cache';
t['In 2001, twelve geocaches were placed in conjunction with 20th Century Fox to support the movie '] = 'Im Jahr 2001 wurden 12 Geocaches in Verbindung mit 20th Century Fox versteckt, um den Film ';
t['Planet of the Apes'] = 'Planet der Affen zu unterstützen';
t['. Each cache represented a fictional story in which scientists revealed an Alternative Primate Evolution. These caches were made using specially marked ammo containers. Each cache had an original prop from the movie. Only a few Project A.P.E. caches exist today.'] = '. Jeder Cache repräsentiert eine erfundene Geschichte, in denen Wissenschaftler eine Alternative Primatenevolution entdecken. Diese Caches wurden aus speziellen Munitionskisten gemacht. Jeder Cache beinhaltete eine Originalrequisite aus dem Film. Nur wenige Projekt A.P.E. Caches existieren heute noch.';

//Mystery

t['Mystery or Puzzle Caches'] = 'Mysteriöse oder Puzzle Caches';
t['The "catch-all" of cache types, this form of cache can involve complicated puzzles you will first need to solve to determine the coordinates. Due to the increasing creativity of geocaching this becomes the staging ground for new and unique challenges.'] = 'Der Allumfassende der Cachetypen, diese Cacheform kann aus komplizierten Puzzles, die du lösen musst, um an die Koordinaten zu kommen, bestehen. Wegen der steigenden Kreativität von Geocaching, wurde dieser der Sammelpunkt für neue und einzigartige Herausforderungen.';

//Letterbox

t['A letterbox is another form of treasure hunting using clues instead of coordinates. In some cases, however, the owner has made it both a letterbox and a geocache and posted its coordinates on Geocaching.com. If there is a stamp inside a letterbox hybrid, it is not an item intended for trade; the stamp is meant to remain in the box so that visitors can use it to record their visit.To read more about letterboxing, visit the '] = 'Ein Letterbox ist eine andere Form von Schatzjagd, die Hinweise anstatt Koordinaten benutzt. In einigen Fällen hat der Besitzer jedoch beides aus einem Letterbox gemacht und trug auch die Koordinaten bei geocaching.com ein. Wenn ein Stempel in einem Letterbox ist, ist er kein Tauschgegenstand; der Stempel soll in der Box verbleiben, sodass Besucher mit ihm ihren Besuch verzeichnen können. Um mehr über "letterboxing" zu erfahren, besuche die ';
t['Letterboxing North America'] = 'nordamerikanische Letterboxing Internetseite';
t[' web site.'] = '.';

//Wherigo

t['Wherigo is a toolset for creating and playing GPS-enabled adventures in the real world. By integrating a Wherigo experience, called a cartridge, with finding a cache, the geocaching hunt can be an even richer experience. Among other uses, Wherigo allows geocachers to interact with physical and virtual elements such as objects or characters while still finding a physical geocache container. A Wherigo-enabled GPS device is required to play a cartridge. Learn more at '] = 'Wherigo ist ein Werkzeugsatz, um spielbare GPS-fähige Abenteuer in der realen Welt zu erstellen. Wenn man eine Wherigo-Routine, gennant "cartidge", mit dem Finden eines Caches verbindet, kann die Jagd eine reichere Erfahrung sein. Wherigo erlaubt Geocachern mit physischen und virtuellen Elementen, wie Objekten oder Charakteren, zu interagieren, während immernoch ein physischer Geocachebehälter gefunden werden kann. Ein Wherigofähiges GPS wird benötigt, um eine "cartridge" abzuspielen. Lerne mehr bei ';

//Event

t['Occasionally, local geocachers and geocaching organizations designate a time and location to meet and discuss geocaching. After the event the caches are archived.'] = 'Gelegentlich bestimmen lokale Geocacher und Geocaching-Organisationen eine Zeit und einen Ort, um sich zu treffen und über Geocachen zu diskutieren. Nach dem Event werden die Caches archiviert.';

//Mega-Event

t['A Mega-Event cache is similar to an Event Cache but it is much larger. In order to qualify as a Mega Event, the event cache must be attended by 500+ people. Typically, Mega Events are annual events and attract geocachers from all over the world.'] = 'Ein Mega-Event-Cache ist gleich einem Event Cache, aber es ist um einiges größer. Um sich als Mega Event zu qualifizieren, muss der Event Cache von 500+ Personen beigewohnt werden. Typische Mega Events sind jähliche Events und locken Geocacher aus der ganzen Welt an.';

//Cito

t[' is an activity intimately tied to geocaching. While out there on a cache hunt, we collect litter along the trails and properly dispose of it. Cache In Trash Out Events are much larger clean-up events that involve and benefit the larger community.'] = ' ist eine eng mit Geocaching verbundene Aktivität. Während man draußen auf der Cachejagd ist, sammelt man Müll entlang seinen Wegen und entsorgt diesen. Cache In Trash Out Events sind große Reinigungsevents, die die große Gemeinschaft einbezieht und profitieren lässt.';

//EarthCache

t['An EarthCache is a special place that people can visit to learn about a unique geoscience feature or aspect of our Earth. EarthCaches include a set of educational notes and the details about where to find the location (latitude and longitude). Visitors to EarthCaches can see how our planet has been shaped by geological processes, how we manage the resources and how scientists gather evidence to learn about the Earth. For more information about EarthCaches, visit '] = 'Ein EarthCache ist ein spezieller Platz, den Leute besuchen und dort etwas über einzigartige geologische Eigenschaften oder Aspekte unserer Erde lernen können. EarthCaches enthalten eine Reihe von lehrreichen Notizen und Detail darüber, wo der Platz zu finden ist (Breiten- und Längengrad). Besucher von EarthCaches können sehen, wie der Planet durch geologische Prozesse geformt wurde, wie man mit Ressourcen umgeht und wie Wissenschaftler Belege, um etwas über die Erde zu lernen, sammeln. Für mehr Informationen über EarthCaches besuche ';


//GPS Adventures Maze Exhibit

t['GPS Adventures Maze Exhibit'] = 'GPS Abenteuer Labyrinth Ausstellung';
t['A GPS Adventures Exhibit Cache represents attendance at the GPS Adventures Maze Exhibit or a regional variation of this Exhibit. GPS Adventures Mazes are designed to teach people of all ages about GPS technology and geocaching through interactive science experiences.'] = 'Ein "GPS Abenteuer Ausstellungs"-Cache repräsentiert die Teilnahme an einer "GPS Abenteuer Labyrinth"-Ausstellung oder einer regionalen Variante der Ausstellung. "GPS Abenteuer Labyrinthe" wurden für Personen allen Altersstufen entworfen, um ihnen etwas über die GPS-Technologie durch interaktive Erfahrungen zu lehren.';

//Grandfathered Cache Types

t['Grandfathered Cache Types'] = 'Durch Neuregelung ausgenommene Caches';
t['These are cache types that are no longer available for creation on geocaching.com. Visit '] = 'Dies sind Cache Typen, die nicht länger auf geocaching.com erstellt werden könne. Besuche ';
t['the Waymarking web site'] = 'die Waymarking Internetseite';
t['for other GPS hunting activities.'] = ' für mehr GPS-Jagd Aktivitäten.';

//Virtual Cache

t['Virtual Cache'] = 'Virtueller Cache';
t['A virtual cache is a cache that exists in a form of a location. Depending on the cache "hider," a virtual cache could be to answer a question about a location, an interesting spot, a task, etc. The reward for these caches is the location itself and sharing information about your visit.'] = 'Ein Virtueller Cache ist ein Cache, der in Form einer Position existiert. Abhängig vom "Verstecker" kann ein virtueller Cache durch eine Frage über eine Position, einen interessanten Fleck, einer Aufgabe, usw. geloggt werden. Die Belohnung für diesen Cache ist die Gegend selbst und das Teilen der Erfahrungen deines Besuches dort.';

t['Because of the nature of these geocaches, you must actually visit the location and acquire the coordinates there before you can post. In addition, although many locations are interesting, a virtual cache should be out of the ordinary enough to warrant logging a visit.'] = 'Wegen der Eigenschaft dieser Geocaches musst du tatsächlich die Gegend besuchen und die Koordianten des Ortes speichern, bevor du loggen kannst. Obwohl viele Orte interessant sind, sollte ein virtueller Cache zusätzlich etwas so besonderes sein, damit der Besuch beim Loggen gewährleisten ist.';

t['Virtuals are now considered '] = 'Virtuelle sind nun hier zu finden: ';

//Webcam Cache

t['These are caches that use existing web cameras placed by individuals or agencies that monitor various areas like parks or road conditions. The idea is to get yourself in front of the camera to log your visit. The challenging part, however, it that you need to call a friend to look up the web site that displays the camera shot. You will need to have them to save the picture to log the cache. If you’re a tech-head you could use your wireless modem and save the image yourself on your laptop.'] = 'Dies sind Caches, die existierende Webcams von Privatpersonen oder Agenturen nutzen, die verschiedene Gebiete, wie Parks oder Straßenverhältnisse zeigen. Die Idee ist es vor diese Kamera zu treten um den Besuch zu loggen. Der schwierige Part ist jedoch, dass du einen Freund anrufen musst, der auf die Internetseite der Kamera gehen muss. Du brauchst ihn um ein Bild zu machen, dass deinen Besuch beweist. Wenn du ein Technikfreak bist, kannst du dein kabelloses Internet auf deinem Laptop nutzen und selbst ein Foto machen.';

t['Webcam caches are now in the '] = 'Webcam Caches sind nun in der ';
t['Web Camera category on Waymarking.com'] = 'Webcam Kategorie auf Waymarking.com';
t['Locationless (Reverse) Cache'] = 'Positionsloser (Umgekehrter) Cache';
t['Locationless caches could be considered the opposite of a traditional cache. Instead of finding a hidden container, you are given a task to locate a specific object and log its coordinates. A scavenger hunt of sorts, it involves collecting waypoints of various objects around the world.'] = 'Positionslose Caches könnten als Gegensatz zum Traditionellen Cache gesehen werden. Anstatt versteckte Behälter zu suchen, bekommst du eine Aufgabe ein spezielles Objekt zu lokalisieren und dessen Koordinaten zu loggen. Eine Schnitzeljagd allerart, sie beinhaltet das Sammeln von Wegpunkten von verschiedenen Objekten in der Welt.';

t['Locationless caches have evolved into '] = 'Positionslose Caches haben sich hier entwickelt: ';
t['. Waymark categories are similar to how locationless caches were listed on geocaching.com, but you can now search for the locations in each category.'] = '. Waymark Kategorien sind ähnlich wie der positionslose Cache, der auf geocaching.com gelistet wurde, aber du kannst dort nach Standorten in allen Kategorien suchen.';






//**********************************************************************************

//Übersetzen der Glossary of terms
//http://www.geocaching.com/about/glossary.aspx

t['The Geocaching.com glossary is always changing. If you have suggestions for future additions, please '] = 'Das geocaching.com Glossar verängert sich ständig. Wenn du Vorschläge für zukünftige Veränderungen hast ';
t['contact us'] = 'kontaktiere uns';
t['Archiving a cache removes the listing from public view on Geocaching.com. This action is usually taken when a cache owner does not intend to replace a cache after it has been removed. As an alternative to archiving, the cache owner can temporarily disable their cache if they plan to provide maintenance on the cache or replace the container within one month.'] = 'Archivieren entfernt einen Cache aus der öffentlichen Liste von geocaching.com. Diese Aktion wird oft ausgeführt, wenn der Cachebesitzer einen Cache nicht ersetzen möchte, wenn er entfernt wurde. Als alternative kann der Cachebesitzer seinen Cache zeitweise sperren, wenn er eine Pflege oder Ersetzung des Caches innerhalb eines Monats plant.';
t['These are icons on a cache detail intended to provide helpful information to geocachers who wish to find specific types of caches. These icons represent unique cache characteristics, including size, whether the cache is kid friendly, if it is available 24 hours a day, if you need special equipment and more. Attributes are also a tool to help you filter the types of caches you would like to search for when building a Pocket Query (see '] = 'Dies sind Symbole auf der Cachedetail Seite und sollen Geocachern, die einen speziellen Cachetyp suchen, hilfreiche Informationen anbieten. Diese Symbole repräsentieren einzigartige Charakteristiken, einschließlich Größe, ob der Cache kinderfreundlich ist, ob der Cache 24 Stunden am Tag verfügbar ist, ob man spezielle Ausrüstung benötigt und mehr. Attribute helfen auch spezielle Cachetypen bei Pocket Queries herauszufiltern (siehe ';


t['). Learn more about '] = '). Erfahre mehr über ';
t['Using your GPS unit and/or written directions provided by NOAA\'s National Geodetic Survey (NGS), you can seek out NGS survey markers and other items that have been marked in the USA. See '] = 'Mit deinem GPS und/oder schriftlichen Anweisungen von der NOAA\'s National Geocetic Survey (NGS), kannst du NGS Vermessungsmarken oder andere Gegenstände suchen, die in der USA markiert wurden. Besuche ';

t[' for more details.'] = ' für mehr Informationen.';
t['Bookmark List'] = 'Lesezeichenliste';
t['A Premium Member feature that can be used to group cache listings in whatever way you like. You may want a bookmark list of caches you intend to find this weekend, or perhaps an "all-time favorite" list you can share with friends.'] = 'Eine Premium-Mitglied Funktion, die Caches zu Gruppen organisieren kann, wie es dir beliebt. Du könntest eine Lesezeichenliste mit Caches, die du am nächsten Wochenende finden möchstest, oder "Dauerfavoriten" erstellen und mit Freunden teilen.';

t['BYOP'] = 'BYOP/BDES';
t['Bring Your Own Pen/Pencil. An acronym often used by cache owners to communicate to other geocachers that you will need to bring your writing utensil in order to sign the cache logbook.'] = 'Bring Your Own Pen/Pencil oder Bringe Deinen Eigenen Stift. Eine Abkürzung, die oft von Cachebesitzern benutzt wird um Geocachern mitzuteilen, dass sie ihre eigenen Schreibgeräte mitbringen sollen um in das Logbuch zu schreiben.';

t['The Bureau of Land Management (BLM), an agency within the U.S. Department of the Interior, administers millions of acres of America\'s public lands, located primarily in 12 Western States. The BLM sustains the health, diversity, and productivity of the public lands for the use and enjoyment of present and future generations. Learn more at '] = 'Das Bureau of Land Management (BLM) ist eine Agentur in den USA, die Millionen von Grundbesitzen in Amerikas öffentlichen Land verwaltet, überwiegend ansässig in 12 westlichen Staaten. Das BLM trägt die Gesundheit, Vielfalt und Produktivität vom öffentlichen Land für gegenwärtige und zukünftige Generationen. Erfahre mehr auf ';

t['A shortened version of the word geocache. (See '] = 'Eine verkürzte Version des Wortes "geocache". (Siehe ';
t['Caches along a Route'] = 'Caches entlang einer Route';
t['A Premium Member feature that allows you to identify caches along a specific route for quick and easy geocaching. You can choose from routes already created by other geocachers or use Google Earth to build your own unique trip.'] = 'Eine Premium-Mitglied Funktion mit der man schnell und einfach Caches entlang einer speziellen Route finden kann. Du kannst aus bereits bestehenden Routen anderer Geocacher wählen oder mit Google Earth deine eigene Route erstellen.';

t['Charter Member'] = 'Gründungsmitglied';
t['During the very early years of Geocaching.com when Premium Memberships were first offered, they were called Charter Memberships to thank those who supported the web site. Be sure to thank the Charter Members you meet on the trail since the site would not be here today without them.'] = 'Während der ersten Jahre von geocaching.com, als zum ersten Mal Premium-Mitgliedschaften angeboten wurden, nannte man diese "GRündungsmitglieder" um ihnen für die Unterstützung der Internetseite zu danken. Bedanke dich bei Gründungsmitglieder, wenn du sie triffst, denn ohne sie würde diese Seite heute nicht existieren.';

t['Cache In Trash Out is an ongoing environmental initiative supported by the worldwide geocaching community. Since 2002, geocachers have been dedicated to cleaning up parks and other cache-friendly places around the world. Learn more at '] = 'Cache In Trash Out ist eine Umweltinitiative, die von weltweiten Geocaching-Gemeinschaften unterstützt wird. Seit 2002 haben sich Geocacher engagiert Parks oder andere cachefreundlichen Plätze in der Welt zu säubern. Erfahre mehr auf ';

t['Datum'] = 'Format/Bezug';
t['A datum is something used as a basis for calculating and measuring. In the case of GPS, datums are different calculations for determining longitude and latitude for a given location.'] = 'Der Bezug wird als Basis für Berechnungen und Messungen genutzt. Im Fall von GPS sind die Bezüge verschiedene Rechnungen um Breiten- und Längengrad für eine gegebene Position zu bestimmen.';

t['Currently, Geocaching uses the '] = 'Derzeit benutzt Geocaching das ';
t['for all caches. Many maps still use NAD27, which can cause confusion if your GPS unit is set to NAD27. Always check your GPS to ensure that WGS84 is the datum before entering a cache coordinate into your unit.'] = ' für alle Caches. Viele Karten nutzen noch das NAD27, was zu Verwirrungen bei deinem GPS führen kann, wenn es auf NAD27 gesetzt ist. Prüfe bei deinem GPS immer, ob der Bezug auf WGS84 gestellt ist, bevor du Cache-Koordinaten eingibst.';

t['Did Not Find. An acronym used by geocachers to state that they did not find a cache. This is also a type of online log on Geocaching.com and is useful for alerting cache owners of potential issues. Cache owners who repeatedly receive "Did Not Find" logs should check to see that there cache has not been removed.'] = 'Did Not Find/ Nicht gefunden. Eine Abkürzung, die von Geocachern genutzt wird, um anzugeben, dass sie den Cache nicht gefunden haben. Es ist auch ein Typ bei den Onlinelogs auf geocaching.com und ist ein hilfreicher Alarm, um den Cachebesitzer auf mögliche Probleme aufmerksam zu machen. Cachebesitzer, die wiederholt "Nicht Gefunden"-Logs erhalten, sollten  prüfen, ob der Cache entfernt wurde.';

t['D/T'] = 'S/G';
t['Geocaches are rated in two categories, each designated on a 5-point scale. Difficulty relates to the mental challenge of finding a cache and terrain describes the physical environment. A 1/1 difficulty/terrain rating would the easiest cache to find, while a 5/5 difficulty/terrain rating would be the most difficult.'] = 'Geocaches werden in zwei Kategorien auf einer 5-Punkte-Skala bewertet. Schwierigkeit bezieht sich auf die geistige Herausforderung den Cache zu finden und Gelände auf die physische Umgebung. Eine 1/1 Schwierigkeit/Gelände-Wertung ist der einfachste Cache, während die 5/5-Wertung der schwierigste ist.';

t['This is one of several unique cache types. An EarthCache is a cache that promotes geoscience education. Visitors to EarthCaches can see how our planet has been shaped by geological processes, how we manage the resources and how scientists gather evidence to learn about the Earth. For more information about EarthCaches, visit '] = 'Ein EarthCache ist ein spezieller Platz, den Leute besuchen und dort etwas über einzigartige geologische Eigenschaften oder Aspekte unserer Erde lernen können. EarthCaches enthalten eine Reihe von lehrreichen Notizen und Detail darüber, wo der Platz zu finden ist (Breiten- und Längengrad). Besucher von EarthCaches können sehen, wie der Planet durch geologische Prozesse geformt wurde, wie man mit Ressourcen umgeht und wie Wissenschaftler Belege, um etwas über die Erde zu lernen, sammeln. Für mehr Informationen über EarthCaches besuche ';
t['This is one of several unique cache types. Events are gatherings set up by local geocachers and geocaching organizations to meet players and to discuss geocaching.'] = 'Gelegentlich bestimmen lokale Geocacher und Geocaching-Organisationen eine Zeit und einen Ort, um sich zu treffen und über Geocachen zu diskutieren. Nach dem Event werden die Caches archiviert.';
t['First to Find. An acronym written by geocachers in physical cache logbooks or online when logging cache finds to denote being the first to find a new geocache.'] = 'First To Find/Erstfinder. Eine Abkürzung, die von Geocachern in Cachelogbücher oder im Onlinelog geschreiben wird, wenn sie den Cache als Erste gefunden haben.';

t['A unique identifier associated with every geocache listing. The GC Code starts with the letters "GC" and is followed by other alphanumeric characters.'] = 'Eine einzigartige Bezeichnung, die mit einem Cache verbunden wird. Der GC Code beginnt mit den Buchstaben "GC" und wird mit anderen alphanumerischen Zeichen vervollständigt.';

t['A container hidden that includes, at minimum, a logbook for geocachers to sign.'] = 'Ein versteckter Behälter, in dem mindestens ein Logbuch enthalten ist, in dem sich Geocacher eintragen können.';
t['Geocaching is a worldwide game of hiding and seeking treasure. A geocacher can place a geocache in the world, pinpoint its location using GPS technology and then share the geocache’s existence and location online. Anyone with a GPS unit can then try to locate the geocache.'] = 'Geocaching ist ein weltweites Versteck- und Suchspiel. Ein Geocacher kann einen Cache in der Welt platzieren, die Position per GPS bestimmen und dann die Existenz des Caches online mitteilen. Jeder, der ein GPS hat, kann dann versuchen den Cache zu finden.';

t['Geocoins work similarly to Groundspeak Travel Bugs'] = 'Geocoins funktionieren gleich wie Groundspeak Travelbugs';
t[' (see '] = ' (siehe ';
t[') in that they are trackable and can travel the world, picking up stories from geocache to geocache. Geocoins are often created as signature items by geocachers and can also be used as collectibles.'] = '). Sie sind verfolgbar und können um die Welt reisen und Geschichten von Cache zu Cache mitnehmen. Geocoins sind oft signierte Gegenstände von Geocachern und können auch gesammelt werden.';

t['GPS stands for Global Positioning System. It is a system of satellites that work with a GPS receiver to determine your location on the planet. For more information on GPS, '] = 'GPS steht für Global Positioning System (Globales Positionsbestimmungssystem). Es ist ein System aus Satelliten, das mit einem GPS-Empfänger funktioniert, um deine Position auf dem Planeten zu bestimmen. Für mehr Informationen über GPS: ';

t['This is one of several unique cache types. An exhibit cache represents geocaching participation at the GPS Adventures Maze Exhibit. The GPS Adventures Maze is a traveling educational exhibit designed to teach people of all ages about navigation, GPS technology and geocaching. '] = 'Ein "GPS Abenteuer Ausstellungs"-Cache repräsentiert die Teilnahme an einer "GPS Abenteuer Labyrinth"-Ausstellung oder einer regionalen Variante der Ausstellung. "GPS Abenteuer Labyrinthe" wurden für Personen allen Altersstufen entworfen, um ihnen etwas über die GPS-Technologie durch interaktive Erfahrungen zu lehren.';
t['Slang for a GPS receiver. Equipment to receive GPS signals for use in navigation.'] = 'Umgangssprachlich für einen GPS-Emfänger. Ausrüstung, um GPS-Signale zu empfangen und zur Navigation zu nutzen.';
t['A specific file format available when creating a Pocket Query. A Premium Member feature, the GPX file format has specific geocaching information that can be used by supporting applications.'] = 'Ein spezielles Dateiformat für Pocket Queries. Eine Premium-Mitglied Funktion. Das GPX-Format enthält spezifische Informationen, die von unterstüzenden Geräten genutzt werden können.';

t['The point where your GPS device shows that you have reached the cache location. At Ground Zero, you are zero feet (or zero meters) away from your destination.'] = 'Der Punkt, an dem dein GPS zeigt, dass du die Cacheposition erreicht hast. Bei Ground Zero bist du null Meter von deinem Ziel entfernt.';


t['A hitchhiker is an item that is placed in a cache, and has instructions to travel to other caches. Sometimes they have logbooks attached so you can log their travels. A '] = 'Ein Hitchhiker (Anhalter,Tramper) ist eine Gegenstand in einem Cache, der die Aufgabe hat zu anderen Caches zu reisen. Manchmal haben sie Logbücher, sodass du ihre Reise nachvollziehen kannst. Ein ';

t[' is an example of a hitchhiker.'] = ' ist ein Bespiel eines Hitchhikers.';
t['Latitude'] = 'Breitengrad';
t['Latitude and longitude create a '] = 'Breiten- und Längengrad ergeben einen ';
t['waypoint'] = 'Wegpunkt';
t['. Latitude is the angular distance north or south from the earth\'s equator measured through 90 degrees. (Listen to '] = '. Der Breitengrad ist der Winkelabstand nördlich oder südlich vom Erdäquator gemessen bis 90 Grad. (Hör dir diese ';
t['this mp3'] = 'mp3';
t[' for an entertaining way to learn about longitude and latitude (thanks to '] = ' an, um auf unterhaltsame Weise etwas über Breiten- und Längengrad zu lernen (Dankeschön an ';
t['Letterboxing is similar to Geocaching, but you use a series of clues to find a container. Once you find the container (or letterbox), you use the carved stamp from the box, stamp your personal logbook and return that stamp to the letterbox. You then use your carved stamp and stamp the letterbox\'s logbook. See '] = 'Ein Letterbox ist eine andere Form von Schatzjagd, die Hinweise anstatt Koordinaten benutzt. In einigen Fällen hat der Besitzer jedoch beides aus einem Letterbox gemacht und trug auch die Koordinaten bei geocaching.com ein. Wenn ein Stempel in einem Letterbox ist, ist er kein Tauschgegenstand; der Stempel soll in der Box verbleiben, sodass Besucher mit ihm ihren Besuch verzeichnen können. Um mehr über "letterboxing" zu erfahren, besuche die ';
t['The original download format for the search results page on Geocaching.com.'] = 'Das ursprüngliche Format zum Herunterladen der Suchergebnisse auf geocaching.com.';
t['This is one of several cache types which are no longer available for creation on Geocaching.com. Instead of finding a hidden container, you are given a task to locate a specific object and log its coordinates. A scavenger hunt of sorts, it involves collecting waypoints of various objects around the world.'] = 'Positionslose Caches könnten als Gegensatz zum Traditionellen Cache gesehen werden. Anstatt versteckte Behälter zu suchen, bekommst du eine Aufgabe ein spezielles Objekt zu lokalisieren und dessen Koordinaten zu loggen. Eine Schnitzeljagd allerart, sie beinhaltet das Sammeln von Wegpunkten von verschiedenen Objekten in der Welt.';

t['When a response to a new post in the forums points you to a similar topic in the past. Based on the user '] = 'Wenn eine Antwort auf einen neuen Beitrag im Forum auf ein ähnliches Thema aus der Vergangenheit hinweist. Basierend auf dem Nutzer ';
t['This is one of several cache types. A Mega-Event cache is similar to an Event Cache but it is much larger. Among other considerations, a Mega-event cache must be attended by 500+ people. Typically, Mega Events are annual events and attract geocachers from all over the world.'] = 'Ein Mega-Event-Cache ist gleich einem Event Cache, aber es ist um einiges größer. Um sich als Mega Event zu qualifizieren, muss der Event Cache von 500+ Personen beigewohnt werden. Typische Mega Events sind jähliche Events und locken Geocacher aus der ganzen Welt an.';
t['A non-geocacher. Based on "Muggle" from the Harry Potter series, which is a non-magical person. Usually this term is used after a non geocacher looks puzzled after befriending a geocacher searching for a cache, or when a non-geocacher accidentally finds a cache. Geomuggles are mostly harmless.'] = 'Ein Nicht-Geocacher. Basierend auf den "Muggles" aus der Harry Potter Serie, die Nicht-Magische Personen beschreiben. Normalerweise wird der Ausdruck benutzt, wenn ein Nicht-Geocacher nach einer Suche mit einem Geocacher verblüfft guckt, oder wenn ein Nicht-Geocacher durch Zufall einen Cache findet. Geomuggles sind meist harmlos.';

t['This is one of several cache types. A multi-cache ("multiple") involves two or more locations, the final location being a physical container. There are many variations, but most multi-caches have a hint to find the second cache, and the second cache has hints to the third, and so on. An offset cache (where you go to a location and get hints to the actual cache) is considered a multi-cache.'] = 'Ein Multi-Cache beinhaltet zwei oder mehrere Orte, wobei die finale Position ein physischer Behälter sein muss. Es gibt viele Variationen, aber die meisten Multi-Caches haben einen Hinweis auf den zweiten Cache und der zweite für den dritten, usw.';
t['This is one of several cache types. The "catch-all" of cache types, this form of cache can involve complicated puzzles you will first need to solve to determine the coordinates. Examples include complicated ciphers, simple substitutions, arithmetical quizzes and clues cleverly hidden within the graphics, Due to the increasing creativity of geocaching this becomes the staging ground for new and unique challenges.'] = 'Der Allumfassende der Cachetypen, diese Cacheform kann aus komplizierten Puzzles, die du lösen musst, um an die Koordinaten zu kommen, bestehen. Wegen der steigenden Kreativität von Geocaching, wurde dieser der Sammelpunkt für neue und einzigartige Herausforderungen.';
t['Stands for North American '] = 'Steht für den nordamerikanischen ';
t[' 1927. The precursor to '] = ' von 1927. Der Vorgänger vom ';
t['. Many maps still use the NAD27 datum , so always check before using a GPS unit with a map.'] = '. Viele Karten nutzen immenoch den NAD27 Bezug, prüfe das immer, bevor du ein GPS mit Karte nutzt.';
t['A Premium Member feature, a Pocket Query is custom geocache search that you can have emailed to you on a daily or weekly basis. Pocket Queries give you the ability to filter your searches so you only receive information on the caches you want to search for in either a GPX of LOC format. This feature lets you download up to 500 caches at one time.'] = 'Eine Premium-Mitglieder Funktion. Eine Pocket Query ist eine persönliche Geocachesucher, die dir täglich oder wöchentlich zugemailt wird. Pocket Queries geben dir die Fähigkeit deine Suchen so zu filtern, dass du nur Informationen im GPX oder LOC Format über Caches bekommst, die du suchen möchtest. Mit dieser Funktion kannst du bis zu 500 Caches mit einem Mal herunterladen.';

t['This is one of several cache types. In 2001, twelve geocaches were placed in conjunction with 20th Century Fox to support the movie '] = 'Im Jahr 2001 wurden 12 Geocaches in Verbindung mit 20th Century Fox versteckt, um den Film ';
t['. Each cache represented a fictional story in which scientists revealed an Alternative Primate Evolution. These caches were made using specially marked ammo containers. Each cache had an original prop from the movie. Only two Project A.P.E. caches exist today.'] = '. Jeder Cache repräsentiert eine erfundene Geschichte, in denen Wissenschaftler eine Alternative Primatenevolution entdecken. Diese Caches wurden aus speziellen Munitionskisten gemacht. Jeder Cache beinhaltete eine Originalrequisite aus dem Film. Nur wenige Projekt A.P.E. Caches existieren heute noch.';
t['Volunteers from all over the world who publish the cache listings on geocaching.com.'] = 'Freiwillige aus aller Welt, die Cache-Einträge auf geocaching.com veröffentlichen.';
t[' Hints for geocaches are encrypted using a simple format where each of the letters are rotated 13 characters up or down in the alphabet. '] = 'Hinweise in Geocaches werden mit einem einfachen Format verschlüsselt, bei dem jeder Buchstabe 13 Zeichen im Alphabet hoch- oder runterrotiert.';
t['Signature Item'] = 'Signierter Gegenstand';
t['An item unique to a specific geocacher that is left behind in caches to signify that they visited that cache. These often include personal geocoins, tokens, pins, craft items or calling cards.'] = 'Ein einzigartiger Gegenstand, den Geocacher in einem Cache hinterlassen, um ihren Besuch zu kennzeichnen. Es sind oft persönliche Geocoins, Figuren, Pins, Kunsgegenstände oder Telefonkarten.';

t['A spoiler is information that can give details away and ruin the experience of something. For example, telling someone the end of a movie before they see it. In geocaching, a spoiler gives away details of a cache location and can ruin the experience of the find.'] = 'Ein Spoiler ist eine Information, die Details preisgibt und somit die eigene Erfahrung ruiniert. Zum Beispiel jemandem zu sagen, wie ein Film ausgeht, bevor er ihn gesehen hat. Beim Geocachen sind Spoiler Details der Cachepoition und ruinieren das Vergnügen ihn zu finden.';

t['An acronym often referred to as standing for \'Stuff We All Get." It includes the trade items left in caches by geocachers.'] = 'Eine Abkürzung die oft für "Zeug, das wir alle bekommen" ("Stuff, we all get") steht. Es schließt die Tauschgegenstände in Caches mit ein.';
t['Thanks For The Cache. An acronym written by geocachers in physical cache logbooks or online when logging cache finds.'] = 'Thanks For The Cache/Danke für den Cache. Eine Abkürzung die von Geocachern in die Logbücher oder Onlinelogs geschrieben wird.';
t['Thanks For The Hide'] = 'Thanks For The Hide/Danke für das Verstecken';
t['Took Nothing. Left Nothing. Usually written in cache logbooks by geocachers do not trade for material contents in a cache.'] = 'Took Nothing. Left Nothing. Nichts genommen. Nichts dagelassen. Üblicherweise von Geocachern in Logbücher geschrieben, wenn sie nichts getauscht haben.';
t['Took Nothing. Left Nothing. Signed Logbook / Took Nothing. Signed Logbook.'] = 'Took Nothing. Left Nothing. Signed Logbook - Nichts genommen. Nichts dagelassen. Ins Logbuch geschrieben. / Took Nothing. Signed Logbook. - Nichts genommen. Ins Logbuch geschrieben.';
t['This is one of several cache types. This is the original cache type consisting, at a bare minimum, a container and a logbook. Normally you will find a clear container or ammo box containing items for trade. Smaller containers, called micro caches are usually too small to contain anything except for a logbook. The coordinates listed on the traditional cache page are the exact location for the cache.'] = 'Dies ist der ursprüngliche Cachetyp, der mindestens aus einem Behälter und einem Logbuch besteht. Normalerweise wirst du eine Tupperdose, Munitionskiste oder Eimer mit tollen Sachen gefüllt finden oder keinere Behälter ("Mikrocache"), die zu klein für Gegenstände, ausser dem Logbuch, sind. Die gelisteten Koordinaten auf der Cacheseite beschreiben die exakte Lage des Caches.';
t['A Groundspeak Travel Bug is a trackable tag that you attach to an item. This allows you to track your item on Geocaching.com. The item becomes a hitchhiker that is carried from cache to cache (or person to person) in the real world and you can follow its progress online. Learn more at '] = 'Ein Groundspeak Travelbug ist ein verfolgbares Anhängeschildchen, das an einem Gegenstand befestigt ist. Dies erlaubt dir deinen Gegenstand auf geocaching.com zu verfolgen. Der Gegenstand wird zum Hitchhiker, der von Cache zu Cache (oder Person zu Person) in der realen Welt reist und du kannst den Prozess online verfolgen. Erfahre mehr auf ';

t['"Universal Transverse Mercator" coordinate system. This is an alternative to the standard '] = 'Universale Transversale Mercator Projetion. Dies ist eine Alternative zum Standardformat ';
t['.UTM uses grids overlaying specific areas of the Earth’s surface and divides the Earth into 60 zones.'] = '. UTM benutzt Gitter über spezifischen Gegenden der Erdoberfläche und teilt die Erde so in 60 Zonen.';
t['This is one of several cache types which are no longer available for creation on Geocaching.com. A virtual cache is a cache that exists in a form of a location. Virtual caches have no cache container; the reward for these caches is the location itself and sharing information about your visit. Virtual caches are now considered '] = 'Ein Virtueller Cache ist ein Cache, der in Form einer Position existiert. Abhängig vom "Verstecker" kann ein virtueller Cache durch eine Frage über eine Position, einen interessanten Fleck, einer Aufgabe, usw. geloggt werden. Die Belohnung für diesen Cache ist die Gegend selbst und das Teilen der Erfahrungen deines Besuches dort. Virtuelle sind nun hier zu finden: ';
t['WAAS stands for Wide Area Augmentation System, but that doesn\'t really describe what it is. Garmin has '] = 'WAAS steht für Wide Area Augmentation System (Flächendeckende Vergrößerungssystem), aber das beschreibt nicht wirklich, was es ist. Garmin hat eine ';
t['an excellent description on WAAS'] = 'exzellente Beschreibung von WAAS';
t['Watch List'] = 'Beobachtungsliste';
t['A watchlist is a list of users that are watching a specific travel bug or cache. Each user receives a copy of each posted log via email.'] = 'Eine Beobachtungsliste ist eine Liste für Benutzer, die spezielle Caches oder Travelbugs beobachten. Der Nutzer bekommt von jedem Log eine Kopie an seine E-Mail gesendet.';
t['Waypoint'] = 'Wegpunkt';
t['A waypoint is a reference point for a physical location on Earth. Waypoints are defined by a set of coordinates that typically include longitude, latitude and sometimes altitude.'] = 'Ein Wegpunkt ist ein Referenzpunkt für eine physische Position auf der Erde. Wegpunkte werden aus Koordinaten definiert, die typischerweise Breiten-, Längengrad und manchmal Höhen enthalten.';

t['Every geocache listed on our website is a waypoint. Geocaching.com generates a unique "GC Code" associated with every geocache listing.'] = 'Jeder Geocache auf unserer Internetseite ist ein Wegpunkt. Geocaching.com generiert einen einzigartigen GC-Code, der mit dem Cache verbunden wird.';
t['This is one of several cache types which are no longer available for creation on Geocaching.com. These are caches that use existing web cameras placed by individuals or agencies that monitor various areas like parks or road conditions. The idea is to get yourself in front of the camera to log your visit. The challenging part, however, is that you need to call a friend to look up the web site that displays the camera image. You will need to have them to save the picture to log the cache. If you are a tech savvy, you can also use a wireless modem and save the image yourself on a laptop.'] = 'Dies sind Caches, die existierende Webcams von Privatpersonen oder Agenturen nutzen, die verschiedene Gebiete, wie Parks oder Straßenverhältnisse zeigen. Die Idee ist es vor diese Kamera zu treten um den Besuch zu loggen. Der schwierige Part ist jedoch, dass du einen Freund anrufen musst, der auf die Internetseite der Kamera gehen muss. Du brauchst ihn um ein Bild zu machen, dass deinen Besuch beweist. Wenn du ein Technikfreak bist, kannst du dein kabelloses Internet auf deinem Laptop nutzen und selbst ein Foto machen.';
t['The most current geodetic '] = 'Das aktuellste geodätische ';
t['datum'] = 'Format';
t[' used for GPS is the World Geodetic System of 1984 (WGS84). The significance of WGS84 comes about because GPS receivers rely on WGS84.'] = ', dass für GPS genutzt wird ist das "World Geodatic System" aus dem Jahr 1984 (WGS84). Die Bedeutung vom WGS84 kommt daher, dass sich GPS-Empfänger auf das WGS84 verlassen.';
t['Geocaching uses the WGS84 datum by default. We also use the format HDDD MM.MM, which is a standard for GPS receivers (like the eTrex).'] = 'Geocaching benutzt das WGS84 in dem Format HDDD MM.MM, das Standard bei GPS-Empfängern (wie dem eTrex) ist.';
t['HDD means Hemisphere and degrees. MM.MM are minutes in decimal format. If you have any questions, you can either '] = 'HDD bedeutet Hemisphäre und Grad. MM.MM sind Minuten im Dezimalformat. Wenn du Fragen hast ';
t['visit the forums'] = ' besuche die Foren ';
t['contact us directly'] = 'kontaktiere uns direkt';
t['It is critical that the format be correct, otherwise geocachers will be unable to find your cache!'] = 'Es ist wichtig, dass das Format korrekt ist, sonst können Geocacher deinen Cache nicht finden!';
t['This is one of several cache types. Wherigo is a toolset for creating and playing GPS-enabled adventures in the real world. By integrating a Wherigo experience, called a cartridge, with finding a cache, the geocaching hunt can be an even richer experience. Among other uses, Wherigo allows geocachers to interact with physical and virtual elements such as objects or characters while still finding a physical geocache container. A Wherigo-enabled GPS device is required to play a cartridge. Learn more at '] = 'Wherigo ist ein Werkzeugsatz, um spielbare GPS-fähige Abenteuer in der realen Welt zu erstellen. Wenn man eine Wherigo-Routine, gennant "cartidge", mit dem Finden eines Caches verbindet, kann die Jagd eine reichere Erfahrung sein. Wherigo erlaubt Geocachern mit physischen und virtuellen Elementen, wie Objekten oder Charakteren, zu interagieren, während immernoch ein physischer Geocachebehälter gefunden werden kann. Ein Wherigofähiges GPS wird benötigt, um eine "cartridge" abzuspielen. Lerne mehr bei ';





//**********************************************************************************

//Übersetzung FAQ
//http://www.geocaching.com/faq/default.aspx

t['Frequently Asked Questions About Geocaching'] = 'Oft gestellte Fragen übers Geocaching';
t['Welcome to Geocaching! If you still have questions after reviewing our answers to frequently asked questions, you can also search our '] = 'Willkommen beim Geocachen! Wenn du nach dem Durchsuchen unserer oft gestellten Fragen immernoch Fragen hast, kannst du auch in unserer ';
t[' or ask a question in the geocaching '] = ' suchen oder hier eine Frage stellen: ';
t['forums'] = 'Geocaching Foren';
t['What is Geocaching?'] = 'Was ist Geocaching?';
t['How do you pronounce Geocaching?'] = 'Wie spreche ich Geocaching aus?';
t['You pronounce it Geo-cashing, like cashing a check.'] = 'Du sprichst es so aus: geo-käsching';
t['What is the meaning of the word Geocaching?'] = 'Was bedeutet das Wort Geocaching?';
t['The word Geocaching refers to GEO for geography, and to CACHING, the process of hiding a cache. Ein Cache in computer terms is information usually stored in memory to make it faster to retrieve, but the term is also used in hiking/camping as a hiding place for concealing and preserving provisions.'] = 'Das Wort Geocaching bezieht sich auf "Geo" für Geografie und "Caching", dem Prozess einen Cache zu verstecken. Cache ist im Computer normalerweise Datenspeicher, um schnell etwas wiederzufinden, aber der Begriff wird auch beim Wandern/Campen als Ort für getarnte und haltbare Vorräte benutzt.';
  
t['Do you have a list of common words and acronyms?'] = 'Gibt es eine Liste mit Abkürzungen und oft benutzen Wörtern?';
t['Yes, we do have a '] = 'Ja, es gibt ein ';
t['. You can review the list of vocabulary words and acronyms often seen in the world of geocaching. It will help you understand what you read in cache logs ands in the forums.'] = '. Dort kannst du dir die Vokabeln und Abkürzungen ansehen, die oft gesehen werden in der Welt von Geocaching. Es wird dir helfen die Logs und die Foren zu verstehen.';

t['Glossary of Terms'] = 'Glossar';
t['What is a GPS device?'] = 'Was ist ein GPS-Empfänger?';
t['A GPS unit is an electronic device that can determine your approximate location (within around 6 - 20 feet) on the planet. Coordinates are normally given in Latitude and Longitude. You can use the device to navigate from your current location to another location. Some devices have their own maps, built-in electronic compasses, and voice navigation, depending on the complexity of the device.'] = 'Ein GPS-Empfänger ist ein elektronisches Gerät, das ungefähr deine Position auf dem Planeten bestimmt (3 bis 6 Meter genau). Koordinaten sind normalerweise in Breiten- und Längengrad angegeben. Du kannst das Gerät nutzen, um dich von deiner derzeitigen Position zu einer anderen führen zu lassen. Einige Geräte haben ihne eigenen Karten, eingebaute Kompanten und Navigationsansagen, abhängig von der Komplexität des Gerätes.';

t['How does GPS work?'] = 'Wie funktioniert GPS?';
t['Each GPS receiver is a computer that receives signals broadcast from GPS satellites. A receiver needs to read signals from at least three satellites at a time to calculate its general location by a process called trilateration.'] = 'Jeder GPS-Empfänger ist ein Computer der Signale von GPS Satelliten empfängt. Ein Empfänger benötigt mindestens drei Satelliten um die Position zu bestimmen. Der Prozess nennt sich Trilateration.';

t['With signals from four satellites, a GPS receiver can get a more accurate fix that includes altitude and the exact time, as well as latitude and longitude. The more satellite signals the receiver reads, the more accurate the position it reports to you.'] = 'Mit den Signalen von vier Satelliten wird ein GPS-Empfänger genauer und kann die Höhe und exakte Zeit bestimmen, wie Breiten- und Längengrad. Je mehr Signale der Empfänger bekommt, desto genauer wird die angezeigte Position.';

t['If I use a GPS unit can someone track where I am going?'] = 'Wenn ich GPS nutze, kann jemand sehen wo ich längsgehe?';
t['No! GPS devices do not actually broadcast your location. The satellites using radio frequencies actually broadcast their own position. Your GPS unit takes that information to figure out where you are (trilateration).'] = 'Nein! GPS-Geräte senden nicht deine aktuelle Position. Die Satelliten nutzen Radiofrequenzen um ihre Position zu senden. Das GPS nimmt die Informationen auf und berechnet deine Position (Trilateration)';

t['Unless you have a tracking system implanted by aliens, you should be safe from the satellites above. As an extra precaution, however, you can put aluminum foil on your head to deflect the "gamma" beams.'] = 'Außer du hast ein Verfolgungssystem von Aliens implantiert bekommen, dann solltest du dich vor den Satelliten sichern. Als zusätzliche Sicherheitsmaßnahme solltest du jedoch Alufolie um deinen Kopf wickeln, um "Gammastrahlung" zu reflektieren.';

t['How much does a GPS unit cost, and where can I buy one?'] = 'Wieviel kostet ein GPS-Gerät und wo kann ich eins kaufen?';
t['For more information, review our guide to buying '] = 'Für mehr Informationen, sieh dir diese Anleitung ';
t['GPS Units for Geocaching'] = 'GPS Geräte zum Geocachen an';
t['You can usually find GPS units at electronic, camping and boat supply stores. You can also purchase them online. Prefer to use a GPS mobile application on your phone and pay a monthly fee instead? '] = 'Normalerweise kannst du GPS Geräte in Elektro-, Camping- und Bootzubehörläden finden. Du kannst sie auch online erwerben. Bevorzugst du eine GPS Anwendung auf deinem Handy und statt der Kosten für das GPS-Gerät eine monatliche Gebühr zu zahlen? ';

t['How do I use a GPS unit for Geocaching?'] = 'Wie nutze ich ein GPS für Geocaching?';
t['In order to go geocaching, you will need to understand how to enter waypoints into your GPS device. If you have any questions, try the '] = 'Wenn du cachen gehen willst, musst du verstehen, wie du Wegpunkte auf deinem GPS erstellen kannst. Wenn du Fragen hast, geh ins ';
t['online forums'] = 'online Forum';
t['. There is always someone ready to help.'] = '. Da ist immer jemand bereit zu helfen.';
t['You gave me coordinates to a specific cache location. Seems pretty easy.'] = 'Ihr gebt mir Koordinaten für einen Cache. Erscheint recht einfach.';
t['It is deceptively easy. It is one thing to know where a location is shown on a map; it is another to actually try to arrive at that location. Sometimes you cannot navigate directly to a cache by going straight in the direction your GPS receiver points - there might be a river or other obstacle in the way. It is up to you to find the best route to the cache, remembering to respect the environment and practice '] = 'Die Einfachheit täuscht. Es ist eine Sache zu wissen wo die Position auf der Karte ist; es ist eine andere Sache die Position tatsächlich zu erreichen. Manchmal kann man nicht direkt zum Cache gehen, wie das GPS es anzeigt - es könnten Flüsse oder andere Hindernisse im Weg sein. Es liegt an dir den besten Weg zum Cache zu finden und um die Umwelt zu respektieren betreibe ';
 
t[' along the way.'] = ' auf deinen Wegen.';
t['What are the rules in Geocaching?'] = 'Was sind die Regeln von Geocaching?';
t['1. If you take something from the cache, leave something of equal or greater value.'] = '1. Wenn du etwas aus einem Cache nimmst, lass etwas von gleichem oder höherem Wert dort.';
t['2. Write about your find in the cache logbook.'] = '2. Schreibe über deinen Fund im Logbuch.';
t['3. Log your experience at www.geocaching.com.'] = '3. Trage deine Erfahrungen bei geocaching.com ein.';
t['What is usually in a cache?'] = 'Was ist normalerweise in einem Cache?';
t['In its simplest form, a cache always contains a logbook. The logbook contains information from the owner of the cache, notes from visitors and can contain much valuable, rewarding, and entertaining information. In smaller caches, a logsheet may be used.'] = 'In seiner einfachsten Form enthält ein Cache immer ein Logbuch. Das Logbuch enthält Informationen über den Besitzer des Caches, Notizen von Besuchern und kann wertvolle, lohnende und unterhaltsame Informationen bereithalten. In kleinen Caches können Logstreifen benutzt werden.';

t['Larger caches may contain a logbook and any number of more or less valuable items. These items turn the cache into a true treasure hunt. You never know what the owner or other visitors of the cache may have left there for you to enjoy. Remember, if you take something, it is only fair for you to leave something in return. It is recommended that items in a cache be individually packaged in a clear, zipped plastic bag to protect them from the elements.'] = 'Größere Caches können ein Logbuch und mehrere mehr oder weniger wertvolle Gegenstände enthalten. Diese Gegenstände machen aus dem Cache einen kleinen Schatz. Man weiß nie, was der Besitzer oder andere Besucher des Caches zu deiner Freude hinterlassen haben. Denke immer daran, dass du fair tauscht, wenn du etwas mitnimmst. Es empfiehlt sich die Gegenstände individuell in klare Zipplastikbeutel zu stecken, um sie vor den Elementen zu schützen.';

t['Quite often you may also find a trackable item. Groundspeak Trackables come in two types: Groundspeak Travel Bugs'] = 'Du wirst oft verfolgbare Gegenstände finden. Groundspeaks verfolgbare Gegenstände sind der Travelbug';
t[', and official Geocoins.'] = ', und offizielle Geocoins.';
t['A Groundspeak Travel Bug is a trackable tag that you attach to an item, and which travels from cache to cache with the help of people like you. Each tag is etched with a unique code which the finder can use to log its travels on this website. Every Travel Bug has a goal given by its owner, so if you think you can help it along on its journey feel free to take it with you.'] = 'Ein Groundspeak Travelbug ist ein verfolgbarer Anhänger, der an einem Gegenstand befestigt ist und mit Hilfe von Personen wie dir von Cache zu Cache reist. In jedem Anhänger ist ein einzigartiger Code eingeätzt, den der Finder benutzen kann um die Reise online zu loggen. Jeder Travelbug hat ein Ziel vom Besitzer bekommen und wenn du denkst, du kannst helfen das Ziel zu erreichen, kannst du ihn mitnehmen.';

t['Geocoins are special trackable coins created by other Geocachers to commemorate special events or as a signature item to leave in caches. They function exactly like Travel Bugs and should be moved to another cache unless otherwise specified by their owners. The variety of different geocoins is staggering! More information about Travel Bugs and Geocoins can be found on the '] = 'Geocoins sind spezielle verfolgbare Objekte, die von anderen Geocachern erschaffen wurden, um spezielle Ereignisse zu feiern oder um sie als signierten GEgenstand in Caches zu hinterlassen. Sie funktionieren exakt, wie Travelbugs und sollten von Cache zu Cache bewegt werden, solange der Besitzer nicht etwas anderes anstrebt. Die Vielfältigkeit der Geocoins ist atemberaubend! Mehr Informationen über Travelbugs und Geocoins gibt es auf der ';

t[' page.'] = ' Seite.';
t['What should not be placed in a cache?'] = 'Was sollte nicht in einen Cache?';

t['People of all ages hide and seek caches, so think carefully before placing an item into a cache. Explosives, ammunition, knives, drugs and alcohol should not be placed in a cache. Respect the local laws.'] = 'Personen allen Altersgruppen verstecken und suchen Caches, also denke nach, bevor du einen Gegenstand in einem Cache platzierst. Sprengstoff, Munition, Messer, Drogen und Alkohol sollten nicht in einem Cache platziert werden. Halte dich an die Gesetze.';

t['Food items are always a bad idea. Animals have better noses than humans, and in some cases caches have been chewed through and destroyed because of food items in a cache. Please do not put food in a cache.'] = 'Essen ist immer eine schlechte Idee. Tiere haben bessere Nasen, als wir Menschen und in einigen Fällen wurden Caches angenagt und zerstört, weil Essen enthalten war. Bitte, packe kein Essen (auch keine Süßigkeiten) in einen Cache.';

t['Where are caches found?'] = 'Wo können Caches gefunden werden?';
t['It is common for geocachers to hide caches in locations that are important to them, reflecting a special interest or skill of the cache owner. These unique locations on the planet can be quite diverse. Make sure to read the cache descriptions carefully, especially the difficulty and terrain ratings as some cache finds can be technical and physically challenging.'] = 'Es ist üblich, dass Geocacher ihre Caches an für sie wichtige Orte verstecken, die seine Interessen und Fähigkeiten repräsentieren. Diese einzigartigen Positionen auf der Welt können sehr verschieden sein. Lies die Cachebeschreibung, besonders die Schwierigkeits- und Geländebewertungen, denn einige Caches können technische und physische Herausforderungen sein.';

t['For instance, a cache located on the side of a rocky cliff accessible only by rock climbing equipment may be hard to find. An underwater cache may only be accessed by SCUBA. Other caches may require long difficult hiking, orienteering and special equipment. Caches may be located in cities both above and below ground, and outside of buildings. Even the skillful placement of a small logbook in an urban environment may be quite challenging to find even with the accuracy of a GPS. Have fun and remember to share your geocaching experiences '] = 'Zum Beispiel ist ein Cache auf der steinigen Seite einer Klippe und kann nur mit spezieller Kletterausrüstung gefunden werden. Ein Unterwasser-Cache kann vielleicht nur mit Tauchausrüstung gefunden werden. Andere Caches können lange Wanderungen, Orientierung und Spezialausrüstung erfordern. Caches können auch in Städten, hoch oben oder tief unten und ausserhalb von Gebäuden gefunden werden. Ein geschickt verstecktes kleines Logbuch in städtischer Umgebung kann sehr anspruchsvoll zu finden sein. Habe Spaß und teile deine Geocaching-Erfahrungen ';
 
t['Can I move a cache once I find it?'] = 'Kann ich einen Cache versetzen, wenn ich ihn gefunden habe?';

t['Do not move a cache from its original location. If you feel that the cache may not be located in the correct location, please email the cache owner directly or post a log on the cache detail page, notifying the owner of your concern. It is an owner\'s responsibility to maintain cache placement.'] = 'Versetze den Cache nicht von seiner urspünglichen Position. Wenn du denkst, dass der Cache nicht in der korrekten Position liegt, kontaktiere den Besitzer direkt oder schreibe einen Log auf der Cacheseite, um den Besitzer auf dein Anliegen aufmerksam zu machen. Die Cachewartung und -platzierung ist in der Verantworung des Besitzers.';

t['Are there any variations in the game?'] = 'Gibt es Variationen des Spiels?';
t['Yes! Geocaching is an activity that continues to evolve and mature with community commitment and participation. If you have a new idea that incorporates the use of GPS, we would love to hear about it. View the list of '] = 'Ja! Geocaching ist eine Aktivität, die sich weiterentwickelt und reift durch Hingabe und Teilnahme der Gemeinschaft. Wenn du eine neue Idee hast, die sich mit GPS verbinden lässt, würden wir gerne davon hören. Sieh dir die Liste von ';
 
t[' to see how the activity has evolved from the original, traditional geocache.'] = ', um zu sehen, wie sich die Aktivität seit dem traditionellen Cache entwickelt hat.';
t['How do I hide a cache?'] = 'Wie verstecke ich einen Cache?';
t['Before considering your first geocache hide, find a variety of caches in your area to familiarize yourself with the activity. Then, review our '] = 'Bevor du eigene Caches versteckst, solltest du erstmal einige Caches in deiner Umgebung finden, um dich mit der Aktivität zu vertraut zu machen. Dann lies unsere ';

t['Guide to Hiding a Cache'] = 'Anleitung einen Cache zu verstecken';
t[' and the '] = ' und die ';
t['Geocache Listing Guidelines'] = 'Geocaching Richtlinien';
t[' before submitting a cache for review.'] = ', bevor du einen eigenen Cache meldest.';
t['When I submit a new cache for publication, how long will it take to be listed?'] = 'Wie lange dauert es bis mein Cache veröffentlicht wird?';
t['Each cache that is submitted to Geocaching.com is reviewed by a volunteer, to ensure that the cache meets the '] = 'Jeder Cache, der an geocaching.com gesendet wird, wird von Freiwilligen geprüft, sodass sicher ist, dass der Cache die ';

t['Geocaching Listing Guidelines'] = 'Geocaching Richtlinien erfüllen';
t['. This process may take up to 72 hours to have your cache posted to the web site. We kindly ask for your patience during this review, especially on weekends when site traffic can be high.'] = '. Der Prozess kann bis zu 72 Stunden dauern, bis der Cache veröffentlicht wird. Bitte seid geduldig bei dieser Prüfung, vor allen Dingen am Wochenende, wenn der Datenverkehr sehr hoch ist.';

t['Does Geocaching.com or a volunteer physically check the cache before publishing it?'] = 'Prüft geocaching.com oder ein Freiwilliger einen Cache physisch, vor der Veröffentlichung?';
t['We rely on the geocaching community to abide by the geocaching guidelines, to ensure that permission for cache placement has been sought, to provide accurate coordinates, and to keep the contents appropriate for a family-friendly audience. If you find a problematic cache, please contact the owner directly or '] = 'Wir verlassen uns auf die Geocaching-Gemeinschaft, die sich an die Richtlinien halten, dass die Erlaubnis der Platzierung des Caches eingeholt wurde, dass die Koordinaten genau sind und dass die Inhalte familienfreundlich sind. Wenn du einen problematischen Cache findest kontaktiere den Besitzer oder ';

t['What do I do if I find out that a cache has gone missing?'] = 'Was tue ich, wenn ich herausfinde, dass ein Cache verloren gegangen ist?';
t['If you visit a cache location and the cache is missing, make sure to log the cache as one that you "Did Not Find" so the cache owner is notified. Cache owners who repeatedly receive "Did Not Find" logs should check to see that their cache has not been removed. As a geocacher, if you notice that a cache detail page has an unusual number of "Did Not Find" logs, please let the local reviewer know or '] = 'Wenn du einen Cache besuchst und der Cache fehlt, logge den Cache als "Did Not Find" ("Nicht gefunden"), damit es der Besitzer mitbekommt. Besitzer, die wiederholt "Did Not Find"-Logs erhalten, sollten prüfen, ob der Cache entfernt wurde. Wenn du als Geocacher merkst, dass ein Cache ungewöhnlich viele "Did Not Find"-Logs hat, lass es einen lokalen Reviewer wissen oder ';
 
t['. We rely on the geocaching community to let us know the status of caches in their area.'] = '. Wir verlassen uns darauf, dass die Gemeinschaft uns über die Status der Caches in ihrer Umgebung informieren.';
t['Do you have an FRS/PMR channel to find out if other Geocachers are in the area?'] = 'Gibt es einen FRS/PMR Kanal, um Geocacher in der Gegend zu finden?';
t['Yes. The community has decided on channel 2 as the primary for both FRS and PMR, and 12 as the alternate FRS (Family Radio Service) channel and 8 for the alternate PMR (Europe). FRS and PMR radios are longer distance walkie talkies, like the Motorola Talkabout.'] = 'Ja. Die Gemeinschaft entschied sich für Kanal 2 als Primärkanal bei FRS und PMR. 12 als alternativen FRS-Kanal und 8 als alternativen PMR-Kanal (Europa). FRS und PMR Funkgeräte sind auf große Entfernungen ausgelegte Walkie-Talkies, wie der Motorola Talkabout.';



//**********************************************************************************



// Anleitung Verstecken
//http://www.geocaching.com/about/hiding.aspx

t['Hiding Your First Geocache'] = 'Verstecke deinen ersten Geocache';
t['Step 1 - Research a Cache Location'] = 'Schritt 1 - Finde eine Cache Position';
t['Geocaching is just like real estate - location, location, location! It is common for geocachers to hide caches in locations that are important to them, reflecting a special interest or skill of the cache owner. These unique locations on the planet can be quite diverse. A prime camping spot, great viewpoint, unusual location, etc. are all good places to hide a cache.'] = 'Ein Geocache ist wie eine Immobilie - Standorte, Standorte, Standorte! Es ist üblich, dass Geocacher ihre Caches an für sie wichtigen Orten, die ihr Interesse oder Fähigkeit wiederspiegeln, verstecken. Diese einzigartigen Orte können sehr verschieden sein. Ein erster Campingplatz, großartige Aussicht, unübliche Umgebungen usw. sind alles gute Plätze für einen Cache.';

t['When thinking about where to place a cache, keep these things in mind:'] = 'Wenn du über Cachepositionen nachdenkst, behalte folgende Sachen im Gedächtnis:';
t['Does it meet all requirements and '] = 'Erfüllt sie alle Anforderungen und ';
t['geocaching guidelines'] = 'Geocaching Richtlinien';
t[' to be listed on the site? Make sure to review these during your research. Issues of concern include cache saturation, commerciality, solicitation and long-term cache maintenance.'] = ', um auf der Seite gelistet zu werden? Beachte diese Dinge bei deinen Nachforschungen. Themen von Belang sind Cache-Sättigung, Kommerzialität, Anforderung und langfristige Cache-Wartung.';

t['Did you consider accessibility? If it is too visible or too close to busy roads and trails, there is a good chance someone may stumble upon it by accident. It is best to place a cache just off trail to preserve the environment but keep it out of sight of people casually passing by.'] = 'Hast du Bedenken wegen der Erreichbarkeit? Wenn die Position zu einsichtig oder zu nah an vielbefahrenen Straßen und Wegen liegt, kann schnell jemand durch Zufall auf den Cache stoßen. Es ist das Beste einen Cache abseits des Weges zu platzieren, um die Umwelt zu erhalten und ihn ausserhalt des Sichtfelds von Muggeln zu halten.';

t['Did you seek permission from the land owner or manager? If you place a cache on private land, you must ask permission before hiding your cache. If you place it on public lands, contact the land manager to find out about any rules or restrictions. Please note: You will be in violation of federal regulation by placing a cache in any area administered by the National Park Service (US). The National Park regulations are intended to protect the fragile environment, and historical and cultural areas found in the parks.'] = 'Brauchst du die Erlaubnis vom Landbesitzer oder -verwalter? Wenn du einen Cache auf privatem Grund versteckst, musst du vorher um Erlaubnis fragen. Wenn du ihn auf öffentlichem Land platzierst, kontaktiere den Langverwalter, um dich über Regeln und Verbote zu informieren. Bitte beachte: Es ist in jedem Fall ein Verstoß, einen Cache in einem Nationalpark zu verstecken (USA). Die Nationalparkregeln schützen die zerbrechliche Natur und historische und kulturelle Plätze in den Parks.';

t['Will the location placement cause unnecessary concern? Please use common sense when choosing a location for your cache. Do not design your cache such that it might be confused with something more dangerous.'] = 'Wird der Platz unnötig Sorge schaffen? Benutze den gesunden Menschenverstand, wenn du den Platz für deinen Cache wählst. Entwerfe deinen Cache nicht so, dass es mit etwas viel gefährlicherem verwechselt werden könnte.';

t['You are ultimately responsible for the cache so make sure you know the rules for the area where your cache is being placed. Respect the area around your chosen location. Keep in mind that others will be walking in these areas.'] = 'Du bist letztendlich verantwortlich für deinen Cache, also sei dir siche, dass du die Regeln der Gegend, in der dein Cache liegt, kennst. Respektier die Gegend um der Cacheposition. Bedenke, dass Andere in diese Gegeng gehen werden.';

t['If it\'s the location of a wild animal nest, or if it is off-trail with delicate ground cover, too much activity may damage the very nature of why this area is cool.'] = 'Wenn dein Cacheplatz ein Nest eines wilden Tieres oder wenn es abseits des Weges empfindliches Unterholz gibt, könnten zu viele Aktivitäten die Natur dort schädigen.';

t['Do not place caches on archaeological or historical sites. In most cases these areas are highly sensitive to the extra traffic that would be caused by vehicles and humans.'] = 'Platziere keine Caches an archäologischen oder historischen Orten. In den meisten Fällen sind diese Gegenden höchstsensibel auf den zusätzlichen Verkehr von Autos und Menschen.';

t['A cache hidden in full view of office or apartment building windows exposes a geocacher to being seen by someone who may think the cache search looks suspicious.'] = 'Ein Cache, der von einem Bürogebäude oder Wohnblock direkt eingesehen werden kann, setzt andere Geocachern Blicken aus, die von der Suche etwas anderes verbinden könnten, als es ist.';

t['Step 2 - Preparing Your Cache'] = 'Schritt 2 - Bereite dein Cache vor';
t['Cache Containers'] = 'Cachebehälter';
t['Start by choosing a container that will withstand the weather all year round. Geocachers have had good success with clear, watertight plastic containers, ammunition boxes, and waterproof boxes often used on boats. You will also want to invest in zippered plastic bags to further protect the cache contents, in case your container does leak. View sample Groundspeak '] = 'Beginne mit der Wahl eines Behälters, der dem Wetter das ganze Jahr standhält. Geocacher machten gute Erfahrungen mit durchsichtigen, wasserdichten Plastibehältern, Munitionskisten und wasserdichte Boxen, die oft auf Booten genutzt werden. Du wirst außerdem in Platiktütchen investieren müssen, um den Cacheinhalt zu schützen, falls dein Behälter nicht dicht ist. Zeige Beispiele von Groundspeak\'s ';
 
t['Whatever the container, make sure to clearly identify your cache as a geocache. Most geocachers mark the cache container with the words "Official Geocache," the name of the cache, and appropriate contact information. The more information you can provide, the better.'] = 'Was du auch für einen Behälter nimmst, sei dir sicher, dass du deinen Cache als Cache identifizierbar machst. Die meisten Geocacher markieren ihre Caches mit den Worten "Official Geocache - Offizieller Geocache", den Namen des Caches und dazugehörige Kontaktinformationen.';

t['Cache Contents'] = 'Cacheinhalt';
t['Next, you will need a logbook. Make sure to place a writing utensil in the cache as well. If you are in an area where the temperature drops below freezing, make sure to provide a soft lead pencil. Pens tend to freeze and are rendered useless.'] = 'Als nächstes benötigest du ein Logbuch. Lege auch ein Stift in den Cache. Wenn du in einer Gegend bist, in der die Temperatuern unter 0 Grad fallen, sollte ein Bleistift im Cache sein. Kugelschreiber können einfrieren und nutzlos werden.';

t['Include a '] = 'Lege auch eine ';
t['note'] = 'Notiz';
t[' to welcome the cache finder. The note has been translated into several languages and explains the activity in case someone accidentally finds your cache.'] = ' in den Cache um den Finder Willkommen zu heißen. Diese Notiz wurde in verschiedene Sprachen übersetzt und erklärt Geocaching falls jemand deinen Cache durch Zufall findet.';

t['Lastly, you can put items for trading into the cache. It is highly recommended, but not necessary. What you place into your cache is up to you, budget permitting. Some ideas of items to give as goodies:'] = 'Zuletzt kannst du noch Tauschgegenstände in deinen Cache legen. Es ist sehr angesehen, aber nicht nötig. Was du in deinen Cache legst ist deine Sache, was das Budget erlaubt. Einige Ideen von Gegenständen: ';

t['Disposable camera. Put one in and ask everyone to take a picture and put it back in the cache. Later you can develop the photos and place them online.'] = 'Einwegkamera. Packe eine in den Cache und frage jeden ein Bild zu machen und wieder in den Cache zu legen. Später kannst du die Photos entwickeln lassen und sie online stellen.';

t['Toys for children. Include action figures, games, playing cards, and more.'] = 'Spielzeug für Kinder. Packe Actionfiguren, Spiele, Karten und anderes in denen Cache.';
t['Trackable items'] = 'Verfolgbare Gegenstände';
t['Keys to a brand new car :)'] = 'Schlüssen für ein brandneues Auto :)';
t['Step 3 - Placing Your Cache'] = 'Schritt 3 - Platziere deinen Cache';
t['Once you arrive at the location of your hide, it is critical to obtain accurate GPS coordinates. This is the very heart of the activity, after all. Be aware that during bad weather, the accuracy of the GPS unit may be poor.'] = 'Wenn du dein Versteck erreichst, ist es notwendig, dass du genaue GPS Koordinaten bekommst. Das ist das Herz der Aktivität. Sei dir bewusst, dass dein GPS-Empfänger bei schlechtem Wetter auch schlechte Genauigkeit haben kann.';

t['Some GPS units have the ability to take an average set of coordinates. If your device cannot, it is best to mark a waypoint, walk away from the location, then return and mark another waypoint. Continue marking waypoints at the location, around 7 - 10 times, and then select the best waypoint. '] = 'Einige GPS-Geräte haben die Möglichkeit Koordinaten zu Mitteln. Wenn dein Gerät das nicht kann, ist es am besten einen Wegpunkt zu markieren, von dem Ort wegzugehen, wieder zum Ort hinzugehen und einen weiteren Wegpunkt zu setzen. Wiederhole das 7-10 Mal und wähle dann den besten Wegpunkt. ';

t['Learn How to Average a Waypoint'] = 'Erfahre, wie man einen Wegpunkt mittelt';

t['Once you have your waypoint, write it in permanent marker on the container and in the logbook. Make sure you have a copy to bring back with you. Write a few notes in the logbook if you like, place it in a zippered plastic bag for extra protection, and place it in the cache container.'] = 'Wenn du deinen Wgpunkt hast, schreibe mit einem permanenten Stift die Koordinaten auf den Behälter oder ins Logbuch. Mache dir eine Kopie der Koordinaten, um sie mit nach Hause zu nehmen. Mache ein paar Notizen im Logbuch, wenn du magst, tu es in eine zusätzliche Platiktüte für zusätzlichen Schutz und lege es wieder in den Behälter.';

t['Step 4 - Submitting Your Cache'] = 'Schritt 4 - Veröffentliche deinen Cache';
t['Take time to review the '] = 'Prüfe nochmal, ob dein Cache die ';
t[' again. After placing your cache, does it still meet all requirements for placement? If so, fill out the '] = ' kann. Erfüllt der Cache noch alle Anforderungen, nachdem du ihn gelegt hast? Wenn ja, dann fülle das ';
t[', paying careful attention to the helpful notes provided. Write a description that attracts geocachers to your location, including images of interest.'] = ' aus, dabei auf die vorrausgesetzten Felder achtend. Schreibe eine Beschreibung, die Geocacher zu deinem Cache locken und lade interessante Fotos hoch.';

t['Add descriptive '] = 'Füge aussagekräftige ';
t['attributes'] = 'Attribute/Eigenschaften';
t[' so that others can make a quick assessment of your cache. For example, is this area dog-friendly? Is the hike over an hour long? Is the area accessible in a wheelchair? Is a boat required?'] = ' hinzu, sodass Andere einen schnellen Überblick deines Caches bekommen. Ist die Gegend hundefreundlich? Dauert die Wanderung länger als eine Stunde? Ist das Gelände für Rollstühle geeignet? Braucht man ein Boot?';

t['Double-check the accuracy and the format of your work and make any needed edits. After a review, your cache will be published for the general public.'] = 'Prüfe deine Eingaben und das Format der Koordinaten doppelt und mache alle nötigen Veränderungen. Nach einer Überprüfung wird dein Cache für die Öffentlichkeit zugänglich gemacht.';


t['Step 5 - Maintaining Your cache'] = 'Schritt 5 - Aufrechterhaltung Deines Caches';
t['Once you place the cache, it is your responsibility to maintain the cache and the area around it. You will need to return as often as you can to ensure that your cache is not impacting the area negatively, and to check that the container is in good shape.'] = 'Wenn du einen Cache platziert hast liegt es deine Verantwortung den Cache und dessen Umgebung zu pflegen. Du solltest so oft wie möglich zu deinem Cache gehen, um sicherzugehen, dass der Cache die Umwelt nicht negativ beeinflusst und dass der Behälter intakt ist.';

t['Does the area look disturbed? Are visitors disrupting the landscape in any way? If you eventually have concerns about the location, remove the container and make appropriate changes to your online listing.'] = 'Sieht die Gegend zerstört aus? Haben Besucher die Landschaft kaputt gemacht? Wenn du dir Sorgen um die Gegend machst, entferne den Behälter und mache die dazugehörigen Änderungen online.';

t['Happy Geocaching!'] = 'Fröhliches Geocaching!';




//**********************************************************************************

// Übersetzung der Seite zur Anmeldung einer Premium-Mitgliedschaft
// http://www.geocaching.com/Membership/Default.aspx

t['Groundspeak Memberships'] = 'Groundspeak Mitgliedschaften';
t['Join the Geocaching.com Community'] = 'Werde Mitglied in der Gemeinschaft von Geocaching.com';
t['A basic membership on Geocaching.com is free and requires only a valid email address and your name to create an account. As you get involved in the activity, whether as a casual or more avid geocacher, consider becoming a Premium Member. As a Premium Member, you will have access to additional website features and functionality that will help you get the most out of your geocaching experiences!']
	= 'Eine normale Mitgliedschaft auf Geocaching.com ist kostenlos. Für die Anmeldung wird nur eine gültige E-Mail-Adresse und dein Name benötigt. Wenn du am Geocaching teilnimmst, ob gelegentlich oder regelmäßig, ziehe es in Betracht Premium-Mitglied zu werden. Als Premium-Mitglied erhälst du Zugriff auf zusätzliche Möglichkeiten und Funktionen, die dir helfen werden, das Beste aus diesem Hobby zu machen.';
t['Already a Member?'] = 'Bereits Mitglied?';
t['If you already have a membership on Geocaching, '] = 'Falls du bereits Mitglied auf Geocaching.com bist, ';
t['log in now'] = 'melde dich jetzt an';
t[' to access your account, upgrade your membership or change your settings. '] 
	= ' um auf dein Profil zuzugreifen, Premium-Mitglied zu werden, oder deine Einstellungen zu ändern.';
t['Premium features for the casual geocacher:'] = 'Premium-Funktionen für gelegentliche Geocacher:';
t['Create custom searches based on cache size, location, attributes and more with Pocket Queries.']='Erstelle eigene Suchmethoden basierend auf Cachegröße, Ort, Merkmalen und mehr mit Pocket Queries.';
t['Organize cache listings and create favorite lists with the bookmark feature.'] 
	= 'Organisiere Cachelisten und erzeuge Favoritenlisten mit der Lesezeichenfunktion.';
t['Filter geocache types using the Groundspeak Enhanced Google Maps.'] 
	= 'Sortiere Geocachetypen mithilfe der Groundspeak erweiterten Google Maps.';
t['Premium features for the avid geocacher:'] 
	= 'Premium-Funktionen für begeisterte Geocacher:';
t['Download up to 500 waypoints at a time using Pocket Queries. Premium members receive 5 Pocket Queries a day!'] 
	= 'Lade mit Pocket Queries bis zu 500 Wegpunkte zeitgleich herunter. Premium-Mitglieder erhalten 5 Pocket Queries am Tag!';
t['Search for geocaches along a route on your next road trip.'] 
	= 'Suche nach Geocaches entlang der Route deines nächsten Ausflugs.';
t['Be the first to find a geocache when you receive Instant Notifications about newly published geocaches.'] 
	= 'Sei der Erste um einen neuen Geocache zu finden, weil du bei neu veröffentlichten Geocaches sofort benachrichtigt wirst.';
t[' Basic Membership'] = 'Basis-Mitgliedschaft';
t[' Free'] = 'Kostenlos';
b['Get a Basic Membership'] = 'Werde normales Mitglied';
t[' Premium Membership'] = 'Premium-Mitgliedschaft';
b['Get a Premium Membership'] = 'Werde Premium-Mitglied';
t['Organize Your Favorites'] = 'Organisiere deine Favoriten';
t[' Organize geocache listings and create favorite lists with the bookmark feature. '] 
	= 'Organisiere Cachelisten und erzeuge Favoritenlisten mit der Lesezeichenfunktion.';
t['Custom Searches'] = 'Eigene Suchoptionen';
t[' Create custom searches based on geocache size, location, attributes and more with Pocket Queries. '] = 'Erstelle eigene Suchmethoden basierend auf Cachegröße, Ort, Merkmalen und mehr mit Pocket Queries.';
t['Be Instantly Notified of Geocaches'] = 'Sofortige Benachrichtigung bei neuen Caches';
t[' Be the first to find a geocache when you receive Instant Notifications about newly published geocaches on your cell phone or other mobile device. '] = ' Sei der Erstfinder eines Geocaches, wenn du bei neuen Geocaches sofort auf deinem Handy oder anderem mobilen Gerät benachrichtigt wirst. ';
t['Caches Along a Route'] = 'Caches entlang einer Route';
t[' Search for geocaches along a route on your next road trip. Tell us where you are going, and we will let you know what geocaches are along the way. '] = 'Suche Geocaches entlang einer Route für deinen nächsten Ausflug. Erzähl uns, wo du hinfährst und wir lassen dich wissen, welche Caches dich entlang des Weges erwarten. ';
t['Support Geocaching.com'] = 'Unterstütze geocaching.com';
t[' Support the development and maintenance of the Geocaching.com site. As long as you continue to renew your membership, you will always be guaranteed the rate at which you first became a Premium member! '] = ' Unterstütze die Entwicklung und die Wartung der geocaching.com Internetseite. Solange wie du deine Premium-Mitgliedschaft erneuerst garantieren wir, dass du immer die Rate zahlst, gleich mit der, als du das erste Mal Premium-Mitglied geworden bist.';
t['Premium Member Access to all Groundspeak Websites'] = 'Premium-Mitglied Zugang zu allen Groundspeak Internetseiten';
t[' When you become a Groundspeak Premium Member, you gain access to all premium features and tools at Geocaching.com, Waymarking.com and Wherigo.com. '] = 'Wenn du ein Groundspeak Premium-Mitglied wirst, bekommst du Zugang zu allen Premiumfunktionen und -tools bei geocaching.com, waymarking. com und wherigo.com. '; 
t['Access to Location'] = 'Zugang zum Standort';
t[' In order to view coordinates and location information for geocaches, a membership (basic or premium) is required. '] = ' Um Koordinaten und Standortinformationen für Geocaches anzuzeigen, benötigt man eine Mitgliedschft (Basis oder Premium) ';
t['Share Your Experiences'] = 'Teile deine Erfahrungen';
t[' Write about your experience in the geocache logbook and then place your geocaching stories and photos online. '] = ' Schreibe über deine Erfahrungen in dem Geocache Logbuch und stelle danach deine Geocaching-Geschichten und Fotos online. ';

t['Groundspeak Membership Gift Certificates'] = 'Groundspeak Mitgliedschaft Geschenk Zertifikate';
t['Give the gift of Geocaching! Groundspeak Membership Gift Certificates make a perfect gift for any occasion. A Groundspeak Membership Gift Certificate will allow the recipient to purchase a new Premium Membership, upgrade their current Basic Membership or extend their current Premium Membership by one year. The cost of a Groundspeak Membership Gift Certificate is $30.00 USD.'] = 'Gib das Geschenk von Geocaching! Groundspeak Mitgliedschaft Geschenk Zertifikate bieten das perfekte Geschenk für jede Gelegenheit. Ein Groundspeak Mitgliedschaft Geschenk Zertifikat erlaubt dem Empfänger eine neue Premium-Mitgliedschaft zu erwerben, seine aktuelle Basis-Mitgliedschaft aufzuwerten oder seine aktuelle Premium-Mitgliedschaft, um ein Jahr zu verlängern. Die Kosten eines Groundspeak Mitgliedschaft Geschenk Zertifikat betragen $30.00 USD.';
b['Give a Groundspeak Membership'] = 'Verschenke eine Groundspeak Mitgliedschaft';

//**********************************************************************************


// Übersetzung der Quick View Profilseite
//http://www.geocaching.com/my/

t['Your Profile'] = 'Mein Profil';
t[' Your Profile'] = 'Mein Profil';

//Reiter

t['Quick View'] = 'Kurzübersicht';
t['Watchlist'] = 'Beobachten';
t['Yours'] = 'Eigene';
t['(Yours)'] = '(Eigene)';
t['Trackable Items'] = 'Verfolgbare Objekte';
t['Benchmarks'] = 'Vermessungspunkte';
t['Member Features'] = 'Mitgliederfunktionen';
t['Your Friends'] = 'Meine Freunde';
t[' | Your Friends | '] = ' | Meine Freunde | ';
t['Your Account Details'] = 'Meine Benutzerdetails';
t['My Pocket Queries'] = 'Meine Pocket Queries';
t['Your Inactive Caches'] = 'Meine inaktiven Caches';
t[' Your logs (Last 30 Days)']= 'Meine Logs (der letzten 30 Tage)';
t['Show all logs for:'] = 'Zeige alle Logs für: ';   
t['Caches'] = 'Geocaches';
t['Bugs'] = 'Verfolgbare Objekte';
t[', or '] = ', oder ';
t['My Geocaching Logs (All)'] = 'Meine Geocaching-Logs (Alle)';
t['My Geocaching Logs (Filtered by Log Type)'] = 'Meine Geocaching-Logs (Gefiltert nach Art des Logs)';
t['My Benchmark Logs (All)'] = 'Meine Vermessungspunkte-Logs (Alle)';
t['My Travel Bug Logs (All)'] = 'Meine Logs verfolgbarer Objekte (Alle)';
t['My Travel Bug Logs (Filtered by Log Type)']='Meine Logs verfolgbarer Objekte (Gefiltert nach Art des Logs)';
t['No logs to filter'] = 'Keine Logs zum filtern';
t['No results were found.'] = 'Kein Eintrag gefunden';
t[' My logs (last 30 days) '] = 'Meine Logs (der letzten 30 Tage)';
t[' Show all logs for: '] = 'Zeige alle Logs für: ';
t[', or '] = ', oder ';
t['List trackable items you '] = 'Liste verfolgbarer Objekte, die du ';
t['Your Trackable Item Logs This Month (Max 15 Logs Shown)'] = 'Meine Logs verfolgbarer Objekte in diesem Monat (maximal 15)';
t['You retrieved '] = 'Du hast genommen: ';
t['You placed '] = 'Du hast abgelegt: ';
t['You discovered '] = 'Du hast gesehen: ';
t['Discovered It'] = 'Gesehen';
t['Dropped Off'] = 'Abgelegt';
t['Grab It (Not from a Cache)'] = 'Bekommen (von anderem Geocacher)';
t['Retrieve It from a Cache'] = 'Genommen';
t['Your Benchmark Hunting Details'] = 'Details deiner Jagd nach Vermessungspunkten';
t['List benchmarks you '] = 'Liste der Vermessungspunkte die du ';
t['have logged'] = 'geloggt hast';
t['Your Benchmark Logs This Month (Max 15 Logs Shown)'] = 'Meine Vermessungspunkte Logs diesen Monat (maximal 15)';
t['No logs to filter.'] = 'Keine Logs zum Filtern';

//http://www.geocaching.com/account/default.aspx
t[' Edit Your Profile'] = 'Ändere Profildetails';
r['Your Current Passwort:']='Dein aktuelles Passwort:';
t['Profile Details'] = 'Profildetails';
t['For security reasons, you must '] = 'Zur Sicherheit, musst du zum Ändern ';
t['enter your current password'] = 'dein aktuelles Passwort';
r['Change Your Password'] = 'Mein Passwort ändern';

//Reviewerwartung

t['Your Geocaches Waiting for Review '] = 'Mein Geocaches, die auf Überprüfung warten ';
r['Password Information'] = 'Passwortinformationen';
r['Current Passwort:'] = 'Aktuelles Passwort:';
r['New Passwort:'] = 'Neues Passwort:';
r['Confirm Passwort:'] = 'Passwort bestätigen:';
r['For Verification'] = 'zur Überprüfung';
b['Change your Password'] = 'Passwort ändern';
t[' to save your changes.'] = ' eingeben.';
t['View/Edit My Account'] = 'Mein Account Zeigen/Ändern';
t['Do not show my email address to other users'] = 'Verberge meine E-Mailaddresse vor anderen Geocacher';
t['Inform me of helpful tips, new features and changes to the web site.'] = 'Informiert mich über hilfreiche Tipps, neue Funktionen und änderungen auf der Geocachingseite.';
t['I want to receive the Groundspeak weekly newsletter.'] = 'Ich möchte die wöchentliche Groundspeak Newsletter bekommen.';
t['Send emails from Groundspeak in HTML format when available.'] = 'Versendet E-Mails von Groundspeak in HTML Format wenn möglich.';
t['Greenwich Mean Time'] = 'westeuropäische Zeit';
t['Show Daylight Savings Time'] = 'Zeige Sommerzeit';
t['Your GPS'] = 'Mein GPS-Gerät';
t['Select a Device'] = 'Wähle ein Gerät';
t['Device:'] = 'Gerät:';
t['Primary GPS'] = 'Primäres GPS';
t['View a Cache Log'] = 'Zeige einen Cacheeintrag';
t['Released: '] = 'Rausgekommen: ';
t['Community Rating: '] = 'Community Bewertung: ';
t['Reviews: '] = 'Kommentare: ';
t['Owned: '] = 'Besitzer: ';
r['Edit My Rating and Review for '] = 'Ändere meine Bewertung und meinen Kommentar für das ';
b['Remove Device']='Gerät entfernen';
b['Add Another Device']='Anderes Gerät hinzufügen';
b['Update Rating']='Bewertung aktualisieren';
b['Remove My Review']='Meine Bewertung löschen';
t['GPS Rating:'] = 'GPS-Bewertung: ';
t['(5 Stars is the Highest)'] = '(5 Sterne ist das höchste)';
t['Please select a Star Rating a'] = 'Bitte bewerte das Gerät mit Sternen';
t['Comment:'] = 'Kommentar: ';
t['You have '] = 'Du hast noch ';
t[sp+'characters left.'] = ' zeichen.';
t['Please provide a review.'] = 'Bitte schriebe einen Kommentar.';
t['Return to Your Account'] = 'Zurück zu meinem Account';
t['Return to My Account'] = 'Zurück zu meinem Account';
r['Geocaching - The Official Global GPS Cache Hunt Site'] = 'Geocaching -Die Officielle Globale GPS Cache Jagd Seite';
t['Manage Location'] = 'Manage Standort';
t['My Location'] = 'Mein Standort';
r['Enter your location in the text field above the map to set your home coordinates.']
  = 'Gib deinen standort in das textfeld über der Karte ein um deine Heimatstandort zu wählen.';
r['You can enter all or part of an address, or the coordinates from your GPS receiver to center the map on']
  = 'Du kannst alle Addressen, oder Koordinaten aus deinem GPS Gerät eingeben um sie auf der Karte zu ';
r['your location.'] = 'zentrieren.';
r['If necessary, drag the marker to make small corrections. When you are finished, click the "Save Changes" button below the map.'] 
  = 'Ziehe den Marker, wenn nötig, um kleine korrekturen vorzunehmen. Wenn du Fertig bist klicke auf den "Save Changes" Knopf unter der Karte';
t['View Archived'] = 'Zeige archivierte';

//Letzte Logs

t['Your logs (Last 30 Days)'] = 'Meine Logs (der letzten 30 Tage)';
t['Show all logs for: '] = 'Zeige alle Logs für: ';
t[', or '] = ', oder ';
t['Search by city, address or coordinates. '] = 'Suche nach Stadt, Addresse oder Koordinaten. ';
t['Learn more.'] = 'Mehr erfahren.';
t['Home Location:'] = 'Heimatkoordinaten:';
t['Manage Friends'] = 'Freunde verwalten';
r['Find a User'] = 'Benuter finden';
t['Find a New Friend'] = 'Finde einen neuen Freund';
t['Manage Account Preferences'] = 'Ändere Konto-Einstellungen';
t['Location Preferences'] = 'Lokale Einstellungen';
t['Time Zone:'] = 'Zeitzone:';
t['Adjust for Daylight Savings Time'] = 'An die  Sommerzeit angleichen';
t['Display Units:'] = 'Genutzte Einheiten:';
t['Imperial'] = 'Imperial';
t['Metric'] = 'Metrisch';
t['Online Presence'] = 'Online-Präsenz';
t['Web Page:'] = 'Homepage:';
t['Instant Messenger'] = 'Instant Messenger';
t['Provider:'] = 'Anbieter:';
t['[Select Instant Messenger Type]'] = 'Wähle einen Instant Messenger';
t['None'] = 'keinen';
t['Address:'] = 'Addresse:';
t['Show My Instant Messenger Address in My Profile'] = 'Zeige meine Instant-Messenger-Addresse im Profil';
t['Friend Requests'] = 'Freundschaftsanfragen';
t['Manage E-Mail Address'] = 'Ändere E-Mail-Adresse';
t['E-Mail Address'] = 'E-Mail-Adresse';
t['Primary E-Mail Address:'] = 'Primäre E-Mail-Adresse';
t['* Invalid Email'] = '* ungültige E-Mail-Adresse';
t['E-Mail Preferences'] = 'E-Mail-Einstellungen';
t['Show my email address to other users.'] = 'Zeige meine E-Mail-Adresse anderen Geocachern.';
t['I want to receive the Groundspeak weekly newsletter.'] = 'Ich möchte den wöchentlichen Groundspeak Newsletter erhalten.';
t['My Membership'] = 'Meine Mitgliedschaft';
t['Your Membership Details'] = 'Details meiner Mitgliedschaft';
b['Renew Membership'] = 'Mitgliedschaft verlängern';
b['Set Up Auto-Renewal'] = 'Automatische Verlängerung festlegen';
t['Type: Premium Member'] = 'Art: Premium-Mitglied';
t['Type: Basic Member'] = 'Art: Mitglied';
t['Auto-Renew: No'] = 'Automatische Verlängerung: Nein';
t['Auto-Renew: Yes'] = 'Automatische Verlängerung: Ja';
t['Last Payment Method: Credit Card'] = 'Letzte Zahlungsmethode: Kredit Karte';
t['Last Payment Method: PayPal'] = 'Letzte Zahlungsmethode: PayPal';
t['Last Payment Method: Gift Certificate'] = 'Letzte Zahlungsmethode: Geschenkgutschein';                              
t['Membership History'] = 'Verlauf der Mitgliedsschaft';
t['Below is a review of your membership history. This table shows all of your current and previous membership types and purchases.'] 
  = 'Hier findest du eine Übersicht über den Verlauf Deiner Mitgliedsschaft. Diese Tabelle zeigt alle vergangenen und aktuellen Arten von Mitgliedschaften und alle Einkäufe';
t['Creation Date'] = 'Erstellungsdatum';
t['Expiration Date'] = 'Gültigkeitsdatum';
t['Expired?'] = 'Abgelaufen?';
t['Payment Type'] = 'Zahlungsart';
t['Duration'] = 'Laufzeit';
t['Auto Renewing?'] = 'Automatische Verlängerung?';
t['Credit Card'] = 'Kreditkarte';
t['PayPal'] = 'PayPal';
t['Gift Certificate'] = 'Geschenkgutschein';
t['Annual'] = 'Jährlich';

t[' Manage Profile'] = 'Profil Verwalten';
t[' Account Information'] = 'Account Informationen';
t['Change Username'] = 'Benutzername ändern';
t['Personal Information'] = 'Persönliche Informationen';
t['First Name:'] = 'Vorname:';
t['You must enter a first name.'] = 'Du musst einen Vornamen angeben.';
t['Last Name:'] = 'Nachname:';
t['You must enter a last name.'] = 'Du musst einen Nachnamen eingeben';
t[' Profile Details'] = 'Profildetails';
t['Position:'] = 'Wohnort:';
t['Forum Signature:'] = 'Forum-Signatur:';
t[' Mailing Address'] = 'Postadresse';
t['Address, Line 1:'] = 'Adresse, Zeile 1:';
t['Please enter an address.'] = 'Bitte gib eine Adresse an.';
t['The address must be less than 57 characters long.'] = 'Die Adresse darf höchstens 57 Zeichen lang sein.';
t['Address, Line 2:'] = 'Adresse, Zeile 2:';
t['City:'] = 'Stadt:';
t['Please enter a city.'] = 'Bitte gib eine Stadt an.';
t['The city must be less than 65 characters long.'] = 'Die Stadt darf höchstens 65 Zeichen lang sein.';
t['Country:'] = 'Land:';
t['Please select a country.'] = 'Bitte gib ein Land an.';
t['State / Province:'] = 'Staat / Bundesland';
t['-- Select State / Province --'] = '-- wähle einen Staat / ein Bundesland --';
t['Please select a State / Province.'] = 'Bitte wähle einen Staat / ein Bundesland';
t['Postal Code:'] = 'Postleitzahl:';
t['Please enter a postal code.'] = 'Bitte gib eine Postleitzahl an.';
t['The postal code must be less than 11 characters long.'] = 'Die Postleitzahl darf höchstens 11 Zeichen lang sein.';


t[' Premium Membership Payment Details'] = 'Zahlungsdetails der Premium-Mitgliedschaft';
t['You\'re on your way to renewing your Premium Membership! Your Premium Membership will not only continue to provide you with access to all of the features on this site, but will also support the development and maintenance of this site.'] 
  = 'Du bist auf dem Weg deine Premium Mitgliedsschaft zu erneuern! Deine Premium-Mitgliedschaft wird dir nicht nur weiterhin Zugriff auf alle Funktionen dieser Website bieten, sondern unterstützt auch die Entwicklung und Wartung dieser Website.';
t['To purchase your membership, please select your payment type and membership type, and provide your billing address and payment information. Once you have provided all required information, click the "Continue to Next Step" button at the bottom of the page, to review your order. Clicking "Continue to Next Step" will not charge your credit card; you will have an opportunity to review the information you provided before you place your order.'] 
  = 'Um die Mitgliedschaft zu erwerben, wähle bitte die Zahlungsart und die Art der Mitgliedschaft aus, und gib die Rechnungsadresse und Zahlungsinformationen an. Wenn alle erforderlichen Informationen eingegeben wurden, klicke auf den "Submit"-Knopf am unteren Rand der Seite, um die Bestellung zu überprüfen. Ein Klick auf "Submit" wird die Kreditkarte noch nicht belasten, die Bestellung kann auf der folgenden Seite überprüft werden, bevor die Bestellung abgeschickt wird.';
t[' Payment Type '] = 'Zahlungsart';
t[' Select a Payment Type: '] = 'Wähle eine Zahlungsart: ';
t[' Membership Type '] = 'Art der Mitgliedschaft';
t['Membership Type'] = 'Art der Mitgliedschaft';
t['Select Membership Type:'] = 'Wähle die Art der Mitgliedschaft:';
t['Recurring 1 Year Premium Membership - $30.00USD/Year'] = '1 Jahr Premium-Mitgliedschaft (automatische Verlängerung)- $30.00USD/Jahr';
t['1 Year Premium Membership - $30.00USD'] = '1 Jahr Premium-Mitgliedschaft - $30.00USD';
t['Recurring 3 Month Premium Membership - $10.00USD/3 Months'] = '3 Monate Premium-Mitgliedschaft (automatische Verlängerung) - $10.00USD/3 Monate';
t['Billing Address'] = 'Rechnungsadresse';
t['Credit Card Information'] = 'Kreditkarteninformationen';
t['We accept the following credit cards: '] = 'Wir akzeptieren die folgenden Kreditkarten:';
t['Credit Card Type:'] = 'Kreditkartenart';
t['You must select a credit card type.'] = 'Du musst eine Kreditkartenart wählen.';
t['Name on Card:'] = 'Name auf der Karte:';
t['You must enter a name.'] = 'Du musst einen Namen angeben.';
t['Card Number (No Spaces):'] = 'Kartennummer (ohne Leerzeichen):';
t['You must enter a credit card number.'] = 'Du musst eine Kreditkartennummer angeben.';
t['You must enter a valid credit card number.'] = 'Du musst eine gültige Kreditkartennummer angeben.';
t['Credit Card Verification Code:'] = 'Prüfziffern der Kreditkarte:';
t['What\'s this?'] = ' Was ist das?';
t['You must enter a verification code.'] = 'Du musst Prüfziffern angeben.';
t['Expiration Date:'] = 'Gültigkeitsdatum:';
r['^(\\d\\d?) Mar (\\d\\d)$'] = '$1 Mär $2';
r['^(\\d\\d?) Oct (\\d\\d)$'] = '$1 Okt $2';
r['^(\\d\\d?) Dec (\\d\\d)$'] = '$1 Dez $2';
t['The expiration date you entered has already passed.'] = 'Das angegebene Gültigkeitsdatum liegt in der Vergangenheit.';
t[' $30 Annual Membership, Non-Renewing '] = ' $30 einjährige Premium-Mitgliedschaft, verlängert sich nicht automatisch ';
t[' Gift Certificate Information'] = 'Informationen zum Geschenkgutschein';
t['Gift Certificate Number:'] = 'Nummer des Geschenkgutscheins:';
t['You must enter a gift certificate number.'] = 'Du musst die Nummer des Geschenkgutscheins angeben.';
t['The Gift Certificate field contains an invalid code. Please re-enter your code and confirm that there are no additional spaces.'] 
  = 'Die Nummer des Geschenkgutscheins ist ungültig. Bitte gib die Nummer erneut ein und vergewissere dich, dass keine zusätzlichen Leerzeichen eingegeben wurden.';
t['The gift certificate entered has expired.'] = 'Der angegebene Geschenkgutschein ist abgelaufen.';
t[' Membership Auto-Renewal Payment Details'] = ' Zahlungsinformationen für die automatische Verlängerung der Mitgliedsschaft';
t['To set up auto-renewal payments, please review your membership type, and provide your billing address and payment information. Once you have provided all required information, click the "Submit" button at the bottom of the page, to save your changes.'] 
  = 'Um die automatische Verlängerung zu aktivieren, wähle die Art der Mitgliedschaft aus, und gib deine Rechnungsadresse und Zahlungsinformationen an. Sobald alle erforderlichen Informationen eingegeben sind, klicke auf den "Submit"-Knopf am unteren Rand der Seite, um die Änderungen zu speichern.';
b['Continue to Next Step'] = 'Weiter zum nächsten Schritt';

//Aktivitäten

t[' found '] = ' fand ';
t[' couldn\'t find '] = ' fand nicht ';
t[' placed '] = ' platzierte ';
t[' discovered '] = ' entdeckte ';
t[' retrieved '] = ' entnahm ';
t[' grabbed '] = ' nahm ';
t[' attended '] = ' nahm teil an ';
t[' will attend '] = ' wird teilnehmen an ';
t[' posted a reviewer note for '] = ' schrieb eine Reviewer-Notiz für ';
t[' posted a note for '] = ' schrieb eine Notiz für ';
t[' archived '] = ' archivierte ';
t[' reported '] = ' berichtete, dass ';
r[' needs maintenance '] = ' Pflege benötigt ';
t[' requested '] = ' beantragte, dass ';
r[' to be archived $'] = ' archiviert wird ';
t[' performed maintenance for '] = ' pflegte ';
t[' temporarily disabled '] = ' sperrte zeitweise ';
t['Visit Log'] = 'Besuche Log';



t['View all bookmark lists...'] = 'Alle Lesezeichenlisten anschauen...';
t['My Bookmark Lists'] = 'Meine Lesezeichenlisten';
t['(Not chosen)'] = '(Nicht ausgewählt)';
t['Click a log icon above to scroll to first log of that type.'] = 'Wähle eines der Log-Icons um zum ersten Log dieses Typs zu gelangen';

//Miniprofil

t[' Basic Member'] = 'Einfaches Mitglied';
t[' Premium Member'] = 'Premium Mitglied';
t[' Member'] = 'Mitglied';
r['Member Since:'] = 'Mitglied seit:';
r['Since:'] = 'Seit:';
r['Renewal Date:'] = 'Verlängerungsdatum:';
r['Caches Found:\\s+(\\d+)'] = 'Caches gefunden: $1';
r['Caches Hidden:\\s+(\\d+)'] = 'Caches versteckt: $1';
t['Upgrade your Membership'] = 'Premium-Mitglied werden';
t['My Public Profile'] = 'Mein öffentl. Profil';
t['Renew your Membership'] = 'Erneuere deine Mitgliedschaft';

//Tabelle rechts

t[' Stat Bar'] = 'Statusgrafik';
t[' Your GPS '] = 'Meine GPS-Geräte';
t['Change Your Devices'] = 'Liste ändern';
t[' Community Rating: '] = 'Bewertung der Gemeinschaft: ';
t[' Search Options'] = 'Suchoptionen';
t['Search for nearest geocaches '] = 'Suche nach den nächstliegenden Caches ';
t['from your home coordinates'] = 'von deinen Heimatkoordinaten aus';
t['filter out finds'] = 'gefundene herrausfiltern';
t['List newest in '] = 'Zeige neueste in ';
t['View nearby '] = 'Zeige nahegelegende ';
t['Update Home Coordinates'] = 'Aktualisiere Heimatkoordinaten';
t['Advanced Search'] = 'Erweiterte Suche';

t[' User Routes'] = 'Routen von Benutzern';
t['Create a Route'] = 'Erstelle eine Route';
t['Find Routes'] = 'Finde Routen';
t['Upload GPX/KML Route'] = 'GPX/KML Route hochladen';

t[' Field Notes'] = 'Feldnotizen';
t['Access Your Field Notes'] = 'Zugriff auf meine Feldnotizen';
t[' for supported GPS devices and applications.'] = ' für unterstützte GPS-Geräte und Anwendungen.';
t[' Geocaching with Twitter'] = 'Geocaching mit Twitter';
t['Groundspeak can '] = 'Groundspeak kann ';
t['send updates to Twitter'] = 'Aktualisierungen an Twitter senden';
t[' when you post Field Notes via SMS through TextMarks or from the Geocaching iPhone Application. ']
  = ' wenn du per SMS, TextMarks oder mit dem iPhone-Programm neue Feldnotizen erstellst.';

t[' Premium Features'] = 'Premiumfunktionen';
t['Get Started'] = 'Leg los!';
t['Build Pocket Queries'] = 'Pocket Queries erstellen';
t['Saved GPX Files'] = 'Gespeicherte GPX-Dateien';
t['Manage Bookmarks'] = 'Verwalte Lesezeichen';
t['Set Up Notifications'] = 'Benachrichtigungen einstellen';


t[' Account Options'] = 'Benutzereinstellungen';
t['View Your Account Details'] = 'Zeige meine Benutzerdetails';
t['Find Another Player'] = 'Finde anderen Spieler';
t['Email Another Player'] = 'Sende einem anderen Spieler eine E-Mail';
t['Upgrade Another Player'] = 'Verschenke eine Premium-Mitgliedschaft';
t['View Your Friends'] = 'Zeige meine Freunde';
t['View Your Stat Bar'] = 'Zeige meine Statusgrafik';


t[' Geocache Google Earth Viewer']= 'Geocache Google Earth Betrachter';
t['Download Viewer'] = 'Betrachter herunterladen';
t['How to View Geocaches Using Google Earth'] = 'Wie zeigt man Geocaches in Google Earth';


t[' Your Inventory'] = 'Mein Inventar';
t['No '] = 'Keine ';
t['trackable items'] = 'verfolgbaren Objekte';
t[' in your inventory'] = ' in deinem Inventar';


//**********************************************************************************


//Freunde
//http://www.geocaching.com/my/myfriends.aspx

t['Pending Friend Requests'] = 'Ausstehende Freundschaftsanfragen';

t['Add a Friend'] = 'Einen Freund hinzufügen';
t['Your Friends List'] = 'Meine Freunde';

t['Last Online:'] = 'Zuletzt online:';
t['Title:'] = 'Titel:';
t['Found:'] = 'Gefunden:';
t['Hidden:'] = 'Versteckt:';
t['E-Mail Friend'] = 'E-Mail schreiben';
t['Remove Friend'] = 'Freund entfernen';


//**********************************************************************************



// Übersetzung der Watchlist Profilseite
//http://www.geocaching.com/my/watchlist.aspx*
t[' > Your Watchlist '] = ' > Zu beobachten ';
t['Your Watchlist'] = 'Zu beobachten';

r['^Added (.*) to your watchlist$'] = '$1 zur Liste hinzugefügt';
r['^Are you sure you want to remove (.*) from your watch list\\?$'] = 'Möchtest du $1 von deiner Liste entfernen?';
t['Item has been removed from your watchlist.'] = 'Eintrag wurde von deiner Liste entfernt.';
t['Geocaches on your watch list'] = 'Zu beobachtende Geocaches';
t['Trackable Items on your watch list'] = 'Zu beobachtende verfolgbare Objekte';
t['Remove'] = 'Entfernen';
t['WatchList'] = 'Beobachten';
t['When you watch something, you receive an e-mail whenever that geocache or trackable item is logged. You can add items to your watchlist by visiting a geocache or trackable item listing and clicking on the "watch this" link. You can remove items from your watchlist at any time by visiting this page.']
  = 'Wenn du etwas beobachtest, erhälst du eine E-Mail sobald der Geocache oder das verfolgbare Objekt geloggt wurde. Du kannst der Liste weitere Objekte hinzufügen indem du einen Geocache, TB oder eine Coin aufrufst und dann den Link "Beobachten" anklickst. Entfernen kannst du Objekte indem du in dieser Liste auf den Link "entfernen" klickst.';
b['Yes'] = 'Ja';
b['Cancel'] = 'Abbrechen';


//**********************************************************************************



// Übersetzung der Geocaching-Details Profilseite
//http://www.geocaching.com/my/geocaches.aspx*

t['Your Geocaching Details'] = 'Meine Geocaching-Details';
t['Your Geocaching Logs This Month (Max 15 Logs Shown)'] = 'Meine Geocaching-Logs in diesem Monat (max. 15 Logs werden gezeigt)';

t['Show:'] = 'Zeige:';
t['All Logs'] = 'Alle Logs';
t['You posted a note for '] = 'Du hast einen Hinweis gesendet für ';
t['My geocaches awaiting publication'] = 'Meine auf Veröffentlichung wartenden Geocaches';
t['show archived'] = 'zeige archivierte';
t['Post Reviewer Note'] = 'Reviewer Notiz geschrieben';


t['None in the queue'] = 'Keine in der Warteschlange';
t['Report a new cache'] = 'Melde einen neuen Cache';


t['List geocaches you '] = 'Zeige Caches, die du ';
t['own'] = 'besitzt';
t['have found'] = 'gefunden hast';


t['If your geocache hasn\'t been published, check the geocache listing for any messages.']
 = 'Falls dein Cache nicht veröffentlicht wurde, prüfe die Seite des Caches auf Nachrichten.';
t['Enable Listing'] = 'Anzeige aktiviert';


t['Your Geocaches Awaiting Publication '] = 'Eigene Caches, die auf Veröffentlichung warten ';
t['Show Archived'] = 'Zeige archivierte';
t['Report a New Geocache'] = 'Melde einen neuen Geocache';

//Kalender 2010


t['January 2010']= 'Januar 2010';
t['February 2010'] = 'Februar 2010';
t['March 2010'] = 'März 2010';
t['April 2010'] = 'April 2010';
t['May 2010'] = 'Mai 2010';
t['June 2010'] = 'Juni 2010';
t['July 2010'] = 'Juli 2010';
t['October 2010'] = 'Oktober 2010';
t['December 2010'] = 'Dezember 2010';


//Aktivitäten

t['You posted a reviewer note for '] = 'Du haste eine Reviewer-Notiz geschrieben für ';
t['You enabled '] = 'Du hast aktiviert: ';
t['You found '] = 'Du hast gefunden: ';
t['You temporarily disabled '] = 'Du hast vorrübergehend gesperrt: ';
t['You performed maintenance for '] = 'Du hast gepflegt: ';
t['You posted a note for '] = 'Du hast einen Hinweis gesendet für ';



//**********************************************************************************



// Übersetzung der Meine-Geocaches-Profilseite
// http://www.geocaching.com/my/owned.aspx


t['Your Owned Items'] = 'Meine Caches';
t['(Yours)'] = '(Eigene)';

t['No caches found'] = 'Keine Caches gefunden';
t['You don\'t own any listed geocaches. '] = 'Du besitzt keine eingetragenen Geocaches. ';
t['visit the "hide and seek" page'] = 'Gehe zu "hide and seek" (Suchen und Verstecken)';
t[' to learn about hiding caches. If you are waiting for approval for a cache, visit the '] = ' um mehr über das Verstecken von Caches zu erfahren. Falls du auf die Genehmigung eines Caches wartest, besuche die Liste deiner ';

t['My Geocaches'] = 'Geocaches';
t[' page to see the status of your listing.'] = ' um den Status deines Eintrages zu sehen.';

t['Date'] = 'Datum';


//**********************************************************************************



// Trackable Item Seite
//http://www.geocaching.com/my/travelbugs.aspx*

t['Your Trackable Item Details'] = 'Details deiner verfolgbaren Objekte';
t['Your Trackable Item Logs This Month (Max 15 Logs Shown)'] = 'Logs deiner verfolgbaren Objekte aus diesem Monat (Maximal 15 Logs werden gezeigt)';
t['Discovered It'] = 'Entdeckte';
t['Dropped Off'] = 'Ausgesetzte';
t['Retrieve It from a Cache'] = 'Von einem Cache geholte';
t['You discovered '] = 'Du endecktest ';
t['You placed '] = 'Du plaziertest ';
t['You retrieved '] = 'Du holtest ';


//**********************************************************************************




//Mitgliederfunktionen
//http://www.geocaching.com/my/subscription.aspx

t['Your Membership Details'] = 'Details deiner Mitgliedschaft';

//Premium

t['Current Features for Premium Members'] = 'Derzeitige Funktionen für Premium Mitglieder';

//PQ

t['Click here'] = 'Klicke hier';
t[' to create your pocket queries.'] = ', um eine Pocket Query zu erstellen.';
t['The '] = 'Der ';
t[' allows you to create custom geocache queries and have them emailed to you on a daily or weekly basis. You can also run these queries on the "seek a cache" page as a customized search query. Check the '] = ' erlaubt dir eine persönliche Geocacheanfrage zu erstellen und diese dir täglich oder wöchentlich per E-Mail zuschicken zu lassen. Du kannst diese Anfragen auch auf der "Such einen Cache" Seite als persönliche Anfrage laufen lassen. Sieh dir die '; 
t['supported software applications page'] = 'unterstützte Software Anwendungen Seite';
t[' for updates on existing and new software that can take advantage of Pocket Queries.'] = ' an für Updates und neue Software, die eine Vorteil aus den Pocket Queries ziehen.';

//GC Maps

t['Geocaching Maps'] = 'Geocaching Karten';
t['When logged in you can pan, zoom and identify caches from any point on the planet. It\'s an easy way to visualize all the local caches and quickly pinpoint the area of interest. Geocaches you have found are listed with checkboxes, and caches will have a travel bug icon if one has been placed in the cache.'] = 'Wenn du dich eingeloggt hast, kannst du schwenken, zoomen und Caches an jedem Punkt der Welt identifizieren. Es ist ein einfacher Weg, um alle lokalen Caches zu zeigen und schnell die Region von Interesse zu lokalisieren. Geocaches, die du gefunden hast, werden mit Kontrollkästchen gelistet und Caches, die einen Travelbug enthalten, werden mit einem Icon davor gezeigt.';

//GPX

t['Download Individual Listings to GPX'] = 'Individuelle Listen als GPX herunterladen';
t['You have the ability to click on a link to download a cache page directly to GPX format. GPX files contain all the information on the cache page which can be read by '] = 'Du hast die Möglichkeit auf einen Link zu klicken, um eine Cache-Seite direkt als GPX-Datei herunterzuladen. GPX-Dateien beinhalten alle Informationen, die auf der Cache-Seite zu finden sind und können mit ';
t['applications that support this file format'] = 'Anwendungen, die das Format unterstützen gelesen werden';

//Watchlist

t['Unlimited Watch Lists'] = 'Unbegrenzte Beobachtungsliste';
t['You can add as many geocaches and Travel Bugs to your watch list. When a travel bug or geocache is logged you will receive an email with a copy of the log.'] = 'Du kannst so viele Caches und Travelbugs zu deiner Beobachtungsliste hinzufügen, wie du willst. Wenn ein Travelbug oder Geocache geloggt wird, bekommst du eine E-Mail mit einer Kopie des Logs.';

//Lesezeichen

t['Bookmark Lists and Ignore Feature'] = 'Lesezeichen und Ignorieren';
t[' to visit the bookmark list page.'] = ', um die Lesezeichen-Seite zu besuchen.';
t['You can create multiple bookmark lists, like "My favorite caches" or "Caches I want to find," that can be shared with others or kept private for your own use. You are also able to generate and add listings to a personal ignore list, for those caches you never plan to find but show up in your search results.'] = 'Du kannst mehrere Lesezeichenlisten erstellen, wie "Meine Lieblingscaches" oder "Caches, die ich finden möchte", welche mit Anderen geteilt oder privat zum Eigengebrauch gehalten werden können. Es ist auch möglich Caches zu einer persönlichen Inorierliste hinzuzufügen, für Caches, die du nicht planst zu finden, aber in deinen Suchergebnissen anzeigen lassen möchtest.';
 
//Benachrichtigung

t['Instant Log Notification Feature'] = 'Sofortige Log Benachrichtigung';
t[' to visit the Insta-Notify page.'] = ', um die Sofortbenachrichtigungen anzuzeigen.';
t['You can subscribe to a location and whenever certain logs are entered by geocachers in that area, you receive an email. The new "publish" log type will allow you to be the first one in your area to get notified of a new listing. As the new feature is improved, other log types like found notes will be added.'] = 'Du kannst dich in einer Region anmelden und wann auch immer bestimmte Logs von Geocachern in dieser Region eingegeben werden, bekommst du eine E-Mail. Der neue "Publikation" Log erlaubt dir, der Erste in deiner Region zu sein der von neuen Caches erfährt. Wenn die neue Funktion verbessert wird, werden andere Logtypen, wie Fundnotizen, hinzugefügt.';

//POC

t['Premium Member Only Caches'] = 'Caches, nur für Premium-Mitglieder';
t['Some caches are only available to premium members. This has been a request of many geocachers who want to put more energy into designing a cache for dedicated geocachers. As the cache owner, you can make any of your caches "Premium Member Only," so folks will need a subscription to seek it out. (Note: member only caches may not be any better than public geocaches. Each cache is managed by their cache owner.)'] = 'Einige Caches sind nur für Premium-Mitglieder verfügbar. Dies kam durch eine Nachfrage vieler Geocacher, die mehr Energie ins designen von Caches für bestimmte Geocacher stecken wollen. Als Cachebesitzer, kannst du jeden deiner Caches auf "Nur Premium-Mitglieder" stellen, sodass Leute eine Mitgliedschaft haben müssen, um ihn zu suchen. (Notiz: "Nur Mitglieder" Caches müssen nicht besser sein, als öffentliche Caches. Jeder Cache wird durch den Besitzer geführt.)';

//Forum

t['Change Your Forum Title'] = 'Ändere deinen Forumtitel';
t['If you\'re a more active user in the forums, you can change your forum title from the generic "Geocacher" to something else.'] = 'Wenn du ein aktiver Benutzer im Forum bist, kannst du deinen Titel im Forum vom üblichen "Geocacher" in irgendetwas anderes ändern.';

//Neue Features

t['You Are the *First* to See New Features'] = 'Du bist der *Erste*, der neue Funktionen sieht';
t['Occasionally new features will become available before the general public can see them. Be the first to play with new gaming concepts before everyone else.'] = 'Gelegentlich werden neue Funktionen aktiviert, bevor die normale Öffentlichkeit diese sehen. Sei der Erste, der vor allen anderen mit neuen Spielkonzepten spielt.';

//Route

t['After uploading a route to Geocaching.com you can get a Pocket Query of caches along that route! It\'s one of the latest features available to Premium members.'] = 'Nachdem du eine Route bei geocaching.com hochgeladen hast, kannst du eine Pocket Query mit Caches entlang der Route bekommen. Es es eines der neuesten Funktionen für Premium-Mitglieder.';

//Idee

t['Have an idea?'] = 'Eine Idee?';
t['If you have ideas for new features for Premium Members, post a note in the '] = 'Wenn du Ideen für neue Premium-Mitglieder-Funktionen hast, sende eine Notiz im ';
t['Geocaching.com Web discussion forums'] = 'Geocaching.com Internet Diskussionsforum';
t[' (you\'ll need to be logged in to view).'] = ' (du musst eingeloggt sein, um es zu sehen).';

//Geschenkkarten

t['Groundspeak Gift Cards'] = 'Groundspeak Geschenkkarten';
t['Give the gift of Groundspeak! Groundspeak Gift Cards make a perfect gift for any occasion. A Groundspeak Gift Card will allow the recipient to purchase a new, one-year, non-renewing Premium Membership, upgrade their current Basic Membership to a one-year, non-renewing Premium Membership or extend their current Premium Membership by one year. The cost of a Groundspeak Gift Card is $30.00USD.'] = 'Gib das Geschenk von Groundspeak! Groundspeak Geschenkkarten sind ein perfektes Geschenk für jede Gelegenheit. Eine Groundspeak Geschenkkarte erlaubt dem Empfänger eine neue, einjährige, nicht verlängernde Premium-Mitgliedschaft zu erwerben, die derzeitige Basis-Mitgliedschaft zu einer einjährigen, nicht verlängernden Premium-Mitgliedschaft aufzuwerten oder die derzeitige Premium-Mitgliedschaft, um ein Jahr zu verlängern. Die Kosten für eine Groundspeak Geschenkkarte betragen $30.00 USD.';
t[' to give a Groundspeak Gift Card.'] = ', um eine Mitgliedschaft zu verschenken.';

//**********************************************************************************

// Übersetzung der Account Details Profilseite
//http://www.geocaching.com/account/default.aspx

t[' My Account Details'] = 'Meine Benutzerdetails';


t[' My Profile'] = 'Mein Profil';

t['Change'] = 'Ändern';
t['Change Password'] = 'Ändere Passwort';

t['Member ID:'] = 'Mitglied Nr.:';
t['Full Name:*'] = 'Voller Name:*';
t['Address:*'] = 'Adresse:*';
t['Occupation:'] = 'Beruf:';
t['Location:'] = 'Position:';
t['Signature:'] = 'Signatur:';
t['Review Forum Signature'] = 'Vorschau meiner Forum-Signatur';
t['*This information is not public'] = '*Diese Informationen werden nicht veröffentlicht';


t['Profile Details'] = 'Profildetails';

t['Preview Profile Details'] = 'Vorschau meiner Profildetails';


t['Your Avatar and Photo'] = 'Mein Avatar und Foto';

t['My Avatar'] = 'Mein Avatar';
t['My Photo'] = 'Mein Foto';
t['Shown Throughout the Site'] = 'Wird überall auf der Seite angezeigt';
t['Shown on Public Profile Only'] = 'Wird nur im öffentlichen Profil angezeigt';


t['Your Membership'] = 'Meine Mitgliedschaft';
t['Manage Your Profile Details'] = 'Profildetails bearbeiten';
t['Manage Your Profile'] = 'Profil verwalten';
t['View Membership History'] = 'Zeige meine Mitgliedschronik';
t['You are a basic member.'] = 'Du bist einfaches Mitglied';
t['You are a Premium Member.'] = 'Du bist Premium-Mitglied';
r['Your Membership will continue through (.*)'] = 'Deine Mitgliedschaft läuft bis $1';


t['Your E-Mail Address'] = 'Meine E-Mail-Adresse';

t['E-Mail Preferences'] = 'E-Mail-Einstellungen';

t['Do not show my email address to other users.'] = 'Zeige nicht meine E-Mail-Adresse anderen Benutzern.';
t['Do not inform me of helpful tips, new features and changes to the web site.'] = 'Informiere mich nicht über hilfreiche Tips, neue Funktionen und Änderungen an der Internetseite.';
t['I do not want to receive the Groundspeak weekly newsletter.'] = 'Ich möchte den wöchentlichen Groundspeak Newsletter nicht empfangen.';
t['Do not send emails from Groundspeak in HTML format when available.'] = 'Sendet mir keine E-Mails von Groundspeak im HTML-Format, sofern möglich.';
t['Allow HTML in emails.'] = 'HTML in E-Mails.';
t['Do not allow HTML in emails.'] = 'Kein HTML in E-Mails.';
t['Allow my email to be shown.'] = 'Meine E-Mail-Adresse wird angezeigt.';
t['Do not allow my email to be shown.'] = 'Meine E-Mail-Adresse wird nicht angezeigt.';
t['Allow new features and changes email.'] = 'Benachrichtigung per E-Mail über Neuigkeiten und Veränderungen.';
t['Do not allow new features and changes email.'] = 'Keine Benachrichtigung per E-Mail über Neuigkeiten und Veränderungen.';
t['Allow a weekly email to be sent.'] = 'Wöchentliche E-Mail wird gesendet.';
t['Do not allow a weekly email to be sent.'] = 'Wöchentliche E-Mail wird nicht gesendet.';


t['Your Preferences'] = 'Meine Einstellungen';

t['Time Zone:'] = 'Zeitzone:';
t['Display Units:'] = 'Format:';
t['Use Metric Units'] = 'Metrische Einheiten';
t['Web Page'] = 'Webseite:';
t['Instant Message:'] = 'Instant Messenger:';
t['None Specified'] = 'Keine angegeben';
t['Friend Requests:'] = 'Freunde:';
t['Allow Friend Requests'] = 'Freundschaftsanfragen erlaubt';


//Meine Freunde
r['Last Login:'] = 'Zuletzt online:';
r['Location:'] = 'Position:';
r['Unfriend'] = 'Freundschaft beenden';
t['Change/Add'] = 'Ändern/Hinzufügen';
r['Last (\\d+) active users:'] = 'Die letzten $1 aktiven Benutzer:';
t['Last activity: '] = 'Letzte Aktivität: ';
r['^about (\\d+) hours ago$'] = 'vor etwa $1 Stunden';
r['^about (\\d+) days ago'] = 'vor etwa $1 Tagen';


t['Your Location'] = 'Meine Position';


t['Your GPS Devices'] = 'Meine GPS-Geräte';
t['Community Rating: '] = 'Community Bewertung: ';



//**********************************************************************************


b['Save Changes']='Änderungen speichern';
b['Cancel']='Abbrechen';
t['View/Edit Your Account']='Zeige/Ändere deinen Account';
b['Search']='Suchen';
b['Change Your Password']='Passwort ändern';
b['Create Request']='Anfragen';

// Übersetzung der Profilseite anderer Benutzer

t[' List of Geocaches found ('] = ' Liste der gefundenen Caches (';
t['All Geocache Finds'] = 'Alle gefundenen Caches';
t['Traditional Caches *'] = 'Traditionelle Caches *';
t['Multi-caches *'] = 'Multicaches (Mehrere Stationen) *';
t['Unknown (Mystery) Caches *'] = 'Mystery/Rätselcaches *';
t['*Total Caches Found'] = '*Gesamtzahl gefundener Caches';
t['All Geocache Hides'] = 'Alle versteckten Caches';
t[' List of items owned ('] = ' Liste der eigenen Caches (';
t['Count'] = 'Anzahl';
t['*Total Caches Hidden'] = '*Gesamtzahl versteckter Caches';
t[' List of Trackables Moved/Discovered '] = ' Liste der bewegten/entdeckten verfolgbaren Objekte ';
t[' List of Trackables Owned '] = ' Liste der eigenen verfolgbaren Objekte ';
t['Trackables Moved/Discovered'] = 'Gesamtzahl bewegter/entdeckter verfolgbarer Objekte';
t['Trackables Owned'] = 'Gesamtzahl eigener verfolgbarer Objekte';
t[' For\n'] = ' Von\n';
t['This account has no public Bookmark Lists to view.'] = 'Dieser Account hat keine öffentlichen Lesezeichenlisten.';
t[' Sorry. There were no gallery images available.'] = ' Es sind leider keine Bilder in der Galerie.';
t['For ']='Von ';

//Freundeliste..
//http://www.geocaching.com/my/myfriends.aspx
t['Add a Friend'] = 'Freund hinzufügen';
t['Your Friends List'] = 'Meine Freundesliste';
t['Last Online:'] = 'Zuletzt online:';
t['Title:'] = 'Forumtitel:';
t['Position:'] = 'Wohnort:';
t['Found:'] = 'Gefunden:';
t['Hidden:'] = 'Versteckt:';
t[' Email Friend'] = ' E-Mail schreiben';
t['Remove Friend'] = 'Freund entfernen';
t['Pending Friend Requests'] = 'Ausstehende Freundschaftsanfragen';
t['Friend Name'] = 'Name';
t['Requested on'] = 'Angefragt am';
t['Action'] = 'Aktion';
t['Occupation'] = 'Beruf';

// Übersetzung der Profilseite anderer Benutzer

//Reiter
t['Profile'] = 'Profil';
t['Trackables'] = 'Verfolgbare Objekte';
t['Gallery'] = 'Galerie';


t['Member Since:'] = 'Mitglied seit:';
t['Last Visit:'] = 'Letzter Besuch:';
t['Email Address:'] = 'E-Mail-Adresse:';
t['Home Page:'] = 'Homepage:';
t['Forum Title:'] = 'Forumtitel:';
t['Premium Member'] = 'Premium-Mitglied';
t['Visit Homepage'] = 'Besuche Homepage';
t['Send Message'] = 'Sende Nachricht';
t['Give a Gift Membership'] = 'Verschenke eine Premium-Mitgliedschaft';
t['See the Forum Posts for This User'] = 'Zeige die Forumbeiträge dieses Benutzers an';
t['Send This Person a Friend Request'] = 'Sende dieser Person eine Freundschaftsanfrage';

t['Profile Information:'] = 'Profilinformationen:';




//**********************************************************************************


// Übersetzung der Seite zum Erstellen von Pocket Queries
// http://www.geocaching.com/pocket/default.aspx*

t['Your Pocket Queries'] = 'Meine Pocket Queries (DB-Abfragen)';

// Übersetzung der Seite zum Erstellen von Pocket Queries
// Pocket Queries
t[' Geocaching - My Pocket Queries '] = 'Geocaching - Meine Pocket Queries (DB-Abfragen)';
t[' > My Pocket Queries '] = ' > Meine Pocket Queries (Datenbank-Abfragen)';
t['My Pocket Queries'] = 'Meine Pocket Queries';

t['Sorry. You must be a Premium Member to access the features of this page. ']
 = 'Leider musst du Premium-Mitglied sein, um die Funktionen auf dieser Seite benutzen zu können. ';
t['Subscribe today'] = 'Melde dich heute an';

//Infotext

t['Pocket Queries are custom geocache queries you can have emailed to you on a daily or weekly basis. They are in a format you can bring along with you on cache hunts on your GPS and/or PDA. You can select a GPX or LOC text file that works with '] 
  = 'Pocket Queries sind benutzerdefinierte Geocache-Abfragen, die du dir täglich oder wöchentlich per E-Mail zusenden lassen kannst. Sie sind in einem Format, das du auf deinem GPS-Gerät oder PDA während der Cache-Jagd nutzen kann. Du kannst eine GPX- oder LOC-Textdatei wählen, die mit ';
t['supported software applications'] = 'unterstützter Software';
t['. Because of the detailed queries, each search can run only once per day. You have up to 5 pocket queries run every 24 hour period.'] 
  = ' funktioniert. Aufgrund der ausführlichen Abfrage, kann jede Suche nur einmal pro Tag gestartet werden. Du kannst bis zu 5 Abfragen innerhalb von 24 Stunden ausführen.';
t['See detailed instructions on '] = 'Es gibt ausführliche Informationen zum ';
t['creating your first Pocket Query'] = 'Erstellen deiner ersten Abfrage (Pocket Query)';
t['Learn how'] = 'Lies hier';
t[' to use other Premium Features.'] = ', wie die anderen Funktionen für Premium-Mitglieder genutzt werden können.';
t['Using this service you agree to the terms of '] = 'Um diesen Service zu nutzen, musst du folgenden Vereinbarungen zustimmen: ';
t['this license agreement'] = 'Lizenzvereinbarung';


t['Create a new query'] = 'Erstelle eine neue Abfrage';
t['Find Caches Along a Route'] = 'Finde Caches entlang einer Route';

//Querykasten

t['Preview'] = 'Vorschau';
t['Copy'] = 'Kopieren';
t['Sun'] = 'So';
t['Tue'] = 'Di';
t['Wed'] = 'Mi';
t['Thu'] = 'Do';
t['Fri'] = 'Fr';
t['Sat'] = 'Sa';
t['Last Generated (PST)'] = 'Zuletzt generiert (PST)';
t['Delete'] = ' Löschen';
t['Total Queries/Day'] = 'Summe der Abfragen/Tag';

//Meine Funde

t['My Finds'] = 'Meine Funde';
t['You can receive a Pocket Query containing a list of all the caches you have found, along with your log entries. Running this query will add it to the current queue for the day.'] 
  = 'Du kannst eine Pocket Query mit all deinen gefundenen Caches zusammen mit deinen Logeinträgen erstellen. Wird diese Abfrage gestartet, wird sie in die aktuelle Warteschlange des Tages eingereiht.';
t['* The Pocket Query can only run once every 7 days.'] = '*Diese Pocket Query kann nur alle 7 Tage gestartet werden.';
b['Add to Queue'] = 'Zur Warteschlange hinzufügen';

//Legende

t['Pocket Query Legend'] = 'Pocket Query Legende';
t[' - Standard Pocket Query | '] = ' - Standard Pocket Query ';
t[' - Bookmark Pocket Query | '] = ' - Lesezeichen Pocket Query ';
t[' - User Route Pocket Query'] = ' - Benutzer Route Pocket Query ';
t[' - Preview your Pocket Query | '] = ' - Vorschau der Pocket Query ';
t[' - Preview Your Pocket Query in Google Maps | '] = ' - Vorschau der Pocket Query in Google Maps ';
t[' - Copy Attributes of Pocket Query'] = ' - Kopieren einer Pocket Query ';

//Text unten

t['You can create up to 40 queries. However, a maximum of 5 queries can be run each day. Searches with '] = 'Du kannst bis zu 40 Anfrage erstellen. Allerdings können nur maximal 5 Anfragen pro Tag erfolgen. ';
t['lines through them'] = 'Durchgestichene Suchen';
t[' are deleted searches that ran in the last 24 hours.'] = ' sind gelöschte Sucheanfragen, die in den letzten 24 Stunden gelaufen sind.';

t['How Pocket Queries Work'] = 'Wie Pocket Queries funktionieren';
t['Due to the complexity of Pocket Queries, a dedicated machine processes them in batches throughout the day.'] 
  = 'Aufgrund der Komplexität der Pocket Queries, werden sie durch einen speziellen Rechner permanent erstellt.';
t['The order they run is based on the last time the query ran last. Priority goes to new queries first, and the others run in the order of the oldest generated. So if you have a query run once a week it will arrive on that day much faster than someone who runs the query every day. It is recommended that you stagger your queries. Or even better, create new queries only when you need them.'] 
  = 'Die Reihenfolge, in der sie ausgeführt werden, basiert auf dem Zeitpunkt, zu dem sie zuletzt gestartet wurden. Priorität haben zuerst neue Abfragen, dann folgen die anderen Abragen je nach Alter. Wenn z.B. eine Pocket Query nur einmal pro Woche gestartet wird, erhält man diese an dem Tag schneller, als wenn die Pocket Query täglich erstellt wird. Es ist empfehlenswert, die Pocket Queries versetzt zu gestalten. Oder noch besser, sie erst zu starten, wenn sie benötigt werden.';
t['If you don\'t need the files for your GPS or PocketPC, you can also run your Pocket Queries on the search page. This is also a great way to ensure that your Pocket Queries are returning the results you want.'] 
  = 'Falls man die Dateien nicht für sein GPS-Gerät oder PocketPC benötigt, kann man die Pocket Queries auch auf der Suchseite ausführen. Das ist ein guter Weg, um sicherzustellen, dass die Pocket Queries das gewünschte Ergebnis liefern.';

//Aktionen

t['The Pocket Query '] = 'Die Pocket Query ';
t[' has been '] = ' wurde ';
t['turned on'] = 'eingeschaltet';
t['turned off'] = 'ausgeschaltet';
t[' for '] = ' für: ';
t['Monday'] = 'Montag';
t['Tuesday'] = 'Dienstag';
t['Wednesday'] = 'Mittwoch';
t['Thursday'] = 'Donnerstag';
t['Friday'] = 'Freitag';
t['Saturday'] = 'Samstag';
t['Sunday'] = 'Sonntag';



//**********************************************************************************



// Übersetzung der Seite zum Suchen nach Geocaches
// http://www.geocaching.com/seek/
t['Hide and Seek a Geocache'] = 'Geocaches verstecken und suchen';


//Suchen


t['Seek a Cache...'] = 'Einen Cache suchen...';
t['Locate the nearest geocaches in your area...'] = 'Finde den nahegelegensten Cache in deiner Region...';
t['by Address:'] = 'über eine Adresse:';
t['by Postal Code:'] = 'über Postleitzahl:';
t['by State:'] = 'in einem Staat:';
t['by Country:'] = 'in einem Land';
t['by State Page:'] = 'über eine Staatsseite:';
t['Or, '] = 'Oder ';
t['search with Google Maps'] = 'suche mit Google Maps';
t['Latitude Longitude Search:'] = 'Breitengrad Längengrad Suche:';
t['WGS84 Datum:'] = 'WGS84 Format:';
t['Latitude:'] = 'Breitengrad:';
t['Longitude:'] = 'Längengrad';
b['Search'] ='Los';
t['Decimal Format:'] = 'Dezimalformat:';

t['Other Search Options:'] = 'Andere Suchoptionen:';
t['by Keyword:'] = 'nach Suchwort:';
t['by Areacode:'] = 'nach Tel.-Vorwahl:';
t['(US Only)'] = '(nur für USA möglich)';
t['by GC Code:'] = 'nach GC-Code:';
t['Found by Username:'] = 'Gefunden von Benutzer:';
t['Hidden by Username:'] = 'Versteckt von Benutzer:';

t['Try '] = 'Teste die ';
t[' advanced search options'] = 'Erweiterte Suche';
t['look for locationless caches (now waymark categories!)'] = 'suche Virtuelle Caches (jetzt Waymark-Kategorie!)';

t['Help! How do I locate a cache?'] = ' Hilfe! Wie finde ich einen Cache? ';
t[' If you are new to the sport of geocaching, we have a '] = 'Wenn du neu beim Geocaching bist, haben wir eine Anleitung: ';
t['guide to finding your first geocache'] = 'Wie ich meinen ersten Geocache finde'; 
t['. Happy hunting!'] = '. Fröhliches Jagen!';

t['Read the '] = 'Lies die ';
t['most recently updated logs'] = 'neuesten Logs';
t['. This is a great launching point to see some experiences from other geocachers.'] = '. Dies ist ein großartiger Startpunkt, um einige Erfahrungen von anderen Geocachern zu sehen.';


//Verstecken


t['Hide a Cache...'] = 'Verstecke einen Cache...';
t['To hide a new geocache in your area...'] = 'Um einen neuen Geocache in deiner Region zu verstecken...';
t['It is imperative that you read and understand the '] = 'Ist es unumgänglich, dass du die ';
t['Cache Listing Requirements and Guidelines'] = 'Cache Anforderungen und Richtlinien';
t[' prior to placing each and every geocache. Please make sure to obtain permission from the landowner or land manager.'] = ' liest und verstehst bevor du jeden Cache platzierst. Bitte sei dir sicher, dass du die Erlaubnis des Landbesitzers hast.';

t['Once you are prepared, fill out our '] = 'Wenn du vorbereitet bist, fülle unser ';
t['online form'] = 'online Formular';
t[' to report a new cache. This is a free service.'] = ' aus um einen neuen Cache zu melden. Dieser Service ist kostenlos.';

t['Only caches of a non-commercial nature can be posted through this site. If you wish to create a commercial cache or promotion, please contact us first. Caches perceived of a commercial nature will not be published.'] = 'Nur Caches einer nicht-kommerziellen Natur können auf diese Seite gestellt werden. Wenn du einen kommerziellen Cache oder Werbung machen möchtest, kontaktiere uns zuerst. Vermeintliche kommerzielle Caches werden nicht veröffentlicht.';

t['First time?'] = 'Das erste Mal?';
t[' Learn '] = ' ';
t['how to hide a geocache'] = 'Lerne einen Geocache zu verstecken';
t['. If you have difficulties posting your report to the website please check the Groundspeak '] = '. Wenn du Probleme hast deine Meldung an die Internetseite zu schicken, schau in die Groundspeak ';
t['Knowledgebase'] = 'Wissensdatenbank';
t[' for more information.'] = ' für mehr Informationen.';

t['Cache Note: '] = 'Cache Notiz ';
t['(Print Out and Place in Container)'] = '(Ausdrucken und im Cache unterbringen)';

t['Alternate Versions: '] = 'Alternative Versionen: ';
t['(Your computer may need to have language packs installed for these.)'] = '(Dein Computer muss für diese möglicherweise Sprachpakete installiert haben)';


//Notes


t['English:'] = 'Englisch:';
t['Arabic:'] = 'Arabisch:';
t['Bulgarian:'] = 'Bulgarisch:';
t['Chinese:'] = 'Chinesisch:';
t['Croatian:'] = 'Kroatisch:';
t['Czech:'] = 'Tschechisch:';
t['Danish:'] = 'Dänisch:';
t['Dutch:'] = 'Holländisch:';
t['Estonian:'] = 'Estnisch:';
t['Farsi:'] = 'Persisch:';
t['Finnish:'] = 'Finnisch:';
t['French:'] = 'Französisch:';
t['German:'] = 'Deutsch:';
t['Greek:'] = 'Griechisch:';
t['Hebrew:'] = 'Hebräisch:';
t['Hindi:'] = 'Indisch:';
t['Hungarian:'] = 'Ungarisch:';
t['Indonesian:'] = 'Indonesisch:';
t['Italian:'] = 'Italienisch:';
t['Japanese:'] = 'Japanisch:';
t['Korean:'] = 'Koreanisch:';
t['Latvian:'] = 'Lettisch:';
t['Lithuanian:'] = 'Litauisch:';
t['Norwegian:'] = 'Norwegisch:';
t['Polish:'] = 'Polnisch:';
t['Portuguese (micro):'] = 'Portugisisch (micro):';
t['Portuguese:'] = 'Portugisisch:';
t['Romanian:'] = 'Rumänisch:';
t['Russian:'] = 'Russisch:';
t['Spanish:'] = 'Spanisch:';
t['Slovak:'] = 'Slovakisch:';
t['Slovenian:'] = 'Slovenisch:';
t['Swedish:'] = 'Schwedisch:';
t['Turkish:'] = 'Türkisch:';
t['Vietnamese:'] = 'Vietnamesisch:';



//**********************************************************************************



// Übersetzung der Ergebnisseite der Suche nach Geocaches
// http://www.geocaching.com/seek/*

t['Hide & Seek'] = 'Suchen & Verstecken';
t['Search for Geocaches'] = 'Suche nach Geocaches';
t['All Geocaches'] = 'Alle Geocaches';

r['^By Username \\(Found\\) - User: '] = 'Nach Benutzername (Gefunden) - Benutzer: ';
r['^By Waypoint - From Origin: '] = 'Nach Koordinaten - Ursprung: ';
t[' Search for geocaches '] = ' Suche nach Caches ';
t['with Google Maps'] = 'mit Google Maps';
t['New Search'] = 'Neue Suche';

t['Total Records: '] = 'Gesamtzahl: ';
t[' - Page: '] = ' - Seite: ';
t[' of '] = ' von ';
t['Prev.'] = 'Zurück';
t['Next'] = 'Vorwärts';

t['Icons'] = 'Symbole';
t['(D/T)'] = '(S/G)';
t['Placed'] = 'Versteckt';
t['Description'] = 'Beschreibung';
t['Last Found'] = 'Letzter Fund';

t['Distances Measured in Miles '] = 'Entfernungen in Meilen ';
t['Distances Measured in Kilometers '] = 'Entfernungen in Kilometern ';
t['Switch'] = 'Umschalten';

t['Waypoint Downloads'] = 'Download der Koordinaten';
t['To download geocaches, check the box to the right of each listing you wish to download. When you\'re done, click the download button to the right. ']
  = 'Setze bei jedem Geocache, den du herunterladen möchtest, ein Häckchen rechts neben den Listeneintrag. Wenn du fertig bist, klicke rechts auf den Download-Button.';
t['Read about waypoint downloads'] = 'Weitere Informationen über den Download von Koordinaten';

b['Check All'] = 'Alle Anwählen';
b['Download Waypoints'] = 'Wegpunkte herunterladen';
t[sp+'>'+sp+'Users > ']=' > Benutzer > ';
t[' > Profile ']=' > Profil ';


//Hinweise

t['Notes'] = 'Hinweise';
t['If you see an icon next to the cache type graphic, there may be a Trackable Item in the cache. Hover over icons to see additional information. ']
  = 'Wenn du ein Symbol neben der Cachetyp-Grafik siehst, könnte sich ein verfolgbarer Gegenstand im Cache befinden. Bewege den Mauszeiger über Symbole um zusätzliche Informationen zu erhalten. ';
t['About Trackable Items'] = 'Über verfolgbare Objekte';
t['* caches found in the last 7 days.'] = 'In den letzten 7 Tagen gefundene Caches';
t['Shows '] = ' '; // mit Absicht
t['archived'] = 'Archivierte';
t['disabled'] = 'gesperrte Caches';
t['Items with this icon '] = 'Einträge mit diesem Symbol ';
t[' are for '] = ' sind nur für ';
t[' only.'] = '.'; // mit Absicht
t['Dates in '] = 'Zeit und Datumsangaben in ';
t['green'] = 'grün';
t[' are user-specific (shown when logged in).'] = ' sind benutzerbezogen (werden angezeigt wenn angemeldet).';
t['Size Icon: '] = 'Größensymbol: ';
t[' Allows you to send the Waypoint Information to your GPS Unit.'] = ' Erlaubt das Senden der Wegpunkt-Informationen an dein GPS-Gerät.';


//Cito

t['Practice "Cache In Trash Out"'] = 'Mach mit bei "Cache In Trash Out" (Cachen und dabei Müll sammeln)';
t['While out geocaching, bring a bag with you to pick up trash along the way. Visit the ']
	= 'Wenn du geocachen gehst, nimm einen Beutel mit und sammle entlang des Weges Müll ein. Besuche die ';
t[' page to learn more about CITO.'] = ' Seite um mehr über CITO zu erfahren.';



//**********************************************************************************


// Übersetzung der Seite mit den Cache Details
//http://www.geocaching.com/seek/cache_details.aspx*


r['You are logged in as '] = 'Du bist angemeldet als ';
r['You are not logged in.'] = 'Du bist nicht angemeldet. ';
r['You are not Logged in.'] = 'Du bist nicht angemeldet. ';
r['You Are Not Logged In'] = 'Du bist nicht angemeldet.';

t['Log in'] = 'Anmelden';
t['Log In'] = 'Anmelden';
t['Log out'] = 'Abmelden';
t['Log Out'] = 'Abmelden';

t['Caches Found:'] = 'Gefundene Caches:';
t['Caches Hidden:'] = 'Versteckte Caches:';
t['My Profile'] = 'Mein Profil';

t['Geocaching Home'] = 'Geocaching Startseite';
t['Seek'] = 'Suchen';
t[' > View Cache Details '] = ' > Zeige Cache Details';

t['A cache '] = 'Ein Cache ';
t['by '] = 'von ';
t[' Hidden: '] = sp+sp+sp+sp+sp+'Versteckt: ';
t['Size:'] = 'Größe:';
t['(Micro)'] = '(Mikro)';
t['(Small)'] = '(Klein)';
t['(Regular)'] = '(Regulär)';
t['(Large)'] = '(Groß)';
t['Difficulty:'] = 'Schwierigkeit:';
t['Terrain:'] = 'Gelände:';
t['(1 is easiest, 5 is hardest)'] = '(1 am leichtesten, 5 am schwersten)';

t['Related Web Page'] = 'Verwandte Website';
t['Cache Issues:'] = 'Cache-Belange:';
t['This cache has not been reviewed yet. Once it is published, it will be listed on the site. Check the logs to see if the reviewers have left a note for this listing.'] 
  = 'Dieser Cache wurde noch nicht geprüft. Sobald er veröffentlicht ist, erscheint er auf der Webseite. Prüfe die Logs, ob die Reviewer eine Notiz für diesen Eintrag hinterlassen haben.';
t['The reviewers will not see this listing until you activate it.'] 
  = 'Die Reviewer werden diesen Eintrag nicht sehen, solange du ihn nicht aktviert hast.';
t['This cache is temporarily unavailable. Read the logs below to read the status for this cache.'] 
  = 'Dieser Cache ist zur Zeit nicht verfügbar. Lies die untenstehenden Logs um mehr über den Zustand des Caches zu erfahren.';
t['This cache has been archived, but is available for viewing for archival purposes.']
  = 'Dieser Cache wurde archiviert, ist aber zur Information noch sichtbar.';
t['This cache listing has been archived. Log in to view this page.']
  = 'Dieser Cache wurde archiviert. Melde dich an um den Inhalt zu sehen.';
t['You need to log in and be a premium member in order to view subscriber-only caches. Login if you are a premium member, or visit the ']
  = 'Du musst angemeldet und ein Premium-Mitglied sein, um diesen Cache betrachten zu können. Melde dich an, falls du ein Premium-Mitglied bist, oder besuche die ';
t['premium member page'] = 'Seite zur Premium-Mitgliedschaft';
t[' to find out how to upgrade your account to a premium member.']
  = ' um herauszufinden, wie du Premium-Mitglied werden kannst.';

t[' You are not logged in. You must be logged in to view this content. ']
  = ' Du bist nicht angemeldet. Du musst angemeldet sein, um den Inhalt sehen zu können.';
t[' You must be '] = ' Du musst ';
t['logged in'] = 'angemeldet sein';
t[' with an account to view the detailed Location Information. It\'s free! ']
  = ' um die Koordinaten sehen zu können. Es ist kostenlos!';

t[' '+sp+'Greyed out links are only available to '] = ' '+sp+'Graue (deaktivierte) Schaltflächen sind nur für ';
t['Premium Members'] = 'Premium Mitglieder';

t['Other Conversions'] = 'Andere Formate';
r['(^\\u00A0[A-Z]{1,2} [0-9\.]+[a-z]+ )from your home coordinates'] = '$1 entfernt von deinen Heimatkoordinaten';
t['View Map'] = 'Karte';

t['Print:'] = 'Drucken:';
t[sp+'Simple '] = sp+'Einfach ';
t['No Logs'] = 'Keine Logs';
t['Driving Directions'] = 'Fahrtroute'
t['Read About Waypoint Downloads'] = 'Informationen über Downloads von Wegpunkten';

t['Please note:'] = 'Bitte beachten:';
r['To use the services of geocaching.com, you must'] = 'Um die Dienste von geocaching.com benutzen zu dürfen, musst du';
r['agree to the terms and conditions'] = 'den Bedingungen';
t['in our disclaimer'] = 'in unserem Haftungsausschluss zustimmen';

t['Additional Hints'] = 'Zusätzliche Hinweise';
t['No hints available.'] = 'Keine Hinweise vorhanden';
t['Decrypt'] = 'Entschlüsseln';
t['Encrypt'] = 'Verschlüsseln';

t['Decryption Key'] = 'Verschlüsselungssystem';
t['(letter above equals below, and vice versa)'] = '(Der obere Buchstabe entspricht dem unteren und umgekehrt)';

t['Additional Waypoints'] = 'Zusätzliche Wegpunkte';
t['No additional waypoints to display. '] = 'Keine zusätzlichen Wegpunkte vorhanden. ';
t['Coordinate'] = 'Koordinate';
t['Prefix'] = 'Präfix';
t['Lookup'] = 'Zuordnung';
t[' (Parking Area)'] = ' (Parkplatz)';
t[' (Stages of a Multicache)'] = ' (Station eines Multicaches)';
t[' (Question to Answer)'] = ' (Frage zu beantworten)';
t[' (Reference Point)'] = ' (Referenzpunkt)';
t[' (Final Location)'] = ' (Zielposition)';
t['Note:'] = 'Hinweis:';

t['Find...'] = 'Finde...';
t['...other caches '] = '...andere Caches ';
t['hidden'] = 'versteckt';
t[' or '] = ' oder ';
t['found'] = 'gefunden';
t[' by this user'] = ' von diesem Benutzer';
t['...nearby '] = '...in der Nähe liegenden ';
t['caches of this type'] = 'Caches von diesem Typ';
t['that I haven\'t found'] = 'die ich nicht gefunden habe';
t['...all nearby '] = '...alle in der Nähe liegenden ';
t['caches'] = 'Caches';
t['waymarks on Waymarking.com'] = 'interessante Orte auf Waymarking.com';
t['benchmarks'] = 'Vermessungspunkte';
t['...hotels near '] = '...Hotels in der Nähe von ';

t['For online maps...'] = 'Online Karten...';

t['Logged Visits ('] = 'Geloggte Besuche (';
r['(\\d+) total. '] = 'Insgesamt $1.';
r['^Visit the Gallery \\((\\d+) images\\)$'] = 'Gehe zur Galerie ($1 Bilder)';

t['Warning. '] = 'Achtung. ';
t['Spoilers'] = 'Spoiler';
t[' may be included in the descriptions or links.'] = ' könnten in den Beschreibungen oder Links enthalten sein.';
t['Cache find counts are based on the last time the page generated.'] = 'Die Anzahl der Funde gilt zum Zeitpunkt der Seitengenerierung.';

t['The log entry has been saved.'] = 'Der Logeintrag wurde gespeichert.';
t['Editing a Log Entry'] = 'Logeintrag bearbeiten';
r['Hide and Seek a Geocache'] = 'Suchen und Verstecken eines Caches';

r['(\\w+) (\\d+) by '] = '$2. $1 von ';
r[' \\((\\d+) found\\)'] = ' ($1 gefunden)';
t['view/edit logs/images'] = 'Log/Bilder ansehen/editieren';
t['upload an image for this log'] = 'Bild für diesen Log hochladen';
t['View This Log'] = 'Log anzeigen';

t['There are more logs. '] = 'Es gibt noch mehr Logs. ';
t['View Them All on One Page'] = 'Betrachte sie alle auf einer Seite';
r['This entry was edited by ']='Dieser Eintrag wurde Geändert von ';
r[' on ']=' am ';
r[' at ']=' um ';

t['enable listing'] = 'Eintrag aktivieren';
t['log in to log your visit'] = 'Anmelden um zu loggen';
t['log your visit'] = 'Logge deinen Besuch';
t['view gallery'] = 'Gehe zur Galerie';
t['log in to watch listing'] = 'Anmelden um zu beobachten';
t['watch listing'] = 'Beobachten';
t['remove from watchlist'] = 'Nicht mehr beobachten';
t['ignore listing'] = 'Ignorieren';
t['bookmark listing'] = 'Lesezeichen anlegen';

t['You are '] = 'Du bist ';
t[' user(s) watching this cache.'] = ' Beobachter(n).'; // Absicht!

t['Attributes'] = 'Eigenschaften';
t['What are Attributes?'] = 'Was sind Eigenschaften?';
t[' No Attributes Present'] = ' Keine Eigenschaften festgelegt';
t['Help your fellow geocachers by adding attributes about your cache!']
  = 'Hilf anderen Geocachern indem du die Eigenschaften deines Caches angibst!';


t[sp+'Inventory'] = sp+'Inventar';
t[' There are no Travel Bugs in this cache. '] = 'Es sind keine Travelbugs in diesem Cache. ';
t['See the history'] = 'Betrachte die Chronik';
t['What is a Travel Bug?'] = 'Was ist ein Travel Bug?';

t['Bookmark Lists'] = 'Lesezeichenlisten';
r['View all (\\d+) bookmark lists...'] = 'Zeige alle $1 Lesezeichenlisten...';

r['Current Time: '] = 'Aktuelle Zeit: ';
r['Last Updated: '] = 'Letzte Aktualisierung: ';
t['Last Found: Never'] = 'Zuletzt gefunden: Noch nie';
t['This cache has not been published yet.'] = 'Dieser Cache wurde noch nicht veröffentlicht.';
t['Rendered: From Memory'] = 'Erstellt: Aus dem Speicher';
t['Rendered: From Database'] = 'Erstellt: Aus der Datenbank';
t['Coordinates are in the WGS84 datum'] = 'Koordinaten im WGS84 Format';

b['LOC Waypoint File'] = 'LOC Wegpunkt Datei';
b['GPX eXchange File'] = 'GPX eXchange Datei';
b['Send to GPS'] = 'Zum GPS senden';
b['Send to Phone'] = 'Zum Handy senden';

// zusätzlich bei eigenen Caches:
t['waypoints'] = 'Wegpunkte';
t['edit listing'] = 'Eintrag bearbeiten';
t['edit attributes'] = 'Eigenschaften bearbeiten';
t['upload images'] = 'Bilder hochladen';
t['archive listing'] = 'Eintrag archivieren';
t['disable listing'] = 'Eintrag sperren';


//**********************************************************************************


// Übersetzung der Seite zum Loggen eines Fundes
//http://www.geocaching.com/seek/log.aspx*

t[' > Cache Logs '] = ' > Cachelogs ';
t[' In reference to:'+sp+' '] = 'In Bezug auf:'+sp;
t[' (Not Published)'] = '(Nicht veröffentlicht)';
t[' (Traditional Cache)\n    '] = ' (Traditioneller Cache)';
t[' (Multi-cache)\n    '] = ' (Multicache -Mehrere Stationen)';
t[' (Unknown Cache)\n    '] = ' (Mystery/Rätselcache)';
t['You are posting a "needs maintainence" log entry. This will add an attribute and alert the owner. Click "yes" to continue.']
  = 'Du bist dabei zu melden, dass dieser Cache Pflege benötigt. Dadurch wird eine Eigenschaft hinzugefügt und der Besitzer alarmiert. Bestätige mit einem Klick auf "Ja".';

t['Geocache Log'] = 'Cachelog';
t['Post a New Log'] = 'Erstelle einen neuen Log-Eintrag';
t['- Select One -'] = '- Wähle eins -';
t['In reference to: '] = 'In Bezug auf: ';
t['Type of Log:'] = 'Logtyp: ';
t['Date Logged:'] = 'Logdatum: ';
t['Comments: '] = 'Kommentare: ';
t['If you decide to encrypt the logs, text within brackets [like this] will not be encrypted.'] = 'Wenn du dich entscheidest deinen Log zu verschlüsseln, wird Text in Klammern [wie dieser] nicht verschlüsselt.';
t['(You can make it unreadable unless someone chooses to translate it. Good to use if your log contains information on how to find the cache)'] = '(Du kannst den Log unlesbar machen bis jemand sich entscheidet ihn zu entschlüsseln. Dies ist gut, wenn dein Log Informationen enthält, wie man den Cache findet)';

t['- Select One -'] = '- Bitte auswählen -';
t['Found it'] = 'Gefunden';
t['Didn\'t find it'] = 'Nicht gefunden';
t['Write note'] = 'Notiz schreiben';
t['Needs Archived'] = 'Sollte archiviert werden';
t['Archive'] = 'archivieren';
t['Needs Maintenance'] = 'Benötigt Pflege';
t['Owner Maintenance'] = 'Pflege durchgeführt';
t['Enable Listing'] = 'Cache wieder auffindbar';
t['Post Reviewer Note'] = 'Hinweis an Reviewer';

t['Temporarily Disable Listing'] = 'Eintrag zeitweise sperren';
t['Will Attend'] = 'möchte Teilnehmen';
t['Attended'] = 'Teilgenommen';

t['Date Logged:'] = 'geloggt am: ';
r['January'] = 'Januar';
r['February'] = 'Februar';
r['March'] = 'März';
r['April'] = 'April';
r['May'] = 'Mai';
r['June'] = 'Juni';
r['July'] = 'Juli';
r['August'] = 'August';
r['September'] = 'September';
r['October'] = 'Oktober';
r['November'] = 'November';
r['December'] = 'Dezember';

t['Update Coordinates'] = 'Koordinaten aktualisieren';
t['Comments: '] = 'Kommentare: ';
t['If you decide to encrypt the logs, text within brackets [like this] will not be encrypted.'] 
  = 'Falls du dich entscheidest den Text zu verschlüsseln, wird Text in eckigen Klammern [etwa so] nicht verschlüsselt.';

t['* Choose a Log Type'] = '* Wähle die Art des Logs';
t['Add a waypoint to the log'] = 'Wegpunkt zum Log hinzufügen';
t[' Degrees, minutes, seconds (DMS) '] = 'Grad, Minuten, Sekunden (DMS)';
t[' Degrees and minutes (MinDec) '] = 'Grad und Minuten (MinDec)';
t[' Decimal Degrees (DegDec) '] = 'Dezimalgrad (DegDec)';
t['Dropped Off Any '] = 'Etwas hineingelegt, z.B. '
t['Here you can "drop" them into this cache so others know the travel bugs are ready to be picked up!']
  = 'Hier kannst du sie in den Cache "legen" und andere wissen lassen, dass Travelbugs fertig zum abholen sind.';
t['- NONE SELECTED -'] = '- KEINER AUSGEWÄHLT -';
t['If you dropped off more than one, hold Ctrl down and click on each bug to drop off.']
  = 'Falls du mehr als einen hineingelegt hast, halte die Strg-Taste gedrückt und klicke auf jeden Travelbug um ihn abzulegen.';
t['Visit Another Listing: '] = 'Gehe zu anderem Cache: ';
t[' (You can make it unreadable unless someone chooses to translate it. Good to use if your log contains information on how to find the cache) ']
  =' (Damit machst du es unleserlich, außer jemand entscheidet sich dafür es zu entschlüsseln. Das ist sinnvoll, falls dein Eintrag Informationen über das Finden des Caches enthält.)';

b['Submit Log Entry'] = 'Logeintrag senden';



//**********************************************************************************



// Übersetzung der Seite zum Verfolgen von TravelBugs und Coins
// http://www.geocaching.com/track/

t['Travel Bugs'] = 'Travelbugs';
t['Promotionals'] = 'Werbeobjekte';

t['Collectible Geocoins come in all shapes and sizes, and can be tracked in the same way as Travel Bugs. Here you can log a geocoin you found, activate a new geocoin, locate geocoins near you, and find out how to create your own.'] 
  = 'Sammelbare Geocoins gibt es in allen Formen und Größen. Sie können genauso verfolgt werden wie Travelbugs. Hier kannst du gefundene Geocoins loggen, neue Geocoins aktivieren, Geocoins in deiner Nähe finden und herausfinden wie du deine eigenen erstellst.';

//t['A Travel Bug is a trackable item that moves from place to place, picking up stories along the way. Here you can add your own story, or live vicariously through each bug's adventures.'] = ' ';

t['From time to time Groundspeak will host various promotions involving trackable items. Here you will find information on all of the past and present promotions involving Geocaching.com Trackables.'] 
  = 'Von Zeit zu Zeit wird Groundspeak verschiedene Werbeaktionen mit verfolgbaren Objekten veranstalten. Hier wirst du Informationen über alle vergangenen und aktuellen Werbeaktionen mit Geocaching.com Travelbugs oder Coins finden.';

t['Geocoin Home'] = 'Geocoin Startseite';
t['How to Log a Geocoin'] = 'Wie man eine Coin loggt';
t['Geocoin Forums'] = 'Geocoin-Foren';
t['Travel Bug Home'] = 'Travelbug Startseite';
t['Travel Bug FAQ'] = 'Travelbug FAQ';
t['Order Travel Bugs'] = 'Travelbugs bestellen';
t['How to Log a Travel Bug'] = 'Wie man einen Travelbug loggt';
t['Visit the Travel Bug Gallery'] = 'Besuche die Travelbug-Galerie';
t['Travel Bug Forums'] = 'Travelbug-Foren';
t['Enter the Tracking Number of the Item:'] = 'Gib die Identifikationsnummer des Objektes ein:';
t['The "Tracking Number" is the unique series of letters and numbers that appears on each item.'] 
	= 'Die Identifikationsnummer ist eine einmalige Folge von Buchstaben und Zahlen die auf jedem Objekt zu finden ist.';
t['Search for a Trackable Item by Name:'] = 'Suche ein verfolgbares Objekt nach Namen:';
t['Activate Trackable Item:'] = 'Aktiviere verfolgbares Objekt:';
t['Recent Logs'] = 'Aktuelle Logs';
r['(.*) from $'] = '$1 von ';
r['^ \\(Travel Bug Dog Tag\\)(.*)'] = ' (Travelbug-Anhänger)$1';
t['visit log'] = 'Zeige Log';
b['Track'] = 'Verfolgen';
b['Activate'] = 'Aktivieren';


//**********************************************************************************


// Übersetzung der Such- und Suchergebnisseite (Travelbugs)
// http://www.geocaching.com/track/search.aspx*

t['Trackable Item Search'] = 'Verfolgbare Objekte Suche';
t[' > Search '] = ' > Suchen';
t['Search Trackable Items'] = 'Suche verfolgbare Objekte';
t['No results were found for your search.'] = 'Deine Suche ergab keine Resultate.';
t['By Keyword:'] = 'Nach Suchbegriff';
t['Searches name, mission and description for keywords.'] = 'Durchsucht Name, Mission und Beschreibung nach Suchbegriffen.';
t['By Cache Number:'] = 'Nach Nummer';
t['(eg. GCXXXX) - Searches the history of a specific cache for trackable items.']
  = '(z.B. GCXXXX) - Durchsucht die Geschichte eines speziellen Caches auf verfolgbare Objekte';
t['(eg. GCXXXX)'] = '(z.B. GCXXXX)';
t['Searches the history of a specific cache for trackable items.'] = 'Durchsucht die Chronik eines konkreten Caches nach verfolgbaren Objekten.';
t['By Username:'] = 'Nach Nutzername';
t['Looks for trackable items owned or found by a user.'] = 'Sucht nach verfolgbaren Objekten, die von einem Benutzer besitzt oder gefunden wurden.';
t['Sort by:'] = 'Sortiert nach: ';
t[sp+'Last Log '] = ' Letztem Log ';
t[sp+'Distance'] = ' Entfernung';
r['^By Keyword\\(s\\)'] = 'Nach Suchbegriff(en)';
t['new search'] = 'neue Suche';
t['Last Log'] = 'Letzter Log';
t['Owner'] = 'Besitzer';
t['Location'] = 'Aufenthaltsort';
t['Traveled'] = 'Reiste';
t['Found'] = 'Gefunden';
t['Owned'] = 'Besessen';


//**********************************************************************************



// Übersetzung der Trackable Item Details
// http://www.geocaching.com/track/details.aspx*
t[' Use ']=' Benutze ';
t[' to reference this item.']=' um dich auf dieses Objekt zu beziehen.';
r['Trackable Item Search'] = 'Suche verfolgbarer Objekte';
t['Trackable Item Details'] = 'Details verfolgbarer Objekte';
t['Trackable Item Options'] = 'Optionen verfolgbarer Objekte';
t['Found It? Log it!'] = 'Gefunden? Logge es!';
t['Found this item? Log in.'] = 'Gefunden? Melde dich an.';
t['Add a Log Entry'] = 'Füge einen Log hinzu';
t['Watch This Trackable Item'] = 'Objekt beobachten';
t['Add a log entry'] = 'Logeintrag hinzufügen';
t['Edit This Item'] = 'Objekt verändern';
t['Edit This Trackable Item'] = 'Objektdetails bearbeiten';
t['Upload an Image'] = 'Bild hinzufügen';
t['Print Info Sheet'] = 'Infozettel drucken';
t['View in Google Earth'] = 'In Google Earth ansehen';
t['There is '] = '';
t[' user watching this listing.'] = ' Benutzer beobachtet diesen Eintrag.';
t['Tracking Number: '] = 'Identifikationsnummer: ';
t['Owner:'] = 'Besitzer:';
t['Released:'] = 'Ausgesetzt:';
t['Origin'] = 'Herkunft';
t[' Use '] = 'Verwende';
t[' to reference this item.'] = ' für Verweise.';
t['How do Trackable Items work?'] = 'Wie funktionieren verfolgbare Objekte?';
t['Current GOAL:'] = ' Aktuelles Ziel:';
t['There is currently no goal for this item.'] = 'Dieses Objekt hat noch kein Ziel.';
t['About this item: '] = 'Über dieses Objekt: ';
t['No additional details available.'] = 'Keine weiteren Details verfügbar.';
t['View the Gallery'] = 'Galerie anschauen';
r['^Gallery Images related to '] = 'Bilder in Verbindung mit ';
r['^View all (\\d+) Gallery Images$'] = 'Alle $1 Bilder betrachten';
r['^\\s*Tracking History'] = 'Bisherige Stationen';
r[' of (\\d+) records ·$'] = ' von $1 Einträgen ·';
t['next ›'] = 'nächste ›';
t['last »'] = 'letzte »';
t[' placed it in '] = ' platzierte es in ';
r['placed'] = 'legte';
r['^ retrieved it .*'] = ' entnahm es aus ';
r['retrieved'] = 'nahm';
t[' grabbed it '] = ' nahm es ';
t[' discovered it '] = ' entdeckte es ';
r['discovered'] = 'entdeckte';
t[' posted a note for it'] = ' schrieb eine Notiz';
t['visit log'] = 'Zeige Log'
t['View All'] = 'Zeige Alle';
t['Mark Item Missing'] = 'Als vermisst kennzeichnen';
t['Move to last location'] = 'Zur letzen Station zurück';
t['Recalculate Distance'] = 'Entfernung neuberechnen';
t['Recently Spotted:'] = 'Kürzlich gesehen:';
t['In the hands of the owner.'] = 'In den Händen des Besitzers.';
r['^In the hands of'] = 'In den Händen von';
t[' users watching this listing.'] = ' weitere Nutzer, die diese Beschreibung beobachten';
t['Actions'] = 'Aktionen';
t['Trackable Item History'] = 'Geschichte des verfolgbaren Objekts';


//**********************************************************************************



// Übersetzung der Travel Bug Log Seite
// http://www.geocaching.com/track/log.aspx*

t['[upload image]'] = '[Bild hochladen]';
t[' In reference to:'+sp+' '] = 'In Bezug auf:'+sp;
t['Type of Log:'+sp] = 'Art des Logs:'+sp;
r['^Retrieve from'] = 'Nimm es aus';
t['Grab it from somewhere else'] = 'Nimm es von woanders';
r['^Grab it from current holder'] = 'Nimm es vom aktuellen Besitzer';
t['Write note'] = 'Schreibe Notiz';
t['Discovered it'] = 'Habe es entdeckt';
t['Date Logged:'+sp] = 'Logdatum:'+sp;
t['(mm/dd/yyyy)'] = '(mm/tt/jjjj)';
t['Travel Bug Tracking #'] = 'Travelbug-Identifikationsnummer ';
t['Travel Bug Tracking Nr'] = 'Travelbug-Identifikationsnummer ';
t['Comments:'] = 'Kommentar:';
t['* Required'] = '* Benötigt';
t[' If you decide to encrypt the logs, text within brackets [like this] will not be encrypted.'] 
  = 'Wenn du dich dafür entscheidest, den Log zu verschlüsseln, wird Text in eckigen Klammen [wie hier] nicht verschlüsselt.';
t['Encrypt this log entry*'] = 'Dieses Log verschlüsseln*';
t['Visit Another Travel Bug:'] = 'Gehe zu anderem Travelbug:';
t['*You can make your log unreadable unless someone chooses to translate it. This is good if your log contains information on how to find the cache. If you decide to encrypt the log, text within brackets [like this] will not be encrypted. ']
  = '*Damit machst du es unleserlich, außer jemand entscheidet sich dafür, es zu entschlüsseln. Das ist sinnvoll, falls dein Log Informationen über das Finden des Caches enthält. Falls du es verschlüsselst, wird Text in Klammern [wie hier] nicht verschlüsselt.';


//**********************************************************************************


// Übersetzung der Edit Trackable Item Seite
// http://www.geocaching.com/track/edit.aspx*

t['Edit a Trackable Item'] = ' > Verändern eines verfolgbaren Objektes';
t['Edit your Trackable Item'] = 'Verändere dein verfolgbares Objekt';
t['Return to the Trackable Item Page'] = 'Zurück zur Beschreibung des verfolgbaren Objektes';
t['Bug Image:'] = 'Bild:';
t['Upload Image'] = 'Bild hinzufügen';
t['Description:'] = 'Beschreibung:';
b['Submit Changes'] = 'Änderungen senden';


//**********************************************************************************


// Übersetzung der Seite zum Hochladen von Bildern
// http://www.geocaching.com/track/tupload.aspx*
// http://www.geocaching.com/seek/upload.aspx*
// http://www.geocaching.com/seek/cupload.aspx*

t[' > Image Tools '] = ' > Bildwerkzeuge ';
t[sp+'>'+sp+'Upload a Log Image '] = sp+'>'+sp+'Bild zum Log hochladen';
t['Uploading for Travel Bug'] = 'Für Travelbug hochladen';
t['Uploading for Log'] = 'Für Log hochladen';
t['Uploading for Cache Listing'] = 'Für Cache-Eintrag hochladen';
t['for'] = 'für';
t['view'] = 'ansehen';
t['Select an image for your machine to upload. The site will resize your image once it has finished uploading.'] = 'Wähle für den Upload ein Bild von deinem Computer. Sobald der Upload beendet ist, wird die Größe deines Bildes angepasst.';
t['File:'] = 'Datei:';
t['File Caption:'] = 'Bildtitel:';
t['File Description:'] = 'Bildbeschreibung:';
t['Make this the default image for this Travel Bug'] = 'Dieses Bild zum Standardbild des Travelbugs machen';
t['File upload supports the following formats: jpg, gif, tiff.'] = 'Folgende Dateiformate werden unterstützt: jpg, gif, tiff.';
t['Some Tips'] = 'Einige Tipps';
t['If your original image is under 125k or 600 pixels wide, the largest image will not be resized.'] = 'Wenn dein Originalbild unter 125kB groß oder weniger als 600 Pixel breit ist, wird das größte Bild nicht skaliert.';
t['It doesn\'t do the best resizing job. Editing your own larger image is preferable.'] = 'Die automatische Skalierung ist nicht sonderlich gut. Das Bild selbst zu verkleinern ist empfehlenswert.';
t['Final images will always be converted to jpg.'] = 'Fertige Bilder werden immer zu jpg konvertiert.';


//**********************************************************************************


// Übersetzung der Seiten zur Aktivierung verfolgbarer Objekte
// http://www.geocaching.com/track/activate.aspx*

// Schritt 1

t[' > Activate a Trackable Item '] = ' > Aktivierung eines verfolgbaren Objektes';
t['Step 1 of 3: Activation Code'] = 'Schritt 1 von 3: Aktivierungscode';
t['Tracking Number'] = 'Identifikationsnummer';
t[', congratulations on your Trackable Item purchase! There are only 3 simple steps to activate your new Item.'] 
  = ', Glückwunsch zum Erwerb deines verfolgbaren Objektes! Es sind nur 3 Schritte zur Aktivierung deines neuen Objektes.';
t['Enter Your Tracking Number: '] = 'Gib deine Identifikationsnummer ein:';
t['Enter Your Activation Code: '] = 'Gib deinen Aktiverungscode ein:';
t['First, you will need to enter your items\'s tracking number and activation code. The tracking number is the number stamped on your coin or dog tag.'] 
  = 'Zuerst musst du die Identifikationsnummer und den Aktivierungscode des Objektes eingeben. Die Identifikationsnummer ist die auf deiner Coin oder deinem Anhänger eingestanzte Nummer.';
t['The activation code is a unique code located on the packaging for each Trackable Item. When activated, the Trackable Item will be assigned to your user account. This way you can modify its own personal page.'] 
  = 'Der Aktivierungscode ist ein einmaliger Code, der sich auf der Verpackung jedes verfolgbaren Objektes befindet. Bei der Aktivierung wird das verfolgbare Objekt mit deinem Benutzerkonto verknüpft. Dadurch kannst du seine eigene Informationsseite ändern.';
t[' indicates a required field.'] = ' erforderliches Feld';
b['Activate Your Trackable Item'] = 'Aktiviere dein verfolgbares Objekt';

 
// Schritt 2

t['Step 2 of 3: Trackable Item Details'] = 'Schritt 2 von 3: Details des verfolgbaren Objektes';
t['You have successfully assigned this Trackable Item to your account. Your Trackable Item number is:'] 
  = 'Du hast dieses Objekt erfolgreich mit deinem Benutzerkonto verknüpft. Die Inventarnummer des Objektes ist:';
t['Write this number down. This is the number you can share with other users. ']
  = 'Notiere dir diese Nummer. Diese Nummer kannst du an andere Spieler weitergeben. ';
t['Do not give out your Trackable Item tracking number'] = 'Gib aber niemals die Identifikationsnummer des Objektes weiter';
t[' as it is used to verify that users have your Bug. The reference number will also be listed on your Trackable Item\'s page.']
  = ', da diese genutzt wird um sicherzustellen, dass andere Spieler dein Objekt haben. Die Inventarnummer wird dir auch auf der Seite deines Objektes angezeigt.';
t['Next, provide some information about your Trackable Item. Give it a name, description, and a goal if it has one. All that is required is a name, and you can always go back to update the Trackable Item\'s information after you have finished these steps.'] 
  = 'Gib als nächstes einige Informationen über dein Objekt an. Gib ihm einen Namen, eine Beschreibung und ein Ziel, fall es eines hat. Nur der Name ist zwingend nötig. Die anderen Informationen über das Objekt kannst du auch nach Beendigung dieser Schritte hinzufügen.';
t['Pick a mission for your trackable item. If you leave it blank the mission will be to travel randomly from cache to cache.'] 
  = 'Wähle eine Mission für dein Objekt. Wenn du keine angibst, wird sie darin bestehen, zufällig von Cache zu Cache zu reisen.';
t['Description'] = 'Beschreibung';
t['If you want to provide information about your trackable item, post it here.'] 
  = 'Falls du weitere Informationen über dein Objekt angeben möchtest, trage sie hier ein.';

// Schritt 3

t['Step 3 of 3: Release Location'] = 'Schritt 3 von 3: Ort der Freilassung';
t['Great! Your Trackable Item is almost ready to go. The last step is to provide us with the Trackable Item\'s activation location. It is used to show users where it'+sp+'originated and when it was released.'] 
  = 'Toll! Dein verfolgbares Objekt ist fast fertig für die Abreise. Gib im letzten Schritt an, wo du ihn zuerst freigelassen hast. Es zeigt anderen Spielern die'+sp+'Herkunft und den Tag der Freilassung.';
t['Date Activated:'] = 'Freigelassen am:';
t['Location Activated: '] = 'Freigelassen in: ';



//**********************************************************************************



// Übersetzen der Seite zum Melden eines neuen Caches
// http://www.geocaching.com/hide/report.aspx

t['Hide'] = 'Verstecken';
t['Your listing is currently in the review queue.'] = 'Dein Cache befindet sich zur Zeit in der Review-Warteliste.';

t['Create / Edit a Geocache Listing'] = ' > Erstellen/Editieren eines Cache-Eintrags';
t['An Error Has Occurred'] = 'Ein Fehler ist aufgetreten';
t['You are not logged in. Please '] = 'Du bist nicht angemeldet. Bitte ';
t['login first'] = 'melde dich zuerst an';
t['Report a New Cache'] = 'Melden eines neuen Caches';
t['Editing Cache'] = 'Cache ändern';
t['view listing'] = 'zeige Eintrag';
t['New'] = 'Neu';
t['Edit Attributes'] = 'Eigenschaften festlegen';
t['Add / Edit Waypoints'] = 'Wegpunkte hinzufügen / ändern';
t['Your cache has been edited. '] = 'Dein Cache wurde geändert. ';
t['There are errors on this page. Scroll down to see the errors.'] = 'Es gibt Fehler auf dieser Seite. Details finden sich weiter unten auf dieser Seite.';
t['Missing latitude minutes'] = 'Breitengrad: Minuten fehlen';
t['Missing longitude minutes'] = 'Längengrad: Minuten fehlen';
t['Missing latitude degrees'] = 'Breitengrad: Grad fehlen';
t['Missing longitude degrees'] = 'Längengrad: Grad fehlen';
t['Invalid latitude minutes'] = 'Breitengrad: Minuten sind ungültig';
t['Invalid longitude minutes'] = 'Längengrad: Minuten sind ungültig';
t['Invalid latitude degrees'] = 'Breitengrad: Grad sind ungültig';
t['Invalid longitude degrees'] = 'Längengrad: Grad sind ungültig';
t['Your submission did not go through. There were errors.'] = 'Dein Cache wird aufgrund von Fehlern nicht akzeptiert.';
t['Error Occurred'] = 'Ein Fehler ist aufgetreten';
t['You need to choose a terrain level.'] = 'Du musst eine Geländeschwierigkeit wählen';
t['You need to choose a difficulty level.'] = 'Du musst eine Schwierigkeit wählen';
t['Longitude must be E for this country'] = 'Längengrad muss für dieses Land ein E sein';
t['Longitude must be W for this country'] = 'Längengrad muss für dieses Land ein W sein';
t['Latitude must be N for this country'] = 'Breitengrad muss für dieses Land ein N sein';
t['Latitude must be S for this country'] = 'Breitengrad muss für dieses Land ein S sein';
t['You need to have a name for your listing.'] = 'Es muss ein Name für den Cache angegeben werden.';
t['You need to enter a real Latitude and Longitude for this listing.'] = 'Es muss ein gültiger Wert für Längen- und Breitengrad angegeben werden';
t['You need to read and agree to '] = 'Sie müssen vorher ';
t['the guidelines'] = 'die Richtlinien';
t[' before the listing can go through.'] = ' lesen und akzeptieren.';
t['the terms of use agreement'] = 'die Nutzungsbedingungen akzeptieren';
t['* Can\'t be empty'] = '* Darf nicht leer sein';
t['* Problems with coordinates'] = '* Probleme mit den Koordinaten';
t['You have successfully submitted your new cache listing. If you need to make any changes, feel free to do so now. '] 
  = 'Du hast erfolgreich einen neuen Cache angelegt. Wenn du noch irgendwelche Änderungen vornehmen möchtest, kannst du das jetzt gerne machen.';
t['Also, please take a moment and '] = 'Bitte nimm dir die Zeit und ';
t['add some attributes for your listing.'] = 'füge dem Cache einige Eigenschaften hinzu.';
t['Your fellow geocachers thank you!'] = 'Andere Geocacher werden es dir danken!';

t['Please fill out the information below regarding your cache. Once you are done, click on the button at the bottom of the page to send it for review. You will receive a confirmation if your cache report was successfully submitted.']
  = 'Bitte gib die unten geforderten Informationen zu deinem Cache an. Sobald du fertig bist, klicke den Button am Seitenende um ihn zur Prüfung freizugeben. Du erhälst eine Bestätigung falls dein Eintrag erfolgreich übermittelt wurde.'
t['Always keep a backup of your cache information.'] = 'Behalte immer eine Sicherung der Cache-Informationen.'
t['You have a limited session timeframe (40 minutes). You\'ll need to enter your cache report within this time, or your session will end and your submission won\'t be sent. If you need more time, we suggest writing your report in a text editor and copying and pasting the text onto this page.']
  = 'Du musst diesen Cache-Eintrag innerhalb von 40 Minuten fertigstellen. Danach endet deine Sitzung und dein Eintrag wird nicht gesendet werden. Falls du mehr Zeit benötigst, empfehlen wir den Eintrag in einem Text-Editor zu erstellen und den Text zu kopieren und auf dieser Seite einzufügen.';
t['If you wish to add images to your cache, you\'ll have the option of uploading images once your cache report has been submitted.']
  = 'Falls du Bilder zu deinem Eintrag hinzufügen möchtest, kannst du das erst nach dem Übermitteln deines Eintrages.';

t['Cache Type:'] = 'Cachetyp:';
t['Traditional Cache'] = 'Traditioneller Cache';
t['Multi-Stage Cache (Multicache)'] = 'Multicache (Mehrere Stationen)';
t['Mystery/Puzzle Cache'] = 'Mystery/Rätselcache';

t['Cache Size:'] = 'Cachegröße:';
t['Not Listed'] = 'Nicht angegeben';
t['Micro (e.g. 35mm Film Canister)'] = 'Mikro (z.B. 35mm Filmdöschen)';
t['Small (holds logbook and small items)'] = 'Klein (enthält Logbuch und kleine Gegenstände)';
t['Regular (Rubbermaid, ammo box)'] = 'Normal (Munitionskiste, große Tupperdose)';
t['Large (5 gallon bucket)'] = 'Groß (10-Liter-Eimer)';
t['Other (See description)'] = 'Andere (siehe Beschreibung)';

t['Cache Name:'] = 'Cachename:';
t['Who Placed the Cache:'] = 'Wer legte den Cache aus:';
t['The cache is still owned by one account, but you can list whoever placed the cache.'] 
  = 'Dieser Cache gehört immer noch zu einem Account, aber du kannst angeben wer ihn ausgelegt hat.';
t['Check if you only want Premium and Charter Members to view this cache.'] 
  = 'Markieren, falls nur Premium- und Charter-Mitglieder diesen Cache sehen sollen.';
t['Yes, this cache is currently active (']= 'Ja, dieser Cache ist zur Zeit aktiv (';
t['Reviewers will not see this listing unless box is checked']
  = 'Die Reviewer sehen diesen Eintrag nicht, solange die Box nicht markiert ist.';
t['Yes, this listing is active (For new listings, if you want to work on this listing before it is reviewed, uncheck this box. Reviewers will only see the listing in the queue when it is checked.)']
  = 'Ja, dieser Cache ist aktiv. (Die Reviewer sehen diesen Eintrag nicht, solange die Box nicht markiert ist.)';
t['Date Placed:'] = 'Legedatum:';
t['(dd/mm/yyyy)'] = '(TT/MM/JJJJ)';
t['Related Web Page:'] = 'Verwandte Webseite:';
t['Background Image URL:'] = 'URL des Hintergrundbildes:'
t['Optional field. This will change the background image on the web page to the location you define.']
  = 'Optional. Hier kannst du die Adresse eines eigenen Hintergrundbildes angeben.';
t['Coordinates'] = 'Koordinaten';
t['--Select State/Province--'] = '--Wähle Land/Provinz--';
t['Overall Difficulty Rating:'] = 'Durchschnittl. Bewertung der Schwierigkeit';
t['(1 is easiest, 5 is hardest. Try '] = '(1 am leichtesten, 5 am schwersten. Versuche ';
t['this system'] = 'dieses System';
t[' to rate your cache.)'] = ' um deinen Cache zu bewerten.)';
t['Overall Terrain Rating:'] = 'Durchschnittl. Bewertung des Geländes:';
t['You can '] = 'Du kannst ';
t['modify your cache coordinates via a log entry'] = 'die Koordinaten des Caches durch einen Logeintrag ändern';

t['You can use HTML in any of the description fields below with the exception of JavaScript and other embedded code. If you do supply html you will need to check the box below for the text to render correctly.']
  = 'Du kannst HTML in jedem der Beschreibungsfelder benutzen, mit Außnahme von Javascript oder anderem eingebetteten Code. Falls du HTML benutzen möchtest, kreuze das Kästchen unten an, damit der Text korrekt dargestellt wird.';
t['The descriptions below are in HTML'] = 'Die folgenden Beschreibungen beinhalten HTML-Code';
t['Short Description:'] = 'Kurzbescheibung:';
t['Location information, terrain and general difficulty levels, altitude, etc. Please limit your text to 500 characters.'] 
  = 'Informationen zum Standort, Gelände- und allgemeine Schwierigkeitsstufen, Höhe usw. Bitte beschränke den Text auf 500 Zeichen.';
t['Long Description:'] = 'Ausführliche Beschreibung:';
t['Details about the cache, including contents of the cache, what the container looks like, etc. You can be as brief or as detailed as you like.'] 
  = 'Details über den Cache, einschließlich dessen Inhalt, wie der Behälter aussieht usw. Du kannst den Cache so ausführlich beschreiben, wie du willst.';
t['Hints/Spoiler Info:'] = 'Hinweise und Spoiler:';
t['Enter any hints or spoiler information below. This information will be encrypted on the site until a geocacher clicks on a link to unencrypt it, or decodes it on the trail. Text within brackets [like this] will not be encrypted. '] 
  = 'Gib im Folgenden Tipps und Spoilerinformationen ein. Diese Information wird auf der Seite verschlüsselt dargestellt, bis ein Geocacher auf einen Link zum Entschlüsseln klickt oder sie unterwegs dekodiert. Text in eckigen Klammer [wie hier] wird nicht verschlüsselt. ';
t['Please keep your hints short, so decoding it on the trail is easier'] = 'Bitte fasse deine Hinweis kurz, damit das Dekodieren unterwegs leichter ist. ';
t['. If you don\'t have a hint, leave it blank.'] = 'Wenn du keinen Tipp hast, lasse das Feld leer.';
t['Note to Reviewer:'] = 'Hinweis an die Reviewer:';
t['In order to expedite your new cache publishing, please provide any details for the cache listing that would be helpful to the cache reviewer. The reviewer will delete this note before publishing your listing.']
  = 'Um die Veröffentlichung deines neuen Caches zu beschleunigen, gib bitte alle Details zum Cacheeintrag an, die für den Reviewer hilfreich sein könnten. Der Reviewer wird diesen Hinweis vor der Veröffentlichung deines Eintrags löschen.';
t['Regarding Trackable Items:'] = 'Bezüglich verfolgbarer Objekte:';
t['If you place a trackable item in your cache, you will need to add a log entry to your cache page. After clicking on the submit button, add a log to your cache page like in '] 
  = 'Falls du ein verfolgbares Objekt in deinen Cache legst, musst du einen Logeintrag auf deiner Cache-Seite hinzufügen. Nachdem du auf "Absenden" geklickt hast, füge einen Logeintrag hinzu, wie ';
t['the "how to" guide for Trackable Items'] = 'im "How to" für verfolgbare Objekte beschrieben';
t['Yes. I have read and understand '] = 'Ja, ich folgendes gelesen und verstanden: ';
t['the guidelines for listing a cache'] = 'Richtlinien zum Eintragen eines Caches';
t['Yes. I have read and agree to '] = 'Ja, ich habe folgendes gelesen und stimme damit überein: ';
t['the terms of use agreement.'] = 'Nutzungsbedinungen';



//**********************************************************************************



// Übersetzen der Seite zum Festlegen der Cache-Attribute
// http://www.geocaching.com/hide/attributes.aspx*

b['Reset']='Zurücksetzen';
b['Submit Changes']='Änderungen übernehmen';

t['Add / Edit Geocache Attributes'] = 'Geocache-Eigenschaften festlegen';
r['^Editing attributes for'] = 'Eigenschaften festlegen von';
t[' Edit Details'] = ' Zeige Details';
t['View Listing'] = 'Zeige Eintrag';
t['Below is a list of current attributes available for this cache type. Choose the attributes that apply to your cache and click on the button below to update your cache listing with this information. ']
  = 'Nachstehend befindet sich eine Liste mit zur Zeit verfügbaren Eigensschaften für diese Art von Cache. Wähle die Attribute, die auf deinen Cache zutreffen und klicke auf die untere Schaltfläche um sie deinem Cache-Eintrag zuzuweisen. '; 
t['You are limited to a maximum of 10 attributes per listing.']
  = 'Du kannst maximal 10 Eigenschaften pro Cache zuweisen.';
t[' If you don\'t need the attribute just choose N/R (not related) from the list of options. For example, although a snowmobile is not normally required to find a cache in Florida, you do not need to select the "no" option for it.'] = ' Wenn du die Attribute nicht benötigst, wähle einfach N/R (not related) in der Optionsliste. Zum Beispiel ist ein Schneemobil normalerweise nicht nötig um ein Cache in Florida zu finden und du brauchst nicht "nicht erlaubt" dafür auswählen.'; 
t['N/R'] = 'nicht relevant';
t['Permissions'] = 'Erlaubnisse';
t['Allowed'] = 'erlaubt';
t['Not Allowed'] = 'nicht erlaubt';
t['Dogs'] = 'Hunde';
t['Bicycles'] = 'Fahrräder';
t['Motorcycles'] = 'Motorräder';
t['Off-road vehicles'] = 'Geländefahrzeuge';
t['Snowmobiles'] = 'Schneemobile';
t['Horses'] = 'Pferde';
t['Campfires'] = 'Lagerfeuer';

t['Special Equipment'] = 'Spezialausrüstung';
t['Required'] = 'Benötigt';
t['Not Required'] = 'Nicht benötigt';
t['Access or parking fee'] = 'Eintritt oder Parkgebühren';
t['Climbing gear'] = 'Kletterausrüstung';
t['Boat'] = 'Boot';
t['Scuba gear'] = 'Tauchausrüstung';
t['Flashlight required'] = 'Taschenlampe benötigt';

t['Conditions\n'] = 'Umstände';
t['Yes'] = 'Ja';
t['No'] = 'Nein';
t['Recommended for kids'] = 'Empfehlenswert für Kinder';
t['Takes less than an hour'] = 'Dauert weniger als eine Stunde';
t['Scenic view'] = 'Schöne Aussicht';
t['Significant hike'] = 'Umfangreiche Wanderung';
t['Difficult climbing'] = 'Schwieriges Klettern';
t['May require wading'] = 'Kann Waten erfordern';
t['May require swimming'] = 'Kann Schwimmen erfordern';
t['Available at all times'] = 'Jederzeit verfügbar';
t['Recommended at night'] = 'Empfohlen bei Nacht';
t['Available during winter'] = 'Im Winter verfügbar';
t['Stealth required'] = 'Unauffälligkeit erforderlich';
t['Watch for livestock'] = 'Auf Tierbestand achten';

t['Hazards'] = 'Gefahren';
t['Present'] = 'Vorhanden';
t['Not Present'] = 'Nicht vorhanden';
t['Thorns'] = 'Dornen';
t['Poison plants'] = 'Giftpflanzen';
t['Snakes'] = 'Schlangen';
t['Ticks'] = 'Zecken';
t['Abandoned mines'] = 'Stillgelegte Mine';
t['Cliff / falling rocks'] = 'Klippen / Steinschlag';
t['Hunting'] = 'Jagd';
t['Dangerous area'] = 'Gefährliches Gebiet';

t['Facilities'] = 'Einrichtungen';
t['Wheelchair accessible'] = 'Rollstuhltauglich';
t['Parking available'] = 'Parkplätze verfügbar';
t['Public transportation'] = 'ÖPNV';
t['Drinking water nearby'] = 'Trinkwasser in der Nähe';
t['Public restrooms nearby'] = 'Öffentl. Toiletten in der Nähe';
t['Telephone nearby'] = 'Telefon in der Nähe';
t['Picnic tables nearby'] = 'Picknicktische in der Nähe';
t['Camping available'] = 'Camping möglich';
t['Stroller accessible'] = 'Kinderwagentauglich';

t['Thanks to 9Key, GeoRocks, and scooterj for their early implementations of this feature.'] 
  = 'Dank an 9Key, GeoRocks und scooterj für ihre frühzeitige Einbindung dieses Features.';
t[' Thanks to 9Key, GeoRocks, and scooterj for their early implementations of this feature.\n'] 
  = 'Dank an 9Key, GeoRocks und scooterj für ihre frühzeitige Einbindung dieses Features.';

b['Update Attributes'] = 'Attribute aktualisieren';


//**********************************************************************************



// Übersetzen der Seite zum Festlegen der Wegpunkte eines Caches
// http://www.geocaching.com/hide/wptlist.aspx*

t['Add / Edit Waypoints'] = 'Wegpunkte hinzufügen/bearbeiten';
t['Waypoint Collection'] = 'Wegpunktsammlung';
t['For listing: '] = 'Für Eintrag: ';
t['Add a New Waypoint'] = 'Neuen Wegpunkt hinzufügen';
t['Type:'] = 'Typ:';
t['-- Choose a Waypoint Type --'] = '-- Wähle die Art des Wegpunktes --';
t['Final Location'] = 'Zielposition';
t['Parking Area'] = 'Parkplätze';
t['Question to Answer'] = 'Beantwortung einer Frage';
t['Reference Point'] = 'Referenzpunkt';
t['Stages of a Multicache'] = 'Station eines Multicaches';
t['Trailhead'] = 'Streckenbeginn';
t['Waypoint Lookup Code:'] = 'Wegpunkt-Inventarcode';
t['A lookup code is a 6 digit (or less) code to describe the waypoint. In the future, Geocaching.com may use this as the name for your waypoint when saving to the GPS, but for now it should just be unique for this set. STAGE1 or FINAL are good names for the lookup code. The codes in the collection should be unique.']
  = 'Ein Inventarcode ist ein maximal 6 stelliger Code um den Wegpunkt zubeschreiben. In Zukunft plant Geocaching.com diesen als Namen für deinen Wegpunkt zu benutzen, wenn dieser zum GPS übertragen wird. Bislang reicht es aus, dass jeder Code in dieser Liste nur einmal vorkommt. PUNKT1 oder ZIEL sind gute Namen.';
t['Prefix Code:'] = 'Präfix-Code';
t['A Prefix Code is a two character code that is used when a waypoint is associated with another listing. GC, TB, WP'+sp+'and WM are reserved prefix codes These codes need to be unique for each waypoint on the list.']
  = 'Der Prefix-Code ist ein zweistelliger Code, der genutzt wird, falls ein Wegpunkt mit einem anderen Eintrag verknüpft wird. GC, TB, WP und WM sind reservierte Prefix-Codes. Jeder Prefix-Code darf in dieser Liste nur einmal vorkommen.';
t['Coordinates:'] = 'Koordinaten';
t['Description (UBB Code Allowed):'] = 'Beschreibung (UBB-Code erlaubt)';
t['Show all information for this waypoint, including coordinates'] = 'Zeige alle Informationen zu diesen Wegpunkt, einschließlich Koordinaten';
t['Show the details of this waypoint but hide the coordinates'] = 'Zeige die Details für dieses Wegpunkt, aber verberge die Koordinaten';
t['Hide this waypoint from view except by the owner or administrator'] = 'Verberge diesen Wegpunkt. Nur für Besitzer oder Administrator sichbar';
b['Create Waypoint'] = 'Erzeuge Wegpunkt';
b['Remove Waypoint'] = 'Entferne Wegpunkt';

t['As the owner of a geocache, you already watch it.'] = 'Als Besitzer des Caches beobachtest du diesen automatisch.';
r[' by ']=' von ';

//Map
r['Home Position:'] = 'Heimatposition:'; 
t['Map Results'] = 'Karte';
t[' Map Size: '] = ' Kartengröße: ';
t['Order a Topo Print at MyTopo.com'] = 'Höhenkarte bei MyTopo.com bestellen';
t['Link to this page'] = 'Link zu dieser Seite';
t['Parsing geocaches...'] = 'Analysiere Geocaches...';
t[' Paste link in '] = ' Link einfügen ';
t['Adjust your zoom level to view caches.'] = 'Passe die Vergrößerung an, um Caches zu sehen';
t['Zoom To Address:'] = 'Gehe zur Addresse';
t['Return to Pocket Query Home'] = 'Zurück zum Pocket Query Ursprung';
t['Return to Google Map Search'] = 'Zurück zur Suche mit Google Map';
t['Premium Member Filters:'] = 'Filter für Premium-Mitglieder:';
t['Create Pocket Query'] = 'Pocket Query erstellen';
t['Search Results:'] = 'Suchergebnisse:';
t[' Caches Displayed'] = ' Geocaches angezeigt';
t['Refresh Map'] = 'Karte neu laden';
t['Show Numbers on Map'] = 'Zeige die Nummern auf der Karte';
t['Hide My Finds'] = ' Verberge meine Funde';
t['Hide My Caches'] = ' Verberge meine Geocaches';
t['My caches waiting for review '] = 'Meine noch nicht veröffentlichten Geocaches ';
t['view archived'] = 'Zeige archivierte Caches';
t['Download Viewer'] = 'Viewer herunterladen';
t['How to View Geocaches Using Google Earth'] = 'Wie kann ich Caches in Google Earth sehen?';
r['Geocaching Maps']='Geocaching Karten';


t['Things to note:'] = 'Sachen die ihr wissen solltet:';
t['Supports PQ\'s with up to 500 wpts'] = 'Unterstützt Pocket Queries mit bis zu 500 Wegpunkten.';
t['Only supports GPX 1.0 for now.'] = 'Unterstützt bis jetzt nur GPX 1.0.';
t['Supports uploading zip file.'] = 'Unterstützt das Hochladen von ZIP-Dateien.';
t['Files will be automagically deleted after 7 days.'] = 'Daten werden nach 7 Tagen automatisch gelöscht.';
t['Supports only 10 offline pq files.'] = 'Unterstützt nur 10 offline Pocket Queries.';
t['File Name'] = 'Dateiname';
t['File Size'] = 'Dateigröße';
t['Waypoints'] = 'Wegpunkte';
t['Uploaded'] = 'Hochgeladen am';
t['Actions'] = 'Aktionen';
t[' No Uploaded Files '] = ' Keine hochgeladenen Dateien vorhanden ';
t['Select File:'] = 'Datei auswählen:';
t['Upload File'] = 'Datei hochladen';
t['Delete'] = 'Löschen';
t['There was an issue uploading your file.'] = 'Fehler beim Hochladen.';
t['Give us just a minute here... '] = 'Einen Moment bitte... ';


r['Send E-Mail to a User'] = 'E-Mail an Benutzer ';
t['Step 1: Look Up a User'] = 'Schritt 1: Benutzer suchen';
t['Enter a Username to Look Up:'] = 'Zu suchenden Benutzernamen angeben:';
t['Contacting:'] = 'Kontaktiere:';
t['Message:'] = 'Nachricht:';
r['characters used.'] = ' Zeichen benutzt.';
t['Step 2: Send E-Mail to a User'] = 'Schritt 2: E-Mail an Benutzer senden';
t['Send Another E-Mail'] = 'Andere E-Mail versenden';
t['How does this work?'] = 'Wie funktioniert das?';
t['We respect the privacy of our users. As a result, we allow you the ability to email other accounts through online forms without exposing your email address. In order to reduce abuse, there are a limited number of emails you can send per session, and your IP address will be sent to the recipient along with your message. Commercial emails are not allowed through this tool.']
  = 'Wir respektieren die Privatsphäre unserer Benutzer. Deshalb bieten wir die Möglichkeit andere Benutzer über ein Online-Formular zu kontaktieren, ohne deine E-Mailaddressen zu veröffentlichen. Um Spam zu vermeiden, ist die Anzahl der zu Nachrichten pro Sitzung beschränkt. Außerdem wird deine IP-Adresse gespeichert. Komerzielle E-Mails sind verboten!';
t['E-Mail Has Been Sent'] = 'E-Mail wurde verschickt';
t['Before submitting...'] = 'Vor dem Versenden...';
t['All email correspondence through the web site is logged to reduce abuse and increase security.']
  = 'Alle über diese Seite verschickten Nachrichten werden aus Sicherheitsgründen gespeichert.';
r['Your IP address '] = 'Deine IP-Adresse ';
r[' will be logged. Do not abuse the use of this feature.'] = ' wird gespeichert. Missbrauche diese Möglichkeit Nachrichten zu verschicken nicht.';
b['Send Message'] = 'Mitteilung senden';
t['I want to send my email address along with this message.'] = 'Ich will meine E-Mail-Adresse zusammen mit dieser Nachricht versenden.';
t['Email me a copy of this message.'] = 'Sende mir eine Kopie dieser E-Mail.';
t['Send Friend Request'] = 'Sende eine Freundschaftsanfrage mit dieser E-Mail.';
t['I\'m sorry, this user is not currently accepting friend requests.']='Leider akzeptiert dieser Benutzer zur Zeit keine Freundschaftsanfragen.';
t['view profile'] = 'Zeige Profil';
t['Send E-Mail to Another User'] = 'E-Mail an anderen Benutzer senden';
r[' of 5000'] = ' von 5000';

t['View'] = 'Zeigen';
t['Upload Another Image'] = 'Weiteres Bild hochladen';
t['Edit This Image'] = 'Bild ändern';
t['Additional Images'] = 'Zusätzliche Bilder';
t['Upload Image'] = 'Bild hochladen';
b['Edit Log'] = 'Log bearbeiten';
b['Delete Log'] = 'Log löschen';
b['Upload'] = 'Hochladen';
//es fehlen noch...

//Erweiterte Suche,
//Create/Edit a Route
//Find User Routes Near Your Trip
//Lesezeichenlisten
//Instant Notification Service
//My Stat Bar
//Hide and Seek 

/*How does this work?
We respect the privacy of our users. As a result, we allow you the ability to email other accounts through online forms without exposing your email address. In order to reduce abuse, there are a limited number of emails you can send per session, and your IP address will be sent to the recipient along with your message. Commercial emails are not allowed through this tool. */


r['Results:'] = 'Ergebnisse:';
r['My Logs'] = 'Meine Logs:';
r['My Geocaching Details'] = 'Meine Geocaching-Details:';
r['You Own '] = 'Dein(e) eigenen ';
r[' Geocache Listing(s)'] = ' Geocache(s)';
r['Found'] = 'Gefunden';
r['By Username '] = 'Sortiert nach Besitzername ';
r['owned'] = 'Besitzer';
r['Owned'] = 'Besitzer';
r['Yesterday'] = 'Gestern';
r['Today'] = 'Heute';
r['days ago'] = 'Tage her';
t['by'] = 'von';
r['Finding a User '] = 'Finde einen Benutzer';
r['Emailing a User '] = 'E-Mail an Benutzer'; 
r['Lookup User'] = 'Suche Benutzer';
r['Enter a username to look up: '] = 'Gesuchten Benutzernamen eingeben: ';

//**********************************************************************************


// finde alle Textelemente auf der Seite
var textnodes = document.evaluate(
	"//text()",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null
);

// finde alle Buttons auf der Seite
var inputnodes = document.evaluate(
	"//input[@type='submit' or @type='button']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null
);

for (var i = 0; i < textnodes.snapshotLength; i++) {
	node = textnodes.snapshotItem(i);
	if (node.parentNode.tagName.toLowerCase() != "textarea")
	{
		en_str = node.data.normalize();
		de_str = t[en_str];
		
		if (de_str) {
			node.data = de_str;
		} else {
			for (key in r) {
				if (en_str.search(key) != -1) {
					var pattern = new RegExp(key, 'g');
					en_str = en_str.replace(pattern, r[key]);
				}
			}
			node.data = en_str;
		}
	}
}

for (var i = 0; i < inputnodes.snapshotLength; i++) {
	node = inputnodes.snapshotItem(i);
	de_str = b[node.value];
	
	if (de_str) {
		node.value = de_str;
	}
}
