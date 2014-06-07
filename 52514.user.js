// ==UserScript==
// @name           Streak Marker
// @description    Streakmarker v1.3.37 | Last update: version 209 of the spoilerpedia page
// @version        1.3.37.35
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

function addForum(name, id, attacks, sensitivities) {
	attackData.set(name.toLowerCase().replace(/[^\w]/g,""), attacks);
	sensitivityData.set(name.toLowerCase().replace(/[^\w]/g,""), sensitivities);
}

addForum("-=FLAMING BLACK OPS HQ=-",                           185, "?????11", "15243");
addForum("2chin.org Fat Acceptance Forums",                     34, "???1???", "51342");
addForum("60 Secondmen",                                       199, "???????", "12345");
addForum("7/11 Truth Movement",                                261, "1??????", "32343");
addForum("Affluence Anonymous",                                133, "????1??", "45231");
addForum("All Aboot Canadia",                                  197, "??????1", "25143");
addForum("All Western Medicine is Bullshit",                   195, "????1?1", "35421");
addForum("All Western Medicine is Bullshit: LOLkemia",         211, "?????1?", "42153");
addForum("Alliance of the Apathetic",                          232, "???????", "33333");
addForum("Amish Gone Wilde",                                    30, "???????", "41523");
addForum("Anarchist's Playbook",                               126, "???????", "33333");
addForum("Animal Double-Crossing",                             263, "???1??1", "51423");
addForum("Animal Gladiators",                                  241, "????1??", "45312");
addForum("Anonymous Anonymous",                                283, "???????", "23334");
addForum("ASCII Artists' Alcove",                              228, "??1????", "34512");
addForum("AskThieves",                                         235, "1??????", "24333");
addForum("Atheists' Heaven",                                   156, "??1????", "35214");
addForum("Baby Swap",                                          164, "???????", "31245");
addForum("Battlethreadz Lamebait",                             234, "??????1", "23415");
addForum("Battlethreadz ThreadConstructr v3.0 Gamma",           63, "???11??", "13452");
addForum("Board Game Addicts",                                 254, "???????", "42015");
addForum("BourbonDictionary",                                  253, "???????", "25401");
addForum("Bud Buddies",                                        278, "???1???", "21345");
addForum("Cam on My Face",                                      49, "???????", "52341");
addForum("CatRoulette",                                        270, "??1????", "14325");
addForum("Cellmates",                                          130, "???????", "13452");
addForum("Childhood Trauma Forgettance Forum",                 168, "???????", "33333");
addForum("Church of Saiyantology",                              95, "????1??", "34251");
addForum("Coffee-Shop Authors' Guild",                         276, "????1??", "31524");
addForum("Collector's Guild",                                  256, "???????", "25104");
addForum("Committee of Compulsive Habits",                     246, "???????", "14250");
addForum("Cooking With Cannibals",                             244, "????1??", "51324");
addForum("Coral Springs Nuclear Generating Station",            46, "???????", "24243");
addForum("Cosplay Central",                                    150, "?????1?", "04521");
addForum("Craigslust.com",                                     141, "??????1", "53241");
addForum("CuddleNet",                                          106, "????1??", "35241");
addForum("CyberChondriacs",                                     26, "???????", "42153");
addForum("DENSA Low IQ Society",                               155, "????11?", "42105");
addForum("Denture Chat",                                         1, "???????", "33333");
addForum("DeviousArtists",                                      98, "???????", "33333");
addForum("DinkDonkDoink.org SteamBoards",                      190, "????1??", "31452");
addForum("Distinguished Extinctionists' Animal Revival Club",  285, "????1??", "51342");
addForum("Doctors Without Limits",                             265, "???????", "21540");
addForum("Dolphin Love",                                       117, "??1?1??", "41253");
addForum("Doprah's Book Cult",                                 176, "?????1?", "52104");
addForum("Dr. Jojo's Plastic Surgery Stronghold",                7, "???????", "33333");
addForum("Dungeons & Dragpipes",                               281, "???????", "41523");
addForum("Dykea",                                              144, "???????", "40251");
addForum("Ebony Jaguars",                                      107, "1??????", "14325");
addForum("Emaciation Nation",                                  208, "????11?", "51324");
addForum("EmoSapiens",                                         111, "???????", "35412");
addForum("Engrish Ressons",                                    158, "???????", "02145");
addForum("Engrish Ressons: Huddled Asses ",                    213, "????11?", "52314");
addForum("Everything Sucks Now",                               146, "???????", "34215");
addForum("Extremist Survivalist",                              170, "???????", "25314");
addForum("Fakebook",                                           149, "??1????", "32451");
addForum("Fanfiction Freaks",                                   91, "???????", "41325");
addForum("FapFiction.Net",                                     289, "???????", "24351");
addForum("FapQuest",                                           147, "???????", "21543");
addForum("Farmageddon",                                        243, "?????1?", "42531");
addForum("Fashion Fascists",                                   236, "???????", "33333");
addForum("Fathers Against Pornography",                         97, "???????", "23442");
addForum("Faux News",                                          120, "???????", "23244");
addForum("Fitness Faggotry",                                    14, "???????", "33333");
addForum("Forum for the Blind",                                172, "????1??", "42105");
addForum("Fran is Fat",                                        233, "??1????", "13542");
addForum("FuckMyWife",                                         202, "????1?1", "41352");
addForum("GameFAGS",                                            87, "???????", "32424");
addForum("garbagebagofsmokes.com",                             196, "????1?1", "45123");
addForum("Gays in Recovery",                                   110, "1??????", "35241");
addForum("Geronimo! Official Forums",                           52, "1??????", "13524");
addForum("Geronimo! Official Forums 2: Die Harder",            245, "???????", "24513");
addForum("Gilded Pocket Country Club",                         203, "??????1", "12354");
addForum("Girls Advocating Sexual Purity",                     122, "????1??", "52341");
addForum("God Hates Facts",                                    100, "??1?1??", "15324");
addForum("Grammar Nazis",                                      161, "???????", "24423");
addForum("Great Firewall of China",                            118, "???????", "20415");
addForum("Hail Britannia!",                                    205, "????1?1", "31452");
addForum("Hall of Faded Fame",                                 134, "????1??", "54201");
addForum("HAY DID U SEE THIZ???",                              112, "???????", "25134");
addForum("Headbanger's Hellhole...of Death",                    29, "???????", "23442");
addForum("Hear 'em Roar!",                                     108, "?1?????", "23415");
addForum("Home of Male Objectors",                              94, "??1????", "12435");
addForum("Homeless Depot",                                     175, "??1?1??", "52143");
addForum("Homicide Girls",                                     113, "???????", "14352");
addForum("HowStuffBreaks",                                     102, "???????", "23424");
addForum("Human Ziggurat of the Cosmic Center",                207, "????111", "13245");
addForum("Infomercial Enthusiasts (As Seen on This Forum!)",   171, "???????", "33333");
addForum("International Earth Destruction Advisory Board",     240, "???????", "43521");
addForum("Internet Confessional",                              135, "??????1", "42135");
addForum("Internet Movie DoucheBags",                          119, "????1??", "12435");
addForum("JewGrounds",                                         154, "??1????", "53421");
addForum("JewRaffeBots.gi Conspiracy Board",                   187, "???????", "14532");
addForum("Keyboard Critics",                                   288, "???????", "34215");
addForum("Konservative Kristian Koalition",                     20, "???????", "33333");
addForum("Large Hadron Collider Maintenance Wiki",             268, "???????", "53421");
addForum("League of Amateur Action Heroes",                    242, "???????", "43332");
addForum("LeninParty.org",                                     193, "????1??", "15342");
addForum("Li'l Pony Groomers",                                 109, "???????", "53142");
addForum("Li'l Pony Groomers: Kids Only!",                     132, "???????", "33333");
addForum("Like, It's a Valley-Girl Board!",                    260, "???????", "34251");
addForum("Mad Scientists",                                     131, "???????", "51423");
addForum("Mall Santas For Children",                           249, "1??????", "24153");
addForum("MathBlasters",                                       174, "???????", "33333");
addForum("MemeBusters",                                        103, "???1???", "25134");
addForum("Mental Faculties",                                   287, "???????", "33333");
addForum("Message Boards of Cthulhu",                          250, "????1??", "51243");
addForum("Modern Art Movement",                                257, "???????", "15240");
addForum("Mothers Trying to Understand these Interwebs",       248, "??1????", "21345");
addForum("Mt. Olympus: The Forum of The Gods",                 274, "???????", "33333");
addForum("MY RIFLE IS THIS BIG",                               105, "???????", "15342");
addForum("National Geographic Sexplorers",                     169, "??1?1??", "41250");
addForum("NerrrdyGrrrlz",                                      266, "???????", "34233");
addForum("Netbangaz Online",                                   198, "????1?1", "14532");
addForum("Nientendö Official Forums",                          239, "???????", "43323");
addForum("NitWitter",                                          259, "??1????", "31425");
addForum("Obscure Phobia Support Boards",                      123, "????1??", "31524");
addForum("Overcockers",                                        201, "????11?", "12534");
addForum("Outside",                                            237, "???????", "33333");
addForum("Paranoid Panorama",                                   93, "???11??", "24315");
addForum("Paranoid Panorama: ROTM",                             48, "?????1?", "33333");
addForum("Parents Internet Resource Council",                  272, "???????", "45231");
addForum("People for the Ethical Treatment of Vegetables",     238, "???????", "33333");
addForum("PermaDamned",                                        182, "???????", "23154");
addForum("Plagiaristic Intentions",                            129, "???????", "33333");
addForum("PlentyOfWish.com",                                   282, "???????", "33324");
addForum("Post-Apocalyptic Survival Society",                  231, "???11??", "21453");
addForum("Practical Genetic Engineering",                      258, "???????", "13425");
addForum("PrayPal",                                            115, "???????", "32145");
addForum("Psych Yourself Out",                                 192, "??????1", "13425");
addForum("PUA Playpen",                                         59, "????1??", "32541");
addForum("Pushy Parents",                                      177, "???????", "24234");
addForum("Pyro-MANIAX!",                                       210, "?????1?", "31245");
addForum("Pyramid Partnership",                                286, "???????", "33333");
addForum("R.P.Genius",                                          22, "1??????", "34422");
addForum("Rageaholics' Angry Web-Resource (RAWR)",             226, "????1??", "15432");
addForum("RAtM: Rage Against the Moderators",                  121, "???????", "24324");
addForum("ReincarNation",                                      139, "???????", "43242");
addForum("Rice, Rice, Baby",                                    15, "???????", "33333");
addForum("Ruin-A-Wish Foundation",                             189, "?????1?", "14532");
addForum("Rule Thirty-Fourum",                                 162, "???11??", "41325");
addForum("S.P.C.A",                                            140, "????1?1", "32154");
addForum("Salle de Bain du Vin",                               186, "???????", "21354");
addForum("Sanctuary for Social Network Rejects",               165, "???????", "51423");
addForum("Schadenfreude.cx",                                    51, "???????", "14523");
addForum("Second Wife",                                        114, "????11?", "52401");
addForum("Sensuous Seamen",                                    136, "???????", "34242");
addForum("Sentrillion Classified Codebase (BETA)",             188, "??????1", "24153");
addForum("Serial Killer Friendship Network",                   178, "???????", "12435");
addForum("SexTeen",                                            152, "???????", "35142");
addForum("Sex-Toy Story",                                      280, "??1?1??", "25143");
addForum("Society For Creative Historical Revisionism",        148, "???????", "33333");
addForum("Society for the Preservation of Aging Memes (SPAM)", 167, "??1????", "23154");
addForum("SomeOfMyBestFriends.com",                            194, "????1?1", "53142");
addForum("Something Lawful",                                   116, "???????", "12534");
addForum("South Carolina Marine Fisheries Forum",               44, "???????", "42243");
addForum("Stalker Central",                                    160, "??1?1??", "41352");
addForum("StudentHumor",                                       277, "???????", "33423");
addForum("Suburban Gangsta Paradise",                           92, "????1??", "15204");
addForum("Sugarcandy Mountain",                                181, "????1??", "23514");
addForum("Suicide Prevention Hotline Forums",                  247, "??1?1??", "02145");
addForum("SUPER SECRET PENTAGON FORUM!!!",                      47, "??1?1?1", "24135");
addForum("Teen Mommies",                                       124, "??1?1??", "45132");
addForum("Terra Online",                                        88, "????1??", "31542");
addForum("Text-Based Warriors' Guild",                         173, "????1??", "51324");
addForum("That 70's Forum",                                    251, "??1????", "12435");
addForum("That's a Lot of Feces!",                              13, "1??????", "22443");
addForum("The Extremely Specific Fetish Emporium",             151, "????1??", "01425");
addForum("The Furry Farm",                                       4, "???????", "43422");
addForum("The Great Beyond BBS",                               184, "???????", "13245");
addForum("The Hitchhiker's Guide to the Internet",             157, "???????", "33333");
addForum("The Hook",                                           209, "???????", "53214");
addForum("The Limboard",                                       183, "??1?1??", "51243");
addForum("The Multiple Personality Order",                     227, "???1???", "35241");
addForum("The Museum of Human Stupidity",                      216, "???????", "45231");
addForum("The Organic Lifestyle Forums",                       284, "???????", "53241");
addForum("The Ouija Board",                                    262, "???????", "43332");
addForum("The Soft Hyphen",                                      2, "???????", "42315");
addForum("The Sweaty HandBook for Virgins",                    163, "???????", "33333");
addForum("The Teachings of Goa-Tse",                           159, "???1???", "52134");
addForum("The Unbannables",                                    264, "???????", "54201");
addForum("The Urbane Dictionary",                               99, "???????", "33333");
addForum("ThickeHeads: The Alan Thicke Fan Club",              191, "????1?1", "34521");
addForum("This Is A Test Forum",                               267, "???????", "32154");
addForum("Time Travel and You",                                255, "??1????", "14235");
addForum("Traditional Childrearing Forums",                     56, "????1??", "15324");
addForum("Tragic: The Gathering",                              252, "???????", "45021");
addForum("TravelAnimosity",                                    179, "???1???", "24135");
addForum("Trident Media",                                      104, "???????", "35412");
addForum("Trident Media: Theremin Edition",                    128, "???????", "35412");
addForum("TVTripes.org",                                       273, "???????", "23343");
addForum("UndeadJournal",                                      279, "???????", "53241");
addForum("University of Useless Degrees",                      269, "???11??", "43152");
addForum("VanillaLand Vagina Fetish Forum",                    200, "????1??", "45213");
addForum("Vengeance United",                                   217, "???????", "41520");
addForum("Veterans of Foreign Whores",                         138, "????1?1", "45231");
addForum("Video Game Cheaters",                                166, "???????", "21405");
addForum("Wahoo Answers",                                      142, "???1??1", "42135");
addForum("Wal-Martyr",                                         153, "????1??", "15024");
addForum("Web 1.0 Veterans",                                   229, "???????", "34323");
addForum("Who Would Jesus Do?",                                180, "???????", "33333");
addForum("Wiccapedia",                                         101, "????1??", "51423");
addForum("Wide World of Webcomics",                            290, "???????", "33333");
addForum("Witness Defection Program",                          204, "????1?1", "42315");
addForum("Woe is Us",                                           36, "???????", "44223");
addForum("World of Whorecraft",                                143, "???????", "51243");
addForum("Worst Buy",                                          275, "???????", "33333");
addForum("YouBoob",                                             96, "???????", "34251");
addForum("Zombie Armageddon",                                   90, "???????", "25014");

