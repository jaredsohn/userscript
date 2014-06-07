// ==UserScript==
// @author by vkv with HKC additions-changes work
// @name HKCACAWoTStats
// @namespace HKCACAWoTStats
// @version 0.7.4.2HKC
// @description Adds some usable fields for MMO game World of Tanks user's page 
// @match http://challenge.worldoftanks.ru/uc/accounts/*
// @match http://worldoftanks.com/uc/accounts/*
// @match http://worldoftanks.ru/uc/accounts/*
// @match http://worldoftanks.ru/community/accounts/*
// @match http://worldoftanks.com/community/accounts/*
// @match http://uc.worldoftanks.eu/uc/accounts/*
// @match http://worldoftanks.eu/uc/accounts/*
// @match http://worldoftanks.eu/community/accounts/*
// @include http://challenge.worldoftanks.ru/uc/accounts/*
// @include http://worldoftanks.com/uc/accounts/*
// @include http://worldoftanks.ru/uc/accounts/*
// @include http://worldoftanks.ru/community/accounts/*
// @include http://worldoftanks.com/community/accounts/*
// @include http://uc.worldoftanks.eu/uc/accounts/*
// @include http://worldoftanks.eu/uc/accounts/*
// @include http://worldoftanks.eu/community/accounts/*
// ==/UserScript==

var req;
var arMedal;
if(document.title.indexOf("Профиль игрока")>-1)
	main("ru"); 
else //if(document.title.indexOf("Player Profile")>-1)
	main("en");
function main(lang) {
   var daypassed = (new Date() - new Date(document.getElementsByClassName("b-data-create")[0].childNodes[1].getAttribute("data-timestamp")*1000))/1000/60/60/24;
	
   var timeDiv = document.getElementsByClassName("b-data-date")[0];
   var timeStamp = new Date(Number(timeDiv.childNodes[1].getAttribute("data-timestamp"))*1000);
   timeDiv.innerHTML +="<p/>"+(lang == "ru"?"версия <a href='http://forum.worldoftanks.ru/index.php?/topic/1450589-'>скрипта</a> ":" <a href='http://userscripts.org/scripts/show/135877'>script</a> version ")
		+"0.7.4.2HKC <p/> <font onclick='WriteStat();' style='cursor:pointer; color:white; text-decoration:underline'>"+((lang == "ru") ? "Сохранить текущую стату":"Save statistic")+"</font>";

   var dayArray = [];
   var old_b =0;
   var old_w =0;
   cr_erned = 0;
   xp_erned = 0;
   newBatles = 0;
 
   var daystat = getCookie("daystat");
   if (daystat == null)
	{
	   var needWrite = true; //надо ли уже записывать статистику
	}
   else	
	{
	   var tableDin = document.getElementsByClassName("t-table-dotted")[document.getElementsByClassName("t-table-dotted").length-1];
	   tableDin.insertRow(-1).insertCell(-1).innerHTML = ((lang == "ru") ? "новые бои":"new battles");

	   var strArray = daystat.split("/");
	   var str = strArray[0].split(";");
	   timeStat = new Date(str[0]);	
	   if (timeStamp - timeStat !=0||true)
	   {	
	  if (timeStat.toLocaleFormat)
	   oldTime = timeStat.toLocaleFormat("%d.%m.%Y %H:%M") 
	  else
	   oldTime =  timeStat.toLocaleString().substr(0, timeStat.toLocaleString().lastIndexOf(":"));

	   timeDiv.innerHTML += "<p/>"+((lang == "ru") ? " Сравнение с данными на ": "Compare with ") +  oldTime;
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
					c.innerHTML = ((lang == "ru") ? "кредитов за бой":"cr per battle");
					var c = r.insertCell(-1);
	
					c.innerHTML = (cr_erned/diff).toFixed();
					c.className = "td-number";

					var r = tableDin.insertRow(-1);
					var c = r.insertCell(-1);
					c.innerHTML = ((lang == "ru") ? "ср.опыт(вкл х2)":"avg xp (with x2)");
					var c = r.insertCell(-1);
					newBatles = diff;	
					c.innerHTML = (xp_erned/diff*20).toFixed();
					c.className = "td-number";

					}
				}
				else 
				if (newBatles)
			{
				if (j == 11 )
					{
					var r = tableDin.insertRow(-1);
					var c = r.insertCell(-1);
					c.innerHTML = ((lang == "ru") ? "Опыт за бой":"exp per battle");
					var c = r.insertCell(-1);
					c.innerHTML = (diff/newBatles).toFixed();
					c.className = "td-number";
					}

				else if (j == 7 )
					{
					var r = tableDin.insertRow(-1);
					var c = r.insertCell(-1);
					c.innerHTML = ((lang == "ru") ? "Повреждения за бой":"Daño por Batalla");;
					var c = r.insertCell(-1);
					c.innerHTML = (diff/newBatles).toFixed();
					c.className = "td-number";
					}

				else if (j == 9 )
					{
					var r = tableDin.insertRow(-1);
					var c = r.insertCell(-1);
					c.innerHTML = ((lang == "ru") ? "Фрагов за бой":"Destruidos por Batalla");
					var c = r.insertCell(-1);
					c.innerHTML = (diff/newBatles).toFixed(2);
					c.className = "td-number";
					}

				else if (j == 10 )
					{
					var r = tableDin.insertRow(-1);
					var c = r.insertCell(-1);
					c.innerHTML = ((lang == "ru") ? "Обнаружено за бой":"Detectados por Batalla");
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
		  tName = str[0].toLowerCase()
		  dayArray[tName] = new Object();
 		  dayArray[tName].b = toFl(str[1]);	
 		  dayArray[tName].w = toFl(str[2]);	
		}
	   }	
	}
 
    var server = document.location.host.match(/\.([^\.]+)$/)[1].toUpperCase();
    server = server == "COM"?"NAm" : server;	
    timeDiv.innerHTML += "<a href='http://td82.ru/wotka?nickname="+document.getElementsByTagName("h1")[0].innerHTML+"&server="+server+"'>"
	+ ((lang == "ru") ? "История кланов": "Historial de clanes (por cuales clanes paso y cuando/cuanto)")+"</a>";

 	                                     
	try {	
		
		document.getElementsByClassName("l-content")[0].style.width = "786px";
		document.getElementsByClassName("l-sidebar")[0].style.width = "144px"; 
	        document.getElementsByClassName("b-context-menu")[0].style.width = "144px";
	} catch (e) 
//	if (1==2)
	{	     
	                                     
	document.getElementsByClassName("l-content")[0].parentNode.innerHTML = 	document.getElementsByClassName("l-content")[0].parentNode.innerHTML.replace('"l-content"', '"l-content" style="width: 786px;"');   
	document.getElementsByClassName("l-sidebar")[0].parentNode.innerHTML = 	document.getElementsByClassName("l-sidebar")[0].parentNode.innerHTML.replace('"l-sidebar"', '"l-sidebar" style="width: 144px;"');   
	document.getElementsByClassName("b-context-menu")[0].parentNode.innerHTML = 	document.getElementsByClassName("b-context-menu")[0].parentNode.innerHTML.replace('"b-context-menu"', '"b-context-menu" style="width: 144px;"');   
	}
