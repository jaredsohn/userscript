// ==UserScript==
// @name           Country Data Analysis
// @namespace      http://austrianeconomics.wikia.com/
// @include        http://austrianeconomics.wikia.com/*edit
// ==/UserScript==

// Version 0.9
// This script was used to generate country pages for a Mediawiki wiki, using data from several sources - the CIA Factbook, Worldbank data, 
// indices from the Heritage Foundation, Transparency International and Doing Business, and more. Includes external links and references. 
// The (updated) result can be seen here:  http://austrianeconomics.wikia.com/wiki/Category:Countries
//
// The script fetches the country name from the 'edit' page of a wiki and attempts to find all the necessary data as configured. A button 
// on the bottom of the page informs about the final result, it is however best to watch the Error Console's output. For many countries 
// it gives good results, but it only goes to 90-95% if an attempt is made to create ALL countries. Improvements are very possible, but 
// this can't be avoided due to the nature of the data. Sorry for the horrible coding; this script was made for a one-time run and will 
// stop being useful when the underlying websites change. Some functions may be still of use.
//
// Things to watch out for:
//  - obscure countries for which are several names used  (with special annoyance reserved for the "Democratic Republic of the Congo" vs. "Republic of the Congo")
//  - the borders are not always correct if names are similar (Guinea, etc)
//  - the indices are sometimes lost due to differing names
//  - not all empty values are checked against
//  - CIA Factbook loves to add additional details, sometimes adding too much of the good stuff for the script
//  - Wikipedia names its countries differently sometimes, too.
//  - a few websites just don't seem to work on occasion. Refresh.
//  - there doesn't seem to be a good central resource for central banks (except maybe for Wikipedia, which was avoided for a different reason)
//


GM_log("Initializing...");

// VARIABLES, AND CONSTANTS, TOO!


COUNTRIES = [ [1,'Afghanistan','AF'], [2,'Albania','AL'], [3,'Algeria','DZ'], [4,'American Samoa','AS'], [5,'Andorra','AD'], [6,'Angola','AO'], [7,'Anguilla','AI'], [8,'Antarctica','AQ'], [9,'Antigua and Barbuda','AG'], [10,'Argentina','AR'], [11,'Armenia','AM'], [12,'Aruba','AW'], [13,'Australia','AU'], [14,'Austria','AT'], [15,'Azerbaijan','AZ'], [16,'Bahamas','BS'], [17,'Bahrain','BH'], [18,'Bangladesh','BD'], [19,'Barbados','BB'], [20,'Belarus','BY'], [21,'Belgium','BE'], [22,'Belize','BZ'], [23,'Benin','BJ'], [24,'Bermuda','BM'], [25,'Bhutan','BT'], [26,'Bolivia','BO'], [27,'Bosnia and Herzegovina','BA'], [28,'Botswana','BW'], [29,'Bouvet Island','BV'], [30,'Brazil','BR'], [31,'British Indian Ocean Territory','IO'], [32,'Brunei Darussalam','BN','Brunei'], [33,'Bulgaria','BG'], [34,'Burkina Faso','BF'], [35,'Burundi','BI'], [36,'Cambodia','KH'], [37,'Cameroon','CM'], [38,'Canada','CA'], [39,'Cape Verde','CV'], [40,'Cayman Islands','KY'], [41,'Central African Republic','CF'], [42,'Chad','TD'], [43,'Chile','CL'], [44,'China','CN'], [45,'Christmas Island','CX'], [46,'Cocos (Keeling) Islands','CC'], [47,'Colombia','CO'], [48,'Comoros','KM'], [49,'Congo','CG'], [50,'Cook Islands','CK'], [51,'Costa Rica','CR'], [52,'Ivory Coast','CI',"Cote d'Ivoire"], [53,'Croatia','HR'], [54,'Cuba','CU'], [55,'Cyprus','CY'], [56,'Czech Republic','CZ'], [57,'Denmark','DK'], [58,'Djibouti','DJ'], [59,'Dominica','DM'], [60,'Dominican Republic','DO'], [61,'East Timor','TP','Timor-Leste'], [62,'Ecuador','EC'], [63,'Egypt','EG'], [64,'El Salvador','SV'], [65,'Equatorial Guinea','GQ'], [66,'Eritrea','ER'], [67,'Estonia','EE'], [68,'Ethiopia','ET'], [69,'Falkland Islands','FK','Falkland Islands (Malvinas)'], [70,'Faroe Islands','FO'], [71,'Fiji','FJ'], [72,'Finland','FI'], [73,'France','FR'], [74,'France, MEtropolitan','FX'], [75,'French Guiana','GF'], [76,'French Polynesia','PF'], [77,'French Southern Territories','TF'], [78,'Gabon','GA'], [79,'Gambia','GM'], [80,'Georgia','GE'], [81,'Germany','DE'], [82,'Ghana','GH'], [83,'Gibraltar','GI'], [84,'Greece','GR'], [85,'Greenland','GL'], [86,'Grenada','GD'], [87,'Guadeloupe','GP'], [88,'Guam','GU'], [89,'Guatemala','GT'], [90,'Guinea','GN'], [91,'Guinea-Bissau','GW','Guinea Bissau'], [92,'Guyana','GY'], [93,'Haiti','HT'], [94,'Heard and Mc Donald Islands','HM','Heard Island and McDonald Islands'], [95,'Honduras','HN'], [96,'Hong Kong','HK'], [97,'Hungary','HU'], [98,'Iceland','IS'], [99,'India','IN'], [100,'Indonesia','ID'], [101,'Iran (Islamic Republic of)','IR','Iran'], [102,'Iraq','IQ'], [103,'Ireland','IE'], [104,'Israel','IL'], [105,'Italy','IT'], [106,'Jamaica','JM'], [107,'Japan','JP'], [108,'Jordan','JO'], [109,'Kazakhstan','KZ'], [110,'Kenya','KE'], [111,'Kiribati','KI'], [112,'North Korea','KP', 'Korea, North'], [113,'South Korea','KR', 'Korea, South'], [114,'Kuwait','KW'], [115,'Kyrgyzstan','KG','Kyrgyz Republic'], [116,"Lao People's Democratic Republic",'LA','Laos'], [117,'Latvia','LV'], [118,'Lebanon','LB'], [119,'Lesotho','LS'], [120,'Liberia','LR'], [121,'Libya','LY','Libyan Arab Jamahiriya'], [122,'Liechtenstein','LI'], [123,'Lithuania','LT'], [124,'Luxembourg','LU'], [125,'Macau','MO'], [126,'Macedonia, The Former Yugoslav Republic of','MK', 'Macedonia'], [127,'Madagascar','MG'], [128,'Malawi','MW'], [129,'Malaysia','MY'], [130,'Maldives','MV'], [131,'Mali','ML'], [132,'Malta','MT'], [133,'Marshall Islands','MH'], [134,'Martinique','MQ'], [135,'Mauritania','MR'], [136,'Mauritius','MU'], [137,'Mayotte','YT'], [138,'Mexico','MX'], [139,'Micronesia','FM','Micronesia, Federated States of'], [140,'Moldova','MD','Moldova, Republic of'], [141,'Monaco','MC'], [142,'Mongolia','MN'], [142,'Montenegro','ME'], [143,'Montserrat','MS'], [144,'Morocco','MA'], [145,'Mozambique','MZ'], [146,'Myanmar','MM','Burma'], [147,'Namibia','NA'], [148,'Nauru','NR'], [149,'Nepal','NP'], [150,'Netherlands','NL'], [151,'Netherlands Antilles','AN'], [152,'New Caledonia','NC'], [153,'New Zealand','NZ'], [154,'Nicaragua','NI'], [155,'Niger','NE'], [156,'Nigeria','NG'], [157,'Niue','NU'], [158,'Norfolk Island','NF'], [159,'Northern Mariana Islands','MP'], [160,'Norway','NO'], [161,'Oman','OM'], [162,'Pakistan','PK'], [163,'Palau','PW'], [164,'Panama','PA'], [165,'Papua New Guinea','PG'], [166,'Paraguay','PY'], [167,'Peru','PE'], [168,'Philippines','PH'], [169,'Pitcairn','PN','Pitcairn Island'], [170,'Poland','PL'], [171,'Portugal','PT'], [172,'Puerto Rico','PR'], [173,'Qatar','QA'], [174,'Reunion','RE'], [175,'Romania','RO'], [176,'Russia','RU', 'Russian Federation'], [177,'Rwanda','RW'], [178,'Saint Kitts and Nevis','KN'], [179,'Saint Lucia','LC'], [180,'Saint Vincent and the Grenadines','VC'], [181,'Samoa','WS'], [182,'San Marino','SM'], [183,'Sao Tome and Principe','ST'], [184,'Saudi Arabia','SA'], [185,'Senegal','SN'], [185,'Serbia','RS'], [186,'Seychelles','SC'], [187,'Sierra Leone','SL'], [188,'Singapore','SG'], [189,'Slovakia','SK', 'Slovak Republic'], [190,'Slovenia','SI'], [191,'Solomon Islands','SB'], [192,'Somalia','SO'], [193,'South Africa','ZA'], [194,'South Georgia and the South Sandwich Islands','GS'], [195,'Spain','ES'], [196,'Sri Lanka','LK'], [197,'St. Helena','SH','Saint Helena'], [198,'St. Pierre and Miquelon','PM','Saint Pierre and Miquelon'], [199,'Sudan','SD'], [200,'Suriname','SR'], [201,'Svalbard and Jan Mayen Islands','SJ','Svalbard (Spitzbergen) and Jan Mayen Islands'], [202,'Swaziland','SZ'], [203,'Sweden','SE'], [204,'Switzerland','CH'], [205,'Syrian Arab Republic','SY','Syria'], [206,'Taiwan','TW','Taiwan, Province of China'], [207,'Tajikistan','TJ'], [208,'Tanzania, United Republic of','TZ','Tanzania'], [209,'Thailand','TH'], [210,'Togo','TG'], [211,'Tokelau','TK'], [212,'Tonga','TO'], [213,'Trinidad and Tobago','TT'], [214,'Tunisia','TN'], [215,'Turkey','TR'], [216,'Turkmenistan','TM'], [217,'Turks and Caicos Islands','TC'], [218,'Tuvalu','TV'], [219,'Uganda','UG'], [220,'Ukraine','UA'], [221,'United Arab Emirates','AE','UAE'], [222,'United Kingdom','GB','Great Britain'], [223,'United States','US', 'USA'], [224,'United States Minor Outlying Islands','UM'], [225,'Uruguay','UY'], [226,'Uzbekistan','UZ'], [227,'Vanuatu','VU'], [228,'Vatican City State (Holy See)','VA','Holy See (Vatican City)'], [229,'Venezuela','VE','Venezuela, R.B.'], [230,'Vietnam','VN', 'Viet Nam'], [231,'British Virgin Islands','VG'], [232,'Virgin Islands (U.S.)','VI'], [233,'Wallis and Futuna Islands','WF'], [234,'Western Sahara','EH'], [235,'Yemen','YE'], [238,'Zambia','ZM'], [239,'Zimbabwe','ZW'] ];




