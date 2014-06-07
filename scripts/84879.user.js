// ==UserScript==
// @name          Citycatalogue Cheater by MobiPhreak.com
// @description   group message with ease
// @include       *citycatalogue.com*
// @version	  1.0.2
// ==/UserScript==

var flag, newElement, ans;
flag = document.getElementById('About_country1_panelFlag');

function insert() {
	var qnum = document.getElementById('quest_numb');
	var num = qnum.innerHTML.substring(10);
	if (num=="1") { ans="Canberra"; }
	else if (num=="2") { ans="Vienna"; }
	else if (num=="3") { ans="Baku"; }
	else if (num=="4") { ans="Tirana"; }
	else if (num=="5") { ans="Algiers"; }
	else if (num=="6") { ans="Charlotte Amalie"; }
	else if (num=="7") { ans="Valley"; }
	else if (num=="8") { ans="Luanda"; }
	else if (num=="9") { ans="Andorra la Vella"; }
	else if (num=="10") { ans="Sainth jons"; }
	else if (num=="11") { ans="Buenos Aires"; }
	else if (num=="12") { ans="Yerevan"; }
	else if (num=="13") { ans="Oranjestad"; }
	else if (num=="14") { ans="Kabul"; }
	else if (num=="15") { ans="Nassau"; }
	else if (num=="16") { ans="Dhaka"; }
	else if (num=="17") { ans="Bridgetown"; }
	else if (num=="18") { ans="Manama"; }
	else if (num=="19") { ans="Minsk"; }
	else if (num=="20") { ans="Belmopan"; }
	else if (num=="21") { ans="Brussels"; }
	else if (num=="22") { ans="Porto-Novo"; }
	else if (num=="23") { ans="hamilton"; }
	else if (num=="24") { ans="Sofia"; }
	else if (num=="25") { ans="Surce"; }
	else if (num=="26") { ans="Sarajevo"; }
	else if (num=="27") { ans="Gaborone"; }
	else if (num=="28") { ans="Brasillia"; }
	else if (num=="29") { ans="Bandar Seri Begawan"; }
	else if (num=="30") { ans="Ouagadougou"; }
	else if (num=="31") { ans="Bujumbura"; }
	else if (num=="32") { ans="port vila"; }
	else if (num=="33") { ans="Londen"; }
	else if (num=="34") { ans="budapest"; }
	else if (num=="35") { ans="Caracas"; }
	else if (num=="36") { ans="road town"; }
	else if (num=="37") { ans="Hanoi"; }
	else if (num=="38") { ans="Libreville"; }
	else if (num=="39") { ans="Port-au-Prince"; }
	else if (num=="40") { ans="Georgetown"; }
	else if (num=="41") { ans="Banjul"; }
	else if (num=="42") { ans="Accra"; }
	else if (num=="43") { ans="basse terre"; }
	else if (num=="44") { ans="Guatemala"; }
	else if (num=="45") { ans="Conakry"; }
	else if (num=="46") { ans="Bissau"; }
	else if (num=="47") { ans="Gibraltar"; }
	else if (num=="48") { ans="Tegucigalpa"; }
	else if (num=="49") { ans="Nuuk"; }
	else if (num=="50") { ans="Athens"; }
	else if (num=="51") { ans="Tbilisi"; }
	else if (num=="52") { ans="Copenhagen"; }
	else if (num=="53") { ans="kinsasha"; }
	else if (num=="54") { ans="Djibouti"; }
	else if (num=="55") { ans="Roseau"; }
	else if (num=="56") { ans="Santo Domingo"; }
	else if (num=="57") { ans="Cairo"; }
	else if (num=="58") { ans="lusaka"; }
	else if (num=="59") { ans="Harare"; }
	else if (num=="60") { ans="Jerusalem"; }
	else if (num=="61") { ans="New Delhi"; }
	else if (num=="62") { ans="Jakarta"; }
	else if (num=="63") { ans="Amman"; }
	else if (num=="64") { ans="Bagdad"; }
	else if (num=="65") { ans="Tehran"; }
	else if (num=="66") { ans="Dublin"; }
	else if (num=="67") { ans="Reykjavik"; }
	else if (num=="68") { ans="Madrid"; }
	else if (num=="69") { ans="Rome"; }
	else if (num=="70") { ans="Sana'a"; }
	else if (num=="71") { ans="Praia"; }
	else if (num=="72") { ans="astana"; }
	else if (num=="73") { ans="phom penh"; }
	else if (num=="74") { ans="Yaounde"; }
	else if (num=="75") { ans="Ottawa"; }
	else if (num=="76") { ans="Dolha"; }
	else if (num=="77") { ans="Nairobi"; }
	else if (num=="78") { ans="Nicosia"; }
	else if (num=="79") { ans="Bishkek"; }
	else if (num=="80") { ans="South Tarawa"; }
	else if (num=="81") { ans="Beijing"; }
	else if (num=="82") { ans="Bogotá"; }
	else if (num=="83") { ans="Moroni"; }
	else if (num=="84") { ans="Yamoussoukro"; }
	else if (num=="85") { ans="Havana"; }
	else if (num=="86") { ans="Kuwait City"; }
	else if (num=="87") { ans="Vientiane"; }
	else if (num=="88") { ans="Riga"; }
	else if (num=="89") { ans="Maseru"; }
	else if (num=="90") { ans="monrovia"; }
	else if (num=="91") { ans="Beirut"; }
	else if (num=="92") { ans="tripoli"; }
	else if (num=="93") { ans="vilnius"; }
	else if (num=="94") { ans="Vaduz"; }
	else if (num=="95") { ans="Luxembourg"; }
	else if (num=="96") { ans="Port Louis"; }
	else if (num=="97") { ans="Nouakchott"; }
	else if (num=="98") { ans="Antananarivo"; }
	else if (num=="99") { ans="Skopje"; }
	else if (num=="100") { ans="Lilongwe"; }
	else if (num=="101") { ans="kuala lumpur"; }
	else if (num=="102") { ans="Bamako"; }
	else if (num=="103") { ans="Male"; }
	else if (num=="104") { ans="Valletta"; }
	else if (num=="105") { ans="Rabat"; }
	else if (num=="106") { ans="Berlin"; }
	else if (num=="107") { ans="Majuro"; }
	else if (num=="108") { ans="Mexico City"; }
	else if (num=="109") { ans="maputo"; }
	else if (num=="110") { ans="Chisinau"; }
	else if (num=="111") { ans="Monaco"; }
	else if (num=="112") { ans="UlaanBaatar"; }
	else if (num=="113") { ans="Naypyidaw"; }
	else if (num=="114") { ans="Windhoek"; }
	else if (num=="115") { ans="Kathmandu"; }
	else if (num=="116") { ans="Niamey"; }
	else if (num=="117") { ans="abuya"; }
	else if (num=="118") { ans="Amsterdam"; }
	else if (num=="119") { ans="Tokyo"; }
	else if (num=="120") { ans="Wellington"; }
	else if (num=="121") { ans="kingstone"; }
	else if (num=="122") { ans="Oslo"; }
	else if (num=="123") { ans="Pretoria"; }
	else if (num=="124") { ans="Seoul"; }
	else if (num=="125") { ans="playmouth"; }
	else if (num=="126") { ans="Adamstown"; }
	else if (num=="127") { ans="Marigot"; }
	else if (num=="128") { ans="jamestown"; }
	else if (num=="129") { ans="Avarua"; }
	else if (num=="130") { ans="Islamabad"; }
	else if (num=="131") { ans="Melekeok"; }
	else if (num=="132") { ans="Panama"; }
	else if (num=="133") { ans="PortMoresby"; }
	else if (num=="134") { ans="Asuncion"; }
	else if (num=="135") { ans="Lima"; }
	else if (num=="136") { ans="Warsaw"; }
	else if (num=="137") { ans="Lissabon"; }
	else if (num=="138") { ans="San Juan"; }
	else if (num=="139") { ans="Brazzaville"; }
	else if (num=="140") { ans="Moscow"; }
	else if (num=="141") { ans="kigali"; }
	else if (num=="142") { ans="Bucharest"; }
	else if (num=="143") { ans="San Salvador"; }
	else if (num=="144") { ans="Apia"; }
	else if (num=="145") { ans="San Marino"; }
	else if (num=="146") { ans="Sao Tome"; }
	else if (num=="147") { ans="Riyadh"; }
	else if (num=="148") { ans="Mbabane"; }
	else if (num=="149") { ans="Pyongyang"; }
	else if (num=="150") { ans="Victoria"; }
	else if (num=="151") { ans="Dakar"; }
	else if (num=="152") { ans="Kingstown"; }
	else if (num=="153") { ans="Basseterre"; }
	else if (num=="154") { ans="Castries"; }
	else if (num=="155") { ans="Belgrad"; }
	else if (num=="156") { ans="Signapore"; }
	else if (num=="157") { ans="damascus"; }
	else if (num=="158") { ans="Bratislava"; }
	else if (num=="159") { ans="Ljubijana"; }
	else if (num=="160") { ans="honiara"; }
	else if (num=="161") { ans="Mogadishu"; }
	else if (num=="162") { ans="Kharatoum"; }
	else if (num=="163") { ans="Paramaribo"; }
	else if (num=="164") { ans="Washington"; }
	else if (num=="165") { ans="freetown"; }
	else if (num=="166") { ans="Dushanbe"; }
	else if (num=="167") { ans="Bangkok"; }
	else if (num=="168") { ans="San Jose"; }
	else if (num=="169") { ans="Dodoma"; }
	else if (num=="170") { ans="Cockburn Town"; }
	else if (num=="171") { ans="Lome"; }
	else if (num=="172") { ans="Nuku'alofa"; }
	else if (num=="173") { ans="Port of Spain"; }
	else if (num=="174") { ans="Tunis"; }
	else if (num=="175") { ans="ashgabat"; }
	else if (num=="176") { ans="Ankara"; }
	else if (num=="177") { ans="Kampala"; }
	else if (num=="178") { ans="Taschkent"; }
	else if (num=="179") { ans="Kiev"; }
	else if (num=="180") { ans="Montevideo"; }
	else if (num=="181") { ans="torshavn"; }
	else if (num=="182") { ans="suva"; }
	else if (num=="183") { ans="Manila"; }
	else if (num=="184") { ans="Helsinki"; }
	else if (num=="185") { ans="addis ababa"; }
	else if (num=="186") { ans="Paris"; }
	else if (num=="187") { ans="Cayenne"; }
	else if (num=="188") { ans="Papeete"; }
	else if (num=="189") { ans="Zagreb"; }
	else if (num=="190") { ans="Tallinn"; }
	else if (num=="191") { ans="N'Djamena"; }
	else if (num=="192") { ans="Podgorica"; }
	else if (num=="193") { ans="Prague"; }
	else if (num=="194") { ans="Santiago"; }
	else if (num=="195") { ans="berna"; }
	else if (num=="196") { ans="Stockholm"; }
	else if (num=="197") { ans="Sri Jayawardenapura-Kotte"; }
	else if (num=="198") { ans="Quito"; }
	else if (num=="199") { ans="malabo"; }
	else if (num=="200") { ans="Asmara"; }
	qnum.innerHTML = "Answer is " + ans;
}

if (flag) {
    newElement = document.createElement('a'),
	newElement.setAttribute('href', 'javascript:void(0);');
	newElement.addEventListener('click', insert, false);
	newElement.appendChild(document.createTextNode('Show answer >>>'));
    flag.parentNode.insertBefore(newElement, flag);
}