//	document.getElementsByClassName("l-sidebar")[0].style = "width: 144px;";


   var script = document.createElement("script");  
   script.type = "text/javascript";		
   script.textContent =  sortTd.toString();
   document.body.appendChild(script);

   var script = document.createElement("script");  
   script.type = "text/javascript";
   script.textContent =  toType.toString();
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

   var script = document.createElement("script");  
   script.type = "text/javascript";		
   script.textContent =  setCookie.toString();
   document.body.appendChild(script);
                          
   var needMedal = getCookie("medal");
      	div  = document.createElement("div"); 
	if (needMedal != 1)
		div.innerHTML = "<font onclick='setCookie(\"medal\",1);location.reload();' style='cursor:pointer; color:white; text-decoration:underline'>"+((lang == "ru") ? "Включить медали":"Ver Medallas")+"</font>";
	else
		div.innerHTML = "<font onclick='setCookie(\"medal\",0);location.reload();' style='cursor:pointer; color:white; text-decoration:underline'>"+((lang == "ru") ? "Выключить медали":"Ocultar Medallas")+"</font>";		


	ts = document.getElementsByClassName("t-statistic")[0]	
	ts.parentNode.insertBefore(div,ts)


		server = document.location.host.match(/\.([^\.]+)$/)[1];	
		url = "http://"+document.location.host+"/uc/accounts/"+document.location.href.match(/\/(\d+)/)[1]+"/api/1.3/?source_token=Intellect_Soft-WoT_Mobile-site";
		req = new XMLHttpRequest();
		req.onreadystatechange = function(e) {
				if (req.readyState == 4)if(req.status == 200)
				{
				eval("var resp ="+ req.responseText);
				arMedal = resp.data.achievements;//gbody.match(/"achievements": \{([^\}]*)\}/g)[0].split("{")[1].split(",")

				div  = document.createElement("div"); 
				ts = document.getElementsByClassName("t-statistic")[0]	
				ts.parentNode.insertBefore(div,ts)

				var MedalName = ["medalCarius",	"warrior",	"invader",	"sniper",	"defender",	"steelwall",	"supporter",	"scout",	"medalWittmann",	"medalOrlik",	"medalOskin",	"medalHalonen",	"medalBurda",	"medalBillotte",	"medalKolobanov",	"medalFadin",	"medalEkins",	"beasthunter",	"mousebane",	"tankExpert",	"maxPiercingSeries",	"medalKay",	"medalLeClerc",	"medalAbrams",	"medalPoppel",	"maxSniperSeries",	"maxInvincibleSeries",	"maxDiehardSeries",	"raider",	"maxKillingSeries",	"kamikaze",	"medalLavrinenko",	"lumberjack",	"medalKnispel"]								
				var MedalImg = ["",	"top_gun",	"invader",	"sniper",	"defender",	"steel_wall",	"confederate",	"scout",	"medal_belter",	"orlik",	"oskin",	"halonen",	"burda",	"billotte",	"kolobanov",	"fadin",	"",	"tank_hunter",	"mouse_trap",	"expert",	"master_gunner",	"",	"",	"",	"",	"sharpshooter",	"invincible",	"survivor",	"raider",	"reaper",	"kamikadze",	"",	"",	""]								
				var MedalTitle = ["",	"Воин",	"Захватчик",	"Снайпер",	"Защитник",	"Стальная стена",	"Поддержка",	"Разведчик",	"Бёльтер",	"Орлик",	"Оськин",	"Халонен",	"Бурда",	"Бийот",	"Колобанов",	"Фадин",	"",	"Зверобой",	"Гроза мышей",	"Эксперт",	"Бронебойщик",	"",	"",	"",	"",	"Стрелок",	"Неуязвимый",	"Живучий",	"Рейдер",	"Коса смерти",	"Камикадзе",	"",	"",	""]

				for (var i=0; i<MedalImg.length; i++)
					{
					mImg = MedalImg[i];
					if (mImg !=""&& mImg.substr(0,1)!="!")
						{
						styleImg = ""
						mc = arMedal[MedalName[i]]
						if (mc>0)
						{title = (lang == "ru") ?MedalTitle[i]: mImg ;
						if (MedalName[i] == "maxInvincibleSeries" && mc <5) styleImg ="style = 'opacity: 0.4;' " 							
						if (MedalName[i] == "maxDiehardSeries" && mc <20) styleImg ="style = 'opacity: 0.4;' " 							

						if (MedalName[i].indexOf("max")<0)
							title+=(lang=="ru"?". Раз в ":". once on ")+(all_b/mc).toFixed(1);
						else
							title+=(lang=="ru"?". Максимальная длина серии":". Max series length ")	
						div.innerHTML += "<div style='display: inline-block;position: relative;'><img "+styleImg+"width=50 height=50 src='http://worldoftanks.ru/dcont/fb/achievements/"+mImg+".png' alt='"+title+"' title='"+title+"'>"
						+(mc==1?"":"<font style='border: 1px solid #40312E;position:absolute;font-size: 10px;text-align: center; right: 1px;width:26px;top:35px;background-color: rgb(66, 15, 12);padding: 1px 0px;' title='"+"'>"+mc+"</font>")
						+"</div>";      //
		                                }
						}
					}
				if(lang=="ru")
				div.innerHTML += "<div><a href='http://worldoftanks.ru/game/guide/ru/general/achievements'>Описание достижений</a></div>"
				else
				div.innerHTML += "<div><a href='http://worldoftanks.eu/game/guide/es/general/achievements'> Descripción de Logros</a></div>"


        var rows = document.getElementsByClassName("t-statistic")[1].rows; 

//	nc = rows[0].insertCell(rows[0].cells.length);
//	nc.innerHTML = '<div onclick="sortTd(this, &quot;u&quot;)" style="cursor: pointer">damag</div>';
//	nc = rows[0].insertCell(rows[0].cells.length);
//	nc.innerHTML = '<div onclick="sortTd(this, &quot;u&quot;)" style="cursor: pointer">frags</div>';

	vehs = resp.data.vehicles;
	for (var i =1; i<rows.length; i++)	
	  {
		var t = rows[i].cells;
		if (t[1].tagName != "TH" && t[1].innerHTML!="")
			{
			imgName = t[1].getElementsByTagName('img')[0].src.match(/\/[^-]+-([^\/]*)\.png/)[1];
			for (j =0; j<vehs.length; j++)
			{
				if(vehs[j].name.toLowerCase() == imgName)
				{
				veh= vehs[j];
				break;	
				}	
			}
			if (t[0].innerHTML == "undefined" ) t[0].innerHTML = toType(veh.class);
//			ncell = rows[i].insertCell(t.length);
//			ncell.innerHTML = ""+(veh.damageDealt/veh.battle_count).toFixed();
//			ncell = rows[i].insertCell(t.length);
//			ncell.innerHTML = ""+(veh.frags/veh.battle_count).toFixed(2)+"";
//			ncell.title = veh.battle_count;
			}

	  }




				}
						};                                                                               
		req.open("GET", url, true);
		req.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2000 00:00:00 GMT");
		try {
		if (needMedal == 1) req.send(null);
		} catch (e){}


