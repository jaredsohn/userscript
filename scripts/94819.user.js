// =============================================================================
// EchoRating.user.js
//
// Пользовательский скрипт GreaseMonkey (http://greasemonkey.mozdev.org/),
// для интерактивного взаимодействия с ресурсом echo.msk.ru.
//
// Основные функции:
// + Правка верстки сайта
// + Все комментарии отображаются на первой странице обсуждения
// + Возможность вести индивидуальный рейтинг авторов сообщений
// + Автоматическое скрытие сообщений с рейтингом -10
// + Автоматическое скрытие веток с рейтингом ниже -10
// + Возможность вручную скрывать / показывать отдельные сообщения и целые ветки
// + Возможность автоматической подсветки сообщений отдельных авторов цветом
// + Возможность устанавливать индивидуальные метки авторам
// Особенности:
// + Рейтинг ведется на компьютере пользователя.
//   При работе с другого компьютера рейтинг не сохраняется.

// История:
//   17-01-2011  Первая редакция.
//   31-01-2011  + панель управления; импорт/экспорт настроек; кнопка Бан
// =============================================================================

// ==UserScript==
// @name rating.echo.msk.ru forum filter
// @description echo.msk.ru forum reader's interactive assistance.
// @namespace EchoMsk
// @include http://echo.msk.ru/*
// @include http://www.echo.msk.ru/*
// ==/UserScript==

var hideLimit = -10;// Рейтинг участника, при котором его сообщения автоматически скрываются
                    // При рейтинге ниже указанного - скрываются ветки

// Так как localStorage привязан к URL,
// приходится перенаправлять http://echo.msk.ru/ на http://www.echo.msk.ru/
if(document.URL.search('http:\/\/www\.echo\.msk\.ru\/')<0)
  window.location = document.URL.replace('http:\/\/echo\.msk\.ru\/','http:\/\/www\.echo\.msk\.ru\/');

gmInjectCSS();      // Добавить таблицу стилей
gmInjectJS();       // Добавить функции интерактивного взаимодействия
gmAddPanel();       // Добавить панель управления
gmLoadSettings();   // Загрузить пользовательские настройки

if(document.URL.search('echo\.msk\.ru\/users\/')>0) {
  gmUpdateInfo();   // Обновить данные при посещении персональной страницы участника форума
} else {
  gmSignature();    // Добавить подпись
  gmFixLayout();    // Править верстку сайта
  gmAllInOne();     // Отображать все комментарии на первой странице
  gmAddCtl();       // Добавить органы управления
  gmAddInfo();      // Добавить данные об участниках форума
  gmPos();          // Позиционировать документ после всех изменений
}

