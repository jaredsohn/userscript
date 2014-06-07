// ==UserScript==
// @name           [MSPA] Doc Scratch highlighter
// @namespace      lexical
// @description    Highlights Doc Scratch's texts so you don't have to
// @include        http://mspaintadventures.com/*
// @include        http://www.mspaintadventures.com/*
// ==/UserScript==
/**
 * TH1S 1S MOSTLY T4K3N FROM MY TROLL TR4NSL4TOR.
 * WHY H4V3 A S3COND ON3 JUST FOR DOC SCR4TCH?
 * B3C4US3 1 C4N'T B3 ARS3D DO1NG 4LL TH3 1NT3GR4T1ON
 * TH4T ON3 M1NOR CH4R4CT3R'S COMPL3T3LY D1FF3R3NT 
 * QU1RK WOULD R3QU1R3 ON TH3 M41N ON3. >:[
 */
function SC4TCHLO4D() {
	var D1VS, GOTCH4, D1V, P, NOD3,WORDS,N4M3;
	var I;
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
	/*
	 * NOW W3 G3T TO DO SOM3 3XC1T1NGLY STUP1D LOOPS TO F1ND THE
	 *  B1TS OF HTML W3 N33D 1N WH4T 4PP34RS TO B3 4 S3M1-R4NDOM
	 *  DOM MOD3L TH4T CH4NG3S B3TW33N 3V3RY P4G3
	 */
	// F1RST OFF F1ND TH3 T4BL3 TH4T HOLDS TH3 CH4TLOG
	for (I = 0; I < D1V.childNodes.length; I++) {
		P = D1V.childNodes[I];
		if (P.nodeName == "TABLE") {
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
			if (NOD3.style.color == "rgb(255, 255, 255)") {
				NOD3.style.background = "black";
				NOD3.innerHTML = "DS: " + NOD3.innerHTML;
			}
		}
	}
}
window.addEventListener("load",SC4TCHLO4D,true);