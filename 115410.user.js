// ==UserScript==
// @author vkv
// @name WoTStats
// @version 0.6.7.8
// @description Adds some usable fields for MMO game World of Tanks user's page 
// @match http://challenge.worldoftanks.ru/uc/accounts/*
// @match http://worldoftanks.com/community/accounts/*
// @match http://uc.worldoftanks.eu/uc/accounts/*
// @include http://challenge.worldoftanks.ru/uc/accounts/*
// @include http://worldoftanks.com/community/accounts/*
// @include http://uc.worldoftanks.eu/uc/accounts/*
// ==/UserScript==
// @vkv
if(document.title.indexOf("WoT: Профиль игрока")>-1)
	main("ru"); 
else 
	main("en");
function main(lang) {
   var timeDiv = document.getElementsByClassName("b-data-date")[0];
   var timeStamp = new Date(Number(timeDiv.childNodes[1].getAttribute("data-timestamp"))*1000);

   var dayArray = [];
   var old_b =0;
   var old_w =0;
   cr_erned = 0;
   xp_erned = 0;
   newBatles = 0;
   timeDiv.innerHTML +="<p/> <font onclick='WriteStat();' style='cursor:pointer; color:white; text-decoration:underline'>"+((lang == "ru") ? "Сохранить текущую стату":"Save statistic")+"</font>";
 
   var daystat = getCookie("daystat");
   if (daystat == null)
	{
	   var needWrite = true; //надо ли уже записывать статистику
	}
   else	
	{
	   var tableDin = document.getElementsByClassName("t-table-dotted")[document.getElementsByClassName("t-table-dotted").length-1];
	   tableDin.insertRow(-1).insertCell(-1).innerHTML = "Динамика";

	   var strArray = daystat.split("/");
	   var str = strArray[0].split(";");
	   timeStat = new Date(str[0]);	
	   if (timeStamp - timeStat !=0||true)
	   {	
	   timeDiv.innerHTML += "<p/>"+((lang == "ru") ? " Сравнение с данными на ": "Compare with ")+ timeStat.toLocaleString().substr(0, timeStat.toLocaleString().lastIndexOf(":"));
//	   if (timeStamp - timeStat >1000*60*60*24 ) //если с прошлого замера прошло больше суток, обновляем.
//	   	var needWrite = true;
	   var tres = document.getElementsByClassName("t-table-dotted")[0];
	   if (tres.innerHTML.indexOf("currency-gold")>0)
	      for (var i = 0; i < 3 ; i++)
		{
		var diff = toFl(tres.rows[i].cells[1].innerHTML) - Number(str[i+1]);
		if (diff)
			{ 
                	tres.rows[i].cells[1].childNodes[1].innerHTML+="<span style='font-size:11px;'>/"+((diff>0)?"+":"")+diff+"</span>";
			if (i == 1) cr_erned = diff;
			if (i == 2) xp_erned = diff;
			}
		
		}
	   if (str.length > 3)
		{		
		   var tres = document.getElementsByClassName("t-statistic")[0];
		   j = 1;
		   for (var i = 4; i < str.length-1 ; i++)
			{
			var diff = toFl(tres.rows[j].cells[3].innerHTML) - Number(str[i]);	
			if (diff)
				{
				tres.rows[j].cells[3].innerHTML+="<span style='font-size:11px;'>/"+((diff>0)?"+":"")+diff+"</span>";	
				if ( j == 5)
				{
				newBatles = diff;
					if (cr_erned != 0)
					{
					var r = tableDin.insertRow(-1);
					var c = r.insertCell(-1);
					c.innerHTML = "кредов за бой";
					var c = r.insertCell(-1);
	
					c.innerHTML = (cr_erned/diff).toFixed();
					c.className = "td-number";

					var r = tableDin.insertRow(-1);
					var c = r.insertCell(-1);
					c.innerHTML = "ср.опыт за бой(вкл х2)";
					var c = r.insertCell(-1);
					newBatles = diff;	
					c.innerHTML = (xp_erned/diff*20).toFixed();
					c.className = "td-number";

					}
				}
				else 
				if (newBatles)
			{
				if (j == 7 )
					{
					var r = tableDin.insertRow(-1);
					var c = r.insertCell(-1);
					c.innerHTML = "Дамаг за бой";
					var c = r.insertCell(-1);
					c.innerHTML = (diff/newBatles).toFixed();
					c.className = "td-number";
					}

				else if (j == 9 )
					{
					var r = tableDin.insertRow(-1);
					var c = r.insertCell(-1);
					c.innerHTML = "фрагов за бой";
					var c = r.insertCell(-1);
					c.innerHTML = (diff/newBatles).toFixed(2);
					c.className = "td-number";
					}

				else if (j == 10 )
					{
					var r = tableDin.insertRow(-1);
					var c = r.insertCell(-1);
					c.innerHTML = "Обнаружено за бой";
					var c = r.insertCell(-1);
					c.innerHTML = (diff/newBatles).toFixed(2);
					c.className = "td-number";
					}

	                }

			        }
			i++;	
		        var r = tres.rows[j].cells[4].getElementsByTagName("a")[0];
			resText = r == undefined ? tres.rows[j].cells[4].innerHTML: r.innerHTML ;

			var diff = toFl(resText) - Number(str[i]);	
			if (diff)
				tres.rows[j].cells[4].innerHTML+="<span style='font-size:11px;'>/"+((diff>0)?"<font color=red>v</font>"+diff:"<font color=green>^</font>"+(-diff))+"</span>";	
			j++;
			}
		}
	   for (var i =1; i<strArray.length; i++)
		{
		  str = strArray[i].split(";")
		  dayArray[str[0]] = new Object();
 		  dayArray[str[0]].b = toFl(str[1]);	
 		  dayArray[str[0]].w = toFl(str[2]);	
		}
	   }	
	}
 
    var server = document.location.host.match(/\.([^\.]+)$/)[1].toUpperCase();
    server = server == "COM"?"US" : server;	
    timeDiv.innerHTML += "<a href='http://td82.ru/wotka?nickname="+document.getElementsByTagName("h1")[0].innerHTML+"&server="+server+"'>"
	+ ((lang == "ru") ? "История кланов": "Clan history")+"</a>";
	                                     


   var script = document.createElement("script");  
   script.type = "text/javascript";		
   script.textContent =  sortTd.toString();
   document.body.appendChild(script);

   var script = document.createElement("script");  
   script.type = "text/javascript";		
   script.textContent =  WriteStat.toString();
   document.body.appendChild(script);

   var script = document.createElement("script");  
   script.type = "text/javascript";		
   script.textContent =  hideTypes.toString();
   document.body.appendChild(script);

   var script = document.createElement("script");  
   script.type = "text/javascript";		
   script.textContent =  toFl.toString();
   document.body.appendChild(script);

   var script = document.createElement("script");  
   script.type = "text/javascript";		
   script.textContent =  col.toString();
   document.body.appendChild(script);

   var script = document.createElement("script");  
   script.type = "text/javascript";		
   script.textContent =  col2.toString();
   document.body.appendChild(script);



var atype = [];

atype[1] = //'lt',
[
'T2_lt',
'M22_Locust',
'PzII_J',
'M24_Chaffee',
'T-50',
'T_50_2',
'VK2801',
'T-15',
'MS-1',
'Ltraktor',
'T1_Cunningham',
'T-26',
'BT-2',
'PzII',
'Pz35t',
'M2_lt',
'T-46',
'BT-7',
'PzIII_A',
'PzII_Luchs',
'Pz38t',
'M3_Stuart',
'A-20',
'VK1602',
'Pz38_NA',
'M5_Stuart',
'M3_Stuart_LL',
'BT-SV',
'T-127',
'Valentine_LL',
'H39_captured',
'A-32'
]
atype[2] = //'mt',
[
'T-25',
'Sherman_Jumbo',
'Ch01_Type59',
'S35_captured',
'PzV_PzIV',
'PzV_PzIV_ausf_Alfa',
'MTLS-1G14',
'M4A2E4',
'Ram-II',
'Matilda_II_LL',
'T2_med',
'M2_med',
'T-28',
'PzIII',
'M3_Grant',
'T-34',
'PzIV',
'PzIII_IV',
'M4_Sherman',
'M7_med',
'T-34-85',
'VK3601H',
'VK3001H',
'VK3001P',
'M4A3E8_Sherman',
'T-43',
'KV-13',
'VK3002DB',
'PzV',
'T20',
'T-44',
'Panther_II',
'T23',
'Pershing',
'T-54',
'E-50',
'M46_Patton']
atype[3] = //'ht',
[
'Lowe',
'KV-220',
'KV-5',
'B-1bis_captured',
'Churchill_LL',
'T14',
'M6A2E1',
'KV',
'T1_hvy',
'KV-3',
'KV-1s',
'M6',
'IS',
'PzVI',
'PzVI_Tiger_P',
'T29',
'IS-3',
'PzVIB_Tiger_II',
'VK4502A',
'T32',
'IS-4',
'VK4502P',
'E-75',
'T34_hvy',
'IS-7',
'Maus',
'E-100',
'T30']
atype[4] = //'sp',
['SU-18',
'Bison_I',
'T57',
'SU-26',
'Wespe',
'Sturmpanzer_II',
'M37',
'SU-5',
'Grille',
'M7_Priest',
'SU-8',
'Hummel',
'M41',
'SU-14',
'S-51',
'G_Panther',
'M12',
'Object_212',
'G_Tiger',
'M40M43',
'Object_261',
'G_E',
'T92']
atype[5] = //at
['AT-1',
'PanzerJager_I',
'T18',
'SU-76',
'G20_Marder_II',
'T82',
'GAZ-74b',
'Hetzer',
'T40',
'SU-85',
'StuGIII',
'M10_Wolverine',
'SU-100',
'JagdPzIV',
'M36_Slagger',
'SU-152',
'JagdPanther',
'T25_AT',
'ISU-152',
'Ferdinand',
'T28',
'Object_704',
'JagdTiger',
'T95']


//var tankS =["МС-1",	"Leichttraktor",	"T1 Cunningham",	"Т-26",	"БТ-2",	"PzKpfw II",	"PzKpfw 35 (t)",	"M2 Light Tank",	"Т-46",	"БТ-7",	"PzKpfw III Ausf. A",	"PzKpfw II Luchs",	"PzKpfw 38 (t)",	"M3 Stuart",	"А-20",	"VK 1602 Leopard",	"PzKpfw 38 nA",	"M5 Stuart",	"T2 Medium Tank",	"M2 Medium Tank",	"Т-28",	"PzKpfw III",	"M3 Lee",	"T-34",	"PzKpfw IV",	"PzKpfw III/IV",	"M4 Sherman",	"M7",	"Т-34-85",	"VK 3601 (H)",	"VK 3001 (H)",	"VK 3001 (P)",	"M4A3E8 Sherman",	"Т-43",	"КВ-13",	"VK 3002 (DB)",	"PzKpfw V Panther",	"T20",	"Т-44",	"Panther II",	"M26 Pershing",	"Т-54",	"E-50",	"M46 Patton",	"КВ",	"T1 heavy",	"КВ-3",	"КВ-1С",	"M6",	"ИС",	"PzKpfw VI Tiger",	"PzKpfw VI Tiger (P)",	"T29",	"ИС-3",	"PzKpfw VIB Tiger II",	"VK 4502 (P) Ausf. A",	"T32",	"ИС-4",	"VK 4502 (P) Ausf. B",	"E-75",	"T34",	"ИС-7",	"Maus",	"E-100",	"T30",	"СУ-18",	"Sturmpanzer I Bison",	"T57",	"СУ-26",	"Wespe",	"Sturmpanzer II",	"M37",	"СУ-5",	"Grille",	"M7 Priest",	"СУ-8",	"Hummel",	"M41",	"СУ-14",	"С-51",	"GW Panther",	"M12",	"Объект 212",	"GW Tiger",	"M40/M43",	"Объект 261",	"GW Typ E",	"T92",	"АТ-1",	"Panzerjäger I",	"T18",	"СУ-76",	"Marder II",	"T82",	"СУ-85Б",	"Hetzer",	"T40",	"СУ-85",	"StuG III",	"M10 Wolverine",	"СУ-100",	"JagdPz IV",	"M36 Slugger",	"СУ-152",	"Jagdpanther",	"T25 AT",	"ИСУ-152",	"Ferdinand",	"T28",	"Объект 704",	"Jagdtiger",	"T95",	"M3 Stuart",	"Т-127",	"Valentine",	"А-32",	"Churchill",	"Matilda",	"КВ-220",	"КВ-5",	"PzKpfw 38H735 (f)",	"PzKpfw S35 739 (f)",	"T-15",	"PzKpfw B2 740 (f)",	"T-25",	"PzKpfw V-IV",	"PzKpfw V-IV Alpha",	"Löwe",	"T2 lt",	"M22 Locust",	"M4A2E4",	"Ram-II",	"T-14",	"M6A2E1"];
var tankS =["KV",	"T-34-85",	"IS",	"IS-3",	"T-34",	"T-44",	"IS-4",	"KV-3",	"T-43",	"PzIV",	"T-54",	"PzVI",	"SU-85",	"PzVIB_Tiger_II",	"SU-100",	"Hummel",	"VK3601H",	"T-28",	"SU-152",	"A-20",	"SU-8",	"T29",	"Lowe",	"BT-2",	"StuGIII",	"ISU-152",	"SU-5",	"IS-7",	"Object_212",	"G_Panther",	"SU-26",	"VK1602",	"S-51",	"PzIII",	"SU-14",	"JagdPanther",	"JagdPzIV",	"T-46",	"BT-7",	"Grille",	"Object_704",	"T1_hvy",	"VK3001P",	"Ferdinand",	"T32",	"VK4502P",	"M4A3E8_Sherman",	"Hetzer",	"MS-1",	"M6",	"GAZ-74b",	"Panther_II",	"VK3002DB",	"T-26",	"G_Tiger",	"KV-1s",	"M41",	"M3_Grant",	"T34_hvy",	"T20",	"VK3001H",	"PzIII_A",	"PzII",	"AT-1",	"E-50",	"PzIII_IV",	"SU-76",	"Ltraktor",	"M7_Priest",	"M4_Sherman",	"Pershing",	"SU-18",	"Pz35t",	"T57",	"T30",	"Maus",	"G20_Marder_II",	"JagdTiger",	"E-75",	"M2_med",	"KV-13",	"M37",	"M12",	"PzII_Luchs",	"M46_Patton",	"KV-5",	"M40M43",	"Wespe",	"Sturmpanzer_II",	"M2_lt",	"M7_med",	"T2_lt",	"M36_Slagger",	"M10_Wolverine",	"Object_261",	"Pz38t",	"PzV",	"T1_Cunningham",	"M5_Stuart",	"T40",	"Bison_I",	"T2_med",	"T-50",	"T25_AT",	"PanzerJager_I",	"M3_Stuart",	"PzVI_Tiger_P",	"H39_captured",	"M3_Stuart_LL",	"Churchill_LL",	"T14",	"Pz38_NA",	"G_E",	"Matilda_II_LL",	"E-100",	"T28",	"Ram-II",	"M6A2E1",	"Ch01_Type59",	"T82",	"T92",	"KV-220",	"T95",	"T18",	"VK4502A",	"T_50_2",	"VK2801",	"T-25",	"Valentine_LL",	"B-1bis_captured",	"M4A2E4",	"A-32",	"PzV_PzIV",	"S35_captured",	"Sherman_Jumbo",	"M22_Locust",	"M24_Chaffee",	"T-127",	"T-15",	"PzV_PzIV_ausf_Alfa",	"BT-SV",	"PzII_J",	"MTLS-1G14"];
//var medP =[49.77,	49.26,	49.09,	47.33,	48.3,	49.28,	48.91,	50.76,	48.42,	47.23,	48.53,	49.7,	49.12,	50.03,	47.21,	51.66,	48.43,	48.8,	47.51,	49.52,	48.08,	48.07,	47.83,	47.59,	50.08,	47.32,	49.97,	47.26,	49.12,	51.42,	50.76,	49.06,	50.31,	49.95,	49.38,	50.42,	51.16,	51.68,	49.85,	52.89,	53.38,	48.89,	50.17,	51.79,	48.79,	46.62,	46.81,	45.99,	46.47,	46.69,	46.34,	48.46,	48.76,	47.04,	49.12,	49.2,	49.7,	47.7,	47.7,	50.88,	46.72,	50.58,	52.11,	54.93,	52.4,	47.57,	48.08,	49.96,	49.92,	48.09,	48.36,	47.76,	49.12,	48.92,	47.69,	49.46,	49.02,	49.48,	48.36,	48.19,	49.78,	49.32,	49.67,	48.26,	50.98,	49.66,	51.15,	49.11,	50.86,	50.72,	52.68,	49.02,	53.23,	51.63,	48.58,	48.67,	50.99,	50.05,	48.97,	50.26,	51.01,	49.36,	51.6,	50.55,	51.87,	53.52,	52.98,	54.19,	54.39,	50.65,	49.64,	51.68,	48.27,	52.97,	50.18,	54.37,	44.76,	49.45,	48.56,	46.32,	53.93,	56.39,	53.89,	48.19,	50.53,	51.17,	50.2,	47.36,	54.02,	54.24,	48.06,	51.63,	44.64,	49.7];
var medP =[49.2,	49.73,	47.42,	46.92,	48.65,	50.25,	47.09,	47.05,	50.15,	50.31,	51.17,	46.43,	50.7,	48.17,	51.64,	49.62,	51.74,	48.85,	50.84,	47.71,	49.44,	49.66,	47.81,	50.06,	50.05,	53,	48.91,	51.42,	50.17,	49.46,	51.07,	52,	48.42,	49.2,	49.07,	51.52,	49.97,	48.71,	47.6,	49.45,	52.65,	47.31,	49.14,	53.88,	50.43,	46.62,	50.82,	49.1,	50.85,	46.42,	49.32,	51.65,	51.52,	49.07,	48.34,	46.23,	49.92,	48.55,	46.06,	52.01,	50.41,	48.58,	50.26,	53.33,	51.16,	48.34,	49.62,	49.67,	48.51,	50.78,	52.9,	47.76,	50.25,	51.77,	53.52,	52.9,	54.39,	50.83,	50.11,	50.26,	50.2,	48.52,	48.91,	50.26,	53.49,	47.85,	51.62,	48.45,	49.08,	53.06,	48.22,	54.94,	52.24,	51.13,	50.13,	49.29,	52.08,	49.35,	49.37,	51.94,	49.35,	49.35,	52.83,	53.91,	54.16,	50.66,	49.88,	59.43,	48.77,	45.88,	46.04,	49.55,	51.38,	50.39,	53.29,	53.33,	52.49,	47.58,	55.01,	52.67,	49.68,	45.39,	52.68,	55.51,	49.64,	55.83,	53.52,	52.6,	50.8,	50.96,	49.02,	52.85,	51.11,	56.37,	54.16,	55.35,	56.32,	56.17,	55.51,	51.3,	50,	0,	0];


var levOrder = ["X","IX","VIII","VII","VI","V","IV","III","II","I"];
        var all_b = 0;
        var all_w = 0;
	var ussr_b = 0;
	var ussr_w = 0;
	var nazi_b = 0;
	var nazi_w = 0;
	var usa_b = 0;
	var usa_w = 0;
	var chin_b = 0;
	var chin_w = 0;

	var lev = new Object();
	var levtr = [];
	var tttr = [];
	var tt = new Object();
	var trTank = [];

	var th = document.createElement('th');
	th.className = "right";
	th.innerHTML = (lang == "ru") ?"% побед" : "win%";
	var yd = document.getElementsByTagName('th');
	trth = yd[yd.length-1].parentNode;

	yd[yd.length-2].style = 'cursor: pointer';
	trth.innerHTML = "<th>"+(lang == "ru"?"Уровень":"Level")
//	        +"<div> с <input type=text width=3 name='battlefrom'></div>"
		+"</th>"+trth.innerHTML.replace(2,1);
	
	trth.appendChild(th);

	

	var th = document.createElement('th');
	th.className = "right";
	th.innerHTML = (lang == "ru") ? "%-ср%" : "%-avg%"
	th.title = (lang == "ru") ? "Неофициальный среднесерверный процент побед по состоянию на 03.10.11":
			"unoffitial % on ru server at 03.10.11";
	trth.appendChild(th);
	trth.innerHTML = trth.innerHTML.replace(/<th>/gm,"<th><div onclick='sortTd(this,0)' style = 'cursor: pointer'>")
	trth.innerHTML = trth.innerHTML.replace(/<th class="right"/gm,'<th class="right"><div onclick="sortTd(this,0)" style = "cursor: pointer"');
	trth.innerHTML = trth.innerHTML.replace(/<\/th>/gm,'</div></th>')

	trth.cells[1].innerHTML += "<div style='font-size:11px'><input type='checkbox' name='new' onchange='hideTypes(this)' style='background-color:rgb(5, 7, 9) ; color: rgb(143, 147, 147)'> "+((lang == "ru") ? "новые бои" : "new battles")+"</div>";
        trth.cells[2].innerHTML += "<div style='font-size:11px'>"
		+"> <input onchange='hideTypes(this)' size=1 name='from' style='height: 10px;background-color:rgb(5, 7, 9) ; color: rgb(143, 147, 147);'>"
	//	+"по<input onchange='hideTypes(this)' size=1 name='to' style='display:none;background-color:rgb(5, 7, 9) ; color: rgb(143, 147, 147);'></div>";

var sel = document.createElement("select");
sel.innerHTML += "<option value =0>"+((lang == "ru")?"Тип":"Type")+"</option>";
for (var j = 1; j<6; j++)
	sel.innerHTML += "<option value="+toType("t"+j)+">"+toType("t"+j)+"</option>";
sel.value = 0;


var th = document.createElement('th');	
th.innerHTML = "<div onclick='sortTd(this,0)' style = 'cursor: pointer;'>"+(lang == "ru"? "Тип" : "Type") +"</div>"; //(lang == "ru"? "Тип" : "Type")+"</span>";
th.appendChild(sel);
th.innerHTML = th.innerHTML.replace('<select>','<select name="type" onchange = "hideTypes(this);" style="height:15px;font-size:8px;background-color:rgb(5, 7, 9) ; color: rgb(143, 147, 147)" >') ;
//	+"<font style = 'cursor: pointer; font-size: 10px;' onclick='sortTd(this,0)'>"+"↓↑" +"</font>";
trth.insertBefore(th, trth.cells[0]);

	var yd = document.getElementsByTagName('td');
	for (i=0; i<yd.length; i++) 	

		{ 
			
		if( yd[i].className.indexOf("td-armory-icon")>1)
			{  
//win%
			var b = toFl(yd[i+2].innerHTML);
			var w = toFl(yd[i+3].innerHTML);
			all_b += b;
			all_w += w;	

			if( yd[i].className.indexOf("js-china td-armory-icon")==0)
			{  
//win s%
			chin_b += b;
			chin_w += w;
			nat = 4;
//
			}else
			if( yd[i].className.indexOf("js-ussr td-armory-icon")==0)
			{  
//win s%
			ussr_b += b;
			ussr_w += w;
			nat = 1;
//
			}else
			if( yd[i].className.indexOf("js-germany td-armory-icon")==0)
			{  
//win g%
			nazi_b+= b;
			nazi_w+= w;
			nat = 2;
//	
			}else
			if( yd[i].className.indexOf("js-usa td-armory-icon")==0)
			{  
//win u%
			usa_b+= b;
			usa_w+= w;
			nat = 3;	
//	
			}


			levN = yd[i].getElementsByTagName('span')[0].innerHTML.replace(/\s/g,"");
			if (lev[levN]==undefined)
				{
				lev[levN] = new Object();
				lev[levN].b = 0;
				lev[levN].w = 0;
				lev[levN].t = [];
				for (var j=0;j<6;j++)
					{
					lev[levN].t[j] = new Object();	
					lev[levN].t[j].b = 0;
					lev[levN].t[j].w = 0;
					}
				}
			lev[levN].b += b;
			lev[levN].w += w;

//type
//			ttN = (lang == "ru") ? ttype[tank.indexOf(yd[i+1].innerHTML)]:
//				ttype[tankEn.indexOf(yd[i+1].innerHTML)];
//			ttN = (ttN == undefined )? 0 : ttN;
//                      
			ttN = 0;
			imgName = yd[i].getElementsByTagName('img')[0].src.match(/\/([^\/]*)\.png/)[1];
			for (var j = 1; j<6 ; j++)
			{
				if (atype[j].indexOf(imgName)>=0)
				{		
					ttN = j;
					break;
				}	
			}
//
			tankType = "t"+ttN;
			if (tt[tankType]==undefined)
				{
				tt[tankType] = new Object();
				tt[tankType].b = 0;
				tt[tankType].w = 0;
				tt[tankType].n = [];
				for (var j=1;j<5;j++)
					{
					tt[tankType].n[j] = new Object();	
					tt[tankType].n[j].b = 0;
					tt[tankType].n[j].w = 0;
					}


				}
			tt[tankType].b += b;
			tt[tankType].w += w;
			tt[tankType].n[nat].b += b;
			tt[tankType].n[nat].w += w;
			lev[levN].t[ttN].b +=b;
			lev[levN].t[ttN].w +=w;

			var a =(w/b*100); 
			//yd[i+3].innerHTML = w + " ("+col(a,2)+"%)";
			trTankTable = yd[i].parentNode;
                        //if (toType("t"+ttN)==undefined)
//				yd[i].getElementsByTagName('span')[0].innerHTML +="	<span style='font-size: 10%;'>/"+toType("t"+ttN)+"</span>";
			var tdProc = document.createElement("td");
			tdProc.className = "right value";
			tdProc.innerHTML = ""+col(a,2)+"%";
			trTankTable.appendChild(tdProc);	

			med = medP[tankS.indexOf(imgName)]; 

			if(med == undefined)
				addTd(trTankTable, "<font>x</font>", "right value");	
			else
				addTd(trTankTable, col2(a-med), "right value", med);

			
			var t = [];
			t[0] = trTankTable;
			t[1] = ttN;
			t[2] = imgName;
			t[3] = b;
			t[4] = w;
			t[5] = a;
			t[6] = a-med;
			trTank.push(t);
//динамика
			oldStat = dayArray[imgName];
			if (!needWrite)
			{
			if (oldStat!=undefined)
			   {
	                   old_b +=oldStat.b;
	                   old_w +=oldStat.w;
			   }
			   else
			   {
		           oldStat = new Object();
			   oldStat.b=0;
                           oldStat.w=0;
			   }
			   if(b!=oldStat.b)
				yd[i+1].innerHTML += " <span style='font-size:11px;'>("+ (w-oldStat.w) + "/" + (b-oldStat.b) + "/"+col((w-oldStat.w)/(b-oldStat.b)*100)+"%)</span>"; 
			   	
//
                        }

			} else

		if(yd[i].innerHTML.replace(/\s/,"").indexOf("Проведено боёв")==0||
			yd[i].innerHTML.replace(/\s/,"").indexOf("Games Played")==0)
			{
			var battle = toFl(yd[i+1].innerHTML);
			}else
		if(yd[i].innerHTML.replace(/\s/,"").indexOf("Уничтожено")==0 ||
			yd[i].innerHTML.replace(/\s/,"").indexOf("Destroyed")==0)
			{
			var frags = toFl(yd[i+1].innerHTML);
			}else
		if(yd[i].innerHTML.replace(/\s/,"").indexOf("Обнаружено:")==0 ||
			yd[i].innerHTML.replace(/\s/,"").indexOf("Spotted")==0)
			{
			var spotted = toFl(yd[i+1].innerHTML);
			}else

		if(yd[i].innerHTML.replace(/\s/,"").indexOf("Нанесенные повреждения")==0||
			yd[i].innerHTML.replace(/\s/,"").indexOf("Damage")==0)
			{
			var damag = toFl(yd[i+1].innerHTML);
			} else
		if(yd[i].innerHTML.replace(/\s/,"").indexOf("Очки защиты базы")==0||
			yd[i].innerHTML.replace(/\s/,"").indexOf("Defense Points")==0)
			{
			var NewtrParent = yd[i].parentNode;
			} else
		if(yd[i].innerHTML.replace(/\s/,"").indexOf("Выжил в битвах")==0 ||
			yd[i].innerHTML.replace(/\s/,"").indexOf("Battles Survived")==0 )
			{ 
			var NatParent = yd[i].parentNode;
			} else
		if(yd[i].innerHTML.replace(/\s/,"").indexOf("Максимальный опыт за бой:")==0 ||
			yd[i].innerHTML.replace(/\s/,"").indexOf("Maximum Experience per Battle:")==0)
			{
			var ttParent = yd[i].parentNode;
			}


		}
if(needWrite)
{
//WriteStat();
}
if (all_b-old_b!=0&&old_b!=0)
{
var leftTable = NatParent.parentNode.rows;
leftTable[1].cells[1].innerHTML += "<p style='font-size:11px;'>+"+(all_b-old_b)+"</p>";
leftTable[2].cells[1].innerHTML += "<p style='font-size:11px;'>+"+(all_w-old_w)+"("+col((all_w-old_w)/(all_b-old_b)*100)+"%)"+"</p>";
}
insertNewTr(NewtrParent,(lang == "ru") ?" Повреждений за бой:" : "Damage per battle:", (damag/battle).toFixed(0), "");
insertNewTr(NewtrParent,(lang == "ru") ? " Фрагов за бой:" : "Frags per battle:" ,(frags/battle).toFixed(2), "");
insertNewTr(NewtrParent,(lang == "ru") ?" Обнаружено за бой:" : "Spotted per battle:", (spotted/battle).toFixed(2), "");

                
if(ussr_b!=0)insertNewTr(NatParent,(lang == "ru")?" Боев на советах:" : "Battles on USSR:", ""+ussr_b+" ("+(ussr_b/all_b*100).toFixed(0)+"%/"+col(ussr_w/ussr_b*100,0)+"%)", (lang == "ru")?"Процент боев/Процент побед" : "battle procent/win procent");
if(nazi_b!=0)insertNewTr(NatParent,(lang == "ru")?" Боев на немцах:": "Battles on Germany:", ""+nazi_b+" ("+(nazi_b/all_b*100).toFixed(0)+"%/"+col(nazi_w/nazi_b*100,0)+"%)" , (lang == "ru")?"Процент боев/Процент побед" : "battle procent/win procent");
if(usa_b!=0)insertNewTr(NatParent,(lang == "ru")?" Боев на амерах:" :"Battles on USA:", ""+usa_b+" ("+(usa_b/all_b*100).toFixed(0)+"%/"+col(usa_w/usa_b*100,0)+"%)" , (lang == "ru")?"Процент боев/Процент побед" : "battle procent/win procent");
if(chin_b!=0)insertNewTr(NatParent,(lang == "ru")?" Боев на китайцах:" :"Battles on China:", ""+chin_b+" ("+(chin_b/all_b*100).toFixed(0)+"%/"+col(chin_w/chin_b*100,0)+"%)" , (lang == "ru")?"Процент боев/Процент побед" : "battle procent/win procent");

var Table = document.createElement("table");
Table.className = "t-statistic";
ts = trTankTable.parentNode.parentNode;
ts.parentNode.appendChild(Table);

var tr = document.createElement("tr");
Table.appendChild(tr);
trTankTable = tr;
trLev =insertNewTr(trTankTable,(lang == "ru")?" <u>Бои по уровням</u>":"<u>battles by level:</u>",(lang == "ru")?"Бои":"Battles", "");
addTd(trLev,(lang == "ru")?"Победы":"Victories","right");
addTd(trLev,"%","right");
for(var j = 1;j<6;j++)
{
addTd(trLev, toType("t"+j),"right");
}

for(var i = 0; i< levOrder.length; i++)
{
key = levOrder[i];
if(lev[key]!=undefined)
	{
	levTr = insertTank(trTankTable,key, lev[key].b, lev[key].w, "lev" );
	for(var j = 1;j<6;j++)
		{
		b = lev[key].t[j].b;
		w = lev[key].t[j].w;
		if (b == 0) addTd(levTr,"x","right");
		else addTd(levTr,""+col(w/b*100,2)+"%","right value",""+w+"/"+b);
		}
	}
}

trType = insertNewTr(trTankTable,(lang == "ru")?" <u>Бои по типу</u>":"<u>battles by type:</u>",(lang == "ru")?"Бои":"Battles","");
addTd(trType,(lang == "ru")?"Победы":"Victories","right");
addTd(trType,"%","right");
for(var j = 1;j<4;j++)
{
addTd(trType, toNat(j),"right");
}

var ttOr = [];
for (var key in tt)
{
	tt[key].key = key;
	ttOr.push(tt[key]);
}
ttOr.sort(function (a1,a2)
	{
	if(a1.b < a2.b) return 1;
	else return -1;
	}
	)

for (var i = 0 ; i < ttOr.length; i++)
{
key = ttOr[i].key;
typeTr = insertTank(trTankTable,toType(key), tt[key].b ,tt[key].w, "typ" );
	for(var j = 1;j<4;j++)
		{
		b = tt[key].n[j].b;
		w = tt[key].n[j].w;
		if (b == 0) addTd(typeTr,"x","right");
		else addTd(typeTr,""+col(w/b*100,2)+"%","right value",""+w+"/"+b);
		}


}

for (var i = 0 ; i <trTank.length; i++)
{
	trTank[i][0].innerHTML = "<td>"+toType("t"+trTank[i][1])+"</td>"+trTank[i][0].innerHTML;
}
sortTd(trth.cells[1].childNodes[0]);
////////////////////////////////////////////////////////////////


function toFl(s)
{                 
var a =""+s;
return (parseFloat(a.replace(/[\D\.]/g,"")));
}

function addTd(tr, val, cl, alt)
{
var tdNew = document.createElement('td');
tdNew.innerHTML = val;
tdNew.className = cl;
if(alt==undefined) alt = "";
tdNew.title = alt;
tdNew.value = val;
tr.appendChild(tdNew);
}

function insertNewTr(NewTrParent,text,val, title)
{

var trNew = document.createElement('tr');
var tdNewName = document.createElement('td');
tdNewName.innerHTML = text;
var tdNew = document.createElement('td');
tdNew.innerHTML = val;
if (title!=undefined) tdNew.title = title;
tdNew.className = "td-number";
NewTrParent.parentNode.appendChild(trNew);
trNew.appendChild(tdNewName);
trNew.appendChild(tdNew);
return trNew;
}

function insertTank(NewTrParent,level,battle,win, name)
{

var trNew = document.createElement('tr');
var tdNewLevel = document.createElement('td');
tdNewLevel.innerHTML = level;
var tdNewBattle = document.createElement('td');
tdNewBattle.className = "right value";
tdNewBattle.innerHTML = battle;
var tdNewW = document.createElement('td');
tdNewW.innerHTML = win;
tdNewW.className = "right value";
var tdNewP = document.createElement('td');
tdNewP.innerHTML = ""+col(win/battle*100,2)+"%";
tdNewP.className = "right value";
NewTrParent.parentNode.appendChild(trNew);
trNew.appendChild(tdNewLevel);
trNew.appendChild(tdNewBattle);
trNew.appendChild(tdNewW);
trNew.appendChild(tdNewP);
//if (name == 'lev') trNew.style.display = 'none';
return trNew;
}

function toNat(n)
{
if(n==1) return (lang == "ru") ?"СССР":"USSR";
if(n==2) return (lang == "ru") ?"Германия":"Germany";
if(n==3) return (lang == "ru") ?"США":"USA";
}

function toType(k)
{
if(k == "t1") return (lang == "ru") ?"ЛТ":"LT";
if(k == "t2") return (lang == "ru") ?"СТ":"MT";
if(k == "t3") return (lang == "ru") ?"ТТ":"HT";
if(k == "t4") return (lang == "ru") ?"САУ":"SPG";
if(k == "t5") return (lang == "ru") ?"ПТ":"TD";
}

function col(v,digit)
{
if(isNaN(v)) return "x";
var color = "90ffff";        //больше 60, ярко-белый
if (v<60) color="90ff90"    // от 60 до 56, тусклозеленый
if (v<56) color="babfba"    //дефолтный серенький
if (v<50) color="ffff90"    //желтоватый
if (v<46) color="ff9090"    //красный

return "<font color='"+color+"'>"+v.toFixed(digit)+"</font>";
}

function col2(v)
{
var color = "90ffff";        //больше 60, ярко-белый
if (v<10) color="90ff90"    // от 60 до 56, тусклозеленый
if (v<5) color="babfba"    //дефолтный серенький
if (v<0) color="ffff90"    //желтоватый
if (v<-5) color="ff9090"    //красный
v = v.toFixed(2);
if (v>=0) v = "+"+v;
return "<font color='"+color+"'>"+v+"</font>";
}


}//////////////////////////main

