// ==UserScript==
// @name          KoL Chat Mod Labeling
// @description	  Label the Mods in chat, and put their name in the warnings and bans.
// @author        Journe
// @homepage      http://userscripts.org/scripts/show/61075
// @include       http://127.0.0.1*/*
// @include       http://*kingdomofloathing.com/*
// @exclude       http://images.kingdomofloathing.com/*
// @exclude       http://forums.kingdomofloathing.com/*
// ==/UserScript==
(function() {
var css2632 = '/* A */' +
'a[href="showplayer.php?who=119474"]:before, a[href="showplayer.php?who=206500"]:before, ' +
'a[href="showplayer.php?who=115209"]:before, a[href="showplayer.php?who=62474"]:before, ' +
'a[href="showplayer.php?who=234268"]:before, a[href="showplayer.php?who=224321"]:before, ' +
'/* B */' +
'a[href="showplayer.php?who=6565"]:before, a[href="showplayer.php?who=180553"]:before, ' +
'a[href="showplayer.php?who=57029"]:before, a[href="showplayer.php?who=505296"]:before, ' +
'a[href="showplayer.php?who=2070786"]:before, a[href="showplayer.php?who=1451506"]:before,' +
'a[href="showplayer.php?who=174215"]:before, a[href="showplayer.php?who=196531"]:before, ' +
'a[href="showplayer.php?who=62164"]:before, a[href="showplayer.php?who=36395"]:before, ' +
'/* C */' +
'a[href="showplayer.php?who=840337"]:before,' +
'/* D */' +
'a[href="showplayer.php?who=815560"]:before, a[href="showplayer.php?who=425819"]:before,' +
'/* E */' +
'a[href="showplayer.php?who=187512"]:before, a[href="showplayer.php?who=12625"]:before, ' +
'a[href="showplayer.php?who=321292"]:before, a[href="showplayer.php?who=585112"]:before,' +
'/* F */' +
'a[href="showplayer.php?who=91985"]:before, a[href="showplayer.php?who=122332"]:before, ' +
'a[href="showplayer.php?who=5426"]:before, a[href="showplayer.php?who=115076"]:before, ' +
'/* G */' +
'a[href="showplayer.php?who=1176256"]:before,' +
'/* H */' +
'a[href="showplayer.php?who=113097"]:before, a[href="showplayer.php?who=51705"]:before, ' +
'a[href="showplayer.php?who=216194"]:before, ' +
'/* I */' +
'a[href="showplayer.php?who=72767"]:before, a[href="showplayer.php?who=244846"]:before, ' +
'/* J */' +
'a[href="showplayer.php?who=329033"]:before, a[href="showplayer.php?who=647042"]:before,' +
'a[href="showplayer.php?who=40503"]:before,  a[href="showplayer.php?who=996875"]:before, ' +
'/* K */' +
'a[href="showplayer.php?who=145996"]:before, a[href="showplayer.php?who=30036"]:before,' +
'/* L */' +
'a[href="showplayer.php?who=17634"]:before, a[href="showplayer.php?who=286883"]:before, ' +
'a[href="showplayer.php?who=200117"]:before, a[href="showplayer.php?who=1008044"]:before, ' +
'a[href="showplayer.php?who=1335002"]:before,' +
'/* M */' +
'a[href="showplayer.php?who=32917"]:before, a[href="showplayer.php?who=4590"]:before, ' +
'a[href="showplayer.php?who=92832"]:before, a[href="showplayer.php?who=181536"]:before, ' +
'a[href="showplayer.php?who=310335"]:before, a[href="showplayer.php?who=1502692"]:before, ' +
'a[href="showplayer.php?who=845708"]:before, a[href="showplayer.php?who=377922"]:before,' +
'/* N */' +
'a[href="showplayer.php?who=29041"]:before, a[href="showplayer.php?who=615067"]:before, ' +
'/* O */' +
'a[href="showplayer.php?who=247309"]:before, ' +
'/* P */' +
'a[href="showplayer.php?who=83563"]:before, a[href="showplayer.php?who=4403"]:before, ' +
'/* R */' +
'a[href="showplayer.php?who=542317"]:before, ' +
'/* S */' +
'a[href="showplayer.php?who=190031"]:before, a[href="showplayer.php?who=114524"]:before, ' +
'a[href="showplayer.php?who=679553"]:before, a[href="showplayer.php?who=2454"]:before, ' +
'a[href="showplayer.php?who=438429"]:before, ' +
'a[href="showplayer.php?who=33237"]:before, ' +
'a[href="showplayer.php?who=1443477"]:before, ' +
'/* T */' +
'a[href="showplayer.php?who=358045"]:before, a[href="showplayer.php?who=15649"]:before, ' +
'a[href="showplayer.php?who=114754"]:before, a[href="showplayer.php?who=257788"]:before, ' +
'a[href="showplayer.php?who=62191"]:before, ' +
'a[href="showplayer.php?who=695393"]:before, ' +
'a[href="showplayer.php?who=569975"]:before,' +
'a[href="showplayer.php?who=87945"]:before,' +
'a[href="showplayer.php?who=735603"]:before,' +
'/* V */' +
'a[href="showplayer.php?who=1891399"]:before, ' +
'/* W */' +
'a[href="showplayer.php?who=21163"]:before, ' +
'a[href="showplayer.php?who=538743"]:before, ' +
'a[href="showplayer.php?who=621799"]:before,' +
'a[href="showplayer.php?who=34061"]:before,' +
'/* X */' +
'a[href="showplayer.php?who=128508"]:before, a[href="showplayer.php?who=46205"]:before, ' +
'/* Y */' +
'a[href="showplayer.php?who=91599"]:before, ' +
'/* Z */' +
'a[href="showplayer.php?who=306898"]:before' +
'/* Zed */' +
'{content: " (Mod) " !important; font-weight: bold !important; color: #c00 !important;}' +
'' +
'#ChatWindow font b a:before, #ChatWindow font b a:before, #ChatWindow b + i a:before {content: "" !important;}' +
'' +
'/* A */' +
'font b a[href="showplayer.php?who=119474"] font:after {content: " (AdWriter)" !important;}' +
'font b a[href="showplayer.php?who=206500"] font:after {content: " (Albassoon)" !important;}' +
'font b a[href="showplayer.php?who=115209"] font:after {content: " (AleCat)" !important;}' +
'font b a[href="showplayer.php?who=62474"] font:after {content: " (AliceCat)" !important;}' +
'font b a[href="showplayer.php?who=234268"] font:after {content: " AnOtherGrendel" !important;}' +
'font b a[href="showplayer.php?who=224321"] font:after {content: " (Aprocalypse)" !important;}' +
'/* B */' +
'font b a[href="showplayer.php?who=6565"] font:after {content: " (Bellytor)" !important;}' +
'font b a[href="showplayer.php?who=180553"] font:after {content: " (Bete Noire)" !important;}' +
'font b a[href="showplayer.php?who=2070786"] font:after {content: " (BillyGoatGruff)" !important;}' +
'font b a[href="showplayer.php?who=57029"] font:after {content: " (BioHazardMan)" !important;}' +
'font b a[href="showplayer.php?who=505296"] font:after {content: " (Bitter Hawk)" !important;}' +
'font b a[href="showplayer.php?who=1451506"] font:after {content: " (Bjornhilde)" !important;}' +
'font b a[href="showplayer.php?who=174215"] font:after {content: " (BlueSpaceThing)" !important;}' +
'font b a[href="showplayer.php?who=196531"] font:after {content: " (Boofalo)" !important;}' +
'font b a[href="showplayer.php?who=62164"] font:after {content: " (Borax The Clean)" !important;}' +
'font b a[href="showplayer.php?who=36395"] font:after {content: " (BunBun)" !important;}' +
'/* C */' +
'font b a[href="showplayer.php?who=840337"] font:after {content: " (Cowmanbob)" !important;}' +
'/* D */' +
'font b a[href="showplayer.php?who=815560"] font:after {content: " (DanBob)" !important;}' +
'font b a[href="showplayer.php?who=425819"] font:after {content: " (Dr_Oblvious)" !important;}' +
'/* E */' +
'font b a[href="showplayer.php?who=187512"] font:after {content: " (Elektra)" !important;}' +
'font b a[href="showplayer.php?who=12625"] font:after {content: " (Elven_Princess)" !important;}' +
'font b a[href="showplayer.php?who=585112"] font:after {content: " (Emhgee)" !important;}' +
'font b a[href="showplayer.php?who=321292"] font:after {content: " (Ercassendil)" !important;}' +
'/* F */' +
'font b a[href="showplayer.php?who=91985"] font:after {content: " (Flinkle)" !important;}' +
'font b a[href="showplayer.php?who=122332"] font:after {content: " (Fnord7)" !important;}' +
'font b a[href="showplayer.php?who=5426"] font:after {content: " (Fruity Vuish)" !important;}' +
'font b a[href="showplayer.php?who=115076"] font:after {content: " (Fusilliban" !important;}' +
'/* G */' +
'font b a[href="showplayer.php?who=1176256"] font:after {content: " (Garlick" !important;}' +
'/* H */' +
'font b a[href="showplayer.php?who=113097"] font:after {content: " (HeyGurlFriend)" !important;}' +
'font b a[href="showplayer.php?who=51705"] font:after {content: " (HotPasta)" !important;}' +
'font b a[href="showplayer.php?who=216194"] font:after {content: " (Holderofsecrets)" !important;}' +
'/* I */' +
'font b a[href="showplayer.php?who=72767"] font:after {content: " (Imp y Clelyn)" !important;}' +
'font b a[href="showplayer.php?who=244846"] font:after {content: " (IronChefIrish)" !important;}' +
'/* J */' +
'font b a[href="showplayer.php?who=329033"] font:after {content: " (Janitor)" !important;}' +
'font b a[href="showplayer.php?who=647042"] font:after {content: " (JayRandom)" !important;}' +
'font b a[href="showplayer.php?who=40503"] font:after {content: " (Jill_Bob)" !important;}' +
'font b a[href="showplayer.php?who=996875"] font:after {content: " (Justinarms)" !important;}' +
'/* K */' +
'font b a[href="showplayer.php?who=145996"] font:after {content: " (Kavall)" !important;}' +
'font b a[href="showplayer.php?who=30036"] font:after {content: " (KeyPunch)" !important;}' +
'/* L */' +
'font b a[href="showplayer.php?who=17634"] font:after {content: " (Lady Arryn)" !important;}' +
'font b a[href="showplayer.php?who=286883"] font:after {content: " (LadyBoobsalot)" !important;}' +
'font b a[href="showplayer.php?who=200117"] font:after {content: " (LaurDragon)" !important;}' +
'font b a[href="showplayer.php?who=1008044"] font:after {content: " (LordDerby)" !important;}' +
'font b a[href="showplayer.php?who=1335002"] font:after {content: " (Lynnox)" !important;}' +
'/* M */' +
'font b a[href="showplayer.php?who=32917"] font:after {content: " (Marshall)" !important;}' +
'font b a[href="showplayer.php?who=4590"] font:after {content: " (Mick)" !important;}' +
'font b a[href="showplayer.php?who=92832"] font:after {content: " (Mikel)" !important;}' +
'font b a[href="showplayer.php?who=181536"] font:after {content: " (MojoMadness)" !important;}' +
'font b a[href="showplayer.php?who=310335"] font:after {content: " (MoonShae)" !important;}' +
'font b a[href="showplayer.php?who=1502692"] font:after {content: " (Mirella)" !important;}' +
'font b a[href="showplayer.php?who=845708"] font:after {content: " (Mistress of the Obvious)" !important;}' +
'font b a[href="showplayer.php?who=377922"] font:after {content: " (Marm)" !important;}' +
'/* N */' +
'font b a[href="showplayer.php?who=29041"] font:after {content: " (NML Manticore)" !important;}' +
'font b a[href="showplayer.php?who=615067"] font:after {content: " (Nuurgle)" !important;}' +
'/* O */' +
'font b a[href="showplayer.php?who=247309"] font:after {content: " (One Winged Goose)" !important;}' +
'/* P */' +
'font b a[href="showplayer.php?who=83563"] font:after {content: " (PrincessMandy)" !important;}' +
'font b a[href="showplayer.php?who=4403"] font:after {content: " (Phoenix)" !important;}' +
'/* R */' +
'font b a[href="showplayer.php?who=542317"] font:after {content: " (RubyLucky)" !important;}' +
'/* S */' +
'font b a[href="showplayer.php?who=190031"] font:after {content: " (SassyLassy)" !important;}' +
'font b a[href="showplayer.php?who=114524"] font:after {content: " (Shoing)" !important;}' +
'font b a[href="showplayer.php?who=679553"] font:after {content: " (Sola)" !important;}' +
'font b a[href="showplayer.php?who=2454"] font:after {content: " (SpazWorrier)" !important;}' +
'font b a[href="showplayer.php?who=438429"] font:after {content: " (smkydz)" !important;}' +
'font b a[href="showplayer.php?who=33237"] font:after {content: " (Scyld)" !important;}' +
'font b a[href="showplayer.php?who=1443477"] font:after {content: " (Shkspr)" !important;}' +
'/* T */' +
'font b a[href="showplayer.php?who=358045"] font:after {content: " (TavernWench)" !important;}' +
'font b a[href="showplayer.php?who=15649"] font:after {content: " (TheGreatYak)" !important;}' +
'font b a[href="showplayer.php?who=114754"] font:after {content: " (ThisGuy)" !important;}' +
'font b a[href="showplayer.php?who=257788"] font:after {content: " (Thunkles)" !important;}' +
'font b a[href="showplayer.php?who=62191"] font:after {content: " (Turing)" !important;}' +
'font b a[href="showplayer.php?who=695393"] font:after {content: " (Turbulent Squirrel)" !important;}' +
'font b a[href="showplayer.php?who=569975"] font:after {content: " (Tomandtish)" !important;}' +
'font b a[href="showplayer.php?who=87945"] font:after {content: " (Thok)" !important;}' +
'font b a[href="showplayer.php?who=735603"] font:after {content: " (TriSuit)" !important;}' +
'/* V */' +
'font b a[href="showplayer.php?who=1891399"] font:after {content: " VegetarianRoadkill)" !important;}' +
'/* W */' +
'font b a[href="showplayer.php?who=21163"] font:after {content: " (Werebear)" !important;}' +
'font b a[href="showplayer.php?who=538743"] font:after {content: " (Wombaticus)" !important;}' +
'font b a[href="showplayer.php?who=621799"] font:after {content: " (WhyMan)" !important;}' +
'font b a[href="showplayer.php?who=34061"] font:after {content: " (warebar)" !important;}' +
'/* X */' +
'font b a[href="showplayer.php?who=128508"] font:after {content: " (Xon Kaynark)" !important;}' +
'font b a[href="showplayer.php?who=46205"] font:after {content: " (Xenophobe)" !important;}' +
'/* Y */' +
'font b a[href="showplayer.php?who=91599"] font:after {content: " (Yodo)" !important;}' +
'/*Zed */' +
'font b a[href="showplayer.php?who=306898"] font:after {content: " (Zeki)" !important;}' +
'' +
'font[color="blue"] b a font[color="blue"]:after {content: "" !important;}}';
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
})();