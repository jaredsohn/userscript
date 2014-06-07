// ==UserScript==
// @name           Virtonomica: управление предприятиями
// @namespace      virtonomica
// @description    Добавление нового функционала к управлению предприятиями
// @description    Добавлен фильтр подразделений по индуктивностям и выделение красным, тех кто работает не на 100%
// @version        1.2
// @include        http://*virtonomic*.*/*/main/company/view/*/unit_list
// @include        http://igra.aup.*.*/*/main/company/view/*/unit_list
// ==/UserScript==

var run = function() {

    var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
    $ = win.$;

	// поиск эффективности
	$("td.u-f").each(function() {
		// эффективность

		ef = parseInt( $(this).text() );
		if (ef > 75) {
			$(this).css("color", 'Blue');
		}

		ef = parseInt( $(this).text() );
		if (ef == 100) {
			$(this).css("color", 'Green');
		}

		ef = parseInt( $(this).text() );
		if (ef < 75) {
			$(this).css("color", 'DarkOrange');
		}
		ef = parseInt( $(this).text() );
		if (ef < 50) {
			$(this).css("color", 'red');
		}

		ef = parseInt( $(this).text() );
		if (ef == 0) {
			$(this).css("color", 'Gray');
		}
	});

    var url = /^http:\/\/virtonomic[as]\.(\w+)\/\w+\//.exec(location.href)[0];
    var list = $('.unit-list > tbody > tr[class!=u-th][class!=u-z][class!=u-z ozz]');

    var input_ef = $('<select>').append('<option value=-1>Все</option>').append('<option value=10>< 100%</option>').append('<option value=100>100%</option>').append('<option value=0>0%</option>').change(function() {
        list.each(function() {
        var needle = input_ef.val();

	// поиск эффективности
	var ef = parseInt ( $('td.u-f', this).text() );
	var find =  -1;	
	if ( needle != -1) {
		if ( needle == 100) {
			if (ef == 100) find = 1;
		} else {
			if ( needle == 0) {
				if (ef == 0) find = 1;
			} else {
				if ( needle == 10) {
					if (ef != 100) find = 1;
				}
			}
		}
	} else { find =1;}
            var cols = $('td', this);
            if ( find ==  -1) {
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

    container;
}
// .append('Фильтр по эффективности: ').append(input_ef)
// append('Фильтр: ').append(input).
// Хак, что бы получить полноценный доступ к DOM >:]
var script = document.createElement("script");
script.textContent = '(' + run.toString() + ')();';
document.documentElement.appendChild(script);