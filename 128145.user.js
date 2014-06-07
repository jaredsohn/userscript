// ==UserScript==
// @name	Anno1777 Forex Exchange Tool LITE
// @author      bjrey
// @namespace	Anno1777 exchange tool by bjrey LITE
// @description	A tool to Exchanges local currencies in Anno1777, the easy way.
// @license     GNU General Public License (GPL)
// @version	0.2.3
// @include	*anno1777.com/pages/fin_markets/main.php?key=*&lang=*&page=forex&sub_page=goldmon&*
// @released    2012-03-12
// @updated     2012-11-01
// @require	http://code.jquery.com/jquery-latest.js
// @compatible  Greasemonkey
// ==/UserScript==

// Version: 0.2.3 Added the rest of the known currencies, now there is 232 currencies total
// Also included the Countries name to make finding currencies a little easier.

// Version: 0.2.2 Added MRD

//Version: 0.2.1
// Fixed Anno1777 URL problem, where the script would only display on www.anno1777.com Now it does both anno1777.com, and www.anno1777.com

//Version: 0.2
// Changed script to allow the script to work if an error was thrown when exchanging local currencies and also state what currency was being exchanged, the script doesn't show up if the transaction was successful.
// fixed some bugs with Anno1777 on the GOLD/(local currency) page, mostly bad translation and wrong currency values (couldn't fix the bug in the Exchange Graph) (PROVIDE MORE IN EXPANDED VERSION)
// Change the color of the exchange currency (if another is selected) so it's easier to see what currency is going to be exchanged
// fixed script errors with; ERD CGD HND TWD |*|*| and added 30 missing currencies; AOG AON BFD CCD CID CKD EEA EUR FMD GAD GHD GID GMD GQD GWD GYD HKD IQD ISD JOD KED KGD KHD LID LYD PAB SCR SVD TDD VID
// All 185 currencies have been added, so unless the admin add's new regions or changes currencies, all the currencies can now be exchanged (except Euro, of course. You can't dirrectly exchange local currency into Euro)

// Get session key, language ID and default currency (the currency of the region currently located in)
var sessionkeyCode =$('#mm1').attr('onclick').substring(43,75), langID =$('#mm1').attr('onclick').substring(81,83), dCur = $('.text_grix12xbold').text();

// CSS
GM_addStyle(' .divclass { float:left; } #dividspan { padding-left:10px; } #dividselect select { color: blue; } .slCur { color:green;}  ');

