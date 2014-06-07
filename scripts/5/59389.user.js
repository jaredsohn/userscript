// ==UserScript==
// @name           Streakmarker v1.3.37
// @description    Streakmarker v1.3.37 | Last update: version 44 according to spoilerpedia
// @version        1.3.37.9
// @include        http://forumwarz.com/domination/vanilla
// @include        http://*.forumwarz.com/domination/vanilla
// @include        http://*.forumwarz.com/bookmarks/by_type/forums
// @include        http://forumwarz.com/bookmarks/by_type/forums
// @include        http://*.forumwarz.com/bookmarks/community
// @include        http://forumwarz.com/bookmarks/community
// ==/UserScript==

$ = unsafeWindow['window'].$;
$$ = unsafeWindow['window'].$$;
$H = unsafeWindow['window'].$H;
Element = unsafeWindow['window'].Element;

var attackData = $H();
var sensitivityData = $H();
var attackNames = ["AD", "DV", "LS", "LN", "MO", "PL", "PS"];
var sensitivityNames = ["AG", "AN", "IN", "MI", "NA"];
var sensitivityModifiers = ["0", "50", "75", "100", "125", "150"];

function addForum(name, attacks, sensitivities) {
	attackData.set(name.toLowerCase().replace(/[^\w]/g,""), attacks);
	sensitivityData.set(name.toLowerCase().replace(/[^\w]/g,""), sensitivities);
}

