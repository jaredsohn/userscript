// ==UserScript==
// @name           Statistics on received postcards
// @namespace      None
// @description    Displays following statistics on postcards received:  average travel days, 
//                 average kilometers traveled, average travel days by country, number of postcards 
//                 received by country, percentage of total postcards received by country.
// @include        http://www.postcrossing.com/receivedPostcards
// ==/UserScript==


var tablesOfSentPage = document.getElementsByTagName("table");
var tableOfSent = tablesOfSentPage[0];
var numberOfRows = tableOfSent.getElementsByTagName("tr");
var iNum = numberOfRows.length;
var numberOfRegistered=0;
var totalDays=0;
var avgMiles=0;
var totalMiles=0;
var avgDays=0;
var totalPictures=0;
var pctPictures=0;
var nameInRow;
var newElement = document.createElement('div');
var countries=[];
var continents=[];
var numOther=0;
var countryName;
var countryNum=[];
var myString="";
var percentageNum=0;
var NUMOFCOUNTRIES=192;
var daysTraveled=[];
var avgDayTrvl=0;
var numEurope=0;
var numAsia=0;
var numAfrica=0;
var numCentralAmerica=0;
var numAustralia=0;
var numNorthAmerica=0;
var numSouthAmerica=0;
var numAntartica=0;
var numCountryOther=0;
var numMiddleEast=0;
var pctEurope=0;
var pctAsia=0;
var pctAfrica=0;
var pctCentralAmerica=0;
var pctAustralia=0;
var pctNorthAmerica=0;
var pctSouthAmerica=0;
var pctAntartica=0;
var pctCountryOther=0;
var pctMiddleEast=0;
var daysTraveledEU=0;
var daysTraveledAS=0;
var daysTraveledAF=0;
var daysTraveledCA=0;
var daysTraveledAU=0;
var daysTraveledNA=0;
var daysTraveledSA=0;
var daysTraveledAN=0;
var daysTraveledOT=0;
var daysTraveledME=0;
var daysT=0;

for(var k=0; k<NUMOFCOUNTRIES; k=k+1)
{
	countryNum[k]=0;
}

for(var m=0; m<NUMOFCOUNTRIES; m=m+1)
{
	daysTraveled[m]=0;
}