// create select element, and populate with currency IDs
var csCode = document.createElement('select');
csCode.id = "cselectid";
csCode.name = "selcur";
var selectoptionsCur = '<option value="AXD" class="AXD">AALAND ISLANDS - AXD</option>' +'<option value="AFD" class="AFD">AFGHANISTAN - AFD</option>' +'<option value="ALL" class="ALL">ALBANIA - ALL</option>' +'<option value="DZD" class="DZD">ALGERIA - DZD</option>' +'<option value="ASD" class="ASD">AMERICAN SAMOA - ASD</option>' +'<option value="ADD" class="ADD">ANDORRA - ADD</option>' +'<option value="AON" class="AON">ANGOLA - AON</option>' +'<option value="AID" class="AID">ANGUILLA - AID</option>' +'<option value="AGD" class="AGD">ANTIGUA AND BARBUDA - AGD</option>' +'<option value="ARS" class="ARS">ARGENTINA - ARS</option>' +'<option value="AMD" class="AMD">ARMENIA - AMD</option>' +'<option value="AWG" class="AWG">ARUBA - AWG</option>' +'<option value="AUD" class="AUD">AUSTRALIA - AUD</option>' +'<option value="ATS" class="ATS">AUSTRIA - ATS</option>' +'<option value="AZN" class="AZN">AZERBAIJAN - AZN</option>' +'<option value="BSD" class="BSD">BAHAMAS - BSD</option>' +'<option value="BHD" class="BHD">BAHRAIN - BHD</option>' +'<option value="BDT" class="BDT">BANGLADESH - BDT</option>' +'<option value="BBD" class="BBD">BARBADOS - BBD</option>' +'<option value="BYR" class="BYR">BELARUS - BYR</option>' +'<option value="BEF" class="BEF">BELGIUM - BEF</option>' +'<option value="BZD" class="BZD">BELIZE - BZD</option>' +'<option value="BJD" class="BJD">BENIN - BJD</option>' +'<option value="BMD" class="BMD">BERMUDA - BMD</option>' +'<option value="BTD" class="BTD">BHUTAN - BTD</option>' +'<option value="BOB" class="BOB">BOLIVIA - BOB</option>' +'<option value="BAD" class="BAD">BOSNIA AND HERZEGOWINA - BAD</option>' +'<option value="BWD" class="BWD">BOTSWANA - BWD</option>' +'<option value="BRL" class="BRL">BRAZIL - BRL</option>' +'<option value="BND" class="BND">BRUNEI - BND</option>' +'<option value="BGN" class="BGN">BULGARIA - BGN</option>' +'<option value="BFD" class="BFD">BURKINA FASO - BFD</option>' +'<option value="BID" class="BID">BURUNDI - BID</option>' +'<option value="KHD" class="KHD">CAMBODIA - KHD</option>' +'<option value="CMD" class="CMD">CAMEROON - CMD</option>' +'<option value="CAD" class="CAD">CANADA - CAD</option>' +'<option value="CVE" class="CVE">CAPE VERDE - CVE</option>' +'<option value="KYD" class="KYD">CAYMAN ISLANDS - KYD</option>' +'<option value="CFD" class="CFD">CENTRAL AFRICAN REPUBLIC - CFD</option>' +'<option value="TDD" class="TDD">CHAD - TDD</option>' +'<option value="CLP" class="CLP">CHILE - CLP</option>' +'<option value="CNY" class="CNY">CHINA - CNY</option>' +'<option value="CXD" class="CXD">CHRISTMAS ISLAND - CXD</option>' +'<option value="CCD" class="CCD">COCOS ISLANDS - CCD</option>' +'<option value="COP" class="COP">COLOMBIA - COP</option>' +'<option value="KMF" class="KMF">COMOROS - KMF</option>' +'<option value="CGD" class="CGD">CONGO - CGD</option>' +'<option value="CKD" class="CKD">COOK ISLANDS - CKD</option>' +'<option value="CRD" class="CRD">COSTA RICA - CRD</option>' +'<option value="CID" class="CID">COTE DIVOIRE - CID</option>' +'<option value="HRK" class="HRK">CROATIA - HRK</option>' +'<option value="CUP" class="CUP">CUBA - CUP</option>' +'<option value="CYD" class="CYD">CYPRUS - CYD</option>' +'<option value="CZK" class="CZK">CZECH REPUBLIC - CZK</option>' +'<option value="DKK" class="DKK">DENMARK - DKK</option>' +'<option value="DJD" class="DJD">DJIBOUTI - DJD</option>' +'<option value="DMD" class="DMD">DOMINICA - DMD</option>' +'<option value="DOP" class="DOP">DOMINICAN REPUBLIC - DOP</option>' +'<option value="ECS" class="ECS">ECUADOR - ECS</option>' +'<option value="EGP" class="EGP">EGYPT - EGP</option>' +'<option value="SVD" class="SVD">EL SALVADOR - SVD</option>' +'<option value="GQD" class="GQD">EQUATORIAL GUINEA - GQD</option>' +'<option value="ERD" class="ERD">ERITREA - ERD</option>' +'<option value="EEK" class="EEK">ESTONIA - EEK</option>' +'<option value="ETB" class="ETB">ETHIOPIA - ETB</option>' +'<option value="FKD" class="FKD">FALKLAND ISLANDS - FKD</option>' +'<option value="FOD" class="FOD">FAROE ISLANDS - FOD</option>' +'<option value="FJD" class="FJD">FIJI - FJD</option>' +'<option value="FIM" class="FIM">FINLAND - FIM</option>' +'<option value="FRF" class="FRF">FRANCE - FRF</option>' +'<option value="GFD" class="GFD">FRENCH GUIANA - GFD</option>' +'<option value="PFD" class="PFD">FRENCH POLYNESIA - PFD</option>' +'<option value="GAD" class="GAD">GABON - GAD</option>' +'<option value="GMD" class="GMD">GAMBIA - GMD</option>' +'<option value="GEL" class="GEL">GEORGIA - GEL</option>' +'<option value="DEM" class="DEM">GERMANY - DEM</option>' +'<option value="GHD" class="GHD">GHANA - GHD</option>' +'<option value="GID" class="GID">GIBRALTAR - GID</option>' +'<option value="GRD" class="GRD">GREECE - GRD</option>' +'<option value="GLD" class="GLD">GREENLAND - GLD</option>' +'<option value="GDD" class="GDD">GRENADA - GDD</option>' +'<option value="GPD" class="GPD">GUADELOUPE - GPD</option>' +'<option value="GUD" class="GUD">GUAM - GUD</option>' +'<option value="GTQ" class="GTQ">GUATEMALA - GTQ</option>' +'<option value="GND" class="GND">GUINEA - GND</option>' +'<option value="GWD" class="GWD">GUINEA" class="BISSAU - GWD</option>' +'<option value="GYD" class="GYD">GUYANA - GYD</option>' +'<option value="HTG" class="HTG">HAITI - HTG</option>' +'<option value="HND" class="HND">HONDURAS - HND</option>' +'<option value="HKD" class="HKD">HONG KONG - HKD</option>' +'<option value="HUF" class="HUF">HUNGARY - HUF</option>' +'<option value="ISD" class="ISD">ICELAND - ISD</option>' +'<option value="INR" class="INR">INDIA - INR</option>' +'<option value="IDR" class="IDR">INDONESIA - IDR</option>' +'<option value="IRR" class="IRR">IRAN - IRR</option>' +'<option value="IQD" class="IQD">IRAQ - IQD</option>' +'<option value="IEP" class="IEP">IRELAND - IEP</option>' +'<option value="ILS" class="ILS">ISRAEL - ILS</option>' +'<option value="ITL" class="ITL">ITALY - ITL</option>' +'<option value="JMD" class="JMD">JAMAICA - JMD</option>' +'<option value="JPY" class="JPY">JAPAN - JPY</option>' +'<option value="JOD" class="JOD">JORDAN - JOD</option>' +'<option value="KZT" class="KZT">KAZAKHSTAN - KZT</option>' +'<option value="KED" class="KED">KENYA - KED</option>' +'<option value="KID" class="KID">KIRIBATI - KID</option>' +'<option value="KWD" class="KWD">KUWAIT - KWD</option>' +'<option value="KGD" class="KGD">KYRGYZSTAN - KGD</option>' +'<option value="LAD" class="LAD">LAO - LAD</option>' +'<option value="LVL" class="LVL">LATVIA - LVL</option>' +'<option value="LBP" class="LBP">LEBANON - LBP</option>' +'<option value="LSD" class="LSD">LESOTHO - LSD</option>' +'<option value="LRD" class="LRD">LIBERIA - LRD</option>' +'<option value="LYD" class="LYD">LIBYA - LYD</option>' +'<option value="LID" class="LID">LIECHTENSTEIN - LID</option>' +'<option value="LTL" class="LTL">LITHUANIA - LTL</option>' +'<option value="LUD" class="LUD">LUXEMBOURG - LUD</option>' +'<option value="MOD" class="MOD">MACAU - MOD</option>' +'<option value="MGD" class="MGD">MADAGASCAR - MGD</option>' +'<option value="MWD" class="MWD">MALAWI - MWD</option>' +'<option value="MYR" class="MYR">MALAYSIA - MYR</option>' +'<option value="MVD" class="MVD">MALDIVES - MVD</option>' +'<option value="MLD" class="MLD">MALI - MLD</option>' +'<option value="MTL" class="MTL">MALTA - MTL</option>' +'<option value="MHD" class="MHD">MARSHALL ISLANDS - MHD</option>' +'<option value="MQD" class="MQD">MARTINIQUE - MQD</option>' +'<option value="MRD" class="MRD">MAURITANIA - MRD</option>' +'<option value="MUR" class="MUR">MAURITIUS - MUR</option>' +'<option value="MXN" class="MXN">MEXICO - MXN</option>' +'<option value="FMD" class="FMD">MICRONESIA - FMD</option>' +'<option value="MDL" class="MDL">MOLDOVA - MDL</option>' +'<option value="MCD" class="MCD">MONACO - MCD</option>' +'<option value="MND" class="MND">MONGOLIA - MND</option>' +'<option value="MED" class="MED">MONTENEGRO - MED</option>' +'<option value="MSD" class="MSD">MONTSERRAT - MSD</option>' +'<option value="MAD" class="MAD">MOROCCO - MAD</option>' +'<option value="MZD" class="MZD">MOZAMBIQUE - MZD</option>' +'<option value="MMD" class="MMD">MYANMAR - MMD</option>' +'<option value="NAD" class="NAD">NAMIBIA - NAD</option>' +'<option value="NRD" class="NRD">NAURU - NRD</option>' +'<option value="NPD" class="NPD">NEPAL - NPD</option>' +'<option value="NLG" class="NLG">NETHERLANDS - NLG</option>' +'<option value="AND" class="AND">NETHERLANDS ANTILLES - AND</option>' +'<option value="NCD" class="NCD">NEW CALEDONIA - NCD</option>' +'<option value="NZD" class="NZD">NEW ZEALAND - NZD</option>' +'<option value="NID" class="NID">NICARAGUA - NID</option>' +'<option value="NED" class="NED">NIGER - NED</option>' +'<option value="NGN" class="NGN">NIGERIA - NGN</option>' +'<option value="NUD" class="NUD">NIUE - NUD</option>' +'<option value="NFD" class="NFD">NORFOLK ISLAND - NFD</option>' +'<option value="MPD" class="MPD">NORTHERN MARIANA ISLANDS - MPD</option>' +'<option value="NOK" class="NOK">NORWAY - NOK</option>' +'<option value="OMD" class="OMD">OMAN - OMD</option>' +'<option value="PKR" class="PKR">PAKISTAN - PKR</option>' +'<option value="PWD" class="PWD">PALAU - PWD</option>' +'<option value="PSD" class="PSD">PALESTINIAN TERRITORY - PSD</option>' +'<option value="PAB" class="PAB">PANAMA - PAB</option>' +'<option value="PGK" class="PGK">PAPUA NEW GUINEA - PGK</option>' +'<option value="PYG" class="PYG">PARAGUAY - PYG</option>' +'<option value="PEN" class="PEN">PERU - PEN</option>' +'<option value="PHP" class="PHP">PHILIPPINES - PHP</option>' +'<option value="PND" class="PND">PITCAIRN - PND</option>' +'<option value="PLN" class="PLN">POLAND - PLN</option>' +'<option value="PTE" class="PTE">PORTUGAL - PTE</option>' +'<option value="PRD" class="PRD">PUERTO RICO - PRD</option>' +'<option value="QAD" class="QAD">QATAR - QAD</option>' +'<option value="MKD" class="MKD">REPUBLIC OF MACEDONIA - MKD</option>' +'<option value="RED" class="RED">REUNNION - RED</option>' +'<option value="RON" class="RON">ROMANIA - RON</option>' +'<option value="RUB" class="RUB">RUSSIA - RUB</option>' +'<option value="RWD" class="RWD">RWANDA - RWD</option>' +'<option value="SHD" class="SHD">SAINT HELENA - SHD</option>' +'<option value="KND" class="KND">SAINT KITTS AND NEVIS - KND</option>' +'<option value="LCD" class="LCD">SAINT LUCIA - LCD</option>' +'<option value="PMD" class="PMD">SAINT PIERRE AND MIQUELON - PMD</option>' +'<option value="VCD" class="VCD">SAINT VINCENT AND THE GRENADIN - VCD</option>' +'<option value="WST" class="WST">SAMOA - WST</option>' +'<option value="SMD" class="SMD">SAN MARINO - SMD</option>' +'<option value="STD" class="STD">SAO TOME AND PRINCIPE - STD</option>' +'<option value="SAR" class="SAR">SAUDI ARABIA - SAR</option>' +'<option value="SND" class="SND">SENEGAL - SND</option>' +'<option value="RSD" class="RSD">SERBIA - RSD</option>' +'<option value="SCR" class="SCR">SEYCHELLES - SCR</option>' +'<option value="SLD" class="SLD">SIERRA LEONE - SLD</option>' +'<option value="SGD" class="SGD">SINGAPORE - SGD</option>' +'<option value="SKK" class="SKK">SLOVAKIA - SKK</option>' +'<option value="SIT" class="SIT">SLOVENIA - SIT</option>' +'<option value="SBD" class="SBD">SOLOMON ISLANDS - SBD</option>' +'<option value="SOD" class="SOD">SOMALIA - SOD</option>' +'<option value="ZAR" class="ZAR">SOUTH AFRICA - ZAR</option>' +'<option value="GSD" class="GSD">SOUTH GEORGIA AND THE SOUTH SA - GSD</option>' +'<option value="KRW" class="KRW">SOUTH KOREA - KRW</option>' +'<option value="ESP" class="ESP">SPAIN - ESP</option>' +'<option value="LKD" class="LKD">SRI LANKA - LKD</option>' +'<option value="SDD" class="SDD">SUDAN - SDD</option>' +'<option value="SRG" class="SRG">SURINAME - SRG</option>' +'<option value="SZD" class="SZD">SWAZILAND - SZD</option>' +'<option value="SEK" class="SEK">SWEDEN - SEK</option>' +'<option value="CHF" class="CHF">SWITZERLAND - CHF</option>' +'<option value="SYP" class="SYP">SYRIA - SYP</option>' +'<option value="TWD" class="TWD">TAIWAN - TWD</option>' +'<option value="TJD" class="TJD">TAJIKISTAN - TJD</option>' +'<option value="TZD" class="TZD">TANZANIA - TZD</option>' +'<option value="THB" class="THB">THAILAND - THB</option>' +'<option value="TLD" class="TLD">TIMOR" class="LESTE - TLD</option>' +'<option value="TGD" class="TGD">TOGO - TGD</option>' +'<option value="TKD" class="TKD">TOKELAU - TKD</option>' +'<option value="TOG" class="TOG">TONGA - TOG</option>' +'<option value="TTD" class="TTD">TRINIDAD AND TOBAGO - TTD</option>' +'<option value="TND" class="TND">TUNISIA - TND</option>' +'<option value="TRY" class="TRY">TURKEY - TRY</option>' +'<option value="TMD" class="TMD">TURKMENISTAN - TMD</option>' +'<option value="TCD" class="TCD">TURKS AND CAICOS ISLANDS - TCD</option>' +'<option value="TVD" class="TVD">TUVALU - TVD</option>' +'<option value="UGD" class="UGD">UGANDA - UGD</option>' +'<option value="UAH" class="UAH">UKRAINE - UAH</option>' +'<option value="AED" class="AED">UNITED ARAB EMIRATES - AED</option>' +'<option value="GBP" class="GBP">UNITED KINGDOM - GBP</option>' +'<option value="USD" class="USD">UNITED STATES - USD</option>' +'<option value="UYU" class="UYU">URUGUAY - UYU</option>' +'<option value="VID" class="VID">US VIRGIN ISLANDS - VID</option>' +'<option value="UZD" class="UZD">UZBEKISTAN - UZD</option>' +'<option value="VUV" class="VUV">VANUATU - VUV</option>' +'<option value="VAD" class="VAD">VATICAN CITY STATE - VAD</option>' +'<option value="VEB" class="VEB">VENEZUELA - VEB</option>' +'<option value="VND" class="VND">VIETNAM - VND</option>' +'<option value="VGD" class="VGD">VIRGIN ISLANDS - VGD</option>' +'<option value="WFD" class="WFD">WALLIS AND FUTUNA ISLANDS - WFD</option>' +'<option value="EHD" class="EHD">WESTERN SAHARA - EHD</option>' +'<option value="YED" class="YED">YEMEN - YED</option>' +'<option value="CDD" class="CDD">ZAIR - CDD</option>' +'<option value="ZMD" class="ZMD">ZAMBIA - ZMD</option>' +'<option value="ZWD" class="ZWD">ZIMBABWE - ZWD</option>';
if(langID == 'EN'){
	csCode.innerHTML = '<option value='+dCur+' class="slCur">Select Currency...</option>'+selectoptionsCur;
}if(langID == 'RO'){
	csCode.innerHTML = '<option value='+dCur+' class="slCur">Selectaţi valutar</option>'+selectoptionsCur;
}if(langID == 'ES'){
	csCode.innerHTML = '<option value='+dCur+' class="slCur">Seleccione Moneda</option>'+selectoptionsCur;
};

