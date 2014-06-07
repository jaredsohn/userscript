// ==UserScript==
// @run-at        document-end
// @name          Ogame expeditions statistics
// @namespace     exp
// @description	  Собирает информацию о результатах экспедиций
// @version       2.1.4
// @updateURL     http://userscripts.org/scripts/source/160269.meta.js
// @installURL    http://userscripts.org/scripts/source/160269.user.js
// @downloadURL   http://userscripts.org/scripts/source/160269.user.js
// @author        Demien
// @include       http://uni*.ogame.*/game/index.php?page=messages*
// @grant         none

// ==/UserScript==

function contentEval(source) {
    source = '(' + source + ')();'
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = source;
    document.body.appendChild(script);
}

contentEval(function () {
    var script_verion = '2.1.4an'; // z-include script, a-without include
    // Узнаём язык игры. Define universe language
    var lang = getByName("ogame-language");
    // Фразы, ответственные за определение типа результата экспедиции
    // Phrases that are responsible for determining the type of the result of the expedition
    // Predefined in Russian lang: // es - 377
    var met_name = ['Металл'];
    var cris_name = ['Кристалл'];
    var deit_name = ['Дейтерий'];
    var tm_name = ['Темная Материя'];
    var zver_name = ['зверушки', 'все запасы дейтерия', 'всего дейтерия', 'с вселенской пустотой',
    'с пустыми руками', 'снимки сверхновой', 'экспедиция не удалась','день рождения капитана', 'к древнему зонду',
    'древнюю стратегическую игру', 'галлюцинации у экипажа', 'гипнотирующие узоры на мониторах'];
    var fleet_name = ['К флоту присоединились:<br>'];
    var aliens_name = ['с неизвестной расой', 'Неизвестная раса атакует наш', 'корабли неизвестного происхождения',
    'группа неизвестных кораблей', 'напал вражеский флот пришельцев', 'обстрелом неидентифицированного флота',
    'труден в произношении', 'вторгся на территорию неизвестной', 'хрустальных кораблей неизвестного происхождения'];
    var pirates_name = ['пиратов', 'космическими пиратами', 'а от секретной пиратской базы', 'атакуют какие-то варвары',
    'в лапы звёздным пиратам', 'жестоких боях с неизвестными кораблями'];
    var delay_name = ['Халтурно собранный', 'ветер от красного гиганта', 'довольно много времени',
    'невероятно много времени', 'займёт некоторое время', 'несколько задержится', 'несколько затянется',
    'корабли полетят обратно'];
    var speed_name = ['Согласно первым сообщениям', 'прыжок ускорился', 'возвращается несколько раньше',
    'командир использовал нестабильную червоточину'];
    var buyer_name = ['с товарами на обмен', 'чёрную книгу'];
    var pipec_name = ['От экспедиции осталось только следующее сообщение', 'можно распрощаться навсегда',
    'взрывом уничтожила всю экспедицию', 'чёрной дыры крупным планом'];
    var fake_message_text = ['сообщает Вам следующее'];
    var strPattrFleet = 'К флоту присоединились:<br>';
    var alienAggressor = 'Чужие';
    var piratesAggressor = 'Пираты';
    var strPattrMsgExpSubj = 'Результат экспедиции';
    var strPattrMsgWarSubj = 'Боевой доклад';
    var spyWarn = 'Обнаружены следы присутствия других экспедиционных флотов';
    // Просто текст на странице
    var spyWarnSovet = 'В этой солнечной системе исчерпан лимит экспедиций, рекомендуем изменить место.';
    var alertEraseConfMsg = 'Вы уверены, что хотите стереть информацию о всех результатах экспедиций за выбранный промежуток времени?';
    var alertEraseConfMsgOk = 'Вся информация о результатах экспедиций была удалена';
    var expHeaderText = 'Статистика экспедиций';
    var expResHeaderText = 'РЕСУРСЫ';
    var expFleetHeaderText = 'ФЛОТ';
    var expOtherHeaderText = 'РАЗНОЕ';
    var metInFleetText = 'Металл во флоте';
    var crisInFleetText = 'Кристалл во флоте';
    var deitInFleetText = 'Дейтерий во флоте';
    var allExpCountText = 'Всего экспедиций';
    var zverText = 'Пустая экспедиция';
    var delayName = 'Задержка';
    var speedName = 'Ускорение';
    var traderName = 'Скупщик';
    var pipecName = 'Полный пэ';
    var stat_since_text = 'Статистика с';
    var showOutText = 'показать за';
    var showAllTimeText = 'всё время';
    var showLastMonthText = 'последний месяц';
    var showLastWeekext = 'последняя неделя';
    var showTodayText = '24 часа';
    var clearDataTitle = 'Очищает статистику экспедиций за выбранный диапазон времени';
    var sendUndefinedMessage = 'Отправить уведомление о не определении экспедиционного сообщения';
    var clearDataText = 'очистить';
    var lossesText = 'потери';
    // Название кораблей
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
    var undefined_exp_message_confirm = 'Вы уверены, что это действительно сообщение о результате экспедиции и \n'+
    'Вы желаете отправить его на обработку автору данного скрипта?(статистика экспедиций)';

    // Устанавливаем язык вселенной. Set script language
    if (lang != 'ru') {
        setExpLanguage();
    }

    // Стоимость флота. Fleet cost
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
    // Return value of html element with name="<nam>"
    function getByName(nam) {
        var d=document.getElementsByName(nam)[0];
        if(d) return d.content;
        return undefined;
    }

    // Префикс для имени сохранения в локальном хранилище
    // Prefix to the name stored in the local storage
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

    GM_addStyle('.show_expedition_stat { background: url("http://gf1.geo.gfsrv.net/cdn94/297ee218d94064df0a66bd41a04d28.png")'+
        'no-repeat scroll 0 -160px transparent; width: 16px; height: 16px; cursor: pointer; display: inline-block; }');

    // Если язык отличается от Русского - меняем значения переменных
    // Set script language
    function setExpLanguage() {
        switch (lang) {
            case 'ru':
                break;
            case 'fr': // Français
                met_name = ['Métal'];
                cris_name = ['Cristal'];
                deit_name = ['Deutérium'];
                tm_name = ['Antimatière'];
                zver_name = ['Mis à part quelques petits animaux'];
                fleet_name = ['vaisseaux qui s`y sont joints :<br>'];
                aliens_name = ['La flotte d`expédition a eu', 'Une espèce inconnue attaque', 'Votre mission d`expédition a rencontré',
                'vaisseaux inconnus ont attaqué la flotte'];
                pirates_name = ['pirates'];
                delay_name = ['Une erreur de calcul de votre officier',
                'Heureusement que les techniciens ont fait du bon travail et ont pu éviter le pire'];
                speed_name = ['Un petit défaut dans les réacteurs de'];
                buyer_name = ['Votre expédition a eu un bref contac'];
                pipec_name = ['expedition was the following radio transmission']; // Заменить
                fake_message_text = ['vous informe de ce qui suit'];
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
                stat_since_text = 'Les statistiques de';
                showOutText = 'show pour';
                showAllTimeText = 'tout le temps';
                showLastMonthText = 'mois dernier';
                showLastWeekext = 'la semaine dernière';
                showTodayText = "les jours";
                clearDataTitle = 'Efface toutes les statistiques sur les expéditions';
                sendUndefinedMessage = "Le résultat de l'expédition n'a pas tenu compte =(";
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
                undefined_exp_message_confirm = "Etes-vous sûr que c'est vraiment un message sur le résultat de l'expédition et "+
                "«Voulez-vous l'envoyer pour le traitement de l'auteur de ce script? (Expéditions Statistiques)";
                break;
            case 'de': // Deutsch
                met_name = ['Metall'];
                cris_name = ['Kristall'];
                deit_name = ['Deuterium'];
                tm_name = ['Dark Matter'];
                zver_name = ['Tierchen von einem unbekannten', 'den Geburtstag des Captains nicht auf',
                'Führungsschiffes hätte beinahe die gesamte', 'Deine Expeditionsflotte geriet gefährlich',
                'Vielleicht hätte man den Geburtstag des Captains', 'beinahe die gesamte Expedition vernichtet'];
                fleet_name = ['The following ships are now part of the fleet:<br>'];
                aliens_name = ['Deine Expeditionsflotte hatte', 'Eine unbekannte Spezies greift', 'Deine Expedition ist in eine'];
                pirates_name = ['Ein paar anscheinend sehr', 'Deine Expeditionsflotte hatte', 'Die aufgefangenen Signale stammten'];
                delay_name = ['Ein böser Patzer des Navigators', 'Riesen verfälschte den Sprung der Expedition',
                'nichts außer der Leere zwischen den Sternen', 'einige Zeit kämpfen, um sich daraus zu befreien'];
                speed_name = ['Eine unvorhergesehene Rückkopplung'];
                buyer_name = ['Deine Expeditionsflotte hatte kurzen Kontakt'];
                pipec_name = ['Von der Expedition ist nur noch folgende'];
                fake_message_text = ['informiert Sie über die folgenden'];
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
                stat_since_text = 'Statistiken von';
                showOutText = 'zeigen Sie für';
                showAllTimeText = 'die ganze Zeit';
                showLastMonthText = 'im letzten Monat';
                showLastWeekext = 'letzte Woche';
                showTodayText = 'die Tage';
                clearDataTitle = 'Löscht alle Statistiken über Expeditionen';
                sendUndefinedMessage = 'Das Ergebnis der Expedition nicht geprüft =(';
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
                undefined_exp_message_confirm = "Sind Sie sicher, dass dies wirklich eine Meldung über das Ergebnis der Expedition und "+
                "Wollen Sie es in Senden für die Verarbeitung der Autor dieses Skript? (Statistik Expeditionen)";
                break;
            case 'pl': // Polish
                met_name = ['Metal'];
                cris_name = ['Kryształ'];
                deit_name = ['Deuter'];
                tm_name = ['Antymateria'];
                zver_name = ['Poza osobliwymi małymi zwierzętami pochodzącymi z nieznanej bagiennej planety',
                'pierwszych obiecujących skanów tego sektora', 'zainstalował w komputerach statku starą grę strategiczną',
                'Sondę uratowano', 'Podczas wyprawy zrobiono wspaniałe zdjęcia supernowej', 'anomalie klasy 5 nie tylko',
                'ekspedycji niemalże zniszczyła całą flotę', 'na rozległą pustkę w przestrzeni',
                'Ekspedycja odebrała sygnał alarmowy', 'statek ekspedycyjny zderzył się z nieznanym statkiem',
                'Chyba nie powinniśmy byli urządzać'];
                fleet_name = ['Następujące statki dołączyły do floty:<br>'];
                aliens_name = ['Twoja ekspedycja napotkała niezbyt przyjazną rasę', 'Nieznani obcy atakują Twoją ekspedycję',
                'Twoja flota natrafiła na silną flotę obcych', 'została zaatakowana przez niewielką grupę niezidentyfikowanych statków',
                'statków zaatakowało twoją'];
                pirates_name = ['Jacyś bardzo zdesperowani piraci próbowali przejąć flotę ekspedycji',
                'Ekspedycja miała niemiłe spotkanie ze statkami piratów', 'z tajnej bazy piratów',
                'prymitywny barbarzyńcy atakują nas z użyciem pojazdów', 'piratów', 'walczyć z piratami'];
                delay_name = ['Główny nawigator miał zły dzień', 'wiatr wiejący ze strony czerwonego giganta uniemożliwił skok',
                'nieznanych powodów ekspedycja nieomal zderzyła się z gwiazdą', 'ekspedycja osiągnęła sektor pełen burz cząsteczkowych'];
                speed_name = ['Niespodziewane sprzężenie zwrotne w zwojach energetycznych silników',
                'Jednak flota wpadła w wiatr słoneczny podczas powrotu', 'Młody odważny dowódca pomyślnie przedostał'];
                buyer_name = ['Flota ekspedycyjna nawiązała kontakt z płochliwym gatunkiem obcych'];
                pipec_name = ['Po naszej ekspedycji pozostała jedynie transmisja radiowa',
                'rdzenia głównego statku powoduje reakcję łańcuchową'];
                fake_message_text = ['Informuje o następujących'];
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
                stat_since_text = 'Statystyki z';
                showOutText = 'pokaż';
                showAllTimeText = 'wszystkie';
                showLastMonthText = 'ostatni miesiąc';
                showLastWeekext = 'ostatni tydzień';
                showTodayText = "dzień";
                clearDataTitle = 'Usuwa wszystkie statystyki ekspedycji';
                sendUndefinedMessage = 'Efektem wyprawy nie uważa';
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
                undefined_exp_message_confirm = 'Czy jesteś pewien, że jest to naprawdę wiadomość o wyniku wyprawy i '+
                'Czy chcesz wysłać go do przetwarzania autor tego skryptu? (Statystyka wyprawy)';
                break;
            case 'es': // Español
                met_name = ['Metal'];
                cris_name = ['Cristal'];
                deit_name = ['Deuterio'];
                tm_name = ['Materia Oscura'];
                zver_name = ['pequeños animales de compañía de un desconocido planeta',
                'expedición hizo magníficas fotos de una super nova',
                'viento de una estrella gigante roja ha arruinado los saltos de la',
                'instaló un viejo juego de estrategia en todos', 'sobre el extenso vacío del espacio',
                'con las manos vacías', 'cumpleaños del capitán no debió hacerse en ese planeta desierto',
                'sonda que fue lanzada tiempo atrás para', 'ahora sabemos que esas 5 anomalías rojas',
                'Al final ellos se percataron que esas señales estaban'];
                fleet_name = ['Las siguientes naves son ahora parte de la flota:<br>'];
                aliens_name = ['especie desconocida', 'atacada por un pequeño grupo de naves',
                'exótica atacaron la expedición sin previo aviso', 'interrumpida por un corto tiempo',
                'naves de apariencia exótica atacaron la expedición sin previo',
                'una raza alien desconocida pero muy agresiva y marcial', 'grupo de naves sin identificar'];
                pirates_name = ['Algunos piratas realmente desesperados', 'expedición no tuvo un contacto amigable',
                'mensajes de radio de algunos piratas borrachos', 'luchar contra algunos piratas',
                'bárbaros primitivos están atacándonos con naves espaciales que', 'por algunos bucaneros estelares',
                'que luchar contra algunos piratas', 'algunos piratas espaciales', 'organizada por algunos bucaneros'];
                delay_name = ['Un pequeño fallo del navegador',
                'expedición entró en un sector lleno de tormentas de partículas',
                'navegación al poco de salir de nuestro sistema solar',
                'estuvo cerca de destruir la flota entera de expedición',
                'nave extranjera cuando esta saltó sobre la flota sin ningún aviso',
                'causa de razones desconocidas', 'expedición fue totalmente erróneo'];
                speed_name = ['Un inesperado acoplamiento de energía en los motores',
                'Tu expedición no informa de ninguna anomalía en el sector explorado',
                'comandante viajó con éxito a través de un inestable'];
                buyer_name = ['una raza de aliens un poco vergonzosa', 'potente campo gravitacional de un planetoide'];
                pipec_name = ['entera flota de expedición de una forma espectacular',
                'pero parece que la flota se perdió para siempre'];
                fake_message_text = ['le informa de los siguientes'];
                strPattrFleet = 'Las siguientes naves son ahora parte de la flota:<br>';
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
                stat_since_text = 'Las estadísticas del';
                showOutText = 'Mostrar por';
                showAllTimeText = 'Historial';
                showLastMonthText = 'Mes pasado';
                showLastWeekext = 'Semana pasada';
                showTodayText = 'hoy';
                clearDataTitle = 'Borrar todas las estadísticas';
                sendUndefinedMessage = 'El resultado de la expedición no tuvo en cuenta =(';
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
                undefined_exp_message_confirm = '¿Estás seguro de que esto es realmente un mensaje sobre el resultado de la expedición y '+
                '¿Quiere que le envíe en la tramitación de la autora de este guión? (Expediciones de Estadísticas)';
                break;
            case 'it': // Italiano
                met_name = ['Metallo'];
                cris_name = ['Cristallo'];
                deit_name = ['Deuterio'];
                tm_name = ['Materia oscura'];
                zver_name = ['piccoli animali provenienti da uno sconosciuto pianeta paludoso',
                'fatto stupende fotografie di una supernova',
                'ha installato un antico gioco di strategia su tutti i computers della nave',
                'rosse di classe 5 non hanno solo effetti caotici sui sistemi delle navi',
                'tua spedizione si è imbattuta nel vuoto cosmico',
                'fine hanno notato che quei segnali erano inviati'];
                fleet_name = ['parte della flotta:<br>'];
                aliens_name = ['Specie sconosciuta', 'straniere hanno attaccato la spedizione senza alcun avviso!'];
                pirates_name = ['Alcuni pirati dello spazio decisamente disperati',
                'La tua spedizione ha avuto uno spiacevole incontro', 'da una base spaziale pirata',
                'dovuto combattere alcuni pirati', 'stata attaccata da un piccolo gruppo di navi!',
                'Sembra che saremo presto sotto attacco', 'barbari primitivi ci stanno attaccando con delle'];
                delay_name = ['Una svista commessa dal capo-navigazione',
                'nave straniera è esplosa e i danni riportati dalla nave ammiraglia erano gravi',
                'quasi finito nel cuore di un sole'];
                speed_name = ['Un componente inserito nel generatore di energia'];
                buyer_name = ['La tua spedizione ha avuto contatto con un`amichevole razza aliena'];
                pipec_name = ['unica cosa che rimane dalla spedizione è il seguente radiogramma'];
                fake_message_text = ['informa di quanto segue'];
                strPattrFleet = 'parte della flotta:<br>';
                alienAggressor = 'Alieni';
                piratesAggressor = 'Pirati';
                strPattrMsgExpSubj = 'Risultato della Spedizione';
                strPattrMsgWarSubj = 'Rapporto di combattimento';
                spyWarn = 'Nous avons découvert des signes indiquant la présence d`autres flottes d`expédition dans ce secteur';
                // Plain text
                spyWarnSovet = "Dans ce système solaire a été épuisé le délai d'expéditions, il est recommandé de changer l'emplacement.";
                alertEraseConfMsg = 'Sei sicuro di voler cancellate tutte le statistichep raccolte sulle spedizioni?';
                alertEraseConfMsgOk = 'Tutte le statistiche sono state cancellate!';
                expHeaderText = 'Statistiche spedizione';
                expResHeaderText = 'RISORSE';
                expFleetHeaderText = 'FLOTTA';
                expOtherHeaderText = 'ALTRO';
                metInFleetText = 'Metallo nella flotta';
                crisInFleetText = 'Critallo nella flotta';
                deitInFleetText = 'Deuterio nella flotta';
                allExpCountText = 'Totale Spedizioni';
                zverText = 'Animali';
                delayName = 'Attesa';
                speedName = 'Velocità';
                traderName = 'Mercante';
                pipecName = 'Perdita totale della flotta';
                stat_since_text = 'Statistiche dal';
                showOutText = 'visualizza per';
                showAllTimeText = 'di sempre';
                showLastMonthText = 'ultimo mese';
                showLastWeekext = 'ultima settimana';
                showTodayText = 'ultimo giorno';
                clearDataTitle = 'Cancella Tutte le Statistiche';
                sendUndefinedMessage = 'Il risultato della spedizione non ha ritenuto =(';
                undefined_exp_message_confirm = 'Sei sicuro che questo è davvero un messaggio relativo al risultato della spedizione e '+
                "vuoi inviarlo in lavorazione per l'autore di questo script? (spedizioni Statistiche)";
                clearDataText = 'Cancella';
                lossesText = 'perdita';
                // Fleets
                fl_mt = 'Cargo Leggero';
                fl_bt = 'cargo pesante';
                fl_li = 'caccia leggero';
                fl_ti = 'caccia pesante';
                fl_cr = 'Incrociatore';
                fl_link = 'Nave da battaglia';
                fl_shz = 'Sonda Spia';
                fl_bomb = 'Bombardiere';
                fl_unic = 'Corazzata';
                fl_lin_cr = 'Incrociatore da Battaglia';
                break;
            case 'ro': // Romanian
                met_name = ['Metal']; // invalid?
                cris_name = ['Cristal']; // invalid?
                deit_name = ['Deuteriu']; // invalid?
                tm_name = ['Materia întunecată']; // invalid?
                zver_name = ['navigare cu putin dupa plecarea de pe sistemul nostru solar',
                'Expeditia ta a facut poze superbe la o super nova',
                'scanari ale sectorului, din nefericire ne-am intors cu mainile goale'];
                fleet_name = ['Următoarele nave fac acum parte din flota:<br>']; // invalid?
                aliens_name = ['noastra a fost atacata de un grup de nave necunoscute'];
                pirates_name = ['pirat'];
                delay_name = ['zi proasta si asta a cauzat expeditiei sa ajunga la calculari gresite'];
                speed_name = ['Din aceasta cauza calea de intoarcere a fost grabita cu mult'];
                buyer_name = ['--------------'];   // invalid
                pipec_name = ['--------------'];  // invalid
                fake_message_text = ['vă informează următoarele']; // invalid?
                strPattrFleet = 'Următoarele nave fac acum parte din flota:<br>'; // invalid?
                alienAggressor = 'Străinii'; // invalid?
                piratesAggressor = 'Pirates'; // invalid?
                strPattrMsgExpSubj = 'Rezultatul Expedition'; // invalid?
                strPattrMsgWarSubj = 'Combat Raport'; // invalid?
                spyWarn = 'Traces of the presence of other expeditionary fleets'; // invalid?
                // Plain text
                spyWarnSovet = 'În acest sistem solar a fost epuizat limita de expediții, este recomandat pentru a schimba locația.';
                alertEraseConfMsg = 'Sunteți sigur că doriți să ștergeți toate informațiile cu privire la rezultatele expediției?';
                alertEraseConfMsgOk = 'Toate informațiile cu privire la rezultatele expedițiilor a fost eliminat';
                expHeaderText = 'Expediții Statistici';
                expResHeaderText = 'RESURSE';
                expFleetHeaderText = 'FLEET';
                expOtherHeaderText = 'ALTE';
                metInFleetText = 'De metal în flota';
                crisInFleetText = 'Cristal din flota';
                deitInFleetText = 'Deuteriu în flota';
                allExpCountText = 'Expeditii totale';
                zverText = 'Rezultate goale';
                delayName = 'întârzia';
                speedName = 'Accelerare';
                traderName = 'Comerciant';
                pipecName = 'Pierdere toate flotei';
                stat_since_text = 'Statisticile de la';
                showOutText = 'arată pentru';
                showAllTimeText = 'tot timpul';
                showLastMonthText = 'ultima luna';
                showLastWeekext = 'săptămâna trecută';
                showTodayText = '24 oră';
                clearDataTitle = 'Șterge toate datele statistice';
                sendUndefinedMessage = 'Rezultatul expediției nu a considerat = (';
                undefined_exp_message_confirm = 'Ești sigur că aceasta este într-adevăr un mesaj despre '+
                'rezultatul expediției și vrei să-l trimită în vederea prelucrării de a autorul acestui scenariu? (Expeditii Statistici)';
                clearDataText = 'șterge';
                lossesText = 'pierderi';
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
                break;
            case 'us':
            default: // English
                met_name = ['Metal'];
                cris_name = ['Crystal'];
                deit_name = ['Deuterium'];
                tm_name = ['Dark Matter'];
                zver_name = ['small pets from a unknown marsh planet', 'empty handed',
                'virus attacked the navigation system', 'neutron stars gravitation field',
                'already voiced their interest', 'class 5 anomalies', 'extensive emptiness of space',
                'flagships reactor core nearly', 'expedition mission needed to be aborted',
                'took gorgeous pictures of a super nova'];
                fleet_name = ['following ships are now part of the fleet:<br>'];
                aliens_name = ['unknown species', 'and warlike alien race', 'small group of unknown ships',
                'Some exotic looking ships', 'expedition fleet was interrupted'];
                pirates_name = ['Some really desperate space pirates', 'expedition had an unpleasant',
                'from a secret pirate base', 'fight some pirates', 'ambush set by some Star Buccaneers',
                'radio transmissions from some drunk pirates', 'reality an ambush set up by some Star Buccaneers',
                'primitive barbarians are attacking us'];
                delay_name = ['Your navigator made a grave error', 'The solar wind of a red giant ruined',
                'The new navigation module is still buggy', 'but the jump back is going to take longer than thought',
                'make their way back as the expedition can not continue', 'but the expedition is going to return with a big delay'];
                speed_name = ['coupling in the energy spools', 'returns home a bit earlier',
                'shorten the flight back'];
                buyer_name = ['expedition fleet made contact with a friendly alien race',
                'favorite and exclusive client'];
                pipec_name = ['expedition was the following radio transmission', 'magnificent picture of the opening of a black hole'];
                fake_message_text = ['informs you of the following'];
                strPattrFleet = 'following ships are now part of the fleet:<br>';
                alienAggressor = 'Aliens';
                piratesAggressor = 'Pirates';
                strPattrMsgExpSubj = 'Expedition Result';
                strPattrMsgWarSubj = 'Combat Report';
                spyWarn = 'Traces of the presence of other expeditionary fleets';
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
                zverText = 'Empty results';
                delayName = 'Delay';
                speedName = 'Acceleration';
                traderName = 'Merchant';
                pipecName = 'Loss all fleet';
                stat_since_text = 'Statistics from';
                showOutText = 'show for';
                showAllTimeText = 'all time';
                showLastMonthText = 'last month';
                showLastWeekext = 'last week';
                showTodayText = '24 hours';
                clearDataTitle = 'Clears all statistics data';
                sendUndefinedMessage = 'The result of the expedition did not consider =(';
                undefined_exp_message_confirm = 'Are you sure that this is really a message about the result of the expedition and '+
                'do you want to send it in for processing to the author of this script?(Statistics expeditions)';
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
                break;
        }
    }

    // Форматирует числовую строку в требуемый формат
    // Format a numeric string in the required format
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

    // Перезаписываем все логи экспедиций в браузере
    // Overwrite all logs expeditions in the browser storage
    function saveLogs(Logs) {
        var str = JSON.stringify(Logs);
        GM_setValue(prefix + "logs", str);
    }

    // Возвращает все логи экспедиций, сохранённых в браузере
    // Return all logs expeditions stored in the browser
    function getLogs() {
        var Logs = GM_getValue(prefix + "logs", null);
        if (Logs === null) {
            Logs = [];
        } else {
            try {
                Logs = JSON.parse(Logs);
            } catch(e) {
                saveLogs([]);
                Logs = [];
            }
        }

        return Logs;
    }

    // Возвращает все данные о потерях в экспедициях, сохранённых в браузере
    // Returns all the data on the losses in the expeditions that are stored in your browser
    function getFleetLoss() {
        var losses = GM_getValue(prefix + "losses", null);
        if (losses === null) {
            losses = [];
        } else {
            try {
                losses = JSON.parse(losses);
            } catch(e) {
                saveFleetLoss([]);
                losses = [];
            }

        }

        return losses;
    }

    // Перезаписывает данных о потерях в экспедициях
    // Overwrites the data on losses in expeditions
    function saveFleetLoss(losses) {
        var str = JSON.stringify(losses);
        GM_setValue(prefix + "losses", str);
    }

    // Возвращает количество миллисекунд от даты сообщения
    // Returns the number of milliseconds from the message date to now time
    function getMsgTime(message) {
        var msgDateTime;
        var msgRow = message.find('.infohead table tr:eq(3) td');
        // Проверяем, изменят ли дату Antigame
        var original = $(msgRow).attr('original')
        if (original)
            msgDateTime = original.split(' ');
        else
            msgDateTime = $(msgRow).text().split(' ');

        var date_part = msgDateTime[0].split('.');
        var time_part = msgDateTime[1].split(':');

        var msg_year = (parseInt(date_part[2]));
        var msg_month = (parseInt(date_part[1]));
        var msg_day = (parseInt(date_part[0]));
        var msg_hour = (parseInt(time_part[0]));
        var msg_min = (parseInt(time_part[1]));
        var msg_sec = (parseInt(time_part[2]));

        var dt = new Date(msg_year, msg_month-1, msg_day, msg_hour, msg_min, msg_sec, 0);
        return dt;
    }

    // Возвращает стоимость найденных кораблей определённого типа
    // Returns the cost of a certain ships found
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
    // Sort the list in descending order of the fleets
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
    // Checks whether there is at least one of the phrases in the text of arr_match
    function checkExpType(text, arr_match) {
        text = text.toLowerCase();
        for (var i=0; i < arr_match.length; i++) {
            if (text.indexOf(arr_match[i].toLowerCase())!=-1)
                return true;
        }

        return false;
    }

    // Отображает информацию о статистике экспедиций
    // Displays information about the statistics of expeditions
    function renderInfo(logs, message) {
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

        var curDate = parseInt(getByName("ogame-timestamp")) * 1000;
        // Высчитываем временной диапазон
        if (DateRange > 0) {
            dateLimit = curDate - DateRange;
        }
        var stat_since = curDate;

        // Считываем все потери флота от пиратов и чужих
        var allLosses = getFleetLoss();
        if (allLosses.length>0) {
            for (var ls = 0; ls < allLosses.length;  ls++) {
                // Проверяем чтобы дата была в указанном диапазоне
                if ((allLosses[ls].date < dateLimit))
                    continue; // Переходим к следующему результату
                else {
                    if (allLosses[ls].aggressor=='aliens')
                        lostFromAliens = lostFromAliens + allLosses[ls].losses;
                    else if (allLosses[ls].aggressor=='pirates')
                        lostFromPirates = lostFromPirates + allLosses[ls].losses;
                }
            }
        }

        // Если имеется одно и более учтённое сообщение результата экспедиции
        if (logs.length > 0) {
            // Перебираем все результаты экспедиций
            for (var i = 0; i < logs.length;  i++) {
                // Проверяем чтобы дата была в указанном диапазоне
                if ((logs[i].date < dateLimit)) {
                    logs[i].mType = 'ignore';
                    continue; // Переходим к следующему результату
                }
                // Вычисляем дату самого первого учённого сообщения
                if (logs[i].date < stat_since) {
                    stat_since = logs[i].date;
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

        var messageBox = message.find('.textWrapper div.note');

        var appendText = '<div class="expeditions_statistica">'
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

        stat_since = new Date(stat_since);
        var since_day = stat_since.getDate();
        if (since_day < 10) {
            since_day = '0' + since_day;
        }
        var since_month = stat_since.getMonth() + 1;
        if (since_month < 10) {
            since_month = '0' + since_month;
        }
        appendText = appendText + '<tr><td class="exp_other_head" colspan="2">'+expOtherHeaderText+'</td></tr>'
        +'<tr class="exp_other_row"><td class="exp_left_cols">'+allExpCountText+':</td><td>' +number_format(expCount, 0, ',', '.')+ '</td></tr>'
        +'<tr class="exp_other_row"><td class="exp_left_cols">'+zverText+':</td><td>' +number_format(zver, 0, ',', '.')+ '</td></tr>'
        +'<tr class="exp_other_row"><td class="exp_left_cols">'+alienAggressor+':</td><td>' +number_format(aliens, 0, ',', '.')+ '; '+lossesText+' ['+number_format(lostFromAliens, 0, ',', '.')+']</td></tr>'
        +'<tr class="exp_other_row"><td class="exp_left_cols">'+piratesAggressor+':</td><td>' +number_format(pirates, 0, ',', '.')+ '; '+lossesText+' ['+number_format(lostFromPirates, 0, ',', '.')+']</td></tr>'
        +'<tr class="exp_other_row"><td class="exp_left_cols">'+delayName+':</td><td>' +number_format(delay, 0, ',', '.')+ '</td></tr>'
        +'<tr class="exp_other_row"><td class="exp_left_cols">'+speedName+':</td><td>' +number_format(speed, 0, ',', '.')+ '</td></tr>'
        +'<tr class="exp_other_row"><td class="exp_left_cols">'+traderName+':</td><td>' +number_format(buyer, 0, ',', '.')+ '</td></tr>'
        +'<tr class="exp_other_row"><td class="exp_left_cols">'+pipecName+':</td><td>' +number_format(pipec, 0, ',', '.')+ '</td></tr>'
        +'<tr class="exp_other_row"><td class="exp_left_cols">'+stat_since_text+':</td><td>' +since_day+'-'+since_month+'-'+stat_since.getFullYear()+ '</td></tr>';

        GM_addStyle(
            ".expeditions_statistica { width: 300px; margin: 21px auto; }"+
            ".expeditions_statistica .exp_left_cols { text-align:right; padding-right:10px; width: 142px; }"+
            ".expeditions_statistica .exp_res_head { text-align:center; border: 1px solid green; cursor: pointer; width: 300px; background: url('http://gf1.geo.gfsrv.net/cdn71/fc7a8ede3499a0b19ea17613ff0cb1.gif') no-repeat scroll 271px -19px transparent;}"+
            ".expeditions_statistica .exp_other_head { text-align:center; border: 1px solid blue; cursor: pointer; width: 300px; background: url('http://gf1.geo.gfsrv.net/cdn71/fc7a8ede3499a0b19ea17613ff0cb1.gif') no-repeat scroll 271px -19px transparent;}"+
            ".expeditions_statistica .exp_fleet_head { text-align:center; border: 1px solid red; cursor: pointer; width: 300px; background: url('http://gf1.geo.gfsrv.net/cdn71/fc7a8ede3499a0b19ea17613ff0cb1.gif') no-repeat scroll 271px -19px transparent;}"+
            ".expeditions_statistica .exp_link { cursor: pointer; color: #fff; }"+
            ".expeditions_statistica .exp_link:hover { border-bottom: 1px solid #fff; }"
            );

        var selected = ' selected="selected"';

        appendText = appendText + '</table>'+showOutText+': ' +
        '<select id="exp_date_range" style="visibility: visible;" name="exp_select_date_range">' +
        '<option value="'+0+'"'+(DateRange==0?selected:'')+'>'+showAllTimeText+'</option>' +
        '<option value="'+2580000000+'"'+(DateRange==2580000000?selected:'')+'>'+showLastMonthText+'</option>' +
        '<option value="'+602000000+'"'+(DateRange==602000000?selected:'')+'>'+showLastWeekext+'</option>' +
        '<option value="'+86000000+'"'+(DateRange==86000000?selected:'')+'>'+showTodayText+'</option>' +
        '</select>&nbsp;<span class="exp_erase exp_link" title="'+clearDataTitle+'">'+clearDataText+'</span><br />';

        appendText = appendText + '</div>';

        message.find('.expeditions_statistica').remove();
        messageBox.append(appendText);

        var resState = GM_getValue(prefix + "res_show");
        var fleetState = GM_getValue(prefix + "fleet_show");
        var otherState = GM_getValue(prefix + "other_show");

        if (resState==0) {
            $('.exp_res_head').css('background-position','271px 0');
            $('.exp_res_row').css('display', 'none');
        }
        if (fleetState==0) {
            $('.exp_fleet_head').css('background-position','271px 0');
            $('.exp_fleet_row').css('display', 'none');
        }
        if (otherState==0) {
            $('.exp_other_head').css('background-position','271px 0');
            $('.exp_other_row').css('display', 'none');
        }

    }

    // Возвращает информацию о текущем сообщении
    // Returns information about the current message
    function getMessageInfo(message) {
        log = new Object;
        text = message.find('.textWrapper div.note').html();
        log.msgId = parseInt(message.attr('data-message-id'));
        // Если сообщение от другого игрока. If message from other user
        if (checkExpType(text, fake_message_text)) {
            return false;
        } else if (checkExpType(text, zver_name)) {
            log.mType = 'zver';
        } else if (checkExpType(text, aliens_name)) {
            log.mType = 'aliens';
        } else if (checkExpType(text, pirates_name)) {
            log.mType = 'pirates';
        } else if (checkExpType(text, delay_name)) {
            log.mType = 'delay';
        } else if (checkExpType(text, speed_name)) {
            log.mType = 'speed';
        } else if (checkExpType(text, buyer_name)) {
            log.mType = 'buyer';
        }
        else if (checkExpType(text, pipec_name)) {
            log.mType = 'pipec';
        } else if (checkExpType(text, fleet_name)) {
            log.mType = 'fleet';

            flListStart = text.indexOf(strPattrFleet) + strPattrFleet.length;
            // if user used exedition success results picture script
            var expPicMod = text.indexOf('<div>', flListStart);
            // text.indexOf('<br><br>', flListStart);
            flListEnd = (expPicMod !== -1) ? expPicMod : text.length;
            // Список полученного флота. Fleet list
            var fleetList = text.substr(flListStart, flListEnd - flListStart).split('<br>');

            if (fleetList.length > 0) {
                var fleet = [];
                for (var i = 0; i < fleetList.length;  i++) {
                    var ship = new Object;
                    var fly = fleetList[i].split(' ', 3);
                    if (fly.length==4 && fly[0].length>0 && fly[1].length>0 && fly[2].length>0 && fly[3].length>0) {
                        ship.name = fly[0] + ' ' + fly[1] + ' ' + fly[2];
                        ship.count = parseInt(fly[3]);
                    } else if (fly.length==3 && fly[0].length>0 && fly[1].length>0 && fly[2].length>0) {
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

                if (fleet.length>0) {
                    log.fleet = fleet;
                } else {
                    return false;
                }
            }
        } else if (checkExpType(text, met_name) || checkExpType(text, cris_name) || checkExpType(text, deit_name) || checkExpType(text, tm_name)) {
            // Узнаём какой ресурс был найден. Determine which resource was obtained
            if (checkExpType(text, met_name)) {
                log.mType = 'met';
            } else if (checkExpType(text, cris_name)) {
                log.mType = 'cris';
            } else if (checkExpType(text, deit_name)) {
                log.mType = 'deit';
            } else if (checkExpType(text, tm_name)) {
                log.mType = 'tm';
            }

            // Определяем количество найденного ресурса. Determine the amount of resources found
            var cost = parseInt(text.split('<br>')[1].match(/[\d\.]+/g)[0].replace(/\./g, ''));
            log.cost = (cost===NaN) ? 0 : cost;
        } else {
            return false;
        }

        // Узнаём дату сообщения. Define message time
        var dt = getMsgTime(message);
        log.date = dt.getTime(); // Присваеваем логу дату занесения в статистику. Set log message time

        return log;
    }

    // Изменение временного интервала для статистики
    // Change the time interval of the stats
    $(document).on('change', '#exp_date_range', function() {
        var message = $(this).closest('.showmessage');
        var val = $(this).val();
        GM_setValue(prefix + "date_range", val);
        renderInfo(getLogs(), message); // Заново рисуем статистику
    });

    // Отправка отчёта о неучтённом сообщении. Send notice of undefined expedition message
    $(document).on('click', '.ext_send_report', function() {
        if (confirm(undefined_exp_message_confirm)) {
            var message = $(this).closest('.showmessage');
            $.ajax({
                dataType: "json",
                url: "http://ogame.logserver.net/report",
                data: {
                    'text': message.find('.textWrapper .note').html(), // HTML код сообщения. HTML message body
                    'date': getMsgTime(message).getTime(),
                    'lang': lang,
                    'o_version': getByName("ogame-version"),
                    'universe': getByName("ogame-universe"),
                    'user': getByName("ogame-player-name"),
                    'exp_type': $('#exp_message_type').val(),
                    'script_ver': script_verion,
                },
                // jsonpCallback: "success_send_report",
                complete: function() {
                    alert('OK');
                }
            });
        }
    });

    // Обработчик клика по заголовку разделов
    // Handler click on the header section
    $(document).on('click', '.exp_res_head, .exp_other_head, .exp_fleet_head', function() {
        var this_head_class = '.' + $(this).attr('class');
        var this_row_class = this_head_class.replace('_head', '_row');

        var state = $(this_row_class).css('display');
        if (state!='none') {
            $(this_row_class).css('display', 'none');
            $(this_head_class).css('background-position', '271px 0');
        } else {
            $(this_row_class).css('display', 'table-row');
            $(this_head_class).css('background-position', '271px -19px');
        }

        var _variableName = this_head_class.replace('.', '').replace('_head', '').replace('exp_', '');
        GM_setValue(prefix + _variableName + "_show", state=='none' ? 1 : 0);
    });

    $(document).on('click', '.show_expedition_stat', function() {
        var message = $(this).closest('.showmessage');
        renderInfo(getLogs(), message); // Заново рисуем статистику
    });

    // Очищает хранилище
    // Erace statistic in local storage
    $(document).on('click', '.exp_erase', function(e) {
        e.preventDefault();

        var message = $(this).closest('.showmessage');
        if (!confirm(alertEraseConfMsg)) {
            return;
        }

        // Получаем временой диапазон статистики
        var DateRange = parseInt($('#exp_date_range').val());
        if (DateRange <= 0) {
            // Если был выбран весь временой промежуток
            saveFleetLoss([]);
            saveLogs([]);
            alert(alertEraseConfMsgOk);
            renderInfo(getLogs(), message); // Заново рисуем статистику
            return;
        }

        // Высчитываем временной диапазон
        var curDate = parseInt(getByName("ogame-timestamp")) * 1000;
        var dateLimit = curDate - DateRange;

        // Считываем все потери флота от пиратов и чужих
        var allLosses = getFleetLoss();
        if (allLosses.length>0) {
            var new_losses = []; // Потери, которые должны сохраниться
            for (var ls = 0; ls < allLosses.length;  ls++) {
                if ((allLosses[ls].date < dateLimit)) {
                    new_losses.push(allLosses[ls]); // Если потери не в выбранном диапазоне - сохраняем
                }
            }

            saveFleetLoss(new_losses); // Сохраняем оставшиеся потери
        }

        var logs = getLogs();
        // Если имеется одно и более учтённое сообщение результата экспедиции
        if (logs.length > 0) {
            var new_logs = [];
            // Перебираем все результаты экспедиций
            for (var i = 0; i < logs.length;  i++) {
                if ((logs[i].date < dateLimit)) {
                    new_logs.push(logs[i]); // Этот лог оставляем в хранилище
                }
            }

            saveLogs(new_logs); // Сохраняем оставшиеся отчёты
        }

        renderInfo(new_logs, message); // Заново рисуем статистику
    });

    // Срабатывает при каждом AJAX-обновлении страницы
    // Called of each AJAX-request on page
    $(document).ajaxSuccess(function (event, XHR, ajaxOptions) {
        if (ajaxOptions.url.indexOf ("page=showmessage") < 0) {
            return;
        }

        var message = $(".overlayDiv:last > .showmessage");
        message.find('.toolbar').append('<li class="shw_exp_stats"><span class="show_expedition_stat"></span></li>');
        // Получаем ID текущего сообщения. Get message ID
        var msgId = parseInt(message.attr('data-message-id'));

        if (msgId === 'undefined')
            return;
        var msgSubject = message.find('.infohead table tr:eq(2) td').text();
        // Если сообщение не является экспедиционным или боевым докладом
        if (msgSubject.indexOf(strPattrMsgExpSubj)==-1 && msgSubject.indexOf(strPattrMsgWarSubj)==-1)
            return;

        // Изучаем боевой доклад. Research battle report
        if (msgSubject.indexOf(strPattrMsgWarSubj)!=-1) {
            var aggressor = message.find('.battlereport .combatants .status_abbr_longinactive').text();
            var aggressorName;
            var resLost = 0;
            if (aggressor) {
                if (aggressor == alienAggressor)
                    aggressorName = 'aliens';
                else if (aggressor == piratesAggressor)
                    aggressorName = 'pirates';
                else
                    return;
            } else
                return;

            // Количество полтерянных ресурсов. Resourses lost
            resLost = parseFloat(message.find('.battlereport table#shortreport tr:eq(1) td:eq(4)').text()) * 1000;
            if (resLost<=0)
                return;

            var allLosses = getFleetLoss(); // Ранее сохранённые потери. Old looses from storage
            var isAvaibleLoss = false;
            if (allLosses.length>0)
                for (var i = 0; i < allLosses.length;  i++) {
                    if (allLosses[i].msgId == msgId) {
                        isAvaibleLoss = true;
                        break;
                    }
                }

            // Если лога боя не существует - добавляем. If battle report is not already avaible
            if (isAvaibleLoss===false)  {
                allLosses[allLosses.length] = {
                    'msgId':msgId,
                    'aggressor':aggressorName,
                    'losses':resLost,
                    'date':getMsgTime(message).getTime()
                };
                saveFleetLoss(allLosses); // Сохраняем в браузере новую запись о потерях. Save
            }

            return; // Останавливаем дальнейшее изучение сообщения. Break message reseach
        }

        var messageText = message.find('.textWrapper div.note').html();
        var textPos = messageText.indexOf(spyWarn);
        if (textPos!=-1) {
            message.find('.textWrapper div.note').append('<div style="color:#fe3333;">' + spyWarnSovet + '</div>');
        }
        var info = getMessageInfo(message);
        if (info===false) {
            // Сообщение экспедиционное, а обработать не могу =(
            // If message type is expedition, but handle not possible =(
            message.append('<div><select id="exp_message_type" name="exp_message_type" style="visibility: visible">'+
                '<option value="empty">'+zverText+'</option>'+
                '<option value="delay">'+delayName+'</option>'+
                '<option value="pirates">'+piratesAggressor+'</option>'+
                '<option value="aliens">'+alienAggressor+'</option>'+
                '<option value="resourses">'+expResHeaderText+'</option>'+
                '<option value="fleet">'+expFleetHeaderText+'</option>'+
                '<option value="speed">'+speedName+'</option>'+
                '<option value="buyer">'+traderName+'</option>'+
                '<option value="pipec">'+pipecName+'</option>'+
                '</select>&nbsp;<span class="ext_send_report exp_link" title="'+
                sendUndefinedMessage + '">' + sendUndefinedMessage + '</span></div>');

            return;
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

            // Если лога не существует - добавляем. If message not exist in local storage
            if (isAvaible===false)  {
                Logs[Logs.length] = info;
                saveLogs(Logs); // Сохраняем в браузере новый лог. Save
            }

            renderInfo(Logs, message);
        }
    });

});