function sortTd(el,dir)
{
        var p = el;
	while (p.tagName.toLowerCase() != "tbody")
	{
	if (p.tagName.toLowerCase() == "th")
		Index = p.cellIndex;
	p = p.parentNode;
	}
	tBody = p;//el.parentNode.parentNode;
//	alert(el.innerHTML);	
	rows = tBody.rows;
	th = rows[0];
	sortar = [];
	
	for (var i=1; i<rows.length ;i++)
		{
		sortar[i] = [];
		sortar[i][0] = defkey(rows[i],Index);
		sortar[i][1] = rows[i];
		}
	if (el.onclick.toString().indexOf('"u"')>0) 
		{
		sortar.sort(_sort);
		el.setAttribute('onclick','sortTd(this, "d")');
		} else
		{
		sortar.sort(_sortR);
		el.setAttribute('onclick','sortTd(this, "u")');
		}
	tBody.innerHTML = "";
	tBody.appendChild(th);
        for (var i=0;i<sortar.length -1 ;i++)
              	{
               	tBody.appendChild(sortar[i][1]);
              	}

function defkey(row,i)
{
var levOrder = ["X","IX","VIII","VII","VI","V","IV","III","II","I"];
if (i >= 5) return parseFloat(row.cells[i].innerHTML.match(/>(.*)</)[1]) ; 
if (i >= 3) return parseFloat(row.cells[i].innerHTML.replace(/\D/g,"")) ; 
if (i == 1) return levOrder.indexOf( row.cells[i].getElementsByTagName("span")[0].innerHTML.replace(/\s/,"") );
return row.cells[i].innerHTML;

}

function _sort(a,b)
{

a = a[0];
b = b[0];
if(a>b) return -1; else return 1;
}

function _sortR(a,b)
{

a = a[0];
b = b[0];
if(a>b) return 1; else return -1;
}
		
///

}////sortTd
/////
function hideTypes(el)
{
        var p = el;
	while (p.tagName.toLowerCase() != "tbody")
	{
	if (p.tagName.toLowerCase() == "th")
		Index = p.cellIndex;
	p = p.parentNode;
	}
	tBody = p;//el.parentNode.parentNode;

//	tBody = el.parentNode.parentNode.parentNode;
	rows = tBody.rows;
	th = rows[0];
	b = 0;
	w = 0;
	m = 0;
	//if (document.getElementsByName("type")[0].value != 0)
	
	ftype = document.getElementsByName("type")[0].value;
	onlyNew = document.getElementsByName("new")[0].checked;
	chfrom = document.getElementsByName("from")[0].value;
	chto = 0;//document.getElementsByName("to")[0].value;
	for (var i=1; i<rows.length ;i++)
		{
		if ((rows[i].cells[0].innerHTML == ftype || ftype == 0)
			&& (!onlyNew||rows[i].cells[2].innerHTML.indexOf("%")>0)
			&& (toFl(rows[i].cells[3].innerHTML)>chfrom && (toFl(rows[i].cells[3].innerHTML)<chto || chto==0 ) )
		   )
		{
			rows[i].style.display = "";
			bb = toFl(rows[i].cells[3].innerHTML)
			b += bb
			ww = toFl(rows[i].cells[4].innerHTML)
			w += ww
			mm = parseFloat(rows[i].cells[6].title)
			m += bb*(ww/bb*100- (mm?mm:0))
		}
		else 
		rows[i].style.display = "none";
		}
	tBody = tBody.parentNode;
	if (tBody.tFoot!=undefined) 
		tBody.deleteTFoot();		
	var r=tBody.createTFoot().insertRow(0);
	 r.insertCell(0).innerHTML = "Итого";
	 r.insertCell(1);
	 r.insertCell(2);
	var c = r.insertCell(3);
	c.innerHTML =""+ b;
	c.className = "right value";

	var c = r.insertCell(4);
	c.innerHTML =""+ w;
	c.className = "right value";

	var c = r.insertCell(5);
	c.innerHTML =""+col( w/b*100,2);
	c.className = "right value";

	var c = r.insertCell(6);
	c.innerHTML =""+ col2(m/b);
	c.className = "right value";

}