addForum("2chin.org Fat Acceptance Forums",                    "???1???", "51342");
addForum("Affluence Anonymous",                                "????1??", "45231");
addForum("Alliance of the Apathetic",                          "???????", "33333");
addForum("Amish Gone Wilde",                                   "???????", "41523");
addForum("Anarchist's Playbook",                               "???????", "33333");
addForum("ASCII Artists' Alcove",                              "??1????", "34512");
addForum("AskThieves",                                         "???????", "24333");
addForum("Atheists' Heaven",                                   "??1????", "35214");
addForum("Baby Swap",                                          "???????", "31245");
addForum("Battlethreadz ThreadConstructr v3.0 Gamma",          "???11??", "13452");
addForum("Cam on My Face",                                     "???????", "52341");
addForum("Cellmates",                                          "???????", "13452");
addForum("Childhood Trauma Forgettance Forum",                 "???????", "33333");
addForum("Church of Saiyantology",                             "????1??", "34251");
addForum("Coral Springs Nuclear Generating Station ",          "???????", "24243");
addForum("Cosplay Central",                                    "?????1?", "04521");
addForum("Craigslust.com",                                     "??????1", "53241");
addForum("CuddleNet",                                          "????1??", "35241");
addForum("CyberChondriacs",                                    "???????", "42153");
addForum("DENSA Low IQ Society",                               "????11?", "42105");
addForum("Denture Chat",                                       "???????", "33333");
addForum("DeviousArtists",                                     "???????", "33333");
addForum("Dolphin Love",                                       "??1?1??", "41253");
addForum("Doprah's Book Cult",                                 "?????1?", "52104");
addForum("Dr. Jojo's Plastic Surgery Stronghold",              "???????", "33333");
addForum("Dykea",                                              "???????", "40251");
addForum("Ebony Jaguars",                                      "1??????", "14325");
addForum("EmoSapiens",                                         "???????", "35412");
addForum("Engrish Ressons",                                    "???????", "02145");
addForum("Everything Sucks Now",                               "???????", "34215");
addForum("Extremist Survivalist",                              "???????", "25314");
addForum("Fakebook",                                           "??1????", "32451");
addForum("Fanfiction Freaks",                                  "???????", "41325");
addForum("FapQuest",                                           "???????", "21543");
addForum("Fashion Fascists",                                   "???????", "33333");
addForum("Fathers Against Pornography",                        "???????", "23442");
addForum("Faux News",                                          "???????", "23244");
addForum("Fitness Faggotry",                                   "???????", "33333");
addForum("Forum for the Blind",                                "????1??", "42105");
addForum("Fran is Fat",                                        "??1????", "13542");
addForum("GameFAGS",                                           "???????", "32424");
addForum("Gays in Recovery",                                   "1??????", "35241");
addForum("Geronimo! Official Forums",                          "1??????", "13524");
addForum("Girls Advocating Sexual Purity",                     "????1??", "52341");
addForum("God Hates Facts",                                    "??1?1??", "15324");
addForum("Grammar Nazis",                                      "???????", "24423");
addForum("Great Firewall of China",                            "???????", "20415");
addForum("Hall of Faded Fame",                                 "????1??", "54201");
addForum("HAY DID U SEE THIZ???",                              "???????", "25134");
addForum("Headbanger's Hellhole...of Death",                   "???????", "23442");
addForum("Hear 'em Roar!",                                     "?1?????", "23415");
addForum("Home of Male Objectors",                             "??1????", "12435");
addForum("Homeless Depot",                                     "??1?1??", "52143");
addForum("Homicide Girls",                                     "???????", "14352");
addForum("HowStuffBreaks",                                     "???????", "23424");
addForum("Infomercial Enthusiasts (As Seen on This Forum!)",   "???????", "33333");
addForum("Internet Confessional",                              "??????1", "42135");
addForum("Internet Movie DoucheBags",                          "????1??", "12435");
addForum("JewGrounds",                                         "??1????", "53421");
addForum("Konservative Kristian Koalition",                    "???????", "33333");
addForum("Li'l Pony Groomers",                                 "???????", "53142");
addForum("Li'l Pony Groomers: Kids Only!",                     "???????", "33333");
addForum("Mad Scientists",                                     "???????", "51423");
addForum("MathBlasters",                                       "???????", "33333");
addForum("MemeBusters",                                        "???1???", "25134");
addForum("MY RIFLE IS THIS BIG",                               "???????", "15342");
addForum("National Geographic Sexplorers",                     "??1?1??", "41250");
addForum("Obscure Phobia Support Boards",                      "????1??", "31524");
addForum("Paranoid Panorama",                                  "???11??", "24315");
addForum("Paranoid Panorama: ROTM",                            "?????1?", "33333");
addForum("Plagiaristic Intentions",                            "???????", "33333");
addForum("Post-Apocalyptic Survival Society",                  "???????", "33333");
addForum("PrayPal",                                            "???????", "32145");
addForum("PUA Playpen",                                        "????1??", "32541");
addForum("Pushy Parents",                                      "???????", "24234");
addForum("R.P.Genius",                                         "1??????", "34422");
addForum("Rageaholics' Angry Web-Resource (RAWR)",             "????1??", "15432");
addForum("RAtM: Rage Against the Moderators",                  "???????", "24324");
addForum("ReincarNation",                                      "???????", "43242");
addForum("Rice, Rice, Baby",                                   "???????", "33333");
addForum("Rule Thirty-Fourum",                                 "???11??", "41325");
addForum("S.P.C.A",                                            "????1?1", "32154");
addForum("Sanctuary for Social Network Rejects",               "???????", "51423");
addForum("Schadenfreude.cx",                                   "???????", "14523");
addForum("Second Wife",                                        "????11?", "52401");
addForum("Sensuous Seamen",                                    "???????", "34242");
addForum("Serial Killer Friendship Network",                   "???????", "12435");
addForum("SexTeen",                                            "???????", "35142");
addForum("Society For Creative Historical Revisionism",        "???????", "33333");
addForum("Society for the Preservation of Aging Memes (SPAM)", "??1????", "23154");
addForum("Something Lawful",                                   "???????", "12534");
addForum("South Carolina Marine Fisheries Forum",              "???????", "42243");
addForum("Stalker Central",                                    "??1?1??", "41352");
addForum("Suburban Gangsta Paradise",                          "????1??", "15204");
addForum("SUPER SECRET PENTAGON FORUM!!!",                     "??1?1?1", "24135");
addForum("Teen Mommies",                                       "??1?1??", "45132");
addForum("Terra Online",                                       "????1??", "31542");
addForum("Text-Based Warriors' Guild",                         "????1??", "51324");
addForum("That's a Lot of Feces!",                             "1??????", "22443");
addForum("The Extremely Specific Fetish Emporium",             "????1??", "01425");
addForum("The Furry Farm",                                     "???????", "43422");
addForum("The Hitchhiker's Guide to the Internet",             "???????", "33333");
addForum("The Multiple Personality Order",                     "???????", "35241");
addForum("The Museum of Human Stupidity",                      "???????", "33333");
addForum("The Soft Hyphen",                                    "???????", "42315");
addForum("The Sweaty HandBook for Virgins",                    "???????", "33333");
addForum("The Teachings of Goa-Tse",                           "???1???", "52134");
addForum("The Urbane Dictionary",                              "???????", "33333");
addForum("Traditional Childrearing Forums",                    "????1??", "15324");
addForum("TravelAnimosity",                                    "???1???", "24135");
addForum("Trident Media",                                      "???????", "35412");
addForum("Trident Media: Theremin Edition",                    "???????", "35412");
addForum("Vengeance United",                                   "???????", "41520");
addForum("Veterans of Foreign Whores",                         "????1?1", "45231");
addForum("Video Game Cheaters",                                "???????", "21405");
addForum("Wahoo Answers",                                      "???1??1", "42135");
addForum("Wal-Martyr",                                         "????1??", "15024");
addForum("Web 1.0 Veterans",                                   "???????", "34323");
addForum("Who Would Jesus Do?",                                "???????", "33333");
addForum("Wiccapedia",                                         "????1??", "51423");
addForum("Woe is Us",                                          "???????", "44223");
addForum("World of Whorecraft",                                "???????", "51243");
addForum("YouBoob",                                            "???????", "34251");
addForum("Zombie Armageddon",                                  "???????", "25014");

