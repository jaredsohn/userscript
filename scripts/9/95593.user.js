// ==UserScript==
// @include        http://forums.overclockers.ru/*
// @include        http://www.overclockers.ru/*
// @include        http://people.overclockers.ru/*
// @id             forums-overclockers-ru
// @name           Форум Overclockers.ru
// @namespace      http://coolcmd.webhosting-for-free.com/script/
// @description    Доработка форума Overclockers.ru, главного сайта и Персональных страниц.
// @version        2014.4.26
// @author         CoolCmd
// @license        MIT License; http://opensource.org/licenses/mit-license
// @homepage       http://userscripts.org/scripts/show/95593
// @updateURL      https://userscripts.org/scripts/source/95593.meta.js
// @downloadURL    https://userscripts.org/scripts/source/95593.user.js
// @icon                      https://img-fotki.yandex.ru/get/9761/8035363.1/0_caab8_8dbd2d15_orig
// @icon64                    https://img-fotki.yandex.ru/get/9807/8035363.1/0_caab7_ea97db0b_orig
// @resource       unreadpost https://img-fotki.yandex.ru/get/9065/8035363.1/0_caaba_9dcc4e1e_orig
// @resource       lastpost   https://img-fotki.yandex.ru/get/9065/8035363.1/0_caab9_c5f8bf01_orig
// @resource       error      https://img-fotki.yandex.ru/get/9814/8035363.1/0_caabb_629b3779_orig
// @resource       info       https://img-fotki.yandex.ru/get/9824/8035363.1/0_caabc_bca8a419_orig
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_deleteValue
// @grant          GM_addStyle
// @grant          GM_getResourceURL
// @grant          GM_info
// @grant          unsafeWindow
// @noframes
// ==/UserScript==


"use strict";

//
// Глобальные константы для всех обозревателей.
//

var ИСТОРИЯ_ИЗМЕНЕНИЙ =
[
	'2011.8.15',   'Ссылка "Ваши сообщения" теперь ищет только те темы, в которые вы писали последние полгода (можно отключить в настройках сценария).',
	'2011.9.16',   'В форме быстрого поиска для переключения флажка можно щелкать текст справа от него.',
	'2011.9.16',   'В форме быстрого поиска (в правом верхнем углу) удалена подсказка "Поиск...", которая мешала перетаскивать текст и вставлять текст средней кнопкой мыши (в Firefox).',
	'2011.11.1',   'На сайте немного увеличен межстрочный интервал основного текста.',
	'2011.11.1',   'На сайте в статьях и новостях убрано пустое место по бокам страницы.',
	'2011.12.3',   'В папке с личными сообщениями изменено действие по-умолчанию с "Пометить" на "Удалить".',
	'2011.12.24',  'В форме редактирования сообщения кнопка URL вставляет [url=] вместо [url].',
	'2012.3.27',   'ТЕПЕРЬ БУДУТ ПОДДЕРЖИВАТЬСЯ ТОЛЬКО ПОСЛЕДНИЕ ВЕРСИИ ОБОЗРЕВАТЕЛЕЙ. ЕСЛИ У ВАС СТАРАЯ ВЕРСИЯ ОБОЗРЕВАТЕЛЯ, ТО НЕ ОБНОВЛЯЙТЕ СЦЕНАРИЙ.',
	'2012.3.27',   'Персональные страницы: добавлен значок сайта.',
	'2012.4.4',    'Обновлением сценария в Firefox теперь занимается дополнение Greasemonkey или Scriptish. ПОЖАЛУЙСТА, УДАЛИТЕ СЦЕНАРИЙ, ОБНОВИТЕ ДОПОЛНЕНИЕ ДО ПОСЛЕДНЕЙ ВЕРСИИ (GREASEMONKEY НЕ НИЖЕ 0.9.18) И СНОВА УСТАНОВИТЕ СЦЕНАРИЙ, ИНАЧЕ АВТООБНОВЛЕНИЕ МОЖЕТ НЕ ЗАРАБОТАТЬ. УСТАНАВЛИВАЙТЕ СЦЕНАРИЙ ЧЕТКО ПО ИНСТРУКЦИИ, КОТОРАЯ НАХОДИТСЯ НА ДОМАШНЕЙ СТРАНИЦЕ СЦЕНАРИЯ (ССЫЛКА В ПЕРВОЙ СТРОКЕ ЭТОГО УВЕДОМЛЕНИЯ).',
	'2012.4.30',   'В сообщениях удалена лишняя кнопка [цитировать].',
	'2012.6.2',    'Улучшен внешний вид печатной версии статей и новостей. На главной странице www.overclockers.ru щелкните изображение слева от ссылок на новости и статьи.',
	'2012.6.9',    'Добавлена возможность просмотра всех сообщений темы на одной странице. Используйте ее для поиска текста средствами обозревателя (поиск форума имеет некоторые ограничения) или для сохранения темы на диске. Ссылка для просмотра находится в менюшке "Тема".',
	'2012.6.29',   'В Opera сценарий заменен на расширение. Подробная инструкция по замене находится на домашней странице сценария. В Firefox и Chrome ничего переустанавливать не нужно.',
	'2012.7.6',    'Добавлена новая плюшка: в сообщениях ссылки фотохостингов по возможности изменяются так, что бы указывать непосредственно на изображение. Так же, удаляются лишние ссылки, которые ведут на главную страницу фотохостинга. Плюшку можно отключить в настройках сценария/расширения. Там же находится более подробное описание плюшки.',
	'2012.7.6',    'Удалена неактуальная на данный момент настройка, которая скрывала миниатюры РадиКала.',
	'2012.7.6',    'Изменен состав старых смайликов в форме быстрого ответа.',
	'2012.11.22',  'В цитируемом сообщении удаляются вложенные цитаты (кнопка "Ответить" в теме или кнопка "Цитата" в ЛС).',
	'2013.1.4',    'Ссылки на главной странице сайта открывают статьи и новости в более удобном для чтения виде. По умолчанию эта плюшка отключена в настройках сценария, хотя я рекомендую ее включить. Сделайте это прямо сейчас. :) В настройках сценария находится подробное описание этой плюшки. Если забыли как открыть настройки, то загляните на домашнюю страницу сценария по ссылке выше.',
	'2013.3.18',   'В форму поиска (в правом верхнем углу) добавлен поиск по форуму с помощью Яндекс и Google.',
	'2013.3.18',   'В форму поиска (в правом верхнем углу) добавлена справка по составлению поисковых запросов. Прочтите ее, там есть много полезной информации.',
	'2014.3.5',    'Персональные страницы: увеличина ширина текста статей.',
	'2014.4.21',   'Убрано ограничение, когда открыть статью или новость в более удобном для чтения виде можно было только с главной страницы сайта. Включить режим чтения можно в настройках сценария.',
];

// Формат версии: http://developer.chrome.com/extensions/manifest/version
var ВЕРСИЯ_СЦЕНАРИЯ = '2014.4.26';

var МАКС_ШИРИНА_ТЕКСТА_САЙТА       = '95em';
var МАКС_ШИРИНА_ТЕКСТА_ПС          = '110em';

var ФЛ_КРУПНЫЕ_ЗНАЧКИ              = 1 << 0;
//  ФЛ_СКРЫТЬ_МИНИАТЮРЫ_РАДИКАЛА   = 1 << 1;
//  ФЛ_АВТООБНОВЛЕНИЕ_СЦЕНАРИЯ     = 1 << 2;
var ФЛ_ССЫЛКА_В_ЦИТАТЕ             = 1 << 3;
//  ФЛ_ССЫЛКИ_В_НОВОЙ_ВКЛАДКЕ      = 1 << 4;
var ФЛ_СТАРЫЕ_СМАЙЛИКИ             = 1 << 5;
var ФЛ_СКРЫТЬ_СМАЙЛИКИ             = 1 << 6;
var ФЛ_НЕ_ИСКАТЬ_В_БАРАХОЛКЕ       = 1 << 7;
var ФЛ_НЕ_ИСКАТЬ_СТАРЫЕ_СООБЩЕНИЯ  = 1 << 8;
var ФЛ_ССЫЛКИ_НА_ФОТОХОСТИНГИ      = 1 << 9;
var ФЛ_ВЕРСИЯ_ДЛЯ_ПРОСМОТРА        = 1 << 10;

var DOCUMENT_POSITION_DISCONNECTED = 1;
var DOCUMENT_POSITION_PRECEDING    = 2;
var DOCUMENT_POSITION_FOLLOWING    = 4;
var DOCUMENT_POSITION_CONTAINS     = 8;
var DOCUMENT_POSITION_CONTAINED_BY = 16;

// Список всех известных смайликов.
// 0: Имя файла старого изображения, которое будет заменено на изображение из индекса 2. Если пусто, то изображение менять не нужно.
// 1: Показывать или нет ссылку для вставки смайлика...
//    0 - не показывать
//    1 - показать во всплывающем окне
//    2 - показать во всплывающем окне и в форме редактирования
// 2: Адрес изображения.
// 3: Ширина изображения в пикселах.
// 4: Высота изображения в пикселах.
// 5: Краткое описание смайлика.
// 6: BBCode смайлика. Если пусто, то будет вставлен [img].
// 7: Ширина изображения в пикселах. Только для ссылки, которая вставляет смайлик. Если пусто, то используется значение индекса 3.
// 8: Высота изображения в пикселах. Только для ссылки, которая вставляет смайлик. Если пусто, то используется значение индекса 4.
var г_мСмайлики =
[
	[                         , 2, './images/smilies/old_smile.gif'                             , 15, 15, 'Улыбка'                , ':old_smile:'       ],
	[                         , 2, './images/smilies/old_biggrin.gif'                           , 15, 15, 'Гы гы гы'              , ':old_biggrin:'     ],
	[                         , 2, './images/smilies/old_tooth.gif'                             , 15, 15, 'Беззубая улыбка'       , ':tooth:'           ],
	[                         , 2, './images/smilies/old_lol.gif'                               , 15, 15, 'Ржунимагу'             , ':old_lol:'         ],
	[                         , 2, './images/smilies/old_haha.gif'                              , 15, 15, 'Громкий смех'          , ':old_haha:'        ],
	[                         , 2, './images/smilies/old_wink.gif'                              , 15, 15, 'Подмигивание'          , ':old_wink:'        ],
	[                         , 2, './images/smilies/old_razz.gif'                              , 15, 15, 'Показывает язык'       , ':old_razz:'        ],
	[                         , 2, './images/smilies/old_sad.gif'                               , 15, 15, 'Расстроен'             , ':old_sad:'         ],
	[                         , 2, './images/smilies/old_weep.gif'                              , 21, 15, 'Плачь'                 , ':weep:'            ],
	[                         , 2, './images/smilies/old_mad.gif'                               , 15, 15, 'Злой'                  , ':old_mad:'         ],
	[                         , 2, './images/smilies/old_mad2.gif'                              , 31, 20, 'Разгневанный'          , ':old_mad2:'        ],
	[                         , 2, './images/smilies/old_redface.gif'                           , 15, 20, 'Смущение'              , ':old_redface:'     ],
	[                         , 2, './images/smilies/old_rolleyes.gif'                          , 15, 15, 'Смайлик без описания'  , ':old_rolleyes:'    ],
	[                         , 2, './images/smilies/old_slobber.gif'                           , 15, 16, 'Слюньки текут'         , ':old_slobber:'     ],
	[                         , 2, './images/smilies/old_beer.gif'                              , 57, 16, 'Пиво!'                 , ':old_beer:'        ],
	[                         , 2, './images/smilies/old_applause.gif'                          , 19, 16, 'Аплодисменты'          , ':old_applause:'    ],
	['old_super.gif'          , 2, 'http://s.rimg.info/f84d628cccfaf4a13c4c5fab5b283eea.gif'    , 26, 21, 'Супер!'                , ':old_super:'       ],
	['old_dance.gif'          , 2, 'http://s20.rimg.info/84c403c1d713a40de691804e40e8721b.gif'  , 25, 16, 'Танцую'                , ':old_dance:'       ], // У банана анимация глючит
	['old_up.gif'             , 2, 'http://s.rimg.info/866017f12f2dc1bd84652bfee057f650.gif'    , 25, 18, 'Одобряю'               , ':up:'              ],
	['negative.gif'           , 2, 'http://s.rimg.info/d08b99bdc8ab296cd0123ace7156f04e.gif'    , 15, 15, 'Не одобряю'            , ':negative:'        ],
	[                         , 2, './images/smilies/old_cool.gif'                              , 15, 15, 'Круто'                 , ':old_cool:'        ],
	['yes4.gif'               , 2, 'http://s20.rimg.info/ce90a79ed60e09999155bb5b4c78a373.gif'  , 15, 15, 'Да'                    , ':yes:'             ],
	['no2.gif'                , 2, 'http://s20.rimg.info/f92f45cf96e9fa4569561dbd4c7fa8c9.gif'  , 15, 15, 'Нет'                   , ':no2:'             ],
	['old_hi.gif'             , 2, 'http://s.rimg.info/178c4bcf8a144f75914def57bbbaed58.gif'    , 25, 29, 'Привет'                , ':old_hi:', 21, 24  ],
	['old_confused.gif'       , 2, 'http://s.rimg.info/cbad196802ad5d6ec5fb2d32da113f9d.gif'    , 20, 20, 'Задумался'             , ':old_confused:'    ],
	[                         , 2, './images/smilies/old_banghead.gif'                          , 25, 20, 'Бьется головой о стену', ':old_banghead:'    ],
	[                         , 2, './images/smilies/old_hitrost.gif'                           , 15, 15, 'Хитрость'              , ':hitrost:'         ],
	[                         , 2, './images/smilies/old_spy.gif'                               , 15, 15, 'Шпион'                 , ':spy:'             ],
	[                         , 2, './images/smilies/old_eek.gif'                               , 15, 15, 'Шок'                   , ':old_eek:'         ],
	[                         , 2, './images/smilies/old_insane.gif'                            , 15, 15, 'Не в себе'             , ':insane:'          ],
	['crazy.gif'              , 2, 'http://s.rimg.info/1a213d94d59127756ce20a09bb10f78b.gif'    , 17, 24, 'Сумашедший'            , ':crazy:'           ],
	['scare.gif'              , 2, 'http://s20.rimg.info/b3e647e26b7e31b4593183dd30222404.gif'  , 17, 16, 'Испуг'                 , ':scare:'           ], // http://s20.rimg.info/6543a6e2a35774bc91e39188b028d1f5.gif
	[                         , 2, './images/smilies/old_fingal.gif'                            , 20, 15, 'Фингал'                , ':old_fingal:'      ],
	[                         , 2, './images/smilies/old_writer.gif'                            , 29, 19, 'Писатель'              , ':old_writer:'      ],
	[                         , 2, './images/smilies/old_abuse.gif'                             , 36, 15, 'Ругань'                , ':abuse:'           ],
	[                         , 2, './images/smilies/old_gun.gif'                               , 58, 15, 'Стреляю'               , ':gun:'             ],
	[                         , 2, './images/smilies/old_rip.gif'                               , 15, 15, 'Могилка'               , ':rip:'             ],
	['facepalm.gif'           , 2, 'http://s20.rimg.info/7717c4c2a0945d71d4762e4eb8c096f2.gif'  , 21, 15, 'Нет слов'              , ':facepalm:'        ],
	['sorry.gif'              , 1, 'http://s20.rimg.info/35d9062c3c33c84f3671acbfa5a4b9b9.gif'  , 15, 15, 'Извини'                , ':sorry:'           ],
	[                         , 1, 'http://s2.rimg.info/2a97ba3667cadd4e551fd4df2fb18568.gif'   , 15, 15, 'Я серьезно'                                  ],
	[                         , 1, './images/smilies/old_bow.gif'                               , 15, 21, 'Благодарю'             , ':bow:'             ],
	[                         , 1, './images/smilies/old_grob.gif'                              , 44, 19, 'Я тебя живьем закопаю!', ':grob:'            ],
	['diablo.gif'             , 1, 'http://s20.rimg.info/77695f0a9d2b7d67a7603d0d2897b2f6.gif'  , 17, 18, 'Ацкий сотона'          , ':diablo:'          ],
	[                         , 1, 'http://s.rimg.info/1a0c4180b7e5eb584b62f35969fcb6b3.gif'    , 15, 15, 'Ухожу'                                       ],
	['biggrin.gif'            , 0, './images/smilies/old_biggrin.gif'                           , 15, 15, 'Гы гы гы'              , ':D'                ],
	['smile3.gif'             , 0, './images/smilies/old_smile.gif'                             , 15, 15, 'Улыбка'                , ':-)'               ],
	['sad.gif'                , 0, './images/smilies/old_sad.gif'                               , 15, 15, 'Расстроен'             , ':-('               ],
	['lol.gif'                , 0, './images/smilies/old_lol.gif'                               , 15, 15, 'Ржунимагу'             , ':lol:'             ],
	['mad.gif'                , 0, './images/smilies/old_mad.gif'                               , 15, 15, 'Злой'                  , ':x'                ],
	['blum3.gif'              , 0, 'http://s20.rimg.info/5ee18b4be72dde7b67bcbb24be9bb381.gif'  , 15, 15, 'Показывает язык'       , ':-P'               ],
	['cray.gif'               , 0, './images/smilies/old_weep.gif'                              , 21, 15, 'Плачь'                 , ':cry:'             ],
	['blush2.gif'             , 0, './images/smilies/old_redface.gif'                           , 15, 20, 'Смущение'              , ':oops:'            ],
	['haha.gif'               , 0, './images/smilies/old_haha.gif'                              , 15, 15, 'Ха ха ха'              , ':haha:'            ], // Повтор laugh1.gif
	['wink.gif'               , 0, './images/smilies/old_wink.gif'                              , 15, 15, 'Подмигивание'          , ';-)'               ],
	['wacko2.gif'             , 0, './images/smilies/old_insane.gif'                            , 15, 15, 'Не в себе'             , ':roll:'            ],
	['dance3.gif'             , 0, 'http://s20.rimg.info/84c403c1d713a40de691804e40e8721b.gif'  , 25, 16, 'Танцую'                , ':dance:'           ], // У банана анимация глючит
	['mail1.gif'              , 0, './images/smilies/old_writer.gif'                            , 29, 19, 'Писатель'              , ':writer:'          ],
	['drinks.gif'             , 0, './images/smilies/old_beer.gif'                              , 57, 16, 'Пиво!'                 , ':beer:'            ],
	['scratch_one-s_head.gif' , 0, 'http://s.rimg.info/cbad196802ad5d6ec5fb2d32da113f9d.gif'    , 20, 20, 'Задумался'             , ':?:'               ], // ./images/smilies/old_confused.gif
	['shok.gif'               , 0, './images/smilies/old_eek.gif'                               , 15, 15, 'Шок'                   , ':shock:'           ],
	['cool.gif'               , 0, './images/smilies/old_cool.gif'                              , 15, 15, 'Круто'                 , '8-)'               ],
	['dash2.gif'              , 0, './images/smilies/old_banghead.gif'                          , 25, 20, 'Бьется головой о стену', ':bandhead:'        ],
	['preved.gif'             , 0, 'http://s.rimg.info/178c4bcf8a144f75914def57bbbaed58.gif'    , 25, 29, 'Привет'                , ':hi:'              ],
	['yahoo.gif'              , 0, 'http://s.rimg.info/f84d628cccfaf4a13c4c5fab5b283eea.gif'    , 26, 21, 'Супер!'                , ':super:'           ],
	['ireful3.gif'            , 0, './images/smilies/old_mad2.gif'                              , 31, 20, 'Разгневанный'          , ':mad2:'            ],
	['black_eye.gif'          , 0, './images/smilies/old_fingal.gif'                            , 20, 15, 'Фингал'                , ':fingal:'          ],
	['clapping.gif'           , 0, './images/smilies/old_applause.gif'                          , 19, 16, 'Аплодисменты'          , ':applause:'        ],
	['laugh1.gif'             , 0, './images/smilies/old_haha.gif'                              , 15, 15, 'Громкий смех'          , ':laugh:'           ],
	['pardon.gif'             , 1, 'http://kolobok.us/smiles/mini/pardon_mini.gif'              , 26, 20, 'Пардон'                , ':pardon:'          ],
	['acute.gif'              , 1, 'http://s20.rimg.info/94cf7f9b2bf00e0cc83254cc7bc33d87.gif'  , 21, 15, 'Грозит пальцем'        , ':acute:'           ],
	['aggressive.gif'         , 1, 'http://s.rimg.info/598622db0dbca0d60bf005b7f465cc5f.gif'    , 26, 22, 'Агрессивный'           , ':aggressive:'      ],
	[                         , 1, './images/smilies/agree.gif'                                 , 37, 23, 'Согласен'              , ':agree:'           ],
	['air_kiss.gif'           , 1, 'http://kolobok.us/smiles/light_skin/air_kiss.gif'           , 23, 26, 'Воздушный поцелуй'     , ':air_kiss:'        ],
	[                         , 1, './images/smilies/alcoholic.gif'                             , 40, 20, 'Напился'               , ':alcoholic:'       ],
	['angel.gif'              , 1, 'http://kolobok.us/smiles/light_skin/angel.gif'              , 27, 26, 'Ангел'                 , ':angel:'           ],
	['angry2.gif'             , 0, './images/smilies/old_mad2.gif'                              , 31, 20, 'Рассерженный'          , ':angry:'           ], // Повтор ireful3.gif
	['bad.gif'                , 1, 'http://kolobok.us/smiles/mini/bo_mini.gif'                  , 18, 18, 'Тошнит'                , ':bad:'             ],
	['beee.gif'               , 1, 'http://s.rimg.info/3746019f2f13e918edf75420f5e50acb.gif'    , 25, 21, 'Высокомерие'           , ':beee:'            ],
	[                         , 1, './images/smilies/blind.gif'                                 , 27, 23, 'Слепой'                , ':blind:'           ],
	['boast.gif'              , 1, 'http://kolobok.us/smiles/light_skin/boast.gif'              , 35, 25, 'Хвастается'            , ':boast:'           ],
	['boredom.gif'            , 1, 'http://s.rimg.info/77f84df8ef855d4c3157af0383fa5dd0.gif'    , 15, 15, 'Засыпаю'               , ':boredom:'         ],
	['bye.gif'                , 1, 'http://s20.rimg.info/64bbf1afb2916f02aad575b5541f427f.gif'  , 25, 15, 'Пока!'                 , ':bye:'             ],
	[                         , 1, './images/smilies/comando.gif'                               , 41, 31, 'Десантник'             , ':comando:'         ],
	[                         , 1, './images/smilies/crazy_pilot.gif'                           , 50, 31, 'Летчик'                , ':crazy_pilot:'     ],
	['declare.gif'            , 1, 'http://kolobok.us/smiles/light_skin/declare.gif'            , 38, 26, 'Представление'         , ':declare:'         ],
	[                         , 1, './images/smilies/derisive.gif'                              , 20, 24, 'Ирония'                , ':derisive:'        ],
	['dirol.gif'              , 1, 'http://kolobok.us/smiles/light_skin/dirol.gif'              , 21, 21, 'Жвачка'                , ':dirol:'           ],
	['dntknw.gif'             , 1, 'http://s20.rimg.info/483cc267580c556b4c59bebcbedbaba7.gif'  , 23, 15, 'Ничего не понимаю'     , ':dntknw:'          ],
	['don-t_mention.gif'      , 1, 'http://kolobok.us/smiles/light_skin/don-t_mention.gif'      , 28, 25, 'Не за что'             , ':don-t_mention:'   ],
	['download.gif'           , 1, 'http://kolobok.us/smiles/light_skin/download.gif'           , 28, 32, 'Закачка'               , ':download:'        ],
	['fool.gif'               , 1, 'http://s19.rimg.info/fe34682d712eae72da196ef8215854de.gif'  , 44, 25, 'Дурак'                 , ':fool:'            ], // http://kolobok.us/smiles/mini/fool_mini2.gif
	['gamer1.gif'             , 1, 'http://kolobok.us/smiles/light_skin/gamer1.gif'             , 37, 27, 'Топчет клаву'          , ':gamer:'           ],
	['gamer3.gif'             , 1, 'http://kolobok.us/smiles/light_skin/gamer3.gif'             , 37, 27, 'Сломал крысу'          , ':gamer3:'          ],
	['gamer4.gif'             , 1, 'http://s.rimg.info/e15bc8d70d829b0f530c821f1b2e30b9.gif'    , 24, 23, 'Геймер'                , ':gamer4:'          ],
	['girl_crazy.gif'         , 1, 'http://kolobok.us/smiles/light_skin/girl_crazy.gif'         , 37, 25, 'Ненормальная'          , ':girl_crazy:'      ],
	['girl_hospital.gif'      , 1, 'http://kolobok.us/smiles/light_skin/girl_hospital.gif'      , 42, 25, 'Медсестра'             , ':girl_hospital:'   ],
	['good3.gif'              , 0, 'http://s.rimg.info/866017f12f2dc1bd84652bfee057f650.gif'    , 25, 18, 'Одобряю'               , ':good:'            ],
	['hang3.gif'              , 1, 'http://kolobok.us/smiles/light_skin/hang3.gif'              , 27, 35, 'Повесился'             , ':hang:'            ],
	['heat.gif'               , 1, 'http://kolobok.us/smiles/light_skin/heat.gif'               , 33, 29, 'Жарко'                 , ':heat:'            ],
	['help.gif'               , 1, 'http://s.rimg.info/99c35a8d5d0095c52068fec8b2be47f4.gif'    , 23, 15, 'Помогите!'             , ':help:'            ],
	['hunter.gif'             , 1, 'http://kolobok.us/smiles/light_skin/hunter.gif'             , 48, 38, 'Охотник'               , ':hunter:'          ],
	['i-m_so_happy.gif'       , 1, 'http://s20.rimg.info/e1702bd707d423926e736837c576389d.gif'  , 15, 15, 'Счастливый'            , ':so_happy:'        ],
	['lazy3.gif'              , 1, 'http://kolobok.us/smiles/light_skin/lazy.gif'               , 23, 24, 'Сон'                   , ':lazy:'            ],
	[                         , 1, './images/smilies/locomotive.gif'                            , 38, 26, 'Паровоз'               , ':locomotive:'      ],
	['mamba.gif'              , 1, 'http://s17.rimg.info/b035672d187ff4bd1acf02755e2c3f03.gif'  , 15, 16, 'Могу укусить'          , ':mamba:'           ],
	['man_in_love.gif'        , 1, 'http://kolobok.us/smiles/light_skin/man_in_love.gif'        , 20, 26, 'Влюбился по уши'       , ':man_in_love:'     ],
	['mda.gif'                , 1, 'http://forum.ixbt.com/smirk.gif'                            , 15, 15, 'Мда'                   , ':mda:'             ],
	[                         , 1, './images/smilies/meeting.gif'                               , 41, 25, 'Встреча'               , ':meeting:'         ],
	['mosking.gif'            , 1, 'http://kolobok.us/smiles/mini/mocking_mini.gif'             , 20, 20, 'Насмешка'              , ':mosking:'         ],
	['music.gif'              , 1, 'http://s17.rimg.info/75a532599180865ff00eabb4f4307cb6.gif'  , 27, 23, 'Музыка'                , ':music:'           ],
	['nea.gif'                , 1, 'http://kolobok.us/smiles/light_skin/nea.gif'                , 36, 26, 'Не-а'                  , ':nea:'             ],
	[                         , 1, './images/smilies/neo.gif'                                   , 33, 24, 'Нео'                   , ':neo:'             ],
	['new_russian.gif'        , 1, 'http://kolobok.us/smiles/mini/new_russian_mini.gif'         , 30, 22, 'Новый русский'         , ':new_russian:'     ],
	[                         , 1, './images/smilies/not_i.gif'                                 , 24, 21, 'Не я'                  , ':not_i:'           ],
	['nyam.gif'               , 1, 'http://s6.rimg.info/a9d069c66436154da3004c013ed10dda.gif'   , 15, 15, 'Вкусно'                , ':nyam:'            ],
	['on_the_quiet.gif'       , 0, 'http://s.rimg.info/b98b0561d3a7404136f11d72fec6bc16.gif'    , 31, 17, 'Дразнить в след'       , ':on_the_quiet:'    ], // Повтор blum3.gif
	['padonak.gif'            , 1, 'http://kolobok.us/smiles/light_skin/padonak.gif'            , 34, 30, 'Падонаг'               , ':padonak:'         ],
	['paint.gif'              , 1, 'http://kolobok.us/smiles/light_skin/paint3.gif'             , 41, 28, 'Художник'              , ':paint:'           ],
	['pilot.gif'              , 1, 'http://kolobok.us/smiles/light_skin/pilot.gif'              , 38, 26, 'Пародия на летчика'    , ':pilot:'           ],
	['pleasantry.gif'         , 1, 'http://s20.rimg.info/e49b1462c3dfb54cf80c88f93d3be120.gif'  , 35, 17, 'Шутка'                 , ':pleasantry:'      ],
	['prankster2.gif'         , 1, 'http://kolobok.us/smiles/light_skin/prankster2.gif'         , 20, 24, 'Шутник'                , ':prankster:'       ],
	[                         , 1, './images/smilies/resent.gif'                                , 24, 24, 'Обиженный'             , ':resent:'          ],
	['rofl.gif'               , 0, './images/smilies/old_lol.gif'                               , 15, 15, 'Ржунимагу'             , ':rofl:'            ], // Повтор lol.gif
	['rtfm.gif'               , 1, 'http://kolobok.us/smiles/light_skin/rtfm.gif'               , 26, 26, 'RTFM'                  , ':rtfm:'            ],
	['sarcastic_hand.gif'     , 1, 'http://s.rimg.info/a7fb0c2a4c5c4fdaf69f29f377cf4569.gif'    , 15, 15, 'Саркастический смех'   , ':sarcastic_hand:'  ],
	[                         , 1, './images/smilies/sclerosis.gif'                             , 29, 23, 'Забыл'                 , ':sclerosis:'       ],
	['search.gif'             , 1, 'http://kolobok.us/smiles/light_skin/search.gif'             , 38, 25, 'Поиск'                 , ':search:'          ],
	['secret.gif'             , 1, 'http://s20.rimg.info/f3f55f5f0964f075d537b9f62c2306e5.gif'  , 16, 19, 'Секрет'                , ':secret:'          ], // http://s20.rimg.info/099902938cf4ee5ddbb2080dc4cd8f34.gif
	['shout.gif'              , 1, 'http://s20.rimg.info/a50fccd9fc4695271905546d38cf4791.gif'  , 15, 15, 'Крик'                  , ':shout:'           ],
	['slow.gif'               , 1, 'http://kolobok.us/smiles/light_skin/slow.gif'               , 38, 26, 'Тормоз'                , ':slow:'            ],
	[                         , 1, './images/smilies/stink.gif'                                 , 29, 20, 'Вонь'                  , ':stink:'           ],
	['stop.gif'               , 1, 'http://kolobok.us/smiles/mini/stop_mini.gif'                , 29, 21, 'Стоп'                  , ':stop:'            ],
	['suicide_fool-edit.gif'  , 1, 'http://kolobok.us/smiles/light_skin/suicide2.gif'           , 43, 27, 'Самоубийство'          , ':suicide_fool:'    ],
	['swoon.gif'              , 1, 'http://s20.rimg.info/e6c6e08cbe377fe6121ff22fdb2675d6.gif'  , 17, 16, 'Упал в обморок'        , ':swoon:'           ],
	['tease.gif'              , 1, 'http://s.rimg.info/b98b0561d3a7404136f11d72fec6bc16.gif'    , 31, 17, 'Дразнить'              , ':tease:'           ],
	[                         , 1, './images/smilies/telephone.gif'                             , 44, 26, 'Телефон'               , ':telephone:'       ],
	['thank_you2.gif'         , 0, './images/smilies/old_bow.gif'                               , 15, 21, 'Благодарю'             , ':thank_you:'       ],
	['this.gif'               , 1, 'http://s4.rimg.info/545d19b413685454f5e017ea2eca75d4.gif'   , 27, 15, 'Указывать'             , ':this:'            ],
	['to_become_senile.gif'   , 1, 'http://kolobok.us/smiles/light_skin/to_become_senile.gif'   , 38, 24, 'Впал в детство'        , ':to_become_senile:'],
	[                         , 1, './images/smilies/to_clue.gif'                               , 37, 24, 'Раскрывать секрет'     , ':to_clue:'         ],
	['to_take_umbrage.gif'    , 0, 'http://kolobok.us/smiles/light_skin/to_take_umbrage.gif'    , 20, 23, 'Обиженный'             , ':to_take_umbrage:' ], // Повтор resent.gif
	['tongue.gif'             , 0, 'http://s20.rimg.info/5ee18b4be72dde7b67bcbb24be9bb381.gif'  , 15, 15, 'Показывает язык'       , ':tongue:'          ], // Повтор blum3.gif
	['ok.gif'                 , 1, 'http://s7.rimg.info/adeaef8b3b6d622bb05ae6b2629d7efa.gif'   , 20, 20, 'OK'                    , ':ok:'              ],
	['victory.gif'            , 1, 'http://s7.rimg.info/8f3612f241e7cf902aac817079804e44.gif'   , 20, 20, 'Победа'                , ':victory:'         ],
	['snooks.gif'             , 1, 'http://s7.rimg.info/136188e8eff9aed2f4792d25142bc25c.gif'   , 20, 20, 'Фига'                  , ':snooks:'          ],
	['threaten.gif'           , 1, 'http://s7.rimg.info/a025b0ae345531de9e142eee99867c97.gif'   , 20, 20, 'Угроза'                , ':threaten:'        ],
	[                         , 1, './images/smilies/wild.gif'                                  , 37, 22, 'Дикий'                 , ':wild:'            ],
	['friends.gif'            , 1, 'http://kolobok.us/smiles/light_skin/friends.gif'            , 52, 28, 'Друзья'                , ':friends:'         ], // http://s17.rimg.info/be600bfe584501b5315c627c841b32bd.gif
	['punish.gif'             , 1, 'http://kolobok.us/smiles/light_skin/punish.gif'             , 48, 30, 'Наказание'             , ':punish:'          ],
	['party.gif'              , 1, 'http://kolobok.us/smiles/light_skin/party.gif'              , 90, 26, 'Вечеринка'             , ':party:'           ],
	[                         , 1, './images/smilies/russian.gif'                               , 40, 40, 'Русский'               , ':russian:'         ],
	[                         , 1, './images/smilies/take_example.gif'                          , 86, 36, 'Ставить в пример'      , ':take_example:'    ],
	[                         , 1, './images/smilies/close_tema.gif'                            , 48, 40, 'Тема закрыта'          , ':close_tema:'      ],
	['icon_super.gif'         , 0, 'http://s.rimg.info/f84d628cccfaf4a13c4c5fab5b283eea.gif'    , 26, 21, 'Супер!'                                      ], // Смайлик из старых сообщений
	['icon_dance.gif'         , 0, 'http://s20.rimg.info/84c403c1d713a40de691804e40e8721b.gif'  , 25, 16, 'Танцую'                                      ], // Смайлик из старых сообщений
	['icon_up.gif'            , 0, 'http://s.rimg.info/866017f12f2dc1bd84652bfee057f650.gif'    , 25, 18, 'Одобряю'                                     ], // Смайлик из старых сообщений
	['icon_hi.gif'            , 0, 'http://s.rimg.info/178c4bcf8a144f75914def57bbbaed58.gif'    , 25, 29, 'Привет'                                      ], // Смайлик из старых сообщений
	['icon_confused.gif'      , 0, 'http://s.rimg.info/cbad196802ad5d6ec5fb2d32da113f9d.gif'    , 20, 20, 'Задумался'                                   ], // Смайлик из старых сообщений
	[                         , 1, 'http://s20.rimg.info/b4402bf3ff6735fe11c1a7f4f4291185.gif'  , 27, 22, 'Преклонение'                                 ],
	[                         , 1, 'http://images.people.overclockers.ru/206265.gif'            , 48, 26, 'Алконафт'                                    ],
	[                         , 1, 'http://images.people.overclockers.ru/206328.gif'            , 43, 23, 'Затягивается'                                ],
	[                         , 1, 'http://s.rimg.info/9968d524c8b174abbfa38f9aff9764c8.gif'    , 24, 18, 'Поздравляю'                                  ],
	[                         , 1, 'http://s20.rimg.info/9b25f16d17330a5fa379ed60bea05638.gif'  , 35, 15, 'Утешение'                                    ],
	[                         , 1, 'http://s20.rimg.info/4c56823434f51c0175861e789ef3b116.gif'  , 43, 25, 'Перемирие'                                   ],
	[                         , 1, 'http://s20.rimg.info/ef80c75b00dc352c7552b87f87b45901.gif'  , 38, 33, 'Эпичный facepalm в исполнении капитана Пикарда :)']
];

