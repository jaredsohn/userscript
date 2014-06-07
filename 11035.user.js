// Uncensor The Internet Plus
// Version 0.6.6
// 2007-08-12

// -----------------------------------Information------------------------------------
// Original based on Jmaxxz Vulgar Word Blocker, 
// which can be found at: http://userscripts.org/scripts/show/2287
//
// Updated by FinalDoom from Uncensor the Internet, 
// which can be found at: http://userscripts.org/scripts/show/8891
//
// Now includes additional words and sophisticated filters.
// Compatible with Pagerization script,
// which can be found at: http://userscripts.org/scripts/show/7623
// See Options section to enable.
// ----------------------------------------------------------------------------------

// -------------------------------------Options--------------------------------------
// Enable or disable Pagerization compatibility
var pagerization = false; // true = compatibility on; false = off (default)
// ----------------------------------------------------------------------------------

// --------------------------------------WARNING-------------------------------------
//
//                               DO NOT SCROLL DOWN 
//
//            this script contains language that may be offensive.
//
// ----------------------------------------------------------------------------------

// ==UserScript==
// @name Uncensor The Internet Plus
// @namespace uncensorTheInternetPlus
// @description Uncensors the bad words on the web
// @include *
// ==/UserScript==

// ----------------------------------Do Not Modify-----------------------------------
var regex = [], replacements = [];
// ----------------------------------------------------------------------------------

