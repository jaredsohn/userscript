// ==UserScript==
// @name	Kana to Romaji Converter
// @description	Revised Traditional Hepburn Romanization
// @grant       none
// @include	*
// ==/UserScript==
function keydh(e) {
	if (working) return;
	if (!e) {
		e = event;
	}
	working = true;
	if (e.altKey && (e.keyCode == 82)) {
		var element = document.body;
		if (e.element) {
			element = e.element();
			if (element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') {
				if (e.keyCode == 0) return;
			}
		}
		element.innerHTML = convert(element.innerHTML);
	}
	working = false;
}

function init() {
	/*altKey=GM_getValue('altKey', true);
	ctrlKey=GM_getValue('ctrlKey', false);
	shiftKey=GM_getValue('shiftKey', false);
	metaKey=GM_getValue('metaKey', false);
	keycode=GM_getValue('keycode', "R");
	
	try {
		USP.theScriptName = 'Kana to Romaji';
		USP.init({theName:'altKey', theText:'Alt:', theDefault:true},
			{theName:'ctrlKey', theText:'Ctrl:', theDefault:false},
			{theName:'shiftKey', theText:'Shift:', theDefault:false},
			{theName:'metaKey', theText:'Meta:', theDefault:false},
			{theName:'keycode', theText:'Key:', theDefault:"R"});
		GM_registerMenuCommand(USP.theScriptName, USP.invoke);
	} catch (e) {console.log('K2R USP Error:\t'+e);};*/
	
	if (document.addEventListener) {
	   document.addEventListener("keydown", keydh, true);
	}
	else if (document.attachEvent) {
	   document.attachEvent("onkeydown", keydh);
	}
	else {
	   document.onkeydown = keydh;
	}
}

function convert(str) {
	//can make this better? maybe concat arrays for っ, and ー
	for(i in extended) {
		str = str.replace(new RegExp(i+'ー', "gm"), extended[i].slice(0, extended[i].length-1)+macra[extended[i].charAt(extended[i].length-1)]);
		str = str.replace(new RegExp('ッ'+i, "gm"), extended[i].charAt(0)+extended[i]);
		str = str.replace(new RegExp(i, "gm"), extended[i]);
	}
	for(i in diphthongs) {
		str = str.replace(new RegExp(i+'ー', "gm"), diphthongs[i].slice(0, diphthongs[i].length-1)+macra[diphthongs[i].charAt(diphthongs[i].length-1)]);
		str = str.replace(new RegExp('ッ'+i, "gm"), diphthongs[i].charAt(0)+diphthongs[i]);
		str = str.replace(new RegExp('っ'+i, "gm"), diphthongs[i].charAt(0)+diphthongs[i]);
		str = str.replace(new RegExp(i, "gm"), diphthongs[i]);
	}
	for(i in special) {
		str = str.replace(new RegExp(i+'ー', "gm"), special[i].slice(0, special[i].length-1)+macra[special[i].charAt(special[i].length-1)]);
		str = str.replace(new RegExp(i, "gm"), special[i]);
	}
	for(i in kana) {
		str = str.replace(new RegExp(i+'ー', "gm"), kana[i].slice(0, kana[i].length-1)+macra[kana[i].charAt(kana[i].length-1)]);
		str = str.replace(new RegExp('ッ'+i, "gm"), kana[i].charAt(0)+kana[i]);
		str = str.replace(new RegExp('っ'+i, "gm"), kana[i].charAt(0)+kana[i]);
		str = str.replace(new RegExp(i, "gm"), kana[i]);
	}
	return str;
}