countries[0]="Afghanistan";
countries[1]="Albania";
countries[2]="Algeria";
countries[3]="Andorra";
countries[4]="Angola";
countries[5]="Argentina";
countries[6]="Armenia";
countries[7]="Aruba";
countries[8]="Australia";
countries[9]="Austria";
countries[10]="Azerbaijan";
countries[11]="Bahamas";
countries[12]="Bahrain";
countries[13]="Bangladesh";
countries[14]="Barbados";
countries[15]="Belarus";
countries[16]="Belgium";
countries[17]="Belize";
countries[18]="Benin";
countries[19]="Bermuda";
countries[20]="Bolivia";
countries[21]="Bosnia-Herzegovina";
countries[22]="Botswana";
countries[23]="Brazil";
countries[24]="British Virgin Islands";
countries[25]="Brunei";
countries[26]="Bulgaria";
countries[27]="Burkina Faso";
countries[28]="Cambodia";
countries[29]="Cameroon";
countries[30]="Canada";
countries[31]="Cape Verde";
countries[32]="Cayman Islands";
countries[33]="Central Africa";
countries[34]="Chile";
countries[35]="China";
countries[36]="Colombia";
countries[37]="Congo";
countries[38]="Congo (Dem. Rep.)";
countries[39]="Costa Rica";
countries[40]="Croatia";
countries[41]="Cuba";
countries[42]="Cyprus";
countries[43]="Czech Republic";
countries[44]="Denmark";
countries[45]="Dominican Republic";
countries[46]="Ecuador";
countries[47]="Egypt";
countries[48]="El Salvador";
countries[49]="Eritrea";
countries[50]="Estonia";
countries[51]="Ethiopia";
countries[52]="Ext. Terr. of Australia";
countries[53]="Faroe Islands";
countries[54]="Fiji";
countries[55]="Finland";
countries[56]="France";
countries[57]="French Guiana";
countries[58]="French Polynesia";
countries[59]="Gambia";
countries[60]="Georgia";
countries[61]="Germany";
countries[62]="Ghana";
countries[63]="Greece";
countries[64]="Greenland";
countries[65]="Guadeloupe";
countries[66]="Guam";
countries[67]="Guatemala";
countries[68]="Guernsey and Alderney";
countries[69]="Guinea";
countries[70]="Guyana";
countries[71]="Haiti";
countries[72]="Honduras";
countries[73]="Hong Kong";
countries[74]="Hungary";
countries[75]="Iceland";
countries[76]="India";
countries[77]="Indonesia";
countries[78]="Iran";
countries[79]="Iraq";
countries[80]="Ireland";
countries[81]="Israel";
countries[82]="Italy";
countries[83]="Ivory Coast";
countries[84]="Jamaica";
countries[85]="Japan";
countries[86]="Jersey";
countries[87]="Jordan";
countries[88]="Kazakhstan";
countries[89]="Kenya";
countries[90]="Korea (North)";
countries[91]="Korea (South)";
countries[92]="Kuwait";
countries[93]="Kyrgyzstan";
countries[94]="Laos";
countries[95]="Latvia";
countries[96]="Lebanon";
countries[97]="Lesotho";
countries[98]="Liberia";
countries[99]="Libya";
countries[100]="Lithuania";
countries[101]="Luxembourg";
countries[102]="Macau";
countries[103]="Macedonia";
countries[104]="Madagascar";
countries[105]="Malawi";
countries[106]="Malaysia";
countries[107]="Maldives";
countries[108]="Mali";
countries[109]="Malta";
countries[110]="Man (Isle of)";
countries[111]="Martinique";
countries[112]="Mauritania";
countries[113]="Mauritius";
countries[114]="Mayotte";
countries[115]="Mexico";
countries[116]="Micronesia";
countries[117]="Moldova";
countries[118]="Monaco";
countries[119]="Mongolia";
countries[120]="Montenegro";
countries[121]="Morocco";
countries[122]="Mozambique";
countries[123]="Myanmar";
countries[124]="Nepal";
countries[125]="Netherlands";
countries[126]="Netherlands Antilles";
countries[127]="New Caledonia";
countries[128]="New Zealand";
countries[129]="Niger";
countries[130]="Nigeria";
countries[131]="Norway";
countries[132]="Oman";
countries[133]="Pakistan";
countries[134]="Palestine";
countries[135]="Panama";
countries[136]="Papua New Guinea";
countries[137]="Paraguay";
countries[138]="Peru";
countries[139]="Philippines";
countries[140]="Poland";
countries[141]="Portugal";
countries[142]="Puerto Rico";
countries[143]="Qatar";
countries[144]="Reunion";
countries[145]="Romania";
countries[146]="Russia";
countries[147]="Rwanda";
countries[148]="Saint Helena";
countries[149]="Saint Lucia";
countries[150]="Samoa";
countries[151]="San Marino";
countries[152]="São Tomé and Príncipe";
countries[153]="Saudi Arabia";
countries[154]="Senegal";
countries[155]="Serbia";
countries[156]="Seychelles";
countries[157]="Singapore";
countries[158]="Slovakia";
countries[159]="Slovenia";
countries[160]="Solomon Islands";
countries[161]="South Africa";
countries[162]="Spain";
countries[163]="Sri Lanka";
countries[164]="Sudan";
countries[165]="Suriname";
countries[166]="Sweden";
countries[167]="Switzerland";
countries[168]="Syria";
countries[169]="Taiwan";
countries[170]="Tajikistan";
countries[171]="Tanzania";
countries[172]="Terres Australes";
countries[173]="Thailand";
countries[174]="Togo";
countries[175]="Trinidad and Tobago";
countries[176]="Tunisia";
countries[177]="Turkey";
countries[178]="Uganda";
countries[179]="Ukraine";
countries[180]="United Arab Emirates";
countries[181]="United Kingdom";
countries[182]="U.S.A.";
countries[183]="Uruguay";
countries[184]="Uzbekistan";
countries[185]="Vanuatu";
countries[186]="Venezuela";
countries[187]="Vietnam";
countries[188]="Virgin Islands of the USA";
countries[189]="Yemen";
countries[190]="Zambia";
countries[191]="Zimbabwe";