// Процедуры
// =============================================================================
function gmAddPanel() {
  var oPanel = document.createElement('div');
  oPanel.id = 'add_rating_panel';
//  oPanel.className = 'add_rating_panel';
  oPanel.innerHTML = 
    '<b>\u041F\u0430\u043D\u0435\u043B\u044C \u0443\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F <a href="http://userscripts.org/scripts/show/94819" target="blank" title="\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0441\u043A\u0440\u0438\u043F\u0442\u0430 \u0432 \u043D\u043E\u0432\u043E\u0439 \u0432\u043A\u043B\u0430\u0434\u043A\u0435">rating.echo.msk.ru</a>:</b><br />'+
    '<table style="empty-cells:show; border:1px solid blue;">'+
    '<tr>'+
    '<td style="width:1em"></td>'+
    '<td style="width:0.75em"></td><td style="width:5px"></td><td style="width:0.75em"></td>'+
    '<td style="width:0.75em"></td><td style="width:5px"></td><td style="width:0.75em"></td>'+
    '<td style="width:0.75em"></td><td style="width:5px"></td><td style="width:0.75em"></td>'+
    '<td style="width:0.3em"></td><td style="width:5px"></td><td style="width:0.3em"></td>'+
    '<td style="width:0.1em"></td><td style="width:5px"></td><td style="width:0.1em"></td>'+
    '<td style="width:0.3em"></td><td style="width:5px"></td><td style="width:0.3em"></td>'+
    '<td style="width:0.8em"></td><td style="width:5px"></td><td style="width:0.8em"></td>'+
    '<td style="width:0.75em"></td><td style="width:5px"></td><td style="width:0.75em"></td>'+
    '<td style="width:2.5em"></td><td style="width:5px"></td><td style="width:2.5em"></td>'+
    '<td style="width:4.5em"></td><td style="width:5px"></td><td style="width:4.5em"></td>'+
    '<td></td>'+
    '</tr>'+
    '<tr>'+
    '<td><img src="http://www.echo.msk.ru/img/sys/person.gif" /></td>'+
    '<td colspan="3"><span class="add_rating_control">\u00A0\u2718\u2709\u00A0</span></td>'+
    '<td colspan="3"><span class="add_rating_control">\u00A0\u2718\u21B3\u00A0</span></td>'+
    '<td colspan="3"><span class="add_rating_control" style="color:red;">\u00A0\u0411\u0430\u043D\u00A0</span></td>'+
    '<td colspan="3"><span class="add_rating_control">\u00A0\u2013\u00A0</span></td>'+
    '<td colspan="3"><span class="add_rating_info">0</span></td>'+
    '<td colspan="3"><span class="add_rating_control">\u00A0+\u00A0</span></td>'+
    '<td colspan="3"><input type="text" class="add_tag" /></td>'+
    '<td colspan="3"><select class="add_tag" style="margin:2px"></select></td>'+
    '<td colspan="3"><span style="text-decoration:underline;">user_name</span></td>'+
    '<td colspan="3"><span class="add_rating_info">\u0418\u043C\u044F \u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F</span></td>'+
    '<td align="right" valign="top"><sup><a href="http://userscripts.org/scripts/source/94819.user.js" title="\u041F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435">\u0412\u0435\u0440\u0441\u0438\u044F 1.1</a></sup></td>'+
    '</tr>'+
    '<tr>'+
    '<td rowspan="20" colspan="2"></td><td rowspan="19" style="border:1px solid grey; border-style:none none solid solid;"></td>'+
    '<td rowspan="18" colspan="2"></td><td rowspan="17" style="border:1px solid grey; border-style:none none solid solid;"></td>'+
    '<td rowspan="16" colspan="2"></td><td rowspan="15" style="border:1px solid grey; border-style:none none solid solid;"></td>'+
    '<td rowspan="14" colspan="2"></td><td rowspan="13" style="border:1px solid grey; border-style:none none solid solid;"></td>'+
    '<td rowspan="12" colspan="2"></td><td rowspan="11" style="border:1px solid grey; border-style:none none solid solid;"></td>'+
    '<td rowspan="10" colspan="2"></td><td rowspan="9"  style="border:1px solid grey; border-style:none none solid solid;"></td>'+
    '<td rowspan="8"  colspan="2"></td><td rowspan="7"  style="border:1px solid grey; border-style:none none solid solid;"></td>'+
    '<td rowspan="6"  colspan="2"></td><td rowspan="5"  style="border:1px solid grey; border-style:none none solid solid;"></td>'+
    '<td rowspan="4"  colspan="2"></td><td rowspan="3"  style="border:1px solid grey; border-style:none none solid solid;"></td>'+
    '<td rowspan="2"  colspan="2"></td><td rowspan="1"  style="border:1px solid grey; border-style:none none solid solid;"></td>'+
    '<td rowspan="2"  colspan="2" style="padding:5px;"><input type="checkbox" id="add_rating_info_name" value="hide" checked="checked" title="\u041F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C" /> \u0418\u043C\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F \u0438\u0437 \u0434\u0430\u043D\u043D\u044B\u0445 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438</td>'+
    '</tr>'+
    '<tr><td style="height:0.75em;"></td></tr>'+
    '<tr>'+
    '<td rowspan="2" colspan="5" style="padding:5px;">\u041E\u0440\u0438\u0433\u0438\u043D\u0430\u043B\u044C\u043D\u0430\u044F \u0441\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044E \u043E \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435</td>'+
    '</tr>'+
    '<tr><td style="height:0.75em;"></td></tr>'+
    '<tr>'+
    '<td rowspan="2" colspan="8" style="padding:5px;"><input type="checkbox" id="add_rating_info_color" value="hide" checked="checked" title="\u041F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C" /> \u0412\u044B\u0431\u043E\u0440 \u0446\u0432\u0435\u0442\u0430 \u043F\u043E\u0434\u0441\u0432\u0435\u0442\u043A\u0438 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0439 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F</td>'+
    '</tr>'+
    '<tr><td style="height:0.75em;"></td></tr>'+
    '<tr>'+
    '<td rowspan="2" colspan="11" style="padding:5px;"><input type="checkbox" id="add_rating_info_tag" value="hide" checked="checked" title="\u041F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C" /> \u041C\u0435\u0442\u043A\u0430 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F - \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u043B\u044C\u043D\u044B\u0439 \u0442\u0435\u043A\u0441\u0442</td>'+
    '</tr>'+
    '<tr><td style="height:0.75em;"></td></tr>'+
    '<tr>'+
    '<td rowspan="2" colspan="14" style="padding:5px;">\u0423\u0432\u0435\u043B\u0438\u0447\u0438\u0442\u044C \u043D\u0430 1 \u0440\u0435\u0439\u0442\u0438\u043D\u0433 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F</td>'+
    '</tr>'+
    '<tr><td style="height:0.75em;"></td></tr>'+
    '<tr>'+
    '<td rowspan="2" colspan="17" style="padding:5px;">\u0422\u0435\u043A\u0443\u0449\u0438\u0439 \u0440\u0435\u0439\u0442\u0438\u043D\u0433 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F.<br />\u041F\u0440\u0438 \u0440\u0435\u0439\u0442\u0438\u043D\u0433\u0435 '+hideLimit.toString()+' \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438 \u0441\u043A\u0440\u044B\u0432\u0430\u044E\u0442\u0441\u044F.<br />\u041F\u0440\u0438 \u0440\u0435\u0439\u0442\u0438\u043D\u0433\u0435 '+(hideLimit-1).toString()+' \u0432\u0435\u0442\u043A\u0438 \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438 \u0441\u043A\u0440\u044B\u0432\u0430\u044E\u0442\u0441\u044F.</td>'+
    '</tr>'+
    '<tr><td style="height:2em;"></td></tr>'+
    '<tr>'+
    '<td rowspan="2" colspan="20" style="padding:5px;">\u0423\u043C\u0435\u043D\u044C\u0448\u0438\u0442\u044C \u043D\u0430 1 \u0440\u0435\u0439\u0442\u0438\u043D\u0433 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F</td>'+
    '</tr>'+
    '<tr><td style="height:0.75em;"></td></tr>'+
    '<tr>'+
    '<td rowspan="2" colspan="23" style="padding:5px;">\u0421\u043D\u0438\u0437\u0438\u0442\u044C \u0440\u0435\u0439\u0442\u0438\u043D\u0433 \u0430\u0432\u0442\u043E\u0440\u0430 \u0442\u0430\u043A, \u0447\u0442\u043E\u0431\u044B \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438 \u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0435\u0433\u043E <select id="add_filter_ban_value"><option value="'+hideLimit.toString()+'">\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F</option><option value="'+(hideLimit-1).toString()+'" selected="selected">\u0412\u0435\u0442\u043A\u0438</option></select></td>'+
    '</tr>'+
    '<tr><td style="height:1em;"></td></tr>'+
    '<tr>'+
    '<td rowspan="2" colspan="26" style="padding:5px;">\u0421\u043A\u0440\u044B\u0442\u044C \u0432\u0435\u0442\u043A\u0443 \u0432\u0440\u0443\u0447\u043D\u0443\u044E</td>'+
    '</tr>'+
    '<tr><td style="height:0.75em;"></td></tr>'+
    '<tr>'+
    '<td rowspan="2" colspan="29" style="padding:5px;">\u0421\u043A\u0440\u044B\u0442\u044C \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u0432\u0440\u0443\u0447\u043D\u0443\u044E</td>'+
    '</tr>'+
    '<tr><td style="height:0.75em;"></td></tr>'+
    '<tr>'+
    '<td colspan="32" style="padding:10px;"><input type="checkbox" id="add_rating_load_all" checked="checked" value="layout" /> \u041E\u0442\u043E\u0431\u0440\u0430\u0436\u0430\u0442\u044C \u0432\u0441\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0435\u0432 \u043D\u0430 \u043F\u0435\u0440\u0432\u043E\u0439.</td>'+
    '</tr>'+
    '<tr>'+
    '<td colspan="32" style="padding:10px; display:none;"><input type="checkbox" id="add_rating_sort" value="sort" /> \u0421\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432\u0435\u0442\u043A\u0438 \u043F\u043E \u0441\u0443\u043C\u043C\u0430\u0440\u043D\u043E\u043C\u0443 \u0440\u0435\u0439\u0442\u0438\u043D\u0433\u0443 \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u043E\u0432.<br />\u00A0\u00A0\u00A0<input type="checkbox" id="add_rating_sort_plus" checked="checked" value="plus" /> \u0423\u0447\u0438\u0442\u044B\u0432\u0430\u0442\u044C \u0442\u043E\u043B\u044C\u043A\u043E \u043F\u043E\u043B\u043E\u0436\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0439 \u0440\u0435\u0439\u0442\u0438\u043D\u0433.</td>'+
    '</tr>'+
    '<tr>'+
    '<td colspan="32" style="padding:10px;"><input type="checkbox" id="add_rating_layout" checked="checked" value="layout" /> \u041F\u0440\u0430\u0432\u0438\u0442\u044C \u0432\u0435\u0440\u0441\u0442\u043A\u0443 \u0441\u0430\u0439\u0442\u0430.</td>'+
    '</tr>'+
    '<tr>'+
    '<td colspan="32" style="padding:0px 0px 0px 10px;"><strong>\u0422\u0435\u043A\u0441\u0442 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043A:</strong></td>'+
    '</tr>'+
    '</tr>'+
    '<tr>'+
    '<td colspan="25" rowspan="3" style="padding:10px;"><textarea id="add_rating_export" rows="10" cols="56" style="font-size:0.7em; font-name:fixed;"></textarea></td>'+
    '<td colspan="3" style="padding:10px;"><div class="add_rating_control" onclick="iRatingExport();">\u042D\u043A\u0441\u043F\u043E\u0440\u0442</div></td>'+
    '<td colspan="4" style="font-size:0.85em">\u041A\u043E\u043C\u0430\u043D\u0434\u0430 \u042D\u043A\u0441\u043F\u043E\u0440\u0442 \u043F\u043E\u043C\u0435\u0441\u0442\u0438\u0442 \u0432 \u043E\u043A\u043D\u043E \u0442\u0435\u043A\u0441\u0442 \u0442\u0435\u043A\u0443\u0449\u0438\u0445 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043A \u0438 \u0440\u0435\u0439\u0442\u0438\u043D\u0433\u043E\u0432. \u0412\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0435\u0433\u043E \u0432 \u0444\u0430\u0439\u043B, \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u043F\u043E \u043F\u043E\u0447\u0442\u0435 \u0438\u043B\u0438 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u043B\u044E\u0431\u044B\u043C \u0434\u0440\u0443\u0433\u0438\u043C \u0441\u043F\u043E\u0441\u043E\u0431\u043E\u043C.</td>'+
    '</tr>'+
    '<tr>'+
    '<td colspan="3" style="padding:10px;"><div class="add_rating_control" onclick="setTimeout(function() {iRatingClear();}, 300);" ondblclick="iStorageClear();">\u041E\u0447\u0438\u0441\u0442\u043A\u0430</div></td>'+
    '<td colspan="4" style="font-size:0.85em">\u041A\u043E\u043C\u0430\u043D\u0434\u0430 \u041E\u0447\u0438\u0441\u0442\u043A\u0430<sup>*</sup>	 \u0443\u0434\u0430\u043B\u0438\u0442 \u0432\u0441\u0435 \u0442\u0435\u043A\u0443\u0449\u0438\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438, \u043E\u0442\u043D\u043E\u0441\u044F\u0449\u0438\u0435\u0441\u044F \u043A \u0440\u0430\u0431\u043E\u0442\u0435 \u0441\u043A\u0440\u0438\u043F\u0442\u0430.</td>'+
    '</tr>'+
    '<tr>'+
    '<td colspan="3" style="padding:10px;"><div class="add_rating_control" onclick="iRatingImport();">\u0418\u043C\u043F\u043E\u0440\u0442</div></td>'+
    '<td colspan="4" style="font-size:0.85em">\u0421\u043A\u043E\u043F\u0438\u0440\u0443\u0439\u0442\u0435 \u0440\u0430\u043D\u0435\u0435 \u044D\u043A\u0441\u043F\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0432 \u043E\u043A\u043D\u043E \u0438 \u0432\u043E\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435\u0441\u044C \u043A\u043E\u043C\u0430\u043D\u0434\u043E\u0439 \u0418\u043C\u043F\u043E\u0440\u0442<sup>*</sup>, \u0447\u0442\u043E\u0431\u044B \u043E\u0431\u043D\u043E\u0432\u0438\u0442\u044C \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0435 \u0440\u0435\u0439\u0442\u0438\u043D\u0433\u0438 \u0438\u043B\u0438 \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043D\u043E\u0432\u044B\u0435.</td>'+
    '</tr>'+
    '<tr>'+
    '<td colspan="32" style="padding:0px 0px 0px 10px;"><sup>* \u0412\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0435 \u043A\u043E\u043C\u0430\u043D\u0434\u044B \u043C\u043E\u0436\u0435\u0442 \u0437\u0430\u043D\u044F\u0442\u044C \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u043C\u0438\u043D\u0443\u0442.</sup></td>'+
    '</tr>'+
    '<tr>'+
    '<td colspan="32" style="padding:10px;" align="right">'+
    '<span class="add_rating_control" onclick="document.getElementById('+"'"+'add_rating_panel'+"'"+').style.display='+"'"+'none'+"'"+'" title="\u0417\u0430\u043A\u0440\u044B\u0442\u044C \u0431\u0435\u0437 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u044F">\u00A0\u0417\u0430\u043A\u0440\u044B\u0442\u044C\u00A0</span>\u00A0\u00A0'+
    '<span class="add_rating_control" onclick="iRatingSave();" title="\u0417\u0430\u043A\u0440\u044B\u0442\u044C \u0438 \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438">\u00A0\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C\u00A0</span>'+
    '</td>'+
    '</table>';
  oPanel.style.display='none';
  document.getElementById('head').appendChild(oPanel);

  var oPanelCmd = document.createElement('div');
  oPanelCmd.className = 'add_rating_control';
  oPanelCmd.innerHTML = '\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 rating.echo.msk.ru'
  oPanelCmd.setAttribute("onClick", "document.getElementById('add_rating_panel').style.display='';");
  document.getElementById('logged').appendChild(oPanelCmd);
}