var COUNTRY_CODES = new Array();
COUNTRY_CODES["Afghanistan"] = "AF";
COUNTRY_CODES["Albania"] = "AL";
COUNTRY_CODES["Algeria"] = "DZ";
COUNTRY_CODES["American Samoa"] = "AS";
COUNTRY_CODES["Andorra"] = "AD";
COUNTRY_CODES["Angola"] = "AO";
COUNTRY_CODES["Anguilla"] = "AI";
COUNTRY_CODES["Antarctica"] = "AQ";
COUNTRY_CODES["Antigua and Barbuda"] = "AG";
COUNTRY_CODES["Argentina"] = "AR";
COUNTRY_CODES["Armenia"] = "AM";
COUNTRY_CODES["Aruba"] = "AW";
COUNTRY_CODES["Australia"] = "AU";
COUNTRY_CODES["Austria"] = "AT";
COUNTRY_CODES["Azerbaijan"] = "AZ";
COUNTRY_CODES["Bahamas"] = "BS";
COUNTRY_CODES["Bahrain"] = "BH";
COUNTRY_CODES["Bangladesh"] = "BD";
COUNTRY_CODES["Barbados"] = "BB";
COUNTRY_CODES["Belarus"] = "BY";
COUNTRY_CODES["Belgium"] = "BE";
COUNTRY_CODES["Belize"] = "BZ";
COUNTRY_CODES["Benin"] = "BJ";
COUNTRY_CODES["Bermuda"] = "BM";
COUNTRY_CODES["Bhutan"] = "BT";
COUNTRY_CODES["Bolivia"] = "BO";
COUNTRY_CODES["Bosnia and Herzegovina"] = "BA";
COUNTRY_CODES["Botswana"] = "BW";
COUNTRY_CODES["Bouvet Island"] = "BV";
COUNTRY_CODES["Brazil"] = "BR";
COUNTRY_CODES["British Indian Ocean Territory"] = "IO";
COUNTRY_CODES["British Virgin Islands"] = "VG";
COUNTRY_CODES["Brunei"] = "BN";
COUNTRY_CODES["Bulgaria"] = "BG";
COUNTRY_CODES["Burkina Faso"] = "BF";
COUNTRY_CODES["Burma"] = "MM";
COUNTRY_CODES["Burundi"] = "BI";
COUNTRY_CODES["Cambodia"] = "KH";
COUNTRY_CODES["Cameroon"] = "CM";
COUNTRY_CODES["Canada"] = "CA";
COUNTRY_CODES["Cape Verde"] = "CV";
COUNTRY_CODES["Cayman Islands"] = "KY";
COUNTRY_CODES["Central African Republic"] = "CF";
COUNTRY_CODES["Chad"] = "TD";
COUNTRY_CODES["Chile"] = "CL";
COUNTRY_CODES["China"] = "CN";
COUNTRY_CODES["Christmas Island"] = "CX";
COUNTRY_CODES["Cocos (Keeling) Islands"] = "CC";
COUNTRY_CODES["Colombia"] = "CO";
COUNTRY_CODES["Comoros"] = "KM";
COUNTRY_CODES["Congo"] = "CG";
COUNTRY_CODES["Cook Islands"] = "CK";
COUNTRY_CODES["Costa Rica"] = "CR";
COUNTRY_CODES["Croatia"] = "HR";
COUNTRY_CODES["Cuba"] = "CU";
COUNTRY_CODES["Cyprus"] = "CY";
COUNTRY_CODES["Czech Republic"] = "CZ";
COUNTRY_CODES["Denmark"] = "DK";
COUNTRY_CODES["Djibouti"] = "DJ";
COUNTRY_CODES["Dominica"] = "DM";
COUNTRY_CODES["Dominican Republic"] = "DO";
COUNTRY_CODES["Timor-Leste"] = "TP";
COUNTRY_CODES["Ecuador"] = "EC";
COUNTRY_CODES["Egypt"] = "EG";
COUNTRY_CODES["El Salvador"] = "SV";
COUNTRY_CODES["Equatorial Guinea"] = "GQ";
COUNTRY_CODES["Eritrea"] = "ER";
COUNTRY_CODES["Estonia"] = "EE";
COUNTRY_CODES["Ethiopia"] = "ET";
COUNTRY_CODES["Falkland Islands"] = "FK";
COUNTRY_CODES["Faroe Islands"] = "FO";
COUNTRY_CODES["Fiji"] = "FJ";
COUNTRY_CODES["Finland"] = "FI";
COUNTRY_CODES["France"] = "FR";
COUNTRY_CODES["French Guiana"] = "GF";
COUNTRY_CODES["French Polynesia"] = "PF";
COUNTRY_CODES["French Southern and Antarctic Territories"] = "TF";
COUNTRY_CODES["Gabon"] = "GA";
COUNTRY_CODES["Gambia"] = "GM";
COUNTRY_CODES["Georgia"] = "GE";
COUNTRY_CODES["Germany"] = "DE";
COUNTRY_CODES["Ghana"] = "GH";
COUNTRY_CODES["Gibraltar"] = "GI";
COUNTRY_CODES["Great Britain"] = "UK";
COUNTRY_CODES["Greece"] = "GR";
COUNTRY_CODES["Greenland"] = "GL";
COUNTRY_CODES["Grenada"] = "GD";
COUNTRY_CODES["Guadeloupe"] = "GP";
COUNTRY_CODES["Guam"] = "GU";
COUNTRY_CODES["Guatemala"] = "GT";
COUNTRY_CODES["Guernsey"] = "GG";
COUNTRY_CODES["Guinea"] = "GN";
COUNTRY_CODES["Guinea Bissau"] = "GW";
COUNTRY_CODES["Guyana"] = "GY";
COUNTRY_CODES["Haiti"] = "HT";
COUNTRY_CODES["Heard Island and McDonald Islands"] = "HM";
COUNTRY_CODES["Honduras"] = "HN";
COUNTRY_CODES["Hong Kong"] = "HK";
COUNTRY_CODES["Hungary"] = "HU";
COUNTRY_CODES["Iceland"] = "IS";
COUNTRY_CODES["India"] = "IN";
COUNTRY_CODES["Indonesia"] = "ID";
COUNTRY_CODES["Iran"] = "IR";
COUNTRY_CODES["Iraq"] = "IQ";
COUNTRY_CODES["Ireland"] = "IE";
COUNTRY_CODES["Isle of Man"] = "IM";
COUNTRY_CODES["Israel"] = "IL";
COUNTRY_CODES["Italy"] = "IT";
COUNTRY_CODES["Ivory Coast"] = "CI";
COUNTRY_CODES["Jamaica"] = "JM";
COUNTRY_CODES["Japan"] = "JP";
COUNTRY_CODES["Jersey"] = "JE";
COUNTRY_CODES["Jordan"] = "JO";
COUNTRY_CODES["Kazakhstan"] = "KZ";
COUNTRY_CODES["Kenya"] = "KE";
COUNTRY_CODES["Kiribati"] = "KI";
COUNTRY_CODES["Kuwait"] = "KW";
COUNTRY_CODES["Kyrgyzstan"] = "KG";
COUNTRY_CODES["Laos"] = "LA";
COUNTRY_CODES["Latvia"] = "LV";
COUNTRY_CODES["Lebanon"] = "LB";
COUNTRY_CODES["Lesotho"] = "LS";
COUNTRY_CODES["Liberia"] = "LR";
COUNTRY_CODES["Libya"] = "LY";
COUNTRY_CODES["Liechtenstein"] = "LI";
COUNTRY_CODES["Lithuania"] = "LT";
COUNTRY_CODES["Luxembourg"] = "LU";
COUNTRY_CODES["Macau"] = "MO";
COUNTRY_CODES["Macedonia"] = "MK";
COUNTRY_CODES["Madagascar"] = "MG";
COUNTRY_CODES["Malawi"] = "MW";
COUNTRY_CODES["Malaysia"] = "MY";
COUNTRY_CODES["Maldives"] = "MV";
COUNTRY_CODES["Mali"] = "ML";
COUNTRY_CODES["Malta"] = "MT";
COUNTRY_CODES["Marshall Islands"] = "MH";
COUNTRY_CODES["Martinique"] = "MQ";
COUNTRY_CODES["Mauritania"] = "MR";
COUNTRY_CODES["Mauritius"] = "MU";
COUNTRY_CODES["Mayotte"] = "YT";
COUNTRY_CODES["Mexico"] = "MX";
COUNTRY_CODES["Micronesia"] = "FM";
COUNTRY_CODES["Moldova"] = "MD";
COUNTRY_CODES["Monaco"] = "MC";
COUNTRY_CODES["Mongolia"] = "MN";
COUNTRY_CODES["Montenegro"] = "ME";
COUNTRY_CODES["Montserrat"] = "MS";
COUNTRY_CODES["Morocco"] = "MO";
COUNTRY_CODES["Mozambique"] = "MZ";
COUNTRY_CODES["Myanmar"] = "MM";
COUNTRY_CODES["Namibia"] = "NA";
COUNTRY_CODES["Nauru"] = "NR";
COUNTRY_CODES["Nepal"] = "NP";
COUNTRY_CODES["Netherlands"] = "NL";
COUNTRY_CODES["Netherlands Antilles"] = "AN";
COUNTRY_CODES["New Caledonia"] = "NC";
COUNTRY_CODES["New Zealand"] = "NZ";
COUNTRY_CODES["Nicaragua"] = "NI";
COUNTRY_CODES["Niger"] = "NE";
COUNTRY_CODES["Nigeria"] = "NG";
COUNTRY_CODES["Niue"] = "NU";
COUNTRY_CODES["Norfolk Island"] = "NF";
COUNTRY_CODES["Northern Mariana Islands"] = "MP";
COUNTRY_CODES["North Korea"] = "KP";
COUNTRY_CODES["Norway"] = "NO";
COUNTRY_CODES["Oman"] = "OM";
COUNTRY_CODES["Pakistan"] = "PK";
COUNTRY_CODES["Palau"] = "PW";
COUNTRY_CODES["Palestine"] = "PS";
COUNTRY_CODES["Panama"] = "PA";
COUNTRY_CODES["Papua New Guinea"] = "PG";
COUNTRY_CODES["Paraguay"] = "PY";
COUNTRY_CODES["Peru"] = "PE";
COUNTRY_CODES["Philippines"] = "PH";
COUNTRY_CODES["Pitcairn Island"] = "PN";
COUNTRY_CODES["Poland"] = "PL";
COUNTRY_CODES["Portugal"] = "PT";
COUNTRY_CODES["Puerto Rico"] = "PR";
COUNTRY_CODES["Qatar"] = "QA";
COUNTRY_CODES["Reunion"] = "RE";
COUNTRY_CODES["Romania"] = "RO";
COUNTRY_CODES["Russia"] = "RU";
COUNTRY_CODES["Rwanda"] = "RW";
COUNTRY_CODES["Saint Helena"] = "SH";
COUNTRY_CODES["Saint Kitts and Nevis"] = "KN";
COUNTRY_CODES["Saint Lucia"] = "LC";
COUNTRY_CODES["Saint Pierre and Miquelon"] = "PM";
COUNTRY_CODES["Saint Vincent and the Grenadines"] = "VC";
COUNTRY_CODES["Samoa"] = "WS";
COUNTRY_CODES["San Marino"] = "SM";
COUNTRY_CODES["Sao Tome and Principe"] = "ST";
COUNTRY_CODES["Saudi Arabia"] = "SA";
COUNTRY_CODES["Senegal"] = "SN";
COUNTRY_CODES["Serbia"] = "RS";
COUNTRY_CODES["Seychelles"] = "SC";
COUNTRY_CODES["Sierra Leone"] = "SL";
COUNTRY_CODES["Singapore"] = "SG";
COUNTRY_CODES["Slovakia"] = "SK";
COUNTRY_CODES["Slovenia"] = "SI";
COUNTRY_CODES["Solomon Islands"] = "SB";
COUNTRY_CODES["Somalia"] = "SO";
COUNTRY_CODES["South Africa"] = "ZA";
COUNTRY_CODES["South Korea"] = "KR";
COUNTRY_CODES["South Georgia and the South Sandwich Islands"] = "GS";
COUNTRY_CODES["Spain"] = "ES";
COUNTRY_CODES["Sri Lanka"] = "LK";
COUNTRY_CODES["Sudan"] = "SD";
COUNTRY_CODES["Suriname"] = "SR";
COUNTRY_CODES["Svalbard and Jan Mayen Islands"] = "SJ";
COUNTRY_CODES["Swaziland"] = "SZ";
COUNTRY_CODES["Sweden"] = "SE";
COUNTRY_CODES["Switzerland"] = "CH";
COUNTRY_CODES["Syria"] = "SY";
COUNTRY_CODES["Taiwan"] = "TW";
COUNTRY_CODES["Tajikistan"] = "TJ";
COUNTRY_CODES["Tanzania"] = "TZ";
COUNTRY_CODES["Thailand"] = "TH";
COUNTRY_CODES["Togo"] = "TG";
COUNTRY_CODES["Tokelau"] = "TK";
COUNTRY_CODES["Tonga"] = "TO";
COUNTRY_CODES["Trinidad and Tobago"] = "TT";
COUNTRY_CODES["Tromelin Island"] = "TE";
COUNTRY_CODES["Tunisia"] = "TN";
COUNTRY_CODES["Turkey"] = "TR";
COUNTRY_CODES["Turkmenistan"] = "TM";
COUNTRY_CODES["Turks and Caicos Islands"] = "TC";
COUNTRY_CODES["Tuvalu"] = "TV";
COUNTRY_CODES["Uganda"] = "UG";
COUNTRY_CODES["Ukraine"] = "UA";
COUNTRY_CODES["United Arab Emirates"] = "AE";
COUNTRY_CODES["United Kingdom"] = "GB";
COUNTRY_CODES["United States"] = "US";
COUNTRY_CODES["United States Minor Outlying Islands"] = "UM";
COUNTRY_CODES["Uruguay"] = "UY";
COUNTRY_CODES["Uzbekistan"] = "UZ";
COUNTRY_CODES["Vanuatu"] = "VU";
COUNTRY_CODES["Vatican City State (Holy See)"] = "VA";
COUNTRY_CODES["Venezuela"] = "VE";
COUNTRY_CODES["Vietnam"] = "VN";
COUNTRY_CODES["Virgin Islands  (British)"] = "VI";
COUNTRY_CODES["Virgin Islands (United States)"] = "VQ";
COUNTRY_CODES["Wallis and Futuna Islands"] = "WF";
COUNTRY_CODES["Western Sahara"] = "EH";
COUNTRY_CODES["Yemen"] = "YE";
COUNTRY_CODES["Zambia"] = "ZM";
COUNTRY_CODES["Zimbabwe"] = "ZW";