//
// Глобальные переменные для всех обозревателей.
//

var г_фФлаги;       // Настройки сценария. Сумма констант ФЛ_. Могут изменяться пользователем после завершения ИзменитьСодержимоеСтраницы().
var г_обЗапрос;     // Разобранная строка location.search.
var г_фРусскийЯзык; // В настройках форума выбран русский язык.
var г_обТекст;      // Текст сценария на двух языках.
var г_стрМойНик;    // Закодированный ник пользователя или undefined если не выполнен вход на форум.
var г_стрЗначокНепрочитанногоСообщения;
var г_стрЗначокПоследнегоСообщения;

//
// Запускалка.
//


// Не выполнять сценарий во фреймах.
if (window.self == window.top)
{
	// Сценарий по ошибке установлен в Chrome или Opera?
	if (window.chrome || window.opera)
	{
		document.body.innerHTML = '<div style="font-size: medium; padding: 3em; text-align: center">Вы по ошибке установили сценарий «Форум Overclockers.ru», который работает только в обозревателе Firefox! Пожалуйста, удалите этот сценарий и установите версию, специально созданную для вашего обозревателя (а еще лучше переходите на Firefox :). Подробная инструкция по установке и настройке <a href="http://userscripts.org/scripts/show/95593" style="color: blue; text-decoration: underline">находится здесь</a>.</div>';
	}
	else
	{
		ИзменитьСодержимоеСтраницы();
	}
}


function ИзменитьСодержимоеСтраницы()
// Главная функция.
{
	try
	{
		var стрПредыдущаяВерсия = GM_getValue('FOR_AUVersion');
		if (!стрПредыдущаяВерсия)
		{
			// Первый вызов сценария после установки.
			GM_setValue('FOR_AUVersion', стрПредыдущаяВерсия = ВЕРСИЯ_СЦЕНАРИЯ);
		}

		г_обЗапрос = РазобратьЗапрос();

		var лПроверятьОбновление;
		switch (window.location.hostname)
		{
		case 'people.overclockers.ru':
			лПроверятьОбновление = ИзменитьСодержимоеПС();
			break;

		case 'www.overclockers.ru':
			г_фФлаги = GM_getValue('FOR_PrefFlags', 0);
			лПроверятьОбновление = ИзменитьСодержимоеСайта();
			break;

		default:
			г_фФлаги = GM_getValue('FOR_PrefFlags', 0);
			лПроверятьОбновление = ИзменитьСодержимоеФорума();
		}

		document.addEventListener('click', ИзменитьАдресСсылки, false);

		if (лПроверятьОбновление && стрПредыдущаяВерсия != ВЕРСИЯ_СЦЕНАРИЯ)
		{
			ПоказатьИсториюИзменений(стрПредыдущаяВерсия);
		}
	}
	catch (обИсключение)
	{
		ОбработатьИсключение(обИсключение);
	}
}

function ИзменитьСодержимоеПС()
// Возвращает false что бы не проверять обновление сценария.
{
	// Страница загружена неполностью?
	if (document.getElementById('footer') == null)
	{
		return false;
	}

	// Вызывается на каждой странице ПС.
	ОбщиеИзмененияПС();

	return true;
}

function ИзменитьСодержимоеСайта()
// Возвращает false что бы не проверять обновление сценария.
{
	if (window.location.search == '?media=screen')
	{
		ИзменитьВерсиюДляПросмотра();
		// Не отвлекать внимание.
		return false;
	}

	// Страница загружена неполностью?
	if (document.getElementById('footer-nav') == null)
	{
		return false;
	}

	// Вызывается на каждой странице сайта.
	ОбщиеИзмененияСайта();

	if (window.location.pathname.search(/^\/(lab|hardnews|softnews|itnews|sitenews)\/[\d_]+[\/\.]/) == 0)
	{
		ИзменитьСтатьюИлиНовость();
	}

	return true;
}

function ИзменитьСодержимоеФорума()
// Возвращает false что бы не проверять обновление сценария.
// http://jsperf.com/compare-substring
// http://jsperf.com/substr-vs-slice2/5
{
	// Модифицированные изображения из Tango Desktop Project.
	// http://tango.freedesktop.org/Tango_Desktop_Project
	// На странице может находится несколько десятков этих значков. Хранение их в отдельном
	// файле позволяет оборзевателю кешировать изображение, декодируя и храня в памяти одну
	// копию вместо нескольких десятков.
	г_стрЗначокНепрочитанногоСообщения = GM_getResourceURL('unreadpost');
	г_стрЗначокПоследнегоСообщения = GM_getResourceURL('lastpost');

	var лПеренаправление = РазборМетаданных();

	// Всплывающее окно для выбора смайлика.
	if (window.location.pathname == '/posting.php' && г_обЗапрос.mode == 'smilies')
	{
		// Страница загружена полностью? У этого окна нет #wrapfooter.
		if (document.getElementById('wrapcentre') != null)
		{
			ИзменитьСписокВсехСмайликов();
		}
		return false;
	}

	// Просмотр всех сообщений темы.
	if (window.location.pathname == '/viewtopic.php'
	&& г_обЗапрос.view == 'print' && 'printfull' in г_обЗапрос)
	{
		ПоказатьВсеСообщенияТемы();
		return true;
	}

	// Страница не загружена полностью, версия для печати или глюк форума.
	if (document.getElementById('wrapfooter') == null
	// Всплывающее окно: поиск пользователя.
	|| (window.location.pathname == '/memberlist.php' && г_обЗапрос.field == 'username_list')
	// Всплывающее окно: новое ЛС.
	|| (window.location.pathname == '/ucp.php' && г_обЗапрос.mode == 'popup')
	// Технические работы.
	|| document.getElementById('login_menu').firstElementChild.firstElementChild.firstElementChild.children[1].nodeName == 'SPAN')
	{
		return false;
	}

	ОбщиеИзмененияФорума();

	// Cтраница через несколько секунд будет автоматически перезагружена.
	if (лПеренаправление)
	{
		return false;
	}

	// Форма для подтверждения удаления сообщения, сохранения черновика и т.д.
	if (document.forms.namedItem('confirm') != null)
	{
		ИзменитьПодтверждениеДействия();
		return false;
	}

	// Форма для захода на форум. Может быть показана по любому адресу.
	// Есть флажок "Скрыть моё пребывание на конференции в этот раз"?
	if (document.getElementsByName('viewonline').length > 0)
	{
		return true;
	}

	switch (window.location.pathname)
	{
	case '/':
	case '/index.php':
		ИзменитьГлавнуюСтраницуФорума();
		break;

	case '/viewforum.php':
		ИзменитьПодфорум();
		break;

	case '/search.php':
		if ("search_id" in г_обЗапрос || г_обЗапрос.sr == 'topics')
		{
			ИзменитьСписокНайденныхТем();
		}
		else if (document.getElementById('search') != null)
		{
			ИзменитьСписокНайденныхСообщений();
		}
		break;

	case '/viewtopic.php':
		ИзменитьТему();
		break;

	case '/posting.php':
		ИзменитьРедакторСообщения();
		break;

	// Личный раздел. 
	case '/ucp.php':
		if (г_обЗапрос.mode == 'subscribed' || г_обЗапрос.mode == 'bookmarks')
		{
			ИзменитьПодпискиИЗакладки();
			ПромотатьШапку(КонецШапки(), true);
			break;
		}
		else if (г_обЗапрос.i == '166' || г_обЗапрос.mode == 'compose')
		{
			ИзменитьРедакторСообщения();
		}
		// Личные сообщения.
		else if (г_обЗапрос.i == 'pm')
		{
			if ("folder" in г_обЗапрос || г_обЗапрос.action == 'view_folder')
			{
				ИзменитьПапкуЛС();
				ПромотатьШапку(КонецШапки(), true);
				break;
			}
			else if (г_обЗапрос.mode == 'view' || ("f" in г_обЗапрос && "p" in г_обЗапрос))
			{
				ИзменитьПросмотрЛС();
			}
		}
		ПромотатьШапку(КонецШапки(), false);
		break;

	case '/memberlist.php':
		if (г_обЗапрос.mode == 'viewprofile')
		{
			// Просмотр профиля пользователя.
		}
		else
		{
			ИзменитьСписокПользователей();
		}
		break;
	}

	return true;
}

function ИзменитьАдресСсылки(обСобытие)
{
	var элСсылка = обСобытие.target;
	do
	{
		if (элСсылка.tagName == 'A')
		{
			// Все буквы в адресе уже переведены в нижний регистр.
			if (элСсылка.protocol == 'http:'
			&& (элСсылка.host == 'www.overclockers.ru' || элСсылка.host == 'overclockers.ru')
			&&  элСсылка.search == '' // Проверить на всякий случай.
			&&  элСсылка.getAttribute('class') != 'gm-for-byeprint-a')
			{
				var мстрЧасти = элСсылка.pathname.match(/^\/(lab|hardnews|softnews|itnews|sitenews)\/(\d+)(?:_\d+)?([\/\.].+)$/);
				if (мстрЧасти)
				{
					// Всегда изменять адрес у изображения слева от ссылки на статью.
					if ((г_фФлаги & ФЛ_ВЕРСИЯ_ДЛЯ_ПРОСМОТРА) == 0)
					{
						if (window.location.hostname != 'www.overclockers.ru'
						||  window.location.pathname != '/'
						||  обСобытие.target.tagName != 'IMG')
						{
							return;
						}
						var элПризнак = элСсылка.parentNode.parentNode;
						if (элПризнак == null
						||  элПризнак.tagName != 'DIV'
						||  элПризнак.getAttribute('class') != 'items')
						{
							return;
						}
					}
					элСсылка.pathname = '/' + мстрЧасти[1] + '/print/' + мстрЧасти[2] + мстрЧасти[3];
					элСсылка.search = '?media=screen';
				}
			}
			return;
		}
	}
	while (элСсылка = элСсылка.parentNode);
}

