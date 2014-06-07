// ==UserScript==
// @author         Nimesin
// @name           Google form send
// @namespace      erepublik@nimesin.com
// @description    Google form send - sending various profile info to google spread of your unit
// @version        0.8.3
// @include        http://www.erepublik.com/*/citizen/profile/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
// ==/UserScript==

var frameDisplay=1;
var sendToSpread=1;
var debug=99;
var formKey="dDZmVE1FTTQ0QmJHZkh0QnlkbDBsUHc6MQ";
var URLGoogleForm="https://spreadsheets.google.com/formResponse?formkey="+formKey;

var rank_id = 
{
'recruit' : '1', 'private' : '2', 'private*' : '3', 'private**' : '4', 'private***' : '5', 'corporal' : '6', 'corporal*' : '7', 'corporal**' : '8', 'corporal***' : '9', 'sergeant' : '10', 'sergeant*' : '11', 'sergeant**' : '12', 'sergeant***' : '13', 'lieutenant' : '14', 'lieutenant*' : '15', 'lieutenant**' : '16', 'lieutenant***' : '17', 'captain' : '18', 'captain*' : '19', 'captain**' : '20', 'captain***' : '21', 'major' : '22', 'major*' : '23', 'major**' : '24', 'major***' : '25', 'commander' : '26', 'commander*' : '27', 'commander**' : '28', 'commander***' : '29', 'lt colonel' : '30', 'lt colonel*' : '31', 'lt colonel**' : '32', 'lt colonel***' : '33', 'colonel' : '34', 'colonel*' : '35', 'colonel**' : '36', 'colonel***' : '37', 'general' : '38', 'general*' : '39', 'general**' : '40', 'general***' : '41', 'field marshal' : '42', 'field marshal*' : '43', 'field marshal**' : '44', 'field marshal***' : '45', 'supreme marshal' : '46', 'supreme marshal*' : '47', 'supreme marshal**' : '48', 'supreme marshal***' : '49', 'national force' : '50', 'national force*' : '51', 'national force**' : '52', 'national force***' : '53', 'world class force' : '54', 'world class force*' : '55', 'world class force**' : '56', 'world class force***' : '57', 'legendary force' : '58', 'legendary force*' : '59', 'legendary force**' : '60', 'legendary force***' : '61', 'god of war' : '62', 'god of war*' : '63', 'god of war**' : '64', 'god of war***' : '65'
};

