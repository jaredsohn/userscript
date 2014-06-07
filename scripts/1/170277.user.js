// ==UserScript==
// @name		WoTStatScript
// @version		0.9.0.82
// @description More info for World of Tanks profile page. Updated for the new style.
// @author		Orrie
// @contributor Boom_Box
// @namespace	http://forum.worldoftanks.eu/index.php?/topic/263423-
// @updateURL	http://userscripts.org/scripts/source/170277.meta.js
// @downloadURL http://userscripts.org/scripts/source/170277.user.js
// @icon		http://dl.dropboxusercontent.com/u/12497046/wot/projects/statscript/img/icon.png
// @match		http://worldoftanks.eu/*/*/*
// @match		http://worldoftanks.com/*/*/*
// @match		http://worldoftanks.ru/*/*/*
// @match		http://worldoftanks.asia/*/*/*
// @match		http://worldoftanks.kr/*/*/*
// @include		http://worldoftanks.eu/*/*/*
// @include		http://worldoftanks.com/*/*/*
// @include		http://worldoftanks.ru/*/*/*
// @include		http://worldoftanks.asia/*/*/*
// @include		http://worldoftanks.kr/*/*/*
// @grant		GM_xmlhttpRequest
// ==/UserScript==

// script variables
var scripthost = "http://userscripts.org/scripts/show/170277";
	threadlink = "http://forum.worldoftanks.eu/index.php?/topic/263423-";
	sid = "orrie_js_174043"; // noobmeter api id
	nm_host = "http://noobmeter.com";
	scriptlink = "<div class='b-scriptlink'><a target='_blank' href="+scripthost+">Script</a> version 0.9.0.82 - <a target='_blank' href="+threadlink+">Thread</a></div>";

// fetch wg related info
var wg_host = document.location.host;
	if (wg_host.match(/xbox360/)) { server = "xbox"; }
	else { server = wg_host.match(/\.([^\.]+)$/)[1]; }
	wg_path = document.location.pathname;
	wg_accounts = wg_path.match(/(community|uc)\/accounts\/\d+/);
	if (wg_path.match(/(edit|battles|provinces|reserve|treasury)/)) {
		wg_clans = null;
	}
	else {
		wg_clans = wg_path.match(/(community|uc)\/clans\/[\w\-]+/);
	}

// determine browser types, beware inconsistencies, no method is reliable.
var gecko = /Mozilla/.test(navigator.appCodeName),	// true for ff (and chrome lol)
	opera = /Opera/.test(navigator.appName),		// only true for opera
	chrome = /Chrome/.test(navigator.userAgent);
if (opera || chrome){ gecko = false; }

// globally inserting functions into head as scripts
var scripts = [copyClipboard, chromeFix];
for (i=0; i<scripts.length; ++i) {
	var script = document.createElement('script');
	script.className = "wotstatscript";
	script.type = "text/javascript";
	script.textContent = scripts[i].toString();
	document.head.appendChild(script);
}

// global colour defines
var stat = (function() {
	var color = {
		sup_uni: "5A3175", // super unicum
		unicum:	 "6A4B9F", // unicum
		great:	 "4A92B7", // great
		v_good:	 "4C762E", // very good
		good:	 "589031", // good
		avg:	 "D7B600", // average
		b_avg:	 "D84300", // below average
		bad:	 "D00900", // bad
		v_bad:	 "940000", // very bad
		none:	 "6B6B6B"  // default gray
	};
	return { color: color };
})();

// new colour function
var colStatArr = [
	{ color: stat.color.sup_uni, wn8: 2900, scale_wn8:	 100, wn7: 2050, scale_wn7: 97.56, eff: 2050, scale_eff: 99.67, nm: 2000, battles: 25000, winrate: 65, survrate: 50, hitrate: 80 },
	{ color: stat.color.unicum,	 wn8: 2350, scale_wn8: 87.96, wn7: 1850, scale_wn7: 90.31, eff: 1800, scale_eff: 94.94, nm: 1950, battles: 21000, winrate: 60, survrate: 45, hitrate: 75 },
	{ color: stat.color.great,	 wn8: 1900, scale_wn8: 73.54, wn7: 1550, scale_wn7: 74.56, eff: 1500, scale_eff: 78.50, nm: 1750, battles: 17000, winrate: 57, survrate: 40, hitrate: 70 },
	{ color: stat.color.v_good,	 wn8: 1600, scale_wn8: 62.72, wn7: 1350, scale_wn7: 62.75,										  battles: 13000, winrate: 54, survrate: 35, hitrate: 65 },
	{ color: stat.color.good,	 wn8: 1250, scale_wn8: 50.21, wn7: 1100, scale_wn7: 48.21, eff: 1200, scale_eff: 56.71, nm: 1450, battles: 10000, winrate: 52, survrate: 30, hitrate: 60 },
	{ color: stat.color.avg,	 wn8:  900, scale_wn8: 38.33, wn7:	900, scale_wn7: 37.44, eff:	 900, scale_eff: 36.26, nm: 1250, battles:	7000, winrate: 48, survrate: 25, hitrate: 50 },
	{ color: stat.color.b_avg,	 wn8:  600, scale_wn8: 28.07, wn7:	700, scale_wn7: 27.69, eff:	 600, scale_eff: 14.42, nm: 1150, battles:	3000, winrate: 46, survrate: 20, hitrate: 45 },
	{ color: stat.color.bad,	 wn8:  300, scale_wn8: 16.13, wn7:	500, scale_wn7: 18.87,										  battles:	1000, winrate: 43, survrate: 15, hitrate: 40 },
	{ color: stat.color.v_bad,	 wn8:	 0, scale_wn8:	   0, wn7:	  0, scale_wn7:		0, eff:	   0, scale_eff:	 0, nm:	   0, battles:	   0, winrate:	0, survrate:  0, hitrate:  0 }
];

// localization
// cz-czech	  - Crabt33
// de-german  - ArtiOpa
// fr-french  - SuperPommeDeTerre
// pl-polish  - KeluMocy
// ru-russian - dimon222
var locale = {
	// profile page
	p01: { lang: "Go to Bottom",					ru: "Пролистать вниз",							cz: "Konec stránky",						de: "nach unten",								fr: "Aller à la fin",									pl: "Koniec strony"							},
	p02: { lang: "Go to Top",						ru: "Пролистать наверх",						cz: "Začátek stránky",						de: "nach oben",								fr: "Aller au début",									pl: "Początek strony"						},
	p03: { lang: "Days Ago",						ru: "Дней назад",								cz: "dnů",									de: "Tage in WOT aktiv",						fr: "jours",											pl: "Dni temu"								},
	p04: { lang: "Player Stats:",					ru: "Статистика игрока:",						cz: "Stat. hráče:",							de: "Spielerstatistik",							fr: "Statistiques du joueur:",							pl: "Statystyki gracza:"					},
	p05: { lang: "Signature:",						ru: "Подпись:",									cz: "Podpis:",								de: "Forumsignatur",							fr: "Signature:",										pl: "Sygnatura do forum:"					},
	p06: { lang: "Light",							ru: "Светлые тона",								cz: "Světlý",								de: "Signatur Schwarz",							fr: "Claire",											pl: "Jasna"									},
	p07: { lang: "Dark",							ru: "Тёмные тона",								cz: "Tmavý",								de: "Signatur Weiß",							fr: "Foncée",											pl: "Ciemna"								},
	p08: { lang: "Replays:",						ru: "Реплеи:",									cz: "Záznamy:",								de: "Wiederholung",								fr: "Replays:",											pl: "Powtórki:"								},
	p09: { lang: "Victories",						ru: "Победы",									cz: "Vítězství",							de: "Siege",									fr: "Victoires",										pl: "Zwycięstw"								},
	p10: { lang: "Battles Participated",			ru: "Участий в битвах",							cz: "Počet bitev",							de: "Gefechte geführt",							fr: "Batailles participées",							pl: "Bitew"									},
	p11: { lang: "Average Experience",				ru: "Средний опыт",								cz: "Průměrné zkušenosti",					de: "Durchnittl. Erfahrung",					fr: "Expérience moyenne",								pl: "Średnie doświadczenie"					},
	p12: { lang: "Average Tier",					ru: "Средний уровень танка",					cz: "Průměrný Tier",						de: "Durchschnittl. Stufe",						fr: "Tiers moyen",										pl: "Średni poziom pojazdu"					},
	p13: { lang: "Win/Loss Ratio",					ru: "Отношение Победы/Поражения",				cz: "Poměr vítězství/porážek",				de: "Verhältnis Siege/ Niederlagen",			fr: "Ratio Victoires/Défaites",							pl: "Zwycięstwa/porażki"					},
	p14: { lang: "Performance Ratings",				ru: "Рейтинги производительности",				cz: "Hodnocení bojového výkonu",			de: "Leistungsverhältnis",						fr: "Indices de performances",							pl: "Statystyki wydajności"					},
	p15: { lang: "WN8",								ru: "WN8",										cz: "WN8",									de: "WN8",										fr: "WN8",												pl: "WN8"									},
	p16: { lang: "Efficiency",						ru: "Эффективность",							cz: "Efficiency",							de: "Effizienz",								fr: "Efficacité",										pl: "Efficiency"							},
	p17: { lang: "NoobMeter",						ru: "NoobMeter",								cz: "NoobMeter",							de: "NoobMeter",								fr: "NoobMeter",										pl: "NoobMeter"								},
	p18: { lang: "Fetching...",						ru: "Загрузка...",								cz: "Načítám...",							de: "abrufen...",								fr: "Récupération...",									pl: "Pobieranie..."							},
	p19: { lang: "Performance Rating Calculations",	ru: "Вычисления рейтинга производительности",	cz: "Výpočet hodnocení bojového výkonu",	de: "Leistungsberechnung",						fr: "Calculs des indicateurs de performances",			pl: "Obliczenia statystyk wydajności"		},
	p20: { lang: "Formula Type",					ru: "Тип формулы",								cz: "Typ výpočtu",							de: "Formel",									fr: "Type de formule",									pl: "Formuła"								},
	p21: { lang: "Total",							ru: "Всего",									cz: "Celkem",								de: "Gesamt",									fr: "Total",											pl: "Wynik"									},
	p22: { lang: "Scaled",							ru: "Шкала",									cz: "Stupnice",								de: "Skaliert",									fr: "A l'échelle",										pl: "Skalowanie"							},
	p23: { lang: "Destroyed",						ru: "Уничтожено",								cz: "Zničeno",								de: "Zerstört",									fr: "Détruits",											pl: "Fragi"									},
	p24: { lang: "Damage",							ru: "Урон",										cz: "Poškození",							de: "Schaden",									fr: "Dommages",											pl: "Obrażenia"								},
	p25: { lang: "Detected",						ru: "Обнаружено",								cz: "Detekováno",							de: "Aufgeklärt",								fr: "Détectés",											pl: "Wykrycia"								},
	p26: { lang: "Capping",							ru: "Захват",									cz: "Obsazení",								de: "Erobert",									fr: "Capture",											pl: "Zdobycie bazy"							},
	p27: { lang: "Defense",							ru: "Оборона",									cz: "Obrana",								de: "Verteidigt",								fr: "Défense",											pl: "Obrona bazy"							},
	p28: { lang: "Victories",						ru: "Победы",									cz: "Vítězství",							de: "Siege",									fr: "Victoires",										pl: "Zwycięstwa"							},
	p29: { lang: "WN8",								ru: "WN8",										cz: "WN8",									de: "WN8",										fr: "WN8",												pl: "WN8"									},
	p30: { lang: "WN7",								ru: "WN7",										cz: "WN7",									de: "WN7",										fr: "WN7",												pl: "WN7"									},
	p31: { lang: "Efficiency",						ru: "Эффективность",							cz: "Efficiency",							de: "Effizienz",								fr: "Efficacité",										pl: "Efficiency"							},
	p32: { lang: "What is WN Efficiency?",			ru: "Что такое WN эффективность?",				cz: "Co je WN hodnocení?",					de: "Was bedeutet WN Effizienz",				fr: "Qu'est que l'efficacité WN ?",						pl: "Czym jest statystyka wydajności WN?"	},
	p33: { lang: "Ace Tanker",						ru: "Мастер",									cz: "Hrdina",								de: "Panzer Ass",								fr: "As du char",										pl: "As Pancerny"							},
	p34: { lang: "1st Class",						ru: "1 степень",								cz: "1. třídy",								de: "1ter Klasse",								fr: "Classe 1",											pl: "Pierwsza Klasa"						},
	p35: { lang: "2nd Class",						ru: "2 степень",								cz: "2. třídy",								de: "2ter Klasse",								fr: "Classe 2",											pl: "Druga Klasa"							},
	p36: { lang: "3rd Class",						ru: "3 степень",								cz: "3. třídy",								de: "3ter Klasse",								fr: "Classe 3",											pl: "Trzecia Klasa"							},
	p37: { lang: "No Badge",						ru: "Нет значка",								cz: "Nezískáno",							de: "kein Orden",								fr: "Aucun badge",										pl: "Bez odznaki"							},
	p38: { lang: "Total Vehicles",					ru: "Общее количество техники",					cz: "Celkem vozidel",						de: "Alle Fahrzeuge",							fr: "Nombre total de véhicules",						pl: "Całkowita liczba pojazdów"				},
	p39: { lang: "Battles Participated:",			ru: "Участий в битвах:",						cz: "Počet bitev:",							de: "An Gefechten teilgenommen",				fr: "Batailles participées:",							pl: "Bitwy:"								},
	p40: { lang: "Victories:",						ru: "Победы:",									cz: "Vítězství:",							de: "Siege",									fr: "Victoires:",										pl: "Zwycięstwa:"							},
	p41: { lang: "Defeats:",						ru: "Поражения:",								cz: "Porážek:",								de: "Niederlagen",								fr: "Défaites:",										pl: "Porażki:"								},
	p42: { lang: "Draws:",							ru: "Ничья:",									cz: "Remíza:",								de: "Unentschieden",							fr: "Egalités:",										pl: "Remisy:"								},
	p43: { lang: "Battles Survived:",				ru: "Битв пережито:",							cz: "Přežito bitev:",						de: "Gefechte überlebt",						fr: "Batailles survécues:",								pl: "Przetrwane bitwy:"						},
	p44: { lang: "Average Battles per Day:",		ru: "Среднее число битв за день:",				cz: "Průměrný počet bitev za den:",			de: "Durschnittliche Gefechte pro Tag",			fr: "Nombre moyen de batailles par jour:",				pl: "Średnia bitew na dzień:"				},
	p45: { lang: "Experience:",						ru: "Опыт:",									cz: "Zkušenosti:",							de: "Erfahrung",								fr: "Expérience:",										pl: "Doświadczenie:"						},
	p46: { lang: "Average Experience per Battle:",	ru: "Средний опыт за битву:",					cz: "Průměrné zkušenosti za bitvu:",		de: "Durchschnittserfahrung",					fr: "Expérience moyenne par bataille:",					pl: "Średnie doświadczenie na bitwę:"		},
	p47: { lang: "Maximum Experience per Battle:",	ru: "Максимальный опыт за битву:",				cz: "Maximální zkušenosti za bitvu:",		de: "Höchste Gefechtserfahrung",				fr: "Expérience maximum par bataille:",					pl: "Maksymalne doświadczenie na bitwę:"	},
	p48: { lang: "Destroyed:",						ru: "Уничтожено:",								cz: "Zničeno:",								de: "Zerstört",									fr: "Détruits",											pl: "Zniszczeni przeciwnicy:"				},
	p49: { lang: "Deaths:",							ru: "Смертей:",									cz: "Nepřežil:",							de: "Tode",										fr: "Morts",											pl: "Zniszczony:"							},
	p50: { lang: "Detected:",						ru: "Обнаружено",								cz: "Detekováno:",							de: "Aufgeklärt",								fr: "Détectés",											pl: "Wykrytych:"							},
	p51: { lang: "Hit Ratio:",						ru: "Коэффициент попаданий:",					cz: "Přesnost střelby:",					de: "Trefferquote",								fr: "Ratio de hit",										pl: "Celność:"								},
	p52: { lang: "Damage Caused:",					ru: "Урона нанесено:",							cz: "Udělené poškození:",					de: "Schaden verursacht",						fr: "Dommages causés:",									pl: "Zadane obrażenia:"						},
	p53: { lang: "Damage Received:",				ru: "Урона получено:",							cz: "Přijaté poškození:",					de: "Schaden erhalten",							fr: "Dommages reçus:",									pl: "Otrzymane obrażenia:"					},
	p54: { lang: "Base Capture Points:",			ru: "Очки захвата:",							cz: "Bodů obsazení základny:",				de: "Eroberungspunkte",							fr: "Points de capture de base:",						pl: "Punkty przejęcia bazy:"				},
	p55: { lang: "Base Defense Points:",			ru: "Очки обороны:",							cz: "Bodů obrany základny:",				de: "Verteidigungspunkte",						fr: "Points de défense de base:",						pl: "Punkty obrony bazy:"					},
	p56: { lang: "Average Tier:",					ru: "Средний уровень:",							cz: "Průměrný Tier:",						de: "Durchschnittliche Stufe",					fr: "Tiers moyen:",										pl: "Średni poziom pojazdów:"				},
	p57: { lang: "Vehicle Tiers",					ru: "Уровни техники",							cz: "Tiery vozidel",						de: "Fahrzeuge Stufe",							fr: "Tiers du véhicule",								pl: "Poziomy czołgów"						},
	p58: { lang: "Tier",							ru: "Уровень",									cz: "Tier",									de: "Stufe",									fr: "Tiers",											pl: "Poziom"								},
	p59: { lang: "Total Vehicles:",					ru: "Количество техники:",						cz: "Celkem vozidel:",						de: "Gesamt Fahrzeuge",							fr: "Nombre total de véhicules:",						pl: "Całkowita liczba pojazdów:"			},
	p60: { lang: "Tankopedia",						ru: "Танковедение",								cz: "Tankpédie",							de: "Tankopedia",								fr: "Tankopedia",										pl: "Tankopedia"							},
	p61: { lang: "Tank Statistics",					ru: "Статистика танка",							cz: "Statistiky vozidel",					de: "Panzer Statistik",							fr: "Statistiques des chars",							pl: "Statystyki czołgu"						},
	p62: { lang: "Premium Tanks",					ru: "Премиум танки",							cz: "Premium tanky",						de: "Premium Panzer",							fr: "Chars premiums",									pl: "Czołgi premium"						},
	p63: { lang: "Copy stats to Clipboard",			ru: "Скопировать в буфер обмена",				cz: "Kopírovat Stat. do schránky",			de: "Statistiken in Zwischenablage kopieren",	fr: "Copier les statistiques vers le presse-papiers",	pl: "Kopiuj statystyki do schowka"			},
	p64: {
		lang: "Press Ctrl+C, or Right-Click and Copy",
		ru: "Нажмите Ctrl+C или ПКМ и Скопировать",
		cz: "Stiskni Ctrl+C, nebo klikni pravým tl. myši a vyber Kopírovat",
		de: "STRG+C/ rechter Mausklick und Kopieren",
		fr: "Appuyez sur Ctrl+C, ou clic droit et Copier",
		pl: "Naciśnij Ctrl+C, lub prawy klawisz myszy i 'Kopiuj'"
	},
	p65: {
		lang: "WoTStatScript not active, because of player having 0 battles",
		ru: "Скрипт неактивен, т.к. у игрока 0 битв",
		cz: "WoTStatScript není aktivní, protože hráč má 0 bitev",
		de: "WoTStatScript inaktiv wegen fehlender Gefechte",
		fr: "WoTStatScript n'est pas actif, car le joueur a 0 batailles",
		pl: "WoTStatScript nieaktywny, ponieważ gracz rozegrał 0 bitew"
	},
	p66: { lang: "Clan Stats:",		ru: "Статистика клана:",   cz: "Stat. klanu:",	de: "Clanstatistiken",	fr: "Statistiques du clan:",	pl: "Statystyki klanu:"	},
	p67: { lang: "Replays:",		ru: "Реплеи:",			   cz: "Záznamy:",		de: "Wiederholungen",	fr: "Replays:",					pl: "Powtórki:"			},
	p68: { lang: "Tier 10 Only",	ru: "Уровень 10 Только",   cz: "Pouze Tier 10",	de: "nur Stufe 10",		fr: "Seulement les tiers 10",	pl: "Tylko 10 tier"		},
	p69: {
		lang: "Battles missing from API, ratings may be inaccurate",
		ru: "Отсутствует Battles от API, рейтинги могут быть неточными",
		cz: "Některé bitvy se z API nenačetly, hodnocení může být nepřesné",
		de: "Fehlende API Gefechtsdaten, Bewertungen können ungenau sein",
		fr: "Des batailles manquent de l'API, les indices peuvent être faussés",
		pl: "Brakujące bitwy, obliczenia mogą być niedokładne"
	},
	p70: { lang: "Hit Ratio",		ru: "Коэффициент попаданий",	cz: "Přesnost střelby",		de: "Trefferquote",					fr: "Ratio de hit",			pl: "Celność"			},
	p71: { lang: "Average Damage",	ru: "Средний Урона",			cz: "Průměrné poškození",	de: "Durchschnittlicher Schaden",	fr: "Dommages moyens",		pl: "Średnie obrażenia"	},
	p72: { lang: "Stats for",		ru: "Cтатистика для",			cz: "Statistika hráče",		de: "Statistik für",				fr: "Statistiques pour ",	pl: "Statystyki z"		},
	p73: { lang: "Battles:",		ru: "Битвы:",					cz: "Bitev:",				de: "Gefechte",						fr: "Batailles:",			pl: "Bitew:"			},
	// clan page
	c01: { lang: "Clan Stats / Replays:",	ru: "Статистика клана / Реплеи:",	cz: "Statistiky klanu / Záznamy",	de: "Clan Statistiken / Wiederholungen",	fr: "Statistiques du clan / Replays:",	pl: "Statystyki klanu / Powtórki:" },
	//p00: { lang: "p00_en", ru: "p00_ru", cz: "", de: "", fr: ":", pl: ""},
	end: {}
};