function gmLoadSettings() {
  var myStorage = (typeof unsafeWindow != 'undefined')?unsafeWindow.localStorage:localStorage;
  var sSettings = myStorage['ers_'];
  if(typeof sSettings == 'string') {
    document.getElementById('add_rating_info_name').checked  = (sSettings.indexOf(' no_un ')==-1);
    document.getElementById('add_rating_info_color').checked = (sSettings.indexOf(' no_ch ')==-1);
    document.getElementById('add_rating_info_tag').checked   = (sSettings.indexOf(' no_tag ')==-1);
    document.getElementById('add_filter_ban_value').selectedIndex = (sSettings.indexOf(' ban_msg')==-1)?1:0;
    document.getElementById('add_rating_load_all').checked   = (sSettings.indexOf(' no_all ')==-1);
    document.getElementById('add_rating_sort').checked       = (sSettings.indexOf(' sort ')>-1);
    document.getElementById('add_rating_sort_plus').checked  = (sSettings.indexOf(' r+ ')==-1);
    document.getElementById('add_rating_layout').checked     = (sSettings.indexOf(' no_fl ')==-1);
  }
}

function gmUpdateInfo() {
  var sUserName = document.URL.substr(document.URL.search('\/users\/')+7, document.URL.length-document.URL.search('\/users\/')-8 );
  var myStorage = (typeof unsafeWindow != 'undefined')?unsafeWindow.localStorage:localStorage;
  var sStoredInfo = myStorage['er_'+sUserName];
  var aUserInfo = sStoredInfo.split('\u0009');

  aUserInfo[0] = document.body.innerHTML
    .match(/<p>\u0418\u043C\u044F\: <strong>.*<\/strong><\/p>/)[0]
    .replace(/<p>\u0418\u043C\u044F\: <strong>(.*)<\/strong><\/p>/, '$1')
//    +this.responseText
//    .match(/<p>\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D\: .*<\/p>/)[0]
//    .replace(/<p>\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D\: (.*)<\/p>/, ' ($1)')
  ;
  myStorage['er_'+sUserName] = aUserInfo.join('\u0009');
}

