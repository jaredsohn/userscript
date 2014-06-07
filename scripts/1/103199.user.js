// ==UserScript==
// @name			ChessGameTransporter
// @description		Provides Export links that will open chessgames.com and fill it with the PGN
// @namespace		PimpNation
// @version			1.2
// @include			http://www.365chess.com/tournaments/*
// @include			http://www.chessgames.com/perl/chessupload
// ==/UserScript==

function getCountry ( tCode ) {
	switch ( tCode ) {
		case "ac": return "Ascension Island";
		case "ad": return "Andorra";
		case "ae": return "United Arab Emirates";
		case "af": return "Afghanistan";
		case "ag": return "Antigua and Barbuda";
		case "ai": return "Anguilla";
		case "al": return "Albania";
		case "am": return "Armenia";
		case "an": return "Netherlands Antilles";
		case "ao": return "Angola";
		case "aq": return "Antarctica";
		case "ar": return "Argentina";
		case "as": return "American Samoa";
		case "at": return "Austria";
		case "au": return "Australia";
		case "aw": return "Aruba";
		case "ax": return "Aland Islands";
		case "az": return "Azerbaijan";
		case "ba": return "Bosnia and Herzegovina";
		case "bb": return "Barbados";
		case "bd": return "Bangladesh";
		case "be": return "Belgium";
		case "bf": return "Burkina Faso";
		case "bg": return "Bulgaria";
		case "bh": return "Bahrain";
		case "bi": return "Burundi";
		case "bj": return "Benin";
		case "bm": return "Bermuda";
		case "bn": return "Brunei Darussalam";
		case "bo": return "Bolivia";
		case "br": return "Brazil";
		case "bs": return "Bahamas";
		case "bt": return "Bhutan";
		case "bv": return "Bouvet Island";
		case "bw": return "Botswana";
		case "by": return "Belarus";
		case "bz": return "Belize";
		case "ca": return "Canada";
		case "cc": return "Cocos (Keeling) Islands";
		case "cd": return "Congo, Democratic Republic";
		case "cf": return "Central African Republic";
		case "cg": return "Congo";
		case "ch": return "Switzerland";
		case "ci": return "Cote D'Ivoire (Ivory Coast)";
		case "ck": return "Cook Islands";
		case "cl": return "Chile";
		case "cm": return "Cameroon";
		case "cn": return "China";
		case "co": return "Colombia";
		case "cr": return "Costa Rica";
		case "cs": return "Czechoslovakia (former)";
		case "cu": return "Cuba";
		case "cv": return "Cape Verde";
		case "cx": return "Christmas Island";
		case "cy": return "Cyprus";
		case "cz": return "Czech Republic";
		case "de": return "Germany";
		case "dj": return "Djibouti";
		case "dk": return "Denmark";
		case "dm": return "Dominica";
		case "do": return "Dominican Republic";
		case "dz": return "Algeria";
		case "ec": return "Ecuador";
		case "ee": return "Estonia";
		case "eg": return "Egypt";
		case "eh": return "Western Sahara";
		case "er": return "Eritrea";
		case "es": return "Spain";
		case "et": return "Ethiopia";
		case "eu": return "European Union";
		case "fi": return "Finland";
		case "fj": return "Fiji";
		case "fk": return "Falkland Islands (Malvinas)";
		case "fm": return "Micronesia";
		case "fo": return "Faroe Islands";
		case "fr": return "France";
		case "fx": return "France, Metropolitan";
		case "ga": return "Gabon";
		case "gb": return "Great Britain (UK)";
		case "gd": return "Grenada";
		case "ge": return "Georgia";
		case "gf": return "French Guiana";
		case "gg": return "Guernsey";
		case "gh": return "Ghana";
		case "gi": return "Gibraltar";
		case "gl": return "Greenland";
		case "gm": return "Gambia";
		case "gn": return "Guinea";
		case "gp": return "Guadeloupe";
		case "gq": return "Equatorial Guinea";
		case "gr": return "Greece";
		case "gs": return "S. Georgia and S. Sandwich Isls.";
		case "gt": return "Guatemala";
		case "gu": return "Guam";
		case "gw": return "Guinea-Bissau";
		case "gy": return "Guyana";
		case "hk": return "Hong Kong";
		case "hm": return "Heard and McDonald Islands";
		case "hn": return "Honduras";
		case "hr": return "Croatia (Hrvatska)";
		case "ht": return "Haiti";
		case "hu": return "Hungary";
		case "id": return "Indonesia";
		case "ie": return "Ireland";
		case "il": return "Israel";
		case "im": return "Isle of Man";
		case "in": return "India";
		case "io": return "British Indian Ocean Territory";
		case "iq": return "Iraq";
		case "ir": return "Iran";
		case "is": return "Iceland";
		case "it": return "Italy";
		case "je": return "Jersey";
		case "jm": return "Jamaica";
		case "jo": return "Jordan";
		case "jp": return "Japan";
		case "ke": return "Kenya";
		case "kg": return "Kyrgyzstan";
		case "kh": return "Cambodia";
		case "ki": return "Kiribati";
		case "km": return "Comoros";
		case "kn": return "Saint Kitts and Nevis";
		case "kp": return "Korea (North)";
		case "kr": return "Korea (South)";
		case "kw": return "Kuwait";
		case "ky": return "Cayman Islands";
		case "kz": return "Kazakhstan";
		case "la": return "Laos";
		case "lb": return "Lebanon";
		case "lc": return "Saint Lucia";
		case "li": return "Liechtenstein";
		case "lk": return "Sri Lanka";
		case "lr": return "Liberia";
		case "ls": return "Lesotho";
		case "lt": return "Lithuania";
		case "lu": return "Luxembourg";
		case "lv": return "Latvia";
		case "ly": return "Libya";
		case "ma": return "Morocco";
		case "mc": return "Monaco";
		case "md": return "Moldova";
		case "me": return "Montenegro";
		case "mf": return "Saint Martin";
		case "mg": return "Madagascar";
		case "mh": return "Marshall Islands";
		case "mk": return "F.Y.R.O.M. (Macedonia)";
		case "ml": return "Mali";
		case "mm": return "Myanmar";
		case "mn": return "Mongolia";
		case "mo": return "Macau";
		case "mp": return "Northern Mariana Islands";
		case "mq": return "Martinique";
		case "mr": return "Mauritania";
		case "ms": return "Montserrat";
		case "mt": return "Malta";
		case "mu": return "Mauritius";
		case "mv": return "Maldives";
		case "mw": return "Malawi";
		case "mx": return "Mexico";
		case "my": return "Malaysia";
		case "mz": return "Mozambique";
		case "na": return "Namibia";
		case "nc": return "New Caledonia";
		case "ne": return "Niger";
		case "nf": return "Norfolk Island";
		case "ng": return "Nigeria";
		case "ni": return "Nicaragua";
		case "nl": return "Netherlands";
		case "no": return "Norway";
		case "np": return "Nepal";
		case "nr": return "Nauru";
		case "nt": return "Neutral Zone";
		case "nu": return "Niue";
		case "nz": return "New Zealand (Aotearoa)";
		case "om": return "Oman";
		case "pa": return "Panama";
		case "pe": return "Peru";
		case "pf": return "French Polynesia";
		case "pg": return "Papua New Guinea";
		case "ph": return "Philippines";
		case "pk": return "Pakistan";
		case "pl": return "Poland";
		case "pm": return "St. Pierre and Miquelon";
		case "pn": return "Pitcairn";
		case "pr": return "Puerto Rico";
		case "ps": return "Palestinian Territory, Occupied";
		case "pt": return "Portugal";
		case "pw": return "Palau";
		case "py": return "Paraguay";
		case "qa": return "Qatar";
		case "re": return "Reunion";
		case "rs": return "Serbia";
		case "ro": return "Romania";
		case "ru": return "Russian Federation";
		case "rw": return "Rwanda";
		case "sa": return "Saudi Arabia";
		case "sb": return "Solomon Islands";
		case "sc": return "Seychelles";
		case "sd": return "Sudan";
		case "se": return "Sweden";
		case "sg": return "Singapore";
		case "sh": return "St. Helena";
		case "si": return "Slovenia";
		case "sj": return "Svalbard & Jan Mayen Islands";
		case "sk": return "Slovak Republic";
		case "sl": return "Sierra Leone";
		case "sm": return "San Marino";
		case "sn": return "Senegal";
		case "so": return "Somalia";
		case "sr": return "Suriname";
		case "st": return "Sao Tome and Principe";
		case "su": return "USSR (former)";
		case "sv": return "El Salvador";
		case "sy": return "Syria";
		case "sz": return "Swaziland";
		case "tc": return "Turks and Caicos Islands";
		case "td": return "Chad";
		case "tf": return "French Southern Territories";
		case "tg": return "Togo";
		case "th": return "Thailand";
		case "tj": return "Tajikistan";
		case "tk": return "Tokelau";
		case "tm": return "Turkmenistan";
		case "tn": return "Tunisia";
		case "to": return "Tonga";
		case "tp": return "East Timor";
		case "tr": return "Turkey";
		case "tt": return "Trinidad and Tobago";
		case "tv": return "Tuvalu";
		case "tw": return "Taiwan";
		case "tz": return "Tanzania";
		case "ua": return "Ukraine";
		case "ug": return "Uganda";
		case "en":
		case "uk": return "United Kingdom";
		case "um": return "US Minor Outlying Islands";
		case "us": return "United States";
		case "uy": return "Uruguay";
		case "uz": return "Uzbekistan";
		case "va": return "Vatican City State (Holy See)";
		case "vc": return "Saint Vincent & the Grenadines";
		case "ve": return "Venezuela";
		case "vg": return "British Virgin Islands";
		case "vi": return "Virgin Islands (U.S.)";
		case "vn": return "Viet Nam";
		case "vu": return "Vanuatu";
		case "wf": return "Wallis and Futuna Islands";
		case "ws": return "Samoa";
		case "xk": return "Kosovo";
		case "ye": return "Yemen";
		case "yt": return "Mayotte";
		case "yu": return "Serbia and Montenegro (former Yugoslavia)";
		case "za": return "South Africa";
		case "zm": return "Zambia";
		case "zr": return "Zaire";
		case "zw": return "Zimbabwe";
		default: return "?";
	}
}

