// ==UserScript==
// @run-at        document-end
// @name          Ogame expeditions statistics
// @namespace     exp
// @description	  Собирает информацию о результатах экспедиций
// @version       1.3.0
// @updateURL     http://userscripts.org/scripts/source/137024.meta.js
// @installURL    http://userscripts.org/scripts/source/137024.user.js
// @vOGgame       3.0.0|3.1.4|3.2.0|4.0.3|4.1.0
// @author        Demien
// @include       http://uni*.ogame.*/game/index.php?page=showmessage*

// ==/UserScript==

function contentEval(source) {
	source = '(' + source + ')();'
	var script = document.createElement('script');
	script.setAttribute("type", "application/javascript");
	script.textContent = source;
	document.body.appendChild(script);
}

contentEval(function () {
	// Узнаём язык игры
	var lang = getByName("ogame-language");
	// Фразы, ответственные за определение типа результата экспедиции
	var met_name = ['Металл'];
	var cris_name = ['Кристалл'];
	var deit_name = ['Дейтерий'];
	var tm_name = ['Темная Материя'];
	var zver_name = ['зверушки','не стоило всё-таки отмечать день рождения капитана на этой затерянной планете.','Ни единого астероида, ни единого излучения или частички','возвращается обратно с пустыми руками.','экспедиции надо было возвращаться, т.к. были исчерпаны все запасы дейтерия.','пришлось вернуться с пустыми руками.','Зонд был доставлен на борт и многие музеи с Вашей главной планеты уже выразили интерес в его приобретении.','Не стоит говорить, что экспедиция не удалась.','Экспедиционный флот был долго в пути, но приΣс никаких продуктивных результатов.'];
	var fleet_name = ['К флоту присоединились:<br>'];
	var aliens_name = ['с неизвестной расой', 'Неизвестная раса атакует наш'];
	var pirates_name = ['космических пиратов', 'космическими пиратами', 'а от секретной пиратской базы','звёздным пиратам','обороняться от пиратов'];
	var delay_name = ['Халтурно собранный','для расчёта обратного прыжка понадобилось довольно много времени.','обратный путь несколько затянется.'];
	var speed_name = ['Согласно первым сообщениям','экспедиция возвращается несколько раньше','чтобы сократить обратный прыжок - и ему это удалось!'];
	var buyer_name = ['с товарами на обмен'];
	var pipec_name = ['От экспедиции осталось только следующее сообщение','Экспедиционный флот не вернулся из прыжка'];
	var fake_message_text = ['сообщает Вам следующее']; // Don't use
	var strPattrFleet = 'К флоту присоединились:<br>';
	var alienAggressor = 'Чужие';
	var piratesAggressor = 'Пираты';
	var strPattrMsgExpSubj = 'Результат экспедиции';
	var strPattrMsgWarSubj = 'Боевой доклад';
	var spyWarn = 'Обнаружены следы присутствия других экспедиционных флотов';
	// Просто текст на странице
	var spyWarnSovet = 'В этой солнечной системе исчерпан лимит экспедиций, рекомендуем изменить место.';
	var alertEraseConfMsg = 'Вы уверены что хотите стереть информацию о всех результатах экспедиций?';
	var alertEraseConfMsgOk = 'Вся информация о результатах экспедиций была удалена';
	var expHeaderText = 'Статистика экспедиций';
	var expResHeaderText = 'РЕСУРСЫ';
	var expFleetHeaderText = 'ФЛОТ';
	var expOtherHeaderText = 'РАЗНОЕ';
	var metInFleetText = 'Металл во флоте';
	var crisInFleetText = 'Кристалл во флоте';
	var deitInFleetText = 'Дейтерий во флоте';
	var allExpCountText = 'Всего экспедиций';
	var zverText = 'Болотных жителей';
	var delayName = 'Задержка';
	var speedName = 'Ускорение';
	var traderName = 'Скупщик';
	var pipecName = 'Полный пэ';
	var showOutText = 'показать за';
	var showAllTimeText = 'всё время';
	var showLastMonthText = 'последний месяц';
	var showLastWeekext = 'последняя неделя';
	var showTodayText = 'сутки';
	var clearDataTitle = 'Очищает всю статистику экспедиций';
	var clearDataText = 'очистить';
	var lossesText = 'потери';
	var fl_mt = 'Малый транспорт';
	var fl_bt = 'Большой транспорт';
	var fl_li = 'Лёгкий истребитель';
	var fl_ti = 'Тяжёлый истребитель';
	var fl_cr = 'Крейсер';
	var fl_link = 'Линкор';
	var fl_shz = 'Шпионский зонд';
	var fl_bomb = 'Бомбардировщик';
	var fl_unic = 'Уничтожитель';
	var fl_lin_cr = 'Линейный крейсер';
	var ExpDeskr = '';
	var ExpDeskrZver = 'Это пустышка';
	var ExpDeskrDelay = 'Экспа задержалась';

	// Устанавливаем язык вселенной
	setExpLanguage();

	// Стоимость флота
	var fleetParams = {};
	fleetParams[fl_mt] = {
		'met':2000,
		'cris':2000
	};
	fleetParams[fl_bt] = {
		'met':6000,
		'cris':6000
	};
	fleetParams[fl_li] = {
		'met':3000,
		'cris':1000
	};
	fleetParams[fl_ti] = {
		'met':6000,
		'cris':4000
	};
	fleetParams[fl_cr] = {
		'met':20000,
		'cris':7000,
		'deit':2000
	};
	fleetParams[fl_link] = {
		'met':45000,
		'cris':15000
	};
	fleetParams[fl_shz] = {
		'cris':1000
	};
	fleetParams[fl_bomb] = {
		'met':50000,
		'cris':25000,
		'deit':15000
	};
	fleetParams[fl_unic] = {
		'met':60000,
		'cris':50000,
		'deit':15000
	};
	fleetParams[fl_lin_cr] = {
		'met':30000,
		'cris':40000,
		'deit':15000
	};

	// Возвращает значение(value) элемента с name="<nam>"
	function getByName(nam) {
		var d=document.getElementsByName(nam)[0];
		if(d) return d.content;
		return undefined;
	}

	// Префикс для имени сохранения в локальном хранилище
	var prefix = 'exp_' + getByName("ogame-universe") +"_"+ getByName("ogame-player-id");

	if (typeof GM_getValue === 'undefined') {
		GM_getValue = function(key, defaultValue) {
			var retValue = localStorage.getItem(key);
			if (!retValue) {
				retValue = defaultValue;
			}
			return retValue;
		}
	}
	if (typeof GM_setValue === 'undefined') {
		GM_setValue = function(key, value) {
			localStorage.setItem(key, value);
		}
	}
	if (typeof GM_deleteValue === 'undefined') {
		GM_deleteValue = function(key) {
			localStorage.removeItem(key);
		}
	}

	if (typeof GM_addStyle == 'undefined') {
		GM_addStyle = function (css) {
			var head = document.getElementsByTagName('head')[0];
			if (head) {
				var style = document.createElement("style");
				style.type = "text/css";
				style.appendChild(document.createTextNode(css));
				head.appendChild(style);
			}
		}
	}

	// Если язык отличается от Русского - меняем значения переменных
	function setExpLanguage() {
		switch (lang) {
			case 'en': // English
			case 'us': // American
				met_name = ['Metal'];
				cris_name = ['Crystal'];
				deit_name = ['Deuterium'];
				tm_name = ['Dark Matter'];
				fleet_name = ['The following ships are now part of the fleet:<br>'];
				zver_name = ['small pets', 'empty handed', 'neutron stars gravitation field', 'fly in circles', 'an old probe', 'class 5 anomalies', 'emptiness of space', 'without having accomplished its goal','A living being made out of pure energy came aboard and induced all','Nothing new could be obtained from the expedition, but at least there is'];
				aliens_name = ['unknown species', 'unknown ships', 'exotic looking ships'];
				pirates_name = ['Some really desperate space pirates', 'expedition had an unpleasant', 'from a secret pirate base', 'some pirates'];
				delay_name = ['Your navigator made a grave error', 'return later than expected', 'longer than expected'];
				speed_name = ['coupling in the energy spools', 'some solar wind', 'shorten the flight back'];				
                                buyer_name = ['expedition fleet made contact with a friendly alien race','A mega cargo vessel was caught by a powerful gravitation field generated by a planetoid'];
				pipec_name = ['expedition was the following radio transmission'];
				fake_message_text = ['сообщает Вам следующее']; // Don't use
				strPattrFleet = 'The following ships are now part of the fleet:<br>';
				alienAggressor = 'Aliens';
				piratesAggressor = 'Pirates';
				strPattrMsgExpSubj = 'Expedition Result';
				strPattrMsgWarSubj = 'Combat Report';
				spyWarn = 'Обнаружены следы присутствия других экспедиционных флотов';
				// Plain text
				spyWarnSovet = 'In this solar system has been exhausted the limit of expeditions, it is recommended to change the location.';
				alertEraseConfMsg = 'Are you sure you want to erase all information on the results of the expedition?';
				alertEraseConfMsgOk = 'All information on the results of the expeditions was removed';
				expHeaderText = 'Expeditions statistics';
				expResHeaderText = 'RESOURCES';
				expFleetHeaderText = 'FLEET';
				expOtherHeaderText = 'OTHER';
				metInFleetText = 'Metal in fleet';
				crisInFleetText = 'Crystal in fleet';
				deitInFleetText = 'Deuterium in fleet';
				allExpCountText = 'Total expeditions';
				zverText = 'Animals';
				delayName = 'Delay';
				speedName = 'Acceleration';
				traderName = 'Merchant';
				pipecName = 'Loss all fleet';
				showOutText = 'show for';
				showAllTimeText = 'all time';
				showLastMonthText = 'last month';
				showLastWeekext = 'last week';
				showTodayText = 'one day';
				clearDataTitle = 'Clears all statistics data';
				clearDataText = 'clear';
				lossesText = 'losses';
				// Fleets
				fl_mt = 'Small Cargo';
				fl_bt = 'Large Cargo';
				fl_li = 'Light Fighter';
				fl_ti = 'Heavy Fighter';
				fl_cr = 'Cruiser';
				fl_link = 'Battleship';
				fl_shz = 'Espionage Probe';
				fl_bomb = 'Bomber';
				fl_unic = 'Destroyer';
				fl_lin_cr = 'Battlecruiser';
				ExpDeskrZver = 'You find nothing';
				ExpDeskrDelay = 'Exp will be late';
				break;
			case 'fr': // Français
				met_name = ['Métal'];
				cris_name = ['Cristal'];
				deit_name = ['Deutérium'];
				tm_name = ['Antimatière'];
				zver_name = ['Mis à part quelques petits animaux'];
				fleet_name = ['vaisseaux qui s`y sont joints :<br>'];
				aliens_name = ['La flotte d`expédition a eu', 'Une espèce inconnue attaque', 'Votre mission d`expédition a rencontré'];
				pirates_name = ['pirates'];
				delay_name = ['Une erreur de calcul de votre officier'];
				speed_name = ['Un petit défaut dans les réacteurs de'];
				buyer_name = ['Votre expédition a eu un bref contac'];
				pipec_name = ['expedition was the following radio transmission']; // Заменить
				fake_message_text = ['сообщает Вам следующее']; // Don't use
				strPattrFleet = 'vaisseaux qui s`y sont joints :<br>';
				alienAggressor = 'Aliens';
				piratesAggressor = 'Pirates';
				strPattrMsgExpSubj = 'Résultat de l`expédition';
				strPattrMsgWarSubj = 'Rapport de combat ';
				spyWarn = 'Nous avons découvert des signes indiquant la présence d`autres flottes d`expédition dans ce secteur';
				// Plain text
				spyWarnSovet = "Dans ce système solaire a été épuisé le délai d'expéditions, il est recommandé de changer l'emplacement.";
				alertEraseConfMsg = "Etes-vous sûr de vouloir effacer toutes les informations sur les résultats de l'expédition?";
				alertEraseConfMsgOk = 'Toutes les informations sur les résultats des expéditions a été retiré';
				expHeaderText = 'Expéditions Statistiques';
				expResHeaderText = 'RESSOURCES';
				expFleetHeaderText = 'FLOTTE';
				expOtherHeaderText = 'DIVERS';
				metInFleetText = 'Métal';
				crisInFleetText = 'Le cristal';
				deitInFleetText = 'Deutérium';
				allExpCountText = 'Total des expéditions';
				zverText = 'Animaux';
				delayName = 'Retarder';
				speedName = 'Accélération';
				traderName = 'Acheteur-up';
				pipecName = "La perte de toute l'expédition";
				showOutText = 'show pour';
				showAllTimeText = 'tout le temps';
				showLastMonthText = 'mois dernier';
				showLastWeekext = 'la semaine dernière';
				showTodayText = "les jours";
				clearDataTitle = 'Efface toutes les statistiques sur les expéditions';
				clearDataText = 'nettoyer';
				lossesText = 'pertes';
				// Fleets
				fl_mt = 'Petit transporteur';
				fl_bt = 'Grand transporteur';
				fl_li = 'Chasseur léger';
				fl_ti = 'Chasseur lourd';
				fl_cr = 'Croiseur';
				fl_link = 'Vaisseau de bataille';
				fl_shz = 'Sonde espionnage';
				fl_bomb = 'Bombardier';
				fl_unic = 'Destructeur';
				fl_lin_cr = 'Traqueur';
				break;
			case 'de': // Deutsch
				met_name = ['Metall'];
				cris_name = ['Kristall'];
				deit_name = ['Deuterium'];
				tm_name = ['Dark Matter'];
				zver_name = ['Tierchen von einem unbekannten'];
				fleet_name = ['The following ships are now part of the fleet:<br>'];
				aliens_name = ['Deine Expeditionsflotte hatte', 'Eine unbekannte Spezies greift', 'Deine Expedition ist in eine'];
				pirates_name = ['Ein paar anscheinend sehr', 'Deine Expeditionsflotte hatte', 'Die aufgefangenen Signale stammten'];
				delay_name = ['Ein böser Patzer des Navigators'];
				speed_name = ['Eine unvorhergesehene Rückkopplung'];
				buyer_name = ['Deine Expeditionsflotte hatte kurzen Kontakt'];
				pipec_name = ['Von der Expedition ist nur noch folgende'];
				fake_message_text = ['сообщает Вам следующее']; // Don't use
				strPattrFleet = 'The following ships are now part of the fleet:<br>';
				alienAggressor = 'Aliens';
				piratesAggressor = 'Pirates';
				strPattrMsgExpSubj = 'Expedition Result';
				strPattrMsgWarSubj = 'Combat Report';
				spyWarn = 'Обнаружены следы присутствия других экспедиционных флотов';
				// Plain text
				spyWarnSovet = 'In diesem Sonnensystem hat die Grenze des Expeditionen ausgeschöpft sind, wird empfohlen, um die Position zu ändern.';
				alertEraseConfMsg = 'Sind Sie sicher, dass Sie alle Informationen über die Ergebnisse der Expedition zu löschen?';
				alertEraseConfMsgOk = 'Alle Informationen über die Ergebnisse der Expeditionen wurde entfernt';
				expHeaderText = 'Statistik Expeditionen';
				expResHeaderText = 'RESSOURCEN';
				expFleetHeaderText = 'FLEET';
				expOtherHeaderText = 'SONSTIGES';
				metInFleetText = 'Metall in der fleet';
				crisInFleetText = 'Kristall in der fleet';
				deitInFleetText = 'Deuterium in der fleet';
				allExpCountText = 'Insgesamt Expeditionen';
				zverText = 'Tier';
				delayName = 'Verzögern';
				speedName = 'Beschleunigung';
				traderName = 'Käufer-up';
				pipecName = 'Der Verlust der gesamten Expedition';
				showOutText = 'zeigen Sie für';
				showAllTimeText = 'die ganze Zeit';
				showLastMonthText = 'im letzten Monat';
				showLastWeekext = 'letzte Woche';
				showTodayText = 'die Tage';
				clearDataTitle = 'Löscht alle Statistiken über Expeditionen';
				clearDataText = 'Löscht alle Statistiken über Expeditionen';
				lossesText = 'verlust';
				// Fleets
				fl_mt = 'Kleiner Transporter';
				fl_bt = 'Großer Transporter';
				fl_li = 'Leichter Jäger';
				fl_ti = 'Schwerer Jäger';
				fl_cr = 'Kreuzer';
				fl_link = 'Schlachtschiff';
				fl_shz = 'Spionagesonde';
				fl_bomb = 'Bomber';
				fl_unic = 'Zerstörer';
				fl_lin_cr = 'Schlachtkreuzer';
				break;
			case 'pl': // Polish - Polski v.0.01b
				met_name = ['Metal'];
				cris_name = ['Kryształ'];
				deit_name = ['Deuter'];
				tm_name = ['Antymateria'];
				zver_name = ['Poza osobliwymi małymi zwierzętami pochodzącymi z nieznanej bagiennej planety'];
				fleet_name = ['Następujące statki dołączyły do floty:<br>'];
				aliens_name = ['Twoja ekspedycja napotkała niezbyt przyjazną rasę', 'Nieznani obcy atakują Twoją ekspedycję', 'Votre mission d`expédition a rencontré'];
				pirates_name = ['Jacyś bardzo zdesperowani piraci próbowali przejąć flotę ekspedycji', 'Ekspedycja miała niemiłe spotkanie ze statkami piratów', 'z tajnej bazy piratów'];
				delay_name = ['Główny nawigator miał zły dzień'];
				speed_name = ['Niespodziewane sprzężenie zwrotne w zwojach energetycznych silników'];
				buyer_name = ['Flota ekspedycyjna nawiązała kontakt z płochliwym gatunkiem obcych'];
				pipec_name = ['Po naszej ekspedycji pozostała jedynie transmisja radiowa'];
				fake_message_text = ['Informuje o następujących']; // Don't use
				strPattrFleet = 'Następujące statki dołączyły do floty:<br>';
				alienAggressor = 'Obcy';
				piratesAggressor = 'Piraci';
				strPattrMsgExpSubj = 'Wynik ekspedycji';
				strPattrMsgWarSubj = 'Raport wojenny';
				spyWarn = 'Nous avons découvert des signes indiquant la présence d`autres flottes d`expédition dans ce secteur';
				// Plain text
				spyWarnSovet = "Dans ce système solaire a été épuisé le délai d'expéditions, il est recommandé de changer l'emplacement.";
				alertEraseConfMsg = "Czy napewno chcesz usunąć wszystkie informacje o ekspedycjach?";
				alertEraseConfMsgOk = 'Wszystkie informacje dotyczące wyników ekspedycji został usunięte';
				expHeaderText = 'Statystyka ekspedycji';
				expResHeaderText = 'SUROWCE';
				expFleetHeaderText = 'FLOTA';
				expOtherHeaderText = 'INNE';
				metInFleetText = 'Metal we flocie';
				crisInFleetText = 'Kryształ we flocie';
				deitInFleetText = 'Deuter we flocie';
				allExpCountText = 'Ilość ekspedycji';
				zverText = 'Zwierzęta';
				delayName = 'Opóźnienie';
				speedName = 'Sprzężenie';
				traderName = 'Kupiec';
				pipecName = "Utracone floty";
				showOutText = 'pokaż';
				showAllTimeText = 'wszystkie';
				showLastMonthText = 'ostatni miesiąc';
				showLastWeekext = 'ostatni tydzień';
				showTodayText = "dzień";
				clearDataTitle = 'Usuwa wszystkie statystyki ekspedycji';
				clearDataText = 'czyść';
				lossesText = 'stracono';
				// Fleets
				fl_mt = 'Mały transporter';
				fl_bt = 'Duży transporter';
				fl_li = 'Lekki myśliwiec';
				fl_ti = 'Ciężki myśliwiec';
				fl_cr = 'Krążownik';
				fl_link = 'Okręt wojenny';
				fl_shz = 'Sonda szpiegowska';
				fl_bomb = 'Bombowiec';
				fl_unic = 'Niszczyciel';
				fl_lin_cr = 'Pancernik';
				break;
			case 'es': // Español
				met_name = ['Metal'];
				cris_name = ['Cristal'];
				deit_name = ['Deuterio'];
				tm_name = ['Materia Oscura'];
				zver_name = ['pequeños animales de compañía de un desconocido planeta'];
				fleet_name = ['Las siguientes naves son ahora parte de la flota:<br/>'];
				aliens_name = ['especie desconocida'];
				pirates_name = ['Algunos piratas realmente desesperados', 'expedición no tuvo un contacto amigable'];
				delay_name = ['Un pequeño fallo del navegador'];
				speed_name = ['Un inesperado acoplamiento de energía en los motores'];
				buyer_name = ['expedition fleet made contact with a friendly alien race']; // not correct
				pipec_name = ['expedition was the following radio transmission']; // not correct
				fake_message_text = ['сообщает Вам следующее'];  // don't use
				strPattrFleet = 'Las siguientes naves son ahora parte de la flota:<br/>';
				alienAggressor = 'Aliens';
				piratesAggressor = 'Piratas';
				strPattrMsgExpSubj = 'Resultado de la expedición';
				strPattrMsgWarSubj = 'Informe de batalla';
				spyWarn = 'Encontramos indicios sobre la presencia de otras flotas de expedición'; // not correct
				// Plain text
				spyWarnSovet = 'Este sistema solar esta AGOTADO por favor cambie de sistema';
				alertEraseConfMsg = 'De verdad quieres borrar la informacion sangron?';
				alertEraseConfMsgOk = 'Has borrado todas las estadisticas almancenadas By ELPATRON';
				expHeaderText = 'Estadísticas de expedición';
				expResHeaderText = 'RECURSOS';
				expFleetHeaderText = 'FLOTA ENCONTRADA';
				expOtherHeaderText = 'Estadísticas';
				metInFleetText = 'Metal en la flota';
				crisInFleetText = 'Cristal en la flota';
				deitInFleetText = 'Deuterio en la flota';
				allExpCountText = 'Total expedicioness';
				zverText = 'Animalitos Cutres';
				delayName = 'Retrazos';
				speedName = 'Aceleración';
				traderName = 'Mercaderes';
				pipecName = 'Perdida total flota';
				showOutText = 'Mostrar por';
				showAllTimeText = 'Historial';
				showLastMonthText = 'Mes pasado';
				showLastWeekext = 'Semana pasada';
				showTodayText = 'hoy';
				clearDataTitle = 'Borrar todas las estadísticas';
				clearDataText = 'Borrar';
				lossesText = 'perdidas';
				// Fleets
				fl_mt = 'Nave pequeña de carga';
				fl_bt = 'Nave grande de carga';
				fl_li = 'Cazador ligero';
				fl_ti = 'Cazador pesado';
				fl_cr = 'Crucero';
				fl_link = 'Nave de batalla';
				fl_shz = 'Sonda de espionaje';
				fl_bomb = 'Bombardero';
				fl_unic = 'Destructor';
				fl_lin_cr = 'Acorazado';
				break;
			default:
				break;
		}
	}

	// Форматирует числовую строку в требуемый формат
	function number_format(number, decimals, dec_point, thousands_sep) {	// Format a number with grouped thousands
		//
		// +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
		// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		// +	 bugfix by: Michael White (http://crestidg.com)

		var i, j, kw, kd, km;

		// input sanitation & defaults
		if( isNaN(decimals = Math.abs(decimals)) ){
			decimals = 2;
		}
		if( dec_point == undefined ){
			dec_point = ",";
		}
		if( thousands_sep == undefined ){
			thousands_sep = ".";
		}

		i = parseInt(number = (+number || 0).toFixed(decimals)) + "";

		if( (j = i.length) > 3 ){
			j = j % 3;
		} else{
			j = 0;
		}

		km = (j ? i.substr(0, j) + thousands_sep : "");
		kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_sep);
		//kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).slice(2) : "");
		kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).replace(/-/, 0).slice(2) : "");


		return km + kw + kd;
	}

	// Парсит GET параметры страницы(для получения ID сообщения)
	function parseGetParams() {
		var $_GET = {};
		var __GET = window.location.search.substring(1).split("&");
		for(var i=0; i<__GET.length; i++) {
			var getVar = __GET[i].split("=");
			$_GET[getVar[0]] = typeof(getVar[1])=="undefined" ? "" : getVar[1];
		}
		return $_GET;
	}

	// Перезаписываем все логи экспедиций в браузере
	function saveLogs(Logs) {
		var str = JSON.stringify(Logs);
		GM_setValue(prefix + "logs", str);
	}

	// Возвращает все логи экспедиций, сохранённых в браузере
	function getLogs() {
		var Logs = GM_getValue(prefix + "logs", null);
		if (Logs === null) {
			Logs = [];
		} else {
			Logs = JSON.parse(Logs);
		}

		return Logs;
	}

	// Возвращает все данные о потерях в экспедициях, сохранённых в браузере
	function getFleetLoss() {
		var losses = GM_getValue(prefix + "losses", null);
		if (losses === null) {
			losses = [];
		} else {
			losses = JSON.parse(losses);
		}

		return losses;
	}

	// Перезаписывает данных о потерях в экспедициях
	function saveFleetLoss(losses) {
		var str = JSON.stringify(losses);
		GM_setValue(prefix + "losses", str);
	}

	// Возвращает количество миллисекунд от даты сообщения
	function getMsgTime() {
		var msgDateTime;
		var msgRow = $('#messagebox .infohead table tr:eq(3) td');
		// Проверяем, изменят ли дату Antigame
		var original = $(msgRow).attr('original')
		if (original)
			msgDateTime = original.split(' ');
		else
			msgDateTime = $(msgRow).text().split(' ');

		var date_part = msgDateTime[0].split('.');
		var time_part = msgDateTime[1].split(':');

		var msg_year = (parseFloat(date_part[2]));
		var msg_month = (parseFloat(date_part[1]));
		var msg_day = (parseFloat(date_part[0]));
		var msg_hour = (parseFloat(time_part[0]));
		var msg_min = (parseFloat(time_part[1]));
		var msg_sec = (parseFloat(time_part[2]));

		var dt = new Date(msg_year, msg_month-1, msg_day, msg_hour, msg_min, msg_sec, 0);
		return dt;
	}

	// Возвращает стоимость найденных кораблей определённого типа
	function getFleetCost(flName, flCount) {
		var met = 0;
		var cris = 0;
		var deit = 0;

		flCount = parseFloat(flCount);

		if (fleetParams[flName]) {
			if (fleetParams[flName].met)
				met = fleetParams[flName].met * flCount;
			if (fleetParams[flName].cris)
				cris = fleetParams[flName].cris * flCount;
			if (fleetParams[flName].deit)
				deit = fleetParams[flName].deit * flCount;
		}

		return {
			'met':met,
			'cris':cris,
			'deit':deit
		};

	}

	// Сортируем список флотов по убыванию
	function fleetSort(sourseFl) {
		var all = 0;
		var newList = {};
		var fleetNames = [fl_shz,fl_mt,fl_bt,fl_li,fl_ti,fl_cr,fl_link,fl_lin_cr,fl_bomb,fl_unic];
		fleetNames.reverse();
		for (var i = 0; i < fleetNames.length; i++)
			if (sourseFl[fleetNames[i]]) {
				all++;
				newList[fleetNames[i]] = sourseFl[fleetNames[i]];
			}

		return all>0?newList:sourseFl;
	}

	// Проверяет, существует ли хотя бы одна из фраз из arr_match в text
	function checkExpType(text, arr_match) {
		text = text.toLowerCase();
		for (var i=0; i < arr_match.length; i++) {
			if (text.toLowerCase().indexOf(arr_match[i].toLowerCase())!=-1)
				return true;
		}

		return false;
	}

	// Отображает информацию о статистике экспедиций
	function renderInfo(logs) {
		var met = 0; // Количество металла
		var cris = 0; // Количество кристалла
		var deit = 0; // КОличество дейтерия
		var tm = 0; // Количество тёмной материи
		var zver = 0; // Количество болотных жителей
		var aliens = 0; // Количество контактов с чужими
		var pirates = 0; // Количество пиратских атак
		var delay = 0; // Количество раз, когда флот задерживался
		var speed = 0; // Количество раз, когда флот ускорялся
		var buyer = 0; // Скупщик
		var pipec = 0; // Сколько раз флот пропадал полностью
		var fleet = {}; // Массив объектов найденных флотов
		var expCount = 0; // Общее количество показаных экспедиций
		var dateLimit; // Временное ограничение статистики
		var metInFleet = 0; // Металла в найденных флотах
		var crisInFleet = 0; // Кристалла в найденных флотах
		var deitInFleet = 0; // Дейтерия в найденных флотах
		var lostFromAliens = 0; // Потерь от Чужих
		var lostFromPirates = 0; // Потерь от Пиратов

		// Получаем сохранённый ранее временой диапазон статистики
		var DateRange = GM_getValue(prefix + "date_range", null);
		if (DateRange === null) {
			GM_setValue(prefix + "date_range", 0);
			DateRange = 0;
		}

		// Высчитываем временной диапазон
		if (DateRange>0) {
			var curDate = parseFloat(getByName("ogame-timestamp")) * 1000;
			dateLimit = curDate - DateRange;
		}

		// Считываем все потери флота от пиратов и чужих
		var allLosses = getFleetLoss();
		if (allLosses.length>0)
			for (var ls = 0; ls < allLosses.length;  ls++) {
				// Проверяем чтобы дата была в указанном диапазоне
				if ((allLosses[ls].date<dateLimit))
					continue; // Переходим к следующему результату
				else {
					if (allLosses[ls].aggressor=='aliens')
						lostFromAliens = lostFromAliens + allLosses[ls].losses;
					else if (allLosses[ls].aggressor=='pirates')
						lostFromPirates = lostFromPirates + allLosses[ls].losses;
				}
			}

		// Если имеется одно и более учтённое сообщение результата экспедиции
		if (logs.length>0) {
			// Перебираем все результаты экспедиций
			for (var i = 0; i < logs.length;  i++) {
				// Проверяем чтобы дата была в указанном диапазоне
				if ((logs[i].date<dateLimit)) {
					logs[i].mType = 'ignore';
					continue; // Переходим к следующему результату
				}

				if (logs[i].mType=='met')
					met = met+logs[i].cost;
				else if (logs[i].mType=='cris')
					cris = cris+logs[i].cost;
				else if (logs[i].mType=='deit')
					deit = deit+logs[i].cost;
				else if (logs[i].mType=='tm')
					tm = tm+logs[i].cost;
				else if (logs[i].mType=='zver')
					zver = zver+1;
				else if (logs[i].mType=='aliens')
					aliens = aliens+1;
				else if (logs[i].mType=='pirates')
					pirates = pirates+1;
				else if (logs[i].mType=='delay')
					delay = delay+1;
				else if (logs[i].mType=='speed')
					speed = speed+1;
				else if (logs[i].mType=='buyer')
					buyer = buyer+1;
				else if (logs[i].mType=='pipec')
					pipec = pipec+1;
				else if (logs[i].mType=='fleet') {
					// Перебираем все найденные корабли,
					// записываем их как массив объектов типов кораблей
					for (var fl = 0; fl < logs[i].fleet.length; fl++) {
						var param = logs[i].fleet[fl].name;
						var count = logs[i].fleet[fl].count;
						if (!fleet[param])
							fleet[param] = 0;
						fleet[param] = fleet[param] + count;
						// Узнаём стоимость найденного типа флота
						var flCost = getFleetCost(param, count);
						if (flCost.met>0)
							metInFleet = metInFleet + flCost.met;
						if (flCost.cris>0)
							crisInFleet = crisInFleet + flCost.cris;
						if (flCost.deit>0)
							deitInFleet = deitInFleet + flCost.deit;
					}
				} else
					expCount--;

				expCount++;

			}
		}

		var messageBox = $('#messagebox .textWrapper div.note');

		var appendText = '<div class="expeditions_statistica">'
		+'<table><th colspan="2" style="text-align: left;">'+ExpDeskr+'</th></table>'
		+'<table><th colspan="2" style="text-align: center;">'+expHeaderText+'</th>'
		+'<tr><td class="exp_res_head" colspan="2">'+expResHeaderText+'</td></tr>'
		+'<tr class="exp_res_row"><td class="exp_left_cols">'+met_name+':</td><td>' +number_format(met, 0, ',', '.')+ '</td></tr>'
		+'<tr class="exp_res_row"><td class="exp_left_cols">'+cris_name+':</td><td>' +number_format(cris, 0, ',', '.')+ '</td></tr>'
		+'<tr class="exp_res_row"><td class="exp_left_cols">'+deit_name+':</td><td>' +number_format(deit, 0, ',', '.')+ '</td></tr>'
		+'<tr class="exp_res_row"><td class="exp_left_cols">'+tm_name+':</td><td>' +number_format(tm, 0, ',', '.')+ '</td></tr>'
		+'<tr><td class="exp_fleet_head" colspan="2">'+expFleetHeaderText+'</td></tr>';

		// Выводим стоимость найденных флотов
		if (crisInFleet>0) {
			appendText = appendText
			+ '<tr class="exp_fleet_row"><td class="exp_left_cols">'+metInFleetText+':</td><td>' + number_format(metInFleet, 0, ',', '.')+ '</td></tr>'
			+ '<tr class="exp_fleet_row"><td class="exp_left_cols">'+crisInFleetText+':</td><td>' + number_format(crisInFleet, 0, ',', '.')+ '</td></tr>';
			if (deitInFleet>0)
				appendText = appendText + '<tr class="exp_fleet_row"><td class="exp_left_cols">'+deitInFleetText+':</td><td>' + number_format(deitInFleet, 0, ',', '.')+ '</td></tr>';
		}
		// Перебираем все найденные типы кораблей
		fleet = fleetSort(fleet);
		for(var p in fleet) {
			appendText = appendText + '<tr class="exp_fleet_row"><td class="exp_left_cols">'+p+':</td><td>' + number_format(fleet[p], 0, ',', '.')+ '</td></tr>';
		}

		appendText = appendText + '<tr><td class="exp_other_head" colspan="2">'+expOtherHeaderText+'</td></tr>'
		+'<tr class="exp_other_row"><td class="exp_left_cols">'+allExpCountText+':</td><td>' +number_format(expCount, 0, ',', '.')+ '</td></tr>'
		+'<tr class="exp_other_row"><td class="exp_left_cols">'+zverText+':</td><td>' +number_format(zver, 0, ',', '.')+ '</td></tr>'
		+'<tr class="exp_other_row"><td class="exp_left_cols">'+alienAggressor+':</td><td>' +number_format(aliens, 0, ',', '.')+ '; '+lossesText+' ['+number_format(lostFromAliens, 0, ',', '.')+']</td></tr>'
		+'<tr class="exp_other_row"><td class="exp_left_cols">'+piratesAggressor+':</td><td>' +number_format(pirates, 0, ',', '.')+ '; '+lossesText+' ['+number_format(lostFromPirates, 0, ',', '.')+']</td></tr>'
		+'<tr class="exp_other_row"><td class="exp_left_cols">'+delayName+':</td><td>' +number_format(delay, 0, ',', '.')+ '</td></tr>'
		+'<tr class="exp_other_row"><td class="exp_left_cols">'+speedName+':</td><td>' +number_format(speed, 0, ',', '.')+ '</td></tr>'
		+'<tr class="exp_other_row"><td class="exp_left_cols">'+traderName+':</td><td>' +number_format(buyer, 0, ',', '.')+ '</td></tr>'
		+'<tr class="exp_other_row"><td class="exp_left_cols">'+pipecName+':</td><td>' +number_format(pipec, 0, ',', '.')+ '</td></tr>';

		GM_addStyle(
			".expeditions_statistica { width: 300px; margin: 21px auto; }"+
			".expeditions_statistica .exp_left_cols { text-align:right; padding-right:10px; width: 142px; }"+
			".expeditions_statistica .exp_res_head { text-align:center; border: 1px solid green; cursor: pointer; width: 300px; background: url('http://gf1.geo.gfsrv.net/cdn71/fc7a8ede3499a0b19ea17613ff0cb1.gif') no-repeat scroll 270px -19px transparent;}"+
			".expeditions_statistica .exp_other_head { text-align:center; border: 1px solid blue; cursor: pointer; width: 300px; background: url('http://gf1.geo.gfsrv.net/cdn71/fc7a8ede3499a0b19ea17613ff0cb1.gif') no-repeat scroll 270px -19px transparent;}"+
			".expeditions_statistica .exp_fleet_head { text-align:center; border: 1px solid red; cursor: pointer; width: 300px; background: url('http://gf1.geo.gfsrv.net/cdn71/fc7a8ede3499a0b19ea17613ff0cb1.gif') no-repeat scroll 270px -19px transparent;}"
			);

		var selected = ' selected="selected"';

		appendText = appendText + '</table>'+showOutText+': '
		+'<select id="exp_date_range" name="exp_select_date_range">'
		+'<option value="'+0+'"'+(DateRange==0?selected:'')+'>'+showAllTimeText+'</option>'
		+'<option value="'+2580000000+'"'+(DateRange==2580000000?selected:'')+'>'+showLastMonthText+'</option>'
		+'<option value="'+602000000+'"'+(DateRange==602000000?selected:'')+'>'+showLastWeekext+'</option>'
		+'<option value="'+86000000+'"'+(DateRange==86000000?selected:'')+'>'+showTodayText+'</option>'
		+'</select> <a href="#" class="exp_erase" title="'+clearDataTitle+'">'+clearDataText+'</a>';

		appendText = appendText + '</div>';

		messageBox.append(appendText);

		var resState = GM_getValue(prefix + "res_show");
		var fleetState = GM_getValue(prefix + "fleet_show");
		var otherState = GM_getValue(prefix + "other_show");

		if (resState==0) {
			$('.exp_res_head').css('background-position','270px 0');
			$('.exp_res_row').css('display', 'none');
		}
		if (fleetState==0) {
			$('.exp_fleet_head').css('background-position','270px 0');
			$('.exp_fleet_row').css('display', 'none');
		}
		if (otherState==0) {
			$('.exp_other_head').css('background-position','270px 0');
			$('.exp_other_row').css('display', 'none');
		}

	}

	// Возвращает информацию о текущем сообщении
	function getMessageInfo(text) {
		log = new Object;
		log.msgId = msgId;
		// Если сообщение от другого игрока
		if (checkExpType(text, fake_message_text))
			return false;
		else if (checkExpType(text, zver_name)) {
			log.mType = 'zver';
			ExpDeskr = ExpDeskrZver;
		} else if (checkExpType(text, aliens_name))
			log.mType = 'aliens';
		else if (checkExpType(text, pirates_name))
			log.mType = 'pirates';
		else if (checkExpType(text, delay_name)) {
			log.mType = 'delay';
			ExpDeskr = ExpDeskrDelay
		} else if (checkExpType(text, speed_name))
			log.mType = 'speed';
		else if (checkExpType(text, buyer_name))
			log.mType = 'buyer';
		else if (checkExpType(text, pipec_name))
			log.mType = 'pipec';
		else if (checkExpType(text, met_name) || checkExpType(text, cris_name) || checkExpType(text, deit_name) || checkExpType(text, tm_name)) {
			// Узнаём какой ресурс был найден
			if (checkExpType(text, met_name))
				log.mType = 'met';
			else if (checkExpType(text, cris_name))
				log.mType = 'cris';
			else if (checkExpType(text, deit_name))
				log.mType = 'deit';
			else if (checkExpType(text, tm_name))
				log.mType = 'tm';

			// Определяем количество найденного ресурса
			var cost = parseInt(text.split('<br>')[1].match(/[\d\.]+/g)[0].replace(/\./g, ''));
			log.cost = (cost===NaN) ? 0 : cost;
		} else if (checkExpType(text, fleet_name)) {
			log.mType = 'fleet';

			flListStart = text.indexOf(strPattrFleet) + strPattrFleet.length;
			flListEnd = text.length; // text.indexOf('<br><br>', flListStart);
			// Список полученного флота
			var fleetList = text.substr(flListStart, flListEnd - flListStart).split('<br>');

			if (fleetList.length>0) {
				var fleet = [];
				for (var i = 0; i < fleetList.length;  i++) {
					var ship = new Object;
					var fly = fleetList[i].split(' ', 3);
					if (fly.length==3 && fly[0].length>0 && fly[1].length>0 && fly[2].length>0) {
						ship.name = fly[0] + ' ' + fly[1];
						ship.count = parseInt(fly[2]);
					} else if (fly.length==2 && fly[0].length>0 && fly[1].length>0) {
						ship.name = fly[0];
						ship.count = parseInt(fly[1]);
					} else  {
						break;
					}
					// console.log(ship);
					fleet[fleet.length] = ship;
				}

				if (fleet.length>0)
					log.fleet = fleet;
				else
					return false;
			}
		} else
			return false;

		// Узнаём дату сообщения
		var dt = getMsgTime();
		log.date = dt.getTime(); // Присваеваем логу дату занесения в статистику

		return log;
	}


	// Изменение временного интервала для статистики
	$('#exp_date_range').live('change', function() {
		var val = $('#exp_date_range').attr('value');
		GM_setValue(prefix + "date_range", val);
		$('.expeditions_statistica').remove(); // Удаляем старый блок со статистикой
		Logs = getLogs(); // Заново загружаем логи
		renderInfo(Logs); // Заново рисуем статистику
	});

	// Обоботчик клика по заголовку разделов
	$('.exp_res_head, .exp_other_head, .exp_fleet_head').live('click', function() {
		var this_head_class = '.' + $(this).attr('class');
		var this_row_class = this_head_class.replace('_head', '_row');

		var state = $(this_row_class).css('display');
		if (state!='none') {
			$(this_row_class).css('display', 'none');
			$(this_head_class).css('background-position', '270px 0');
		} else {
			$(this_row_class).css('display', 'table-row');
			$(this_head_class).css('background-position', '270px -19px');
		}

		var _variableName = this_head_class.replace('.', '').replace('_head', '').replace('exp_', '');
		GM_setValue(prefix + _variableName + "_show", state=='none'?1:0);
	});

	// Очищает хранилище
	$('.exp_erase').live('click', function() {
		var cnf =confirm(alertEraseConfMsg);
		if (cnf) {
			GM_setValue(prefix + "logs", []);
			GM_setValue(prefix + "losses", []);
			alert(alertEraseConfMsgOk);
			$('.expeditions_statistica').remove(); // Удаляем блок со статистикой
		}
		return false;
	});

	var msgId = parseInt(parseGetParams().msg_id); // Получаем ID текущего сообщения
	if (msgId === 'undefined')
		return true;
	var msgSubject = $('#messagebox .infohead table tr:eq(2) td').text();
	// Если сообщение не является экспедиционным или боевым докладом
	if (msgSubject.indexOf(strPattrMsgExpSubj)==-1 && msgSubject.indexOf(strPattrMsgWarSubj)==-1)
		return false;

	// Изучаем боевой доклад
	if (msgSubject.indexOf(strPattrMsgWarSubj)!=-1) {
		var aggressor = $('#battlereport #combatants .status_abbr_longinactive').text();
		var aggressorName;
		var resLost = 0;
		if (aggressor) {
			if (aggressor == alienAggressor)
				aggressorName = 'aliens';
			else if (aggressor == piratesAggressor)
				aggressorName = 'pirates';
			else
				return false;
		} else
			return false;

		resLost = parseFloat($('#battlereport table#shortreport tr:eq(1) td:eq(4)').text()) * 1000;
		if (resLost<=0)
			return false;

		var allLosses = getFleetLoss();
		var isAvaibleLoss = false;
		if (allLosses.length>0)
			for (var i = 0; i < allLosses.length;  i++) {
				if (allLosses[i].msgId == msgId) {
					isAvaibleLoss = true;
					break;
				}
			}

		// Если лога боя не существует - добавляем
		if (isAvaibleLoss===false)  {
			allLosses[allLosses.length] = {
				'msgId':msgId,
				'aggressor':aggressorName,
				'losses':resLost,
				'date':getMsgTime().getTime()
			};
			saveFleetLoss(allLosses); // Сохраняем в браузере новую запись о потерях
		}

		return true;
	}

	var messageText = $('#messagebox .textWrapper div.note').html();
	var textPos = messageText.indexOf(spyWarn);
	if (textPos!=-1) {
		$('#messagebox .textWrapper div.note').append('<div style="color:#fe3333;">' + spyWarnSovet + '</div>');
	}
	var info = getMessageInfo(messageText);
	if (info===false) {
		return true;
	} else {
		var Logs = getLogs();
		var isAvaible = false;
		if (Logs.length>0)
			for (var i = 0; i < Logs.length;  i++) {
				if (Logs[i].msgId == info.msgId) {
					isAvaible = true;
					break;
				}
			}

		// Если лога не существует - добавляем
		if (isAvaible===false)  {
			Logs[Logs.length] = info;
			saveLogs(Logs); // Сохраняем в браузере новый лог
		}

		renderInfo(Logs);
	}

	return true;
});
