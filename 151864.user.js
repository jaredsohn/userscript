// ==UserScript==
// @name          KOL - Chat - Label Mods
// @namespace     http://userstyles.org
// @description	  Labels the Mods in chat, and puts their name in the warnings and bans
// @author        Amanda Kerik - Remix By Marm
// @homepage      http://userscripts.org/scripts/show/61075
// @include       http://127.0.0.1*
// @include       http://*kingdomofloathing.com/*
// ==/UserScript==
var css2632 = '/* A */' +
'/* Y */' +
'a[href="showplayer.php?who=119474"]:before, ' +
'a[href="showplayer.php?who=115209"]:before, ' +
'a[href="showplayer.php?who=2203414"]:before, ' +
'a[href="showplayer.php?who=248139"]:before, ' +
'a[href="showplayer.php?who=273550"]:before, ' +
'a[href="showplayer.php?who=180553"]:before, ' +
'a[href="showplayer.php?who=846288"]:before, ' +
'a[href="showplayer.php?who=2070786"]:before, ' +
'a[href="showplayer.php?who=1451506"]:before, ' +
'a[href="showplayer.php?who=174215"]:before, ' +
'a[href="showplayer.php?who=1436764"]:before, ' +
'a[href="showplayer.php?who=1633193"]:before, ' +
'a[href="showplayer.php?who=599619"]:before, ' +
'a[href="showplayer.php?who=1904553"]:before, ' +
'a[href="showplayer.php?who=840337"]:before, ' +
'a[href="showplayer.php?who=815560"]:before, ' +
'a[href="showplayer.php?who=1124668"]:before, ' +
'a[href="showplayer.php?who=425819"]:before, ' +
'a[href="showplayer.php?who=187512"]:before, ' +
'a[href="showplayer.php?who=213758"]:before, ' +
'a[href="showplayer.php?who=585112"]:before, ' +
'a[href="showplayer.php?who=2025543"]:before, ' +
'a[href="showplayer.php?who=321292"]:before, ' +
'a[href="showplayer.php?who=122332"]:before, ' +
'a[href="showplayer.php?who=293932"]:before, ' +
'a[href="showplayer.php?who=124537"]:before, ' +
'a[href="showplayer.php?who=115076"]:before, ' +
'a[href="showplayer.php?who=384532"]:before, ' +
'a[href="showplayer.php?who=1485558"]:before, ' +
'a[href="showplayer.php?who=459384"]:before, ' +
'a[href="showplayer.php?who=216194"]:before, ' +
'a[href="showplayer.php?who=59035"]:before, ' +
'a[href="showplayer.php?who=72767"]:before, ' +
'a[href="showplayer.php?who=244846"]:before, ' +
'a[href="showplayer.php?who=647042"]:before, ' +
'a[href="showplayer.php?who=996875"]:before, ' +
'a[href="showplayer.php?who=1908929"]:before, ' +
'a[href="showplayer.php?who=1690043"]:before, ' +
'a[href="showplayer.php?who=1335002"]:before, ' +
'a[href="showplayer.php?who=377922"]:before, ' +
'a[href="showplayer.php?who=32917"]:before, ' +
'a[href="showplayer.php?who=343026"]:before, ' +
'a[href="showplayer.php?who=643674"]:before, ' +
'a[href="showplayer.php?who=92832"]:before, ' +
'a[href="showplayer.php?who=1502692"]:before, ' +
'a[href="showplayer.php?who=845708"]:before, ' +
'a[href="showplayer.php?who=310335"]:before, ' +
'a[href="showplayer.php?who=1489518"]:before, ' +
'a[href="showplayer.php?who=615067"]:before, ' +
'a[href="showplayer.php?who=247309"]:before, ' +
'a[href="showplayer.php?who=33679"]:before, ' +
'a[href="showplayer.php?who=33237"]:before, ' +
'a[href="showplayer.php?who=1443477"]:before, ' +
'a[href="showplayer.php?who=114524"]:before, ' +
'a[href="showplayer.php?who=1720980"]:before, ' +
'a[href="showplayer.php?who=438429"]:before, ' +
'a[href="showplayer.php?who=1272979"]:before, ' +
'a[href="showplayer.php?who=114754"]:before, ' +
'a[href="showplayer.php?who=87945"]:before, ' +
'a[href="showplayer.php?who=735603"]:before, ' +
'a[href="showplayer.php?who=695393"]:before, ' +
'a[href="showplayer.php?who=34061"]:before, ' +
'a[href="showplayer.php?who=21163"]:before, ' +
'a[href="showplayer.php?who=621799"]:before, ' +
'/* Z */' +
'a[href="showplayer.php?who=91599"]:before' +
'{content: " (Mod) " !important; font-weight: bold !important; color: #c00 !important;}' +
'#ChatWindow font b a:before, #ChatWindow font b a:before, #ChatWindow b + i a:before {content: "" !important;}' 

