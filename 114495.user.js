// ==UserScript==
// @name           oroszfordit
// @version        5.51
// @namespace      vegzetur
// @include        http://*doomlord.ru*
// ==/UserScript==

var version = "5.51";

//config rész
var sormax = 5; 	//Hány soros legyen a kémlelés táblázat ami megjelenik
var datamax = 500;	//Maximálisan hány kémlelést tároljon 
var mosogatas = false; //Mosogatás az aukciós házban
var epikutes = false; //Az epik megtámadása ha van támadás gomb
var extkennel = 6; //Kennelkalk bónuszsorok száma

tartalom = document.getElementById('content_r3')
page = tartalom.innerHTML;
if(!page.match('У тебя есть еще')){
	var new_scr=document.createElement('script');
	new_scr=document.createElement('script');
	new_scr.innerHTML = 'var lang_prefix = "";';
	document.getElementsByTagName('head')[0].appendChild(new_scr);
	
	new_scr=document.createElement('script');
	new_scr.src="http://www.vegzetur.hu/vegzetur_js.php?js=vu_msg?11";
	document.getElementsByTagName('head')[0].appendChild(new_scr); 

	if(page.match('targyak_data=')){
		var targyak = unsafeWindow.targyak_data
		var rus;
		var hun;
		for (t in targyak){
			rus = targyak[t]['nev_rus'];
			hun = targyak[t]['nev'];
			while (page != page.replace(rus, hun)) {
				page = page.replace(rus, hun);
			}
		}
	}
	
	if(strpos('avegzettemploma',window.location.href)){
		page = page.replace('+1 к каждой способности (включая Удачу)','+1 minden tulajdonságra (szerencsére is)').replace('30 золотых дукатов','30 aranydukát').replace('+3 Казнь','+3 kivégzés szakértelem').replace('1 Купон на реликвию, 1 храмовая медаль','1 relikviakupon, 1 templomi medál').replace('Чтобы завершить ритуал, у тебя осталось','A teljes rituálé végrehajtására még').replace('дней:','nap:').replace('часов:','óra:').replace('минут:','perc:').replace('. После этого ты можешь начать новый ритуал в Храме.',' - áll rendelkezésedre. Újabb templomot csak ezután kereshetsz fel.').replace('В попытках возродить Богов Минувшей Эпохи, повелители судьбы проводят древние ритуалы в забытых, покинутых храмах.','A végzeturak ősi rituálékat végeznek a letűnt idők elhagyatott templomaiban, remélve, hogy vissza tudják így hívni a régi idők isteneit...').replace('На завершение ритуала (выполнение всех заданий) тебе отводится ограниченное время - ','A templomban levő feladatok teljesítésére ').replace(' дней. Выполнение заданий регистрируется автоматически, за исключением заданий, которые начинаются со слова "Пожертвуй..." - чтобы выполнить их, необходимо нажать на картинку задания. После выполнения всех заданий целой строки или столбца, нажми на мешочек, чтобы получить промежуточную награду. Завершив все задания, нажми на сундук, чтобы получить главную награду! ',' napod van. A feladatok teljesítését automatikusan számoljuk, Az Áldozz... kezdetű feladatok az ikonra kattintással teljesíthetőek. Ha egy sorban vagy oszlopban minden feladatot teljesítettél, átveheted a megfelelő erszényben levő jutalmat. Ha minden feladatot teljesítettél, kattints a ládára és megkapod a benne levő kincseket.').replace('Если отведенное на ритуал время истекло, ты начнешь ритуал заново, даже если предыдущие задания Храма были выполнены не полностью. Закончив ритуал досрочно, новый Храм откроется для тебя только после истечения всего отведенного на предыдущий ритуал времени (если только у тебя нет специальной реликвии - Храмового жезла).','Ha az idő letelik, új templomot fogsz kapni a következő látogatásodkor, akkor is, ha a templomot nem fejezted be! Ha a templomot befejezed, új templomot akkor is csak az idő leteltével kapsz, kivéve, ha van templom pálcád, ami bizonyos események/promóciók jutalmaként szerezhető.').replace('Ты можешь немедленно закончить три задания с использованием Королевской грамоты (ее можно приобрести за энергию духа или древние камни.) Использование второй и третьей грамоты обойдется гораздо дороже, чем в первый раз!','A feladatok közül hármat teljesítés nélkül kipipálhatsz egy-egy császári dekrétum segítségével amit LE-ért vagy őskőért vehetsz igénybe. A 2. és 3. dekrétum használata jelentősen magasabb, mint az első!').replace('Я использую Королевскую грамоту:','Felhasználok egy császári dekrétumot:').replace('за древние камни: 15','15 őskőért').replace('за древние камни: 30','30 őskőéert').replace('за энергию духа:','lékenergiáért:').replace('Можешь отметить задание, которое хочешь завершить! (Не белее трех раз за ритуал)','Egy feladatot teljesítettnek jelölhetsz! (Templomonként csak 3 dekrétumot használhatsz fel!)').replace('Задание, которое ты хочешь пометить как выполненное:','A teljesítettnek jelölt feladat:').replace('Превосходное ограбление','transzdestrukció').replace('кристальных очков, Средний стимулятор Врат измерений','kristálypont, kisebb térkapu stimulátor').replace('','');
		szavak = ['Получи 300 кристальных очков, приняв кристальные зелья!','Выиграй редкий (синий сектор) или супер-редкий (красный сектор) приз в Поле чудес!','Проверь положение в соревновании Леди Алвариель 5 дней подряд!','Проверяй статистику строительства в клане 5 дней подряд!','Проверяй свое положение в Лучшем счете 5 дней подряд!','Обнови описание героя (в Настройках)','Активируй Пирамиду проклятия 10 раз!','Атакуй в 3 дуэлях, повышая уровень питомца и посети Храм в тот же день!','Атакуй и победи в 12 дуэлях за 1 день!','Используй магическое строительство 10 раз!','Используй симуляцию дуэли 5 раз или смени свою специализированную способность за древние камни!','Используй 3 зелья Неистовства!','Поймай 5 питомцев за 1 день!','Используй 5 магических зелий, приобретенных за древние камни!','Продли свой премиум-статус на неделю!','Потрать все баллы действия!','Увеличь свой уровень на 2!','Войди в игру 8 дней подряд!','Запишись в чемпионат!','Увеличь свою Магию на 3 на странице персонажа!','Увеличь свою Удачу на 3 за 1 день за счет строительства!','Увеличь свою Силу 3 на странице персонажа!','Увеличь навык Приручение или Казнь на 3!','Увеличь свое Колдовство на 3 на странице персонажа!','Увеличь навык Скалолазание на 3!','Увеличь навык Исцеление ран или Прочная кожа на 3!','Увеличь навык Харизма или Превосходное утаивание на 3!','Исцели своих питомцев 20 раз (не считая автоматического исцеления)!','Заверши 24 приключения!','Отдохни 25 раз!','Улучши свое заклинание фокусирующим кристаллом!','Поучаствуй в 3 голосованиях в своем клане!','Сходи на охоту 50 раз за 1 день и посети Храм в тот же день!','Стань невидимкой, а потом снова перейди в обычное состояние!','Купи заклинание не ниже своего уровня','Купи 3 вещи для питомцев!','Пожертвуй (нажав сюда)','энергии духа!','Получи золотые дукаты (',') в Аукционном доме!','Получи','опыта за 1 день и посети Храм в тот же день!','Используй Магический шар в клане 20 раз!','Переименуй питомца!','Атакуй эпическое чудовище 5 раз за 1 день!','Дай 10 правильных ответов на вопросы викторины!','Увеличь навык Обнаружение ловушек на 3!','Используй магическое исцеление 20 раз!','Используй 5 целебных зелий, приобретенных за древние камни!','Вызови противника в состязание навыков и победи 12 раз за 1 день!','Атакуй и получи','опыта в дуэлях за 1 день!','Забери награду за 20 завершенных квестов!','Сыграй в Поле чудес у торговца 10 раз!','Выиграй три дуэли у противника, с кланом которого вы воюете ИЛИ потрать все дуэльные баллы!','Увеличь свою Выносливость на 3 на странице персонажа!','очков сокровищ!','Атакуй чудище (соло-эпика) 20 раз за 1 день!','или','зелье охотника','Потрать бриллианты духа (',') в лавке торговца!','счет:','Малый стимулятор Врат измерений','очков АР:','Выжми ЭД из 10 питомцев за 1 день!','Увеличь навык Взлом vagy Воровство на 3!',' ОП!'];
		ujszavak = ['Szerezz kristály italokból 300 kristálypontot!','Nyerj a szerencsekeréken ritka vagy ultraritka kincset!','5 egymás utáni napon nézd meg a Lady Alvariel verseny állását (Egyéb gomb)!','5 egymást követő napon nézd meg a szövetségedben egy épület statisztikáit!','5 egymást követő napon nézd meg a Toplistában a karaktered helyezését!','A Beállítások alatt írj új bemutatkozást a karakterednek!','Aktiváld az átokpiramist 10 alkalommal!','Állatod lépjen szintet 3 portyában, amikor te támadsz!','Győzz egy napon 12 portyában, amit te indítasz!','Használd a manakonstrukciót 10 alkalommal!','Használd a portyázásnál a szimulációt 5 alkalommal, vagy válts specializációt őskőért!','Használj el 3 támadás italt!','Fogj el egy napon 5 állatot!','Használj el 5 ősköves manaitalt!','Hosszabbítsd meg prémium tagságodat 1 héttel (Prémium gomb!)','Költsd el az összes cselekvéspontodat!','Lépj 2 szintet!','Lépj be a játékba 8 egymás utáni napon minden nap!','Nevezz be a bajnoki viadalra! (egyéb menüpont)','Növeld meg a mágiádat 3-mal a karakterlapodon!','Növeld meg a szerencsédet egyetlen nap alatt 3-mal úgy, hogy építesz!','Növeld meg az erődet 3-mal a karakterlapodon!','Növeld meg az idomítás vagy a kivégzés szakértelmedet 3-mal!','Növeld meg a taumaturgiádat 3-mal a karakterlapodon!','Növeld meg mászás szakértelmedet 3-mal!','Növeld meg a sebgyógyítás vagy a vastag bőr szakértelmedet 3-mal!','Növeld meg a meggyőzőkészség vagy a transzcendális projekció szakértelmedet 3-mal!','Gyógyíts állataidon 20 alkalommal (felcser nélül)!','Oldj meg 24 kalandot!','Pihenj 25 alkalommal!','Rakj fókuszkristályt a varázslatodba!','Szavazz 3-szor a szövetségedben!','Vadássz 50-et egyetlen napon, és még aznap lépj be a Végzet Templomába!','Válj láthatatlanná, majd szüntesd meg a láthatatlanságot!','Vásárolj varázslatot, aminek a szintje nem alacsonyabb a tiédnél!','Vegyél állatfelszerelést 3-szor!','Áldozz fel','lélekenergiát!','Szerezz az aukciós házban ',' aranydukátot!','Szerezz','TP-t egyetlen napon, és még aznap lépj be a Végzet Templomába!','Használd a kémgömböt 20 alkalommal!','Nevezd át egy állatodat!','Támadj meg egy epikust 5-ször ugyanazon a napon!','Válaszolj 10 kvízkérdésre helyesen!','Növeld meg csapdaészlelés szakértelmedet 3-mal!','Használd a mágikus gyógyítást 20 alkalommal!','Használj el 5 ősköves gyógyitalt!','Győzz egy napon 12 általad indított kihívásban!','Szerezz egy napon általad indított portyában','TP-t!','Vedd át 20 sikeres küldetés jutalmát!','Forgasd meg a szerencsekereket a lélekkufárnál 10 alkalommal!','Győzz háromszor általad indított portyában olyan végzetúr ellen, akivel háborúban vagy, vagy költsd el az összes portyázáspontod!','Növeld meg az egészségedet 3-mal a karakterlapodon!','kincspontot!','Támadj meg egy entitást 20-szor ugyanazon a napon!','vagy','A vadászat itala','Költs el összesen ',' lélekgyémántot a kufárnál!','számláló:','Apró térkapu stimulátor','AF pontok:','Sajtold ki egy napon 10 állatodat!','Növeld meg a zárnyitás vagy a lopás szakértelmedet 3-mal!',' TP-t!'];
	for (i=0; i<szavak.length; i++){
			while(page!=page.replace(szavak[i],ujszavak[i])) page=page.replace(szavak[i],ujszavak[i]);
		}
	}

	page = page.replace('- повелитель судьбы ',' - ').replace('Энергия духа','Lélekenergia').replace('Древние камни:','Őskő:').replace('Состоит в клане:','Szövetség:').replace('Жизненные очки','Életpont').replace('Мана','Varázspont').replace('Опыт','Tapasztalat').replace(' ЖО</span>',' ÉP</span>').replace(' М</span>',' VP</span>').replace(' ОП</span>',' TP</span>').replace('Статистика и достижения','Eredmények és tettek').replace('Победы:','Győzelem:').replace('Поражения:','Vereség:').replace('Всего:','Összesen:').replace('Наибольший урон:','Legtöbb okozott sebzés:').replace('Всего способностей:','Tulajdonságösszeg:').replace('Всего навыков:','Szakértelemösszeg:').replace('Завершенные квесты:','Teljesített küldetés:').replace('Завершенные приключения:','Teljesített kaland:').replace('Общее строительство:','Összes építés:').replace('Выигранная энергия духа:','Zsákmányolt lélekenergia:').replace('Потерянная энергия духа:','Elvesztett lélekenergia:').replace('Правильные ответы на викторину:','Helyes kvíz-válaszok:').replace('Классифицировано вопросов викторины:','Kvíz besorolás:').replace('Невидимость','Láthatatlanság').replace('Получи больше энергии духа','Lélekenergia szerzése').replace('Приобрести древние камни','Őskő szerzése').replace('Показать описание героя','Bemutatkozó szöveg megjelenítése').replace('Облаченное снаряжение','Viselt tárgyak').replace('оружие','Fegyver').replace('Инвентарь','Tárgylista').replace('Оружие','Fegyverek').replace('Щиты','Pajzsok').replace('Настройки','Beállítások').replace('Выйти','Kilépés').replace('Действия','Tevékenységek').replace('Охота','Vadászat').replace('Дуэль','Portyázás').replace('Отдых','Pihenés').replace('Торговец душами','Lélekkufár').replace('Клан','Szövetség').replace('Квесты','Küldetések').replace('Разное','Egyéb').replace(' дуэльных баллов',' portyázáspont').replace(' баллов действия',' cselekvéspont').replace('Информация','Információk').replace('Твой персонаж','Karakterlap').replace('Предыдущие бои','Eddigi csatáid').replace('Сообщения','Üzenetek').replace('События','Események').replace('Лучший счет','Toplista').replace('Разное','Egyéb').replace('Помощь','Segítség').replace('Викторина','Kvíz').replace('Правила','Játékleírás').replace('ЧАВО','GY.I.K.').replace('Форум','Fórum').replace('Премиум','Prémium tagság').replace('Древние камни','Őskövek').replace('Рекруты','Ajánlás').replace('Реликвии','Relikviák').replace('Дополнительно','Extrák').replace('Общие битвы','Nyilvános csaták').replace('- повелительница судьбы','-').replace('Исход последней охоты.','Legfrissebb vadászatod eredménye').replace('Навыки','Szakértelmek').replace('Доспехи','Páncélok').replace('Заклинания','Varázslatok').replace('Целебные зелья','Gyógyitalok').replace('Магические зелья','Varázsitalok').replace('Фокусирующие кристаллы','Fókuszkristályok').replace('Реликвии','Relikviák').replace('Ботинки','Csizmák').replace('Усиление разумом:','Tudatturbó:').replace('Реактивация Усиления разумом','A tudatturbó azonnali újrahasználata').replace('Усилить разумом навык:','Tudatturbózod a következő szakértelmedet:').replace('Выбери!','--Válassz!--').replace('за 1 балл действия','1 cselekvéspontért').replace('за 1/3 древнего камня','1/3 őskőért').replace('Питомцы','Állatok').replace('Питомцы','Állatok').replace('Бонусы','Bónuszok').replace('мало ЖО','alacsony ÉP').replace('Твой уровень жизненных очков слишком низок, ты не можешь атаковать или быть атакованным.','Életpontod alacsony, nem támadhatsz, és nem támadhatnak!').replace('Ты сможешь атаковать через','Legközelebb').replace('>.</div></div>','> idő múlva támadhatsz.</div></div>').replace('к Защите (Бастион)','védekezés (Védőfal)').replace('к Атаке (Полигон)','támadás (Gyakorlótér)').replace('У тебя непрочитанных сообщений:','Olvasatlan üzeneteid száma:').replace('Сражающийся питомец','Harcoló lények').replace('Точно хочешь потратить 1/3 древнего камня за повторное использование?','Valóban elköltesz 1/3 őskövet, hogy újra használhasd?').replace('Точно хочешь потратить 1 балл действия за повторное использование?','Valóban elköltesz 1 cselekvéspontot, hogy újra használhasd?').replace('баллы Вр. изм.','térkapupont').replace('Порекомендуй игру друзьям и получи специальную реликвию!','BÓNUSZ!').replace('Торговые войны','Kufár-csata').replace('Аукцион','Aukciós ház').replace('фамилиар:','familiáris:').replace('Если он в битве, твои питомцы наносят на +10% больше урона.','Ha harcol, állataid a harcban +10% sebzést okoznak.').replace('Кольца','Gyűrűk').replace('Ожерелья','Nyakláncok').replace('Разное','Egyéb').replace('Магическое исцеление','Mágikus gyógyítás').replace('За ','').replace('маны ты восстановишь','VP árán').replace('жизненных очков. Тебя это устраивает?','életpontot fogsz gyógyulni. Mehet?').replace('Ты сможешь использовать магическое исцеление через','Legközelebb').replace('.<br>(При Усилении разумом - через','idő múlva használhatod a mágikus regenerációt!<br>(Tudatturbózva').replace('an>)</div','an> idő múlva)</div').replace('Камера пыток','Kínzókamra').replace('.<br>(Применив Усиление разумом, ты мог бы использовать его немедленно)',' idő múlva használhatod a mágikus regenerációt!').replace('Храм Судьбы','Végzet temploma').replace('Иссушение души:','Lélekszívás:').replace('Защита от иссушения души:','Lélekszívás-védelem:').replace('к Мудрости (Некроусилитель)','mágia (Nekrofun fókusz)').replace('Очки АР','AF pontok').replace('Наборы обмундирования:','Öltözetek:').replace('Загрузить','Betölt').replace('Сохранить','Elment').replace('Удалить','Töröl').replace('Award-relics','Jutalomrelikviák').replace('smaller dim. gate','Kisebb térkapus fk.').replace('Обмундирование оказывает на питомца удвоенный эффект (кроме бонуса ОП, который увеличивается только на 50%).','Az általa használt állatfelszerelés minden egyes hatása duplán hat (a TP-t adó csak másfélszeresen. a max szakértelempontot nem erősíti).');
		szavak = ['Сегодня','Вчера',' ЭД',' ЖО',' М',' ОП','Ущерб','Уровень','Защита от оглушения','Защита','Выносливость','Магический блок','Восстановление маны','Исцеляет','Магия','Расход маны','Урон','подпространственный поиск','усиление разумом','спектральная манипуляция','искажение реальности','крепость','казнь','воровство','превосходное утаивание','критический удар','торговля','элементарный синтез','харизма','исцеление ран','частая атака','лидерство','вторичная атака','хронокомпенсация','приручение','строительство','Атака','Атак','Блок','Действие на противника','Сила','Мудрость','Колдовство','Удача','Защита','Выносливость','Изумрудная','Рубиновая','Бриллиантовая','Сапфировая','выжимание энергии духа','мудрость питомца','установка ловушек','обучение','сродство','прочная кожа','Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь','Критический удар','Оглушение','Критический магический удар','морали/победу (только дуэли и вызовы)','Назад','Перенести в архив',' уровня','Осмотр местности','Фокусирующий кристалл:','Инфекция','Обмундирование:','TP/победу','забвение','кристальные очки','Вызовы','критическое заклинание','стая','трансплантация','Выигранные вызовы','обнаружение ловушек','скалолазание','взлом','вторичное заклинание','использование энергии','магическое лечение','магическое építés','ультраспециализация','Приключения','Регенерация:','храмовые кристаллы: 1','Сгоревшие древние камни','опытный охотник','эпический боец','Твой персонаж','Инвентарь','Очки АР:','АР','Удалить фокусирующий кристалл','Ежедневные действия'];
		ujszavak = ['Ma','Tegnap',' LE',' ÉP',' VP',' TP','Sebzés','Szint','Bénítás elhárítás','Védekezés','Egészség','Varázslat elnyelés','VP regenerálás','Gyógyít','Mágia','VP költség','Sebzés','szubtéri érzékelés','tudatturbó','spektrális manipuláció','valóságformázás','szívósság','kivégzés','lopás','transzcendális projekció','kritikus ütés','kereskedelem','elementáris fúzió','meggyőzőkészség','sebgyógyítás','kontinuumszűkítés','vezetőkészség','másodlagos támadás','kronokompenzáció','idomítás','építés','Támadás','Támadás','Elnyelés','Hatása az ellenfélre','Erő','IQ','Taumaturgia','Szerencse','Védekezés','Egészség','Smaragd','Rubin','Gyémánt','Zafír','lélekenergia sajtolás','intelligens kedvenc','csapdakészítés','tanulás','kreatív affinitás','vastag bőr','Január','Február','Március','Árpilis','Május','Június','Július','Augusztus','Szeptember','Október','November','December','Kritikus sebzés','Kábítás','Kritikus varázslat sebzés','morál győzelmenként (csak portya és kihívás során)','Vissza','Áthelyezés az archívumba','. szintű végzetúr','térképkeresés','Fókuszkristály:','Fertőzés','Az állat aktuális tárgya:','TP győzelmenként','felejtés','Kristálypont','Kihívás','kritikus varázslat sebzés','hordázás','transzplantáció','Győztes kihívás','csapdaészlelés','mászás','zárnyitás','másodlagos varázslat','energiahasznosítás','mágikus regeneráció','manakonstrukció','ultraspecializáció','Kalandok','Regenerálás:','1 templomkristály','Kiégett őskő','irányított vadászat','epikus specializáció','Karakterlap','Tárgylista','AF pontok:','AF','Fókuszkristály törlése','Napi rutinok'];
		for (i=0; i<szavak.length; i++){
			while(page!=page.replace(szavak[i],ujszavak[i])) page=page.replace(szavak[i],ujszavak[i]);
		}

	if(page.match('Имя пользователя')){
		page = page.replace('Имя пользователя:','Azonosító:').replace('Пароль:','Jelszó:').replace('Мир:','Világ:').replace('Войти','Belépés').replace('Регистрация','Regisztráció').replace('Регистрация','Regisztráció').replace('Восстановление пароля','Elfelejtett jelszó').replace('Изменить<br>регистрационные данные','Regisztráció módosítása').replace('Повелитель судьбы','Végzetúr').replace('Новости','Hírek').replace('Последние новости','Friss hírek').replace('Архив новостей','Hírarchívum').replace('Повелитель судьбы - новое поколение браузерных игр','VÉGZETÚR - Az internetes fantasy szerepjátékok új generációja').replace('Дополнительная помощь и информация:','További segítség és információ:').replace(', или',', vagy látogasd meg').replace('на форуме!','fórumunkat!').replace('В игре Повелитель судьбы ты развиваешь уникального фентезийного персонажа. ','A Végzetúr online fantasy játék Ghalla fantasy világában játszódik, ahol egy egyedi karaktert fejleszthetsz. Megküzdhetsz más játékosokkal, de szövetkezhetsz is velük.').replace('Другие игроки не могут полностью уничтожить твоего героя или прервать твою игру.','Az online szerepjáték során az IQ-dat is próbára tesszük kvíz kérdések segítségével, sőt, te is tehetsz fel kérdést másoknak!').replace('Это бесконечная игра, мы постоянно вносим в нее улучшения и новые возможности.','Ebből a játékból nem lehet kiesni, ellentétben oly sok más szerepjáték világgal, a többi játékos nem tud elpusztítani vagy lehetetlenné tenni a játékodat.').replace('Она не отнимает много времени, если ты не можешь играть несколько дней, ты быстро наверстаешь пропущенное время!','Ez a nyitott végű online szerepjáték folyamatos újdonságokkal, rengeteg kihívással, kalanddal kecsegtet a fejlesztéseknek köszönhetően.').replace('Во время игры ты можешь проверить свои знания, отвечая на вопросы викторины. ','A játék nem igényel sok időt, és ha 1-2 napig nem tudsz részt venni a játékban, a lemaradást behozhatod.').replace('<li>Это бесплатно, и не нужно ничего скачивать или устанавливать! </li>','').replace('В случае любых затруднений при регистрации, сообщи нам по адресу','Ha bármilyen problémád van a regisztrációval, írj nekünk az').replace(', либо используй',' címre, vagy kérj').replace('Помощь','Segítséget').replace('(Если у тебя есть персонаж в другом игровом мире, используй те же самые имя пользователя и пароль!)','').replace('Мир:','Világ:').replace('Имя пользователя:','Azonosítód:').replace('Стартовал:','Elindult:').replace('Выбери игровой мир:','Válaszd ki, melyik világon akarsz játszani!').replace('(Заполни это поле, только если хочешь, чтобы имя пользователя отличалось от имени персонажа. Под выбранным именем пользователя можно также заходить на форум.)','Az azonosítóddal tudsz belépni a játékba és a fórumba egyaránt, és ez lesz a neved is a fórumban. <br>(Ha nem töltöd ki, automatikusan a lent megadott karakterneved lesz az azonosítód)').replace('Выбери пароль:','Válassz jelszót:').replace('Подтверди пароль:','Jelszó megerősítése:').replace('Электронный адрес:','E-mail címed:').replace('Имя персонажа:','Válassz karakternevet:').replace('Пол персонажа:','Karaktered neme:').replace('мужчина','Férfi').replace('женщина','Nő').replace('Аватар:','Avatár:').replace('Орда:','Horda:').replace('Твоя Орда определит некоторые преимущества, которые получит персонаж. (Если ты хочешь быть в одном клане с уже играющим другом, выбирай орду, которой принадлежит его персонаж!)','A hordád határozza meg, milyen bónuszokat kap a karaktered. (Ha egy szövetségbe akarsz tartozni egy barátoddal, aki már játszik, válaszd azt a hordát, amit ő!)').replace('Выбери Орду','Válassz hordát').replace('Секретный вопрос:','Titkos kérdés:').replace('Секретный вопрос и ответ на него понадобятся, если ты захочешь изменить электронный адрес.','A titkos kérdést akkor fogjuk feltenni, ha email címedet akarod megváltoztatni.').replace('Ответ на секретный вопрос:','Titkos válasz:').replace('Я принимаю','Elfogadom a').replace('Пользовательское Соглашение','felhasználási feltételeket').replace('Визуальное подтверждение:','Vizuális megerősítés:').replace('Следи за регистром символов!','írd ide a képen látható betűket. (ügyelj a kis- és nagybetűkre!)').replace('Зарегистрироваться','Regisztrálok').replace('Повелитель судьбы','Végzetúr').replace('','').replace('','').replace('','').replace('','');
	}

	//Napi rutinok oldal

	if(page.match('Бонус лояльности')){
		szavak = ['Бонус лояльности','Дуэльные баллы:','Баллы  действия','Утверждено','быстрые кнопки','Купить зелья (','древних камня)','2 дукатов за 5 БД','маг. építés','Поле чудес','Специализация установлена на:',' дней','Разрядить источник','Премиум','Премиус-статус действителен до','Продлить','Последние новости','Установить спец.'];
		ujszavak = ['Hűségbónusz','Portyapont:','Cselekvéspont','Átvetted','Gyorsgombok','Italvásárlás (','őskő)','2 dukát 5 csp-ért','Manakonstrukció','Szerencsekerék','Spec. váltás:',' nap','Lélekkút kisüthető','Prémium tagság','Prémium tagságod érvényessége:','Meghosszabbítom','Legfrissebb hírek','Specializáció váltás'];
		for (i=0; i<szavak.length; i++){
			while(page!=page.replace(szavak[i],ujszavak[i])) page=page.replace(szavak[i],ujszavak[i]);
		}
	}

	//Ide csak a küldetéseket!
	if(strpos('kuldetesek',window.location.href) || strpos('esemenyek',window.location.href)){
		page = page.replace('Выиграй 5 дуэлей, в которых ты атакуешь.','Győzz 5 olyan portyában, amit te kezdeményezel!').replace('Ответь правильно на 30 вопросов викторины!','Válaszolj helyesen 30 kvízkérdésre!').replace('Повстречай на охоте 3 крошечных тварей!','Vadászat során ejts el 3 apró szörnyet!').replace('Нанеси противнику не менее 30 урона в одном раунде боя!','Sebezz egyetlen harci körben legalább 30 életpontot!').replace('Напиши вопрос викторины, который получит хорошую оценку от других игроков!','Tegyél fel egy kvízkérdést, amit a többi játékos jó kérdésként elfogad!').replace('Победи в дуэли, в которой ты будешь иметь не менее чем 30% штрафа к твоим способностям!','Portyázz úgy, hogy legalább 30% mínuszt kapsz tulajdonságaidra, és arass győzelmet!').replace('Ответь правильно на 10 вопросов викторины подряд!','Válaszolj egymás után 10 kvízkérdésre helyesen úgy, hogy közben egyet sem rontasz el!').replace('Купи новый щит!','Vásárolj magadnak új pajzsot!').replace('Потеряй не менее 100 LE в дуэли, в которой ты атакуешь.','Zsákmányoljanak tőled legalább 100 LE-t úgy, hogy te támadsz!').replace('Получи не менее 5 опыта в дуэли, в которой ты атакуешь.','Szerezz egyetlen portyázásból legalább 5 tapasztalati pontot úgy, hogy te támadsz!').replace('Ответь правильно на 50 вопросов викторины!','Válaszolj helyesen 50 kvízkérdésre!').replace('Támadásуй в дуэли 30 игроков, уровень которых не ниже твоего!','Támadj meg portyában 30 játékost, akinek a szintje ugyanannyi vagy magasabb, mint a tied!').replace('Победи в 15 дуэлях, в которых ты атакуешь!','Győzz 15 olyan portyában, amit te kezdeményezel!').replace('У тебя должно быть ровно 555 энергии духа, когда ты откроешь меню квестов!','Legyen pontosan 555 lélekenergiád, amikor belépsz a küldetések menüpontba!').replace('Победи в 3 дуэлях подряд!','Győzz 3 egymás utáni portyában!').replace('Забери энергию духа у 5 крупных тварей!','Vedd lélekenergiáját 5 nagyobb méretű szörnynek!').replace('Полностью излечи своего раненого питомца!','Teljesen gyógyítsd meg egy sérült állatodat!').replace('Támadásуй и победи Повелителя (или Повелительницу) судьбы, чей уровень выше твоего!','Támadj meg és győzz le portyában egy nálad magasabb szintű végzeturat!').replace('Владей хотя бы 3 пойманными животными!','Legyen legalább 3 befogott állatod!').replace('Увеличь свой уровень на 2!','Lépj 2 szintet!').replace('Преврати сгоревший древний камень в нормальный ИЛИ правильно ответь на 100 вопросов викторины!','Alakíts át kiégett őskövet őskővé, vagy válaszolj helyesen 100 kvízkérdésre!').replace('Казни своего противника!','Végezd ki ellenfeledet úgy, hogy te támadsz!').replace('Выиграй не менее 500 LE, напав на игрока!','Zsákmányolj legalább 500 LE-t egy másik végzetúrtól, akit megtámadsz!').replace('Нанеси kritikus ütés в дуэли, в которой ты атакуешь!','Okozz ellenfelednek kritikus ütést, amikor portyázás során megtámadod!').replace('Используй VPагический шар!','Használd  kémgömböt!').replace('Забери энергию духа у 5 огромных тварей!','Vedd lélekenergiáját 5 hatalmas méretű szörnynek!').replace('Támadásуй противника и убей его/ее питомца!','Támadj meg egy végzeturat, és öld meg beidomított lényét!').replace('Получи не менее 10 опыта в дуэли, в которой ты атакуешь.','Szerezz egyetlen portyázásból legalább 10 tapasztalati pontot úgy, hogy te portyázol!').replace('У тебя должно быть не менее 20000 энергии духа, когда ты откроешь меню квестов!','Legyen legalább 20.000 lélekenergiád, amikor belépsz a küldetések menüpontba!').replace('Выжми энергию духа из 3 тварей!','Sajtolj lélekenergiát 3 lényből!').replace('Укради сгоревший древний камень!','Lopj kiégett őskövet!').replace('Купи у торговца душами Fegyver хотя бы на 2. szintű végzetúr выше твоего!','Vásárolj a lélekkufártól egy fegyvert, amelynek a szintje legalább kettővel magasabb a te szintednél!').replace('Увеличь уровень своих питомцев на 5!','Lépjen állatod szintet 5 alkalommal!').replace('Выиграй 10 дуэлей подряд!','Győzz 10 egymás utáni portyában, amikor te támadsz!').replace('Достигни. szintű végzetúr 25!','Légy 25. szintű!').replace('Разряди источник или ответь правильно на 20 вопросов викторины подряд!','Süsd ki a lélekkutat,vagy válaszolj egymás után 20 kvízkérdésre helyesen úgy, hogy közben egyet sem rontasz el!').replace('Сразись на Арене!','	Harcolj az arénában!').replace('Támadásуй и победи в дуэлях 5 противников выше твоего. szintű végzetúr или увеличь навык Чаhordázás атака до 20!','Támadj meg és győzz le portyában öt nálad magasabb szintű végzeturat,vagy legyen a kontinuumszűkítés szakértelmed legalább 20-as').replace('Твое суммарное építés в клане должно быть больше 50000 LE!','Legyen az összes szövetségi építésed legalább 50.000 LE!').replace('У тебя должно быть 0 маны, когда ты откроешь меню квестов!','Legyen pontosan 0 varázspontod, amikor belépsz a küldetések menüpontba!').replace('Выиграй не менее 1500 LE, напав на игрока!','Zsákmányolj legalább 1500 LE-t egy másik végzetúrtól, akit megtámadsz!').replace('У тебя должно быть не менее 30000 энергии духа, когда ты откроешь меню квестов!','Legyen legalább 30.000 lélekenergiád, amikor belépsz a küldetések menüpontba!').replace('Оглуши своего противника 3 раза!','Kábítsd el ellenfeled legalább 3 alkalommal!').replace('Увеличь свой уровень на 3!','Lépj 3 szintet!').replace('Забери энергию духа у 7 гигантских тварей!','Vedd lélekenergiáját 7 óriási méretű szörnynek!').replace('Получи не менее 15 опыта в дуэли, в которой ты атакуешь.','Szerezz egyetlen portyázásból legalább 15 tapasztalati pontot úgy, hogy te támadsz!').replace('Достигни. szintű végzetúr 35!','Légy 35. szintű').replace('Активируй Пирамиду проклятия трижды!','Aktiváld az átokpiramist 3 alkalommal!').replace('Выиграй не менее 2000 LE, напав на игрока!','Zsákmányolj legalább 2000 LE-t egy másik végzetúrtól, akit megtámadsz!').replace('В 5 боях твой питомец должен нанести больше ущерба, чем герой!','Sebezzen idomított állatod legalább 5 csatában többet, mint te!').replace('У тебя должно быть не менее 40000 энергии духа, когда ты откроешь меню квестов!','Legyen legalább 40.000 lélekenergiád, amikor belépsz a küldetések menüpontba!').replace('Увеличь уровень своих питомцев на 12!','Lépjen állatod szintet 12 alkalommal!').replace('Выиграй 15 дуэлей подряд!','Győzz 15 egymás utáni portyában, amikor te támadsz!').replace('Используй целебное зелье 10 раз!','Használj gyógyító italt 10 alkalommal!').replace('Твое суммарное építés в клане должно быть больше 100000 LE!','Legyen az összes szövetségi építésed legalább 100.000 LE!').replace('5 раз заверши дуэль вничью!','Érj el portyában döntetlent legalább 5 alkalommal!').replace('Владей хотя бы 6 пойманными животными!','Legyen legalább 6 befogott állatod!').replace('Выжми энергию духа из 20 тварей!','Sajtolj lélekenergiát 20 lényből!').replace('Казни 5 противников!','Végezd ki 5 ellenfeledet úgy, hogy te támadsz!').replace('У тебя должно быть 0 маны, когда ты откроешь меню квестов!','Legyen pontosan 0 varázspontod, amikor belépsz a küldetések menüpontba!').replace('Забери энергию духа у 15 крошечных тварей!','Vadászat során ejts el 15 apró szörnyet!').replace('Разница между наивысшей и наименьшей твоими способностями (не считая VPагии, Выносливости и Удачи) должна быть не менее 25!','A legalacsonyabb és legmagasabb alaptulajdonságod (mágia, egészség és szerencse kivétel) között a különbség legyen legalább 25!').replace('Увеличь свой уровень на 4!','Lépj 4 szintet!').replace('У тебя должно быть не менее 50000 энергии духа, когда ты откроешь меню квестов!','Legyen legalább 50.000 lélekenergiád, amikor belépsz a küldetések menüpontba!').replace('Достигни. szintű végzetúr 40!','Légy 40. szintű').replace('Нанеси противникам по дуэли критические повреждения 20 раз!','Okozz kritikus ütést 20 alkalommal portyázáskor!').replace('Получи не менее 3 сгоревших древних камней при помощи Кристаллизатора энергии, увеличив свой уровень.','Szerezz legalább 3 kiégett őskövet szintlépéskor az energiakristályosító segítségével!').replace('Получи не менее 20 опыта в дуэли, в которой ты атакуешь.','Szerezz egyetlen portyázásból legalább 20 tapasztalati pontot úgy, hogy te támadsz!').replace('Szint основных предметов снаряжения (Fegyver, заклинание, щит, доспех) должен совпадать с уровнем героя!','Legyen mind a négy tárgyad (fegyver, páncél, pajzs, varázslat) szintje ugyanaz, mint a tiéd!').replace('Забери энергию духа у 15 небольших тварей!','Ejts el 15 kisebb méretű szörnyet!').replace('Szint основных предметов снаряжения (оружие, заклинание, щит, доспех) должен совпадать с уровнем героя!','Legyen mind a négy tárgyad (fegyver, páncél, pajzs, varázslat) szintje ugyanaz, mint a tiéd!').replace('Используй магическое зелье 10 раз!','Használj varázsitalt 10 alkalommal!').replace('Победи 25 существ, пришедших через Врата измерений.','Pusztíts el 25 lényt, amely a térkapun lép át!').replace('Выкупи предмет из Сокровищницы!','Vásárolj tárgyat a kincseskamrából!').replace('Ответь правильно на 30 вопросов викторины подряд!','Válaszolj egymás után 30 kvízkérdésre hibátlanul!').replace('Увеличь свой навык Обучение до 34!','Növeld fel a tanulásodat 34-re!').replace('Достигни. szintű végzetúr 49!','Légy 49. szintű').replace('Támadásуя, оглуши своих соперников по дуэлям 40 раз!','Kábítsd el ellenfeled 40 alkalommal portyázás során úgy, hogy te támadsz!').replace('Используй магическое зелье 25 раз!','Használj varázsitalt 25 alkalommal!').replace('Выжми энергию духа из питомца не ниже 20. szintű végzetúr!','Sajtold ki egy állatod lélekenergiáját, amely legalább 20. szintű!').replace('У тебя должно быть не менее 100000 энергии духа, когда ты откроешь меню квестов!','Legyen legalább 100000 lélekenergiád amikor belépsz a küldetések menüpontba!').replace('Получи не менее 25 опыта в дуэли, в которой ты атакуешь.','Szerezz egyetlen portyázásból legalább 25 tapasztalati pontot!').replace('Szint основных предметов снаряжения (оружие, заклинание, щит, доспех) должен быть ровно на 2. szintű végzetúr выше. szintű végzetúr героя!','Legyen mind a négy tárgyad (fegyver, páncél, pajzs, varázslat) szintje kettővel magasabb, mint a tiéd!').replace('Заверши постройку двух строений в клане (кроме построек, которые затем возможно разрушить).','Építsd be az utolsó téglát két alkalommal egy szövetségi épületbe, ami nem a hatalom tornya vagy más, rombolható épület!').replace('Támadásуя, выиграй 50 дуэлей подряд!','Győzz 50 egymás utáni portyában, amit te kezdeményezel!').replace('Получи не менее 6 сгоревших древних камней при помощи Кристаллизатора энергии, увеличив свой уровень.','Szerezz legalább 6 kiégett őskövet szintlépéskor az energiakristályosító segítségével!').replace('Нанеси не менее 50 урона заклинанием питомцу соперника в 10 дуэлях!','Sebezz ellenfeled állatán varázslattal legalább 50-et, 10 portyázás során, amit te kezdeményezel!').replace('Увеличь свой уровень на 5!','Lépj 5 szintet!').replace('Нанеси не менее 3000 урона эпическому чудовищу!','Sebezz egyetlen epikus lénybe összesen legalább 3000 Ép-t!').replace('Напади на соперника и нанеси ему не менее 600 урона заклинанием!','Sebezz varázslattal egyetlen portyázásban minimum 600-at, amikor te támadsz!').replace('Уменьши свою разницу добытой и проигранной LE на 20000 по сравнению с текущей разницей или имей базовое значение Выносливости не менее 90!','Csökkentsd a Szerzett LE differenciádat 20000-rel mostantól számítva, vagy legyen alap Egészséged legalább 90!').replace('Избавься (забудь их) от двух навыков не ниже 10. szintű végzetúr.','Felejtsd el két, legalább 10-es szintű szakértelmedet!').replace('','').replace('','').replace('','');
		}

	//Ide csak az aukciós tételeket!
	szavak = ['Малый камень силы','Kамень силы','Сумка шамана','Окуляр','Сумка с древними камнями','Малый камень атаки','Идол пленяющий демона','Лапа верности','Мягкая подушка','Масонский инструмент','Малый камень выносливости','Малый камень защиты','Заколдованный свисток','Божественное зелье','Священный идол','Курочка Ряба','Малый камень мудрости','Малый камень магии','VPудрость','VPагия','Сапфировое кольцо','Накидка скрытности','Грубые когти','Шипаhordázás кожа','Малый камень удачи','Малый камень колдовства','Высасывающий душу','Древнее исцеляющее зелье','Rubin аура','Пояс чемпиона','Кристальный шар','Парализоид','Рожок тролля','Катализатор Источника','Защитник','Мастерство исцеления','Амулет жреца','Подсказчик','Магитрокс','Камень жизни','фляга Зулит','Кристалл обогащения','Пожиратель','Укротитель','Магическая маска','Строт','Рубиновое кольцо','Накидка великодушия','Книга отражений','Книга знаний','Камень магии','Накидка тьмы','Камень опыта','Паучья мудрость','Разрушитель','Мастерство приручения','Сокрушитель','Бриллиантовые нарукавники','Свиток Императора','Отравленные когти','Медаль викторины','Камень алхимии','Камень силы','Камень варвара','Быстрое tanulás','Божественная сбруя','Быстрая тренировка','Убийца','Вор маны','Ускоритель','Учебник торговца','Камень удачи','Вечность','Мастерство казни','Урок уничтожения','Коробка защитных зелий','Камень мага','Камень войны','Книга Зулит','Медаль судьбы','эпический мегакристалл','Золотая монета','Кольцо Зеона','Сверкающее ожерелье','100 золотых дукатов','Сверкающее кольцо','Камень защиты','Вампир'];
	ujszavak = ['Az erő kisebb köve','Az erő köve','Sámán iszák','Okuláré','Őskőtermő zsák','A támadás kisebb köve','Démonűző idol','A Hűség záloga','Puha párna','Kőműveskanál','Az egészség kisebb köve','A védekezés kisebb köve','Bűvös síp','Isteni ital','Szent idol','Aranytojó tyúk','Az IQ kisebb köve','A mágia kisebb köve','IQ','mágia','Zafír gyűrű','Rejtőköpeny','Brutális karom','Tüskés bőr','A szerencse kisebb köve','A taumaturgia kisebb köve','Lélekszipolyozó','Ősi gyógyital','Rubin aura','Bajnoki öv','Kristálygömb','Paralizoid','Trollszarv','Lélekkút katalizátor','Protector','Gyógyító mester','Papi amulett','Isteni ihlet','Magitrox','Az élet köve','Zulit lombikja','Garling kristály','Engulfer','Állatok szeretete','Bűvös maszk','Stroath','rubin gyűrű','A jóság köpenye','A reflexek könyve','A tudás könyve','Varázskő','A sötétség leple','Tapasztalatkő','A pók bölcsessége','Destructor','Idomítás mestere','Dreath','Brilliáns karkötő','Császári tekercs','Mérgezett karom','	Kvízmedál','Alkímista kő','Az erő köve','A barbár köve','Gyors tanulás','Isteni hám','Gyors kiképzés','Drefeath','Mananyelő','Turbókristály','Kufár kézikönyv','A szerencse köve','Eternal','A harc köve','Megsemmisítő lecke','Rekesznyi védőital','A mágus köve','A harc köve','Zulit könyve','A végzet medálja','epikus megakristály','Aranytallér','Zeon gyűrűje','szikrázó nyaklánc','100 aranydukát','szikrázó gyűrű','A védelem köve','Vampire'];
	for (i=0; i<szavak.length; i++){
		while(page!=page.replace(szavak[i],ujszavak[i])) page=page.replace(szavak[i],ujszavak[i]);
	}
		
	if(strpos('vadaszat',window.location.href)){
		page = page.replace('Ты можешь охотиться на различных тварей на Поверхности, чтобы получить их энергию духа. Охотиться ты можешь, пока у тебя есть баллы действия. VPожешь начать до 20 охот одним нажатием на кнопку! Полученную энергию духа можно использовать для улучшения способностей, навыков или покупки снаряжения у торговца душами.','A felszínen élő lényekre vadászhatsz, hogy kinyerd lélekenergiájukat. Legfeljebb annyiszor vadászhatsz, ahány cselekvéspontod van, de egyszerre egy gombnyomással akár 20 vadászatot is indíthatsz. A szerzett lélekenergiából fejlesztheted tulajdonságaidat és vásárolhatsz a lélekkufárnál.').replace('Ты можешь потратить на охоту еще ','Még ').replace(' баллов действия.',' cselekvéspontot költhetsz el vadászatra.').replace('Ты получишь следующий балл действия через ','Legközelebb ').replace('>.<','> idő múlva kapsz cselekvéspontot.<').replace('Ты собираешься на охоту на ','Vadászni indulsz ').replace('</option></select>','</option></select> ideig').replace('Начать охоту','Vadászat megkezdése').replace('Дополнительные раунды охоты','További vadászatok').replace('Результат последней охоты','Legutóbbi vadászataid eredménye:').replace('Отменить охоту','Vadászat megszakítása').replace('У тебя есть еще ','A válaszra még ').replace(' на ответ.',' időd van.').replace('Следующая охота закончится через: ','A következő zsákmányig hátralevő idő: ').replace('Охота отменена.','Megszakítottad a vadászatot!').replace('Охота отменена.','Megszakítottad a vadászatot!').replace('Пока ты на охоте, посети ','Amíg vadászol, látogass el a ').replace('форум','fórumra').replace('После этой охоты, ты отправишься на поиски добычи еще ','Ezután még ').replace(' раз. У тебя осталось ',' alkalommal kutatsz zsákmány után. Még ').replace('Ты ответил правильно на этот вопрос, поэтому на охоте ты получишь ','Az ehhez a vadászathoz tartozó kérdésre helyesen válaszoltál, ').replace(' энергии духа!',' lélekenergiát fogsz kapni!').replace('Правильно!','A válasz helyes!').replace('Ты не можешь охотиться, потому что у тебя нет баллов действия','Nem tudsz vadászni, mert nincs cselekvéspontod').replace('Сейчас ты не охотишься.','Jelenleg nem vadászol.').replace('Ты на охоте','Vadászaton vagy').replace('Результаты последних охот','Legutóbbi vadászataid eredménye').replace('Охота','Vadászat').replace('Вопросы викторины','Kvízkérdések').replace('Если хочешь, ты можешь отвечать на вопросы викторины, даже когда ты не охотишься. Заранее можно ответить не более чем на 300 вопросов викторины. Сейчас у тебя готовы ответы на вопросы для следующих ','Ha akarsz, vadászattól függetlenül is válaszolhatsz kvízkérdésekre. Maximum 300 vadászatnyi kérdésre válaszolhatsz előre. Jelenleg ').replace(' охот.',' vadászatra van válaszod.').replace('Начать отвечать на вопросы викторины','Elkezdek a kvízre válaszolni').replace('Ты точно хочешь отменить эту охоту?','Biztos megszakítod a vadászatot?').replace('Ты не можешь охотиться, пока отдыхаешь!','Amíg pihensz, nem mehetsz el vadászni!').replace('Советы для новичков','Tippek kezdőknek').replace('','');
		szavak = ['мин.','сек.','Статистика','часов'];
		ujszavak = ['perc','mp.','Statisztikák','óra'];
		for (i=0; i<szavak.length; i++){
			while(page!=page.replace(szavak[i],ujszavak[i])) page=page.replace(szavak[i],ujszavak[i]);
		}
	}


	if(strpos('szovetseg',window.location.href)){
		page = page.replace('Клан','Szövetség').replace('Форум','Fórum').replace('События','Események').replace('Изгнать','Kirúgás').replace('Мои голосования','Szavazataim').replace('Постройки','Épületek').replace('Законченные постройки','Kész épületek').replace('Покинуть клан','Kilépés').replace('Список участников','Taglista').replace('Поддержка','Segítségnyújtás').replace('Рекламировать клан','Tagtoborzás').replace('Мирное соглашение:','Békeszerződés:').replace('Воюет с:','Háborúban:').replace('Мирное соглашение','Békekötés').replace('Разорвать мир','Béke felbontása').replace('Támadásи','Támadások').replace('Объявление войны','Hadüzenet').replace('Архив войн','Háborús archívum').replace('Лучший счет кланов','Szövetségi toplista').replace('Завершенные постройки','Felépített épületek').replace('изменить вывеску','Adatlap megváltoztatása').replace('Источник','Lélekkút').replace('Орда','Horda').replace('Рубиновая','Rubin').replace('Подробное описание кланов','Részletes leírás a szövetségekről').replace('форум клана','Szövetségi fórum').replace('Новая тема','Új topic').replace('Новое голосование','Új szavazás').replace('Новая тема','Új topic').replace('Новое голосование','Új szavazás').replace('Тема','Topic').replace('Открывающее сообщение','Topic-nyitó').replace('Сообщения','Hozzászólások').replace('Последнее сообщение','Utolsó hozzászólás').replace('Выделить или удалить тему может только участник с 5 и более голосами','Egy topic törléséhez ill. kiemeléséhez legalább 5 szavazat szükséges!').replace('Ты можешь использовать ','').replace('энергии духа для строительства.','lélekenergiát használhatsz fel építésre.').replace('Среднее építés клана:','A szövetség építési átlaga:').replace('голосов','').replace(', может вести építés из энергии Lélekkútа.','szavazata van.').replace('Не иметь:','Nincs:').replace('Автор','Szerző').replace('Сообщение','Hozzászólás').replace('Сообщение','Hozzászólás').replace('Новое сообщение','Hozzászólok').replace('Написать сообщение','Hozzászólás írása').replace('Написать','Hozzászólás').replace('В Lélekkútе клана','A lélekkút töltöttsége').replace('В Lélekkútе клана','A lélekkút töltöttsége').replace('Войны / Капитуляция','Háború/Kapituláció').replace('Покинуть','Kilépés').replace('У тебя нет lélekenergiát használhatsz fel építésre.','Nincs lélekenergiád amiből építkezhetnél.').replace('Магическая разведка','Kémkedés').replace('С его помощью можно добыть дополнительную информацию о других игроках, например, просмотреть распределение их очков способностей. Такая магическая разведка стоит 30 маны.','Egy végzetúrról további információkat szerezhetsz - megtudhatod azt is, mekkorák a tulajdonságai! A kémgömb használata 30 varázspontba kerül.').replace('Я хочу провести магическую разведку персонажа по имени ','Szeretnéd kikémlelni a(z) ').replace('Магическая разведка','Kémkedés').replace('</div> . <div class','</div> nevű karaktert. <div class').replace('Разведка прошла успешно!','Kémkedés sikeres!').replace('Данные разведки персонажа.','Legutóbb kémlelt karakter statisztikái:').replace('Использовать VPагический шар вновь удастся только через','A kémgömb következő használatához még ').replace('</span>.</div><div class="message_center','</span> időnek kell eltelnie.</div><div class="message_center').replace('Персонаж с таким именем не найден.','Nincs ilyen nevű karakter!').replace('Так как у тебя есть только','Csak').replace('Так как в Lélekkútе есть только','Csak').replace('энергии духа, ты не можешь использовать для строительства большее количество.','lélekenergia áll rendelkezésre, ezért csak ennyit használhatsz fel építésre.').replace('Ты вкладываешь','Építettél az épületbe').replace('энергии духа в эту постройку.','lélekenergiát!').replace('Источник пуст.','Üres a lélekkút!').replace('Lélekkút пуст.','Üres a lélekkút!').replace('Используя сгоревшие древние камни','Kiégett őskőből').replace('Используя древние камни','Őskőből').replace('древних камней','őskövet').replace('Древний камень)','Őskő)').replace(' в эту постройку.','!').replace('Эпическая битва','Epikus csata').replace('Последний эпический бой','Legutolsó epikus csatád').replace('Такой битвы нет!','Nincs ilyen csata!').replace('Ты можешь отправиться в бой против текущего эпического чудовища, с которым борется твой клан. Осторожно, эти создания ужасно сильны, тебе никогда не справиться с ними в одиночку! С каждым ударом ты ослабляешь противника, но со временем его раны излечиваются. Если ты атакуешь слишком редко или слабо, его невозможно уничтожить. Когда чудовище будет побеждено, охраняемая им добыча попадет в','Csatába indulhatsz a szövetség aktuális epikus teremtménye ellen. Vigyázz, ezek a szörnyek borzalmas hatalommal bírnak, egy végzetúr nem győzheti le őket egyedül! Minden támadással meggyengítitek a szörnyet, azonban ő sebeit képes regenerálni, ezért ha túl ritkán támadjátok, vagy keveset sebeztek rajta, nem fog elpusztulni. A szörny legyőzésével a zsákmány a szövetség ').replace('в сокровищнице','kincseskamrájába').replace('твоего клана, и вы с товарищами, торгуясь, должны определить, кому она достанется.','kerül, ahonnét a tagok licitálással szerezhetik meg.').replace('Напасть!','Támadás').replace('Ты не можешь атаковать эпическое чудовище во время отдыха!','Amíg pihensz, nem csatázhatsz az epikus szörnnyel.').replace('Ты точно хочешь напасть?','Biztos megtámadod?').replace('Текущее эпическое чудовище','Aktuális epikus ellenfél').replace('Ты сможешь снова сражаться с эпическим чудовищем через','Az epikus szörny következő támadhatóságáig van: ').replace('Ты не можешь атаковать эпическое чудовище, потому что уровень твоих жизненных очков ниже 15%!','Életerőd 15% alatt van, ezért nem támadhatod az epikus szörnyet!').replace('Только участник клана, имеющий не менее 3','A lélekkútban levő energiából csak az építhet, akinek legalább 3 ').replace(', может вести строительство из энергии Источника.',' van.').replace('Ты не можешь атаковать эпическое чудовище во время охоты!','Amíg vadászol nem csatázhatsz epikus ellenféllel!').replace('Битва с чудовищем','Entitás csata');
		szavak = ['Строить','Статистика','Сторожевая башня','Бастион','Полигон','Необходимое условие:','Башня мага','Дворец','Катализатор','Зал мира','Зал войны','Ход строительства:','Состояние: Возводится',' уровень.','Состояние:','Готово','за энергию духа.','Источник','Удалить','Из собственной LE','Из Lélekkútа','уровень ',' построен.','Магический шар','Катакомбы','Пирамида проклятия','Духовный щит','Аура','Кристаллизатор энергии','Псарня','Цитадель разрушения','Академия','Некроусилитель','Архитектурное мастерство','Врата измерений','Арена','Фокусирующий кристалл:','Эпический памятник','Камера пыток','Сокровищница','Пирамида славы','Лаборатория алхимика','Хижина мага','Из очков маны','Чудовище','Алтарь авантюриста','Храм исцеления','Шахта в преисподнюю','Замок'];
		ujszavak = ['Építés','Statisztikák','Őrtorony','Védőfal','Gyakorlótér','Előfeltétel:','Mágustorony','Palota','Katalizátor','A béke csarnoka','A háború csarnoka','Készültség:','Állapot:','. szint építése folyamatban.','Állapot:','Kész','lélekenergiából.','Lélekkút','Törlés','Saját LE-ból','Lélekkútból','','. szint felépült.','Kémgömb','Katakombák','Átokpiramis','Lélekpajzs','Aurapajzs','Energiakristályosító','Kennel','Pusztítás Citadellája','Akadémia','Nekrofun fókusz','Mesteri építészet','Térkapu','Aréna','Fókuszkristály:','Epikus emlékmű','Kínzókamra','Kincseskamra','A dicsőség piramisa','Alkimista labor','Bűvös Kunyhó','Varázspontból','Entitás','Energiaszentély','Gyógyító szentély','Alvilági verem','Kastély'];
		for (i=0; i<szavak.length; i++){
			while(page!=page.replace(szavak[i],ujszavak[i])) page=page.replace(szavak[i],ujszavak[i]);
		}
		if(strpos('szavazataim',window.location.href)){
			page = page.replace('Сейчас ты распоряжаешься','Jelenleg').replace('голосами.','szavazatod van!').replace('Передать голос','Szavazat átadása').replace('Сейчас не проходит голосований','Jelenleg nincs aktuális szavazás').replace('Я передаю свой голос товарищу:','Átadom a szavazatomat').replace('> . <','> nevű szövetségi társamnak. <').replace('Ты точно хочешь передать свой голос?','Valóban átadod a szavazatodat?').replace('Голос передан.','Szavazat átadva.').replace('Забрать переданный голос обратно','Szavazat visszakérése').replace('Сейчас у тебя','Jelenleg').replace(' , один из твоих голосов передан товарищу:',' szavazatod van, a második szavazatodat átadtad').replace('Голос возвращен','Szavazat visszakérve').replace('.</span><br>',' részére.</span><br>').replace('Ты точно хочешь вернуть себе переданный голос?','Valóban visszakéred a szavazatodat?').replace('Изначально каждый из участников клана имеет по 2 голоса. Один из них он может передать любому своему товарищу по клану, и всегда можно отозвать отданный голос обратно. В некоторых случаях (например, при принятии нового игрока в клан или исключении игрока из клана) решение принимается путем голосования – и результат голосования (ДА или НЕТ) определяется большинством голосов, но не большинством голосующих. Например, клан состоит из 10 игроков, и каждый из 9 из них передал свой голос десятому – лидеру. В этом случае у него оказалось 11 голосов, и он может принять любое решение единолично. VPожно распределить голоса между тремя игроками, в этом случае решение сможет принять этот „совет” независимо от мнения других игроков. Наконец, если каждый из игроков сохранит свои 2 голоса, решения будут приниматься равноправно, то есть демократически. При определении числа голосов большинства, необходимого для принятия решения, голоса неактивных (не заходивших в игру более двух дней) игроков не учитываются!','Kezdetben minden tag 2 szavazatot birtokol. Ebből 1 szavazatot bármikor átadhatsz egy másik tagnak, vagy visszavonhatod tőle. Bizonyos kérdésekben (pl. belépő tagok, kirúgandó tagok) a szövetség tagjai szavaznak. A válasz akkor lesz IGEN vagy NEM, ha a többség ezt szavazza meg. De nem a szavazók száma, hanem a szavazatok száma dönt. Ha pl. egy 10 tagú szövetség minden tagja átadja a szavazatát a vezetőnek, akkor neki 11 szavazata lesz, mindenki másnak 1, tehát ő egyedül dönthet. Ha 3 embernek adjátok át a szavazataitokat, akkor ez a "tanács" fog dönteni. Ha mindenki megtartja, akkor az egy demokratikus szavazás lesz. A többséghez szükséges szavazatszám megállapításakor csakis az aktív (2 napon belül belépett) játékos szavazatai számítanak!').replace('Изначально каждый из участников клана имеет по 2 голоса. Один из них он может передать любому своему товарищу по клану, и всегда можно отозвать отданный голос обратно. В некоторых случаях (например, при принятии нового игрока в клан или исключении игрока из клана) решение принимается путем ания – и результат голосования (ДА или НЕТ) определяется большинством голосов, но не большинством голосующих. Например, клан состоит из 10 игроков, и каждый из 9 из них передал свой голос десятому – лидеру. В этом случае у него оказалось 11 голосов, и он может принять любое решение единолично. VPожно распределить голоса между тремя игроками, в этом случае решение сможет принять этот „совет” независимо от мнения других игроков. Наконец, если каждый из игроков сохранит свои 2 голоса, решения будут приниматься равноправно, то есть демократически. При определении числа голосов большинства, необходимого для принятия решения, голоса неактивных (не заходивших в игру более двух дней) игроков не учитываются!','Kezdetben minden tag 2 szavazatot birtokol. Ebből 1 szavazatot bármikor átadhatsz egy másik tagnak, vagy visszavonhatod tőle. Bizonyos kérdésekben (pl. belépő tagok, kirúgandó tagok) a szövetség tagjai szavaznak. A válasz akkor lesz IGEN vagy NEM, ha a többség ezt szavazza meg. De nem a szavazók száma, hanem a szavazatok száma dönt. Ha pl. egy 10 tagú szövetség minden tagja átadja a szavazatát a vezetőnek, akkor neki 11 szavazata lesz, mindenki másnak 1, tehát ő egyedül dönthet. Ha 3 embernek adjátok át a szavazataitokat, akkor ez a "tanács" fog dönteni. Ha mindenki megtartja, akkor az egy demokratikus szavazás lesz. A többséghez szükséges szavazatszám megállapításakor csakis az aktív (2 napon belül belépett) játékos szavazatai számítanak!');
		}
		if(strpos('esemenyek',window.location.href)){
			szavak = ['принят(а) в твой клан.','покинул(а) клан.',' построил ',' в строение из Lélekkútа.','завершен','уровень, építés закончил(а)','Békekötés с кланом','расторгнуто.','Клан ','сдался. Вы победили! Награда','уже повысила Lélekkútа твоего клана.','Началась война против клана','объявил твоему клану войну! Она начнется'];
			ujszavak = ['felvételt nyert a szövetségbe.','kilépett a szövetségből.',' ','-t épített a lélekkútból.','felépült a(z)','szint, az utolsó téglát beépítette: ','A(z)','nevű szövetség felbontotta veletek a békeszerződést!','','szövetség kapitulált, győztetek! Jutalmatok','töltődés a szövetség Lélekkútjába.','A háború elkezdődött a következő szövetséggel:','szövetség hadat üzent nektek! A háború kezdete: '];
			for (i=0; i<szavak.length; i++){
				while(page!=page.replace(szavak[i],ujszavak[i])) page=page.replace(szavak[i],ujszavak[i]);
			}
		}
		if(strpos('terkapu',window.location.href)){
			page = page.replace('Térkapu позволяют охотиться на могущественных чудовищ, не принадлежащих нашему миру. Чем выше Врат, тем чаще ты можешь использовать их. Врата 1. szintű végzetúr дают 1 очко Врат измерений за 8 часов. Каждый следующий (до 12-го) уменьшает время ожидания на 20 минут. Очки Врат можно использовать в любое удобное время, но ты не сможешь собрать их больше, чем этой постройки. Активировать Врата можно 1 раз в час. VPаксимальный строения равен 24. Повышение уровня от 12 до 24 не уменьшает время ожидания, а лишь увеличивает количество очков, которые можно собрать!','A térkapun keresztül más dimenziók nagyhatalmú entitásaira vadászhatsz. Minél magasabb szintű a térkapu, annál gyakrabban! Az 1. szintű térkapu 1 térkapu pontot ad 8 óránként, minden további szint ezt 20 perccel csökkenti. A térkapu pontokat belátásod szerint használhatod fel, de egyszerre annyi térkapu pontot tartalékolhatsz, ahányadik a térkapu szintje, és legfeljebb 1 óránként aktiválhatod. A térkapu maximális szintje 50, de 12. szint felett már nem csökken a térkapu pontok regenerálódási ideje, csak azok maximuma nő. 25. szinttől a térkapu szörnyek egyre erősebbek, viszont több LE jár értük.').replace('Сейчас у тебя','Jelenleg').replace('баллов Врат измерений.','térkapu pontod van.').replace('Ты получишь следующий балл Врат измерений через','Legközelebb').replace('időnek kell eltelnie.','idő múlva kapsz térkapu pontot.').replace('Ты не можешь войти во Térkapu во время отдыха!','Amíg pihensz, nem használhatod a térkaput').replace('Войти во Térkapu','Belépés a térkapuba').replace('Ты сможешь снова войти во Térkapu через ','').replace('idő múlva támadhatsz.','idő múlva használhatod legközelebb a térkaput.').replace('','').replace('','').replace('','').replace('','').replace('','');
		}	
		if(strpos('epikus_csata',window.location.href) && page.match('<span>Támadás</span>') && epikutes){
			setTimeout(epiklink, 2000+Math.round(Math.random()*5000));;
		}
		
	}

	if(strpos('eddigi_csatak',window.location.href)){
		page = page.replace('Время','Idő').replace('Támadásует','Támadó').replace('Защищается','Védekező').replace('Исход','Eredmény').replace('Удалить выделенное','Kijelöltek törlése').replace('Новые бои','Friss csaták').replace('Дуэли','Portyák').replace('Бои на арене','Aréna csaták').replace('Битвы во Вр. изм.','Térkapu csaták').replace('Эпические битвы','Epikus csaták').replace('Архив','Archívum').replace('Бои на чемп.','Viadal csaták');
		szavak = ['Описание битвы','Статистика','Твой противник выиграл битву.','Ты выиграл(а) бой.','Ничья','энергии духа.','энергии духа и','Твоя награда','Твой соперник получил от тебя','Показать битву всем','Твой противник выиграл вызов.','Описание вызова','Ты выиграл(а) вызов.'];
		ujszavak = ['Csata leírása','Statisztikák','A csatát ellenfeled nyerte.','Te nyerted a csatát.','Döntetlen','lélekenergiát.','lélekenergia és','A jutalmad','Elszívott tőled','Csata megosztása','A párviadalt ellenfeled nyerte.','Párviadal leírása','Te nyerted a párviadalt.'];
		for (i=0; i<szavak.length; i++){
			while(page!=page.replace(szavak[i],ujszavak[i])) page=page.replace(szavak[i],ujszavak[i]);
		}
	}

	if(strpos('szakertelmek',window.location.href)){
		page = page.replace('h3_out">','h3_big_out">').replace('Пространство и время','Tér-idő befolyás szakértelmek').replace('h3_out"><h3 style="margin-top: 0pt;">Управление временем и пространством навыки','h3_big_out"><h3 style="margin-top: 0pt;">Tér-idő befolyás szakértelmek').replace('Другие','Egyéb szakértelmek').replace('Приключение','Kaland szakértelmek').replace('h3_out"><h3>Állatok','h3_big_out"><h3>Állatokkal kapcsolatos szakértelmek').replace('Боевые','Harci szakértelmek').replace('Здесь ты можешь развивать свои навыки. В отличие от способностей, большинство навыков не помогают тебе выигрывать в дуэлях напрямую, но дают другие интересные преимущества. Выбирай, какие навыки будут наиболее полезными для твоего персонажа, и улучшай их!','Itt fejlesztheted szakértelmeidet. A szakértelmek legtöbbje, a tulajdonságokkal ellentétben, nem közvetlenül a harcban való nyerési esélyeidet növelik, hanem másfajta előnyöket kínálnak. Neked kell eldöntened, hogy mit és milyen megosztásban fejlesztesz, hogy profitál abból legjobban a karaktered!').replace('Ты можешь использовать','Jelenleg').replace('энергии духа для улучшения своих навыков.','lélekenergiát használhatsz fel a szakértelmeid fejlesztésére.').replace('Усиление разумом можно использовать снова через','Legközelebb').replace('span>.<','span> múlva használhatod a tudatturbót.<').replace('Сейчас у тебя','Jelenleg').replace('маны. Усиление разумом потребует до','varázspontod van. A tudatturbó használata max.').replace('маны.','varázspontba kerül.').replace('Навык успешно улучшен','Fejlesztettél a következő szakértelmen').replace('Ты увеличил свой навык','Megnövelted').replace(' на ',' szakértelmedet ').replace('.</div><div',' ponttal.</div><div').replace('У тебя нет энергии духа для улучшения навыков ponttal.','Nincs szakértelemfejlesztésre felhasználható lélekenergiád.').replace('Забвение','Felejtés').replace('Забвение','Felejtés').replace('Ты можешь забыть только один навык каждые 168 часов. Забвение ты сможешь использовать только через','168 óránként csak egy szakértelmet felejthetsz el. Legközelebb felejthetsz:').replace('Ты забудешь навык:','Elfelejted a következő szakértelmedet:');
		szavak = ['title="Он может быть улучшен за ',' энергии духа.','новый','Ты точно хочешь улучшить навык','Установка ловушек'];
		ujszavak = ['title="',' lélekenergiából fejleszthető.','új','Valóban fejleszteni akarod a következő szakértelmet:','Csapdakészítés'];
		for (i=0; i<szavak.length; i++){
			while(page!=page.replace(szavak[i],ujszavak[i])) page=page.replace(szavak[i],ujszavak[i]);
		}
	}

	if(strpos('toplistak',window.location.href)){
		page = page.replace('Персонажи – общее','Karakterek - általános').replace('Персонажи – победы','Karakterek - győzelem/vereség').replace('Персонажи – достижения','Karakterek - eredmények').replace('Szövetségы','Szövetségek').replace('Показать моего героя!','Mutasd a saját karakterem helyezését!').replace('Или найти повелителя судьбы по имени','Vagy mutasd').replace('Найти клан под названием','Mutasd a').replace('> .','> nevű végzeturat.').replace('Имя персонажа','Karakter neve').replace('Уровень','Szint').replace('Орда','Horda').replace('Клан','Szövetség').replace('Клан','Szövetség').replace('Способностей','Tulajdonság-').replace('Навыков','Szakértelem-').replace('Выигранная LE (разность)','Szerzett LE differencia').replace('всего','összeg').replace('всего','összeg').replace('Выигранная','Szerzett').replace('(разность)','differencia').replace('Данные Лучшего счета обновляются каждые 10 минут, данные по викторине – каждые 24 часа.','A toplistát 10 percenként, a szerzett LE differenciát 8 óránként, a kvíz eredményeket csak 24 óránként frissítjük.').replace('Выигрыш','Győzelem').replace('Поражения','Vereség').replace('allat">Szint','allat">Állat').replace('питомца','szintje').replace('Макс.','Sebzés').replace('ущерб','').replace('Приключения','Kaland').replace('Квесты','Küldetés').replace('Вызовы','Kihívás').replace('Прав.<br>ответы','Kvíz').replace('Прав.<br>ответы','Kvíz').replace('Построил LE','Építés').replace('Игроков','Tag').replace('Чемпионов','Bajnok').replace('epuletek">Építés','epuletek">Épület').replace('Эпические','Epikus').replace('чудовища','szörny').replace('Показать мой клан!','Mutasd a saját szövetségem helyezését!').replace('Или найти клан под названием','Vagy mutasd').replace('Szövetségы','Szövetségek').replace('Перейти','Ugrás').replace('Перейти','Ugrás').replace('Победы','Győzelem').replace('Прав. ответы','Kvíz');
		if(strpos('szovetsegek',window.location.href)){
			page = page.replace('nevű végzeturat.','nevű szövetséget.');
		}
	}
	
	if(strpos('lelekkufar',window.location.href)){
		page = page.replace('Обмундирование для питомца','Felszerelés állatoknak').replace('Обмундирование для питомца','Felszerelés állatoknak').replace('Доступная энергия духа:','Felhasználható lélekenergia:').replace('Доступные древние камни:','Felhasználható őskő:').replace('Подробная информация о фокусирующих кристаллах','Részletek a fókuszkristályokról').replace('Szint предмета:','Tárgy szintje:').replace('Купить снаряжение и заклинания в лавке торговца душами','Lélekkufárnál megvásárolható tárgyak és varázslatok').replace('Продать предметы','Eladható tárgyaid').replace('Список','Listázás').replace('Сжатый вид','Kompakt nézet').replace('Разное','Egyéb').replace('Разное','Egyéb').replace('Дуэльный балл','Portyapont').replace('Купить предметы','Vásárolható tárgyak').replace('Доспехи','Páncélok').replace('Заклинания','Varázslatok').replace('Целебные зелья','Gyógyitalok').replace('Магические зелья','Varázsitalok').replace('Фокусирующие кристаллы','Fókuszkristályok').replace('Реликвии','Relikviák').replace('Оружие','Fegyverek').replace('Щиты','Pajzsok').replace('Перейти:','Ugrás:').replace('Перейти:','Ugrás:').replace('Доступные бриллианты духа:','Felhasználható lélekgyémánt:').replace('Поле чудес','Szerencsekerék').replace('Предметы за бриллианты духа','Csak lélekgyémántért beszerezhető').replace('','');
		szavak = ['Тип:','Цена:','Энергия духа:','Древние камни','обмундирование для питомца','щит','доспех','заклинание','фокусирующий кристалл','оружие','Для:','целебное зелье','магическое зелье','разное','Цена на продажу:','Продать','Купить','ботинки','Бриллиант духа','Ты можешь купить varázsital за древние камни только один раз в день!','Ты можешь купить gyógyital за древние камни только один раз в день!','Отражение'];
		ujszavak = ['Típus:','Ár:','Lélekenergia:','Őskő','Felszerelés állatoknak','pajzs','páncél','varázslat','fókuszkristály','fegyver','Behelyezhető:','gyógyital','varázsital','egyéb','Eladási ár:','Eladás','Vásárlás','csizma','Lélekgyémánt','Őskőért vásárolható varázsitalt naponta csak egyszer vehetsz!','Őskőért vásárolható gyógyitalt naponta csak egyszer vehetsz!','Visszacsatolás'];
		for (i=0; i<szavak.length; i++){
			while(page!=page.replace(szavak[i],ujszavak[i])) page=page.replace(szavak[i],ujszavak[i]);
		}
	}
	
	if(strpos('kuldetesek',window.location.href)){
		page = page.replace('Квесты','Küldetések').replace('Выполненные квесты','Teljesített küldetések').replace('Продемонстрировать свои успехи Предводителю Орды можно, выполняя различные задания. Из списка возможных квестов каждый раз можно выбирать для выполнения только один. Когда квест будет выполнен, на этой же странице ты сможешь получить свою награду — и с каждым новым выполненным заданием награда будет расти! Если квест окажется слишком тяжелым, от него можно отказаться и выбрать из списка другой, более простой.','Lehetőséged van küldetéseket elvállalni, amelyekkel hordaparancsnokodnak bizonyítod rátermettségedet. A listából mindig egyszerre egy küldetést választhatsz ki, amit teljesíteni akarsz. Ha sikerrel jársz, látogass el újra erre az oldalra, ekkor átveheted jutalmadat, ami lélekenergia - minél több küldetést teljesítettél, annál több! Ha egy küldetéssel semmiképp sem boldogulsz, választhatsz helyette másikat.').replace('Доступные квесты','Választható küldetések').replace('Прервать квест','Küldetés eldobása').replace('Текущий квест','Aktív küldetés').replace('(В этой таблице приведены базовые награды за квесты. Если у тебя есть предмет, увеличивающий награду, его эффект не отражается в этой таблице.)','(Ebben a táblázatban a jutalomként kapott alap LE szerepel, ha a küldetés teljesítésekor volt olyan tárgyad, ami ezt a jutalmat növeli, az itt nem szerepel)').replace('Выполненные квесты','Teljesített küldetések').replace('Ты точно хочешь принять этот квест?','Valóban kiválasztod a küldetést?').replace('Ты точно хочешь прервать выполнение квеста? (Ты сможешь принять этот квест позже, но ты потеряешь свое текущее достижение.)','Valóban eldobod a küldetést? (A küldetést később újra felveheted, de az eddig elért eredmények elvesznek)').replace('Выполнение квеста прервано.','Eldobtad a küldetést.').replace('Квест выбран!','Küldetés kiválasztva!').replace('Забрать награду','Jutalom átvétele').replace('Награда, ','Átvetted a jutalmadat, ').replace('энергии духа, получена.','lélekenergiát.').replace('Квест выполнен','Küldetés teljesítve!').replace('Квест еще не выполнен','A küldetés még nem teljesült').replace('Достигни. szintű végzetúr 8!','Légy 8. szintű!').replace('Достигни. szintű végzetúr 11!','Légy 11. szintű!').replace('Достигни. szintű végzetúr 14!','Légy 14. szintű!').replace('Достигни. szintű végzetúr 20!','Légy 20. szintű!').replace('','');
		szavak = ['Выбери квест','Награда:','энергии духа.','Ход выполнения:'];
		ujszavak = ['Küldetés kiválasztása','Jutalom:','lélekenergia.','Küldetés állapota:'];
		for (i=0; i<szavak.length; i++){
			while(page!=page.replace(szavak[i],ujszavak[i])) page=page.replace(szavak[i],ujszavak[i]);
		}
	}		

	if(strpos('allatok',window.location.href)){
		page = page.replace('Пойманные создания','Befogott állataid').replace('Отпустить тварь','Szabadon engedés').replace('Ты можешь использовать ','').replace('энергии духа для приручения питомцев.','lélekenergiát használhatsz fel az állataid idomítására.').replace('Ты пленил(а) ','Jelenleg ').replace(' тварей из ','-t fogtál be az elfogható ').replace(' возможных.',' állatból.').replace('Прирученные создания','Beidomított állataid').replace('Ты пленил максимально возможное число тварей. Если ты хочешь поймать новую, ты должен избавиться от одной из имеющихся или увеличить навык Лидерство!','Már maximális számú befogott állatod van. Ha újat akarsz elfogni, akkor előtte egyet el kell küldened, vagy növelned kell a vezetőkészség szakértelmedet!').replace('Здесь ты сможешь прочитать об обмундировании для питомцев.','Itt olvashatsz az állatoknak adható felszerelésekről bővebben.').replace('На этой странице ты можешь управлять пойманными животными. Ты можешь приручать и лечить их, снабжать боевым снаряжением и выбирать, кто из них будет помогать тебе в сражениях. Все прирученные животные характеризуются моралью (обозначается зеленой полоской). Когда ты побеждаешь в дуэли, мораль твоих сражающихся питомцев растет. Со временем она уменьшается, на скорость ее падения оказывает влияние твой навык Харизма. Если мораль питомцев упадет слишком сильно, ты должен будешь подбодрить их, или они не будут сражаться за тебя! В сражениях питомцы не только наносят повреждения противнику, но и отводят часть урона, который ты бы получил, сражаясь без них. В битву ты можешь взять только одного питомца, но на случай его ранения, пока он будет лечиться, хорошо иметь еще одного резервного питомца.','Ezen az oldalon gondoskodhatsz befogott állataidról. Idomíthatod és gyógyíthatod őket, tárgyakat adhatsz nekik, kiválaszthatod, hogy melyik kísérjen el a harcba. A beidomított állatoknál a zöld csík a morált jelöli. A morál a győztes csatáknál nő, emellett minden nap csökken, a meggyőzőkészség szakértelmed függvényében. Ha kedvenced morálja túl alacsony, ki kell engesztelned, különben nem lesz hajlandó harcolni! Állatod a harcban azon kívül, hogy sebzi ellenfeledet, képes a téged ért sebzés egy részét is kivédeni! Alapesetben egyszerre csak egy állatot vihetsz csatába, de ha egyik állatod épp gyógyul, jó, ha van egy második is. Minden állatnak lehetnek szakértelmei, ha a kennel legalább 25. szintű. Ha ez nem teljesül, az állatok képességei sem működnek, akkor sem, ha voltak neki korábban! A szakértelem pontok utólag nem átrakhatók, tehát jól gondold meg, mire költöd őket. Egy szakértelem sem lehet több, mint az állat alapszintjének a fele. Harcban csak azoknak az állatoknak a szakértelmei működnek, amelyek veled harcolnak.').replace('Отпустить тварь','Szabadon engedés').replace('Восстановить выжатого/отпущенного питомца','Elengedett/kisajtolt állat visszaállítása').replace('Твой питомец восстановил','Gyógyítottál a lényen').replace(' ÉP.',' életpontot.').replace('Чтобы эта тварь сражалась за тебя, тебе необходимо развить навык Приручение.','Ahhoz, hogy beidomíts az állatod, ki kell fejlesztened az idomítás szakértelmet!').replace('Jelenleg a befogható максимально возможное число тварей. Если ты хочешь поймать новую, ты должен избавиться от одной из имеющихся или увеличить навык Лидерство!','Már maximális számú befogott állatod van. Ha újat akarsz elfogni, akkor előtte egyet el kell küldened, vagy növelned kell a vezetőkészség szakértelmedet!').replace('Пойманные создания','Befogott állataid').replace('Имя','Név').replace('Состояние приручения','Idomítottság').replace('Ты действительно хочешь приручать тварь? (Это потребует ','Valóban idomítani akarod? (').replace('энергии духа.)','lélekenergiába fog kerülni)').replace('Приручение продлится','Az idomítás még').replace('>.</div></td></tr>','> ideig tart.</div></td></tr>').replace('Ты потратил 0 энергии духа на idomítás твари:','Idomítani küldöd az állatod').replace('.</div><div',' lélekenergiáért.</div><div').replace('Выжать энергию из твари','Sajtolás').replace('Выжать энергию из твари','Sajtolás').replace('У тебя нет lélekenergiát használhatsz fel az állataid idomítására.','Nincs lélekenergiád amit állataid idomítására fordíthatnál!').replace('У тебя нет плененных тварей.','Nics elfogott lényed.').replace('Gyógyítottál a lényen 1 életpontot lélekenergiáért.','Gyógyítottál a lényen 1 életpontot.').replace('Если он в битве, твои питомцы наносят на +10% больше урона.','Ha harcol, állataid a harcban +10% sebzést okoznak.').replace('на псарне','a kennelben').replace('Тренировать всех питомцев','Minden állat gyakoroljon').replace('Тренировать всех не сражающихся питомцев','Minden nem harcoló állat gyakoroljon').replace('Тренировать всех сражающихся питомцев','Minden harcoló állat gyakoroljon').replace('','');
		szavak = ['Имят','Имя','Базовый уровень:','Дать новую кличку','Подбодрить','Лечение','На отдых','В битву','Ты точно хочешь лечить питомца','Отпустить','>.</div','Питомец на лечении еще','Приручение','Выжать энергию духа','Ты точно хочешь выжать энергию духа из этого питомца','фамилиар','низкая мораль','час','Упражнения','Обмундирование','Питомец тренируется еще','Прервать (1 др.к.)','блок магической атаки','восстановление','преданность','сопротивление','стражник','интеллект','укус чудовища','бешенство','Изменить распределение навыков','У твоего питомца есть очки навыков','Навыки','Выбрать питомца для лечения','Лечить всех раненых питомцев','Лечить питомцев','Ты можешь лечить питомцев снова через'];
		ujszavak = ['Név','Név','Alapszint:','Új nevet adok neki','Felvidítás','Gyógyítás','Pihenni küldöm','Harcolni hívom','Valóban gyógyítasz rajta','Szabadon engedem','> idő múlva.</div','Újra gyógyíthatsz ','Idomítás','Lélekenergia sajtolás','Valóban kisajtolod a köv lényed','familiáris','alacsony morál','óra','Gyakorlás','Az állat aktuális tárgya','Szabadul a kennelből ','Megszakít (1 őskő)','varázslatelnyelés','regeneráció','hűség','rezisztencia','őrködés','intelligencia','epikus harapás','acsarkodás','Respecializáció (3 AF pontért újra eloszthatod az állat szakértelempontjait)','Az állat rendelkezésre álló szakértelempontjai','Szakértelmek','Gyógyítani jelölöm','Az összes sérült állatomat kijelölöm gyógyításra','Állatok gyógyítása','Újra gyógyíthatsz '];
		for (i=0; i<szavak.length; i++){
			while(page!=page.replace(szavak[i],ujszavak[i])) page=page.replace(szavak[i],ujszavak[i]);
		}
	}
	
	if(strpos('allatok',window.location.href) || page.match('div class="karakterlap"') || strpos('kemkedes',window.location.href)){
		kepek = tag('img');
		for(i=0; i<kepek.length; i++){
			if (strpos('creature',kepek[i].src)) {
				while(page!=page.replace(kepek[i].alt,kepek[i].src.replace('http://images.doomlord.ru/pic/creature/','').replace('.jpg',''))) page=page.replace(kepek[i].alt,kepek[i].src.replace('http://images.doomlord.ru/pic/creature/','').replace('.jpg',''));
			}
		}
	}		

	if(strpos('portyazas',window.location.href)){
		page = page.replace('Имя персонажа','Karakter neve').replace('Орда','Horda').replace('Клан','Szövetség').replace('Способность/Навык','Tulajdonság / Szakértelem').replace('ЭД','LE').replace('Установка дуэльных баллов','Portyázáspontok beállítása').replace('Симуляция.','Szimuláció.').replace('Открыть страницу персонажа','Ugrás a karakterlapjára').replace('Támadásовать повелителя судьбы по имени','Megtámadod a(z)').replace('> <','> nevű végzeturat.<').replace('Во время симуляции никто не теряет ÉP и ману, но в ней также невозможно приобрести опыт и энергию духа. <strong>Симуляция стоит древних камней: 1.','A szimuláció során nem történik ÉP és VP vesztés, de nem kapsz lélekenergiát és TP-t sem. <strong>A szimuláció 1 őskőbe kerül.').replace('Важно:</strong> Если ты выиграешь дуэль, ты не сможешь получить больше LE, чем есть у тебя на руках!','Fontos:</strong> Ha csatában győzöl, nem zsákmányolhatsz több lélekenergiát, mint amennyi éppen neked van!').replace('Поиск противника','Ellenfélkereső').replace('Искать противника с максимальной разницей в. szintű végzetúrх','Ellenfél keresése, akivel a szintkülönbségünk max.').replace('и противник - из следующей орды:','és a következő hordák valamelyikébe tartozik: ').replace(' уровней, ',' szint,').replace('Показать только участников этого клана:','Csak az alábbi szövetségbe tartozó karakterek listázása: ').replace('Поиск','Keresés').replace('Число дуэлей, которые ты можешь начать, равно числу твоих дуэльных баллов!','Legfeljebb annyiszor portyázhatsz, ahány portyázáspontod van!').replace('Сейчас у тебя','Jelenleg').replace('дуэльных баллов.','portyázáspontod van.').replace('Ты можешь атаковать других героев, даже если они охотятся или отдыхают. Иногда в колонке LE показано число, меньшее 100. Это означает, что если ты нападешь на этого противника и победишь, ты получишь меньше LE и TP, потому что он уже был атакован в последние 3 часа.','Itt támadhatod a többi végzeturat, ha épp nem vadászol vagy pihensz. A Tulajdonságösszeg mellett, a LE oszlopban ha valakinél 100-nál kisebb számot látsz, azt jelenti, hogy ha le is győzöd az illetőt, annyivel kevesebb LE-t és TP-t szerzel tőle, mivel már támadták az elmúlt 3 órában.').replace('Цвет фона означает: игрок невидим, поэтому получает +10 каждой способности.','Az ilyen háttérszínű játékosok láthatatlanok, tehát +10 bónuszt kapnak minden tulajdonságukra!').replace('Игрок получил поддержку от своего клана.','A játékos segítő kezet kapott szövetségi társaitól').replace('Игрок находится под действием Защитного зелья.','A játékos a védelem italának hatása alatt van').replace('Я хочу получать 15 дуэльных баллов в день, при этом я смогу атаковать соперников ниже моего уровня.','15 portyapontot akarok kapni naponta, és lehetőséget, hogy alacsonyabb szintűeket is támadhassak.').replace('Существуют две возможности настройки дуэльных баллов: - ты получаешь 15 дуэльных баллов в день (1 за 96 минут), и ты можешь атаковать героев как выше, так и ниже тебя по уровню ИЛИ – ты получаешь 30 дуэльных баллов в день (1 в 48 минут), но ты не можешь атаковать противников ниже тебя по уровню. Игра начинается со второй опцией, потому что на 1-2 уровне в любом случае ты не можешь атаковать игроков более низкого. szintű végzetúr, чем ты. На 3 уровне появляется возможность выбора и, если хочешь, ты сможешь атаковать персонажей более низкого уровня. Важно: Ты не можешь изменять эту настройку чаще, чем 1 раз в 48 часов. При изменении настройки твои имеющиеся дуэльные баллы обнулятся!!','A portyázás beállításakor két lehetőséged van:<br />- vagy naponta 15 portyapontot kapsz (azaz 96 percenként egyet), és akkkor korlátozás nélkül támadhatsz akár nálad alacsonyabb szintűeket is.<br />- vagy naponta 30 portyapontot kapsz (azaz 48 percenként egyet), de akkor csakis veled azonos vagy magasabb szintűeket támadhatsz. Egy első szintű játékos az utóbbi beállítással indul, hiszen első és második szinten amúgy sem támadhatsz alacsonyabb szintűeket. De 3. szinttől ha akarod, megváltoztathatod a másikra, hogy alacsonyabb szintűeket is támadhass.<br /><br /><strong>Fontos:</strong> Ezt a beállítást leggyakrabban 48 óránként változtathatod. Ha megváltoztatod, akkor a portyapontjaid nullázódnak (a baráti portyázásra vonatkozó beállítást kivéve)!').replace('Ты не можешь сражаться, когда отдыхаешь!','Amíg pihensz, nem mehetsz el portyázni!').replace('Прервать отдых','Pihenés megszakítása').replace('Ты точно не хочешь больше отдыхать?','Biztos megszakítod a pihenést?').replace('Отдых прерван.','Megszakítottad a pihenésedet.').replace('Ты уже атаковал(а) несколько раз в последние','Mivel már támadtál az elmúlt').replace('Ты уже атаковал(а) в последние','Mivel már támadtál az elmúlt').replace('минут, поэтому ты получишь','percben, ezért portyázáskor a tulajdonságaidra').replace('штрафа к каждой из способностей во время дуэли.','minuszt kapsz!').replace('штрафа к каждой из способностей во время дуэли!','minuszt kapsz!').replace('Ты вернешься в нормальное состояние через','Legközelebb').replace('</span>.</div>','</span> idő múlva leszel teljesen friss.</div>').replace('Ты сможешь изменить настройки через','Legközelebb').replace('часов.','óra múlva változtathatod meg a portyapont-beállításokat.').replace('Ты не можешь сражаться, потому что твой уровень жизненных очков недостаточно высок!','Nem mehetsz el portyázni, mert túl kevés az életpontod!').replace('При установленных условиях ты не можешь вызывать на поединок повелителей судьбы.','A beállított feltételekkel egy végzeturat sem hívhatsz ki portyázni.');
		szavak = ['Напасть!','Ты точно хочешь напасть?','Твои способности понижены из-за усталости. Ты точно хочешь атаковать?'];
		ujszavak = ['Támadás','Biztos megtámadod?','Tulajdonságaid alacsonyabbak lesznek, mivel fáradt vagy. Azért támadsz?'];
		for (i=0; i<szavak.length; i++){
			while(page!=page.replace(szavak[i],ujszavak[i])) page=page.replace(szavak[i],ujszavak[i]);
		}
	}	

	if(strpos('uzenetek',window.location.href) || strpos('esemenyek',window.location.href)){
		page = page.replace('Отправить сообщение','Üzenet írása').replace('Входящие','Beérkezett üzenetek').replace('Отправленные','Elküldött üzenetek').replace('События','Események').replace('Мировые события','Világ-események').replace('Тип','Típus').replace('Отправитель','Küldő').replace('Тема','Üzenet címe').replace('Дата','Dátum').replace('Удалить выделенное','Kijelöltek törlése').replace('Ответ','Válasz').replace('Удалить сообщение','Üzenet törlése').replace('Назад','Vissza').replace('Кому:','Címzett:').replace('Электронной почтой:','E-mailben:').replace('Сообщение будет отправлено электронной почтой, а не игровой. Эту функцию можно использовать только в сообщениях своим соклановцам, которые разрешили это, и только если их игровой статус „серый” или „красный” (неактивен более 2 дней).','Az üzenetet ne játékon belül, hanem e-mailben küldd el. Ezt a funkciót csak akkor használhatod, ha szövetségi társadnak üzensz, engedélyezte az üzenet fogadását, és státusza már szürke vagy vörös (több, mint 2 napja nem lépett be)').replace('Текст сообщения','Üzenet szövege').replace('Отправить сообщение','Üzenet elküldése').replace('Этот игрок не найден!','Nincs a címzettnek megfelelő karakter!').replace('Сообщение отправлено.','Üzenet elküldve!').replace('Сообщение пустое!','Nem töltötted ki az üzenet szövegét!').replace('(без темы)','(nincs cím)').replace('Кому','Címzett').replace('. szintű végzetúr!','. szintre léptél! ').replace('Нет входящих сообщений','Nincs üzeneted a beérkezett üzenetek között').replace('Нет отправленных сообщений','Nincs üzeneted az elküldött üzenetek között').replace('','').replace('','');
		szavak = ['В самом деле хочешь удалить?','Поздравляем, ты достиг','уровня!','Внимание: срок твоего премиум статуса истекает через ',' день!','Обновление здесь.','Ma чудесный день. Ты нашел сгоревший древний камень.','Ты выполнил следующий квест:','Твой товарищ по клану, ','передал(а) тебе один из своих голосов.','Ты поймал(а) следующее создание:','Нужно его приручить!','Твоя награда,','энергии духа','может быть получена на странице','Квесты','Большинством голосов ты принят(а) в клан','дня!','отозвал(а) ранее переданный тебе голос.','Приручение пойманной твари (',') завершено.','теперь на уровне','Чемпионат завершен!','нажми здесь',', чтобы узнать подробности.','В категории','победу в чемпионате одержал(а)',' и ','теперь в состоянии войны!','потерпел поражение от клана','Клан ','выиграл(а) на аукционе следующий предмет:',' за ','золотых дукатов.','На аукционе','золотых дукатов тобой приобретен следующий предмет:'];
		ujszavak = ['Valóban törölni akarod?','Gratulálok, a','. szintre léptél!','Figyelmeztetés: a prémium tagságod ',' napon belül lejár!','Itt újíthatod meg.','Vadászat közben kiégett őskővet találtál!','Teljesítetted a következő küldetést:','',' szövetségi társad átadta neked a szavazatát.','Elfogtad a következő állatot:','Még be kell szelídítened!','A jutalmadat,','lélekenergiát','átveheted a ','Küldetések menüpont alatt','Felvételt nyertél a következő klánba:','napon belül lejár!','nevű szövetségi társad visszavette tőled a szavazatát.','',' idomítása befejeződött.','szintet lépett, így új szintje: ','Lezajlott a bajnoki viadal. A részletekért','kattints ide.','','A bajnoki viadal','kategóriájának győztese:',' és a ','szövetségek között kitört a háború!','szövetség kapitulált, a háborút nyerte: ','','az aukción megvásárolta a következő tételt:',' ','aranydukátért.','Az aukción ','aranydukátért megvásároltad:'];
		for (i=0; i<szavak.length; i++){
			while(page!=page.replace(szavak[i],ujszavak[i])) page=page.replace(szavak[i],ujszavak[i]);
		}
	}	

	if(strpos('aukcioshaz',window.location.href) || strpos('tipus=terkapu',window.location.href)){
		page = page.replace('Получить золотой дукат','Aranydukát szerzése').replace('Посетить аукцион','Árverés megtekintése').replace('Получить золотой дукат','Aranydukát szerzése').replace('Работать на аукционе','Munka az aukciósházban').replace('За 2 балла действия','2 cselekvéspontért').replace('(золотых дукатов: 1)','(1 aranydukát)').replace('За 5 баллов действия','5 cselekvéspontért').replace('(золотых дукатов: 2)','(2 aranydukát)').replace('(Ты можешь получить золотые дукаты за работу на аукционе только 1 раз в день.)','(Cselekvéspontért naponta egyszer vehetsz dukátot)').replace('<span>За','<span>').replace('энергии духа (','lélekenergia árán (').replace('золотой дукат)</span>','aranydukát)</span>').replace('У тебя нет фокусирующих кристаллов для продажи.','Nincs eladható fókuszkristályod.').replace('Продать ожерелье:','Egy nyaklánc eladása:').replace('Продать кольцо:','Egy gyűrű eladása:').replace('Ты можешь получить золотые дукаты следующими способами::','Aranydukátot a következő módokon szerezhetsz:').replace('Восстановив здание дворца в разрушенном городе, один остроумный торговец душами открыл в нем Аукционный дом. Это место нейтрально: дуэли повелителей судьбы здесь под запретом. На аукционе продаются действительно уникальные предметы. Чтобы купить их, тебе нужно иметь достаточно золотых дукатов и участвовать в торгах. На счастье, здесь же можно и заработать дукаты.','Az aukciós házat egy romos város újjáépített palotájában hozta létre egy élelmes lélekkufár. A hely semleges, a végzeturak közötti csatározás itt tilos. Az aukciós házban egyedi tárgyakat árvereznek el, amelyekre aranydukátokkal licitálhatsz. Ugyanitt nyílik lehetőség aranydukát szerzésére is.').replace('Сейчас у тебя золотых дукатов: ','Jelenleg ').replace('.</div><center>',' aranydukátod van.</div><center>').replace('Здесь ты можешь поставить золотые дукаты на торгах за предметы. Если твою ставку перебьют, ты получишь свою ставку назад! Здесь нет предопределенных шагов ставок - если тебе действительно нужен предмет, ты можешь сразу сделать очень большую ставку. Торги продолжаются по меньшей мере 5 дней, но если ставка была сделана менее чем за 10 минут до окончания торгов, они продлеваются на 10 минут.','Itt licitálhatsz az aktuális tételekre aranydukátjaidból. Ha felüllicitálnak, a dukátokat visszakapod! Automatikus licitálás nincs, tehát ha biztosan meg akarsz szerezni egy tárgyat, told be rá azt, amit rászánsz. Egy tárgyra a licit 5 napig tart, de ha a licit vége előtt 10 percen belül licitál valaki, akkor a licit meghosszabbodik 10 perccel.').replace('Посетить аукцион','Árverés megtekintése').replace('.</div><div class="text',' aranydukátod van.</div><div class"text').replace('Скоро откроется аукционный дом – собирай золотые дукаты!','Hamarosan megnyílik az aukciós ház!').replace('Дата открытия','Nyitás').replace('Ты продал следующий предмет:','Eladtad a következő tárgyat:').replace(' и получил золотых дукатов:',', az érte kapott dukátok mennyisége:').replace('У тебя нет колец для продажи.','Nincs eladható gyűrűd.').replace('У тебя нет ожерелий для продажи.','Nincs eladható nyakláncod.').replace('Архив аукционов','Aukciós archívum').replace('Архив аукционов','Aukciós archívum').replace('Дата','Dátum').replace('Ставка','Licit').replace('Продать фокусирующий кристалл:','Egy fókuszkristály eladása:').replace('2 балла действия','2 cselekvéspontért').replace('На поверженном противнике ты находишь сокровище:','Az ellenfelednél kincset találtál:').replace('На поверженном сопернике ты находишь сокровище:','Az ellenfelednél kincset találtál:').replace('жабье варево','varangykoktél').replace('запретный нектар','tiltott nektár').replace('Полугодовой аукционный билет','Féléves aukciós bérlet').replace('желтое зелье сотворения дукатов','Sárga dukátital').replace('синее зелье сотворения дукатов','Kék dukátital').replace('Полугодовая книга мудрости','Féléves bölcsesség kötet').replace('красное зелье сотворения дукатов','Vörös dukátital').replace('Эпический сундук сокровищ','Epikus kincsesláda');
		szavak = ['заколдованное кольцо огра','золотой дукат','Продать','сияющее бронзовое кольцо','платиновое ожерелье','замороженное кольцо','мифриловый талисман','ожерелье колдовства','кольцо огра','талисман орка','магическое железное кольцо','кольцо выносливости','магический талисман','кристальное кольцо','Окончание торгов:','Текущая ставка:','Я ставлю:','Эффект:','Действие:','моментальный','реликвия','Твоя','возрастает на 1','возрастает на 3','кристальное ожерелье','изумрудный знак','стрекоза','Jelenlegi licit: нет','( Megvásárlásakor ставка)','кольцо лягушки','священное ожерелье лягушки','платиновое кольцо','слезинка','украшенное кольцо','камень некромантии','ожерелье паука','ожерелье минотавра','эпический кристалл','изумрудная ярость','фокус духа','заколдованный кристалл','облачное кольцо','кольцо летучей мыши','зараженный алмаз','кристалл разума','горящий сапфир','разрушительный камень','камень жизни Шерана','камень сжигающий кровь','регенерирующая жемчужина','мифриловое кольцо','проклятое ожерелье лягушки','заколдованный поглотитель','черный поглотитель','кольцо Тарра','троица','сапфировая звезда','северное кольцо','Бруталунтус','элементарное кольцо','оглушающее кольцо','спектральный манипулятор','Защитник','ожерелье Райа','цепь дрессировщика','Красная кристальная цепь','символ черепа','энергетический опал','алмаз гниения','магический фокус','боевой фокус','излучающая бирюза','изумрудный коготь','демонический поглотитель','святая жемчужина жизни','оглушающий камень','критический кристалл','нефрит архимага','битвенный фокус','эпический ультракристалл','пламенный сапфир','талисман горгоны','Фокус вампира','Симпатия купца','Кольцо разрушителя','камень харизмы','Ожерелье Зулит'];
		ujszavak = ['bűvös ogre gyűrű','aranydukát','Eladás','csillogó bronzgyűrű','platinum amulett','fagyott gyűrű','mithril amulett','taumaturgikus lánc','ogre gyűrű','ork amulett','mágikus vasgyűrű','az egészség gyűrűje','mágikus amulett','kristálygyűrű','Licit vége:','Jelenlegi licit:','Licitálok:','Típus:','Hatás:',' Egyszeri hatás','relikvia',' Megvásárlásakor','tulajdonságod megnő eggyel','tulajdonságod megnő hárommal','kristálynyaklánc','smaragd szimbólum','szitakötő','Még nem érkezett licit a tételre!','(a te licited)','froglok gyűrű','áldott froglok lánc','platinum gyűrű','könnycsepp','ornamentikus gyűrű','nekrofun kő','a pók lánca','minotaurusz nyaklánc','epikus kristály','haragsmaragd','lélekfókusz','bűvkristály','felhőgyűrű','denevérgyűrű','fertőzött gyémánt','tudatkristály','izzó zafír','pusztító kő','Sheran életköve','vérégető kő','regeneráló gyöngy','mithril gyűrű','átkozott froglok lánc','bűvös elnyelő','fekete elnyelő','Tharr gyűrűje','Triász','Zafír Csillag','északi gyűrű','Brutaluntusz','elementális gyűrű','kábító gyűrű','Spektrális Manipulátor','Védelmező','Raia lánca','Az Idomár Lánca','Vörös Kristálylánc','koponya szimbólum','energiaopál','rothadó gyémánt','mágiafókusz','harcfókusz','sugárzó türkizkő','karomsmaragd','démoni elnyelő','szent életgyöngy','kábítókő','kritikus kristály','főmágusi jáde','csatafókusz','epikus ultrakristály','lángoló zafír','gorgon amulett','Vámpírfókusz','A Kalmár ékessége','Megsemmisítő Gyűrű','karizmakő','Zulit nyaklánca'];
		for (i=0; i<szavak.length; i++){
			while(page!=page.replace(szavak[i],ujszavak[i])) page=page.replace(szavak[i],ujszavak[i]);
		}
	}	

	if(strpos('vilag_esemenyek',window.location.href) || strpos('aukcioshaz&sub=archivum',window.location.href)){
		szavak = ['Клан ','выиграл(а) на аукционе следующий предмет:',' за ','золотых дукатов.'];
		ujszavak = ['','az aukción megvásárolta a következő tételt:',' ','aranydukátért.'];
		for (i=0; i<szavak.length; i++){
			while(page!=page.replace(szavak[i],ujszavak[i])) page=page.replace(szavak[i],ujszavak[i]);
		}
	}	

	if(strpos('szerencsekerek',window.location.href) || strpos('avegzettemploma',window.location.href)){
	page = page.replace('повторить за 2 др. кам.','2 őskőért újra').replace('повторить за 1 др. кам.','1 őskőért újra').replace('У тебя недостаточно древних камней!','Nem forgathatod meg a szerencsekereket, mert nincs elég ősköved!').replace('Крути барабан!','Megforgatom a kart').replace('Предприимчивый торговец придумал новое прибыльное для повелителей и повелительниц судьбы развлечение. Просто поверни это разноцветное колесо Фортуны - и тебе может достаться ценный приз! Каждый день первый раз попытать удачу можно бесплатно, но можно сделать еще до 2 попыток (2 древних камня за каждую). Участвовать в этой игре можно только если сегодня ты уже был(а) на охоте или выиграл(а) в дуэли.','A lélekkufár a szerencsejátékokat kedvelő végzeturak számára eszelte ki ezt a játékot. Egy színes, mezőkre osztott korongot kelll megforgatnod. Attól függően, hogy a korong hol áll meg, melyik nyereményre mutat, attól függ, hogy mit nyersz! A játék minden nap az első alkalommal ingyenes, de forgathatsz további két alkalommal 2-2 őskőért. A szerencsekereket csak akkor használhatod, ha a mai napon már voltál vadászni vagy győztél portyában! Bizonyos értékesebb nyeremények mellé kaphatsz tapasztalati pontot is.').replace('К сожалению, сегодня колесо Фортуны для тебя больше не доступно. До завтра!','Sajnos ma már többet nem játszhatsz, gyere vissza holnap!');
		szavak = ['выиграл(а):','Божественное зелье','Заpajzsное зелье','зеленое кристальное зелье','Энергия духа','Поле чудес','золотые дукаты','лилейное питье','Меньшее зелье дуэлянта','Свиток сотворения дукатов','Защитное зелье','белое кристальное зелье','гоблинский нектар','зелье Неистовства','Мешок бриллиантов духа','Свиток сотворения дукатов','Меньшее зелье дуэлянта','Поздравляем!','Твой выигрыш:','VPалый стимулятор Врат измерений','Лотерейный билет'];
		ujszavak = ['a következőt nyerte:','Isteni ital','A védelem itala','Zöld kristályital','Lélekenergia','Szerencsekerék','Aranydukát','liliomfőzet','Kisebb portyázás itala','Dukátteremtő varázstekercs','A védelem itala','fehér kristályital','goblin nektár','A támadás itala','Lélekgyémánt csomagocska','Dukátteremtő varázstekercs','Kisebb portyázás itala','Gratulálunk!','Az ön nyereménye:','Apró térkapu stimulátor','Sorsjegy'];
		for (i=0; i<szavak.length; i++){
			while(page!=page.replace(szavak[i],ujszavak[i])) page=page.replace(szavak[i],ujszavak[i]);
		}
	}		
	
	if(strpos('pihenes',window.location.href)){
		page = page.replace('Ты на отдыхе. Тебе осталось отдыхать:','Pihensz. Pihenésedből még hátravan:').replace('Прервать отдых','Pihenés megszakítása').replace('Ma ты можешь отдыхать еще','A mai nap még').replace('раз(а). VPаксимальная продолжительность отдыха 10 часов (но ты можешь прервать отдых в любое время)','alkalommal kezdeményezhetsz pihenést. A pihenés időtartama maximum 10 óra lehet (de bármikor megszakíthatod).').replace('Когда ты отдыхаешь, ты укрываешься в своем убежище, чтобы набраться сил после тяжелых сражений. В это время твои жизненные очки и мана восстанавливаются втрое быстрее обычного, но ты не можешь охотиться или начинать дуэли. На тебя могут напасть, пока ты отдыхаешь, но в этом случае ты будешь сражаться с 10% прибавки в Защите. Отдыхать ты можешь до трех раз в день.','Pihenéskor visszahúzódsz erődítményedbe, és ott pihened ki a csaták fáradalmait. Pihenés közben életpontod és varázspontod háromszor gyorsabban regenerálódik, de nem vadászhatsz és nem portyázhatsz közben. Téged támadhatnak, de az ilyen támadások ellen kapsz +10% védekezést. Naponta max. háromszor kezdeményezhetsz pihenést.').replace('Теперь ты на отдыхе.','Megkezdted a pihenésedet.').replace('Ты точно не хочешь больше отдыхать?','Biztos megszakítod a pihenést?').replace('Отдых прерван.','Megszakítottad a pihenésedet.').replace('Отдых','Pihenés megkezdése').replace('Ты точно хочешь отдохнуть?','Valóban pihenni akarsz?').replace('Ты не можешь отдыхать во время охоты!','Amíg vadászol, nem kezdhetsz el pihenni!');
	}	

	if(strpos('egyeb',window.location.href)){
		page = page.replace('>Разрядить Источник','>Lélekkút kisütése').replace('>Медали леди Алвариель','>Lady Alvariel medáljai').replace('>Чемпионат','>Bajnoki viadal').replace('>Инфекция','>Fertőzés').replace('>Поменять орду','>Hordaváltás').replace('>Ускорение','>Gyorsítás').replace('>Специализация','>Specializáció').replace('','').replace('','').replace('','').replace('','').replace('','').replace('','').replace('','');
	}	
	
	if(strpos('kufarok_csataja',window.location.href)){
		page = page.replace('Участвовать','Részvétel').replace('Введение','Ismertető').replace('Награды','Jutalmazás').replace('Статистика / Лучшие','Statisztikák / Toplisták').replace('Бой происходит по правилам обычной дуэли, ты можешь выполнять задания и помещать противников в Камеру пыток. Но выигранная LE не зависит от LE противника, ты всегда будешь получать фиксированную сумму, зависящую от. szintű végzetúr соперника. При этом он(а) не потеряет эту сумму. Некоторые эффекты во время войны не действуют (например, иссушение духа, артефакты Скарабей и Наказание). Такие дуэли не идут в зачет войн кланов. Если ты владеешь навыком Управление энергией, ты получишь пропорционально больше LE. Игроки Бриллиантовой орды тоже получат немного больше LE, чем остальные. Остальные модификаторы не действуют. Támadás обойдется в дуэльный балл и балл состязания (баллы состязания ты получишь за охоту после начала войны). После каждой дуэли твои раны будут частично исцелены, в зависимости от навыка Исцеление ран. Навыки Ненависть к орде не будут действовать, но у торговца можно приобрести специальные реликвии, которые могут помочь в войне. Ты получишь награду в зависимости от числа одержанных побед Если ты сменишь армию, число твоих побед будет обнулено!','A csata a normál portyázás szabályai szerint zajlik, lehet küldetést teljesíteni, kínzókamrába vinni, azonban nem a játékosnál levő lélekenergia alapján rabolsz, hanem fix mennyiségű LE-t kapsz, amit az ellenfél nem veszít el, az energiahasznosításhoz hasonlóan. Bizonyos hatások viszont (lélekszívás, szkarabeusz, büntető tárgyak) nem működnek, és a normál háborúkba ezek a csaták nem számítanak bele. Aki energiahasznosítással rendelkezik, annak ez a szerzett LE arányosan nő. A támadás egy portyapontba, és egy eseménypontba kerül (eseménypontot a vadászatokért kapsz). A csata során elvesztett ÉP-d egy részét a végén visszagyógyulod, sebgyógyítás szakértelmedtől függő mértékben! A hordagyűlölet szakértelem nem érvényesül, de a kufárnál vásárolhatsz egy-egy kufár hívei ellen speciális varázstárgyat. Elért győzelmeidet számoljuk, jutalmat ez alapján fogsz kapni. Ha átállsz egy másik kufárhoz, győzelmeid nullázódnak!').replace('Сейчас ты воюешь за торговца','Jelenleg a következő kufárnak dolgozok').replace('Дуэльный балл:','Portyapont:').replace('Очки состязания:','Eseménypont:').replace('Установка дуэльных баллов','Portyázáspontok beállítása').replace('Ты не можешь сражаться, когда отдыхаешь!','Amíg pihensz, nem mehetsz el portyázni').replace('Прервать отдых','Pihenés megszakítása').replace('','').replace('','').replace('','').replace('','').replace('','').replace('','').replace('','').replace('','').replace('','');
	}	
	
	if(strpos('kalandok',window.location.href)){
		page = page.replace('Сочинить приключение','Kalandtervezés').replace('Настройки','Beállítások').replace('Использовать не более','Egy próba során legfeljebb').replace('кристальных очков в каждом испытании','kristálypontot használsz fel.').replace('изменить настройки','Megváltoztatom').replace('Сейчас у тебя кристальных очков:','Jelenleg').replace('.</div><form id',' kristálypontod van.</div><form id').replace('Когда тебе потребуется целебное или магическое зелье, ты используешь зелье самого низкого допустимого. szintű végzetúr, купленное за','A gyógy- és varázsitalok használatánál a lehető legalacsonyabb szintűt használod, és azt, amelyik').replace('</select>  <div class="gomblink2','</select> kerül.<div class="gomblink2').replace('изменить настройки','Megváltoztatom').replace('Kalandok, написанные тобой','Általad írt kalandok').replace('Сейчас у тебя нет активного приключения','Jelenleg nincs elvállalható kalandod.').replace('Ты не можешь проходить приключение во время охоты!','Amíg vadászol, nem kalandozhatsz!').replace('древние камни или энергию духа','lélekenergiába vagy őskőbe').replace('только энергию духа','csak lélekenergiába').replace('только древние камни','csak őskőbe').replace('Иногда во время охот, дуэлей или вызовов тебе выпадет шанс поучаствовать в настоящем приключении! Ты сможешь вернуться на замеченное место и преодолеть испытания (нажми на кнопку Kalandok, чтобы увидеть список доступных приключений).<br>','').replace('По ходу приключения ты должен будешь показать мастерство владения некоторыми навыками и способностями. В награду за выполненное приключение ты получишь бриллианты духа, которые сможешь потратить у торговца на уникальное снаряжение! (Если приключение пройти не удалось, ты сможешь попробовать на следующий день.) <br>','').replace('Во время испытаний к твоим способностям будет добавлено случайное число, и если результат будет выше необходимого минимального - испытание пройдено. К специализированной способности будет также добавлено 10%! Повысить вероятность успеха в испытании ты можешь с помощью кристальных очков: определи, сколько кристальных очков (максимально) ты хочешь использовать в испытании. Кристальные очки можно получить в вызовах, за повторные квесты, или выпив специальное зелье.','Vadászataid és portyázásaid során néha érdekes és izgalmas kalandokat találhatsz. Ha egy ilyen kalandot találsz, a kaland helyszínére később visszatérhetsz, és megpróbálkozhatsz vele. Ehhez az alábbi menüből ki kell választanod a kaland nevét (ha van ilyen). A kaland végrehajtása során különböző feladatokat fogsz kapni. Ha a kalandot sikeresen végrehajtod, jutalmul lélekgyémántokat kapsz, amelyekért a lélekkufárnál egyedi tárgyakat vásárolhatsz! Ha a kalanddal kudarcot vallasz, csak a következő nap próbálkozhatsz vele ismét. A próbák során vesszük az adott tulajdonságod v szakértelmed, hozzáadunk egy szinttől függő véletlenszámot, és ha eléri a küszöböt, a próba sikeres. A specializált tulajdonságodra 10% bónuszt kapsz! A siker esélyét kristálypontok segítségével növelheted. Te döntöd el, hogy egy próba során maximum mennyi kristálypontot használsz fel. Kristálypontokat ismételhető küldetésekért, vagy a lélekkufárnál kapható kristályitalok felhasználásával szerezhetsz.').replace('Ты можешь собрать не более 10 не пройденных приключений - если у тебя их уже 10, больше ты их не найдешь, пока не выполнишь одно из имеющихся.','Egyszerre max. 10 kalandod lehet, ha már 10 aktív kalandod van, nem találsz többet.').replace('Если у тебя достаточно кристальных очков, ты можешь написать новое приключение для других игроков! (Для этого нажми на кнопку Написать приключение.)','Ha már van kristálypontod, saját magad is írhatsz kalandot a többi játékos számára! Ehhez a kalandtervezés gombra kattints.');
	}
	
	tartalom.innerHTML = page;
}
	
