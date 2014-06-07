// ==UserScript==

// @name           Yandex Market Grabber/Filler
// @version        0.55a
// @namespace      http://userscripts.org
// @creator        Blade
// @description    Adds button to grab specifications from Yandex Market, and adds button to the content.wikimart.ru to paste that specifications
// @tags           grabber, YandexMarket, Yandex, Market, Wikimart, specifications
// @include        http://market.yandex.ru/model.xml*
// @include        http://content.wikimart.ru/model.php*
// @include        http://wikimart.ru/*

// ==/UserScript==

// ====== Script Info BEGIN
// === Version
// 0.55a
// === Changelog
// 0.55a
// Сделал при replace не тупо замену всей строки на ReplaceWith, а замену только тех частей, что подходят как ReplaceWhat
// 0.55
// Изменил функции выбора и вставки элементов в форму. Теперь они в первую очередь стараются выбрать подходящие значения из списков,
// ^ а уже только потом, если это не получилось, вставляют параметры в строки ввода. Также они выбирают в списках с допустимыми несколькими вариантами.
// ^ Правда в этом случае может возникнуть такая ситуация, что несколько параметров из строки они выберут в списке, а некоторых там не окажется,
// ^ тогда получится, что скрипт засчитает, что все хорошо (раз он выбрал что-то), окрасит в зеленый, а выбрано там будет не все.
// ^ Но во избежание ошибок, связанных с этим, нужно просто проверить, что он выбрал.
// 0.52
// Добавил в объекты массив замен Replace. Он сравнивает полученное значение с ReplaceWhat, и, если оно подходит к одному из вариантов,
// ^ то заменяет значение на ReplaceWith. Если замены не нужны - можно этот массив вообще не указывать.
// 0.5
// Полностью поменял систему типов и определения их и их параметров
// ^ Теперь все типы описаны в массиве объектов в самом начале кода, функции независимы от этого массива и от того, что там написано
// ^ Подробное описание структуры объекта в комментах к первому объекту
// Изменены функции считывания и вставки параметров, добавлена полная поддержка вставки в сам магазин викимарта (но там есть еще несколько недоработок)
// Куча мелких фиксов
// Записи, которые нужно записывать в одну переменную, записываются в одну и разделяются символом "↔"
// 0.3
// Добавил переменную имени и цены, вывод для них, а также поиск имени на Яндекс Маркете и вставку его
// Добавил переменную количества записей.
// Сделал вывод всех непустых записей от 0 до VariablesQuant
// Добавил wikimart.ru в список охватываемых сайтов, написал для него функции вставки, пока что криво
// 0.25
// Полностью перешел на общие переменные для всего
// Немножко улучшил некоторые регулярные выражения
// Переместил замены кроме глобальных в соответствующие считывающие блоки
// Добавил переменную, передаваемую в ф-цию set_value, определяющую, искать точное вхождение, или нет
// 0.2
// Подписи к дебагговому выводу
// Добавил текстовый блок после поля ввода, где выводится сохраненное значение, не испоганенное match-ем
// ^ Если значение было добавлено, или значение одного из вариантов OPTION подошло, то значение окрашивается зеленым
// ^ Если ничего не было добавлено, или ни один из вариантов OPTION не подошел - значение окрашивается в красный цвет
// Разделил v (сохраненное значение) и MatchedValue (испоганенное match-ем)
// Начал полное изменение системы переменных: теперь переменные общие одни для всего
// ^ и что они значат в данный момент определяется номером группы товара в адресе страницы
// 0.12
// Добавил в библиотеку все переменные, которые необходимы, чтобы заполнить форму ноутбука
// Начал тестирование match для того, чтобы вычленять из больших записей только нужное для конкретного поля формы. Пока что только обнаруживает вхождение значений
// Добавил toLowerCase() и сравниваемому и сравнивающему значениям в случае SELECT, чтобы не париться с регистрами
// Полное реформатирование кода
// Почистил остатки старого кода
// 0.1
// Релиз
// ====== Script Info END

