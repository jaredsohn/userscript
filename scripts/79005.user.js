// ==UserScript==
// @name           Virtonomica_Notes (edited by Zemchik)
// @namespace      virtonomica
// @description    оригинальный скрипт http://userscripts.org/scripts/show/74214
// @description    заносит в заметки некоторые параметры подразделения
// @description    для заводов: техна, кол-во рабов и их квала
// @description    для ферм: техна, кол-во животных и их качество, кол-во рабов и их квала
// @description    для офисов: кол-во рабов и их квала, кол-во подразделений под управлением данного офиса, нагрузка
// @description    для лабораторий: кол-во и квала рабов
// @description    для магазинов: кол-во и квала рабов, известность
// @include        http://virtonomica.*/*/main/unit/view/*
// @include        http://virtonomica.*/*/main/unit/view/*
// @exclude        http://virtonomica.*/*/main/unit/view/*/*
// ==/UserScript==

var run = function() {

    var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
    $ = win.$;

    var pad = function(val, len) {
        val = String(val);
        len = len || 2;
        while (val.length < len) val = "0" + val;
        return val;
    };


    var parse = function(caption) {
        var match = $('.infoblock > tbody > tr:contains(' + caption + ') td:eq(1)').text().match(/[\d\.\s]*\d/);
        if (match == null || match.length == 0) {
            //alert('Error: "' + caption + '" can\'t be parsed');
            return '?';
        }

        return match[0].trim();
    }

    var text = '';
    var oldNotice = $('fieldset.notice');
    var isOfice = ($('td.title:contains(Размер офиса)').length > 0 ); //|| $('td.title:contains(Район города)').length > 0);
	var isStore = ($('td.title:contains(Район города)').length > 0);
    var isLab = ($('td.title:contains(Размер лаборатории)').length > 0);
    var isStorage = ($('td.title:contains(Процент заполнения)').length > 0);
	var isFarm = ($('td.title:contains(Размер фермы)').length > 0);
	var isFactory = ($('td.title:contains(Размер завода)').length > 0);
    var realm = readCookie('last_realm');

    if (oldNotice.length > 0) {
        text = oldNotice.text().split("\n").slice(2).join("\n").trim();

        var newNotice = $('<div>').css({
            'white-space': 'pre',
            'clear': 'both',
            'border': '1px solid #54a9dc',
            'width': '523px',
            'height': '14px',
            'overflow': 'hidden',
            'padding': '2px',
            'cursor': 'pointer'
        }).text(text).click(function() {
            if ($(this).height() == 14) {
                $(this).height('auto');
            } else {
                $(this).height(14);
            }
        });

        oldNotice.remove();
        $('#unit_subtab').append(newNotice);
    }

    var addButton = $('<a>').text('Добавить в заметки').css({
        'display': 'block',
        'margin-bottom': '10px',
        'text-decoration': 'underline',
        'cursor': 'pointer'
    }).click(function() {

        var now = new Date();
        var line = pad(now.getDate()) + '.' + pad(now.getMonth() + 1) + '.' + now.getFullYear()
            + (isStore ? '' : (isOfice ? '' : (isLab ? '' : ' | техна: ' + parse('Уровень технологии'))))			//исключая офисы, лабы и магазины
			+ (isFarm ? ' | Животных: ' + parse('Количество животных') : '')										//только для ферм
			+ (isFarm ? ' | кач.: ' + parse('Качество животных') : '')												//только для ферм
            + ' | рабов: ' + parse('Количество ' + (isOfice ? 'сотрудников' : (isStore ? 'сотрудников' : (isLab ? 'учёных' : (isFarm ? 'работников' : 'рабочих')))))	//для всего
            + ' | квала: ' + parse('Уровень квалификации')															//для всего
			+ (isStore ? ' | Известность: ' + parse('Известность магазина') : '')									//только для магазинов
            + (isOfice ? ' | подр.: ' + parse('Количество подразделений в управлении') : '')						//только для офисов
            + (isOfice ? ' | нагр.: ' + parse('Уровень управленческой нагрузки') + '%' : '')						//только для офисов
 //           + ' | эф. ' + parse('Эффективность топ-менеджера') + '%'
//            + ' / ' + parse('Эффективность работы') + '%'
			;

        $.post('/' + realm + '/window/unit/notice/' + win.unit_id, {'unitData[text]': line + "\n" + text, 'save': 'Сохранить изменения'}, function(data, status) {
            win.location = win.location;
            return false;
        });
    });

    if (!isStorage) {
        $('.control td:first').prepend(addButton);
    }
}

// Хак, что бы получить полноценный доступ к DOM >:]
var script = document.createElement("script");
script.textContent = '(' + run.toString() + ')();';
document.documentElement.appendChild(script);