var macra = {"a": "ā", "i":"ii", "u": "ū", "e": "ē", "o": "ō", "A": "Ā", "I":"II", "U": "Ū", "E": "Ē", "O": "Ō"};
var extended = {"イィ": "YI", "イェ": "YE", "ウァ": "WA", "ウィ": "WI", "ウゥ": "WU", "ウェ": "WE", "ウォ": "WO", "ウュ": "WYU", "キェ": "KYE", "ギェ": "GYE", "クァ": "KWA", "クィ": "KWI", "クェ": "KWE", "クォ": "KWO", "クヮ": "KWA", "グァ": "GWA", "グィ": "GWI", "グェ": "GWE", "グォ": "GWO", "グヮ": "GWA", "シェ": "SHE", "ジェ": "JE", "スィ": "SI", "ズィ": "ZI", "チェ": "CHE", "ツァ": "TSA", "ツィ": "TSI", "ツェ": "TSE", "ツォ": "TSO", "ツュ": "TSYU", "ティ": "TI", "テュ": "TYU", "ディ": "DI", "デュ": "DYU", "トゥ": "TU", "ドゥ": "DU", "ニェ": "NYE", "ヒェ": "HYE", "ビェ": "BYE", "ピェ": "PYE", "ファ": "FA", "フィェ": "FYE", "フィ": "FI", "フェ": "FE", "フォ": "FO", "フャ": "FYA", "フュ": "FYU", "フョ": "FYO", "ホゥ": "HU", "ミェ": "MYE", "ラ゜": "LA", "リ゜": "LI", "リェ": "RYE", "ル゜": "LU", "レ゜": "LE", "ロ゜": "LO", "ヴァ": "VA", "ヴィェ": "VYE", "ヴィ": "VI", "ヴェ": "VE", "ヴォ": "VO", "ヴャ": "VYA", "ヴュ": "VYU", "ヴョ": "VYO", "ヴ": "VU", "ヷ": "VA", "ヸ": "VI", "ヹ": "VE", "ヺ": "VO"};
var kana = {"あ": "a", "い": "i", "う": "u", "え": "e", "お": "o", "か": "ka", "が": "ga", "き": "ki", "ぎ": "gi", "く": "ku", "ぐ": "gu", "け": "ke", "げ": "ge", "こ": "ko", "ご": "go", "さ": "sa", "ざ": "za", "し": "shi", "じ": "ji", "す": "su", "ず": "zu", "せ": "se", "ぜ": "ze", "そ": "so", "ぞ": "zo", "た": "ta", "だ": "da", "ち": "chi", "ぢ": "ji", "つ": "tsu", "づ": "zu", "て": "te", "で": "de", "と": "to", "ど": "do", "な": "na", "に": "ni", "ぬ": "nu", "ね": "ne", "の": "no", "は": "ha", "ば": "ba", "ぱ": "pa", "ひ": "hi", "び": "bi", "ぴ": "pi", "ふ": "fu", "ぶ": "bu", "ぷ": "pu", "へ": "he", "べ": "be", "ぺ": "pe", "ほ": "ho", "ぼ": "bo", "ぽ": "po", "ま": "ma", "み": "mi", "む": "mu", "め": "me", "も": "mo", "や": "ya", "ゆ": "yu", "よ": "yo", "ら": "ra", "り": "ri", "る": "ru", "れ": "re", "ろ": "ro", "わ": "wa", "ゐ": "i", "ゑ": "e", "を": "o", "ん": "n", "ア": "A", "イ": "I", "ウ": "U", "エ": "E", "オ": "O", "カ": "KA", "ガ": "GA", "キ": "KI", "ギ": "GI", "ク": "KU", "グ": "GU", "ケ": "KE", "ゲ": "GE", "コ": "KO", "ゴ": "GO", "サ": "SA", "ザ": "ZA", "シ": "SHI", "ジ": "JI", "ス": "SU", "ズ": "ZU", "セ": "SE", "ゼ": "ZE", "ソ": "SO", "ゾ": "ZO", "タ": "TA", "ダ": "DA", "チ": "CHI", "ヂ": "JI", "ツ": "TSU", "ヅ": "ZU", "テ": "TE", "デ": "DE", "ト": "TO", "ド": "DO", "ナ": "NA", "ニ": "NI", "ヌ": "NU", "ネ": "NE", "ノ": "NO", "ハ": "HA", "バ": "BA", "パ": "PA", "ヒ": "HI", "ビ": "BI", "ピ": "PI", "フ": "FU", "ブ": "BU", "プ": "PU", "ヘ": "HE", "ベ": "BE", "ペ": "PE", "ホ": "HO", "ボ": "BO", "ポ": "PO", "マ": "MA", "ミ": "MI", "ム": "MU", "メ": "ME", "モ": "MO", "ヤ": "YA", "ユ": "YU", "ヨ": "YO", "ラ": "RA", "リ": "RI", "ル": "RU", "レ": "RE", "ロ": "RO", "ワ": "WA", "ヰ": "I", "ヱ": "E", "ヲ": "O", "ン": "N", "ャ": "YA", "ュ": "YU", "ョ": "YO"};
var special = {"うう": "ū", "おう": "ō", "おお": "ō", "ゔ": "vu", "ウウ": "Ū", "オウ": "Ō", "オオ": "Ō"};
var diphthongs = {"きゃ": "kya", "きゅ": "kyu", "きょ": "kyo", "ぎゃ": "gya", "ぎゅ": "gyu", "ぎょ": "gyo", "しゃ": "sha", "しゅ": "shu", "しょ": "sho", "じゃ": "ja", "じゅ": "ju", "じょ": "jo", "ちゃ": "cha", "ちゅ": "chu", "ちょ": "cho", "ぢゃ": "ja", "ぢゅ": "ju", "ぢょ": "jo", "にゃ": "nya", "にゅ": "nyu", "にょ": "nyo", "ひゃ": "hya", "ひゅ": "hyu", "ひょ": "hyo", "びゃ": "bya", "びゅ": "byu", "びょ": "byo", "ぴゃ": "pya", "ぴゅ": "pyu", "ぴょ": "pyo", "みゃ": "mya", "みゅ": "myu", "みょ": "myo", "りゃ": "rya", "りゅ": "ryu", "りょ": "ryo", "キャ": "KYA", "キュ": "KYU", "キョ": "KYO", "ギャ": "GYA", "ギュ": "GYU", "ギョ": "GYO", "シャ": "SHA", "シュ": "SHU", "ショ": "SHO", "ジャ": "JA", "ジュ": "JU", "ジョ": "JO", "チャ": "CHA", "チュ": "CHU", "チョ": "CHO", "ヂャ": "JA", "ヂュ": "JU", "ヂョ": "JO", "ニャ": "NYA", "ニュ": "NYU", "ニョ": "NYO", "ヒャ": "HYA", "ヒュ": "HYU", "ヒョ": "HYO", "ビャ": "BYA", "ビュ": "BYU", "ビョ": "BYO", "ピャ": "PYA", "ピュ": "PYU", "ピョ": "PYO", "ミャ": "MYA", "ミュ": "MYU", "ミョ": "MYO", "リャ": "RYA", "リュ": "RYU", "リョ": "RYO"};
var working = false;
var alt, ctrl, shift, meta, code;

init();