function getCookie(name)
{
	var start = document.cookie.indexOf( name + '=' );
	var len = start + name.length + 1;
	if ( ( !start ) && ( name != document.cookie.substring( 0, name.length ) ) ) 
	{
		return null;
	}
	if ( start == -1 ) return null;
	var end = document.cookie.indexOf( ';', len );
	if ( end == -1 ) end = document.cookie.length;
	return unescape( document.cookie.substring( len, end ) );

}

function WriteStat()
{
	var timeDiv = document.getElementsByClassName("b-data-date")[0];
   	var timeStamp = new Date(Number(timeDiv.childNodes[1].getAttribute("data-timestamp"))*1000);

	var cookie = ""+timeStamp+";"; 

        var tres = document.getElementsByClassName("t-table-dotted")[0];
	for (var i =0; i<3; i++)	
		
            if (tres.innerHTML.indexOf("currency-gold")>0)
		{
                var resText = tres.rows[i].cells[1].innerHTML;
		resText = resText.substr(resText.indexOf("span")+4);
		cookie+=""+toFl(resText.substr(0, resText.indexOf("span"))) + ";";
		}
	    else
		{
		cookie+="NaN;";
		}

        var rows = document.getElementsByClassName("t-statistic")[0].rows; 
	for (var i =1; i<rows.length; i++)	
		{
                var resText = rows[i].cells[3].innerHTML;
		resText = resText.indexOf("span") > 0 ? resText.substr(0,resText.indexOf("span")) : resText;

		cookie +=""+ toFl(resText)+";";

                var r = rows[i].cells[4].getElementsByTagName("a")[0];
		resText = r == undefined ? rows[i].cells[4].innerHTML: r.innerHTML ;
		resText = resText.indexOf("span") > 0 ? resText.substr(0,resText.indexOf("span")) : resText;

		cookie +=""+ toFl(resText)+";";


		}
		
        var rows = document.getElementsByClassName("t-statistic")[1].rows;
        for (var i=1; i<rows.length ;i++)
		{
		var t = rows[i].cells;
		if (t[1].tagName != "TH")
			{
			imgName = t[1].getElementsByTagName('img')[0].src.match(/\/([^\/]*)\.png/)[1];
			cookie += "/"+imgName+";"+toFl(t[3].innerHTML)+";"+toFl(t[4].innerHTML);
			}
		}

	document.cookie = "daystat" +"=" + escape(cookie)+"; expires=Mon, 01-Jan-2031 00:00:00 GMT";  
	alert("Saved");

}