//Banner elrejtes
	style = document.createElement('style');
	style.innerHTML = '#linklista, .fb_like, .hr, .alsomenu, .banner, .bannerek, .fust, .google_adsense, #harmonet, #harmonet_linksor, #hirblock, #fo_flash, .also_banner {display: none !important} .battle .hr {display: block !important}';
	document.getElementsByTagName('body')[0].appendChild(style);

	
//órafel
	systime = document.createElement('span');
	systime.id = 'systime';
	id('welcome').insertBefore(systime,id('welcome').firstChild);
	id('welcome').innerHTML = id('welcome').innerHTML.replace('Приветствуем','');
	setInterval(systimetick, 500);

//adatlekérések
	var now = Math.floor(new Date().getTime()/1000/3600/24);
	var username = id('welcome').getElementsByTagName('strong')[0].innerHTML;
	var vilag = strcut('//','.',window.location.href);
	azonosito = "ru_" + vilag + "_" + username

//maxertek lekérése
	if (document.title.indexOf(username)>-1 && !strpos('targylista',window.location.href)) {
		maxok = getByClass('span','csik_szoveg');
		maxe = maxok[0].textContent.match(/\/ [\.\d]+/g);
		maxep = parseInt(maxe[0].substring(2).replace( /\./, "" ));
		GM_setValue(azonosito+"_maxep", maxep);
		maxv = maxok[1].textContent.match(/\/ [\.\d]+/g);
		maxvp = parseInt(maxv[0].substring(2).replace( /\./, "" ));
		GM_setValue(azonosito+"_maxep", maxep);
		maxt = maxok[2].textContent.match(/\/ [\.\d]+/g);
		maxtp = parseInt(maxt[0].substring(2).replace( /\./, "" ));
		GM_setValue(azonosito+"_maxep", maxep);
		GM_setValue(azonosito+"_maxvp", maxvp);
		GM_setValue(azonosito+"_maxtp", maxtp);
	}
	var maxep = GM_getValue(azonosito+"_maxep",0);
	var maxvp = GM_getValue(azonosito+"_maxvp",0);
	var maxtp = GM_getValue(azonosito+"_maxtp",0);
	karilap = id('welcome').innerHTML;
	var matches = document.getElementById('karakter_ep').innerHTML;
	ep = parseInt(matches.replace(".","").replace(".","").replace(".",""));
	epsz = Math.round(ep/maxep*10000)/100;
	var matches = document.getElementById('karakter_vp').innerHTML;
	vp = parseInt(matches.replace(".","").replace(".","").replace(".",""));
	vpsz = Math.round(vp/maxvp*10000)/100;
	id('welcome').innerHTML = id('welcome').innerHTML.replace('ÉP</span> / ','ÉP</span><br>');
 	getByClass('span','ep')[0].innerHTML = getByClass('span','ep')[0].innerHTML.replace("ÉP",'ÉP <span style="color: '+rgbepsz(epsz)+'">('+epsz+'%)</span>');
 	getByClass('span','vp')[0].innerHTML = getByClass('span','vp')[0].innerHTML.replace('VP','VP <span style="color: '+rgbepsz(vpsz)+'">('+vpsz+'%)');
	var matches = karilap.match(/[\.\d]+ TP/g);
	if(matches){
		tp = parseInt(matches[0].substring(0,matches[0].length-3).replace(/\./g,""));
		tpsz = Math.round(tp/maxtp*10000)/100;
		karilap = id('welcome').innerHTML;
		var matches = document.getElementById('karakter_le').innerHTML;
		le = parseInt(matches.replace(".","").replace(".","").replace(".",""));
		le += '';
		var lastle = parseInt(GM_getValue(azonosito+"_lastle",le));
		GM_setValue(azonosito+"_lastle",le);
		var lasttp = parseInt(GM_getValue(azonosito+"_lasttp",tp));
		GM_setValue(azonosito+"_lasttp",tp);
		var tpdif = parseInt(GM_getValue(azonosito+"_tpdif",0));
		var ledif = parseInt(GM_getValue(azonosito+"_ledif",0));
		if (lasttp<tp && lastle<le){
			ledif=parseInt(ledif)+parseInt(le)-parseInt(lastle);
			ledif +='';
			GM_setValue(azonosito+"_ledif",ledif);
			tpdif=parseInt(tpdif)+parseInt(tp)-parseInt(lasttp);
			tpdif +='';
			GM_setValue(azonosito+"_tpdif",tpdif);
		}
		else if (lastle<le){
			ledif=parseInt(ledif)+parseInt(le)-parseInt(lastle);
			ledif +='';
			GM_setValue(azonosito+"_ledif",ledif);
		}
		if (lasttp>tp || ledif<0){
			GM_setValue(azonosito+"_ledif",0);
			ledif=0;
			GM_setValue(azonosito+"_tpdif",0);
			tpdif=0;
			GM_setValue(azonosito+"_letpreset", false);
			window.location.reload();
		}
		LETP = Math.round(parseInt(ledif)/parseInt(tpdif)*100)/100;

		id('welcome').innerHTML = id('welcome').innerHTML.replace('TP</span><div class="linke','TP <span style="color: '+rgbepsz(100-tpsz)+'">('+tpsz+'%)</span><br><span style="color: darkgrey">'+LETP+' LE/TP</span><div class="linke');
	}