// --------------------Case Sensitive Custom Word Replacements-----------------------
// This list is case SENSITIVE, i.e. uppercase and lowcase are treated differently
//
// Terms are listed as comma separated couples of words, in the form:
// "Censored Word": "replacement", // Optional result word listings
//
// "Censored Word" and "replacement" can both contain Regular Expressions
// "Censored Word" is a string representing a RegExp search
// "replacement" is a string representing a RegExp replacement
//
// Place additional case SENSITIVE custom words in the list below:
// ----------------------------------------------------------------------------------
makeRegExp({
//A
	"(\\b)([Aa])[^\\s\\w]{2}hole": "$1$2sshole", // Asshole asshole
	"(\\b)A[^\\s\\w]{2}HOLE": "$1ASSHOLE", // ASSHOLE
	"(\\b|\\w)([Aa])[^\\s\\w]{2}": "$1$2ss", // Ass ass
	"(\\b)@\\$\\$": "$1ass", // ass
  

//B
	"(\\b)([Bb])[^\\s\\w]tch": "$1$2itch", // Bitch bitch
	"(\\b)B[^\\s\\w]TCH": "$1BITCH", // BITCH
	"(\\b)([Bb])(?:(?:o|[^\\s\\w]){2}b|(?:o|[^\\s\\w]){2}[^\\s\\w](s|ies))": "$1$2oob$3", // Boob boob Boobs boobs Boobies boobies
	"(\\b)B(?:(?:O|[^\\s\\w]){2}B|(?:O|[^\\s\\w]){2}[^\\s\\w](S|IES))": "$1BOOB$2", // BOOB BOOBS BOOBIES
	"(\\b)([Bb])ull(?:\\*{4}|[^\\s]{3}t)": "$1$2ullshit", // Bullshit bullshit
	"(\\b)BULL(?:\\*{4}|[^\\s]{3}T)": "$1BULLSHIT", // BULLSHIT

//C
	"(\\b)([Cc])[^\\s\\w]{2}k": "$1$2ock", // Cock cock
	"(\\b)C[^\\s\\w]{2}K": "$1COCK", // COCK
	"(\\b)([Cc])l[^\\s\\w]t": "$1$2lit", // Clit clit
	"(\\b)CL[^\\s\\w]T": "$1CLIT", // CLIT
	"(\\b)([Cc])[^\\s\\w]m": "$1$2um", // Cum cum
	"(\\b)C[^\\s\\w]M": "$1CUM", // CUM
	"(\\b)([Cc])[^\\s\\w]nt": "$1$2unt", // Cunt cunt
	"(\\b)C[^\\s\\w]NT": "$1CUNT", // CUNT

//D
	"(\\b|\\w)([Dd])(?:a|[^\\s\\w])(?:m|[^\\s\\w])n": "$1$2amn", // Damn damn
	"(\\b|\\w)D(?:A|[^\\s\\w])(?:M|[^\\s\\w])N": "$1DAMN", // DAMN
	"(\\b)([Dd])(?:[^\\s\\w](?:c|[^\\s\\w])k|[^\\s\\w]{3}(s))": "$1$2ick$3", // Dick dick Dicks dicks
	"(\\b)D(?:[^\\s\\w](?:C|[^\\s\\w])K|[^\\s\\w]{3}(S))": "$1DICK$2", // DICK DICKS
	"(\\b)([Dd])[^\\s\\w]ldo": "$1$2ildo", // Dildo dildo
	"(\\b)D[^\\s\\w]LDO": "$1DILDO", // DILDO
	"(\\b)([Dd])[^\\s\\w]ke": "$1$2yke", // Dyke dyke
	"(\\b)D[^\\s\\w]KE": "$1DYKE", // DYKE

//F
	"(\\b|\\w)([Ff])(?:[^\\s](?:[^\\s\\w]|c)k|[^\\s\\w]{3})([0-9a-z]{2,}\\b)": "$1$2uck$3", // Fucker fucker Fucking fucking Fuckin' fuckin' etc.
	"(\\b|\\w)F(?:[^\\s](?:[^\\s\\w]|C)K|[^\\s\\w]{3})([0-9A-Z]{2,}\\b)": "$1FUCK$2", // FUCKER FUCKING FUCKIN' etc.
	"(\\b|\\w)([Ff])(?:[^\\s](?:[^\\s\\w]|c)k|[^\\s\\w]{3})": "$1$2uck", // Fuck fuck
	"(\\b|\\w)F(?:[^\\s](?:[^\\s\\w]|C)K)": "$1FUCK", // FUCK

//M
	"(\\b)([Mm])(?:ast(?:[^\\s\\w]rb(?:[^\\s\\w]|a)t|urb[^\\s\\w]t)|[^\\s\\w]st(?:[^\\s\\w]|u)rb(?:[^\\s\\w]|a)t)(e|ing|ion)": "$1$2asturbat$3", // Masturbate masturbate Masturbating masturbating Masturbation masturbation
	"(\\b)M(?:AST(?:[^\\s\\w]RB(?:[^\\s\\w]|A)T|URB[^\\s\\w]T)|[^\\s\\w]ST(?:[^\\s\\w]|U)RB(?:[^\\s\\w]|A)T)(E|ING|ION)": "$1MASTURBAT$2", // MASTURBATE MASTURBATING MASTURBATION
	"(\\b)([Mm])other(?:\\*{6}|[^\\s]{4})([0-9a-z]{2,}\\b)": "$1$2otherfuck$3", // Motherfucker motherfucker Motherfucking motherfucking etc.
	"(\\b)MOTHER(?:\\*{6}|[^\\s]{4})([0-9A-Z]{2,}\\b)": "$1MOTHERFUCK$2", // MOTHERFUCKER MOTHERFUCKING etc.

//N
	"(\\b)([Nn])[^\\s\\w]ked": "$1$2aked",
	"(\\b)N[^\\s\\w]KED": "$1NAKED",
	"(\\b)([Nn])(?:i(?:g[^\\s\\w]|[^\\s\\w]g|[^\\s\\w]{2})|[^\\s\\w](?:g[^\\s\\w]|[^\\s\\w]g|gg))(a|er)": "$1$2igg$3", // Nigga nigga Nigger nigger
	"(\\b)N(?:I(?:G[^\\s\\w]|[^\\s\\w]G|[^\\s\\w]{2})|[^\\s\\w](?:G[^\\s\\w]|[^\\s\\w]G|GG))(A|ER)": "$1NIGG$2",// NIGGA NIGGER

//P
	"(\\b)([Pp])(?:i(?:s[^\\s\\w]|[^\\s\\w]s|[^\\s\\w][^\\s\\w])|[^\\s\\w.](?:ss|s[^\\s\\w.]|[^\\s\\w]s))([^y])": "$1$2iss$3", // Piss piss
	"(\\b)P(?:I(?:S[^\\s\\w]|[^\\s\\w]S|[^\\s\\w][^\\s\\w])|[^\\s\\w.](?:SS|S[^\\s\\w.]|[^\\s\\w]S))([^Y])": "$1PISS$2", // PISS
	"(\\b)([Pp])[^\\s\\w]rn": "$1$2orn", // Porn porn
	"(\\b)P[\\s\\w]RN": "$1PORN", // PORN
	"(\\b)([Pp])(?:u(?:s[^\\s\\w]|[^\\s\\w]s|[^\\s\\w]{2})|[^\\s\\w](?:ss|s[^\\s\\w]|[^\\s\\w]s))(y|ies)": "$1$2uss$3", // Pussy pussy Pussies pussies
	"(\\b)P(U(?:S[^\\s\\w]|[^\\s\\w]S|[^\\s\\w]{2})|[^\\s\\w](?:SS|S[^\\s\\w]|[^\\s\\w]S))(Y|IES)": "$1PUSS$3", // PUSSY PUSSIES

//S
	"(\\b)([Ss])(?:h(?:[^\\s\\w]t|i[^\\s\\w]|[^\\s\\w]{2})|[^\\s\\w](?:[^\\s\\w]t|i[^\\s\\w]))": "$1$2hit", // Shit shit
	"(\\b)S(?:H(?:[^\\s\\w]T|I[^\\s\\w]|[^\\s\\w]{2})|[^\\s\\w](?:[^\\s\\w]T|I[^\\s\\w]))": "$1SHIT", //SHIT

//T
	"(\\b|\\w)([Tt])(?:i|[^\\s\\w])(ts?|ty|ties)": "$1$2i$3", // Tit tit Tits tits Titty titty Titties titties
	"(\\b|\\w)T(?:I|[^\\s\\w])(TS?|TTY|TTIES)": "$1TI$2", // TIT TITS TITTY TITTIES
	
//V
	"(\\b)([Vv])[^\\s\\w]gina": "$1$2agina", // Vagina vagina
	"(\\b)V[^\\s\\w]GINA": "$1VAGINA", // VAGINA
	
//W
	"(\\b)([Ww])(?:h[^\\s\\w]r)(e|es|ing)": "$1$2hor$3", // Whore whore Whores whores Whoring whoring
	"(\\b)W(?:H[^\\s\\w]R)(E|ES|ING)": "$1WHOR$2", // WHORE WHORES WHORING

// ----------------------------Bonus Word Replacement Fun----------------------------
// I just couldn't bring myself to making these word replacements default.
// But, you can turn them on by removing the leading slashes.
//
//	"(\\b)President Bush": "$1President Douchebag",
//	"(\\b)George W\\. Bush": "$1George W\\. Douchebag",
//	"(\\b)George W Bush": "$1George W Douchebag",
// ----------------------------------------------------------------------------------
}, "g");