var atype = [];
//atype[1] = [];
atype[1] = //'lt',
[
't2_lt',
'tetrarch_ll',
'renaultft',
'd1',
'hotchkiss_h35',
'amx38',
'amx40',
'amx_12t',
'amx_13_75',
'amx_13_90',
'm22_locust',
'pzii_j',
'm24_chaffee',
't-50',
't_50_2',
'vk2801',
't-15',
'ms-1',
'ltraktor',                	
't1_cunningham',
't-26',
'bt-2',
'pzii',
'pz35t',
'm2_lt',
't-46',
'bt-7',
'pziii_a',
'pzii_luchs',
'pz38t',
'm3_stuart',
'a-20',
'vk1602',
'pz38_na',
'm5_stuart',
'm3_stuart_ll',
'bt-sv',
't-127',
'valentine_ll',
'h39_captured',
'a-32'
]
atype[2] = //'mt',
[
't-25',
'd2',
'bat_chatillon25t',
'lorraine40t',
'sherman_jumbo',
'ch01_type59',
's35_captured',
'pzv_pziv',
'pzv_pziv_ausf_alfa',
'mtls-1g14',
'm4a2e4',
'ram-ii',
'matilda_ii_ll',
't2_med',
'm2_med',
't-28',
'pziii',
'm3_grant',
't-34',
'pziv',
'pziii_iv',
'm4_sherman',
'm7_med',
't-34-85',
'vk3601h',
'vk3001h',
'vk3001p',
'm4a3e8_sherman',
't26_e4_superpershing',
't-43',
'kv-13',
'vk3002db',
'pzv',
't20',
't-44',
'panther_ii',
't23',
'pershing',
't-54',
'e-50',
'pziv_hydro',
't23',
'm46_patton']
atype[3] = //'ht',
[
'b1',
'bdr_g1b',
'arl_44',
'amx_m4_1945',
'amx_50_100',
'amx_50_120',
'f10_amx_50b',
'lowe',
'kv-220_action',
'kv-220',
'kv-5',
'b-1bis_captured',
'churchill_ll',
't14',
'm6a2e1',
'kv',
'kv1',
'kv2',
'kv4',
'is8',
'object252',
'st_i',
't150',
't1_hvy',
'kv-3',
'kv-1s',
'm6',
'is',
'pzvi',
'pzvi_tiger_p',
't29',
'is-3',
'pzvib_tiger_ii',
'vk4502a',
't32',
'is-4',
'vk4502p',
'e-75',
't34_hvy',
'm103',
't110',
'is-7',
'maus',
'e-100']
atype[4] = //'sp',
['su-18',
'bison_i',
't57',
'_105_lefh18b2',
'su-26',
'wespe',
'sturmpanzer_ii',
'm37',
'su-5',
'grille',
'm7_priest',
'su-8',
'hummel',
'm41',
'su-14',
's-51',
'g_panther',
'm12',
'object_212',
'g_tiger',
'm40m43',
'object_261',
'g_e',
'renaultbs',
'lorraine39_l_am',
'amx_105am',
'amx_13f3am',
'bat_chatillon155',
'lorraine155_50',
'lorraine155_51',
't92']
atype[5] = //at
['at-1',
'panzerjager_i',
't18',
'su-76',
'g20_marder_ii',
't82',
'fcm_36pak40',
'm8a1',
't49',
'gaz-74b',
'hetzer',
't40',
'su-85',
'su_85i',
'stugiii',
'm10_wolverine',
'su-100',
'jagdpziv',
'm36_slagger',
'm18_hellcat',
'su-152',
'jagdpanther',
't25_at',
't25_2',
'isu-152',
'ferdinand',
't28',
't28_prototype',
'object_704',
'jagdtiger',
'jagdtiger_sdkfz_185',
't95',
'dickermax',
'renaultft_ac',
'renaultue57',
'somua_sau_40',
's_35ca',
'arl_v39',
'amx_ac_mle1946',
'amx_ac_mle1948',
'amx50_foch',
't30']

prem = [
'tetrarch_ll',
'm3_stuart_ll',
'bt-sv',
't-127',
'valentine_ll',
'a-32',
'churchill_ll',
'matilda_ii_ll',
'kv-220_action',
'kv-220',
'kv-5',
'object252',
't26_e4_superpershing',
'jagdtiger_sdkfz_185',
't34_hvy',
'h39_captured',
'pzii_j',
's35_captured',
't-15',
'b-1bis_captured',
't-25',
'pzv_pziv',
'pzv_pziv_ausf_alfa',
'lowe',
't2_lt',
'mtls-1g14',
'm22_locust',
'm4a2e4',
'ram-ii',
't14',
'm6a2e1',
'su_85i',
'pziv_hydro',
'_105_lefh18b2',
'fcm_36pak40',
'dickermax',
'ch01_type59']