//targykompakt kivonat + kennelkalkhoz jogar észrevétel
	var targylistak = getByClass('div','targylista_tipus');
	for (i=0; i<targylistak.length; i++){
		if (targylistak[i].innerHTML.indexOf('Jutalomrelikviák')>0){
			var jogar = 0;
			if (targylistak[i].innerHTML.indexOf('скипетр мотивации')>0){
				if (targylistak[i].innerHTML.indexOf('Платиновый скипетр мотивации')>0){jogar=20;}
				if (targylistak[i].innerHTML.indexOf('Золотой скипетр мотивации')>0){jogar=15;}
				if (targylistak[i].innerHTML.indexOf('Серебряный скипетр мотивации')>0){jogar=10;}
				if (targylistak[i].innerHTML.indexOf('Бронзовый скипетр мотивации')>0){jogar=5;}
			}
			GM_setValue(azonosito+"_jogar", jogar);
		}
	}
	style = document.createElement('style');
	style.innerHTML = '#targy_popup .targy_kep {height: 50px !important} #targy_popup .targy_kep img {max-height: 50px !important; width: inherit !important;} .esszencia_talal {text-decoration: blink; color: #FF7733} .harcolo_leny img {width: 30% !important} .harcolo_leny {font-size: 10px} .harcolo_leny .felszereles_kep {width: 10% !important; height: 10% !important} .parameterek {width: 220px !important; font-size: 10px !important} .egytargy div:not([class]), .targyak_block .h3_out, .targylista_block .h3_out {display: none !important} .egytargy div:not([class]), .targyak_block .h3_out, .targylista_block .h3_out{display: none !important} .nevadas .gomblink {clear: both;}';	
	if(!strpos('targylista',window.location.href) && !strpos('lelekkufar',window.location.href)){
		style.innerHTML += '.relikvia {width: 100px !important;} .relikvia .targy_kep img {width: 100px !important;} .karakterlap .targylista .egytargy {height: 92px !important} .viselheto .targy_kep img {width: 45% !important;} .viselheto img.fk_kep {width: 15% !important;} .targylista .egytargy .targy_kep img {width: 45% !important;} .targylista .egytargy .targy_kep img.fk_kep {width: 15% !important;}';	
	}
	if(strpos('targylista',window.location.href)){
		style.innerHTML += '.targy_kep img {width: 67% !important;} img.fk_kep {width: 30% !important; float: right;}';	
	}
	if(strpos('lelekkufar',window.location.href)){
		style.innerHTML += '.targy_kep img {width: 25% !important;} img.fk_kep {width: 10% !important;}';	
	}
	document.getElementsByTagName('body')[0].appendChild(style);
	jobb = document.getElementById('jobb');
	if (jobb.innerHTML.match('div class="relikviak')) {
		getFirstByClass('div','relikviak').style.display = "none";
		getFirstByClass('div','relikviak').previousSibling.addEventListener('click',function(){
			getFirstByClass('div','relikviak').style.display = "block";
		},true);
	}
	
