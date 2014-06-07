// ==UserScript==
// @name           Rate Your Music Listened to Countries
// @namespace      http://www.google.com/search?q=brtkrbzhnv
// @description    Adds a map where the countries you've listened to music from are highlighted
// @include        http://rateyourmusic.com/musicmap/*
// @include        http://www.rateyourmusic.com/musicmap/*
// ==/UserScript==
var tW = "[World]";
var tU = "[USA]";
main();
function main() {
	var s = document.getElementById("content").getElementsByTagName("script")[2].innerHTML;
	var p = document.getElementById("breadcrumb").parentNode;
	addButton(tW, p, addWorldMap(s, p));
	addButton(tU, p, addUSMap(s, p));
}

function addButton(t, p, f) {
	p.appendChild(d = document.createElement("div"), d.innerHTML = t, d.setAttribute("id", t), d.addEventListener("click", f, false), d);
}

function addUSMap(s, p) {
	return function() {
		var ulist = "";
		ulist = ulist + '|' + "AK";
		ulist = ulist + '|' + "AL";
		ulist = ulist + '|' + "AR";
		ulist = ulist + '|' + "AS";
		ulist = ulist + '|' + "AZ";
		ulist = ulist + '|' + "CA";
		ulist = ulist + '|' + "CO";
		ulist = ulist + '|' + "CT";
		ulist = ulist + '|' + "DC";
		ulist = ulist + '|' + "DE";
		ulist = ulist + '|' + "FL";
		ulist = ulist + '|' + "GA";
		ulist = ulist + '|' + "GU";
		ulist = ulist + '|' + "HI";
		ulist = ulist + '|' + "IA";
		ulist = ulist + '|' + "ID";
		ulist = ulist + '|' + "IL";
		ulist = ulist + '|' + "IN";
		ulist = ulist + '|' + "KS";
		ulist = ulist + '|' + "KY";
		ulist = ulist + '|' + "LA";
		ulist = ulist + '|' + "MA";
		ulist = ulist + '|' + "MD";
		ulist = ulist + '|' + "ME";
		ulist = ulist + '|' + "MI";
		ulist = ulist + '|' + "MN";
		ulist = ulist + '|' + "MO";
		ulist = ulist + '|' + "MP";
		ulist = ulist + '|' + "MS";
		ulist = ulist + '|' + "MT";
		ulist = ulist + '|' + "NC";
		ulist = ulist + '|' + "ND";
		ulist = ulist + '|' + "NE";
		ulist = ulist + '|' + "NH";
		ulist = ulist + '|' + "NJ";
		ulist = ulist + '|' + "NM";
		ulist = ulist + '|' + "NV";
		ulist = ulist + '|' + "NY";
		ulist = ulist + '|' + "OH";
		ulist = ulist + '|' + "OK";
		ulist = ulist + '|' + "OR";
		ulist = ulist + '|' + "PA";
		ulist = ulist + '|' + "PR";
		ulist = ulist + '|' + "RI";
		ulist = ulist + '|' + "SC";
		ulist = ulist + '|' + "SD";
		ulist = ulist + '|' + "TN";
		ulist = ulist + '|' + "TX";
		//ulist = ulist + '|' + "UM";
		ulist = ulist + '|' + "UT";
		ulist = ulist + '|' + "VA";
		ulist = ulist + '|' + "VI";
		ulist = ulist + '|' + "VT";
		ulist = ulist + '|' + "WA";
		ulist = ulist + '|' + "WI";
		ulist = ulist + '|' + "WV";
		ulist = ulist + '|' + "WY";
		
		var uid = new Array();
		uid["AK"] = "Alaska";
		uid["AL"] = "Alabama";
		uid["AR"] = "Arkansas";
		uid["AZ"] = "Arizona";
		uid["CA"] = "California";
		uid["CO"] = "Colorado";
		uid["CT"] = "Connecticut";
		uid["DC"] = "District of Columbia";
		uid["DE"] = "Delaware";
		uid["FL"] = "Florida";
		uid["GA"] = "Georgia";
		uid["HI"] = "Hawaii";
		uid["IA"] = "Iowa";
		uid["ID"] = "Idaho";
		uid["IL"] = "Illinois";
		uid["IN"] = "Indiana";
		uid["KS"] = "Kansas";
		uid["KY"] = "Kentucky";
		uid["LA"] = "Louisiana";
		uid["MA"] = "Massachusetts";
		uid["MD"] = "Maryland";
		uid["ME"] = "Maine";
		uid["MI"] = "Michigan";
		uid["MN"] = "Minnesota";
		uid["MO"] = "Missouri";
		uid["MS"] = "Mississippi";
		uid["MT"] = "Montana";
		uid["NC"] = "North Carolina";
		uid["ND"] = "North Dakota";
		uid["NE"] = "Nebraska";
		uid["NH"] = "New Hampshire";
		uid["NJ"] = "New Jersey";
		uid["NM"] = "New Mexico";
		uid["NV"] = "Nevada";
		uid["NY"] = "New York";
		uid["OH"] = "Ohio";
		uid["OK"] = "Oklahoma";
		uid["OR"] = "Oregon";
		uid["PA"] = "Pennsylvania";
		uid["RI"] = "Rhode Island";
		uid["SC"] = "South Carolina";
		uid["SD"] = "South Dakota";
		uid["TN"] = "Tennessee";
		uid["TX"] = "Texas";
		uid["UT"] = "Utah";
		uid["VA"] = "Virginia";
		uid["VT"] = "Vermont";
		uid["WA"] = "Washington";
		uid["WI"] = "Wisconsin";
		uid["WV"] = "West Virginia";
		uid["WY"] = "Wyoming";
		
		
		s = s.substr(s.indexOf("var point")).replace(/var\ point.*;/g, "").replace(/var\ markerText.*\;\">/g, "").replace(/<hr.*;/g, "|");
		s = s.replace(/var.*/g, "").replace(/\n/g, "").replace(/\s+/g, " ").replace(/map.+;/, " ").replace(/func.*\/\//, "").replace(/]].*/, "");
		s = s.replace(/\| /g, '\n').replace(/^\ /, "");
		var u = "";
		while((i = s.indexOf(", US")) >= 0) {
			var c = s.substr(i - 2, 2);
			if(u.indexOf(c) < 0) {
				u = u + "|" + c;
				ulist = remove(ulist, c);
			}
			s = s.substr(i + 1);
		}
		
		ulist = ulist.replace(/\W/g, "");
		
		var txt = "";
		for(var i = 0; i + 2 < ulist.length; i = i + 2) {
			var c = ulist.substr(i, 2);
			txt = txt + "<br />" + uid[c];
		}
		div  = document.createElement("div");
		div.innerHTML = "Missing states:" + txt + "<br />";
		(p = (document.getElementById(tU))).parentNode.insertBefore(div, p)
		rm(p);
		
		
		u = u.replace(/\|/, "");
		addMap("http://www.world66.com/myworld66/visitedStates/statemap?visited=", u, div);
	};
}

function makeUnique(s) {
	var u = "";
	for(var i = 0;i + 2 <= s.length; i+=2) {
		var c = s.substr(i, 2) + "|";
		if(u.indexOf(c) < 0) {
			u += c;
		}
	}	
	return u;
}

function addWorldMap(s, p) {
	return function() {
		var wlist = "";
		wlist = wlist + '|' + "AD";

		wlist = wlist + '|' + "AE";

		wlist = wlist + '|' + "AF";

		wlist = wlist + '|' + "AG";

		wlist = wlist + '|' + "AI";

		wlist = wlist + '|' + "AL";

		wlist = wlist + '|' + "AM";

		wlist = wlist + '|' + "AN";

		wlist = wlist + '|' + "AO";

		//wlist = wlist + '|' + "AQ";

		wlist = wlist + '|' + "AR";

		wlist = wlist + '|' + "AS";

		wlist = wlist + '|' + "AT";

		wlist = wlist + '|' + "AU";

		wlist = wlist + '|' + "AW";

		wlist = wlist + '|' + "AX";

		wlist = wlist + '|' + "AZ";

		wlist = wlist + '|' + "BA";

		wlist = wlist + '|' + "BB";

		wlist = wlist + '|' + "BD";

		wlist = wlist + '|' + "BE";

		wlist = wlist + '|' + "BF";

		wlist = wlist + '|' + "BG";

		wlist = wlist + '|' + "BH";

		wlist = wlist + '|' + "BI";

		wlist = wlist + '|' + "BJ";

		wlist = wlist + '|' + "BL";

		wlist = wlist + '|' + "BM";

		wlist = wlist + '|' + "BN";

		wlist = wlist + '|' + "BO";

		wlist = wlist + '|' + "BR";

		wlist = wlist + '|' + "BS";

		wlist = wlist + '|' + "BT";

		wlist = wlist + '|' + "BV";

		wlist = wlist + '|' + "BW";

		wlist = wlist + '|' + "BY";

		wlist = wlist + '|' + "BZ";

		wlist = wlist + '|' + "CA";

		wlist = wlist + '|' + "CC";

		wlist = wlist + '|' + "CD";

		wlist = wlist + '|' + "CF";

		wlist = wlist + '|' + "CG";

		wlist = wlist + '|' + "CH";

		wlist = wlist + '|' + "CI";

		wlist = wlist + '|' + "CK";

		wlist = wlist + '|' + "CL";

		wlist = wlist + '|' + "CM";

		wlist = wlist + '|' + "CN";

		wlist = wlist + '|' + "CO";

		wlist = wlist + '|' + "CR";

		wlist = wlist + '|' + "CU";

		wlist = wlist + '|' + "CV";

		wlist = wlist + '|' + "CX";

		wlist = wlist + '|' + "CY";

		wlist = wlist + '|' + "CZ";

		wlist = wlist + '|' + "DE";

		wlist = wlist + '|' + "DJ";

		wlist = wlist + '|' + "DK";

		wlist = wlist + '|' + "DM";

		wlist = wlist + '|' + "DO";

		wlist = wlist + '|' + "DZ";

		wlist = wlist + '|' + "EC";

		wlist = wlist + '|' + "EE";

		wlist = wlist + '|' + "EG";

		wlist = wlist + '|' + "EH";

		wlist = wlist + '|' + "ER";

		wlist = wlist + '|' + "ES";

		wlist = wlist + '|' + "ET";

		wlist = wlist + '|' + "FI";

		wlist = wlist + '|' + "FJ";

		wlist = wlist + '|' + "FK";

		wlist = wlist + '|' + "FM";

		wlist = wlist + '|' + "FO";

		wlist = wlist + '|' + "FR";

		wlist = wlist + '|' + "GA";

		wlist = wlist + '|' + "GB";

		wlist = wlist + '|' + "GD";

		wlist = wlist + '|' + "GE";

		wlist = wlist + '|' + "GF";

		wlist = wlist + '|' + "GG";

		wlist = wlist + '|' + "GH";

		wlist = wlist + '|' + "GI";

		wlist = wlist + '|' + "GL";

		wlist = wlist + '|' + "GM";

		wlist = wlist + '|' + "GN";

		wlist = wlist + '|' + "GP";

		wlist = wlist + '|' + "GQ";

		wlist = wlist + '|' + "GR";

		wlist = wlist + '|' + "GS";

		wlist = wlist + '|' + "GT";

		wlist = wlist + '|' + "GU";

		wlist = wlist + '|' + "GW";

		wlist = wlist + '|' + "GY";

		wlist = wlist + '|' + "HK";

		wlist = wlist + '|' + "HM";

		wlist = wlist + '|' + "HN";

		wlist = wlist + '|' + "HR";

		wlist = wlist + '|' + "HT";

		wlist = wlist + '|' + "HU";

		wlist = wlist + '|' + "ID";

		wlist = wlist + '|' + "IE";

		wlist = wlist + '|' + "IL";

		wlist = wlist + '|' + "IM";

		wlist = wlist + '|' + "IN";

		wlist = wlist + '|' + "IO";

		wlist = wlist + '|' + "IQ";

		wlist = wlist + '|' + "IR";

		wlist = wlist + '|' + "IS";

		wlist = wlist + '|' + "IT";

		wlist = wlist + '|' + "JE";

		wlist = wlist + '|' + "JM";

		wlist = wlist + '|' + "JO";

		wlist = wlist + '|' + "JP";

		wlist = wlist + '|' + "KE";

		wlist = wlist + '|' + "KG";

		wlist = wlist + '|' + "KH";

		wlist = wlist + '|' + "KI";

		wlist = wlist + '|' + "KM";

		wlist = wlist + '|' + "KN";

		wlist = wlist + '|' + "KP";

		wlist = wlist + '|' + "KR";

		wlist = wlist + '|' + "KW";

		wlist = wlist + '|' + "KY";

		wlist = wlist + '|' + "KZ";

		wlist = wlist + '|' + "LA";

		wlist = wlist + '|' + "LB";

		wlist = wlist + '|' + "LC";

		wlist = wlist + '|' + "LI";

		wlist = wlist + '|' + "LK";

		wlist = wlist + '|' + "LR";

		wlist = wlist + '|' + "LS";

		wlist = wlist + '|' + "LT";

		wlist = wlist + '|' + "LU";

		wlist = wlist + '|' + "LV";

		wlist = wlist + '|' + "LY";

		wlist = wlist + '|' + "MA";

		wlist = wlist + '|' + "MC";

		wlist = wlist + '|' + "MD";

		wlist = wlist + '|' + "ME";

		wlist = wlist + '|' + "MF";

		wlist = wlist + '|' + "MG";

		wlist = wlist + '|' + "MH";

		wlist = wlist + '|' + "MK";

		wlist = wlist + '|' + "ML";

		wlist = wlist + '|' + "MM";

		wlist = wlist + '|' + "MN";

		wlist = wlist + '|' + "MO";

		wlist = wlist + '|' + "MP";

		wlist = wlist + '|' + "MQ";

		wlist = wlist + '|' + "MR";

		wlist = wlist + '|' + "MS";

		wlist = wlist + '|' + "MT";

		wlist = wlist + '|' + "MU";

		wlist = wlist + '|' + "MV";

		wlist = wlist + '|' + "MW";

		wlist = wlist + '|' + "MX";

		wlist = wlist + '|' + "MY";

		wlist = wlist + '|' + "MZ";

		wlist = wlist + '|' + "NA";

		wlist = wlist + '|' + "NC";

		wlist = wlist + '|' + "NE";

		wlist = wlist + '|' + "NF";

		wlist = wlist + '|' + "NG";

		wlist = wlist + '|' + "NI";

		wlist = wlist + '|' + "NL";

		wlist = wlist + '|' + "NO";

		wlist = wlist + '|' + "NP";

		wlist = wlist + '|' + "NR";

		wlist = wlist + '|' + "NU";

		wlist = wlist + '|' + "NZ";

		wlist = wlist + '|' + "OM";

		wlist = wlist + '|' + "PA";

		wlist = wlist + '|' + "PE";

		wlist = wlist + '|' + "PF";

		wlist = wlist + '|' + "PG";

		wlist = wlist + '|' + "PH";

		wlist = wlist + '|' + "PK";

		wlist = wlist + '|' + "PL";

		wlist = wlist + '|' + "PM";

		wlist = wlist + '|' + "PN";

		wlist = wlist + '|' + "PR";

		wlist = wlist + '|' + "PS";

		wlist = wlist + '|' + "PT";

		wlist = wlist + '|' + "PW";

		wlist = wlist + '|' + "PY";

		wlist = wlist + '|' + "QA";

		wlist = wlist + '|' + "RE";

		wlist = wlist + '|' + "RO";

		wlist = wlist + '|' + "RS";

		wlist = wlist + '|' + "RU";

		wlist = wlist + '|' + "RW";

		wlist = wlist + '|' + "SA";

		wlist = wlist + '|' + "SB";

		wlist = wlist + '|' + "SC";

		wlist = wlist + '|' + "SD";

		wlist = wlist + '|' + "SE";

		wlist = wlist + '|' + "SG";

		wlist = wlist + '|' + "SH";

		wlist = wlist + '|' + "SI";

		wlist = wlist + '|' + "SJ";

		wlist = wlist + '|' + "SK";

		wlist = wlist + '|' + "SL";

		wlist = wlist + '|' + "SM";

		wlist = wlist + '|' + "SN";

		wlist = wlist + '|' + "SO";

		wlist = wlist + '|' + "SR";

		wlist = wlist + '|' + "ST";

		wlist = wlist + '|' + "SV";

		wlist = wlist + '|' + "SY";

		wlist = wlist + '|' + "SZ";

		wlist = wlist + '|' + "TC";

		wlist = wlist + '|' + "TD";

		//wlist = wlist + '|' + "TF";

		wlist = wlist + '|' + "TG";

		wlist = wlist + '|' + "TH";

		wlist = wlist + '|' + "TJ";

		wlist = wlist + '|' + "TK";

		wlist = wlist + '|' + "TL";

		wlist = wlist + '|' + "TM";

		wlist = wlist + '|' + "TN";

		wlist = wlist + '|' + "TO";

		wlist = wlist + '|' + "TR";

		wlist = wlist + '|' + "TT";

		wlist = wlist + '|' + "TV";

		wlist = wlist + '|' + "TW";

		wlist = wlist + '|' + "TZ";

		wlist = wlist + '|' + "UA";

		wlist = wlist + '|' + "UG";

		//wlist = wlist + '|' + "UM";

		wlist = wlist + '|' + "US";

		wlist = wlist + '|' + "UY";

		wlist = wlist + '|' + "UZ";

		wlist = wlist + '|' + "VA";

		wlist = wlist + '|' + "VC";

		wlist = wlist + '|' + "VE";

		wlist = wlist + '|' + "VG";

		wlist = wlist + '|' + "VI";

		wlist = wlist + '|' + "VN";

		wlist = wlist + '|' + "VU";

		wlist = wlist + '|' + "WF";

		wlist = wlist + '|' + "WS";

		wlist = wlist + '|' + "YE";

		wlist = wlist + '|' + "YT";

		wlist = wlist + '|' + "ZA";

		wlist = wlist + '|' + "ZM";

		wlist = wlist + '|' + "ZW";
		
		var wid = new Array();
		wid["AD"] = "Andorra";

		wid["AE"] = "United Arab Emirates";

		wid["AF"] = "Afghanistan";

		wid["AG"] = "Antigua and Barbuda";

		wid["AI"] = "Anguilla";

		wid["AL"] = "Albania";

		wid["AM"] = "Armenia";

		wid["AN"] = "Netherlands Antilles";

		wid["AO"] = "Angola";

		//wid["AQ"] = "Antarctica";

		wid["AR"] = "Argentina";

		wid["AS"] = "American Samoa";

		wid["AT"] = "Austria";

		wid["AU"] = "Australia";

		wid["AW"] = "Aruba";

		wid["AX"] = "Åland";

		wid["AZ"] = "Azerbaijan";

		wid["BA"] = "Bosnia and Herzegovina";

		wid["BB"] = "Barbados";

		wid["BD"] = "Bangladesh";

		wid["BE"] = "Belgium";

		wid["BF"] = "Burkina Faso";

		wid["BG"] = "Bulgaria";

		wid["BH"] = "Bahrain";

		wid["BI"] = "Burundi";

		wid["BJ"] = "Benin";

		wid["BL"] = "Saint Barthélemy";

		wid["BM"] = "Bermuda";

		wid["BN"] = "Brunei";

		wid["BO"] = "Bolivia";

		wid["BR"] = "Brazil";

		wid["BS"] = "The Bahamas";

		wid["BT"] = "Bhutan";

		wid["BV"] = "Bouvet Island";

		wid["BW"] = "Botswana";

		wid["BY"] = "Belarus";

		wid["BZ"] = "Belize";

		wid["CA"] = "Canada";

		wid["CC"] = "Cocos (Keeling) Islands";

		wid["CD"] = "Congo, the Democratic Republic of the";

		wid["CF"] = "Central African Republic";

		wid["CG"] = "Republic of the Congo";

		wid["CH"] = "Switzerland";

		wid["CI"] = "Côte d'Ivoire";

		wid["CK"] = "Cook Islands";

		wid["CL"] = "Chile";

		wid["CM"] = "Cameroon";

		wid["CN"] = "People's Republic of China";

		wid["CO"] = "Colombia";

		wid["CR"] = "Costa Rica";

		wid["CU"] = "Cuba";

		wid["CV"] = "Cape Verde";

		wid["CX"] = "Christmas Island";

		wid["CY"] = "Cyprus";

		wid["CZ"] = "Czech Republic";

		wid["DE"] = "Germany";

		wid["DJ"] = "Djibouti";

		wid["DK"] = "Denmark";

		wid["DM"] = "Dominica";

		wid["DO"] = "Dominican Republic";

		wid["DZ"] = "Algeria";

		wid["EC"] = "Ecuador";

		wid["EE"] = "Estonia";

		wid["EG"] = "Egypt";

		wid["EH"] = "Western Sahara";

		wid["ER"] = "Eritrea";

		wid["ES"] = "Spain";

		wid["ET"] = "Ethiopia";

		wid["FI"] = "Finland";

		wid["FJ"] = "Fiji";

		wid["FK"] = "Falkland Islands (Malvinas)";

		wid["FM"] = "Micronesia, Federated States of";

		wid["FO"] = "Faroe Islands";

		wid["FR"] = "France";

		wid["GA"] = "Gabon";

		wid["GB"] = "United Kingdom";

		wid["GD"] = "Grenada";

		wid["GE"] = "Georgia";

		wid["GF"] = "French Guiana";

		wid["GG"] = "Guernsey";

		wid["GH"] = "Ghana";

		wid["GI"] = "Gibraltar";

		wid["GL"] = "Greenland";

		wid["GM"] = "The Gambia";

		wid["GN"] = "Guinea";

		wid["GP"] = "Guadeloupe";

		wid["GQ"] = "Equatorial Guinea";

		wid["GR"] = "Greece";

		wid["GS"] = "South Georgia and the South Sandwich Islands";

		wid["GT"] = "Guatemala";

		wid["GU"] = "Guam";

		wid["GW"] = "Guinea-Bissau";

		wid["GY"] = "Guyana";

		wid["HK"] = "Hong Kong";

		wid["HM"] = "Heard Island and McDonald Islands";

		wid["HN"] = "Honduras";

		wid["HR"] = "Croatia";

		wid["HT"] = "Haiti";

		wid["HU"] = "Hungary";

		wid["ID"] = "Indonesia";

		wid["IE"] = "Republic of Ireland";

		wid["IL"] = "Israel";

		wid["IM"] = "Isle of Man";

		wid["IN"] = "India";

		wid["IO"] = "British Indian Ocean Territory";

		wid["IQ"] = "Iraq";

		wid["IR"] = "Iran, Islamic Republic of";

		wid["IS"] = "Iceland";

		wid["IT"] = "Italy";

		wid["JE"] = "Jersey";

		wid["JM"] = "Jamaica";

		wid["JO"] = "Jordan";

		wid["JP"] = "Japan";

		wid["KE"] = "Kenya";

		wid["KG"] = "Kyrgyzstan";

		wid["KH"] = "Cambodia";

		wid["KI"] = "Kiribati";

		wid["KM"] = "Comoros";

		wid["KN"] = "Saint Kitts and Nevis";

		wid["KP"] = "North Korea";

		wid["KR"] = "South Korea";

		wid["KW"] = "Kuwait";

		wid["KY"] = "Cayman Islands";

		wid["KZ"] = "Kazakhstan";

		wid["LA"] = "Laos";

		wid["LB"] = "Lebanon";

		wid["LC"] = "Saint Lucia";

		wid["LI"] = "Liechtenstein";

		wid["LK"] = "Sri Lanka";

		wid["LR"] = "Liberia";

		wid["LS"] = "Lesotho";

		wid["LT"] = "Lithuania";

		wid["LU"] = "Luxembourg";

		wid["LV"] = "Latvia";

		wid["LY"] = "Libyan Arab Jamahiriya";

		wid["MA"] = "Morocco";

		wid["MC"] = "Monaco";

		wid["MD"] = "Moldova, Republic of";

		wid["ME"] = "Montenegro";

		wid["MF"] = "Saint Martin (France)";

		wid["MG"] = "Madagascar";

		wid["MH"] = "Marshall Islands";

		wid["MK"] = "Macedonia, the former Yugoslav Republic of";

		wid["ML"] = "Mali";

		wid["MM"] = "Burma";

		wid["MN"] = "Mongolia";

		wid["MO"] = "Macau";

		wid["MP"] = "Northern Mariana Islands";

		wid["MQ"] = "Martinique";

		wid["MR"] = "Mauritania";

		wid["MS"] = "Montserrat";

		wid["MT"] = "Malta";

		wid["MU"] = "Mauritius";

		wid["MV"] = "Maldives";

		wid["MW"] = "Malawi";

		wid["MX"] = "Mexico";

		wid["MY"] = "Malaysia";

		wid["MZ"] = "Mozambique";

		wid["NA"] = "Namibia";

		wid["NC"] = "New Caledonia";

		wid["NE"] = "Niger";

		wid["NF"] = "Norfolk Island";

		wid["NG"] = "Nigeria";

		wid["NI"] = "Nicaragua";

		wid["NL"] = "Netherlands";

		wid["NO"] = "Norway";

		wid["NP"] = "Nepal";

		wid["NR"] = "Nauru";

		wid["NU"] = "Niue";

		wid["NZ"] = "New Zealand";

		wid["OM"] = "Oman";

		wid["PA"] = "Panama";

		wid["PE"] = "Peru";

		wid["PF"] = "French Polynesia";

		wid["PG"] = "Papua New Guinea";

		wid["PH"] = "Philippines";

		wid["PK"] = "Pakistan";

		wid["PL"] = "Poland";

		wid["PM"] = "Saint Pierre and Miquelon";

		wid["PN"] = "Pitcairn Islands";

		wid["PR"] = "Puerto Rico";

		wid["PS"] = "Palestinian territories";

		wid["PT"] = "Portugal";

		wid["PW"] = "Palau";

		wid["PY"] = "Paraguay";

		wid["QA"] = "Qatar";

		wid["RE"] = "Réunion";

		wid["RO"] = "Romania";

		wid["RS"] = "Serbia";

		wid["RU"] = "Russia";

		wid["RW"] = "Rwanda";

		wid["SA"] = "Saudi Arabia";

		wid["SB"] = "Solomon Islands";

		wid["SC"] = "Seychelles";

		wid["SD"] = "Sudan";

		wid["SE"] = "Sweden";

		wid["SG"] = "Singapore";

		wid["SH"] = "Saint Helena";

		wid["SI"] = "Slovenia";

		wid["SJ"] = "Svalbard and Jan Mayen";

		wid["SK"] = "Slovakia";

		wid["SL"] = "Sierra Leone";

		wid["SM"] = "San Marino";

		wid["SN"] = "Senegal";

		wid["SO"] = "Somalia";

		wid["SR"] = "Suriname";

		wid["ST"] = "São Tomé and Príncipe";

		wid["SV"] = "El Salvador";

		wid["SY"] = "Syrian Arab Republic";

		wid["SZ"] = "Swaziland";

		wid["TC"] = "Turks and Caicos Islands";

		wid["TD"] = "Chad";

		//wid["TF"] = "French Southern and Antarctic Lands";

		wid["TG"] = "Togo";

		wid["TH"] = "Thailand";

		wid["TJ"] = "Tajikistan";

		wid["TK"] = "Tokelau";

		wid["TL"] = "East Timor";

		wid["TM"] = "Turkmenistan";

		wid["TN"] = "Tunisia";

		wid["TO"] = "Tonga";

		wid["TR"] = "Turkey";

		wid["TT"] = "Trinidad and Tobago";

		wid["TV"] = "Tuvalu";

		wid["TW"] = "Republic of China";

		wid["TZ"] = "Tanzania";

		wid["UA"] = "Ukraine";

		wid["UG"] = "Uganda";

		//wid["UM"] = "United States Minor Outlying Islands";

		wid["US"] = "United States";

		wid["UY"] = "Uruguay";

		wid["UZ"] = "Uzbekistan";

		wid["VA"] = "Vatican City";

		wid["VC"] = "Saint Vincent and the Grenadines";

		wid["VE"] = "Venezuela";

		wid["VG"] = "British Virgin Islands";

		wid["VI"] = "United States Virgin Islands";

		wid["VN"] = "Vietnam";

		wid["VU"] = "Vanuatu";

		wid["WF"] = "Wallis and Futuna";

		wid["WS"] = "Samoa";

		wid["YE"] = "Yemen";

		wid["YT"] = "Mayotte";

		wid["ZA"] = "South Africa";

		wid["ZM"] = "Zambia";

		wid["ZW"] = "Zimbabwe";
		
		s = s.substr(s.indexOf("var point")).replace(/PR, US/, "PR, PR").replace(/var\ point.*;/g, "").replace(/var\ markerText.*,\ /g, "").replace(/<hr.*;/g, "");
		s = s.replace(/var.*/g, "").replace(/\n/g, "").replace(/\s*/g, "").replace(/map.+;/, " ").replace(/func.*\/\//, "").replace(/]].*/, "");
		
		var u = "";
		for(var i = 0;i + 2 <= s.length; i+=2) {
			var c = s.substr(i, 2) + "|";
			if(u.indexOf(c) < 0) {
				u += c;
				wlist = remove(wlist, c);
			}
		}
		wlist = wlist.replace(/\W/g, "");
		
		var txt = "";
		for(var i = 0; i + 2 < wlist.length; i = i + 2) {
			var c = wlist.substr(i, 2);
			txt = txt + "<br />" + wid[c];
		}
		div  = document.createElement("div");
		div.innerHTML = "Missing countries:" + txt + "<br /> ";
		(p = (document.getElementById(tW))).parentNode.insertBefore(div, p)
		rm(p);
		u = u.replace(/GB\|/, "UK");
		addMap("http://www.world66.com/myworld66/visitedCountries/worldmap?visited=", u, div);
	};
}




function addMap(u1, u2, p) {
	addImg(u1 + u2.replace(/\|/g, ""), p);
}

function addImg(s, p) {
	((a = document.createElement('a')).innerHTML = '<img src="' + s + '">', a).setAttribute("href", "http://www.world66.com/community/");
	p.parentNode.insertBefore(a, p);
}

function rm(el) {
	el.parentNode.removeChild(el);
}

// From Dive Into Greasemonkey:
function xpath(query) {
	return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

// From http://www.rgagnon.com/jsdetails/js-0042.html:
function remove(s, t) {
  /*
	**  Remove all occurrences of a token in a string
	**    s  string to be processed
	**    t  token to be removed
	**  returns new string
  */
	i = s.indexOf(t);
	r = "";
	if (i == -1) return s;
	r += s.substring(0,i) + remove(s.substring(i + t.length), t);
	return r;
}