//http://dl.dropbox.com/u/2984537/wot/stats/json
//var tanks =["мс-1",	"leichttraktor",	"t1 cunningham",	"т-26",	"бт-2",	"pzkpfw ii",	"pzkpfw 35 (t)",	"m2 light tank",	"т-46",	"бт-7",	"pzkpfw iii ausf. a",	"pzkpfw ii luchs",	"pzkpfw 38 (t)",	"m3 stuart",	"а-20",	"vk 1602 leopard",	"pzkpfw 38 na",	"m5 stuart",	"t2 medium tank",	"m2 medium tank",	"т-28",	"pzkpfw iii",	"m3 lee",	"t-34",	"pzkpfw iv",	"pzkpfw iii/iv",	"m4 sherman",	"m7",	"т-34-85",	"vk 3601 (h)",	"vk 3001 (h)",	"vk 3001 (p)",	"m4a3e8 sherman",	"т-43",	"кв-13",	"vk 3002 (db)",	"pzkpfw v panther",	"t20",	"т-44",	"panther ii",	"m26 pershing",	"т-54",	"e-50",	"m46 patton",	"кв",	"t1 heavy",	"кв-3",	"кв-1с",	"m6",	"ис",	"pzkpfw vi tiger",	"pzkpfw vi tiger (p)",	"t29",	"ис-3",	"pzkpfw vib tiger ii",	"vk 4502 (p) ausf. a",	"t32",	"ис-4",	"vk 4502 (p) ausf. b",	"e-75",	"t34",	"ис-7",	"maus",	"e-100",	"t30",	"су-18",	"sturmpanzer i bison",	"t57",	"су-26",	"wespe",	"sturmpanzer ii",	"m37",	"су-5",	"grille",	"m7 priest",	"су-8",	"hummel",	"m41",	"су-14",	"с-51",	"gw panther",	"m12",	"объект 212",	"gw tiger",	"m40/m43",	"объект 261",	"gw typ e",	"t92",	"ат-1",	"panzerjäger i",	"t18",	"су-76",	"marder ii",	"t82",	"су-85б",	"hetzer",	"t40",	"су-85",	"stug iii",	"m10 wolverine",	"су-100",	"jagdpz iv",	"m36 slugger",	"су-152",	"jagdpanther",	"t25 at",	"ису-152",	"ferdinand",	"t28",	"объект 704",	"jagdtiger",	"t95",	"m3 stuart",	"т-127",	"valentine",	"а-32",	"churchill",	"matilda",	"кв-220",	"кв-5",	"pzkpfw 38h735 (f)",	"pzkpfw s35 739 (f)",	"t-15",	"pzkpfw b2 740 (f)",	"t-25",	"pzkpfw v-iv",	"pzkpfw v-iv alpha",	"löwe",	"t2 lt",	"m22 locust",	"m4a2e4",	"ram-ii",	"t-14",	"m6a2e1"];
//var tanks =["kv",	"t-34-85",	"is",	"is-3",	"t-34",	"t-44",	"is-4",	"kv-3",	"t-43",	"pziv",	"t-54",	"pzvi",	"su-85",	"pzvib_tiger_ii",	"su-100",	"hummel",	"vk3601h",	"t-28",	"su-152",	"a-20",	"su-8",	"t29",	"lowe",	"bt-2",	"stugiii",	"isu-152",	"su-5",	"is-7",	"object_212",	"g_panther",	"su-26",	"vk1602",	"s-51",	"pziii",	"su-14",	"jagdpanther",	"jagdpziv",	"t-46",	"bt-7",	"grille",	"object_704",	"t1_hvy",	"vk3001p",	"ferdinand",	"t32",	"vk4502p",	"m4a3e8_sherman",	"hetzer",	"ms-1",	"m6",	"gaz-74b",	"panther_ii",	"vk3002db",	"t-26",	"g_tiger",	"kv-1s",	"m41",	"m3_grant",	"t34_hvy",	"t20",	"vk3001h",	"pziii_a",	"pzii",	"at-1",	"e-50",	"pziii_iv",	"su-76",	"ltraktor",	"m7_priest",	"m4_sherman",	"pershing",	"su-18",	"pz35t",	"t57",	"t30",	"maus",	"g20_marder_ii",	"jagdtiger",	"e-75",	"m2_med",	"kv-13",	"m37",	"m12",	"pzii_luchs",	"m46_patton",	"kv-5",	"m40m43",	"wespe",	"sturmpanzer_ii",	"m2_lt",	"m7_med",	"t2_lt",	"m36_slagger",	"m10_wolverine",	"object_261",	"pz38t",	"pzv",	"t1_cunningham",	"m5_stuart",	"t40",	"bison_i",	"t2_med",	"t-50",	"t25_at",	"panzerjager_i",	"m3_stuart",	"pzvi_tiger_p",	"h39_captured",	"m3_stuart_ll",	"churchill_ll",	"t14",	"pz38_na",	"g_e",	"matilda_ii_ll",	"e-100",	"t28",	"ram-ii",	"m6a2e1",	"ch01_type59",	"t82",	"t92",	"kv-220",	"t95",	"t18",	"vk4502a",	"t_50_2",	"vk2801",	"t-25",	"valentine_ll",	"b-1bis_captured",	"m4a2e4",	"a-32",	"pzv_pziv",	"s35_captured",	"sherman_jumbo",	"m22_locust",	"m24_chaffee",	"t-127",	"t-15",	"pzv_pziv_ausf_alfa",	"bt-sv",	"pzii_j",	"mtls-1g14"];
//var medp =[49.77,	49.26,	49.09,	47.33,	48.3,	49.28,	48.91,	50.76,	48.42,	47.23,	48.53,	49.7,	49.12,	50.03,	47.21,	51.66,	48.43,	48.8,	47.51,	49.52,	48.08,	48.07,	47.83,	47.59,	50.08,	47.32,	49.97,	47.26,	49.12,	51.42,	50.76,	49.06,	50.31,	49.95,	49.38,	50.42,	51.16,	51.68,	49.85,	52.89,	53.38,	48.89,	50.17,	51.79,	48.79,	46.62,	46.81,	45.99,	46.47,	46.69,	46.34,	48.46,	48.76,	47.04,	49.12,	49.2,	49.7,	47.7,	47.7,	50.88,	46.72,	50.58,	52.11,	54.93,	52.4,	47.57,	48.08,	49.96,	49.92,	48.09,	48.36,	47.76,	49.12,	48.92,	47.69,	49.46,	49.02,	49.48,	48.36,	48.19,	49.78,	49.32,	49.67,	48.26,	50.98,	49.66,	51.15,	49.11,	50.86,	50.72,	52.68,	49.02,	53.23,	51.63,	48.58,	48.67,	50.99,	50.05,	48.97,	50.26,	51.01,	49.36,	51.6,	50.55,	51.87,	53.52,	52.98,	54.19,	54.39,	50.65,	49.64,	51.68,	48.27,	52.97,	50.18,	54.37,	44.76,	49.45,	48.56,	46.32,	53.93,	56.39,	53.89,	48.19,	50.53,	51.17,	50.2,	47.36,	54.02,	54.24,	48.06,	51.63,	44.64,	49.7];
//var medp =[49.2,	49.73,	47.42,	46.92,	48.65,	50.25,	47.09,	47.05,	50.15,	50.31,	51.17,	46.43,	50.7,	48.17,	51.64,	49.62,	51.74,	48.85,	50.84,	47.71,	49.44,	49.66,	47.81,	50.06,	50.05,	53,	48.91,	51.42,	50.17,	49.46,	51.07,	52,	48.42,	49.2,	49.07,	51.52,	49.97,	48.71,	47.6,	49.45,	52.65,	47.31,	49.14,	53.88,	50.43,	46.62,	50.82,	49.1,	50.85,	46.42,	49.32,	51.65,	51.52,	49.07,	48.34,	46.23,	49.92,	48.55,	46.06,	52.01,	50.41,	48.58,	50.26,	53.33,	51.16,	48.34,	49.62,	49.67,	48.51,	50.78,	52.9,	47.76,	50.25,	51.77,	53.52,	52.9,	54.39,	50.83,	50.11,	50.26,	50.2,	48.52,	48.91,	50.26,	53.49,	47.85,	51.62,	48.45,	49.08,	53.06,	48.22,	54.94,	52.24,	51.13,	50.13,	49.29,	52.08,	49.35,	49.37,	51.94,	49.35,	49.35,	52.83,	53.91,	54.16,	50.66,	49.88,	59.43,	48.77,	45.88,	46.04,	49.55,	51.38,	50.39,	53.29,	53.33,	52.49,	47.58,	55.01,	52.67,	49.68,	45.39,	52.68,	55.51,	49.64,	55.83,	53.52,	52.6,	50.8,	50.96,	49.02,	52.85,	51.11,	56.37,	54.16,	55.35,	56.32,	56.17,	55.51,	51.3,	50,	0,	0];
//var tankS =["t-127",	"g20_marder_ii",	"s35_captured",	"b-1bis_captured",	"t18",	"valentine_ll",	"ms-1",	"at-1",	"panzerjager_i",	"pzv_pziv",	"t2_lt",	"t-15",	"t57",	"h39_captured",	"m2_lt",	"m22_locust",	"t-26",	"pz35t",	"kv-220",	"pzii",	"bt-2",	"su-26",	"t82",	"kv-220_test",	"matilda_ii_ll",	"pzv_pziv_ausf_alfa",	"t1_cunningham",	"a-32",	"m24_chaffee",	"ltraktor",	"t_50_2",	"pershing",	"m3_stuart_ll",	"jagdpanther",	"t40",	"ch01_type59",	"pzii_luchs",	"sherman_jumbo",	"t25_at",	"t-25",	"ram-ii",	"vk3601h",	"su-85",	"pziv",	"kv",	"su-76",	"t2_med",	"gaz-74b",	"t-50",	"t20",	"m2_med",	"m3_stuart",	"su-152",	"pzv",	"vk2801",	"stugiii",	"panther_ii",	"m36_slagger",	"bison_i",	"grille",	"pz38t",	"t-28",	"su-100",	"m4_sherman",	"t-46",	"vk3001h",	"su-8",	"t-44",	"vk1602",	"object_704",	"su-18",	"m4a3e8_sherman",	"m10_wolverine",	"kv-13",	"hetzer",	"t29",	"t-34-85",	"vk3001p",	"vk3002db",	"kv-3",	"pziii_a",	"t-43",	"jagdpziv",	"m41",	"m4a2e4",	"t-34",	"pziii",	"hummel",	"m5_stuart",	"t95",	"g_panther",	"su-5",	"wespe",	"pzvi_tiger_p",	"m3_grant",	"is-4",	"m37",	"pz38_na",	"su-14",	"t23",	"t32",	"m12",	"s-51",	"maus",	"m40m43",	"sturmpanzer_ii",	"object_212",	"e-75",	"pziii_iv",	"ferdinand",	"bt-7",	"m6a2e1",	"jagdtiger",	"m7_priest",	"is-3",	"m46_patton",	"t1_hvy",	"e-50",	"a-20",	"t28",	"g_tiger",	"vk4502a",	"m7_med",	"kv-1s",	"is-7",	"pzvib_tiger_ii",	"lowe",	"m6",	"pzvi",	"e-100",	"t-54",	"is",	"kv-5",	"vk4502p",	"isu-152",	"t30",	"churchill_ll",	"t14",	"g_e",	"t92",	"object_261",	"t34_hvy"]
//var medP =[61.04,	57.54,	56.7,	56.59,	56.35,	56.13,	55.4,	55.31,	54.88,	54.87,	54.63,	54.59,	54.57,	54.53,	54.27,	54.06,	54.03,	53.96,	53.57,	53.44,	53.4,	53.4,	53.09,	53.09,	52.94,	52.94,	52.77,	52.76,	52.68,	52.57,	52.25,	52.13,	52.06,	52.05,	51.97,	51.97,	51.87,	51.83,	51.83,	51.78,	51.75,	51.74,	51.56,	51.55,	51.5,	51.5,	51.45,	51.44,	51.38,	51.35,	51.31,	51.29,	51.22,	51.11,	51.1,	51.07,	51.06,	51.03,	50.95,	50.93,	50.89,	50.79,	50.65,	50.62,	50.61,	50.35,	50.32,	50.3,	50.24,	50.22,	50.16,	50.13,	50.01,	49.98,	49.98,	49.84,	49.83,	49.79,	49.77,	49.77,	49.75,	49.73,	49.69,	49.66,	49.65,	49.64,	49.59,	49.56,	49.49,	49.4,	49.32,	49.28,	49.27,	49.17,	49.15,	49.07,	49.04,	49.02,	49.01,	48.96,	48.92,	48.87,	48.86,	48.8,	48.77,	48.7,	48.66,	48.57,	48.5,	48.41,	48.36,	48.31,	48.26,	48.17,	48.16,	48.15,	47.96,	47.79,	47.75,	47.7,	47.69,	47.56,	47.47,	47.47,	47.46,	47.35,	47.35,	47.22,	47.17,	47.14,	47.13,	47.01,	46.85,	46.8,	46.57,	46.47,	46.4,	46.35,	46.33,	46.31,	46.13,	45.13]
var tankS =[	"g20_marder_ii",	"t-127",	"lorraine40t",	"s35_captured",	"ms-1",	"t-26",	"a-32",	"su-26",	"at-1",	"t2_lt",	"bat_chatillon25t",	"panzerjager_i",	"bt-2",	"t18",	"t-15",	"t82",	"b-1bis_captured",	"pz35t",	"m2_lt",	"valentine_ll",	"m22_locust",	"amx_13_90",	"t40",	"amx_13_75",	"kv-220",	"h39_captured",	"m24_chaffee",	"gaz-74b",	"t-28",	"pzii",	"matilda_ii_ll",	"pzii_luchs",	"pershing",	"su-76",	"t57",	"kv",	"ltraktor",	"t25_at",	"jagdpanther",	"ram-ii",	"sherman_jumbo",	"vk3601h",	"t_50_2",	"tetrarch_ll",	"t20",	"su-85",	"t-50",	"t1_cunningham",	"pziv",	"t-25",	"pz38t",	"ch01_type59",	"grille",	"su-152",	"pzv",	"panther_ii",	"hetzer",	"pziii",	"m3_stuart",	"m36_slagger",	"m2_med",	"vk2801",	"t2_med",	"amx_50_100",	"stugiii",	"su-100",	"su-8",	"t-44",	"m4_sherman",	"vk3001h",	"m4a3e8_sherman",	"m10_wolverine",	"vk1602",	"bison_i",	"f10_amx_50b",	"object_704",	"kv-13",	"t29",	"hotchkiss_h35",	"t-46",	"m3_grant",	"m41",	"pziii_a",	"d2",	"m5_stuart",	"t-34-85",	"su-5",	"amx_50_120",	"amx_12t",	"t-43",	"kv-3",	"renaultft",	"m4a2e4",	"vk3001p",	"jagdpziv",	"amx40",	"vk3002db",	"amx38",	"hummel",	"t-34",	"g_panther",	"m3_stuart_ll",	"is-4",	"sturmpanzer_ii",	"pzv_pziv",	"m37",	"pz38_na",	"wespe",	"pzvi_tiger_p",	"m40m43",	"t32",	"t95",	"su-14",	"arl_44",	"s-51",	"maus",	"object_212",	"m12",	"m7_priest",	"e-75",	"is-3",	"su-18",	"jagdtiger",	"pziii_iv",	"churchill_ll",	"ferdinand",	"m46_patton",	"a-20",	"bt-7",	"t1_hvy",	"d1",	"t28",	"g_tiger",	"amx_m4_1945",	"e-50",	"is-7",	"vk4502a",	"m7_med",	"t14",	"kv-1s",	"e-100",	"m6a2e1",	"pzvi",	"pzvib_tiger_ii",	"lowe",	"is",	"m6",	"t-54",	"isu-152",	"g_e",	"kv-5",	"bdr_g1b",	"vk4502p",	"t30",	"object_261",	"b1",	"t92",	"t34_hvy"]
var medP =[	59.35,	56.95,	56.85,	56.32,	56.26,	55.38,	55.27,	54.76,	54.71,	54.61,	54.52,	54.5,	54.15,	54.12,	53.98,	53.89,	53.87,	53.71,	53.58,	53.53,	53.43,	53.4,	53.31,	52.81,	52.77,	52.77,	52.75,	52.75,	52.6,	52.54,	52.46,	52.42,	52.33,	52.21,	52.2,	52.17,	52.12,	52.11,	52.06,	52.02,	52.01,	51.97,	51.95,	51.88,	51.77,	51.75,	51.72,	51.7,	51.68,	51.67,	51.66,	51.65,	51.45,	51.44,	51.39,	51.35,	51.34,	51.09,	51.05,	51.04,	50.81,	50.78,	50.77,	50.77,	50.71,	50.71,	50.7,	50.63,	50.52,	50.51,	50.48,	50.48,	50.42,	50.42,	50.39,	50.33,	50.26,	50.21,	50.19,	50.19,	50.18,	50.17,	50.14,	50.08,	50.04,	50.03,	50.03,	50.02,	50.01,	49.96,	49.95,	49.93,	49.91,	49.89,	49.89,	49.88,	49.84,	49.82,	49.8,	49.72,	49.56,	49.55,	49.52,	49.49,	49.48,	49.43,	49.42,	49.32,	49.3,	49.18,	49.1,	49.07,	49.04,	49.01,	49.01,	49,	48.98,	48.91,	48.65,	48.6,	48.55,	48.51,	48.49,	48.46,	48.42,	48.4,	48.35,	48.3,	48.28,	48.2,	48.06,	47.89,	47.85,	47.84,	47.83,	47.76,	47.56,	47.53,	47.49,	47.47,	47.43,	47.39,	47.33,	47.32,	47.3,	47.25,	47.2,	47.1,	47.06,	46.94,	46.94,	46.85,	46.79,	46.74,	46.44,	46.24,	46.13,	45.4]