function xpath(query/*, object*/) { // Searches object (or document) for string/regex, returing a list of nodes that satisfy the string/regex
	//if(!object) var object = document;
	return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function exportGame(e) {
	var gameNum = parseInt(e.target.getAttribute("gamenum"));
	var tAuto = parseInt(e.target.getAttribute("auto"));
	var theGame = unsafeWindow.g[gameNum];
	var theMoves = theGame['p'].replace(/\.\s*/g,".").replace(/\s\s/g, " ");
	theMoves = theMoves.split(" ");
	var tResult = theMoves[theMoves.length-1];
	theMoves[theMoves.length-1] = " " + theMoves[theMoves.length-1];
	theMoves = theMoves.join(" ").split(".");
	var tM,k,i,t,p;
	for ( i = 4, k = theMoves.length-1 ; i < k ; i += 4 ) {
		tM = theMoves[i].split("");
		for ( t = tM.length-1 ; tM[t] != " " ; --t );
		tM[t] = "\n";
		theMoves[i] = tM.join("");
	}
	theMoves = theMoves.join(".");
	var tWhiteELO = ( (typeof(theELOs[theGame['wl']]) == "undefined") ? "?" : theELOs[theGame['wl']]);
	var tBlackELO = ( (typeof(theELOs[theGame['bl']]) == "undefined") ? "?" : theELOs[theGame['bl']]);	
	var tStr = '[Event "'+tEvent+'"]\n[Site "'+tCity+', '+tCountry+'"]\n[Date "'+tYear+'.??.??"]\n[EventDate "?"]\n[Round "'+e.target.getAttribute("round")+'"]\n[Result "'+tResult+'"]\n[White "'+theGame['wl']+'"]\n[Black "'+theGame['bl']+'"]\n[ECO "'+theGame['e']+'"]\n[WhiteElo "'+tWhiteELO+'"]\n[BlackElo "'+tBlackELO+'"]\n\n'+theMoves;
	GM_setValue("PGN", tStr);
	GM_setValue("AUTO", (tAuto==1?true:false) );
	window.open("http://www.chessgames.com/perl/chessupload");
}

if ( window.location.href.indexOf("365") > -1 ) {  // At 365Chess.com
	var theRows = document.getElementsByClassName("stable");
	if ( theRows.length < 1 || theRows.length > 2 ) return; // Wrong page?
	var isPageOne = true;
	if ( theRows.length == 1 ) {
		theRows = theRows[0].getElementsByTagName("tr");
		isPageOne = false;
	} else {
		var theEs = theRows[0].getElementsByTagName("tr");
		theRows = theRows[1].getElementsByTagName("tr");
	}
	var tMain = document.getElementById("main3");
	if ( theRows.length < 2 || tMain == null ) return; // there must be at least one game, and a title for the tournament.
	var tD1,tD2,tA, tC,i,k,theELOs = new Object();
	var tCity = tMain.innerHTML.split(";");
	tCity = tCity[tCity.length-1].split(" ");
	var tYear = parseInt(tCity.splice(-1,1));
	if ( isNaN ( tYear ) ) tYear = "?";
	tCity = tCity.join(" ");
	if ( tCity == "" || tCity == " " || tCity == "  " || tCity == "   " ) tCity = "?";
	var tEvent = tMain.getElementsByTagName('h1')[0].innerHTML;
	if ( tEvent == "" || tEvent == " " || tEvent == "  " ) tEvent = "?";
	var tCountry = tMain.getElementsByTagName("img");
	if ( tCountry.length > 0 ) {
		tCountry = tCountry[0].getAttribute("src").split("/");
		tCountry = getCountry(tCountry[tCountry.length-1].replace(".gif","").replace(".jpg","").replace(".png",""));
	} else tCountry = "?";
	if ( isPageOne ) {
		for ( i = 1, k = theEs.length ; i < k ; ++i ) { //Collect the ELOs
			tD = theEs[i].getElementsByTagName("td");
			if ( tD.length < 4 ) continue;
			tA = tD[3].innerHTML;
			theELOs[tD[2].getElementsByTagName("a")[0].innerHTML] = tA == "" ? "?" : tA;
		}
		GM_setValue ("ELO", tEvent + "|" + tCity + "|" + tYear + "|" + theELOs.toSource() );
	} else {
		theELOs = GM_getValue("ELO", "");
		if ( theELOs != "" ) {
			theELOs = theELOs.split("|");
			if ( theELOs[0] == tEvent && theELOs[1] == tCity && theELOs[2] == tYear ) theELOs = eval(theELOs[3]);
			else theELOs = new Object();
		} else theELOs = new Object();
	}
	for ( i = 1, k = theRows.length ; i < k ; ++i ) {// add the button to export game
		tD1 = document.createElement("td");
		tA = document.createElement("a");
		tA.setAttribute("href", "javascript:void(0);");
		tC = theRows[i].getElementsByTagName("td");
		if ( tC.length < 1 ) continue;
		tA.setAttribute("round", tC[3].innerHTML);
		tA.setAttribute("auto", 0);
		tC = tC[tC.length-1].getElementsByTagName("a")[0];
		tA.setAttribute("gamenum", parseInt(tC.getAttribute("onclick").split("(")[1]) );
		tA.addEventListener("click", exportGame, false);
		tA.innerHTML = "Export";
		tD1.appendChild(tA);
		
		tD2 = document.createElement("td");
		tA = document.createElement("a");
		tA.setAttribute("href", "javascript:void(0);");
		tC = theRows[i].getElementsByTagName("td");
		if ( tC.length < 1 ) continue;
		tA.setAttribute("round", tC[3].innerHTML);
		tA.setAttribute("auto", 1);
		tC = tC[tC.length-1].getElementsByTagName("a")[0];
		tA.setAttribute("gamenum", parseInt(tC.getAttribute("onclick").split("(")[1]) );
		tA.addEventListener("click", exportGame, false);
		tA.innerHTML = "Auto Export";
		tD2.appendChild(tA);
		
		theRows[i].appendChild(tD1);
		theRows[i].appendChild(document.createElement("td"));
		theRows[i].appendChild(tD2);
	}
} else if ( window.location.href.indexOf("chessupload") > -1 ) {
	var tPGN = GM_getValue("PGN","");
	var tSubmit = GM_getValue("SUBMIT", false);
	var tAuto = GM_getValue("AUTO",false);
	GM_deleteValue("AUTO");
	GM_deleteValue("SUBMIT");
	GM_deleteValue("PGN");
	if ( tSubmit ) {
		tD = xpath ("//table/tbody/tr/td/font");
		if ( tD.snapshotLength > 1 && tD.snapshotItem(0).innerHTML.indexOf("SUBMITTED") > -1 ) window.close();
		return;
	}
	var tD = document.getElementsByName("pgn");
	if ( tD.length < 1 || tPGN == "" ) return;
	tD[0].value = tPGN;
	if ( tAuto ) {
		var i, k;
		tD = document.getElementsByTagName("input");
		for ( i = 0, k = tD.length ; i < k && tD[i].type.toLowerCase() != "submit" ; ++i ) ;
		if ( i < k ) {
			GM_setValue("SUBMIT", true);
			tD[i].click();
		}
	}
}
/*
[Event "London Match"]
[Site "London, England"]
[Date "1866.??.??"]
[EventDate "?"]
[Round "6"]
[Result "0-1"]
[White "Bird, Henry E"]
[Black "Steinitz, Wilhelm"]
[ECO "A02"]
[WhiteElo "?"]
[BlackElo "?"]

1.f4 e5 2.fxe5 d6 3.exd6 Bxd6 4.Nf3 Nf6
5.d4 Nc6 6.Bg5 Bg4 7.e3 Qd7 8.Bxf6 gxf6
9.Bb5 O-O-O 10.d5 Qe7 11.Bxc6 Qxe3+ 12.Qe2 Qc1+
13.Qd1 Rde8+ 14.Bxe8 Rxe8+ 15.Kf2 Qe3+ 16.Kf1 Bxf3
17.gxf3 Bc5 18.Kg2 Rg8+  0-1  */