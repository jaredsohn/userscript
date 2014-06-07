// ==UserScript==
// @name           Помічник по науці
// @namespace      http://userscripts.org/scripts/show/88543
// @author         kevinhill(перевод liquid, дописано liquid, переклад ibobalo)
// @version        3.1
// @history        3.1 український автоапдейт, назва і опис, прогресбари
// @history        3.0 переклад, автовизначення сервера.
// @history        2.4 исправлены мелкие ошибки.
// @history        2.3 Исправлен баг с отображением оставшегося времени исследования, если набрали более 1'000'000 баллов исследования и в час набираем более 1'000 баллов
// @history        2.2 Обновлялка переведена на русский.
// @history        2.1 Исправлен баг с будущими науками более второго уровня.
// @history        2.0 Переведено на русский и исправлен баг если исследование еще нельзя открыть, пишется, что оно доступно. Убрано обновление с официалки
// @history        1.7 Added version number to lower right corner
// @history        1.6 Changed text from "Not enough research points." to "Price For Research:"
// @history        1.5 Cleaned up jQuery css, fixed countdown for days < 1
// @history        1.4 Force update check button added
// @history        1.3 Code clean-up
// @history        1.2 Added surplus check, colors green if you can buy it
// @history        1.1 Modified formula for calculating time from decimal hrs, more accurate
// @history        1.0 Completed initial script
// @description    Показує скільки часу необхідно для накопичення балів науки для винаходу
// @include        http://s*.*.ikariam.com/index.php?view=researchAdvisor*
// @include        http://s*.*.ikariam.com/index.php
// @include        http://s*.*.ikariam.com/index.php?action=Advisor&function=doResearch*
// @exclude        http://s*.*.ikariam.com/index.php?view=options
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// @require        http://userscripts.org/scripts/source/88544.user.js
// ==/UserScript==

// NOTICE: I have not gotten this script approved yet, by installing this you are
// using it at your own risk, if you get banned, I'm sorry, but that is not my fault

ScriptUpdater.check("88543", "3.1", false, {menuCaption:'Перевірити оновлення $(name) v.$(version)', afterElement:$('div.buildingDescription h1')[0]});

function defineLanguage(langID) {
	language = {
		STR_DAYS: 'd.',
		STR_HOURS: 'h.',
		STR_MINUTES: 'm.',
		STR_AVAIL: 'Available!',
		STR_NOT_AVAIL: 'Not available yet!',
		STR_AVAIL_AFTER: 'Would be available after ~ '
	};
	switch (langID) {
	case 'ru':
		language.STR_DAYS = 'дн.';
		language.STR_HOURS = 'час.';
		language.STR_MINUTES = 'мин.';
		language.STR_AVAIL = 'Доступно для открытия!';
		language.STR_NOT_AVAIL = 'Пока не доступно для открытия!';
		language.STR_AVAIL_AFTER = 'Будет доступно через ~ ';
		break;
	case 'ua':
		language.STR_DAYS = 'дн.';
		language.STR_HOURS = 'г.';
		language.STR_MINUTES = 'хв.';
		language.STR_AVAIL = 'Доступно для відкриття!';
		language.STR_NOT_AVAIL = 'Поки що не доступно для відкриття!';
		language.STR_AVAIL_AFTER = 'Буде доступно через ~ ';
		break;
	default:
		GM_log("Unknown language " + langID + " @ " + top.location.host);
	}
	return language;
}

var language = defineLanguage('');
var gameServerParts = top.location.host.split(".");
if (gameServerParts.length >= 3) {
	language = defineLanguage(gameServerParts[gameServerParts.length-3]);
}

function strips(str) {
    return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

function addCommas(number) {
number = '' + number;
if (number.length > 3) {
var mod = number.length % 3;
var output = (mod > 0 ? (number.substring(0,mod)) : '');
for (i=0 ; i < Math.floor(number.length / 3); i++) {
if ((mod == 0) && (i == 0))
output += number.substring(mod+ 3 * i, mod + 3 * i + 3);
else
output+= ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
}
return (output);
}
else return number;
}

function makeTime(time) {
    var daysT = '<span style="font-size:smaller">' + language.STR_DAYS + ' </span>';
    var hrsT = '<span style="font-size:smaller">' + language.STR_HOURS + ' </span>';
    var minT = '<span style="font-size:smaller">' + language.STR_MINUTES + ' </span>';


    time = time / 24;
    var days = parseInt(time);
    time -= parseInt(time); time *= 24;
    var hours = parseInt(time);
    time -= parseInt(time); time *= 60;
    var min = parseInt(time);

    if(days > 0) {
        return days+daysT +hours+hrsT +min+minT;
    } else if(days == 0) {
        return hours+hrsT +min+minT;
    } else if(days == 0 && hours == 0) {
        return min+minT;
    } else if(days == 0 && hours == 0 && min == 0) {
        return 0;
    }
    return days+daysT +hours+hrsT +min+minT;
}

var tmp = $('ul.researchLeftMenu li.time').text();
var tmp2 = tmp.split(':');
var RPph = parseInt(tmp2[1].replace(',', ''));

tmp = $('ul.researchLeftMenu li.points').text();
tmp2 = tmp.split(':');
var RP = parseInt(tmp2[1].replace(',', '').replace(',', ''));

// Finds and calculates per research
$('div.content ul.researchTypes li.researchType div.researchInfo').each(function (i){
    var title = strips($(this).find('h4 a').text());
    var cost  = $(this).find('div.costs ul.resources li.researchPoints').text().replace(',', '');
    cost = cost.replace(',', '');


    GM_setValue(title, cost);

    if(cost == '') {
        var surplus = $('<li></li>');
            surplus.addClass('researchPoints');
            surplus.attr('id', 'remain');
            surplus.css({
                'color':'green',
                'display':'block'
            });
            surplus.text('+' + addCommas(RP - cost));
            $(this).find('div.costs ul.resources li.researchPoints').after(surplus);

        $(this).find('h4 a').html(title + ' -<br/>' + language.STR_NOT_AVAIL);
    } else
    if(cost > RP) {
	var percent = Math.floor(100 * RP / cost);

        var remain = $('<li></li>');
            remain.addClass('researchPoints');
            remain.attr('id', 'remain');
            remain.css({
                'color':'red',
                'display':'block'
            });
            remain.text('-' + addCommas(cost - RP));
            $(this).find('div.costs ul.resources li.researchPoints').after(remain);

        var decimalHrs = (cost - RP) / RPph;
        var timeString = makeTime(decimalHrs);

	var progress_bar = '<div class="progressBar" style="margin-left:0; width:100%; position:relative; color:orange;">' +
		'<span style="position:absolute; color:#BC8068; text-align:center; width:100%;">' +
			language.STR_AVAIL_AFTER + ' ' + timeString +
		'</span>' +
		'<div style="width: ' + percent + '%;" title="' + percent + '%" id="upgradeProgress" class="bar"></div>' + 
		'</div>';
        $(this).find('h4 a').html(title).after($(progress_bar));
        
    } else {
        var surplus = $('<li></li>');
            surplus.addClass('researchPoints');
            surplus.attr('id', 'remain');
            surplus.css({
                'color':'green',
                'display':'block'
            });
            surplus.text('+' + addCommas(RP - cost));
            $(this).find('div.costs ul.resources li.researchPoints').after(surplus);

        $(this).find('h4 a').html(title + ' -<br/>' + language.STR_AVAIL);
    }

});

//Script End