region_id=
{
Abruzzo:"259","Abu Dhabi":"736","Aegean Coast of Turkey":"512","Aegean Islands":"420",Ajman:"739","Al Bahah":"718","Al Jawf":"720","Al Madinah":"721","Al Qasim":"722","Al Riyadh":"717",Alabama:"40",Aland:"242",Alaska:"41",Alberta:"97",Alentejo:"160",Algarve:"161",Alsace:"185",Amazonica:"689",Andalucia:"167","Andhra Pradesh":"450",Andina:"690",Anhui:"361","Aosta Valley":"260",Apulia:"261",Aquitaine:"186",Aragon:"168","Argentine Northwest":"152",Arizona:"42",Arkansas:"43",Asir:"724",Asturias:"169",Attica:"418",Auckland:"713",Auvergne:"187",Azores:"162","Baden-Wurttemberg":"243",Baja:"116","Balearic Islands":"184",Balochistan:"492",Banat:"11",Basilicata:"262","Basque Country":"170",Bassarabia:"140",Bavaria:"244","Beersheba South District":"471",Beijing:"395",Belgrade:"635","Beni and Cochabamba":"678",Bihar:"458","Black Sea Coast of Turkey":"513",Bohus:"323","Bolivian Altiplano":"680","Brandenburg and Berlin":"246",Bratislava:"312",Brestskaya:"707","British Columbia":"103",Brittany:"188",Brussels:"228","Br\u010dko District":"651",Bucovina:"39",Bukovina:"137",Burgas:"349",Burgenland:"340",Burgundy:"189",Calabria:"263",California:"44",Campania:"264","Canary Islands":"183",Cantabria:"171",Canterbury:"715","Caribe e Insular":"691",Carinthia:"341","Castilla La Mancha":"181","Castilla y Leon":"173",Catalonia:"174","Center West of Brazil":"146","Central Anatolia":"514","Central Black Earth":"533","Central Croatia":"623","Central East Chaco":"676","Central Greece":"417","Central Hungary":"111","Central Montenegro":"699","Central Slovakia":"316","Central Taiwan":"702","Central Thailand":"507","Central Transdanubia":"110","Central Venezuela":"125","Central Western Venezuela":"126",Centro:"159",Chagang:"668","Champagne Ardenne":"191",Charrua:"674",Chhattisgarh:"455",Chimor:"685",Chisinau:"92",Chongqing:"396",Chubu:"487",Chugoku:"489","Chungcheongbuk-do":"521","Chungcheongnam-do":"522","Chuquisaca and Tarija":"677",Colorado:"45",Connecticut:"46","Cork and Kerry":"209",Corsica:"192",Crete:"422",Crisana:"36",Cundiboyacense:"694",Cuyo:"155",Dainava:"666",Delaware:"47",Deutschschweiz:"336","District of Columbia":"90",Dnipro:"138",Dobrogea:"3",Donbas:"143",Dubai:"737",Dublin:"208","East Midlands":"222","East Srpska Republic":"650","East of England":"224","Eastern Anatolia":"515","Eastern Cape":"497","Eastern Finland":"239","Eastern Macedonia":"697","Eastern Netherlands":"530","Eastern Province":"725","Eastern Serbia":"637","Eastern Siberia":"534","Eastern Slovakia":"319","Eastern Taiwan":"703","Eastern Thailand":"509","Emilia-Romagna":"265",Epirus:"416",Esfahan:"478",Extremadura:"175","Far Eastern Russia":"535",Fars:"479","Federation of BiH":"652",Flanders:"229",Florida:"48","Franche-comte":"193","Free State":"498","Friuli-Venezia Giulia":"266",Fujairah:"742",Fujian:"362",Galicia:"176","Galicia and Lodomeria":"133","Gangwon-do":"520",Gansu:"363",Gauteng:"499",Georgia:"49",Gotaland:"325",Gotland:"549",Graubunden:"339","Great Andes":"682","Great Poland":"426",Guangdong:"364",Guangxi:"390",Guayana:"127",Guizhou:"384",Gujarat:"448","Gulf of Mexico":"120","Gyeonggi-do":"519","Gyeongsangbuk-do":"525","Gyeongsangnam-do":"526","Ha'il":"723","Haifa district":"469",Hainan:"385",Hamgyong:"672",Hawaii:"50",Heilongjiang:"368",Henan:"386",Hesse:"249",Hokkaido:"484",Homelskaya:"708",Hormozgan:"480",Hovedstaden:"231",Hrodzienskaya:"709",Hubei:"370",Hunan:"371",Hwangae:"670",Idaho:"51",Illinois:"52",Indiana:"53","Inner Carniola":"581","Inner Mongolia":"391","Ionian Islands":"421",Iowa:"54","Istria and Kvarner":"626","Jammu and Kashmir":"561","Jamtland Harjedalen":"322",Java:"461",Jeju:"527","Jeollabuk-do":"523","Jeollanam-do":"524","Jerusalem district":"467",Jharkhand:"456",Jiangsu:"372",Jiangxi:"373",Jilin:"387",Jizan:"729",Kalimantan:"462",Kaliningrad:"543",Kangwon:"671",Kansas:"55",Kanto:"486",Karnataka:"451",Kentucky:"56",Kerala:"453","Kerman Province":"472","Kesk-Eesti":"656",Kinki:"488","Kirde-Eesti":"655",Kurzeme:"662","KwaZulu Natal":"500",Kyushu:"491","La Rioja":"179","Laane-Eesti":"657","Languedoc Roussillon":"194",Lapland:"241",Latgale:"660",Lazio:"267","Leningrad Oblast":"538","Lesser Sunda Islands":"463",Liaoning:"375",Liguria:"268","Lika and Gorski Kotar":"625",Lima:"688",Limousin:"195",Limpopo:"501",Lisboa:"157","Lithuania Minor":"663","Lithuanian Highland":"665","Little Poland":"425",Llanos:"129","Loire Valley":"190",Lombardy:"269",London:"216",Lorraine:"196",Louisiana:"57","Louna-Eesti":"658","Low Andes":"684","Lower Austria":"342","Lower Carniola":"611","Lower Egypt":"731","Lower Normandy":"197","Lower Saxony and Bremen":"251",Luzon:"644",Macedonia:"414",Madeira:"163","Madhya Pradesh":"447",Madrid:"166",Maharashtra:"449",Mahilyowskaya:"711",Maine:"58",Makkah:"728","Maluku islands":"465",Manitoba:"105",Maramures:"38",Marche:"270",Marmara:"516",Maryland:"59",Massachusetts:"60","Mazandaran and Golistan":"483",Mazovia:"424",Mazuria:"423","Mecklenburg-Western Pomerania":"250","Mediterranean Coast of Turkey":"517",Mesopotamia:"154",Michigan:"61","Mid Andes":"683","Middle Egypt":"733","Midi-Pyrenees":"198",Midtjylland:"232",Mindanao:"646",Minnesota:"62",Minskaya:"710",Mississippi:"63",Missouri:"64",Moldova:"37",Molise:"271",Montana:"65","Montenegrin Coast":"700",Moravia:"440","Moscow and Central Russia":"532",Mpumalanga:"502",Muntenia:"5",Murcia:"177",Najran:"727",Navarra:"178","Nazareth North District":"468",Nebraska:"66",Nevada:"67","New Brunswick":"98","New Hampshire":"68","New Jersey":"69","New Mexico":"70","New South Wales":"328","New York":"71","Newfoundland and Labrador":"102",Ningxia:"392","Nord-Norge":"291",Nordjylland:"233","Norrland and Sameland":"321",Norte:"158","Norte Chico":"630","Norte Grande":"629","North Calais":"207","North Carolina":"72","North Caucasus":"537","North Dakota":"73","North Dalmatia":"627","North East of England":"226","North Eastern India":"459","North Eastern Venezuela":"130","North Montenegrin Mountains":"698","North Rhine-Westphalia":"252","North West Province":"503","North West of England":"227","North of Brazil":"147","North-Eastern Thailand":"511","North-West Frontier Province":"493","Northeast of Brazil":"148","Northeast of Ireland":"215","Northeast of Mexico":"122","Northern Basarabia":"91","Northern Bohemia":"442","Northern Borders":"719","Northern Cape":"504","Northern Cyprus":"706","Northern Great Plain":"113","Northern Hungary":"112","Northern India":"443","Northern Ireland":"219","Northern Low Amazon":"686","Northern Netherlands":"531","Northern Russia":"536","Northern Taiwan":"701","Northern Territory":"334","Northern Thailand":"508","Northwest Croatia":"624","Northwest Territories":"106","Northwest of Ireland":"212","Northwest of Mexico":"117","Northwestern Iran":"482","Nova Scotia":"99",Nunavut:"107",Oaxaca:"119",Ohio:"74",Oklahoma:"75",Oltenia:"9",Ontario:"95",Oregon:"76",Orinoquia:"692",Orissa:"454",Ostlandet:"295",Otago:"716",Oulu:"240","Pacific Coast of Mexico":"118",Pacifica:"693",Palawan:"647",Pampas:"151",Pando:"681",Papua:"466","Parana and Santa Catarina":"150",Paranena:"675","Paris Isle of France":"199",Patagonia:"156","Pays de la Loire":"200",Peloponnese:"419","Peninsular Malaysia ":"643",Pennsylvania:"77",Picardy:"201",Piedmont:"272",Plovdiv:"353",Podolia:"136","Pohja-Eesti":"654","Poitou Charentes":"202",Polisia:"135",Pomerania:"306",Povardarie:"695",Prekmurje:"621","Prince Edward Island":"96","Provence Alpes Azur":"203",Punjab:"494",Pyongan:"669",Qinghai:"389",Quebec:"100",Queensland:"329",Rajasthan:"446","Ras al-Khaimah":"740",Raska:"639","Razavi Khorasan":"475","Red Sea Coast":"735","Rhineland-Palatinate":"253","Rhode Island":"78","Rhone Alps":"204","Rio Grande do Sul":"653",Romandie:"337",Ruse:"358",Ryanggang:"673",Saarland:"254",Sabah:"641",Salzburg:"344",Samogitia:"664","Santa Cruz":"679",Sarawak:"642",Sardinia:"273",Saskatchewan:"101",Saxony:"255","Saxony-Anhalt":"256",Scania:"324","Schleswig-Holstein and Hamburg":"257",Scotland:"217",Semnan:"477",Shaanxi:"377",Shandong:"378",Shanghai:"397",Shannon:"210",Shanxi:"379",Sharjah:"738",Shikoku:"490",Sichuan:"380",Sicily:"274",Silesia:"307",Sinai:"730",Sindh:"495","Singapore City":"648","Sistan and Baluchistan":"473",Siveria:"139",Sjaelland:"235",Slavonia:"622",Sloboda:"142","Slovenian Littoral":"571",Smaland:"326",Sofia:"355",Sorlandet:"292","South Australia":"330","South Carolina":"79","South Dakota":"80","South Dalmatia":"628","South East Chaco":"153","South East of England":"220","South Khorasan":"474","South West of England":"221","Southeast of Brazil":"149","Southeast of Ireland":"213","Southeast of Mexico":"121","Southeastern Anatolia":"518","Southern Basarabia":"93","Southern Bohemia":"437","Southern Cyprus":"705","Southern Finland":"237","Southern Great Plain":"114","Southern Low Amazon":"687","Southern Netherlands":"529","Southern Serbia":"640","Southern Taiwan":"704","Southern Thailand":"510","Southern Transdanubia":"109","Southwestern Iran":"481",Styria:"345","Styria and Carinthia":"601",Subcarpathia:"132",Sudovia:"667",Sulawesi:"464",Sumadija:"636",Sumatra:"460","Svalbard & Jan Mayen":"562",Svealand:"320","Svizzera italiana":"338",Syddanmark:"236",Tabuk:"726","Tamil Nadu":"452",Tasmania:"331",Taurida:"144","Tel Aviv Center District":"470",Tennessee:"81",Texas:"82",Thessaly:"415",Thrace:"413",Thuringia:"258",Tibet:"394",Tohoku:"485",Transilvania:"35",Transnistria:"94","Trentino-South Tyrol":"275",Trondelag:"293",Tuscany:"276",Tyrol:"346",Umbria:"277","Umm al Quwain":"741","Upper Austria":"343","Upper Carniola":"591","Upper Egypt":"734","Upper Normandy":"205",Urals:"540",Utah:"83","Uttar Pradesh":"445","Valencian Community":"180","Valley of Mexico":"115",Varna:"356",Veneto:"278","Venezuelan Andean":"123","Venezuelan Capital":"124",Vermont:"84",Vestlandet:"294",Victoria:"332",Vidin:"352",Vidzeme:"659",Virginia:"85",Visayas:"645",Vitsebskaya:"712",Vojvodina:"634",Volga:"544","Volga Vyatka":"541",Volhynia:"134",Vorarlberg:"347",Wales:"218",Wallonia:"230",Washington:"86",Wellington:"714","West Bengal":"457","West Midlands":"223","West Srpska Republic":"649","West Virginia":"87","Western Australia":"333","Western Cape":"505","Western Desert":"732","Western Finland":"238","Western Macedonia":"696","Western Netherlands":"528","Western Serbia":"638","Western Siberia":"542","Western Slovakia":"315","Western Transdanubia":"108",Wisconsin:"88",Wyoming:"89",Xinjiang:"393",Yazd:"476","Yorkshire & Humberside":"225",Yukon:"104",Yunnan:"381",Zaporozhia:"141",Zemgale:"661",Zhejiang:"382","Zona Austral":"633","Zona Central":"631","Zona Sur":"632",Zulian:"131"
};