// region settings and language detection
// wotlabs, noobmeter, mywotstats, feldzug, wotcs, wotreplays and wot-news
var lang_detect = document.getElementsByClassName('b-portalmenu_links_list_point')[4].firstElementChild.innerHTML.toLowerCase();
	wl_srv = nm_srv = mws_srv = fz_srv = wr_srv = wn_srv = null;
switch(server) {
	case ("eu"):
		wl_srv = nm_srv = mws_srv = fz_srv = wr_srv = wn_srv = server;
		switch(lang_detect) {
			case ("support"):		break; // english
			case ("podpora"):		for (var x in locale) { locale[x].lang = locale[x].cz; } break; // czech
			case ("kundendienst"):	for (var x in locale) { locale[x].lang = locale[x].de; } break; // german
			case ("soporte"):		break; // spanish
			case ("aide"):			for (var x in locale) { locale[x].lang = locale[x].fr; } break; // french
			case ("pomoc"):			for (var x in locale) { locale[x].lang = locale[x].pl; } break; // polish
			case ("destek"):		break; // turkish
			default: break;
		}
		break;
	case ("ru"): // russian
		nm_srv = fz_srv = wr_srv = wn_srv = server;
		for (var x in locale) {
			locale[x].lang = locale[x].ru;
		}
		break;
	case ("com"):
		wl_srv = nm_srv = mws_srv = fz_srv = "na"; wr_srv = "com"; wn_srv = "us";
		switch(lang_detect) {
			case ("support"):	locale.p27.lang = "Defence"; locale.p55.lang = "Base Defence Points:"; break; // american - muh freedom
			case ("soporte"):	break; // argentinian spanish
			case ("suporte"):	break; // brazilian portuguese
			default: break;
		}
		break;
	case ("asia"):
		wl_srv = nm_srv = mws_srv = wn_srv = "sea"; fz_srv = server; wr_srv = "com";
		switch(lang_detect) {
			case ("support"):	break; // english
			case ("支援"):		break; // thai
			case ("サポート"):	break; // japanese
			case ("สนับสนุน"):		break; // taiwanese mandarin
			default: break;
		}
		break;
	case ("kr"): // korean
		nm_srv = fz_srv = server; wr_srv = "com";
		break;
	case ("xbox"):
		break;
	default: break;
}

// variables for dropbox and data uri
// dropbox url
var dropbox = "https://dl.dropboxusercontent.com/u/12497046/wot/projects/statscript/img";
// data uri
	uri_context_menu = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPQAAAABCAIAAABmEhQDAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwQAADsEBuJFr7QAAABp0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMTFH80I3AAAAHklEQVQoU2MAAj4BAR5ePi6eUTSKhgni4eFjYGAAAN9YIhjam+zlAAAAAElFTkSuQmCC";
	uri_pr_hitrate = "data:image/png;base64,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";
	uri_pr_avgtier = "data:image/png;base64,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";
	uri_nm_logo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH3QEGBzcwye5VIAAAAYJJREFUOMvdkj1rFGEUhZ/zzsxODIJITCsiiAgBI4lJLIKFgpWNFmInyg5Y+FcsbAxr5YJobS1IiJKEjYixFgsDfnZrwJ2Zd45FdpcQK0s93f3g3udyLvzTmm2/CenB5HyxmW11FqtRPHNnO5MaT4RfLp3z7tG5OKqlqs/o4IALRS+rqK/YYS6o2Z5MB6u4qfv1kSZRedLWLNKC8Beb3T8ISighw4LohH6VAZCoemjCE/DLrc5id0wxRm/3bgOy/dRwU4ABGEJah4Hjh/Tz7f6FAlgqXs1U5O89bBacBu4DLeAuuGu0AnRlE1RfS0P5en3l4jfNF5sPGif3EMZugCCpAF4AH4Fp22clTYKfG43QCKovB1tTDHklLNjBvmX7E3jHcEKwbPiwR+chqBHsCuB8sfGscXJjfIJcG6XCA6NcdjRKxF4+EL9Lvt7rLK2NbVwo1i8ZnQpSHWMdG5OL2Ldax/LEPyLpFB58Nq2jE3x9vNa5Otjn/ar+5gPn2huB/0e/AX1vrAJEHenoAAAAAElFTkSuQmCC";
	uri_rating_meter = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA3kAAAASCAYAAADmKxfRAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOvwAADr8BOAVTJAAAABp0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMTFH80I3AAAEw0lEQVR4Xu3csWsTbxzH8ZvUP8AtGCgpFCskiiTxSCWhaFOhg4RDUTwzZFBaK+SxLoUoVRPELgpxaBGdHJo4Oit0UNrdKR3av+T59fu91N9Q754HjgvP3X2GD3xf6003PLytb7YtaF8yGR4M6/pPLiNGNZtHN2ymj1ZtcXA3w6Mbjs6Hv2ze6Mfxtz8ebKaXP9V5nZ0mD46P1z66otm9waMbnqzF4LdwP//k0Q2ny5vPvov1hzs8umEzvXj1Cc96YFmCtjweDOu6f8YSG+PRDZvp3qwlti97oxuOzt22t61X3mAzXX2U45XvZXlwfFy4dUGUnCke3fBknb/fFsXHr3l0w+nyfL4llkptHt2wmbYv3uFZ745/1mnPx4NhXX89a4ndc97ohs30ftUSw6I3uuHovDfwNnjvDTbTC2KG1+jleXB8XH96Scy50zy64cn65tuhqKx94NENp8uthb5wKi94dMNmejZb49FzTUn7ksnwYFjXf3IZOarZPLphM320asuDuxke3XB0Pvxl80Y/jr/98WAzvfypzuvsNHlwfLz20ZXN7g0e3fBkLQa/pfv5J49uOF3efPZdrj/c4dENm+nFq0949FxT0pbHg2Fd989YcmM8umEz3Zu15PZlb3TD0bnb9rb1yhtspquPcrzyvSwPjo8Lty7IkjPFoxuerPP327L4+DWPbjhdns+35FKpzaMbNtP2xTs8eq4pac/Hg2Fdfz1ryd1z3uiGzfR+1ZLDoje64ei8N/A2eO8NNtMLYobX6OV5cHxcf3pJzrnTPLrhyfrm26GsrH3g0Q2ny62FvnQqL3h0w2Z6Nlvjoa4JG+2RRj0SPu0Dn/ojHN6HGvVGODp3FPVFOPluBtQfYTPsatYaYZjudUUtMuleqb8RL5t9Ht1hfX3qNg91Tdhob/yjFgmrve1Tf4TDu6tRb4Sjc1lRX4ST71JA/RE2w0XNWiMM072kqEUm3bWcI65lF3l0h/WVTJWHuiZstHc16pHwaQ996o9weO9p1Bvh6NxQ1Bfh5HsuoP4Im+GKZq0Rhul2FLXIpLs+4wonv8qjO6ynzxd4qGvCRnukUY+ET/vAp/4Ih/ehRr0Rjs4dRX0RTr6bAfVH2Ay7mrVGGKZ7XVGLTLpX6m/ky2afR3dYX5+6zUNdEzbaG/+oRcJqb/vUH+Hw7mrUG+HoXFbUF+HkuxRQf4TNcFGz1gjDdC8papFJdy3nyGvZRR7dYX0lU+Whrgkb7V2NeiR82kOf+iMc3nsa9UY4OjcU9UU4+Z4LqD/CZriiWWuEYbodRS0y6a7PuNLJr/LoDuvp8wUe6pop95FGTRCGk+5RQM0RhuPqjk+dEobTZFej7gjDKm8G1DFN8grqmvCJexo1QRhOurcCao4wHFeXfeqUMJwmFzXqjjCs8nxAHdMk11DXhE+8r1EThOGkexBQc4ThuLrhU6eE4TS5olF3hGGVWwF1TJNcR10TPvGRRk0QhpPuUUDNEYbj4o5PjRKG02xXo+4IwypvBtQxTTLqmvBf9zRqgjCcdG8F1BxhOC4u+9QoYTjNLmrUHWFY5fmAOqZJRl0T/ut9jZogDCfdg4CaIwzHxQ2fGiUMp9kVjbojDKvcCqhjmuT/65oF+R+xEXfPxFwokgAAAABJRU5ErkJggg==";
	uri_rating_meter_marker = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAANCAYAAABhPKSIAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjExR/NCNwAAAHJJREFUKFNjAAJBIBYGYhEgFoLywRwxIJaAYrCgOBBLff369QiyoBQQy/348eMukJYGYpBOBjkgVvz9+/dbKBtkFIOitbW1/p8/fz6B2EAMMo5BJS0tzQ4qqAzEIHOxq8RqJlbbsboT2UcgGqwSze8MggCsoip1zUe8kQAAAABJRU5ErkJggg==";
	uri_tiers = "data:image/png;base64,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";
	uri_badges_class_none = "data:image/png;base64,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";
	uri_badges_class_total = "data:image/png;base64,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";