+
'/* ------------ */' +
'/* Y */' +
'font b a[href="showplayer.php?who=119474"] font:after {content: " (adwriter)" !important;}' +
'font b a[href="showplayer.php?who=115209"] font:after {content: " (Alecat)" !important;}' +
'font b a[href="showplayer.php?who=2203414"] font:after {content: " (AnnieLou)" !important;}' +
'font b a[href="showplayer.php?who=248139"] font:after {content: " (Astaeroth)" !important;}' +
'font b a[href="showplayer.php?who=273550"] font:after {content: " (Bete)" !important;}' +
'font b a[href="showplayer.php?who=180553"] font:after {content: " (Bete Noire)" !important;}' +
'font b a[href="showplayer.php?who=846288"] font:after {content: " (BigdaddyBoB)" !important;}' +
'font b a[href="showplayer.php?who=2070786"] font:after {content: " (BillyGoatGruff)" !important;}' +
'font b a[href="showplayer.php?who=1451506"] font:after {content: " (Bjornhilde)" !important;}' +
'font b a[href="showplayer.php?who=174215"] font:after {content: " (bluespacething)" !important;}' +
'font b a[href="showplayer.php?who=1436764"] font:after {content: " (BSMOLONEY)" !important;}' +
'font b a[href="showplayer.php?who=1633193"] font:after {content: " (caelea)" !important;}' +
'font b a[href="showplayer.php?who=599619"] font:after {content: " (CDMoyer)" !important;}' +
'font b a[href="showplayer.php?who=1904553"] font:after {content: " (Ceiling Cat)" !important;}' +
'font b a[href="showplayer.php?who=840337"] font:after {content: " (cowmanbob)" !important;}' +
'font b a[href="showplayer.php?who=815560"] font:after {content: " (DanBob)" !important;}' +
'font b a[href="showplayer.php?who=1124668"] font:after {content: " (Deezy)" !important;}' +
'font b a[href="showplayer.php?who=425819"] font:after {content: " (Dr_Oblvious)" !important;}' +
'font b a[href="showplayer.php?who=187512"] font:after {content: " (Elektra)" !important;}' +
'font b a[href="showplayer.php?who=213758"] font:after {content: " (Elektras Doppelganger)" !important;}' +
'font b a[href="showplayer.php?who=585112"] font:after {content: " (Emhgee)" !important;}' +
'font b a[href="showplayer.php?who=2025543"] font:after {content: " (Emhgee Personal Shopper)" !important;}' +
'font b a[href="showplayer.php?who=321292"] font:after {content: " (ercassendil)" !important;}' +
'font b a[href="showplayer.php?who=122332"] font:after {content: " (Fnord7)" !important;}' +
'font b a[href="showplayer.php?who=293932"] font:after {content: " (Frenchy McFrench)" !important;}' +
'font b a[href="showplayer.php?who=124537"] font:after {content: " (Fujiko)" !important;}' +
'font b a[href="showplayer.php?who=115076"] font:after {content: " (Fusilliban)" !important;}' +
'font b a[href="showplayer.php?who=384532"] font:after {content: " (Gemelli)" !important;}' +
'font b a[href="showplayer.php?who=1485558"] font:after {content: " (GorkaCatHerder)" !important;}' +
'font b a[href="showplayer.php?who=459384"] font:after {content: " (GrokTheMad)" !important;}' +
'font b a[href="showplayer.php?who=216194"] font:after {content: " (holderofsecrets)" !important;}' +
'font b a[href="showplayer.php?who=59035"] font:after {content: " (HotStuff)" !important;}' +
'font b a[href="showplayer.php?who=72767"] font:after {content: " (Imp y Clelyn)" !important;}' +
'font b a[href="showplayer.php?who=244846"] font:after {content: " (IronChefIrish)" !important;}' +
'font b a[href="showplayer.php?who=647042"] font:after {content: " (JayRandom)" !important;}' +
'font b a[href="showplayer.php?who=996875"] font:after {content: " (justinaRMS)" !important;}' +
'font b a[href="showplayer.php?who=1908929"] font:after {content: " (justinthestore)" !important;}' +
'font b a[href="showplayer.php?who=1690043"] font:after {content: " (LadyMarmalicious)" !important;}' +
'font b a[href="showplayer.php?who=1335002"] font:after {content: " (Lynnox)" !important;}' +
'font b a[href="showplayer.php?who=377922"] font:after {content: " (Marm)" !important;}' +
'font b a[href="showplayer.php?who=32917"] font:after {content: " (Marshall)" !important;}' +
'font b a[href="showplayer.php?who=343026"] font:after {content: " (Mighty Quincy)" !important;}' +
'font b a[href="showplayer.php?who=643674"] font:after {content: " (Mikei)" !important;}' +
'font b a[href="showplayer.php?who=92832"] font:after {content: " (Mikel)" !important;}' +
'font b a[href="showplayer.php?who=1502692"] font:after {content: " (mirella)" !important;}' +
'font b a[href="showplayer.php?who=845708"] font:after {content: " (Mistress of the Obvious)" !important;}' +
'font b a[href="showplayer.php?who=310335"] font:after {content: " (Moonshae)" !important;}' +
'font b a[href="showplayer.php?who=1489518"] font:after {content: " (MotO)" !important;}' +
'font b a[href="showplayer.php?who=615067"] font:after {content: " (Nuurgle)" !important;}' +
'font b a[href="showplayer.php?who=247309"] font:after {content: " (One Winged Goose)" !important;}' +
'font b a[href="showplayer.php?who=33679"] font:after {content: " (Orbrisa)" !important;}' +
'font b a[href="showplayer.php?who=33237"] font:after {content: " (Scyld)" !important;}' +
'font b a[href="showplayer.php?who=1443477"] font:after {content: " (shkspr)" !important;}' +
'font b a[href="showplayer.php?who=114524"] font:after {content: " (Shoing)" !important;}' +
'font b a[href="showplayer.php?who=1720980"] font:after {content: " (Simatree)" !important;}' +
'font b a[href="showplayer.php?who=438429"] font:after {content: " (smkydz)" !important;}' +
'font b a[href="showplayer.php?who=1272979"] font:after {content: " (Sparkly Coins)" !important;}' +
'font b a[href="showplayer.php?who=114754"] font:after {content: " (Thisguy)" !important;}' +
'font b a[href="showplayer.php?who=87945"] font:after {content: " (Thok)" !important;}' +
'font b a[href="showplayer.php?who=735603"] font:after {content: " (triSuit)" !important;}' +
'font b a[href="showplayer.php?who=695393"] font:after {content: " (Turbulent Squirrel)" !important;}' +
'font b a[href="showplayer.php?who=34061"] font:after {content: " (warebar)" !important;}' +
'font b a[href="showplayer.php?who=21163"] font:after {content: " (Werebear)" !important;}' +
'font b a[href="showplayer.php?who=621799"] font:after {content: " (WhyMan)" !important;}' +


'/* Z */' +
'font b a[href="showplayer.php?who=91599"] font:after {content: " (Yodo)" !important;}' +
'font[color="blue"] b a font[color="blue"]:after {content: "" !important;}';
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css2632);
} else if (typeof addStyle != "undefined") {
	addStyle(css2632);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css2632));
		heads[0].appendChild(node); 
	}
}