function gmFixLayout() {
  if(document.getElementById('add_rating_layout').checked) {
    if(document.URL.search(/echo\.msk\.ru\/?$/i)==-1)
      document.getElementsByClassName("outer")[0].style.marginRight="0";
    document.getElementById("comment_subject").style.width="700";
    document.getElementById("comment_body").style.width="800";
    document.getElementById("comment_body").style.height="400";
  }
}

function gmSignature() {
  if(document.getElementById("comment_body").value.indexOf("rating.echo.msk.ru")==-1)
    document.getElementById("comment_body").value += '\u000A\u000A<sub><i>\u042F \u043F\u043E\u043B\u044C\u0437\u0443\u044E\u0441\u044C <strong><abbr title="\u0421\u043A\u0440\u0438\u043F\u0442 GreaseMonkey">rating.echo.msk.ru</abbr> <abbr title="+ \u041F\u0430\u043D\u0435\u043B\u044C \u0443\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F + \u041A\u043D\u043E\u043F\u043A\u0430 (\u0411\u0430\u043D) + \u042D\u043A\u0441\u043F\u043E\u0440\u0442 / \u0418\u043C\u043F\u043E\u0440\u0442 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043A">v1.1</abbr></strong> http://userscripts.org/scripts/show/94819</i></sub>';
}