function processStreak(text, dom) {
	var tables = $$("table.highlighting");
	var isVanillaPage = document.title.indexOf("Domination") >= 0;
	var tagName = isVanillaPage ? "td" : "a";
	for (var table in tables) {
		var forums = tables[table].getElementsByTagName(tagName);
		var rtext = text.responseText.toLowerCase().replace(/\u[0-9a-f]{4}/g, "").replace(/[\W]/g, "");
		for (var forum in forums) {
			var theForum = forums[forum];
			if (!check(theForum)) continue;
			var forumHTML = unescapeHTML(theForum.innerHTML.toLowerCase()).replace(/[\W]/g, "");
			var streak = rtext.indexOf(forumHTML) >= 0;
			var attacks = attackData.get(forumHTML);
			if (attacks) markAttacks(theForum, attacks, streak);
			var sensitivities = sensitivityData.get(forumHTML);
			if (sensitivities) markSensitivities(theForum, sensitivities, streak);
			if (!streak) continue;
			forums[forum].setAttribute("style", "color: #aaa");
			forums[forum].onclick = function () { return confirm("This forum is already in your streak! Do you still want to pwn it?"); };
		}
	}
}

function unescapeHTML(str) {
	var div = document.createElement('div');
	div.innerHTML = str;
	return div.innerText ? div.innerText : div.textContent;
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

function markAttacks(forum, attacks, streak) {
	var text = "";
	for (var i = 0; i < attackNames.length; i++)
		if (attacks.charAt(i) == '1')
			text += " " + attackNames[i];
	append(forum, text, streak ? "#aaa" : "red");
}

function markSensitivities(forum, sensitivities, streak) {
	var text = "";
	for (var i = 0; i < sensitivityNames.length; i++) {
		if (sensitivities.charAt(i) != '?')
			text += " " + sensitivityModifiers[sensitivities.charCodeAt(i) - 48];
		else
			text += " ?";
	}
	append(forum, text, streak ? "#aaa" : "green");
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