function processStreak(text, dom) {
	var tables = $$("table.highlighting");
	var isVanillaPage = document.title.indexOf("Domination") >= 0;
	var tagName = isVanillaPage ? "td" : "a";
	for (var table in tables) {
		var forums = tables[table].getElementsByTagName(tagName);
		var rtext = text.responseText.toLowerCase().replace(/[^\w]/g,"");
		for (var forum in forums) {
			var theForum = forums[forum];
			if (!check(theForum)) continue;
			var forumHTML = theForum.innerHTML.toLowerCase().replace(/[^\w]/g,"");
			var attacks = attackData.get(forumHTML);
			if (attacks) markAttacks(theForum, attacks);
			var sensitivities = sensitivityData.get(forumHTML);
			if (sensitivities) markSensitivities(theForum, sensitivities);
			if (rtext.indexOf(forumHTML) < 0) continue;
			forums[forum].setAttribute("style","color: #aaa");
		}
	}
}

function check(forum) {
	if (!forum.innerHTML) return false;
	var forumHTML = forum.innerHTML;
	if (forumHTML.indexOf("<") != -1) return false;
	if (forumHTML.indexOf("expand details") >= 0) return false;
	if (forumHTML.indexOf("hide details") >= 0) return false;
	if (forumHTML.match(/^[0-9]+$/g)) return false;
	if (forumHTML.match(/[0-9]+[dhm] ago/g)) return false;
	if (forum.tagName.toLowerCase() == "a") {
		if (forum.href.indexOf("profiles") >= 0) return false;
		if (forum.href.indexOf("klans/profile") >= 0) return false;
	}
	return true;
}

function markAttacks(forum, attacks) {
	var text = "";
	for (var i = 0; i < attackNames.length; i++)
		if (attacks.charAt(i) == '1')
			text += " " + attackNames[i];
	append(forum, text, "red");
}

function markSensitivities(forum, sensitivities) {
	var text = "";
	for (var i = 0; i < sensitivityNames.length; i++) {
		if (sensitivities.charAt(i) != '?')
			text += " " + sensitivityModifiers[sensitivities.charCodeAt(i) - 48];
		else
			text += " ?";
	}
	append(forum, text, "green");
}

function append(forum, text, color) {
	var element = Element("span", { "style": "margin: 0 0 0 1em; color: " + color }).update(text);
	if (forum.tagName.toLowerCase() == "a")
		forum.parentNode.insert({ "bottom" : element });
	else
		forum.insert({ "bottom" : element });
}

function addMarkers() {

	GM_xmlhttpRequest({
		method: "GET",
		url: "http://" + location.host + "/bookmarks/streak",
		onload: function(responseDetails) {
			processStreak(responseDetails);
		}
	});

}


if (document.title.indexOf("Domination") != -1) {
	window.addEventListener("load", function (e) {addMarkers();}, "false");
} else {
	addMarkers();
}
