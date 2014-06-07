// ==UserScript==
// @author klensy
// @name WoTStats_test
// @version 0.8.5.2
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
var all_battles;
var lang;

if(document.title.indexOf("Профиль игрока")>-1)	lang="ru";
if (window.location.host.indexOf("worldoftanks") > -1 && window.location.href.indexOf("accounts") > -1) {
main();
}
function main() {
	var daypassed = (new Date() - new Date(document.getElementsByClassName("b-data-create")[0].childNodes[1].getAttribute("data-timestamp") * 1000)) / 1000 / 60 / 60 / 24;
	var timeDiv = document.getElementsByClassName("b-data-date")[0];
	var timeStamp = new Date(Number(timeDiv.childNodes[1].getAttribute("data-timestamp")) * 1000);
	timeDiv.innerHTML += "<p/>" + (lang == "ru" ? "Версия <a href='http://forum.worldoftanks.ru/index.php?/topic/717208-'>скрипта</a> " : " <a href='http://forum.worldoftanks.ru/index.php?/topic/717208-'>Script</a> version ")
	+ "0.8.5.2 <br>"
	+ "<a href='http://forum.worldoftanks.ru/index.php?/topic/566557-'>" + (lang == "ru" ? "Тема первого автора" : "First author theme") + "</a> "
	+ "<p/> <font onclick='WriteStat();' style='cursor:pointer; color:white; text-decoration:underline'>" + ((lang == "ru") ? "Сохранить текущую стату" : "Save statistic") + "</font>";

	var dayArray = [];
	var old_battles =0;
	var old_wins =0;
	var newBattlesStats = [];
	var playerNick = document.getElementsByTagName("h1")[0].innerHTML;
 
	var daystat = getCookie("daystat");
	if (daystat == null) {
		var needWrite = true;
	}
	else {
//<-Блок заполнения таблицы рейтингов
		var strArray = daystat.split("/");
		var str = strArray[0].split(";");
		timeStat = new Date(str[0]);	
		if (timeStamp - timeStat !=0||true) {
			if (timeStat.toLocaleFormat)
				oldTime = timeStat.toLocaleFormat("%d.%m.%Y %H:%M") 
			else
				oldTime =  timeStat.toLocaleString().substr(0, timeStat.toLocaleString().lastIndexOf(":"));
				
			timeDiv.innerHTML += "<p/>"+((lang == "ru") ? " Сравнение с данными на ": "Compare with ") +  oldTime;
			if (str.length > 3)	{		
				var tres = document.getElementsByClassName("t-statistic")[0];
				j = 1;
				for (var i = 4; i < str.length - 1; i++) {
					var diff = toFl(tres.rows[j].cells[3].innerHTML) - Number(str[i]);	
					if (diff) tres.rows[j].cells[3].innerHTML+="<span style='font-size:11px;'>/"+((diff>0)?"+":"")+diff+"</span>";
					
					newBattlesStats.push(diff);
					
					i++;	
					var r = tres.rows[j].cells[4].getElementsByTagName("a")[0];
					resText = r == undefined ? tres.rows[j].cells[4].innerHTML: r.innerHTML ;

					var diff = toFl(resText) - Number(str[i]);	
					if (diff) // reversed '^' and 'v' by colors, klensy
						tres.rows[j].cells[4].innerHTML+="<span style='font-size:11px;'>/"+((diff>0)?"<font color=red>^</font>"+diff:"<font color=green>v</font>"+(-diff))+"</span>";	
					j++;
				}
			}
			for (var i = 1; i < strArray.length; i++) {
				str = strArray[i].split(";")
				tName = str[0].toLowerCase()
				dayArray[tName] = new Object();
				dayArray[tName].b = toFl(str[1]);	
				dayArray[tName].w = toFl(str[2]);	
			}
		}
//->Блок заполнения таблицы рейтингов		
	}
	
	var server = document.location.host.match(/\.([^\.]+)$/)[1].toUpperCase();
	server = server == "COM"?"NAm" : server;	
	timeDiv.innerHTML += "<a href='http://td82.ru/wotka?nickname="+document.getElementsByTagName("h1")[0].innerHTML+"&server="+server+"'>"
	+ ((lang == "ru") ? "История кланов": "Clan history")+"</a>";
		
//<-Блок задания размеров основных элементов страницы
	try {
		document.getElementsByClassName("l-content")[0].style.width = "786px";
		document.getElementsByClassName("l-sidebar")[0].style.width = "144px"; 
		document.getElementsByClassName("b-context-menu")[0].style.width = "144px";
		document.getElementsByClassName("t-statistic")[0].style.width = "120%";
		document.getElementsByClassName("t-statistic")[1].style.width = "120%";
		document.getElementsByClassName("t-result")[0].style.width = "120%";
	}
	catch (e) {
		document.getElementsByClassName("l-content")[0].parentNode.innerHTML = 	document.getElementsByClassName("l-content")[0].parentNode.innerHTML.replace('"l-content"', '"l-content" style="width: 786px;"');   
		document.getElementsByClassName("l-sidebar")[0].parentNode.innerHTML = 	document.getElementsByClassName("l-sidebar")[0].parentNode.innerHTML.replace('"l-sidebar"', '"l-sidebar" style="width: 144px;"');   
		document.getElementsByClassName("b-context-menu")[0].parentNode.innerHTML = 	document.getElementsByClassName("b-context-menu")[0].parentNode.innerHTML.replace('"b-context-menu"', '"b-context-menu" style="width: 144px;"');   
		document.getElementsByClassName("t-statistic")[0].parentNode.innerHTML = 	document.getElementsByClassName("t-statistic")[0].parentNode.innerHTML.replace('"t-statistic"', '"t-statistic" style="width: 120%;"');   
		document.getElementsByClassName("t-statistic")[1].parentNode.innerHTML = 	document.getElementsByClassName("t-statistic")[1].parentNode.innerHTML.replace('"t-statistic"', '"t-statistic" style="width: 140%;"');   
		document.getElementsByClassName("t-result")[0].parentNode.innerHTML = 	document.getElementsByClassName("t-result")[0].parentNode.innerHTML.replace('"t-result"', '"t-result" style="width: 120%;"');
	}
//->Блок задания размеров основных элементов страницы

//<-Блок внедрения скриптов
	setup_script (sortTd);
	setup_script (toType);
	setup_script (WriteStat);
	setup_script (hideTypes);	
	setup_script (toFl);
	setup_script (col);
	setup_script (col2);
	setup_script (setCookie);
//->Блок внедрения скриптов	
//<-Блок инициализации основных переменных
	var atype = [];
	//atype[1] = [];
	atype[1] = //'lt', 0.8.4,  added new germany tanks
	['t2_lt', 'tetrarch_ll', 'renaultft', 'd1', 'hotchkiss_h35', 'amx38', 'amx40', 'elc_amx', 'amx_12t', 'amx_13_75', 'amx_13_90', 'm22_locust', 'pzii_j', 'm24_chaffee', 't-50', 't_50_2', 'vk2801', 't-15', 'ms-1', 'ltraktor', 't1_cunningham', 't-26', 'bt-2', 'pzii', 'pz35t', 'm2_lt', 't-46', 'bt-7', 'pziii_a', 'pzii_luchs', 'pz38t', 'm3_stuart', 'a-20', 'vk1602', 'pz38_na', 'm5_stuart', 'm3_stuart_ll', 'ch02_type62', 'bt-sv', 't-127', 'valentine_ll', 'h39_captured', 'gb03_cruiser_mk_i', 'gb58_cruiser_mk_iii', 'gb69_cruiser_mk_ii', 'gb59_cruiser_mk_iv', 'gb04_valentine', 'gb60_covenanter', 'gb20_crusader', 't21', 't71', 't1_e6', 'ch06_renault_nc31', 'ch07_vickers_mke_type_bt26', 'ch08_type97_chi_ha', 'ch09_m5', 'ch15_59_16', 'ch16_wz_131', 'ch17_wz131_1_wz132', 'pzi', 'pzi_ausf_c',  'pz_ii_ausfg', 't-60', 't-70', 't80', 'auf_panther']

	atype[2] = //'mt', 0.8.3, added china tanks, fixed gb70_fv4202_105 mt
	['t-25', 'd2', 'bat_chatillon25t', 'lorraine40t', 'sherman_jumbo', 'ch01_type59', 's35_captured', 'pzv_pziv', 'pzv_pziv_ausf_alfa', 'mtls-1g14', 'm4a2e4', 'ram-ii', 'matilda_ii_ll', 'gb68_matilda_black_prince', 't2_med', 'm2_med', 't-28', 'pziii', 'm3_grant', 't-34', 'pziv', 'pziii_iv', 'm4_sherman', 'm7_med', 't-34-85', 'vk3601h', 'vk3001h', 'vk3001p', 'm4a3e8_sherman', 'pziv_schmalturm', 'panther_m10', 't26_e4_superpershing', 't-43', 'kv-13', 'vk3002db', 'pzv', 't20', 't-44', 'panther_ii', 't23', 'pershing', 'm48a1', 't-54', 't62a', 'e-50', 'e50_ausf_m', 'pziv_hydro', 't23', 'm46_patton', 'gb01_medium_mark_i', 'gb05_vickers_medium_mk_ii', 'gb06_vickers_medium_mk_iii', 'gb07_matilda', 'gb68_matilda_black_prince', 'gb21_cromwell', 'gb22_comet', 'gb23_centurion', 'gb24_centurion_mk3', 'a-32', 't69', 't54e1', 'ch21_t34', 'ch20_type58', 'ch04_t34_1', 'ch05_t34_2', 'ch18_wz-120', 'ch19_121', 'gb70_fv4202_105', 'vk2001db', 'vk3002db_v1', 'indien_panzer', 'pro_ag_a', 'leopard1']

	atype[3] = //'ht', 0.8.3, added china tanks
	['b1', 'bdr_g1b', 'arl_44', 'amx_m4_1945', 'amx_50_100', 'amx_50_120', 'f10_amx_50b', 'lowe', 'kv-220_action', 'kv-220', 'kv-5', 'b-1bis_captured', 'churchill_ll', 't14', 'm6a2e1', 'kv', 'kv1', 'kv2', 'kv4', 'is8', 'object252', 'st_i', 't150', 't1_hvy', 'kv-3', 'kv-1s', 'm6', 'is', 'pzvi', 'pzvi_tiger_p', 't29', 'is-3', 'pzvib_tiger_ii', 'vk4502a', 't32', 'is-4', 'vk4502p', 'e-75', 't34_hvy', 'm103', 't110', 'is-7', 'maus', 'e-100', 'gb08_churchill_i', 'gb09_churchill_vii', 'gb10_black_prince', 'gb11_caernarvon', 'gb12_conqueror', 'gb13_fv215b', 't57_58', 'gb63_tog_ii', 'ch10_is2', 'ch11_110', 'ch12_111_1_2_3', 'ch22_113', 'fcm_50t']

	atype[4] = //'sp', 0.8.4 added sexton_i
	['su-18', 'bison_i', 't57', '_105_lefh18b2', 'su-26', 'wespe', 'sturmpanzer_ii', 'm37', 'su-5', 'grille', 'm7_priest', 'su-8', 'hummel', 'm41', 'su-14', 's-51', 'g_panther', 'm12', 'object_212', 'g_tiger', 'm40m43', 'object_261', 'g_e', 'renaultbs', 'lorraine39_l_am', 'amx_105am', 'amx_13f3am', 'bat_chatillon155', 'lorraine155_50', 'lorraine155_51', 't92', 'sexton_i']

	atype[5] = //at , 0.8.4 added uk at
	['at-1', 'panzerjager_i', 't18', 'su-76', 'g20_marder_ii', 't82', 'fcm_36pak40', 'm8a1', 't49', 'gaz-74b', 'hetzer', 't40', 'su-85', 'su_85i', 'stugiii', 'm10_wolverine', 'su-100', 'su-101', 'su100m1', 'su122_54', 'object263', 'su122_44', 'jagdpziv', 'm36_slagger', 'm18_hellcat', 'su-152', 'jagdpanther', 'jagdpantherii', 't25_at', 't25_2', 'isu-152', 'ferdinand', 't28', 't28_prototype', 'object_704', 'object268', 'jagdtiger', 'jagdtiger_sdkfz_185', 't95', 'dickermax', 'jagdpz_e100', 't110e4', 't110e3', 'amx_50fosh_155', 'renaultft_ac', 'renaultue57', 'somua_sau_40', 's_35ca', 'arl_v39', 'amx_ac_mle1946', 'amx_ac_mle1948', 'amx50_foch', 't30', 'gb71_at_15a', 'su100y', 'gb39_universal_carrierqf2', 'gb57_alecto', 'gb42_valentine_at', 'gb73_at2', 'gb75_at7', 'gb40_gun_carrier_churchill', 'gb74_at8', 'gb72_at15', 'gb32_tortoise', 'gb48_fv215b_183']

	prem = // 0.8.2 added su100y
	['tetrarch_ll', 'm3_stuart_ll', 'bt-sv', 't-127', 'valentine_ll', 'a-32', 'churchill_ll', 'matilda_ii_ll', 'gb68_matilda_black_prince', 'kv-220_action', 'kv-220', 'kv-5', 'object252', 't26_e4_superpershing', 'jagdtiger_sdkfz_185', 't34_hvy', 'h39_captured', 'pzii_j', 's35_captured', 't-15', 'b-1bis_captured', 't-25', 'pzv_pziv', 'pzv_pziv_ausf_alfa', 'lowe', 't2_lt', 'mtls-1g14', 'm22_locust', 'm4a2e4', 'ram-ii', 't14', 'm6a2e1', 'su_85i', 'pziv_hydro', '_105_lefh18b2', 'fcm_36pak40', 'dickermax', 'ch02_type62', 'ch01_type59', 'su122_44', 'panther_m10', 'pziv_schmalturm', 'gb63_tog_ii', 'gb71_at_15a', 'fcm_50t', 'su100y', 't1_e6']

	//http://dl.dropbox.com/u/2984537/wot/stats/json
	
	var tankS = [];
	
	for (var fc=1; fc<6; fc++) {
		for (var sc=0; sc<atype[fc].length; sc++) {
			if (tankS.indexOf(atype[fc][sc]) === -1) {
				tankS.push(atype[fc][sc]);
			}
		}
	}
	
	//В топку такое определение - кто-то уже забыл китайцев сюда добавить
	//["_105_lefh18b2","jagdtiger_sdkfz_185","amx_105am","amx_12t","amx_13_75","amx_13_90","amx_13f3am","amx38","amx40","amx_50_100","amx_50_120","amx50_foch","f10_amx_50b","amx_50fosh_155","amx_ac_mle1948","amx_ac_mle1946","amx_m4_1945","arl_44","arl_v39","gb71_at_15a","b1","bat_chatillon155","bat_chatillon25t","bdr_g1b","gb10_black_prince","gb11_caernarvon","gb23_centurion","gb24_centurion_mk3","churchill_ll","gb08_churchill_i","gb09_churchill_vii","gb22_comet","gb12_conqueror","gb60_covenanter","gb21_cromwell","gb03_cruiser_mk_i","gb69_cruiser_mk_ii","gb58_cruiser_mk_iii","gb59_cruiser_mk_iv","gb20_crusader","d1","d2","dickermax","e-100","e-50","e-75","e50_ausf_m","elc_amx","fcm_50t","fcm_36pak40","ferdinand","gb13_fv215b","gb70_fv4202_105","grille","g_panther","g_tiger","g_e","hetzer","hotchkiss_h35","hummel","jagdpanther","jagdpantherii","jagdpz_e100","jagdpziv","jagdtiger","ltraktor","lorraine40t","lorraine155_50","lorraine155_51","lorraine39_l_am","lowe","m10_wolverine","m103","m12","m18_hellcat","m2_lt","m2_med","m22_locust","m24_chaffee","pershing","m3_grant","m3_stuart","m3_stuart_ll","m36_slagger","m37","m4_sherman","m40m43","m41","m46_patton","m48a1","m4a2e4","sherman_jumbo","m4a3e8_sherman","m5_stuart","m6","m6a2e1","m7_med","m7_priest","m8a1","g20_marder_ii","matilda_ii_ll","gb07_matilda","gb68_matilda_black_prince","maus","gb01_medium_mark_i","tetrarch_ll","mtls-1g14","observer","panther_ii","panther_m10","panzerjager_i","pziv_schmalturm","pz35t","pz38t","pz38_na","h39_captured","b-1bis_captured","pzii","pzii_j","pzii_luchs","pziii","pziii_a","pziii_iv","pziv","pziv_hydro","s35_captured","pzv","pzv_pziv","pzv_pziv_ausf_alfa","pzvi","pzvi_tiger_p","pzvib_tiger_ii","ram-ii","renaultue57","renaultbs","renaultft","renaultft_ac","s_35ca","somua_sau_40","stugiii","bison_i","sturmpanzer_ii","t-15","t-25","t-34","t1_cunningham","t1_hvy","t110e3","t110e4","t110","t14","t18","t1_e6","t2_lt","t2_med","t20","t25_at","t25_2","t26_e4_superpershing","t28","t28_prototype","t29","t30","t32","t34_hvy","t40","t49","t57","t62a","t82","t92","t95","gb63_tog_ii","ch01_type59","ch02_type62","valentine_ll","gb04_valentine","gb05_vickers_medium_mk_ii","gb06_vickers_medium_mk_ii","vk1602","vk2801","vk3001h","vk3001p","vk3002db","vk3601h","vk4502a","vk4502p","wespe","a-20","a-32","at-1","bt-2","bt-7","bt-sv","is","is-3","is-4","object252","is-7","is8","isu-152","kv1","kv-13","kv-1s","kv2","kv-220_action","kv-220","kv-3","kv-5","kv4","ms-1","object_212","object_261","object263","object268","object_704","s-51","st_i","su-100","su100m1","su122_44","su122_54","su-14","su-152","su-18","su-26","su-5","su-76","su-8","su-85","gaz-74b","su_85i","t-127","t150","t-26","t-28","t-34-85","t-43","t-44","t-46","t-50","t_50_2","t-54","su-101", 'pzi', 'pzi_ausf_c',  'pz_ii_ausfg', 'sexton_i', 'gb39_universal_carrierqf2', 'gb57_alecto', 'gb42_valentine_at', 'gb73_at2', 'gb75_at7', 'gb40_gun_carrier_churchill', 'gb74_at8', 'gb72_at15', 'gb32_tortoise', 'gb48_fv215b_183']
	var unofst = getCookie("wg_unoff_stat");
	if (unofst !== undefined)  {
		var medP = unofst.split(";");
	}
	else {
		urlproxy= "http://wot-crabe.ru/api/server_stats.json";
	if (window.opera && window.opera.defineMagicVariable){
			var t = document.createElement("script"); t.src = urlproxy; t._callback = outUnOffTankStat; document.body.appendChild(t);
		}
		else if (GM_xmlhttpRequest!=undefined)
			var GMTransport = GM_xmlhttpRequest({method: "GET", url: urlproxy, onload: function(response) {outUnOffTankStat(response.responseText);}});
		else {
			if (window.chrome && window.chrome.extension) url=urlproxy;
			req = new XMLHttpRequest();
			req.onreadystatechange = function(e) {
				if (req.readyState == 4)if(req.status == 200)	outUnOffTankStat(req.responseText);
			}             
			req.timeout = 120000;
			req.open("GET",url, true);
			req.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2000 00:00:00 GMT");
			try {
				req.send(null)
			}
			catch (e){}
		}
	//->Блок получения не официальной статистики по танкам
	
	medP = [];
	}
	//<-Блок получения не официальной статистики по танкам, спасибо Руслану aka ufaweb 
	
	
	urlproxy= "http://wot-noobs.ru/nubomer/?nick="+playerNick;
	if (window.opera && window.opera.defineMagicVariable){
			var t = document.createElement("script"); t.src = urlproxy; t._callback = outWotNoobStat; document.body.appendChild(t);
		}
		else if (GM_xmlhttpRequest!=undefined)
			var GMTransport = GM_xmlhttpRequest({method: "GET", url: urlproxy, onload: function(response) {outWotNoobStat(response.responseText);}});
		else {
			if (window.chrome && window.chrome.extension) url=urlproxy;
			req = new XMLHttpRequest();
			req.onreadystatechange = function(e) {
				if (req.readyState == 4)if(req.status == 200)	outWotNoobStat(req.responseText);
			}             
			req.timeout = 120000;
			req.open("GET",url, true);
			req.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2000 00:00:00 GMT");
			try {
				req.send(null)
			}
			catch (e){}
		}
	
	
	//-> Блок получения рангов Бронесайта
	var rangD = ['Виртуоз (>99%)', 'Мастер-танкист (>95%)', 'Танкист 1-го класса (>80%)', 'Танкист 2-го класса (>60%)', 'Танкист 3-го класса (>45%)', 'Оленевод 3-го класса (>30%)', 'Оленевод 2-го класса (>20%)', 'Оленевод 1-го класса (>10%)', 'Мастер-оленевод (>10%)'],
		rangA = ['cv','cm','c1','c2','c3','d3','d2','d1','dm'];
		
	var bssat = getCookie("bs_stat");
	if (bssat !== undefined)  {
		var bsRangs = bssat.split(";");
	}
	else {
		urlproxy= "http://armor.kiev.ua/wot/api.php";
	if (window.opera && window.opera.defineMagicVariable){
			var t = document.createElement("script"); t.src = urlproxy; t._callback = bsStat; document.body.appendChild(t);
		}
		else if (GM_xmlhttpRequest!=undefined)
			var GMTransport = GM_xmlhttpRequest({method: "GET", url: urlproxy, onload: function(response) {bsStat(response.responseText);}});
		else {
			if (window.chrome && window.chrome.extension) url=urlproxy;
			req = new XMLHttpRequest();
			req.onreadystatechange = function(e) {
				if (req.readyState == 4)if(req.status == 200)	bsStat(req.responseText);
			}             
			req.timeout = 120000;
			req.open("GET",url, true);
			req.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2000 00:00:00 GMT");
			try {
				req.send(null)
			}
			catch (e){}
		}
	bsRangs = false;
	}
	//Блок получения рангов Бронесайта

	var levOrder = ["X","IX","VIII","VII","VI","V","IV","III","II","I"];
	all_battles = 0;
	var all_wins = 0;
	var AvgLevOld = 0;
	var AvgLevNew = 0;
	
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
	var oxeff = 0, oxwn = 0;
	
	var tankLevels = new Object();
	var levtr = [];
	var tankTypes = new Object();
	var trTank = [];
//->Блок инициализации основных переменных
//<-Блок редактирования шапки таблицы танков
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
	th.title = (lang == "ru") ? "Неофициальный среднесерверный процент":
			"unofficial % on ru server";
	trth.appendChild(th);
	trth.innerHTML = trth.innerHTML.replace(/<th>/gm,"<th><div onclick='sortTd(this,0)' style = 'cursor: pointer'>")
	trth.innerHTML = trth.innerHTML.replace(/<th class="right"/gm,'<th class="right"><div onclick="sortTd(this,0)" style = "cursor: pointer"');
	trth.innerHTML = trth.innerHTML.replace(/<\/th>/gm,'</div></th>')
	var nsel = '<select name="Nation" onchange="hideTypes(this);" style="height:19px;font-size:12px;background-color:rgb(5, 7, 9) ; color: rgb(143, 147, 147)">';
	nsel +="<option value =0>"+((lang == "ru")?"Нация":"Nation")+"</option>";
	for (var j = 1; j<NatCount; j++) {
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
	th.innerHTML = th.innerHTML.replace('<select>','<select name="type" onchange = "hideTypes(this);" style="height:19px;font-size:12px;background-color:rgb(5, 7, 9) ; color: rgb(143, 147, 147)" >') ;
	//	+"<font style = 'cursor: pointer; font-size: 10px;' onclick='sortTd(this,0)'>"+"↓↑" +"</font>";
	trth.insertBefore(th, trth.cells[0]);
//->Блок редактирования шапки таблицы танков
//<-Блок расчета таблиц по типу и по уровню	
	var yd = document.getElementsByTagName('td');
	for (i = 0; i < yd.length; i++) {
		if( yd[i].className.indexOf("td-armory-icon")>1) {
			var b = toFl(yd[i+2].innerHTML);
			var w = toFl(yd[i+3].innerHTML);
			all_battles += b;
			all_wins += w;	

			if (yd[i].className.indexOf("js-uk td-armory-icon")==0) 			{uk_b += b; 	uk_w += w; 		nat = 6;}
			else if (yd[i].className.indexOf("js-france td-armory-icon")==0) 	{fr_b += b; 	fr_w += w; 		nat = 4;}
			else if( yd[i].className.indexOf("js-china td-armory-icon")==0) 	{chin_b += b; 	chin_w += w; 	nat = 5;}
			else if( yd[i].className.indexOf("js-ussr td-armory-icon")==0) 		{ussr_b += b; 	ussr_w += w; 	nat = 1;}
			else if( yd[i].className.indexOf("js-germany td-armory-icon")==0) 	{nazi_b+= b; 	nazi_w+= w; 	nat = 2;}
			else if( yd[i].className.indexOf("js-usa td-armory-icon")==0) 		{usa_b+= b; 	usa_w+= w; 		nat = 3;}

			levN = yd[i].getElementsByTagName('span')[0].innerHTML.replace(/<[^<]*>/g,"").replace(/\s/g,"");
			if (tankLevels[levN]==undefined){
				tankLevels[levN] = new Object();
				tankLevels[levN].b = 0;
				tankLevels[levN].w = 0;
				tankLevels[levN].t = [];
				for (var j=0;j<6;j++){
					tankLevels[levN].t[j] = new Object();	
					tankLevels[levN].t[j].b = 0;
					tankLevels[levN].t[j].w = 0;
				}
			}
			tankLevels[levN].b += b;
			tankLevels[levN].w += w;

//type
//			ttN = (lang == "ru") ? ttype[tank.indexOf(yd[i+1].innerHTML)]:
//				ttype[tankEn.indexOf(yd[i+1].innerHTML)];
//			ttN = (ttN == undefined )? 0 : ttN;
//                      
				
			ttN = 0;
			imgName = yd[i].getElementsByTagName('img')[0].src.match(/\/[^-]+-([^\/]*)\.png/)[1];
			for (var j = 1; j<6 ; j++) {
				if (atype[j].indexOf(imgName)>=0) {		
					ttN = j;
					break;
				}	
			}
//
			wikilink = yd[i+1].getElementsByTagName("a")[0]
			if(wikilink!=undefined)
				yd[i+1].innerHTML =yd[i+1].innerHTML.replace('a class="b-gray-link" href', "a style='color:#"+(prem.indexOf(imgName)>=0?"ffc363":"babfba")+"' href")

			tankType = "t"+ttN;
			if (tankTypes[tankType] == undefined) {
				tankTypes[tankType] = new Object();
				tankTypes[tankType].b = 0;
				tankTypes[tankType].w = 0;
				tankTypes[tankType].n = [];
				for (var j=1;j<NatCount;j++) {
					tankTypes[tankType].n[j] = new Object();	
					tankTypes[tankType].n[j].b = 0;
					tankTypes[tankType].n[j].w = 0;
				}
			}
			tankTypes[tankType].b += b;
			tankTypes[tankType].w += w;
			tankTypes[tankType].n[nat].b += b;
			tankTypes[tankType].n[nat].w += w;
			tankLevels[levN].t[ttN].b +=b;
			tankLevels[levN].t[ttN].w +=w;

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

			if(med == undefined) {
				addTd(trTankTable, "<font>x</font>", "right value"); }
			else
				{addTd(trTankTable, col2(a-med), "right value", med);}
			
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
//->динамика
			oldStat = dayArray[imgName];
			if (!needWrite) {
				if (oldStat!=undefined) {
					old_battles +=oldStat.b;
					old_wins +=oldStat.w;
				}
				else {
					oldStat = new Object();
					oldStat.b=0;
					oldStat.w=0;
				}
				if(b!=oldStat.b)
				yd[i+1].innerHTML += " <span style='font-size:11px;'>("+ (w-oldStat.w) + "/" + (b-oldStat.b) + "/"+col((w-oldStat.w)/(b-oldStat.b)*100, 2)+"%/"+col2((w/b - oldStat.w/oldStat.b)*100) +")</span>";   	
				yd[i+1].title=FoundProc(w,b);
				
				levN = yd[i].getElementsByTagName('span')[0].innerHTML.replace(/<[^<]*>/g,"").replace(/\s/g,"");
				if(b!=oldStat.b) AvgLevNew += (10-levOrder.indexOf(levN))*(b-oldStat.b);
				AvgLevOld += (10-levOrder.indexOf(levN))*oldStat.b;
//<-
			}
		} 
	}
//->Блок расчета таблиц по типу и по уровню	
	LeftParent = document.getElementsByClassName("t-table-dotted")[0].rows[document.getElementsByClassName("t-table-dotted")[0].rows.length-1].cells[0].parentNode.parentNode;
	MiddleParent = document.getElementsByClassName("t-table-dotted")[1].rows[document.getElementsByClassName("t-table-dotted")[1].rows.length-1].cells[0].parentNode.parentNode;
	RightParent = document.getElementsByClassName("t-table-dotted")[2].rows[document.getElementsByClassName("t-table-dotted")[2].rows.length-1].cells[0].parentNode.parentNode;
	
	var leftTable = LeftParent.parentNode.rows;
	leftTable[2].cells[1].innerHTML = leftTable[2].cells[1].innerHTML.replace(/ \(.*\)/,"&nbsp;("+col((all_wins)/(all_battles)*100, 2)+"%)");
	
	if(needWrite) {
	//WriteStat();
	}
	
	if (all_battles-old_battles!=0&&old_battles!=0) {
		LeftParent.parentNode.style.verticalAlign = "center";
		leftTable[1].cells[1].innerHTML += "<div style='font-size:11px;'>+"+(all_battles-old_battles)+"</div>";
		currProc = (all_wins-old_wins)/(all_battles-old_battles)*100;
		//leftTable[2].cells[1].innerHTML += "<div style='font-size:11px;'>+"+(all_wins-old_wins)+"("+col((all_wins-old_wins)/(all_battles-old_battles)*100)+"%)"+"</div>";
		var winPerc = ((all_wins/all_battles - old_wins/old_battles)*100).toFixed(2);
		leftTable[2].cells[1].innerHTML += "<div style='font-size:11px;'>+"+(all_wins-old_wins)+"("+((winPerc>0) ? "+" + winPerc : winPerc)+"%)"+"</div>";
	}
	leftTable[2].cells[1].title=FoundProc(all_wins,all_battles);
	
	//LeftParent.parentNode.innerHTML = LeftParent.parentNode.innerHTML.replace(" "," ");

	proc_country (ussr_b, (lang == "ru")?" Боев на советах:" : "Battles on USSR:", ussr_w);
	proc_country (nazi_b, (lang == "ru")?" Боев на немцах:": "Battles on Germany:", nazi_w);
	proc_country (usa_b,  (lang == "ru")?" Боев на американцах:" :"Battles on USA:", usa_w);
	proc_country (chin_b, (lang == "ru")?" Боев на китайцах:" :"Battles on China:", chin_w);
	proc_country (fr_b,   (lang == "ru")?" Боев на французах:" :"Battles on France:", fr_w);
	proc_country (uk_b,   (lang == "ru")?" Боев на британцах:" :"Battles on UK:", uk_w);
	
	if(daypassed!=0)insertNewTr(LeftParent,(lang == "ru")?" Боев в день:" :"Battles per day:", ""+(all_battles/daypassed).toFixed(0)+"" , ((lang == "ru")?"дней" : "days")+": "+daypassed.toFixed() );

	var Table = document.createElement("table");
	Table.className = "t-statistic";
	Table.style.width = "120%";
	ts = trTankTable.parentNode.parentNode;
	ts.parentNode.appendChild(Table);

	var tr = document.createElement("tr");
	Table.appendChild(tr);
	trTankTable = tr;
//<-Блок создания таблицы по уровню техники
	trLev =insertNewTr(trTankTable,(lang == "ru")?" <u>Бои по уровням</u>":"<u>battles by level:</u>",(lang == "ru")?"Бои":"Battles", "");
	addTd(trLev,(lang == "ru")?"Победы":"Victories","right");
	addTd(trLev,"%","right");
	for (var j = 1; j < 6; j++) {
		addTd(trLev, toType("t"+j),"right");
	}
	var AvgLev = 0;
	for (var i = 0; i < levOrder.length; i++) {
		key = levOrder[i];
		if(tankLevels[key]!=undefined) {
			AvgLev += (10-i)*tankLevels[key].b/all_battles;
			levTr = insertTank(trTankTable,key, tankLevels[key].b, tankLevels[key].w, "lev" ,(tankLevels[key].b/all_battles*100).toFixed(2)+"%");
			for (var j = 1; j < 6; j++) {
				b = tankLevels[key].t[j].b;
				w = tankLevels[key].t[j].w;
				if (b == 0) addTd(levTr,"x","right");
				else addTd(levTr,""+col(w/b*100,2)+"%","right value",""+w+"/"+b);
			}
		}
	}
//->Блок создания таблицы по уровню техники
//<-Блок создания таблицы по типу техники
	trType = insertNewTr(trTankTable,(lang == "ru")?" <u>Бои по типу</u>":"<u>battles by type:</u>",(lang == "ru")?"Бои":"Battles","");
	addTd(trType,(lang == "ru")?"Победы":"Victories","right");
	addTd(trType,"%","right");
	for (var j = 1; j < NatCount; j++) {
		addTd(trType, toNat(j),"right");
	}
	var ttOr = [];
	for (var key in tankTypes) {
		tankTypes[key].key = key;
		ttOr.push(tankTypes[key]);
	}
	ttOr.sort(function (a1,a2) {return (a1.b < a2.b) ? 1 : -1;})
	for (var i = 0 ; i < ttOr.length; i++) {
		key = ttOr[i].key;
		typeTr = insertTank(trTankTable,toType(key), tankTypes[key].b ,tankTypes[key].w, "typ", (tankTypes[key].b/all_battles*100).toFixed(2)+"%" );
		for(var j = 1;j<NatCount;j++) {
			b = tankTypes[key].n[j].b;
			w = tankTypes[key].n[j].w;
			if (b == 0) addTd(typeTr,"x","right");
			else addTd(typeTr,""+col(w/b*100,2)+"%","right value",""+w+"/"+b);
		}
	}
	for (var i = 0 ; i <trTank.length; i++) {
		trTank[i][0].innerHTML = "<td>"+toType("t"+trTank[i][1])+"</td>"+trTank[i][0].innerHTML;
	}
	sortTd(trth.cells[1].childNodes[0]);

//<-Блок рейтинга эффективности
	var tresulttable = document.getElementsByClassName('t-result')[0],
		retable = document.createElement('table'),
		rethead = document.createElement('thead'),
		retbody = document.createElement('tbody'),
		retheadtr = document.createElement('tr'),
		retheadtrth = document.createElement('th'),
		retbodytr = document.createElement('tr'),
		retbodytrtd1 = document.createElement('td'),
		retbodytrtd2 = document.createElement('td'),
		retbodytrtd3 = document.createElement('td'),
		retbodytrtd1table = document.createElement('table'),
		retbodytrtd2table = document.createElement('table'),
		retbodytrtd3table = document.createElement('table'),
		retbodytrtd4table = document.createElement('table'),
		retbodytrtd1tabletbody = document.createElement('tbody'),
		retbodytrtd2tabletbody = document.createElement('tbody'),
		retbodytrtd3tabletbody = document.createElement('tbody'),
		retbodytrtd4tabletbody = document.createElement('tbody');
		
	document.getElementsByClassName("l-content")[0].insertBefore(retable, tresulttable);
	retable.setAttribute('id', 're-table');
	retable.setAttribute('class', 't-result');
	retable.style.width = "120%"; 
	retable.style.marginTop = "40px";
	retable.style.marginBottom = "10px";
	
	retheadtrth.innerHTML += 'Рейтинги эффективности';
	retheadtrth.setAttribute('colspan', '3');
	retheadtrth.setAttribute('style','font-family: Arial Narrow,"Helvetica CY", Helvetica,sans-serif;font-stretch: condensed;font-weight: bold;font-size: 17px;color: #ffa759;padding: 4px 0;height: 2.5em;');
	retheadtr.appendChild(retheadtrth);
	rethead.appendChild(retheadtr);
	retable.appendChild(rethead);
	
	retbodytrtd1table.setAttribute('class', 't-table-dotted');
	retbodytrtd1table.appendChild(retbodytrtd1tabletbody);
	retbodytrtd1.appendChild(retbodytrtd1table);
	retbodytrtd1.style.width = "33%";
	
	retbodytrtd2table.setAttribute('class', 't-table-dotted');
	retbodytrtd2table.appendChild(retbodytrtd2tabletbody);
	retbodytrtd2.appendChild(retbodytrtd2table);
	retbodytrtd2.style.width = "33%";
	
	retbodytrtd3table.setAttribute('class', 't-table-dotted');
	retbodytrtd3table.appendChild(retbodytrtd3tabletbody);
	retbodytrtd3.appendChild(retbodytrtd3table);
		
	retbodytr.appendChild(retbodytrtd1);
	retbodytr.appendChild(retbodytrtd2);
	retbodytr.appendChild(retbodytrtd3);
	retbody.appendChild(retbodytr);
	retable.appendChild(retbody);
//->Блок рейтинга эффективности

//<- Блок новых боев
var newbtable = document.createElement('table'),
		newbthead = document.createElement('thead'),
		newbtbody = document.createElement('tbody'),
		newbtheadtr = document.createElement('tr'),
		newbtheadtrth = document.createElement('th'),
		newbtheadtr2 = document.createElement('tr'),
		newbtheadtrth2 = document.createElement('th'),
		newbtbodytr = document.createElement('tr'),
		newbdiv  = document.createElement("div"),
		newbtbodytrtd1 = document.createElement('td'),
		newbtbodytrtd2 = document.createElement('td'),
		newbtbodytrtd3 = document.createElement('td'),
		newbtbodytrtd1table = document.createElement('table'),
		newbtbodytrtd2table = document.createElement('table'),
		newbtbodytrtd3table = document.createElement('table'),
		newbtbodytrtd1tabletbody = document.createElement('tbody'),
		newbtbodytrtd2tabletbody = document.createElement('tbody'),
		newbtbodytrtd3tabletbody = document.createElement('tbody');
	document.getElementsByClassName("l-content")[0].insertBefore(newbtable, tresulttable);
	newbtable.setAttribute('id', 'newb-table');
	newbtable.setAttribute('class', 't-result');
	newbtable.style.width = "120%"; 
	newbtable.style.marginTop = "0px";
	newbtable.style.marginBottom = "0px";
	
	newbtheadtrth.setAttribute('colspan', '3');
	newbtheadtr.appendChild(newbtheadtrth);
	newbthead.appendChild(newbtheadtr);
	
	newbtheadtrth2.appendChild(newbdiv);
	newbtheadtrth2.setAttribute('colspan', '3');
	newbtheadtr2.appendChild(newbtheadtrth2);
	newbthead.appendChild(newbtheadtr2);
	newbtable.appendChild(newbthead);
	
	newbtbodytrtd1table.setAttribute('class', 't-table-dotted');
	newbtbodytrtd1table.appendChild(newbtbodytrtd1tabletbody);
	newbtbodytrtd1.appendChild(newbtbodytrtd1table);
	newbtbodytrtd1.style.width = "40%";
	
	newbtbodytrtd2table.setAttribute('class', 't-table-dotted');
	newbtbodytrtd2table.appendChild(newbtbodytrtd2tabletbody);
	newbtbodytrtd2.appendChild(newbtbodytrtd2table);
	newbtbodytrtd2.style.width = "30%";
	
	newbtbodytrtd3table.setAttribute('class', 't-table-dotted');
	newbtbodytrtd3table.appendChild(newbtbodytrtd3tabletbody);
	newbtbodytrtd3.appendChild(newbtbodytrtd3table);
	newbtbodytrtd3.style.width = "30%";
	
	newbtbodytr.appendChild(newbtbodytrtd1);
	newbtbodytr.appendChild(newbtbodytrtd2);
	newbtbodytr.appendChild(newbtbodytrtd3);
	newbtbody.appendChild(newbtbodytr);
	newbtable.appendChild(newbtbody);
//->
	
//->Блок создания таблицы по типу техники
	
	var effs = CalcEff(0, AvgLev, all_battles, all_wins, 
					GetBattleStat(7), GetBattleStat(9), GetBattleStat(10),
					GetBattleStat(6), GetBattleStat(8), GetBattleStat(11)),
					effres = [],
				redamag = CalcERPerc("damage", GetBattleStat(7)/all_battles, effs[0], AvgLev),
				refrag = CalcERPerc("frag", GetBattleStat(9)/all_battles, effs[0], AvgLev),
				respot = CalcERPerc("spot", GetBattleStat(10)/all_battles, effs[0], AvgLev),
				recap = CalcERPerc("cap", GetBattleStat(6)/all_battles, effs[0], AvgLev),
				redef = CalcERPerc("def", GetBattleStat(8)/all_battles, effs[0], AvgLev);
	
	AvgLevOld = AvgLevOld/(all_battles-newBattlesStats[4]);
	
	if (bsRangs) {
		var rcr = 0,
			rcrv = 0;
		for (var i=bsRangs.length-1; i>-1; i--) {
			if (Number(effs[3])>Number(bsRangs[i])) {
				rcr = i;
				if (i>0) {
					rcrv = (Number(bsRangs[i-1]) - Number(effs[3])).toFixed(2) + " баллов до следующего ранга";
				} else {
					rcrv = 'Максимальный ранг. Круче только вареные яйца.'
				}
			}
		}
	}
	
	if (effs[0] < 440)
		var xeff = 0 .toFixed(2);
	else
		xeff = Math.max(Math.min(effs[0]*(effs[0]*(effs[0]*(effs[0]*(effs[0]*(0.00000000000000004787*effs[0] - 0.00000000000035544) + 0.00000000102606) - 0.0000014665) + 0.0010827) - 0.3133) + 20.49, 100), 0).toFixed(2);
	if (effs[2] > 2140)
		var xwn = 100 .toFixed(2);
	else
		xwn = Math.max(Math.min(effs[2]*(effs[2]*(effs[2]*(-0.00000000001334*effs[2] + 0.00000005673) - 0.00007575) + 0.08392) - 9.362, 100), 0).toFixed(2);
	
	effres[0] = "<font color='"+CalcEffColor(Number(effs[0]), "eff")[0]+"'>" + effs[0] + "</font>";
	effres[2] = "<font color='"+CalcEffColor(Number(effs[2]), "wn6")[0]+"'>" + effs[2] + "</font>";
	effres[3] = effs[3];
	
	if (newBattlesStats[4]) {
		var effsOld = CalcEff(0, AvgLevOld, all_battles-newBattlesStats[4], all_wins-newBattlesStats[3], 
						GetBattleStat(7)-newBattlesStats[6], GetBattleStat(9)-newBattlesStats[8], GetBattleStat(10)-newBattlesStats[9],
						GetBattleStat(6)-newBattlesStats[5], GetBattleStat(8)-newBattlesStats[7], GetBattleStat(11)-newBattlesStats[10]);
						
		if (effsOld[0] < 440)
			oxeff = 0 .toFixed(2);
		else
			oxeff = Math.max(Math.min(effsOld[0]*(effsOld[0]*(effsOld[0]*(effsOld[0]*(effsOld[0]*(0.00000000000000004787*effsOld[0] - 0.00000000000035544) + 0.00000000102606) - 0.0000014665) + 0.0010827) - 0.3133) + 20.49, 100), 0).toFixed(2);
		if (effsOld[2] > 2140)
			oxwn = 100 .toFixed(2);
		else
			oxwn = Math.max(Math.min(effsOld[2]*(effsOld[2]*(effsOld[2]*(-0.00000000001334*effsOld[2] + 0.00000005673) - 0.00007575) + 0.08392) - 9.362, 100), 0).toFixed(2);
		for (var ieold=0; ieold < effs.length; ieold++) {
			var effPerc = (Number(effs[ieold])-Number(effsOld[ieold])).toFixed(2);
			effres[ieold] = effres[ieold] + " ("+((effPerc>0) ? "+"+effPerc:effPerc)+")";
		}
	}
	
	insertNewTr(MiddleParent,(lang == "ru") ?" Средний уровень танков: " : "Average level of tanks:",AvgLev.toFixed(2), "");
	insertNewTr(retbodytrtd3tabletbody,(lang == "ru") ?" <a href='http://armor.kiev.ua/wot/gamerstat/" + playerNick + "' target='_blank'>Эффективность БС</a>" : "<a href='http://armor.kiev.ua/wot/gamerstat/" + playerNick + "' target='_blank'>Eff. rating of BS</a>",effres[3], bsRangs ? rangD[rcr] + " " + rcrv : "");
	insertNewTr(retbodytrtd1tabletbody,(lang == "ru") ?" <a href='http://wot-news.com/index.php/stat/calc/ru/ru' target='_blank'>Эффективность</a>" : "<a href='http://wot-news.com/index.php/stat/calc/ru/ru' target='_blank'>Eff. rating</a>", effres[0], CalcEffColor(Number(effs[0]), "eff")[1]);
	insertNewTr(retbodytrtd2tabletbody,(lang == "ru") ?" <a href='http://wot-news.com/index.php/stat/calc/ru/ru' target='_blank'>WN6 Рейтинг</a>" : "<a href='http://wot-news.com/index.php/stat/calc/ru/ru' target='_blank'>WN6 Rating</a>",effres[2], CalcEffColor(Number(effs[2]), "wn6")[1]);
	insertNewTr(retbodytrtd1tabletbody,(lang == "ru") ?" Эффективность xvm" : "Eff. rating xwm", "<font color='" + CalcEffColor(Number(xeff), "xvm")[0] + "'>" + xeff + "</font>" + (oxeff !== 0 ? "(" +(xeff-oxeff > 0 ? "+"+(xeff-oxeff).toFixed(2) : (xeff-oxeff).toFixed(2)) +  ")" : ""), CalcEffColor(Number(xeff), "xvm")[1]);
	insertNewTr(retbodytrtd2tabletbody,(lang == "ru") ?" WN6 Рейтинг xvm" : "WN6 Rating xwm","<font color='" + CalcEffColor(Number(xwn), "xvm")[0] + "'>" + xwn + "</font>" + (oxwn !== 0 ? "(" +(xwn-oxwn > 0 ? "+"+(xwn-oxwn).toFixed(2) : (xwn-oxwn).toFixed(2)) +  ")" : "" ),  CalcEffColor(Number(xwn), "xvm")[1]);

//<-Блок медалек
	var needMedal = getCookie("medal");
	if (localStorage.Medal == 1) needMedal = 1; else needMedal = 0;
	
	var url= "http://api."+document.location.host+"/uc/accounts/"+document.location.href.match(/\/(\d+)/)[1]+"/api/1.9/?source_token=Intellect_Soft-WoT_Mobile-site";
	var urlproxy="http://anonymouse.org/cgi-bin/anon-www.cgi/"+url;
	if (needMedal == 1) {
		if (window.opera && window.opera.defineMagicVariable){
			var t = document.createElement("script"); t.src = urlproxy; t._callback = ObrDost; document.body.appendChild(t);
		}
		else if (GM_xmlhttpRequest!=undefined)
			var GMTransport = GM_xmlhttpRequest({method: "GET", url: urlproxy, onload: function(response) {ObrDost(response.responseText);}});
		else {
			if (window.chrome && window.chrome.extension) url=urlproxy;
			req = new XMLHttpRequest();
			req.onreadystatechange = function(e) {
				if (req.readyState == 4)if(req.status == 200)	ObrDost(req.responseText);
			}             
			req.timeout = 120000;
			req.open("GET",url, true);
			req.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2000 00:00:00 GMT");
			try {
				req.send(null)
			}
			catch (e){}
		}
	}
	
	div  = document.createElement("div"); 
	if (needMedal != 1)
		div.innerHTML = "<font onclick='setCookie(\"medal\",1);localStorage.Medal = 1;location.reload();' style='cursor:pointer; color:white; text-decoration:underline'>"+((lang == "ru") ? "Включить медали":"turn on medals")+"</font>";
	else
		div.innerHTML = "<font onclick='setCookie(\"medal\",0);localStorage.Medal = 0;location.reload();' style='cursor:pointer; color:white; text-decoration:underline'>"+((lang == "ru") ? "Выключить медали":"turn off medals")+"</font>";		
	ts = document.getElementsByClassName("t-statistic")[0];
	ts.parentNode.insertBefore(div,ts);
//->Блок медалек
	
//<-Блок заполнения таблицы новых боев
	if (newBattlesStats[4]) {
		AvgLevNew = AvgLevNew/newBattlesStats[4];
		var neffs = CalcEff(1, AvgLevNew, newBattlesStats[4], newBattlesStats[3], 
					newBattlesStats[6], newBattlesStats[8], newBattlesStats[9],
					newBattlesStats[5], newBattlesStats[7], newBattlesStats[10]);
				
		var renewdamag = CalcERPerc("damage", newBattlesStats[6]/newBattlesStats[4], neffs[0], AvgLevNew),
			renewfrag = CalcERPerc("frag", newBattlesStats[8]/newBattlesStats[4], neffs[0], AvgLevNew),
			renewspot = CalcERPerc("spot", newBattlesStats[9]/newBattlesStats[4], neffs[0], AvgLevNew),
			renewcap = CalcERPerc("cap", newBattlesStats[5]/newBattlesStats[4], neffs[0], AvgLevNew),
			renewdef = CalcERPerc("def", newBattlesStats[7]/newBattlesStats[4], neffs[0], AvgLevNew);
		var effVal = CalcEffColor(Number(neffs[0]), "eff")[0];

		//insertNewTr(RightParent,"_________________", "");
		newbtable.style.marginTop = "30px";
		newbtheadtrth.setAttribute('style','font-family: Arial Narrow,"Helvetica CY", Helvetica,sans-serif;font-stretch: condensed;font-weight: bold;font-size: 17px;color: #ffa759;padding: 4px 0;height: 2.5em;');
		newbtheadtrth.innerHTML += 'Новые бои';
		//insertNewTr(RightParent,(lang == "ru") ? "Новые бои:":"new battles","", "");
		
		//for (var i=1; i<15; i++) {
		//console.log(GetBattleStat(i));
		//}
		
		insertNewTr(newbtbodytrtd1tabletbody, "<font style='font-size: 130% !important; font-weight: bold;'>" + ((lang == "ru") ? "Новые" : "New") + "</font>", "", "");
		insertNewTr(newbtbodytrtd2tabletbody, "<font style='font-size: 130% !important; font-weight: bold;'>" + ((lang == "ru") ? "Общее" : "Common") + "</font>", "", "");
		insertNewTr(newbtbodytrtd3tabletbody, "<font style='font-size: 130% !important; font-weight: bold;'>" + ((lang == "ru") ? "Дельта" : "Delta") + "</font>", "", "");
		
		insertNewTr(newbtbodytrtd1tabletbody,(lang == "ru") ? "Боев|Побед (%Побед)" : "Battles|Wins (%Wins):", (all_battles-old_battles)+"|"+(all_wins-old_wins)+" ("+col((all_wins-old_wins)/(all_battles-old_battles)*100, 2)+"%)", "");
		insertNewTr(newbtbodytrtd2tabletbody, "", col(all_wins/all_battles*100)+"%", "");
		var deltaWin = (((all_wins-old_wins)/(all_battles-old_battles)*100)-(all_wins/all_battles*100)).toFixed(2);
		insertNewTr(newbtbodytrtd3tabletbody, "", (deltaWin > 0) ? "<font color='green'>+"+deltaWin+"%</font>" : "<font color='red'>"+deltaWin+"%</font>", "");
		
		insertNewTr(newbtbodytrtd1tabletbody, (lang == "ru") ? "Опыт за бой" : "exp per battle", (newBattlesStats[10]/newBattlesStats[4]).toFixed(0), "");
		insertNewTr(newbtbodytrtd2tabletbody, "", GetBattleStat(3), "");
		var deltaExp = (newBattlesStats[10]/newBattlesStats[4] - GetBattleStat(3)).toFixed(0);
		insertNewTr(newbtbodytrtd3tabletbody, "", (deltaExp > 0) ? "<font color='green'>+"+deltaExp+"</font>" : "<font color='red'>"+deltaExp+"</font>", "");
		
		insertNewTr(newbtbodytrtd1tabletbody,(lang == "ru") ? "Средний уровень танков" : "Average level of tanks",AvgLevNew.toFixed(2), "");
		insertNewTr(newbtbodytrtd2tabletbody, "", AvgLev.toFixed(2), "");
		var deltaAvg = (AvgLevNew-AvgLev).toFixed(2);
		insertNewTr(newbtbodytrtd3tabletbody, "", (deltaAvg > 0) ? "<font color='green'>+"+deltaAvg+"</font>" : "<font color='red'>"+deltaAvg+"</font>", "");
		
		insertNewTr(newbtbodytrtd1tabletbody,(lang == "ru") ? "Повреждений за бой" : "Damage per battle",	(newBattlesStats[6]/newBattlesStats[4]).toFixed(0) + " (" 
	+ "<font color='" + effVal + "'>" + renewdamag.toFixed(1) + "</font>|" + (renewdamag/neffs[0]*100).toFixed(1) + "%)", " (Значение в эффективности|% от эффективности)");
		insertNewTr(newbtbodytrtd2tabletbody, "", (GetBattleStat(7)/all_battles).toFixed(0), "");
		var deltaDmg = (newBattlesStats[6]/newBattlesStats[4] - GetBattleStat(7)/all_battles).toFixed(0);
		insertNewTr(newbtbodytrtd3tabletbody, "", (deltaDmg > 0) ? "<font color='green'>+"+deltaDmg+"</font>" : "<font color='red'>"+deltaDmg+"</font>", "");
	
		insertNewTr(newbtbodytrtd1tabletbody,(lang == "ru") ? "Фрагов за бой" : "Frags per battle",		(newBattlesStats[8]/newBattlesStats[4]).toFixed(2) + " (" 
	+ "<font color='" + effVal + "'>" + renewfrag.toFixed(1) + "</font>|" + (renewfrag/neffs[0]*100).toFixed(1) + "%)", " (Значение в эффективности|% от эффективности)");
		insertNewTr(newbtbodytrtd2tabletbody, "", (GetBattleStat(9)/all_battles).toFixed(2), "");
		var deltaFr = (newBattlesStats[8]/newBattlesStats[4] - GetBattleStat(9)/all_battles).toFixed(2);
		insertNewTr(newbtbodytrtd3tabletbody, "", (deltaFr > 0) ? "<font color='green'>+"+deltaFr+"</font>" : "<font color='red'>"+deltaFr+"</font>", "");
	
		insertNewTr(newbtbodytrtd1tabletbody,(lang == "ru") ? "Обнаружено за бой" : "spotted per battle",	(newBattlesStats[9]/newBattlesStats[4]).toFixed(2) + " (" 
	+ "<font color='" + effVal + "'>" + renewspot.toFixed(1) + "</font>|" + (renewspot/neffs[0]*100).toFixed(1) + "%)", " (Значение в эффективности|% от эффективности)");
		insertNewTr(newbtbodytrtd2tabletbody, "", (GetBattleStat(10)/all_battles).toFixed(2), "");
		var deltaSp = (newBattlesStats[9]/newBattlesStats[4] - GetBattleStat(10)/all_battles).toFixed(2);
		insertNewTr(newbtbodytrtd3tabletbody, "", (deltaSp > 0) ? "<font color='green'>+"+deltaSp+"</font>" : "<font color='red'>"+deltaSp+"</font>", "");
	
		insertNewTr(newbtbodytrtd1tabletbody,(lang == "ru") ? "Очков захвата за бой" : "Caps per battle", (newBattlesStats[5]/newBattlesStats[4]).toFixed(2) + " (" 
	+ "<font color='" + effVal + "'>" + renewcap.toFixed(1) + "</font>|" + (renewcap/neffs[0]*100).toFixed(1) + "%)", " (Значение в эффективности|% от эффективности)");
		insertNewTr(newbtbodytrtd2tabletbody, "", (GetBattleStat(6)/all_battles).toFixed(2), "");
		var deltaCap = (newBattlesStats[5]/newBattlesStats[4] - GetBattleStat(6)/all_battles).toFixed(2);
		insertNewTr(newbtbodytrtd3tabletbody, "", (deltaCap > 0) ? "<font color='green'>+"+deltaCap+"</font>" : "<font color='red'>"+deltaCap+"</font>", "");
	
		insertNewTr(newbtbodytrtd1tabletbody,(lang == "ru") ? "Очков защиты за бой" : "Defs per battle", (newBattlesStats[7]/newBattlesStats[4]).toFixed(2) + " (" 
	+ "<font color='" + effVal + "'>" + renewdef.toFixed(1) + "</font>|" + (renewdef/neffs[0]*100).toFixed(1) + "%)", " (Значение в эффективности|% от эффективности)");
		insertNewTr(newbtbodytrtd2tabletbody, "", (GetBattleStat(8)/all_battles).toFixed(2), "");
		var deltaDef = (newBattlesStats[7]/newBattlesStats[4] - GetBattleStat(8)/all_battles).toFixed(2);
		insertNewTr(newbtbodytrtd3tabletbody, "", (deltaDef > 0) ? "<font color='green'>+"+deltaDef+"</font>" : "<font color='red'>"+deltaDef+"</font>", "");
			
	OutputEff(AvgLevNew, neffs, 1); 
	
	insertNewTr(newbtbodytrtd2tabletbody, "", "<font color='" + CalcEffColor(Number(effs[0]), "eff")[0] + "'>" + effs[0] + "</font>", CalcEffColor(Number(effs[0]), "eff")[1]);
	var deltaE = (neffs[0] - effs[0]).toFixed(2);
	insertNewTr(newbtbodytrtd3tabletbody, "", (deltaE > 0) ? "<font color='green'>+"+deltaE+"</font>" : "<font color='red'>"+deltaE+"</font>", "");
	insertNewTr(newbtbodytrtd2tabletbody, "", "<font color='" + CalcEffColor(Number(effs[2]), "wn6")[0] + "'>" + effs[2] + "</font>", CalcEffColor(Number(effs[2]), "wn6")[1]);
	var deltaW = (neffs[2] - effs[2]).toFixed(2);
	insertNewTr(newbtbodytrtd3tabletbody, "", (deltaW > 0) ? "<font color='green'>+"+deltaW+"</font>" : "<font color='red'>"+deltaW+"</font>", "");
		
		var damagePr = ((GetBattleStat(7)/all_battles).toFixed(0) - ((GetBattleStat(7)-newBattlesStats[6])/old_battles).toFixed(0)).toFixed(0);
		insertNewTr(MiddleParent,((lang == "ru") ?" Повреждений за бой" : "Damage per battle") + ((damagePr !=0) ? " ("+ ((damagePr>0) ? "+" +damagePr:damagePr) + "):" : ":"), (GetBattleStat(7)/all_battles).toFixed(0) + " (" 
	+ "<font color='" + CalcEffColor(Number(effs[0]), "eff")[0] + "'>" + redamag.toFixed(1) + "</font>|" + (redamag/effs[0]*100).toFixed(1) + "%)", " (Значение в эффективности|% от эффективности)");
	
	var fragPr = ((GetBattleStat(9)/all_battles).toFixed(2) - ((GetBattleStat(9)-newBattlesStats[8])/old_battles).toFixed(2)).toFixed(2);
	insertNewTr(MiddleParent,((lang == "ru") ?" Фрагов за бой" : "Frags per battle") + ((fragPr !=0) ? " ("+ ((fragPr>0) ? "+" +fragPr:fragPr) + "):" : ":"),(GetBattleStat(9)/all_battles).toFixed(2)+ " (" 
	+ "<font color='" + CalcEffColor(Number(effs[0]), "eff")[0] + "'>" + refrag.toFixed(1) + "</font>|" + (refrag/effs[0]*100).toFixed(1) + "%)", " (Значение в эффективности|% от эффективности)");
	
	var spotPr = ((GetBattleStat(10)/all_battles).toFixed(2) - ((GetBattleStat(10)-newBattlesStats[9])/old_battles).toFixed(2)).toFixed(2);
	insertNewTr(MiddleParent,((lang == "ru") ?" Обнаружено за бой" : "Spotted per battle") + ((spotPr !=0) ? " ("+ ((spotPr>0) ? "+" +spotPr:spotPr) + "):" : ":"), (GetBattleStat(10)/all_battles).toFixed(2)+ " (" 
	+ "<font color='" + CalcEffColor(Number(effs[0]), "eff")[0] + "'>" + respot.toFixed(1) + "</font>|" + (respot/effs[0]*100).toFixed(1) + "%)", " (Значение в эффективности|% от эффективности)");
	
	var capPr = ((GetBattleStat(6)/all_battles).toFixed(2) - ((GetBattleStat(6)-newBattlesStats[5])/old_battles).toFixed(2)).toFixed(2);
	insertNewTr(MiddleParent,((lang == "ru") ?" Очков захвата за бой" : "Caps per battle") + ((capPr !=0) ? " ("+ ((capPr>0) ? "+" +capPr : capPr) + "):" : ":"), (GetBattleStat(6)/all_battles).toFixed(2)+ " (" 
	+ "<font color='" + CalcEffColor(Number(effs[0]), "eff")[0] + "'>" + recap.toFixed(1) + "</font>|" + (recap/effs[0]*100).toFixed(1) + "%)", " (Значение в эффективности|% от эффективности)");
	
	var defPr = ((GetBattleStat(8)/all_battles).toFixed(2) - ((GetBattleStat(8)-newBattlesStats[7])/old_battles)).toFixed(2);
	insertNewTr(MiddleParent,((lang == "ru") ?" Очков защиты за бой" : "Defs per battle") + ((defPr !=0) ?" ("+ ((defPr>0) ? "+" +defPr : defPr) + "):" : ":"), (GetBattleStat(8)/all_battles).toFixed(2)+ " (" 
	+ "<font color='" + CalcEffColor(Number(effs[0]), "eff")[0] + "'>" + redef.toFixed(1) + "</font>|" + (redef/effs[0]*100).toFixed(1) + "%)", " (Значение в эффективности|% от эффективности)");
		
	} else {
	
		insertNewTr(MiddleParent,(lang == "ru") ?" Повреждений за бой" : "Damage per battle", (GetBattleStat(7)/all_battles).toFixed(0) + " (" 
	+ "<font color='" + CalcEffColor(Number(effs[0]), "eff")[0] + "'>" + redamag.toFixed(1) + "</font>|" + (redamag/effs[0]*100).toFixed(1) + "%)", "( Значение в эффективности|% от эффективности)");
	insertNewTr(MiddleParent,(lang == "ru") ?" Фрагов за бой" : "Frags per battle" ,(GetBattleStat(9)/all_battles).toFixed(2)+ "(" 
	+ "<font color='" + CalcEffColor(Number(effs[0]), "eff")[0] + "'>" + refrag.toFixed(1) + "</font>|" + (refrag/effs[0]*100).toFixed(1) + "%)", " (Значение в эффективности|% от эффективности)");
	insertNewTr(MiddleParent,(lang == "ru") ?" Обнаружено за бой" : "Spotted per battle", (GetBattleStat(10)/all_battles).toFixed(2)+ " (" 
	+ "<font color='" + CalcEffColor(Number(effs[0]), "eff")[0] + "'>" + respot.toFixed(1) + "</font>|" + (respot/effs[0]*100).toFixed(1) + "%)", " (Значение в эффективности|% от эффективности)");
	insertNewTr(MiddleParent,(lang == "ru") ?" Очков захвата за бой" : "Caps per battle", (GetBattleStat(6)/all_battles).toFixed(2)+ " (" 
	+ "<font color='" + CalcEffColor(Number(effs[0]), "eff")[0] + "'>" + recap.toFixed(1) + "</font>|" + (recap/effs[0]*100).toFixed(1) + "%)", " (Значение в эффективности|% от эффективности)");
	insertNewTr(MiddleParent,(lang == "ru") ?" Очков защиты за бой" : "Defs per battle", (GetBattleStat(8)/all_battles).toFixed(2)+ " (" 
	+ "<font color='" + CalcEffColor(Number(effs[0]), "eff")[0] + "'>" + redef.toFixed(1) + "</font>|" + (redef/effs[0]*100).toFixed(1) + "%)", " (Значение в эффективности|% от эффективности)");
	}
//->Блок заполнения таблицы новых боев
	
	function CalcERPerc(type, parVal, ERVal, tanksLev) {
		if (type == "damage") {
			return parVal*(10/(tanksLev+2))*(0.23+2*tanksLev/100);
		} else if (type == "frag") {
			return parVal*250;
		} else if (type == "spot") {
			return parVal*150;
		} else if (type == "cap") {
			return Math.log((parVal)+1)/Math.log(1.732)*150;
		} else if (type == "def") {
			return parVal*150;
		}
	}
	
	function CalcEff(New, AvgLev, battles, wins, damag, frags, spotted, caps, defs, summaryxp) { // расчет эффективности, спасибо bvrus, Elf__X
		var effs=[];
		effs[0] = (damag/battles*(10/(AvgLev+2))*(0.23+2*AvgLev/100) +
					frags/battles*250 + 
					spotted/battles*150 + 
					Math.log((caps/battles)+1)/Math.log(1.732)*150 +
					defs/battles*150).toFixed(2); //eff
		effs[1] = (damag/battles*(10/AvgLev)*(0.15+2*AvgLev/100) +
					frags/battles*(0.35-2*AvgLev/100)*1000 +
					spotted/battles*200 +
					caps/battles*150 +
					defs/battles*150).toFixed(2); //old eff
		effs[2] = ((1240-1040/Math.pow(Math.min(AvgLev,6), 0.164))*frags/battles +
					damag/battles*530/(184*Math.pow(Math.E, 0.24*AvgLev)+130) +
					spotted/battles*125 +
					Math.min(defs/battles,2.2)*100 +
					((185/(0.17+Math.pow(Math.E, (wins / battles*100-35)*-0.134)))-500)*0.45 +
					(6-Math.min(AvgLev,6))*-60).toFixed(2);
		if (New==0)
			effs[3] = (Math.log(battles) / 10  * (summaryxp / battles * 1 +
					damag / battles  * (wins / battles * 2.0 +frags / battles * 0.9 +spotted / battles * 0.5 +caps / battles * 0.5 +defs / battles * 0.5))).toFixed(2);
		return effs;
	}
	function CalcEffColor(effval, type) {
	  if (type == "eff") {
		   if (effval < 645) return ['FE0E00', (645-effval).toFixed(2) + ' баллов до следующего ранга'];
		   if (effval < 875) return ['FE7903', (875-effval).toFixed(2) + ' баллов до следующего ранга'];
		   if (effval < 1155) return ['F8F400', (1155-effval).toFixed(2) + ' баллов до следующего ранга'];
		   if (effval < 1470) return ['60FF00', (1470-effval).toFixed(2) + ' баллов до следующего ранга'];
		   if (effval < 1740) return ['02C9B3', (1740-effval).toFixed(2) + ' баллов до следующего ранга'];
		   if (effval < 9999) return ['D042F3' , 'Максимальный уровень. Круче только вареные яйца.'];
	  } else if (type == "wn6") {
		   if (effval < 435) return ['FE0E00', (435-effval).toFixed(2) + ' баллов до следующего ранга'];
		   if (effval < 805) return ['FE7903', (805-effval).toFixed(2) + ' баллов до следующего ранга'];
		   if (effval < 1200) return ['F8F400', (1200-effval).toFixed(2) + ' баллов до следующего ранга'];
		   if (effval < 1595) return ['60FF00', (1595-effval).toFixed(2) + ' баллов до следующего ранга'];
		   if (effval < 1900) return ['02C9B3', (1900-effval).toFixed(2) + ' баллов до следующего ранга'];
		   if (effval < 9999) return ['D042F3', 'Максимальный уровень. Круче только вареные яйца.'];
	  } else if (type == "xvm") {
		if (effval < 16.5) return ['FE0E00', (16.5-effval).toFixed(2) + ' баллов до следующего ранга'];
		if (effval < 33.5) return ['FE7903', (33.5-effval).toFixed(2) + ' баллов до следующего ранга'];
		if (effval < 52.5) return ['F8F400', (52.5-effval).toFixed(2) + ' баллов до следующего ранга'];
		if (effval < 75.5) return ['60FF00', (75.5-effval).toFixed(2) + ' баллов до следующего ранга'];
		if (effval < 92.5) return ['02C9B3', (92.5-effval).toFixed(2) + ' баллов до следующего ранга'];
		if (effval < 101) return ['D042F3', 'Максимальный уровень. Круче только вареные яйца.'];
	  }
	  return ['white', ''];
	}
	function OutputEff(AvgLev, effs, type) {
			insertNewTr(newbtbodytrtd1tabletbody,(lang == "ru") ?" Эффективность" : "Eff. rating", "<font color='" + CalcEffColor(Number(effs[0]), "eff")[0] + "'>" + effs[0] + "</font>", CalcEffColor(Number(effs[0]), "eff")[1]);
			insertNewTr(newbtbodytrtd1tabletbody,(lang == "ru") ?" WN6 Рейтинг" : "WN6 Rating", "<font color='" + CalcEffColor(Number(effs[2]), "wn6")[0] + "'>" + effs[2] + "</font>", CalcEffColor(Number(effs[2]), "wn6")[1]);
	}
	function GetBattleStat(col) {
		var resText = document.getElementsByClassName("t-statistic")[0].rows[col].cells[3].innerHTML;
		resText = resText.indexOf("span") > 0 ? resText.substr(0,resText.indexOf("span")) : resText;
		return (toFl(resText));
	}
	function toFl(s){                 
		var a =""+s;
		return (parseFloat(a.replace(/[\D\.]/g,"")));
	}
	function FoundProc(Wins,Battles) {                 
		nextD3 = Math.ceil(Wins/Battles*100+0.5)-0.5
		nextD1=nextD3-1;
		nextD2=nextD3-0.5;
		need_b1 = Math.floor(Battles-Wins*100/nextD1);
		if (100*Wins/Battles>nextD2)
			need_b2 = Math.floor(Battles-Wins*100/nextD2);
		else
			need_b2 = Math.ceil((nextD2*Battles-Wins*100)/(100 - nextD2));
		need_b3 = Math.ceil((nextD3*Battles-Wins*100)/(100 - nextD3));
		return ""+nextD1+"% ("+need_b1+") "+nextD2+"% ("+need_b2+") "+nextD3+"% ("+need_b3+")";
	}
	function addTd(tr, val, cl, alt) {
		var tdNew = document.createElement('td');
		tdNew.innerHTML = val;
		tdNew.className = cl;
		if (alt == undefined) alt = "";
		tdNew.title = alt;
		tdNew.value = val;
		tr.appendChild(tdNew);
	}
	function insertNewTr(NewTrParent, text, val, title) {
		var trNew = document.createElement('tr');
		var tdNewName = document.createElement('td');
		tdNewName.width = "60%";
		tdNewName.setAttribute("style","padding: 0 0;");
		tdNewName.innerHTML = text;
		var tdNew = document.createElement('td');
		tdNew.innerHTML = val;
		if (title!=undefined) tdNew.title = title;
		tdNew.className = "td-number";
		tdNew.align="right"
		NewTrParent.parentNode.appendChild(trNew);
		trNew.appendChild(tdNewName);
		trNew.appendChild(tdNew);
		return trNew;
	}
	function insertTank(NewTrParent, level, battle, win, name, title) {
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
	function toNat(n) {
		if(n==1) return (lang == "ru") ?"СССР":"USSR";
		if(n==2) return (lang == "ru") ?"Германия":"Germany";
		if(n==3) return (lang == "ru") ?"США":"USA";
		if(n==4) return (lang == "ru") ?"Франция":"France";
		if(n==5) return (lang == "ru") ?"Китай":"China";
		if(n==6) return (lang == "ru") ?"Англия":"UK";
	}
	function toType(k) {
		if(k == "t1"||k=="lightTank") return (lang == "ru") ?"ЛТ":"LT";
		if(k == "t2"||k=="mediumTank") return (lang == "ru") ?"СТ":"MT";
		if(k == "t3"||k=="heavyTank") return (lang == "ru") ?"ТТ":"HT";
		if(k == "t4"||k=="SPG") return (lang == "ru") ?"САУ":"SPG";
		if(k == "t5"||k=="AT-SPG") return (lang == "ru") ?"ПТ":"TD";
	}
	function col(v,digit) {
		if(isNaN(v)) return "x";
		var color = "90ffff";
		if (v<101) color="D042F3";
		if (v<63.9) color="02C9B3" 
		if (v<56.7) color="60FF00"
		if (v<51.9) color="F8F400"
		if (v<48.8) color="FE7903"
		if (v<46.3) color="FE0E00"

		return "<font color='"+color+"'>"+v.toFixed(digit)+"</font>";
	}
	function col2(v) {
		if (isNaN(v)) v = 0;
		var color = "D042F3";
		if (v<15) color="02C9B3"
		if (v<10) color="60FF00"
		if (v<5) color="F8F400"
		if (v<0) color="FE7903" 
		if (v<-5) color="FE0E00"     //красный
		v = v.toFixed(2);
		if (v>=0) v = "+"+v;
		return "<font color='"+color+"'>"+v+"</font>";
	}
	function proc_country (country_b, fights_on_text, country_w) { // выводит процент боев на технике разных стран, klensy
		if (country_b != 0) insertNewTr(LeftParent, fights_on_text, "" + country_b + " (" + (country_b / all_battles * 100).toFixed(0) + "%/" + col(country_w / country_b * 100, 2) + "%)", (lang == "ru") ? "Процент боев/Процент побед" : "battle procent/win procent");
	}
	function setup_script (script_name) { // просто заменил копипасту на вызов функции, klensy
		var script = document.createElement("script");  
		script.type = "text/javascript";		
		script.textContent =  script_name.toString();
		document.body.appendChild(script);
	}
	function outUnOffTankStat (servStat) {
		eval("var resp ="+ servStat);
		var sStat = resp.veh_stat,
		arstat = {},
		arstr = '';
		for (var sc in sStat) {
			arstat[sc.toLowerCase()] = (sStat[sc]["win"] / sStat[sc]["total"] * 100).toFixed(2);
		}
		for (var sc=0; sc<tankS.length; sc++) {
			if (arstat[tankS[sc]]) {
				arstr += arstat[tankS[sc]] + ';';
			} else {
				arstr += '0;';
			}
		}
		var now = new Date();
		var time = now.getTime();
		time += 3600 * 24 * 1000;
		now.setTime(time);
		document.cookie = 'wg_unoff_stat=' + escape(arstr) + '; expires=' + now.toGMTString()+'; domain=.' + window.location.host.toString() + '; path=/;';
	}
	
	function outWotNoobStatColor(nr) {
		if (0<=nr && nr<60) return '992323';
		if (60<=nr && nr<80) return 'c4595e';
		if (80<=nr && nr<110) return 'dad858';
		if (110<=nr && nr<190) return '00aa40';
		if (190<=nr) return 'c270ae';
	}
	
	function outWotNoobStatTitle(nr) {
	 if (0<=nr && nr<40) return "оДНОклеточное\nподающая надежды бОльшая половина сервера";
	 if (40<=nr && nr<45) return "донышко\nподающая надежды бОльшая половина сервера";
	 if (45<=nr && nr<50) return "ИЛита\nподающая надежды бОльшая половина сервера";
	 if (50<=nr && nr<55) return "НЛДнище\nподающая надежды бОльшая половина сервера";
	 if (55<=nr && nr<60) return "неМОЩный\nподающая надежды бОльшая половина сервера";
	 
	 if (60<=nr && nr<65) return "Мистер Крабс\n~46,26%";
	 if (65<=nr && nr<70) return "обуза\n~40,34%";
	 if (70<=nr && nr<75) return "РАКетмэн\n~34,91%";
	 if (75<=nr && nr<80) return "оЛОЛошка\n~29,94%";
	 
	 if (80<=nr && nr<85) return "агроЛЕНЬ\n~25,41%";
	 if (85<=nr && nr<90) return "драчун-забияка\n~21,37%";
	 if (90<=nr && nr<95) return "го в треньку!\n~17,76%";
	 if (95<=nr && nr<100) return "небезнадежный\n~14,56%";
	 if (100<=nr && nr<110) return "всё ровно\n~11,80%";
	 
	 if (110<=nr && nr<120) return "закаленный\n~7,44%";
	 if (120<=nr && nr<130) return "раСЧЕТливый\n~4,40%";
	 if (130<=nr && nr<140) return "пользАдел\n~2,43%";
	 if (140<=nr && nr<150) return "PRO.думанный\~1,26%";
	 if (150<=nr && nr<160) return "вездесуЮщий\n~0,61%";
	 if (160<=nr && nr<170) return "УМелец\n~0,29%";
	 if (170<=nr && nr<180) return "УМникум\n~0,13%";
	 if (180<=nr && nr<190) return "нинзя-мастер\n~0,06%";
	 
	 if (190<=nr && nr<200) return "Джоkер\n~0,0287%";
	 if (200<=nr && nr<210) return "игра пройдена\n~0,0141%";
	 if (210<=nr && nr<220) return "маньяк\n~0,0077%";
	 if (220<=nr && nr<250) return "директор зоопарка\n~0,0039%";
	 if (250<=nr) return "убийца ВБРа\n~0,0007%";
	}
	
	function outWotNoobStat(htmlText) {
		var regexp = /<div class="kpd">(\d*\.*\d*)+<\/div>/gi,
		res = regexp.exec(htmlText); 
		if (res.length > 0) {
			insertNewTr(retbodytrtd3tabletbody,(lang == "ru") ?" <a href='http://wot-noobs.ru/nubomer/?nick=" + playerNick + "' target='_blank'>Нубо-Рейтинг</a>" : "<a href='http://wot-noobs.ru/nubomer/?nick=" + playerNick + "' target='_blank'>Wot-noobs rating</a>", "<font color='" + 
			outWotNoobStatColor(Number(res[1])) + "'>" + res[1] + "</font>", outWotNoobStatTitle(Number(res[1])));
		}
	}
	
	function bsStat(servStat) {
		eval("var resp ="+ servStat);
		var sStat = resp.classRatings,
		arstr = '';
		for (var i=0; i<rangA.length; i++) {
		arstr += sStat[rangA[i]] + ';';
		}
		var now = new Date();
		var time = now.getTime();
		time += 3600 * 24 * 1000;
		now.setTime(time);
		document.cookie = 'bs_stat=' + escape(arstr) + '; expires=' + now.toGMTString()+'; domain=.' + window.location.host.toString() + '; path=/;';
	}
	function ObrDost(SpisokDost){
	div  = document.createElement("div");
	ts = document.getElementsByClassName("t-statistic")[0]	
	ts.parentNode.insertBefore(div,ts)
	//alert(SpisokDost);
	eval("var resp ="+ SpisokDost);
	
	arMedal = resp.data.achievements;//gbody.match(/"achievements": \{([^\}]*)\}/g)[0].split("{")[1].split(",")
	
	div  = document.createElement("div");
	div.style.width="120%";
	ts = document.getElementsByClassName("t-statistic")[0];
	ts.parentNode.insertBefore(div,ts);
	
	var oldMedals = getCookie("warg_us_medals_save");
		
	if (oldMedals) {
		oldMedals = oldMedals.split("/")[0].split(";");
	}
	
	var MedalName = 	["medalCarius",	"warrior",	"invader",	"sniper",	"defender",	"steelwall",		"supporter",	"scout",		"medalWittmann",	"medalOrlik",	"medalOskin",	"medalHalonen",	"medalBurda",	"medalBillotte",	"medalKolobanov",	"heroesOfRassenay",	"medalFadin",	"medalEkins",	"beasthunter",	"sinai",		"pattonValley",		"mousebane",	"tankExpert",	"maxPiercingSeries",	"medalKay",	"medalLeClerc",	"medalAbrams",	"medalPoppel",	"maxSniperSeries",	"maxInvincibleSeries",	"maxDiehardSeries",	"raider",	"maxKillingSeries",	"kamikaze",		"medalLavrinenko",	"lumberjack",	"medalKnispel", "medalPascucci", 	"medalBrunoPietro", "evileye", 		"medalTamadaYoshio", 	"bombardier", 	"medalBrothersInArms", 		"medalTarczay", 	"medalCrucialContribution", 	"medalDeLanglade", 	"medalRadleyWalters", 	"medalNikolas", "medalLehvaslaiho", "medalDumitru", "medalLafayettePool", 	"huntsman",	"luckyDevil",	"ironMan",		"sturdy"] // handOfDeath ?
	var MedalImg = 		["",			"top_gun",	"invader",	"sniper",	"defender",	"steel_wall",		"confederate",	"scout",		"medal_belter",		"orlik",		"oskin",		"halonen",		"burda",		"billotte",			"kolobanov",		"heroesofrassenay",	"fadin",		"",				"tank_hunter",	"lionofsinai",	"-patton_valley_in","mouse_trap",	"expert",		"master_gunner",		"",			"",				"",				"",				"sharpshooter",		"invincible",			"survivor",			"raider",	"reaper",			"kamikadze",	"",					"",				"", 			"!pascucci", 		"!bruno", 			"!dozorny", 	"!tamada_yoshio", 		"!bombardier", 	"!medalbrothersinarms", 	"!tarczay", 		"!medalcrucialcontribution",	"!de_laglande", 	"!radley", 				"!nicolos", 	"!lehveslaiho", 	"!dumitru", 	"!pool", 				"+cgcx",	"+wsgs",		"+cgbs",		"+fdtr"]
	var MedalTitle = 	["",			"Воин",		"Захватчик","Снайпер",	"Защитник",	"Стальная стена",	"Поддержка",	"Разведчик",	"Бёльтер",			"Орлик",		"Оськин",		"Халонен",		"Бурда",		"Бийот",			"Колобанов",		"Расейняя",			"Фадин",		"",				"Зверобой",		"Лев Синая",	"Долина Паттонов",	"Гроза мышей",	"Эксперт",		"Бронебойщик",			"",			"",				"",				"",				"Стрелок",			"Неуязвимый",			"Живучий",			"Рейдер",	"Коса смерти",		"Камикадзе",	"",					"",				"", 			"Паскуччи", 		"Бруно", 			"Дозорный", 	"Тамада Йошио", 		"Бомбардир", 	"Братья по оружию", 		"Тарцая", 			"Решающий вклад", 				"де Ланглада", 		"Рэдли-Уолтерса", 		"Николса", 		"Лехвеслайхо", 		"Думитру", 		"Пула", 				"Егерь",	"Счастливчик",	"Невозмутимый",	"Спартанец"]
	var MedalsForCockie = "";
	var mcounter = 0;

	for (var i = 0; i < MedalImg.length; i++) {
		mImg = MedalImg[i];
		if (mImg != "") {
			styleImg = "";
			mc = arMedal[MedalName[i]];
			MedalsForCockie += mc+";";
			if (mc > 0) {
				title = (lang == "ru") ? MedalTitle[i] : mImg;
				if (mImg.substr(0, 1) == "!") {
					SrcImg="uncommon_images/medals080/newmedal/";
					mImg=mImg.substr(1);
				} else if (mImg.substr(0, 1) == "+") {
					SrcImg="uncommon_images/082_special/7_12/";
					mImg=mImg.substr(1);
				} else if (mImg.substr(0, 1) == "-") {
					SrcImg="uncommon_images/";
					mImg=mImg.substr(1);
				}
				else SrcImg="achievements/";
				
				if (MedalName[i] == "maxInvincibleSeries" && mc < 5 ) styleImg = "style = 'opacity: 0.4;' "
				if (MedalName[i] == "maxDiehardSeries"    && mc < 20) styleImg = "style = 'opacity: 0.4;' "
				if (MedalName[i].indexOf("max")<0)
					title += (lang == "ru" ? ". Раз в " : ". once on ") + (all_battles / mc).toFixed(1);
				else
					title+=(lang=="ru"?". Максимальная длина серии":". Max series length ")	
				div.innerHTML += "<div style='display: inline-block;position: relative;'><img "+styleImg+"width=50 height=50 src='http://worldoftanks.ru/dcont/fb/"+SrcImg+mImg+".png' alt='"+title+"' title='"+title+"'>"
				+(mc==1?"":"<font style='border: 1px solid #40312E;position:absolute;font-size: 10px;text-align: center; right: 1px;width:26px;top:35px;background-color: rgb(66, 15, 12);padding: 1px 0px;' title='"+"'>"+mc+"</font>")
				+"</div>";  
				if (newBattlesStats[4] && oldMedals) {
					if (mc - oldMedals[mcounter] > 0) {
						newbdiv.innerHTML += "<div style='display: inline-block;position: relative;'><img "+styleImg+"width=50 height=50 src='http://worldoftanks.ru/dcont/fb/"+SrcImg+mImg+".png' alt='"+title+"' title='"+title+"'>"
						+((mc - oldMedals[mcounter])==1?"":"<font style='border: 1px solid #40312E;position:absolute;font-size: 10px;text-align: center; right: 1px;width:26px;top:35px;background-color: rgb(66, 15, 12);padding: 1px 0px;' title='"+"'>"+(mc - oldMedals[mcounter])+"</font>")
						+"</div>";
					}
				}
				//
			}
			mcounter += 1;
		}
	}
	var NationName = ["usa", "france", "ussr", "china", "uk", "germany"];
	var NationNameRu = ["США", "Франция", "СССР", "Китай", "Британия", "Германия"];
	var oldCounter = mcounter,
		oldCount;
	for (var j = 1; j < 3; j++) {
		oldCount = 0;
		if (j==1) {Experts=arMedal.tankExperts; mImg="tankexpert_nations";}
		else {Experts=arMedal.mechanicEngineers; mImg="mechanicengineer_nations";}
		
		title = "";
		styleImg="";
		Vsego=0;
		for (var i = 0; i < NationName.length; i++){
			mc = Experts[NationName[i]];
			mc=(mc==true?1:0);
			MedalsForCockie += mc+";";
			title += (lang=="ru"? NationNameRu[i] : NationName[i])+" : "+mc+" ";
			Vsego+=mc;
			if (oldMedals) oldCount += Number(oldMedals[oldCounter]);
			oldCounter += 1;
		}
		if (Vsego<NationName.length) styleImg="style = 'opacity: 0.4;' ";
		div.innerHTML += "<div style='display: inline-block;position: relative;'><img "+styleImg+"width=50 height=50 src='http://worldoftanks.ru/dcont/fb/achievements/"+mImg+".png' alt='"+title+"' title='"+title+"'>"
		+("<font style='border: 1px solid #40312E;position:absolute;font-size: 10px;text-align: center; right: 1px;width:26px;top:35px;background-color: rgb(66, 15, 12);padding: 1px 0px;' title='"+"'>"+Vsego+"</font>")
		+"</div>";      //
		if (newBattlesStats[4] && oldMedals) {
					if ((Vsego - oldCount) > 0) {
						newbdiv.innerHTML += "<div style='display: inline-block;position: relative;'><img "+styleImg+"width=50 height=50 src='http://worldoftanks.ru/dcont/fb/achievements/"+mImg+".png' alt='"+title+"' title='"+title+"'>"
						+("<font style='border: 1px solid #40312E;position:absolute;font-size: 10px;text-align: center; right: 1px;width:26px;top:35px;background-color: rgb(66, 15, 12);padding: 1px 0px;' title='"+"'>"+(Vsego - oldCount).toFixed()+"</font>")
						+"</div>";
					}
				}
	}
	
	if(lang=="ru")
		div.innerHTML += "<div><a href='http://worldoftanks.ru/game/guide/ru/general/achievements'>Описание достижений</a></div>"
	else
		div.innerHTML += "<div><a href='http://worldoftanks.com/game/guide/en/general/achievements'>Achievements description</a></div>"
	
	var rows = document.getElementsByClassName("t-statistic")[1].rows; 

	nc = document.createElement('th');
	rows[0].appendChild(nc);
	nc.className ="right";
	nc.innerHTML = '<div onclick="sortTd(this, &quot;u&quot;)" style="cursor: pointer">' + ((lang=="ru") ? 'Урон':'damage')+'</div>';
	
	nc = document.createElement('th');
	rows[0].appendChild(nc);
	nc.innerHTML = '<div onclick="sortTd(this, &quot;u&quot;)" style="cursor: pointer">' + ((lang=="ru") ? 'Фрагов' :'frags')+'</div>';

	nc = document.createElement('th');
	rows[0].appendChild(nc); // spotted table, klensy
	nc.innerHTML = '<div onclick="sortTd(this, &quot;u&quot;)" style="cursor: pointer">'+ ((lang=="ru") ? 'Обнаружил':'spotted') + '</div>';
	
	nc = document.createElement('th');
	rows[0].appendChild(nc);
	nc.innerHTML = '<div onclick="sortTd(this, &quot;u&quot;)" style="cursor: pointer">' + ((lang=="ru") ? 'Выжил' : 'Survived') + '</div>';

	vehs = resp.data.vehicles;
	for (var i = 1; i < rows.length; i++) {
		var t = rows[i].cells;
		if (t[1].tagName != "TH" && t[1].innerHTML!="") {
			imgName = t[1].getElementsByTagName('img')[0].src.match(/\/[^-]+-([^\/]*)\.png/)[1];
			for (j =0; j<vehs.length; j++)
				if(vehs[j].name.toLowerCase() == imgName) {veh = vehs[j];break;}
			
			if (t[0].innerHTML == "undefined" ) t[0].innerHTML = toType(veh.class);
			ncell = rows[i].insertCell(t.length);
			ncell.innerHTML = ""+(veh.damageDealt/veh.battle_count).toFixed();
			ncell.align="center";
			ncell.title = veh.damageDealt;
			
			ncell = rows[i].insertCell(t.length);
			ncell.innerHTML = ""+(veh.frags/veh.battle_count).toFixed(2)+"";
			ncell.align="center";
			ncell.title = veh.frags;
			
			ncell = rows[i].insertCell(t.length); // added avg_spotted, klensy
			ncell.innerHTML = ""+(veh.spotted/veh.battle_count).toFixed(2)+"";
			ncell.align="center";
			ncell.title = veh.spotted;
			
			ncell = rows[i].insertCell(t.length);
			ncell.innerHTML = ""+(veh.survivedBattles/veh.battle_count*100).toFixed(0)+"%";
			ncell.align="center";
			ncell.title = veh.survivedBattles;
		}
	} 
	setCookie('warg_us_medals', MedalsForCockie);
}
}//////////////////////////main

function sortTd(el,dir) {
    var p = el;
	while (p.tagName.toLowerCase() != "tbody") {
		if (p.tagName.toLowerCase() == "th"||p.tagName.toLowerCase() == "td")
			Index = p.cellIndex;
		p = p.parentNode;
	}
	tBody = p;//el.parentNode.parentNode;
//	alert(el.innerHTML);	
	rows = tBody.rows;
	th = rows[0];
	sortar = [];
	
	for (var i = 1; i < rows.length; i++) {
		sortar[i] = [];
		sortar[i][0] = defkey(rows[i],Index);
		sortar[i][1] = rows[i];
	}
	if (el.onclick.toString().indexOf('"u"') > 0) {
		sortar.sort(_sort);
		el.setAttribute('onclick','sortTd(this, "d")');
	} 
	else {
		sortar.sort(_sortR);
		el.setAttribute('onclick','sortTd(this, "u")');
	}
	tBody.innerHTML = "";
	tBody.appendChild(th);
    for (var i = 0; i < sortar.length - 1; i++) {
    	tBody.appendChild(sortar[i][1]);
    }

	function defkey(row,i) {
		var levOrder = ["X","IX","VIII","VII","VI","V","IV","III","II","I"];
		if (i >= 7) return parseFloat(row.cells[i].innerHTML.replace(/\D/g,"")) ; 
		if (i >= 5) return parseFloat(row.cells[i].innerHTML.match(/>(.*)</)[1]) ; 
		if (i >= 3) return parseFloat(row.cells[i].innerHTML.replace(/\D/g,"")) ; 
		if (i == 1) return levOrder.indexOf( row.cells[i].getElementsByTagName("span")[0].innerHTML.replace(/<[^<]*>/g,"").replace(/\s/,"") );
		return row.cells[i].innerHTML;
	}

	function _sort(a,b) {
		a = a[0];
		b = b[0];
		return (a > b) ? -1 : 1;
	}

	function _sortR(a,b) {
		a = a[0];
		b = b[0];
		return (a > b) ? 1 : -1;
	}

}////sortTd
function hideTypes(el) {
    var p = el;
	while (p.tagName.toLowerCase() != "tbody") {
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
	for (var i=1; i<rows.length ;i++) {
		if ((rows[i].cells[0].innerHTML == ftype || ftype == 0) &&
			(nat == 0 || rows[i].cells[1].getAttribute("nat") == nat) &&
			(!onlyNew||rows[i].cells[2].innerHTML.indexOf("%")>0) &&
			(toFl(rows[i].cells[3].innerHTML)>chfrom && (toFl(rows[i].cells[3].innerHTML)<chto || chto==0 ))){
			
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
function getCookie(name) {
	var start = document.cookie.indexOf( name + '=' );
	var len = start + name.length + 1;
	if ( ( !start ) && ( name != document.cookie.substring( 0, name.length ) ) ) {return null;}
	if ( start == -1 ) return undefined;
	var end = document.cookie.indexOf( ';', len );
	if ( end == -1 ) end = document.cookie.length;
	
	var resval = document.cookie.substring( len, end );
	
	name = name + "__2";
	start = document.cookie.indexOf( name + '=' );
	len = start + name.length + 1;
	if ( ( !start ) && ( name != document.cookie.substring( 0, name.length ) ) ) {return unescape( resval);}
	if ( start == -1 ) return unescape( resval);
	end = document.cookie.indexOf( ';', len );
	if ( end == -1 ) end = document.cookie.length;
	
	resval += document.cookie.substring( len, end );
	
	return unescape(resval)
}
function WriteStat() {
	var timeDiv = document.getElementsByClassName("b-data-date")[0];
   	var timeStamp = new Date(Number(timeDiv.childNodes[1].getAttribute("data-timestamp"))*1000);
	var cookie = ""+timeStamp+";"; 
	var tres = document.getElementsByClassName("t-table-dotted")[0];
	
	for (var i = 0; i < 3; i++)
		if (tres.innerHTML.indexOf("currency-gold") > 0){
			var resText = tres.rows[i].cells[1].innerHTML;
			resText = resText.substr(resText.indexOf("span") + 4);
			cookie += "" + toFl(resText.substr(0, resText.indexOf("span"))) + ";";
		}
		else cookie += "NaN;";
		
    var rows = document.getElementsByClassName("t-statistic")[0].rows;
    
    for (var i = 1; i < rows.length; i++) {
    	var resText = rows[i].cells[3].innerHTML;
    	resText = resText.indexOf("span") > 0 ? resText.substr(0, resText.indexOf("span")) : resText;
    	cookie += "" + toFl(resText) + ";";
    	var r = rows[i].cells[4].getElementsByTagName("a")[0];
    	resText = r == undefined ? rows[i].cells[4].innerHTML : r.innerHTML;
    	resText = resText.indexOf("span") > 0 ? resText.substr(0, resText.indexOf("span")) : resText;
    	cookie += "" + toFl(resText) + ";";
    }
		
    var rows = document.getElementsByClassName("t-statistic")[1].rows;
    for (var i = 1; i < rows.length; i++) {
    	var t = rows[i].cells;
    	if (t[1].tagName != "TH" && t[1].innerHTML != "") {
    		imgName = t[1].getElementsByTagName('img')[0].src.match(/\/[^-]+-([^\/]*)\.png/)[1];
    		cookie += "/" + imgName + ";" + toFl(t[3].innerHTML) + ";" + toFl(t[4].innerHTML);
    	}
    }

	setCookie("daystat", cookie);
	setCookie("warg_us_medals_save", getCookie("warg_us_medals"));
	alert("Saved");

}
function setCookie(name, value) {
	var savestr = escape(value),
		savestr2 = false;
	if (savestr.length > 3900) {
		savestr2 = savestr.slice(3900);
		savestr = savestr.slice(0, 3900);
	}
	document.cookie = name +"=" + savestr+"; expires=Mon, 01-Jan-2031 00:00:00 GMT";  
	if (savestr2) {
		document.cookie = name + "__2" +"=" + savestr2+"; expires=Mon, 01-Jan-2031 00:00:00 GMT"; 
	}
}