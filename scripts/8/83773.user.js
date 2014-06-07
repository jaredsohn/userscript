// ==UserScript==
// @name           Virtonomica: сортировка лабораторий
// @namespace      virtonomica
// @description    Сортирует лаборатории по типу исследования (для этого необходимо выбрать фильтр по лабораториям)
// @include        http://virtonomic*.*/*/main/company/view/*/unit_list
// ==/UserScript==

var run = function() {

    var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
    $ = win.$;

    var list = $('.unit-list > tbody > tr[class!=u-th][class!=u-z][class!=u-z ozz]');
    var isLab = $('a.i-lab').hasClass('u-s');


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

    if (isLab) {
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
    }

    container.append('Фильтр: ').append(input);
}

// Хак, что бы получить полноценный доступ к DOM >:]
var script = document.createElement("script");
script.textContent = '(' + run.toString() + ')();';
document.documentElement.appendChild(script);