(function() {

	if (window.opera) {
		alert("This script will not run on Opera as it needs to save preferences, use an IE or FF browser.");
		return;
	}

	if (!isIE) {
		// SCRIPT UPDATE CHECKER by 'Jarett' http://userscripts.org/scripts/show/20145
		var version_scriptNum = 42370; // Change this to the number given to the script by userscripts.org (check the address bar)
		//alert ((new Date()).getTime());
		var version_timestamp = 1235311935118; // (new Date()).getTime() Used to differentiate one version of the script from an older one. Use the Date.getTime() function to get a value for this.
		function updateCheck(forced) { if ((forced) || (parseInt(GM_getValue("lastUpdate", "0")) + 86400000 <= (new Date().getTime()))) { try { GM_xmlhttpRequest({ method: "GET", url: "http://userscripts.org/scripts/review/" + version_scriptNum + "?" + new Date().getTime(), headers: { 'Cache-Control': 'no-cache' }, onload: function(xhrResponse) { GM_setValue("lastUpdate", new Date().getTime() + ""); var rt = xhrResponse.responseText.replace(/&nbsp;?/gm, " ").replace(/<li>/gm, "\n").replace(/<[^>]*>/gm, ""); var scriptName = (/@name\s*(.*?)\s*$/m.exec(rt))[1]; GM_setValue("targetScriptName", scriptName); if (parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(rt)[1]) > version_timestamp) { if (confirm("There is an update available for the Greasemonkey script \"" + scriptName + ".\"\nWould you like to go to the install page now?")) { GM_openInTab("http://userscripts.org/scripts/show/" + version_scriptNum); } } else if (forced) { alert("No update is available for \"" + scriptName + ".\""); } } }); } catch (err) { if (forced) { alert("An error occurred while checking for updates:\n" + err); } } } } GM_registerMenuCommand("++ " + GM_getValue("targetScriptName", "Yandex Market Grabber/Filler") + " - Manual Update Check ++", function() { updateCheck(true); }); updateCheck(false);
		// ENDS UPDATE CHECKER
	}

	// Global value for debug
	var DEBUG = false;
	var isIE = (document.attachEvent && !window.opera) ? true : false;

	// Создается массив объектов, где будут храниться параметры
	var Type = new Array();

	// Здесь описывается массив объектов, где будут храниться параметры

	// Объект создается в определенной ячейке массива. Чтобы не нагромождать еще больше, чем сейчас - они выделяются вручную,
	// так что номер при создании новых типов нужно менять на больший, чем предыдущий, на единицу
	// Добавляйте новые типы в конец массива, для наглядности
	Type[0] =
	{
		// Имя типа товаров. Нужно использовать вариант Викимарта, используется при вставке в мастере продажи товаров
		Name: "Ноутбуки",

		// Адрес этой категории товаров в Яндекс-маркете
		YandexUrl: "hid=91013",
		// Адрес этой категории товаров в админке Викимарта
		WikimartAdminUrl: "main_c_id=78&c_id=81",
		// Адрес этой категории товаров в Ситилинке
		SitilinkUrl: "notebooks",

		// Массив сопоставлений параметров
		Comparison:
		[
		// 1-й параметр
			{
			// Название параметра на яндекс-маркете. Тут массив, так как иногда требуется несколько полей
			// объединить в одну переменную
			YandexMarketName: ["Установленная операционная система"],
			// Название параметра на Ситилинке
			SitilinkName: "",
			// Массив параметров раскидывания результата
			DestParameters:
				[
			// 1-й параметр
					{
					// Название параметра на викимарте. И в админке и на сайте одинаковые
					WikimartName: "Операционная система",
					// Регулярное выражение, которое будет применено к параметру.
					// Если не нужно применять никакого выражения - оставьте пустую строку
					RegExpr: "",
					// Флаг того, должно ли быть точно совпадение параметра, чтобы оно было выбрано в случае,
					// когда поле, куда оно вводится - список.
					// Пример: в списке есть варианты "Хуйпизда", "Пизда", "Хуй". Проверяется пришедшая переменная "Хуй"
					// на то, есть ли такое в этом списке. В случае, когда ExactMatch == false, будет выбрана "Хуйпизда", так как
					// "Хуй" входит туда, а этот вариант самый первый в списке.
					// В случае, когда ExactMatch == true, "Хуйпизда" не будет выбрана, так как "Хуй" != "Хуйпизда", и функция пойдет
					// дальше проверять. Он выберет 3-й вариант, "Хуй", так как он подходит точно.
					ExactMatch: false
				}
			// Эта переменная больше никуда не вставлятся, так что тут только один параметр
				]
		},
		// 2-й параметр
		// Дальше по-аналогии
			{
			YandexMarketName: ["Дисплей"],
			SitilinkName: "",
			DestParameters:
				[
					{
						WikimartName: "Размер дисплея",
						RegExpr: /^[0-9\.]*/,
						ExactMatch: false
					},
			// Тут одна переменная разбрасывается по 3-м полям, поэтому 3 параметра
			// Как видим, каждый раз с разным регулярным выражением
					{
					WikimartName: "Широкоформатный экран",
					RegExpr: /широкоформатный/i,
					ExactMatch: false
				},
					{
						WikimartName: "Максимальное разрешение экрана",
						RegExpr: "",
						ExactMatch: false
					}
				]
		},
			{
				YandexMarketName: ["Процессор"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Тип процессора",
						RegExpr: "",
						ExactMatch: false
					},
					{
						WikimartName: "Частота процессора",
						RegExpr: /[0-9]*/g,
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Память"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Объем оперативной памяти",
						RegExpr: /^[0-9]*/,
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Жесткий диск"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Объем жесткого диска",
						RegExpr: /^[0-9]*/,
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Графический чипсет"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Видеокарта",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Оптический привод"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Оптический привод",
						RegExpr: "",
						ExactMatch: true
					}
				]
			},
			{
				YandexMarketName: ["Звуковой чипсет"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Аудио",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["LAN/Modem"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Сетевая плата",
						RegExpr: /сетевая карта/i,
						ExactMatch: false
					},
					{
						WikimartName: "Модем",
						RegExpr: /модем/i,
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Беспроводная связь"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Наличие Wi-Fi",
						RegExpr: /Wi-Fi/i,
						ExactMatch: false
					},
					{
						WikimartName: "Наличие Bluetooth",
						RegExpr: /Bluetooth/i,
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Устройство для чтения флэш-карт", "Слоты для флэш-карт"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Слот для чтения флеш-катр",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Слот ExpressCard"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Слот ExpressCard",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Веб-камера"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Вэб камера",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Вес"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Вес",
						RegExpr: /^[0-9\.]*/,
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Размеры (ДхШхТ)"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Ширина",
						RegExpr: "",
						ExactMatch: false
					},
					{
						WikimartName: "Длина",
						RegExpr: /^[0-9]*/,
						ExactMatch: false
					},
					{
						WikimartName: "Толщина",
						RegExpr: /[0-9\.\м\ ]*$/,
						ExactMatch: false,
						Replaces:
						[
							{
								ReplaceWhat: "мм",
								ReplaceWith: ""
							}
						]
					}
				]
			},
			{
				YandexMarketName: ["Аккумулятор"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Тип аккумулятора",
						RegExpr: "",
						ExactMatch: false
					},
					{
						WikimartName: "Время работы от аккумулятора",
						RegExpr: /[0-9\.]*/g,
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Дополнительная информация"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Дополнительно",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Материнская плата"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Материнская плата",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Тип"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Тип",
						RegExpr: "",
						ExactMatch: false
					}
				]
			}
		]
	}
	Type[1] =
	{
		Name: "Напольные весы",

		YandexUrl: "hid=90567",
		WikimartAdminUrl: "main_c_id=1&c_id=26",
		SitilinkUrl: "",

		Comparison:
		[
			{
				YandexMarketName: ["Тип"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Тип",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Материал платформы"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Материал платформы",
						RegExpr: "",
						ExactMatch: true
					}
				]
			},
			{
				YandexMarketName: ["Цвет"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Цвет",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Тип"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Дисплей",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Максимальная нагрузка"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Максимальная нагрузка",
						RegExpr: /^[0-9]*/,
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Погрешность измерения"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Погрешность измерения",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Память"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Память",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Автоматическое включение"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Автоматическое включение",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Автоматическое выключение"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Автоматическое выключение",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Дополнительные измерения"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Дополнительные измерения",
						RegExpr: /сетевая карта/i,
						ExactMatch: false
					}
				]
			}
		]
	}
	Type[1] =
	{
		Name: "Стиральные машины",

		YandexUrl: "hid=90566",
		WikimartAdminUrl: "main_c_id=1&c_id=4",
		SitilinkUrl: "",

		Comparison:
		[
			{
				YandexMarketName: ["Габариты (ШxГxВ)"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Ширина",
						RegExpr: /^[0-9]*/,
						ExactMatch: false
					},
					{
						WikimartName: "Глубина",
						RegExpr: "",
						ExactMatch: false
					},
					{
						WikimartName: "Высота",
						RegExpr: /[0-9\.\см\ ]*$/,
						ExactMatch: false,
						Replaces:
						[
							{
								ReplaceWhat: "см",
								ReplaceWith: ""
							}
						]
					}
				]
			},
			{
				YandexMarketName: ["Расположение"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Возможность встраивания",
						RegExpr: "",
						ExactMatch: false,
						Replaces:
						[
							{
								ReplaceWhat: "свободностоящая",
								ReplaceWith: "Нет"
							}
						]
					}
				]
			},
			{
				YandexMarketName: ["Тип загрузки"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Тип загрузки",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Тип"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Дисплей",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Максимальная нагрузка"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Максимальная нагрузка",
						RegExpr: /^[0-9]*/,
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Максимальная загрузка белья"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Максимальная загрузка белья",
						RegExpr: /\d*/,
						ExactMatch: true
					}
				]
			},
			{
				YandexMarketName: ["Скорость вращения при отжиме"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Максимальная скорость отжима",
						RegExpr: /\s\d*/,
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Сушка"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Сушка",
						RegExpr: /\s\d*/,
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Дисплей"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Дисплей",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Цвет"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Цвет",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Класс эффективности стирки"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Класс стирки",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Расход воды за стирку"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Расход воды за стирку",
						RegExpr: /\d*/,
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Специальные программы"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Стирка деликатных тканей",
						RegExpr: /стирка деликатных тканей/i,
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Класс потребления электроэнергии"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Класс потребления электроэнергии",
						RegExpr: "",
						ExactMatch: true
					}
				]
			},
			{
				YandexMarketName: ["Защита от детей"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Защита от детей",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Дополнительные возможности"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Дополнительные возможности",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
		]
	}
	Type[2] =
	{
		Name: "Факсы",

		YandexUrl: "hid=91465",
		WikimartAdminUrl: "main_c_id=30&c_id=43",
		SitilinkUrl: "",

		Comparison:
		[
			{
				YandexMarketName: ["Скорость модема"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Скорость модема",
						RegExpr: /^[0-9\.]*/,
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Тип печати"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Тип печати",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Количество полутонов"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Количество полутонов",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Функция копирования"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Функция копирования",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Тип бумаги"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Тип бумаги",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["АОН", "Caller ID"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "АОН",
						RegExpr: /есть/,
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Автоответчик"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Автоответчик",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Автопереключение факс/телефон"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Автопереключение факс",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Записная книжка"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Записная книжка",
						RegExpr: /^[0-9]*/,
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Проводная трубка"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Проводная трубка",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Беспроводная трубка"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Беспроводная трубка",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Спикерфон"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Спикерфон",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Дополнительная информация"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Дополнительно",
						RegExpr: "",
						ExactMatch: false
					}
				]
			}
		]
	}
	Type[3] =
	{
		Name: "Процессоры",

		YandexUrl: "hid=91019",
		WikimartAdminUrl: "main_c_id=78&c_id=95",
		SitilinkUrl: "",

		Comparison:
		[
			{
				YandexMarketName: ["Линейка"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Линейка",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Сокет"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Сокет",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Тактовая частота"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Частота процессора",
						RegExpr: /^[0-9]*/,
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Объем кэша L2"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Объем кэша L2",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Частота шины"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Частота шины",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Ядро"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Ядро",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
		]
	}
	Type[4] =
	{
		Name: "БП",

		YandexUrl: "hid=857707",
		WikimartAdminUrl: "main_c_id=78&c_id=101",
		SitilinkUrl: "",

		Comparison:
		[
			{
				YandexMarketName: ["Мощность"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Мощность",
						RegExpr: /^[0-9]*/,
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Система охлаждения"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Система охлаждения",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Стандарт"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Стандарт",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Тип разъема для материнской платы"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Тип разъема для материнской платы",
						RegExpr: /^[0-9\+]*/,
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Размеры (ВxШxГ)"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Высота",
						RegExpr: /^[0-9]*/,
						ExactMatch: false
					},
					{
						WikimartName: "Ширина",
						RegExpr: "",
						ExactMatch: false
					},
					{
						WikimartName: "Глубина",
						RegExpr: /[0-9\.\см\ ]*$/,
						ExactMatch: false,
						Replaces:
						[
							{
								ReplaceWhat: "см",
								ReplaceWith: ""
							}
						]
					}
				]
			},
			{
				YandexMarketName: ["Вес"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Вес",
						RegExpr: /^[0-9]*/,
						ExactMatch: false
					}
				]
			},
		]
	}
	Type[5] =
	{
		Name: "Системы охлаждения",

		YandexUrl: "hid=818965",
		WikimartAdminUrl: "main_c_id=78&c_id=102",
		SitilinkUrl: "",

		Comparison:
		[
			{
				YandexMarketName: ["Назначение"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Область применения",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Socket"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Socket",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Количество вентиляторов"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Количество вентиляторов",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Тип коннектора"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Тип коннектора",
						RegExpr: /^[0-9]*/,
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Подсветка", "Цвет подсветки"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Подсветка",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Размеры кулера (ШхВxГ)"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Ширина",
						RegExpr: /^[0-9]*/,
						ExactMatch: false
					},
					{
						WikimartName: "Высота",
						RegExpr: "",
						ExactMatch: false
					},
					{
						WikimartName: "Глубина",
						RegExpr: /[0-9\.\см\ ]*$/,
						ExactMatch: false,
						Replaces:
						[
							{
								ReplaceWhat: "см",
								ReplaceWith: ""
							}
						]
					}
				]
			}
		]
	}
	Type[6] =
	{
		Name: "Материнские платы",

		YandexUrl: "hid=91020",
		WikimartAdminUrl: "main_c_id=78&c_id=96",
		SitilinkUrl: "",

		Comparison:
		[
			{
				YandexMarketName: ["Поддерживаемые процессоры"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Поддерживаемые процессоры",
						RegExpr: "",
						ExactMatch: true
					}
				]
			},
			{
				YandexMarketName: ["Системная шина"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Частота системной шины",
						RegExpr: /^[0-9]*/,
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Поддержка Hyper-Threading"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Поддержка Hyper-Threading",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Поддержка многоядерных процессоров"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Поддержка многоядерных процессоров",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Чипсет"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Название чипсета",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Память"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Память",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Количество слотов памяти"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Количество слотов памяти",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Поддержка двухканального режима"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Поддержка двухканального режима",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Ethernet"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Ethernet",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Звук"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Звук",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Встроенный видеоадаптер"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Встроенная графика",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Форм-фактор"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Форм-фактор",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Комплектация"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Комплектация",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Дополнительная информация"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Дополнительно",
						RegExpr: "",
						ExactMatch: false
					}
				]
			}
		]
	}
	Type[7] =
	{
		Name: "Модули памяти",

		YandexUrl: "hid=191211",
		WikimartAdminUrl: "main_c_id=78&c_id=99",
		SitilinkUrl: "",

		Comparison:
		[
			{
				YandexMarketName: ["Тип памяти"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Тип памяти",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Тактовая частота"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Тактовая частота",
						RegExpr: /^[0-9]*/,
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Пропускная способность"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Пропускная способность",
						RegExpr: /^[0-9]*/,
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Поддержка ECC"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Поддержка ECC",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Буферизованная (Registered)"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Буферизованная",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Напряжение питания"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Напряжение питания",
						RegExpr: /^[0-9]*/,
						ExactMatch: true
					}
				]
			},
		]
	}
	Type[8] =
	{
		Name: "Видеокарты",

		YandexUrl: "hid=91031",
		WikimartAdminUrl: "main_c_id=78&c_id=97",
		SitilinkUrl: "",

		Comparison:
		[
			{
				YandexMarketName: ["Тип видеокарты"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Тип видеокарты",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Графический процессор"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Графический процессор",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Тип подключения"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Тип подключения",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Поддержка PCI Express 2.0"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Поддержка PCI Express",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Частота графического процессора"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Частота графического процессора",
						RegExpr: /^[0-9]*/,
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Объем видеопамяти"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Объем видеопамяти",
						RegExpr: /^[0-9]*/,
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Тип видеопамяти"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Тип видеопамяти",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Разрядность шины видеопамяти"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Разрядность шины видеопамяти",
						RegExpr: /^[0-9]*/,
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Максимальное разрешение"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Максимальное разрешение",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Разъемы"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Разъемы",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Дополнительная информация"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Дополнительно",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
		]
	}
	Type[9] =
	{
		Name: "Звуковые карты",

		YandexUrl: "hid=91027",
		WikimartAdminUrl: "main_c_id=78&c_id=98",
		SitilinkUrl: "",

		Comparison:
		[
			{
				YandexMarketName: ["Тип подключения"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Тип подключения",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Тип"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Тип",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Звуковая схема"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Звуковая схема",
						RegExpr: /^[0-9\.]*/,
						ExactMatch: true
					}
				]
			},
			{
				YandexMarketName: ["Версия EAX"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Версия EAX",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Поддержка ASIO"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Поддержка ASIO",
						RegExpr: /^[0-9]*/,
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Количество внешних линейных входов", "Количество микрофонных входов", "MIDI-интерфейсы - входы/выходы"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Разъемы",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Пульт ДУ"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Пульт ДУ",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Дополнительная информация"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Дополнительная информация",
						RegExpr: "",
						ExactMatch: false
					}
				]
			}
		]
	}
	Type[10] =
	{
		Name: "Видеокамеры",

		YandexUrl: "hid=90635",
		WikimartAdminUrl: "main_c_id=30&c_id=52",
		SitilinkUrl: "",

		Comparison:
		[
			{
				YandexMarketName: ["Тип видеокамеры"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Тип видеокамеры",
						RegExpr: /[^\a^,^\s]*/,
						ExactMatch: false
					},
					{
						WikimartName: "Тип цифровой видеокамеры",
						RegExpr: "",
						ExactMatch: true
					},
					{
						WikimartName: "Запись в AVCHD",
						RegExpr: /AVCHD/i,
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Тип носителя"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Тип цифрового носителя",
						RegExpr: "",
						ExactMatch: true
					}
				]
			},
			{
				YandexMarketName: ["Поддержка видео высокого разрешения (Full HD)"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Режим записи видео в высоком разрешении",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Тип матрицы"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Тип матрицы",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Максимальное разрешение видеосъемки"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Максимальное разрешение видеосъемки X",
						RegExpr: "",
						ExactMatch: false
					},
					{
						WikimartName: "Максимальное разрешение видеосъемки Y",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Широкоформатный режим видео"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Широкоформатный режим видео",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Стабилизатор изображения"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Стабилизатор изображения",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Фокусное расстояние объектива"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Фокусное расстояние объектива, мин",
						RegExpr: "",
						ExactMatch: false
					},
					{
						WikimartName: "Фокусное расстояние объектива, макс",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Выдержка"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Выдержка, мин",
						RegExpr: "",
						ExactMatch: false
					},
					{
						WikimartName: "Выдержка, макс",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Диафрагма"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Диафрагма при мин. фокусном расстоянии",
						RegExpr: "",
						ExactMatch: false
					},
					{
						WikimartName: "Диафрагма при макс. фокусном расстоянии",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Диаметр фильтра"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Диаметр фильтра",
						RegExpr: /^[0-9]*/,
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Баланс белого"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Баланс белого",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Режимы съемки"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Режимы съемки",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Режимы съемки"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Режимы съемки",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Спецэффекты"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Спецэффекты",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Ручная фокусировка"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Ручная фокусировка",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Zoom оптический / цифровой"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Оптический Zoom",
						RegExpr: "",
						ExactMatch: false
					},
					{
						WikimartName: "Цифровой Zoom",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Фоторежим"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Фоторежим",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Максимальное разрешение фотосъемки"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Максимальное разрешение фотосъемке X",
						RegExpr: "",
						ExactMatch: false
					},
					{
						WikimartName: "Максимальное разрешение фотосъемке Y",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Фотосъемка в режиме видеосъемки"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Фотосъемка в режиме видеосъемки",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Режим ночной съемки"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Режим ночной съемки",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["ЖК-экран"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Тип ЖК-экрана",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["ЖК-экран"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "ЖК-экран",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Сенсорный дисплей"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Тип ЖК-экрана",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Интерфейсы"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Интерфейсы",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Интерфейсы"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Интерфейсы",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Запись на карту памяти"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Запись на карту памяти",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Размеры (ШхВхГ)"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Ширина",
						RegExpr: /^[0-9]*/,
						ExactMatch: false
					},
					{
						WikimartName: "Высота",
						RegExpr: "",
						ExactMatch: false
					},
					{
						WikimartName: "Толщина",
						RegExpr: /[0-9\.\см\ ]*$/,
						ExactMatch: false,
						Replaces:
						[
							{
								ReplaceWhat: "см",
								ReplaceWith: ""
							}
						]
					}
				]
			},
			{
				YandexMarketName: ["Запись на карту памяти"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Запись на карту памяти",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Вес"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Вес",
						RegExpr: /^[0-9]*/,
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Дополнительные возможности"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Дополнительно",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Конструкция"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Комплектация",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
		]
	}
	Type[11] =
	{
		Name: "Фотоаппараты цифровые",

		YandexUrl: "hid=91148",
		WikimartAdminUrl: "main_c_id=30&c_id=50",
		SitilinkUrl: "",

		Comparison:
		[
			{
				YandexMarketName: ["Общее число пикселов"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Общее число пикселов",
						RegExpr: /^[0-9]*/,
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Тип видоискателя"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Тип видоискателя",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Тип матрицы"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Тип матрицы",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Максимальное разрешение"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Максимальное разрешение по X",
						RegExpr: "",
						ExactMatch: false
					},
					{
						WikimartName: "Максимальное разрешение по Y",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Кроп-фактор"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Кроп-фактор",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Глубина цвета"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Глубина цвета",
						RegExpr: /^[0-9]*/,
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Система понижения шумов"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Система понижения шумов",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Функция очистки матрицы"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Функция очистки матрицы",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["ЖК-экран"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Тип ЖК-экрана",
						RegExpr: "",
						ExactMatch: false
					},
					{
						WikimartName: "ЖК-экран",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Ручная фокусировка"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Ручная фокусировка",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Подсветка автофокуса"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Подсветка автофокуса",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Zoom оптический / цифровой"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Оптический Zoom",
						RegExpr: "",
						ExactMatch: false
					},
					{
						WikimartName: "Цифровой Zoom",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Поддержка сменных объективов"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Возможность смены объектива",
						RegExpr: "",
						ExactMatch: false
					},
					{
						WikimartName: "Тип сменного объектива",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Объектив в комплекте"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Объектив в комплекте",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Выдержка"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Минимальная выдержка",
						RegExpr: "",
						ExactMatch: false
					},
					{
						WikimartName: "Максимальная выдержка",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Система понижения шумов"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Система понижения шума",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Тип карт памяти"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Тип карт памяти",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Размер встроенной памяти"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Размер встроенной памяти",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Форматы изображения"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Форматы изображения",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Интерфейсы"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Интерфейсы",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Работа в качестве Web-камеры"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Работа в качестве Web-камеры",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Запись видео"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Запись видео",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Запись звука"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Запись звука",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Дополнительные возможности"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Дистанционное управление",
						RegExpr: /Дистанционное управление/i,
						ExactMatch: false
					},
					{
						WikimartName: "Крепление для штатива",
						RegExpr: /Крепление для штатива/i,
						ExactMatch: false
					},
					{
						WikimartName: "Дополнительная информация",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Разъем питания"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Разъем питания",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Формат аккумуляторов"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Тип аккумуляторов",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Материал корпуса"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Материал корпуса",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Размер"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Ширина",
						RegExpr: /^[0-9]*/,
						ExactMatch: false
					},
					{
						WikimartName: "Высота",
						RegExpr: "",
						ExactMatch: false
					},
					{
						WikimartName: "Толщина",
						RegExpr: /[0-9\.\см\ ]*$/,
						ExactMatch: false,
						Replaces:
						[
							{
								ReplaceWhat: "см",
								ReplaceWith: ""
							}
						]
					}
				]
			},
			{
				YandexMarketName: ["Вес"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Вес",
						RegExpr: /^[0-9]*/,
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Комплектация"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Комплектация",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
		]
	}
	Type[12] =
	{
		Name: "Жесткие диски",

		YandexUrl: "hid=91033",
		WikimartAdminUrl: "main_c_id=78&c_id=94",
		SitilinkUrl: "",

		Comparison:
		[
			{
				YandexMarketName: ["Применение"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Тип",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Форм-фактор"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Размер",
						RegExpr: /^[0-9\.]*/,
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Объем HDD"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Объем HDD",
						RegExpr: /^[0-9]*/,
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Объем буферной памяти"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Объем кэша",
						RegExpr: /^[0-9]*/,
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Скорость вращения"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Скорость вращения",
						RegExpr: /^[0-9]*/,
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Подключение"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Интерфейс",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Размеры (ШхВхД)"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Ширина",
						RegExpr: /^[0-9]*/,
						ExactMatch: false
					},
					{
						WikimartName: "Высота",
						RegExpr: "",
						ExactMatch: false
					},
					{
						WikimartName: "Длина",
						RegExpr: /[0-9\.\см\ ]*$/,
						ExactMatch: false,
						Replaces:
						[
							{
								ReplaceWhat: "см",
								ReplaceWith: ""
							}
						]
					}
				]
			},
			{
				YandexMarketName: ["Вес"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Вес",
						RegExpr: /^[0-9\.]*/,
						ExactMatch: false
					}
				]
			},
		]
	}
	Type[13] =
	{
		Name: "Оптические приводы",

		YandexUrl: "hid=91035",
		WikimartAdminUrl: "main_c_id=78&c_id=103",
		SitilinkUrl: "",

		Comparison:
		[
			{
				YandexMarketName: ["Тип привода"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Тип привода",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Тип размещения"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Тип размещения",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Объем буфера"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Объем буфера",
						RegExpr: /^[0-9]*/,
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Механизм загрузки дисков"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Механизм загрузки дисков",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Цвет передней панели"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Цвет передней панели",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Размеры (ШхВхГ)"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Ширина",
						RegExpr: /^[0-9]*/,
						ExactMatch: false
					},
					{
						WikimartName: "Высота",
						RegExpr: "",
						ExactMatch: false
					},
					{
						WikimartName: "Глубина",
						RegExpr: /[0-9\.\см\ ]*$/,
						ExactMatch: false,
						Replaces:
						[
							{
								ReplaceWhat: "см",
								ReplaceWith: ""
							}
						]
					}
				]
			},
			{
				YandexMarketName: ["Дополнительная информация"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Дополнительная информация",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
		]
	}
	Type[14] =
	{
		Name: "Корпуса",

		YandexUrl: "hid=91028",
		WikimartAdminUrl: "main_c_id=78&c_id=100",
		SitilinkUrl: "",

		Comparison:
		[
			{
				YandexMarketName: ["Форм-фактор"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Форм-фактор",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Блок питания"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Блок питания",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["USB на лицевой панели", "FireWire на лицевой панели", "Выход на наушники на лицевой панели", "eSATA на лицевой панели"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Разъемы на лицевой панели",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Габариты (ШхВхГ)"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Ширина",
						RegExpr: /^[0-9]*/,
						ExactMatch: false
					},
					{
						WikimartName: "Высота",
						RegExpr: "",
						ExactMatch: false
					},
					{
						WikimartName: "Глубина",
						RegExpr: /[0-9\.\см\ ]*$/,
						ExactMatch: false,
						Replaces:
						[
							{
								ReplaceWhat: "см",
								ReplaceWith: ""
							}
						]
					}
				]
			},
			{
				YandexMarketName: ["Материал корпуса"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Материал корпуса",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Цвет корпуса"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Цвет корпуса",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
		]
	}
	Type[15] =
	{
		Name: "Сетевые карты и адаптеры",

		YandexUrl: "hid=91095",
		WikimartAdminUrl: "main_c_id=78&c_id=110",
		SitilinkUrl: "",

		Comparison:
		[
			{
				YandexMarketName: ["Интерфейс"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Интерфейс",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Чип"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Чип",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Стандарты"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Поддерживаемый стандарт",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Скорость передачи данных"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Скорость передачи данных",
						RegExpr: /^[0-9\/]*/,
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Количество разъемов RJ-45"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Количество разъемов",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Поддержка Wake-on-LAN"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Поддержка Wake-on-LAN",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Поддержка Jumbo Frame"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Поддержка Jumbo Frame",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Аппаратное шифрование"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Аппаратное шифрование",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
		]
	}
	Type[16] =
	{
		Name: "Сотовые телефоны",

		YandexUrl: "hid=91491",
		WikimartAdminUrl: "main_c_id=30&c_id=32",
		SitilinkUrl: "",

		Comparison:
		[
			{
				YandexMarketName: ["Дата анонсирования"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Интерфейс",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Дата анонсирования"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Год выпуска",
						RegExpr: /^[0-9]*/,
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Тип корпуса"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Тип корпуса",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Стандарт"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Стандарт связи",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Антенна"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Антенна",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Поддержка двух SIM-карт"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Поддержка двух SIM-карт",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Встроенный GPS-приемник"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "GPS-модуль",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Смартфон"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Тип",
						RegExpr: "",
						ExactMatch: false,
						Replaces:
						[
							{
								ReplaceWhat: "да",
								ReplaceWith: "смартфон"
							},
							{
								ReplaceWhat: "",
								ReplaceWith: "телефон"
							}
						]
					}
				]
			},
			{
				YandexMarketName: ["Платформа"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Платформа",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Тип экрана"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Тип экрана",
						RegExpr: "",
						ExactMatch: false
					},
					{
						WikimartName: "Количество цветов экрана",
						RegExpr: "",
						ExactMatch: false
					},
					{
						WikimartName: "Параметры дисплея",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Размер изображения"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Разрешение дисплея по X",
						RegExpr: "",
						ExactMatch: false
					},
					{
						WikimartName: "Разрешение дисплея по Y",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Фотокамера"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Фотокамера",
						RegExpr: "",
						ExactMatch: false
					},
					{
						WikimartName: "Кол-во мегапикселей",
						RegExpr: "",
						ExactMatch: false
					},
					{
						WikimartName: "Разрешение фотокамеры",
						RegExpr: /^[0-9\x]*/,
						ExactMatch: false
					},
					{
						WikimartName: "Параметры фотокамеры",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Запись видеороликов"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Запись видеоклипов",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Воспроизведение видео"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Воспроизведение видео",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Камера для видеоконференций"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Камера для видеоконференций",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Аудио"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "MP3-проигрыватель",
						RegExpr: /MP3/i,
						ExactMatch: false
					},
					{
						WikimartName: "Поддерживаемый аудиоформат",
						RegExpr: "",
						ExactMatch: false
					},
					{
						WikimartName: "FM-радиоприемник",
						RegExpr: /FM-радиоприемник/i,
						ExactMatch: false
					},
					{
						WikimartName: "Стереодинамики",
						RegExpr: /стереодинамики/i,
						ExactMatch: false
					},

				]
			},
			{
				YandexMarketName: ["Разъем для наушников"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Выход на наушники",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["AV-выход"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "TV-выход",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Тип мелодий"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Полифония",
						RegExpr: /полифония/i,
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Объем постоянной памяти (ROM)"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Объем встроенной памяти",
						RegExpr: /^[0-9]*/,
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Поддержка карт памяти"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Поддержка карт памяти",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Тип аккумулятора"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Тип аккумулятора",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Емкость аккумулятора"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Емкость аккумулятора",
						RegExpr: /^[0-9]*/,
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Время разговора"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Время разговора",
						RegExpr: /^[0-9\:]*/,
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Время ожидания"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Время ожидания",
						RegExpr: /^[0-9\:]*/,
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Органайзер"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Функции",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Интерфейсы", "VoIP-клиент", "Push-To-Talk"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Передача данных",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Размеры (ШxВxТ)"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Ширина",
						RegExpr: /^[0-9]*/,
						ExactMatch: false
					},
					{
						WikimartName: "Высота",
						RegExpr: "",
						ExactMatch: false
					},
					{
						WikimartName: "Толщина",
						RegExpr: /[0-9\.\см\ ]*$/,
						ExactMatch: false,
						Replaces:
						[
							{
								ReplaceWhat: "мм",
								ReplaceWith: ""
							}
						]
					}
				]
			},
			{
				YandexMarketName: ["Вес"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Вес",
						RegExpr: /^[0-9]*/,
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Комплектация"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Комплектация",
						RegExpr: "",
						ExactMatch: false
					}
				]
			},
			{
				YandexMarketName: ["Особенности"],
				SitilinkName: "",
				DestParameters:
				[
					{
						WikimartName: "Дополнительно",
						RegExpr: "",
						ExactMatch: false
					}
				]
			}
		]
	}


	$gv = function(name, defaultValue) {
		if (!isIE) return GM_getValue(name, defaultValue);
		else return PRO_getValue(name);
	};
	$sv = function(name, value) {
		if (!isIE) return GM_setValue(name, value);
		else return PRO_setValue(name, value);
	};

	var VariablesQuant = 32;

	function reset_vars() {
		$sv('Name', ''); $sv('Price', '');
		$sv('Variable 1', ''); $sv('Variable 2', ''); $sv('Variable 3', '');
		$sv('Variable 4', ''); $sv('Variable 5', ''); $sv('Variable 6', '');
		$sv('Variable 7', ''); $sv('Variable 8', ''); $sv('Variable 9', '');
		$sv('Variable 10', ''); $sv('Variable 11', ''); $sv('Variable 12', '');
		$sv('Variable 13', ''); $sv('Variable 14', ''); $sv('Variable 15', '');
		$sv('Variable 16', ''); $sv('Variable 17', ''); $sv('Variable 18', '');
		$sv('Variable 19', ''); $sv('Variable 20', ''); $sv('Variable 21', '');
		$sv('Variable 22', ''); $sv('Variable 23', ''); $sv('Variable 24', '');
		$sv('Variable 25', ''); $sv('Variable 26', ''); $sv('Variable 27', '');
		$sv('Variable 28', ''); $sv('Variable 29', ''); $sv('Variable 30', '');
		$sv('Variable 31', ''); $sv('Variable 32', '');
	}

	function find_yandex_list() {
		var nodes = document.getElementById('full-spec-cont');
		return nodes;
	}

	function set_adminka_element(node, value, ExactMatch) {
		if (DEBUG)
			alert("value = " + value);

		var success = false;
		var MultipleOptions = false;

		var SelectNodes = node.getElementsByTagName('SELECT');

		if (SelectNodes.length) {
			// Here goes some changes from Yandex text to Wikimart text
			if (value == null)
				value = "Нет";

			if (value.toString())
				value = value.toString();

			if (value == /есть/i)
				value = "Да";
			else if (value == /нет/i || value == "" || value == "нет")
				value = "Нет";

			for (var j = 0; j < SelectNodes.length; j++) {
				if (SelectNodes[j].type != "hidden") {
					if (SelectNodes[j].hasAttribute("multiple"))
						MultipleOptions = true;

					var options = node.getElementsByTagName('OPTION');
					for (var i = 0; i < options.length; i++) {
						if (!options[i].firstChild)
							continue;
						if (DEBUG)
							alert("Вариант " + (i + 1) + ": " + options[i].firstChild.nodeValue);

						if (ExactMatch) {
							if (value.toLowerCase() == options[i].firstChild.nodeValue.toLowerCase()) {
								if (DEBUG)
									alert("Option Hit!");

								options[i].setAttribute('selected', 'selected');
								success = true;
							}
						}
						else if (value.toLowerCase().match(options[i].firstChild.nodeValue.toLowerCase())) {
							if (DEBUG)
								alert("Option Hit!");
							options[i].setAttribute('selected', 'selected');
							success = true;
						}
						// We assume that by default if there are field "Да" and the value exists and not
						// equals to "Нет", that means that it's positive, no matter what exactly is written in the value
						if (options[i].firstChild.nodeValue == "Да" && value != "Нет") {
							if (DEBUG)
								alert("Option Hit: \"Да\"!");
							options[i].setAttribute('selected', 'selected');
							success = true;
						}
						// We assume that by default if there is field "Нет" and the value
						// equals to "Нет", that means that value is negative
						if (options[i].firstChild.nodeValue == "Нет" && value == "Нет") {
							if (DEBUG)
								alert("Option Hit: \"Нет\"!");
							options[i].setAttribute('selected', 'selected');
							success = true;
						}

						if (success && !MultipleOptions)
							return success;
					}
				}
			}
		}

		if (!success) {
			node = node.lastChild.previousSibling.previousSibling;

			if (node.nodeName == "INPUT" || node.nodeName == "TEXTAREA") {
				if (value == "Нет")
					value = "";
				node.value = value;
				success = true;
			}
		}

		return success;
	}

	function set_element(node, value, ExactMatch) {
		if (DEBUG)
			alert("value = " + value);

		var success = false;

		var SelectNodes = node.getElementsByTagName('SELECT');

		if (SelectNodes.length) {
			// Here goes some changes from Yandex text to Wikimart text
			if (value == null)
				value = "Нет";

			if (value.toString())
				value = value.toString();

			if (value == /есть/i)
				value = "Да";
			else if (value == /нет/i || value == "" || value == "нет")
				value = "Нет";

			for (var j = 0; j < SelectNodes.length; j++) {
				if (SelectNodes[j].type != "hidden") {
					var options = node.getElementsByTagName('OPTION');
					for (var i = 0; i < options.length; i++) {
						if (!options[i].firstChild)
							continue;
						if (DEBUG)
							alert("Вариант " + (i + 1) + ": " + options[i].firstChild.nodeValue);

						if (ExactMatch) {
							if (value.toLowerCase() == options[i].firstChild.nodeValue.toLowerCase()) {
								if (DEBUG)
									alert("Option Hit!");

								options[i].setAttribute('selected', 'selected');
								success = true;
							}
						}
						else if (value.toLowerCase().match(options[i].firstChild.nodeValue.toLowerCase())) {
							if (DEBUG)
								alert("Option Hit!");
							options[i].setAttribute('selected', 'selected');
							success = true;
						}
						// We assume that by default if there are field "Да" and the value exists and not
						// equals to "Нет", that means that it's positive, no matter what exactly is written in the value
						if (options[i].firstChild.nodeValue == "Да" && value != "Нет") {
							if (DEBUG)
								alert("Option Hit: \"Да\"!");
							options[i].setAttribute('selected', 'selected');
							success = true;
						}
						// We assume that by default if there is field "Нет" and the value
						// equals to "Нет", that means that value is negative
						if (options[i].firstChild.nodeValue == "Нет" && value == "Нет") {
							if (DEBUG)
								alert("Option Hit: \"Нет\"!");
							options[i].setAttribute('selected', 'selected');
							success = true;
						}

						if (success && !SelectNodes[j].hasAttribute("multiple"))
							return success;
					}
				}
			}
		}

		if (!success) {
			node = node.lastChild.lastChild;

			if (node.nodeName == "INPUT" || node.nodeName == "TEXTAREA") {
				if (value == "Нет")
					value = "";
				node.value = value;
				success = true;
			}
		}

		return success;
	}

	function output_stored(node, id, value, success) {
		if (!document.getElementById(id)) {
			var mst = node.appendChild(document.createElement("span"));
			mst.id = id;
			if (DEBUG)
				alert("Stored value = " + value);

			mst.innerHTML = " " + value;
			// Если значение было добавлено, или значение одного из вариантов OPTION подошло, то значение окрашивается зеленым
			// Если ничего не было добавлено, или ни один из вариантов OPTION не подошел - значение окрашивается в красный цвет
			if (success)
				mst.style.color = "green";
			else
				mst.style.color = "red";
		}
	}

	function yandex_copy(e) {
		/*
		Yandex Event trap
		Trap a click on 'Copy' and save(store) the values
		*/
		var r, n, name, TDs;
		if (isIE) {
			window.event.cancelBubble = true; //window.event.returnValue = false;
			//         window.event.srcElement.blur();
		} else {
			e.preventDefault();
			//         e.target.blur();
		}
		reset_vars();

		name = document.getElementsByTagName("H1");

		if (name[0].firstChild)
			$sv('Name', name[0].firstChild.nodeValue);

		n = find_yandex_list();
		// look at each line, test the heading for the info we're interested in
		TDs = n.getElementsByTagName('TD');
		for (var i = 0; i < TDs.length - 1; i++) {
			if (!TDs[i].firstChild.firstChild || TDs[i].firstChild.nodeName == 'B')
				continue;
			r = TDs[i].firstChild.firstChild.nodeValue;
			if (DEBUG)
				alert("Название поля: " + r);

			for (var j = 0; j < Type.length; j++)
				if (location.href.match(Type[j].YandexUrl)) {
				for (var k = 0; k < Type[j].Comparison.length; k++) {
					var StrToSave = "";
					for (var l = 0; l < Type[j].Comparison[k].YandexMarketName.length; l++) {
						if (r == Type[j].Comparison[k].YandexMarketName[l]) {
							if (TDs[i + 1].firstChild) {
								StrToSave = $gv('Variable ' + (k + 1));
								if (StrToSave)
									StrToSave += " ↔ ";
								StrToSave += TDs[i + 1].firstChild.nodeValue;
							}
							$sv('Variable ' + (k + 1), StrToSave);
						}
					}
				}
			}
		}
		if (isIE)
			window.event.returnValue = false;
	}

	function wikimart_admin_paste(e) {
		/*
		Wikimart Event trap
		Trap a click on 'Paste' and retrieve the saved values and plug them into the manifestation form.
		*/
		var TRs;
		var r, v, matchedValue, namePlace;

		if (isIE) {
			window.event.cancelBubble = true; //window.event.returnValue = false;
			window.event.srcElement.blur();
		} else {
			e.preventDefault();
			e.target.blur();
		}

		namePlace = document.getElementsByName("name");

		if (namePlace[0])
			namePlace[0].value = $gv('Name')

		TRs = document.getElementsByClassName('attr');
		if (TRs[0].nodeName != 'TABLE')
			return;
		TRs = TRs[0].getElementsByTagName('TR');
		for (var i = 0; i < TRs.length; i++) {
			if (!TRs[i].firstChild.firstChild)
				continue;
			r = TRs[i].firstChild.firstChild.nodeValue;

			if (DEBUG) {
				alert("Название поля: " + r);
			}

			for (var j = 0; j < Type.length; j++)
				if (location.href.match(Type[j].WikimartAdminUrl)) {
				for (var k = 0; k < Type[j].Comparison.length; k++) {
					for (var l = 0; l < Type[j].Comparison[k].DestParameters.length; l++) {
						if (r.match(Type[j].Comparison[k].DestParameters[l].WikimartName)) {
							if (DEBUG)
								alert("Hit!");
							v = $gv('Variable ' + (k + 1));

							// match block
							if (Type[j].Comparison[k].DestParameters[l].RegExpr)
								matchedValue = v.match(Type[j].Comparison[k].DestParameters[l].RegExpr);
							else
								matchedValue = v;

							// replace block
							if (Type[j].Comparison[k].DestParameters[l].Replaces)
								for (var m = 0; m < Type[j].Comparison[k].DestParameters[l].Replaces.length; m++) {
									if (matchedValue.toString())
										matchedValue = matchedValue.toString();
										
									matchedValue = matchedValue.replace(Type[j].Comparison[k].DestParameters[l].Replaces[m].ReplaceWhat, Type[j].Comparison[k].DestParameters[l].Replaces[m].ReplaceWith);
								}

							if (TRs[i].lastChild)
								output_stored(TRs[i].lastChild, "Stored " + i, v, set_adminka_element(TRs[i].lastChild, matchedValue, Type[j].Comparison[k].DestParameters[l].ExactMatch));
						}
					}
				}
			}
		}
	}

	function wikimart_paste(e) {
		/*
		Wikimart Event trap
		Trap a click on 'Paste' and retrieve the saved values and plug them into the manifestation form.
		*/
		var TRs;
		var r, v, matchedValue;

		if (isIE) {
			window.event.cancelBubble = true; //window.event.returnValue = false;
			window.event.srcElement.blur();
		} else {
			e.preventDefault();
			e.target.blur();
		}

		var name = document.getElementsByTagName("U");
		if (!name[0].firstChild)
			return;

		TRs = document.getElementsByTagName('TR');
		for (var i = 0; i < TRs.length; i++) {
			if (!TRs[i].firstChild.firstChild)
				continue;
			r = TRs[i].firstChild.firstChild.nodeValue;

			if (DEBUG) {
				alert("Название поля: " + r);
			}

			for (var j = 0; j < Type.length; j++)
				if (name[0].firstChild.nodeValue.match(Type[j].Name)) {
				for (var k = 0; k < Type[j].Comparison.length; k++) {
					for (var l = 0; l < Type[j].Comparison[k].DestParameters.length; l++) {
						if (r.match(Type[j].Comparison[k].DestParameters[l].WikimartName)) {
							if (DEBUG)
								alert("Hit!");
							v = $gv('Variable ' + (k + 1));

							// match block
							if (Type[j].Comparison[k].DestParameters[l].RegExpr)
								matchedValue = v.match(Type[j].Comparison[k].DestParameters[l].RegExpr);
							else
								matchedValue = v;

							// replace block
							if (Type[j].Comparison[k].DestParameters[l].Replaces)
								for (var m = 0; m < Type[j].Comparison[k].DestParameters[l].Replaces.length; m++)
								{
									if (matchedValue.toString())
										matchedValue = matchedValue.toString();
										
									matchedValue = matchedValue.replace(Type[j].Comparison[k].DestParameters[l].Replaces[m].ReplaceWhat, Type[j].Comparison[k].DestParameters[l].Replaces[m].ReplaceWith);
								}

							if (TRs[i].lastChild)
								output_stored(TRs[i].lastChild, "Stored " + i, v, set_element(TRs[i], matchedValue, Type[j].Comparison[k].DestParameters[l].ExactMatch));
						}
					}
				}
			}
		}
	}

	function menu_values() {

		var str = 'Product Details';
		str += '\nName: ' + $gv('Name', '');
		str += '\nPrice: ' + $gv('Price', '');
		str += '\n\nVariables:'

		for (var i = 1; i <= VariablesQuant; i++)
			if ($gv('Variable ' + i) != "")
			str += '\nVariable ' + i + ': ' + $gv('Variable ' + i);
		alert(str);
	}

	function go_yandex() {
		/*
		insert a 'Copy' link
		*/

		var pd = find_yandex_list();
		// is this the correct list?
		if (pd) {
			// create a copy TO storage link
			var link = document.createElement('button');
			link.id = 'IBList';
			link.setAttribute('title', 'Save values for use in IBList WEM entry.');
			link.appendChild(document.createTextNode('Copy Product Details'));

			var css = '#IBList{margin-left: 20px;} #IBList:hover{color: darkred;}';
			if (isIE)
				PRO_addStyle(css);
			else
				GM_addStyle(css);

			// create an event listener - trap the mouse click
			if (isIE) {
				link.attachEvent('onclick', yandex_copy);
				PRO_registerMenuCommand("View saved values", menu_values);
			} else {
				link.addEventListener('click', yandex_copy, true);
				GM_registerMenuCommand("View saved values", menu_values);
			}
			// insert into document
			//      pd.parentNode.parentNode.insertBefore(link, pd.parentNode.parentNode.getElementsByTagName('div')[0]);
			pd.parentNode.insertBefore(link, pd);
		}
	}

	function go_wikimart_admin() {
		/*
		insert a 'Paste' link
		*/

		var nodes = document.getElementsByClassName('attr');

		for (var i = 0; i < nodes.length; i++) {
			if (nodes[i].nodeName == 'TABLE') {
				// create a paste FROM storage link
				var link = document.createElement('button');
				link.id = 'IBList';
				link.setAttribute('title', 'Paste details into manifestation.');
				link.appendChild(document.createTextNode("Insert Product Details"));

				var css = '#IBList{margin-left: 20px;} #IBList:hover{color: darkred;}';
				if (isIE)
					PRO_addStyle(css);
				else
					GM_addStyle(css);

				// create an event listener - trap the mouse click
				if (isIE) {
					link.attachEvent('onclick', wikimart_admin_paste);
					PRO_registerMenuCommand("View saved values", menu_values);
				}
				else {
					link.addEventListener('click', wikimart_admin_paste, true);
					GM_registerMenuCommand("View saved values", menu_values);
				}
				// insert into document
				nodes[i].appendChild(link);

				break;
			}
		}
	}

	function go_wikimart() {
		/*
		insert a 'Paste' link
		*/

		var nodes = document.getElementsByTagName('TABLE');

		// create a paste FROM storage link
		var link = document.createElement('button');
		link.id = 'IBList';
		link.setAttribute('title', 'Paste details into manifestation.');
		link.appendChild(document.createTextNode("Insert Product Details"));

		var css = '#IBList{margin-left: 20px;} #IBList:hover{color: darkred;}';
		if (isIE)
			PRO_addStyle(css);
		else
			GM_addStyle(css);

		// create an event listener - trap the mouse click
		if (isIE) {
			link.attachEvent('onclick', wikimart_paste);
			PRO_registerMenuCommand("View saved values", menu_values);
		}
		else {
			link.addEventListener('click', wikimart_paste, true);
			GM_registerMenuCommand("View saved values", menu_values);
		}
		// insert into document
		nodes[0].parentNode.parentNode.insertBefore(link, nodes[0].parentNode);
	}

	if (/wikimart/i.test(location.host) && (location.href.match(/act=new/i) || location.href.match(/act=edit/i)))
		go_wikimart_admin();
	else if (/wikimart/i.test(location.host) && location.href.match(/step4/i))
		go_wikimart();
	else if (/yandex/i.test(location.host))
		go_yandex();
})();