// Now some initializing functionality

var currentURL = document.URL;			// current URL
var currentPage = window.location.pathname;    // current page name
// http://austrianeconomics.wikia.com/index.php?title=Central_bank&action=edit

var COUNTRY = takeOut(currentURL, "http://austrianeconomics.wikia.com/index.php?title=", "&action=edit" );
COUNTRY = unescape(COUNTRY);
COUNTRY = COUNTRY.replace(/%20/g, ' '); // watch out for stray html spaces
COUNTRY = COUNTRY.replace(/_/g, ' ');   // and take out underscores, if any
GM_log("Now processing country "+COUNTRY);



ISO_CODE = COUNTRY_CODES[COUNTRY];
if( ISO_CODE ){
  GM_log("The ISO Code of the country is "+ISO_CODE);
}else{

  for(key in COUNTRY_CODES)
  {
    if( key.indexOf(COUNTRY) > -1) 
    {
      ISO_CODE = COUNTRY_CODES[key];
      GM_log("Warning: I found a country code but had to wing it: "+ ISO_CODE);
    }
  }
  if( !ISO_CODE ){
    alert("I can't find the ISO code of this country - aborting!");
    GM_log("I can't find the ISO code of this country - aborting!");
    return;
  }
}


ALT_COUNTRY = ""; // alternative country name
for(var i=0; i< COUNTRIES.length; i++){
  var country_bit = COUNTRIES[i];
  if( country_bit[1] == COUNTRY ){
//    GM_log(country_bit);
    if(country_bit[3]){
      ALT_COUNTRY = country_bit[3];
      GM_log("This country has an alternative name: "+ALT_COUNTRY);
    }
    break;
  }
}


