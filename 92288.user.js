// ==UserScript==
// @name           [MSPA] Lexical Troll Translator
// @namespace      lexical
// @description    Attempts to make the trolls in MSPA legible
// @include        http://mspaintadventures.com/*
// @include        http://www.mspaintadventures.com/*
// ==/UserScript==
/*
	TODO B3FOR3 R3L34S3:
		X D3T3CT M3MOS [FPC?]..
		X M4K3 PR3FS MOR3 COMP4T1BL3
		X M4K3 PR3FS US3 P3OPL3 4ND QU1RKS TO S3TUP D3F4ULTS.
		X F1X T3XT ST1LL B31NG LOW3R C4S3D W1TH TH3 R3C4P1T1L1Z3R OFF
		X 4DD COMM3NTS FOR 4LL FUNCT1ONS
		X 4DJUST TH3 N4M3R TO SHOW ON 4LL \[(X)?XX\]
	POT3NT14L TODO 4T SOM3 PO1NT
		  N4M3 D3T3CTOR IN R3C4P1T1L1Z3R
		  N3W R3C4P1T1L1Z3R (M4K3 4 TOGGL3 OPT1ON?)
*/
var P3OPL3 = {};
P3OPL3["AA"] = "Aradia";
P3OPL3["AT"] = "Tavros";
P3OPL3["AC"] = "Nepeta";
P3OPL3["AG"] = "Vriska";
P3OPL3["TA"] = "Sollux";
P3OPL3["TT"] = "Rose";
P3OPL3["TC"] = "Gamzee";
P3OPL3["TG"] = "Dave";
P3OPL3["CA"] = "Eridan";
P3OPL3["CT"] = "Equius";
P3OPL3["CC"] = "Feferi";
P3OPL3["CG"] = "Karkat";
P3OPL3["GA"] = "Kanaya";
P3OPL3["GT"] = "John (old)";
P3OPL3["GC"] = "Terezi";
P3OPL3["GG"] = "Jade";
P3OPL3["EB"] = "John";
P3OPL3["JOHN"] = "John (Spritelog)";
P3OPL3["DAVE"] = "Dave (Spritelog)";
P3OPL3["JADE"] = "Jade (Spritelog)";
P3OPL3["DAVESPRITE"] = "Davesprite (Spritelog)";
P3OPL3["JADESPRITE"] = "Jadesprite (Spritelog)";

var QU1RKS = {};
QU1RKS["AA"] = [ // Aradia
	[/0/g, "o", "Replace '0's with 'o's", true]
];
QU1RKS["AT"] = [ // Tavros
	[/}:(.)/g, ":$1", "Remove the horns from emotes", false]	
];
QU1RKS["AC"] = [ // Nepeta
	[/:33 < /g, "", "Remove the ':33 <' from the start of messages", true],
	[/([:xX])(.){2}/g, "$1$2", "Remove the second mouth from emotes", true],
	[/33/g, "ee", "Replace '33' with 'ee'", true],
	[/purr/g, "per", "Replace 'purr' with 'per'", true],
	[/fur/g, "for", "Replace 'fur' with 'for'", true]
];
QU1RKS["AG"] = [ // Vriska
	[/([aeiouAEIOU]){8}/g, "$1","Collapse extended vowels", true],
	[/([!\?]){8}/g, "$1", "Collapse extended punctuation", true],
	[/([xX:]){4}(.)/g, "$1$2", "Remove excess eyes from emotes", true]
];
QU1RKS["TA"] = [ // Sollux
	[/2/g, "s", "Replace '2' with 's'", true],
	[/([Ii]){2}/g, "$1", "Undouble 'ii's", true],
	[/two/g, "to", "Replace 'two' with 'to'", true]
];
/*
QU1RKS["TT"] = null; // Rose
QU1RKS["TC"] = null; // Gamzee
QU1RKS["TG"] = null; // Dave
*/
QU1RKS["CA"] = [ // Eridan
	[/([Ww]){2}/g, "$1", "Un-double 'ww's", true],
	[/([Vv]){2}/g, "$1", "Un-double 'vv's", true]
];
QU1RKS["CT"] = [ // Equius
	[/[Dd] -->/g, "", "Remove 'D -->' from the start of messages.", true],
	[/100/g, "loo", "Replace '100' with 'loo'", true],
	[/001/g, "ool", "Replace '001' with 'ool'", true],
	[/%/g, "x", "Replace % with x", true]
];
QU1RKS["CC"] = [ // Feferi
	[/\)\(/g, "h", "Replace )( with h", true],
	[/-*([eE])/g, "$1", "Remove -s from ---E tridents", true],
	[/38(.)/g, ":$1", "Remove tiara and goggles from emotes", false]
];
/*
QU1RKS["CG"] = null; // Karkat
QU1RKS["GA"] = null; // Kanaya
QU1RKS["GT"] = null; // John (old)
*/
QU1RKS["GC"] = [ // Terezi
	[/4/g,"a", "Replace '4' with 'a'", true],
	[/1/g,"i", "Replace '1' with 'i'", true],
	[/3/g,"e", "Replace '3' with 'e'", true]
];
/*
QU1RKS["GG"] = null; // Jade
QU1RKS["EB"] = null; // John
*/