function gmAllInOne() {
  if(document.getElementById('add_rating_load_all').checked) {
    var hRequest = new XMLHttpRequest();
    var aCacheURL = [];
    var aDivs = document.getElementsByTagName('div');
    for(i = aDivs.length-1; i >= 0; --i) {
      if(aDivs[i].className=='pagination') {
        if(aDivs[i].innerHTML.indexOf('<span class="current">1</span>')<0) {
          return;
        }
        var aPages = aDivs[i].getElementsByTagName('a');
      }
      if(aDivs[i].className=='print') {
        var insNode = aDivs[i]; break;
      }
    }
    if((typeof insNode == 'object') && (typeof aPages == 'object')) {
      for(i = 0; i < aPages.length; ++i) {
        if(aCacheURL.indexOf(aPages[i].href) < 0) {
          hRequest.open('GET', aPages[i].href, false);
          hRequest.send(null);
          if(hRequest.readyState==4) {
            aCacheURL.push(aPages[i].href);
            var newDoc = document.createElement('div');
            newDoc.innerHTML = hRequest.responseText;
            var newDivs = newDoc.getElementsByTagName('div');
            for(d = 0; d < newDivs.length; ++d) {
              if((newDivs[d].className=='thread') && (newDivs[d].parentNode.id=='comments')) {
                var addDiv = document.createElement('div');
                addDiv.className = 'thread';
                addDiv.innerHTML = newDivs[d].innerHTML;
                insNode.parentNode.insertBefore(addDiv, insNode);
              }
            }
            aCacheURL.push(aPages[i].href);
          }
        }
      }
    }
  }
}

function gmAddCtl() {
  var aLinks = document.links;
  var no_un  = (document.getElementById('add_rating_info_name').checked)?'':'style="display:none;"';
  var no_ch  = (document.getElementById('add_rating_info_color').checked)?'':'display:none;';
  var no_tag = (document.getElementById('add_rating_info_tag').checked)?'':'style="display:none;"';
  for (i=aLinks.length-1; i>=0; --i) {
    if((aLinks[i].href.search('\/users\/')>0) && (aLinks[i].parentNode.className=='name')) {

      var sUserName = aLinks[i].href.substr(aLinks[i].href.search('\/users\/')+7, aLinks[i].href.length-aLinks[i].href.search('\/users\/')-8 );

      aLinks[i].parentNode.innerHTML =
          '\u00A0<span class="add_rating_control" title="\u0421\u043A\u0440\u044B\u0442\u044C \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435">\u00A0\u2718\u2709\u00A0</span>'+
          '\u00A0<span class="add_rating_control" title="\u0421\u043A\u0440\u044B\u0442\u044C \u0432\u0435\u0442\u043A\u0443">\u00A0\u2718\u21B3\u00A0</span>\u00A0'+
          '\u00A0<span class="add_rating_control" onclick="javascript:iSetRating('+"'"+sUserName+"'"+', -10);" title="\u0411\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F" style="color:red;"> \u0411\u0430\u043D </span>\u00A0'+
          '\u00A0<span class="add_rating_control" onclick="javascript:iSetRating('+"'"+sUserName+"'"+', -1);" title="\u0421\u043D\u0438\u0437\u0438\u0442\u044C \u0440\u0435\u0439\u0442\u0438\u043D\u0433"> \u2013 </span>\u00A0'+
          '<span class="add_rating_info" title="\u0422\u0435\u043A\u0443\u0449\u0438\u0439 \u0440\u0435\u0439\u0442\u0438\u043D\u0433">0</span>'+
          '\u00A0<span class="add_rating_control" onclick="javascript:iSetRating('+"'"+sUserName+"'"+', 1);" title="\u041F\u043E\u0434\u043D\u044F\u0442\u044C \u0440\u0435\u0439\u0442\u0438\u043D\u0433"> + </span>\u00A0'+
          '\u00A0<input type="text" class="add_tag" '+no_tag+' onblur="javascript:iSetTag('+"'"+sUserName+"'"+', this.value);" title="\u041C\u0435\u0442\u043A\u0430" />\u00A0'+
          '\u00A0<select class="add_tag" style="margin:2px; '+no_ch+'" onblur="javascript:iSetColor('+"'"+sUserName+"'"+', this.options[this.selectedIndex].value);" title="\u0426\u0432\u0435\u0442">'+
            '<option value="" selected="selected"                     onmouseover="javascript:this.parentNode.parentNode.parentNode.parentNode.style.backgroundColor=this.style.backgroundColor"> </option>'+
            '<option value="#FFDDDD" style="background-color:#FFDDDD" onmouseover="javascript:this.parentNode.parentNode.parentNode.parentNode.style.backgroundColor=this.style.backgroundColor"> </option>'+
            '<option value="#FFFFDD" style="background-color:#FFFFDD" onmouseover="javascript:this.parentNode.parentNode.parentNode.parentNode.style.backgroundColor=this.style.backgroundColor"> </option>'+
            '<option value="#DDFFDD" style="background-color:#DDFFDD" onmouseover="javascript:this.parentNode.parentNode.parentNode.parentNode.style.backgroundColor=this.style.backgroundColor"> </option>'+
            '<option value="#DDFFFF" style="background-color:#DDFFFF" onmouseover="javascript:this.parentNode.parentNode.parentNode.parentNode.style.backgroundColor=this.style.backgroundColor"> </option>'+
            '<option value="#DDDDFF" style="background-color:#DDDDFF" onmouseover="javascript:this.parentNode.parentNode.parentNode.parentNode.style.backgroundColor=this.style.backgroundColor"> </option>'+
            '<option value="#FFDDFF" style="background-color:#FFDDFF" onmouseover="javascript:this.parentNode.parentNode.parentNode.parentNode.style.backgroundColor=this.style.backgroundColor"> </option>'+
          '</select>\u00A0'+
          aLinks[i].parentNode.innerHTML+
          ' <span class="add_rating_info" '+no_un+' title="\u0418\u043C\u044F"></span>';
      aLinks[i].parentNode.getElementsByTagName('span')[0].setAttribute("onClick", "this.parentNode.parentNode.parentNode.previousSibling.style.display=''; this.parentNode.parentNode.parentNode.style.display='none'; return true;");
      aLinks[i].parentNode.getElementsByTagName('span')[1].setAttribute("onClick", "this.parentNode.parentNode.parentNode.parentNode.previousSibling.style.display=''; this.parentNode.parentNode.parentNode.parentNode.style.display='none'; return true;");

      var oReplacement = document.createElement("div");
      oReplacement.className = 'add_hide_msg';
      oReplacement.style.display = 'none';
      oReplacement.setAttribute("onClick", "this.nextSibling.style.display = ''; this.style.display = 'none'; return true;");
      oReplacement.innerHTML = "&#1050;&#1086;&#1084;&#1084;&#1077;&#1085;&#1090;&#1072;&#1088;&#1080;&#1081; "+sUserName;
      aLinks[i].parentNode.parentNode.parentNode.parentNode.insertBefore(oReplacement, aLinks[i].parentNode.parentNode.parentNode);

      oReplacement = document.createElement("div");
      oReplacement.className = 'add_hide_thread';
      oReplacement.style.display = 'none';
      if(aLinks[i].parentNode.parentNode.parentNode.parentNode.parentNode.className=='thread') oReplacement.style.marginLeft = '2.5em';
      oReplacement.setAttribute("onClick", "this.nextSibling.style.display = ''; this.style.display = 'none'; return true;");
      oReplacement.innerHTML = "&#1042;&#1077;&#1090;&#1082;&#1072; "+sUserName
      aLinks[i].parentNode.parentNode.parentNode.parentNode.parentNode.insertBefore(oReplacement, aLinks[i].parentNode.parentNode.parentNode.parentNode);

      aLinks[i].parentNode.getElementsByTagName('span')[0].setAttribute("onClick", "this.parentNode.parentNode.parentNode.previousSibling.style.display=''; this.parentNode.parentNode.parentNode.style.display='none'; return true;");
      aLinks[i].parentNode.getElementsByTagName('span')[1].setAttribute("onClick", "this.parentNode.parentNode.parentNode.parentNode.previousSibling.style.display=''; this.parentNode.parentNode.parentNode.parentNode.style.display='none'; return true;");
    }
  }
}