// ---------------------Case Inensitive Custom Word Replacements---------------------
// This list is case INSENSITIVE, i.e. uppercase and lowcase are considered the same.
//
// Terms are listed as comma separated couples of words, same as above.
//
// Place additional case INSENSITIVE custom words in the list below:
// ----------------------------------------------------------------------------------
makeRegExp({
//F
	"(\\b)the f.word": "$1Fuck", // Fuck
	"(\\b)the \"f\".word": "$1Fuck", // Fuck

// ----------------------------Bonus Word Replacement Fun----------------------------
// I just couldn't bring myself to making these word replacements default.
// But, you can turn them on by removing the leading slashes.
//
//	"(\\b)the Bush administration": "$1the Douchebag administration",
// ----------------------------------------------------------------------------------
}, "ig");


// ---------------------------End Of Configurable Section----------------------------
// Don't touch anything below, unless you know what you're doing.
// ----------------------------------------------------------------------------------

function makeRegExp(replacers, flags) {
	for(var key in replacers)
	{
		regex.push(new RegExp(key, flags));
		replacements.push(replacers[key]);
	}
} 

// Uncensoring Function
function uncensor(text)
{
	for (var j = 0; j < regex.length; j++)
	{
		text = text.replace(regex[j], replacements[j]);
	}
	return text;
}

function main()
{
	// Replace In Title
	if(document.title) document.title = uncensor(document.title);

	// Replace In Body Text
	var textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < textnodes.snapshotLength; i++)
	{
		node = textnodes.snapshotItem(i);
		node.data = uncensor(node.data);
	}
}

main();

// Compatibility with Pagerization
if (pagerization) addFilter(function () {main();});

function addFilter(func, i) {
	i = i || 4;
	if (window.AutoPagerize && window.AutoPagerize.addFilter) {
		window.AutoPagerize.addFilter(func);
	}
	else if (i > 1) {
		setTimeout(arguments.callee, 1000, func, i - 1);
	}
	else {
		(function () {
			func(document);
			setTimeout(arguments.callee, 200);
		})();
	}
}