// creating DIV for select element
var seElm = document.createElement('div');
seElm.className = "divclass";
seElm.id = 'dividselect';
seElm.appendChild(csCode);

// loading DIV for select element into page
if ($("#data").find(".text_rosux12").length > 0) {
	var inputElm = document.getElementById('data').getElementsByTagName("table")[1].getElementsByTagName("tbody")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[0].getElementsByTagName("table")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[0].getElementsByTagName("table")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr")[1].getElementsByTagName("td")[0];
inputElm.appendChild(seElm);
}else{
	var inputElm = document.getElementById('data').getElementsByTagName("table")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[0].getElementsByTagName("table")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[0].getElementsByTagName("table")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr")[1].getElementsByTagName("td")[0];
inputElm.appendChild(seElm);
};

// funtion that runs the replacement of the action attribute for the buy/sell forms, and also changes the currency ID on the tab ( Gold / XXX ) and adds the country flag of the currency about to be exchanged
// SOMETHING here doesn't work on the page after a successful transaction.
function curIDr() {
	$("#cselectid").change(function() {
		var curIDs = $("#cselectid").val();
		$('#buy').attr('action', 'main.php?key=' + sessionkeyCode + '&lang=' + langID + '&page=forex&sub_page=goldmon&act=buy&sub_item=2&moneda=' + curIDs);
		$('#sell').attr('action', 'main.php?key=' + sessionkeyCode + '&lang=' + langID + '&page=forex&sub_page=goldmon&act=sell&sub_item=2&moneda=' + curIDs);
		if(langID == 'EN'){
			$("#sm_2").html('Gold / <font color="green"><strong>'+curIDs+'</strong></font>');
		}if(langID == 'RO'){
			$("#sm_2").html('AUR / <font color="green"><strong>'+curIDs+'</strong></font>');
		}if(langID == 'ES'){
			$("#sm_2").html('ORO / <font color="green"><strong>'+curIDs+'</strong></font>');
		};
	});
	return false;
};
curIDr();