function ПоказатьВсеСообщенияТемы()
// TODO Обрезать длинные строки.
{
	ИзменитьЗначокФорума();

	GM_addStyle('\
	var { font-style: inherit !important }\
	td { line-height: 130% !important }\
	.quotecontent { font-size: 11px !important; line-height: 14px !important }\
	.codecontent { font: 12px/15px Consolas, "Courier New", monospace !important }\
	body > table { border-spacing: 0 !important; width: 100% !important }\
	td[width="10%"] { display: none !important }\
	body > table > tbody > tr:not(:last-child) { background: #E3E3E3 !important }\
	hr[width="85%"] {\
		width: 100% !important;\
		margin-bottom: 0 !important;\
		height: 3px !important;\
		border: none !important;\
		border-top: solid 1px #C0C0C0 !important;\
		background: #E3E3E3 !important;\
	}\
	hr.sep {\
		margin-top: 0 !important;\
		height: 3px !important;\
		border: none !important;\
		border-bottom: solid 1px #C0C0C0 !important;\
		background: #E3E3E3 !important;\
	}\
	#gm-for-trash { margin: 6px 0 2px !important }\
	');

	// TBODY первой таблицы.
	var а = document.body.firstElementChild.firstElementChild;
	// Надпись "Конференция Overclockers.ru" с ссылкой.
	а.removeChild(а.firstElementChild);
	// Пустая строка.
	а.removeChild(а.firstElementChild);
	// Название темы с ссылкой.
	а.firstElementChild.firstElementChild.style.textAlign = 'center';
	// Последняя таблица с бесполезной информацией.
	document.body.removeChild(document.body.lastElementChild);
	// Нижний HR.
	document.body.removeChild(document.body.lastElementChild);

	//
	// Добавить на страницу кнопку для скрытия мусора.
	//
	а = а.lastElementChild.firstElementChild;
	а.appendChild(document.createElement('br'));
	var б = document.createElement('button');
	б.setAttribute('id', 'gm-for-trash');
	б.setAttribute('type', 'button');
	б.setAttribute('title', г_обТекст[25]);
	б.textContent = г_обТекст[23];
	б.addEventListener('click', ОбработатьСкрытиеМусора, false);
	а.appendChild(б);
	// Стиль для скрытия мешающего поиску текста.
	var элСкрытиеМусора = null;

	//
	// В версии для печати ссылки на изображения недоступны. Исправляем этот глюк.
	//
	var элЯкорь = document.createElement('a');
	элЯкорь.setAttribute('class', 'postlink');
	элЯкорь.setAttribute('target', '_blank');
	элЯкорь.setAttribute('rel', 'nofollow');
	элЯкорь.textContent = г_обТекст[22];
	var мэлVar = document.getElementsByTagName('var');
	for (var индVar = 0, элVar; элVar = мэлVar[индVar]; ++индVar)
	{
		// Это полноценное изображение без ссылки?
		if (элVar.parentNode.nodeName != 'A')
		{
			элЯкорь.setAttribute('href', элVar.getAttribute('title'));
			ЗаменитьУзел(элЯкорь.cloneNode(true), элVar);
			--индVar;
		}
		else
		{
			// Меняем послание для роботов #77 на понятный кускам мяса текст.
			// http://jsperf.com/textcontent-vs-createtextnode/3
			элVar.firstChild.nodeValue = г_обТекст[22];
			// Это полноценное изображение с ссылкой на главную страницу хостинга?
			// Иначе это миниатюра со ссылкой на полноразмерное изображение.
			if (элVar.parentNode.pathname == '/')
			{
				элVar.parentNode.setAttribute('href', элVar.getAttribute('title'));
			}
		}
	}

	function ОбработатьСкрытиеМусора(обСобытие)
	{
		if (элСкрытиеМусора == null)
		{
			элСкрытиеМусора = ДобавитьСтиль('\
				/* Название темы */\
				.topic,\
				/* Автор и время сообщения */\
				body > table > tbody > tr:not(:last-child),\
				/* ... писал(а), Код:, Вложение: */\
				.quotetitle, .codetitle, .attachtitle,\
				/* Вложения, кроме IMG */\
				.gensmall, .genmed,\
				/* Добавлено спустя ... */\
				span[style="font-size: 85%; line-height: normal"],\
				span[style="font-size: 75%; line-height: normal"]\
				{ display: none !important }\
			');
			обСобытие.target.textContent = г_обТекст[24];
		}
		else
		{
			элСкрытиеМусора.parentNode.removeChild(элСкрытиеМусора);
			элСкрытиеМусора = null;
			обСобытие.target.textContent = г_обТекст[23];
		}
	}
}

function РазборМетаданных()
// Заполняет г_фРусскийЯзык и г_обТекст.
// Возвращает true если страница через несколько секунд будет автоматически перезагружена.
{
	var лПеренаправление = false;
	var сэлМетаданные = document.getElementsByTagName('meta');
	for (var ы = 0, элМетаданные; элМетаданные = сэлМетаданные[ы]; ++ы)
	{
		var стрКлюч = элМетаданные.getAttribute('http-equiv');
		if (стрКлюч && стрКлюч.toLowerCase() == 'content-language')
		{
			if (элМетаданные.getAttribute('content') == 'en-gb')
			{
				г_фРусскийЯзык = false;
				г_обТекст =
				{
					 0: 'Select text before cite them.',
					 1: 'Size: ',
					 2: 'Show image',
					 3: 'Next',
					 4: 'Previous',
					 5: 'New Topics and Posts',
					 6: 'Thematic Forums',
					 7: 'Common Forums',
					 8: 'Other Forums',
					 9: 'Script preferences',
					10: 'Tools',
					11: '[posts]',
					12: 'Найти в этой теме все сообщения пользователя ',
					13: 'Search my posts',
					14: 'Найти в этой теме все мои сообщения',
					15: '[quote]',
					16: '[and go]',
					17: 'Процитировать выделенный текст и перейти к форме быстрого ответа',
					18: '[reply]',
					19: 'Show all posts',
					20: 'Загрузить все сообщения темы для поиска или сохранения на диске',
					21: '0 new messages',
					22: '[Image]',
					23: 'Hide trash',
					24: 'Show trash',
					25: 'Будет скрыт или показан мешающий поиску текст:\r\n• Заголовки сообщений (автор и время)\r\n• Заголовки цитат (... писал(а))\r\n• Вложения\r\n• Строки "Добавлено спустя"'
				};
			}
			else
			{
				г_фРусскийЯзык = true;
				г_обТекст =
				{
					 0: 'Для вставки цитаты сначала выделите цитируемый текст.',
					 1: 'Размер: ',
					 2: 'Просмотр изображения',
					 3: 'Следующая',
					 4: 'Предыдущая',
					 5: 'Новые темы и сообщения',
					 6: 'Тематические форумы',
					 7: 'Общекомпьютерные форумы',
					 8: 'Прочие форумы',
					 9: 'Настройки сценария',
					10: 'Тема',
					11: '[сообщения]',
					12: 'Найти в этой теме все сообщения пользователя ',
					13: 'Найти мои сообщения',
					14: 'Найти в этой теме все мои сообщения',
					15: '[цитировать]',
					16: '[и перейти]',
					17: 'Процитировать выделенный текст и перейти к форме быстрого ответа',
					18: '[ответить]',
					19: 'Просмотреть все сообщения',
					20: 'Загрузить все сообщения этой темы для поиска или сохранения на диске',
					21: 'Новых ЛС: 0',
					22: '[Изображение]',
					23: 'Скрыть мешающий поиску текст',
					24: 'Показать мешающий поиску текст',
					25: 'Будет скрыт или показан мешающий поиску текст:\r\n• Заголовки сообщений (автор и время)\r\n• Заголовки цитат (... писал(а))\r\n• Вложения\r\n• Строки "Добавлено спустя"'
				};
			}
		}
		else if (стрКлюч == 'refresh')
		{
			лПеренаправление = true; ;
		}
	}
	return лПеренаправление;
}

function ИзменитьЗначокФорума()
{
	// Новый значок форума 16x16x32.
	УстановитьЗначокСтраницы('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACd0lEQVR42pWTX0iTURjG36P7NnFubOlwzX1GjlGukoEXI3QwEBS6keyiSwkCSQjBP40KiQYxKBtDimYRJNhsNupiJhkbRWOwJhtEG6kznN/XZGMbTpj79pd1FDGsFfOBl3Nxnud3zvtyDoL/aGZmBpaXl6FQKIBMJoOOjg5QKBSHPKhc0Ov1gt/vP7GVTF78ubl5Lp3NIpFYHJaQ5DzZ1PTlgkbzb4DZbIZIJDIWjcV0sUSiporNBqKubrOWxwvzBIKtZqn04xmF4qFKLs//BXA4HCyPxzO5QdPXMvk8HGto8PeQ5EtNMJhiu1xcSKer0mp1ItfX5xDw+T+QSvUbYLfbwefz3VoPhe7thkmJ5PVNhBZqlpYGcT9K2Ngg9q07uBagpeUGHkroAGCxWNROp/PzDsNAY2PjB71YvIiHcQdWV/mwvg64rz+7pYDP1+wBbDYbuN3uxUg02l3D5SZvt7ePHafpR+DxcHAVIJOJAQbjlY/t3AMEizWxB9Dr9W0UTX/N5nLQqVTevyISXYK5ORm4XCZobX0O2awPqqtLQBAtGNgPqZQWx9i4jMhqte6ebkxubw9VcziUqbd3Cmzv7sLbN1ehmZxGLtehe5cGBgCs1m5IJNqgvn4emUwmCAQC4RTDSE7JZE+0QqEajMZnIBJNIqez7AMrjY8DrK0Bmp0FZDAYTn/HKuCN4a6ukbPT0yoIBi8jbKhESKfTDVAUZWLX1sYfE8RT/H5foWj0W0XpXYBWq30Rj8f7BULhpwmfbwHC4QdoZaXSPKDR0dH3DMP0yKXSqSE2x4pGhu0Vp/cBvGKxKDwplkSuq87nkKbzKPnyv/Eo+gUMHQKCdTZkpAAAAABJRU5ErkJggg==');
}

function ОбщиеИзмененияФорума()
{
	ИзменитьЗначокФорума();

	// Стили общие для всего форума.
	GM_addStyle('\
	/* Исправить расположение списка модераторов */\
	h2 + .moderators {\
		margin-top: 0.8em !important;\
		margin-bottom: -0.8em !important;\
	}\
	br + .moderators {\
		margin-top: -0.3em !important;\
		margin-bottom: 0.3em !important;\
	}\
	/* Увеличить размер ников авторов сообщений */\
	.postauthor { font-size: small !important }\
	/* Сделать более разборчивым текст "В сети" */\
	.online {\
		font-weight: bold !important;\
		color: green !important;\
	}\
	/* Уменьшить промежуток перед сообщением */\
	.postbody { margin-top: -0.4em !important }\
	/* Скрыть лишние пустые строки после сообщения */\
	.postbody ~ br { display: none !important }\
	.postbody ~ .gensmall {\
		display: block !important;\
		margin-top: 1em !important;\
	}\
	.postbody + br + br + .tablebg { margin-top: 1em !important }\
	/* Уменьшить высоту заголовка [quote], [code] и вложения */\
	.quotetitle, .codetitle, .attachtitle {\
		padding-top: 0 !important;\
		padding-bottom: 2px !important;\
		background-color: #B3C2CC !important;\
	}\
	/* Убрать пустое место до и после [quote], [code], [spoiler=] и вложения */\
	.quotetitle, .codetitle, .attachtitle, .sp-wrap { margin-top: 5px !important }\
	.quotecontent, .codecontent, .attachcontent, .sp-wrap { margin-bottom: 5px !important }\
	/* Увеличить кнопки листания страниц */\
	.pagination > a, .pagination > strong, .gotoprevpage, .gotonextpage {\
		display: inline-block !important;\
		border: 1px solid #BFBFBF !important;\
		border-radius: 3px !important;\
		padding: 1px 3px !important;\
		font-size: 12px !important;\
	}\
	.pagination > a, .pagination > strong {\
		margin: 0 -0.15em 0 -0.15em !important;\
		min-width: 1.8em !important;\
		text-align: center !important;\
	}\
	.pagination > a:hover, .gotoprevpage:hover, .gotonextpage:hover {\
		text-decoration: none !important;\
		box-shadow: 0 0 2px gray !important;\
	}\
	.pagination {\
		padding: 0 !important;\
		white-space: nowrap !important;\
	}\
	/* Нижняя строка с ссылками для поиска тем и сообщений */\
	#searchbarbottom {\
		margin-top: .2em !important;\
		margin-bottom: .8em !important;\
	}\
	/* Количество новых и непрочитанных личных сообщений в шапке форума */\
	.unreadpmcount { color: red !important }\
	/* В шапке форума убрать выделение ссылки на wiki */\
	.cross > span { color: #004488 !important; font-weight: normal !important }\
	/* Расстояние между смайликами в форме редактирования */\
	#qr_smilies, #qr_smilies_hide { padding: 0 2px !important }\
	.insertsmile-img { padding: 2px !important }\
	/* Убрать лишние переводы строки перед формой быстрого ответа */\
	.qr_nofloat { margin-top: -3ex !important }\
	/* Убрать оранжевый цвет у элементов списка в ЛР и ЛС */\
	option.sep {\
		color: inherit !important;\
		background-color: inherit !important;\
	}\
	/* Для г_стрЗначокНепрочитанногоСообщения и г_стрЗначокПоследнегоСообщения */\
	.gm-for-uplp {\
		float: left !important;\
		margin: .3em 5px 0 0 !important;\
	}\
	/* Анимация нажатия г_стрЗначокНепрочитанногоСообщения и г_стрЗначокПоследнегоСообщения */\
	.gm-for-anipress:active {\
		position: relative !important;\
		top:  1px !important;\
		left: 1px !important;\
	}\
	/* Форма быстрого поиска */\
	.gm-for-s-help:hover { text-decoration: none !important }\
	#gm-for-s-vargroup {\
		display: inline-block !important;\
		line-height: 17px !important;\
		margin: 3px 4px 0 0 !important;\
		border: 1px solid #D3A467 !important;\
		padding-right: 4px !important;\
		background: #FFC477 !important;\
	}\
	input[name=gm-for-s-variant] {\
		/* Если отключено масштабирование изображений */\
		height: 1.15em !important;\
		vertical-align: text-top !important;\
		margin: 0 1px 0 4px !important;\
	}\
	');

	// Ячейка в шапке со ссылками Вход, Регистрация, FAQ.
	var элСтрока1 = document.getElementById('search-box').previousElementSibling;
	
	//
	// Перенести ссылку на правила форума в правый верхний угол к ФАК-ам.
	//
	var а = document.getElementById('mmenu').getElementsByClassName('mainmenu')[0];
	// Убрать неуместный красный цвет.
	элСтрока1.firstChild.removeAttribute('style');
	ВставитьУзел(элСтрока1.firstChild, а);
	ВставитьУзел(элСтрока1.firstChild, а);

	// Выполнен вход на форум?
	if (document.getElementById('login_form') == null)
	{
		г_стрМойНик = encodeURIComponent(document.getElementById('login_menu').firstElementChild.firstElementChild
			.firstElementChild.firstElementChild.textContent.match(/\[(.+)\]\s*$/)[1].trim());

		//
		// Выделить в шапке форума количество новых и непрочитанных личных сообщений.
		//
		а = элСтрока1.parentNode.nextElementSibling.firstElementChild.lastElementChild;
		if (а.textContent.trim() != г_обТекст[21])
		{
			if (а.children.length == 1)
			{
				а.className = 'unreadpmcount';
			}
			else
			{
				а.lastElementChild.className = 'unreadpmcount';
				// Запретить мигание текста.
				а.lastElementChild.removeAttribute('style');
			}
		}
	}

	if ((г_фФлаги & ФЛ_НЕ_ИСКАТЬ_СТАРЫЕ_СООБЩЕНИЯ) == 0 && г_стрМойНик !== undefined)
	{
		// Изменить ссылку "Ваши сообщения", которая перестанет искать темы,
		// в которые пользователь не писал долгое время.
		document.getElementsByClassName('searchbar')[0].lastElementChild.lastElementChild.setAttribute(
			'href', './search.php?sk=t&sd=d&sr=topics&t=0&st=180&author=' + г_стрМойНик);
	}

	ИзменитьФормуБыстрогоПоиска();

	//
	// Заменить лишнюю ссылку на ФАК на вызов настроек сценария.
	//
	а = элСтрока1.lastElementChild;
	а.setAttribute('href', 'javascript:');
	а.firstChild.nodeValue = г_обТекст[9];
	а.addEventListener('click', ПоказатьДиалогСНастройками, false);
}

function ИзменитьФормуБыстрогоПоиска()
{
	var элТекст = document.getElementById('keywords');
	// На странице расширенного поиска нет формы быстрого поиска.
	if (элТекст == null)
	{
		return;
	}
	var элФорма = элТекст.form;

	// Удалить подсказку "Поиск...", которая мешает вставке текста.
	// Не добавлять placeholder, потому что кнопка справа имеет идентичную надпись.
	элТекст.removeAttribute('onclick');
	элТекст.removeAttribute('onblur');
	if (элТекст.value == 'Поиск…')
	{
		элТекст.value = '';
	}
	элТекст.style.width = '24em';

	var стрКнопки = '\
<span id="gm-for-s-vargroup">\
<label title="Искать по всему форуму">\
<input type="radio" name="gm-for-s-variant" id="gm-for-s-forum" checked>\
<span>Форум</span></label>\
<label title="Искать по всему форуму с помощью Яндекса">\
<input type="radio" name="gm-for-s-variant" id="gm-for-s-yandex">\
<span>Яндекс</span></label>\
<label title="Искать по всему форуму с помощью Google">\
<input type="radio" name="gm-for-s-variant" id="gm-for-s-google">\
<span>Google</span></label>';
	var элФлажок1, элФлажок2, стрИдентфикатор;
	var элВставка = элТекст.nextElementSibling.nextElementSibling.nextElementSibling;
	if (элВставка.getAttribute('type') == 'checkbox')
	{
		элФлажок1 = элВставка;
		стрИдентфикатор = элФлажок1.getAttribute('value');
		элФлажок1.setAttribute('type', 'hidden');
		элФорма.removeChild(элФлажок1.nextSibling);
		if (элФлажок1.getAttribute('name') == 't')
		{
			// Поиск в теме.
			элФлажок2 = элФлажок1.nextElementSibling;
			элФорма.removeChild(элФлажок2.nextSibling);
			стрКнопки += '\
<label title="Искать только в этой теме">\
<input type="radio" name="gm-for-s-variant" id="gm-for-s-topic">\
<span>Тема</span></label>';
		}
		else
		{
			// Поиск в подфоруме.
			стрКнопки += '\
<label title="Искать только в этом подфоруме">\
<input type="radio" name="gm-for-s-variant" id="gm-for-s-subforum">\
<span>Подфорум</span></label>';
		}
	}
	элВставка.insertAdjacentHTML('beforebegin', стрКнопки + '</span>');

	элВставка = document.createElement('a');
	элВставка.setAttribute('href', 'javascript:');
	элВставка.setAttribute('class', 'gm-for-s-help');
	элВставка.setAttribute('title', 'Справка по составлению поискового запроса. Для ее просмотра выберите вариант поиска слева и щелкните этот знак вопроса.');
	элВставка.addEventListener('click', ПоказатьСправку, false);
	элВставка.appendChild(document.createTextNode('?'));
	элФорма.appendChild(элВставка);

	элФорма.getElementsByTagName('a')[0].firstChild.nodeValue = 'Расширенный';
	элФорма.addEventListener('submit', ОбработатьОтправкуФормы, false);

	function ПолучитьВариантПоиска()
	{
		return элФорма.querySelector('input[name="gm-for-s-variant"]:checked').getAttribute('id');
	}

	function ПоказатьСправку()
	{
		switch (ПолучитьВариантПоиска())
		{
		case 'gm-for-s-forum':
		case 'gm-for-s-subforum':
		case 'gm-for-s-topic':
			window.alert('ОГРАНИЧЕНИЯ ПОИСКА\n\nДвижок форума не умеет искать произвольную часть текста, он умеет искать только слова. Слова могут состоять только из букв и цифр, остальные символы считаются разделителями слов и не принимают участия в поиске. Минимальная длина слова - два символа. Таким образом попытка найти версию программы 1.5.0 обречена на провал - в этом запросе нет ни одного слова, а значит и искать нечего. Еще одна неприятность: в крупных темах поиск периодически глючит, находя только часть сообщений.\n\nМои рекомендации. Если вас не устраивают результаты поиска в конкретной теме, то зайдите в эту тему, в менюшке "Тема" выберите пункт "Просмотреть все сообщения", нажмите кнопку "Скрыть мешающий поиску текст" и начинайте искать средствами вашего оборзевателя. Если же нужно искать по всему форуму определенную фразу или текст со спецсимволами, то пользуйтесь Яндексом или Гуглом - они позволяют составлять более гибкие поисковые запросы, хотя результаты поиска представлены в менее удобном виде.');
			window.alert('ПОИСКОВЫЙ ЗАПРОС\n\nДвижок форума ищет сообщения, которые содержат в произвольном порядке ВСЕ введенные слова. Для поиска сообщений, которые содержат ЛЮБОЕ КОЛИЧЕСТВО введенных слов, разделяйте слова символом |, например cool|quiet|cmd. Обратите внимание на отсутствие пробелов между | и словами. Регистр букв на поиск не влияет.\n\nДвижок форума умеет искать слова с разными окончаниями, а так же части слова. Например, поиск слова "хитрый" найдет "хитрый", "хитры", "хитрая", но не найдет "хитрожопый". "точить" найдет "точ", "точнее", "точен", но не найдет "заточить". "ликвидный" найдет "ликвидный", "ликвидности", но не найдет "ликвидировать". Часть слова "ко" найдет "скопировать", "около", "кое", "консольная", но по непонятной причине не найдет "оконная".\n\nЕсли найдено слишком много сообщений (их максимальное число 250), то поробуйте уточнить запрос, добавив в него одно или несколько слов. Для этого используйте "Поиск в найденном", который находится над результатами поиска.\n\nИ последнее. В расширенном поиске советуют использовать в запросе специальные символы - и *. На самом деле они на поиск никак не влияют. Улыбаемся и машем.');
			break;
		case 'gm-for-s-yandex':
			window.open('http://help.yandex.ru/search/?id=481939');
			break;
		case 'gm-for-s-google':
			window.open('https://support.google.com/websearch/bin/answer.py?hl=ru&answer=136861');
			break;
		}
	}

	function ОбработатьОтправкуФормы(обСобытие)
	// Современные оборзеватели используют back-forward cache, поэтому эта
	// функция может вызываться несколько раз с разными selectedIndex.
	{
		// Не введен текст для поиска?
		if (элТекст.value.trim() == '')
		{
			обСобытие.preventDefault();
			обСобытие.stopPropagation();
			return;
		}

		switch (ПолучитьВариантПоиска())
		{
		case 'gm-for-s-forum':
			НастроитьФорму('post', './search.php', 'keywords', '', '', '', '');
			break;
		case 'gm-for-s-yandex':
			НастроитьФорму('get', 'http://yandex.ru/yandsearch', 'text', 'site', 'forums.overclockers.ru', 'numdoc', '20');
			break;
		case 'gm-for-s-google':
			НастроитьФорму('get', 'https://www.google.ru/search', 'query', 'as_sitesearch', 'forums.overclockers.ru', 'num', '20');
			break;
		case 'gm-for-s-topic':
			НастроитьФорму('post', './search.php', 'keywords', 't', стрИдентфикатор, 'sf', 'msgonly');
			break;
		case 'gm-for-s-subforum':
			НастроитьФорму('post', './search.php', 'keywords', 'fid[]', стрИдентфикатор, '', '');
			break;
		}
	}

	function НастроитьФорму(стрЗапрос, стрАдрес, стрИмяТекста, стрИмя1, стрЗначение1, стрИмя2, стрЗначение2)
	{
		элФорма.setAttribute('method', стрЗапрос);
		элФорма.setAttribute('action', стрАдрес);

		элТекст.setAttribute('name', стрИмяТекста);

		if (!элФлажок1)
		{
			элФлажок1 = document.createElement('input');
			элФлажок1.setAttribute('type', 'hidden');
			элФорма.appendChild(элФлажок1);
		}
		элФлажок1.setAttribute('name', стрИмя1);
		элФлажок1.setAttribute('value', стрЗначение1);

		if (!элФлажок2)
		{
			элФлажок2 = document.createElement('input');
			элФлажок2.setAttribute('type', 'hidden');
			элФорма.appendChild(элФлажок2);
		}
		элФлажок2.setAttribute('name', стрИмя2);
		элФлажок2.setAttribute('value', стрЗначение2);
	}
}

function ИзменитьПодтверждениеДействия()
{
	// Увеличить размер кнопок.
	GM_addStyle('\
	.btnlite, .btnmain {\
		font-size: 140% !important;\
		margin-bottom: 1ex !important;\
		padding: .5ex .5em !important;\
		border-radius: 4px !important;\
		background:    -moz-linear-gradient(#f4f4f4 40%, #e2e2e2) !important;\
		background:         linear-gradient(#f4f4f4 40%, #e2e2e2) !important;\
	}\
	.btnlite:hover, .btnmain:hover {\
		background:    -moz-linear-gradient(#fcfcfc 40%, #e8e8e8) !important;\
		background:         linear-gradient(#fcfcfc 40%, #e8e8e8) !important;\
	}\
	.btnlite:active, .btnmain:active {\
		background:    -moz-linear-gradient(#e2e2e2, #f4f4f4 40%) !important;\
		background:         linear-gradient(#e2e2e2, #f4f4f4 40%) !important;\
	}\
	.btnmain {padding: .5ex 2em !important}\
	');
}