// matches url with profile page and checks if profile has any battles as script is useless without
if (wg_accounts !== null) {
	var speed_table_battles = filter(document.getElementsByClassName('t-personal-data_value')[2].innerHTML, 1);
	if (speed_table_battles > 0) {
		// style variables
			box_background = "border: 1px solid rgba(255, 255, 255, 0.05); box-shadow: 0 0 38px 1px rgba(0, 0, 0, 0.3) inset, 0 0 23px 1px rgba(255, 255, 255, 0.02), 0 0 5px 1px rgba(0, 0, 0, 0.5) inset;";
			input_background = "background: rgba(0, 0, 0, 0.09); border: 1px solid #000000; box-shadow: 0 0 1px 1px rgba(255, 255, 255, 0.15) inset, 0 0 38px 1px rgba(0, 0, 0, 0.3) inset, 0 0 23px 1px rgba(255, 255, 255, 0.02), 0 0 5px 1px rgba(0, 0, 0, 0.5) inset; color: #606061;";
		// style contents
		var style = document.createElement('style');
			style.className = "wotstatscript";
			style.innerHTML
				// global rules
				= "h3, h4 {margin: 0 0 15px; text-align: center;}"
				+ "h5 {margin: 5px 0 8px;}"
				+ "p, .reg-KR p {margin: 0;}"
				+ ".reg-KR p {line-height: 133%;}"
				+ "table {width: 100%;}"
				// page fix page slowdown
				+ ".l-page {background-position: center 0 !important;}"
				// container wrapper
				+ ".l-container-wrapper {background: none;}"
				// content width
				+ ".l-content {margin: 0 22px 25px; width: 955px}"
				// background rules
				+ ".b-background {height: 315px; left: -22px; opacity: 0.5; position: absolute; top: -25px; width: 1000px; z-index: -1;}"
				+ ".b-background img {width: 100%;}"
				// profile wrapper rules
				+ ".b-profile-wrpr {margin: 15px 0 0; min-height: 132px;}"
				+ ".b-profile-wrpr td {font-weight: bold; line-height: 133%;}"
				+ ".b-profile-wrpr table a {background: url('/static/3.13.0.2.1/common/css/scss/context-menu/img/arrow.png') no-repeat 0 2px; color: #CACBCC; padding: 0 0 0 10px;}"
				+ ".b-profile-wrpr table a:hover {background: url('/static/3.13.0.2.1/common/css/scss/context-menu/img/arrow.png') no-repeat -244px 2px; color: #FFFFFF;}"
				+ ".b-scriptlink {"+input_background+" position: absolute; right: 0px; text-align: center; top: -1px; padding: 7px 0 6px; width: 199px;}"
				+ ".b-profile-name {float: none; margin: 0; max-width: 345px;}"
				+ ".b-profile-name table {font-family: Arial; width: 370px;}"
				+ ".b-profile-name td:first-child {white-space: nowrap;}"
				+ ".reg-RUS .b-profile-name td:first-child {width: 120px;}"
				+ ".reg-KR .b-profile-name td:first-child {width: 80px;}"
				+ ".b-header-h1__profile {margin: 0; padding: 0 0 6px;}"
				+ "body.reg-KR h1, body.reg-KR .b-header-h1 {line-height: 1;}"
				+ ".b-profile-error {background: rgba(204,0,0,0.15); border: 1px solid #510000; box-shadow: 0 0 3px #733232; color: #CACBCC; padding: 3px; text-align: center; position: absolute; left: 225px; top: 0;}"
				// clan wrapper rules
				+ "#js-clan-block-container {left: 385px; position: absolute; top: 25px;}"
				+ ".b-profile-clan {float: none; max-width: 360px; margin: 0;}"
				+ ".b-profile-noclan {float: none; margin: 27px 0 0;}"
				+ ".b-photo {min-height: 54px;}"
				+ "a.b-link-clan, .b-link-clan a {display: inline;}"
				+ ".b-statistic {margin: 0 0 3px;}"
				+ "#js-clan-block-container table {font-family: Arial; width: 360px;}"
				+ "#js-clan-block-container td:first-child {white-space: nowrap;}"
				+ ".reg-RUS #js-clan-block-container td:first-child {width: 115px;}"
				+ ".reg-KR #js-clan-block-container td:first-child {width: 70px;}"
				// profile menu rules
				+ ".b-profile-menu {position: absolute; right: 200px; top: 0;}"
				+ ".b-profile-menu .b-context-menu {width: 149px;}"
				+ ".b-profile-menu .b-context-menu-list__bottomindent {margin-bottom: 30px;}"
				// sidebar rules
				+ ".l-sidebar {margin: 0; position: absolute; right: 0; top: 25px; width: auto;}"
				+ ".b-context-menu {background: url("+uri_context_menu+") repeat-y; border-right: 1px solid black; float: left; margin: 0; width: 200px;}"
				+ ".b-context-menu_wrapper {padding: 10px 0 5px;}"
				+ ".b-context-menu-list {line-height: 16px;}"
				+ ".b-sidebar-widget__comparison {background-color: #000000; border: 1px solid #000000; margin: 0; position: absolute; left: 224px; top: -26px; width: 203px;}"
				+ ".b-sidebar-widget_inner__comparison {display: table; margin: 5px auto; padding: 0;}"
				+ ".js-recruitsation-block {position: absolute; right: -228px; top: 0px; width: 205px;}"
				+ ".b-sidebar-widget_title {margin: 0 0 10px;}"
				+ ".b-sidebar-widget_text {margin: 0 0 5px;}"
				// ratings to clipboard rules
				+ ".ratingsClip {position: absolute; right: 200px; top: -1px;}"
				+ ".ratingsClip input {"+input_background+" font-size: 12px; margin: 0; padding: 5px 7px;}"
				+ ".ratingsClip input:hover {background-color: #282828; cursor: pointer;}"
				// userblock wrapper rules
				+ ".b-userblock-wrpr {margin: 0 0 -2px;}"
				+ ".b-user-block {"+box_background+" margin: 0; width: 750px;}"
				+ ".b-head-block {background: url('/static/3.13.0.2.1/common/css/scss/tables/img/th-profile-bg.png') repeat-x; border: 1px solid #000000;}"
				+ ".b-user-block_info {padding: 5px 25px;}"
				+ ".b-personal-link {clear: left; margin: 53px 0 0;}"
				+ ".b-user-block__sparks {background: url('"+dropbox+"/sparks.png') no-repeat 50% 0; width: 100%;}"
				+ ".b-personal-data {min-height: 180px; padding: 0 20px 15px;}"
				+ ".t-personal-data_ico {padding: 82px 5px 0;}"
				+ ".t-personal-data_ico__hitrate {background: url("+uri_pr_hitrate+") no-repeat 50% 50px;}"
				+ ".t-personal-data_ico__tier {background: url("+uri_pr_avgtier+") no-repeat 50% 50px;}"
				+ ".t-personal-data_value {font-size: 28px; line-height: 100%;}"
				+ ".t-personal-data_value.t-personal-data_value__pr {font-size: 36px;}"
				+ ".b-speedometer-body {padding: 20px 50px;}"
				+ ".b-speedometer {width: 33.3333%}"
				// ratings wrapper rules
				+ ".b-ratings-wrpr {margin: 0 0 40px;}" // see multiple rules
				+ ".b-ratings-info {text-align: center;}"
				+ ".t-ratings-info {table-layout: fixed;}"
				+ ".t-ratings-info th {font-size: 13px; font-weight: bold; line-height: 133%;}"
				+ ".t-ratings-info td {font-family: 'WarHeliosCondCBold','Arial Narrow',arial,sans-serif; font-size: 36px; line-height: 133%}"
				+ ".t-ratings-info .rating-url_nm {background-image: url("+uri_nm_logo+"); background-position: left center; background-repeat: no-repeat; padding: 0 0 0 20px;}"
				+ ".b-ratings-info, .ratings-table {background: inherit; padding: 10px 25px;}"
				+ ".t-table-ratings {width: 100%;}"
				+ ".t-table-ratings td {line-height: 130%; padding: 9px 12px 2px 0; vertical-align: bottom;}"
				+ ".t-table-ratings .td-value {padding-right: 0; text-align: right; white-space: nowrap;}"
				+ ".t-table-ratings .td-number {color: #BABCBF; font-weight: bold; padding-right: 0; text-align: right; width: 70px;}"
				+ ".t-table-ratings .td-center {line-height: 16px; padding: 9px 0 2px; text-align: center;}"
				+ ".t-table-ratings .td-rating-meter {background: url('/static/3.17.0.1/common/css/scss/content/user/img/speedometr-separator.png') no-repeat 50% 100%; padding: 0;}"
				+ ".t-table-ratings .rating-meter {background: url("+uri_rating_meter+") no-repeat; border: 1px solid #252527; border-radius: 3px; height: 3px; margin: 0 7px;}"
				+ ".t-table-ratings .rating-meter-dail_line {background: url("+uri_rating_meter+") no-repeat; box-shadow: 0 0 10px 1px rgba(221, 84, 12, 0.15), 0 0 3px 1px rgba(133, 18, 11, 0.25); height: 3px;}"
				+ ".t-table-ratings .rating-meter-marker {background: url("+uri_rating_meter_marker+") no-repeat; float: right; height: 13px; margin: -5px -2px 0 0; width: 5px;}"
				+ ".t-table-ratings .rating-meter_wn8 {background-position: 0 0;}"
				+ ".t-table-ratings .rating-meter_wn8 .rating-meter-dail_line {background-position: 0 -3px;}"
				+ ".t-table-ratings .rating-meter_wn7 {background-position: 0 -6px;}"
				+ ".t-table-ratings .rating-meter_wn7 .rating-meter-dail_line {background-position: 0 -9px;}"
				+ ".t-table-ratings .rating-meter_eff {background-position: 0 -12px;}"
				+ ".t-table-ratings .rating-meter_eff .rating-meter-dail_line {background-position: 0 -15px;}"
				+ ".wnelink {background: inherit; padding: 5px 25px 5px 0; text-align: right;}"
				+ ".wnelink_info {background-image: url('/static/3.17.0.1/common/css/scss/content/links/img/ico-info.png'), url('/static/3.13.0.2.1/common/css/block/b-link/img/orange_arrow.png'); background-position: 4px 0px, right 0; padding: 0 9px 0 20px;}"
				+ ".wnelink_info:hover {background-position: 4px -17px, right -22px;}"
				// statistics wrapper rules
				+ ".b-statistics-wrpr {margin: 0 0 30px; overflow: auto;}"
				+ ".b-statistics-wrpr .t-dotted td {line-height: 23px; padding: 0;}"
				+ ".b-statistics-wrpr .t-dotted td.t-dotted_class-ico {line-height: 13px;}"
				+ ".b-statistics-wrpr .t-dotted td.t-dotted_class-ico img {margin: 2px 0 -1px;}"
				+ ".b-result {margin: 0 10px; width: 315px;}"
				+ ".b-result-classes {margin: 0 10px; width: 265px;}"
				+ ".b-result-classes span {color: #606061; display: inline-block; width: 48px;}"
				+ ".t-dotted td {background: url('/static/3.17.0.1/common/css/scss/content/user/img/speedometr-separator.png') no-repeat 50% 100%;}"
				// cake diagram rules
				+ ".b-diagrams-sector {margin: 0 0 25px;}"
				+ ".b-diagrams-sector h3 {text-align: center;}"
				+ ".b-diagram-block {float: left; margin: 0 9px; width: 300px;}"
				+ ".b-diagram-wrpr {float: none; margin: 0 auto;}"
				+ ".t-dotted.t-dotted__diagram {margin-top: 0px; width: 100%;}"
				+ ".t-dotted_diagram-percent {display: inline-block; width: 40px;}"
				+ ".b-diagram-total {margin: 25px 0 0;}"
				+ ".b-diagram-tiers .js-results {display: inline-block; margin: 0 0 0 30px; text-align: right; width: 14px;}"
				+ ".reg-RUS .b-diagram-tiers .js-results {margin: 0 0 0 15px;}"
				+ ".b-diagram-tiers .t-dotted_diagram-percent {margin: 0 0 0 3px; width: 52px;}"
				+ ".b-diagram-ico_tier {background: url("+uri_tiers+") no-repeat; padding-left: 30px;}"
				+ ".b-diagram-ico_tier-1 {background-position: 4px 1px;}"
				+ ".b-diagram-ico_tier-2 {background-position: 4px -14px;}"
				+ ".b-diagram-ico_tier-3 {background-position: 4px -29px;}"
				+ ".b-diagram-ico_tier-4 {background-position: 4px -45px;}"
				+ ".b-diagram-ico_tier-5 {background-position: 4px -59px;}"
				+ ".b-diagram-ico_tier-6 {background-position: 4px -74px;}"
				+ ".b-diagram-ico_tier-7 {background-position: 4px -89px;}"
				+ ".b-diagram-ico_tier-8 {background-position: 4px -104px;}"
				+ ".b-diagram-ico_tier-9 {background-position: 4px -120px;}"
				+ ".b-diagram-ico_tier-10 {background-position: 4px -134px;}"
				+ ".t-dotted__diagram tr td.t-dotted_diagram-last {width: 0;}"
				// achievement wrapper rules
				+ ".b-achievements-wrpr {}" // see multiple rules
				+ ".js-short-achievements {margin: 15px 0 30px;}"
				+ ".js-full-achievements {margin: 0 37px 30px;}"
				+ ".reg-KR .js-full-achievements {margin: 0 34px 30px;}"
				+ ".b-achivements {display: table; margin: 0 auto; padding: 0 0 20px;}"
				+ ".b-achivements-head {margin-top: 15px;}"
				+ ".b-achivements_item {display: inline-table; float: inherit; margin: 5px 5px 0;}"
				+ "#js-achivement-raider {margin-left: 40px;}"
				+ "#js-achivement-mechanicEngineer {margin-left: 80px;}"
				+ "#js-achivement-tankExpert0 {margin-left: 160px;}"
				// global rating rules
				+ ".b-composite-heading {margin: 20px 0 15px 400px; width: 553px;}"
				+ ".b-profile-ratings-date {margin-top: 1px}"
				+ ".b-profile-item__empty {display: table; margin: 0 auto; text-align: center;}"
				+ ".b-rating-dial__user {margin: 10px 21px 22px;}"
				+ ".b-leadership-info {display: table; margin: 0 auto;}"
				+ ".l-leadership-info-alignment {display: table; margin: 0 auto; text-align: center;}"
				+ ".b-unordered-lists_item {display: table; margin: 4px auto 5px;}"
				+ ".b-profile-link {display: table; margin: 8px auto -22px}"
				// vehicle table rules
				+ ".b-vehicles-wrpr {margin: 20px 0;}"
				+ ".b-vehicles-header {display: table; margin: 0 auto 15px}"
				+ ".b-profile-vehicles-tankstat {margin: 0; position: absolute; right: 15px;}"
				+ ".b-profile-vehicles-tankstat_link {background-image: url("+uri_nm_logo+"), url('/static/3.13.0.2.1/common/css/block/b-link/img/orange_arrow.png'); background-position: left center, right 0px; padding: 0 9px 0 20px;}"
				+ ".b-profile-vehicles-tankstat_link:hover {background-position: left center, right -22px;}"
				+ ".t-profile__vehicle .t-profile_right {text-align: center;}"
				+ ".t-profile_dropdown-ico .tablesorter-header-inner {display: inherit;}"
				+ ".t-profile_tankstype-prem .b-tankstype-text {color: #FFC363;}"
				+ ".t-profile_tankstype-prem.t-profile_tankstype__empty .b-tankstype-text {color: rgba(255, 195, 99, 0.3);}"
				+ ".t-profile .t-profile_tankstype td {height: 50px; padding: 0; vertical-align: middle;}"
				+ ".b-tankstype-ico {display: table-cell;}"
				+ ".b-tankstype-ico__lighttank {background-position: 0 -114px;}"
				+ ".b-tankstype-ico__mediumtank {background-position: 0 -173px;}"
				+ ".b-tankstype-ico__heavytank {background-position: 0 5px;}"
				+ ".b-tankstype-ico__at-spg {background-position: 0 -232px;}"
				+ ".b-tankstype-ico__spg {background-position: 0 -54px;}"
				+ ".b-tankstype-ico__prem {background-position: 0 -291px;}"
				+ ".b-tankstype-ico__ten {background: none; color: #BBB7AC; font-size: 17px; font-weight: 100; padding: 0 0 3px; text-align: center;}"
				+ ".b-tankstype-text {display: table-cell; height: inherit; vertical-align: middle;}"
				+ ".t-profile .t-profile_tankstype__item td {height: 40px; padding: 0; vertical-align: middle;}"
				+ ".t-profile .t-profile_tankstype__item:hover td {background: rgba(0, 0, 0, 0.04); border-bottom: 1px solid rgba(255, 255, 255, 0); color: #BABCBF;}"
				+ ".b-armory-wrapper {height: inherit; margin: 0; padding: 0; width: 160px;}"
				+ ".b-armory-wrapper .b-armory-level {display: table-cell; font-size: inherit; height: inherit; position: inherit; vertical-align: middle; left: 0; top: 0;}"
				+ ".b-armory-wrapper img.png {height: 64px; margin: -50px 0 0 24px;}"
				+ ".b-name-vehicle {color: #BBB7AC; display: table-cell; height: inherit; vertical-align: middle;}"
				+ ".b-name-vehicle.b-gold-name {color: #FFC363;}"
				+ ".t-profile_dropdown-link {display: inherit;}"
				+ ".js-error-data {text-align: center;}"
				+ ".b-msg-error {display: table; margin: 0 auto;}"
				+ ".b-vehicle-detail_txt {margin: 0 auto 4px; text-align: center; width: 768px;}"
				+ ".b-vehicle-detail_link {display: table; margin: 0 auto;}"
				+ ".b-vehicle-slider {margin: 23px 64px 17px}"
				+ ".b-vehicle-minitable {margin: 0 43px; width: 350px;}"
				+ ".b-vehicle-minitable__right {float: left;}"
				// profile navigator
				+ ".b-profile-nav {text-align: center;}"
				+ ".wrapper-dropdown .b-profile-nav {display: table; margin: 0 auto; padding: 7px 0 0;}"
				+ ".b-profile-nav a {background: url('/static/3.17.0.1/common/css/scss/content/links/img/vertical-arrow.png') no-repeat; padding: 2px 10px 0;}"
				+ ".b-profile-nav a#top {background-position: 100% 0px;}"
				+ ".b-profile-nav a#top:hover {background-position: 100% -36px;}"
				+ ".b-profile-nav a#bottom {background-position: 100% -18px;}"
				+ ".b-profile-nav a#bottom:hover {background-position: 100% -54px;}"
				+ ".b-profile-nav span {border-bottom: 1px dashed;}"
				// multiple usage rules
				+ ".b-ratings-wrpr, .b-achievements-wrpr {background: rgba(0, 0, 0, 0.09); "+box_background+" clear: both; width: 100%;}"
				+ ".b-orange-arrow__heading, .b-profile-ratings_link {margin: 4px 0 0;}"
				+ ".b-vertical-arrow {display: table; margin: 2px auto 0; padding: 2px 10px 0;}"
				+ "";
			document.head.appendChild(style);
		// end style

		// removing elements
		var layoutfix_class = document.getElementsByClassName('b-hr-layoutfix');
			layoutfix_class[0].parentNode.removeChild(layoutfix_class[0]);
			layoutfix_class[0].parentNode.removeChild(layoutfix_class[0]);

		// profile wrapper
		var profile_div = document.createElement('div');
			profile_div.className = "b-profile-wrpr";
			profileName_class = document.getElementsByClassName('b-profile-name')[0];
			profileName_class.parentNode.insertBefore(profile_div, profileName_class.nextSibling);
			profile_div.innerHTML += scriptlink;
			profile_div.appendChild(profileName_class);

		// background behind profile wrapper
		var background_div = document.createElement('div');
			background_div.className = "b-background";
			background_div.innerHTML = "<img src='/static/3.16.0.2/common/img/common/cont-img-mask.png'>";
			profile_div.parentNode.insertBefore(background_div, profile_div);

		// page navigation
		var lcontent_class = document.getElementsByClassName('l-content')[0];
			dropdown_class = document.getElementsByClassName('wrapper-dropdown')[0];
			topNav_div = document.createElement('div');
			topNav_div.className = "b-profile-nav";
			topNav_div.innerHTML += "<a id='top' href='#bottom'><span>"+locale.p01.lang+"</span></a>";
			dropdown_class.appendChild(topNav_div);
			bottomNav_div = document.createElement('div');
			bottomNav_div.className = "b-profile-nav";
			bottomNav_div.innerHTML += "<a id='bottom' href='#top'><span>"+locale.p02.lang+"</span></a>";
			lcontent_class.appendChild(bottomNav_div);

		// getting registration date
		var dateStamp = document.getElementsByClassName('js-date-format')[0].getAttribute('data-timestamp'),
			daysPassed = (new Date() - new Date(dateStamp * 1000)) / 1000/60/60/24;
			profileName_class.lastElementChild.innerHTML += " - "+daysPassed.toFixed()+" "+locale.p03.lang+".";

		// getting userinfo
		var nick = document.getElementsByTagName('h1')[0].innerHTML,
			userid = document.location.href.match(/\/(\d+)/)[1];

		// player statistic links
		var nm_url = nm_host+"/player/"+nm_srv+"/"+nick+"/"+userid;
			wl_player = nm_player = wn_player = mws_player = fz_player = signature = replays = "";
			if (wl_srv !== null) {
				wl_player = "<td><a target='_blank' href='http://wotlabs.net/"+wl_srv+"/player/"+nick+"'>WoTLabs</a></td>",
				signature = "<tr><td class='statname'>"+locale.p05.lang+"</td><td><a target='_blank' href='http://wotlabs.net/sig/"+wl_srv+"/"+nick+"/signature.png'>"+locale.p06.lang+"</a></td>"
						  + "<td><a target='_blank' href='http://wotlabs.net/sig_dark/"+wl_srv+"/"+nick+"/signature.png'>"+locale.p07.lang+"</a></td></tr>";
			}
			if (nm_srv !== null) {
				nm_player	= "<td><a target='_blank' href='"+nm_url+"'>Noobmeter</a></td>";
			}
			if (wn_srv !== null) {
				wn_player = "<td><a target='_blank' href='http://wot-news.com/index.php/stat/pstat/"+wn_srv+"/"+nick+"/'>Wot-news</a></td>";
			}
			if (mws_srv !== null) {
				mws_player = "<td><a target='_blank' href='http://mywotstats.com/player/view/"+userid+"/"+mws_srv+"'>MyWOTStats</a></td>";
			}
			if (fz_srv !== null) {
				fz_player	= "<td><a target='_blank' href='http://feldzug.net/"+fz_srv+"/"+nick+"'>Feldzug</a></td>";
			}
			if (wr_srv !== null) {
				replays = "<tr><td class='statname'>"+locale.p08.lang+"</td><td><a target='_blank' href='http://wotreplays."+wr_srv+"/player/"+nick+"'>WoTReplays</a></td></tr>";
			}
			playerstat = "<tr><td class='statname'>"+locale.p04.lang+"</td>"+wl_player+nm_player+wn_player+"</tr><tr><td></td>"+mws_player+fz_player+"</tr>";
			if (playerstat.length > 66) {
				profileName_class.innerHTML += "<table>"+playerstat+signature+replays+"</table>";
			}

		// clan handler caller - clan container is delayed by Wargaming
			clanHnd();

		// move sidebar
		var sidebar_class = document.getElementsByClassName('l-sidebar')[0];
			profile_div.appendChild(sidebar_class);

		// end profile wrapper

		// formula calculations and variables
		// expected tank values v14 with premium tanks up to 0.8.11
		var statArr = {
			// soviet
				// light tanks
				"ussrms1":			{ frag: 2.10,	dmg: 270,	spot: 1.55, def: 1.81,	win: 60.46, tier: 1,	nation: "RU",	type: "LT"			},
				"ussrbt2":			{ frag: 1.89,	dmg: 306,	spot: 2.20, def: 1.58,	win: 57.80, tier: 2,	nation: "RU",	type: "LT"			},
				"ussrt26":			{ frag: 1.87,	dmg: 302,	spot: 1.26, def: 2.33,	win: 54.63, tier: 2,	nation: "RU",	type: "LT"			},
				"ussrt60":			{ frag: 1.80,	dmg: 299,	spot: 1.71, def: 2.37,	win: 57.55, tier: 2,	nation: "RU",	type: "LT"			},
				"ussrtetrarch_ll":	{ frag: 1.96,	dmg: 323,	spot: 1.63, def: 1.87,	win: 59.43, tier: 2,	nation: "RU",	type: "LT",	prem: 1	},
				"ussrbt7":			{ frag: 0.94,	dmg: 229,	spot: 2.19, def: 1.38,	win: 51.27, tier: 3,	nation: "RU",	type: "LT"			},
				"ussrt46":			{ frag: 1.17,	dmg: 284,	spot: 1.57, def: 1.27,	win: 53.17, tier: 3,	nation: "RU",	type: "LT"			},
				"ussrt70":			{ frag: 1.47,	dmg: 361,	spot: 1.72, def: 1.37,	win: 62.46, tier: 3,	nation: "RU",	type: "LT"			},
				"ussrm3_stuart_ll":	{ frag: 1.02,	dmg: 232,	spot: 1.78, def: 1.18,	win: 50.83, tier: 3,	nation: "RU",	type: "LT",	prem: 1	},
				"ussrltp":			{ frag: 1.68,	dmg: 343,	spot: 1.22, def: 2.46,	win: 58.40, tier: 3,	nation: "RU",	type: "LT",	prem: 1	},
				"ussrt127":			{ frag: 1.89,	dmg: 393,	spot: 1.83, def: 1.88,	win: 59.79, tier: 3,	nation: "RU",	type: "LT",	prem: 1	},
				"ussrbtsv":			{ frag: 1.52,	dmg: 346,	spot: 1.54, def: 1.94,	win: 61.00, tier: 3,	nation: "RU",	type: "LT",	prem: 1	},
				"ussra20":			{ frag: 0.90,	dmg: 270,	spot: 3.34, def: 0.62,	win: 48.95, tier: 4,	nation: "RU",	type: "LT"			},
				"ussrt50":			{ frag: 0.97,	dmg: 339,	spot: 4.02, def: 1.07,	win: 59.40, tier: 4,	nation: "RU",	type: "LT"			},
				"ussrt80":			{ frag: 1.17,	dmg: 404,	spot: 1.87, def: 2.06,	win: 58.07, tier: 4,	nation: "RU",	type: "LT"			},
				"ussrvalentine_ll":	{ frag: 0.96,	dmg: 370,	spot: 0.88, def: 1.28,	win: 53.78, tier: 4,	nation: "RU",	type: "LT",	prem: 1	},
				"ussrt_50_2":		{ frag: 0.61,	dmg: 380,	spot: 4.79, def: 0.80,	win: 54.50, tier: 5,	nation: "RU",	type: "LT"			},
				"ussrmt25":			{ frag: 0.63,	dmg: 415,	spot: 3.60, def: 0.86,	win: 53.51, tier: 6,	nation: "RU",	type: "LT"			},
				// medium tanks
				"ussra32":					{ frag: 0.87,	dmg: 273,	spot: 2.86, def: 0.56,	win: 53.98, tier: 4,	nation: "RU",	type: "MT",	prem: 1	},
				"ussrt28":					{ frag: 1.19,	dmg: 421,	spot: 1.24, def: 0.97,	win: 51.85, tier: 4,	nation: "RU",	type: "MT"			},
				"ussrt34":					{ frag: 1.15,	dmg: 528,	spot: 1.44, def: 1.24,	win: 54.75, tier: 5,	nation: "RU",	type: "MT"			},
				"ussrmatilda_ii_ll":		{ frag: 1.40,	dmg: 587,	spot: 1.16, def: 1.61,	win: 55.82, tier: 5,	nation: "RU",	type: "MT",	prem: 1	},
				"ussrt3485":				{ frag: 1.03,	dmg: 740,	spot: 1.37, def: 1.02,	win: 53.78, tier: 6,	nation: "RU",	type: "MT"			},
				"ussra43":					{ frag: 1.08,	dmg: 755,	spot: 1.44, def: 1.21,	win: 53.18, tier: 6,	nation: "RU",	type: "MT"			},
				"ussrt43":					{ frag: 0.97,	dmg: 891,	spot: 1.54, def: 1.00,	win: 53.64, tier: 7,	nation: "RU",	type: "MT"			},
				"ussra44":					{ frag: 1.00,	dmg: 943,	spot: 1.59, def: 1.18,	win: 55.71, tier: 7,	nation: "RU",	type: "MT"			},
				"ussrkv13":					{ frag: 0.85,	dmg: 750,	spot: 1.59, def: 1.05,	win: 52.94, tier: 7,	nation: "RU",	type: "MT"			},
				"ussrt4485":				{ frag: 0.95,	dmg: 898,	spot: 1.52, def: 1.12,	win: 53.05, tier: 7,	nation: "RU",	type: "MT",	prem: 1	},
				"ussrt44122":				{ frag: 0.95,	dmg: 898,	spot: 1.52, def: 1.12,	win: 53.05, tier: 7,	nation: "RU",	type: "MT",	prem: 1	},
				"ussrt44":					{ frag: 0.97,	dmg: 1114,	spot: 1.74, def: 1.05,	win: 54.68, tier: 8,	nation: "RU",	type: "MT"			},
				"ussrobject416":			{ frag: 0.95,	dmg: 1186,	spot: 1.91, def: 1.09,	win: 53.04, tier: 8,	nation: "RU",	type: "MT"			},
				"ussrt54":					{ frag: 1.11,	dmg: 1568,	spot: 1.90, def: 0.95,	win: 55.23, tier: 9,	nation: "RU",	type: "MT"			},
				"ussrr104_object_430_ii":	{ frag: 0.99,	dmg: 1524,	spot: 1.64, def: 0.77,	win: 53.20, tier: 9,	nation: "RU",	type: "MT"			},
				"ussrt62a":					{ frag: 0.98,	dmg: 1682,	spot: 1.61, def: 0.74,	win: 50.40, tier: 10,	nation: "RU",	type: "MT"			},
				"ussrobject_140":			{ frag: 0.98,	dmg: 1682,	spot: 1.61, def: 0.74,	win: 50.40, tier: 10,	nation: "RU",	type: "MT"			},
				"ussrobject_430":			{ frag: 0.98,	dmg: 1682,	spot: 1.61, def: 0.74,	win: 50.40, tier: 10,	nation: "RU",	type: "MT"			},
				"ussrobject_907":			{ frag: 0.98,	dmg: 1682,	spot: 1.61, def: 0.74,	win: 50.40, tier: 10,	nation: "RU",	type: "MT",	prem: 1	},
				// heavy tanks
				"ussrkv":			{ frag: 1.01,	dmg: 590,	spot: 0.72, def: 0.52,	win: 51.16, tier: 5,	nation: "RU",	type: "HT"			},
				"ussrkv1":			{ frag: 1.22,	dmg: 653,	spot: 0.80, def: 1.00,	win: 53.41, tier: 5,	nation: "RU",	type: "HT"			},
				"ussrchurchill_ll":	{ frag: 1.30,	dmg: 614,	spot: 1.17, def: 1.51,	win: 52.73, tier: 5,	nation: "RU",	type: "HT",	prem: 1	},
				"ussrkv220_action":	{ frag: 1.39,	dmg: 593,	spot: 1.46, def: 0.62,	win: 54.00, tier: 5,	nation: "RU",	type: "HT",	prem: 1	},
				"ussrkv220":		{ frag: 1.39,	dmg: 593,	spot: 1.46, def: 0.62,	win: 54.00, tier: 5,	nation: "RU",	type: "HT",	prem: 1	},
				"ussrkv1s":			{ frag: 1.33,	dmg: 1003,	spot: 1.16, def: 0.94,	win: 56.56, tier: 6,	nation: "RU",	type: "HT"			},
				"ussrkv2":			{ frag: 1.15,	dmg: 900,	spot: 0.74, def: 0.84,	win: 53.31, tier: 6,	nation: "RU",	type: "HT"			},
				"ussrt150":			{ frag: 1.02,	dmg: 804,	spot: 0.80, def: 0.79,	win: 52.65, tier: 6,	nation: "RU",	type: "HT"			},
				"ussris":			{ frag: 1.06,	dmg: 1068,	spot: 1.05, def: 0.79,	win: 52.53, tier: 7,	nation: "RU",	type: "HT"			},
				"ussrkv3":			{ frag: 1.09,	dmg: 1128,	spot: 0.87, def: 0.77,	win: 53.45, tier: 7,	nation: "RU",	type: "HT"			},
				"ussris3":			{ frag: 0.97,	dmg: 1346,	spot: 1.03, def: 0.77,	win: 52.09, tier: 8,	nation: "RU",	type: "HT"			},
				"ussrkv4":			{ frag: 0.85,	dmg: 1223,	spot: 0.79, def: 0.71,	win: 51.70, tier: 8,	nation: "RU",	type: "HT"			},
				"ussrobject252":	{ frag: 1.11,	dmg: 1415,	spot: 1.11, def: 0.91,	win: 53.28, tier: 8,	nation: "RU",	type: "HT",	prem: 1	},
				"ussrkv5":			{ frag: 1.00,	dmg: 1248,	spot: 1.11, def: 0.91,	win: 50.31, tier: 8,	nation: "RU",	type: "HT",	prem: 1	},
				"ussris8":			{ frag: 0.96,	dmg: 1571,	spot: 1.12, def: 0.67,	win: 50.35, tier: 9,	nation: "RU",	type: "HT"			},
				"ussrst_i":			{ frag: 0.96,	dmg: 1608,	spot: 0.92, def: 0.70,	win: 52.55, tier: 9,	nation: "RU",	type: "HT"			},
				"ussris7":			{ frag: 0.86,	dmg: 1700,	spot: 1.13, def: 0.56,	win: 50.07, tier: 10,	nation: "RU",	type: "HT"			},
				"ussris4":			{ frag: 0.91,	dmg: 1791,	spot: 1.08, def: 0.78,	win: 49.75, tier: 10,	nation: "RU",	type: "HT"			},
				// tank destroyers
				"ussrat1":			{ frag: 1.74,	dmg: 307,	spot: 0.46, def: 1.66,	win: 56.42, tier: 2,	nation: "RU",	type: "TD"			},
				"ussrsu76":			{ frag: 1.49,	dmg: 396,	spot: 0.87, def: 1.70,	win: 54.36, tier: 3,	nation: "RU",	type: "TD"			},
				"ussrsu76i":		{ frag: 1.49,	dmg: 396,	spot: 0.87, def: 1.70,	win: 54.36, tier: 3,	nation: "RU",	type: "TD",	prem: 1	},
				"ussrgaz74b":		{ frag: 1.44,	dmg: 519,	spot: 1.00, def: 1.45,	win: 55.48, tier: 4,	nation: "RU",	type: "TD"			},
				"ussrsu85":			{ frag: 1.21,	dmg: 608,	spot: 0.54, def: 1.22,	win: 52.36, tier: 5,	nation: "RU",	type: "TD"			},
				"ussrsu85i":		{ frag: 1.21,	dmg: 608,	spot: 0.54, def: 1.22,	win: 52.36, tier: 5,	nation: "RU",	type: "TD",	prem: 1	},
				"ussrsu100":		{ frag: 1.24,	dmg: 887,	spot: 0.81, def: 1.19,	win: 54.05, tier: 6,	nation: "RU",	type: "TD"			},
				"ussrsu100y":		{ frag: 1.28,	dmg: 985,	spot: 0.70, def: 0.86,	win: 54.72, tier: 6,	nation: "RU",	type: "TD",	prem: 1	},
				"ussrsu152":		{ frag: 1.12,	dmg: 1096,	spot: 0.57, def: 0.94,	win: 52.53, tier: 7,	nation: "RU",	type: "TD"			},
				"ussrsu122_44":		{ frag: 1.34,	dmg: 1251,	spot: 0.82, def: 1.14,	win: 54.32, tier: 7,	nation: "RU",	type: "TD",	prem: 1	},
				"ussrsu100m1":		{ frag: 1.02,	dmg: 1034,	spot: 0.91, def: 1.14,	win: 52.43, tier: 7,	nation: "RU",	type: "TD"			},
				"ussrisu152":		{ frag: 1.18,	dmg: 1561,	spot: 0.59, def: 0.81,	win: 51.04, tier: 8,	nation: "RU",	type: "TD"			},
				"ussrsu101":		{ frag: 1.02,	dmg: 1278,	spot: 0.93, def: 1.11,	win: 50.39, tier: 8,	nation: "RU",	type: "TD"			},
				"ussrobject_704":	{ frag: 1.16,	dmg: 1842,	spot: 0.69, def: 0.70,	win: 52.00, tier: 9,	nation: "RU",	type: "TD"			},
				"ussrsu122_54":		{ frag: 1.06,	dmg: 1575,	spot: 0.96, def: 0.94,	win: 50.27, tier: 9,	nation: "RU",	type: "TD"			},
				"ussrobject268":	{ frag: 1.21,	dmg: 2219,	spot: 0.85, def: 0.71,	win: 51.17, tier: 10,	nation: "RU",	type: "TD"			},
				"ussrobject263":	{ frag: 1.13,	dmg: 2027,	spot: 0.94, def: 1.07,	win: 50.67, tier: 10,	nation: "RU",	type: "TD"			},
				// artillery
				"ussrsu18":			{ frag: 1.42,	dmg: 267,	spot: 0.17, def: 2.51,	win: 49.78, tier: 2,	nation: "RU",	type: "SPG" },
				"ussrsu26":			{ frag: 1.60,	dmg: 586,	spot: 0.16, def: 2.17,	win: 57.28, tier: 3,	nation: "RU",	type: "SPG" },
				"ussrsu5":			{ frag: 1.02,	dmg: 582,	spot: 0.16, def: 1.73,	win: 49.33, tier: 4,	nation: "RU",	type: "SPG" },
				"ussrsu122a":		{ frag: 1.16,	dmg: 705,	spot: 0.12, def: 1.79,	win: 52.19, tier: 5,	nation: "RU",	type: "SPG" },
				"ussrsu8":			{ frag: 0.92,	dmg: 1101,	spot: 0.11, def: 1.26,	win: 49.77, tier: 6,	nation: "RU",	type: "SPG" },
				"ussrsu14_1":		{ frag: 0.81,	dmg: 1226,	spot: 0.10, def: 0.86,	win: 48.50, tier: 7,	nation: "RU",	type: "SPG" },
				"ussrs51":			{ frag: 0.82,	dmg: 1180,	spot: 0.10, def: 0.62,	win: 48.50, tier: 7,	nation: "RU",	type: "SPG" },
				"ussrsu14":			{ frag: 0.92,	dmg: 1319,	spot: 0.09, def: 0.66,	win: 48.58, tier: 8,	nation: "RU",	type: "SPG" },
				"ussrobject_212":	{ frag: 0.85,	dmg: 1556,	spot: 0.09, def: 0.57,	win: 49.17, tier: 9,	nation: "RU",	type: "SPG" },
				"ussrobject_261":	{ frag: 0.91,	dmg: 1682,	spot: 0.08, def: 0.65,	win: 48.94, tier: 10,	nation: "RU",	type: "SPG" },

			// germany
				// light tanks
				"germanyltraktor":		{ frag: 2.11,	dmg: 278,	spot: 2.35, def: 1.84,	win: 59.54, tier: 1,	nation: "DE",	type: "LT"			},
				"germanypz35t":			{ frag: 1.95,	dmg: 311,	spot: 2.01, def: 2.19,	win: 57.60, tier: 2,	nation: "DE",	type: "LT"			},
				"germanypzi":			{ frag: 1.72,	dmg: 266,	spot: 3.18, def: 2.66,	win: 59.06, tier: 2,	nation: "DE",	type: "LT"			},
				"germanypzii":			{ frag: 1.69,	dmg: 272,	spot: 2.05, def: 1.78,	win: 56.14, tier: 2,	nation: "DE",	type: "LT"			},
				"germanyh39_captured":	{ frag: 2.20,	dmg: 352,	spot: 1.88, def: 2.72,	win: 54.01, tier: 2,	nation: "DE",	type: "LT",	prem: 1	},
				"germanypz38t":			{ frag: 1.68,	dmg: 384,	spot: 1.58, def: 1.77,	win: 56.45, tier: 3,	nation: "DE",	type: "LT"			},
				"germanypziii_a":		{ frag: 1.20,	dmg: 268,	spot: 1.84, def: 1.53,	win: 53.33, tier: 3,	nation: "DE",	type: "LT"			},
				"germanypzi_ausf_c":	{ frag: 1.31,	dmg: 277,	spot: 3.01, def: 1.41,	win: 57.25, tier: 3,	nation: "DE",	type: "LT"			},
				"germanypz_ii_ausfg":	{ frag: 1.15,	dmg: 288,	spot: 1.99, def: 1.63,	win: 59.52, tier: 3,	nation: "DE",	type: "LT"			},
				"germanypzii_j":		{ frag: 2.14,	dmg: 405,	spot: 2.08, def: 3.01,	win: 63.00, tier: 3,	nation: "DE",	type: "LT",	prem: 1	},
				"germanyt15":			{ frag: 1.29,	dmg: 295,	spot: 3.61, def: 1.66,	win: 59.71, tier: 3,	nation: "DE",	type: "LT",	prem: 1	},
				"germanypzii_luchs":	{ frag: 1.34,	dmg: 339,	spot: 2.75, def: 1.32,	win: 56.52, tier: 4,	nation: "DE",	type: "LT"			},
				"germanypz38_na":		{ frag: 0.92,	dmg: 290,	spot: 2.71, def: 1.11,	win: 54.03, tier: 4,	nation: "DE",	type: "LT"			},
				"germanyvk1602":		{ frag: 0.73,	dmg: 357,	spot: 3.20, def: 0.80,	win: 53.30, tier: 5,	nation: "DE",	type: "LT"			},
				"germanyvk2801":		{ frag: 0.77,	dmg: 596,	spot: 2.97, def: 0.62,	win: 53.08, tier: 6,	nation: "DE",	type: "LT"			},
				"germanyauf_panther":	{ frag: 0.69,	dmg: 738,	spot: 2.36, def: 0.71,	win: 50.37, tier: 7,	nation: "DE",	type: "LT"			},
				// medium tanks
				"germanypz_iv_ausfa":			{ frag: 0,		dmg: 0,		spot: 0,	def: 0,		win: 0,		tier: 3,	nation: "DE",	type: "MT"			}, // no values
				"germanys35_captured":			{ frag: 1.90,	dmg: 425,	spot: 1.58, def: 1.94,	win: 62.00, tier: 3,	nation: "DE",	type: "MT",	prem: 1	},
				"germanyg100_gtraktor_krupp":	{ frag: 0,		dmg: 0,		spot: 0,	def: 0,		win: 0,		tier: 3,	nation: "DE",	type: "MT",	prem: 1	}, // no values
				"germanypziii_ausfj":			{ frag: 1.19,	dmg: 360,	spot: 2.15, def: 1.16,	win: 55.49, tier: 4,	nation: "DE",	type: "MT"			},
				"germanyvk2001db":				{ frag: 1.30,	dmg: 424,	spot: 1.71, def: 1.36,	win: 57.92, tier: 4,	nation: "DE",	type: "MT"			},
				"germanypz_iv_ausfd":			{ frag: 0,		dmg: 0,		spot: 0,	def: 0,		win: 0,		tier: 4,	nation: "DE",	type: "MT"			}, // no values
				"germanypziii_iv":				{ frag: 0.98,	dmg: 455,	spot: 1.65, def: 1.00,	win: 53.07, tier: 5,	nation: "DE",	type: "MT"			},
				"germanypziv":					{ frag: 1.23,	dmg: 607,	spot: 1.26, def: 1.07,	win: 54.88, tier: 5,	nation: "DE",	type: "MT"			}, // for backup
				"germanypz_iv_ausfh":			{ frag: 1.23,	dmg: 607,	spot: 1.26, def: 1.07,	win: 54.88, tier: 5,	nation: "DE",	type: "MT"			},
				"germanypziv_hydro":			{ frag: 1.23,	dmg: 607,	spot: 1.26, def: 1.07,	win: 54.88, tier: 5,	nation: "DE",	type: "MT",	prem: 1	},
				"germanyt25":					{ frag: 1.22,	dmg: 596,	spot: 1.55, def: 1.29,	win: 55.52, tier: 5,	nation: "DE",	type: "MT",	prem: 1	},
				"germanyvk3002db_v1":			{ frag: 1.13,	dmg: 788,	spot: 1.49, def: 1.33,	win: 53.74, tier: 6,	nation: "DE",	type: "MT"			},
				"germanyvk3001p":				{ frag: 0.93,	dmg: 666,	spot: 1.28, def: 0.89,	win: 52.07, tier: 6,	nation: "DE",	type: "MT"			},
				"germanyvk3002m":				{ frag: 1.08,	dmg: 755,	spot: 1.44, def: 1.21,	win: 53.18, tier: 6,	nation: "DE",	type: "MT"			},
				"germanypzv_pziv":				{ frag: 1.04,	dmg: 643,	spot: 2.01, def: 1.30,	win: 50.70, tier: 6,	nation: "DE",	type: "MT",	prem: 1	},
				"germanypzv_pziv_ausf_alfa":	{ frag: 1.04,	dmg: 643,	spot: 2.01, def: 1.30,	win: 51.35, tier: 6,	nation: "DE",	type: "MT",	prem: 1	},
				"germanypziv_schmalturm":		{ frag: 1.07,	dmg: 808,	spot: 1.10, def: 1.62,	win: 50.54, tier: 6,	nation: "DE",	type: "MT",	prem: 1	},
				"germanypzv":					{ frag: 0.84,	dmg: 850,	spot: 1.11, def: 1.27,	win: 51.64, tier: 7,	nation: "DE",	type: "MT"			},
				"germanyvk3002db":				{ frag: 0.92,	dmg: 848,	spot: 1.54, def: 1.02,	win: 52.63, tier: 7,	nation: "DE",	type: "MT"			},
				"germanypanther_m10":			{ frag: 0.99,	dmg: 942,	spot: 1.27, def: 1.49,	win: 52.41, tier: 7,	nation: "DE",	type: "MT",	prem: 1	},
				"germanypanther_ii":			{ frag: 0.90,	dmg: 1110,	spot: 1.43, def: 1.04,	win: 53.04, tier: 8,	nation: "DE",	type: "MT"			},
				"germanyindien_panzer":			{ frag: 0.90,	dmg: 1213,	spot: 1.13, def: 1.16,	win: 50.29, tier: 8,	nation: "DE",	type: "MT"			},
				"germanye50":					{ frag: 1.01,	dmg: 1518,	spot: 1.47, def: 0.82,	win: 52.24, tier: 9,	nation: "DE",	type: "MT"			},
				"germanypro_ag_a":				{ frag: 0.96,	dmg: 1485,	spot: 1.27, def: 1.09,	win: 49.51, tier: 9,	nation: "DE",	type: "MT"			},
				"germanye50_ausf_m":			{ frag: 0.94,	dmg: 1701,	spot: 1.42, def: 0.66,	win: 49.77, tier: 10,	nation: "DE",	type: "MT"			},
				"germanyleopard1":				{ frag: 0.93,	dmg: 1736,	spot: 1.46, def: 0.82,	win: 47.28, tier: 10,	nation: "DE",	type: "MT"			},
				// heavy tanks
				"germanydw_ii":				{ frag: 1.16,	dmg: 348,	spot: 1.20, def: 1.49,	win: 51.63, tier: 4,	nation: "DE",	type: "HT"			},
				"germanyb1bis_captured":	{ frag: 1.96,	dmg: 527,	spot: 1.79, def: 2.22,	win: 60.16, tier: 4,	nation: "DE",	type: "HT",	prem: 1	},
				"germanyvk3001h":			{ frag: 1.17,	dmg: 677,	spot: 1.45, def: 0.90,	win: 51.80, tier: 5,	nation: "DE",	type: "HT"			},
				"germanyvk3601h":			{ frag: 1.34,	dmg: 947,	spot: 1.40, def: 1.40,	win: 57.39, tier: 6,	nation: "DE",	type: "HT"			},
				"germanypzvi":				{ frag: 0.93,	dmg: 1031,	spot: 0.94, def: 0.98,	win: 51.68, tier: 7,	nation: "DE",	type: "HT"			},
				"germanypzvi_tiger_p":		{ frag: 0.97,	dmg: 1095,	spot: 0.93, def: 1.08,	win: 53.17, tier: 7,	nation: "DE",	type: "HT"			},
				"germanypzvib_tiger_ii":	{ frag: 0.89,	dmg: 1261,	spot: 0.99, def: 0.83,	win: 50.25, tier: 8,	nation: "DE",	type: "HT"			},
				"germanyvk4502a":			{ frag: 0.92,	dmg: 1258,	spot: 1.25, def: 0.89,	win: 51.16, tier: 8,	nation: "DE",	type: "HT"			},
				"germanylowe":				{ frag: 0.83,	dmg: 1221,	spot: 0.84, def: 0.79,	win: 49.04, tier: 8,	nation: "DE",	type: "HT",	prem: 1	},
				"germanye75":				{ frag: 0.96,	dmg: 1595,	spot: 1.00, def: 0.69,	win: 51.37, tier: 9,	nation: "DE",	type: "HT"			},
				"germanyvk4502p":			{ frag: 0.90,	dmg: 1488,	spot: 0.93, def: 0.60,	win: 49.63, tier: 9,	nation: "DE",	type: "HT"			},
				"germanye100":				{ frag: 0.94,	dmg: 1836,	spot: 0.98, def: 0.52,	win: 50.59, tier: 10,	nation: "DE",	type: "HT"			},
				"germanymaus":				{ frag: 0.82,	dmg: 1631,	spot: 0.89, def: 0.68,	win: 49.77, tier: 10,	nation: "DE",	type: "HT"			},
				"germanyvk7201":			{ frag: 0.86,	dmg: 1700,	spot: 1.13, def: 0.56,	win: 50.07, tier: 10,	nation: "DE",	type: "HT",	prem: 1	},
				// tank destroyers
				"germanypanzerjager_i":			{ frag: 1.95,	dmg: 330,	spot: 0.94, def: 1.78,	win: 59.68, tier: 2,	nation: "DE",	type: "TD"			},
				"germanyg20_marder_ii":			{ frag: 1.51,	dmg: 428,	spot: 1.08, def: 1.51,	win: 58.41, tier: 3,	nation: "DE",	type: "TD"			},
				"germanyhetzer":				{ frag: 1.63,	dmg: 533,	spot: 0.64, def: 1.37,	win: 57.58, tier: 4,	nation: "DE",	type: "TD"			},
				"germanymarder_iii":			{ frag: 1.42,	dmg: 533,	spot: 0.64, def: 1.37,	win: 57.58, tier: 4,	nation: "DE",	type: "TD"			},
				"germanyg101_stug_iii":			{ frag: 0,		dmg: 0,		spot: 0,	def: 0,		win: 0,		tier: 0,	nation: "DE",	type: "TD"			}, // no values
				"germanystug_40_ausfg":			{ frag: 1.21,	dmg: 616,	spot: 0.73, def: 1.40,	win: 53.19, tier: 5,	nation: "DE",	type: "TD"			},
				"germanypz_sfl_ivc":			{ frag: 1.32,	dmg: 681,	spot: 0.86, def: 1.32,	win: 54.17, tier: 5,	nation: "DE",	type: "TD"			},
				"germanyjagdpziv":				{ frag: 1.08,	dmg: 748,	spot: 0.72, def: 1.26,	win: 52.37, tier: 6,	nation: "DE",	type: "TD"			},
				"germanynashorn":				{ frag: 1.26,	dmg: 937,	spot: 0.80, def: 1.14,	win: 53.97, tier: 6,	nation: "DE",	type: "TD"			},
				"germanydickermax":				{ frag: 1.20,	dmg: 892,	spot: 0.76, def: 1.09,	win: 51.40, tier: 6,	nation: "DE",	type: "TD",	prem: 1	},
				"germanyjagdpanther":			{ frag: 1.10,	dmg: 1123,	spot: 0.68, def: 1.10,	win: 51.94, tier: 7,	nation: "DE",	type: "TD"			},
				"germanysturer_emil":			{ frag: 1.10,	dmg: 1123,	spot: 0.68, def: 1.10,	win: 52.69, tier: 7,	nation: "DE",	type: "TD"			},
				"germanye25":					{ frag: 1.34,	dmg: 1127,	spot: 1.40, def: 2.25,	win: 50.54, tier: 7,	nation: "DE",	type: "TD",	prem: 1	},
				"germanyjagdpantherii":			{ frag: 1.14,	dmg: 1544,	spot: 0.76, def: 0.98,	win: 50.97, tier: 8,	nation: "DE",	type: "TD"			},
				"germanyferdinand":				{ frag: 1.07,	dmg: 1455,	spot: 0.62, def: 0.90,	win: 50.53, tier: 8,	nation: "DE",	type: "TD"			},
				"germanyrhb_waffentrager":		{ frag: 1.22,	dmg: 1652,	spot: 0.81, def: 1.05,	win: 54.54, tier: 8,	nation: "DE",	type: "TD"			},
				"germanyjagdtiger_sdkfz_185":	{ frag: 1.00,	dmg: 1378,	spot: 0.72, def: 1.14,	win: 50.48, tier: 8,	nation: "DE",	type: "TD",	prem: 1	},
				"germanyjagdtiger":				{ frag: 1.09,	dmg: 1777,	spot: 0.66, def: 0.77,	win: 49.84, tier: 9,	nation: "DE",	type: "TD"			},
				"germanywaffentrager_iv":		{ frag: 1.16,	dmg: 1842,	spot: 0.69, def: 0.70,	win: 52.00, tier: 9,	nation: "DE",	type: "TD"			},
				"germanyjagdpz_e100":			{ frag: 1.02,	dmg: 1943,	spot: 0.66, def: 0.49,	win: 48.61, tier: 10,	nation: "DE",	type: "TD"			},
				"germanywaffentrager_e100":		{ frag: 1.40,	dmg: 2388,	spot: 0.95, def: 0.68,	win: 53.83, tier: 10,	nation: "DE",	type: "TD"			},
				// artillery
				"germanygw_mk_vie":			{ frag: 1.47,	dmg: 280,	spot: 0.17, def: 2.23,	win: 51.21, tier: 2,	nation: "DE",	type: "SPG" },
				"germanybison_i":			{ frag: 1.31,	dmg: 383,	spot: 0.21, def: 1.57,	win: 57.02, tier: 3,	nation: "DE",	type: "SPG" },
				"germanywespe":				{ frag: 1.15,	dmg: 415,	spot: 0.16, def: 1.81,	win: 54.00, tier: 3,	nation: "DE",	type: "SPG" },
				"germanysturmpanzer_ii":	{ frag: 1.16,	dmg: 436,	spot: 0.18, def: 1.68,	win: 50.46, tier: 4,	nation: "DE",	type: "SPG" },
				"germanypz_sfl_ivb":		{ frag: 1.10,	dmg: 471,	spot: 0.16, def: 2.44,	win: 55.16, tier: 4,	nation: "DE",	type: "SPG" },
				"germanygrille":			{ frag: 1.08,	dmg: 648,	spot: 0.11, def: 1.58,	win: 51.03, tier: 5,	nation: "DE",	type: "SPG" },
				"germanyhummel":			{ frag: 0.84,	dmg: 982,	spot: 0.11, def: 1.28,	win: 48.42, tier: 6,	nation: "DE",	type: "SPG" },
				"germanyg_panther":			{ frag: 0.81,	dmg: 1248,	spot: 0.10, def: 0.91,	win: 48.17, tier: 7,	nation: "DE",	type: "SPG" },
				"germanygw_tiger_p":		{ frag: 0.88,	dmg: 1335,	spot: 0.09, def: 0.61,	win: 47.62, tier: 8,	nation: "DE",	type: "SPG" },
				"germanyg_tiger":			{ frag: 0.86,	dmg: 1552,	spot: 0.09, def: 0.61,	win: 49.30, tier: 9,	nation: "DE",	type: "SPG" },
				"germanyg_e":				{ frag: 0.86,	dmg: 1651,	spot: 0.08, def: 0.56,	win: 49.55, tier: 10,	nation: "DE",	type: "SPG" },

			// usa
				// light tanks
				"usat1_cunningham":	{ frag: 2.14,	dmg: 265,	spot: 2.67, def: 1.78,	win: 61.40, tier: 1,	nation: "US",	type: "LT"			},
				"usam2_lt":			{ frag: 1.75,	dmg: 281,	spot: 2.73, def: 1.76,	win: 60.49, tier: 2,	nation: "US",	type: "LT"			},
				"usat2_lt":			{ frag: 1.70,	dmg: 275,	spot: 3.12, def: 1.64,	win: 58.98, tier: 2,	nation: "US",	type: "LT",	prem: 1	},
				"usat1_e6":			{ frag: 1.62,	dmg: 269,	spot: 2.05, def: 1.43,	win: 57.06, tier: 2,	nation: "US",	type: "LT",	prem: 1	},
				"usat7_combat_car":	{ frag: 1.80,	dmg: 295,	spot: 2.02, def: 2.02,	win: 58.04, tier: 2,	nation: "US",	type: "LT",	prem: 1	},
				"usam3_stuart":		{ frag: 1.09,	dmg: 252,	spot: 2.66, def: 1.57,	win: 53.72, tier: 3,	nation: "US",	type: "LT"			},
				"usam22_locust":	{ frag: 1.22,	dmg: 287,	spot: 2.94, def: 1.27,	win: 58.31, tier: 3,	nation: "US",	type: "LT",	prem: 1	},
				"usamtls1g14":		{ frag: 1.39,	dmg: 314,	spot: 1.95, def: 1.64,	win: 57.44, tier: 3,	nation: "US",	type: "LT",	prem: 1	},
				"usam5_stuart":		{ frag: 1.03,	dmg: 334,	spot: 3.12, def: 1.28,	win: 57.84, tier: 4,	nation: "US",	type: "LT"			},
				"usam24_chaffee":	{ frag: 0.69,	dmg: 538,	spot: 2.67, def: 0.81,	win: 53.27, tier: 5,	nation: "US",	type: "LT"			},
				"usat21":			{ frag: 0.65,	dmg: 517,	spot: 2.44, def: 0.76,	win: 52.09, tier: 6,	nation: "US",	type: "LT"			},
				"usat71":			{ frag: 0.81,	dmg: 824,	spot: 2.66, def: 0.85,	win: 53.03, tier: 7,	nation: "US",	type: "LT"			},
				// medium tanks
				"usat2_med":				{ frag: 1.92,	dmg: 310,	spot: 2.01, def: 1.92,	win: 57.24, tier: 2,	nation: "US",	type: "MT"			},
				"usam2_med":				{ frag: 1.38,	dmg: 301,	spot: 1.45, def: 1.15,	win: 53.29, tier: 3,	nation: "US",	type: "MT"			},
				"usam3_grant":				{ frag: 1.14,	dmg: 377,	spot: 0.87, def: 0.97,	win: 51.78, tier: 4,	nation: "US",	type: "MT"			},
				"usam4_sherman":			{ frag: 1.73,	dmg: 801,	spot: 1.57, def: 1.31,	win: 60.24, tier: 5,	nation: "US",	type: "MT"			},
				"usam7_med":				{ frag: 0.98,	dmg: 441,	spot: 2.15, def: 1.12,	win: 53.32, tier: 5,	nation: "US",	type: "MT"			},
				"usaramii":					{ frag: 1.19,	dmg: 538,	spot: 1.37, def: 1.31,	win: 55.69, tier: 5,	nation: "US",	type: "MT",	prem: 1	},
				"usam4a2e4":				{ frag: 0.94,	dmg: 401,	spot: 1.45, def: 0.94,	win: 51.74, tier: 5,	nation: "US",	type: "MT",	prem: 1	},
				"usasherman_jumbo":			{ frag: 1.21,	dmg: 840,	spot: 1.19, def: 1.38,	win: 54.75, tier: 6,	nation: "US",	type: "MT"			},
				"usam4a3e8_sherman":		{ frag: 1.03,	dmg: 700,	spot: 1.50, def: 1.11,	win: 53.63, tier: 6,	nation: "US",	type: "MT"			},
				"usat20":					{ frag: 0.97,	dmg: 932,	spot: 1.69, def: 0.98,	win: 53.52, tier: 7,	nation: "US",	type: "MT"			},
				"usat23e3":					{ frag: 0,		dmg: 0,		spot: 0,	def: 0,		win: 0,		tier: 7,	nation: "US",	type: "MT",	prem: 1	}, // no values
				"usapershing":				{ frag: 0.95,	dmg: 1159,	spot: 1.53, def: 1.11,	win: 52.76, tier: 8,	nation: "US",	type: "MT"			},
				"usat69":					{ frag: 1.21,	dmg: 1490,	spot: 1.33, def: 1.48,	win: 55.52, tier: 8,	nation: "US",	type: "MT"			},
				"usat26_e4_superpershing":	{ frag: 0.89,	dmg: 1151,	spot: 0.90, def: 1.10,	win: 52.30, tier: 8,	nation: "US",	type: "MT",	prem: 1	},
				"usat23":					{ frag: 0.95,	dmg: 1159,	spot: 1.53, def: 1.11,	win: 52.76, tier: 8,	nation: "US",	type: "MT",	prem: 1	},
				"usam46_patton":			{ frag: 1.02,	dmg: 1503,	spot: 1.64, def: 0.81,	win: 52.47, tier: 9,	nation: "US",	type: "MT"			},
				"usat54e1":					{ frag: 1.14,	dmg: 1670,	spot: 1.05, def: 0.81,	win: 51.79, tier: 9,	nation: "US",	type: "MT"			},
				"usam48a1":					{ frag: 0.97,	dmg: 1716,	spot: 1.58, def: 0.63,	win: 50.52, tier: 10,	nation: "US",	type: "MT"			},
				"usam60":					{ frag: 0.91,	dmg: 1735,	spot: 1.31, def: 0.60,	win: 48.50, tier: 10,	nation: "US",	type: "MT",	prem: 1	},
				"usat95_e6":				{ frag: 0,		dmg: 0,		spot: 0,	def: 0,		win: 0,		tier: 10,	nation: "US",	type: "MT",	prem: 1	}, // no values
				// heavy tanks
				"usat1_hvy":	{ frag: 1.24,	dmg: 636,	spot: 1.14, def: 1.15,	win: 53.98, tier: 5,	nation: "US",	type: "HT"			},
				"usat14":		{ frag: 1.35,	dmg: 593,	spot: 1.53, def: 1.31,	win: 54.02, tier: 5,	nation: "US",	type: "HT",	prem: 1	},
				"usam6":		{ frag: 1.07,	dmg: 845,	spot: 1.03, def: 0.92,	win: 52.17, tier: 6,	nation: "US",	type: "HT"			},
				"usat29":		{ frag: 1.13,	dmg: 1239,	spot: 1.07, def: 1.04,	win: 54.14, tier: 7,	nation: "US",	type: "HT"			},
				"usat32":		{ frag: 0.97,	dmg: 1336,	spot: 1.21, def: 0.92,	win: 52.77, tier: 8,	nation: "US",	type: "HT"			},
				"usat34_hvy":	{ frag: 0.87,	dmg: 1313,	spot: 0.81, def: 0.68,	win: 50.57, tier: 8,	nation: "US",	type: "HT",	prem: 1	},
				"usam6a2e1":	{ frag: 0.87,	dmg: 1113,	spot: 1.22, def: 0.80,	win: 47.06, tier: 8,	nation: "US",	type: "HT",	prem: 1	},
				"usam103":		{ frag: 0.92,	dmg: 1578,	spot: 1.09, def: 0.67,	win: 50.82, tier: 9,	nation: "US",	type: "HT"			},
				"usat110":		{ frag: 0.90,	dmg: 1802,	spot: 1.19, def: 0.74,	win: 50.23, tier: 10,	nation: "US",	type: "HT"			},
				"usat57_58":	{ frag: 1.16,	dmg: 2159,	spot: 0.85, def: 0.78,	win: 51.43, tier: 10,	nation: "US",	type: "HT"			},
				// tank destroyers
				"usat18":			{ frag: 2.48,	dmg: 360,	spot: 1.21, def: 1.79,	win: 60.50, tier: 2,	nation: "US",	type: "TD"	},
				"usat82":			{ frag: 1.57,	dmg: 389,	spot: 1.31, def: 1.11,	win: 58.10, tier: 3,	nation: "US",	type: "TD"	},
				"usat40":			{ frag: 1.45,	dmg: 533,	spot: 1.15, def: 1.46,	win: 56.56, tier: 4,	nation: "US",	type: "TD"	},
				"usam8a1":			{ frag: 1.42,	dmg: 516,	spot: 1.54, def: 1.77,	win: 57.49, tier: 4,	nation: "US",	type: "TD"	},
				"usam10_wolverine":	{ frag: 1.26,	dmg: 627,	spot: 0.95, def: 1.42,	win: 54.24, tier: 5,	nation: "US",	type: "TD"	},
				"usat49":			{ frag: 1.46,	dmg: 700,	spot: 1.71, def: 1.67,	win: 56.89, tier: 5,	nation: "US",	type: "TD"	},
				"usam36_slagger":	{ frag: 1.09,	dmg: 824,	spot: 0.89, def: 1.23,	win: 53.57, tier: 6,	nation: "US",	type: "TD"	},
				"usam18_hellcat":	{ frag: 1.37,	dmg: 1002,	spot: 1.47, def: 1.60,	win: 56.24, tier: 6,	nation: "US",	type: "TD"	},
				"usat25_at":		{ frag: 1.06,	dmg: 1057,	spot: 0.81, def: 1.12,	win: 53.20, tier: 7,	nation: "US",	type: "TD"	},
				"usat25_2":			{ frag: 1.01,	dmg: 1041,	spot: 0.98, def: 1.26,	win: 52.52, tier: 7,	nation: "US",	type: "TD"	},
				"usat28_prototype":	{ frag: 1.07,	dmg: 1467,	spot: 0.51, def: 1.06,	win: 50.58, tier: 8,	nation: "US",	type: "TD"	},
				"usat28":			{ frag: 1.01,	dmg: 1353,	spot: 0.51, def: 0.95,	win: 49.66, tier: 8,	nation: "US",	type: "TD"	},
				"usat95":			{ frag: 1.06,	dmg: 1646,	spot: 0.46, def: 0.76,	win: 49.81, tier: 9,	nation: "US",	type: "TD"	},
				"usat30":			{ frag: 1.02,	dmg: 1733,	spot: 0.72, def: 0.64,	win: 50.69, tier: 9,	nation: "US",	type: "TD"	},
				"usat110e3":		{ frag: 1.10,	dmg: 2072,	spot: 0.73, def: 0.50,	win: 51.04, tier: 10,	nation: "US",	type: "TD"	},
				"usat110e4":		{ frag: 1.03,	dmg: 2053,	spot: 0.81, def: 0.56,	win: 48.93, tier: 10,	nation: "US",	type: "TD"	},
				// artillery
				"usat57":		{ frag: 1.56,	dmg: 296,	spot: 0.30, def: 2.33,	win: 51.15, tier: 2,	nation: "US",	type: "SPG" },
				"usam7_priest":	{ frag: 1.04,	dmg: 567,	spot: 0.16, def: 1.89,	win: 53.00, tier: 3,	nation: "US",	type: "SPG" },
				"usasexton_i":	{ frag: 1.30,	dmg: 490,	spot: 0.16, def: 1.93,	win: 55.11, tier: 3,	nation: "US",	type: "SPG" },
				"usam37":		{ frag: 1.15,	dmg: 419,	spot: 0.17, def: 1.90,	win: 49.49, tier: 4,	nation: "US",	type: "SPG" },
				"usam41":		{ frag: 0.99,	dmg: 874,	spot: 0.12, def: 1.33,	win: 50.44, tier: 5,	nation: "US",	type: "SPG" },
				"usam44":		{ frag: 0.90,	dmg: 974,	spot: 0.11, def: 1.52,	win: 47.95, tier: 6,	nation: "US",	type: "SPG" },
				"usam12":		{ frag: 0.81,	dmg: 1240,	spot: 0.10, def: 0.89,	win: 48.45, tier: 7,	nation: "US",	type: "SPG" },
				"usam40m43":	{ frag: 0.86,	dmg: 1378,	spot: 0.09, def: 0.46,	win: 47.61, tier: 8,	nation: "US",	type: "SPG" },
				"usam53_55":	{ frag: 0.86,	dmg: 1619,	spot: 0.09, def: 0.58,	win: 48.32, tier: 9,	nation: "US",	type: "SPG" },
				"usat92":		{ frag: 0.86,	dmg: 1693,	spot: 0.08, def: 0.58,	win: 48.24, tier: 10,	nation: "US",	type: "SPG" },

			// uk
				// light tanks
				"ukgb01_medium_mark_i":		{ frag: 2.05,	dmg: 260,	spot: 1.38, def: 1.76,	win: 57.88, tier: 1,	nation: "UK",	type: "LT"			},
				"ukgb03_cruiser_mk_i":		{ frag: 1.73,	dmg: 301,	spot: 1.97, def: 1.40,	win: 58.67, tier: 2,	nation: "UK",	type: "LT"			},
				"ukgb58_cruiser_mk_iii":	{ frag: 2.09,	dmg: 349,	spot: 2.24, def: 1.42,	win: 64.03, tier: 2,	nation: "UK",	type: "LT"			},
				"ukgb76_mk_vic":			{ frag: 1.80,	dmg: 295,	spot: 2.02, def: 2.02,	win: 58.04, tier: 2,	nation: "UK",	type: "LT",	prem: 1	},
				"ukgb69_cruiser_mk_ii":		{ frag: 1.51,	dmg: 330,	spot: 1.02, def: 1.20,	win: 57.99, tier: 3,	nation: "UK",	type: "LT"			},
				"ukgb59_cruiser_mk_iv":		{ frag: 1.65,	dmg: 381,	spot: 1.92, def: 1.31,	win: 60.33, tier: 3,	nation: "UK",	type: "LT"			},
				"ukgb60_covenanter":		{ frag: 1.11,	dmg: 378,	spot: 1.81, def: 1.15,	win: 55.60, tier: 4,	nation: "UK",	type: "LT"			},
				"ukgb04_valentine":			{ frag: 1.45,	dmg: 396,	spot: 1.75, def: 1.78,	win: 55.72, tier: 4,	nation: "UK",	type: "LT"			},
				"ukgb20_crusader":			{ frag: 1.06,	dmg: 489,	spot: 1.71, def: 1.25,	win: 54.16, tier: 5,	nation: "UK",	type: "LT"			},
				// medium tanks
				"ukgb05_vickers_medium_mk_ii":	{ frag: 1.80,	dmg: 297,	spot: 1.23, def: 1.67,	win: 57.37, tier: 2,	nation: "UK",	type: "MT"			},
				"ukgb06_vickers_medium_mk_iii":	{ frag: 1.15,	dmg: 290,	spot: 1.04, def: 0.47,	win: 51.20, tier: 3,	nation: "UK",	type: "MT"			},
				"ukgb07_matilda":				{ frag: 1.55,	dmg: 562,	spot: 0.91, def: 2.08,	win: 59.66, tier: 4,	nation: "UK",	type: "MT"			},
				"ukgb68_matilda_black_prince":	{ frag: 1.22,	dmg: 536,	spot: 0.78, def: 1.28,	win: 52.98, tier: 5,	nation: "UK",	type: "MT",	prem: 1	},
				"ukgb21_cromwell":				{ frag: 1.11,	dmg: 744,	spot: 2.05, def: 1.09,	win: 54.02, tier: 6,	nation: "UK",	type: "MT"			},
				"ukgb22_comet":					{ frag: 1.04,	dmg: 958,	spot: 1.82, def: 1.14,	win: 54.07, tier: 7,	nation: "UK",	type: "MT"			},
				"ukgb23_centurion":				{ frag: 0.87,	dmg: 1193,	spot: 1.26, def: 1.07,	win: 53.58, tier: 8,	nation: "UK",	type: "MT"			},
				"ukgb24_centurion_mk3":			{ frag: 0.90,	dmg: 1503,	spot: 1.22, def: 0.79,	win: 50.50, tier: 9,	nation: "UK",	type: "MT"			},
				"ukgb70_fv4202_105":			{ frag: 0.93,	dmg: 1726,	spot: 1.34, def: 0.60,	win: 48.85, tier: 10,	nation: "UK",	type: "MT"			},
				// heavy tanks
				"ukgb08_churchill_i":	{ frag: 1.24,	dmg: 671,	spot: 0.90, def: 1.43,	win: 53.96, tier: 5,	nation: "UK",	type: "HT"			},
				"ukgb51_excelsior":		{ frag: 1.32,	dmg: 582,	spot: 1.32, def: 1.89,	win: 53.90, tier: 5,	nation: "UK",	type: "HT",	prem: 1	},
				"ukgb09_churchill_vii":	{ frag: 1.06,	dmg: 802,	spot: 0.76, def: 1.18,	win: 52.39, tier: 6,	nation: "UK",	type: "HT"			},
				"ukgb63_tog_ii":		{ frag: 1.29,	dmg: 922,	spot: 0.60, def: 1.41,	win: 55.31, tier: 6,	nation: "UK",	type: "HT",	prem: 1	},
				"ukgb10_black_prince":	{ frag: 0.96,	dmg: 1043,	spot: 0.89, def: 1.10,	win: 53.54, tier: 7,	nation: "UK",	type: "HT"			},
				"ukgb11_caernarvon":	{ frag: 0.84,	dmg: 1257,	spot: 1.06, def: 0.87,	win: 52.11, tier: 8,	nation: "UK",	type: "HT"			},
				"ukgb12_conqueror":		{ frag: 0.90,	dmg: 1604,	spot: 1.04, def: 0.68,	win: 49.96, tier: 9,	nation: "UK",	type: "HT"			},
				"ukgb13_fv215b":		{ frag: 0.92,	dmg: 1859,	spot: 1.06, def: 0.76,	win: 47.41, tier: 10,	nation: "UK",	type: "HT"			},
				// tank destroyers
				"ukgb39_universal_carrierqf2":	{ frag: 1.95,	dmg: 321,	spot: 1.48, def: 1.77,	win: 60.98, tier: 2,	nation: "UK",	type: "TD"			},
				"ukgb42_valentine_at":			{ frag: 1.76,	dmg: 401,	spot: 0.94, def: 1.64,	win: 59.00, tier: 3,	nation: "UK",	type: "TD"			},
				"ukgb57_alecto":				{ frag: 1.49,	dmg: 504,	spot: 1.48, def: 1.66,	win: 55.33, tier: 4,	nation: "UK",	type: "TD"			},
				"ukgb73_at2":					{ frag: 1.29,	dmg: 617,	spot: 0.79, def: 1.97,	win: 55.00, tier: 5,	nation: "UK",	type: "TD"			},
				"ukgb74_at8":					{ frag: 1.24,	dmg: 916,	spot: 0.73, def: 1.69,	win: 54.00, tier: 6,	nation: "UK",	type: "TD"			},
				"ukgb40_gun_carrier_churchill":	{ frag: 0.92,	dmg: 704,	spot: 0.46, def: 1.10,	win: 50.85, tier: 6,	nation: "UK",	type: "TD"			},
				"ukgb75_at7":					{ frag: 1.19,	dmg: 1249,	spot: 0.69, def: 1.10,	win: 54.00, tier: 7,	nation: "UK",	type: "TD"			},
				"ukgb71_at_15a":				{ frag: 0.92,	dmg: 1008,	spot: 0.82, def: 1.21,	win: 51.56, tier: 7,	nation: "UK",	type: "TD",	prem: 1	},
				"ukgb72_at15":					{ frag: 1.15,	dmg: 1533,	spot: 0.63, def: 1.31,	win: 53.26, tier: 8,	nation: "UK",	type: "TD"			},
				"ukgb32_tortoise":				{ frag: 1.11,	dmg: 1772,	spot: 0.57, def: 1.07,	win: 51.99, tier: 9,	nation: "UK",	type: "TD"			},
				"ukgb48_fv215b_183":			{ frag: 1.15,	dmg: 2179,	spot: 0.60, def: 0.58,	win: 49.03, tier: 10,	nation: "UK",	type: "TD"			},
				// artillery
				"ukgb25_loyd_carrier":		{ frag: 1.47,	dmg: 280,	spot: 0.17, def: 2.23,	win: 51.21, tier: 2,	nation: "UK",	type: "SPG"				},
				"ukgb27_sexton":			{ frag: 1.30,	dmg: 490,	spot: 0.16, def: 1.93,	win: 55.11, tier: 3,	nation: "UK",	type: "SPG"				},
				"ukgb78_sexton_i":			{ frag: 1.30,	dmg: 490,	spot: 0.16, def: 1.93,	win: 55.11, tier: 3,	nation: "UK",	type: "SPG",	prem: 1	},
				"ukgb26_birch_gun":			{ frag: 1.11,	dmg: 477,	spot: 0.16, def: 1.94,	win: 51.11, tier: 4,	nation: "UK",	type: "SPG"				},
				"ukgb28_bishop":			{ frag: 1.11,	dmg: 620,	spot: 0.12, def: 1.76,	win: 55.29, tier: 5,	nation: "UK",	type: "SPG"				},
				"ukgb77_fv304":				{ frag: 0.95,	dmg: 889,	spot: 0.13, def: 1.72,	win: 49.00, tier: 6,	nation: "UK",	type: "SPG"				},
				"ukgb29_crusader_5inch":	{ frag: 0.81,	dmg: 1226,	spot: 0.10, def: 0.86,	win: 48.50, tier: 7,	nation: "UK",	type: "SPG"				},
				"ukgb79_fv206":				{ frag: 0.88,	dmg: 1335,	spot: 0.09, def: 0.61,	win: 46.68, tier: 8,	nation: "UK",	type: "SPG"				},
				"ukgb30_fv3805":			{ frag: 0.86,	dmg: 1619,	spot: 0.09, def: 0.58,	win: 48.32, tier: 9,	nation: "UK",	type: "SPG"				},
				"ukgb31_conqueror_gun":		{ frag: 0.87,	dmg: 1778,	spot: 0.08, def: 0.58,	win: 49.00, tier: 10,	nation: "UK",	type: "SPG"				},

			// france
				// light tanks
				"francerenaultft":		{ frag: 2.01,	dmg: 268,	spot: 2.12, def: 2.17,	win: 60.24, tier: 1,	nation: "FR",	type: "LT"	},
				"francehotchkiss_h35":	{ frag: 1.52,	dmg: 249,	spot: 1.32, def: 2.43,	win: 58.69, tier: 2,	nation: "FR",	type: "LT"	},
				"franced1":				{ frag: 1.46,	dmg: 250,	spot: 1.24, def: 2.90,	win: 53.96, tier: 2,	nation: "FR",	type: "LT"	},
				"franceamx38":			{ frag: 0.95,	dmg: 222,	spot: 1.05, def: 1.64,	win: 55.07, tier: 3,	nation: "FR",	type: "LT"	},
				"franceamx40":			{ frag: 0.93,	dmg: 297,	spot: 0.92, def: 1.39,	win: 53.09, tier: 4,	nation: "FR",	type: "LT"	},
				"franceelc_amx":		{ frag: 0.73,	dmg: 464,	spot: 2.88, def: 0.77,	win: 53.91, tier: 5,	nation: "FR",	type: "LT"	},
				"franceamx_12t":		{ frag: 0.63,	dmg: 471,	spot: 1.93, def: 0.69,	win: 51.44, tier: 6,	nation: "FR",	type: "LT"	},
				"franceamx_13_75":		{ frag: 0.75,	dmg: 623,	spot: 1.99, def: 0.77,	win: 53.10, tier: 7,	nation: "FR",	type: "LT"	},
				"franceamx_13_90":		{ frag: 0.81,	dmg: 846,	spot: 2.37, def: 0.66,	win: 53.77, tier: 8,	nation: "FR",	type: "LT"	},
				// medium tanks
				"franced2":					{ frag: 1.38,	dmg: 320,	spot: 0.97, def: 2.07,	win: 59.59, tier: 3,	nation: "FR",	type: "MT"	},
				"francelorraine40t":		{ frag: 1.09,	dmg: 1380,	spot: 1.47, def: 0.95,	win: 53.24, tier: 9,	nation: "FR",	type: "MT"	},
				"francebat_chatillon25t":	{ frag: 1.19,	dmg: 1761,	spot: 2.12, def: 0.84,	win: 52.51, tier: 10,	nation: "FR",	type: "MT"	},
				// heavy tanks
				"franceb1":				{ frag: 1.16,	dmg: 348,	spot: 1.20, def: 1.49,	win: 51.63, tier: 4,	nation: "FR",	type: "HT"			},
				"francebdr_g1b":		{ frag: 1.22,	dmg: 654,	spot: 0.83, def: 1.11,	win: 52.93, tier: 5,	nation: "FR",	type: "HT"			},
				"francearl_44":			{ frag: 0.96,	dmg: 813,	spot: 0.84, def: 0.85,	win: 51.08, tier: 6,	nation: "FR",	type: "HT"			},
				"franceamx_m4_1945":	{ frag: 0.89,	dmg: 1021,	spot: 0.93, def: 0.94,	win: 50.70, tier: 7,	nation: "FR",	type: "HT"			},
				"franceamx_50_100":		{ frag: 1.12,	dmg: 1417,	spot: 0.97, def: 1.07,	win: 51.65, tier: 8,	nation: "FR",	type: "HT"			},
				"francefcm_50t":		{ frag: 1.00,	dmg: 1312,	spot: 1.37, def: 1.11,	win: 50.71, tier: 8,	nation: "FR",	type: "HT",	prem: 1	},
				"franceamx_50_120":		{ frag: 1.12,	dmg: 1692,	spot: 0.90, def: 0.87,	win: 50.81, tier: 9,	nation: "FR",	type: "HT"			},
				"francef10_amx_50b":	{ frag: 1.07,	dmg: 1915,	spot: 1.03, def: 0.87,	win: 50.15, tier: 10,	nation: "FR",	type: "HT"			},
				// tank destroyer
				"francerenaultft_ac":	{ frag: 2.02,	dmg: 334,	spot: 0.86, def: 1.65,	win: 54.47, tier: 2,	nation: "FR",	type: "TD"			},
				"francefcm_36pak40":	{ frag: 1.58,	dmg: 389,	spot: 1.02, def: 2.09,	win: 57.84, tier: 3,	nation: "FR",	type: "TD",	prem: 1	},
				"francerenaultue57":	{ frag: 1.96,	dmg: 472,	spot: 1.03, def: 2.15,	win: 59.00, tier: 3,	nation: "FR",	type: "TD"			},
				"francesomua_sau_40":	{ frag: 1.19,	dmg: 409,	spot: 0.59, def: 1.14,	win: 53.90, tier: 4,	nation: "FR",	type: "TD"			},
				"frances_35ca":			{ frag: 1.26,	dmg: 649,	spot: 0.82, def: 1.26,	win: 51.59, tier: 5,	nation: "FR",	type: "TD"			},
				"francearl_v39":		{ frag: 0.99,	dmg: 765,	spot: 0.68, def: 1.13,	win: 48.76, tier: 6,	nation: "FR",	type: "TD"			},
				"franceamx_ac_mle1946":	{ frag: 0.95,	dmg: 1043,	spot: 0.72, def: 0.97,	win: 51.34, tier: 7,	nation: "FR",	type: "TD"			},
				"franceamx_ac_mle1948":	{ frag: 1.00,	dmg: 1359,	spot: 0.80, def: 0.95,	win: 50.97, tier: 8,	nation: "FR",	type: "TD"			},
				"franceamx50_foch":		{ frag: 1.03,	dmg: 1674,	spot: 0.97, def: 0.90,	win: 51.90, tier: 9,	nation: "FR",	type: "TD"			},
				"franceamx_50fosh_155":	{ frag: 1.33,	dmg: 2296,	spot: 0.95, def: 0.68,	win: 52.77, tier: 10,	nation: "FR",	type: "TD"			},
				// artillery
				"francerenaultbs":				{ frag: 1.44,	dmg: 278,	spot: 0.18, def: 1.85,	win: 52.70, tier: 2,	nation: "FR",	type: "SPG"				},
				"francelorraine39_l_am":		{ frag: 1.39,	dmg: 500,	spot: 0.15, def: 2.20,	win: 54.24, tier: 3,	nation: "FR",	type: "SPG"				},
				"franceamx_ob_am105":			{ frag: 1.11,	dmg: 477,	spot: 0.16, def: 1.94,	win: 51.11, tier: 4,	nation: "FR",	type: "SPG"				},
				"france_105_lefh18b2":			{ frag: 1.22,	dmg: 675,	spot: 0.12, def: 2.26,	win: 51.40, tier: 5,	nation: "FR",	type: "SPG",	prem: 1	},
				"franceamx_105am":				{ frag: 1.39,	dmg: 710,	spot: 0.12, def: 2.01,	win: 52.80, tier: 5,	nation: "FR",	type: "SPG"				},
				"franceamx_13f3am":				{ frag: 0.90,	dmg: 1052,	spot: 0.11, def: 1.56,	win: 49.39, tier: 6,	nation: "FR",	type: "SPG"				},
				"francelorraine155_50":			{ frag: 0.79,	dmg: 1235,	spot: 0.10, def: 1.02,	win: 48.87, tier: 7,	nation: "FR",	type: "SPG"				},
				"francelorraine155_51":			{ frag: 0.85,	dmg: 1309,	spot: 0.09, def: 0.72,	win: 46.67, tier: 8,	nation: "FR",	type: "SPG"				},
				"francebat_chatillon155_55":	{ frag: 1.02,	dmg: 1576,	spot: 0.09, def: 0.59,	win: 48.93, tier: 9,	nation: "FR",	type: "SPG"				},
				"francebat_chatillon155_58":	{ frag: 1.02,	dmg: 1682,	spot: 0.08, def: 0.94,	win: 50.11, tier: 10,	nation: "FR",	type: "SPG"				},

			// china
				// light tanks
				"chinach06_renault_nc31":			{ frag: 2.05,	dmg: 274,	spot: 1.51, def: 2.10,	win: 60.00, tier: 1,	nation: "CH",	type: "LT"			},
				"chinach07_vickers_mke_type_bt26":	{ frag: 1.85,	dmg: 308,	spot: 1.72, def: 1.83,	win: 60.49, tier: 2,	nation: "CH",	type: "LT"			},
				"chinach08_type97_chi_ha":			{ frag: 1.57,	dmg: 384,	spot: 1.47, def: 1.71,	win: 59.80, tier: 3,	nation: "CH",	type: "LT"			},
				"chinach09_m5":						{ frag: 1.08,	dmg: 377,	spot: 2.62, def: 1.15,	win: 55.52, tier: 4,	nation: "CH",	type: "LT"			},
				"chinach15_59_16":					{ frag: 0.63,	dmg: 415,	spot: 2.83, def: 0.81,	win: 51.52, tier: 6,	nation: "CH",	type: "LT"			},
				"chinach24_type64":					{ frag: 0.66,	dmg: 483,	spot: 2.75, def: 0.75,	win: 52.33, tier: 6,	nation: "CH",	type: "LT",	prem: 1	},
				"chinach16_wz_131":					{ frag: 0.73,	dmg: 752,	spot: 2.59, def: 0.81,	win: 52.48, tier: 7,	nation: "CH",	type: "LT"			},
				"chinach02_type62":					{ frag: 0.70,	dmg: 685,	spot: 2.43, def: 0.85,	win: 52.18, tier: 7,	nation: "CH",	type: "LT",	prem: 1	},
				"chinach17_wz131_1_wz132":			{ frag: 0.68,	dmg: 804,	spot: 2.87, def: 0.69,	win: 52.11, tier: 8,	nation: "CH",	type: "LT"			},
				// medium tanks
				"chinach21_t34":		{ frag: 1.18,	dmg: 538,	spot: 1.45, def: 1.25,	win: 53.54, tier: 5,	nation: "CH",	type: "MT"			},
				"chinach20_type58":		{ frag: 1.10,	dmg: 751,	spot: 1.56, def: 1.22,	win: 52.87, tier: 6,	nation: "CH",	type: "MT"			},
				"chinach04_t34_1":		{ frag: 1.03,	dmg: 1015,	spot: 1.58, def: 1.04,	win: 53.58, tier: 7,	nation: "CH",	type: "MT"			},
				"chinach05_t34_2":		{ frag: 0.91,	dmg: 1115,	spot: 1.66, def: 0.79,	win: 52.30, tier: 8,	nation: "CH",	type: "MT"			},
				"chinach14_t34_3":		{ frag: 0.91,	dmg: 1115,	spot: 1.66, def: 0.79,	win: 52.30, tier: 8,	nation: "CH",	type: "MT",	prem: 1	},
				"chinach01_type59":		{ frag: 0.99,	dmg: 1132,	spot: 1.70, def: 1.02,	win: 52.88, tier: 8,	nation: "CH",	type: "MT",	prem: 1	},
				"chinach01_type59_g":	{ frag: 0.99,	dmg: 1132,	spot: 1.70, def: 1.02,	win: 52.88, tier: 8,	nation: "CH",	type: "MT",	prem: 1	},
				"chinach18_wz120":		{ frag: 0.99,	dmg: 1524,	spot: 1.64, def: 0.77,	win: 53.20, tier: 9,	nation: "CH",	type: "MT"			},
				"chinach19_121":		{ frag: 0.95,	dmg: 1704,	spot: 1.39, def: 0.69,	win: 51.04, tier: 10,	nation: "CH",	type: "MT"			},
				// heavy tanks
				"chinach10_is2":		{ frag: 1.07,	dmg: 1153,	spot: 1.11, def: 0.86,	win: 53.10, tier: 7,	nation: "CH",	type: "HT"			},
				"chinach11_110":		{ frag: 0.94,	dmg: 1347,	spot: 1.17, def: 0.87,	win: 53.26, tier: 8,	nation: "CH",	type: "HT"			},
				"chinach03_111":		{ frag: 1.11,	dmg: 1415,	spot: 1.11, def: 0.91,	win: 53.28, tier: 8,	nation: "CH",	type: "HT",	prem: 1	},
				"chinach23_112":		{ frag: 1.11,	dmg: 1415,	spot: 1.11, def: 0.91,	win: 53.28, tier: 8,	nation: "CH",	type: "HT",	prem: 1	},
				"chinach12_111_1_2_3":	{ frag: 0.91,	dmg: 1586,	spot: 1.34, def: 0.54,	win: 52.66, tier: 9,	nation: "CH",	type: "HT"			},
				"chinach22_113":		{ frag: 0.88,	dmg: 1748,	spot: 1.23, def: 0.66,	win: 49.50, tier: 10,	nation: "CH",	type: "HT"			},

			// japan
				// light tanks
				"japannc27":		{ frag: 2.05,	dmg: 260,	spot: 1.38, def: 1.76,	win: 57.88, tier: 1,	nation: "JP",	type: "LT"			},
				"japanha_go":		{ frag: 1.80,	dmg: 295,	spot: 2.02, def: 2.02,	win: 58.04, tier: 2,	nation: "JP",	type: "LT"			},
				"japanke_ni":		{ frag: 1.39,	dmg: 314,	spot: 1.95, def: 1.64,	win: 57.44, tier: 3,	nation: "JP",	type: "LT"			},
				"japanke_ni_b":		{ frag: 1.39,	dmg: 314,	spot: 1.95, def: 1.64,	win: 57.44, tier: 3,	nation: "JP",	type: "LT",	prem: 1	},
				"japanke_ho":		{ frag: 1.11,	dmg: 359,	spot: 2.39, def: 1.36,	win: 56.28, tier: 4,	nation: "JP",	type: "LT"			},
				// medium tanks
				"japanchi_ni":		{ frag: 1.80,	dmg: 297,	spot: 1.23, def: 1.67,	win: 57.37, tier: 2,	nation: "JP",	type: "MT"			},
				"japanchi_ha":		{ frag: 1.45,	dmg: 334,	spot: 1.26, def: 1.41,	win: 56.52, tier: 3,	nation: "JP",	type: "MT"			},
				"japanchi_he":		{ frag: 1.27,	dmg: 429,	spot: 1.38, def: 1.31,	win: 55.34, tier: 4,	nation: "JP",	type: "MT"			},
				"japanchi_nu":		{ frag: 1.15,	dmg: 530,	spot: 1.41, def: 1.19,	win: 54.27, tier: 5,	nation: "JP",	type: "MT"			},
				"japanchi_nu_kai":	{ frag: 1.15,	dmg: 530,	spot: 1.41, def: 1.19,	win: 54.27, tier: 5,	nation: "JP",	type: "MT",	prem: 1	},
				"japanchi_to":		{ frag: 1.08,	dmg: 755,	spot: 1.44, def: 1.21,	win: 53.18, tier: 6,	nation: "JP",	type: "MT"			},
				"japanchi_ri":		{ frag: 0.95,	dmg: 898,	spot: 1.52, def: 1.12,	win: 53.05, tier: 7,	nation: "JP",	type: "MT"			},
				"japansta_1":		{ frag: 0.95,	dmg: 1186,	spot: 1.41, def: 1.09,	win: 53.04, tier: 8,	nation: "JP",	type: "MT"			},
				"japantype_61":		{ frag: 0.99,	dmg: 1524,	spot: 1.64, def: 0.77,	win: 53.20, tier: 9,	nation: "JP",	type: "MT"			},
				"japanst_b1":		{ frag: 0.93,	dmg: 1736,	spot: 1.46, def: 0.82,	win: 47.28, tier: 10,	nation: "JP",	type: "MT"			},

				"tankname": { frag: 0,		dmg: 0,		spot: 0,	def: 0,		win: 0,		tier: 0,	nation: "XX",	type: "XX"			}
			};
			tiersArr = []; premArr = []; tenArr = []; badgesArr = [];
			vehAmount = vehTierTotal = vehBattlesTotal = 0,
			premBattlesTotal = premWinsTotal = premBadgesTotal = 0,
			tenBattlesTotal = tenWinsTotal = tenBadgesTotal = 0,
			veh_eFrag = veh_eDmg = veh_eSpot = veh_eDef = veh_eWin = 0;

		// total mastery badge and colouring tank table category rows
		var typeRow_class = document.getElementsByClassName('t-profile_tankstype js-table-dropdown-link');
			for (var i=0; i<typeRow_class.length; i++) {
				vehAmount += filter(typeRow_class[i].cells[0].getElementsByTagName('span')[1].innerHTML,1);
				typeBattles = filter(typeRow_class[i].cells[1].innerHTML,1);
				typeWinrate = filter(typeRow_class[i].cells[2].innerHTML,1);
				typeWins = typeBattles*(typeWinrate/100);
				// modify table
				typeRow_class[i].cells[2].innerHTML = filter(typeWins.toFixed(0),3)+" - "+colStat(typeWinrate, "winrate", 0, "pct");
			}

		// average tier, colouring premium tanks and winrates in vehicle tables
		var vehRow_class = document.getElementsByClassName('t-profile_tankstype t-profile_tankstype__item');
			vehRowStats_class = document.getElementsByClassName('t-profile_slidedown tablesorter-childRow');
			for (var i=0; i<vehRow_class.length; i++) {
				// fetch info from table
				vehImgName = vehRow_class[i].cells[0].getElementsByTagName('img')[0].src.match(/\w+-([\w-]+).png/);
				vehNameExp = filter(vehRow_class[i].cells[0].getElementsByTagName('img')[0].src.match(/(\w+-[\w-]+).png/)[1],4);
				vehBattles = filter(vehRow_class[i].cells[1].innerHTML,1);
				vehWinrate = filter(vehRow_class[i].cells[2].innerHTML,1);
				typeWins = vehBattles*(vehWinrate/100);
				if (vehRow_class[i].cells[3].getElementsByTagName('img')[0]) { badgesArr.push([filter(vehRow_class[i].cells[3].getElementsByTagName('img')[0].getAttribute('data-badge_code'),1)]); }
				else { badgesArr.push([0]); }
				// modify table
				vehRow_class[i].cells[0].getElementsByTagName('img')[0].src = "http://"+wg_host+"/static/3.13.0.2.1/encyclopedia/tankopedia/vehicle/"+vehImgName[0];
				vehRow_class[i].cells[2].innerHTML = filter(typeWins.toFixed(0),3)+" - "+colStat(vehWinrate, "winrate", 0, "pct");

				// convert vehicle tier and summarize
				vehTier = statArr[vehNameExp].tier;
				tiersArr.push([vehTier, vehBattles]);
				vehTierTotal += vehTier*vehBattles;
				vehBattlesTotal += vehBattles;

				// summarize expected stat from every tank for WN8
				veh_eFrag += statArr[vehNameExp].frag*vehBattles,
				veh_eDmg  += statArr[vehNameExp].dmg *vehBattles,
				veh_eSpot += statArr[vehNameExp].spot*vehBattles,
				veh_eDef  += statArr[vehNameExp].def *vehBattles,
				veh_eWin  += statArr[vehNameExp].win *vehBattles;

				// get info for premium table
				if (statArr[vehNameExp].prem !== undefined) {
					premBattlesTotal += filter(vehRow_class[i].cells[1].innerHTML,1);
					premWinsTotal += filter(vehRow_class[i].cells[2].innerHTML.match(/[\d.,\s]+\s-/)[0],1);
					vehRow_class[i].cells[0].getElementsByTagName('span')[1].className += " b-gold-name";
					premArr.push([vehRow_class[i].cloneNode(true), vehRowStats_class[i].cloneNode(true)]);
					if (vehRow_class[i].cells[3].innerHTML.length > 2) { premBadgesTotal += 1; }
				}

				// get info for tier 10 table
				if (vehTier == 10) {
					tenBattlesTotal += filter(vehRow_class[i].cells[1].innerHTML,1);
					tenWinsTotal += filter(vehRow_class[i].cells[2].innerHTML.match(/[\d.,\s]+\s-/)[0],1);
					tenArr.push([vehRow_class[i].cloneNode(true), vehRowStats_class[i].cloneNode(true)]);
					if (vehRow_class[i].cells[3].innerHTML.length > 2) { tenBadgesTotal += 1; }
				}
			}

		// vehicles per tier and battles per tier
		var tiersCount	= {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0};
			tiersBattle = {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0};
			tiersArr.sort(function(a,b){return a[0]-b[0];});
			tiersArr.forEach(function(a) {
				tiersCount[a[0]] += 1;
				tiersBattle[a[0]] += a[1];
			}, 0);

		// mastery badges
		var badgesCount = {0:0,1:0,2:0,3:0,4:0,5:vehAmount};
			badgesArr.forEach(function(a) {
				badgesCount[a[0]] += 1;
			}, 0);

		// finding statistic tables
		var mb_table = document.getElementsByClassName('b-result-classes')[0].getElementsByClassName('t-dotted')[0];
			or_table = document.getElementsByClassName('b-result')[0].getElementsByClassName('t-dotted')[0];
			bp_table = document.getElementsByClassName('b-result')[1].getElementsByClassName('t-dotted')[0];
			sm_ratio = document.getElementsByClassName('b-speedometer-ratio');

		// fetching info and calculate draws
		var battles	= filter(or_table.rows[0].cells[1].innerHTML,1),
			wins	= filter(or_table.rows[1].cells[1].innerHTML.match(/([\d.,\s|&nbsp;]+\d+)\s/)[1],1),
			losses	= filter(or_table.rows[2].cells[1].innerHTML.match(/([\d.,\s|&nbsp;]+\d+)\s/)[1],1),
			survive	= filter(or_table.rows[3].cells[1].innerHTML.match(/([\d.,\s|&nbsp;]+\d+)\s/)[1],1),
			exp		= filter(or_table.rows[4].cells[1].innerHTML,1),
			avgExp	= filter(or_table.rows[5].cells[1].innerHTML,1),
			maxExp	= filter(or_table.rows[6].cells[1].innerHTML,1),
			frags	= filter(bp_table.rows[0].cells[1].innerHTML,1),
			spotted	= filter(bp_table.rows[1].cells[1].innerHTML,1),
			hitRate	= filter(bp_table.rows[2].cells[1].innerHTML,1),
			dmgDlt	= filter(bp_table.rows[3].cells[1].innerHTML,1),
			caps	= filter(bp_table.rows[5].cells[1].innerHTML,1),
			defs	= filter(bp_table.rows[6].cells[1].innerHTML,1),
			deaths	= filter(sm_ratio[0].innerHTML.match(/\/(.+)$/)[1],1),
			dmgRec	= filter(sm_ratio[1].innerHTML.match(/\/(.+)$/)[1],1),
			draws	= battles-(wins+losses);

		// calculate averages and rates
		var avgBat		= battles/daysPassed,
			avgWin		= wins/battles,
			avgWinPct	= avgWin*100,
			avgLoss		= losses/battles,
			avgLossPct	= avgLoss*100,
			avgDraws	= draws/battles,
			avgDrawsPct	= avgDraws*100,
			avgSurv		= survive/battles,
			avgSurvPct	= avgSurv*100,
			avgFrags	= frags/battles,
			avgDeaths	= deaths/battles,
			avgSpots	= spotted/battles,
			avgDmg		= dmgDlt/battles,
			avgDmgRec	= dmgRec/battles,
			avgCap		= caps/battles,
			avgDef		= defs/battles,
			avgTier		= vehTierTotal/vehBattlesTotal,
			winlossRate = wins/losses;

		// colourize stats
		var avgWinrate	= colStat(avgWinPct,	"winrate",	2, "pct", ""		),
			avgLossrate	= colStat(avgLossPct,	"winrate",	2, "pct", avgDraws	),
			avgSurvrate	= colStat(avgSurvPct,	"survrate",	2, "pct", ""		),
			avgHitrate	= colStat(hitRate,		"hitrate",	0, "pct", ""		),
			colBattles	= colStat(battles,		"battles",	0,	"",	  ""		),
			avgDrawrate	= colStat(avgDrawsPct,	"",			2, "pct", ""		);

		// Finalize WN8 - e = expected, w = weighted, n = normalized
		// all steps are stored in variables for console insertion
		var eFrag = veh_eFrag/vehBattlesTotal,
			eDmg  = veh_eDmg /vehBattlesTotal,
			eSpot = veh_eSpot/vehBattlesTotal,
			eDef  = veh_eDef /vehBattlesTotal,
			eWin  = veh_eWin /vehBattlesTotal,
			wFrag = avgFrags/eFrag,
			wDmg  = avgDmg/eDmg,
			wSpot = avgSpots/eSpot,
			wDef  = avgDef/eDef,
			wWin  = avgWinPct/eWin,
			nWin  = Math.max(				   (wWin  - 0.71) / (1 - 0.71) ,0),
			nDmg  = Math.max(				   (wDmg  - 0.22) / (1 - 0.22) ,0),
			nFrag = Math.max(Math.min(nDmg+0.2,(wFrag - 0.12) / (1 - 0.12)),0),
			nSpot = Math.max(Math.min(nDmg+0.1,(wSpot - 0.38) / (1 - 0.38)),0),
			nDef  = Math.max(Math.min(nDmg+0.1,(wDef  - 0.10) / (1 - 0.10)),0);

		// calculate ratings
		// WN8
		var wn8 = (function() {
			var frag = 210*nDmg*nFrag,
				dmg	 = 980*nDmg,
				spot = 155*nFrag*nSpot,
				def	 = 75*nDef*nFrag,
				win	 = 145*Math.min(1.8,nWin),
				rating = frag+dmg+spot+def+win;
				scale = Math.max(Math.min(rating*(rating*(rating*(rating*(rating*(0.00000000000000000007119*rating+0.0000000000000002334)-0.000000000006963)+0.00000002845)-0.00004558)+0.06565)-0.18,100),0);
			return { frag: frag, dmg: dmg, spot: spot, def: def, win: win, rating: rating, scale: scale, ratingCol: colStat(rating,"wn8",2), scaleCol: colStat(scale,"scale_wn8",2)	 };
		})();
		// WN7 - Legacy Support
		var wn7 = (function() {
			var frag = avgFrags*(1240-1040/(Math.pow(Math.min(avgTier,6),0.164))),
				dmg	 = avgDmg*530/(184*Math.exp(0.24*avgTier)+130),
				spot = avgSpots*125*Math.min(avgTier,3)/3,
				def	 = Math.min(2.2,avgDef)*100,
				win	 = (((185/(0.17+Math.exp((avgWinPct-35)*-0.134)))-500)*0.45),
				norm = -Math.abs((((5-Math.min(avgTier,5))*125)/(1+Math.exp(avgTier-Math.pow(battles/220,3/avgTier))*1.5))),
				rating = frag+dmg+spot+def+win+norm;
				if (rating>=2200){scale = 100;}
				else { scale = Math.max(Math.min(rating*(rating*(rating*(-0.0000000000083*rating+0.0000000287)-0.000024)+0.049)-2.7,100),0); }
			return { frag: frag, dmg: dmg, spot: spot, def: def, win: win, norm: norm, rating: rating, scale: scale, ratingCol: colStat(rating,"wn7",2), scaleCol: colStat(scale,"scale_wn7",2) };
		})();
		// efficiency - improved
		var eff = (function() {
			var frag = avgFrags*250,
				dmg	 = avgDmg*(10/(avgTier+2))*(0.23+2*avgTier/100),
				spot = avgSpots*150,
				cap	 = (Math.log(avgCap+1)/Math.log(1.732))*150,
				def	 = avgDef*150,
				rating = frag+dmg+spot+cap+def;
				scale = Math.max(Math.min(rating*(rating*(rating*(rating*(rating*(0.000000000000000045254*rating-0.00000000000033131)+0.00000000094164)-0.0000013227)+0.00095664)-0.2598)+13.23,100),0);
			return { frag: frag, dmg: dmg, spot: spot, cap: cap, def: def, rating: rating, scale: scale, ratingCol: colStat(rating,"eff",2), scaleCol: colStat(scale,"scale_eff",2) };
		})();
		// end formula calculations and variables

		// check for missing battles and notify
			colVehBattlesTotal = " ";
			if (vehBattlesTotal != battles) {
				profileName_class.innerHTML += "<div class='b-profile-error'>"+locale.p69.lang+"</div>";
				colVehBattlesTotal = "<span class='t-dotted_minor'>API:</span> <font color='940000'>"+filter(vehBattlesTotal,2)+"</font>";
			}

		// personal data - modify data
		var pTable_class = document.getElementsByClassName('t-personal-data')[0];
			pTable_class.rows[0].cells[0].innerHTML = locale.p09.lang;
			pTable_class.rows[1].cells[0].innerHTML = avgWinrate;
			pTable_class.rows[0].cells[1].innerHTML = locale.p10.lang;
			pTable_class.rows[1].cells[1].innerHTML = colBattles;
			pT_avgxp_name = document.createElement('th');
			pT_avgxp_name.className = "t-personal-data_ico t-personal-data_ico__exp";
			pT_avgxp_name.innerHTML = locale.p11.lang;
			pTable_class.rows[0].cells[1].parentNode.insertBefore(pT_avgxp_name, pTable_class.rows[0].cells[1].nextSibling);
			pT_avgxp_value = document.createElement('td');
			pT_avgxp_value.className = "t-personal-data_value";
			pT_avgxp_value.innerHTML = filter(avgExp,2);
			pTable_class.rows[1].cells[1].parentNode.insertBefore(pT_avgxp_value, pTable_class.rows[1].cells[1].nextSibling);
			pTable_class.rows[0].cells[4].innerHTML = locale.p70.lang;
			pTable_class.rows[0].cells[4].className = "t-personal-data_ico t-personal-data_ico__hitrate";
			pTable_class.rows[1].cells[3].innerHTML = avgHitrate;
			pTable_class.rows[0].cells[5].innerHTML = locale.p71.lang;
			pT_avgtier_name = document.createElement('th');
			pT_avgtier_name.className = "t-personal-data_ico t-personal-data_ico__tier";
			pT_avgtier_name.innerHTML = locale.p12.lang;
			pTable_class.rows[0].appendChild(pT_avgtier_name);
			pT_avgtier_value = document.createElement('td');
			pT_avgtier_value.className = "t-personal-data_value";
			pT_avgtier_value.innerHTML = avgTier.toFixed(2);
			pTable_class.rows[1].appendChild(pT_avgtier_value);

		// speedometer - win/loss ratio
		var sm_body_class = document.getElementsByClassName('b-speedometer-body')[0];
			sm_winrate_div = document.createElement('div');
			sm_winrate_div.className = "b-speedometer";
			sm_winrate_arrow = Math.min(30*(winlossRate-1),31).toFixed(4);
			sm_winrate_div.innerHTML = "<div class='b-speedometer-arrow' data-deg='"+sm_winrate_arrow+"' style='transform: rotate("+sm_winrate_arrow+"deg); -webkit-transform: rotate("+sm_winrate_arrow+"deg); -ms-transform: rotate("+sm_winrate_arrow+"deg);'></div><div class='b-speedometer-round'></div><p class='b-speedometer-title'>"+locale.p13.lang+"</p><p class='b-speedometer-weight'>"+winlossRate.toFixed(2)+"</p><p class='b-speedometer-ratio'>"+filter(wins,3)+" / "+filter(losses,3)+"</p>";
			sm_body_class.appendChild(sm_winrate_div);

		// performance ratings wrapper
		var ratings_div = document.createElement('div');
			ratings_div.className = "b-ratings-wrpr",
			ub_class = document.getElementsByClassName('b-userblock-wrpr')[0];
			ub_class.parentNode.insertBefore(ratings_div, ub_class.nextSibling);
			ratingsHeader_div = document.createElement('div');
			ratingsHeader_div.className = "b-head-block",
			ratingsHeader_div.innerHTML += "<h3>"+locale.p14.lang+"</h3>";
			ratings_div.appendChild(ratingsHeader_div);
			ratingsInfo_div = document.createElement('div');
			ratingsInfo_div.className = "b-ratings-info",
			ratings_div.appendChild(ratingsInfo_div);
			ratingsInfo_table = document.createElement('table');
			ratingsInfo_table.className = "t-ratings-info",
			ratingsInfo_div.appendChild(ratingsInfo_table);
			// inserting performance ratings
			ratingsInfo_table.innerHTML = "<thead><tr><th><a href='http://wiki.wnefficiency.net/pages/WN8' target='_blank'>"+locale.p15.lang+"</a></th><th>"+locale.p30.lang+"</th><th>"+locale.p16.lang+"</th><th><a class='rating-url_nm' target='_blank' href="+nm_url+">"+locale.p17.lang+"</a></th></tr></thead><tbody><tr><td class='js-wnscript'>"+wn8.ratingCol+"</td><td>"+wn7.ratingCol+"</td><td>"+eff.ratingCol+"</td><td class='js-noobmeter'>"+locale.p18.lang+"</td></tr></tbody>";
			if (server == "xbox") {
				ratingsInfo_table.rows[0].cells[3].style.display="none";
				ratingsInfo_table.rows[1].cells[3].style.display="none";
			}

		// create and populate performance ratings calcs table
		var rTable_div = document.createElement('div');
			rTable_div.className = "ratings-table";
			ratings_div.appendChild(rTable_div);
			rTable_div.innerHTML = "<h3>"+locale.p19.lang+"</h3>";
			rTable = document.createElement('table');
			rTable.className = "t-table-ratings";
			rTable_div.appendChild(rTable);
			rTHead = document.createElement('thead');
			rTHead.innerHTML = "<tr><th>"+locale.p20.lang+"</th><th>"+locale.p21.lang+"</th><th>"+locale.p22.lang+"</th><th>"+locale.p23.lang+"</th><th>"+locale.p24.lang+"</th><th>"+locale.p25.lang+"</th><th>"+locale.p26.lang+"</th><th>"+locale.p27.lang+"</th><th>"+locale.p28.lang+"</th></tr>";
			rTable.appendChild(rTHead);
			rTBody = document.createElement('tbody');
			rTable.appendChild(rTBody);
			ratingsArr = [
			//	Formula		ScaleRaw	Localized			Total			ScaleColored	Frag					Dmg					Spot					Cap					Def					Win
				["wn8",		wn8.scale,	locale.p29.lang,	wn8.ratingCol,	wn8.scaleCol,	wn8.frag.toFixed(2),	wn8.dmg.toFixed(2), wn8.spot.toFixed(2),	"–",				wn8.def.toFixed(2), wn8.win.toFixed(2)	],
				["wn7",		wn7.scale,	locale.p30.lang,	wn7.ratingCol,	wn7.scaleCol,	wn7.frag.toFixed(2),	wn7.dmg.toFixed(2), wn7.spot.toFixed(2),	"–",				wn7.def.toFixed(2), wn7.win.toFixed(2)	],
				["eff",		eff.scale,	locale.p31.lang,	eff.ratingCol,	eff.scaleCol,	eff.frag.toFixed(2),	eff.dmg.toFixed(2),	eff.spot.toFixed(2),	eff.cap.toFixed(2),	eff.def.toFixed(2),	"–"					]
			];
			for (i=0; i<ratingsArr.length; ++i) {
				rRow = document.createElement('tr');
				rTBody.appendChild(rRow);
				for (j=2; j<ratingsArr[i].length; ++j) {
					rCell = document.createElement('td');
					rCell.className = "td-center";
					rCell.innerHTML = ratingsArr[i][j];
					rRow.appendChild(rCell);
				}
				rmRow = document.createElement('tr');
				rmRow.innerHTML = "<td class='td-rating-meter' colspan='9'><div class='rating-meter rating-meter_"+ratingsArr[i][0]+"'><div class='rating-meter-dail_line' style='width:"+ratingsArr[i][1]+"%;'><div class='rating-meter-marker'></div></div></div></td>";
				rTBody.appendChild(rmRow);
			}

		// link to WN thread
			ratings_div.innerHTML += "<div class='wnelink'><a class ='b-orange-arrow wnelink_info' target='_blank' href='http://wiki.wnefficiency.net/pages/WN_Efficiency_Wiki'>"+locale.p32.lang+"</a></div>";

		// end performance ratings wrapper

		// statistics wrapper
		var statistics_div = document.getElementsByClassName('b-result-classes')[0].parentNode;
			statistics_div.className = "b-statistics-wrpr";
			ratings_div.parentNode.insertBefore(statistics_div, ratings_div.nextSibling);

		// remove the old tables ( overall results and battle performance )
			mb_table.innerHTML = "<tbody></tbody>";
			or_table.innerHTML = "<tbody></tbody>";
			bp_table.innerHTML = "<tbody></tbody>";

		// populating the tables
		var mb_table_cn = mb_table.firstElementChild,
			or_table_cn = or_table.firstElementChild,
			bp_table_cn = bp_table.firstElementChild;
			insertNewTr(mb_table_cn, "<img src='/static/3.17.1.2/common/img/classes/class-ace.png'>",	locale.p33.lang, badgesCount[4].toString()+"<span>("+(badgesCount[4]/badgesCount[5]*100).toFixed(0)+"%)</span>"),
			insertNewTr(mb_table_cn, "<img src='/static/3.17.1.2/common/img/classes/class-1.png'>",		locale.p34.lang, badgesCount[3].toString()+"<span>("+(badgesCount[3]/badgesCount[5]*100).toFixed(0)+"%)</span>"),
			insertNewTr(mb_table_cn, "<img src='/static/3.17.1.2/common/img/classes/class-2.png'>",		locale.p35.lang, badgesCount[2].toString()+"<span>("+(badgesCount[2]/badgesCount[5]*100).toFixed(0)+"%)</span>"),
			insertNewTr(mb_table_cn, "<img src='/static/3.17.1.2/common/img/classes/class-3.png'>",		locale.p36.lang, badgesCount[1].toString()+"<span>("+(badgesCount[1]/badgesCount[5]*100).toFixed(0)+"%)</span>"),
			insertNewTr(mb_table_cn, "<img src='"+uri_badges_class_none+"'>",							locale.p37.lang, badgesCount[0].toString()+"<span>("+(badgesCount[0]/badgesCount[5]*100).toFixed(0)+"%)</span>"),
			insertNewTr(mb_table_cn, "<img src='"+uri_badges_class_total+"'>",							locale.p38.lang, badgesCount[5].toString()+"<span>("+(badgesCount[5]/badgesCount[5]*100).toFixed(0)+"%)</span>"),
			insertNewTr(or_table_cn, locale.p39.lang, filter(battles,2),	colVehBattlesTotal	),
			insertNewTr(or_table_cn, locale.p40.lang, filter(wins,2),		"("+avgWinrate+")"	),
			insertNewTr(or_table_cn, locale.p41.lang, filter(losses,2),		"("+avgLossrate+")"	),
			insertNewTr(or_table_cn, locale.p42.lang, filter(draws,2),		"("+avgDrawrate+")"	),
			insertNewTr(or_table_cn, locale.p43.lang, filter(survive,2),	"("+avgSurvrate+")"	),
			insertNewTr(or_table_cn, locale.p44.lang, "",					avgBat.toFixed(2)	),
			insertNewTr(or_table_cn, locale.p45.lang, "",					filter(exp,2)		),
			insertNewTr(or_table_cn, locale.p46.lang, "",					filter(avgExp,2)	),
			insertNewTr(or_table_cn, locale.p47.lang, "",					filter(maxExp,2)	),
			insertNewTr(bp_table_cn, locale.p48.lang, filter(frags,2),		avgFrags.toFixed(2)	),
			insertNewTr(bp_table_cn, locale.p49.lang, filter(deaths,2),		avgDeaths.toFixed(2)),
			insertNewTr(bp_table_cn, locale.p50.lang, filter(spotted,2),	avgSpots.toFixed(2)	),
			insertNewTr(bp_table_cn, locale.p51.lang, "",					avgHitrate			),
			insertNewTr(bp_table_cn, locale.p52.lang, filter(dmgDlt,2),		avgDmg.toFixed(2)	),
			insertNewTr(bp_table_cn, locale.p53.lang, filter(dmgRec,2),		avgDmgRec.toFixed(2)),
			insertNewTr(bp_table_cn, locale.p54.lang, filter(caps,2),		avgCap.toFixed(2)	),
			insertNewTr(bp_table_cn, locale.p55.lang, filter(defs,2),		avgDef.toFixed(2)	),
			insertNewTr(bp_table_cn, locale.p56.lang, "",					avgTier.toFixed(2)	);

		// cake diagrams - adding tier diagram
		var diagramsSector_class = document.getElementsByClassName('b-diagrams-sector')[0];
			diagramsTier_div = document.createElement('div'),
			diagramsTier_div.className = "b-diagram-block b-diagram-tiers js-diagram-block";
			diagramsTier_div.innerHTML = "<h3>"+locale.p57.lang+"</h3><div class='b-diagram-wrpr'><div class='b-diagram' id='holder-mechanism-tier'></div><div class='b-diagram-round js-diagram-round'><span class='b-diagram-round_title'></span><span class='b-diagram-round_value js-result'>"+vehAmount+"</span></div></div>";
			diagramsSector_class.firstElementChild.parentNode.insertBefore(diagramsTier_div, diagramsSector_class.firstElementChild.nextSibling);
			diagramsTier_table = document.createElement('table'),
			diagramsTier_table.className = "t-dotted t-dotted__diagram js-diagram-mechanism-legend";
			diagramsTier_table.innerHTML = "<tbody></tbody>";
			diagramsTier_div.appendChild(diagramsTier_table);
			diagramsTier_td = 0;
			diagramsTierColorArr = ["496877","2b591f","831818","303766","814f07","1A775F","B0D23A","763D46","936C19","471952"];
			for (var x in tiersCount) {
				diagramsTierColor = diagramsTierColorArr[diagramsTier_td];
				diagramsTier_td += 1;
				if (tiersCount[x] !== 0) {
					battleRate = (tiersBattle[x]/battles*100).toFixed(2);
					tierRate = (tiersCount[x]/vehAmount*100).toFixed(2);
					diagramsTier_table.firstElementChild.innerHTML += "<tr><td class='t-dotted_diagram-first'><span class='t-dotted_diagram-bg'></span></td><td><span class='t-dotted_diagram-bg'><span class='t-dotted_diagram-info'><span class='t-diagram_battle'>"+filter(tiersBattle[x],3)+"</span><span class='t-dotted_diagram-percent'>(<span class=''>"+battleRate+"%</span>)</span><span class='t-diagram_tiers js-results'>"+tiersCount[x]+"</span><span class='t-dotted_diagram-percent'>(<span class='js-value'>"+tierRate+"%</span>)</span></span><span class='b-diagram-ico b-diagram-ico_tier b-diagram-ico_tier-"+diagramsTier_td+"'>"+locale.p58.lang+" "+diagramsTier_td+"</span></span></td><td class='t-dotted_diagram-last'><span class='t-dotted_diagram-bg'><span class='js-colors'>#"+diagramsTierColor+"</span></span></td></tr>";
				}
			}
			diagramsSector_class.firstElementChild.innerHTML += "<div class='b-diagram-total'><h3>"+locale.p59.lang+" "+vehAmount+"</h3></div>";
			// fix for cake diagram in chrome and opera
			if (chrome) {
				$('.js-diagram-block').each(function() { var items = [], values = [], labels = [], colors = [], results = [], legend, result, holder; holder = $('.b-diagram', this).attr('id'); $('.js-diagram-mechanism-legend tr', this).each(function () { items.push($(this)); values.push(parseInt($('.js-value', this).text(), 10)); labels.push($('.js-label', this).text()); colors.push($('.js-colors', this).text()); results.push($('.js-results', this).text()); legend = $('.js-diagram-mechanism-legend'); result = $('#' + holder).next().find('.js-result'); }); Raphael(holder, 630, 630).pieChart(65, 65.5, 53.5, items, values, colors, results, legend, result); });
			}

		// achievements wrapper
		var medalHeader_class = document.getElementsByClassName('js-achievements-header')[0];
			medalEmpty_class = document.getElementsByClassName('b-profile-item-empty')[0];
			medalToggle_class = document.getElementsByClassName('js-achivements-showhide')[0];
			medalShort_class = document.getElementsByClassName('js-short-achievements')[0];
			medalFull_class = document.getElementsByClassName('js-full-achievements')[0];
			medal_div = document.createElement('div');
			medal_div.className = "b-achievements-wrpr";
			medalHeader_div = document.createElement('div');
			medalHeader_div.className = "b-head-block";
			medalHeader_div.appendChild(medalHeader_class);
			medal_div.appendChild(medalHeader_div);
			if (medalEmpty_class !== undefined) { medal_div.appendChild(medalEmpty_class); }
			medal_div.appendChild(medalToggle_class);
			medal_div.appendChild(medalShort_class);
			medal_div.appendChild(medalFull_class);
			diagramsSector_class.parentNode.insertBefore(medal_div, diagramsSector_class.nextSibling);

		// vehicles wrapper
		var vehTable_class = document.getElementsByClassName('t-profile t-profile__vehicle')[0];
			vehicles_div = document.createElement('div');
			vehicles_div.className = "b-vehicles-wrpr";
			vehicles_h3_class = vehTable_class.previousElementSibling;
			vehicles_h3_class.className = "b-profile-ratings_title";
			vehiclesHeader_div = document.createElement('div');
			vehiclesHeader_div.className = "b-vehicles-header";
			vehiclesHeader_div.appendChild(vehicles_h3_class);
			vehiclesHeader_div.innerHTML += "<a class='b-orange-arrow b-profile-ratings_link' target='_blank' href='/encyclopedia/vehicles/'>"+locale.p60.lang+"</a><span class='b-profile-vehicles-tankstat'><a class='b-orange-arrow b-profile-ratings_link b-profile-vehicles-tankstat_link' target='_blank' href='http://www.noobmeter.com/tankStats/"+nm_srv+"'>"+locale.p61.lang+"</a></span>";
			vehicles_div.appendChild(vehiclesHeader_div);
			vehTable_class.parentNode.insertBefore(vehicles_div, vehTable_class);
			vehicles_div.appendChild(vehTable_class);
			// add a premium tanks table to the vehicle table
			if (premArr.length === 0) {
				premHBody = document.createElement('tbody');
				premHBody.innerHTML = "<tr class='t-profile_tankstype t-profile_tankstype-prem t-profile_tankstype__empty'><td width='388' class='t-profile_head'><span class='b-tankstype-ico b-tankstype-ico__prem'></span><span class='b-tankstype-text'>"+locale.p62.lang+" </span></td><td class='t-profile_right'>&ndash;</td><td class='t-profile_center'>&ndash;</td><td class='t-profile_center'>&ndash;</td><td class='t-profile_dropdown-ico'><!-- empty --></td></tr>";
				vehTable_class.appendChild(premHBody);
			}
			else {
				premHBody = document.createElement('tbody');
				premHBody.className = "tablesorter-no-sort";
				premHBody.innerHTML = "<tr class='t-profile_tankstype t-profile_tankstype-prem js-table-dropdown-link'><td width='388' class='t-profile_head'><span class='b-tankstype-ico b-tankstype-ico__prem'></span><span class='b-tankstype-text'>"+locale.p62.lang+" <span class='b-armory-col'>"+premArr.length+"</span></span></td><td class='t-profile_right'>"+filter(premBattlesTotal,3)+"</td><td class='t-profile_center'>"+filter(premWinsTotal,3)+" - "+colStat((premWinsTotal/premBattlesTotal)*100, "winrate", 0, "pct")+"</td><td class='t-profile_center'>"+premBadgesTotal+"</td><td class='t-profile_dropdown-ico'><a title='Show/hide vehicles' class='t-profile_dropdown-link' href=''></a></td></tr>";
				vehTable_class.appendChild(premHBody);
				premTBody = document.createElement('tbody');
				premTBody.className = "sortable";
				premTBody.style.display="none";
				vehTable_class.appendChild(premTBody);
				for (i=0; i<premArr.length; ++i) {
					premTBody.appendChild(premArr[i][0]);
					premTBody.appendChild(premArr[i][1]);
				}
				if (chrome) {
					premHBody.setAttribute("onclick", "chromeFix('prem')");
					premTBody.id = "js-chromeFix-prem";
				}
			}
			// add a tier 10 table to the vehicle table
			if (tenArr.length === 0) {
				tenHBody = document.createElement('tbody');
				tenHBody.innerHTML = "<tr class='t-profile_tankstype t-profile_tankstype__empty'><td width='388' class='t-profile_head'><span class='b-tankstype-ico b-tankstype-ico__ten'>✖</span><span class='b-tankstype-text'>"+locale.p68.lang+" </span></td><td class='t-profile_right'>&ndash;</td><td class='t-profile_center'>&ndash;</td><td class='t-profile_center'>&ndash;</td><td class='t-profile_dropdown-ico'><!-- empty --></td></tr>";
				vehTable_class.appendChild(tenHBody);
			}
			else {
				tenHBody = document.createElement('tbody');
				tenHBody.className = "tablesorter-no-sort";
				tenHBody.innerHTML = "<tr class='t-profile_tankstype js-table-dropdown-link'><td width='388' class='t-profile_head'><span class='b-tankstype-ico b-tankstype-ico__ten'>✖</span><span class='b-tankstype-text'>"+locale.p68.lang+" <span class='b-armory-col'>"+tenArr.length+"</span></span></td><td class='t-profile_right'>"+filter(tenBattlesTotal,3)+"</td><td class='t-profile_center'>"+filter(tenWinsTotal,3)+" - "+colStat((tenWinsTotal/tenBattlesTotal)*100, "winrate", 0, "pct")+"</td><td class='t-profile_center'>"+tenBadgesTotal+"</td><td class='t-profile_dropdown-ico'><a title='Show/hide vehicles' class='t-profile_dropdown-link' href=''></a></td></tr>";
				vehTable_class.appendChild(tenHBody);
				tenTBody = document.createElement('tbody');
				tenTBody.className = "sortable";
				tenTBody.style.display="none";
				vehTable_class.appendChild(tenTBody);
				for (i=0; i<tenArr.length; ++i) {
					tenTBody.appendChild(tenArr[i][0]);
					tenTBody.appendChild(tenArr[i][1]);
				}
				if (chrome) {
					tenHBody.setAttribute("onclick", "chromeFix('ten')");
					tenTBody.id = "js-chromeFix-ten";
				}
			}
		// end vehicles wrapper

		// debugging to browser console
			console.info("Browser Info: ", navigator.appCodeName+" - "+navigator.appName+" - "+navigator.userAgent);
			console.info("WN8 Calculation:");
			console.info("Expected:\n", "eFrag: ", eFrag, "- eDmg: ", eDmg, "- eSpot: ", eSpot, "- eDef: ", eDef, "- eWin: ", eWin);
			console.info("Actual:\n", "aFrag: ", avgFrags, "- aDmg: ", avgDmg, "- aSpot: ", avgSpots, "- aDef: ", avgDef, "- aWin: ", avgWinPct);
			console.info("Weighted:\n", "wFrag: ", wFrag, "- wDmg: ", wDmg, "- wSpot: ", wSpot, "- wDef: ", wDef, "- wWin: ", wWin);
			console.info("Normalized:\n", "nFrag: ", nFrag, "- nDmg: ", nDmg, "- nSpot: ", nSpot, "- nDef: ", nDef, "- nWin: ", nWin);
			console.info("Vehicles per Tier:\n", tiersCount);
			console.info("Battles per Tier:\n", tiersBattle);

		// button for saving stats to clipboard
		var ratingsClipboard = locale.p72.lang+" "+nick+": \n"+locale.p73.lang+" "+battles+" \nWR: "+avgWinPct.toFixed(2)+" \nWN8: "+wn8.rating.toFixed(2)+" \nWN7: "+wn7.rating.toFixed(2)+" \nEff: "+eff.rating.toFixed(2);
			console.info(ratingsClipboard);
			ratingsClipboard_div = document.createElement('div');
			ratingsClipboard_div.className = "ratingsClip";
			profile_div.appendChild(ratingsClipboard_div);
			ratingsClipboard_div.innerHTML += "<div class='ratingsClip-holder js-noobmeter' style='display:none;'>"+ratingsClipboard+"</div><div class='ratingsClip-holder' style='display:none;'>"+locale.p64.lang+"</div><input type='button' value='"+locale.p63.lang+"' onclick='copyClipboard()'>";

		// noobmeter
			if (nm_srv !== null) {
				// retrieve and process pages from noobmeter
				var nmapi_url = nm_host+"/simpleplayerprapi/"+nm_srv+"/"+nick+"/"+userid+"/"+sid;
					gRecProps = [
						{ url: nmapi_url, handler: nmHnd, onerror: nmHnd_error, nav: true }
					];

				// moved so we fetch and process pages after stat tables have been populated
				for (i=0; i<gRecProps.length; ++i) {
					var doc = gRecProps[i];
					if (doc.nav) gRec(doc);
				}
			}
	}
	else {
		profileName_class = document.getElementsByClassName('b-profile-name')[0];
		profileName_class.innerHTML += "<div style='width: 950px; top: -15px; text-align: center; position: absolute;'>"+locale.p65.lang+"</div>";
	}
	// end speed_table_battles
}
// end wg_accounts