var tankS =["ms-1","ltraktor","t1_cunningham","renaultft","bt-2","t-26","pz35t","pzii","m2_lt","hotchkiss_h35","d1","bt-7","t-46","pz38t","pziii_a","pzii_luchs","m3_stuart","amx38","a-20","t-50","vk1602","pz38_na","m5_stuart","amx40","t_50_2","vk2801","m24_chaffee","amx_12t","amx_13_75","amx_13_90","t2_med","m2_med","d2","t-28","pziii","m3_grant","t-34","pziv","pziii_iv","m4_sherman","m7_med","t-34-85","vk3601h","vk3001h","vk3001p","m4a3e8_sherman","sherman_jumbo","t-43","kv-13","pzv","vk3002db","t20","t-44","panther_ii","pershing","lorraine40t","t-54","e-50","m46_patton","bat_chatillon25t","b1","kv","t1_hvy","bdr_g1b","kv-1s","kv-3","m6","arl_44","is","pzvi","pzvi_tiger_p","t29","amx_m4_1945","is-3","pzvib_tiger_ii","vk4502a","t32","amx_50_100","is-4","vk4502p","e-75","t34_hvy","amx_50_120","is-7","maus","e-100","t30","f10_amx_50b","su-18","bison_i","t57","su-26","sturmpanzer_ii","wespe","m37","su-5","grille","m7_priest","su-8","hummel","m41","su-14","s-51","g_panther","m12","object_212","g_tiger","m40m43","object_261","g_e","t92","at-1","panzerjager_i","t18","su-76","g20_marder_ii","t82","gaz-74b","hetzer","t40","su-85","stugiii","m10_wolverine","su-100","jagdpziv","m36_slagger","su-152","jagdpanther","t25_at","isu-152","ferdinand","t28","object_704","jagdtiger","t95","tetrarch_ll","m3_stuart_ll","t-127","valentine_ll","a-32","kv-220","matilda_ii_ll","churchill_ll","kv-220_action","kv-5","h39_captured","s35_captured","t-15","b-1bis_captured","t-25","pzv_pziv","lowe","t2_lt","m22_locust","t14","ram-ii","m4a2e4","m6a2e1","ch01_type59"]
var medP = [56.67,53.53,52.24,51.29,54.68,55.78,54.89,53.22,54.33,50.61,48.95,48.86,50.49,52.28,51.36,53.45,52.15,50.44,48.11,52.21,50.58,49.68,50.29,49.3,52.53,51.32,53.44,49.87,52.25,52.56,51.76,51.48,50.85,52.41,53.05,49.83,50.47,52.41,49.06,51.26,48.17,50.48,52.54,51.02,50.33,50.95,52.33,50.32,50.8,51.89,50.38,52.24,51.16,51.84,52.76,55.77,47.32,48.12,48.73,53.34,45.72,52.57,48.49,47.2,47.9,50.71,47.55,48.48,47.7,47.64,49.83,51.02,47.53,48.44,47.39,48.05,49.69,50.32,49.77,47.25,48.92,45.36,50.77,47.71,49.24,47.46,46.96,49.86,49.36,51.24,54.23,55.6,49.34,49.41,49.56,50.28,51.68,48.76,51.05,50.14,50.57,49.15,49.11,49.85,49.17,49.06,47.92,49.47,46.86,47.23,46.32,55.81,55.43,55.77,53.03,60.34,55.43,53.19,51.13,53.45,52.39,51.33,51.15,51.17,50.52,51.48,51.88,52.43,52.62,47.03,48.53,47.85,50.02,48.69,48.76,53.81,51.3,59.69,55.04,55.76,53.37,52.96,48.73,50.1,47.03,54.2,57.2,55.68,55.38,52.11,50.62,47.35,56.26,55.79,47.49,52.54,49.8,48.3,52.58]
var unrealDate = "29.01.12 - 12.02.12"