continents[0]="AS";
continents[1]="EU";
continents[2]="AF";
continents[3]="EU";
continents[4]="AF";
continents[5]="SA";
continents[6]="CA";
continents[7]="CA";
continents[8]="AU";
continents[9]="EU";
continents[10]="AS";
continents[11]="CA";
continents[12]="ME";
continents[13]="AS";
continents[14]="CA";
continents[15]="EU";
continents[16]="EU";
continents[17]="CA";
continents[18]="AF";
continents[19]="CA";
continents[20]="SA";
continents[21]="EU";
continents[22]="AF";
continents[23]="SA";
continents[24]="CA";
continents[25]="AS";
continents[26]="EU";
continents[27]="AF";
continents[28]="AS";
continents[29]="AF";
continents[30]="NA";
continents[31]="AF";
continents[32]="CA";
continents[33]="AF";
continents[34]="SA";
continents[35]="AS";
continents[36]="SA";
continents[37]="AF";
continents[38]="AF";
continents[39]="CA";
continents[40]="EU";
continents[41]="CA";
continents[42]="EU";
continents[43]="EU";
continents[44]="EU";
continents[45]="CA";
continents[46]="SA";
continents[47]="AF";
continents[48]="CA";
continents[49]="AF";
continents[50]="EU";
continents[51]="AF";
continents[52]="AU";
continents[53]="EU";
continents[54]="AU";
continents[55]="EU";
continents[56]="EU";
continents[57]="SA";
continents[58]="AU";
continents[59]="AF";
continents[60]="AS";
continents[61]="EU";
continents[62]="AF";
continents[63]="EU";
continents[64]="EU";
continents[65]="CA";
continents[66]="AU";
continents[67]="CA";
continents[68]="EU";
continents[69]="AF";
continents[70]="CA";
continents[71]="CA";
continents[72]="CA";
continents[73]="AS";
continents[74]="EU";
continents[75]="EU";
continents[76]="AS";
continents[77]="AS";
continents[78]="ME";
continents[79]="ME";
continents[80]="EU";
continents[81]="ME";
continents[82]="EU";
continents[83]="AF";
continents[84]="CA";
continents[85]="AS";
continents[86]="EU";
continents[87]="ME";
continents[88]="AS";
continents[89]="AF";
continents[90]="AS";
continents[91]="AS";
continents[92]="ME";
continents[93]="AS";
continents[94]="AS";
continents[95]="EU";
continents[96]="ME";
continents[97]="AF";
continents[98]="AF";
continents[99]="AF";
continents[100]="EU";
continents[101]="EU";
continents[102]="AS";
continents[103]="EU";
continents[104]="AF";
continents[105]="AF";
continents[106]="AS";
continents[107]="AS";
continents[108]="AF";
continents[109]="EU";
continents[110]="EU";
continents[111]="CA";
continents[112]="AF";
continents[113]="AF";
continents[114]="AF";
continents[115]="CA";
continents[116]="AU";
continents[117]="EU";
continents[118]="EU";
continents[119]="AS";
continents[120]="EU";
continents[121]="AF";
continents[122]="AF";
continents[123]="AS";
continents[124]="AS";
continents[125]="EU";
continents[126]="CA";
continents[127]="AU";
continents[128]="AU";
continents[129]="AF";
continents[130]="AF";
continents[131]="EU";
continents[132]="ME";
continents[133]="ME";
continents[134]="ME";
continents[135]="CA";
continents[136]="AU";
continents[137]="SA";
continents[138]="SA";
continents[139]="AS";
continents[140]="EU";
continents[141]="EU";
continents[142]="CA";
continents[143]="ME";
continents[144]="AF";
continents[145]="EU";
continents[146]="EU";
continents[147]="AF";
continents[148]="AF";
continents[149]="CA";
continents[150]="AF";
continents[151]="EU";
continents[152]="AF";
continents[153]="ME";
continents[154]="AF";
continents[155]="EU";
continents[156]="AF";
continents[157]="AS";
continents[158]="EU";
continents[159]="EU";
continents[160]="AU";
continents[161]="AF";
continents[162]="EU";
continents[163]="AS";
continents[164]="AF";
continents[165]="SA";
continents[166]="EU";
continents[167]="EU";
continents[168]="AS";
continents[169]="AS";
continents[170]="AS";
continents[171]="AF";
continents[172]="AU";
continents[173]="AS";
continents[174]="AF";
continents[175]="CA";
continents[176]="AF";
continents[177]="AS";
continents[178]="AF";
continents[179]="EU";
continents[180]="ME";
continents[181]="EU";
continents[182]="NA";
continents[183]="SA";
continents[184]="AS";
continents[185]="AU";
continents[186]="SA";
continents[187]="AS";
continents[188]="CA";
continents[189]="AS";
continents[190]="AF";
continents[191]="AF";


