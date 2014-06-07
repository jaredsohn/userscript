// ==UserScript==
// @name           Virtonomica.инфо: групповые операции
// @description Позволяет устанавливать параметры сбыта для группы предприятий
// @include        http://virtonomic*.*/*/main/company/view/*/unit_list
// @include        http://virtonomic*.*/*/main/unit/view/*/sale
// @include        http://virtonomic*.*/*/main/unit/view/*/
// @include        http://virtonomic*.*/*/window/unit/upgrade/*
// @include        http://virtonomic*.*/*/window/unit/produce_change/*
// @include        http://virtonomic*.*/*/window/unit/close/*
// ==/UserScript==

var run = function(type) {

    var total = null;

    var clone = function(o) {
        if (!o || 'object' !== typeof o) {
            return o;
        }
        var c = 'function' === typeof o.pop ? [] : {};
        var p, v;
        for (p in o) {
            if (o.hasOwnProperty(p)) {
                v = o[p];
                if (v && 'object' === typeof v) {
                    c[p] = clone(v);
                }
                else {
                    c[p] = v;
                }
            }
        }
        return c;
    }

    var realm = readCookie('last_realm');

    var main = function() {

        var onLoad = function() {

            var first = true;
            var type = null;
            var selector = 'tbody:first > tr[class!=u-th][class!=u-z][class!=u-z ozz]';

            $('table.unit-list').selectable({
                filter: selector,
                tolerance: 'touch',
                cancel: ':input,option,a',

                selecting: function(event, ui) {

                },

                selected: function(event, ui) {
                    var t = $($('td', ui.selected)[1]).attr('title');

                    if (first) {
                        first = false;
                        type = t;

                        $('.js-multisale-button').removeAttr('disabled');
                        return false;
                    } else {
                        if (type != t) {
                            $(ui.selected).removeClass('ui-selected');
                        }
                    }
                },

                unselected: function(event, ui) {
                    if ($('.ui-selected').length == 0) {
                        first = true;
                        type = null;
                        $(this).selectable('option', 'filter', selector);

                        $('.js-multisale-button').attr('disabled', true);
                    }
                }
            });

            $('table.unit-list ' + selector).dblclick(function() {
                var t = $($('td', this)[1]).attr('title');
                $('table.unit-list tr:has(td[title="' + t + '"])').addClass('ui-selected');
                return false;
            });

            var serialize = function() {
                var arr = new Array();
                $('.ui-selected > .u-c > a').each(function() {
                    arr.push(/\d+$/.exec($(this).attr('href'))[0]);
                });

                if (arr.length == 0) {
                    return;
                }

                setCookie('units', arr.join(','));
                return arr[0];
            }

            var redirect = function() {

                try {
                    var id = serialize();
                    var url = $(this).val().replace('%id%', id);
                    var url = url.replace('%realm%', realm);

                    window.location = url;

                } catch (ex) {
                    alert('Error: ' + ex);
                }

                return false;
            }

            var artButton = $('<button value="/%realm%/main/unit/view/%id%/" class="js-multisale-button" disabled>Инновации</button>').click(redirect);
            var specialtyButton = $('<button value="/%realm%/window/unit/produce_change/%id%" class="js-multisale-button" disabled>Специализация</button>').click(redirect);
            var saleButton = $('<button value="/%realm%/main/unit/view/%id%/sale" class="js-multisale-button" disabled>Параметры сбыта</button>').click(redirect);
            var sizeButton = $('<button value="/%realm%/window/unit/upgrade/%id%" class="js-multisale-button" disabled>Размер</button>').click(redirect);
            var boomButton = $('<button value="/%realm%/window/unit/close/%id%" class="js-multisale-button" disabled>Ликвидация предприятий</button>').click(redirect);

            var panel = $('<fieldset><legend>Групповые операции</legend></fieldset>');

            panel.append(artButton).append(specialtyButton).append(saleButton).append(sizeButton).append(boomButton);

            $('.unit-list').wrap($('<form id="js-multisale-form" />')).after(panel);
        }

        var script = document.createElement("script");
        script.src = 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.3/jquery-ui.min.js';
        script.onload = onLoad;
        document.getElementsByTagName("head")[0].appendChild(script);

        var style = document.createElement("style");
        style.type = 'text/css';
        style.textContent = '.ui-selected td { background-color: #fbec88 !important; } .ui-selecting td { background-color: #fef7e2 !important;  }';
        document.getElementsByTagName("head")[0].appendChild(style);

    }

    var isGroup = function() {
        var arr = readCookie('units');

        if (arr == null) {
            return false;
        }

        arr = arr.split(',');
        total = arr.length;
        if (total == 0) {
            return false;
        }

        return arr;
    }

    var doit = function(params, url, data) {

        var arr = isGroup();

        if (data == undefined) {
            data = '';
        }

        try {

            $('<div id="js-wall" style="position: fixed; top: 0px; left: 0px; background-color: black; z-index: 100000; opacity: 0.2;" />').height($(window).height()).width($(window).width()).prependTo('body');
            $('<div id="js-progress" style="color: black; top: ' + $(window).height() / 2 + 'px; position: fixed; z-index: 10000; font-size: 40pt; text-align: center;" >Выполнено: <span id="js-curr"></span>/' + arr.length + '</div>').width($(window).width()).prependTo('body');

            var num = 0, handle = function() {

                if (num >= arr.length) {
                    $('#js-progress').remove();
                    $('#js-wall').remove();
                    alert('Операция выполнена для предприятий: ' + num);
                    history.back();
                    return;
                }

                $('#js-curr').text(num);

                var id = arr[num];
                var ajax = clone(params);
                ajax.url = url.replace('%id%', id);

                if (typeof data == 'string') {
                    ajax.data = data.replace('%id%', id);
                } else {
                    ajax.data = data;
                }
                ajax.success = handle;
                ajax.error = function() {
                    alert('Ошибка!');
                    $('#js-progress').remove();
                    $('#js-wall').remove();
                }

                num++;

                $.ajax(ajax);
            };

            setCookie('units', 0, -1);
            handle();

        } catch(ex) {
            alert(ex);
        }

    }

    var sale = function() {
        $('.button205').unbind().click(function() {

            var data = $('form[name=storageForm]').serialize();
            doit({type: 'POST'}, '/' + realm + '/main/unit/view/%id%/sale', data);

            return false;
        });
    }

    var art = function() {
        window.attachArtefact = function(artefact_id, slot_id, N) {

            N = unescape(N);
            if (confirm(N + "\n\nВнимание! Артефакт будет установлен на " + total + " предприятий! Вы хотите продолжить?")) {

                doit({dataType: 'json', cache: false},
                        'http://virtonomica.ru/' + realm + '/ajax/unit/artefact/attach/',
                        'unit_id=%id%&artefact_id=' + artefact_id + '&slot_id=' + slot_id);
            }

            return false;
        }
    }

    var size = function() {
        $('form:first').submit(function() {

            var data = $('form:first').serialize();
            doit({type: 'POST'}, '/' + realm + '/window/unit/upgrade/%id%', data);

            return false;
        });
    }

    var specialty = function() {
        $('form:first').submit(function() {

            var data = $('form:first').serialize();
            doit({type: 'POST'}, '/' + realm + '/window/unit/produce_change/%id%', data);

            return false;
        });
    }

    var boom = function() {

        $('form:first').attr('onsubmit', '');
        $('form:first').unbind().submit(function() {

            if (confirm("Внимание! Будет взорвано " + total + " предприятий! Вы хотите продолжить?")) {

                doit({type: 'POST'}, '/' + realm + '/window/unit/close/%id%', {close_unit: 'Закрыть предприятие'});
            }

            return false;
        });
    }

    if (type != 'main' && !isGroup()) {
        return;
    }

    switch (type) {
        case 'main': main(); break;
        case 'sale': sale(); break;
        case 'art': art(); break;
        case 'size': size(); break;
        case 'specialty': specialty(); break;
        case 'boom': boom(); break;
    }

}


var handlers = [
    {regex: /main\/company\/view\/(\d+)\/unit_list$/, handler: 'main'},
    {regex: /main\/unit\/view\/\d+\/sale$/, handler: 'sale'},
    {regex: /main\/unit\/view\/\d+\/$/, handler: 'art'},
    {regex: /window\/unit\/upgrade\/\d+$/, handler: 'size'},
    {regex: /window\/unit\/produce_change\/\d+$/, handler: 'specialty'},
    {regex: /window\/unit\/close\/\d+$/, handler: 'boom'}
];

for (var i = 0; i < handlers.length; i++) {
    if (handlers[i].regex.test(location.href)) {

        // Хак, что бы получить полноценный доступ к DOM >:]
        var script = document.createElement("script");
        script.textContent = '(' + run.toString() + ')("' + handlers[i].handler + '");';
        document.getElementsByTagName("head")[0].appendChild(script);
        break;
    }
}