WP_link = "http://en.wikipedia.org/wiki/" + COUNTRY.replace(' ', '_');
// like http://en.wikipedia.org/wiki/Albania

NM_link = "http://www.nationmaster.com/country/" + ISO_CODE.toLowerCase() + "-" + COUNTRY.toLowerCase().replace(/ /g, '-');
// like http://www.nationmaster.com/country/al-albania

Currency_link = "http://www.nationmaster.com/country/" + ISO_CODE.toLowerCase() + "-" + COUNTRY.toLowerCase().replace(/ /g, '_') + "/cur-currency";
// like http://www.nationmaster.com/country/al-albania/cur-currency

CI_link = "https://www.cia.gov/library/publications/the-world-factbook/print/textversion.html"; // contains links to countries
//CIA_link = "https://www.cia.gov/library/publications/the-world-factbook/geos/countrytemplate_" + ISO_CODE.toLowerCase() + ".html"; // - not true!
// like https://www.cia.gov/library/publications/the-world-factbook/geos/countrytemplate_al.html

CB_link = "http://www.bis.org/cbanks.htm";
//CB_link = "http://centralbank.monnaie.me/Central-Bank-of-" + COUNTRY.replace(/ /g, '-') + ".htm";

EF_link = "http://www.heritage.org/Index/Country/"+COUNTRY.replace(/ /g, '');
// http://www.heritage.org/Index/Country/UnitedKingdom

TR_link = "http://www.transparency.org/policy_research/surveys_indices/cpi/2009/cpi_2009_table"; // has all countries

ST_link = "http://countrystudies.us/";  // has studies on some countries

BU_link = "http://www.doingbusiness.org/economyrankings/"; // ranks all countries

CP_link = "http://www.enterprisesurveys.org/CountryProfiles/"; // all country profiles

BBC_link = "http://news.bbc.co.uk/2/hi/country_profiles/default.stm";

WB_link_GDP = "http://open.worldbank.org/countries/" + ISO_CODE.toLowerCase() + "/indicators%5BNY.GDP.MKTP.CD%5D?date=1999:2009";
WB_link_Deb = "http://open.worldbank.org/countries/" + ISO_CODE.toLowerCase() + "/indicators%5BGC.DOD.TOTL.GD.ZS%5D?date=1999:2009";
WB_link_Rev = "http://open.worldbank.org/countries/" + ISO_CODE.toLowerCase() + "/indicators%5BGC.REV.XGRT.GD.ZS%5D?date=1999:2009";
WB_link_Exp = "http://open.worldbank.org/countries/" + ISO_CODE.toLowerCase() + "/indicators%5BGC.XPN.TOTL.GD.ZS%5D?date=1999:2009";

// 'global' variables
conditionCounter = 0;
successCounter = 0;
runCounter = 0;

usedReferences = new Array();


// This DIV holds the button to use when the final condition is fulfilled.
finalDiv = document.createElement('div');
finalDiv.setAttribute('style','position:fixed;right:0px;bottom:0px;');
document.body.appendChild(finalDiv);
// http://austrianeconomics.wikia.com/index.php?title=Central_bank&action=edit  textarea id="RTEtextarea"
outputText = document.getElementById('wpTextbox1');


// Final data pieces. [0] is the data, [1] is the reference, [2] was for the year, but is not used.
C_background = new Array();
C_borders = new Array();
C_population = new Array();
C_population_growth = new Array();
C_expectancy = new Array();
C_capital = new Array();
C_govType = new Array();
C_unemployment = new Array();
C_discountRate = new Array();
C_lendingRate = new Array();
C_stockMoney = new Array();
C_quasiMoney = new Array();
C_currency = new Array();
C_isoCode = new Array();
C_centralBank = new Array();
C_indexFreedom = new Array();
C_corruption = new Array();
C_studies = new Array();
C_profile = new Array();
C_businessRank = new Array();
C_bbc = new Array();


// The Worldbank object, that will process Worldbank data and store the results. First, the functions:

/*One data piece looks like:
<wb:data>
<wb:indicator id="NY.GDP.MKTP.CD">GDP (current US$)</wb:indicator>
<wb:country id="BR">Brazil</wb:country>
<wb:value/>
<wb:date>2009</wb:date>
</wb:data>*/

function WB_read_item(str, item){
  // reads a data item like GDP from a Worldbank XML string

  //GM_log(str);
  var data_shreds = str.split('<wb:data>');
  for(var i=0; i<data_shreds.length; i++){
    //GM_log(data_shreds[i]);
    var year = takeOut(data_shreds[i], '<wb:date>', '</wb:date>');
    var value = takeOut(data_shreds[i], '<wb:value>', '</wb:value>');
    if( year && value){
       this.data[item][year-this.MIN_YEAR] = value;
    }
    //GM_log('WB: ' + year + ' ' + value);
  }
  //GM_log( this.print_item(item) );
}

function WB_get_me_data(item){
  // returns a data item like GDP as an array

  return this.data[item];
}

function WB_print_data(item){
  // returns a data item as a formatted string

  return this.data[item].join(', ');
}

function WB_print(){
  // returns all data as a formatted string

  var str = "";
  for(var i=0; i<this.DATA_ITEMS; i++){
    str += this.print_item(i) + '\n';
  }

  return str;
}

function WB_print_wiki(){
  // Returns all data as a string formatted for the wiki.
  // Careful with multiple calls and checkReference() - print_wiki() should be called only once!

  // Header:
  var str = '{| border="1" cellspacing="0" cellpadding="5" style="text-align:center"'; // removed ; font-size:80%
  str += '\n| Statistic / Year';
  years = this.MAX_YEAR - this.MIN_YEAR;
  for(var i=1; i<years+1; i++){
    str += '\n! ' + (this.MIN_YEAR + i - 1);
  }
  str += '\n|-';

  for(var i=0; i<this.DATA_ITEMS; i++){
    //GM_log(this.refs[i]);
    // Which data item is it (like GDP or debt):
    str += '\n! ' + this.names[i] + ' (' + this.units[i] + ')';
    if(this.refs[i]){
      str += checkReference(this.refs[i]);
    }

    // Actual values
    for(var j=0; j<this.data[i].length; j++){
      if(this.data[i][j] == undefined){
	    str += '\n| ';
	  }else{
	    str += '\n| ' + this.data[i][j];// + '\n';
	  }
	}
    if( (i<this.DATA_ITEMS-1) || (j<this.data[i].length-1) ){  // For all but the very last item.
      str += '\n|-';  // End of row.
    }else{
      str += '\n';
    }
  }
  str += '|}';  // End of table.
  return str;
}

function WB_get_min(){
  // returns the smallest number (bigger than zero) of them all 

  var num = 0;
  for(var i=0; i<this.DATA_ITEMS; i++){
    for(var j=0; j<this.data[i].length; j++){
      var x = this.data[i][j];
      if( (num > x) && (x > 0) ){
        num = x;
      }
    }
  }

  return num;
}