//Épületek leírások összecsukása + kennelkalkhoz kennel szint észlelés
	if (strpos('szovetseg&sub=epuletek',window.location.href) || strpos('szovetseg&sub=kesz_epuletek',window.location.href)) {
		epuletlist=getByClass('div','h3_out');
			for (var i=0; i<epuletlist.length; i++){
				if (epuletlist[i].textContent.match( /ennel/i )!=null){
					kennel =epuletlist[i].textContent.replace('.','').replace('Kennel ','');
					GM_setValue(azonosito+"_kennel", kennel);
				}
			}
		epuletek = getByClass('div','epulet_leiras');
		epuletkepek = getByClass('div','epulet_kep');
		epitheto = getByClass('div','allapot');
		egyepulet = getByClass('div','egyepulet');
		if (epitheto.length>0){
			for (i=0; i<epuletek.length; i++){
				epuletek[i].innerHTML = epuletek[i].innerHTML.substring(epuletek[i].innerHTML.indexOf('<div class'));
			}
		} 
		else {
			for (i=0; i<epuletek.length; i++){
				epuletek[i].innerHTML = ' ';
			}
			for (i=0; i<epuletkepek.length; i++){
				epuletkepek[i].innerHTML = ' ';
			}
			for (i=0; i<egyepulet.length; i++){
				egyepulet[i].className = ' ';
			}
		}
	}

	//Állatok oldal compact kinézete
	if(strpos('allatok',window.location.href)){
		style.innerHTML = '.text {display: none !important} .esszencia_talal {text-decoration: blink; color: #FF7733} .targy_kep {position: relative !important} .targy_kep img {width: 25% !important;} #targy_popup .targy_kep img{width: 50% !important;} .harcolo_leny img {width: 30% !important} .harcolo_leny {font-size: 10px} .harcolo_leny .felszereles_kep {width: 10% !important; height: 10% !important} img.fk_kep {width: 10% !important; position: absolute !important; bottom: 5px !important; right: 72px !important;} .fk_torlese {position: absolute !important; width: 50px !important; height: 40px !important; background: none; display: block !important; right: 42px; bottom: 5px; font-size: 0px } .fk_torlese a {display: block; height: 50px; background: none; bottom: 0px; right: 25px; position: absolute; width: 50px; font-size: 0px}  .parameterek {width: 220px !important; font-size: 10px !important} .egytargy div:not([class]), .targyak_block .h3_out, .targylista_block .h3_out {display: none !important} .egytargy div:not([class]), .targyak_block .h3_out, .targylista_block .h3_out{display: none !important} .nevadas .gomblink {clear: both;}';
	}
	if (strpos('index.php?m=allatok', window.location.href)){
	
		kepek = tag('img');
		for(i=0; i<kepek.length; i++){
			if (strpos('creature',kepek[i].src)) {
				kepek[i].width = 85;
				kepek[i].width = 68;
			}
		}
		// szaki_kinyit = getByClass('a', 'gomblink2');
		// for(i=0; i<szaki_kinyit.length; i++){
			// if (szaki_kinyit[i].textContent == "Szakértelmek") {
				// szaki_kinyit[i].setAttribute('style','display: none');
			// }
		// }
		felszkepek = getByClass('img', 'felszereles_kep');
		for (i=0; i<felszkepek.length; i++) {
			felszkepek[i].parentNode.parentNode.setAttribute('style','display: none');
			sib = felszkepek[i].parentNode.parentNode.previousSibling;
			if (!strpos('Alapszint',sib.textContent)) sib = sib.previousSibling;   
			if (!strpos('Alapszint',sib.textContent)) sib = sib.previousSibling;   
			elem = sib.getElementsByTagName('td')[1];
			splitpos = sib.getElementsByTagName('td')[1].innerHTML.indexOf('<br>');
			elem.width = 200;
			if(strpos('Nevet adok neki',elem.innerHTML)){elem.innerHTML = elem.innerHTML.substring(0,splitpos) + '<br style="width: 200px; clear: both" /><img src="'+felszkepek[i].src + '" style="width: 50px; height: 50px; float: right; margin-top: 5px;"/>'+ elem.innerHTML.substring(splitpos+4);}
			else{elem.innerHTML = elem.innerHTML.substring(0,splitpos) + '<br style="width: 200px; clear: both" /><img src="'+felszkepek[i].src + '" style="width: 50px; height: 50px; float: right; margin-top: 5px;"/>'+ elem.innerHTML.substring(splitpos+4)+(sib.innerHTML.indexOf('adok neki')==-1?'<a class="gomblink" style="width: 150px;"><span>&nbsp</span></a>':'');}
			}
		forms = document.getElementsByTagName('form');
		for (i=0; i<forms.length; i++){
			if (!strpos('Felszerelés',forms[i].textContent)) continue;
			sib = forms[i].parentNode.parentNode.previousSibling;
			if (!strpos('Alapszint',sib.textContent)) sib = sib.previousSibling;
			if (!strpos('Alapszint',sib.textContent)) sib = sib.previousSibling;
			forms[i].setAttribute('style','width: 170px; margin-left: 3px;');
			forms[i].innerHTML = forms[i].innerHTML.replace('Felszerelés:','');
			forms[i].innerHTML = forms[i].innerHTML.replace('<br>','');
			sib.getElementsByTagName('td')[2].appendChild(forms[i]);
		}
	}
	document.getElementsByTagName('body')[0].appendChild(style);