for(i=1;i<iNum;i=i+1)
{
		totalDays=totalDays+parseInt(tableOfSent.rows[i].cells[5].innerHTML.replace(" days",""));
		totalMiles=totalMiles+parseInt(tableOfSent.rows[i].cells[4].innerHTML.replace(" Kms","").replace(",",""));
		numberOfRegistered=numberOfRegistered+1;
		countryName=tableOfSent.rows[i].cells[2].getElementsByTagName("img")[0].alt.replace(/^\s+|\s+$/g,"");
		if(tableOfSent.rows[i].cells[6].getElementsByTagName("img")[0].alt.replace(/^\s+|\s+$/g,"")=="Photo")
			totalPictures=totalPictures+1;
		numOther=countries.indexOf(countryName);
		daysT=parseInt(tableOfSent.rows[i].cells[5].innerHTML.replace(" days",""));
		if(numOther>-1)
		{
		 	countryNum[numOther]=countryNum[numOther]+1;
		 	switch(continents[numOther])
		 	{
			case "EU":
				numEurope=numEurope+1;
				daysTraveledEU=daysTraveledEU+daysT;
				break;
			case "AS":
				numAsia=numAsia+1;
				daysTraveledAS=daysTraveledAS+daysT;
				break;
			case "AF":
				numAfrica=numAfrica+1;
				daysTraveledAF=daysTraveledAF+daysT;
				break;
			case "CA":
				numCentralAmerica=numCentralAmerica+1;
				daysTraveledCA=daysTraveledCA+daysT;
				break;
			case "AU":
				numAustralia=numAustralia+1;
				daysTraveledAU=daysTraveledAU+daysT;
				break;
			case "NA":
				numNorthAmerica=numNorthAmerica+1;
				daysTraveledNA=daysTraveledNA+daysT;
				break;
			case "SA":
				numSouthAmerica=numSouthAmerica+1;
				daysTraveledSA=daysTraveledSA+daysT;
				break;
			case "ME":
				numMiddleEast=numMiddleEast+1;
				daysTraveledME=daysTraveledME+daysT;
				break;
			default:
			   numCountryOther=numCountryOther+1;
				daysTraveledOT=daysTraveledOT+daysT;
			   break;
			}
		 	daysTraveled[numOther]=daysTraveled[numOther]+daysT;
		}
}

avgDays=totalDays/numberOfRegistered;
avgMiles=totalMiles/numberOfRegistered;
pctPictures=totalPictures/numberOfRegistered*100;
pctEurope=numEurope/numberOfRegistered*100;
pctAsia=numAsia/numberOfRegistered*100;
pctAfrica=numAfrica/numberOfRegistered*100;
pctCentralAmerica=numCentralAmerica/numberOfRegistered*100;
pctAustralia=numAustralia/numberOfRegistered*100;
pctNorthAmerica=numNorthAmerica/numberOfRegistered*100;
pctSouthAmerica=numSouthAmerica/numberOfRegistered*100;
pctCountryOther=numCountryOther/numberOfRegistered*100;
pctMiddleEast=numMiddleEast/numberOfRegistered*100;
if(numEurope!=0)
	avgDaysEU=daysTraveledEU/numEurope;
if(numAsia!=0)
	avgDaysAS=daysTraveledAS/numAsia;
if(numAfrica!=0)
	avgDaysAF=daysTraveledAF/numAfrica;
if(numCentralAmerica!=0)
	avgDaysCA=daysTraveledCA/numCentralAmerica;
if(numNorthAmerica!=0)
	avgDaysNA=daysTraveledNA/numNorthAmerica;
if(numSouthAmerica!=0)
	avgDaysSA=daysTraveledSA/numSouthAmerica;