function WB_recalculate(){
  // Warning: some of the calculations are irreversible! 
  // Call only once unless you know what you are doing.

  // calculate debt to revenue, if available
  years = this.MAX_YEAR - this.MIN_YEAR;
  for(var i=0; i<years; i++){
    if( this.data[this.DEBT][i] && this.data[this.REVENUE][i]){
	  var debt = parseFloat(this.data[this.DEBT][i]);
	  var revenue = parseFloat(this.data[this.REVENUE][i]);
	  var d2r = debt/revenue;
	  //GM_log(debt + ' ' + revenue + ' ' + d2r);
	  this.data[this.D2R][i] = d2r;
	}
  }

  // adjust numbers down to three decimal points
  for(var i=0; i<this.DATA_ITEMS; i++){
    for(var j=0; j<this.data[i].length; j++){
      var x = this.data[i][j];
      if( x != undefined ){
        x = parseFloat(x).toFixed(3);
		this.data[i][j] = x;
      }
    }
  }

  // shorten the GDP numbers to something reasonable
  var minGDP = 0;
  for( var i=0; i<years; i++ ){
    if( this.data[this.GDP][i] ){
      var x = parseFloat( this.data[this.GDP][i] );
      if( (minGDP > x) && (x > 0) ){
          minGDP = x;
      }
      if( (minGDP == 0) && (x > 0) ){
          minGDP = x;
      }
    }else{
      this.data[this.GDP][i] = "";
    }
  }
  //GM_log('recalculate(): ' + this.print_item(this.GDP) );
  //GM_log('recalculate(): ' + minGDP);

  if( minGDP > 1000000 ){ // bigger than a million, duh
    this.units[this.GDP] = "million USD";

    for(var i=0; i<years; i++){
      var x = parseFloat( this.data[this.GDP][i] );
      if( x > 0 ){
        var y = x/1000000;
        //GM_log('recalculate(): ' + this.data[this.GDP][i] + ' ' + x + '; shortening: '+y + ' to ' + y.toFixed(3));
        if( minGDP > 100000000 ){  // skip the decimals if > 100 millions
          this.data[this.GDP][i] = y.toFixed(0);
        }else{
          this.data[this.GDP][i] = y.toFixed(3);
        }
      }
    }
  }


// add space for every 3 chars in GDP numbers
  for( var i=0; i<years; i++ ){
    var x = this.data[this.GDP][i].toString();
    this.data[this.GDP][i] = addSpaces(x);
  }

/*
for (a = 0; a < num.toString.length; a+=20) {
  myUrl = temp.substring(a,a+20)+" ";
}
*/

  GM_log('recalculate(): ' + this.print() );
}

function WorldbankObject(){
  this.MIN_YEAR = 1999; // determine number of columns in the table and to what year they refer to, MIN_YEAR is [0]
  this.MAX_YEAR = 2009;
  this.DATA_ITEMS = 5; // how many data items, and rows in the table will there be - indices follow:
  this.GDP = 0;
  this.DEBT = 1;   	   // % of GDP!
  this.REVENUE = 2;    // % of GDP!
  this.EXPENSE = 3;    // % of GDP!
  this.D2R = 4;

  this.data = new Array(this.DATA_ITEMS);
  for(var i=0; i<this.DATA_ITEMS; i++){
    this.data[i] = new Array (this.MAX_YEAR - this.MIN_YEAR);
  }
  this.names = ['[[GDP]]', 'Govt. debt', 'Govt. revenue', 'Govt. expenses', 'Debt to revenue'];
  this.units = ['USD', '% of GDP', '% of GDP', '% of GDP', 'years'];
  this.refs = new Array(this.DATA_ITEMS);

  this.read_item = WB_read_item;
  this.get_item = WB_get_me_data;
  this.print_item = WB_print_data;
  this.print = WB_print;
  this.print_wiki = WB_print_wiki;
  this.get_min = WB_get_min;
  this.recalculate = WB_recalculate;
}

WB_object = new WorldbankObject();


// FUNCTIONS

// General functions


function takeOut(str, begin, end){
  // Finds the string between begin and end in str, and strips off white characters. If there are several matches, returns only the first one.
  // Returns empty string if not found.

  //GM_log('Looking for something between' + begin + ' and ' + end);

  //GM_log("takeOut(): "+ begin+" "+end + ' ' + str.length);
  var theBegin = str.indexOf(begin);
  if(theBegin == -1){
    //GM_log("takeOut(): Didn't find string between "+begin+" and "+end);
    return "";
  }
  var afterBegin = theBegin + begin.length;
  //GM_log("takeOut(): " + str.indexOf(end, afterBegin) + ' ' + afterBegin);
  var found = str.slice( afterBegin, str.indexOf(end,afterBegin) );

  //GM_log('Search found:' + found);
  return found.replace(/^\s\s*/, '').replace(/\s\s*$/, ''); // strip white space function from http://blog.stevenlevithan.com/archives/faster-trim-javascript

}



function findBetween(str, begin, middle, end){
  // finds if a string contains the "middle" between "begin" and "end" and returns the whole part including begin and end
  // needs a doublecheck if the indices are calculated and used correctly...

  var posB = str.indexOf(begin);
  var posM = str.indexOf(middle, posB + begin.length);
  var posE = str.indexOf(end, posM + middle.length);
  var posB = str.slice(0,posM).lastIndexOf(begin);
  //GM_log(str.slice(0,posM));
  
  var found = str.slice(posB, posE + end.length);
  //GM_log(begin + ' ' + middle + ' ' + end);
  //GM_log(posB + ' ' + posM + ' ' + posE + ' ' + found);  // findBetween(page, 'Definitions and Notes: Population"', '<div class="category_data">', '</div>'); -1 17142 17689 
  return found;
}


function stripHTML(str){
  // removes HTML tags from a string - all things between < and > will go
  var re = /(<([^>]+)>)/gi;
  var stripped = str.replace(re, "")
  return stripped.replace(/^\s\s*/, '').replace(/\s\s*$/, ''); // strip white space function from http://blog.stevenlevithan.com/archives/faster-trim-javascript

}


function splitBy(str, begin, end){
  // splits string into array by start and ending tags

  GM_log("Splitting... " + str);
}


function getTitle(page){
  // Gets the title of the HTML page, supplied as a string.
  var title = takeOut(page, '<title>', '<' + '/title>');
  //GM_log("The page title is: " + title);
  return title;

}


function addSpaces(nStr){
  // adds spaces as separators, changing a number such as "1000" into a string "1 000"
  // courtesy of: http://www.mredkj.com/javascript/nfbasic.html

  nStr += '';
  var x = nStr.split('.');
  var x1 = x[0];
  var x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ' ' + '$2');
  }
  return x1 + x2;
}



function createReference( id, author, url, title, note){
  // Creates a complete reference string, like: 
  // <ref name="Rothbard_cartel">Murray Rothbard. [http://mises.org/books/mespm.pdf Man, Economy and State], Chapter 10. Referenced 2010-07-16.</ref>
  // turns into: <ref name="ID">AUTHOR. [URL TITLE], NOTE. Referenced DATE.</ref>
  //
  // "id" is the (hopefully) unique identifier of the reference; uses underscores instead of spaces
  // "author" is for the authority of origin or an actual author;
  // "url" is the url of the source page and 
  // "title" is the page title
  // "note" is a misc. note to round things out

  var d = new Date();

  var month = d.getMonth() + 1; if (month < 10) month = "0" + month;
  var day = d.getDate(); if (day < 10) day = "0" + day;
  var year = d.getFullYear();
  var refDate = year + "-" + month + "-" + day;

  var good_id = id.replace(' ', '_');

  reference = '<ref name="' + good_id + '">' + author + '. [' + url + ' "' + title + '"], ' + note + '. Referenced ' + refDate + '.</ref>';

  //GM_log("Reference made: " + reference);
  return reference;
}


function checkReference(ref){
  // Checks if reference ref was already used. If not, returns the whole reference and saves, if yes, returns only the secondary ref - as in:
  // <ref name="Rothbard_Fed">[[Murray N. Rothbard]]. [http://mises.org/books/fed.pdf "The Case Against the Fed"] ... .</ref>
  // vs. 
  // <ref name="Rothbard_Fed" />

  var refCode = takeOut(ref, '<ref name="', '">');  // the "unique identifier" of a reference
  //GM_log(usedReferences + ' ' + refCode + ' ' + usedReferences.indexOf(refCode));

  if( usedReferences.indexOf(refCode) > -1 ){
    return '<ref name="' + refCode + '" />';
  }else{
    usedReferences[usedReferences.length] = refCode;
    return ref;
  }

}


function execOnPage(link, callingFunction){
  // Gets the page from the URL link and performs callingFunction on the string.

  conditionCounter++;

  GM_xmlhttpRequest({
    method: "GET",
    url: link,
    headers: {
      "User-Agent": "Mozilla/5.0",    // If not specified, navigator.userAgent will be used.
      "Accept": "text/xml"            // If not specified, browser defaults will be used.
    },
    onload: function(response) {

    // It is a page, but first let's check for a 404.
    if(response.status == 404){
      GM_log([
        "404 - Page not found! Report:",
        response.status,
        response.statusText,
        response.readyState,
        response.responseHeaders,
        //response.responseText,
        response.finalUrl,
        "End of report."
      ].join("\n"));
      return;
    }

    // Inject responseXML into existing Object if not present
    if (!response.responseXML) {	// is this even needed???
      response.responseXML = new DOMParser()
        .parseFromString(response.responseText, "text/xml");
    }

    var res = response.responseText;
    var xml = response.responseXML;

    /*GM_log([
      "Beginning of page notes:",
      response.status,
      response.statusText,
      response.readyState,
      response.responseHeaders,
      response.finalUrl,
      "End of page notes."
    ].join("\n"));*/

    callingFunction(res, xml, link);

    },
    onerror: function(response) {
      GM_log([
        "Beginning of error message:",
        response.status,
        response.statusText,
        response.readyState,
        response.responseHeaders,
        response.responseText,
        response.finalUrl,
        "End of error message."
      ].join("\n"));
    
    }

  });

}