function calcInflu(rank, strength, weapon) {
	var totalInflu = Math.floor(((rank - 1) / 20 + 0.3) * ((strength / 10) + 40) * (1 + weapon / 100));
	
	return (totalInflu);
}


	var citName=$.trim($('.citizen_profile_header h2').text());
	var citName2=$('.user_info a').html();
	if (debug==1) alert("name: "+citName);
	if (debug==1) alert("name2: "+citName2);
	var regName=$('.citizen_info a:eq(2)').attr('title');
	if (debug==1) alert("region: "+regName);
	var regID = region_id[regName];
	if (debug==1) alert("regionID: "+regID);
	var regFeed='http://api.erepublik.com/v2/feeds/regions/'+regID+'.json';
	$('.citizen_info a:eq(2)').after(' <a href="'+regFeed+'">feed</a>');
	//$.getJSON(regFeed, function(json) {
	//	alert("JSON Data: " + json);
	//});
	var citLink = document.location.href;
	var citAvatar=	$('.citizen_avatar').attr('style');
	citAvatar=	citAvatar.substring(citAvatar.indexOf("url(")+4, citAvatar.indexOf(");"));
	if (debug==1) alert("Avatar: "+citAvatar);
	var citCountry=	$('.citizen_info').html();
	citCountry=	citCountry.substring(citCountry.indexOf("flags/")+8, citCountry.indexOf(".gif"));
	if (debug==1) alert("user_country: "+citCountry);
	var citWell = $('#current_health').html();
	if (debug==2) alert("citWell: "+citWell);
	var citWellLeft = $('.tooltip_health_limit').html();
	if (debug==2) alert("citWellLeft: "+citWellLeft);
	var foodResetHours = $('#foodResetHours').html();
	if (debug==2) alert("foodResetHours: "+foodResetHours); 
	var citNationalRank = $('.citizen_second strong').html();
	if (debug==3) alert("National Rank: "+citNationalRank);
	var citStrength = parseFloat($('.citizen_military:eq(0) h4').text().replace(/,/gi, '').replace(/^\s+|\s+$/g, ''));
	if (debug==4) alert("Cit Strength: "+citStrength);
	var currentRank = parseFloat($('.citizen_military:eq(1) .stat small:eq(1) strong').html().split(' / ')[0].replace(/,/gi, ''));
	if (debug==5) alert("Rank points: "+currentRank);
	//alert($('.citizen_military:eq(1) h4').text());
	var citRank = rank_id[$('.citizen_military:eq(1) h4 a').text().replace(' *', '*').replace(/^\s+|\s+$/g, '').toLowerCase()];
	if (debug==5) alert("Rank: "+citRank);
	var citMaxHit = calcInflu(citRank, citStrength, 200);
	if (debug==5) alert("MaxHit: "+citMaxHit);
	var citTruePatriot = parseFloat($('.citizen_military:eq(2) h4').text().replace(/,/gi, '').replace(/^\s+|\s+$/g, ''));
	if (debug==6) alert("True Patriot: "+citTruePatriot);
	var citTopDamage = parseFloat($('.citizen_military:last h4').text().replace(/,/gi, '').replace(/^\s+|\s+$/g, ''));
	var citTopDamageFor = $('.citizen_military:last h4 img ').attr('alt');
	if (debug==7) alert("Top damage: "+citTopDamageFor);
	var citTopDamageDesc = $('.citizen_military:last div small').text();
	if (debug==7) alert("Top damage desc: "+citTopDamageDesc);
	if(citName!=citName2)
	{
		//citName=citName2;
		citWellLeft="N/A";
		citWell = "N/A";
		foodResetHours = "N/A";
	}
	
	crlf='<br>';
	orders='<a href="'+citLink+'"><img src="'+citAvatar+'" width="25px" height="25px">'+citName+'</img></a>'+crlf;
	orders+=' <img src="http://www.erepublik.com/images/modules/_icons/mini_health.png"  width="25px" height="25px" alt="wellness" />'+citWell;
	orders+=(citWellLeft!="N/A") ? ', ('+citWellLeft+' left)' : '';
	orders+=crlf;
	orders+=' <img src="http://www.erepublik.com/images/flags_png/S/'+citCountry+'.png"  width="25px" height="25px" alt="'+citCountry+'" />'+citNationalRank+crlf+
					' <img src="http://www.erepublik.com/images/icons/alerts/military_42.gif"  width="25px" height="25px" alt="strength" />'+citStrength+crlf+
					' <img src="http://www.erepublik.com/images/parts/icons/campaigns/military_icon_small.png"  width="25px" height="25px" alt="influence" /> '+currentRank+crlf+
					' <img src="http://www.erepublik.com/images/icons/industry/2/q7.png"  width="25px" height="25px" alt="maxHit" /> '+citMaxHit+crlf;
	orders+=' <img src="http://www.erepublik.com/images/achievements/icon_achievement_truepatriot_on.gif"  width="25px" height="25px" alt="True Patriot" /> '+citTruePatriot+crlf;
	orders+=crlf+'Top damage: <b>'+citTopDamage+'</b> for '+citTopDamageFor+crlf+' '+ citTopDamageDesc+crlf;