tankS = ["ms-1","ltraktor","t1_cunningham","renaultft","bt-2","t-26","pz35t","pzii","m2_lt","hotchkiss_h35","d1","bt-7","t-46","pz38t","pziii_a","pzii_luchs","m3_stuart","amx38","a-20","t-50","vk1602","pz38_na","m5_stuart","amx40","t_50_2","vk2801","m24_chaffee","amx_12t","amx_13_75","amx_13_90","t2_med","m2_med","d2","t-28","pziii","m3_grant","t-34","pziv","pziii_iv","m4_sherman","m7_med","t-34-85","vk3601h","vk3001h","vk3001p","m4a3e8_sherman","sherman_jumbo","t-43","kv-13","pzv","vk3002db","t20","t-44","panther_ii","pershing","lorraine40t","t-54","e-50","m46_patton","bat_chatillon25t","b1","kv","t1_hvy","bdr_g1b","kv-1s","kv-3","m6","arl_44","is","pzvi","pzvi_tiger_p","t29","amx_m4_1945","is-3","pzvib_tiger_ii","vk4502a","t32","amx_50_100","is-4","vk4502p","e-75","m103","amx_50_120","is-7","maus","e-100","t110","f10_amx_50b","su-18","bison_i","t57","su-26","sturmpanzer_ii","wespe","m37","su-5","grille","m7_priest","su-8","hummel","m41","su-14","s-51","g_panther","m12","object_212","g_tiger","m40m43","object_261","g_e","t92","at-1","panzerjager_i","t18","su-76","g20_marder_ii","t82","gaz-74b","hetzer","t40","m8a1","su-85","stugiii","m10_wolverine","t49","su-100","jagdpziv","m36_slagger","m18_hellcat","su-152","jagdpanther","t25_at","t25_2","isu-152","ferdinand","t28","t28_prototype","object_704","jagdtiger","t95","t30","tetrarch_ll","m3_stuart_ll","t-127","valentine_ll","a-32","kv-220","matilda_ii_ll","churchill_ll","kv-220_action","kv-5","h39_captured","s35_captured","t-15","b-1bis_captured","t-25","pzv_pziv","lowe","t2_lt","m22_locust","t14","ram-ii","m4a2e4","m6a2e1","t34_hvy","fcm_36pak40","_105_lefh18b2","ch01_type59"]
medP = [56.26,53,51.99,52.06,53.88,54.96,54.34,52.8,53.41,51.23,48.66,48.77,50.51,52.57,49.98,52.93,51.49,49.82,48.32,52.6,50.95,49.98,50.47,49.01,53.01,52.01,53.74,49.2,50.86,50.48,50.36,50.64,50.79,52.39,51.82,49.3,50.62,52.43,48.94,51.13,48.25,50.83,52.67,51.34,50.68,51.12,52.16,50.46,50.98,51.66,50.14,52.72,51.62,51.86,53.24,52.48,48.01,49,49.79,49.76,45.72,52.5,48.12,47.63,48.68,50.14,47.21,47.88,48.28,47.83,49.82,50.12,47.53,48.14,47.29,47.74,48.07,48.71,47.89,47.07,48.58,48.68,48.22,46.23,47.38,46.25,50.19,44.67,49.81,50.16,53.7,55.69,49.21,49.64,49.42,50.34,51.29,49.09,50.83,49.94,50.32,49.17,49,49.72,49.25,48.96,47.91,49.57,47.04,47.27,46.66,55.12,55.11,53.98,52.83,59.73,52.08,52.86,50.87,52.69,51.06,52.8,51.11,50.97,50.12,51.57,50.11,51.3,52,51.41,52.06,52.38,53.04,47.19,48.47,47.95,48.37,50.65,48.82,49.55,50.56,54.38,51.8,58.93,55.2,54.35,54.91,52.68,49.28,52.08,47.38,53.36,56.69,54.73,55.74,51.75,50.43,47.89,54.41,54.75,48.4,51.44,50.37,47.88,49.12,54.15,49.33,53.33]
unrealDate = "30.03.12 - 08.04.12"

tankS = ["ms-1","ltraktor","t1_cunningham","renaultft","bt-2","t-26","pz35t","pzii","m2_lt","hotchkiss_h35","d1","bt-7","t-46","pz38t","pziii_a","pzii_luchs","m3_stuart","amx38","a-20","t-50","vk1602","pz38_na","m5_stuart","amx40","t_50_2","vk2801","m24_chaffee","amx_12t","amx_13_75","amx_13_90","t2_med","m2_med","d2","t-28","pziii","m3_grant","t-34","pziv","pziii_iv","m4_sherman","m7_med","t-34-85","vk3601h","vk3001h","vk3001p","m4a3e8_sherman","sherman_jumbo","t-43","kv-13","pzv","vk3002db","t20","t-44","panther_ii","pershing","lorraine40t","t-54","e-50","m46_patton","bat_chatillon25t","b1","kv1","t1_hvy","bdr_g1b","kv-1s","t150","kv2","m6","arl_44","is","pzvi","pzvi_tiger_p","t29","amx_m4_1945","is-3","kv4","pzvib_tiger_ii","vk4502a","t32","amx_50_100","is8","vk4502p","e-75","m103","amx_50_120","is-7","maus","e-100","t110","f10_amx_50b","su-18","bison_i","t57","su-26","sturmpanzer_ii","wespe","m37","su-5","grille","m7_priest","su-8","hummel","m41","su-14","s-51","g_panther","m12","object_212","g_tiger","m40m43","object_261","g_e","t92","at-1","panzerjager_i","t18","su-76","g20_marder_ii","t82","gaz-74b","hetzer","t40","m8a1","su-85","stugiii","m10_wolverine","t49","su-100","jagdpziv","m36_slagger","m18_hellcat","su-152","jagdpanther","t25_at","t25_2","isu-152","ferdinand","t28","t28_prototype","object_704","jagdtiger","t95","t30","tetrarch_ll","m3_stuart_ll","t-127","valentine_ll","a-32","kv-220","matilda_ii_ll","churchill_ll","kv-220_action","kv-5","h39_captured","s35_captured","t-15","b-1bis_captured","t-25","pzv_pziv","lowe","t2_lt","m22_locust","t14","ram-ii","m4a2e4","m6a2e1","t34_hvy","fcm_36pak40","_105_lefh18b2","ch01_type59"]