var ver_check = GM_getValue("ver_check",0);
var now = Math.floor(new Date().getTime()/1000/3600/24);
if (now > ver_check) {
var url = 'http://userscripts.org/scripts/source/114495';
   GetUrl('GET', url, '', function (res) {
     pattern = /version\s+([\d\.]+)/img;
	 if (version != pattern.exec(res.responseText)[1]){
		GM_openInTab('http://userscripts.org/scripts/show/114495');
		alert ("Van újabb oroszfordít verzió!\nHozzá tartozó lapot megnyitottam!");
	 }	
   });
   GM_setValue("ver_check", Math.round(now));
}
	
function strpos(needle, hay) {
 if (!hay) return false;
 return hay.indexOf(needle)!=-1;
}

function getByClass(tag, classname){
	items = [];
	elems = document.getElementsByTagName(tag);
	for (i=0; i<elems.length; i++){
		if (elems[i].className==classname) {
			items.push(elems[i]);
		}
	}
	return items;
}

function id(elem){
	return document.getElementById(elem);
}

function systimetick(){
 id('systime').innerHTML = id('rendszerido').innerHTML;
}

function strcut(from, to, str){
	start = page.indexOf(from);
	if (to=='') {
		end = page.length;
	} else {
		end = page.indexOf(to);
	}
	return page.substring(start+from.length, end);
}