// change exchange error text to show currency used for transaction that threw an error.
if ($("#data").find('.text_rosux12').length > 0) {
	var erCur = document.URL.substring(150,153), getErrorText = $("#data").find(".text_rosux12").text();
	if(langID == 'EN'){
		if ($('#data').find('.text_rosux12').text().length ==37) {
			$('#data').find('.text_rosux12').text(getErrorText+"| You didn't have enough "+erCur+" or GOLD to exchange.");
		}else{
			$('#data').find('.text_rosux12').text(getErrorText+"| next time, enter a number so you can buy or sell "+erCur);
		};
	}if(langID == 'RO'){
		if ($('#data').find('.text_rosux12').text().length ==67) {
			$('#data').find('.text_rosux12').text(getErrorText+"| Nu a avut suficient "+erCur+" sau AUR de schimb.");
		}else{
			$('#data').find('.text_rosux12').text(getErrorText+"| Data viitoare, introduceţi un număr astfel încât să puteţi cumpăra sau vinde "+erCur);
		};
	}if(langID == 'ES'){
		if ($('#data').find('.text_rosux12').text().length ==68) {
			$('#data').find('.text_rosux12').text(getErrorText+"| Usted no tiene suficiente "+erCur+" o de ORO para el intercambio.");
		}else{
			$('#data').find('.text_rosux12').text(getErrorText+"| La próxima vez, introducir un número para que pueda comprar o vender "+erCur);
		};
	};
};
 