medP = [56.26,53.85,52.05,51.42,53.89,54.89,54.45,52.94,53.54,51.33,49.95,49.07,50.22,51.96,50.89,53.6,52.53,50.51,48.55,52.51,50.63,49.89,50.74,49.38,52.85,51.61,53.39,49.46,50.48,50.31,50.32,51.65,51.46,51.96,52.33,49.66,50.48,52.63,49.33,51.11,48.22,51.24,52.73,50.71,50.28,51.16,52.61,49.7,50.6,51.4,49.16,52.67,50.63,51,52.73,51.74,48.15,49.16,49.72,49.86,47.2,49.53,48.59,48.04,49.49,47.3,49.46,48.23,48.72,48.8,48.66,50.24,51.13,48.32,48.87,46.17,47.93,48.81,49.24,49.85,47.9,47.78,49.07,49.92,48.84,46.89,48.22,46.85,50.68,46.01,50.25,50.79,53.63,56.1,48.61,49.72,49.55,50.22,51.59,49.06,50.89,49.79,50.36,49.22,49.12,49.71,49.27,49.01,47.8,49.55,47.34,47.61,47.18,54.58,55.51,53.93,52.97,60.51,54.08,53.14,50.6,53.28,51.49,53.33,51.61,51.26,51.04,51.25,50.05,51.4,52.42,51.12,51.92,52.3,51.64,47.87,49.02,48.31,48.72,50.85,49.01,49.61,50.79,54.42,50.03,58.89,54.93,54.38,55.66,52.24,49.58,50.54,48.25,53.82,57.84,56.89,57.74,52.24,51.2,48.54,54.59,54.24,48.81,52.41,50.89,48.52,49.7,56.32,49.96,52.74]
unrealDate = "29.04.12 - 04.05.12"


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
	var fr_b = 0;
	var fr_w = 0;


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

//	yd[yd.length-2].style = 'cursor: pointer';
	trth.innerHTML = "<th>"+(lang == "ru"?"Уровень":"Level")
//	        +"<div> с <input type=text width=3 name='battlefrom'></div>"
		+"</th>"+trth.innerHTML.replace(2,1);
	
	trth.appendChild(th);

	

	var th = document.createElement('th');
	th.className = "right";
	th.innerHTML = (lang == "ru") ? "%-ср%" : "%-avg%"
	th.title = (lang == "ru") ? "Неофициальный среднесерверный процент побед за "+unrealDate:
			"unofficial % on ru server "+unrealDate;
	trth.appendChild(th);
	trth.innerHTML = trth.innerHTML.replace(/<th>/gm,"<th><div onclick='sortTd(this,0)' style = 'cursor: pointer'>")
	trth.innerHTML = trth.innerHTML.replace(/<th class="right"/gm,'<th class="right"><div onclick="sortTd(this,0)" style = "cursor: pointer"');
	trth.innerHTML = trth.innerHTML.replace(/<\/th>/gm,'</div></th>')
var nsel = '<select name="Nation" onchange="hideTypes(this);" style="height:15px;font-size:8px;background-color:rgb(5, 7, 9) ; color: rgb(143, 147, 147)">';
nsel +="<option value =0>"+((lang == "ru")?"Нация":"Nation")+"</option>";
for (var j = 1; j<6; j++)
{
	nsel += "<option value="+j+">"+toNat(j)+"</option>";
}
nsel +="</select>"	
	trth.cells[0].innerHTML += nsel;
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


			if( yd[i].className.indexOf("js-france td-armory-icon")==0)
			{  
//win s%
			fr_b += b;
			fr_w += w;
			nat = 4;
//
			}else

			if( yd[i].className.indexOf("js-china td-armory-icon")==0)
			{  
//win s%
			chin_b += b;
			chin_w += w;
			nat = 5;
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


			levN = yd[i].getElementsByTagName('span')[0].innerHTML.replace(/<[^<]*>/g,"").replace(/\s/g,"");
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
			imgName = yd[i].getElementsByTagName('img')[0].src.match(/\/[^-]+-([^\/]*)\.png/)[1];
			for (var j = 1; j<6 ; j++)
			{
				if (atype[j].indexOf(imgName)>=0)
				{		
					ttN = j;
					break;
				}	
			}
//
			wikilink = yd[i+1].getElementsByTagName("a")[0]
			if(wikilink!=undefined)
				yd[i+1].innerHTML =yd[i+1].innerHTML.replace('a class="b-gray-link" href', "a style='color:#"+(prem.indexOf(imgName)>=0?"ffc363":"babfba")+"' href")

			tankType = "t"+ttN;
			if (tt[tankType]==undefined)
				{
				tt[tankType] = new Object();
				tt[tankType].b = 0;
				tt[tankType].w = 0;
				tt[tankType].n = [];
				for (var j=1;j<6;j++)
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
			yd[i].setAttribute("nat", nat);
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
				yd[i+1].innerHTML += " <span style='font-size:11px;'>("+ (w-oldStat.w) + "/" + (b-oldStat.b) + "/"+col((w-oldStat.w)/(b-oldStat.b)*100)+"%/"+col2((w/b - oldStat.w/oldStat.b)*100) +")</span>"; 
			   	
//
                        }

			} 



		}

        var rows = document.getElementsByClassName("t-statistic")[0].rows; 
        var resText = rows[7].cells[3].innerHTML;
	resText = resText.indexOf("span") > 0 ? resText.substr(0,resText.indexOf("span")) : resText;
        damag = toFl(resText);

        var resText = rows[6].cells[3].innerHTML;
	resText = resText.indexOf("span") > 0 ? resText.substr(0,resText.indexOf("span")) : resText;
        caps = toFl(resText);

        var resText = rows[8].cells[3].innerHTML;
	resText = resText.indexOf("span") > 0 ? resText.substr(0,resText.indexOf("span")) : resText;
        defs = toFl(resText);

        var resText = rows[9].cells[3].innerHTML;
	resText = resText.indexOf("span") > 0 ? resText.substr(0,resText.indexOf("span")) : resText;
        frags = toFl(resText);

        var resText = rows[10].cells[3].innerHTML;
	resText = resText.indexOf("span") > 0 ? resText.substr(0,resText.indexOf("span")) : resText;
        spotted = toFl(resText);

NatParent = document.getElementsByClassName("t-table-dotted")[0].rows[document.getElementsByClassName("t-table-dotted")[0].rows.length-1].cells[0].parentNode.parentNode;
NewtrParent = document.getElementsByClassName("t-table-dotted")[1].rows[document.getElementsByClassName("t-table-dotted")[1].rows.length-1].cells[0].parentNode.parentNode;
ttParent = document.getElementsByClassName("t-table-dotted")[2].rows[document.getElementsByClassName("t-table-dotted")[2].rows.length-1].cells[0].parentNode.parentNode;
battle = all_b;
var leftTable = NatParent.parentNode.rows;
leftTable[2].cells[1].innerHTML = leftTable[2].cells[1].innerHTML.replace(/ \(.*\)/,"&nbsp;("+col((all_w)/(all_b)*100,2)+"%)");