function rgbepsz(szazalek){
	r = szazalek>50 ? Math.round(255-2*255*(szazalek-50)/100) : 255;
	g = szazalek>50 ? 255 : Math.round(2*255*szazalek/100);
	b = 0;
	return 'rgb('+r+','+g+','+b+')';
}

function GetUrl(method, url, data, callback){
  GM_xmlhttpRequest({
    method: method,
    url: url,
    data: data,
    headers: { 'Content-type':'application/x-www-form-urlencoded', },
    onload: callback
  });
}

function tag(tagname){
	return document.getElementsByTagName(tagname);
}

function getFirstByClass(tag, classname){
	items = getByClass(tag, classname);
	return items[0];
}

//Kémstat rész
mennyi = document.getElementById('fomenu').getElementsByTagName('li');
for (i=0; i<mennyi.length; i++){
		elem = document.getElementById('fomenu').getElementsByTagName('li')[i];
		if (elem.textContent == "Játékleírás"){
			elem.innerHTML='<a href="http://'+strcut('//','.',window.location.href)+'.doomlord.ru/index.php?m=gyik">Kémkedéseid</a>';
		}
		if (elem.textContent == "GY.I.K."){
			elem.innerHTML='<a href="http://'+strcut('//','.',window.location.href)+'.doomlord.ru/index.php?m=jatekleiras">Kém. egyénekre</a>';
		}
}

