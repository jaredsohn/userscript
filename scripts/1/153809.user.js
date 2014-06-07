// ==UserScript==
// @name       Where's It Blocked?
// @version    0.2
// @description  Adds which countries a YouTube video is blocked in to beneath the description.
// @match    http://*.youtube.com/*
// @match    https://*.youtube.com/*
// @include    http://*.youtube.com/*
// @include    https://*.youtube.com/*
// @copyright  2012 ajmint
// ==/UserScript==
var allc = ["AD", "AE", "AF", "AG", "AI", "AL", "AM", "AO", "AQ", "AR", "AS", "AT", "AU", "AW", "AX", "AZ", "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BL", "BM", "BN", "BO", "BR", "BS", "BT", "BV", "BW", "BY", "BZ", "CA", "CC", "CD", "CF", "CG", "CH", "CI", "CK", "CL", "CM", "CN", "CO", "CR", "CU", "CV", "CX", "CY", "CZ", "DE", "DJ", "DK", "DM", "DO", "DZ", "EC", "EE", "EG", "EH", "ER", "ES", "ET", "FI", "FJ", "FK", "FM", "FO", "FR", "GA", "GB", "GD", "GE", "GF", "GG", "GH", "GI", "GL", "GM", "GN", "GP", "GQ", "GR", "GS", "GT", "GU", "GW", "GY", "HK", "HM", "HN", "HR", "HT", "HU", "ID", "IE", "IL", "IM", "IN", "IO", "IQ", "IR", "IS", "IT", "JE", "JM", "JO", "JP", "KE", "KG", "KH", "KI", "KM", "KN", "KP", "KR", "KW", "KY", "KZ", "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV", "LY", "MA", "MC", "MD", "ME", "MF", "MG", "MH", "MK", "ML", "MM", "MN", "MO", "MP", "MQ", "MR", "MS", "MT", "MU", "MV", "MW", "MX", "MY", "MZ", "NA", "NC", "NE", "NF", "NG", "NI", "NL", "NO", "NP", "NR", "NU", "NZ", "OM", "PA", "PE", "PF", "PG", "PH", "PK", "PL", "PM", "PN", "PR", "PS", "PT", "PW", "PY", "QA", "RE", "RO", "RS", "RU", "RW", "SA", "SB", "SC", "SD", "SE", "SG", "SH", "SI", "SJ", "SK", "SL", "SM", "SN", "SO", "SR", "SS", "ST", "SV", "SY", "SZ", "TC", "TD", "TF", "TG", "TH", "TJ", "TK", "TL", "TM", "TN", "TO", "TR", "TT", "TV", "TW", "TZ", "UA", "UG", "UM", "US", "UY", "UZ", "VA", "VC", "VE", "VG", "VI", "VN", "VU", "WF", "WS", "YE", "YT", "ZA", "ZM", "ZW"];
var codest = '{"AD": "Andorra","AE": "United Arab Emirates","AF": "Afghanistan","AG": "Antigua and Barbuda","AI": "Anguilla","AL": "Albania","AM": "Armenia","AO": "Angola","AQ": "Antarctica","AR": "Argentina","AS": "American Samoa","AT": "Austria","AU": "Australia","AW": "Aruba","AX": "Aland Islands","AZ": "Azerbaijan","BA": "Bosnia and Herzegovina","BB": "Barbados","BD": "Bangladesh","BE": "Belgium","BF": "Burkina Faso","BG": "Bulgaria","BH": "Bahrain","BI": "Burundi","BJ": "Benin","BL": "Saint Barthelemy","BM": "Bermuda","BN": "Brunei Darussalam","BO": "Bolivia","BR": "Brazil","BS": "Bahamas","BT": "Bhutan","BV": "Bouvet Island","BW": "Botswana","BY": "Belarus","BZ": "Belize","CA": "Canada","CC": "Cocos Islands","CD": "DP Congo","CF": "Central African Republic","CG": "Congo","CH": "Switzerland","CI": "Cote d\'Ivoire","CK": "Cook Islands","CL": "Chile","CM": "Cameroon","CN": "China","CO": "Colombia","CR": "Costa Rica","CU": "Cuba","CV": "Cape Verde","CX": "Christmas Island","CY": "Cyprus","CZ": "Czech Republic","DE": "Germany","DJ": "Djibouti","DK": "Denmark","DM": "Dominica","DO": "Dominican Republic","DZ": "Algeria","EC": "Ecuador","EE": "Estonia","EG": "Egypt","EH": "Western Sahara","ER": "Eritrea","ES": "Spain","ET": "Ethiopia","FI": "Finland","FJ": "Fiji","FK": "Falkland Islands","FM": "Micronesia","FO": "Faroe Islands","FR": "France","GA": "Gabon","GB": "United Kingdom","GD": "Grenada","GE": "Georgia","GF": "French Guiana","GG": "Guernsey","GH": "Ghana","GI": "Gibraltar","GL": "Greenland","GM": "Gambia","GN": "Guinea","GP": "Guadeloupe","GQ": "Equatorial Guinea","GR": "Greece","GS": "S Georgia/S Sandwich Islands","GT": "Guatemala","GU": "Guam","GW": "Guinea-Bissau","GY": "Guyana","HK": "Hong Kong","HM": "Heard/McDonald Islands","HN": "Honduras","HR": "Croatia","HT": "Haiti","HU": "Hungary","ID": "Indonesia","IE": "Ireland","IL": "Israel","IM": "Isle of Man","IN": "India","IO": "British Indian Ocean Territory","IQ": "Iraq","IR": "Iran","IS": "Iceland","IT": "Italy","JE": "Jersey","JM": "Jamaica","JO": "Jordan","JP": "Japan","KE": "Kenya","KG": "Kyrgyzstan","KH": "Cambodia","KI": "Kiribati","KM": "Comoros","KN": "St Kitts and Nevis","KP": "North Korea","KR": "South Korea","KW": "Kuwait","KY": "Cayman Islands","KZ": "Kazakhstan","LA": "Laos","LB": "Lebanon","LC": "Saint Lucia","LI": "Liechtenstein","LK": "Sri Lanka","LR": "Liberia","LS": "Lesotho","LT": "Lithuania","LU": "Luxembourg","LV": "Latvia","LY": "Libya","MA": "Morocco","MC": "Monaco","MD": "Moldova","ME": "Montenegro","MF": "Saint Martin (French)","MG": "Madagascar","MH": "Marshall Islands","MK": "Macedonia","ML": "Mali","MM": "Myanmar","MN": "Mongolia","MO": "Macao","MP": "Northern Mariana Islands","MQ": "Martinique","MR": "Mauritania","MS": "Montserrat","MT": "Malta","MU": "Mauritus","MV": "Maldives","MW": "Malawi","MX": "Mexico","MY": "Malaysia","MZ": "Mozambique","NA": "Namibia","NC": "New Caledonia","NE": "Niger","NF": "Norfolk Island","NG": "Nigeria","NI": "Nicaragua","NL": "Netherlands","NO": "Norway","NP": "Nepal","NR": "Nauru","NU": "Niue","NZ": "New Zealand","OM": "Oman","PA": "Panama","PE": "Peru","PF": "French Polynesia","PG": "Papua New Guinea","PH": "Philippines","PK": "Pakistan","PL": "Poland","PM": "Saint Pierre and Miquelon","PN": "Pitcairn","PR": "Puerto Rico","PS": "Occupied Palestinian Territory","PT": "Portugal","PW": "Palau","PY": "Paraguay","QA": "Qatar","RE": "Reunion","RO": "Romania","RS": "Serbia","RU": "Russia","RW": "Rwanda","SA": "Saudi Arabia","SB": "Solomon Islands","SC": "Seychelles","SD": "Sudan","SE": "Sweden","SG": "Singapore","SH": "Saint Helena, Ascension and Tristan da Cunha","SI": "Slovenia","SJ": "Svalbard and Jan Mayen","SK": "Slovakia","SL": "Sierra Leone","SM": "San Marino","SN": "Senegal","SO": "Somalia","SR": "Suriname","SS": "South Sudan","ST": "Sao Tome and Principe","SV": "El Salvador","SY": "Syria","SZ": "Swaziland","TC": "Turks and Caicos Islands","TD": "Chad","TF": "French Southern Territories","TG": "Togo","TH": "Thailand","TJ": "Tajikistan","TK": "Tokelau","TL": "Timor-Leste","TM": "Turkmenistan","TN": "Tunisia","TO": "Tonga","TR": "Turkey","TT": "Trinidad and Tobago","TV": "Tuvalu","TW": "Taiwan","TZ": "Tanzania","UA": "Ukraine","UG": "Uganda","UM": "United States Minor Outlying Islands","US": "United States","UY": "Uruguay","UZ": "Uzbekistan","VA": "Holy See (Vatican City State)","VC": "Saint Vincent and the Grenadines","VE": "Venezuela","VG": "British Virgin Islands","VI": "United States Virgin Islands","VN": "Vietnam","VU": "Vanuatu","WF": "Wallis and Futuna","WS": "Samoa","YE": "Yemen","YT": "Mayotte","ZA": "South Africa","ZM": "Zambia","ZW": "Zimbabwe"}';
var codes = JSON.parse(codest);
var metas = document.getElementsByTagName("meta");
for (i = 0; i < metas.length; i++) {
    if (metas[i].getAttribute("itemprop") == "regionsAllowed") {
        var clist = metas[i].getAttribute("content")
    }
}
if (!clist && clist != '') {
    throw ""
}
var carr = clist.split(",");
var blck = [];
for (i = 0; i < allc.length; i++) {
    if (carr.indexOf(allc[i]) < 0) {
        blck.push(allc[i])
    }
}
if (blck.length > 0 && blck.length <= 123) {
    for (i = 0; i < blck.length; i++) {
        var obj = eval("(codes." + blck[i] + ")");
        blck[i] = obj
    }
    blck.sort();
    blck = blck.join(", ");
	
	var label = 'Blocked in';
	var text = blck;
} else if (blck.length > 123 && blck.length <= 246) {
    for (i = 0; i < carr.length; i++) {
        var obj = eval("(codes." + carr[i] + ")");
        carr[i] = obj
    }
    carr.sort();
    carr = carr.join(", ");
	
	var label = 'Unblocked in';
	var text = carr;
} else if (blck.length > 246) {
    var label = 'Blocked';
	var text = 'worldwide';
} else {
    var label = 'Blocked';
	var text = 'nowhere';
}
if(document.getElementById('watch7-player').className=='unavailable-player' && !document.getElementsByClassName('submessage')[0].hasChildNodes()) {
	document.getElementsByClassName('submessage')[0].innerHTML = label+' '+text+'.';
} else {
	text = text.charAt(0).toUpperCase() + text.slice(1);
	var nli = document.createElement('li');
	nli.innerHTML = '<h4 class="title">'+label+'</h4><div class="content"><p>'+text+'</p></div>';
	document.getElementsByClassName('watch-extras-section')[0].appendChild(nli);
}