// ==UserScript==
// @name           ePvP-Scammer tagging
// @description    Replaces Names from Scammers @ ePvP-Board with Scammer-Taggs
// @include        *elitepvpers.com/forum/*
// @copyright      M3MPHiZ / Stippy
// @version        1.0.0
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @grant          none
// @updateURL      http://userscripts.org/scripts/source/151758.user.js
// @downloadURL	   http://userscripts.org/scripts/source/151758.user.js
// ==/UserScript==


var scammer = " [Scammer]"
var untrusted = " [Untrusted]"
var scammerICQ = " [Scammer-ICQ]"
var scammerSkype = " [Scammer-SKYPE]"

var words = {


"Hαecey" : scammer,
"#ZzumL" : scammer,
"Golden'" : scammer,
"A.L.F" : scammer,
"DR000GEN'" : scammer,
"SchwiegertochterGesucht" : scammer,
"The|t3schno" : scammer,
"XXSTAR92" : scammer,
"KeyforYou" : scammer,
"ZσυℓX" : scammer,
"BookOfRa" : scammer, // http://www.youtube.com/watch?v=Ei4Y_rRI25Y&feature=youtu.be
"#Calvin" : scammer,
"OneMillionDollar™" : scammer,
"VendettaRP" : scammer,
"Colt™" : scammer,
"Mc JackNack" : scammer,
"angekauft6" : scammer,
"Pfirsichsaft*" : untrusted, // http://www.elitepvpers.com/forum/elite-gold-support/2213157-wahrscheinlicher-scamm-von-pfirsichtsaft.html
"Chigsur" : untrusted,
"xSh0wnzx" : scammer,
"DickerHobbit" : scammer,
"pr-Hosting*" : scammer,
"MKEii_-" : scammer,
"Aqoniis" : untrusted,
"Ben Salomon" : scammer,
"サソリ" : scammer,
"Kusatsu" : untrusted,
"Phytum" : scammer,
"FameLezzHDx" : scammer,
"DioskureN" : scammer,
"Lubie Cycki" : scammer,
"Schnapsbär" : scammer,
"KatiL1967" : scammer,
"MatzeVCV" : scammer,
"Der-Guardian" : scammer,
"Blanko7x" : scammer,
".Aventation" : untrusted,
"YangLeviathan" : scammer,
".Syco" : untrusted,
"canji" : scammer,
"StaY" : scammer,
"adidas.epvp" : scammer,
"lucasbarrios" : untrusted,
"SoNiice" : scammer,
"Mentos™" : scammer,
"adidas.epvp" : scammer,
"xMischa" : scammer,
"UNLTD" : scammer,
"xTr1ckx" : scammer,
"Pi." : scammer,
"laxkausal" : scammer,
"Madagaskar3" : scammer,
".Asurp" : scammer,
"AppleJack." : scammer,
"Georgi091'" : untrusted,
"wurm" : scammer,
"Bekooqtlol" : scammer,
"`Vegas" : scammer,
"MrBladen" : scammer,
"Dope.CHN" : scammer,
"Icebeatzz" : scammer,
"Diary" : scammer,
"Whing-Shu" : scammer,
"Tecc9000" : scammer,
"Sharpnewen" : scammer,
"Nana222" : scammer,
".Avent" : scammer,
"Bountyy." : scammer,
"Mister Nobody" : scammer,
"iÐry′" : scammer,
"weewoo'" : untrusted,
"GustavsWeld" : scammer,
"hobby-loss" : scammer,
"Uki33" : untrusted,
"xx1dome1x1" : scammer,
"Berkan1234" : scammer,
"worrA-II" : scammer,
"nuke'" : scammer,
"master_oli" : scammer,
"laxkausal" : scammer,
"shinny'" : scammer,
"Spuds©" : scammer, // http://www.elitepvpers.com/forum/elite-gold-support/2180892-scammer-noash08-und-spuds.html
"noash08" : scammer, // http://www.elitepvpers.com/forum/elite-gold-support/2180892-scammer-noash08-und-spuds.html
".Jackiee" : scammer,
"Gmac355" : scammer,
"BumpZor" : scammer,
"BuyingDiablo3" : scammer,
"rasan0" : scammer,
"Kontrenza" : scammer,
"Pr3cious" : scammer,
"+ zicX" : scammer,
"Hexenkind" : scammer,
"pparadox" : scammer,  // http://www.elitepvpers.com/forum/elite-gold-support/2220258-scammed-auto.html
"Auto ." : scammer, // http://www.elitepvpers.com/forum/elite-gold-support/2220258-scammed-auto.html
"Suhari" : scammer, // http://www.elitepvpers.com/forum/elite-gold-support/2219986-betrogen-von-suhari.html
"Ownage1337" : scammer, // http://www.elitepvpers.com/forum/elite-gold-support/2219719-scammer-ownage1337.html
"111ich111" : untrusted,  // http://www.elitepvpers.com/forum/elite-gold-support/2106536-111ich111-zahlt-nicht-aus.html
"Gameerish" : untrusted,  // http://http://www.elitepvpers.com/forum/elite-gold-support/2223061-scammed-gameerish.html
"elo_boost123" : "scammer", // http://www.elitepvpers.com/forum/elite-gold-support/2224069-scammed-elo_boost123.html
"Real~Life" : untrusted, // http://www.elitepvpers.com/forum/elite-gold-support/2231388-real-life-scammer.html
"Cavitx3" : scammer, // http://www.elitepvpers.com/forum/elite-gold-support/2231832-scammer-unterwegs.html
"Perfekt_-" : untrusted, // http://www.elitepvpers.com/forum/elite-gold-support/2231710-scammer-perfekt_.html
"Nedsoy" : scammer, // http://www.elitepvpers.com/forum/elite-gold-support/2225000-gescammt-von-nedsoy.html
"MakeYouGame" : untrusted, // http://www.elitepvpers.com/forum/elite-gold-support/2220979-gescammt-von-makeyougame-und-tbm.html


// Skype

"kameling-99" : scammerSkype,
"kreistv0815" : scammerSkype,
"StaY399" : scammerSkype,
"dr.lan3" : scammerSkype,
"sethb00m" : scammerSkype,
"hallo1352" : scammerSkype,
"Juergen. Haller84" : scammerSkype,
"elo_boost" : scammerSkype,
"edlerislegend" : scammerSkype,
"marcel23032" : scammerSkype,


// ICQ

"608-662-814" : scammerICQ,

///////////////////////////////////////////////////////
"":""};


String.prototype.prepareRegex = function() {
	return this.replace(/([\[\]\^\&\$\.\(\)\?\/\\\+\{\}\|])/g, "\\$1");
};

function isOkTag(tag) {
	return (new RegExp("(," + tag + ",) | (," + tag + "$)", "g").test(",pre,blockquote,code,input,button,textarea")) == false;
}

var regexs=new Array(),
	replacements=new Array();
for(var word in words) {
	if(word != "") {
		regexs.push(new RegExp(word.prepareRegex().replace(/(\\)?\*/g, function(e) {return ((e !== "\\*") ? "[^ ]*" : "*");}), "gi"));
		replacements.push(words[word] + "\r\n" + [word]);
	}
}

var texts = document.evaluate(".//text()[normalize-space(.)!='']",document.body,null,6,null), text="", len=regexs.length;
for(var i=0,l=texts.snapshotLength; (this_text=texts.snapshotItem(i)); i++) {
	if(isOkTag(this_text.parentNode.tagName) && (text=this_text.textContent)) {
		for(var x=0; x<len; x++) text = this_text.textContent = text.replace(regexs[x], replacements[x]);
	}
}