function gmInjectCSS() {
  var style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = 
    '#add_rating_panel   {background-color:white; color:#000000; margin-left:auto; margin-right:auto; padding:10px;} '+
    '.add_rating_control {background-color:white; background-image:-moz-linear-gradient(top, white, silver); color:#606060; border:solid 1px #606060; -moz-border-radius:5px; cursor:pointer; font-size:0.9em; text-align:center; -moz-user-select:none} '+
    '.add_rating_info    {color:#606060;} '+
    '.add_tag            {color:black; border:solid 1px silver; max-width:3em; height:1,1em;} '+
    '.add_hide_msg       {background-color:silver; color:black; border:solid 1px #606060; max-width:710px; cursor:pointer; font-size:0.75em;} '+
    '.add_hide_thread    {background-color:silver; color:black; border:solid 1px #606060; max-width:710px; cursor:pointer; font-size:0.75em; margin-top:5px;} ';
  document.getElementsByTagName('head')[0].appendChild(style);
}

function gmInjectJS() {
  var injection = [];
  injection.push(
    "function iSetRating(inUserName, inDelta) { "+
    "  var banValue = document.getElementById('add_filter_ban_value').value;"+
    "  var sStoredInfo = localStorage['er_'+inUserName]; "+
    "  if(typeof sStoredInfo == 'string') { "+
    "    var aUserInfo = sStoredInfo.split('\u0009'); "+
    "    if(inDelta==-10) aUserInfo[1] = banValue;"+
    "    else aUserInfo[1] = (Number(aUserInfo[1])+inDelta).toString(); "+
    "    if(Number(aUserInfo[1])>100) aUserInfo[1] = '100'; "+
    "    if(Number(aUserInfo[1])<-100) aUserInfo[1] = '-100'; "+
    "    localStorage['er_'+inUserName] = aUserInfo.join('\u0009'); "+
    " "+
    "    var aLinks = document.links; "+
    "    for (i=aLinks.length-1; i>=0; --i) { "+
    "      if((aLinks[i].href.search('\/users\/')>0) && (aLinks[i].parentNode.className=='name')) { "+
    "        var sUserName = aLinks[i].href.substr(aLinks[i].href.search('\/users\/')+7, aLinks[i].href.length-aLinks[i].href.search('\/users\/')-8 ); "+
    "        if(sUserName == inUserName) { "+
    "          if(Number(aUserInfo[1])>0) { "+
    "            aLinks[i].parentNode.children[4].innerHTML = '+'+aUserInfo[1]; "+
    "          } else { "+
    "            aLinks[i].parentNode.children[4].innerHTML = aUserInfo[1]; "+
    "            if(Number(aUserInfo[1]) == "+hideLimit.toString()+") { "+
    "              aLinks[i].parentNode.parentNode.parentNode.previousSibling.style.display=''; "+
    "              aLinks[i].parentNode.parentNode.parentNode.style.display='none'; "+
    "            } "+
    "            if(Number(aUserInfo[1]) < "+hideLimit.toString()+") { "+
    "              aLinks[i].parentNode.parentNode.parentNode.parentNode.previousSibling.style.display=''; "+
    "              aLinks[i].parentNode.parentNode.parentNode.parentNode.style.display='none'; "+
    "            } "+
    "          } "+
    "        } "+
    "      } "+
    "    } "+
    "  } "+
    "} ");

  injection.push(
    "function iSetTag(inUserName, inTag) { "+
    "  var sStoredInfo = localStorage['er_'+inUserName]; "+
    "  if(typeof sStoredInfo == 'string') { "+
    "    var aUserInfo = sStoredInfo.split('\u0009'); "+
    "    aUserInfo[2] = inTag.replace('\u0009',' '); "+
    "    localStorage['er_'+inUserName] = aUserInfo.join('\u0009'); "+
    " "+
    "    var aLinks = document.links; "+
    "    for (i=aLinks.length-1; i>=0; --i) { "+
    "      if((aLinks[i].href.search('\/users\/')>0) && (aLinks[i].parentNode.className=='name')) { "+
    "        var sUserName = aLinks[i].href.substr(aLinks[i].href.search('\/users\/')+7, aLinks[i].href.length-aLinks[i].href.search('\/users\/')-8 ); "+
    "        if(sUserName == inUserName) { "+
    "          aLinks[i].parentNode.children[6].value = aUserInfo[2]; "+
    "        } "+
    "      } "+
    "    } "+
    "  } "+
    "} ");

  injection.push(
    "function iSetColor(inUserName, inColor) { "+
    "  var sStoredInfo = localStorage['er_'+inUserName]; "+
    "  if(typeof sStoredInfo == 'string') { "+
    "    var aUserInfo = sStoredInfo.split('\u0009'); "+
    "    aUserInfo[3] = inColor; "+
    "    localStorage['er_'+inUserName] = aUserInfo.join('\u0009'); "+
    " "+
    "    var aLinks = document.links; "+
    "    for (i=aLinks.length-1; i>=0; --i) { "+
    "      if((aLinks[i].href.search('\/users\/')>0) && (aLinks[i].parentNode.className=='name')) { "+
    "        var sUserName = aLinks[i].href.substr(aLinks[i].href.search('\/users\/')+7, aLinks[i].href.length-aLinks[i].href.search('\/users\/')-8 ); "+
    "        if(sUserName == inUserName) { "+
    "          aLinks[i].parentNode.children[7].value     = aUserInfo[3]; "+
    "          aLinks[i].parentNode.parentNode.parentNode.style.backgroundColor = aUserInfo[3]; "+
    "        } "+
    "      } "+
    "    } "+
    "  } "+
    "} ");

  injection.push(
    "function iRatingSave() { "+
    "  var sSettings = ' '+"+
    "    ((document.getElementById('add_rating_info_name').checked)?'':'no_un ')+"+
    "    ((document.getElementById('add_rating_info_color').checked)?'':'no_ch ')+"+
    "    ((document.getElementById('add_rating_info_tag').checked)?'':'no_tag ')+"+
    "    ((document.getElementById('add_filter_ban_value').selectedIndex==1)?'':'ban_msg ')+"+
    "    ((document.getElementById('add_rating_load_all').checked)?'':'no_all ')+"+
    "    ((document.getElementById('add_rating_sort').checked)?'sort ':'')+"+
    "    ((document.getElementById('add_rating_sort_plus').checked)?'':'r+ ')+"+
    "    ((document.getElementById('add_rating_layout').checked)?'':'no_fl ');"+
    "  if(sSettings != ' ') {localStorage['ers_'] = sSettings;} "+
    "  window.location = document.URL; "+
    "} ");

  injection.push(
    "function iRatingClear() { "+
    "  if(localStorage.length>0) {"+
    "    if(confirm('\u0412\u044B \u0443\u0432\u0435\u0440\u0435\u043D\u044B, \u0447\u0442\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u0432\u0441\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0438 \u0440\u0435\u0439\u0442\u0438\u043D\u0433\u0438?')) {"+
    "      for(i = localStorage.length-1; i > -1; --i) {"+
    "        tagName = localStorage.key(i);"+
    "        if((tagName.indexOf('er_')==0) || (tagName=='ers_')) {"+
    "          localStorage.removeItem(tagName);"+
    "        }"+
    "      }"+
    "    }"+
    "  }"+
    "} ");

  injection.push(
    "function iStorageClear() { "+
    "  if(confirm('\u0412\u043D\u0438\u043C\u0430\u043D\u0438\u0435! \u0414\u0432\u043E\u0439\u043D\u043E\u0439 \u0449\u0435\u043B\u0447\u043E\u043A \u043D\u0430 \u043A\u043D\u043E\u043F\u043A\u0435 \u043E\u0447\u0438\u0441\u0442\u043A\u0438 \u0443\u0434\u0430\u043B\u0438\u0442 \u0432\u0441\u0451 \u0441\u043E\u0434\u0435\u0440\u0436\u0438\u043C\u043E\u0435 \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u0445\u0440\u0430\u043D\u0438\u043B\u0438\u0449\u0430, \u043A\u0430\u043A \u043E\u0442\u043D\u043E\u0441\u044F\u0449\u0435\u0435\u0441\u044F \u043A \u0440\u0430\u0431\u043E\u0442\u0435 \u0441\u043A\u0440\u0438\u043F\u0442\u0430, \u0442\u0430\u043A \u0438 \u043D\u0435\u0442. \u0412\u044B \u0443\u0432\u0435\u0440\u0435\u043D\u044B, \u0447\u0442\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u043F\u0440\u043E\u0432\u0435\u0441\u0442\u0438 \u043F\u043E\u043B\u043D\u0443\u044E \u043E\u0447\u0438\u0441\u0442\u043A\u0443?')) {"+
    "    localStorage.clear();"+
    "  }"+
    "} ");

  injection.push(
    "function iRatingImport() { "+
    "  if(confirm('\u0412\u044B \u0443\u0432\u0435\u0440\u0435\u043D\u044B, \u0447\u0442\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u043D\u043E\u0432\u044B\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0438 \u0440\u0435\u0439\u0442\u0438\u043D\u0433\u0438?')) {"+
    "    var aImportString = document.getElementById('add_rating_export').value.replace(String.fromCharCode(13),String.fromCharCode(10)).replace(String.fromCharCode(10)+String.fromCharCode(10),String.fromCharCode(10)).split(String.fromCharCode(10));"+
    "    for(i=0; i<aImportString.length; ++i) {"+
    "      if((aImportString[i].indexOf('er_')==0) || (aImportString[i].indexOf('ers_')==0)) {"+
    "        aUserInfo = aImportString[i].split('\u0009');"+
    "        localStorage[aUserInfo.shift()] = aUserInfo.join('\u0009');"+
    "      }"+
    "    }"+
    "  }"+
    "} ");

  injection.push(
    "function iRatingExport() {"+
    "  var tagName;"+
    "  var exportString = '';"+
    "  if(typeof localStorage['ers_']=='string') {"+
    "    exportString = 'ers_\u0009'+localStorage['ers_']+'\\"+"n';"+
    "  }"+
    "  for(i=0; i<localStorage.length; ++i) {"+
    "    tagName = localStorage.key(i);"+
    "    if(tagName.indexOf('er_')==0) {"+
    "      exportString += tagName+'\u0009'+localStorage[tagName]+'\\"+"n';"+
    "    }"+
    "  }"+
    "  document.getElementById('add_rating_export').value = exportString;"+
    "} ");

  for(i=0; i<injection.length; ++i) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = injection[i];
    document.getElementsByTagName('head')[0].appendChild(script);
  }
}

