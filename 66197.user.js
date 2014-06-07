// ==UserScript==
// @name           Помощник по исследованиям
// @namespace      liquid.ika-info.ucoz.ru
// @author         kevinhill(перевод liquid, дописано liquid)
// @version        2.4
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
// @description    Показывает сколько времени осталось до открытия исследований
// @include        http://s*.ikariam.*/index.php?view=researchAdvisor*
// @include        http://s*.ikariam.*/index.php
// @include        http://s*.ikariam.*/index.php?action=Advisor&function=doResearch*
// @exclude        http://www.ika-world.com/*
// @exclude        http://ikariamap.com/*
// @exclude        http://board.ikariam.org/*
// @exclude        http://*.ikariam.*/index.php?view=options
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// @require        http://userscripts.org/scripts/source/66255.user.js
// ==/UserScript==

// NOTICE: I have not gotten this script approved yet, by installing this you are
// using it at your own risk, if you get banned, I'm sorry, but that is not my fault

var usNum = 66197;
var curVer = '2.4';

(function (){

ScriptUpdater.check(usNum, curVer);

var updateCheckButton = $('<a></a>');
    updateCheckButton.attr('id', 'updateCheck');
    updateCheckButton.css({
        'margin':'10px',
        'cursor':'pointer',
        'font-size':'smaller'
    });
	
	var updateLine = '<div style="float:left;margin-left:10px;">Проверить обновление скрипта</div>';
		updateLine += '<div style="float:right;margin-right:10px;">v' + curVer + '</div>';
    updateCheckButton.html(updateLine);
    updateCheckButton.click(function() {
        ScriptUpdater.forceNotice(usNum, curVer);
    });

$('div#currentResearch div.content').after(updateCheckButton);

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
    var daysT = '<span style="font-size:smaller">дн. </span>';
    var hrsT = '<span style="font-size:smaller">час. </span>';
    var minT = '<span style="font-size:smaller">мин. </span>';


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

        $(this).find('h4 a').html(title + ' -<br/>Пока не доступно для открытия!');
    } else
    if(cost > RP) {
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

        $(this).find('h4 a').html(title + '<br/>Будет доступно через ~ ' + timeString);
        
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

        $(this).find('h4 a').html(title + ' -<br/>Доступно для открытия!');
    }

});

})(); //Script End