if(numCountryOther!=0)
	avgDaysOT=daysTraveledOT/numCountryOther;
if(numMiddleEast!=0)
	avgDaysME=daysTraveledME/numMiddleEast;

for(var j=0; j<countries.length; j++)
{
	if(countryNum[j]>0)
	{
		percentageNum = countryNum[j]/iNum*100;
		avgDayTrvl = daysTraveled[j]/countryNum[j];
		myString = myString + "<tr><td ><b>" + countries[j] + "</b></td><td style=\"text-align: right\">" + countryNum[j] + "</td><td style=\"text-align: right\">" + percentageNum.toFixed(2) + "%</td><td style=\"text-align: right\">" + Math.round(avgDayTrvl) +" days</td></tr>";
	}
}

newElement.innerHTML = "<p><b>Average days traveled:</b> " + Math.round(avgDays) + " days<br/><b>Average kilometers traveled: </b>" + Math.round(avgMiles) + " Kms<br/>" + "<b>% pictures uploaded: </b>"  + pctPictures.toFixed(2) + 

"%<br/><br/><table class=\"myTableStyle sortable\">" +
"<tr><th style=\"text-align: left\">Area</th><th style=\"text-align: right\"  class=\"sorttable_numeric\">Total Postcards</th><th style=\"text-align: right\">Percentage</th><th style=\"text-align: right\">Avg Travel</th>" +
"<tr><td>Africa</td><td style=\"text-align: right\">" + numAfrica + "</td><td style=\"text-align: right\">" + pctAfrica.toFixed(2) + "%</td><td style=\"text-align: right\">" + Math.round(daysTraveledAF/numAfrica) +" days</td></tr>" +
"<tr><td>Asia</td><td style=\"text-align: right\">" + numAsia + "</td><td style=\"text-align: right\">" + pctAsia.toFixed(2) + "%</td><td style=\"text-align: right\">" + Math.round(daysTraveledAS/numAsia) +" days</td></tr>" +
"<tr><td>Central America/Caribbean</td><td style=\"text-align: right\">" + numCentralAmerica + "</td><td style=\"text-align: right\">" + pctCentralAmerica.toFixed(2) + "%</td><td style=\"text-align: right\">" + Math.round(daysTraveledCA/numCentralAmerica) +" days</td></tr>" +
"<tr><td>Europe</td><td style=\"text-align: right\">" + numEurope + "</td><td style=\"text-align: right\">" + pctEurope.toFixed(2) + "%</td><td style=\"text-align: right\">" + Math.round(daysTraveledEU/numEurope) +" days</td></tr>" +
"<tr><td>Middle East</td><td style=\"text-align: right\">" + numMiddleEast + "</td><td style=\"text-align: right\">" + pctMiddleEast.toFixed(2) + "%</td><td style=\"text-align: right\">" + Math.round(daysTraveledME/numMiddleEast) +" days</td></tr>" +
"<tr><td>North America</td><td style=\"text-align: right\">" + numNorthAmerica + "</td><td style=\"text-align: right\">" + pctNorthAmerica.toFixed(2) + "%</td><td style=\"text-align: right\">" + Math.round(daysTraveledNA/numNorthAmerica) +" days</td></tr>" +
"<tr><td>Oceania</td><td style=\"text-align: right\">" + numAustralia + "</td><td style=\"text-align: right\">" + pctAustralia.toFixed(2) + "%</td><td style=\"text-align: right\">" + Math.round(daysTraveledAU/numAustralia) +" days</td></tr>" +
"<tr><td>South America</td><td style=\"text-align: right\">" + numSouthAmerica + "</td><td style=\"text-align: right\">" + pctSouthAmerica.toFixed(2) + "%</td><td style=\"text-align: right\">" + Math.round(daysTraveledSA/numSouthAmerica) +" days</td></tr></table><br/><br/>" +

"<table class=\"myTableStyle sortable\"><tr><th style=\"text-align: left\">Country</th><th style=\"text-align: right\">Total Postcards</th><th style=\"text-align: right\">Percentage</th><th style=\"text-align: right\">Avg Travel</th>" + myString + "</table></p>";

tableOfSent.parentNode.insertBefore(newElement, tableOfSent);