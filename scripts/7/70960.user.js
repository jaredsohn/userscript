// ==UserScript==
// @name           Virtonomica: управление предприятиями
// @namespace      virtonomica
// @description    Добавление нового функционала к управлению предприятиями
// @include        http://virtonomic*.*/*/main/company/view/*/unit_list
// ==/UserScript==

var run = function() {

    var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
    $ = win.$;

    var url = /^http:\/\/virtonomic[as]\.(\w+)\/\w+\//.exec(location.href)[0];
    var list = $('.unit-list > tbody > tr[class!=u-th][class!=u-z][class!=u-z ozz]');
    var isLab = $('a.i-lab').hasClass('u-s');

    $('td:eq(5)', list).css('cursor', 'pointer').click(function() {
        var td = $(this);
        td.empty().append($('<img>').attr({'src': 'http://s3.devels.info/load.gif', 'height': 16, 'width': 16}).css('padding-right', '20px'));

        var id = /\/unit\/view\/(\d+)/.exec($('td:eq(1) a:first', td.parents('tr')).attr('href'))[1];
        $.get(url + 'window/unit/productivity_info/' + id, function(data) {
            var percent = $('td:contains(Эффективность работы) + td td:eq(1)', data).text().replace('%', '').trim();
            var color = (percent == '100.00' ? 'green' : 'red');
            var html = percent + '<i>%</i>';

            td.css('color', color).html(html);
        });
    });

    var container = $('#mainContent tr:first > td:first');
    var input = $('<input>').attr({type: 'text', value: ''}).change(function() {

        var needle = new RegExp('^\\s*' + input.val(), 'i');
        list.each(function() {
            if (needle.length == 0) {
                $(this).show();
                return;
            }

            var cols = $('td', this);
            if ($(cols[1]).text().search(needle) == -1) {
                $(this).hide();
                if ($(this).hasClass('zz')) {
                    $(this).next().hide();
                }
            } else {
                $(this).show();
                if ($(this).hasClass('zz')) {
                    $(this).next().show();
                }
            }
        });
    });

    var getSortEl = function(el) {
        var p = $('.u-e div:first', el).text().trim().split(' ');

        while (p.length > 3) {
            p[2] = p[2] + ' ' + p.pop();
        }

        p[0] = parseFloat(p[0].substr(0, p[0].length - 1));

        if (p.length == 1) {
            p[1] = [0, 0];
        } else {
            var t = p[1].split('.');
            p[1] = [parseInt(t[0]), parseInt(t[1])];
        }

        if (p.length == 2) {
            p[2] = '';
        }

        return p;
    }

    var sortLab = function(l, r) {
        var l = getSortEl(l);
        var r = getSortEl(r);

        var ret = ((l[2] < r[2]) ? 1 : ((l[2] > r[2]) ? -1 : 0));
        if (ret != 0) { return ret; }

        var ret = ((l[1][0] < r[1][0]) ? 1 : ((l[1][0] > r[1][0]) ? -1 : 0));
        if (ret != 0) { return ret; }

        var ret = ((l[1][1] < r[1][1]) ? 1 : ((l[1][1] > r[1][1]) ? -1 : 0));
        if (ret != 0) { return ret; }

        return ((l[0] < r[0]) ? 1 : ((l[0] > r[0]) ? -1 : 0));
    }

    if (false) {
        var elems = [];
        var head = $('tr.u-th');

        $('.u-e div b:even').css('display', 'inline-block').width(45);
        $('.u-e div b:odd').css('display', 'inline-block').width(25);

        list.each(function() {
            elems.push([elems.length, this]);
        });

        elems.sort(sortLab);

        $(elems).each(function() {
            head.after(this[1]);
        });
        console.log(elems);
    }

    container.append('Фильтр: ').append(input);
}

// Хак, что бы получить полноценный доступ к DOM >:]
var script = document.createElement("script");
script.textContent = '(' + run.toString() + ')();';
document.documentElement.appendChild(script);