// ==UserScript==
// @name           WeChall Helper Gold
// @namespace      quangntenemy
// @include        http://forumwarz.com/domination/vanilla
// @include        http://*.forumwarz.com/domination/vanilla
// ==/UserScript==

$ = unsafeWindow["window"].$;
$$ = unsafeWindow["window"].$$;

var regList = new Array();
var siteList = new Array();

function site (num, name, abbrev) {
  if (num == 0) return name;
  var newname = name.replace(/[^\w]+/gi, "-").toLowerCase();
  newname = num + "-" + newname;
  return "<a href=\"/forums/battle/" + newname + "\" target=\"_blank\">" + name + "</a> [" + abbrev + "]";
}

function addForum(regex, num, name, abbrev) {
  regList.push(regex);
  siteList.push(site(num, name, abbrev));
}

addForum(/Trident Media: Theremin Edition/gi, 0, "(Theremin)", "THEREMIN");
addForum(/Trident Media/gi, 104, "Trident Media", "MEDIA");
addForum(/\(Theremin\)/gi, 128, "Trident Media: Theremin Edition", "THEREMIN");
addForum(/Paranoid Panorama: ROTM/gi, 0, "(ROTM)", "PP");
addForum(/Paranoid Panorama/gi, 93, "Paranoid Panorama", "PP");
addForum(/\(ROTM\)/gi, 0, "Paranoid Panorama: ROTM", "ROTM");
addForum(/Li'l Pony Groomers: Kids Only!/gi, 0, "(Kids)", "PONIES");
addForum(/Li'l Pony Groomers/gi, 109, "Li'l Pony Groomers", "PEDOS");
addForum(/\(Kids\)/gi, 132, "Li'l Pony Groomers: Kids Only!", "PONIES");

addForum(/Denture Chat/gi, 1, "Denture Chat", "DENTURE");
addForum(/The Soft Hyphen/gi, 2, "The Soft Hyphen", "HACKER");
addForum(/The Furry Farm/gi, 4, "The Furry Farm", "FURRY");
addForum(/Dr. Jojo's Plastic Surgery Stronghold/gi, 7, "Dr. Jojo\'s Plastic Surgery Stronghold", "JOJO");
addForum(/That's a Lot of Feces!/gi, 13, "That\'s a Lot of Feces!", "FECES");
addForum(/Fitness Faggotry/gi, 14, "Fitness Faggotry", "FITFAGS");
addForum(/Rice, Rice, Baby/gi, 15, "Rice, Rice, Baby", "RICE");
addForum(/Konservative Kristian Koalition/gi, 20, "Konservative Kristian Koalition", "KKK");
addForum(/R.P.Genius/gi, 22, "R.P.Genius", "RPGEN");
addForum(/CyberChondriacs/gi, 26, "CyberChondriacs", "CYBER");
addForum(/Headbanger's Hellhole...of Death/gi, 29, "Headbanger\'s Hellhole...of Death", "HHOD");
addForum(/Amish Gone Wilde/gi, 30, "Amish Gone Wilde", "AMISH");
addForum(/2chin.org Fat Acceptance Forums/gi, 34, "2chin.org Fat Acceptance Forums", "CHINS");
addForum(/Woe is Us/gi, 36, "Woe is Us", "WOE");
addForum(/South Carolina Marine Fisheries Forum/gi, 44, "South Carolina Marine Fisheries Forum", "FISHES");
addForum(/Coral Springs Nuclear Generating Station/gi, 46, "Coral Springs Nuclear Generating Station", "NUKE");
addForum(/SUPER SECRET PENTAGON FORUM!!!/gi, 47, "SUPER SECRET PENTAGON FORUM!!!", "PENTAGON");
addForum(/Cam on my Face/gi, 49, "Cam on my Face", "CAMWHORE");
addForum(/Schadenfreude.cx/gi, 51, "Schadenfreude.cx", "TROLL");
addForum(/Geronimo! Official Forums/gi, 52, "Geronimo! Official Forums", "GERONIMO");
addForum(/Traditional Childrearing Forums/gi, 56, "Traditional Childrearing Forums", "KIDS");
addForum(/PUA Playpen/gi, 59, "PUA Playpen", "PUA");
addForum(/Battlethreadz ThreadConstructr v3.0 Gamma/gi, 63, "Battlethreadz ThreadConstructr v3.0 Gamma", "BATTLE");
addForum(/GameFAGS/gi, 87, "GameFAGS", "GFAGS");
addForum(/Terra Online/gi, 88, "Terra Online", "TERRA");
addForum(/Zombie Armageddon/gi, 90, "Zombie Armageddon", "ZOMBIE");
addForum(/Fanfiction Freaks/gi, 91, "Fanfiction Freaks", "FANFIC");
addForum(/Suburban Gangsta Paradise/gi, 92, "Suburban Gangsta Paradise", "SGP");
addForum(/Home of Male Objectors/gi, 94, "Home of Male Objectors", "HOMO");
addForum(/Church of Saiyantology/gi, 95, "Church of Saiyantology", "CHURCH");
addForum(/YouBoob/gi, 96, "YouBoob", "BOOB");
addForum(/Fathers Against Pornography/gi, 97, "Fathers Against Pornography", "FAP");
addForum(/DeviousArtists/gi, 98, "DeviousArtists", "DEVART");
addForum(/The Urbane Dictionary/gi, 99, "The Urbane Dictionary", "URBANE");
addForum(/God Hates Facts/gi, 100, "God Hates Facts", "FACTS");
addForum(/Wiccapedia/gi, 101, "Wiccapedia", "WICCA");
addForum(/HowStuffBreaks/gi, 102, "HowStuffBreaks", "BREAKS");
addForum(/MemeBusters/gi, 103, "MemeBusters", "MEME");
addForum(/MY RIFLE IS THIS BIG/gi, 105, "MY RIFLE IS THIS BIG", "RIFLE");
addForum(/CuddleNet/gi, 106, "CuddleNet", "CUDDLE");
addForum(/Ebony Jaguars/gi, 107, "Ebony Jaguars", "EBONY");
addForum(/Hear 'em Roar!/gi, 108, "Hear 'em Roar!", "ROAR");
addForum(/Gays in Recovery/gi, 110, "Gays in Recovery", "GAYS");
addForum(/EmoSapiens/gi, 111, "EmoSapiens", "EMO");
addForum(/HAY DID U SEE THIZ\?\?\?/gi, 112, "HAY DID U SEE THIZ???", "NOOB");
addForum(/Homicide Girls/gi, 113, "Homicide Girls", "GIRLS");
addForum(/Second Wife/gi, 114, "Second Wife", "WIFE");
addForum(/PrayPal/gi, 115, "PrayPal", "PRAY");
addForum(/Something Lawful/gi, 116, "Something Lawful", "LAW");
addForum(/Dolphin Love/gi, 117, "Dolphin Love", "LOVE");
addForum(/Great Firewall of China/gi, 118, "Great Firewall of China", "CHINA");
addForum(/Internet Movie DoucheBags/gi, 119, "Internet Movie DoucheBags", "IMDB");
addForum(/Faux News/gi, 120, "Faux News", "FAUX");
addForum(/RAtM: Rage Against the Moderators/gi, 121, "RAtM: Rage Against the Moderators", "MODS");
addForum(/Girls Advocating Sexual Purity/gi, 122, "Girls Advocating Sexual Purity", "GASP");
addForum(/Obscure Phobia Support Boards/gi, 123, "Obscure Phobia Support Boards", "PHOBIA");
addForum(/Teen Mommies/gi, 124, "Teen Mommies", "MOMS");
addForum(/Anarchist's Playbook/gi, 126, "Anarchist's Playbook", "APB");
addForum(/Plagiaristic Intentions/gi, 129, "Plagiaristic Intentions", "PI");
addForum(/Cellmates/gi, 130, "Cellmates", "CELL");
addForum(/Mad Scientists/gi, 131, "Mad Scientists", "MAD");
addForum(/Affluence Anonymous/gi, 133, "Affluence Anonymous", "AA");
addForum(/Hall of Faded Fame/gi, 134, "Hall of Faded Fame", "HOFF");
addForum(/Internet Confessional/gi, 135, "Internet Confessional", "IC");
addForum(/Sensuous Seamen/gi, 136, "Sensuous Seamen", "SEAMEN");
addForum(/Veterans of Foreign Whores/gi, 138, "Veterans of Foreign Whores", "VETS");
addForum(/ReincarNation/gi, 139, "ReincarNation", "NATION");
addForum(/S.P.C.A/gi, 140, "S.P.C.A", "SPCA");
addForum(/Craigslust.com/gi, 141, "Craigslust.com", "CRAIG");
addForum(/Wahoo Answers/gi, 142, "Wahoo Answers", "WAHOO");
addForum(/World of Whorecraft/gi, 143, "World of Whorecraft", "WOW");
addForum(/Dykea/gi, 144, "Dykea", "DYKEA");
addForum(/Everything Sucks Now/gi, 146, "Everything Sucks Now", "SUCKS");
addForum(/FapQuest/gi, 147, "FapQuest", "QUEST");
addForum(/Society For Creative Historical Revisionism/gi, 148, "Society For Creative Historical Revisionism", "SCHR");
addForum(/Fakebook/gi, 149, "Fakebook", "FAKE");
addForum(/Cosplay Central/gi, 150, "Cosplay Central", "CC");
addForum(/The Extremely Specific Fetish Emporium/gi, 151, "The Extremely Specific Fetish Emporium", "FETISH");
addForum(/SexTeen/gi, 152, "SexTeen", "SEX");
addForum(/Wal-Martyr/gi, 153, "Wal-Martyr", "WALMART");
addForum(/JewGrounds/gi, 154, "JewGrounds", "JEW");
addForum(/DENSA Low IQ Society/gi, 155, "DENSA Low IQ Society", "DENSA");
addForum(/Atheists' Heaven/gi, 156, "Atheists' Heaven", "ATHEIST");
addForum(/The Hitchhiker's Guide to the Internet/gi, 157, "The Hitchhiker's Guide to the Internet", "GUIDE");
addForum(/Engrish Ressons/gi, 158, "Engrish Ressons", "ENGRISH");
addForum(/The Teachings of Goa-Tse/gi, 159, "The Teachings of Goa-Tse", "GOATSE");
addForum(/Stalker Central/gi, 160, "Stalker Central", "STALKER");
addForum(/Grammar Nazis/gi, 161, "Grammar Nazis", "NAZI");
addForum(/Rule Thirty-Fourum/gi, 162, "Rule Thirty-Fourum", "R34");
addForum(/The Sweaty Handbook for Virgins/gi, 163, "The Sweaty Handbook for Virgins", "VIRGIN");
addForum(/Baby Swap/gi, 164, "Baby Swap", "SWAP");
addForum(/Sanctuary for Social Network Rejects/gi, 165, "Sanctuary for Social Network Rejects", "REJECT");
addForum(/Video Game Cheaters/gi, 166, "Video Game Cheaters", "VGC");
addForum(/Society for the Preservation of Aging Memes \(spam\)/gi, 167, "Society for the Preservation of Aging Memes (SPAM)", "SPAM");
addForum(/Childhood Trauma Forgettance Forum/gi, 168, "Childhood Trauma Forgettance Forum", "TRAUMA");
addForum(/National Geographic Sexplorers/gi, 169, "National Geographic Sexplorers", "SEX");
addForum(/Extremist Survivalist/gi, 170, "Extremist Survivalist", "EXTREME");
addForum(/Infomercial Enthusiasts \(As Seen on This Forum!\)/gi, 171, "Infomercial Enthusiasts (As Seen on This Forum!)", "INFORM");
addForum(/Forum for the Blind/gi, 172, "Forum for the Blind", "BLIND");
addForum(/Text-Based Warriors' Guild/gi, 173, "Text-Based Warriors' Guild", "WARRIORS");
addForum(/MathBlasters/gi, 174, "MathBlasters", "MATH");
addForum(/Homeless Depot/gi, 175, "Homeless Depot", "HOMELESS");


var thePage = $("domination").innerHTML.replace(/\n/gi, '');
var match = /Forums Pwned by Your Raid.+?<table.+?>.+?<\/table>/gi.exec(thePage);
if (match) {
  var theTable = match[0];
  var count = theTable.split (/tr><tr/).length - 1;
  thePage = thePage.replace(/Forums Pwned by Your Raid/, "Forums Pwned by Your Raid <span style='color: red'>(" + count + ")</span>");
}

for (var i = 0; i < regList.length; i++)
  thePage = thePage.replace(regList[i], siteList[i]);
$("domination").update(thePage);
