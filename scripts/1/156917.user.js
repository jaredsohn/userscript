// ==UserScript==
// @author klensy
// @name WoTStats_test
// @version 0.8.3.2
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
// @klensy
var req;
var arMedal;
if(document.title.indexOf("Профиль игрока")>-1)
	main("ru"); 
else //if(document.title.indexOf("Player Profile")>-1)
	main("en");
function main(lang) 
{
		var daypassed = (new Date() - new Date(document.getElementsByClassName("b-data-create")[0].childNodes[1].getAttribute("data-timestamp") * 1000)) / 1000 / 60 / 60 / 24;
		var timeDiv = document.getElementsByClassName("b-data-date")[0];
		var timeStamp = new Date(Number(timeDiv.childNodes[1].getAttribute("data-timestamp")) * 1000);
		timeDiv.innerHTML += "<p/>" + (lang == "ru" ? "версия <a href='http://forum.worldoftanks.ru/index.php?/topic/566557-'>скрипта</a> " : " <a href='http://forum.worldoftanks.ru/index.php?/topic/566557-'>script</a> version ")
		+ "0.8.3.2 <p/> <font onclick='WriteStat();' style='cursor:pointer; color:white; text-decoration:underline'>" + ((lang == "ru") ? "Сохранить текущую стату" : "Save statistic") + "</font>";

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
				for (var i = 0; i < 3; i++)
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
					for (var i = 4; i < str.length - 1; i++)
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
							else if (newBatles)
							{
								var r = tableDin.insertRow(-1);
								var c = r.insertCell(-1);
								switch (j) // switched to switch, klensy
								{
									case 11:
										c.innerHTML = ((lang == "ru") ? "Опыт за бой":"exp per battle");
										var c = r.insertCell(-1);
										c.innerHTML = (diff/newBatles).toFixed();
										break
									
									case 7: 
										c.innerHTML = ((lang == "ru") ? "Повреждения за бой":"Damage per battle");;
										var c = r.insertCell(-1);
										c.innerHTML = (diff/newBatles).toFixed();
										break
										
									case 9:
										c.innerHTML = ((lang == "ru") ? "Фрагов за бой":"Frags per battle");
										var c = r.insertCell(-1);
										c.innerHTML = (diff/newBatles).toFixed(2);
										break
									case 10:
										c.innerHTML = ((lang == "ru") ? "Обнаружено за бой":"spotted per battle");
										var c = r.insertCell(-1);
										c.innerHTML = (diff/newBatles).toFixed(2);
										break
									
									//default: alert ("error")
									
								}
								c.className = "td-number";
							}
						}
						i++;	
						var r = tres.rows[j].cells[4].getElementsByTagName("a")[0];
						resText = r == undefined ? tres.rows[j].cells[4].innerHTML: r.innerHTML ;

						var diff = toFl(resText) - Number(str[i]);	
						if (diff) // reversed '^' and 'v' by colors, klensy
							tres.rows[j].cells[4].innerHTML+="<span style='font-size:11px;'>/"+((diff>0)?"<font color=red>^</font>"+diff:"<font color=green>v</font>"+(-diff))+"</span>";	
						j++;
					}
				}
				for (var i = 1; i < strArray.length; i++)
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
		+ ((lang == "ru") ? "История кланов": "Clan history")+"</a>";

		try 
		{	
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


	   setup_script (sortTd);
	   setup_script (toType);
	   setup_script (WriteStat);
	   setup_script (hideTypes);	
	   setup_script (toFl);
	   setup_script (col);
	   setup_script (col2);
	   setup_script (setCookie);
							  
	  var needMedal = getCookie("medal");
	  if (localStorage.Medal == 1)
		needMedal = 1; else needMedal = 0;
			div  = document.createElement("div"); 
		if (needMedal != 1)
			div.innerHTML = "<font onclick='setCookie(\"medal\",1);localStorage.Medal = 1;location.reload();' style='cursor:pointer; color:white; text-decoration:underline'>"+((lang == "ru") ? "Включить медали":"turn on medals")+"</font>";
		else
			div.innerHTML = "<font onclick='setCookie(\"medal\",0);localStorage.Medal = 0;location.reload();' style='cursor:pointer; color:white; text-decoration:underline'>"+((lang == "ru") ? "Выключить медали":"turn off medals")+"</font>";		


		ts = document.getElementsByClassName("t-statistic")[0]	
		ts.parentNode.insertBefore(div,ts)


		server = document.location.host.match(/\.([^\.]+)$/)[1];	
		url = "http://"+document.location.host+"/uc/accounts/"+document.location.href.match(/\/(\d+)/)[1]+"/api/1.8/?source_token=Intellect_Soft-WoT_Mobile-site";
		req = new XMLHttpRequest();
		req.onreadystatechange = function(e) 
		{
			if (req.readyState == 4)if(req.status == 200) //200
			{
				eval("var resp ="+ req.responseText);
				arMedal = resp.data.achievements;//gbody.match(/"achievements": \{([^\}]*)\}/g)[0].split("{")[1].split(",")

				div  = document.createElement("div"); 
				ts = document.getElementsByClassName("t-statistic")[0]	
				ts.parentNode.insertBefore(div,ts)

				var MedalName = ["medalCarius",	"warrior",	"invader",	"sniper",	"defender",	"steelwall",	"supporter",	"scout",	"medalWittmann",	"medalOrlik",	"medalOskin",	"medalHalonen",	"medalBurda",	"medalBillotte",	"medalKolobanov",	"heroesOfRassenay",	"medalFadin",	"medalEkins",	"beasthunter",	"sinai",	"mousebane",	"tankExpert",	"maxPiercingSeries",	"medalKay",	"medalLeClerc",	"medalAbrams",	"medalPoppel",	"maxSniperSeries",	"maxInvincibleSeries",	"maxDiehardSeries",	"raider",	"maxKillingSeries",	"kamikaze",	"medalLavrinenko",	"lumberjack",	"medalKnispel", "medalPascucci", "medalBrunoPietro", "evileye", "medalTamadaYoshio", "bombardier", "medalBrothersInArms", "medalTarczay", "medalCrucialContribution", "medalDeLanglade", "medalRadleyWalters", "medalNikolas", "medalLehvaslaiho", "medalDumitru", "medalLafayettePool"] // handOfDeath ?
				var MedalImg = ["",	"top_gun",	"invader",	"sniper",	"defender",	"steel_wall",	"confederate",	"scout",	"medal_belter",	"orlik",	"oskin",	"halonen",	"burda",	"billotte",	"kolobanov",	"heroesofrassenay",	"fadin",	"",	"tank_hunter",	"lionofsinai",	"mouse_trap",	"expert",	"master_gunner",	"",	"",	"",	"",	"sharpshooter",	"invincible",	"survivor",	"raider",	"reaper",	"kamikadze",	"",	"",	"", "pascucci", "bruno", "dozorny", "tamada_yoshio", "bombardier", "medalbrothersinarms", "tarczay", "medalcrucialcontribution", "de_laglande", "radley", "nicolos", "lehveslaiho", "dumitru", "pool"]
				var MedalTitle = ["",	"Воин",	"Захватчик",	"Снайпер",	"Защитник",	"Стальная стена",	"Поддержка",	"Разведчик",	"Бёльтер",	"Орлик",	"Оськин",	"Халонен",	"Бурда",	"Бийот",	"Колобанов",	"Расейняя",	"Фадин",	"",	"Зверобой",	"Лев Синая",	"Гроза мышей",	"Эксперт",	"Бронебойщик",	"",	"",	"",	"",	"Стрелок",	"Неуязвимый",	"Живучий",	"Рейдер",	"Коса смерти",	"Камикадзе",	"",	"",	"", "Паскуччи", "Бруно", "Дозорный", "Тамада Йошио", "Бомбардир", "Братья по оружию", "Тарцая", "Решающий вклад", "де Ланглада", "Рэдли-Уолтерса", "Николса", "Лехвеслайхо", "Думитру", "Пула"]

				for (var i = 0; i < MedalImg.length; i++)
				{
					mImg = MedalImg[i];
					if (mImg != "" && mImg.substr(0, 1) != "!")
					{
						styleImg = ""
						mc = arMedal[MedalName[i]]
						if (mc > 0)
						{
							title = (lang == "ru") ? MedalTitle[i] : mImg;
							if (MedalName[i] != "medalPascucci" && MedalName[i] != "medalBrunoPietro" && MedalName[i] != "evileye" && MedalName[i] != "medalTamadaYoshio" && MedalName[i] != "bombardier" && MedalName[i] != "medalBrothersInArms" && MedalName[i] != "medalTarczay" && MedalName[i] != "medalCrucialContribution" && MedalName[i] != "medalDeLanglade" && MedalName[i] != "medalRadleyWalters" && MedalName[i] != "medalNikolas" && MedalName[i] != "medalLehvaslaiho" && MedalName[i] != "medalDumitru" && MedalName[i] != "medalLafayettePool") // TODO: all medals
							{
								if (MedalName[i] == "maxInvincibleSeries" && mc < 5 ) styleImg = "style = 'opacity: 0.4;' "
								if (MedalName[i] == "maxDiehardSeries"    && mc < 20) styleImg = "style = 'opacity: 0.4;' "
								if (MedalName[i].indexOf("max")<0)
									title += (lang == "ru" ? ". Раз в " : ". once on ") + (all_b / mc).toFixed(1);
								else
									title+=(lang=="ru"?". Максимальная длина серии":". Max series length ")	
								div.innerHTML += "<div style='display: inline-block;position: relative;'><img "+styleImg+"width=50 height=50 src='http://worldoftanks.ru/dcont/fb/achievements/"+mImg+".png' alt='"+title+"' title='"+title+"'>"
								+(mc==1?"":"<font style='border: 1px solid #40312E;position:absolute;font-size: 10px;text-align: center; right: 1px;width:26px;top:35px;background-color: rgb(66, 15, 12);padding: 1px 0px;' title='"+"'>"+mc+"</font>")
								+"</div>";      //
							}
							else
							{						
								if (MedalName[i].indexOf("max")<0)
									title += (lang == "ru" ? ". Раз в " : ". once on ") + (all_b / mc).toFixed(1);
								else
									title+=(lang=="ru"?". Максимальная длина серии":". Max series length ")	
								div.innerHTML += "<div style='display: inline-block;position: relative;'><img "+styleImg+"width=50 height=50 src='http://worldoftanks.ru/dcont/fb/uncommon_images/medals080/newmedal/"+mImg+".png' alt='"+title+"' title='"+title+"'>"
								+(mc==1?"":"<font style='border: 1px solid #40312E;position:absolute;font-size: 10px;text-align: center; right: 1px;width:26px;top:35px;background-color: rgb(66, 15, 12);padding: 1px 0px;' title='"+"'>"+mc+"</font>")
								+"</div>";      //
							}
						}
					}
				}
				if(lang=="ru")
					div.innerHTML += "<div><a href='http://worldoftanks.ru/game/guide/ru/general/achievements'>Описание достижений</a></div>"
				else
					div.innerHTML += "<div><a href='http://worldoftanks.com/game/guide/en/general/achievements'>Achievements description</a></div>"
				
				var rows = document.getElementsByClassName("t-statistic")[1].rows; 

				nc = rows[0].insertCell(rows[0].cells.length);
				nc.className ="right";
				
				nc.innerHTML = '<div onclick="sortTd(this, &quot;u&quot;)" style="cursor: pointer">damage</div>';
				nc = rows[0].insertCell(rows[0].cells.length);
				nc.innerHTML = '<div onclick="sortTd(this, &quot;u&quot;)" style="cursor: pointer">frags</div>';
				
				nc = rows[0].insertCell(rows[0].cells.length); // spotted table, klensy
				nc.innerHTML = '<div onclick="sortTd(this, &quot;u&quot;)" style="cursor: pointer">spotted</div>';
				

				vehs = resp.data.vehicles;
				for (var i = 1; i < rows.length; i++)
				{
					var t = rows[i].cells;
					if (t[1].tagName != "TH" && t[1].innerHTML!="")
					{
						imgName = t[1].getElementsByTagName('img')[0].src.match(/\/[^-]+-([^\/]*)\.png/)[1];
						for (j =0; j<vehs.length; j++)
						{
							if(vehs[j].name.toLowerCase() == imgName)
							{
								veh = vehs[j];
								break;
							}	
						}
						if (t[0].innerHTML == "undefined" ) t[0].innerHTML = toType(veh.class);
						ncell = rows[i].insertCell(t.length);
						ncell.innerHTML = ""+(veh.damageDealt/veh.battle_count).toFixed();
						ncell = rows[i].insertCell(t.length);
						ncell.innerHTML = ""+(veh.frags/veh.battle_count).toFixed(2)+"";
						ncell.title = veh.battle_count;
						
						ncell = rows[i].insertCell(t.length); // added avg_spotted, klensy
						ncell.innerHTML = ""+(veh.spotted/veh.battle_count).toFixed(2)+"";
					}
				}
			}
		};                                                                               
		req.open("GET", url, true);
		//req.open("GET","http://anonymouse.org/cgi-bin/anon-www.cgi/"+url, true);
		req.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2000 00:00:00 GMT");
		//req.setRequestHeader("Referer", "anonymouse.org");
		try 
		{
			if (needMedal == 1) req.send(null);
		} catch (e){}

	var atype = [];
	//atype[1] = [];
	atype[1] = //'lt', 0.8.3,  added china tanks
	['t2_lt', 'tetrarch_ll', 'renaultft', 'd1', 'hotchkiss_h35', 'amx38', 'amx40', 'elc_amx', 'amx_12t', 'amx_13_75', 'amx_13_90', 'm22_locust', 'pzii_j', 'm24_chaffee', 't-50', 't_50_2', 'vk2801', 't-15', 'ms-1', 'ltraktor', 't1_cunningham', 't-26', 'bt-2', 'pzii', 'pz35t', 'm2_lt', 't-46', 'bt-7', 'pziii_a', 'pzii_luchs', 'pz38t', 'm3_stuart', 'a-20', 'vk1602', 'pz38_na', 'm5_stuart', 'm3_stuart_ll', 'ch02_type62', 'bt-sv', 't-127', 'valentine_ll', 'h39_captured', 'gb03_cruiser_mk_i', 'gb58_cruiser_mk_iii', 'gb69_cruiser_mk_ii', 'gb59_cruiser_mk_iv', 'gb04_valentine', 'gb60_covenanter', 'gb20_crusader', 't21', 't71', 't1_e6', 'ch06_renault_nc31', 'ch07_vickers_mke_type_bt26', 'ch08_type97_chi_ha', 'ch09_m5', 'ch15_59_16', 'ch16_wz_131', 'ch17_wz131_1_wz132']

	atype[2] = //'mt', 0.8.3, added china tanks, fixed gb70_fv4202_105 mt
	['t-25', 'd2', 'bat_chatillon25t', 'lorraine40t', 'sherman_jumbo', 'ch01_type59', 's35_captured', 'pzv_pziv', 'pzv_pziv_ausf_alfa', 'mtls-1g14', 'm4a2e4', 'ram-ii', 'matilda_ii_ll', 'gb68_matilda_black_prince', 't2_med', 'm2_med', 't-28', 'pziii', 'm3_grant', 't-34', 'pziv', 'pziii_iv', 'm4_sherman', 'm7_med', 't-34-85', 'vk3601h', 'vk3001h', 'vk3001p', 'm4a3e8_sherman', 'pziv_schmalturm', 'panther_m10', 't26_e4_superpershing', 't-43', 'kv-13', 'vk3002db', 'pzv', 't20', 't-44', 'panther_ii', 't23', 'pershing', 'm48a1', 't-54', 't62a', 'e-50', 'e50_ausf_m', 'pziv_hydro', 't23', 'm46_patton', 'gb01_medium_mark_i', 'gb05_vickers_medium_mk_ii', 'gb06_vickers_medium_mk_iii', 'gb07_matilda', 'gb68_matilda_black_prince', 'gb21_cromwell', 'gb22_comet', 'gb23_centurion', 'gb24_centurion_mk3', 'a-32', 't69', 't54e1', 'ch21_t34', 'ch20_type58', 'ch04_t34_1', 'ch05_t34_2', 'ch18_wz-120', 'ch19_121', 'gb70_fv4202_105']

	atype[3] = //'ht', 0.8.3, added china tanks
	['b1', 'bdr_g1b', 'arl_44', 'amx_m4_1945', 'amx_50_100', 'amx_50_120', 'f10_amx_50b', 'lowe', 'kv-220_action', 'kv-220', 'kv-5', 'b-1bis_captured', 'churchill_ll', 't14', 'm6a2e1', 'kv', 'kv1', 'kv2', 'kv4', 'is8', 'object252', 'st_i', 't150', 't1_hvy', 'kv-3', 'kv-1s', 'm6', 'is', 'pzvi', 'pzvi_tiger_p', 't29', 'is-3', 'pzvib_tiger_ii', 'vk4502a', 't32', 'is-4', 'vk4502p', 'e-75', 't34_hvy', 'm103', 't110', 'is-7', 'maus', 'e-100', 'gb08_churchill_i', 'gb09_churchill_vii', 'gb10_black_prince', 'gb11_caernarvon', 'gb12_conqueror', 'gb13_fv215b', 't57_58', 'gb63_tog_ii', 'ch10_is2', 'ch11_110', 'ch12_111_1_2_3', 'ch22_113', 'fcm_50t']

	atype[4] = //'sp',
	['su-18', 'bison_i', 't57', '_105_lefh18b2', 'su-26', 'wespe', 'sturmpanzer_ii', 'm37', 'su-5', 'grille', 'm7_priest', 'su-8', 'hummel', 'm41', 'su-14', 's-51', 'g_panther', 'm12', 'object_212', 'g_tiger', 'm40m43', 'object_261', 'g_e', 'renaultbs', 'lorraine39_l_am', 'amx_105am', 'amx_13f3am', 'bat_chatillon155', 'lorraine155_50', 'lorraine155_51', 't92']

	atype[5] = //at , 0.8.2 added su100y
	['at-1', 'panzerjager_i', 't18', 'su-76', 'g20_marder_ii', 't82', 'fcm_36pak40', 'm8a1', 't49', 'gaz-74b', 'hetzer', 't40', 'su-85', 'su_85i', 'stugiii', 'm10_wolverine', 'su-100', 'su-101', 'su100m1', 'su122_54', 'object263', 'su122_44', 'jagdpziv', 'm36_slagger', 'm18_hellcat', 'su-152', 'jagdpanther', 'jagdpantherii', 't25_at', 't25_2', 'isu-152', 'ferdinand', 't28', 't28_prototype', 'object_704', 'object268', 'jagdtiger', 'jagdtiger_sdkfz_185', 't95', 'dickermax', 'jagdpz_e100', 't110e4', 't110e3', 'amx_50fosh_155', 'renaultft_ac', 'renaultue57', 'somua_sau_40', 's_35ca', 'arl_v39', 'amx_ac_mle1946', 'amx_ac_mle1948', 'amx50_foch', 't30', 'gb71_at_15a', 'su100y']

	prem = // 0.8.2 added su100y
	['tetrarch_ll', 'm3_stuart_ll', 'bt-sv', 't-127', 'valentine_ll', 'a-32', 'churchill_ll', 'matilda_ii_ll', 'gb68_matilda_black_prince', 'kv-220_action', 'kv-220', 'kv-5', 'object252', 't26_e4_superpershing', 'jagdtiger_sdkfz_185', 't34_hvy', 'h39_captured', 'pzii_j', 's35_captured', 't-15', 'b-1bis_captured', 't-25', 'pzv_pziv', 'pzv_pziv_ausf_alfa', 'lowe', 't2_lt', 'mtls-1g14', 'm22_locust', 'm4a2e4', 'ram-ii', 't14', 'm6a2e1', 'su_85i', 'pziv_hydro', '_105_lefh18b2', 'fcm_36pak40', 'dickermax', 'ch02_type62', 'ch01_type59', 'su122_44', 'panther_m10', 'pziv_schmalturm', 'gb63_tog_ii', 'gb71_at_15a', 'fcm_50t', 'su100y', 't1_e6']

	//http://dl.dropbox.com/u/2984537/wot/stats/json
	
	var tankS = ["_105_lefh18b2","jagdtiger_sdkfz_185","amx_105am","amx_12t","amx_13_75","amx_13_90","amx_13f3am","amx38","amx40","amx_50_100","amx_50_120","amx50_foch","f10_amx_50b","amx_50fosh_155","amx_ac_mle1948","amx_ac_mle1946","amx_m4_1945","arl_44","arl_v39","gb71_at_15a","b1","bat_chatillon155","bat_chatillon25t","bdr_g1b","gb10_black_prince","gb11_caernarvon","gb23_centurion","gb24_centurion_mk3","churchill_ll","gb08_churchill_i","gb09_churchill_vii","gb22_comet","gb12_conqueror","gb60_covenanter","gb21_cromwell","gb03_cruiser_mk_i","gb69_cruiser_mk_ii","gb58_cruiser_mk_iii","gb59_cruiser_mk_iv","gb20_crusader","d1","d2","dickermax","e-100","e-50","e-75","e50_ausf_m","elc_amx","fcm_50t","fcm_36pak40","ferdinand","gb13_fv215b","gb70_fv4202_105","grille","g_panther","g_tiger","g_e","hetzer","hotchkiss_h35","hummel","jagdpanther","jagdpantherii","jagdpz_e100","jagdpziv","jagdtiger","ltraktor","lorraine40t","lorraine155_50","lorraine155_51","lorraine39_l_am","lowe","m10_wolverine","m103","m12","m18_hellcat","m2_lt","m2_med","m22_locust","m24_chaffee","pershing","m3_grant","m3_stuart","m3_stuart_ll","m36_slagger","m37","m4_sherman","m40m43","m41","m46_patton","m48a1","m4a2e4","sherman_jumbo","m4a3e8_sherman","m5_stuart","m6","m6a2e1","m7_med","m7_priest","m8a1","g20_marder_ii","matilda_ii_ll","gb07_matilda","gb68_matilda_black_prince","maus","gb01_medium_mark_i","tetrarch_ll","mtls-1g14","observer","panther_ii","panther_m10","panzerjager_i","pziv_schmalturm","pz35t","pz38t","pz38_na","h39_captured","b-1bis_captured","pzii","pzii_j","pzii_luchs","pziii","pziii_a","pziii_iv","pziv","pziv_hydro","s35_captured","pzv","pzv_pziv","pzv_pziv_ausf_alfa","pzvi","pzvi_tiger_p","pzvib_tiger_ii","ram-ii","renaultue57","renaultbs","renaultft","renaultft_ac","s_35ca","somua_sau_40","stugiii","bison_i","sturmpanzer_ii","t-15","t-25","t-34","t1_cunningham","t1_hvy","t110e3","t110e4","t110","t14","t18","t1_e6","t2_lt","t2_med","t20","t25_at","t25_2","t26_e4_superpershing","t28","t28_prototype","t29","t30","t32","t34_hvy","t40","t49","t57","t62a","t82","t92","t95","gb63_tog_ii","ch01_type59","ch02_type62","valentine_ll","gb04_valentine","gb05_vickers_medium_mk_ii","gb06_vickers_medium_mk_ii","vk1602","vk2801","vk3001h","vk3001p","vk3002db","vk3601h","vk4502a","vk4502p","wespe","a-20","a-32","at-1","bt-2","bt-7","bt-sv","is","is-3","is-4","object252","is-7","is8","isu-152","kv1","kv-13","kv-1s","kv2","kv-220_action","kv-220","kv-3","kv-5","kv4","ms-1","object_212","object_261","object263","object268","object_704","s-51","st_i","su-100","su100m1","su122_44","su122_54","su-14","su-152","su-18","su-26","su-5","su-76","su-8","su-85","gaz-74b","su_85i","t-127","t150","t-26","t-28","t-34-85","t-43","t-44","t-46","t-50","t_50_2","t-54","su-101"]
	
	var medP = [51,49.95,50.6,49.52,49.63,50.7,51.61,52.28,51.01,52.13,51.01,53.52,50.22,54.66,52.42,52.52,50.29,50.43,50.66,57.26,48.63,50.89,50.16,49.83,54.38,53.87,56.56,54.44,49.76,50,52.3,55.65,52.67,49,52.82,48.78,49.43,48.7,49.16,49.84,49.35,52.21,51.33,49.84,50.77,50.09,50.82,50.37,52.13,62.41,51.18,52.99,51.92,50.02,49.7,48.55,48.91,50.88,50.42,49.35,51,52,48.94,49.39,50.75,48.69,47.92,50.5,50.59,49.96,49.34,50.79,50.36,49.13,50.96,49.22,48.69,54.65,52.13,52.29,48.88,48.59,46.54,49.98,46.32,51.89,49.59,48.66,51.17,52.32,49.84,51.74,49.2,49.45,49.79,50.5,47.18,47.19,49.66,52.55,50.53,49.46,51.84,49.45,47.67,50.34,0,0,50.51,50.55,50.38,51.65,49.57,50.95,50.05,59.89,60.65,49.38,100,52.28,50.15,50.63,49.55,49.32,0,60.61,50.33,49.5,50.95,49.41,51.18,49.6,51.96,53.01,50.03,47.69,51.15,53.41,51.79,50.14,47.83,47.36,56.53,52.62,48.32,48.47,49.84,49.66,49.91,49.98,50.92,51.51,57.45,53.56,47.65,51.28,50.05,49.95,48.76,50.1,49.99,51.15,50,51.15,49.52,50.87,49.7,48.7,49.09,47.97,49.11,50.23,56.71,50.8,52.17,48.47,50.97,48.31,49.23,50.37,51.47,50.1,49.26,48.87,50.48,50.18,49.47,47.09,47.28,53.16,47.27,48.34,47.57,100,48.43,49.15,47.76,47.54,47.66,48.28,48.06,49.17,47.15,49.14,49.66,58.28,59.2,47.69,49.12,47.82,48.5,48.85,48.99,49.7,49.34,50.1,49.03,48.04,49.47,49.64,50.12,49.35,48.01,48.2,46.02,51.05,48.22,46.74,48.42,48.55,48.49,0,53.79,48.12,47.89,48,48.66,47.88,48.43,47.57,49.28,50.13,48.87,47.04] 
	var unrealDate = " (16.10.2012 - 11.11.2012) (special thanks to fbmk)"

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
		var uk_b = 0;
		var uk_w = 0;
		var NatCount = 6+1;
		
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
	for (var j = 1; j<NatCount; j++)
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
		for (i = 0; i < yd.length; i++)
		{	
			if( yd[i].className.indexOf("td-armory-icon")>1)
			{  
	//win%
				var b = toFl(yd[i+2].innerHTML);
				var w = toFl(yd[i+3].innerHTML);
				all_b += b;
				all_w += w;	

				if( yd[i].className.indexOf("js-uk td-armory-icon")==0)
				{  
	//win s%
					uk_b += b;
					uk_w += w;
					nat = 6;
	//
				}else if( yd[i].className.indexOf("js-france td-armory-icon")==0)
				{  
	//win s%
					fr_b += b;
					fr_w += w;
					nat = 4;
	//
				}else if( yd[i].className.indexOf("js-china td-armory-icon")==0)
				{  
	//win s%
					chin_b += b;
					chin_w += w;
					nat = 5;
	//
				}else if( yd[i].className.indexOf("js-ussr td-armory-icon")==0)
				{  
	//win s%
					ussr_b += b;
					ussr_w += w;
					nat = 1;
	//
				}else if( yd[i].className.indexOf("js-germany td-armory-icon")==0)
				{  
	//win g%
					nazi_b+= b;
					nazi_w+= w;
					nat = 2;
	//	
				}else if( yd[i].className.indexOf("js-usa td-armory-icon")==0)
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
				if (tt[tankType] == undefined)
				{
					tt[tankType] = new Object();
					tt[tankType].b = 0;
					tt[tankType].w = 0;
					tt[tankType].n = [];
					for (var j=1;j<NatCount;j++)
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
		//leftTable[1].cells[1].innerHTML = leftTable[1].cells[1].innerHTML.replace(" "," ");
		leftTable[1].cells[1].innerHTML += "<div style='font-size:11px;'>+"+(all_b-old_b)+"</div>";

		nextD = Math.ceil(all_w/all_b*100+0.5)-0.5
		currProc = (all_w-old_w)/(all_b-old_b)*100;
		if (currProc < nextD)
			nextD--;
		if (currProc != nextD)
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
	//NatParent.parentNode.innerHTML = NatParent.parentNode.innerHTML.replace(" "," ");
	insertNewTr(NewtrParent,(lang == "ru") ?" Повреждений за бой:" : "Damage per battle:", (damag/battle).toFixed(0), "");
	insertNewTr(NewtrParent,(lang == "ru") ? " Фрагов за бой:" : "Frags per battle:" ,(frags/battle).toFixed(2), "");
	insertNewTr(NewtrParent,(lang == "ru") ?" Обнаружено за бой:" : "Spotted per battle:", (spotted/battle).toFixed(2), "");

	proc_country (ussr_b, (lang == "ru")?" Боев на советах:" : "Battles on USSR:", ussr_w);
	proc_country (nazi_b, (lang == "ru")?" Боев на немцах:": "Battles on Germany:", nazi_w);
	proc_country (usa_b,  (lang == "ru")?" Боев на амерах:" :"Battles on USA:", usa_w);
	proc_country (chin_b, (lang == "ru")?" Боев на китайцах:" :"Battles on China:", chin_w);
	proc_country (fr_b,   (lang == "ru")?" Боев на французах:" :"Battles on France:", fr_w);
	proc_country (uk_b,   (lang == "ru")?" Боев на бритах:" :"Battles on UK:", uk_w);
	
	if(daypassed!=0)insertNewTr(NatParent,(lang == "ru")?" Боев в день:" :"Battles per day:", ""+(all_b/daypassed).toFixed(0)+"" , ((lang == "ru")?"дней" : "days")+": "+daypassed.toFixed() );

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
	for (var j = 1; j < 6; j++)
	{
		addTd(trLev, toType("t"+j),"right");
	}
	var ml = 0;
	for (var i = 0; i < levOrder.length; i++)
	{
		key = levOrder[i];
		if(lev[key]!=undefined)
		{
			ml += (10-i)*lev[key].b/all_b;
			levTr = insertTank(trTankTable,key, lev[key].b, lev[key].w, "lev" ,(lev[key].b/all_b*100).toFixed(2)+"%");
			for (var j = 1; j < 6; j++)
			{
				b = lev[key].t[j].b;
				w = lev[key].t[j].w;
				if (b == 0) addTd(levTr,"x","right");
				else addTd(levTr,""+col(w/b*100,2)+"%","right value",""+w+"/"+b);
			}
		}
	}
	var eff = damag*(10/ml)*(0.15+2*ml/100)+frags*(0.35-2*ml/100)*1000 + spotted*0.2*1000 + caps*0.15*1000+defs*0.15*1000; 
	insertNewTr(NewtrParent,(lang == "ru") ?" Эффективность:" : "Efficiency rating:", (eff/all_b).toFixed(2), "");
	
	//эффективность по бронесайту (http://armor.kiev.ua), спасибо bvrus
	var resText = rows[11].cells[3].innerHTML;
    resText = resText.indexOf("span") > 0 ? resText.substr(0,resText.indexOf("span")) : resText;
    summaryxp = toFl(resText);
  
    var resText = rows[4].cells[3].innerHTML;
    resText = resText.indexOf("span") > 0 ? resText.substr(0,resText.indexOf("span")) : resText;
    wins = toFl(resText);
        
    var resText = rows[5].cells[3].innerHTML;
    resText = resText.indexOf("span") > 0 ? resText.substr(0,resText.indexOf("span")) : resText;
    battles = toFl(resText);
        
    var effbs =
                Math.log(battles) / 10  * (
                    summaryxp / battles * 1  +
                    damag / battles  * (
                    wins / battles * 2.0 +
                    frags / battles * 0.9 +
                    spotted / battles * 0.5 +
                    caps / battles * 0.5 +
                    defs / battles * 0.5   
                            )
                    ) ;

    insertNewTr(NewtrParent,(lang == "ru") ?" Эффективность БС:" : "Efficiency rating of BS:",(effbs).toFixed(2), "");
	//
	
	trType = insertNewTr(trTankTable,(lang == "ru")?" <u>Бои по типу</u>":"<u>battles by type:</u>",(lang == "ru")?"Бои":"Battles","");
	addTd(trType,(lang == "ru")?"Победы":"Victories","right");
	addTd(trType,"%","right");
	for (var j = 1; j < NatCount; j++)
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
			return (a1.b < a2.b) ? 1 : -1;
		}
		)

	for (var i = 0 ; i < ttOr.length; i++)
	{
		key = ttOr[i].key;
		typeTr = insertTank(trTankTable,toType(key), tt[key].b ,tt[key].w, "typ", (tt[key].b/all_b*100).toFixed(2)+"%" );
		for(var j = 1;j<NatCount;j++)
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
		if (alt == undefined) alt = "";
		tdNew.title = alt;
		tdNew.value = val;
		tr.appendChild(tdNew);
	}

	function insertNewTr(NewTrParent, text, val, title)
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

	function insertTank(NewTrParent, level, battle, win, name, title)
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
		if(n==1) return (lang == "ru") ?"СССР":"USSR";
		if(n==2) return (lang == "ru") ?"Германия":"Germany";
		if(n==3) return (lang == "ru") ?"США":"USA";
		if(n==4) return (lang == "ru") ?"Франция":"France";
		if(n==5) return (lang == "ru") ?"Китай":"China";
		if(n==6) return (lang == "ru") ?"Англия":"UK";
	}

	function toType(k)
	{
		if(k == "t1"||k=="lightTank") return (lang == "ru") ?"ЛТ":"LT";
		if(k == "t2"||k=="mediumTank") return (lang == "ru") ?"СТ":"MT";
		if(k == "t3"||k=="heavyTank") return (lang == "ru") ?"ТТ":"HT";
		if(k == "t4"||k=="SPG") return (lang == "ru") ?"САУ":"SPG";
		if(k == "t5"||k=="AT-SPG") return (lang == "ru") ?"ПТ":"TD";
	}

	function col(v,digit)
	{
		if(isNaN(v)) return "x";
		var color = "90ffff";        //больше 60, ярко-белый
		if (v<60) color="90ff90"     //от 60 до 56, тусклозеленый
		if (v<56) color="babfba"     //дефолтный серенький
		if (v<50) color="ffff90"     //желтоватый
		if (v<46) color="ff9090"     //красный

		return "<font color='"+color+"'>"+v.toFixed(digit)+"</font>";
	}

	function col2(v)
	{
		if (isNaN(v)) v = 0;
		var color = "90ffff";        //больше 60, ярко-белый
		if (v<10) color="90ff90"     //от 60 до 56, тусклозеленый
		if (v<5) color="babfba"      //дефолтный серенький
		if (v<0) color="ffff90"      //желтоватый
		if (v<-5) color="ff9090"     //красный
		v = v.toFixed(2);
		if (v>=0) v = "+"+v;
		return "<font color='"+color+"'>"+v+"</font>";
	}
	
	function proc_country (country_b, fights_on_text, country_w) // выводит процент боев на технике разных стран, klensy
	{
		if (country_b != 0) insertNewTr(NatParent, fights_on_text, "" + country_b + " (" + (country_b / all_b * 100).toFixed(0) + "%/" + col(country_w / country_b * 100, 0) + "%)", (lang == "ru") ? "Процент боев/Процент побед" : "battle procent/win procent");
	}
	
	function setup_script (script_name) // просто заменил копипасту на вызов функции, klensy
	{
		var script = document.createElement("script");  
		script.type = "text/javascript";		
		script.textContent =  script_name.toString();
		document.body.appendChild(script);
	}
}//////////////////////////main
//----------
function sortTd(el,dir)
{
    var p = el;
	while (p.tagName.toLowerCase() != "tbody")
	{
		if (p.tagName.toLowerCase() == "th"||p.tagName.toLowerCase() == "td")
			Index = p.cellIndex;
		p = p.parentNode;
	}
	tBody = p;//el.parentNode.parentNode;
//	alert(el.innerHTML);	
	rows = tBody.rows;
	th = rows[0];
	sortar = [];
	
	for (var i = 1; i < rows.length; i++)
	{
		sortar[i] = [];
		sortar[i][0] = defkey(rows[i],Index);
		sortar[i][1] = rows[i];
	}
	if (el.onclick.toString().indexOf('"u"') > 0)
	{
		sortar.sort(_sort);
		el.setAttribute('onclick','sortTd(this, "d")');
	} 
	else
	{
		sortar.sort(_sortR);
		el.setAttribute('onclick','sortTd(this, "u")');
	}
	tBody.innerHTML = "";
	tBody.appendChild(th);
    for (var i = 0; i < sortar.length - 1; i++)
    {
    	tBody.appendChild(sortar[i][1]);
    }

	function defkey(row,i)
	{
		var levOrder = ["X","IX","VIII","VII","VI","V","IV","III","II","I"];
		if (i >= 7) return parseFloat(row.cells[i].innerHTML.replace(/\D/g,"")) ; 
		if (i >= 5) return parseFloat(row.cells[i].innerHTML.match(/>(.*)</)[1]) ; 
		if (i >= 3) return parseFloat(row.cells[i].innerHTML.replace(/\D/g,"")) ; 
		if (i == 1) return levOrder.indexOf( row.cells[i].getElementsByTagName("span")[0].innerHTML.replace(/<[^<]*>/g,"").replace(/\s/,"") );
		return row.cells[i].innerHTML;
	}

	function _sort(a,b)
	{
		a = a[0];
		b = b[0];
		return (a > b) ? -1 : 1;
	}

	function _sortR(a,b)
	{
		a = a[0];
		b = b[0];
		return (a > b) ? 1 : -1;
	}

}////sortTd
//----------
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
		if ((rows[i].cells[0].innerHTML == ftype || ftype == 0) &&
			(nat == 0 || rows[i].cells[1].getAttribute("nat") == nat) &&
			(!onlyNew||rows[i].cells[2].innerHTML.indexOf("%")>0) &&
			(toFl(rows[i].cells[3].innerHTML)>chfrom && (toFl(rows[i].cells[3].innerHTML)<chto || chto==0 ))
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
//----------
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
//----------
function WriteStat()
{
	var timeDiv = document.getElementsByClassName("b-data-date")[0];
   	var timeStamp = new Date(Number(timeDiv.childNodes[1].getAttribute("data-timestamp"))*1000);
	var cookie = ""+timeStamp+";"; 
	var tres = document.getElementsByClassName("t-table-dotted")[0];
	
	for (var i = 0; i < 3; i++)
		if (tres.innerHTML.indexOf("currency-gold") > 0)
		{
			var resText = tres.rows[i].cells[1].innerHTML;
			resText = resText.substr(resText.indexOf("span") + 4);
			cookie += "" + toFl(resText.substr(0, resText.indexOf("span"))) + ";";
		}
		else
		{
			cookie += "NaN;";
		}
		
    var rows = document.getElementsByClassName("t-statistic")[0].rows;
    
    for (var i = 1; i < rows.length; i++)
    {
    	var resText = rows[i].cells[3].innerHTML;
    	resText = resText.indexOf("span") > 0 ? resText.substr(0, resText.indexOf("span")) : resText;
    	cookie += "" + toFl(resText) + ";";
    	var r = rows[i].cells[4].getElementsByTagName("a")[0];
    	resText = r == undefined ? rows[i].cells[4].innerHTML : r.innerHTML;
    	resText = resText.indexOf("span") > 0 ? resText.substr(0, resText.indexOf("span")) : resText;
    	cookie += "" + toFl(resText) + ";";
    }
		
    var rows = document.getElementsByClassName("t-statistic")[1].rows;
    for (var i = 1; i < rows.length; i++)
    {
    	var t = rows[i].cells;
    	if (t[1].tagName != "TH" && t[1].innerHTML != "")
    	{
    		imgName = t[1].getElementsByTagName('img')[0].src.match(/\/[^-]+-([^\/]*)\.png/)[1];
    		cookie += "/" + imgName + ";" + toFl(t[3].innerHTML) + ";" + toFl(t[4].innerHTML);
    	}
    }

	document.cookie = "daystat" +"=" + escape(cookie)+"; expires=Mon, 01-Jan-2031 00:00:00 GMT";  
	alert("Saved");

}
//----------
function setCookie(name, value) 
{
	document.cookie = name +"=" + escape(value)+"; expires=Mon, 01-Jan-2031 00:00:00 GMT";  
}