function constructControl(info, label){
  // Constructs the control interface DIV, with info text (can be formatted) and a label for the button.

  finalDiv.innerHTML = info;
  var btn = document.createElement('input');
  btn.setAttribute('type',"button");
  btn.setAttribute('value',label);
  btn.addEventListener("click", composeCountryPage, true);
  finalDiv.appendChild(btn);
}


function finalCondition(){
  // Tetsts if the final condition is fulfilled - if it is, it enables the page composition button.

  //GM_log("conditionCounter: "+conditionCounter+" successCounter: "+successCounter+" runCounter: "+runCounter);

  if(conditionCounter == successCounter){
    //finalDiv.innerHTML = '<b>Analysis successful.</i> <input type="button" value="Compose wiki page..." onClick="composeCountryPage();">';
    constructControl("<b>Analysis successful.</b> ", "Compose wiki page...");
    return;
  }
  if(conditionCounter == runCounter){
    //finalDiv.innerHTML = '<b>Analysis completed with some issues.</i> <input type="button" value="Try to compose wiki page..." onClick="composeCountryPage();">';
    constructControl("<b>Analysis completed with some issues.</b> ", "Try to compose wiki page...");
    return;
  }

  // No success yet.
  return;

}


// Country handling functions

/*
function NM_country_processing(page){
  // Processing country data from the NationMaster page...

  var NM_BACKGROUND_CONST = "<h4><a href=/graph/bac_bac>Background</a>:</h4>";
  var NM_BACKGROUND_CONST_L = NM_BACKGROUND_CONST.length;
  var NM_BACKGROUND_CONST_E = "<div"; 

  var title = getTitle(page);
  GM_log("The page title is: " + title);

  var borders = takeOut(page, '<h4><a href=/graph/geo_lan_bou_bor_cou>Borders</a>:</h4>', '</td>');  // constants here
  GM_log("The country's borders are: " + borders);

  var hist = takeOut(res, NM_BACKGROUND_CONST, NM_BACKGROUND_CONST_E );
  GM_log("The country's background is: " + hist);

  var capital = takeOut(page, '<h4><A href=/graph/geo_sta_cap>Capital with population</a>:</h4>', '</td>');  // constants here
  GM_log("The country's capital is (with population): " + capital);

  //var population = takeOut(page, 'h4><A href=/graph/peo_pop>Population</a>:</h4>', '</td>');  // constants here
  //GM_log("The country's population is: " + population);

  successCounter++;
  runCounter++;
  finalCondition();
}
*/
/*
function Currency_country_processing(page){
  // Processing currency data from a NationMaster page...
  // but NM has the wrong ISO codes!

  //title = getTitle(page);
  //GM_log("The page title is: " + title);

  var cur = takeOut(page, '<b>Currency</b>', '</tr>');
  C_currency[0] = stripHTML( takeOut(cur, '</td>', '</td>') );
  GM_log("The country's currency is named: " + C_currency[0]);

  var iso = takeOut(page, '<b>ISO code</b>', '</tr>');
  C_isoCode[0] = stripHTML( takeOut(iso, '</td>', '</td>') );
  GM_log("The country's currency ISO code is: " + C_isoCode[0]);

  successCounter++;
  runCounter++;
  finalCondition();
}
*/


function WP_country_processing(page){
  // Processing currency data from Wikipedia... should be good enough...

  //title = getTitle(page);
  //GM_log("The page title is: " + title);

  if(page.indexOf("Category:Disambiguation pages") > -1){
    GM_log("Warning: possibly wrong Wikipedia page!");  // A Disambiguation page is not the right one...
  }

  var cur = takeOut(page, 'href="/wiki/Currency" title="Currency">Currency</a>', '</tr>');
  C_currency[0] = stripHTML( takeOut(cur, '<td>', '</a>') );
  GM_log("The country's currency is named: " + C_currency[0]);

  C_isoCode[0] = takeOut(cur, 'href="/wiki/ISO_4217" title="ISO 4217">', '<');
  GM_log("The country's currency ISO code is: " + C_isoCode[0]);

  successCounter++;
  runCounter++;
  finalCondition();
}

/*
function WB_country_processing(page, xml){
  // Processing country data from the World Bank page...

  var title = getTitle(page);
  GM_log("The page title is: " + title);

  //reportTable = takeOut(page, '<table id="reportMainTable"', '</table>');
  //reportTable = takeOut(reportTable, '<tbody>', '</tbody>');

  // make a DOM out of the string
  //var div = document.createElement('div');
  //div.innerHTML = reportTable;
  //var elements = div.childNodes;

  var x = xml.getElementById('reportMainTable').fistChild; // gets the TBODY out of the table with this ID

  var tr01 = elements.firstChild; // first TR
  //tr01.childNodes[1].firstChild


  //GM_log("The country's borders are: " + borders);

  /*population_link = "http://open.worldbank.org/countries/br/indicators/SP.POP.TOTL?date=2000:2010";

  var population = takeOut(page, 'h4><A href=/graph/peo_pop>Population</a>:</h4>', '</td>');  // constants here
  GM_log("The country's population is: " + population);*/

  successCounter++;
  runCounter++;
  finalCondition();
}
*/

function WB_GDP_processing(page, xml, url){
  // Getting GDP info from the Worldbank...
  //GM_log(page);

  WB_object.read_item(page, WB_object.GDP);
  var ref = createReference( "WorldBank_GDP_" + ISO_CODE, "World Bank", url, COUNTRY + ": GDP", "from World Bank [http://data.worldbank.org/ Data]");
  WB_object.refs[WB_object.GDP] = ref;

  //WB_object.calculate();
  //GM_log( WB_object.print_wiki() );

  successCounter++;
  runCounter++;
  finalCondition();
}

function WB_Deb_processing(page, xml, url){
  // Getting Debt info from the Worldbank...
  //GM_log(page);

  WB_object.read_item(page, WB_object.DEBT);
  var ref = createReference( "WorldBank_Debt_" + ISO_CODE, "World Bank", url, COUNTRY + ": government debt", "from World Bank [http://data.worldbank.org/ Data]");
  WB_object.refs[WB_object.DEBT] = ref;

  //var debt = WB_object.get_item(WB_object.DEBT);
  //GM_log('Worldbank: ' + debt.toString());
  //GM_log( WB_object.print() )

  //WB_object.calculate();
  //GM_log( WB_object.print_wiki() );

  successCounter++;
  runCounter++;
  finalCondition();
}

function WB_Rev_processing(page, xml, url){
  // Getting Revenue info from the Worldbank...
  //GM_log(page);

  WB_object.read_item(page, WB_object.REVENUE);
  var ref = createReference( "WorldBank_Revenue_" + ISO_CODE, "World Bank", url, COUNTRY + ": government revenue", "from World Bank [http://data.worldbank.org/ Data]");
  WB_object.refs[WB_object.REVENUE] = ref;

  //var revenue = WB_object.get_item(WB_object.REVENUE);
  //GM_log('Worldbank: ' + revenue);
  //GM_log( WB_object.print() )

  //WB_object.calculate();
  //GM_log( WB_object.print_wiki() );

  successCounter++;
  runCounter++;
  finalCondition();
}

function WB_Exp_processing(page, xml, url){
  // Getting Expenses info from the Worldbank...
  //GM_log(page);

  WB_object.read_item(page, WB_object.EXPENSE);
  var ref = createReference( "WorldBank_Expenses_" + ISO_CODE, "World Bank", url, COUNTRY + ": government expenses", "from World Bank [http://data.worldbank.org/ Data]");
  WB_object.refs[WB_object.EXPENSE] = ref;

  //var expense = WB_object.get_item(WB_object.EXPENSE);
  //GM_log('Worldbank: ' + expense);
  //GM_log( WB_object.print() )

  //WB_object.calculate();
  //GM_log( WB_object.print_wiki() );

  successCounter++;
  runCounter++;
  finalCondition();
}