if (frameDisplay==1)
{
  //alert(orders);
  displayFrame(orders, "Profile");
}
if (sendToSpread==1)
{
	var citWellSend=((citWell!='N/A') ? citWell+' , ('+citWellLeft+')' : '');
	var http;
	http=new XMLHttpRequest();
	http.open("GET",URLGoogleForm+
	 "&entry.0.single=" + citName +
	 "&entry.1.single=" + citLink + 
	 "&entry.2.single=" + citCountry +
	 "&entry.3.single=" + citStrength + 
	 "&entry.4.single=" +  (currentRank*10)+
	 "&entry.5.single=" + citMaxHit + 
	 "&entry.6.single=" + citWellSend+
//	 "&entry.7.single=" + citTopDamage+' for '+citTopDamageFor+' '+ citTopDamageDesc +
	 "&submit=Submit",true);
	http.send(null);
}



    function displayFrame(orders, caption, day, newspaper)
    {
      if (day != "0"){
        if(day == undefined) day = "";
		if(caption == undefined) caption = "orders:";
		if(newspaper == undefined) newspaper = "";
		
		orders = bbcode(orders);
        
        var ordersDiv = document.createElement('div');
        ordersDiv.className = 'box';
		// <div class="latest_events box">\
		//style="width: 130px;">\ ; width: 120px
		
        ordersDiv.innerHTML = '\
        <div class="box" >\
			<div class="item elem" style="width: 145px; background-color: #E9F5FA; padding: 1px 7px 1px 7px">\
			    <p style="color: #90BCC9; font-weight: bold; font-size: 11px">'+caption+': '+day+'</p>\
                <div class="holder" style="width: 130px; background-color: #FFFFFF; color: #666666; font-size: 14px; padding: 6px 4px 31px 4px; border: 1px solid #B5D6E1">'+orders+'</div>\
<p style="color: #90BCC9; font-weight: bold; font-size: 11px; padding-left: 10px;">'+newspaper+'</p>\
            </div>\
        </div>';
 //                        <div class="iconholder"><img class="test" width="50px" height="50px" src="'+'http://static.erepublik.com/uploads/avatars/Citizens/2009/07/12/a78444f6675ac50b9060783d23377d6a_142x142.jpg'+'" title="avatar"/></div>\
       
        //news = document.getElementById('footer');
        //news.parentNode.insertBefore(ordersDiv, news);
	//$('#logo').html(ordersDiv);
	//alert(ordersDiv);
	$('.citizen_sidebar').append(ordersDiv);
        
      }
    }

    function displayErrFrame(info, caption)
    {
		if (caption == undefined) caption = "Error";
        displayFrame(info, caption);
    }
	
	function bbcode(doc)
	{
		doc = doc.replace(/\[url=(.+?)\]/gi, function(wholematch, firstmatch){
			    return '<a href="' + firstmatch + '">';}
			).replace(/\[\/url\]/gi, '</a>')
			.replace(/\[b\]/gi, '<strong>')
			.replace(/\[\/b\]/gi, '</strong>')
			.replace(/\*\*\*/g, '<br/>')
			.replace(/\[big\]/gi, '<span style="font-size: 16px">')
			.replace(/\[\/big\]/gi, '</span>')
			.replace(/\---/g, '<div style="padding-left: 15%; padding-right: 15%"><hr/></div>')
			.replace(/\[link\](.+?)\[\/link\]/gi, function(wholematch, firstmatch){
			    return '<span style="padding-left: 8px; font-size: 16px; font-weight: bold;">'+splitLinks(firstmatch)+'</span>';}
			);
		return doc;
	}
