// ==UserScript==
// @name            TW-Collections-RU Translation
// @description     Russian Translation - TW-Collections (Anch665) 
// @include         http://*.the-west.*/game.php*
// @include         http://userscripts.org/scripts/source/417551*
// @version         1.0.0
// @grant       none 
// ==/UserScript==
// To add a new language to the TW Collections script :
// Copy / paste this content into a new script
// Replace  translator by your name
//			idscript by the id of the script (last part of the url of your script)
//			short_name by the short name for your language
//			name by the long name of your language
// Replace all lines with your translation
// 
//
// Use with TW Collection script :
// Install this script (and of course TW Collections script), the new language appears in the settings.
//

(function(e) {
	var t = document.createElement("script");
	t.type = "application/javascript";
	t.textContent = "(" + e + ")();";
	document.body.appendChild(t);
	t.parentNode.removeChild(t)
})
		(function() {
			if (window.location.href.indexOf(".the-west.") > 0) {

				TWT_ADDLANG = {
					translator : 'Anch665',
					idscript : '417551',
					version : '1.0.0',
					short_name : 'ru',
					name : 'Русский',
					translation : {
					   // START OF LANGUAGE VARS
							description : "<center><BR /><b>TW-Collections</b><br><b>Советы и отчеты о недостающих предметах коллекций <br>список необходимых предметов<BR>Оплата услуг банка мышью<br> Различные ярлыки"
									+ "<br>Удаление всех отчетов<br> Сборы в банке <br> Дополнительные кнопки в инвентаре (дубликаты, рецепты, наборы) <br>другое ...</b>",
							Options : {
								tab : {
									setting : 'Настройки'
								},
								checkbox_text : {
									box : {
										title : 'Особенности / Меню',
										options : {
											goHome : 'Идем Домой',
											goToDaily1 : 'Город-Призрак',
											goToDaily2 : 'Деревня племени Вупи ',
											ownSaloon : 'Открыть Салун',
											openMarket : 'Открыть Рынок',
											mobileTrader : 'Открыть Магшазин Юнион Пасифик',
											forum : 'Открыть Сплетни',
											listNeeded : 'Открыть Необходимые элементы коллекций'

										}
									},
									collection : {
										title : 'Коллекции',
										options : {
											gereNewItems : 'Новые предметы для достижений',
											patchsell : 'Отсутствует в багаже',
											patchtrader : 'Отсутствует у коммивояжёра',
											patchmarket : 'Отсутствует на рынке',
											showmiss : 'Список отсутствующих вещей',
											filterMarket : 'Фильтр рынка : показывать только недостающие вещи (коллекции)'

										}
									},
									inventory : {
										title : 'Кнопки в инвентаре',
										doublons : 'Дополнительные кнопки инвентаря (дублирует,можно съесть, рецепт, наборы)',
										options : {
											doublons : 'Добавить кнопку для поиска дубликатов',
											useables : 'Добавить кнопку для поиска можно съёсть',
											recipe : 'Добавить кнопку для поиска рецептов',
											sets : 'Добавить кнопку для списка наборов',
											sum : 'Сумма продажи'

										}
									},
									miscellaneous : {
										title : 'Miscellaneous',
										options : {
											lang : 'Язык',
											logout : 'Добавить кнопку Выход',
											deleteAllReports : 'Скрыть все отчёты',
											showFees : 'Комиссия банка',
											popupTWT:'Открыть меню TW Collection'
										}
									},
									twdbadds : {
										title : 'Калькулятор',
										options : {
											filterBuyMarket : 'Фильтр рынка : показывать только недостающие вещи (twdb add)',
											addNewToShop : 'Показать вещи в магазине'
										}
									}
								},
								message : {
									title : 'Информация',
									message : 'Предпочтения были применены',
									reloadButton : 'Перезагрузить страницу',
									gameButton : 'Вернуться в игру',
									indispo : 'Установка недоступна (Коллекции собраны или скрипт недоступен)',
									more : 'Подробнее?',
									moreTip : 'Показать советы'
								},
								update : {
									title : 'TW Collection обновление',
									upddaily : 'Каждый день',
									updweek : 'Каждую неделю',
									updnever : 'Никогда',
									checknow : 'Проверить сейчас?',
									updok : "Скрипт TW Collection's обновлен до последней версии",
									updlangmaj : 'Доступно обновление, перейдите по ссылкам ниже, чтобы обновить',
									updscript : 'Доступно обновление TW Collection. Обновить?',
									upderror : 'Невозможно обновить, вы должны установить скрипт вручную'
								},
								saveButton : 'Сохранить'

							},
							ToolBox : {
								title : 'Особенности',
								list : {
									openOptions : 'Настройки'
								}
							},
							Doublons : {
								tip : 'Дубликаты',
								current : 'Поиск',
								noset : 'Без наборов',
								sellable : 'Частично',
								auctionable : 'Аукцион',
								tipuse : 'Можно съесть',
								tiprecipe : 'Рецепты',
								tipsets : 'Наборы',
								sellGain : 'Сумма продажи'
							},
							Logout : {
								title : 'Выход'
							},
							AllReportsDelete : {
								button : 'Запретить всё',
								title : 'Запретить все отчеты',
								work : 'Работа',
								progress : 'Прогресс',
								userConfirm : 'Подтверждение пользователя',
								loadPage : 'Время загрузки',
								deleteReports : 'Удалить отчеты',
								confirmText : 'Удалить отчеты - Вы уверены?',
								deleteYes : 'Да, удалить',
								deleteNo : 'Нет, оставить',
								status : {
									title : 'Статус',
									wait : 'Подождите',
									successful : 'Успешно',
									fail : 'Ошибка',
									error : 'Ошибка'
								}
							},
							fees : {
								tipText : '%1 % Сборы : $%2'

							},
							twdbadds : {
								buyFilterTip : 'Показать только недостающие предметы',
								buyFilterLabel : 'Недостающие предметы'
							},
							collection : {
								miss : "Отсутствуют: ",
								thText : 'Отсутствующие предметы',
								thEncours : 'У вас есть заявка на этот предмет',
								thFetch : 'Вы можете получить этот предмет на %1\ рынке',
								allOpt : 'Все',
								collectionFilterTip : 'Показать только коллекции предметов',
								collectionFilterLabel : 'Только коллекции',
								select : 'Выберите...',
								listText : 'Нужно для коллекции',
								filters : 'Фильтры',
								atTrader : 'Коммивояжёр',
								atBid : 'Текущая ставка',
								atCurBid : 'Конечная ставка',
								atTraderTitle : 'Можно купить у коммивояжёра',
								atBidTitle : 'Показать только ставки',
								atCurBidTitle : 'Товары доступные на рынке',
								searchMarket : 'Поиск по рынку',
								patchsell : {
									title : "Предметы необходимые для коллекции"
								}
							}
						}
					},



					// DO NOT CHANGE BELOW THIS LIGNE
					init : function() {
						var that = this;
						if (typeof window.TWT == 'undefined'
								|| window.TWT == null) {
							EventHandler.listen('twt.init', function() {
								TWT.addPatchLang(that);
								return EventHandler.ONE_TIME_EVENT;
							});
						} else {
							EventHandler.signal('twt_lang_started_'
									+ that.short_name);
							TWT.addPatchLang(that);

						}
					}

				}.init();
			}
		});