if (strpos('sub=kemkedes',window.location.href)) {
	kep = tag('img');
	for (i=0; i<kep.length; i++ ) {
		if ((strpos('/halloween',kep[i].getAttribute('src')) || strpos('/avatar',kep[i].getAttribute('src'))) && id('welcome').getElementsByTagName('strong')[0].innerHTML != kep[i].getAttribute('alt')) {
			var username = kep[i].getAttribute('alt')
		}
	}
	
	fejlec = getByClass('div','h3_out');
	for (i=0; i<fejlec.length; i++ ) {
		if (fejlec[i].innerHTML.match('. szintű')){szint = parseInt(fejlec[i].textContent.match(/\d+/g));}
	}
	
	var tul = 0;
	var szaki = 0;
	var epites = 0;
	var trs = document.getElementsByTagName('tr');
	for ( var i = 0; i < trs.length; i++ ) {
		if ( ( trs[i].children.length == 2 ) && ( trs[i].firstChild.getAttribute( "width" ) == 200 )) {
			if (trs[i].firstChild.innerHTML.match( /lajdon/i )!=null){
				tul=trs[i].lastChild.innerHTML;
			}
			if (trs[i].firstChild.innerHTML.match( /rtelem/i )!=null){
				szaki=trs[i].lastChild.innerHTML;
			}
			if (trs[i].firstChild.innerHTML.match( /sszes/i )!=null){
				epites=trs[i].lastChild.innerHTML.replace( /\./g, "" );
			}
		}
	}
	td = document.getElementsByTagName('td');
	for (i=0; i<td.length; i++){
		if(td[i].innerHTML.match('Erő:')){ero = td[i+2].innerHTML;}
		if(td[i].innerHTML.match('Támadás:')){tam = td[i+2].innerHTML;}
		if(td[i].innerHTML.match('Védekezés:')){ved = td[i+2].innerHTML;}
		if(td[i].innerHTML.match('Egészség:')){egs = td[i+2].innerHTML;}
		if(td[i].innerHTML.match('IQ:')){iq = td[i+2].innerHTML;}
		if(td[i].innerHTML.match('Mágia:')){mag = td[i+2].innerHTML;}
		if(td[i].innerHTML.match('Taumaturgia:')){tau = td[i+2].innerHTML;}
	}
	szer = 0;
	spec = getByClass('span','szerencse');
	if (spec.length>0){szer = spec[0].innerHTML;}
	csikok = getByClass('span','csik_szoveg');
	ep = csikok[0].textContent.substring(0,(csikok[0].textContent.length-6)/2);
	tp = 'NaN';
	if (csikok[2]) { 
		tp = csikok[2].textContent.substring(0,csikok[2].textContent.length-3);
	}
	now = new Date().toLocaleString();
	nowsec = Math.floor(new Date().getTime()/1000);

	azonosito = username;
	siker = getByClass('div','success');
	var kemlelesek = eval(GM_getValue('kemlelesek',[]));
	if (siker.length>0 && siker[0].innerHTML=='Kémkedés sikeres!') {
		kemlelesek.push({
			nev: azonosito,
			ep: ep,
			tp: tp,
			tul: tul,
			szaki: szaki,
			epites: epites, 
			ido: now,
			sec: nowsec,
			ero: ero,
			tam: tam,
			ved: ved,
			egs: egs,
			iq: iq,
			mag: mag,
			tau: tau,
			szer: szer,
			szint: szint
		});
	if (kemlelesek.length>datamax) kemlelesek.splice(0, kemlelesek.length-datamax);
		GM_setValue("kemlelesek",kemlelesek.toSource());
	}
		
	var ok = eval(GM_getValue('ok',[]));
	var okk = eval(GM_getValue('okk',[]));
	for (var i=0; i<kemlelesek.length; i++){
		if (kemlelesek[i].nev == azonosito) {
			ok.push({id: i});
			if (ok.length>sormax) ok.splice(0, ok.length-sormax);
			if (okk.length<1){okk.push({id: i});}
			else{
				if (kemlelesek[i].tul != kemlelesek[okk[okk.length-1].id].tul) {okk.push({id: i});}
				if (okk.length>sormax) okk.splice(0, okk.length-sormax);
			}
		}
	}
	style = document.createElement('style');
	style.innerHTML = '.mytable, .mytable td, .mytable th {border-collapse: collapse; border-width: 1px; border-style: solid; border-color: gray; margin: 0px; padding: 0px;}';
	document.getElementsByTagName('body')[0].appendChild(style);
	scriptbox = document.createElement('div');
	scriptbox.setAttribute("style", "display: none; text-align: center; color: silver; font-weight: normal");
	fejlec = '<table class="mytable" WIDTH=100%><thead><TR style="color:green"><TH>Karakternév</TH><TH>Szint</TH><TH>ÉP</TH><TH>TP</TH><TH>Tul</TH><TH>Szaki</TH><TH>Építés</TH><TH>Kémlelés ideje</TH></TR></thead>';
	lezaras = '</table>';
	var tabla = ""
	if (ok.length==1) {
		for (var j=0; j<ok.length; j++){
			k = ok[j].id;
			tabla = tabla+'<TR><TD>'+username+'</TD><TD>'+kemlelesek[k].szint+'</TD><TD>'+kemlelesek[k].ep+'</TD><TD>'+kemlelesek[k].tp+'</TD><TD>'+kemlelesek[k].tul+'</TD><TD>'+kemlelesek[k].szaki+'</TD><TD>'+kemlelesek[k].epites+'</TD><TD>'+kemlelesek[k].ido+'</TD></TR>';
		}		
	}
	if (ok.length>1) {
		for (var j=0; j<ok.length; j++){
			k = ok[j].id;
			if (j==0){
				tabla = tabla+'<TR><TD>'+username+'</TD><TD>'+kemlelesek[k].szint+'</TD><TD>'+kemlelesek[k].ep+'</TD><TD>'+kemlelesek[k].tp+'</TD><TD>'+kemlelesek[k].tul+'</TD><TD>'+kemlelesek[k].szaki+'</TD><TD>'+kemlelesek[k].epites+'</TD><TD>'+kemlelesek[k].ido+'</TD></TR>';
			}
			else{
				n = ok[j-1].id;
				tabla = tabla+'<TR><TD>'+username+'</TD><TD>'+kemlelesek[k].szint+'</TD><TD>'+kemlelesek[k].ep+'</TD>';
				if (kemlelesek[k].tp != kemlelesek[n].tp){tabla = tabla+'<TD style="color:lightgreen">'+kemlelesek[k].tp+'</TD>'; }
				else { tabla = tabla+'<TD>'+kemlelesek[k].tp+'</TD>'; }
				if (kemlelesek[k].tul != kemlelesek[n].tul){tabla = tabla+'<TD style="color:orange">'+kemlelesek[k].tul+'</TD>'; }
				else { tabla = tabla+'<TD>'+kemlelesek[k].tul+'</TD>'; }
				if (kemlelesek[k].szaki != kemlelesek[n].szaki){tabla = tabla+'<TD style="color:orange">'+kemlelesek[k].szaki+'</TD>'; }
				else { tabla = tabla+'<TD>'+kemlelesek[k].szaki+'</TD>'; }
				if (kemlelesek[k].epites != kemlelesek[n].epites){tabla = tabla+'<TD style="color:orange">'+kemlelesek[k].epites+'</TD>'; }
				else { tabla = tabla+'<TD>'+kemlelesek[k].epites+'</TD>'; }
				tabla = tabla+'<TD>'+kemlelesek[k].ido+'</TD></TR>';
			}
		}
		var idotabla = "";
		past = kemlelesek[k].sec - kemlelesek[n].sec;
		if (past<6000){
			ep1= kemlelesek[n].ep.replace( /\./, "" );
			ep2= kemlelesek[k].ep.replace( /\./, "" );
			maxok = getByClass('span','csik_szoveg');
			maxe = maxok[0].textContent.match(/\/ [\.\d]+/g);
			maxep = parseInt(maxe[0].substring(2).replace( /\./, "" ));
			epsec = past/(ep2-ep1);
			ep15 = Math.floor(maxep*15/100);
			sec15 = kemlelesek[k].sec+Math.floor((ep15-ep2)*epsec);
			var d=new Date();
			d.setTime(sec15*1000);
			if (ep2<ep15 && ep1<ep2) {
			lezaras = '</table><br /><table ALIGN="center" style="color:yellow">Kémkedéseid alapján a 15%-ot megközelítőleg '+d.toLocaleString()+'-kor éri el!</table>';	
			}
		}	
	}
	fejlec2 = '</table><br><table class="mytable" WIDTH=100%><thead><TR style="color:green"><TH>Karakternév</TH><TH>Erő</TH><TH>Tám</TH><TH>Véd</TH><TH>Egs</TH><TH>IQ</TH><TH>Mág</TH><TH>Tau</TH><TH>Szer</TH><TH>Kémlelés ideje</TH></TR></thead>';
	var tabla2 = ""
	if (okk.length==1) {
		for (var j=0; j<okk.length; j++){
			k = okk[j].id;
			tabla2 = tabla2+'<TR><TD>'+username+'</TD><TD>'+kemlelesek[k].ero+'</TD><TD>'+kemlelesek[k].tam+'</TD><TD>'+kemlelesek[k].ved+'</TD><TD>'+kemlelesek[k].egs+'</TD><TD>'+kemlelesek[k].iq+'</TD><TD>'+kemlelesek[k].mag+'</TD><TD>'+kemlelesek[k].tau+'</TD><TD>'+kemlelesek[k].szer+'</TD><TD>'+kemlelesek[k].ido+'</TD></TR>';
		}		
	}
	if (okk.length>1) {
			for (var j=0; j<okk.length; j++){
			k = okk[j].id;
			if (j==0){
				tabla2 = tabla2+'<TR><TD>'+username+'</TD><TD>'+kemlelesek[k].ero+'</TD><TD>'+kemlelesek[k].tam+'</TD><TD>'+kemlelesek[k].ved+'</TD><TD>'+kemlelesek[k].egs+'</TD><TD>'+kemlelesek[k].iq+'</TD><TD>'+kemlelesek[k].mag+'</TD><TD>'+kemlelesek[k].tau+'</TD><TD>'+kemlelesek[k].szer+'</TD><TD>'+kemlelesek[k].ido+'</TD></TR>';
			}
			else{
				n = okk[j-1].id;
				tabla2 = tabla2+'<TR><TD>'+username+'</TD>';
				if (kemlelesek[k].ero != kemlelesek[n].ero){tabla2 = tabla2+'<TD style="color:orange">'+kemlelesek[k].ero+'</TD>'; }
				else {tabla2 = tabla2+'<TD>'+kemlelesek[k].ero+'</TD>'; }
				if (kemlelesek[k].tam != kemlelesek[n].tam){tabla2 = tabla2+'<TD style="color:orange">'+kemlelesek[k].tam+'</TD>'; }
				else {tabla2 = tabla2+'<TD>'+kemlelesek[k].tam+'</TD>'; }
				if (kemlelesek[k].ved != kemlelesek[n].ved){tabla2 = tabla2+'<TD style="color:orange">'+kemlelesek[k].ved+'</TD>'; }
				else {tabla2 = tabla2+'<TD>'+kemlelesek[k].ved+'</TD>'; }
				if (kemlelesek[k].egs != kemlelesek[n].egs){tabla2 = tabla2+'<TD style="color:orange">'+kemlelesek[k].egs+'</TD>'; }
				else {tabla2 = tabla2+'<TD>'+kemlelesek[k].egs+'</TD>'; }
				if (kemlelesek[k].iq != kemlelesek[n].iq){tabla2 = tabla2+'<TD style="color:orange">'+kemlelesek[k].iq+'</TD>'; }
				else {tabla2 = tabla2+'<TD>'+kemlelesek[k].iq+'</TD>'; }
				if (kemlelesek[k].mag != kemlelesek[n].mag){tabla2 = tabla2+'<TD style="color:orange">'+kemlelesek[k].mag+'</TD>'; }
				else {tabla2 = tabla2+'<TD>'+kemlelesek[k].mag+'</TD>'; }
				if (kemlelesek[k].tau != kemlelesek[n].tau){tabla2 = tabla2+'<TD style="color:orange">'+kemlelesek[k].tau+'</TD>'; }
				else {tabla2 = tabla2+'<TD>'+kemlelesek[k].tau+'</TD>'; }
				if (kemlelesek[k].szer != kemlelesek[n].szer){tabla2 = tabla2+'<TD style="color:orange">'+kemlelesek[k].szer+'</TD>'; }
				else {tabla2 = tabla2+'<TD>'+kemlelesek[k].szer+'</TD>'; }
				tabla2 = tabla2+'<TD>'+kemlelesek[k].ido+'</TD></TR>';
			}	
		}	
	}
	scriptbox.innerHTML = fejlec + tabla + fejlec2 + tabla2 + lezaras;
	getByClass('div','message_center')[0].style.position = "relative";

	gomb = document.createElement('a');
	gomb.setAttribute('class','gomblink');
	gomb.setAttribute('style','cursor:pointer');
	gomb.innerHTML = '<span style="color: yellow">Előző kémkedések!</span>';
	gomb.addEventListener('mouseover',function(){ scriptbox.style.display = 'block'; }, true);
	gomb.addEventListener('mouseout', function(){ scriptbox.style.display = 'none';  }, true);
	getByClass('div','message_center')[0].appendChild(gomb);
	getByClass('div','message_center')[0].appendChild(scriptbox);
	}

if (strpos('m=gyik',window.location.href)) {
	style = document.createElement('style');
	style.innerHTML = '.mytable, .mytable td, .mytable th {border-collapse: collapse; text-align: center; border-width: 1px; border-style: solid; border-color: gray; margin: 3px; padding: 1px;}';
	document.getElementsByTagName('body')[0].appendChild(style);
	gyik = getByClass('div','jobb_content');
	fejlec = '<br /><table class="mytable" WIDTH=100%><thead><caption style="color:lightgreen; font-weight:bold">JELENLEG TÁROLT KÉMLELÉSEK</caption><TR style="color:green"><TH>id</TH><TH>Karakternév</TH><TH>ÉP</TH><TH>TP</TH><TH>Tul</TH><TH>Szaki</TH><TH>Építés</TH><TH WIDTH=27%>Kémlelés ideje</TH></TR></thead>';
	var tabla = ""
	var kemlelesek = eval(GM_getValue('kemlelesek',[]));
	for (var k=0; k<kemlelesek.length; k++){
		tabla = tabla+'<TR><TD style="text-align:right">'+k+'.</TD><TD style="text-align:left">'+kemlelesek[k].nev+'</TD><TD>'+kemlelesek[k].ep+'</TD><TD>'+kemlelesek[k].tp+'</TD><TD style="text-align:right">'+kemlelesek[k].tul+'</TD><TD style="text-align:right">'+kemlelesek[k].szaki+'</TD><TD style="text-align:right">'+kemlelesek[k].epites+'</TD><TD>'+kemlelesek[k].ido+'</TD></TR>';
	}
	lezaras = '</table>';
	gyik[0].innerHTML = fejlec + tabla + lezaras;
}

function click_start(){
	i = document.getElementById('nevlista').value;
	azonosito = kemlelesek[i].nev;
	var okk = eval(GM_getValue('okk',[]));
	for (var i=0; i<kemlelesek.length; i++){
		if (kemlelesek[i].nev == azonosito) {
			if (okk.length<1){okk.push({id: i});}
			if ((kemlelesek[i].tp != kemlelesek[okk[okk.length-1].id].tp) || (kemlelesek[i].tul != kemlelesek[okk[okk.length-1].id].tul) || (kemlelesek[i].szaki != kemlelesek[okk[okk.length-1].id].szaki) || (kemlelesek[i].epites != kemlelesek[okk[okk.length-1].id].epites)) {okk.push({id: i});}
//			if (okk.length) okk.splice(0, okk.length);
		}
	}
	lezaras = '</table>';
	fejlec = '<table class="mytable" WIDTH=100%><thead><TR style="color:green"><TH>Szint/TP</TH><TH>Erő</TH><TH>Tám</TH><TH>Véd</TH><TH>Egs</TH><TH>IQ</TH><TH>Mág</TH><TH>Tau</TH><TH>Szer</TH><TH>Szaki</TH><TH>Építés</TH><TH>Kémlelés ideje</TH></TR></thead>';
	var tabla2 = "";
	if (okk.length==1) {
		for (var j=0; j<okk.length; j++){
			k = okk[j].id;
			tabla2 = tabla2+'<TR><TD>';
			if(kemlelesek[k].szint){tabla2 = tabla2 + kemlelesek[k].szint+'/'; }
			tabla2 = tabla2 + parseInt(kemlelesek[k].tp.replace('.','')) + '</TD><TD>'+kemlelesek[k].ero+'</TD><TD>'+kemlelesek[k].tam+'</TD><TD>'+kemlelesek[k].ved+'</TD><TD>'+kemlelesek[k].egs+'</TD><TD>'+kemlelesek[k].iq+'</TD><TD>'+kemlelesek[k].mag+'</TD><TD>'+kemlelesek[k].tau+'</TD><TD>'+kemlelesek[k].szer+'</TD><TD>'+kemlelesek[k].szaki+'</TD><TD>'+kemlelesek[k].epites+'</TD><TD>'+kemlelesek[k].ido+'</TD></TR>';
		}		
	}
	if (okk.length>1) {
			for (var j=0; j<okk.length; j++){
			k = okk[j].id;
			if (j==0){
				tabla2 = tabla2+'<TR><TD>';
				if(kemlelesek[k].szint){tabla2 = tabla2 + kemlelesek[k].szint+'/'; }
				tabla2 = tabla2 + parseInt(kemlelesek[k].tp.replace('.','')) + '</TD><TD>'+kemlelesek[k].ero+'</TD><TD>'+kemlelesek[k].tam+'</TD><TD>'+kemlelesek[k].ved+'</TD><TD>'+kemlelesek[k].egs+'</TD><TD>'+kemlelesek[k].iq+'</TD><TD>'+kemlelesek[k].mag+'</TD><TD>'+kemlelesek[k].tau+'</TD><TD>'+kemlelesek[k].szer+'</TD><TD>'+kemlelesek[k].szaki+'</TD><TD>'+kemlelesek[k].epites+'</TD><TD>'+kemlelesek[k].ido+'</TD></TR>';
			}
			else{
				n = okk[j-1].id;
				tabla2 = tabla2+'<TR><TD>';
				if(kemlelesek[k].szint){tabla2 = tabla2 + kemlelesek[k].szint+'/'; }
				tabla2 = tabla2 + parseInt(kemlelesek[k].tp.replace('.','')) + '</TD>';
				if (kemlelesek[k].ero != kemlelesek[n].ero){tabla2 = tabla2+'<TD style="color:orange">'+kemlelesek[k].ero+'</TD>'; }
				else {tabla2 = tabla2+'<TD>'+kemlelesek[k].ero+'</TD>'; }
				if (kemlelesek[k].tam != kemlelesek[n].tam){tabla2 = tabla2+'<TD style="color:orange">'+kemlelesek[k].tam+'</TD>'; }
				else {tabla2 = tabla2+'<TD>'+kemlelesek[k].tam+'</TD>'; }
				if (kemlelesek[k].ved != kemlelesek[n].ved){tabla2 = tabla2+'<TD style="color:orange">'+kemlelesek[k].ved+'</TD>'; }
				else {tabla2 = tabla2+'<TD>'+kemlelesek[k].ved+'</TD>'; }
				if (kemlelesek[k].egs != kemlelesek[n].egs){tabla2 = tabla2+'<TD style="color:orange">'+kemlelesek[k].egs+'</TD>'; }
				else {tabla2 = tabla2+'<TD>'+kemlelesek[k].egs+'</TD>'; }
				if (kemlelesek[k].iq != kemlelesek[n].iq){tabla2 = tabla2+'<TD style="color:orange">'+kemlelesek[k].iq+'</TD>'; }
				else {tabla2 = tabla2+'<TD>'+kemlelesek[k].iq+'</TD>'; }
				if (kemlelesek[k].mag != kemlelesek[n].mag){tabla2 = tabla2+'<TD style="color:orange">'+kemlelesek[k].mag+'</TD>'; }
				else {tabla2 = tabla2+'<TD>'+kemlelesek[k].mag+'</TD>'; }
				if (kemlelesek[k].tau != kemlelesek[n].tau){tabla2 = tabla2+'<TD style="color:orange">'+kemlelesek[k].tau+'</TD>'; }
				else {tabla2 = tabla2+'<TD>'+kemlelesek[k].tau+'</TD>'; }
				if (kemlelesek[k].szer != kemlelesek[n].szer){tabla2 = tabla2+'<TD style="color:orange">'+kemlelesek[k].szer+'</TD>'; }
				else {tabla2 = tabla2+'<TD>'+kemlelesek[k].szer+'</TD>'; }
				if (kemlelesek[k].szaki != kemlelesek[n].szaki){tabla2 = tabla2+'<TD style="color:orange">'+kemlelesek[k].szaki+'</TD>'; }
				else {tabla2 = tabla2+'<TD>'+kemlelesek[k].szaki+'</TD>'; }
				if (kemlelesek[k].epites != kemlelesek[n].epites){tabla2 = tabla2+'<TD style="color:orange">'+kemlelesek[k].epites+'</TD>'; }
				else {tabla2 = tabla2+'<TD>'+kemlelesek[k].epites+'</TD>'; }
				tabla2 = tabla2+'<TD>'+kemlelesek[k].ido+'</TD></TR>';
			}	
		}	
	}
	tablazat.innerHTML = fejlec+tabla2+lezaras;
}
	
if (strpos('m=jatekleiras',window.location.href)) {
	style = document.createElement('style');
	style.innerHTML = '.kemszoveg {color:#34D800; font-size:12px; font-weight:bold;} .jobb_content {text-align: center;} .mytable, .mytable td, .mytable th {border-collapse: collapse; text-align: center; border-width: 1px; border-style: solid; border-color: gray; margin: 3px; padding: 1px;}';
	document.getElementsByTagName('body')[0].appendChild(style);
	jatekleiras = getByClass('div','jobb_content');
	jatekleiras[0].innerHTML = "";

	div = document.createElement('div'); 
	div.className = "kemadatok";

	form = document.createElement('form');
	form.setAttribute('style','display: inline');
	div.appendChild(form);

	szoveg0 = document.createElement('szoveg1');
	szoveg0.className = "kemszoveg";
	szoveg0.innerHTML = ' <br>Az elmentett kémkedéseim közül ';
	form.appendChild(szoveg0);
	
	select = document.createElement('select');
	select.className = "kemszoveg";
	select.id = "nevlista";
	form.appendChild(select);
	
	var kemlelesek = eval(GM_getValue('kemlelesek',[]));
	var nevek = eval(GM_getValue('nevek',[]));
	var van = "";
	for (var i=0; i<kemlelesek.length; i++){
		if(!van.match(kemlelesek[i].nev)){
			van =van+";"+kemlelesek[i].nev;
			nevek.push({id: i, nev: kemlelesek[i].nev});
		}
	}
	for (i=0; i<nevek.length; i++){
		option = document.createElement('option');
		option.value=nevek[i].id;
		option.innerHTML=nevek[i].nev;
		select.appendChild(option);
	}

	szoveg1 = document.createElement('szoveg1'); 
	szoveg1.className = "kemszoveg";
	szoveg1.innerHTML = ' adatait szeretném lelistázni!';
	form.appendChild(szoveg1);
	
	getFirstByClass('div', 'jobb_content').insertBefore(div, getFirstByClass('div', 'h3_out'));
	
	a = document.createElement('a'); 
	a.addEventListener('click', click_start, true);
	a.className='gomblink';
	a.setAttribute('style','margin-top: 10px; cursor: pointer');
	form.appendChild(a);
	aspan = document.createElement('span'); 
	aspan.className = "kemszoveg";
	aspan.innerHTML = "MEGJELENÍT";
	a.appendChild(aspan);
	
	var k=0;
	tablazat = document.createElement('div');
	tablazat.innerHTML = '';
	getByClass('div','kemadatok')[0].appendChild(tablazat);
}

//aukciós mosogatás

var now = Math.floor(new Date().getTime()/1000/3600/24);
var aukcios_last = GM_getValue(azonosito+"_aukcios_last",0);

if (mosogatas && now > aukcios_last) {
	GM_xmlhttpRequest({
		method: 'GET', 
		url: "http://www.doomlord.ru/index.php?m=aukcioshaz&sub=aranydukat&tev=munka2", 
		onload: function(data){
			GM_setValue(azonosito+"_aukcios_last", Math.round(now));
		}
	});
}

//epikuteshez

function epiklink(){
	window.location.href = "http://www.doomlord.ru/index.php?m=szovetseg&sub=epikus_csata&tev=tamadas";
}

//Segítség gomb szürkítés

style = document.createElement('style');
style.innerHTML = '.segitseg_gomb .gomblink_yellow {width: 100px;} a.support_alert { background: transparent url(http://images.vegzetur.hu/pic/design_uj/gomb_szurke11_szel.png) no-repeat scroll top right; } a.support_alert span { background: transparent url(http://images.vegzetur.hu/pic/design_uj/gomb_szurke11.png) no-repeat; color:#777; } a.support_alert:hover { background: transparent url(http://images.vegzetur.hu/pic/design_uj/gomb_szurke11_szel.png) right -23px no-repeat; } a.support_alert:hover span { background: transparent url(http://images.vegzetur.hu/pic/design_uj/gomb_szurke11.png) 0 -23px no-repeat; color:#CCC;}';
document.getElementsByTagName('body')[0].appendChild(style);

//Lészívás összegzés

