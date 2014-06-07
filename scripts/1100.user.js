// Tanach Linkify 1.3
// GUID for compiled version: {17b878ea-ec79-4d95-b4ef-3cad5df8946d}
// Author: Joshua Waxman
// License: GNU GPL v2 or later
// Inspired by: SunRocket VoIP Dial Linkify
//
// ==UserScript==
// @name           Tanach Linkify
// @namespace      http://parsha.blogspot.com/
// @description    Replaces plaintext references to psukim to the mechon mamre link, references to Gemara to the e-daf page
// @include        *
// ==/UserScript==
(function () {
	const trackRegex = /\b((Genesis|B(e?)reishi(th|t|s)|Exodus|Sh(e?)mo(s|t)|Leviticus|Vayikra|Numbers|B(a|e)midbar|Deuteronomy|D(e?)varim|Joshua|Yehoshua|Judges|Shof(e?)tim|Isaiah|Yeshaya(h?|hu?)|Jeremiah|Yirmiya(h?|hu?)|Ezekiel|Yechezkel|Hos(h?)ea|(J|Y)oel|Amos|O(b|v)adia(h?)|(J|Y)onah|Mic(h?)a(h?)|Na(c?)hum|Habakkuk|Chabakkuk|Zephaniah|Tze(ph|f)ania(h?)|Haggai|Chaggai|Zechariah|Malachi|Psalms|Tehillim|Job|Iyyov|Proverbs|Mishlei|Ru(th|t|s)|Ecclesiastes|Kohele(th|t|s)|Lamentations|Eicha|Est(h?)er|Daniel|Ezra|Ne(c?)hemia(h?)) \d*:\d*)\b/ig;
	const trackRegexComplex = /\b((((Sh(e?)muel|Samuel|Melachim|Kings|Divrei Hayamim|Chronicles) (Aleph|1|I|Bet|2|II))|((1|I|2|II) (Sh(e?)muel|Samuel|Melachim|Kings|Divrei Hayamim|Chronicles))|(Shir Hashirim|Song of Songs)) \d*:\d*)\b/ig;
	const trackRegexBavli = /\b((B(e?)racho(th|t|s)|(Shabb(o|a)(th|t|s)|Sabbath)|(Eru(b|v)in)|(P(e?)sa(c?)him)|(Sh(e?)(k|q)alim)|(Yoma(h?))|(Su(kk|cc|k|c)a(h?))|(Be(i?)(tz|z)?a(h?))|(Rosh HaShana(h?))|(Ta(a?)ni(th|t|s))|(Meg(g?)il(l?)a(h?))|(Moed Katan)|((C?)hag(g?)iga(h?))|(Ye(b|v)amo(th|t|s))|(K(e?)(th|t|s)u(b|v)o(th|t|s))|(Nedarim)|(Nazir)|(Sota(h?))|(Git(t?)in)|(K(e|i)d(d?)ushin)|(Ba(b|v)a Kama)|(Ba(b|v)a Me(tz|z)ia)|(Ba(b|v)a Ba(th|t|s)ra)|(Sanhedrin)|(Mak(k?)o(th|t|s))|(Sh(e?)(b|v)uo(th|t|s))|(A(b|v)oda(h?) Zara(h?))|(Horayo(th|t|s))|(Ze(b|v)a(c?)him)|(Mena(c?)hot)((C?)hul(l?)in)|(B(e?)(k|c)horo(th|t|s))|((A|E)r((a|e)?)(k|c)hin)|(T(e?)mura(h?))|(K(e?)ri(th|t|s)u(th|t|s))|(Meila(h?))|(Nid(d?)a(h?))) (daf )?\d*(a|b))\b/ig;

	function get_tanach_simple_sefer_num(sefer)
	{
		var regex = "";
		switch(sefer[0])
		{
			case 'A': case 'a':
				regex=/Amos/ig;
				if (regex.test(sefer))
					return "15";

			case 'B': case 'b':

				regex=/Genesis|B(e?)reishi(th|t|s)/ig;
				if (regex.test(sefer))
					return "01";

				regex=/Numbers|B(a|e)midbar/ig;
				if (regex.test(sefer))
					return "04";


			case 'C': case 'c':
				regex=/Habakkuk|Chabakkuk/ig;
				if (regex.test(sefer))
					return "20";

				regex=/Haggai|Chaggai/ig;
				if (regex.test(sefer))
					return "22";

			case 'D': case 'd':
				regex=/Deuteronomy|D(e?)varim/ig;
				if (regex.test(sefer))
					return "05";

				regex=/Daniel/ig;
				if (regex.test(sefer))
					return "34";
			case 'E': case 'e':

				regex=/Exodus|Sh(e?)mo(s|t)/ig;
				if (regex.test(sefer))
					return "02";

				regex=/Ezekiel|Yechezkel/ig;
				if (regex.test(sefer))
					return "12";

				regex=/Ecclesiastes|Kohele(th|t|s)/ig;
				if (regex.test(sefer))
					return "31";

				regex=/Lamentations|Eicha/ig;
				if (regex.test(sefer))
					return "32";

				regex=/Est(h?)er/ig;
				if (regex.test(sefer))
					return "33";

				regex=/Ezra/ig;
				if (regex.test(sefer))
					return "35a";

			case 'G': case 'g': 

				regex=/Genesis|B(e?)reishi(th|t|s)/ig;
				if (regex.test(sefer))
					return "01";

			case 'H': case 'h':
				regex=/Hos(h?)ea/ig;
				if (regex.test(sefer))
					return "13";

				regex=/Habakkuk|Chabakkuk/ig;
				if (regex.test(sefer))
					return "20";

				regex=/Haggai|Chaggai/ig;
				if (regex.test(sefer))
					return "22";

			case 'I': case 'i':

				regex=/Isaiah|Yeshaya(h?|hu?)/ig;
				if (regex.test(sefer))
					return "10";

				regex=/Job|Iyyov/ig;
				if (regex.test(sefer))
					return "27";

			case 'J': case 'j':
				regex=/Joshua|Yehoshua/ig;
				if (regex.test(sefer))
					return "06";

				regex=/Judges|Shof(e?)tim/ig;
				if (regex.test(sefer))
					return "07";

				regex=/Jeremiah|Yirmiya(h?|hu?)/ig;
				if (regex.test(sefer))
					return "11";

				regex=/(J|Y)oel/ig;
				if (regex.test(sefer))
					return "14";

				regex=/(J|Y)onah/ig;
				if (regex.test(sefer))
					return "17";


				regex=/Job|Iyyov/ig;
				if (regex.test(sefer))
					return "27";


			case 'L': case 'l':
		
				regex=/Leviticus|Vayikra/ig;
				if (regex.test(sefer))
					return "03";

				regex=/Lamentations|Eicha/ig;
				if (regex.test(sefer))
					return "32";

			case 'N': case 'n':
				regex=/Numbers|B(a|e)midbar/ig;
				if (regex.test(sefer))
					return "04";
	
				regex=/Na(c?)hum/ig;
				if (regex.test(sefer))
					return "19";

				regex=/Ne(c?)hemia(h?)/ig;
				if (regex.test(sefer))
					return "35b";		


			case 'O': case 'o':


				regex=/O(b|v)adia(h?)/ig;
				if (regex.test(sefer))
					return "16";

			case 'P': case 'p':

				regex=/Psalms|Tehillim/ig;
				if (regex.test(sefer))
					return "26";

				regex=/Proverbs|Mishlei/ig;
				if (regex.test(sefer))
					return "28";

			case 'M': case 'm':

				regex=/Mic(h?)a(h?)/ig;
				if (regex.test(sefer))
					return "18";

				regex=/Malachi/ig;
				if (regex.test(sefer))
					return "24";

				regex=/Proverbs|Mishlei/ig;
				if (regex.test(sefer))
					return "28";

			case 'R': case 'r':

				regex=/Ru(th|t|s)/ig;
				if (regex.test(sefer))
					return "29";


			case 'S': case 's':


				regex=/Exodus|Sh(e?)mo(s|t)/ig;
				if (regex.test(sefer))
					return "02";

				regex=/Judges|Shof(e?)tim/ig;
				if (regex.test(sefer))
					return "07";


			case 'T': case 't':

				regex=/Zephaniah|Tze(ph|f)ania(h?)/ig;
				if (regex.test(sefer))
					return "21";

				regex=/Psalms|Tehillim/ig;
				if (regex.test(sefer))
					return "26";

			case 'Y': case 'y':

				regex=/Joshua|Yehoshua/ig;
				if (regex.test(sefer))
					return "06";

				regex=/Jeremiah|Yirmiya(h?|hu?)/ig;
				if (regex.test(sefer))
					return "11";

				regex=/Ezekiel|Yechezkel/ig;
				if (regex.test(sefer))
					return "12";

				regex=/(J|Y)oel/ig;
				if (regex.test(sefer))
					return "14";

				regex=/(J|Y)onah/ig;
				if (regex.test(sefer))
					return "17";



			case 'Z': case 'z':

				regex=/Zephaniah|Tze(ph|f)ania(h?)/ig;
				if (regex.test(sefer))
					return "21";

				regex=/Zechariah/ig;
				if (regex.test(sefer))
					return "23";
		}

		return "";
	}

	function get_tanach_complex_sefer_num(sefer)
	{
		var regex="";

//		alert("get_tanach_complex_sefer_num::1::sefer="+sefer);

		switch(sefer[0])
		{
			case 'S': case 's':

				regex=/((Sh(e?)muel|Samuel) (Bet|2|II))|((2|II) (Sh(e?)muel|Samuel))/ig;
				if (regex.test(sefer))
					return "08b";

				regex=/((Sh(e?)muel|Samuel) (Aleph|1|I))|((1|I) (Sh(e?)muel|Samuel))/ig;
				if (regex.test(sefer))
					return "08a";

				regex=/(Shir Hashirim|Song of Songs)/ig;
				if (regex.test(sefer))
					return "30";

			case 'M': case 'm': case 'K': case 'k':
				regex=/(((Melachim|Kings) (Bet|2|II))|((2|II) (Melachim|Kings)))/ig;
				if (regex.test(sefer))
					return "09b";


				regex=/(((Melachim|Kings) (Aleph|1|I))|((1|I) (Melachim|Kings)))/ig;
				if (regex.test(sefer))
					return "09a";

			case 'D': case 'd': case 'C': case 'c':

				regex=/((Divrei Hayamim|Chronicles) (Bet|2|II))|((2|II) (Divrei Hayamim|Chronicles))/ig;
				if (regex.test(sefer))
					return "25b";

				regex=/((Divrei Hayamim|Chronicles) (Aleph|1|I))|((1|I) (Divrei Hayamim|Chronicles))/ig;
				if (regex.test(sefer))
					return "25a";

			case 'I': case '1': case '2':

				regex=/((Sh(e?)muel|Samuel) (Bet|2|II))|((2|II) (Sh(e?)muel|Samuel))/ig;
				if (regex.test(sefer))
					return "08b";

				regex=/((Sh(e?)muel|Samuel) (Aleph|1|I))|((1|I) (Sh(e?)muel|Samuel))/ig;
				if (regex.test(sefer))
					return "08a";

				regex=/(((Melachim|Kings) (Bet|2|II))|((2|II) (Melachim|Kings)))/ig;
				if (regex.test(sefer))
					return "09b";

				regex=/(((Melachim|Kings) (Aleph|1|I))|((1|I) (Melachim|Kings)))/ig;
				if (regex.test(sefer))
					return "09a";

				regex=/((Divrei Hayamim|Chronicles) (Bet|2|II))|((2|II) (Divrei Hayamim|Chronicles))/ig;
				if (regex.test(sefer))
					return "25b";

				regex=/((Divrei Hayamim|Chronicles) (Aleph|1|I))|((1|I) (Divrei Hayamim|Chronicles))/ig;
				if (regex.test(sefer))
					return "25a";


		}
		return "";
	}

//	var brachotPerekStart = { 2b, 	

	function get_bavli_simple_sefer_num(sefer)
	{
		var regex="";

		regex=/(B(e?)racho(th|t|s))/ig;
		if (regex.test(sefer))
			return "1101";

		regex=/(Shabb(o|a)(th|t|s)|Sabbath)/ig;
		if (regex.test(sefer))
			return "2101";
	


		return "";

	}


	function get_edaf_page(sefer, daf)
	{
		var regex="";

		var iDaf = (parseInt(daf.substr(0, daf.length - 1)) - 2) * 2; // -2 bec 2a is 0
		var ab = daf[daf.length - 1];

		if (ab == "b" || ab == "B")
			iDaf++;

		switch(sefer[0])
		{
			case 'A': case 'a':

				regex=/(A(b|v)oda(h?) Zara(h?))/ig;
				if (regex.test(sefer))
					return "" + (3979 + iDaf);


				regex=/((A|E)r((a|e)?)(k|c)hin)/ig;
				if (regex.test(sefer))
					return "" + (5009 + iDaf);

			case 'B': case 'b':
				regex=/(B(e?)racho(th|t|s))/ig;
				if (regex.test(sefer))
					return 1 + iDaf;

				regex=/(Be(i?)(tz|z)?a(h?))/ig;
				if (regex.test(sefer))
					return "" + (1210 + iDaf);

				regex=/(Ba(b|v)a Kama)/ig;
				if (regex.test(sefer))
					return "" + (2792 + iDaf);

				regex=/(Ba(b|v)a Me(tz|z)ia)/ig;
				if (regex.test(sefer))
					return "" + (3028 + iDaf);

				regex=/(Ba(b|v)a Ba(th|t|s)ra)/ig;
				if (regex.test(sefer))
					return "" + (3263 + iDaf);

				regex=/(B(e?)(k|c)horo(th|t|s))/ig;
				if (regex.test(sefer))
					return "" + (4890 + iDaf);

			case 'C': case 'c':

				regex=/((C?)hag(g?)iga(h?))/ig;
				if (regex.test(sefer))
					return "" + (1531 + iDaf);

				regex=/((C?)hul(l?)in)/ig;
				if (regex.test(sefer))
					return "" + (4609 + iDaf);


			case 'E': case 'e':
				regex=/(Eru(b|v)in)/ig;
				if (regex.test(sefer))
					return "" + (438 + iDaf);

				regex=/((A|E)r((a|e)?)(k|c)hin)/ig;
				if (regex.test(sefer))
					return "" + (5009 + iDaf);

			case 'G': case 'g':

				regex=/(Git(t?)in)/ig;
				if (regex.test(sefer))
					return "" + (2452 + iDaf);

			case 'H': case 'h':

				regex=/((C?)hag(g?)iga(h?))/ig;
				if (regex.test(sefer))
					return "" + (1531 + iDaf);

				regex=/(Horayo(th|t|s))/ig;
				if (regex.test(sefer))
					return "" + (4129 + iDaf);

				regex=/((C?)hul(l?)in)/ig;
				if (regex.test(sefer))
					return "" + (4609 + iDaf);

			case 'K': case 'k':

				regex=/(K(e?)(th|t|s)u(b|v)o(th|t|s))/ig;
				if (regex.test(sefer))
					return "" + (1825 + iDaf);

				regex=/(K(e|i)d(d?)ushin)/ig;
				if (regex.test(sefer))
					return "" + (2631 + iDaf);

				regex=/(K(e?)ri(th|t|s)u(th|t|s))/ig;
				if (regex.test(sefer))
					return "" + (5139 + iDaf);

			case 'M':
				regex=/(Meg(g?)il(l?)a(h?))/ig;
				if (regex.test(sefer))
					return "" + (1415 + iDaf);

				regex=/(Moed Katan)/ig;
				if (regex.test(sefer))
					return "" + (1476 + iDaf);

				regex=/(Mak(k?)o(th|t|s))/ig;
				if (regex.test(sefer))
					return "" + (3837 + iDaf);

				regex=/(Mena(c?)hot)/ig;
				if (regex.test(sefer))
					return "" + (4392 + iDaf);

				regex=/(Meila(h?))/ig;
				if (regex.test(sefer))
					return "" + (5193 + iDaf);

			case 'N': case 'n':
				regex=/(Nedarim)/ig;
				if (regex.test(sefer))
					return "" + (2046 + iDaf);

				regex=/(Nazir)/ig;
				if (regex.test(sefer))
				return "" + (2226 + iDaf);

				regex=/(Nid(d?)a(h?))/ig;
				if (regex.test(sefer))
					return "" + (5265 + iDaf);

			case 'P': case 'p':
				regex=/(P(e?)sa(c?)him)/ig;
				if (regex.test(sefer))
					return "" + (645 + iDaf);

			case 'R': case 'r':
				regex=/(Rosh HaShana(h?))/ig;
				if (regex.test(sefer))
					return "" + (1288 + iDaf);

			case 'S': case 's':
				regex=/(Shabb(o|a)(th|t|s)|Sabbath)/ig;
				if (regex.test(sefer))
					return "" + (126 + iDaf);
		

				regex=/(Sh(e?)(k|q)alim)/ig;
				if (regex.test(sefer))
					return "" + (885 + iDaf);

				regex=/(Su(kk|cc|k|c)a(h?))/ig;
				if (regex.test(sefer))
					return "" + (1100 + iDaf);

				regex=/(Sota(h?))/ig;
				if (regex.test(sefer))
					return "" + (2356 + iDaf);

				regex=/(Sanhedrin)/ig;
				if (regex.test(sefer))
					return "" + (3613 + iDaf);

				regex=/(Sh(e?)(b|v)uo(th|t|s))/ig;
				if (regex.test(sefer))
					return "" + (3883 + iDaf);

			case 'T': case 't':
				regex=/(Ta(a?)ni(th|t|s))/ig;
				if (regex.test(sefer))
					return "" + (1356 + iDaf);

				regex=/(T(e?)mura(h?))/ig;
				if (regex.test(sefer))
					return "" + (5074 + iDaf);

			case 'Y': case 'y':
				regex=/(Yoma(h?))/ig;
				if (regex.test(sefer))
					return "" + (927 + iDaf);

				regex=/(Ye(b|v)amo(th|t|s))/ig;
				if (regex.test(sefer))
					return "" + (1582 + iDaf);


			case 'Z': case 'z':

				regex=/(Ze(b|v)a(c?)him)/ig;
				if (regex.test(sefer))
					return "" + (4154 + iDaf);

				regex=/((C?)hul(l?)in)/ig;
				if (regex.test(sefer))
					return "" + (4609 + iDaf);



		}

		return "";

	}



	function trackUrl(theText) {
		var T=theText.split(" ");
		var sefer=T[0];
		var U=T[1].split(":");
		var chapter=U[0];
		var verse=U[1];
		var newUrl;
	
		if (chapter<10)
			chapter="0"+chapter;

		var seferNum=get_tanach_simple_sefer_num(sefer);

		newUrl="http://www.mechon-mamre.org/p/pt/pt" + seferNum + chapter + ".htm#" + verse;

		return newUrl;
	}



	function trackUrlComplex(theText) {
		var T=theText.split(" ");

		var chapter;
		var verse;
		var newUrl;
		var U;

//		alert("trackUrlComplex::1::theText="+ theText);
//		alert("trackUrlComplex::1::T[0]="+ T[0]);
		switch(T[0])
		{
			case "Shmuel":
			case "Shemuel":
			case "Samuel":
			case "Melachim":
			case "Kings":
			case "Chronicles":
			case "Shir":
			case "1":
			case "I":
			case "2":
			case "II":
				var sefer=T[0] + " " + T[1];
				var U=T[2].split(":");
				break;
			case "Divrei":
			case "Song":
				var sefer=T[0] + " " + T[1] + " " + T[2];
				var U=T[3].split(":");
				break;
		}

//		alert("trackUrlComplex::1::sefer="+sefer);
		var chapter=U[0];
		var verse=U[1];
		var newUrl;

		if (chapter<10)
			chapter="0"+chapter;

		var seferNum="";
		seferNum=get_tanach_complex_sefer_num(sefer);

		newUrl="http://www.mechon-mamre.org/p/pt/pt" + seferNum + chapter + ".htm#" + verse;

		return newUrl;
	}


	function IsInteger(s) {
		for (var i = 0; i < s.length; i++) {
			var c = s.charAt(i);
			if (!((c >= "0") && (c <= "9"))) {
				return false;
			}
		}
		return true;
	}

	function trackUrlBavli(theText) {
		var T=theText.split(" ");

		var sefer;		
		var daf;

		if ( IsInteger(T[1][0]) )
		{
			sefer=T[0];
			daf=T[1];
		}
		else if (T[1]=="daf")
		{
			sefer=T[0];
			daf=T[2];
		}
		else
		{	
			sefer=T[0]+" "+T[1];
			if (T[2]=="daf")
				daf=T[3];
			else
				daf=T[2];
		}


		var newUrl;
	
//		alert("daf len=" + daf.length);
//		if (daf.length==2)
//			daf = "00"+daf;
//		else if (daf.length==3)
//			daf = "0"+daf;
//
//		var seferNum=get_bavli_simple_sefer_num(sefer);

//		newUrl="http://kodesh.snunit.k12.il/b/l/l" + seferNum + "_" + daf + ".htm";
		newUrl="http://e-daf.com/index.asp?ID=" + get_edaf_page(sefer, daf) + "&size=1";

		return newUrl;
	}



   function simpleMatch() {

    // tags we will scan looking for un-hyperlinked urls
    var allowedParents = [
        "abbr", "acronym", "address", "applet", "b", "bdo", "big", "blockquote", "body", 
        "caption", "center", "cite", "code", "dd", "del", "div", "dfn", "dt", "em", 
        "fieldset", "font", "form", "h1", "h2", "h3", "h4", "h5", "h6", "i", "iframe",
        "ins", "kdb", "li", "object", "pre", "p", "q", "samp", "small", "span", "strike", 
        "s", "strong", "sub", "sup", "td", "th", "tt", "u", "var"
        ];
    
    var xpath = "//text()[(parent::" + allowedParents.join(" or parent::") + ")" +
				//" and contains(translate(., 'HTTP', 'http'), 'http')" + 
				"]";

    var candidates = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for (var cand = null, i = 0; (cand = candidates.snapshotItem(i)); i++) {
        if (trackRegex.test(cand.nodeValue)) {
            var span = document.createElement("span");
            var source = cand.nodeValue;
            
            cand.parentNode.replaceChild(span, cand);

            trackRegex.lastIndex = 0;
            for (var match = null, lastLastIndex = 0; (match = trackRegex.exec(source)); ) {
                span.appendChild(document.createTextNode(source.substring(lastLastIndex, match.index)));

                var a = document.createElement("a");
                a.setAttribute("href", trackUrl(match[0]));
                a.appendChild(document.createTextNode(match[0]));
                span.appendChild(a);

                lastLastIndex = trackRegex.lastIndex;
            }

            span.appendChild(document.createTextNode(source.substring(lastLastIndex)));
            span.normalize();
        } // end if
    } // end for
   } // end function


   function complexMatch() {

    // tags we will scan looking for un-hyperlinked urls
    var allowedParents = [
        "abbr", "acronym", "address", "applet", "b", "bdo", "big", "blockquote", "body", 
        "caption", "center", "cite", "code", "dd", "del", "div", "dfn", "dt", "em", 
        "fieldset", "font", "form", "h1", "h2", "h3", "h4", "h5", "h6", "i", "iframe",
        "ins", "kdb", "li", "object", "pre", "p", "q", "samp", "small", "span", "strike", 
        "s", "strong", "sub", "sup", "td", "th", "tt", "u", "var"
        ];
    
    var xpath = "//text()[(parent::" + allowedParents.join(" or parent::") + ")" +
				//" and contains(translate(., 'HTTP', 'http'), 'http')" + 
				"]";

    var candidates = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for (var cand = null, i = 0; (cand = candidates.snapshotItem(i)); i++) {
        if (trackRegexComplex.test(cand.nodeValue)) {
            var span = document.createElement("span");
            var source = cand.nodeValue;
            
            cand.parentNode.replaceChild(span, cand);

            trackRegexComplex.lastIndex = 0;
            for (var match = null, lastLastIndex = 0; (match = trackRegexComplex.exec(source)); ) {
                span.appendChild(document.createTextNode(source.substring(lastLastIndex, match.index)));


//		alert(match);
                var a = document.createElement("a");

                a.setAttribute("href", trackUrlComplex(match[0]));
                a.appendChild(document.createTextNode(match[0]));
                span.appendChild(a);

                lastLastIndex = trackRegexComplex.lastIndex;
            }

            span.appendChild(document.createTextNode(source.substring(lastLastIndex)));
            span.normalize();
        } // end if
    } // end for
   } // end function


   function bavliMatch() {

//	alert(1);
    // tags we will scan looking for un-hyperlinked urls
    var allowedParents = [
        "abbr", "acronym", "address", "applet", "b", "bdo", "big", "blockquote", "body", 
        "caption", "center", "cite", "code", "dd", "del", "div", "dfn", "dt", "em", 
        "fieldset", "font", "form", "h1", "h2", "h3", "h4", "h5", "h6", "i", "iframe",
        "ins", "kdb", "li", "object", "pre", "p", "q", "samp", "small", "span", "strike", 
        "s", "strong", "sub", "sup", "td", "th", "tt", "u", "var"
        ];
    
    var xpath = "//text()[(parent::" + allowedParents.join(" or parent::") + ")" +
				//" and contains(translate(., 'HTTP', 'http'), 'http')" + 
				"]";

    var candidates = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for (var cand = null, i = 0; (cand = candidates.snapshotItem(i)); i++) {
        if (trackRegexBavli.test(cand.nodeValue)) {
            var span = document.createElement("span");
            var source = cand.nodeValue;

//		alert(match);            
            cand.parentNode.replaceChild(span, cand);

            trackRegexBavli.lastIndex = 0;
            for (var match = null, lastLastIndex = 0; (match = trackRegexBavli.exec(source)); ) {
                span.appendChild(document.createTextNode(source.substring(lastLastIndex, match.index)));

                var a = document.createElement("a");
//		alert(match);
                a.setAttribute("href", trackUrlBavli(match[0]));
                a.appendChild(document.createTextNode(match[0]));
                span.appendChild(a);

/*		var c = document.createElement('a');
		c.setAttribute('href', 'http://moo.yahoo.com');
		c.appendChild(document.createTextNode('[s]'));
		a.parentNode.insertBefore(c, a.nextSibling);
		a.parentNode.insertBefore(document.createTextNode(' '), a.nextSibling);
*/
                lastLastIndex = trackRegexBavli.lastIndex;
            }

            span.appendChild(document.createTextNode(source.substring(lastLastIndex)));
            span.normalize();
        } // end if
    } // end for
   } // end function


   simpleMatch();
   complexMatch();
   bavliMatch();
})();