function ИзменитьГлавнуюСтраницуФорума()
{
	//
	// Названия тем в таблице "Новые темы и сообщения" на главной странице форума
	// не обрезаются на широкоугольных мониторах.
	//

	var элСтараяТаблица = document.getElementById('recentTbl');

	/*
	Создать новую таблицу используя div вместо table. Ширина ячеек пропорциональна ширине
	окна браузера. Не влезающий в ячейки текст автоматически обрезается и добавляется многоточие.
	Используется innerHTML, который во всех браузерах работает быстрее чем document.createElement().
	Заголовок состоит из трех частей что бы в Хромом и Опере его ширина не отличалась от ширины
	остальных строк (из-за округления при переводе процентов в пикселы). Для Лисы и Осла это не
	требуется. Опера 11.01 отбрасывает дробную часть свойства width, если оно задано в процентах.
	Размер и стиль новой таблицы почти полностью идентичен старой что бы уменьшить мерцание во время
	модификации страницы сценарием.
	*/
	var элНоваяТаблица = document.createElement('div');
	элНоваяТаблица.setAttribute('id', 'ntap-root');
	элНоваяТаблица.innerHTML = '\
		<div class="ntap-col1"><div class="ntap-row1">&nbsp;</div></div>\
		<div class="ntap-col2"><div class="ntap-row1">' + г_обТекст[5] + '</div></div>\
		<div class="ntap-col3"><div class="ntap-row1">&nbsp;</div></div>\
		<div class="ntap-col1"><div class="ntap-row2">' + г_обТекст[6] + '</div></div>\
		<div class="ntap-col2"><div class="ntap-row2">' + г_обТекст[7] + '</div></div>\
		<div class="ntap-col3"><div class="ntap-row2">' + г_обТекст[8] + '</div></div>\
		<div class="ntap-col1"><div class="ntap-row3"></div></div>\
		<div class="ntap-col2"><div class="ntap-row3"></div></div>\
		<div class="ntap-col3"><div class="ntap-row3"></div></div>\
	';

	//
	// Создание шаблона нового элемента таблицы. Клонирование шаблона занимает меньше
	// времени, чем создание элементов с нуля.
	//
	var элШаблон = document.createDocumentFragment();
	var элСсылкаНаПоследСообщ = элШаблон.appendChild(document.createElement('a'));
	var элИзображениеПоследСообщ = элСсылкаНаПоследСообщ.appendChild(document.createElement('img'));
	элИзображениеПоследСообщ.setAttribute('width', '18');
	элИзображениеПоследСообщ.setAttribute('height', '9');
	var элСсылкаНаПервоеСообщ = элШаблон.appendChild(document.createElement('a'));
	элСсылкаНаПервоеСообщ.setAttribute('class', 'ntap-topic');
	var элНазваниеТемы = элСсылкаНаПервоеСообщ.appendChild(document.createTextNode(''));
	var элХрень = элШаблон.appendChild(document.createElement('span'));
	элХрень.setAttribute('class', 'ntap-replies');
	var элКоличествоОтветов = элХрень.appendChild(document.createTextNode(''));
	элШаблон.appendChild(document.createElement('br'));

	// Перекидывание ссылок из ячеек старой таблицы в новую таблицу.
	for (var чЯчейка = 0; чЯчейка < 3; ++чЯчейка)
	{
		// table/tbody/tr[3]/td[чЯчейка]/span/a
		var элВыдернуть = элСтараяТаблица.firstElementChild.lastElementChild.children[чЯчейка].firstElementChild.firstElementChild;
		var элВставитьВ = элНоваяТаблица.children[6 + чЯчейка].firstElementChild;
		// Количество проходов цикла равно количеству ссылок в одной ячейке.
		for (var чТема = 0; чТема < 24; ++чТема)
		{
			элСсылкаНаПоследСообщ.setAttribute('href', элВыдернуть.getAttribute('href'));
			элХрень = элВыдернуть.firstElementChild;
			элИзображениеПоследСообщ.setAttribute('src', элХрень.getAttribute('src'));
			элИзображениеПоследСообщ.setAttribute('title', элХрень.getAttribute('title'));
			элВыдернуть = элВыдернуть.nextElementSibling;
			// Какая-то хрень для модераторов, точно не помню.
			if (элВыдернуть.nodeName != 'A')
			{
				элВыдернуть = элВыдернуть.nextElementSibling;
			}
			элСсылкаНаПервоеСообщ.setAttribute('href', элВыдернуть.getAttribute('href'));
			элНазваниеТемы.nodeValue = элВыдернуть.getAttribute('title');
			элКоличествоОтветов.nodeValue = элВыдернуть.nextSibling.nodeValue.slice(2, -15);
			// В названиях тем квадратные скобки используются реже круглых.
			элСсылкаНаПервоеСообщ.setAttribute('title', элНазваниеТемы.nodeValue + ' [' + элКоличествоОтветов.nodeValue + ']');
			элВставитьВ.appendChild(элШаблон.cloneNode(true));
			элВыдернуть = элВыдернуть.nextElementSibling.nextElementSibling;
		}
	}

	GM_addStyle('\
	#ntap-root {\
		min-width: 640px;\
		max-width: 100500px;\
	}\
	#ntap-root:after {\
		content: " ";\
		clear: both;\
		display: block;\
	}\
	.ntap-col1 {width: 33.4%; float: left}\
	.ntap-col2 {width: 33.1%; float: left}\
	.ntap-col3 {width: 33.5%; float: left}\
	.ntap-row1, .ntap-row2, .ntap-row3 {\
		overflow: hidden;\
		text-overflow: ellipsis;\
		white-space: nowrap;\
		border: 1px solid #cccccc;\
	}\
	.ntap-row1 {\
		padding: 7px 5px;\
		font-weight: bold;\
		font-size: 1.1em;\
		background-color: #8b9ec2;\
		color: #ffffff;\
		text-align: center;\
	}\
	.ntap-row2 {\
		padding: 4px;\
		font-weight: bold;\
		background-color: #efefef;\
	}\
	.ntap-row3, .ntap-fade {\
		padding-top: 4px;\
		padding-bottom: 4px;\
		font-size: 9pt;\
	}\
	.ntap-row3 {\
		padding-left: 4px;\
		padding-right: 4px;\
		background-color: #efefef;\
	}\
	.ntap-topic   {padding: 0 .5em}\
	.ntap-replies {color: #202020}\
	.ntap-col1 > .ntap-row1 {border-bottom: none; border-right: none}\
	.ntap-col2 > .ntap-row1 {border-bottom: none; border-right: none; border-left: none}\
	.ntap-col3 > .ntap-row1 {border-bottom: none; border-left: none}\
	.ntap-col2 > .ntap-row2 {border-left: none}\
	.ntap-col3 > .ntap-row2 {border-left: none}\
	.ntap-col1 > .ntap-row3 {border-top:  none}\
	.ntap-col2 > .ntap-row3 {border-left: none; border-top: none}\
	.ntap-col3 > .ntap-row3 {border-left: none; border-top: none}\
	');

	// Заменить старую таблицу на только что созданную.
	ЗаменитьУзел(элНоваяТаблица, элСтараяТаблица);

	// Не изменять значки в списке "Новые темы и сообщения".
	ЗаменитьЗначокПоследнегоСообщения(элНоваяТаблица.nextElementSibling.nextElementSibling);

	ПромотатьШапку('menubar', true);
}

function ИзменитьПодфорум()
{
	// Скрыть бесполезную скрепку.
	GM_addStyle('img[src="./styles/ocss2/imageset/icon_topic_attach.gif"] { display: none !important }');
	var элМама = document.getElementById('wrapcentre');
	ЗаменитьЗначокПоследнегоСообщения(элМама);
	ЗаменитьЗначокНепрочитанногоСообщения(элМама);
	ИзменитьКнопкиЛистанияСтраниц(1);
	ПромотатьШапку(КонецШапки(), true);
}

function ИзменитьСписокНайденныхТем()
{
	// Подфорумы барахолки.
	var обСкрытьПодфорумы =
	{
		49: 49, // Покупка
		83: 83, // Покупка->Москва
		84: 84, // Покупка->Санкт-Петербург
		91: 91, // Покупка->Другие города
		50: 50, // Продажа
		85: 85, // Продажа->Москва
		86: 86, // Продажа->Санкт-Петербург
		92: 92  // Продажа->Другие города
	};

	GM_addStyle('\
	/* Уменьшить ширину колонок */\
	th { font-size: 100% !important }\
	/* Скрыть пустую вторую колоноку */\
	#gm-for-foundtopics { border-collapse: collapse !important }\
	#gm-for-foundtopics > tbody > tr > td, #gm-for-foundtopics > tbody > tr > th { border: solid 1px #ccc !important }\
	#gm-for-foundtopics > tbody > tr > td:nth-child(2) { border: none !important; width: 0 !important; padding: 0 !important }\
	#gm-for-foundtopics > tbody > tr > td:nth-child(3) { border-left: none !important }\
	/* Скрыть бесполезную скрепку */\
	img[src="./styles/ocss2/imageset/icon_topic_attach.gif"] { display: none !important }\
	/* Выделять строку под курсором мыши */\
	#gm-for-foundtopics > tbody > tr:hover > .row1 { background: #F5F5F5 }\
	#gm-for-foundtopics > tbody > tr:hover > .row2 { background: #EAEFF2 }\
	/* Скрыть ссылку на первую страницу темы, эта ссылка уже есть в названии темы. */\
	.topictitle + .gensmall > a:nth-child(2),\
	.topictitle + .gensmall > .page-dots,\
	.topictitle + .gensmall > .page-sep:nth-child(3) {\
		display: none !important;\
	}\
	.topictitle + .gensmall:not(:last-child) {\
		/* Разместить ссылки на страницы справа от названия темы, как в подфорумах.\
		Уменьшается высота строк, значит больше строк влезет в окно оборзевателя. */\
		display: inline !important;\
		margin-left: 10px !important;\
		white-space: nowrap !important;\
		/* Скрыть текст [ На страницу ] */\
		font-size: 0 !important;\
	}\
	.topictitle + .gensmall:not(:last-child) > a,\
	.topictitle + .gensmall:not(:last-child) > span {\
		font-size: 10px !important;\
	}\
	/* Сделать стиль последнего сообщения как на всем форуме */\
	td[width="120"] { text-align: left !important }\
	td[width="120"] > p:first-child {\
		white-space: nowrap !important;\
	' + ((г_фФлаги & ФЛ_КРУПНЫЕ_ЗНАЧКИ) == 0
	? 'margin-left: 36px !important;' : 'margin-left: 23px !important;') + '\
	}\
	td[width="120"] > p:last-child > a:first-child {\
		display: block !important;\
		white-space: nowrap !important;\
	' + ((г_фФлаги & ФЛ_КРУПНЫЕ_ЗНАЧКИ) == 0
	? 'margin-left: 36px !important;' : 'margin-left: 23px !important;') + '\
		/* Обрезать слишком длинные ники */\
		max-width: 12em !important;\
		overflow: hidden !important;\
		text-overflow: ellipsis !important;\
	}\
	td[width="120"] > p:last-child > a:last-child {\
		float: left !important;\
	' + ((г_фФлаги & ФЛ_КРУПНЫЕ_ЗНАЧКИ) == 0
	? 'margin-top: -2.3em !important;' : 'margin-top: -2.4em !important; padding: 5% 0 !important;') + '\
	}\
	');

	var элТаблица = document.getElementById('wrapcentre').children[4];
	// Ничего не найдено?
	if (элТаблица.nodeName != 'FORM')
	{
		return;
	}
	// Тег TBODY.
	элТаблица = элТаблица.children[2].firstElementChild;

	// Для ускорения CSS.
	элТаблица.parentNode.setAttribute('id', 'gm-for-foundtopics');

	// Уменьшить неправильно заданную ширину первой колонки заголовка (будет как в подфорумах).
	элТаблица.firstElementChild.firstElementChild.removeAttribute('width');

	if ((г_фФлаги & ФЛ_НЕ_ИСКАТЬ_В_БАРАХОЛКЕ) == 0 || (г_фФлаги & ФЛ_КРУПНЫЕ_ЗНАЧКИ) == 0)
	{
		// Перебор строк (найденных тем) таблицы.
		for (var чСтрока = элТаблица.children.length - 2; чСтрока >= 1; --чСтрока)
		{
			// Тег TR.
			var элСтрока = элТаблица.children[чСтрока];
			// Тег A с названием темы.
			var элТема = элСтрока.getElementsByClassName('topictitle')[0];

			//
			// Скрыть тему из подфорумов, которые перечислены в обСкрытьПодфорумы.
			//
			if ((г_фФлаги & ФЛ_НЕ_ИСКАТЬ_В_БАРАХОЛКЕ) == 0
			&& элТема.getAttribute('href').match(/f=(\d+)/)[1] in обСкрытьПодфорумы)
			{
				элСтрока.style.display = 'none';
				continue;
			}


			if ((г_фФлаги & ФЛ_КРУПНЫЕ_ЗНАЧКИ) == 0)
			{
				//
				// Увеличить изображение для перехода к первому непрочитанному сообщению.
				//
				var элХрень = элТема.parentNode.firstElementChild.firstElementChild;
				if (элХрень != null)
				{
					элХрень.setAttribute('src', г_стрЗначокНепрочитанногоСообщения);
					элХрень.setAttribute('width', '31');
					элХрень.setAttribute('height', '22');
					элХрень.parentNode.setAttribute('class', 'gm-for-uplp gm-for-anipress');
				}

				//
				// Увеличить изображение для перехода к последнему сообщению.
				//
				элХрень = элСтрока.lastElementChild.lastElementChild.lastElementChild.firstElementChild;
				элХрень.setAttribute('src', г_стрЗначокПоследнегоСообщения);
				элХрень.setAttribute('width', '31');
				элХрень.setAttribute('height', '22');
				элХрень.parentNode.setAttribute('class', 'gm-for-anipress');
			}
		}
	}

	ИзменитьКнопкиЛистанияСтраниц(2);
	ПромотатьШапку(КонецШапки(), true);
}

function ИзменитьСписокНайденныхСообщений()
{
	ЗаменитьИзображенияСмайликов();
	УдалитьПустыеСтрокиВСообщениях();
	ИзменитьКнопкиЛистанияСтраниц(2);
	ИзменитьСсылкиВСообщениях(true);
	ПромотатьШапку(КонецШапки(), false);
}

function ИзменитьТему()
{
	var Хрень;

	try
	{
		// Извлечь идентификаторы подфорума и темы из ссылки с названием темы.
		// На данный момент идентификаторы состоят из цифр.
		// location.search теоретически может не содержать идентификатора подфорума.
		// [1] - идентификатор подфорума.
		// [2] - идентификатор темы.
		var мстрИдентификаторы = document.getElementById('pageheader')
			.firstElementChild.firstElementChild.getAttribute('href').match(/\?f=(\d+)&t=(\d+)/);
	}
	catch (e)
	{
		// Тема недоступна, например помещена в карантин.
		return;
	}

	УдалитьПустыеСтрокиВСообщениях();
	ИзменитьКнопкиЛистанияСтраниц(0);
	КомпактныйЗаголовокТемы(мстрИдентификаторы[2]);

	// Форма быстрого ответа.
	var элФорма = document.getElementById('postform');

	//
	// Создать ссылку для поиска в теме всех сообщений пользователя.
	//
	var элПоискФрагмент = document.createDocumentFragment();
	var элПоискЯкорь = элПоискФрагмент.appendChild(document.createElement('a'));
	элПоискЯкорь.textContent = г_обТекст[11];
	элПоискФрагмент.appendChild(document.createTextNode(' '));
	var стрПоискАдрес = './search.php?t=' + мстрИдентификаторы[2] + '&author=';

	//
	// Перебор всех сообщений на странице.
	// .profile не находит скрытые сообщения недругов.
	//
	for (var ы = 0, элСообщение; элСообщение = document.anchors[ы]; ++ы)
	{
		// Это не идентификатор сообщения?
		Хрень = элСообщение.getAttribute('name');
		if (Хрень.charAt(0) != 'p' || Хрень.charAt(1) < '0' || Хрень.charAt(1) > '9')
		{
			continue;
		}

		if (элПервоеСообщение === undefined)
		{
			var элПервоеСообщение = элСообщение;
		}
		else if (элВтороеСообщение === undefined)
		{
			var элВтороеСообщение = элСообщение;
		}
		var элПоследнееСообщение = элСообщение;

		// Это скрытое сообщение недруга?
		if (элСообщение.parentNode.hasAttribute('colspan'))
		{
			continue;
		}

		var элНик = элСообщение.nextElementSibling;
		var элСсылки = элСообщение.parentNode.nextElementSibling.firstElementChild.firstElementChild.firstElementChild.lastElementChild.firstElementChild;

		//
		// Добавить ссылку для поиска в теме всех сообщений пользователя.
		// Вместо идентификатора пользователя (author_id) используется ник (author), потому что у
		// некоторых пользователей нет ссылки [профиль], из которой извлекается идентификатор.
		//
		Хрень = элНик.textContent;
		элПоискЯкорь.setAttribute('href', стрПоискАдрес + encodeURIComponent(Хрень));
		элПоискЯкорь.setAttribute('title', г_обТекст[12] + Хрень);
		// Количество и состав [ссылок] предсказать практически невозможно.
		// Вставить ссылку справа от [профиль] и слева от СК.
		элСсылки.insertBefore(элПоискФрагмент.cloneNode(true), элСсылки.children.length < 2 ? null : элСсылки.lastElementChild);

		if (элФорма != null)
		{
			//
			// Удалить лишнюю ссылку [цитировать].
			//
			if (элСсылки.firstElementChild.hasAttribute('onclick'))
			{
				элСсылки.removeChild(элСсылки.firstChild);
				элСсылки.removeChild(элСсылки.firstChild);
				элСсылки.firstChild.nodeValue = элСсылки.firstChild.nodeValue.substring(1);
			}

			//
			// Вставка цитаты не будет прокручивать страницу вниз.
			// Так же добавить в заголовок цитаты ссылку на цитируемое сообщение.
			//
			Хрень = элСообщение.parentNode.parentNode.nextElementSibling.firstElementChild.getElementsByTagName('a')[0];
			// Заключить текст ссылки в [].
			Хрень.firstChild.nodeValue = г_обТекст[15];
			Хрень.setAttribute('onclick', 'return false');
			Хрень.addEventListener('click', ОбработатьВставкуЦитаты, false);

			//
			// Добавить ссылку для цитирования с прокруткой до формы редактирования.
			//
			var элКопия = Хрень.cloneNode(true);
			элКопия.firstChild.nodeValue = г_обТекст[16];
			элКопия.setAttribute('title', г_обТекст[17]);
			элКопия.setAttribute('style', 'margin-left: .5em');
			элКопия.addEventListener('click', ОбработатьВставкуЦитатыИПерейти, false);
			ВставитьУзел(элКопия, Хрень, true);

			//
			// Вставка ника не будет прокручивать страницу вниз. Хрому это исправление не требуется.
			//
			элНик.firstElementChild.setAttribute('onclick', 'return false');
			элНик.firstElementChild.addEventListener('click', ОбработатьВставкуНика, false);
		}
	}

	//
	// Изменить форму быстрого ответа.
	//
	if (элФорма != null)
	{
		var элЯчейкаСоСмайликами = document.getElementById('qr_smilies');
		var элВключПлавФорму = элФорма.getElementsByClassName('qr_float_link')[0];

		//
		// Скрыть ячейку для вставки смайликов независимо от ее прежнего состояния.
		//
		if (г_фФлаги & ФЛ_СКРЫТЬ_СМАЙЛИКИ)
		{
			// Изменить идентификатор что бы код на странице не смог показать ячейку.
			элЯчейкаСоСмайликами.setAttribute('id', 'qr_smilies_hide');
			// Управление видимостью ячейки без использования cookie.
			элВключПлавФорму.previousElementSibling.setAttribute('onclick', "$('#qr_smilies_hide').toggle()");
		}

		// Убрать лишний | после ссылки "Включить плавающую форму".
		элВключПлавФорму.nextSibling.nodeValue = '';
		ИзменитьСмайликиНаСтраницеИВФормеРедактирования(элФорма, элЯчейкаСоСмайликами, элЯчейкаСоСмайликами.lastElementChild);
		ИзменитьBBTags();
		ДобавитьСочетанияКлавишВФормуРедактирования();
	}
	else
	{
		ЗаменитьИзображенияСмайликов();
	}

	//
	// Скопировать три строки из верхней части страницы в нижнюю.
	//
	var элМама = document.getElementById('pagecontent');
	// Строка с ссылками "Новая тема" и "Пред. тема".
	var узСтрока1 = document.getElementById('first_row').cloneNode(true);
	узСтрока1.removeAttribute('id');
	узСтрока1.firstElementChild.firstElementChild.lastElementChild.setAttribute('valign', 'middle');
	// cloneNode() не копирует обработчики событий.
	узСтрока1.firstElementChild.firstElementChild.firstElementChild.lastElementChild.addEventListener('click', ОбработатьВызовМенюТемы, false);
	// Заменить нижнюю строку с ссылкой "Ответить" и кнопками для листания страниц.
	элМама.replaceChild(узСтрока1, элПоследнееСообщение.parentNode.parentNode.parentNode.parentNode.nextElementSibling.nextElementSibling);
	// Строка с ссылкой "Ваши сообщения".
	Хрень = document.getElementsByClassName('searchbar')[0].cloneNode(true);
	// Идентификатор используется в CSS и для прокрутки к последнему сообщению.
	Хрень.setAttribute('id', 'searchbarbottom');
	элМама.insertBefore(Хрень, узСтрока1.nextElementSibling);
	// Строка с кнопками для листания страниц.
	элМама.insertBefore(элМама.firstElementChild.cloneNode(true), узСтрока1.nextElementSibling);

	ИзменитьСсылкиВСообщениях(false);

	//
	// Код для прокрутки должен выполняться в сценарии последним.
	//
	if (window.location.hash == '#pagecontentbottom')
	{
		// Показать последнее сообщение и кнопки для листания страниц.
		ПрокрутитьДо('searchbarbottom');
	}
	else if (window.location.hash == '#toppost')
	{
		// Прокрутить до первого сообщения, пропуская закрепленное. Закрепленное сообщение определяется
		// по наличию дополнительной ячейки с изображением желтого восклицательного знака.
		ПрокрутитьДоЯкоря(элВтороеСообщение && элПервоеСообщение.parentNode.parentNode.querySelector('td[width="20"]')
			? элВтороеСообщение : элПервоеСообщение);
	}
	else if (window.location.hash.length > 1)
	{
		// HACK Firefox 20 при переходе к location.hash промахивается, потому что не учитывает
		// загрузку изображений и изменения в верстке страницы, которые сделал JS. Обновляем
		// location.hash что бы лиса учла изменения.
		window.location.hash = window.location.hash;
	}
	else
	{
		ПромотатьШапку('pagecontent', false);
	}
}