function gmAddInfo() {
  var myStorage = (typeof unsafeWindow != 'undefined')?unsafeWindow.localStorage:localStorage;
  var aCacheURL = [];
  var hRequest = [];

  var aLinks = document.links;
  for (i=aLinks.length-1; i>=0; --i) {
    if((aLinks[i].href.search('\/users\/')>0) && (aLinks[i].parentNode.className=='name')) {
      var sUserName = aLinks[i].href.substr(aLinks[i].href.search('\/users\/')+7, aLinks[i].href.length-aLinks[i].href.search('\/users\/')-8 );
      var sStoredInfo = myStorage['er_'+sUserName];
      if(typeof sStoredInfo != 'string') {
        var r = aCacheURL.indexOf(aLinks[i].href);
        if(r < 0)
          aCacheURL.push(aLinks[i].href);
      } else {
        var aUserInfo = sStoredInfo.split('\u0009');
        if(aUserInfo[0]=='') {
          aCacheURL.push(aLinks[i].href);
        } else {
          aLinks[i].parentNode.children[9].innerHTML = aUserInfo[0]; // Name
        }

        if(Number(aUserInfo[1])>0) { // Rating
          aLinks[i].parentNode.children[4].innerHTML = '+'+aUserInfo[1];
        } else {
          aLinks[i].parentNode.children[4].innerHTML = aUserInfo[1];
          if(Number(aUserInfo[1]) == hideLimit) {
            aLinks[i].parentNode.parentNode.parentNode.previousSibling.style.display='';
            aLinks[i].parentNode.parentNode.parentNode.style.display='none';
          }
          if(Number(aUserInfo[1]) < hideLimit) {
            aLinks[i].parentNode.parentNode.parentNode.parentNode.previousSibling.style.display='';
            aLinks[i].parentNode.parentNode.parentNode.parentNode.style.display='none';
          }
        }
        aLinks[i].parentNode.children[6].value     = aUserInfo[2]; // Tag
        aLinks[i].parentNode.children[7].value     = aUserInfo[3]; // Color
        aLinks[i].parentNode.parentNode.parentNode.style.backgroundColor = aUserInfo[3];
      }
    }
  }

  if(document.getElementById('add_rating_info_name').checked) {
    for(outR=0; outR<aCacheURL.length; ++outR) {
      hRequest.push(new XMLHttpRequest());
      hRequest[outR].open('GET', aCacheURL[outR], true);
      hRequest[outR].onreadystatechange = function() {
        if(this.readyState==4) {
          for(r=0; r<hRequest.length; ++r)
            if(hRequest[r]==this)
              break;

          var sUserName = aCacheURL[r].substr(aCacheURL[r].search('\/users\/')+7, aCacheURL[r].length-aCacheURL[r].search('\/users\/')-8 );
          var aUserInfo = [
            this.responseText
            .match(/<p>\u0418\u043C\u044F\: <strong>.*<\/strong><\/p>/)[0]
            .replace(/<p>\u0418\u043C\u044F\: <strong>(.*)<\/strong><\/p>/, '$1')
//            +this.responseText
//            .match(/<p>\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D\: .*<\/p>/)[0]
//            .replace(/<p>\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D\: (.*)<\/p>/, ' ($1)')
            ,'0','','']
          myStorage['er_'+sUserName] = aUserInfo.join('\u0009');

          for (i=aLinks.length-1; i>=0; --i) {
            if(aLinks[i].href==aCacheURL[r]) {
              aLinks[i].parentNode.children[9].innerHTML = aUserInfo[0]; // Name
            }
          }
        }
      }
      hRequest[outR].send(null);
    }
  }
}

function gmPos() {
  if (document.URL.indexOf('#') >= 0) {
    var aAnchors = document.anchors;
    for (i = aAnchors.length-1; i >= 0; --i) {
      if(aAnchors[i].href.indexOf('#') >= 0) {
        if(document.URL.indexOf(aAnchors[i].href) >= 0) {
          oNode = aAnchors[i];
          offset = 0;
          while(oNode) {
            offset += oNode.offsetTop;
            oNode = oNode.offsetParent;
          }
          window.scrollTo(0, offset);
          break;
        }
      }
    }
  }
}

// =============================================================================