// matches url with clan page
else if (wg_clans !== null) {
	// inserting css style into head
	var style = document.createElement('style');
		style.className = "wotstatscript";
		// style variables
		box_background = "background: url('/static/3.13.0.2.1/common/css/scss/layout/img/ui-bg-top.jpg'); border: 1px solid rgba(255, 255, 255, 0.05); box-shadow: 0 0 38px 1px rgba(0, 0, 0, 0.3) inset, 0 0 23px 1px rgba(255, 255, 255, 0.02), 0 0 5px 1px rgba(0, 0, 0, 0.5) inset;";
		input_background = "background: rgba(0, 0, 0, 0.09); border: 1px solid #000000; box-shadow: 0 0 1px 1px rgba(255, 255, 255, 0.15) inset, 0 0 38px 1px rgba(0, 0, 0, 0.3) inset, 0 0 23px 1px rgba(255, 255, 255, 0.02), 0 0 5px 1px rgba(0, 0, 0, 0.5) inset; color: #606061;";
		style.innerHTML
			// global rules
			= "p {margin: 0;}"
			// l-page fix page slowdown
			+ ".l-page {background-position: center 0 !important;}"
			// l-content width
			+ ".l-content-indent, .reg-RUS .l-content-indent, .reg-KR .l-content-indent {padding: 0;}"
			+ ".l-content {margin: 0 22px 25px; width: 955px;}"
			// b-clan-wrapper
			+ ".b-clan-wrapper {overflow: auto;}"
			// b-clan-header rules
			+ ".b-background-clan-profile {left: -22px; top: 0;}"
			+ ".b-background-clan-profile, .b-background-clan-profile img {height: auto; margin-bottom: -2px; width: 1000px;}"
			+ ".b-clan-header {overflow: auto; width: 745px;}"
			+ ".b-scriptlink {"+input_background+" position: absolute; right: 0px; text-align: center; top: -1px; padding: 7px 0 6px; width: 199px;}"
			+ ".reg-KR .b-scriptlink {line-height: 133%;}"
			+ ".b-clan-profile {padding: 15px 0 0;}"
			+ ".b-clan-profile .b-wrap {padding: 0;}"
			+ ".b-clan-victory-points {margin: 5px 20px 0 0;}"
			+ ".b-text-info_motto {font-size: 16px; margin: 0;}"
			// b-clan-desc rules
			+ ".b-clan-desc {float: left; margin: 15px 0 0; min-height: 350px; width: 745px;}"
			// b-clan-stat rules
			+ ".b-clan-stat {border-top: 1px solid #010101; box-shadow: 0 0 1px 1px rgba(255, 255, 255, 0.05) inset; padding: 5px 0 5px;}"
			+ ".b-clan-stat li {padding: 1px 3px 1px 19px;}"
			+ ".b-clan-stat li.b-clan-stat-header {background: url('/static/3.13.0.2.1/common/css/scss/context-menu/img/active-point.png') repeat-y; font-weight: bold; margin: 5px 2px 0; padding: 2px 3px 2px 19px;}"
			// b-clan-buttons rules
			+ ".l-content > form {height: 100%; position: fixed; top: 0;}"
			+ ".b-clan-buttons {bottom: 0; padding: 10px 0; position: absolute; text-align: center; width: 953px;}"
			+ ".b-clan-buttons {"+box_background+"}"
			+ ".b-clan-buttons .b-button {margin-bottom: 0;}"
			// sidebar rules
			+ ".l-sidebar {margin: 0; position: absolute; right: 0; top: 25px; width: auto;}"
			+ ".b-context-menu {background: url("+uri_context_menu+") repeat-y; border-right: 1px solid black; margin: 0; width: 200px;}"
			+ ".b-context-menu_wrapper {padding: 10px 0 0;}"
			+ ".b-context-menu_btn {margin: 10px 0 0;}"
			+ ".b-sidebar-widget {margin: 0; position: absolute; right: -228px; top: -26px; width: 203px;}"
			+ ".b-sidebar-widget h2 { color: #FFFFFF; font: 18px/22px 'WarHeliosCondCBold','Arial Narrow',arial,sans-serif; margin: 0 0 11px; text-transform: uppercase;}"
			// footer rules
			+ ".b-footer, .reg-RUS .b-footer {height: 285px; margin: 0 auto; position: static;}"
			+ ".reg-KR .b-footer {background-size: 100% 100%; height: 360px; margin-top: -2px;}"
			+ "";
		document.head.appendChild(style);
	// end style

	// clan wrapper
	var clanWrpr_div = document.createElement('div');
		clanWrpr_div.className = "b-clan-wrapper",
		background_class = document.getElementsByClassName('b-background-clan-profile')[0];
		background_class.parentNode.insertBefore(clanWrpr_div, background_class.nextSibling);
		clanHead_div = document.createElement('div');
		clanHead_div.className = "b-clan-header",
		clanHead_div.innerHTML += scriptlink;
		infoWrapper_class = document.getElementsByClassName('b-wrap')[0];
		clanHead_div.appendChild(infoWrapper_class);
		clanWrpr_div.appendChild(clanHead_div);

	// clan description
		clanDesc_div = document.getElementsByClassName('b-clan-profile')[0].children[2];
		clanDesc_div.className = "b-clan-desc";
		clanWrpr_div.appendChild(clanDesc_div);

	// move sidebar
	var sidebar_class = document.getElementsByClassName('l-sidebar')[0];
		clanWrpr_div.appendChild(sidebar_class);

	// clan statistic links
	var clan_id = document.location.href.match(/\/(\d+)/)[1];
		clan_name = document.location.href.match(/\-([\w.+\-]+)/)[1];
		sidebar_class = document.getElementsByClassName('b-context-menu_wrapper')[0];
		clanStat_div = document.createElement('ul');
		clanStat_div.className = "b-context-menu-list b-clan-stat",
		wl_clan = nm_clan = mws_clan = wotcs_clan = replays = "";
		if (wl_srv !== null) {
			wl_clan	 = "<li><a target='_blank' href='http://wotlabs.net/"+wl_srv+"/clan/"+clan_name+"'>WoTLabs</a></li>";
		}
		if (nm_srv !== null) {
			nm_clan	= "<li><a target='_blank' href='"+nm_host+"/clan/"+nm_srv+"/"+clan_name+"/"+clan_id+"'>Noobmeter</a></li>";
			wotcs_clan	= "<li><a target='_blank' href='http://wotcs.com/clan.php?wid="+clan_id+"'>WoT-CS</a></li>";
		}
		if (mws_srv !== null) {
			mws_clan = "<li><a target='_blank' href='http://mywotstats.com/clan/view/"+clan_id+"/"+mws_srv+"'>MyWOTStats</a></li>";
		}
		if (wr_srv !== null) {
			replays = "<li><a target='_blank' href='http://wotreplays."+wr_srv+"/clan/"+clan_name+"'>WoTReplays</a></li>";
		}
		clanStat = wl_clan+nm_clan+mws_clan+wotcs_clan+replays;
		clanStat_div.innerHTML = "<li class='b-clan-stat-header'>"+locale.c01.lang+"</li>"+clanStat;
		sidebar_class.appendChild(clanStat_div);
}
// end wg_clans