if(needWrite)
{
//WriteStat();
}
if (all_b-old_b!=0&&old_b!=0)
{

NatParent.parentNode.style.verticalAlign = "center";
//leftTable[1].cells[1].innerHTML = leftTable[1].cells[1].innerHTML.replace(" "," ");
leftTable[1].cells[1].innerHTML += "<div style='font-size:11px;'>+"+(all_b-old_b)+"</div>";

nextD = Math.ceil(all_w/all_b*100+0.5)-0.5
currProc = (all_w-old_w)/(all_b-old_b)*100;
if (currProc < nextD)
	nextD--;
if (currProc!=nextD)
	{
     need_b = ((nextD*all_b-all_w*100)/(currProc - nextD)).toFixed();
     if (need_b>0)
	if (lang == "ru")
		need_b ="До "+nextD+"% осталось "+need_b+" боев"
	else
		need_b ="To "+nextD+"% need "+need_b+" battles"	
	}
	
leftTable[2].cells[1].innerHTML += "<div style='font-size:11px;' title='"+need_b+"'>+"+(all_w-old_w)+"("+col((all_w-old_w)/(all_b-old_b)*100)+"%)"+"</div>";
}
//NatParent.parentNode.innerHTML = NatParent.parentNode.innerHTML.replace(" "," ");
insertNewTr(NewtrParent,(lang == "ru") ?" Повреждений за бой:" : "Daño por batalla:", (damag/battle).toFixed(0), "");
insertNewTr(NewtrParent,(lang == "ru") ? " Фрагов за бой:" : "Destruidos por batalla:" ,(frags/battle).toFixed(2), "");
insertNewTr(NewtrParent,(lang == "ru") ?" Обнаружено за бой:" : "Detectados por batalla:", (spotted/battle).toFixed(2), "");

                
if(ussr_b!=0)insertNewTr(NatParent,(lang == "ru")?" Боев на советах:" : "Batallas Rusitos:", ""+ussr_b+" ("+(ussr_b/all_b*100).toFixed(0)+"%/"+col(ussr_w/ussr_b*100,0)+"%)", (lang == "ru")?"Процент боев/Процент побед" : "porcentaje batallas/porcentaje de victorias");
if(nazi_b!=0)insertNewTr(NatParent,(lang == "ru")?" Боев на немцах:": "Batallas Alemanes:", ""+nazi_b+" ("+(nazi_b/all_b*100).toFixed(0)+"%/"+col(nazi_w/nazi_b*100,0)+"%)" , (lang == "ru")?"Процент боев/Процент побед" : "porcentaje batallas/porcentaje de victorias");
if(usa_b!=0)insertNewTr(NatParent,(lang == "ru")?" Боев на амерах:" :"Batallas Yankees:", ""+usa_b+" ("+(usa_b/all_b*100).toFixed(0)+"%/"+col(usa_w/usa_b*100,0)+"%)" , (lang == "ru")?"Процент боев/Процент побед" : "porcentaje batallas/porcentaje de victorias");
if(chin_b!=0)insertNewTr(NatParent,(lang == "ru")?" Боев на китайцах:" :"Batallas Chinitos:", ""+chin_b+" ("+(chin_b/all_b*100).toFixed(0)+"%/"+col(chin_w/chin_b*100,0)+"%)" , (lang == "ru")?"Процент боев/Процент побед" : "porcentaje batallas/porcentaje de victorias");
if(fr_b!=0)insertNewTr(NatParent,(lang == "ru")?" Боев на французах:" :"Batallas Franchutes:", ""+fr_b+" ("+(fr_b/all_b*100).toFixed(0)+"%/"+col(fr_w/fr_b*100,0)+"%)" , (lang == "ru")?"Процент боев/Процент побед" : "porcentaje batallas/porcentaje de victorias");
if(daypassed!=0)insertNewTr(NatParent,(lang == "ru")?" Боев в день:" :"Batallas promedio por Día:", ""+(all_b/daypassed).toFixed(0)+"" , ((lang == "ru")?"дней" : "days")+": "+daypassed.toFixed() );

var Table = document.createElement("table");
Table.className = "t-statistic";
ts = trTankTable.parentNode.parentNode;
ts.parentNode.appendChild(Table);

var tr = document.createElement("tr");
Table.appendChild(tr);
trTankTable = tr;
trLev =insertNewTr(trTankTable,(lang == "ru")?" <u>Бои по уровням</u>":"<u>Batallas por Tier:</u>",(lang == "ru")?"Бои":"Batallas", "");
addTd(trLev,(lang == "ru")?"Победы":"Victorias","right");
addTd(trLev,"%","right");
for(var j = 1;j<6;j++)
{
addTd(trLev, toType("t"+j),"right");
}
var ml = 0;
for(var i = 0; i< levOrder.length; i++)
{
key = levOrder[i];
if(lev[key]!=undefined)
	{
	ml += (10-i)*lev[key].b/all_b;
	levTr = insertTank(trTankTable,key, lev[key].b, lev[key].w, "lev" ,(lev[key].b/all_b*100).toFixed(2)+"%");
	for(var j = 1;j<6;j++)
		{
		b = lev[key].t[j].b;
		w = lev[key].t[j].w;
		if (b == 0) addTd(levTr,"x","right");
		else addTd(levTr,""+col(w/b*100,2)+"%","right value",""+w+"/"+b);
		}
	}
}
var eff = damag*(10/ml)*(0.15+2*ml/100)+frags*(0.35-2*ml/100)*1000 + spotted*0.2*1000 + caps*0.15*1000+defs*0.15*1000; 
insertNewTr(NewtrParent,(lang == "ru") ?" Эффективность:" : "Eficiecia:", (eff/all_b).toFixed(2), "");
 
trType = insertNewTr(trTankTable,(lang == "ru")?" <u>Бои по типу</u>":"<u>Batallas por Tipo:</u>",(lang == "ru")?"Бои":"Batallas","");
addTd(trType,(lang == "ru")?"Победы":"Victorias","right");
addTd(trType,"%","right");
for(var j = 1;j<5;j++)
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
typeTr = insertTank(trTankTable,toType(key), tt[key].b ,tt[key].w, "typ", (tt[key].b/all_b*100).toFixed(2)+"%" );
	for(var j = 1;j<5;j++)
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

function insertTank(NewTrParent,level,battle,win, name, title)
{

var trNew = document.createElement('tr');
var tdNewLevel = document.createElement('td');
tdNewLevel.innerHTML = level;
var tdNewBattle = document.createElement('td');
tdNewBattle.className = "right value";
tdNewBattle.innerHTML = battle;
if (title!=undefined) tdNewBattle.title = title;
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
if(n==1) return (lang == "ru") ?"СССР":"URSS";
if(n==2) return (lang == "ru") ?"Германия":"Alemania";
if(n==3) return (lang == "ru") ?"США":"EEUU";
if(n==4) return (lang == "ru") ?"Франция":"Francia";
if(n==5) return (lang == "ru") ?"Китай":"China";
}

function toType(k)
{
if(k == "t1"||k=="lightTank") return (lang == "ru") ?"ЛТ":"Liviano";
if(k == "t2"||k=="mediumTank") return (lang == "ru") ?"СТ":"Mediano";
if(k == "t3"||k=="heavyTank") return (lang == "ru") ?"ТТ":"Pesado";
if(k == "t4"||k=="SPG") return (lang == "ru") ?"САУ":"Arti";
if(k == "t5"||k=="AT-SPG") return (lang == "ru") ?"ПТ":"TD";
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
if (isNaN(v)) v = 0;
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
if (i == 1) return levOrder.indexOf( row.cells[i].getElementsByTagName("span")[0].innerHTML.replace(/<[^<]*>/g,"").replace(/\s/,"") );
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
	nat = document.getElementsByName("Nation")[0].value;	
	for (var i=1; i<rows.length ;i++)
		{
		if ((rows[i].cells[0].innerHTML == ftype || ftype == 0)
			&& (nat == 0 || rows[i].cells[1].getAttribute("nat") == nat)	
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
	if ( start == -1 ) return undefined;
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
		if (t[1].tagName != "TH" && t[1].innerHTML!="")
			{
			imgName = t[1].getElementsByTagName('img')[0].src.match(/\/[^-]+-([^\/]*)\.png/)[1];
			cookie += "/"+imgName+";"+toFl(t[3].innerHTML)+";"+toFl(t[4].innerHTML);
			}
		}

	document.cookie = "daystat" +"=" + escape(cookie)+"; expires=Mon, 01-Jan-2031 00:00:00 GMT";  
	alert("Saved");

}

function setCookie(name, value) 
{
document.cookie = 
name +"=" + escape(value)+"; expires=Mon, 01-Jan-2031 00:00:00 GMT";  
}