function CI_country_processing(page, xml, url){
  // Gets the correct link for the CIA Factbook page...
  //<option value="lo"> Slovakia </option>

  var cia = findBetween(page, '<option value="', '> '+ COUNTRY, '</option>');
  var code = takeOut(cia, '<option value="', '">');
  if(code == ""){
    cia = findBetween(page, '<option value="', ALT_COUNTRY, '</option>');
    code = takeOut(cia, '<option value="', '">');
  }
  //GM_log(cia + ' ' + url);
  CIA_link = "https://www.cia.gov/library/publications/the-world-factbook/geos/countrytemplate_" + code + ".html";
  GM_log("The correct CIA Factbook link for the country is: " + CIA_link);
  execOnPage(CIA_link, CIA_country_processing);

  successCounter++;
  runCounter++;
  finalCondition();
}

function CIA_country_processing(page, xml, url){
  // Processing country data from the NationMaster page...

  //var title = getTitle(page);
  //GM_log("The page title is: " + title);

  var ref = createReference( "CIA_" + ISO_CODE, "CIA - The World Facebook", url, COUNTRY, "from The World Facebook");

  var bck = findBetween(page, 'Definitions and Notes: Background', '<div class="category_data">', '</div>')
  //GM_log(bck);
  C_background[0] = takeOut(bck, '<div class="category_data">', "</div>");
  C_background[1] = ref;
  GM_log("The country's background is: " + C_background[0] + C_background[1]);

  C_borders[0] = stripHTML( takeOut(page, 'border countries:', '</div>') );
  GM_log("The country borders with the following countries: " + C_borders[0]);

  if( C_borders[0] == "" ){ 		// doesn't have borders with other countries
    C_borders[0] = "(N/A)";
  }else{
    for(var i=0; i< COUNTRIES.length; i++){
      var country_bit = COUNTRIES[i];
      if( C_borders[0].indexOf( country_bit[1] ) > -1 ){ // country name inside
        C_borders[0] = C_borders[0].replace( country_bit[1], "[[" + country_bit[1] + "]]" );  // if you've found a country name, turn it into a link
        //GM_log("Borders: " + C_borders[0]);
      }
      if( country_bit[3] && ( C_borders[0].indexOf( country_bit[3] ) > -1 ) ){ // alternative country name inside
        C_borders[0] = C_borders[0].replace( country_bit[3], "[[" + country_bit[3] + "]]" );  // if you've found a country name, turn it into a link
        //GM_log("Borders: " + C_borders[0]);
      }
    }
	GM_log("Borders: " + C_borders[0]);
  }

  var pop = findBetween(page, 'Definitions and Notes: Population"', '<div class="category_data">', '</div>');
  //GM_log(pop);
  C_population[0] = takeOut(pop, '<div class="category_data">', '</div>');
  C_population[1] = ref;
  GM_log("Population: " + C_population[0]);

  var popg = findBetween(page, 'Definitions and Notes: Population growth rate"', '<div class="category_data">', '</div>');
  //GM_log(pop);
  C_population_growth[0] = takeOut(popg, '<div class="category_data">', '</div>');
  C_population_growth[1] = ref;
  GM_log("Population growth: " + C_population_growth[0]);

  var exp = stripHTML( findBetween(page, 'Definitions and Notes: Life expectancy at birth"', '<div class="category_data">', '</div>') );
  C_expectancy[0] = takeOut(exp, 'total population:', 'country');
  C_expectancy[1] = ref;
  GM_log("Life expectancy at birth - total population: " + C_expectancy[0]);

  var gov = takeOut(page, 'id="CollapsiblePanel1_Govt"', 'id="CollapsiblePanel1_Econ"');
  C_capital[0] = stripHTML( takeOut(gov, 'name: ', 'geographic') );
  GM_log("Capital: " + C_capital[0]);

  var typ = takeOut(gov, 'Definitions and Notes: Government type', '</span>');
  C_govType[0] = takeOut(typ, '<div class="category_data">', '</div>');
  GM_log("Government type: " + C_govType[0]);

  var econ = takeOut(page, 'id="CollapsiblePanel1_Econ"', 'id="CollapsiblePanel1_Comm"');

  var une = findBetween(page, 'Definitions and Notes: Unemployment rate"', '<div class="category_data">', '</div>');
  C_unemployment[0] = takeOut(une, '<div class="category_data">', "</div>");
  C_unemployment[1] = ref;
  GM_log("Unemployment: " + C_unemployment[0]);

  var cen = takeOut(econ, 'title="Definitions and Notes: Central bank discount rate', 'title="Definitions and Notes: ');
  C_discountRate[0] = takeOut(cen, '<div class="category_data">', '</div>');
  C_discountRate[1] = ref;
  GM_log("Central bank discount rate: " + C_discountRate[0]);

  var pri = findBetween(econ, '<td', 'Definitions and Notes: Commercial bank prime lending rate', '<tr>');
  C_lendingRate[0] = takeOut(pri, '<div class="category_data">', '</div>');
  C_lendingRate[1] = ref;
  GM_log("Commercial bank prime lending rate: " + C_lendingRate[0]);

  var m1 = takeOut(econ, 'title="Definitions and Notes: Stock of money', 'title="Definitions and Notes: ');
  C_stockMoney[0] = takeOut(m1, '<div class="category_data">', '</div>');
  C_stockMoney[1] = ref;
  GM_log("Stock of money (M1): " + C_stockMoney[0]);

  var m12 = takeOut(econ, 'title="Definitions and Notes: Stock of quasi money', 'title="Definitions and Notes: ');
  C_quasiMoney[0] = takeOut(m12, '<div class="category_data">', '</div>');
  C_quasiMoney[1] = ref;
  GM_log("Stock of quasi money (with M1 makes M2): " + C_quasiMoney[0]);


  successCounter++;
  runCounter++;
  finalCondition();
}


/*function CB_country_processing(page){
  // Processing country data from the OLD Central Bank page...

  //var title = getTitle(page);
  //GM_log("The page title is: " + title);

  var x = takeOut(page, '<h2', '</h2>');
  GM_log(x);
  C_centralBank[0] = takeOut(x, 'href="', '"');
  GM_log(C_centralBank[0]);
  if(C_centralBank[0]){
    GM_log("The central bank can be found on the URL: " + C_centralBank[0]);
  }else{
    GM_log("This country does not seem to have a central bank.");
  }

  successCounter++;
  runCounter++;
  finalCondition();
}*/

function CB_country_processing(page){
  // Processing country data from the Central Bank page...

  //var title = getTitle(page);
  //GM_log("The page title is: " + title);

  var x = findBetween(page, '<td', COUNTRY, '</a></td>');
  //GM_log(x);
  C_centralBank[0] = takeOut(x, 'href="goto.htm?', '"');
  //GM_log(C_centralBank[0]);
  if(C_centralBank[0]){
    GM_log("The central bank can be found on the URL: " + C_centralBank[0]);
  }else{
    GM_log("This country does not seem to have a central bank.");
  }

  successCounter++;
  runCounter++;
  finalCondition();
}


function EF_country_processing(page, xml, url){
  // Processing economic freedom data from the Heritage Foundation page...

  //title = getTitle(page);
  //GM_log("The page title is: " + title);
  var ref = createReference( "Heritage_" + ISO_CODE, "Heritage Foundation", url, COUNTRY, "Economic Freedom Score. A lower ranking is better; but please be careful when comparing between different countries or years");

  var ef = takeOut(page, 'World Rank: ', '</h3>');
  C_indexFreedom[0] = takeOut(ef, '<span class="number">', '</span>');
  C_indexFreedom[1] = ref;
  GM_log("The country's freedom ranking is: " + C_indexFreedom[0]);

  successCounter++;
  runCounter++;
  finalCondition();
}


function TR_country_processing(page, xml, url){
  // Processing corruption perception data from the Transparency International page...

  var ref = createReference( "Transparency_" + ISO_CODE, "Transparency International", url, COUNTRY, "Corruption Perceptions Index 2009. A lower ranking is better; but please note that the numbers cannot be compared between countries or years due to different methodology");

  var rank = findBetween(page, '<tr>', COUNTRY, '</tr>');
  C_corruption[0] = takeOut(rank, '<p>', '</p>');
  C_corruption[1] = ref;
  GM_log("The country's corruption perception ranking is: " + C_corruption[0]);

  successCounter++;
  runCounter++;
  finalCondition();
}

function BU_country_processing(page, xml, url){
  // Processing ranking data from the Doing Business page...

  var ref = createReference( "Business_" + ISO_CODE, "Doing Business", url, COUNTRY, "Doing Business 2010 (part of The World Bank Group). A lower ranking is better; but please be careful when comparing between different countries or years");

  var rank = takeOut(page, COUNTRY+'</a>', '</tr>');
  GM_log(rank + ' ' + ALT_COUNTRY);
  if( (rank == "") && (ALT_COUNTRY != "") ){
    rank = takeOut(page, ALT_COUNTRY+'</a>', '</tr>');
  }
  if( rank == ""){
    GM_log("Can't find a Doing Business ranking for this country.");
    return;
  }

  // ...but if it works:
  C_businessRank[0] = takeOut(rank, '<td class="right">', '</td>');
  C_businessRank[1] = ref;
  GM_log("The country's Doing Business ranking is: " + C_businessRank[0]);

  successCounter++;
  runCounter++;
  finalCondition();
}