/*******************\
 * R3C4P1T1L1Z4TOR *
\*******************/

/* TODO:
	COMP3NS4T3 FOR OTH3R PUNCTU4T1ON
*/
var /*SPLITR3G3X = /[\.!\?] /,*/ IR3G3X = / i([ '])/g;
function R3C4P1T1L1Z3(TROLLT3XT) {
	var R3T,SPL1T,WORK1NG;
	R3T = "";
	SPL1T = TROLLT3XT.split(". ");
	for (var I = 0; I < SPL1T.length; I++) {
		WORK1NG = SPL1T[I];
		R3T += WORK1NG.charAt(0).toUpperCase() + WORK1NG.substr(1) + ". ";
	}
	R3T = R3T.replace(IR3G3X, " I$1");
	return R3T.substr(0,R3T.length-2);
}
/**
 * CH3CKS 1F TH3 P4RT1CUL4R TROLL SHOULD B3 R3C4P1T1L1Z3D
 * @P4R4M N4M3 TH3 CH4T N4M3 OF TH3 TROLL
 * @R3TURN TRU3 OR F4LS3
 */  
function SHOULDR3C4P1T1L1Z3(N4M3) {
	if (!PR3FS["C4PS"]) {
		return false;
	}
	return PR3FS["C4PS"][N4M3];
}
/**
 * CH3CKS 1F TH1S 1S ON3 OF TH3 P3OPL3 WHO W3 DONT 3V3N BOTH3R LOOKING 4T
 * @P4R4M N4M3 TH3 CH4T N4M3 OF TH3 TROLL
 * @R3TURN TRU3 OR F4LS3
 */
function SHOULD1GNOR33NT1R3LY(N4M3) {
	// YOU M4Y H4V3 NOT1C3D TH4T MOST OF TH3S3 4R3 NOT CH4T N4M3S - W3 H4NDL3 SPR1T3S TOO.
	return N4M3 == "TT" || N4M3 == "NANNASPRITE" || N4M3 == "JASPERSPRITE" || N4M3 == "ROSE";
}
/**
 * 4CTU4LLY DO3S TH3 QU1RK CULL1NG 4ND SO ON
 * @P4R4M N4M3 TH3 CH4T N4M3 OF TH3 TROLL
 * @P4R4M TROLLT3XT TH3 T3XT TO CULL
 * @R3TURN TH3 UPD4T3D T3XT
 */
var M3MOS = /^[CPF?](..)/
function DO1T(N4M3,TROLLT3XT) {
	// COMP3NS4T3 FOR T3MPOR4L M3MOS WH1CH CONT41N TH3 T1M3 OF TH3 P4RT1C1P4NT
	var M3MO = N4M3.match(M3MOS);
	if (M3MO) {
		N4M3 = M3MO[1];
	}
	// GR4B TH3 US3RS PR3F3R3NC3S FOR TH1S TROLL
	var TROLLPR3FS = PR3FS[N4M3];
	var TROLLR3G3X3S = QU1RKS[N4M3]
	var C4PS = SHOULDR3C4P1T1L1Z3(N4M3);
	if (C4PS) {
		// 1F W3'R3 GONN4 DO TH3 C4PS, NUK3 TH3 CURR3NT ON3S SO TH3Y DONT G3T 1N TH3 W4Y
		TROLLT3XT = TROLLT3XT.toLowerCase()
	}
	if (TROLLPR3FS) { // SOM3 (P4TH3T1C 1N MY OP1N1ON) TROLLS DONT H4V3 QU1RKS
		for (var I = 0; I < TROLLPR3FS.length; I++) {
			if (TROLLPR3FS[I]) { // 1F TH3 US3R DO3SNT L1K3 TH3 1NF3R1OR TYP1NG, R3G3X 1T TO H3LL.
				TROLLT3XT = TROLLT3XT.replace(TROLLR3G3X3S[I][0],TROLLR3G3X3S[I][1]);
			}
		}
	}
	if (C4PS) {
		// ONC3 4NY S1LLYN3SS H4S B33N T4K3N C4R3 OF, F1X TH3 C4PS.
		TROLLT3XT = R3C4P1T1L1Z3(TROLLT3XT);
	}
	return TROLLT3XT
}
/**
 * SOM3 CH4TS CONT41N HTML TH4T G3TS BULLDOZ3D 1F W3 4R3NT C4R3FUL.
 * TH1S 1S US B31NG C4R3FUL.
 * @P4R4M SP4N TH3 SP4N DOM OBJ3CT OF TH3 T3XT W1TH TH3 HTML 1N 1T
 * @P4R4M N4M3 TH3 CH4T N4M3 OF TH3 TROLL
 */
function COMP3NS4T3FORL1NKS(SP4N, N4M3) {
	var TROLLT3XT;
	for ( var I = 0; I < SP4N.childNodes.length; I++) {
		NOD3 = SP4N.childNodes[I];
		if (NOD3.nodeName == "#text") { 
			TROLLT3XT = NOD3.textContent.replace(N4M3+": ","");
			TROLLT3XT = DO1T(N4M3,TROLLT3XT);
			if (I == 0) {
				TROLLT3XT = N4M3 + ": " + TROLLT3XT;
			}
			NOD3.textContent = TROLLT3XT;
		}
	}
}
/**
 * D3C1D3S ON 4 SP4N BY SP4N B4S1S WH4T TO DO TO TH3 SUPPL13D CH4T.
 * @P4R4M SP4N TH3 SP4N DOM OBJ3CT OF TH3 T3XT TO JUDG31FY
 */
var TROLLR3G3X = /^([A-Z?]*): (.*)/, N4M3R3G3X = /\[.?(..)\]/;
function D34LW1TH1T(SP4N) {
	var TROLLT3XT, N4M3, FUNC;
	TROLLT3XT = SP4N.textContent;
	// CH3CK 1F 1T'S 4 N4M1NG SP4N
	N4M3 = TROLLT3XT.match(N4M3R3G3X);
	if (N4M3) {
		// 1F 1T 1S, THROW 1N TH3 TROLL'S R34L N4M3 TO K1LL 4NY 4NONYM1TY (H3H3H3H3H3)
		N4M3 = P3OPL3[N4M3[1]];
		if (N4M3) {
			SP4N.textContent += " (" + N4M3 + ")";
		}
		return;
	}
	// CH3CK 1F 1T'S 4CTU4LLY 4 CH4TLOG
	N4M3 = TROLLT3XT.match(TROLLR3G3X);
	if (!N4M3) { return; } // BUGG3R OFF 1F 1T'S NOT
	if (SHOULD1GNOR33NT1R3LY(N4M3[1])) { return; } // 1GNOR3 D4NG3ROUS P3OPL3
	if (SP4N.childNodes.length > 1) {
		// 1F W3 H4V3 1NN3R HTML, D34L W1TH 1T S3P3R4T3LY
		return COMP3NS4T3FORL1NKS(SP4N,N4M3[1]);
	}
	TROLLT3XT = DO1T(N4M3[1],N4M3[2]); // DO TH3 4CTU4L 4DUSTM3NTS
	SP4N.textContent = N4M3[1] + ": " + TROLLT3XT; // ST1CK TH3 N3W WORDS 1N PL4C3 OF TH3 OLD
}
/**
 * S3TS 3V3RYTH1NG UP 4T TH3 ST4RT
 */
function ONLO4D() {
	var D1VS, GOTCH4, D1V, P, NOD3,WORDS,N4M3;
	var I;
	var R3GX;
	// M4K3 SUR3 W3'R3 ON 4 P4G3 W1TH 4 CH4TLOG 4ND CONV3N13NTLY G3T OUR ST4RT1NG DIV
	D1VS = document.getElementsByTagName("div");
	GOTCH4 = false;
	for (I = 0; I < D1VS.length; I++) {
		D1V = D1VS[I];
		if (D1V.className == "spoiler") {
			GOTCH4 = true;
			break;
		}
	}
	if (!GOTCH4) { return; } // NO CH4T, NO D1C3
	LO4DPR3F3R3NC3S(); // GR4B OUR US3RS PR3F3R3NC3S B3FOR3 W3 DO 4NYTH1NG 3LS3
	/*
	 * NOW W3 G3T TO DO SOM3 3XC1T1NGLY STUP1D LOOPS TO F1ND THE
	 *  B1TS OF HTML W3 N33D 1N WH4T 4PP34RS TO B3 4 S3M1-R4NDOM
	 *  DOM MOD3L TH4T CH4NG3S B3TW33N 3V3RY P4G3
	 */
	// F1RST OFF F1ND TH3 T4BL3 TH4T HOLDS TH3 CH4TLOG, STOPP1NG
	//  OFF TO 4DD TH3 PR3FS BUTTON ON TH3 W4Y
	for (I = 0; I < D1V.childNodes.length; I++) {
		P = D1V.childNodes[I];
		if (P.nodeName == "DIV") { // TH1S W1LL B3 TH3 D1V TH4T HOLDS TH3 CLOS3 BUTTON
			// M4K3 OUR PR3F3R3NC3S BUTTON
			var BUTTON = document.createElement("button")
			BUTTON.setAttribute("name","PR3FS BUTTON");
			BUTTON.setAttribute("type","button");
			BUTTON.setAttribute("class","button");
			BUTTON.setAttribute("title","Click to open the chatlog preferences");
			BUTTON.textContent = "Prefs";
			BUTTON.addEventListener("click",USP.invoke,true);
			P.innerHTML += " "; // 4DD 4 SM4LL G4P FOR STYL3
			P.appendChild(BUTTON);
		} else if (P.nodeName == "TABLE") {
			break;
		}
	}
	// NOW, SCOOT UP 4ND DOWN TH3 P4R3NT4G3 L4DD3R UNT1L
	//  W3 F1ND TH3 P TH4T HOLDS TH3 T3XT
	while (P.nodeName != "P") {
		if (P.nodeName == "#text") { // SOM3T1M3S TH3 F1RST CH1LD 1S TH3 T3XT CONT3NT, SOM3T1M3S 1T 1SNT
			P = P.parentNode.childNodes[1];
		} else {
			P = P.firstChild;
		}
	}
	// NOW W3 H4V3 TH3 CH4TLOG, GO THROUGH 1T 4LL
	for (var I = 0; I < P.childNodes.length; I++) {
		NOD3 = P.childNodes[I];
		if (NOD3.nodeName == "SPAN") { // W3 DON'T W4NT TO FUCK W1TH 4NY OTH3R S1LLY SH1T TH4T M1GHT B3 TH3R3
			D34LW1TH1T(NOD3);
		}
	}
}
window.addEventListener("load",ONLO4D,true);

/*
	PR3F3R3NC3S
	OR1G14N4LLY FROM: http://userscripts.org/scripts/show/45988
*/
var PR3FS = {};
var PR3FSR3G3X = /(.*)_(.*)/;
/**
 * G3TS A V4LU3 FROM TH3 S4V3D PR3F3R3NC3S US1NG 4 STR1NG
 * @P4R4M N4M3 4 N4M3 IN XX_YY FORM4T
 * @R3TURN TH3 V4LU3 1N PR3FS[XX][YY]
 */
function G3TV4LU3(N4M3) {
	var V4RS = N4M3.match(PR3FSR3G3X);
	if (!V4RS || !PR3FS[V4RS[1]]) { return undefined; }
	return PR3FS[V4RS[1]][V4RS[2]];
}
/**
 * S3TS A V4LU3 IN TH3 S4V3D PR3F3R3NC3S US1NG 4 STR1NG
 * @P4R4M N4M3 4 N4M3 IN XX_YY FORM4T
 * @P4R4N V4LU3 TH3 V4LU3 TO B3 S4V3D 1N PR3FS[XX][YY]
 */
function S3TV4LU3(N4M3, V4LU3){
	var V4RS = N4M3.match(PR3FSR3G3X);
	if (!V4RS || !PR3FS[V4RS[1]]) { return; }
	PR3FS[V4RS[1]][V4RS[2]] = V4LU3;
}
/**
 * LO4DS TH3 PR3F3R3NC3S OR CR34T3S TH3M W1TH TH3 D3F4ULTS 1F TH3Y DONT 3X1ST
 */
function LO4DPR3FS() {
	var R4W	= localStorage['TROLLPR3FS'];
	if (R4W != undefined && R4W != null) {
		PR3FS = JSON.parse(R4W);
		return;
	}
	PR3FS = {};
	PR3FS["C4PS"] = {};
	var P3RSON, N4M3, QU1RX, L3N, J, I = 0;
	for (P3RSON in P3OPL3) {
		N4M3 = P3OPL3[P3RSON];
		if (typeof N4M3 != "string" // FOR 1N C4N G3T S1LLY SOM3T1M3S
		||  SHOULD1GNOR33NT1R3LY(P3RSON) ) { // DONT PROD 4NGRY B4DG3RS
			continue;
		}
		PR3FS["C4PS"][P3RSON] = true;
		QU1RX = QU1RKS[P3RSON];
		if (!QU1RX) { // 1F TH3 SP3C1F13D P3RSON DO3SNT US3 A QU1RK
			continue;
		}	
		PR3FS[P3RSON] = []
		L3N = QU1RX.length;
		for (J = 0; J < L3N; J++) {
			PR3FS[P3RSON][J] = QU1RX[J][3];
		}
	}
	S4V3PR3FS();
}
/**
 * S4V3S TH3 PR3F3R3NC3S TO TH3 D1SK
 */
function S4V3PR3FS() {
	localStorage['TROLLPR3FS'] = JSON.stringify(PR3FS);
}
/**
 * LO4DS TH3 PR3F3R3NC3S, S3TS UP TH3 PR3FS W1NDOW 3TC
 */
function LO4DPR3F3R3NC3S() {
	LO4DPR3FS();
	var PR3F4RR = [];
	var P3RSON, N4M3, QU1RK, QU1RX, L3N, J, I = 0;
	for (P3RSON in P3OPL3) {
		N4M3 = P3OPL3[P3RSON];
		if (typeof N4M3 != "string" // FOR 1N C4N G3T S1LLY SOM3T1M3S
		||  SHOULD1GNOR33NT1R3LY(P3RSON) ) { // DONT PROD 4NGRY B4DG3RS
			continue;
		}
		PR3F4RR[I++] = {
			theName:"C4PS_"+P3RSON,
			theText:'<hr /><span class="boldprefs">'+N4M3+" ("+P3RSON+")</span></div><br/><div>\nEnable recapitizer",
			theDefault:true
		};
		QU1RX = QU1RKS[P3RSON];
		if (!QU1RX) { // 1F TH3 SP3C1F13D P3RSON DO3SNT US3 A QU1RK
			continue;
		}
		L3N = QU1RX.length;
		for (J = 0; J < L3N; J++) {
			QU1RK = QU1RX[J];
			PR3F4RR[I++] = {
				theName:P3RSON+"_"+J,
				theText:QU1RK[2],
				theDefault:QU1RK[3]
			};			
		}
	}
	USP.init(PR3F4RR);
}

// SCRIPT USERSCRIPT PREFERENCES
// VERSION 1.0.2
// Shows a div-Window and darkens the page for userscript preference values
var USP = {
    node: null,
    darken: null,
    valueList: null,
    theScriptName: 'Lexical Troll Translator',
    prefPrefix: '',
    isVisible: false,
    CSS: ''+
        '#US-prefs,#US-prefs *{font-size:12px;font-weight:normal;font-style:normal;font-family:tahoma,arial,sans-serif;color:#000;text-transform:none;text-decoration:none;letter-spacing:normal;word-spacing:normal;line-height:normal;vertical-align:baseline;direction:ltr;background:transparent none repeat scroll 0 0;opacity:1;position:static;visibility:visible;z-index:auto;overflow:visible;white-space:normal;clip:auto;float:none;clear:none;cursor:auto;text-align:center}/*preserve defaults*/\n\n'+
        '#US-prefs{display:block;position:fixed;z-index:999;border:1px solid #000;-moz-border-radius:5px;background:rgb(180,180,180) none;color:#FFF0CF;width:400px;overflow:auto;max-height:768;}\n'+
        '#US-darken,#US-darken *{background:transparent none repeat scroll 0 0;opacity:0.7;position:static;visibility:visible;z-index:auto;overflow:visible;white-space:normal;clip:auto;float:none;clear:none;cursor:auto}/*preserve defaults*/\n\n'+
        '#US-darken{height:100%;width:100%;display:block;position:fixed;z-index:998;background:rgb(0,0,0) none}\n'+
        '   #US-prefs>h1{text-align:center;display:block;font-size:2em;font-weight:normal;border:0;margin:0;padding:0}\n'+
        '   #US-prefs p{display:block;margin:5px 10px 1em 5px;font-family:arial,sans-serif}\n'+
        '   #US-prefs p>b{font-weight:bold}\n'+
        '   #US-prefs>div{display:block;width:300px;margin:0 auto;text-align:right;}\n'+
        '   #US-prefs>div>div{display:block;width:300px;margin:0 auto;text-align:center}\n'+
        '   .US-radio{margin:0.2em auto !important;padding:2px 2px;border:1px solid #000;-moz-border-radius:3px;}\n'+
        '   .US-radio div{display:block;width:100%;margin:0 auto;text-align:left !important;font-weight:bold !important}\n'+
        '   #US-prefs input, #US-prefs select{text-align:left;margin:0.7em 0;padding:0 6px;background:#FFE1A2;border:1px solid #000;-moz-border-radius:4px;border-color:#5F3E00 #5F3E00 #000 #5F3E00;font-family:verdana,arial,sans-serif}\n'+
        '   #US-prefs>div>div input{margin:0 0;padding:0 0;background:#FFE1A2;border:1px solid #000;-moz-border-radius:4px;border-color:#5F3E00 #5F3E00 #000 #5F3E00;font-family:verdana,arial,sans-serif}\n'+
		'   .boldprefs{font-weight:bold !important;}',
    init: function(arr) {
        var theStyle=document.createElement("style");
        USP.valueList=arr//arguments;
        theStyle.setAttribute('type','text/css');
        //document.body.appendChild(theStyle).innerHTML=USP.CSS;
        document.getElementsByTagName('head')[0].appendChild(theStyle).innerHTML=USP.CSS;

        USP.prefPrefix='\n   <h1>Userscript preferences</h1>\n   <p>Please edit your preferences for the script<br><b>'+USP.theScriptName+'</b></p>\n<div class="USP-values"></div><input class="button" type="button" value="Save">&nbsp;&nbsp;<input class="button" type="button" value="Save & Reload">&nbsp;&nbsp;<input class="button" type="button" value="Cancel"><br><input class="button" type="button" value="Check for update">\n';
        USP.node=document.createElement("div");
        USP.node.innerHTML='<div>'+USP.prefPrefix+'</div>';
        USP.node=USP.node.firstChild;
        USP.node.id="US-prefs";
        USP.node.parentNode.removeChild(USP.node);
        USP.darken=document.createElement("div");
        USP.darken.innerHTML='<div></div>';
        USP.darken=USP.darken.firstChild;
        USP.darken.id="US-darken";
        USP.darken.parentNode.removeChild(USP.darken);
    },
    cb:{},
    EL:
      function(e) {
         var E=e.type.toLowerCase().replace(/^on/i,""),i=0,n=e.target;
         if(!USP.cb[E])return;
         for(;i<USP.cb[E].length;i++) {
            if(USP.cb[E][i][0]==n) return USP.cb[E][i][1].call(n,e)
         }// no callbacks found
      },
    addEventListener:
      function(n,E,f) {
         if(!n+!f)return !1;
         if(!USP.cb[E]){USP.cb[E]=[];USP.node.addEventListener(E,function(e){USP.EL(e)},!0)}
         USP.cb[E].push([n,f]);
         return !0;
      },
    removeEventListener:
      function(n,E,f) {
         if(!n+!E+!f+!USP.cb[E])return;
         for(var i=0;i<USP.cb[E].length;i++) {
            if(USP.cb[E][i][0]==n&&USP.cb[E][i][1]==f)return !(USP.cb[E].splice(i,1))||undefined;
         }
      },

    showWindow: function (){
        document.body.appendChild(USP.darken);
        document.body.appendChild(USP.node);
        USP.isVisible=true;
    },
    
    styleWindow: function() {
		if(typeof SVC=='undefined') {
			USP.node.getElementsByClassName("button")[3].style.display='none';
		}
		if(USP.valueList.length==0) {
			USP.node.getElementsByClassName("button")[0].style.display='none';
			USP.node.getElementsByClassName("button")[1].style.display='none';
		}
		USP.darken.style.left=USP.darken.style.top="50%";
		USP.darken.style.marginLeft=-(USP.darken.offsetWidth/2)+"px";
		USP.darken.style.marginTop=-(USP.darken.offsetHeight/2)+"px";
		USP.node.style.left=USP.node.style.top="50%";
		USP.node.style.marginLeft=-(USP.node.offsetWidth/2)+"px";
		USP.node.style.marginTop=-(USP.node.offsetHeight/2)+"px";
		if(USP.valueList.length>0) {
			USP.addEventListener(USP.node.getElementsByClassName("button")[0],"click",USP.saveValues);
			USP.addEventListener(USP.node.getElementsByClassName("button")[1],"click",USP.saveValuesAndReload);
		}
		USP.addEventListener(USP.node.getElementsByClassName("button")[2],"click",USP.killWindow);
		
		if(typeof SVC!='undefined') USP.addEventListener(USP.node.getElementsByClassName("button")[3],"click",SVC.versionInfo.manualChecking);
    },

    killWindow: function(){
        USP.node.innerHTML=USP.prefPrefix;
        USP.node.parentNode.removeChild(USP.node);
        USP.darken.parentNode.removeChild(USP.darken);
        USP.isVisible=false;
    },
    
    saveValues: function(){
        for(var i=0;i<USP.valueList.length;i++) {
			S3TV4LU3(USP.valueList[i].theName, USP.node.getElementsByClassName('USP-field'+i)[0].checked);
        }
		S4V3PR3FS()
        USP.killWindow();
    },
    
    saveValuesAndReload: function(){
        USP.saveValues();
        window.location.reload();
    },
    invoke: function(){
        if(!USP.isVisible) {
            USP.showWindow();
            for(var i=0;i<USP.valueList.length;i++) {
            	var curVal = G3TV4LU3(USP.valueList[i].theName);
				if (curVal == undefined || curVal == null) {
					curVal = USP.valueList[i].theDefault;
				}
				var isChecked='';
				if(curVal) isChecked=' checked';
				USP.node.getElementsByClassName('USP-values')[0].innerHTML +=
					'<div>' + 
					USP.valueList[i].theText + 
					' <input class="USP-field' +
					i +
					'" type="checkbox" name="' +
					USP.valueList[i].theName +
					'"' +
					isChecked +
					'></div><br>';
            }
            USP.styleWindow();
        }
    }
    
};