// helper functions
// filter
function filter(input, type) {
	var a = input.toString();
	switch(type) {
		case (1):
			a = parseFloat(a.replace(/[^\d]/g,""));
			if (isNaN(a)) {return 0;} else {return a;} // string into integer
		case (2):
			return (a.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1 ")); // output with spaces
		case (3):
			return (a.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")); // output with commas
		case (4):
			return (a.replace(/[^\w]/g,"")); // remove all symbols
		default:
			console.log("error filtering: ", input);
			return input;
	}
}

// colouring
function colStat(input, type, dec, pct, alt) {
	color = "";
	output = input.toFixed(dec);
	if (type == "battles") {
		output = filter(input,2);
	}
	if (pct == "pct") {
		output += "%";
	}
	if (alt || alt == "0") {
		input = 100-(input+(alt*100));
	}
	if (type !== "") {
		for (var i=0; i<colStatArr.length; ++i) {
			if (input >= colStatArr[i][type]) {
				var color = colStatArr[i].color;
				break;
			}
		}
	}
	if (type == "wn8") {
		background_div.style.background = "#"+color;
	}
	return "<font color='"+color+"'>"+output+"</font>";
}

// quick insertion of row into tables
function insertNewTr(table_parent, text_td, val_td, val2_td) {
	var trNew = document.createElement('tr');

	var tdNew_text = document.createElement('td');
		tdNew_text.innerHTML = text_td;
		tdNew_text.className = "t-dotted_minor";

	var tdNew_value = document.createElement('td');
		tdNew_value.innerHTML = val_td;
		tdNew_value.className = "t-dotted_value";

		table_parent.appendChild(trNew);
		trNew.appendChild(tdNew_text);
		trNew.appendChild(tdNew_value);

	if (table_parent == mb_table_cn) {
		tdNew_text.className = "t-dotted_class-ico t-dotted_minor__middle";
		tdNew_value.className = "t-dotted_minor t-dotted_minor__middle";
	}

	if (val2_td !== "") {
		var tdNew_value2 = document.createElement('td');
			tdNew_value2.innerHTML = val2_td;
			tdNew_value2.className = "t-dotted_value";
			if (table_parent == mb_table_cn) {
				tdNew_value2.className = "t-dotted_value t-dotted_minor__middle";
			}
		trNew.appendChild(tdNew_value2);
	}

	return trNew;
}
// end helper functions

// clan handler
function clanHnd() {
	var cc_class = document.getElementById('js-clan-block-container');
		cc_classCheckSeq = 0;
		cc_classChecker = setInterval(function() {
			cc_classCheckSeq += 1;
			ci_class = document.getElementById('js-profile-clan');
			if (ci_class !== null) {
			// clan info
				cl_class = ci_class.getElementsByTagName('a')[1];
				clan_id = cl_class.getAttribute('href').match(/\/(\d+)/)[1];
				clan_name = cl_class.getElementsByTagName('span')[0].innerHTML.match(/[\w.+\-]+/)[0];

			// clan statistic links
				wl_clan = nm_clan = wn_clan = mws_clan = wotcs_clan = replays = "";
				if (wl_srv !== null) {
					wl_clan	 = "<td><a target='_blank' href='http://wotlabs.net/"+wl_srv+"/clan/"+clan_name+"'>WoTLabs</a></td>";
				}
				if (nm_srv !== null) {
					nm_clan	= "<td><a target='_blank' href='"+nm_host+"/clan/"+nm_srv+"/"+clan_name+"/"+clan_id+"'>Noobmeter</a></td>";
					wotcs_clan	= "<td><a target='_blank' href='http://wotcs.com/clan.php?wid="+clan_id+"'>WoT-CS</a></td>";
				}
				if (wn_srv !== null) {
					wn_clan = "<td><a target='_blank' href='http://wot-news.com/index.php/stat/clanstat/"+wn_srv+"/"+clan_id+"/'>Wot-news</a></td>";
				}
				if (mws_srv !== null) {
					mws_clan = "<td><a target='_blank' href='http://mywotstats.com/clan/view/"+clan_id+"/"+mws_srv+"'>MyWOTStats</a></td>";
				}
				if (wr_srv !== null) {
					replays = "<td class='statname'>"+locale.p67.lang+"</td><td><a target='_blank' href='http://wotreplays."+wr_srv+"/clan/"+clan_name+"'>WoTReplays</a></td>";
				}
				clanstat = "<tr><td class='statname'>"+locale.p66.lang+"</td>"+wl_clan+nm_clan+wn_clan+"</tr><tr><td></td>"+mws_clan+wotcs_clan+"</tr><tr>"+replays+"</tr>";
				cc_class.innerHTML += "<table>"+clanstat+"</table>";

				profileName_class.parentNode.insertBefore(cc_class, profileName_class.nextSibling);

				clearInterval(cc_classChecker);
			}
			else if (cc_classCheckSeq == 5) {
				clearInterval(cc_classChecker);
			}
		}, 2500);
}

// noobmeter handler
function nmHnd(response) {
	if (response.statusText == "OK") {
		var nmpr = parseFloat(response.responseText);
		if (isNaN(nmpr)) {
			var nm_fmt = "No Rating";
		}
		else {
			var nm_fmt = colStat(nmpr,"nm",2);
		}
		nmHnd_insert(nm_fmt, nmpr);
	}
	else {
		nmHnd_error();
	}
}
function nmHnd_error() {
	nmHnd_insert("No Rating");
	console.log("error retrieving NoobMeter data");
	return null;
}
function nmHnd_insert(nm_fmt, nmpr) {
	ratingsInfo_div = document.getElementsByClassName('js-noobmeter')[1];
	ratingsClip_div = document.getElementsByClassName('js-noobmeter')[0];
	ratingsInfo_div.innerHTML = nm_fmt;
	ratingsClip_div.innerHTML += " NM: "+nmpr.toFixed(2);
}
// end noobmeter handler

// retrieval function
function gRec(doc) {
	var resp;
	GM_xmlhttpRequest({
		method: "GET",
		url: doc.url,
		headers: {
			"Accept": "text/xml"
		},
		onload: function(resp) {
			if (resp.readyState == 4) {
				if (resp.status == 200) {
					doc.handler(resp);
				}
			}
		},
		onerror: function() {
			doc.onerror();
		}
	});
}

// global functions inserted into head
// clipboard helper
function copyClipboard() {
	text = document.getElementsByClassName('ratingsClip-holder')[0].innerHTML;
	locale = document.getElementsByClassName('ratingsClip-holder')[1].innerHTML;
	window.prompt(locale, text);
}

// fix for chrome - shit browser, would not use
function chromeFix(table) {
	$('#js-chromeFix-'+table).toggle();
}
// end global functions
// end script