function ST_country_processing(page, xml, url){
  // Getting link to studies from the page of Country Studies - http://countrystudies.us/...
  //GM_log(page);
  var study = findBetween(page, '<a ', COUNTRY, '</a>');
  GM_log(study);
  var link = takeOut(study, '<a href="', '"');
  C_studies[0] = link;//.replace(' ', "%20"); // link may contain spaces, fixing it!

  if(C_studies[0]){
    GM_log("There are studies from the Library of Congress on this country, here: " + C_studies[0]);
  }else{
    GM_log("There are NO studies from the Library of Congress on this country.");
  }

  successCounter++;
  runCounter++;
  finalCondition();
}

function CP_country_processing(page, xml, url){
  // Getting link to country profiles from Enterprise Surveys - http://www.enterprisesurveys.org/CountryProfiles/
  // <option selected="selected" value="/documents/EnterpriseSurveys/Reports/Afghanistan-2009.pdf">Afghanistan (2009)</option>
  // NOT: <option value="72:2009">Afghanistan (2009) </option>
  // full link: http://www.enterprisesurveys.org/documents/EnterpriseSurveys/Reports/Slovakia-2009.pdf

  var profile = findBetween(page, 'value="/documents/', COUNTRY, '</option>');
  GM_log(profile);
  var link = takeOut(profile, 'value="', '"');

  if( link ){
    C_profile[0] = 'http://www.enterprisesurveys.org' + link;
    GM_log("There is a profile from the Enterprise Surveys page, here: " + C_profile[0]);
  }else{
    C_profile[0] = '';
    GM_log("There is NO profile from the Enterprise Surveys page.");
  }

  successCounter++;
  runCounter++;
  finalCondition();
}

function BBC_country_processing(page, xml, url){
  // Getting link to country profiles from BBC - http://news.bbc.co.uk/2/hi/country_profiles/default.stm
  // <option value="http://news.bbc.co.uk/1/hi/world/middle_east/country_profiles/790556.stm">  Algeria </option>
  // full link: http://www.enterprisesurveys.org/documents/EnterpriseSurveys/Reports/Slovakia-2009.pdf

  var profile = findBetween(page, '<option ', COUNTRY, '</option>');
  //GM_log(profile);
  if( (profile == "") && (ALT_COUNTRY != "") ){
    profile  = findBetween(page, '<option ', ALT_COUNTRY, '</option>');
  }

  var link = takeOut(profile, 'value="', '"');

  if( link ){
    C_bbc[0] = link;
    GM_log("There is a profile from the BBC, here: " + C_bbc[0]);
  }else{
    C_bbc[0] = '';
    GM_log("There is NO profile from the BBC.");
  }

  successCounter++;
  runCounter++;
  finalCondition();
}

function composeCountryPage(){
  // This function creates the new wiki page - to be called in the end, when everything is found and done.

  alert("Now making country page!");
  GM_log("Now making country page!");

  WB_object.recalculate();
  GM_log( WB_object.print() );
  
  titleCountry = C_background[0].indexOf(COUNTRY);
  if( titleCountry > -1 ){
    C_background[0] = C_background[0].replace(COUNTRY, "'''"+COUNTRY+"'''");  // make the first country name bold
  }

  var page = "";
  //page += '=' + COUNTRY + '=';  // remove for the real thing
  page += '{{Stub}}\n'

  page += '\n{{Infobox';
  page += '\n|Box title = Country summary';
  page += '\n|Row 1 title = Capital';
  page += '\n|Row 1 info = ' + C_capital[0];
  page += '\n|Row 2 title = Borders';
  page += '\n|Row 2 info = ' + C_borders[0];
  page += '\n|Row 3 title = Government type';
  page += '\n|Row 3 info = ' + C_govType[0];
  page += '\n|Row 4 title = Population';
  page += '\n|Row 4 info = ' + C_population[0] + checkReference(C_population[1]);
  page += '\n|Row 5 title = Population growth';
  page += '\n|Row 5 info = ' + C_population_growth[0] + checkReference(C_population_growth[1]);
  page += '\n|Row 6 title = Life expectancy';
  page += '\n|Row 6 info = ' + C_expectancy[0] + checkReference(C_expectancy[1]);
  page += '\n|Row 7 title = Unemployment';
  page += '\n|Row 7 info = ' + C_unemployment[0] + checkReference(C_unemployment[1]);

  var rownum = 8;
  if(C_indexFreedom[0]){
    page += '\n|Row ' + rownum + ' title = [[Wikipedia:Index of Economic Freedom|Index of Economic Freedom]]';
    page += '\n|Row ' + rownum + ' info = ' + C_indexFreedom[0] + checkReference(C_indexFreedom[1]);
    rownum++;
  }
  if(C_corruption[0]){
    page += '\n|Row ' + rownum + ' title = [[Wikipedia:Corruption Perceptions Index|Corruption Perceptions Index]]';
    page += '\n|Row ' + rownum + ' info = '+ C_corruption[0] + checkReference(C_corruption[1]);
    rownum++;
  }
  if(C_businessRank[0]){
    page += '\n|Row ' + rownum + ' title = [[Wikipedia:Doing Business Report|Doing Business ranking]]';
    page += '\n|Row ' + rownum + ' info = ' + C_businessRank[0] + checkReference(C_businessRank[1]);
    rownum++;
  }
  page += '\n}}';

  page += "\n\n" + C_background[0] + checkReference(C_background[1]);

  page += '\n\n==Economical characteristics==';

  page += "\n* '''Currency''': " + C_currency[0];
  page += " (ISO code: " + C_isoCode[0] + ")";
  if(!C_centralBank[0]){
    page += "\n* This country does not seem to have a central bank.";
  }
  page += "\n* Central bank '''[[Wikipedia:Discount rate|discount rate]]''': " + C_discountRate[0] + checkReference(C_discountRate[1]);
  page += "\n* Commercial banks '''lending rate''': " + C_lendingRate[0] + checkReference(C_lendingRate[1]);
  page += "\n* '''Stock of money''' ([[Money supply#M1|M1]]): " + C_stockMoney[0] + checkReference(C_stockMoney[1]);
  page += "\n* '''Quasi money''' (with M1 makes [[Money supply#M2|M2]]): " + C_quasiMoney[0] + checkReference(C_quasiMoney[1]);

  page += "\n\n\n===Statistics===\n";
  page += WB_object.print_wiki();

  page += "\n\n==References==";
  page += "\n<small>Note: statistical data was rounded. Different sources may use different methodologies for their estimates. Debt to revenue is calculated by dividing the two variables from their original ('unrounded') values. It represents how long it would a government take to repay its entire debt if it used its whole revenue for this purpose.</small>\n";
  page += '{{Reflist}}\n';

  page += "\n==External links==";
  page += "\n* [[Wikipedia:" + COUNTRY + "|" + COUNTRY + "]] on Wikipedia";
  if(C_centralBank[0]){
    page += "\n* [" + C_centralBank[0] + " Central bank] of " + COUNTRY;
  }else{
    //page += "This country does not seem to have a central bank.");
  }
  if(C_profile[0]){
    page += "\n* [" + C_profile[0] + " Country profile] (pdf) from the Enterprise Studies page (part of the The World Bank Group)";
  }
  if(C_studies[0]){
    page += "\n* [" + C_studies[0] + " Studies] from the Library of Congress (1986-1998)";
  }
  if(C_bbc[0]){
    page += "\n* BBC [" + C_bbc[0] + " country profile]";
  }
  page += "\n";

  page += "\n[[Category:Countries]]\n";

  if(outputText) outputText.value = page;
  GM_log(page);

}


// Finishing steps, initialising run...
//GM_log(789);

constructControl("<i>Analysis running...</i> ", "Try anyway...");


execOnPage(CI_link, CI_country_processing); // first get the link to the CIA Factbook, then the rest
execOnPage(WB_link_GDP, WB_GDP_processing);
execOnPage(WB_link_Deb, WB_Deb_processing);
execOnPage(WB_link_Rev, WB_Rev_processing);
execOnPage(WB_link_Exp, WB_Exp_processing);
execOnPage(CB_link, CB_country_processing);
execOnPage(WP_link, WP_country_processing);
execOnPage(EF_link, EF_country_processing);
execOnPage(CP_link, CP_country_processing);
execOnPage(TR_link, TR_country_processing);
execOnPage(ST_link, ST_country_processing);
execOnPage(BU_link, BU_country_processing);
execOnPage(BBC_link, BBC_country_processing);

GM_log("...initialization process over.");


// The End.

