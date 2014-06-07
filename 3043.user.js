// ==UserScript==

// @name            Heiseforenlinks
// @namespace       p-hu.de
// @description     repariert kaputte Links in den Heiseforen
// @include         http://www.heise.de/*read*
// @include         http://heise.de/*read*

// ==/UserScript==

function linkify(node) {
	var lines = node.innerHTML.split("<br>");
	var i=0;
	var newStr = "";
	var linkTarget = "";
	var remainingTxt = "";
	var state=0; // 0: normaler Text 1: Link
	var delim;

	for (var i = 0; i < lines.length; ++i) {
		// fuehredes Whitespace loeschen
		if (lines[i].charCodeAt(0) == 10) {
			lines[i] = lines[i].substring(1);
		}
		// Laenge der Zeile in "echten" Chars berechnen
		// (geht das auch irgendwie eleganter ?!?)
		var charlength = lines[i].length;
		var tmp = lines[i].match(/\x26..;/g);	// &lt; als ein Zeichen
		if (tmp) charlength -= tmp.length*3;
		var tmp = lines[i].match(/\x26...;/g);	// &amp; als ein Zeichen
		if (tmp) charlength -= tmp.length*4;
		tmp = lines[i].match(/\x26....;/g);		// &nbsp; als ein Zeichen
		if (tmp) charlength -= tmp.length*5;
		tmp = lines[i].match(/\x26.....;/g);	// &Acirc; als ein Zeichen
		if (tmp) charlength -= tmp.length*6;
		tmp = lines[i].match(/\x26......;/g);	// &Egrave; als ein Zeichen
		if (tmp) charlength -= tmp.length*7;

		delim = lines[i].search("&nbsp;"); // kommt ein space vor?

		if (state == 0) {
			// Zustand: wir lesen normalen Text
			if ((charlength >= 69) && (delim == -1)) {
				// umgebrochene Zeile und kein space => evtl. Anfang eines b0rken link
				if (lines[i].search("http:\/\/")==0) {
					// http:// am Anfang ==> alles klar, das ist ein Link
					linkTarget = lines[i];
					state = 1;
				} else // sonst ist es nur Text
					newStr += lines[i];
			} else if (lines[i] != "kyselak&nbsp;war&nbsp;hier!")
				newStr += lines[i];
		} else {
			// Zustand: Wir lesen einen Teil eines b0rken Links
			if (delim == -1) {
				// kein space ==> dieser Teil des Links geht ueber die ganze Zeile
				linkTarget += lines[i];
				if (charlength < 69) {
					// keine umgebrochene Zeile ==> hier ist der Link zu Ende
					remainingTxt = "";
					state = 2;
				}
			} else {
				// Link geht bis zum space, danach geht normaler Text weiter
				linkTarget += lines[i].substring(0,delim);
				remainingTxt = lines[i].substring(delim);
				state = 2;
			}
		}
		if (state == 2) {
			newStr += "<a href=\"" + linkTarget + "\">";
			if (linkTarget.length > 120) {
				newStr += linkTarget.substr(0,117) + "...";
			} else {
				newStr += linkTarget;
			}
			newStr += "</a>";
			state = 0;
			if (remainingTxt.length != 0) {
				newStr += "<br>" + remainingTxt;
			}
		}
		if ((state == 0) && (i != lines.length-1))
			newStr += "<br>";
 	}
	node.innerHTML = newStr;
}

(function() {
	// user2user- bzw. news-Foren-Layout
	var beitrag = document.evaluate('/HTML[1]/BODY[1]/DIV[2]/TABLE[1]/TBODY[1]/TR[1]/TD[2]/TABLE[1]/TBODY[1]/TR[2]/TD[2]/DIV[1]/P[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	if (!beitrag) // Heise-Mobil-Foren-Layout
		beitrag = document.evaluate('/HTML[1]/BODY[1]/TABLE[1]/TBODY[1]/TR[1]/TD[2]/TABLE[1]/TBODY[1]/TR[2]/TD[2]/DIV[1]/P[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	if (!beitrag) // iX-Mobil-Foren-Layout
		beitrag = document.evaluate('/HTML[1]/BODY[1]/TABLE[1]/TBODY[1]/TR[3]/TD[2]/DIV[1]/P[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	if (!beitrag) // Security-Foren-Layout
		beitrag = document.evaluate('/HTML[1]/BODY[1]/TABLE[1]/TBODY[1]/TR[1]/TD[2]/TABLE[1]/TBODY[1]/TR[2]/TD[2]/DIV[1]/P[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	if (!beitrag) // Technology-Review-Foren-Layout
		beitrag = document.evaluate('/HTML[1]/BODY[1]/TABLE[1]/TBODY[1]/TR[3]/TD[3]/P[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	if (!beitrag) // Telepolis-Foren-Layout
		beitrag = document.evaluate('/HTML[1]/BODY[1]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/TABLE[2]/TBODY[1]/TR[3]/TD[2]/P[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;

// 	beitrag.setAttribute('style', "background-color: yellow;"); // nur zum Testen
	linkify(beitrag);
}) ();