if(strpos('m=csataleiras',window.location.href) || strpos('m=eddigi_csatak',window.location.href) || strpos('m=nyilvanos_csataleiras',window.location.href) || strpos('m=szovetseg&sub=tamadasok&csata',window.location.href)){ 	
	var username = id('welcome').getElementsByTagName('strong')[0].innerHTML;
	var drain = 0;
	var spans = document.getElementsByTagName( "span" );
	
	
	for ( var i = 0; i < spans.length; i++ ) {
		if ( spans[i].getAttribute( "class" ) == "drain" ) {
			drain += parseInt( spans[i].innerHTML.replace( /.*?([+-]\d+) .*/, "$1" ));
		}
	}
	
	if ( drain != 0 ) {
		var divs = document.getElementsByTagName( "div" );
		for ( var i = 0; i < divs.length; i++ ) {
			if ((( divs[i].getAttribute( "class" ) == "result_win" ) || ( divs[i].getAttribute( "class" ) == "result_loss" ))){
			divs[i].innerHTML = divs[i].innerHTML.replace(/\([+-]\d+\)/g,"");
			divs[i].innerHTML = divs[i].innerHTML.replace( /(.*? \d+) (.*)/, "$1 (" + ( drain > 0 ? "+" : "" ) + drain + ") $2" );
			}
		}
	}
	
	le = 0;
	vle = 0;
	tp = 0;
	portyak = 0;
	vportyak = 0;
	portyaszam = 0;
	
	if(strpos('eddigi_csatak',window.location.href)){
	lista = document.getElementById('csatalistaform').innerHTML;
	portyak = lista.match(/A jutalmad \d+ lélekenergia és \d+ TP./g);
	vportyak = lista.match(/Elszívott tőled \d+ lélekenergiát./g);
	
	if (portyak){
		portyaszam += portyak.length;
		for (i=0; i<portyak.length; i++){
			szoveg = portyak[i].split(' ');
			le += parseInt(szoveg[2]);
			tp += parseInt(szoveg[5]);
		}
	}	
	
	if (vportyak){
		portyaszam += vportyak.length;
		for (i=0; i<vportyak.length; i++){
		szoveg = vportyak[i].split(' ');
		vle -= parseInt(szoveg[2]);
		}
	}
	}
	
	function getCsata(href){
		var leszivas = '';
		var csata_id = href.substring(href.indexOf("csata=")+6);
		for (var i=0; i<csatak.length; i++){
			if (parseInt(csatak[i].id) == parseInt(csata_id)) {
				leszivas = csatak[i].le;
				break;
			}
		}
		return leszivas;
	}
	
	function getCsataTargy(href){
		var targy = '';
		var csata_id = href.substring(href.indexOf("csata=")+6);
		for (var i=0; i<targyak.length; i++){
			if (parseInt(targyak[i].id) == parseInt(csata_id)) {
				targy = targyak[i].targy;
				break;
			}
		}
		return targy;
	}
	
	var now = new Date().getTime()/1000;
	var csata_id = window.location.href.substring(window.location.href.indexOf("csata=")+6);
	var csatak = eval(GM_getValue("csatak",[]));
	var targyak = eval(GM_getValue("targyak",[]));
	var leszivas = false;
	var targy = false;
	
	if (getByClass('div','result_win').length>0){
		leszivas = getFirstByClass('div','result_win').textContent.match(/\([+-]\d+\)/g);
		if(strpos('tipus=terkapu',window.location.href)){
			uzik = getByClass('div','message_center');
			for (i=0; i<uzik.length; i++){
				if(uzik[i].innerHTML.match('Az ellenfelednél kincset találtál:')){
					targy = uzik[i].innerHTML.replace('Az ellenfelednél kincset találtál: ','').replace('!','').replace('.','');
				}
			}
		}
	}
	
	if (getByClass('div','result_loss').length>0){
		leszivas = getFirstByClass('div','result_loss').textContent.match(/\([+-]\d+\)/g);
	}
	
	if (leszivas) csatak.push({
		id: parseInt(csata_id),
		le: leszivas,
		ido: now
	});
	
	if (targy) targyak.push({
		id: parseInt(csata_id),
		targy: targy,
		ido: now
	});
	
	sordrain = 0;
	lapdrain = 0;
	pp=0;
	if (getByClass('table','csatalista').length>0){
		csatalista = getFirstByClass('table','csatalista');
		sorok = csatalista.getElementsByTagName('tr');
		for (i=2; i<sorok.length; i++){
			if (strpos('csata=',sorok[i].innerHTML)){
				sorok[i].childNodes[5].innerHTML = sorok[i].childNodes[5].innerHTML.replace('lélekenergi', getCsata(sorok[i].childNodes[0].childNodes[0].href) + ' lélekenergi').replace('TP.',  'TP.<BR><font style="color: orange">' + getCsataTargy(sorok[i].childNodes[0].childNodes[0].href) + '</font>');;
				if (sorok[i].childNodes[3].innerHTML==username){pp++}
				if (getCsata(sorok[i].childNodes[0].childNodes[0].href)){
					sordrain = getCsata(sorok[i].childNodes[0].childNodes[0].href);
					sordrain = sordrain.toString().replace('(','');
					sordrain = sordrain.toString().replace(')','');
					lapdrain += parseInt(sordrain);
				}
			}
		}
	}

	if (csatak.length>300) csatak.splice(0, csatak.length-300);
	GM_setValue("csatak",csatak.toSource());

	if (targyak.length>50) targyak.splice(0, targyak.length-50);
	GM_setValue("targyak",targyak.toSource());

	scriptbox = document.createElement('div');

	if(!strpos('baratsagos',window.location.href) && !strpos('csataleiras',window.location.href) && !strpos('epikus',window.location.href) && !strpos('arena',window.location.href) && !strpos('viadalok',window.location.href)){
		scriptbox.setAttribute('class', 'message_center');
		scriptbox.setAttribute('style', 'margin: 5px;');
		if(strpos('eddigi_csatak',window.location.href) || strpos('eddigi_csatak&sub=terkapu',window.location.href) && !strpos('eddigi_csatak&sub=terkapu',window.location.href) && !strpos('eddigi_csatak&sub=portya',window.location.href)){
		scriptbox.innerHTML += 'Össz: &nbsp;&nbsp;<font color="#0f0">'+(le+lapdrain+vle)+'</font> LE és &nbsp;&nbsp;<font color="#0f0">'+tp+'</font> TP;&nbsp;&nbsp; Ebből lélekszívás: &nbsp;&nbsp;<font color="#0f0">'+lapdrain+'</font> LE;&nbsp;&nbsp; Eredmény: &nbsp;&nbsp;<font color="#0f0">'+Math.round((le+vle+lapdrain)/tp*10)/10+'</font> LE/TP';
		}
		if(strpos('eddigi_csatak&sub=portya',window.location.href)){
		scriptbox.innerHTML += '<hr />Portya LE/csata: &nbsp;&nbsp;<font color="#0f0">'+Math.round((le+vle)/portyaszam*10)/10+'</font> LE;&nbsp;&nbsp; Lélekszívás/csata: &nbsp;&nbsp;<font color="#0f0">'+Math.round(lapdrain/(portyaszam)*10)/10+'</font> LE;&nbsp;&nbsp; Eredmény: &nbsp;&nbsp;<font color="#0f0">'+Math.round((le+vle+lapdrain)/pp*10)/10+'</font> LE/PP';
		}	
	}	

	jobb_content = getByClass('div','jobb_content')[getByClass('div','jobb_content').length-1];
	jobb_content.insertBefore(scriptbox, jobb_content.firstChild) ;
}

//Csataeredmény lap tetejére

if (getByClass('div','battle').length>0){
	p = document.createElement('p');
	matches = getByClass('div','battle')[0].textContent.match(/соперника сгоревшие древние камни: \d+/g);
		if (matches) {
			p.innerHTML += 'A csata során elloptál ' + matches[0].substring(34) + ' kiégett őskövet!<br />';
		}
	matches = getByClass('div','battle')[0].textContent.match(/ellopott tőled \d+/g);
		if (matches) {
			p.innerHTML += 'A csata során ellopott tőled ' + matches[0].substring(15) + ' kiégett őskövet!<br />';
		}
	matches = getByClass('div','battle')[0].textContent.match('Kiszabadultál ellenfeled kínzókamrájából');
		if (matches) {
			p.innerHTML += 'Kiszabadultál ellenfeled kínzókamrájából!<br />';
		}
	matches = getByClass('div','battle')[0].textContent.match('Ты помещаешь противника в камеру пыток.');
		if (matches) {
			p.innerHTML += 'Elhurcoltad ellenfeledet a kínzókamrába.<br />';
		}
	if (getByClass('div','result_win').length>0){
		p.className = 'result_win';
		p.innerHTML += getByClass('div','result_win')[0].textContent.replace('Победа за тобой, твоя награда ','Jutalmad ').replace('энергии духа и','lélekenergia és') + '<br />';
	} 
	else {
		p.className = 'result_loss';
		p.innerHTML += getByClass('div','result_loss')[0].textContent.replace('Твой противник победил, ты потерял','Elrabolt tőled').replace('энергии духа.','lélekenergiát.') + '<br />';
	}
	asebzes = 0;
	if(getByClass('div','battle')[0].textContent.match(/Ellenfeled állatai /g)) {
		asebzesek = getByClass('div','battle')[0].textContent.match(/Ellenfeled állatai \d+/g);
		for (i=0; i<asebzesek.length; i++) {
			asebzes += parseInt(asebzesek[i].substring(19));
		}
	}
	if(getByClass('div','battle')[0].textContent.match(/Ellenfeled állata /g)) {
		asebzesek = getByClass('div','battle')[0].textContent.match(/Ellenfeled állata \d+/g);
		for (i=0; i<asebzesek.length; i++) {
			asebzes += parseInt(asebzesek[i].substring(18));
		}
	}
	asebzodes = 0;
	if(getByClass('div','battle')[0].textContent.match(/Твой питомец теряет /g)) {
		asebzodesek = getByClass('div','battle')[0].textContent.match(/Твой питомец теряет \d+/g);
		for (i=0; i<asebzodesek.length; i++) {
			asebzodes += parseInt(asebzodesek[i].substring(19));
		}
	}
	if(getByClass('div','battle')[0].textContent.match(/Твои питомцы теряют /g)) {
		asebzodesek = getByClass('div','battle')[0].textContent.match(/Твои питомцы теряют \d+/g);
		for (i=0; i<asebzodesek.length; i++) {
			asebzodes += parseInt(asebzodesek[i].substring(19));
		}
	}
	
	if(!strpos('baratsagos',window.location.href)){
	p.innerHTML += 'Állatsebzés : <span style="color: blue">' + asebzes + ' <span style="color: white">Állatsebződés: <span style="color: yellow">' + asebzodes + '<br />';
	}
	
	if (getByClass('span','kaland').length>0){
		p.innerHTML += '<span style="color: yellow">' + getByClass('span','kaland')[0].textContent.replace('Во время дуэли ты нашел приключение:','Kalandot találtál:') + '<br />';
	}
		
	if (getByClass('div','message_center').length>0 && !strpos('epikus',window.location.href)){
		p.innerHTML += '<span style="color: orange">' + getByClass('div','message_center')[0].textContent + '<br />';
	}
	
	if (getByClass('div','sebzeskompenzacio').length>0){
		p.innerHTML += '<font style="color: green">' + getByClass('div','sebzeskompenzacio')[0].innerHTML + '<br />';
	}
	
	battle_head = getByClass('div','battle')[0];
	battle_head.insertBefore(p, battle_head.childNodes[0]);
}

//kennelkalk

function TPfromLVL(level) {
  tp=0;
  if (level<6) {tp=level*100;}
  else {tp=500;}  
  if (level>=20) {tp=level*50-450;}
  if (level==0) {tp=99999;}
  return tp;
}

if (strpos('szakertelmek',window.location.href)) {
	intkedvenc = eval(document.evaluate("//tr[contains(@onmouseover,\"intelligens\")]/td[last()-1]", document, null, XPathResult.STRING_TYPE, null).stringValue);
	GM_setValue(azonosito+"_intkedvenc", intkedvenc);
}

if (document.location.href.substr(-9) == 'm=allatok') {
	fomenu = document.getElementById('fomenu');
	notepad_block = document.createElement('li');
	notepad = document.createElement('div');
	style = document.createElement('style');
	style.innerHTML = '.kennelkalk {display:block; font-weight:bold; width:154px; height:17px; background:url(http://images.vegzetur.hu/pic/design_uj/menu_back_new.png) no-repeat; padding-top:4px; text-align:center; color:#E9C347; font-size:11px;}';
	document.getElementsByTagName('body')[0].appendChild(style);
	notepad.innerHTML = '<div class="kennelkalk">Kennelkalk</div>';
	notepad_block.appendChild(notepad);
	fomenu.insertBefore(notepad_block, fomenu.firstChild);
	notepad.addEventListener('click',
		function kennelkalk(){
			var animdata = new Array(); 
			var animno = 0;
			var animals = document.evaluate('//div[@class="allatok"]/table/tbody/tr', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			for (var animrow=0; animrow<animals.snapshotLength; animrow++) {
			temp = animals.snapshotItem(animrow).textContent;
			if (i = temp.match(/[^\d](\d+)\. SzintAlap/i)) { animdata[++animno] = Array(i[1], 0, 0, 0, 0); }
			if (i = temp.match(/([\d\.]+) \/ ([\d\.]+) TP/i)) animdata[animno][1] = parseInt(i[1].replace('.',''));
			if (i = temp.match(/intelligencia(\d+)/i)) animdata[animno][2] = parseInt(i[1]);
			if (i = temp.match(/\+(\d+) TP győz/i)) animdata[animno][3] = parseInt(i[1]);
			if (i = temp.match(/Gyakorlás/i)) animdata[animno][4] = 1;
			}
			kennel = GM_getValue(azonosito+"_kennel",0);
			if (kennel>24) {kennel=24;}

			intkedv = GM_getValue(azonosito+"_intkedvenc",0);
			jogar = GM_getValue(azonosito+"_jogar",0);
			style = document.createElement('style');
			width = 65+70*animno;
			kennel = parseInt(kennel);
			extkennel = parseInt(extkennel);
			height = 28+(kennel+extkennel)*16;
			style.innerHTML = '#kennellayer {display: block; opacity: .95; position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; background-color: #202; z-index: 9} #kennellayer div {background-color: #101; text-align: left; padding: 20px; width: '+width+'px; height: '+height+'px; border: double gray 4px; position: absolute; top: 5%; left: 50%; margin-left: -'+width/2+'px;} #kennellayer h1 {margin: 25px} #kennellayer label {width: 100px; display: block; float: left; line-height: 20px;} #kennellayer input {float: left; width: 30px; margin: 3px 0px;} #kennellayer br {clear: both} #kennellayer #bezaras {cursor: pointer; position: absolute; right: 0px; top: -2px; width: 19px; height: 19px; border: solid gray 1px; line-height: 20px; background-color: #d00; color: silver} .testreszab {cursor: pointer} .mytable, .mytable td, .mytable th {border-collapse: collapse; border-width: 1px; border-style: solid; border-color: gray; margin: 0px; padding: 0px;}';
			document.getElementsByTagName('body')[0].appendChild(style);
			kennellayer = document.createElement('div');
			kennellayer.id = 'kennellayer';
			kenneldiv = document.createElement('div');
			document.getElementsByTagName('body')[0].appendChild(kennellayer);
			kennellayer.appendChild(kenneldiv);
			
			fejlec = '<table class="mytable" WIDTH=100%><thead><TR style="color:yellowgreen" align="center"><TH>Idő</TH>';
			for (i=1; i<=animno; i++) {fejlec+='<TH>&#8239</TH><TH>Szint/TP</TH>';}
			fejlec+='<TH>&#8239</TH><TH>Idő</TH></TR></thead>';
			
			var tablaalap='<TR align="center" style="color:yellow"><TD>&#8239</TD>';
			for (i=1;i<=animno;i++) {tablaalap+='<TD>&#8239</TD><TD><B>'+animdata[i][0]+'</B>/'+animdata[i][1]+'</TD>';}
			tablaalap+='<TD>&#8239</TD><TD>&#8239</TD></TR>';
			
			var tabla='';
			var exttabla='';
			
			if (kennel){
				for (j=0; j<kennel; j++) {
					tabla+='<TR align="center"><TD style="color:lightgreen">'+(j+1)*2+'</TD>';
					for (i=1; i<=animno; i++) {
						TPgain = ((10+1*animdata[i][3])*(1+0.03*intkedv+0.01*animdata[i][2]+jogar/100)*(1+(kennel-1)/100));
						animdata[i][1] = animdata[i][1]+TPgain;
						if (animdata[i][0]==0) { animdata[i][1]=0; TPgain=0; }
						if (animdata[i][1]>=TPfromLVL(animdata[i][0])) { animdata[i][1] -= TPfromLVL(animdata[i][0]); animdata[i][0]++; tabla+='<TD>&#8239</TD><TD style="color:orange"><B>'+animdata[i][0]+'/'+parseInt(animdata[i][1])+'</B></TD>';}
						else if (animdata[i][4]==1) {tabla+='<TD>&#8239</TD><TD style="color:white">'+animdata[i][0]+'/'+parseInt(animdata[i][1])+'</TD>';}
						else {tabla+='<TD>&#8239</TD><TD>'+animdata[i][0]+'/'+parseInt(animdata[i][1])+'</TD>';}
					}
					tabla+='<TD>&#8239</TD><TD style="color:lightgreen">'+(j+1)*2+'</TD></TR>';
				}
			}
			if (kennel && extkennel>=1){
				for (j=kennel; j<(kennel+extkennel); j++) {
					exttabla+='<TR align="center"><TD style="color:IndianRed">'+(j+1)*2+'</TD>';
					for (i=1; i<=animno; i++) {
						TPgain = ((10+1*animdata[i][3])*(1+0.03*intkedv+0.01*animdata[i][2])*(1+(kennel-1)/100));
						animdata[i][1] = animdata[i][1]+TPgain;
						if (animdata[i][0]==0) { animdata[i][1]=0; TPgain=0; }
						if (animdata[i][1]>=TPfromLVL(animdata[i][0])) { animdata[i][1] -= TPfromLVL(animdata[i][0]); animdata[i][0]++; exttabla+='<TD>&#8239</TD><TD style="color:orange"><B>'+animdata[i][0]+'/'+parseInt(animdata[i][1])+'</B></TD>';}
						else if (animdata[i][4]==1) {exttabla+='<TD>&#8239</TD><TD style="color:AntiqueWhite">'+animdata[i][0]+'/'+parseInt(animdata[i][1])+'</TD>';}
						else {exttabla+='<TD>&#8239</TD><TD style="color:PeachPuff">'+animdata[i][0]+'/'+parseInt(animdata[i][1])+'</TD>';}
					}
					exttabla+='<TD>&#8239</TD><TD style="color:IndianRed">'+(j+1)*2+'</TD></TR>';
				}
			}
			
			lezaras = '</table>';
			kenneldiv.innerHTML = fejlec + tablaalap + tabla + exttabla + lezaras;
			kennelbezar = document.createElement('input');
			kennelbezar.type = 'button';
			kennelbezar.value = 'X';
			kennelbezar.title = 'Bezárás';
			kennelbezar.id = 'bezaras';
			kennelbezar.addEventListener('click',function(){
				kennellayer.style.display='none';
				}
			, false);
			kenneldiv.appendChild(kennelbezar);
		}
	, true);
}

//Ispotály

	function click_gyogyit() {
		if (!magassebgyogy && !autogyogyit){
			id=select[select.selectedIndex].value;
			GM_setValue(azonosito+'_id',id);
		}
		if (!autogyogyit){GM_setValue(azonosito+'_autogyogyit',true);}
		else{
			GM_setValue(azonosito+'_autogyogyit',false);
			GM_setValue(azonosito+'_id',0);
		}
		window.location.reload();
	}

	var username = id('welcome').getElementsByTagName('strong')[0].innerHTML;
	var vilag = strcut('//','.',window.location.href);
	var azonosito = vilag + "_" + username
	var autogyogyit = GM_getValue(azonosito+'_autogyogyit',false);
	var now = (new Date()).getTime();
	
	if(strpos('allatok',window.location.href)){
		allatlista = getFirstByClass('div','allatok');
		sorok = allatlista.getElementsByTagName('tr');
		allatok = [];
		for (i=0; i<sorok.length; i++){
			if (strpos('<span>Gyógyítás</span>',sorok[i].innerHTML)){
				var nev = sorok[i].getElementsByTagName('img')[0].alt;
				var id = parseInt(sorok[i].innerHTML.split('allat=')[1]);
				allatok.push({nev: nev,	id: id});
				var magassebgyogy=false;
			}
			if (strpos('>Gyógyítani jelölöm<',sorok[i].innerHTML)){
				var nev = sorok[i].getElementsByTagName('img')[0].alt;
				var id = parseInt(sorok[i].innerHTML.split('allat=')[1]);
				allatok.push({nev: nev,	id: id});
				var magassebgyogy=true;
			}
		}

		jobb = document.getElementById('jobb');
		if (allatok.length>1 && jobb.innerHTML.match('>Gyógyítani jelölöm<')){
			id = "";
			for (i=0; i<allatok.length; i++){
				if (i != allatok.length-1) {
					id += allatok[i].id;
					id += ",";
				}
				else {id += allatok[i].id;}
			}
		}
		if (allatok.length==1 && jobb.innerHTML.match('>Gyógyítani jelölöm<')){id = allatok[0].id;}

		uzik = getByClass('div','message_center');
		for (i=0; i<uzik.length; i++){
			if (uzik[i].innerHTML.match('Újra gyógyíthatsz') || uzik[i].innerHTML.match('állat éppen gyógyul')){
				timercontent = uzik[i].getElementsByTagName("span")[0].textContent;
				timeto = (parseInt(timercontent.split(':')[0]*60)+parseInt(timercontent.split(':')[1]));
				timer=true;
				nextrun = now+timeto*1000+" ";
				GM_setValue(azonosito+'_nextrun',nextrun);
				i=uzik.length;
			}
			else {timer=false;}
		}
	
		if(timer && autogyogyit){
			div = document.createElement('div'); 
			div.className = "message_center";
			a = document.createElement('a'); 
			a.addEventListener('click', click_gyogyit, true);
			a.className='gomblink';
			a.setAttribute('style','margin-top: 10px; cursor: pointer');
			div.appendChild(a);
			aspan = document.createElement('span'); 
			aspan.innerHTML = "Gyógyítás STOP";
			a.appendChild(aspan);
			getFirstByClass('div', 'allatok').insertBefore(div, getFirstByClass('div', 'text'));	
		}
	
		if (allatok.length>0){
			div = document.createElement('div'); 
			div.className = "message_center";
		
			if (!autogyogyit){
				if (!magassebgyogy){
					select = document.createElement('select');
					select.id = "gyogyitando";
					div.appendChild(select);
					for (i=0; i<allatok.length; i++){
						option = document.createElement('option');
						option.value=allatok[i].id;
						option.innerHTML=allatok[i].nev;
						select.appendChild(option);
					}
					span = document.createElement('span'); 
					span.innerHTML = " állatom folyamatos gyógyításra jelölöm!";
				}
				else {
					span = document.createElement('span'); 
					span.innerHTML = "Az állataim folyamatosan gyógyítom!";
				}
				div.appendChild(span);
				a = document.createElement('a'); 
				a.addEventListener('click', click_gyogyit, true);
				a.className='gomblink';
				a.setAttribute('style','margin-top: 10px; cursor: pointer');
				div.appendChild(a);
				aspan = document.createElement('span'); 
				aspan.innerHTML = "Gyógyítás START";
				a.appendChild(aspan);	
			}
			if (autogyogyit){
				if (magassebgyogy){
					GM_xmlhttpRequest({
						method: 'POST',
						url: 'http://'+vilag+'.doomlord.ru/index.php?m=allatok',
						headers:{'Content-type':'application/x-www-form-urlencoded'},
						data: encodeURI('allatok_gyogyit='+id+'&tev=tobb_gyogyit')
					});
					window.location.reload();
				}
				else {
					id=GM_getValue(azonosito+'_id',0);
					vanilyen=false;
					for (i=0; i<allatok.length; i++){
						if (allatok[i].id==id){vanilyen=true;}
					}
					if (vanilyen){
						window.location.href="http://"+vilag+".doomlord.ru/index.php?m=allatok&allat="+id+"&tev=gyogyit";
					}
					else {
						if(id!=0){
							alert('Befejeztem a gyógyítást!');
							GM_setValue(azonosito+'_id',0);
							GM_setValue(azonosito+'_autogyogyit',false);
							window.location.reload();
						}
					}
				}
			}
			getFirstByClass('div', 'allatok').insertBefore(div, getFirstByClass('div', 'text'));	
		}
		else{
			if(autogyogyit && !timer){
				alert('Befejeztem a gyógyítást!');
				GM_setValue(azonosito+'_id',0);
				GM_setValue(azonosito+'_autogyogyit',false);
			}
		}
	}
	else{
		nextrun = parseInt(GM_getValue(azonosito+'_nextrun',0));
		if (autogyogyit && nextrun<now && !strpos('allatok',window.location.href)){
			GM_openInTab("http://"+vilag+".doomlord.ru/index.php?m=allatok&allat");
		}
	}
	
//if(strpos('zarknod_ebredese',window.location.href)){
//	document.getElementById('pilonform').submit();
//}