function ИзменитьРедакторСообщения()
// Настройка формы для редактирования сообщения в теме или ЛС.
// Не использовать для формы быстрого ответа.
// Вызывает ЗаменитьИзображенияСмайликов().
{
	// document.forms['postform'] не работает в XPCNativeWrapper.
	var элФорма = document.getElementsByName('postform')[0];
	// Возможно сообщение запрещено редактировать, оно было отправлено получателю или удалено.
	if (элФорма)
	{
		// TR со смайликами и TEXTAREA.
		var элГлавнаяСтрока = элФорма.querySelector('td[width="22%"][valign="top"]').parentNode;
		// Поле для редактирования текста.
		var элТекст = элГлавнаяСтрока.getElementsByTagName('textarea')[0];

		//
		// Уменьшить ширину панели со смайликами. Размер редактируемого текста увеличится до размера
		// просматриваемого текста (примерно). Так же все кнопки уместятся в одной строке. В случае нехватки
		// места для кнопок строка автоматически разделится на две.
		//
		элГлавнаяСтрока.firstElementChild.setAttribute('width', '148px');
		элГлавнаяСтрока.lastElementChild.removeAttribute('width');
		// Заголовок ЛС.
		if (элГлавнаяСтрока.previousElementSibling.children.length > 1)
		{
			элГлавнаяСтрока.previousElementSibling.firstElementChild.removeAttribute('width');
			элГлавнаяСтрока.previousElementSibling.lastElementChild.removeAttribute('width');
		}

		//
		// Уменьшить высоту панели с кнопками с двух строк до одной.
		//
		// Верхняя строка с кнопками.
		var элВерхняяЯчейка = элГлавнаяСтрока.lastElementChild.lastElementChild
			.firstElementChild.firstElementChild.firstElementChild;
		// Нижняя строка с кнопками.
		var элНижняяЯчейка = элВерхняяЯчейка.parentNode.nextElementSibling.firstElementChild;
		// Сократить текст 'Размер шрифта' до 'Размер' что бы кнопки влезли в одну строку.
		элВерхняяЯчейка.getElementsByTagName('span')[0].firstChild.nodeValue = г_обТекст[1];
		// Переместить кнопки из нижней строки в верхнюю.
		while (элНижняяЯчейка.firstChild)
		{
			элВерхняяЯчейка.appendChild(элНижняяЯчейка.firstChild);
		}
		// Удалить нижнюю строку.
		элНижняяЯчейка.parentNode.parentNode.removeChild(элНижняяЯчейка.parentNode);

		// mode=quote - редактирование ответа на сообщение в теме
		// mode=reply - редактирование нового сообщения в теме
		// mode=edit  - редактирование отправленного сообщения в теме
		// mode=compose&action=quote - редактирование ответа на сообщение в ЛС
		// mode=compose&action=reply - редактирование нового сообщения в ЛС
		// mode=compose&action=edit  - редактирование исходящего сообщения в ЛС
		if ((г_обЗапрос.mode == 'quote' || г_обЗапрос.action == 'quote')
		// Снят флажок "Отключить в этом сообщении BBCode"?
		&& !document.getElementsByName('disable_bbcode')[0].checked)
		{
			var стрТекст = УдалитьВложенныеЦитаты(элТекст.value);
			// Добавить в заголовок цитаты ссылку на цитируемое сообщение.
			if ((г_фФлаги & ФЛ_ССЫЛКА_В_ЦИТАТЕ) == 0 && г_обЗапрос.mode == 'quote' && г_обЗапрос.p)
			{
				// Ссылка еще не добавлена?
				if (стрТекст.substr(0, 8) == '[quote="' && стрТекст.substr(8, 5) != '[url=')
				{
					var чКонецНика = стрТекст.indexOf('"]', 8);
					стрТекст = '[quote="[url=http://forums.overclockers.ru/viewtopic.php?p='
						+ г_обЗапрос.p
						+ '#p'
						+ г_обЗапрос.p
						+ ']'
						+ стрТекст.substring(8, чКонецНика)
						+ '[/url]'
						+ стрТекст.substring(чКонецНика);
				}
			}
			элТекст.value = стрТекст;
		}

		ИзменитьСмайликиНаСтраницеИВФормеРедактирования(
			элФорма,
			элФорма.querySelector('a[onclick^="insert_text(\':D"]').parentNode,
			null);
		УдалитьПустыеСтрокиВСообщениях();
		ИзменитьРазмерСпискаПоследнихСообщений();
		ИзменитьСсылкиВСообщениях(true);
		ИзменитьBBTags();
		ДобавитьСочетанияКлавишВФормуРедактирования();

		элТекст.focus();

		// Прокрутить страницу в начало предпросматриваемого сообщения на случай
		// если оно уехало за пределы экрана после focus().
		ПрокрутитьДоЯкоря(элФорма);
	}
}

function УдалитьВложенныеЦитаты(стрТекст)
{
	var рвТеги = /\[\/?code\]|\[\/?quote\]|\[quote=".*?"\]/ig;
	var мстрТег;
	var лКод = false; // Действует тег [code]?
	var чУровень = 0; // Текущий уровень вложенности цитат.
	var индНачало;    // Индекс начала удаляемой цитаты.
	var стрРезультат = стрТекст;
	while (мстрТег = рвТеги.exec(стрТекст))
	{
		var v = мстрТег[0].charAt(1);
		if (v == '/')
		{
			if (мстрТег[0].charAt(2).toLowerCase() == 'c') // [/code]
			{
				лКод = false;
			}
			else if (!лКод && чУровень-- == 2) // [/quote]
			{
				v = стрТекст.length - стрРезультат.length;
				стрРезультат = стрРезультат.substr(0, индНачало - v) + стрРезультат.substr(рвТеги.lastIndex - v);
			}
		}
		else if (v.toLowerCase() == 'c') // [code]
		{
			лКод = true;
		}
		else if (!лКод && ++чУровень == 2) // [quote]
		{
			индНачало = мстрТег.index;
		}
	}
	// Не менять текст если не хватает закрывающих тегов [/code] или [/quote].
	// Пусть пользователь сам в этой каше ковыряется.
	return !лКод && чУровень == 0 ? стрРезультат : стрТекст;
}

function ИзменитьПодпискиИЗакладки()
{
	// Скрыть бесполезную скрепку.
	GM_addStyle('img[src="./styles/ocss2/imageset/icon_topic_attach.gif"] { display: none !important }');

	if (г_фФлаги & ФЛ_КРУПНЫЕ_ЗНАЧКИ)
	{
		return;
	}

	var сэлИзображения = document.getElementById('ucp').getElementsByTagName('img');
	for (var ы = 0, элИзображение; элИзображение = сэлИзображения[ы]; ++ы)
	{
		var стрАдрес = элИзображение.getAttribute('src');
		if (стрАдрес == './styles/ocss2/imageset/icon_topic_newest.gif')
		{
			//
			// Увеличить изображение для перехода к первому непрочитанному сообщению.
			//
			элИзображение.setAttribute('src', г_стрЗначокНепрочитанногоСообщения);
			элИзображение.setAttribute('width', '31');
			элИзображение.setAttribute('height', '22');
			элИзображение.parentNode.setAttribute('class', 'gm-for-uplp gm-for-anipress');
		}
		else if (стрАдрес == './styles/ocss2/imageset/icon_topic_latest.gif')
		{
			//
			// Увеличить изображение для перехода к последнему сообщению.
			//
			элИзображение.setAttribute('src', г_стрЗначокПоследнегоСообщения);
			элИзображение.setAttribute('width', '31');
			элИзображение.setAttribute('height', '22');
			элИзображение.parentNode.setAttribute('class', 'gm-for-uplp gm-for-anipress');

			var элЯчейка = элИзображение.parentNode.parentNode;
			// Это подписка на форум?
			if (элЯчейка.nodeName == 'TD')
			{
				элЯчейка.removeAttribute('align');
			}
			else
			{
				элЯчейка = элЯчейка.parentNode;
			}
			элЯчейка.style.minWidth = '16em';
			элЯчейка.removeAttribute('valign');
			элЯчейка.insertBefore(элИзображение.parentNode, элЯчейка.firstChild);
		}
	}
}

function ИзменитьПапкуЛС()
{
	GM_addStyle('\
		/* Скрыть вторую колонку если в ней нет значков */\
		form[name="viewfolder"] > table > tbody > tr > td:nth-of-type(2) {\
			width: 0 !important;\
			padding: 0 !important;\
		}\
	');

	ИзменитьКнопкиЛистанияСтраниц(3);

	//
	// Переименовать кнопки "Перейти" в "Выполнить".
	//
	if (г_фРусскийЯзык)
	{
		var сэлКнопки = document.getElementsByTagName('input');
		for (var ы = 0, элКнопка; элКнопка = сэлКнопки[ы]; ++ы)
		{
			if (элКнопка.getAttribute('value') == 'Перейти')
			{
				элКнопка.setAttribute('value', 'Выполнить');
			}
		}
	}

	//
	// Изменить действие по-умолчанию над выбранными сообщениями с "Пометить" на "Удалить".
	//
	var мэлМеню = document.getElementsByName('mark_option');
	// В папке есть сообщения?
	if (мэлМеню.length > 0)
	{
		мэлМеню[0].value = 'delete_marked';
	}
}

function ИзменитьПросмотрЛС()
{
	ЗаменитьИзображенияСмайликов();
	УдалитьПустыеСтрокиВСообщениях();
	ИзменитьРазмерСпискаПоследнихСообщений();
	ИзменитьСсылкиВСообщениях(true);
}

function ИзменитьСписокПользователей()
{
	ИзменитьКнопкиЛистанияСтраниц(4);
	ПромотатьШапку(КонецШапки(), false);
}