// fix things in Exchange gold/(local currency) page

// GOLD/EURO in the current exchange rate, should be GOLD/(local currency)
$('#data').find('.text_grix10:eq(1)').html($('#data').find('.text_grix10:eq(1)').html().replace('EURO','<strong>'+dCur+'</strong>'));

// fix the Maximum Volume bug (Maximum Volume : XX EURO) should be in GOLD not EURO
if(langID == 'EN'){
	$('#data').find('.text_portox10').text('GOLD');
// properly translate the transaction header bar
	$('#data').find('.text_help_titlu_bold:eq(0)').html('Description');
	$('#data').find('.text_help_titlu_bold:eq(1)').html('Volume');
	$('#data').find('.text_help_titlu_bold:eq(2)').html('Time');
	$('#data').find('.text_help_titlu_bold:eq(3)').html('Exchange Rate');
}if(langID == 'RO'){
	$('#data').find('.text_portox10').text('AUR');
}if(langID == 'ES'){
	$('#data').find('.text_portox10').text('ORO');
// properly translate the transaction header bar
	$('#data').find('.text_help_titlu_bold:eq(0)').html('descripción');
	$('#data').find('.text_help_titlu_bold:eq(1)').html('volumen');
	$('#data').find('.text_help_titlu_bold:eq(2)').html('tiempo');
	$('#data').find('.text_help_titlu_bold:eq(3)').html('tipo de cambio');
}; 
// end of Fix things