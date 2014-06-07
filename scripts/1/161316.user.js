// ==UserScript==
// @author klensy
// @name WoT_extstat
// @version 1.2.2 #10 (0.8.4)
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
// @exclude http://worldoftanks.ru/community/clans/*
// ==/UserScript==
// @klensy

var req;
var arMedal;

if (document.title.indexOf("Профиль игрока") > -1) {
	main("ru");
} else if (document.title.indexOf("Player Profile") > -1) {
	main("en");
}

function main(lang) 
{
		var daypassed = (new Date() - new Date(document.getElementsByClassName("b-data-create")[0].childNodes[1].getAttribute("data-timestamp") * 1000)) / 1000 / 60 / 60 / 24;
		var timeDiv = document.getElementsByClassName("b-data-date")[0];
		var timeStamp = new Date(Number(timeDiv.childNodes[1].getAttribute("data-timestamp")) * 1000);
		timeDiv.innerHTML += 
			"<p/>" 
				+ (lang == "ru" ? "Версия <a href='http://userscripts.org/scripts/show/161316'>скрипта</a> " 
					: " <a href='http://userscripts.org/scripts/show/161316'>Script</a> version ")
				+ "1.2.2 #10 (0.8.4) "
			+ "<p/> "
				+ "<font onclick='WriteStat();' style='cursor:pointer; color:white; text-decoration:underline'>" 
				+ ((lang == "ru") ? "Сохранить текущую стату" : "Save statistic") 
				+ "</font>";

		var dayArray = [];
		var old_b = 0;
		var old_w = 0;
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
			tableDin.insertRow(-1).insertCell(-1).innerHTML = ((lang == "ru") ? captColor("Новые бои") : captColor("New battles"));

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
					for (var i = 4; i < str.length - 1; i++, j++)
					{
						var diff = toFl(tres.rows[j].cells[3].innerHTML) - Number(str[i]);
						if (diff) {
							tres.rows[j].cells[3].innerHTML+="<span style='font-size:11px;'> / "+((diff>0)?"+":"")+diff+"</span>";
						}
						if (j == 5)
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
								case 6: 
									c.innerHTML = ((lang == "ru") ? "Очков захвата за бой":"Capture points per battle");;
									var c = r.insertCell(-1);
									c.innerHTML = (diff/newBatles).toFixed();
									break

								case 7: 
									c.innerHTML = ((lang == "ru") ? "Повреждения за бой":"Damage per battle");;
									var c = r.insertCell(-1);
									c.innerHTML = (diff/newBatles).toFixed();
									break
									
								case 8: 
									c.innerHTML = ((lang == "ru") ? "Очков защиты за бой":"Defence points per battle");;
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
								
								case 11:
									c.innerHTML = ((lang == "ru") ? "Опыт за бой":"exp per battle");
									var c = r.insertCell(-1);
									c.innerHTML = (diff/newBatles).toFixed();
									break

								//default: alert ("error")
								
							}
							c.className = "td-number";
						}
						i++;	
						var r = tres.rows[j].cells[4].getElementsByTagName("a")[0];
						resText = r == undefined ? tres.rows[j].cells[4].innerHTML: r.innerHTML ;

						var diff = toFl(resText) - Number(str[i]);	
						if (diff) // reversed '^' and 'v' by colors, klensy
							tres.rows[j].cells[4].innerHTML+="<span style='font-size:11px;'>/"+((diff>0)?"<font color=red>^</font>"+diff:"<font color=green>v</font>"+(-diff))+"</span>";	
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
		if (needMedal != 1) {
			div.innerHTML = 
				"<font onclick='setCookie(\"medal\",1);localStorage.Medal = 1;location.reload();' style='cursor:pointer; color:white; text-decoration:underline'>"
				+ ((lang == "ru") ? "Включить медали" : "Turn on medals")
				+ "</font>";
		} else {
			div.innerHTML = 
				"<font onclick='setCookie(\"medal\",0);localStorage.Medal = 0;location.reload();' style='cursor:pointer; color:white; text-decoration:underline'>"
				+ ((lang == "ru") ? "Выключить медали" : "Turn off medals")
				+ "</font>";
		}


		ts = document.getElementsByClassName("t-statistic")[0]	
		ts.parentNode.insertBefore(div,ts)


		server = document.location.host.match(/\.([^\.]+)$/)[1];	
		url = "http://"+document.location.host+"/uc/accounts/"+document.location.href.match(/\/(\d+)/)[1]+"/api/1.8/?source_token=Intellect_Soft-WoT_Mobile-site";
		url = "http://anonymouse.org/cgi-bin/anon-www.cgi/" + url;
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

				// Заголовочная ячейка "Урон"
				newth = document.createElement('th');
				newth.className = "right";
				newth.innerHTML = '<div onclick="sortTd(this, &quot;u&quot;)" style="cursor: pointer; text-align: center;">' 
					+ (lang == "ru" ? 'Урон' : 'Damage per battle')
					+'</div>';
				rows[0].appendChild(newth);

				// Заголовочная ячейка "Фраги"
				newth = document.createElement('th');
				newth.className = "right";
				newth.innerHTML = '<div onclick="sortTd(this, &quot;u&quot;)" style="cursor: pointer; text-align: center;">'
					+ (lang == "ru" ? 'Фраги' : 'Destroyed per battle')
					+ '</div>';
				rows[0].appendChild(newth);

				// Заголовочная ячейка "Засвет"
				newth = document.createElement('th');
				newth.className = "right";
				newth.innerHTML = '<div onclick="sortTd(this, &quot;u&quot;)" style="cursor: pointer; text-align: center;">'
					+ (lang == "ru" ? 'Засвет' : 'Spotted per battle')
					+ '</div>';
				rows[0].appendChild(newth);
				

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
						if (t[0].innerHTML == "undefined" ) 
							t[0].innerHTML = toType(veh.class);
						
						/* Чтобы в следующих трех ячейках данные отображались таким же (полужирным) шрифтом, 
							как и остальные данные, нужно поставить ячейке td класс value. 
							Класс right -- для выравнивания по правому краю. */

						// Ячейка с уроном за бой
						ncell = rows[i].insertCell(t.length);
						ncell.className = "right value";
						ncell.innerHTML = ""+(veh.damageDealt/veh.battle_count).toFixed();
						
						// Ячейка с фрагами за бой
						ncell = rows[i].insertCell(t.length);
						ncell.className = "right value";
						ncell.innerHTML = ""+(veh.frags/veh.battle_count).toFixed(2)+"";
						ncell.title = veh.battle_count;
						
						// Ячейка с обнаруженными за бой
						ncell = rows[i].insertCell(t.length);
						ncell.className = "right value";
						ncell.innerHTML = ""+(veh.spotted/veh.battle_count).toFixed(2)+"";
					}
				}
			}
		};                                                                               
		req.open("GET", url, true);
		req.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2000 00:00:00 GMT");
		try 
		{
				req.send(null);
		} catch (e){}

	var atype = [];

	atype[1] = [    // 'lt', патч 0.8.4
		// Легкие танки СССР
		'ms-1',         // 1  -- МС-1
		'bt-2',         // 2  -- БТ-2
		't-26',         // 2  -- Т-26
		'tetrarch_ll',  // 2* -- Тетрарх
		'bt-7',         // 3  -- БТ-7
		't-46',         // 3  -- Т-46
		'bt-sv',        // 3* -- БТ-СВ
		'm3_stuart_ll', // 3* -- М3 лёгкий
		't-127',        // 3* -- Т-127
		'a-20',         // 4  -- А-20 
		't-50',         // 4  -- Т-50
		'valentine_ll', // 4* -- Валентайн II
		't_50_2',       // 5  -- Т-50-2

		// Легкие танки Германии
		'ltraktor',     // 1  -- Leichttraktor
		'pz35t',        // 2  -- PzKpfw 35 (t)
		'pzii',         // 2  -- PzKpfw II
		'pzi',          // 2  -- Pz.Kpfw. I 
		'h39_captured', // 2* -- PzKpfw 38H735 (f)
		'pz38t',        // 3  -- PzKpfw 38 (t)
		'pziii_a',      // 3  -- PzKpfw III Ausf. A
		'pzi_ausf_c',   // 3  -- Pz.Kpfw. I Ausf. C
		'pz_ii_ausfg',  // 3  -- Pz.Kpfw. II Ausf. G
		'pzii_j',       // 3* -- PzKpfw II Ausf. J
		't-15',         // 3* -- T-15
		'pzii_luchs',   // 4  -- PzKpfw II Luchs
		'pz38_na',      // 4  -- PzKpfw 38 nA
		'vk1602',       // 5  -- VK 1602 Leopard
		'vk2801',       // 6  -- VK 2801

		// Легкие танки США
		't1_cunningham', // 1  -- T1 Cunningham
		'm2_lt',         // 2* -- M2 Light Tank
		't2_lt',         // 2* -- T2 Light Tank
		't1_e6',         // 2* -- T1E6
		'm3_stuart',     // 3  -- M3 Stuart
		'mtls-1g14',     // 3* -- MTLS-1G14
		'm22_locust',    // 3* -- M22 Locust
		'm5_stuart',     // 4  -- M5 Stuart
		'm24_chaffee',   // 5  -- M24 Chaffee
		't21',           // 6  -- T21
		't71',           // 7  -- T71

		// Легкие танки Франции
		'renaultft',     // 1  -- RenaultFT
		'hotchkiss_h35', // 2  -- Hotchkiss H35
		'd1',            // 2  -- D1
		'amx38',         // 3  -- AMX 38
		'amx40',         // 4  -- AMX 40
		'elc_amx',       // 5  -- ELC AMX
		'amx_12t',       // 6  -- AMX 12t
		'amx_13_75',     // 7  -- AMX 13 75
		'amx_13_90',     // 8  -- AMX 13 90
		
		// Легкие танки Великобритании
		'gb03_cruiser_mk_i',   // 2  -- Cruiser Mk. I
		'gb58_cruiser_mk_iii', // 2  -- Cruiser Mk. III
		'gb69_cruiser_mk_ii',  // 3  -- Cruiser Mk. II
		'gb59_cruiser_mk_iv',  // 3  -- Cruiser Mk. IV
		'gb04_valentine',      // 4  -- Valentine
		'gb60_covenanter',     // 4  -- Covenanter
		'gb20_crusader',       // 5  -- Crusader
		
		// Легкие танки Китая
		'ch06_renault_nc31',          // 1  -- Renault NC-31
		'ch07_vickers_mke_type_bt26', // 2  -- Vickers Mk. E Type B
		'ch08_type97_chi_ha',         // 3  -- Type 2597 Chi-Ha
		'ch09_m5',                    // 4  -- M5A1 Stuart
		'ch15_59_16',                 // 6  -- 59-16
		'ch02_type62',                // 7* -- Type 62
		'ch16_wz_131',                // 7  -- WZ-131
		'ch17_wz131_1_wz132'          // 8  -- WZ-132
	]

	atype[2] = [    // 'mt', патч 0.8.4
		// Средние танки СССР
		't-28',          // 4  -- Т-28
		'a-32',          // 4* -- А-32
		't-34',          // 5  -- Т-34
		'matilda_ii_ll', // 5* -- Матильда IV
		't-34-85',       // 6  -- Т-34-85
		't-43',          // 7  -- Т-43
		'kv-13',         // 7  -- КВ-13
		't-44',          // 8  -- Т-44
		't-54',          // 9  -- Т-54
		't62a',          // 10 -- Т-62А
		
		// Средние танки Германии
		's35_captured',       // 3* -- PzKpfw S35 739 (f)
		'pziii',              // 4  -- PzKpfw III
		'pziv',               // 5  -- PzKpfw IV
		'pziii_iv',           // 5  -- PzKpfw III/IV
		't-25',               // 5* -- T-25
		'pziv_hydro',         // 5* -- PzKpfw IV Hydraulic
		'vk3601h',            // 6  -- VK 3601 (H)
		'vk3001h',            // 6  -- VK 3001 (H)
		'vk3001p',            // 6  -- VK 3001 (P)
		'pzv_pziv',           // 6* -- PzKpfw V-IV
		'pzv_pziv_ausf_alfa', // 6* -- PzKpfw V-IV Alpha
		'pziv_schmalturm',    // 6* -- PzKpfw IV Schmalturm
		'pzv',                // 7  -- PzKpfw V Panther
		'vk3002db',           // 7  -- VK 3002 (DB)
		'panther_m10',        // 7* -- Panther-M10
		'panther_ii',         // 8  -- Panther II
		'e-50',               // 9  -- E-50
		'e50_ausf_m',         // 10 -- E-50 Ausf. M
		
		// Средние танки США
		't2_med',               // 2  -- T2 Medium Tank
		'm2_med',               // 3  -- M2 Medium Tank
		'm3_grant',             // 4  -- M3 Lee
		'm4_sherman',           // 5  -- M4 Sherman
		'm7_med',               // 5  -- M7
		'ram-ii',               // 5* -- Ram II
		'm4a2e4',               // 5* -- M4A2E4 Sherman
		'm4a3e8_sherman',       // 6  -- M4A3E8 Sherman
		'sherman_jumbo',        // 6  -- M4A3E2 Sherman Jumbo
		't20',                  // 7  -- T20
		'pershing',             // 8  -- M26 Pershing
		't26_e4_superpershing', // 8* -- T26E4 SuperPershing
		't69',                  // 8  -- T69
		'm46_patton',           // 9  -- M46 Patton
		't54e1',                // 9  -- T54E1
		'm48a1',                // 10 -- M48A1 Patton
		
		// Средние танки Франции
		'd2',               // 3  -- D2
		'lorraine40t',      // 9  -- Lorraine 40 t
		'bat_chatillon25t', // 10 -- Bat Chatillon 25 t
		
		// Средние танки Великобритании
		'gb01_medium_mark_i',         // 1  -- Vickers Medium Mk. I
		'gb05_vickers_medium_mk_ii',  // 2  -- Vickers Medium Mk. II
		'gb06_vickers_medium_mk_iii', // 3  -- Vickers Medium Mk. III
		'gb07_matilda',               // 4  -- Matilda
		'gb68_matilda_black_prince',  // 5* -- Matilda Black Prince
		'gb21_cromwell',              // 6  -- Cromwell
		'gb22_comet',                 // 7  -- Comet
		'gb23_centurion',             // 8  -- Centurion Mk. I
		'gb24_centurion_mk3',         // 9  -- Centurion Mk. 7/1
		'gb70_fv4202_105',            // 10 -- FV4202
		
		// Средние танки Китая
		'ch21_t34',    // 5  -- Type T-34
		'ch20_type58', // 6  -- Type 58
		'ch04_t34_1',  // 7  -- T-34-1
		'ch01_type59', // 8* -- Type 59
		'ch05_t34_2',  // 8  -- T-34-2
		'ch18_wz-120', // 9  -- WZ-120
		'ch19_121'    // 10 -- 121
	]

	atype[3] = [    // 'ht', патч 0.8.4
		// Тяжёлые танки СССР
		'kv1',           // 5  -- КВ-1
		'kv-220',        // 5* -- КВ-220 Бета-Тест
		'churchill_ll',  // 5* -- Черчилль III
		'kv-220_action', // 5* -- КВ-220
		'kv-1s',         // 6  -- КВ-1С
		'kv2',           // 6  -- КВ-2
		't150',          // 6  -- Т-150
		'is',            // 7  -- ИС
		'kv-3',          // 7  -- КВ-3
		'is-3',          // 8  -- ИС-3
		'object252',     // 8* -- ИС-6
		'kv4',           // 8  -- КВ-4
		'kv-5',          // 8* -- КВ-5
		'st_i',          // 9  -- СТ-I
		'is8',           // 9  -- ИС-8
		'is-4',          // 10 -- ИС-4
		'is-7',          // 10 -- ИС-7

		// Тяжёлые танки Германии
		'b-1bis_captured', // 4* -- PzKpfw B2 740 (f)
		'pzvi',            // 7  -- PzKpfw VI Tiger
		'pzvi_tiger_p',    // 7  -- PzKpfw VI Tiger (P)
		'pzvib_tiger_ii',  // 8  -- PzKpfw VIB Tiger II
		'vk4502a',         // 8  -- VK 4502 (P) Ausf. A
		'lowe',            // 8* -- Löwe
		'vk4502p',         // 9  -- VK 4502 (P) Ausf. B
		'e-75',            // 9  -- E-75
		'maus',            // 10 -- Maus
		'e-100',           // 10 -- E-100

		// Тяжёлые танки США
		't14',     // 5* -- T14
		't1_hvy',  // 5  -- T1 Heavy Tank
		'm6',      // 6  -- M6
		't29',     // 7  -- T29
		't34_hvy', // 8* -- T34
		't32',     // 8  -- T32
		'm6a2e1',  // 8* -- M6A2E1
		'm103',    // 9  -- M103
		't110',    // 10 -- T110E5
		't57_58',  // 10 -- T57 Heavy Tank

		// Тяжёлые танки Франции
		'b1',          // 4  -- B1
		'bdr_g1b',     // 5  -- BDR G1B
		'arl_44',      // 6  -- ARL 44
		'amx_m4_1945', // 7  -- AMX M4(1945)
		'amx_50_100',  // 8  -- AMX 50 100
		'fcm_50t',     // 8* -- FCM 50 t
		'amx_50_120',  // 9  -- AMX 50 120
		'f10_amx_50b', // 10 -- AMX 50B

		// Тяжёлые танки Великобритании
		'gb08_churchill_i',   // 5  -- Churchill I
		'gb09_churchill_vii', // 6  -- Churchill VII
		'gb63_tog_ii',        // 6* -- TOG II*
		'gb10_black_prince',  // 7  -- Black Prince
		'gb11_caernarvon',    // 8  -- Caernarvon
		'gb12_conqueror',     // 9  -- Conqueror
		'gb13_fv215b',        // 10 -- FV215b

		// Тяжёлые танки Китая
		'ch10_is2',       // 7  -- IS-2
		'ch03_wz-111',    // 8* -- WZ-111
		'ch11_110',       // 8  -- 110
		'ch12_111_1_2_3', // 9  -- WZ-111 model 1-4
		'ch22_113'       // 10 -- 113
	]

	atype[4] = [    // 'sp', патч 0.8.4
		// САУ СССР
		'su-18',      // 2  -- СУ-18
		'su-26',      // 3  -- СУ-26
		'su-5',       // 4  -- СУ-5
		'su-8',       // 5  -- СУ-8
		's-51',       // 6  -- С-51
		'su-14',      // 6  -- СУ-14
		'object_212', // 7  -- Объект 212
		'object_261', // 8  -- Объект 261

		// САУ Германии
		'bison_i',        // 2  -- Sturmpanzer I Bison
		'sturmpanzer_ii', // 3  -- Sturmpanzer II
		'wespe',          // 3  -- Wespe
		'grille',         // 4  -- Grille
		'hummel',         // 5  -- Hummel
		'g_panther',      // 6  -- GW Panther
		'g_tiger',        // 7  -- GW Tiger
		'g_e',            // 8  -- GW Typ E

		// САУ США
		't57',       // 2  -- T57
		'm37',       // 3  -- M37
		'm7_priest', // 4  -- M7 Priest
		'm41',       // 5  -- M41
		'm12',       // 6  -- M12
		'm40m43',    // 7  -- M40/M43
		't92',       // 8  -- T92

		// САУ Франции
		'renaultbs',        // 2  -- RenaultBS
		'lorraine39_l_am',  // 3  -- Lorraine39 L AM
		'_105_lefh18b2',    // 4* -- 105 leFH18B2
		'amx_105am',        // 4  -- AMX 105AM
		'amx_13f3am',       // 5  -- AMX 13 F3 AM
		'lorraine155_50',   // 6  -- Lorraine155 50
		'lorraine155_51',   // 7  -- Lorraine155 51
		'bat_chatillon155'  // 8  -- Bat Chatillon 155
	]

	atype[5] = [    // 'at', патч 0.8.4
		// ПТ-САУ СССР
		'at-1',       // 2  -- АТ-1
		'su-76',      // 3  -- СУ-76
		'gaz-74b',    // 4  -- СУ-85Б
		'su-85',      // 5  -- СУ-85
		'su_85i',     // 5* -- СУ-85И
		'su-100',     // 6  -- СУ-100
		'su100y',     // 6* -- СУ-100Y
		'su-152',     // 7  -- СУ-152
		'su100m1',    // 7  -- СУ-100М1
		'su122_44',   // 7* -- СУ-122-44
		'isu-152',    // 8  -- ИСУ-152
		'su-101',     // 8  -- СУ-101
		'object_704', // 9  -- Объект 704
		'su122_54',   // 9  -- СУ-122-54
		'object268',  // 10 -- Объект 268
		'object263',  // 10 -- Объект 263

		// ПТ-САУ Германии
		'panzerjager_i',       // 2  -- Panzerjäger I
		'g20_marder_ii',       // 3  -- Marder II
		'hetzer',              // 4  -- Hetzer
		'stugiii',             // 5  -- StuG III
		'jagdpziv',            // 6  -- JagdPz IV
		'dickermax',           // 6* -- Dicker Max
		'jagdpanther',         // 7  -- Jagdpanther
		'ferdinand',           // 8  -- Ferdinand
		'jagdpantherii',       // 8  -- Jagdpanther II
		'jagdtiger_sdkfz_185', // 8* -- 8,8 cm PaK 43 Jagdtiger
		'jagdtiger',           // 9  -- Jagdtiger
		'jagdpz_e100',         // 10 -- JagdPz E-100

		// ПТ-САУ США
		't18',           // 2  -- T18
		't82',           // 3  -- T82
		't40',           // 4  -- T40
		'm8a1',          // 4  -- M8A1
		'm10_wolverine', // 5  -- M10 Wolverine
		't49',           // 5  -- T49
		'm36_slagger',   // 6  -- M36 Jackson
		'm18_hellcat',   // 6  -- M18 Hellcat
		't25_at',        // 7  -- T25 AT
		't25_2',         // 7  -- T25/2
		't28',           // 8  -- T28
		't28_prototype', // 8  -- T28 Prototype
		't30',           // 9  -- T30
		't95',           // 9  -- T95
		't110e4',        // 10 -- T110E4
		't110e3',        // 10 -- T110E3

		// ПТ-САУ Франции
		'renaultft_ac',   // 2  -- RenaultFT AC
		'fcm_36pak40',    // 3* -- FCM36 PaK40
		'renaultue57',    // 3  -- Renault UE 57
		'somua_sau_40',   // 4  -- Somua SAu-40
		's_35ca',         // 5  -- S-35 CA
		'arl_v39',        // 6  -- ARL V39
		'amx_ac_mle1946', // 7  -- AMX AC Mle. 1946
		'amx_ac_mle1948', // 8  -- AMX AC Mle. 1948
		'amx50_foch',     // 9  -- AMX 50 Foch
		'amx_50fosh_155', // 10 -- AMX-50 Foch (155)

		// ПТ-САУ Великобритании
		'gb39_universal_carrierqf2',  // 2  -- Universal Carrier 2-pdr
		'gb42_valentine_at',          // 3  -- Valentine AT
		'gb57_alecto',                // 4  -- Alecto
		'gb73_at2',                   // 5  -- AT 2
		'gb74_at8',                   // 6  -- AT 8
		'gb40_gun_carrier_churchill', // 6  -- Churchill Gun Carrier
		'AT 7',                       // 7  -- AT 7
		'gb71_at_15a',                // 7* -- AT 15A
		'gb72_at15',                  // 8  -- AT 15
		'gb32_tortoise',              // 9  -- Tortoise
		'gb48_fv215b_183'             // 10 -- FV215b (183)
	]

	prem = [    // патч 0.8.4
		// Прем-техника СССР
		'tetrarch_ll',  // 2* -- Тетрарх
		'bt-sv',        // 3* -- БТ-СВ
		'm3_stuart_ll', // 3* -- М3 лёгкий
		't-127',        // 3* -- Т-127
		'valentine_ll', // 4* -- Валентайн II

		'a-32',          // 4* -- А-32
		'matilda_ii_ll', // 5* -- Матильда IV
		
		'kv-220',        // 5* -- КВ-220 Бета-Тест
		'churchill_ll',  // 5* -- Черчилль III
		'kv-220_action', // 5* -- КВ-220
		'object252',     // 8* -- ИС-6
		'kv-5',          // 8* -- КВ-5

		'su_85i',     // 5* -- СУ-85И
		'su100y',     // 6* -- СУ-100Y
		'su122_44',   // 7* -- СУ-122-44

		// Прем-техника Германии
		'h39_captured', // 2* -- PzKpfw 38H735 (f)
		'pzii_j',       // 3* -- PzKpfw II Ausf. J
		't-15',         // 3* -- T-15

		's35_captured',       // 3* -- PzKpfw S35 739 (f)
		't-25',               // 5* -- T-25
		'pziv_hydro',         // 5* -- PzKpfw IV Hydraulic
		'pzv_pziv',           // 6* -- PzKpfw V-IV
		'pzv_pziv_ausf_alfa', // 6* -- PzKpfw V-IV Alpha
		'pziv_schmalturm',    // 6* -- PzKpfw IV Schmalturm
		'panther_m10',        // 7* -- Panther-M10

		'b-1bis_captured', // 4* -- PzKpfw B2 740 (f)
		'lowe',            // 8* -- Löwe
		
		'dickermax',           // 6* -- Dicker Max
		'jagdtiger_sdkfz_185', // 8* -- 8,8 cm PaK 43 Jagdtiger

		// Прем-техника США
		'm2_lt',         // 2* -- M2 Light Tank
		't2_lt',         // 2* -- T2 Light Tank
		't1_e6',         // 2* -- T1E6
		'mtls-1g14',     // 3* -- MTLS-1G14
		'm22_locust',    // 3* -- M22 Locust

		'ram-ii',               // 5* -- Ram II
		'm4a2e4',               // 5* -- M4A2E4 Sherman
		't26_e4_superpershing', // 8* -- T26E4 SuperPershing
		
		't14',     // 5* -- T14
		't34_hvy', // 8* -- T34
		'm6a2e1',  // 8* -- M6A2E1

		// Прем-техника Франции
		'fcm_50t',     // 8* -- FCM 50 t
		
		'_105_lefh18b2',    // 4* -- 105 leFH18B2

		'fcm_36pak40',    // 3* -- FCM36 PaK40

		// Прем-техника Великобритании
		'gb68_matilda_black_prince',  // 5* -- Matilda Black Prince
		
		'gb63_tog_ii',        // 6* -- TOG II*

		'gb71_at_15a',                // 7* -- AT 15A

		// Прем-техника Китая
		'ch02_type62',                // 7* -- Type 62

		'ch01_type59', // 8* -- Type 59

		'ch03_wz-111'     // 8* -- WZ-111
	]

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
		th.innerHTML = (lang == "ru") ? "Процент побед" : "Winrate";
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

				// при увеличении высоты ячейки флаг должен быть центрирован, как и иконка танка:
				yd[i].style.cssText = "background-position: left center"; 
				
				// название танка не должно переноситься по пробелу (например, "PzKpfw VI Tiger" -- "(P)"):
				yd[i + 1].style.cssText = "white-space: nowrap";

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
					if(b != oldStat.b) {
						yd[i+1].innerHTML += " <br><span style='font-size:11px;'>("+ (w-oldStat.w) + "/" + (b-oldStat.b) + "/"+col((w-oldStat.w)/(b-oldStat.b)*100)+"%/"+col2((w/b - oldStat.w/oldStat.b)*100) +")</span>";
					}
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
	insertNewTr(NewtrParent,(lang == "ru") ? captColor("Удельная эффективность") : captColor("Specific performance"), "", "");
	insertNewTr(NewtrParent,(lang == "ru") ? "Повреждений за бой:" : "Damage per battle:", (damag/battle).toFixed(0), "");
	insertNewTr(NewtrParent,(lang == "ru") ? "Фрагов за бой:" : "Frags per battle:" ,(frags/battle).toFixed(2), "");
	insertNewTr(NewtrParent,(lang == "ru") ? "Обнаружено за бой:" : "Spotted per battle:", (spotted/battle).toFixed(2), "");
	insertNewTr(NewtrParent,(lang == "ru") ? "Очков защиты за бой:" : "Defence points per battle:", (defs/battle).toFixed(2), "");
	insertNewTr(NewtrParent,(lang == "ru") ? "Очков захвата за бой:" : "Capture points per battle:", (caps/battle).toFixed(2), "");

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
	insertNewTr(NewtrParent,(lang == "ru") ? "Рейтинг эффективности (старый):" : "Efficiency rating (old):", effColor(eff/all_b, 2), "");
	
	var eff2 = damag*(10/(ml + 2.0))*(0.23+ml*0.02) + frags*250 + spotted*150 + Math.log(caps/all_b + 1.0)/Math.log(1.732)*all_b*150 + defs*150; 
	insertNewTr(NewtrParent,(lang == "ru") ? "Рейтинг эффективности (новый):" : "Efficiency rating (new):", eff2Color(eff2/all_b, 2), "");

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

	// Рейтинг эффективности WN6
	var ml_min = Math.min(ml, 6);	
	var wn6 = 
		(
			frags * (1240 - 1040 / Math.pow(ml_min, 0.164)) +
			damag * 530 / (184 * Math.exp(0.24 * ml) + 130) +
			spotted * 125 +
			defs * 100
		) / all_b  + 
		((185 / (0.17 + Math.exp((100 * wins/all_b - 35) * (-0.134)) )) - 500) * 0.45 +
		(6 - ml_min) * (-60);

	insertNewTr(NewtrParent,(lang == "ru") ?" Рейтинг WN6:" : "WN6 rating:", wn6Color(wn6, 2), "");
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
		for (var j = 1; j < NatCount; j++)
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
		var color = "D042F3";             // от 64, фиолетовый
		if (v < 64) color = "02C9B3";     // от 57 до 64, бирюзовый
		if (v < 57) color = "60FF00";     // от 52 до 57, зеленый
		if (v < 52) color = "F8F400";     // от 49 до 52, жёлтый
		if (v < 49) color = "FE7903";     // от 47 до 49, оранжевый
		if (v < 47) color = "FE0E00";     // меньше 47, красный

		return "<font color='"+color+"'>"+v.toFixed(digit)+"</font>";
	}

	function col2(v)
	{
		if (isNaN(v)) v = 0;
		var color = "90ffff";        // от 10, ярко-белый
		if (v<10) color="90ff90"     // от 5 до 10, тусклозеленый
		if (v<5) color="babfba"      // дефолтный серенький
		if (v<0) color="ffff90"      // желтоватый
		if (v<-5) color="ff9090"     // красный
		v = v.toFixed(2);
		if (v>=0)
			v = "+"+v;
		return "<font color='"+color+"'>"+v+"</font>";
	}
	function effColor(v, digit)    // цвета рейтинга эффективности
	{
		if(isNaN(v)) return "x";
		var color = "D042F3";              // от 1800, фиолетовый
		if (v < 1800) color = "02C9B3";    // от 1500 до 1800, бирюзовый
		if (v < 1500) color = "60FF00";    // от 1200 до 1500, зеленый
		if (v < 1200) color = "F8F400";    // от 900 до 1200, жёлтый
		if (v < 900) color = "FE7903";     // от 600 до 900, оранжевый
		if (v < 600) color = "FE0E00";     // меньше 600, красный
		return "<font color='"+color+"'>"+v.toFixed(digit)+"</font>";
	}
	
	function eff2Color(v, digit)    // цвета рейтинга эффективности 2 (нового рейтинга)
	{
		if(isNaN(v)) return "x";
		var color = "D042F3";              // больше 1725, фиолетовый
		if (v < 1725) color = "02C9B3";    // от 1465 до 1725, бирюзовый
		if (v < 1465) color = "60FF00";    // от 1150 до 1465, зеленый
		if (v < 1150) color = "F8F400";    // от 870 до 1150, жёлтый
		if (v < 870) color = "FE7903";     // от 645 до 870, оранжевый
		if (v < 645) color = "FE0E00";     // меньше 645, красный
		return "<font color='"+color+"'>"+v.toFixed(digit)+"</font>";
	}

	function wn6Color(v, digit)    // цвета рейтинга wn6
	{
		if(isNaN(v)) return "x";
		var color = "D042F3";              // больше 1880, фиолетовый
		if (v < 1880) color = "02C9B3";    // от 1585 до 1880, бирюзовый
		if (v < 1585) color = "60FF00";    // от 1195 до 1585, зеленый
		if (v < 1195) color = "F8F400";    // от 800 до 1195, жёлтый
		if (v < 800) color = "FE7903";     // от 435 до 800, оранжевый
		if (v < 435) color = "FE0E00";     // меньше 435, красный
		return "<font color='"+color+"'>"+v.toFixed(digit)+"</font>";
	}

	function captColor(capt)	// цвет заголовка
	{
		return "<font color='FFA759'>"+capt+"</font>";
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