function HTMLSpecialChars(стрТекст)
// Аналог функции PHP.
// http://jsperf.com/htmlescape-replacevstextcontent/4
// TODO Кэшировать регулярные выражения если функция станет вызываться в цикле.
{
	return ('' + стрТекст).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function IsElementContentWhitespace(элТекст)
// isElementContentWhitespace оборзевателями больше не поддерживается :(
{
	return элТекст.nodeType == 3 && элТекст.nodeValue.search(/\S/) < 0;
}

function ЗаменитьУзел(элНовый, элСтарый)
{
	return элСтарый.parentNode.replaceChild(элНовый, элСтарый);
}

function ВставитьУзел(элНовый, элСтарый, фПосле)
{
	return фПосле
		? элСтарый.parentNode.insertBefore(элНовый, элСтарый.nextSibling)
		: элСтарый.parentNode.insertBefore(элНовый, элСтарый);
}

function ВставитьВНачалоСтраницы(элНовый)
{
	return document.body.insertBefore(элНовый, document.body.firstChild);
}

function ПрокрутитьДоЯкоря(варЯкорь)
// HACK Greasemonkey < 1.0: location.replace('#anchor') не работает.
// HACK Opera 12.13: location.replace('#anchor') по ошибке адрес добавляет, а не замещает.
// В обоих случаях нужно использовать абсолютный URL.
// Если адрес заканчивается на #, то страница прокручивается в начало и location.hash
// возвращает пустую строку (только осел возвращает #).
{
	if (typeof(варЯкорь) != 'string')
	{
		var стрИдентификатор = варЯкорь.getAttribute('id');
		if (!стрИдентификатор)
		{
			стрИдентификатор = варЯкорь.getAttribute('name');
			if (!стрИдентификатор || варЯкорь.nodeName != 'A')
			{
				варЯкорь.setAttribute('id', стрИдентификатор = 'gm-for-scroll');
			}
		}
		варЯкорь = стрИдентификатор;
	}
	var l = window.location;
	l.replace(l.protocol + '//' + l.host + l.pathname + l.search + '#' + варЯкорь);
}

function ПрокрутитьДо(стрИдентификаторЭлемента)
{
	var элЦель = document.getElementById(стрИдентификаторЭлемента);

	//
	// Из-за загружающихся изображений элемент может уехать вниз. Нельзя
	// слишком долго возвращать его обратно, т.к. это блокирует прокрутку
	// страницы пользователем. Начальная задержка довольно большая, что бы
	// страницу меньше колбасило во время загрузки, что довольно неприятно.
	//
	window.setTimeout(Таймер, 500);
	window.setTimeout(Таймер, 1000);

	function Таймер()
	{
		элЦель.scrollIntoView(false);
	}
}


function КонецШапки()
// Возвращает первый элемент, расположеный под шапкой форума.
{
	return document.getElementsByClassName('breadcrumbs')[0]
		.parentNode.parentNode.parentNode.parentNode.nextElementSibling.nextElementSibling;
}

function ПромотатьШапку(варЯкорь, лОбновитьСтраницу)
// Прокручивает шапку. Используется location.hash вместо scrollIntoView() что бы при перезагрузке
// страницы не было повторной прокрутки. Так же функция запрещает использовать Лисе кэш для
// перехода на страницу с помощью кнопок Вперед/Назад.
{
	if (window.location.hash.length < 2)
	{
		ПрокрутитьДоЯкоря(варЯкорь);
	}
	if (лОбновитьСтраницу)
	{
		window.addEventListener('pageshow', ОбновитьСтраницу, false);
	}
}

function ОбновитьСтраницу(обСобытие)
// Если перейти из списка тем к последнему непрочитанному сообщению и после этого вернуться в список
// нажав кнопку Назад, то тема по-прежнему будет помечена как непрочитанная, потому что Лиса 20
// сохранила страницу в кэше. Для отключения кэширования нужно добавить HTTP-заголовок cache-control:
// no-store. Это нельзя сделать с помощью JS. Для обновления списка перезагружаем страницу. В качестве
// негативного побочного эффекта все файлы, на которые ссылается перезагружаемая страница, будут проверены
// на изменение, что немного замедлит перезагрузку. Опера 12 так же сохраняет страницу в кэше, но она не
// поддерживает событие pageshow. Хромой 26 всегда перезагружает страницу, возможно потому что сервер
// посылает cache-control: no-cache и expires: 0.
{
	if (обСобытие.persisted)
	{
		// Добавляем несуществующий #идентификатор что бы после перезагрузки страница не была перемотана.
		ПрокрутитьДоЯкоря('gm-for-null');
		window.location.reload();
	}
}

function УстановитьЗначокСтраницы(стрUrlЗначка)
// Устанавливает или меняет значок страницы.
// Предполагается, что страница разобрана и в ней нет <link rel="shortcut icon">.
{
	var элЗначок = document.createElement('link');
	элЗначок.setAttribute('rel', 'shortcut icon');
	элЗначок.setAttribute('href', стрUrlЗначка);
	document.head.appendChild(элЗначок);
}

function ДобавитьСтиль(стрСтиль)
// В отличие от GM_addStyle() возвращает вставленный элемент.
{
	if (document.head)
	{
		var элСтиль = document.createElement('style');
		элСтиль.textContent = стрСтиль;
		return document.head.appendChild(элСтиль);
	}
	return null;
}

function ДляРегВыр(стрТекст)
// Возвращает текст, который можно использовать в составе шаблона регулярных выражений.
// https://developer.mozilla.org/en/javascript/guide/regular_expressions
{
	return стрТекст.replace(/[\\^$*+?.|(){}[\]]/g, '\\$&');
}

function РазобратьЗапрос()
// Возвращает объект с результатами разбора строки location.search.
// Параметры без названия игнорируются.
{
	var обЗапрос = {};
	if (window.location.search.length > 1)
	{
		var а = window.location.search.substr(1).split('&');
		for (var ы = а.length; --ы >= 0;)
		{
			var б = а[ы], в = б.indexOf('=');
			if (в > 0)
			{
				обЗапрос[б.substr(0, в)] = decodeURIComponent(б.substr(в + 1));
			}
			else if (в < 0)
			{
				обЗапрос[б] = '';
			}
		}
	}
	return обЗапрос;
}

function ПоказатьМенюшку(обКоординаты, узМенюшка)
// Показывает менюшку узМенюшка поверх элемента с координатами обКоординаты.
// Высота пункта меню должна быть не меньше высоты элемента, иначе менюшка,
// состоящая из одного пункта, может исчезнуть сразу после появления.
{
	// Ширина рамки в пикселах у focused элемента которую нужно скрыть.
	var РАМКА = 2;

	// Минимальное расстояние в пикселах между низом менюшки и окном.
	// Должно вместить горизонтальную полосу прокрутки окна и тень менюшки.
	var ОТСТУП = 50;

	// Не дать менюшке выйти за нижнюю границу окна.
	узМенюшка.style.top = window.pageYOffset + Math.min(обКоординаты.top - РАМКА,
	Math.max(window.innerHeight - ОТСТУП, обКоординаты.bottom + РАМКА) - узМенюшка.offsetHeight) + 'px';
	узМенюшка.style.left = window.pageXOffset + обКоординаты.left - РАМКА + 'px';
	узМенюшка.style.minWidth = РАМКА + обКоординаты.width + РАМКА + 'px';
	узМенюшка.setAttribute('class', 'gm-for-pm-popup-show');

	document.addEventListener('mousemove', function ОбработатьДвижениеМышиНадМенюшкой(обСобытие)
	// Если событие направлено узлу, который не входит в состав менюшки,
	// то значит мышь вышла за ее пределы и менюшку нужно скрыть.
	{
		if (обСобытие.target !== узМенюшка
		&& (обСобытие.target.compareDocumentPosition(узМенюшка) & DOCUMENT_POSITION_CONTAINS) == 0)
		{
			document.removeEventListener('mousemove', ОбработатьДвижениеМышиНадМенюшкой, false);
			узМенюшка.setAttribute('class', 'gm-for-pm-popup-hide');
		}
	}, false);
}

function ОбработатьВызовМенюТемы(обСобытие)
// Показывает менюшку поверх щелкнутой ссылки.
{
	var узЯкорь = обСобытие.target.nodeName == 'A' ? обСобытие.target : обСобытие.target.parentNode;
	var обКоординатыЯкоря = узЯкорь.getBoundingClientRect();
	var обКоординатыИзображения = узЯкорь.firstChild.getBoundingClientRect();
	var обКоординаты = {};
	обКоординаты.top = Math.min(обКоординатыЯкоря.top, обКоординатыИзображения.top);
	обКоординаты.bottom = Math.max(обКоординатыЯкоря.bottom, обКоординатыИзображения.bottom);
	обКоординаты.left = обКоординатыЯкоря.left;
	обКоординаты.right = обКоординатыЯкоря.right;
	обКоординаты.height = обКоординаты.bottom - обКоординаты.top;
	обКоординаты.width = обКоординаты.right - обКоординаты.left;
	ПоказатьМенюшку(обКоординаты, document.getElementById('gm-for-pm-popup'));
}

function КомпактныйЗаголовокТемы(стрИдентификаторТемы)
// Перегруппировать элементы в заголовке темы (две строки), уменьшив его горизонтальный размер.
{
	// BUG В Opera 12 после появления менюшки не подсвечен ее пункт.
	// В Firefox подсвечен, потому что после щелчка курсор смещается на один пиксель.
	GM_addStyle('\
	#first_row { margin: -6px 0 0 0 }\
	#gm-for-pm-popup {\
		position: absolute;\
		z-index: 1000;\
		border: 1px solid black;\
		box-shadow: .5em .5em 1em rgba(0,0,0,.2);\
		visibility: hidden;\
		opacity: 0;\
	}\
	.gm-for-pm-popup-show {\
		visibility: visible !important;\
		opacity: 1 !important;\
		   -moz-transition: opacity .15s ease-out;\
		        transition: opacity .15s ease-out;\
	}\
	.gm-for-pm-popup-hide {\
		   -moz-transition: opacity .15s ease-out, visibility 0s ease .15s;\
		        transition: opacity .15s ease-out, visibility 0s ease .15s;\
	}\
	.gm-for-pm-item {\
		display: block;\
		padding: .4em;\
		background-color: white;\
	}\
	.gm-for-pm-item:hover {\
		text-decoration: none;\
		color: black;\
		background-color: #FFB444;\
	}\
	.gm-for-pm-item + .gm-for-pm-item { border-top: 1px solid #B0B0B0 }\
	');

	// Ячейка с двумя ссылками: "Новая тема" и "Ответить".
	var элЯчейка0 = document.getElementById('pagecontent').firstElementChild.firstElementChild.firstElementChild.firstElementChild;
	// Ячейка с ссылками "Подписаться на тему", "В закладки" и т.д. Эти ссылки будут перемещены в
	// менюшку, а на их место перемещены "Новая тема", "Ответить" и ссылка для вызова менюшки.
	var элЯчейка1 = document.getElementById('first_row').firstElementChild.firstElementChild.firstElementChild;
	элЯчейка1.nextElementSibling.setAttribute('valign', 'bottom');

	// Создать менюшку.
	var элМенюшка = document.createElement('div');
	элМенюшка.id = 'gm-for-pm-popup';

	// Переместить ссылки в менюшку.
	var лВсеСообщения = false;
	for (var сэлЯкоря = элЯчейка1.getElementsByTagName('a'), элЯкорь; элЯкорь = сэлЯкоря[0];)
	{
		элМенюшка.appendChild(элЯкорь);
		// Ускорение работы селектора CSS.
		элЯкорь.setAttribute('class', 'gm-for-pm-item');
		if (элЯкорь.search.substr(-10) == '&printfull')
		{
			лВсеСообщения = true;
			элЯкорь.setAttribute('title', г_обТекст[20]);
			элЯкорь.firstChild.nodeValue = г_обТекст[19];
		}
		else
		{
			// Удалить дублирующую подсказку.
			элЯкорь.removeAttribute('title');
		}
	}

	// По непонятной причине, если не авторизоваться, то у части тем нет ссылки
	// на просмотр всех сообщений. Добавляем ее.
	if (!лВсеСообщения)
	{
		элЯкорь = document.createElement('a');
		элЯкорь.setAttribute('class', 'gm-for-pm-item');
		элЯкорь.setAttribute('href', './viewtopic.php?t=' + стрИдентификаторТемы + '&view=print&printfull');
		элЯкорь.setAttribute('title', г_обТекст[20]);
		элЯкорь.textContent = г_обТекст[19];
		элМенюшка.appendChild(элЯкорь);
	}

	// Добавить в менюшку ссылку для поиска в теме всех своих гениальных сообщений.
	if (г_стрМойНик)
	{
		элЯкорь = document.createElement('a');
		элЯкорь.setAttribute('class', 'gm-for-pm-item');
		элЯкорь.setAttribute('href', './search.php?t=' + стрИдентификаторТемы + '&author=' + г_стрМойНик);
		элЯкорь.setAttribute('title', г_обТекст[14]);
		элЯкорь.textContent = г_обТекст[13];
		элМенюшка.appendChild(элЯкорь);
	}

	ВставитьВНачалоСтраницы(элМенюшка);
	//
	// К двум ссылкам добавить третюю, которая будет вызывать менюшку.
	//
	элЯкорь = document.createElement('a');
	элЯкорь.setAttribute('href', 'javascript:');
	элЯкорь.addEventListener('click', ОбработатьВызовМенюТемы, false);
	var элЗначок = элЯкорь.appendChild(document.createElement('img'));
	элЗначок.setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAANCAYAAABLjFUnAAAAdklEQVR42mNkgIKzl278f/H6PYzLICEqyGCsp8HIQAKAK9669/h/LycLuER1z3yGttIkygwLaU1gWFO9AG5YSGrlf2QNa2a3YxWjnctAYbZ25zG4hIGmIkOYj+MgCrObIowM6m/+j4YZCYYZ5RxkODfFfpiFGQCJP3wOeRxihwAAAABJRU5ErkJggg==');
	элЗначок.setAttribute('width', '19');
	элЗначок.setAttribute('height', '13');
	элЯкорь.appendChild(document.createTextNode(' ' + г_обТекст[10]));
	элЯчейка0.appendChild(document.createTextNode(' / '));
	элЯчейка0.appendChild(элЯкорь);

	// Перенести три ссылки на строку ниже.
	ЗаменитьУзел(элЯчейка0, элЯчейка1);
}

function ИзменитьКнопкиЛистанияСтраниц(идМестонахождение)
// Изменяет блок с кнопками для листания страниц.
// идМестонахождение:
// 0 - тема
// 1 - подфорум
// 2 - результат поиска
// 3 - папка с личными сообщениями
// 4 - список пользователей форума
{
	var стрПредыдущаяСтраница, стрСледующаяСтраница;

	// TIP Во всех обозревателях getElementsByXXX() быстрее чем querySelectorXXX().
	// TIP Во всех обозревателях querySelectorXXX() быстрее чем evaluate().
	var nlSpans = document.getElementsByClassName('pagination');
ПереборБлоков:
	for (var idxSpan = 0, emSpan; emSpan = nlSpans[idxSpan]; ++idxSpan)
	{
		switch (идМестонахождение)
		{
		case 0:
			// Не тратить время на изменение нижнего блока, который позже будет удален.
			if (idxSpan == 1)
			{
				continue;
			}
			break;

		case 2:
			if (idxSpan == 0)
			{
				GM_addStyle('\
					.nav {\
						/* Отделить блок с кнопками от таблицы */\
						display: inline-block !important;\
						margin-top: 5px !important;\
						/* Убрать жирный шрифт */\
						font-weight: inherit !important;\
					}\
				');
			}
			break;

		case 3:
			if (idxSpan == 1)
			{
				//
				// Блок не умещается в ячейке на мониторах с низким разрешением.
				// Перенести содержимое блока ниже, слева от ссылок "Отметить все" и "Снять выделение".
				//
				GM_addStyle('\
					#pagecontent > table:nth-of-type(2) { margin-bottom: 5px !important }\
					form[name="sortmsg"] { text-align: center !important }\
				');
				var emParent = emSpan.parentNode;
				var emDiv = document.createElement('div');
				emDiv.style.cssFloat = 'left';
				emDiv.innerHTML = emParent.innerHTML;
				emParent.parentNode.removeChild(emParent);
				emParent = document.getElementById('pagecontent');
				emParent.insertBefore(emDiv, emParent.children[emParent.children.length - 2]);
				emSpan = nlSpans[idxSpan];
			}
			break;

		case 4:
			// Удалить лишние классы.
			nlSpans[0].removeAttribute('class');
			nlSpans[0].removeAttribute('class');
			// Список найденных пользователей занимает одну страницу?
			if ((emSpan = nlSpans[0]) == undefined)
			{
				break ПереборБлоков;
			}
			break;
		}

		// Переносить элементы блока на мониторах с низким разрешением.
		emSpan.parentNode.removeAttribute('nowrap');

		//
		// Кнопка <
		//
		var emA = emSpan.previousElementSibling;
		if (emA != null && emA.textContent == '<')
		{
			// Упростить селектор css.
			emA.setAttribute('class', 'gotoprevpage');
			// Изменить название кнопки.
			emA.firstChild.nodeValue = г_обТекст[4];
			// Всплывающая подсказка с сочетанием клавиш.
			emA.setAttribute('title', 'Z');
			// После загрузки страницы прокрутить содержимое окна.
			emA.setAttribute('href', стрПредыдущаяСтраница = emA.getAttribute('href')
				+ (идМестонахождение == 0 ? '#pagecontentbottom' : ''));
		}

		//
		// Кнопка >
		//
		emA = emSpan.nextElementSibling;
		if (emA != null && emA.textContent == '>')
		{
			emA.setAttribute('class', 'gotonextpage');
			emA.firstChild.nodeValue = г_обТекст[3];
			emA.setAttribute('title', 'X');
			emA.setAttribute('href', стрСледующаяСтраница = emA.getAttribute('href')
				+ (идМестонахождение == 0 ? '#toppost' : ''));
		}
	}

	//
	// Переход на предыдущую/следующую страницу с помощью клавиш Z и X.
	//
	if (стрПредыдущаяСтраница || стрСледующаяСтраница)
	{
		// Очищаем переменную nlSpans и заодно ускоряем проверку типа элемента.
		nlSpans = { email: 0, number: 0, password: 0, search: 0, text: 0, url: 0 };

		document.addEventListener('keydown', function(обСобытие)
		{
			//
			// Не перехватывать нажатия клавиш в поле для набора текста.
			//
			var обЦель = обСобытие.target;
			if (обЦель.nodeName == 'TEXTAREA'
			|| (обЦель.nodeName == 'INPUT' && обЦель.getAttribute('type') in nlSpans))
			{
				return;
			}

			if (!обСобытие.ctrlKey && !обСобытие.shiftKey && !обСобытие.altKey && !обСобытие.metaKey)
			{
				// В Опере нет константы обСобытие.DOM_VK_Z.
				if (стрПредыдущаяСтраница && обСобытие.keyCode == 90)
				{
					// Запретить Лисе включать быстрый поиск.
					обСобытие.preventDefault();
					window.location.href = стрПредыдущаяСтраница;
				}
				// В Опере нет константы обСобытие.DOM_VK_X.
				else if (стрСледующаяСтраница && обСобытие.keyCode == 88)
				{
					обСобытие.preventDefault();
					window.location.href = стрСледующаяСтраница;
				}
			}
		}, false);
	}
}

function УдалитьПустыеСтрокиВСообщениях()
// Удаляет пустые строки после [quote], [code], [spoiler=] и вложения. С помощью CSS это сделать невозможно.
{
	УдалитьПустыеСтрокиПослеКласса('quotecontent', true);
	УдалитьПустыеСтрокиПослеКласса('codecontent', false);
	УдалитьПустыеСтрокиПослеКласса('attachcontent', false);
	УдалитьПустыеСтрокиПослеКласса('sp-wrap', false);

	function УдалитьПустыеСтрокиПослеКласса(стрИмяКласса, лУдалитьВсе)
	{
		var сэлБлоки = document.getElementsByClassName(стрИмяКласса);
		for (var ы = 0, элБлок; элБлок = сэлБлоки[ы]; ++ы)
		{
			for (;;)
			{
				var элСледующий = элБлок.nextSibling;
				if (элСледующий != null)
				{
					// Пробелы после блоков встречаются редко.
					if (IsElementContentWhitespace(элСледующий))
					{
						элСледующий.parentNode.removeChild(элСледующий);
						continue;
					}
					else if (элСледующий.nodeName == 'BR')
					{
						элСледующий.parentNode.removeChild(элСледующий);
						if (лУдалитьВсе)
						{
							continue;
						}
					}
				}
				break;
			}
		}
	}
}

function ИзменитьBBTags()
// В форме редактирования сообщения кнопка URL вставляет [url=] вместо [url].
{
	unsafeWindow.bbtags[unsafeWindow.bbtags.indexOf('[url]')] = '[url=]';
}

function ДобавитьСочетанияКлавишВФормуРедактирования()
// Отправка сообщения по Ctrl+Enter.
// Предпросмотр сообщения по Ctrl+Space.
{
	// Кнопка "Отправить".
	var элОтправить = document.getElementsByName('post')[0];
	элОтправить.setAttribute('title', 'Ctrl+Enter');

	// Кнопка "Предпросмотр".
	var элПредпросмотр = document.getElementsByName('preview')[0];
	элПредпросмотр.setAttribute('title', 'Ctrl+Space');

	document.getElementsByName('message')[0].addEventListener('keydown', function(обСобытие)
	{
		if (обСобытие.ctrlKey && !обСобытие.shiftKey && !обСобытие.altKey && !обСобытие.metaKey)
		{
			// Ctrl+Enter. В Опере нет константы обСобытие.DOM_VK_RETURN.
			if (обСобытие.keyCode == 13)
			{
				обСобытие.preventDefault();
				элОтправить.click();
			}
			// Ctrl+Space. В Опере нет константы обСобытие.DOM_VK_SPACE.
			else if (обСобытие.keyCode == 32)
			{
				// Запретить Хромому вставлять пробел.
				обСобытие.preventDefault();
				элПредпросмотр.click();
			}
		}
	}, false);
}

function ЗаменитьЗначокПоследнегоСообщения(элВЭлементе)
// Увеличивает изображение для перехода к последнему сообщению.
{
	if (г_фФлаги & ФЛ_КРУПНЫЕ_ЗНАЧКИ)
	{
		return;
	}

	var сэлИзображения = элВЭлементе.querySelectorAll('img[src="./styles/ocss2/imageset/icon_topic_latest.gif"]');
	for (var ы = 0, элИзображение; элИзображение = сэлИзображения[ы]; ++ы)
	{
		элИзображение.setAttribute('src', г_стрЗначокПоследнегоСообщения);
		элИзображение.setAttribute('width', '31');
		элИзображение.setAttribute('height', '22');
		элИзображение.parentNode.style.cssFloat = 'left';
		элИзображение.parentNode.setAttribute('class', 'gm-for-anipress');

	}
}

function ЗаменитьЗначокНепрочитанногоСообщения(элВЭлементе)
// Увеличивает изображение для перехода к первому непрочитанному сообщению.
{
	if (г_фФлаги & ФЛ_КРУПНЫЕ_ЗНАЧКИ)
	{
		return;
	}

	var сэлИзображения = элВЭлементе.querySelectorAll('img[src="./styles/ocss2/imageset/icon_topic_newest.gif"]');
	for (var ы = 0, элИзображение; элИзображение = сэлИзображения[ы]; ++ы)
	{
		элИзображение.setAttribute('src', г_стрЗначокНепрочитанногоСообщения);
		элИзображение.setAttribute('width', '31');
		элИзображение.setAttribute('height', '22');
		элИзображение.style.verticalAlign = 'middle';
		элИзображение.parentNode.setAttribute('class', 'gm-for-anipress');
	}
}

function ИзменитьСсылкиВСообщениях(лВсеСсылки)
// - Ссылки в сообщениях открываются в новой вкладке.
// - Адрес в ссылках фотохостингов по возможности меняется на адрес изображения.
// - Удаляются лишние ссылки, которые ведут на главную страницу фотохостинга.
{
	var сэлСсылки = document.getElementsByClassName('postlink-local');
	for (var ы = 0, элСсылка; элСсылка = сэлСсылки[ы]; ++ы)
	{
		элСсылка.setAttribute('target', '_blank');
	}

	if (лВсеСсылки || (г_фФлаги & ФЛ_ССЫЛКИ_НА_ФОТОХОСТИНГИ) == 0)
	{
		сэлСсылки = document.getElementsByClassName('postlink');
		for (ы = 0; элСсылка = сэлСсылки[ы]; ++ы)
		{
			if (лВсеСсылки)
			{
				элСсылка.setAttribute('target', '_blank');
			}
			if ((г_фФлаги & ФЛ_ССЫЛКИ_НА_ФОТОХОСТИНГИ) == 0)
			{
				ИзменитьСсылкуНаИзображение(элСсылка);
			}
		}
	}
}

function ИзменитьСсылкуНаИзображение(элСсылка)
// Перед изменением адреса делаются казалось бы лишние проверки с помощью регулярных выражений.
// Это нужно, что бы не было ложных срабатываний - пользователи любят ошибаться при вводе
// bbcode, а хостинги могут изменить формат адреса.
{
	var стрУзел = элСсылка.hostname.toLowerCase();
	var стрРеклама = элСсылка.getAttribute('href');
	var стрМиниатюра = (элСсылка.firstElementChild != null && элСсылка.firstElementChild.nodeName == 'VAR')
		? элСсылка.firstElementChild.getAttribute('title') : '';
	var стрИзображение, мстрРВ1, мстрРВ2;

	// Оставить только поддомен второго уровня.
	// http://jsperf.com/lastindexof-vs-split/2
	switch (стрУзел.substr(стрУзел.lastIndexOf('.', стрУзел.lastIndexOf('.') - 1) + 1))
	{
	case '10pix.ru':
		// Реклама:     http://10pix.ru/view/4348/8029150/
		// Миниатюра:   http://10pix.ru/img1/4348/8029150.th.png
		// Изображение: http://10pix.ru/img1/4348/8029150.png
		if ((мстрРВ1 = стрРеклама.match(/^http:\/\/10pix\.ru\/view(\/\w+\/\w+)\/$/i)) != null
		&&  (мстрРВ2 = стрМиниатюра.match(new RegExp('^(http://10pix\\.ru/img1' + мстрРВ1[1] + ')\\.th(\\.[a-z]+)$', 'i'))) != null)
		{
			стрИзображение = мстрРВ2[1] + мстрРВ2[2];
		}
		break;

	case '4put.ru':
		// Ошибка хостинга: всем изображениям присваивается расширение jpg.
		// Реклама:     http://4put.ru/view-max-picture.php?id=1090666
		// Миниатюра:   http://4put.ru/pictures/small/355/1090666.jpg
		// Изображение: http://4put.ru/pictures/max/355/1090666.jpg
		if ((мстрРВ1 = стрРеклама.match(/^http:\/\/4put\.ru\/view-max-picture\.php\?id=(\w+)$/i)) != null
		&&  (мстрРВ2 = стрМиниатюра.match(new RegExp('^(http://4put\\.ru/pictures/)small(/\\w+/' + мстрРВ1[1] + '\\.jpg)$', 'i'))) != null)
		{
			стрИзображение = мстрРВ2[1] + 'max' + мстрРВ2[2];
		}
		break;

	case 'funkyimg.com':
		// Реклама:     http://funkyimg.com/viewer.php?img=/2/1850/190/1112222000x2000_PNG.png
		// Миниатюра:   http://funkyimg.com/t2/1850/190/1112222000x2000_PNG.png
		// Изображение: http://funkyimg.com/u2/1850/190/1112222000x2000_PNG.png
		if (стрРеклама.substr(0, 36).toLowerCase() == 'http://funkyimg.com/viewer.php?img=/')
		{
			стрИзображение = 'http://funkyimg.com/u' + стрРеклама.substr(36);
		}
		break;

	case 'ifotki.info':
		// Реклама:     http://ifotki.info/11/2a57c716001a5d1d9192fbc4a2107da3bcff68123806603.png.html
		// Миниатюра:   http://f11.ifotki.info/thumb/2a57c716001a5d1d9192fbc4a2107da3bcff68123806603.png
		// Изображение: http://f11.ifotki.info/org/2a57c716001a5d1d9192fbc4a2107da3bcff68123806603.png
		if ((мстрРВ1 = стрРеклама.match(/^http:\/\/ifotki\.info\/(\d+)\/([\w\.]+)\.html$/i)) != null)
		{
			стрИзображение = 'http://f' + мстрРВ1[1] + '.ifotki.info/org/' + мстрРВ1[2];
		}
		break;

	case 'imagepost.ru':
		// Ошибка хостинга: нет доступа к миниатюрам.
		// Реклама:     http://www.imagepost.ru/?v=2000x2000_3.PNG
		// Миниатюра:   http://imagepost.ru/thumbs/2/00/2000x2000_3.PNG
		// Изображение: http://imagepost.ru/images/2/00/2000x2000_3.PNG
		if ((мстрРВ1 = стрРеклама.match(/^http:\/\/(?:www\.)?imagepost\.ru\/\?v=(.)(..)(.+)$/i)) != null)
		{
			стрИзображение = 'http://imagepost.ru/images/' + мстрРВ1[1] + '/' + мстрРВ1[2] + '/' + мстрРВ1[1] + мстрРВ1[2] + мстрРВ1[3];
		}
		break;

	case 'imageshack.us':
		// Ссылка рекламы поменялась, ссылки миниатюры и изображения остались прежними.
		// Реклама 1:   http://imageshack.us/photo/my-images/696/2000x2000.png/
		// Реклама 2:   http://img696.imageshack.us/i/2000x2000.png/
		// Миниатюра:   http://img696.imageshack.us/img696/6885/2000x2000.th.png
		// Изображение: http://img696.imageshack.us/img696/6885/2000x2000.png
		if (((мстрРВ1 = стрРеклама.match(/^http:\/\/imageshack\.us\/photo\/my-images\/(\d+)(\/[^\/]+)\.([a-z]+)\/$/i)) != null
		||   (мстрРВ1 = стрРеклама.match(/^http:\/\/img(\d+)\.imageshack\.us\/i(\/[^\/]+)\.([a-z]+)\/$/i)) != null))
		{
			if ((мстрРВ2 = стрМиниатюра.match(new RegExp('^(http://img' + мстрРВ1[1] + '\\.imageshack\\.us/img' + мстрРВ1[1] + '/\\w+' + ДляРегВыр(мстрРВ1[2]) + '\\.)th\\.' + мстрРВ1[3] + '$', 'i'))) != null)
			{
				стрИзображение = мстрРВ2[1] + мстрРВ1[3];
			}
			else if (стрМиниатюра.search(new RegExp('^http://img' + мстрРВ1[1] + '\\.imageshack\\.us/img' + мстрРВ1[1] + '/\\w+' + ДляРегВыр(мстрРВ1[2]) + '\\.' + мстрРВ1[3] + '$', 'i')) == 0)
			{
				стрИзображение = null;
			}
		}
		break;

	case 'imageshost.ru':
		// Реклама:     http://imageshost.ru/photo/2005353/id2146842.html
		// Миниатюра:   http://img13.imageshost.ru/img/2012/07/02/image_4ff1a96bdbe1d_small.png
		// Изображение: http://img13.imageshost.ru/img/2012/07/02/image_4ff1a96bdbe1d.png
		if (стрРеклама.search(/^http:\/\/imageshost\.ru\/photo\/\w+\/id\w+\.html$/i) == 0
		&& стрМиниатюра.search(/^http:\/\/\w+\.imageshost\.ru\/img\/.+\/image_\w+_small\.[a-z]+$/i) == 0)
		{
			стрИзображение = стрМиниатюра.replace('_small.', '.');
		}
		break;

	case 'imgur.com':
		// Реклама:     http://imgur.com/4xjcn
		// Миниатюра 1: http://i.imgur.com/4xjcns.png
		// Миниатюра 2: http://i.imgur.com/4xjcnl.png
		// Изображение: http://i.imgur.com/4xjcn.png
		if ((мстрРВ1 = стрРеклама.match(/^http:\/\/imgur\.com\/(\w{5})$/i)) != null)
		{
			if ((мстрРВ2 = стрМиниатюра.match(new RegExp('^http://i\\.imgur\\.com/' + мстрРВ1[1] + '.(\\.[a-z]+)$', 'i'))) != null)
			{
				стрИзображение = 'http://i.imgur.com/' + мстрРВ1[1] + мстрРВ2[1];
			}
			else
			{
				// Вариант как для savepic.
				стрИзображение = 'http://i.imgur.com/' + мстрРВ1[1] + '.jpg';
			}
		}
		break;

	case 'ipicture.ru':
		// Реклама 1:   http://ipicture.ru/Gallery/Viewfull/11539889.html
		// Реклама 2:   http://s1.ipicture.ru/Gallery/Viewfull/11539889.html
		// Миниатюра:   http://s1.ipicture.ru/uploads/20120701/thumbs/W8fexsHc.png
		// Изображение: http://s1.ipicture.ru/uploads/20120701/W8fexsHc.png
		if (стрРеклама.search(/^http:\/\/(?:\w+\.)?ipicture\.ru\/Gallery\/Viewfull\/\w+\.html$/i) == 0
		&& стрМиниатюра.search(/^http:\/\/\w+\.ipicture\.ru\/uploads\/\w+\/thumbs\/[^\/]+/i) == 0)
		{
			стрИзображение = стрМиниатюра.replace('/thumbs/', '/');
		}
		break;

	case 'jpegshare.net':
		// Реклама:     http://jpegshare.net/9c/a3/9ca3e88e7a8c90e4ec45633df2917e52.png.html
		// Миниатюра:   http://jpegshare.net/thumbs/9c/a3/9ca3e88e7a8c90e4ec45633df2917e52.jpg
		// Изображение: http://jpegshare.net/images/9c/a3/9ca3e88e7a8c90e4ec45633df2917e52.png
		if ((мстрРВ1 = стрРеклама.match(/^http:\/\/jpegshare\.net(\/\w+\/\w+\/\w+\.[a-z]+)\.html$/i)) != null)
		{
			стрИзображение = 'http://jpegshare.net/images' + мстрРВ1[1];
		}
		break;

	case 'pic4net.com':
		// Реклама 1:   http://pic4net.com/pt-H7K9.html
		// Реклама 2:   http://pic4net.com/pm-H7K9.html
		// Миниатюра 1: http://pic4net.com/dt-H7K9.png
		// Миниатюра 2: http://pic4net.com/dm-H7K9.png
		// Изображение: http://pic4net.com/di-H7K9.png
		if ((мстрРВ1 = стрРеклама.match(/^http:\/\/pic4net\.com\/p.(-\w+)\.html$/i)) != null)
		{
			if ((мстрРВ2 = стрМиниатюра.match(new RegExp('^http://pic4net\\.com/d.' + мстрРВ1[1] + '(\\.[a-z]+)$', 'i'))) != null)
			{
				стрИзображение = 'http://pic4net.com/di' + мстрРВ1[1] + мстрРВ2[1];
			}
			else
			{
				// Вариант как для savepic.
				стрИзображение = 'http://pic4net.com/di' + мстрРВ1[1] + '.jpg';
			}
		}
		break;

	case 'piccy.info':
		// Нельзя узнать прямую ссылку на изображение.
		// Изображения с большим разрешением переводятся в jpeg.
		// Показываем изображение с максимальным разрешением.
		// Реклама 1:   http://piccy.info/view3/3204993/b95ffb45e5a8272144931ec0cd64c847/
		// Реклама 2:   http://piccy.info/view3/3204993/b95ffb45e5a8272144931ec0cd64c847/orig/
		// Миниатюра 1: http://i.piccy.info/i7/5d6fae2bfa8a07679daa3666f50f71ee/1-8-310/60400760/2000x2000_240.jpg
		// Миниатюра 2: http://i.piccy.info/i7/91ec9a8b12a45d50d16ede14e0f4a935/1-8-310/60405106/2000x2000_500.jpg
		// Миниатюра 3: http://i.piccy.info/i7/f11d79139bf0dc5080526e90a8eb4897/1-8-310/60412813/2000x2000_800.jpg
		// Изображение: http://i.piccy.info/i7/17a2a93e64944efc863178d2c511791d/1-8-310/60310238/2000x2000.jpg
		if (стрРеклама.search(/^http:\/\/piccy\.info\/view3\/\w+\/\w+\/$/i) == 0)
		{
			стрИзображение = стрРеклама + 'orig/';
		}
		break;

	case 'pixs.ru':
		// Реклама:     http://pixs.ru/showimage/2000x2000P_1679045_5169694.png
		// Миниатюра:   http://i5.pixs.ru/thumbs/6/9/4/2000x2000P_1679045_5169694.jpg
		// Изображение: http://i5.pixs.ru/storage/6/9/4/2000x2000P_1679045_5169694.png
		if ((мстрРВ1 = стрРеклама.match(/^http:\/\/pixs\.ru\/showimage(\/[^\/]+\.)([a-z]+)$/i)) != null
		&&  (мстрРВ2 = стрМиниатюра.match(new RegExp('^(http://\\w+\\.pixs\\.ru/)thumbs(/\\w+/\\w+/\\w+)' + ДляРегВыр(мстрРВ1[1]) + 'jpg$', 'i'))) != null)
		{
			стрИзображение = мстрРВ2[1] + 'storage' + мстрРВ2[2] + мстрРВ1[1] + мстрРВ1[2];
		}
		break;

	case 'radikal.ru':
		// Реклама:     http://radikal.ru/F/s11.radikal.ru/i184/1207/d1/6bab954b1256.png.html
		// Миниатюра:   http://s11.radikal.ru/i184/1207/d1/6bab954b1256t.jpg
		// Изображение: http://s11.radikal.ru/i184/1207/d1/6bab954b1256.png
		if (стрРеклама.substr(0, 20).toLowerCase() == 'http://radikal.ru/f/' && стрРеклама.substr(-5) == '.html')
		{
			стрИзображение = 'http://' + стрРеклама.slice(20, -5);
		}
		break;

	case 'radikal.ua':
		// Сейчас radikal.ua загружает изображения на radikals.ru.
		// Реклама:     http://radikal.ua/full/49112/0fccf/10003bb043.jpg.html
		// Миниатюра:   http://radikal.ua/data/upload/49112/0fccf/10003bb043_preview.jpg
		// Изображение: http://radikal.ua/data/upload/49112/0fccf/10003bb043.jpg
		if (стрРеклама.substr(0, 23).toLowerCase() == 'http://radikal.ua/full/' && стрРеклама.substr(-5) == '.html')
		{
			стрИзображение = 'http://radikal.ua/data/upload/' + стрРеклама.slice(23, -5);
		}
		break;

	case 'rghost.ru':
	case 'rghost.net':
		// Ошибка хостинга: всем изображениям присваивается расширение png.
		// Реклама 1:     http://rghost.net/39061180.view
		// Миниатюра 1:   http://rghost.net/39061180/thumb.png
		// Изображение 1: http://rghost.net/39061180/image.png
		// Реклама 2:     http://rghost.net/private/39061318/3f3748afbbe648e78b800daf933db6ca.view
		// Миниатюра 2:   http://rghost.net/private/39061318/3f3748afbbe648e78b800daf933db6ca/thumb.png
		// Изображение 2: http://rghost.net/private/39061318/3f3748afbbe648e78b800daf933db6ca/image.png
		if ((мстрРВ1 = стрРеклама.match(/^(http:\/\/rghost\.(?:ru|net)\/(?:\d+|private\/\d+\/\w+))\.view$/i)) != null)
		{
			стрИзображение = мстрРВ1[1] + '/image.png';
			if (стрМиниатюра == стрИзображение)
			{
				стрИзображение = null;
			}
		}
		break;

	case 'saveimg.ru':
		// Реклама:     http://saveimg.ru/show-image.php?id=30dd28bc089e00dc3762e5d13519672a
		// Миниатюра:   http://saveimg.ru/thumbnails/02-07-12/b66dff0ae0a32aaa8f24e0e8783514a8.PNG
		// Изображение: http://saveimg.ru/pictures/02-07-12/b66dff0ae0a32aaa8f24e0e8783514a8.PNG
		if (стрРеклама.substr(0, 36).toLowerCase() == 'http://saveimg.ru/show-image.php?id='
		&& стрМиниатюра.search(/^http:\/\/saveimg\.ru\/thumbnails\/[^\/]+\/\w+\.[a-z]+$/i) == 0)
		{
			стрИзображение = стрМиниатюра.replace('/thumbnails/', '/pictures/');
		}
		break;

	case 'savepic.ru':
	case 'savepic.su':
	case 'savepic.net':
		// Реклама:     http://savepic.net/3020118.htm
		// Миниатюра:   http://savepic.net/3020118m.png
		// Изображение: http://savepic.net/3020118.png
		if ((мстрРВ1 = стрРеклама.match(/^http:\/\/savepic\.([a-z]+)\/(\w+)\.htm$/i)) != null)
		{
			if ((мстрРВ1 = стрМиниатюра.match(new RegExp('^http://savepic\\.' + мстрРВ1[1] + '/' + мстрРВ1[2] + 'm\\.([a-z]+)$', 'i'))) != null)
			{
				стрИзображение = стрРеклама.slice(0, -3) + мстрРВ1[1];
			}
			else
			{
				// Если расширение не известно, то можно использовать jpg. Но в этом случае
				// при сохранении изображения Chrome будет всегда предлагать расширение jpg
				// вместо реального, что может привести к неприятностям. Некоторые хостинги
				// так же выставляют неправильные расширения.
				стрИзображение = стрРеклама.slice(0, -3) + 'jpg';
			}
		}
		break;

	case 'yandex.ru':
		// Реклама:     http://fotki.yandex.ru/users/ferrariforza/view/520727/
		// Миниатюра:   http://img-fotki.yandex.ru/get/6114/8035363.0/0_7f217_f069716e_S.jpg
		// Изображение: http://img-fotki.yandex.ru/get/6114/8035363.0/0_7f217_f069716e_orig
		if (стрУзел != 'fotki.yandex.ru')
		{
			стрМиниатюра = '';
		}
		else if ((мстрРВ1 = стрРеклама.match(/^http:\/\/fotki\.yandex\.ru\/users\/[^\/]+\/view\/(\d+)\/?$/i)) != null
		&& (мстрРВ2 = стрМиниатюра.match(new RegExp('^(https?://img-fotki\\.yandex\\.ru/get/[^/]+/[^/]+/[0-9a-z]+_' + Number(мстрРВ1[1]).toString(16) + '_[0-9a-z]+_)[^o]+$', 'i'))) != null)
		{
			стрИзображение = мстрРВ2[1] + 'orig';
		}
		break;

	case 'youpic.su':
		// Ошибка хостинга: не создаются миниатюры для изображений с большим разрешением или соотношением сторон 1.
		// Реклама:     http://youpic.su/view.php?id=s002.youpic.su/pictures/1341518400/1cde4ce7c377effd6afaf3b3348fc9b9.jpeg
		// Миниатюра:   http://s002.youpic.su/pictures/1341518400/thumb_1cde4ce7c377effd6afaf3b3348fc9b9.jpeg
		// Изображение: http://s002.youpic.su/pictures/1341518400/1cde4ce7c377effd6afaf3b3348fc9b9.jpeg
		if (стрРеклама.substr(0, 29).toLowerCase() == 'http://youpic.su/view.php?id=')
		{
			стрИзображение = 'http://' + стрРеклама.substr(29);
		}
		break;

	// Проверка referer. 
	case 'fastpic.ru':
	case 'picatom.com':
	// Нельзя узнать прямую ссылку на изображение.
	// fotkidepo.ru
	// picasaweb.google.com
	case 'hostingkartinok.com':
	case 'keep4u.ru':
	case 'imageban.ru':
	case 'imglink.ru':
	case 'postimage.org':
	case 'radikals.ru':
		break;

	// Это не фотохостинг. Не удалять ссылку. 
	default:
		стрМиниатюра = '';
	}

	// Заменить адрес рекламы на адрес изображения.
	if (стрИзображение)
	{
		элСсылка.setAttribute('href', стрИзображение);
	}
	// Удалить лишнюю ссылку на главную страницу хостинга, которую по привычке жмут что бы
	// увидеть полноразмерное изображение. Так же лишняя ссылка мешает одним щелчком
	// отключить масштабирование изображения.
	else if (стрИзображение === null
	|| (стрМиниатюра != '' && (элСсылка.pathname == '' || элСсылка.pathname == '/')))
	{
		элСсылка.removeAttribute('href');
	}
}

function ИзменитьРазмерСпискаПоследнихСообщений()
// Изменяет размер списка с последними сообщениями темы, который находится
// под просматриваемым/редактируемым сообщением.
{
	var элСписок = document.querySelector('div[style="overflow: auto; width: 100%; height: 300px;"]');
	if (элСписок != null)
	{
		// Увеличить высоту окна со списком.
		элСписок.style.height = '500px';
		// Уменьшить ширину первой колонки с никами.
		элСписок.firstElementChild.firstElementChild.firstElementChild.firstElementChild.removeAttribute('width');
	}
}

//
// Смайлики.
//

function ЗаменитьИзображенияСмайликов()
// Заменяет изображение смайликов на всей странице.
// TODO Использовать MutationObserver?
{
	if ((г_фФлаги & ФЛ_СТАРЫЕ_СМАЙЛИКИ) == 0)
	{
		return;
	}

	// querySelectorAll():      730, 105, 340
	// getElementsByTagName(): 1040, 330, 330
	// evaluate():              900, 480, 630
	var сэлИзображения = document.querySelectorAll('img[src^="./images/smilies/"]');
	for (var ы = 0, элИзображение; элИзображение = сэлИзображения[ы]; ++ы)
	{
		// элИзображение.src всегда возвращает абсолютный url и работает медленнее чем
		// getAttribute('src') если в HTML указан относительный url.
		var стрИмяФайла = элИзображение.getAttribute('src').substring(17);
		for (var ю = 0, мСмайлик; мСмайлик = г_мСмайлики[ю]; ++ю)
		{
			if (мСмайлик[0] === стрИмяФайла)
			{
				элИзображение.src = мСмайлик[2];
				элИзображение.width = мСмайлик[3];
				элИзображение.height = мСмайлик[4];
				элИзображение.title = мСмайлик[5]; // Описание.
				элИзображение.alt = мСмайлик[6]; // BBCode.
				break;
			}
		}
	}
}

function ИзменитьСсылкиДляВставкиСмайликов(фОкно, элМама, элКонец)
// Заменяет все ссылки для вставки смайликов.
// Так же вызывает ЗаменитьИзображенияСмайликов().
// фОкно - true если элМама находится во всплывающем окне, иначе в форме редактирования.
// элМама - элемент, в котором находятся ссылки.
// элКонец - элемент, перед которым заканчиваются ссылки. null если в элМама только смайлики.
{
	//
	// Удалить ссылки.
	//
	if (элКонец == null)
	{
		элМама.innerHTML = '';
	}
	else
	{
		while (элМама.firstChild != элКонец)
		{
			элМама.removeChild(элМама.firstChild);
		}
	}

	// Вызвать функцию после удаления, но перед добавлением ссылок, что бы
	// не расходовать зря время на замену их изображений.
	ЗаменитьИзображенияСмайликов();

	//
	// Добавить ссылки.
	//

	var элФрагмент = document.createDocumentFragment();
	var элЯкорь = document.createElement('a');
	var элИзображение = элЯкорь.appendChild(document.createElement('img'));
	элИзображение.setAttribute('class', 'insertsmile-img');

	for (var ы = 0, мСмайлик; мСмайлик = г_мСмайлики[ы]; ++ы)
	{
		if (мСмайлик[1] >= (фОкно ? 1 : 2))
		{
			if (мСмайлик[6]) // BBCode.
			{
				элЯкорь.setAttribute('href', фОкно
					? "javascript:initInsertions(); insert_text('" + мСмайлик[6] + "', true, true); undefined"
					: "javascript:insert_text('" + мСмайлик[6] + "', true); undefined");
				элИзображение.setAttribute('alt', мСмайлик[6]);
			}
			else
			{
				элЯкорь.setAttribute('href', фОкно
					? "javascript:initInsertions(); insert_text('[img]" + мСмайлик[2] + "[/img]', true, true); undefined"
					: "javascript:insert_text('[img]" + мСмайлик[2] + "[/img]', true); undefined");
				элИзображение.setAttribute('alt', мСмайлик[5]);
			}

			элИзображение.setAttribute('src', мСмайлик[2]);
			элИзображение.setAttribute('width', мСмайлик[7] ? мСмайлик[7] : мСмайлик[3]);
			элИзображение.setAttribute('height', мСмайлик[8] ? мСмайлик[8] : мСмайлик[4]);
			элИзображение.setAttribute('title', мСмайлик[5]);

			элФрагмент.appendChild(элЯкорь.cloneNode(true));
		}
	}

	элМама.insertBefore(элФрагмент, элКонец);
}

function ИзменитьСписокВсехСмайликов()
{
	GM_addStyle('\
	/* Расстояние между смайликами */\
	.insertsmile-img {padding: 3px 7px !important}\
	/* Переделать ссылку "Закрыть окно" в кнопку */\
	.nav {\
		display: block !important;\
		line-height: 3.6ex !important;\
		margin-top: -0.4ex !important;\
		border: 1px solid #A9B8C2 !important;\
		font-size: 8.5pt !important;\
		font-weight: normal !important;\
		background-color: #FAFAFA !important;\
		color: #333333 !important;\
		border-radius: 3px !important;\
	}\
	.nav:hover {\
		border-color: #888 !important;\
		color: #000 !important;\
		text-decoration: none !important;\
	}\
	');

	if (г_фФлаги & ФЛ_СТАРЫЕ_СМАЙЛИКИ)
	{
		var элКонец = document.getElementsByTagName('br')[0];
		ИзменитьСсылкиДляВставкиСмайликов(true, элКонец.parentNode, элКонец);
	}
	else
	{
		GM_addStyle('\
		/* Уменьшить расстояние между смайликами */\
		.row1 {font-size: 80% !important}\
		/* Скрыть повторы обычных смайликов */\
		a[onclick^="initInsertions(); insert_text(\':haha:\'"],\
		a[onclick^="initInsertions(); insert_text(\':angry:\'"],\
		a[onclick^="initInsertions(); insert_text(\':on_the_quiet:\'"],\
		a[onclick^="initInsertions(); insert_text(\':rofl:\'"],\
		a[onclick^="initInsertions(); insert_text(\':to_take_umbrage:\'"],\
		a[onclick^="initInsertions(); insert_text(\':tongue:\'"] {\
			display: none !important;\
		}\
		');
	}
}

function ИзменитьСмайликиНаСтраницеИВФормеРедактирования(элФорма, элМама, элКонец)
// Настройка смайликов в форме редактирования сообщения, включая форму быстрого ответа.
// Так же вызывает ЗаменитьИзображенияСмайликов().
{
	if (г_фФлаги & ФЛ_СТАРЫЕ_СМАЙЛИКИ)
	{
		ИзменитьСсылкиДляВставкиСмайликов(false, элМама, элКонец);
	}

	//
	// Настройка ссылки "Еще смайлики".
	//

	var элЕщеСмайлики = элФорма.querySelector('a[href^="./posting.php?mode=smilies"]');

	// В форме быстрого ответа заменить | на пробелы.
	if ((г_фФлаги & ФЛ_СТАРЫЕ_СМАЙЛИКИ) == 0 && элЕщеСмайлики.previousSibling)
	{
		элЕщеСмайлики.previousSibling.nodeValue = '\u00a0';
	}

	// Уменьшить высоту всплывающего окна со смайликами.
	элЕщеСмайлики.setAttribute('onclick', элЕщеСмайлики.getAttribute('onclick')
		.replace('720, 600', (г_фФлаги & ФЛ_СТАРЫЕ_СМАЙЛИКИ) ? '720, 460' : '720, 550'));

	// Заменить текст "Еще смайлики" на изображение.
	элЕщеСмайлики.innerHTML = '<img title="Показать все смайлики" ' + ((г_фФлаги & ФЛ_СТАРЫЕ_СМАЙЛИКИ)
		? 'width="16" height="16" class="insertsmile-img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABwUlEQVR42mPcue/I/xev3zNgAxKiggz45NydbBgZF67c/D8uzAerovSKboaZHaU45URERDThBix/ysDw6jUDw+OvDAyxVgwM+owIA9b12DJ8V4lj+GOTysACVBOtCTcgGm7A3oenGZzlTcGm/wdiRiQXXJdiZNiVwsCgmryR4VKXH0PFVCwGMJoxMsTGFTIYa2syfGOQYah09IQbcOrRZIbpL1oY3lz+yVAscYnBwVsO0wBOuxoGKS0pBgF+NgYBXhaGvTUJcAMm7jdiuMvyieHCmTcMU3xcGfRUV2MaQGYgRjOConHtzmNYFRloKjJcuH4fp9yT15+p4AKYAb1ajAzsTAwML64yMERevsqgraMFN6BtzU6GnzJ2DIz/mRme7prJMLs+F9OADamMDFxcDAznJ7EzWC7yZ7CLXQk3YOWm6QxfFKIZfj29yXBkUjXD0u27MA1Yz8jIwMbBzsDv9Zfhm84fBrfG/3ADAqt2MTy5cIrht7QIw7U5mQy//v/HNGB+VTUD8/9nDN7CWxgylv5nWH3+DdyA+PA6Btmj+xiul1cxfNjQzLB37/HBE422oCTPUNU9TwNIGTGQBh4B8RsAKfT9YiwOol8AAAAASUVORK5CYII="/>'
		: 'width="16" height="23" style="padding: 1px 2px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAXCAYAAAAC9s/ZAAACKklEQVR42t3TXUiTURzH8e/J4UwqjSaMZaaQ0KZUKAaGDit6VSpvjFhaUJJddCEV2RQ1iggtKCtEjKJgxLAX7U0dTCVWgUUOZY0uIlouRhsVvRgz42mP4GNjW1B0ER04nIv//3w4PP/nJ3r7HJLP/55oS5syl1/V1q0qEOKy9bZUUVYStWlPTTNtJw7GrGk0Gv000C9AB43vgnhtbbQ37FOAnjzB+vqGyYuujDKysg1TgEkBBu568JxOoycdUquKaModUIDOSsGWA3AvoYtZ9y0Yy62RgGgUlGuq0eY/ZfucFJZkdijATSEobQdHt4qx7AnWHpEigTP9ObxQfcT5JMC5kjVhwCVzLXHSG4rn3aHKItExFIgE/vAjmoQ8xuu9D6M2LdNn4HS/jFkb9X/6Cy+YAq564a0fXn+B8hWwVEwDN04W8nVRBRMFlahCPSZ9FMD+6jGrF+ZN6lJoi59e4NYJbLshc1cXw02bqDkfBRDLQ2OsqCY3S88YqRxeuUEBBj1nafUdIzASZL92mKLitEhgprEOnUFHclI8ybNV2Ot2KkCsEf9vYzxlEKhngM8F20ZcSuJk4Pi1XoKpRoQUF5bUMEBOXGIiDLWoyb+yWUmcDFhvtfI53cS49zmOllos3bZIQE5cfIKapI3fwxInA6VmG6POQb7N1/Dswl7GpShpjJU4GdixtZ4FD/pwHzLzofModvujf2eMhfIvj7n54uLQkcPvLU9oB34AtKVzY3De80EAAAAASUVORK5CYII="/>');
}

//
// Обработка событий.
//

function ОбработатьВставкуЦитатыИПерейти(обСобытие)
{
	ОбработатьВставкуЦитаты(обСобытие, true);
}

function ОбработатьВставкуЦитаты(обСобытие, фПерейти)
{
	if (window.getSelection().toString() == '')
	{
		window.alert(г_обТекст[0]);
	}
	else
	{
		var элХрень = обСобытие.target.parentNode.parentNode.previousElementSibling.lastElementChild.firstElementChild.firstElementChild.firstElementChild.children;
		// getAttribute('href') не катит, потому что BBCode не поддерживает относительные адреса.
		addquote_keepfocus(элХрень[элХрень.length - 2].firstElementChild.firstElementChild.href,
		обСобытие.target.parentNode.parentNode.previousElementSibling.firstElementChild.lastElementChild.firstElementChild.textContent);

		if (фПерейти)
		{
			var элФорма = document.getElementById('postform');
			// Должна быть видна кнопка для отправки сообщения.
			элФорма.scrollIntoView(false);
			элФорма.getElementsByTagName('textarea')[0].focus();
		}
	}
}

function ОбработатьВставкуНика(обСобытие)
{
	insert_text_keepfocus('[b]' + обСобытие.target.textContent + '[/b] ');
}

//
// Варианты функций editor.js, из которых удалены вызовы focus().
// Так же был выкинут ослячий код и добавлена поддержка XPCNativeWrapper.
// К названиям функций добавлено _keepfocus.
// В addquote_keepfocus() добавлена вставка ссылки на цитируемое сообщение.
//

function mozWrap_keepfocus(txtarea, open, close)
{
	var selLength = txtarea.textLength;
	var selStart = txtarea.selectionStart;
	var selEnd = txtarea.selectionEnd;
	var scrollTop = txtarea.scrollTop;

	if (selEnd == 1 || selEnd == 2)
	{
		selEnd = selLength;
	}

	var s1 = txtarea.value.substring(0, selStart);
	var s2 = txtarea.value.substring(selStart, selEnd);
	var s3 = txtarea.value.substring(selEnd, selLength);

	txtarea.value = s1 + open + s2 + close + s3;
	txtarea.selectionStart = selStart + open.length;
	txtarea.selectionEnd = selEnd + open.length;
	txtarea.scrollTop = scrollTop;
}

function insert_text_keepfocus(text, spaces, popup)
{
	mozWrap_keepfocus(
		(popup ? opener.document : document).forms.namedItem('postform').elements.namedItem('message'),
		spaces ? (' ' + text + ' ') : text,
		''
	);
}

function addquote_keepfocus(post_id, username)
{
	var стрЦитата = window.getSelection().toString().trim();
	if ((г_фФлаги & ФЛ_ССЫЛКА_В_ЦИТАТЕ) == 0)
	{
		// Добавить в заголовок цитаты ник автора цитаты и ссылку на цитируемое сообщение.
		insert_text_keepfocus('[quote="[url=' + post_id + ']' + username + '[/url]"]' + стрЦитата + '[/quote]\r\n');
	}
	else
	{
		// Добавить в заголовок цитаты только ник автора цитаты.
		insert_text_keepfocus('[quote="' + username + '"]' + стрЦитата + '[/quote]\r\n');
	}
}

function ОбщиеИзмененияСайта()
{
	GM_addStyle('\
	/* Увеличить ширину основного текста */\
	#contentplace {max-width: ' + МАКС_ШИРИНА_ТЕКСТА_САЙТА + ' !important; width: auto !important}\
	#wrapper, #hpath {width: auto !important}\
	#leftplace {padding: 0 5px 0 10px !important}\
	#mainplace {padding: 0 10px !important}\
	#rightplace {padding: 0 10px 0 5px !important}\
	/* Увеличить межстрочный интервал основного текста */\
	#fixoldhtml > p {line-height: 130% !important}\
	');
}

function ИзменитьСтатьюИлиНовость()
{
	//
	// Заменить бесполезную ссылку "ссылка на материал" на версию для просмотра.
	//
	var элЯкорь = document.querySelector('h6 > span > a[onclick]');
	элЯкорь.removeAttribute('onclick');
	элЯкорь.pathname = элЯкорь.pathname.replace(/^\/(.+?)\//, '$&print/')
	элЯкорь.search = '?media=screen';
	элЯкорь.style.fontWeight = 'bold';
	элЯкорь.style.color = '#007030';
	элЯкорь.firstChild.nodeValue = 'версия для просмотра';
}

function ИзменитьВерсиюДляПросмотра()
{
	GM_addStyle('\
	html {height: 100% !important; background: #f0f0f0 !important}\
	body {\
		max-width: ' + МАКС_ШИРИНА_ТЕКСТА_САЙТА + ' !important;\
		min-height: 100% !important;\
		margin: 0 auto !important;\
		padding: 0 1em !important;\
		border-left:  1px solid #e0e0e0 !important;\
		border-right: 1px solid #e0e0e0 !important;\
		outline: #ededed solid 3px !important;\
	}\
	body > table {font: inherit !important}\
	/* Шапка и счетчики */\
	body > table > tbody > tr:first-child, #mainplace, #mainplace + hr, body > div[align] {display: none !important}\
	/* Название записи */\
	td[colspan="3"] > h1 {margin-top: -12px !important}\
	/* Увеличить межстрочный интервал основного текста */\
	#fixoldhtml > p {line-height: 130% !important}\
	.gm-for-byeprint-c {padding: 15px 0; text-align: center}\
	/* Серая малозаметная кнопка которая не мешает просмотру */\
	.gm-for-byeprint-a {display: inline-block; padding: .45em .8em; border: .1em solid #aaa; border-radius: 5px; color: #404040; text-decoration: none}\
	/* Стиль кнопок Вперед/Назад в статьях */\
	.gm-for-byeprint-a:hover {background: #004488; border-color: #004488; color: white}\
	');

	// Добавить в конец материала ссылку на возврат в обычный режим.
	// Класс gm-for-byeprint-a помимо своей прямой функции так же запрещает сценарию изменять адрес ссылки.
	// Запрет можно было сделать, запихнув в search адреса произвольный текст, но теоретически такую ссылку
	// могут случайно выложить на форуме, и перейдя по ней владельцы сценария увидят статью в непотребном виде.
	document.body.insertAdjacentHTML('beforeend', '<div class="gm-for-byeprint-c"><a href="'
		+ encodeURI(window.location.pathname.replace('/print/', '/') + '#vote_buttons')
		+ '" class="gm-for-byeprint-a">Оценить и обсудить материал</a></div>');
}

function ОбщиеИзмененияПС()
{
	// Новый значок ПС 16x16x32.
	УстановитьЗначокСтраницы('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACZ0lEQVR42oVTXUiTURh+zn6as2E/Kq3aZmrTLPGmiy6CoJtugq5rEGRCXhSVQRf9aIRRIMlGBF10OyoIjH5EyILyQrNATbISDNesuZZSObc1t+87vd853/dtitCBc75z3vO+z3ne530/tvPOnAtAJ82z4BzFQ5xUWpm2YcJiuHDOQ7S0s4bbiaAILh4M0pEWrodKOyOTCq5qQFw7hlj9rThntKMrqEVPy9BiKrptBUvmD8UIQKJb6Vu93oKGcitKbEzE/c0Df7LiNez12BEeTyO6oLFQBBjb3h3lGken3YIL+8pwsK4UdkLKE81cXua/sdQmXvv2O4dD4TiSWdXIkQBuRgQnT5kVuzatwfBMFi9btqBr4Bd6J9Nwuyzoa/bg9NMEBqYzSC2pQgdDUFbb9UVkDJmHuBg5VYWOF/N49imJrevseH3Ch8CDGIajaSks1yujpVB94zOXAltMtUbP1KK1Z5bYpFFf6UDf8SocuTdDAKnlonKFAK5/1HWVBWNEb+zcDhy9H8X4bAZNm0vwuLkGh8NfCSBpltbUoOrae8GH6fS3lVPAsRocuDuF+EIWTW4nnrT4EQhPYzCSLH5eltF3dUT0gciLQAK7K3B+vxt7ghPIkclf6UR/ax26X8XxcPQnEikFiqr3A7FlvivvpCIE4rBZ8KatET1jc+h8/l2YNVv/yUb4SMzeiXm0PYogm1NMJszb8ZYbB5uVmsjtwtSPRWTyhY7zbXCgYq0NH2KLWFJMd6mB9/JQwZOZXW+WVFdMfo02ZoU75r00FCTf5T+TUZQVfb/KCDHvxUEXIa76O/8vmGb7P91RGuNb/aGuAAAAAElFTkSuQmCC');

	GM_addStyle(' \
	/* Увеличить ширину основного текста */\
	#container {max-width: ' + МАКС_ШИРИНА_ТЕКСТА_ПС + ' !important; width: auto !important} \
	/* Уменьшить межстрочный интервал основного текста */\
	.text {line-height: 140% !important}\
	');
}


function ПоказатьДиалогСНастройками()
// Изменение настроек сценария.
{
	// Диалог с настройками показан?
	if (document.getElementById('gm-for-pref-root') != null)
	{
		return;
	}

	// Используется <form> для обработки клавиши enter.
	var элДиалог = document.createElement('div');
	элДиалог.setAttribute('id', 'gm-for-pref-root');
	элДиалог.innerHTML = '\
	<svg>\
		<filter id="gm-for-blur">\
			<feGaussianBlur stdDeviation="5"/>\
		</filter>\
	</svg>\
	<style>\
		#wrapheader {\
			filter: url(#gm-for-blur);\
		}\
		#gm-for-pref-root {\
			position: fixed;\
			top: 0;\
			left: 0;\
			width: 100%;\
			height: 100%;\
			z-index: 1010;\
			display: table;\
		}\
		#gm-for-pref-dialog {\
			width: 43em;\
			margin: 0 auto;\
			border: 2px solid black;\
			font: 13px/19px Tahoma, Arial, sans-serif;\
			box-shadow: .5em .5em 3em -.8em #404040;\
		}\
		#gm-for-pref-caption {\
			border: 1px solid white;\
			padding: 2px 6px 3px;\
			font-weight: bold;\
			color: white;\
			background: #259000;\
		}\
		#gm-for-pref-client {\
			padding: 5px 6px;\
			color: black;\
			background: #f0f0f0;\
		}\
		#gm-for-pref-group {\
			outline: 1px solid white;\
			border: 1px solid #898C95;\
			padding: 4px 7px;\
			background: white;\
		}\
		.gm-for-pref-checkbox {\
			position: relative;\
			bottom: 1px;\
			width: 13px;\
			height: 13px;\
			vertical-align: middle;\
			margin: 0 5px 0 0;\
		}\
		#gm-for-pref-cancel, #gm-for-pref-ok {\
			float: right;\
			min-width: 6em;\
			margin: 6px 0 1px 5px;\
		}\
		#gm-for-pref-client:after {\
			content: " ";\
			clear: both;\
			display: block;\
		}\
		#gm-for-pref-help {\
			margin: 5px 0 3px;\
			border: 1px solid #C8C8C8;\
			padding: 5px;\
			background: #FFFFDA;\
			color: #202020;\
		}\
		.gm-for-pref-help {\
			display: none;\
			font-size: 12px;\
			line-height: 14px;\
			height: 71px;\
			overflow: auto;\
		}\
		.gm-for-pref-a {\
			text-decoration: underline !important;\
			color: blue !important;\
		}\
		.gm-for-pref-vcenter {\
			display: table-cell;\
			vertical-align: middle;\
		}\
	</style>\
	<div class="gm-for-pref-vcenter">\
		<form action="javascript:">\
			<div id="gm-for-pref-dialog">\
				<div id="gm-for-pref-caption">Настройки сценария «Форум Overclockers.ru»</div>\
				<div id="gm-for-pref-client">\
					<div id="gm-for-pref-group">\
						<label><input' + ( (г_фФлаги & ФЛ_КРУПНЫЕ_ЗНАЧКИ)             ? '' : ' checked') + ' id="gm-for-pref-f00" tabindex="1001" type="checkbox" class="gm-for-pref-checkbox"/>Увеличивать значки для перехода к сообщению</label><br/>\
						<label><input' + ( (г_фФлаги & ФЛ_ССЫЛКА_В_ЦИТАТЕ)            ? '' : ' checked') + ' id="gm-for-pref-f03" tabindex="1002" type="checkbox" class="gm-for-pref-checkbox"/>Добавлять в заголовок цитаты ссылку на цитируемое сообщение</label><br/>\
						<label><input' + (!(г_фФлаги & ФЛ_СТАРЫЕ_СМАЙЛИКИ)            ? '' : ' checked') + ' id="gm-for-pref-f05" tabindex="1003" type="checkbox" class="gm-for-pref-checkbox"/>Использовать старые смайлики</label><br/>\
						<label><input' + (!(г_фФлаги & ФЛ_СКРЫТЬ_СМАЙЛИКИ)            ? '' : ' checked') + ' id="gm-for-pref-f06" tabindex="1004" type="checkbox" class="gm-for-pref-checkbox"/>Скрывать панель со смайликами в форме быстрого ответа</label><br/>\
						<label><input' + ( (г_фФлаги & ФЛ_НЕ_ИСКАТЬ_В_БАРАХОЛКЕ)      ? '' : ' checked') + ' id="gm-for-pref-f07" tabindex="1005" type="checkbox" class="gm-for-pref-checkbox"/>Не искать темы в барахолке</label><br/>\
						<label><input' + ( (г_фФлаги & ФЛ_НЕ_ИСКАТЬ_СТАРЫЕ_СООБЩЕНИЯ) ? '' : ' checked') + ' id="gm-for-pref-f08" tabindex="1006" type="checkbox" class="gm-for-pref-checkbox"/>Не искать темы, в которые вы давно не писали</label><br/>\
						<label><input' + ( (г_фФлаги & ФЛ_ССЫЛКИ_НА_ФОТОХОСТИНГИ)     ? '' : ' checked') + ' id="gm-for-pref-f09" tabindex="1007" type="checkbox" class="gm-for-pref-checkbox"/>«Улучшать» ссылки на избражение</label><br/>\
						<label><input' + (!(г_фФлаги & ФЛ_ВЕРСИЯ_ДЛЯ_ПРОСМОТРА)       ? '' : ' checked') + ' id="gm-for-pref-f10" tabindex="1008" type="checkbox" class="gm-for-pref-checkbox"/>Показывать статьи и новости в более удобном для чтения виде</label>\
						<div id="gm-for-pref-help">\
							<div class="gm-for-pref-help" style="display: block">Настройку автообновления, а так же текущую версию сценария и ссылку на его домашнюю страницу, вы найдете в списке установленных сценариев Greasemonkey или Scriptish (Ctrl+Shift+A).</div>\
							<div class="gm-for-pref-help" id="gm-for-pref-f00-help">Увеличивать изображения для перехода к первому непрочитанному сообщению и для перехода к последнему сообщению.</div>\
							<div class="gm-for-pref-help" id="gm-for-pref-f03-help">Облегчает поиск исходного сообщения во время чтения темы.</div>\
							<div class="gm-for-pref-help" id="gm-for-pref-f05-help">• В просматриваемых сообщениях менять колобки на старые маленькие смайлики.<br/>• В форме быстрого ответа кнопки будут вставлять старые смайлики.<br/>• Уменьшить и <q>подстричь</q> часть оставшихся колобков.</div>\
							<div class="gm-for-pref-help" id="gm-for-pref-f06-help">Не запоминать состояние панели со смайликами в форме быстрого ответа, т.е. после загрузки страницы она всегда будет скрыта. Используйте эту настройку если ваш оборзеватель тормозит при показе большого количества анимированных изображений, или вы редко пользуется смайликами и не хотите что бы они лишний раз мелькали перед глазами.</div>\
							<div class="gm-for-pref-help" id="gm-for-pref-f07-help">В списке найденных тем (Ваши сообщения, Новые сообщения, Непрочитанные сообщения и т.д.) скрывать темы, которые находятся в подфорумах барахолки (Покупка, Продажа и т.д.). На результаты поиска сообщений эта настройка не влияет.</div>\
							<div class="gm-for-pref-help" id="gm-for-pref-f08-help">Если флажок установлен, то ссылка <q>Ваши сообщения</q> будет искать только те темы, в которые вы писали последние полгода. В таком варианте <q>Ваши сообщения</q> можно использовать вместо <q>Закладок</q>.</div>\
							<div class="gm-for-pref-help" id="gm-for-pref-f09-help">Фотохостинги для просмотра изображений дают ссылки на страницы, засранные рекламой чуть менее чем полностью. Если флажок установлен, то ссылки в сообщениях по возможности будут изменены так, что бы указывать непосредственно на изображение. Это значительно ускорит просмотр и сбережет ваши нервы. К сожалению, не все ссылки можно улучшить, чаще всего только те, которые содержат миниатюру изображения (превьюшку). Так же, эта настройка удаляет лишние ссылки, которые ведут на главную страницу фотохостинга. Проверить работу настройки можно <a href="http://forums.overclockers.ru/viewtopic.php?p=9825163#p9825163" class="gm-for-pref-a" target="_blank">здесь</a>.</div>\
							<div class="gm-for-pref-help" id="gm-for-pref-f10-help">Если флажок установлен, то статьи и новости станут открываться в <a href="http://img-fotki.yandex.ru/get/9831/8035363.1/0_c9d5e_ae58af90_orig" target="_blank">более удобном для чтения виде</a>. В конец текста добавлена кнопка для возврата в обычный режим просмотра для того, что бы оценить материал и добавить комментарий.<br/><br/>Даже если флажок снят, щелчок по изображению слева от названия статьи на <a href="http://www.overclockers.ru/" target="_blank">главной странице сайта</a> откроет версию для просмотра. Этот вариант подойдет тем, кто любит читать срачь в комментариях к новостям, но в то же время хочет читать статьи в удобном виде, а не разбитую на 100500 частей. Так же в статьях бесполезная <q>ссылка на материал</q> была заменена на <q>версию для просмотра</q> веселенького зеленого цвета.</div>\
						</div>\
					</div>\
					<button id="gm-for-pref-cancel" type="button" tabindex="1052">Отмена</button>\
					<button id="gm-for-pref-ok" type="submit" tabindex="1051" title="Изменения вступят в силу после загрузки страницы форума">OK</button>\
				</div>\
			</div>\
		</form>\
	</div>\
	';
	ВставитьВНачалоСтраницы(элДиалог);

	// Показать контекстную справку.
	элДиалог.addEventListener('mouseover', function(обСобытие)
	{
		var элМетка = обСобытие.target;
		if (элМетка.nodeName != 'LABEL')
		{
			элМетка = элМетка.parentNode;
			if (элМетка.nodeName != 'LABEL')
			{
				return;
			}
		}
		var стрИдентификатор = элМетка.getElementsByTagName('input')[0].getAttribute('id') + '-help';
		var сэлСправка = элДиалог.getElementsByClassName('gm-for-pref-help');
		for (var ы = 0, элСправка; элСправка = сэлСправка[ы]; ++ы)
		{
			элСправка.setAttribute('style', элСправка.getAttribute('id') == стрИдентификатор ? 'display:block' : '');
		}
	}, false);

	// Сохранить настройки и закрыть диалог.
	элДиалог.addEventListener('submit', function()
	{
		GM_setValue('FOR_PrefFlags', г_фФлаги = 0
			| ( document.getElementById('gm-for-pref-f00').checked ? 0 : ФЛ_КРУПНЫЕ_ЗНАЧКИ)
			| ( document.getElementById('gm-for-pref-f03').checked ? 0 : ФЛ_ССЫЛКА_В_ЦИТАТЕ)
			| (!document.getElementById('gm-for-pref-f05').checked ? 0 : ФЛ_СТАРЫЕ_СМАЙЛИКИ)
			| (!document.getElementById('gm-for-pref-f06').checked ? 0 : ФЛ_СКРЫТЬ_СМАЙЛИКИ)
			| ( document.getElementById('gm-for-pref-f07').checked ? 0 : ФЛ_НЕ_ИСКАТЬ_В_БАРАХОЛКЕ)
			| ( document.getElementById('gm-for-pref-f08').checked ? 0 : ФЛ_НЕ_ИСКАТЬ_СТАРЫЕ_СООБЩЕНИЯ)
			| ( document.getElementById('gm-for-pref-f09').checked ? 0 : ФЛ_ССЫЛКИ_НА_ФОТОХОСТИНГИ)
			| (!document.getElementById('gm-for-pref-f10').checked ? 0 : ФЛ_ВЕРСИЯ_ДЛЯ_ПРОСМОТРА)
		);
		ЗакрытьДиалог();
	}, false);

	// Закрыть диалог кнопкой Esc.
	document.addEventListener('keydown', ОбработатьНажатиеEsc, false);
	document.getElementById('gm-for-pref-cancel').addEventListener('click', ЗакрытьДиалог, false);
	document.getElementById('gm-for-pref-ok').focus();

	function ОбработатьНажатиеEsc(обСобытие)
	{
		if (!обСобытие.ctrlKey && !обСобытие.shiftKey && !обСобытие.altKey && !обСобытие.metaKey && обСобытие.keyCode == 27)
		{
			ЗакрытьДиалог();
		}
	}

	function ЗакрытьДиалог()
	{
		document.removeEventListener('keydown', ОбработатьНажатиеEsc, false);
		элДиалог.parentNode.removeChild(элДиалог);
	}
}


function ПоказатьУведомление(лОшибка, стрОписание, стрТекст)
// Показывает уведомление в верхней части экрана.
// Показанное в данный момент уведомление удаляется.
// лОшибка - уведомление об ошибке?
// стрОписание - описание уведомления. Без кавычек и HTML тегов.
// стрТекст - HTML содержимое уведомления.
{
	if (!ПоказатьУведомление.фСтильДобавлен)
	{
		// Свойство функции, сохраняющее значение между вызовами.
		ПоказатьУведомление.фСтильДобавлен = true;
		GM_addStyle('\
		.gm-for-np-normal {\
			position: fixed;\
			bottom: 0;\
			left: 0;\
			right: 0;\
			z-index: 1020;\
			border-top: 1px solid #606060;\
			padding: 6px 4px 4px 6px;\
			font: 13px/15px Arial, sans-serif;\
			color: black;\
			background: #ffffa0;\
			box-shadow: 0 0 .5em rgba(0,0,0,.3);\
		}\
		#gm-for-np-root:not(.gm-for-np-normal) {\
			position: fixed;\
			z-index: 1020;\
			border: 1px solid #606060;\
			padding: 1px 2px;\
			line-height: 0;\
			background: #ffffa0;\
			cursor: pointer;\
		}\
		.gm-for-np-bottom {\
			bottom: 0;\
			left: 49%;\
			border-bottom: none !important;\
			border-radius: 6px 6px 0 0;\
			box-shadow: 0 3px 6px rgba(0,0,0,.3);\
		}\
		.gm-for-np-left {\
			top: 80%;\
			left: 0;\
			border-left: none !important;\
			border-radius: 0 6px 6px 0;\
			box-shadow: 1px 1px 5px rgba(0,0,0,.25);\
		}\
		#gm-for-np-icon {\
			width:  32px;\
			height: 32px;\
		}\
		:not(.gm-for-np-normal) > #gm-for-np-content,\
		.gm-for-np-normal > #gm-for-np-icon {\
			display: none;\
		}\
		#gm-for-np-close {\
			float: right;\
			margin: -1px 0 0 6px;\
			border-radius: 4px;\
			padding: 2px 3px;\
			font: bold 19px/12px Arial, sans-serif;\
			color: white;\
			background-color: #ff1010;\
			cursor: pointer;\
		}\
		.gm-for-np-list {\
			margin: .4em 0 !important;\
			padding-left: 1.5em !important;\
		}\
		.gm-for-np-scrollablelist1 {\
			margin: .4em 0;\
			border: 1px solid gray;\
			max-height: 300px;\
			overflow: auto;\
			direction: rtl;\
			background-color: #ffffec;\
		}\
		.gm-for-np-scrollablelist2 {\
			margin: 0 0 0 1.3em !important;\
			padding: .3em !important;\
			direction: ltr !important;\
		}\
		.gm-for-np-scrollablecode1 {\
			margin: .2em 0;\
			border: 1px dashed black;\
			max-height: 300px;\
			overflow: auto;\
			direction: rtl;\
			font-style: italic;\
			background-color: #ffffec;\
		}\
		.gm-for-np-scrollablecode2 {\
			padding: .5em;\
			direction: ltr;\
		}\
		.gm-for-np-a, .gm-for-np-a:hover {\
			text-decoration: underline !important;\
			font-weight: normal !important;\
			color: #0022b0 !important;\
		}\
		.gm-for-np-buttons {\
			margin-top: .8ex !important;\
		}\
		.gm-for-np-button {\
			padding: .15em .3em !important;\
			line-height: 2em !important;\
			border: 1px solid rgb(169,184,194) !important;\
			text-decoration: none !important;\
			color: #333333 !important;\
			background-color: #fafafa !important;\
		}\
		.gm-for-np-button:hover {\
			color: #000 !important;\
			border-color: #777 !important;\
		}\
		.gm-for-np-def-button {\
			font-weight: bold !important;\
		}\
		');
	}
	УдалитьУведомление();
	// Значки из набора Human-O2 http://schollidesign.deviantart.com/art/Human-O2-Iconset-105344123
	// Значок уведомления 64х64 уменьшается до 32х32. Это улучшит качество изображения при
	// увеличении масштаба страницы. Значки весят достаточно много и используются редко,
	// поэтому хранятся в отдельном файле.
	var стрЗначок = GM_getResourceURL(лОшибка ? 'error' : 'info');
	document.body.insertAdjacentHTML('afterbegin', '<div id="gm-for-np-root" class="'
		+ (лОшибка && window.location.hostname != 'www.overclockers.ru' ? 'gm-for-np-left' : 'gm-for-np-bottom')
		+ '"><img id="gm-for-np-icon" alt="Уведомление" src="' + стрЗначок
		+ '" title="' + стрОписание + '"></img><div id="gm-for-np-content">'
		+ '<div id="gm-for-np-close" title="Закрыть это уведомление">×</div>'
		+ стрТекст
		+ '</div></div>');
	// Firefox 17: если повесить разворачивание уведомления на click, то после отпускания кнопки весь
	// текст уведомления будет выделен. Остальные оборзеватели, включая Firefox 10, такого себе не позволяют.
	document.getElementById('gm-for-np-root').addEventListener('mousedown', ОбработатьРазворачиваниеУведомления, true);
}

function ОбработатьРазворачиваниеУведомления(обСобытие)
{
	if (обСобытие.button == 0)
	{
		// Отключить режим выделения текста.
		обСобытие.preventDefault();
		обСобытие.stopPropagation();
		обСобытие.currentTarget.removeEventListener('mousedown', ОбработатьРазворачиваниеУведомления, true);
		обСобытие.currentTarget.setAttribute('class', 'gm-for-np-normal');
	}
}

function УдалитьУведомление()
// Удаляет уведомление добавленное с помощью ПоказатьУведомление().
// Функция может использоваться в качестве обработчика события.
{
	var элУведомление = document.getElementById('gm-for-np-root');
	if (элУведомление != null)
	{
		элУведомление.parentNode.removeChild(элУведомление);
	}
}

function ОбработатьИсключение(обИсключение)
{
	ПоказатьУведомление(true,
	'Во время работы сценария «Форум Overclockers.ru» произошла ошибка. Щелкните здесь для получения дополнительной информации.',
	'Во время работы <a href="http://userscripts.org/scripts/show/95593" target="_blank" class="gm-for-np-a" title="Домашняя страница сценария">сценария «Форум Overclockers.ru»</a> версии ' + HTMLSpecialChars(ВЕРСИЯ_СЦЕНАРИЯ) + ' произошла ошибка. Попробуйте вручную обновить сценарий до последней версии, возможно проблема уже решена. Последняя версия сценария и инструкция по обновлению находятся по ссылке выше. Так же ошибка может быть вызвана некорректной работой вашего блокировщика рекламы. Попробуйте его обновить или отключить. Если не помогло, то, пожалуйста, оставьте в <a href="http://forums.overclockers.ru/viewtopic.php?f=14&amp;t=370722" target="_blank" class="gm-for-np-a">теме обсуждения сценария</a> следующую информацию:\
	<ol class="gm-for-np-list">\
	<li>Опишите ваши действия, которые привели к появлению ошибки.</li>\
	<li>Скопируйте в сообщение этот текст:'
	+ '<div class="gm-for-np-scrollablecode1"><div class="gm-for-np-scrollablecode2">[spoiler=][code]'
	+ '<br/>Версия сценария: ' + HTMLSpecialChars(ВЕРСИЯ_СЦЕНАРИЯ)
	+ '<br/>Обозреватель: ' + HTMLSpecialChars(window.navigator.userAgent)
	+ '<br/>Расширение: ' + HTMLSpecialChars(typeof GM_info == 'object' ? 'Greasemonkey ' + GM_info.version + ' (автообновление=' + GM_info.scriptWillUpdate + ')' : (typeof GM_updatingEnabled == 'boolean' ? 'Scriptish' : '???'))
	+ '<br/>Адрес: ' + HTMLSpecialChars(window.location.href)
	+ '<br/>Описание ошибки: ' + HTMLSpecialChars(обИсключение)
	+ '<br/>Стек: ' + HTMLSpecialChars(обИсключение.stack)
	+ '<br/>[/code][/spoiler]</div></div></li>\
	<li>Предоставьте исходный код страницы с ошибкой. Для этого нажмите Ctrl+U, закиньте появившийся текст на общедоступный сайт, например <a href="http://pastebin.com/" target="_blank" class="gm-for-np-a">сюда</a> или <a href="http://www.slil.ru/" target="_blank" class="gm-for-np-a">сюда</a>, и скопируйте в сообщение полученную ссылку.</li>\
	</ol>\
	');
	
	document.getElementById('gm-for-np-close').addEventListener('click', УдалитьУведомление, false);
}

function ПоказатьИсториюИзменений(стрПредыдущаяВерсия)
// Показать уведомление с историей изменений сценария.
{
	//
	// Выделить историю изменений сценария.
	//
	var стрПредыдущая = ПолучитьВерсиюДляСравнения(стрПредыдущаяВерсия);
	var стрТекущая = ПолучитьВерсиюДляСравнения(ВЕРСИЯ_СЦЕНАРИЯ);
	var стрИсторияИзменений = '';
	for (var ы = 0, стрВерсия; стрВерсия = ИСТОРИЯ_ИЗМЕНЕНИЙ[ы]; ы += 2)
	{
		стрВерсия = ПолучитьВерсиюДляСравнения(стрВерсия);
		if (стрВерсия > стрПредыдущая && стрВерсия <= стрТекущая)
		{
			стрИсторияИзменений += '<li>' + HTMLSpecialChars(ИСТОРИЯ_ИЗМЕНЕНИЙ[ы + 1]) + '</li>';
		}
	}

	//
	// Не показывать уведомление если в новой версии нет важных изменений
	// или был произведен переход на более старую версию.
	//
	if (стрИсторияИзменений == '')
	{
		GM_setValue('FOR_AUVersion', ВЕРСИЯ_СЦЕНАРИЯ);
		return;
	}

	ПоказатьУведомление(false,
		'Сценарий «Форум Overclockers.ru» был обновлен. Щелкните здесь для просмотра основных изменений.',
		'<a href="http://forums.overclockers.ru/viewtopic.php?f=14&amp;t=370722" class="gm-for-np-a" target="_blank" title="Тема на форуме Overclockers.ru с обсуждением сценария">Сценарий «Форум Overclockers.ru»</a> был обновлен с версии <b>' + HTMLSpecialChars(стрПредыдущаяВерсия) + '</b> до <b>' + HTMLSpecialChars(ВЕРСИЯ_СЦЕНАРИЯ) + '</b>. Основные <a href="http://userscripts.org/scripts/show/95593" class="gm-for-np-a" target="_blank" title="Домашняя страница сценария с более подробной информацией">изменения</a>:<div class="gm-for-np-scrollablelist1"><ul class="gm-for-np-scrollablelist2">' + стрИсторияИзменений + '</ul></div>');

	document.getElementById('gm-for-np-close').addEventListener('click', function()
	{
		// Не показывать уведомление до смены версии.
		GM_setValue('FOR_AUVersion', ВЕРСИЯ_СЦЕНАРИЯ);
		УдалитьУведомление();
	}, false);
}

function ПолучитьВерсиюДляСравнения(стрВерсия)
// Возвращает строку пригодную для использования в операторе сравнения.
{
	var мстрЧасти = /^(\d+)(?:\.(\d+))?(?:\.(\d+))?(?:\.(\d+))?/.exec(стрВерсия);
	var стрНули = '0000000000';
	return (стрНули + мстрЧасти[1]).substr(-10)
		+ (мстрЧасти[2] ? (стрНули + мстрЧасти[2]).substr(-10) : стрНули)
		+ (мстрЧасти[3] ? (стрНули + мстрЧасти[3]).substr(-10) : стрНули)
		+ (мстрЧасти[4] ? (стрНули + мстрЧасти[4]).substr(-10) : стрНули);
}

